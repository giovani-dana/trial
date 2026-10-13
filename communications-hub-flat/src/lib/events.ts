/** Tiny cross-component event bus (keeps client islands decoupled). */
export const openAssistant = (query?: string) => window.dispatchEvent(new CustomEvent("comms-hub:ask-assistant", { detail: { query } }));
export const openSearch = () => window.dispatchEvent(new CustomEvent("comms-hub:open-search"));
export const openTour = () => window.dispatchEvent(new CustomEvent("comms-hub:open-tour"));
export const toast = (message: string) => window.dispatchEvent(new CustomEvent("comms-hub:toast", { detail: { message } }));
