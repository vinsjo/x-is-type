# x-is-type

`x-is-type` is a minimal package for simple type-checks of basic types, mainly
intended to reduce repetition and increase readability when doing type checking.

Package is bundled using [unbuild](https://www.npmjs.com/package/unbuild)

## Installation

`npm i x-is-type`

### Importing

```js
// ESM:
import { isNumber, isString, isObject } from 'x-is-type';
// CommonJS:
const { isNumber, isString, isObject } = require('x-is-type');
```

## Usage

This package includes the following functions for type checking of one or more variables.

```js
/** Check if typeof value is 'number' */
isNumber(1); // => true
isNumber(NaN); // => true
isNumber('1'); // => false

/** Check if typeof value is 'number' and not NaN */
isValidNumber(1); // => true
isValidNumber(NaN); // => false
isValidNumber('1'); // => false

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

/** Check if value is not null and typeof value is 'object' */
isObject({ foo: 'bar' }); // => true
isObject([]); // => true
isObject(new Set()); // => true
isObject(null); // => false

/** Check if value is an array (uses Array.isArray) */
isArray([1, 2, 3]); // => true
isArray({}); // => false

/** Check if typeof value is 'function' */
isFunction(() => {}); // => true
isFunction({}); // => false

/** Check if value is null */
isNull(null); // => true
isNull(undefined); // => false

/** Check if value is undefined */
isUndefined(undefined); // => true
isUndefined(null); // => false

/** Check if value is null or undefined */
isNullish(null); // => true
isNullish(undefined); // => true
isNullish(''); // => false

/** Check if value is an instance of DateConstructor */
isDate(new Date()); // => true
isDate('1970-01-01'); // => false

/** Check if value is an instance of DateConstructor and has a valid timestamp */
isValidDate(new Date()); // => true
isValidDate(new Date('hello')); // => false

/** Check if typeof value is 'symbol' */
isSymbol(Symbol(123)); // => true
isSymbol(123); // => false

/** Check if value is an instance of MapConstructor */
isMap(new Map()); // => true
isMap({ foo: 'bar' }); // => false

/** Check if value is an instance of SetConstructor */
isSet(new Set()); // => true
isSet(new Array()); // => false

/** Check if value is a 'regular object' (not array, Map, Set, Date, etc.) */
isRegularObject({}); // => true
isRegularObject([]); // => false
isRegularObject(new Map()); // => false
isRegularObject(new Date()); // => false

/** Check if value is an empty 'regular object' (no enumerable properties) */
isEmptyObject({}); // => true
isEmptyObject({ foo: 'bar' }); // => false
isEmptyObject([]); // => false
isEmptyObject(new Map()); // => false
isEmptyObject(null); // => false

/** Check if x is any non-falsy value */
isTruthy(1); // => true
isTruthy({}); // => true
isTruthy(null); // => false
isTruthy(0); // => false

/** Check if x is any falsy value */
isFalsy(0); // => true
isFalsy(null); // => true
isFalsy(1); // => false
isFalsy({}); // => false
```
