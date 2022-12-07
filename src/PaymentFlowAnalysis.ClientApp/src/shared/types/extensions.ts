//
// This allows

/**
 * Optional declares a type of keyed type T where all keys are optional.
 *
 * @example
 * interface Foo {
 *   x :number
 *   y :number
 * }
 *
 * type OptionalFoo = Optional<Foo>
 *
 * OptionalFoo == interface Foo {
 *   x? :number
 *   y? :number
 * }
 */
export type Optional<T> = { [P in keyof T]?: T[P] };
