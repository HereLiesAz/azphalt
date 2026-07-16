(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-runtime-runtime.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'.");
    }
    root['compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'] = factory(typeof this['compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'] === 'undefined' ? {} : this['compose-multiplatform-core-lifecycle-lifecycle-runtime-compose'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-runtime-runtime']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_runtime_runtime) {
  'use strict';
  //region block: imports
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.s1;
  //endregion
  //region block: pre-declaration
  //endregion
  function get_LocalLifecycleOwner() {
    _init_properties_LocalLifecycleOwner_kt__sg51c2();
    return LocalLifecycleOwner;
  }
  var LocalLifecycleOwner;
  function LocalLifecycleOwner$lambda() {
    _init_properties_LocalLifecycleOwner_kt__sg51c2();
    var message = 'CompositionLocal LocalLifecycleOwner not present';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  var properties_initialized_LocalLifecycleOwner_kt_56tsrg;
  function _init_properties_LocalLifecycleOwner_kt__sg51c2() {
    if (!properties_initialized_LocalLifecycleOwner_kt_56tsrg) {
      properties_initialized_LocalLifecycleOwner_kt_56tsrg = true;
      LocalLifecycleOwner = staticCompositionLocalOf(LocalLifecycleOwner$lambda);
    }
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = get_LocalLifecycleOwner;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-lifecycle-lifecycle-runtime-compose.js.map
