const localURL = window.location.pathname;
export const publicExperimentalFeatures = {
    debug: localURL.includes("/debug"),
    webWorkers: localURL.includes("/workers"),
} as const