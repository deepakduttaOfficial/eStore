export {};

declare global {
  /**
   * global OptionalProperties.
   */
  type OptionalProperties<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;

  /**
   * global readOnly
   */
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };
}
