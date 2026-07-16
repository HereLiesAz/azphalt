(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui.js', './compose-multiplatform-core-compose-runtime-runtime.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-foundation-foundation-layout.js', './compose-multiplatform-core-compose-ui-ui-graphics.js', './compose-multiplatform-core-compose-ui-ui-text.js', './compose-multiplatform-core-compose-material3-material3.js', './compose-multiplatform-core-compose-foundation-foundation.js', './kotlinx-coroutines-core.js', './compose-multiplatform-core-compose-animation-animation-core.js', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlinx-serialization-kotlinx-serialization-json.js', './compose-multiplatform-core-compose-ui-ui-geometry.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-foundation-foundation-layout.js'), require('./compose-multiplatform-core-compose-ui-ui-graphics.js'), require('./compose-multiplatform-core-compose-ui-ui-text.js'), require('./compose-multiplatform-core-compose-material3-material3.js'), require('./compose-multiplatform-core-compose-foundation-foundation.js'), require('./kotlinx-coroutines-core.js'), require('./compose-multiplatform-core-compose-animation-animation-core.js'), require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlinx-serialization-kotlinx-serialization-json.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation-layout'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation-layout' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation-layout' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-graphics' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-text'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-text' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-text' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-material3-material3'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-material3-material3' was not found. Please, check whether 'compose-multiplatform-core-compose-material3-material3' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-animation-animation-core' was not found. Please, check whether 'compose-multiplatform-core-compose-animation-animation-core' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'kotlinx-serialization-kotlinx-serialization-json' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-json' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'com.azphalt.storefront:storefront-cmp'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'com.azphalt.storefront:storefront-cmp'.");
    }
    root['com.azphalt.storefront:storefront-cmp'] = factory(typeof this['com.azphalt.storefront:storefront-cmp'] === 'undefined' ? {} : this['com.azphalt.storefront:storefront-cmp'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui'], this['compose-multiplatform-core-compose-runtime-runtime'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-foundation-foundation-layout'], this['compose-multiplatform-core-compose-ui-ui-graphics'], this['compose-multiplatform-core-compose-ui-ui-text'], this['compose-multiplatform-core-compose-material3-material3'], this['compose-multiplatform-core-compose-foundation-foundation'], this['kotlinx-coroutines-core'], this['compose-multiplatform-core-compose-animation-animation-core'], this['kotlinx-serialization-kotlinx-serialization-core'], this['kotlinx-serialization-kotlinx-serialization-json'], this['compose-multiplatform-core-compose-ui-ui-geometry']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_foundation_foundation_layout, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_compose_ui_ui_text, kotlin_org_jetbrains_compose_material3_material3, kotlin_org_jetbrains_compose_foundation_foundation, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json, kotlin_org_jetbrains_compose_ui_ui_geometry) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var VOID = kotlin_kotlin.$_$.g;
  var CanvasBasedWindow = kotlin_org_jetbrains_compose_ui_ui.$_$.m4;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var Companion_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.o5;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var padding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.k;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var Arrangement_getInstance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.q;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui.$_$.n5;
  var columnMeasurePolicy = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.e;
  var get_currentCompositeKeyHash = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a1;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.k5;
  var materializerOf = kotlin_org_jetbrains_compose_ui_ui.$_$.x1;
  var invalidApplier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d1;
  var Applier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h;
  var isInterface = kotlin_kotlin.$_$.wa;
  var _Updater___init__impl__rbfxm8 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a2;
  var Updater__set_impl_v7kwss = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c2;
  var _Updater___get_composer__impl__9ty7av = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b2;
  var equals = kotlin_kotlin.$_$.da;
  var _SkippableUpdater___init__impl__4ft0t9 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.y1;
  var SkippableUpdater = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var ColumnScopeInstance_instance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.s;
  var Long = kotlin_kotlin.$_$.ve;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.i3;
  var _Color___init__impl__r6cqi2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.i1;
  var _TextUnit___init__impl__r5fj1s = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g2;
  var _TextOverflow___init__impl__obguoe = kotlin_org_jetbrains_compose_ui_ui_text.$_$.s;
  var MaterialTheme_instance = kotlin_org_jetbrains_compose_material3_material3.$_$.e;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.y;
  var Text = kotlin_org_jetbrains_compose_material3_material3.$_$.c;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var fillMaxWidth = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.h;
  var height = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.i;
  var rememberBoxMeasurePolicy = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.m;
  var BoxScopeInstance_instance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.r;
  var _StrokeCap___init__impl__kfgr27 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.v1;
  var CircularProgressIndicator = kotlin_org_jetbrains_compose_material3_material3.$_$.a;
  var emptyList = kotlin_kotlin.$_$.m6;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var LaunchedEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q;
  var Adaptive = kotlin_org_jetbrains_compose_foundation_foundation.$_$.l;
  var fillMaxSize = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.g;
  var background = kotlin_org_jetbrains_compose_foundation_foundation.$_$.x;
  var padding_0 = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.j;
  var LazyVerticalGrid = kotlin_org_jetbrains_compose_foundation_foundation.$_$.o;
  var KMutableProperty0 = kotlin_kotlin.$_$.oc;
  var THROW_ISE = kotlin_kotlin.$_$.df;
  var getLocalDelegateReference = kotlin_kotlin.$_$.ha;
  var CoroutineImpl = kotlin_kotlin.$_$.n9;
  var protoOf = kotlin_kotlin.$_$.ib;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.z8;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var GridItemSpan = kotlin_org_jetbrains_compose_foundation_foundation.$_$.m;
  var GridItemSpan_0 = kotlin_org_jetbrains_compose_foundation_foundation.$_$.n;
  var composableLambdaInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.d2;
  var darkColorScheme = kotlin_org_jetbrains_compose_material3_material3.$_$.d;
  var MaterialTheme = kotlin_org_jetbrains_compose_material3_material3.$_$.b;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var padding_1 = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.l;
  var rowMeasurePolicy = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.n;
  var RowScopeInstance_instance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.t;
  var tween = kotlin_org_jetbrains_compose_animation_animation_core.$_$.w;
  var animateFloatAsState = kotlin_org_jetbrains_compose_animation_animation_core.$_$.n;
  var fillMaxHeight = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.f;
  var scale = kotlin_org_jetbrains_compose_ui_ui.$_$.e;
  var RoundedCornerShape = kotlin_org_jetbrains_compose_foundation_foundation.$_$.q;
  var clip = kotlin_org_jetbrains_compose_ui_ui.$_$.b;
  var pointerInput = kotlin_org_jetbrains_compose_ui_ui.$_$.h1;
  var Spacer = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.b;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w1;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var AwaitPointerEventScope = kotlin_org_jetbrains_compose_ui_ui.$_$.v;
  var awaitFirstDown = kotlin_org_jetbrains_compose_foundation_foundation.$_$.b1;
  var Collection = kotlin_kotlin.$_$.z4;
  var PointerInputScope = kotlin_org_jetbrains_compose_ui_ui.$_$.x;
  var awaitEachGesture = kotlin_org_jetbrains_compose_foundation_foundation.$_$.a1;
  var get_sp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g1;
  var width = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.p;
  var PluginGeneratedSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n1;
  var IntSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k;
  var StringSerializer_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l;
  var UnknownFieldException_init_$Create$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b;
  var typeParametersSerializers = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j1;
  var GeneratedSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.k1;
  var throwMissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q1;
  var objectCreate = kotlin_kotlin.$_$.gb;
  var getStringHashCode = kotlin_kotlin.$_$.ka;
  var get_nullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o;
  var clickable = kotlin_org_jetbrains_compose_foundation_foundation.$_$.y;
  var await_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d;
  var List = kotlin_kotlin.$_$.e5;
  var getKClass = kotlin_kotlin.$_$.e;
  var arrayOf = kotlin_kotlin.$_$.qf;
  var createKType = kotlin_kotlin.$_$.b;
  var createInvariantKTypeProjection = kotlin_kotlin.$_$.a;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var println = kotlin_kotlin.$_$.q9;
  var Exception = kotlin_kotlin.$_$.se;
  var Json = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_json.$_$.a;
  var CubicBezierEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.e;
  var drawWithContent = kotlin_org_jetbrains_compose_ui_ui.$_$.d;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.g1;
  var Size__copy$default_impl_nrzrkq = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz, 'ComposableSingletons$MainKt$lambda-5$lambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ComposableSingletons$MainKt, 'ComposableSingletons$MainKt', objectMeta);
  setMetadataFor(BentoCard$slambda$slambda, 'BentoCard$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(BentoCard$slambda, 'BentoCard$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($serializer, '$serializer', objectMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(PriceDto, 'PriceDto', classMeta, VOID, VOID, VOID, VOID, {0: $serializer_getInstance});
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor($serializer_0, '$serializer', objectMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(PackageDto, 'PackageDto', classMeta, VOID, VOID, VOID, VOID, {0: $serializer_getInstance_0});
  setMetadataFor(PackageBentoCard$slambda$slambda, 'PackageBentoCard$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(PackageBentoCard$slambda, 'PackageBentoCard$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($fetchPackagesCOROUTINE$0, '$fetchPackagesCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(ExpressiveMotion, 'ExpressiveMotion', objectMeta);
  //endregion
  function main() {
    CanvasBasedWindow('Azphalt Storefront', VOID, VOID, VOID, ComposableSingletons$MainKt_getInstance().ec9_1);
  }
  function ComposableLambda$invoke$ref($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.p31(p0, p1, p2);
    };
  }
  function ComposableSingletons$MainKt$lambda_1$lambda_sdpc0d($this$item, $composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 81) === 16) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(1153727714, $changed, -1, 'ComposableSingletons$MainKt.lambda-1.<anonymous> (Main.kt:54)');
      }
      HeroSection($composer_0, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    return Unit_instance;
  }
  function ComposableLambda$invoke$ref_0($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.p31(p0, p1, p2);
    };
  }
  function ComposableSingletons$MainKt$lambda_2$lambda_dts8wk($this$item, $composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 81) === 16) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(884333131, $changed, -1, 'ComposableSingletons$MainKt.lambda-2.<anonymous> (Main.kt:59)');
      }
      BentoGrid($composer_0, 0);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    return Unit_instance;
  }
  function ComposableLambda$invoke$ref_1($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.p31(p0, p1, p2);
    };
  }
  function ComposableSingletons$MainKt$lambda_3$lambda_ezu85n($this$item, $composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 81) === 16) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(-1699355798, $changed, -1, 'ComposableSingletons$MainKt.lambda-3.<anonymous> (Main.kt:64)');
      }
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var tmp = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_0 = _Dp___init__impl__ms3zkb(48);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(16);
      var modifier = padding(tmp, VOID, tmp_0, VOID, tmp$ret$1);
      var verticalArrangement = null;
      var horizontalAlignment = null;
      var $composer_1 = $composer_0;
      $composer_1.j1l(-483455358);
      sourceInformation($composer_1, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier = Companion_instance;
      if (!((6 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().b7t_1;
      if (!((6 & 4) === 0))
        horizontalAlignment = Companion_getInstance().d4s_1;
      var measurePolicy = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_1, 14 & 6 >> 3 | 112 & 6 >> 3);
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
      var factory = Companion_getInstance_0().m5o_1;
      var skippableUpdate = materializerOf(modifier_1);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_1 = $composer_3.g1x();
      if (!isInterface(tmp_1, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_2;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_2 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'ComposableSingletons$MainKt.lambda-3.<anonymous>.<anonymous>' call
      var $composer_5 = $composer_4;
      var tmp_3 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_4 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_5 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_6 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_7 = _TextOverflow___init__impl__obguoe(0);
      var tmp0_$this = MaterialTheme_instance.ibq($composer_5, 0).nbq_1;
      var tmp1_fontWeight = Companion_getInstance_1().j49_1;
      var tmp2_color = MaterialTheme_instance.lbo($composer_5, 0).obk_1;
      Text('Featured Listings', null, tmp_3, tmp_4, null, null, null, tmp_5, null, null, tmp_6, tmp_7, false, 0, 0, null, tmp0_$this.l4b(tmp2_color, VOID, tmp1_fontWeight), $composer_5, 6, 0, 65534);
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
    return Unit_instance;
  }
  function ComposableLambda$invoke$ref_2($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.p31(p0, p1, p2);
    };
  }
  function ComposableSingletons$MainKt$lambda_4$lambda_r7ncra($this$item, $composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 81) === 16) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(72541095, $changed, -1, 'ComposableSingletons$MainKt.lambda-4.<anonymous> (Main.kt:78)');
      }
      // Inline function 'androidx.compose.foundation.layout.Box' call
      var tmp = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$0 = _Dp___init__impl__ms3zkb(200);
      var modifier = height(tmp, tmp$ret$0);
      var contentAlignment = Companion_getInstance().v4r_1;
      var propagateMinConstraints = false;
      var $composer_1 = $composer_0;
      $composer_1.j1l(733328855);
      sourceInformation($composer_1, 'CC(Box)P(2,1,3)71@3309L67,72@3381L130:Box.kt#2w3rfo');
      if (!((4 & 1) === 0))
        modifier = Companion_instance;
      if (!((4 & 2) === 0))
        contentAlignment = Companion_getInstance().r4r_1;
      if (!((4 & 4) === 0))
        propagateMinConstraints = false;
      var measurePolicy = rememberBoxMeasurePolicy(contentAlignment, propagateMinConstraints, $composer_1, 14 & 54 >> 3 | 112 & 54 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_0 = modifier;
      var $changed_0 = 112 & 54 << 3;
      var modifier_1 = modifier_0;
      var $composer_2 = $composer_1;
      $composer_2.j1l(-1323940314);
      sourceInformation($composer_2, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_1 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_2, 0);
      var localMap = $composer_2.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_0().m5o_1;
      var skippableUpdate = materializerOf(modifier_1);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_0 = $composer_3.g1x();
      if (!isInterface(tmp_0, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_1;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_1 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -2146772375, 'C73@3426L9:Box.kt#2w3rfo');
      // Inline function 'ComposableSingletons$MainKt.lambda-4.<anonymous>.<anonymous>' call
      var $composer_5 = $composer_4;
      var tmp_2 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_3 = _Dp___init__impl__ms3zkb(0.0);
      var tmp_4 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      CircularProgressIndicator(null, tmp_2, tmp_3, tmp_4, _StrokeCap___init__impl__kfgr27(0), $composer_5, 0, 31);
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
    return Unit_instance;
  }
  function ComposableLambda$invoke$ref_3($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function ComposableSingletons$MainKt$lambda_5$lambda_1lz4ax($composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(419747760, $changed, -1, 'ComposableSingletons$MainKt.lambda-5.<anonymous> (Main.kt:35)');
      }
      $composer_0.j1l(-1901758043);
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'ComposableSingletons$MainKt.lambda-5.<anonymous>.<anonymous>' call
        var value = mutableStateOf(emptyList());
        $composer_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      var packages$delegate = tmp0_group;
      $composer_0.j1l(-1901755252);
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = $composer_0.x1y();
      var tmp_1;
      if (false ? true : it_0 === Companion_getInstance_2().w1r_1) {
        // Inline function 'ComposableSingletons$MainKt.lambda-5.<anonymous>.<anonymous>' call
        var value_0 = mutableStateOf(true);
        $composer_0.d1z(value_0);
        tmp_1 = value_0;
      } else {
        tmp_1 = it_0;
      }
      var tmp_2 = tmp_1;
      var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
      $composer_0.l1l();
      var isLoading$delegate = tmp1_group;
      $composer_0.j1l(-1901753017);
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_1 = $composer_0.x1y();
      var tmp_3;
      if (false ? true : it_1 === Companion_getInstance_2().w1r_1) {
        // Inline function 'ComposableSingletons$MainKt.lambda-5.<anonymous>.<anonymous>' call
        var value_1 = ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz_0(packages$delegate, isLoading$delegate, null);
        $composer_0.d1z(value_1);
        tmp_3 = value_1;
      } else {
        tmp_3 = it_1;
      }
      var tmp_4 = tmp_3;
      var tmp2_group = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
      $composer_0.l1l();
      LaunchedEffect(Unit_instance, tmp2_group, $composer_0, 70);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$12 = _Dp___init__impl__ms3zkb(360);
      var tmp0_columns = new Adaptive(tmp$ret$12);
      var tmp_5 = background(fillMaxSize(Companion_instance), MaterialTheme_instance.lbo($composer_0, 0).lbk_1);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$13 = _Dp___init__impl__ms3zkb(32);
      var tmp1_modifier = padding_0(tmp_5, tmp$ret$13);
      var tmp_6 = Arrangement_getInstance();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$14 = _Dp___init__impl__ms3zkb(24);
      var tmp2_horizontalArrangement = tmp_6.r7t(tmp$ret$14);
      var tmp_7 = Arrangement_getInstance();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$15 = _Dp___init__impl__ms3zkb(24);
      var tmp3_verticalArrangement = tmp_7.r7t(tmp$ret$15);
      $composer_0.j1l(-1901735478);
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_2 = $composer_0.x1y();
      var tmp_8;
      if (false ? true : it_2 === Companion_getInstance_2().w1r_1) {
        // Inline function 'ComposableSingletons$MainKt.lambda-5.<anonymous>.<anonymous>' call
        var value_2 = ComposableSingletons$MainKt$lambda_5$lambda$lambda_4wkiwu(isLoading$delegate, packages$delegate);
        $composer_0.d1z(value_2);
        tmp_8 = value_2;
      } else {
        tmp_8 = it_2;
      }
      var tmp_9 = tmp_8;
      var tmp3_group = (tmp_9 == null ? true : !(tmp_9 == null)) ? tmp_9 : THROW_CCE();
      $composer_0.l1l();
      LazyVerticalGrid(tmp0_columns, tmp1_modifier, null, null, false, tmp3_verticalArrangement, tmp2_horizontalArrangement, null, false, tmp3_group, $composer_0, 807075840, 412);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    return Unit_instance;
  }
  function invoke$lambda($packages$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('packages', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    return $packages$delegate.s2();
  }
  function invoke$lambda_0($packages$delegate, value) {
    getLocalDelegateReference('packages', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    $packages$delegate.g1d(value);
    return Unit_instance;
  }
  function invoke$lambda_1($isLoading$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('isLoading', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    return $isLoading$delegate.s2();
  }
  function invoke$lambda_2($isLoading$delegate, value) {
    getLocalDelegateReference('isLoading', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    $isLoading$delegate.g1d(value);
    return Unit_instance;
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz($packages$delegate, $isLoading$delegate, resultContinuation) {
    this.nc9_1 = $packages$delegate;
    this.oc9_1 = $isLoading$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = fetchPackages(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            invoke$lambda_0(this.nc9_1, ARGUMENT);
            invoke$lambda_2(this.oc9_1, false);
            return Unit_instance;
          case 2:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 2) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz).x1e = function ($this$LaunchedEffect, completion) {
    var i = new ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz(this.nc9_1, this.oc9_1, completion);
    i.pc9_1 = $this$LaunchedEffect;
    return i;
  };
  function ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz_0($packages$delegate, $isLoading$delegate, resultContinuation) {
    var i = new ComposableSingletons$MainKt$lambda_5$lambda$slambda_qrb1zz($packages$delegate, $isLoading$delegate, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1($this$item) {
    return new GridItemSpan_0(GridItemSpan($this$item.ba7()));
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_0($this$item) {
    return new GridItemSpan_0(GridItemSpan($this$item.ba7()));
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_1($this$item) {
    return new GridItemSpan_0(GridItemSpan($this$item.ba7()));
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_2($this$item) {
    return new GridItemSpan_0(GridItemSpan($this$item.ba7()));
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_3(it) {
    return null;
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_4($key, $items) {
    return function (index) {
      return $key($items.n(index));
    };
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_5($span, $items) {
    return function ($this$null, it) {
      return $span($this$null, $items.n(it));
    };
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_6($contentType, $items) {
    return function (index) {
      return $contentType($items.n(index));
    };
  }
  function ComposableLambda$invoke$ref_4($boundThis) {
    return function (p0, p1, p2, p3) {
      return $boundThis.q31(p0, p1, p2, p3);
    };
  }
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_7($items) {
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
        // Inline function 'ComposableSingletons$MainKt.lambda-5.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
        var pkg = $items.n(it);
        var $changed_0 = 14 & $dirty;
        var $composer_1 = $composer_0;
        $composer_1.j1l(-1639448570);
        PackageBentoCard(pkg, $composer_1, 14 & $changed_0 >> 3);
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
  function ComposableSingletons$MainKt$lambda_5$lambda$lambda_4wkiwu($isLoading$delegate, $packages$delegate) {
    return function ($this$LazyVerticalGrid) {
      $this$LazyVerticalGrid.ya0(VOID, ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1, VOID, ComposableSingletons$MainKt_getInstance().zc8_1);
      $this$LazyVerticalGrid.ya0(VOID, ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_0, VOID, ComposableSingletons$MainKt_getInstance().ac9_1);
      $this$LazyVerticalGrid.ya0(VOID, ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_1, VOID, ComposableSingletons$MainKt_getInstance().bc9_1);
      var tmp;
      if (invoke$lambda_1($isLoading$delegate)) {
        $this$LazyVerticalGrid.ya0(VOID, ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_2, VOID, ComposableSingletons$MainKt_getInstance().cc9_1);
        tmp = Unit_instance;
      } else {
        // Inline function 'androidx.compose.foundation.lazy.grid.items' call
        var items = invoke$lambda($packages$delegate);
        var contentType = ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_3;
        var tmp_0 = items.m();
        var tmp_1;
        if (!(null == null)) {
          tmp_1 = ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_4(null, items);
        } else {
          tmp_1 = null;
        }
        var tmp_2 = tmp_1;
        var tmp_3;
        if (!(null == null)) {
          tmp_3 = ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_5(null, items);
        } else {
          tmp_3 = null;
        }
        var tmp_4 = tmp_3;
        var tmp_5 = ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_6(contentType, items);
        $this$LazyVerticalGrid.za0(tmp_0, tmp_2, tmp_4, tmp_5, ComposableLambda$invoke$ref_4(composableLambdaInstance(699646206, true, ComposableSingletons$MainKt$lambda_5$lambda$lambda$lambda_78dje1_7(items))));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ComposableLambda$invoke$ref_5($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function ComposableSingletons$MainKt$lambda_6$lambda_uflld4($composer, $changed) {
    var $composer_0 = $composer;
    if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(1875997404, $changed, -1, 'ComposableSingletons$MainKt.lambda-6.<anonymous> (Main.kt:27)');
      }
      var tmp0_background = Color(new Long(-16119285, 0));
      var tmp1_surface = Color(new Long(-15329766, 0));
      var tmp2_primary = Color(new Long(-6322433, 0));
      var tmp3_onPrimary = Companion_getInstance_3().o3s_1;
      var tmp = darkColorScheme(tmp2_primary, tmp3_onPrimary, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp0_background, VOID, tmp1_surface);
      MaterialTheme(tmp, null, null, ComposableSingletons$MainKt_getInstance().dc9_1, $composer_0, 3072, 6);
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
    tmp.zc8_1 = ComposableLambda$invoke$ref(composableLambdaInstance(1153727714, false, ComposableSingletons$MainKt$lambda_1$lambda_sdpc0d));
    var tmp_0 = this;
    tmp_0.ac9_1 = ComposableLambda$invoke$ref_0(composableLambdaInstance(884333131, false, ComposableSingletons$MainKt$lambda_2$lambda_dts8wk));
    var tmp_1 = this;
    tmp_1.bc9_1 = ComposableLambda$invoke$ref_1(composableLambdaInstance(-1699355798, false, ComposableSingletons$MainKt$lambda_3$lambda_ezu85n));
    var tmp_2 = this;
    tmp_2.cc9_1 = ComposableLambda$invoke$ref_2(composableLambdaInstance(72541095, false, ComposableSingletons$MainKt$lambda_4$lambda_r7ncra));
    var tmp_3 = this;
    tmp_3.dc9_1 = ComposableLambda$invoke$ref_3(composableLambdaInstance(419747760, false, ComposableSingletons$MainKt$lambda_5$lambda_1lz4ax));
    var tmp_4 = this;
    tmp_4.ec9_1 = ComposableLambda$invoke$ref_5(composableLambdaInstance(1875997404, false, ComposableSingletons$MainKt$lambda_6$lambda_uflld4));
  }
  var ComposableSingletons$MainKt_instance;
  function ComposableSingletons$MainKt_getInstance() {
    if (ComposableSingletons$MainKt_instance == null)
      new ComposableSingletons$MainKt();
    return ComposableSingletons$MainKt_instance;
  }
  function BentoGrid($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-171435120);
    if (!($changed === 0) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(-171435120, $changed, -1, 'components.BentoGrid (BentoGrid.kt:21)');
      }
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var tmp = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp_0 = _Dp___init__impl__ms3zkb(64);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$1 = _Dp___init__impl__ms3zkb(32);
      var modifier = padding_1(tmp, tmp_0, tmp$ret$1);
      var tmp_1 = Arrangement_getInstance();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$2 = _Dp___init__impl__ms3zkb(24);
      var modifier_0 = modifier;
      var verticalArrangement = tmp_1.r7t(tmp$ret$2);
      var horizontalAlignment = null;
      var $composer_1 = $composer_0;
      $composer_1.j1l(-483455358);
      sourceInformation($composer_1, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((4 & 1) === 0))
        modifier_0 = Companion_instance;
      if (!((4 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().b7t_1;
      if (!((4 & 4) === 0))
        horizontalAlignment = Companion_getInstance().d4s_1;
      var measurePolicy = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_1, 14 & 54 >> 3 | 112 & 54 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_1 = modifier_0;
      var $changed_0 = 112 & 54 << 3;
      var modifier_2 = modifier_1;
      var $composer_2 = $composer_1;
      $composer_2.j1l(-1323940314);
      sourceInformation($composer_2, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_2 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_2, 0);
      var localMap = $composer_2.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_0().m5o_1;
      var skippableUpdate = materializerOf(modifier_2);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_2 = $composer_3.g1x();
      if (!isInterface(tmp_2, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_3;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_3 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'components.BentoGrid.<anonymous>' call
      var $composer_5 = $composer_4;
      // Inline function 'androidx.compose.foundation.layout.Row' call
      var tmp_4 = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$5 = _Dp___init__impl__ms3zkb(300);
      var modifier_3 = height(tmp_4, tmp$ret$5);
      var tmp_5 = Arrangement_getInstance();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$6 = _Dp___init__impl__ms3zkb(24);
      var modifier_4 = modifier_3;
      var horizontalArrangement = tmp_5.r7t(tmp$ret$6);
      var verticalAlignment = null;
      var $composer_6 = $composer_5;
      $composer_6.j1l(693286680);
      sourceInformation($composer_6, 'CC(Row)P(2,1,3)91@4632L58,92@4695L130:Row.kt#2w3rfo');
      if (!((4 & 1) === 0))
        modifier_4 = Companion_instance;
      if (!((4 & 2) === 0))
        horizontalArrangement = Arrangement_getInstance().z7s_1;
      if (!((4 & 4) === 0))
        verticalAlignment = Companion_getInstance().a4s_1;
      var measurePolicy_0 = rowMeasurePolicy(horizontalArrangement, verticalAlignment, $composer_6, 14 & 54 >> 3 | 112 & 54 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_5 = modifier_4;
      var $changed_2 = 112 & 54 << 3;
      var modifier_6 = modifier_5;
      var $composer_7 = $composer_6;
      $composer_7.j1l(-1323940314);
      sourceInformation($composer_7, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_6 = Companion_instance;
      var compositeKeyHash_0 = get_currentCompositeKeyHash($composer_7, 0);
      var localMap_0 = $composer_7.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_0 = Companion_getInstance_0().m5o_1;
      var skippableUpdate_0 = materializerOf(modifier_6);
      var $changed_3 = 6 | 7168 & $changed_2 << 9;
      var $composer_8 = $composer_7;
      var tmp_6 = $composer_8.g1x();
      if (!isInterface(tmp_6, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_0 = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
      var tmp_7;
      if ($this$with_0.p1x() ? true : !equals($this$with_0.x1y(), compositeKeyHash_0)) {
        $this$with_0.d1z(compositeKeyHash_0);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).e1y(compositeKeyHash_0, block_0);
        tmp_7 = Unit_instance;
      }
      skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_8)), $composer_8, 112 & $changed_3 >> 3);
      $composer_8.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Row.<anonymous>' call
      var $composer_9 = $composer_8;
      sourceInformationMarkerStart($composer_9, -408223174, 'C93@4740L9:Row.kt#2w3rfo');
      // Inline function 'components.BentoGrid.<anonymous>.<anonymous>' call
      var $composer_10 = $composer_9;
      BentoCard('Registry', 'Blazing fast package resolution.', RowScopeInstance_instance.j7w(Companion_instance, 2.0), $composer_10, 54, 0);
      BentoCard('SDK', 'Type-safe extensions.', RowScopeInstance_instance.j7w(Companion_instance, 1.0), $composer_10, 54, 0);
      sourceInformationMarkerEnd($composer_9);
      $composer_8.l1l();
      $composer_8.z1x();
      $composer_7.l1l();
      $composer_6.l1l();
      // Inline function 'androidx.compose.foundation.layout.Row' call
      var tmp_8 = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$9 = _Dp___init__impl__ms3zkb(400);
      var modifier_7 = height(tmp_8, tmp$ret$9);
      var tmp_9 = Arrangement_getInstance();
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$10 = _Dp___init__impl__ms3zkb(24);
      var modifier_8 = modifier_7;
      var horizontalArrangement_0 = tmp_9.r7t(tmp$ret$10);
      var verticalAlignment_0 = null;
      var $composer_11 = $composer_5;
      $composer_11.j1l(693286680);
      sourceInformation($composer_11, 'CC(Row)P(2,1,3)91@4632L58,92@4695L130:Row.kt#2w3rfo');
      if (!((4 & 1) === 0))
        modifier_8 = Companion_instance;
      if (!((4 & 2) === 0))
        horizontalArrangement_0 = Arrangement_getInstance().z7s_1;
      if (!((4 & 4) === 0))
        verticalAlignment_0 = Companion_getInstance().a4s_1;
      var measurePolicy_1 = rowMeasurePolicy(horizontalArrangement_0, verticalAlignment_0, $composer_11, 14 & 54 >> 3 | 112 & 54 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_9 = modifier_8;
      var $changed_4 = 112 & 54 << 3;
      var modifier_10 = modifier_9;
      var $composer_12 = $composer_11;
      $composer_12.j1l(-1323940314);
      sourceInformation($composer_12, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_10 = Companion_instance;
      var compositeKeyHash_1 = get_currentCompositeKeyHash($composer_12, 0);
      var localMap_1 = $composer_12.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_1 = Companion_getInstance_0().m5o_1;
      var skippableUpdate_1 = materializerOf(modifier_10);
      var $changed_5 = 6 | 7168 & $changed_4 << 9;
      var $composer_13 = $composer_12;
      var tmp_10 = $composer_13.g1x();
      if (!isInterface(tmp_10, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode_1, measurePolicy_1, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_1, localMap_1, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_1 = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_1 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1);
      var tmp_11;
      if ($this$with_1.p1x() ? true : !equals($this$with_1.x1y(), compositeKeyHash_1)) {
        $this$with_1.d1z(compositeKeyHash_1);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1).e1y(compositeKeyHash_1, block_1);
        tmp_11 = Unit_instance;
      }
      skippableUpdate_1(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_13)), $composer_13, 112 & $changed_5 >> 3);
      $composer_13.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Row.<anonymous>' call
      var $composer_14 = $composer_13;
      sourceInformationMarkerStart($composer_14, -408223174, 'C93@4740L9:Row.kt#2w3rfo');
      // Inline function 'components.BentoGrid.<anonymous>.<anonymous>' call
      var $composer_15 = $composer_14;
      BentoCard('Conformance', 'Strict adherence to the Azphalt standard.', RowScopeInstance_instance.j7w(Companion_instance, 1.0), $composer_15, 54, 0);
      BentoCard('Importers', 'Seamless migration tools.', RowScopeInstance_instance.j7w(Companion_instance, 2.0), $composer_15, 54, 0);
      sourceInformationMarkerEnd($composer_14);
      $composer_13.l1l();
      $composer_13.z1x();
      $composer_12.l1l();
      $composer_11.l1l();
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
    var tmp0_safe_receiver = $composer_0.m20();
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.j24(BentoGrid$lambda($changed));
    }
  }
  function BentoCard(title, subtitle, modifier, $composer, $changed, $default) {
    var modifier_0 = {_v: modifier};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(1101037021);
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(title) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.v1o(subtitle) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier_0._v) ? 256 : 128);
    if (!(($dirty & 731) === 146) ? true : !$composer_0.f1x()) {
      if (!(($default & 4) === 0)) {
        modifier_0._v = Companion_instance;
      }
      if (isTraceInProgress()) {
        traceEventStart(1101037021, $dirty, -1, 'components.BentoCard (BentoGrid.kt:62)');
      }
      $composer_0.j1l(1743498208);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_0 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = this_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'components.BentoCard.<anonymous>' call
        var value = mutableStateOf(false);
        this_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      var isPressed$delegate = tmp0_group;
      var tmp_1 = BentoCard$lambda(isPressed$delegate) ? 0.96 : 1.0;
      ExpressiveMotion_getInstance();
      var tmp_2 = tween(150, VOID, ExpressiveMotion_getInstance().wc9_1);
      var scale_0 = animateFloatAsState(tmp_1, tmp_2, 0.0, null, null, $composer_0, 0, 28).s2();
      // Inline function 'androidx.compose.foundation.layout.Box' call
      var tmp_3 = scale(fillMaxHeight(modifier_0._v), scale_0);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$4 = _Dp___init__impl__ms3zkb(32);
      var tmp_4 = skeuomorphicSurface(background(clip(tmp_3, RoundedCornerShape(tmp$ret$4)), MaterialTheme_instance.lbo($composer_0, 0).nbk_1), 8.0);
      $composer_0.j1l(1743519842);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_1 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = this_1.x1y();
      var tmp_5;
      if (false ? true : it_0 === Companion_getInstance_2().w1r_1) {
        // Inline function 'components.BentoCard.<anonymous>' call
        var value_0 = BentoCard$slambda_0(isPressed$delegate, null);
        this_1.d1z(value_0);
        tmp_5 = value_0;
      } else {
        tmp_5 = it_0;
      }
      var tmp_6 = tmp_5;
      var tmp1_group = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
      $composer_0.l1l();
      var tmp_7 = pointerInput(tmp_4, Unit_instance, tmp1_group);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$9 = _Dp___init__impl__ms3zkb(32);
      var modifier_1 = padding_0(tmp_7, tmp$ret$9);
      var contentAlignment = null;
      var propagateMinConstraints = false;
      var $composer_1 = $composer_0;
      $composer_1.j1l(733328855);
      sourceInformation($composer_1, 'CC(Box)P(2,1,3)71@3309L67,72@3381L130:Box.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier_1 = Companion_instance;
      if (!((6 & 2) === 0))
        contentAlignment = Companion_getInstance().r4r_1;
      if (!((6 & 4) === 0))
        propagateMinConstraints = false;
      var measurePolicy = rememberBoxMeasurePolicy(contentAlignment, propagateMinConstraints, $composer_1, 14 & 0 >> 3 | 112 & 0 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_2 = modifier_1;
      var $changed_0 = 112 & 0 << 3;
      var modifier_3 = modifier_2;
      var $composer_2 = $composer_1;
      $composer_2.j1l(-1323940314);
      sourceInformation($composer_2, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_3 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_2, 0);
      var localMap = $composer_2.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_0().m5o_1;
      var skippableUpdate = materializerOf(modifier_3);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_8 = $composer_3.g1x();
      if (!isInterface(tmp_8, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_9;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_9 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -2146772375, 'C73@3426L9:Box.kt#2w3rfo');
      // Inline function 'components.BentoCard.<anonymous>' call
      var $composer_5 = $composer_4;
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var modifier_4 = null;
      var verticalArrangement = null;
      var horizontalAlignment = null;
      var $composer_6 = $composer_5;
      $composer_6.j1l(-483455358);
      sourceInformation($composer_6, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((7 & 1) === 0))
        modifier_4 = Companion_instance;
      if (!((7 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().b7t_1;
      if (!((7 & 4) === 0))
        horizontalAlignment = Companion_getInstance().d4s_1;
      var measurePolicy_0 = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_6, 14 & 0 >> 3 | 112 & 0 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_5 = modifier_4;
      var $changed_2 = 112 & 0 << 3;
      var modifier_6 = modifier_5;
      var $composer_7 = $composer_6;
      $composer_7.j1l(-1323940314);
      sourceInformation($composer_7, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_6 = Companion_instance;
      var compositeKeyHash_0 = get_currentCompositeKeyHash($composer_7, 0);
      var localMap_0 = $composer_7.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_0 = Companion_getInstance_0().m5o_1;
      var skippableUpdate_0 = materializerOf(modifier_6);
      var $changed_3 = 6 | 7168 & $changed_2 << 9;
      var $composer_8 = $composer_7;
      var tmp_10 = $composer_8.g1x();
      if (!isInterface(tmp_10, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_0 = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
      var tmp_11;
      if ($this$with_0.p1x() ? true : !equals($this$with_0.x1y(), compositeKeyHash_0)) {
        $this$with_0.d1z(compositeKeyHash_0);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).e1y(compositeKeyHash_0, block_0);
        tmp_11 = Unit_instance;
      }
      skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_8)), $composer_8, 112 & $changed_3 >> 3);
      $composer_8.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_9 = $composer_8;
      sourceInformationMarkerStart($composer_9, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'components.BentoCard.<anonymous>.<anonymous>' call
      var $composer_10 = $composer_9;
      var tmp_12 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_13 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_14 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_15 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_16 = _TextOverflow___init__impl__obguoe(0);
      var tmp0_$this = MaterialTheme_instance.ibq($composer_10, 0).obq_1;
      var tmp1_fontWeight = Companion_getInstance_1().j49_1;
      var tmp2_color = MaterialTheme_instance.lbo($composer_10, 0).obk_1;
      Text(title, null, tmp_12, tmp_13, null, null, null, tmp_14, null, null, tmp_15, tmp_16, false, 0, 0, null, tmp0_$this.l4b(tmp2_color, VOID, tmp1_fontWeight), $composer_10, 14 & $dirty, 0, 65534);
      var tmp_17 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$14 = _Dp___init__impl__ms3zkb(16);
      Spacer(height(tmp_17, tmp$ret$14), $composer_10, 6);
      var tmp_18 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_19 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_20 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_21 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_22 = _TextOverflow___init__impl__obguoe(0);
      Text(subtitle, null, tmp_18, tmp_19, null, null, null, tmp_20, null, null, tmp_21, tmp_22, false, 0, 0, null, MaterialTheme_instance.ibq($composer_10, 0).tbq_1.l4b(Color__copy$default_impl_ectz3s(MaterialTheme_instance.lbo($composer_10, 0).obk_1, 0.6)), $composer_10, 14 & $dirty >> 3, 0, 65534);
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
      tmp2_safe_receiver.j24(BentoCard$lambda_1(title, subtitle, modifier_0, $changed, $default));
    }
  }
  function BentoCard$lambda($isPressed$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('isPressed', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    return $isPressed$delegate.s2();
  }
  function BentoCard$lambda_0($isPressed$delegate, value) {
    getLocalDelegateReference('isPressed', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    $isPressed$delegate.g1d(value);
    return Unit_instance;
  }
  function BentoGrid$lambda($$changed) {
    return function ($composer, $force) {
      BentoGrid($composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function BentoCard$slambda$slambda($isPressed$delegate, resultContinuation) {
    this.qca_1 = $isPressed$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BentoCard$slambda$slambda).h8s = function ($this$awaitEachGesture, $completion) {
    var tmp = this.i8s($this$awaitEachGesture, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BentoCard$slambda$slambda).yc = function (p1, $completion) {
    return this.h8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(BentoCard$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            suspendResult = awaitFirstDown(this.rca_1, VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            BentoCard$lambda_0(this.qca_1, true);
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.ac_1 = 3;
            suspendResult = this.rca_1.h5l(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var event = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = event.y5d_1;
              var tmp_0;
              if (isInterface(this_0, Collection)) {
                tmp_0 = this_0.u();
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                tmp$ret$0 = false;
                break l$ret$1;
              }
              var tmp0_iterator = this_0.o();
              while (tmp0_iterator.d1()) {
                var element = tmp0_iterator.f1();
                if (element.h5e_1) {
                  tmp$ret$0 = true;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = false;
            }
             while (false);
            if (tmp$ret$0) {
              this.ac_1 = 2;
              continue $sm;
            }

            this.ac_1 = 4;
            continue $sm;
          case 4:
            BentoCard$lambda_0(this.qca_1, false);
            return Unit_instance;
          case 5:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 5) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(BentoCard$slambda$slambda).i8s = function ($this$awaitEachGesture, completion) {
    var i = new BentoCard$slambda$slambda(this.qca_1, completion);
    i.rca_1 = $this$awaitEachGesture;
    return i;
  };
  function BentoCard$slambda$slambda_0($isPressed$delegate, resultContinuation) {
    var i = new BentoCard$slambda$slambda($isPressed$delegate, resultContinuation);
    var l = function ($this$awaitEachGesture, $completion) {
      return i.h8s($this$awaitEachGesture, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function BentoCard$slambda($isPressed$delegate, resultContinuation) {
    this.acb_1 = $isPressed$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BentoCard$slambda).t89 = function ($this$pointerInput, $completion) {
    var tmp = this.u89($this$pointerInput, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BentoCard$slambda).yc = function (p1, $completion) {
    return this.t89((!(p1 == null) ? isInterface(p1, PointerInputScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(BentoCard$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = awaitEachGesture(this.bcb_1, BentoCard$slambda$slambda_0(this.acb_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_instance;
          case 2:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 2) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(BentoCard$slambda).u89 = function ($this$pointerInput, completion) {
    var i = new BentoCard$slambda(this.acb_1, completion);
    i.bcb_1 = $this$pointerInput;
    return i;
  };
  function BentoCard$slambda_0($isPressed$delegate, resultContinuation) {
    var i = new BentoCard$slambda($isPressed$delegate, resultContinuation);
    var l = function ($this$pointerInput, $completion) {
      return i.t89($this$pointerInput, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function BentoCard$lambda_1($title, $subtitle, $modifier, $$changed, $$default) {
    return function ($composer, $force) {
      BentoCard($title, $subtitle, $modifier._v, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  function HeroSection($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(365651858);
    if (!($changed === 0) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(365651858, $changed, -1, 'components.HeroSection (HeroSection.kt:15)');
      }
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var tmp = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$0 = _Dp___init__impl__ms3zkb(64);
      var modifier = padding_0(tmp, tmp$ret$0);
      var verticalArrangement = null;
      var horizontalAlignment = Companion_getInstance().e4s_1;
      var $composer_1 = $composer_0;
      $composer_1.j1l(-483455358);
      sourceInformation($composer_1, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((2 & 1) === 0))
        modifier = Companion_instance;
      if (!((2 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().b7t_1;
      if (!((2 & 4) === 0))
        horizontalAlignment = Companion_getInstance().d4s_1;
      var measurePolicy = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_1, 14 & 390 >> 3 | 112 & 390 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_0 = modifier;
      var $changed_0 = 112 & 390 << 3;
      var modifier_1 = modifier_0;
      var $composer_2 = $composer_1;
      $composer_2.j1l(-1323940314);
      sourceInformation($composer_2, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_1 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_2, 0);
      var localMap = $composer_2.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_0().m5o_1;
      var skippableUpdate = materializerOf(modifier_1);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_0 = $composer_3.g1x();
      if (!isInterface(tmp_0, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_1;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_1 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'components.HeroSection.<anonymous>' call
      var $composer_5 = $composer_4;
      var tmp0_fontSize = get_sp(72);
      var tmp1_fontWeight = Companion_getInstance_1().j49_1;
      var tmp2_color = Color(new Long(-986896, 0));
      var tmp_2 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_3 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_4 = _TextOverflow___init__impl__obguoe(0);
      Text('Azphalt Storefront', null, tmp2_color, tmp0_fontSize, null, tmp1_fontWeight, null, tmp_2, null, null, tmp_3, tmp_4, false, 0, 0, null, null, $composer_5, 200070, 0, 131026);
      var tmp_5 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$3 = _Dp___init__impl__ms3zkb(24);
      Spacer(height(tmp_5, tmp$ret$3), $composer_5, 6);
      var tmp3_fontSize = get_sp(24);
      var tmp4_color = Color(new Long(-7829368, 0));
      var tmp_6 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_7 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_8 = _TextOverflow___init__impl__obguoe(0);
      Text('Physics-driven. Material 3 Expressive. Skeuomorphic.', null, tmp4_color, tmp3_fontSize, null, null, null, tmp_6, null, null, tmp_7, tmp_8, false, 0, 0, null, null, $composer_5, 3462, 0, 131058);
      var tmp_9 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$4 = _Dp___init__impl__ms3zkb(64);
      Spacer(height(tmp_9, tmp$ret$4), $composer_5, 6);
      // Inline function 'androidx.compose.foundation.layout.Box' call
      var tmp_10 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$5 = _Dp___init__impl__ms3zkb(260);
      var tmp_11 = width(tmp_10, tmp$ret$5);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$6 = _Dp___init__impl__ms3zkb(72);
      var modifier_2 = skeuomorphicSurface(background(height(tmp_11, tmp$ret$6), Color(new Long(-8758017, 0))), 12.0);
      var contentAlignment = null;
      var propagateMinConstraints = false;
      var $composer_6 = $composer_5;
      $composer_6.j1l(733328855);
      sourceInformation($composer_6, 'CC(Box)P(2,1,3)71@3309L67,72@3381L130:Box.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier_2 = Companion_instance;
      if (!((6 & 2) === 0))
        contentAlignment = Companion_getInstance().r4r_1;
      if (!((6 & 4) === 0))
        propagateMinConstraints = false;
      var measurePolicy_0 = rememberBoxMeasurePolicy(contentAlignment, propagateMinConstraints, $composer_6, 14 & 0 >> 3 | 112 & 0 >> 3);
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
      var factory_0 = Companion_getInstance_0().m5o_1;
      var skippableUpdate_0 = materializerOf(modifier_4);
      var $changed_3 = 6 | 7168 & $changed_2 << 9;
      var $composer_8 = $composer_7;
      var tmp_12 = $composer_8.g1x();
      if (!isInterface(tmp_12, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_0 = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
      var tmp_13;
      if ($this$with_0.p1x() ? true : !equals($this$with_0.x1y(), compositeKeyHash_0)) {
        $this$with_0.d1z(compositeKeyHash_0);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).e1y(compositeKeyHash_0, block_0);
        tmp_13 = Unit_instance;
      }
      skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_8)), $composer_8, 112 & $changed_3 >> 3);
      $composer_8.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box.<anonymous>' call
      var $composer_9 = $composer_8;
      sourceInformationMarkerStart($composer_9, -2146772375, 'C73@3426L9:Box.kt#2w3rfo');
      // Inline function 'components.HeroSection.<anonymous>.<anonymous>' call
      var $composer_10 = $composer_9;
      var tmp_14 = BoxScopeInstance_instance.m7u(Companion_instance, Companion_getInstance().v4r_1);
      var tmp_15 = Companion_getInstance_3().o3s_1;
      var tmp_16 = get_sp(20);
      var tmp_17 = Companion_getInstance_1().h49_1;
      var tmp_18 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_19 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_20 = _TextOverflow___init__impl__obguoe(0);
      Text('Explore the Registry', tmp_14, tmp_15, tmp_16, null, tmp_17, null, tmp_18, null, null, tmp_19, tmp_20, false, 0, 0, null, null, $composer_10, 200070, 0, 131024);
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
    var tmp0_safe_receiver = $composer_0.m20();
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.j24(HeroSection$lambda($changed));
    }
  }
  function HeroSection$lambda($$changed) {
    return function ($composer, $force) {
      HeroSection($composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function get_json() {
    _init_properties_PackageGrid_kt__e38d8m();
    return json;
  }
  var json;
  function $serializer() {
    $serializer_instance = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('components.PriceDto', this, 2);
    tmp0_serialDesc.zbc('amountCents', false);
    tmp0_serialDesc.zbc('currency', false);
    this.ccb_1 = tmp0_serialDesc;
  }
  protoOf($serializer).yb4 = function () {
    return this.ccb_1;
  };
  protoOf($serializer).bbd = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [IntSerializer_getInstance(), StringSerializer_getInstance()];
  };
  protoOf($serializer).zb4 = function (decoder) {
    var tmp0_desc = this.ccb_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = 0;
    var tmp5_local1 = null;
    var tmp6_input = decoder.qb7(tmp0_desc);
    if (tmp6_input.gb8()) {
      tmp4_local0 = tmp6_input.vb7(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp6_input.ab8(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp6_input.hb8(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp6_input.vb7(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp6_input.ab8(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp6_input.rb7(tmp0_desc);
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
      throwMissingFieldException(seen1, 3, $serializer_getInstance().ccb_1);
    }
    $this.dcb_1 = amountCents;
    $this.ecb_1 = currency;
    return $this;
  }
  function PriceDto_init_$Create$(seen1, amountCents, currency, serializationConstructorMarker) {
    return PriceDto_init_$Init$(seen1, amountCents, currency, serializationConstructorMarker, objectCreate(protoOf(PriceDto)));
  }
  function PriceDto() {
  }
  protoOf(PriceDto).toString = function () {
    return 'PriceDto(amountCents=' + this.dcb_1 + ', currency=' + this.ecb_1 + ')';
  };
  protoOf(PriceDto).hashCode = function () {
    var result = this.dcb_1;
    result = imul(result, 31) + getStringHashCode(this.ecb_1) | 0;
    return result;
  };
  protoOf(PriceDto).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PriceDto))
      return false;
    var tmp0_other_with_cast = other instanceof PriceDto ? other : THROW_CCE();
    if (!(this.dcb_1 === tmp0_other_with_cast.dcb_1))
      return false;
    if (!(this.ecb_1 === tmp0_other_with_cast.ecb_1))
      return false;
    return true;
  };
  function Companion() {
  }
  var Companion_instance_0;
  function Companion_getInstance_5() {
    return Companion_instance_0;
  }
  function $serializer_0() {
    $serializer_instance_0 = this;
    var tmp0_serialDesc = new PluginGeneratedSerialDescriptor('components.PackageDto', this, 6);
    tmp0_serialDesc.zbc('id', false);
    tmp0_serialDesc.zbc('name', false);
    tmp0_serialDesc.zbc('description', true);
    tmp0_serialDesc.zbc('author', true);
    tmp0_serialDesc.zbc('version', false);
    tmp0_serialDesc.zbc('price', true);
    this.fcb_1 = tmp0_serialDesc;
  }
  protoOf($serializer_0).yb4 = function () {
    return this.fcb_1;
  };
  protoOf($serializer_0).bbd = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [StringSerializer_getInstance(), StringSerializer_getInstance(), get_nullable(StringSerializer_getInstance()), get_nullable(StringSerializer_getInstance()), StringSerializer_getInstance(), get_nullable($serializer_getInstance())];
  };
  protoOf($serializer_0).zb4 = function (decoder) {
    var tmp0_desc = this.fcb_1;
    var tmp1_flag = true;
    var tmp2_index = 0;
    var tmp3_bitMask0 = 0;
    var tmp4_local0 = null;
    var tmp5_local1 = null;
    var tmp6_local2 = null;
    var tmp7_local3 = null;
    var tmp8_local4 = null;
    var tmp9_local5 = null;
    var tmp10_input = decoder.qb7(tmp0_desc);
    if (tmp10_input.gb8()) {
      tmp4_local0 = tmp10_input.ab8(tmp0_desc, 0);
      tmp3_bitMask0 = tmp3_bitMask0 | 1;
      tmp5_local1 = tmp10_input.ab8(tmp0_desc, 1);
      tmp3_bitMask0 = tmp3_bitMask0 | 2;
      tmp6_local2 = tmp10_input.eb8(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
      tmp3_bitMask0 = tmp3_bitMask0 | 4;
      tmp7_local3 = tmp10_input.eb8(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
      tmp3_bitMask0 = tmp3_bitMask0 | 8;
      tmp8_local4 = tmp10_input.ab8(tmp0_desc, 4);
      tmp3_bitMask0 = tmp3_bitMask0 | 16;
      tmp9_local5 = tmp10_input.eb8(tmp0_desc, 5, $serializer_getInstance(), tmp9_local5);
      tmp3_bitMask0 = tmp3_bitMask0 | 32;
    } else
      while (tmp1_flag) {
        tmp2_index = tmp10_input.hb8(tmp0_desc);
        switch (tmp2_index) {
          case -1:
            tmp1_flag = false;
            break;
          case 0:
            tmp4_local0 = tmp10_input.ab8(tmp0_desc, 0);
            tmp3_bitMask0 = tmp3_bitMask0 | 1;
            break;
          case 1:
            tmp5_local1 = tmp10_input.ab8(tmp0_desc, 1);
            tmp3_bitMask0 = tmp3_bitMask0 | 2;
            break;
          case 2:
            tmp6_local2 = tmp10_input.eb8(tmp0_desc, 2, StringSerializer_getInstance(), tmp6_local2);
            tmp3_bitMask0 = tmp3_bitMask0 | 4;
            break;
          case 3:
            tmp7_local3 = tmp10_input.eb8(tmp0_desc, 3, StringSerializer_getInstance(), tmp7_local3);
            tmp3_bitMask0 = tmp3_bitMask0 | 8;
            break;
          case 4:
            tmp8_local4 = tmp10_input.ab8(tmp0_desc, 4);
            tmp3_bitMask0 = tmp3_bitMask0 | 16;
            break;
          case 5:
            tmp9_local5 = tmp10_input.eb8(tmp0_desc, 5, $serializer_getInstance(), tmp9_local5);
            tmp3_bitMask0 = tmp3_bitMask0 | 32;
            break;
          default:
            throw UnknownFieldException_init_$Create$(tmp2_index);
        }
      }
    tmp10_input.rb7(tmp0_desc);
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
      throwMissingFieldException(seen1, 19, $serializer_getInstance_0().fcb_1);
    }
    $this.gcb_1 = id;
    $this.hcb_1 = name;
    if (0 === (seen1 & 4))
      $this.icb_1 = null;
    else
      $this.icb_1 = description;
    if (0 === (seen1 & 8))
      $this.jcb_1 = null;
    else
      $this.jcb_1 = author;
    $this.kcb_1 = version;
    if (0 === (seen1 & 32))
      $this.lcb_1 = null;
    else
      $this.lcb_1 = price;
    return $this;
  }
  function PackageDto_init_$Create$(seen1, id, name, description, author, version, price, serializationConstructorMarker) {
    return PackageDto_init_$Init$(seen1, id, name, description, author, version, price, serializationConstructorMarker, objectCreate(protoOf(PackageDto)));
  }
  function PackageDto(id, name, description, author, version, price) {
    description = description === VOID ? null : description;
    author = author === VOID ? null : author;
    price = price === VOID ? null : price;
    this.gcb_1 = id;
    this.hcb_1 = name;
    this.icb_1 = description;
    this.jcb_1 = author;
    this.kcb_1 = version;
    this.lcb_1 = price;
  }
  protoOf(PackageDto).toString = function () {
    return 'PackageDto(id=' + this.gcb_1 + ', name=' + this.hcb_1 + ', description=' + this.icb_1 + ', author=' + this.jcb_1 + ', version=' + this.kcb_1 + ', price=' + this.lcb_1 + ')';
  };
  protoOf(PackageDto).hashCode = function () {
    var result = getStringHashCode(this.gcb_1);
    result = imul(result, 31) + getStringHashCode(this.hcb_1) | 0;
    result = imul(result, 31) + (this.icb_1 == null ? 0 : getStringHashCode(this.icb_1)) | 0;
    result = imul(result, 31) + (this.jcb_1 == null ? 0 : getStringHashCode(this.jcb_1)) | 0;
    result = imul(result, 31) + getStringHashCode(this.kcb_1) | 0;
    result = imul(result, 31) + (this.lcb_1 == null ? 0 : this.lcb_1.hashCode()) | 0;
    return result;
  };
  protoOf(PackageDto).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PackageDto))
      return false;
    var tmp0_other_with_cast = other instanceof PackageDto ? other : THROW_CCE();
    if (!(this.gcb_1 === tmp0_other_with_cast.gcb_1))
      return false;
    if (!(this.hcb_1 === tmp0_other_with_cast.hcb_1))
      return false;
    if (!(this.icb_1 == tmp0_other_with_cast.icb_1))
      return false;
    if (!(this.jcb_1 == tmp0_other_with_cast.jcb_1))
      return false;
    if (!(this.kcb_1 === tmp0_other_with_cast.kcb_1))
      return false;
    if (!equals(this.lcb_1, tmp0_other_with_cast.lcb_1))
      return false;
    return true;
  };
  function fetchPackages($completion) {
    var tmp = new $fetchPackagesCOROUTINE$0($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function PackageBentoCard(pkg, $composer, $changed) {
    _init_properties_PackageGrid_kt__e38d8m();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-1335425815);
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(pkg) ? 4 : 2);
    if (!(($dirty & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(-1335425815, $dirty, -1, 'components.PackageBentoCard (PackageGrid.kt:54)');
      }
      $composer_0.j1l(1331890890);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_0 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = this_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'components.PackageBentoCard.<anonymous>' call
        var value = mutableStateOf(false);
        this_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      var isPressed$delegate = tmp0_group;
      var tmp_1 = PackageBentoCard$lambda(isPressed$delegate) ? 0.96 : 1.0;
      ExpressiveMotion_getInstance();
      var tmp_2 = tween(150, VOID, ExpressiveMotion_getInstance().wc9_1);
      var scale_0 = animateFloatAsState(tmp_1, tmp_2, 0.0, null, null, $composer_0, 0, 28).s2();
      // Inline function 'androidx.compose.foundation.layout.Box' call
      var tmp_3 = fillMaxWidth(Companion_instance);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$4 = _Dp___init__impl__ms3zkb(280);
      var tmp_4 = scale(height(tmp_3, tmp$ret$4), scale_0);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$5 = _Dp___init__impl__ms3zkb(32);
      var tmp_5 = skeuomorphicSurface(background(clip(tmp_4, RoundedCornerShape(tmp$ret$5)), MaterialTheme_instance.lbo($composer_0, 0).nbk_1), 8.0);
      $composer_0.j1l(1331911276);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_1 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = this_1.x1y();
      var tmp_6;
      if (false ? true : it_0 === Companion_getInstance_2().w1r_1) {
        // Inline function 'components.PackageBentoCard.<anonymous>' call
        var value_0 = PackageBentoCard$slambda_0(isPressed$delegate, null);
        this_1.d1z(value_0);
        tmp_6 = value_0;
      } else {
        tmp_6 = it_0;
      }
      var tmp_7 = tmp_6;
      var tmp1_group = (tmp_7 == null ? true : !(tmp_7 == null)) ? tmp_7 : THROW_CCE();
      $composer_0.l1l();
      var tmp_8 = pointerInput(tmp_5, Unit_instance, tmp1_group);
      $composer_0.j1l(1331922159);
      // Inline function 'androidx.compose.runtime.cache' call
      var this_2 = $composer_0;
      var invalid = ($dirty & 14) === 4;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_1 = this_2.x1y();
      var tmp_9;
      if (invalid ? true : it_1 === Companion_getInstance_2().w1r_1) {
        // Inline function 'components.PackageBentoCard.<anonymous>' call
        var value_1 = PackageBentoCard$lambda_1(pkg);
        this_2.d1z(value_1);
        tmp_9 = value_1;
      } else {
        tmp_9 = it_1;
      }
      var tmp_10 = tmp_9;
      var tmp2_group = (tmp_10 == null ? true : !(tmp_10 == null)) ? tmp_10 : THROW_CCE();
      $composer_0.l1l();
      var tmp_11 = clickable(tmp_8, VOID, VOID, VOID, tmp2_group);
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$14 = _Dp___init__impl__ms3zkb(32);
      var modifier = padding_0(tmp_11, tmp$ret$14);
      var contentAlignment = null;
      var propagateMinConstraints = false;
      var $composer_1 = $composer_0;
      $composer_1.j1l(733328855);
      sourceInformation($composer_1, 'CC(Box)P(2,1,3)71@3309L67,72@3381L130:Box.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier = Companion_instance;
      if (!((6 & 2) === 0))
        contentAlignment = Companion_getInstance().r4r_1;
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
      var factory = Companion_getInstance_0().m5o_1;
      var skippableUpdate = materializerOf(modifier_1);
      var $changed_1 = 6 | 7168 & $changed_0 << 9;
      var $composer_3 = $composer_2;
      var tmp_12 = $composer_3.g1x();
      if (!isInterface(tmp_12, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_13;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_13 = Unit_instance;
      }
      skippableUpdate(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_3)), $composer_3, 112 & $changed_1 >> 3);
      $composer_3.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Box.<anonymous>' call
      var $composer_4 = $composer_3;
      sourceInformationMarkerStart($composer_4, -2146772375, 'C73@3426L9:Box.kt#2w3rfo');
      // Inline function 'components.PackageBentoCard.<anonymous>' call
      var $composer_5 = $composer_4;
      // Inline function 'androidx.compose.foundation.layout.Column' call
      var modifier_2 = fillMaxSize(Companion_instance);
      var verticalArrangement = null;
      var horizontalAlignment = null;
      var $composer_6 = $composer_5;
      $composer_6.j1l(-483455358);
      sourceInformation($composer_6, 'CC(Column)P(2,3,1)78@3944L61,79@4010L133:Column.kt#2w3rfo');
      if (!((6 & 1) === 0))
        modifier_2 = Companion_instance;
      if (!((6 & 2) === 0))
        verticalArrangement = Arrangement_getInstance().b7t_1;
      if (!((6 & 4) === 0))
        horizontalAlignment = Companion_getInstance().d4s_1;
      var measurePolicy_0 = columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer_6, 14 & 6 >> 3 | 112 & 6 >> 3);
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var modifier_3 = modifier_2;
      var $changed_2 = 112 & 6 << 3;
      var modifier_4 = modifier_3;
      var $composer_7 = $composer_6;
      $composer_7.j1l(-1323940314);
      sourceInformation($composer_7, 'CC(Layout)P(!1,2)79@3208L23,81@3298L420:Layout.kt#80mrfh');
      if (!((0 & 2) === 0))
        modifier_4 = Companion_instance;
      var compositeKeyHash_0 = get_currentCompositeKeyHash($composer_7, 0);
      var localMap_0 = $composer_7.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory_0 = Companion_getInstance_0().m5o_1;
      var skippableUpdate_0 = materializerOf(modifier_4);
      var $changed_3 = 6 | 7168 & $changed_2 << 9;
      var $composer_8 = $composer_7;
      var tmp_14 = $composer_8.g1x();
      if (!isInterface(tmp_14, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, measurePolicy_0, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_0, localMap_0, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_0 = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_0 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0);
      var tmp_15;
      if ($this$with_0.p1x() ? true : !equals($this$with_0.x1y(), compositeKeyHash_0)) {
        $this$with_0.d1z(compositeKeyHash_0);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_0).e1y(compositeKeyHash_0, block_0);
        tmp_15 = Unit_instance;
      }
      skippableUpdate_0(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_8)), $composer_8, 112 & $changed_3 >> 3);
      $composer_8.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Column.<anonymous>' call
      var $composer_9 = $composer_8;
      sourceInformationMarkerStart($composer_9, -385166937, 'C80@4058L9:Column.kt#2w3rfo');
      // Inline function 'components.PackageBentoCard.<anonymous>.<anonymous>' call
      var $composer_10 = $composer_9;
      var tmp_16 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_17 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_18 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_19 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_20 = _TextOverflow___init__impl__obguoe(0);
      var tmp0_$this = MaterialTheme_instance.ibq($composer_10, 0).obq_1;
      var tmp1_fontWeight = Companion_getInstance_1().j49_1;
      var tmp2_color = MaterialTheme_instance.lbo($composer_10, 0).obk_1;
      Text(pkg.hcb_1, null, tmp_16, tmp_17, null, null, null, tmp_18, null, null, tmp_19, tmp_20, false, 0, 0, null, tmp0_$this.l4b(tmp2_color, VOID, tmp1_fontWeight), $composer_10, 0, 0, 65534);
      var tmp_21 = Companion_instance;
      // Inline function 'androidx.compose.ui.unit.dp' call
      var tmp$ret$19 = _Dp___init__impl__ms3zkb(16);
      Spacer(height(tmp_21, tmp$ret$19), $composer_10, 6);
      var tmp3_elvis_lhs = pkg.icb_1;
      var tmp4_text = tmp3_elvis_lhs == null ? '' : tmp3_elvis_lhs;
      var tmp5_style = MaterialTheme_instance.ibq($composer_10, 0).tbq_1.l4b(Color__copy$default_impl_ectz3s(MaterialTheme_instance.lbo($composer_10, 0).obk_1, 0.6));
      var tmp_22 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_23 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_24 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_25 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_26 = _TextOverflow___init__impl__obguoe(0);
      Text(tmp4_text, null, tmp_22, tmp_23, null, null, null, tmp_24, null, null, tmp_25, tmp_26, false, 3, 0, null, tmp5_style, $composer_10, 0, 3072, 57342);
      Spacer(ColumnScopeInstance_instance.u7u(Companion_instance, 1.0), $composer_10, 0);
      var tmp6_verticalAlignment = Companion_getInstance().b4s_1;
      // Inline function 'androidx.compose.foundation.layout.Row' call
      var modifier_5 = fillMaxWidth(Companion_instance);
      var horizontalArrangement = null;
      var verticalAlignment = tmp6_verticalAlignment;
      var $composer_11 = $composer_10;
      $composer_11.j1l(693286680);
      sourceInformation($composer_11, 'CC(Row)P(2,1,3)91@4632L58,92@4695L130:Row.kt#2w3rfo');
      if (!((2 & 1) === 0))
        modifier_5 = Companion_instance;
      if (!((2 & 2) === 0))
        horizontalArrangement = Arrangement_getInstance().z7s_1;
      if (!((2 & 4) === 0))
        verticalAlignment = Companion_getInstance().a4s_1;
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
      var factory_1 = Companion_getInstance_0().m5o_1;
      var skippableUpdate_1 = materializerOf(modifier_7);
      var $changed_5 = 6 | 7168 & $changed_4 << 9;
      var $composer_13 = $composer_12;
      var tmp_27 = $composer_13.g1x();
      if (!isInterface(tmp_27, Applier)) {
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
      Updater__set_impl_v7kwss($this$ReusableComposeNode_1, measurePolicy_1, Companion_getInstance_0().r5o_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode_1, localMap_1, Companion_getInstance_0().q5o_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block_1 = Companion_getInstance_0().u5o_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with_1 = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1);
      var tmp_28;
      if ($this$with_1.p1x() ? true : !equals($this$with_1.x1y(), compositeKeyHash_1)) {
        $this$with_1.d1z(compositeKeyHash_1);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode_1).e1y(compositeKeyHash_1, block_1);
        tmp_28 = Unit_instance;
      }
      skippableUpdate_1(new SkippableUpdater(_SkippableUpdater___init__impl__4ft0t9($composer_13)), $composer_13, 112 & $changed_5 >> 3);
      $composer_13.j1l(2058660585);
      // Inline function 'androidx.compose.foundation.layout.Row.<anonymous>' call
      var $composer_14 = $composer_13;
      sourceInformationMarkerStart($composer_14, -408223174, 'C93@4740L9:Row.kt#2w3rfo');
      // Inline function 'components.PackageBentoCard.<anonymous>.<anonymous>.<anonymous>' call
      var $composer_15 = $composer_14;
      var tmp0_elvis_lhs = pkg.jcb_1;
      var authorText = tmp0_elvis_lhs == null ? 'Unknown' : tmp0_elvis_lhs;
      var tmp_29 = '@' + authorText;
      var tmp_30 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
      var tmp_31 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_32 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_33 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
      var tmp_34 = _TextOverflow___init__impl__obguoe(0);
      Text(tmp_29, null, tmp_30, tmp_31, null, null, null, tmp_32, null, null, tmp_33, tmp_34, false, 0, 0, null, MaterialTheme_instance.ibq($composer_15, 0).wbq_1.l4b(MaterialTheme_instance.lbo($composer_15, 0).ybj_1, VOID, Companion_getInstance_1().i49_1), $composer_15, 0, 0, 65534);
      Spacer(RowScopeInstance_instance.j7w(Companion_instance, 1.0), $composer_15, 0);
      if (!(pkg.lcb_1 == null)) {
        $composer_15.j1l(158412054);
        var amount = pkg.lcb_1.dcb_1 / 100.0;
        var currency = pkg.lcb_1.ecb_1;
        var tmp_35 = '$' + amount + ' ' + currency;
        var tmp_36 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
        var tmp_37 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_38 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_39 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_40 = _TextOverflow___init__impl__obguoe(0);
        Text(tmp_35, null, tmp_36, tmp_37, null, null, null, tmp_38, null, null, tmp_39, tmp_40, false, 0, 0, null, MaterialTheme_instance.ibq($composer_15, 0).rbq_1.l4b(Color(new Long(-15681151, 0)), VOID, Companion_getInstance_1().j49_1), $composer_15, 0, 0, 65534);
        $composer_15.l1l();
      } else {
        $composer_15.j1l(158866297);
        var tmp_41 = _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0)));
        var tmp_42 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_43 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_44 = _TextUnit___init__impl__r5fj1s(new Long(0, 0));
        var tmp_45 = _TextOverflow___init__impl__obguoe(0);
        Text('FREE', null, tmp_41, tmp_42, null, null, null, tmp_43, null, null, tmp_44, tmp_45, false, 0, 0, null, MaterialTheme_instance.ibq($composer_15, 0).rbq_1.l4b(Color__copy$default_impl_ectz3s(MaterialTheme_instance.lbo($composer_15, 0).obk_1, 0.5), VOID, Companion_getInstance_1().i49_1), $composer_15, 6, 0, 65534);
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
    var tmp3_safe_receiver = $composer_0.m20();
    if (tmp3_safe_receiver == null)
      null;
    else {
      tmp3_safe_receiver.j24(PackageBentoCard$lambda_2(pkg, $changed));
    }
  }
  function PackageBentoCard$lambda($isPressed$delegate) {
    _init_properties_PackageGrid_kt__e38d8m();
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('isPressed', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    return $isPressed$delegate.s2();
  }
  function PackageBentoCard$lambda_0($isPressed$delegate, value) {
    _init_properties_PackageGrid_kt__e38d8m();
    getLocalDelegateReference('isPressed', KMutableProperty0, true, function () {
      return THROW_ISE();
    });
    $isPressed$delegate.g1d(value);
    return Unit_instance;
  }
  function json$lambda($this$Json) {
    _init_properties_PackageGrid_kt__e38d8m();
    $this$Json.uc0_1 = true;
    return Unit_instance;
  }
  function PackageBentoCard$slambda$slambda($isPressed$delegate, resultContinuation) {
    this.ecc_1 = $isPressed$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(PackageBentoCard$slambda$slambda).h8s = function ($this$awaitEachGesture, $completion) {
    var tmp = this.i8s($this$awaitEachGesture, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(PackageBentoCard$slambda$slambda).yc = function (p1, $completion) {
    return this.h8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(PackageBentoCard$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            suspendResult = awaitFirstDown(this.fcc_1, VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            PackageBentoCard$lambda_0(this.ecc_1, true);
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.ac_1 = 3;
            suspendResult = this.fcc_1.h5l(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var event = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = event.y5d_1;
              var tmp_0;
              if (isInterface(this_0, Collection)) {
                tmp_0 = this_0.u();
              } else {
                tmp_0 = false;
              }
              if (tmp_0) {
                tmp$ret$0 = false;
                break l$ret$1;
              }
              var tmp0_iterator = this_0.o();
              while (tmp0_iterator.d1()) {
                var element = tmp0_iterator.f1();
                if (element.h5e_1) {
                  tmp$ret$0 = true;
                  break l$ret$1;
                }
              }
              tmp$ret$0 = false;
            }
             while (false);
            if (tmp$ret$0) {
              this.ac_1 = 2;
              continue $sm;
            }

            this.ac_1 = 4;
            continue $sm;
          case 4:
            PackageBentoCard$lambda_0(this.ecc_1, false);
            return Unit_instance;
          case 5:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 5) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(PackageBentoCard$slambda$slambda).i8s = function ($this$awaitEachGesture, completion) {
    var i = new PackageBentoCard$slambda$slambda(this.ecc_1, completion);
    i.fcc_1 = $this$awaitEachGesture;
    return i;
  };
  function PackageBentoCard$slambda$slambda_0($isPressed$delegate, resultContinuation) {
    var i = new PackageBentoCard$slambda$slambda($isPressed$delegate, resultContinuation);
    var l = function ($this$awaitEachGesture, $completion) {
      return i.h8s($this$awaitEachGesture, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function PackageBentoCard$slambda($isPressed$delegate, resultContinuation) {
    this.occ_1 = $isPressed$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(PackageBentoCard$slambda).t89 = function ($this$pointerInput, $completion) {
    var tmp = this.u89($this$pointerInput, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(PackageBentoCard$slambda).yc = function (p1, $completion) {
    return this.t89((!(p1 == null) ? isInterface(p1, PointerInputScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(PackageBentoCard$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = awaitEachGesture(this.pcc_1, PackageBentoCard$slambda$slambda_0(this.occ_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return Unit_instance;
          case 2:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 2) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(PackageBentoCard$slambda).u89 = function ($this$pointerInput, completion) {
    var i = new PackageBentoCard$slambda(this.occ_1, completion);
    i.pcc_1 = $this$pointerInput;
    return i;
  };
  function PackageBentoCard$slambda_0($isPressed$delegate, resultContinuation) {
    var i = new PackageBentoCard$slambda($isPressed$delegate, resultContinuation);
    var l = function ($this$pointerInput, $completion) {
      return i.t89($this$pointerInput, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function PackageBentoCard$lambda_1($pkg) {
    return function () {
      window.location.href = '/pkg/' + $pkg.gcb_1;
      return Unit_instance;
    };
  }
  function PackageBentoCard$lambda_2($pkg, $$changed) {
    return function ($composer, $force) {
      PackageBentoCard($pkg, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function $fetchPackagesCOROUTINE$0(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf($fetchPackagesCOROUTINE$0).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.bc_1 = 3;
            this.ac_1 = 1;
            suspendResult = await_0(window.fetch('/api/packages'), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.vcb_1 = suspendResult;
            this.ac_1 = 2;
            suspendResult = await_0(this.vcb_1.text(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var text = suspendResult;
            var tmp_0 = this;
            var this_0 = get_json();
            var this_1 = this_0.fb8();
            var this_2 = serializer(this_1, createKType(getKClass(List), arrayOf([createInvariantKTypeProjection(createKType(getKClass(PackageDto), arrayOf([]), false))]), false));
            tmp_0.ucb_1 = this_0.ec0(isInterface(this_2, KSerializer) ? this_2 : THROW_CCE(), text);
            this.bc_1 = 4;
            this.ac_1 = 5;
            continue $sm;
          case 3:
            this.bc_1 = 4;
            var tmp_1 = this.dc_1;
            if (tmp_1 instanceof Exception) {
              var e = this.dc_1;
              var tmp_2 = this;
              println('Failed to load packages: ' + e.message);
              tmp_2.ucb_1 = emptyList();
              this.ac_1 = 5;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 4:
            throw this.dc_1;
          case 5:
            this.bc_1 = 4;
            return this.ucb_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 4) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  var properties_initialized_PackageGrid_kt_r0qucc;
  function _init_properties_PackageGrid_kt__e38d8m() {
    if (!properties_initialized_PackageGrid_kt_r0qucc) {
      properties_initialized_PackageGrid_kt_r0qucc = true;
      json = Json(VOID, json$lambda);
    }
  }
  function ExpressiveMotion() {
    ExpressiveMotion_instance = this;
    this.qc9_1 = new CubicBezierEasing(0.42, 1.67, 0.21, 0.9);
    this.rc9_1 = 350;
    this.sc9_1 = new CubicBezierEasing(0.38, 1.21, 0.22, 1.0);
    this.tc9_1 = 500;
    this.uc9_1 = new CubicBezierEasing(0.39, 1.29, 0.35, 0.98);
    this.vc9_1 = 650;
    this.wc9_1 = new CubicBezierEasing(0.31, 0.94, 0.34, 1.0);
    this.xc9_1 = 150;
    this.yc9_1 = new CubicBezierEasing(0.34, 0.8, 0.34, 1.0);
    this.zc9_1 = 200;
    this.aca_1 = new CubicBezierEasing(0.34, 0.88, 0.34, 1.0);
    this.bca_1 = 300;
    this.cca_1 = new CubicBezierEasing(0.27, 1.06, 0.18, 1.0);
    this.dca_1 = new CubicBezierEasing(0.27, 1.06, 0.18, 1.0);
    this.eca_1 = new CubicBezierEasing(0.27, 1.06, 0.18, 1.0);
    this.fca_1 = new CubicBezierEasing(0.31, 0.94, 0.34, 1.0);
    this.gca_1 = new CubicBezierEasing(0.34, 0.8, 0.34, 1.0);
    this.hca_1 = new CubicBezierEasing(0.34, 0.88, 0.34, 1.0);
  }
  var ExpressiveMotion_instance;
  function ExpressiveMotion_getInstance() {
    if (ExpressiveMotion_instance == null)
      new ExpressiveMotion();
    return ExpressiveMotion_instance;
  }
  function skeuomorphicSurface(_this__u8e3s4, depth) {
    depth = depth === VOID ? 4.0 : depth;
    return drawWithContent(_this__u8e3s4, skeuomorphicSurface$lambda(depth));
  }
  function skeuomorphicSurface$lambda($depth) {
    return function ($this$drawWithContent) {
      $this$drawWithContent.j4v();
      $this$drawWithContent.b42(Color__copy$default_impl_ectz3s(Companion_getInstance_3().o3s_1, 0.3), Companion_getInstance_4().u33_1, Size__copy$default_impl_nrzrkq($this$drawWithContent.g34(), VOID, $depth));
      $this$drawWithContent.b42(Color__copy$default_impl_ectz3s(Companion_getInstance_3().k3s_1, 0.2), Offset(0.0, _Size___get_height__impl__a04p02($this$drawWithContent.g34()) - $depth), Size__copy$default_impl_nrzrkq($this$drawWithContent.g34(), VOID, $depth));
      return Unit_instance;
    };
  }
  //region block: post-declaration
  protoOf($serializer).cbd = typeParametersSerializers;
  protoOf($serializer_0).cbd = typeParametersSerializers;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion();
  //endregion
  main();
  return _;
}));

//# sourceMappingURL=storefront-cmp.js.map
