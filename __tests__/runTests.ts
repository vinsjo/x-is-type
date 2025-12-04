import { describe, expect, test } from '@jest/globals';

/**
 * Type of the exports from the source module.
 */
type Source = typeof import('../src');

/**
 * Function names exported from the source module.
 */
type ExportedTypeGuardFunctionName = Extract<
    keyof {
        [K in keyof Source as Source[K] extends (x: unknown) => boolean
            ? K
            : never]: Source[K];
    },
    string
>;

type TestFunctionValues = {
    /**
     * Values where function is expected to return false
     */
    expectFalse: unknown[];
    /**
     * Values where function is expected to return true
     */
    expectTrue: unknown[];
};

/**
 * Stringify value passed to test function, for use in test name.
 */
const testValueToString = (value: unknown): string => {
    if (value == null || typeof value !== 'object') {
        return typeof value === 'string' ? `"${value}"` : String(value);
    }

    if (value instanceof Date) {
        return `Date(${value.toJSON()})`;
    }

    if (
        Array.isArray(value) ||
        Object.getPrototypeOf(value) === Object.prototype
    ) {
        return JSON.stringify(value);
    }

    if (value instanceof Set || value instanceof Map) {
        return (
            (value instanceof Set ? 'Set' : 'Map') +
            `(${JSON.stringify(Array.from(value))})`
        );
    }

    return String(value) || `[object ${value.constructor.name || 'Unknown'}]`;
};

/**
 * Run tests for the exported functions.
 *
 * @param source - Exported functions from `src` or `dist`
 */
export const runTests = async (
    source: Pick<Source, ExportedTypeGuardFunctionName>
) => {
    const argsByNameEntries = Object.entries({
        isNumber: {
            expectFalse: ['', new Number()],
            expectTrue: [1, 100, NaN, Infinity],
        },
        isString: {
            expectFalse: [1, null, {}, new String()],
            expectTrue: ['', String()],
        },
        isBoolean: {
            expectFalse: [1, null, {}],
            expectTrue: [true, false, Boolean()],
        },
        isObject: {
            expectFalse: [null, '', Symbol(1)],
            expectTrue: [{}, [], new Date(), new FormData()],
        },
        isArray: {
            expectFalse: [{}, new Set(), new Map()],
            expectTrue: [[], Array(1)],
        },
        isFunction: {
            expectFalse: [null, {}, 1],
            expectTrue: [() => {}, function () {}, Map, Function],
        },
        isNull: {
            expectFalse: [undefined, false, 0, {}],
            expectTrue: [null],
        },
        isUndefined: {
            expectFalse: [null, 0, false, NaN],
            expectTrue: [undefined],
        },
        isNullish: {
            expectFalse: [false, 0, 'undefined', NaN],
            expectTrue: [null, undefined],
        },
        isDate: {
            expectFalse: [{}, new Date().toString(), 0],
            expectTrue: [new Date()],
        },
        isSymbol: {
            expectFalse: [{}, [], '', 1],
            expectTrue: [Symbol()],
        },
        isMap: {
            expectFalse: [[], {}, new Set()],
            expectTrue: [new Map()],
        },
        isSet: {
            expectFalse: [[], {}, new Map()],
            expectTrue: [new Set()],
        },
        isInt: {
            expectFalse: [1.1, NaN, Infinity, -Infinity],
            expectTrue: [0, 1, -100, 3_000_000_000],
        },
        isFloat: {
            expectFalse: [1, NaN, Infinity, -Infinity],
            expectTrue: [1.1, -0.1, 3.14, 0.0000000001],
        },
        isValidDate: {
            expectFalse: [{}, new Date().toJSON(), new Date(NaN)],
            expectTrue: [new Date(), new Date('1970-01-01')],
        },
        isValidNumber: {
            expectFalse: [NaN, '1', {}, new Number()],
            expectTrue: [1, 100, Infinity, -Infinity, 0],
        },
        isFalsy: {
            expectFalse: [1, ' ', true, [], {}],
            expectTrue: [null, undefined, false, 0, '', NaN],
        },
        isTruthy: {
            expectFalse: [null, undefined, false, 0, '', NaN],
            expectTrue: [1, ' ', true, [], {}],
        },
        isEmptyObject: {
            expectFalse: [
                null,
                '',
                { foo: 'bar' },
                [],
                [1],
                new Map(),
                new Set(),
            ],
            expectTrue: [{}],
        },
        isRegularObject: {
            expectFalse: [null, '', Symbol(1), [], new Set(), new Map()],
            expectTrue: [{}, { foo: 'bar' }],
        },
    } satisfies Record<ExportedTypeGuardFunctionName, TestFunctionValues>) as [
        ExportedTypeGuardFunctionName,
        TestFunctionValues,
    ][];

    for (const [name, args] of argsByNameEntries) {
        const fn = source[name] as (value: unknown) => boolean;

        const defineTests = (values: unknown[], expectedResult: boolean) => {
            for (const value of values) {
                const testName = `${name}(${testValueToString(value)}) returns ${expectedResult}`;
                test(testName, () => expect(fn(value)).toBe(expectedResult));
            }
        };

        describe(name, () => {
            defineTests(args.expectTrue, true);
            defineTests(args.expectFalse, false);
        });
    }
};
