/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, test } from '@jest/globals';

/**
 * Type of the exports from the source module.
 */
type Source = typeof import('../src');

type TestFunctionValues = [
    // Values where function is expected to return false
    expectedFalseValues: unknown[],
    // Values where function is expected to return true
    expectedTrueValues: unknown[]
];

/**
 * Function names exported from the source module.
 */
type ExportedFunctionName = Extract<keyof Source, string>;

const testValueToString = (value: unknown): string => {
    if (value == null || typeof value !== 'object') {
        return typeof value === 'string' ? `"${value}"` : String(value);
    }
    if (
        Array.isArray(value) ||
        Object.getPrototypeOf(value) === Object.prototype
    ) {
        return JSON.stringify(value);
    }
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? 'Invalid Date' : 'Date';
    }

    if (value instanceof Set || value instanceof Map) {
        return `${value instanceof Set ? 'Set' : 'Map'}(${JSON.stringify([
            ...value,
        ])})`;
    }

    return value.toString();
};

const runFunctionTest = (
    source: Source,
    name: ExportedFunctionName,
    [expectedFalseValues, expectedTrueValues]: TestFunctionValues
) => {
    const fn = source[name] as (value: unknown) => boolean;

    const defineTests = (values: unknown[], expectedResult: boolean) => {
        for (const value of values) {
            test(`expect ${name}(${testValueToString(
                value
            )}) to return ${expectedResult}`, () => {
                expect(fn(value)).toBe(expectedResult);
            });
        }
    };

    describe(name, () => {
        defineTests(expectedFalseValues, false);
        defineTests(expectedTrueValues, true);
    });
};

const argsByName: Record<ExportedFunctionName, TestFunctionValues> = {
    isNum: [
        ['', NaN, new Number()],
        [1, 100, Infinity],
    ],
    isStr: [
        [1, null, {}, new String()],
        ['', String()],
    ],
    isBool: [
        [1, null, {}],
        [true, false, Boolean()],
    ],
    isObj: [
        [null, '', Symbol(1)],
        [{}, [], new Date()],
    ],
    isArr: [
        [{}, new Set(), new Map()],
        [[], Array(1)],
    ],
    isFn: [
        [null, {}, 1],
        [() => {}, function () {}, class TestClass {}],
    ],
    isNull: [[undefined, false, 0, {}], [null]],
    isUndef: [[null, 0, false, NaN], [undefined]],
    isNullish: [
        [false, 0, 'undefined', NaN],
        [null, undefined],
    ],
    isDate: [[{}, new Date().toString(), 0], [new Date()]],
    isSymbol: [[{}, [], '', 1], [Symbol()]],
    isMap: [[[], {}, new Set()], [new Map()]],
    isSet: [[[], {}, new Map()], [new Set()]],
    isInt: [
        [1.1, NaN, Infinity],
        [1, 2, 3],
    ],
    isFloat: [
        [1, NaN, Infinity],
        [1.1, 3.14, 0.0000000001],
    ],
    isValidDate: [
        [{}, new Date().toString(), new Date('invalid')],
        [new Date(), new Date('1970-01-01')],
    ],
    isFalsy: [
        [1, ' ', true, [], {}],
        [null, undefined, false, 0, '', NaN],
    ],
    isTruthy: [
        [null, undefined, false, 0, '', NaN],
        [1, ' ', true, [], {}],
    ],
    isEmptyObj: [
        [null, '', Symbol(), { foo: 'bar' }, [1]],
        [{}, [], new Set(), new Map()],
    ],
    isRegularObj: [
        [null, '', Symbol(1), [], new Set(), new Map()],
        [{}, { foo: 'bar' }, { a: 1, b: 2 }, { x: 'y' }],
    ],
};

/**
 * Run tests for the exported functions.
 *
 * @param source - Exported functions from `src` or `dist`
 */
export const runTests = async (source: Source) => {
    (Object.keys(argsByName) as (keyof typeof argsByName)[]).forEach((name) => {
        runFunctionTest(source, name, argsByName[name]);
    });
};
