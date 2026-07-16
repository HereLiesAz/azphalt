(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-runtime-runtime.js', './kotlinx-coroutines-core.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-ui-ui-geometry.js', './compose-multiplatform-core-collection-collection.js', './compose-multiplatform-core-compose-ui-ui.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./kotlinx-coroutines-core.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'), require('./compose-multiplatform-core-collection-collection.js'), require('./compose-multiplatform-core-compose-ui-ui.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-collection-collection'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-collection-collection' was not found. Please, check whether 'compose-multiplatform-core-collection-collection' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    root['compose-multiplatform-core-compose-animation-animation-core'] = factory(typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-animation-animation-core'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-runtime-runtime'], this['kotlinx-coroutines-core'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-ui-ui-geometry'], this['compose-multiplatform-core-collection-collection'], this['compose-multiplatform-core-compose-ui-ui']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_collection_internal_collection, kotlin_org_jetbrains_compose_ui_ui) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var equals = kotlin_kotlin.$_$.da;
  var VOID = kotlin_kotlin.$_$.g;
  var coerceIn = kotlin_kotlin.$_$.fc;
  var Long = kotlin_kotlin.$_$.ve;
  var CoroutineImpl = kotlin_kotlin.$_$.n9;
  var protoOf = kotlin_kotlin.$_$.ib;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.z8;
  var CancellationException = kotlin_kotlin.$_$.y8;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var KMutableProperty1 = kotlin_kotlin.$_$.pc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ja;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var rememberUpdatedState = kotlin_org_jetbrains_compose_runtime_runtime.$_$.m1;
  var Factory_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n;
  var Channel = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.s;
  var SideEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v;
  var LaunchedEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q;
  var KProperty0 = kotlin_kotlin.$_$.qc;
  var THROW_ISE = kotlin_kotlin.$_$.df;
  var getLocalDelegateReference = kotlin_kotlin.$_$.ha;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var isInterface = kotlin_kotlin.$_$.wa;
  var ChannelResult__getOrNull_impl_f5e07h = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.l;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q1;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w2;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i1;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.g1;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z2;
  var IntOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o;
  var Companion_getInstance_5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a3;
  var IntSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q;
  var objectCreate = kotlin_kotlin.$_$.gb;
  var isNaN_0 = kotlin_kotlin.$_$.zf;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var interfaceMeta = kotlin_kotlin.$_$.na;
  var Enum = kotlin_kotlin.$_$.qe;
  var hashCode = kotlin_kotlin.$_$.la;
  var getNumberHashCode = kotlin_kotlin.$_$.ia;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var get_BitmaskMsb = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.a;
  var toLong = kotlin_kotlin.$_$.lb;
  var mutableIntObjectMapOf = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.i;
  var to = kotlin_kotlin.$_$.og;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var State = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.jg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var coerceIn_0 = kotlin_kotlin.$_$.hc;
  var numberToLong = kotlin_kotlin.$_$.fb;
  var withFrameNanos = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x1;
  var Key_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.l5;
  var isArray = kotlin_kotlin.$_$.oa;
  var snapshotFlow = kotlin_org_jetbrains_compose_runtime_runtime.$_$.o1;
  var first = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.c;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var fillArrayVal = kotlin_kotlin.$_$.ea;
  var MutableVector = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a;
  var DisposableEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.c1;
  var Key_instance_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var ensureNotNull = kotlin_kotlin.$_$.uf;
  var Mutex = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z;
  var coroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.f;
  var captureStack = kotlin_kotlin.$_$.u9;
  var isFinite = kotlin_kotlin.$_$.wf;
  var isNaN_1 = kotlin_kotlin.$_$.ag;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.b4;
  var floatFromBits = kotlin_kotlin.$_$.fa;
  var toRawBits = kotlin_kotlin.$_$.mg;
  var Key_instance_1 = kotlin_org_jetbrains_compose_ui_ui.$_$.p5;
  var numberToInt = kotlin_kotlin.$_$.eb;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y1;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var _DpOffset___get_x__impl__uauqb5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z1;
  var _DpOffset___get_y__impl__1h898y = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a2;
  var DpOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.i;
  var DpOffset_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.j;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.x;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.y;
  var Offset_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var _IntOffset___get_x__impl__qiqr5o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b2;
  var _IntOffset___get_y__impl__2avpwj = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c2;
  var roundToInt = kotlin_kotlin.$_$.tb;
  var IntOffset_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n;
  var _IntSize___get_width__impl__d9yl4o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f2;
  var _IntSize___get_height__impl__prv63b = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e2;
  var IntSize_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p;
  var Rect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f;
  var until = kotlin_kotlin.$_$.mc;
  var Companion_getInstance_6 = kotlin_kotlin.$_$.k4;
  var getValue = kotlin_kotlin.$_$.b7;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.w5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var Companion_getInstance_7 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x2;
  var mapOf = kotlin_kotlin.$_$.x7;
  var CancellationException_init_$Init$ = kotlin_kotlin.$_$.b1;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Animatable$runAnimation$slambda, 'Animatable$runAnimation$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(Animatable$snapTo$slambda, 'Animatable$snapTo$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(Animatable$stop$slambda, 'Animatable$stop$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(Animatable, 'Animatable', classMeta, VOID, VOID, VOID, VOID, VOID, [4, 3, 1, 0]);
  setMetadataFor(AnimationResult, 'AnimationResult', classMeta);
  setMetadataFor(animateValueAsState$slambda$slambda, 'animateValueAsState$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(animateValueAsState$slambda, 'animateValueAsState$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  function isFinishedFromNanos(playTimeNanos) {
    return playTimeNanos.z6(this.x7i()) >= 0;
  }
  setMetadataFor(Animation, 'Animation', interfaceMeta);
  setMetadataFor(TargetBasedAnimation, 'TargetBasedAnimation', classMeta, VOID, [Animation]);
  setMetadataFor(DecayAnimation, 'DecayAnimation', classMeta, VOID, [Animation]);
  setMetadataFor(AnimationEndReason, 'AnimationEndReason', classMeta, Enum);
  setMetadataFor(SpringSpec, 'SpringSpec', classMeta, VOID, VOID, SpringSpec);
  setMetadataFor(InfiniteRepeatableSpec, 'InfiniteRepeatableSpec', classMeta);
  setMetadataFor(KeyframesSpecBaseConfig, 'KeyframesSpecBaseConfig', classMeta);
  setMetadataFor(KeyframesSpecConfig, 'KeyframesSpecConfig', classMeta, KeyframesSpecBaseConfig, VOID, KeyframesSpecConfig);
  setMetadataFor(KeyframeBaseEntity, 'KeyframeBaseEntity', classMeta);
  setMetadataFor(KeyframeEntity, 'KeyframeEntity', classMeta, KeyframeBaseEntity);
  setMetadataFor(KeyframesSpec, 'KeyframesSpec', classMeta);
  setMetadataFor(TweenSpec, 'TweenSpec', classMeta, VOID, VOID, TweenSpec);
  setMetadataFor(RepeatMode, 'RepeatMode', classMeta, Enum);
  setMetadataFor(AnimationConstants, 'AnimationConstants', objectMeta);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(AnimationState, 'AnimationState', classMeta, VOID, [State]);
  setMetadataFor(AnimationScope, 'AnimationScope', classMeta);
  setMetadataFor(AnimationVector_3, 'AnimationVector', classMeta);
  setMetadataFor(AnimationVector1D, 'AnimationVector1D', classMeta, AnimationVector_3);
  setMetadataFor(AnimationVector2D, 'AnimationVector2D', classMeta, AnimationVector_3);
  setMetadataFor(AnimationVector3D, 'AnimationVector3D', classMeta, AnimationVector_3);
  setMetadataFor(AnimationVector4D, 'AnimationVector4D', classMeta, AnimationVector_3);
  setMetadataFor(ComplexDouble, 'ComplexDouble', classMeta);
  setMetadataFor(DecayAnimationSpecImpl, 'DecayAnimationSpecImpl', classMeta);
  setMetadataFor(VectorizedFloatDecaySpec, 'VectorizedFloatDecaySpec', classMeta);
  setMetadataFor(CubicBezierEasing, 'CubicBezierEasing', classMeta);
  setMetadataFor(sam$androidx_compose_animation_core_Easing$0, 'sam$androidx_compose_animation_core_Easing$0', classMeta);
  function getEndVelocity(initialValue, targetValue, initialVelocity) {
    return this.v7l(this.x7l(initialValue, targetValue, initialVelocity), initialValue, targetValue, initialVelocity);
  }
  function vectorize(converter) {
    return VectorizedFloatAnimationSpec_init_$Create$(this);
  }
  setMetadataFor(FloatAnimationSpec, 'FloatAnimationSpec', interfaceMeta);
  setMetadataFor(FloatSpringSpec, 'FloatSpringSpec', classMeta, VOID, [FloatAnimationSpec], FloatSpringSpec);
  setMetadataFor(FloatTweenSpec, 'FloatTweenSpec', classMeta, VOID, [FloatAnimationSpec], FloatTweenSpec);
  setMetadataFor(withInfiniteAnimationFrameNanos$slambda, 'withInfiniteAnimationFrameNanos$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor($withInfiniteAnimationFrameNanosCOROUTINE$0, '$withInfiniteAnimationFrameNanosCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(InfiniteTransition$run$slambda$slambda, 'InfiniteTransition$run$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(TransitionAnimationState, 'TransitionAnimationState', classMeta, VOID, [State]);
  setMetadataFor(InfiniteTransition$run$slambda, 'InfiniteTransition$run$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(InfiniteTransition, 'InfiniteTransition', classMeta);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta);
  setMetadataFor(Mutator, 'Mutator', classMeta);
  setMetadataFor(MutatorMutex$mutate$slambda, 'MutatorMutex$mutate$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MutatorMutex, 'MutatorMutex', classMeta, VOID, VOID, MutatorMutex, VOID, VOID, [2, 3]);
  setMetadataFor(MutatePriority, 'MutatePriority', classMeta, Enum);
  setMetadataFor(PlatformOptimizedCancellationException, 'PlatformOptimizedCancellationException', classMeta, CancellationException);
  setMetadataFor(MutationInterruptedException, 'MutationInterruptedException', classMeta, PlatformOptimizedCancellationException, VOID, MutationInterruptedException);
  setMetadataFor(SpringSimulation, 'SpringSimulation', classMeta);
  setMetadataFor($animateCOROUTINE$1, '$animateCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor($callWithFrameNanosCOROUTINE$2, '$callWithFrameNanosCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor(TwoWayConverterImpl, 'TwoWayConverterImpl', classMeta);
  setMetadataFor(Spring, 'Spring', objectMeta);
  function getEndVelocity_0(initialValue, targetValue, initialVelocity) {
    return this.z7i(this.q7i(initialValue, targetValue, initialVelocity), initialValue, targetValue, initialVelocity);
  }
  setMetadataFor(VectorizedAnimationSpec, 'VectorizedAnimationSpec', interfaceMeta);
  function get_isInfinite() {
    return false;
  }
  setMetadataFor(VectorizedFiniteAnimationSpec, 'VectorizedFiniteAnimationSpec', interfaceMeta, VOID, [VectorizedAnimationSpec]);
  setMetadataFor(VectorizedSpringSpec, 'VectorizedSpringSpec', classMeta, VOID, [VectorizedFiniteAnimationSpec], VectorizedSpringSpec_init_$Create$);
  setMetadataFor(VectorizedFloatAnimationSpec$1, VOID, classMeta);
  setMetadataFor(VectorizedFloatAnimationSpec, 'VectorizedFloatAnimationSpec', classMeta, VOID, [VectorizedFiniteAnimationSpec]);
  setMetadataFor(VectorizedInfiniteRepeatableSpec, 'VectorizedInfiniteRepeatableSpec', classMeta, VOID, [VectorizedAnimationSpec]);
  function getDurationNanos(initialValue, targetValue, initialVelocity) {
    return numberToLong(this.f7s() + this.g7s() | 0).w9(get_MillisToNanos());
  }
  setMetadataFor(VectorizedDurationBasedAnimationSpec, 'VectorizedDurationBasedAnimationSpec', interfaceMeta, VOID, [VectorizedFiniteAnimationSpec]);
  setMetadataFor(VectorizedKeyframesSpec, 'VectorizedKeyframesSpec', classMeta, VOID, [VectorizedDurationBasedAnimationSpec]);
  setMetadataFor(VectorizedTweenSpec, 'VectorizedTweenSpec', classMeta, VOID, [VectorizedDurationBasedAnimationSpec], VectorizedTweenSpec);
  setMetadataFor(createSpringAnimations$1, VOID, classMeta);
  setMetadataFor(createSpringAnimations$2, VOID, classMeta);
  setMetadataFor(AtomicReference, 'AtomicReference', classMeta);
  //endregion
  function get_positiveInfinityBounds1D() {
    _init_properties_Animatable_kt__f2hc5e();
    return positiveInfinityBounds1D;
  }
  var positiveInfinityBounds1D;
  function get_positiveInfinityBounds2D() {
    _init_properties_Animatable_kt__f2hc5e();
    return positiveInfinityBounds2D;
  }
  var positiveInfinityBounds2D;
  function get_positiveInfinityBounds3D() {
    _init_properties_Animatable_kt__f2hc5e();
    return positiveInfinityBounds3D;
  }
  var positiveInfinityBounds3D;
  function get_positiveInfinityBounds4D() {
    _init_properties_Animatable_kt__f2hc5e();
    return positiveInfinityBounds4D;
  }
  var positiveInfinityBounds4D;
  function get_negativeInfinityBounds1D() {
    _init_properties_Animatable_kt__f2hc5e();
    return negativeInfinityBounds1D;
  }
  var negativeInfinityBounds1D;
  function get_negativeInfinityBounds2D() {
    _init_properties_Animatable_kt__f2hc5e();
    return negativeInfinityBounds2D;
  }
  var negativeInfinityBounds2D;
  function get_negativeInfinityBounds3D() {
    _init_properties_Animatable_kt__f2hc5e();
    return negativeInfinityBounds3D;
  }
  var negativeInfinityBounds3D;
  function get_negativeInfinityBounds4D() {
    _init_properties_Animatable_kt__f2hc5e();
    return negativeInfinityBounds4D;
  }
  var negativeInfinityBounds4D;
  function Animatable$runAnimation$slambda$lambda(this$0, $endState, $block, $clampingNeeded) {
    return function ($this$animate) {
      updateState($this$animate, this$0.z7d_1);
      var clamped = clampToBounds(this$0, $this$animate.s2());
      var tmp;
      if (!equals(clamped, $this$animate.s2())) {
        this$0.z7d_1.g1d(clamped);
        $endState.g1d(clamped);
        var tmp0_safe_receiver = $block;
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver(this$0);
        $this$animate.z7e();
        $clampingNeeded._v = true;
        tmp = Unit_instance;
      } else {
        var tmp1_safe_receiver = $block;
        if (tmp1_safe_receiver == null)
          null;
        else
          tmp1_safe_receiver(this$0);
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function _set_isRunning__kpbg34($this, _set____db54di) {
    var this_0 = $this.a7e_1;
    isRunning$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _set_targetValue__aqsk0r($this, _set____db54di) {
    var this_0 = $this.b7e_1;
    targetValue$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function runAnimation($this, animation, initialVelocity, block, $completion) {
    var startTime = $this.z7d_1.w7e_1;
    return $this.e7e_1.c7f(VOID, Animatable$runAnimation$slambda_0($this, initialVelocity, animation, startTime, block, null), $completion);
  }
  function clampToBounds($this, value) {
    if (equals($this.i7e_1, $this.g7e_1) ? equals($this.j7e_1, $this.h7e_1) : false) {
      return value;
    }
    var valueVector = $this.w7d_1.d7f()(value);
    var clamped = false;
    var inductionVariable = 0;
    var last = valueVector.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (valueVector.n(i) < $this.i7e_1.n(i) ? true : valueVector.n(i) > $this.j7e_1.n(i)) {
          clamped = true;
          valueVector.e7f(i, coerceIn(valueVector.n(i), $this.i7e_1.n(i), $this.j7e_1.n(i)));
        }
      }
       while (inductionVariable < last);
    if (clamped) {
      return $this.w7d_1.f7f()(valueVector);
    } else {
      return value;
    }
  }
  function endAnimation($this) {
    // Inline function 'kotlin.apply' call
    var this_0 = $this.z7d_1;
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.Animatable.endAnimation.<anonymous>' call
    this_0.v7e_1.v2b();
    var tmp = this_0;
    AnimationConstants_getInstance();
    tmp.w7e_1 = new Long(0, -2147483648);
    _set_isRunning__kpbg34($this, false);
  }
  function Animatable$runAnimation$slambda(this$0, $initialVelocity, $animation, $startTime, $block, resultContinuation) {
    this.o7f_1 = this$0;
    this.p7f_1 = $initialVelocity;
    this.q7f_1 = $animation;
    this.r7f_1 = $startTime;
    this.s7f_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Animatable$runAnimation$slambda).w7f = function ($completion) {
    var tmp = this.l4g($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Animatable$runAnimation$slambda).m4g = function ($completion) {
    return this.w7f($completion);
  };
  protoOf(Animatable$runAnimation$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.bc_1 = 2;
            this.o7f_1.z7d_1.v7e_1 = this.o7f_1.w7d_1.d7f()(this.p7f_1);
            _set_targetValue__aqsk0r(this.o7f_1, this.q7f_1.x7f());
            _set_isRunning__kpbg34(this.o7f_1, true);
            var tmp_0 = this;
            AnimationConstants_getInstance();
            tmp_0.u7f_1 = copy_0(this.o7f_1.z7d_1, VOID, VOID, VOID, new Long(0, -2147483648));
            this.v7f_1 = {_v: false};
            this.ac_1 = 1;
            suspendResult = animate(this.u7f_1, this.q7f_1, this.r7f_1, Animatable$runAnimation$slambda$lambda(this.o7f_1, this.u7f_1, this.s7f_1, this.v7f_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var endReason = this.v7f_1._v ? AnimationEndReason_BoundReached_getInstance() : AnimationEndReason_Finished_getInstance();
            endAnimation(this.o7f_1);
            this.t7f_1 = new AnimationResult(this.u7f_1, endReason);
            this.bc_1 = 3;
            this.ac_1 = 4;
            continue $sm;
          case 2:
            this.bc_1 = 3;
            var tmp_1 = this.dc_1;
            if (tmp_1 instanceof CancellationException) {
              var e = this.dc_1;
              var tmp_2 = this;
              endAnimation(this.o7f_1);
              throw e;
            } else {
              throw this.dc_1;
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            return this.t7f_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 3) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  protoOf(Animatable$runAnimation$slambda).l4g = function (completion) {
    return new Animatable$runAnimation$slambda(this.o7f_1, this.p7f_1, this.q7f_1, this.r7f_1, this.s7f_1, completion);
  };
  function Animatable$runAnimation$slambda_0(this$0, $initialVelocity, $animation, $startTime, $block, resultContinuation) {
    var i = new Animatable$runAnimation$slambda(this$0, $initialVelocity, $animation, $startTime, $block, resultContinuation);
    var l = function ($completion) {
      return i.w7f($completion);
    };
    l.$arity = 0;
    return l;
  }
  function Animatable$snapTo$slambda(this$0, $targetValue, resultContinuation) {
    this.g7g_1 = this$0;
    this.h7g_1 = $targetValue;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Animatable$snapTo$slambda).i7g = function ($completion) {
    var tmp = this.l4g($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Animatable$snapTo$slambda).m4g = function ($completion) {
    return this.i7g($completion);
  };
  protoOf(Animatable$snapTo$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          endAnimation(this.g7g_1);
          var clampedValue = clampToBounds(this.g7g_1, this.h7g_1);
          this.g7g_1.z7d_1.g1d(clampedValue);
          _set_targetValue__aqsk0r(this.g7g_1, clampedValue);
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
  protoOf(Animatable$snapTo$slambda).l4g = function (completion) {
    return new Animatable$snapTo$slambda(this.g7g_1, this.h7g_1, completion);
  };
  function Animatable$snapTo$slambda_0(this$0, $targetValue, resultContinuation) {
    var i = new Animatable$snapTo$slambda(this$0, $targetValue, resultContinuation);
    var l = function ($completion) {
      return i.i7g($completion);
    };
    l.$arity = 0;
    return l;
  }
  function Animatable$stop$slambda(this$0, resultContinuation) {
    this.r7g_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Animatable$stop$slambda).i7g = function ($completion) {
    var tmp = this.l4g($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Animatable$stop$slambda).m4g = function ($completion) {
    return this.i7g($completion);
  };
  protoOf(Animatable$stop$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          endAnimation(this.r7g_1);
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
  protoOf(Animatable$stop$slambda).l4g = function (completion) {
    return new Animatable$stop$slambda(this.r7g_1, completion);
  };
  function Animatable$stop$slambda_0(this$0, resultContinuation) {
    var i = new Animatable$stop$slambda(this$0, resultContinuation);
    var l = function ($completion) {
      return i.i7g($completion);
    };
    l.$arity = 0;
    return l;
  }
  function Animatable(initialValue, typeConverter, visibilityThreshold, label) {
    visibilityThreshold = visibilityThreshold === VOID ? null : visibilityThreshold;
    label = label === VOID ? 'Animatable' : label;
    this.w7d_1 = typeConverter;
    this.x7d_1 = visibilityThreshold;
    this.y7d_1 = label;
    this.z7d_1 = new AnimationState(this.w7d_1, initialValue);
    this.a7e_1 = mutableStateOf(false);
    this.b7e_1 = mutableStateOf(initialValue);
    this.c7e_1 = null;
    this.d7e_1 = null;
    this.e7e_1 = new MutatorMutex();
    this.f7e_1 = new SpringSpec(VOID, VOID, this.x7d_1);
    var tmp = this;
    var tmp0_subject = this.s7g();
    var tmp_0;
    if (tmp0_subject instanceof AnimationVector1D) {
      tmp_0 = get_negativeInfinityBounds1D();
    } else {
      if (tmp0_subject instanceof AnimationVector2D) {
        tmp_0 = get_negativeInfinityBounds2D();
      } else {
        if (tmp0_subject instanceof AnimationVector3D) {
          tmp_0 = get_negativeInfinityBounds3D();
        } else {
          tmp_0 = get_negativeInfinityBounds4D();
        }
      }
    }
    var tmp_1 = tmp_0;
    tmp.g7e_1 = tmp_1 instanceof AnimationVector_3 ? tmp_1 : THROW_CCE();
    var tmp_2 = this;
    var tmp0_subject_0 = this.s7g();
    var tmp_3;
    if (tmp0_subject_0 instanceof AnimationVector1D) {
      tmp_3 = get_positiveInfinityBounds1D();
    } else {
      if (tmp0_subject_0 instanceof AnimationVector2D) {
        tmp_3 = get_positiveInfinityBounds2D();
      } else {
        if (tmp0_subject_0 instanceof AnimationVector3D) {
          tmp_3 = get_positiveInfinityBounds3D();
        } else {
          tmp_3 = get_positiveInfinityBounds4D();
        }
      }
    }
    var tmp_4 = tmp_3;
    tmp_2.h7e_1 = tmp_4 instanceof AnimationVector_3 ? tmp_4 : THROW_CCE();
    this.i7e_1 = this.g7e_1;
    this.j7e_1 = this.h7e_1;
  }
  protoOf(Animatable).s2 = function () {
    return this.z7d_1.s2();
  };
  protoOf(Animatable).s7g = function () {
    return this.z7d_1.v7e_1;
  };
  protoOf(Animatable).t7g = function () {
    return this.w7d_1.f7f()(this.s7g());
  };
  protoOf(Animatable).u7g = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.a7e_1;
    isRunning$factory_0();
    return this_0.s2();
  };
  protoOf(Animatable).x7f = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.b7e_1;
    targetValue$factory_0();
    return this_0.s2();
  };
  protoOf(Animatable).v7g = function (targetValue, animationSpec, initialVelocity, block, $completion) {
    var tmp0_initialValue = this.s2();
    var tmp1_typeConverter = this.w7d_1;
    var anim = TargetBasedAnimation_0(animationSpec, tmp1_typeConverter, tmp0_initialValue, targetValue, initialVelocity);
    return runAnimation(this, anim, initialVelocity, block, $completion);
  };
  protoOf(Animatable).w7g = function (targetValue, animationSpec, initialVelocity, block, $completion, $super) {
    animationSpec = animationSpec === VOID ? this.f7e_1 : animationSpec;
    initialVelocity = initialVelocity === VOID ? this.t7g() : initialVelocity;
    block = block === VOID ? null : block;
    return $super === VOID ? this.v7g(targetValue, animationSpec, initialVelocity, block, $completion) : $super.v7g.call(this, targetValue, animationSpec, initialVelocity, block, $completion);
  };
  protoOf(Animatable).x7g = function (targetValue, $completion) {
    return this.e7e_1.c7f(VOID, Animatable$snapTo$slambda_0(this, targetValue, null), $completion);
  };
  protoOf(Animatable).y7g = function ($completion) {
    return this.e7e_1.c7f(VOID, Animatable$stop$slambda_0(this, null), $completion);
  };
  protoOf(Animatable).z7g = function () {
    return this.z7d_1;
  };
  function AnimationResult(endState, endReason) {
    this.a7h_1 = endState;
    this.b7h_1 = endReason;
  }
  protoOf(AnimationResult).toString = function () {
    return 'AnimationResult(endReason=' + this.b7h_1 + ', endState=' + this.a7h_1 + ')';
  };
  function Animatable_0(initialValue, visibilityThreshold) {
    var tmp;
    if (visibilityThreshold === VOID) {
      tmp = 0.01;
    } else {
      tmp = visibilityThreshold;
    }
    visibilityThreshold = tmp;
    _init_properties_Animatable_kt__f2hc5e();
    return new Animatable(initialValue, get_VectorConverter_2(FloatCompanionObject_instance), visibilityThreshold);
  }
  function isRunning$factory() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return receiver.u7g();
    }, function (receiver, value) {
      return _set_isRunning__kpbg34(receiver, value);
    });
  }
  function isRunning$factory_0() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return receiver.u7g();
    }, function (receiver, value) {
      return _set_isRunning__kpbg34(receiver, value);
    });
  }
  function targetValue$factory() {
    return getPropertyCallableRef('targetValue', 1, KMutableProperty1, function (receiver) {
      return receiver.x7f();
    }, function (receiver, value) {
      return _set_targetValue__aqsk0r(receiver, value);
    });
  }
  function targetValue$factory_0() {
    return getPropertyCallableRef('targetValue', 1, KMutableProperty1, function (receiver) {
      return receiver.x7f();
    }, function (receiver, value) {
      return _set_targetValue__aqsk0r(receiver, value);
    });
  }
  var properties_initialized_Animatable_kt_s5cd7k;
  function _init_properties_Animatable_kt__f2hc5e() {
    if (!properties_initialized_Animatable_kt_s5cd7k) {
      properties_initialized_Animatable_kt_s5cd7k = true;
      positiveInfinityBounds1D = AnimationVector(Infinity);
      positiveInfinityBounds2D = AnimationVector_0(Infinity, Infinity);
      positiveInfinityBounds3D = AnimationVector_1(Infinity, Infinity, Infinity);
      positiveInfinityBounds4D = AnimationVector_2(Infinity, Infinity, Infinity, Infinity);
      negativeInfinityBounds1D = AnimationVector(-Infinity);
      negativeInfinityBounds2D = AnimationVector_0(-Infinity, -Infinity);
      negativeInfinityBounds3D = AnimationVector_1(-Infinity, -Infinity, -Infinity);
      negativeInfinityBounds4D = AnimationVector_2(-Infinity, -Infinity, -Infinity, -Infinity);
    }
  }
  function get_defaultAnimation() {
    _init_properties_AnimateAsState_kt__7h7b9a();
    return defaultAnimation;
  }
  var defaultAnimation;
  var dpDefaultSpring;
  var sizeDefaultSpring;
  var offsetDefaultSpring;
  var rectDefaultSpring;
  var intDefaultSpring;
  var intOffsetDefaultSpring;
  var intSizeDefaultSpring;
  function animateFloatAsState(targetValue, animationSpec, visibilityThreshold, label, finishedListener, $composer, $changed, $default) {
    _init_properties_AnimateAsState_kt__7h7b9a();
    var animationSpec_0 = animationSpec;
    var visibilityThreshold_0 = visibilityThreshold;
    var label_0 = label;
    var finishedListener_0 = finishedListener;
    var $composer_0 = $composer;
    $composer_0.j1l(668842840);
    sourceInformation($composer_0, 'C(animateFloatAsState)P(3!1,4,2)75@3368L173:AnimateAsState.kt#pdpnli');
    if (!(($default & 2) === 0))
      animationSpec_0 = get_defaultAnimation();
    if (!(($default & 4) === 0))
      visibilityThreshold_0 = 0.01;
    if (!(($default & 8) === 0))
      label_0 = 'FloatAnimation';
    if (!(($default & 16) === 0))
      finishedListener_0 = null;
    if (isTraceInProgress()) {
      traceEventStart(668842840, $changed, -1, 'androidx.compose.animation.core.animateFloatAsState (AnimateAsState.kt:68)');
    }
    $composer_0.j1l(313403102);
    sourceInformation($composer_0, '71@3220L83');
    var tmp;
    if (animationSpec_0 === get_defaultAnimation()) {
      $composer_0.j1l(313404723);
      sourceInformation($composer_0, 'CC(remember):AnimateAsState.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = (($changed & 896 ^ 384) > 256 ? $composer_0.l1y(visibilityThreshold_0) : false) ? true : ($changed & 384) === 256;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance().w1r_1) {
        // Inline function 'androidx.compose.animation.core.animateFloatAsState.<anonymous>' call
        var value = spring(VOID, VOID, visibilityThreshold_0);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      tmp = tmp1_group;
    } else {
      tmp = animationSpec_0;
    }
    var tmp2_group = tmp;
    $composer_0.l1l();
    var resolvedAnimSpec = tmp2_group;
    var tmp0 = animateValueAsState(targetValue, get_VectorConverter_2(FloatCompanionObject_instance), resolvedAnimSpec, visibilityThreshold_0, label_0, finishedListener_0, $composer_0, 14 & $changed | 7168 & $changed << 3 | 57344 & $changed << 3 | 458752 & $changed << 3, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function animateValueAsState(targetValue, typeConverter, animationSpec, visibilityThreshold, label, finishedListener, $composer, $changed, $default) {
    _init_properties_AnimateAsState_kt__7h7b9a();
    var animationSpec_0 = animationSpec;
    var visibilityThreshold_0 = visibilityThreshold;
    var label_0 = label;
    var finishedListener_0 = finishedListener;
    var $composer_0 = $composer;
    $composer_0.j1l(-1994373980);
    sourceInformation($composer_0, 'C(animateValueAsState)P(3,4!1,5,2)393@18031L21,399@18213L44,400@18279L79,401@18379L38,402@18456L339,413@18814L42,414@18861L55,417@18921L721:AnimateAsState.kt#pdpnli');
    if (!(($default & 4) === 0)) {
      $composer_0.j1l(728506592);
      sourceInformation($composer_0, 'CC(remember):AnimateAsState.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp;
      if (false ? true : it === Companion_getInstance().w1r_1) {
        // Inline function 'androidx.compose.animation.core.animateValueAsState.<anonymous>' call
        var value = spring();
        $composer_0.d1z(value);
        tmp = value;
      } else {
        tmp = it;
      }
      var tmp_0 = tmp;
      var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      $composer_0.l1l();
      animationSpec_0 = tmp0_group;
    }
    if (!(($default & 8) === 0))
      visibilityThreshold_0 = null;
    if (!(($default & 16) === 0))
      label_0 = 'ValueAnimation';
    if (!(($default & 32) === 0))
      finishedListener_0 = null;
    if (isTraceInProgress()) {
      traceEventStart(-1994373980, $changed, -1, 'androidx.compose.animation.core.animateValueAsState (AnimateAsState.kt:397)');
    }
    $composer_0.j1l(728512439);
    sourceInformation($composer_0, 'CC(remember):AnimateAsState.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_0 = $composer_0.x1y();
    var tmp_1;
    if (false ? true : it_0 === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.core.animateValueAsState.<anonymous>' call
      var value_0 = mutableStateOf(null);
      $composer_0.d1z(value_0);
      tmp_1 = value_0;
    } else {
      tmp_1 = it_0;
    }
    var tmp_2 = tmp_1;
    var tmp2_group = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
    $composer_0.l1l();
    var toolingOverride = tmp2_group;
    $composer_0.j1l(728514586);
    sourceInformation($composer_0, 'CC(remember):AnimateAsState.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_1 = $composer_0.x1y();
    var tmp_3;
    if (false ? true : it_1 === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.core.animateValueAsState.<anonymous>' call
      var value_1 = new Animatable(targetValue, typeConverter, visibilityThreshold_0, label_0);
      $composer_0.d1z(value_1);
      tmp_3 = value_1;
    } else {
      tmp_3 = it_1;
    }
    var tmp_4 = tmp_3;
    var tmp3_group = (tmp_4 == null ? true : !(tmp_4 == null)) ? tmp_4 : THROW_CCE();
    $composer_0.l1l();
    var animatable = tmp3_group;
    var listener$delegate = rememberUpdatedState(finishedListener_0, $composer_0, 14 & $changed >> 15);
    // Inline function 'kotlin.run' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.animateValueAsState.<anonymous>' call
    var $this$run = animationSpec_0;
    var tmp_5;
    var tmp_6;
    var tmp_7;
    if (!(visibilityThreshold_0 == null)) {
      tmp_7 = $this$run instanceof SpringSpec;
    } else {
      tmp_7 = false;
    }
    if (tmp_7) {
      tmp_6 = !equals($this$run.e7h_1, visibilityThreshold_0);
    } else {
      tmp_6 = false;
    }
    if (tmp_6) {
      tmp_5 = spring($this$run.c7h_1, $this$run.d7h_1, visibilityThreshold_0);
    } else {
      tmp_5 = $this$run;
    }
    var tmp$ret$13 = tmp_5;
    var animSpec$delegate = rememberUpdatedState(tmp$ret$13, $composer_0, 0);
    $composer_0.j1l(728531669);
    sourceInformation($composer_0, 'CC(remember):AnimateAsState.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it_2 = $composer_0.x1y();
    var tmp_8;
    if (false ? true : it_2 === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.core.animateValueAsState.<anonymous>' call
      Factory_getInstance();
      var value_2 = Channel(-1);
      $composer_0.d1z(value_2);
      tmp_8 = value_2;
    } else {
      tmp_8 = it_2;
    }
    var tmp_9 = tmp_8;
    var tmp4_group = (tmp_9 == null ? true : !(tmp_9 == null)) ? tmp_9 : THROW_CCE();
    $composer_0.l1l();
    var channel = tmp4_group;
    SideEffect(animateValueAsState$lambda_1(channel, targetValue), $composer_0, 0);
    LaunchedEffect(channel, animateValueAsState$slambda_0(channel, animatable, animSpec$delegate, listener$delegate, null), $composer_0, 72);
    var tmp0_elvis_lhs = toolingOverride.s2();
    var tmp1 = tmp0_elvis_lhs == null ? animatable.z7g() : tmp0_elvis_lhs;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp1;
  }
  function animateValueAsState$lambda($listener$delegate) {
    _init_properties_AnimateAsState_kt__7h7b9a();
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('listener', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $listener$delegate.s2();
  }
  function animateValueAsState$lambda_0($animSpec$delegate) {
    _init_properties_AnimateAsState_kt__7h7b9a();
    // Inline function 'androidx.compose.runtime.getValue' call
    getLocalDelegateReference('animSpec', KProperty0, false, function () {
      return THROW_ISE();
    });
    return $animSpec$delegate.s2();
  }
  function animateValueAsState$lambda_1($channel, $targetValue) {
    return function () {
      $channel.i16($targetValue);
      return Unit_instance;
    };
  }
  function animateValueAsState$slambda$slambda($newTarget, $animatable, $animSpec$delegate, $listener$delegate, resultContinuation) {
    this.n7h_1 = $newTarget;
    this.o7h_1 = $animatable;
    this.p7h_1 = $animSpec$delegate;
    this.q7h_1 = $listener$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(animateValueAsState$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(animateValueAsState$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(animateValueAsState$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (!equals(this.n7h_1, this.o7h_1.x7f())) {
              this.ac_1 = 1;
              suspendResult = this.o7h_1.w7g(this.n7h_1, animateValueAsState$lambda_0(this.p7h_1), VOID, VOID, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            var tmp0_safe_receiver = animateValueAsState$lambda(this.q7h_1);
            if (tmp0_safe_receiver == null)
              null;
            else
              tmp0_safe_receiver(this.o7h_1.s2());
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
  protoOf(animateValueAsState$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new animateValueAsState$slambda$slambda(this.n7h_1, this.o7h_1, this.p7h_1, this.q7h_1, completion);
    i.r7h_1 = $this$launch;
    return i;
  };
  function animateValueAsState$slambda$slambda_0($newTarget, $animatable, $animSpec$delegate, $listener$delegate, resultContinuation) {
    var i = new animateValueAsState$slambda$slambda($newTarget, $animatable, $animSpec$delegate, $listener$delegate, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function animateValueAsState$slambda($channel, $animatable, $animSpec$delegate, $listener$delegate, resultContinuation) {
    this.a7i_1 = $channel;
    this.b7i_1 = $animatable;
    this.c7i_1 = $animSpec$delegate;
    this.d7i_1 = $listener$delegate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(animateValueAsState$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(animateValueAsState$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(animateValueAsState$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.f7i_1 = this.a7i_1.o();
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.ac_1 = 2;
            suspendResult = this.f7i_1.b14(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            if (!suspendResult) {
              this.ac_1 = 3;
              continue $sm;
            }

            var target = this.f7i_1.f1();
            var tmp1_elvis_lhs = ChannelResult__getOrNull_impl_f5e07h(this.a7i_1.m16());
            var newTarget = tmp1_elvis_lhs == null ? target : tmp1_elvis_lhs;
            launch(this.e7i_1, VOID, VOID, animateValueAsState$slambda$slambda_0(newTarget, this.b7i_1, this.c7i_1, this.d7i_1, null));
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
  protoOf(animateValueAsState$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new animateValueAsState$slambda(this.a7i_1, this.b7i_1, this.c7i_1, this.d7i_1, completion);
    i.e7i_1 = $this$LaunchedEffect;
    return i;
  };
  function animateValueAsState$slambda_0($channel, $animatable, $animSpec$delegate, $listener$delegate, resultContinuation) {
    var i = new animateValueAsState$slambda($channel, $animatable, $animSpec$delegate, $listener$delegate, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  var properties_initialized_AnimateAsState_kt_bq3rmo;
  function _init_properties_AnimateAsState_kt__7h7b9a() {
    if (!properties_initialized_AnimateAsState_kt_bq3rmo) {
      properties_initialized_AnimateAsState_kt_bq3rmo = true;
      defaultAnimation = spring();
      dpDefaultSpring = spring(VOID, VOID, new Dp(get_VisibilityThreshold(Companion_getInstance_0())));
      sizeDefaultSpring = spring(VOID, VOID, new Size(get_VisibilityThreshold_0(Companion_getInstance_1())));
      offsetDefaultSpring = spring(VOID, VOID, new Offset(get_VisibilityThreshold_1(Companion_getInstance_2())));
      rectDefaultSpring = spring(VOID, VOID, get_VisibilityThreshold_2(Companion_getInstance_3()));
      intDefaultSpring = spring(VOID, VOID, get_VisibilityThreshold_3(IntCompanionObject_instance));
      intOffsetDefaultSpring = spring(VOID, VOID, new IntOffset(get_VisibilityThreshold_4(Companion_getInstance_4())));
      intSizeDefaultSpring = spring(VOID, VOID, new IntSize(get_VisibilityThreshold_5(Companion_getInstance_5())));
    }
  }
  function get_MillisToNanos() {
    return MillisToNanos;
  }
  var MillisToNanos;
  function TargetBasedAnimation_init_$Init$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector, $this) {
    initialVelocityVector = initialVelocityVector === VOID ? null : initialVelocityVector;
    TargetBasedAnimation.call($this, animationSpec.g7i(typeConverter), typeConverter, initialValue, targetValue, initialVelocityVector);
    return $this;
  }
  function TargetBasedAnimation_init_$Create$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector) {
    return TargetBasedAnimation_init_$Init$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector, objectCreate(protoOf(TargetBasedAnimation)));
  }
  function TargetBasedAnimation(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector) {
    initialVelocityVector = initialVelocityVector === VOID ? null : initialVelocityVector;
    this.h7i_1 = animationSpec;
    this.i7i_1 = typeConverter;
    this.j7i_1 = initialValue;
    this.k7i_1 = targetValue;
    this.l7i_1 = this.i7i_1.d7f()(this.j7i_1);
    this.m7i_1 = this.i7i_1.d7f()(this.k7i_1);
    var tmp = this;
    var tmp1_elvis_lhs = initialVelocityVector == null ? null : copy_1(initialVelocityVector);
    tmp.n7i_1 = tmp1_elvis_lhs == null ? newInstance(this.i7i_1.d7f()(this.j7i_1)) : tmp1_elvis_lhs;
    this.o7i_1 = this.h7i_1.q7i(this.l7i_1, this.m7i_1, this.n7i_1);
    this.p7i_1 = this.h7i_1.r7i(this.l7i_1, this.m7i_1, this.n7i_1);
  }
  protoOf(TargetBasedAnimation).s7i = function () {
    return this.i7i_1;
  };
  protoOf(TargetBasedAnimation).x7f = function () {
    return this.k7i_1;
  };
  protoOf(TargetBasedAnimation).t7i = function () {
    return this.h7i_1.t7i();
  };
  protoOf(TargetBasedAnimation).u7i = function (playTimeNanos) {
    var tmp;
    if (!this.w7i(playTimeNanos)) {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.animation.core.TargetBasedAnimation.getValueFromNanos.<anonymous>' call
      var it = this.h7i_1.v7i(playTimeNanos, this.l7i_1, this.m7i_1, this.n7i_1);
      var inductionVariable = 0;
      var last = it.m();
      if (inductionVariable < last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlin.check' call
          // Inline function 'kotlin.contracts.contract' call
          if (!!isNaN_0(it.n(i))) {
            // Inline function 'androidx.compose.animation.core.TargetBasedAnimation.getValueFromNanos.<anonymous>.<anonymous>' call
            var message = 'AnimationVector cannot contain a NaN. ' + it + '. Animation: ' + this + ',' + (' playTimeNanos: ' + playTimeNanos.toString());
            throw IllegalStateException_init_$Create$(toString(message));
          }
        }
         while (inductionVariable < last);
      tmp = this.i7i_1.f7f()(it);
    } else {
      tmp = this.k7i_1;
    }
    return tmp;
  };
  protoOf(TargetBasedAnimation).x7i = function () {
    return this.o7i_1;
  };
  protoOf(TargetBasedAnimation).y7i = function (playTimeNanos) {
    var tmp;
    if (!this.w7i(playTimeNanos)) {
      tmp = this.h7i_1.z7i(playTimeNanos, this.l7i_1, this.m7i_1, this.n7i_1);
    } else {
      tmp = this.p7i_1;
    }
    return tmp;
  };
  protoOf(TargetBasedAnimation).toString = function () {
    return 'TargetBasedAnimation: ' + this.j7i_1 + ' -> ' + this.k7i_1 + ',' + ('initial velocity: ' + this.n7i_1 + ', duration: ' + get_durationMillis(this).toString() + ' ms,') + ('animationSpec: ' + this.h7i_1);
  };
  function TargetBasedAnimation_0(animationSpec, typeConverter, initialValue, targetValue, initialVelocity) {
    return TargetBasedAnimation_init_$Create$(animationSpec, typeConverter, initialValue, targetValue, typeConverter.d7f()(initialVelocity));
  }
  function DecayAnimation_init_$Init$(animationSpec, typeConverter, initialValue, initialVelocityVector, $this) {
    DecayAnimation.call($this, animationSpec.g7i(typeConverter), typeConverter, initialValue, initialVelocityVector);
    return $this;
  }
  function DecayAnimation_init_$Create$(animationSpec, typeConverter, initialValue, initialVelocityVector) {
    return DecayAnimation_init_$Init$(animationSpec, typeConverter, initialValue, initialVelocityVector, objectCreate(protoOf(DecayAnimation)));
  }
  function DecayAnimation(animationSpec, typeConverter, initialValue, initialVelocityVector) {
    this.a7j_1 = animationSpec;
    this.b7j_1 = typeConverter;
    this.c7j_1 = initialValue;
    this.d7j_1 = this.b7j_1.d7f()(this.c7j_1);
    this.e7j_1 = copy_1(initialVelocityVector);
    this.g7j_1 = this.b7j_1.f7f()(this.a7j_1.j7j(this.d7j_1, initialVelocityVector));
    this.i7j_1 = false;
    this.h7j_1 = this.a7j_1.k7j(this.d7j_1, initialVelocityVector);
    this.f7j_1 = copy_1(this.a7j_1.l7j(this.h7j_1, this.d7j_1, initialVelocityVector));
    var inductionVariable = 0;
    var last = this.f7j_1.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.f7j_1.e7f(i, coerceIn(this.f7j_1.n(i), -this.a7j_1.m7j(), this.a7j_1.m7j()));
      }
       while (inductionVariable < last);
  }
  protoOf(DecayAnimation).s7i = function () {
    return this.b7j_1;
  };
  protoOf(DecayAnimation).x7f = function () {
    return this.g7j_1;
  };
  protoOf(DecayAnimation).x7i = function () {
    return this.h7j_1;
  };
  protoOf(DecayAnimation).t7i = function () {
    return this.i7j_1;
  };
  protoOf(DecayAnimation).u7i = function (playTimeNanos) {
    if (!this.w7i(playTimeNanos)) {
      return this.b7j_1.f7f()(this.a7j_1.n7j(playTimeNanos, this.d7j_1, this.e7j_1));
    } else {
      return this.g7j_1;
    }
  };
  protoOf(DecayAnimation).y7i = function (playTimeNanos) {
    if (!this.w7i(playTimeNanos)) {
      return this.a7j_1.l7j(playTimeNanos, this.d7j_1, this.e7j_1);
    } else {
      return this.f7j_1;
    }
  };
  function Animation() {
  }
  function get_durationMillis(_this__u8e3s4) {
    return _this__u8e3s4.x7i().v9(new Long(1000000, 0));
  }
  var AnimationEndReason_BoundReached_instance;
  var AnimationEndReason_Finished_instance;
  var AnimationEndReason_entriesInitialized;
  function AnimationEndReason_initEntries() {
    if (AnimationEndReason_entriesInitialized)
      return Unit_instance;
    AnimationEndReason_entriesInitialized = true;
    AnimationEndReason_BoundReached_instance = new AnimationEndReason('BoundReached', 0);
    AnimationEndReason_Finished_instance = new AnimationEndReason('Finished', 1);
  }
  function AnimationEndReason(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function AnimationEndReason_BoundReached_getInstance() {
    AnimationEndReason_initEntries();
    return AnimationEndReason_BoundReached_instance;
  }
  function AnimationEndReason_Finished_getInstance() {
    AnimationEndReason_initEntries();
    return AnimationEndReason_Finished_instance;
  }
  function SpringSpec(dampingRatio, stiffness, visibilityThreshold) {
    var tmp;
    if (dampingRatio === VOID) {
      tmp = 1.0;
    } else {
      tmp = dampingRatio;
    }
    dampingRatio = tmp;
    var tmp_0;
    if (stiffness === VOID) {
      tmp_0 = 1500.0;
    } else {
      tmp_0 = stiffness;
    }
    stiffness = tmp_0;
    visibilityThreshold = visibilityThreshold === VOID ? null : visibilityThreshold;
    this.c7h_1 = dampingRatio;
    this.d7h_1 = stiffness;
    this.e7h_1 = visibilityThreshold;
  }
  protoOf(SpringSpec).g7i = function (converter) {
    return VectorizedSpringSpec_init_$Create$(this.c7h_1, this.d7h_1, convert(converter, this.e7h_1));
  };
  protoOf(SpringSpec).equals = function (other) {
    var tmp;
    if (other instanceof SpringSpec) {
      tmp = (other.c7h_1 === this.c7h_1 ? other.d7h_1 === this.d7h_1 : false) ? equals(other.e7h_1, this.e7h_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(SpringSpec).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.e7h_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    return imul(imul(tmp$ret$0, 31) + getNumberHashCode(this.c7h_1) | 0, 31) + getNumberHashCode(this.d7h_1) | 0;
  };
  function spring(dampingRatio, stiffness, visibilityThreshold) {
    var tmp;
    if (dampingRatio === VOID) {
      tmp = 1.0;
    } else {
      tmp = dampingRatio;
    }
    dampingRatio = tmp;
    var tmp_0;
    if (stiffness === VOID) {
      tmp_0 = 1500.0;
    } else {
      tmp_0 = stiffness;
    }
    stiffness = tmp_0;
    visibilityThreshold = visibilityThreshold === VOID ? null : visibilityThreshold;
    return new SpringSpec(dampingRatio, stiffness, visibilityThreshold);
  }
  function convert(_this__u8e3s4, data) {
    if (data == null) {
      return null;
    } else {
      return _this__u8e3s4.d7f()(data);
    }
  }
  function InfiniteRepeatableSpec(animation, repeatMode, initialStartOffset) {
    repeatMode = repeatMode === VOID ? RepeatMode_Restart_getInstance() : repeatMode;
    initialStartOffset = initialStartOffset === VOID ? _StartOffset___init__impl__615djw_0(0) : initialStartOffset;
    this.o7j_1 = animation;
    this.p7j_1 = repeatMode;
    this.q7j_1 = initialStartOffset;
  }
  protoOf(InfiniteRepeatableSpec).g7i = function (converter) {
    return new VectorizedInfiniteRepeatableSpec(this.o7j_1.g7i(converter), this.p7j_1, this.q7j_1);
  };
  protoOf(InfiniteRepeatableSpec).equals = function (other) {
    var tmp;
    if (other instanceof InfiniteRepeatableSpec) {
      tmp = (equals(other.o7j_1, this.o7j_1) ? other.p7j_1.equals(this.p7j_1) : false) ? equals(other.q7j_1, this.q7j_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(InfiniteRepeatableSpec).hashCode = function () {
    return imul(imul(hashCode(this.o7j_1), 31) + this.p7j_1.hashCode() | 0, 31) + StartOffset__hashCode_impl_ith3z7(this.q7j_1) | 0;
  };
  function infiniteRepeatable(animation, repeatMode, initialStartOffset) {
    repeatMode = repeatMode === VOID ? RepeatMode_Restart_getInstance() : repeatMode;
    initialStartOffset = initialStartOffset === VOID ? _StartOffset___init__impl__615djw_0(0) : initialStartOffset;
    return new InfiniteRepeatableSpec(animation, repeatMode, initialStartOffset);
  }
  function KeyframesSpecConfig() {
    KeyframesSpecBaseConfig.call(this);
  }
  protoOf(KeyframesSpecConfig).u7j = function (_this__u8e3s4, timeStamp) {
    // Inline function 'kotlin.also' call
    var this_0 = new KeyframeEntity(_this__u8e3s4);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.KeyframesSpecConfig.at.<anonymous>' call
    this.x7j_1.zk(timeStamp, this_0);
    return this_0;
  };
  function KeyframeEntity(value, easing) {
    easing = easing === VOID ? get_LinearEasing() : easing;
    KeyframeBaseEntity.call(this, value, easing);
  }
  protoOf(KeyframeEntity).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof KeyframeEntity) {
      tmp_0 = equals(other.z7j_1, this.z7j_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.a7k_1, this.a7k_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(KeyframeEntity).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.z7j_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    return imul(tmp$ret$0, 31) + hashCode(this.a7k_1) | 0;
  };
  function KeyframesSpec(config) {
    this.c7k_1 = config;
  }
  protoOf(KeyframesSpec).g7i = function (converter) {
    // Inline function 'kotlin.collections.mutableMapOf' call
    var vectorizedKeyframes = LinkedHashMap_init_$Create$();
    // Inline function 'androidx.collection.IntObjectMap.forEach' call
    var this_0 = this.c7k_1.x7j_1;
    var k = this_0.pk_1;
    var v = this_0.qk_1;
    $l$block: {
      // Inline function 'androidx.collection.IntObjectMap.forEachIndexed' call
      var m = this_0.ok_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_1 = slot;
          if (!this_1.nb(this_1.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntObjectMap.forEach.<anonymous>' call
                  // Inline function 'androidx.compose.animation.core.KeyframesSpec.vectorize.<anonymous>' call
                  var key = k[index];
                  var tmp = v[index];
                  // Inline function 'kotlin.collections.set' call
                  var value = ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).b7k(converter.d7f());
                  vectorizedKeyframes.p2(key, value);
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return new VectorizedKeyframesSpec(vectorizedKeyframes, this.c7k_1.v7j_1, this.c7k_1.w7j_1);
  };
  function keyframes(init) {
    // Inline function 'kotlin.apply' call
    var this_0 = new KeyframesSpecConfig();
    // Inline function 'kotlin.contracts.contract' call
    init(this_0);
    return new KeyframesSpec(this_0);
  }
  function TweenSpec(durationMillis, delay, easing) {
    durationMillis = durationMillis === VOID ? 300 : durationMillis;
    delay = delay === VOID ? 0 : delay;
    easing = easing === VOID ? get_FastOutSlowInEasing() : easing;
    this.d7k_1 = durationMillis;
    this.e7k_1 = delay;
    this.f7k_1 = easing;
  }
  protoOf(TweenSpec).g7i = function (converter) {
    return new VectorizedTweenSpec(this.d7k_1, this.e7k_1, this.f7k_1);
  };
  protoOf(TweenSpec).equals = function (other) {
    var tmp;
    if (other instanceof TweenSpec) {
      tmp = (other.d7k_1 === this.d7k_1 ? other.e7k_1 === this.e7k_1 : false) ? equals(other.f7k_1, this.f7k_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(TweenSpec).hashCode = function () {
    return imul(imul(this.d7k_1, 31) + hashCode(this.f7k_1) | 0, 31) + this.e7k_1 | 0;
  };
  function tween(durationMillis, delayMillis, easing) {
    durationMillis = durationMillis === VOID ? 300 : durationMillis;
    delayMillis = delayMillis === VOID ? 0 : delayMillis;
    easing = easing === VOID ? get_FastOutSlowInEasing() : easing;
    return new TweenSpec(durationMillis, delayMillis, easing);
  }
  var RepeatMode_Restart_instance;
  var RepeatMode_Reverse_instance;
  var RepeatMode_entriesInitialized;
  function RepeatMode_initEntries() {
    if (RepeatMode_entriesInitialized)
      return Unit_instance;
    RepeatMode_entriesInitialized = true;
    RepeatMode_Restart_instance = new RepeatMode('Restart', 0);
    RepeatMode_Reverse_instance = new RepeatMode('Reverse', 1);
  }
  function RepeatMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function _StartOffset___init__impl__615djw(value) {
    return value;
  }
  function _StartOffset___get_value__impl__8sikig($this) {
    return $this;
  }
  function _StartOffset___init__impl__615djw_0(offsetMillis, offsetType) {
    offsetType = offsetType === VOID ? Companion_getInstance_8().g7k_1 : offsetType;
    return _StartOffset___init__impl__615djw(toLong(imul(offsetMillis, _StartOffsetType___get_value__impl__i1pfem(offsetType))));
  }
  function StartOffset__hashCode_impl_ith3z7($this) {
    return $this.hashCode();
  }
  function KeyframesSpecBaseConfig() {
    this.v7j_1 = 300;
    this.w7j_1 = 0;
    this.x7j_1 = mutableIntObjectMapOf();
  }
  protoOf(KeyframesSpecBaseConfig).y7j = function (_this__u8e3s4, easing) {
    _this__u8e3s4.a7k_1 = easing;
    return _this__u8e3s4;
  };
  function KeyframeBaseEntity(value, easing) {
    this.z7j_1 = value;
    this.a7k_1 = easing;
  }
  protoOf(KeyframeBaseEntity).b7k = function (convertToVector) {
    return to(convertToVector(this.z7j_1), this.a7k_1);
  };
  function AnimationConstants() {
    AnimationConstants_instance = this;
    this.i7k_1 = 300;
    this.j7k_1 = new Long(0, -2147483648);
  }
  var AnimationConstants_instance;
  function AnimationConstants_getInstance() {
    if (AnimationConstants_instance == null)
      new AnimationConstants();
    return AnimationConstants_instance;
  }
  function _StartOffsetType___init__impl__g1ur7a(value) {
    return value;
  }
  function _StartOffsetType___get_value__impl__i1pfem($this) {
    return $this;
  }
  function Companion() {
    Companion_instance = this;
    this.g7k_1 = _StartOffsetType___init__impl__g1ur7a(-1);
    this.h7k_1 = _StartOffsetType___init__impl__g1ur7a(1);
  }
  var Companion_instance;
  function Companion_getInstance_8() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function RepeatMode_Restart_getInstance() {
    RepeatMode_initEntries();
    return RepeatMode_Restart_instance;
  }
  function AnimationState(typeConverter, initialValue, initialVelocityVector, lastFrameTimeNanos, finishedTimeNanos, isRunning) {
    initialVelocityVector = initialVelocityVector === VOID ? null : initialVelocityVector;
    var tmp;
    if (lastFrameTimeNanos === VOID) {
      AnimationConstants_getInstance();
      tmp = new Long(0, -2147483648);
    } else {
      tmp = lastFrameTimeNanos;
    }
    lastFrameTimeNanos = tmp;
    var tmp_0;
    if (finishedTimeNanos === VOID) {
      AnimationConstants_getInstance();
      tmp_0 = new Long(0, -2147483648);
    } else {
      tmp_0 = finishedTimeNanos;
    }
    finishedTimeNanos = tmp_0;
    isRunning = isRunning === VOID ? false : isRunning;
    this.t7e_1 = typeConverter;
    this.u7e_1 = mutableStateOf(initialValue);
    var tmp_1 = this;
    var tmp1_elvis_lhs = initialVelocityVector == null ? null : copy_1(initialVelocityVector);
    tmp_1.v7e_1 = tmp1_elvis_lhs == null ? createZeroVectorFrom(this.t7e_1, initialValue) : tmp1_elvis_lhs;
    this.w7e_1 = lastFrameTimeNanos;
    this.x7e_1 = finishedTimeNanos;
    this.y7e_1 = isRunning;
  }
  protoOf(AnimationState).g1d = function (_set____db54di) {
    var this_0 = this.u7e_1;
    value$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(AnimationState).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.u7e_1;
    value$factory_0();
    return this_0.s2();
  };
  protoOf(AnimationState).t7g = function () {
    return this.t7e_1.f7f()(this.v7e_1);
  };
  protoOf(AnimationState).toString = function () {
    return 'AnimationState(' + ('value=' + this.s2() + ', ') + ('velocity=' + this.t7g() + ', ') + ('isRunning=' + this.y7e_1 + ', ') + ('lastFrameTimeNanos=' + this.w7e_1.toString() + ', ') + ('finishedTimeNanos=' + this.x7e_1.toString()) + ')';
  };
  function AnimationState_0(initialValue, initialVelocity, lastFrameTimeNanos, finishedTimeNanos, isRunning) {
    initialVelocity = initialVelocity === VOID ? 0.0 : initialVelocity;
    var tmp;
    if (lastFrameTimeNanos === VOID) {
      AnimationConstants_getInstance();
      tmp = new Long(0, -2147483648);
    } else {
      tmp = lastFrameTimeNanos;
    }
    lastFrameTimeNanos = tmp;
    var tmp_0;
    if (finishedTimeNanos === VOID) {
      AnimationConstants_getInstance();
      tmp_0 = new Long(0, -2147483648);
    } else {
      tmp_0 = finishedTimeNanos;
    }
    finishedTimeNanos = tmp_0;
    isRunning = isRunning === VOID ? false : isRunning;
    return new AnimationState(get_VectorConverter_2(FloatCompanionObject_instance), initialValue, AnimationVector(initialVelocity), lastFrameTimeNanos, finishedTimeNanos, isRunning);
  }
  function copy(_this__u8e3s4, value, velocity, lastFrameTimeNanos, finishedTimeNanos, isRunning) {
    value = value === VOID ? _this__u8e3s4.s2() : value;
    velocity = velocity === VOID ? _this__u8e3s4.v7e_1.k7k_1 : velocity;
    lastFrameTimeNanos = lastFrameTimeNanos === VOID ? _this__u8e3s4.w7e_1 : lastFrameTimeNanos;
    finishedTimeNanos = finishedTimeNanos === VOID ? _this__u8e3s4.x7e_1 : finishedTimeNanos;
    isRunning = isRunning === VOID ? _this__u8e3s4.y7e_1 : isRunning;
    return new AnimationState(_this__u8e3s4.t7e_1, value, AnimationVector(velocity), lastFrameTimeNanos, finishedTimeNanos, isRunning);
  }
  function AnimationScope(initialValue, typeConverter, initialVelocityVector, lastFrameTimeNanos, targetValue, startTimeNanos, isRunning, onCancel) {
    this.k7e_1 = typeConverter;
    this.l7e_1 = targetValue;
    this.m7e_1 = startTimeNanos;
    this.n7e_1 = onCancel;
    this.o7e_1 = mutableStateOf(initialValue);
    this.p7e_1 = copy_1(initialVelocityVector);
    this.q7e_1 = lastFrameTimeNanos;
    var tmp = this;
    AnimationConstants_getInstance();
    tmp.r7e_1 = new Long(0, -2147483648);
    this.s7e_1 = mutableStateOf(isRunning);
  }
  protoOf(AnimationScope).g1d = function (_set____db54di) {
    var this_0 = this.o7e_1;
    value$factory_1();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(AnimationScope).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.o7e_1;
    value$factory_2();
    return this_0.s2();
  };
  protoOf(AnimationScope).m7k = function (_set____db54di) {
    var this_0 = this.s7e_1;
    isRunning$factory_1();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(AnimationScope).u7g = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.s7e_1;
    isRunning$factory_2();
    return this_0.s2();
  };
  protoOf(AnimationScope).t7g = function () {
    return this.k7e_1.f7f()(this.p7e_1);
  };
  protoOf(AnimationScope).z7e = function () {
    this.m7k(false);
    this.n7e_1();
  };
  function copy_0(_this__u8e3s4, value, velocityVector, lastFrameTimeNanos, finishedTimeNanos, isRunning) {
    value = value === VOID ? _this__u8e3s4.s2() : value;
    velocityVector = velocityVector === VOID ? copy_1(_this__u8e3s4.v7e_1) : velocityVector;
    lastFrameTimeNanos = lastFrameTimeNanos === VOID ? _this__u8e3s4.w7e_1 : lastFrameTimeNanos;
    finishedTimeNanos = finishedTimeNanos === VOID ? _this__u8e3s4.x7e_1 : finishedTimeNanos;
    isRunning = isRunning === VOID ? _this__u8e3s4.y7e_1 : isRunning;
    return new AnimationState(_this__u8e3s4.t7e_1, value, velocityVector, lastFrameTimeNanos, finishedTimeNanos, isRunning);
  }
  function createZeroVectorFrom(_this__u8e3s4, value) {
    // Inline function 'kotlin.also' call
    var this_0 = _this__u8e3s4.d7f()(value);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.createZeroVectorFrom.<anonymous>' call
    this_0.v2b();
    return this_0;
  }
  function value$factory() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return receiver.g1d(value);
    });
  }
  function value$factory_0() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return receiver.g1d(value);
    });
  }
  function value$factory_1() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return receiver.g1d(value);
    });
  }
  function value$factory_2() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return receiver.g1d(value);
    });
  }
  function isRunning$factory_1() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return receiver.u7g();
    }, function (receiver, value) {
      return receiver.m7k(value);
    });
  }
  function isRunning$factory_2() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return receiver.u7g();
    }, function (receiver, value) {
      return receiver.m7k(value);
    });
  }
  function AnimationVector1D(initVal) {
    AnimationVector_3.call(this);
    this.k7k_1 = initVal;
    this.l7k_1 = 1;
  }
  protoOf(AnimationVector1D).v2b = function () {
    this.k7k_1 = 0.0;
  };
  protoOf(AnimationVector1D).n7k = function () {
    return new AnimationVector1D(0.0);
  };
  protoOf(AnimationVector1D).n = function (index) {
    if (index === 0) {
      return this.k7k_1;
    } else {
      return 0.0;
    }
  };
  protoOf(AnimationVector1D).e7f = function (index, value) {
    if (index === 0) {
      this.k7k_1 = value;
    }
  };
  protoOf(AnimationVector1D).m = function () {
    return this.l7k_1;
  };
  protoOf(AnimationVector1D).toString = function () {
    return 'AnimationVector1D: value = ' + this.k7k_1;
  };
  protoOf(AnimationVector1D).equals = function (other) {
    var tmp;
    if (other instanceof AnimationVector1D) {
      tmp = other.k7k_1 === this.k7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector1D).hashCode = function () {
    return getNumberHashCode(this.k7k_1);
  };
  function AnimationVector(v1) {
    return new AnimationVector1D(v1);
  }
  function AnimationVector2D(v1, v2) {
    AnimationVector_3.call(this);
    this.o7k_1 = v1;
    this.p7k_1 = v2;
    this.q7k_1 = 2;
  }
  protoOf(AnimationVector2D).v2b = function () {
    this.o7k_1 = 0.0;
    this.p7k_1 = 0.0;
  };
  protoOf(AnimationVector2D).n7k = function () {
    return new AnimationVector2D(0.0, 0.0);
  };
  protoOf(AnimationVector2D).n = function (index) {
    switch (index) {
      case 0:
        return this.o7k_1;
      case 1:
        return this.p7k_1;
      default:
        return 0.0;
    }
  };
  protoOf(AnimationVector2D).e7f = function (index, value) {
    if (index === 0)
      this.o7k_1 = value;
    else if (index === 1)
      this.p7k_1 = value;
  };
  protoOf(AnimationVector2D).m = function () {
    return this.q7k_1;
  };
  protoOf(AnimationVector2D).toString = function () {
    return 'AnimationVector2D: v1 = ' + this.o7k_1 + ', v2 = ' + this.p7k_1;
  };
  protoOf(AnimationVector2D).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof AnimationVector2D) {
      tmp_0 = other.o7k_1 === this.o7k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.p7k_1 === this.p7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector2D).hashCode = function () {
    return imul(getNumberHashCode(this.o7k_1), 31) + getNumberHashCode(this.p7k_1) | 0;
  };
  function AnimationVector_0(v1, v2) {
    return new AnimationVector2D(v1, v2);
  }
  function AnimationVector3D(v1, v2, v3) {
    AnimationVector_3.call(this);
    this.r7k_1 = v1;
    this.s7k_1 = v2;
    this.t7k_1 = v3;
    this.u7k_1 = 3;
  }
  protoOf(AnimationVector3D).v2b = function () {
    this.r7k_1 = 0.0;
    this.s7k_1 = 0.0;
    this.t7k_1 = 0.0;
  };
  protoOf(AnimationVector3D).n7k = function () {
    return new AnimationVector3D(0.0, 0.0, 0.0);
  };
  protoOf(AnimationVector3D).n = function (index) {
    switch (index) {
      case 0:
        return this.r7k_1;
      case 1:
        return this.s7k_1;
      case 2:
        return this.t7k_1;
      default:
        return 0.0;
    }
  };
  protoOf(AnimationVector3D).e7f = function (index, value) {
    switch (index) {
      case 0:
        this.r7k_1 = value;
        break;
      case 1:
        this.s7k_1 = value;
        break;
      case 2:
        this.t7k_1 = value;
        break;
    }
  };
  protoOf(AnimationVector3D).m = function () {
    return this.u7k_1;
  };
  protoOf(AnimationVector3D).toString = function () {
    return 'AnimationVector3D: v1 = ' + this.r7k_1 + ', v2 = ' + this.s7k_1 + ', v3 = ' + this.t7k_1;
  };
  protoOf(AnimationVector3D).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    if (other instanceof AnimationVector3D) {
      tmp_1 = other.r7k_1 === this.r7k_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = other.s7k_1 === this.s7k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.t7k_1 === this.t7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector3D).hashCode = function () {
    return imul(imul(getNumberHashCode(this.r7k_1), 31) + getNumberHashCode(this.s7k_1) | 0, 31) + getNumberHashCode(this.t7k_1) | 0;
  };
  function AnimationVector_1(v1, v2, v3) {
    return new AnimationVector3D(v1, v2, v3);
  }
  function AnimationVector4D(v1, v2, v3, v4) {
    AnimationVector_3.call(this);
    this.v7k_1 = v1;
    this.w7k_1 = v2;
    this.x7k_1 = v3;
    this.y7k_1 = v4;
    this.z7k_1 = 4;
  }
  protoOf(AnimationVector4D).v2b = function () {
    this.v7k_1 = 0.0;
    this.w7k_1 = 0.0;
    this.x7k_1 = 0.0;
    this.y7k_1 = 0.0;
  };
  protoOf(AnimationVector4D).n7k = function () {
    return new AnimationVector4D(0.0, 0.0, 0.0, 0.0);
  };
  protoOf(AnimationVector4D).n = function (index) {
    switch (index) {
      case 0:
        return this.v7k_1;
      case 1:
        return this.w7k_1;
      case 2:
        return this.x7k_1;
      case 3:
        return this.y7k_1;
      default:
        return 0.0;
    }
  };
  protoOf(AnimationVector4D).e7f = function (index, value) {
    switch (index) {
      case 0:
        this.v7k_1 = value;
        break;
      case 1:
        this.w7k_1 = value;
        break;
      case 2:
        this.x7k_1 = value;
        break;
      case 3:
        this.y7k_1 = value;
        break;
    }
  };
  protoOf(AnimationVector4D).m = function () {
    return this.z7k_1;
  };
  protoOf(AnimationVector4D).toString = function () {
    return 'AnimationVector4D: v1 = ' + this.v7k_1 + ', v2 = ' + this.w7k_1 + ', v3 = ' + this.x7k_1 + ', v4 = ' + this.y7k_1;
  };
  protoOf(AnimationVector4D).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof AnimationVector4D) {
      tmp_2 = other.v7k_1 === this.v7k_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = other.w7k_1 === this.w7k_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = other.x7k_1 === this.x7k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.y7k_1 === this.y7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector4D).hashCode = function () {
    return imul(imul(imul(getNumberHashCode(this.v7k_1), 31) + getNumberHashCode(this.w7k_1) | 0, 31) + getNumberHashCode(this.x7k_1) | 0, 31) + getNumberHashCode(this.y7k_1) | 0;
  };
  function AnimationVector_2(v1, v2, v3, v4) {
    return new AnimationVector4D(v1, v2, v3, v4);
  }
  function AnimationVector_3() {
  }
  function newInstance(_this__u8e3s4) {
    var tmp = _this__u8e3s4.n7k();
    return tmp instanceof AnimationVector_3 ? tmp : THROW_CCE();
  }
  function copy_1(_this__u8e3s4) {
    var newVector = newInstance(_this__u8e3s4);
    var inductionVariable = 0;
    var last = newVector.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        newVector.e7f(i, _this__u8e3s4.n(i));
      }
       while (inductionVariable < last);
    return newVector;
  }
  function copyFrom(_this__u8e3s4, source) {
    var inductionVariable = 0;
    var last = _this__u8e3s4.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _this__u8e3s4.e7f(i, source.n(i));
      }
       while (inductionVariable < last);
  }
  function ComplexDouble(_real, _imaginary) {
    this.a7l_1 = _real;
    this.b7l_1 = _imaginary;
  }
  protoOf(ComplexDouble).c7l = function () {
    return this.a7l_1;
  };
  protoOf(ComplexDouble).d7l = function () {
    return this.b7l_1;
  };
  protoOf(ComplexDouble).toString = function () {
    return 'ComplexDouble(_real=' + this.a7l_1 + ', _imaginary=' + this.b7l_1 + ')';
  };
  protoOf(ComplexDouble).hashCode = function () {
    var result = getNumberHashCode(this.a7l_1);
    result = imul(result, 31) + getNumberHashCode(this.b7l_1) | 0;
    return result;
  };
  protoOf(ComplexDouble).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComplexDouble))
      return false;
    var tmp0_other_with_cast = other instanceof ComplexDouble ? other : THROW_CCE();
    if (!equals(this.a7l_1, tmp0_other_with_cast.a7l_1))
      return false;
    if (!equals(this.b7l_1, tmp0_other_with_cast.b7l_1))
      return false;
    return true;
  };
  function complexSqrt(num) {
    var tmp;
    if (num < 0.0) {
      // Inline function 'kotlin.math.sqrt' call
      // Inline function 'kotlin.math.abs' call
      var x = Math.abs(num);
      var tmp$ret$1 = Math.sqrt(x);
      tmp = new ComplexDouble(0.0, tmp$ret$1);
    } else {
      // Inline function 'kotlin.math.sqrt' call
      var tmp$ret$2 = Math.sqrt(num);
      tmp = new ComplexDouble(tmp$ret$2, 0.0);
    }
    return tmp;
  }
  function generateDecayAnimationSpec(_this__u8e3s4) {
    return new DecayAnimationSpecImpl(_this__u8e3s4);
  }
  function DecayAnimationSpecImpl(floatDecaySpec) {
    this.e7l_1 = floatDecaySpec;
  }
  protoOf(DecayAnimationSpecImpl).g7i = function (typeConverter) {
    return new VectorizedFloatDecaySpec(this.e7l_1);
  };
  function _get_valueVector__r10idf($this) {
    var tmp = $this.g7l_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('valueVector');
    }
  }
  function _get_velocityVector__dvxlkl($this) {
    var tmp = $this.h7l_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('velocityVector');
    }
  }
  function _get_targetVector__vn6c89($this) {
    var tmp = $this.i7l_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('targetVector');
    }
  }
  function VectorizedFloatDecaySpec(floatDecaySpec) {
    this.f7l_1 = floatDecaySpec;
    this.j7l_1 = this.f7l_1.m7j();
  }
  protoOf(VectorizedFloatDecaySpec).m7j = function () {
    return this.j7l_1;
  };
  protoOf(VectorizedFloatDecaySpec).n7j = function (playTimeNanos, initialValue, initialVelocity) {
    if (!!(this.g7l_1 == null)) {
      this.g7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_valueVector__r10idf(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_valueVector__r10idf(this).e7f(i, this.f7l_1.k7l(playTimeNanos, initialValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_valueVector__r10idf(this);
  };
  protoOf(VectorizedFloatDecaySpec).k7j = function (initialValue, initialVelocity) {
    var maxDuration = new Long(0, 0);
    if (!!(this.h7l_1 == null)) {
      this.h7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_velocityVector__dvxlkl(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.comparisons.maxOf' call
        var a = maxDuration;
        var b = this.f7l_1.l7l(initialValue.n(i), initialVelocity.n(i));
        maxDuration = a.z6(b) >= 0 ? a : b;
      }
       while (inductionVariable < last);
    return maxDuration;
  };
  protoOf(VectorizedFloatDecaySpec).l7j = function (playTimeNanos, initialValue, initialVelocity) {
    if (!!(this.h7l_1 == null)) {
      this.h7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_velocityVector__dvxlkl(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_velocityVector__dvxlkl(this).e7f(i, this.f7l_1.m7l(playTimeNanos, initialValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_velocityVector__dvxlkl(this);
  };
  protoOf(VectorizedFloatDecaySpec).j7j = function (initialValue, initialVelocity) {
    if (!!(this.i7l_1 == null)) {
      this.i7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_targetVector__vn6c89(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_targetVector__vn6c89(this).e7f(i, this.f7l_1.n7l(initialValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_targetVector__vn6c89(this);
  };
  function get_FastOutSlowInEasing() {
    _init_properties_Easing_kt__v6fq45();
    return FastOutSlowInEasing;
  }
  var FastOutSlowInEasing;
  var LinearOutSlowInEasing;
  var FastOutLinearInEasing;
  function get_LinearEasing() {
    _init_properties_Easing_kt__v6fq45();
    return LinearEasing;
  }
  var LinearEasing;
  function evaluateCubic($this, a, b, m) {
    return 3 * a * (1 - m) * (1 - m) * m + 3 * b * (1 - m) * m * m + m * m * m;
  }
  function CubicBezierEasing(a, b, c, d) {
    this.o7l_1 = a;
    this.p7l_1 = b;
    this.q7l_1 = c;
    this.r7l_1 = d;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(((!isNaN_0(this.o7l_1) ? !isNaN_0(this.p7l_1) : false) ? !isNaN_0(this.q7l_1) : false) ? !isNaN_0(this.r7l_1) : false)) {
      // Inline function 'androidx.compose.animation.core.CubicBezierEasing.<anonymous>' call
      var message = 'Parameters to CubicBezierEasing cannot be NaN. Actual parameters are: ' + this.o7l_1 + ', ' + this.p7l_1 + ', ' + this.q7l_1 + ', ' + this.r7l_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(CubicBezierEasing).s7l = function (fraction) {
    if (fraction > 0.0 ? fraction < 1.0 : false) {
      var start = 0.0;
      var end = 1.0;
      while (true) {
        var midpoint = (start + end) / 2;
        var estimate = evaluateCubic(this, this.o7l_1, this.q7l_1, midpoint);
        // Inline function 'kotlin.math.absoluteValue' call
        var this_0 = fraction - estimate;
        if (Math.abs(this_0) < 0.001)
          return evaluateCubic(this, this.p7l_1, this.r7l_1, midpoint);
        if (estimate < fraction)
          start = midpoint;
        else
          end = midpoint;
      }
    } else {
      return fraction;
    }
  };
  protoOf(CubicBezierEasing).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof CubicBezierEasing) {
      tmp_2 = this.o7l_1 === other.o7l_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.p7l_1 === other.p7l_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.q7l_1 === other.q7l_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.r7l_1 === other.r7l_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(CubicBezierEasing).hashCode = function () {
    return imul(imul(imul(getNumberHashCode(this.o7l_1), 31) + getNumberHashCode(this.p7l_1) | 0, 31) + getNumberHashCode(this.q7l_1) | 0, 31) + getNumberHashCode(this.r7l_1) | 0;
  };
  function sam$androidx_compose_animation_core_Easing$0(function_0) {
    this.t7l_1 = function_0;
  }
  protoOf(sam$androidx_compose_animation_core_Easing$0).s7l = function (fraction) {
    return this.t7l_1(fraction);
  };
  function LinearEasing$lambda(fraction) {
    _init_properties_Easing_kt__v6fq45();
    return fraction;
  }
  var properties_initialized_Easing_kt_af4f4d;
  function _init_properties_Easing_kt__v6fq45() {
    if (!properties_initialized_Easing_kt_af4f4d) {
      properties_initialized_Easing_kt_af4f4d = true;
      FastOutSlowInEasing = new CubicBezierEasing(0.4, 0.0, 0.2, 1.0);
      LinearOutSlowInEasing = new CubicBezierEasing(0.0, 0.0, 0.2, 1.0);
      FastOutLinearInEasing = new CubicBezierEasing(0.4, 0.0, 1.0, 1.0);
      var tmp = LinearEasing$lambda;
      LinearEasing = new sam$androidx_compose_animation_core_Easing$0(tmp);
    }
  }
  function FloatAnimationSpec() {
  }
  function FloatSpringSpec(dampingRatio, stiffness, visibilityThreshold) {
    var tmp;
    if (dampingRatio === VOID) {
      tmp = 1.0;
    } else {
      tmp = dampingRatio;
    }
    dampingRatio = tmp;
    var tmp_0;
    if (stiffness === VOID) {
      tmp_0 = 1500.0;
    } else {
      tmp_0 = stiffness;
    }
    stiffness = tmp_0;
    var tmp_1;
    if (visibilityThreshold === VOID) {
      tmp_1 = 0.01;
    } else {
      tmp_1 = visibilityThreshold;
    }
    visibilityThreshold = tmp_1;
    this.z7l_1 = dampingRatio;
    this.a7m_1 = stiffness;
    this.b7m_1 = visibilityThreshold;
    var tmp_2 = this;
    // Inline function 'kotlin.also' call
    var this_0 = new SpringSimulation(1.0);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.FloatSpringSpec.spring.<anonymous>' call
    this_0.k7m(this.z7l_1);
    this_0.l7m(this.a7m_1);
    tmp_2.c7m_1 = this_0;
  }
  protoOf(FloatSpringSpec).u7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    this.c7m_1.d7m_1 = targetValue;
    var value = _Motion___get_value__impl__e0x31d(this.c7m_1.m7m(initialValue, initialVelocity, playTimeMillis));
    return value;
  };
  protoOf(FloatSpringSpec).v7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    this.c7m_1.d7m_1 = targetValue;
    var velocity = _Motion___get_velocity__impl__h2mglt(this.c7m_1.m7m(initialValue, initialVelocity, playTimeMillis));
    return velocity;
  };
  protoOf(FloatSpringSpec).w7l = function (initialValue, targetValue, initialVelocity) {
    return 0.0;
  };
  protoOf(FloatSpringSpec).x7l = function (initialValue, targetValue, initialVelocity) {
    var tmp0_stiffness = this.c7m_1.n7m();
    var tmp1_dampingRatio = this.c7m_1.j7m_1;
    var tmp2_initialDisplacement = (initialValue - targetValue) / this.b7m_1;
    var tmp3_initialVelocity = initialVelocity / this.b7m_1;
    return estimateAnimationDurationMillis(tmp0_stiffness, tmp1_dampingRatio, tmp3_initialVelocity, tmp2_initialDisplacement, 1.0).w9(get_MillisToNanos());
  };
  protoOf(FloatSpringSpec).g7i = function (converter) {
    return this.y7l(converter);
  };
  function clampPlayTime($this, playTime) {
    // Inline function 'kotlin.Long.minus' call
    var other = $this.p7m_1;
    var tmp$ret$0 = playTime.fb(toLong(other));
    return coerceIn_0(tmp$ret$0, new Long(0, 0), toLong($this.o7m_1));
  }
  function FloatTweenSpec(duration, delay, easing) {
    var tmp;
    if (duration === VOID) {
      AnimationConstants_getInstance();
      tmp = 300;
    } else {
      tmp = duration;
    }
    duration = tmp;
    delay = delay === VOID ? 0 : delay;
    easing = easing === VOID ? get_FastOutSlowInEasing() : easing;
    this.o7m_1 = duration;
    this.p7m_1 = delay;
    this.q7m_1 = easing;
  }
  protoOf(FloatTweenSpec).u7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime(this, playTimeMillis);
    var tmp;
    if (this.o7m_1 === 0) {
      tmp = 1.0;
    } else {
      // Inline function 'kotlin.Long.div' call
      var other = this.o7m_1;
      tmp = clampedPlayTime.sb() / other;
    }
    var rawFraction = tmp;
    var fraction = this.q7m_1.s7l(coerceIn(rawFraction, 0.0, 1.0));
    return lerp(initialValue, targetValue, fraction);
  };
  protoOf(FloatTweenSpec).x7l = function (initialValue, targetValue, initialVelocity) {
    return numberToLong(this.p7m_1 + this.o7m_1 | 0).w9(get_MillisToNanos());
  };
  protoOf(FloatTweenSpec).v7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime(this, playTimeMillis);
    if (clampedPlayTime.z6(new Long(0, 0)) < 0) {
      return 0.0;
    } else if (clampedPlayTime.equals(new Long(0, 0))) {
      return initialVelocity;
    }
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = clampedPlayTime.fb(toLong(1));
    var startNum = this.u7l(tmp$ret$0.w9(get_MillisToNanos()), initialValue, targetValue, initialVelocity);
    var endNum = this.u7l(clampedPlayTime.w9(get_MillisToNanos()), initialValue, targetValue, initialVelocity);
    return (endNum - startNum) * 1000.0;
  };
  protoOf(FloatTweenSpec).g7i = function (converter) {
    return this.y7l(converter);
  };
  function withInfiniteAnimationFrameNanos(onFrame, $completion) {
    var tmp = new $withInfiniteAnimationFrameNanosCOROUTINE$0(onFrame, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function withInfiniteAnimationFrameNanos$slambda($onFrame, resultContinuation) {
    this.k7n_1 = $onFrame;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(withInfiniteAnimationFrameNanos$slambda).m4g = function ($completion) {
    var tmp = this.l4g($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(withInfiniteAnimationFrameNanos$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = withFrameNanos(this.k7n_1, this);
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
  protoOf(withInfiniteAnimationFrameNanos$slambda).l4g = function (completion) {
    return new withInfiniteAnimationFrameNanos$slambda(this.k7n_1, completion);
  };
  function withInfiniteAnimationFrameNanos$slambda_0($onFrame, resultContinuation) {
    var i = new withInfiniteAnimationFrameNanos$slambda($onFrame, resultContinuation);
    var l = function ($completion) {
      return i.m4g($completion);
    };
    l.$arity = 0;
    return l;
  }
  function $withInfiniteAnimationFrameNanosCOROUTINE$0(onFrame, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.z7m_1 = onFrame;
  }
  protoOf($withInfiniteAnimationFrameNanosCOROUTINE$0).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            var tmp_0 = this;
            tmp_0.a7n_1 = this.t6().hc(Key_instance);
            if (this.a7n_1 == null) {
              this.ac_1 = 2;
              suspendResult = withFrameNanos(this.z7m_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 1;
              suspendResult = this.a7n_1.l7n(withInfiniteAnimationFrameNanos$slambda_0(this.z7m_1, null), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            this.b7n_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.b7n_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.b7n_1;
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
  function InfiniteTransition$run$slambda$lambda($toolingOverride, this$0, $durationScale, $this_LaunchedEffect) {
    return function (it) {
      var tmp0_safe_receiver = $toolingOverride.s2();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.s2();
      var currentTimeNanos = tmp1_elvis_lhs == null ? it : tmp1_elvis_lhs;
      var tmp;
      var tmp_0;
      var tmp_1 = this$0.p7n_1;
      AnimationConstants_getInstance();
      if (tmp_1.equals(new Long(0, -2147483648))) {
        tmp_0 = true;
      } else {
        tmp_0 = !($durationScale._v === get_durationScale($this_LaunchedEffect.jo()));
      }
      if (tmp_0) {
        this$0.p7n_1 = it;
        // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
        var this_0 = this$0.n7n_1;
        // Inline function 'kotlin.contracts.contract' call
        var size = this_0.t1v_1;
        if (size > 0) {
          var i = 0;
          var tmp_2 = this_0.r1v_1;
          var content = isArray(tmp_2) ? tmp_2 : THROW_CCE();
          do {
            // Inline function 'androidx.compose.animation.core.InfiniteTransition.run.<anonymous>.<anonymous>.<anonymous>' call
            content[i].v2b();
            i = i + 1 | 0;
          }
           while (i < size);
        }
        $durationScale._v = get_durationScale($this_LaunchedEffect.jo());
        tmp = Unit_instance;
      }
      var tmp_3;
      if ($durationScale._v === 0.0) {
        var this_1 = this$0.n7n_1;
        // Inline function 'kotlin.contracts.contract' call
        var size_0 = this_1.t1v_1;
        var tmp_4;
        if (size_0 > 0) {
          var i_0 = 0;
          var tmp_5 = this_1.r1v_1;
          var content_0 = isArray(tmp_5) ? tmp_5 : THROW_CCE();
          do {
            // Inline function 'androidx.compose.animation.core.InfiniteTransition.run.<anonymous>.<anonymous>.<anonymous>' call
            content_0[i_0].c7o();
            i_0 = i_0 + 1 | 0;
          }
           while (i_0 < size_0);
          tmp_4 = Unit_instance;
        }
        tmp_3 = tmp_4;
      } else {
        // Inline function 'kotlin.Long.div' call
        var this_2 = currentTimeNanos.fb(this$0.p7n_1);
        var other = $durationScale._v;
        var tmp$ret$0 = this_2.sb() / other;
        var playTimeNanos = numberToLong(tmp$ret$0);
        onFrame(this$0, playTimeNanos);
        tmp_3 = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function InfiniteTransition$run$slambda$lambda_0($this_LaunchedEffect) {
    return function () {
      return get_durationScale($this_LaunchedEffect.jo());
    };
  }
  function InfiniteTransition$run$slambda$slambda(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(InfiniteTransition$run$slambda$slambda).m7o = function (it, $completion) {
    var tmp = this.n7o(it, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(InfiniteTransition$run$slambda$slambda).yc = function (p1, $completion) {
    return this.m7o((!(p1 == null) ? typeof p1 === 'number' : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(InfiniteTransition$run$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          return this.l7o_1 > 0.0;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(InfiniteTransition$run$slambda$slambda).n7o = function (it, completion) {
    var i = new InfiniteTransition$run$slambda$slambda(completion);
    i.l7o_1 = it;
    return i;
  };
  function InfiniteTransition$run$slambda$slambda_0(resultContinuation) {
    var i = new InfiniteTransition$run$slambda$slambda(resultContinuation);
    var l = function (it, $completion) {
      return i.m7o(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function TransitionAnimationState($outer, initialValue, targetValue, typeConverter, animationSpec, label) {
    this.b7o_1 = $outer;
    this.r7n_1 = initialValue;
    this.s7n_1 = targetValue;
    this.t7n_1 = typeConverter;
    this.u7n_1 = label;
    this.v7n_1 = mutableStateOf(this.r7n_1);
    this.w7n_1 = animationSpec;
    this.x7n_1 = TargetBasedAnimation_init_$Create$(this.w7n_1, this.t7n_1, this.r7n_1, this.s7n_1);
    this.y7n_1 = false;
    this.z7n_1 = false;
    this.a7o_1 = new Long(0, 0);
  }
  protoOf(TransitionAnimationState).g1d = function (_set____db54di) {
    var this_0 = this.v7n_1;
    value$factory_3();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(TransitionAnimationState).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.v7n_1;
    value$factory_4();
    return this_0.s2();
  };
  protoOf(TransitionAnimationState).o7o = function (initialValue, targetValue, animationSpec) {
    this.r7n_1 = initialValue;
    this.s7n_1 = targetValue;
    this.w7n_1 = animationSpec;
    this.x7n_1 = TargetBasedAnimation_init_$Create$(animationSpec, this.t7n_1, initialValue, targetValue);
    _set_refreshChildNeeded__4sbmm9(this.b7o_1, true);
    this.y7n_1 = false;
    this.z7n_1 = true;
  };
  protoOf(TransitionAnimationState).p7o = function (playTimeNanos) {
    _set_refreshChildNeeded__4sbmm9(this.b7o_1, false);
    if (this.z7n_1) {
      this.z7n_1 = false;
      this.a7o_1 = playTimeNanos;
    }
    var playTime = playTimeNanos.fb(this.a7o_1);
    this.g1d(this.x7n_1.u7i(playTime));
    this.y7n_1 = this.x7n_1.w7i(playTime);
  };
  protoOf(TransitionAnimationState).c7o = function () {
    this.g1d(this.x7n_1.k7i_1);
    this.z7n_1 = true;
  };
  protoOf(TransitionAnimationState).v2b = function () {
    this.z7n_1 = true;
  };
  function _set_refreshChildNeeded__4sbmm9($this, _set____db54di) {
    var this_0 = $this.o7n_1;
    refreshChildNeeded$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_refreshChildNeeded__t5joi3($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.o7n_1;
    refreshChildNeeded$factory_0();
    return this_0.s2();
  }
  function _set_isRunning__kpbg34_0($this, _set____db54di) {
    var this_0 = $this.q7n_1;
    isRunning$factory_3();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_isRunning__l0y5hg($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.q7n_1;
    isRunning$factory_4();
    return this_0.s2();
  }
  function onFrame($this, playTimeNanos) {
    var allFinished = true;
    // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
    var this_0 = $this.n7n_1;
    // Inline function 'kotlin.contracts.contract' call
    var size = this_0.t1v_1;
    if (size > 0) {
      var i = 0;
      var tmp = this_0.r1v_1;
      var content = isArray(tmp) ? tmp : THROW_CCE();
      do {
        // Inline function 'androidx.compose.animation.core.InfiniteTransition.onFrame.<anonymous>' call
        var it = content[i];
        if (!it.y7n_1) {
          it.p7o(playTimeNanos);
        }
        if (!it.y7n_1) {
          allFinished = false;
        }
        i = i + 1 | 0;
      }
       while (i < size);
    }
    _set_isRunning__kpbg34_0($this, !allFinished);
  }
  function InfiniteTransition$run$slambda($toolingOverride, this$0, resultContinuation) {
    this.y7o_1 = $toolingOverride;
    this.z7o_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(InfiniteTransition$run$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(InfiniteTransition$run$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(InfiniteTransition$run$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.b7p_1 = {_v: 1.0};
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!true) {
              this.ac_1 = 6;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = withInfiniteAnimationFrameNanos(InfiniteTransition$run$slambda$lambda(this.y7o_1, this.z7o_1, this.b7p_1, this.a7p_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            if (this.b7p_1._v === 0.0) {
              this.ac_1 = 3;
              var tmp_0 = snapshotFlow(InfiniteTransition$run$slambda$lambda_0(this.a7p_1));
              suspendResult = first(tmp_0, InfiniteTransition$run$slambda$slambda_0(null), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 3:
            this.ac_1 = 4;
            continue $sm;
          case 4:
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
  protoOf(InfiniteTransition$run$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new InfiniteTransition$run$slambda(this.y7o_1, this.z7o_1, completion);
    i.a7p_1 = $this$LaunchedEffect;
    return i;
  };
  function InfiniteTransition$run$slambda_0($toolingOverride, this$0, resultContinuation) {
    var i = new InfiniteTransition$run$slambda($toolingOverride, this$0, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function InfiniteTransition$run$lambda($tmp1_rcvr, $$changed) {
    return function ($composer, $force) {
      $tmp1_rcvr.c7p($composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function InfiniteTransition(label) {
    this.m7n_1 = label;
    var tmp = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp.n7n_1 = new MutableVector(tmp$ret$0, 0);
    this.o7n_1 = mutableStateOf(false);
    var tmp_0 = this;
    AnimationConstants_getInstance();
    tmp_0.p7n_1 = new Long(0, -2147483648);
    this.q7n_1 = mutableStateOf(true);
  }
  protoOf(InfiniteTransition).d7p = function (animation) {
    this.n7n_1.u1v(animation);
    _set_refreshChildNeeded__4sbmm9(this, true);
  };
  protoOf(InfiniteTransition).e7p = function (animation) {
    this.n7n_1.m2l(animation);
  };
  protoOf(InfiniteTransition).c7p = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-318043801);
    sourceInformation($composer_0, 'C(run)172@7001L67,176@7128L1558:InfiniteTransition.kt#pdpnli');
    if (isTraceInProgress()) {
      traceEventStart(-318043801, $changed, -1, 'androidx.compose.animation.core.InfiniteTransition.run (InfiniteTransition.kt:171)');
    }
    $composer_0.j1l(748212685);
    sourceInformation($composer_0, 'CC(remember):InfiniteTransition.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var this_0 = $composer_0;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = this_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.core.InfiniteTransition.run.<anonymous>' call
      var value = mutableStateOf(null);
      this_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp0_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var toolingOverride = tmp0_group;
    if (_get_isRunning__l0y5hg(this) ? true : _get_refreshChildNeeded__t5joi3(this)) {
      LaunchedEffect(this, InfiniteTransition$run$slambda_0(toolingOverride, this, null), $composer_0, 72);
    }
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    var tmp2_safe_receiver = $composer_0.m20();
    if (tmp2_safe_receiver == null)
      null;
    else {
      tmp2_safe_receiver.j24(InfiniteTransition$run$lambda(this, $changed));
    }
  };
  function rememberInfiniteTransition(label, $composer, $changed, $default) {
    var label_0 = label;
    var $composer_0 = $composer;
    $composer_0.j1l(1013651573);
    sourceInformation($composer_0, 'C(rememberInfiniteTransition)45@1981L38,46@2043L5:InfiniteTransition.kt#pdpnli');
    if (!(($default & 1) === 0))
      label_0 = 'InfiniteTransition';
    if (isTraceInProgress()) {
      traceEventStart(1013651573, $changed, -1, 'androidx.compose.animation.core.rememberInfiniteTransition (InfiniteTransition.kt:44)');
    }
    $composer_0.j1l(-1916602784);
    sourceInformation($composer_0, 'CC(remember):InfiniteTransition.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.core.rememberInfiniteTransition.<anonymous>' call
      var value = new InfiniteTransition(label_0);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var infiniteTransition = tmp1_group;
    infiniteTransition.c7p($composer_0, 8);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return infiniteTransition;
  }
  function animateValue(_this__u8e3s4, initialValue, targetValue, typeConverter, animationSpec, label, $composer, $changed, $default) {
    var label_0 = label;
    var $composer_0 = $composer;
    $composer_0.j1l(-1062847727);
    sourceInformation($composer_0, 'C(animateValue)P(1,3,4)262@10743L151,268@10900L357,280@11263L166:InfiniteTransition.kt#pdpnli');
    if (!(($default & 16) === 0))
      label_0 = 'ValueAnimation';
    if (isTraceInProgress()) {
      traceEventStart(-1062847727, $changed, -1, 'androidx.compose.animation.core.animateValue (InfiniteTransition.kt:260)');
    }
    $composer_0.j1l(1444224427);
    sourceInformation($composer_0, 'CC(remember):InfiniteTransition.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (false ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.core.animateValue.<anonymous>' call
      var value = new TransitionAnimationState(_this__u8e3s4, initialValue, targetValue, typeConverter, animationSpec, label_0);
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp1_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    var transitionAnimation = tmp1_group;
    SideEffect(animateValue$lambda(initialValue, transitionAnimation, targetValue, animationSpec), $composer_0, 0);
    DisposableEffect(transitionAnimation, animateValue$lambda_0(_this__u8e3s4, transitionAnimation), $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return transitionAnimation;
  }
  function animateFloat(_this__u8e3s4, initialValue, targetValue, animationSpec, label, $composer, $changed, $default) {
    var label_0 = label;
    var $composer_0 = $composer;
    $composer_0.j1l(-644770905);
    sourceInformation($composer_0, 'C(animateFloat)P(1,3)316@12588L84:InfiniteTransition.kt#pdpnli');
    if (!(($default & 8) === 0))
      label_0 = 'FloatAnimation';
    if (isTraceInProgress()) {
      traceEventStart(-644770905, $changed, -1, 'androidx.compose.animation.core.animateFloat (InfiniteTransition.kt:316)');
    }
    var tmp0 = animateValue(_this__u8e3s4, initialValue, targetValue, get_VectorConverter_2(FloatCompanionObject_instance), animationSpec, label_0, $composer_0, 8 | 112 & $changed | 896 & $changed | 57344 & $changed << 3 | 458752 & $changed << 3, 0);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function animateValue$lambda($initialValue, $transitionAnimation, $targetValue, $animationSpec) {
    return function () {
      var tmp;
      if (!equals($initialValue, $transitionAnimation.r7n_1) ? true : !equals($targetValue, $transitionAnimation.s7n_1)) {
        $transitionAnimation.o7o($initialValue, $targetValue, $animationSpec);
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function _no_name_provided__qut3iv($this_animateValue, $transitionAnimation) {
    this.f7p_1 = $this_animateValue;
    this.g7p_1 = $transitionAnimation;
  }
  protoOf(_no_name_provided__qut3iv).or = function () {
    // Inline function 'androidx.compose.animation.core.animateValue.<anonymous>.<anonymous>' call
    this.f7p_1.e7p(this.g7p_1);
  };
  function animateValue$lambda_0($this_animateValue, $transitionAnimation) {
    return function ($this$DisposableEffect) {
      $this_animateValue.d7p($transitionAnimation);
      // Inline function 'androidx.compose.runtime.DisposableEffectScope.onDispose' call
      return new _no_name_provided__qut3iv($this_animateValue, $transitionAnimation);
    };
  }
  function value$factory_3() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return receiver.g1d(value);
    });
  }
  function value$factory_4() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return receiver.g1d(value);
    });
  }
  function refreshChildNeeded$factory() {
    return getPropertyCallableRef('refreshChildNeeded', 1, KMutableProperty1, function (receiver) {
      return _get_refreshChildNeeded__t5joi3(receiver);
    }, function (receiver, value) {
      return _set_refreshChildNeeded__4sbmm9(receiver, value);
    });
  }
  function refreshChildNeeded$factory_0() {
    return getPropertyCallableRef('refreshChildNeeded', 1, KMutableProperty1, function (receiver) {
      return _get_refreshChildNeeded__t5joi3(receiver);
    }, function (receiver, value) {
      return _set_refreshChildNeeded__4sbmm9(receiver, value);
    });
  }
  function isRunning$factory_3() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return _get_isRunning__l0y5hg(receiver);
    }, function (receiver, value) {
      return _set_isRunning__kpbg34_0(receiver, value);
    });
  }
  function isRunning$factory_4() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return _get_isRunning__l0y5hg(receiver);
    }, function (receiver, value) {
      return _set_isRunning__kpbg34_0(receiver, value);
    });
  }
  function Mutator(priority, job) {
    this.h7p_1 = priority;
    this.i7p_1 = job;
  }
  protoOf(Mutator).j7p = function (other) {
    return this.h7p_1.u9(other.h7p_1) >= 0;
  };
  protoOf(Mutator).k7p = function () {
    return this.i7p_1.sp(new MutationInterruptedException());
  };
  function tryMutateOrCancel($this, mutator) {
    $l$loop: while (true) {
      var oldMutator = $this.a7f_1.zu();
      if (oldMutator == null ? true : mutator.j7p(oldMutator)) {
        if ($this.a7f_1.f23(oldMutator, mutator)) {
          if (oldMutator == null)
            null;
          else {
            oldMutator.k7p();
          }
          break $l$loop;
        }
      } else
        throw CancellationException_init_$Create$('Current mutation had a higher priority');
    }
  }
  function MutatorMutex$mutate$slambda($priority, this$0, $block, resultContinuation) {
    this.u7p_1 = $priority;
    this.v7p_1 = this$0;
    this.w7p_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MutatorMutex$mutate$slambda).d7q = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MutatorMutex$mutate$slambda).yc = function (p1, $completion) {
    return this.d7q((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MutatorMutex$mutate$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 9;
            this.y7p_1 = new Mutator(this.u7p_1, ensureNotNull(this.x7p_1.jo().hc(Key_instance_0)));
            tryMutateOrCancel(this.v7p_1, this.y7p_1);
            var tmp_0 = this;
            tmp_0.z7p_1 = this.v7p_1.b7f_1;
            var tmp_1 = this;
            tmp_1.a7q_1 = null;
            this.ac_1 = 1;
            suspendResult = this.z7p_1.v1g(this.a7q_1, this);
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
            suspendResult = this.w7p_1(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.c7q_1 = suspendResult;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            var tmp_2 = this.c7q_1;
            this.bc_1 = 8;
            this.v7p_1.a7f_1.f23(this.y7p_1, null);
            this.b7q_1 = tmp_2;
            this.bc_1 = 9;
            this.ac_1 = 6;
            continue $sm;
          case 6:
            var tmp_3 = this.b7q_1;
            this.bc_1 = 9;
            this.z7p_1.x1g(this.a7q_1);
            return tmp_3;
          case 7:
            this.bc_1 = 8;
            var t = this.dc_1;
            this.v7p_1.a7f_1.f23(this.y7p_1, null);
            throw t;
          case 8:
            this.bc_1 = 9;
            var t_0 = this.dc_1;
            this.z7p_1.x1g(this.a7q_1);
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
  protoOf(MutatorMutex$mutate$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new MutatorMutex$mutate$slambda(this.u7p_1, this.v7p_1, this.w7p_1, completion);
    i.x7p_1 = $this$coroutineScope;
    return i;
  };
  function MutatorMutex$mutate$slambda_0($priority, this$0, $block, resultContinuation) {
    var i = new MutatorMutex$mutate$slambda($priority, this$0, $block, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.d7q($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MutatorMutex() {
    this.a7f_1 = new AtomicReference(null);
    this.b7f_1 = Mutex();
  }
  protoOf(MutatorMutex).e7q = function (priority, block, $completion) {
    return coroutineScope(MutatorMutex$mutate$slambda_0(priority, this, block, null), $completion);
  };
  protoOf(MutatorMutex).c7f = function (priority, block, $completion, $super) {
    priority = priority === VOID ? MutatePriority_Default_getInstance() : priority;
    return $super === VOID ? this.e7q(priority, block, $completion) : $super.e7q.call(this, priority, block, $completion);
  };
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
  function MutationInterruptedException() {
    PlatformOptimizedCancellationException.call(this, 'Mutation interrupted');
    captureStack(this, MutationInterruptedException);
  }
  function MutatePriority_Default_getInstance() {
    MutatePriority_initEntries();
    return MutatePriority_Default_instance;
  }
  function estimateAnimationDurationMillis(stiffness, dampingRatio, initialVelocity, initialDisplacement, delta) {
    return estimateAnimationDurationMillis_0(stiffness, dampingRatio, initialVelocity, initialDisplacement, delta);
  }
  function estimateAnimationDurationMillis_0(stiffness, dampingRatio, initialVelocity, initialDisplacement, delta) {
    var tmp = 2.0 * dampingRatio;
    // Inline function 'kotlin.math.sqrt' call
    var dampingCoefficient = tmp * Math.sqrt(stiffness);
    var partialRoot = dampingCoefficient * dampingCoefficient - 4.0 * stiffness;
    // Inline function 'androidx.compose.animation.core.ComplexDouble.times' call
    // Inline function 'androidx.compose.animation.core.plus' call
    var this_0 = -dampingCoefficient;
    // Inline function 'androidx.compose.animation.core.ComplexDouble.plus' call
    var this_1 = complexSqrt(partialRoot);
    this_1.a7l_1 = this_1.a7l_1 + this_0;
    this_1.a7l_1 = this_1.a7l_1 * 0.5;
    this_1.b7l_1 = this_1.b7l_1 * 0.5;
    var firstRoot = this_1;
    // Inline function 'androidx.compose.animation.core.ComplexDouble.times' call
    // Inline function 'androidx.compose.animation.core.minus' call
    var this_2 = -dampingCoefficient;
    // Inline function 'androidx.compose.animation.core.plus' call
    // Inline function 'androidx.compose.animation.core.ComplexDouble.unaryMinus' call
    var this_3 = complexSqrt(partialRoot);
    this_3.a7l_1 = this_3.a7l_1 * -1;
    this_3.b7l_1 = this_3.b7l_1 * -1;
    // Inline function 'androidx.compose.animation.core.ComplexDouble.plus' call
    this_3.a7l_1 = this_3.a7l_1 + this_2;
    this_3.a7l_1 = this_3.a7l_1 * 0.5;
    this_3.b7l_1 = this_3.b7l_1 * 0.5;
    var secondRoot = this_3;
    return estimateDurationInternal(firstRoot, secondRoot, dampingRatio, initialVelocity, initialDisplacement, delta);
  }
  function estimateDurationInternal(firstRoot, secondRoot, dampingRatio, initialVelocity, initialPosition, delta) {
    if (initialPosition === 0.0 ? initialVelocity === 0.0 : false) {
      return new Long(0, 0);
    }
    var v0 = initialPosition < 0.0 ? -initialVelocity : initialVelocity;
    // Inline function 'kotlin.math.abs' call
    var p0 = Math.abs(initialPosition);
    return numberToLong((dampingRatio > 1.0 ? estimateOverDamped(firstRoot, secondRoot, p0, v0, delta) : dampingRatio < 1.0 ? estimateUnderDamped(firstRoot, p0, v0, delta) : estimateCriticallyDamped(firstRoot, p0, v0, delta)) * 1000.0);
  }
  function estimateOverDamped(firstRoot, secondRoot, p0, v0, delta) {
    var r1 = firstRoot.c7l();
    var r2 = secondRoot.c7l();
    var c2 = (r1 * p0 - v0) / (r1 - r2);
    var c1 = p0 - c2;
    // Inline function 'kotlin.math.ln' call
    // Inline function 'kotlin.math.abs' call
    var x = delta / c1;
    var x_0 = Math.abs(x);
    var t1 = Math.log(x_0) / r1;
    // Inline function 'kotlin.math.ln' call
    // Inline function 'kotlin.math.abs' call
    var x_1 = delta / c2;
    var x_2 = Math.abs(x_1);
    var t2 = Math.log(x_2) / r2;
    var tmp;
    // Inline function 'androidx.compose.animation.core.isNotFinite' call
    if (!isFinite(t1)) {
      tmp = t2;
    } else {
      // Inline function 'androidx.compose.animation.core.isNotFinite' call
      if (!isFinite(t2)) {
        tmp = t1;
      } else {
        // Inline function 'kotlin.math.max' call
        tmp = Math.max(t1, t2);
      }
    }
    var tCurr = tmp;
    // Inline function 'kotlin.math.ln' call
    var x_3 = c1 * r1 / (-c2 * r2);
    var tInflection = Math.log(x_3) / (r2 - r1);
    var tmp_0;
    if (isNaN_1(tInflection) ? true : tInflection <= 0.0) {
      tmp_0 = -delta;
    } else if (tInflection > 0.0 ? -estimateOverDamped$xInflection(c1, r1, tInflection, c2, r2) < delta : false) {
      if (c2 > 0.0 ? c1 < 0.0 : false) {
        tCurr = 0.0;
      }
      tmp_0 = -delta;
    } else {
      // Inline function 'kotlin.math.ln' call
      var x_4 = -(c2 * r2 * r2) / (c1 * r1 * r1);
      tCurr = Math.log(x_4) / (r1 - r2);
      tmp_0 = delta;
    }
    var signedDelta = tmp_0;
    // Inline function 'kotlin.math.abs' call
    var tmp_1 = c1 * r1;
    // Inline function 'kotlin.math.exp' call
    var x_5 = r1 * tCurr;
    var tmp_2 = tmp_1 * Math.exp(x_5);
    var tmp_3 = c2 * r2;
    // Inline function 'kotlin.math.exp' call
    var x_6 = r2 * tCurr;
    var x_7 = tmp_2 + tmp_3 * Math.exp(x_6);
    if (Math.abs(x_7) < 1.0E-4) {
      return tCurr;
    }
    var tDelta = 1.7976931348623157E308;
    var iterations = 0;
    while (tDelta > 0.001 ? iterations < 100 : false) {
      iterations = iterations + 1 | 0;
      var tLast = tCurr;
      // Inline function 'androidx.compose.animation.core.iterateNewtonsMethod' call
      var x_8 = tCurr;
      // Inline function 'androidx.compose.animation.core.estimateOverDamped.<anonymous>' call
      // Inline function 'kotlin.math.exp' call
      var x_9 = r1 * x_8;
      var tmp_4 = c1 * Math.exp(x_9);
      // Inline function 'kotlin.math.exp' call
      var x_10 = r2 * x_8;
      var tmp_5 = tmp_4 + c2 * Math.exp(x_10) + signedDelta;
      // Inline function 'androidx.compose.animation.core.estimateOverDamped.<anonymous>' call
      var tmp_6 = c1 * r1;
      // Inline function 'kotlin.math.exp' call
      var x_11 = r1 * x_8;
      var tmp_7 = tmp_6 * Math.exp(x_11);
      var tmp_8 = c2 * r2;
      // Inline function 'kotlin.math.exp' call
      var x_12 = r2 * x_8;
      tCurr = x_8 - tmp_5 / (tmp_7 + tmp_8 * Math.exp(x_12));
      // Inline function 'kotlin.math.abs' call
      var x_13 = tLast - tCurr;
      tDelta = Math.abs(x_13);
    }
    return tCurr;
  }
  function estimateUnderDamped(firstRoot, p0, v0, delta) {
    var r = firstRoot.c7l();
    var c1 = p0;
    var c2 = (v0 - r * c1) / firstRoot.d7l();
    // Inline function 'kotlin.math.sqrt' call
    var x = c1 * c1 + c2 * c2;
    var c = Math.sqrt(x);
    // Inline function 'kotlin.math.ln' call
    var x_0 = delta / c;
    return Math.log(x_0) / r;
  }
  function estimateCriticallyDamped(firstRoot, p0, v0, delta) {
    var r = firstRoot.c7l();
    var c1 = p0;
    var c2 = v0 - r * c1;
    // Inline function 'kotlin.math.ln' call
    // Inline function 'kotlin.math.abs' call
    var x = delta / c1;
    var x_0 = Math.abs(x);
    var t1 = Math.log(x_0) / r;
    // Inline function 'kotlin.run' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.estimateCriticallyDamped.<anonymous>' call
    // Inline function 'kotlin.math.ln' call
    // Inline function 'kotlin.math.abs' call
    var x_1 = delta / c2;
    var x_2 = Math.abs(x_1);
    var guess = Math.log(x_2);
    var t = guess;
    var inductionVariable = 0;
    if (inductionVariable <= 5)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.math.ln' call
        // Inline function 'kotlin.math.abs' call
        var x_3 = t / r;
        var x_4 = Math.abs(x_3);
        t = guess - Math.log(x_4);
      }
       while (inductionVariable <= 5);
    var t2 = t / r;
    var tmp;
    // Inline function 'androidx.compose.animation.core.isNotFinite' call
    if (!isFinite(t1)) {
      tmp = t2;
    } else {
      // Inline function 'androidx.compose.animation.core.isNotFinite' call
      if (!isFinite(t2)) {
        tmp = t1;
      } else {
        // Inline function 'kotlin.math.max' call
        tmp = Math.max(t1, t2);
      }
    }
    var tCurr = tmp;
    var tInflection = -(r * c1 + c2) / (r * c2);
    // Inline function 'kotlin.math.exp' call
    var x_5 = r * tInflection;
    var tmp_0 = c1 * Math.exp(x_5);
    var tmp_1 = c2 * tInflection;
    // Inline function 'kotlin.math.exp' call
    var x_6 = r * tInflection;
    var xInflection = tmp_0 + tmp_1 * Math.exp(x_6);
    var tmp_2;
    if (isNaN_1(tInflection) ? true : tInflection <= 0.0) {
      tmp_2 = -delta;
    } else if (tInflection > 0.0 ? -xInflection < delta : false) {
      if (c2 < 0.0 ? c1 > 0.0 : false) {
        tCurr = 0.0;
      }
      tmp_2 = -delta;
    } else {
      var tConcavChange = -(2.0 / r) - c1 / c2;
      tCurr = tConcavChange;
      tmp_2 = delta;
    }
    var signedDelta = tmp_2;
    var tDelta = 1.7976931348623157E308;
    var iterations = 0;
    while (tDelta > 0.001 ? iterations < 100 : false) {
      iterations = iterations + 1 | 0;
      var tLast = tCurr;
      // Inline function 'androidx.compose.animation.core.iterateNewtonsMethod' call
      var x_7 = tCurr;
      // Inline function 'androidx.compose.animation.core.estimateCriticallyDamped.<anonymous>' call
      var tmp_3 = c1 + c2 * x_7;
      // Inline function 'kotlin.math.exp' call
      var x_8 = r * x_7;
      var tmp_4 = tmp_3 * Math.exp(x_8) + signedDelta;
      // Inline function 'androidx.compose.animation.core.estimateCriticallyDamped.<anonymous>' call
      var tmp_5 = c2 * (r * x_7 + 1) + c1 * r;
      // Inline function 'kotlin.math.exp' call
      var x_9 = r * x_7;
      tCurr = x_7 - tmp_4 / (tmp_5 * Math.exp(x_9));
      // Inline function 'kotlin.math.abs' call
      var x_10 = tLast - tCurr;
      tDelta = Math.abs(x_10);
    }
    return tCurr;
  }
  function estimateOverDamped$xInflection(c1, r1, tInflection, c2, r2) {
    // Inline function 'kotlin.math.exp' call
    var x = r1 * tInflection;
    var tmp = c1 * Math.exp(x);
    // Inline function 'kotlin.math.exp' call
    var x_0 = r2 * tInflection;
    return tmp + c2 * Math.exp(x_0);
  }
  var UNSET;
  function init($this) {
    if ($this.f7m_1) {
      return Unit_instance;
    }
    if ($this.d7m_1 === UNSET) {
      throw IllegalStateException_init_$Create$('Error: Final position of the spring must be set before the animation starts');
    }
    var dampingRatioSquared = $this.j7m_1 * $this.j7m_1;
    if ($this.j7m_1 > 1.0) {
      var tmp = $this;
      var tmp_0 = -$this.j7m_1 * $this.e7m_1;
      var tmp_1 = $this.e7m_1;
      // Inline function 'kotlin.math.sqrt' call
      var x = dampingRatioSquared - 1;
      tmp.g7m_1 = tmp_0 + tmp_1 * Math.sqrt(x);
      var tmp_2 = $this;
      var tmp_3 = -$this.j7m_1 * $this.e7m_1;
      var tmp_4 = $this.e7m_1;
      // Inline function 'kotlin.math.sqrt' call
      var x_0 = dampingRatioSquared - 1;
      tmp_2.h7m_1 = tmp_3 - tmp_4 * Math.sqrt(x_0);
    } else if ($this.j7m_1 >= 0.0 ? $this.j7m_1 < 1.0 : false) {
      var tmp_5 = $this;
      var tmp_6 = $this.e7m_1;
      // Inline function 'kotlin.math.sqrt' call
      var x_1 = 1 - dampingRatioSquared;
      tmp_5.i7m_1 = tmp_6 * Math.sqrt(x_1);
    }
    $this.f7m_1 = true;
  }
  function SpringSimulation(finalPosition) {
    this.d7m_1 = finalPosition;
    var tmp = this;
    // Inline function 'kotlin.math.sqrt' call
    tmp.e7m_1 = Math.sqrt(50.0);
    this.f7m_1 = false;
    this.g7m_1 = 0.0;
    this.h7m_1 = 0.0;
    this.i7m_1 = 0.0;
    var tmp_0 = this;
    tmp_0.j7m_1 = 1.0;
  }
  protoOf(SpringSimulation).l7m = function (value) {
    if (this.n7m() <= 0.0) {
      throw IllegalArgumentException_init_$Create$('Spring stiffness constant must be positive.');
    }
    var tmp = this;
    // Inline function 'kotlin.math.sqrt' call
    tmp.e7m_1 = Math.sqrt(value);
    this.f7m_1 = false;
  };
  protoOf(SpringSimulation).n7m = function () {
    return this.e7m_1 * this.e7m_1;
  };
  protoOf(SpringSimulation).k7m = function (value) {
    if (value < 0.0) {
      throw IllegalArgumentException_init_$Create$('Damping ratio must be non-negative');
    }
    this.j7m_1 = value;
    this.f7m_1 = false;
  };
  protoOf(SpringSimulation).m7m = function (lastDisplacement, lastVelocity, timeElapsed) {
    init(this);
    var adjustedDisplacement = lastDisplacement - this.d7m_1;
    // Inline function 'kotlin.Long.div' call
    var deltaT = timeElapsed.a7() / 1000.0;
    var displacement;
    var currentVelocity;
    if (this.j7m_1 > 1.0) {
      var coeffA = adjustedDisplacement - (this.h7m_1 * adjustedDisplacement - lastVelocity) / (this.h7m_1 - this.g7m_1);
      var coeffB = (this.h7m_1 * adjustedDisplacement - lastVelocity) / (this.h7m_1 - this.g7m_1);
      // Inline function 'kotlin.math.exp' call
      var x = this.h7m_1 * deltaT;
      var tmp = coeffA * Math.exp(x);
      // Inline function 'kotlin.math.exp' call
      var x_0 = this.g7m_1 * deltaT;
      displacement = tmp + coeffB * Math.exp(x_0);
      var tmp_0 = coeffA * this.h7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_1 = this.h7m_1 * deltaT;
      var tmp_1 = tmp_0 * Math.exp(x_1);
      var tmp_2 = coeffB * this.g7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_2 = this.g7m_1 * deltaT;
      currentVelocity = tmp_1 + tmp_2 * Math.exp(x_2);
    } else if (this.j7m_1 === 1.0) {
      var coeffA_0 = adjustedDisplacement;
      var coeffB_0 = lastVelocity + this.e7m_1 * adjustedDisplacement;
      var tmp_3 = coeffA_0 + coeffB_0 * deltaT;
      // Inline function 'kotlin.math.exp' call
      var x_3 = -this.e7m_1 * deltaT;
      displacement = tmp_3 * Math.exp(x_3);
      var tmp_4 = coeffA_0 + coeffB_0 * deltaT;
      // Inline function 'kotlin.math.exp' call
      var x_4 = -this.e7m_1 * deltaT;
      var tmp_5 = tmp_4 * Math.exp(x_4) * -this.e7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_5 = -this.e7m_1 * deltaT;
      currentVelocity = tmp_5 + coeffB_0 * Math.exp(x_5);
    } else {
      var cosCoeff = adjustedDisplacement;
      var sinCoeff = 1 / this.i7m_1 * (this.j7m_1 * this.e7m_1 * adjustedDisplacement + lastVelocity);
      // Inline function 'kotlin.math.exp' call
      var x_6 = -this.j7m_1 * this.e7m_1 * deltaT;
      var tmp_6 = Math.exp(x_6);
      // Inline function 'kotlin.math.cos' call
      var x_7 = this.i7m_1 * deltaT;
      var tmp_7 = cosCoeff * Math.cos(x_7);
      // Inline function 'kotlin.math.sin' call
      var x_8 = this.i7m_1 * deltaT;
      displacement = tmp_6 * (tmp_7 + sinCoeff * Math.sin(x_8));
      var tmp_8 = displacement * -this.e7m_1 * this.j7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_9 = -this.j7m_1 * this.e7m_1 * deltaT;
      var tmp_9 = Math.exp(x_9);
      var tmp_10 = -this.i7m_1 * cosCoeff;
      // Inline function 'kotlin.math.sin' call
      var x_10 = this.i7m_1 * deltaT;
      var tmp_11 = tmp_10 * Math.sin(x_10);
      var tmp_12 = this.i7m_1 * sinCoeff;
      // Inline function 'kotlin.math.cos' call
      var x_11 = this.i7m_1 * deltaT;
      currentVelocity = tmp_8 + tmp_9 * (tmp_11 + tmp_12 * Math.cos(x_11));
    }
    var newValue = displacement + this.d7m_1;
    var newVelocity = currentVelocity;
    return Motion(newValue, newVelocity);
  };
  function _Motion___init__impl__vk56rv(packedValue) {
    return packedValue;
  }
  function _Motion___get_packedValue__impl__qymh4n($this) {
    return $this;
  }
  function _Motion___get_value__impl__e0x31d($this) {
    // Inline function 'androidx.compose.ui.util.unpackFloat1' call
    // Inline function 'kotlin.fromBits' call
    var bits = _Motion___get_packedValue__impl__qymh4n($this).lb(32).ea();
    return floatFromBits(bits);
  }
  function _Motion___get_velocity__impl__h2mglt($this) {
    // Inline function 'androidx.compose.ui.util.unpackFloat2' call
    // Inline function 'kotlin.fromBits' call
    var bits = _Motion___get_packedValue__impl__qymh4n($this).nb(new Long(-1, 0)).ea();
    return floatFromBits(bits);
  }
  function Motion(value, velocity) {
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1 = toLong(toRawBits(value));
    var v2 = toLong(toRawBits(velocity));
    var tmp$ret$0 = v1.kb(32).ob(v2.nb(new Long(-1, 0)));
    return _Motion___init__impl__vk56rv(tmp$ret$0);
  }
  function animateTo(_this__u8e3s4, targetValue, animationSpec, sequentialAnimation, block, $completion) {
    animationSpec = animationSpec === VOID ? spring() : animationSpec;
    sequentialAnimation = sequentialAnimation === VOID ? false : sequentialAnimation;
    var tmp;
    if (block === VOID) {
      tmp = animateTo$lambda;
    } else {
      tmp = block;
    }
    block = tmp;
    var tmp0_initialValue = _this__u8e3s4.s2();
    var tmp1_typeConverter = _this__u8e3s4.t7e_1;
    var tmp2_initialVelocityVector = _this__u8e3s4.v7e_1;
    var anim = TargetBasedAnimation_init_$Create$(animationSpec, tmp1_typeConverter, tmp0_initialValue, targetValue, tmp2_initialVelocityVector);
    var tmp_0;
    if (sequentialAnimation) {
      tmp_0 = _this__u8e3s4.w7e_1;
    } else {
      AnimationConstants_getInstance();
      tmp_0 = new Long(0, -2147483648);
    }
    return animate(_this__u8e3s4, anim, tmp_0, block, $completion);
  }
  function animate(_this__u8e3s4, animation, startTimeNanos, block, $completion) {
    var tmp;
    if (startTimeNanos === VOID) {
      AnimationConstants_getInstance();
      tmp = new Long(0, -2147483648);
    } else {
      tmp = startTimeNanos;
    }
    startTimeNanos = tmp;
    var tmp_0;
    if (block === VOID) {
      tmp_0 = animate$lambda;
    } else {
      tmp_0 = block;
    }
    block = tmp_0;
    var tmp_1 = new $animateCOROUTINE$1(_this__u8e3s4, animation, startTimeNanos, block, $completion);
    tmp_1.cc_1 = Unit_instance;
    tmp_1.dc_1 = null;
    return tmp_1.mc();
  }
  function updateState(_this__u8e3s4, state) {
    state.g1d(_this__u8e3s4.s2());
    copyFrom(state.v7e_1, _this__u8e3s4.p7e_1);
    state.x7e_1 = _this__u8e3s4.r7e_1;
    state.w7e_1 = _this__u8e3s4.q7e_1;
    state.y7e_1 = _this__u8e3s4.u7g();
  }
  function get_durationScale(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.hc(Key_instance_1);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.v4t();
    var scale = tmp1_elvis_lhs == null ? 1.0 : tmp1_elvis_lhs;
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(scale >= 0.0)) {
      // Inline function 'androidx.compose.animation.core.<get-durationScale>.<anonymous>' call
      var message = 'negative scale factor';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return scale;
  }
  function callWithFrameNanos(_this__u8e3s4, onFrame, $completion) {
    var tmp = new $callWithFrameNanosCOROUTINE$2(_this__u8e3s4, onFrame, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function doAnimationFrameWithScale(_this__u8e3s4, frameTimeNanos, durationScale, anim, state, block) {
    var tmp;
    if (durationScale === 0.0) {
      tmp = anim.x7i();
    } else {
      // Inline function 'kotlin.Long.div' call
      var tmp$ret$0 = frameTimeNanos.fb(_this__u8e3s4.m7e_1).sb() / durationScale;
      tmp = numberToLong(tmp$ret$0);
    }
    var playTimeNanos = tmp;
    doAnimationFrame(_this__u8e3s4, frameTimeNanos, playTimeNanos, anim, state, block);
  }
  function doAnimationFrame(_this__u8e3s4, frameTimeNanos, playTimeNanos, anim, state, block) {
    _this__u8e3s4.q7e_1 = frameTimeNanos;
    _this__u8e3s4.g1d(anim.u7i(playTimeNanos));
    _this__u8e3s4.p7e_1 = anim.y7i(playTimeNanos);
    var isLastFrame = anim.w7i(playTimeNanos);
    if (isLastFrame) {
      _this__u8e3s4.r7e_1 = _this__u8e3s4.q7e_1;
      _this__u8e3s4.m7k(false);
    }
    updateState(_this__u8e3s4, state);
    block(_this__u8e3s4);
  }
  function animateDecay(_this__u8e3s4, animationSpec, sequentialAnimation, block, $completion) {
    sequentialAnimation = sequentialAnimation === VOID ? false : sequentialAnimation;
    var tmp;
    if (block === VOID) {
      tmp = animateDecay$lambda;
    } else {
      tmp = block;
    }
    block = tmp;
    var tmp0_initialValue = _this__u8e3s4.s2();
    var tmp1_initialVelocityVector = _this__u8e3s4.v7e_1;
    var tmp2_typeConverter = _this__u8e3s4.t7e_1;
    var anim = DecayAnimation_init_$Create$(animationSpec, tmp2_typeConverter, tmp0_initialValue, tmp1_initialVelocityVector);
    var tmp_0;
    if (sequentialAnimation) {
      tmp_0 = _this__u8e3s4.w7e_1;
    } else {
      AnimationConstants_getInstance();
      tmp_0 = new Long(0, -2147483648);
    }
    return animate(_this__u8e3s4, anim, tmp_0, block, $completion);
  }
  function animate_0(initialValue, targetValue, initialVelocity, animationSpec, block, $completion) {
    initialVelocity = initialVelocity === VOID ? 0.0 : initialVelocity;
    animationSpec = animationSpec === VOID ? spring() : animationSpec;
    return animate_1(get_VectorConverter_2(FloatCompanionObject_instance), initialValue, targetValue, initialVelocity, animationSpec, block, $completion);
  }
  function animate_1(typeConverter, initialValue, targetValue, initialVelocity, animationSpec, block, $completion) {
    initialVelocity = initialVelocity === VOID ? null : initialVelocity;
    animationSpec = animationSpec === VOID ? spring() : animationSpec;
    var tmp;
    if (initialVelocity == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.animation.core.animate.<anonymous>' call
      tmp = typeConverter.d7f()(initialVelocity);
    }
    var tmp1_elvis_lhs = tmp;
    var initialVelocityVector = tmp1_elvis_lhs == null ? newInstance(typeConverter.d7f()(initialValue)) : tmp1_elvis_lhs;
    var anim = TargetBasedAnimation_init_$Create$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector);
    var tmp_0 = new AnimationState(typeConverter, initialValue, initialVelocityVector);
    return animate(tmp_0, anim, VOID, animate$lambda_3(block, typeConverter), $completion);
  }
  function animateTo$lambda($this$null) {
    return Unit_instance;
  }
  function animate$lambda($this$null) {
    return Unit_instance;
  }
  function animate$lambda$lambda($this_animate) {
    return function () {
      $this_animate.y7e_1 = false;
      return Unit_instance;
    };
  }
  function animate$lambda_0($lateInitScope, $initialValue, $animation, $initialVelocityVector, $durationScale, $this_animate, $block) {
    return function (it) {
      // Inline function 'kotlin.apply' call
      var tmp = $animation.s7i();
      var tmp_0 = $animation.x7f();
      var this_0 = new AnimationScope($initialValue, tmp, $initialVelocityVector, it, tmp_0, it, true, animate$lambda$lambda($this_animate));
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.animation.core.animate.<anonymous>.<anonymous>' call
      doAnimationFrameWithScale(this_0, it, $durationScale, $animation, $this_animate, $block);
      $lateInitScope._v = this_0;
      return Unit_instance;
    };
  }
  function animate$lambda_1($this_animate) {
    return function () {
      $this_animate.y7e_1 = false;
      return Unit_instance;
    };
  }
  function animate$lambda_2($lateInitScope, $durationScale, $animation, $this_animate, $block) {
    return function (it) {
      doAnimationFrameWithScale(ensureNotNull($lateInitScope._v), it, $durationScale, $animation, $this_animate, $block);
      return Unit_instance;
    };
  }
  function callWithFrameNanos$lambda($onFrame) {
    return function (it) {
      // Inline function 'kotlin.Long.div' call
      var other = get_AnimationDebugDurationScale();
      var tmp$ret$0 = it.v9(toLong(other));
      return $onFrame(tmp$ret$0);
    };
  }
  function animateDecay$lambda($this$null) {
    return Unit_instance;
  }
  function animate$lambda_3($block, $typeConverter) {
    return function ($this$animate) {
      $block($this$animate.s2(), $typeConverter.f7f()($this$animate.p7e_1));
      return Unit_instance;
    };
  }
  function $animateCOROUTINE$1(_this__u8e3s4, animation, startTimeNanos, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.n7q_1 = _this__u8e3s4;
    this.o7q_1 = animation;
    this.p7q_1 = startTimeNanos;
    this.q7q_1 = block;
  }
  protoOf($animateCOROUTINE$1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 7;
            this.r7q_1 = this.o7q_1.u7i(new Long(0, 0));
            this.s7q_1 = this.o7q_1.y7i(new Long(0, 0));
            this.t7q_1 = {_v: null};
            this.bc_1 = 6;
            AnimationConstants_getInstance();
            if (this.p7q_1.equals(new Long(0, -2147483648))) {
              var tmp_0 = this;
              tmp_0.u7q_1 = get_durationScale(this.t6());
              this.ac_1 = 1;
              suspendResult = callWithFrameNanos(this.o7q_1, animate$lambda_0(this.t7q_1, this.r7q_1, this.o7q_1, this.s7q_1, this.u7q_1, this.n7q_1, this.q7q_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_1 = this.o7q_1.s7i();
              var tmp_2 = this.o7q_1.x7f();
              var this_0 = new AnimationScope(this.r7q_1, tmp_1, this.s7q_1, this.p7q_1, tmp_2, this.p7q_1, true, animate$lambda_1(this.n7q_1));
              doAnimationFrameWithScale(this_0, this.p7q_1, get_durationScale(this.t6()), this.o7q_1, this.n7q_1, this.q7q_1);
              this.t7q_1._v = this_0;
              this.ac_1 = 2;
              continue $sm;
            }

          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.ac_1 = 3;
            continue $sm;
          case 3:
            if (!ensureNotNull(this.t7q_1._v).u7g()) {
              this.ac_1 = 5;
              continue $sm;
            }

            var tmp_3 = this;
            tmp_3.v7q_1 = get_durationScale(this.t6());
            this.ac_1 = 4;
            suspendResult = callWithFrameNanos(this.o7q_1, animate$lambda_2(this.t7q_1, this.v7q_1, this.o7q_1, this.n7q_1, this.q7q_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.ac_1 = 3;
            continue $sm;
          case 5:
            this.bc_1 = 7;
            this.ac_1 = 8;
            continue $sm;
          case 6:
            this.bc_1 = 7;
            var tmp_4 = this.dc_1;
            if (tmp_4 instanceof CancellationException) {
              var e = this.dc_1;
              var tmp0_safe_receiver = this.t7q_1._v;
              if (tmp0_safe_receiver != null) {
                tmp0_safe_receiver.m7k(false);
              }
              var tmp1_safe_receiver = this.t7q_1._v;
              if (equals(tmp1_safe_receiver == null ? null : tmp1_safe_receiver.q7e_1, this.n7q_1.w7e_1)) {
                this.n7q_1.y7e_1 = false;
              }
              throw e;
            } else {
              throw this.dc_1;
            }

          case 7:
            throw this.dc_1;
          case 8:
            this.bc_1 = 7;
            return Unit_instance;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 7) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  function $callWithFrameNanosCOROUTINE$2(_this__u8e3s4, onFrame, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.e7r_1 = _this__u8e3s4;
    this.f7r_1 = onFrame;
  }
  protoOf($callWithFrameNanosCOROUTINE$2).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            if (this.e7r_1.t7i()) {
              this.ac_1 = 2;
              suspendResult = withInfiniteAnimationFrameNanos(this.f7r_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 1;
              suspendResult = withFrameNanos(callWithFrameNanos$lambda(this.f7r_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            this.g7r_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.g7r_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.g7r_1;
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
  function get_AnimationDebugDurationScale() {
    return AnimationDebugDurationScale;
  }
  var AnimationDebugDurationScale;
  function get_FloatToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return FloatToVector;
  }
  var FloatToVector;
  function get_IntToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return IntToVector;
  }
  var IntToVector;
  function get_DpToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return DpToVector;
  }
  var DpToVector;
  function get_DpOffsetToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return DpOffsetToVector;
  }
  var DpOffsetToVector;
  function get_SizeToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return SizeToVector;
  }
  var SizeToVector;
  function get_OffsetToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return OffsetToVector;
  }
  var OffsetToVector;
  function get_IntOffsetToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return IntOffsetToVector;
  }
  var IntOffsetToVector;
  function get_IntSizeToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return IntSizeToVector;
  }
  var IntSizeToVector;
  function get_RectToVector() {
    _init_properties_VectorConverters_kt__g28mmu();
    return RectToVector;
  }
  var RectToVector;
  function TwoWayConverter(convertToVector, convertFromVector) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new TwoWayConverterImpl(convertToVector, convertFromVector);
  }
  function TwoWayConverterImpl(convertToVector, convertFromVector) {
    this.h7r_1 = convertToVector;
    this.i7r_1 = convertFromVector;
  }
  protoOf(TwoWayConverterImpl).d7f = function () {
    return this.h7r_1;
  };
  protoOf(TwoWayConverterImpl).f7f = function () {
    return this.i7r_1;
  };
  function get_VectorConverter(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_IntToVector();
  }
  function get_VectorConverter_0(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_IntSizeToVector();
  }
  function get_VectorConverter_1(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_IntOffsetToVector();
  }
  function get_VectorConverter_2(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_FloatToVector();
  }
  function get_VectorConverter_3(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_RectToVector();
  }
  function get_VectorConverter_4(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_SizeToVector();
  }
  function get_VectorConverter_5(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_OffsetToVector();
  }
  function get_VectorConverter_6(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_DpToVector();
  }
  function get_VectorConverter_7(_this__u8e3s4) {
    _init_properties_VectorConverters_kt__g28mmu();
    return get_DpOffsetToVector();
  }
  function lerp(start, stop, fraction) {
    _init_properties_VectorConverters_kt__g28mmu();
    return start * (1 - fraction) + stop * fraction;
  }
  function FloatToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector1D(it);
  }
  function FloatToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return it.k7k_1;
  }
  function IntToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector1D(it);
  }
  function IntToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return numberToInt(it.k7k_1);
  }
  function DpToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector1D(_Dp___get_value__impl__geb1vb(it.o36_1));
  }
  function DpToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Dp(_Dp___init__impl__ms3zkb(it.k7k_1));
  }
  function DpOffsetToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_Dp___get_value__impl__geb1vb(_DpOffset___get_x__impl__uauqb5(it.s36_1)), _Dp___get_value__impl__geb1vb(_DpOffset___get_y__impl__1h898y(it.s36_1)));
  }
  function DpOffsetToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var this_0 = it.o7k_1;
    var tmp = _Dp___init__impl__ms3zkb(this_0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var this_1 = it.p7k_1;
    var tmp$ret$1 = _Dp___init__impl__ms3zkb(this_1);
    return new DpOffset_0(DpOffset(tmp, tmp$ret$1));
  }
  function SizeToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_Size___get_width__impl__58y75t(it.y34_1), _Size___get_height__impl__a04p02(it.y34_1));
  }
  function SizeToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Size(Size_0(it.o7k_1, it.p7k_1));
  }
  function OffsetToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_Offset___get_x__impl__xvi35n(it.x33_1), _Offset___get_y__impl__8bzhra(it.x33_1));
  }
  function OffsetToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Offset(Offset_0(it.o7k_1, it.p7k_1));
  }
  function IntOffsetToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_IntOffset___get_x__impl__qiqr5o(it.t36_1), _IntOffset___get_y__impl__2avpwj(it.t36_1));
  }
  function IntOffsetToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = it.o7k_1;
    var tmp = roundToInt(this_0);
    // Inline function 'kotlin.math.roundToInt' call
    var this_1 = it.p7k_1;
    var tmp$ret$1 = roundToInt(this_1);
    return new IntOffset(IntOffset_0(tmp, tmp$ret$1));
  }
  function IntSizeToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_IntSize___get_width__impl__d9yl4o(it.d37_1), _IntSize___get_height__impl__prv63b(it.d37_1));
  }
  function IntSizeToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = it.o7k_1;
    var tmp = roundToInt(this_0);
    // Inline function 'kotlin.math.roundToInt' call
    var this_1 = it.p7k_1;
    var tmp$ret$1 = roundToInt(this_1);
    return new IntSize(IntSize_0(tmp, tmp$ret$1));
  }
  function RectToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector4D(it.a34_1, it.b34_1, it.c34_1, it.d34_1);
  }
  function RectToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Rect(it.v7k_1, it.w7k_1, it.x7k_1, it.y7k_1);
  }
  var properties_initialized_VectorConverters_kt_cg0a6g;
  function _init_properties_VectorConverters_kt__g28mmu() {
    if (!properties_initialized_VectorConverters_kt_cg0a6g) {
      properties_initialized_VectorConverters_kt_cg0a6g = true;
      var tmp = FloatToVector$lambda;
      FloatToVector = TwoWayConverter(tmp, FloatToVector$lambda_0);
      var tmp_0 = IntToVector$lambda;
      IntToVector = TwoWayConverter(tmp_0, IntToVector$lambda_0);
      var tmp_1 = DpToVector$lambda;
      DpToVector = TwoWayConverter(tmp_1, DpToVector$lambda_0);
      var tmp_2 = DpOffsetToVector$lambda;
      DpOffsetToVector = TwoWayConverter(tmp_2, DpOffsetToVector$lambda_0);
      var tmp_3 = SizeToVector$lambda;
      SizeToVector = TwoWayConverter(tmp_3, SizeToVector$lambda_0);
      var tmp_4 = OffsetToVector$lambda;
      OffsetToVector = TwoWayConverter(tmp_4, OffsetToVector$lambda_0);
      var tmp_5 = IntOffsetToVector$lambda;
      IntOffsetToVector = TwoWayConverter(tmp_5, IntOffsetToVector$lambda_0);
      var tmp_6 = IntSizeToVector$lambda;
      IntSizeToVector = TwoWayConverter(tmp_6, IntSizeToVector$lambda_0);
      var tmp_7 = RectToVector$lambda;
      RectToVector = TwoWayConverter(tmp_7, RectToVector$lambda_0);
    }
  }
  function Spring() {
    this.j7r_1 = 10000.0;
    this.k7r_1 = 1500.0;
    this.l7r_1 = 400.0;
    this.m7r_1 = 200.0;
    this.n7r_1 = 50.0;
    this.o7r_1 = 0.2;
    this.p7r_1 = 0.5;
    this.q7r_1 = 0.75;
    this.r7r_1 = 1.0;
    this.s7r_1 = 0.01;
  }
  var Spring_instance;
  function Spring_getInstance() {
    return Spring_instance;
  }
  function VectorizedSpringSpec_init_$Init$(dampingRatio, stiffness, visibilityThreshold, $this) {
    dampingRatio = dampingRatio === VOID ? 1.0 : dampingRatio;
    stiffness = stiffness === VOID ? 1500.0 : stiffness;
    visibilityThreshold = visibilityThreshold === VOID ? null : visibilityThreshold;
    VectorizedSpringSpec.call($this, dampingRatio, stiffness, createSpringAnimations(visibilityThreshold, dampingRatio, stiffness));
    return $this;
  }
  function VectorizedSpringSpec_init_$Create$(dampingRatio, stiffness, visibilityThreshold) {
    return VectorizedSpringSpec_init_$Init$(dampingRatio, stiffness, visibilityThreshold, objectCreate(protoOf(VectorizedSpringSpec)));
  }
  function VectorizedSpringSpec(dampingRatio, stiffness, anims) {
    this.t7r_1 = dampingRatio;
    this.u7r_1 = stiffness;
    this.v7r_1 = new VectorizedFloatAnimationSpec(anims);
  }
  protoOf(VectorizedSpringSpec).t7i = function () {
    return this.v7r_1.t7i();
  };
  protoOf(VectorizedSpringSpec).q7i = function (initialValue, targetValue, initialVelocity) {
    return this.v7r_1.q7i(initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedSpringSpec).r7i = function (initialValue, targetValue, initialVelocity) {
    return this.v7r_1.r7i(initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedSpringSpec).v7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.v7r_1.v7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedSpringSpec).z7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.v7r_1.z7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  function VectorizedFiniteAnimationSpec() {
  }
  function VectorizedAnimationSpec() {
  }
  function _get_valueVector__r10idf_0($this) {
    var tmp = $this.x7r_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('valueVector');
    }
  }
  function _get_velocityVector__dvxlkl_0($this) {
    var tmp = $this.y7r_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('velocityVector');
    }
  }
  function _get_endVelocityVector__l8kbka($this) {
    var tmp = $this.z7r_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('endVelocityVector');
    }
  }
  function VectorizedFloatAnimationSpec_init_$Init$(anim, $this) {
    VectorizedFloatAnimationSpec.call($this, new VectorizedFloatAnimationSpec$1(anim));
    return $this;
  }
  function VectorizedFloatAnimationSpec_init_$Create$(anim) {
    return VectorizedFloatAnimationSpec_init_$Init$(anim, objectCreate(protoOf(VectorizedFloatAnimationSpec)));
  }
  function VectorizedFloatAnimationSpec$1($anim) {
    this.a7s_1 = $anim;
  }
  protoOf(VectorizedFloatAnimationSpec$1).n = function (index) {
    return this.a7s_1;
  };
  function VectorizedFloatAnimationSpec(anims) {
    this.w7r_1 = anims;
  }
  protoOf(VectorizedFloatAnimationSpec).v7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    if (!!(this.x7r_1 == null)) {
      this.x7r_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_valueVector__r10idf_0(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_valueVector__r10idf_0(this).e7f(i, this.w7r_1.n(i).u7l(playTimeNanos, initialValue.n(i), targetValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_valueVector__r10idf_0(this);
  };
  protoOf(VectorizedFloatAnimationSpec).z7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    if (!!(this.y7r_1 == null)) {
      this.y7r_1 = newInstance(initialVelocity);
    }
    var inductionVariable = 0;
    var last = _get_velocityVector__dvxlkl_0(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_velocityVector__dvxlkl_0(this).e7f(i, this.w7r_1.n(i).v7l(playTimeNanos, initialValue.n(i), targetValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_velocityVector__dvxlkl_0(this);
  };
  protoOf(VectorizedFloatAnimationSpec).r7i = function (initialValue, targetValue, initialVelocity) {
    if (!!(this.z7r_1 == null)) {
      this.z7r_1 = newInstance(initialVelocity);
    }
    var inductionVariable = 0;
    var last = _get_endVelocityVector__l8kbka(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_endVelocityVector__l8kbka(this).e7f(i, this.w7r_1.n(i).w7l(initialValue.n(i), targetValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_endVelocityVector__l8kbka(this);
  };
  protoOf(VectorizedFloatAnimationSpec).q7i = function (initialValue, targetValue, initialVelocity) {
    var maxDuration = new Long(0, 0);
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = until(0, initialValue.m()).o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.animation.core.VectorizedFloatAnimationSpec.getDurationNanos.<anonymous>' call
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = maxDuration;
      var b = this.w7r_1.n(element).x7l(initialValue.n(element), targetValue.n(element), initialVelocity.n(element));
      maxDuration = a.z6(b) >= 0 ? a : b;
    }
    return maxDuration;
  };
  function createSpringAnimations(visibilityThreshold, dampingRatio, stiffness) {
    if (!(visibilityThreshold == null)) {
      return new createSpringAnimations$1(visibilityThreshold, dampingRatio, stiffness);
    } else {
      return new createSpringAnimations$2(dampingRatio, stiffness);
    }
  }
  function repetitionPlayTimeNanos($this, playTimeNanos) {
    if (playTimeNanos.eb($this.e7s_1).z6(new Long(0, 0)) <= 0) {
      return new Long(0, 0);
    } else {
      var postOffsetPlayTimeNanos = playTimeNanos.eb($this.e7s_1);
      var repeatsCount = postOffsetPlayTimeNanos.v9($this.d7s_1);
      var tmp;
      if ($this.c7s_1.equals(RepeatMode_Restart_getInstance())) {
        tmp = true;
      } else {
        // Inline function 'kotlin.Long.rem' call
        tmp = repeatsCount.gb(toLong(2)).equals(new Long(0, 0));
      }
      if (tmp) {
        return postOffsetPlayTimeNanos.fb(repeatsCount.w9($this.d7s_1));
      } else {
        // Inline function 'kotlin.Long.plus' call
        return repeatsCount.eb(toLong(1)).w9($this.d7s_1).fb(postOffsetPlayTimeNanos);
      }
    }
  }
  function repetitionStartVelocity($this, playTimeNanos, start, startVelocity, end) {
    var tmp;
    if (playTimeNanos.eb($this.e7s_1).z6($this.d7s_1) > 0) {
      tmp = $this.b7s_1.z7i($this.d7s_1.fb($this.e7s_1), start, end, startVelocity);
    } else {
      tmp = startVelocity;
    }
    return tmp;
  }
  function VectorizedInfiniteRepeatableSpec(animation, repeatMode, initialStartOffset) {
    repeatMode = repeatMode === VOID ? RepeatMode_Restart_getInstance() : repeatMode;
    initialStartOffset = initialStartOffset === VOID ? _StartOffset___init__impl__615djw_0(0) : initialStartOffset;
    this.b7s_1 = animation;
    this.c7s_1 = repeatMode;
    this.d7s_1 = numberToLong(this.b7s_1.f7s() + this.b7s_1.g7s() | 0).w9(get_MillisToNanos());
    this.e7s_1 = _StartOffset___get_value__impl__8sikig(initialStartOffset).w9(get_MillisToNanos());
  }
  protoOf(VectorizedInfiniteRepeatableSpec).t7i = function () {
    return true;
  };
  protoOf(VectorizedInfiniteRepeatableSpec).v7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.b7s_1.v7i(repetitionPlayTimeNanos(this, playTimeNanos), initialValue, targetValue, repetitionStartVelocity(this, playTimeNanos, initialValue, initialVelocity, targetValue));
  };
  protoOf(VectorizedInfiniteRepeatableSpec).z7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.b7s_1.z7i(repetitionPlayTimeNanos(this, playTimeNanos), initialValue, targetValue, repetitionStartVelocity(this, playTimeNanos, initialValue, initialVelocity, targetValue));
  };
  protoOf(VectorizedInfiniteRepeatableSpec).q7i = function (initialValue, targetValue, initialVelocity) {
    Companion_getInstance_6();
    return new Long(-1, 2147483647);
  };
  function VectorizedDurationBasedAnimationSpec() {
  }
  function _get_valueVector__r10idf_1($this) {
    var tmp = $this.k7s_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('valueVector');
    }
  }
  function _get_velocityVector__dvxlkl_1($this) {
    var tmp = $this.l7s_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('velocityVector');
    }
  }
  function init_0($this, value) {
    if (!!($this.k7s_1 == null)) {
      $this.k7s_1 = newInstance(value);
      $this.l7s_1 = newInstance(value);
    }
  }
  function VectorizedKeyframesSpec(keyframes, durationMillis, delayMillis) {
    delayMillis = delayMillis === VOID ? 0 : delayMillis;
    this.h7s_1 = keyframes;
    this.i7s_1 = durationMillis;
    this.j7s_1 = delayMillis;
  }
  protoOf(VectorizedKeyframesSpec).g7s = function () {
    return this.i7s_1;
  };
  protoOf(VectorizedKeyframesSpec).f7s = function () {
    return this.j7s_1;
  };
  protoOf(VectorizedKeyframesSpec).v7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime_0(this, playTimeMillis).ea();
    if (this.h7s_1.w2(clampedPlayTime)) {
      return getValue(this.h7s_1, clampedPlayTime).pe_1;
    }
    if (clampedPlayTime >= this.i7s_1) {
      return targetValue;
    } else if (clampedPlayTime <= 0)
      return initialValue;
    var startTime = 0;
    var startVal = initialValue;
    var endVal = targetValue;
    var endTime = this.i7s_1;
    var easing = get_LinearEasing();
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.h7s_1.o2().o();
    while (tmp0_iterator.d1()) {
      var tmp1_loop_parameter = tmp0_iterator.f1();
      // Inline function 'kotlin.collections.component1' call
      var timestamp = tmp1_loop_parameter.r2();
      // Inline function 'kotlin.collections.component2' call
      var value = tmp1_loop_parameter.s2();
      if (clampedPlayTime > timestamp ? timestamp >= startTime : false) {
        startTime = timestamp;
        startVal = value.pe_1;
        easing = value.qe_1;
      } else if (clampedPlayTime < timestamp ? timestamp <= endTime : false) {
        endTime = timestamp;
        endVal = value.pe_1;
      }
    }
    var fraction = easing.s7l((clampedPlayTime - startTime | 0) / (endTime - startTime | 0));
    init_0(this, initialValue);
    var inductionVariable = 0;
    var last = startVal.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_valueVector__r10idf_1(this).e7f(i, lerp(startVal.n(i), endVal.n(i), fraction));
      }
       while (inductionVariable < last);
    return _get_valueVector__r10idf_1(this);
  };
  protoOf(VectorizedKeyframesSpec).z7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime_0(this, playTimeMillis);
    if (clampedPlayTime.z6(new Long(0, 0)) <= 0) {
      return initialVelocity;
    }
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = clampedPlayTime.fb(toLong(1));
    var startNum = getValueFromMillis(this, tmp$ret$0, initialValue, targetValue, initialVelocity);
    var endNum = getValueFromMillis(this, clampedPlayTime, initialValue, targetValue, initialVelocity);
    init_0(this, initialValue);
    var inductionVariable = 0;
    var last = startNum.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_velocityVector__dvxlkl_1(this).e7f(i, (startNum.n(i) - endNum.n(i)) * 1000.0);
      }
       while (inductionVariable < last);
    return _get_velocityVector__dvxlkl_1(this);
  };
  function VectorizedTweenSpec(durationMillis, delayMillis, easing) {
    var tmp;
    if (durationMillis === VOID) {
      AnimationConstants_getInstance();
      tmp = 300;
    } else {
      tmp = durationMillis;
    }
    durationMillis = tmp;
    delayMillis = delayMillis === VOID ? 0 : delayMillis;
    easing = easing === VOID ? get_FastOutSlowInEasing() : easing;
    this.m7s_1 = durationMillis;
    this.n7s_1 = delayMillis;
    this.o7s_1 = easing;
    this.p7s_1 = VectorizedFloatAnimationSpec_init_$Create$(new FloatTweenSpec(this.m7s_1, this.n7s_1, this.o7s_1));
  }
  protoOf(VectorizedTweenSpec).g7s = function () {
    return this.m7s_1;
  };
  protoOf(VectorizedTweenSpec).f7s = function () {
    return this.n7s_1;
  };
  protoOf(VectorizedTweenSpec).v7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.p7s_1.v7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedTweenSpec).z7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.p7s_1.z7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  function clampPlayTime_0(_this__u8e3s4, playTime) {
    // Inline function 'kotlin.Long.minus' call
    var other = _this__u8e3s4.f7s();
    var tmp$ret$0 = playTime.fb(toLong(other));
    return coerceIn_0(tmp$ret$0, new Long(0, 0), toLong(_this__u8e3s4.g7s()));
  }
  function getValueFromMillis(_this__u8e3s4, playTimeMillis, start, end, startVelocity) {
    return _this__u8e3s4.v7i(playTimeMillis.w9(get_MillisToNanos()), start, end, startVelocity);
  }
  function createSpringAnimations$1($visibilityThreshold, $dampingRatio, $stiffness) {
    var tmp = this;
    // Inline function 'kotlin.collections.map' call
    var this_0 = until(0, $visibilityThreshold.m());
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.o();
    while (tmp0_iterator.d1()) {
      var item = tmp0_iterator.f1();
      // Inline function 'androidx.compose.animation.core.<no name provided>.anims.<anonymous>' call
      var tmp$ret$0 = new FloatSpringSpec($dampingRatio, $stiffness, $visibilityThreshold.n(item));
      destination.a1(tmp$ret$0);
    }
    tmp.q7s_1 = destination;
  }
  protoOf(createSpringAnimations$1).n = function (index) {
    return this.q7s_1.n(index);
  };
  function createSpringAnimations$2($dampingRatio, $stiffness) {
    this.r7s_1 = new FloatSpringSpec($dampingRatio, $stiffness);
  }
  protoOf(createSpringAnimations$2).n = function (index) {
    return this.r7s_1;
  };
  function get_rectVisibilityThreshold() {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return rectVisibilityThreshold;
  }
  var rectVisibilityThreshold;
  var visibilityThresholdMap;
  function get_VisibilityThreshold(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    // Inline function 'androidx.compose.ui.unit.dp' call
    return _Dp___init__impl__ms3zkb(0.1);
  }
  function get_VisibilityThreshold_0(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return Size_0(0.5, 0.5);
  }
  function get_VisibilityThreshold_1(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return Offset_0(0.5, 0.5);
  }
  function get_VisibilityThreshold_2(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return get_rectVisibilityThreshold();
  }
  function get_VisibilityThreshold_3(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return 1;
  }
  function get_VisibilityThreshold_4(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return IntOffset_0(1, 1);
  }
  function get_VisibilityThreshold_5(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return IntSize_0(1, 1);
  }
  var properties_initialized_VisibilityThresholds_kt_k6rdp8;
  function _init_properties_VisibilityThresholds_kt__rvu6yi() {
    if (!properties_initialized_VisibilityThresholds_kt_k6rdp8) {
      properties_initialized_VisibilityThresholds_kt_k6rdp8 = true;
      rectVisibilityThreshold = new Rect(0.5, 0.5, 0.5, 0.5);
      visibilityThresholdMap = mapOf([to(get_VectorConverter(IntCompanionObject_instance), 1.0), to(get_VectorConverter_0(Companion_getInstance_5()), 1.0), to(get_VectorConverter_1(Companion_getInstance_4()), 1.0), to(get_VectorConverter_2(FloatCompanionObject_instance), 0.01), to(get_VectorConverter_3(Companion_getInstance_3()), 0.5), to(get_VectorConverter_4(Companion_getInstance_1()), 0.5), to(get_VectorConverter_5(Companion_getInstance_2()), 0.5), to(get_VectorConverter_6(Companion_getInstance_0()), 0.1), to(get_VectorConverter_7(Companion_getInstance_7()), 0.1)]);
    }
  }
  function AtomicReference(value) {
    this.l7p_1 = value;
  }
  protoOf(AtomicReference).zu = function () {
    // Inline function 'kotlinx.atomicfu.atomicfu_getValue' call
    return this.l7p_1;
  };
  protoOf(AtomicReference).f23 = function (expect, newValue) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.atomicfu.atomicfu_compareAndSet' call
      if (equals(this.l7p_1, expect)) {
        // Inline function 'androidx.compose.animation.core.AtomicReference.compareAndSet.<set-delegate>' call
        this.l7p_1 = newValue;
        tmp$ret$0 = true;
        break $l$block_0;
      } else {
        tmp$ret$0 = false;
        break $l$block_0;
      }
    }
    return tmp$ret$0;
  };
  function PlatformOptimizedCancellationException(message) {
    message = message === VOID ? null : message;
    CancellationException_init_$Init$(message, this);
    captureStack(this, PlatformOptimizedCancellationException);
  }
  //region block: post-declaration
  protoOf(TargetBasedAnimation).w7i = isFinishedFromNanos;
  protoOf(DecayAnimation).w7i = isFinishedFromNanos;
  protoOf(FloatSpringSpec).y7l = vectorize;
  protoOf(FloatTweenSpec).w7l = getEndVelocity;
  protoOf(FloatTweenSpec).y7l = vectorize;
  protoOf(VectorizedFloatAnimationSpec).t7i = get_isInfinite;
  protoOf(VectorizedInfiniteRepeatableSpec).r7i = getEndVelocity_0;
  protoOf(VectorizedKeyframesSpec).q7i = getDurationNanos;
  protoOf(VectorizedKeyframesSpec).t7i = get_isInfinite;
  protoOf(VectorizedKeyframesSpec).r7i = getEndVelocity_0;
  protoOf(VectorizedTweenSpec).q7i = getDurationNanos;
  protoOf(VectorizedTweenSpec).t7i = get_isInfinite;
  protoOf(VectorizedTweenSpec).r7i = getEndVelocity_0;
  //endregion
  //region block: init
  MillisToNanos = new Long(1000000, 0);
  UNSET = 3.4028235E38;
  AnimationDebugDurationScale = 1;
  Spring_instance = new Spring();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Animatable_0;
  _.$_$.b = Animatable;
  _.$_$.c = AnimationState_0;
  _.$_$.d = AnimationVector1D;
  _.$_$.e = CubicBezierEasing;
  _.$_$.f = get_FastOutSlowInEasing;
  _.$_$.g = get_LinearEasing;
  _.$_$.h = SpringSpec;
  _.$_$.i = TweenSpec;
  _.$_$.j = get_VectorConverter_1;
  _.$_$.k = get_VectorConverter;
  _.$_$.l = get_VectorConverter_2;
  _.$_$.m = get_VisibilityThreshold_4;
  _.$_$.n = animateFloatAsState;
  _.$_$.o = animateFloat;
  _.$_$.p = animateValue;
  _.$_$.q = copy;
  _.$_$.r = generateDecayAnimationSpec;
  _.$_$.s = infiniteRepeatable;
  _.$_$.t = keyframes;
  _.$_$.u = rememberInfiniteTransition;
  _.$_$.v = spring;
  _.$_$.w = tween;
  _.$_$.x = animateDecay;
  _.$_$.y = animateTo;
  _.$_$.z = animate_0;
  _.$_$.a1 = AnimationConstants_getInstance;
  _.$_$.b1 = Spring_instance;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-animation-animation-core.js.map
