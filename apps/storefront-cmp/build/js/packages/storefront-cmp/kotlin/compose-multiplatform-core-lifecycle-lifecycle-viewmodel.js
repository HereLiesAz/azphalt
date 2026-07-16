(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-viewmodel'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-viewmodel'.");
    }
    root['compose-multiplatform-core-lifecycle-lifecycle-viewmodel'] = factory(typeof this['compose-multiplatform-core-lifecycle-lifecycle-viewmodel'] === 'undefined' ? {} : this['compose-multiplatform-core-lifecycle-lifecycle-viewmodel'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var protoOf = kotlin_kotlin.$_$.ib;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var VOID = kotlin_kotlin.$_$.g;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ViewModelStore, 'ViewModelStore', classMeta, VOID, VOID, ViewModelStore);
  //endregion
  function ViewModelStore() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.s4q_1 = LinkedHashMap_init_$Create$();
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = ViewModelStore;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-lifecycle-lifecycle-viewmodel.js.map
