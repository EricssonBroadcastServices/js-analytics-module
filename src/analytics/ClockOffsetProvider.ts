// SPDX-FileCopyrightText: 2026 2026 Red Bee Media Ltd <https://www.redbeemedia.com/\>
//
// SPDX-License-Identifier: MIT

import { getTimeAnonymous } from "@ericssonbroadcastservices/rbm-ott-sdk";

const SYNC_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_INITIAL_SYNC_RETRIES = 3;
const RETRY_SYNC_INTERVAL_MS = 500;

export class ClockOffsetProvider {
  private exposureBaseUrl: string | undefined;

  private clockInterval: ReturnType<typeof setInterval> | undefined;
  private lastSyncLocalTime = 0;
  private lastSyncBrowserTime = 0;
  private clockOffset = 0;
  private isInitSyncing = false;

  constructor(exposureBaseUrl?: string) {
    this.exposureBaseUrl = exposureBaseUrl;

    if (exposureBaseUrl) {
      this.setupPeriodicalSync();
    } else {
      this.lastSyncBrowserTime =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      this.lastSyncLocalTime = Date.now();
      this.clockOffset = 0;
    }
  }

  private async setupPeriodicalSync() {
    if (this.clockInterval) return;
    this.isInitSyncing = true;
    let attempts = 0;
    while (attempts < MAX_INITIAL_SYNC_RETRIES) {
      if (await this.updateClockOffset()) {
        break;
      }
      attempts++;
      await this.sleep(RETRY_SYNC_INTERVAL_MS);
    }
    this.isInitSyncing = false;

    if (attempts === MAX_INITIAL_SYNC_RETRIES) {
      // initial sync failed, continue with navigation time as reference
      return;
    }

    this.clockInterval = setInterval(() => {
      this.updateClockOffset();
    }, SYNC_INTERVAL_MS);
  }

  async getClockOffset(): Promise<number> {
    // wait for the initial syncing, if any, to finish
    while (this.isInitSyncing) {
      await this.sleep(RETRY_SYNC_INTERVAL_MS / 3);
    }
    const elapsedLocalTime = Date.now() - this.lastSyncLocalTime;
    const currentTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    const elapsedBrowserTime = currentTime - this.lastSyncBrowserTime;
    const currentClockOffset = Math.round(
      this.clockOffset + (elapsedLocalTime - elapsedBrowserTime),
    );
    return currentClockOffset;
  }

  // Not used, but may be handy in the future
  async now() {
    return Date.now() - (await this.getClockOffset());
  }

  private async updateClockOffset(): Promise<boolean | void> {
    if (!this.exposureBaseUrl) return;
    const currentTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    this.lastSyncBrowserTime = currentTime;
    this.lastSyncLocalTime = Date.now();
    return getTimeAnonymous
      .call({
        baseUrl: this.exposureBaseUrl,
      })
      .then((resp) => {
        let lastSyncServerTime = resp.epochMillis;
        const endTime =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        const roundTripTime = endTime - this.lastSyncBrowserTime;
        lastSyncServerTime -= Math.round(0.5 * roundTripTime);
        this.lastSyncLocalTime += Math.round(0.5 * roundTripTime);
        this.lastSyncBrowserTime += 0.5 * roundTripTime;
        this.clockOffset = this.lastSyncLocalTime - lastSyncServerTime;
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  destroy() {
    if (!this.clockInterval) return;
    clearInterval(this.clockInterval);
    this.clockInterval = undefined;
  }
}
