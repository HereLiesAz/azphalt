(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-runtime-runtime.js', './compose-multiplatform-core-collection-collection.js', './compose-multiplatform-core-compose-ui-ui.js', './kotlinx-coroutines-core.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-ui-ui-geometry.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./compose-multiplatform-core-collection-collection.js'), require('./compose-multiplatform-core-compose-ui-ui.js'), require('./kotlinx-coroutines-core.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-collection-collection'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-collection-collection' was not found. Please, check whether 'compose-multiplatform-core-collection-collection' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation-core'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'compose-multiplatform-core-compose-animation-animation-core'.");
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
    root['compose-multiplatform-core-compose-animation-animation-core'] = factory(typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-animation-animation-core'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-runtime-runtime'], this['compose-multiplatform-core-collection-collection'], this['compose-multiplatform-core-compose-ui-ui'], this['kotlinx-coroutines-core'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-ui-ui-geometry']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_collection_internal_collection, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_ui_ui_geometry) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var equals = kotlin_kotlin.$_$.ea;
  var VOID = kotlin_kotlin.$_$.g;
  var coerceIn = kotlin_kotlin.$_$.gc;
  var Long = kotlin_kotlin.$_$.we;
  var CoroutineImpl = kotlin_kotlin.$_$.o9;
  var protoOf = kotlin_kotlin.$_$.jb;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.a9;
  var CancellationException = kotlin_kotlin.$_$.z8;
  var classMeta = kotlin_kotlin.$_$.ba;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var KMutableProperty1 = kotlin_kotlin.$_$.qc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ka;
  var objectCreate = kotlin_kotlin.$_$.hb;
  var isNaN_0 = kotlin_kotlin.$_$.ag;
  var toString = kotlin_kotlin.$_$.ob;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var interfaceMeta = kotlin_kotlin.$_$.oa;
  var Enum = kotlin_kotlin.$_$.re;
  var hashCode = kotlin_kotlin.$_$.ma;
  var getNumberHashCode = kotlin_kotlin.$_$.ja;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var get_BitmaskMsb = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.a;
  var toLong = kotlin_kotlin.$_$.mb;
  var mutableIntObjectMapOf = kotlin_org_jetbrains_compose_collection_internal_collection.$_$.i;
  var to = kotlin_kotlin.$_$.pg;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var State = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.kg;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var coerceIn_0 = kotlin_kotlin.$_$.ic;
  var numberToLong = kotlin_kotlin.$_$.gb;
  var withFrameNanos = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x1;
  var Key_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.k5;
  var isArray = kotlin_kotlin.$_$.pa;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var isInterface = kotlin_kotlin.$_$.xa;
  var snapshotFlow = kotlin_org_jetbrains_compose_runtime_runtime.$_$.o1;
  var first = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.c;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var fillArrayVal = kotlin_kotlin.$_$.fa;
  var MutableVector = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var LaunchedEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var SideEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v;
  var DisposableEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.c1;
  var Key_instance_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var ensureNotNull = kotlin_kotlin.$_$.vf;
  var Mutex = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.z;
  var coroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.f;
  var captureStack = kotlin_kotlin.$_$.v9;
  var isFinite = kotlin_kotlin.$_$.xf;
  var isNaN_1 = kotlin_kotlin.$_$.bg;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.b4;
  var floatFromBits = kotlin_kotlin.$_$.ga;
  var toRawBits = kotlin_kotlin.$_$.ng;
  var Key_instance_1 = kotlin_org_jetbrains_compose_ui_ui.$_$.o5;
  var numberToInt = kotlin_kotlin.$_$.fb;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y1;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l;
  var _DpOffset___get_x__impl__uauqb5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z1;
  var _DpOffset___get_y__impl__1h898y = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a2;
  var DpOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.i;
  var DpOffset_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.j;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.e1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.x;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.y;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var Offset_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var _IntOffset___get_x__impl__qiqr5o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b2;
  var _IntOffset___get_y__impl__2avpwj = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c2;
  var roundToInt = kotlin_kotlin.$_$.ub;
  var IntOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n;
  var IntOffset_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o;
  var _IntSize___get_width__impl__d9yl4o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f2;
  var _IntSize___get_height__impl__prv63b = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e2;
  var IntSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p;
  var IntSize_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q;
  var Rect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f;
  var until = kotlin_kotlin.$_$.nc;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.k4;
  var getValue = kotlin_kotlin.$_$.b7;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.w5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a3;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.z2;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i1;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.j1;
  var Companion_getInstance_5 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var Companion_getInstance_6 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w2;
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
  function isFinishedFromNanos(playTimeNanos) {
    return playTimeNanos.z6(this.v7i()) >= 0;
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
    return this.w7l(this.y7l(initialValue, targetValue, initialVelocity), initialValue, targetValue, initialVelocity);
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
    return this.x7i(this.o7i(initialValue, targetValue, initialVelocity), initialValue, targetValue, initialVelocity);
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
    return numberToLong(this.g7s() + this.h7s() | 0).w9(get_MillisToNanos());
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
      updateState($this$animate, this$0.c7f_1);
      var clamped = clampToBounds(this$0, $this$animate.s2());
      var tmp;
      if (!equals(clamped, $this$animate.s2())) {
        this$0.c7f_1.g1d(clamped);
        $endState.g1d(clamped);
        var tmp0_safe_receiver = $block;
        if (tmp0_safe_receiver == null)
          null;
        else
          tmp0_safe_receiver(this$0);
        $this$animate.c7g();
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
    var this_0 = $this.d7f_1;
    isRunning$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _set_targetValue__aqsk0r($this, _set____db54di) {
    var this_0 = $this.e7f_1;
    targetValue$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function runAnimation($this, animation, initialVelocity, block, $completion) {
    var startTime = $this.c7f_1.z7f_1;
    return $this.h7f_1.f7g(VOID, Animatable$runAnimation$slambda_0($this, initialVelocity, animation, startTime, block, null), $completion);
  }
  function clampToBounds($this, value) {
    if (equals($this.l7f_1, $this.j7f_1) ? equals($this.m7f_1, $this.k7f_1) : false) {
      return value;
    }
    var valueVector = $this.z7e_1.g7g()(value);
    var clamped = false;
    var inductionVariable = 0;
    var last = valueVector.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (valueVector.n(i) < $this.l7f_1.n(i) ? true : valueVector.n(i) > $this.m7f_1.n(i)) {
          clamped = true;
          valueVector.h7g(i, coerceIn(valueVector.n(i), $this.l7f_1.n(i), $this.m7f_1.n(i)));
        }
      }
       while (inductionVariable < last);
    if (clamped) {
      return $this.z7e_1.i7g()(valueVector);
    } else {
      return value;
    }
  }
  function endAnimation($this) {
    // Inline function 'kotlin.apply' call
    var this_0 = $this.c7f_1;
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.Animatable.endAnimation.<anonymous>' call
    this_0.y7f_1.v2b();
    var tmp = this_0;
    AnimationConstants_getInstance();
    tmp.z7f_1 = new Long(0, -2147483648);
    _set_isRunning__kpbg34($this, false);
  }
  function Animatable$runAnimation$slambda(this$0, $initialVelocity, $animation, $startTime, $block, resultContinuation) {
    this.r7g_1 = this$0;
    this.s7g_1 = $initialVelocity;
    this.t7g_1 = $animation;
    this.u7g_1 = $startTime;
    this.v7g_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Animatable$runAnimation$slambda).z7g = function ($completion) {
    var tmp = this.n4h($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Animatable$runAnimation$slambda).o4h = function ($completion) {
    return this.z7g($completion);
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
            this.r7g_1.c7f_1.y7f_1 = this.r7g_1.z7e_1.g7g()(this.s7g_1);
            _set_targetValue__aqsk0r(this.r7g_1, this.t7g_1.a7h());
            _set_isRunning__kpbg34(this.r7g_1, true);
            var tmp_0 = this;
            AnimationConstants_getInstance();
            tmp_0.x7g_1 = copy_0(this.r7g_1.c7f_1, VOID, VOID, VOID, new Long(0, -2147483648));
            this.y7g_1 = {_v: false};
            this.ac_1 = 1;
            suspendResult = animate(this.x7g_1, this.t7g_1, this.u7g_1, Animatable$runAnimation$slambda$lambda(this.r7g_1, this.x7g_1, this.v7g_1, this.y7g_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var endReason = this.y7g_1._v ? AnimationEndReason_BoundReached_getInstance() : AnimationEndReason_Finished_getInstance();
            endAnimation(this.r7g_1);
            this.w7g_1 = new AnimationResult(this.x7g_1, endReason);
            this.bc_1 = 3;
            this.ac_1 = 4;
            continue $sm;
          case 2:
            this.bc_1 = 3;
            var tmp_1 = this.dc_1;
            if (tmp_1 instanceof CancellationException) {
              var e = this.dc_1;
              var tmp_2 = this;
              endAnimation(this.r7g_1);
              throw e;
            } else {
              throw this.dc_1;
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            return this.w7g_1;
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
  protoOf(Animatable$runAnimation$slambda).n4h = function (completion) {
    return new Animatable$runAnimation$slambda(this.r7g_1, this.s7g_1, this.t7g_1, this.u7g_1, this.v7g_1, completion);
  };
  function Animatable$runAnimation$slambda_0(this$0, $initialVelocity, $animation, $startTime, $block, resultContinuation) {
    var i = new Animatable$runAnimation$slambda(this$0, $initialVelocity, $animation, $startTime, $block, resultContinuation);
    var l = function ($completion) {
      return i.z7g($completion);
    };
    l.$arity = 0;
    return l;
  }
  function Animatable$snapTo$slambda(this$0, $targetValue, resultContinuation) {
    this.j7h_1 = this$0;
    this.k7h_1 = $targetValue;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Animatable$snapTo$slambda).l7h = function ($completion) {
    var tmp = this.n4h($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Animatable$snapTo$slambda).o4h = function ($completion) {
    return this.l7h($completion);
  };
  protoOf(Animatable$snapTo$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          endAnimation(this.j7h_1);
          var clampedValue = clampToBounds(this.j7h_1, this.k7h_1);
          this.j7h_1.c7f_1.g1d(clampedValue);
          _set_targetValue__aqsk0r(this.j7h_1, clampedValue);
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
  protoOf(Animatable$snapTo$slambda).n4h = function (completion) {
    return new Animatable$snapTo$slambda(this.j7h_1, this.k7h_1, completion);
  };
  function Animatable$snapTo$slambda_0(this$0, $targetValue, resultContinuation) {
    var i = new Animatable$snapTo$slambda(this$0, $targetValue, resultContinuation);
    var l = function ($completion) {
      return i.l7h($completion);
    };
    l.$arity = 0;
    return l;
  }
  function Animatable$stop$slambda(this$0, resultContinuation) {
    this.u7h_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Animatable$stop$slambda).l7h = function ($completion) {
    var tmp = this.n4h($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Animatable$stop$slambda).o4h = function ($completion) {
    return this.l7h($completion);
  };
  protoOf(Animatable$stop$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          endAnimation(this.u7h_1);
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
  protoOf(Animatable$stop$slambda).n4h = function (completion) {
    return new Animatable$stop$slambda(this.u7h_1, completion);
  };
  function Animatable$stop$slambda_0(this$0, resultContinuation) {
    var i = new Animatable$stop$slambda(this$0, resultContinuation);
    var l = function ($completion) {
      return i.l7h($completion);
    };
    l.$arity = 0;
    return l;
  }
  function Animatable(initialValue, typeConverter, visibilityThreshold, label) {
    visibilityThreshold = visibilityThreshold === VOID ? null : visibilityThreshold;
    label = label === VOID ? 'Animatable' : label;
    this.z7e_1 = typeConverter;
    this.a7f_1 = visibilityThreshold;
    this.b7f_1 = label;
    this.c7f_1 = new AnimationState(this.z7e_1, initialValue);
    this.d7f_1 = mutableStateOf(false);
    this.e7f_1 = mutableStateOf(initialValue);
    this.f7f_1 = null;
    this.g7f_1 = null;
    this.h7f_1 = new MutatorMutex();
    this.i7f_1 = new SpringSpec(VOID, VOID, this.a7f_1);
    var tmp = this;
    var tmp0_subject = this.v7h();
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
    tmp.j7f_1 = tmp_1 instanceof AnimationVector_3 ? tmp_1 : THROW_CCE();
    var tmp_2 = this;
    var tmp0_subject_0 = this.v7h();
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
    tmp_2.k7f_1 = tmp_4 instanceof AnimationVector_3 ? tmp_4 : THROW_CCE();
    this.l7f_1 = this.j7f_1;
    this.m7f_1 = this.k7f_1;
  }
  protoOf(Animatable).s2 = function () {
    return this.c7f_1.s2();
  };
  protoOf(Animatable).v7h = function () {
    return this.c7f_1.y7f_1;
  };
  protoOf(Animatable).w7h = function () {
    return this.z7e_1.i7g()(this.v7h());
  };
  protoOf(Animatable).x7h = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.d7f_1;
    isRunning$factory_0();
    return this_0.s2();
  };
  protoOf(Animatable).a7h = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.e7f_1;
    targetValue$factory_0();
    return this_0.s2();
  };
  protoOf(Animatable).y7h = function (targetValue, animationSpec, initialVelocity, block, $completion) {
    var tmp0_initialValue = this.s2();
    var tmp1_typeConverter = this.z7e_1;
    var anim = TargetBasedAnimation_0(animationSpec, tmp1_typeConverter, tmp0_initialValue, targetValue, initialVelocity);
    return runAnimation(this, anim, initialVelocity, block, $completion);
  };
  protoOf(Animatable).z7h = function (targetValue, animationSpec, initialVelocity, block, $completion, $super) {
    animationSpec = animationSpec === VOID ? this.i7f_1 : animationSpec;
    initialVelocity = initialVelocity === VOID ? this.w7h() : initialVelocity;
    block = block === VOID ? null : block;
    return $super === VOID ? this.y7h(targetValue, animationSpec, initialVelocity, block, $completion) : $super.y7h.call(this, targetValue, animationSpec, initialVelocity, block, $completion);
  };
  protoOf(Animatable).a7i = function (targetValue, $completion) {
    return this.h7f_1.f7g(VOID, Animatable$snapTo$slambda_0(this, targetValue, null), $completion);
  };
  protoOf(Animatable).b7i = function ($completion) {
    return this.h7f_1.f7g(VOID, Animatable$stop$slambda_0(this, null), $completion);
  };
  function AnimationResult(endState, endReason) {
    this.c7i_1 = endState;
    this.d7i_1 = endReason;
  }
  protoOf(AnimationResult).toString = function () {
    return 'AnimationResult(endReason=' + this.d7i_1 + ', endState=' + this.c7i_1 + ')';
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
      return receiver.x7h();
    }, function (receiver, value) {
      return _set_isRunning__kpbg34(receiver, value);
    });
  }
  function isRunning$factory_0() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return receiver.x7h();
    }, function (receiver, value) {
      return _set_isRunning__kpbg34(receiver, value);
    });
  }
  function targetValue$factory() {
    return getPropertyCallableRef('targetValue', 1, KMutableProperty1, function (receiver) {
      return receiver.a7h();
    }, function (receiver, value) {
      return _set_targetValue__aqsk0r(receiver, value);
    });
  }
  function targetValue$factory_0() {
    return getPropertyCallableRef('targetValue', 1, KMutableProperty1, function (receiver) {
      return receiver.a7h();
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
  function get_MillisToNanos() {
    return MillisToNanos;
  }
  var MillisToNanos;
  function TargetBasedAnimation_init_$Init$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector, $this) {
    initialVelocityVector = initialVelocityVector === VOID ? null : initialVelocityVector;
    TargetBasedAnimation.call($this, animationSpec.e7i(typeConverter), typeConverter, initialValue, targetValue, initialVelocityVector);
    return $this;
  }
  function TargetBasedAnimation_init_$Create$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector) {
    return TargetBasedAnimation_init_$Init$(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector, objectCreate(protoOf(TargetBasedAnimation)));
  }
  function TargetBasedAnimation(animationSpec, typeConverter, initialValue, targetValue, initialVelocityVector) {
    initialVelocityVector = initialVelocityVector === VOID ? null : initialVelocityVector;
    this.f7i_1 = animationSpec;
    this.g7i_1 = typeConverter;
    this.h7i_1 = initialValue;
    this.i7i_1 = targetValue;
    this.j7i_1 = this.g7i_1.g7g()(this.h7i_1);
    this.k7i_1 = this.g7i_1.g7g()(this.i7i_1);
    var tmp = this;
    var tmp1_elvis_lhs = initialVelocityVector == null ? null : copy_1(initialVelocityVector);
    tmp.l7i_1 = tmp1_elvis_lhs == null ? newInstance(this.g7i_1.g7g()(this.h7i_1)) : tmp1_elvis_lhs;
    this.m7i_1 = this.f7i_1.o7i(this.j7i_1, this.k7i_1, this.l7i_1);
    this.n7i_1 = this.f7i_1.p7i(this.j7i_1, this.k7i_1, this.l7i_1);
  }
  protoOf(TargetBasedAnimation).q7i = function () {
    return this.g7i_1;
  };
  protoOf(TargetBasedAnimation).a7h = function () {
    return this.i7i_1;
  };
  protoOf(TargetBasedAnimation).r7i = function () {
    return this.f7i_1.r7i();
  };
  protoOf(TargetBasedAnimation).s7i = function (playTimeNanos) {
    var tmp;
    if (!this.u7i(playTimeNanos)) {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.animation.core.TargetBasedAnimation.getValueFromNanos.<anonymous>' call
      var it = this.f7i_1.t7i(playTimeNanos, this.j7i_1, this.k7i_1, this.l7i_1);
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
      tmp = this.g7i_1.i7g()(it);
    } else {
      tmp = this.i7i_1;
    }
    return tmp;
  };
  protoOf(TargetBasedAnimation).v7i = function () {
    return this.m7i_1;
  };
  protoOf(TargetBasedAnimation).w7i = function (playTimeNanos) {
    var tmp;
    if (!this.u7i(playTimeNanos)) {
      tmp = this.f7i_1.x7i(playTimeNanos, this.j7i_1, this.k7i_1, this.l7i_1);
    } else {
      tmp = this.n7i_1;
    }
    return tmp;
  };
  protoOf(TargetBasedAnimation).toString = function () {
    return 'TargetBasedAnimation: ' + this.h7i_1 + ' -> ' + this.i7i_1 + ',' + ('initial velocity: ' + this.l7i_1 + ', duration: ' + get_durationMillis(this).toString() + ' ms,') + ('animationSpec: ' + this.f7i_1);
  };
  function TargetBasedAnimation_0(animationSpec, typeConverter, initialValue, targetValue, initialVelocity) {
    return TargetBasedAnimation_init_$Create$(animationSpec, typeConverter, initialValue, targetValue, typeConverter.g7g()(initialVelocity));
  }
  function DecayAnimation_init_$Init$(animationSpec, typeConverter, initialValue, initialVelocityVector, $this) {
    DecayAnimation.call($this, animationSpec.e7i(typeConverter), typeConverter, initialValue, initialVelocityVector);
    return $this;
  }
  function DecayAnimation_init_$Create$(animationSpec, typeConverter, initialValue, initialVelocityVector) {
    return DecayAnimation_init_$Init$(animationSpec, typeConverter, initialValue, initialVelocityVector, objectCreate(protoOf(DecayAnimation)));
  }
  function DecayAnimation(animationSpec, typeConverter, initialValue, initialVelocityVector) {
    this.y7i_1 = animationSpec;
    this.z7i_1 = typeConverter;
    this.a7j_1 = initialValue;
    this.b7j_1 = this.z7i_1.g7g()(this.a7j_1);
    this.c7j_1 = copy_1(initialVelocityVector);
    this.e7j_1 = this.z7i_1.i7g()(this.y7i_1.h7j(this.b7j_1, initialVelocityVector));
    this.g7j_1 = false;
    this.f7j_1 = this.y7i_1.i7j(this.b7j_1, initialVelocityVector);
    this.d7j_1 = copy_1(this.y7i_1.j7j(this.f7j_1, this.b7j_1, initialVelocityVector));
    var inductionVariable = 0;
    var last = this.d7j_1.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.d7j_1.h7g(i, coerceIn(this.d7j_1.n(i), -this.y7i_1.k7j(), this.y7i_1.k7j()));
      }
       while (inductionVariable < last);
  }
  protoOf(DecayAnimation).q7i = function () {
    return this.z7i_1;
  };
  protoOf(DecayAnimation).a7h = function () {
    return this.e7j_1;
  };
  protoOf(DecayAnimation).v7i = function () {
    return this.f7j_1;
  };
  protoOf(DecayAnimation).r7i = function () {
    return this.g7j_1;
  };
  protoOf(DecayAnimation).s7i = function (playTimeNanos) {
    if (!this.u7i(playTimeNanos)) {
      return this.z7i_1.i7g()(this.y7i_1.l7j(playTimeNanos, this.b7j_1, this.c7j_1));
    } else {
      return this.e7j_1;
    }
  };
  protoOf(DecayAnimation).w7i = function (playTimeNanos) {
    if (!this.u7i(playTimeNanos)) {
      return this.y7i_1.j7j(playTimeNanos, this.b7j_1, this.c7j_1);
    } else {
      return this.d7j_1;
    }
  };
  function Animation() {
  }
  function get_durationMillis(_this__u8e3s4) {
    return _this__u8e3s4.v7i().v9(new Long(1000000, 0));
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
    this.m7j_1 = dampingRatio;
    this.n7j_1 = stiffness;
    this.o7j_1 = visibilityThreshold;
  }
  protoOf(SpringSpec).e7i = function (converter) {
    return VectorizedSpringSpec_init_$Create$(this.m7j_1, this.n7j_1, convert(converter, this.o7j_1));
  };
  protoOf(SpringSpec).equals = function (other) {
    var tmp;
    if (other instanceof SpringSpec) {
      tmp = (other.m7j_1 === this.m7j_1 ? other.n7j_1 === this.n7j_1 : false) ? equals(other.o7j_1, this.o7j_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(SpringSpec).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.o7j_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    return imul(imul(tmp$ret$0, 31) + getNumberHashCode(this.m7j_1) | 0, 31) + getNumberHashCode(this.n7j_1) | 0;
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
      return _this__u8e3s4.g7g()(data);
    }
  }
  function InfiniteRepeatableSpec(animation, repeatMode, initialStartOffset) {
    repeatMode = repeatMode === VOID ? RepeatMode_Restart_getInstance() : repeatMode;
    initialStartOffset = initialStartOffset === VOID ? _StartOffset___init__impl__615djw_0(0) : initialStartOffset;
    this.p7j_1 = animation;
    this.q7j_1 = repeatMode;
    this.r7j_1 = initialStartOffset;
  }
  protoOf(InfiniteRepeatableSpec).e7i = function (converter) {
    return new VectorizedInfiniteRepeatableSpec(this.p7j_1.e7i(converter), this.q7j_1, this.r7j_1);
  };
  protoOf(InfiniteRepeatableSpec).equals = function (other) {
    var tmp;
    if (other instanceof InfiniteRepeatableSpec) {
      tmp = (equals(other.p7j_1, this.p7j_1) ? other.q7j_1.equals(this.q7j_1) : false) ? equals(other.r7j_1, this.r7j_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(InfiniteRepeatableSpec).hashCode = function () {
    return imul(imul(hashCode(this.p7j_1), 31) + this.q7j_1.hashCode() | 0, 31) + StartOffset__hashCode_impl_ith3z7(this.r7j_1) | 0;
  };
  function infiniteRepeatable(animation, repeatMode, initialStartOffset) {
    repeatMode = repeatMode === VOID ? RepeatMode_Restart_getInstance() : repeatMode;
    initialStartOffset = initialStartOffset === VOID ? _StartOffset___init__impl__615djw_0(0) : initialStartOffset;
    return new InfiniteRepeatableSpec(animation, repeatMode, initialStartOffset);
  }
  function KeyframesSpecConfig() {
    KeyframesSpecBaseConfig.call(this);
  }
  protoOf(KeyframesSpecConfig).v7j = function (_this__u8e3s4, timeStamp) {
    // Inline function 'kotlin.also' call
    var this_0 = new KeyframeEntity(_this__u8e3s4);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.KeyframesSpecConfig.at.<anonymous>' call
    this.y7j_1.zk(timeStamp, this_0);
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
      tmp_0 = equals(other.a7k_1, this.a7k_1);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = equals(other.b7k_1, this.b7k_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(KeyframeEntity).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.a7k_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    return imul(tmp$ret$0, 31) + hashCode(this.b7k_1) | 0;
  };
  function KeyframesSpec(config) {
    this.d7k_1 = config;
  }
  protoOf(KeyframesSpec).e7i = function (converter) {
    // Inline function 'kotlin.collections.mutableMapOf' call
    var vectorizedKeyframes = LinkedHashMap_init_$Create$();
    // Inline function 'androidx.collection.IntObjectMap.forEach' call
    var this_0 = this.d7k_1.y7j_1;
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
                  var value = ((tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE()).c7k(converter.g7g());
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
    return new VectorizedKeyframesSpec(vectorizedKeyframes, this.d7k_1.w7j_1, this.d7k_1.x7j_1);
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
    this.e7k_1 = durationMillis;
    this.f7k_1 = delay;
    this.g7k_1 = easing;
  }
  protoOf(TweenSpec).e7i = function (converter) {
    return new VectorizedTweenSpec(this.e7k_1, this.f7k_1, this.g7k_1);
  };
  protoOf(TweenSpec).equals = function (other) {
    var tmp;
    if (other instanceof TweenSpec) {
      tmp = (other.e7k_1 === this.e7k_1 ? other.f7k_1 === this.f7k_1 : false) ? equals(other.g7k_1, this.g7k_1) : false;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(TweenSpec).hashCode = function () {
    return imul(imul(this.e7k_1, 31) + hashCode(this.g7k_1) | 0, 31) + this.f7k_1 | 0;
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
    offsetType = offsetType === VOID ? Companion_getInstance_8().h7k_1 : offsetType;
    return _StartOffset___init__impl__615djw(toLong(imul(offsetMillis, _StartOffsetType___get_value__impl__i1pfem(offsetType))));
  }
  function StartOffset__hashCode_impl_ith3z7($this) {
    return $this.hashCode();
  }
  function KeyframesSpecBaseConfig() {
    this.w7j_1 = 300;
    this.x7j_1 = 0;
    this.y7j_1 = mutableIntObjectMapOf();
  }
  protoOf(KeyframesSpecBaseConfig).z7j = function (_this__u8e3s4, easing) {
    _this__u8e3s4.b7k_1 = easing;
    return _this__u8e3s4;
  };
  function KeyframeBaseEntity(value, easing) {
    this.a7k_1 = value;
    this.b7k_1 = easing;
  }
  protoOf(KeyframeBaseEntity).c7k = function (convertToVector) {
    return to(convertToVector(this.a7k_1), this.b7k_1);
  };
  function AnimationConstants() {
    AnimationConstants_instance = this;
    this.j7k_1 = 300;
    this.k7k_1 = new Long(0, -2147483648);
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
    this.h7k_1 = _StartOffsetType___init__impl__g1ur7a(-1);
    this.i7k_1 = _StartOffsetType___init__impl__g1ur7a(1);
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
    this.w7f_1 = typeConverter;
    this.x7f_1 = mutableStateOf(initialValue);
    var tmp_1 = this;
    var tmp1_elvis_lhs = initialVelocityVector == null ? null : copy_1(initialVelocityVector);
    tmp_1.y7f_1 = tmp1_elvis_lhs == null ? createZeroVectorFrom(this.w7f_1, initialValue) : tmp1_elvis_lhs;
    this.z7f_1 = lastFrameTimeNanos;
    this.a7g_1 = finishedTimeNanos;
    this.b7g_1 = isRunning;
  }
  protoOf(AnimationState).g1d = function (_set____db54di) {
    var this_0 = this.x7f_1;
    value$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(AnimationState).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.x7f_1;
    value$factory_0();
    return this_0.s2();
  };
  protoOf(AnimationState).w7h = function () {
    return this.w7f_1.i7g()(this.y7f_1);
  };
  protoOf(AnimationState).toString = function () {
    return 'AnimationState(' + ('value=' + this.s2() + ', ') + ('velocity=' + this.w7h() + ', ') + ('isRunning=' + this.b7g_1 + ', ') + ('lastFrameTimeNanos=' + this.z7f_1.toString() + ', ') + ('finishedTimeNanos=' + this.a7g_1.toString()) + ')';
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
    velocity = velocity === VOID ? _this__u8e3s4.y7f_1.l7k_1 : velocity;
    lastFrameTimeNanos = lastFrameTimeNanos === VOID ? _this__u8e3s4.z7f_1 : lastFrameTimeNanos;
    finishedTimeNanos = finishedTimeNanos === VOID ? _this__u8e3s4.a7g_1 : finishedTimeNanos;
    isRunning = isRunning === VOID ? _this__u8e3s4.b7g_1 : isRunning;
    return new AnimationState(_this__u8e3s4.w7f_1, value, AnimationVector(velocity), lastFrameTimeNanos, finishedTimeNanos, isRunning);
  }
  function AnimationScope(initialValue, typeConverter, initialVelocityVector, lastFrameTimeNanos, targetValue, startTimeNanos, isRunning, onCancel) {
    this.n7f_1 = typeConverter;
    this.o7f_1 = targetValue;
    this.p7f_1 = startTimeNanos;
    this.q7f_1 = onCancel;
    this.r7f_1 = mutableStateOf(initialValue);
    this.s7f_1 = copy_1(initialVelocityVector);
    this.t7f_1 = lastFrameTimeNanos;
    var tmp = this;
    AnimationConstants_getInstance();
    tmp.u7f_1 = new Long(0, -2147483648);
    this.v7f_1 = mutableStateOf(isRunning);
  }
  protoOf(AnimationScope).g1d = function (_set____db54di) {
    var this_0 = this.r7f_1;
    value$factory_1();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(AnimationScope).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.r7f_1;
    value$factory_2();
    return this_0.s2();
  };
  protoOf(AnimationScope).n7k = function (_set____db54di) {
    var this_0 = this.v7f_1;
    isRunning$factory_1();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(AnimationScope).x7h = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.v7f_1;
    isRunning$factory_2();
    return this_0.s2();
  };
  protoOf(AnimationScope).w7h = function () {
    return this.n7f_1.i7g()(this.s7f_1);
  };
  protoOf(AnimationScope).c7g = function () {
    this.n7k(false);
    this.q7f_1();
  };
  function copy_0(_this__u8e3s4, value, velocityVector, lastFrameTimeNanos, finishedTimeNanos, isRunning) {
    value = value === VOID ? _this__u8e3s4.s2() : value;
    velocityVector = velocityVector === VOID ? copy_1(_this__u8e3s4.y7f_1) : velocityVector;
    lastFrameTimeNanos = lastFrameTimeNanos === VOID ? _this__u8e3s4.z7f_1 : lastFrameTimeNanos;
    finishedTimeNanos = finishedTimeNanos === VOID ? _this__u8e3s4.a7g_1 : finishedTimeNanos;
    isRunning = isRunning === VOID ? _this__u8e3s4.b7g_1 : isRunning;
    return new AnimationState(_this__u8e3s4.w7f_1, value, velocityVector, lastFrameTimeNanos, finishedTimeNanos, isRunning);
  }
  function createZeroVectorFrom(_this__u8e3s4, value) {
    // Inline function 'kotlin.also' call
    var this_0 = _this__u8e3s4.g7g()(value);
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
      return receiver.x7h();
    }, function (receiver, value) {
      return receiver.n7k(value);
    });
  }
  function isRunning$factory_2() {
    return getPropertyCallableRef('isRunning', 1, KMutableProperty1, function (receiver) {
      return receiver.x7h();
    }, function (receiver, value) {
      return receiver.n7k(value);
    });
  }
  function AnimationVector1D(initVal) {
    AnimationVector_3.call(this);
    this.l7k_1 = initVal;
    this.m7k_1 = 1;
  }
  protoOf(AnimationVector1D).v2b = function () {
    this.l7k_1 = 0.0;
  };
  protoOf(AnimationVector1D).o7k = function () {
    return new AnimationVector1D(0.0);
  };
  protoOf(AnimationVector1D).n = function (index) {
    if (index === 0) {
      return this.l7k_1;
    } else {
      return 0.0;
    }
  };
  protoOf(AnimationVector1D).h7g = function (index, value) {
    if (index === 0) {
      this.l7k_1 = value;
    }
  };
  protoOf(AnimationVector1D).m = function () {
    return this.m7k_1;
  };
  protoOf(AnimationVector1D).toString = function () {
    return 'AnimationVector1D: value = ' + this.l7k_1;
  };
  protoOf(AnimationVector1D).equals = function (other) {
    var tmp;
    if (other instanceof AnimationVector1D) {
      tmp = other.l7k_1 === this.l7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector1D).hashCode = function () {
    return getNumberHashCode(this.l7k_1);
  };
  function AnimationVector(v1) {
    return new AnimationVector1D(v1);
  }
  function AnimationVector2D(v1, v2) {
    AnimationVector_3.call(this);
    this.p7k_1 = v1;
    this.q7k_1 = v2;
    this.r7k_1 = 2;
  }
  protoOf(AnimationVector2D).v2b = function () {
    this.p7k_1 = 0.0;
    this.q7k_1 = 0.0;
  };
  protoOf(AnimationVector2D).o7k = function () {
    return new AnimationVector2D(0.0, 0.0);
  };
  protoOf(AnimationVector2D).n = function (index) {
    switch (index) {
      case 0:
        return this.p7k_1;
      case 1:
        return this.q7k_1;
      default:
        return 0.0;
    }
  };
  protoOf(AnimationVector2D).h7g = function (index, value) {
    if (index === 0)
      this.p7k_1 = value;
    else if (index === 1)
      this.q7k_1 = value;
  };
  protoOf(AnimationVector2D).m = function () {
    return this.r7k_1;
  };
  protoOf(AnimationVector2D).toString = function () {
    return 'AnimationVector2D: v1 = ' + this.p7k_1 + ', v2 = ' + this.q7k_1;
  };
  protoOf(AnimationVector2D).equals = function (other) {
    var tmp;
    var tmp_0;
    if (other instanceof AnimationVector2D) {
      tmp_0 = other.p7k_1 === this.p7k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.q7k_1 === this.q7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector2D).hashCode = function () {
    return imul(getNumberHashCode(this.p7k_1), 31) + getNumberHashCode(this.q7k_1) | 0;
  };
  function AnimationVector_0(v1, v2) {
    return new AnimationVector2D(v1, v2);
  }
  function AnimationVector3D(v1, v2, v3) {
    AnimationVector_3.call(this);
    this.s7k_1 = v1;
    this.t7k_1 = v2;
    this.u7k_1 = v3;
    this.v7k_1 = 3;
  }
  protoOf(AnimationVector3D).v2b = function () {
    this.s7k_1 = 0.0;
    this.t7k_1 = 0.0;
    this.u7k_1 = 0.0;
  };
  protoOf(AnimationVector3D).o7k = function () {
    return new AnimationVector3D(0.0, 0.0, 0.0);
  };
  protoOf(AnimationVector3D).n = function (index) {
    switch (index) {
      case 0:
        return this.s7k_1;
      case 1:
        return this.t7k_1;
      case 2:
        return this.u7k_1;
      default:
        return 0.0;
    }
  };
  protoOf(AnimationVector3D).h7g = function (index, value) {
    switch (index) {
      case 0:
        this.s7k_1 = value;
        break;
      case 1:
        this.t7k_1 = value;
        break;
      case 2:
        this.u7k_1 = value;
        break;
    }
  };
  protoOf(AnimationVector3D).m = function () {
    return this.v7k_1;
  };
  protoOf(AnimationVector3D).toString = function () {
    return 'AnimationVector3D: v1 = ' + this.s7k_1 + ', v2 = ' + this.t7k_1 + ', v3 = ' + this.u7k_1;
  };
  protoOf(AnimationVector3D).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    if (other instanceof AnimationVector3D) {
      tmp_1 = other.s7k_1 === this.s7k_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = other.t7k_1 === this.t7k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.u7k_1 === this.u7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector3D).hashCode = function () {
    return imul(imul(getNumberHashCode(this.s7k_1), 31) + getNumberHashCode(this.t7k_1) | 0, 31) + getNumberHashCode(this.u7k_1) | 0;
  };
  function AnimationVector_1(v1, v2, v3) {
    return new AnimationVector3D(v1, v2, v3);
  }
  function AnimationVector4D(v1, v2, v3, v4) {
    AnimationVector_3.call(this);
    this.w7k_1 = v1;
    this.x7k_1 = v2;
    this.y7k_1 = v3;
    this.z7k_1 = v4;
    this.a7l_1 = 4;
  }
  protoOf(AnimationVector4D).v2b = function () {
    this.w7k_1 = 0.0;
    this.x7k_1 = 0.0;
    this.y7k_1 = 0.0;
    this.z7k_1 = 0.0;
  };
  protoOf(AnimationVector4D).o7k = function () {
    return new AnimationVector4D(0.0, 0.0, 0.0, 0.0);
  };
  protoOf(AnimationVector4D).n = function (index) {
    switch (index) {
      case 0:
        return this.w7k_1;
      case 1:
        return this.x7k_1;
      case 2:
        return this.y7k_1;
      case 3:
        return this.z7k_1;
      default:
        return 0.0;
    }
  };
  protoOf(AnimationVector4D).h7g = function (index, value) {
    switch (index) {
      case 0:
        this.w7k_1 = value;
        break;
      case 1:
        this.x7k_1 = value;
        break;
      case 2:
        this.y7k_1 = value;
        break;
      case 3:
        this.z7k_1 = value;
        break;
    }
  };
  protoOf(AnimationVector4D).m = function () {
    return this.a7l_1;
  };
  protoOf(AnimationVector4D).toString = function () {
    return 'AnimationVector4D: v1 = ' + this.w7k_1 + ', v2 = ' + this.x7k_1 + ', v3 = ' + this.y7k_1 + ', v4 = ' + this.z7k_1;
  };
  protoOf(AnimationVector4D).equals = function (other) {
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    if (other instanceof AnimationVector4D) {
      tmp_2 = other.w7k_1 === this.w7k_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = other.x7k_1 === this.x7k_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = other.y7k_1 === this.y7k_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = other.z7k_1 === this.z7k_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(AnimationVector4D).hashCode = function () {
    return imul(imul(imul(getNumberHashCode(this.w7k_1), 31) + getNumberHashCode(this.x7k_1) | 0, 31) + getNumberHashCode(this.y7k_1) | 0, 31) + getNumberHashCode(this.z7k_1) | 0;
  };
  function AnimationVector_2(v1, v2, v3, v4) {
    return new AnimationVector4D(v1, v2, v3, v4);
  }
  function AnimationVector_3() {
  }
  function newInstance(_this__u8e3s4) {
    var tmp = _this__u8e3s4.o7k();
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
        newVector.h7g(i, _this__u8e3s4.n(i));
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
        _this__u8e3s4.h7g(i, source.n(i));
      }
       while (inductionVariable < last);
  }
  function ComplexDouble(_real, _imaginary) {
    this.b7l_1 = _real;
    this.c7l_1 = _imaginary;
  }
  protoOf(ComplexDouble).d7l = function () {
    return this.b7l_1;
  };
  protoOf(ComplexDouble).e7l = function () {
    return this.c7l_1;
  };
  protoOf(ComplexDouble).toString = function () {
    return 'ComplexDouble(_real=' + this.b7l_1 + ', _imaginary=' + this.c7l_1 + ')';
  };
  protoOf(ComplexDouble).hashCode = function () {
    var result = getNumberHashCode(this.b7l_1);
    result = imul(result, 31) + getNumberHashCode(this.c7l_1) | 0;
    return result;
  };
  protoOf(ComplexDouble).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComplexDouble))
      return false;
    var tmp0_other_with_cast = other instanceof ComplexDouble ? other : THROW_CCE();
    if (!equals(this.b7l_1, tmp0_other_with_cast.b7l_1))
      return false;
    if (!equals(this.c7l_1, tmp0_other_with_cast.c7l_1))
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
    this.f7l_1 = floatDecaySpec;
  }
  protoOf(DecayAnimationSpecImpl).e7i = function (typeConverter) {
    return new VectorizedFloatDecaySpec(this.f7l_1);
  };
  function _get_valueVector__r10idf($this) {
    var tmp = $this.h7l_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('valueVector');
    }
  }
  function _get_velocityVector__dvxlkl($this) {
    var tmp = $this.i7l_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('velocityVector');
    }
  }
  function _get_targetVector__vn6c89($this) {
    var tmp = $this.j7l_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('targetVector');
    }
  }
  function VectorizedFloatDecaySpec(floatDecaySpec) {
    this.g7l_1 = floatDecaySpec;
    this.k7l_1 = this.g7l_1.k7j();
  }
  protoOf(VectorizedFloatDecaySpec).k7j = function () {
    return this.k7l_1;
  };
  protoOf(VectorizedFloatDecaySpec).l7j = function (playTimeNanos, initialValue, initialVelocity) {
    if (!!(this.h7l_1 == null)) {
      this.h7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_valueVector__r10idf(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_valueVector__r10idf(this).h7g(i, this.g7l_1.l7l(playTimeNanos, initialValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_valueVector__r10idf(this);
  };
  protoOf(VectorizedFloatDecaySpec).i7j = function (initialValue, initialVelocity) {
    var maxDuration = new Long(0, 0);
    if (!!(this.i7l_1 == null)) {
      this.i7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_velocityVector__dvxlkl(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.comparisons.maxOf' call
        var a = maxDuration;
        var b = this.g7l_1.m7l(initialValue.n(i), initialVelocity.n(i));
        maxDuration = a.z6(b) >= 0 ? a : b;
      }
       while (inductionVariable < last);
    return maxDuration;
  };
  protoOf(VectorizedFloatDecaySpec).j7j = function (playTimeNanos, initialValue, initialVelocity) {
    if (!!(this.i7l_1 == null)) {
      this.i7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_velocityVector__dvxlkl(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_velocityVector__dvxlkl(this).h7g(i, this.g7l_1.n7l(playTimeNanos, initialValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_velocityVector__dvxlkl(this);
  };
  protoOf(VectorizedFloatDecaySpec).h7j = function (initialValue, initialVelocity) {
    if (!!(this.j7l_1 == null)) {
      this.j7l_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_targetVector__vn6c89(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_targetVector__vn6c89(this).h7g(i, this.g7l_1.o7l(initialValue.n(i), initialVelocity.n(i)));
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
    this.p7l_1 = a;
    this.q7l_1 = b;
    this.r7l_1 = c;
    this.s7l_1 = d;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(((!isNaN_0(this.p7l_1) ? !isNaN_0(this.q7l_1) : false) ? !isNaN_0(this.r7l_1) : false) ? !isNaN_0(this.s7l_1) : false)) {
      // Inline function 'androidx.compose.animation.core.CubicBezierEasing.<anonymous>' call
      var message = 'Parameters to CubicBezierEasing cannot be NaN. Actual parameters are: ' + this.p7l_1 + ', ' + this.q7l_1 + ', ' + this.r7l_1 + ', ' + this.s7l_1 + '.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(CubicBezierEasing).t7l = function (fraction) {
    if (fraction > 0.0 ? fraction < 1.0 : false) {
      var start = 0.0;
      var end = 1.0;
      while (true) {
        var midpoint = (start + end) / 2;
        var estimate = evaluateCubic(this, this.p7l_1, this.r7l_1, midpoint);
        // Inline function 'kotlin.math.absoluteValue' call
        var this_0 = fraction - estimate;
        if (Math.abs(this_0) < 0.001)
          return evaluateCubic(this, this.q7l_1, this.s7l_1, midpoint);
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
      tmp_2 = this.p7l_1 === other.p7l_1;
    } else {
      tmp_2 = false;
    }
    if (tmp_2) {
      tmp_1 = this.q7l_1 === other.q7l_1;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = this.r7l_1 === other.r7l_1;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = this.s7l_1 === other.s7l_1;
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(CubicBezierEasing).hashCode = function () {
    return imul(imul(imul(getNumberHashCode(this.p7l_1), 31) + getNumberHashCode(this.q7l_1) | 0, 31) + getNumberHashCode(this.r7l_1) | 0, 31) + getNumberHashCode(this.s7l_1) | 0;
  };
  function sam$androidx_compose_animation_core_Easing$0(function_0) {
    this.u7l_1 = function_0;
  }
  protoOf(sam$androidx_compose_animation_core_Easing$0).t7l = function (fraction) {
    return this.u7l_1(fraction);
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
    this.a7m_1 = dampingRatio;
    this.b7m_1 = stiffness;
    this.c7m_1 = visibilityThreshold;
    var tmp_2 = this;
    // Inline function 'kotlin.also' call
    var this_0 = new SpringSimulation(1.0);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.animation.core.FloatSpringSpec.spring.<anonymous>' call
    this_0.l7m(this.a7m_1);
    this_0.m7m(this.b7m_1);
    tmp_2.d7m_1 = this_0;
  }
  protoOf(FloatSpringSpec).v7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    this.d7m_1.e7m_1 = targetValue;
    var value = _Motion___get_value__impl__e0x31d(this.d7m_1.n7m(initialValue, initialVelocity, playTimeMillis));
    return value;
  };
  protoOf(FloatSpringSpec).w7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    this.d7m_1.e7m_1 = targetValue;
    var velocity = _Motion___get_velocity__impl__h2mglt(this.d7m_1.n7m(initialValue, initialVelocity, playTimeMillis));
    return velocity;
  };
  protoOf(FloatSpringSpec).x7l = function (initialValue, targetValue, initialVelocity) {
    return 0.0;
  };
  protoOf(FloatSpringSpec).y7l = function (initialValue, targetValue, initialVelocity) {
    var tmp0_stiffness = this.d7m_1.o7m();
    var tmp1_dampingRatio = this.d7m_1.k7m_1;
    var tmp2_initialDisplacement = (initialValue - targetValue) / this.c7m_1;
    var tmp3_initialVelocity = initialVelocity / this.c7m_1;
    return estimateAnimationDurationMillis(tmp0_stiffness, tmp1_dampingRatio, tmp3_initialVelocity, tmp2_initialDisplacement, 1.0).w9(get_MillisToNanos());
  };
  protoOf(FloatSpringSpec).e7i = function (converter) {
    return this.z7l(converter);
  };
  function clampPlayTime($this, playTime) {
    // Inline function 'kotlin.Long.minus' call
    var other = $this.q7m_1;
    var tmp$ret$0 = playTime.fb(toLong(other));
    return coerceIn_0(tmp$ret$0, new Long(0, 0), toLong($this.p7m_1));
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
    this.p7m_1 = duration;
    this.q7m_1 = delay;
    this.r7m_1 = easing;
  }
  protoOf(FloatTweenSpec).v7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime(this, playTimeMillis);
    var tmp;
    if (this.p7m_1 === 0) {
      tmp = 1.0;
    } else {
      // Inline function 'kotlin.Long.div' call
      var other = this.p7m_1;
      tmp = clampedPlayTime.sb() / other;
    }
    var rawFraction = tmp;
    var fraction = this.r7m_1.t7l(coerceIn(rawFraction, 0.0, 1.0));
    return lerp(initialValue, targetValue, fraction);
  };
  protoOf(FloatTweenSpec).y7l = function (initialValue, targetValue, initialVelocity) {
    return numberToLong(this.q7m_1 + this.p7m_1 | 0).w9(get_MillisToNanos());
  };
  protoOf(FloatTweenSpec).w7l = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime(this, playTimeMillis);
    if (clampedPlayTime.z6(new Long(0, 0)) < 0) {
      return 0.0;
    } else if (clampedPlayTime.equals(new Long(0, 0))) {
      return initialVelocity;
    }
    // Inline function 'kotlin.Long.minus' call
    var tmp$ret$0 = clampedPlayTime.fb(toLong(1));
    var startNum = this.v7l(tmp$ret$0.w9(get_MillisToNanos()), initialValue, targetValue, initialVelocity);
    var endNum = this.v7l(clampedPlayTime.w9(get_MillisToNanos()), initialValue, targetValue, initialVelocity);
    return (endNum - startNum) * 1000.0;
  };
  protoOf(FloatTweenSpec).e7i = function (converter) {
    return this.z7l(converter);
  };
  function withInfiniteAnimationFrameNanos(onFrame, $completion) {
    var tmp = new $withInfiniteAnimationFrameNanosCOROUTINE$0(onFrame, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function withInfiniteAnimationFrameNanos$slambda($onFrame, resultContinuation) {
    this.l7n_1 = $onFrame;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(withInfiniteAnimationFrameNanos$slambda).o4h = function ($completion) {
    var tmp = this.n4h($completion);
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
            suspendResult = withFrameNanos(this.l7n_1, this);
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
  protoOf(withInfiniteAnimationFrameNanos$slambda).n4h = function (completion) {
    return new withInfiniteAnimationFrameNanos$slambda(this.l7n_1, completion);
  };
  function withInfiniteAnimationFrameNanos$slambda_0($onFrame, resultContinuation) {
    var i = new withInfiniteAnimationFrameNanos$slambda($onFrame, resultContinuation);
    var l = function ($completion) {
      return i.o4h($completion);
    };
    l.$arity = 0;
    return l;
  }
  function $withInfiniteAnimationFrameNanosCOROUTINE$0(onFrame, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.a7n_1 = onFrame;
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
            tmp_0.b7n_1 = this.t6().hc(Key_instance);
            if (this.b7n_1 == null) {
              this.ac_1 = 2;
              suspendResult = withFrameNanos(this.a7n_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 1;
              suspendResult = this.b7n_1.m7n(withInfiniteAnimationFrameNanos$slambda_0(this.a7n_1, null), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            this.c7n_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.c7n_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.c7n_1;
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
      var tmp_1 = this$0.q7n_1;
      AnimationConstants_getInstance();
      if (tmp_1.equals(new Long(0, -2147483648))) {
        tmp_0 = true;
      } else {
        tmp_0 = !($durationScale._v === get_durationScale($this_LaunchedEffect.jo()));
      }
      if (tmp_0) {
        this$0.q7n_1 = it;
        // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
        var this_0 = this$0.o7n_1;
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
        var this_1 = this$0.o7n_1;
        // Inline function 'kotlin.contracts.contract' call
        var size_0 = this_1.t1v_1;
        var tmp_4;
        if (size_0 > 0) {
          var i_0 = 0;
          var tmp_5 = this_1.r1v_1;
          var content_0 = isArray(tmp_5) ? tmp_5 : THROW_CCE();
          do {
            // Inline function 'androidx.compose.animation.core.InfiniteTransition.run.<anonymous>.<anonymous>.<anonymous>' call
            content_0[i_0].d7o();
            i_0 = i_0 + 1 | 0;
          }
           while (i_0 < size_0);
          tmp_4 = Unit_instance;
        }
        tmp_3 = tmp_4;
      } else {
        // Inline function 'kotlin.Long.div' call
        var this_2 = currentTimeNanos.fb(this$0.q7n_1);
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
  protoOf(InfiniteTransition$run$slambda$slambda).n7o = function (it, $completion) {
    var tmp = this.o7o(it, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(InfiniteTransition$run$slambda$slambda).yc = function (p1, $completion) {
    return this.n7o((!(p1 == null) ? typeof p1 === 'number' : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(InfiniteTransition$run$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          return this.m7o_1 > 0.0;
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(InfiniteTransition$run$slambda$slambda).o7o = function (it, completion) {
    var i = new InfiniteTransition$run$slambda$slambda(completion);
    i.m7o_1 = it;
    return i;
  };
  function InfiniteTransition$run$slambda$slambda_0(resultContinuation) {
    var i = new InfiniteTransition$run$slambda$slambda(resultContinuation);
    var l = function (it, $completion) {
      return i.n7o(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function TransitionAnimationState($outer, initialValue, targetValue, typeConverter, animationSpec, label) {
    this.c7o_1 = $outer;
    this.s7n_1 = initialValue;
    this.t7n_1 = targetValue;
    this.u7n_1 = typeConverter;
    this.v7n_1 = label;
    this.w7n_1 = mutableStateOf(this.s7n_1);
    this.x7n_1 = animationSpec;
    this.y7n_1 = TargetBasedAnimation_init_$Create$(this.x7n_1, this.u7n_1, this.s7n_1, this.t7n_1);
    this.z7n_1 = false;
    this.a7o_1 = false;
    this.b7o_1 = new Long(0, 0);
  }
  protoOf(TransitionAnimationState).g1d = function (_set____db54di) {
    var this_0 = this.w7n_1;
    value$factory_3();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  };
  protoOf(TransitionAnimationState).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.w7n_1;
    value$factory_4();
    return this_0.s2();
  };
  protoOf(TransitionAnimationState).p7o = function (initialValue, targetValue, animationSpec) {
    this.s7n_1 = initialValue;
    this.t7n_1 = targetValue;
    this.x7n_1 = animationSpec;
    this.y7n_1 = TargetBasedAnimation_init_$Create$(animationSpec, this.u7n_1, initialValue, targetValue);
    _set_refreshChildNeeded__4sbmm9(this.c7o_1, true);
    this.z7n_1 = false;
    this.a7o_1 = true;
  };
  protoOf(TransitionAnimationState).q7o = function (playTimeNanos) {
    _set_refreshChildNeeded__4sbmm9(this.c7o_1, false);
    if (this.a7o_1) {
      this.a7o_1 = false;
      this.b7o_1 = playTimeNanos;
    }
    var playTime = playTimeNanos.fb(this.b7o_1);
    this.g1d(this.y7n_1.s7i(playTime));
    this.z7n_1 = this.y7n_1.u7i(playTime);
  };
  protoOf(TransitionAnimationState).d7o = function () {
    this.g1d(this.y7n_1.i7i_1);
    this.a7o_1 = true;
  };
  protoOf(TransitionAnimationState).v2b = function () {
    this.a7o_1 = true;
  };
  function _set_refreshChildNeeded__4sbmm9($this, _set____db54di) {
    var this_0 = $this.p7n_1;
    refreshChildNeeded$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_refreshChildNeeded__t5joi3($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.p7n_1;
    refreshChildNeeded$factory_0();
    return this_0.s2();
  }
  function _set_isRunning__kpbg34_0($this, _set____db54di) {
    var this_0 = $this.r7n_1;
    isRunning$factory_3();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_isRunning__l0y5hg($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.r7n_1;
    isRunning$factory_4();
    return this_0.s2();
  }
  function onFrame($this, playTimeNanos) {
    var allFinished = true;
    // Inline function 'androidx.compose.runtime.collection.MutableVector.forEach' call
    var this_0 = $this.o7n_1;
    // Inline function 'kotlin.contracts.contract' call
    var size = this_0.t1v_1;
    if (size > 0) {
      var i = 0;
      var tmp = this_0.r1v_1;
      var content = isArray(tmp) ? tmp : THROW_CCE();
      do {
        // Inline function 'androidx.compose.animation.core.InfiniteTransition.onFrame.<anonymous>' call
        var it = content[i];
        if (!it.z7n_1) {
          it.q7o(playTimeNanos);
        }
        if (!it.z7n_1) {
          allFinished = false;
        }
        i = i + 1 | 0;
      }
       while (i < size);
    }
    _set_isRunning__kpbg34_0($this, !allFinished);
  }
  function InfiniteTransition$run$slambda($toolingOverride, this$0, resultContinuation) {
    this.z7o_1 = $toolingOverride;
    this.a7p_1 = this$0;
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
            this.c7p_1 = {_v: 1.0};
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!true) {
              this.ac_1 = 6;
              continue $sm;
            }

            this.ac_1 = 2;
            suspendResult = withInfiniteAnimationFrameNanos(InfiniteTransition$run$slambda$lambda(this.z7o_1, this.a7p_1, this.c7p_1, this.b7p_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            if (this.c7p_1._v === 0.0) {
              this.ac_1 = 3;
              var tmp_0 = snapshotFlow(InfiniteTransition$run$slambda$lambda_0(this.b7p_1));
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
    var i = new InfiniteTransition$run$slambda(this.z7o_1, this.a7p_1, completion);
    i.b7p_1 = $this$LaunchedEffect;
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
      $tmp1_rcvr.d7p($composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  function InfiniteTransition(label) {
    this.n7n_1 = label;
    var tmp = this;
    // Inline function 'androidx.compose.runtime.collection.mutableVectorOf' call
    // Inline function 'androidx.compose.runtime.collection.MutableVector' call
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp$ret$0 = fillArrayVal(Array(16), null);
    tmp.o7n_1 = new MutableVector(tmp$ret$0, 0);
    this.p7n_1 = mutableStateOf(false);
    var tmp_0 = this;
    AnimationConstants_getInstance();
    tmp_0.q7n_1 = new Long(0, -2147483648);
    this.r7n_1 = mutableStateOf(true);
  }
  protoOf(InfiniteTransition).e7p = function (animation) {
    this.o7n_1.u1v(animation);
    _set_refreshChildNeeded__4sbmm9(this, true);
  };
  protoOf(InfiniteTransition).f7p = function (animation) {
    this.o7n_1.m2l(animation);
  };
  protoOf(InfiniteTransition).d7p = function ($composer, $changed) {
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
    infiniteTransition.d7p($composer_0, 8);
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
      if (!equals($initialValue, $transitionAnimation.s7n_1) ? true : !equals($targetValue, $transitionAnimation.t7n_1)) {
        $transitionAnimation.p7o($initialValue, $targetValue, $animationSpec);
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function _no_name_provided__qut3iv($this_animateValue, $transitionAnimation) {
    this.g7p_1 = $this_animateValue;
    this.h7p_1 = $transitionAnimation;
  }
  protoOf(_no_name_provided__qut3iv).or = function () {
    // Inline function 'androidx.compose.animation.core.animateValue.<anonymous>.<anonymous>' call
    this.g7p_1.f7p(this.h7p_1);
  };
  function animateValue$lambda_0($this_animateValue, $transitionAnimation) {
    return function ($this$DisposableEffect) {
      $this_animateValue.e7p($transitionAnimation);
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
    this.i7p_1 = priority;
    this.j7p_1 = job;
  }
  protoOf(Mutator).k7p = function (other) {
    return this.i7p_1.u9(other.i7p_1) >= 0;
  };
  protoOf(Mutator).l7p = function () {
    return this.j7p_1.sp(new MutationInterruptedException());
  };
  function tryMutateOrCancel($this, mutator) {
    $l$loop: while (true) {
      var oldMutator = $this.d7g_1.zu();
      if (oldMutator == null ? true : mutator.k7p(oldMutator)) {
        if ($this.d7g_1.f23(oldMutator, mutator)) {
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
  function MutatorMutex$mutate$slambda($priority, this$0, $block, resultContinuation) {
    this.v7p_1 = $priority;
    this.w7p_1 = this$0;
    this.x7p_1 = $block;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(MutatorMutex$mutate$slambda).e7q = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(MutatorMutex$mutate$slambda).yc = function (p1, $completion) {
    return this.e7q((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(MutatorMutex$mutate$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 9;
            this.z7p_1 = new Mutator(this.v7p_1, ensureNotNull(this.y7p_1.jo().hc(Key_instance_0)));
            tryMutateOrCancel(this.w7p_1, this.z7p_1);
            var tmp_0 = this;
            tmp_0.a7q_1 = this.w7p_1.e7g_1;
            var tmp_1 = this;
            tmp_1.b7q_1 = null;
            this.ac_1 = 1;
            suspendResult = this.a7q_1.v1g(this.b7q_1, this);
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
            suspendResult = this.x7p_1(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.d7q_1 = suspendResult;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            var tmp_2 = this.d7q_1;
            this.bc_1 = 8;
            this.w7p_1.d7g_1.f23(this.z7p_1, null);
            this.c7q_1 = tmp_2;
            this.bc_1 = 9;
            this.ac_1 = 6;
            continue $sm;
          case 6:
            var tmp_3 = this.c7q_1;
            this.bc_1 = 9;
            this.a7q_1.x1g(this.b7q_1);
            return tmp_3;
          case 7:
            this.bc_1 = 8;
            var t = this.dc_1;
            this.w7p_1.d7g_1.f23(this.z7p_1, null);
            throw t;
          case 8:
            this.bc_1 = 9;
            var t_0 = this.dc_1;
            this.a7q_1.x1g(this.b7q_1);
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
    var i = new MutatorMutex$mutate$slambda(this.v7p_1, this.w7p_1, this.x7p_1, completion);
    i.y7p_1 = $this$coroutineScope;
    return i;
  };
  function MutatorMutex$mutate$slambda_0($priority, this$0, $block, resultContinuation) {
    var i = new MutatorMutex$mutate$slambda($priority, this$0, $block, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.e7q($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function MutatorMutex() {
    this.d7g_1 = new AtomicReference(null);
    this.e7g_1 = Mutex();
  }
  protoOf(MutatorMutex).f7q = function (priority, block, $completion) {
    return coroutineScope(MutatorMutex$mutate$slambda_0(priority, this, block, null), $completion);
  };
  protoOf(MutatorMutex).f7g = function (priority, block, $completion, $super) {
    priority = priority === VOID ? MutatePriority_Default_getInstance() : priority;
    return $super === VOID ? this.f7q(priority, block, $completion) : $super.f7q.call(this, priority, block, $completion);
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
    this_1.b7l_1 = this_1.b7l_1 + this_0;
    this_1.b7l_1 = this_1.b7l_1 * 0.5;
    this_1.c7l_1 = this_1.c7l_1 * 0.5;
    var firstRoot = this_1;
    // Inline function 'androidx.compose.animation.core.ComplexDouble.times' call
    // Inline function 'androidx.compose.animation.core.minus' call
    var this_2 = -dampingCoefficient;
    // Inline function 'androidx.compose.animation.core.plus' call
    // Inline function 'androidx.compose.animation.core.ComplexDouble.unaryMinus' call
    var this_3 = complexSqrt(partialRoot);
    this_3.b7l_1 = this_3.b7l_1 * -1;
    this_3.c7l_1 = this_3.c7l_1 * -1;
    // Inline function 'androidx.compose.animation.core.ComplexDouble.plus' call
    this_3.b7l_1 = this_3.b7l_1 + this_2;
    this_3.b7l_1 = this_3.b7l_1 * 0.5;
    this_3.c7l_1 = this_3.c7l_1 * 0.5;
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
    var r1 = firstRoot.d7l();
    var r2 = secondRoot.d7l();
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
    var r = firstRoot.d7l();
    var c1 = p0;
    var c2 = (v0 - r * c1) / firstRoot.e7l();
    // Inline function 'kotlin.math.sqrt' call
    var x = c1 * c1 + c2 * c2;
    var c = Math.sqrt(x);
    // Inline function 'kotlin.math.ln' call
    var x_0 = delta / c;
    return Math.log(x_0) / r;
  }
  function estimateCriticallyDamped(firstRoot, p0, v0, delta) {
    var r = firstRoot.d7l();
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
    if ($this.g7m_1) {
      return Unit_instance;
    }
    if ($this.e7m_1 === UNSET) {
      throw IllegalStateException_init_$Create$('Error: Final position of the spring must be set before the animation starts');
    }
    var dampingRatioSquared = $this.k7m_1 * $this.k7m_1;
    if ($this.k7m_1 > 1.0) {
      var tmp = $this;
      var tmp_0 = -$this.k7m_1 * $this.f7m_1;
      var tmp_1 = $this.f7m_1;
      // Inline function 'kotlin.math.sqrt' call
      var x = dampingRatioSquared - 1;
      tmp.h7m_1 = tmp_0 + tmp_1 * Math.sqrt(x);
      var tmp_2 = $this;
      var tmp_3 = -$this.k7m_1 * $this.f7m_1;
      var tmp_4 = $this.f7m_1;
      // Inline function 'kotlin.math.sqrt' call
      var x_0 = dampingRatioSquared - 1;
      tmp_2.i7m_1 = tmp_3 - tmp_4 * Math.sqrt(x_0);
    } else if ($this.k7m_1 >= 0.0 ? $this.k7m_1 < 1.0 : false) {
      var tmp_5 = $this;
      var tmp_6 = $this.f7m_1;
      // Inline function 'kotlin.math.sqrt' call
      var x_1 = 1 - dampingRatioSquared;
      tmp_5.j7m_1 = tmp_6 * Math.sqrt(x_1);
    }
    $this.g7m_1 = true;
  }
  function SpringSimulation(finalPosition) {
    this.e7m_1 = finalPosition;
    var tmp = this;
    // Inline function 'kotlin.math.sqrt' call
    tmp.f7m_1 = Math.sqrt(50.0);
    this.g7m_1 = false;
    this.h7m_1 = 0.0;
    this.i7m_1 = 0.0;
    this.j7m_1 = 0.0;
    var tmp_0 = this;
    tmp_0.k7m_1 = 1.0;
  }
  protoOf(SpringSimulation).m7m = function (value) {
    if (this.o7m() <= 0.0) {
      throw IllegalArgumentException_init_$Create$('Spring stiffness constant must be positive.');
    }
    var tmp = this;
    // Inline function 'kotlin.math.sqrt' call
    tmp.f7m_1 = Math.sqrt(value);
    this.g7m_1 = false;
  };
  protoOf(SpringSimulation).o7m = function () {
    return this.f7m_1 * this.f7m_1;
  };
  protoOf(SpringSimulation).l7m = function (value) {
    if (value < 0.0) {
      throw IllegalArgumentException_init_$Create$('Damping ratio must be non-negative');
    }
    this.k7m_1 = value;
    this.g7m_1 = false;
  };
  protoOf(SpringSimulation).n7m = function (lastDisplacement, lastVelocity, timeElapsed) {
    init(this);
    var adjustedDisplacement = lastDisplacement - this.e7m_1;
    // Inline function 'kotlin.Long.div' call
    var deltaT = timeElapsed.a7() / 1000.0;
    var displacement;
    var currentVelocity;
    if (this.k7m_1 > 1.0) {
      var coeffA = adjustedDisplacement - (this.i7m_1 * adjustedDisplacement - lastVelocity) / (this.i7m_1 - this.h7m_1);
      var coeffB = (this.i7m_1 * adjustedDisplacement - lastVelocity) / (this.i7m_1 - this.h7m_1);
      // Inline function 'kotlin.math.exp' call
      var x = this.i7m_1 * deltaT;
      var tmp = coeffA * Math.exp(x);
      // Inline function 'kotlin.math.exp' call
      var x_0 = this.h7m_1 * deltaT;
      displacement = tmp + coeffB * Math.exp(x_0);
      var tmp_0 = coeffA * this.i7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_1 = this.i7m_1 * deltaT;
      var tmp_1 = tmp_0 * Math.exp(x_1);
      var tmp_2 = coeffB * this.h7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_2 = this.h7m_1 * deltaT;
      currentVelocity = tmp_1 + tmp_2 * Math.exp(x_2);
    } else if (this.k7m_1 === 1.0) {
      var coeffA_0 = adjustedDisplacement;
      var coeffB_0 = lastVelocity + this.f7m_1 * adjustedDisplacement;
      var tmp_3 = coeffA_0 + coeffB_0 * deltaT;
      // Inline function 'kotlin.math.exp' call
      var x_3 = -this.f7m_1 * deltaT;
      displacement = tmp_3 * Math.exp(x_3);
      var tmp_4 = coeffA_0 + coeffB_0 * deltaT;
      // Inline function 'kotlin.math.exp' call
      var x_4 = -this.f7m_1 * deltaT;
      var tmp_5 = tmp_4 * Math.exp(x_4) * -this.f7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_5 = -this.f7m_1 * deltaT;
      currentVelocity = tmp_5 + coeffB_0 * Math.exp(x_5);
    } else {
      var cosCoeff = adjustedDisplacement;
      var sinCoeff = 1 / this.j7m_1 * (this.k7m_1 * this.f7m_1 * adjustedDisplacement + lastVelocity);
      // Inline function 'kotlin.math.exp' call
      var x_6 = -this.k7m_1 * this.f7m_1 * deltaT;
      var tmp_6 = Math.exp(x_6);
      // Inline function 'kotlin.math.cos' call
      var x_7 = this.j7m_1 * deltaT;
      var tmp_7 = cosCoeff * Math.cos(x_7);
      // Inline function 'kotlin.math.sin' call
      var x_8 = this.j7m_1 * deltaT;
      displacement = tmp_6 * (tmp_7 + sinCoeff * Math.sin(x_8));
      var tmp_8 = displacement * -this.f7m_1 * this.k7m_1;
      // Inline function 'kotlin.math.exp' call
      var x_9 = -this.k7m_1 * this.f7m_1 * deltaT;
      var tmp_9 = Math.exp(x_9);
      var tmp_10 = -this.j7m_1 * cosCoeff;
      // Inline function 'kotlin.math.sin' call
      var x_10 = this.j7m_1 * deltaT;
      var tmp_11 = tmp_10 * Math.sin(x_10);
      var tmp_12 = this.j7m_1 * sinCoeff;
      // Inline function 'kotlin.math.cos' call
      var x_11 = this.j7m_1 * deltaT;
      currentVelocity = tmp_8 + tmp_9 * (tmp_11 + tmp_12 * Math.cos(x_11));
    }
    var newValue = displacement + this.e7m_1;
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
    var tmp1_typeConverter = _this__u8e3s4.w7f_1;
    var tmp2_initialVelocityVector = _this__u8e3s4.y7f_1;
    var anim = TargetBasedAnimation_init_$Create$(animationSpec, tmp1_typeConverter, tmp0_initialValue, targetValue, tmp2_initialVelocityVector);
    var tmp_0;
    if (sequentialAnimation) {
      tmp_0 = _this__u8e3s4.z7f_1;
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
    copyFrom(state.y7f_1, _this__u8e3s4.s7f_1);
    state.a7g_1 = _this__u8e3s4.u7f_1;
    state.z7f_1 = _this__u8e3s4.t7f_1;
    state.b7g_1 = _this__u8e3s4.x7h();
  }
  function get_durationScale(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.hc(Key_instance_1);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.y4u();
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
      tmp = anim.v7i();
    } else {
      // Inline function 'kotlin.Long.div' call
      var tmp$ret$0 = frameTimeNanos.fb(_this__u8e3s4.p7f_1).sb() / durationScale;
      tmp = numberToLong(tmp$ret$0);
    }
    var playTimeNanos = tmp;
    doAnimationFrame(_this__u8e3s4, frameTimeNanos, playTimeNanos, anim, state, block);
  }
  function doAnimationFrame(_this__u8e3s4, frameTimeNanos, playTimeNanos, anim, state, block) {
    _this__u8e3s4.t7f_1 = frameTimeNanos;
    _this__u8e3s4.g1d(anim.s7i(playTimeNanos));
    _this__u8e3s4.s7f_1 = anim.w7i(playTimeNanos);
    var isLastFrame = anim.u7i(playTimeNanos);
    if (isLastFrame) {
      _this__u8e3s4.u7f_1 = _this__u8e3s4.t7f_1;
      _this__u8e3s4.n7k(false);
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
    var tmp1_initialVelocityVector = _this__u8e3s4.y7f_1;
    var tmp2_typeConverter = _this__u8e3s4.w7f_1;
    var anim = DecayAnimation_init_$Create$(animationSpec, tmp2_typeConverter, tmp0_initialValue, tmp1_initialVelocityVector);
    var tmp_0;
    if (sequentialAnimation) {
      tmp_0 = _this__u8e3s4.z7f_1;
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
      tmp = typeConverter.g7g()(initialVelocity);
    }
    var tmp1_elvis_lhs = tmp;
    var initialVelocityVector = tmp1_elvis_lhs == null ? newInstance(typeConverter.g7g()(initialValue)) : tmp1_elvis_lhs;
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
      $this_animate.b7g_1 = false;
      return Unit_instance;
    };
  }
  function animate$lambda_0($lateInitScope, $initialValue, $animation, $initialVelocityVector, $durationScale, $this_animate, $block) {
    return function (it) {
      // Inline function 'kotlin.apply' call
      var tmp = $animation.q7i();
      var tmp_0 = $animation.a7h();
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
      $this_animate.b7g_1 = false;
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
      $block($this$animate.s2(), $typeConverter.i7g()($this$animate.s7f_1));
      return Unit_instance;
    };
  }
  function $animateCOROUTINE$1(_this__u8e3s4, animation, startTimeNanos, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.o7q_1 = _this__u8e3s4;
    this.p7q_1 = animation;
    this.q7q_1 = startTimeNanos;
    this.r7q_1 = block;
  }
  protoOf($animateCOROUTINE$1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 7;
            this.s7q_1 = this.p7q_1.s7i(new Long(0, 0));
            this.t7q_1 = this.p7q_1.w7i(new Long(0, 0));
            this.u7q_1 = {_v: null};
            this.bc_1 = 6;
            AnimationConstants_getInstance();
            if (this.q7q_1.equals(new Long(0, -2147483648))) {
              var tmp_0 = this;
              tmp_0.v7q_1 = get_durationScale(this.t6());
              this.ac_1 = 1;
              suspendResult = callWithFrameNanos(this.p7q_1, animate$lambda_0(this.u7q_1, this.s7q_1, this.p7q_1, this.t7q_1, this.v7q_1, this.o7q_1, this.r7q_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_1 = this.p7q_1.q7i();
              var tmp_2 = this.p7q_1.a7h();
              var this_0 = new AnimationScope(this.s7q_1, tmp_1, this.t7q_1, this.q7q_1, tmp_2, this.q7q_1, true, animate$lambda_1(this.o7q_1));
              doAnimationFrameWithScale(this_0, this.q7q_1, get_durationScale(this.t6()), this.p7q_1, this.o7q_1, this.r7q_1);
              this.u7q_1._v = this_0;
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
            if (!ensureNotNull(this.u7q_1._v).x7h()) {
              this.ac_1 = 5;
              continue $sm;
            }

            var tmp_3 = this;
            tmp_3.w7q_1 = get_durationScale(this.t6());
            this.ac_1 = 4;
            suspendResult = callWithFrameNanos(this.p7q_1, animate$lambda_2(this.u7q_1, this.w7q_1, this.p7q_1, this.o7q_1, this.r7q_1), this);
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
              var tmp0_safe_receiver = this.u7q_1._v;
              if (tmp0_safe_receiver != null) {
                tmp0_safe_receiver.n7k(false);
              }
              var tmp1_safe_receiver = this.u7q_1._v;
              if (equals(tmp1_safe_receiver == null ? null : tmp1_safe_receiver.t7f_1, this.o7q_1.z7f_1)) {
                this.o7q_1.b7g_1 = false;
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
    this.f7r_1 = _this__u8e3s4;
    this.g7r_1 = onFrame;
  }
  protoOf($callWithFrameNanosCOROUTINE$2).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            if (this.f7r_1.r7i()) {
              this.ac_1 = 2;
              suspendResult = withInfiniteAnimationFrameNanos(this.g7r_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 1;
              suspendResult = withFrameNanos(callWithFrameNanos$lambda(this.g7r_1), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            this.h7r_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.h7r_1 = suspendResult;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            return this.h7r_1;
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
    this.i7r_1 = convertToVector;
    this.j7r_1 = convertFromVector;
  }
  protoOf(TwoWayConverterImpl).g7g = function () {
    return this.i7r_1;
  };
  protoOf(TwoWayConverterImpl).i7g = function () {
    return this.j7r_1;
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
    return it.l7k_1;
  }
  function IntToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector1D(it);
  }
  function IntToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return numberToInt(it.l7k_1);
  }
  function DpToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector1D(_Dp___get_value__impl__geb1vb(it.o36_1));
  }
  function DpToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Dp(_Dp___init__impl__ms3zkb(it.l7k_1));
  }
  function DpOffsetToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_Dp___get_value__impl__geb1vb(_DpOffset___get_x__impl__uauqb5(it.s36_1)), _Dp___get_value__impl__geb1vb(_DpOffset___get_y__impl__1h898y(it.s36_1)));
  }
  function DpOffsetToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    // Inline function 'androidx.compose.ui.unit.dp' call
    var this_0 = it.p7k_1;
    var tmp = _Dp___init__impl__ms3zkb(this_0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var this_1 = it.q7k_1;
    var tmp$ret$1 = _Dp___init__impl__ms3zkb(this_1);
    return new DpOffset_0(DpOffset(tmp, tmp$ret$1));
  }
  function SizeToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_Size___get_width__impl__58y75t(it.y34_1), _Size___get_height__impl__a04p02(it.y34_1));
  }
  function SizeToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Size_0(Size(it.p7k_1, it.q7k_1));
  }
  function OffsetToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_Offset___get_x__impl__xvi35n(it.x33_1), _Offset___get_y__impl__8bzhra(it.x33_1));
  }
  function OffsetToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Offset_0(Offset(it.p7k_1, it.q7k_1));
  }
  function IntOffsetToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_IntOffset___get_x__impl__qiqr5o(it.t36_1), _IntOffset___get_y__impl__2avpwj(it.t36_1));
  }
  function IntOffsetToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = it.p7k_1;
    var tmp = roundToInt(this_0);
    // Inline function 'kotlin.math.roundToInt' call
    var this_1 = it.q7k_1;
    var tmp$ret$1 = roundToInt(this_1);
    return new IntOffset_0(IntOffset(tmp, tmp$ret$1));
  }
  function IntSizeToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector2D(_IntSize___get_width__impl__d9yl4o(it.d37_1), _IntSize___get_height__impl__prv63b(it.d37_1));
  }
  function IntSizeToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    // Inline function 'kotlin.math.roundToInt' call
    var this_0 = it.p7k_1;
    var tmp = roundToInt(this_0);
    // Inline function 'kotlin.math.roundToInt' call
    var this_1 = it.q7k_1;
    var tmp$ret$1 = roundToInt(this_1);
    return new IntSize_0(IntSize(tmp, tmp$ret$1));
  }
  function RectToVector$lambda(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new AnimationVector4D(it.a34_1, it.b34_1, it.c34_1, it.d34_1);
  }
  function RectToVector$lambda_0(it) {
    _init_properties_VectorConverters_kt__g28mmu();
    return new Rect(it.w7k_1, it.x7k_1, it.y7k_1, it.z7k_1);
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
    this.k7r_1 = 10000.0;
    this.l7r_1 = 1500.0;
    this.m7r_1 = 400.0;
    this.n7r_1 = 200.0;
    this.o7r_1 = 50.0;
    this.p7r_1 = 0.2;
    this.q7r_1 = 0.5;
    this.r7r_1 = 0.75;
    this.s7r_1 = 1.0;
    this.t7r_1 = 0.01;
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
    this.u7r_1 = dampingRatio;
    this.v7r_1 = stiffness;
    this.w7r_1 = new VectorizedFloatAnimationSpec(anims);
  }
  protoOf(VectorizedSpringSpec).r7i = function () {
    return this.w7r_1.r7i();
  };
  protoOf(VectorizedSpringSpec).o7i = function (initialValue, targetValue, initialVelocity) {
    return this.w7r_1.o7i(initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedSpringSpec).p7i = function (initialValue, targetValue, initialVelocity) {
    return this.w7r_1.p7i(initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedSpringSpec).t7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.w7r_1.t7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedSpringSpec).x7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.w7r_1.x7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  function VectorizedFiniteAnimationSpec() {
  }
  function VectorizedAnimationSpec() {
  }
  function _get_valueVector__r10idf_0($this) {
    var tmp = $this.y7r_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('valueVector');
    }
  }
  function _get_velocityVector__dvxlkl_0($this) {
    var tmp = $this.z7r_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('velocityVector');
    }
  }
  function _get_endVelocityVector__l8kbka($this) {
    var tmp = $this.a7s_1;
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
    this.b7s_1 = $anim;
  }
  protoOf(VectorizedFloatAnimationSpec$1).n = function (index) {
    return this.b7s_1;
  };
  function VectorizedFloatAnimationSpec(anims) {
    this.x7r_1 = anims;
  }
  protoOf(VectorizedFloatAnimationSpec).t7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    if (!!(this.y7r_1 == null)) {
      this.y7r_1 = newInstance(initialValue);
    }
    var inductionVariable = 0;
    var last = _get_valueVector__r10idf_0(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_valueVector__r10idf_0(this).h7g(i, this.x7r_1.n(i).v7l(playTimeNanos, initialValue.n(i), targetValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_valueVector__r10idf_0(this);
  };
  protoOf(VectorizedFloatAnimationSpec).x7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    if (!!(this.z7r_1 == null)) {
      this.z7r_1 = newInstance(initialVelocity);
    }
    var inductionVariable = 0;
    var last = _get_velocityVector__dvxlkl_0(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_velocityVector__dvxlkl_0(this).h7g(i, this.x7r_1.n(i).w7l(playTimeNanos, initialValue.n(i), targetValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_velocityVector__dvxlkl_0(this);
  };
  protoOf(VectorizedFloatAnimationSpec).p7i = function (initialValue, targetValue, initialVelocity) {
    if (!!(this.a7s_1 == null)) {
      this.a7s_1 = newInstance(initialVelocity);
    }
    var inductionVariable = 0;
    var last = _get_endVelocityVector__l8kbka(this).m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_endVelocityVector__l8kbka(this).h7g(i, this.x7r_1.n(i).x7l(initialValue.n(i), targetValue.n(i), initialVelocity.n(i)));
      }
       while (inductionVariable < last);
    return _get_endVelocityVector__l8kbka(this);
  };
  protoOf(VectorizedFloatAnimationSpec).o7i = function (initialValue, targetValue, initialVelocity) {
    var maxDuration = new Long(0, 0);
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = until(0, initialValue.m()).o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.animation.core.VectorizedFloatAnimationSpec.getDurationNanos.<anonymous>' call
      // Inline function 'kotlin.comparisons.maxOf' call
      var a = maxDuration;
      var b = this.x7r_1.n(element).y7l(initialValue.n(element), targetValue.n(element), initialVelocity.n(element));
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
    if (playTimeNanos.eb($this.f7s_1).z6(new Long(0, 0)) <= 0) {
      return new Long(0, 0);
    } else {
      var postOffsetPlayTimeNanos = playTimeNanos.eb($this.f7s_1);
      var repeatsCount = postOffsetPlayTimeNanos.v9($this.e7s_1);
      var tmp;
      if ($this.d7s_1.equals(RepeatMode_Restart_getInstance())) {
        tmp = true;
      } else {
        // Inline function 'kotlin.Long.rem' call
        tmp = repeatsCount.gb(toLong(2)).equals(new Long(0, 0));
      }
      if (tmp) {
        return postOffsetPlayTimeNanos.fb(repeatsCount.w9($this.e7s_1));
      } else {
        // Inline function 'kotlin.Long.plus' call
        return repeatsCount.eb(toLong(1)).w9($this.e7s_1).fb(postOffsetPlayTimeNanos);
      }
    }
  }
  function repetitionStartVelocity($this, playTimeNanos, start, startVelocity, end) {
    var tmp;
    if (playTimeNanos.eb($this.f7s_1).z6($this.e7s_1) > 0) {
      tmp = $this.c7s_1.x7i($this.e7s_1.fb($this.f7s_1), start, end, startVelocity);
    } else {
      tmp = startVelocity;
    }
    return tmp;
  }
  function VectorizedInfiniteRepeatableSpec(animation, repeatMode, initialStartOffset) {
    repeatMode = repeatMode === VOID ? RepeatMode_Restart_getInstance() : repeatMode;
    initialStartOffset = initialStartOffset === VOID ? _StartOffset___init__impl__615djw_0(0) : initialStartOffset;
    this.c7s_1 = animation;
    this.d7s_1 = repeatMode;
    this.e7s_1 = numberToLong(this.c7s_1.g7s() + this.c7s_1.h7s() | 0).w9(get_MillisToNanos());
    this.f7s_1 = _StartOffset___get_value__impl__8sikig(initialStartOffset).w9(get_MillisToNanos());
  }
  protoOf(VectorizedInfiniteRepeatableSpec).r7i = function () {
    return true;
  };
  protoOf(VectorizedInfiniteRepeatableSpec).t7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.c7s_1.t7i(repetitionPlayTimeNanos(this, playTimeNanos), initialValue, targetValue, repetitionStartVelocity(this, playTimeNanos, initialValue, initialVelocity, targetValue));
  };
  protoOf(VectorizedInfiniteRepeatableSpec).x7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.c7s_1.x7i(repetitionPlayTimeNanos(this, playTimeNanos), initialValue, targetValue, repetitionStartVelocity(this, playTimeNanos, initialValue, initialVelocity, targetValue));
  };
  protoOf(VectorizedInfiniteRepeatableSpec).o7i = function (initialValue, targetValue, initialVelocity) {
    Companion_getInstance_0();
    return new Long(-1, 2147483647);
  };
  function VectorizedDurationBasedAnimationSpec() {
  }
  function _get_valueVector__r10idf_1($this) {
    var tmp = $this.l7s_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('valueVector');
    }
  }
  function _get_velocityVector__dvxlkl_1($this) {
    var tmp = $this.m7s_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('velocityVector');
    }
  }
  function init_0($this, value) {
    if (!!($this.l7s_1 == null)) {
      $this.l7s_1 = newInstance(value);
      $this.m7s_1 = newInstance(value);
    }
  }
  function VectorizedKeyframesSpec(keyframes, durationMillis, delayMillis) {
    delayMillis = delayMillis === VOID ? 0 : delayMillis;
    this.i7s_1 = keyframes;
    this.j7s_1 = durationMillis;
    this.k7s_1 = delayMillis;
  }
  protoOf(VectorizedKeyframesSpec).h7s = function () {
    return this.j7s_1;
  };
  protoOf(VectorizedKeyframesSpec).g7s = function () {
    return this.k7s_1;
  };
  protoOf(VectorizedKeyframesSpec).t7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(get_MillisToNanos());
    var clampedPlayTime = clampPlayTime_0(this, playTimeMillis).ea();
    if (this.i7s_1.w2(clampedPlayTime)) {
      return getValue(this.i7s_1, clampedPlayTime).pe_1;
    }
    if (clampedPlayTime >= this.j7s_1) {
      return targetValue;
    } else if (clampedPlayTime <= 0)
      return initialValue;
    var startTime = 0;
    var startVal = initialValue;
    var endVal = targetValue;
    var endTime = this.j7s_1;
    var easing = get_LinearEasing();
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.i7s_1.o2().o();
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
    var fraction = easing.t7l((clampedPlayTime - startTime | 0) / (endTime - startTime | 0));
    init_0(this, initialValue);
    var inductionVariable = 0;
    var last = startVal.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        _get_valueVector__r10idf_1(this).h7g(i, lerp(startVal.n(i), endVal.n(i), fraction));
      }
       while (inductionVariable < last);
    return _get_valueVector__r10idf_1(this);
  };
  protoOf(VectorizedKeyframesSpec).x7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
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
        _get_velocityVector__dvxlkl_1(this).h7g(i, (startNum.n(i) - endNum.n(i)) * 1000.0);
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
    this.n7s_1 = durationMillis;
    this.o7s_1 = delayMillis;
    this.p7s_1 = easing;
    this.q7s_1 = VectorizedFloatAnimationSpec_init_$Create$(new FloatTweenSpec(this.n7s_1, this.o7s_1, this.p7s_1));
  }
  protoOf(VectorizedTweenSpec).h7s = function () {
    return this.n7s_1;
  };
  protoOf(VectorizedTweenSpec).g7s = function () {
    return this.o7s_1;
  };
  protoOf(VectorizedTweenSpec).t7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.q7s_1.t7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  protoOf(VectorizedTweenSpec).x7i = function (playTimeNanos, initialValue, targetValue, initialVelocity) {
    return this.q7s_1.x7i(playTimeNanos, initialValue, targetValue, initialVelocity);
  };
  function clampPlayTime_0(_this__u8e3s4, playTime) {
    // Inline function 'kotlin.Long.minus' call
    var other = _this__u8e3s4.g7s();
    var tmp$ret$0 = playTime.fb(toLong(other));
    return coerceIn_0(tmp$ret$0, new Long(0, 0), toLong(_this__u8e3s4.h7s()));
  }
  function getValueFromMillis(_this__u8e3s4, playTimeMillis, start, end, startVelocity) {
    return _this__u8e3s4.t7i(playTimeMillis.w9(get_MillisToNanos()), start, end, startVelocity);
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
    tmp.r7s_1 = destination;
  }
  protoOf(createSpringAnimations$1).n = function (index) {
    return this.r7s_1.n(index);
  };
  function createSpringAnimations$2($dampingRatio, $stiffness) {
    this.s7s_1 = new FloatSpringSpec($dampingRatio, $stiffness);
  }
  protoOf(createSpringAnimations$2).n = function (index) {
    return this.s7s_1;
  };
  var rectVisibilityThreshold;
  var visibilityThresholdMap;
  function get_VisibilityThreshold(_this__u8e3s4) {
    _init_properties_VisibilityThresholds_kt__rvu6yi();
    return IntOffset(1, 1);
  }
  var properties_initialized_VisibilityThresholds_kt_k6rdp8;
  function _init_properties_VisibilityThresholds_kt__rvu6yi() {
    if (!properties_initialized_VisibilityThresholds_kt_k6rdp8) {
      properties_initialized_VisibilityThresholds_kt_k6rdp8 = true;
      rectVisibilityThreshold = new Rect(0.5, 0.5, 0.5, 0.5);
      visibilityThresholdMap = mapOf([to(get_VectorConverter(IntCompanionObject_instance), 1.0), to(get_VectorConverter_0(Companion_getInstance_1()), 1.0), to(get_VectorConverter_1(Companion_getInstance_2()), 1.0), to(get_VectorConverter_2(FloatCompanionObject_instance), 0.01), to(get_VectorConverter_3(Companion_getInstance_3()), 0.5), to(get_VectorConverter_4(Companion_getInstance_4()), 0.5), to(get_VectorConverter_5(Companion_getInstance_5()), 0.5), to(get_VectorConverter_6(Companion_getInstance_6()), 0.1), to(get_VectorConverter_7(Companion_getInstance_7()), 0.1)]);
    }
  }
  function AtomicReference(value) {
    this.m7p_1 = value;
  }
  protoOf(AtomicReference).zu = function () {
    // Inline function 'kotlinx.atomicfu.atomicfu_getValue' call
    return this.m7p_1;
  };
  protoOf(AtomicReference).f23 = function (expect, newValue) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.atomicfu.atomicfu_compareAndSet' call
      if (equals(this.m7p_1, expect)) {
        // Inline function 'androidx.compose.animation.core.AtomicReference.compareAndSet.<set-delegate>' call
        this.m7p_1 = newValue;
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
  protoOf(TargetBasedAnimation).u7i = isFinishedFromNanos;
  protoOf(DecayAnimation).u7i = isFinishedFromNanos;
  protoOf(FloatSpringSpec).z7l = vectorize;
  protoOf(FloatTweenSpec).x7l = getEndVelocity;
  protoOf(FloatTweenSpec).z7l = vectorize;
  protoOf(VectorizedFloatAnimationSpec).r7i = get_isInfinite;
  protoOf(VectorizedInfiniteRepeatableSpec).p7i = getEndVelocity_0;
  protoOf(VectorizedKeyframesSpec).o7i = getDurationNanos;
  protoOf(VectorizedKeyframesSpec).r7i = get_isInfinite;
  protoOf(VectorizedKeyframesSpec).p7i = getEndVelocity_0;
  protoOf(VectorizedTweenSpec).o7i = getDurationNanos;
  protoOf(VectorizedTweenSpec).r7i = get_isInfinite;
  protoOf(VectorizedTweenSpec).p7i = getEndVelocity_0;
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
  _.$_$.m = get_VisibilityThreshold;
  _.$_$.n = animateFloat;
  _.$_$.o = animateValue;
  _.$_$.p = copy;
  _.$_$.q = generateDecayAnimationSpec;
  _.$_$.r = infiniteRepeatable;
  _.$_$.s = keyframes;
  _.$_$.t = rememberInfiniteTransition;
  _.$_$.u = spring;
  _.$_$.v = tween;
  _.$_$.w = animateDecay;
  _.$_$.x = animateTo;
  _.$_$.y = animate_0;
  _.$_$.z = AnimationConstants_getInstance;
  _.$_$.a1 = Spring_instance;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-animation-animation-core.js.map
