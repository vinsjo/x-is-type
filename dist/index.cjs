var t=function(t){return function(){return[].slice.call(arguments).every(t)}},r=t(function(t){return"number"==typeof t&&!Number.isNaN(t)}),e=t(function(t){return"number"==typeof t&&!Number.isNaN(t)&&t%1==0}),n=t(function(t){return"number"==typeof t&&!Number.isNaN(t)&&t%1!=0}),o=t(function(t){return"string"==typeof t}),i=t(function(t){return"boolean"==typeof t}),u=t(function(t){return"object"==typeof t&&t instanceof Object}),s=t(Array.isArray),f=t(function(t){return"function"==typeof t}),c=t(function(t){return null===t}),p=t(function(t){return void 0===t}),a=t(function(t){return t instanceof Date}),x=t(function(t){return t instanceof Date&&!isNaN(Number(t))}),N=t(function(t){return!!t}),y=t(function(t){return!t});exports.createTypeChecker=t,exports.isArr=s,exports.isBool=i,exports.isDate=a,exports.isFalsy=y,exports.isFloat=n,exports.isFn=f,exports.isInt=e,exports.isNull=c,exports.isNum=r,exports.isObj=u,exports.isStr=o,exports.isTruthy=N,exports.isUndef=p,exports.isValidDate=x;
//# sourceMappingURL=index.cjs.map
