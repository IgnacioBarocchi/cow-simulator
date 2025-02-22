const localURL = window.location.pathname;
export const publicExperimentalFeatures = {
    debug: localURL.includes("/debug"),
    webWorkers: localURL.includes("/ww"),
    deployed: !localURL.includes("localhost")
} as const