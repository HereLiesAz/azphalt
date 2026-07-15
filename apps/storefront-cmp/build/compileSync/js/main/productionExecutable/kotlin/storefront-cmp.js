(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui.js', './compose-multiplatform-core-compose-runtime-runtime.js', './compose-multiplatform-core-compose-foundation-foundation-layout.js', './compose-multiplatform-core-compose-ui-ui-graphics.js', './compose-multiplatform-core-compose-foundation-foundation.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-ui-ui-text.js', './compose-multiplatform-core-compose-material3-material3.js', './kotlinx-coroutines-core.js', './kotlinx-serialization-kotlinx-serialization-json.js', './compose-multiplatform-core-compose-ui-ui-geometry.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./compose-multiplatform-core-compose-foundation-foundation-layout.js'), require('./compose-multiplatform-core-compose-ui-ui-graphics.js'), require('./compose-multiplatform-core-compose-foundation-foundation.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-ui-ui-text.js'), require('./compose-multiplatform-core-compose-material3-material3.js'), require('./kotlinx-coroutines-core.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'));
  else {
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation-layout'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation-layout' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation-layout' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-graphics' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-text'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-text' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-text' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-material3-material3'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-material3-material3' was not found. Please, check whether 'compose-multiplatform-core-compose-material3-material3' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    root['com.azphalt.storefront:storefront-cmp'] = factory(typeof this['com.azphalt.storefront:storefront-cmp'] === 'undefined' ? {} : this['com.azphalt.storefront:storefront-cmp'], this['kotlinx-serialization-kotlinx-serialization-core'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui'], this['compose-multiplatform-core-compose-runtime-runtime'], this['compose-multiplatform-core-compose-foundation-foundation-layout'], this['compose-multiplatform-core-compose-ui-ui-graphics'], this['compose-multiplatform-core-compose-foundation-foundation'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-ui-ui-text'], this['compose-multiplatform-core-compose-material3-material3'], this['kotlinx-coroutines-core'], this['kotlinx-serialization-kotlinx-serialization-json'], this['compose-multiplatform-core-compose-ui-ui-geometry']);
  }
}(this, function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_foundation_foundation_layout, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_compose_foundation_foundation, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_ui_ui_text, kotlin_org_jetbrains_compose_material3_material3, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json, kotlin_org_jetbrains_compose_ui_ui_geometry) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var protoOf = kotlin_kotlin.$_$.jb;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var VOID = kotlin_kotlin.$_$.g;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var objectCreate = kotlin_kotlin.$_$.hb;
  var getStringHashCode = kotlin_kotlin.$_$.la;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var classMeta = kotlin_kotlin.$_$.ba;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var equals = kotlin_kotlin.$_$.ea;
  var CanvasBasedWindow = kotlin_org_jetbrains_compose_ui_ui.$_$.l4;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var emptyList = kotlin_kotlin.$_$.m6;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var LaunchedEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q;
  var Companion_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.n5;
  var fillMaxSize = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.f;
  var Companion_instance_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.c2;
  var Long = kotlin_kotlin.$_$.we;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f;
  var Color_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g;
  var listOf = kotlin_kotlin.$_$.v7;
  var background = kotlin_org_jetbrains_compose_foundation_foundation.$_$.w;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var padding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.i;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.m5;
  var rememberBoxMeasurePolicy = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.k;
  var get_currentCompositeKeyHash = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a1;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui.$_$.j5;
  var materializerOf = kotlin_org_jetbrains_compose_ui_ui.$_$.w1;
  var invalidApplier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d1;
  var Applier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h;
  var isInterface = kotlin_kotlin.$_$.xa;
  var _Updater___init__impl__rbfxm8 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a2;
  var Updater__set_impl_v7kwss = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c2;
  var _Updater___get_composer__impl__9ty7av = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b2;
  var _SkippableUpdater___init__impl__4ft0t9 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.y1;
  var SkippableUpdater = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var BoxScopeInstance_instance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.o;
  var Arrangement_getInstance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.n;
  var columnMeasurePolicy = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.e;
  var ColumnScopeInstance_instance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.p;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.i3;
  var _Color___init__impl__r6cqi2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.i1;
  var _TextUnit___init__impl__r5fj1s = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g2;
  var _TextOverflow___init__impl__obguoe = kotlin_org_jetbrains_compose_ui_ui_text.$_$.s;
  var MaterialTheme_instance = kotlin_org_jetbrains_compose_material3_material3.$_$.e;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.y;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.e2;
  var Text = kotlin_org_jetbrains_compose_material3_material3.$_$.c;
  var height = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.h;
  var Spacer = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.b;
  var Adaptive = kotlin_org_jetbrains_compose_foundation_foundation.$_$.l;
  var LazyVerticalGrid = kotlin_org_jetbrains_compose_foundation_foundation.$_$.m;
  var _StrokeCap___init__impl__kfgr27 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.v1;
  var CircularProgressIndicator = kotlin_org_jetbrains_compose_material3_material3.$_$.a;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var fillMaxWidth = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.g;
  var RoundedCornerShape = kotlin_org_jetbrains_compose_foundation_foundation.$_$.o;
  var clip = kotlin_org_jetbrains_compose_ui_ui.$_$.b;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w1;
  var background_0 = kotlin_org_jetbrains_compose_foundation_foundation.$_$.v;
  var clickable = kotlin_org_jetbrains_compose_foundation_foundation.$_$.x;
  var rowMeasurePolicy = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.l;
  var RowScopeInstance_instance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.q;
  var darkColorScheme = kotlin_org_jetbrains_compose_material3_material3.$_$.d;
  var MaterialTheme = kotlin_org_jetbrains_compose_material3_material3.$_$.b;
  var composableLambdaInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b;
  var KMutableProperty0 = kotlin_kotlin.$_$.pc;
  var THROW_ISE = kotlin_kotlin.$_$.ef;
  var getLocalDelegateReference = kotlin_kotlin.$_$.ia;
  var CoroutineImpl = kotlin_kotlin.$_$.o9;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var await_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.a9;
  var List = kotlin_kotlin.$_$.e5;
  var getKClass = kotlin_kotlin.$_$.e;
  var arrayOf = kotlin_kotlin.$_$.rf;
  var createKType = kotlin_kotlin.$_$.b;
  var createInvariantKTypeProjection = kotlin_kotlin.$_$.a;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var println = kotlin_kotlin.$_$.r9;
  var Exception = kotlin_kotlin.$_$.te;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var drawWithContent = kotlin_org_jetbrains_compose_ui_ui.$_$.d;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var Size__copy$default_impl_nrzrkq = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.g1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  //endregion
  //region block: pre-declaration
  setMetadataFor($serializer, '$serializer', objectMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(PriceDto, 'PriceDto', classMeta, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor($serializer_0, '$serializer', objectMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(PackageDto, 'PackageDto', classMeta, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
  setMetadataFor(ComposableSingletons$MainKt, 'ComposableSingletons$MainKt', objectMeta);
  setMetadataFor(StorefrontApp$slambda, 'StorefrontApp$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  //endregion
  function get_json() {
    _init_properties_Main_kt__xi25uv();
    return json;
  }
  var json;
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('PriceDto', this, 2);
    tmp0_serialDesc.jbd('amountCents', false);
    tmp0_serialDesc.jbd('currency', false);
    this.jc9_1 = tmp0_serialDesc;
  }
  protoOf($serializer).ib5 = function () {
    return this.jc9_1;
  };
  protoOf($serializer).lbd = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [IntSerializer_getInstance(), StringSerializer_getInstance()];
  };
  protoOf($serializer).jb5 = function (decoder) {
    var tmp0_desc = this.jc9_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0;
    var tmp5_local1 = null;
    var tmp6_input = decoder.ab8(tmp0_desc);
    if (tmp6_input.qb8()) {
      tmp4_local0 = tmp6_input.fb8(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.kb8(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.rb8(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.fb8(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.kb8(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.bb8(tmp0_desc);
    return PriceDto_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, null);
  };
  var $serializer_instance;
  function $serializer_getInstance() {
    if ($serializer_instance == null)
      new $serializer();
    return $serializer_instance;
  }
  function PriceDto_init_$Init$(seen1, amountCents, currency, serializationConstructorMarker, $this) {
    if (!(3 === (3 & seen1))) {
      throwMissingFieldException(seen1, 3, $serializer_getInstance().jc9_1);
    }
    $this.kc9_1 = amountCents;
    $this.lc9_1 = currency;
    return $this;
  }
  function PriceDto_init_$Create$(seen1, amountCents, currency, serializationConstructorMarker) {
    return PriceDto_init_$Init$(seen1, amountCents, currency, serializationConstructorMarker, objectCreate(protoOf(PriceDto)));
  }
  function PriceDto() {
  }
  protoOf(PriceDto).toString = function () {
    return 'PriceDto(amountCents=' + this.kc9_1 + ', currency=' + this.lc9_1 + ')';
  };
  protoOf(PriceDto).hashCode = function () {
    var result = this.kc9_1;
    result = imul(result, 31) + getStringHashCode(this.lc9_1) | 0;
    return result;
  };
  protoOf(PriceDto).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PriceDto))
      return false;
    var tmp0_other_with_cast = other instanceof PriceDto ? other : THROW_CCE();
    if (!(this.kc9_1 === tmp0_other_with_cast.kc9_1))
      return false;
    if (!(this.lc9_1 === tmp0_other_with_cast.lc9_1))
      return false;
    return true;
  };
  function Companion() {
  }
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function $serializer_0() {
    $serializer_instance_0 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('PackageDto', this, 6);
    tmp0_serialDesc.jbd('id', false);
    tmp0_serialDesc.jbd('name', false);
    tmp0_serialDesc.jbd('description', true);
    tmp0_serialDesc.jbd('author', true);
    tmp0_serialDesc.jbd('version', false);
    tmp0_serialDesc.jbd('price', true);
    this.mc9_1 = tmp0_serialDesc;
  }
  protoOf($serializer_0).ib5 = function () {
    return this.mc9_1;
  };
  protoOf($serializer_0).lbd = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), StringSerializer_getInstance(), get_nullable($serializer_getInstance())];
  };
  protoOf($serializer_0).jb5 = function (decoder) {
    var tmp0_desc = this.mc9_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_input = decoder.ab8(tmp0_desc);
    if (tmp10_input.qb8()) {
      tmp4_local0 = tmp10_input.kb8(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp10_input.kb8(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp10_input.ob8(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp10_input.ob8(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp10_input.kb8(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp10_input.ob8(tmp0_desc, 5, $serializer_getInstance(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp10_input.rb8(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp10_input.kb8(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp10_input.kb8(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp10_input.ob8(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp10_input.ob8(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp10_input.kb8(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp10_input.ob8(tmp0_desc, 5, $serializer_getInstance(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp10_input.bb8(tmp0_desc);
    return PackageDto_init_$Create$(tmp3_bitMask0, tmp4_local0, tmp5_local1, tmp6_local2, tmp7_local3, tmp8_local4, tmp9_local5, null);
  };
  var $serializer_instance_0;
  function $serializer_getInstance_0() {
    if ($serializer_instance_0 == null)
      new $serializer_0();
    return $serializer_instance_0;
  }
  function PackageDto_init_$Init$(seen1, id, name, description, author, version, price, serializationConstructorMarker, $this) {
    if (!(19 === (19 & seen1))) {
      throwMissingFieldException(seen1, 19, $serializer_getInstance_0().mc9_1);
    }
    $this.nc9_1 = id;
    $this.oc9_1 = name;
    if (0 === (seen1 & 4))
      $this.pc9_1 = null;
    else
      $this.pc9_1 = description;
    if (0 === (seen1 & 8))
      $this.qc9_1 = null;
    else
      $this.qc9_1 = author;
    $this.rc9_1 = version;
    if (0 === (seen1 & 32))
      $this.sc9_1 = null;
    else
      $this.sc9_1 = price;
    return $this;
  }
  function PackageDto_init_$Create$(seen1, id, name, description, author, version, price, serializationConstructorMarker) {
    return PackageDto_init_$Init$(seen1, id, name, description, author, version, price, serializationConstructorMarker, objectCreate(protoOf(PackageDto)));
  }
  function PackageDto(id, name, description, author, version, price) {
    description = description === VOID ? null : description;
    author = author === VOID ? null : author;
    price = price === VOID ? null : price;
    this.nc9_1 = id;
    this.oc9_1 = name;
    this.pc9_1 = description;
    this.qc9_1 = author;
    this.rc9_1 = version;
    this.sc9_1 = price;
  }
  protoOf(PackageDto).toString = function () {
    return 'PackageDto(id=' + this.nc9_1 + ', name=' + this.oc9_1 + ', description=' + this.pc9_1 + ', author=' + this.qc9_1 + ', version=' + this.rc9_1 + ', price=' + this.sc9_1 + ')';
  };
  protoOf(PackageDto).hashCode = function () {
    var result = getStringHashCode(this.nc9_1);
    result = imul(result, 31) + getStringHashCode(this.oc9_1) | 0;
    result = imul(result, 31) + (this.pc9_1 == null ? 0 : getStringHashCode(this.pc9_1)) | 0;
    result = imul(result, 31) + (this.qc9_1 == null ? 0 : getStringHashCode(this.qc9_1)) | 0;
    result = imul(result, 31) + getStringHashCode(this.rc9_1) | 0;
    result = imul(result, 31) + (this.sc9_1 == null ? 0 : this.sc9_1.hashCode()) | 0;
    return result;
  };
  protoOf(PackageDto).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PackageDto))
      return false;
    var tmp0_other_with_cast = other instanceof PackageDto ? other : THROW_CCE();
    if (!(this.nc9_1 === tmp0_other_with_cast.nc9_1))
      return false;
    if (!(this.oc9_1 === tmp0_other_with_cast.oc9_1))
      return false;
    if (!(this.pc9_1 == tmp0_other_with_cast.pc9_1))
      return false;
    if (!(this.qc9_1 == tmp0_other_with_cast.qc9_1))
      return false;
    if (!(this.rc9_1 === tmp0_other_with_cast.rc9_1))
      return false;
    if (!equals(this.sc9_1, tmp0_other_with_cast.sc9_1))
      return false;
    return true;
  };
  function main() {
    _init_properties_Main_kt__xi25uv();
    CanvasBasedWindow('Azphalt Storefront', VOID, VOID, VOID, ComposableSingletons$MainKt_getInstance().uc9_1);
  }
  function StorefrontApp($composer, $changed) {
    _init_properties_Main_kt__xi25uv();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(2118778268);
    if (!($changed === 0) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(2118778268, $changed, -1, 'StorefrontApp (Main.kt:58)');
      }
      $composer_0.j1l(-70201485);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_0 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = this_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance().w1r_1) {
        // Inline function 'StorefrontApp.<anonymous>' call
        var value = mutableStateOf(emptyList());
        this_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      var packages$delegate = tmp0_group;
      $composer_0.j1l(-70198950);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_1 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = this_1.x1y();
      var tmp_1;
      if (false ? true : it_0 === Companion_getInstance().w1r_1) {
        // Inline function 'StorefrontApp.<anonymous>' call
        var value_0 = mutableStateOf(true);
        this_1.d1z(value_0);
        tmp_1 = value_0;
      } else {
        tmp_1 = it_0;
      }
      var tmp_2 = tmp_1;
      var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
      $composer_0.l1l();
      var isLoading$delegate = tmp1_group;
      $composer_0.j1l(-70196725);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_2 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_1 = this_2.x1y();
      var tmp_3;
      if (false ? true : it_1 === Companion_getInstance().w1r_1) {
        // Inline function 'StorefrontApp.<anonymous>' call
        var value_1 = StorefrontApp$slambda_0(packages$delegate, isLoading$delegate, null);
        this_2.d1z(value_1);
        tmp_3 = value_1;
      } else {
        tmp_3 = it_1;
      }
      var tmp_4 = tmp_3;
      var tmp2_group = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
      $composer_0.l1l();
      LaunchedEffect(Unit_instance, tmp2_group, $composer_0, 70);
      // Inline function 'androidx.compose.foundation.layout.Box' call
      var tmp_5 = background(fillMaxSize(Companion_instance), Companion_instance_0.q3q(listOf([new Color_0(Color(new Long(-15788246, 0))), new Color_0(Color(new Long(-16644585, 0)))])));
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$12 = _Dp___init__impl__ms3zkb(32);
      var modifier = padding(tmp_5, tmp$ret$12);
      var contentAlignment = null;
      var propagateMinConstraints = false;
      var $composer_1 = $composer_0;
      $composer_1.j1l(733328855);
      sourceInformation($composer_1, 'CC(Box)P(2,1,3)71@3309L67,72@3381L130:Box.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier = Companion_instance;
      if (!((6 & 2) === 0))
        contentAlignment = Companion_getInstance_0().u4s_1;
      if (!((6 & 4) === 0))
        propagateMinConstraints = false;
      var measurePolicy = rememberBoxMeasurePolicy(contentAlignment, propagateMinConstraints, $composer_1, 14 & 6 >> 3 | 112 & 6 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_0 = modifier;
      var $changed_0 = 112 & 6 << 3;
      var modifier_1 = modifier_0;
      var $composer_2 = $composer_1;
      $composer_2.j1l(-1323940314);
      sourceInformation($composer_2, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_1 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_2, 0);
      var localMap = $composer_2.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_1().p5p_1;
      var skippableUpdate = materializerOf(modifier_1);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_6 = $composer_3.g1x();
      if (!isInterface(tmp_6, Applier)) {
        invalidApplier();
      }
      $composer_3.t1x();
      if ($composer_3.p1x()) {
        $composer_3.u1x(factory);
      } else {
        $composer_3.x1x();
      }
      // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
      var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_1().u5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_1().t5p_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_1().x5p_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_7;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_7 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -2146772375, 'C73@3426L9:Box.kt#2w3rfo');
      // Inline function 'StorefrontApp.<anonymous>' call
      var $composer_5 = $composer_4;
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var modifier_2 = null;
      var verticalArrangement = null;
      var horizontalAlignment = null;
      var $composer_6 = $composer_5;
      $composer_6.j1l(-483455358);
      sourceInformation($composer_6, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((7 & 1) === 0))
        modifier_2 = Companion_instance;
      if (!((7 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().c7t_1;
      if (!((7 & 4) === 0))
        horizontalAlignment = Companion_getInstance_0().g4t_1;
      var measurePolicy_0 = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_6, 14 & 0 >> 3 | 112 & 0 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_3 = modifier_2;
      var $changed_2 = 112 & 0 << 3;
      var modifier_4 = modifier_3;
      var $composer_7 = $composer_6;
      $composer_7.j1l(-1323940314);
      sourceInformation($composer_7, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_4 = Companion_instance;
      var compositeKeyHash_0 = get_currentCompositeKeyHash($composer_7, 0);
      var localMap_0 = $composer_7.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_0 = Companion_getInstance_1().p5p_1;
      var skippableUpdate_0 = materializerOf(modifier_4);
      var $changed_3 = 6 | 7168 & $changed_2 << 9;
      var $composer_8 = $composer_7;
      var tmp_8 = $composer_8.g1x();
      if (!isInterface(tmp_8, Applier)) {
        invalidApplier();
      }
      $composer_8.t1x();
      if ($composer_8.p1x()) {
        $composer_8.u1x(factory_0);
      } else {
        $composer_8.x1x();
      }
      // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
      var $this$ReusableComposeNode_0 = _Updater___init__impl__rbfxm8($composer_8);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_1().u5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_1().t5p_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_0 = Companion_getInstance_1().x5p_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
      var tmp_9;
      if ($this$with_0.p1x() ? true : !equals($this$with_0.x1y(), compositeKeyHash_0)) {
        $this$with_0.d1z(compositeKeyHash_0);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).e1y(compositeKeyHash_0, block_0);
        tmp_9 = Unit_instance;
      }
      skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_8)), $composer_8, 112 & $changed_3 >> 3);
      $composer_8.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_9 = $composer_8;
      sourceInformationMarkerStart($composer_9, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'StorefrontApp.<anonymous>.<anonymous>' call
      var $composer_10 = $composer_9;
      var tmp_10 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_11 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_12 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_13 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_14 = _TextOverflow___init__impl__obguoe(0);
      var tmp0_$this = MaterialTheme_instance.sbq($composer_10, 0).xbq_1;
      var tmp1_fontWeight = Companion_getInstance_2().k4a_1;
      var tmp2_color = Companion_getInstance_3().f3r_1;
      Text('Azphalt Premium Collection', null, tmp_10, tmp_11, null, null, null, tmp_12, null, null, tmp_13, tmp_14, false, 0, 0, null, tmp0_$this.n4c(tmp2_color, VOID, tmp1_fontWeight), $composer_10, 6, 0, 65534);
      var tmp_15 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$17 = _Dp___init__impl__ms3zkb(24);
      Spacer(height(tmp_15, tmp$ret$17), $composer_10, 6);
      if (StorefrontApp$lambda_1(isLoading$delegate)) {
        $composer_10.j1l(1600523481);
        var tmp_16 = ColumnScopeInstance_instance.n7u(Companion_instance, Companion_getInstance_0().h4t_1);
        var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
        var tmp_18 = _Dp___init__impl__ms3zkb(0.0);
        var tmp_19 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
        CircularProgressIndicator(tmp_16, tmp_17, tmp_18, tmp_19, _StrokeCap___init__impl__kfgr27(0), $composer_10, 0, 30);
        $composer_10.l1l();
      } else {
        $composer_10.j1l(1600651263);
        // Inline function 'androidx.compose.ui.unit.dp' call
        var tmp$ret$18 = _Dp___init__impl__ms3zkb(300);
        var tmp3_columns = new Adaptive(tmp$ret$18);
        var tmp_20 = Arrangement_getInstance();
        // Inline function 'androidx.compose.ui.unit.dp' call
        var tmp$ret$19 = _Dp___init__impl__ms3zkb(24);
        var tmp4_horizontalArrangement = tmp_20.s7t(tmp$ret$19);
        var tmp_21 = Arrangement_getInstance();
        // Inline function 'androidx.compose.ui.unit.dp' call
        var tmp$ret$20 = _Dp___init__impl__ms3zkb(24);
        var tmp5_verticalArrangement = tmp_21.s7t(tmp$ret$20);
        $composer_10.j1l(-641094858);
        // Inline function 'androidx.compose.runtime.cache' call
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
        var it_2 = $composer_10.x1y();
        var tmp_22;
        if (false ? true : it_2 === Companion_getInstance().w1r_1) {
          // Inline function 'StorefrontApp.<anonymous>.<anonymous>.<anonymous>' call
          var value_2 = StorefrontApp$lambda_3(packages$delegate);
          $composer_10.d1z(value_2);
          tmp_22 = value_2;
        } else {
          tmp_22 = it_2;
        }
        var tmp_23 = tmp_22;
        var tmp0_group_0 = (tmp_23 == null ? true : !(tmp_23 == null)) ? tmp_23 : THROW_CCE();
        $composer_10.l1l();
        LazyVerticalGrid(tmp3_columns, null, null, null, false, tmp5_verticalArrangement, tmp4_horizontalArrangement, null, false, tmp0_group_0, $composer_10, 807075840, 414);
        $composer_10.l1l();
      }
      sourceInformationMarkerEnd($composer_9);
      $composer_8.l1l();
      $composer_8.z1x();
      $composer_7.l1l();
      $composer_6.l1l();
      sourceInformationMarkerEnd($composer_4);
      $composer_3.l1l();
      $composer_3.z1x();
      $composer_2.l1l();
      $composer_1.l1l();
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    var tmp3_safe_receiver = $composer_0.m20();
    if (tmp3_safe_receiver == null)
      null;
    else {
      tmp3_safe_receiver.j24(StorefrontApp$lambda_4($changed));
    }
  }
  function PackageCard(pkg, $composer, $changed) {
    _init_properties_Main_kt__xi25uv();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-1982368384);
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(pkg) ? 4 : 2);
    if (!(($dirty & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(-1982368384, $dirty, -1, 'PackageCard (Main.kt:112)');
      }
      $composer_0.j1l(1923365656);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_0 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = this_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance().w1r_1) {
        // Inline function 'PackageCard.<anonymous>' call
        var value = mutableStateOf(false);
        this_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      var isHovered$delegate = tmp0_group;
      // Inline function 'androidx.compose.foundation.layout.Box' call
      var tmp_1 = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$4 = _Dp___init__impl__ms3zkb(200);
      var tmp_2 = height(tmp_1, tmp$ret$4);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$5 = _Dp___init__impl__ms3zkb(16);
      var tmp_3 = skeuomorphicSurface(background_0(clip(tmp_2, RoundedCornerShape(tmp$ret$5)), Color__copy$default_impl_ectz3s(Companion_getInstance_3().f3r_1, 0.05)), 2.0);
      $composer_0.j1l(1923376317);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_1 = $composer_0;
      var invalid = ($dirty & 14) === 4;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = this_1.x1y();
      var tmp_4;
      if (invalid ? true : it_0 === Companion_getInstance().w1r_1) {
        // Inline function 'PackageCard.<anonymous>' call
        var value_0 = PackageCard$lambda(pkg);
        this_1.d1z(value_0);
        tmp_4 = value_0;
      } else {
        tmp_4 = it_0;
      }
      var tmp_5 = tmp_4;
      var tmp1_group = (tmp_5 == null ? true : !(tmp_5 == null)) ? tmp_5 : THROW_CCE();
      $composer_0.l1l();
      var tmp_6 = clickable(tmp_3, VOID, VOID, VOID, tmp1_group);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$10 = _Dp___init__impl__ms3zkb(24);
      var modifier = padding(tmp_6, tmp$ret$10);
      var contentAlignment = null;
      var propagateMinConstraints = false;
      var $composer_1 = $composer_0;
      $composer_1.j1l(733328855);
      sourceInformation($composer_1, 'CC(Box)P(2,1,3)71@3309L67,72@3381L130:Box.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier = Companion_instance;
      if (!((6 & 2) === 0))
        contentAlignment = Companion_getInstance_0().u4s_1;
      if (!((6 & 4) === 0))
        propagateMinConstraints = false;
      var measurePolicy = rememberBoxMeasurePolicy(contentAlignment, propagateMinConstraints, $composer_1, 14 & 0 >> 3 | 112 & 0 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_0 = modifier;
      var $changed_0 = 112 & 0 << 3;
      var modifier_1 = modifier_0;
      var $composer_2 = $composer_1;
      $composer_2.j1l(-1323940314);
      sourceInformation($composer_2, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_1 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_2, 0);
      var localMap = $composer_2.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_1().p5p_1;
      var skippableUpdate = materializerOf(modifier_1);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_7 = $composer_3.g1x();
      if (!isInterface(tmp_7, Applier)) {
        invalidApplier();
      }
      $composer_3.t1x();
      if ($composer_3.p1x()) {
        $composer_3.u1x(factory);
      } else {
        $composer_3.x1x();
      }
      // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
      var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_3);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_1().u5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_1().t5p_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_1().x5p_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_8;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_8 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -2146772375, 'C73@3426L9:Box.kt#2w3rfo');
      // Inline function 'PackageCard.<anonymous>' call
      var $composer_5 = $composer_4;
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var modifier_2 = null;
      var verticalArrangement = null;
      var horizontalAlignment = null;
      var $composer_6 = $composer_5;
      $composer_6.j1l(-483455358);
      sourceInformation($composer_6, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((7 & 1) === 0))
        modifier_2 = Companion_instance;
      if (!((7 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().c7t_1;
      if (!((7 & 4) === 0))
        horizontalAlignment = Companion_getInstance_0().g4t_1;
      var measurePolicy_0 = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_6, 14 & 0 >> 3 | 112 & 0 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_3 = modifier_2;
      var $changed_2 = 112 & 0 << 3;
      var modifier_4 = modifier_3;
      var $composer_7 = $composer_6;
      $composer_7.j1l(-1323940314);
      sourceInformation($composer_7, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_4 = Companion_instance;
      var compositeKeyHash_0 = get_currentCompositeKeyHash($composer_7, 0);
      var localMap_0 = $composer_7.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_0 = Companion_getInstance_1().p5p_1;
      var skippableUpdate_0 = materializerOf(modifier_4);
      var $changed_3 = 6 | 7168 & $changed_2 << 9;
      var $composer_8 = $composer_7;
      var tmp_9 = $composer_8.g1x();
      if (!isInterface(tmp_9, Applier)) {
        invalidApplier();
      }
      $composer_8.t1x();
      if ($composer_8.p1x()) {
        $composer_8.u1x(factory_0);
      } else {
        $composer_8.x1x();
      }
      // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
      var $this$ReusableComposeNode_0 = _Updater___init__impl__rbfxm8($composer_8);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_1().u5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_1().t5p_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_0 = Companion_getInstance_1().x5p_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
      var tmp_10;
      if ($this$with_0.p1x() ? true : !equals($this$with_0.x1y(), compositeKeyHash_0)) {
        $this$with_0.d1z(compositeKeyHash_0);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).e1y(compositeKeyHash_0, block_0);
        tmp_10 = Unit_instance;
      }
      skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_8)), $composer_8, 112 & $changed_3 >> 3);
      $composer_8.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_9 = $composer_8;
      sourceInformationMarkerStart($composer_9, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'PackageCard.<anonymous>.<anonymous>' call
      var $composer_10 = $composer_9;
      var tmp_11 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_12 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_13 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_14 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_15 = _TextOverflow___init__impl__obguoe(0);
      Text(pkg.oc9_1, null, tmp_11, tmp_12, null, null, null, tmp_13, null, null, tmp_14, tmp_15, false, 0, 0, null, MaterialTheme_instance.sbq($composer_10, 0).abr_1.n4c(Companion_getInstance_3().f3r_1, VOID, Companion_getInstance_2().k4a_1), $composer_10, 0, 0, 65534);
      var tmp_16 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$15 = _Dp___init__impl__ms3zkb(8);
      Spacer(height(tmp_16, tmp$ret$15), $composer_10, 6);
      var tmp0_elvis_lhs = pkg.pc9_1;
      var tmp1_text = tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
      var tmp2_style = MaterialTheme_instance.sbq($composer_10, 0).ebr_1.n4c(Color__copy$default_impl_ectz3s(Companion_getInstance_3().f3r_1, 0.7));
      var tmp_17 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_18 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_19 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_20 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_21 = _TextOverflow___init__impl__obguoe(0);
      Text(tmp1_text, null, tmp_17, tmp_18, null, null, null, tmp_19, null, null, tmp_20, tmp_21, false, 3, 0, null, tmp2_style, $composer_10, 0, 3072, 57342);
      Spacer(ColumnScopeInstance_instance.m7u(Companion_instance, 1.0), $composer_10, 0);
      var tmp3_verticalAlignment = Companion_getInstance_0().e4t_1;
      // Inline function 'androidx.compose.foundation.layout.Row' call
      var modifier_5 = fillMaxWidth(Companion_instance);
      var horizontalArrangement = null;
      var verticalAlignment = tmp3_verticalAlignment;
      var $composer_11 = $composer_10;
      $composer_11.j1l(693286680);
      sourceInformation($composer_11, 'CC(Row)P(2,1,3)91@4632L58,92@4695L130:Row.kt#2w3rfo');
      if (!((2 & 1) === 0))
        modifier_5 = Companion_instance;
      if (!((2 & 2) === 0))
        horizontalArrangement = Arrangement_getInstance().a7t_1;
      if (!((2 & 4) === 0))
        verticalAlignment = Companion_getInstance_0().d4t_1;
      var measurePolicy_1 = rowMeasurePolicy(horizontalArrangement, verticalAlignment, $composer_11, 14 & 390 >> 3 | 112 & 390 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_6 = modifier_5;
      var $changed_4 = 112 & 390 << 3;
      var modifier_7 = modifier_6;
      var $composer_12 = $composer_11;
      $composer_12.j1l(-1323940314);
      sourceInformation($composer_12, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_7 = Companion_instance;
      var compositeKeyHash_1 = get_currentCompositeKeyHash($composer_12, 0);
      var localMap_1 = $composer_12.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_1 = Companion_getInstance_1().p5p_1;
      var skippableUpdate_1 = materializerOf(modifier_7);
      var $changed_5 = 6 | 7168 & $changed_4 << 9;
      var $composer_13 = $composer_12;
      var tmp_22 = $composer_13.g1x();
      if (!isInterface(tmp_22, Applier)) {
        invalidApplier();
      }
      $composer_13.t1x();
      if ($composer_13.p1x()) {
        $composer_13.u1x(factory_1);
      } else {
        $composer_13.x1x();
      }
      // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
      var $this$ReusableComposeNode_1 = _Updater___init__impl__rbfxm8($composer_13);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_1, measurePolicy_1, Companion_getInstance_1().u5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_1, localMap_1, Companion_getInstance_1().t5p_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_1 = Companion_getInstance_1().x5p_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_1 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1);
      var tmp_23;
      if ($this$with_1.p1x() ? true : !equals($this$with_1.x1y(), compositeKeyHash_1)) {
        $this$with_1.d1z(compositeKeyHash_1);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1).e1y(compositeKeyHash_1, block_1);
        tmp_23 = Unit_instance;
      }
      skippableUpdate_1(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_13)), $composer_13, 112 & $changed_5 >> 3);
      $composer_13.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Row.<anonymous>' call
      var $composer_14 = $composer_13;
      sourceInformationMarkerStart($composer_14, -408223174, 'C93@4740L9:Row.kt#2w3rfo');
      // Inline function 'PackageCard.<anonymous>.<anonymous>.<anonymous>' call
      var $composer_15 = $composer_14;
      var tmp0_elvis_lhs_0 = pkg.qc9_1;
      var tmp_24 = tmp0_elvis_lhs_0 == null ? 'Unknown' : tmp0_elvis_lhs_0;
      var tmp_25 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_26 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_27 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_28 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_29 = _TextOverflow___init__impl__obguoe(0);
      Text(tmp_24, null, tmp_25, tmp_26, null, null, null, tmp_27, null, null, tmp_28, tmp_29, false, 0, 0, null, MaterialTheme_instance.sbq($composer_15, 0).hbr_1.n4c(Color(new Long(-13058568, 0))), $composer_15, 0, 0, 65534);
      Spacer(RowScopeInstance_instance.f7w(Companion_instance, 1.0), $composer_15, 0);
      if (!(pkg.sc9_1 == null)) {
        $composer_15.j1l(1819950958);
        var tmp_30 = '$' + pkg.sc9_1.kc9_1 / 100.0 + ' ' + pkg.sc9_1.lc9_1;
        var tmp_31 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
        var tmp_32 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_33 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_34 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_35 = _TextOverflow___init__impl__obguoe(0);
        Text(tmp_30, null, tmp_31, tmp_32, null, null, null, tmp_33, null, null, tmp_34, tmp_35, false, 0, 0, null, MaterialTheme_instance.sbq($composer_15, 0).gbr_1.n4c(Color(new Long(-15681151, 0)), VOID, Companion_getInstance_2().k4a_1), $composer_15, 0, 0, 65534);
        $composer_15.l1l();
      } else {
        $composer_15.j1l(1820241428);
        var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
        var tmp_37 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_38 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_39 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_40 = _TextOverflow___init__impl__obguoe(0);
        Text('FREE', null, tmp_36, tmp_37, null, null, null, tmp_38, null, null, tmp_39, tmp_40, false, 0, 0, null, MaterialTheme_instance.sbq($composer_15, 0).gbr_1.n4c(Color__copy$default_impl_ectz3s(Companion_getInstance_3().f3r_1, 0.5)), $composer_15, 6, 0, 65534);
        $composer_15.l1l();
      }
      sourceInformationMarkerEnd($composer_14);
      $composer_13.l1l();
      $composer_13.z1x();
      $composer_12.l1l();
      $composer_11.l1l();
      sourceInformationMarkerEnd($composer_9);
      $composer_8.l1l();
      $composer_8.z1x();
      $composer_7.l1l();
      $composer_6.l1l();
      sourceInformationMarkerEnd($composer_4);
      $composer_3.l1l();
      $composer_3.z1x();
      $composer_2.l1l();
      $composer_1.l1l();
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    var tmp2_safe_receiver = $composer_0.m20();
    if (tmp2_safe_receiver == null)
      null;
    else {
      tmp2_safe_receiver.j24(PackageCard$lambda_0(pkg, $changed));
    }
  }
  function ComposableLambda$invoke$ref($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function ComposableSingletons$MainKt$lambda_1$lambda_sdpc0d($composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(419747760, $changed, -1, 'ComposableSingletons$MainKt.lambda-1.<anonymous> (Main.kt:52)');
      }
      StorefrontApp($composer_0, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    return Unit_instance;
  }
  function ComposableLambda$invoke$ref_0($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function ComposableSingletons$MainKt$lambda_2$lambda_dts8wk($composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(1875997404, $changed, -1, 'ComposableSingletons$MainKt.lambda-2.<anonymous> (Main.kt:44)');
      }
      var tmp0_background = Color(new Long(-15788246, 0));
      var tmp1_surface = Color(new Long(-14800581, 0));
      var tmp2_primary = Color(new Long(-13058568, 0));
      var tmp3_onPrimary = Companion_getInstance_3().b3r_1;
      var tmp = darkColorScheme(tmp2_primary, tmp3_onPrimary, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp0_background, VOID, tmp1_surface);
      MaterialTheme(tmp, null, null, ComposableSingletons$MainKt_getInstance().tc9_1, $composer_0, 3072, 6);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    return Unit_instance;
  }
  function ComposableSingletons$MainKt() {
    ComposableSingletons$MainKt_instance = this;
    var tmp = this;
    tmp.tc9_1 = ComposableLambda$invoke$ref(composableLambdaInstance(419747760, false, ComposableSingletons$MainKt$lambda_1$lambda_sdpc0d));
    var tmp_0 = this;
    tmp_0.uc9_1 = ComposableLambda$invoke$ref_0(composableLambdaInstance(1875997404, false, ComposableSingletons$MainKt$lambda_2$lambda_dts8wk));
  }
  var ComposableSingletons$MainKt_instance;
  function ComposableSingletons$MainKt_getInstance() {
    if (ComposableSingletons$MainKt_instance == null)
      new ComposableSingletons$MainKt();
    return ComposableSingletons$MainKt_instance;
  }
  function StorefrontApp$lambda($packages$delegate) {
    _init_properties_Main_kt__xi25uv();
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('packages', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    return $packages$delegate.s2();
  }
  function StorefrontApp$lambda_0($packages$delegate, value) {
    _init_properties_Main_kt__xi25uv();
    getLocalDelegateReference('packages', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    $packages$delegate.g1d(value);
    return Unit_instance;
  }
  function StorefrontApp$lambda_1($isLoading$delegate) {
    _init_properties_Main_kt__xi25uv();
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('isLoading', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    return $isLoading$delegate.s2();
  }
  function StorefrontApp$lambda_2($isLoading$delegate, value) {
    _init_properties_Main_kt__xi25uv();
    getLocalDelegateReference('isLoading', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    $isLoading$delegate.g1d(value);
    return Unit_instance;
  }
  function json$lambda($this$Json) {
    _init_properties_Main_kt__xi25uv();
    $this$Json.ec1_1 = true;
    return Unit_instance;
  }
  function StorefrontApp$slambda($packages$delegate, $isLoading$delegate, resultContinuation) {
    this.dca_1 = $packages$delegate;
    this.eca_1 = $isLoading$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(StorefrontApp$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(StorefrontApp$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(StorefrontApp$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 6;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 5;
            this.bc_1 = 4;
            this.ac_1 = 2;
            suspendResult = await_0(window.fetch('/api/packages'), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.hca_1 = suspendResult;
            this.ac_1 = 3;
            suspendResult = await_0(this.hca_1.text(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var text = suspendResult;
            var tmp_0 = this;
            var this_0 = get_json();
            var this_1 = this_0.pb8();
            var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(PackageDto), arrayOf([]), false))]), false));
            StorefrontApp$lambda_0(this.dca_1, this_0.oc0(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), text));
            tmp_0.gca_1 = Unit_instance;
            this.bc_1 = 6;
            this.ac_1 = 7;
            continue $sm;
          case 4:
            this.bc_1 = 5;
            var tmp_1 = this.dc_1;
            if (tmp_1 instanceof Exception) {
              var e = this.dc_1;
              var tmp_2 = this;
              println('Failed to load packages: ' + e.message);
              tmp_2.gca_1 = Unit_instance;
              this.bc_1 = 6;
              this.ac_1 = 7;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 5:
            this.bc_1 = 6;
            var t = this.dc_1;
            StorefrontApp$lambda_2(this.eca_1, false);
            throw t;
          case 6:
            throw this.dc_1;
          case 7:
            this.bc_1 = 6;
            StorefrontApp$lambda_2(this.eca_1, false);
            return Unit_instance;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 6) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  protoOf(StorefrontApp$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new StorefrontApp$slambda(this.dca_1, this.eca_1, completion);
    i.fca_1 = $this$LaunchedEffect;
    return i;
  };
  function StorefrontApp$slambda_0($packages$delegate, $isLoading$delegate, resultContinuation) {
    var i = new StorefrontApp$slambda($packages$delegate, $isLoading$delegate, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function StorefrontApp$lambda$lambda(it) {
    _init_properties_Main_kt__xi25uv();
    return null;
  }
  function StorefrontApp$lambda$lambda_0($key, $items) {
    return function (index) {
      return $key($items.n(index));
    };
  }
  function StorefrontApp$lambda$lambda_1($span, $items) {
    return function ($this$null, it) {
      return $span($this$null, $items.n(it));
    };
  }
  function StorefrontApp$lambda$lambda_2($contentType, $items) {
    return function (index) {
      return $contentType($items.n(index));
    };
  }
  function ComposableLambda$invoke$ref_1($boundThis) {
    return function (p0, p1, p2, p3) {
      return $boundThis.q31(p0, p1, p2, p3);
    };
  }
  function StorefrontApp$lambda$lambda_3($items) {
    return function ($this$items, it, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C461@19441L22:LazyGridDsl.kt#7791vq');
      var $dirty = $changed;
      var tmp;
      if (($changed & 14) === 0) {
        $dirty = $dirty | ($composer_0.v1o($this$items) ? 4 : 2);
        tmp = Unit_instance;
      }
      var tmp_0;
      if (($changed & 112) === 0) {
        $dirty = $dirty | ($composer_0.n1y(it) ? 32 : 16);
        tmp_0 = Unit_instance;
      }
      var tmp_1;
      if (!(($dirty & 731) === 146) ? true : !$composer_0.f1x()) {
        if (isTraceInProgress()) {
          traceEventStart(699646206, $dirty, -1, 'androidx.compose.foundation.lazy.grid.items.<anonymous> (LazyGridDsl.kt:461)');
        }
        // Inline function 'StorefrontApp.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        var pkg = $items.n(it);
        var $changed_0 = 14 & $dirty;
        var $composer_1 = $composer_0;
        $composer_1.j1l(374521311);
        PackageCard(pkg, $composer_1, 14 & $changed_0 >> 3);
        $composer_1.l1l();
        var tmp_2;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_2 = Unit_instance;
        }
        tmp_1 = tmp_2;
      } else {
        $composer_0.q1r();
        tmp_1 = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function StorefrontApp$lambda_3($packages$delegate) {
    return function ($this$LazyVerticalGrid) {
      // Inline function 'androidx.compose.foundation.lazy.grid.items' call
      var items = StorefrontApp$lambda($packages$delegate);
      var contentType = StorefrontApp$lambda$lambda;
      var tmp = items.m();
      var tmp_0;
      if (!(null == null)) {
        tmp_0 = StorefrontApp$lambda$lambda_0(null, items);
      } else {
        tmp_0 = null;
      }
      var tmp_1 = tmp_0;
      var tmp_2;
      if (!(null == null)) {
        tmp_2 = StorefrontApp$lambda$lambda_1(null, items);
      } else {
        tmp_2 = null;
      }
      var tmp_3 = tmp_2;
      var tmp_4 = StorefrontApp$lambda$lambda_2(contentType, items);
      $this$LazyVerticalGrid.va1(tmp, tmp_1, tmp_3, tmp_4, ComposableLambda$invoke$ref_1(composableLambdaInstance(699646206, true, StorefrontApp$lambda$lambda_3(items))));
      return Unit_instance;
    };
  }
  function StorefrontApp$lambda_4($$changed) {
    return function ($composer, $force) {
      StorefrontApp($composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function PackageCard$lambda($pkg) {
    return function () {
      window.location.href = '/pkg/' + $pkg.nc9_1;
      return Unit_instance;
    };
  }
  function PackageCard$lambda_0($pkg, $$changed) {
    return function ($composer, $force) {
      PackageCard($pkg, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  var properties_initialized_Main_kt_gqj46d;
  function _init_properties_Main_kt__xi25uv() {
    if (!properties_initialized_Main_kt_gqj46d) {
      properties_initialized_Main_kt_gqj46d = true;
      json = Json(VOID, json$lambda);
    }
  }
  function skeuomorphicSurface(_this__u8e3s4, depth) {
    depth = depth === VOID ? 4.0 : depth;
    return drawWithContent(_this__u8e3s4, skeuomorphicSurface$lambda(depth));
  }
  function skeuomorphicSurface$lambda($depth) {
    return function ($this$drawWithContent) {
      $this$drawWithContent.m4w();
      $this$drawWithContent.d43(Color__copy$default_impl_ectz3s(Companion_getInstance_3().f3r_1, 0.3), Companion_getInstance_4().u33_1, Size__copy$default_impl_nrzrkq($this$drawWithContent.g34(), VOID, $depth));
      $this$drawWithContent.d43(Color__copy$default_impl_ectz3s(Companion_getInstance_3().b3r_1, 0.2), Offset(0.0, _Size___get_height__impl__a04p02($this$drawWithContent.g34()) - $depth), Size__copy$default_impl_nrzrkq($this$drawWithContent.g34(), VOID, $depth));
      return Unit_instance;
    };
  }
  //region block: post-declaration
  protoOf($serializer).mbd = typeParametersSerializers;
  protoOf($serializer_0).mbd = typeParametersSerializers;
  //endregion
  //region block: init
  Companion_instance_1 = new Companion();
  //endregion
  main();
  return _;
}));

//# sourceMappingURL=storefront-cmp.js.map
