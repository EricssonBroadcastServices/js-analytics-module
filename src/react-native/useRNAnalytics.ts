import { AnalyticsRNProps, ExtraEvents, PlayerEvent } from "../types/types";
import { RedBeeAnalytics } from "../analytics/RedBeeAnalytics";
import { useMemo, useEffect } from "react";
import { CallbackMap } from "./types";
import { useNetInfo } from "@react-native-community/netinfo";
import { AppState } from "react-native";

const allPossibleCallbacks: (keyof CallbackMap)[] = [
  "onAdBreakFinished",
  "onAdBreakStarted",
  "onAdError",
  "onAdFinished",
  "onAdSkipped",
  "onAdStarted",
  "onAudioChanged",
  "onCastStart",
  "onCastStarted",
  "onCastStopped",
  "onDestroy",
  "onPlayerError",
  "onMuted",
  "onPaused",
  "onPlay",
  "onPlaybackFinished",
  "onPlaybackSpeedChanged",
  "onPlaying",
  "onReady",
  "onSeek",
  "onSeeked",
  "onSourceLoaded",
  "onStallEnded",
  "onStallStarted",
  "onTimeChanged",
  "onTimeShifted",
  "onUnmuted",
  "onVideoPlaybackQualityChanged",
  "onPlayerWarning",
];

const callbackToEventMap: Record<keyof CallbackMap, PlayerEvent> = {
  onAdBreakFinished: PlayerEvent.AdBreakFinished,
  onAdBreakStarted: PlayerEvent.AdBreakStarted,
  onAdError: PlayerEvent.AdError,
  onAdFinished: PlayerEvent.AdFinished,
  onAdSkipped: PlayerEvent.AdSkipped,
  onAdStarted: PlayerEvent.AdStarted,
  onAudioChanged: PlayerEvent.AudioChanged,
  onCastStart: PlayerEvent.CastStart,
  onCastStarted: PlayerEvent.CastStarted,
  onCastStopped: PlayerEvent.CastStopped,
  onDestroy: PlayerEvent.Destroy,
  onPlayerError: PlayerEvent.Error,
  onMuted: PlayerEvent.Muted,
  onPaused: PlayerEvent.Paused,
  onPlay: PlayerEvent.Play,
  onPlaybackFinished: PlayerEvent.PlaybackFinished,
  onPlaybackSpeedChanged: PlayerEvent.PlaybackSpeedChanged,
  onPlaying: PlayerEvent.Playing,
  onReady: PlayerEvent.Ready,
  onSeek: PlayerEvent.Seek,
  onSeeked: PlayerEvent.Seeked,
  onSourceLoaded: PlayerEvent.SourceLoaded,
  onStallEnded: PlayerEvent.StallEnded,
  onStallStarted: PlayerEvent.StallStarted,
  onTimeChanged: PlayerEvent.TimeChanged,
  onTimeShifted: PlayerEvent.TimeShifted,
  onUnmuted: PlayerEvent.Unmuted,
  onVideoPlaybackQualityChanged: PlayerEvent.VideoPlaybackQualityChanged,
  onPlayerWarning: PlayerEvent.Warning,
};

export const useRNAnalytics = ({
  options,
  createdOptions,
  sessionId,
  callbacks: callbacksProps,
}: AnalyticsRNProps) => {
  const { type } = useNetInfo();
  const redBeeAnalytics = useMemo(
    () => new RedBeeAnalytics(options),
    [options],
  );
  useEffect(() => {
    redBeeAnalytics.init(sessionId);
    redBeeAnalytics.created(createdOptions);
  }, [redBeeAnalytics, sessionId, createdOptions]);

  useEffect(() => {
    redBeeAnalytics.runConnectionEvent({
      eventType: "ConnectionTypeChange",
      connectionType: type,
    });
  }, [type]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        redBeeAnalytics.runEvent({
          eventType: ExtraEvents.AppResumed,
        });
        return;
      }
      if (nextAppState === "background") {
        redBeeAnalytics.runEvent({
          eventType: ExtraEvents.AppBackgrounded,
        });
        return;
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const wrappedCalbacks = useMemo(() => {
    const callbacks: CallbackMap = {};

    for (const key of allPossibleCallbacks) {
      const callback = callbacksProps[key];
      const eventType = callbackToEventMap[key];

      callbacks[key] = (...args: unknown[]) => {
        redBeeAnalytics.runEvent({ eventType });

        if (callback && typeof callback === "function") {
          return callback(...args);
        }
      };
    }

    return callbacks;
  }, [callbacksProps, redBeeAnalytics]);

  return useMemo(() => ({ ...wrappedCalbacks }), [wrappedCalbacks]);
};
