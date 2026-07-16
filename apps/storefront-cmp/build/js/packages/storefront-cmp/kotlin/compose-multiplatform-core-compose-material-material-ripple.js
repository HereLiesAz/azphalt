(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './compose-multiplatform-core-compose-runtime-runtime.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui-graphics.js', './kotlinx-coroutines-core.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-foundation-foundation.js', './compose-multiplatform-core-compose-animation-animation-core.js', './compose-multiplatform-core-compose-ui-ui-geometry.js', './compose-multiplatform-core-compose-ui-ui-util.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui-graphics.js'), require('./kotlinx-coroutines-core.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-foundation-foundation.js'), require('./compose-multiplatform-core-compose-animation-animation-core.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'), require('./compose-multiplatform-core-compose-ui-ui-util.js'));
  else {
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-ui-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-graphics' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-animation-animation-core' was not found. Please, check whether 'compose-multiplatform-core-compose-animation-animation-core' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-util'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material-material-ripple'. Its dependency 'compose-multiplatform-core-compose-ui-ui-util' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-util' is loaded prior to 'compose-multiplatform-core-compose-material-material-ripple'.");
    }
    root['compose-multiplatform-core-compose-material-material-ripple'] = factory(typeof this['compose-multiplatform-core-compose-material-material-ripple'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-material-material-ripple'], this['compose-multiplatform-core-compose-runtime-runtime'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui-graphics'], this['kotlinx-coroutines-core'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-foundation-foundation'], this['compose-multiplatform-core-compose-animation-animation-core'], this['compose-multiplatform-core-compose-ui-ui-geometry'], this['compose-multiplatform-core-compose-ui-ui-util']);
  }
}(this, function (_, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_foundation_foundation, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_ui_ui_util) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var protoOf = kotlin_kotlin.$_$.ib;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w1;
  var CoroutineImpl = kotlin_kotlin.$_$.n9;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var isInterface = kotlin_kotlin.$_$.wa;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.z8;
  var VOID = kotlin_kotlin.$_$.g;
  var mutableStateMapOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h1;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q1;
  var RememberObserver = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w2;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.d2;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g;
  var rememberUpdatedState = kotlin_org_jetbrains_compose_runtime_runtime.$_$.m1;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y1;
  var Interaction = kotlin_org_jetbrains_compose_foundation_foundation.$_$.h;
  var Cancel = kotlin_org_jetbrains_compose_foundation_foundation.$_$.i;
  var Release = kotlin_org_jetbrains_compose_foundation_foundation.$_$.k;
  var Press = kotlin_org_jetbrains_compose_foundation_foundation.$_$.j;
  var FlowCollector = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.u;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var _Color___get_value__impl__1pls5m = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l1;
  var equals = kotlin_kotlin.$_$.da;
  var LaunchedEffect = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r;
  var getBooleanHashCode = kotlin_kotlin.$_$.ga;
  var Dp__hashCode_impl_sxkrra = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x1;
  var hashCode = kotlin_kotlin.$_$.la;
  var Animatable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.a;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.n;
  var Cancel_0 = kotlin_org_jetbrains_compose_foundation_foundation.$_$.a;
  var Stop = kotlin_org_jetbrains_compose_foundation_foundation.$_$.c;
  var Start = kotlin_org_jetbrains_compose_foundation_foundation.$_$.b;
  var Unfocus = kotlin_org_jetbrains_compose_foundation_foundation.$_$.e;
  var Focus = kotlin_org_jetbrains_compose_foundation_foundation.$_$.d;
  var Exit = kotlin_org_jetbrains_compose_foundation_foundation.$_$.g;
  var Enter = kotlin_org_jetbrains_compose_foundation_foundation.$_$.f;
  var lastOrNull = kotlin_kotlin.$_$.o7;
  var isNaN_0 = kotlin_kotlin.$_$.zf;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.c2;
  var get_LinearEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.g;
  var TweenSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.i;
  var tween = kotlin_org_jetbrains_compose_animation_animation_core.$_$.w;
  var get_FastOutSlowInEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.f;
  var coroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.f;
  var CompletableDeferred = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b1;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var Offset_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var ensureNotNull = kotlin_kotlin.$_$.uf;
  var lerp = kotlin_org_jetbrains_compose_ui_ui_util.$_$.b;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.x;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.y;
  var _Color___get_alpha__impl__wcfyv1 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.j1;
  var Offset__getDistance_impl_pclvxn = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.r;
  var KMutableProperty1 = kotlin_kotlin.$_$.pc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ja;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var luminance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.x;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var getNumberHashCode = kotlin_kotlin.$_$.ia;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.s1;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Ripple, 'Ripple', classMeta);
  setMetadataFor(CommonRipple, 'CommonRipple', classMeta, Ripple);
  setMetadataFor(CommonRippleIndicationInstance$addRipple$slambda, 'CommonRippleIndicationInstance$addRipple$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(RippleIndicationInstance, 'RippleIndicationInstance', classMeta);
  setMetadataFor(CommonRippleIndicationInstance, 'CommonRippleIndicationInstance', classMeta, RippleIndicationInstance, [RippleIndicationInstance, RememberObserver]);
  setMetadataFor(Ripple$rememberUpdatedInstance$slambda$slambda, 'Ripple$rememberUpdatedInstance$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(sam$kotlinx_coroutines_flow_FlowCollector$0, 'sam$kotlinx_coroutines_flow_FlowCollector$0', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(Ripple$rememberUpdatedInstance$slambda, 'Ripple$rememberUpdatedInstance$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(StateLayer$handleInteraction$slambda, 'StateLayer$handleInteraction$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(StateLayer$handleInteraction$slambda_1, 'StateLayer$handleInteraction$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(StateLayer, 'StateLayer', classMeta);
  setMetadataFor(RippleAnimation$fadeIn$slambda$slambda, 'RippleAnimation$fadeIn$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(RippleAnimation$fadeIn$slambda$slambda_1, 'RippleAnimation$fadeIn$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(RippleAnimation$fadeIn$slambda$slambda_3, 'RippleAnimation$fadeIn$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(RippleAnimation$fadeOut$slambda$slambda, 'RippleAnimation$fadeOut$slambda$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(RippleAnimation$fadeIn$slambda, 'RippleAnimation$fadeIn$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(RippleAnimation$fadeOut$slambda, 'RippleAnimation$fadeOut$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($animateCOROUTINE$0, '$animateCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor($fadeInCOROUTINE$1, '$fadeInCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor($fadeOutCOROUTINE$2, '$fadeOutCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor(RippleAnimation, 'RippleAnimation', classMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(DebugRippleTheme, 'DebugRippleTheme', objectMeta);
  setMetadataFor(RippleAlpha, 'RippleAlpha', classMeta);
  //endregion
  function CommonRipple(bounded, radius, color) {
    Ripple.call(this, bounded, radius, color);
  }
  protoOf(CommonRipple).qax = function (interactionSource, bounded, radius, color, rippleAlpha, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1768051227);
    sourceInformation($composer_0, 'C(rememberUpdatedRippleInstance)P(2!1,3:c#ui.unit.Dp)53@1880L125:CommonRipple.kt#vhb33q');
    if (isTraceInProgress()) {
      traceEventStart(-1768051227, $changed, -1, 'androidx.compose.material.ripple.CommonRipple.rememberUpdatedRippleInstance (CommonRipple.kt:52)');
    }
    $composer_0.j1l(-1865682347);
    sourceInformation($composer_0, 'CC(remember):CommonRipple.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.v1o(interactionSource) : false) ? true : ($changed & 6) === 4) | ((($changed & 458752 ^ 196608) > 131072 ? $composer_0.v1o(this) : false) ? true : ($changed & 196608) === 131072));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.material.ripple.CommonRipple.rememberUpdatedRippleInstance.<anonymous>' call
      var value = new CommonRippleIndicationInstance(bounded, radius, color, rippleAlpha);
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
  function drawRipples(_this__u8e3s4, $this, color) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = $this.zax_1.o2().o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.material.ripple.CommonRippleIndicationInstance.drawRipples.<anonymous>' call
      // Inline function 'kotlin.collections.component2' call
      var ripple = element.s2();
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var alpha = $this.yax_1.s2().day_1;
      var tmp;
      if (!(alpha === 0.0)) {
        ripple.qay(_this__u8e3s4, Color__copy$default_impl_ectz3s(color, alpha));
        tmp = Unit_instance;
      }
    }
  }
  function CommonRippleIndicationInstance$addRipple$slambda($rippleAnimation, this$0, $interaction, resultContinuation) {
    this.zay_1 = $rippleAnimation;
    this.aaz_1 = this$0;
    this.baz_1 = $interaction;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(CommonRippleIndicationInstance$addRipple$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(CommonRippleIndicationInstance$addRipple$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(CommonRippleIndicationInstance$addRipple$slambda).mc = function () {
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
            this.bc_1 = 4;
            this.ac_1 = 2;
            suspendResult = this.zay_1.eaz(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.daz_1 = suspendResult;
            this.bc_1 = 5;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.bc_1 = 5;
            this.aaz_1.zax_1.t2(this.baz_1);
            return Unit_instance;
          case 4:
            this.bc_1 = 5;
            var t = this.dc_1;
            this.aaz_1.zax_1.t2(this.baz_1);
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
  protoOf(CommonRippleIndicationInstance$addRipple$slambda).x1e = function ($this$launch, completion) {
    var i = new CommonRippleIndicationInstance$addRipple$slambda(this.zay_1, this.aaz_1, this.baz_1, completion);
    i.caz_1 = $this$launch;
    return i;
  };
  function CommonRippleIndicationInstance$addRipple$slambda_0($rippleAnimation, this$0, $interaction, resultContinuation) {
    var i = new CommonRippleIndicationInstance$addRipple$slambda($rippleAnimation, this$0, $interaction, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function CommonRippleIndicationInstance(bounded, radius, color, rippleAlpha) {
    RippleIndicationInstance.call(this, bounded, rippleAlpha);
    this.vax_1 = bounded;
    this.wax_1 = radius;
    this.xax_1 = color;
    this.yax_1 = rippleAlpha;
    this.zax_1 = mutableStateMapOf();
  }
  protoOf(CommonRippleIndicationInstance).o8k = function (_this__u8e3s4) {
    var color = this.xax_1.s2().f3s_1;
    _this__u8e3s4.j4v();
    this.gaz(_this__u8e3s4, this.wax_1, color);
    drawRipples(_this__u8e3s4, this, color);
  };
  protoOf(CommonRippleIndicationInstance).haz = function (interaction, scope) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.zax_1.o2().o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'androidx.compose.material.ripple.CommonRippleIndicationInstance.addRipple.<anonymous>' call
      // Inline function 'kotlin.collections.component2' call
      var ripple = element.s2();
      ripple.iaz();
    }
    var origin = this.vax_1 ? interaction.e9w_1 : null;
    var rippleAnimation = new RippleAnimation(origin, this.wax_1, this.vax_1);
    // Inline function 'kotlin.collections.set' call
    this.zax_1.p2(interaction, rippleAnimation);
    launch(scope, VOID, VOID, CommonRippleIndicationInstance$addRipple$slambda_0(rippleAnimation, this, interaction, null));
  };
  protoOf(CommonRippleIndicationInstance).jaz = function (interaction) {
    var tmp0_safe_receiver = this.zax_1.z2(interaction);
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.iaz();
    }
  };
  protoOf(CommonRippleIndicationInstance).g1w = function () {
  };
  protoOf(CommonRippleIndicationInstance).i1w = function () {
    this.zax_1.h1();
  };
  protoOf(CommonRippleIndicationInstance).h1w = function () {
    this.zax_1.h1();
  };
  function get_DefaultTweenSpec() {
    _init_properties_Ripple_kt__d55ieo();
    return DefaultTweenSpec;
  }
  var DefaultTweenSpec;
  function rememberRipple(bounded, radius, color, $composer, $changed, $default) {
    _init_properties_Ripple_kt__d55ieo();
    var bounded_0 = bounded;
    var radius_0 = radius;
    var color_0 = color;
    var $composer_0 = $composer;
    $composer_0.j1l(1635163520);
    sourceInformation($composer_0, 'C(rememberRipple)P(!1,2:c#ui.unit.Dp,1:c#ui.graphics.Color)81@3890L27,82@3929L85:Ripple.kt#vhb33q');
    if (!(($default & 1) === 0))
      bounded_0 = true;
    if (!(($default & 2) === 0))
      radius_0 = Companion_getInstance_0().n36_1;
    if (!(($default & 4) === 0))
      color_0 = Companion_getInstance_1().w3s_1;
    if (isTraceInProgress()) {
      traceEventStart(1635163520, $changed, -1, 'androidx.compose.material.ripple.rememberRipple (Ripple.kt:80)');
    }
    var colorState = rememberUpdatedState(new Color(color_0), $composer_0, 14 & $changed >> 6);
    $composer_0.j1l(487854282);
    sourceInformation($composer_0, 'CC(remember):Ripple.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.k1y(bounded_0) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.l1y(_Dp___get_value__impl__geb1vb(radius_0)) : false) ? true : ($changed & 48) === 32));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.material.ripple.rememberRipple.<anonymous>' call
      var value = new CommonRipple(bounded_0, radius_0, colorState);
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
  function Ripple$rememberUpdatedInstance$slambda$slambda($instance, $this_LaunchedEffect, resultContinuation) {
    this.taz_1 = $instance;
    this.uaz_1 = $this_LaunchedEffect;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Ripple$rememberUpdatedInstance$slambda$slambda).i8l = function (interaction, $completion) {
    var tmp = this.j8l(interaction, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Ripple$rememberUpdatedInstance$slambda$slambda).yc = function (p1, $completion) {
    return this.i8l((!(p1 == null) ? isInterface(p1, Interaction) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(Ripple$rememberUpdatedInstance$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          var tmp0_subject = this.vaz_1;
          if (tmp0_subject instanceof Press) {
            this.taz_1.haz(this.vaz_1, this.uaz_1);
          } else {
            if (tmp0_subject instanceof Release) {
              this.taz_1.jaz(this.vaz_1.f9w_1);
            } else {
              if (tmp0_subject instanceof Cancel) {
                this.taz_1.jaz(this.vaz_1.g9w_1);
              } else {
                this.taz_1.kaz(this.vaz_1, this.uaz_1);
              }
            }
          }
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
  protoOf(Ripple$rememberUpdatedInstance$slambda$slambda).j8l = function (interaction, completion) {
    var i = new Ripple$rememberUpdatedInstance$slambda$slambda(this.taz_1, this.uaz_1, completion);
    i.vaz_1 = interaction;
    return i;
  };
  function Ripple$rememberUpdatedInstance$slambda$slambda_0($instance, $this_LaunchedEffect, resultContinuation) {
    var i = new Ripple$rememberUpdatedInstance$slambda$slambda($instance, $this_LaunchedEffect, resultContinuation);
    var l = function (interaction, $completion) {
      return i.i8l(interaction, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function sam$kotlinx_coroutines_flow_FlowCollector$0(function_0) {
    this.waz_1 = function_0;
  }
  protoOf(sam$kotlinx_coroutines_flow_FlowCollector$0).p19 = function (value, $completion) {
    return this.waz_1(value, $completion);
  };
  function Ripple$rememberUpdatedInstance$slambda($interactionSource, $instance, resultContinuation) {
    this.fb0_1 = $interactionSource;
    this.gb0_1 = $instance;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(Ripple$rememberUpdatedInstance$slambda).w1e = function ($this$LaunchedEffect, $completion) {
    var tmp = this.x1e($this$LaunchedEffect, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(Ripple$rememberUpdatedInstance$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(Ripple$rememberUpdatedInstance$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            var tmp_0 = this.fb0_1.r8k();
            var tmp_1 = Ripple$rememberUpdatedInstance$slambda$slambda_0(this.gb0_1, this.hb0_1, null);
            suspendResult = tmp_0.b18(new sam$kotlinx_coroutines_flow_FlowCollector$0(tmp_1), this);
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
  protoOf(Ripple$rememberUpdatedInstance$slambda).x1e = function ($this$LaunchedEffect, completion) {
    var i = new Ripple$rememberUpdatedInstance$slambda(this.fb0_1, this.gb0_1, completion);
    i.hb0_1 = $this$LaunchedEffect;
    return i;
  };
  function Ripple$rememberUpdatedInstance$slambda_0($interactionSource, $instance, resultContinuation) {
    var i = new Ripple$rememberUpdatedInstance$slambda($interactionSource, $instance, resultContinuation);
    var l = function ($this$LaunchedEffect, $completion) {
      return i.w1e($this$LaunchedEffect, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function Ripple(bounded, radius, color) {
    this.rax_1 = bounded;
    this.sax_1 = radius;
    this.tax_1 = color;
  }
  protoOf(Ripple).p8k = function (interactionSource, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(988743187);
    sourceInformation($composer_0, 'C(rememberUpdatedInstance)116@5361L7,117@5389L174,124@5617L13,124@5590L41,126@5656L155,134@5821L535:Ripple.kt#vhb33q');
    if (isTraceInProgress()) {
      traceEventStart(988743187, $changed, -1, 'androidx.compose.material.ripple.Ripple.rememberUpdatedInstance (Ripple.kt:115)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalRippleTheme();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_0);
    sourceInformationMarkerEnd($composer_1);
    var theme = tmp0;
    $composer_0.j1l(-9926369);
    sourceInformation($composer_0, '121@5525L14');
    var tmp;
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    var this_1 = this.tax_1.s2().f3s_1;
    if (!equals(_Color___get_value__impl__1pls5m(this_1), _Color___get_value__impl__1pls5m(Companion_getInstance_1().w3s_1))) {
      tmp = this.tax_1.s2().f3s_1;
    } else {
      tmp = theme.ib0($composer_0, 0);
    }
    var tmp1_group = tmp;
    $composer_0.l1l();
    var color = rememberUpdatedState(new Color(tmp1_group), $composer_0, 0);
    var rippleAlpha = rememberUpdatedState(theme.jb0($composer_0, 0), $composer_0, 0);
    var instance = this.qax(interactionSource, this.rax_1, this.sax_1, color, rippleAlpha, $composer_0, 14 & $changed | 458752 & $changed << 12);
    LaunchedEffect(instance, interactionSource, Ripple$rememberUpdatedInstance$slambda_0(interactionSource, instance, null), $composer_0, 520 | 112 & $changed << 3);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return instance;
  };
  protoOf(Ripple).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Ripple))
      return false;
    if (!(this.rax_1 === other.rax_1))
      return false;
    if (!equals(this.sax_1, other.sax_1))
      return false;
    if (!equals(this.tax_1, other.tax_1))
      return false;
    return true;
  };
  protoOf(Ripple).hashCode = function () {
    var result = getBooleanHashCode(this.rax_1);
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.sax_1) | 0;
    result = imul(31, result) + hashCode(this.tax_1) | 0;
    return result;
  };
  function RippleIndicationInstance(bounded, rippleAlpha) {
    this.faz_1 = new StateLayer(bounded, rippleAlpha);
  }
  protoOf(RippleIndicationInstance).kaz = function (interaction, scope) {
    this.faz_1.pb0(interaction, scope);
  };
  protoOf(RippleIndicationInstance).gaz = function (_this__u8e3s4, radius, color) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    this.faz_1.gaz(_this__u8e3s4, radius, color);
  };
  function StateLayer$handleInteraction$slambda(this$0, $targetAlpha, $incomingAnimationSpec, resultContinuation) {
    this.yb0_1 = this$0;
    this.zb0_1 = $targetAlpha;
    this.ab1_1 = $incomingAnimationSpec;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(StateLayer$handleInteraction$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(StateLayer$handleInteraction$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(StateLayer$handleInteraction$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.yb0_1.mb0_1.w7g(this.zb0_1, this.ab1_1, VOID, VOID, this);
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
  protoOf(StateLayer$handleInteraction$slambda).x1e = function ($this$launch, completion) {
    var i = new StateLayer$handleInteraction$slambda(this.yb0_1, this.zb0_1, this.ab1_1, completion);
    i.bb1_1 = $this$launch;
    return i;
  };
  function StateLayer$handleInteraction$slambda_0(this$0, $targetAlpha, $incomingAnimationSpec, resultContinuation) {
    var i = new StateLayer$handleInteraction$slambda(this$0, $targetAlpha, $incomingAnimationSpec, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function StateLayer$handleInteraction$slambda_1(this$0, $outgoingAnimationSpec, resultContinuation) {
    this.kb1_1 = this$0;
    this.lb1_1 = $outgoingAnimationSpec;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(StateLayer$handleInteraction$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(StateLayer$handleInteraction$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(StateLayer$handleInteraction$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.kb1_1.mb0_1.w7g(0.0, this.lb1_1, VOID, VOID, this);
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
  protoOf(StateLayer$handleInteraction$slambda_1).x1e = function ($this$launch, completion) {
    var i = new StateLayer$handleInteraction$slambda_1(this.kb1_1, this.lb1_1, completion);
    i.mb1_1 = $this$launch;
    return i;
  };
  function StateLayer$handleInteraction$slambda_2(this$0, $outgoingAnimationSpec, resultContinuation) {
    var i = new StateLayer$handleInteraction$slambda_1(this$0, $outgoingAnimationSpec, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function StateLayer(bounded, rippleAlpha) {
    this.kb0_1 = bounded;
    this.lb0_1 = rippleAlpha;
    this.mb0_1 = Animatable(0.0);
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.nb0_1 = ArrayList_init_$Create$();
    this.ob0_1 = null;
  }
  protoOf(StateLayer).pb0 = function (interaction, scope) {
    if (interaction instanceof Enter) {
      this.nb0_1.a1(interaction);
    } else {
      if (interaction instanceof Exit) {
        this.nb0_1.b1(interaction.e9v_1);
      } else {
        if (interaction instanceof Focus) {
          this.nb0_1.a1(interaction);
        } else {
          if (interaction instanceof Unfocus) {
            this.nb0_1.b1(interaction.f9u_1);
          } else {
            if (interaction instanceof Start) {
              this.nb0_1.a1(interaction);
            } else {
              if (interaction instanceof Stop) {
                this.nb0_1.b1(interaction.d9u_1);
              } else {
                if (interaction instanceof Cancel_0) {
                  this.nb0_1.b1(interaction.e9u_1);
                } else {
                  return Unit_instance;
                }
              }
            }
          }
        }
      }
    }
    var newInteraction = lastOrNull(this.nb0_1);
    if (!equals(this.ob0_1, newInteraction)) {
      if (!(newInteraction == null)) {
        var tmp;
        if (interaction instanceof Enter) {
          tmp = this.lb0_1.s2().cay_1;
        } else {
          if (interaction instanceof Focus) {
            tmp = this.lb0_1.s2().bay_1;
          } else {
            if (interaction instanceof Start) {
              tmp = this.lb0_1.s2().aay_1;
            } else {
              tmp = 0.0;
            }
          }
        }
        var targetAlpha = tmp;
        var incomingAnimationSpec = incomingStateLayerAnimationSpecFor(newInteraction);
        launch(scope, VOID, VOID, StateLayer$handleInteraction$slambda_0(this, targetAlpha, incomingAnimationSpec, null));
      } else {
        var outgoingAnimationSpec = outgoingStateLayerAnimationSpecFor(this.ob0_1);
        launch(scope, VOID, VOID, StateLayer$handleInteraction$slambda_2(this, outgoingAnimationSpec, null));
      }
      this.ob0_1 = newInteraction;
    }
  };
  protoOf(StateLayer).gaz = function (_this__u8e3s4, radius, color) {
    var tmp;
    // Inline function 'androidx.compose.ui.unit.isUnspecified' call
    if (isNaN_0(_Dp___get_value__impl__geb1vb(radius))) {
      tmp = getRippleEndRadius(_this__u8e3s4, this.kb0_1, _this__u8e3s4.g34());
    } else {
      tmp = _this__u8e3s4.y35(radius);
    }
    var targetRadius = tmp;
    var alpha = this.mb0_1.s2();
    if (alpha > 0.0) {
      var modulatedColor = Color__copy$default_impl_ectz3s(color, alpha);
      if (this.kb0_1) {
        // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect' call
        var right = _Size___get_width__impl__58y75t(_this__u8e3s4.g34());
        var bottom = _Size___get_height__impl__a04p02(_this__u8e3s4.g34());
        var clipOp = Companion_getInstance_2().r3q_1;
        // Inline function 'androidx.compose.ui.graphics.drawscope.withTransform' call
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        var $this$with = _this__u8e3s4.z41();
        var previousSize = $this$with.g34();
        $this$with.x3g().i3q();
        // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect.<anonymous>' call
        $this$with.x41().o3q(0.0, 0.0, right, bottom, clipOp);
        // Inline function 'androidx.compose.material.ripple.StateLayer.drawStateLayer.<anonymous>' call
        _this__u8e3s4.d42(modulatedColor, targetRadius);
        $this$with.x3g().j3q();
        $this$with.w41(previousSize);
      } else {
        _this__u8e3s4.d42(modulatedColor, targetRadius);
      }
    }
  };
  function incomingStateLayerAnimationSpecFor(interaction) {
    _init_properties_Ripple_kt__d55ieo();
    var tmp;
    if (interaction instanceof Enter) {
      tmp = get_DefaultTweenSpec();
    } else {
      if (interaction instanceof Focus) {
        tmp = new TweenSpec(45, VOID, get_LinearEasing());
      } else {
        if (interaction instanceof Start) {
          tmp = new TweenSpec(45, VOID, get_LinearEasing());
        } else {
          tmp = get_DefaultTweenSpec();
        }
      }
    }
    return tmp;
  }
  function outgoingStateLayerAnimationSpecFor(interaction) {
    _init_properties_Ripple_kt__d55ieo();
    var tmp;
    if (interaction instanceof Enter) {
      tmp = get_DefaultTweenSpec();
    } else {
      if (interaction instanceof Focus) {
        tmp = get_DefaultTweenSpec();
      } else {
        if (interaction instanceof Start) {
          tmp = new TweenSpec(150, VOID, get_LinearEasing());
        } else {
          tmp = get_DefaultTweenSpec();
        }
      }
    }
    return tmp;
  }
  var properties_initialized_Ripple_kt_3wqvym;
  function _init_properties_Ripple_kt__d55ieo() {
    if (!properties_initialized_Ripple_kt_3wqvym) {
      properties_initialized_Ripple_kt_3wqvym = true;
      DefaultTweenSpec = new TweenSpec(15, VOID, get_LinearEasing());
    }
  }
  function get_BoundedRippleExtraRadius() {
    _init_properties_RippleAnimation_kt__8sy0vy();
    return BoundedRippleExtraRadius;
  }
  var BoundedRippleExtraRadius;
  function RippleAnimation$fadeIn$slambda$slambda(this$0, resultContinuation) {
    this.vb1_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RippleAnimation$fadeIn$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation$fadeIn$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(RippleAnimation$fadeIn$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.vb1_1.kay_1.w7g(1.0, tween(75, VOID, get_LinearEasing()), VOID, VOID, this);
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
  protoOf(RippleAnimation$fadeIn$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new RippleAnimation$fadeIn$slambda$slambda(this.vb1_1, completion);
    i.wb1_1 = $this$launch;
    return i;
  };
  function RippleAnimation$fadeIn$slambda$slambda_0(this$0, resultContinuation) {
    var i = new RippleAnimation$fadeIn$slambda$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function RippleAnimation$fadeIn$slambda$slambda_1(this$0, resultContinuation) {
    this.fb2_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RippleAnimation$fadeIn$slambda$slambda_1).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation$fadeIn$slambda$slambda_1).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(RippleAnimation$fadeIn$slambda$slambda_1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.fb2_1.lay_1.w7g(1.0, tween(225, VOID, get_FastOutSlowInEasing()), VOID, VOID, this);
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
  protoOf(RippleAnimation$fadeIn$slambda$slambda_1).x1e = function ($this$launch, completion) {
    var i = new RippleAnimation$fadeIn$slambda$slambda_1(this.fb2_1, completion);
    i.gb2_1 = $this$launch;
    return i;
  };
  function RippleAnimation$fadeIn$slambda$slambda_2(this$0, resultContinuation) {
    var i = new RippleAnimation$fadeIn$slambda$slambda_1(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function RippleAnimation$fadeIn$slambda$slambda_3(this$0, resultContinuation) {
    this.pb2_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RippleAnimation$fadeIn$slambda$slambda_3).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation$fadeIn$slambda$slambda_3).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(RippleAnimation$fadeIn$slambda$slambda_3).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.pb2_1.may_1.w7g(1.0, tween(225, VOID, get_LinearEasing()), VOID, VOID, this);
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
  protoOf(RippleAnimation$fadeIn$slambda$slambda_3).x1e = function ($this$launch, completion) {
    var i = new RippleAnimation$fadeIn$slambda$slambda_3(this.pb2_1, completion);
    i.qb2_1 = $this$launch;
    return i;
  };
  function RippleAnimation$fadeIn$slambda$slambda_4(this$0, resultContinuation) {
    var i = new RippleAnimation$fadeIn$slambda$slambda_3(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function RippleAnimation$fadeOut$slambda$slambda(this$0, resultContinuation) {
    this.zb2_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RippleAnimation$fadeOut$slambda$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation$fadeOut$slambda$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(RippleAnimation$fadeOut$slambda$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.zb2_1.kay_1.w7g(0.0, tween(150, VOID, get_LinearEasing()), VOID, VOID, this);
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
  protoOf(RippleAnimation$fadeOut$slambda$slambda).x1e = function ($this$launch, completion) {
    var i = new RippleAnimation$fadeOut$slambda$slambda(this.zb2_1, completion);
    i.ab3_1 = $this$launch;
    return i;
  };
  function RippleAnimation$fadeOut$slambda$slambda_0(this$0, resultContinuation) {
    var i = new RippleAnimation$fadeOut$slambda$slambda(this$0, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function _set_finishedFadingIn__33hlo9($this, _set____db54di) {
    var this_0 = $this.oay_1;
    finishedFadingIn$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_finishedFadingIn__pzmnej($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.oay_1;
    finishedFadingIn$factory_0();
    return this_0.s2();
  }
  function _set_finishRequested__u52oy2($this, _set____db54di) {
    var this_0 = $this.pay_1;
    finishRequested$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function _get_finishRequested__usb5ii($this) {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = $this.pay_1;
    finishRequested$factory_0();
    return this_0.s2();
  }
  function fadeIn($this, $completion) {
    var tmp = new $fadeInCOROUTINE$1($this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function fadeOut($this, $completion) {
    var tmp = new $fadeOutCOROUTINE$2($this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function RippleAnimation$fadeIn$slambda(this$0, resultContinuation) {
    this.bb4_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RippleAnimation$fadeIn$slambda).dai = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation$fadeIn$slambda).yc = function (p1, $completion) {
    return this.dai((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(RippleAnimation$fadeIn$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          launch(this.cb4_1, VOID, VOID, RippleAnimation$fadeIn$slambda$slambda_0(this.bb4_1, null));
          launch(this.cb4_1, VOID, VOID, RippleAnimation$fadeIn$slambda$slambda_2(this.bb4_1, null));
          return launch(this.cb4_1, VOID, VOID, RippleAnimation$fadeIn$slambda$slambda_4(this.bb4_1, null));
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(RippleAnimation$fadeIn$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new RippleAnimation$fadeIn$slambda(this.bb4_1, completion);
    i.cb4_1 = $this$coroutineScope;
    return i;
  };
  function RippleAnimation$fadeIn$slambda_0(this$0, resultContinuation) {
    var i = new RippleAnimation$fadeIn$slambda(this$0, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.dai($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function RippleAnimation$fadeOut$slambda(this$0, resultContinuation) {
    this.lb4_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(RippleAnimation$fadeOut$slambda).dai = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation$fadeOut$slambda).yc = function (p1, $completion) {
    return this.dai((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(RippleAnimation$fadeOut$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        if (tmp === 0) {
          this.bc_1 = 1;
          return launch(this.mb4_1, VOID, VOID, RippleAnimation$fadeOut$slambda$slambda_0(this.lb4_1, null));
        } else if (tmp === 1) {
          throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        throw e;
      }
     while (true);
  };
  protoOf(RippleAnimation$fadeOut$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new RippleAnimation$fadeOut$slambda(this.lb4_1, completion);
    i.mb4_1 = $this$coroutineScope;
    return i;
  };
  function RippleAnimation$fadeOut$slambda_0(this$0, resultContinuation) {
    var i = new RippleAnimation$fadeOut$slambda(this$0, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.dai($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $animateCOROUTINE$0(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.vb4_1 = _this__u8e3s4;
  }
  protoOf($animateCOROUTINE$0).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.ac_1 = 1;
            suspendResult = fadeIn(this.vb4_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            _set_finishedFadingIn__33hlo9(this.vb4_1, true);
            this.ac_1 = 2;
            suspendResult = this.vb4_1.nay_1.wt(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.ac_1 = 3;
            suspendResult = fadeOut(this.vb4_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

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
  function $fadeInCOROUTINE$1(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.jb3_1 = _this__u8e3s4;
  }
  protoOf($fadeInCOROUTINE$1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = coroutineScope(RippleAnimation$fadeIn$slambda_0(this.jb3_1, null), this);
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
  function $fadeOutCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.sb3_1 = _this__u8e3s4;
  }
  protoOf($fadeOutCOROUTINE$2).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = coroutineScope(RippleAnimation$fadeOut$slambda_0(this.sb3_1, null), this);
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
  function RippleAnimation(origin, radius, bounded) {
    this.eay_1 = origin;
    this.fay_1 = radius;
    this.gay_1 = bounded;
    this.hay_1 = null;
    this.iay_1 = null;
    this.jay_1 = null;
    this.kay_1 = Animatable(0.0);
    this.lay_1 = Animatable(0.0);
    this.may_1 = Animatable(0.0);
    this.nay_1 = CompletableDeferred(null);
    this.oay_1 = mutableStateOf(false);
    this.pay_1 = mutableStateOf(false);
  }
  protoOf(RippleAnimation).eaz = function ($completion) {
    var tmp = new $animateCOROUTINE$0(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(RippleAnimation).iaz = function () {
    _set_finishRequested__u52oy2(this, true);
    this.nay_1.xt(Unit_instance);
  };
  protoOf(RippleAnimation).qay = function (_this__u8e3s4, color) {
    if (this.hay_1 == null) {
      this.hay_1 = getRippleStartRadius(_this__u8e3s4.g34());
    }
    if (this.iay_1 == null) {
      var tmp = this;
      var tmp_0;
      // Inline function 'androidx.compose.ui.unit.isUnspecified' call
      var this_0 = this.fay_1;
      if (isNaN_0(_Dp___get_value__impl__geb1vb(this_0))) {
        tmp_0 = getRippleEndRadius(_this__u8e3s4, this.gay_1, _this__u8e3s4.g34());
      } else {
        tmp_0 = _this__u8e3s4.y35(this.fay_1);
      }
      tmp.iay_1 = tmp_0;
    }
    var tmp_1 = this.eay_1;
    if ((tmp_1 == null ? null : new Offset(tmp_1)) == null) {
      this.eay_1 = _this__u8e3s4.h42();
    }
    var tmp_2 = this.jay_1;
    if ((tmp_2 == null ? null : new Offset(tmp_2)) == null) {
      this.jay_1 = Offset_0(_Size___get_width__impl__58y75t(_this__u8e3s4.g34()) / 2.0, _Size___get_height__impl__a04p02(_this__u8e3s4.g34()) / 2.0);
    }
    var tmp_3;
    if (_get_finishRequested__usb5ii(this) ? !_get_finishedFadingIn__pzmnej(this) : false) {
      tmp_3 = 1.0;
    } else {
      tmp_3 = this.kay_1.s2();
    }
    var alpha = tmp_3;
    var radius = lerp(ensureNotNull(this.hay_1), ensureNotNull(this.iay_1), this.lay_1.s2());
    var tmp_4 = this.eay_1;
    var tmp_5 = _Offset___get_x__impl__xvi35n(ensureNotNull(tmp_4 == null ? null : new Offset(tmp_4)).x33_1);
    var tmp_6 = this.jay_1;
    var tmp_7 = lerp(tmp_5, _Offset___get_x__impl__xvi35n(ensureNotNull(tmp_6 == null ? null : new Offset(tmp_6)).x33_1), this.may_1.s2());
    var tmp_8 = this.eay_1;
    var tmp_9 = _Offset___get_y__impl__8bzhra(ensureNotNull(tmp_8 == null ? null : new Offset(tmp_8)).x33_1);
    var tmp_10 = this.jay_1;
    var centerOffset = Offset_0(tmp_7, lerp(tmp_9, _Offset___get_y__impl__8bzhra(ensureNotNull(tmp_10 == null ? null : new Offset(tmp_10)).x33_1), this.may_1.s2()));
    var modulatedColor = Color__copy$default_impl_ectz3s(color, _Color___get_alpha__impl__wcfyv1(color) * alpha);
    if (this.gay_1) {
      // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect' call
      var right = _Size___get_width__impl__58y75t(_this__u8e3s4.g34());
      var bottom = _Size___get_height__impl__a04p02(_this__u8e3s4.g34());
      var clipOp = Companion_getInstance_2().r3q_1;
      // Inline function 'androidx.compose.ui.graphics.drawscope.withTransform' call
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = _this__u8e3s4.z41();
      var previousSize = $this$with.g34();
      $this$with.x3g().i3q();
      // Inline function 'androidx.compose.ui.graphics.drawscope.clipRect.<anonymous>' call
      $this$with.x41().o3q(0.0, 0.0, right, bottom, clipOp);
      // Inline function 'androidx.compose.material.ripple.RippleAnimation.draw.<anonymous>' call
      _this__u8e3s4.d42(modulatedColor, radius, centerOffset);
      $this$with.x3g().j3q();
      $this$with.w41(previousSize);
    } else {
      _this__u8e3s4.d42(modulatedColor, radius, centerOffset);
    }
  };
  function getRippleEndRadius(_this__u8e3s4, bounded, size) {
    _init_properties_RippleAnimation_kt__8sy0vy();
    var radiusCoveringBounds = Offset__getDistance_impl_pclvxn(Offset_0(_Size___get_width__impl__58y75t(size), _Size___get_height__impl__a04p02(size))) / 2.0;
    var tmp;
    if (bounded) {
      tmp = radiusCoveringBounds + _this__u8e3s4.y35(get_BoundedRippleExtraRadius());
    } else {
      tmp = radiusCoveringBounds;
    }
    return tmp;
  }
  function getRippleStartRadius(size) {
    _init_properties_RippleAnimation_kt__8sy0vy();
    // Inline function 'kotlin.math.max' call
    var a = _Size___get_width__impl__58y75t(size);
    var b = _Size___get_height__impl__a04p02(size);
    return Math.max(a, b) * 0.3;
  }
  function finishedFadingIn$factory() {
    return getPropertyCallableRef('finishedFadingIn', 1, KMutableProperty1, function (receiver) {
      return _get_finishedFadingIn__pzmnej(receiver);
    }, function (receiver, value) {
      return _set_finishedFadingIn__33hlo9(receiver, value);
    });
  }
  function finishedFadingIn$factory_0() {
    return getPropertyCallableRef('finishedFadingIn', 1, KMutableProperty1, function (receiver) {
      return _get_finishedFadingIn__pzmnej(receiver);
    }, function (receiver, value) {
      return _set_finishedFadingIn__33hlo9(receiver, value);
    });
  }
  function finishRequested$factory() {
    return getPropertyCallableRef('finishRequested', 1, KMutableProperty1, function (receiver) {
      return _get_finishRequested__usb5ii(receiver);
    }, function (receiver, value) {
      return _set_finishRequested__u52oy2(receiver, value);
    });
  }
  function finishRequested$factory_0() {
    return getPropertyCallableRef('finishRequested', 1, KMutableProperty1, function (receiver) {
      return _get_finishRequested__usb5ii(receiver);
    }, function (receiver, value) {
      return _set_finishRequested__u52oy2(receiver, value);
    });
  }
  var properties_initialized_RippleAnimation_kt_4ja21o;
  function _init_properties_RippleAnimation_kt__8sy0vy() {
    if (!properties_initialized_RippleAnimation_kt_4ja21o) {
      properties_initialized_RippleAnimation_kt_4ja21o = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      BoundedRippleExtraRadius = _Dp___init__impl__ms3zkb(10);
    }
  }
  function get_LocalRippleTheme() {
    _init_properties_RippleTheme_kt__e4jrk7();
    return LocalRippleTheme;
  }
  var LocalRippleTheme;
  function get_LightThemeHighContrastRippleAlpha() {
    _init_properties_RippleTheme_kt__e4jrk7();
    return LightThemeHighContrastRippleAlpha;
  }
  var LightThemeHighContrastRippleAlpha;
  function get_LightThemeLowContrastRippleAlpha() {
    _init_properties_RippleTheme_kt__e4jrk7();
    return LightThemeLowContrastRippleAlpha;
  }
  var LightThemeLowContrastRippleAlpha;
  function get_DarkThemeRippleAlpha() {
    _init_properties_RippleTheme_kt__e4jrk7();
    return DarkThemeRippleAlpha;
  }
  var DarkThemeRippleAlpha;
  function Companion() {
  }
  protoOf(Companion).wb4 = function (contentColor, lightTheme) {
    var contentLuminance = luminance(contentColor);
    var tmp;
    if (!lightTheme ? contentLuminance < 0.5 : false) {
      tmp = Companion_getInstance_1().o3s_1;
    } else {
      tmp = contentColor;
    }
    return tmp;
  };
  protoOf(Companion).xb4 = function (contentColor, lightTheme) {
    var tmp;
    if (lightTheme) {
      var tmp_0;
      if (luminance(contentColor) > 0.5) {
        tmp_0 = get_LightThemeHighContrastRippleAlpha();
      } else {
        tmp_0 = get_LightThemeLowContrastRippleAlpha();
      }
      tmp = tmp_0;
    } else {
      tmp = get_DarkThemeRippleAlpha();
    }
    return tmp;
  };
  var Companion_instance;
  function Companion_getInstance_3() {
    return Companion_instance;
  }
  function DebugRippleTheme() {
  }
  protoOf(DebugRippleTheme).ib0 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(2042140174);
    sourceInformation($composer_0, 'C(defaultColor):RippleTheme.kt#vhb33q');
    if (isTraceInProgress()) {
      traceEventStart(2042140174, $changed, -1, 'androidx.compose.material.ripple.DebugRippleTheme.defaultColor (RippleTheme.kt:214)');
    }
    var tmp0 = Companion_instance.wb4(Companion_getInstance_1().k3s_1, true);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  protoOf(DebugRippleTheme).jb0 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1629816343);
    sourceInformation($composer_0, 'C(rippleAlpha):RippleTheme.kt#vhb33q');
    if (isTraceInProgress()) {
      traceEventStart(-1629816343, $changed, -1, 'androidx.compose.material.ripple.DebugRippleTheme.rippleAlpha (RippleTheme.kt:217)');
    }
    var tmp0 = Companion_instance.xb4(Companion_getInstance_1().k3s_1, true);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  var DebugRippleTheme_instance;
  function DebugRippleTheme_getInstance() {
    return DebugRippleTheme_instance;
  }
  function RippleAlpha(draggedAlpha, focusedAlpha, hoveredAlpha, pressedAlpha) {
    this.aay_1 = draggedAlpha;
    this.bay_1 = focusedAlpha;
    this.cay_1 = hoveredAlpha;
    this.day_1 = pressedAlpha;
  }
  protoOf(RippleAlpha).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RippleAlpha))
      return false;
    if (!(this.aay_1 === other.aay_1))
      return false;
    if (!(this.bay_1 === other.bay_1))
      return false;
    if (!(this.cay_1 === other.cay_1))
      return false;
    if (!(this.day_1 === other.day_1))
      return false;
    return true;
  };
  protoOf(RippleAlpha).hashCode = function () {
    var result = getNumberHashCode(this.aay_1);
    result = imul(31, result) + getNumberHashCode(this.bay_1) | 0;
    result = imul(31, result) + getNumberHashCode(this.cay_1) | 0;
    result = imul(31, result) + getNumberHashCode(this.day_1) | 0;
    return result;
  };
  protoOf(RippleAlpha).toString = function () {
    return 'RippleAlpha(draggedAlpha=' + this.aay_1 + ', focusedAlpha=' + this.bay_1 + ', ' + ('hoveredAlpha=' + this.cay_1 + ', pressedAlpha=' + this.day_1 + ')');
  };
  function LocalRippleTheme$lambda() {
    _init_properties_RippleTheme_kt__e4jrk7();
    return DebugRippleTheme_instance;
  }
  var properties_initialized_RippleTheme_kt_m09bsn;
  function _init_properties_RippleTheme_kt__e4jrk7() {
    if (!properties_initialized_RippleTheme_kt_m09bsn) {
      properties_initialized_RippleTheme_kt_m09bsn = true;
      LocalRippleTheme = staticCompositionLocalOf(LocalRippleTheme$lambda);
      LightThemeHighContrastRippleAlpha = new RippleAlpha(0.16, 0.24, 0.08, 0.24);
      LightThemeLowContrastRippleAlpha = new RippleAlpha(0.08, 0.12, 0.04, 0.12);
      DarkThemeRippleAlpha = new RippleAlpha(0.08, 0.12, 0.04, 0.1);
    }
  }
  //region block: init
  Companion_instance = new Companion();
  DebugRippleTheme_instance = new DebugRippleTheme();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = get_LocalRippleTheme;
  _.$_$.b = RippleAlpha;
  _.$_$.c = rememberRipple;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-material-material-ripple.js.map
