const SDK_NAME = "sentry-lite-next";
const SDK_VERSION = "0.1.0";

interface DsnParts {
  protocol: string;
  host: string;
  projectId: string;
  key: string;
}

interface CaptureContext {
  request?: {
    method: string;
    url: string;
    headers?: Record<string, string>;
  };
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
}

interface InitOptions {
  dsn?: string;
  environment?: string;
  tracesSampleRate?: number;
  enabled?: boolean;
}

let options: InitOptions = {};
let initialized = false;
let cachedDsn: DsnParts | null = null;

function parseDsn(dsn?: string): DsnParts | null {
  if (!dsn) return null;
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace("/", "");
    if (!projectId || !url.username) return null;

    return {
      protocol: url.protocol.replace(":", ""),
      host: url.host,
      projectId,
      key: url.username,
    };
  } catch (error) {
    console.warn("Sentry DSN parsing failed", error);
    return null;
  }
}

export function init(initOptions: InitOptions) {
  options = initOptions;
  cachedDsn = parseDsn(options.dsn);
  initialized = true;
}

function getEnvelopeUrl(): string | null {
  if (!cachedDsn) return null;
  return `${cachedDsn.protocol}://${cachedDsn.host}/api/${cachedDsn.projectId}/envelope/?sentry_key=${cachedDsn.key}&sentry_version=7`;
}

function buildEnvelope(payload: Record<string, unknown>) {
  const envelopeHeaders = {
    sent_at: new Date().toISOString(),
    sdk: { name: SDK_NAME, version: SDK_VERSION },
    environment: options.environment,
  };

  const itemHeader = { type: "event" };

  return `${JSON.stringify(envelopeHeaders)}\n${JSON.stringify(itemHeader)}\n${JSON.stringify(payload)}`;
}

function sendToSentry(payload: Record<string, unknown>) {
  const url = getEnvelopeUrl();
  if (!url) return;

  try {
    const body = buildEnvelope(payload);
    fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-sentry-envelope",
      },
      keepalive: true,
    }).catch((error) => {
      console.warn("Sentry transport failed", error);
    });
  } catch (error) {
    console.warn("Unable to send Sentry event", error);
  }
}

function normalizeError(error: unknown) {
  if (error instanceof Error) return { message: error.message, stack: error.stack };
  if (typeof error === "string") return { message: error };
  return { message: "Unknown error" };
}

export function captureException(error: unknown, context?: CaptureContext) {
  if (!initialized || (!options.enabled && !options.dsn)) return;

  const normalizedError = normalizeError(error);
  const payload: Record<string, unknown> = {
    level: "error",
    platform: "javascript",
    ...normalizedError,
    request: context?.request,
    tags: context?.tags,
    extra: context?.extra,
  };

  sendToSentry(payload);
}

export function captureMessage(message: string, extra?: CaptureContext["extra"]) {
  if (!initialized || (!options.enabled && !options.dsn)) return;
  sendToSentry({ level: "info", message, extra });
}

export function wrapMiddlewareWithSentry<Args extends unknown[], Return>(
  handler: (...args: Args) => Return | Promise<Return>,
) {
  return async function sentryWrappedMiddleware(...args: Args): Promise<Return> {
    try {
      return await handler(...args);
    } catch (error) {
      const request = args[0];
      const requestContext =
        typeof request === "object" && request?.request
          ? { url: request.request.url, method: request.request.method }
          : typeof request === "object" && request?.url
            ? { url: request.url, method: request.method }
            : undefined;

      captureException(error, { request: requestContext });
      throw error;
    }
  };
}

export type { CaptureContext, InitOptions };
