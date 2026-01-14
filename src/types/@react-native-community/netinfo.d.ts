// Type declarations for @react-native-community/netinfo
// This is a peer dependency, so types are provided by the package itself
// This file is only needed for TypeScript compilation

declare module "@react-native-community/netinfo" {
  export type NetInfoStateType =
    | "none"
    | "unknown"
    | "cellular"
    | "wifi"
    | "bluetooth"
    | "ethernet"
    | "wimax"
    | "vpn"
    | "other";

  export interface NetInfoState {
    type: NetInfoStateType;
    isConnected: boolean | null;
    isInternetReachable: boolean | null;
    details: unknown;
  }

  export function fetch(): Promise<NetInfoState>;
  export function addEventListener(
    listener: (state: NetInfoState) => void,
  ): () => void;
  export function useNetInfo(): NetInfoState;
}
