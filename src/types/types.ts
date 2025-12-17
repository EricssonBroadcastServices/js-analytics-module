export interface IDeviceStats {
  deviceMemory?: number | undefined;
  heapSizeLimit?: number | undefined;
  totalHeapSize?: number | undefined;
  usedHeapSize?: number | undefined;
  cpuCores?: number | undefined;
  networkDownlink?: number | undefined;
  networkType?: string | undefined;
  visibility?: DocumentVisibilityState | undefined;
}

export type CreatedOptions = {
  assetId?: string;
  analyticsPostInterval?: number;
  deviceModel?: TDeviceModel;
  deviceModelNumber?: string;
  deviceStats?: IDeviceStats;
  exposureBaseUrl?: string;
};

export type TBrowser = "chrome" | "firefox" | "safari" | "edge" | "unknown";

export type TWebOSVersion = `${number}.${number}.${number}`;
export type TTizenVersion = `${number}.${number}`;

export type TBrowserModel = `browser-${TBrowser}-${number}`;

export type TSamsungTVModel = `samsung-${TTizenVersion}`;
export type TLGTVModel = `lg-${TWebOSVersion}`;

export type TCastModel =
  | "cc-googletv-hd"
  | "cc-googletv"
  | "cc-builtin"
  | "cc-ultra"
  | "cc-3"
  | "cc-2"
  | "cc-1"
  | "cc-unknown";

export type TDeviceModel =
  | TBrowserModel
  | TSamsungTVModel
  | TLGTVModel
  | TCastModel;
