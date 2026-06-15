type ErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

export function reportError(
  error: unknown,
  context: Record<string, unknown> = {},
  _options: ErrorOptions = { mechanism: "react_error_boundary", handled: false, severity: "error" },
) {
  if (typeof window === "undefined") return;
  console.error("[error-boundary]", error, { ...context, route: window.location.pathname });
}
