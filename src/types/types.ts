import { PlayerAPI } from "bitmovin-player";
import { IRedBeeAnalyticsOptions } from "../analytics/RedBeeAnalytics";
import { CallbackMap } from "../react-native/types";

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

export enum PlayerEvent {
  AppResumed = "appresumed",
  AppBackgrounded = "appbackgrounded",
  AdBreakFinished = "adbreakfinished",
  AdBreakStarted = "adbreakstarted",
  AdClicked = "adclicked",
  AdError = "aderror",
  AdFinished = "adfinished",
  AdInteraction = "adinteraction",
  AdLinearityChanged = "adlinearitychanged",
  AdManifestLoaded = "admanifestloaded",
  AdQuartile = "adquartile",
  AdSkipped = "adskipped",
  AdStarted = "adstarted",
  AirplayAvailable = "airplayavailable",
  AirplayChanged = "airplaychanged",
  AspectRatioChanged = "aspectratiochanged",
  AudioAdaptation = "audioadaptation",
  AudioAdded = "audioadded",
  AudioChanged = "audiochanged",
  AudioDownloadQualityChange = "audiodownloadqualitychange",
  AudioDownloadQualityChanged = "audiodownloadqualitychanged",
  AudioPlaybackQualityChanged = "audioplaybackqualitychanged",
  AudioQualityAdded = "audioqualityadded",
  AudioQualityChanged = "audioqualitychanged",
  AudioQualityRemoved = "audioqualityremoved",
  AudioRemoved = "audioremoved",
  CastAvailable = "castavailable",
  CastStart = "caststart",
  CastStarted = "caststarted",
  CastStopped = "caststopped",
  CastWaitingForDevice = "castwaitingfordevice",
  ContentLocationChanged = "contentlocationchanged",
  CueEnter = "cueenter",
  CueExit = "cueexit",
  CueParsed = "cueparsed",
  CueUpdate = "cueupdate",
  DVRWindowExceeded = "dvrwindowexceeded",
  Destroy = "destroy",
  DownloadFinished = "downloadfinished",
  DrmLicenseAdded = "drmlicenseadded",
  DurationChanged = "durationchanged",
  Error = "error",
  LatencyModeChanged = "latencymodechanged",
  LicenseValidated = "licensevalidated",
  Metadata = "metadata",
  MetadataChanged = "metadatachanged",
  MetadataParsed = "metadataparsed",
  ModuleReady = "moduleready",
  Muted = "muted",
  OverlayAdStarted = "overlayadstarted",
  Paused = "paused",
  PeriodSwitch = "periodswitch",
  PeriodSwitched = "periodswitched",
  Play = "play",
  PlaybackFinished = "playbackfinished",
  PlaybackSpeedChanged = "playbackspeedchanged",
  PlayerResized = "playerresized",
  Playing = "playing",
  Ready = "ready",
  RestoringContent = "restoringcontent",
  Seek = "seek",
  Seeked = "seeked",
  SegmentPlayback = "segmentplayback",
  SegmentRequestFinished = "segmentrequestfinished",
  ShowAirplayTargetPicker = "showairplaytargetpicker",
  SourceLoaded = "sourceloaded",
  SourceUnloaded = "sourceunloaded",
  StallEnded = "stallended",
  StallStarted = "stallstarted",
  SubtitleAdded = "subtitleadded",
  SubtitleDisable = "subtitledisable",
  SubtitleDisabled = "subtitledisabled",
  SubtitleEnable = "subtitleenable",
  SubtitleEnabled = "subtitleenabled",
  SubtitleRemoved = "subtitleremoved",
  TargetLatencyChanged = "targetlatencychanged",
  TimeChanged = "timechanged",
  TimeShift = "timeshift",
  TimeShifted = "timeshifted",
  Unmuted = "unmuted",
  VRStereoChanged = "vrstereochanged",
  VRViewingDirectionChange = "vrviewingdirectionchange",
  VRViewingDirectionChanged = "vrviewingdirectionchanged",
  VideoAdaptation = "videoadaptation",
  VideoDownloadQualityChange = "videodownloadqualitychange",
  VideoDownloadQualityChanged = "videodownloadqualitychanged",
  VideoPlaybackQualityChanged = "videoplaybackqualitychanged",
  VideoQualityAdded = "videoqualityadded",
  VideoQualityChanged = "videoqualitychanged",
  VideoQualityRemoved = "videoqualityremoved",
  ViewModeChanged = "viewmodechanged",
  VolumeChanged = "volumechanged",
  Warning = "warning",
}

type AnalyticsBaseProps = {
  options: IRedBeeAnalyticsOptions;
  createdOptions: CreatedOptions;
  sessionId: string;
};

export type AnalyticsWebProps = AnalyticsBaseProps & {
  player?: PlayerAPI;
};

export type AnalyticsRNProps = AnalyticsBaseProps & {
  callbacks: CallbackMap;
};
