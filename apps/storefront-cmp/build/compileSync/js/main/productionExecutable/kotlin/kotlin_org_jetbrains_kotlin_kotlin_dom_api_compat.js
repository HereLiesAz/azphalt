(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat'.");
    }
    root.kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat = factory(typeof kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat === 'undefined' ? {} : kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat, this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.ib;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  //endregion
  //region block: pre-declaration
  setMetadataFor(EventListenerHandler, 'EventListenerHandler', classMeta);
  //endregion
  function EventListener(handler) {
    return new EventListenerHandler(handler);
  }
  function EventListenerHandler(handler) {
    this.rj_1 = handler;
  }
  protoOf(EventListenerHandler).sj = function (event) {
    this.rj_1(event);
  };
  protoOf(EventListenerHandler).handleEvent = function (event) {
    return this.sj(event);
  };
  protoOf(EventListenerHandler).toString = function () {
    return 'EventListenerHandler(' + this.rj_1 + ')';
  };
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = EventListener;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlin_org_jetbrains_kotlin_kotlin_dom_api_compat.js.map
