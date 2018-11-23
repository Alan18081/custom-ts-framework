export interface Validator {
  validate(...args: any[]): boolean
}

export type MyNew = {
  new(...args): Validator;
}