(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-runtime-runtime.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-runtime-runtime-saveable'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-runtime-runtime-saveable'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-runtime-runtime-saveable'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-runtime-runtime-saveable'.");
    }
    root['compose-multiplatform-core-compose-runtime-runtime-saveable'] = factory(typeof this['compose-multiplatform-core-compose-runtime-runtime-saveable'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-runtime-runtime-saveable'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-runtime-runtime']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_runtime_runtime) {
  'use strict';
  //region block: imports
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.o;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var get_currentCompositeKeyHash = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a1;
  var charSequenceLength = kotlin_kotlin.$_$.y9;
  var toString_0 = kotlin_kotlin.$_$.ae;
  var isInterface = kotlin_kotlin.$_$.wa;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var SideEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var protoOf = kotlin_kotlin.$_$.ib;
  var contentEquals = kotlin_kotlin.$_$.y5;
  var RememberObserver = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var VOID = kotlin_kotlin.$_$.g;
  var toString_1 = kotlin_kotlin.$_$.ng;
  var referentialEqualityPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.k1;
  var structuralEqualityPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t1;
  var neverEqualPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.j1;
  var SnapshotMutableState = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d;
  var toMutableMap = kotlin_kotlin.$_$.v8;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var Map = kotlin_kotlin.$_$.g5;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var get_reuseKey = kotlin_org_jetbrains_compose_runtime_runtime.$_$.n1;
  var CompositionLocalProvider = kotlin_org_jetbrains_compose_runtime_runtime.$_$.l;
  var DisposableEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p;
  var isBlank = kotlin_kotlin.$_$.hd;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.m;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var arrayListOf = kotlin_kotlin.$_$.q5;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.s1;
  var interfaceMeta = kotlin_kotlin.$_$.na;
  //endregion
  //region block: pre-declaration
  setMetadataFor(SaveableHolder, 'SaveableHolder', classMeta, VOID, [RememberObserver]);
  setMetadataFor(RegistryHolder, 'RegistryHolder', classMeta);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta);
  setMetadataFor(SaveableStateHolderImpl, 'SaveableStateHolderImpl', classMeta, VOID, VOID, SaveableStateHolderImpl);
  setMetadataFor(SaveableStateRegistryImpl$registerProvider$3, VOID, classMeta);
  setMetadataFor(SaveableStateRegistryImpl, 'SaveableStateRegistryImpl', classMeta);
  setMetadataFor(Saver, 'Saver', interfaceMeta);
  setMetadataFor(Saver$1, VOID, classMeta, VOID, [Saver]);
  //endregion
  function listSaver(save, restore) {
    var tmp = listSaver$lambda(save);
    return Saver_0(tmp, typeof restore === 'function' ? restore : THROW_CCE());
  }
  function listSaver$lambda($save) {
    return function ($this$Saver, it) {
      var list = $save($this$Saver, it);
      var inductionVariable = 0;
      var last = list.m() - 1 | 0;
      var tmp;
      if (inductionVariable <= last) {
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = list.n(index);
          if (!(item == null)) {
            // Inline function 'kotlin.require' call
            // Inline function 'kotlin.contracts.contract' call
            if (!$this$Saver.b32(item)) {
              // Inline function 'androidx.compose.runtime.saveable.listSaver.<anonymous>.<anonymous>' call
              var message = "item can't be saved";
              throw IllegalArgumentException_init_$Create$(toString(message));
            }
          }
        }
         while (inductionVariable <= last);
        tmp = Unit_instance;
      }
      var tmp_0;
      // Inline function 'kotlin.collections.isNotEmpty' call
      if (!list.u()) {
        tmp_0 = ArrayList_init_$Create$(list);
      } else {
        tmp_0 = null;
      }
      return tmp_0;
    };
  }
  var MaxSupportedRadix;
  function rememberSaveable(inputs, saver, key, init, $composer, $changed, $default) {
    var saver_0 = {_v: saver};
    var key_0 = key;
    var $composer_0 = $composer;
    $composer_0.j1l(441892779);
    sourceInformation($composer_0, 'C(rememberSaveable)P(1,3,2)71@3180L23,81@3526L7,83@3552L313,93@3940L82:RememberSaveable.kt#r2ddri');
    if (!(($default & 2) === 0)) {
      saver_0._v = autoSaver();
    }
    if (!(($default & 4) === 0))
      key_0 = null;
    if (isTraceInProgress()) {
      traceEventStart(441892779, $changed, -1, 'androidx.compose.runtime.saveable.rememberSaveable (RememberSaveable.kt:70)');
    }
    var compositeKey = get_currentCompositeKeyHash($composer_0, 0);
    var tmp;
    // Inline function 'kotlin.text.isNullOrEmpty' call
    var this_0 = key_0;
    // Inline function 'kotlin.contracts.contract' call
    if (!(this_0 == null ? true : charSequenceLength(this_0) === 0)) {
      tmp = key_0;
    } else {
      tmp = toString_0(compositeKey, MaxSupportedRadix);
    }
    var finalKey = tmp;
    var tmp_0 = saver_0._v;
    if (!isInterface(tmp_0, Saver))
      THROW_CCE();
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_1 = get_LocalSaveableStateRegistry();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_1);
    sourceInformationMarkerEnd($composer_1);
    var registry = tmp0;
    $composer_0.j1l(-1519365315);
    sourceInformation($composer_0, 'CC(remember):RememberSaveable.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp_1;
    if (false ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.runtime.saveable.rememberSaveable.<anonymous>' call
      var tmp1_safe_receiver = registry == null ? null : registry.c32(finalKey);
      var tmp_2;
      if (tmp1_safe_receiver == null) {
        tmp_2 = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.runtime.saveable.rememberSaveable.<anonymous>.<anonymous>' call
        tmp_2 = saver_0._v.d32(tmp1_safe_receiver);
      }
      var restored = tmp_2;
      var finalValue = restored == null ? init() : restored;
      var value = new SaveableHolder(saver_0._v, registry, finalKey, finalValue, inputs);
      $composer_0.d1z(value);
      tmp_1 = value;
    } else {
      tmp_1 = it;
    }
    var tmp_3 = tmp_1;
    var tmp1_group = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
    $composer_0.l1l();
    var holder = tmp1_group;
    var tmp0_elvis_lhs = holder.l32(inputs);
    var value_0 = tmp0_elvis_lhs == null ? init() : tmp0_elvis_lhs;
    SideEffect(rememberSaveable$lambda(holder, saver_0, registry, finalKey, value_0, inputs), $composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return value_0;
  }
  function register($this) {
    var registry = $this.f32_1;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!($this.j32_1 == null)) {
      // Inline function 'androidx.compose.runtime.saveable.SaveableHolder.register.<anonymous>' call
      var message = 'entry(' + $this.j32_1 + ') is not null';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (!(registry == null)) {
      requireCanBeSaved(registry, $this.k32_1());
      $this.j32_1 = registry.m32($this.g32_1, $this.k32_1);
    }
  }
  function SaveableHolder$valueProvider$lambda(this$0) {
    return function () {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.saveable.SaveableHolder.valueProvider.<anonymous>.<anonymous>' call
      var $this$with = this$0.e32_1;
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlin.requireNotNull' call
        var value = this$0.h32_1;
        // Inline function 'kotlin.contracts.contract' call
        if (value == null) {
          // Inline function 'androidx.compose.runtime.saveable.SaveableHolder.valueProvider.<anonymous>.<anonymous>.<anonymous>' call
          var message = 'Value should be initialized';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          tmp$ret$1 = value;
          break $l$block;
        }
      }
      return $this$with.n32(this$0, tmp$ret$1);
    };
  }
  function SaveableHolder(saver, registry, key, value, inputs) {
    this.e32_1 = saver;
    this.f32_1 = registry;
    this.g32_1 = key;
    this.h32_1 = value;
    this.i32_1 = inputs;
    this.j32_1 = null;
    var tmp = this;
    tmp.k32_1 = SaveableHolder$valueProvider$lambda(this);
  }
  protoOf(SaveableHolder).o32 = function (saver, registry, key, value, inputs) {
    var entryIsOutdated = false;
    if (!(this.f32_1 === registry)) {
      this.f32_1 = registry;
      entryIsOutdated = true;
    }
    if (!(this.g32_1 === key)) {
      this.g32_1 = key;
      entryIsOutdated = true;
    }
    this.e32_1 = saver;
    this.h32_1 = value;
    this.i32_1 = inputs;
    if (!(this.j32_1 == null) ? entryIsOutdated : false) {
      var tmp0_safe_receiver = this.j32_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        tmp0_safe_receiver.p32();
      }
      this.j32_1 = null;
      register(this);
    }
  };
  protoOf(SaveableHolder).b32 = function (value) {
    var registry = this.f32_1;
    return registry == null ? true : registry.b32(value);
  };
  protoOf(SaveableHolder).g1w = function () {
    register(this);
  };
  protoOf(SaveableHolder).i1w = function () {
    var tmp0_safe_receiver = this.j32_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.p32();
    }
  };
  protoOf(SaveableHolder).h1w = function () {
    var tmp0_safe_receiver = this.j32_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.p32();
    }
  };
  protoOf(SaveableHolder).l32 = function (inputs) {
    var tmp;
    if (contentEquals(inputs, this.i32_1)) {
      tmp = this.h32_1;
    } else {
      tmp = null;
    }
    return tmp;
  };
  function requireCanBeSaved(_this__u8e3s4, value) {
    if (!(value == null) ? !_this__u8e3s4.b32(value) : false) {
      var tmp;
      if (!(value == null) ? isInterface(value, SnapshotMutableState) : false) {
        var tmp_0;
        if ((!(value.t24() === neverEqualPolicy()) ? !(value.t24() === structuralEqualityPolicy()) : false) ? !(value.t24() === referentialEqualityPolicy()) : false) {
          tmp_0 = 'If you use a custom SnapshotMutationPolicy for your MutableState you have to write a custom Saver';
        } else {
          tmp_0 = 'MutableState containing ' + toString_1(value.s2()) + ' cannot be saved using the current ' + 'SaveableStateRegistry. The default implementation only supports types ' + 'which can be stored inside the Bundle. Please consider implementing a ' + 'custom Saver for this class and pass it as a stateSaver parameter to ' + 'rememberSaveable().';
        }
        tmp = tmp_0;
      } else {
        tmp = toString_1(value) + ' cannot be saved using the current SaveableStateRegistry. The default ' + 'implementation only supports types which can be stored inside the Bundle' + '. Please consider implementing a custom Saver for this class and pass it' + ' to rememberSaveable().';
      }
      throw IllegalArgumentException_init_$Create$(tmp);
    }
  }
  function rememberSaveable$lambda($holder, $saver, $registry, $finalKey, $value, $inputs) {
    return function () {
      $holder.o32($saver._v, $registry, $finalKey, $value, $inputs);
      return Unit_instance;
    };
  }
  function rememberSaveableStateHolder($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(15454635);
    sourceInformation($composer_0, 'C(rememberSaveableStateHolder)*61@2439L41,59@2369L111,64@2554L7:SaveableStateHolder.kt#r2ddri');
    if (isTraceInProgress()) {
      traceEventStart(15454635, $changed, -1, 'androidx.compose.runtime.saveable.rememberSaveableStateHolder (SaveableStateHolder.kt:59)');
    }
    // Inline function 'kotlin.apply' call
    var tmp = Companion_getInstance_0().q32_1;
    $composer_0.j1l(-796083518);
    sourceInformation($composer_0, 'CC(remember):SaveableStateHolder.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp_0;
    if (false ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.runtime.saveable.rememberSaveableStateHolder.<anonymous>' call
      var value = rememberSaveableStateHolder$lambda;
      $composer_0.d1z(value);
      tmp_0 = value;
    } else {
      tmp_0 = it;
    }
    var tmp_1 = tmp_0;
    var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    $composer_0.l1l();
    var this_0 = rememberSaveable([], tmp, null, tmp1_group, $composer_0, 3080, 4);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.saveable.rememberSaveableStateHolder.<anonymous>' call
    var tmp_2 = this_0;
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_1 = get_LocalSaveableStateRegistry();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_1);
    sourceInformationMarkerEnd($composer_1);
    tmp_2.t32_1 = tmp0;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return this_0;
  }
  function SaveableStateHolderImpl$RegistryHolder$registry$lambda(this$0) {
    return function (it) {
      var tmp0_safe_receiver = this$0.t32_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b32(it);
      return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
    };
  }
  function SaveableStateHolderImpl$Companion$Saver$lambda($this$Saver, it) {
    return saveAll(it);
  }
  function SaveableStateHolderImpl$Companion$Saver$lambda_0(it) {
    return new SaveableStateHolderImpl(it);
  }
  function saveAll($this) {
    var map = toMutableMap($this.r32_1);
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = $this.s32_1.n2().o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.saveAll.<anonymous>' call
      element.y32(map);
    }
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp;
    if (map.u()) {
      // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.saveAll.<anonymous>' call
      tmp = null;
    } else {
      tmp = map;
    }
    return tmp;
  }
  function RegistryHolder($outer, key) {
    this.x32_1 = $outer;
    this.u32_1 = key;
    this.v32_1 = true;
    var tmp = this;
    var tmp_0 = this.x32_1.r32_1.z2(this.u32_1);
    tmp.w32_1 = SaveableStateRegistry(tmp_0, SaveableStateHolderImpl$RegistryHolder$registry$lambda(this.x32_1));
  }
  protoOf(RegistryHolder).y32 = function (map) {
    if (this.v32_1) {
      var savedData = this.w32_1.z32();
      if (savedData.u()) {
        // Inline function 'kotlin.collections.minusAssign' call
        var key = this.u32_1;
        map.t2(key);
      } else {
        // Inline function 'kotlin.collections.set' call
        var key_0 = this.u32_1;
        map.p2(key_0, savedData);
      }
    }
  };
  function Companion() {
    Companion_instance = this;
    var tmp = this;
    var tmp_0 = SaveableStateHolderImpl$Companion$Saver$lambda;
    tmp.q32_1 = Saver_0(tmp_0, SaveableStateHolderImpl$Companion$Saver$lambda_0);
  }
  var Companion_instance;
  function Companion_getInstance_0() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function _no_name_provided__qut3iv($registryHolder, this$0, $key) {
    this.a33_1 = $registryHolder;
    this.b33_1 = this$0;
    this.c33_1 = $key;
  }
  protoOf(_no_name_provided__qut3iv).or = function () {
    // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.SaveableStateProvider.<anonymous>.<anonymous>.<anonymous>' call
    this.a33_1.y32(this.b33_1.r32_1);
    // Inline function 'kotlin.collections.minusAssign' call
    var this_0 = this.b33_1.s32_1;
    var key = this.c33_1;
    this_0.t2(key);
  };
  function SaveableStateHolderImpl$SaveableStateProvider$lambda(this$0, $key, $registryHolder) {
    return function ($this$DisposableEffect) {
      // Inline function 'kotlin.collections.contains' call
      var this_0 = this$0.s32_1;
      // Inline function 'kotlin.collections.containsKey' call
      var key = $key;
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (!!(isInterface(this_0, Map) ? this_0 : THROW_CCE()).w2(key)) {
        // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.SaveableStateProvider.<anonymous>.<anonymous>.<anonymous>' call
        var message = 'Key ' + toString($key) + ' was used multiple times ';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      var this_1 = this$0.r32_1;
      var key_0 = $key;
      this_1.t2(key_0);
      var this_2 = this$0.s32_1;
      var key_1 = $key;
      var value = $registryHolder;
      this_2.p2(key_1, value);
      // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
      return new _no_name_provided__qut3iv($registryHolder, this$0, $key);
    };
  }
  function SaveableStateHolderImpl$SaveableStateProvider$lambda_0($tmp0_rcvr, $key, $content, $$changed) {
    return function ($composer, $force) {
      $tmp0_rcvr.d33($key, $content, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function SaveableStateHolderImpl(savedStates) {
    Companion_getInstance_0();
    var tmp;
    if (savedStates === VOID) {
      // Inline function 'kotlin.collections.mutableMapOf' call
      tmp = LinkedHashMap_init_$Create$();
    } else {
      tmp = savedStates;
    }
    savedStates = tmp;
    this.r32_1 = savedStates;
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_0.s32_1 = LinkedHashMap_init_$Create$();
    this.t32_1 = null;
  }
  protoOf(SaveableStateHolderImpl).d33 = function (key, content, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-1198538093);
    sourceInformation($composer_0, 'C(SaveableStateProvider)P(1)75@2967L923:SaveableStateHolder.kt#r2ddri');
    var $dirty = $changed;
    if (isTraceInProgress()) {
      traceEventStart(-1198538093, $dirty, -1, 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.SaveableStateProvider (SaveableStateHolder.kt:74)');
    }
    // Inline function 'androidx.compose.runtime.ReusableContent' call
    var $composer_1 = $composer_0;
    $composer_1.j1l(444418301);
    sourceInformation($composer_1, 'CC(ReusableContent)P(1)145@5313L9:Composables.kt#9igjgp');
    $composer_1.a1y(get_reuseKey(), key);
    // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.SaveableStateProvider.<anonymous>' call
    var $composer_2 = $composer_1;
    sourceInformationMarkerStart($composer_2, 1358086451, 'C76@3023L321,83@3357L150,87@3520L360:SaveableStateHolder.kt#r2ddri');
    $composer_2.j1l(-233285309);
    sourceInformation($composer_2, 'CC(remember):SaveableStateHolder.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_2.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.SaveableStateProvider.<anonymous>.<anonymous>' call
      // Inline function 'kotlin.require' call
      var tmp0_safe_receiver = this.t32_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b32(key);
      // Inline function 'kotlin.contracts.contract' call
      if (!(tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs)) {
        // Inline function 'androidx.compose.runtime.saveable.SaveableStateHolderImpl.SaveableStateProvider.<anonymous>.<anonymous>.<anonymous>' call
        var message = 'Type of the key ' + toString(key) + ' is not supported. On Android you can only use types ' + 'which can be stored inside the Bundle.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      var value = new RegistryHolder(this, key);
      $composer_2.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_2.l1l();
    var registryHolder = tmp0_group;
    CompositionLocalProvider(get_LocalSaveableStateRegistry().g24(registryHolder.w32_1), content, $composer_2, 112 & $dirty);
    DisposableEffect(Unit_instance, SaveableStateHolderImpl$SaveableStateProvider$lambda(this, key, registryHolder), $composer_2, 6);
    sourceInformationMarkerEnd($composer_2);
    $composer_1.b1y();
    $composer_1.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    var tmp1_safe_receiver = $composer_0.m20();
    if (tmp1_safe_receiver == null)
      null;
    else {
      tmp1_safe_receiver.j24(SaveableStateHolderImpl$SaveableStateProvider$lambda_0(this, key, content, $changed));
    }
  };
  protoOf(SaveableStateHolderImpl).e33 = function (key) {
    var registryHolder = this.s32_1.z2(key);
    if (!(registryHolder == null)) {
      registryHolder.v32_1 = false;
    } else {
      // Inline function 'kotlin.collections.minusAssign' call
      this.r32_1.t2(key);
    }
  };
  function rememberSaveableStateHolder$lambda() {
    return new SaveableStateHolderImpl();
  }
  function get_LocalSaveableStateRegistry() {
    _init_properties_SaveableStateRegistry_kt__lr5zhh();
    return LocalSaveableStateRegistry;
  }
  var LocalSaveableStateRegistry;
  function SaveableStateRegistry(restoredValues, canBeSaved) {
    _init_properties_SaveableStateRegistry_kt__lr5zhh();
    return new SaveableStateRegistryImpl(restoredValues, canBeSaved);
  }
  function SaveableStateRegistryImpl$registerProvider$3(this$0, $key, $valueProvider) {
    this.f33_1 = this$0;
    this.g33_1 = $key;
    this.h33_1 = $valueProvider;
  }
  protoOf(SaveableStateRegistryImpl$registerProvider$3).p32 = function () {
    var list = this.f33_1.k33_1.t2(this.g33_1);
    if (list == null)
      null;
    else
      list.b1(this.h33_1);
    var tmp;
    if (!(list == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp = !list.u();
    } else {
      tmp = false;
    }
    if (tmp) {
      // Inline function 'kotlin.collections.set' call
      var this_0 = this.f33_1.k33_1;
      var key = this.g33_1;
      this_0.p2(key, list);
    }
  };
  function SaveableStateRegistryImpl(restored, canBeSaved) {
    this.i33_1 = canBeSaved;
    var tmp = this;
    var tmp1_elvis_lhs = restored == null ? null : toMutableMap(restored);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      // Inline function 'kotlin.collections.mutableMapOf' call
      tmp_0 = LinkedHashMap_init_$Create$();
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    tmp.j33_1 = tmp_0;
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp_1.k33_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(SaveableStateRegistryImpl).b32 = function (value) {
    return this.i33_1(value);
  };
  protoOf(SaveableStateRegistryImpl).c32 = function (key) {
    var list = this.j33_1.t2(key);
    var tmp;
    var tmp_0;
    if (!(list == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp_0 = !list.u();
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      if (list.m() > 1) {
        // Inline function 'kotlin.collections.set' call
        var this_0 = this.j33_1;
        var value = list.r(1, list.m());
        this_0.p2(key, value);
      }
      tmp = list.n(0);
    } else {
      tmp = null;
    }
    return tmp;
  };
  protoOf(SaveableStateRegistryImpl).m32 = function (key, valueProvider) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(key)) {
      // Inline function 'androidx.compose.runtime.saveable.SaveableStateRegistryImpl.registerProvider.<anonymous>' call
      var message = 'Registered key is empty or blank';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.k33_1;
    var value = this_0.z2(key);
    var tmp;
    if (value == null) {
      // Inline function 'androidx.compose.runtime.saveable.SaveableStateRegistryImpl.registerProvider.<anonymous>' call
      // Inline function 'kotlin.collections.mutableListOf' call
      var answer = ArrayList_init_$Create$_0();
      this_0.p2(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    tmp.a1(valueProvider);
    return new SaveableStateRegistryImpl$registerProvider$3(this, key, valueProvider);
  };
  protoOf(SaveableStateRegistryImpl).z32 = function () {
    var map = toMutableMap(this.j33_1);
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.k33_1.o2().o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.runtime.saveable.SaveableStateRegistryImpl.performSave.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var key = element.r2();
      // Inline function 'kotlin.collections.component2' call
      var list = element.s2();
      if (list.m() === 1) {
        var value = list.n(0)();
        if (!(value == null)) {
          // Inline function 'kotlin.check' call
          // Inline function 'kotlin.contracts.contract' call
          if (!this.b32(value)) {
            // Inline function 'androidx.compose.runtime.saveable.SaveableStateRegistryImpl.performSave.<anonymous>.<anonymous>' call
            var message = "item can't be saved";
            throw IllegalStateException_init_$Create$(toString(message));
          }
          // Inline function 'kotlin.collections.set' call
          var value_0 = arrayListOf([value]);
          map.p2(key, value_0);
        }
      } else {
        // Inline function 'kotlin.collections.set' call
        // Inline function 'kotlin.collections.List' call
        // Inline function 'kotlin.collections.MutableList' call
        var size = list.m();
        var list_0 = ArrayList_init_$Create$_1(size);
        // Inline function 'kotlin.repeat' call
        // Inline function 'kotlin.contracts.contract' call
        var inductionVariable = 0;
        if (inductionVariable < size)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            // Inline function 'kotlin.collections.MutableList.<anonymous>' call
            // Inline function 'androidx.compose.runtime.saveable.SaveableStateRegistryImpl.performSave.<anonymous>.<anonymous>' call
            var value_1 = list.n(index)();
            if (!(value_1 == null)) {
              // Inline function 'kotlin.check' call
              // Inline function 'kotlin.contracts.contract' call
              if (!this.b32(value_1)) {
                // Inline function 'androidx.compose.runtime.saveable.SaveableStateRegistryImpl.performSave.<anonymous>.<anonymous>.<anonymous>' call
                var message_0 = "item can't be saved";
                throw IllegalStateException_init_$Create$(toString(message_0));
              }
            }
            list_0.a1(value_1);
          }
           while (inductionVariable < size);
        map.p2(key, list_0);
      }
    }
    return map;
  };
  function LocalSaveableStateRegistry$lambda() {
    _init_properties_SaveableStateRegistry_kt__lr5zhh();
    return null;
  }
  var properties_initialized_SaveableStateRegistry_kt_4lrdzt;
  function _init_properties_SaveableStateRegistry_kt__lr5zhh() {
    if (!properties_initialized_SaveableStateRegistry_kt_4lrdzt) {
      properties_initialized_SaveableStateRegistry_kt_4lrdzt = true;
      LocalSaveableStateRegistry = staticCompositionLocalOf(LocalSaveableStateRegistry$lambda);
    }
  }
  function get_AutoSaver() {
    _init_properties_Saver_kt__z47nhf();
    return AutoSaver;
  }
  var AutoSaver;
  function Saver() {
  }
  function Saver_0(save, restore) {
    _init_properties_Saver_kt__z47nhf();
    return new Saver$1(save, restore);
  }
  function autoSaver() {
    _init_properties_Saver_kt__z47nhf();
    var tmp = get_AutoSaver();
    return isInterface(tmp, Saver) ? tmp : THROW_CCE();
  }
  function AutoSaver$lambda($this$Saver, it) {
    _init_properties_Saver_kt__z47nhf();
    return it;
  }
  function AutoSaver$lambda_0(it) {
    _init_properties_Saver_kt__z47nhf();
    return it;
  }
  function Saver$1($save, $restore) {
    this.l33_1 = $save;
    this.m33_1 = $restore;
  }
  protoOf(Saver$1).n32 = function (_this__u8e3s4, value) {
    return this.l33_1(_this__u8e3s4, value);
  };
  protoOf(Saver$1).d32 = function (value) {
    return this.m33_1(value);
  };
  var properties_initialized_Saver_kt_ch40dh;
  function _init_properties_Saver_kt__z47nhf() {
    if (!properties_initialized_Saver_kt_ch40dh) {
      properties_initialized_Saver_kt_ch40dh = true;
      var tmp = AutoSaver$lambda;
      AutoSaver = Saver_0(tmp, AutoSaver$lambda_0);
    }
  }
  //region block: init
  MaxSupportedRadix = 36;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = get_LocalSaveableStateRegistry;
  _.$_$.b = SaveableStateRegistry;
  _.$_$.c = Saver_0;
  _.$_$.d = listSaver;
  _.$_$.e = rememberSaveableStateHolder;
  _.$_$.f = rememberSaveable;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-runtime-runtime-saveable.js.map
