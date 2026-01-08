import throttle from "lodash.throttle";

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

export class EventPool extends EmitterBaseClass<{
  [EVENT_POOL_SEND]: IPayload[];
}> {
  private sessionId: string;
  private sequenceNumber = 0;
  private logger: Logger;
  private payloadQueue: IPayload[] = [];
  private dispatcher: any;

  constructor(sessionId: string, logger: Logger) {
    super();
    this.sessionId = sessionId;
    this.logger = logger;

    this.queueDispatcher = this.queueDispatcher.bind(this);

    this.updateInterval(3000);

    if (isWebEnvironment()) {
      document.addEventListener("visibilitychange", this.queueDispatcher, {
        capture: true,
      });
      document.addEventListener("pagehide", this.queueDispatcher, {
        capture: true,
      });
    }
  }

  updateInterval(interval: number) {
    // Handle seconds coming in, modify to milliseconds
    const redefinedInterval =
      interval.toString().length < 4 ? Number(interval * 1000) : interval;
    this.dispatcher = throttle(this.queueDispatcher, redefinedInterval, {
      leading: false,
      trailing: true,
    });
  }

  add(payload: IPayload, forceDispatch = false) {
    this.sequenceNumber++;
    payload.SequenceNumber = this.sequenceNumber;
    this.logger.debug("Analytics added to pool", this.sessionId, payload);
    this.payloadQueue.push(payload);

    if (forceDispatch) {
      this.queueDispatcher();
    } else {
      this.dispatcher();
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
    if (isWebEnvironment()) {
      document.removeEventListener("visibilitychange", this.queueDispatcher);
      document.removeEventListener("pagehide", this.queueDispatcher);
    }
    this.dispatcher.flush();
    super.destroy();
  }
}
