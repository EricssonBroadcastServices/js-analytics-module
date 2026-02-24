// SPDX-FileCopyrightText: 2026 2026 Red Bee Media Ltd <https://www.redbeemedia.com/\>
//
// SPDX-License-Identifier: MIT

import { LogLevel, Logger } from "../utils/Logger";
import { CreatedOptions, ExtraEvents, IDeviceStats } from "../types/types";
import { ClockOffsetProvider } from "./ClockOffsetProvider";
import { EVENT_POOL_SEND, EventPool, IPayload } from "./EventPool";
import { PlayerEvent } from "../types/types";
import { isWebEnvironment } from "../utils/helpers";
import { NetInfoStateType } from "@react-native-community/netinfo";

const DEFAULT_HEADERS = {
  "content-type": "application/json",
};

const referrer = (): string => {
  if (!isWebEnvironment()) return "";
  if (document.referrer) return document.referrer;
  if (window.self === window.top) return "";
  try {
    return window.top?.location.href ?? "";
  } catch (e) {
    return "";
  }
};

const getPageUrl = (): string => {
  if (!isWebEnvironment()) return "";
  return window.location.href;
};

const DEFAULT_DEVICE: Partial<IDeviceInfo> = {
  appType: "browser",
  pageUrl: getPageUrl(),
  referrer: referrer(),
};

interface IPlayerFields {
  Technology: string;
  TechVersion: string;
  Player: string;
  Version: string;
  StreamingTechnology: string;
  CDNVendor?: string;
  AnalyticsPostInterval?: number;
  AnalyticsBucket?: number;
  AnalyticsTag?: string;
}

export interface IDeviceInfo {
  os: string;
  osVersion: string;
  model: string;
  modelNumber?: string;
  manufacturer: string;
  appType: "samsung_tv" | "lg_tv" | "chromecast" | "browser";
  appName?: string;
  pageUrl?: string;
  referrer?: string;
  deviceStats?: IDeviceStats;
}

export interface IRedBeeAnalyticsOptions {
  customer: string;
  businessUnit: string;
  sessionToken: string;
  analyticsBaseUrl: string;
  device: IDeviceInfo;
  debug?: boolean;
  sessionId?: string;
}

export class RedBeeAnalytics {
  private logger: Logger;

  private customer: string;
  private businessUnit: string;
  private baseUrl?: string;
  private customerSpecificBaseUrl?: string;

  private assetId?: string;

  private eventPool?: EventPool | undefined;
  private sessionId?: string | undefined;
  private requestHeaders: { [header: string]: string };
  private device: IDeviceInfo;

  private clockOffsetProvider?: ClockOffsetProvider | undefined;

  private playerFields: IPlayerFields;

  constructor({
    customer,
    businessUnit,
    sessionToken,
    analyticsBaseUrl,
    device,
    debug,
    sessionId,
  }: IRedBeeAnalyticsOptions) {
    if (!customer || !businessUnit) {
      throw new Error("No Customer or BusinessUnit defined");
    }
    this.customer = customer;
    this.businessUnit = businessUnit;
    if (!sessionToken) {
      throw new Error("No sessionToken defined");
    }

    this.logger = new Logger({
      prefix: "[RedBeeAnalytics]",
      logLevel: debug ? LogLevel.DEBUG : LogLevel.NONE,
    });

    this.setAnalyticsBaseUrl(analyticsBaseUrl);

    this.requestHeaders = Object.assign(
      {
        Authorization: `Bearer ${sessionToken}`,
      },
      DEFAULT_HEADERS,
    );

    this.device = Object.assign({}, DEFAULT_DEVICE, device);
    this.playerFields = {
      Player: "",
      Version: "",
      Technology: "",
      TechVersion: "",
      StreamingTechnology: "",
    };
    this.init(sessionId);
  }

  private async _send(payloadQuene: IPayload[]): Promise<boolean> {
    const url = new URL(
      `${this.customerSpecificBaseUrl}/eventsink/send`,
    ).toString();
    const data = {
      DispatchTime: Date.now(),
      Customer: this.customer,
      BusinessUnit: this.businessUnit,
      SessionId: this.sessionId,
      Payload: payloadQuene,
      ClockOffset: (await this.clockOffsetProvider?.getClockOffset()) || 0,
    };
    if (this.logger.logLevel === LogLevel.DEBUG) {
      this.logger.debug("send", url, data);
      return true;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: this.requestHeaders,
      });
      return response.ok;
    } catch (error) {
      this.logger.error("_send() failed", error);
      payloadQuene.forEach((event: any) => {
        this.eventPool?.add(event);
      });
      return false;
    }
  }

  private isActive(): boolean {
    return !!(this.sessionId && this.eventPool);
  }

  setAnalyticsBaseUrl(analyticsBaseUrl: string): void {
    this.baseUrl = analyticsBaseUrl;
    this.customerSpecificBaseUrl = new URL(
      `/v2/customer/${this.customer}/businessunit/${this.businessUnit}`,
      this.baseUrl,
    ).toString();
  }

  clear(): void {
    this.logger.info("clear", this.sessionId);
    this.sessionId = undefined;
    this.eventPool = undefined;
  }

  init(sessionId?: string): boolean {
    if (!this.customerSpecificBaseUrl) {
      throw new Error("[RedBeeAnalytics] analyticsBaseUrl was never set");
    }
    if (!sessionId) {
      this.logger.info("no sessionId provided, session will not be tracked");
      return false;
    }
    this.logger.debug("init", sessionId);
    this.clear();
    this.sessionId = sessionId;
    this.eventPool = new EventPool(
      sessionId,
      this.logger,
      this.playerFields.AnalyticsPostInterval,
    );
    this.eventPool.on(EVENT_POOL_SEND, this._send.bind(this));
    return true;
  }

  deviceInfoEvent(): void {
    if (!this.isActive()) {
      return;
    }
    const isWeb = isWebEnvironment();
    const deviceInfoEvent = {
      EventType: "Device.Info",
      Height: isWeb && window.screen ? window.screen.height : 0,
      Width: isWeb && window.screen ? window.screen.width : 0,
      Name: isWeb && window.navigator ? window.navigator.product : "",
      DeviceModel: this.device.model,
      DeviceStats: this.device.deviceStats,
      Manufacturer: this.device.manufacturer,
      AppType: this.device.appType,
      PageUrl: this.device.pageUrl,
      Referrer: this.device.referrer,
      OS: this.device.os,
      OSVersion: this.device.osVersion,
      TotalNumberOfDroppedFrames: 0,
      Player: this.playerFields.Player,
      Version: this.playerFields.Version,
      Technology: this.playerFields.Technology,
      TechVersion: this.playerFields.TechVersion,
      StreamingTechnology: this.playerFields.StreamingTechnology,
      CDNVendor: this.playerFields.CDNVendor,
      AnalyticsPostInterval: this.playerFields.AnalyticsPostInterval,
      AnalyticsBucket: this.playerFields.AnalyticsBucket,
      AnalyticsTag: this.playerFields.AnalyticsTag,
      ...this.getDefaultFields(),
    };

    this.eventPool?.add(deviceInfoEvent);
  }

  created({
    assetId,
    deviceModel,
    deviceModelNumber,
    deviceStats,
    exposureBaseUrl,
  }: CreatedOptions): void {
    if (!this.isActive()) {
      return;
    }

    this.clockOffsetProvider = new ClockOffsetProvider(exposureBaseUrl);

    this.logger.debug("created", this.sessionId);
    this.assetId = assetId || "";
    this.device.model = deviceModel || this.device.model;
    this.device.deviceStats = deviceStats || {};
    this.device.modelNumber = deviceModelNumber || this.device.modelNumber;

    this.deviceInfoEvent();
  }

  runEvent({
    eventType,
  }: {
    eventType: PlayerEvent | ExtraEvents;
    startTime?: number;
  }): void {
    if (!this.isActive()) {
      return;
    }
    this.logger.debug("[Event]: " + eventType, this.sessionId);

    const payload = {
      EventType: eventType,
      ...this.getDefaultFields(),
    };

    this.eventPool?.add(payload);
  }

  runConnectionEvent({
    eventType,
    connectionType,
  }: {
    eventType: string;
    connectionType: NetInfoStateType;
    startTime?: number;
  }): void {
    if (!this.isActive()) {
      return;
    }
    this.logger.debug("[Event]: " + eventType, this.sessionId);

    const payload = {
      EventType: eventType,
      connectionType,
      ...this.getDefaultFields(),
    };

    this.eventPool?.add(payload);
  }

  updatePlayerFields(updates: Partial<IPlayerFields>) {
    this.playerFields = {
      ...this.playerFields,
      ...updates,
    };
  }

  getDefaultFields() {
    return {
      Timestamp: Date.now(),
    };
  }

  public destroy() {
    this.eventPool?.destroy();
    this.eventPool = undefined;
    this.clockOffsetProvider?.destroy();
    this.clockOffsetProvider = undefined;
    this.clear();
  }
}
