/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, expect, test } from '@jest/globals';
import type * as src from '../src';

type TestArgs = [expectedFalseArgs: unknown[][], expectedTrueArgs: unknown[][]];

const args = (first: unknown, ...rest: unknown[]): unknown[][] =>
    [first, ...rest].map((arg) => [arg]);

const createRunTests = (tests: { [K in keyof typeof src]: TestArgs }) => {
    const testCallbacks = (
        Object.entries(tests) as Array<[name: keyof typeof src, args: TestArgs]>
    ).map(([name, [expectedFalseArgs, expectedTrueArgs]]) => {
        const onUnexpected = (args: unknown[], result: boolean) => {
            console.log(
                `unexpected result: ${name}(${args
                    .map((arg) => String(arg))
                    .join(', ')}) === ${result}`
            );
        };
        return (x: typeof src) => {
            const typeChecker = x[name] as (...args: unknown[]) => boolean;

            describe(name, () => {
                test('expect false', () => {
                    for (const args of expectedFalseArgs) {
                        const result = typeChecker(...args);
                        if (result) onUnexpected(args, result);
                        expect(result).toBe(false);
                    }
                });
                test('expect true', () => {
                    for (const args of expectedTrueArgs) {
                        const result = typeChecker(...args);
                        if (!result) onUnexpected(args, result);
                        expect(result).toBe(true);
                    }
                });
            });
        };
    });

    return (x: typeof src) => {
        testCallbacks.forEach((test) => test(x));
    };
};

export const runTests = createRunTests({
    isNum: [args('', NaN), args(1, 100, Infinity)],
    isEmptyObj: [
        args(null, '', Symbol(), { foo: 'bar' }, [1]),
        args({}, [], new Set(), new Map()),
    ],
    isStr: [args(1, null, {}), args('', String())],
    isBool: [args(1, null, {}), args(true, false, Boolean())],
    isObj: [args(null, '', Symbol(1)), args({}, [], new Date())],
    isArr: [args({}, new Set(), new Map()), args([], Array(1))],
    isFn: [
        args(null, {}, 1),
        args(
            () => {},
            function () {}
        ),
    ],
    isNull: [args(undefined, false, 0, {}), args(null)],
    isUndef: [args(null, 0, false, NaN), args(undefined)],
    isNullish: [args(false, 0, 'undefined', NaN), args(null, undefined)],
    isDate: [args({}, new Date().toString(), 0), args(new Date())],
    isSymbol: [args({}, [], '', 1), args(Symbol())],
    isMap: [args([], {}, new Set()), args(new Map())],
    isSet: [args([], {}, new Map()), args(new Set())],
    isInt: [args(1.1, NaN, Infinity), args(1, 2, 3)],
    isFloat: [args(1, NaN, Infinity), args(1.1, 3.14, 0.0000000001)],
    isValidDate: [
        args({}, new Date().toString(), new Date('invalid')),
        args(new Date(), new Date('1970-01-01')),
    ],
    isFalsy: [
        args(1, ' ', true, [], {}),
        args(null, undefined, false, 0, '', NaN),
    ],
    isTruthy: [
        args(null, undefined, false, 0, '', NaN),
        args(1, ' ', true, [], {}),
    ],
    isRegularObj: [
        args(null, '', Symbol(1), [], new Set(), new Map()),
        args({}, { foo: 'bar' }, { a: 1, b: 2 }, { x: 'y' }),
    ],
});
