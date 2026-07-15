(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './compose-multiplatform-core-compose-ui-ui-graphics.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui.js', './compose-multiplatform-core-compose-ui-ui-geometry.js', './compose-multiplatform-core-compose-runtime-runtime.js', './compose-multiplatform-core-compose-foundation-foundation-layout.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './kotlinx-coroutines-core.js', './compose-multiplatform-core-compose-animation-animation-core.js', './compose-multiplatform-core-compose-animation-animation.js', './compose-multiplatform-core-collection-collection.js', './compose-multiplatform-core-compose-runtime-runtime-saveable.js', './compose-multiplatform-core-compose-ui-ui-text.js', './skiko-kjs.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./compose-multiplatform-core-compose-ui-ui-graphics.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./compose-multiplatform-core-compose-foundation-foundation-layout.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./kotlinx-coroutines-core.js'), require('./compose-multiplatform-core-compose-animation-animation-core.js'), require('./compose-multiplatform-core-compose-animation-animation.js'), require('./compose-multiplatform-core-collection-collection.js'), require('./compose-multiplatform-core-compose-runtime-runtime-saveable.js'), require('./compose-multiplatform-core-compose-ui-ui-text.js'), require('./skiko-kjs.js'));
  else {
    if (typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-ui-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-graphics' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation-layout'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation-layout' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation-layout' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-animation-animation-core' was not found. Please, check whether 'compose-multiplatform-core-compose-animation-animation-core' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-animation-animation'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-animation-animation' was not found. Please, check whether 'compose-multiplatform-core-compose-animation-animation' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-collection-collection'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-collection-collection' was not found. Please, check whether 'compose-multiplatform-core-collection-collection' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime-saveable'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime-saveable' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime-saveable' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-text'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'compose-multiplatform-core-compose-ui-ui-text' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-text' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    if (typeof this['skiko-kjs'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation'. Its dependency 'skiko-kjs' was not found. Please, check whether 'skiko-kjs' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation'.");
    }
    root['compose-multiplatform-core-compose-foundation-foundation'] = factory(typeof this['compose-multiplatform-core-compose-foundation-foundation'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-foundation-foundation'], this['compose-multiplatform-core-compose-ui-ui-graphics'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui'], this['compose-multiplatform-core-compose-ui-ui-geometry'], this['compose-multiplatform-core-compose-runtime-runtime'], this['compose-multiplatform-core-compose-foundation-foundation-layout'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['kotlinx-coroutines-core'], this['compose-multiplatform-core-compose-animation-animation-core'], this['compose-multiplatform-core-compose-animation-animation'], this['compose-multiplatform-core-collection-collection'], this['compose-multiplatform-core-compose-runtime-runtime-saveable'], this['compose-multiplatform-core-compose-ui-ui-text'], this['skiko-kjs']);
  }
}(this, function (_, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_foundation_foundation_layout, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_compose_animation_animation, kotlin_org_jetbrains_compose_collection_internal_collection, kotlin_org_jetbrains_compose_runtime_runtime_saveable, kotlin_org_jetbrains_compose_ui_ui_text, kotlin_org_jetbrains_skiko_skiko) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var sign = Math.sign;
  var get_RectangleShape = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.n;
  var VOID = kotlin_kotlin.$_$.g;
  var get_NoInspectorInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.i3;
  var get_isDebugInspectorInfoEnabled = kotlin_org_jetbrains_compose_ui_ui.$_$.k3;
  var ModifierNodeElement = kotlin_org_jetbrains_compose_ui_ui.$_$.m2;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.e2;
  var protoOf = kotlin_kotlin.$_$.jb;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var Color__hashCode_impl_vjyivj = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.k1;
  var hashCode = kotlin_kotlin.$_$.ma;
  var getNumberHashCode = kotlin_kotlin.$_$.ja;
  var equals = kotlin_kotlin.$_$.ea;
  var classMeta = kotlin_kotlin.$_$.ba;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var ensureNotNull = kotlin_kotlin.$_$.vf;
  var drawOutline = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.v;
  var drawOutline_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w;
  var Node = kotlin_org_jetbrains_compose_ui_ui.$_$.o4;
  var onMeasureResultChanged = kotlin_org_jetbrains_compose_ui_ui.$_$.g2;
  var DrawModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.h2;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var drawBehind = kotlin_org_jetbrains_compose_ui_ui.$_$.c;
  var Spacer = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.b;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var _Constraints___get_maxWidth__impl__uuyqc = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s1;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v2;
  var toString = kotlin_kotlin.$_$.ob;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var _Constraints___get_maxHeight__impl__dt3e8z = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r1;
  var composed = kotlin_org_jetbrains_compose_ui_ui.$_$.s4;
  var Companion_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.n5;
  var inspectableWrapper = kotlin_org_jetbrains_compose_ui_ui.$_$.j3;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var Role = kotlin_org_jetbrains_compose_ui_ui.$_$.m3;
  var getBooleanHashCode = kotlin_kotlin.$_$.ha;
  var getStringHashCode = kotlin_kotlin.$_$.la;
  var Role__hashCode_impl_ucjza4 = kotlin_org_jetbrains_compose_ui_ui.$_$.z4;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var CoroutineImpl = kotlin_kotlin.$_$.o9;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var isInterface = kotlin_kotlin.$_$.xa;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.a9;
  var DelegatingNode = kotlin_org_jetbrains_compose_ui_ui.$_$.f2;
  var get_key = kotlin_org_jetbrains_compose_ui_ui.$_$.n;
  var Key = kotlin_org_jetbrains_compose_ui_ui.$_$.l;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q1;
  var interceptOutOfBoundsChildEvents = kotlin_org_jetbrains_compose_ui_ui.$_$.o2;
  var sharePointerInputWithSiblings = kotlin_org_jetbrains_compose_ui_ui.$_$.r2;
  var onDensityChange = kotlin_org_jetbrains_compose_ui_ui.$_$.p2;
  var onViewConfigurationChange = kotlin_org_jetbrains_compose_ui_ui.$_$.q2;
  var PointerInputModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.s2;
  var KeyInputModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.k;
  var set_role = kotlin_org_jetbrains_compose_ui_ui.$_$.c4;
  var onClick = kotlin_org_jetbrains_compose_ui_ui.$_$.y3;
  var onLongClick = kotlin_org_jetbrains_compose_ui_ui.$_$.z3;
  var disabled = kotlin_org_jetbrains_compose_ui_ui.$_$.r3;
  var get_shouldClearDescendantSemantics = kotlin_org_jetbrains_compose_ui_ui.$_$.t2;
  var SemanticsModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.v2;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var get_center = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u;
  var _IntOffset___get_x__impl__qiqr5o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b2;
  var _IntOffset___get_y__impl__2avpwj = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c2;
  var Offset_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var PointerInputScope = kotlin_org_jetbrains_compose_ui_ui.$_$.w;
  var SuspendingPointerInputModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.x;
  var get_providedValues = kotlin_org_jetbrains_compose_ui_ui.$_$.y1;
  var get_current = kotlin_org_jetbrains_compose_ui_ui.$_$.x1;
  var ModifierLocalModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.z1;
  var CompositionLocalConsumerModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.e2;
  var requestFocus = kotlin_org_jetbrains_compose_ui_ui.$_$.i;
  var coroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.f;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var delay = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.g;
  var cancelAndJoin = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.e1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var Rect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f;
  var Rectangle = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.j;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var clip = kotlin_org_jetbrains_compose_ui_ui.$_$.b;
  var get_LocalInputModeManager = kotlin_org_jetbrains_compose_ui_ui.$_$.f3;
  var currentValueOf = kotlin_org_jetbrains_compose_ui_ui.$_$.w2;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui.$_$.g5;
  var FocusPropertiesModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.f;
  var focusTarget = kotlin_org_jetbrains_compose_ui_ui.$_$.h;
  var invalidateSemantics = kotlin_org_jetbrains_compose_ui_ui.$_$.a3;
  var onRemeasured = kotlin_org_jetbrains_compose_ui_ui.$_$.j2;
  var get_shouldMergeDescendantSemantics = kotlin_org_jetbrains_compose_ui_ui.$_$.u2;
  var FocusEventModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.e;
  var LayoutAwareModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.k2;
  var GlobalPositionAwareModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.i2;
  var SemanticsConfiguration = kotlin_org_jetbrains_compose_ui_ui.$_$.o3;
  var set_focused = kotlin_org_jetbrains_compose_ui_ui.$_$.s3;
  var requestFocus_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.b4;
  var observeReads = kotlin_org_jetbrains_compose_ui_ui.$_$.b3;
  var get_LocalPinnableContainer = kotlin_org_jetbrains_compose_ui_ui.$_$.n1;
  var identityHashCode = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c1;
  var InspectableModifier = kotlin_org_jetbrains_compose_ui_ui.$_$.c3;
  var to = kotlin_kotlin.$_$.pg;
  var modifierLocalMapOf = kotlin_org_jetbrains_compose_ui_ui.$_$.c2;
  var modifierLocalOf = kotlin_org_jetbrains_compose_ui_ui.$_$.d2;
  var CoroutineStart_UNDISPATCHED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui.$_$.d5;
  var PointerEventPass_Main_getInstance = kotlin_org_jetbrains_compose_ui_ui.$_$.w4;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w1;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var foldIn = kotlin_org_jetbrains_compose_ui_ui.$_$.n4;
  var all = kotlin_org_jetbrains_compose_ui_ui.$_$.m4;
  var then = kotlin_org_jetbrains_compose_ui_ui.$_$.p4;
  var DrawModifier = kotlin_org_jetbrains_compose_ui_ui.$_$.a;
  var FlowCollector = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.s1;
  var Enum = kotlin_kotlin.$_$.re;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.c1;
  var Key_instance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var Mutex = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z;
  var captureStack = kotlin_kotlin.$_$.v9;
  var semantics = kotlin_org_jetbrains_compose_ui_ui.$_$.f4;
  var Companion_getInstance_5 = kotlin_org_jetbrains_compose_ui_ui.$_$.l5;
  var set_progressBarRangeInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.a4;
  var fillArrayVal = kotlin_kotlin.$_$.fa;
  var MutableVector = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a;
  var Companion_instance_0 = kotlin_kotlin.$_$.l4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.q2;
  var numberRangeToNumber = kotlin_kotlin.$_$.db;
  var println = kotlin_kotlin.$_$.r9;
  var cancel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.m1;
  var Companion_getInstance_6 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a3;
  var toSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.j1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.eg;
  var isArray = kotlin_kotlin.$_$.pa;
  var Offset__unaryMinus_impl_ssu2iv = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.w;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.x;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.y;
  var _IntSize___get_width__impl__d9yl4o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f2;
  var compareTo = kotlin_kotlin.$_$.ca;
  var _IntSize___get_height__impl__prv63b = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e2;
  var Key_instance_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p;
  var toString_0 = kotlin_kotlin.$_$.be;
  var get_job = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.p1;
  var CancellationException = kotlin_kotlin.$_$.z8;
  var printStackTrace = kotlin_kotlin.$_$.gg;
  var intercepted = kotlin_kotlin.$_$.c9;
  var get_MODE_CANCELLABLE = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i1;
  var CancellableContinuationImpl = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a1;
  var returnIfSuspended = kotlin_kotlin.$_$.k;
  var IntSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q;
  var Companion_getInstance_7 = kotlin_org_jetbrains_compose_ui_ui.$_$.f5;
  var Offset__getDistance_impl_pclvxn = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.r;
  var Offset__div_impl_eaxtg1 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.p;
  var Offset__times_impl_jz1mli = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.v;
  var Offset__minus_impl_hoj2c0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.t;
  var AwaitPointerEventScope = kotlin_org_jetbrains_compose_ui_ui.$_$.u;
  var changedToUpIgnoreConsumed = kotlin_org_jetbrains_compose_ui_ui.$_$.a1;
  var isOutOfBounds = kotlin_org_jetbrains_compose_ui_ui.$_$.c1;
  var PointerEventPass_Final_getInstance = kotlin_org_jetbrains_compose_ui_ui.$_$.u4;
  var PointerEventTimeoutCancellationException = kotlin_org_jetbrains_compose_ui_ui.$_$.v;
  var positionChangedIgnoreConsumed = kotlin_org_jetbrains_compose_ui_ui.$_$.i1;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y1;
  var interfaceMeta = kotlin_kotlin.$_$.oa;
  var positionChangeIgnoreConsumed = kotlin_org_jetbrains_compose_ui_ui.$_$.h1;
  var get_isActive = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o1;
  var get_LocalViewConfiguration = kotlin_org_jetbrains_compose_ui_ui.$_$.h3;
  var Velocity = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s;
  var Velocity__times_impl_yav0ik = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p2;
  var Velocity_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t;
  var Companion_getInstance_8 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c3;
  var VelocityTracker = kotlin_org_jetbrains_compose_ui_ui.$_$.s;
  var Factory_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var Channel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s;
  var addPointerInputChange = kotlin_org_jetbrains_compose_ui_ui.$_$.t;
  var positionChange = kotlin_org_jetbrains_compose_ui_ui.$_$.j1;
  var PointerEventPass_Initial_getInstance = kotlin_org_jetbrains_compose_ui_ui.$_$.v4;
  var Offset__plus_impl_c78cg0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.u;
  var get_isActive_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n1;
  var withFrameNanos = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x1;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.kg;
  var Offset__hashCode_impl_hbql41 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.s;
  var supervisorScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.h;
  var _ChannelResult___get_isSuccess__impl__odq1z9 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.m;
  var toList = kotlin_kotlin.$_$.bd;
  var sequence = kotlin_kotlin.$_$.ad;
  var get_LinearEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.g;
  var tween = kotlin_org_jetbrains_compose_animation_animation_core.$_$.v;
  var animateTo = kotlin_org_jetbrains_compose_animation_animation_core.$_$.x;
  var Companion_getInstance_9 = kotlin_org_jetbrains_compose_ui_ui.$_$.c5;
  var ChannelResult__getOrNull_impl_f5e07h = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.l;
  var SequenceScope = kotlin_kotlin.$_$.uc;
  var copy = kotlin_org_jetbrains_compose_animation_animation_core.$_$.p;
  var roundToInt = kotlin_kotlin.$_$.ub;
  var coerceAtMost = kotlin_kotlin.$_$.ec;
  var Long = kotlin_kotlin.$_$.we;
  var toLong = kotlin_kotlin.$_$.mb;
  var get_LocalDensity = kotlin_org_jetbrains_compose_ui_ui.$_$.d3;
  var AnimationState = kotlin_org_jetbrains_compose_animation_animation_core.$_$.c;
  var withTimeoutOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j;
  var spring = kotlin_org_jetbrains_compose_animation_animation_core.$_$.u;
  var animate = kotlin_org_jetbrains_compose_animation_animation_core.$_$.y;
  var LayoutDirection_Rtl_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l1;
  var animateDecay = kotlin_org_jetbrains_compose_animation_animation_core.$_$.w;
  var withContext = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.i;
  var splineBasedDecay = kotlin_org_jetbrains_compose_animation_animation.$_$.c;
  var NestedScrollDispatcher = kotlin_org_jetbrains_compose_ui_ui.$_$.q;
  var nestedScrollModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.r;
  var funFocusTargetModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.g;
  var Companion_getInstance_10 = kotlin_org_jetbrains_compose_ui_ui.$_$.a5;
  var get_isCtrlPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.m;
  var get_type = kotlin_org_jetbrains_compose_ui_ui.$_$.o;
  var Companion_getInstance_11 = kotlin_org_jetbrains_compose_ui_ui.$_$.b5;
  var Velocity__minus_impl_w0cg92 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n2;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var Offset__copy$default_impl_bmwjg8 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f1;
  var _Velocity___get_y__impl__239yhc = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r2;
  var _Velocity___get_x__impl__qqcikv = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q2;
  var Velocity__copy$default_impl_eql69u = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u2;
  var onPreFling = kotlin_org_jetbrains_compose_ui_ui.$_$.x4;
  var NestedScrollConnection = kotlin_org_jetbrains_compose_ui_ui.$_$.p;
  var modifierLocalMapOf_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.b2;
  var get_key_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.q4;
  var get = kotlin_kotlin.$_$.k9;
  var fold = kotlin_kotlin.$_$.j9;
  var minusKey = kotlin_kotlin.$_$.l9;
  var plus = kotlin_kotlin.$_$.n9;
  var MotionDurationScale = kotlin_org_jetbrains_compose_ui_ui.$_$.r4;
  var toPx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d;
  var toPx_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e;
  var roundToPx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c;
  var toDp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m;
  var toSize_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f;
  var Density = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.h;
  var isNaN_0 = kotlin_kotlin.$_$.ag;
  var changedToDownIgnoreConsumed = kotlin_org_jetbrains_compose_ui_ui.$_$.y;
  var changedToDown = kotlin_org_jetbrains_compose_ui_ui.$_$.z;
  var get_isPrimaryPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.d1;
  var changedToUp = kotlin_org_jetbrains_compose_ui_ui.$_$.b1;
  var AnimationVector1D = kotlin_org_jetbrains_compose_animation_animation_core.$_$.d;
  var AnimationConstants_getInstance = kotlin_org_jetbrains_compose_animation_animation_core.$_$.z;
  var roundToLong = kotlin_kotlin.$_$.vb;
  var Key_instance_1 = kotlin_org_jetbrains_compose_ui_ui.$_$.o5;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var get_VectorConverter = kotlin_org_jetbrains_compose_animation_animation_core.$_$.l;
  var LaunchedEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.n;
  var BufferOverflow_DROP_OLDEST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a;
  var MutableSharedFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.v;
  var PaddingValues = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.a;
  var createCompositionCoroutineScope = kotlin_org_jetbrains_compose_runtime_runtime.$_$.z;
  var CompositionScopedCoroutineScopeCanceller = kotlin_org_jetbrains_compose_runtime_runtime.$_$.n;
  var get_LocalLayoutDirection = kotlin_org_jetbrains_compose_ui_ui.$_$.g3;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.y3;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.m;
  var Constraints = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b;
  var constrainWidth = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x;
  var constrainHeight = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w;
  var emptyMap = kotlin_kotlin.$_$.n6;
  var calculateStartPadding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.d;
  var calculateEndPadding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.c;
  var offset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c1;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var IntOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n;
  var Companion_instance_1 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d2;
  var last = kotlin_kotlin.$_$.q7;
  var Dp__compareTo_impl_tlg3dl = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w1;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l;
  var Dp__hashCode_impl_sxkrra = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x1;
  var Arrangement_getInstance = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.n;
  var Constraints_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a;
  var LayoutDirection_Ltr_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.k1;
  var toIntArray = kotlin_kotlin.$_$.r8;
  var IntOffset__copy$default_impl_1y5pbb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t2;
  var compareValues = kotlin_kotlin.$_$.y8;
  var mutableScatterMapOf = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.j;
  var mutableScatterSetOf = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.k;
  var firstOrNull = kotlin_kotlin.$_$.s6;
  var get_BitmaskMsb = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.a;
  var IntOffset_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o;
  var sortWith = kotlin_kotlin.$_$.l8;
  var copyOf = kotlin_kotlin.$_$.j6;
  var rememberUpdatedState = kotlin_org_jetbrains_compose_runtime_runtime.$_$.m1;
  var referentialEqualityPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.k1;
  var derivedStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b1;
  var composableLambda = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c;
  var KProperty0 = kotlin_kotlin.$_$.rc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ka;
  var ArrayDeque_init_$Create$ = kotlin_kotlin.$_$.l;
  var coerceAtLeast = kotlin_kotlin.$_$.bc;
  var last_0 = kotlin_kotlin.$_$.t7;
  var abs = kotlin_kotlin.$_$.qb;
  var get_sign = kotlin_kotlin.$_$.xb;
  var firstOrNull_0 = kotlin_kotlin.$_$.u6;
  var lastOrNull = kotlin_kotlin.$_$.p7;
  var emptyList = kotlin_kotlin.$_$.m6;
  var get_lastIndex = kotlin_kotlin.$_$.l7;
  var numberToInt = kotlin_kotlin.$_$.fb;
  var _Constraints___get_minWidth__impl__hi9lfi = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u1;
  var _Constraints___get_minHeight__impl__ev4bgx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t1;
  var addAll = kotlin_kotlin.$_$.n5;
  var get_indices = kotlin_kotlin.$_$.e7;
  var reversed = kotlin_kotlin.$_$.lc;
  var first = kotlin_kotlin.$_$.v6;
  var IntSize_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p;
  var Companion_getInstance_12 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z2;
  var _Constraints___get_hasFixedHeight__impl__y56fxx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o1;
  var _Constraints___get_hasFixedWidth__impl__4p17wc = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p1;
  var mutableIntStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.g1;
  var KMutableProperty1 = kotlin_kotlin.$_$.qc;
  var binarySearch = kotlin_kotlin.$_$.u5;
  var listOf = kotlin_kotlin.$_$.v7;
  var listSaver = kotlin_org_jetbrains_compose_runtime_runtime_saveable.$_$.d;
  var RemeasurementModifier = kotlin_org_jetbrains_compose_ui_ui.$_$.s1;
  var neverEqualPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.j1;
  var Density_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g;
  var rememberSaveable = kotlin_org_jetbrains_compose_runtime_runtime_saveable.$_$.f;
  var KProperty1 = kotlin_kotlin.$_$.sc;
  var CollectionInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.l3;
  var SafeContinuation_init_$Create$ = kotlin_kotlin.$_$.f1;
  var OnGloballyPositionedModifier = kotlin_org_jetbrains_compose_ui_ui.$_$.q1;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.z1;
  var SubcomposeLayoutState = kotlin_org_jetbrains_compose_ui_ui.$_$.t1;
  var SubcomposeLayout = kotlin_org_jetbrains_compose_ui_ui.$_$.u1;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var SpringSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.h;
  var get_VectorConverter_0 = kotlin_org_jetbrains_compose_animation_animation_core.$_$.j;
  var Animatable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.b;
  var mutableFloatStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.f1;
  var ParentDataModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.n2;
  var Spring_instance = kotlin_org_jetbrains_compose_animation_animation_core.$_$.a1;
  var get_VisibilityThreshold = kotlin_org_jetbrains_compose_animation_animation_core.$_$.m;
  var Companion_getInstance_13 = kotlin_org_jetbrains_compose_ui_ui.$_$.i5;
  var get_ModifierLocalBeyondBoundsLayout = kotlin_org_jetbrains_compose_ui_ui.$_$.p1;
  var ModifierLocalProvider = kotlin_org_jetbrains_compose_ui_ui.$_$.a2;
  var Companion_getInstance_14 = kotlin_kotlin.$_$.g4;
  var composableLambdaInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b;
  var get_reuseKey = kotlin_org_jetbrains_compose_runtime_runtime.$_$.n1;
  var DisposableEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p;
  var MutableObjectIntMap = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.e;
  var emptyObjectIntMap = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.h;
  var get_lastIndex_0 = kotlin_kotlin.$_$.m7;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.q;
  var layout$default = kotlin_org_jetbrains_compose_ui_ui.$_$.y4;
  var MeasureScope = kotlin_org_jetbrains_compose_ui_ui.$_$.o1;
  var until = kotlin_kotlin.$_$.nc;
  var structuralEqualityPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t1;
  var State = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x;
  var SnapshotStateList = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e;
  var objectCreate = kotlin_kotlin.$_$.hb;
  var List = kotlin_kotlin.$_$.e5;
  var CompositionLocalProvider = kotlin_org_jetbrains_compose_runtime_runtime.$_$.l;
  var ScrollAxisRange = kotlin_org_jetbrains_compose_ui_ui.$_$.n3;
  var set_isTraversalGroup = kotlin_org_jetbrains_compose_ui_ui.$_$.x3;
  var indexForKey = kotlin_org_jetbrains_compose_ui_ui.$_$.v3;
  var set_horizontalScrollAxisRange = kotlin_org_jetbrains_compose_ui_ui.$_$.u3;
  var set_verticalScrollAxisRange = kotlin_org_jetbrains_compose_ui_ui.$_$.k4;
  var scrollBy = kotlin_org_jetbrains_compose_ui_ui.$_$.d4;
  var scrollToIndex = kotlin_org_jetbrains_compose_ui_ui.$_$.e4;
  var set_collectionInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.q3;
  var get_LocalSaveableStateRegistry = kotlin_org_jetbrains_compose_runtime_runtime_saveable.$_$.a;
  var SaveableStateRegistry = kotlin_org_jetbrains_compose_runtime_runtime_saveable.$_$.b;
  var Saver = kotlin_org_jetbrains_compose_runtime_runtime_saveable.$_$.c;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.z;
  var rememberSaveableStateHolder = kotlin_org_jetbrains_compose_runtime_runtime_saveable.$_$.e;
  var toRect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.m;
  var _Size___get_minDimension__impl__4iso0r = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c1;
  var CornerRadius = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a;
  var RoundRect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.g;
  var Rounded = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.k;
  var TextOverflow = kotlin_org_jetbrains_compose_ui_ui_text.$_$.g;
  var _TextOverflow___get_value__impl__vugm5i = kotlin_org_jetbrains_compose_ui_ui_text.$_$.u;
  var Companion_getInstance_15 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.e1;
  var Companion_getInstance_16 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.d1;
  var _Color___get_value__impl__1pls5m = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l1;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.j3;
  var graphicsLayer = kotlin_org_jetbrains_compose_ui_ui.$_$.j;
  var get_LocalFontFamilyResolver = kotlin_org_jetbrains_compose_ui_ui.$_$.e3;
  var AnnotatedString_init_$Create$ = kotlin_org_jetbrains_compose_ui_ui_text.$_$.q;
  var get_currentCompositeKeyHash = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a1;
  var materialize = kotlin_org_jetbrains_compose_ui_ui.$_$.t4;
  var Companion_getInstance_17 = kotlin_org_jetbrains_compose_ui_ui.$_$.j5;
  var invalidApplier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d1;
  var Applier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h;
  var _Updater___init__impl__rbfxm8 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a2;
  var Updater__set_impl_v7kwss = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c2;
  var _Updater___get_composer__impl__9ty7av = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b2;
  var TextRange = kotlin_org_jetbrains_compose_ui_ui_text.$_$.n;
  var charSequenceGet = kotlin_kotlin.$_$.y9;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.m2;
  var charSequenceLength = kotlin_kotlin.$_$.z9;
  var toRawBits = kotlin_kotlin.$_$.ng;
  var floatFromBits = kotlin_kotlin.$_$.ga;
  var _Constraints___get_hasBoundedWidth__impl__7hd0wr = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n1;
  var coerceIn = kotlin_kotlin.$_$.hc;
  var resolveDefaults = kotlin_org_jetbrains_compose_ui_ui_text.$_$.p;
  var Paragraph = kotlin_org_jetbrains_compose_ui_ui_text.$_$.l;
  var repeat = kotlin_kotlin.$_$.qd;
  var TextLayoutInput_init_$Create$ = kotlin_org_jetbrains_compose_ui_ui_text.$_$.r;
  var constrain = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z;
  var TextLayoutResult = kotlin_org_jetbrains_compose_ui_ui_text.$_$.m;
  var MultiParagraphIntrinsics = kotlin_org_jetbrains_compose_ui_ui_text.$_$.h;
  var MultiParagraph = kotlin_org_jetbrains_compose_ui_ui_text.$_$.i;
  var ParagraphIntrinsics = kotlin_org_jetbrains_compose_ui_ui_text.$_$.j;
  var Paragraph_0 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.k;
  var Constraints__copy$default_impl_f452rp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s2;
  var TextOverflow__hashCode_impl_kqdwgt = kotlin_org_jetbrains_compose_ui_ui_text.$_$.t;
  var invalidateMeasurement = kotlin_org_jetbrains_compose_ui_ui.$_$.z2;
  var LayoutModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.l2;
  var Companion_getInstance_18 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.d2;
  var RememberObserver = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t;
  var invalidateDraw = kotlin_org_jetbrains_compose_ui_ui.$_$.x2;
  var set_text = kotlin_org_jetbrains_compose_ui_ui.$_$.i4;
  var set_textSubstitution = kotlin_org_jetbrains_compose_ui_ui.$_$.j4;
  var set_isShowingTextSubstitution = kotlin_org_jetbrains_compose_ui_ui.$_$.w3;
  var setTextSubstitution = kotlin_org_jetbrains_compose_ui_ui.$_$.g4;
  var showTextSubstitution = kotlin_org_jetbrains_compose_ui_ui.$_$.h4;
  var clearTextSubstitution = kotlin_org_jetbrains_compose_ui_ui.$_$.p3;
  var getTextLayoutResult = kotlin_org_jetbrains_compose_ui_ui.$_$.t3;
  var invalidateLayer = kotlin_org_jetbrains_compose_ui_ui.$_$.y2;
  var get_FirstBaseline = kotlin_org_jetbrains_compose_ui_ui.$_$.k1;
  var get_LastBaseline = kotlin_org_jetbrains_compose_ui_ui.$_$.l1;
  var mapOf = kotlin_kotlin.$_$.x7;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var Rect_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.e;
  var Companion_getInstance_19 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.c1;
  var Companion_getInstance_20 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.h2;
  var Fill_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.a2;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.w;
  var TextRange_0 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.o;
  var LazyThreadSafetyMode_NONE_getInstance = kotlin_kotlin.$_$.i;
  var lazy = kotlin_kotlin.$_$.cg;
  var _TextRange___get_end__impl__gcdxpp = kotlin_org_jetbrains_compose_ui_ui_text.$_$.v;
  var _TextRange___get_start__impl__ww4t90 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.w;
  var THROW_ISE = kotlin_kotlin.$_$.ef;
  var getLocalDelegateReference = kotlin_kotlin.$_$.ia;
  var pointerInput = kotlin_org_jetbrains_compose_ui_ui.$_$.g1;
  var get_isShiftPressed = kotlin_org_jetbrains_compose_ui_ui.$_$.e1;
  var compositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.y;
  var CancellationException_init_$Init$ = kotlin_kotlin.$_$.b1;
  var rememberSplineBasedDecay = kotlin_org_jetbrains_compose_animation_animation.$_$.b;
  var SplineBasedFloatDecayAnimationSpec = kotlin_org_jetbrains_compose_animation_animation.$_$.a;
  var generateDecayAnimationSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.q;
  var Color_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.f;
  var LayoutCoordinates = kotlin_org_jetbrains_compose_ui_ui.$_$.m1;
  var pointerHoverIcon = kotlin_org_jetbrains_compose_ui_ui.$_$.f1;
  var Companion_getInstance_21 = kotlin_org_jetbrains_skiko_skiko.$_$.q3;
  var Companion_getInstance_22 = kotlin_org_jetbrains_compose_ui_ui.$_$.e5;
  //endregion
  //region block: pre-declaration
  setMetadataFor(BackgroundElement, 'BackgroundElement', classMeta, ModifierNodeElement);
  setMetadataFor(BackgroundNode, 'BackgroundNode', classMeta, Node, [DrawModifierNode, Node]);
  setMetadataFor(ClickableElement, 'ClickableElement', classMeta, ModifierNodeElement);
  setMetadataFor(AbstractClickableNode, 'AbstractClickableNode', classMeta, DelegatingNode, [DelegatingNode, PointerInputModifierNode, KeyInputModifierNode]);
  setMetadataFor(ClickableNode, 'ClickableNode', classMeta, AbstractClickableNode);
  setMetadataFor(InteractionData, 'InteractionData', classMeta, VOID, VOID, InteractionData);
  setMetadataFor(AbstractClickableNode$onKeyEvent$slambda, 'AbstractClickableNode$onKeyEvent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractClickableNode$onKeyEvent$slambda_1, 'AbstractClickableNode$onKeyEvent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ClickableSemanticsNode, 'ClickableSemanticsNode', classMeta, Node, [SemanticsModifierNode, Node]);
  setMetadataFor(ClickablePointerInputNode$pointerInput$slambda, 'ClickablePointerInputNode$pointerInput$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(AbstractClickablePointerInputNode, 'AbstractClickablePointerInputNode', classMeta, DelegatingNode, [DelegatingNode, ModifierLocalModifierNode, CompositionLocalConsumerModifierNode, PointerInputModifierNode], VOID, VOID, VOID, [0, 1]);
  setMetadataFor(ClickablePointerInputNode, 'ClickablePointerInputNode', classMeta, AbstractClickablePointerInputNode, VOID, VOID, VOID, VOID, [0, 1]);
  setMetadataFor(AbstractClickablePointerInputNode$pointerInputNode$slambda, 'AbstractClickablePointerInputNode$pointerInputNode$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($handlePressInteractionCOROUTINE$0, '$handlePressInteractionCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(handlePressInteraction$slambda$slambda, 'handlePressInteraction$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(handlePressInteraction$slambda, 'handlePressInteraction$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(HorizontalScrollableClipModifier$1, VOID, classMeta);
  setMetadataFor(VerticalScrollableClipModifier$1, VOID, classMeta);
  setMetadataFor(FocusableInNonTouchMode, 'FocusableInNonTouchMode', classMeta, Node, [Node, CompositionLocalConsumerModifierNode, FocusPropertiesModifierNode], FocusableInNonTouchMode);
  setMetadataFor(FocusableElement, 'FocusableElement', classMeta, ModifierNodeElement);
  setMetadataFor(FocusableNode$onFocusEvent$slambda, 'FocusableNode$onFocusEvent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(FocusableNode, 'FocusableNode', classMeta, DelegatingNode, [DelegatingNode, FocusEventModifierNode, LayoutAwareModifierNode, SemanticsModifierNode, GlobalPositionAwareModifierNode]);
  setMetadataFor(FocusableSemanticsNode, 'FocusableSemanticsNode', classMeta, Node, [Node, SemanticsModifierNode], FocusableSemanticsNode);
  setMetadataFor(FocusableInteractionNode$emitWithFallback$slambda, 'FocusableInteractionNode$emitWithFallback$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(FocusableInteractionNode, 'FocusableInteractionNode', classMeta, Node);
  setMetadataFor(FocusablePinnableContainerNode, 'FocusablePinnableContainerNode', classMeta, Node, [Node, CompositionLocalConsumerModifierNode], FocusablePinnableContainerNode);
  setMetadataFor(FocusableInNonTouchModeElement$1, VOID, classMeta, ModifierNodeElement);
  setMetadataFor(FocusedBoundsNode, 'FocusedBoundsNode', classMeta, Node, [Node, ModifierLocalModifierNode, GlobalPositionAwareModifierNode], FocusedBoundsNode);
  setMetadataFor(FocusedBoundsObserverNode, 'FocusedBoundsObserverNode', classMeta, Node, [Node, ModifierLocalModifierNode]);
  setMetadataFor(HoverableElement, 'HoverableElement', classMeta, ModifierNodeElement);
  setMetadataFor(HoverableNode$onPointerEvent$slambda, 'HoverableNode$onPointerEvent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(HoverableNode$onPointerEvent$slambda_1, 'HoverableNode$onPointerEvent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($emitEnterCOROUTINE$1, '$emitEnterCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor($emitExitCOROUTINE$2, '$emitExitCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor(HoverableNode, 'HoverableNode', classMeta, Node, [PointerInputModifierNode, Node], VOID, VOID, VOID, [0]);
  setMetadataFor(DefaultDebugIndicationInstance, 'DefaultDebugIndicationInstance', classMeta);
  setMetadataFor(DefaultDebugIndication, 'DefaultDebugIndication', objectMeta);
  setMetadataFor(TempInteractionSource, 'TempInteractionSource', classMeta);
  setMetadataFor(NoIndicationInstance, 'NoIndicationInstance', objectMeta);
  setMetadataFor(NoIndication, 'NoIndication', objectMeta);
  setMetadataFor(IndicationModifier, 'IndicationModifier', classMeta, VOID, [DrawModifier]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(indication$lambda$o$collect$slambda, 'indication$lambda$o$collect$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($collectCOROUTINE$3, '$collectCOROUTINE$3', classMeta, CoroutineImpl);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MutatePriority, 'MutatePriority', classMeta, Enum);
  setMetadataFor(Mutator, 'Mutator', classMeta);
  setMetadataFor(MutatorMutex$mutateWith$slambda, 'MutatorMutex$mutateWith$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MutatorMutex, 'MutatorMutex', classMeta, VOID, VOID, MutatorMutex, VOID, VOID, [2, 3]);
  setMetadataFor(PlatformOptimizedCancellationException, 'PlatformOptimizedCancellationException', classMeta, CancellationException);
  setMetadataFor(MutationInterruptedException, 'MutationInterruptedException', classMeta, PlatformOptimizedCancellationException, VOID, MutationInterruptedException);
  setMetadataFor(BringIntoViewRequestPriorityQueue, 'BringIntoViewRequestPriorityQueue', classMeta, VOID, VOID, BringIntoViewRequestPriorityQueue);
  setMetadataFor(ContentInViewNode$launchAnimation$slambda$slambda, 'ContentInViewNode$launchAnimation$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(Request, 'Request', classMeta);
  setMetadataFor(ContentInViewNode$launchAnimation$slambda, 'ContentInViewNode$launchAnimation$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($bringChildIntoViewCOROUTINE$4, '$bringChildIntoViewCOROUTINE$4', classMeta, CoroutineImpl);
  setMetadataFor(ContentInViewNode, 'ContentInViewNode', classMeta, Node, [Node, LayoutAwareModifierNode], VOID, VOID, VOID, [1]);
  setMetadataFor(HorizontalPointerDirectionConfig$1, VOID, classMeta);
  setMetadataFor(VerticalPointerDirectionConfig$1, VOID, classMeta);
  setMetadataFor(BidirectionalPointerDirectionConfig$1, VOID, classMeta);
  setMetadataFor(awaitLongPressOrCancellation$slambda, 'awaitLongPressOrCancellation$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($dragCOROUTINE$8, '$dragCOROUTINE$8', classMeta, CoroutineImpl);
  setMetadataFor($awaitLongPressOrCancellationCOROUTINE$9, '$awaitLongPressOrCancellationCOROUTINE$9', classMeta, CoroutineImpl);
  setMetadataFor($awaitDragOrCancellationCOROUTINE$10, '$awaitDragOrCancellationCOROUTINE$10', classMeta, CoroutineImpl);
  setMetadataFor(DragScope, 'DragScope', interfaceMeta);
  setMetadataFor(AbstractDragScope, 'AbstractDragScope', interfaceMeta);
  setMetadataFor(DraggableNode$abstractDragScope$1, VOID, classMeta, VOID, [AbstractDragScope]);
  setMetadataFor(DraggableNode$drag$slambda, 'DraggableNode$drag$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractDraggableNode, 'AbstractDraggableNode', classMeta, DelegatingNode, [DelegatingNode, PointerInputModifierNode, CompositionLocalConsumerModifierNode], VOID, VOID, VOID, [1, 0]);
  setMetadataFor(DraggableNode, 'DraggableNode', classMeta, AbstractDraggableNode, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractDraggableNode$startListeningForEvents$slambda$slambda, 'AbstractDraggableNode$startListeningForEvents$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda, 'AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractDraggableNode$pointerInputNode$slambda$slambda, 'AbstractDraggableNode$pointerInputNode$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractDraggableNode$startListeningForEvents$slambda, 'AbstractDraggableNode$startListeningForEvents$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractDraggableNode$pointerInputNode$slambda, 'AbstractDraggableNode$pointerInputNode$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($processDragStartCOROUTINE$11, '$processDragStartCOROUTINE$11', classMeta, CoroutineImpl);
  setMetadataFor($processDragStopCOROUTINE$12, '$processDragStopCOROUTINE$12', classMeta, CoroutineImpl);
  setMetadataFor($processDragCancelCOROUTINE$13, '$processDragCancelCOROUTINE$13', classMeta, CoroutineImpl);
  setMetadataFor(DragEvent, 'DragEvent', classMeta);
  setMetadataFor(DragStarted, 'DragStarted', classMeta, DragEvent);
  setMetadataFor(DragStopped, 'DragStopped', classMeta, DragEvent);
  setMetadataFor(DragCancelled, 'DragCancelled', objectMeta, DragEvent);
  setMetadataFor(DragDelta, 'DragDelta', classMeta, DragEvent);
  setMetadataFor(NoOpDragScope$1, VOID, classMeta, VOID, [DragScope]);
  setMetadataFor($awaitDownAndSlopCOROUTINE$14, '$awaitDownAndSlopCOROUTINE$14', classMeta, CoroutineImpl);
  setMetadataFor($onDragOrUpCOROUTINE$15, '$onDragOrUpCOROUTINE$15', classMeta, CoroutineImpl);
  setMetadataFor(awaitEachGesture$slambda, 'awaitEachGesture$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($awaitAllPointersUpCOROUTINE$16, '$awaitAllPointersUpCOROUTINE$16', classMeta, CoroutineImpl);
  setMetadataFor(MouseWheelScrollNode$busyReceive$slambda$slambda, 'MouseWheelScrollNode$busyReceive$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollDelta, 'MouseWheelScrollDelta', classMeta);
  setMetadataFor(MouseWheelScrollNode$onAttach$slambda, 'MouseWheelScrollNode$onAttach$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$pointerInputNode$slambda, 'MouseWheelScrollNode$pointerInputNode$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$mouseWheelInput$slambda, 'MouseWheelScrollNode$mouseWheelInput$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$userScroll$slambda, 'MouseWheelScrollNode$userScroll$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$busyReceive$slambda, 'MouseWheelScrollNode$busyReceive$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$untilNull$slambda, 'MouseWheelScrollNode$untilNull$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$dispatchMouseWheelScroll$slambda, 'MouseWheelScrollNode$dispatchMouseWheelScroll$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda, 'MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($awaitScrollEventCOROUTINE$17, '$awaitScrollEventCOROUTINE$17', classMeta, CoroutineImpl);
  setMetadataFor($receiveMouseWheelEventsCOROUTINE$18, '$receiveMouseWheelEventsCOROUTINE$18', classMeta, CoroutineImpl);
  setMetadataFor($dispatchMouseWheelScrollCOROUTINE$19, '$dispatchMouseWheelScrollCOROUTINE$19', classMeta, CoroutineImpl);
  setMetadataFor($dispatchMouseWheelScroll$waitNextScrollDeltaCOROUTINE$20, '$dispatchMouseWheelScroll$waitNextScrollDeltaCOROUTINE$20', classMeta, CoroutineImpl);
  setMetadataFor(MouseWheelScrollNode, 'MouseWheelScrollNode', classMeta, DelegatingNode, [DelegatingNode, CompositionLocalConsumerModifierNode], VOID, VOID, VOID, [0, 1, 3, 4, 6]);
  setMetadataFor(Orientation, 'Orientation', classMeta, Enum);
  setMetadataFor(animateScrollBy$slambda, 'animateScrollBy$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($animateScrollByCOROUTINE$21, '$animateScrollByCOROUTINE$21', classMeta, CoroutineImpl);
  setMetadataFor(ScrollableDefaults, 'ScrollableDefaults', objectMeta);
  function get_scrollAnimationSpec() {
    return Companion_getInstance_23().a9d_1;
  }
  setMetadataFor(BringIntoViewSpec, 'BringIntoViewSpec', interfaceMeta);
  setMetadataFor(BringIntoViewSpec$Companion$DefaultBringIntoViewSpec$1, VOID, classMeta, VOID, [BringIntoViewSpec]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(DefaultFlingBehavior$performFling$slambda, 'DefaultFlingBehavior$performFling$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  function updateDensity(density) {
    return Unit_instance;
  }
  setMetadataFor(ScrollableDefaultFlingBehavior, 'ScrollableDefaultFlingBehavior', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(DefaultFlingBehavior, 'DefaultFlingBehavior', classMeta, VOID, [ScrollableDefaultFlingBehavior], VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollableElement, 'ScrollableElement', classMeta, ModifierNodeElement);
  setMetadataFor(ScrollableNode$onDragStopped$slambda$slambda, 'ScrollableNode$onDragStopped$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollableNode$onWheelScrollStopped$slambda$slambda, 'ScrollableNode$onWheelScrollStopped$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollableNode$onKeyEvent$slambda$slambda, 'ScrollableNode$onKeyEvent$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollableNode$onDragStopped$slambda, 'ScrollableNode$onDragStopped$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(ScrollableNode$onWheelScrollStopped$slambda, 'ScrollableNode$onWheelScrollStopped$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(ScrollableNode$onKeyEvent$slambda, 'ScrollableNode$onKeyEvent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollableNode, 'ScrollableNode', classMeta, DelegatingNode, [DelegatingNode, CompositionLocalConsumerModifierNode, FocusPropertiesModifierNode, KeyInputModifierNode]);
  setMetadataFor(ScrollingLogic$onScrollStopped$slambda$slambda, 'ScrollingLogic$onScrollStopped$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollingLogic$onScrollStopped$slambda, 'ScrollingLogic$onScrollStopped$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollScope, 'ScrollScope', interfaceMeta);
  setMetadataFor(ScrollingLogic$doFlingAnimation$scope$1, VOID, classMeta, VOID, [ScrollScope]);
  setMetadataFor($onScrollStoppedCOROUTINE$22, '$onScrollStoppedCOROUTINE$22', classMeta, CoroutineImpl);
  setMetadataFor($doFlingAnimationCOROUTINE$23, '$doFlingAnimationCOROUTINE$23', classMeta, CoroutineImpl);
  setMetadataFor(ScrollingLogic, 'ScrollingLogic', classMeta, VOID, VOID, VOID, VOID, VOID, [2, 1]);
  setMetadataFor(ScrollableNestedScrollConnection$onPostFling$slambda, 'ScrollableNestedScrollConnection$onPostFling$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($onPostFlingCOROUTINE$24, '$onPostFlingCOROUTINE$24', classMeta, CoroutineImpl);
  setMetadataFor(ScrollableNestedScrollConnection, 'ScrollableNestedScrollConnection', classMeta, VOID, [NestedScrollConnection], VOID, VOID, VOID, [2, 1]);
  setMetadataFor(ModifierLocalScrollableContainerProvider, 'ModifierLocalScrollableContainerProvider', classMeta, Node, [ModifierLocalModifierNode, Node]);
  setMetadataFor(ScrollDraggableState$drag$slambda, 'ScrollDraggableState$drag$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ScrollDraggableState, 'ScrollDraggableState', classMeta, VOID, [DragScope], VOID, VOID, VOID, [2]);
  function get_isSmoothScrollingEnabled() {
    return true;
  }
  function isPreciseWheelScroll(event) {
    return false;
  }
  setMetadataFor(ScrollConfig, 'ScrollConfig', interfaceMeta);
  setMetadataFor(NoOpOnDragStarted$slambda, 'NoOpOnDragStarted$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(NoOpScrollScope$1, VOID, classMeta, VOID, [ScrollScope]);
  setMetadataFor(NoOpFlingBehavior$1, VOID, classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(DefaultScrollMotionDurationScale$1, VOID, classMeta, VOID, [MotionDurationScale]);
  setMetadataFor(UnityDensity$1, VOID, classMeta, VOID, [Density]);
  function scroll$default(scrollPriority, block, $completion, $super) {
    scrollPriority = scrollPriority === VOID ? MutatePriority_Default_getInstance() : scrollPriority;
    return $super === VOID ? this.o99(scrollPriority, block, $completion) : $super.o99.call(this, scrollPriority, block, $completion);
  }
  function get_canScrollForward() {
    return true;
  }
  function get_canScrollBackward() {
    return true;
  }
  setMetadataFor(ScrollableState, 'ScrollableState', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(DefaultScrollableState$scroll$slambda$slambda, 'DefaultScrollableState$scroll$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(DefaultScrollableState$scrollScope$1, VOID, classMeta, VOID, [ScrollScope]);
  setMetadataFor(DefaultScrollableState$scroll$slambda, 'DefaultScrollableState$scroll$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(DefaultScrollableState, 'DefaultScrollableState', classMeta, VOID, [ScrollableState], VOID, VOID, VOID, [2]);
  setMetadataFor(PressGestureScope, 'PressGestureScope', interfaceMeta, VOID, [Density], VOID, VOID, VOID, [0]);
  setMetadataFor($resetCOROUTINE$25, '$resetCOROUTINE$25', classMeta, CoroutineImpl);
  setMetadataFor($tryAwaitReleaseCOROUTINE$27, '$tryAwaitReleaseCOROUTINE$27', classMeta, CoroutineImpl);
  setMetadataFor(PressGestureScopeImpl, 'PressGestureScopeImpl', classMeta, VOID, [PressGestureScope, Density], VOID, VOID, VOID, [0]);
  setMetadataFor(NoPressGesture$slambda, 'NoPressGesture$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(detectTapAndPress$slambda$slambda$slambda, 'detectTapAndPress$slambda$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(detectTapAndPress$slambda$slambda$slambda_1, 'detectTapAndPress$slambda$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(detectTapAndPress$slambda$slambda$slambda_3, 'detectTapAndPress$slambda$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(detectTapAndPress$slambda$slambda$slambda_5, 'detectTapAndPress$slambda$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(detectTapAndPress$slambda$slambda, 'detectTapAndPress$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(detectTapAndPress$slambda, 'detectTapAndPress$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($awaitFirstDownCOROUTINE$28, '$awaitFirstDownCOROUTINE$28', classMeta, CoroutineImpl);
  setMetadataFor($waitForUpOrCancellationCOROUTINE$29, '$waitForUpOrCancellationCOROUTINE$29', classMeta, CoroutineImpl);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor($animateToZeroCOROUTINE$30, '$animateToZeroCOROUTINE$30', classMeta, CoroutineImpl);
  setMetadataFor(UpdatableAnimationState, 'UpdatableAnimationState', classMeta, VOID, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(Interaction, 'Interaction', interfaceMeta);
  setMetadataFor(Start, 'Start', classMeta, VOID, [Interaction], Start);
  setMetadataFor(Stop, 'Stop', classMeta, VOID, [Interaction]);
  setMetadataFor(Cancel, 'Cancel', classMeta, VOID, [Interaction]);
  setMetadataFor(Focus, 'Focus', classMeta, VOID, [Interaction], Focus);
  setMetadataFor(Unfocus, 'Unfocus', classMeta, VOID, [Interaction]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0_0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsFocusedAsState$slambda$slambda, 'collectIsFocusedAsState$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsFocusedAsState$slambda, 'collectIsFocusedAsState$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(Enter, 'Enter', classMeta, VOID, [Interaction], Enter);
  setMetadataFor(Exit, 'Exit', classMeta, VOID, [Interaction]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0_1, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsHoveredAsState$slambda$slambda, 'collectIsHoveredAsState$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsHoveredAsState$slambda, 'collectIsHoveredAsState$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MutableInteractionSourceImpl, 'MutableInteractionSourceImpl', classMeta, VOID, VOID, MutableInteractionSourceImpl, VOID, VOID, [1]);
  setMetadataFor(Press, 'Press', classMeta, VOID, [Interaction]);
  setMetadataFor(Release, 'Release', classMeta, VOID, [Interaction]);
  setMetadataFor(Cancel_0, 'Cancel', classMeta, VOID, [Interaction]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0_2, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsPressedAsState$slambda$slambda, 'collectIsPressedAsState$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(collectIsPressedAsState$slambda, 'collectIsPressedAsState$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(LazyGridSlots, 'LazyGridSlots', classMeta);
  setMetadataFor(LazyGridMeasuredItemProvider, 'LazyGridMeasuredItemProvider', classMeta);
  setMetadataFor(rememberLazyGridMeasurePolicy$1$1$measuredItemProvider$1, VOID, classMeta, LazyGridMeasuredItemProvider);
  setMetadataFor(LazyGridMeasuredLineProvider, 'LazyGridMeasuredLineProvider', classMeta);
  setMetadataFor(rememberLazyGridMeasurePolicy$1$1$measuredLineProvider$1, VOID, classMeta, LazyGridMeasuredLineProvider);
  setMetadataFor(LazyGridAnimateScrollScope, 'LazyGridAnimateScrollScope', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(LazyGridBeyondBoundsState, 'LazyGridBeyondBoundsState', classMeta);
  setMetadataFor(Adaptive, 'Adaptive', classMeta);
  setMetadataFor(GridSlotCache, 'GridSlotCache', classMeta);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(LazyLayoutIntervalContent, 'LazyLayoutIntervalContent', classMeta);
  setMetadataFor(LazyGridIntervalContent, 'LazyGridIntervalContent', classMeta, LazyLayoutIntervalContent);
  function get_key_1() {
    return null;
  }
  function get_type_0() {
    return LazyLayoutIntervalContent$Interval$_get_type_$lambda_1wu10p;
  }
  setMetadataFor(Interval_1, 'Interval', interfaceMeta);
  setMetadataFor(LazyGridInterval, 'LazyGridInterval', classMeta, VOID, [Interval_1]);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', classMeta);
  setMetadataFor(LazyGridItemPlacementAnimator, 'LazyGridItemPlacementAnimator', classMeta, VOID, VOID, LazyGridItemPlacementAnimator);
  setMetadataFor(ItemInfo, 'ItemInfo', classMeta);
  function getContentType(index) {
    return null;
  }
  function getKey(index) {
    return getDefaultLazyLayoutKey(index);
  }
  function getIndex(key) {
    return -1;
  }
  setMetadataFor(LazyLayoutItemProvider, 'LazyLayoutItemProvider', interfaceMeta);
  setMetadataFor(LazyGridItemProviderImpl, 'LazyGridItemProviderImpl', classMeta, VOID, [LazyLayoutItemProvider]);
  setMetadataFor(LazyGridItemScopeImpl, 'LazyGridItemScopeImpl', objectMeta);
  setMetadataFor(LazyGridMeasureResult, 'LazyGridMeasureResult', classMeta);
  setMetadataFor(LazyGridMeasuredItem, 'LazyGridMeasuredItem', classMeta);
  setMetadataFor(LazyGridMeasuredLine, 'LazyGridMeasuredLine', classMeta);
  setMetadataFor(LazyGridScrollPosition, 'LazyGridScrollPosition', classMeta, VOID, VOID, LazyGridScrollPosition);
  setMetadataFor(GridItemSpan, 'GridItemSpan', classMeta);
  setMetadataFor(LineConfiguration, 'LineConfiguration', classMeta);
  setMetadataFor(Bucket, 'Bucket', classMeta);
  setMetadataFor(LazyGridItemSpanScopeImpl, 'LazyGridItemSpanScopeImpl', objectMeta);
  setMetadataFor(LazyGridSpanLayoutProvider, 'LazyGridSpanLayoutProvider', classMeta);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(LazyGridState$remeasurementModifier$1, VOID, classMeta, VOID, [RemeasurementModifier]);
  setMetadataFor(LazyGridState$scrollToItem$slambda, 'LazyGridState$scrollToItem$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($scrollCOROUTINE$31, '$scrollCOROUTINE$31', classMeta, CoroutineImpl);
  setMetadataFor(LazyGridState, 'LazyGridState', classMeta, VOID, [ScrollableState], LazyGridState, VOID, VOID, [2]);
  setMetadataFor(EmptyLazyGridLayoutInfo$1, VOID, classMeta);
  setMetadataFor($animateScrollByCOROUTINE$32, '$animateScrollByCOROUTINE$32', classMeta, CoroutineImpl);
  function pseudoScrollOffset() {
    return this.ya0() + imul(this.va0(), 500) | 0;
  }
  function pseudoMaxScrollOffset() {
    var tmp;
    if (this.o96()) {
      tmp = this.oa9() + 100;
    } else {
      tmp = this.oa9();
    }
    return tmp;
  }
  setMetadataFor(LazyLayoutSemanticState, 'LazyLayoutSemanticState', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(rememberLazyGridSemanticState$1$1, VOID, classMeta, VOID, [LazyLayoutSemanticState], VOID, VOID, VOID, [1]);
  setMetadataFor($waitForFirstLayoutCOROUTINE$33, '$waitForFirstLayoutCOROUTINE$33', classMeta, CoroutineImpl);
  setMetadataFor(AwaitFirstLayoutModifier, 'AwaitFirstLayoutModifier', classMeta, VOID, [OnGloballyPositionedModifier], AwaitFirstLayoutModifier, VOID, VOID, [0]);
  setMetadataFor(Interval, 'Interval', classMeta);
  setMetadataFor(MutableIntervalList, 'MutableIntervalList', classMeta, VOID, VOID, MutableIntervalList);
  setMetadataFor(LazyLayoutItemReusePolicy, 'LazyLayoutItemReusePolicy', classMeta);
  setMetadataFor(Companion_4, 'Companion', objectMeta);
  setMetadataFor(LazyLayoutAnimation$cancelPlacementAnimation$slambda, 'LazyLayoutAnimation$cancelPlacementAnimation$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(LazyLayoutAnimation$animatePlacementDelta$slambda, 'LazyLayoutAnimation$animatePlacementDelta$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(LazyLayoutAnimation$stopAnimations$slambda, 'LazyLayoutAnimation$stopAnimations$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(LazyLayoutAnimation$stopAnimations$slambda_1, 'LazyLayoutAnimation$stopAnimations$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(LazyLayoutAnimation, 'LazyLayoutAnimation', classMeta);
  setMetadataFor(LazyLayoutAnimationSpecsNode, 'LazyLayoutAnimationSpecsNode', classMeta, Node, [Node, ParentDataModifierNode]);
  setMetadataFor(Interval_0, 'Interval', classMeta);
  setMetadataFor(LazyLayoutBeyondBoundsInfo, 'LazyLayoutBeyondBoundsInfo', classMeta, VOID, VOID, LazyLayoutBeyondBoundsInfo);
  setMetadataFor(LazyLayoutBeyondBoundsModifierLocal$Companion$emptyBeyondBoundsScope$1, VOID, classMeta);
  setMetadataFor(Companion_5, 'Companion', objectMeta);
  setMetadataFor(LazyLayoutBeyondBoundsModifierLocal$layout$2, VOID, classMeta);
  setMetadataFor(LazyLayoutBeyondBoundsModifierLocal, 'LazyLayoutBeyondBoundsModifierLocal', classMeta, VOID, [ModifierLocalProvider]);
  setMetadataFor(_no_name_provided__qut3iv_0, VOID, classMeta);
  setMetadataFor(CachedItemContent, 'CachedItemContent', classMeta);
  setMetadataFor(LazyLayoutItemContentFactory, 'LazyLayoutItemContentFactory', classMeta);
  setMetadataFor(Empty, 'Empty', objectMeta);
  setMetadataFor(NearestRangeKeyIndexMap, 'NearestRangeKeyIndexMap', classMeta);
  setMetadataFor(LazyLayoutMeasureScopeImpl, 'LazyLayoutMeasureScopeImpl', classMeta, VOID, [MeasureScope]);
  setMetadataFor(Companion_6, 'Companion', objectMeta);
  setMetadataFor(LazyLayoutNearestRangeState, 'LazyLayoutNearestRangeState', classMeta, VOID, [State]);
  setMetadataFor(PinnedItem, 'PinnedItem', interfaceMeta);
  setMetadataFor(LazyLayoutPinnedItemList, 'LazyLayoutPinnedItemList', classMeta, VOID, [List], LazyLayoutPinnedItemList_init_$Create$);
  setMetadataFor(LazyLayoutPinnableItem_0, 'LazyLayoutPinnableItem', classMeta, VOID, [PinnedItem]);
  setMetadataFor(_no_name_provided__qut3iv_1, VOID, classMeta);
  setMetadataFor(LazyLayoutPrefetchState, 'LazyLayoutPrefetchState', classMeta, VOID, VOID, LazyLayoutPrefetchState);
  setMetadataFor(DummyHandle, 'DummyHandle', objectMeta);
  setMetadataFor(lazyLayoutSemantics$lambda$slambda, 'lazyLayoutSemantics$lambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(lazyLayoutSemantics$lambda$slambda_1, 'lazyLayoutSemantics$lambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(Companion_7, 'Companion', objectMeta);
  setMetadataFor(_no_name_provided__qut3iv_2, VOID, classMeta);
  setMetadataFor(LazySaveableStateHolder, 'LazySaveableStateHolder', classMeta);
  setMetadataFor(BringIntoViewChildNode, 'BringIntoViewChildNode', classMeta, Node, [Node, ModifierLocalModifierNode, LayoutAwareModifierNode, CompositionLocalConsumerModifierNode]);
  function bringIntoView$default(rect, $completion, $super) {
    rect = rect === VOID ? null : rect;
    return $super === VOID ? this.daf(rect, $completion) : $super.daf.call(this, rect, $completion);
  }
  setMetadataFor(BringIntoViewRequester, 'BringIntoViewRequester', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(BringIntoViewRequesterNode, 'BringIntoViewRequesterNode', classMeta, BringIntoViewChildNode, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($bringIntoViewCOROUTINE$35, '$bringIntoViewCOROUTINE$35', classMeta, CoroutineImpl);
  setMetadataFor(BringIntoViewRequesterImpl, 'BringIntoViewRequesterImpl', classMeta, VOID, [BringIntoViewRequester], BringIntoViewRequesterImpl, VOID, VOID, [1]);
  setMetadataFor(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda, 'BringIntoViewResponderNode$bringChildIntoView$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1, 'BringIntoViewResponderNode$bringChildIntoView$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(BringIntoViewResponderNode$bringChildIntoView$slambda, 'BringIntoViewResponderNode$bringChildIntoView$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($bringChildIntoViewCOROUTINE$36, '$bringChildIntoViewCOROUTINE$36', classMeta, CoroutineImpl);
  setMetadataFor(BringIntoViewResponderNode, 'BringIntoViewResponderNode', classMeta, BringIntoViewChildNode, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(CornerBasedShape, 'CornerBasedShape', classMeta);
  setMetadataFor(PercentCornerSize, 'PercentCornerSize', classMeta);
  setMetadataFor(DpCornerSize, 'DpCornerSize', classMeta);
  setMetadataFor(ZeroCornerSize$1, VOID, classMeta);
  setMetadataFor(RoundedCornerShape, 'RoundedCornerShape', classMeta, CornerBasedShape);
  setMetadataFor(EmptyMeasurePolicy, 'EmptyMeasurePolicy', objectMeta);
  setMetadataFor(Companion_8, 'Companion', objectMeta);
  setMetadataFor(InlineDensity, 'InlineDensity', classMeta);
  setMetadataFor(Companion_9, 'Companion', objectMeta);
  setMetadataFor(MinLinesConstrainer, 'MinLinesConstrainer', classMeta);
  setMetadataFor(MultiParagraphLayoutCache, 'MultiParagraphLayoutCache', classMeta);
  setMetadataFor(ParagraphLayoutCache, 'ParagraphLayoutCache', classMeta);
  setMetadataFor(SelectableTextAnnotatedStringElement, 'SelectableTextAnnotatedStringElement', classMeta, ModifierNodeElement);
  setMetadataFor(SelectableTextAnnotatedStringNode, 'SelectableTextAnnotatedStringNode', classMeta, DelegatingNode, [DelegatingNode, LayoutModifierNode, DrawModifierNode, GlobalPositionAwareModifierNode]);
  setMetadataFor(SelectionController, 'SelectionController', classMeta, VOID, [RememberObserver]);
  setMetadataFor(Companion_10, 'Companion', objectMeta);
  setMetadataFor(StaticTextSelectionParams, 'StaticTextSelectionParams', classMeta);
  setMetadataFor(makeDefaultSelectionModifier$longPressDragObserver$1, VOID, classMeta);
  setMetadataFor(makeDefaultSelectionModifier$mouseSelectionObserver$1, VOID, classMeta);
  setMetadataFor(TextAnnotatedStringElement, 'TextAnnotatedStringElement', classMeta, ModifierNodeElement);
  setMetadataFor(TextSubstitutionValue, 'TextSubstitutionValue', classMeta);
  setMetadataFor(TextAnnotatedStringNode, 'TextAnnotatedStringNode', classMeta, Node, [Node, LayoutModifierNode, DrawModifierNode, SemanticsModifierNode]);
  setMetadataFor(TextStringSimpleElement, 'TextStringSimpleElement', classMeta, ModifierNodeElement);
  setMetadataFor(TextSubstitutionValue_0, 'TextSubstitutionValue', classMeta);
  setMetadataFor(TextStringSimpleNode, 'TextStringSimpleNode', classMeta, Node, [Node, LayoutModifierNode, DrawModifierNode, SemanticsModifierNode]);
  setMetadataFor(MultiWidgetSelectionDelegate, 'MultiWidgetSelectionDelegate', classMeta);
  setMetadataFor(AnchorInfo, 'AnchorInfo', classMeta);
  setMetadataFor(Selection, 'Selection', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0, 'sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_0, 'sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_BoundaryFunction$0, 'sam$androidx_compose_foundation_text_selection_BoundaryFunction$0', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_1, 'sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_BoundaryFunction$0_0, 'sam$androidx_compose_foundation_text_selection_BoundaryFunction$0', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_2, 'sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_3, 'sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0', classMeta);
  setMetadataFor(Companion_11, 'Companion', objectMeta);
  setMetadataFor(ClicksCounter, 'ClicksCounter', classMeta);
  setMetadataFor(selectionGestureInput$lambda$slambda$slambda, 'selectionGestureInput$lambda$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(selectionGestureInput$lambda$slambda, 'selectionGestureInput$lambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($awaitDownCOROUTINE$37, '$awaitDownCOROUTINE$37', classMeta, CoroutineImpl);
  setMetadataFor($mouseSelectionCOROUTINE$38, '$mouseSelectionCOROUTINE$38', classMeta, CoroutineImpl);
  setMetadataFor($touchSelectionCOROUTINE$39, '$touchSelectionCOROUTINE$39', classMeta, CoroutineImpl);
  setMetadataFor(CrossStatus, 'CrossStatus', classMeta, Enum);
  setMetadataFor(TextSelectionColors, 'TextSelectionColors', classMeta);
  setMetadataFor($applyToFlingCOROUTINE$40, '$applyToFlingCOROUTINE$40', classMeta, CoroutineImpl);
  setMetadataFor(JSOverscrollEffect, 'JSOverscrollEffect', classMeta, VOID, VOID, JSOverscrollEffect, VOID, VOID, [2]);
  setMetadataFor(JsConfig, 'JsConfig', objectMeta, VOID, [ScrollConfig]);
  setMetadataFor(DefaultLazyKey, 'DefaultLazyKey', classMeta);
  setMetadataFor(AtomicReference, 'AtomicReference', classMeta);
  setMetadataFor(sam$androidx_compose_foundation_relocation_BringIntoViewParent$0, 'sam$androidx_compose_foundation_relocation_BringIntoViewParent$0', classMeta, VOID, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor(defaultBringIntoViewParent$slambda, 'defaultBringIntoViewParent$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  //endregion
  function background(_this__u8e3s4, color, shape) {
    shape = shape === VOID ? get_RectangleShape() : shape;
    var alpha = 1.0;
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = background$lambda(color, shape);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp0_inspectorInfo = tmp;
    return _this__u8e3s4.q4t(new BackgroundElement(color, VOID, alpha, shape, tmp0_inspectorInfo));
  }
  function background_0(_this__u8e3s4, brush, shape, alpha) {
    shape = shape === VOID ? get_RectangleShape() : shape;
    alpha = alpha === VOID ? 1.0 : alpha;
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = background$lambda_0(alpha, brush, shape);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp$ret$0 = tmp;
    return _this__u8e3s4.q4t(new BackgroundElement(VOID, brush, alpha, shape, tmp$ret$0));
  }
  function BackgroundElement(color, brush, alpha, shape, inspectorInfo) {
    color = color === VOID ? Companion_getInstance().n3r_1 : color;
    brush = brush === VOID ? null : brush;
    ModifierNodeElement.call(this);
    this.r82_1 = color;
    this.s82_1 = brush;
    this.t82_1 = alpha;
    this.u82_1 = shape;
    this.v82_1 = inspectorInfo;
  }
  protoOf(BackgroundElement).g25 = function () {
    return new BackgroundNode(this.r82_1, this.s82_1, this.t82_1, this.u82_1);
  };
  protoOf(BackgroundElement).w82 = function (node) {
    node.k83_1 = this.r82_1;
    node.l83_1 = this.s82_1;
    node.m83_1 = this.t82_1;
    node.n83_1 = this.u82_1;
  };
  protoOf(BackgroundElement).t4v = function (node) {
    return this.w82(node instanceof BackgroundNode ? node : THROW_CCE());
  };
  protoOf(BackgroundElement).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.r82_1);
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.s82_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + getNumberHashCode(this.t82_1) | 0;
    result = imul(31, result) + hashCode(this.u82_1) | 0;
    return result;
  };
  protoOf(BackgroundElement).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof BackgroundElement ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var otherModifier = tmp;
    return ((equals(this.r82_1, otherModifier.r82_1) ? equals(this.s82_1, otherModifier.s82_1) : false) ? this.t82_1 === otherModifier.t82_1 : false) ? equals(this.u82_1, otherModifier.u82_1) : false;
  };
  function drawRect(_this__u8e3s4, $this) {
    if (!equals($this.k83_1, Companion_getInstance().n3r_1)) {
      _this__u8e3s4.d43($this.k83_1);
    }
    var tmp0_safe_receiver = $this.l83_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      _this__u8e3s4.c43(tmp0_safe_receiver, VOID, VOID, $this.m83_1);
    }
  }
  function drawOutline_1(_this__u8e3s4, $this) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2 = _this__u8e3s4.g34();
    var tmp_3 = $this.o83_1;
    if (equals(new Size(tmp_2), tmp_3 == null ? null : new Size(tmp_3))) {
      tmp_1 = _this__u8e3s4.a43().equals($this.p83_1);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = equals($this.r83_1, $this.n83_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = ensureNotNull($this.q83_1);
    } else {
      tmp = $this.n83_1.b3y(_this__u8e3s4.g34(), _this__u8e3s4.a43(), _this__u8e3s4);
    }
    var outline = tmp;
    if (!equals($this.k83_1, Companion_getInstance().n3r_1)) {
      drawOutline(_this__u8e3s4, outline, $this.k83_1);
    }
    var tmp0_safe_receiver = $this.l83_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      drawOutline_0(_this__u8e3s4, outline, tmp0_safe_receiver, $this.m83_1);
    }
    $this.q83_1 = outline;
    $this.o83_1 = _this__u8e3s4.g34();
    $this.p83_1 = _this__u8e3s4.a43();
    $this.r83_1 = $this.n83_1;
  }
  function BackgroundNode(color, brush, alpha, shape) {
    Node.call(this);
    this.k83_1 = color;
    this.l83_1 = brush;
    this.m83_1 = alpha;
    this.n83_1 = shape;
    this.o83_1 = null;
    this.p83_1 = null;
    this.q83_1 = null;
    this.r83_1 = null;
  }
  protoOf(BackgroundNode).b4v = function (_this__u8e3s4) {
    if (this.n83_1 === get_RectangleShape()) {
      drawRect(_this__u8e3s4, this);
    } else {
      drawOutline_1(_this__u8e3s4, this);
    }
    _this__u8e3s4.m4w();
  };
  function background$lambda($color, $shape) {
    return function ($this$null) {
      $this$null.a7w_1 = 'background';
      $this$null.b7w_1 = new Color($color);
      $this$null.c7w_1.e7w('color', new Color($color));
      $this$null.c7w_1.e7w('shape', $shape);
      return Unit_instance;
    };
  }
  function background$lambda_0($alpha, $brush, $shape) {
    return function ($this$null) {
      $this$null.a7w_1 = 'background';
      $this$null.c7w_1.e7w('alpha', $alpha);
      $this$null.c7w_1.e7w('brush', $brush);
      $this$null.c7w_1.e7w('shape', $shape);
      return Unit_instance;
    };
  }
  function Canvas(modifier, onDraw, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-932836462);
    sourceInformation($composer_0, 'C(Canvas)42@1876L35:Canvas.kt#71ulvw');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.j1y(onDraw) ? 32 : 16);
    if (!(($dirty & 91) === 18) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(-932836462, $dirty, -1, 'androidx.compose.foundation.Canvas (Canvas.kt:42)');
      }
      Spacer(drawBehind(modifier, onDraw), $composer_0, 0);
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
      tmp0_safe_receiver.j24(Canvas$lambda(modifier, onDraw, $changed));
    }
  }
  function Canvas$lambda($modifier, $onDraw, $$changed) {
    return function ($composer, $force) {
      Canvas($modifier, $onDraw, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function checkScrollableContainerConstraints(constraints, orientation) {
    if (orientation.equals(Orientation_Vertical_getInstance())) {
      // Inline function 'kotlin.check' call
      var tmp = _Constraints___get_maxHeight__impl__dt3e8z(constraints);
      Companion_getInstance_0();
      // Inline function 'kotlin.contracts.contract' call
      if (!!(tmp === 2147483647)) {
        // Inline function 'androidx.compose.foundation.checkScrollableContainerConstraints.<anonymous>' call
        var message = 'Vertically scrollable component was measured with an infinity maximum height constraints, which is disallowed. One of the common reasons is nesting layouts like LazyColumn and Column(Modifier.verticalScroll()). If you want to add a header before the list of items please add a header as a separate item() before the main items() inside the LazyColumn scope. There are could be other reasons for this to happen: your ComposeView was added into a LinearLayout with some weight, you applied Modifier.wrapContentSize(unbounded = true) or wrote a custom layout. Please try to remove the source of infinite constraints in the hierarchy above the scrolling container.';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    } else {
      // Inline function 'kotlin.check' call
      var tmp_0 = _Constraints___get_maxWidth__impl__uuyqc(constraints);
      Companion_getInstance_0();
      // Inline function 'kotlin.contracts.contract' call
      if (!!(tmp_0 === 2147483647)) {
        // Inline function 'androidx.compose.foundation.checkScrollableContainerConstraints.<anonymous>' call
        var message_0 = 'Horizontally scrollable component was measured with an infinity maximum width constraints, which is disallowed. One of the common reasons is nesting layouts like LazyRow and Row(Modifier.horizontalScroll()). If you want to add a header before the list of items please add a header as a separate item() before the main items() inside the LazyRow scope. There are could be other reasons for this to happen: your ComposeView was added into a LinearLayout with some weight, you applied Modifier.wrapContentSize(unbounded = true) or wrote a custom layout. Please try to remove the source of infinite constraints in the hierarchy above the scrolling container.';
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
    }
  }
  function clickable(_this__u8e3s4, enabled, onClickLabel, role, onClick) {
    enabled = enabled === VOID ? true : enabled;
    onClickLabel = onClickLabel === VOID ? null : onClickLabel;
    role = role === VOID ? null : role;
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = clickable$lambda(enabled, onClickLabel, role, onClick);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp_0 = tmp;
    return composed(_this__u8e3s4, tmp_0, clickable$lambda_0(enabled, onClickLabel, role, onClick));
  }
  function clickable_0(_this__u8e3s4, interactionSource, indication_0, enabled, onClickLabel, role, onClick) {
    enabled = enabled === VOID ? true : enabled;
    onClickLabel = onClickLabel === VOID ? null : onClickLabel;
    role = role === VOID ? null : role;
    // Inline function 'androidx.compose.ui.platform.inspectable' call
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = clickable$lambda_1(interactionSource, indication_0, enabled, onClickLabel, role, onClick);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var inspectorInfo = tmp;
    // Inline function 'androidx.compose.foundation.clickable.<anonymous>' call
    var tmp$ret$1 = focusable(hoverable(indication(Companion_instance, interactionSource, indication_0), interactionSource, enabled).q4t(new ClickableElement(interactionSource, enabled, onClickLabel, role, onClick)), enabled, interactionSource);
    return inspectableWrapper(_this__u8e3s4, inspectorInfo, tmp$ret$1);
  }
  function ClickableElement(interactionSource, enabled, onClickLabel, role, onClick) {
    role = role === VOID ? null : role;
    ModifierNodeElement.call(this);
    this.t83_1 = interactionSource;
    this.u83_1 = enabled;
    this.v83_1 = onClickLabel;
    this.w83_1 = role;
    this.x83_1 = onClick;
  }
  protoOf(ClickableElement).g25 = function () {
    return new ClickableNode(this.t83_1, this.u83_1, this.v83_1, this.w83_1, this.x83_1);
  };
  protoOf(ClickableElement).y83 = function (node) {
    node.w84(this.t83_1, this.u83_1, this.v83_1, this.w83_1, this.x83_1);
  };
  protoOf(ClickableElement).t4v = function (node) {
    return this.y83(node instanceof ClickableNode ? node : THROW_CCE());
  };
  protoOf(ClickableElement).equals = function (other) {
    if (this === other)
      return true;
    if (other === null)
      return false;
    if (!getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof ClickableElement))
      THROW_CCE();
    if (!equals(this.t83_1, other.t83_1))
      return false;
    if (!(this.u83_1 === other.u83_1))
      return false;
    if (!(this.v83_1 == other.v83_1))
      return false;
    var tmp = this.w83_1;
    var tmp_0 = tmp == null ? null : new Role(tmp);
    var tmp_1 = other.w83_1;
    if (!equals(tmp_0, tmp_1 == null ? null : new Role(tmp_1)))
      return false;
    if (!equals(this.x83_1, other.x83_1))
      return false;
    return true;
  };
  protoOf(ClickableElement).hashCode = function () {
    var result = hashCode(this.t83_1);
    result = imul(31, result) + getBooleanHashCode(this.u83_1) | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.v83_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : getStringHashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    var tmp_0 = imul(31, result);
    var tmp2_safe_receiver = this.w83_1;
    var tmp_1;
    var tmp_2 = tmp2_safe_receiver;
    if ((tmp_2 == null ? null : new Role(tmp_2)) == null) {
      tmp_1 = null;
    } else {
      tmp_1 = Role__hashCode_impl_ucjza4(tmp2_safe_receiver);
    }
    var tmp3_elvis_lhs = tmp_1;
    result = tmp_0 + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    result = imul(31, result) + hashCode(this.x83_1) | 0;
    return result;
  };
  function ClickableNode(interactionSource, enabled, onClickLabel, role, onClick) {
    AbstractClickableNode.call(this, interactionSource, enabled, onClickLabel, role, onClick);
    this.u84_1 = this.f63(new ClickableSemanticsNode(enabled, onClickLabel, role, onClick, null, null));
    this.v84_1 = this.f63(new ClickablePointerInputNode(enabled, interactionSource, onClick, this.r85_1));
  }
  protoOf(ClickableNode).s85 = function () {
    return this.v84_1;
  };
  protoOf(ClickableNode).w84 = function (interactionSource, enabled, onClickLabel, role, onClick) {
    this.t85(interactionSource, enabled, onClickLabel, role, onClick);
    this.u84_1.n86(enabled, onClickLabel, role, onClick, null, null);
    this.v84_1.j87(enabled, interactionSource, onClick);
  };
  function InteractionData() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.l87_1 = LinkedHashMap_init_$Create$();
    this.m87_1 = null;
    this.n87_1 = Companion_getInstance_1().u33_1;
  }
  function AbstractClickableNode$onKeyEvent$slambda(this$0, $press, resultContinuation) {
    this.w87_1 = this$0;
    this.x87_1 = $press;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractClickableNode$onKeyEvent$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractClickableNode$onKeyEvent$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractClickableNode$onKeyEvent$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.w87_1.m85_1.z87(this.x87_1, this);
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
  protoOf(AbstractClickableNode$onKeyEvent$slambda).x1e = function ($this$launch, completion) {
    var i = new AbstractClickableNode$onKeyEvent$slambda(this.w87_1, this.x87_1, completion);
    i.y87_1 = $this$launch;
    return i;
  };
  function AbstractClickableNode$onKeyEvent$slambda_0(this$0, $press, resultContinuation) {
    var i = new AbstractClickableNode$onKeyEvent$slambda(this$0, $press, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function AbstractClickableNode$onKeyEvent$slambda_1(this$0, $it, resultContinuation) {
    this.i88_1 = this$0;
    this.j88_1 = $it;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractClickableNode$onKeyEvent$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractClickableNode$onKeyEvent$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractClickableNode$onKeyEvent$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.i88_1.m85_1.z87(new Release(this.j88_1), this);
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
  protoOf(AbstractClickableNode$onKeyEvent$slambda_1).x1e = function ($this$launch, completion) {
    var i = new AbstractClickableNode$onKeyEvent$slambda_1(this.i88_1, this.j88_1, completion);
    i.k88_1 = $this$launch;
    return i;
  };
  function AbstractClickableNode$onKeyEvent$slambda_2(this$0, $it, resultContinuation) {
    var i = new AbstractClickableNode$onKeyEvent$slambda_1(this$0, $it, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function AbstractClickableNode(interactionSource, enabled, onClickLabel, role, onClick) {
    DelegatingNode.call(this);
    this.m85_1 = interactionSource;
    this.n85_1 = enabled;
    this.o85_1 = onClickLabel;
    this.p85_1 = role;
    this.q85_1 = onClick;
    this.r85_1 = new InteractionData();
  }
  protoOf(AbstractClickableNode).t85 = function (interactionSource, enabled, onClickLabel, role, onClick) {
    if (!equals(this.m85_1, interactionSource)) {
      this.k87();
      this.m85_1 = interactionSource;
    }
    if (!(this.n85_1 === enabled)) {
      if (!enabled) {
        this.k87();
      }
      this.n85_1 = enabled;
    }
    this.o85_1 = onClickLabel;
    this.p85_1 = role;
    this.q85_1 = onClick;
  };
  protoOf(AbstractClickableNode).r4u = function () {
    this.k87();
  };
  protoOf(AbstractClickableNode).k87 = function () {
    var tmp0_safe_receiver = this.r85_1.m87_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.AbstractClickableNode.disposeInteractionSource.<anonymous>' call
      var interaction = new Cancel_0(tmp0_safe_receiver);
      this.m85_1.l88(interaction);
    }
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = this.r85_1.l87_1.n2().o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.foundation.AbstractClickableNode.disposeInteractionSource.<anonymous>' call
      this.m85_1.l88(new Cancel_0(element));
    }
    this.r85_1.m87_1 = null;
    this.r85_1.l87_1.h1();
  };
  protoOf(AbstractClickableNode).v5f = function (pointerEvent, pass, bounds) {
    this.s85().v5f(pointerEvent, pass, bounds);
  };
  protoOf(AbstractClickableNode).l5g = function () {
    this.s85().l5g();
  };
  protoOf(AbstractClickableNode).z51 = function (event) {
    var tmp;
    if (this.n85_1 ? get_isPress(event) : false) {
      var tmp_0;
      if (!this.r85_1.l87_1.w2(new Key(get_key(event)))) {
        var press = new Press(this.r85_1.n87_1);
        // Inline function 'kotlin.collections.set' call
        var this_0 = this.r85_1.l87_1;
        var key = new Key(get_key(event));
        this_0.p2(key, press);
        var tmp_1 = this.k4u();
        launch(tmp_1, VOID, VOID, AbstractClickableNode$onKeyEvent$slambda_0(this, press, null));
        tmp_0 = true;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else if (this.n85_1 ? get_isClick(event) : false) {
      var tmp0_safe_receiver = this.r85_1.l87_1.t2(new Key(get_key(event)));
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.AbstractClickableNode.onKeyEvent.<anonymous>' call
        var tmp_2 = this.k4u();
        launch(tmp_2, VOID, VOID, AbstractClickableNode$onKeyEvent$slambda_2(this, tmp0_safe_receiver, null));
      }
      this.q85_1();
      tmp = true;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AbstractClickableNode).y51 = function (event) {
    return false;
  };
  function ClickableSemanticsNode$applySemantics$lambda(this$0) {
    return function () {
      this$0.k86_1();
      return true;
    };
  }
  function ClickableSemanticsNode$applySemantics$lambda_0(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.m86_1;
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver();
      return true;
    };
  }
  function ClickableSemanticsNode(enabled, onClickLabel, role, onClick, onLongClickLabel, onLongClick) {
    Node.call(this);
    this.h86_1 = enabled;
    this.i86_1 = onClickLabel;
    this.j86_1 = role;
    this.k86_1 = onClick;
    this.l86_1 = onLongClickLabel;
    this.m86_1 = onLongClick;
  }
  protoOf(ClickableSemanticsNode).n86 = function (enabled, onClickLabel, role, onClick, onLongClickLabel, onLongClick) {
    this.h86_1 = enabled;
    this.i86_1 = onClickLabel;
    this.j86_1 = role;
    this.k86_1 = onClick;
    this.l86_1 = onLongClickLabel;
    this.m86_1 = onLongClick;
  };
  protoOf(ClickableSemanticsNode).i62 = function () {
    return true;
  };
  protoOf(ClickableSemanticsNode).y61 = function (_this__u8e3s4) {
    var tmp = this.j86_1;
    if (!((tmp == null ? null : new Role(tmp)) == null)) {
      var tmp_0 = this.j86_1;
      set_role(_this__u8e3s4, ensureNotNull(tmp_0 == null ? null : new Role(tmp_0)).i6l_1);
    }
    var tmp0_label = this.i86_1;
    onClick(_this__u8e3s4, tmp0_label, ClickableSemanticsNode$applySemantics$lambda(this));
    if (!(this.m86_1 == null)) {
      var tmp1_label = this.l86_1;
      onLongClick(_this__u8e3s4, tmp1_label, ClickableSemanticsNode$applySemantics$lambda_0(this));
    }
    if (!this.h86_1) {
      disabled(_this__u8e3s4);
    }
  };
  function ClickablePointerInputNode$pointerInput$slambda(this$0, resultContinuation) {
    this.p89_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ClickablePointerInputNode$pointerInput$slambda).s89 = function ($this$detectTapAndPress, offset, $completion) {
    var tmp = this.t89($this$detectTapAndPress, offset, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ClickablePointerInputNode$pointerInput$slambda).nh = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, PressGestureScope) : false) ? p1 : THROW_CCE();
    return this.s89(tmp, p2 instanceof Offset ? p2.x33_1 : THROW_CCE(), $completion);
  };
  protoOf(ClickablePointerInputNode$pointerInput$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (this.p89_1.b89_1) {
              requestFocusWhenInMouseInputMode(this.p89_1);
              this.ac_1 = 1;
              suspendResult = this.p89_1.u89(this.q89_1, this.r89_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(ClickablePointerInputNode$pointerInput$slambda).t89 = function ($this$detectTapAndPress, offset, completion) {
    var i = new ClickablePointerInputNode$pointerInput$slambda(this.p89_1, completion);
    i.q89_1 = $this$detectTapAndPress;
    i.r89_1 = offset;
    return i;
  };
  function ClickablePointerInputNode$pointerInput$slambda_0(this$0, resultContinuation) {
    var i = new ClickablePointerInputNode$pointerInput$slambda(this$0, resultContinuation);
    var l = function ($this$detectTapAndPress, offset, $completion) {
      return i.s89($this$detectTapAndPress, offset.x33_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ClickablePointerInputNode$pointerInput$lambda(this$0) {
    return function (it) {
      if (this$0.b89_1)
        this$0.d89_1();
      return Unit_instance;
    };
  }
  function ClickablePointerInputNode(enabled, interactionSource, onClick, interactionData) {
    AbstractClickablePointerInputNode.call(this, enabled, interactionSource, onClick, interactionData);
  }
  protoOf(ClickablePointerInputNode).v89 = function (_this__u8e3s4, $completion) {
    var tmp = this.e89_1;
    // Inline function 'androidx.compose.ui.unit.toOffset' call
    var this_0 = get_center(_this__u8e3s4.u5f());
    tmp.n87_1 = Offset_0(_IntOffset___get_x__impl__qiqr5o(this_0), _IntOffset___get_y__impl__2avpwj(this_0));
    var tmp_0 = ClickablePointerInputNode$pointerInput$slambda_0(this, null);
    return detectTapAndPress(_this__u8e3s4, tmp_0, ClickablePointerInputNode$pointerInput$lambda(this), $completion);
  };
  protoOf(ClickablePointerInputNode).j87 = function (enabled, interactionSource, onClick) {
    this.b89_1 = enabled;
    this.d89_1 = onClick;
    this.c89_1 = interactionSource;
  };
  function AbstractClickablePointerInputNode$delayPressInteraction$lambda(this$0) {
    return function () {
      return this$0.b53(get_ModifierLocalScrollableContainer()) ? true : isComposeRootInScrollableContainer(this$0);
    };
  }
  function AbstractClickablePointerInputNode$pointerInputNode$slambda(this$0, resultContinuation) {
    this.e8a_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractClickablePointerInputNode$pointerInputNode$slambda).g8a = function ($this$SuspendingPointerInputModifierNode, $completion) {
    var tmp = this.h8a($this$SuspendingPointerInputModifierNode, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractClickablePointerInputNode$pointerInputNode$slambda).yc = function (p1, $completion) {
    return this.g8a((!(p1 == null) ? isInterface(p1, PointerInputScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractClickablePointerInputNode$pointerInputNode$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.e8a_1.v89(this.f8a_1, this);
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
  protoOf(AbstractClickablePointerInputNode$pointerInputNode$slambda).h8a = function ($this$SuspendingPointerInputModifierNode, completion) {
    var i = new AbstractClickablePointerInputNode$pointerInputNode$slambda(this.e8a_1, completion);
    i.f8a_1 = $this$SuspendingPointerInputModifierNode;
    return i;
  };
  function AbstractClickablePointerInputNode$pointerInputNode$slambda_0(this$0, resultContinuation) {
    var i = new AbstractClickablePointerInputNode$pointerInputNode$slambda(this$0, resultContinuation);
    var l = function ($this$SuspendingPointerInputModifierNode, $completion) {
      return i.g8a($this$SuspendingPointerInputModifierNode, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $handlePressInteractionCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, offset, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.q8a_1 = _this__u8e3s4;
    this.r8a_1 = _this__u8e3s4_0;
    this.s8a_1 = offset;
  }
  protoOf($handlePressInteractionCOROUTINE$0).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.t8a_1 = this.q8a_1.c89_1;
            if (this.t8a_1 == null) {
              this.u8a_1 = null;
              this.ac_1 = 2;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.v8a_1 = this.t8a_1;
              var tmp_1 = this;
              tmp_1.w8a_1 = this.v8a_1;
              this.ac_1 = 1;
              suspendResult = handlePressInteraction(this.r8a_1, this.s8a_1, this.w8a_1, this.q8a_1.e89_1, this.q8a_1.f89_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            var tmp_2 = this;
            tmp_2.u8a_1 = Unit_instance;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function AbstractClickablePointerInputNode(enabled, interactionSource, onClick, interactionData) {
    DelegatingNode.call(this);
    this.b89_1 = enabled;
    this.c89_1 = interactionSource;
    this.d89_1 = onClick;
    this.e89_1 = interactionData;
    var tmp = this;
    tmp.f89_1 = AbstractClickablePointerInputNode$delayPressInteraction$lambda(this);
    var tmp_0 = this;
    tmp_0.g89_1 = this.f63(SuspendingPointerInputModifierNode(AbstractClickablePointerInputNode$pointerInputNode$slambda_0(this, null)));
  }
  protoOf(AbstractClickablePointerInputNode).v5f = function (pointerEvent, pass, bounds) {
    this.g89_1.v5f(pointerEvent, pass, bounds);
  };
  protoOf(AbstractClickablePointerInputNode).l5g = function () {
    this.g89_1.l5g();
  };
  protoOf(AbstractClickablePointerInputNode).u89 = function (_this__u8e3s4, offset, $completion) {
    var tmp = new $handlePressInteractionCOROUTINE$0(this, _this__u8e3s4, offset, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function requestFocusWhenInMouseInputMode(_this__u8e3s4) {
    if (isMouseInputWorkaround()) {
      requestFocus(_this__u8e3s4);
    }
  }
  function handlePressInteraction(_this__u8e3s4, pressPoint, interactionSource, interactionData, delayPressInteraction, $completion) {
    return coroutineScope(handlePressInteraction$slambda_0(_this__u8e3s4, pressPoint, interactionSource, interactionData, delayPressInteraction, null), $completion);
  }
  function clickable$lambda($enabled, $onClickLabel, $role, $onClick) {
    return function ($this$null) {
      $this$null.a7w_1 = 'clickable';
      $this$null.c7w_1.e7w('enabled', $enabled);
      $this$null.c7w_1.e7w('onClickLabel', $onClickLabel);
      var tmp = $role;
      $this$null.c7w_1.e7w('role', tmp == null ? null : new Role(tmp));
      $this$null.c7w_1.e7w('onClick', $onClick);
      return Unit_instance;
    };
  }
  function clickable$lambda_0($enabled, $onClickLabel, $role, $onClick) {
    return function ($this$composed, $composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.j1l(-756081143);
      sourceInformation($composer_0, 'C105@4541L7,106@4578L39:Clickable.kt#71ulvw');
      var tmp;
      if (isTraceInProgress()) {
        traceEventStart(-756081143, $changed, -1, 'androidx.compose.foundation.clickable.<anonymous> (Clickable.kt:100)');
        tmp = Unit_instance;
      }
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalIndication();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.j1z(this_0);
      sourceInformationMarkerEnd($composer_1);
      $composer_0.j1l(1266813582);
      sourceInformation($composer_0, 'CC(remember):Clickable.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (false ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.clickable.<anonymous>.<anonymous>' call
        var value = funMutableInteractionSource();
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      var tmp0_0 = clickable_0(Companion_instance, tmp1_group, tmp0, $enabled, $onClickLabel, $role, $onClick);
      var tmp_2;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_2 = Unit_instance;
      }
      $composer_0.l1l();
      return tmp0_0;
    };
  }
  function clickable$lambda_1($interactionSource, $indication, $enabled, $onClickLabel, $role, $onClick) {
    return function ($this$null) {
      $this$null.a7w_1 = 'clickable';
      $this$null.c7w_1.e7w('interactionSource', $interactionSource);
      $this$null.c7w_1.e7w('indication', $indication);
      $this$null.c7w_1.e7w('enabled', $enabled);
      $this$null.c7w_1.e7w('onClickLabel', $onClickLabel);
      var tmp = $role;
      $this$null.c7w_1.e7w('role', tmp == null ? null : new Role(tmp));
      $this$null.c7w_1.e7w('onClick', $onClick);
      return Unit_instance;
    };
  }
  function handlePressInteraction$slambda$slambda($delayPressInteraction, $pressPoint, $interactionSource, $interactionData, resultContinuation) {
    this.f8b_1 = $delayPressInteraction;
    this.g8b_1 = $pressPoint;
    this.h8b_1 = $interactionSource;
    this.i8b_1 = $interactionData;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(handlePressInteraction$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(handlePressInteraction$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(handlePressInteraction$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            if (this.f8b_1()) {
              this.ac_1 = 1;
              suspendResult = delay(get_TapIndicationDelay(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.k8b_1 = new Press(this.g8b_1);
            this.ac_1 = 3;
            suspendResult = this.h8b_1.z87(this.k8b_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.i8b_1.m87_1 = this.k8b_1;
            return Unit_instance;
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(handlePressInteraction$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new handlePressInteraction$slambda$slambda(this.f8b_1, this.g8b_1, this.h8b_1, this.i8b_1, completion);
    i.j8b_1 = $this$launch;
    return i;
  };
  function handlePressInteraction$slambda$slambda_0($delayPressInteraction, $pressPoint, $interactionSource, $interactionData, resultContinuation) {
    var i = new handlePressInteraction$slambda$slambda($delayPressInteraction, $pressPoint, $interactionSource, $interactionData, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function handlePressInteraction$slambda($this_handlePressInteraction, $pressPoint, $interactionSource, $interactionData, $delayPressInteraction, resultContinuation) {
    this.t8b_1 = $this_handlePressInteraction;
    this.u8b_1 = $pressPoint;
    this.v8b_1 = $interactionSource;
    this.w8b_1 = $interactionData;
    this.x8b_1 = $delayPressInteraction;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(handlePressInteraction$slambda).w1e = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(handlePressInteraction$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(handlePressInteraction$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 9;
            var tmp_0 = this;
            tmp_0.z8b_1 = launch(this.y8b_1, VOID, VOID, handlePressInteraction$slambda$slambda_0(this.x8b_1, this.u8b_1, this.v8b_1, this.w8b_1, null));
            this.ac_1 = 1;
            suspendResult = this.t8b_1.i8c(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.a8c_1 = suspendResult;
            if (this.z8b_1.ko()) {
              this.ac_1 = 4;
              suspendResult = cancelAndJoin(this.z8b_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.b8c_1 = this.w8b_1.m87_1;
              if (this.b8c_1 == null) {
                this.c8c_1 = null;
                this.ac_1 = 3;
                continue $sm;
              } else {
                var tmp_1 = this;
                tmp_1.d8c_1 = this.b8c_1;
                var tmp_2 = this;
                tmp_2.e8c_1 = this.d8c_1;
                var tmp_3 = this;
                var tmp_4;
                if (this.a8c_1) {
                  tmp_4 = new Release(this.e8c_1);
                } else {
                  tmp_4 = new Cancel_0(this.e8c_1);
                }
                tmp_3.f8c_1 = tmp_4;
                this.ac_1 = 2;
                suspendResult = this.v8b_1.z87(this.f8c_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              }
            }

          case 2:
            var tmp_5 = this;
            tmp_5.c8c_1 = Unit_instance;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ac_1 = 8;
            continue $sm;
          case 4:
            if (this.a8c_1) {
              this.g8c_1 = new Press(this.u8b_1);
              this.h8c_1 = new Release(this.g8c_1);
              this.ac_1 = 5;
              suspendResult = this.v8b_1.z87(this.g8c_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 7;
              continue $sm;
            }

          case 5:
            this.ac_1 = 6;
            suspendResult = this.v8b_1.z87(this.h8c_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.ac_1 = 7;
            continue $sm;
          case 7:
            this.ac_1 = 8;
            continue $sm;
          case 8:
            this.w8b_1.m87_1 = null;
            return Unit_instance;
          case 9:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 9) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(handlePressInteraction$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new handlePressInteraction$slambda(this.t8b_1, this.u8b_1, this.v8b_1, this.w8b_1, this.x8b_1, completion);
    i.y8b_1 = $this$coroutineScope;
    return i;
  };
  function handlePressInteraction$slambda_0($this_handlePressInteraction, $pressPoint, $interactionSource, $interactionData, $delayPressInteraction, resultContinuation) {
    var i = new handlePressInteraction$slambda($this_handlePressInteraction, $pressPoint, $interactionSource, $interactionData, $delayPressInteraction, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.w1e($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function get_MaxSupportedElevation() {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    return MaxSupportedElevation;
  }
  var MaxSupportedElevation;
  function get_HorizontalScrollableClipModifier() {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    return HorizontalScrollableClipModifier;
  }
  var HorizontalScrollableClipModifier;
  function get_VerticalScrollableClipModifier() {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    return VerticalScrollableClipModifier;
  }
  var VerticalScrollableClipModifier;
  function clipScrollableContainer(_this__u8e3s4, orientation) {
    _init_properties_ClipScrollableContainer_kt__60yb60();
    var tmp;
    if (orientation.equals(Orientation_Vertical_getInstance())) {
      tmp = get_VerticalScrollableClipModifier();
    } else {
      tmp = get_HorizontalScrollableClipModifier();
    }
    return _this__u8e3s4.q4t(tmp);
  }
  function HorizontalScrollableClipModifier$1() {
  }
  protoOf(HorizontalScrollableClipModifier$1).b3y = function (size, layoutDirection, density) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.<no name provided>.createOutline.<anonymous>' call
    var inflateSize = density.z35(get_MaxSupportedElevation());
    return new Rectangle(new Rect(0.0, -inflateSize, _Size___get_width__impl__58y75t(size), _Size___get_height__impl__a04p02(size) + inflateSize));
  };
  function VerticalScrollableClipModifier$1() {
  }
  protoOf(VerticalScrollableClipModifier$1).b3y = function (size, layoutDirection, density) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.<no name provided>.createOutline.<anonymous>' call
    var inflateSize = density.z35(get_MaxSupportedElevation());
    return new Rectangle(new Rect(-inflateSize, 0.0, _Size___get_width__impl__58y75t(size) + inflateSize, _Size___get_height__impl__a04p02(size)));
  };
  var properties_initialized_ClipScrollableContainer_kt_l2hne;
  function _init_properties_ClipScrollableContainer_kt__60yb60() {
    if (!properties_initialized_ClipScrollableContainer_kt_l2hne) {
      properties_initialized_ClipScrollableContainer_kt_l2hne = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      MaxSupportedElevation = _Dp___init__impl__ms3zkb(30);
      var tmp = Companion_instance;
      HorizontalScrollableClipModifier = clip(tmp, new HorizontalScrollableClipModifier$1());
      var tmp_0 = Companion_instance;
      VerticalScrollableClipModifier = clip(tmp_0, new VerticalScrollableClipModifier$1());
    }
  }
  var focusGroupInspectorInfo;
  var FocusableInNonTouchModeElement;
  function _get_inputModeManager__dmvjvv($this) {
    return currentValueOf($this, get_LocalInputModeManager());
  }
  function FocusableInNonTouchMode() {
    Node.call(this);
  }
  protoOf(FocusableInNonTouchMode).v52 = function (focusProperties) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.FocusableInNonTouchMode.applyFocusProperties.<anonymous>' call
    focusProperties.a52(!(_get_inputModeManager__dmvjvv(this).e70() === Companion_getInstance_3().p59_1));
  };
  function focusable(_this__u8e3s4, enabled, interactionSource) {
    enabled = enabled === VOID ? true : enabled;
    interactionSource = interactionSource === VOID ? null : interactionSource;
    _init_properties_Focusable_kt__2q5fls();
    var tmp;
    if (enabled) {
      tmp = focusTarget(new FocusableElement(interactionSource));
    } else {
      tmp = Companion_instance;
    }
    return _this__u8e3s4.q4t(tmp);
  }
  function FocusableElement(interactionSource) {
    ModifierNodeElement.call(this);
    this.x8c_1 = interactionSource;
  }
  protoOf(FocusableElement).g25 = function () {
    return new FocusableNode(this.x8c_1);
  };
  protoOf(FocusableElement).y8c = function (node) {
    node.v8d(this.x8c_1);
  };
  protoOf(FocusableElement).t4v = function (node) {
    return this.y8c(node instanceof FocusableNode ? node : THROW_CCE());
  };
  protoOf(FocusableElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FocusableElement))
      return false;
    if (!equals(this.x8c_1, other.x8c_1))
      return false;
    return true;
  };
  protoOf(FocusableElement).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.x8c_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  function FocusableNode$onFocusEvent$slambda(this$0, resultContinuation) {
    this.e8e_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(FocusableNode$onFocusEvent$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(FocusableNode$onFocusEvent$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(FocusableNode$onFocusEvent$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.e8e_1.t8d_1.g8e(VOID, this);
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
  protoOf(FocusableNode$onFocusEvent$slambda).x1e = function ($this$launch, completion) {
    var i = new FocusableNode$onFocusEvent$slambda(this.e8e_1, completion);
    i.f8e_1 = $this$launch;
    return i;
  };
  function FocusableNode$onFocusEvent$slambda_0(this$0, resultContinuation) {
    var i = new FocusableNode$onFocusEvent$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function FocusableNode(interactionSource) {
    DelegatingNode.call(this);
    this.o8d_1 = null;
    this.p8d_1 = this.f63(new FocusableSemanticsNode());
    this.q8d_1 = this.f63(new FocusableInteractionNode(interactionSource));
    this.r8d_1 = this.f63(new FocusablePinnableContainerNode());
    this.s8d_1 = this.f63(new FocusedBoundsNode());
    this.t8d_1 = funBringIntoViewRequester();
    this.u8d_1 = this.f63(new BringIntoViewRequesterNode(this.t8d_1));
  }
  protoOf(FocusableNode).m5s = function (coordinates) {
    return this.u8d_1.m5s(coordinates);
  };
  protoOf(FocusableNode).v8d = function (interactionSource) {
    return this.q8d_1.v8d(interactionSource);
  };
  protoOf(FocusableNode).d50 = function (focusState) {
    if (!equals(this.o8d_1, focusState)) {
      var isFocused = focusState.b51();
      if (isFocused) {
        var tmp = this.k4u();
        launch(tmp, VOID, VOID, FocusableNode$onFocusEvent$slambda_0(this, null));
      }
      if (this.i4u_1) {
        invalidateSemantics(this);
      }
      this.q8d_1.l8f(isFocused);
      this.s8d_1.l8f(isFocused);
      this.r8d_1.l8f(isFocused);
      this.p8d_1.l8f(isFocused);
      this.o8d_1 = focusState;
    }
  };
  protoOf(FocusableNode).y61 = function (_this__u8e3s4) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    this.p8d_1.y61(_this__u8e3s4);
  };
  protoOf(FocusableNode).l5s = function (coordinates) {
    this.s8d_1.l5s(coordinates);
  };
  function FocusableSemanticsNode$applySemantics$lambda(this$0) {
    return function () {
      return requestFocus(this$0);
    };
  }
  function FocusableSemanticsNode() {
    Node.call(this);
    this.d8h_1 = new SemanticsConfiguration();
    this.e8h_1 = false;
  }
  protoOf(FocusableSemanticsNode).l8f = function (focused) {
    this.e8h_1 = focused;
  };
  protoOf(FocusableSemanticsNode).y61 = function (_this__u8e3s4) {
    set_focused(_this__u8e3s4, this.e8h_1);
    requestFocus_0(_this__u8e3s4, VOID, FocusableSemanticsNode$applySemantics$lambda(this));
  };
  function disposeInteractionSource($this) {
    var tmp0_safe_receiver = $this.j8f_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.FocusableInteractionNode.disposeInteractionSource.<anonymous>' call
      var tmp0_safe_receiver_0 = $this.k8f_1;
      var tmp;
      if (tmp0_safe_receiver_0 == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.FocusableInteractionNode.disposeInteractionSource.<anonymous>.<anonymous>' call
        var interaction = new Unfocus(tmp0_safe_receiver_0);
        tmp = tmp0_safe_receiver.l88(interaction);
      }
    }
    $this.k8f_1 = null;
  }
  function emitWithFallback(_this__u8e3s4, $this, interaction) {
    if ($this.i4u_1) {
      var tmp = $this.k4u();
      launch(tmp, VOID, VOID, FocusableInteractionNode$emitWithFallback$slambda_0(_this__u8e3s4, interaction, null));
    } else {
      _this__u8e3s4.l88(interaction);
    }
  }
  function FocusableInteractionNode$emitWithFallback$slambda($this_emitWithFallback, $interaction, resultContinuation) {
    this.n8h_1 = $this_emitWithFallback;
    this.o8h_1 = $interaction;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(FocusableInteractionNode$emitWithFallback$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(FocusableInteractionNode$emitWithFallback$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(FocusableInteractionNode$emitWithFallback$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.n8h_1.z87(this.o8h_1, this);
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
  protoOf(FocusableInteractionNode$emitWithFallback$slambda).x1e = function ($this$launch, completion) {
    var i = new FocusableInteractionNode$emitWithFallback$slambda(this.n8h_1, this.o8h_1, completion);
    i.p8h_1 = $this$launch;
    return i;
  };
  function FocusableInteractionNode$emitWithFallback$slambda_0($this_emitWithFallback, $interaction, resultContinuation) {
    var i = new FocusableInteractionNode$emitWithFallback$slambda($this_emitWithFallback, $interaction, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function FocusableInteractionNode(interactionSource) {
    Node.call(this);
    this.j8f_1 = interactionSource;
    this.k8f_1 = null;
  }
  protoOf(FocusableInteractionNode).l8f = function (isFocused) {
    var tmp0_safe_receiver = this.j8f_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.FocusableInteractionNode.setFocus.<anonymous>' call
      var tmp;
      if (isFocused) {
        var tmp0_safe_receiver_0 = this.k8f_1;
        if (tmp0_safe_receiver_0 == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          var interaction = new Unfocus(tmp0_safe_receiver_0);
          emitWithFallback(tmp0_safe_receiver, this, interaction);
          this.k8f_1 = null;
        }
        var interaction_0 = new Focus();
        emitWithFallback(tmp0_safe_receiver, this, interaction_0);
        this.k8f_1 = interaction_0;
        tmp = Unit_instance;
      } else {
        var tmp1_safe_receiver = this.k8f_1;
        var tmp_0;
        if (tmp1_safe_receiver == null) {
          tmp_0 = null;
        } else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          var interaction_1 = new Unfocus(tmp1_safe_receiver);
          emitWithFallback(tmp0_safe_receiver, this, interaction_1);
          this.k8f_1 = null;
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      }
    }
  };
  protoOf(FocusableInteractionNode).v8d = function (interactionSource) {
    if (!equals(this.j8f_1, interactionSource)) {
      disposeInteractionSource(this);
      this.j8f_1 = interactionSource;
    }
  };
  function retrievePinnableContainer($this) {
    var container = {_v: null};
    observeReads($this, FocusablePinnableContainerNode$retrievePinnableContainer$lambda(container, $this));
    return container._v;
  }
  function FocusablePinnableContainerNode$retrievePinnableContainer$lambda($container, this$0) {
    return function () {
      $container._v = currentValueOf(this$0, get_LocalPinnableContainer());
      return Unit_instance;
    };
  }
  function FocusablePinnableContainerNode() {
    Node.call(this);
    this.o8g_1 = null;
    this.p8g_1 = false;
  }
  protoOf(FocusablePinnableContainerNode).l8f = function (focused) {
    if (focused) {
      var pinnableContainer = retrievePinnableContainer(this);
      var tmp = this;
      tmp.o8g_1 = pinnableContainer == null ? null : pinnableContainer.q8h();
    } else {
      var tmp1_safe_receiver = this.o8g_1;
      if (tmp1_safe_receiver == null)
        null;
      else {
        tmp1_safe_receiver.gu();
      }
      this.o8g_1 = null;
    }
    this.p8g_1 = focused;
  };
  protoOf(FocusablePinnableContainerNode).t4u = function () {
    var tmp0_safe_receiver = this.o8g_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.gu();
    }
    this.o8g_1 = null;
  };
  protoOf(FocusablePinnableContainerNode).c53 = function () {
    var pinnableContainer = retrievePinnableContainer(this);
    if (this.p8g_1) {
      var tmp0_safe_receiver = this.o8g_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        tmp0_safe_receiver.gu();
      }
      var tmp = this;
      tmp.o8g_1 = pinnableContainer == null ? null : pinnableContainer.q8h();
    }
  };
  function focusGroupInspectorInfo$lambda($this$null) {
    _init_properties_Focusable_kt__2q5fls();
    // Inline function 'androidx.compose.foundation.focusGroupInspectorInfo.<anonymous>' call
    $this$null.a7w_1 = 'focusGroup';
    return Unit_instance;
  }
  function FocusableInNonTouchModeElement$1() {
    ModifierNodeElement.call(this);
    this.s8h_1 = identityHashCode(this);
  }
  protoOf(FocusableInNonTouchModeElement$1).g25 = function () {
    return new FocusableInNonTouchMode();
  };
  protoOf(FocusableInNonTouchModeElement$1).t8h = function (node) {
  };
  protoOf(FocusableInNonTouchModeElement$1).t4v = function (node) {
    return this.t8h(node instanceof FocusableInNonTouchMode ? node : THROW_CCE());
  };
  protoOf(FocusableInNonTouchModeElement$1).hashCode = function () {
    return this.s8h_1;
  };
  protoOf(FocusableInNonTouchModeElement$1).equals = function (other) {
    return this === other;
  };
  var properties_initialized_Focusable_kt_k4lele;
  function _init_properties_Focusable_kt__2q5fls() {
    if (!properties_initialized_Focusable_kt_k4lele) {
      properties_initialized_Focusable_kt_k4lele = true;
      // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
      var tmp;
      if (get_isDebugInspectorInfoEnabled()) {
        tmp = focusGroupInspectorInfo$lambda;
      } else {
        tmp = get_NoInspectorInfo();
      }
      var tmp$ret$0 = tmp;
      focusGroupInspectorInfo = new InspectableModifier(tmp$ret$0);
      FocusableInNonTouchModeElement = new FocusableInNonTouchModeElement$1();
    }
  }
  function get_ModifierLocalFocusedBoundsObserver() {
    _init_properties_FocusedBounds_kt__l9iahm();
    return ModifierLocalFocusedBoundsObserver;
  }
  var ModifierLocalFocusedBoundsObserver;
  function _get_observer__9uzl8r($this) {
    var tmp;
    if ($this.i4u_1) {
      tmp = $this.b53(get_ModifierLocalFocusedBoundsObserver());
    } else {
      tmp = null;
    }
    return tmp;
  }
  function notifyObserverWhenAttached($this) {
    if (!($this.a8g_1 == null) ? ensureNotNull($this.a8g_1).k54() : false) {
      var tmp0_safe_receiver = _get_observer__9uzl8r($this);
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver($this.a8g_1);
    }
  }
  function FocusedBoundsNode() {
    Node.call(this);
    this.z8f_1 = false;
    this.a8g_1 = null;
  }
  protoOf(FocusedBoundsNode).l8f = function (focused) {
    if (focused === this.z8f_1)
      return Unit_instance;
    if (!focused) {
      var tmp0_safe_receiver = _get_observer__9uzl8r(this);
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver(null);
    } else {
      notifyObserverWhenAttached(this);
    }
    this.z8f_1 = focused;
  };
  protoOf(FocusedBoundsNode).l5s = function (coordinates) {
    this.a8g_1 = coordinates;
    if (!this.z8f_1)
      return Unit_instance;
    if (coordinates.k54()) {
      notifyObserverWhenAttached(this);
    } else {
      var tmp0_safe_receiver = _get_observer__9uzl8r(this);
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver(null);
    }
  };
  function _get_parent__oo9xup($this) {
    return $this.i4u_1 ? $this.b53(get_ModifierLocalFocusedBoundsObserver()) : null;
  }
  function FocusedBoundsObserverNode$focusBoundsObserver$lambda(this$0) {
    return function (focusedBounds) {
      var tmp;
      if (this$0.i4u_1) {
        this$0.h8i_1(focusedBounds);
        var tmp0_safe_receiver = _get_parent__oo9xup(this$0);
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver(focusedBounds);
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function FocusedBoundsObserverNode(onPositioned) {
    Node.call(this);
    this.h8i_1 = onPositioned;
    var tmp = this;
    tmp.i8i_1 = FocusedBoundsObserverNode$focusBoundsObserver$lambda(this);
    this.j8i_1 = modifierLocalMapOf(to(get_ModifierLocalFocusedBoundsObserver(), this.i8i_1));
  }
  protoOf(FocusedBoundsObserverNode).f53 = function () {
    return this.j8i_1;
  };
  function ModifierLocalFocusedBoundsObserver$lambda() {
    _init_properties_FocusedBounds_kt__l9iahm();
    return null;
  }
  var properties_initialized_FocusedBounds_kt_k69nss;
  function _init_properties_FocusedBounds_kt__l9iahm() {
    if (!properties_initialized_FocusedBounds_kt_k69nss) {
      properties_initialized_FocusedBounds_kt_k69nss = true;
      ModifierLocalFocusedBoundsObserver = modifierLocalOf(ModifierLocalFocusedBoundsObserver$lambda);
    }
  }
  function hoverable(_this__u8e3s4, interactionSource, enabled) {
    enabled = enabled === VOID ? true : enabled;
    return _this__u8e3s4.q4t(enabled ? new HoverableElement(interactionSource) : Companion_instance);
  }
  function HoverableElement(interactionSource) {
    ModifierNodeElement.call(this);
    this.l8i_1 = interactionSource;
  }
  protoOf(HoverableElement).g25 = function () {
    return new HoverableNode(this.l8i_1);
  };
  protoOf(HoverableElement).m8i = function (node) {
    node.c8j(this.l8i_1);
  };
  protoOf(HoverableElement).t4v = function (node) {
    return this.m8i(node instanceof HoverableNode ? node : THROW_CCE());
  };
  protoOf(HoverableElement).hashCode = function () {
    return imul(31, hashCode(this.l8i_1));
  };
  protoOf(HoverableElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HoverableElement))
      return false;
    if (!equals(other.l8i_1, this.l8i_1))
      return false;
    return true;
  };
  function HoverableNode$onPointerEvent$slambda(this$0, resultContinuation) {
    this.l8j_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HoverableNode$onPointerEvent$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(HoverableNode$onPointerEvent$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(HoverableNode$onPointerEvent$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.l8j_1.n8j(this);
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
  protoOf(HoverableNode$onPointerEvent$slambda).x1e = function ($this$launch, completion) {
    var i = new HoverableNode$onPointerEvent$slambda(this.l8j_1, completion);
    i.m8j_1 = $this$launch;
    return i;
  };
  function HoverableNode$onPointerEvent$slambda_0(this$0, resultContinuation) {
    var i = new HoverableNode$onPointerEvent$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function HoverableNode$onPointerEvent$slambda_1(this$0, resultContinuation) {
    this.w8j_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(HoverableNode$onPointerEvent$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(HoverableNode$onPointerEvent$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(HoverableNode$onPointerEvent$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.w8j_1.y8j(this);
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
  protoOf(HoverableNode$onPointerEvent$slambda_1).x1e = function ($this$launch, completion) {
    var i = new HoverableNode$onPointerEvent$slambda_1(this.w8j_1, completion);
    i.x8j_1 = $this$launch;
    return i;
  };
  function HoverableNode$onPointerEvent$slambda_2(this$0, resultContinuation) {
    var i = new HoverableNode$onPointerEvent$slambda_1(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $emitEnterCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.h8k_1 = _this__u8e3s4;
  }
  protoOf($emitEnterCOROUTINE$1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (this.h8k_1.b8j_1 == null) {
              this.i8k_1 = new Enter();
              this.ac_1 = 1;
              suspendResult = this.h8k_1.a8j_1.z87(this.i8k_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.h8k_1.b8j_1 = this.i8k_1;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $emitExitCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.r8k_1 = _this__u8e3s4;
  }
  protoOf($emitExitCOROUTINE$2).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.s8k_1 = this.r8k_1.b8j_1;
            if (this.s8k_1 == null) {
              this.t8k_1 = null;
              this.ac_1 = 2;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.u8k_1 = this.s8k_1;
              var tmp_1 = this;
              tmp_1.v8k_1 = this.u8k_1;
              this.w8k_1 = new Exit(this.v8k_1);
              this.ac_1 = 1;
              suspendResult = this.r8k_1.a8j_1.z87(this.w8k_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            var tmp_2 = this;
            this.r8k_1.b8j_1 = null;
            tmp_2.t8k_1 = Unit_instance;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function HoverableNode(interactionSource) {
    Node.call(this);
    this.a8j_1 = interactionSource;
    this.b8j_1 = null;
  }
  protoOf(HoverableNode).c8j = function (interactionSource) {
    if (!equals(this.a8j_1, interactionSource)) {
      this.x8k();
      this.a8j_1 = interactionSource;
    }
  };
  protoOf(HoverableNode).v5f = function (pointerEvent, pass, bounds) {
    if (pass.equals(PointerEventPass_Main_getInstance())) {
      var tmp0_subject = pointerEvent.g5f_1;
      if (tmp0_subject === Companion_getInstance_4().i5g_1) {
        var tmp = this.k4u();
        var tmp_0 = CoroutineStart_UNDISPATCHED_getInstance();
        launch(tmp, VOID, tmp_0, HoverableNode$onPointerEvent$slambda_0(this, null));
      } else if (tmp0_subject === Companion_getInstance_4().j5g_1) {
        var tmp_1 = this.k4u();
        var tmp_2 = CoroutineStart_UNDISPATCHED_getInstance();
        launch(tmp_1, VOID, tmp_2, HoverableNode$onPointerEvent$slambda_2(this, null));
      }
    }
  };
  protoOf(HoverableNode).l5g = function () {
    this.x8k();
  };
  protoOf(HoverableNode).r4u = function () {
    this.x8k();
  };
  protoOf(HoverableNode).n8j = function ($completion) {
    var tmp = new $emitEnterCOROUTINE$1(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(HoverableNode).y8j = function ($completion) {
    var tmp = new $emitExitCOROUTINE$2(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(HoverableNode).x8k = function () {
    var tmp0_safe_receiver = this.b8j_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var interaction = new Exit(tmp0_safe_receiver);
      this.a8j_1.l88(interaction);
      this.b8j_1 = null;
    }
  };
  function get_LocalIndication() {
    _init_properties_Indication_kt__w3ndj0();
    return LocalIndication;
  }
  var LocalIndication;
  function DefaultDebugIndicationInstance(isPressed, isHovered, isFocused) {
    this.y8k_1 = isPressed;
    this.z8k_1 = isHovered;
    this.a8l_1 = isFocused;
  }
  protoOf(DefaultDebugIndicationInstance).b8l = function (_this__u8e3s4) {
    _this__u8e3s4.m4w();
    if (this.y8k_1.s2()) {
      _this__u8e3s4.d43(Color__copy$default_impl_ectz3s(Companion_getInstance().b3r_1, 0.3), VOID, _this__u8e3s4.g34());
    } else if (this.z8k_1.s2() ? true : this.a8l_1.s2()) {
      _this__u8e3s4.d43(Color__copy$default_impl_ectz3s(Companion_getInstance().b3r_1, 0.1), VOID, _this__u8e3s4.g34());
    }
  };
  function DefaultDebugIndication() {
  }
  protoOf(DefaultDebugIndication).c8l = function (interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1683566979);
    sourceInformation($composer_0, 'C(rememberUpdatedInstance)183@7542L25,184@7610L25,185@7678L25,186@7719L115:Indication.kt#71ulvw');
    if (isTraceInProgress()) {
      traceEventStart(1683566979, $changed, -1, 'androidx.compose.foundation.DefaultDebugIndication.rememberUpdatedInstance (Indication.kt:182)');
    }
    var isPressed = collectIsPressedAsState(interactionSource, $composer_0, 14 & $changed);
    var isHovered = collectIsHoveredAsState(interactionSource, $composer_0, 14 & $changed);
    var isFocused = collectIsFocusedAsState(interactionSource, $composer_0, 14 & $changed);
    $composer_0.j1l(602237040);
    sourceInformation($composer_0, 'CC(remember):Indication.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = (($changed & 14 ^ 6) > 4 ? $composer_0.v1o(interactionSource) : false) ? true : ($changed & 6) === 4;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.DefaultDebugIndication.rememberUpdatedInstance.<anonymous>' call
      var value = new DefaultDebugIndicationInstance(isPressed, isHovered, isFocused);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  };
  var DefaultDebugIndication_instance;
  function DefaultDebugIndication_getInstance() {
    return DefaultDebugIndication_instance;
  }
  function indication(_this__u8e3s4, interactionSource, indication) {
    _init_properties_Indication_kt__w3ndj0();
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = indication$lambda(indication, interactionSource);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp0_inspectorInfo = tmp;
    return composed(_this__u8e3s4, tmp0_inspectorInfo, indication$lambda_0(interactionSource, indication));
  }
  function TempInteractionSource(interactions) {
    this.d8l_1 = interactions;
  }
  protoOf(TempInteractionSource).e8l = function () {
    return this.d8l_1;
  };
  function NoIndicationInstance() {
  }
  protoOf(NoIndicationInstance).b8l = function (_this__u8e3s4) {
    _this__u8e3s4.m4w();
  };
  var NoIndicationInstance_instance;
  function NoIndicationInstance_getInstance() {
    return NoIndicationInstance_instance;
  }
  function NoIndication() {
  }
  protoOf(NoIndication).c8l = function (interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(285654452);
    sourceInformation($composer_0, 'C(rememberUpdatedInstance):Indication.kt#71ulvw');
    if (isTraceInProgress()) {
      traceEventStart(285654452, $changed, -1, 'androidx.compose.foundation.NoIndication.rememberUpdatedInstance (Indication.kt:156)');
    }
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return NoIndicationInstance_instance;
  };
  var NoIndication_instance;
  function NoIndication_getInstance() {
    return NoIndication_instance;
  }
  function IndicationModifier(indicationInstance) {
    this.f8l_1 = indicationInstance;
  }
  protoOf(IndicationModifier).b4v = function (_this__u8e3s4) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    this.f8l_1.b8l(_this__u8e3s4);
  };
  function LocalIndication$lambda() {
    _init_properties_Indication_kt__w3ndj0();
    return DefaultDebugIndication_instance;
  }
  function indication$lambda($indication, $interactionSource) {
    return function ($this$null) {
      $this$null.a7w_1 = 'indication';
      $this$null.c7w_1.e7w('indication', $indication);
      $this$null.c7w_1.e7w('interactionSource', $interactionSource);
      return Unit_instance;
    };
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.g8l_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).p19 = function (value, $completion) {
    return this.g8l_1(value, $completion);
  };
  function indication$lambda$o$collect$slambda($$this$unsafeFlow, $inputModeManager, resultContinuation) {
    this.p8l_1 = $$this$unsafeFlow;
    this.q8l_1 = $inputModeManager;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(indication$lambda$o$collect$slambda).v8l = function (value, $completion) {
    var tmp = this.w8l(value, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(indication$lambda$o$collect$slambda).yc = function (p1, $completion) {
    return this.v8l((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(indication$lambda$o$collect$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0 = this;
            tmp_0.t8l_1 = this.p8l_1;
            var tmp_1 = this;
            tmp_1.u8l_1 = this.r8l_1;
            var it = this.u8l_1;
            var tmp_2;
            if (this.q8l_1.e70() === Companion_getInstance_3().p59_1) {
              tmp_2 = it instanceof Focus;
            } else {
              tmp_2 = false;
            }

            if (!tmp_2) {
              this.ac_1 = 3;
              suspendResult = this.t8l_1.p19(this.u8l_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 2:
            if (false) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 4;
            continue $sm;
          case 3:
            this.s8l_1 = suspendResult;
            this.ac_1 = 4;
            continue $sm;
          case 4:
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
  protoOf(indication$lambda$o$collect$slambda).w8l = function (value, completion) {
    var i = new indication$lambda$o$collect$slambda(this.p8l_1, this.q8l_1, completion);
    i.r8l_1 = value;
    return i;
  };
  function indication$lambda$o$collect$slambda_0($$this$unsafeFlow, $inputModeManager, resultContinuation) {
    var i = new indication$lambda$o$collect$slambda($$this$unsafeFlow, $inputModeManager, resultContinuation);
    var l = function (value, $completion) {
      return i.v8l(value, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $collectCOROUTINE$3(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f8m_1 = _this__u8e3s4;
    this.g8m_1 = collector;
  }
  protoOf($collectCOROUTINE$3).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp_0 = this;
            tmp_0.h8m_1 = this.g8m_1;
            this.ac_1 = 1;
            var tmp_1 = indication$lambda$o$collect$slambda_0(this.h8m_1, this.f8m_1.j8m_1, null);
            suspendResult = this.f8m_1.i8m_1.b18(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_1), this);
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
  function _no_name_provided__qut3iv($this, $inputModeManager) {
    this.i8m_1 = $this;
    this.j8m_1 = $inputModeManager;
  }
  protoOf(_no_name_provided__qut3iv).k8m = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$3(this, collector, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(_no_name_provided__qut3iv).b18 = function (collector, $completion) {
    return this.k8m(collector, $completion);
  };
  function indication$lambda_0($interactionSource, $indication) {
    return function ($this$composed, $composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.j1l(-353972293);
      sourceInformation($composer_0, 'C114@5074L7,115@5122L362,125@5588L50,126@5647L71:Indication.kt#71ulvw');
      var tmp;
      if (isTraceInProgress()) {
        traceEventStart(-353972293, $changed, -1, 'androidx.compose.foundation.indication.<anonymous> (Indication.kt:114)');
        tmp = Unit_instance;
      }
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalInputModeManager();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.j1z(this_0);
      sourceInformationMarkerEnd($composer_1);
      var inputModeManager = tmp0;
      $composer_0.j1l(1773948927);
      sourceInformation($composer_0, 'CC(remember):Indication.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_0.v1o($interactionSource);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.indication.<anonymous>.<anonymous>' call
        // Inline function 'kotlinx.coroutines.flow.filter' call
        // Inline function 'kotlinx.coroutines.flow.unsafeTransform' call
        var this_1 = $interactionSource.e8l();
        // Inline function 'kotlinx.coroutines.flow.internal.unsafeFlow' call
        var tmp$ret$3 = new _no_name_provided__qut3iv(this_1, inputModeManager);
        var value = new TempInteractionSource(tmp$ret$3);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      var filteredInteractionSource = tmp1_group;
      var tmp0_elvis_lhs = $indication;
      var resolvedIndication = tmp0_elvis_lhs == null ? NoIndication_instance : tmp0_elvis_lhs;
      var instance = resolvedIndication.c8l(filteredInteractionSource, $composer_0, 0);
      $composer_0.j1l(1773965436);
      sourceInformation($composer_0, 'CC(remember):Indication.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid_0 = $composer_0.v1o(instance);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = $composer_0.x1y();
      var tmp_2;
      if (invalid_0 ? true : it_0 === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.indication.<anonymous>.<anonymous>' call
        var value_0 = new IndicationModifier(instance);
        $composer_0.d1z(value_0);
        tmp_2 = value_0;
      } else {
        tmp_2 = it_0;
      }
      var tmp_3 = tmp_2;
      var tmp2_group = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      $composer_0.l1l();
      var tmp_4;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_4 = Unit_instance;
      }
      $composer_0.l1l();
      return tmp2_group;
    };
  }
  var properties_initialized_Indication_kt_w71gpq;
  function _init_properties_Indication_kt__w3ndj0() {
    if (!properties_initialized_Indication_kt_w71gpq) {
      properties_initialized_Indication_kt_w71gpq = true;
      LocalIndication = staticCompositionLocalOf(LocalIndication$lambda);
    }
  }
  var MutatePriority_Default_instance;
  var MutatePriority_UserInput_instance;
  var MutatePriority_PreventUserInput_instance;
  var MutatePriority_entriesInitialized;
  function MutatePriority_initEntries() {
    if (MutatePriority_entriesInitialized)
      return Unit_instance;
    MutatePriority_entriesInitialized = true;
    MutatePriority_Default_instance = new MutatePriority('Default', 0);
    MutatePriority_UserInput_instance = new MutatePriority('UserInput', 1);
    MutatePriority_PreventUserInput_instance = new MutatePriority('PreventUserInput', 2);
  }
  function MutatePriority(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Mutator(priority, job) {
    this.l8m_1 = priority;
    this.m8m_1 = job;
  }
  protoOf(Mutator).n8m = function (other) {
    return this.l8m_1.u9(other.l8m_1) >= 0;
  };
  protoOf(Mutator).l7p = function () {
    return this.m8m_1.sp(new MutationInterruptedException());
  };
  function tryMutateOrCancel($this, mutator) {
    $l$loop: while (true) {
      var oldMutator = $this.o8m_1.zu();
      if (oldMutator == null ? true : mutator.n8m(oldMutator)) {
        if ($this.o8m_1.f23(oldMutator, mutator)) {
          if (oldMutator == null)
            null;
          else {
            oldMutator.l7p();
          }
          break $l$loop;
        }
      } else
        throw CancellationException_init_$Create$('Current mutation had a higher priority');
    }
  }
  function MutatorMutex$mutateWith$slambda($priority, this$0, $block, $receiver, resultContinuation) {
    this.z8m_1 = $priority;
    this.a8n_1 = this$0;
    this.b8n_1 = $block;
    this.c8n_1 = $receiver;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MutatorMutex$mutateWith$slambda).e7q = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MutatorMutex$mutateWith$slambda).yc = function (p1, $completion) {
    return this.e7q((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MutatorMutex$mutateWith$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 9;
            this.e8n_1 = new Mutator(this.z8m_1, ensureNotNull(this.d8n_1.jo().hc(Key_instance)));
            tryMutateOrCancel(this.a8n_1, this.e8n_1);
            var tmp_0 = this;
            tmp_0.f8n_1 = this.a8n_1.p8m_1;
            var tmp_1 = this;
            tmp_1.g8n_1 = null;
            this.ac_1 = 1;
            suspendResult = this.f8n_1.v1g(this.g8n_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.bc_1 = 8;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.bc_1 = 7;
            this.ac_1 = 4;
            suspendResult = this.b8n_1(this.c8n_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.i8n_1 = suspendResult;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            var tmp_2 = this.i8n_1;
            this.bc_1 = 8;
            this.a8n_1.o8m_1.f23(this.e8n_1, null);
            this.h8n_1 = tmp_2;
            this.bc_1 = 9;
            this.ac_1 = 6;
            continue $sm;
          case 6:
            var tmp_3 = this.h8n_1;
            this.bc_1 = 9;
            this.f8n_1.x1g(this.g8n_1);
            return tmp_3;
          case 7:
            this.bc_1 = 8;
            var t = this.dc_1;
            this.a8n_1.o8m_1.f23(this.e8n_1, null);
            throw t;
          case 8:
            this.bc_1 = 9;
            var t_0 = this.dc_1;
            this.f8n_1.x1g(this.g8n_1);
            throw t_0;
          case 9:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 9) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(MutatorMutex$mutateWith$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new MutatorMutex$mutateWith$slambda(this.z8m_1, this.a8n_1, this.b8n_1, this.c8n_1, completion);
    i.d8n_1 = $this$coroutineScope;
    return i;
  };
  function MutatorMutex$mutateWith$slambda_0($priority, this$0, $block, $receiver, resultContinuation) {
    var i = new MutatorMutex$mutateWith$slambda($priority, this$0, $block, $receiver, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.e7q($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MutatorMutex() {
    this.o8m_1 = new AtomicReference(null);
    this.p8m_1 = Mutex();
  }
  protoOf(MutatorMutex).j8n = function (receiver, priority, block, $completion) {
    return coroutineScope(MutatorMutex$mutateWith$slambda_0(priority, this, block, receiver, null), $completion);
  };
  function MutationInterruptedException() {
    PlatformOptimizedCancellationException.call(this, 'Mutation interrupted');
    captureStack(this, MutationInterruptedException);
  }
  function MutatePriority_Default_getInstance() {
    MutatePriority_initEntries();
    return MutatePriority_Default_instance;
  }
  function MutatePriority_UserInput_getInstance() {
    MutatePriority_initEntries();
    return MutatePriority_UserInput_instance;
  }
  function overscroll(_this__u8e3s4, overscrollEffect) {
    return _this__u8e3s4.q4t(overscrollEffect.k8n());
  }
  function progressSemantics(_this__u8e3s4) {
    return semantics(_this__u8e3s4, true, progressSemantics$lambda);
  }
  function progressSemantics$lambda($this$semantics) {
    set_progressBarRangeInfo($this$semantics, Companion_getInstance_5().o6m_1);
    return Unit_instance;
  }
  function BringIntoViewRequestPriorityQueue$enqueue$lambda(this$0, $request) {
    return function (it) {
      this$0.l8n_1.m2l($request);
      return Unit_instance;
    };
  }
  function BringIntoViewRequestPriorityQueue() {
    var tmp = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp.l8n_1 = new MutableVector(tmp$ret$0, 0);
  }
  protoOf(BringIntoViewRequestPriorityQueue).m = function () {
    return this.l8n_1.t1v_1;
  };
  protoOf(BringIntoViewRequestPriorityQueue).m8n = function (request) {
    var tmp0_elvis_lhs = request.n8n_1();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = request.o8n_1;
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      this_0.u6(tmp$ret$0);
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var requestBounds = tmp;
    request.o8n_1.cr(BringIntoViewRequestPriorityQueue$enqueue$lambda(this, request));
    // Inline function 'androidx.compose.runtime.collection.MutableVector.indices' call
    var this_1 = this.l8n_1;
    var progression = numberRangeToNumber(0, this_1.t1v_1 - 1 | 0);
    var last = progression.aa_1;
    var inductionVariable = progression.ba_1;
    if (last <= inductionVariable)
      $l$loop: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
        var this_2 = this.l8n_1;
        var index = i;
        var tmp_0 = this_2.r1v_1[index];
        var r = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
        var tmp2_elvis_lhs = r.n8n_1();
        var tmp_1;
        if (tmp2_elvis_lhs == null) {
          continue $l$loop;
        } else {
          tmp_1 = tmp2_elvis_lhs;
        }
        var rBounds = tmp_1;
        var intersection = requestBounds.j34(rBounds);
        if (intersection.equals(requestBounds)) {
          this.l8n_1.j2l(i + 1 | 0, request);
          return true;
        } else if (!intersection.equals(rBounds)) {
          var cause = CancellationException_init_$Create$('bringIntoView call interrupted by a newer, non-overlapping call');
          var inductionVariable_0 = this.l8n_1.t1v_1 - 1 | 0;
          if (inductionVariable_0 <= i)
            do {
              var j = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
              var this_3 = this.l8n_1;
              var index_0 = i;
              var tmp_2 = this_3.r1v_1[index_0];
              ((tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE()).o8n_1.ar(cause);
            }
             while (!(j === i));
        }
      }
       while (!(i === last));
    this.l8n_1.j2l(0, request);
    return true;
  };
  protoOf(BringIntoViewRequestPriorityQueue).p8n = function () {
    // Inline function 'androidx.compose.runtime.collection.MutableVector.indices' call
    var this_0 = this.l8n_1;
    var progression = numberRangeToNumber(0, this_0.t1v_1 - 1 | 0);
    var inductionVariable = progression.aa_1;
    var last = progression.ba_1;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
        var this_1 = this.l8n_1;
        var index = i;
        var tmp = this_1.r1v_1[index];
        var this_2 = ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).o8n_1;
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$2 = _Result___init__impl__xyqfz8(Unit_instance);
        this_2.u6(tmp$ret$2);
      }
       while (!(i === last));
    this.l8n_1.h1();
  };
  protoOf(BringIntoViewRequestPriorityQueue).q8n = function (cause) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector.map' call
    var this_0 = this.l8n_1;
    // Inline function 'kotlin.contracts.contract' call
    var tmp = 0;
    var tmp_0 = this_0.t1v_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = fillArrayVal(Array(tmp_0), null);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      // Inline function 'androidx.compose.foundation.gestures.BringIntoViewRequestPriorityQueue.cancelAndRemoveAll.<anonymous>' call
      // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
      var tmp_3 = this_0.r1v_1[tmp_2];
      tmp_1[tmp_2] = ((tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE()).o8n_1;
      tmp = tmp + 1 | 0;
    }
    var inductionVariable = 0;
    var last = tmp_1.length;
    while (inductionVariable < last) {
      var element = tmp_1[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.gestures.BringIntoViewRequestPriorityQueue.cancelAndRemoveAll.<anonymous>' call
      element.ar(cause);
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!this.l8n_1.u()) {
      // Inline function 'androidx.compose.foundation.gestures.BringIntoViewRequestPriorityQueue.cancelAndRemoveAll.<anonymous>' call
      var message = 'uncancelled requests present';
      throw IllegalStateException_init_$Create$(toString(message));
    }
  };
  function ContentInViewNode$launchAnimation$slambda$slambda$lambda(this$0, $this_scroll, $animationJob) {
    return function (delta) {
      var scrollMultiplier = this$0.g8o_1 ? 1.0 : -1.0;
      var adjustedDelta = scrollMultiplier * delta;
      var tmp;
      if (false) {
        println('[ContentInViewModifier] Scroll target changed by \u0394' + delta + ' to ' + ('' + this$0.p8o_1.u8o_1 + ', scrolling by ' + adjustedDelta + ' ') + ('(reverseDirection=' + this$0.g8o_1 + ')'));
        tmp = Unit_instance;
      }
      var consumedScroll = scrollMultiplier * $this_scroll.v8o(adjustedDelta);
      var tmp_0;
      if (false) {
        println('[ContentInViewModifier] Consumed ' + consumedScroll + ' of scroll');
        tmp_0 = Unit_instance;
      }
      var tmp_1;
      // Inline function 'kotlin.math.absoluteValue' call
      var tmp_2 = Math.abs(consumedScroll);
      // Inline function 'kotlin.math.absoluteValue' call
      if (tmp_2 < Math.abs(delta)) {
        // Inline function 'kotlin.math.abs' call
        var tmp_3 = Math.abs(consumedScroll);
        // Inline function 'kotlin.math.abs' call
        var tmp$ret$3 = Math.abs(delta);
        cancel($animationJob, 'Scroll animation cancelled because scroll was not consumed ' + ('(' + tmp_3 + ' < ' + tmp$ret$3 + ')'));
        tmp_1 = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ContentInViewNode$launchAnimation$slambda$slambda$lambda_0(this$0) {
    return function () {
      var tmp;
      if (false) {
        println('[ContentInViewModifier] afterFrame');
        tmp = Unit_instance;
      }
      $l$block_0: {
        // Inline function 'androidx.compose.foundation.gestures.BringIntoViewRequestPriorityQueue.resumeAndRemoveWhile' call
        var this_0 = this$0.i8o_1;
        // Inline function 'kotlin.contracts.contract' call
        while (this_0.l8n_1.nm()) {
          var tmp$ret$0;
          $l$block: {
            // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.launchAnimation.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            var bounds = this_0.l8n_1.t2l().n8n_1();
            if (bounds == null) {
              tmp$ret$0 = true;
              break $l$block;
            }
            // Inline function 'kotlin.also' call
            var this_1 = isMaxVisible$default(bounds, this$0);
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.launchAnimation.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
            if (false ? this_1 : false) {
              println('[ContentInViewModifier] Completed BIV request with bounds ' + bounds);
            }
            tmp$ret$0 = this_1;
          }
          if (tmp$ret$0) {
            // Inline function 'kotlin.coroutines.resume' call
            // Inline function 'androidx.compose.runtime.collection.MutableVector.lastIndex' call
            var tmp$ret$2 = this_0.l8n_1.t1v_1 - 1 | 0;
            var this_2 = this_0.l8n_1.m1(tmp$ret$2).o8n_1;
            // Inline function 'kotlin.Companion.success' call
            var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
            this_2.u6(tmp$ret$3);
          } else {
            break $l$block_0;
          }
        }
      }
      var tmp_0;
      var tmp_1;
      if (this$0.m8o_1) {
        var tmp0_safe_receiver = getFocusedChildBounds(this$0);
        tmp_1 = (tmp0_safe_receiver == null ? null : isMaxVisible$default(tmp0_safe_receiver, this$0)) === true;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        if (false) {
          println('[ContentInViewModifier] Completed tracking focused child request');
        }
        this$0.m8o_1 = false;
        tmp_0 = Unit_instance;
      }
      this$0.p8o_1.u8o_1 = calculateScrollDelta(this$0);
      var tmp_2;
      if (false) {
        println('[ContentInViewModifier] scroll target after frame: ' + this$0.p8o_1.u8o_1);
        tmp_2 = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ContentInViewNode$launchAnimation$slambda$slambda(this$0, $animationJob, resultContinuation) {
    this.e8p_1 = this$0;
    this.f8p_1 = $animationJob;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ContentInViewNode$launchAnimation$slambda$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ContentInViewNode$launchAnimation$slambda$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ContentInViewNode$launchAnimation$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.e8p_1.p8o_1.u8o_1 = calculateScrollDelta(this.e8p_1);
            if (false) {
              println('[ContentInViewModifier] Starting scroll animation down from ' + this.e8p_1.p8o_1.u8o_1 + '\u2026');
            }

            this.ac_1 = 1;
            var tmp_0 = ContentInViewNode$launchAnimation$slambda$slambda$lambda(this.e8p_1, this.g8p_1, this.f8p_1);
            suspendResult = this.e8p_1.p8o_1.j8p(tmp_0, ContentInViewNode$launchAnimation$slambda$slambda$lambda_0(this.e8p_1), this);
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
  protoOf(ContentInViewNode$launchAnimation$slambda$slambda).i8p = function ($this$scroll, completion) {
    var i = new ContentInViewNode$launchAnimation$slambda$slambda(this.e8p_1, this.f8p_1, completion);
    i.g8p_1 = $this$scroll;
    return i;
  };
  function ContentInViewNode$launchAnimation$slambda$slambda_0(this$0, $animationJob, resultContinuation) {
    var i = new ContentInViewNode$launchAnimation$slambda$slambda(this$0, $animationJob, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function getFocusedChildBounds($this) {
    var tmp0_safe_receiver = $this.j8o_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp_0;
      // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.getFocusedChildBounds.<anonymous>' call
      if (tmp0_safe_receiver.k54()) {
        tmp_0 = tmp0_safe_receiver;
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var coordinates = tmp_1;
    var tmp2_safe_receiver = $this.k8o_1;
    var tmp_2;
    if (tmp2_safe_receiver == null) {
      tmp_2 = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp_3;
      // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.getFocusedChildBounds.<anonymous>' call
      if (tmp2_safe_receiver.k54()) {
        tmp_3 = tmp2_safe_receiver;
      } else {
        tmp_3 = null;
      }
      tmp_2 = tmp_3;
    }
    var tmp3_elvis_lhs = tmp_2;
    var tmp_4;
    if (tmp3_elvis_lhs == null) {
      return null;
    } else {
      tmp_4 = tmp3_elvis_lhs;
    }
    var focusedChild = tmp_4;
    return coordinates.j54(focusedChild, false);
  }
  function launchAnimation($this) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!$this.o8o_1) {
      // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.launchAnimation.<anonymous>' call
      var message = 'launchAnimation called when previous animation was running';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    if (false) {
      println('[ContentInViewModifier] launchAnimation');
    }
    var tmp = $this.k4u();
    var tmp_0 = CoroutineStart_UNDISPATCHED_getInstance();
    launch(tmp, VOID, tmp_0, ContentInViewNode$launchAnimation$slambda_0($this, null));
  }
  function calculateScrollDelta($this) {
    if (equals($this.n8o_1, Companion_getInstance_6().c37_1))
      return 0.0;
    var tmp0_elvis_lhs = findBringIntoViewRequest($this);
    var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? $this.m8o_1 ? getFocusedChildBounds($this) : null : tmp0_elvis_lhs;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      return 0.0;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    var rectangleToMakeVisible = tmp;
    var size = toSize($this.n8o_1);
    var tmp_0;
    switch ($this.e8o_1.t9_1) {
      case 0:
        tmp_0 = $this.h8o_1.k8p(rectangleToMakeVisible.b34_1, rectangleToMakeVisible.d34_1 - rectangleToMakeVisible.b34_1, _Size___get_height__impl__a04p02(size));
        break;
      case 1:
        tmp_0 = $this.h8o_1.k8p(rectangleToMakeVisible.a34_1, rectangleToMakeVisible.c34_1 - rectangleToMakeVisible.a34_1, _Size___get_width__impl__58y75t(size));
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp_0;
  }
  function findBringIntoViewRequest($this) {
    var rectangleToMakeVisible = null;
    // Inline function 'androidx.compose.foundation.gestures.BringIntoViewRequestPriorityQueue.forEachFromSmallest' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector.forEachReversed' call
    var this_0 = $this.i8o_1.l8n_1;
    // Inline function 'kotlin.contracts.contract' call
    var size = this_0.t1v_1;
    if (size > 0) {
      var i = size - 1 | 0;
      var tmp = this_0.r1v_1;
      var content = isArray(tmp) ? tmp : THROW_CCE();
      do {
        // Inline function 'androidx.compose.foundation.gestures.BringIntoViewRequestPriorityQueue.forEachFromSmallest.<anonymous>' call
        var it = content[i];
        $l$block: {
          // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.findBringIntoViewRequest.<anonymous>' call
          var bounds = it.n8n_1();
          if (bounds == null) {
            break $l$block;
          }
          if (compareTo_1(bounds.g34(), $this, toSize($this.n8o_1)) <= 0) {
            rectangleToMakeVisible = bounds;
          } else {
            var tmp0_elvis_lhs = rectangleToMakeVisible;
            return tmp0_elvis_lhs == null ? bounds : tmp0_elvis_lhs;
          }
        }
        i = i - 1 | 0;
      }
       while (i >= 0);
    }
    return rectangleToMakeVisible;
  }
  function computeDestination($this, childBounds, containerSize) {
    return childBounds.h34(Offset__unaryMinus_impl_ssu2iv(relocationOffset($this, childBounds, containerSize)));
  }
  function isMaxVisible(_this__u8e3s4, $this, size) {
    var relocationOffset_0 = relocationOffset($this, _this__u8e3s4, size);
    var tmp;
    // Inline function 'kotlin.math.abs' call
    var x = _Offset___get_x__impl__xvi35n(relocationOffset_0);
    if (Math.abs(x) <= 0.5) {
      // Inline function 'kotlin.math.abs' call
      var x_0 = _Offset___get_y__impl__8bzhra(relocationOffset_0);
      tmp = Math.abs(x_0) <= 0.5;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function isMaxVisible$default(_this__u8e3s4, $this, size, $super) {
    size = size === VOID ? $this.n8o_1 : size;
    return isMaxVisible(_this__u8e3s4, $this, size);
  }
  function relocationOffset($this, childBounds, containerSize) {
    var size = toSize(containerSize);
    var tmp;
    switch ($this.e8o_1.t9_1) {
      case 0:
        tmp = Offset_0(0.0, $this.h8o_1.k8p(childBounds.b34_1, childBounds.d34_1 - childBounds.b34_1, _Size___get_height__impl__a04p02(size)));
        break;
      case 1:
        tmp = Offset_0($this.h8o_1.k8p(childBounds.a34_1, childBounds.c34_1 - childBounds.a34_1, _Size___get_width__impl__58y75t(size)), 0.0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function compareTo_0(_this__u8e3s4, $this, other) {
    var tmp;
    switch ($this.e8o_1.t9_1) {
      case 1:
        tmp = compareTo(_IntSize___get_width__impl__d9yl4o(_this__u8e3s4), _IntSize___get_width__impl__d9yl4o(other));
        break;
      case 0:
        tmp = compareTo(_IntSize___get_height__impl__prv63b(_this__u8e3s4), _IntSize___get_height__impl__prv63b(other));
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function compareTo_1(_this__u8e3s4, $this, other) {
    var tmp;
    switch ($this.e8o_1.t9_1) {
      case 1:
        tmp = compareTo(_Size___get_width__impl__58y75t(_this__u8e3s4), _Size___get_width__impl__58y75t(other));
        break;
      case 0:
        tmp = compareTo(_Size___get_height__impl__a04p02(_this__u8e3s4), _Size___get_height__impl__a04p02(other));
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function Request(currentBounds, continuation) {
    this.n8n_1 = currentBounds;
    this.o8n_1 = continuation;
  }
  protoOf(Request).toString = function () {
    var tmp0_safe_receiver = this.o8n_1.t6().hc(Key_instance_0);
    var name = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m8p_1;
    var tmp = 'Request@' + toString_0(hashCode(this), 16);
    var tmp_0;
    if (name == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.gestures.Request.toString.<anonymous>' call
      tmp_0 = '[' + name + '](';
    }
    var tmp2_elvis_lhs = tmp_0;
    return tmp + (tmp2_elvis_lhs == null ? '(' : tmp2_elvis_lhs) + ('currentBounds()=' + this.n8n_1() + ', ') + ('continuation=' + this.o8n_1 + ')');
  };
  function ContentInViewNode$launchAnimation$slambda(this$0, resultContinuation) {
    this.v8p_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ContentInViewNode$launchAnimation$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ContentInViewNode$launchAnimation$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ContentInViewNode$launchAnimation$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.x8p_1 = null;
            this.y8p_1 = get_job(this.w8p_1.jo());
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 4;
            this.bc_1 = 3;
            this.v8p_1.o8o_1 = true;
            this.ac_1 = 2;
            var tmp_0 = this.v8p_1.f8o_1;
            suspendResult = tmp_0.a8q(VOID, ContentInViewNode$launchAnimation$slambda$slambda_0(this.v8p_1, this.y8p_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            if (false) {
              println('[ContentInViewModifier] animation completed successfully, resuming' + (' ' + this.v8p_1.i8o_1.m() + ' remaining BIV requests\u2026'));
            }

            var tmp_1 = this;
            this.v8p_1.i8o_1.p8n();
            tmp_1.z8p_1 = Unit_instance;
            this.bc_1 = 5;
            this.ac_1 = 6;
            continue $sm;
          case 3:
            this.bc_1 = 4;
            var tmp_2 = this.dc_1;
            if (tmp_2 instanceof CancellationException) {
              var e = this.dc_1;
              var tmp_3 = this;
              this.x8p_1 = e;
              throw e;
            } else {
              throw this.dc_1;
            }

          case 4:
            this.bc_1 = 5;
            var t = this.dc_1;
            if (false) {
              println('[ContentInViewModifier] animation completed with ' + this.v8p_1.i8o_1.m() + ' ' + 'unsatisfied BIV requests');
              var tmp0_safe_receiver = this.x8p_1;
              if (tmp0_safe_receiver == null)
                null;
              else {
                printStackTrace(tmp0_safe_receiver);
              }
            }

            this.v8p_1.o8o_1 = false;
            this.v8p_1.i8o_1.q8n(this.x8p_1);
            this.v8p_1.m8o_1 = false;
            throw t;
          case 5:
            throw this.dc_1;
          case 6:
            this.bc_1 = 5;
            if (false) {
              println('[ContentInViewModifier] animation completed with ' + this.v8p_1.i8o_1.m() + ' ' + 'unsatisfied BIV requests');
              var tmp0_safe_receiver_0 = this.x8p_1;
              if (tmp0_safe_receiver_0 == null)
                null;
              else {
                printStackTrace(tmp0_safe_receiver_0);
              }
            }

            this.v8p_1.o8o_1 = false;
            this.v8p_1.i8o_1.q8n(this.x8p_1);
            this.v8p_1.m8o_1 = false;
            return Unit_instance;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 5) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  protoOf(ContentInViewNode$launchAnimation$slambda).x1e = function ($this$launch, completion) {
    var i = new ContentInViewNode$launchAnimation$slambda(this.v8p_1, completion);
    i.w8p_1 = $this$launch;
    return i;
  };
  function ContentInViewNode$launchAnimation$slambda_0(this$0, resultContinuation) {
    var i = new ContentInViewNode$launchAnimation$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $bringChildIntoViewCOROUTINE$4(_this__u8e3s4, localRect, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.j8q_1 = _this__u8e3s4;
    this.k8q_1 = localRect;
  }
  protoOf($bringChildIntoViewCOROUTINE$4).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp0_safe_receiver = this.k8q_1();
            if (!((tmp0_safe_receiver == null ? null : isMaxVisible$default(tmp0_safe_receiver, this.j8q_1)) === false))
              return Unit_instance;
            this.ac_1 = 1;
            var cancellable = new CancellableContinuationImpl(intercepted(this), get_MODE_CANCELLABLE());
            cancellable.vs();
            var request = new Request(this.k8q_1, cancellable);
            if (false) {
              println('[ContentInViewModifier] Registering bringChildIntoView request: ' + request);
            }

            if (this.j8q_1.i8o_1.m8n(request) ? !this.j8q_1.o8o_1 : false) {
              launchAnimation(this.j8q_1);
            }

            suspendResult = returnIfSuspended(cancellable.mq(), this);
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
  function ContentInViewNode(orientation, scrollState, reverseDirection, bringIntoViewSpec) {
    Node.call(this);
    this.e8o_1 = orientation;
    this.f8o_1 = scrollState;
    this.g8o_1 = reverseDirection;
    this.h8o_1 = bringIntoViewSpec;
    this.i8o_1 = new BringIntoViewRequestPriorityQueue();
    this.j8o_1 = null;
    this.k8o_1 = null;
    this.l8o_1 = null;
    this.m8o_1 = false;
    this.n8o_1 = Companion_getInstance_6().c37_1;
    this.o8o_1 = false;
    this.p8o_1 = new UpdatableAnimationState(this.h8o_1.l8q());
  }
  protoOf(ContentInViewNode).m8q = function (localRect) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!equals(this.n8o_1, Companion_getInstance_6().c37_1)) {
      // Inline function 'androidx.compose.foundation.gestures.ContentInViewNode.calculateRectForParent.<anonymous>' call
      var message = 'Expected BringIntoViewRequester to not be used before parents are placed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return computeDestination(this, localRect, this.n8o_1);
  };
  protoOf(ContentInViewNode).n8q = function (localRect, $completion) {
    var tmp = new $bringChildIntoViewCOROUTINE$4(this, localRect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ContentInViewNode).o8q = function (newBounds) {
    this.k8o_1 = newBounds;
  };
  protoOf(ContentInViewNode).m5s = function (coordinates) {
    this.j8o_1 = coordinates;
  };
  protoOf(ContentInViewNode).n5s = function (size) {
    var oldSize = this.n8o_1;
    this.n8o_1 = size;
    if (compareTo_0(size, this, oldSize) >= 0)
      return Unit_instance;
    if (false) {
      println('[ContentInViewModifier] viewport shrunk: ' + new IntSize(oldSize) + ' -> ' + new IntSize(size));
    }
    var tmp0_safe_receiver = getFocusedChildBounds(this);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (false) {
        println('[ContentInViewModifier] focused child bounds: ' + tmp0_safe_receiver);
      }
      var tmp0_elvis_lhs = this.l8o_1;
      var previousFocusedChildBounds = tmp0_elvis_lhs == null ? tmp0_safe_receiver : tmp0_elvis_lhs;
      if (((!this.o8o_1 ? !this.m8o_1 : false) ? isMaxVisible(previousFocusedChildBounds, this, oldSize) : false) ? !isMaxVisible(tmp0_safe_receiver, this, size) : false) {
        if (false) {
          println('[ContentInViewModifier] focused child was clipped by viewport shrink: ' + tmp0_safe_receiver);
        }
        this.m8o_1 = true;
        launchAnimation(this);
      }
      this.l8o_1 = tmp0_safe_receiver;
    }
  };
  protoOf(ContentInViewNode).p8q = function (orientation, state, reverseDirection, bringIntoViewSpec) {
    this.e8o_1 = orientation;
    this.f8o_1 = state;
    this.g8o_1 = reverseDirection;
    this.h8o_1 = bringIntoViewSpec;
  };
  function get_HorizontalPointerDirectionConfig() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return HorizontalPointerDirectionConfig;
  }
  var HorizontalPointerDirectionConfig;
  function get_VerticalPointerDirectionConfig() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return VerticalPointerDirectionConfig;
  }
  var VerticalPointerDirectionConfig;
  var BidirectionalPointerDirectionConfig;
  function get_mouseSlop() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return mouseSlop;
  }
  var mouseSlop;
  function get_defaultTouchSlop() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return defaultTouchSlop;
  }
  var defaultTouchSlop;
  function get_mouseToTouchSlopRatio() {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return mouseToTouchSlopRatio;
  }
  var mouseToTouchSlopRatio;
  function toPointerDirectionConfig(_this__u8e3s4) {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return _this__u8e3s4.equals(Orientation_Vertical_getInstance()) ? get_VerticalPointerDirectionConfig() : get_HorizontalPointerDirectionConfig();
  }
  function isPointerUp(_this__u8e3s4, pointerId) {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.util.fastFirstOrNull' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_0 = _this__u8e3s4.b5f_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.ui.util.fastFirstOrNull.<anonymous>' call
          // Inline function 'androidx.compose.foundation.gestures.isPointerUp.<anonymous>' call
          if (equals(item.h5f_1, pointerId)) {
            tmp$ret$1 = item;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    return !((tmp0_safe_receiver == null ? null : tmp0_safe_receiver.k5f_1) === true);
  }
  function pointerSlop(_this__u8e3s4, pointerType) {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return pointerType === Companion_getInstance_7().a5h_1 ? _this__u8e3s4.v68() * get_mouseToTouchSlopRatio() : _this__u8e3s4.v68();
  }
  function drag(_this__u8e3s4, pointerId, onDrag, $completion) {
    var tmp = new $dragCOROUTINE$8(_this__u8e3s4, pointerId, onDrag, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function awaitLongPressOrCancellation(_this__u8e3s4, pointerId, $completion) {
    var tmp = new $awaitLongPressOrCancellationCOROUTINE$9(_this__u8e3s4, pointerId, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function awaitDragOrCancellation(_this__u8e3s4, pointerId, $completion) {
    var tmp = new $awaitDragOrCancellationCOROUTINE$10(_this__u8e3s4, pointerId, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function isPointerUp$accessor$10dvge3(_this__u8e3s4, pointerId) {
    _init_properties_DragGestureDetector_kt__sw7hnt();
    return isPointerUp(_this__u8e3s4, pointerId);
  }
  function HorizontalPointerDirectionConfig$1() {
  }
  protoOf(HorizontalPointerDirectionConfig$1).f8s = function (offset) {
    // Inline function 'kotlin.math.abs' call
    var x = _Offset___get_x__impl__xvi35n(offset);
    return Math.abs(x);
  };
  protoOf(HorizontalPointerDirectionConfig$1).g8s = function (totalPositionChange, touchSlop) {
    var tmp = _Offset___get_x__impl__xvi35n(totalPositionChange);
    // Inline function 'kotlin.math.sign' call
    var x = _Offset___get_x__impl__xvi35n(totalPositionChange);
    var finalMainPositionChange = tmp - sign(x) * touchSlop;
    return Offset_0(finalMainPositionChange, _Offset___get_y__impl__8bzhra(totalPositionChange));
  };
  function VerticalPointerDirectionConfig$1() {
  }
  protoOf(VerticalPointerDirectionConfig$1).f8s = function (offset) {
    // Inline function 'kotlin.math.abs' call
    var x = _Offset___get_y__impl__8bzhra(offset);
    return Math.abs(x);
  };
  protoOf(VerticalPointerDirectionConfig$1).g8s = function (totalPositionChange, touchSlop) {
    var tmp = _Offset___get_y__impl__8bzhra(totalPositionChange);
    // Inline function 'kotlin.math.sign' call
    var x = _Offset___get_y__impl__8bzhra(totalPositionChange);
    var finalMainPositionChange = tmp - sign(x) * touchSlop;
    return Offset_0(_Offset___get_x__impl__xvi35n(totalPositionChange), finalMainPositionChange);
  };
  function BidirectionalPointerDirectionConfig$1() {
  }
  protoOf(BidirectionalPointerDirectionConfig$1).f8s = function (offset) {
    return Offset__getDistance_impl_pclvxn(offset);
  };
  protoOf(BidirectionalPointerDirectionConfig$1).g8s = function (totalPositionChange, touchSlop) {
    var touchSlopOffset = Offset__times_impl_jz1mli(Offset__div_impl_eaxtg1(totalPositionChange, this.f8s(totalPositionChange)), touchSlop);
    return Offset__minus_impl_hoj2c0(totalPositionChange, touchSlopOffset);
  };
  function awaitLongPressOrCancellation$slambda($currentDown, $longPress, resultContinuation) {
    this.p8s_1 = $currentDown;
    this.q8s_1 = $longPress;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(awaitLongPressOrCancellation$slambda).u8s = function ($this$withTimeout, $completion) {
    var tmp = this.v8s($this$withTimeout, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(awaitLongPressOrCancellation$slambda).yc = function (p1, $completion) {
    return this.u8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(awaitLongPressOrCancellation$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.s8s_1 = false;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!!this.s8s_1) {
              this.ac_1 = 4;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = this.r8s_1.j5m(PointerEventPass_Main_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.t8s_1 = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = this.t8s_1.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (!changedToUpIgnoreConsumed(item)) {
                    tmp$ret$0 = false;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = true;
            }
             while (false);
            if (tmp$ret$0) {
              this.s8s_1 = true;
            }

            var tmp$ret$2;
            l$ret$3: do {
              var this_1 = this.t8s_1.b5f_1;
              var inductionVariable_0 = 0;
              var last_0 = this_1.m() - 1 | 0;
              if (inductionVariable_0 <= last_0)
                do {
                  var index_0 = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  var item_0 = this_1.n(index_0);
                  if (item_0.d5h() ? true : isOutOfBounds(item_0, this.r8s_1.u5f(), this.r8s_1.h5m())) {
                    tmp$ret$2 = true;
                    break l$ret$3;
                  }
                }
                 while (inductionVariable_0 <= last_0);
              tmp$ret$2 = false;
            }
             while (false);
            if (tmp$ret$2) {
              this.s8s_1 = true;
            }

            this.ac_1 = 3;
            suspendResult = this.r8s_1.j5m(PointerEventPass_Final_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var consumeCheck = suspendResult;
            var tmp$ret$4;
            l$ret$5: do {
              var this_2 = consumeCheck.b5f_1;
              var inductionVariable_1 = 0;
              var last_1 = this_2.m() - 1 | 0;
              if (inductionVariable_1 <= last_1)
                do {
                  var index_1 = inductionVariable_1;
                  inductionVariable_1 = inductionVariable_1 + 1 | 0;
                  var item_1 = this_2.n(index_1);
                  if (item_1.d5h()) {
                    tmp$ret$4 = true;
                    break l$ret$5;
                  }
                }
                 while (inductionVariable_1 <= last_1);
              tmp$ret$4 = false;
            }
             while (false);
            if (tmp$ret$4) {
              this.s8s_1 = true;
            }

            if (isPointerUp$accessor$10dvge3(this.t8s_1, this.p8s_1._v.h5f_1)) {
              var tmp$ret$6;
              l$ret$7: do {
                var this_3 = this.t8s_1.b5f_1;
                var inductionVariable_2 = 0;
                var last_2 = this_3.m() - 1 | 0;
                if (inductionVariable_2 <= last_2)
                  do {
                    var index_2 = inductionVariable_2;
                    inductionVariable_2 = inductionVariable_2 + 1 | 0;
                    var item_2 = this_3.n(index_2);
                    if (item_2.k5f_1) {
                      tmp$ret$6 = item_2;
                      break l$ret$7;
                    }
                  }
                   while (inductionVariable_2 <= last_2);
                tmp$ret$6 = null;
              }
               while (false);
              var newPressed = tmp$ret$6;
              if (!(newPressed == null)) {
                this.p8s_1._v = newPressed;
                this.q8s_1._v = this.p8s_1._v;
              } else {
                this.s8s_1 = true;
              }
            } else {
              var tmp$ret$8;
              l$ret$9: do {
                var this_4 = this.t8s_1.b5f_1;
                var inductionVariable_3 = 0;
                var last_3 = this_4.m() - 1 | 0;
                if (inductionVariable_3 <= last_3)
                  do {
                    var index_3 = inductionVariable_3;
                    inductionVariable_3 = inductionVariable_3 + 1 | 0;
                    var item_3 = this_4.n(index_3);
                    if (equals(item_3.h5f_1, this.p8s_1._v.h5f_1)) {
                      tmp$ret$8 = item_3;
                      break l$ret$9;
                    }
                  }
                   while (inductionVariable_3 <= last_3);
                tmp$ret$8 = null;
              }
               while (false);
              this.q8s_1._v = tmp$ret$8;
            }

            this.ac_1 = 1;
            continue $sm;
          case 4:
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
  protoOf(awaitLongPressOrCancellation$slambda).v8s = function ($this$withTimeout, completion) {
    var i = new awaitLongPressOrCancellation$slambda(this.p8s_1, this.q8s_1, completion);
    i.r8s_1 = $this$withTimeout;
    return i;
  };
  function awaitLongPressOrCancellation$slambda_0($currentDown, $longPress, resultContinuation) {
    var i = new awaitLongPressOrCancellation$slambda($currentDown, $longPress, resultContinuation);
    var l = function ($this$withTimeout, $completion) {
      return i.u8s($this$withTimeout, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $dragCOROUTINE$8(_this__u8e3s4, pointerId, onDrag, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.y8q_1 = _this__u8e3s4;
    this.z8q_1 = pointerId;
    this.a8r_1 = onDrag;
  }
  protoOf($dragCOROUTINE$8).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.b8r_1 = this.z8q_1;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!true) {
              this.ac_1 = 4;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = awaitDragOrCancellation(this.y8q_1, this.b8r_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var tmp0_elvis_lhs = suspendResult;
            var tmp_0;
            if (tmp0_elvis_lhs == null) {
              return false;
            } else {
              tmp_0 = tmp0_elvis_lhs;
            }

            var change = tmp_0;
            if (changedToUpIgnoreConsumed(change)) {
              return true;
            }

            this.a8r_1(change);
            this.b8r_1 = change.h5f_1;
            this.ac_1 = 1;
            continue $sm;
          case 3:
            throw this.dc_1;
          case 4:
            return Unit_instance;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $awaitLongPressOrCancellationCOROUTINE$9(_this__u8e3s4, pointerId, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.k8r_1 = _this__u8e3s4;
    this.l8r_1 = pointerId;
  }
  protoOf($awaitLongPressOrCancellationCOROUTINE$9).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (isPointerUp$accessor$10dvge3(this.k8r_1.f5m(), this.l8r_1)) {
              return null;
            }

            var tmp_0 = this;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = this.k8r_1.f5m().b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (equals(item.h5f_1, this.l8r_1)) {
                    tmp$ret$0 = item;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = null;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              return null;
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }

            tmp_0.m8r_1 = tmp_1;
            this.n8r_1 = {_v: null};
            this.o8r_1 = {_v: this.m8r_1};
            this.p8r_1 = this.k8r_1.g5m().t68();
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.k8r_1.l5m(this.p8r_1, awaitLongPressOrCancellation$slambda_0(this.o8r_1, this.n8r_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.q8r_1 = null;
            this.bc_1 = 3;
            this.ac_1 = 4;
            continue $sm;
          case 2:
            this.bc_1 = 3;
            var tmp_2 = this.dc_1;
            if (tmp_2 instanceof PointerEventTimeoutCancellationException) {
              var _ = this.dc_1;
              var tmp_3 = this;
              var tmp1_elvis_lhs = this.n8r_1._v;
              tmp_3.q8r_1 = tmp1_elvis_lhs == null ? this.m8r_1 : tmp1_elvis_lhs;
              this.ac_1 = 4;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            return this.q8r_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $awaitDragOrCancellationCOROUTINE$10(_this__u8e3s4, pointerId, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.z8r_1 = _this__u8e3s4;
    this.a8s_1 = pointerId;
  }
  protoOf($awaitDragOrCancellationCOROUTINE$10).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 7;
            if (isPointerUp$accessor$10dvge3(this.z8r_1.f5m(), this.a8s_1)) {
              return null;
            }

            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0 = this;
            tmp_0.c8s_1 = this.z8r_1;
            var tmp_1 = this;
            tmp_1.d8s_1 = this.a8s_1;
            this.e8s_1 = this.d8s_1;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            if (!true) {
              this.ac_1 = 8;
              continue $sm;
            }

            this.ac_1 = 3;
            suspendResult = this.c8s_1.k5m(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var event = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = event.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (equals(item.h5f_1, this.e8s_1)) {
                    tmp$ret$0 = item;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = null;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$0;
            var WHEN_RESULT;
            if (tmp0_elvis_lhs == null) {
              this.b8s_1 = null;
              this.ac_1 = 9;
              continue $sm;
            } else {
              WHEN_RESULT = tmp0_elvis_lhs;
              this.ac_1 = 4;
              continue $sm;
            }

          case 4:
            var dragEvent = WHEN_RESULT;
            if (changedToUpIgnoreConsumed(dragEvent)) {
              var tmp$ret$4;
              l$ret$5: do {
                var this_1 = event.b5f_1;
                var inductionVariable_0 = 0;
                var last_0 = this_1.m() - 1 | 0;
                if (inductionVariable_0 <= last_0)
                  do {
                    var index_0 = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    var item_0 = this_1.n(index_0);
                    if (item_0.k5f_1) {
                      tmp$ret$4 = item_0;
                      break l$ret$5;
                    }
                  }
                   while (inductionVariable_0 <= last_0);
                tmp$ret$4 = null;
              }
               while (false);
              var otherDown = tmp$ret$4;
              if (otherDown == null) {
                this.b8s_1 = dragEvent;
                this.ac_1 = 9;
                continue $sm;
              } else {
                this.e8s_1 = otherDown.h5f_1;
                this.ac_1 = 5;
                continue $sm;
              }
            } else {
              if (positionChangedIgnoreConsumed(dragEvent)) {
                this.b8s_1 = dragEvent;
                this.ac_1 = 9;
                continue $sm;
              } else {
                this.ac_1 = 6;
                continue $sm;
              }
            }

          case 5:
            this.ac_1 = 6;
            continue $sm;
          case 6:
            this.ac_1 = 2;
            continue $sm;
          case 7:
            throw this.dc_1;
          case 8:
            if (false) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 9;
            continue $sm;
          case 9:
            var change = this.b8s_1;
            var tmp_2;
            if ((change == null ? null : change.d5h()) === false) {
              tmp_2 = change;
            } else {
              tmp_2 = null;
            }

            return tmp_2;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 7) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  var properties_initialized_DragGestureDetector_kt_xqxw6j;
  function _init_properties_DragGestureDetector_kt__sw7hnt() {
    if (!properties_initialized_DragGestureDetector_kt_xqxw6j) {
      properties_initialized_DragGestureDetector_kt_xqxw6j = true;
      HorizontalPointerDirectionConfig = new HorizontalPointerDirectionConfig$1();
      VerticalPointerDirectionConfig = new VerticalPointerDirectionConfig$1();
      BidirectionalPointerDirectionConfig = new BidirectionalPointerDirectionConfig$1();
      // Inline function 'androidx.compose.ui.unit.dp' call
      mouseSlop = _Dp___init__impl__ms3zkb(0.125);
      // Inline function 'androidx.compose.ui.unit.dp' call
      defaultTouchSlop = _Dp___init__impl__ms3zkb(18);
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      var this_0 = get_mouseSlop();
      var other = get_defaultTouchSlop();
      mouseToTouchSlopRatio = _Dp___get_value__impl__geb1vb(this_0) / _Dp___get_value__impl__geb1vb(other);
    }
  }
  function get_NoOpDragScope() {
    _init_properties_Draggable_kt__eqnzl1();
    return NoOpDragScope;
  }
  var NoOpDragScope;
  function DragScope() {
  }
  function DraggableNode$abstractDragScope$1(this$0) {
    this.x8s_1 = this$0;
  }
  protoOf(DraggableNode$abstractDragScope$1).y8s = function (pixels) {
    this.x8s_1.e8u_1.w8s(toFloat(pixels, this.x8s_1.d8u_1));
  };
  function DraggableNode$drag$slambda(this$0, $block, resultContinuation) {
    this.p8u_1 = this$0;
    this.q8u_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(DraggableNode$drag$slambda).s8u = function ($this$drag, $completion) {
    var tmp = this.t8u($this$drag, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(DraggableNode$drag$slambda).yc = function (p1, $completion) {
    return this.s8u((!(p1 == null) ? isInterface(p1, DragScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(DraggableNode$drag$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.p8u_1.e8u_1 = this.r8u_1;
            this.ac_1 = 1;
            suspendResult = this.q8u_1(this.p8u_1.f8u_1, this);
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
  protoOf(DraggableNode$drag$slambda).t8u = function ($this$drag, completion) {
    var i = new DraggableNode$drag$slambda(this.p8u_1, this.q8u_1, completion);
    i.r8u_1 = $this$drag;
    return i;
  };
  function DraggableNode$drag$slambda_0(this$0, $block, resultContinuation) {
    var i = new DraggableNode$drag$slambda(this$0, $block, resultContinuation);
    var l = function ($this$drag, $completion) {
      return i.s8u($this$drag, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function DraggableNode(state, canDrag, orientation, enabled, interactionSource, startDragImmediately, onDragStarted, onDragStopped, reverseDirection) {
    AbstractDraggableNode.call(this, canDrag, enabled, interactionSource, startDragImmediately, onDragStarted, onDragStopped, reverseDirection);
    this.c8u_1 = state;
    this.d8u_1 = orientation;
    this.e8u_1 = get_NoOpDragScope();
    var tmp = this;
    tmp.f8u_1 = new DraggableNode$abstractDragScope$1(this);
    this.g8u_1 = toPointerDirectionConfig(this.d8u_1);
  }
  protoOf(DraggableNode).u8u = function (block, $completion) {
    var tmp = this.c8u_1;
    var tmp_0 = MutatePriority_UserInput_getInstance();
    return tmp.v8u(tmp_0, DraggableNode$drag$slambda_0(this, block, null), $completion);
  };
  protoOf(DraggableNode).w8u = function (_this__u8e3s4, dragDelta, $completion) {
    _this__u8e3s4.y8s(dragDelta.x8u_1);
    return Unit_instance;
  };
  protoOf(DraggableNode).y8u = function () {
    return this.g8u_1;
  };
  protoOf(DraggableNode).z8u = function (state, canDrag, orientation, enabled, interactionSource, startDragImmediately, onDragStarted, onDragStopped, reverseDirection) {
    var resetPointerInputHandling = false;
    if (!equals(this.c8u_1, state)) {
      this.c8u_1 = state;
      resetPointerInputHandling = true;
    }
    this.p8v_1 = canDrag;
    if (!this.d8u_1.equals(orientation)) {
      this.d8u_1 = orientation;
      resetPointerInputHandling = true;
    }
    if (!(this.q8v_1 === enabled)) {
      this.q8v_1 = enabled;
      if (!enabled) {
        this.k87();
      }
      resetPointerInputHandling = true;
    }
    if (!equals(this.r8v_1, interactionSource)) {
      this.k87();
      this.r8v_1 = interactionSource;
    }
    this.s8v_1 = startDragImmediately;
    this.t8v_1 = onDragStarted;
    this.u8v_1 = onDragStopped;
    if (!(this.v8v_1 === reverseDirection)) {
      this.v8v_1 = reverseDirection;
      resetPointerInputHandling = true;
    }
    if (resetPointerInputHandling) {
      this.a8w_1.w5m();
    }
  };
  function AbstractDraggableNode$startListeningForEvents$slambda$slambda($event, this$0, resultContinuation) {
    this.l8w_1 = $event;
    this.m8w_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda$slambda).s8w = function ($this$drag, $completion) {
    var tmp = this.t8w($this$drag, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda$slambda).yc = function (p1, $completion) {
    return this.s8w((!(p1 == null) ? isInterface(p1, AbstractDragScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0;
            var tmp_1 = this.l8w_1._v;
            if (!(tmp_1 instanceof DragStopped)) {
              var tmp_2 = this.l8w_1._v;
              tmp_0 = !(tmp_2 instanceof DragCancelled);
            } else {
              tmp_0 = false;
            }

            if (!tmp_0) {
              this.ac_1 = 6;
              continue $sm;
            }

            var tmp_3 = this;
            var tmp_4 = this.l8w_1._v;
            tmp_3.o8w_1 = tmp_4 instanceof DragDelta ? tmp_4 : null;
            if (this.o8w_1 == null) {
              this.p8w_1 = null;
              this.ac_1 = 3;
              continue $sm;
            } else {
              var tmp_5 = this;
              tmp_5.q8w_1 = this.o8w_1;
              var tmp_6 = this;
              tmp_6.r8w_1 = this.q8w_1;
              this.ac_1 = 2;
              var tmp_7 = this.l8w_1._v;
              suspendResult = this.m8w_1.w8u(this.n8w_1, tmp_7 instanceof DragDelta ? tmp_7 : THROW_CCE(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            var tmp_8 = this;
            tmp_8.p8w_1 = Unit_instance;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ac_1 = 4;
            suspendResult = this.m8w_1.b8w_1.l16(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            var ARGUMENT = suspendResult;
            this.l8w_1._v = ARGUMENT;
            this.ac_1 = 1;
            continue $sm;
          case 5:
            throw this.dc_1;
          case 6:
            return Unit_instance;
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
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda$slambda).t8w = function ($this$drag, completion) {
    var i = new AbstractDraggableNode$startListeningForEvents$slambda$slambda(this.l8w_1, this.m8w_1, completion);
    i.n8w_1 = $this$drag;
    return i;
  };
  function AbstractDraggableNode$startListeningForEvents$slambda$slambda_0($event, this$0, resultContinuation) {
    var i = new AbstractDraggableNode$startListeningForEvents$slambda$slambda($event, this$0, resultContinuation);
    var l = function ($this$drag, $completion) {
      return i.s8w($this$drag, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda$lambda(this$0) {
    return function (event) {
      return !(this$0.y8u().f8s(positionChangeIgnoreConsumed(event)) === 0.0);
    };
  }
  function AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda($this_coroutineScope, this$0, resultContinuation) {
    this.c8x_1 = $this_coroutineScope;
    this.d8x_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda).u8s = function ($this$awaitPointerEventScope, $completion) {
    var tmp = this.v8s($this$awaitPointerEventScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda).yc = function (p1, $completion) {
    return this.u8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 10;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!get_isActive(this.c8x_1)) {
              this.ac_1 = 9;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = awaitDownAndSlop(this.e8x_1, this.d8x_1.w8v_1, this.d8x_1.x8v_1, this.d8x_1.y8v_1, this.d8x_1.y8u(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.f8x_1 = suspendResult;
            if (this.f8x_1 == null) {
              this.g8x_1 = null;
              this.ac_1 = 8;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.h8x_1 = this.f8x_1;
              var tmp_1 = this;
              tmp_1.i8x_1 = this.h8x_1;
              if (!this.d8x_1.z8v_1) {
                startListeningForEvents(this.d8x_1);
              }
              this.j8x_1 = false;
              this.ac_1 = 3;
              continue $sm;
            }

          case 3:
            this.bc_1 = 6;
            this.bc_1 = 5;
            this.ac_1 = 4;
            var tmp_2 = this.d8x_1.v8v_1;
            suspendResult = awaitDrag(this.e8x_1, this.i8x_1.pe_1, this.i8x_1.qe_1.x33_1, this.d8x_1.y8v_1, this.d8x_1.b8w_1, tmp_2, AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda$lambda(this.d8x_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            var tmp_3 = this;
            this.j8x_1 = suspendResult;
            tmp_3.k8x_1 = Unit_instance;
            this.bc_1 = 10;
            this.ac_1 = 7;
            continue $sm;
          case 5:
            this.bc_1 = 6;
            var tmp_4 = this.dc_1;
            if (tmp_4 instanceof CancellationException) {
              var cancellation = this.dc_1;
              var tmp_5 = this;
              this.j8x_1 = false;
              var tmp_6;
              if (!get_isActive(this.c8x_1)) {
                throw cancellation;
              }
              tmp_5.k8x_1 = tmp_6;
              this.bc_1 = 10;
              this.ac_1 = 7;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 6:
            this.bc_1 = 10;
            var t = this.dc_1;
            var maximumVelocity = currentValueOf(this.d8x_1, get_LocalViewConfiguration()).w68();
            var tmp_7;
            if (this.j8x_1) {
              var velocity = this.d8x_1.y8v_1.p5n(Velocity(maximumVelocity, maximumVelocity));
              this.d8x_1.y8v_1.r5n();
              tmp_7 = new DragStopped(Velocity__times_impl_yav0ik(velocity, this.d8x_1.v8v_1 ? -1.0 : 1.0));
            } else {
              tmp_7 = DragCancelled_getInstance();
            }

            var event = tmp_7;
            this.d8x_1.b8w_1.i16(event);
            throw t;
          case 7:
            this.bc_1 = 10;
            var tmp_8 = this;
            var maximumVelocity_0 = currentValueOf(this.d8x_1, get_LocalViewConfiguration()).w68();
            var tmp_9;
            if (this.j8x_1) {
              var velocity_0 = this.d8x_1.y8v_1.p5n(Velocity(maximumVelocity_0, maximumVelocity_0));
              this.d8x_1.y8v_1.r5n();
              tmp_9 = new DragStopped(Velocity__times_impl_yav0ik(velocity_0, this.d8x_1.v8v_1 ? -1.0 : 1.0));
            } else {
              tmp_9 = DragCancelled_getInstance();
            }

            var event_0 = tmp_9;
            this.d8x_1.b8w_1.i16(event_0);
            tmp_8.g8x_1 = Unit_instance;
            this.ac_1 = 8;
            continue $sm;
          case 8:
            this.ac_1 = 1;
            continue $sm;
          case 9:
            return Unit_instance;
          case 10:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 10) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda).v8s = function ($this$awaitPointerEventScope, completion) {
    var i = new AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda(this.c8x_1, this.d8x_1, completion);
    i.e8x_1 = $this$awaitPointerEventScope;
    return i;
  };
  function AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda_0($this_coroutineScope, this$0, resultContinuation) {
    var i = new AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda($this_coroutineScope, this$0, resultContinuation);
    var l = function ($this$awaitPointerEventScope, $completion) {
      return i.u8s($this$awaitPointerEventScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function AbstractDraggableNode$pointerInputNode$slambda$slambda($this_SuspendingPointerInputModifierNode, this$0, resultContinuation) {
    this.t8x_1 = $this_SuspendingPointerInputModifierNode;
    this.u8x_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda).w1e = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.t8x_1.y5m(AbstractDraggableNode$pointerInputNode$slambda$slambda$slambda_0(this.v8x_1, this.u8x_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.bc_1 = 3;
            this.ac_1 = 4;
            continue $sm;
          case 2:
            this.bc_1 = 3;
            var tmp_0 = this.dc_1;
            if (tmp_0 instanceof CancellationException) {
              var exception = this.dc_1;
              if (!get_isActive(this.v8x_1)) {
                throw exception;
              }
              this.ac_1 = 4;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            return Unit_instance;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new AbstractDraggableNode$pointerInputNode$slambda$slambda(this.t8x_1, this.u8x_1, completion);
    i.v8x_1 = $this$coroutineScope;
    return i;
  };
  function AbstractDraggableNode$pointerInputNode$slambda$slambda_0($this_SuspendingPointerInputModifierNode, this$0, resultContinuation) {
    var i = new AbstractDraggableNode$pointerInputNode$slambda$slambda($this_SuspendingPointerInputModifierNode, this$0, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.w1e($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function startListeningForEvents($this) {
    $this.z8v_1 = true;
    var tmp = $this.k4u();
    launch(tmp, VOID, VOID, AbstractDraggableNode$startListeningForEvents$slambda_0($this, null));
  }
  function processDragStart(_this__u8e3s4, $this, event, $completion) {
    var tmp = new $processDragStartCOROUTINE$11($this, _this__u8e3s4, event, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function processDragStop(_this__u8e3s4, $this, event, $completion) {
    var tmp = new $processDragStopCOROUTINE$12($this, _this__u8e3s4, event, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function processDragCancel(_this__u8e3s4, $this, $completion) {
    var tmp = new $processDragCancelCOROUTINE$13($this, _this__u8e3s4, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function AbstractDraggableNode$_canDrag$lambda(this$0) {
    return function (it) {
      return this$0.p8v_1(it);
    };
  }
  function AbstractDraggableNode$_startDragImmediately$lambda(this$0) {
    return function () {
      return this$0.s8v_1();
    };
  }
  function AbstractDraggableNode$startListeningForEvents$slambda(this$0, resultContinuation) {
    this.f90_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 13;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!get_isActive(this.g90_1)) {
              this.ac_1 = 12;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = this.f90_1.b8w_1.l16(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.h90_1 = suspendResult;
            this.i90_1 = {_v: this.h90_1};
            var tmp_0 = this.i90_1._v;
            if (!(tmp_0 instanceof DragStarted)) {
              this.ac_1 = 1;
              continue $sm;
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

          case 3:
            this.ac_1 = 4;
            suspendResult = processDragStart(this.g90_1, this.f90_1, this.i90_1._v, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.bc_1 = 9;
            this.ac_1 = 5;
            suspendResult = this.f90_1.u8u(AbstractDraggableNode$startListeningForEvents$slambda$slambda_0(this.i90_1, this.f90_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 5:
            var tmp_1 = this.i90_1._v;
            if (tmp_1 instanceof DragStopped) {
              this.ac_1 = 7;
              var tmp_2 = this.i90_1._v;
              suspendResult = processDragStop(this.g90_1, this.f90_1, tmp_2 instanceof DragStopped ? tmp_2 : THROW_CCE(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_3 = this.i90_1._v;
              if (tmp_3 instanceof DragCancelled) {
                this.ac_1 = 6;
                suspendResult = processDragCancel(this.g90_1, this.f90_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.ac_1 = 8;
                continue $sm;
              }
            }

          case 6:
            this.ac_1 = 8;
            continue $sm;
          case 7:
            this.ac_1 = 8;
            continue $sm;
          case 8:
            this.bc_1 = 13;
            this.ac_1 = 11;
            continue $sm;
          case 9:
            this.bc_1 = 13;
            var tmp_4 = this.dc_1;
            if (tmp_4 instanceof CancellationException) {
              this.j90_1 = this.dc_1;
              this.ac_1 = 10;
              suspendResult = processDragCancel(this.g90_1, this.f90_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 10:
            this.ac_1 = 11;
            continue $sm;
          case 11:
            this.bc_1 = 13;
            this.ac_1 = 1;
            continue $sm;
          case 12:
            return Unit_instance;
          case 13:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 13) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(AbstractDraggableNode$startListeningForEvents$slambda).x1e = function ($this$launch, completion) {
    var i = new AbstractDraggableNode$startListeningForEvents$slambda(this.f90_1, completion);
    i.g90_1 = $this$launch;
    return i;
  };
  function AbstractDraggableNode$startListeningForEvents$slambda_0(this$0, resultContinuation) {
    var i = new AbstractDraggableNode$startListeningForEvents$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function AbstractDraggableNode$pointerInputNode$slambda(this$0, resultContinuation) {
    this.s90_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AbstractDraggableNode$pointerInputNode$slambda).g8a = function ($this$SuspendingPointerInputModifierNode, $completion) {
    var tmp = this.h8a($this$SuspendingPointerInputModifierNode, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda).yc = function (p1, $completion) {
    return this.g8a((!(p1 == null) ? isInterface(p1, PointerInputScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AbstractDraggableNode$pointerInputNode$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            if (!this.s90_1.q8v_1)
              return Unit_instance;
            this.ac_1 = 1;
            suspendResult = coroutineScope(AbstractDraggableNode$pointerInputNode$slambda$slambda_0(this.t90_1, this.s90_1, null), this);
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
  protoOf(AbstractDraggableNode$pointerInputNode$slambda).h8a = function ($this$SuspendingPointerInputModifierNode, completion) {
    var i = new AbstractDraggableNode$pointerInputNode$slambda(this.s90_1, completion);
    i.t90_1 = $this$SuspendingPointerInputModifierNode;
    return i;
  };
  function AbstractDraggableNode$pointerInputNode$slambda_0(this$0, resultContinuation) {
    var i = new AbstractDraggableNode$pointerInputNode$slambda(this$0, resultContinuation);
    var l = function ($this$SuspendingPointerInputModifierNode, $completion) {
      return i.g8a($this$SuspendingPointerInputModifierNode, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $processDragStartCOROUTINE$11(_this__u8e3s4, _this__u8e3s4_0, event, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e8y_1 = _this__u8e3s4;
    this.f8y_1 = _this__u8e3s4_0;
    this.g8y_1 = event;
  }
  protoOf($processDragStartCOROUTINE$11).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 7;
            this.h8y_1 = this.e8y_1.c8w_1;
            if (this.h8y_1 == null) {
              this.i8y_1 = null;
              this.ac_1 = 3;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.j8y_1 = this.h8y_1;
              var tmp_1 = this;
              tmp_1.k8y_1 = this.j8y_1;
              this.l8y_1 = this.e8y_1.r8v_1;
              if (this.l8y_1 == null) {
                this.m8y_1 = null;
                this.ac_1 = 2;
                continue $sm;
              } else {
                this.ac_1 = 1;
                suspendResult = this.l8y_1.z87(new Cancel(this.k8y_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              }
            }

          case 1:
            var tmp_2 = this;
            tmp_2.m8y_1 = Unit_instance;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.i8y_1 = this.m8y_1;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.n8y_1 = new Start();
            this.o8y_1 = this.e8y_1.r8v_1;
            if (this.o8y_1 == null) {
              this.p8y_1 = null;
              this.ac_1 = 5;
              continue $sm;
            } else {
              this.ac_1 = 4;
              suspendResult = this.o8y_1.z87(this.n8y_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 4:
            var tmp_3 = this;
            tmp_3.p8y_1 = Unit_instance;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            this.e8y_1.c8w_1 = this.n8y_1;
            this.ac_1 = 6;
            suspendResult = this.e8y_1.t8v_1(this.f8y_1, new Offset(this.g8y_1.u90_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            return Unit_instance;
          case 7:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 7) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $processDragStopCOROUTINE$12(_this__u8e3s4, _this__u8e3s4_0, event, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.y8y_1 = _this__u8e3s4;
    this.z8y_1 = _this__u8e3s4_0;
    this.a8z_1 = event;
  }
  protoOf($processDragStopCOROUTINE$12).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.b8z_1 = this.y8y_1.c8w_1;
            if (this.b8z_1 == null) {
              this.c8z_1 = null;
              this.ac_1 = 3;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.d8z_1 = this.b8z_1;
              var tmp_1 = this;
              tmp_1.e8z_1 = this.d8z_1;
              this.f8z_1 = this.y8y_1.r8v_1;
              if (this.f8z_1 == null) {
                this.g8z_1 = null;
                this.ac_1 = 2;
                continue $sm;
              } else {
                this.ac_1 = 1;
                suspendResult = this.f8z_1.z87(new Stop(this.e8z_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              }
            }

          case 1:
            var tmp_2 = this;
            tmp_2.g8z_1 = Unit_instance;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            var tmp_3 = this;
            this.y8y_1.c8w_1 = null;
            tmp_3.c8z_1 = Unit_instance;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ac_1 = 4;
            suspendResult = this.y8y_1.u8v_1(this.z8y_1, new Velocity_0(this.a8z_1.v90_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
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
  function $processDragCancelCOROUTINE$13(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.p8z_1 = _this__u8e3s4;
    this.q8z_1 = _this__u8e3s4_0;
  }
  protoOf($processDragCancelCOROUTINE$13).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.r8z_1 = this.p8z_1.c8w_1;
            if (this.r8z_1 == null) {
              this.s8z_1 = null;
              this.ac_1 = 3;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.t8z_1 = this.r8z_1;
              var tmp_1 = this;
              tmp_1.u8z_1 = this.t8z_1;
              this.v8z_1 = this.p8z_1.r8v_1;
              if (this.v8z_1 == null) {
                this.w8z_1 = null;
                this.ac_1 = 2;
                continue $sm;
              } else {
                this.ac_1 = 1;
                suspendResult = this.v8z_1.z87(new Cancel(this.u8z_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              }
            }

          case 1:
            var tmp_2 = this;
            tmp_2.w8z_1 = Unit_instance;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            var tmp_3 = this;
            this.p8z_1.c8w_1 = null;
            tmp_3.s8z_1 = Unit_instance;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ac_1 = 4;
            suspendResult = this.p8z_1.u8v_1(this.q8z_1, new Velocity_0(Companion_getInstance_8().k37_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
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
  function AbstractDraggableNode(canDrag, enabled, interactionSource, startDragImmediately, onDragStarted, onDragStopped, reverseDirection) {
    DelegatingNode.call(this);
    this.p8v_1 = canDrag;
    this.q8v_1 = enabled;
    this.r8v_1 = interactionSource;
    this.s8v_1 = startDragImmediately;
    this.t8v_1 = onDragStarted;
    this.u8v_1 = onDragStopped;
    this.v8v_1 = reverseDirection;
    var tmp = this;
    tmp.w8v_1 = AbstractDraggableNode$_canDrag$lambda(this);
    var tmp_0 = this;
    tmp_0.x8v_1 = AbstractDraggableNode$_startDragImmediately$lambda(this);
    this.y8v_1 = new VelocityTracker();
    this.z8v_1 = false;
    var tmp_1 = this;
    tmp_1.a8w_1 = this.f63(SuspendingPointerInputModifierNode(AbstractDraggableNode$pointerInputNode$slambda_0(this, null)));
    var tmp_2 = this;
    Factory_getInstance();
    tmp_2.b8w_1 = Channel(2147483647);
    this.c8w_1 = null;
  }
  protoOf(AbstractDraggableNode).r4u = function () {
    this.z8v_1 = false;
    this.k87();
  };
  protoOf(AbstractDraggableNode).v5f = function (pointerEvent, pass, bounds) {
    this.a8w_1.v5f(pointerEvent, pass, bounds);
  };
  protoOf(AbstractDraggableNode).l5g = function () {
    this.a8w_1.l5g();
  };
  protoOf(AbstractDraggableNode).k87 = function () {
    var tmp0_safe_receiver = this.c8w_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp0_safe_receiver_0 = this.r8v_1;
      if (tmp0_safe_receiver_0 == null)
        null;
      else
        tmp0_safe_receiver_0.l88(new Cancel(tmp0_safe_receiver));
      this.c8w_1 = null;
    }
  };
  function AbstractDragScope() {
  }
  function toFloat(_this__u8e3s4, orientation) {
    _init_properties_Draggable_kt__eqnzl1();
    return orientation.equals(Orientation_Vertical_getInstance()) ? _Offset___get_y__impl__8bzhra(_this__u8e3s4) : _Offset___get_x__impl__xvi35n(_this__u8e3s4);
  }
  function DragStarted(startPoint) {
    DragEvent.call(this);
    this.u90_1 = startPoint;
  }
  function DragStopped(velocity) {
    DragEvent.call(this);
    this.v90_1 = velocity;
  }
  function DragCancelled() {
    DragCancelled_instance = this;
    DragEvent.call(this);
  }
  var DragCancelled_instance;
  function DragCancelled_getInstance() {
    if (DragCancelled_instance == null)
      new DragCancelled();
    return DragCancelled_instance;
  }
  function DragDelta(delta) {
    DragEvent.call(this);
    this.x8u_1 = delta;
  }
  function DragEvent() {
  }
  function awaitDownAndSlop(_this__u8e3s4, canDrag, startDragImmediately, velocityTracker, pointerDirectionConfig, $completion) {
    var tmp = new $awaitDownAndSlopCOROUTINE$14(_this__u8e3s4, canDrag, startDragImmediately, velocityTracker, pointerDirectionConfig, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function awaitDrag(_this__u8e3s4, startEvent, initialDelta, velocityTracker, channel, reverseDirection, hasDragged, $completion) {
    var overSlopOffset = initialDelta;
    // Inline function 'kotlin.math.sign' call
    var x = _Offset___get_x__impl__xvi35n(startEvent.j5f_1);
    var xSign = sign(x);
    // Inline function 'kotlin.math.sign' call
    var x_0 = _Offset___get_y__impl__8bzhra(startEvent.j5f_1);
    var ySign = sign(x_0);
    var adjustedStart = Offset__minus_impl_hoj2c0(startEvent.j5f_1, Offset_0(_Offset___get_x__impl__xvi35n(overSlopOffset) * xSign, _Offset___get_y__impl__8bzhra(overSlopOffset) * ySign));
    channel.i16(new DragStarted(adjustedStart));
    channel.i16(new DragDelta(reverseDirection ? Offset__times_impl_jz1mli(initialDelta, -1.0) : initialDelta));
    return onDragOrUp(_this__u8e3s4, hasDragged, startEvent.h5f_1, awaitDrag$lambda(velocityTracker, channel, reverseDirection), $completion);
  }
  function onDragOrUp(_this__u8e3s4, hasDragged, pointerId, onDrag, $completion) {
    var tmp = new $onDragOrUpCOROUTINE$15(_this__u8e3s4, hasDragged, pointerId, onDrag, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function NoOpDragScope$1() {
  }
  protoOf(NoOpDragScope$1).w8s = function (pixels) {
  };
  function awaitDownAndSlop$lambda($velocityTracker, $initialDelta) {
    return function (event, offset) {
      addPointerInputChange($velocityTracker, event);
      event.g5h();
      $initialDelta._v = offset;
      return Unit_instance;
    };
  }
  function awaitDrag$lambda($velocityTracker, $channel, $reverseDirection) {
    return function (event) {
      addPointerInputChange($velocityTracker, event);
      var tmp;
      if (!changedToUpIgnoreConsumed(event)) {
        var delta = positionChange(event);
        event.g5h();
        $channel.i16(new DragDelta($reverseDirection ? Offset__times_impl_jz1mli(delta, -1.0) : delta));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function $awaitDownAndSlopCOROUTINE$14(_this__u8e3s4, canDrag, startDragImmediately, velocityTracker, pointerDirectionConfig, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e91_1 = _this__u8e3s4;
    this.f91_1 = canDrag;
    this.g91_1 = startDragImmediately;
    this.h91_1 = velocityTracker;
    this.i91_1 = pointerDirectionConfig;
  }
  protoOf($awaitDownAndSlopCOROUTINE$14).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 17;
            this.ac_1 = 1;
            suspendResult = awaitFirstDown(this.e91_1, false, PointerEventPass_Initial_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.j91_1 = suspendResult;
            if (!this.f91_1(this.j91_1)) {
              var tmp_0 = this;
              tmp_0.k91_1 = null;
              this.ac_1 = 16;
              continue $sm;
            } else {
              if (this.g91_1()) {
                var tmp_1 = this;
                this.j91_1.g5h();
                addPointerInputChange(this.h91_1, this.j91_1);
                tmp_1.k91_1 = to(this.j91_1, new Offset(Companion_getInstance_1().u33_1));
                this.ac_1 = 16;
                continue $sm;
              } else {
                this.ac_1 = 2;
                suspendResult = awaitFirstDown(this.e91_1, false, VOID, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              }
            }

          case 2:
            this.l91_1 = suspendResult;
            addPointerInputChange(this.h91_1, this.l91_1);
            this.m91_1 = {_v: new Offset(Companion_getInstance_1().u33_1)};
            var tmp_2 = this;
            tmp_2.n91_1 = awaitDownAndSlop$lambda(this.h91_1, this.m91_1);
            this.ac_1 = 3;
            continue $sm;
          case 3:
            var tmp_3 = this;
            tmp_3.p91_1 = this.e91_1;
            var tmp_4 = this;
            tmp_4.q91_1 = this.l91_1.h5f_1;
            var tmp_5 = this;
            tmp_5.r91_1 = this.l91_1.p5f_1;
            var tmp_6 = this;
            tmp_6.s91_1 = this.i91_1;
            if (isPointerUp$accessor$10dvge3(this.p91_1.f5m(), this.q91_1)) {
              this.o91_1 = null;
              this.ac_1 = 15;
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 4:
            this.t91_1 = pointerSlop(this.p91_1.g5m(), this.r91_1);
            this.u91_1 = this.q91_1;
            this.v91_1 = Companion_getInstance_1().u33_1;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            if (!true) {
              this.ac_1 = 14;
              continue $sm;
            }

            this.ac_1 = 6;
            suspendResult = this.p91_1.k5m(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            this.w91_1 = suspendResult;
            var tmp_7 = this;
            var tmp$ret$2;
            l$ret$3: do {
              var this_0 = this.w91_1.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (equals(item.h5f_1, this.u91_1)) {
                    tmp$ret$2 = item;
                    break l$ret$3;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$2 = null;
            }
             while (false);
            tmp_7.x91_1 = tmp$ret$2;
            if (this.x91_1 == null) {
              this.o91_1 = null;
              this.ac_1 = 15;
              var tmp_8 = this;
              continue $sm;
            } else {
              this.y91_1 = this.x91_1;
              this.ac_1 = 7;
              continue $sm;
            }

          case 7:
            this.z91_1 = this.y91_1;
            if (this.z91_1.d5h()) {
              this.o91_1 = null;
              this.ac_1 = 15;
              continue $sm;
            } else {
              if (changedToUpIgnoreConsumed(this.z91_1)) {
                var tmp_9 = this;
                var tmp$ret$4;
                l$ret$5: do {
                  var this_1 = this.w91_1.b5f_1;
                  var inductionVariable_0 = 0;
                  var last_0 = this_1.m() - 1 | 0;
                  if (inductionVariable_0 <= last_0)
                    do {
                      var index_0 = inductionVariable_0;
                      inductionVariable_0 = inductionVariable_0 + 1 | 0;
                      var item_0 = this_1.n(index_0);
                      if (item_0.k5f_1) {
                        tmp$ret$4 = item_0;
                        break l$ret$5;
                      }
                    }
                     while (inductionVariable_0 <= last_0);
                  tmp$ret$4 = null;
                }
                 while (false);
                tmp_9.a92_1 = tmp$ret$4;
                if (this.a92_1 == null) {
                  this.o91_1 = null;
                  this.ac_1 = 15;
                  continue $sm;
                } else {
                  this.u91_1 = this.a92_1.h5f_1;
                  this.ac_1 = 12;
                  continue $sm;
                }
              } else {
                this.b92_1 = this.z91_1.j5f_1;
                this.c92_1 = this.z91_1.n5f_1;
                this.d92_1 = Offset__minus_impl_hoj2c0(this.b92_1, this.c92_1);
                this.v91_1 = Offset__plus_impl_c78cg0(this.v91_1, this.d92_1);
                this.e92_1 = this.s91_1.f8s(this.v91_1);
                if (this.e92_1 < this.t91_1) {
                  this.ac_1 = 9;
                  suspendResult = this.p91_1.j5m(PointerEventPass_Final_getInstance(), this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var postSlopOffset = this.s91_1.g8s(this.v91_1, this.t91_1);
                  this.n91_1(this.z91_1, new Offset(postSlopOffset));
                  if (this.z91_1.d5h()) {
                    this.o91_1 = this.z91_1;
                    this.ac_1 = 15;
                    continue $sm;
                  } else {
                    this.v91_1 = Companion_getInstance_1().u33_1;
                    this.ac_1 = 8;
                    continue $sm;
                  }
                }
              }
            }

          case 8:
            this.ac_1 = 11;
            continue $sm;
          case 9:
            if (this.z91_1.d5h()) {
              this.o91_1 = null;
              this.ac_1 = 15;
              continue $sm;
            } else {
              this.ac_1 = 10;
              continue $sm;
            }

          case 10:
            this.ac_1 = 11;
            continue $sm;
          case 11:
            this.ac_1 = 13;
            continue $sm;
          case 12:
            this.ac_1 = 13;
            continue $sm;
          case 13:
            this.ac_1 = 5;
            continue $sm;
          case 14:
            if (false) {
              this.ac_1 = 3;
              continue $sm;
            }

            this.ac_1 = 15;
            continue $sm;
          case 15:
            var afterSlopResult = this.o91_1;
            this.k91_1 = !(afterSlopResult == null) ? to(afterSlopResult, this.m91_1._v) : null;
            this.ac_1 = 16;
            continue $sm;
          case 16:
            return this.k91_1;
          case 17:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 17) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $onDragOrUpCOROUTINE$15(_this__u8e3s4, hasDragged, pointerId, onDrag, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.n92_1 = _this__u8e3s4;
    this.o92_1 = hasDragged;
    this.p92_1 = pointerId;
    this.q92_1 = onDrag;
  }
  protoOf($onDragOrUpCOROUTINE$15).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 17;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0 = this;
            tmp_0.s92_1 = this.n92_1;
            var tmp_1 = this;
            tmp_1.t92_1 = this.p92_1;
            if (isPointerUp$accessor$10dvge3(this.s92_1.f5m(), this.t92_1)) {
              this.r92_1 = null;
              this.ac_1 = 16;
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 2:
            this.u92_1 = this.t92_1;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            if (!true) {
              this.ac_1 = 15;
              continue $sm;
            }

            this.ac_1 = 4;
            continue $sm;
          case 4:
            var tmp_2 = this;
            tmp_2.w92_1 = this.s92_1;
            var tmp_3 = this;
            tmp_3.x92_1 = this.u92_1;
            this.y92_1 = this.x92_1;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            if (!true) {
              this.ac_1 = 10;
              continue $sm;
            }

            this.ac_1 = 6;
            suspendResult = this.w92_1.k5m(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 6:
            var event = suspendResult;
            var tmp$ret$2;
            l$ret$3: do {
              var this_0 = event.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (equals(item.h5f_1, this.y92_1)) {
                    tmp$ret$2 = item;
                    break l$ret$3;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$2 = null;
            }
             while (false);
            var tmp0_elvis_lhs = tmp$ret$2;
            var WHEN_RESULT;
            if (tmp0_elvis_lhs == null) {
              this.v92_1 = null;
              this.ac_1 = 11;
              continue $sm;
            } else {
              WHEN_RESULT = tmp0_elvis_lhs;
              this.ac_1 = 7;
              continue $sm;
            }

          case 7:
            var dragEvent = WHEN_RESULT;
            if (changedToUpIgnoreConsumed(dragEvent)) {
              var tmp$ret$6;
              l$ret$7: do {
                var this_1 = event.b5f_1;
                var inductionVariable_0 = 0;
                var last_0 = this_1.m() - 1 | 0;
                if (inductionVariable_0 <= last_0)
                  do {
                    var index_0 = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    var item_0 = this_1.n(index_0);
                    if (item_0.k5f_1) {
                      tmp$ret$6 = item_0;
                      break l$ret$7;
                    }
                  }
                   while (inductionVariable_0 <= last_0);
                tmp$ret$6 = null;
              }
               while (false);
              var otherDown = tmp$ret$6;
              if (otherDown == null) {
                this.v92_1 = dragEvent;
                this.ac_1 = 11;
                continue $sm;
              } else {
                this.y92_1 = otherDown.h5f_1;
                this.ac_1 = 8;
                continue $sm;
              }
            } else {
              if (this.o92_1(dragEvent)) {
                this.v92_1 = dragEvent;
                this.ac_1 = 11;
                continue $sm;
              } else {
                this.ac_1 = 9;
                continue $sm;
              }
            }

          case 8:
            this.ac_1 = 9;
            continue $sm;
          case 9:
            this.ac_1 = 5;
            continue $sm;
          case 10:
            if (false) {
              this.ac_1 = 4;
              continue $sm;
            }

            this.ac_1 = 11;
            continue $sm;
          case 11:
            var tmp0_elvis_lhs_0 = this.v92_1;
            var WHEN_RESULT_0;
            if (tmp0_elvis_lhs_0 == null) {
              this.r92_1 = null;
              this.ac_1 = 16;
              continue $sm;
            } else {
              WHEN_RESULT_0 = tmp0_elvis_lhs_0;
              this.ac_1 = 12;
              continue $sm;
            }

          case 12:
            var change = WHEN_RESULT_0;
            if (change.d5h()) {
              this.r92_1 = null;
              this.ac_1 = 16;
              continue $sm;
            } else {
              this.ac_1 = 13;
              continue $sm;
            }

          case 13:
            if (changedToUpIgnoreConsumed(change)) {
              this.r92_1 = change;
              this.ac_1 = 16;
              continue $sm;
            } else {
              this.ac_1 = 14;
              continue $sm;
            }

          case 14:
            this.q92_1(change);
            this.u92_1 = change.h5f_1;
            this.ac_1 = 3;
            continue $sm;
          case 15:
            if (false) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 16;
            continue $sm;
          case 16:
            var tmp0_safe_receiver = this.r92_1;
            var tmp_4;
            if (tmp0_safe_receiver == null) {
              tmp_4 = null;
            } else {
              this.q92_1(tmp0_safe_receiver);
              tmp_4 = Unit_instance;
            }

            var ARGUMENT = tmp_4;
            var ARGUMENT_0 = ARGUMENT == null;
            return !ARGUMENT_0;
          case 17:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 17) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  var properties_initialized_Draggable_kt_yfsy1p;
  function _init_properties_Draggable_kt__eqnzl1() {
    if (!properties_initialized_Draggable_kt_yfsy1p) {
      properties_initialized_Draggable_kt_yfsy1p = true;
      NoOpDragScope = new NoOpDragScope$1();
    }
  }
  function awaitEachGesture(_this__u8e3s4, block, $completion) {
    // Inline function 'kotlinx.coroutines.currentCoroutineContext' call
    // Inline function 'kotlin.js.getCoroutineContext' call
    var currentContext = $completion.t6();
    return _this__u8e3s4.y5m(awaitEachGesture$slambda_0(currentContext, block, null), $completion);
  }
  function awaitAllPointersUp(_this__u8e3s4, $completion) {
    var tmp = new $awaitAllPointersUpCOROUTINE$16(_this__u8e3s4, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function allPointersUp(_this__u8e3s4) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.util.fastAny' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_0 = _this__u8e3s4.f5m().b5f_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.ui.util.fastAny.<anonymous>' call
          // Inline function 'androidx.compose.foundation.gestures.allPointersUp.<anonymous>' call
          if (item.k5f_1) {
            tmp$ret$1 = true;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = false;
    }
    return !tmp$ret$1;
  }
  function awaitEachGesture$slambda($currentContext, $block, resultContinuation) {
    this.q93_1 = $currentContext;
    this.r93_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(awaitEachGesture$slambda).u8s = function ($this$awaitPointerEventScope, $completion) {
    var tmp = this.v8s($this$awaitPointerEventScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(awaitEachGesture$slambda).yc = function (p1, $completion) {
    return this.u8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(awaitEachGesture$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 9;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!get_isActive_0(this.q93_1)) {
              this.ac_1 = 8;
              continue $sm;
            }

            this.bc_1 = 4;
            this.ac_1 = 2;
            suspendResult = this.r93_1(this.s93_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.ac_1 = 3;
            suspendResult = awaitAllPointersUp(this.s93_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.bc_1 = 9;
            this.ac_1 = 7;
            continue $sm;
          case 4:
            this.bc_1 = 9;
            var tmp_0 = this.dc_1;
            if (tmp_0 instanceof CancellationException) {
              this.t93_1 = this.dc_1;
              if (get_isActive_0(this.q93_1)) {
                this.ac_1 = 5;
                suspendResult = awaitAllPointersUp(this.s93_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                throw this.t93_1;
              }
            } else {
              throw this.dc_1;
            }

          case 5:
            this.ac_1 = 6;
            continue $sm;
          case 6:
            this.ac_1 = 7;
            continue $sm;
          case 7:
            this.bc_1 = 9;
            this.ac_1 = 1;
            continue $sm;
          case 8:
            return Unit_instance;
          case 9:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 9) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(awaitEachGesture$slambda).v8s = function ($this$awaitPointerEventScope, completion) {
    var i = new awaitEachGesture$slambda(this.q93_1, this.r93_1, completion);
    i.s93_1 = $this$awaitPointerEventScope;
    return i;
  };
  function awaitEachGesture$slambda_0($currentContext, $block, resultContinuation) {
    var i = new awaitEachGesture$slambda($currentContext, $block, resultContinuation);
    var l = function ($this$awaitPointerEventScope, $completion) {
      return i.u8s($this$awaitPointerEventScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $awaitAllPointersUpCOROUTINE$16(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.h93_1 = _this__u8e3s4;
  }
  protoOf($awaitAllPointersUpCOROUTINE$16).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            if (!allPointersUp(this.h93_1)) {
              this.ac_1 = 1;
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 1:
            this.ac_1 = 2;
            suspendResult = this.h93_1.j5m(PointerEventPass_Final_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var events = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = events.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (item.k5f_1) {
                    tmp$ret$0 = true;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = false;
            }
             while (false);
            if (tmp$ret$0) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ac_1 = 4;
            continue $sm;
          case 4:
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
  function get_AnimationThreshold() {
    _init_properties_MouseWheelScrollable_kt__c8407x();
    return AnimationThreshold;
  }
  var AnimationThreshold;
  function get_AnimationSpeed() {
    _init_properties_MouseWheelScrollable_kt__c8407x();
    return AnimationSpeed;
  }
  var AnimationSpeed;
  function MouseWheelScrollNode$busyReceive$slambda$slambda$lambda(it) {
    return Unit_instance;
  }
  function MouseWheelScrollNode$busyReceive$slambda$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$busyReceive$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$busyReceive$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$busyReceive$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!get_isActive_0(this.c94_1.jo())) {
              this.ac_1 = 3;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = withFrameNanos(MouseWheelScrollNode$busyReceive$slambda$slambda$lambda, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.ac_1 = 1;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(MouseWheelScrollNode$busyReceive$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new MouseWheelScrollNode$busyReceive$slambda$slambda(completion);
    i.c94_1 = $this$launch;
    return i;
  };
  function MouseWheelScrollNode$busyReceive$slambda$slambda_0(resultContinuation) {
    var i = new MouseWheelScrollNode$busyReceive$slambda$slambda(resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$dispatchMouseWheelScroll$slambda$lambda(this$0, $targetScrollDelta, $targetValue, $this_dispatchMouseWheelScroll, $requiredAnimation) {
    return function (lastValue) {
      var nextScrollDelta = sumOrNull(this$0.x94_1, this$0);
      var tmp;
      if (!(nextScrollDelta == null)) {
        $targetScrollDelta._v = $targetScrollDelta._v.a95(nextScrollDelta);
        $targetValue._v = $this_dispatchMouseWheelScroll.j95($this_dispatchMouseWheelScroll.i95($targetScrollDelta._v.y94_1));
        // Inline function 'androidx.compose.foundation.gestures.isLowScrollingDelta' call
        // Inline function 'kotlin.math.abs' call
        var x = $targetValue._v - lastValue;
        var tmp$ret$1 = Math.abs(x) < 0.5;
        $requiredAnimation._v = !tmp$ret$1;
        tmp = Unit_instance;
      }
      return !(nextScrollDelta == null);
    };
  }
  function _get_mouseWheelScrollConfig__8f69gm($this) {
    var tmp = $this.v94_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('mouseWheelScrollConfig');
    }
  }
  function mouseWheelInput(_this__u8e3s4, $this, $completion) {
    return _this__u8e3s4.y5m(MouseWheelScrollNode$mouseWheelInput$slambda_0($this, _this__u8e3s4, null), $completion);
  }
  function awaitScrollEvent(_this__u8e3s4, $this, $completion) {
    var tmp = new $awaitScrollEventCOROUTINE$17($this, _this__u8e3s4, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function MouseWheelScrollDelta(value, shouldApplyImmediately) {
    this.y94_1 = value;
    this.z94_1 = shouldApplyImmediately;
  }
  protoOf(MouseWheelScrollDelta).a95 = function (other) {
    return new MouseWheelScrollDelta(Offset__plus_impl_c78cg0(this.y94_1, other.y94_1), this.z94_1);
  };
  protoOf(MouseWheelScrollDelta).v95 = function (value, shouldApplyImmediately) {
    return new MouseWheelScrollDelta(value, shouldApplyImmediately);
  };
  protoOf(MouseWheelScrollDelta).w95 = function (value, shouldApplyImmediately, $super) {
    value = value === VOID ? this.y94_1 : value;
    shouldApplyImmediately = shouldApplyImmediately === VOID ? this.z94_1 : shouldApplyImmediately;
    return $super === VOID ? this.v95(value, shouldApplyImmediately) : $super.v95.call(this, new Offset(value), shouldApplyImmediately);
  };
  protoOf(MouseWheelScrollDelta).toString = function () {
    return 'MouseWheelScrollDelta(value=' + new Offset(this.y94_1) + ', shouldApplyImmediately=' + this.z94_1 + ')';
  };
  protoOf(MouseWheelScrollDelta).hashCode = function () {
    var result = Offset__hashCode_impl_hbql41(this.y94_1);
    result = imul(result, 31) + getBooleanHashCode(this.z94_1) | 0;
    return result;
  };
  protoOf(MouseWheelScrollDelta).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MouseWheelScrollDelta))
      return false;
    var tmp0_other_with_cast = other instanceof MouseWheelScrollDelta ? other : THROW_CCE();
    if (!equals(this.y94_1, tmp0_other_with_cast.y94_1))
      return false;
    if (!(this.z94_1 === tmp0_other_with_cast.z94_1))
      return false;
    return true;
  };
  function receiveMouseWheelEvents($this, $completion) {
    var tmp = new $receiveMouseWheelEventsCOROUTINE$18($this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function userScroll(_this__u8e3s4, $this, block, $completion) {
    return supervisorScope(MouseWheelScrollNode$userScroll$slambda_0(_this__u8e3s4, block, null), $completion);
  }
  function onMouseWheel(_this__u8e3s4, $this, pointerEvent) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.gestures.MouseWheelScrollNode.onMouseWheel.<anonymous>' call
    var scrollDelta = _get_mouseWheelScrollConfig__8f69gm($this).k96(_this__u8e3s4, pointerEvent, _this__u8e3s4.u5f());
    var tmp;
    if (canConsumeDelta($this.s94_1, $this, scrollDelta)) {
      tmp = _ChannelResult___get_isSuccess__impl__odq1z9($this.x94_1.i16(new MouseWheelScrollDelta(scrollDelta, !_get_mouseWheelScrollConfig__8f69gm($this).m96() ? true : _get_mouseWheelScrollConfig__8f69gm($this).l96(pointerEvent))));
    } else {
      tmp = false;
    }
    return tmp;
  }
  function sumOrNull(_this__u8e3s4, $this) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlin.collections.reduceOrNull' call
      var iterator = toList(untilNull($this, MouseWheelScrollNode$sumOrNull$lambda(_this__u8e3s4))).o();
      if (!iterator.d1()) {
        tmp$ret$0 = null;
        break $l$block;
      }
      var accumulator = iterator.f1();
      while (iterator.d1()) {
        // Inline function 'androidx.compose.foundation.gestures.MouseWheelScrollNode.sumOrNull.<anonymous>' call
        var accumulator_0 = accumulator;
        var it = iterator.f1();
        accumulator = accumulator_0.a95(it);
      }
      tmp$ret$0 = accumulator;
    }
    return tmp$ret$0;
  }
  function busyReceive(_this__u8e3s4, $this, $completion) {
    return coroutineScope(MouseWheelScrollNode$busyReceive$slambda_0(_this__u8e3s4, null), $completion);
  }
  function untilNull($this, builderAction) {
    return sequence(MouseWheelScrollNode$untilNull$slambda_0(builderAction, null));
  }
  function canConsumeDelta(_this__u8e3s4, $this, scrollDelta) {
    var delta = _this__u8e3s4.j95(_this__u8e3s4.i95(scrollDelta));
    var tmp;
    if (delta === 0.0) {
      tmp = false;
    } else if (delta > 0.0) {
      tmp = _this__u8e3s4.b95_1.o96();
    } else {
      tmp = _this__u8e3s4.b95_1.n96();
    }
    return tmp;
  }
  function dispatchMouseWheelScroll(_this__u8e3s4, $this, scrollDelta, threshold, speed, $completion) {
    var tmp = new $dispatchMouseWheelScrollCOROUTINE$19($this, _this__u8e3s4, scrollDelta, threshold, speed, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function animateMouseWheelScroll(_this__u8e3s4, $this, animationState, targetValue, durationMillis, shouldCancelAnimation, $completion) {
    var lastValue = {_v: animationState.s2()};
    var tmp = tween(durationMillis, VOID, get_LinearEasing());
    return animateTo(animationState, targetValue, tmp, true, MouseWheelScrollNode$animateMouseWheelScroll$lambda(lastValue, $this, _this__u8e3s4, shouldCancelAnimation), $completion);
  }
  function dispatchMouseWheelScroll_0(_this__u8e3s4, $this, delta) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.gestures.MouseWheelScrollNode.dispatchMouseWheelScroll.<anonymous>' call
    var $this$with = $this.s94_1;
    var offset = $this$with.i97($this$with.h97(delta));
    var consumed = $this$with.j97(_this__u8e3s4, offset, Companion_getInstance_9().a5c_1);
    return $this$with.j95($this$with.i95(consumed));
  }
  function dispatchMouseWheelScroll$waitNextScrollDelta(targetScrollDelta, targetValue, $this_dispatchMouseWheelScroll, animationState, this$0, timeoutMillis, $completion) {
    var tmp = new $dispatchMouseWheelScroll$waitNextScrollDeltaCOROUTINE$20(targetScrollDelta, targetValue, $this_dispatchMouseWheelScroll, animationState, this$0, timeoutMillis, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function MouseWheelScrollNode$onAttach$slambda(this$0, resultContinuation) {
    this.g98_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$onAttach$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$onAttach$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$onAttach$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = receiveMouseWheelEvents(this.g98_1, this);
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
  protoOf(MouseWheelScrollNode$onAttach$slambda).x1e = function ($this$launch, completion) {
    var i = new MouseWheelScrollNode$onAttach$slambda(this.g98_1, completion);
    i.h98_1 = $this$launch;
    return i;
  };
  function MouseWheelScrollNode$onAttach$slambda_0(this$0, resultContinuation) {
    var i = new MouseWheelScrollNode$onAttach$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$pointerInputNode$slambda(this$0, resultContinuation) {
    this.q98_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$pointerInputNode$slambda).g8a = function ($this$SuspendingPointerInputModifierNode, $completion) {
    var tmp = this.h8a($this$SuspendingPointerInputModifierNode, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$pointerInputNode$slambda).yc = function (p1, $completion) {
    return this.g8a((!(p1 == null) ? isInterface(p1, PointerInputScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$pointerInputNode$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (this.q98_1.u94_1) {
              this.ac_1 = 1;
              suspendResult = mouseWheelInput(this.r98_1, this.q98_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(MouseWheelScrollNode$pointerInputNode$slambda).h8a = function ($this$SuspendingPointerInputModifierNode, completion) {
    var i = new MouseWheelScrollNode$pointerInputNode$slambda(this.q98_1, completion);
    i.r98_1 = $this$SuspendingPointerInputModifierNode;
    return i;
  };
  function MouseWheelScrollNode$pointerInputNode$slambda_0(this$0, resultContinuation) {
    var i = new MouseWheelScrollNode$pointerInputNode$slambda(this$0, resultContinuation);
    var l = function ($this$SuspendingPointerInputModifierNode, $completion) {
      return i.g8a($this$SuspendingPointerInputModifierNode, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$mouseWheelInput$slambda(this$0, $this_mouseWheelInput, resultContinuation) {
    this.a99_1 = this$0;
    this.b99_1 = $this_mouseWheelInput;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$mouseWheelInput$slambda).u8s = function ($this$awaitPointerEventScope, $completion) {
    var tmp = this.v8s($this$awaitPointerEventScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$mouseWheelInput$slambda).yc = function (p1, $completion) {
    return this.u8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$mouseWheelInput$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!get_isActive(this.a99_1.k4u())) {
              this.ac_1 = 3;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = awaitScrollEvent(this.c99_1, this.a99_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var event = suspendResult;
            this.a99_1;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = event.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (item.d5h()) {
                    tmp$ret$0 = true;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = false;
            }
             while (false);
            if (!tmp$ret$0) {
              var consumed = onMouseWheel(this.b99_1, this.a99_1, event);
              if (consumed) {
                this.a99_1;
                var this_1 = event.b5f_1;
                var inductionVariable_0 = 0;
                var last_0 = this_1.m() - 1 | 0;
                if (inductionVariable_0 <= last_0)
                  do {
                    var index_0 = inductionVariable_0;
                    inductionVariable_0 = inductionVariable_0 + 1 | 0;
                    var item_0 = this_1.n(index_0);
                    item_0.g5h();
                  }
                   while (inductionVariable_0 <= last_0);
              }
            }

            this.ac_1 = 1;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(MouseWheelScrollNode$mouseWheelInput$slambda).v8s = function ($this$awaitPointerEventScope, completion) {
    var i = new MouseWheelScrollNode$mouseWheelInput$slambda(this.a99_1, this.b99_1, completion);
    i.c99_1 = $this$awaitPointerEventScope;
    return i;
  };
  function MouseWheelScrollNode$mouseWheelInput$slambda_0(this$0, $this_mouseWheelInput, resultContinuation) {
    var i = new MouseWheelScrollNode$mouseWheelInput$slambda(this$0, $this_mouseWheelInput, resultContinuation);
    var l = function ($this$awaitPointerEventScope, $completion) {
      return i.u8s($this$awaitPointerEventScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$userScroll$slambda($this_userScroll, $block, resultContinuation) {
    this.l99_1 = $this_userScroll;
    this.m99_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$userScroll$slambda).w1e = function ($this$supervisorScope, $completion) {
    var tmp = this.x1e($this$supervisorScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$userScroll$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$userScroll$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.l99_1.o99(MutatePriority_UserInput_getInstance(), this.m99_1, this);
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
  protoOf(MouseWheelScrollNode$userScroll$slambda).x1e = function ($this$supervisorScope, completion) {
    var i = new MouseWheelScrollNode$userScroll$slambda(this.l99_1, this.m99_1, completion);
    i.n99_1 = $this$supervisorScope;
    return i;
  };
  function MouseWheelScrollNode$userScroll$slambda_0($this_userScroll, $block, resultContinuation) {
    var i = new MouseWheelScrollNode$userScroll$slambda($this_userScroll, $block, resultContinuation);
    var l = function ($this$supervisorScope, $completion) {
      return i.w1e($this$supervisorScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$sumOrNull$lambda($this_sumOrNull) {
    return function () {
      return ChannelResult__getOrNull_impl_f5e07h($this_sumOrNull.m16());
    };
  }
  function MouseWheelScrollNode$busyReceive$slambda($this_busyReceive, resultContinuation) {
    this.x99_1 = $this_busyReceive;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$busyReceive$slambda).b9a = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$busyReceive$slambda).yc = function (p1, $completion) {
    return this.b9a((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$busyReceive$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            var tmp_0 = this;
            tmp_0.z99_1 = launch(this.y99_1, VOID, VOID, MouseWheelScrollNode$busyReceive$slambda$slambda_0(null));
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 4;
            this.ac_1 = 2;
            suspendResult = this.x99_1.l16(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.a9a_1 = suspendResult;
            this.bc_1 = 5;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            var tmp_1 = this.a9a_1;
            this.bc_1 = 5;
            this.z99_1.tp();
            return tmp_1;
          case 4:
            this.bc_1 = 5;
            var t = this.dc_1;
            this.z99_1.tp();
            throw t;
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
  protoOf(MouseWheelScrollNode$busyReceive$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new MouseWheelScrollNode$busyReceive$slambda(this.x99_1, completion);
    i.y99_1 = $this$coroutineScope;
    return i;
  };
  function MouseWheelScrollNode$busyReceive$slambda_0($this_busyReceive, resultContinuation) {
    var i = new MouseWheelScrollNode$busyReceive$slambda($this_busyReceive, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.b9a($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$untilNull$slambda($builderAction, resultContinuation) {
    this.k9a_1 = $builderAction;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$untilNull$slambda).q9a = function ($this$sequence, $completion) {
    var tmp = this.r9a($this$sequence, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$untilNull$slambda).yc = function (p1, $completion) {
    return this.q9a(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$untilNull$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.m9a_1 = this.k9a_1();
            if (this.m9a_1 == null) {
              this.n9a_1 = null;
              this.ac_1 = 3;
              continue $sm;
            } else {
              var tmp_0 = this;
              tmp_0.o9a_1 = this.m9a_1;
              var tmp_1 = this;
              tmp_1.p9a_1 = this.o9a_1;
              this.ac_1 = 2;
              suspendResult = this.l9a_1.af(this.p9a_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            this.n9a_1 = this.o9a_1;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            var element = this.n9a_1;
            if (!(element == null)) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 4;
            continue $sm;
          case 4:
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
  protoOf(MouseWheelScrollNode$untilNull$slambda).r9a = function ($this$sequence, completion) {
    var i = new MouseWheelScrollNode$untilNull$slambda(this.k9a_1, completion);
    i.l9a_1 = $this$sequence;
    return i;
  };
  function MouseWheelScrollNode$untilNull$slambda_0($builderAction, resultContinuation) {
    var i = new MouseWheelScrollNode$untilNull$slambda($builderAction, resultContinuation);
    var l = function ($this$sequence, $completion) {
      return i.q9a($this$sequence, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$dispatchMouseWheelScroll$slambda($targetValue, $animationState, $targetScrollDelta, $threshold, this$0, $speed, $this_dispatchMouseWheelScroll, resultContinuation) {
    this.a9b_1 = $targetValue;
    this.b9b_1 = $animationState;
    this.c9b_1 = $targetScrollDelta;
    this.d9b_1 = $threshold;
    this.e9b_1 = this$0;
    this.f9b_1 = $speed;
    this.g9b_1 = $this_dispatchMouseWheelScroll;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$slambda).h8p = function ($this$userScroll, $completion) {
    var tmp = this.i8p($this$userScroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 8;
            this.i9b_1 = {_v: true};
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!this.i9b_1._v) {
              this.ac_1 = 7;
              continue $sm;
            }

            this.i9b_1._v = false;
            this.j9b_1 = this.a9b_1._v - this.b9b_1._v.s2();
            var tmp_0;
            if (this.c9b_1._v.z94_1) {
              tmp_0 = true;
            } else {
              var x = this.j9b_1;
              tmp_0 = Math.abs(x) < this.d9b_1;
            }

            if (tmp_0) {
              dispatchMouseWheelScroll_0(this.h9b_1, this.e9b_1, this.j9b_1);
              this.ac_1 = 5;
              suspendResult = dispatchMouseWheelScroll$waitNextScrollDelta(this.c9b_1, this.a9b_1, this.g9b_1, this.b9b_1, this.e9b_1, new Long(50, 0), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_1 = this;
              var x_0 = this.j9b_1;
              tmp_1.k9b_1 = sign(x_0) * this.d9b_1;
              dispatchMouseWheelScroll_0(this.h9b_1, this.e9b_1, this.k9b_1);
              this.b9b_1._v = copy(this.b9b_1._v, this.b9b_1._v.s2() + this.k9b_1);
              var tmp_2 = this;
              var x_1 = this.a9b_1._v - this.b9b_1._v.s2();
              var this_0 = Math.abs(x_1) / this.f9b_1;
              tmp_2.l9b_1 = coerceAtMost(roundToInt(this_0), 100);
              this.ac_1 = 2;
              var tmp_3 = this.b9b_1._v;
              var tmp_4 = this.a9b_1._v;
              suspendResult = animateMouseWheelScroll(this.h9b_1, this.e9b_1, tmp_3, tmp_4, this.l9b_1, MouseWheelScrollNode$dispatchMouseWheelScroll$slambda$lambda(this.e9b_1, this.c9b_1, this.a9b_1, this.g9b_1, this.i9b_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 2:
            if (!this.i9b_1._v) {
              this.ac_1 = 3;
              var this_1 = new Long(50, 0);
              var other = this.l9b_1;
              suspendResult = dispatchMouseWheelScroll$waitNextScrollDelta(this.c9b_1, this.a9b_1, this.g9b_1, this.b9b_1, this.e9b_1, this_1.fb(toLong(other)), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 3:
            var ARGUMENT = suspendResult;
            this.i9b_1._v = ARGUMENT;
            this.ac_1 = 4;
            continue $sm;
          case 4:
            this.ac_1 = 6;
            continue $sm;
          case 5:
            var ARGUMENT_0 = suspendResult;
            this.i9b_1._v = ARGUMENT_0;
            this.ac_1 = 6;
            continue $sm;
          case 6:
            this.ac_1 = 1;
            continue $sm;
          case 7:
            return Unit_instance;
          case 8:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 8) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$slambda).i8p = function ($this$userScroll, completion) {
    var i = new MouseWheelScrollNode$dispatchMouseWheelScroll$slambda(this.a9b_1, this.b9b_1, this.c9b_1, this.d9b_1, this.e9b_1, this.f9b_1, this.g9b_1, completion);
    i.h9b_1 = $this$userScroll;
    return i;
  };
  function MouseWheelScrollNode$dispatchMouseWheelScroll$slambda_0($targetValue, $animationState, $targetScrollDelta, $threshold, this$0, $speed, $this_dispatchMouseWheelScroll, resultContinuation) {
    var i = new MouseWheelScrollNode$dispatchMouseWheelScroll$slambda($targetValue, $animationState, $targetScrollDelta, $threshold, this$0, $speed, $this_dispatchMouseWheelScroll, resultContinuation);
    var l = function ($this$userScroll, $completion) {
      return i.h8p($this$userScroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MouseWheelScrollNode$animateMouseWheelScroll$lambda($lastValue, this$0, $this_animateMouseWheelScroll, $shouldCancelAnimation) {
    return function ($this$animateTo) {
      var delta = $this$animateTo.s2() - $lastValue._v;
      var tmp;
      // Inline function 'androidx.compose.foundation.gestures.isLowScrollingDelta' call
      // Inline function 'kotlin.math.abs' call
      if (!(Math.abs(delta) < 0.5)) {
        var consumedDelta = dispatchMouseWheelScroll_0($this_animateMouseWheelScroll, this$0, delta);
        // Inline function 'androidx.compose.foundation.gestures.isLowScrollingDelta' call
        // Inline function 'kotlin.math.abs' call
        var x = delta - consumedDelta;
        if (!(Math.abs(x) < 0.5)) {
          $this$animateTo.c7g();
          return Unit_instance;
        }
        $lastValue._v = $lastValue._v + delta;
        tmp = Unit_instance;
      }
      var tmp_0;
      if ($shouldCancelAnimation($lastValue._v)) {
        $this$animateTo.c7g();
        tmp_0 = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda(this$0, resultContinuation) {
    this.u9b_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda).b9a = function ($this$withTimeoutOrNull, $completion) {
    var tmp = this.x1e($this$withTimeoutOrNull, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda).yc = function (p1, $completion) {
    return this.b9a((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = busyReceive(this.u9b_1.x94_1, this.u9b_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return suspendResult;
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
  protoOf(MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda).x1e = function ($this$withTimeoutOrNull, completion) {
    var i = new MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda(this.u9b_1, completion);
    i.v9b_1 = $this$withTimeoutOrNull;
    return i;
  };
  function MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda_0(this$0, resultContinuation) {
    var i = new MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda(this$0, resultContinuation);
    var l = function ($this$withTimeoutOrNull, $completion) {
      return i.b9a($this$withTimeoutOrNull, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $awaitScrollEventCOROUTINE$17(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.s95_1 = _this__u8e3s4;
    this.t95_1 = _this__u8e3s4_0;
  }
  protoOf($awaitScrollEventCOROUTINE$17).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.ac_1 = 2;
            suspendResult = this.t95_1.k5m(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.u95_1 = suspendResult;
            if (!(this.u95_1.g5f_1 === Companion_getInstance_4().k5g_1)) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.u95_1;
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $receiveMouseWheelEventsCOROUTINE$18(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f96_1 = _this__u8e3s4;
  }
  protoOf($receiveMouseWheelEventsCOROUTINE$18).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!get_isActive_0(this.t6())) {
              this.ac_1 = 4;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = this.f96_1.x94_1.l16(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.g96_1 = suspendResult;
            this.h96_1 = currentValueOf(this.f96_1, get_LocalDensity());
            var tmp_0 = this;
            tmp_0.i96_1 = this.h96_1.y35(get_AnimationThreshold());
            var tmp_1 = this;
            tmp_1.j96_1 = this.h96_1.y35(get_AnimationSpeed());
            this.ac_1 = 3;
            suspendResult = dispatchMouseWheelScroll(this.f96_1.s94_1, this.f96_1, this.g96_1, this.i96_1, this.j96_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.ac_1 = 1;
            continue $sm;
          case 4:
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
  function $dispatchMouseWheelScrollCOROUTINE$19(_this__u8e3s4, _this__u8e3s4_0, scrollDelta, threshold, speed, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.x96_1 = _this__u8e3s4;
    this.y96_1 = _this__u8e3s4_0;
    this.z96_1 = scrollDelta;
    this.a97_1 = threshold;
    this.b97_1 = speed;
  }
  protoOf($dispatchMouseWheelScrollCOROUTINE$19).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.c97_1 = {_v: this.z96_1};
            var tmp0_safe_receiver = sumOrNull(this.x96_1.x94_1, this.x96_1);
            if (tmp0_safe_receiver == null)
              null;
            else {
              this.c97_1._v = this.c97_1._v.a95(tmp0_safe_receiver);
            }

            this.d97_1 = {_v: this.y96_1.j95(this.y96_1.i95(this.c97_1._v.y94_1))};
            var x = this.d97_1._v;
            if (Math.abs(x) < 0.5) {
              return Unit_instance;
            }

            this.e97_1 = {_v: AnimationState(0.0)};
            this.ac_1 = 1;
            var tmp_0 = this.y96_1.b95_1;
            suspendResult = userScroll(tmp_0, this.x96_1, MouseWheelScrollNode$dispatchMouseWheelScroll$slambda_0(this.d97_1, this.e97_1, this.c97_1, this.a97_1, this.x96_1, this.b97_1, this.y96_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp_1 = this;
            var x_0 = this.d97_1._v;
            var a = Math.abs(x_0) / 100;
            var b = this.b97_1;
            tmp_1.f97_1 = Math.min(a, b);
            var tmp_2 = this;
            var tmp_3 = Companion_getInstance_8().k37_1;
            var x_1 = this.d97_1._v;
            tmp_2.g97_1 = this.y96_1.w9b(tmp_3, this.y96_1.h97(sign(x_1)) * this.f97_1 * 1000);
            this.ac_1 = 2;
            suspendResult = this.x96_1.t94_1(this.x96_1.k4u(), new Velocity_0(this.g97_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $dispatchMouseWheelScroll$waitNextScrollDeltaCOROUTINE$20(targetScrollDelta, targetValue, $this_dispatchMouseWheelScroll, animationState, this$0, timeoutMillis, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.s97_1 = targetScrollDelta;
    this.t97_1 = targetValue;
    this.u97_1 = $this_dispatchMouseWheelScroll;
    this.v97_1 = animationState;
    this.w97_1 = this$0;
    this.x97_1 = timeoutMillis;
  }
  protoOf($dispatchMouseWheelScroll$waitNextScrollDeltaCOROUTINE$20).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            if (this.x97_1.z6(new Long(0, 0)) < 0)
              return false;
            this.ac_1 = 1;
            suspendResult = withTimeoutOrNull(this.x97_1, MouseWheelScrollNode$dispatchMouseWheelScroll$waitNextScrollDelta$slambda_0(this.w97_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var tmp0_safe_receiver = suspendResult;
            var tmp_0;
            if (tmp0_safe_receiver == null) {
              tmp_0 = null;
            } else {
              var previousDeltaShouldApplyImmediately = this.s97_1._v.z94_1;
              this.s97_1._v = tmp0_safe_receiver.w95(VOID, previousDeltaShouldApplyImmediately);
              this.t97_1._v = this.u97_1.j95(this.u97_1.i95(this.s97_1._v.y94_1));
              this.v97_1._v = AnimationState(0.0);
              var x = this.t97_1._v;
              tmp_0 = !(Math.abs(x) < 0.5);
            }

            var tmp1_elvis_lhs = tmp_0;
            return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
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
  function MouseWheelScrollNode(scrollingLogic, onScrollStopped, enabled) {
    DelegatingNode.call(this);
    this.s94_1 = scrollingLogic;
    this.t94_1 = onScrollStopped;
    this.u94_1 = enabled;
    var tmp = this;
    tmp.w94_1 = this.f63(SuspendingPointerInputModifierNode(MouseWheelScrollNode$pointerInputNode$slambda_0(this, null)));
    var tmp_0 = this;
    Factory_getInstance();
    tmp_0.x94_1 = Channel(2147483647);
  }
  protoOf(MouseWheelScrollNode).p4u = function () {
    this.v94_1 = platformScrollConfig(this);
    var tmp = this.k4u();
    launch(tmp, VOID, VOID, MouseWheelScrollNode$onAttach$slambda_0(this, null));
  };
  protoOf(MouseWheelScrollNode).x9b = function (enabled) {
    var resetPointerInputHandling = false;
    if (!(this.u94_1 === enabled)) {
      this.u94_1 = enabled;
      resetPointerInputHandling = true;
    }
    if (resetPointerInputHandling) {
      this.w94_1.w5m();
    }
  };
  var properties_initialized_MouseWheelScrollable_kt_w5ds67;
  function _init_properties_MouseWheelScrollable_kt__c8407x() {
    if (!properties_initialized_MouseWheelScrollable_kt_w5ds67) {
      properties_initialized_MouseWheelScrollable_kt_w5ds67 = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      AnimationThreshold = _Dp___init__impl__ms3zkb(6);
      // Inline function 'androidx.compose.ui.unit.dp' call
      AnimationSpeed = _Dp___init__impl__ms3zkb(1);
    }
  }
  var Orientation_Vertical_instance;
  var Orientation_Horizontal_instance;
  var Orientation_entriesInitialized;
  function Orientation_initEntries() {
    if (Orientation_entriesInitialized)
      return Unit_instance;
    Orientation_entriesInitialized = true;
    Orientation_Vertical_instance = new Orientation('Vertical', 0);
    Orientation_Horizontal_instance = new Orientation('Horizontal', 1);
  }
  function Orientation(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Orientation_Vertical_getInstance() {
    Orientation_initEntries();
    return Orientation_Vertical_instance;
  }
  function Orientation_Horizontal_getInstance() {
    Orientation_initEntries();
    return Orientation_Horizontal_instance;
  }
  function animateScrollBy(_this__u8e3s4, value, animationSpec, $completion) {
    animationSpec = animationSpec === VOID ? spring() : animationSpec;
    var tmp = new $animateScrollByCOROUTINE$21(_this__u8e3s4, value, animationSpec, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function animateScrollBy$slambda$lambda($previousValue, $this_scroll) {
    return function (currentValue, _anonymous_parameter_1__qggqgd) {
      $previousValue._v = $previousValue._v + $this_scroll.v8o(currentValue - $previousValue._v);
      return Unit_instance;
    };
  }
  function animateScrollBy$slambda($value, $animationSpec, $previousValue, resultContinuation) {
    this.s9c_1 = $value;
    this.t9c_1 = $animationSpec;
    this.u9c_1 = $previousValue;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(animateScrollBy$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(animateScrollBy$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(animateScrollBy$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = animate(0.0, this.s9c_1, VOID, this.t9c_1, animateScrollBy$slambda$lambda(this.u9c_1, this.v9c_1), this);
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
  protoOf(animateScrollBy$slambda).i8p = function ($this$scroll, completion) {
    var i = new animateScrollBy$slambda(this.s9c_1, this.t9c_1, this.u9c_1, completion);
    i.v9c_1 = $this$scroll;
    return i;
  };
  function animateScrollBy$slambda_0($value, $animationSpec, $previousValue, resultContinuation) {
    var i = new animateScrollBy$slambda($value, $animationSpec, $previousValue, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $animateScrollByCOROUTINE$21(_this__u8e3s4, value, animationSpec, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.g9c_1 = _this__u8e3s4;
    this.h9c_1 = value;
    this.i9c_1 = animationSpec;
  }
  protoOf($animateScrollByCOROUTINE$21).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.j9c_1 = {_v: 0.0};
            this.ac_1 = 1;
            suspendResult = this.g9c_1.a8q(VOID, animateScrollBy$slambda_0(this.h9c_1, this.i9c_1, this.j9c_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return this.j9c_1._v;
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
  function get_CanDragCalculation() {
    _init_properties_Scrollable_kt__k2543d();
    return CanDragCalculation;
  }
  var CanDragCalculation;
  function get_NoOpOnDragStarted() {
    _init_properties_Scrollable_kt__k2543d();
    return NoOpOnDragStarted;
  }
  var NoOpOnDragStarted;
  function get_NoOpScrollScope() {
    _init_properties_Scrollable_kt__k2543d();
    return NoOpScrollScope;
  }
  var NoOpScrollScope;
  function get_ModifierLocalScrollableContainer() {
    _init_properties_Scrollable_kt__k2543d();
    return ModifierLocalScrollableContainer;
  }
  var ModifierLocalScrollableContainer;
  var NoOpFlingBehavior;
  function get_DefaultScrollMotionDurationScale() {
    _init_properties_Scrollable_kt__k2543d();
    return DefaultScrollMotionDurationScale;
  }
  var DefaultScrollMotionDurationScale;
  function get_UnityDensity() {
    _init_properties_Scrollable_kt__k2543d();
    return UnityDensity;
  }
  var UnityDensity;
  function ScrollableDefaults() {
  }
  protoOf(ScrollableDefaults).w9c = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1107739818);
    sourceInformation($composer_0, 'C(flingBehavior)570@22361L38:Scrollable.kt#8bwon0');
    if (isTraceInProgress()) {
      traceEventStart(1107739818, $changed, -1, 'androidx.compose.foundation.gestures.ScrollableDefaults.flingBehavior (Scrollable.kt:570)');
    }
    var tmp0 = rememberPlatformDefaultFlingBehavior($composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  protoOf(ScrollableDefaults).x9c = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1809802212);
    sourceInformation($composer_0, 'C(overscrollEffect)579@22638L26:Scrollable.kt#8bwon0');
    if (isTraceInProgress()) {
      traceEventStart(1809802212, $changed, -1, 'androidx.compose.foundation.gestures.ScrollableDefaults.overscrollEffect (Scrollable.kt:578)');
    }
    var tmp0 = rememberOverscrollEffect($composer_0, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  protoOf(ScrollableDefaults).y9c = function (layoutDirection, orientation, reverseScrolling) {
    var reverseDirection = !reverseScrolling;
    var isRtl = layoutDirection.equals(LayoutDirection_Rtl_getInstance());
    if (isRtl ? !orientation.equals(Orientation_Vertical_getInstance()) : false) {
      reverseDirection = !reverseDirection;
    }
    return reverseDirection;
  };
  protoOf(ScrollableDefaults).z9c = function () {
    return Companion_getInstance_23().b9d_1;
  };
  var ScrollableDefaults_instance;
  function ScrollableDefaults_getInstance() {
    return ScrollableDefaults_instance;
  }
  function BringIntoViewSpec$Companion$DefaultBringIntoViewSpec$1() {
    this.c9d_1 = Companion_getInstance_23().a9d_1;
  }
  protoOf(BringIntoViewSpec$Companion$DefaultBringIntoViewSpec$1).l8q = function () {
    return this.c9d_1;
  };
  protoOf(BringIntoViewSpec$Companion$DefaultBringIntoViewSpec$1).k8p = function (offset, size, containerSize) {
    var trailingEdge = offset + size;
    var leadingEdge = offset;
    var tmp;
    if (leadingEdge >= 0.0 ? trailingEdge <= containerSize : false) {
      tmp = 0.0;
    } else {
      if (leadingEdge < 0.0 ? trailingEdge > containerSize : false) {
        tmp = 0.0;
      } else {
        // Inline function 'kotlin.math.abs' call
        var tmp_0 = Math.abs(leadingEdge);
        // Inline function 'kotlin.math.abs' call
        var x = trailingEdge - containerSize;
        if (tmp_0 < Math.abs(x)) {
          tmp = leadingEdge;
        } else {
          tmp = trailingEdge - containerSize;
        }
      }
    }
    return tmp;
  };
  function Companion() {
    Companion_instance_2 = this;
    this.a9d_1 = spring();
    var tmp = this;
    tmp.b9d_1 = new BringIntoViewSpec$Companion$DefaultBringIntoViewSpec$1();
  }
  var Companion_instance_2;
  function Companion_getInstance_23() {
    if (Companion_instance_2 == null)
      new Companion();
    return Companion_instance_2;
  }
  function BringIntoViewSpec() {
  }
  function scrollable(_this__u8e3s4, state, orientation, overscrollEffect, enabled, reverseDirection, flingBehavior, interactionSource, bringIntoViewSpec) {
    enabled = enabled === VOID ? true : enabled;
    reverseDirection = reverseDirection === VOID ? false : reverseDirection;
    flingBehavior = flingBehavior === VOID ? null : flingBehavior;
    interactionSource = interactionSource === VOID ? null : interactionSource;
    bringIntoViewSpec = bringIntoViewSpec === VOID ? ScrollableDefaults_instance.z9c() : bringIntoViewSpec;
    _init_properties_Scrollable_kt__k2543d();
    return _this__u8e3s4.q4t(new ScrollableElement(state, orientation, overscrollEffect, enabled, reverseDirection, flingBehavior, interactionSource, bringIntoViewSpec));
  }
  function DefaultFlingBehavior$performFling$slambda$lambda($lastValue, $this_performFling, $velocityLeft, this$0) {
    return function ($this$animateDecay) {
      var delta = $this$animateDecay.s2() - $lastValue._v;
      var consumed = $this_performFling.v8o(delta);
      $lastValue._v = $this$animateDecay.s2();
      $velocityLeft._v = $this$animateDecay.w7h();
      var tmp;
      // Inline function 'kotlin.math.abs' call
      var x = delta - consumed;
      if (Math.abs(x) > 0.5) {
        $this$animateDecay.c7g();
        tmp = Unit_instance;
      }
      var tmp0_this = this$0;
      tmp0_this.f9d_1 = tmp0_this.f9d_1 + 1 | 0;
      return Unit_instance;
    };
  }
  function DefaultFlingBehavior$performFling$slambda($initialVelocity, this$0, $this_performFling, resultContinuation) {
    this.o9d_1 = $initialVelocity;
    this.p9d_1 = this$0;
    this.q9d_1 = $this_performFling;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(DefaultFlingBehavior$performFling$slambda).w9d = function ($this$withContext, $completion) {
    var tmp = this.x1e($this$withContext, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(DefaultFlingBehavior$performFling$slambda).yc = function (p1, $completion) {
    return this.w9d((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(DefaultFlingBehavior$performFling$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            var x = this.o9d_1;
            if (Math.abs(x) > 1.0) {
              this.t9d_1 = {_v: this.o9d_1};
              this.u9d_1 = {_v: 0.0};
              this.v9d_1 = AnimationState(0.0, this.o9d_1);
              this.bc_1 = 2;
              this.ac_1 = 1;
              var tmp_0 = this.p9d_1.d9d_1;
              suspendResult = animateDecay(this.v9d_1, tmp_0, VOID, DefaultFlingBehavior$performFling$slambda$lambda(this.u9d_1, this.q9d_1, this.t9d_1, this.p9d_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_1 = this;
              tmp_1.s9d_1 = this.o9d_1;
              this.ac_1 = 4;
              continue $sm;
            }

          case 1:
            this.bc_1 = 5;
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.bc_1 = 5;
            var tmp_2 = this.dc_1;
            if (tmp_2 instanceof CancellationException) {
              var exception = this.dc_1;
              this.t9d_1._v = this.v9d_1.w7h();
              this.ac_1 = 3;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 3:
            this.bc_1 = 5;
            this.s9d_1 = this.t9d_1._v;
            this.ac_1 = 4;
            continue $sm;
          case 4:
            return this.s9d_1;
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
  protoOf(DefaultFlingBehavior$performFling$slambda).x1e = function ($this$withContext, completion) {
    var i = new DefaultFlingBehavior$performFling$slambda(this.o9d_1, this.p9d_1, this.q9d_1, completion);
    i.r9d_1 = $this$withContext;
    return i;
  };
  function DefaultFlingBehavior$performFling$slambda_0($initialVelocity, this$0, $this_performFling, resultContinuation) {
    var i = new DefaultFlingBehavior$performFling$slambda($initialVelocity, this$0, $this_performFling, resultContinuation);
    var l = function ($this$withContext, $completion) {
      return i.w9d($this$withContext, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function DefaultFlingBehavior(flingDecay, motionDurationScale) {
    motionDurationScale = motionDurationScale === VOID ? get_DefaultScrollMotionDurationScale() : motionDurationScale;
    this.d9d_1 = flingDecay;
    this.e9d_1 = motionDurationScale;
    this.f9d_1 = 0;
  }
  protoOf(DefaultFlingBehavior).x9d = function (_this__u8e3s4, initialVelocity, $completion) {
    this.f9d_1 = 0;
    return withContext(this.e9d_1, DefaultFlingBehavior$performFling$slambda_0(initialVelocity, this, _this__u8e3s4, null), $completion);
  };
  protoOf(DefaultFlingBehavior).y9d = function (density) {
    this.d9d_1 = splineBasedDecay(density);
  };
  function ScrollableElement(state, orientation, overscrollEffect, enabled, reverseDirection, flingBehavior, interactionSource, bringIntoViewSpec) {
    ModifierNodeElement.call(this);
    this.a9e_1 = state;
    this.b9e_1 = orientation;
    this.c9e_1 = overscrollEffect;
    this.d9e_1 = enabled;
    this.e9e_1 = reverseDirection;
    this.f9e_1 = flingBehavior;
    this.g9e_1 = interactionSource;
    this.h9e_1 = bringIntoViewSpec;
  }
  protoOf(ScrollableElement).g25 = function () {
    return new ScrollableNode(this.a9e_1, this.b9e_1, this.c9e_1, this.d9e_1, this.e9e_1, this.f9e_1, this.g9e_1, this.h9e_1);
  };
  protoOf(ScrollableElement).i9e = function (node) {
    node.r9f(this.a9e_1, this.b9e_1, this.c9e_1, this.d9e_1, this.e9e_1, this.f9e_1, this.g9e_1, this.h9e_1);
  };
  protoOf(ScrollableElement).t4v = function (node) {
    return this.i9e(node instanceof ScrollableNode ? node : THROW_CCE());
  };
  protoOf(ScrollableElement).hashCode = function () {
    var result = hashCode(this.a9e_1);
    result = imul(31, result) + this.b9e_1.hashCode() | 0;
    var tmp = imul(31, result);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.c9e_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + getBooleanHashCode(this.d9e_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.e9e_1) | 0;
    var tmp_0 = imul(31, result);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.f9e_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    result = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    var tmp_1 = imul(31, result);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_1 = this.g9e_1;
    var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
    result = tmp_1 + (tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1) | 0;
    result = imul(31, result) + hashCode(this.h9e_1) | 0;
    return result;
  };
  protoOf(ScrollableElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ScrollableElement))
      return false;
    if (!equals(this.a9e_1, other.a9e_1))
      return false;
    if (!this.b9e_1.equals(other.b9e_1))
      return false;
    if (!equals(this.c9e_1, other.c9e_1))
      return false;
    if (!(this.d9e_1 === other.d9e_1))
      return false;
    if (!(this.e9e_1 === other.e9e_1))
      return false;
    if (!equals(this.f9e_1, other.f9e_1))
      return false;
    if (!equals(this.g9e_1, other.g9e_1))
      return false;
    if (!equals(this.h9e_1, other.h9e_1))
      return false;
    return true;
  };
  function ScrollableDefaultFlingBehavior() {
  }
  function ScrollableNode$onDragStopped$slambda$slambda(this$0, $velocity, resultContinuation) {
    this.a9g_1 = this$0;
    this.b9g_1 = $velocity;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNode$onDragStopped$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNode$onDragStopped$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNode$onDragStopped$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.a9g_1.h9f_1.d9g(this.b9g_1, Companion_getInstance_9().x5b_1, this);
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
  protoOf(ScrollableNode$onDragStopped$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new ScrollableNode$onDragStopped$slambda$slambda(this.a9g_1, this.b9g_1, completion);
    i.c9g_1 = $this$launch;
    return i;
  };
  function ScrollableNode$onDragStopped$slambda$slambda_0(this$0, $velocity, resultContinuation) {
    var i = new ScrollableNode$onDragStopped$slambda$slambda(this$0, $velocity, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ScrollableNode$onWheelScrollStopped$slambda$slambda(this$0, $velocity, resultContinuation) {
    this.m9g_1 = this$0;
    this.n9g_1 = $velocity;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNode$onWheelScrollStopped$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNode$onWheelScrollStopped$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNode$onWheelScrollStopped$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.m9g_1.h9f_1.d9g(this.n9g_1, Companion_getInstance_9().a5c_1, this);
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
  protoOf(ScrollableNode$onWheelScrollStopped$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new ScrollableNode$onWheelScrollStopped$slambda$slambda(this.m9g_1, this.n9g_1, completion);
    i.o9g_1 = $this$launch;
    return i;
  };
  function ScrollableNode$onWheelScrollStopped$slambda$slambda_0(this$0, $velocity, resultContinuation) {
    var i = new ScrollableNode$onWheelScrollStopped$slambda$slambda(this$0, $velocity, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ScrollableNode$onKeyEvent$slambda$slambda($$this$with, $scrollAmount, resultContinuation) {
    this.x9g_1 = $$this$with;
    this.y9g_1 = $scrollAmount;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNode$onKeyEvent$slambda$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNode$onKeyEvent$slambda$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNode$onKeyEvent$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          this.x9g_1.j97(this.z9g_1, this.y9g_1, Companion_getInstance_9().a5c_1);
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(ScrollableNode$onKeyEvent$slambda$slambda).i8p = function ($this$scroll, completion) {
    var i = new ScrollableNode$onKeyEvent$slambda$slambda(this.x9g_1, this.y9g_1, completion);
    i.z9g_1 = $this$scroll;
    return i;
  };
  function ScrollableNode$onKeyEvent$slambda$slambda_0($$this$with, $scrollAmount, resultContinuation) {
    var i = new ScrollableNode$onKeyEvent$slambda$slambda($$this$with, $scrollAmount, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function updateDefaultFlingBehavior($this) {
    var density = currentValueOf($this, get_LocalDensity());
    $this.g9f_1.y9d(density);
  }
  function ScrollableNode$lambda(this$0) {
    return function (it) {
      this$0.j9f_1.o8q(it);
      return Unit_instance;
    };
  }
  function ScrollableNode$startDragImmediately$lambda(this$0) {
    return function () {
      return this$0.h9f_1.a9h();
    };
  }
  function ScrollableNode$onDragStopped$slambda(this$0, resultContinuation) {
    this.j9h_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNode$onDragStopped$slambda).m9h = function ($this$null, velocity, $completion) {
    var tmp = this.n9h($this$null, velocity, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNode$onDragStopped$slambda).nh = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE();
    return this.m9h(tmp, p2 instanceof Velocity_0 ? p2.i37_1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNode$onDragStopped$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          var tmp_0 = this.j9h_1.f9f_1.k4u();
          launch(tmp_0, VOID, VOID, ScrollableNode$onDragStopped$slambda$slambda_0(this.j9h_1, this.l9h_1, null));
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(ScrollableNode$onDragStopped$slambda).n9h = function ($this$null, velocity, completion) {
    var i = new ScrollableNode$onDragStopped$slambda(this.j9h_1, completion);
    i.k9h_1 = $this$null;
    i.l9h_1 = velocity;
    return i;
  };
  function ScrollableNode$onDragStopped$slambda_0(this$0, resultContinuation) {
    var i = new ScrollableNode$onDragStopped$slambda(this$0, resultContinuation);
    var l = function ($this$null, velocity, $completion) {
      return i.m9h($this$null, velocity.i37_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ScrollableNode$onWheelScrollStopped$slambda(this$0, resultContinuation) {
    this.w9h_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNode$onWheelScrollStopped$slambda).m9h = function ($this$null, velocity, $completion) {
    var tmp = this.n9h($this$null, velocity, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNode$onWheelScrollStopped$slambda).nh = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE();
    return this.m9h(tmp, p2 instanceof Velocity_0 ? p2.i37_1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNode$onWheelScrollStopped$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          var tmp_0 = this.w9h_1.f9f_1.k4u();
          launch(tmp_0, VOID, VOID, ScrollableNode$onWheelScrollStopped$slambda$slambda_0(this.w9h_1, this.y9h_1, null));
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(ScrollableNode$onWheelScrollStopped$slambda).n9h = function ($this$null, velocity, completion) {
    var i = new ScrollableNode$onWheelScrollStopped$slambda(this.w9h_1, completion);
    i.x9h_1 = $this$null;
    i.y9h_1 = velocity;
    return i;
  };
  function ScrollableNode$onWheelScrollStopped$slambda_0(this$0, resultContinuation) {
    var i = new ScrollableNode$onWheelScrollStopped$slambda(this$0, resultContinuation);
    var l = function ($this$null, velocity, $completion) {
      return i.m9h($this$null, velocity.i37_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function ScrollableNode$onAttach$lambda(this$0) {
    return function () {
      currentValueOf(this$0, get_LocalDensity());
      return Unit_instance;
    };
  }
  function ScrollableNode$onKeyEvent$slambda($$this$with, $scrollAmount, resultContinuation) {
    this.h9i_1 = $$this$with;
    this.i9i_1 = $scrollAmount;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNode$onKeyEvent$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNode$onKeyEvent$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNode$onKeyEvent$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            var tmp_0 = this.h9i_1.b95_1;
            var tmp_1 = MutatePriority_UserInput_getInstance();
            suspendResult = tmp_0.o99(tmp_1, ScrollableNode$onKeyEvent$slambda$slambda_0(this.h9i_1, this.i9i_1, null), this);
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
  protoOf(ScrollableNode$onKeyEvent$slambda).x1e = function ($this$launch, completion) {
    var i = new ScrollableNode$onKeyEvent$slambda(this.h9i_1, this.i9i_1, completion);
    i.j9i_1 = $this$launch;
    return i;
  };
  function ScrollableNode$onKeyEvent$slambda_0($$this$with, $scrollAmount, resultContinuation) {
    var i = new ScrollableNode$onKeyEvent$slambda($$this$with, $scrollAmount, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ScrollableNode(state, orientation, overscrollEffect, enabled, reverseDirection, flingBehavior, interactionSource, bringIntoViewSpec) {
    DelegatingNode.call(this);
    this.y9e_1 = state;
    this.z9e_1 = orientation;
    this.a9f_1 = overscrollEffect;
    this.b9f_1 = enabled;
    this.c9f_1 = reverseDirection;
    this.d9f_1 = flingBehavior;
    this.e9f_1 = interactionSource;
    this.f9f_1 = new NestedScrollDispatcher();
    this.g9f_1 = platformDefaultFlingBehavior();
    var tmp = this;
    var tmp_0 = this.y9e_1;
    var tmp_1 = this.z9e_1;
    var tmp_2 = this.a9f_1;
    var tmp_3 = this.c9f_1;
    var tmp0_elvis_lhs = this.d9f_1;
    tmp.h9f_1 = new ScrollingLogic(tmp_0, tmp_1, tmp_2, tmp_3, tmp0_elvis_lhs == null ? this.g9f_1 : tmp0_elvis_lhs, this.f9f_1);
    var tmp_4 = this;
    var tmp0_enabled = this.b9f_1;
    var tmp1_scrollingLogic = this.h9f_1;
    tmp_4.i9f_1 = new ScrollableNestedScrollConnection(tmp1_scrollingLogic, tmp0_enabled);
    this.j9f_1 = this.f63(new ContentInViewNode(this.z9e_1, this.y9e_1, this.c9f_1, bringIntoViewSpec));
    this.k9f_1 = this.f63(new ModifierLocalScrollableContainerProvider(this.b9f_1));
    this.f63(nestedScrollModifierNode(this.i9f_1, this.f9f_1));
    this.f63(funFocusTargetModifierNode());
    this.f63(new BringIntoViewResponderNode(this.j9f_1));
    this.f63(new FocusedBoundsObserverNode(ScrollableNode$lambda(this)));
    this.l9f_1 = new ScrollDraggableState(this.h9f_1);
    var tmp_5 = this;
    tmp_5.m9f_1 = ScrollableNode$startDragImmediately$lambda(this);
    var tmp_6 = this;
    tmp_6.n9f_1 = ScrollableNode$onDragStopped$slambda_0(this, null);
    var tmp_7 = this;
    var tmp0_state = this.l9f_1;
    var tmp1_orientation = this.z9e_1;
    var tmp2_enabled = this.b9f_1;
    var tmp3_interactionSource = this.e9f_1;
    var tmp4_startDragImmediately = this.m9f_1;
    var tmp5_onDragStopped = this.n9f_1;
    var tmp6_canDrag = get_CanDragCalculation();
    var tmp7_onDragStarted = get_NoOpOnDragStarted();
    tmp_7.o9f_1 = this.f63(new DraggableNode(tmp0_state, tmp6_canDrag, tmp1_orientation, tmp2_enabled, tmp3_interactionSource, tmp4_startDragImmediately, tmp7_onDragStarted, tmp5_onDragStopped, false));
    var tmp_8 = this;
    tmp_8.p9f_1 = ScrollableNode$onWheelScrollStopped$slambda_0(this, null);
    this.q9f_1 = this.f63(new MouseWheelScrollNode(this.h9f_1, this.p9f_1, this.b9f_1));
  }
  protoOf(ScrollableNode).r9f = function (state, orientation, overscrollEffect, enabled, reverseDirection, flingBehavior, interactionSource, bringIntoViewSpec) {
    if (!(this.b9f_1 === enabled)) {
      this.i9f_1.l9i_1 = enabled;
      this.k9f_1.z9i_1 = enabled;
    }
    var resolvedFlingBehavior = flingBehavior == null ? this.g9f_1 : flingBehavior;
    this.h9f_1.b9j(state, orientation, overscrollEffect, reverseDirection, resolvedFlingBehavior, this.f9f_1);
    var tmp1_$this = this.o9f_1;
    var tmp2_state = this.l9f_1;
    var tmp3_startDragImmediately = this.m9f_1;
    var tmp4_onDragStarted = get_NoOpOnDragStarted();
    var tmp5_onDragStopped = this.n9f_1;
    var tmp6_canDrag = get_CanDragCalculation();
    tmp1_$this.z8u(tmp2_state, tmp6_canDrag, orientation, enabled, interactionSource, tmp3_startDragImmediately, tmp4_onDragStarted, tmp5_onDragStopped, false);
    this.q9f_1.x9b(enabled);
    this.j9f_1.p8q(orientation, state, reverseDirection, bringIntoViewSpec);
    this.y9e_1 = state;
    this.z9e_1 = orientation;
    this.a9f_1 = overscrollEffect;
    this.b9f_1 = enabled;
    this.c9f_1 = reverseDirection;
    this.d9f_1 = flingBehavior;
    this.e9f_1 = interactionSource;
  };
  protoOf(ScrollableNode).p4u = function () {
    updateDefaultFlingBehavior(this);
    observeReads(this, ScrollableNode$onAttach$lambda(this));
  };
  protoOf(ScrollableNode).c53 = function () {
    updateDefaultFlingBehavior(this);
  };
  protoOf(ScrollableNode).v52 = function (focusProperties) {
    focusProperties.a52(false);
  };
  protoOf(ScrollableNode).z51 = function (event) {
    var tmp;
    if (((this.b9f_1 ? equals(get_key(event), Companion_getInstance_10().b6r_1) ? true : equals(get_key(event), Companion_getInstance_10().a6r_1) : false) ? get_type(event) === Companion_getInstance_11().g51_1 : false) ? !get_isCtrlPressed(event) : false) {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.gestures.ScrollableNode.onKeyEvent.<anonymous>' call
      var $this$with = this.h9f_1;
      var tmp_0;
      if (this.z9e_1.equals(Orientation_Vertical_getInstance())) {
        var viewportHeight = _IntSize___get_height__impl__prv63b(this.j9f_1.n8o_1);
        var tmp_1;
        if (equals(get_key(event), Companion_getInstance_10().a6r_1)) {
          tmp_1 = viewportHeight;
        } else {
          tmp_1 = -viewportHeight;
        }
        var yAmount = tmp_1;
        tmp_0 = Offset_0(0.0, yAmount);
      } else {
        var viewportWidth = _IntSize___get_width__impl__d9yl4o(this.j9f_1.n8o_1);
        var tmp_2;
        if (equals(get_key(event), Companion_getInstance_10().a6r_1)) {
          tmp_2 = viewportWidth;
        } else {
          tmp_2 = -viewportWidth;
        }
        var xAmount = tmp_2;
        tmp_0 = Offset_0(xAmount, 0.0);
      }
      var scrollAmount = tmp_0;
      var tmp_3 = this.k4u();
      launch(tmp_3, VOID, VOID, ScrollableNode$onKeyEvent$slambda_0($this$with, scrollAmount, null));
      tmp = true;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(ScrollableNode).y51 = function (event) {
    return false;
  };
  function ScrollingLogic$onScrollStopped$slambda$slambda(this$0, $this_scroll, resultContinuation) {
    this.k9j_1 = this$0;
    this.l9j_1 = $this_scroll;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollingLogic$onScrollStopped$slambda$slambda).s9j = function (velocity, $completion) {
    var tmp = this.t9j(velocity, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    var tmp_0 = tmp.mc();
    if (tmp_0 === get_COROUTINE_SUSPENDED())
      return tmp_0;
    return tmp_0;
  };
  protoOf(ScrollingLogic$onScrollStopped$slambda$slambda).yc = function (p1, $completion) {
    return this.s9j(p1 instanceof Velocity_0 ? p1.i37_1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollingLogic$onScrollStopped$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 7;
            this.ac_1 = 1;
            suspendResult = this.k9j_1.g95_1.v5b(this.m9j_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            this.ac_1 = 2;
            continue $sm;
          case 1:
            this.n9j_1 = suspendResult.i37_1;
            suspendResult = new Velocity_0(this.n9j_1);
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.o9j_1 = suspendResult.i37_1;
            this.p9j_1 = Velocity__minus_impl_w0cg92(this.m9j_1, this.o9j_1);
            this.ac_1 = 3;
            suspendResult = this.k9j_1.u9j(this.l9j_1, this.p9j_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            this.ac_1 = 4;
            continue $sm;
          case 3:
            this.q9j_1 = suspendResult.i37_1;
            suspendResult = new Velocity_0(this.q9j_1);
            this.ac_1 = 4;
            continue $sm;
          case 4:
            this.r9j_1 = suspendResult.i37_1;
            this.ac_1 = 5;
            suspendResult = this.k9j_1.g95_1.w5b(Velocity__minus_impl_w0cg92(this.p9j_1, this.r9j_1), this.r9j_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            this.ac_1 = 6;
            continue $sm;
          case 5:
            var unboxed = suspendResult.i37_1;
            suspendResult = new Velocity_0(unboxed);
            this.ac_1 = 6;
            continue $sm;
          case 6:
            var consumedPost = suspendResult.i37_1;
            var totalLeft = Velocity__minus_impl_w0cg92(this.r9j_1, consumedPost);
            return new Velocity_0(Velocity__minus_impl_w0cg92(this.m9j_1, totalLeft));
          case 7:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 7) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(ScrollingLogic$onScrollStopped$slambda$slambda).t9j = function (velocity, completion) {
    var i = new ScrollingLogic$onScrollStopped$slambda$slambda(this.k9j_1, this.l9j_1, completion);
    i.m9j_1 = velocity;
    return i;
  };
  function ScrollingLogic$onScrollStopped$slambda$slambda_0(this$0, $this_scroll, resultContinuation) {
    var i = new ScrollingLogic$onScrollStopped$slambda$slambda(this$0, $this_scroll, resultContinuation);
    var l = function (velocity, $completion) {
      return i.s9j(velocity.i37_1, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function _get_shouldDispatchOverscroll__1og37n($this) {
    return $this.b95_1.o96() ? true : $this.b95_1.n96();
  }
  function ScrollingLogic$dispatchScroll$lambda(this$0, $source, $this_dispatchScroll) {
    return function (delta) {
      var consumedByPreScroll = this$0.g95_1.t5b(delta.x33_1, $source);
      var scrollAvailableAfterPreScroll = Offset__minus_impl_hoj2c0(delta.x33_1, consumedByPreScroll);
      var singleAxisDeltaForSelfScroll = this$0.j95(this$0.i95(this$0.v9j(scrollAvailableAfterPreScroll)));
      var consumedBySelfScroll = this$0.i95(this$0.i97($this_dispatchScroll.v8o(singleAxisDeltaForSelfScroll)));
      var deltaAvailableAfterScroll = Offset__minus_impl_hoj2c0(scrollAvailableAfterPreScroll, consumedBySelfScroll);
      var consumedByPostScroll = this$0.g95_1.u5b(consumedBySelfScroll, deltaAvailableAfterScroll, $source);
      return new Offset(Offset__plus_impl_c78cg0(Offset__plus_impl_c78cg0(consumedByPreScroll, consumedBySelfScroll), consumedByPostScroll));
    };
  }
  function ScrollingLogic$onScrollStopped$slambda(this$0, $availableVelocity, resultContinuation) {
    this.e9k_1 = this$0;
    this.f9k_1 = $availableVelocity;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollingLogic$onScrollStopped$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollingLogic$onScrollStopped$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollingLogic$onScrollStopped$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            var tmp_0 = this;
            tmp_0.h9k_1 = ScrollingLogic$onScrollStopped$slambda$slambda_0(this.e9k_1, this.g9k_1, null);
            this.i9k_1 = this.e9k_1.d95_1;
            if (!(this.i9k_1 == null) ? _get_shouldDispatchOverscroll__1og37n(this.e9k_1) : false) {
              this.ac_1 = 2;
              suspendResult = this.i9k_1.j9k(this.f9k_1, this.h9k_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 1;
              suspendResult = this.h9k_1(new Velocity_0(this.f9k_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.ac_1 = 3;
            continue $sm;
          case 3:
            return Unit_instance;
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(ScrollingLogic$onScrollStopped$slambda).i8p = function ($this$scroll, completion) {
    var i = new ScrollingLogic$onScrollStopped$slambda(this.e9k_1, this.f9k_1, completion);
    i.g9k_1 = $this$scroll;
    return i;
  };
  function ScrollingLogic$onScrollStopped$slambda_0(this$0, $availableVelocity, resultContinuation) {
    var i = new ScrollingLogic$onScrollStopped$slambda(this$0, $availableVelocity, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ScrollingLogic$doFlingAnimation$lambda(this$0, $this_doFlingAnimation) {
    return function (delta) {
      return new Offset(this$0.i95(this$0.j97($this_doFlingAnimation, this$0.i95(delta.x33_1), Companion_getInstance_9().y5b_1)));
    };
  }
  function ScrollingLogic$doFlingAnimation$scope$1(this$0, $outerScopeScroll) {
    this.k9k_1 = this$0;
    this.l9k_1 = $outerScopeScroll;
  }
  protoOf(ScrollingLogic$doFlingAnimation$scope$1).v8o = function (pixels) {
    return this.k9k_1.j95(this.l9k_1(new Offset(this.k9k_1.i97(pixels))).x33_1);
  };
  function $onScrollStoppedCOROUTINE$22(_this__u8e3s4, initialVelocity, source, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u9k_1 = _this__u8e3s4;
    this.v9k_1 = initialVelocity;
    this.w9k_1 = source;
  }
  protoOf($onScrollStoppedCOROUTINE$22).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            if (this.w9k_1 === Companion_getInstance_9().a5c_1 ? !get_shouldBeTriggeredByMouseWheel(this.u9k_1.f95_1) : false) {
              return Unit_instance;
            }

            this.u9k_1.y9k(true);
            this.x9k_1 = this.u9k_1.z9k(this.v9k_1);
            this.ac_1 = 1;
            var tmp_0 = this.u9k_1.b95_1;
            suspendResult = tmp_0.a8q(VOID, ScrollingLogic$onScrollStopped$slambda_0(this.u9k_1, this.x9k_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.u9k_1.y9k(false);
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
  function $doFlingAnimationCOROUTINE$23(_this__u8e3s4, _this__u8e3s4_0, available, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.i9l_1 = _this__u8e3s4;
    this.j9l_1 = _this__u8e3s4_0;
    this.k9l_1 = available;
  }
  protoOf($doFlingAnimationCOROUTINE$23).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.l9l_1 = this.k9l_1;
            var tmp_0 = this;
            tmp_0.m9l_1 = ScrollingLogic$doFlingAnimation$lambda(this.i9l_1, this.j9l_1);
            var tmp_1 = this;
            tmp_1.n9l_1 = new ScrollingLogic$doFlingAnimation$scope$1(this.i9l_1, this.m9l_1);
            var tmp_2 = this;
            tmp_2.o9l_1 = this.n9l_1;
            var tmp_3 = this;
            tmp_3.p9l_1 = this.o9l_1;
            var tmp_4 = this;
            tmp_4.q9l_1 = this.i9l_1.f95_1;
            var tmp_5 = this;
            tmp_5.r9l_1 = this.q9l_1;
            this.s9l_1 = this.l9l_1;
            this.ac_1 = 1;
            suspendResult = this.r9l_1.x9d(this.p9l_1, this.i9l_1.h97(this.i9l_1.t9l(this.k9l_1)), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var ARGUMENT = suspendResult;
            var ARGUMENT_0 = this.i9l_1.h97(ARGUMENT);
            this.l9l_1 = this.i9l_1.w9b(this.s9l_1, ARGUMENT_0);
            return new Velocity_0(this.l9l_1);
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
  function ScrollingLogic(scrollableState, orientation, overscrollEffect, reverseDirection, flingBehavior, nestedScrollDispatcher) {
    this.b95_1 = scrollableState;
    this.c95_1 = orientation;
    this.d95_1 = overscrollEffect;
    this.e95_1 = reverseDirection;
    this.f95_1 = flingBehavior;
    this.g95_1 = nestedScrollDispatcher;
    this.h95_1 = mutableStateOf(false);
  }
  protoOf(ScrollingLogic).i97 = function (_this__u8e3s4) {
    return _this__u8e3s4 === 0.0 ? Companion_getInstance_1().u33_1 : this.c95_1.equals(Orientation_Horizontal_getInstance()) ? Offset_0(_this__u8e3s4, 0.0) : Offset_0(0.0, _this__u8e3s4);
  };
  protoOf(ScrollingLogic).v9j = function (_this__u8e3s4) {
    return this.c95_1.equals(Orientation_Horizontal_getInstance()) ? Offset__copy$default_impl_bmwjg8(_this__u8e3s4, VOID, 0.0) : Offset__copy$default_impl_bmwjg8(_this__u8e3s4, 0.0);
  };
  protoOf(ScrollingLogic).j95 = function (_this__u8e3s4) {
    return this.c95_1.equals(Orientation_Horizontal_getInstance()) ? _Offset___get_x__impl__xvi35n(_this__u8e3s4) : _Offset___get_y__impl__8bzhra(_this__u8e3s4);
  };
  protoOf(ScrollingLogic).t9l = function (_this__u8e3s4) {
    return this.c95_1.equals(Orientation_Horizontal_getInstance()) ? _Velocity___get_x__impl__qqcikv(_this__u8e3s4) : _Velocity___get_y__impl__239yhc(_this__u8e3s4);
  };
  protoOf(ScrollingLogic).z9k = function (_this__u8e3s4) {
    return this.c95_1.equals(Orientation_Horizontal_getInstance()) ? Velocity__copy$default_impl_eql69u(_this__u8e3s4, VOID, 0.0) : Velocity__copy$default_impl_eql69u(_this__u8e3s4, 0.0);
  };
  protoOf(ScrollingLogic).w9b = function (_this__u8e3s4, newValue) {
    return this.c95_1.equals(Orientation_Horizontal_getInstance()) ? Velocity__copy$default_impl_eql69u(_this__u8e3s4, newValue) : Velocity__copy$default_impl_eql69u(_this__u8e3s4, VOID, newValue);
  };
  protoOf(ScrollingLogic).h97 = function (_this__u8e3s4) {
    return this.e95_1 ? _this__u8e3s4 * -1 : _this__u8e3s4;
  };
  protoOf(ScrollingLogic).i95 = function (_this__u8e3s4) {
    return this.e95_1 ? Offset__times_impl_jz1mli(_this__u8e3s4, -1.0) : _this__u8e3s4;
  };
  protoOf(ScrollingLogic).j97 = function (_this__u8e3s4, initialAvailableDelta, source) {
    var performScroll = ScrollingLogic$dispatchScroll$lambda(this, source, _this__u8e3s4);
    var overscroll = this.d95_1;
    var tmp;
    if (source === Companion_getInstance_9().a5c_1) {
      tmp = performScroll(new Offset(initialAvailableDelta)).x33_1;
    } else if (!(overscroll == null) ? _get_shouldDispatchOverscroll__1og37n(this) : false) {
      tmp = overscroll.u9l(initialAvailableDelta, source, performScroll);
    } else {
      tmp = performScroll(new Offset(initialAvailableDelta)).x33_1;
    }
    return tmp;
  };
  protoOf(ScrollingLogic).v9l = function (scroll) {
    var tmp;
    if (this.b95_1.x9l()) {
      tmp = Companion_getInstance_1().u33_1;
    } else {
      tmp = this.w9l(scroll);
    }
    return tmp;
  };
  protoOf(ScrollingLogic).w9l = function (scroll) {
    return this.i97(this.h97(this.b95_1.y9l(this.h97(this.j95(scroll)))));
  };
  protoOf(ScrollingLogic).d9g = function (initialVelocity, source, $completion) {
    var tmp = new $onScrollStoppedCOROUTINE$22(this, initialVelocity, source, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollingLogic).u9j = function (_this__u8e3s4, available, $completion) {
    var tmp = new $doFlingAnimationCOROUTINE$23(this, _this__u8e3s4, available, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    var tmp_0 = tmp.mc();
    if (tmp_0 === get_COROUTINE_SUSPENDED())
      return tmp_0;
    return tmp_0;
  };
  protoOf(ScrollingLogic).a9h = function () {
    var tmp;
    if (this.b95_1.x9l() ? true : this.h95_1.s2()) {
      tmp = true;
    } else {
      var tmp0_safe_receiver = this.d95_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z9l();
      tmp = tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ScrollingLogic).y9k = function (isFlinging) {
    this.h95_1.g1d(isFlinging);
  };
  protoOf(ScrollingLogic).b9j = function (scrollableState, orientation, overscrollEffect, reverseDirection, flingBehavior, nestedScrollDispatcher) {
    this.b95_1 = scrollableState;
    this.c95_1 = orientation;
    this.d95_1 = overscrollEffect;
    this.e95_1 = reverseDirection;
    this.f95_1 = flingBehavior;
    this.g95_1 = nestedScrollDispatcher;
  };
  function ScrollableNestedScrollConnection$onPostFling$slambda($velocityLeft, $$this$with, $available, resultContinuation) {
    this.i9m_1 = $velocityLeft;
    this.j9m_1 = $$this$with;
    this.k9m_1 = $available;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollableNestedScrollConnection$onPostFling$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollableNestedScrollConnection$onPostFling$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollableNestedScrollConnection$onPostFling$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.ac_1 = 1;
            suspendResult = this.j9m_1.u9j(this.l9m_1, this.k9m_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            this.ac_1 = 2;
            continue $sm;
          case 1:
            var unboxed = suspendResult.i37_1;
            suspendResult = new Velocity_0(unboxed);
            this.ac_1 = 2;
            continue $sm;
          case 2:
            var ARGUMENT = suspendResult.i37_1;
            this.i9m_1._v = new Velocity_0(ARGUMENT);
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(ScrollableNestedScrollConnection$onPostFling$slambda).i8p = function ($this$scroll, completion) {
    var i = new ScrollableNestedScrollConnection$onPostFling$slambda(this.i9m_1, this.j9m_1, this.k9m_1, completion);
    i.l9m_1 = $this$scroll;
    return i;
  };
  function ScrollableNestedScrollConnection$onPostFling$slambda_0($velocityLeft, $$this$with, $available, resultContinuation) {
    var i = new ScrollableNestedScrollConnection$onPostFling$slambda($velocityLeft, $$this$with, $available, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $onPostFlingCOROUTINE$24(_this__u8e3s4, consumed, available, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u9m_1 = _this__u8e3s4;
    this.v9m_1 = consumed;
    this.w9m_1 = available;
  }
  protoOf($onPostFlingCOROUTINE$24).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (this.u9m_1.l9i_1) {
              this.y9m_1 = {_v: new Velocity_0(this.w9m_1)};
              var tmp_0 = this;
              tmp_0.z9m_1 = this.u9m_1.k9i_1;
              var tmp_1 = this;
              tmp_1.a9n_1 = this.z9m_1;
              this.ac_1 = 1;
              var tmp_2 = this.a9n_1.b95_1;
              suspendResult = tmp_2.a8q(VOID, ScrollableNestedScrollConnection$onPostFling$slambda_0(this.y9m_1, this.a9n_1, this.w9m_1, null), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_3 = this;
              tmp_3.x9m_1 = Companion_getInstance_8().k37_1;
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.x9m_1 = Velocity__minus_impl_w0cg92(this.w9m_1, this.y9m_1._v.i37_1);
            this.ac_1 = 2;
            continue $sm;
          case 2:
            var this_0 = new Velocity_0(this.x9m_1);
            this_0.i37_1;
            this.u9m_1.k9i_1.y9k(false);
            return this_0;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function ScrollableNestedScrollConnection(scrollingLogic, enabled) {
    this.k9i_1 = scrollingLogic;
    this.l9i_1 = enabled;
  }
  protoOf(ScrollableNestedScrollConnection).n5a = function (available, source) {
    if (source === Companion_getInstance_9().y5b_1) {
      this.k9i_1.y9k(true);
    }
    return Companion_getInstance_1().u33_1;
  };
  protoOf(ScrollableNestedScrollConnection).o5a = function (consumed, available, source) {
    var tmp;
    if (this.l9i_1) {
      tmp = this.k9i_1.v9l(available);
    } else {
      tmp = Companion_getInstance_1().u33_1;
    }
    return tmp;
  };
  protoOf(ScrollableNestedScrollConnection).q5a = function (consumed, available, $completion) {
    var tmp = new $onPostFlingCOROUTINE$24(this, consumed, available, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    var tmp_0 = tmp.mc();
    if (tmp_0 === get_COROUTINE_SUSPENDED())
      return tmp_0;
    return tmp_0;
  };
  function ModifierLocalScrollableContainerProvider(enabled) {
    Node.call(this);
    this.z9i_1 = enabled;
    this.a9j_1 = modifierLocalMapOf(to(get_ModifierLocalScrollableContainer(), true));
  }
  protoOf(ModifierLocalScrollableContainerProvider).f53 = function () {
    var tmp;
    if (this.z9i_1) {
      tmp = this.a9j_1;
    } else {
      tmp = modifierLocalMapOf_0();
    }
    return tmp;
  };
  function ScrollDraggableState$drag$slambda(this$0, $block, resultContinuation) {
    this.j9n_1 = this$0;
    this.k9n_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ScrollDraggableState$drag$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ScrollDraggableState$drag$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ScrollDraggableState$drag$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.j9n_1.n9n_1 = this.l9n_1;
            this.ac_1 = 1;
            suspendResult = this.k9n_1(this.j9n_1, this);
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
  protoOf(ScrollDraggableState$drag$slambda).i8p = function ($this$scroll, completion) {
    var i = new ScrollDraggableState$drag$slambda(this.j9n_1, this.k9n_1, completion);
    i.l9n_1 = $this$scroll;
    return i;
  };
  function ScrollDraggableState$drag$slambda_0(this$0, $block, resultContinuation) {
    var i = new ScrollDraggableState$drag$slambda(this$0, $block, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ScrollDraggableState(scrollLogic) {
    this.m9n_1 = scrollLogic;
    this.n9n_1 = get_NoOpScrollScope();
  }
  protoOf(ScrollDraggableState).w8s = function (pixels) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.gestures.ScrollDraggableState.dragBy.<anonymous>' call
    var $this$with = this.m9n_1;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.gestures.ScrollDraggableState.dragBy.<anonymous>.<anonymous>' call
    var $this$with_0 = this.n9n_1;
    $this$with.j97($this$with_0, $this$with.i97(pixels), Companion_getInstance_9().x5b_1);
  };
  protoOf(ScrollDraggableState).v8u = function (dragPriority, block, $completion) {
    var tmp = this.m9n_1.b95_1;
    return tmp.o99(dragPriority, ScrollDraggableState$drag$slambda_0(this, block, null), $completion);
  };
  function get_shouldBeTriggeredByMouseWheel(_this__u8e3s4) {
    _init_properties_Scrollable_kt__k2543d();
    return !isInterface(_this__u8e3s4, ScrollableDefaultFlingBehavior);
  }
  function ScrollConfig() {
  }
  function CanDragCalculation$lambda(down) {
    _init_properties_Scrollable_kt__k2543d();
    return !(down.p5f_1 === Companion_getInstance_7().a5h_1);
  }
  function NoOpOnDragStarted$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(NoOpOnDragStarted$slambda).y9n = function ($this$null, it, $completion) {
    var tmp = this.z9n($this$null, it, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(NoOpOnDragStarted$slambda).nh = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE();
    return this.y9n(tmp, p2 instanceof Offset ? p2.x33_1 : THROW_CCE(), $completion);
  };
  protoOf(NoOpOnDragStarted$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(NoOpOnDragStarted$slambda).z9n = function ($this$null, it, completion) {
    var i = new NoOpOnDragStarted$slambda(completion);
    i.w9n_1 = $this$null;
    i.x9n_1 = it;
    return i;
  };
  function NoOpOnDragStarted$slambda_0(resultContinuation) {
    var i = new NoOpOnDragStarted$slambda(resultContinuation);
    var l = function ($this$null, it, $completion) {
      return i.y9n($this$null, it.x33_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function NoOpScrollScope$1() {
  }
  protoOf(NoOpScrollScope$1).v8o = function (pixels) {
    return pixels;
  };
  function ModifierLocalScrollableContainer$lambda() {
    _init_properties_Scrollable_kt__k2543d();
    return false;
  }
  function NoOpFlingBehavior$1() {
  }
  protoOf(NoOpFlingBehavior$1).x9d = function (_this__u8e3s4, initialVelocity, $completion) {
    return 0.0;
  };
  function DefaultScrollMotionDurationScale$1() {
  }
  protoOf(DefaultScrollMotionDurationScale$1).y4u = function () {
    return 1.0;
  };
  function UnityDensity$1() {
  }
  protoOf(UnityDensity$1).x35 = function () {
    return 1.0;
  };
  protoOf(UnityDensity$1).i36 = function () {
    return 1.0;
  };
  var properties_initialized_Scrollable_kt_7d5rzr;
  function _init_properties_Scrollable_kt__k2543d() {
    if (!properties_initialized_Scrollable_kt_7d5rzr) {
      properties_initialized_Scrollable_kt_7d5rzr = true;
      CanDragCalculation = CanDragCalculation$lambda;
      NoOpOnDragStarted = NoOpOnDragStarted$slambda_0(null);
      NoOpScrollScope = new NoOpScrollScope$1();
      ModifierLocalScrollableContainer = modifierLocalOf(ModifierLocalScrollableContainer$lambda);
      NoOpFlingBehavior = new NoOpFlingBehavior$1();
      DefaultScrollMotionDurationScale = new DefaultScrollMotionDurationScale$1();
      UnityDensity = new UnityDensity$1();
    }
  }
  function ScrollScope() {
  }
  function ScrollableState() {
  }
  function ScrollableState_0(consumeScrollDelta) {
    return new DefaultScrollableState(consumeScrollDelta);
  }
  function DefaultScrollableState$scroll$slambda$slambda(this$0, $block, resultContinuation) {
    this.i9o_1 = this$0;
    this.j9o_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(DefaultScrollableState$scroll$slambda$slambda).h8p = function ($this$mutateWith, $completion) {
    var tmp = this.i8p($this$mutateWith, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(DefaultScrollableState$scroll$slambda$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(DefaultScrollableState$scroll$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.i9o_1.p9o_1.g1d(true);
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 4;
            this.ac_1 = 2;
            suspendResult = this.j9o_1(this.k9o_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.l9o_1 = suspendResult;
            this.bc_1 = 5;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.bc_1 = 5;
            this.i9o_1.p9o_1.g1d(false);
            return Unit_instance;
          case 4:
            this.bc_1 = 5;
            var t = this.dc_1;
            this.i9o_1.p9o_1.g1d(false);
            throw t;
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
  protoOf(DefaultScrollableState$scroll$slambda$slambda).i8p = function ($this$mutateWith, completion) {
    var i = new DefaultScrollableState$scroll$slambda$slambda(this.i9o_1, this.j9o_1, completion);
    i.k9o_1 = $this$mutateWith;
    return i;
  };
  function DefaultScrollableState$scroll$slambda$slambda_0(this$0, $block, resultContinuation) {
    var i = new DefaultScrollableState$scroll$slambda$slambda(this$0, $block, resultContinuation);
    var l = function ($this$mutateWith, $completion) {
      return i.h8p($this$mutateWith, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function DefaultScrollableState$scrollScope$1(this$0) {
    this.q9o_1 = this$0;
  }
  protoOf(DefaultScrollableState$scrollScope$1).v8o = function (pixels) {
    if (isNaN_0(pixels))
      return 0.0;
    return this.q9o_1.m9o_1(pixels);
  };
  function DefaultScrollableState$scroll$slambda(this$0, $scrollPriority, $block, resultContinuation) {
    this.z9o_1 = this$0;
    this.a9p_1 = $scrollPriority;
    this.b9p_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(DefaultScrollableState$scroll$slambda).w1e = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(DefaultScrollableState$scroll$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(DefaultScrollableState$scroll$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.z9o_1.o9o_1.j8n(this.z9o_1.n9o_1, this.a9p_1, DefaultScrollableState$scroll$slambda$slambda_0(this.z9o_1, this.b9p_1, null), this);
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
  protoOf(DefaultScrollableState$scroll$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new DefaultScrollableState$scroll$slambda(this.z9o_1, this.a9p_1, this.b9p_1, completion);
    i.c9p_1 = $this$coroutineScope;
    return i;
  };
  function DefaultScrollableState$scroll$slambda_0(this$0, $scrollPriority, $block, resultContinuation) {
    var i = new DefaultScrollableState$scroll$slambda(this$0, $scrollPriority, $block, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.w1e($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function DefaultScrollableState(onDelta) {
    this.m9o_1 = onDelta;
    var tmp = this;
    tmp.n9o_1 = new DefaultScrollableState$scrollScope$1(this);
    this.o9o_1 = new MutatorMutex();
    this.p9o_1 = mutableStateOf(false);
  }
  protoOf(DefaultScrollableState).o99 = function (scrollPriority, block, $completion) {
    return coroutineScope(DefaultScrollableState$scroll$slambda_0(this, scrollPriority, block, null), $completion);
  };
  protoOf(DefaultScrollableState).y9l = function (delta) {
    return this.m9o_1(delta);
  };
  protoOf(DefaultScrollableState).x9l = function () {
    return this.p9o_1.s2();
  };
  function get_NoPressGesture() {
    _init_properties_TapGestureDetector_kt__k4yygc();
    return NoPressGesture;
  }
  var NoPressGesture;
  function PressGestureScope() {
  }
  function detectTapAndPress(_this__u8e3s4, onPress, onTap, $completion) {
    onPress = onPress === VOID ? get_NoPressGesture() : onPress;
    onTap = onTap === VOID ? null : onTap;
    var pressScope = new PressGestureScopeImpl(_this__u8e3s4);
    return coroutineScope(detectTapAndPress$slambda_0(_this__u8e3s4, onPress, onTap, pressScope, null), $completion);
  }
  function $resetCOROUTINE$25(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.l9p_1 = _this__u8e3s4;
  }
  protoOf($resetCOROUTINE$25).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.l9p_1.p9p_1.w1g(VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.l9p_1.n9p_1 = false;
            this.l9p_1.o9p_1 = false;
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
  function $tryAwaitReleaseCOROUTINE$27(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.y9p_1 = _this__u8e3s4;
  }
  protoOf($tryAwaitReleaseCOROUTINE$27).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (!this.y9p_1.n9p_1 ? !this.y9p_1.o9p_1 : false) {
              this.ac_1 = 1;
              suspendResult = this.y9p_1.p9p_1.w1g(VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.y9p_1.p9p_1.y1g();
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return this.y9p_1.n9p_1;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function PressGestureScopeImpl(density) {
    this.m9p_1 = density;
    this.n9p_1 = false;
    this.o9p_1 = false;
    this.p9p_1 = Mutex(false);
  }
  protoOf(PressGestureScopeImpl).x35 = function () {
    return this.m9p_1.x35();
  };
  protoOf(PressGestureScopeImpl).i36 = function () {
    return this.m9p_1.i36();
  };
  protoOf(PressGestureScopeImpl).z35 = function (_this__u8e3s4) {
    return this.m9p_1.z35(_this__u8e3s4);
  };
  protoOf(PressGestureScopeImpl).e36 = function (_this__u8e3s4) {
    return this.m9p_1.e36(_this__u8e3s4);
  };
  protoOf(PressGestureScopeImpl).y35 = function (_this__u8e3s4) {
    return this.m9p_1.y35(_this__u8e3s4);
  };
  protoOf(PressGestureScopeImpl).a36 = function (_this__u8e3s4) {
    return this.m9p_1.a36(_this__u8e3s4);
  };
  protoOf(PressGestureScopeImpl).f36 = function (_this__u8e3s4) {
    return this.m9p_1.f36(_this__u8e3s4);
  };
  protoOf(PressGestureScopeImpl).l7p = function () {
    this.o9p_1 = true;
    this.p9p_1.y1g();
  };
  protoOf(PressGestureScopeImpl).gu = function () {
    this.n9p_1 = true;
    this.p9p_1.y1g();
  };
  protoOf(PressGestureScopeImpl).z9p = function ($completion) {
    var tmp = new $resetCOROUTINE$25(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(PressGestureScopeImpl).i8c = function ($completion) {
    var tmp = new $tryAwaitReleaseCOROUTINE$27(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function awaitFirstDown(_this__u8e3s4, requireUnconsumed, pass, $completion) {
    requireUnconsumed = requireUnconsumed === VOID ? true : requireUnconsumed;
    pass = pass === VOID ? PointerEventPass_Main_getInstance() : pass;
    var tmp = new $awaitFirstDownCOROUTINE$28(_this__u8e3s4, requireUnconsumed, pass, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function waitForUpOrCancellation(_this__u8e3s4, pass, $completion) {
    pass = pass === VOID ? PointerEventPass_Main_getInstance() : pass;
    var tmp = new $waitForUpOrCancellationCOROUTINE$29(_this__u8e3s4, pass, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function isPrimaryChangedDown(_this__u8e3s4, requireUnconsumed) {
    _init_properties_TapGestureDetector_kt__k4yygc();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.util.fastAll' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_0 = _this__u8e3s4.b5f_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.ui.util.fastAll.<anonymous>' call
          // Inline function 'androidx.compose.foundation.gestures.isPrimaryChangedDown.<anonymous>' call
          if (!(item.p5f_1 === Companion_getInstance_7().a5h_1)) {
            tmp$ret$1 = false;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = true;
    }
    var primaryButtonCausesDown = tmp$ret$1;
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'androidx.compose.ui.util.fastAll' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_1 = _this__u8e3s4.b5f_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_0 = 0;
      var last_0 = this_1.m() - 1 | 0;
      if (inductionVariable_0 <= last_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var item_0 = this_1.n(index_0);
          // Inline function 'androidx.compose.ui.util.fastAll.<anonymous>' call
          // Inline function 'androidx.compose.foundation.gestures.isPrimaryChangedDown.<anonymous>' call
          if (!(requireUnconsumed ? changedToDown(item_0) : changedToDownIgnoreConsumed(item_0))) {
            tmp$ret$3 = false;
            break $l$block_0;
          }
        }
         while (inductionVariable_0 <= last_0);
      tmp$ret$3 = true;
    }
    var changedToDown_0 = tmp$ret$3;
    return changedToDown_0 ? get_isPrimaryPressed(_this__u8e3s4.c5f_1) ? true : !primaryButtonCausesDown : false;
  }
  function NoPressGesture$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(NoPressGesture$slambda).s89 = function ($this$null, it, $completion) {
    var tmp = this.t89($this$null, it, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(NoPressGesture$slambda).nh = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, PressGestureScope) : false) ? p1 : THROW_CCE();
    return this.s89(tmp, p2 instanceof Offset ? p2.x33_1 : THROW_CCE(), $completion);
  };
  protoOf(NoPressGesture$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(NoPressGesture$slambda).t89 = function ($this$null, it, completion) {
    var i = new NoPressGesture$slambda(completion);
    i.f9r_1 = $this$null;
    i.g9r_1 = it;
    return i;
  };
  function NoPressGesture$slambda_0(resultContinuation) {
    var i = new NoPressGesture$slambda(resultContinuation);
    var l = function ($this$null, it, $completion) {
      return i.s89($this$null, it.x33_1, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function detectTapAndPress$slambda$slambda$slambda($pressScope, resultContinuation) {
    this.p9r_1 = $pressScope;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(detectTapAndPress$slambda$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.p9r_1.z9p(this);
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
  protoOf(detectTapAndPress$slambda$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new detectTapAndPress$slambda$slambda$slambda(this.p9r_1, completion);
    i.q9r_1 = $this$launch;
    return i;
  };
  function detectTapAndPress$slambda$slambda$slambda_0($pressScope, resultContinuation) {
    var i = new detectTapAndPress$slambda$slambda$slambda($pressScope, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function detectTapAndPress$slambda$slambda$slambda_1($onPress, $pressScope, $down, resultContinuation) {
    this.z9r_1 = $onPress;
    this.a9s_1 = $pressScope;
    this.b9s_1 = $down;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(detectTapAndPress$slambda$slambda$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.z9r_1(this.a9s_1, new Offset(this.b9s_1.j5f_1), this);
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
  protoOf(detectTapAndPress$slambda$slambda$slambda_1).x1e = function ($this$launch, completion) {
    var i = new detectTapAndPress$slambda$slambda$slambda_1(this.z9r_1, this.a9s_1, this.b9s_1, completion);
    i.c9s_1 = $this$launch;
    return i;
  };
  function detectTapAndPress$slambda$slambda$slambda_2($onPress, $pressScope, $down, resultContinuation) {
    var i = new detectTapAndPress$slambda$slambda$slambda_1($onPress, $pressScope, $down, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function detectTapAndPress$slambda$slambda$slambda_3($pressScope, resultContinuation) {
    this.l9s_1 = $pressScope;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(detectTapAndPress$slambda$slambda$slambda_3).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_3).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_3).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          this.l9s_1.l7p();
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_3).x1e = function ($this$launch, completion) {
    var i = new detectTapAndPress$slambda$slambda$slambda_3(this.l9s_1, completion);
    i.m9s_1 = $this$launch;
    return i;
  };
  function detectTapAndPress$slambda$slambda$slambda_4($pressScope, resultContinuation) {
    var i = new detectTapAndPress$slambda$slambda$slambda_3($pressScope, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function detectTapAndPress$slambda$slambda$slambda_5($pressScope, resultContinuation) {
    this.v9s_1 = $pressScope;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(detectTapAndPress$slambda$slambda$slambda_5).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_5).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_5).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          this.v9s_1.gu();
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(detectTapAndPress$slambda$slambda$slambda_5).x1e = function ($this$launch, completion) {
    var i = new detectTapAndPress$slambda$slambda$slambda_5(this.v9s_1, completion);
    i.w9s_1 = $this$launch;
    return i;
  };
  function detectTapAndPress$slambda$slambda$slambda_6($pressScope, resultContinuation) {
    var i = new detectTapAndPress$slambda$slambda$slambda_5($pressScope, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function detectTapAndPress$slambda$slambda($this_coroutineScope, $onPress, $onTap, $pressScope, resultContinuation) {
    this.f9t_1 = $this_coroutineScope;
    this.g9t_1 = $onPress;
    this.h9t_1 = $onTap;
    this.i9t_1 = $pressScope;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(detectTapAndPress$slambda$slambda).u8s = function ($this$awaitEachGesture, $completion) {
    var tmp = this.v8s($this$awaitEachGesture, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(detectTapAndPress$slambda$slambda).yc = function (p1, $completion) {
    return this.u8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(detectTapAndPress$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            launch(this.f9t_1, VOID, VOID, detectTapAndPress$slambda$slambda$slambda_0(this.i9t_1, null));
            this.ac_1 = 1;
            suspendResult = awaitFirstDown(this.j9t_1, VOID, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.k9t_1 = suspendResult;
            this.k9t_1.g5h();
            this.l9t_1 = this.k9t_1;
            if (!(this.g9t_1 === get_NoPressGesture())) {
              launch(this.f9t_1, VOID, VOID, detectTapAndPress$slambda$slambda$slambda_2(this.g9t_1, this.i9t_1, this.l9t_1, null));
            }

            this.ac_1 = 2;
            suspendResult = waitForUpOrCancellation(this.j9t_1, VOID, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var up = suspendResult;
            if (up == null) {
              launch(this.f9t_1, VOID, VOID, detectTapAndPress$slambda$slambda$slambda_4(this.i9t_1, null));
            } else {
              up.g5h();
              launch(this.f9t_1, VOID, VOID, detectTapAndPress$slambda$slambda$slambda_6(this.i9t_1, null));
              var tmp0_safe_receiver = this.h9t_1;
              if (tmp0_safe_receiver == null)
                null;
              else
                tmp0_safe_receiver(new Offset(up.j5f_1));
            }

            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(detectTapAndPress$slambda$slambda).v8s = function ($this$awaitEachGesture, completion) {
    var i = new detectTapAndPress$slambda$slambda(this.f9t_1, this.g9t_1, this.h9t_1, this.i9t_1, completion);
    i.j9t_1 = $this$awaitEachGesture;
    return i;
  };
  function detectTapAndPress$slambda$slambda_0($this_coroutineScope, $onPress, $onTap, $pressScope, resultContinuation) {
    var i = new detectTapAndPress$slambda$slambda($this_coroutineScope, $onPress, $onTap, $pressScope, resultContinuation);
    var l = function ($this$awaitEachGesture, $completion) {
      return i.u8s($this$awaitEachGesture, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function detectTapAndPress$slambda($this_detectTapAndPress, $onPress, $onTap, $pressScope, resultContinuation) {
    this.u9t_1 = $this_detectTapAndPress;
    this.v9t_1 = $onPress;
    this.w9t_1 = $onTap;
    this.x9t_1 = $pressScope;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(detectTapAndPress$slambda).w1e = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(detectTapAndPress$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(detectTapAndPress$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = awaitEachGesture(this.u9t_1, detectTapAndPress$slambda$slambda_0(this.y9t_1, this.v9t_1, this.w9t_1, this.x9t_1, null), this);
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
  protoOf(detectTapAndPress$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new detectTapAndPress$slambda(this.u9t_1, this.v9t_1, this.w9t_1, this.x9t_1, completion);
    i.y9t_1 = $this$coroutineScope;
    return i;
  };
  function detectTapAndPress$slambda_0($this_detectTapAndPress, $onPress, $onTap, $pressScope, resultContinuation) {
    var i = new detectTapAndPress$slambda($this_detectTapAndPress, $onPress, $onTap, $pressScope, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.w1e($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $awaitFirstDownCOROUTINE$28(_this__u8e3s4, requireUnconsumed, pass, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.i9q_1 = _this__u8e3s4;
    this.j9q_1 = requireUnconsumed;
    this.k9q_1 = pass;
  }
  protoOf($awaitFirstDownCOROUTINE$28).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.ac_1 = 2;
            suspendResult = this.i9q_1.j5m(this.k9q_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.l9q_1 = suspendResult;
            if (!isPrimaryChangedDown(this.l9q_1, this.j9q_1)) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.l9q_1.b5f_1.n(0);
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $waitForUpOrCancellationCOROUTINE$29(_this__u8e3s4, pass, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u9q_1 = _this__u8e3s4;
    this.v9q_1 = pass;
  }
  protoOf($waitForUpOrCancellationCOROUTINE$29).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!true) {
              this.ac_1 = 5;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = this.u9q_1.j5m(this.v9q_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.w9q_1 = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = this.w9q_1.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (!changedToUp(item)) {
                    tmp$ret$0 = false;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = true;
            }
             while (false);
            if (tmp$ret$0) {
              return this.w9q_1.b5f_1.n(0);
            }

            var tmp$ret$2;
            l$ret$3: do {
              var this_1 = this.w9q_1.b5f_1;
              var inductionVariable_0 = 0;
              var last_0 = this_1.m() - 1 | 0;
              if (inductionVariable_0 <= last_0)
                do {
                  var index_0 = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  var item_0 = this_1.n(index_0);
                  if (item_0.d5h() ? true : isOutOfBounds(item_0, this.u9q_1.u5f(), this.u9q_1.h5m())) {
                    tmp$ret$2 = true;
                    break l$ret$3;
                  }
                }
                 while (inductionVariable_0 <= last_0);
              tmp$ret$2 = false;
            }
             while (false);
            if (tmp$ret$2) {
              return null;
            }

            this.ac_1 = 3;
            suspendResult = this.u9q_1.j5m(PointerEventPass_Final_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var consumeCheck = suspendResult;
            var tmp$ret$4;
            l$ret$5: do {
              var this_2 = consumeCheck.b5f_1;
              var inductionVariable_1 = 0;
              var last_1 = this_2.m() - 1 | 0;
              if (inductionVariable_1 <= last_1)
                do {
                  var index_1 = inductionVariable_1;
                  inductionVariable_1 = inductionVariable_1 + 1 | 0;
                  var item_1 = this_2.n(index_1);
                  if (item_1.d5h()) {
                    tmp$ret$4 = true;
                    break l$ret$5;
                  }
                }
                 while (inductionVariable_1 <= last_1);
              tmp$ret$4 = false;
            }
             while (false);
            if (tmp$ret$4) {
              return null;
            }

            this.ac_1 = 1;
            continue $sm;
          case 4:
            throw this.dc_1;
          case 5:
            return Unit_instance;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  var properties_initialized_TapGestureDetector_kt_lhe8oi;
  function _init_properties_TapGestureDetector_kt__k4yygc() {
    if (!properties_initialized_TapGestureDetector_kt_lhe8oi) {
      properties_initialized_TapGestureDetector_kt_lhe8oi = true;
      NoPressGesture = NoPressGesture$slambda_0(null);
    }
  }
  function Companion_0() {
    Companion_instance_3 = this;
    this.z9t_1 = 0.01;
    this.a9u_1 = new AnimationVector1D(0.0);
  }
  protoOf(Companion_0).b9u = function (_this__u8e3s4) {
    // Inline function 'kotlin.math.absoluteValue' call
    return Math.abs(_this__u8e3s4) < 0.01;
  };
  var Companion_instance_3;
  function Companion_getInstance_24() {
    if (Companion_instance_3 == null)
      new Companion_0();
    return Companion_instance_3;
  }
  function UpdatableAnimationState$animateToZero$lambda(this$0, $durationScale, $beforeFrame) {
    return function (frameTime) {
      var tmp;
      var tmp_0 = this$0.r8o_1;
      AnimationConstants_getInstance();
      if (tmp_0.equals(new Long(0, -2147483648))) {
        this$0.r8o_1 = frameTime;
        tmp = Unit_instance;
      }
      var vectorizedCurrentValue = new AnimationVector1D(this$0.u8o_1);
      var tmp_1;
      if ($durationScale === 0.0) {
        tmp_1 = this$0.q8o_1.o7i(new AnimationVector1D(this$0.u8o_1), Companion_getInstance_24().a9u_1, this$0.s8o_1);
      } else {
        // Inline function 'kotlin.math.roundToLong' call
        // Inline function 'kotlin.Long.div' call
        var this_0 = frameTime.fb(this$0.r8o_1);
        var other = $durationScale;
        var this_1 = this_0.sb() / other;
        tmp_1 = roundToLong(this_1);
      }
      var playTime = tmp_1;
      var newValue = this$0.q8o_1.t7i(playTime, vectorizedCurrentValue, Companion_getInstance_24().a9u_1, this$0.s8o_1).l7k_1;
      this$0.s8o_1 = this$0.q8o_1.x7i(playTime, vectorizedCurrentValue, Companion_getInstance_24().a9u_1, this$0.s8o_1);
      this$0.r8o_1 = frameTime;
      var delta = this$0.u8o_1 - newValue;
      this$0.u8o_1 = newValue;
      $beforeFrame(delta);
      return Unit_instance;
    };
  }
  function UpdatableAnimationState$animateToZero$lambda_0(this$0, $beforeFrame) {
    return function (it) {
      var delta = this$0.u8o_1;
      this$0.u8o_1 = 0.0;
      $beforeFrame(delta);
      return Unit_instance;
    };
  }
  function $animateToZeroCOROUTINE$30(_this__u8e3s4, beforeFrame, afterFrame, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.k9u_1 = _this__u8e3s4;
    this.l9u_1 = beforeFrame;
    this.m9u_1 = afterFrame;
  }
  protoOf($animateToZeroCOROUTINE$30).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 10;
            if (!!this.k9u_1.t8o_1) {
              var message = 'animateToZero called while previous animation is running';
              throw IllegalStateException_init_$Create$(toString(message));
            }

            var tmp_0 = this;
            var tmp0_safe_receiver = this.t6().hc(Key_instance_1);
            var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y4u();
            tmp_0.n9u_1 = tmp1_elvis_lhs == null ? 1.0 : tmp1_elvis_lhs;
            this.k9u_1.t8o_1 = true;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 9;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            if (!!Companion_getInstance_24().b9u(this.k9u_1.u8o_1)) {
              this.ac_1 = 5;
              continue $sm;
            }

            this.ac_1 = 3;
            suspendResult = withFrameNanos(UpdatableAnimationState$animateToZero$lambda(this.k9u_1, this.n9u_1, this.l9u_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            this.m9u_1();
            if (this.n9u_1 === 0.0) {
              this.ac_1 = 5;
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 4:
            this.ac_1 = 2;
            continue $sm;
          case 5:
            var this_0 = this.k9u_1.u8o_1;
            if (!(Math.abs(this_0) === 0.0)) {
              this.ac_1 = 6;
              suspendResult = withFrameNanos(UpdatableAnimationState$animateToZero$lambda_0(this.k9u_1, this.l9u_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 7;
              continue $sm;
            }

          case 6:
            this.m9u_1();
            this.ac_1 = 7;
            continue $sm;
          case 7:
            this.o9u_1 = Unit_instance;
            this.bc_1 = 10;
            this.ac_1 = 8;
            continue $sm;
          case 8:
            this.bc_1 = 10;
            var tmp_1 = this.k9u_1;
            AnimationConstants_getInstance();
            tmp_1.r8o_1 = new Long(0, -2147483648);
            this.k9u_1.s8o_1 = Companion_getInstance_24().a9u_1;
            this.k9u_1.t8o_1 = false;
            return Unit_instance;
          case 9:
            this.bc_1 = 10;
            var t = this.dc_1;
            var tmp_2 = this.k9u_1;
            AnimationConstants_getInstance();
            tmp_2.r8o_1 = new Long(0, -2147483648);
            this.k9u_1.s8o_1 = Companion_getInstance_24().a9u_1;
            this.k9u_1.t8o_1 = false;
            throw t;
          case 10:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 10) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function UpdatableAnimationState(animationSpec) {
    Companion_getInstance_24();
    this.q8o_1 = animationSpec.e7i(get_VectorConverter(FloatCompanionObject_instance));
    var tmp = this;
    AnimationConstants_getInstance();
    tmp.r8o_1 = new Long(0, -2147483648);
    this.s8o_1 = Companion_getInstance_24().a9u_1;
    this.t8o_1 = false;
    this.u8o_1 = 0.0;
  }
  protoOf(UpdatableAnimationState).j8p = function (beforeFrame, afterFrame, $completion) {
    var tmp = new $animateToZeroCOROUTINE$30(this, beforeFrame, afterFrame, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function offsetOnMainAxis(_this__u8e3s4, orientation) {
    var tmp;
    if (orientation.equals(Orientation_Vertical_getInstance())) {
      tmp = _IntOffset___get_y__impl__2avpwj(_this__u8e3s4.p9u());
    } else {
      tmp = _IntOffset___get_x__impl__qiqr5o(_this__u8e3s4.p9u());
    }
    return tmp;
  }
  function Start() {
  }
  function Stop(start) {
    this.q9u_1 = start;
  }
  function Cancel(start) {
    this.r9u_1 = start;
  }
  function collectIsFocusedAsState(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1805515472);
    sourceInformation($composer_0, 'C(collectIsFocusedAsState)65@2219L34,66@2279L414,66@2258L435:FocusInteraction.kt#ywyzhk');
    if (isTraceInProgress()) {
      traceEventStart(-1805515472, $changed, -1, 'androidx.compose.foundation.interaction.collectIsFocusedAsState (FocusInteraction.kt:64)');
    }
    $composer_0.j1l(-1673627384);
    sourceInformation($composer_0, 'CC(remember):FocusInteraction.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsFocusedAsState.<anonymous>' call
      var value = mutableStateOf(false);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var isFocused = tmp1_group;
    $composer_0.j1l(-1673625084);
    sourceInformation($composer_0, 'CC(remember):FocusInteraction.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = (($changed & 14 ^ 6) > 4 ? $composer_0.v1o(_this__u8e3s4) : false) ? true : ($changed & 6) === 4;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_0.x1y();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsFocusedAsState.<anonymous>' call
      var value_0 = collectIsFocusedAsState$slambda_0(_this__u8e3s4, isFocused, null);
      $composer_0.d1z(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_0.l1l();
    LaunchedEffect(_this__u8e3s4, tmp2_group, $composer_0, 64 | 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return isFocused;
  }
  function Focus() {
  }
  function Unfocus(focus) {
    this.s9u_1 = focus;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0_0(function_0) {
    this.t9u_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_0).p19 = function (value, $completion) {
    return this.t9u_1(value, $completion);
  };
  function collectIsFocusedAsState$slambda$slambda($focusInteractions, $isFocused, resultContinuation) {
    this.c9v_1 = $focusInteractions;
    this.d9v_1 = $isFocused;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsFocusedAsState$slambda$slambda).v8l = function (interaction, $completion) {
    var tmp = this.w8l(interaction, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(collectIsFocusedAsState$slambda$slambda).yc = function (p1, $completion) {
    return this.v8l((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsFocusedAsState$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          var tmp0_subject = this.e9v_1;
          if (tmp0_subject instanceof Focus) {
            this.c9v_1.a1(this.e9v_1);
          } else {
            if (tmp0_subject instanceof Unfocus) {
              this.c9v_1.b1(this.e9v_1.s9u_1);
            }
          }
          var this_0 = this.c9v_1;
          this.d9v_1.g1d(!this_0.u());
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(collectIsFocusedAsState$slambda$slambda).w8l = function (interaction, completion) {
    var i = new collectIsFocusedAsState$slambda$slambda(this.c9v_1, this.d9v_1, completion);
    i.e9v_1 = interaction;
    return i;
  };
  function collectIsFocusedAsState$slambda$slambda_0($focusInteractions, $isFocused, resultContinuation) {
    var i = new collectIsFocusedAsState$slambda$slambda($focusInteractions, $isFocused, resultContinuation);
    var l = function (interaction, $completion) {
      return i.v8l(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsFocusedAsState$slambda($this_collectIsFocusedAsState, $isFocused, resultContinuation) {
    this.n9v_1 = $this_collectIsFocusedAsState;
    this.o9v_1 = $isFocused;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsFocusedAsState$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(collectIsFocusedAsState$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsFocusedAsState$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp_0 = this;
            tmp_0.q9v_1 = ArrayList_init_$Create$();
            this.ac_1 = 1;
            var tmp_1 = this.n9v_1.e8l();
            var tmp_2 = collectIsFocusedAsState$slambda$slambda_0(this.q9v_1, this.o9v_1, null);
            suspendResult = tmp_1.b18(new sam$kotlinx_coroutines_flow_FlowCollector$0_0(tmp_2), this);
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
  protoOf(collectIsFocusedAsState$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new collectIsFocusedAsState$slambda(this.n9v_1, this.o9v_1, completion);
    i.p9v_1 = $this$LaunchedEffect;
    return i;
  };
  function collectIsFocusedAsState$slambda_0($this_collectIsFocusedAsState, $isFocused, resultContinuation) {
    var i = new collectIsFocusedAsState$slambda($this_collectIsFocusedAsState, $isFocused, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsHoveredAsState(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1206586544);
    sourceInformation($composer_0, 'C(collectIsHoveredAsState)65@2151L34,66@2211L411,66@2190L432:HoverInteraction.kt#ywyzhk');
    if (isTraceInProgress()) {
      traceEventStart(1206586544, $changed, -1, 'androidx.compose.foundation.interaction.collectIsHoveredAsState (HoverInteraction.kt:64)');
    }
    $composer_0.j1l(854988196);
    sourceInformation($composer_0, 'CC(remember):HoverInteraction.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsHoveredAsState.<anonymous>' call
      var value = mutableStateOf(false);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var isHovered = tmp1_group;
    $composer_0.j1l(854990493);
    sourceInformation($composer_0, 'CC(remember):HoverInteraction.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = (($changed & 14 ^ 6) > 4 ? $composer_0.v1o(_this__u8e3s4) : false) ? true : ($changed & 6) === 4;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_0.x1y();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsHoveredAsState.<anonymous>' call
      var value_0 = collectIsHoveredAsState$slambda_0(_this__u8e3s4, isHovered, null);
      $composer_0.d1z(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_0.l1l();
    LaunchedEffect(_this__u8e3s4, tmp2_group, $composer_0, 64 | 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return isHovered;
  }
  function Enter() {
  }
  function Exit(enter) {
    this.r9v_1 = enter;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0_1(function_0) {
    this.s9v_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_1).p19 = function (value, $completion) {
    return this.s9v_1(value, $completion);
  };
  function collectIsHoveredAsState$slambda$slambda($hoverInteractions, $isHovered, resultContinuation) {
    this.b9w_1 = $hoverInteractions;
    this.c9w_1 = $isHovered;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsHoveredAsState$slambda$slambda).v8l = function (interaction, $completion) {
    var tmp = this.w8l(interaction, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(collectIsHoveredAsState$slambda$slambda).yc = function (p1, $completion) {
    return this.v8l((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsHoveredAsState$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          var tmp0_subject = this.d9w_1;
          if (tmp0_subject instanceof Enter) {
            this.b9w_1.a1(this.d9w_1);
          } else {
            if (tmp0_subject instanceof Exit) {
              this.b9w_1.b1(this.d9w_1.r9v_1);
            }
          }
          var this_0 = this.b9w_1;
          this.c9w_1.g1d(!this_0.u());
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(collectIsHoveredAsState$slambda$slambda).w8l = function (interaction, completion) {
    var i = new collectIsHoveredAsState$slambda$slambda(this.b9w_1, this.c9w_1, completion);
    i.d9w_1 = interaction;
    return i;
  };
  function collectIsHoveredAsState$slambda$slambda_0($hoverInteractions, $isHovered, resultContinuation) {
    var i = new collectIsHoveredAsState$slambda$slambda($hoverInteractions, $isHovered, resultContinuation);
    var l = function (interaction, $completion) {
      return i.v8l(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsHoveredAsState$slambda($this_collectIsHoveredAsState, $isHovered, resultContinuation) {
    this.m9w_1 = $this_collectIsHoveredAsState;
    this.n9w_1 = $isHovered;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsHoveredAsState$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(collectIsHoveredAsState$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsHoveredAsState$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp_0 = this;
            tmp_0.p9w_1 = ArrayList_init_$Create$();
            this.ac_1 = 1;
            var tmp_1 = this.m9w_1.e8l();
            var tmp_2 = collectIsHoveredAsState$slambda$slambda_0(this.p9w_1, this.n9w_1, null);
            suspendResult = tmp_1.b18(new sam$kotlinx_coroutines_flow_FlowCollector$0_1(tmp_2), this);
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
  protoOf(collectIsHoveredAsState$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new collectIsHoveredAsState$slambda(this.m9w_1, this.n9w_1, completion);
    i.o9w_1 = $this$LaunchedEffect;
    return i;
  };
  function collectIsHoveredAsState$slambda_0($this_collectIsHoveredAsState, $isHovered, resultContinuation) {
    var i = new collectIsHoveredAsState$slambda($this_collectIsHoveredAsState, $isHovered, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function Interaction() {
  }
  function funMutableInteractionSource() {
    return new MutableInteractionSourceImpl();
  }
  function MutableInteractionSourceImpl() {
    this.q9w_1 = MutableSharedFlow(VOID, 16, BufferOverflow_DROP_OLDEST_getInstance());
  }
  protoOf(MutableInteractionSourceImpl).e8l = function () {
    return this.q9w_1;
  };
  protoOf(MutableInteractionSourceImpl).z87 = function (interaction, $completion) {
    return this.q9w_1.p19(interaction, $completion);
  };
  protoOf(MutableInteractionSourceImpl).l88 = function (interaction) {
    return this.q9w_1.z1b(interaction);
  };
  function collectIsPressedAsState(_this__u8e3s4, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1692965168);
    sourceInformation($composer_0, 'C(collectIsPressedAsState)84@3016L34,85@3076L504,85@3055L525:PressInteraction.kt#ywyzhk');
    if (isTraceInProgress()) {
      traceEventStart(-1692965168, $changed, -1, 'androidx.compose.foundation.interaction.collectIsPressedAsState (PressInteraction.kt:83)');
    }
    $composer_0.j1l(1614367837);
    sourceInformation($composer_0, 'CC(remember):PressInteraction.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsPressedAsState.<anonymous>' call
      var value = mutableStateOf(false);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var isPressed = tmp1_group;
    $composer_0.j1l(1614370227);
    sourceInformation($composer_0, 'CC(remember):PressInteraction.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = (($changed & 14 ^ 6) > 4 ? $composer_0.v1o(_this__u8e3s4) : false) ? true : ($changed & 6) === 4;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_0.x1y();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.interaction.collectIsPressedAsState.<anonymous>' call
      var value_0 = collectIsPressedAsState$slambda_0(_this__u8e3s4, isPressed, null);
      $composer_0.d1z(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_0.l1l();
    LaunchedEffect(_this__u8e3s4, tmp2_group, $composer_0, 64 | 14 & $changed);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return isPressed;
  }
  function Press(pressPosition) {
    this.r9w_1 = pressPosition;
  }
  function Release(press) {
    this.s9w_1 = press;
  }
  function Cancel_0(press) {
    this.t9w_1 = press;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0_2(function_0) {
    this.u9w_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0_2).p19 = function (value, $completion) {
    return this.u9w_1(value, $completion);
  };
  function collectIsPressedAsState$slambda$slambda($pressInteractions, $isPressed, resultContinuation) {
    this.d9x_1 = $pressInteractions;
    this.e9x_1 = $isPressed;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsPressedAsState$slambda$slambda).v8l = function (interaction, $completion) {
    var tmp = this.w8l(interaction, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(collectIsPressedAsState$slambda$slambda).yc = function (p1, $completion) {
    return this.v8l((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsPressedAsState$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          var tmp0_subject = this.f9x_1;
          if (tmp0_subject instanceof Press) {
            this.d9x_1.a1(this.f9x_1);
          } else {
            if (tmp0_subject instanceof Release) {
              this.d9x_1.b1(this.f9x_1.s9w_1);
            } else {
              if (tmp0_subject instanceof Cancel_0) {
                this.d9x_1.b1(this.f9x_1.t9w_1);
              }
            }
          }
          var this_0 = this.d9x_1;
          this.e9x_1.g1d(!this_0.u());
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(collectIsPressedAsState$slambda$slambda).w8l = function (interaction, completion) {
    var i = new collectIsPressedAsState$slambda$slambda(this.d9x_1, this.e9x_1, completion);
    i.f9x_1 = interaction;
    return i;
  };
  function collectIsPressedAsState$slambda$slambda_0($pressInteractions, $isPressed, resultContinuation) {
    var i = new collectIsPressedAsState$slambda$slambda($pressInteractions, $isPressed, resultContinuation);
    var l = function (interaction, $completion) {
      return i.v8l(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function collectIsPressedAsState$slambda($this_collectIsPressedAsState, $isPressed, resultContinuation) {
    this.o9x_1 = $this_collectIsPressedAsState;
    this.p9x_1 = $isPressed;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(collectIsPressedAsState$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(collectIsPressedAsState$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(collectIsPressedAsState$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp_0 = this;
            tmp_0.r9x_1 = ArrayList_init_$Create$();
            this.ac_1 = 1;
            var tmp_1 = this.o9x_1.e8l();
            var tmp_2 = collectIsPressedAsState$slambda$slambda_0(this.r9x_1, this.p9x_1, null);
            suspendResult = tmp_1.b18(new sam$kotlinx_coroutines_flow_FlowCollector$0_2(tmp_2), this);
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
  protoOf(collectIsPressedAsState$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new collectIsPressedAsState$slambda(this.o9x_1, this.p9x_1, completion);
    i.q9x_1 = $this$LaunchedEffect;
    return i;
  };
  function collectIsPressedAsState$slambda_0($this_collectIsPressedAsState, $isPressed, resultContinuation) {
    var i = new collectIsPressedAsState$slambda($this_collectIsPressedAsState, $isPressed, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function LazyGridSlots(sizes, positions) {
    this.s9x_1 = sizes;
    this.t9x_1 = positions;
  }
  function LazyGrid(modifier, state, slots, contentPadding, reverseLayout, isVertical, flingBehavior, userScrollEnabled, verticalArrangement, horizontalArrangement, content, $composer, $changed, $changed1, $default) {
    var modifier_0 = {_v: modifier};
    var contentPadding_0 = {_v: contentPadding};
    var reverseLayout_0 = {_v: reverseLayout};
    var flingBehavior_0 = {_v: flingBehavior};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-649686062);
    sourceInformation($composer_0, 'C(LazyGrid)P(5,8,7,1,6,4,2,9,10,3)68@3230L15,78@3671L18,80@3720L50,82@3796L51,84@3874L24,85@3923L244,104@4440L277,113@4837L48,116@5048L7,112@4781L376,124@5381L7,100@4295L1571:LazyGrid.kt#7791vq');
    var $dirty = $changed;
    var $dirty1 = $changed1;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier_0._v) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.v1o(state) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.v1o(slots) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.v1o(contentPadding_0._v) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.k1y(reverseLayout_0._v) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.k1y(isVertical) ? 131072 : 65536);
    if (($changed & 3670016) === 0)
      $dirty = $dirty | ((($default & 64) === 0 ? $composer_0.v1o(flingBehavior_0._v) : false) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.k1y(userScrollEnabled) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.v1o(verticalArrangement) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.v1o(horizontalArrangement) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.j1y(content) ? 4 : 2);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 11) === 2)) ? true : !$composer_0.f1x()) {
      $composer_0.j1x();
      if (($changed & 1) === 0 ? true : $composer_0.n1x()) {
        if (!(($default & 1) === 0)) {
          modifier_0._v = Companion_instance;
        }
        if (!(($default & 8) === 0)) {
          // Inline function 'androidx.compose.ui.unit.dp' call
          var tmp$ret$0 = _Dp___init__impl__ms3zkb(0);
          contentPadding_0._v = PaddingValues(tmp$ret$0);
        }
        if (!(($default & 16) === 0)) {
          reverseLayout_0._v = false;
        }
        if (!(($default & 64) === 0)) {
          flingBehavior_0._v = ScrollableDefaults_instance.w9c($composer_0, 6);
          $dirty = $dirty & -3670017;
        }
      } else {
        $composer_0.q1r();
        if (!(($default & 64) === 0))
          $dirty = $dirty & -3670017;
      }
      $composer_0.k1x();
      if (isTraceInProgress()) {
        traceEventStart(-649686062, $dirty, $dirty1, 'androidx.compose.foundation.lazy.grid.LazyGrid (LazyGrid.kt:77)');
      }
      var overscrollEffect = ScrollableDefaults_instance.x9c($composer_0, 6);
      var itemProviderLambda = rememberLazyGridItemProviderLambda(state, content, $composer_0, 14 & $dirty >> 3 | 112 & $dirty1 << 3);
      var semanticState = rememberLazyGridSemanticState(state, reverseLayout_0._v, $composer_0, 14 & $dirty >> 3 | 112 & $dirty >> 9);
      // Inline function 'androidx.compose.runtime.rememberCoroutineScope' call
      var getContext = null;
      var $composer_1 = $composer_0;
      $composer_1.j1l(773894976);
      sourceInformation($composer_1, 'CC(rememberCoroutineScope)482@20254L144:Effects.kt#9igjgp');
      if (!((1 & 1) === 0)) {
        getContext = LazyGrid$lambda;
      }
      var composer = $composer_1;
      $composer_1.j1l(-954370320);
      sourceInformation($composer_1, 'CC(remember):Effects.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.runtime.rememberCoroutineScope.<anonymous>' call
        var value = new CompositionScopedCoroutineScopeCanceller(createCompositionCoroutineScope(getContext(), composer));
        $composer_1.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_1.l1l();
      var wrapper = tmp1_group;
      var tmp0 = wrapper.e26_1;
      $composer_1.l1l();
      var coroutineScope = tmp0;
      var measurePolicy = rememberLazyGridMeasurePolicy(itemProviderLambda, state, slots, contentPadding_0._v, reverseLayout_0._v, isVertical, horizontalArrangement, verticalArrangement, coroutineScope, $composer_0, 134217728 | 112 & $dirty | 896 & $dirty | 7168 & $dirty | 57344 & $dirty | 458752 & $dirty | 3670016 & $dirty >> 9 | 29360128 & $dirty >> 3);
      state.a9y_1 = isVertical;
      var orientation = isVertical ? Orientation_Vertical_getInstance() : Orientation_Horizontal_getInstance();
      var tmp_1 = clipScrollableContainer(lazyLayoutSemantics(modifier_0._v.q4t(state.i9y_1).q4t(state.j9y_1), itemProviderLambda, semanticState, orientation, userScrollEnabled, reverseLayout_0._v, $composer_0, 57344 & $dirty >> 9 | 458752 & $dirty << 3), orientation);
      var tmp_2 = rememberLazyGridBeyondBoundsState(state, $composer_0, 14 & $dirty >> 3);
      var tmp_3 = reverseLayout_0._v;
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalLayoutDirection();
      var $composer_2 = $composer_0;
      sourceInformationMarkerStart($composer_2, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0_0 = $composer_2.j1z(this_0);
      sourceInformationMarkerEnd($composer_2);
      var tmp0_$receiver = overscroll(lazyLayoutBeyondBoundsModifier(tmp_1, tmp_2, state.m9y_1, tmp_3, tmp0_0, orientation, userScrollEnabled, $composer_0, 512 | 7168 & $dirty >> 3 | 3670016 & $dirty >> 3), overscrollEffect);
      var tmp_4 = ScrollableDefaults_instance;
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_1 = get_LocalLayoutDirection();
      var $composer_3 = $composer_0;
      sourceInformationMarkerStart($composer_3, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0_1 = $composer_3.j1z(this_1);
      sourceInformationMarkerEnd($composer_3);
      var tmp1_reverseDirection = tmp_4.y9c(tmp0_1, orientation, reverseLayout_0._v);
      var tmp2_interactionSource = state.w9x_1;
      var tmp3_modifier = scrollable(tmp0_$receiver, state, orientation, overscrollEffect, userScrollEnabled, tmp1_reverseDirection, flingBehavior_0._v, tmp2_interactionSource);
      var tmp4_prefetchState = state.t9y_1;
      LazyLayout(itemProviderLambda, tmp3_modifier, tmp4_prefetchState, measurePolicy, $composer_0, 0, 0);
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
      tmp0_safe_receiver.j24(LazyGrid$lambda_0(modifier_0, state, slots, contentPadding_0, reverseLayout_0, isVertical, flingBehavior_0, userScrollEnabled, verticalArrangement, horizontalArrangement, content, $changed, $changed1, $default));
    }
  }
  function rememberLazyGridMeasurePolicy(itemProviderLambda, state, slots, contentPadding, reverseLayout, isVertical, horizontalArrangement, verticalArrangement, coroutineScope, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-2068958445);
    sourceInformation($composer_0, 'C(rememberLazyGridMeasurePolicy)P(4,7,6!1,5,3,2,8)167@6903L8834:LazyGrid.kt#7791vq');
    if (isTraceInProgress()) {
      traceEventStart(-2068958445, $changed, -1, 'androidx.compose.foundation.lazy.grid.rememberLazyGridMeasurePolicy (LazyGrid.kt:167)');
    }
    $composer_0.j1l(1026586339);
    sourceInformation($composer_0, 'CC(remember):LazyGrid.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(!!(!!(!!(!!(!!(((($changed & 112 ^ 48) > 32 ? $composer_0.v1o(state) : false) ? true : ($changed & 48) === 32) | ((($changed & 896 ^ 384) > 256 ? $composer_0.v1o(slots) : false) ? true : ($changed & 384) === 256)) | ((($changed & 7168 ^ 3072) > 2048 ? $composer_0.v1o(contentPadding) : false) ? true : ($changed & 3072) === 2048)) | ((($changed & 57344 ^ 24576) > 16384 ? $composer_0.k1y(reverseLayout) : false) ? true : ($changed & 24576) === 16384)) | ((($changed & 458752 ^ 196608) > 131072 ? $composer_0.k1y(isVertical) : false) ? true : ($changed & 196608) === 131072)) | ((($changed & 3670016 ^ 1572864) > 1048576 ? $composer_0.v1o(horizontalArrangement) : false) ? true : ($changed & 1572864) === 1048576)) | ((($changed & 29360128 ^ 12582912) > 8388608 ? $composer_0.v1o(verticalArrangement) : false) ? true : ($changed & 12582912) === 8388608));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridMeasurePolicy.<anonymous>' call
      var value = rememberLazyGridMeasurePolicy$lambda(isVertical, contentPadding, reverseLayout, itemProviderLambda, slots, state, verticalArrangement, horizontalArrangement, coroutineScope);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function LazyGrid$lambda() {
    return EmptyCoroutineContext_getInstance();
  }
  function LazyGrid$lambda_0($modifier, $state, $slots, $contentPadding, $reverseLayout, $isVertical, $flingBehavior, $userScrollEnabled, $verticalArrangement, $horizontalArrangement, $content, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      LazyGrid($modifier._v, $state, $slots, $contentPadding._v, $reverseLayout._v, $isVertical, $flingBehavior._v, $userScrollEnabled, $verticalArrangement, $horizontalArrangement, $content, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_instance;
    };
  }
  function rememberLazyGridMeasurePolicy$1$1$measuredItemProvider$1($itemProvider, $this_null, $spaceBetweenLines, $state, $isVertical, $reverseLayout, $beforeContentPadding, $afterContentPadding, $visualItemOffset) {
    this.x9y_1 = $this_null;
    this.y9y_1 = $state;
    this.z9y_1 = $isVertical;
    this.a9z_1 = $reverseLayout;
    this.b9z_1 = $beforeContentPadding;
    this.c9z_1 = $afterContentPadding;
    this.d9z_1 = $visualItemOffset;
    LazyGridMeasuredItemProvider.call(this, $itemProvider, $this_null, $spaceBetweenLines);
  }
  protoOf(rememberLazyGridMeasurePolicy$1$1$measuredItemProvider$1).e9z = function (index, key, contentType, crossAxisSize, mainAxisSpacing, placeables) {
    var tmp0_layoutDirection = this.x9y_1.a43();
    var tmp1_animator = this.y9y_1.l9y_1;
    return new LazyGridMeasuredItem(index, key, this.z9y_1, crossAxisSize, mainAxisSpacing, this.a9z_1, tmp0_layoutDirection, this.b9z_1, this.c9z_1, placeables, this.d9z_1, contentType, tmp1_animator);
  };
  function rememberLazyGridMeasurePolicy$1$1$measuredLineProvider$1($isVertical, $resolvedSlots, $itemsCount, $spaceBetweenLines, $measuredItemProvider, $spanLayoutProvider) {
    this.r9z_1 = $isVertical;
    this.s9z_1 = $resolvedSlots;
    LazyGridMeasuredLineProvider.call(this, $isVertical, $resolvedSlots, $itemsCount, $spaceBetweenLines, $measuredItemProvider, $spanLayoutProvider);
  }
  protoOf(rememberLazyGridMeasurePolicy$1$1$measuredLineProvider$1).t9z = function (index, items, spans, mainAxisSpacing) {
    return new LazyGridMeasuredLine(index, items, this.s9z_1, spans, this.r9z_1, mainAxisSpacing);
  };
  function rememberLazyGridMeasurePolicy$lambda$lambda($spanLayoutProvider, $measuredLineProvider) {
    return function (line) {
      var lineConfiguration = $spanLayoutProvider.ma0(line);
      var index = lineConfiguration.na0_1;
      var slot = 0;
      var result = ArrayList_init_$Create$_0(lineConfiguration.oa0_1.m());
      var this_0 = lineConfiguration.oa0_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      var tmp;
      if (inductionVariable <= last) {
        do {
          var index_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index_0).pa0_1;
          // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridMeasurePolicy.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
          var span = _GridItemSpan___get_currentLineSpan__impl__sg7kqc(item);
          result.a1(to(index, new Constraints($measuredLineProvider.aa0(slot, span))));
          index = index + 1 | 0;
          slot = slot + span | 0;
        }
         while (inductionVariable <= last);
        tmp = Unit_instance;
      }
      return result;
    };
  }
  function rememberLazyGridMeasurePolicy$lambda$lambda_0($this_null, $containerConstraints, $totalHorizontalPadding, $totalVerticalPadding) {
    return function (width, height, placement) {
      return $this_null.v5r(constrainWidth($containerConstraints, width + $totalHorizontalPadding | 0), constrainHeight($containerConstraints, height + $totalVerticalPadding | 0), emptyMap(), placement);
    };
  }
  function rememberLazyGridMeasurePolicy$lambda($isVertical, $contentPadding, $reverseLayout, $itemProviderLambda, $slots, $state, $verticalArrangement, $horizontalArrangement, $coroutineScope) {
    return function ($this$null, containerConstraints) {
      checkScrollableContainerConstraints(containerConstraints.s35_1, $isVertical ? Orientation_Vertical_getInstance() : Orientation_Horizontal_getInstance());
      var tmp;
      if ($isVertical) {
        tmp = $this$null.z35($contentPadding.t7u($this$null.a43()));
      } else {
        tmp = $this$null.z35(calculateStartPadding($contentPadding, $this$null.a43()));
      }
      var startPadding = tmp;
      var tmp_0;
      if ($isVertical) {
        tmp_0 = $this$null.z35($contentPadding.s7u($this$null.a43()));
      } else {
        tmp_0 = $this$null.z35(calculateEndPadding($contentPadding, $this$null.a43()));
      }
      var endPadding = tmp_0;
      var topPadding = $this$null.z35($contentPadding.y7u());
      var bottomPadding = $this$null.z35($contentPadding.z7u());
      var totalVerticalPadding = topPadding + bottomPadding | 0;
      var totalHorizontalPadding = startPadding + endPadding | 0;
      var totalMainAxisPadding = $isVertical ? totalVerticalPadding : totalHorizontalPadding;
      var beforeContentPadding = ($isVertical ? !$reverseLayout : false) ? topPadding : ($isVertical ? $reverseLayout : false) ? bottomPadding : (!$isVertical ? !$reverseLayout : false) ? startPadding : endPadding;
      var afterContentPadding = totalMainAxisPadding - beforeContentPadding | 0;
      var contentConstraints = offset(containerConstraints.s35_1, -totalHorizontalPadding | 0, -totalVerticalPadding | 0);
      var itemProvider = $itemProviderLambda();
      var spanLayoutProvider = itemProvider.qa0();
      var resolvedSlots = $slots.ra0($this$null, containerConstraints.s35_1);
      var slotsPerLine = resolvedSlots.s9x_1.length;
      spanLayoutProvider.sa0(slotsPerLine);
      $state.z9x_1 = $this$null;
      $state.sa0(slotsPerLine);
      var tmp_1;
      if ($isVertical) {
        var tmp$ret$1;
        $l$block: {
          // Inline function 'kotlin.requireNotNull' call
          var value = $verticalArrangement;
          // Inline function 'kotlin.contracts.contract' call
          if (value == null) {
            // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridMeasurePolicy.<anonymous>.<anonymous>.<anonymous>' call
            var message = 'null verticalArrangement when isVertical == true';
            throw IllegalArgumentException_init_$Create$(toString(message));
          } else {
            tmp$ret$1 = value;
            break $l$block;
          }
        }
        tmp_1 = tmp$ret$1.t7s();
      } else {
        var tmp$ret$3;
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          var value_0 = $horizontalArrangement;
          // Inline function 'kotlin.contracts.contract' call
          if (value_0 == null) {
            // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridMeasurePolicy.<anonymous>.<anonymous>.<anonymous>' call
            var message_0 = 'null horizontalArrangement when isVertical == false';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          } else {
            tmp$ret$3 = value_0;
            break $l$block_0;
          }
        }
        tmp_1 = tmp$ret$3.t7s();
      }
      var spaceBetweenLinesDp = tmp_1;
      var spaceBetweenLines = $this$null.z35(spaceBetweenLinesDp);
      var itemsCount = itemProvider.ta0();
      var tmp_2;
      if ($isVertical) {
        tmp_2 = _Constraints___get_maxHeight__impl__dt3e8z(containerConstraints.s35_1) - totalVerticalPadding | 0;
      } else {
        tmp_2 = _Constraints___get_maxWidth__impl__uuyqc(containerConstraints.s35_1) - totalHorizontalPadding | 0;
      }
      var mainAxisAvailableSize = tmp_2;
      var tmp_3;
      if (!$reverseLayout ? true : mainAxisAvailableSize > 0) {
        tmp_3 = IntOffset(startPadding, topPadding);
      } else {
        tmp_3 = IntOffset($isVertical ? startPadding : startPadding + mainAxisAvailableSize | 0, $isVertical ? topPadding + mainAxisAvailableSize | 0 : topPadding);
      }
      var visualItemOffset = tmp_3;
      var measuredItemProvider = new rememberLazyGridMeasurePolicy$1$1$measuredItemProvider$1(itemProvider, $this$null, spaceBetweenLines, $state, $isVertical, $reverseLayout, beforeContentPadding, afterContentPadding, visualItemOffset);
      var measuredLineProvider = new rememberLazyGridMeasurePolicy$1$1$measuredLineProvider$1($isVertical, resolvedSlots, itemsCount, spaceBetweenLines, measuredItemProvider, spanLayoutProvider);
      $state.ua0(rememberLazyGridMeasurePolicy$lambda$lambda(spanLayoutProvider, measuredLineProvider));
      var firstVisibleLineIndex;
      var firstVisibleLineScrollOffset;
      $l$block_2: {
        // Inline function 'androidx.compose.runtime.snapshots.Companion.withoutReadObservation' call
        // Inline function 'kotlin.contracts.contract' call
        var snapshot = Companion_instance_1.n2s();
        try {
          $l$block_1: {
            // Inline function 'androidx.compose.runtime.snapshots.Snapshot.enter' call
            var previous = snapshot.t28();
            try {
              var index = $state.wa0(itemProvider, $state.va0());
              var tmp_4;
              if (index < itemsCount ? true : itemsCount <= 0) {
                firstVisibleLineIndex = spanLayoutProvider.xa0(index);
                firstVisibleLineScrollOffset = $state.ya0();
                tmp_4 = Unit_instance;
              } else {
                firstVisibleLineIndex = spanLayoutProvider.xa0(itemsCount - 1 | 0);
                firstVisibleLineScrollOffset = 0;
                tmp_4 = Unit_instance;
              }
              break $l$block_1;
            }finally {
              snapshot.u28(previous);
            }
          }
          break $l$block_2;
        }finally {
          snapshot.or();
        }
      }
      var pinnedItems = calculateLazyLayoutPinnedIndices(itemProvider, $state.o9y_1, $state.m9y_1);
      // Inline function 'kotlin.also' call
      var tmp_5 = $state.x9x_1;
      var this_0 = measureLazyGrid(itemsCount, measuredLineProvider, measuredItemProvider, mainAxisAvailableSize, beforeContentPadding, afterContentPadding, spaceBetweenLines, firstVisibleLineIndex, firstVisibleLineScrollOffset, tmp_5, contentConstraints, $isVertical, $verticalArrangement, $horizontalArrangement, $reverseLayout, $this$null, $state.l9y_1, spanLayoutProvider, pinnedItems, $coroutineScope, $state.q9y_1, rememberLazyGridMeasurePolicy$lambda$lambda_0($this$null, containerConstraints.s35_1, totalHorizontalPadding, totalVerticalPadding));
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridMeasurePolicy.<anonymous>.<anonymous>.<anonymous>' call
      $state.za0(this_0);
      return this_0;
    };
  }
  function LazyGridAnimateScrollScope(state) {
    this.aa1_1 = state;
  }
  function rememberLazyGridBeyondBoundsState(state, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(2004349821);
    sourceInformation($composer_0, 'C(rememberLazyGridBeyondBoundsState)24@947L64:LazyGridBeyondBoundsModifier.kt#7791vq');
    if (isTraceInProgress()) {
      traceEventStart(2004349821, $changed, -1, 'androidx.compose.foundation.lazy.grid.rememberLazyGridBeyondBoundsState (LazyGridBeyondBoundsModifier.kt:23)');
    }
    $composer_0.j1l(-242332290);
    sourceInformation($composer_0, 'CC(remember):LazyGridBeyondBoundsModifier.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = (($changed & 14 ^ 6) > 4 ? $composer_0.v1o(state) : false) ? true : ($changed & 6) === 4;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridBeyondBoundsState.<anonymous>' call
      var value = new LazyGridBeyondBoundsState(state);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function LazyGridBeyondBoundsState(state) {
    this.ba1_1 = state;
  }
  protoOf(LazyGridBeyondBoundsState).ca1 = function () {
    var tmp0_safe_receiver = this.ba1_1.h9y_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.u6c();
    }
  };
  protoOf(LazyGridBeyondBoundsState).ta0 = function () {
    return this.ba1_1.da1().ea1();
  };
  protoOf(LazyGridBeyondBoundsState).fa1 = function () {
    // Inline function 'kotlin.collections.isNotEmpty' call
    return !this.ba1_1.da1().ga1().u();
  };
  protoOf(LazyGridBeyondBoundsState).ha1 = function () {
    return this.ba1_1.va0();
  };
  protoOf(LazyGridBeyondBoundsState).ia1 = function () {
    return last(this.ba1_1.da1().ga1()).ja1();
  };
  function Adaptive(minSize) {
    this.ka1_1 = minSize;
    // Inline function 'kotlin.require' call
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$0 = _Dp___init__impl__ms3zkb(0);
    // Inline function 'kotlin.contracts.contract' call
    if (!(Dp__compareTo_impl_tlg3dl(this.ka1_1, tmp$ret$0) > 0)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.Adaptive.<anonymous>' call
      var message = 'Provided min size ' + new Dp(this.ka1_1) + ' should be larger than zero.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(Adaptive).la1 = function (_this__u8e3s4, availableSize, spacing) {
    // Inline function 'kotlin.comparisons.maxOf' call
    var a = (availableSize + spacing | 0) / (_this__u8e3s4.z35(this.ka1_1) + spacing | 0) | 0;
    var count = Math.max(a, 1);
    return calculateCellsCrossAxisSizeImpl(availableSize, count, spacing);
  };
  protoOf(Adaptive).hashCode = function () {
    return Dp__hashCode_impl_sxkrra(this.ka1_1);
  };
  protoOf(Adaptive).equals = function (other) {
    var tmp;
    if (other instanceof Adaptive) {
      tmp = equals(this.ka1_1, other.ka1_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  function LazyVerticalGrid(columns, modifier, state, contentPadding, reverseLayout, verticalArrangement, horizontalArrangement, flingBehavior, userScrollEnabled, content, $composer, $changed, $default) {
    var modifier_0 = {_v: modifier};
    var state_0 = {_v: state};
    var contentPadding_0 = {_v: contentPadding};
    var reverseLayout_0 = {_v: reverseLayout};
    var verticalArrangement_0 = {_v: verticalArrangement};
    var horizontalArrangement_0 = {_v: horizontalArrangement};
    var flingBehavior_0 = {_v: flingBehavior};
    var userScrollEnabled_0 = {_v: userScrollEnabled};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(1485410512);
    sourceInformation($composer_0, 'C(LazyVerticalGrid)P(!1,5,7,2,6,9,4,3,8)64@2980L23,70@3340L15,75@3468L71,74@3442L481:LazyGridDsl.kt#7791vq');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(columns) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier_0._v) ? 32 : 16);
    if (($changed & 896) === 0)
      $dirty = $dirty | ((($default & 4) === 0 ? $composer_0.v1o(state_0._v) : false) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.v1o(contentPadding_0._v) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.k1y(reverseLayout_0._v) ? 16384 : 8192);
    if (($changed & 458752) === 0)
      $dirty = $dirty | ((($default & 32) === 0 ? $composer_0.v1o(verticalArrangement_0._v) : false) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.v1o(horizontalArrangement_0._v) ? 1048576 : 524288);
    if (($changed & 29360128) === 0)
      $dirty = $dirty | ((($default & 128) === 0 ? $composer_0.v1o(flingBehavior_0._v) : false) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.k1y(userScrollEnabled_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.j1y(content) ? 536870912 : 268435456);
    if (!(($dirty & 1533916891) === 306783378) ? true : !$composer_0.f1x()) {
      $composer_0.j1x();
      if (($changed & 1) === 0 ? true : $composer_0.n1x()) {
        if (!(($default & 2) === 0)) {
          modifier_0._v = Companion_instance;
        }
        if (!(($default & 4) === 0)) {
          state_0._v = rememberLazyGridState(0, 0, $composer_0, 0, 3);
          $dirty = $dirty & -897;
        }
        if (!(($default & 8) === 0)) {
          // Inline function 'androidx.compose.ui.unit.dp' call
          var tmp$ret$0 = _Dp___init__impl__ms3zkb(0);
          contentPadding_0._v = PaddingValues(tmp$ret$0);
        }
        if (!(($default & 16) === 0)) {
          reverseLayout_0._v = false;
        }
        if (!(($default & 32) === 0)) {
          verticalArrangement_0._v = !reverseLayout_0._v ? Arrangement_getInstance().c7t_1 : Arrangement_getInstance().d7t_1;
          $dirty = $dirty & -458753;
        }
        if (!(($default & 64) === 0)) {
          horizontalArrangement_0._v = Arrangement_getInstance().a7t_1;
        }
        if (!(($default & 128) === 0)) {
          flingBehavior_0._v = ScrollableDefaults_instance.w9c($composer_0, 6);
          $dirty = $dirty & -29360129;
        }
        if (!(($default & 256) === 0)) {
          userScrollEnabled_0._v = true;
        }
      } else {
        $composer_0.q1r();
        if (!(($default & 4) === 0))
          $dirty = $dirty & -897;
        if (!(($default & 32) === 0))
          $dirty = $dirty & -458753;
        if (!(($default & 128) === 0))
          $dirty = $dirty & -29360129;
      }
      $composer_0.k1x();
      if (isTraceInProgress()) {
        traceEventStart(1485410512, $dirty, -1, 'androidx.compose.foundation.lazy.grid.LazyVerticalGrid (LazyGridDsl.kt:73)');
      }
      var tmp0_slots = rememberColumnWidthSums(columns, horizontalArrangement_0._v, contentPadding_0._v, $composer_0, 14 & $dirty | 112 & $dirty >> 15 | 896 & $dirty >> 3);
      LazyGrid(modifier_0._v, state_0._v, tmp0_slots, contentPadding_0._v, reverseLayout_0._v, true, flingBehavior_0._v, userScrollEnabled_0._v, verticalArrangement_0._v, horizontalArrangement_0._v, content, $composer_0, 196608 | 14 & $dirty >> 3 | 112 & $dirty >> 3 | 7168 & $dirty | 57344 & $dirty | 3670016 & $dirty >> 3 | 29360128 & $dirty >> 3 | 234881024 & $dirty << 9 | 1879048192 & $dirty << 9, 14 & $dirty >> 27, 0);
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
      tmp0_safe_receiver.j24(LazyVerticalGrid$lambda(columns, modifier_0, state_0, contentPadding_0, reverseLayout_0, verticalArrangement_0, horizontalArrangement_0, flingBehavior_0, userScrollEnabled_0, content, $changed, $default));
    }
  }
  function calculateCellsCrossAxisSizeImpl(gridSize, slotCount, spacing) {
    var gridSizeWithoutSpacing = gridSize - imul(spacing, slotCount - 1 | 0) | 0;
    var slotSize = gridSizeWithoutSpacing / slotCount | 0;
    var remainingPixels = gridSizeWithoutSpacing % slotCount | 0;
    // Inline function 'kotlin.collections.List' call
    // Inline function 'kotlin.collections.MutableList' call
    var list = ArrayList_init_$Create$_0(slotCount);
    // Inline function 'kotlin.repeat' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < slotCount)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.MutableList.<anonymous>' call
        // Inline function 'androidx.compose.foundation.lazy.grid.calculateCellsCrossAxisSizeImpl.<anonymous>' call
        var tmp$ret$0 = slotSize + (index < remainingPixels ? 1 : 0) | 0;
        list.a1(tmp$ret$0);
      }
       while (inductionVariable < slotCount);
    return list;
  }
  function rememberColumnWidthSums(columns, horizontalArrangement, contentPadding, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1632454918);
    sourceInformation($composer_0, 'C(rememberColumnWidthSums)P(!1,2)148@6622L975:LazyGridDsl.kt#7791vq');
    if (isTraceInProgress()) {
      traceEventStart(1632454918, $changed, -1, 'androidx.compose.foundation.lazy.grid.rememberColumnWidthSums (LazyGridDsl.kt:148)');
    }
    $composer_0.j1l(-2103044334);
    sourceInformation($composer_0, 'CC(remember):LazyGridDsl.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(!!(((($changed & 14 ^ 6) > 4 ? $composer_0.v1o(columns) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.v1o(horizontalArrangement) : false) ? true : ($changed & 48) === 32)) | ((($changed & 896 ^ 384) > 256 ? $composer_0.v1o(contentPadding) : false) ? true : ($changed & 384) === 256));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberColumnWidthSums.<anonymous>' call
      var value = new GridSlotCache(rememberColumnWidthSums$lambda(contentPadding, columns, horizontalArrangement));
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function GridSlotCache(calculation) {
    this.ma1_1 = calculation;
    this.na1_1 = Constraints_0();
    this.oa1_1 = 0.0;
    this.pa1_1 = null;
  }
  protoOf(GridSlotCache).ra0 = function (density, constraints) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    if ((!(this.pa1_1 == null) ? equals(this.na1_1, constraints) : false) ? this.oa1_1 === density.x35() : false) {
      return ensureNotNull(this.pa1_1);
    }
    this.na1_1 = constraints;
    this.oa1_1 = density.x35();
    // Inline function 'kotlin.also' call
    var this_0 = this.ma1_1(density, new Constraints(constraints));
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.grid.GridSlotCache.invoke.<anonymous>.<anonymous>' call
    this.pa1_1 = this_0;
    return this_0;
  };
  function LazyVerticalGrid$lambda($columns, $modifier, $state, $contentPadding, $reverseLayout, $verticalArrangement, $horizontalArrangement, $flingBehavior, $userScrollEnabled, $content, $$changed, $$default) {
    return function ($composer, $force) {
      LazyVerticalGrid($columns, $modifier._v, $state._v, $contentPadding._v, $reverseLayout._v, $verticalArrangement._v, $horizontalArrangement._v, $flingBehavior._v, $userScrollEnabled._v, $content, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  function rememberColumnWidthSums$lambda($contentPadding, $columns, $horizontalArrangement) {
    return function ($this$$receiver, constraints) {
      var tmp = _Constraints___get_maxWidth__impl__uuyqc(constraints.s35_1);
      Companion_getInstance_0();
      // Inline function 'kotlin.contracts.contract' call
      var tmp_0;
      if (!!(tmp === 2147483647)) {
        // Inline function 'androidx.compose.foundation.lazy.grid.rememberColumnWidthSums.<anonymous>.<anonymous>.<anonymous>' call
        var message = "LazyVerticalGrid's width should be bound by parent.";
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'androidx.compose.ui.unit.Dp.plus' call
      var this_0 = calculateStartPadding($contentPadding, LayoutDirection_Ltr_getInstance());
      var other = calculateEndPadding($contentPadding, LayoutDirection_Ltr_getInstance());
      var horizontalPadding = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) + _Dp___get_value__impl__geb1vb(other));
      var gridWidth = _Constraints___get_maxWidth__impl__uuyqc(constraints.s35_1) - $this$$receiver.z35(horizontalPadding) | 0;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberColumnWidthSums.<anonymous>.<anonymous>.<anonymous>' call
      var $this$with = $columns;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberColumnWidthSums.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
      var sizes = toIntArray($this$with.la1($this$$receiver, gridWidth, $this$$receiver.z35($horizontalArrangement.t7s())));
      var positions = new Int32Array(sizes.length);
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      $horizontalArrangement.u7s($this$$receiver, gridWidth, sizes, LayoutDirection_Ltr_getInstance(), positions);
      return new LazyGridSlots(sizes, positions);
    };
  }
  function LazyGridIntervalContent$Companion$DefaultSpan$lambda($this$null, it) {
    return new GridItemSpan(GridItemSpan_0(1));
  }
  function Companion_1() {
    Companion_instance_4 = this;
    var tmp = this;
    tmp.qa1_1 = LazyGridIntervalContent$Companion$DefaultSpan$lambda;
  }
  var Companion_instance_4;
  function Companion_getInstance_25() {
    if (Companion_instance_4 == null)
      new Companion_1();
    return Companion_instance_4;
  }
  function LazyGridIntervalContent(content) {
    Companion_getInstance_25();
    LazyLayoutIntervalContent.call(this);
    this.ra1_1 = new LazyGridSpanLayoutProvider(this);
    this.sa1_1 = new MutableIntervalList();
    this.ta1_1 = false;
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    content(this);
  }
  protoOf(LazyGridIntervalContent).ua1 = function () {
    return this.sa1_1;
  };
  protoOf(LazyGridIntervalContent).va1 = function (count, key, span, contentType, itemContent) {
    this.sa1_1.za1(count, new LazyGridInterval(key, span == null ? Companion_getInstance_25().qa1_1 : span, contentType, itemContent));
    if (!(span == null))
      this.ta1_1 = true;
  };
  function LazyGridInterval(key, span, type, item) {
    this.ca2_1 = key;
    this.da2_1 = span;
    this.ea2_1 = type;
    this.fa2_1 = item;
  }
  protoOf(LazyGridInterval).r2 = function () {
    return this.ca2_1;
  };
  protoOf(LazyGridInterval).ga2 = function () {
    return this.ea2_1;
  };
  function Companion_2() {
    this.ha2_1 = -1;
    this.ia2_1 = -1;
  }
  var Companion_instance_5;
  function Companion_getInstance_26() {
    return Companion_instance_5;
  }
  function get_EmptyArray() {
    _init_properties_LazyGridItemPlacementAnimator_kt__mafnv7();
    return EmptyArray;
  }
  var EmptyArray;
  function initializeAnimation($this, item, mainAxisOffset, itemInfo) {
    var firstPlaceableOffset = item.ba3_1;
    var tmp;
    if (item.la2_1) {
      tmp = IntOffset__copy$default_impl_1y5pbb(firstPlaceableOffset, VOID, mainAxisOffset);
    } else {
      tmp = IntOffset__copy$default_impl_1y5pbb(firstPlaceableOffset, mainAxisOffset);
    }
    var targetFirstPlaceableOffset = tmp;
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = itemInfo.ha3_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.initializeAnimation.<anonymous>' call
      if (!(element == null)) {
        // Inline function 'androidx.compose.ui.unit.IntOffset.minus' call
        var this_0 = item.ba3_1;
        var diffToFirstPlaceableOffset = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_0) - _IntOffset___get_x__impl__qiqr5o(firstPlaceableOffset) | 0, _IntOffset___get_y__impl__2avpwj(this_0) - _IntOffset___get_y__impl__2avpwj(firstPlaceableOffset) | 0);
        var tmp_0 = element;
        // Inline function 'androidx.compose.ui.unit.IntOffset.plus' call
        tmp_0.na3_1 = IntOffset(_IntOffset___get_x__impl__qiqr5o(targetFirstPlaceableOffset) + _IntOffset___get_x__impl__qiqr5o(diffToFirstPlaceableOffset) | 0, _IntOffset___get_y__impl__2avpwj(targetFirstPlaceableOffset) + _IntOffset___get_y__impl__2avpwj(diffToFirstPlaceableOffset) | 0);
      }
    }
  }
  function initializeAnimation$default($this, item, mainAxisOffset, itemInfo, $super) {
    itemInfo = itemInfo === VOID ? ensureNotNull($this.ua3_1.z2(item.ka2_1)) : itemInfo;
    return initializeAnimation($this, item, mainAxisOffset, itemInfo);
  }
  function startAnimationsIfNeeded($this, item) {
    var itemInfo = ensureNotNull($this.ua3_1.z2(item.ka2_1));
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = itemInfo.ha3_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.startAnimationsIfNeeded.<anonymous>' call
      if (!(element == null)) {
        var newTarget = item.ba3_1;
        var currentTarget = element.na3_1;
        if (!equals(currentTarget, Companion_getInstance_28().da4_1) ? !equals(currentTarget, newTarget) : false) {
          // Inline function 'androidx.compose.ui.unit.IntOffset.minus' call
          var tmp$ret$0 = IntOffset(_IntOffset___get_x__impl__qiqr5o(newTarget) - _IntOffset___get_x__impl__qiqr5o(currentTarget) | 0, _IntOffset___get_y__impl__2avpwj(newTarget) - _IntOffset___get_y__impl__2avpwj(currentTarget) | 0);
          element.ca4(tmp$ret$0);
        }
        element.na3_1 = newTarget;
      }
    }
  }
  function _get_hasAnimations__pyw8qw(_this__u8e3s4, $this) {
    // Inline function 'kotlin.repeat' call
    var times = _this__u8e3s4.ea4();
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.<get-hasAnimations>.<anonymous>' call
        if (get_specs(_this__u8e3s4.fa4(index)) == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          return true;
        }
      }
       while (inductionVariable < times);
    return false;
  }
  function sam$kotlin_Comparator$0(function_0) {
    this.ga4_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).j9 = function (a, b) {
    return this.ga4_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.j9(a, b);
  };
  function LazyGridItemPlacementAnimator$onMeasured$lambda($previousKeyToIndexMap) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp = $previousKeyToIndexMap.ha4(b.ka2_1);
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp$ret$1 = $previousKeyToIndexMap.ha4(a.ka2_1);
      return compareValues(tmp, tmp$ret$1);
    };
  }
  function LazyGridItemPlacementAnimator$onMeasured$lambda_0($previousKeyToIndexMap) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp = $previousKeyToIndexMap.ha4(a.ka2_1);
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp$ret$1 = $previousKeyToIndexMap.ha4(b.ka2_1);
      return compareValues(tmp, tmp$ret$1);
    };
  }
  function LazyGridItemPlacementAnimator$onMeasured$lambda_1(this$0) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp = this$0.va3_1.ha4(b.ka2_1);
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp$ret$1 = this$0.va3_1.ha4(a.ka2_1);
      return compareValues(tmp, tmp$ret$1);
    };
  }
  function LazyGridItemPlacementAnimator$onMeasured$lambda_2(this$0) {
    return function (a, b) {
      // Inline function 'kotlin.comparisons.compareValuesBy' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp = this$0.va3_1.ha4(a.ka2_1);
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
      var tmp$ret$1 = this$0.va3_1.ha4(b.ka2_1);
      return compareValues(tmp, tmp$ret$1);
    };
  }
  function LazyGridItemPlacementAnimator() {
    this.ua3_1 = mutableScatterMapOf();
    this.va3_1 = Empty_instance;
    this.wa3_1 = 0;
    this.xa3_1 = mutableScatterSetOf();
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.ya3_1 = ArrayList_init_$Create$();
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.za3_1 = ArrayList_init_$Create$();
    var tmp_1 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_1.aa4_1 = ArrayList_init_$Create$();
    var tmp_2 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_2.ba4_1 = ArrayList_init_$Create$();
  }
  protoOf(LazyGridItemPlacementAnimator).ia4 = function (consumedScroll, layoutWidth, layoutHeight, positionedItems, itemProvider, spanLayoutProvider, isVertical, coroutineScope) {
    var tmp;
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.util.fastAny' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = positionedItems.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = positionedItems.n(index);
          // Inline function 'androidx.compose.ui.util.fastAny.<anonymous>' call
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
          if (_get_hasAnimations__pyw8qw(item, this)) {
            tmp$ret$1 = true;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = false;
    }
    if (!tmp$ret$1) {
      tmp = this.ua3_1.u();
    } else {
      tmp = false;
    }
    if (tmp) {
      this.v2b();
      return Unit_instance;
    }
    var previousFirstVisibleIndex = this.wa3_1;
    var tmp_0 = this;
    var tmp0_safe_receiver = firstOrNull(positionedItems);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ja2_1;
    tmp_0.wa3_1 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var previousKeyToIndexMap = this.va3_1;
    this.va3_1 = itemProvider.k9z();
    var mainAxisLayoutSize = isVertical ? layoutHeight : layoutWidth;
    var tmp_1;
    if (isVertical) {
      tmp_1 = IntOffset(0, consumedScroll);
    } else {
      tmp_1 = IntOffset(consumedScroll, 0);
    }
    var scrollOffset = tmp_1;
    // Inline function 'androidx.collection.ScatterMap.forEachKey' call
    var this_0 = this.ua3_1;
    var k = this_0.rm_1;
    $l$block_0: {
      // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
      var m = this_0.qm_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= lastIndex)
        do {
          var i = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_1 = slot;
          if (!this_1.nb(this_1.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_1 = 0;
            if (inductionVariable_1 < bitCount)
              do {
                var j = inductionVariable_1;
                inductionVariable_1 = inductionVariable_1 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index_0 = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ScatterMap.forEachKey.<anonymous>' call
                  // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
                  var tmp_2 = k[index_0];
                  var it = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
                  this.xa3_1.a1(it);
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_1 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block_0;
            }
          }
        }
         while (!(i === lastIndex));
    }
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_2 = 0;
    var last_0 = positionedItems.m() - 1 | 0;
    if (inductionVariable_2 <= last_0)
      do {
        var index_1 = inductionVariable_2;
        inductionVariable_2 = inductionVariable_2 + 1 | 0;
        var item_0 = positionedItems.n(index_1);
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
        this.xa3_1.b1(item_0.ka2_1);
        if (_get_hasAnimations__pyw8qw(item_0, this)) {
          var itemInfo = this.ua3_1.z2(item_0.ka2_1);
          if (itemInfo == null) {
            var newItemInfo = new ItemInfo(item_0.ma2_1, item_0.ja4());
            newItemInfo.ka4(item_0, coroutineScope);
            this.ua3_1.bn(item_0.ka2_1, newItemInfo);
            var previousIndex = previousKeyToIndexMap.ha4(item_0.ka2_1);
            if (!(previousIndex === -1) ? !(item_0.ja2_1 === previousIndex) : false) {
              if (previousIndex < previousFirstVisibleIndex) {
                this.ya3_1.a1(item_0);
              } else {
                this.za3_1.a1(item_0);
              }
            } else {
              // Inline function 'kotlin.let' call
              // Inline function 'kotlin.contracts.contract' call
              // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>.<anonymous>' call
              var it_0 = item_0.ba3_1;
              var tmp$ret$6 = item_0.la2_1 ? _IntOffset___get_y__impl__2avpwj(it_0) : _IntOffset___get_x__impl__qiqr5o(it_0);
              initializeAnimation(this, item_0, tmp$ret$6, newItemInfo);
            }
          } else {
            // Inline function 'kotlin.collections.forEach' call
            var indexedObject = itemInfo.ha3_1;
            var inductionVariable_3 = 0;
            var last_1 = indexedObject.length;
            while (inductionVariable_3 < last_1) {
              var element = indexedObject[inductionVariable_3];
              inductionVariable_3 = inductionVariable_3 + 1 | 0;
              // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>.<anonymous>' call
              if (!(element == null) ? !equals(element.na3_1, Companion_getInstance_28().da4_1) : false) {
                var tmp_3 = element;
                // Inline function 'androidx.compose.ui.unit.IntOffset.plus' call
                var this_2 = element.na3_1;
                tmp_3.na3_1 = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_2) + _IntOffset___get_x__impl__qiqr5o(scrollOffset) | 0, _IntOffset___get_y__impl__2avpwj(this_2) + _IntOffset___get_y__impl__2avpwj(scrollOffset) | 0);
              }
            }
            itemInfo.fa3_1 = item_0.ma2_1;
            itemInfo.ga3_1 = item_0.ja4();
            startAnimationsIfNeeded(this, item_0);
          }
        } else {
          this.ua3_1.t2(item_0.ka2_1);
        }
      }
       while (inductionVariable_2 <= last_0);
    var accumulatedOffset = 0;
    var previousLine = -1;
    var previousLineMainAxisSize = 0;
    // Inline function 'kotlin.collections.sortByDescending' call
    var this_3 = this.ya3_1;
    if (this_3.m() > 1) {
      // Inline function 'kotlin.comparisons.compareByDescending' call
      var tmp_4 = LazyGridItemPlacementAnimator$onMeasured$lambda(previousKeyToIndexMap);
      var tmp$ret$8 = new sam$kotlin_Comparator$0(tmp_4);
      sortWith(this_3, tmp$ret$8);
    }
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_4 = this.ya3_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_4 = 0;
    var last_2 = this_4.m() - 1 | 0;
    if (inductionVariable_4 <= last_2)
      do {
        var index_2 = inductionVariable_4;
        inductionVariable_4 = inductionVariable_4 + 1 | 0;
        var item_1 = this_4.n(index_2);
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
        var line = isVertical ? item_1.ca3_1 : item_1.da3_1;
        if (!(line === -1) ? line === previousLine : false) {
          // Inline function 'kotlin.comparisons.maxOf' call
          var a = previousLineMainAxisSize;
          var b = item_1.va2_1;
          previousLineMainAxisSize = Math.max(a, b);
        } else {
          accumulatedOffset = accumulatedOffset + previousLineMainAxisSize | 0;
          previousLineMainAxisSize = item_1.va2_1;
          previousLine = line;
        }
        var mainAxisOffset = (0 - accumulatedOffset | 0) - item_1.va2_1 | 0;
        initializeAnimation$default(this, item_1, mainAxisOffset);
        startAnimationsIfNeeded(this, item_1);
      }
       while (inductionVariable_4 <= last_2);
    accumulatedOffset = 0;
    previousLine = -1;
    previousLineMainAxisSize = 0;
    // Inline function 'kotlin.collections.sortBy' call
    var this_5 = this.za3_1;
    if (this_5.m() > 1) {
      // Inline function 'kotlin.comparisons.compareBy' call
      var tmp_5 = LazyGridItemPlacementAnimator$onMeasured$lambda_0(previousKeyToIndexMap);
      var tmp$ret$10 = new sam$kotlin_Comparator$0(tmp_5);
      sortWith(this_5, tmp$ret$10);
    }
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_6 = this.za3_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_5 = 0;
    var last_3 = this_6.m() - 1 | 0;
    if (inductionVariable_5 <= last_3)
      do {
        var index_3 = inductionVariable_5;
        inductionVariable_5 = inductionVariable_5 + 1 | 0;
        var item_2 = this_6.n(index_3);
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
        var line_0 = isVertical ? item_2.ca3_1 : item_2.da3_1;
        if (!(line_0 === -1) ? line_0 === previousLine : false) {
          // Inline function 'kotlin.comparisons.maxOf' call
          var a_0 = previousLineMainAxisSize;
          var b_0 = item_2.va2_1;
          previousLineMainAxisSize = Math.max(a_0, b_0);
        } else {
          accumulatedOffset = accumulatedOffset + previousLineMainAxisSize | 0;
          previousLineMainAxisSize = item_2.va2_1;
          previousLine = line_0;
        }
        var mainAxisOffset_0 = mainAxisLayoutSize + accumulatedOffset | 0;
        initializeAnimation$default(this, item_2, mainAxisOffset_0);
        startAnimationsIfNeeded(this, item_2);
      }
       while (inductionVariable_5 <= last_3);
    // Inline function 'androidx.collection.ScatterSet.forEach' call
    var this_7 = this.xa3_1;
    // Inline function 'kotlin.contracts.contract' call
    var k_0 = this_7.fn_1;
    $l$block_2: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m_0 = this_7.en_1;
      var lastIndex_0 = m_0.length - 2 | 0;
      var inductionVariable_6 = 0;
      if (inductionVariable_6 <= lastIndex_0)
        do {
          var i_0 = inductionVariable_6;
          inductionVariable_6 = inductionVariable_6 + 1 | 0;
          var slot_0 = m_0[i_0];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_8 = slot_0;
          if (!this_8.nb(this_8.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount_0 = 8 - (~(i_0 - lastIndex_0 | 0) >>> 31 | 0) | 0;
            var inductionVariable_7 = 0;
            if (inductionVariable_7 < bitCount_0)
              do {
                var j_0 = inductionVariable_7;
                inductionVariable_7 = inductionVariable_7 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot_0.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index_4 = (i_0 << 3) + j_0 | 0;
                  // Inline function 'androidx.collection.ScatterSet.forEach.<anonymous>' call
                  // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
                  var tmp_6 = k_0[index_4];
                  var key = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
                  var itemInfo_0 = ensureNotNull(this.ua3_1.z2(key));
                  var newIndex = this.va3_1.ha4(key);
                  if (newIndex === -1) {
                    this.ua3_1.t2(key);
                  } else {
                    var tmp_7;
                    if (isVertical) {
                      tmp_7 = Companion_getInstance_0().v35(itemInfo_0.fa3_1);
                    } else {
                      tmp_7 = Companion_getInstance_0().w35(itemInfo_0.fa3_1);
                    }
                    var item_3 = itemProvider.j9z(newIndex, VOID, tmp_7);
                    item_3.ea3_1 = true;
                    var tmp$ret$15;
                    $l$block_1: {
                      // Inline function 'kotlin.collections.any' call
                      var indexedObject_0 = itemInfo_0.ha3_1;
                      var inductionVariable_8 = 0;
                      var last_4 = indexedObject_0.length;
                      while (inductionVariable_8 < last_4) {
                        var element_0 = indexedObject_0[inductionVariable_8];
                        inductionVariable_8 = inductionVariable_8 + 1 | 0;
                        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>.<anonymous>' call
                        if ((element_0 == null ? null : element_0.la4()) === true) {
                          tmp$ret$15 = true;
                          break $l$block_1;
                        }
                      }
                      tmp$ret$15 = false;
                    }
                    var inProgress = tmp$ret$15;
                    if (!inProgress ? newIndex === previousKeyToIndexMap.ha4(key) : false) {
                      this.ua3_1.t2(key);
                    } else {
                      if (newIndex < this.wa3_1) {
                        this.aa4_1.a1(item_3);
                      } else {
                        this.ba4_1.a1(item_3);
                      }
                    }
                  }
                }
                slot_0 = slot_0.lb(8);
              }
               while (inductionVariable_7 < bitCount_0);
            if (!(bitCount_0 === 8)) {
              break $l$block_2;
            }
          }
        }
         while (!(i_0 === lastIndex_0));
    }
    accumulatedOffset = 0;
    previousLine = -1;
    previousLineMainAxisSize = 0;
    // Inline function 'kotlin.collections.sortByDescending' call
    var this_9 = this.aa4_1;
    if (this_9.m() > 1) {
      // Inline function 'kotlin.comparisons.compareByDescending' call
      var tmp_8 = LazyGridItemPlacementAnimator$onMeasured$lambda_1(this);
      var tmp$ret$17 = new sam$kotlin_Comparator$0(tmp_8);
      sortWith(this_9, tmp$ret$17);
    }
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_10 = this.aa4_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_9 = 0;
    var last_5 = this_10.m() - 1 | 0;
    if (inductionVariable_9 <= last_5)
      do {
        var index_5 = inductionVariable_9;
        inductionVariable_9 = inductionVariable_9 + 1 | 0;
        var item_4 = this_10.n(index_5);
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
        var line_1 = spanLayoutProvider.xa0(item_4.ja2_1);
        if (!(line_1 === -1) ? line_1 === previousLine : false) {
          // Inline function 'kotlin.comparisons.maxOf' call
          var a_1 = previousLineMainAxisSize;
          var b_1 = item_4.va2_1;
          previousLineMainAxisSize = Math.max(a_1, b_1);
        } else {
          accumulatedOffset = accumulatedOffset + previousLineMainAxisSize | 0;
          previousLineMainAxisSize = item_4.va2_1;
          previousLine = line_1;
        }
        var mainAxisOffset_1 = (0 - accumulatedOffset | 0) - item_4.va2_1 | 0;
        var itemInfo_1 = ensureNotNull(this.ua3_1.z2(item_4.ka2_1));
        item_4.ma4(mainAxisOffset_1, itemInfo_1.ga3_1, layoutWidth, layoutHeight);
        positionedItems.a1(item_4);
        startAnimationsIfNeeded(this, item_4);
      }
       while (inductionVariable_9 <= last_5);
    accumulatedOffset = 0;
    previousLine = -1;
    previousLineMainAxisSize = 0;
    // Inline function 'kotlin.collections.sortBy' call
    var this_11 = this.ba4_1;
    if (this_11.m() > 1) {
      // Inline function 'kotlin.comparisons.compareBy' call
      var tmp_9 = LazyGridItemPlacementAnimator$onMeasured$lambda_2(this);
      var tmp$ret$19 = new sam$kotlin_Comparator$0(tmp_9);
      sortWith(this_11, tmp$ret$19);
    }
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_12 = this.ba4_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_10 = 0;
    var last_6 = this_12.m() - 1 | 0;
    if (inductionVariable_10 <= last_6)
      do {
        var index_6 = inductionVariable_10;
        inductionVariable_10 = inductionVariable_10 + 1 | 0;
        var item_5 = this_12.n(index_6);
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemPlacementAnimator.onMeasured.<anonymous>' call
        var line_2 = spanLayoutProvider.xa0(item_5.ja2_1);
        if (!(line_2 === -1) ? line_2 === previousLine : false) {
          // Inline function 'kotlin.comparisons.maxOf' call
          var a_2 = previousLineMainAxisSize;
          var b_2 = item_5.va2_1;
          previousLineMainAxisSize = Math.max(a_2, b_2);
        } else {
          accumulatedOffset = accumulatedOffset + previousLineMainAxisSize | 0;
          previousLineMainAxisSize = item_5.va2_1;
          previousLine = line_2;
        }
        var mainAxisOffset_2 = mainAxisLayoutSize + accumulatedOffset | 0;
        var itemInfo_2 = ensureNotNull(this.ua3_1.z2(item_5.ka2_1));
        item_5.ma4(mainAxisOffset_2, itemInfo_2.ga3_1, layoutWidth, layoutHeight);
        positionedItems.a1(item_5);
        startAnimationsIfNeeded(this, item_5);
      }
       while (inductionVariable_10 <= last_6);
    this.ya3_1.h1();
    this.za3_1.h1();
    this.aa4_1.h1();
    this.ba4_1.h1();
    this.xa3_1.h1();
  };
  protoOf(LazyGridItemPlacementAnimator).v2b = function () {
    this.ua3_1.h1();
    this.va3_1 = Empty_instance;
    this.wa3_1 = -1;
  };
  protoOf(LazyGridItemPlacementAnimator).na4 = function (key, placeableIndex) {
    var tmp;
    if (this.ua3_1.u()) {
      tmp = null;
    } else {
      var tmp0_safe_receiver = this.ua3_1.z2(key);
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ha3_1;
      tmp = tmp1_safe_receiver == null ? null : tmp1_safe_receiver[placeableIndex];
    }
    return tmp;
  };
  function ItemInfo(crossAxisSize, crossAxisOffset) {
    this.fa3_1 = crossAxisSize;
    this.ga3_1 = crossAxisOffset;
    this.ha3_1 = get_EmptyArray();
  }
  protoOf(ItemInfo).ka4 = function (positionedItem, coroutineScope) {
    var inductionVariable = positionedItem.ea4();
    var last = this.ha3_1.length;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp1_safe_receiver = this.ha3_1[i];
        if (tmp1_safe_receiver == null)
          null;
        else {
          tmp1_safe_receiver.oa4();
        }
      }
       while (inductionVariable < last);
    if (!(this.ha3_1.length === positionedItem.ea4())) {
      this.ha3_1 = copyOf(this.ha3_1, positionedItem.ea4());
    }
    // Inline function 'kotlin.repeat' call
    var times = positionedItem.ea4();
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_0 = 0;
    if (inductionVariable_0 < times)
      do {
        var index = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'androidx.compose.foundation.lazy.grid.ItemInfo.updateAnimation.<anonymous>' call
        var specs = get_specs(positionedItem.fa4(index));
        if (specs == null) {
          var tmp0_safe_receiver = this.ha3_1[index];
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.oa4();
          }
          this.ha3_1[index] = null;
        } else {
          var tmp1_elvis_lhs = this.ha3_1[index];
          var tmp;
          if (tmp1_elvis_lhs == null) {
            // Inline function 'kotlin.also' call
            var this_0 = new LazyLayoutAnimation(coroutineScope);
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'androidx.compose.foundation.lazy.grid.ItemInfo.updateAnimation.<anonymous>.<anonymous>' call
            this.ha3_1[index] = this_0;
            tmp = this_0;
          } else {
            tmp = tmp1_elvis_lhs;
          }
          var item = tmp;
          item.ja3_1 = specs.ca5_1;
          item.ka3_1 = specs.da5_1;
        }
      }
       while (inductionVariable_0 < times);
  };
  function get_specs(_this__u8e3s4) {
    _init_properties_LazyGridItemPlacementAnimator_kt__mafnv7();
    return _this__u8e3s4 instanceof LazyLayoutAnimationSpecsNode ? _this__u8e3s4 : null;
  }
  var properties_initialized_LazyGridItemPlacementAnimator_kt_ef5tzl;
  function _init_properties_LazyGridItemPlacementAnimator_kt__mafnv7() {
    if (!properties_initialized_LazyGridItemPlacementAnimator_kt_ef5tzl) {
      properties_initialized_LazyGridItemPlacementAnimator_kt_ef5tzl = true;
      // Inline function 'kotlin.emptyArray' call
      EmptyArray = [];
    }
  }
  function rememberLazyGridItemProviderLambda(state, content, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1898306282);
    sourceInformation($composer_0, 'C(rememberLazyGridItemProviderLambda)P(1)41@1652L29,42@1693L604:LazyGridItemProvider.kt#7791vq');
    if (isTraceInProgress()) {
      traceEventStart(-1898306282, $changed, -1, 'androidx.compose.foundation.lazy.grid.rememberLazyGridItemProviderLambda (LazyGridItemProvider.kt:40)');
    }
    var latestContent = rememberUpdatedState(content, $composer_0, 14 & $changed >> 3);
    $composer_0.j1l(-598239338);
    sourceInformation($composer_0, 'CC(remember):LazyGridItemProvider.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = (($changed & 14 ^ 6) > 4 ? $composer_0.v1o(state) : false) ? true : ($changed & 6) === 4;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridItemProviderLambda.<anonymous>' call
      var tmp_0 = referentialEqualityPolicy();
      var intervalContentState = derivedStateOf(tmp_0, rememberLazyGridItemProviderLambda$lambda(latestContent));
      var tmp_1 = referentialEqualityPolicy();
      var itemProviderState = derivedStateOf(tmp_1, rememberLazyGridItemProviderLambda$lambda_0(intervalContentState, state));
      var value = value$factory(itemProviderState);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_2 = tmp;
    var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function LazyGridItemProviderImpl$Item$lambda(this$0, $index) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C*77@3037L39:LazyGridItemProvider.kt#7791vq');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
        if (isTraceInProgress()) {
          traceEventStart(726189336, $changed, -1, 'androidx.compose.foundation.lazy.grid.LazyGridItemProviderImpl.Item.<anonymous> (LazyGridItemProvider.kt:76)');
        }
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutIntervalContent.withInterval' call
        var this_0 = this$0.fa5_1;
        var globalIndex = $index;
        var interval = this_0.ua1().n(globalIndex);
        var localIntervalIndex = globalIndex - interval.ha5_1 | 0;
        interval.ja5_1.fa2_1(LazyGridItemScopeImpl_instance, localIntervalIndex, $composer_0, 6);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else {
        $composer_0.q1r();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ComposableLambda$invoke$ref($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function LazyGridItemProviderImpl$Item$lambda_0($tmp0_rcvr, $index, $key, $$changed) {
    return function ($composer, $force) {
      $tmp0_rcvr.ka5($index, $key, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function LazyGridItemProviderImpl(state, intervalContent, keyIndexMap) {
    this.ea5_1 = state;
    this.fa5_1 = intervalContent;
    this.ga5_1 = keyIndexMap;
  }
  protoOf(LazyGridItemProviderImpl).k9z = function () {
    return this.ga5_1;
  };
  protoOf(LazyGridItemProviderImpl).ta0 = function () {
    return this.fa5_1.ta0();
  };
  protoOf(LazyGridItemProviderImpl).aa2 = function (index) {
    var tmp0_elvis_lhs = this.ga5_1.aa2(index);
    return tmp0_elvis_lhs == null ? this.fa5_1.aa2(index) : tmp0_elvis_lhs;
  };
  protoOf(LazyGridItemProviderImpl).ba2 = function (index) {
    return this.fa5_1.ba2(index);
  };
  protoOf(LazyGridItemProviderImpl).ka5 = function (index, key, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(1493551140);
    sourceInformation($composer_0, 'C(Item)75@2884L216:LazyGridItemProvider.kt#7791vq');
    var $dirty = $changed;
    if (isTraceInProgress()) {
      traceEventStart(1493551140, $dirty, -1, 'androidx.compose.foundation.lazy.grid.LazyGridItemProviderImpl.Item (LazyGridItemProvider.kt:74)');
    }
    // Inline function 'kotlin.run' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemProviderImpl.Item.<anonymous>' call
    var tmp = $composer_0;
    var dispatchReceiver = composableLambda(tmp, 726189336, true, LazyGridItemProviderImpl$Item$lambda(this, index));
    // Inline function 'androidx.compose.runtime.remember' call
    var $composer_1 = $composer_0;
    $composer_1.j1l(1157296644);
    sourceInformation($composer_1, 'CC(remember)P(1):Composables.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = $composer_1.v1o(dispatchReceiver);
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_1.x1y();
    var tmp_0;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridItemProviderImpl.Item.<anonymous>.<anonymous>' call
      var value = ComposableLambda$invoke$ref(dispatchReceiver);
      $composer_1.d1z(value);
      tmp_0 = value;
    } else {
      tmp_0 = it;
    }
    var tmp_1 = tmp_0;
    var tmp0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    $composer_1.l1l();
    LazyLayoutPinnableItem(key, index, this.ea5_1.o9y_1, tmp0, $composer_0, 3592 | 112 & $dirty << 3);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    var tmp1_safe_receiver = $composer_0.m20();
    if (tmp1_safe_receiver == null)
      null;
    else {
      tmp1_safe_receiver.j24(LazyGridItemProviderImpl$Item$lambda_0(this, index, key, $changed));
    }
  };
  protoOf(LazyGridItemProviderImpl).qa0 = function () {
    return this.fa5_1.ra1_1;
  };
  protoOf(LazyGridItemProviderImpl).ha4 = function (key) {
    return this.ga5_1.ha4(key);
  };
  protoOf(LazyGridItemProviderImpl).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LazyGridItemProviderImpl))
      return false;
    return equals(this.fa5_1, other.fa5_1);
  };
  protoOf(LazyGridItemProviderImpl).hashCode = function () {
    return hashCode(this.fa5_1);
  };
  function rememberLazyGridItemProviderLambda$lambda($latestContent) {
    return function () {
      return new LazyGridIntervalContent($latestContent.s2());
    };
  }
  function rememberLazyGridItemProviderLambda$lambda_0($intervalContentState, $state) {
    return function () {
      var intervalContent = $intervalContentState.s2();
      var map = new NearestRangeKeyIndexMap($state.la5(), intervalContent);
      return new LazyGridItemProviderImpl($state, intervalContent, map);
    };
  }
  function value$factory($b0) {
    return getPropertyCallableRef('value', 0, KProperty0, function () {
      return $b0.s2();
    }, null);
  }
  function LazyGridItemScopeImpl() {
  }
  var LazyGridItemScopeImpl_instance;
  function LazyGridItemScopeImpl_getInstance() {
    return LazyGridItemScopeImpl_instance;
  }
  function measureLazyGrid(itemsCount, measuredLineProvider, measuredItemProvider, mainAxisAvailableSize, beforeContentPadding, afterContentPadding, spaceBetweenLines, firstVisibleLineIndex, firstVisibleLineScrollOffset, scrollToBeConsumed, constraints, isVertical, verticalArrangement, horizontalArrangement, reverseLayout, density, placementAnimator, spanLayoutProvider, pinnedItems, coroutineScope, placementScopeInvalidator, layout) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(beforeContentPadding >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
      var message = 'negative beforeContentPadding';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(afterContentPadding >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
      var message_0 = 'negative afterContentPadding';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    if (itemsCount <= 0) {
      var tmp = _Constraints___get_minWidth__impl__hi9lfi(constraints);
      var tmp_0 = _Constraints___get_minHeight__impl__ev4bgx(constraints);
      var tmp0_measureResult = layout(tmp, tmp_0, measureLazyGrid$lambda);
      var tmp1_visibleItemsInfo = emptyList();
      var tmp2_viewportStartOffset = -beforeContentPadding | 0;
      var tmp3_viewportEndOffset = mainAxisAvailableSize + afterContentPadding | 0;
      var tmp4_orientation = isVertical ? Orientation_Vertical_getInstance() : Orientation_Horizontal_getInstance();
      return new LazyGridMeasureResult(null, 0, false, 0.0, tmp0_measureResult, false, tmp1_visibleItemsInfo, tmp2_viewportStartOffset, tmp3_viewportEndOffset, 0, reverseLayout, tmp4_orientation, afterContentPadding, spaceBetweenLines);
    } else {
      var currentFirstLineIndex = firstVisibleLineIndex;
      var currentFirstLineScrollOffset = firstVisibleLineScrollOffset;
      // Inline function 'kotlin.math.roundToInt' call
      var scrollDelta = roundToInt(scrollToBeConsumed);
      currentFirstLineScrollOffset = currentFirstLineScrollOffset - scrollDelta | 0;
      if (currentFirstLineIndex === 0 ? currentFirstLineScrollOffset < 0 : false) {
        scrollDelta = scrollDelta + currentFirstLineScrollOffset | 0;
        currentFirstLineScrollOffset = 0;
      }
      var visibleLines = ArrayDeque_init_$Create$();
      var minOffset = (-beforeContentPadding | 0) + (spaceBetweenLines < 0 ? spaceBetweenLines : 0) | 0;
      var maxOffset = mainAxisAvailableSize;
      currentFirstLineScrollOffset = currentFirstLineScrollOffset + minOffset | 0;
      while (currentFirstLineScrollOffset < 0 ? currentFirstLineIndex > 0 : false) {
        var previous = currentFirstLineIndex - 1 | 0;
        var measuredLine = measuredLineProvider.ca0(previous);
        visibleLines.a2(0, measuredLine);
        currentFirstLineScrollOffset = currentFirstLineScrollOffset + measuredLine.ta5_1 | 0;
        currentFirstLineIndex = previous;
      }
      if (currentFirstLineScrollOffset < minOffset) {
        scrollDelta = scrollDelta + currentFirstLineScrollOffset | 0;
        currentFirstLineScrollOffset = minOffset;
      }
      currentFirstLineScrollOffset = currentFirstLineScrollOffset - minOffset | 0;
      var index = currentFirstLineIndex;
      var maxMainAxis = coerceAtLeast(maxOffset + afterContentPadding | 0, 0);
      var currentMainAxisOffset = -currentFirstLineScrollOffset | 0;
      var remeasureNeeded = false;
      var indexInVisibleLines = 0;
      while (indexInVisibleLines < visibleLines.nd_1) {
        if (currentMainAxisOffset >= maxMainAxis) {
          visibleLines.m1(indexInVisibleLines);
          remeasureNeeded = true;
        } else {
          index = index + 1 | 0;
          currentMainAxisOffset = currentMainAxisOffset + visibleLines.n(indexInVisibleLines).ta5_1 | 0;
          indexInVisibleLines = indexInVisibleLines + 1 | 0;
        }
      }
      $l$loop: while (index < itemsCount ? (currentMainAxisOffset < maxMainAxis ? true : currentMainAxisOffset <= 0) ? true : visibleLines.u() : false) {
        var measuredLine_0 = measuredLineProvider.ca0(index);
        if (measuredLine_0.u()) {
          break $l$loop;
        }
        currentMainAxisOffset = currentMainAxisOffset + measuredLine_0.ta5_1 | 0;
        if (currentMainAxisOffset <= minOffset ? !(last_0(measuredLine_0.na5_1).ja2_1 === (itemsCount - 1 | 0)) : false) {
          currentFirstLineIndex = index + 1 | 0;
          currentFirstLineScrollOffset = currentFirstLineScrollOffset - measuredLine_0.ta5_1 | 0;
          remeasureNeeded = true;
        } else {
          visibleLines.a1(measuredLine_0);
        }
        index = index + 1 | 0;
      }
      if (currentMainAxisOffset < maxOffset) {
        var toScrollBack = maxOffset - currentMainAxisOffset | 0;
        currentFirstLineScrollOffset = currentFirstLineScrollOffset - toScrollBack | 0;
        currentMainAxisOffset = currentMainAxisOffset + toScrollBack | 0;
        while (currentFirstLineScrollOffset < beforeContentPadding ? currentFirstLineIndex > 0 : false) {
          var previousIndex = currentFirstLineIndex - 1 | 0;
          var measuredLine_1 = measuredLineProvider.ca0(previousIndex);
          visibleLines.a2(0, measuredLine_1);
          currentFirstLineScrollOffset = currentFirstLineScrollOffset + measuredLine_1.ta5_1 | 0;
          currentFirstLineIndex = previousIndex;
        }
        scrollDelta = scrollDelta + toScrollBack | 0;
        if (currentFirstLineScrollOffset < 0) {
          scrollDelta = scrollDelta + currentFirstLineScrollOffset | 0;
          currentMainAxisOffset = currentMainAxisOffset + currentFirstLineScrollOffset | 0;
          currentFirstLineScrollOffset = 0;
        }
      }
      var tmp_1;
      var tmp_2;
      // Inline function 'kotlin.math.roundToInt' call
      var tmp$ret$3 = roundToInt(scrollToBeConsumed);
      if (get_sign(tmp$ret$3) === get_sign(scrollDelta)) {
        // Inline function 'kotlin.math.roundToInt' call
        var tmp$ret$4 = roundToInt(scrollToBeConsumed);
        tmp_2 = abs(tmp$ret$4) >= abs(scrollDelta);
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        tmp_1 = scrollDelta;
      } else {
        tmp_1 = scrollToBeConsumed;
      }
      var consumedScroll = tmp_1;
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(currentFirstLineScrollOffset >= 0)) {
        // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
        var message_1 = 'negative initial offset';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
      var visibleLinesScrollOffset = -currentFirstLineScrollOffset | 0;
      var firstLine = visibleLines.qd();
      var tmp8_safe_receiver = firstOrNull_0(firstLine.na5_1);
      var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : tmp8_safe_receiver.ja2_1;
      var firstItemIndex = tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs;
      var tmp10_safe_receiver = visibleLines.rd();
      var tmp11_safe_receiver = tmp10_safe_receiver == null ? null : tmp10_safe_receiver.na5_1;
      var tmp12_safe_receiver = tmp11_safe_receiver == null ? null : lastOrNull(tmp11_safe_receiver);
      var tmp13_elvis_lhs = tmp12_safe_receiver == null ? null : tmp12_safe_receiver.ja2_1;
      var lastItemIndex = tmp13_elvis_lhs == null ? 0 : tmp13_elvis_lhs;
      // Inline function 'androidx.compose.foundation.lazy.grid.calculateExtraItems' call
      var items = null;
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = pinnedItems.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = pinnedItems.n(index_0);
          // Inline function 'androidx.compose.foundation.lazy.grid.calculateExtraItems.<anonymous>' call
          // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
          if (0 <= item ? item < firstItemIndex : false) {
            // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
            var constraints_0 = measuredLineProvider.ba0(item);
            var measuredItem = measuredItemProvider.j9z(item, VOID, constraints_0);
            if (items == null) {
              // Inline function 'kotlin.collections.mutableListOf' call
              items = ArrayList_init_$Create$();
            }
            var tmp0_safe_receiver = items;
            if (tmp0_safe_receiver == null)
              null;
            else
              tmp0_safe_receiver.a1(measuredItem);
          }
        }
         while (inductionVariable <= last);
      var tmp0_elvis_lhs = items;
      var extraItemsBefore = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      // Inline function 'androidx.compose.foundation.lazy.grid.calculateExtraItems' call
      var items_0 = null;
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_0 = 0;
      var last_1 = pinnedItems.m() - 1 | 0;
      if (inductionVariable_0 <= last_1)
        do {
          var index_1 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var item_0 = pinnedItems.n(index_1);
          // Inline function 'androidx.compose.foundation.lazy.grid.calculateExtraItems.<anonymous>' call
          // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
          if ((lastItemIndex + 1 | 0) <= item_0 ? item_0 < itemsCount : false) {
            // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
            var constraints_1 = measuredLineProvider.ba0(item_0);
            var measuredItem_0 = measuredItemProvider.j9z(item_0, VOID, constraints_1);
            if (items_0 == null) {
              // Inline function 'kotlin.collections.mutableListOf' call
              items_0 = ArrayList_init_$Create$();
            }
            var tmp0_safe_receiver_0 = items_0;
            if (tmp0_safe_receiver_0 == null)
              null;
            else
              tmp0_safe_receiver_0.a1(measuredItem_0);
          }
        }
         while (inductionVariable_0 <= last_1);
      var tmp0_elvis_lhs_0 = items_0;
      var extraItemsAfter = tmp0_elvis_lhs_0 == null ? emptyList() : tmp0_elvis_lhs_0;
      if (beforeContentPadding > 0 ? true : spaceBetweenLines < 0) {
        var inductionVariable_1 = 0;
        var last_2 = visibleLines.m() - 1 | 0;
        if (inductionVariable_1 <= last_2)
          $l$loop_0: do {
            var i = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var size = visibleLines.n(i).ta5_1;
            if ((!(currentFirstLineScrollOffset === 0) ? size <= currentFirstLineScrollOffset : false) ? !(i === get_lastIndex(visibleLines)) : false) {
              currentFirstLineScrollOffset = currentFirstLineScrollOffset - size | 0;
              firstLine = visibleLines.n(i + 1 | 0);
            } else {
              break $l$loop_0;
            }
          }
           while (inductionVariable_1 <= last_2);
      }
      var tmp_3;
      if (isVertical) {
        tmp_3 = _Constraints___get_maxWidth__impl__uuyqc(constraints);
      } else {
        tmp_3 = constrainWidth(constraints, currentMainAxisOffset);
      }
      var layoutWidth = tmp_3;
      var tmp_4;
      if (isVertical) {
        tmp_4 = constrainHeight(constraints, currentMainAxisOffset);
      } else {
        tmp_4 = _Constraints___get_maxHeight__impl__dt3e8z(constraints);
      }
      var layoutHeight = tmp_4;
      var positionedItems = calculateItemsOffsets(visibleLines, extraItemsBefore, extraItemsAfter, layoutWidth, layoutHeight, currentMainAxisOffset, maxOffset, visibleLinesScrollOffset, isVertical, verticalArrangement, horizontalArrangement, reverseLayout, density);
      placementAnimator.ia4(numberToInt(consumedScroll), layoutWidth, layoutHeight, positionedItems, measuredItemProvider, spanLayoutProvider, isVertical, coroutineScope);
      var tmp15_firstVisibleLine = firstLine;
      var tmp16_firstVisibleLineScrollOffset = currentFirstLineScrollOffset;
      var tmp17_canScrollForward = !(lastItemIndex === (itemsCount - 1 | 0)) ? true : currentMainAxisOffset > maxOffset;
      var tmp18_measureResult = layout(layoutWidth, layoutHeight, measureLazyGrid$lambda_0(positionedItems, placementScopeInvalidator));
      var tmp19_viewportStartOffset = -beforeContentPadding | 0;
      var tmp20_viewportEndOffset = mainAxisAvailableSize + afterContentPadding | 0;
      var tmp_5;
      if (extraItemsBefore.u() ? extraItemsAfter.u() : false) {
        tmp_5 = positionedItems;
      } else {
        // Inline function 'androidx.compose.ui.util.fastFilter' call
        // Inline function 'kotlin.contracts.contract' call
        var target = ArrayList_init_$Create$_0(positionedItems.m());
        // Inline function 'androidx.compose.ui.util.fastForEach' call
        // Inline function 'kotlin.contracts.contract' call
        var inductionVariable_2 = 0;
        var last_3 = positionedItems.m() - 1 | 0;
        if (inductionVariable_2 <= last_3)
          do {
            var index_2 = inductionVariable_2;
            inductionVariable_2 = inductionVariable_2 + 1 | 0;
            var item_1 = positionedItems.n(index_2);
            // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
            // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>' call
            var containsArg = item_1.ja2_1;
            if (firstItemIndex <= containsArg ? containsArg <= lastItemIndex : false) {
              // Inline function 'kotlin.collections.plusAssign' call
              target.a1(item_1);
            }
          }
           while (inductionVariable_2 <= last_3);
        tmp_5 = target;
      }
      var tmp21_visibleItemsInfo = tmp_5;
      var tmp22_orientation = isVertical ? Orientation_Vertical_getInstance() : Orientation_Horizontal_getInstance();
      var tmp23_remeasureNeeded = remeasureNeeded;
      return new LazyGridMeasureResult(tmp15_firstVisibleLine, tmp16_firstVisibleLineScrollOffset, tmp17_canScrollForward, consumedScroll, tmp18_measureResult, tmp23_remeasureNeeded, tmp21_visibleItemsInfo, tmp19_viewportStartOffset, tmp20_viewportEndOffset, itemsCount, reverseLayout, tmp22_orientation, afterContentPadding, spaceBetweenLines);
    }
  }
  function calculateItemsOffsets(lines, itemsBefore, itemsAfter, layoutWidth, layoutHeight, finalMainAxisOffset, maxOffset, firstLineScrollOffset, isVertical, verticalArrangement, horizontalArrangement, reverseLayout, density) {
    var mainAxisLayoutSize = isVertical ? layoutHeight : layoutWidth;
    // Inline function 'kotlin.math.min' call
    var hasSpareSpace = finalMainAxisOffset < Math.min(mainAxisLayoutSize, maxOffset);
    if (hasSpareSpace) {
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(firstLineScrollOffset === 0)) {
        // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
        var message = 'non-zero firstLineScrollOffset';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    // Inline function 'androidx.compose.ui.util.fastSumBy' call
    // Inline function 'kotlin.contracts.contract' call
    var sum = 0;
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = lines.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = lines.n(index);
        // Inline function 'androidx.compose.ui.util.fastSumBy.<anonymous>' call
        var tmp = sum;
        // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
        sum = tmp + item.na5_1.length | 0;
      }
       while (inductionVariable <= last);
    var tmp$ret$3 = sum;
    var positionedItems = ArrayList_init_$Create$_0(tmp$ret$3);
    if (hasSpareSpace) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(itemsBefore.u() ? itemsAfter.u() : false)) {
        // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
        var message_0 = 'no items';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
      var linesCount = lines.m();
      var tmp_0 = 0;
      var tmp_1 = new Int32Array(linesCount);
      while (tmp_0 < linesCount) {
        var tmp_2 = tmp_0;
        tmp_1[tmp_2] = lines.n(calculateItemsOffsets$reverseAware(tmp_2, reverseLayout, linesCount)).sa5_1;
        tmp_0 = tmp_0 + 1 | 0;
      }
      var sizes = tmp_1;
      var tmp_3 = 0;
      var tmp_4 = new Int32Array(linesCount);
      while (tmp_3 < linesCount) {
        tmp_4[tmp_3] = 0;
        tmp_3 = tmp_3 + 1 | 0;
      }
      var offsets = tmp_4;
      if (isVertical) {
        // Inline function 'kotlin.with' call
        var tmp$ret$8;
        $l$block: {
          // Inline function 'kotlin.requireNotNull' call
          // Inline function 'kotlin.contracts.contract' call
          if (verticalArrangement == null) {
            // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
            var message_1 = 'null verticalArrangement';
            throw IllegalArgumentException_init_$Create$(toString(message_1));
          } else {
            tmp$ret$8 = verticalArrangement;
            break $l$block;
          }
        }
        // Inline function 'kotlin.contracts.contract' call
        tmp$ret$8.v7s(density, mainAxisLayoutSize, sizes, offsets);
      } else {
        // Inline function 'kotlin.with' call
        var tmp$ret$11;
        $l$block_0: {
          // Inline function 'kotlin.requireNotNull' call
          // Inline function 'kotlin.contracts.contract' call
          if (horizontalArrangement == null) {
            // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
            var message_2 = 'null horizontalArrangement';
            throw IllegalArgumentException_init_$Create$(toString(message_2));
          } else {
            tmp$ret$11 = horizontalArrangement;
            break $l$block_0;
          }
        }
        // Inline function 'kotlin.contracts.contract' call
        tmp$ret$11.u7s(density, mainAxisLayoutSize, sizes, LayoutDirection_Ltr_getInstance(), offsets);
      }
      var reverseAwareOffsetIndices = reverseLayout ? reversed(get_indices(offsets)) : get_indices(offsets);
      var inductionVariable_0 = reverseAwareOffsetIndices.aa_1;
      var last_0 = reverseAwareOffsetIndices.ba_1;
      var step = reverseAwareOffsetIndices.ca_1;
      if ((step > 0 ? inductionVariable_0 <= last_0 : false) ? true : step < 0 ? last_0 <= inductionVariable_0 : false)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + step | 0;
          var absoluteOffset = offsets[index_0];
          var line = lines.n(calculateItemsOffsets$reverseAware(index_0, reverseLayout, linesCount));
          var tmp_5;
          if (reverseLayout) {
            tmp_5 = (mainAxisLayoutSize - absoluteOffset | 0) - line.sa5_1 | 0;
          } else {
            tmp_5 = absoluteOffset;
          }
          var relativeOffset = tmp_5;
          addAll(positionedItems, line.ua5(relativeOffset, layoutWidth, layoutHeight));
        }
         while (!(index_0 === last_0));
    } else {
      var currentMainAxis = firstLineScrollOffset;
      // Inline function 'androidx.compose.ui.util.fastForEachReversed' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_1 = itemsBefore.m() - 1 | 0;
      if (0 <= inductionVariable_1)
        do {
          var index_1 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + -1 | 0;
          var item_0 = itemsBefore.n(index_1);
          // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
          currentMainAxis = currentMainAxis - item_0.wa2_1 | 0;
          item_0.ma4(currentMainAxis, 0, layoutWidth, layoutHeight);
          positionedItems.a1(item_0);
        }
         while (0 <= inductionVariable_1);
      currentMainAxis = firstLineScrollOffset;
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_2 = 0;
      var last_1 = lines.m() - 1 | 0;
      if (inductionVariable_2 <= last_1)
        do {
          var index_2 = inductionVariable_2;
          inductionVariable_2 = inductionVariable_2 + 1 | 0;
          var item_1 = lines.n(index_2);
          // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
          addAll(positionedItems, item_1.ua5(currentMainAxis, layoutWidth, layoutHeight));
          currentMainAxis = currentMainAxis + item_1.ta5_1 | 0;
        }
         while (inductionVariable_2 <= last_1);
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_3 = 0;
      var last_2 = itemsAfter.m() - 1 | 0;
      if (inductionVariable_3 <= last_2)
        do {
          var index_3 = inductionVariable_3;
          inductionVariable_3 = inductionVariable_3 + 1 | 0;
          var item_2 = itemsAfter.n(index_3);
          // Inline function 'androidx.compose.foundation.lazy.grid.calculateItemsOffsets.<anonymous>' call
          item_2.ma4(currentMainAxis, 0, layoutWidth, layoutHeight);
          positionedItems.a1(item_2);
          currentMainAxis = currentMainAxis + item_2.wa2_1 | 0;
        }
         while (inductionVariable_3 <= last_2);
    }
    return positionedItems;
  }
  function calculateItemsOffsets$reverseAware(_this__u8e3s4, $reverseLayout, linesCount) {
    return !$reverseLayout ? _this__u8e3s4 : (linesCount - _this__u8e3s4 | 0) - 1 | 0;
  }
  function measureLazyGrid$lambda($this$invoke) {
    return Unit_instance;
  }
  function measureLazyGrid$lambda_0($positionedItems, $placementScopeInvalidator) {
    return function ($this$invoke) {
      var this_0 = $positionedItems;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      var tmp;
      if (inductionVariable <= last) {
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.foundation.lazy.grid.measureLazyGrid.<anonymous>.<anonymous>' call
          item.va5($this$invoke);
        }
         while (inductionVariable <= last);
        tmp = Unit_instance;
      }
      ObservableScopeInvalidator__attachToScope_impl_wvvw97($placementScopeInvalidator);
      return Unit_instance;
    };
  }
  function LazyGridMeasureResult(firstVisibleLine, firstVisibleLineScrollOffset, canScrollForward, consumedScroll, measureResult, remeasureNeeded, visibleItemsInfo, viewportStartOffset, viewportEndOffset, totalItemsCount, reverseLayout, orientation, afterContentPadding, mainAxisItemSpacing) {
    this.wa5_1 = firstVisibleLine;
    this.xa5_1 = firstVisibleLineScrollOffset;
    this.ya5_1 = canScrollForward;
    this.za5_1 = consumedScroll;
    this.aa6_1 = remeasureNeeded;
    this.ba6_1 = visibleItemsInfo;
    this.ca6_1 = viewportStartOffset;
    this.da6_1 = viewportEndOffset;
    this.ea6_1 = totalItemsCount;
    this.fa6_1 = reverseLayout;
    this.ga6_1 = orientation;
    this.ha6_1 = afterContentPadding;
    this.ia6_1 = mainAxisItemSpacing;
    this.ja6_1 = measureResult;
  }
  protoOf(LazyGridMeasureResult).ga1 = function () {
    return this.ba6_1;
  };
  protoOf(LazyGridMeasureResult).ea1 = function () {
    return this.ea6_1;
  };
  protoOf(LazyGridMeasureResult).t5r = function () {
    return this.ja6_1.t5r();
  };
  protoOf(LazyGridMeasureResult).f34 = function () {
    return this.ja6_1.f34();
  };
  protoOf(LazyGridMeasureResult).e34 = function () {
    return this.ja6_1.e34();
  };
  protoOf(LazyGridMeasureResult).u5r = function () {
    this.ja6_1.u5r();
  };
  protoOf(LazyGridMeasureResult).n96 = function () {
    var tmp;
    var tmp0_safe_receiver = this.wa5_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ma5_1;
    if (!((tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) === 0)) {
      tmp = true;
    } else {
      tmp = !(this.xa5_1 === 0);
    }
    return tmp;
  };
  protoOf(LazyGridMeasureResult).ka6 = function (delta) {
    var tmp;
    if ((this.aa6_1 ? true : this.ba6_1.u()) ? true : this.wa5_1 == null) {
      tmp = true;
    } else {
      var containsUpper = this.wa5_1.ta5_1;
      var containsArg = this.xa5_1 - delta | 0;
      tmp = !(0 <= containsArg ? containsArg < containsUpper : false);
    }
    if (tmp) {
      return false;
    }
    var first_0 = first(this.ba6_1);
    var last_0 = last(this.ba6_1);
    if (first_0.ea3_1 ? true : last_0.ea3_1) {
      return false;
    }
    var tmp_0;
    if (delta < 0) {
      var deltaToFirstItemChange = (offsetOnMainAxis(first_0, this.ga6_1) + first_0.wa2_1 | 0) - this.ca6_1 | 0;
      var deltaToLastItemChange = (offsetOnMainAxis(last_0, this.ga6_1) + last_0.wa2_1 | 0) - this.da6_1 | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      tmp_0 = Math.min(deltaToFirstItemChange, deltaToLastItemChange) > (-delta | 0);
    } else {
      var deltaToFirstItemChange_0 = this.ca6_1 - offsetOnMainAxis(first_0, this.ga6_1) | 0;
      var deltaToLastItemChange_0 = this.da6_1 - offsetOnMainAxis(last_0, this.ga6_1) | 0;
      // Inline function 'kotlin.comparisons.minOf' call
      tmp_0 = Math.min(deltaToFirstItemChange_0, deltaToLastItemChange_0) > delta;
    }
    var canApply = tmp_0;
    var tmp_1;
    if (canApply) {
      this.xa5_1 = this.xa5_1 - delta | 0;
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_0 = this.ba6_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last_1 = this_0.m() - 1 | 0;
      if (inductionVariable <= last_1)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasureResult.tryToApplyScrollWithoutRemeasure.<anonymous>' call
          item.la6(delta);
        }
         while (inductionVariable <= last_1);
      this.za5_1 = delta;
      if (!this.ya5_1 ? delta > 0 : false) {
        this.ya5_1 = true;
      }
      tmp_1 = true;
    } else {
      tmp_1 = false;
    }
    return tmp_1;
  };
  function _get_mainAxis__jwdafl(_this__u8e3s4, $this) {
    return $this.la2_1 ? _IntOffset___get_y__impl__2avpwj(_this__u8e3s4) : _IntOffset___get_x__impl__qiqr5o(_this__u8e3s4);
  }
  function _get_mainAxisSize__iyci34(_this__u8e3s4, $this) {
    return $this.la2_1 ? _this__u8e3s4.o57_1 : _this__u8e3s4.n57_1;
  }
  function LazyGridMeasuredItem(index, key, isVertical, crossAxisSize, mainAxisSpacing, reverseLayout, layoutDirection, beforeContentPadding, afterContentPadding, placeables, visualOffset, contentType, animator) {
    this.ja2_1 = index;
    this.ka2_1 = key;
    this.la2_1 = isVertical;
    this.ma2_1 = crossAxisSize;
    this.na2_1 = reverseLayout;
    this.oa2_1 = layoutDirection;
    this.pa2_1 = beforeContentPadding;
    this.qa2_1 = afterContentPadding;
    this.ra2_1 = placeables;
    this.sa2_1 = visualOffset;
    this.ta2_1 = contentType;
    this.ua2_1 = animator;
    this.xa2_1 = -2147483648;
    this.ya2_1 = 0;
    this.za2_1 = 0;
    var maxMainAxis = 0;
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_0 = this.ra2_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = this_0.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index_0 = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = this_0.n(index_0);
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.<anonymous>' call
        // Inline function 'kotlin.comparisons.maxOf' call
        var a = maxMainAxis;
        var b = this.la2_1 ? item.o57_1 : item.n57_1;
        maxMainAxis = Math.max(a, b);
      }
       while (inductionVariable <= last);
    this.va2_1 = maxMainAxis;
    this.wa2_1 = coerceAtLeast(maxMainAxis + mainAxisSpacing | 0, 0);
    var tmp = this;
    var tmp_0;
    if (this.la2_1) {
      tmp_0 = IntSize_0(this.ma2_1, this.va2_1);
    } else {
      tmp_0 = IntSize_0(this.va2_1, this.ma2_1);
    }
    tmp.aa3_1 = tmp_0;
    this.ba3_1 = Companion_getInstance_12().v36_1;
    var tmp_1 = this;
    tmp_1.ca3_1 = -1;
    var tmp_2 = this;
    tmp_2.da3_1 = -1;
    this.ea3_1 = false;
  }
  protoOf(LazyGridMeasuredItem).ja1 = function () {
    return this.ja2_1;
  };
  protoOf(LazyGridMeasuredItem).ea4 = function () {
    return this.ra2_1.m();
  };
  protoOf(LazyGridMeasuredItem).fa4 = function (index) {
    return this.ra2_1.n(index).m5p();
  };
  protoOf(LazyGridMeasuredItem).p9u = function () {
    return this.ba3_1;
  };
  protoOf(LazyGridMeasuredItem).ja4 = function () {
    return this.la2_1 ? _IntOffset___get_x__impl__qiqr5o(this.ba3_1) : _IntOffset___get_y__impl__2avpwj(this.ba3_1);
  };
  protoOf(LazyGridMeasuredItem).ma6 = function () {
    return this.ca3_1;
  };
  protoOf(LazyGridMeasuredItem).na6 = function () {
    return this.da3_1;
  };
  protoOf(LazyGridMeasuredItem).oa6 = function (mainAxisOffset, crossAxisOffset, layoutWidth, layoutHeight, row, column) {
    this.xa2_1 = this.la2_1 ? layoutHeight : layoutWidth;
    var crossAxisLayoutSize = this.la2_1 ? layoutWidth : layoutHeight;
    var tmp;
    if (this.la2_1 ? this.oa2_1.equals(LayoutDirection_Rtl_getInstance()) : false) {
      tmp = (crossAxisLayoutSize - crossAxisOffset | 0) - this.ma2_1 | 0;
    } else {
      tmp = crossAxisOffset;
    }
    var crossAxisOffset_0 = tmp;
    var tmp_0 = this;
    var tmp_1;
    if (this.la2_1) {
      tmp_1 = IntOffset(crossAxisOffset_0, mainAxisOffset);
    } else {
      tmp_1 = IntOffset(mainAxisOffset, crossAxisOffset_0);
    }
    tmp_0.ba3_1 = tmp_1;
    this.ca3_1 = row;
    this.da3_1 = column;
    this.ya2_1 = -this.pa2_1 | 0;
    this.za2_1 = this.xa2_1 + this.qa2_1 | 0;
  };
  protoOf(LazyGridMeasuredItem).ma4 = function (mainAxisOffset, crossAxisOffset, layoutWidth, layoutHeight, row, column, $super) {
    var tmp;
    if (row === VOID) {
      tmp = -1;
    } else {
      tmp = row;
    }
    row = tmp;
    var tmp_0;
    if (column === VOID) {
      tmp_0 = -1;
    } else {
      tmp_0 = column;
    }
    column = tmp_0;
    var tmp_1;
    if ($super === VOID) {
      this.oa6(mainAxisOffset, crossAxisOffset, layoutWidth, layoutHeight, row, column);
      tmp_1 = Unit_instance;
    } else {
      tmp_1 = $super.oa6.call(this, mainAxisOffset, crossAxisOffset, layoutWidth, layoutHeight, row, column);
    }
    return tmp_1;
  };
  protoOf(LazyGridMeasuredItem).la6 = function (delta) {
    if (this.ea3_1) {
      return Unit_instance;
    }
    var tmp = this;
    // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.copy' call
    var this_0 = this.ba3_1;
    var tmp_0;
    if (this.la2_1) {
      tmp_0 = _IntOffset___get_x__impl__qiqr5o(this_0);
    } else {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.applyScrollDelta.<anonymous>' call
      tmp_0 = _IntOffset___get_x__impl__qiqr5o(this_0) + delta | 0;
    }
    var tmp_1 = tmp_0;
    var tmp_2;
    if (this.la2_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.applyScrollDelta.<anonymous>' call
      tmp_2 = _IntOffset___get_y__impl__2avpwj(this_0) + delta | 0;
    } else {
      tmp_2 = _IntOffset___get_y__impl__2avpwj(this_0);
    }
    tmp.ba3_1 = IntOffset(tmp_1, tmp_2);
    // Inline function 'kotlin.repeat' call
    var times = this.ea4();
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.applyScrollDelta.<anonymous>' call
        var animation = this.ua2_1.na4(this.ka2_1, index);
        if (!(animation == null)) {
          var tmp_3 = animation;
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.copy' call
          var this_1 = animation.na3_1;
          var tmp_4;
          if (this.la2_1) {
            tmp_4 = _IntOffset___get_x__impl__qiqr5o(this_1);
          } else {
            // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.applyScrollDelta.<anonymous>.<anonymous>' call
            tmp_4 = _IntOffset___get_x__impl__qiqr5o(this_1) + delta | 0;
          }
          var tmp_5 = tmp_4;
          var tmp_6;
          if (this.la2_1) {
            // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.applyScrollDelta.<anonymous>.<anonymous>' call
            tmp_6 = _IntOffset___get_y__impl__2avpwj(this_1) + delta | 0;
          } else {
            tmp_6 = _IntOffset___get_y__impl__2avpwj(this_1);
          }
          tmp_3.na3_1 = IntOffset(tmp_5, tmp_6);
        }
      }
       while (inductionVariable < times);
  };
  protoOf(LazyGridMeasuredItem).va5 = function (scope) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(this.xa2_1 === -2147483648)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.place.<anonymous>.<anonymous>' call
      var message = 'position() should be called first';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var times = this.ea4();
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var tmp;
    if (inductionVariable < times) {
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.place.<anonymous>.<anonymous>' call
        var placeable = this.ra2_1.n(index);
        var minOffset = this.ya2_1 - _get_mainAxisSize__iyci34(placeable, this) | 0;
        var maxOffset = this.za2_1;
        var offset = this.ba3_1;
        var animation = this.ua2_1.na4(this.ka2_1, index);
        if (!(animation == null)) {
          // Inline function 'androidx.compose.ui.unit.IntOffset.plus' call
          var this_0 = offset;
          var other = animation.pa6();
          var animatedOffset = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_0) + _IntOffset___get_x__impl__qiqr5o(other) | 0, _IntOffset___get_y__impl__2avpwj(this_0) + _IntOffset___get_y__impl__2avpwj(other) | 0);
          if ((_get_mainAxis__jwdafl(offset, this) <= minOffset ? _get_mainAxis__jwdafl(animatedOffset, this) <= minOffset : false) ? true : _get_mainAxis__jwdafl(offset, this) >= maxOffset ? _get_mainAxis__jwdafl(animatedOffset, this) >= maxOffset : false) {
            animation.qa6();
          }
          offset = animatedOffset;
        }
        if (this.na2_1) {
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.copy' call
          var this_1 = offset;
          var tmp_0;
          if (this.la2_1) {
            tmp_0 = _IntOffset___get_x__impl__qiqr5o(this_1);
          } else {
            // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.place.<anonymous>.<anonymous>.<anonymous>' call
            var mainAxisOffset = _IntOffset___get_x__impl__qiqr5o(this_1);
            tmp_0 = (this.xa2_1 - mainAxisOffset | 0) - _get_mainAxisSize__iyci34(placeable, this) | 0;
          }
          var tmp_1 = tmp_0;
          var tmp_2;
          if (this.la2_1) {
            // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItem.place.<anonymous>.<anonymous>.<anonymous>' call
            var mainAxisOffset_0 = _IntOffset___get_y__impl__2avpwj(this_1);
            tmp_2 = (this.xa2_1 - mainAxisOffset_0 | 0) - _get_mainAxisSize__iyci34(placeable, this) | 0;
          } else {
            tmp_2 = _IntOffset___get_y__impl__2avpwj(this_1);
          }
          offset = IntOffset(tmp_1, tmp_2);
        }
        // Inline function 'androidx.compose.ui.unit.IntOffset.plus' call
        var this_2 = offset;
        var other_0 = this.sa2_1;
        offset = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_2) + _IntOffset___get_x__impl__qiqr5o(other_0) | 0, _IntOffset___get_y__impl__2avpwj(this_2) + _IntOffset___get_y__impl__2avpwj(other_0) | 0);
        if (this.la2_1) {
          scope.k5s(placeable, offset);
        } else {
          scope.g5s(placeable, offset);
        }
      }
       while (inductionVariable < times);
      tmp = Unit_instance;
    }
    return tmp;
  };
  function LazyGridMeasuredItemProvider(itemProvider, measureScope, defaultMainAxisSpacing) {
    this.f9z_1 = itemProvider;
    this.g9z_1 = measureScope;
    this.h9z_1 = defaultMainAxisSpacing;
  }
  protoOf(LazyGridMeasuredItemProvider).i9z = function (index, mainAxisSpacing, constraints) {
    var key = this.f9z_1.aa2(index);
    var contentType = this.f9z_1.ba2(index);
    var placeables = this.g9z_1.ra6(index, constraints);
    var tmp;
    if (_Constraints___get_hasFixedWidth__impl__4p17wc(constraints)) {
      tmp = _Constraints___get_minWidth__impl__hi9lfi(constraints);
    } else {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!_Constraints___get_hasFixedHeight__impl__y56fxx(constraints)) {
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredItemProvider.getAndMeasure.<anonymous>' call
        var message = 'does not have fixed height';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = _Constraints___get_minHeight__impl__ev4bgx(constraints);
    }
    var crossAxisSize = tmp;
    return this.e9z(index, key, contentType, crossAxisSize, mainAxisSpacing, placeables);
  };
  protoOf(LazyGridMeasuredItemProvider).j9z = function (index, mainAxisSpacing, constraints, $super) {
    mainAxisSpacing = mainAxisSpacing === VOID ? this.h9z_1 : mainAxisSpacing;
    return $super === VOID ? this.i9z(index, mainAxisSpacing, constraints) : $super.i9z.call(this, index, mainAxisSpacing, new Constraints(constraints));
  };
  protoOf(LazyGridMeasuredItemProvider).k9z = function () {
    return this.f9z_1.k9z();
  };
  function LazyGridMeasuredLine(index, items, slots, spans, isVertical, mainAxisSpacing) {
    this.ma5_1 = index;
    this.na5_1 = items;
    this.oa5_1 = slots;
    this.pa5_1 = spans;
    this.qa5_1 = isVertical;
    this.ra5_1 = mainAxisSpacing;
    var maxMainAxis = 0;
    // Inline function 'kotlin.collections.forEach' call
    var indexedObject = this.na5_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var element = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredLine.<anonymous>' call
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = maxMainAxis;
      var b = element.va2_1;
      maxMainAxis = Math.max(a, b);
    }
    this.sa5_1 = maxMainAxis;
    this.ta5_1 = coerceAtLeast(maxMainAxis + this.ra5_1 | 0, 0);
  }
  protoOf(LazyGridMeasuredLine).u = function () {
    // Inline function 'kotlin.collections.isEmpty' call
    return this.na5_1.length === 0;
  };
  protoOf(LazyGridMeasuredLine).ua5 = function (offset, layoutWidth, layoutHeight) {
    var usedSpan = 0;
    // Inline function 'kotlin.collections.forEachIndexed' call
    var index = 0;
    var indexedObject = this.na5_1;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var item = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredLine.position.<anonymous>' call
      var tmp1 = index;
      index = tmp1 + 1 | 0;
      var span = _GridItemSpan___get_currentLineSpan__impl__sg7kqc(this.pa5_1.n(tmp1).pa0_1);
      var startSlot = usedSpan;
      // Inline function 'kotlin.also' call
      item.oa6(offset, this.oa5_1.t9x_1[startSlot], layoutWidth, layoutHeight, this.qa5_1 ? this.ma5_1 : startSlot, this.qa5_1 ? startSlot : this.ma5_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredLine.position.<anonymous>.<anonymous>' call
      usedSpan = usedSpan + span | 0;
    }
    return this.na5_1;
  };
  function LazyGridMeasuredLineProvider(isVertical, slots, gridItemsCount, spaceBetweenLines, measuredItemProvider, spanLayoutProvider) {
    this.u9z_1 = isVertical;
    this.v9z_1 = slots;
    this.w9z_1 = gridItemsCount;
    this.x9z_1 = spaceBetweenLines;
    this.y9z_1 = measuredItemProvider;
    this.z9z_1 = spanLayoutProvider;
  }
  protoOf(LazyGridMeasuredLineProvider).aa0 = function (startSlot, span) {
    var tmp;
    if (span === 1) {
      tmp = this.v9z_1.s9x_1[startSlot];
    } else {
      var endSlot = (startSlot + span | 0) - 1 | 0;
      tmp = (this.v9z_1.t9x_1[endSlot] + this.v9z_1.s9x_1[endSlot] | 0) - this.v9z_1.t9x_1[startSlot] | 0;
    }
    var crossAxisSize = coerceAtLeast(tmp, 0);
    var tmp_0;
    if (this.u9z_1) {
      tmp_0 = Companion_getInstance_0().v35(crossAxisSize);
    } else {
      tmp_0 = Companion_getInstance_0().w35(crossAxisSize);
    }
    return tmp_0;
  };
  protoOf(LazyGridMeasuredLineProvider).ba0 = function (itemIndex) {
    var span = this.z9z_1.sa6(itemIndex, this.z9z_1.la0_1);
    return this.aa0(0, span);
  };
  protoOf(LazyGridMeasuredLineProvider).ca0 = function (lineIndex) {
    var lineConfiguration = this.z9z_1.ma0(lineIndex);
    var lineItemsCount = lineConfiguration.oa0_1.m();
    var tmp;
    if (lineItemsCount === 0 ? true : (lineConfiguration.na0_1 + lineItemsCount | 0) === this.w9z_1) {
      tmp = 0;
    } else {
      tmp = this.x9z_1;
    }
    var mainAxisSpacing = tmp;
    var startSlot = 0;
    var tmp_0 = 0;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_1 = fillArrayVal(Array(lineItemsCount), null);
    while (tmp_0 < lineItemsCount) {
      var tmp_2 = tmp_0;
      var span = _GridItemSpan___get_currentLineSpan__impl__sg7kqc(lineConfiguration.oa0_1.n(tmp_2).pa0_1);
      var constraints = this.aa0(startSlot, span);
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridMeasuredLineProvider.getAndMeasure.<anonymous>' call
      startSlot = startSlot + span | 0;
      tmp_1[tmp_2] = this.y9z_1.i9z(lineConfiguration.na0_1 + tmp_2 | 0, mainAxisSpacing, constraints);
      tmp_0 = tmp_0 + 1 | 0;
    }
    var items = tmp_1;
    return this.t9z(lineIndex, items, lineConfiguration.oa0_1, mainAxisSpacing);
  };
  function _set_index__fyfqnn($this, _set____db54di) {
    var this_0 = $this.ta6_1;
    index$factory();
    this_0.h2e(_set____db54di);
    return Unit_instance;
  }
  function _set_scrollOffset__x5lxuf($this, _set____db54di) {
    var this_0 = $this.ua6_1;
    scrollOffset$factory();
    this_0.h2e(_set____db54di);
    return Unit_instance;
  }
  function update($this, index, scrollOffset) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0.0)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridScrollPosition.update.<anonymous>' call
      var message = 'Index should be non-negative (' + index + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    _set_index__fyfqnn($this, index);
    $this.xa6_1.ca7(index);
    _set_scrollOffset__x5lxuf($this, scrollOffset);
  }
  function LazyGridScrollPosition(initialIndex, initialScrollOffset) {
    initialIndex = initialIndex === VOID ? 0 : initialIndex;
    initialScrollOffset = initialScrollOffset === VOID ? 0 : initialScrollOffset;
    this.ta6_1 = mutableIntStateOf(initialIndex);
    this.ua6_1 = mutableIntStateOf(initialScrollOffset);
    this.va6_1 = false;
    this.wa6_1 = null;
    this.xa6_1 = new LazyLayoutNearestRangeState(initialIndex, 90, 200);
  }
  protoOf(LazyGridScrollPosition).ja1 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.ta6_1;
    index$factory_0();
    return this_0.i2e();
  };
  protoOf(LazyGridScrollPosition).da7 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.ua6_1;
    scrollOffset$factory_0();
    return this_0.i2e();
  };
  protoOf(LazyGridScrollPosition).ea7 = function (measureResult) {
    var tmp = this;
    var tmp0_safe_receiver = measureResult.wa5_1;
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.na5_1;
    var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : firstOrNull_0(tmp1_safe_receiver);
    tmp.wa6_1 = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.ka2_1;
    if (this.va6_1 ? true : measureResult.ea6_1 > 0) {
      this.va6_1 = true;
      var scrollOffset = measureResult.xa5_1;
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(scrollOffset >= 0.0)) {
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridScrollPosition.updateFromMeasureResult.<anonymous>' call
        var message = 'scrollOffset should be non-negative (' + scrollOffset + ')';
        throw IllegalStateException_init_$Create$(toString(message));
      }
      var tmp3_safe_receiver = measureResult.wa5_1;
      var tmp4_safe_receiver = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.na5_1;
      var tmp5_safe_receiver = tmp4_safe_receiver == null ? null : firstOrNull_0(tmp4_safe_receiver);
      var tmp6_elvis_lhs = tmp5_safe_receiver == null ? null : tmp5_safe_receiver.ja2_1;
      var firstIndex = tmp6_elvis_lhs == null ? 0 : tmp6_elvis_lhs;
      update(this, firstIndex, scrollOffset);
    }
  };
  protoOf(LazyGridScrollPosition).fa7 = function (scrollOffset) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(scrollOffset >= 0.0)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridScrollPosition.updateScrollOffset.<anonymous>' call
      var message = 'scrollOffset should be non-negative (' + scrollOffset + ')';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    _set_scrollOffset__x5lxuf(this, scrollOffset);
  };
  protoOf(LazyGridScrollPosition).ga7 = function (index, scrollOffset) {
    update(this, index, scrollOffset);
    this.wa6_1 = null;
  };
  protoOf(LazyGridScrollPosition).wa0 = function (itemProvider, index) {
    var newIndex = findIndexByKey(itemProvider, this.wa6_1, index);
    if (!(index === newIndex)) {
      _set_index__fyfqnn(this, newIndex);
      this.xa6_1.ca7(index);
    }
    return newIndex;
  };
  function index$factory() {
    return getPropertyCallableRef('index', 1, KMutableProperty1, function (receiver) {
      return receiver.ja1();
    }, function (receiver, value) {
      return _set_index__fyfqnn(receiver, value);
    });
  }
  function index$factory_0() {
    return getPropertyCallableRef('index', 1, KMutableProperty1, function (receiver) {
      return receiver.ja1();
    }, function (receiver, value) {
      return _set_index__fyfqnn(receiver, value);
    });
  }
  function scrollOffset$factory() {
    return getPropertyCallableRef('scrollOffset', 1, KMutableProperty1, function (receiver) {
      return receiver.da7();
    }, function (receiver, value) {
      return _set_scrollOffset__x5lxuf(receiver, value);
    });
  }
  function scrollOffset$factory_0() {
    return getPropertyCallableRef('scrollOffset', 1, KMutableProperty1, function (receiver) {
      return receiver.da7();
    }, function (receiver, value) {
      return _set_scrollOffset__x5lxuf(receiver, value);
    });
  }
  function _GridItemSpan___init__impl__x45lr6(packedValue) {
    return packedValue;
  }
  function _get_packedValue__aj623s($this) {
    return $this;
  }
  function _GridItemSpan___get_currentLineSpan__impl__sg7kqc($this) {
    return _get_packedValue__aj623s($this).ea();
  }
  function GridItemSpan__toString_impl_aecw6a($this) {
    return 'GridItemSpan(packedValue=' + $this.toString() + ')';
  }
  function GridItemSpan__hashCode_impl_w5isz5($this) {
    return $this.hashCode();
  }
  function GridItemSpan__equals_impl_og48vf($this, other) {
    if (!(other instanceof GridItemSpan))
      return false;
    var tmp0_other_with_cast = other instanceof GridItemSpan ? other.pa0_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function GridItemSpan(packedValue) {
    this.pa0_1 = packedValue;
  }
  protoOf(GridItemSpan).toString = function () {
    return GridItemSpan__toString_impl_aecw6a(this.pa0_1);
  };
  protoOf(GridItemSpan).hashCode = function () {
    return GridItemSpan__hashCode_impl_w5isz5(this.pa0_1);
  };
  protoOf(GridItemSpan).equals = function (other) {
    return GridItemSpan__equals_impl_og48vf(this.pa0_1, other);
  };
  function GridItemSpan_0(currentLineSpan) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(currentLineSpan > 0)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.GridItemSpan.<anonymous>' call
      var message = 'The span value should be higher than 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return _GridItemSpan___init__impl__x45lr6(toLong(currentLineSpan));
  }
  function LineConfiguration(firstItemIndex, spans) {
    this.na0_1 = firstItemIndex;
    this.oa0_1 = spans;
  }
  function _get_bucketSize__qovgv4($this) {
    // Inline function 'kotlin.math.sqrt' call
    var x = 1.0 * $this.ha7() / $this.la0_1;
    var tmp$ret$0 = Math.sqrt(x);
    return numberToInt(tmp$ret$0) + 1 | 0;
  }
  function getDefaultSpans($this, currentSlotsPerLine) {
    var tmp;
    if (currentSlotsPerLine === $this.ka0_1.m()) {
      tmp = $this.ka0_1;
    } else {
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var list = ArrayList_init_$Create$_0(currentSlotsPerLine);
      // Inline function 'kotlin.repeat' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      if (inductionVariable < currentSlotsPerLine)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlin.collections.MutableList.<anonymous>' call
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getDefaultSpans.<anonymous>' call
          var tmp$ret$0 = GridItemSpan_0(1);
          list.a1(new GridItemSpan(tmp$ret$0));
        }
         while (inductionVariable < currentSlotsPerLine);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getDefaultSpans.<anonymous>' call
      $this.ka0_1 = list;
      tmp = list;
    }
    return tmp;
  }
  function invalidateCache($this) {
    $this.ea0_1.h1();
    $this.ea0_1.a1(new Bucket(0));
    $this.fa0_1 = 0;
    $this.ga0_1 = 0;
    $this.ha0_1 = 0;
    $this.ia0_1 = -1;
    $this.ja0_1.h1();
  }
  function Bucket(firstItemIndex, firstItemKnownSpan) {
    firstItemKnownSpan = firstItemKnownSpan === VOID ? 0 : firstItemKnownSpan;
    this.ia7_1 = firstItemIndex;
    this.ja7_1 = firstItemKnownSpan;
  }
  function LazyGridItemSpanScopeImpl() {
    this.ka7_1 = 0;
    this.la7_1 = 0;
  }
  var LazyGridItemSpanScopeImpl_instance;
  function LazyGridItemSpanScopeImpl_getInstance() {
    return LazyGridItemSpanScopeImpl_instance;
  }
  function LazyGridSpanLayoutProvider$getLineIndexOfItem$lambda($itemIndex) {
    return function (it) {
      return it.ia7_1 - $itemIndex | 0;
    };
  }
  function LazyGridSpanLayoutProvider(gridContent) {
    this.da0_1 = gridContent;
    var tmp = this;
    // Inline function 'kotlin.apply' call
    var this_0 = ArrayList_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.buckets.<anonymous>' call
    this_0.a1(new Bucket(0));
    tmp.ea0_1 = this_0;
    this.fa0_1 = 0;
    this.ga0_1 = 0;
    this.ha0_1 = 0;
    this.ia0_1 = -1;
    var tmp_0 = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp_0.ja0_1 = ArrayList_init_$Create$();
    this.ka0_1 = emptyList();
    this.la0_1 = 0;
  }
  protoOf(LazyGridSpanLayoutProvider).ha7 = function () {
    return this.da0_1.sa1_1.xa1_1;
  };
  protoOf(LazyGridSpanLayoutProvider).sa0 = function (value) {
    if (!(value === this.la0_1)) {
      this.la0_1 = value;
      invalidateCache(this);
    }
  };
  protoOf(LazyGridSpanLayoutProvider).ma0 = function (lineIndex) {
    if (!this.da0_1.ta1_1) {
      var firstItemIndex = imul(lineIndex, this.la0_1);
      return new LineConfiguration(firstItemIndex, getDefaultSpans(this, coerceAtLeast(coerceAtMost(this.la0_1, this.ha7() - firstItemIndex | 0), 0)));
    }
    // Inline function 'kotlin.math.min' call
    var a = lineIndex / _get_bucketSize__qovgv4(this) | 0;
    var b = this.ea0_1.m() - 1 | 0;
    var bucketIndex = Math.min(a, b);
    var currentLine = imul(bucketIndex, _get_bucketSize__qovgv4(this));
    var currentItemIndex = this.ea0_1.n(bucketIndex).ia7_1;
    var knownCurrentItemSpan = this.ea0_1.n(bucketIndex).ja7_1;
    var containsArg = this.fa0_1;
    if (currentLine <= containsArg ? containsArg <= lineIndex : false) {
      currentLine = this.fa0_1;
      currentItemIndex = this.ga0_1;
      knownCurrentItemSpan = this.ha0_1;
    } else {
      if (bucketIndex === this.ia0_1 ? (lineIndex - currentLine | 0) < this.ja0_1.m() : false) {
        currentItemIndex = this.ja0_1.n(lineIndex - currentLine | 0);
        currentLine = lineIndex;
        knownCurrentItemSpan = 0;
      }
    }
    var tmp;
    if ((currentLine % _get_bucketSize__qovgv4(this) | 0) === 0) {
      var containsUpper = _get_bucketSize__qovgv4(this);
      var containsArg_0 = lineIndex - currentLine | 0;
      tmp = 2 <= containsArg_0 ? containsArg_0 < containsUpper : false;
    } else {
      tmp = false;
    }
    var cacheThisBucket = tmp;
    if (cacheThisBucket) {
      this.ia0_1 = bucketIndex;
      this.ja0_1.h1();
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(currentLine <= lineIndex)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineConfiguration.<anonymous>' call
      var message = 'currentLine > lineIndex';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    while (currentLine < lineIndex ? currentItemIndex < this.ha7() : false) {
      if (cacheThisBucket) {
        this.ja0_1.a1(currentItemIndex);
      }
      var spansUsed = 0;
      $l$loop: while (spansUsed < this.la0_1 ? currentItemIndex < this.ha7() : false) {
        var tmp_0;
        if (knownCurrentItemSpan === 0) {
          tmp_0 = this.sa6(currentItemIndex, this.la0_1 - spansUsed | 0);
        } else {
          // Inline function 'kotlin.also' call
          var this_0 = knownCurrentItemSpan;
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineConfiguration.<anonymous>' call
          knownCurrentItemSpan = 0;
          tmp_0 = this_0;
        }
        var span = tmp_0;
        if ((spansUsed + span | 0) > this.la0_1) {
          knownCurrentItemSpan = span;
          break $l$loop;
        }
        currentItemIndex = currentItemIndex + 1 | 0;
        spansUsed = spansUsed + span | 0;
      }
      currentLine = currentLine + 1 | 0;
      if ((currentLine % _get_bucketSize__qovgv4(this) | 0) === 0 ? currentItemIndex < this.ha7() : false) {
        var currentLineBucket = currentLine / _get_bucketSize__qovgv4(this) | 0;
        // Inline function 'kotlin.check' call
        // Inline function 'kotlin.contracts.contract' call
        if (!(this.ea0_1.m() === currentLineBucket)) {
          // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineConfiguration.<anonymous>' call
          var message_0 = 'invalid starting point';
          throw IllegalStateException_init_$Create$(toString(message_0));
        }
        this.ea0_1.a1(new Bucket(currentItemIndex, knownCurrentItemSpan));
      }
    }
    this.fa0_1 = lineIndex;
    this.ga0_1 = currentItemIndex;
    this.ha0_1 = knownCurrentItemSpan;
    var firstItemIndex_0 = currentItemIndex;
    // Inline function 'kotlin.collections.mutableListOf' call
    var spans = ArrayList_init_$Create$();
    var spansUsed_0 = 0;
    $l$loop_0: while (spansUsed_0 < this.la0_1 ? currentItemIndex < this.ha7() : false) {
      var tmp_1;
      if (knownCurrentItemSpan === 0) {
        tmp_1 = this.sa6(currentItemIndex, this.la0_1 - spansUsed_0 | 0);
      } else {
        // Inline function 'kotlin.also' call
        var this_1 = knownCurrentItemSpan;
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineConfiguration.<anonymous>' call
        knownCurrentItemSpan = 0;
        tmp_1 = this_1;
      }
      var span_0 = tmp_1;
      if ((spansUsed_0 + span_0 | 0) > this.la0_1)
        break $l$loop_0;
      currentItemIndex = currentItemIndex + 1 | 0;
      spans.a1(new GridItemSpan(GridItemSpan_0(span_0)));
      spansUsed_0 = spansUsed_0 + span_0 | 0;
    }
    return new LineConfiguration(firstItemIndex_0, spans);
  };
  protoOf(LazyGridSpanLayoutProvider).xa0 = function (itemIndex) {
    if (this.ha7() <= 0) {
      return 0;
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(itemIndex < this.ha7())) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineIndexOfItem.<anonymous>' call
      var message = 'ItemIndex > total count';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (!this.da0_1.ta1_1) {
      return itemIndex / this.la0_1 | 0;
    }
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineIndexOfItem.<anonymous>' call
    var it = binarySearch(this.ea0_1, VOID, VOID, LazyGridSpanLayoutProvider$getLineIndexOfItem$lambda(itemIndex));
    var lowerBoundBucket = it >= 0 ? it : (-it | 0) - 2 | 0;
    var currentLine = imul(lowerBoundBucket, _get_bucketSize__qovgv4(this));
    var currentItemIndex = this.ea0_1.n(lowerBoundBucket).ia7_1;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(currentItemIndex <= itemIndex)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridSpanLayoutProvider.getLineIndexOfItem.<anonymous>' call
      var message_0 = 'currentItemIndex > itemIndex';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var spansUsed = 0;
    while (currentItemIndex < itemIndex) {
      var tmp0 = currentItemIndex;
      currentItemIndex = tmp0 + 1 | 0;
      var span = this.sa6(tmp0, this.la0_1 - spansUsed | 0);
      if ((spansUsed + span | 0) < this.la0_1) {
        spansUsed = spansUsed + span | 0;
      } else if ((spansUsed + span | 0) === this.la0_1) {
        currentLine = currentLine + 1 | 0;
        spansUsed = 0;
      } else {
        currentLine = currentLine + 1 | 0;
        spansUsed = span;
      }
      if ((currentLine % _get_bucketSize__qovgv4(this) | 0) === 0) {
        var currentLineBucket = currentLine / _get_bucketSize__qovgv4(this) | 0;
        if (currentLineBucket >= this.ea0_1.m()) {
          this.ea0_1.a1(new Bucket(currentItemIndex - (spansUsed > 0 ? 1 : 0) | 0));
        }
      }
    }
    if ((spansUsed + this.sa6(itemIndex, this.la0_1 - spansUsed | 0) | 0) > this.la0_1) {
      currentLine = currentLine + 1 | 0;
    }
    return currentLine;
  };
  protoOf(LazyGridSpanLayoutProvider).sa6 = function (itemIndex, maxSpan) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    LazyGridItemSpanScopeImpl_instance.ka7_1 = maxSpan;
    LazyGridItemSpanScopeImpl_instance.la7_1 = this.la0_1;
    var interval = this.da0_1.sa1_1.n(itemIndex);
    var localIntervalIndex = itemIndex - interval.ha5_1 | 0;
    var span = interval.ja5_1.da2_1(LazyGridItemSpanScopeImpl_instance, localIntervalIndex).pa0_1;
    return _GridItemSpan___get_currentLineSpan__impl__sg7kqc(span);
  };
  function get_EmptyLazyGridLayoutInfo() {
    _init_properties_LazyGridState_kt__6hut();
    return EmptyLazyGridLayoutInfo;
  }
  var EmptyLazyGridLayoutInfo;
  function LazyGridState$Companion$Saver$lambda($this$listSaver, it) {
    return listOf([it.va0(), it.ya0()]);
  }
  function LazyGridState$Companion$Saver$lambda_0(it) {
    return new LazyGridState(it.n(0), it.n(1));
  }
  function _set_canScrollForward__ffth81($this, _set____db54di) {
    var this_0 = $this.r9y_1;
    canScrollForward$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _set_canScrollBackward__6c7ll1($this, _set____db54di) {
    var this_0 = $this.s9y_1;
    canScrollBackward$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function notifyPrefetch($this, delta, layoutInfo) {
    var prefetchState = $this.t9y_1;
    if (!$this.d9y_1) {
      return Unit_instance;
    }
    var info = layoutInfo;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!info.ga1().u()) {
      var scrollingForward = delta < 0.0;
      var lineToPrefetch;
      var closestNextItemToPrefetch;
      if (scrollingForward) {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.notifyPrefetch.<anonymous>' call
        var it = last(info.ga1());
        lineToPrefetch = 1 + ($this.a9y_1 ? it.ma6() : it.na6()) | 0;
        closestNextItemToPrefetch = last(info.ga1()).ja1() + 1 | 0;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.notifyPrefetch.<anonymous>' call
        var it_0 = first(info.ga1());
        lineToPrefetch = -1 + ($this.a9y_1 ? it_0.ma6() : it_0.na6()) | 0;
        closestNextItemToPrefetch = first(info.ga1()).ja1() - 1 | 0;
      }
      if (!(lineToPrefetch === $this.e9y_1) ? 0 <= closestNextItemToPrefetch ? closestNextItemToPrefetch < info.ea1() : false : false) {
        if (!($this.g9y_1 === scrollingForward)) {
          // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
          var this_0 = $this.f9y_1;
          // Inline function 'kotlin.contracts.contract' call
          var size = this_0.t1v_1;
          if (size > 0) {
            var i = 0;
            var tmp = this_0.r1v_1;
            var content = isArray(tmp) ? tmp : THROW_CCE();
            do {
              // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.notifyPrefetch.<anonymous>' call
              content[i].l7p();
              i = i + 1 | 0;
            }
             while (i < size);
          }
        }
        $this.g9y_1 = scrollingForward;
        $this.e9y_1 = lineToPrefetch;
        $this.f9y_1.h1();
        // Inline function 'androidx.compose.ui.util.fastForEach' call
        var this_1 = $this.ma7()(lineToPrefetch);
        // Inline function 'kotlin.contracts.contract' call
        var inductionVariable = 0;
        var last_0 = this_1.m() - 1 | 0;
        if (inductionVariable <= last_0)
          do {
            var index = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var item = this_1.n(index);
            // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.notifyPrefetch.<anonymous>' call
            $this.f9y_1.u1v(prefetchState.oa7(item.pe_1, item.qe_1.s35_1));
          }
           while (inductionVariable <= last_0);
      }
    }
  }
  function notifyPrefetch$default($this, delta, layoutInfo, $super) {
    layoutInfo = layoutInfo === VOID ? $this.v9x_1.s2() : layoutInfo;
    return notifyPrefetch($this, delta, layoutInfo);
  }
  function cancelPrefetchIfVisibleItemsChanged($this, info) {
    var tmp;
    if (!($this.e9y_1 === -1)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      tmp = !info.ga1().u();
    } else {
      tmp = false;
    }
    if (tmp) {
      var tmp_0;
      if ($this.g9y_1) {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.cancelPrefetchIfVisibleItemsChanged.<anonymous>' call
        var it = last(info.ga1());
        tmp_0 = ($this.a9y_1 ? it.ma6() : it.na6()) + 1 | 0;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.cancelPrefetchIfVisibleItemsChanged.<anonymous>' call
        var it_0 = first(info.ga1());
        tmp_0 = ($this.a9y_1 ? it_0.ma6() : it_0.na6()) - 1 | 0;
      }
      var expectedLineToPrefetch = tmp_0;
      if (!($this.e9y_1 === expectedLineToPrefetch)) {
        $this.e9y_1 = -1;
        // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
        var this_0 = $this.f9y_1;
        // Inline function 'kotlin.contracts.contract' call
        var size = this_0.t1v_1;
        if (size > 0) {
          var i = 0;
          var tmp_1 = this_0.r1v_1;
          var content = isArray(tmp_1) ? tmp_1 : THROW_CCE();
          do {
            // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.cancelPrefetchIfVisibleItemsChanged.<anonymous>' call
            content[i].l7p();
            i = i + 1 | 0;
          }
           while (i < size);
        }
        $this.f9y_1.h1();
      }
    }
  }
  function Companion_3() {
    Companion_instance_6 = this;
    var tmp = this;
    var tmp_0 = LazyGridState$Companion$Saver$lambda;
    tmp.pa7_1 = listSaver(tmp_0, LazyGridState$Companion$Saver$lambda_0);
  }
  var Companion_instance_6;
  function Companion_getInstance_27() {
    if (Companion_instance_6 == null)
      new Companion_3();
    return Companion_instance_6;
  }
  function LazyGridState$scrollableState$lambda(this$0) {
    return function (it) {
      return -this$0.qa7(-it);
    };
  }
  function LazyGridState$remeasurementModifier$1(this$0) {
    this.ra7_1 = this$0;
  }
  protoOf(LazyGridState$remeasurementModifier$1).u5s = function (remeasurement) {
    this.ra7_1.h9y_1 = remeasurement;
  };
  function LazyGridState$prefetchInfoRetriever$delegate$lambda(it) {
    return emptyList();
  }
  function LazyGridState$scrollToItem$slambda(this$0, $index, $scrollOffset, resultContinuation) {
    this.aa8_1 = this$0;
    this.ba8_1 = $index;
    this.ca8_1 = $scrollOffset;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(LazyGridState$scrollToItem$slambda).h8p = function ($this$scroll, $completion) {
    var tmp = this.i8p($this$scroll, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(LazyGridState$scrollToItem$slambda).yc = function (p1, $completion) {
    return this.h8p((!(p1 == null) ? isInterface(p1, ScrollScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(LazyGridState$scrollToItem$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          this.aa8_1.ea8(this.ba8_1, this.ca8_1);
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(LazyGridState$scrollToItem$slambda).i8p = function ($this$scroll, completion) {
    var i = new LazyGridState$scrollToItem$slambda(this.aa8_1, this.ba8_1, this.ca8_1, completion);
    i.da8_1 = $this$scroll;
    return i;
  };
  function LazyGridState$scrollToItem$slambda_0(this$0, $index, $scrollOffset, resultContinuation) {
    var i = new LazyGridState$scrollToItem$slambda(this$0, $index, $scrollOffset, resultContinuation);
    var l = function ($this$scroll, $completion) {
      return i.h8p($this$scroll, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $scrollCOROUTINE$31(_this__u8e3s4, scrollPriority, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.na8_1 = _this__u8e3s4;
    this.oa8_1 = scrollPriority;
    this.pa8_1 = block;
  }
  protoOf($scrollCOROUTINE$31).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.ac_1 = 1;
            suspendResult = this.na8_1.j9y_1.sa8(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.ac_1 = 2;
            suspendResult = this.na8_1.b9y_1.o99(this.oa8_1, this.pa8_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function LazyGridState(firstVisibleItemIndex, firstVisibleItemScrollOffset) {
    Companion_getInstance_27();
    firstVisibleItemIndex = firstVisibleItemIndex === VOID ? 0 : firstVisibleItemIndex;
    firstVisibleItemScrollOffset = firstVisibleItemScrollOffset === VOID ? 0 : firstVisibleItemScrollOffset;
    this.u9x_1 = new LazyGridScrollPosition(firstVisibleItemIndex, firstVisibleItemScrollOffset);
    this.v9x_1 = mutableStateOf(get_EmptyLazyGridLayoutInfo(), neverEqualPolicy());
    this.w9x_1 = funMutableInteractionSource();
    this.x9x_1 = 0.0;
    this.y9x_1 = mutableIntStateOf(0);
    this.z9x_1 = Density_0(1.0, 1.0);
    this.a9y_1 = true;
    var tmp = this;
    tmp.b9y_1 = ScrollableState_0(LazyGridState$scrollableState$lambda(this));
    this.c9y_1 = 0;
    this.d9y_1 = true;
    this.e9y_1 = -1;
    var tmp_0 = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp_0.f9y_1 = new MutableVector(tmp$ret$0, 0);
    this.g9y_1 = false;
    this.h9y_1 = null;
    var tmp_1 = this;
    tmp_1.i9y_1 = new LazyGridState$remeasurementModifier$1(this);
    this.j9y_1 = new AwaitFirstLayoutModifier();
    var tmp_2 = this;
    tmp_2.k9y_1 = mutableStateOf(LazyGridState$prefetchInfoRetriever$delegate$lambda);
    this.l9y_1 = new LazyGridItemPlacementAnimator();
    this.m9y_1 = new LazyLayoutBeyondBoundsInfo();
    this.n9y_1 = new LazyGridAnimateScrollScope(this);
    this.o9y_1 = LazyLayoutPinnedItemList_init_$Create$();
    this.p9y_1 = this.u9x_1.xa6_1;
    this.q9y_1 = _ObservableScopeInvalidator___init__impl__ism0sl();
    this.r9y_1 = mutableStateOf(false);
    this.s9y_1 = mutableStateOf(false);
    this.t9y_1 = new LazyLayoutPrefetchState();
  }
  protoOf(LazyGridState).va0 = function () {
    return this.u9x_1.ja1();
  };
  protoOf(LazyGridState).ya0 = function () {
    return this.u9x_1.da7();
  };
  protoOf(LazyGridState).da1 = function () {
    return this.v9x_1.s2();
  };
  protoOf(LazyGridState).sa0 = function (_set____db54di) {
    var this_0 = this.y9x_1;
    slotsPerLine$factory();
    this_0.h2e(_set____db54di);
    return Unit_instance;
  };
  protoOf(LazyGridState).ta8 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.y9x_1;
    slotsPerLine$factory_0();
    return this_0.i2e();
  };
  protoOf(LazyGridState).ua0 = function (_set____db54di) {
    var this_0 = this.k9y_1;
    prefetchInfoRetriever$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(LazyGridState).ma7 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.k9y_1;
    prefetchInfoRetriever$factory_0();
    return this_0.s2();
  };
  protoOf(LazyGridState).la5 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.p9y_1;
    nearestRange$factory();
    return this_0.s2();
  };
  protoOf(LazyGridState).ua8 = function (index, scrollOffset, $completion) {
    return this.a8q(VOID, LazyGridState$scrollToItem$slambda_0(this, index, scrollOffset, null), $completion);
  };
  protoOf(LazyGridState).va8 = function (index, scrollOffset, $completion, $super) {
    scrollOffset = scrollOffset === VOID ? 0 : scrollOffset;
    return $super === VOID ? this.ua8(index, scrollOffset, $completion) : $super.ua8.call(this, index, scrollOffset, $completion);
  };
  protoOf(LazyGridState).ea8 = function (index, scrollOffset) {
    this.u9x_1.ga7(index, scrollOffset);
    this.l9y_1.v2b();
    var tmp0_safe_receiver = this.h9y_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.u6c();
    }
  };
  protoOf(LazyGridState).o99 = function (scrollPriority, block, $completion) {
    var tmp = new $scrollCOROUTINE$31(this, scrollPriority, block, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(LazyGridState).y9l = function (delta) {
    return this.b9y_1.y9l(delta);
  };
  protoOf(LazyGridState).x9l = function () {
    return this.b9y_1.x9l();
  };
  protoOf(LazyGridState).o96 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.r9y_1;
    canScrollForward$factory_0();
    return this_0.s2();
  };
  protoOf(LazyGridState).n96 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.s9y_1;
    canScrollBackward$factory_0();
    return this_0.s2();
  };
  protoOf(LazyGridState).qa7 = function (distance) {
    if ((distance < 0.0 ? !this.o96() : false) ? true : distance > 0.0 ? !this.n96() : false) {
      return 0.0;
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.math.abs' call
    var x = this.x9x_1;
    // Inline function 'kotlin.contracts.contract' call
    if (!(Math.abs(x) <= 0.5)) {
      // Inline function 'androidx.compose.foundation.lazy.grid.LazyGridState.onScroll.<anonymous>' call
      var message = 'entered drag with non-zero pending scroll: ' + this.x9x_1;
      throw IllegalStateException_init_$Create$(toString(message));
    }
    this.x9x_1 = this.x9x_1 + distance;
    // Inline function 'kotlin.math.abs' call
    var x_0 = this.x9x_1;
    if (Math.abs(x_0) > 0.5) {
      var layoutInfo = this.v9x_1.s2();
      var preScrollToBeConsumed = this.x9x_1;
      // Inline function 'kotlin.math.roundToInt' call
      var this_0 = this.x9x_1;
      var intDelta = roundToInt(this_0);
      if (layoutInfo.ka6(intDelta)) {
        this.wa8(layoutInfo, true);
        ObservableScopeInvalidator__invalidateScope_impl_b202xc(this.q9y_1);
        notifyPrefetch(this, preScrollToBeConsumed - this.x9x_1, layoutInfo);
      } else {
        var tmp1_safe_receiver = this.h9y_1;
        if (tmp1_safe_receiver == null)
          null;
        else {
          tmp1_safe_receiver.u6c();
        }
        notifyPrefetch$default(this, preScrollToBeConsumed - this.x9x_1);
      }
    }
    // Inline function 'kotlin.math.abs' call
    var x_1 = this.x9x_1;
    if (Math.abs(x_1) <= 0.5) {
      return distance;
    } else {
      var scrollConsumed = distance - this.x9x_1;
      this.x9x_1 = 0.0;
      return scrollConsumed;
    }
  };
  protoOf(LazyGridState).wa8 = function (result, visibleItemsStayedTheSame) {
    this.x9x_1 = this.x9x_1 - result.za5_1;
    this.v9x_1.g1d(result);
    if (visibleItemsStayedTheSame) {
      this.u9x_1.fa7(result.xa5_1);
    } else {
      this.u9x_1.ea7(result);
      cancelPrefetchIfVisibleItemsChanged(this, result);
    }
    _set_canScrollBackward__6c7ll1(this, result.n96());
    _set_canScrollForward__ffth81(this, result.ya5_1);
    this.c9y_1 = this.c9y_1 + 1 | 0;
  };
  protoOf(LazyGridState).za0 = function (result, visibleItemsStayedTheSame, $super) {
    visibleItemsStayedTheSame = visibleItemsStayedTheSame === VOID ? false : visibleItemsStayedTheSame;
    var tmp;
    if ($super === VOID) {
      this.wa8(result, visibleItemsStayedTheSame);
      tmp = Unit_instance;
    } else {
      tmp = $super.wa8.call(this, result, visibleItemsStayedTheSame);
    }
    return tmp;
  };
  protoOf(LazyGridState).wa0 = function (itemProvider, firstItemIndex) {
    return this.u9x_1.wa0(itemProvider, firstItemIndex);
  };
  function rememberLazyGridState(initialFirstVisibleItemIndex, initialFirstVisibleItemScrollOffset, $composer, $changed, $default) {
    _init_properties_LazyGridState_kt__6hut();
    var initialFirstVisibleItemIndex_0 = {_v: initialFirstVisibleItemIndex};
    var initialFirstVisibleItemScrollOffset_0 = {_v: initialFirstVisibleItemScrollOffset};
    var $composer_0 = $composer;
    $composer_0.j1l(29186956);
    sourceInformation($composer_0, 'C(rememberLazyGridState)68@3130L130,68@3084L176:LazyGridState.kt#7791vq');
    if (!(($default & 1) === 0)) {
      initialFirstVisibleItemIndex_0._v = 0;
    }
    if (!(($default & 2) === 0)) {
      initialFirstVisibleItemScrollOffset_0._v = 0;
    }
    if (isTraceInProgress()) {
      traceEventStart(29186956, $changed, -1, 'androidx.compose.foundation.lazy.grid.rememberLazyGridState (LazyGridState.kt:67)');
    }
    var tmp = Companion_getInstance_27().pa7_1;
    $composer_0.j1l(-890218908);
    sourceInformation($composer_0, 'CC(remember):LazyGridState.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.n1y(initialFirstVisibleItemIndex_0._v) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.n1y(initialFirstVisibleItemScrollOffset_0._v) : false) ? true : ($changed & 48) === 32));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp_0;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridState.<anonymous>' call
      var value = rememberLazyGridState$lambda(initialFirstVisibleItemIndex_0, initialFirstVisibleItemScrollOffset_0);
      $composer_0.d1z(value);
      tmp_0 = value;
    } else {
      tmp_0 = it;
    }
    var tmp_1 = tmp_0;
    var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    $composer_0.l1l();
    var tmp0 = rememberSaveable([], tmp, null, tmp1_group, $composer_0, 72, 4);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function EmptyLazyGridLayoutInfo$1() {
    this.xa8_1 = 0;
    this.ya8_1 = 0;
    this.za8_1 = emptyMap();
  }
  protoOf(EmptyLazyGridLayoutInfo$1).e34 = function () {
    return this.xa8_1;
  };
  protoOf(EmptyLazyGridLayoutInfo$1).f34 = function () {
    return this.ya8_1;
  };
  protoOf(EmptyLazyGridLayoutInfo$1).t5r = function () {
    return this.za8_1;
  };
  protoOf(EmptyLazyGridLayoutInfo$1).u5r = function () {
  };
  function rememberLazyGridState$lambda($initialFirstVisibleItemIndex, $initialFirstVisibleItemScrollOffset) {
    return function () {
      return new LazyGridState($initialFirstVisibleItemIndex._v, $initialFirstVisibleItemScrollOffset._v);
    };
  }
  function slotsPerLine$factory() {
    return getPropertyCallableRef('slotsPerLine', 1, KMutableProperty1, function (receiver) {
      return receiver.ta8();
    }, function (receiver, value) {
      return receiver.sa0(value);
    });
  }
  function slotsPerLine$factory_0() {
    return getPropertyCallableRef('slotsPerLine', 1, KMutableProperty1, function (receiver) {
      return receiver.ta8();
    }, function (receiver, value) {
      return receiver.sa0(value);
    });
  }
  function prefetchInfoRetriever$factory() {
    return getPropertyCallableRef('prefetchInfoRetriever', 1, KMutableProperty1, function (receiver) {
      return receiver.ma7();
    }, function (receiver, value) {
      return receiver.ua0(value);
    });
  }
  function prefetchInfoRetriever$factory_0() {
    return getPropertyCallableRef('prefetchInfoRetriever', 1, KMutableProperty1, function (receiver) {
      return receiver.ma7();
    }, function (receiver, value) {
      return receiver.ua0(value);
    });
  }
  function nearestRange$factory() {
    return getPropertyCallableRef('nearestRange', 1, KProperty1, function (receiver) {
      return receiver.la5();
    }, null);
  }
  function canScrollForward$factory() {
    return getPropertyCallableRef('canScrollForward', 1, KMutableProperty1, function (receiver) {
      return receiver.o96();
    }, function (receiver, value) {
      return _set_canScrollForward__ffth81(receiver, value);
    });
  }
  function canScrollForward$factory_0() {
    return getPropertyCallableRef('canScrollForward', 1, KMutableProperty1, function (receiver) {
      return receiver.o96();
    }, function (receiver, value) {
      return _set_canScrollForward__ffth81(receiver, value);
    });
  }
  function canScrollBackward$factory() {
    return getPropertyCallableRef('canScrollBackward', 1, KMutableProperty1, function (receiver) {
      return receiver.n96();
    }, function (receiver, value) {
      return _set_canScrollBackward__6c7ll1(receiver, value);
    });
  }
  function canScrollBackward$factory_0() {
    return getPropertyCallableRef('canScrollBackward', 1, KMutableProperty1, function (receiver) {
      return receiver.n96();
    }, function (receiver, value) {
      return _set_canScrollBackward__6c7ll1(receiver, value);
    });
  }
  var properties_initialized_LazyGridState_kt_b7v9uh;
  function _init_properties_LazyGridState_kt__6hut() {
    if (!properties_initialized_LazyGridState_kt_b7v9uh) {
      properties_initialized_LazyGridState_kt_b7v9uh = true;
      var tmp0_measureResult = new EmptyLazyGridLayoutInfo$1();
      var tmp1_visibleItemsInfo = emptyList();
      var tmp2_orientation = Orientation_Vertical_getInstance();
      EmptyLazyGridLayoutInfo = new LazyGridMeasureResult(null, 0, false, 0.0, tmp0_measureResult, false, tmp1_visibleItemsInfo, 0, 0, 0, false, tmp2_orientation, 0, 0);
    }
  }
  function rememberLazyGridSemanticState(state, reverseScrolling, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1247008005);
    sourceInformation($composer_0, 'C(rememberLazyGridSemanticState)P(1)31@1179L880:LazySemantics.kt#7791vq');
    if (isTraceInProgress()) {
      traceEventStart(-1247008005, $changed, -1, 'androidx.compose.foundation.lazy.grid.rememberLazyGridSemanticState (LazySemantics.kt:31)');
    }
    $composer_0.j1l(488752076);
    sourceInformation($composer_0, 'CC(remember):LazySemantics.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.v1o(state) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.k1y(reverseScrolling) : false) ? true : ($changed & 48) === 32));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.grid.rememberLazyGridSemanticState.<anonymous>' call
      var value = new rememberLazyGridSemanticState$1$1(state);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function $animateScrollByCOROUTINE$32(_this__u8e3s4, delta, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.ia9_1 = _this__u8e3s4;
    this.ja9_1 = delta;
  }
  protoOf($animateScrollByCOROUTINE$32).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = animateScrollBy(this.ia9_1.ka9_1, this.ja9_1, VOID, this);
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
  function rememberLazyGridSemanticState$1$1($state) {
    this.ka9_1 = $state;
  }
  protoOf(rememberLazyGridSemanticState$1$1).ya0 = function () {
    return this.ka9_1.ya0();
  };
  protoOf(rememberLazyGridSemanticState$1$1).va0 = function () {
    return this.ka9_1.va0();
  };
  protoOf(rememberLazyGridSemanticState$1$1).o96 = function () {
    return this.ka9_1.o96();
  };
  protoOf(rememberLazyGridSemanticState$1$1).la9 = function (delta, $completion) {
    var tmp = new $animateScrollByCOROUTINE$32(this, delta, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(rememberLazyGridSemanticState$1$1).ma9 = function (index, $completion) {
    return this.ka9_1.va8(index, VOID, $completion);
  };
  protoOf(rememberLazyGridSemanticState$1$1).na9 = function () {
    return new CollectionInfo(-1, -1);
  };
  function $waitForFirstLayoutCOROUTINE$33(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.ya9_1 = _this__u8e3s4;
  }
  protoOf($waitForFirstLayoutCOROUTINE$33).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (!this.ya9_1.qa8_1) {
              this.za9_1 = this.ya9_1.ra8_1;
              this.ac_1 = 1;
              var safe = SafeContinuation_init_$Create$(intercepted(this));
              this.ya9_1.ra8_1 = safe;
              suspendResult = returnIfSuspended(safe.v6(), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            var tmp0_safe_receiver = this.za9_1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              tmp0_safe_receiver.u6(_Result___init__impl__xyqfz8(Unit_instance));
            }

            this.ac_1 = 2;
            continue $sm;
          case 2:
            return Unit_instance;
          case 3:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 3) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function AwaitFirstLayoutModifier() {
    this.qa8_1 = false;
    this.ra8_1 = null;
  }
  protoOf(AwaitFirstLayoutModifier).sa8 = function ($completion) {
    var tmp = new $waitForFirstLayoutCOROUTINE$33(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AwaitFirstLayoutModifier).l5s = function (coordinates) {
    if (!this.qa8_1) {
      this.qa8_1 = true;
      var tmp0_safe_receiver = this.ra8_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        tmp0_safe_receiver.u6(tmp$ret$0);
      }
      this.ra8_1 = null;
    }
  };
  function Interval(startIndex, size, value) {
    this.ha5_1 = startIndex;
    this.ia5_1 = size;
    this.ja5_1 = value;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.ha5_1 >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.Interval.<anonymous>' call
      var message = 'startIndex should be >= 0, but was ' + this.ha5_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.ia5_1 > 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.Interval.<anonymous>' call
      var message_0 = 'size should be >0, but was ' + this.ia5_1;
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  function getIntervalForIndex($this, itemIndex) {
    var lastInterval = $this.ya1_1;
    var tmp;
    if (!(lastInterval == null) ? contains(lastInterval, $this, itemIndex) : false) {
      tmp = lastInterval;
    } else {
      // Inline function 'kotlin.also' call
      // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
      var this_0 = $this.wa1_1;
      var index = binarySearch_0($this.wa1_1, itemIndex);
      var tmp_0 = this_0.r1v_1[index];
      var this_1 = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.MutableIntervalList.getIntervalForIndex.<anonymous>' call
      $this.ya1_1 = this_1;
      tmp = this_1;
    }
    return tmp;
  }
  function checkIndexBounds($this, index) {
    if (!(0 <= index ? index < $this.xa1_1 : false)) {
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ', size ' + $this.xa1_1);
    }
  }
  function contains(_this__u8e3s4, $this, index) {
    var containsLower = _this__u8e3s4.ha5_1;
    return index < (_this__u8e3s4.ha5_1 + _this__u8e3s4.ia5_1 | 0) ? containsLower <= index : false;
  }
  function MutableIntervalList() {
    var tmp = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp.wa1_1 = new MutableVector(tmp$ret$0, 0);
    this.xa1_1 = 0;
    this.ya1_1 = null;
  }
  protoOf(MutableIntervalList).m = function () {
    return this.xa1_1;
  };
  protoOf(MutableIntervalList).za1 = function (size, value) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(size >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.MutableIntervalList.addInterval.<anonymous>' call
      var message = 'size should be >=0, but was ' + size;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (size === 0) {
      return Unit_instance;
    }
    var interval = new Interval(this.xa1_1, size, value);
    this.xa1_1 = this.xa1_1 + size | 0;
    this.wa1_1.u1v(interval);
  };
  protoOf(MutableIntervalList).aaa = function (fromIndex, toIndex, block) {
    checkIndexBounds(this, fromIndex);
    checkIndexBounds(this, toIndex);
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(toIndex >= fromIndex)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.MutableIntervalList.forEach.<anonymous>' call
      var message = 'toIndex (' + toIndex + ') should be not smaller than fromIndex (' + fromIndex + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var intervalIndex = binarySearch_0(this.wa1_1, fromIndex);
    // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
    var this_0 = this.wa1_1;
    var index = intervalIndex;
    var tmp = this_0.r1v_1[index];
    var itemIndex = ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).ha5_1;
    while (itemIndex <= toIndex) {
      // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
      var this_1 = this.wa1_1;
      var index_0 = intervalIndex;
      var tmp_0 = this_1.r1v_1[index_0];
      var interval = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      block(interval);
      itemIndex = itemIndex + interval.ia5_1 | 0;
      intervalIndex = intervalIndex + 1 | 0;
    }
  };
  protoOf(MutableIntervalList).n = function (index) {
    checkIndexBounds(this, index);
    return getIntervalForIndex(this, index);
  };
  function binarySearch_0(_this__u8e3s4, itemIndex) {
    var left = 0;
    // Inline function 'androidx.compose.runtime.collection.MutableVector.lastIndex' call
    var right = _this__u8e3s4.t1v_1 - 1 | 0;
    while (left < right) {
      var middle = left + ((right - left | 0) / 2 | 0) | 0;
      // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
      var tmp = _this__u8e3s4.r1v_1[middle];
      var middleValue = ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).ha5_1;
      if (middleValue === itemIndex) {
        return middle;
      }
      if (middleValue < itemIndex) {
        left = middle + 1 | 0;
        // Inline function 'androidx.compose.runtime.collection.MutableVector.get' call
        var index = left;
        var tmp_0 = _this__u8e3s4.r1v_1[index];
        if (itemIndex < ((tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE()).ha5_1) {
          return middle;
        }
      } else {
        right = middle - 1 | 0;
      }
    }
    return left;
  }
  function LazyLayout(itemProvider, modifier, prefetchState, measurePolicy, $composer, $changed, $default) {
    var modifier_0 = {_v: modifier};
    var prefetchState_0 = {_v: prefetchState};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(2002163445);
    sourceInformation($composer_0, 'C(LazyLayout)P(!1,2,3)78@3217L34,80@3257L1039:LazyLayout.kt#wow0x6');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.j1y(itemProvider) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier_0._v) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.v1o(prefetchState_0._v) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.j1y(measurePolicy) ? 2048 : 1024);
    if (!(($dirty & 5851) === 1170) ? true : !$composer_0.f1x()) {
      if (!(($default & 2) === 0)) {
        modifier_0._v = Companion_instance;
      }
      if (!(($default & 4) === 0)) {
        prefetchState_0._v = null;
      }
      if (isTraceInProgress()) {
        traceEventStart(2002163445, $dirty, -1, 'androidx.compose.foundation.lazy.layout.LazyLayout (LazyLayout.kt:77)');
      }
      var currentItemProvider = rememberUpdatedState(itemProvider, $composer_0, 14 & $dirty);
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous>' call
      var tmp = $composer_0;
      var dispatchReceiver = composableLambda(tmp, -1488997347, true, LazyLayout$lambda(prefetchState_0, modifier_0, measurePolicy, currentItemProvider));
      // Inline function 'androidx.compose.runtime.remember' call
      var $composer_1 = $composer_0;
      $composer_1.j1l(1157296644);
      sourceInformation($composer_1, 'CC(remember)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_1.v1o(dispatchReceiver);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous>.<anonymous>' call
        var value = ComposableLambda$invoke$ref_0(dispatchReceiver);
        $composer_1.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_1.l1l();
      LazySaveableStateHolderProvider(tmp0, $composer_0, 6);
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
      tmp0_safe_receiver.j24(LazyLayout$lambda_0(itemProvider, modifier_0, prefetchState_0, measurePolicy, $changed, $default));
    }
  }
  function LazyLayoutItemReusePolicy(factory) {
    this.baa_1 = factory;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.caa_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(LazyLayoutItemReusePolicy).v5x = function (slotIds) {
    this.caa_1.h1();
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    var $this$with = slotIds.o();
    while ($this$with.d1()) {
      var slotId = $this$with.f1();
      var type = this.baa_1.gaa(slotId);
      var tmp0_elvis_lhs = this.caa_1.z2(type);
      var currentCount = tmp0_elvis_lhs == null ? 0 : tmp0_elvis_lhs;
      if (currentCount === 7) {
        $this$with.e1();
      } else {
        // Inline function 'kotlin.collections.set' call
        var this_0 = this.caa_1;
        var value = currentCount + 1 | 0;
        this_0.p2(type, value);
      }
    }
  };
  protoOf(LazyLayoutItemReusePolicy).z5w = function (slotId, reusableSlotId) {
    return equals(this.baa_1.gaa(slotId), this.baa_1.gaa(reusableSlotId));
  };
  function LazyLayout$lambda$lambda($currentItemProvider) {
    return function () {
      return $currentItemProvider.s2()();
    };
  }
  function LazyLayout$lambda$lambda_0($itemContentFactory, $measurePolicy) {
    return function ($this$null, constraints) {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous>.<anonymous>.<anonymous>.<anonymous>.<anonymous>' call
      var $this$with = new LazyLayoutMeasureScopeImpl($itemContentFactory, $this$null);
      return $measurePolicy($this$with, constraints);
    };
  }
  function LazyLayout$lambda($prefetchState, $modifier, $measurePolicy, $currentItemProvider) {
    return function (saveableStateHolder, $composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C81@3347L114,84@3498L101,98@3888L392,95@3801L489:LazyLayout.kt#wow0x6');
      if (isTraceInProgress()) {
        traceEventStart(-1488997347, $changed, -1, 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous> (LazyLayout.kt:81)');
      }
      $composer_0.j1l(6610163);
      sourceInformation($composer_0, 'CC(remember):LazyLayout.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous>.<anonymous>.<anonymous>' call
        var value = new LazyLayoutItemContentFactory(saveableStateHolder, LazyLayout$lambda$lambda($currentItemProvider));
        $composer_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      var itemContentFactory = tmp0_group;
      $composer_0.j1l(6614982);
      sourceInformation($composer_0, 'CC(remember):LazyLayout.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = $composer_0.x1y();
      var tmp_1;
      if (false ? true : it_0 === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous>.<anonymous>.<anonymous>' call
        var value_0 = new SubcomposeLayoutState(new LazyLayoutItemReusePolicy(itemContentFactory));
        $composer_0.d1z(value_0);
        tmp_1 = value_0;
      } else {
        tmp_1 = it_0;
      }
      var tmp_2 = tmp_1;
      var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
      $composer_0.l1l();
      var subcomposeLayoutState = tmp1_group;
      var tmp0_safe_receiver = $prefetchState._v;
      $composer_0.j1l(6619049);
      sourceInformation($composer_0, '*88@3641L140');
      var tmp_3;
      if (tmp0_safe_receiver == null) {
        tmp_3 = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        LazyLayoutPrefetcher($prefetchState._v, itemContentFactory, subcomposeLayoutState, $composer_0, 576);
        tmp_3 = Unit_instance;
      }
      $composer_0.l1l();
      var tmp_4 = $modifier._v;
      $composer_0.j1l(6627753);
      sourceInformation($composer_0, 'CC(remember):LazyLayout.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!($composer_0.v1o(itemContentFactory) | $composer_0.v1o($measurePolicy));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_1 = $composer_0.x1y();
      var tmp_5;
      if (invalid ? true : it_1 === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayout.<anonymous>.<anonymous>.<anonymous>' call
        var value_1 = LazyLayout$lambda$lambda_0(itemContentFactory, $measurePolicy);
        $composer_0.d1z(value_1);
        tmp_5 = value_1;
      } else {
        tmp_5 = it_1;
      }
      var tmp_6 = tmp_5;
      var tmp3_group = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
      $composer_0.l1l();
      SubcomposeLayout(subcomposeLayoutState, tmp_4, tmp3_group, $composer_0, 8, 0);
      var tmp_7;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_7 = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ComposableLambda$invoke$ref_0($boundThis) {
    return function (p0, p1, p2) {
      return $boundThis.p31(p0, p1, p2);
    };
  }
  function LazyLayout$lambda_0($itemProvider, $modifier, $prefetchState, $measurePolicy, $$changed, $$default) {
    return function ($composer, $force) {
      LazyLayout($itemProvider, $modifier._v, $prefetchState._v, $measurePolicy, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  function get_InterruptionSpec() {
    _init_properties_LazyLayoutAnimation_kt__csewms();
    return InterruptionSpec;
  }
  var InterruptionSpec;
  var DefaultLayerBlock;
  function LazyLayoutAnimation$animatePlacementDelta$slambda$lambda(this$0, $animationTarget) {
    return function ($this$animateTo) {
      // Inline function 'androidx.compose.ui.unit.IntOffset.minus' call
      var this_0 = $this$animateTo.s2().t36_1;
      var other = $animationTarget;
      var tmp$ret$0 = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_0) - _IntOffset___get_x__impl__qiqr5o(other) | 0, _IntOffset___get_y__impl__2avpwj(this_0) - _IntOffset___get_y__impl__2avpwj(other) | 0);
      _set_placementDelta__ka0zmk(this$0, tmp$ret$0);
      return Unit_instance;
    };
  }
  function _set_isPlacementAnimationInProgress__3yokhw($this, _set____db54di) {
    var this_0 = $this.la3_1;
    isPlacementAnimationInProgress$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _set_isAppearanceAnimationInProgress__16qsn7($this, _set____db54di) {
    var this_0 = $this.ma3_1;
    isAppearanceAnimationInProgress$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _set_placementDelta__ka0zmk($this, _set____db54di) {
    var this_0 = $this.qa3_1;
    placementDelta$factory();
    var value = new IntOffset_0(_set____db54di);
    this_0.g1d(value);
    return Unit_instance;
  }
  function _set_visibility__f9zqd7($this, _set____db54di) {
    var this_0 = $this.ra3_1;
    visibility$factory();
    this_0.d2d(_set____db54di);
    return Unit_instance;
  }
  function Companion_4() {
    Companion_instance_7 = this;
    this.da4_1 = IntOffset(IntCompanionObject_instance.MAX_VALUE, IntCompanionObject_instance.MAX_VALUE);
  }
  var Companion_instance_7;
  function Companion_getInstance_28() {
    if (Companion_instance_7 == null)
      new Companion_4();
    return Companion_instance_7;
  }
  function LazyLayoutAnimation$layerBlock$lambda(this$0) {
    return function ($this$null) {
      $this$null.r3r(this$0.haa());
      return Unit_instance;
    };
  }
  function LazyLayoutAnimation$cancelPlacementAnimation$slambda(this$0, resultContinuation) {
    this.qaa_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(LazyLayoutAnimation$cancelPlacementAnimation$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(LazyLayoutAnimation$cancelPlacementAnimation$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(LazyLayoutAnimation$cancelPlacementAnimation$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.qaa_1.oa3_1.a7i(new IntOffset_0(Companion_getInstance_12().v36_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            _set_placementDelta__ka0zmk(this.qaa_1, Companion_getInstance_12().v36_1);
            _set_isPlacementAnimationInProgress__3yokhw(this.qaa_1, false);
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
  protoOf(LazyLayoutAnimation$cancelPlacementAnimation$slambda).x1e = function ($this$launch, completion) {
    var i = new LazyLayoutAnimation$cancelPlacementAnimation$slambda(this.qaa_1, completion);
    i.raa_1 = $this$launch;
    return i;
  };
  function LazyLayoutAnimation$cancelPlacementAnimation$slambda_0(this$0, resultContinuation) {
    var i = new LazyLayoutAnimation$cancelPlacementAnimation$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function LazyLayoutAnimation$animatePlacementDelta$slambda(this$0, $spec, $totalDelta, resultContinuation) {
    this.aab_1 = this$0;
    this.bab_1 = $spec;
    this.cab_1 = $totalDelta;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(LazyLayoutAnimation$animatePlacementDelta$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(LazyLayoutAnimation$animatePlacementDelta$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(LazyLayoutAnimation$animatePlacementDelta$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.bc_1 = 4;
            var tmp_0 = this;
            var tmp_1;
            if (this.aab_1.oa3_1.x7h()) {
              var tmp_2;
              var tmp_3 = this.bab_1;
              if (tmp_3 instanceof SpringSpec) {
                tmp_2 = this.bab_1;
              } else {
                tmp_2 = get_InterruptionSpec();
              }
              tmp_1 = tmp_2;
            } else {
              tmp_1 = this.bab_1;
            }

            tmp_0.eab_1 = tmp_1;
            if (!this.aab_1.oa3_1.x7h()) {
              this.ac_1 = 1;
              suspendResult = this.aab_1.oa3_1.a7i(new IntOffset_0(this.cab_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            var tmp_4 = this;
            var this_0 = this.aab_1.oa3_1.s2().t36_1;
            var other = this.cab_1;
            tmp_4.fab_1 = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_0) - _IntOffset___get_x__impl__qiqr5o(other) | 0, _IntOffset___get_y__impl__2avpwj(this_0) - _IntOffset___get_y__impl__2avpwj(other) | 0);
            this.ac_1 = 3;
            suspendResult = this.aab_1.oa3_1.z7h(new IntOffset_0(this.fab_1), this.eab_1, VOID, LazyLayoutAnimation$animatePlacementDelta$slambda$lambda(this.aab_1, this.fab_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            _set_isPlacementAnimationInProgress__3yokhw(this.aab_1, false);
            this.bc_1 = 5;
            this.ac_1 = 6;
            continue $sm;
          case 4:
            this.bc_1 = 5;
            var tmp_5 = this.dc_1;
            if (tmp_5 instanceof CancellationException) {
              var _ = this.dc_1;
              this.ac_1 = 6;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 5:
            throw this.dc_1;
          case 6:
            this.bc_1 = 5;
            return Unit_instance;
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
  protoOf(LazyLayoutAnimation$animatePlacementDelta$slambda).x1e = function ($this$launch, completion) {
    var i = new LazyLayoutAnimation$animatePlacementDelta$slambda(this.aab_1, this.bab_1, this.cab_1, completion);
    i.dab_1 = $this$launch;
    return i;
  };
  function LazyLayoutAnimation$animatePlacementDelta$slambda_0(this$0, $spec, $totalDelta, resultContinuation) {
    var i = new LazyLayoutAnimation$animatePlacementDelta$slambda(this$0, $spec, $totalDelta, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function LazyLayoutAnimation$stopAnimations$slambda(this$0, resultContinuation) {
    this.oab_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(LazyLayoutAnimation$stopAnimations$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(LazyLayoutAnimation$stopAnimations$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(LazyLayoutAnimation$stopAnimations$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.oab_1.oa3_1.b7i(this);
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
  protoOf(LazyLayoutAnimation$stopAnimations$slambda).x1e = function ($this$launch, completion) {
    var i = new LazyLayoutAnimation$stopAnimations$slambda(this.oab_1, completion);
    i.pab_1 = $this$launch;
    return i;
  };
  function LazyLayoutAnimation$stopAnimations$slambda_0(this$0, resultContinuation) {
    var i = new LazyLayoutAnimation$stopAnimations$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function LazyLayoutAnimation$stopAnimations$slambda_1(this$0, resultContinuation) {
    this.yab_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(LazyLayoutAnimation$stopAnimations$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(LazyLayoutAnimation$stopAnimations$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(LazyLayoutAnimation$stopAnimations$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.yab_1.pa3_1.b7i(this);
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
  protoOf(LazyLayoutAnimation$stopAnimations$slambda_1).x1e = function ($this$launch, completion) {
    var i = new LazyLayoutAnimation$stopAnimations$slambda_1(this.yab_1, completion);
    i.zab_1 = $this$launch;
    return i;
  };
  function LazyLayoutAnimation$stopAnimations$slambda_2(this$0, resultContinuation) {
    var i = new LazyLayoutAnimation$stopAnimations$slambda_1(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function LazyLayoutAnimation(coroutineScope) {
    Companion_getInstance_28();
    this.ia3_1 = coroutineScope;
    this.ja3_1 = null;
    this.ka3_1 = null;
    this.la3_1 = mutableStateOf(false);
    this.ma3_1 = mutableStateOf(false);
    this.na3_1 = Companion_getInstance_28().da4_1;
    this.oa3_1 = new Animatable(new IntOffset_0(Companion_getInstance_12().v36_1), get_VectorConverter_0(Companion_getInstance_12()));
    this.pa3_1 = new Animatable(1.0, get_VectorConverter(FloatCompanionObject_instance));
    this.qa3_1 = mutableStateOf(new IntOffset_0(Companion_getInstance_12().v36_1));
    this.ra3_1 = mutableFloatStateOf(1.0);
    var tmp = this;
    tmp.sa3_1 = LazyLayoutAnimation$layerBlock$lambda(this);
    this.ta3_1 = Companion_getInstance_28().da4_1;
  }
  protoOf(LazyLayoutAnimation).la4 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.la3_1;
    isPlacementAnimationInProgress$factory_0();
    return this_0.s2();
  };
  protoOf(LazyLayoutAnimation).aac = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.ma3_1;
    isAppearanceAnimationInProgress$factory_0();
    return this_0.s2();
  };
  protoOf(LazyLayoutAnimation).pa6 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.qa3_1;
    placementDelta$factory_0();
    return this_0.s2().t36_1;
  };
  protoOf(LazyLayoutAnimation).haa = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.ra3_1;
    visibility$factory_0();
    return this_0.e2d();
  };
  protoOf(LazyLayoutAnimation).qa6 = function () {
    if (this.la4()) {
      launch(this.ia3_1, VOID, VOID, LazyLayoutAnimation$cancelPlacementAnimation$slambda_0(this, null));
    }
  };
  protoOf(LazyLayoutAnimation).ca4 = function (delta) {
    var tmp0_elvis_lhs = this.ka3_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var spec = tmp;
    // Inline function 'androidx.compose.ui.unit.IntOffset.minus' call
    var this_0 = this.pa6();
    var totalDelta = IntOffset(_IntOffset___get_x__impl__qiqr5o(this_0) - _IntOffset___get_x__impl__qiqr5o(delta) | 0, _IntOffset___get_y__impl__2avpwj(this_0) - _IntOffset___get_y__impl__2avpwj(delta) | 0);
    _set_placementDelta__ka0zmk(this, totalDelta);
    _set_isPlacementAnimationInProgress__3yokhw(this, true);
    launch(this.ia3_1, VOID, VOID, LazyLayoutAnimation$animatePlacementDelta$slambda_0(this, spec, totalDelta, null));
  };
  protoOf(LazyLayoutAnimation).oa4 = function () {
    if (this.la4()) {
      _set_isPlacementAnimationInProgress__3yokhw(this, false);
      launch(this.ia3_1, VOID, VOID, LazyLayoutAnimation$stopAnimations$slambda_0(this, null));
    }
    if (this.aac()) {
      _set_isAppearanceAnimationInProgress__16qsn7(this, false);
      launch(this.ia3_1, VOID, VOID, LazyLayoutAnimation$stopAnimations$slambda_2(this, null));
    }
    _set_placementDelta__ka0zmk(this, Companion_getInstance_12().v36_1);
    this.na3_1 = Companion_getInstance_28().da4_1;
    _set_visibility__f9zqd7(this, 1.0);
  };
  function LazyLayoutAnimationSpecsNode() {
  }
  function DefaultLayerBlock$lambda($this$null) {
    _init_properties_LazyLayoutAnimation_kt__csewms();
    return Unit_instance;
  }
  function isPlacementAnimationInProgress$factory() {
    return getPropertyCallableRef('isPlacementAnimationInProgress', 1, KMutableProperty1, function (receiver) {
      return receiver.la4();
    }, function (receiver, value) {
      return _set_isPlacementAnimationInProgress__3yokhw(receiver, value);
    });
  }
  function isPlacementAnimationInProgress$factory_0() {
    return getPropertyCallableRef('isPlacementAnimationInProgress', 1, KMutableProperty1, function (receiver) {
      return receiver.la4();
    }, function (receiver, value) {
      return _set_isPlacementAnimationInProgress__3yokhw(receiver, value);
    });
  }
  function isAppearanceAnimationInProgress$factory() {
    return getPropertyCallableRef('isAppearanceAnimationInProgress', 1, KMutableProperty1, function (receiver) {
      return receiver.aac();
    }, function (receiver, value) {
      return _set_isAppearanceAnimationInProgress__16qsn7(receiver, value);
    });
  }
  function isAppearanceAnimationInProgress$factory_0() {
    return getPropertyCallableRef('isAppearanceAnimationInProgress', 1, KMutableProperty1, function (receiver) {
      return receiver.aac();
    }, function (receiver, value) {
      return _set_isAppearanceAnimationInProgress__16qsn7(receiver, value);
    });
  }
  function placementDelta$factory() {
    return getPropertyCallableRef('placementDelta', 1, KMutableProperty1, function (receiver) {
      return new IntOffset_0(receiver.pa6());
    }, function (receiver, value) {
      return _set_placementDelta__ka0zmk(receiver, value.t36_1);
    });
  }
  function placementDelta$factory_0() {
    return getPropertyCallableRef('placementDelta', 1, KMutableProperty1, function (receiver) {
      return new IntOffset_0(receiver.pa6());
    }, function (receiver, value) {
      return _set_placementDelta__ka0zmk(receiver, value.t36_1);
    });
  }
  function visibility$factory() {
    return getPropertyCallableRef('visibility', 1, KMutableProperty1, function (receiver) {
      return receiver.haa();
    }, function (receiver, value) {
      return _set_visibility__f9zqd7(receiver, value);
    });
  }
  function visibility$factory_0() {
    return getPropertyCallableRef('visibility', 1, KMutableProperty1, function (receiver) {
      return receiver.haa();
    }, function (receiver, value) {
      return _set_visibility__f9zqd7(receiver, value);
    });
  }
  var properties_initialized_LazyLayoutAnimation_kt_92a5g6;
  function _init_properties_LazyLayoutAnimation_kt__csewms() {
    if (!properties_initialized_LazyLayoutAnimation_kt_92a5g6) {
      properties_initialized_LazyLayoutAnimation_kt_92a5g6 = true;
      InterruptionSpec = spring(VOID, 400.0, new IntOffset_0(get_VisibilityThreshold(Companion_getInstance_12())));
      DefaultLayerBlock = DefaultLayerBlock$lambda;
    }
  }
  function Interval_0(start, end) {
    this.bac_1 = start;
    this.cac_1 = end;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.bac_1 >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.Interval.<anonymous>' call
      var message = 'negative start index';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.cac_1 >= this.bac_1)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.Interval.<anonymous>' call
      var message_0 = 'end index greater than start';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  protoOf(Interval_0).toString = function () {
    return 'Interval(start=' + this.bac_1 + ', end=' + this.cac_1 + ')';
  };
  protoOf(Interval_0).hashCode = function () {
    var result = this.bac_1;
    result = imul(result, 31) + this.cac_1 | 0;
    return result;
  };
  protoOf(Interval_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Interval_0))
      return false;
    var tmp0_other_with_cast = other instanceof Interval_0 ? other : THROW_CCE();
    if (!(this.bac_1 === tmp0_other_with_cast.bac_1))
      return false;
    if (!(this.cac_1 === tmp0_other_with_cast.cac_1))
      return false;
    return true;
  };
  function LazyLayoutBeyondBoundsInfo() {
    var tmp = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp.dac_1 = new MutableVector(tmp$ret$0, 0);
  }
  protoOf(LazyLayoutBeyondBoundsInfo).eac = function (start, end) {
    // Inline function 'kotlin.apply' call
    var this_0 = new Interval_0(start, end);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutBeyondBoundsInfo.addInterval.<anonymous>' call
    this.dac_1.u1v(this_0);
    return this_0;
  };
  protoOf(LazyLayoutBeyondBoundsInfo).fac = function (interval) {
    this.dac_1.m2l(interval);
  };
  protoOf(LazyLayoutBeyondBoundsInfo).gac = function () {
    return this.dac_1.nm();
  };
  protoOf(LazyLayoutBeyondBoundsInfo).dg = function () {
    var minIndex = this.dac_1.qd().bac_1;
    // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
    var this_0 = this.dac_1;
    // Inline function 'kotlin.contracts.contract' call
    var size = this_0.t1v_1;
    if (size > 0) {
      var i = 0;
      var tmp = this_0.r1v_1;
      var content = isArray(tmp) ? tmp : THROW_CCE();
      do {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutBeyondBoundsInfo.<get-start>.<anonymous>' call
        var it = content[i];
        if (it.bac_1 < minIndex) {
          minIndex = it.bac_1;
        }
        i = i + 1 | 0;
      }
       while (i < size);
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(minIndex >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutBeyondBoundsInfo.<get-start>.<anonymous>' call
      var message = 'negative minIndex';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return minIndex;
  };
  protoOf(LazyLayoutBeyondBoundsInfo).h52 = function () {
    var maxIndex = this.dac_1.qd().cac_1;
    // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
    var this_0 = this.dac_1;
    // Inline function 'kotlin.contracts.contract' call
    var size = this_0.t1v_1;
    if (size > 0) {
      var i = 0;
      var tmp = this_0.r1v_1;
      var content = isArray(tmp) ? tmp : THROW_CCE();
      do {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutBeyondBoundsInfo.<get-end>.<anonymous>' call
        var it = content[i];
        if (it.cac_1 > maxIndex) {
          maxIndex = it.cac_1;
        }
        i = i + 1 | 0;
      }
       while (i < size);
    }
    return maxIndex;
  };
  function lazyLayoutBeyondBoundsModifier(_this__u8e3s4, state, beyondBoundsInfo, reverseLayout, layoutDirection, orientation, enabled, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1331498025);
    sourceInformation($composer_0, 'C(lazyLayoutBeyondBoundsModifier)P(5!1,4,2,3)54@2427L270:LazyLayoutBeyondBoundsModifierLocal.kt#wow0x6');
    if (isTraceInProgress()) {
      traceEventStart(1331498025, $changed, -1, 'androidx.compose.foundation.lazy.layout.lazyLayoutBeyondBoundsModifier (LazyLayoutBeyondBoundsModifierLocal.kt:51)');
    }
    var tmp;
    if (!enabled) {
      tmp = _this__u8e3s4;
    } else {
      $composer_0.j1l(-753724309);
      sourceInformation($composer_0, 'CC(remember):LazyLayoutBeyondBoundsModifierLocal.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!(!!(!!(!!(((($changed & 112 ^ 48) > 32 ? $composer_0.v1o(state) : false) ? true : ($changed & 48) === 32) | ((($changed & 896 ^ 384) > 256 ? $composer_0.v1o(beyondBoundsInfo) : false) ? true : ($changed & 384) === 256)) | ((($changed & 7168 ^ 3072) > 2048 ? $composer_0.k1y(reverseLayout) : false) ? true : ($changed & 3072) === 2048)) | ((($changed & 57344 ^ 24576) > 16384 ? $composer_0.v1o(layoutDirection) : false) ? true : ($changed & 24576) === 16384)) | ((($changed & 458752 ^ 196608) > 131072 ? $composer_0.v1o(orientation) : false) ? true : ($changed & 196608) === 131072));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.lazyLayoutBeyondBoundsModifier.<anonymous>' call
        var value = new LazyLayoutBeyondBoundsModifierLocal(state, beyondBoundsInfo, reverseLayout, layoutDirection, orientation);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      tmp = _this__u8e3s4.q4t(tmp1_group);
    }
    var tmp0 = tmp;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function LazyLayoutBeyondBoundsModifierLocal$Companion$emptyBeyondBoundsScope$1() {
    this.hac_1 = false;
  }
  protoOf(LazyLayoutBeyondBoundsModifierLocal$Companion$emptyBeyondBoundsScope$1).o54 = function () {
    return this.hac_1;
  };
  function Companion_5() {
    Companion_instance_8 = this;
    var tmp = this;
    tmp.iac_1 = new LazyLayoutBeyondBoundsModifierLocal$Companion$emptyBeyondBoundsScope$1();
  }
  var Companion_instance_8;
  function Companion_getInstance_29() {
    if (Companion_instance_8 == null)
      new Companion_5();
    return Companion_instance_8;
  }
  function isForward(_this__u8e3s4, $this) {
    var tmp;
    if (_this__u8e3s4 === Companion_getInstance_13().n4z_1) {
      tmp = false;
    } else if (_this__u8e3s4 === Companion_getInstance_13().o4z_1) {
      tmp = true;
    } else if (_this__u8e3s4 === Companion_getInstance_13().r4z_1) {
      tmp = $this.lac_1;
    } else if (_this__u8e3s4 === Companion_getInstance_13().s4z_1) {
      tmp = !$this.lac_1;
    } else if (_this__u8e3s4 === Companion_getInstance_13().p4z_1) {
      var tmp_0;
      switch ($this.mac_1.t9_1) {
        case 0:
          tmp_0 = $this.lac_1;
          break;
        case 1:
          tmp_0 = !$this.lac_1;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    } else if (_this__u8e3s4 === Companion_getInstance_13().q4z_1) {
      var tmp_1;
      switch ($this.mac_1.t9_1) {
        case 0:
          tmp_1 = !$this.lac_1;
          break;
        case 1:
          tmp_1 = $this.lac_1;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_1;
    } else {
      unsupportedDirection();
    }
    return tmp;
  }
  function addNextInterval($this, currentInterval, direction) {
    var start = currentInterval.bac_1;
    var end = currentInterval.cac_1;
    if (isForward(direction, $this)) {
      end = end + 1 | 0;
    } else {
      start = start - 1 | 0;
    }
    return $this.kac_1.eac(start, end);
  }
  function hasMoreContent(_this__u8e3s4, $this, direction) {
    if (isOppositeToOrientation(direction, $this))
      return false;
    return isForward(direction, $this) ? _this__u8e3s4.cac_1 < ($this.jac_1.ta0() - 1 | 0) : _this__u8e3s4.bac_1 > 0;
  }
  function isOppositeToOrientation(_this__u8e3s4, $this) {
    var tmp;
    if (_this__u8e3s4 === Companion_getInstance_13().r4z_1 ? true : _this__u8e3s4 === Companion_getInstance_13().s4z_1) {
      tmp = $this.nac_1.equals(Orientation_Horizontal_getInstance());
    } else if (_this__u8e3s4 === Companion_getInstance_13().p4z_1 ? true : _this__u8e3s4 === Companion_getInstance_13().q4z_1) {
      tmp = $this.nac_1.equals(Orientation_Vertical_getInstance());
    } else if (_this__u8e3s4 === Companion_getInstance_13().n4z_1 ? true : _this__u8e3s4 === Companion_getInstance_13().o4z_1) {
      tmp = false;
    } else {
      unsupportedDirection();
    }
    return tmp;
  }
  function LazyLayoutBeyondBoundsModifierLocal$layout$2(this$0, $interval, $direction) {
    this.oac_1 = this$0;
    this.pac_1 = $interval;
    this.qac_1 = $direction;
  }
  protoOf(LazyLayoutBeyondBoundsModifierLocal$layout$2).o54 = function () {
    return hasMoreContent(this.pac_1._v, this.oac_1, this.qac_1);
  };
  function LazyLayoutBeyondBoundsModifierLocal(state, beyondBoundsInfo, reverseLayout, layoutDirection, orientation) {
    Companion_getInstance_29();
    this.jac_1 = state;
    this.kac_1 = beyondBoundsInfo;
    this.lac_1 = reverseLayout;
    this.mac_1 = layoutDirection;
    this.nac_1 = orientation;
  }
  protoOf(LazyLayoutBeyondBoundsModifierLocal).r2 = function () {
    return get_ModifierLocalBeyondBoundsLayout();
  };
  protoOf(LazyLayoutBeyondBoundsModifierLocal).s2 = function () {
    return this;
  };
  protoOf(LazyLayoutBeyondBoundsModifierLocal).b50 = function (direction, block) {
    if (this.jac_1.ta0() <= 0 ? true : !this.jac_1.fa1()) {
      return block(Companion_getInstance_29().iac_1);
    }
    var tmp;
    if (isForward(direction, this)) {
      tmp = this.jac_1.ia1();
    } else {
      tmp = this.jac_1.ha1();
    }
    var startIndex = tmp;
    var interval = {_v: this.kac_1.eac(startIndex, startIndex)};
    var found = null;
    while (found == null ? hasMoreContent(interval._v, this, direction) : false) {
      // Inline function 'kotlin.also' call
      var this_0 = addNextInterval(this, interval._v, direction);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutBeyondBoundsModifierLocal.layout.<anonymous>' call
      this.kac_1.fac(interval._v);
      interval._v = this_0;
      this.jac_1.ca1();
      found = block(new LazyLayoutBeyondBoundsModifierLocal$layout$2(this, interval, direction));
    }
    this.kac_1.fac(interval._v);
    this.jac_1.ca1();
    return found;
  };
  function unsupportedDirection() {
    var message = 'Lazy list does not support beyond bounds layout for the specified direction';
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function calculateLazyLayoutPinnedIndices(_this__u8e3s4, pinnedItemList, beyondBoundsInfo) {
    if (!beyondBoundsInfo.gac() ? pinnedItemList.u() : false) {
      return emptyList();
    } else {
      // Inline function 'kotlin.collections.mutableListOf' call
      var pinnedItems = ArrayList_init_$Create$();
      var tmp;
      if (beyondBoundsInfo.gac()) {
        var tmp_0 = beyondBoundsInfo.dg();
        // Inline function 'kotlin.math.min' call
        var a = beyondBoundsInfo.h52();
        var b = _this__u8e3s4.ta0() - 1 | 0;
        var tmp$ret$1 = Math.min(a, b);
        tmp = numberRangeToNumber(tmp_0, tmp$ret$1);
      } else {
        tmp = Companion_getInstance_14().y9_1;
      }
      var beyondBoundsRange = tmp;
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = pinnedItemList.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = pinnedItemList.n(index);
          $l$block_0: {
            // Inline function 'androidx.compose.foundation.lazy.layout.calculateLazyLayoutPinnedIndices.<anonymous>' call
            var index_0 = findIndexByKey(_this__u8e3s4, item.r2(), item.ja1());
            var containsLower = beyondBoundsRange.aa_1;
            if (index_0 <= beyondBoundsRange.ba_1 ? containsLower <= index_0 : false) {
              break $l$block_0;
            }
            if (!(0 <= index_0 ? index_0 < _this__u8e3s4.ta0() : false)) {
              break $l$block_0;
            }
            pinnedItems.a1(index_0);
          }
        }
         while (inductionVariable <= last);
      var inductionVariable_0 = beyondBoundsRange.aa_1;
      var last_0 = beyondBoundsRange.ba_1;
      if (inductionVariable_0 <= last_0)
        do {
          var i = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          pinnedItems.a1(i);
        }
         while (!(i === last_0));
      return pinnedItems;
    }
  }
  function LazyLayoutIntervalContent$Interval$_get_type_$lambda_1wu10p(it) {
    return null;
  }
  function Interval_1() {
  }
  function LazyLayoutIntervalContent() {
  }
  protoOf(LazyLayoutIntervalContent).ta0 = function () {
    return this.ua1().m();
  };
  protoOf(LazyLayoutIntervalContent).aa2 = function (index) {
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutIntervalContent.withInterval' call
    var interval = this.ua1().n(index);
    var localIntervalIndex = index - interval.ha5_1 | 0;
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutIntervalContent.getKey.<anonymous>' call
    var tmp0_safe_receiver = interval.ja5_1.r2();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver(localIntervalIndex);
    return tmp1_elvis_lhs == null ? getDefaultLazyLayoutKey(index) : tmp1_elvis_lhs;
  };
  protoOf(LazyLayoutIntervalContent).ba2 = function (index) {
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutIntervalContent.withInterval' call
    var interval = this.ua1().n(index);
    var localIntervalIndex = index - interval.ha5_1 | 0;
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutIntervalContent.getContentType.<anonymous>' call
    return interval.ja5_1.ga2()(localIntervalIndex);
  };
  function createContentLambda($this) {
    return ComposableLambda$invoke$ref_1(composableLambdaInstance(1403994769, true, LazyLayoutItemContentFactory$CachedItemContent$createContentLambda$lambda($this.wac_1, $this)));
  }
  function ComposableLambda$invoke$ref_1($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function _no_name_provided__qut3iv_0(this$0) {
    this.xac_1 = this$0;
  }
  protoOf(_no_name_provided__qut3iv_0).or = function () {
    // Inline function 'androidx.compose.foundation.lazy.layout.CachedItemContent.createContentLambda.<anonymous>.<anonymous>.<anonymous>' call
    this.xac_1.vac_1 = null;
  };
  function LazyLayoutItemContentFactory$CachedItemContent$createContentLambda$lambda$lambda(this$0) {
    return function ($this$DisposableEffect) {
      // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
      return new _no_name_provided__qut3iv_0(this$0);
    };
  }
  function LazyLayoutItemContentFactory$CachedItemContent$createContentLambda$lambda(this$0, this$1) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C100@3718L258,108@3989L219:LazyLayoutItemContentFactory.kt#wow0x6');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
        if (isTraceInProgress()) {
          traceEventStart(1403994769, $changed, -1, 'androidx.compose.foundation.lazy.layout.LazyLayoutItemContentFactory.CachedItemContent.createContentLambda.<anonymous> (LazyLayoutItemContentFactory.kt:92)');
        }
        var itemProvider = this$0.eaa_1();
        var index = {_v: this$1.uac_1};
        if (index._v >= itemProvider.ta0() ? true : !equals(itemProvider.aa2(index._v), this$1.sac_1)) {
          index._v = itemProvider.ha4(this$1.sac_1);
          if (!(index._v === -1))
            this$1.uac_1 = index._v;
        }
        // Inline function 'androidx.compose.runtime.ReusableContentHost' call
        var active = !(index._v === -1);
        var $composer_1 = $composer_0;
        $composer_1.a1y(get_reuseKey(), active);
        var activeChanged = $composer_1.k1y(active);
        if (active) {
          // Inline function 'androidx.compose.foundation.lazy.layout.CachedItemContent.createContentLambda.<anonymous>.<anonymous>' call
          var $composer_2 = $composer_1;
          $composer_2.j1l(-2120139493);
          sourceInformation($composer_2, 'C101@3778L184:LazyLayoutItemContentFactory.kt#wow0x6');
          SkippableItem(itemProvider, _StableValue___init__impl__8rwrjx(this$0.daa_1), index._v, _StableValue___init__impl__8rwrjx(this$1.sac_1), $composer_2, 0);
          $composer_2.l1l();
        } else {
          $composer_1.j20(activeChanged);
        }
        $composer_1.b1y();
        DisposableEffect(this$1.sac_1, LazyLayoutItemContentFactory$CachedItemContent$createContentLambda$lambda$lambda(this$1), $composer_0, 8);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else {
        $composer_0.q1r();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function CachedItemContent($outer, index, key, contentType) {
    this.wac_1 = $outer;
    this.sac_1 = key;
    this.tac_1 = contentType;
    this.uac_1 = index;
    this.vac_1 = null;
  }
  protoOf(CachedItemContent).yac = function () {
    var tmp0_elvis_lhs = this.vac_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = createContentLambda(this);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.CachedItemContent.<get-content>.<anonymous>' call
      this.vac_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  function LazyLayoutItemContentFactory(saveableStateHolder, itemProvider) {
    this.daa_1 = saveableStateHolder;
    this.eaa_1 = itemProvider;
    var tmp = this;
    // Inline function 'kotlin.collections.mutableMapOf' call
    tmp.faa_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(LazyLayoutItemContentFactory).gaa = function (key) {
    if (key == null)
      return null;
    var cachedContent = this.faa_1.z2(key);
    var tmp;
    if (!(cachedContent == null)) {
      tmp = cachedContent.tac_1;
    } else {
      var itemProvider = this.eaa_1();
      var index = itemProvider.ha4(key);
      var tmp_0;
      if (!(index === -1)) {
        tmp_0 = itemProvider.ba2(index);
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LazyLayoutItemContentFactory).zac = function (index, key, contentType) {
    var cached = this.faa_1.z2(key);
    var tmp;
    if ((!(cached == null) ? cached.uac_1 === index : false) ? equals(cached.tac_1, contentType) : false) {
      tmp = cached.yac();
    } else {
      var newContent = new CachedItemContent(this, index, key, contentType);
      // Inline function 'kotlin.collections.set' call
      this.faa_1.p2(key, newContent);
      tmp = newContent.yac();
    }
    return tmp;
  };
  function SkippableItem(itemProvider, saveableStateHolder, index, key, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(1439843069);
    sourceInformation($composer_0, 'C(SkippableItem)P(1,3:c#foundation.lazy.layout.StableValue!,2:c#foundation.lazy.layout.StableValue)134@4736L84:LazyLayoutItemContentFactory.kt#wow0x6');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(itemProvider) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.v1o(_StableValue___get_value__impl__cutoif(saveableStateHolder)) ? 32 : 16);
    if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.n1y(index) ? 256 : 128);
    if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.v1o(_StableValue___get_value__impl__cutoif(key)) ? 2048 : 1024);
    if (!(($dirty & 5851) === 1170) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(1439843069, $dirty, -1, 'androidx.compose.foundation.lazy.layout.SkippableItem (LazyLayoutItemContentFactory.kt:133)');
      }
      var tmp = _StableValue___get_value__impl__cutoif(saveableStateHolder);
      var tmp_0 = _StableValue___get_value__impl__cutoif(key);
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.SkippableItem.<anonymous>' call
      var tmp_1 = $composer_0;
      var dispatchReceiver = composableLambda(tmp_1, 980966366, true, SkippableItem$lambda(itemProvider, index, key));
      // Inline function 'androidx.compose.runtime.remember' call
      var $composer_1 = $composer_0;
      $composer_1.j1l(1157296644);
      sourceInformation($composer_1, 'CC(remember)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_1.v1o(dispatchReceiver);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_1.x1y();
      var tmp_2;
      if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.SkippableItem.<anonymous>.<anonymous>' call
        var value = ComposableLambda$invoke$ref_2(dispatchReceiver);
        $composer_1.d1z(value);
        tmp_2 = value;
      } else {
        tmp_2 = it;
      }
      var tmp_3 = tmp_2;
      var tmp0 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      $composer_1.l1l();
      tmp.d33(tmp_0, tmp0, $composer_0, 568);
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
      tmp0_safe_receiver.j24(SkippableItem$lambda_0(itemProvider, saveableStateHolder, index, key, $changed));
    }
  }
  function _StableValue___init__impl__8rwrjx(value) {
    return value;
  }
  function _StableValue___get_value__impl__cutoif($this) {
    return $this;
  }
  function SkippableItem$lambda($itemProvider, $index, $key) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C135@4792L22:LazyLayoutItemContentFactory.kt#wow0x6');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
        if (isTraceInProgress()) {
          traceEventStart(980966366, $changed, -1, 'androidx.compose.foundation.lazy.layout.SkippableItem.<anonymous> (LazyLayoutItemContentFactory.kt:135)');
        }
        $itemProvider.ka5($index, _StableValue___get_value__impl__cutoif($key), $composer_0, 64);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else {
        $composer_0.q1r();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ComposableLambda$invoke$ref_2($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function SkippableItem$lambda_0($itemProvider, $saveableStateHolder, $index, $key, $$changed) {
    return function ($composer, $force) {
      SkippableItem($itemProvider, $saveableStateHolder, $index, $key, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function LazyLayoutItemProvider() {
  }
  function findIndexByKey(_this__u8e3s4, key, lastKnownIndex) {
    if (key == null ? true : _this__u8e3s4.ta0() === 0) {
      return lastKnownIndex;
    }
    if (lastKnownIndex < _this__u8e3s4.ta0() ? equals(key, _this__u8e3s4.aa2(lastKnownIndex)) : false) {
      return lastKnownIndex;
    }
    var newIndex = _this__u8e3s4.ha4(key);
    if (!(newIndex === -1)) {
      return newIndex;
    }
    return lastKnownIndex;
  }
  function Empty() {
  }
  protoOf(Empty).ha4 = function (key) {
    return -1;
  };
  protoOf(Empty).aa2 = function (index) {
    return null;
  };
  var Empty_instance;
  function Empty_getInstance() {
    return Empty_instance;
  }
  function NearestRangeKeyIndexMap$lambda($first, $last, $map, this$0) {
    return function (it) {
      var keyFactory = it.ja5_1.r2();
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = $first;
      var b = it.ha5_1;
      var start = Math.max(a, b);
      // Inline function 'kotlin.comparisons.minOf' call
      var a_0 = $last;
      var b_0 = (it.ha5_1 + it.ia5_1 | 0) - 1 | 0;
      var end = Math.min(a_0, b_0);
      var inductionVariable = start;
      var tmp;
      if (inductionVariable <= end) {
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var tmp2_elvis_lhs = keyFactory == null ? null : keyFactory(i - it.ha5_1 | 0);
          var key = tmp2_elvis_lhs == null ? getDefaultLazyLayoutKey(i) : tmp2_elvis_lhs;
          $map.km(key, i);
          this$0.bad_1[i - this$0.cad_1 | 0] = key;
        }
         while (!(i === end));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function NearestRangeKeyIndexMap(nearestRange, intervalContent) {
    var list = intervalContent.ua1();
    var first = nearestRange.aa_1;
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(first >= 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.NearestRangeKeyIndexMap.<anonymous>' call
      var message = 'negative nearestRange.first';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.comparisons.minOf' call
    var a = nearestRange.ba_1;
    var b = list.m() - 1 | 0;
    var last = Math.min(a, b);
    if (last < first) {
      this.aad_1 = emptyObjectIntMap();
      var tmp = this;
      // Inline function 'kotlin.emptyArray' call
      tmp.bad_1 = [];
      this.cad_1 = 0;
    } else {
      var size = (last - first | 0) + 1 | 0;
      var tmp_0 = this;
      // Inline function 'kotlin.arrayOfNulls' call
      tmp_0.bad_1 = fillArrayVal(Array(size), null);
      this.cad_1 = first;
      var tmp_1 = this;
      // Inline function 'kotlin.also' call
      var this_0 = new MutableObjectIntMap(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.NearestRangeKeyIndexMap.<anonymous>' call
      list.aaa(first, last, NearestRangeKeyIndexMap$lambda(first, last, this_0, this));
      tmp_1.aad_1 = this_0;
    }
  }
  protoOf(NearestRangeKeyIndexMap).ha4 = function (key) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'androidx.collection.ObjectIntMap.getOrElse' call
      var this_0 = this.aad_1;
      var index = this_0.pm(key);
      if (index >= 0) {
        tmp$ret$0 = this_0.bm_1[index];
        break $l$block;
      }
      // Inline function 'androidx.compose.foundation.lazy.layout.NearestRangeKeyIndexMap.getIndex.<anonymous>' call
      tmp$ret$0 = -1;
    }
    return tmp$ret$0;
  };
  protoOf(NearestRangeKeyIndexMap).aa2 = function (index) {
    // Inline function 'kotlin.collections.getOrElse' call
    var this_0 = this.bad_1;
    var index_0 = index - this.cad_1 | 0;
    var tmp;
    if (index_0 >= 0 ? index_0 <= get_lastIndex_0(this_0) : false) {
      tmp = this_0[index_0];
    } else {
      // Inline function 'androidx.compose.foundation.lazy.layout.NearestRangeKeyIndexMap.getKey.<anonymous>' call
      tmp = null;
    }
    return tmp;
  };
  function LazyLayoutMeasureScopeImpl(itemContentFactory, subcomposeMeasureScope) {
    this.dad_1 = itemContentFactory;
    this.ead_1 = subcomposeMeasureScope;
    this.fad_1 = this.dad_1.eaa_1();
    var tmp = this;
    // Inline function 'kotlin.collections.hashMapOf' call
    tmp.gad_1 = HashMap_init_$Create$();
  }
  protoOf(LazyLayoutMeasureScopeImpl).x35 = function () {
    return this.ead_1.x35();
  };
  protoOf(LazyLayoutMeasureScopeImpl).i36 = function () {
    return this.ead_1.i36();
  };
  protoOf(LazyLayoutMeasureScopeImpl).o5p = function () {
    return this.ead_1.o5p();
  };
  protoOf(LazyLayoutMeasureScopeImpl).a43 = function () {
    return this.ead_1.a43();
  };
  protoOf(LazyLayoutMeasureScopeImpl).v5r = function (width, height, alignmentLines, placementBlock) {
    return this.ead_1.v5r(width, height, alignmentLines, placementBlock);
  };
  protoOf(LazyLayoutMeasureScopeImpl).z35 = function (_this__u8e3s4) {
    return this.ead_1.z35(_this__u8e3s4);
  };
  protoOf(LazyLayoutMeasureScopeImpl).y35 = function (_this__u8e3s4) {
    return this.ead_1.y35(_this__u8e3s4);
  };
  protoOf(LazyLayoutMeasureScopeImpl).a36 = function (_this__u8e3s4) {
    return this.ead_1.a36(_this__u8e3s4);
  };
  protoOf(LazyLayoutMeasureScopeImpl).ra6 = function (index, constraints) {
    var cachedPlaceable = this.gad_1.z2(index);
    var tmp;
    if (!(cachedPlaceable == null)) {
      tmp = cachedPlaceable;
    } else {
      var key = this.fad_1.aa2(index);
      var contentType = this.fad_1.ba2(index);
      var itemContent = this.dad_1.zac(index, key, contentType);
      var measurables = this.ead_1.c5x(key, itemContent);
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var size = measurables.m();
      var list = ArrayList_init_$Create$_0(size);
      // Inline function 'kotlin.repeat' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      if (inductionVariable < size)
        do {
          var index_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlin.collections.MutableList.<anonymous>' call
          // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutMeasureScopeImpl.measure.<anonymous>' call
          var tmp$ret$0 = measurables.n(index_0).m57(constraints);
          list.a1(tmp$ret$0);
        }
         while (inductionVariable < size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutMeasureScopeImpl.measure.<anonymous>' call
      // Inline function 'kotlin.collections.set' call
      this.gad_1.p2(index, list);
      tmp = list;
    }
    return tmp;
  };
  protoOf(LazyLayoutMeasureScopeImpl).e36 = function (_this__u8e3s4) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutMeasureScopeImpl.toDp.<anonymous>' call
    return this.ead_1.e36(_this__u8e3s4);
  };
  protoOf(LazyLayoutMeasureScopeImpl).f36 = function (_this__u8e3s4) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutMeasureScopeImpl.toSize.<anonymous>' call
    return this.ead_1.f36(_this__u8e3s4);
  };
  function calculateNearestItemsRange($this, firstVisibleItem, slidingWindowSize, extraItemCount) {
    var slidingWindowStart = imul(slidingWindowSize, firstVisibleItem / slidingWindowSize | 0);
    // Inline function 'kotlin.comparisons.maxOf' call
    var a = slidingWindowStart - extraItemCount | 0;
    var start = Math.max(a, 0);
    var end = (slidingWindowStart + slidingWindowSize | 0) + extraItemCount | 0;
    return until(start, end);
  }
  function _set_value__lx0xdg($this, _set____db54di) {
    var this_0 = $this.aa7_1;
    value$factory_0();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function Companion_6() {
  }
  var Companion_instance_9;
  function Companion_getInstance_30() {
    return Companion_instance_9;
  }
  function LazyLayoutNearestRangeState(firstVisibleItem, slidingWindowSize, extraItemCount) {
    this.ya6_1 = slidingWindowSize;
    this.za6_1 = extraItemCount;
    this.aa7_1 = mutableStateOf(calculateNearestItemsRange(Companion_instance_9, firstVisibleItem, this.ya6_1, this.za6_1), structuralEqualityPolicy());
    this.ba7_1 = firstVisibleItem;
  }
  protoOf(LazyLayoutNearestRangeState).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.aa7_1;
    value$factory_1();
    return this_0.s2();
  };
  protoOf(LazyLayoutNearestRangeState).ca7 = function (firstVisibleItem) {
    if (!(firstVisibleItem === this.ba7_1)) {
      this.ba7_1 = firstVisibleItem;
      _set_value__lx0xdg(this, calculateNearestItemsRange(Companion_instance_9, firstVisibleItem, this.ya6_1, this.za6_1));
    }
  };
  function value$factory_0() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return _set_value__lx0xdg(receiver, value);
    });
  }
  function value$factory_1() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return _set_value__lx0xdg(receiver, value);
    });
  }
  function LazyLayoutPinnedItemList_init_$Init$($this) {
    LazyLayoutPinnedItemList.call($this, new SnapshotStateList());
    return $this;
  }
  function LazyLayoutPinnedItemList_init_$Create$() {
    return LazyLayoutPinnedItemList_init_$Init$(objectCreate(protoOf(LazyLayoutPinnedItemList)));
  }
  function PinnedItem() {
  }
  function LazyLayoutPinnedItemList(items) {
    this.rac_1 = items;
  }
  protoOf(LazyLayoutPinnedItemList).m = function () {
    return this.rac_1.m();
  };
  protoOf(LazyLayoutPinnedItemList).had = function (element) {
    return this.rac_1.s(element);
  };
  protoOf(LazyLayoutPinnedItemList).s = function (element) {
    if (!(!(element == null) ? isInterface(element, PinnedItem) : false))
      return false;
    return this.had((!(element == null) ? isInterface(element, PinnedItem) : false) ? element : THROW_CCE());
  };
  protoOf(LazyLayoutPinnedItemList).iad = function (elements) {
    return this.rac_1.t(elements);
  };
  protoOf(LazyLayoutPinnedItemList).t = function (elements) {
    return this.iad(elements);
  };
  protoOf(LazyLayoutPinnedItemList).n = function (index) {
    return this.rac_1.n(index);
  };
  protoOf(LazyLayoutPinnedItemList).jad = function (element) {
    return this.rac_1.p(element);
  };
  protoOf(LazyLayoutPinnedItemList).p = function (element) {
    if (!(!(element == null) ? isInterface(element, PinnedItem) : false))
      return -1;
    return this.jad((!(element == null) ? isInterface(element, PinnedItem) : false) ? element : THROW_CCE());
  };
  protoOf(LazyLayoutPinnedItemList).u = function () {
    return this.rac_1.u();
  };
  protoOf(LazyLayoutPinnedItemList).o = function () {
    return this.rac_1.o();
  };
  protoOf(LazyLayoutPinnedItemList).q = function (index) {
    return this.rac_1.q(index);
  };
  protoOf(LazyLayoutPinnedItemList).r = function (fromIndex, toIndex) {
    return this.rac_1.r(fromIndex, toIndex);
  };
  protoOf(LazyLayoutPinnedItemList).kad = function (item) {
    this.rac_1.a1(item);
  };
  protoOf(LazyLayoutPinnedItemList).lad = function (item) {
    this.rac_1.b1(item);
  };
  function LazyLayoutPinnableItem(key, index, pinnedItemList, content, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-2079116560);
    sourceInformation($composer_0, 'C(LazyLayoutPinnableItem)P(2,1,3)53@2119L77,55@2294L7,56@2337L43,56@2306L74,57@2385L103:LazyLayoutPinnableItem.kt#wow0x6');
    var $dirty = $changed;
    if (isTraceInProgress()) {
      traceEventStart(-2079116560, $dirty, -1, 'androidx.compose.foundation.lazy.layout.LazyLayoutPinnableItem (LazyLayoutPinnableItem.kt:52)');
    }
    $composer_0.j1l(-752868363);
    sourceInformation($composer_0, 'CC(remember):LazyLayoutPinnableItem.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var this_0 = $composer_0;
    var invalid = !!($composer_0.v1o(key) | $composer_0.v1o(pinnedItemList));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = this_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutPinnableItem.<anonymous>' call
      var value = new LazyLayoutPinnableItem_0(key, pinnedItemList);
      this_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var pinnableItem = tmp0_group;
    pinnableItem.sad(index);
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_1 = get_LocalPinnableContainer();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_1);
    sourceInformationMarkerEnd($composer_1);
    pinnableItem.tad(tmp0);
    $composer_0.j1l(-752861421);
    sourceInformation($composer_0, 'CC(remember):LazyLayoutPinnableItem.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var this_2 = $composer_0;
    var invalid_0 = $composer_0.v1o(pinnableItem);
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = this_2.x1y();
    var tmp_1;
    if (invalid_0 ? true : it_0 === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutPinnableItem.<anonymous>' call
      var value_0 = LazyLayoutPinnableItem$lambda(pinnableItem);
      this_2.d1z(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp1_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_0.l1l();
    DisposableEffect(pinnableItem, tmp1_group, $composer_0, 0);
    CompositionLocalProvider(get_LocalPinnableContainer().g24(pinnableItem), content, $composer_0, 0 | 112 & $dirty >> 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    var tmp2_safe_receiver = $composer_0.m20();
    if (tmp2_safe_receiver == null)
      null;
    else {
      tmp2_safe_receiver.j24(LazyLayoutPinnableItem$lambda_0(key, index, pinnedItemList, content, $changed));
    }
  }
  function _set_pinsCount__b8qi4s($this, _set____db54di) {
    var this_0 = $this.pad_1;
    pinsCount$factory();
    this_0.h2e(_set____db54di);
    return Unit_instance;
  }
  function _get_pinsCount__i23y9s($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.pad_1;
    pinsCount$factory_0();
    return this_0.i2e();
  }
  function _set_parentHandle__bde57($this, _set____db54di) {
    var this_0 = $this.qad_1;
    parentHandle$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_parentHandle__f8dcex($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.qad_1;
    parentHandle$factory_0();
    return this_0.s2();
  }
  function _set__parentPinnableContainer__wpbnbm($this, _set____db54di) {
    var this_0 = $this.rad_1;
    _parentPinnableContainer$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get__parentPinnableContainer__xtf70a($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.rad_1;
    _parentPinnableContainer$factory_0();
    return this_0.s2();
  }
  function LazyLayoutPinnableItem_0(key, pinnedItemList) {
    this.mad_1 = key;
    this.nad_1 = pinnedItemList;
    this.oad_1 = mutableIntStateOf(-1);
    this.pad_1 = mutableIntStateOf(0);
    this.qad_1 = mutableStateOf(null);
    this.rad_1 = mutableStateOf(null);
  }
  protoOf(LazyLayoutPinnableItem_0).r2 = function () {
    return this.mad_1;
  };
  protoOf(LazyLayoutPinnableItem_0).sad = function (_set____db54di) {
    var this_0 = this.oad_1;
    index$factory_1();
    this_0.h2e(_set____db54di);
    return Unit_instance;
  };
  protoOf(LazyLayoutPinnableItem_0).ja1 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.oad_1;
    index$factory_2();
    return this_0.i2e();
  };
  protoOf(LazyLayoutPinnableItem_0).tad = function (value) {
    $l$block_0: {
      // Inline function 'androidx.compose.runtime.snapshots.Companion.withoutReadObservation' call
      // Inline function 'kotlin.contracts.contract' call
      var snapshot = Companion_instance_1.n2s();
      try {
        $l$block: {
          // Inline function 'androidx.compose.runtime.snapshots.Snapshot.enter' call
          var previous = snapshot.t28();
          try {
            var previous_0 = _get__parentPinnableContainer__xtf70a(this);
            var tmp;
            if (!(value === previous_0)) {
              _set__parentPinnableContainer__wpbnbm(this, value);
              var tmp_0;
              if (_get_pinsCount__i23y9s(this) > 0) {
                var tmp0_safe_receiver = _get_parentHandle__f8dcex(this);
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  tmp0_safe_receiver.gu();
                }
                _set_parentHandle__bde57(this, value == null ? null : value.q8h());
                tmp_0 = Unit_instance;
              }
              tmp = tmp_0;
            }
            break $l$block;
          }finally {
            snapshot.u28(previous);
          }
        }
        break $l$block_0;
      }finally {
        snapshot.or();
      }
    }
  };
  protoOf(LazyLayoutPinnableItem_0).uad = function () {
    return _get__parentPinnableContainer__xtf70a(this);
  };
  protoOf(LazyLayoutPinnableItem_0).q8h = function () {
    if (_get_pinsCount__i23y9s(this) === 0) {
      this.nad_1.kad(this);
      var tmp0_safe_receiver = this.uad();
      _set_parentHandle__bde57(this, tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q8h());
    }
    var tmp2 = _get_pinsCount__i23y9s(this);
    _set_pinsCount__b8qi4s(this, tmp2 + 1 | 0);
    return this;
  };
  protoOf(LazyLayoutPinnableItem_0).gu = function () {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(_get_pinsCount__i23y9s(this) > 0)) {
      // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutPinnableItem.release.<anonymous>' call
      var message = 'Release should only be called once';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    var tmp1 = _get_pinsCount__i23y9s(this);
    _set_pinsCount__b8qi4s(this, tmp1 - 1 | 0);
    if (_get_pinsCount__i23y9s(this) === 0) {
      this.nad_1.lad(this);
      var tmp2_safe_receiver = _get_parentHandle__f8dcex(this);
      if (tmp2_safe_receiver == null)
        null;
      else {
        tmp2_safe_receiver.gu();
      }
      _set_parentHandle__bde57(this, null);
    }
  };
  protoOf(LazyLayoutPinnableItem_0).vad = function () {
    // Inline function 'kotlin.repeat' call
    var times = _get_pinsCount__i23y9s(this);
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutPinnableItem.onDisposed.<anonymous>' call
        this.gu();
      }
       while (inductionVariable < times);
  };
  function _no_name_provided__qut3iv_1($pinnableItem) {
    this.wad_1 = $pinnableItem;
  }
  protoOf(_no_name_provided__qut3iv_1).or = function () {
    // Inline function 'androidx.compose.foundation.lazy.layout.LazyLayoutPinnableItem.<anonymous>.<anonymous>.<anonymous>' call
    this.wad_1.vad();
  };
  function LazyLayoutPinnableItem$lambda($pinnableItem) {
    return function ($this$DisposableEffect) {
      // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
      return new _no_name_provided__qut3iv_1($pinnableItem);
    };
  }
  function LazyLayoutPinnableItem$lambda_0($key, $index, $pinnedItemList, $content, $$changed) {
    return function ($composer, $force) {
      LazyLayoutPinnableItem($key, $index, $pinnedItemList, $content, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function index$factory_1() {
    return getPropertyCallableRef('index', 1, KMutableProperty1, function (receiver) {
      return receiver.ja1();
    }, function (receiver, value) {
      return receiver.sad(value);
    });
  }
  function index$factory_2() {
    return getPropertyCallableRef('index', 1, KMutableProperty1, function (receiver) {
      return receiver.ja1();
    }, function (receiver, value) {
      return receiver.sad(value);
    });
  }
  function pinsCount$factory() {
    return getPropertyCallableRef('pinsCount', 1, KMutableProperty1, function (receiver) {
      return _get_pinsCount__i23y9s(receiver);
    }, function (receiver, value) {
      return _set_pinsCount__b8qi4s(receiver, value);
    });
  }
  function pinsCount$factory_0() {
    return getPropertyCallableRef('pinsCount', 1, KMutableProperty1, function (receiver) {
      return _get_pinsCount__i23y9s(receiver);
    }, function (receiver, value) {
      return _set_pinsCount__b8qi4s(receiver, value);
    });
  }
  function parentHandle$factory() {
    return getPropertyCallableRef('parentHandle', 1, KMutableProperty1, function (receiver) {
      return _get_parentHandle__f8dcex(receiver);
    }, function (receiver, value) {
      return _set_parentHandle__bde57(receiver, value);
    });
  }
  function parentHandle$factory_0() {
    return getPropertyCallableRef('parentHandle', 1, KMutableProperty1, function (receiver) {
      return _get_parentHandle__f8dcex(receiver);
    }, function (receiver, value) {
      return _set_parentHandle__bde57(receiver, value);
    });
  }
  function _parentPinnableContainer$factory() {
    return getPropertyCallableRef('_parentPinnableContainer', 1, KMutableProperty1, function (receiver) {
      return _get__parentPinnableContainer__xtf70a(receiver);
    }, function (receiver, value) {
      return _set__parentPinnableContainer__wpbnbm(receiver, value);
    });
  }
  function _parentPinnableContainer$factory_0() {
    return getPropertyCallableRef('_parentPinnableContainer', 1, KMutableProperty1, function (receiver) {
      return _get__parentPinnableContainer__xtf70a(receiver);
    }, function (receiver, value) {
      return _set__parentPinnableContainer__wpbnbm(receiver, value);
    });
  }
  function LazyLayoutPrefetchState() {
    this.na7_1 = null;
  }
  protoOf(LazyLayoutPrefetchState).oa7 = function (index, constraints) {
    var tmp0_safe_receiver = this.na7_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.oa7(index, constraints);
    return tmp1_elvis_lhs == null ? DummyHandle_instance : tmp1_elvis_lhs;
  };
  function DummyHandle() {
  }
  protoOf(DummyHandle).l7p = function () {
  };
  var DummyHandle_instance;
  function DummyHandle_getInstance() {
    return DummyHandle_instance;
  }
  function LazyLayoutSemanticState() {
  }
  function lazyLayoutSemantics(_this__u8e3s4, itemProviderLambda, state, orientation, userScrollEnabled, reverseScrolling, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1070136913);
    sourceInformation($composer_0, 'C(lazyLayoutSemantics)P(!1,3!1,4)47@1936L24,49@1991L2820:LazyLayoutSemantics.kt#wow0x6');
    if (isTraceInProgress()) {
      traceEventStart(1070136913, $changed, -1, 'androidx.compose.foundation.lazy.layout.lazyLayoutSemantics (LazyLayoutSemantics.kt:46)');
    }
    // Inline function 'androidx.compose.runtime.rememberCoroutineScope' call
    var getContext = null;
    var $composer_1 = $composer_0;
    $composer_1.j1l(773894976);
    sourceInformation($composer_1, 'CC(rememberCoroutineScope)482@20254L144:Effects.kt#9igjgp');
    if (!((1 & 1) === 0)) {
      getContext = lazyLayoutSemantics$lambda;
    }
    var composer = $composer_1;
    $composer_1.j1l(-954370320);
    sourceInformation($composer_1, 'CC(remember):Effects.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_1.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.runtime.rememberCoroutineScope.<anonymous>' call
      var value = new CompositionScopedCoroutineScopeCanceller(createCompositionCoroutineScope(getContext(), composer));
      $composer_1.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_1.l1l();
    var wrapper = tmp1_group;
    var tmp0 = wrapper.e26_1;
    $composer_1.l1l();
    var coroutineScope = tmp0;
    $composer_0.j1l(981879599);
    sourceInformation($composer_0, 'CC(remember):LazyLayoutSemantics.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(!!(!!(((($changed & 112 ^ 48) > 32 ? $composer_0.v1o(itemProviderLambda) : false) ? true : ($changed & 48) === 32) | ((($changed & 896 ^ 384) > 256 ? $composer_0.v1o(state) : false) ? true : ($changed & 384) === 256)) | ((($changed & 7168 ^ 3072) > 2048 ? $composer_0.v1o(orientation) : false) ? true : ($changed & 3072) === 2048)) | ((($changed & 57344 ^ 24576) > 16384 ? $composer_0.k1y(userScrollEnabled) : false) ? true : ($changed & 24576) === 16384));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_0.x1y();
    var tmp_1;
    if (invalid ? true : it_0 === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.lazy.layout.lazyLayoutSemantics.<anonymous>' call
      var isVertical = orientation.equals(Orientation_Vertical_getInstance());
      var indexForKeyMapping = lazyLayoutSemantics$lambda_0(itemProviderLambda);
      var tmp_2 = lazyLayoutSemantics$lambda_1(state);
      var accessibilityScrollState = new ScrollAxisRange(tmp_2, lazyLayoutSemantics$lambda_2(state), reverseScrolling);
      var tmp_3;
      if (userScrollEnabled) {
        tmp_3 = lazyLayoutSemantics$lambda_3(isVertical, coroutineScope, state);
      } else {
        tmp_3 = null;
      }
      var scrollByAction = tmp_3;
      var tmp_4;
      if (userScrollEnabled) {
        tmp_4 = lazyLayoutSemantics$lambda_4(itemProviderLambda, coroutineScope, state);
      } else {
        tmp_4 = null;
      }
      var scrollToIndexAction = tmp_4;
      var collectionInfo = state.na9();
      var tmp_5 = Companion_instance;
      var value_0 = semantics(tmp_5, VOID, lazyLayoutSemantics$lambda_5(indexForKeyMapping, isVertical, accessibilityScrollState, scrollByAction, scrollToIndexAction, collectionInfo));
      $composer_0.d1z(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_6 = tmp_1;
    var tmp1_group_0 = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
    $composer_0.l1l();
    var tmp0_0 = _this__u8e3s4.q4t(tmp1_group_0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0_0;
  }
  function lazyLayoutSemantics$lambda() {
    return EmptyCoroutineContext_getInstance();
  }
  function lazyLayoutSemantics$lambda_0($itemProviderLambda) {
    return function (needle) {
      var itemProvider = $itemProviderLambda();
      var result = -1;
      var inductionVariable = 0;
      var last = itemProvider.ta0();
      var tmp;
      if (inductionVariable < last) {
        $l$loop: do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (equals(itemProvider.aa2(index), needle)) {
            result = index;
            break $l$loop;
          }
        }
         while (inductionVariable < last);
        tmp = Unit_instance;
      }
      return result;
    };
  }
  function lazyLayoutSemantics$lambda_1($state) {
    return function () {
      return $state.oa9();
    };
  }
  function lazyLayoutSemantics$lambda_2($state) {
    return function () {
      return $state.pa9();
    };
  }
  function lazyLayoutSemantics$lambda$slambda($state, $delta, resultContinuation) {
    this.fae_1 = $state;
    this.gae_1 = $delta;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(lazyLayoutSemantics$lambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(lazyLayoutSemantics$lambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(lazyLayoutSemantics$lambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.fae_1.la9(this.gae_1, this);
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
  protoOf(lazyLayoutSemantics$lambda$slambda).x1e = function ($this$launch, completion) {
    var i = new lazyLayoutSemantics$lambda$slambda(this.fae_1, this.gae_1, completion);
    i.hae_1 = $this$launch;
    return i;
  };
  function lazyLayoutSemantics$lambda$slambda_0($state, $delta, resultContinuation) {
    var i = new lazyLayoutSemantics$lambda$slambda($state, $delta, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function lazyLayoutSemantics$lambda_3($isVertical, $coroutineScope, $state) {
    return function (x, y) {
      var tmp;
      if ($isVertical) {
        tmp = y;
      } else {
        tmp = x;
      }
      var delta = tmp;
      launch($coroutineScope, VOID, VOID, lazyLayoutSemantics$lambda$slambda_0($state, delta, null));
      return true;
    };
  }
  function lazyLayoutSemantics$lambda$slambda_1($state, $index, resultContinuation) {
    this.qae_1 = $state;
    this.rae_1 = $index;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(lazyLayoutSemantics$lambda$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(lazyLayoutSemantics$lambda$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(lazyLayoutSemantics$lambda$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.qae_1.ma9(this.rae_1, this);
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
  protoOf(lazyLayoutSemantics$lambda$slambda_1).x1e = function ($this$launch, completion) {
    var i = new lazyLayoutSemantics$lambda$slambda_1(this.qae_1, this.rae_1, completion);
    i.sae_1 = $this$launch;
    return i;
  };
  function lazyLayoutSemantics$lambda$slambda_2($state, $index, resultContinuation) {
    var i = new lazyLayoutSemantics$lambda$slambda_1($state, $index, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function lazyLayoutSemantics$lambda_4($itemProviderLambda, $coroutineScope, $state) {
    return function (index) {
      var itemProvider = $itemProviderLambda();
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (!(index >= 0 ? index < itemProvider.ta0() : false)) {
        // Inline function 'androidx.compose.foundation.lazy.layout.lazyLayoutSemantics.<anonymous>.<anonymous>.<anonymous>' call
        var message = "Can't scroll to index " + index + ', it is out of ' + ('bounds [0, ' + itemProvider.ta0() + ')');
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      launch($coroutineScope, VOID, VOID, lazyLayoutSemantics$lambda$slambda_2($state, index, null));
      return true;
    };
  }
  function lazyLayoutSemantics$lambda_5($indexForKeyMapping, $isVertical, $accessibilityScrollState, $scrollByAction, $scrollToIndexAction, $collectionInfo) {
    return function ($this$semantics) {
      set_isTraversalGroup($this$semantics, true);
      indexForKey($this$semantics, $indexForKeyMapping);
      var tmp;
      if ($isVertical) {
        set_verticalScrollAxisRange($this$semantics, $accessibilityScrollState);
        tmp = Unit_instance;
      } else {
        set_horizontalScrollAxisRange($this$semantics, $accessibilityScrollState);
        tmp = Unit_instance;
      }
      var tmp_0;
      if (!($scrollByAction == null)) {
        scrollBy($this$semantics, VOID, $scrollByAction);
        tmp_0 = Unit_instance;
      }
      var tmp_1;
      if (!($scrollToIndexAction == null)) {
        scrollToIndex($this$semantics, VOID, $scrollToIndexAction);
        tmp_1 = Unit_instance;
      }
      set_collectionInfo($this$semantics, $collectionInfo);
      return Unit_instance;
    };
  }
  function LazySaveableStateHolderProvider(content, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(674185128);
    sourceInformation($composer_0, 'C(LazySaveableStateHolderProvider)42@2089L7,43@2114L172,48@2291L161:LazySaveableStateHolder.kt#wow0x6');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.j1y(content) ? 4 : 2);
    if (!(($dirty & 11) === 2) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(674185128, $dirty, -1, 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolderProvider (LazySaveableStateHolder.kt:41)');
      }
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalSaveableStateRegistry();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.j1z(this_0);
      sourceInformationMarkerEnd($composer_1);
      var currentRegistry = tmp0;
      var tmp = Companion_instance_10.tae(currentRegistry);
      var holder = rememberSaveable([currentRegistry], tmp, null, LazySaveableStateHolderProvider$lambda(currentRegistry), $composer_0, 72, 4);
      var tmp_0 = get_LocalSaveableStateRegistry().g24(holder);
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolderProvider.<anonymous>' call
      var tmp_1 = $composer_0;
      var dispatchReceiver = composableLambda(tmp_1, 1863926504, true, LazySaveableStateHolderProvider$lambda_0(holder, content));
      // Inline function 'androidx.compose.runtime.remember' call
      var $composer_2 = $composer_0;
      $composer_2.j1l(1157296644);
      sourceInformation($composer_2, 'CC(remember)P(1):Composables.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = $composer_2.v1o(dispatchReceiver);
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_2.x1y();
      var tmp_2;
      if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolderProvider.<anonymous>.<anonymous>' call
        var value = ComposableLambda$invoke$ref_3(dispatchReceiver);
        $composer_2.d1z(value);
        tmp_2 = value;
      } else {
        tmp_2 = it;
      }
      var tmp_3 = tmp_2;
      var tmp0_0 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      $composer_2.l1l();
      CompositionLocalProvider(tmp_0, tmp0_0, $composer_0, 56);
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
      tmp0_safe_receiver.j24(LazySaveableStateHolderProvider$lambda_1(content, $changed));
    }
  }
  function LazySaveableStateHolder$Companion$saver$lambda($this$Saver, it) {
    // Inline function 'kotlin.collections.ifEmpty' call
    var this_0 = it.z32();
    var tmp;
    if (this_0.u()) {
      // Inline function 'androidx.compose.foundation.lazy.layout.Companion.saver.<anonymous>.<anonymous>' call
      tmp = null;
    } else {
      tmp = this_0;
    }
    return tmp;
  }
  function LazySaveableStateHolder$Companion$saver$lambda_0($parentRegistry) {
    return function (restored) {
      return LazySaveableStateHolder_init_$Create$($parentRegistry, restored);
    };
  }
  function LazySaveableStateHolder_init_$Init$(parentRegistry, restoredValues, $this) {
    LazySaveableStateHolder.call($this, SaveableStateRegistry(restoredValues, LazySaveableStateHolder$_init_$lambda_f4mmxz(parentRegistry)));
    return $this;
  }
  function LazySaveableStateHolder_init_$Create$(parentRegistry, restoredValues) {
    return LazySaveableStateHolder_init_$Init$(parentRegistry, restoredValues, objectCreate(protoOf(LazySaveableStateHolder)));
  }
  function Companion_7() {
  }
  protoOf(Companion_7).tae = function (parentRegistry) {
    var tmp = LazySaveableStateHolder$Companion$saver$lambda;
    return Saver(tmp, LazySaveableStateHolder$Companion$saver$lambda_0(parentRegistry));
  };
  var Companion_instance_10;
  function Companion_getInstance_31() {
    return Companion_instance_10;
  }
  function LazySaveableStateHolder$_init_$lambda_f4mmxz($parentRegistry) {
    return function (it) {
      var tmp0_safe_receiver = $parentRegistry;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.b32(it);
      return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
    };
  }
  function _no_name_provided__qut3iv_2(this$0, $key) {
    this.xae_1 = this$0;
    this.yae_1 = $key;
  }
  protoOf(_no_name_provided__qut3iv_2).or = function () {
    // Inline function 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolder.SaveableStateProvider.<anonymous>.<anonymous>' call
    // Inline function 'kotlin.collections.plusAssign' call
    var this_0 = this.xae_1.wae_1;
    var element = this.yae_1;
    this_0.a1(element);
  };
  function LazySaveableStateHolder$SaveableStateProvider$lambda(this$0, $key) {
    return function ($this$DisposableEffect) {
      var this_0 = this$0.wae_1;
      var element = $key;
      this_0.b1(element);
      // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
      return new _no_name_provided__qut3iv_2(this$0, $key);
    };
  }
  function LazySaveableStateHolder$SaveableStateProvider$lambda_0($tmp0_rcvr, $key, $content, $$changed) {
    return function ($composer, $force) {
      $tmp0_rcvr.d33($key, $content, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function LazySaveableStateHolder(wrappedRegistry) {
    this.uae_1 = wrappedRegistry;
    this.vae_1 = mutableStateOf(null);
    var tmp = this;
    // Inline function 'kotlin.collections.mutableSetOf' call
    tmp.wae_1 = LinkedHashSet_init_$Create$();
  }
  protoOf(LazySaveableStateHolder).b32 = function (value) {
    return this.uae_1.b32(value);
  };
  protoOf(LazySaveableStateHolder).c32 = function (key) {
    return this.uae_1.c32(key);
  };
  protoOf(LazySaveableStateHolder).m32 = function (key, valueProvider) {
    return this.uae_1.m32(key, valueProvider);
  };
  protoOf(LazySaveableStateHolder).zae = function (_set____db54di) {
    var this_0 = this.vae_1;
    wrappedHolder$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(LazySaveableStateHolder).aaf = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.vae_1;
    wrappedHolder$factory_0();
    return this_0.s2();
  };
  protoOf(LazySaveableStateHolder).z32 = function () {
    var holder = this.aaf();
    if (!(holder == null)) {
      // Inline function 'kotlin.collections.forEach' call
      var tmp0_iterator = this.wae_1.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        // Inline function 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolder.performSave.<anonymous>' call
        holder.e33(element);
      }
    }
    return this.uae_1.z32();
  };
  protoOf(LazySaveableStateHolder).d33 = function (key, content, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-697180401);
    sourceInformation($composer_0, 'C(SaveableStateProvider)P(1)84@3453L35,85@3497L159:LazySaveableStateHolder.kt#wow0x6');
    var $dirty = $changed;
    if (isTraceInProgress()) {
      traceEventStart(-697180401, $dirty, -1, 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolder.SaveableStateProvider (LazySaveableStateHolder.kt:82)');
    }
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      var value = this.aaf();
      // Inline function 'kotlin.contracts.contract' call
      if (value == null) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolder.SaveableStateProvider.<anonymous>' call
        var message = 'null wrappedHolder';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = value;
        break $l$block;
      }
    }
    tmp$ret$1.d33(key, content, $composer_0, 520 | 112 & $dirty);
    DisposableEffect(key, LazySaveableStateHolder$SaveableStateProvider$lambda(this, key), $composer_0, 8);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    var tmp1_safe_receiver = $composer_0.m20();
    if (tmp1_safe_receiver == null)
      null;
    else {
      tmp1_safe_receiver.j24(LazySaveableStateHolder$SaveableStateProvider$lambda_0(this, key, content, $changed));
    }
  };
  protoOf(LazySaveableStateHolder).e33 = function (key) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      var value = this.aaf();
      // Inline function 'kotlin.contracts.contract' call
      if (value == null) {
        // Inline function 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolder.removeState.<anonymous>' call
        var message = 'null wrappedHolder';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = value;
        break $l$block;
      }
    }
    tmp$ret$1.e33(key);
  };
  function LazySaveableStateHolderProvider$lambda($currentRegistry) {
    return function () {
      return LazySaveableStateHolder_init_$Create$($currentRegistry, emptyMap());
    };
  }
  function LazySaveableStateHolderProvider$lambda_0($holder, $content) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C49@2393L29,50@2431L15:LazySaveableStateHolder.kt#wow0x6');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
        if (isTraceInProgress()) {
          traceEventStart(1863926504, $changed, -1, 'androidx.compose.foundation.lazy.layout.LazySaveableStateHolderProvider.<anonymous> (LazySaveableStateHolder.kt:49)');
        }
        $holder.zae(rememberSaveableStateHolder($composer_0, 0));
        $content($holder, $composer_0, 8);
        var tmp_0;
        if (isTraceInProgress()) {
          traceEventEnd();
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else {
        $composer_0.q1r();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function ComposableLambda$invoke$ref_3($boundThis) {
    return function (p0, p1) {
      return $boundThis.d1x(p0, p1);
    };
  }
  function LazySaveableStateHolderProvider$lambda_1($content, $$changed) {
    return function ($composer, $force) {
      LazySaveableStateHolderProvider($content, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function wrappedHolder$factory() {
    return getPropertyCallableRef('wrappedHolder', 1, KMutableProperty1, function (receiver) {
      return receiver.aaf();
    }, function (receiver, value) {
      return receiver.zae(value);
    });
  }
  function wrappedHolder$factory_0() {
    return getPropertyCallableRef('wrappedHolder', 1, KMutableProperty1, function (receiver) {
      return receiver.aaf();
    }, function (receiver, value) {
      return receiver.zae(value);
    });
  }
  function _ObservableScopeInvalidator___init__impl__ism0sl(state) {
    state = state === VOID ? mutableStateOf(Unit_instance, neverEqualPolicy()) : state;
    return state;
  }
  function _get_state__b8zcm8($this) {
    return $this;
  }
  function ObservableScopeInvalidator__attachToScope_impl_wvvw97($this) {
    _get_state__b8zcm8($this).s2();
  }
  function ObservableScopeInvalidator__invalidateScope_impl_b202xc($this) {
    _get_state__b8zcm8($this).g1d(Unit_instance);
  }
  function get_ModifierLocalBringIntoViewParent() {
    _init_properties_BringIntoView_kt__yi7ifv();
    return ModifierLocalBringIntoViewParent;
  }
  var ModifierLocalBringIntoViewParent;
  function _get_localParent__9fzpok($this) {
    return $this.b53(get_ModifierLocalBringIntoViewParent());
  }
  function BringIntoViewChildNode() {
    Node.call(this);
    this.u8e_1 = defaultBringIntoViewParent(this);
    this.v8e_1 = null;
  }
  protoOf(BringIntoViewChildNode).baf = function () {
    var tmp0_safe_receiver = this.v8e_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp_0;
      // Inline function 'androidx.compose.foundation.relocation.BringIntoViewChildNode.<get-layoutCoordinates>.<anonymous>' call
      if (tmp0_safe_receiver.k54()) {
        tmp_0 = tmp0_safe_receiver;
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(BringIntoViewChildNode).caf = function () {
    var tmp0_elvis_lhs = _get_localParent__9fzpok(this);
    return tmp0_elvis_lhs == null ? this.u8e_1 : tmp0_elvis_lhs;
  };
  protoOf(BringIntoViewChildNode).m5s = function (coordinates) {
    this.v8e_1 = coordinates;
  };
  function ModifierLocalBringIntoViewParent$lambda() {
    _init_properties_BringIntoView_kt__yi7ifv();
    return null;
  }
  var properties_initialized_BringIntoView_kt_uq6g7t;
  function _init_properties_BringIntoView_kt__yi7ifv() {
    if (!properties_initialized_BringIntoView_kt_uq6g7t) {
      properties_initialized_BringIntoView_kt_uq6g7t = true;
      ModifierLocalBringIntoViewParent = modifierLocalOf(ModifierLocalBringIntoViewParent$lambda);
    }
  }
  function BringIntoViewRequester() {
  }
  function funBringIntoViewRequester() {
    return new BringIntoViewRequesterImpl();
  }
  function disposeRequester($this) {
    var tmp = $this.taf_1;
    if (tmp instanceof BringIntoViewRequesterImpl) {
      var tmp_0 = $this.taf_1;
      // Inline function 'androidx.compose.runtime.collection.MutableVector.minusAssign' call
      (tmp_0 instanceof BringIntoViewRequesterImpl ? tmp_0 : THROW_CCE()).uaf_1.m2l($this);
    }
  }
  function BringIntoViewRequesterNode$bringIntoView$lambda($rect, this$0) {
    return function () {
      var tmp3_elvis_lhs = $rect;
      var tmp;
      if (tmp3_elvis_lhs == null) {
        var tmp0_safe_receiver = this$0.baf();
        var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u5f();
        var tmp_0;
        var tmp_1 = tmp1_safe_receiver;
        if ((tmp_1 == null ? null : new IntSize(tmp_1)) == null) {
          tmp_0 = null;
        } else {
          tmp_0 = toSize(tmp1_safe_receiver);
        }
        var tmp2_safe_receiver = tmp_0;
        var tmp_2;
        var tmp_3 = tmp2_safe_receiver;
        if ((tmp_3 == null ? null : new Size(tmp_3)) == null) {
          tmp_2 = null;
        } else {
          tmp_2 = toRect(tmp2_safe_receiver);
        }
        tmp = tmp_2;
      } else {
        tmp = tmp3_elvis_lhs;
      }
      return tmp;
    };
  }
  function BringIntoViewRequesterNode(requester) {
    BringIntoViewChildNode.call(this);
    this.taf_1 = requester;
  }
  protoOf(BringIntoViewRequesterNode).p4u = function () {
    this.vaf(this.taf_1);
  };
  protoOf(BringIntoViewRequesterNode).vaf = function (requester) {
    disposeRequester(this);
    if (requester instanceof BringIntoViewRequesterImpl) {
      // Inline function 'androidx.compose.runtime.collection.MutableVector.plusAssign' call
      requester.uaf_1.u1v(this);
    }
    this.taf_1 = requester;
  };
  protoOf(BringIntoViewRequesterNode).r4u = function () {
    disposeRequester(this);
  };
  protoOf(BringIntoViewRequesterNode).daf = function (rect, $completion) {
    var tmp = this.caf();
    var tmp0_elvis_lhs = this.baf();
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var tmp_1 = tmp_0;
    return tmp.waf(tmp_1, BringIntoViewRequesterNode$bringIntoView$lambda(rect, this), $completion);
  };
  function $bringIntoViewCOROUTINE$35(_this__u8e3s4, rect, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.fag_1 = _this__u8e3s4;
    this.gag_1 = rect;
  }
  protoOf($bringIntoViewCOROUTINE$35).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            var tmp_0 = this;
            tmp_0.hag_1 = this.fag_1.uaf_1;
            this.iag_1 = this.hag_1.t1v_1;
            if (this.iag_1 > 0) {
              this.jag_1 = 0;
              var tmp_1 = this;
              var tmp_2 = this.hag_1.r1v_1;
              tmp_1.kag_1 = isArray(tmp_2) ? tmp_2 : THROW_CCE();
              this.ac_1 = 1;
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 1:
            var tmp_3 = this;
            tmp_3.lag_1 = this.kag_1[this.jag_1];
            this.ac_1 = 2;
            suspendResult = this.lag_1.daf(this.gag_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.jag_1 = this.jag_1 + 1 | 0;
            if (this.jag_1 < this.iag_1) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ac_1 = 4;
            continue $sm;
          case 4:
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
  function BringIntoViewRequesterImpl() {
    var tmp = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp.uaf_1 = new MutableVector(tmp$ret$0, 0);
  }
  protoOf(BringIntoViewRequesterImpl).daf = function (rect, $completion) {
    var tmp = new $bringIntoViewCOROUTINE$35(this, rect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function BringIntoViewResponderNode$bringChildIntoView$localRect$ref(this$0, $childCoordinates, $boundsProvider) {
    var l = function () {
      return bringChildIntoView$localRect(this$0, $childCoordinates, $boundsProvider);
    };
    l.callableName = 'localRect';
    return l;
  }
  function BringIntoViewResponderNode$bringChildIntoView$slambda$slambda(this$0, $childCoordinates, $boundsProvider, resultContinuation) {
    this.uag_1 = this$0;
    this.vag_1 = $childCoordinates;
    this.wag_1 = $boundsProvider;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            var tmp_0 = this.uag_1.nah_1;
            suspendResult = tmp_0.n8q(BringIntoViewResponderNode$bringChildIntoView$localRect$ref(this.uag_1, this.vag_1, this.wag_1), this);
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
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new BringIntoViewResponderNode$bringChildIntoView$slambda$slambda(this.uag_1, this.vag_1, this.wag_1, completion);
    i.xag_1 = $this$launch;
    return i;
  };
  function BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_0(this$0, $childCoordinates, $boundsProvider, resultContinuation) {
    var i = new BringIntoViewResponderNode$bringChildIntoView$slambda$slambda(this$0, $childCoordinates, $boundsProvider, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1(this$0, $parentRect, resultContinuation) {
    this.xah_1 = this$0;
    this.yah_1 = $parentRect;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            var tmp_0 = this.xah_1.caf();
            var tmp0_elvis_lhs = this.xah_1.baf();
            var tmp_1;
            if (tmp0_elvis_lhs == null) {
              return Unit_instance;
            } else {
              tmp_1 = tmp0_elvis_lhs;
            }

            suspendResult = tmp_0.waf(tmp_1, this.yah_1, this);
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
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1).x1e = function ($this$launch, completion) {
    var i = new BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1(this.xah_1, this.yah_1, completion);
    i.zah_1 = $this$launch;
    return i;
  };
  function BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_2(this$0, $parentRect, resultContinuation) {
    var i = new BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_1(this$0, $parentRect, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function bringChildIntoView$localRect(this$0, $childCoordinates, $boundsProvider) {
    var tmp0_elvis_lhs = this$0.baf();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var layoutCoordinates = tmp;
    // Inline function 'kotlin.takeIf' call
    // Inline function 'kotlin.contracts.contract' call
    var tmp_0;
    // Inline function 'androidx.compose.foundation.relocation.BringIntoViewResponderNode.bringChildIntoView.localRect.<anonymous>' call
    if ($childCoordinates.k54()) {
      tmp_0 = $childCoordinates;
    } else {
      tmp_0 = null;
    }
    var tmp1_elvis_lhs = tmp_0;
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var childCoordinates = tmp_1;
    var tmp2_elvis_lhs = $boundsProvider();
    var tmp_2;
    if (tmp2_elvis_lhs == null) {
      return null;
    } else {
      tmp_2 = tmp2_elvis_lhs;
    }
    var rect = tmp_2;
    return localRectOf(layoutCoordinates, childCoordinates, rect);
  }
  function BringIntoViewResponderNode$bringChildIntoView$lambda(this$0, $childCoordinates, $boundsProvider) {
    return function () {
      var tmp0_safe_receiver = bringChildIntoView$localRect(this$0, $childCoordinates, $boundsProvider);
      var tmp;
      if (tmp0_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        tmp = this$0.nah_1.m8q(tmp0_safe_receiver);
      }
      return tmp;
    };
  }
  function BringIntoViewResponderNode$bringChildIntoView$slambda(this$0, $childCoordinates, $boundsProvider, $parentRect, resultContinuation) {
    this.iai_1 = this$0;
    this.jai_1 = $childCoordinates;
    this.kai_1 = $boundsProvider;
    this.lai_1 = $parentRect;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda).nai = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda).yc = function (p1, $completion) {
    return this.nai((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          launch(this.mai_1, VOID, VOID, BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_0(this.iai_1, this.jai_1, this.kai_1, null));
          return launch(this.mai_1, VOID, VOID, BringIntoViewResponderNode$bringChildIntoView$slambda$slambda_2(this.iai_1, this.lai_1, null));
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(BringIntoViewResponderNode$bringChildIntoView$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new BringIntoViewResponderNode$bringChildIntoView$slambda(this.iai_1, this.jai_1, this.kai_1, this.lai_1, completion);
    i.mai_1 = $this$coroutineScope;
    return i;
  };
  function BringIntoViewResponderNode$bringChildIntoView$slambda_0(this$0, $childCoordinates, $boundsProvider, $parentRect, resultContinuation) {
    var i = new BringIntoViewResponderNode$bringChildIntoView$slambda(this$0, $childCoordinates, $boundsProvider, $parentRect, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.nai($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $bringChildIntoViewCOROUTINE$36(_this__u8e3s4, childCoordinates, boundsProvider, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.wai_1 = _this__u8e3s4;
    this.xai_1 = childCoordinates;
    this.yai_1 = boundsProvider;
  }
  protoOf($bringChildIntoViewCOROUTINE$36).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp_0 = this;
            tmp_0.zai_1 = BringIntoViewResponderNode$bringChildIntoView$lambda(this.wai_1, this.xai_1, this.yai_1);
            this.ac_1 = 1;
            suspendResult = coroutineScope(BringIntoViewResponderNode$bringChildIntoView$slambda_0(this.wai_1, this.xai_1, this.yai_1, this.zai_1, null), this);
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
  function BringIntoViewResponderNode(responder) {
    BringIntoViewChildNode.call(this);
    this.nah_1 = responder;
    this.oah_1 = modifierLocalMapOf(to(get_ModifierLocalBringIntoViewParent(), this));
  }
  protoOf(BringIntoViewResponderNode).f53 = function () {
    return this.oah_1;
  };
  protoOf(BringIntoViewResponderNode).waf = function (childCoordinates, boundsProvider, $completion) {
    var tmp = new $bringChildIntoViewCOROUTINE$36(this, childCoordinates, boundsProvider, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function localRectOf(_this__u8e3s4, sourceCoordinates, rect) {
    var localRect = _this__u8e3s4.j54(sourceCoordinates, false);
    return rect.h34(localRect.k34());
  }
  function CornerBasedShape(topStart, topEnd, bottomEnd, bottomStart) {
    this.aaj_1 = topStart;
    this.baj_1 = topEnd;
    this.caj_1 = bottomEnd;
    this.daj_1 = bottomStart;
  }
  protoOf(CornerBasedShape).b3y = function (size, layoutDirection, density) {
    var topStart = this.aaj_1.eaj(size, density);
    var topEnd = this.baj_1.eaj(size, density);
    var bottomEnd = this.caj_1.eaj(size, density);
    var bottomStart = this.daj_1.eaj(size, density);
    var minDimension = _Size___get_minDimension__impl__4iso0r(size);
    if (topStart + bottomStart > minDimension) {
      var scale = minDimension / (topStart + bottomStart);
      topStart = topStart * scale;
      bottomStart = bottomStart * scale;
    }
    if (topEnd + bottomEnd > minDimension) {
      var scale_0 = minDimension / (topEnd + bottomEnd);
      topEnd = topEnd * scale_0;
      bottomEnd = bottomEnd * scale_0;
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(((topStart >= 0.0 ? topEnd >= 0.0 : false) ? bottomEnd >= 0.0 : false) ? bottomStart >= 0.0 : false)) {
      // Inline function 'androidx.compose.foundation.shape.CornerBasedShape.createOutline.<anonymous>' call
      var message = "Corner size in Px can't be negative(topStart = " + topStart + ', topEnd = ' + topEnd + ', ' + ('bottomEnd = ' + bottomEnd + ', bottomStart = ' + bottomStart + ')!');
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.faj(size, topStart, topEnd, bottomEnd, bottomStart, layoutDirection);
  };
  var ZeroCornerSize;
  function CornerSize(percent) {
    _init_properties_CornerSize_kt__adzyne();
    return new PercentCornerSize(percent);
  }
  function PercentCornerSize(percent) {
    this.gaj_1 = percent;
    if (this.gaj_1 < 0.0 ? true : this.gaj_1 > 100.0) {
      throw IllegalArgumentException_init_$Create$('The percent should be in the range of [0, 100]');
    }
  }
  protoOf(PercentCornerSize).eaj = function (shapeSize, density) {
    return _Size___get_minDimension__impl__4iso0r(shapeSize) * (this.gaj_1 / 100.0);
  };
  protoOf(PercentCornerSize).toString = function () {
    return 'CornerSize(size = ' + this.gaj_1 + '%)';
  };
  protoOf(PercentCornerSize).hashCode = function () {
    return getNumberHashCode(this.gaj_1);
  };
  protoOf(PercentCornerSize).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PercentCornerSize))
      return false;
    var tmp0_other_with_cast = other instanceof PercentCornerSize ? other : THROW_CCE();
    if (!equals(this.gaj_1, tmp0_other_with_cast.gaj_1))
      return false;
    return true;
  };
  function CornerSize_0(size) {
    _init_properties_CornerSize_kt__adzyne();
    return new DpCornerSize(size);
  }
  function DpCornerSize(size) {
    this.haj_1 = size;
  }
  protoOf(DpCornerSize).eaj = function (shapeSize, density) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.shape.DpCornerSize.toPx.<anonymous>' call
    return density.y35(this.haj_1);
  };
  protoOf(DpCornerSize).toString = function () {
    return 'CornerSize(size = ' + _Dp___get_value__impl__geb1vb(this.haj_1) + '.dp)';
  };
  protoOf(DpCornerSize).hashCode = function () {
    return Dp__hashCode_impl_sxkrra(this.haj_1);
  };
  protoOf(DpCornerSize).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DpCornerSize))
      return false;
    var tmp0_other_with_cast = other instanceof DpCornerSize ? other : THROW_CCE();
    if (!equals(this.haj_1, tmp0_other_with_cast.haj_1))
      return false;
    return true;
  };
  function ZeroCornerSize$1() {
  }
  protoOf(ZeroCornerSize$1).eaj = function (shapeSize, density) {
    return 0.0;
  };
  protoOf(ZeroCornerSize$1).toString = function () {
    return 'ZeroCornerSize';
  };
  var properties_initialized_CornerSize_kt_9yvmfc;
  function _init_properties_CornerSize_kt__adzyne() {
    if (!properties_initialized_CornerSize_kt_9yvmfc) {
      properties_initialized_CornerSize_kt_9yvmfc = true;
      ZeroCornerSize = new ZeroCornerSize$1();
    }
  }
  function get_CircleShape() {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return CircleShape;
  }
  var CircleShape;
  function RoundedCornerShape(topStart, topEnd, bottomEnd, bottomStart) {
    CornerBasedShape.call(this, topStart, topEnd, bottomEnd, bottomStart);
  }
  protoOf(RoundedCornerShape).faj = function (size, topStart, topEnd, bottomEnd, bottomStart, layoutDirection) {
    var tmp;
    if (topStart + topEnd + bottomEnd + bottomStart === 0.0) {
      tmp = new Rectangle(toRect(size));
    } else {
      tmp = new Rounded(RoundRect(toRect(size), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? topStart : topEnd), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? topEnd : topStart), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? bottomEnd : bottomStart), CornerRadius(layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? bottomStart : bottomEnd)));
    }
    return tmp;
  };
  protoOf(RoundedCornerShape).toString = function () {
    return 'RoundedCornerShape(topStart = ' + this.aaj_1 + ', topEnd = ' + this.baj_1 + ', bottomEnd = ' + ('' + this.caj_1 + ', bottomStart = ' + this.daj_1 + ')');
  };
  protoOf(RoundedCornerShape).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RoundedCornerShape))
      return false;
    if (!equals(this.aaj_1, other.aaj_1))
      return false;
    if (!equals(this.baj_1, other.baj_1))
      return false;
    if (!equals(this.caj_1, other.caj_1))
      return false;
    if (!equals(this.daj_1, other.daj_1))
      return false;
    return true;
  };
  protoOf(RoundedCornerShape).hashCode = function () {
    var result = hashCode(this.aaj_1);
    result = imul(31, result) + hashCode(this.baj_1) | 0;
    result = imul(31, result) + hashCode(this.caj_1) | 0;
    result = imul(31, result) + hashCode(this.daj_1) | 0;
    return result;
  };
  function RoundedCornerShape_0(percent) {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return RoundedCornerShape_1(CornerSize(percent));
  }
  function RoundedCornerShape_1(corner) {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return new RoundedCornerShape(corner, corner, corner, corner);
  }
  function RoundedCornerShape_2(size) {
    _init_properties_RoundedCornerShape_kt__vzposf();
    return RoundedCornerShape_1(CornerSize_0(size));
  }
  function RoundedCornerShape_3(topStart, topEnd, bottomEnd, bottomStart) {
    var tmp;
    if (topStart === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = topStart;
    }
    topStart = tmp;
    var tmp_0;
    if (topEnd === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_0 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_0 = topEnd;
    }
    topEnd = tmp_0;
    var tmp_1;
    if (bottomEnd === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_1 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_1 = bottomEnd;
    }
    bottomEnd = tmp_1;
    var tmp_2;
    if (bottomStart === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_2 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_2 = bottomStart;
    }
    bottomStart = tmp_2;
    _init_properties_RoundedCornerShape_kt__vzposf();
    return new RoundedCornerShape(CornerSize_0(topStart), CornerSize_0(topEnd), CornerSize_0(bottomEnd), CornerSize_0(bottomStart));
  }
  var properties_initialized_RoundedCornerShape_kt_5mose9;
  function _init_properties_RoundedCornerShape_kt__vzposf() {
    if (!properties_initialized_RoundedCornerShape_kt_5mose9) {
      properties_initialized_RoundedCornerShape_kt_5mose9 = true;
      CircleShape = RoundedCornerShape_0(50);
    }
  }
  function BasicText(text, modifier, style, onTextLayout, overflow, softWrap, maxLines, minLines, color, $composer, $changed, $default) {
    var modifier_0 = {_v: modifier};
    var style_0 = {_v: style};
    var onTextLayout_0 = {_v: onTextLayout};
    var overflow_0 = {_v: new TextOverflow(overflow)};
    var softWrap_0 = {_v: softWrap};
    var maxLines_0 = {_v: maxLines};
    var minLines_0 = {_v: minLines};
    var color_0 = {_v: color};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-1186827822);
    sourceInformation($composer_0, 'C(BasicText)P(8,3,7,4,5:c#ui.text.style.TextOverflow,6,1,2)95@4654L7,144@6466L41:BasicText.kt#423gt5');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(text) ? 4 : 2);
    if (!(($default & 2) === 0))
      $dirty = $dirty | 48;
    else if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier_0._v) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.v1o(style_0._v) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.j1y(onTextLayout_0._v) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.n1y(_TextOverflow___get_value__impl__vugm5i(overflow_0._v.r4l_1)) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.k1y(softWrap_0._v) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.n1y(maxLines_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.n1y(minLines_0._v) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 33554432;
    if (!(($default & 256) === 256) ? true : !(($dirty & 191739611) === 38347922) ? true : !$composer_0.f1x()) {
      if (!(($default & 2) === 0)) {
        modifier_0._v = Companion_instance;
      }
      if (!(($default & 4) === 0)) {
        style_0._v = Companion_getInstance_15().h4c_1;
      }
      if (!(($default & 8) === 0)) {
        onTextLayout_0._v = null;
      }
      if (!(($default & 16) === 0)) {
        overflow_0._v = new TextOverflow(Companion_getInstance_16().o4l_1);
      }
      if (!(($default & 32) === 0)) {
        softWrap_0._v = true;
      }
      if (!(($default & 64) === 0)) {
        maxLines_0._v = IntCompanionObject_instance.MAX_VALUE;
      }
      if (!(($default & 128) === 0)) {
        minLines_0._v = 1;
      }
      if (!(($default & 256) === 0)) {
        color_0._v = null;
      }
      if (isTraceInProgress()) {
        traceEventStart(-1186827822, $dirty, -1, 'androidx.compose.foundation.text.BasicText (BasicText.kt:90)');
      }
      validateMinMaxLines(minLines_0._v, maxLines_0._v);
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalSelectionRegistrar();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.j1z(this_0);
      sourceInformationMarkerEnd($composer_1);
      var selectionRegistrar = tmp0;
      $composer_0.j1l(-328371424);
      sourceInformation($composer_0, '97@4790L7,99@4853L152,102@5014L234');
      var tmp;
      if (!(selectionRegistrar == null)) {
        // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
        var this_1 = get_LocalTextSelectionColors();
        var $composer_2 = $composer_0;
        sourceInformationMarkerStart($composer_2, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
        var tmp0_0 = $composer_2.j1z(this_1);
        sourceInformationMarkerEnd($composer_2);
        var backgroundSelectionColor = tmp0_0.naj_1;
        var tmp_0 = selectionIdSaver(selectionRegistrar);
        var selectableId = rememberSaveable([selectionRegistrar], tmp_0, null, BasicText$lambda(selectionRegistrar), $composer_0, 72, 4);
        $composer_0.j1l(-328361474);
        sourceInformation($composer_0, 'CC(remember):BasicText.kt#9igjgp');
        // Inline function 'androidx.compose.runtime.cache' call
        var this_2 = $composer_0;
        var invalid = !!(!!($composer_0.m1y(selectableId) | $composer_0.v1o(selectionRegistrar)) | $composer_0.m1y(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(backgroundSelectionColor))));
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
        var it = this_2.x1y();
        var tmp_1;
        if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
          // Inline function 'androidx.compose.foundation.text.BasicText.<anonymous>' call
          var value = new SelectionController(selectableId, selectionRegistrar, backgroundSelectionColor);
          this_2.d1z(value);
          tmp_1 = value;
        } else {
          tmp_1 = it;
        }
        var tmp_2 = tmp_1;
        var tmp0_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
        $composer_0.l1l();
        tmp = tmp0_group;
      } else {
        tmp = null;
      }
      var tmp1_group = tmp;
      $composer_0.l1l();
      var selectionController = tmp1_group;
      var tmp_3;
      if (!(selectionController == null) ? true : !(onTextLayout_0._v == null)) {
        $composer_0.j1l(-1588912554);
        sourceInformation($composer_0, '124@5828L7');
        var tmp_4 = graphicsLayer(modifier_0._v);
        var tmp_5 = AnnotatedString_init_$Create$(text);
        var tmp_6 = style_0._v;
        var tmp_7 = onTextLayout_0._v;
        var tmp_8 = overflow_0._v;
        var tmp_9 = softWrap_0._v;
        var tmp_10 = maxLines_0._v;
        var tmp_11 = minLines_0._v;
        // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
        var this_3 = get_LocalFontFamilyResolver();
        var $composer_3 = $composer_0;
        sourceInformationMarkerStart($composer_3, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
        var tmp0_1 = $composer_3.j1z(this_3);
        sourceInformationMarkerEnd($composer_3);
        var tmp2_group = textModifier(tmp_4, tmp_5, tmp_6, tmp_7, tmp_8.r4l_1, tmp_9, tmp_10, tmp_11, tmp0_1, null, null, selectionController, color_0._v);
        $composer_0.l1l();
        tmp_3 = tmp2_group;
      } else {
        $composer_0.j1l(-1588255199);
        sourceInformation($composer_0, '136@6279L7');
        var tmp_12 = graphicsLayer(modifier_0._v);
        var tmp_13 = style_0._v;
        // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
        var this_4 = get_LocalFontFamilyResolver();
        var $composer_4 = $composer_0;
        sourceInformationMarkerStart($composer_4, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
        var tmp0_2 = $composer_4.j1z(this_4);
        sourceInformationMarkerEnd($composer_4);
        var tmp3_group = tmp_12.q4t(new TextStringSimpleElement(text, tmp_13, tmp0_2, overflow_0._v.r4l_1, softWrap_0._v, maxLines_0._v, minLines_0._v, color_0._v));
        $composer_0.l1l();
        tmp_3 = tmp3_group;
      }
      var finalModifier = tmp_3;
      // Inline function 'androidx.compose.ui.layout.Layout' call
      var measurePolicy = EmptyMeasurePolicy_getInstance();
      var modifier_1 = finalModifier;
      var $composer_5 = $composer_0;
      $composer_5.j1l(544976794);
      sourceInformation($composer_5, 'CC(Layout)P(1)124@4810L23,127@4961L385:Layout.kt#80mrfh');
      if (!((0 & 1) === 0))
        modifier_1 = Companion_instance;
      var compositeKeyHash = get_currentCompositeKeyHash($composer_5, 0);
      var materialized = materialize($composer_5, modifier_1);
      var localMap = $composer_5.v1y();
      // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
      var factory = Companion_getInstance_17().p5p_1;
      var $composer_6 = $composer_5;
      $composer_6.j1l(1405779621);
      sourceInformation($composer_6, 'CC(ReusableComposeNode):Composables.kt#9igjgp');
      var tmp_14 = $composer_6.g1x();
      if (!isInterface(tmp_14, Applier)) {
        invalidApplier();
      }
      $composer_6.t1x();
      if ($composer_6.p1x()) {
        var tmp_15 = $composer_6;
        tmp_15.u1x(BasicText$lambda_0(factory));
      } else {
        $composer_6.x1x();
      }
      // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
      var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_6);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, measurePolicy, Companion_getInstance_17().u5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_17().t5p_1);
      Updater__set_impl_v7kwss($this$ReusableComposeNode, materialized, Companion_getInstance_17().r5p_1);
      // Inline function 'androidx.compose.runtime.Updater.set' call
      var block = Companion_getInstance_17().x5p_1;
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
      var tmp_16;
      if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
        $this$with.d1z(compositeKeyHash);
        _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
        tmp_16 = Unit_instance;
      }
      $composer_6.z1x();
      $composer_6.l1l();
      $composer_5.l1l();
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    var tmp4_safe_receiver = $composer_0.m20();
    if (tmp4_safe_receiver == null)
      null;
    else {
      tmp4_safe_receiver.j24(BasicText$lambda_1(text, modifier_0, style_0, onTextLayout_0, overflow_0, softWrap_0, maxLines_0, minLines_0, color_0, $changed, $default));
    }
  }
  function selectionIdSaver(selectionRegistrar) {
    var tmp = selectionIdSaver$lambda(selectionRegistrar);
    return Saver(tmp, selectionIdSaver$lambda_0);
  }
  function textModifier(_this__u8e3s4, text, style, onTextLayout, overflow, softWrap, maxLines, minLines, fontFamilyResolver, placeholders, onPlaceholderLayout, selectionController, color) {
    if (selectionController == null) {
      var staticTextModifier = new TextAnnotatedStringElement(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, null, color);
      return _this__u8e3s4.q4t(Companion_instance).q4t(staticTextModifier);
    } else {
      var selectableTextModifier = new SelectableTextAnnotatedStringElement(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, selectionController, color);
      return _this__u8e3s4.q4t(selectionController.taj_1).q4t(selectableTextModifier);
    }
  }
  function EmptyMeasurePolicy$placementBlock$lambda($this$null) {
    return Unit_instance;
  }
  function EmptyMeasurePolicy() {
    EmptyMeasurePolicy_instance = this;
    var tmp = this;
    tmp.uaj_1 = EmptyMeasurePolicy$placementBlock$lambda;
  }
  protoOf(EmptyMeasurePolicy).w5s = function (_this__u8e3s4, measurables, constraints) {
    return _this__u8e3s4.s57(_Constraints___get_maxWidth__impl__uuyqc(constraints), _Constraints___get_maxHeight__impl__dt3e8z(constraints), VOID, this.uaj_1);
  };
  var EmptyMeasurePolicy_instance;
  function EmptyMeasurePolicy_getInstance() {
    if (EmptyMeasurePolicy_instance == null)
      new EmptyMeasurePolicy();
    return EmptyMeasurePolicy_instance;
  }
  function BasicText$lambda($selectionRegistrar) {
    return function () {
      return $selectionRegistrar.vaj();
    };
  }
  function BasicText$lambda_0($factory) {
    return function () {
      return $factory();
    };
  }
  function BasicText$lambda_1($text, $modifier, $style, $onTextLayout, $overflow, $softWrap, $maxLines, $minLines, $color, $$changed, $$default) {
    return function ($composer, $force) {
      BasicText($text, $modifier._v, $style._v, $onTextLayout._v, $overflow._v.r4l_1, $softWrap._v, $maxLines._v, $minLines._v, $color._v, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  function selectionIdSaver$lambda($selectionRegistrar) {
    return function ($this$Saver, it) {
      return hasSelection($selectionRegistrar, it) ? it : null;
    };
  }
  function selectionIdSaver$lambda_0(it) {
    return it;
  }
  function validateMinMaxLines(minLines, maxLines) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(minLines > 0 ? maxLines > 0 : false)) {
      // Inline function 'androidx.compose.foundation.text.validateMinMaxLines.<anonymous>' call
      var message = 'both minLines ' + minLines + ' and maxLines ' + maxLines + ' must be greater than zero';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(minLines <= maxLines)) {
      // Inline function 'androidx.compose.foundation.text.validateMinMaxLines.<anonymous>' call
      var message_0 = 'minLines ' + minLines + ' must be less than or equal to maxLines ' + maxLines;
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  function get_DefaultMinLines() {
    return DefaultMinLines;
  }
  var DefaultMinLines;
  function getParagraphBoundary(_this__u8e3s4, index) {
    return TextRange(findParagraphStart(_this__u8e3s4, index), findParagraphEnd(_this__u8e3s4, index));
  }
  function findParagraphStart(_this__u8e3s4, startIndex) {
    var inductionVariable = startIndex;
    if (1 <= inductionVariable)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + -1 | 0;
        if (charSequenceGet(_this__u8e3s4, index - 1 | 0) === _Char___init__impl__6a9atx(10)) {
          return index;
        }
      }
       while (1 <= inductionVariable);
    return 0;
  }
  function findParagraphEnd(_this__u8e3s4, startIndex) {
    var inductionVariable = startIndex;
    var last = charSequenceLength(_this__u8e3s4);
    if (inductionVariable < last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(_this__u8e3s4, index) === _Char___init__impl__6a9atx(10)) {
          return index;
        }
      }
       while (inductionVariable < last);
    return charSequenceLength(_this__u8e3s4);
  }
  function ceilToIntPx(_this__u8e3s4) {
    // Inline function 'kotlin.math.roundToInt' call
    // Inline function 'kotlin.math.ceil' call
    var this_0 = Math.ceil(_this__u8e3s4);
    return roundToInt(this_0);
  }
  var SNAPSHOTS_INTERVAL_MILLIS;
  function _InlineDensity___init__impl__1m7u8m(packedValue) {
    return packedValue;
  }
  function _get_packedValue__aj623s_0($this) {
    return $this;
  }
  function _InlineDensity___init__impl__1m7u8m_0(density, fontScale) {
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1 = toLong(toRawBits(density));
    var v2 = toLong(toRawBits(fontScale));
    var tmp$ret$0 = v1.kb(32).ob(v2.nb(new Long(-1, 0)));
    return _InlineDensity___init__impl__1m7u8m(tmp$ret$0);
  }
  function _InlineDensity___init__impl__1m7u8m_1(density) {
    return _InlineDensity___init__impl__1m7u8m_0(density.x35(), density.i36());
  }
  function _InlineDensity___get_density__impl__uz12rr($this) {
    // Inline function 'androidx.compose.ui.util.unpackFloat1' call
    // Inline function 'kotlin.fromBits' call
    var bits = _get_packedValue__aj623s_0($this).lb(32).ea();
    return floatFromBits(bits);
  }
  function _InlineDensity___get_fontScale__impl__ao594c($this) {
    // Inline function 'androidx.compose.ui.util.unpackFloat2' call
    // Inline function 'kotlin.fromBits' call
    var bits = _get_packedValue__aj623s_0($this).nb(new Long(-1, 0)).ea();
    return floatFromBits(bits);
  }
  function InlineDensity__toString_impl_9jhvwu($this) {
    return 'InlineDensity(density=' + _InlineDensity___get_density__impl__uz12rr($this) + ', fontScale=' + _InlineDensity___get_fontScale__impl__ao594c($this) + ')';
  }
  function Companion_8() {
    Companion_instance_11 = this;
    var tmp = this;
    tmp.waj_1 = _InlineDensity___init__impl__1m7u8m_0(NaN, NaN);
  }
  var Companion_instance_11;
  function Companion_getInstance_32() {
    if (Companion_instance_11 == null)
      new Companion_8();
    return Companion_instance_11;
  }
  function InlineDensity__hashCode_impl_vanspp($this) {
    return $this.hashCode();
  }
  function InlineDensity__equals_impl_ppdv5r($this, other) {
    if (!(other instanceof InlineDensity))
      return false;
    var tmp0_other_with_cast = other instanceof InlineDensity ? other.xaj_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function InlineDensity(packedValue) {
    Companion_getInstance_32();
    this.xaj_1 = packedValue;
  }
  protoOf(InlineDensity).toString = function () {
    return InlineDensity__toString_impl_9jhvwu(this.xaj_1);
  };
  protoOf(InlineDensity).hashCode = function () {
    return InlineDensity__hashCode_impl_vanspp(this.xaj_1);
  };
  protoOf(InlineDensity).equals = function (other) {
    return InlineDensity__equals_impl_ppdv5r(this.xaj_1, other);
  };
  function fixedCoerceHeightAndWidthForBits(_this__u8e3s4, width, height) {
    // Inline function 'kotlin.comparisons.minOf' call
    var safeWidth = Math.min(width, 262142);
    var tmp;
    if (safeWidth < 8191) {
      // Inline function 'kotlin.comparisons.minOf' call
      tmp = Math.min(height, 262142);
    } else if (safeWidth < 32767) {
      // Inline function 'kotlin.comparisons.minOf' call
      tmp = Math.min(height, 65534);
    } else if (safeWidth < 65535) {
      // Inline function 'kotlin.comparisons.minOf' call
      tmp = Math.min(height, 32766);
    } else {
      // Inline function 'kotlin.comparisons.minOf' call
      tmp = Math.min(height, 8190);
    }
    var safeHeight = tmp;
    return _this__u8e3s4.u35(safeWidth, safeHeight);
  }
  function finalConstraints(constraints, softWrap, overflow, maxIntrinsicWidth) {
    return Constraints_0(VOID, finalMaxWidth(constraints, softWrap, overflow, maxIntrinsicWidth), VOID, _Constraints___get_maxHeight__impl__dt3e8z(constraints));
  }
  function finalMaxLines(softWrap, overflow, maxLinesIn) {
    var overwriteMaxLines = !softWrap ? overflow === Companion_getInstance_16().p4l_1 : false;
    return overwriteMaxLines ? 1 : coerceAtLeast(maxLinesIn, 1);
  }
  function finalMaxWidth(constraints, softWrap, overflow, maxIntrinsicWidth) {
    var widthMatters = softWrap ? true : overflow === Companion_getInstance_16().p4l_1;
    var tmp;
    if (widthMatters ? _Constraints___get_hasBoundedWidth__impl__7hd0wr(constraints) : false) {
      tmp = _Constraints___get_maxWidth__impl__uuyqc(constraints);
    } else {
      Companion_getInstance_0();
      tmp = 2147483647;
    }
    var maxWidth = tmp;
    var tmp_0;
    if (_Constraints___get_minWidth__impl__hi9lfi(constraints) === maxWidth) {
      tmp_0 = maxWidth;
    } else {
      tmp_0 = coerceIn(ceilToIntPx(maxIntrinsicWidth), _Constraints___get_minWidth__impl__hi9lfi(constraints), maxWidth);
    }
    return tmp_0;
  }
  function get_EmptyTextReplacement() {
    _init_properties_MinLinesConstrainer_kt__odtdjv();
    return EmptyTextReplacement;
  }
  var EmptyTextReplacement;
  function get_TwoLineTextReplacement() {
    _init_properties_MinLinesConstrainer_kt__odtdjv();
    return TwoLineTextReplacement;
  }
  var TwoLineTextReplacement;
  function Companion_9() {
    this.yaj_1 = null;
  }
  protoOf(Companion_9).zaj = function (minMaxUtil, layoutDirection, paramStyle, density, fontFamilyResolver) {
    if (minMaxUtil == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (((layoutDirection.equals(minMaxUtil.aak_1) ? paramStyle.equals(minMaxUtil.bak_1) : false) ? density.x35() === minMaxUtil.cak_1.x35() : false) ? fontFamilyResolver === minMaxUtil.dak_1 : false) {
        return minMaxUtil;
      }
    }
    var tmp1_safe_receiver = this.yaj_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp_0;
      if (((layoutDirection.equals(tmp1_safe_receiver.aak_1) ? paramStyle.equals(tmp1_safe_receiver.bak_1) : false) ? density.x35() === tmp1_safe_receiver.cak_1.x35() : false) ? fontFamilyResolver === tmp1_safe_receiver.dak_1 : false) {
        return tmp1_safe_receiver;
      }
    }
    // Inline function 'kotlin.also' call
    var this_0 = new MinLinesConstrainer(layoutDirection, resolveDefaults(paramStyle, layoutDirection), density, fontFamilyResolver);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.modifiers.Companion.from.<anonymous>' call
    Companion_instance_12.yaj_1 = this_0;
    return this_0;
  };
  var Companion_instance_12;
  function Companion_getInstance_33() {
    return Companion_instance_12;
  }
  function MinLinesConstrainer(layoutDirection, inputTextStyle, density, fontFamilyResolver) {
    this.aak_1 = layoutDirection;
    this.bak_1 = inputTextStyle;
    this.cak_1 = density;
    this.dak_1 = fontFamilyResolver;
    this.eak_1 = resolveDefaults(this.bak_1, this.aak_1);
    var tmp = this;
    tmp.fak_1 = NaN;
    var tmp_0 = this;
    tmp_0.gak_1 = NaN;
  }
  protoOf(MinLinesConstrainer).hak = function (inConstraints, minLines) {
    var oneLineHeight = this.gak_1;
    var lineHeight = this.fak_1;
    if (isNaN_0(oneLineHeight) ? true : isNaN_0(lineHeight)) {
      oneLineHeight = Paragraph(get_EmptyTextReplacement(), this.eak_1, Constraints_0(), this.cak_1, this.dak_1, VOID, VOID, 1, false).f34();
      var twoLineHeight = Paragraph(get_TwoLineTextReplacement(), this.eak_1, Constraints_0(), this.cak_1, this.dak_1, VOID, VOID, 2, false).f34();
      lineHeight = twoLineHeight - oneLineHeight;
      this.gak_1 = oneLineHeight;
      this.fak_1 = lineHeight;
    }
    var tmp;
    if (!(minLines === 1)) {
      // Inline function 'kotlin.math.roundToInt' call
      var this_0 = oneLineHeight + lineHeight * (minLines - 1 | 0);
      var tmp$ret$0 = roundToInt(this_0);
      tmp = coerceAtMost(coerceAtLeast(tmp$ret$0, 0), _Constraints___get_maxHeight__impl__dt3e8z(inConstraints));
    } else {
      tmp = _Constraints___get_minHeight__impl__ev4bgx(inConstraints);
    }
    var minHeight = tmp;
    var tmp0_maxHeight = _Constraints___get_maxHeight__impl__dt3e8z(inConstraints);
    var tmp1_minWidth = _Constraints___get_minWidth__impl__hi9lfi(inConstraints);
    var tmp2_maxWidth = _Constraints___get_maxWidth__impl__uuyqc(inConstraints);
    return Constraints_0(tmp1_minWidth, tmp2_maxWidth, minHeight, tmp0_maxHeight);
  };
  var properties_initialized_MinLinesConstrainer_kt_uvu6cn;
  function _init_properties_MinLinesConstrainer_kt__odtdjv() {
    if (!properties_initialized_MinLinesConstrainer_kt_uvu6cn) {
      properties_initialized_MinLinesConstrainer_kt_uvu6cn = true;
      EmptyTextReplacement = repeat('H', 10);
      TwoLineTextReplacement = get_EmptyTextReplacement() + '\n' + get_EmptyTextReplacement();
    }
  }
  function textLayoutResult($this, layoutDirection, finalConstraints, multiParagraph) {
    // Inline function 'kotlin.math.min' call
    var a = multiParagraph.j45_1.e3k();
    var b = multiParagraph.m45_1;
    var layoutWidth = Math.min(a, b);
    var tmp = $this.iak_1;
    var tmp_0 = $this.jak_1;
    // Inline function 'kotlin.collections.orEmpty' call
    var tmp0_elvis_lhs = $this.pak_1;
    var tmp$ret$1 = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    return new TextLayoutResult(TextLayoutInput_init_$Create$(tmp, tmp_0, tmp$ret$1, $this.nak_1, $this.mak_1, $this.lak_1, ensureNotNull($this.sak_1), layoutDirection, $this.kak_1, finalConstraints), multiParagraph, constrain(finalConstraints, IntSize_0(ceilToIntPx(layoutWidth), ceilToIntPx(multiParagraph.n45_1))));
  }
  function setLayoutDirection($this, layoutDirection) {
    var localIntrinsics = $this.tak_1;
    var tmp;
    if ((localIntrinsics == null ? true : !layoutDirection.equals($this.uak_1)) ? true : localIntrinsics.o47()) {
      $this.uak_1 = layoutDirection;
      var tmp0_annotatedString = $this.iak_1;
      var tmp1_style = resolveDefaults($this.jak_1, layoutDirection);
      var tmp2_density = ensureNotNull($this.sak_1);
      var tmp3_fontFamilyResolver = $this.kak_1;
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_elvis_lhs = $this.pak_1;
      var tmp4_placeholders = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
      tmp = new MultiParagraphIntrinsics(tmp0_annotatedString, tmp1_style, tmp4_placeholders, tmp2_density, tmp3_fontFamilyResolver);
    } else {
      tmp = localIntrinsics;
    }
    var intrinsics = tmp;
    $this.tak_1 = intrinsics;
    return intrinsics;
  }
  function layoutText($this, constraints, layoutDirection) {
    var localParagraphIntrinsics = setLayoutDirection($this, layoutDirection);
    return new MultiParagraph(localParagraphIntrinsics, finalConstraints(constraints, $this.mak_1, $this.lak_1, localParagraphIntrinsics.e3k()), finalMaxLines($this.mak_1, $this.lak_1, $this.nak_1), $this.lak_1 === Companion_getInstance_16().p4l_1);
  }
  function newLayoutWillBeDifferent(_this__u8e3s4, $this, constraints, layoutDirection) {
    if (_this__u8e3s4 == null)
      return true;
    if (_this__u8e3s4.h4b_1.j45_1.o47())
      return true;
    if (!layoutDirection.equals(_this__u8e3s4.g4b_1.z4b_1))
      return true;
    if (equals(constraints, _this__u8e3s4.g4b_1.b4c_1))
      return false;
    if (!(_Constraints___get_maxWidth__impl__uuyqc(constraints) === _Constraints___get_maxWidth__impl__uuyqc(_this__u8e3s4.g4b_1.b4c_1)))
      return true;
    if (_Constraints___get_maxHeight__impl__dt3e8z(constraints) < _this__u8e3s4.h4b_1.n45_1 ? true : _this__u8e3s4.h4b_1.l45_1) {
      return true;
    }
    return false;
  }
  function markDirty($this) {
    $this.tak_1 = null;
    $this.vak_1 = null;
    $this.xak_1 = -1;
    $this.wak_1 = -1;
  }
  function MultiParagraphLayoutCache(text, style, fontFamilyResolver, overflow, softWrap, maxLines, minLines, placeholders) {
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    placeholders = placeholders === VOID ? null : placeholders;
    this.iak_1 = text;
    this.jak_1 = style;
    this.kak_1 = fontFamilyResolver;
    this.lak_1 = overflow;
    this.mak_1 = softWrap;
    this.nak_1 = maxLines;
    this.oak_1 = minLines;
    this.pak_1 = placeholders;
    this.qak_1 = null;
    this.rak_1 = Companion_getInstance_32().waj_1;
    this.sak_1 = null;
    this.tak_1 = null;
    this.uak_1 = null;
    this.vak_1 = null;
    this.wak_1 = -1;
    this.xak_1 = -1;
  }
  protoOf(MultiParagraphLayoutCache).yak = function (value) {
    var localField = this.sak_1;
    var tmp;
    if (value == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.modifiers.MultiParagraphLayoutCache.<set-density>.<anonymous>' call
      tmp = _InlineDensity___init__impl__1m7u8m_1(value);
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_0;
    var tmp_1 = tmp1_elvis_lhs;
    if ((tmp_1 == null ? null : new InlineDensity(tmp_1)) == null) {
      tmp_0 = Companion_getInstance_32().waj_1;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var newDensity = tmp_0;
    if (localField == null) {
      this.sak_1 = value;
      this.rak_1 = newDensity;
      return Unit_instance;
    }
    if (value == null ? true : !equals(this.rak_1, newDensity)) {
      this.sak_1 = value;
      this.rak_1 = newDensity;
      markDirty(this);
    }
  };
  protoOf(MultiParagraphLayoutCache).zak = function () {
    var tmp0_elvis_lhs = this.vak_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('You must call layoutWithConstraints first');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MultiParagraphLayoutCache).aal = function () {
    return this.vak_1;
  };
  protoOf(MultiParagraphLayoutCache).bal = function (constraints, layoutDirection) {
    var tmp;
    if (this.oak_1 > 1) {
      // Inline function 'kotlin.also' call
      var this_0 = Companion_instance_12.zaj(this.qak_1, layoutDirection, this.jak_1, ensureNotNull(this.sak_1), this.kak_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.modifiers.MultiParagraphLayoutCache.layoutWithConstraints.<anonymous>' call
      this.qak_1 = this_0;
      var localMin = this_0;
      tmp = localMin.hak(constraints, this.oak_1);
    } else {
      tmp = constraints;
    }
    var finalConstraints = tmp;
    if (!newLayoutWillBeDifferent(this.vak_1, this, finalConstraints, layoutDirection)) {
      if (equals(finalConstraints, ensureNotNull(this.vak_1).g4b_1.b4c_1))
        return false;
      this.vak_1 = textLayoutResult(this, layoutDirection, finalConstraints, ensureNotNull(this.vak_1).h4b_1);
      return true;
    }
    var multiParagraph = layoutText(this, finalConstraints, layoutDirection);
    this.vak_1 = textLayoutResult(this, layoutDirection, finalConstraints, multiParagraph);
    return true;
  };
  protoOf(MultiParagraphLayoutCache).cal = function (text, style, fontFamilyResolver, overflow, softWrap, maxLines, minLines, placeholders) {
    this.iak_1 = text;
    this.jak_1 = style;
    this.kak_1 = fontFamilyResolver;
    this.lak_1 = overflow;
    this.mak_1 = softWrap;
    this.nak_1 = maxLines;
    this.oak_1 = minLines;
    this.pak_1 = placeholders;
    markDirty(this);
  };
  function setLayoutDirection_0($this, layoutDirection) {
    var localIntrinsics = $this.qal_1;
    var tmp;
    if ((localIntrinsics == null ? true : !layoutDirection.equals($this.ral_1)) ? true : localIntrinsics.o47()) {
      $this.ral_1 = layoutDirection;
      tmp = ParagraphIntrinsics($this.dal_1, resolveDefaults($this.eal_1, layoutDirection), VOID, VOID, ensureNotNull($this.lal_1), $this.fal_1);
    } else {
      tmp = localIntrinsics;
    }
    var intrinsics = tmp;
    $this.qal_1 = intrinsics;
    return intrinsics;
  }
  function layoutText_0($this, constraints, layoutDirection) {
    var localParagraphIntrinsics = setLayoutDirection_0($this, layoutDirection);
    return Paragraph_0(localParagraphIntrinsics, finalConstraints(constraints, $this.hal_1, $this.gal_1, localParagraphIntrinsics.e3k()), finalMaxLines($this.hal_1, $this.gal_1, $this.ial_1), $this.gal_1 === Companion_getInstance_16().p4l_1);
  }
  function newLayoutWillBeDifferent_0($this, constraints, layoutDirection) {
    var tmp0_elvis_lhs = $this.mal_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return true;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var localParagraph = tmp;
    var tmp1_elvis_lhs = $this.qal_1;
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return true;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var localParagraphIntrinsics = tmp_0;
    if (localParagraphIntrinsics.o47())
      return true;
    if (!layoutDirection.equals($this.ral_1))
      return true;
    if (equals(constraints, $this.sal_1))
      return false;
    if (!(_Constraints___get_maxWidth__impl__uuyqc(constraints) === _Constraints___get_maxWidth__impl__uuyqc($this.sal_1)))
      return true;
    if (_Constraints___get_maxHeight__impl__dt3e8z(constraints) < localParagraph.f34() ? true : localParagraph.f46()) {
      return true;
    }
    return false;
  }
  function markDirty_0($this) {
    $this.mal_1 = null;
    $this.qal_1 = null;
    $this.ral_1 = null;
    $this.tal_1 = -1;
    $this.ual_1 = -1;
    $this.sal_1 = Companion_getInstance_0().u35(0, 0);
    $this.oal_1 = IntSize_0(0, 0);
    $this.nal_1 = false;
  }
  function ParagraphLayoutCache(text, style, fontFamilyResolver, overflow, softWrap, maxLines, minLines) {
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    this.dal_1 = text;
    this.eal_1 = style;
    this.fal_1 = fontFamilyResolver;
    this.gal_1 = overflow;
    this.hal_1 = softWrap;
    this.ial_1 = maxLines;
    this.jal_1 = minLines;
    this.kal_1 = Companion_getInstance_32().waj_1;
    this.lal_1 = null;
    this.mal_1 = null;
    this.nal_1 = false;
    this.oal_1 = IntSize_0(0, 0);
    this.pal_1 = null;
    this.qal_1 = null;
    this.ral_1 = null;
    this.sal_1 = Companion_getInstance_0().u35(0, 0);
    this.tal_1 = -1;
    this.ual_1 = -1;
  }
  protoOf(ParagraphLayoutCache).yak = function (value) {
    var localField = this.lal_1;
    var tmp;
    if (value == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.modifiers.ParagraphLayoutCache.<set-density>.<anonymous>' call
      tmp = _InlineDensity___init__impl__1m7u8m_1(value);
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_0;
    var tmp_1 = tmp1_elvis_lhs;
    if ((tmp_1 == null ? null : new InlineDensity(tmp_1)) == null) {
      tmp_0 = Companion_getInstance_32().waj_1;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var newDensity = tmp_0;
    if (localField == null) {
      this.lal_1 = value;
      this.kal_1 = newDensity;
      return Unit_instance;
    }
    if (value == null ? true : !equals(this.kal_1, newDensity)) {
      this.lal_1 = value;
      this.kal_1 = newDensity;
      markDirty_0(this);
    }
  };
  protoOf(ParagraphLayoutCache).val = function () {
    var tmp0_safe_receiver = this.qal_1;
    if (tmp0_safe_receiver == null)
      null;
    else
      tmp0_safe_receiver.o47();
  };
  protoOf(ParagraphLayoutCache).bal = function (constraints, layoutDirection) {
    var tmp;
    if (this.jal_1 > 1) {
      // Inline function 'kotlin.also' call
      var this_0 = Companion_instance_12.zaj(this.pal_1, layoutDirection, this.eal_1, ensureNotNull(this.lal_1), this.fal_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.modifiers.ParagraphLayoutCache.layoutWithConstraints.<anonymous>' call
      this.pal_1 = this_0;
      var localMin = this_0;
      tmp = localMin.hak(constraints, this.jal_1);
    } else {
      tmp = constraints;
    }
    var finalConstraints = tmp;
    if (!newLayoutWillBeDifferent_0(this, finalConstraints, layoutDirection)) {
      if (!equals(finalConstraints, this.sal_1)) {
        var localParagraph = ensureNotNull(this.mal_1);
        // Inline function 'kotlin.math.min' call
        var a = localParagraph.e3k();
        var b = localParagraph.e34();
        var layoutWidth = Math.min(a, b);
        var localSize = constrain(finalConstraints, IntSize_0(ceilToIntPx(layoutWidth), ceilToIntPx(localParagraph.f34())));
        this.oal_1 = localSize;
        this.nal_1 = !(this.gal_1 === Companion_getInstance_16().q4l_1) ? _IntSize___get_width__impl__d9yl4o(localSize) < localParagraph.e34() ? true : _IntSize___get_height__impl__prv63b(localSize) < localParagraph.f34() : false;
        this.sal_1 = finalConstraints;
      }
      return false;
    }
    var tmp_0 = this;
    // Inline function 'kotlin.also' call
    var this_1 = layoutText_0(this, finalConstraints, layoutDirection);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.modifiers.ParagraphLayoutCache.layoutWithConstraints.<anonymous>' call
    this.sal_1 = finalConstraints;
    var localSize_0 = constrain(finalConstraints, IntSize_0(ceilToIntPx(this_1.e34()), ceilToIntPx(this_1.f34())));
    this.oal_1 = localSize_0;
    this.nal_1 = !(this.gal_1 === Companion_getInstance_16().q4l_1) ? _IntSize___get_width__impl__d9yl4o(localSize_0) < this_1.e34() ? true : _IntSize___get_height__impl__prv63b(localSize_0) < this_1.f34() : false;
    tmp_0.mal_1 = this_1;
    return true;
  };
  protoOf(ParagraphLayoutCache).wal = function (text, style, fontFamilyResolver, overflow, softWrap, maxLines, minLines) {
    this.dal_1 = text;
    this.eal_1 = style;
    this.fal_1 = fontFamilyResolver;
    this.gal_1 = overflow;
    this.hal_1 = softWrap;
    this.ial_1 = maxLines;
    this.jal_1 = minLines;
    markDirty_0(this);
  };
  protoOf(ParagraphLayoutCache).xal = function (style) {
    var tmp0_elvis_lhs = this.ral_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var localLayoutDirection = tmp;
    var tmp1_elvis_lhs = this.lal_1;
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return null;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var localDensity = tmp_0;
    var annotatedString = AnnotatedString_init_$Create$(this.dal_1);
    if (this.mal_1 == null)
      return null;
    if (this.qal_1 == null)
      return null;
    var finalConstraints = Constraints__copy$default_impl_f452rp(this.sal_1, 0, VOID, 0);
    return new TextLayoutResult(TextLayoutInput_init_$Create$(annotatedString, style, emptyList(), this.ial_1, this.hal_1, this.gal_1, localDensity, localLayoutDirection, this.fal_1, finalConstraints), new MultiParagraph(new MultiParagraphIntrinsics(annotatedString, style, emptyList(), localDensity, this.fal_1), finalConstraints, this.ial_1, this.gal_1 === Companion_getInstance_16().p4l_1), this.oal_1);
  };
  function SelectableTextAnnotatedStringElement(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, selectionController, color) {
    onTextLayout = onTextLayout === VOID ? null : onTextLayout;
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    placeholders = placeholders === VOID ? null : placeholders;
    onPlaceholderLayout = onPlaceholderLayout === VOID ? null : onPlaceholderLayout;
    selectionController = selectionController === VOID ? null : selectionController;
    color = color === VOID ? null : color;
    ModifierNodeElement.call(this);
    this.zal_1 = text;
    this.aam_1 = style;
    this.bam_1 = fontFamilyResolver;
    this.cam_1 = onTextLayout;
    this.dam_1 = overflow;
    this.eam_1 = softWrap;
    this.fam_1 = maxLines;
    this.gam_1 = minLines;
    this.ham_1 = placeholders;
    this.iam_1 = onPlaceholderLayout;
    this.jam_1 = selectionController;
    this.kam_1 = color;
  }
  protoOf(SelectableTextAnnotatedStringElement).g25 = function () {
    return new SelectableTextAnnotatedStringNode(this.zal_1, this.aam_1, this.bam_1, this.cam_1, this.dam_1, this.eam_1, this.fam_1, this.gam_1, this.ham_1, this.iam_1, this.jam_1, this.kam_1);
  };
  protoOf(SelectableTextAnnotatedStringElement).lam = function (node) {
    node.dan(this.zal_1, this.aam_1, this.ham_1, this.gam_1, this.fam_1, this.eam_1, this.bam_1, this.dam_1, this.cam_1, this.iam_1, this.jam_1, this.kam_1);
  };
  protoOf(SelectableTextAnnotatedStringElement).t4v = function (node) {
    return this.lam(node instanceof SelectableTextAnnotatedStringNode ? node : THROW_CCE());
  };
  protoOf(SelectableTextAnnotatedStringElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SelectableTextAnnotatedStringElement))
      return false;
    if (!equals(this.kam_1, other.kam_1))
      return false;
    if (!this.zal_1.equals(other.zal_1))
      return false;
    if (!this.aam_1.equals(other.aam_1))
      return false;
    if (!equals(this.ham_1, other.ham_1))
      return false;
    if (!equals(this.bam_1, other.bam_1))
      return false;
    if (!equals(this.cam_1, other.cam_1))
      return false;
    if (!(this.dam_1 === other.dam_1))
      return false;
    if (!(this.eam_1 === other.eam_1))
      return false;
    if (!(this.fam_1 === other.fam_1))
      return false;
    if (!(this.gam_1 === other.gam_1))
      return false;
    if (!equals(this.iam_1, other.iam_1))
      return false;
    if (!equals(this.jam_1, other.jam_1))
      return false;
    return true;
  };
  protoOf(SelectableTextAnnotatedStringElement).hashCode = function () {
    var result = this.zal_1.hashCode();
    result = imul(31, result) + this.aam_1.hashCode() | 0;
    result = imul(31, result) + hashCode(this.bam_1) | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.cam_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + TextOverflow__hashCode_impl_kqdwgt(this.dam_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.eam_1) | 0;
    result = imul(31, result) + this.fam_1 | 0;
    result = imul(31, result) + this.gam_1 | 0;
    var tmp_0 = imul(31, result);
    var tmp2_safe_receiver = this.ham_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : hashCode(tmp2_safe_receiver);
    result = tmp_0 + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    var tmp_1 = imul(31, result);
    var tmp4_safe_receiver = this.iam_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : hashCode(tmp4_safe_receiver);
    result = tmp_1 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
    var tmp_2 = imul(31, result);
    var tmp6_safe_receiver = this.jam_1;
    var tmp7_elvis_lhs = tmp6_safe_receiver == null ? null : hashCode(tmp6_safe_receiver);
    result = tmp_2 + (tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs) | 0;
    var tmp_3 = imul(31, result);
    var tmp8_safe_receiver = this.kam_1;
    var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : hashCode(tmp8_safe_receiver);
    result = tmp_3 + (tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs) | 0;
    return result;
  };
  protoOf(SelectableTextAnnotatedStringElement).toString = function () {
    return 'SelectableTextAnnotatedStringElement(text=' + this.zal_1 + ', style=' + this.aam_1 + ', fontFamilyResolver=' + this.bam_1 + ', onTextLayout=' + this.cam_1 + ', overflow=' + new TextOverflow(this.dam_1) + ', softWrap=' + this.eam_1 + ', maxLines=' + this.fam_1 + ', minLines=' + this.gam_1 + ', placeholders=' + this.ham_1 + ', onPlaceholderLayout=' + this.iam_1 + ', selectionController=' + this.jam_1 + ', color=' + this.kam_1 + ')';
  };
  function SelectableTextAnnotatedStringNode(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, selectionController, overrideColor) {
    onTextLayout = onTextLayout === VOID ? null : onTextLayout;
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    placeholders = placeholders === VOID ? null : placeholders;
    onPlaceholderLayout = onPlaceholderLayout === VOID ? null : onPlaceholderLayout;
    selectionController = selectionController === VOID ? null : selectionController;
    overrideColor = overrideColor === VOID ? null : overrideColor;
    DelegatingNode.call(this);
    this.ban_1 = selectionController;
    this.can_1 = this.f63(new TextAnnotatedStringNode(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, this.ban_1, overrideColor));
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      // Inline function 'kotlin.contracts.contract' call
      if (this.ban_1 == null) {
        // Inline function 'androidx.compose.foundation.text.modifiers.SelectableTextAnnotatedStringNode.<anonymous>' call
        var message = 'Do not use SelectionCapableStaticTextModifier unless selectionController != null';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        break $l$block;
      }
    }
  }
  protoOf(SelectableTextAnnotatedStringNode).l5s = function (coordinates) {
    var tmp0_safe_receiver = this.ban_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.ean(coordinates);
    }
  };
  protoOf(SelectableTextAnnotatedStringNode).b4v = function (_this__u8e3s4) {
    return this.can_1.iao(_this__u8e3s4);
  };
  protoOf(SelectableTextAnnotatedStringNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    return this.can_1.jao(_this__u8e3s4, measurable, constraints);
  };
  protoOf(SelectableTextAnnotatedStringNode).dan = function (text, style, placeholders, minLines, maxLines, softWrap, fontFamilyResolver, overflow, onTextLayout, onPlaceholderLayout, selectionController, color) {
    this.can_1.oao(this.can_1.kao(color, style), this.can_1.lao(text), this.can_1.mao(style, placeholders, minLines, maxLines, softWrap, fontFamilyResolver, overflow), this.can_1.nao(onTextLayout, onPlaceholderLayout, selectionController));
    this.ban_1 = selectionController;
    invalidateMeasurement(this);
  };
  function SelectionController$modifier$lambda(this$0) {
    return function () {
      return this$0.raj_1.pao_1;
    };
  }
  function SelectionController$onRemembered$lambda(this$0) {
    return function () {
      return this$0.raj_1.pao_1;
    };
  }
  function SelectionController$onRemembered$lambda_0(this$0) {
    return function () {
      return this$0.raj_1.qao_1;
    };
  }
  function SelectionController(selectableId, selectionRegistrar, backgroundSelectionColor, params) {
    params = params === VOID ? Companion_getInstance_34().rao_1 : params;
    this.oaj_1 = selectableId;
    this.paj_1 = selectionRegistrar;
    this.qaj_1 = backgroundSelectionColor;
    this.raj_1 = params;
    this.saj_1 = null;
    var tmp = this;
    tmp.taj_1 = textPointerHoverIcon(makeSelectionModifier(this.paj_1, this.oaj_1, SelectionController$modifier$lambda(this)), this.paj_1);
  }
  protoOf(SelectionController).g1w = function () {
    var tmp = this;
    var tmp_0 = SelectionController$onRemembered$lambda(this);
    tmp.saj_1 = this.paj_1.sao(new MultiWidgetSelectionDelegate(this.oaj_1, tmp_0, SelectionController$onRemembered$lambda_0(this)));
  };
  protoOf(SelectionController).i1w = function () {
    var localSelectable = this.saj_1;
    if (!(localSelectable == null)) {
      this.paj_1.tao(localSelectable);
      this.saj_1 = null;
    }
  };
  protoOf(SelectionController).h1w = function () {
    var localSelectable = this.saj_1;
    if (!(localSelectable == null)) {
      this.paj_1.tao(localSelectable);
      this.saj_1 = null;
    }
  };
  protoOf(SelectionController).uao = function (textLayoutResult) {
    this.raj_1 = this.raj_1.vao(VOID, textLayoutResult);
  };
  protoOf(SelectionController).ean = function (coordinates) {
    this.raj_1 = this.raj_1.vao(coordinates);
    this.paj_1.wao(this.oaj_1);
  };
  protoOf(SelectionController).xao = function (drawScope) {
    var tmp0_elvis_lhs = this.paj_1.yao().z2(this.oaj_1);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var selection = tmp;
    var tmp_0;
    if (!selection.eap_1) {
      tmp_0 = selection.cap_1.aap_1;
    } else {
      tmp_0 = selection.dap_1.aap_1;
    }
    var start = tmp_0;
    var tmp_1;
    if (!selection.eap_1) {
      tmp_1 = selection.dap_1.aap_1;
    } else {
      tmp_1 = selection.cap_1.aap_1;
    }
    var end = tmp_1;
    if (start === end)
      return Unit_instance;
    var tmp1_safe_receiver = this.saj_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.fap();
    var lastOffset = tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs;
    var clippedStart = coerceAtMost(start, lastOffset);
    var clippedEnd = coerceAtMost(end, lastOffset);
    var tmp3_elvis_lhs = this.raj_1.z45(clippedStart, clippedEnd);
    var tmp_2;
    if (tmp3_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp_2 = tmp3_elvis_lhs;
    }
    var selectionPath = tmp_2;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    var tmp_3;
    if (this.raj_1.gap()) {
      // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect' call
      var right = _Size___get_width__impl__58y75t(drawScope.g34());
      var bottom = _Size___get_height__impl__a04p02(drawScope.g34());
      var clipOp = Companion_getInstance_18().j3s_1;
      // Inline function 'androidx.compose.ui.graphics.drawscope.withTransform' call
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = drawScope.b43();
      var previousSize = $this$with.g34();
      $this$with.f3h().a3s();
      // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect.<anonymous>' call
      $this$with.z42().g3s(0.0, 0.0, right, bottom, clipOp);
      // Inline function 'androidx.compose.foundation.text.modifiers.SelectionController.draw.<anonymous>.<anonymous>' call
      drawScope.i43(selectionPath, this.qaj_1);
      $this$with.f3h().b3s();
      $this$with.y42(previousSize);
      tmp_3 = Unit_instance;
    } else {
      drawScope.i43(selectionPath, this.qaj_1);
      tmp_3 = Unit_instance;
    }
  };
  function Companion_10() {
    Companion_instance_13 = this;
    this.rao_1 = new StaticTextSelectionParams(null, null);
  }
  var Companion_instance_13;
  function Companion_getInstance_34() {
    if (Companion_instance_13 == null)
      new Companion_10();
    return Companion_instance_13;
  }
  function StaticTextSelectionParams(layoutCoordinates, textLayoutResult) {
    Companion_getInstance_34();
    this.pao_1 = layoutCoordinates;
    this.qao_1 = textLayoutResult;
  }
  protoOf(StaticTextSelectionParams).z45 = function (start, end) {
    var tmp0_safe_receiver = this.qao_1;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z45(start, end);
  };
  protoOf(StaticTextSelectionParams).gap = function () {
    var tmp0_safe_receiver = this.qao_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.modifiers.StaticTextSelectionParams.<get-shouldClip>.<anonymous>' call
      tmp = !(tmp0_safe_receiver.g4b_1.x4b_1 === Companion_getInstance_16().q4l_1) ? tmp0_safe_receiver.o4b() : false;
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
  };
  protoOf(StaticTextSelectionParams).hap = function (layoutCoordinates, textLayoutResult) {
    return new StaticTextSelectionParams(layoutCoordinates, textLayoutResult);
  };
  protoOf(StaticTextSelectionParams).vao = function (layoutCoordinates, textLayoutResult, $super) {
    layoutCoordinates = layoutCoordinates === VOID ? this.pao_1 : layoutCoordinates;
    textLayoutResult = textLayoutResult === VOID ? this.qao_1 : textLayoutResult;
    return $super === VOID ? this.hap(layoutCoordinates, textLayoutResult) : $super.hap.call(this, layoutCoordinates, textLayoutResult);
  };
  function makeDefaultSelectionModifier(_this__u8e3s4, selectableId, layoutCoordinates) {
    var longPressDragObserver = new makeDefaultSelectionModifier$longPressDragObserver$1(layoutCoordinates, _this__u8e3s4, selectableId);
    var mouseSelectionObserver = new makeDefaultSelectionModifier$mouseSelectionObserver$1(layoutCoordinates, _this__u8e3s4, selectableId);
    return selectionGestureInput(Companion_instance, mouseSelectionObserver, longPressDragObserver);
  }
  function makeDefaultSelectionModifier$longPressDragObserver$1($layoutCoordinates, $this_makeDefaultSelectionModifier, $selectableId) {
    this.kap_1 = $layoutCoordinates;
    this.lap_1 = $this_makeDefaultSelectionModifier;
    this.map_1 = $selectableId;
    this.iap_1 = Companion_getInstance_1().u33_1;
    this.jap_1 = Companion_getInstance_1().u33_1;
  }
  protoOf(makeDefaultSelectionModifier$longPressDragObserver$1).nap = function (startPoint) {
    var tmp0_safe_receiver = this.kap_1();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (!tmp0_safe_receiver.k54())
        return Unit_instance;
      this.lap_1.tap(tmp0_safe_receiver, startPoint, Companion_getInstance_35().qap_1, true);
      this.iap_1 = startPoint;
    }
    if (!hasSelection(this.lap_1, this.map_1))
      return Unit_instance;
    this.jap_1 = Companion_getInstance_1().u33_1;
  };
  protoOf(makeDefaultSelectionModifier$longPressDragObserver$1).uap = function (delta) {
    var tmp0_safe_receiver = this.kap_1();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (!tmp0_safe_receiver.k54())
        return Unit_instance;
      if (!hasSelection(this.lap_1, this.map_1))
        return Unit_instance;
      this.jap_1 = Offset__plus_impl_c78cg0(this.jap_1, delta);
      var newPosition = Offset__plus_impl_c78cg0(this.iap_1, this.jap_1);
      var tmp1_previousPosition = this.iap_1;
      var tmp2_adjustment = Companion_getInstance_35().sap_1;
      var consumed = this.lap_1.vap(tmp0_safe_receiver, newPosition, tmp1_previousPosition, false, tmp2_adjustment, true);
      var tmp;
      if (consumed) {
        this.iap_1 = newPosition;
        this.jap_1 = Companion_getInstance_1().u33_1;
        tmp = Unit_instance;
      }
    }
  };
  protoOf(makeDefaultSelectionModifier$longPressDragObserver$1).wap = function () {
    if (hasSelection(this.lap_1, this.map_1)) {
      this.lap_1.xap();
    }
  };
  protoOf(makeDefaultSelectionModifier$longPressDragObserver$1).e62 = function () {
    if (hasSelection(this.lap_1, this.map_1)) {
      this.lap_1.xap();
    }
  };
  function makeDefaultSelectionModifier$mouseSelectionObserver$1($layoutCoordinates, $this_makeDefaultSelectionModifier, $selectableId) {
    this.zap_1 = $layoutCoordinates;
    this.aaq_1 = $this_makeDefaultSelectionModifier;
    this.baq_1 = $selectableId;
    this.yap_1 = Companion_getInstance_1().u33_1;
  }
  protoOf(makeDefaultSelectionModifier$mouseSelectionObserver$1).caq = function (downPosition) {
    var tmp0_safe_receiver = this.zap_1();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (!tmp0_safe_receiver.k54())
        return false;
      var consumed = this.aaq_1.vap(tmp0_safe_receiver, downPosition, this.yap_1, false, Companion_getInstance_35().oap_1, false);
      if (consumed) {
        this.yap_1 = downPosition;
      }
      return hasSelection(this.aaq_1, this.baq_1);
    }
    return false;
  };
  protoOf(makeDefaultSelectionModifier$mouseSelectionObserver$1).daq = function (dragPosition) {
    var tmp0_safe_receiver = this.zap_1();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (!tmp0_safe_receiver.k54())
        return false;
      if (!hasSelection(this.aaq_1, this.baq_1))
        return false;
      var consumed = this.aaq_1.vap(tmp0_safe_receiver, dragPosition, this.yap_1, false, Companion_getInstance_35().oap_1, false);
      var tmp;
      if (consumed) {
        this.yap_1 = dragPosition;
        tmp = Unit_instance;
      }
    }
    return true;
  };
  protoOf(makeDefaultSelectionModifier$mouseSelectionObserver$1).eaq = function (downPosition, adjustment) {
    var tmp0_safe_receiver = this.zap_1();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (!tmp0_safe_receiver.k54())
        return false;
      this.aaq_1.tap(tmp0_safe_receiver, downPosition, adjustment, false);
      this.yap_1 = downPosition;
      return hasSelection(this.aaq_1, this.baq_1);
    }
    return false;
  };
  protoOf(makeDefaultSelectionModifier$mouseSelectionObserver$1).faq = function (dragPosition, adjustment) {
    var tmp0_safe_receiver = this.zap_1();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      if (!tmp0_safe_receiver.k54())
        return false;
      if (!hasSelection(this.aaq_1, this.baq_1))
        return false;
      var tmp0_previousPosition = this.yap_1;
      var consumed = this.aaq_1.vap(tmp0_safe_receiver, dragPosition, tmp0_previousPosition, false, adjustment, false);
      var tmp;
      if (consumed) {
        this.yap_1 = dragPosition;
        tmp = Unit_instance;
      }
    }
    return true;
  };
  protoOf(makeDefaultSelectionModifier$mouseSelectionObserver$1).gaq = function () {
    this.aaq_1.xap();
  };
  function TextAnnotatedStringElement(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, selectionController, color) {
    onTextLayout = onTextLayout === VOID ? null : onTextLayout;
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    placeholders = placeholders === VOID ? null : placeholders;
    onPlaceholderLayout = onPlaceholderLayout === VOID ? null : onPlaceholderLayout;
    selectionController = selectionController === VOID ? null : selectionController;
    color = color === VOID ? null : color;
    ModifierNodeElement.call(this);
    this.iaq_1 = text;
    this.jaq_1 = style;
    this.kaq_1 = fontFamilyResolver;
    this.laq_1 = onTextLayout;
    this.maq_1 = overflow;
    this.naq_1 = softWrap;
    this.oaq_1 = maxLines;
    this.paq_1 = minLines;
    this.qaq_1 = placeholders;
    this.raq_1 = onPlaceholderLayout;
    this.saq_1 = selectionController;
    this.taq_1 = color;
  }
  protoOf(TextAnnotatedStringElement).g25 = function () {
    return new TextAnnotatedStringNode(this.iaq_1, this.jaq_1, this.kaq_1, this.laq_1, this.maq_1, this.naq_1, this.oaq_1, this.paq_1, this.qaq_1, this.raq_1, this.saq_1, this.taq_1);
  };
  protoOf(TextAnnotatedStringElement).uaq = function (node) {
    node.oao(node.kao(this.taq_1, this.jaq_1), node.lao(this.iaq_1), node.mao(this.jaq_1, this.qaq_1, this.paq_1, this.oaq_1, this.naq_1, this.kaq_1, this.maq_1), node.nao(this.laq_1, this.raq_1, this.saq_1));
  };
  protoOf(TextAnnotatedStringElement).t4v = function (node) {
    return this.uaq(node instanceof TextAnnotatedStringNode ? node : THROW_CCE());
  };
  protoOf(TextAnnotatedStringElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextAnnotatedStringElement))
      return false;
    if (!equals(this.taq_1, other.taq_1))
      return false;
    if (!this.iaq_1.equals(other.iaq_1))
      return false;
    if (!this.jaq_1.equals(other.jaq_1))
      return false;
    if (!equals(this.qaq_1, other.qaq_1))
      return false;
    if (!equals(this.kaq_1, other.kaq_1))
      return false;
    if (!equals(this.laq_1, other.laq_1))
      return false;
    if (!(this.maq_1 === other.maq_1))
      return false;
    if (!(this.naq_1 === other.naq_1))
      return false;
    if (!(this.oaq_1 === other.oaq_1))
      return false;
    if (!(this.paq_1 === other.paq_1))
      return false;
    if (!equals(this.raq_1, other.raq_1))
      return false;
    if (!equals(this.saq_1, other.saq_1))
      return false;
    return true;
  };
  protoOf(TextAnnotatedStringElement).hashCode = function () {
    var result = this.iaq_1.hashCode();
    result = imul(31, result) + this.jaq_1.hashCode() | 0;
    result = imul(31, result) + hashCode(this.kaq_1) | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.laq_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + TextOverflow__hashCode_impl_kqdwgt(this.maq_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.naq_1) | 0;
    result = imul(31, result) + this.oaq_1 | 0;
    result = imul(31, result) + this.paq_1 | 0;
    var tmp_0 = imul(31, result);
    var tmp2_safe_receiver = this.qaq_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : hashCode(tmp2_safe_receiver);
    result = tmp_0 + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    var tmp_1 = imul(31, result);
    var tmp4_safe_receiver = this.raq_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : hashCode(tmp4_safe_receiver);
    result = tmp_1 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
    var tmp_2 = imul(31, result);
    var tmp6_safe_receiver = this.saq_1;
    var tmp7_elvis_lhs = tmp6_safe_receiver == null ? null : hashCode(tmp6_safe_receiver);
    result = tmp_2 + (tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs) | 0;
    var tmp_3 = imul(31, result);
    var tmp8_safe_receiver = this.taq_1;
    var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : hashCode(tmp8_safe_receiver);
    result = tmp_3 + (tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs) | 0;
    return result;
  };
  function _get_layoutCache__kch9ev($this) {
    if ($this.fao_1 == null) {
      $this.fao_1 = new MultiParagraphLayoutCache($this.san_1, $this.tan_1, $this.uan_1, $this.wan_1, $this.xan_1, $this.yan_1, $this.zan_1, $this.aao_1);
    }
    return ensureNotNull($this.fao_1);
  }
  function getLayoutCache($this, density) {
    var tmp0_safe_receiver = _get_textSubstitution__7vuyf3($this);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (tmp0_safe_receiver.xaq_1) {
        var tmp0_safe_receiver_0 = tmp0_safe_receiver.yaq_1;
        if (tmp0_safe_receiver_0 == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'kotlin.also' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.foundation.text.modifiers.TextAnnotatedStringNode.getLayoutCache.<anonymous>.<anonymous>.<anonymous>' call
          tmp0_safe_receiver_0.yak(density);
          return tmp0_safe_receiver_0;
        }
        tmp = Unit_instance;
      }
    }
    // Inline function 'kotlin.also' call
    var this_0 = _get_layoutCache__kch9ev($this);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.modifiers.TextAnnotatedStringNode.getLayoutCache.<anonymous>' call
    this_0.yak(density);
    return this_0;
  }
  function TextSubstitutionValue(original, substitution, isShowingSubstitution, layoutCache) {
    isShowingSubstitution = isShowingSubstitution === VOID ? false : isShowingSubstitution;
    layoutCache = layoutCache === VOID ? null : layoutCache;
    this.vaq_1 = original;
    this.waq_1 = substitution;
    this.xaq_1 = isShowingSubstitution;
    this.yaq_1 = layoutCache;
  }
  protoOf(TextSubstitutionValue).toString = function () {
    return 'TextSubstitutionValue(original=' + this.vaq_1 + ', substitution=' + this.waq_1 + ', isShowingSubstitution=' + this.xaq_1 + ', layoutCache=' + this.yaq_1 + ')';
  };
  protoOf(TextSubstitutionValue).hashCode = function () {
    var result = this.vaq_1.hashCode();
    result = imul(result, 31) + this.waq_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.xaq_1) | 0;
    result = imul(result, 31) + (this.yaq_1 == null ? 0 : hashCode(this.yaq_1)) | 0;
    return result;
  };
  protoOf(TextSubstitutionValue).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextSubstitutionValue))
      return false;
    var tmp0_other_with_cast = other instanceof TextSubstitutionValue ? other : THROW_CCE();
    if (!this.vaq_1.equals(tmp0_other_with_cast.vaq_1))
      return false;
    if (!this.waq_1.equals(tmp0_other_with_cast.waq_1))
      return false;
    if (!(this.xaq_1 === tmp0_other_with_cast.xaq_1))
      return false;
    if (!equals(this.yaq_1, tmp0_other_with_cast.yaq_1))
      return false;
    return true;
  };
  function _set_textSubstitution__y24uh9($this, _set____db54di) {
    var this_0 = $this.hao_1;
    textSubstitution$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_textSubstitution__7vuyf3($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.hao_1;
    textSubstitution$factory_0();
    return this_0.s2();
  }
  function setSubstitution($this, updatedText) {
    var currentTextSubstitution = _get_textSubstitution__7vuyf3($this);
    if (!(currentTextSubstitution == null)) {
      if (updatedText.equals(currentTextSubstitution.waq_1)) {
        return false;
      }
      currentTextSubstitution.waq_1 = updatedText;
      var tmp0_safe_receiver = currentTextSubstitution.yaq_1;
      var tmp;
      if (tmp0_safe_receiver == null) {
        tmp = null;
      } else {
        tmp0_safe_receiver.cal(updatedText, $this.tan_1, $this.uan_1, $this.wan_1, $this.xan_1, $this.yan_1, $this.zan_1, $this.aao_1);
        tmp = Unit_instance;
      }
      if (tmp == null)
        return false;
    } else {
      var newTextSubstitution = new TextSubstitutionValue($this.san_1, updatedText);
      var substitutionLayoutCache = new MultiParagraphLayoutCache(updatedText, $this.tan_1, $this.uan_1, $this.wan_1, $this.xan_1, $this.yan_1, $this.zan_1, $this.aao_1);
      substitutionLayoutCache.yak(_get_layoutCache__kch9ev($this).sak_1);
      newTextSubstitution.yaq_1 = substitutionLayoutCache;
      _set_textSubstitution__y24uh9($this, newTextSubstitution);
    }
    return true;
  }
  function clearSubstitution($this) {
    _set_textSubstitution__y24uh9($this, null);
  }
  function TextAnnotatedStringNode$applySemantics$lambda(this$0) {
    return function (textLayoutResult) {
      var inputLayout = _get_layoutCache__kch9ev(this$0).aal();
      var tmp;
      if (inputLayout == null) {
        tmp = null;
      } else {
        var tmp_0 = this$0.tan_1;
        var tmp0_safe_receiver = this$0.dao_1;
        var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.zaq();
        var tmp_1;
        var tmp_2 = tmp1_elvis_lhs;
        if ((tmp_2 == null ? null : new Color(tmp_2)) == null) {
          tmp_1 = Companion_getInstance().n3r_1;
        } else {
          tmp_1 = tmp1_elvis_lhs;
        }
        tmp = inputLayout.r4b(TextLayoutInput_init_$Create$(inputLayout.g4b_1.s4b_1, tmp_0.l4c(tmp_1), inputLayout.g4b_1.u4b_1, inputLayout.g4b_1.v4b_1, inputLayout.g4b_1.w4b_1, inputLayout.g4b_1.x4b_1, inputLayout.g4b_1.y4b_1, inputLayout.g4b_1.z4b_1, inputLayout.g4b_1.a4c_1, inputLayout.g4b_1.b4c_1));
      }
      var tmp3_safe_receiver = tmp;
      var tmp_3;
      if (tmp3_safe_receiver == null) {
        tmp_3 = null;
      } else {
        // Inline function 'kotlin.also' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.text.modifiers.TextAnnotatedStringNode.applySemantics.<anonymous>.<anonymous>' call
        textLayoutResult.a1(tmp3_safe_receiver);
        tmp_3 = tmp3_safe_receiver;
      }
      var layout = tmp_3;
      return !(layout == null);
    };
  }
  function TextAnnotatedStringNode$applySemantics$lambda_0(this$0) {
    return function (updatedText) {
      setSubstitution(this$0, updatedText);
      invalidateSemantics(this$0);
      return true;
    };
  }
  function TextAnnotatedStringNode$applySemantics$lambda_1(this$0) {
    return function (it) {
      var tmp;
      if (_get_textSubstitution__7vuyf3(this$0) == null) {
        return false;
      }
      var tmp0_safe_receiver = _get_textSubstitution__7vuyf3(this$0);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = Unit_instance;
      } else {
        tmp0_safe_receiver.xaq_1 = it;
        tmp_0 = Unit_instance;
      }
      invalidateSemantics(this$0);
      invalidateMeasurement(this$0);
      invalidateDraw(this$0);
      return true;
    };
  }
  function TextAnnotatedStringNode$applySemantics$lambda_2(this$0) {
    return function () {
      clearSubstitution(this$0);
      invalidateSemantics(this$0);
      invalidateMeasurement(this$0);
      invalidateDraw(this$0);
      return true;
    };
  }
  function TextAnnotatedStringNode$measure$lambda($placeable) {
    return function ($this$layout) {
      $this$layout.d5s($placeable, 0, 0);
      return Unit_instance;
    };
  }
  function TextAnnotatedStringNode(text, style, fontFamilyResolver, onTextLayout, overflow, softWrap, maxLines, minLines, placeholders, onPlaceholderLayout, selectionController, overrideColor) {
    onTextLayout = onTextLayout === VOID ? null : onTextLayout;
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    placeholders = placeholders === VOID ? null : placeholders;
    onPlaceholderLayout = onPlaceholderLayout === VOID ? null : onPlaceholderLayout;
    selectionController = selectionController === VOID ? null : selectionController;
    overrideColor = overrideColor === VOID ? null : overrideColor;
    Node.call(this);
    this.san_1 = text;
    this.tan_1 = style;
    this.uan_1 = fontFamilyResolver;
    this.van_1 = onTextLayout;
    this.wan_1 = overflow;
    this.xan_1 = softWrap;
    this.yan_1 = maxLines;
    this.zan_1 = minLines;
    this.aao_1 = placeholders;
    this.bao_1 = onPlaceholderLayout;
    this.cao_1 = selectionController;
    this.dao_1 = overrideColor;
    this.eao_1 = null;
    this.fao_1 = null;
    this.gao_1 = null;
    this.hao_1 = mutableStateOf(null);
  }
  protoOf(TextAnnotatedStringNode).kao = function (color, style) {
    var changed = false;
    if (!equals(color, this.dao_1)) {
      changed = true;
    }
    this.dao_1 = color;
    changed = changed ? true : !style.n4d(this.tan_1);
    return changed;
  };
  protoOf(TextAnnotatedStringNode).lao = function (text) {
    if (this.san_1.equals(text))
      return false;
    this.san_1 = text;
    clearSubstitution(this);
    return true;
  };
  protoOf(TextAnnotatedStringNode).mao = function (style, placeholders, minLines, maxLines, softWrap, fontFamilyResolver, overflow) {
    var changed;
    changed = !this.tan_1.m4d(style);
    this.tan_1 = style;
    if (!equals(this.aao_1, placeholders)) {
      this.aao_1 = placeholders;
      changed = true;
    }
    if (!(this.zan_1 === minLines)) {
      this.zan_1 = minLines;
      changed = true;
    }
    if (!(this.yan_1 === maxLines)) {
      this.yan_1 = maxLines;
      changed = true;
    }
    if (!(this.xan_1 === softWrap)) {
      this.xan_1 = softWrap;
      changed = true;
    }
    if (!equals(this.uan_1, fontFamilyResolver)) {
      this.uan_1 = fontFamilyResolver;
      changed = true;
    }
    if (!(this.wan_1 === overflow)) {
      this.wan_1 = overflow;
      changed = true;
    }
    return changed;
  };
  protoOf(TextAnnotatedStringNode).nao = function (onTextLayout, onPlaceholderLayout, selectionController) {
    var changed = false;
    if (!equals(this.van_1, onTextLayout)) {
      this.van_1 = onTextLayout;
      changed = true;
    }
    if (!equals(this.bao_1, onPlaceholderLayout)) {
      this.bao_1 = onPlaceholderLayout;
      changed = true;
    }
    if (!equals(this.cao_1, selectionController)) {
      this.cao_1 = selectionController;
      changed = true;
    }
    return changed;
  };
  protoOf(TextAnnotatedStringNode).oao = function (drawChanged, textChanged, layoutChanged, callbacksChanged) {
    if (!this.i4u_1) {
      return Unit_instance;
    }
    if (textChanged ? true : drawChanged ? !(this.gao_1 == null) : false) {
      invalidateSemantics(this);
    }
    if ((textChanged ? true : layoutChanged) ? true : callbacksChanged) {
      _get_layoutCache__kch9ev(this).cal(this.san_1, this.tan_1, this.uan_1, this.wan_1, this.xan_1, this.yan_1, this.zan_1, this.aao_1);
      invalidateMeasurement(this);
      invalidateDraw(this);
    }
    if (drawChanged) {
      invalidateDraw(this);
    }
  };
  protoOf(TextAnnotatedStringNode).y61 = function (_this__u8e3s4) {
    var localSemanticsTextLayoutResult = this.gao_1;
    if (localSemanticsTextLayoutResult == null) {
      localSemanticsTextLayoutResult = TextAnnotatedStringNode$applySemantics$lambda(this);
      this.gao_1 = localSemanticsTextLayoutResult;
    }
    set_text(_this__u8e3s4, this.san_1);
    var currentTextSubstitution = _get_textSubstitution__7vuyf3(this);
    if (!(currentTextSubstitution == null)) {
      set_textSubstitution(_this__u8e3s4, currentTextSubstitution.waq_1);
      set_isShowingTextSubstitution(_this__u8e3s4, currentTextSubstitution.xaq_1);
    }
    setTextSubstitution(_this__u8e3s4, VOID, TextAnnotatedStringNode$applySemantics$lambda_0(this));
    showTextSubstitution(_this__u8e3s4, VOID, TextAnnotatedStringNode$applySemantics$lambda_1(this));
    clearTextSubstitution(_this__u8e3s4, VOID, TextAnnotatedStringNode$applySemantics$lambda_2(this));
    getTextLayoutResult(_this__u8e3s4, VOID, localSemanticsTextLayoutResult);
  };
  protoOf(TextAnnotatedStringNode).jao = function (measureScope, measurable, constraints) {
    return this.l57(measureScope, measurable, constraints);
  };
  protoOf(TextAnnotatedStringNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    var layoutCache = getLayoutCache(this, _this__u8e3s4);
    var didChangeLayout = layoutCache.bal(constraints, _this__u8e3s4.a43());
    var textLayoutResult = layoutCache.zak();
    textLayoutResult.h4b_1.j45_1.o47();
    if (didChangeLayout) {
      invalidateLayer(this);
      var tmp0_safe_receiver = this.van_1;
      if (tmp0_safe_receiver == null)
        null;
      else
        tmp0_safe_receiver(textLayoutResult);
      var tmp1_safe_receiver = this.cao_1;
      if (tmp1_safe_receiver == null)
        null;
      else {
        tmp1_safe_receiver.uao(textLayoutResult);
      }
      var tmp = this;
      var tmp_0 = get_FirstBaseline();
      // Inline function 'kotlin.math.roundToInt' call
      var this_0 = textLayoutResult.j4b_1;
      var tmp$ret$0 = roundToInt(this_0);
      var tmp_1 = to(tmp_0, tmp$ret$0);
      var tmp_2 = get_LastBaseline();
      // Inline function 'kotlin.math.roundToInt' call
      var this_1 = textLayoutResult.k4b_1;
      var tmp$ret$1 = roundToInt(this_1);
      tmp.eao_1 = mapOf([tmp_1, to(tmp_2, tmp$ret$1)]);
    }
    var tmp2_safe_receiver = this.bao_1;
    if (tmp2_safe_receiver == null)
      null;
    else
      tmp2_safe_receiver(textLayoutResult.l4b_1);
    var placeable = measurable.m57(fixedCoerceHeightAndWidthForBits(Companion_getInstance_0(), _IntSize___get_width__impl__d9yl4o(textLayoutResult.i4b_1), _IntSize___get_height__impl__prv63b(textLayoutResult.i4b_1)));
    var tmp_3 = _IntSize___get_width__impl__d9yl4o(textLayoutResult.i4b_1);
    var tmp_4 = _IntSize___get_height__impl__prv63b(textLayoutResult.i4b_1);
    var tmp_5 = ensureNotNull(this.eao_1);
    return _this__u8e3s4.v5r(tmp_3, tmp_4, tmp_5, TextAnnotatedStringNode$measure$lambda(placeable));
  };
  protoOf(TextAnnotatedStringNode).iao = function (contentDrawScope) {
    return this.b4v(contentDrawScope);
  };
  protoOf(TextAnnotatedStringNode).b4v = function (_this__u8e3s4) {
    if (!this.i4u_1) {
      return Unit_instance;
    }
    var tmp0_safe_receiver = this.cao_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.xao(_this__u8e3s4);
    }
    // Inline function 'androidx.compose.ui.graphics.drawscope.drawIntoCanvas' call
    var canvas = _this__u8e3s4.b43().f3h();
    var layoutCache = getLayoutCache(this, _this__u8e3s4);
    var textLayoutResult = layoutCache.zak();
    var localParagraph = textLayoutResult.h4b_1;
    var willClip = textLayoutResult.o4b() ? !(this.wan_1 === Companion_getInstance_16().q4l_1) : false;
    if (willClip) {
      var width = _IntSize___get_width__impl__d9yl4o(textLayoutResult.i4b_1);
      var height = _IntSize___get_height__impl__prv63b(textLayoutResult.i4b_1);
      var bounds = Rect_0(Companion_getInstance_1().u33_1, Size_0(width, height));
      canvas.a3s();
      canvas.h3s(bounds);
    }
    var tmp;
    try {
      var tmp0_elvis_lhs = this.tan_1.b4d();
      var textDecoration = tmp0_elvis_lhs == null ? Companion_getInstance_19().d4b_1 : tmp0_elvis_lhs;
      var tmp1_elvis_lhs = this.tan_1.c4d();
      var shadow = tmp1_elvis_lhs == null ? Companion_getInstance_20().c3y_1 : tmp1_elvis_lhs;
      var tmp2_elvis_lhs = this.tan_1.d4d();
      var drawStyle = tmp2_elvis_lhs == null ? Fill_getInstance() : tmp2_elvis_lhs;
      var brush = this.tan_1.l49();
      var tmp_0;
      if (!(brush == null)) {
        var alpha = this.tan_1.w3n();
        localParagraph.o46(canvas, brush, alpha, shadow, textDecoration, drawStyle);
        tmp_0 = Unit_instance;
      } else {
        var tmp3_safe_receiver = this.dao_1;
        var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.zaq();
        var tmp_1;
        var tmp_2 = tmp4_elvis_lhs;
        if ((tmp_2 == null ? null : new Color(tmp_2)) == null) {
          tmp_1 = Companion_getInstance().n3r_1;
        } else {
          tmp_1 = tmp4_elvis_lhs;
        }
        var overrideColorVal = tmp_1;
        var tmp_3;
        // Inline function 'androidx.compose.ui.graphics.isSpecified' call
        if (!equals(_Color___get_value__impl__1pls5m(overrideColorVal), _Color___get_value__impl__1pls5m(Companion_getInstance().n3r_1))) {
          tmp_3 = overrideColorVal;
        } else {
          // Inline function 'androidx.compose.ui.graphics.isSpecified' call
          var this_0 = this.tan_1.p3r();
          if (!equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().n3r_1))) {
            tmp_3 = this.tan_1.p3r();
          } else {
            tmp_3 = Companion_getInstance().b3r_1;
          }
        }
        var color = tmp_3;
        localParagraph.m46(canvas, color, shadow, textDecoration, drawStyle);
        tmp_0 = Unit_instance;
      }
      tmp = tmp_0;
    }finally {
      if (willClip) {
        canvas.b3s();
      }
    }
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    var this_1 = this.aao_1;
    // Inline function 'kotlin.contracts.contract' call
    if (!(this_1 == null ? true : this_1.u())) {
      _this__u8e3s4.m4w();
    }
  };
  function textSubstitution$factory() {
    return getPropertyCallableRef('textSubstitution', 1, KMutableProperty1, function (receiver) {
      return _get_textSubstitution__7vuyf3(receiver);
    }, function (receiver, value) {
      return _set_textSubstitution__y24uh9(receiver, value);
    });
  }
  function textSubstitution$factory_0() {
    return getPropertyCallableRef('textSubstitution', 1, KMutableProperty1, function (receiver) {
      return _get_textSubstitution__7vuyf3(receiver);
    }, function (receiver, value) {
      return _set_textSubstitution__y24uh9(receiver, value);
    });
  }
  function TextStringSimpleElement(text, style, fontFamilyResolver, overflow, softWrap, maxLines, minLines, color) {
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    color = color === VOID ? null : color;
    ModifierNodeElement.call(this);
    this.bar_1 = text;
    this.car_1 = style;
    this.dar_1 = fontFamilyResolver;
    this.ear_1 = overflow;
    this.far_1 = softWrap;
    this.gar_1 = maxLines;
    this.har_1 = minLines;
    this.iar_1 = color;
  }
  protoOf(TextStringSimpleElement).g25 = function () {
    return new TextStringSimpleNode(this.bar_1, this.car_1, this.dar_1, this.ear_1, this.far_1, this.gar_1, this.har_1, this.iar_1);
  };
  protoOf(TextStringSimpleElement).jar = function (node) {
    node.las(node.kao(this.iar_1, this.car_1), node.jas(this.bar_1), node.kas(this.car_1, this.har_1, this.gar_1, this.far_1, this.dar_1, this.ear_1));
  };
  protoOf(TextStringSimpleElement).t4v = function (node) {
    return this.jar(node instanceof TextStringSimpleNode ? node : THROW_CCE());
  };
  protoOf(TextStringSimpleElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextStringSimpleElement))
      return false;
    if (!equals(this.iar_1, other.iar_1))
      return false;
    if (!(this.bar_1 === other.bar_1))
      return false;
    if (!this.car_1.equals(other.car_1))
      return false;
    if (!equals(this.dar_1, other.dar_1))
      return false;
    if (!(this.ear_1 === other.ear_1))
      return false;
    if (!(this.far_1 === other.far_1))
      return false;
    if (!(this.gar_1 === other.gar_1))
      return false;
    if (!(this.har_1 === other.har_1))
      return false;
    return true;
  };
  protoOf(TextStringSimpleElement).hashCode = function () {
    var result = getStringHashCode(this.bar_1);
    result = imul(31, result) + this.car_1.hashCode() | 0;
    result = imul(31, result) + hashCode(this.dar_1) | 0;
    result = imul(31, result) + TextOverflow__hashCode_impl_kqdwgt(this.ear_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.far_1) | 0;
    result = imul(31, result) + this.gar_1 | 0;
    result = imul(31, result) + this.har_1 | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.iar_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    return result;
  };
  function _get_layoutCache__kch9ev_0($this) {
    if ($this.gas_1 == null) {
      $this.gas_1 = new ParagraphLayoutCache($this.xar_1, $this.yar_1, $this.zar_1, $this.aas_1, $this.bas_1, $this.cas_1, $this.das_1);
    }
    return ensureNotNull($this.gas_1);
  }
  function getLayoutCache_0($this, density) {
    var tmp0_safe_receiver = _get_textSubstitution__7vuyf3_0($this);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      if (tmp0_safe_receiver.oas_1) {
        var tmp0_safe_receiver_0 = tmp0_safe_receiver.pas_1;
        if (tmp0_safe_receiver_0 == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'kotlin.also' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.foundation.text.modifiers.TextStringSimpleNode.getLayoutCache.<anonymous>.<anonymous>.<anonymous>' call
          tmp0_safe_receiver_0.yak(density);
          return tmp0_safe_receiver_0;
        }
        tmp = Unit_instance;
      }
    }
    // Inline function 'kotlin.also' call
    var this_0 = _get_layoutCache__kch9ev_0($this);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.modifiers.TextStringSimpleNode.getLayoutCache.<anonymous>' call
    this_0.yak(density);
    return this_0;
  }
  function TextSubstitutionValue_0(original, substitution, isShowingSubstitution, layoutCache) {
    isShowingSubstitution = isShowingSubstitution === VOID ? false : isShowingSubstitution;
    layoutCache = layoutCache === VOID ? null : layoutCache;
    this.mas_1 = original;
    this.nas_1 = substitution;
    this.oas_1 = isShowingSubstitution;
    this.pas_1 = layoutCache;
  }
  protoOf(TextSubstitutionValue_0).toString = function () {
    return 'TextSubstitutionValue(original=' + this.mas_1 + ', substitution=' + this.nas_1 + ', isShowingSubstitution=' + this.oas_1 + ', layoutCache=' + this.pas_1 + ')';
  };
  protoOf(TextSubstitutionValue_0).hashCode = function () {
    var result = getStringHashCode(this.mas_1);
    result = imul(result, 31) + getStringHashCode(this.nas_1) | 0;
    result = imul(result, 31) + getBooleanHashCode(this.oas_1) | 0;
    result = imul(result, 31) + (this.pas_1 == null ? 0 : hashCode(this.pas_1)) | 0;
    return result;
  };
  protoOf(TextSubstitutionValue_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextSubstitutionValue_0))
      return false;
    var tmp0_other_with_cast = other instanceof TextSubstitutionValue_0 ? other : THROW_CCE();
    if (!(this.mas_1 === tmp0_other_with_cast.mas_1))
      return false;
    if (!(this.nas_1 === tmp0_other_with_cast.nas_1))
      return false;
    if (!(this.oas_1 === tmp0_other_with_cast.oas_1))
      return false;
    if (!equals(this.pas_1, tmp0_other_with_cast.pas_1))
      return false;
    return true;
  };
  function _set_textSubstitution__y24uh9_0($this, _set____db54di) {
    var this_0 = $this.ias_1;
    textSubstitution$factory_1();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_textSubstitution__7vuyf3_0($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.ias_1;
    textSubstitution$factory_2();
    return this_0.s2();
  }
  function setSubstitution_0($this, updatedText) {
    var currentTextSubstitution = _get_textSubstitution__7vuyf3_0($this);
    if (!(currentTextSubstitution == null)) {
      if (updatedText === currentTextSubstitution.nas_1) {
        return false;
      }
      currentTextSubstitution.nas_1 = updatedText;
      var tmp0_safe_receiver = currentTextSubstitution.pas_1;
      var tmp;
      if (tmp0_safe_receiver == null) {
        tmp = null;
      } else {
        tmp0_safe_receiver.wal(updatedText, $this.yar_1, $this.zar_1, $this.aas_1, $this.bas_1, $this.cas_1, $this.das_1);
        tmp = Unit_instance;
      }
      if (tmp == null)
        return false;
    } else {
      var newTextSubstitution = new TextSubstitutionValue_0($this.xar_1, updatedText);
      var substitutionLayoutCache = new ParagraphLayoutCache(updatedText, $this.yar_1, $this.zar_1, $this.aas_1, $this.bas_1, $this.cas_1, $this.das_1);
      substitutionLayoutCache.yak(_get_layoutCache__kch9ev_0($this).lal_1);
      newTextSubstitution.pas_1 = substitutionLayoutCache;
      _set_textSubstitution__y24uh9_0($this, newTextSubstitution);
    }
    return true;
  }
  function clearSubstitution_0($this) {
    _set_textSubstitution__y24uh9_0($this, null);
  }
  function TextStringSimpleNode$applySemantics$lambda(this$0) {
    return function (textLayoutResult) {
      var tmp = _get_layoutCache__kch9ev_0(this$0);
      var tmp_0 = this$0.yar_1;
      var tmp0_safe_receiver = this$0.eas_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.zaq();
      var tmp_1;
      var tmp_2 = tmp1_elvis_lhs;
      if ((tmp_2 == null ? null : new Color(tmp_2)) == null) {
        tmp_1 = Companion_getInstance().n3r_1;
      } else {
        tmp_1 = tmp1_elvis_lhs;
      }
      var tmp2_safe_receiver = tmp.xal(tmp_0.l4c(tmp_1));
      var tmp_3;
      if (tmp2_safe_receiver == null) {
        tmp_3 = null;
      } else {
        // Inline function 'kotlin.also' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.foundation.text.modifiers.TextStringSimpleNode.applySemantics.<anonymous>.<anonymous>' call
        textLayoutResult.a1(tmp2_safe_receiver);
        tmp_3 = tmp2_safe_receiver;
      }
      var layout = tmp_3;
      return !(layout == null);
    };
  }
  function TextStringSimpleNode$applySemantics$lambda_0(this$0) {
    return function (updatedText) {
      setSubstitution_0(this$0, updatedText.p44_1);
      invalidateSemantics(this$0);
      return true;
    };
  }
  function TextStringSimpleNode$applySemantics$lambda_1(this$0) {
    return function (it) {
      var tmp;
      if (_get_textSubstitution__7vuyf3_0(this$0) == null) {
        return false;
      }
      var tmp0_safe_receiver = _get_textSubstitution__7vuyf3_0(this$0);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = Unit_instance;
      } else {
        tmp0_safe_receiver.oas_1 = it;
        tmp_0 = Unit_instance;
      }
      invalidateSemantics(this$0);
      invalidateMeasurement(this$0);
      invalidateDraw(this$0);
      return true;
    };
  }
  function TextStringSimpleNode$applySemantics$lambda_2(this$0) {
    return function () {
      clearSubstitution_0(this$0);
      invalidateSemantics(this$0);
      invalidateMeasurement(this$0);
      invalidateDraw(this$0);
      return true;
    };
  }
  function TextStringSimpleNode$measure$lambda($placeable) {
    return function ($this$layout) {
      $this$layout.d5s($placeable, 0, 0);
      return Unit_instance;
    };
  }
  function TextStringSimpleNode(text, style, fontFamilyResolver, overflow, softWrap, maxLines, minLines, overrideColor) {
    overflow = overflow === VOID ? Companion_getInstance_16().o4l_1 : overflow;
    softWrap = softWrap === VOID ? true : softWrap;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    minLines = minLines === VOID ? get_DefaultMinLines() : minLines;
    overrideColor = overrideColor === VOID ? null : overrideColor;
    Node.call(this);
    this.xar_1 = text;
    this.yar_1 = style;
    this.zar_1 = fontFamilyResolver;
    this.aas_1 = overflow;
    this.bas_1 = softWrap;
    this.cas_1 = maxLines;
    this.das_1 = minLines;
    this.eas_1 = overrideColor;
    this.fas_1 = null;
    this.gas_1 = null;
    this.has_1 = null;
    this.ias_1 = mutableStateOf(null);
  }
  protoOf(TextStringSimpleNode).kao = function (color, style) {
    var changed = false;
    if (!equals(color, this.eas_1)) {
      changed = true;
    }
    this.eas_1 = color;
    changed = changed ? true : !style.n4d(this.yar_1);
    return changed;
  };
  protoOf(TextStringSimpleNode).jas = function (text) {
    if (this.xar_1 === text)
      return false;
    this.xar_1 = text;
    clearSubstitution_0(this);
    return true;
  };
  protoOf(TextStringSimpleNode).kas = function (style, minLines, maxLines, softWrap, fontFamilyResolver, overflow) {
    var changed;
    changed = !this.yar_1.m4d(style);
    this.yar_1 = style;
    if (!(this.das_1 === minLines)) {
      this.das_1 = minLines;
      changed = true;
    }
    if (!(this.cas_1 === maxLines)) {
      this.cas_1 = maxLines;
      changed = true;
    }
    if (!(this.bas_1 === softWrap)) {
      this.bas_1 = softWrap;
      changed = true;
    }
    if (!equals(this.zar_1, fontFamilyResolver)) {
      this.zar_1 = fontFamilyResolver;
      changed = true;
    }
    if (!(this.aas_1 === overflow)) {
      this.aas_1 = overflow;
      changed = true;
    }
    return changed;
  };
  protoOf(TextStringSimpleNode).las = function (drawChanged, textChanged, layoutChanged) {
    if (!this.i4u_1) {
      return Unit_instance;
    }
    if (textChanged ? true : drawChanged ? !(this.has_1 == null) : false) {
      invalidateSemantics(this);
    }
    if (textChanged ? true : layoutChanged) {
      _get_layoutCache__kch9ev_0(this).wal(this.xar_1, this.yar_1, this.zar_1, this.aas_1, this.bas_1, this.cas_1, this.das_1);
      invalidateMeasurement(this);
      invalidateDraw(this);
    }
    if (drawChanged) {
      invalidateDraw(this);
    }
  };
  protoOf(TextStringSimpleNode).y61 = function (_this__u8e3s4) {
    var localSemanticsTextLayoutResult = this.has_1;
    if (localSemanticsTextLayoutResult == null) {
      localSemanticsTextLayoutResult = TextStringSimpleNode$applySemantics$lambda(this);
      this.has_1 = localSemanticsTextLayoutResult;
    }
    set_text(_this__u8e3s4, AnnotatedString_init_$Create$(this.xar_1));
    var currentTextSubstitution = _get_textSubstitution__7vuyf3_0(this);
    if (!(currentTextSubstitution == null)) {
      set_isShowingTextSubstitution(_this__u8e3s4, currentTextSubstitution.oas_1);
      set_textSubstitution(_this__u8e3s4, AnnotatedString_init_$Create$(currentTextSubstitution.nas_1));
    }
    setTextSubstitution(_this__u8e3s4, VOID, TextStringSimpleNode$applySemantics$lambda_0(this));
    showTextSubstitution(_this__u8e3s4, VOID, TextStringSimpleNode$applySemantics$lambda_1(this));
    clearTextSubstitution(_this__u8e3s4, VOID, TextStringSimpleNode$applySemantics$lambda_2(this));
    getTextLayoutResult(_this__u8e3s4, VOID, localSemanticsTextLayoutResult);
  };
  protoOf(TextStringSimpleNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    var layoutCache = getLayoutCache_0(this, _this__u8e3s4);
    var didChangeLayout = layoutCache.bal(constraints, _this__u8e3s4.a43());
    layoutCache.val();
    var paragraph = ensureNotNull(layoutCache.mal_1);
    var layoutSize = layoutCache.oal_1;
    if (didChangeLayout) {
      invalidateLayer(this);
      var cache = this.fas_1;
      if (cache == null) {
        cache = LinkedHashMap_init_$Create$_0(2);
      }
      // Inline function 'kotlin.collections.set' call
      var this_0 = cache;
      var key = get_FirstBaseline();
      // Inline function 'kotlin.math.roundToInt' call
      var this_1 = paragraph.i46();
      var value = roundToInt(this_1);
      this_0.p2(key, value);
      // Inline function 'kotlin.collections.set' call
      var this_2 = cache;
      var key_0 = get_LastBaseline();
      // Inline function 'kotlin.math.roundToInt' call
      var this_3 = paragraph.j46();
      var value_0 = roundToInt(this_3);
      this_2.p2(key_0, value_0);
      this.fas_1 = cache;
    }
    var placeable = measurable.m57(fixedCoerceHeightAndWidthForBits(Companion_getInstance_0(), _IntSize___get_width__impl__d9yl4o(layoutSize), _IntSize___get_height__impl__prv63b(layoutSize)));
    var tmp = _IntSize___get_width__impl__d9yl4o(layoutSize);
    var tmp_0 = _IntSize___get_height__impl__prv63b(layoutSize);
    var tmp_1 = ensureNotNull(this.fas_1);
    return _this__u8e3s4.v5r(tmp, tmp_0, tmp_1, TextStringSimpleNode$measure$lambda(placeable));
  };
  protoOf(TextStringSimpleNode).b4v = function (_this__u8e3s4) {
    if (!this.i4u_1) {
      return Unit_instance;
    }
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      var value = _get_layoutCache__kch9ev_0(this).mal_1;
      // Inline function 'kotlin.contracts.contract' call
      if (value == null) {
        // Inline function 'androidx.compose.foundation.text.modifiers.TextStringSimpleNode.draw.<anonymous>' call
        var message = 'no paragraph';
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = value;
        break $l$block;
      }
    }
    var localParagraph = tmp$ret$1;
    // Inline function 'androidx.compose.ui.graphics.drawscope.drawIntoCanvas' call
    var canvas = _this__u8e3s4.b43().f3h();
    var willClip = _get_layoutCache__kch9ev_0(this).nal_1;
    if (willClip) {
      var width = _IntSize___get_width__impl__d9yl4o(_get_layoutCache__kch9ev_0(this).oal_1);
      var height = _IntSize___get_height__impl__prv63b(_get_layoutCache__kch9ev_0(this).oal_1);
      var bounds = Rect_0(Companion_getInstance_1().u33_1, Size_0(width, height));
      canvas.a3s();
      canvas.h3s(bounds);
    }
    var tmp;
    try {
      var tmp0_elvis_lhs = this.yar_1.b4d();
      var textDecoration = tmp0_elvis_lhs == null ? Companion_getInstance_19().d4b_1 : tmp0_elvis_lhs;
      var tmp1_elvis_lhs = this.yar_1.c4d();
      var shadow = tmp1_elvis_lhs == null ? Companion_getInstance_20().c3y_1 : tmp1_elvis_lhs;
      var tmp2_elvis_lhs = this.yar_1.d4d();
      var drawStyle = tmp2_elvis_lhs == null ? Fill_getInstance() : tmp2_elvis_lhs;
      var brush = this.yar_1.l49();
      var tmp_0;
      if (!(brush == null)) {
        var alpha = this.yar_1.w3n();
        localParagraph.j4n(canvas, brush, alpha, shadow, textDecoration, drawStyle);
        tmp_0 = Unit_instance;
      } else {
        var tmp3_safe_receiver = this.eas_1;
        var tmp4_elvis_lhs = tmp3_safe_receiver == null ? null : tmp3_safe_receiver.zaq();
        var tmp_1;
        var tmp_2 = tmp4_elvis_lhs;
        if ((tmp_2 == null ? null : new Color(tmp_2)) == null) {
          tmp_1 = Companion_getInstance().n3r_1;
        } else {
          tmp_1 = tmp4_elvis_lhs;
        }
        var overrideColorVal = tmp_1;
        var tmp_3;
        // Inline function 'androidx.compose.ui.graphics.isSpecified' call
        if (!equals(_Color___get_value__impl__1pls5m(overrideColorVal), _Color___get_value__impl__1pls5m(Companion_getInstance().n3r_1))) {
          tmp_3 = overrideColorVal;
        } else {
          // Inline function 'androidx.compose.ui.graphics.isSpecified' call
          var this_0 = this.yar_1.p3r();
          if (!equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().n3r_1))) {
            tmp_3 = this.yar_1.p3r();
          } else {
            tmp_3 = Companion_getInstance().b3r_1;
          }
        }
        var color = tmp_3;
        localParagraph.i4n(canvas, color, shadow, textDecoration, drawStyle);
        tmp_0 = Unit_instance;
      }
      tmp = tmp_0;
    }finally {
      if (willClip) {
        canvas.b3s();
      }
    }
  };
  function textSubstitution$factory_1() {
    return getPropertyCallableRef('textSubstitution', 1, KMutableProperty1, function (receiver) {
      return _get_textSubstitution__7vuyf3_0(receiver);
    }, function (receiver, value) {
      return _set_textSubstitution__y24uh9_0(receiver, value);
    });
  }
  function textSubstitution$factory_2() {
    return getPropertyCallableRef('textSubstitution', 1, KMutableProperty1, function (receiver) {
      return _get_textSubstitution__7vuyf3_0(receiver);
    }, function (receiver, value) {
      return _set_textSubstitution__y24uh9_0(receiver, value);
    });
  }
  function _get_lastVisibleOffset__v7xite(_this__u8e3s4, $this) {
    if (!($this.tas_1 === _this__u8e3s4)) {
      var tmp;
      if (!_this__u8e3s4.m4b() ? true : _this__u8e3s4.h4b_1.l45_1) {
        tmp = _this__u8e3s4.e46() - 1 | 0;
      } else {
        var finalVisibleLine = coerceAtMost(_this__u8e3s4.p46(_IntSize___get_height__impl__prv63b(_this__u8e3s4.i4b_1)), _this__u8e3s4.e46() - 1 | 0);
        while (finalVisibleLine >= 0 ? _this__u8e3s4.x46(finalVisibleLine) >= _IntSize___get_height__impl__prv63b(_this__u8e3s4.i4b_1) : false) {
          finalVisibleLine = finalVisibleLine - 1 | 0;
        }
        tmp = coerceAtLeast(finalVisibleLine, 0);
      }
      var lastVisibleLine = tmp;
      $this.uas_1 = _this__u8e3s4.b47(lastVisibleLine, true);
      $this.tas_1 = _this__u8e3s4;
    }
    return $this.uas_1;
  }
  function MultiWidgetSelectionDelegate(selectableId, coordinatesCallback, layoutResultCallback) {
    this.qas_1 = selectableId;
    this.ras_1 = coordinatesCallback;
    this.sas_1 = layoutResultCallback;
    this.tas_1 = null;
    this.uas_1 = -1;
  }
  protoOf(MultiWidgetSelectionDelegate).fap = function () {
    var tmp0_elvis_lhs = this.sas_1();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return 0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var textLayoutResult = tmp;
    return _get_lastVisibleOffset__v7xite(textLayoutResult, this);
  };
  function AnchorInfo(direction, offset, selectableId) {
    this.zao_1 = direction;
    this.aap_1 = offset;
    this.bap_1 = selectableId;
  }
  protoOf(AnchorInfo).vas = function (direction, offset, selectableId) {
    return new AnchorInfo(direction, offset, selectableId);
  };
  protoOf(AnchorInfo).was = function (direction, offset, selectableId, $super) {
    direction = direction === VOID ? this.zao_1 : direction;
    offset = offset === VOID ? this.aap_1 : offset;
    selectableId = selectableId === VOID ? this.bap_1 : selectableId;
    return $super === VOID ? this.vas(direction, offset, selectableId) : $super.vas.call(this, direction, offset, selectableId);
  };
  protoOf(AnchorInfo).toString = function () {
    return 'AnchorInfo(direction=' + this.zao_1 + ', offset=' + this.aap_1 + ', selectableId=' + this.bap_1.toString() + ')';
  };
  protoOf(AnchorInfo).hashCode = function () {
    var result = this.zao_1.hashCode();
    result = imul(result, 31) + this.aap_1 | 0;
    result = imul(result, 31) + this.bap_1.hashCode() | 0;
    return result;
  };
  protoOf(AnchorInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AnchorInfo))
      return false;
    var tmp0_other_with_cast = other instanceof AnchorInfo ? other : THROW_CCE();
    if (!this.zao_1.equals(tmp0_other_with_cast.zao_1))
      return false;
    if (!(this.aap_1 === tmp0_other_with_cast.aap_1))
      return false;
    if (!this.bap_1.equals(tmp0_other_with_cast.bap_1))
      return false;
    return true;
  };
  function Selection(start, end, handlesCrossed) {
    handlesCrossed = handlesCrossed === VOID ? false : handlesCrossed;
    this.cap_1 = start;
    this.dap_1 = end;
    this.eap_1 = handlesCrossed;
  }
  protoOf(Selection).xas = function (start, end, handlesCrossed) {
    return new Selection(start, end, handlesCrossed);
  };
  protoOf(Selection).yas = function (start, end, handlesCrossed, $super) {
    start = start === VOID ? this.cap_1 : start;
    end = end === VOID ? this.dap_1 : end;
    handlesCrossed = handlesCrossed === VOID ? this.eap_1 : handlesCrossed;
    return $super === VOID ? this.xas(start, end, handlesCrossed) : $super.xas.call(this, start, end, handlesCrossed);
  };
  protoOf(Selection).toString = function () {
    return 'Selection(start=' + this.cap_1 + ', end=' + this.dap_1 + ', handlesCrossed=' + this.eap_1 + ')';
  };
  protoOf(Selection).hashCode = function () {
    var result = this.cap_1.hashCode();
    result = imul(result, 31) + this.dap_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.eap_1) | 0;
    return result;
  };
  protoOf(Selection).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Selection))
      return false;
    var tmp0_other_with_cast = other instanceof Selection ? other : THROW_CCE();
    if (!this.cap_1.equals(tmp0_other_with_cast.cap_1))
      return false;
    if (!this.dap_1.equals(tmp0_other_with_cast.dap_1))
      return false;
    if (!(this.eap_1 === tmp0_other_with_cast.eap_1))
      return false;
    return true;
  };
  function sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0(function_0) {
    this.zas_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0).aat = function (layout) {
    return this.zas_1(layout);
  };
  function sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_0(function_0) {
    this.bat_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_0).aat = function (layout) {
    return this.bat_1(layout);
  };
  function sam$androidx_compose_foundation_text_selection_BoundaryFunction$0(function_0) {
    this.cat_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_BoundaryFunction$0).dat = function (_this__u8e3s4, offset) {
    return this.cat_1(_this__u8e3s4, offset).e4c_1;
  };
  function sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_1(function_0) {
    this.eat_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_1).aat = function (layout) {
    return this.eat_1(layout);
  };
  function sam$androidx_compose_foundation_text_selection_BoundaryFunction$0_0(function_0) {
    this.fat_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_BoundaryFunction$0_0).dat = function (_this__u8e3s4, offset) {
    return this.fat_1(_this__u8e3s4, offset).e4c_1;
  };
  function sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_2(function_0) {
    this.gat_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_2).aat = function (layout) {
    return this.gat_1(layout);
  };
  function sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_3(function_0) {
    this.hat_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_3).aat = function (layout) {
    return this.hat_1(layout);
  };
  function SelectionAdjustment$Companion$None$lambda(layout) {
    return new Selection(layout.iat().pat(layout.iat().lat_1), layout.qat().pat(layout.qat().mat_1), layout.rat().equals(CrossStatus_CROSSED_getInstance()));
  }
  function SelectionAdjustment$Companion$Character$lambda(layout) {
    return ensureAtLeastOneChar(Companion_getInstance_35().oap_1.aat(layout), layout);
  }
  function SelectionAdjustment$Companion$Word$lambda(layout) {
    var tmp = SelectionAdjustment$Companion$Word$lambda$lambda;
    return adjustToBoundaries(layout, new sam$androidx_compose_foundation_text_selection_BoundaryFunction$0(tmp));
  }
  function SelectionAdjustment$Companion$Word$lambda$lambda($this$adjustToBoundaries, it) {
    return new TextRange_0($this$adjustToBoundaries.oat_1.u46(it));
  }
  function SelectionAdjustment$Companion$Paragraph$lambda(layout) {
    var tmp = SelectionAdjustment$Companion$Paragraph$lambda$lambda;
    return adjustToBoundaries(layout, new sam$androidx_compose_foundation_text_selection_BoundaryFunction$0_0(tmp));
  }
  function SelectionAdjustment$Companion$Paragraph$lambda$lambda($this$adjustToBoundaries, it) {
    return new TextRange_0(getParagraphBoundary($this$adjustToBoundaries.sat(), it));
  }
  function SelectionAdjustment$Companion$CharacterWithWordAccelerate$lambda(layout) {
    var tmp0_elvis_lhs = layout.tat();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Companion_getInstance_35().qap_1.aat(layout);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var previousSelection = tmp;
    var previousAnchor;
    var newAnchor;
    var startAnchor;
    var endAnchor;
    if (layout.uat()) {
      previousAnchor = previousSelection.cap_1;
      newAnchor = updateSelectionBoundary(layout, layout.iat(), previousAnchor);
      startAnchor = newAnchor;
      endAnchor = previousSelection.dap_1;
    } else {
      previousAnchor = previousSelection.dap_1;
      newAnchor = updateSelectionBoundary(layout, layout.qat(), previousAnchor);
      startAnchor = previousSelection.cap_1;
      endAnchor = newAnchor;
    }
    var tmp_0;
    if (newAnchor.equals(previousAnchor)) {
      tmp_0 = previousSelection;
    } else {
      var crossed = layout.rat().equals(CrossStatus_CROSSED_getInstance()) ? true : layout.rat().equals(CrossStatus_COLLAPSED_getInstance()) ? startAnchor.aap_1 > endAnchor.aap_1 : false;
      tmp_0 = ensureAtLeastOneChar(new Selection(startAnchor, endAnchor, crossed), layout);
    }
    return tmp_0;
  }
  function Companion_11() {
    Companion_instance_14 = this;
    var tmp = this;
    var tmp_0 = SelectionAdjustment$Companion$None$lambda;
    tmp.oap_1 = new sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0(tmp_0);
    var tmp_1 = this;
    var tmp_2 = SelectionAdjustment$Companion$Character$lambda;
    tmp_1.pap_1 = new sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_0(tmp_2);
    var tmp_3 = this;
    var tmp_4 = SelectionAdjustment$Companion$Word$lambda;
    tmp_3.qap_1 = new sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_1(tmp_4);
    var tmp_5 = this;
    var tmp_6 = SelectionAdjustment$Companion$Paragraph$lambda;
    tmp_5.rap_1 = new sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_2(tmp_6);
    var tmp_7 = this;
    var tmp_8 = SelectionAdjustment$Companion$CharacterWithWordAccelerate$lambda;
    tmp_7.sap_1 = new sam$androidx_compose_foundation_text_selection_SelectionAdjustment$0_3(tmp_8);
  }
  var Companion_instance_14;
  function Companion_getInstance_35() {
    if (Companion_instance_14 == null)
      new Companion_11();
    return Companion_instance_14;
  }
  function ensureAtLeastOneChar(_this__u8e3s4, layout) {
    if (!isCollapsed(_this__u8e3s4, layout)) {
      return _this__u8e3s4;
    }
    var text = layout.vat().sat();
    var tmp;
    if (layout.m() > 1 ? true : layout.tat() == null) {
      tmp = true;
    } else {
      // Inline function 'kotlin.text.isEmpty' call
      tmp = charSequenceLength(text) === 0;
    }
    if (tmp) {
      return _this__u8e3s4;
    }
    return expandOneChar(_this__u8e3s4, layout);
  }
  function adjustToBoundaries(layout, boundaryFunction) {
    var crossed = layout.rat().equals(CrossStatus_CROSSED_getInstance());
    return new Selection(anchorOnBoundary(layout.iat(), crossed, true, layout.wat(), boundaryFunction), anchorOnBoundary(layout.qat(), crossed, false, layout.xat(), boundaryFunction), crossed);
  }
  function updateSelectionBoundary(_this__u8e3s4, info, previousSelectionAnchor) {
    var currentRawOffset = _this__u8e3s4.uat() ? info.lat_1 : info.mat_1;
    var currentSlot = _this__u8e3s4.uat() ? _this__u8e3s4.wat() : _this__u8e3s4.xat();
    if (!(currentSlot === info.kat_1)) {
      return info.pat(currentRawOffset);
    }
    var tmp = LazyThreadSafetyMode_NONE_getInstance();
    var currentRawLine$delegate = lazy(tmp, updateSelectionBoundary$lambda_1(info, currentRawOffset));
    var otherRawOffset = _this__u8e3s4.uat() ? info.mat_1 : info.lat_1;
    var tmp_0 = LazyThreadSafetyMode_NONE_getInstance();
    var anchorSnappedToWordBoundary$delegate = lazy(tmp_0, updateSelectionBoundary$lambda_2(info, currentRawOffset, otherRawOffset, _this__u8e3s4, currentRawLine$delegate));
    if (!info.jat_1.equals(previousSelectionAnchor.bap_1)) {
      return updateSelectionBoundary$lambda_0(anchorSnappedToWordBoundary$delegate);
    }
    var rawPreviousHandleOffset = info.nat_1;
    if (currentRawOffset === rawPreviousHandleOffset) {
      return previousSelectionAnchor;
    }
    var previousRawLine = info.oat_1.w46(rawPreviousHandleOffset);
    if (!(updateSelectionBoundary$lambda(currentRawLine$delegate) === previousRawLine)) {
      return updateSelectionBoundary$lambda_0(anchorSnappedToWordBoundary$delegate);
    }
    var previousSelectionOffset = previousSelectionAnchor.aap_1;
    var previousSelectionWordBoundary = info.oat_1.u46(previousSelectionOffset);
    if (!isExpanding(info, currentRawOffset, _this__u8e3s4.uat())) {
      return info.pat(currentRawOffset);
    }
    if (previousSelectionOffset === _TextRange___get_start__impl__ww4t90(previousSelectionWordBoundary) ? true : previousSelectionOffset === _TextRange___get_end__impl__gcdxpp(previousSelectionWordBoundary)) {
      return updateSelectionBoundary$lambda_0(anchorSnappedToWordBoundary$delegate);
    }
    return info.pat(currentRawOffset);
  }
  function expandOneChar(_this__u8e3s4, layout) {
    var info = layout.vat();
    var text = info.sat();
    var offset = info.lat_1;
    var lastOffset = text.length;
    var tmp;
    if (offset === 0) {
      var followingBreak = findFollowingBreak(text, 0);
      var tmp_0;
      if (layout.uat()) {
        tmp_0 = _this__u8e3s4.yas(changeOffset(_this__u8e3s4.cap_1, info, followingBreak), VOID, true);
      } else {
        tmp_0 = _this__u8e3s4.yas(VOID, changeOffset(_this__u8e3s4.dap_1, info, followingBreak), false);
      }
      tmp = tmp_0;
    } else if (offset === lastOffset) {
      var precedingBreak = findPrecedingBreak(text, lastOffset);
      var tmp_1;
      if (layout.uat()) {
        tmp_1 = _this__u8e3s4.yas(changeOffset(_this__u8e3s4.cap_1, info, precedingBreak), VOID, false);
      } else {
        tmp_1 = _this__u8e3s4.yas(VOID, changeOffset(_this__u8e3s4.dap_1, info, precedingBreak), true);
      }
      tmp = tmp_1;
    } else {
      var tmp1_safe_receiver = layout.tat();
      var crossed = (tmp1_safe_receiver == null ? null : tmp1_safe_receiver.eap_1) === true;
      var tmp_2;
      if (!!(layout.uat() ^ crossed)) {
        tmp_2 = findPrecedingBreak(text, offset);
      } else {
        tmp_2 = findFollowingBreak(text, offset);
      }
      var newOffset = tmp_2;
      var tmp_3;
      if (layout.uat()) {
        tmp_3 = _this__u8e3s4.yas(changeOffset(_this__u8e3s4.cap_1, info, newOffset), VOID, crossed);
      } else {
        tmp_3 = _this__u8e3s4.yas(VOID, changeOffset(_this__u8e3s4.dap_1, info, newOffset), crossed);
      }
      tmp = tmp_3;
    }
    return tmp;
  }
  function anchorOnBoundary(_this__u8e3s4, crossed, isStart, slot, boundaryFunction) {
    var offset = isStart ? _this__u8e3s4.lat_1 : _this__u8e3s4.mat_1;
    if (!(slot === _this__u8e3s4.kat_1)) {
      return _this__u8e3s4.pat(offset);
    }
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.text.selection.anchorOnBoundary.<anonymous>' call
    var range = boundaryFunction.dat(_this__u8e3s4, offset);
    return _this__u8e3s4.pat(!!(isStart ^ crossed) ? _TextRange___get_start__impl__ww4t90(range) : _TextRange___get_end__impl__gcdxpp(range));
  }
  function snapToWordBoundary(_this__u8e3s4, currentLine, currentOffset, otherOffset, isStart, crossed) {
    var wordBoundary = _this__u8e3s4.oat_1.u46(currentOffset);
    var wordStartLine = _this__u8e3s4.oat_1.w46(_TextRange___get_start__impl__ww4t90(wordBoundary));
    var tmp;
    if (wordStartLine === currentLine) {
      tmp = _TextRange___get_start__impl__ww4t90(wordBoundary);
    } else if (currentLine >= _this__u8e3s4.oat_1.e46()) {
      tmp = _this__u8e3s4.oat_1.z46(_this__u8e3s4.oat_1.e46() - 1 | 0);
    } else {
      tmp = _this__u8e3s4.oat_1.z46(currentLine);
    }
    var start = tmp;
    var wordEndLine = _this__u8e3s4.oat_1.w46(_TextRange___get_end__impl__gcdxpp(wordBoundary));
    var tmp_0;
    if (wordEndLine === currentLine) {
      tmp_0 = _TextRange___get_end__impl__gcdxpp(wordBoundary);
    } else if (currentLine >= _this__u8e3s4.oat_1.e46()) {
      tmp_0 = _this__u8e3s4.oat_1.p4b(_this__u8e3s4.oat_1.e46() - 1 | 0);
    } else {
      tmp_0 = _this__u8e3s4.oat_1.p4b(currentLine);
    }
    var end = tmp_0;
    if (start === otherOffset) {
      return _this__u8e3s4.pat(end);
    }
    if (end === otherOffset) {
      return _this__u8e3s4.pat(start);
    }
    var tmp_1;
    if (!!(isStart ^ crossed)) {
      tmp_1 = currentOffset <= end ? start : end;
    } else {
      tmp_1 = currentOffset >= start ? end : start;
    }
    var resultOffset = tmp_1;
    return _this__u8e3s4.pat(resultOffset);
  }
  function isExpanding(_this__u8e3s4, currentRawOffset, isStart) {
    if (_this__u8e3s4.nat_1 === -1) {
      return true;
    }
    if (currentRawOffset === _this__u8e3s4.nat_1) {
      return false;
    }
    var crossed = _this__u8e3s4.yat().equals(CrossStatus_CROSSED_getInstance());
    var tmp;
    if (!!(isStart ^ crossed)) {
      tmp = currentRawOffset < _this__u8e3s4.nat_1;
    } else {
      tmp = currentRawOffset > _this__u8e3s4.nat_1;
    }
    return tmp;
  }
  function changeOffset(_this__u8e3s4, info, newOffset) {
    var tmp0_direction = info.oat_1.t46(newOffset);
    return _this__u8e3s4.was(tmp0_direction, newOffset);
  }
  function updateSelectionBoundary$lambda($currentRawLine$delegate) {
    // Inline function 'kotlin.getValue' call
    getLocalDelegateReference('currentRawLine', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $currentRawLine$delegate.s2();
  }
  function updateSelectionBoundary$lambda_0($anchorSnappedToWordBoundary$delegate) {
    // Inline function 'kotlin.getValue' call
    getLocalDelegateReference('anchorSnappedToWordBoundary', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $anchorSnappedToWordBoundary$delegate.s2();
  }
  function updateSelectionBoundary$lambda_1($info, $currentRawOffset) {
    return function () {
      return $info.oat_1.w46($currentRawOffset);
    };
  }
  function updateSelectionBoundary$lambda_2($info, $currentRawOffset, $otherRawOffset, $this_updateSelectionBoundary, $currentRawLine$delegate) {
    return function () {
      return snapToWordBoundary($info, updateSelectionBoundary$lambda($currentRawLine$delegate), $currentRawOffset, $otherRawOffset, $this_updateSelectionBoundary.uat(), $this_updateSelectionBoundary.rat().equals(CrossStatus_CROSSED_getInstance()));
    };
  }
  function selectionGestureInput(_this__u8e3s4, mouseSelectionObserver, textDragObserver) {
    return composed(_this__u8e3s4, VOID, selectionGestureInput$lambda(mouseSelectionObserver, textDragObserver));
  }
  function ClicksCounter(viewConfiguration, clicksSlop) {
    this.zat_1 = viewConfiguration;
    this.aau_1 = clicksSlop;
    this.bau_1 = 0;
    this.cau_1 = null;
  }
  protoOf(ClicksCounter).dau = function (event) {
    var currentPrevEvent = this.cau_1;
    if ((!(currentPrevEvent == null) ? this.fau(currentPrevEvent, event) : false) ? this.eau(currentPrevEvent, event) : false) {
      this.bau_1 = this.bau_1 + 1 | 0;
    } else {
      this.bau_1 = 1;
    }
    this.cau_1 = event;
  };
  protoOf(ClicksCounter).fau = function (prevClick, newClick) {
    return newClick.i5f_1.fb(prevClick.i5f_1).z6(this.zat_1.u68()) < 0;
  };
  protoOf(ClicksCounter).eau = function (prevClick, newClick) {
    return Offset__getDistance_impl_pclvxn(Offset__minus_impl_hoj2c0(newClick.j5f_1, prevClick.j5f_1)) < this.aau_1;
  };
  function awaitDown(_this__u8e3s4, $completion) {
    var tmp = new $awaitDownCOROUTINE$37(_this__u8e3s4, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function get_isPrecisePointer(_this__u8e3s4) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.util.fastAll' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_0 = _this__u8e3s4.b5f_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.ui.util.fastAll.<anonymous>' call
          // Inline function 'androidx.compose.foundation.text.selection.<get-isPrecisePointer>.<anonymous>' call
          if (!(item.p5f_1 === Companion_getInstance_7().a5h_1)) {
            tmp$ret$1 = false;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = true;
    }
    return tmp$ret$1;
  }
  function mouseSelection(_this__u8e3s4, observer, clicksCounter, down, $completion) {
    var tmp = new $mouseSelectionCOROUTINE$38(_this__u8e3s4, observer, clicksCounter, down, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function touchSelection(_this__u8e3s4, observer, down, $completion) {
    var tmp = new $touchSelectionCOROUTINE$39(_this__u8e3s4, observer, down, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function distanceIsTolerable(_this__u8e3s4, offset1, offset2) {
    return Offset__getDistance_impl_pclvxn(Offset__minus_impl_hoj2c0(offset1, offset2)) < _this__u8e3s4.g5m().v68();
  }
  function invoke$lambda($currentMouseSelectionObserver$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('currentMouseSelectionObserver', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $currentMouseSelectionObserver$delegate.s2();
  }
  function invoke$lambda_0($currentTextDragObserver$delegate) {
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('currentTextDragObserver', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $currentTextDragObserver$delegate.s2();
  }
  function selectionGestureInput$lambda$slambda$slambda($clicksCounter, $currentMouseSelectionObserver$delegate, $currentTextDragObserver$delegate, resultContinuation) {
    this.caw_1 = $clicksCounter;
    this.daw_1 = $currentMouseSelectionObserver$delegate;
    this.eaw_1 = $currentTextDragObserver$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(selectionGestureInput$lambda$slambda$slambda).u8s = function ($this$awaitEachGesture, $completion) {
    var tmp = this.v8s($this$awaitEachGesture, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(selectionGestureInput$lambda$slambda$slambda).yc = function (p1, $completion) {
    return this.u8s((!(p1 == null) ? isInterface(p1, AwaitPointerEventScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(selectionGestureInput$lambda$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.ac_1 = 1;
            suspendResult = awaitDown(this.faw_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.gaw_1 = suspendResult;
            var tmp_0;
            if (get_isPrecisePointer(this.gaw_1) ? get_isPrimaryPressed(this.gaw_1.c5f_1) : false) {
              var tmp$ret$0;
              l$ret$1: do {
                var this_0 = this.gaw_1.b5f_1;
                var inductionVariable = 0;
                var last = this_0.m() - 1 | 0;
                if (inductionVariable <= last)
                  do {
                    var index = inductionVariable;
                    inductionVariable = inductionVariable + 1 | 0;
                    var item = this_0.n(index);
                    if (!!item.d5h()) {
                      tmp$ret$0 = false;
                      break l$ret$1;
                    }
                  }
                   while (inductionVariable <= last);
                tmp$ret$0 = true;
              }
               while (false);
              tmp_0 = tmp$ret$0;
            } else {
              tmp_0 = false;
            }

            if (tmp_0) {
              this.ac_1 = 3;
              suspendResult = mouseSelection(this.faw_1, invoke$lambda(this.daw_1), this.caw_1, this.gaw_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              if (!get_isPrecisePointer(this.gaw_1)) {
                this.ac_1 = 2;
                suspendResult = touchSelection(this.faw_1, invoke$lambda_0(this.eaw_1), this.gaw_1, this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.ac_1 = 4;
                continue $sm;
              }
            }

          case 2:
            this.ac_1 = 4;
            continue $sm;
          case 3:
            this.ac_1 = 4;
            continue $sm;
          case 4:
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
  protoOf(selectionGestureInput$lambda$slambda$slambda).v8s = function ($this$awaitEachGesture, completion) {
    var i = new selectionGestureInput$lambda$slambda$slambda(this.caw_1, this.daw_1, this.eaw_1, completion);
    i.faw_1 = $this$awaitEachGesture;
    return i;
  };
  function selectionGestureInput$lambda$slambda$slambda_0($clicksCounter, $currentMouseSelectionObserver$delegate, $currentTextDragObserver$delegate, resultContinuation) {
    var i = new selectionGestureInput$lambda$slambda$slambda($clicksCounter, $currentMouseSelectionObserver$delegate, $currentTextDragObserver$delegate, resultContinuation);
    var l = function ($this$awaitEachGesture, $completion) {
      return i.u8s($this$awaitEachGesture, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function selectionGestureInput$lambda$slambda($currentMouseSelectionObserver$delegate, $currentTextDragObserver$delegate, resultContinuation) {
    this.paw_1 = $currentMouseSelectionObserver$delegate;
    this.qaw_1 = $currentTextDragObserver$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(selectionGestureInput$lambda$slambda).g8a = function ($this$pointerInput, $completion) {
    var tmp = this.h8a($this$pointerInput, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(selectionGestureInput$lambda$slambda).yc = function (p1, $completion) {
    return this.g8a((!(p1 == null) ? isInterface(p1, PointerInputScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(selectionGestureInput$lambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            var tmp_0 = this;
            var tmp_1 = this.raw_1.g5m();
            tmp_0.saw_1 = new ClicksCounter(tmp_1, this.raw_1.y35(_Dp___init__impl__ms3zkb(50)));
            this.ac_1 = 1;
            suspendResult = awaitEachGesture(this.raw_1, selectionGestureInput$lambda$slambda$slambda_0(this.saw_1, this.paw_1, this.qaw_1, null), this);
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
  protoOf(selectionGestureInput$lambda$slambda).h8a = function ($this$pointerInput, completion) {
    var i = new selectionGestureInput$lambda$slambda(this.paw_1, this.qaw_1, completion);
    i.raw_1 = $this$pointerInput;
    return i;
  };
  function selectionGestureInput$lambda$slambda_0($currentMouseSelectionObserver$delegate, $currentTextDragObserver$delegate, resultContinuation) {
    var i = new selectionGestureInput$lambda$slambda($currentMouseSelectionObserver$delegate, $currentTextDragObserver$delegate, resultContinuation);
    var l = function ($this$pointerInput, $completion) {
      return i.g8a($this$pointerInput, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function selectionGestureInput$lambda($mouseSelectionObserver, $textDragObserver) {
    return function ($this$composed, $composer, $changed) {
      var $composer_0 = $composer;
      $composer_0.j1l(849554210);
      sourceInformation($composer_0, 'C103@4099L44,104@4179L38,105@4246L554:SelectionGestures.kt#eksfi3');
      var tmp;
      if (isTraceInProgress()) {
        traceEventStart(849554210, $changed, -1, 'androidx.compose.foundation.text.selection.selectionGestureInput.<anonymous> (SelectionGestures.kt:103)');
        tmp = Unit_instance;
      }
      var currentMouseSelectionObserver$delegate = rememberUpdatedState($mouseSelectionObserver, $composer_0, 0);
      var currentTextDragObserver$delegate = rememberUpdatedState($textDragObserver, $composer_0, 0);
      $composer_0.j1l(1614864621);
      sourceInformation($composer_0, 'CC(remember):SelectionGestures.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!($composer_0.v1o(currentMouseSelectionObserver$delegate) | $composer_0.v1o(currentTextDragObserver$delegate));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
        // Inline function 'androidx.compose.foundation.text.selection.selectionGestureInput.<anonymous>.<anonymous>' call
        var value = selectionGestureInput$lambda$slambda_0(currentMouseSelectionObserver$delegate, currentTextDragObserver$delegate, null);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      var tmp0 = pointerInput($this$composed, Unit_instance, tmp1_group);
      var tmp_2;
      if (isTraceInProgress()) {
        traceEventEnd();
        tmp_2 = Unit_instance;
      }
      $composer_0.l1l();
      return tmp0;
    };
  }
  function mouseSelection$lambda($observer) {
    return function (it) {
      var tmp;
      if ($observer.daq(it.j5f_1)) {
        it.g5h();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function mouseSelection$lambda_0($observer, $selectionAdjustment, $dragConsumed) {
    return function (it) {
      var tmp;
      if ($observer.faq(it.j5f_1, $selectionAdjustment)) {
        it.g5h();
        $dragConsumed._v = true;
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function touchSelection$lambda($observer) {
    return function (it) {
      $observer.uap(positionChange(it));
      it.g5h();
      return Unit_instance;
    };
  }
  function $awaitDownCOROUTINE$37(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.oau_1 = _this__u8e3s4;
  }
  protoOf($awaitDownCOROUTINE$37).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.ac_1 = 2;
            suspendResult = this.oau_1.j5m(PointerEventPass_Main_getInstance(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.pau_1 = suspendResult;
            var tmp$ret$0;
            l$ret$1: do {
              var this_0 = this.pau_1.b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (!changedToDownIgnoreConsumed(item)) {
                    tmp$ret$0 = false;
                    break l$ret$1;
                  }
                }
                 while (inductionVariable <= last);
              tmp$ret$0 = true;
            }
             while (false);
            if (!tmp$ret$0) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.pau_1;
          case 4:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 4) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $mouseSelectionCOROUTINE$38(_this__u8e3s4, observer, clicksCounter, down, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.yau_1 = _this__u8e3s4;
    this.zau_1 = observer;
    this.aav_1 = clicksCounter;
    this.bav_1 = down;
  }
  protoOf($mouseSelectionCOROUTINE$38).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 6;
            this.cav_1 = this.bav_1.b5f_1.n(0);
            this.aav_1.dau(this.cav_1);
            if (get_isShiftPressed(this.bav_1.d5f_1)) {
              this.dav_1 = this.zau_1.caq(this.cav_1.j5f_1);
              if (this.dav_1) {
                this.ac_1 = 3;
                suspendResult = drag(this.yau_1, this.cav_1.h5f_1, mouseSelection$lambda(this.zau_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.ac_1 = 4;
                continue $sm;
              }
            } else {
              var tmp_0 = this;
              switch (this.aav_1.bau_1) {
                case 1:
                  tmp_0.eav_1 = Companion_getInstance_35().oap_1;
                  break;
                case 2:
                  tmp_0.eav_1 = Companion_getInstance_35().qap_1;
                  break;
                default:
                  tmp_0.eav_1 = Companion_getInstance_35().rap_1;
                  break;
              }
              this.fav_1 = this.zau_1.eaq(this.cav_1.j5f_1, this.eav_1);
              if (this.fav_1) {
                this.gav_1 = {_v: !equals(this.eav_1, Companion_getInstance_35().oap_1)};
                this.ac_1 = 1;
                suspendResult = drag(this.yau_1, this.cav_1.h5f_1, mouseSelection$lambda_0(this.zau_1, this.eav_1, this.gav_1), this);
                if (suspendResult === get_COROUTINE_SUSPENDED()) {
                  return suspendResult;
                }
                continue $sm;
              } else {
                this.ac_1 = 2;
                continue $sm;
              }
            }

          case 1:
            var shouldConsumeUp = suspendResult;
            if (shouldConsumeUp ? this.gav_1._v : false) {
              var this_0 = this.yau_1.f5m().b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (changedToUp(item)) {
                    item.g5h();
                  }
                }
                 while (inductionVariable <= last);
            }

            this.zau_1.gaq();
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.ac_1 = 5;
            continue $sm;
          case 3:
            var shouldConsumeUp_0 = suspendResult;
            if (shouldConsumeUp_0) {
              var this_1 = this.yau_1.f5m().b5f_1;
              var inductionVariable_0 = 0;
              var last_0 = this_1.m() - 1 | 0;
              if (inductionVariable_0 <= last_0)
                do {
                  var index_0 = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  var item_0 = this_1.n(index_0);
                  if (changedToUp(item_0)) {
                    item_0.g5h();
                  }
                }
                 while (inductionVariable_0 <= last_0);
            }

            this.zau_1.gaq();
            this.ac_1 = 4;
            continue $sm;
          case 4:
            this.ac_1 = 5;
            continue $sm;
          case 5:
            return Unit_instance;
          case 6:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 6) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $touchSelectionCOROUTINE$39(_this__u8e3s4, observer, down, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.pav_1 = _this__u8e3s4;
    this.qav_1 = observer;
    this.rav_1 = down;
  }
  protoOf($touchSelectionCOROUTINE$39).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 6;
            this.bc_1 = 5;
            this.sav_1 = first(this.rav_1.b5f_1);
            this.ac_1 = 1;
            suspendResult = awaitLongPressOrCancellation(this.pav_1, this.sav_1.h5f_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.tav_1 = suspendResult;
            if (!(this.tav_1 == null) ? distanceIsTolerable(this.pav_1, this.sav_1.j5f_1, this.tav_1.j5f_1) : false) {
              this.qav_1.nap(this.tav_1.j5f_1);
              this.ac_1 = 2;
              suspendResult = drag(this.pav_1, this.tav_1.h5f_1, touchSelection$lambda(this.qav_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 2:
            if (suspendResult) {
              var this_0 = this.pav_1.f5m().b5f_1;
              var inductionVariable = 0;
              var last = this_0.m() - 1 | 0;
              if (inductionVariable <= last)
                do {
                  var index = inductionVariable;
                  inductionVariable = inductionVariable + 1 | 0;
                  var item = this_0.n(index);
                  if (changedToUp(item)) {
                    item.g5h();
                  }
                }
                 while (inductionVariable <= last);
              this.qav_1.wap();
              this.ac_1 = 3;
              continue $sm;
            } else {
              this.qav_1.e62();
              this.ac_1 = 3;
              continue $sm;
            }

          case 3:
            this.ac_1 = 4;
            continue $sm;
          case 4:
            this.bc_1 = 6;
            this.ac_1 = 7;
            continue $sm;
          case 5:
            this.bc_1 = 6;
            var tmp_0 = this.dc_1;
            if (tmp_0 instanceof CancellationException) {
              var c = this.dc_1;
              this.qav_1.e62();
              throw c;
            } else {
              throw this.dc_1;
            }

          case 6:
            throw this.dc_1;
          case 7:
            this.bc_1 = 6;
            return Unit_instance;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 6) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  var CrossStatus_CROSSED_instance;
  var CrossStatus_NOT_CROSSED_instance;
  var CrossStatus_COLLAPSED_instance;
  var CrossStatus_entriesInitialized;
  function CrossStatus_initEntries() {
    if (CrossStatus_entriesInitialized)
      return Unit_instance;
    CrossStatus_entriesInitialized = true;
    CrossStatus_CROSSED_instance = new CrossStatus('CROSSED', 0);
    CrossStatus_NOT_CROSSED_instance = new CrossStatus('NOT_CROSSED', 1);
    CrossStatus_COLLAPSED_instance = new CrossStatus('COLLAPSED', 2);
  }
  function CrossStatus(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function isCollapsed(_this__u8e3s4, layout) {
    if (_this__u8e3s4 == null)
      return true;
    if (layout == null)
      return true;
    if (_this__u8e3s4.cap_1.bap_1.equals(_this__u8e3s4.dap_1.bap_1)) {
      return _this__u8e3s4.cap_1.aap_1 === _this__u8e3s4.dap_1.aap_1;
    }
    var maxAnchor = _this__u8e3s4.eap_1 ? _this__u8e3s4.cap_1 : _this__u8e3s4.dap_1;
    if (!(maxAnchor.aap_1 === 0)) {
      return false;
    }
    var minAnchor = _this__u8e3s4.eap_1 ? _this__u8e3s4.dap_1 : _this__u8e3s4.cap_1;
    if (!(layout.taw().uaw() === minAnchor.aap_1)) {
      return false;
    }
    var allTextsEmpty = {_v: true};
    layout.vaw(isCollapsed$lambda(allTextsEmpty));
    return allTextsEmpty._v;
  }
  function getTextDirectionForOffset(_this__u8e3s4, offset) {
    return isOffsetAnEmptyLine(_this__u8e3s4, offset) ? _this__u8e3s4.s46(offset) : _this__u8e3s4.t46(offset);
  }
  function isOffsetAnEmptyLine(_this__u8e3s4, offset) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = _this__u8e3s4.g4b_1.s4b_1;
    if (charSequenceLength(this_0) === 0) {
      tmp = true;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.text.selection.isOffsetAnEmptyLine.<anonymous>' call
      var currentLine = _this__u8e3s4.w46(offset);
      tmp = (offset === 0 ? true : !(currentLine === _this__u8e3s4.w46(offset - 1 | 0))) ? offset === _this__u8e3s4.g4b_1.s4b_1.a() ? true : !(currentLine === _this__u8e3s4.w46(offset + 1 | 0)) : false;
    }
    return tmp;
  }
  function isCollapsed$lambda($allTextsEmpty) {
    return function (it) {
      var tmp;
      // Inline function 'kotlin.text.isNotEmpty' call
      var this_0 = it.sat();
      if (charSequenceLength(this_0) > 0) {
        $allTextsEmpty._v = false;
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function CrossStatus_CROSSED_getInstance() {
    CrossStatus_initEntries();
    return CrossStatus_CROSSED_instance;
  }
  function CrossStatus_NOT_CROSSED_getInstance() {
    CrossStatus_initEntries();
    return CrossStatus_NOT_CROSSED_instance;
  }
  function CrossStatus_COLLAPSED_getInstance() {
    CrossStatus_initEntries();
    return CrossStatus_COLLAPSED_instance;
  }
  function get_LocalSelectionRegistrar() {
    _init_properties_SelectionRegistrar_kt__oigj6p();
    return LocalSelectionRegistrar;
  }
  var LocalSelectionRegistrar;
  function hasSelection(_this__u8e3s4, selectableId) {
    _init_properties_SelectionRegistrar_kt__oigj6p();
    var tmp1_safe_receiver = _this__u8e3s4 == null ? null : _this__u8e3s4.yao();
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.w2(selectableId);
    return tmp2_elvis_lhs == null ? false : tmp2_elvis_lhs;
  }
  function LocalSelectionRegistrar$lambda() {
    _init_properties_SelectionRegistrar_kt__oigj6p();
    return null;
  }
  var properties_initialized_SelectionRegistrar_kt_shxs4d;
  function _init_properties_SelectionRegistrar_kt__oigj6p() {
    if (!properties_initialized_SelectionRegistrar_kt_shxs4d) {
      properties_initialized_SelectionRegistrar_kt_shxs4d = true;
      LocalSelectionRegistrar = compositionLocalOf(VOID, LocalSelectionRegistrar$lambda);
    }
  }
  function get_LocalTextSelectionColors() {
    _init_properties_TextSelectionColors_kt__lgomir();
    return LocalTextSelectionColors;
  }
  var LocalTextSelectionColors;
  function TextSelectionColors(handleColor, backgroundColor) {
    this.maj_1 = handleColor;
    this.naj_1 = backgroundColor;
  }
  protoOf(TextSelectionColors).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextSelectionColors))
      return false;
    if (!equals(this.maj_1, other.maj_1))
      return false;
    if (!equals(this.naj_1, other.naj_1))
      return false;
    return true;
  };
  protoOf(TextSelectionColors).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.maj_1);
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.naj_1) | 0;
    return result;
  };
  protoOf(TextSelectionColors).toString = function () {
    return 'SelectionColors(selectionHandleColor=' + new Color(this.maj_1) + ', ' + ('selectionBackgroundColor=' + new Color(this.naj_1) + ')');
  };
  function LocalTextSelectionColors$lambda() {
    _init_properties_TextSelectionColors_kt__lgomir();
    return get_DefaultTextSelectionColors();
  }
  var properties_initialized_TextSelectionColors_kt_x2xmyn;
  function _init_properties_TextSelectionColors_kt__lgomir() {
    if (!properties_initialized_TextSelectionColors_kt_x2xmyn) {
      properties_initialized_TextSelectionColors_kt_x2xmyn = true;
      LocalTextSelectionColors = compositionLocalOf(VOID, LocalTextSelectionColors$lambda);
    }
  }
  function PlatformOptimizedCancellationException(message) {
    message = message === VOID ? null : message;
    CancellationException_init_$Init$(message, this);
    captureStack(this, PlatformOptimizedCancellationException);
  }
  function get_TapIndicationDelay() {
    return TapIndicationDelay;
  }
  var TapIndicationDelay;
  function rememberOverscrollEffect($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(645164359);
    sourceInformation($composer_0, 'C(rememberOverscrollEffect)28@1055L45:JsOverScroll.kt#71ulvw');
    if (isTraceInProgress()) {
      traceEventStart(645164359, $changed, -1, 'androidx.compose.foundation.rememberOverscrollEffect (JsOverScroll.kt:27)');
    }
    $composer_0.j1l(1852217350);
    sourceInformation($composer_0, 'CC(remember):JsOverScroll.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.rememberOverscrollEffect.<anonymous>' call
      var value = new JSOverscrollEffect();
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function $applyToFlingCOROUTINE$40(_this__u8e3s4, velocity, performFling, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.eax_1 = _this__u8e3s4;
    this.fax_1 = velocity;
    this.gax_1 = performFling;
  }
  protoOf($applyToFlingCOROUTINE$40).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.gax_1(new Velocity_0(this.fax_1), this);
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
  function JSOverscrollEffect() {
    this.hax_1 = false;
    this.iax_1 = Companion_instance;
  }
  protoOf(JSOverscrollEffect).u9l = function (delta, source, performScroll) {
    var overscrollDelta = Companion_getInstance_1().u33_1;
    return Offset__plus_impl_c78cg0(overscrollDelta, performScroll(new Offset(delta)).x33_1);
  };
  protoOf(JSOverscrollEffect).j9k = function (velocity, performFling, $completion) {
    var tmp = new $applyToFlingCOROUTINE$40(this, velocity, performFling, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(JSOverscrollEffect).z9l = function () {
    return this.hax_1;
  };
  protoOf(JSOverscrollEffect).k8n = function () {
    return this.iax_1;
  };
  function isMouseInputWorkaround() {
    return true;
  }
  function platformScrollConfig(_this__u8e3s4) {
    return JsConfig_instance;
  }
  function JsConfig() {
  }
  protoOf(JsConfig).k96 = function (_this__u8e3s4, event, bounds) {
    return Offset__times_impl_jz1mli(get_totalScrollDelta(event), -1.0);
  };
  var JsConfig_instance;
  function JsConfig_getInstance() {
    return JsConfig_instance;
  }
  function get_totalScrollDelta(_this__u8e3s4) {
    // Inline function 'androidx.compose.ui.util.fastFold' call
    var this_0 = _this__u8e3s4.b5f_1;
    // Inline function 'kotlin.contracts.contract' call
    var accumulator = Companion_getInstance_1().u33_1;
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = this_0.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = this_0.n(index);
        // Inline function 'androidx.compose.ui.util.fastFold.<anonymous>' call
        // Inline function 'androidx.compose.foundation.gestures.<get-totalScrollDelta>.<anonymous>' call
        var acc = accumulator;
        accumulator = Offset__plus_impl_c78cg0(acc, item.q5f_1);
      }
       while (inductionVariable <= last);
    return accumulator;
  }
  function rememberPlatformDefaultFlingBehavior($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-310195481);
    sourceInformation($composer_0, 'C(rememberPlatformDefaultFlingBehavior)31@1254L33,32@1299L67:Scrollable.jsWasm.kt#8bwon0');
    if (isTraceInProgress()) {
      traceEventStart(-310195481, $changed, -1, 'androidx.compose.foundation.gestures.rememberPlatformDefaultFlingBehavior (Scrollable.jsWasm.kt:30)');
    }
    var flingSpec = rememberSplineBasedDecay($composer_0, 0);
    $composer_0.j1l(-1362343526);
    sourceInformation($composer_0, 'CC(remember):Scrollable.jsWasm.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = $composer_0.v1o(flingSpec);
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_2().w1r_1) {
      // Inline function 'androidx.compose.foundation.gestures.rememberPlatformDefaultFlingBehavior.<anonymous>' call
      var value = new DefaultFlingBehavior(flingSpec);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1_group;
  }
  function platformDefaultFlingBehavior() {
    return new DefaultFlingBehavior(generateDecayAnimationSpec(new SplineBasedFloatDecayAnimationSpec(get_UnityDensity())));
  }
  function getDefaultLazyLayoutKey(index) {
    return new DefaultLazyKey(index);
  }
  function DefaultLazyKey(index) {
    this.jax_1 = index;
  }
  protoOf(DefaultLazyKey).toString = function () {
    return 'DefaultLazyKey(index=' + this.jax_1 + ')';
  };
  protoOf(DefaultLazyKey).hashCode = function () {
    return this.jax_1;
  };
  protoOf(DefaultLazyKey).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DefaultLazyKey))
      return false;
    var tmp0_other_with_cast = other instanceof DefaultLazyKey ? other : THROW_CCE();
    if (!(this.jax_1 === tmp0_other_with_cast.jax_1))
      return false;
    return true;
  };
  var isInTouchMode;
  function makeSelectionModifier(_this__u8e3s4, selectableId, layoutCoordinates) {
    return makeDefaultSelectionModifier(_this__u8e3s4, selectableId, layoutCoordinates);
  }
  function get_DefaultSelectionColor() {
    _init_properties_DefaultTextSelectionColors_js_kt__ohmec7();
    return DefaultSelectionColor;
  }
  var DefaultSelectionColor;
  function get_DefaultTextSelectionColors() {
    _init_properties_DefaultTextSelectionColors_js_kt__ohmec7();
    return DefaultTextSelectionColors;
  }
  var DefaultTextSelectionColors;
  var properties_initialized_DefaultTextSelectionColors_js_kt_i7z293;
  function _init_properties_DefaultTextSelectionColors_js_kt__ohmec7() {
    if (!properties_initialized_DefaultTextSelectionColors_js_kt_i7z293) {
      properties_initialized_DefaultTextSelectionColors_js_kt_i7z293 = true;
      DefaultSelectionColor = Color_0(new Long(-12417292, 0));
      DefaultTextSelectionColors = new TextSelectionColors(get_DefaultSelectionColor(), Color__copy$default_impl_ectz3s(get_DefaultSelectionColor(), 0.4));
    }
  }
  function AtomicReference(value) {
    this.q8m_1 = value;
  }
  protoOf(AtomicReference).zu = function () {
    // Inline function 'kotlinx.atomicfu.atomicfu_getValue' call
    return this.q8m_1;
  };
  protoOf(AtomicReference).f23 = function (expect, newValue) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.atomicfu.atomicfu_compareAndSet' call
      if (equals(this.q8m_1, expect)) {
        // Inline function 'androidx.compose.foundation.AtomicReference.compareAndSet.<set-delegate>' call
        this.q8m_1 = newValue;
        tmp$ret$0 = true;
        break $l$block_0;
      } else {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    return tmp$ret$0;
  };
  function get_isPress(_this__u8e3s4) {
    return get_type(_this__u8e3s4) === Companion_getInstance_11().g51_1 ? equals(get_key(_this__u8e3s4), Companion_getInstance_10().i6q_1) : false;
  }
  function get_isClick(_this__u8e3s4) {
    return get_type(_this__u8e3s4) === Companion_getInstance_11().f51_1 ? equals(get_key(_this__u8e3s4), Companion_getInstance_10().i6q_1) : false;
  }
  function isComposeRootInScrollableContainer(_this__u8e3s4) {
    return false;
  }
  function LazyLayoutPrefetcher(prefetchState, itemContentFactory, subcomposeLayoutState, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(345331320);
    sourceInformation($composer_0, 'C(LazyLayoutPrefetcher)P(1):LazyLayoutPrefetcher.skiko.kt#wow0x6');
    if (!(($changed & 1) === 0) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(345331320, $changed, -1, 'androidx.compose.foundation.lazy.layout.LazyLayoutPrefetcher (LazyLayoutPrefetcher.skiko.kt:28)');
      }
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
      tmp0_safe_receiver.j24(LazyLayoutPrefetcher$lambda(prefetchState, itemContentFactory, subcomposeLayoutState, $changed));
    }
  }
  function LazyLayoutPrefetcher$lambda($prefetchState, $itemContentFactory, $subcomposeLayoutState, $$changed) {
    return function ($composer, $force) {
      LazyLayoutPrefetcher($prefetchState, $itemContentFactory, $subcomposeLayoutState, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function defaultBringIntoViewParent(_this__u8e3s4) {
    var tmp = defaultBringIntoViewParent$slambda_0(null);
    return new sam$androidx_compose_foundation_relocation_BringIntoViewParent$0(tmp);
  }
  function sam$androidx_compose_foundation_relocation_BringIntoViewParent$0(function_0) {
    this.kax_1 = function_0;
  }
  protoOf(sam$androidx_compose_foundation_relocation_BringIntoViewParent$0).waf = function (childCoordinates, boundsProvider, $completion) {
    return this.kax_1(childCoordinates, boundsProvider, $completion);
  };
  function defaultBringIntoViewParent$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(defaultBringIntoViewParent$slambda).vax = function (_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, $completion) {
    var tmp = this.wax(_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(defaultBringIntoViewParent$slambda).nh = function (p1, p2, $completion) {
    var tmp = (!(p1 == null) ? isInterface(p1, LayoutCoordinates) : false) ? p1 : THROW_CCE();
    return this.vax(tmp, (!(p2 == null) ? typeof p2 === 'function' : false) ? p2 : THROW_CCE(), $completion);
  };
  protoOf(defaultBringIntoViewParent$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          return Unit_instance;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(defaultBringIntoViewParent$slambda).wax = function (_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, completion) {
    var i = new defaultBringIntoViewParent$slambda(completion);
    i.tax_1 = _anonymous_parameter_0__qggqh8;
    i.uax_1 = _anonymous_parameter_1__qggqgd;
    return i;
  };
  function defaultBringIntoViewParent$slambda_0(resultContinuation) {
    var i = new defaultBringIntoViewParent$slambda(resultContinuation);
    var l = function (_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, $completion) {
      return i.vax(_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function textPointerHoverIcon(_this__u8e3s4, selectionRegistrar) {
    return selectionRegistrar == null ? _this__u8e3s4 : pointerHoverIcon(_this__u8e3s4, get_textPointerIcon());
  }
  function findFollowingBreak(_this__u8e3s4, index) {
    var it = Companion_getInstance_21().k38();
    it.s38(_this__u8e3s4);
    return it.r38(index);
  }
  function findPrecedingBreak(_this__u8e3s4, index) {
    var it = Companion_getInstance_21().k38();
    it.s38(_this__u8e3s4);
    return it.q38(index);
  }
  function get_textPointerIcon() {
    _init_properties_TextPointerIcon_skiko_kt__4sfdky();
    return textPointerIcon;
  }
  var textPointerIcon;
  var properties_initialized_TextPointerIcon_skiko_kt_3qxo0w;
  function _init_properties_TextPointerIcon_skiko_kt__4sfdky() {
    if (!properties_initialized_TextPointerIcon_skiko_kt_3qxo0w) {
      properties_initialized_TextPointerIcon_skiko_kt_3qxo0w = true;
      textPointerIcon = Companion_getInstance_22().s5h_1;
    }
  }
  //region block: post-declaration
  protoOf(BackgroundNode).u4v = onMeasureResultChanged;
  protoOf(AbstractClickableNode).t5i = interceptOutOfBoundsChildEvents;
  protoOf(AbstractClickableNode).u5i = sharePointerInputWithSiblings;
  protoOf(AbstractClickableNode).v5i = onDensityChange;
  protoOf(AbstractClickableNode).w5i = onViewConfigurationChange;
  protoOf(ClickableSemanticsNode).h62 = get_shouldClearDescendantSemantics;
  protoOf(AbstractClickablePointerInputNode).f53 = get_providedValues;
  protoOf(AbstractClickablePointerInputNode).b53 = get_current;
  protoOf(AbstractClickablePointerInputNode).t5i = interceptOutOfBoundsChildEvents;
  protoOf(AbstractClickablePointerInputNode).u5i = sharePointerInputWithSiblings;
  protoOf(AbstractClickablePointerInputNode).v5i = onDensityChange;
  protoOf(AbstractClickablePointerInputNode).w5i = onViewConfigurationChange;
  protoOf(FocusableNode).n5s = onRemeasured;
  protoOf(FocusableNode).h62 = get_shouldClearDescendantSemantics;
  protoOf(FocusableNode).i62 = get_shouldMergeDescendantSemantics;
  protoOf(FocusableSemanticsNode).h62 = get_shouldClearDescendantSemantics;
  protoOf(FocusableSemanticsNode).i62 = get_shouldMergeDescendantSemantics;
  protoOf(FocusedBoundsNode).f53 = get_providedValues;
  protoOf(FocusedBoundsNode).b53 = get_current;
  protoOf(FocusedBoundsObserverNode).b53 = get_current;
  protoOf(HoverableNode).t5i = interceptOutOfBoundsChildEvents;
  protoOf(HoverableNode).u5i = sharePointerInputWithSiblings;
  protoOf(HoverableNode).v5i = onDensityChange;
  protoOf(HoverableNode).w5i = onViewConfigurationChange;
  protoOf(IndicationModifier).u4t = foldIn;
  protoOf(IndicationModifier).v4t = all;
  protoOf(IndicationModifier).q4t = then;
  protoOf(AbstractDraggableNode).t5i = interceptOutOfBoundsChildEvents;
  protoOf(AbstractDraggableNode).u5i = sharePointerInputWithSiblings;
  protoOf(AbstractDraggableNode).v5i = onDensityChange;
  protoOf(AbstractDraggableNode).w5i = onViewConfigurationChange;
  protoOf(ScrollableNestedScrollConnection).p5a = onPreFling;
  protoOf(ModifierLocalScrollableContainerProvider).b53 = get_current;
  protoOf(DefaultScrollMotionDurationScale$1).r2 = get_key_0;
  protoOf(DefaultScrollMotionDurationScale$1).hc = get;
  protoOf(DefaultScrollMotionDurationScale$1).uf = fold;
  protoOf(DefaultScrollMotionDurationScale$1).tf = minusKey;
  protoOf(DefaultScrollMotionDurationScale$1).vf = plus;
  protoOf(UnityDensity$1).y35 = toPx;
  protoOf(UnityDensity$1).a36 = toPx_0;
  protoOf(UnityDensity$1).z35 = roundToPx;
  protoOf(UnityDensity$1).e36 = toDp;
  protoOf(UnityDensity$1).f36 = toSize_0;
  protoOf(DefaultScrollableState).a8q = scroll$default;
  protoOf(DefaultScrollableState).o96 = get_canScrollForward;
  protoOf(DefaultScrollableState).n96 = get_canScrollBackward;
  protoOf(LazyGridState$remeasurementModifier$1).u4t = foldIn;
  protoOf(LazyGridState$remeasurementModifier$1).v4t = all;
  protoOf(LazyGridState$remeasurementModifier$1).q4t = then;
  protoOf(LazyGridState).a8q = scroll$default;
  protoOf(rememberLazyGridSemanticState$1$1).oa9 = pseudoScrollOffset;
  protoOf(rememberLazyGridSemanticState$1$1).pa9 = pseudoMaxScrollOffset;
  protoOf(AwaitFirstLayoutModifier).u4t = foldIn;
  protoOf(AwaitFirstLayoutModifier).v4t = all;
  protoOf(AwaitFirstLayoutModifier).q4t = then;
  protoOf(LazyLayoutBeyondBoundsModifierLocal).u4t = foldIn;
  protoOf(LazyLayoutBeyondBoundsModifierLocal).v4t = all;
  protoOf(LazyLayoutBeyondBoundsModifierLocal).q4t = then;
  protoOf(LazyLayoutMeasureScopeImpl).s57 = layout$default;
  protoOf(BringIntoViewChildNode).f53 = get_providedValues;
  protoOf(BringIntoViewChildNode).b53 = get_current;
  protoOf(BringIntoViewChildNode).n5s = onRemeasured;
  protoOf(BringIntoViewRequesterImpl).g8e = bringIntoView$default;
  protoOf(SelectableTextAnnotatedStringNode).u4v = onMeasureResultChanged;
  protoOf(TextAnnotatedStringNode).u4v = onMeasureResultChanged;
  protoOf(TextAnnotatedStringNode).h62 = get_shouldClearDescendantSemantics;
  protoOf(TextAnnotatedStringNode).i62 = get_shouldMergeDescendantSemantics;
  protoOf(TextStringSimpleNode).u4v = onMeasureResultChanged;
  protoOf(TextStringSimpleNode).h62 = get_shouldClearDescendantSemantics;
  protoOf(TextStringSimpleNode).i62 = get_shouldMergeDescendantSemantics;
  protoOf(JsConfig).m96 = get_isSmoothScrollingEnabled;
  protoOf(JsConfig).l96 = isPreciseWheelScroll;
  //endregion
  //region block: init
  DefaultDebugIndication_instance = new DefaultDebugIndication();
  NoIndicationInstance_instance = new NoIndicationInstance();
  NoIndication_instance = new NoIndication();
  ScrollableDefaults_instance = new ScrollableDefaults();
  Companion_instance_5 = new Companion_2();
  LazyGridItemScopeImpl_instance = new LazyGridItemScopeImpl();
  LazyGridItemSpanScopeImpl_instance = new LazyGridItemSpanScopeImpl();
  Empty_instance = new Empty();
  Companion_instance_9 = new Companion_6();
  DummyHandle_instance = new DummyHandle();
  Companion_instance_10 = new Companion_7();
  DefaultMinLines = 1;
  SNAPSHOTS_INTERVAL_MILLIS = 5000;
  Companion_instance_12 = new Companion_9();
  TapIndicationDelay = new Long(0, 0);
  JsConfig_instance = new JsConfig();
  isInTouchMode = false;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Cancel;
  _.$_$.b = Start;
  _.$_$.c = Stop;
  _.$_$.d = Focus;
  _.$_$.e = Unfocus;
  _.$_$.f = Enter;
  _.$_$.g = Exit;
  _.$_$.h = Interaction;
  _.$_$.i = Cancel_0;
  _.$_$.j = Press;
  _.$_$.k = Release;
  _.$_$.l = Adaptive;
  _.$_$.m = LazyVerticalGrid;
  _.$_$.n = get_CircleShape;
  _.$_$.o = RoundedCornerShape_2;
  _.$_$.p = RoundedCornerShape_3;
  _.$_$.q = get_LocalTextSelectionColors;
  _.$_$.r = TextSelectionColors;
  _.$_$.s = BasicText;
  _.$_$.t = Canvas;
  _.$_$.u = get_LocalIndication;
  _.$_$.v = background;
  _.$_$.w = background_0;
  _.$_$.x = clickable;
  _.$_$.y = progressSemantics;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-foundation-foundation.js.map
