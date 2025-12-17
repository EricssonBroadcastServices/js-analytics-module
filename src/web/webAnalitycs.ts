import { PlayerAPI } from "bitmovin-player";
import { PlayerEvent } from "./types";
import {
  IRedBeeAnalyticsOptions,
  RedBeeAnalytics,
} from "../analytics/RedBeeAnalytics";
import { CreatedOptions } from "../types/types";

type Props = {
  options: IRedBeeAnalyticsOptions;
  createdOptions: CreatedOptions;
  player: PlayerAPI;
  sessionId: string;
};

export const webAnalytics = ({
  options,
  createdOptions,
  player,
  sessionId,
}: Props) => {
  const redBeeAnalytics = new RedBeeAnalytics(options);

  redBeeAnalytics.init(sessionId);
  redBeeAnalytics.created(createdOptions);

  player.on(PlayerEvent.AdBreakFinished, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AdBreakFinished,
    });
  });
  player.on(PlayerEvent.AdBreakStarted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AdBreakStarted,
    });
  });
  player.on(PlayerEvent.AdError, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AdError,
    });
  });
  player.on(PlayerEvent.AdFinished, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AdFinished,
    });
  });
  player.on(PlayerEvent.AdSkipped, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AdSkipped,
    });
  });
  player.on(PlayerEvent.AdStarted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AdStarted,
    });
  });
  player.on(PlayerEvent.AirplayChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AirplayChanged,
    });
  });
  player.on(PlayerEvent.AudioChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AudioChanged,
    });
  });
  player.on(PlayerEvent.AudioPlaybackQualityChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.AudioPlaybackQualityChanged,
    });
  });
  player.on(PlayerEvent.CastStart, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.CastStart,
    });
  });
  player.on(PlayerEvent.CastStarted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.CastStarted,
    });
  });
  player.on(PlayerEvent.CastStopped, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.CastStopped,
    });
  });
  player.on(PlayerEvent.ContentLocationChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.ContentLocationChanged,
    });
  });
  player.on(PlayerEvent.DVRWindowExceeded, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.DVRWindowExceeded,
    });
  });
  player.on(PlayerEvent.Destroy, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Destroy,
    });
  });
  player.on(PlayerEvent.DrmLicenseAdded, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.DrmLicenseAdded,
    });
  });
  player.on(PlayerEvent.DurationChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.DurationChanged,
    });
  });
  player.on(PlayerEvent.Error, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Error,
    });
  });
  player.on(PlayerEvent.LatencyModeChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.LatencyModeChanged,
    });
  });
  player.on(PlayerEvent.Muted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Muted,
    });
  });
  player.on(PlayerEvent.OverlayAdStarted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.OverlayAdStarted,
    });
  });
  player.on(PlayerEvent.Paused, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Paused,
    });
  });
  player.on(PlayerEvent.Play, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Play,
    });
  });
  player.on(PlayerEvent.PlaybackFinished, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.PlaybackFinished,
    });
  });
  player.on(PlayerEvent.PlaybackSpeedChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.PlaybackSpeedChanged,
    });
  });
  player.on(PlayerEvent.Playing, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Playing,
    });
  });
  player.on(PlayerEvent.Ready, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Ready,
    });
  });
  player.on(PlayerEvent.Seek, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Seek,
    });
  });
  player.on(PlayerEvent.Seeked, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Seeked,
    });
  });
  player.on(PlayerEvent.SourceLoaded, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.SourceLoaded,
    });
  });
  player.on(PlayerEvent.StallEnded, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.StallEnded,
    });
  });
  player.on(PlayerEvent.StallStarted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.StallStarted,
    });
  });
  player.on(PlayerEvent.SubtitleDisabled, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.SubtitleDisabled,
    });
  });
  player.on(PlayerEvent.SubtitleEnabled, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.SubtitleEnabled,
    });
  });
  player.on(PlayerEvent.TimeChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.TimeChanged,
    });
  });
  player.on(PlayerEvent.TimeShifted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.TimeShifted,
    });
  });
  player.on(PlayerEvent.Unmuted, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Unmuted,
    });
  });
  player.on(PlayerEvent.VideoPlaybackQualityChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.VideoPlaybackQualityChanged,
    });
  });
  player.on(PlayerEvent.ViewModeChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.ViewModeChanged,
    });
  });
  player.on(PlayerEvent.VolumeChanged, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.VolumeChanged,
    });
  });
  player.on(PlayerEvent.Warning, () => {
    redBeeAnalytics.runEvent({
      eventType: PlayerEvent.Warning,
    });
  });
};
