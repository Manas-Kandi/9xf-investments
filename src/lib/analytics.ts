let initialized = false;
let consentGranted = false;

const subscribers = new Set<() => void>();

type AnalyticsEvent = "signup_completed" | "onboarding_completed" | "invest_attempt" | "invest_success";

type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    analytics?: {
      track: (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;
    };
  }
}

function notify() {
  subscribers.forEach((listener) => listener());
}

export function initializeAnalytics() {
  initialized = true;
  notify();
}

export function setAnalyticsConsent(consent: boolean) {
  consentGranted = consent;
  notify();
}

export function onAnalyticsStatusChange(listener: () => void) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function isAnalyticsEnabled() {
  return initialized && consentGranted;
}

export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  if (!isAnalyticsEnabled()) return;

  try {
    console.debug("Analytics event", event, payload ?? {});
    if (typeof window !== "undefined" && window.analytics?.track) {
      window.analytics.track(event, payload ?? {});
    }
  } catch (error) {
    console.warn("Analytics tracking failed", error);
  }
}
