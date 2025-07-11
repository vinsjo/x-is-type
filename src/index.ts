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

/**
 * Check if typeof x is 'number'
 */
export function isNumber(x: unknown): x is number {
    return typeof x === 'number';
}

/**
 * Check if typeof x is 'string'
 */
export function isString(x: unknown): x is string {
    return typeof x === 'string';
}

/**
 * Check if typeof x is 'boolean'
 */
export function isBoolean(x: unknown): x is boolean {
    return typeof x === 'boolean';
}

/**
 * Check if typeof x is 'object' and it's not null.
 */
export function isObject(x: unknown): x is AnyObjectType {
    return x !== null && typeof x === 'object';
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
 * Check if typeof x is 'function'
 */
export function isFunction(x: unknown): x is (...args: unknown[]) => unknown {
    return typeof x === 'function';
}
/**
 * Check if x is null
 */
export function isNull(x: unknown): x is null {
    return x === null;
}

/**
 * Check if x is undefined
 */
export function isUndefined(x: unknown): x is undefined {
    return x === undefined;
}

/**
 * Check if x is undefined or null
 */
export function isNullish(x: unknown): x is undefined | null {
    return x == null;
}

/**
 * Check if x is instanceof DateConstructor
 */
export function isDate(x: unknown): x is Date {
    return x instanceof Date;
}

/**
 * Check if typeof x is 'symbol'
 */
export function isSymbol(x: unknown): x is symbol {
    return typeof x === 'symbol';
}

/**
 * Check if x is instanceof MapConstructor
 */
export function isMap(x: unknown): x is Map<unknown, unknown> {
    return x instanceof Map;
}

/**
 * Check if x is instanceof SetConstructor
 */
export function isSet(x: unknown): x is Set<unknown> {
    return x instanceof Set;
}

// TS UNCERTAIN RETURN TYPES
//
// The asserted type of the following type guard functions might not be 100% accurate
// for all use cases, but works when used correctly.

/**
 * Check if x is a 'regular object' (not an array, Map, Set, Date, etc.)
 *
 * Uses `isObject` to check if x is an object and also checks if
 * the prototype of x is `Object.prototype`.
 */
export function isRegularObject(x: AnyObjectType): boolean;
export function isRegularObject(x: unknown): x is AnyObjectType;
export function isRegularObject(x: unknown): x is AnyObjectType {
    return isObject(x) && Object.getPrototypeOf(x) === Object.prototype;
}

/**
 * Check if x is a 'regular object' without any enumerable properties.
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
 * Check if typeof x is 'number' and x is not NaN
 */
export function isValidNumber(x: number): boolean;
export function isValidNumber(x: unknown): x is number;
export function isValidNumber(x: unknown): x is number {
    return isNumber(x) && !Number.isNaN(x);
}

/**
 * Check if typeof x is 'number' and x is a finite integer value
 * (i.e., `x % 1 === 0`)
 */
export function isInt(x: number): boolean;
export function isInt(x: unknown): x is number;
export function isInt(x: unknown): x is number {
    return isNumber(x) && x % 1 === 0;
}

/**
 * Check if typeof x is 'number', x is not
 * NaN and x is a float value
 */
export function isFloat(x: number): boolean;
export function isFloat(x: unknown): x is number;
export function isFloat(x: unknown): x is number {
    if (!isNumber(x)) return false;
    const r = x % 1;
    return r !== 0 && !Number.isNaN(r);
}

/**
 * Check if x is instanceof DateConstructor and it has a valid time value
 * (`x.getTime()` is not `NaN`)
 */
export function isValidDate(x: Date): boolean;
export function isValidDate(x: unknown): x is Date;
export function isValidDate(x: unknown): x is Date {
    return isDate(x) && !Number.isNaN(x.getTime());
}
/**
 * Check if x is any non-falsy value.
 *
 * This is functionally equivalent to `!!x`, but as a function with type definition.
 */
export function isTruthy<T>(x: T | Falsy): x is Exclude<typeof x, Falsy> {
    return !!x;
}

/** Check if x is any falsy value */
export function isFalsy(x: unknown): x is Falsy {
    return !x;
}
