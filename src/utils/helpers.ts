const DUID_STORAGE_KEY = "deviceId";

const generateS4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const getUUID = (): string => {
  return [
    generateS4(),
    generateS4(),
    "-",
    generateS4(),
    "-",
    generateS4(),
    "-",
    generateS4(),
    "-",
    generateS4(),
    generateS4(),
    generateS4(),
  ].join("");
};

export const getDeviceId = (sessionToken?: string): string | undefined => {
  if (sessionToken) {
    const parts = sessionToken.split("|");
    return parts[7];
  }

  const storedDeviceId = localStorage.getItem(DUID_STORAGE_KEY);
  if (storedDeviceId) {
    return storedDeviceId;
  }

  const deviceId = getUUID();

  try {
    localStorage.setItem(DUID_STORAGE_KEY, deviceId);
  } catch (e) {}
  return deviceId;
};

export const isWebEnvironment = (): boolean => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
