import { createNoopInjectionToken } from "ngxtension/create-injection-token";

export const [injectBackendAPI, provideBackendAPI] =
  createNoopInjectionToken<string>("BACKEND_API");
