/**
 * Type representation of any object type.
 */
export type AnyObjectType = Record<PropertyKey, unknown>;

/**
 * Type representation of an empty regular object (an object without any enumerable properties).
 */
export type EmptyObjectType = Partial<Record<PropertyKey, never>>;

/**
 * Type representation of a function with unknown parameters and return type.
 */
export type AnyFunctionType = (...args: unknown[]) => unknown;

/**
 * Type representation of a constructor function with unknown parameters and return type.
 */
export type AnyConstructorType = abstract new (...args: unknown[]) => unknown;

/**
 * Type representation of any falsy value.
 *
 * This is not a complete type to represent all falsy values in JavaScript,
 * since Typescript doesn't have a type for `NaN`.
 */
export type Falsy = null | undefined | false | 0 | '';

/**
 * Check if typeof x is 'number' and x is not NaN
 */
export const isNum = ((x: unknown): x is number =>
    typeof x === 'number' && !Number.isNaN(x)) as {
    (x: number): boolean;
    (x: unknown): x is number;
};

/**
 * Check if typeof x is 'string'
 */
export const isStr = (x: unknown): x is string => typeof x === 'string';

/**
 * Check if typeof x is 'boolean'
 */
export const isBool = (x: unknown): x is boolean => typeof x === 'boolean';

/**
 * Check if typeof x is 'object' and it's not null.
 */
export const isObj = (x: unknown): x is AnyObjectType =>
    x !== null && typeof x === 'object';

/**
 * Check if x is an array (uses `Array.isArray`)
 */
export const isArr = ((x: unknown): x is unknown[] => Array.isArray(x)) as {
    (x: unknown[] | readonly unknown[]): boolean;
    (x: unknown): x is unknown[];
};

/**
 * Check if typeof x is 'function'
 */
export const isFn = (x: unknown): x is (...args: unknown[]) => unknown =>
    typeof x === 'function';

/**
 * Check if x is null
 */
export const isNull = (x: unknown): x is null => x === null;

/**
 * Check if x is undefined
 */
export const isUndef = (x: unknown): x is undefined => x === undefined;

/**
 * Check if x is undefined or null
 */
export const isNullish = (x: unknown): x is undefined | null => x == null;

/**
 * Check if x is instanceof DateConstructor
 */
export const isDate = (x: unknown): x is Date => x instanceof Date;

/**
 * Check if typeof x is 'symbol'
 */
export const isSymbol = (x: unknown): x is symbol => typeof x === 'symbol';

/**
 * Check if x is instanceof MapConstructor
 */
export const isMap = (x: unknown): x is Map<unknown, unknown> =>
    x instanceof Map;

/**
 * Check if x is instanceof SetConstructor
 */
export const isSet = (x: unknown): x is Set<unknown> => x instanceof Set;

/**
 * Check if x is object and if x has no enumerable properties
 */
export const isEmptyObj = ((x: unknown): x is EmptyObjectType => {
    if (!isObj(x)) return false;
    for (const _ in x) return false;
    return true;
}) as {
    (x: unknown[]): x is never[];
    (x: unknown): x is EmptyObjectType;
};

export const isRegularObj = ((x: unknown): x is AnyObjectType => {
    return (
        x != null &&
        typeof x === 'object' &&
        Object.getPrototypeOf(x) === Object.prototype
    );
}) as {
    (x: object): boolean;
    (x: unknown): x is AnyObjectType;
};

// TS UNCERTAIN RETURN TYPES

/**
 * Check if typeof x is 'number' and x is a finite integer value
 * (i.e., `x % 1 === 0`)
 */
export const isInt = ((x: unknown): x is number => {
    return typeof x === 'number' && x % 1 === 0;
}) as {
    (x: number): boolean;
    (x: unknown): x is number;
};

/**
 * Check if typeof x is 'number', x is not
 * NaN and x is a float value
 */
export const isFloat = ((x: unknown): x is number => {
    if (typeof x !== 'number') return false;
    const r = x % 1;
    return !Number.isNaN(r) && r !== 0;
}) as {
    (x: number): boolean;
    (x: unknown): x is number;
};

/**
 * Check if x is instanceof DateConstructor and it has a valid time value
 * (`x.getTime()` is not `NaN`)
 */
export const isValidDate = ((x: unknown): x is Date => {
    return x instanceof Date && !Number.isNaN(x.getTime());
}) as {
    (x: Date): boolean;
    (x: unknown): x is Date;
};

/** Check if x is any non-falsy value */
export const isTruthy = <T>(x: T | Falsy): x is Exclude<typeof x, Falsy> => !!x;

/** Check if x is any falsy value */
export const isFalsy = (x: unknown): x is Falsy => !x;
