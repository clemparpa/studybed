import { mergeApplicationConfig, ApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { appConfig } from "./app.config";
import { environment } from "../environment/environment";
import { provideBackendAPI } from "./utils/tokens";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideBackendAPI(environment.BACKEND_SERVER_API),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
