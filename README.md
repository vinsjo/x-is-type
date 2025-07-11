# x-is-type

`x-is-type` is a minimal package for simple type-checks of basic types.

Package is bundled using [microbundle](https://www.npmjs.com/package/microbundle)

## Installation

`npm i x-is-type`

### In Node.js

```js
// ESM:
import { isNum, isStr, isObj } from 'x-is-type';
// CommonJS:
const { isNum, isStr, isObj } = require('x-is-type');
```

## Usage

This package includes the following functions for type checking of one or more variables.

```js
/** Check if typeof value is 'number' and not NaN */
isNum(1); // => true
isNum('1'); // => false
isNum(NaN); // => false

/** Check if value is a finite integer value */
isInt(1); // => true
isInt(1.1); // => false
isInt(Infinity); // => false
isInt(NaN); // => false

/** Check if value is a finite float value */
isFloat(1.1); // => true
isFloat(1); // => false
isFloat(Infinity); // => false
isFloat(NaN); // => false

/** Check if typeof value is 'string' */
isStr('1'); // => true
isStr(1); // => false
isStr(new String()); // => false

/** Check if typeof value is 'boolean' */
isBool(false); // => true
isBool(null); // => false

/**
 * Check if typeof value is 'object',
 * not null and instances of ObjectConstructor
 */
isObj({ foo: 'bar' }); // => true
isObj([]); // => true
isObj(new Set()); // => true
isObj(null); // => false

/** Check if value is an array, (uses Array.isArray) */
isArr([1, 2, 3]); // => true
isArr({}); // => false

/** Check if typeof value is 'function' */
isFn(() => {}); // => true
isFn({}); // => false

/** Check if value is null */
isNull(null); // => true
isNull(undefined); // => false

/** Check if value is undefined */
isUndef(undefined); // => true
isUndef(null); // => false

/** Check if value is null or undefined */
isNullish(null); // => true
isNullish(undefined); // => true
isNullish(''); // => false

/** Check if value is an instance of DateConstructor */
isDate(new Date()); // => true
isDate('1970-01-01'); // => false

/**
 * Check if value is an instance of DateConstructor
 * and has a valid timestamp
 */
isValidDate(new Date(1970, 1, 1)); // => true
isValidDate(new Date('hello')); // => false
isValidDate('1970-01-01'); // => false

/** Check if typeof value is 'symbol' */
isSymbol(Symbol(123)); // => true
isSymbol(123); // => false

/** Check if value is an instance of MapConstructor */
isMap(new Map()); // => true
isMap({ foo: 'bar' }); // => false

/** Check if value is an instance of SetConstructor */
isSet(new Set()); // => true
isSet(new Array()); // => false

/** Check if value is an empty array or object */
isEmptyObject({}); // => true
isEmptyObject([]); // => true
isEmptyObject({ foo: 'bar' }); // => false
isEmptyObject([1, 2, 3]); // => false
isEmptyObject(new Map()); // => false
isEmptyObject(null); // => false

/** Check if value is a 'regular object' */
isRegularObject({}); // => true
isRegularObject([]); // => false
isRegularObject(new Date()); // => false

/** Check if x is any non-falsy value */
isTruthy(1); // => true
isTruthy(0); // => false

/** Check if x is any falsy value */
isFalsy(0); // => true
isFalsy(1); // => false
```
