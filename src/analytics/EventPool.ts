// SPDX-FileCopyrightText: 2026 2026 Red Bee Media Ltd <https://www.redbeemedia.com/\>
//
// SPDX-License-Identifier: MIT

import { Logger } from "../utils/Logger";
import { EmitterBaseClass } from "./EmitterBaseClass";
import { isWebEnvironment } from "../utils/helpers";

export interface IPayload {
  EventType: string;
  SequenceNumber?: number;
  [field: string]: any;
}

export const EVENT_POOL_SEND = "eventpool:send";
type EVENT_POOL_SEND = typeof EVENT_POOL_SEND;

const DISPATCH_INTERVAL_MS = 60000;

export class EventPool extends EmitterBaseClass<{
  [EVENT_POOL_SEND]: IPayload[];
}> {
  private sessionId: string;
  private sequenceNumber = 0;
  private logger: Logger;
  private payloadQueue: IPayload[] = [];
  private dispatchIntervalId: ReturnType<typeof setInterval> | null = null;

  constructor(sessionId: string, logger: Logger, interval?: number) {
    super();
    this.sessionId = sessionId;
    this.logger = logger;

    this.queueDispatcher = this.queueDispatcher.bind(this);

    this.dispatchIntervalId = setInterval(
      this.queueDispatcher,
      interval || DISPATCH_INTERVAL_MS,
    );

    if (isWebEnvironment()) {
      document.addEventListener("visibilitychange", this.queueDispatcher, {
        capture: true,
      });
      document.addEventListener("pagehide", this.queueDispatcher, {
        capture: true,
      });
    }
  }

  add(payload: IPayload, forceDispatch = false) {
    if (payload.EventType === "timechanged") {
      const existingIndex = this.payloadQueue.findIndex(
        (p) => p.EventType === "timechanged",
      );
      if (existingIndex !== -1) {
        this.payloadQueue.splice(existingIndex, 1);
      }
    }
    this.sequenceNumber++;
    payload.SequenceNumber = this.payloadQueue.length + 1;
    this.logger.debug("Analytics added to pool", this.sessionId, payload);
    this.payloadQueue.push(payload);

    if (forceDispatch) {
      this.queueDispatcher();
    }
  }

  queueDispatcher() {
    const isOnline =
      typeof navigator !== "undefined" && navigator.onLine !== false;
    if (!isOnline || !this.payloadQueue.length) {
      return;
    }
    const queue = this.payloadQueue.sort((a, b) => a.TimeStamp - b.TimeStamp);
    this.payloadQueue = [];
    this.logger.debug("Analytics dispatched from pool", queue);
    this.emit(EVENT_POOL_SEND, queue);
  }

  public destroy() {
    if (this.dispatchIntervalId !== null) {
      clearInterval(this.dispatchIntervalId);
      this.dispatchIntervalId = null;
    }
    if (isWebEnvironment()) {
      document.removeEventListener("visibilitychange", this.queueDispatcher);
      document.removeEventListener("pagehide", this.queueDispatcher);
    }
    super.destroy();
  }
}
