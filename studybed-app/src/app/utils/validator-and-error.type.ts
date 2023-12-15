import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export type ValidatorAndError = {
  validator: ValidatorFn;
  error: string;
};
export type AsyncValidatorAndError = {
  validator: AsyncValidatorFn;
  error: string;
};
