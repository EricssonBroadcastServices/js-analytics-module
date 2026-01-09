import { AnalyticsWebProps, PlayerEvent } from "../types/types";
import { RedBeeAnalytics } from "../analytics/RedBeeAnalytics";
import { useCallback, useEffect, useMemo } from "react";

export const webAnalytics = ({
  options,
  createdOptions,
  player,
  sessionId,
}: AnalyticsWebProps) => {
  const redBeeAnalytics = new RedBeeAnalytics(options);

  redBeeAnalytics.init(sessionId);
  redBeeAnalytics.created(createdOptions);
  if (player) {
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
  }
};

export const useWebAnalytics = ({
  options,
  createdOptions,
  player,
  sessionId,
}: AnalyticsWebProps) => {
  const redBeeAnalytics = useMemo(
    () => new RedBeeAnalytics(options),
    [options],
  );
  const sendEvent = useCallback(
    (eventType: PlayerEvent) => {
      redBeeAnalytics.runEvent({
        eventType,
      });
    },
    [redBeeAnalytics],
  );

  useEffect(() => {
    redBeeAnalytics.init(sessionId);
    redBeeAnalytics.created(createdOptions);
  }, [redBeeAnalytics, sessionId, createdOptions]);

  useEffect(() => {
    if (player) {
      player.on(PlayerEvent.AdBreakFinished, () => {
        sendEvent(PlayerEvent.AdBreakFinished);
      });
      player.on(PlayerEvent.AdBreakStarted, () => {
        sendEvent(PlayerEvent.AdBreakStarted);
      });
      player.on(PlayerEvent.AdError, () => {
        sendEvent(PlayerEvent.AdError);
      });
      player.on(PlayerEvent.AdFinished, () => {
        sendEvent(PlayerEvent.AdFinished);
      });
      player.on(PlayerEvent.AdSkipped, () => {
        sendEvent(PlayerEvent.AdSkipped);
      });
      player.on(PlayerEvent.AdStarted, () => {
        sendEvent(PlayerEvent.AdStarted);
      });
      player.on(PlayerEvent.AirplayChanged, () => {
        sendEvent(PlayerEvent.AirplayChanged);
      });
      player.on(PlayerEvent.AudioChanged, () => {
        sendEvent(PlayerEvent.AudioChanged);
      });
      player.on(PlayerEvent.AudioPlaybackQualityChanged, () => {
        sendEvent(PlayerEvent.AudioPlaybackQualityChanged);
      });
      player.on(PlayerEvent.CastStart, () => {
        sendEvent(PlayerEvent.CastStart);
      });
      player.on(PlayerEvent.CastStarted, () => {
        sendEvent(PlayerEvent.CastStarted);
      });
      player.on(PlayerEvent.CastStopped, () => {
        sendEvent(PlayerEvent.CastStopped);
      });
      player.on(PlayerEvent.ContentLocationChanged, () => {
        sendEvent(PlayerEvent.ContentLocationChanged);
      });
      player.on(PlayerEvent.DVRWindowExceeded, () => {
        sendEvent(PlayerEvent.DVRWindowExceeded);
      });
      player.on(PlayerEvent.Destroy, () => {
        sendEvent(PlayerEvent.Destroy);
      });
      player.on(PlayerEvent.DrmLicenseAdded, () => {
        sendEvent(PlayerEvent.DrmLicenseAdded);
      });
      player.on(PlayerEvent.DurationChanged, () => {
        sendEvent(PlayerEvent.DurationChanged);
      });
      player.on(PlayerEvent.Error, () => {
        sendEvent(PlayerEvent.Error);
      });
      player.on(PlayerEvent.LatencyModeChanged, () => {
        sendEvent(PlayerEvent.LatencyModeChanged);
      });
      player.on(PlayerEvent.Muted, () => {
        sendEvent(PlayerEvent.Muted);
      });
      player.on(PlayerEvent.OverlayAdStarted, () => {
        sendEvent(PlayerEvent.OverlayAdStarted);
      });
      player.on(PlayerEvent.Paused, () => {
        sendEvent(PlayerEvent.Paused);
      });
      player.on(PlayerEvent.Play, () => {
        sendEvent(PlayerEvent.Play);
      });
      player.on(PlayerEvent.PlaybackFinished, () => {
        sendEvent(PlayerEvent.PlaybackFinished);
      });
      player.on(PlayerEvent.PlaybackSpeedChanged, () => {
        sendEvent(PlayerEvent.PlaybackSpeedChanged);
      });
      player.on(PlayerEvent.Playing, () => {
        sendEvent(PlayerEvent.Playing);
      });
      player.on(PlayerEvent.Ready, () => {
        sendEvent(PlayerEvent.Ready);
      });
      player.on(PlayerEvent.Seek, () => {
        sendEvent(PlayerEvent.Seek);
      });
      player.on(PlayerEvent.Seeked, () => {
        sendEvent(PlayerEvent.Seeked);
      });
      player.on(PlayerEvent.SourceLoaded, () => {
        sendEvent(PlayerEvent.SourceLoaded);
      });
      player.on(PlayerEvent.StallEnded, () => {
        sendEvent(PlayerEvent.StallEnded);
      });
      player.on(PlayerEvent.StallStarted, () => {
        sendEvent(PlayerEvent.StallStarted);
      });
      player.on(PlayerEvent.SubtitleDisabled, () => {
        sendEvent(PlayerEvent.SubtitleDisabled);
      });
      player.on(PlayerEvent.SubtitleEnabled, () => {
        sendEvent(PlayerEvent.SubtitleEnabled);
      });
      player.on(PlayerEvent.TimeChanged, () => {
        sendEvent(PlayerEvent.TimeChanged);
      });
      player.on(PlayerEvent.TimeShifted, () => {
        sendEvent(PlayerEvent.TimeShifted);
      });
      player.on(PlayerEvent.Unmuted, () => {
        sendEvent(PlayerEvent.Unmuted);
      });
      player.on(PlayerEvent.VideoPlaybackQualityChanged, () => {
        sendEvent(PlayerEvent.VideoPlaybackQualityChanged);
      });
      player.on(PlayerEvent.ViewModeChanged, () => {
        sendEvent(PlayerEvent.ViewModeChanged);
      });
      player.on(PlayerEvent.VolumeChanged, () => {
        sendEvent(PlayerEvent.VolumeChanged);
      });
      player.on(PlayerEvent.Warning, () => {
        sendEvent(PlayerEvent.Warning);
      });
    }
    return () => {
      if (player) {
        player.off(PlayerEvent.AdBreakFinished, () => {
          sendEvent(PlayerEvent.AdBreakFinished);
        });
        player.off(PlayerEvent.AdBreakStarted, () => {
          sendEvent(PlayerEvent.AdBreakStarted);
        });
        player.off(PlayerEvent.AdError, () => {
          sendEvent(PlayerEvent.AdError);
        });
        player.off(PlayerEvent.AdFinished, () => {
          sendEvent(PlayerEvent.AdFinished);
        });
        player.off(PlayerEvent.AdSkipped, () => {
          sendEvent(PlayerEvent.AdSkipped);
        });
        player.off(PlayerEvent.AdStarted, () => {
          sendEvent(PlayerEvent.AdStarted);
        });
        player.off(PlayerEvent.AirplayChanged, () => {
          sendEvent(PlayerEvent.AirplayChanged);
        });
        player.off(PlayerEvent.AudioChanged, () => {
          sendEvent(PlayerEvent.AudioChanged);
        });
        player.off(PlayerEvent.AudioPlaybackQualityChanged, () => {
          sendEvent(PlayerEvent.AudioPlaybackQualityChanged);
        });
        player.off(PlayerEvent.CastStart, () => {
          sendEvent(PlayerEvent.CastStart);
        });
        player.off(PlayerEvent.CastStarted, () => {
          sendEvent(PlayerEvent.CastStarted);
        });
        player.off(PlayerEvent.CastStopped, () => {
          sendEvent(PlayerEvent.CastStopped);
        });
        player.off(PlayerEvent.ContentLocationChanged, () => {
          sendEvent(PlayerEvent.ContentLocationChanged);
        });
        player.off(PlayerEvent.DVRWindowExceeded, () => {
          sendEvent(PlayerEvent.DVRWindowExceeded);
        });
        player.off(PlayerEvent.Destroy, () => {
          sendEvent(PlayerEvent.Destroy);
        });
        player.off(PlayerEvent.DrmLicenseAdded, () => {
          sendEvent(PlayerEvent.DrmLicenseAdded);
        });
        player.off(PlayerEvent.DurationChanged, () => {
          sendEvent(PlayerEvent.DurationChanged);
        });
        player.off(PlayerEvent.Error, () => {
          sendEvent(PlayerEvent.Error);
        });
        player.off(PlayerEvent.LatencyModeChanged, () => {
          sendEvent(PlayerEvent.LatencyModeChanged);
        });
        player.off(PlayerEvent.Muted, () => {
          sendEvent(PlayerEvent.Muted);
        });
        player.off(PlayerEvent.OverlayAdStarted, () => {
          sendEvent(PlayerEvent.OverlayAdStarted);
        });
        player.off(PlayerEvent.Paused, () => {
          sendEvent(PlayerEvent.Paused);
        });
        player.off(PlayerEvent.Play, () => {
          sendEvent(PlayerEvent.Play);
        });
        player.off(PlayerEvent.PlaybackFinished, () => {
          sendEvent(PlayerEvent.PlaybackFinished);
        });
        player.off(PlayerEvent.PlaybackSpeedChanged, () => {
          sendEvent(PlayerEvent.PlaybackSpeedChanged);
        });
        player.off(PlayerEvent.Playing, () => {
          sendEvent(PlayerEvent.Playing);
        });
        player.off(PlayerEvent.Ready, () => {
          sendEvent(PlayerEvent.Ready);
        });
        player.off(PlayerEvent.Seek, () => {
          sendEvent(PlayerEvent.Seek);
        });
        player.off(PlayerEvent.Seeked, () => {
          sendEvent(PlayerEvent.Seeked);
        });
        player.off(PlayerEvent.SourceLoaded, () => {
          sendEvent(PlayerEvent.SourceLoaded);
        });
        player.off(PlayerEvent.StallEnded, () => {
          sendEvent(PlayerEvent.StallEnded);
        });
        player.off(PlayerEvent.StallStarted, () => {
          sendEvent(PlayerEvent.StallStarted);
        });
        player.off(PlayerEvent.SubtitleDisabled, () => {
          sendEvent(PlayerEvent.SubtitleDisabled);
        });
        player.off(PlayerEvent.SubtitleEnabled, () => {
          sendEvent(PlayerEvent.SubtitleEnabled);
        });
        player.off(PlayerEvent.TimeChanged, () => {
          sendEvent(PlayerEvent.TimeChanged);
        });
        player.off(PlayerEvent.TimeShifted, () => {
          sendEvent(PlayerEvent.TimeShifted);
        });
        player.off(PlayerEvent.Unmuted, () => {
          sendEvent(PlayerEvent.Unmuted);
        });
        player.off(PlayerEvent.VideoPlaybackQualityChanged, () => {
          sendEvent(PlayerEvent.VideoPlaybackQualityChanged);
        });
        player.off(PlayerEvent.ViewModeChanged, () => {
          sendEvent(PlayerEvent.ViewModeChanged);
        });
        player.off(PlayerEvent.VolumeChanged, () => {
          sendEvent(PlayerEvent.VolumeChanged);
        });
        player.off(PlayerEvent.Warning, () => {
          sendEvent(PlayerEvent.Warning);
        });
      }
    };
  }, [player]);
};
