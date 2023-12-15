import { FormControl } from "@angular/forms";

export type GroupType<T> = {
  [K in keyof T]: FormControl<T[K]>;
};
