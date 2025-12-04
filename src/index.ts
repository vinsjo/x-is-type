//#region Type Guard Functions

/**
 * Check if `typeof x === 'number'`
 */
export function isNumber(x: unknown): x is number {
    return typeof x === 'number';
}

/**
 * Check if `typeof x === 'string'`
 */
export function isString(x: unknown): x is string {
    return typeof x === 'string';
}

/**
 * Check if `typeof x === 'boolean'`
 */
export function isBoolean(x: unknown): x is boolean {
    return typeof x === 'boolean';
}

/**
 * Check if `typeof x === 'symbol'`
 */
export function isSymbol(x: unknown): x is symbol {
    return typeof x === 'symbol';
}

/**
 * Check if `x !== null && typeof x === 'object'`
 */
export function isObject(x: unknown): x is AnyObjectType {
    return x !== null && typeof x === 'object';
}

/**
 * Check if `typeof x === 'function'`
 */
export function isFunction(x: unknown): x is (...args: unknown[]) => unknown {
    return typeof x === 'function';
}

/**
 * Check if x is an array (uses `Array.isArray`)
 */
export function isArray(x: unknown[] | readonly unknown[]): boolean;
export function isArray(x: unknown): x is unknown[];
export function isArray(x: unknown): x is unknown[] {
    return Array.isArray(x);
}

/**
 * Check if `x === null`
 */
export function isNull(x: unknown): x is null {
    return x === null;
}

/**
 * Check if `x === undefined`
 */
export function isUndefined(x: unknown): x is undefined {
    return x === undefined;
}

/**
 * Check if `x == null`
 */
export function isNullish(x: unknown): x is undefined | null {
    return x == null;
}

// #region instanceof type guards

/**
 * Check if `x instanceof Date`
 */
export function isDate(x: unknown): x is Date {
    return x instanceof Date;
}

/**
 * Check if `x instanceof Map`
 */
export function isMap(x: unknown): x is Map<unknown, unknown> {
    return x instanceof Map;
}

/**
 * Check if `x instanceof Set`
 */
export function isSet(x: unknown): x is Set<unknown> {
    return x instanceof Set;
}

// #endregion

// #region Type Guards with possibly uncertain return types
//
// The return type of the following type guard functions might not be 100% accurate
// for all use cases, but works when used correctly.

/**
 * Check if x is a 'regular object' (not an array, Map, Set, Date, etc.):
 *
 * `isObject(x) && Object.getPrototypeOf(x) === Object.prototype`
 */
export function isRegularObject(x: AnyObjectType): boolean;
export function isRegularObject(x: unknown): x is AnyObjectType;
export function isRegularObject(x: unknown): x is AnyObjectType {
    return isObject(x) && Object.getPrototypeOf(x) === Object.prototype;
}

/**
 * Check if x is a 'regular object' without any enumerable properties:
 *
 * ```
 * if (!isRegularObject(x)) return false;
 * for (const _ in x) return false;
 * return true;
 * ```
 *
 * This uses `isRegularObject` to avoid false positives with
 * object types that isn't expected to have any enumerable properties
 * (like Map, Set, Date)
 */
export const isEmptyObject = (x: unknown): x is EmptyObjectType => {
    if (!isRegularObject(x)) return false;
    for (const _ in x) return false;
    return true;
};

/**
 * Check if typeof x is 'number' and x is not NaN:
 *
 * `isNumber(x) && !Number.isNaN(x)`
 */
export function isValidNumber(x: number): boolean;
export function isValidNumber(x: unknown): x is number;
export function isValidNumber(x: unknown): x is number {
    return isNumber(x) && !Number.isNaN(x);
}

/**
 * Check if typeof x is 'number' and x is a finite integer value:
 *
 * `isNumber(x) && x % 1 === 0`
 */
export function isInt(x: number): boolean;
export function isInt(x: unknown): x is number;
export function isInt(x: unknown): x is number {
    return isNumber(x) && x % 1 === 0;
}

/**
 * Check if typeof x is 'number' and x is a finite non-integer value:
 *
 * `isNumber(x) && Number.isFinite(x) && x % 1 !== 0`
 */
export function isFloat(x: number): boolean;
export function isFloat(x: unknown): x is number;
export function isFloat(x: unknown): x is number {
    return isNumber(x) && Number.isFinite(x) && x % 1 !== 0;
}

/**
 * Check if x is a Date instance, and the date's timestamp is not NaN:
 *
 * `isDate(x) && !Number.isNaN(+x)`
 */
export function isValidDate(x: Date): boolean;
export function isValidDate(x: unknown): x is Date;
export function isValidDate(x: unknown): x is Date {
    return isDate(x) && !Number.isNaN(+x);
}

/**
 * Check if x is any truthy value (`!!x`)
 */
export function isTruthy<T>(x: T | Falsy): x is Exclude<typeof x, Falsy> {
    return !!x;
}

/**
 * Check if x is any falsy value (`!x`)
 */
export function isFalsy(x: unknown): x is Falsy {
    return !x;
}

// #endregion
// #endregion

// #region Type Definitions

/**
 * Type representation of any object type.
 */
export type AnyObjectType = Record<PropertyKey, unknown>;

/**
 * Type representation of an empty regular object (an object without any enumerable properties).
 */
export type EmptyObjectType = Partial<Record<PropertyKey, never>>;

/**
 * Type representation of any falsy value.
 *
 * This is not a complete type to represent all falsy values in JavaScript,
 * since Typescript doesn't have a type for `NaN`.
 */
export type Falsy = null | undefined | false | 0 | '';

// #endregion
