const localURL = window.location.pathname;
export const publicExperimentalFeatures = {
    debug: localURL.includes("/debug"),
    webWorkers: localURL.includes("/workers"),
    useExtraControls: false,
    useSafeArea: false
} as const