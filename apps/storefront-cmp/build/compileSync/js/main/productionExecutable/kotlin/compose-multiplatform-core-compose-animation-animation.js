(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-animation-animation-core.js', './compose-multiplatform-core-compose-runtime-runtime.js', './compose-multiplatform-core-compose-ui-ui.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-animation-animation-core.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./compose-multiplatform-core-compose-ui-ui.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-animation-animation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation'. Its dependency 'compose-multiplatform-core-compose-animation-animation-core' was not found. Please, check whether 'compose-multiplatform-core-compose-animation-animation-core' is loaded prior to 'compose-multiplatform-core-compose-animation-animation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-animation-animation'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-animation-animation'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'compose-multiplatform-core-compose-animation-animation'.");
    }
    root['compose-multiplatform-core-compose-animation-animation'] = factory(typeof this['compose-multiplatform-core-compose-animation-animation'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-animation-animation'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-animation-animation-core'], this['compose-multiplatform-core-compose-runtime-runtime'], this['compose-multiplatform-core-compose-ui-ui']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_ui_ui) {
  'use strict';
  //region block: imports
  var sign = Math.sign;
  var imul = Math.imul;
  var Long = kotlin_kotlin.$_$.ve;
  var protoOf = kotlin_kotlin.$_$.ib;
  var getNumberHashCode = kotlin_kotlin.$_$.ia;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var equals = kotlin_kotlin.$_$.da;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var numberToLong = kotlin_kotlin.$_$.fb;
  var generateDecayAnimationSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.r;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var numberToInt = kotlin_kotlin.$_$.eb;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var get_LocalDensity = kotlin_org_jetbrains_compose_ui_ui.$_$.e3;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  //endregion
  //region block: pre-declaration
  setMetadataFor(FlingInfo, 'FlingInfo', classMeta);
  setMetadataFor(FlingCalculator, 'FlingCalculator', classMeta);
  setMetadataFor(FlingResult, 'FlingResult', classMeta);
  setMetadataFor(AndroidFlingSpline, 'AndroidFlingSpline', objectMeta);
  setMetadataFor(SplineBasedFloatDecayAnimationSpec, 'SplineBasedFloatDecayAnimationSpec', classMeta);
  //endregion
  function get_DecelerationRate() {
    _init_properties_FlingCalculator_kt__ornu7o();
    return DecelerationRate;
  }
  var DecelerationRate;
  function computeDeceleration($this, density) {
    return computeDeceleration_0(0.84, density.x35());
  }
  function getSplineDeceleration($this, velocity) {
    return AndroidFlingSpline_getInstance().q81(velocity, $this.k81_1 * $this.m81_1);
  }
  function FlingInfo(initialVelocity, distance, duration) {
    this.r81_1 = initialVelocity;
    this.s81_1 = distance;
    this.t81_1 = duration;
  }
  protoOf(FlingInfo).u81 = function (time) {
    var tmp;
    if (this.t81_1.z6(new Long(0, 0)) > 0) {
      // Inline function 'kotlin.Long.div' call
      var other = this.t81_1.sb();
      tmp = time.sb() / other;
    } else {
      tmp = 1.0;
    }
    var splinePos = tmp;
    // Inline function 'kotlin.math.sign' call
    var x = this.r81_1;
    var tmp$ret$1 = sign(x);
    return this.s81_1 * tmp$ret$1 * AndroidFlingSpline_getInstance().x81(splinePos).v81_1;
  };
  protoOf(FlingInfo).y81 = function (time) {
    var tmp;
    if (this.t81_1.z6(new Long(0, 0)) > 0) {
      // Inline function 'kotlin.Long.div' call
      var other = this.t81_1.sb();
      tmp = time.sb() / other;
    } else {
      tmp = 1.0;
    }
    var splinePos = tmp;
    var tmp_0 = AndroidFlingSpline_getInstance().x81(splinePos).w81_1;
    // Inline function 'kotlin.math.sign' call
    var x = this.r81_1;
    return tmp_0 * sign(x) * this.s81_1 / this.t81_1.sb() * 1000.0;
  };
  protoOf(FlingInfo).toString = function () {
    return 'FlingInfo(initialVelocity=' + this.r81_1 + ', distance=' + this.s81_1 + ', duration=' + this.t81_1.toString() + ')';
  };
  protoOf(FlingInfo).hashCode = function () {
    var result = getNumberHashCode(this.r81_1);
    result = imul(result, 31) + getNumberHashCode(this.s81_1) | 0;
    result = imul(result, 31) + this.t81_1.hashCode() | 0;
    return result;
  };
  protoOf(FlingInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FlingInfo))
      return false;
    var tmp0_other_with_cast = other instanceof FlingInfo ? other : THROW_CCE();
    if (!equals(this.r81_1, tmp0_other_with_cast.r81_1))
      return false;
    if (!equals(this.s81_1, tmp0_other_with_cast.s81_1))
      return false;
    if (!this.t81_1.equals(tmp0_other_with_cast.t81_1))
      return false;
    return true;
  };
  function FlingCalculator(friction, density) {
    this.k81_1 = friction;
    this.l81_1 = density;
    this.m81_1 = computeDeceleration(this, this.l81_1);
  }
  protoOf(FlingCalculator).z81 = function (velocity) {
    var l = getSplineDeceleration(this, velocity);
    var decelMinusOne = get_DecelerationRate() - 1.0;
    // Inline function 'kotlin.math.exp' call
    var x = l / decelMinusOne;
    var tmp$ret$0 = Math.exp(x);
    return numberToLong(1000.0 * tmp$ret$0);
  };
  protoOf(FlingCalculator).a82 = function (velocity) {
    var l = getSplineDeceleration(this, velocity);
    var decelMinusOne = get_DecelerationRate() - 1.0;
    var tmp = this.k81_1 * this.m81_1;
    // Inline function 'kotlin.math.exp' call
    var x = get_DecelerationRate() / decelMinusOne * l;
    return tmp * Math.exp(x);
  };
  protoOf(FlingCalculator).b82 = function (velocity) {
    var l = getSplineDeceleration(this, velocity);
    var decelMinusOne = get_DecelerationRate() - 1.0;
    var tmp = this.k81_1 * this.m81_1;
    // Inline function 'kotlin.math.exp' call
    var x = get_DecelerationRate() / decelMinusOne * l;
    var tmp_0 = tmp * Math.exp(x);
    // Inline function 'kotlin.math.exp' call
    var x_0 = l / decelMinusOne;
    var tmp$ret$1 = Math.exp(x_0);
    return new FlingInfo(velocity, tmp_0, numberToLong(1000.0 * tmp$ret$1));
  };
  function computeDeceleration_0(friction, density) {
    _init_properties_FlingCalculator_kt__ornu7o();
    return 386.08781049999993 * density * 160.0 * friction;
  }
  var properties_initialized_FlingCalculator_kt_aw7aky;
  function _init_properties_FlingCalculator_kt__ornu7o() {
    if (!properties_initialized_FlingCalculator_kt_aw7aky) {
      properties_initialized_FlingCalculator_kt_aw7aky = true;
      // Inline function 'kotlin.math.ln' call
      var tmp = Math.log(0.78);
      // Inline function 'kotlin.math.ln' call
      DecelerationRate = tmp / Math.log(0.9);
    }
  }
  function splineBasedDecay(density) {
    return generateDecayAnimationSpec(new SplineBasedFloatDecayAnimationSpec(density));
  }
  function FlingResult(distanceCoefficient, velocityCoefficient) {
    this.v81_1 = distanceCoefficient;
    this.w81_1 = velocityCoefficient;
  }
  protoOf(FlingResult).toString = function () {
    return 'FlingResult(distanceCoefficient=' + this.v81_1 + ', velocityCoefficient=' + this.w81_1 + ')';
  };
  protoOf(FlingResult).hashCode = function () {
    var result = getNumberHashCode(this.v81_1);
    result = imul(result, 31) + getNumberHashCode(this.w81_1) | 0;
    return result;
  };
  protoOf(FlingResult).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FlingResult))
      return false;
    var tmp0_other_with_cast = other instanceof FlingResult ? other : THROW_CCE();
    if (!equals(this.v81_1, tmp0_other_with_cast.v81_1))
      return false;
    if (!equals(this.w81_1, tmp0_other_with_cast.w81_1))
      return false;
    return true;
  };
  function AndroidFlingSpline() {
    AndroidFlingSpline_instance = this;
    this.n81_1 = 100;
    this.o81_1 = new Float32Array(101);
    this.p81_1 = new Float32Array(101);
    computeSplineInfo(this.o81_1, this.p81_1, 100);
  }
  protoOf(AndroidFlingSpline).x81 = function (time) {
    var index = numberToInt(100 * time);
    var distanceCoef = 1.0;
    var velocityCoef = 0.0;
    if (index < 100) {
      var tInf = index / 100;
      var tSup = (index + 1 | 0) / 100;
      var dInf = this.o81_1[index];
      var dSup = this.o81_1[index + 1 | 0];
      velocityCoef = (dSup - dInf) / (tSup - tInf);
      distanceCoef = dInf + (time - tInf) * velocityCoef;
    }
    return new FlingResult(distanceCoef, velocityCoef);
  };
  protoOf(AndroidFlingSpline).q81 = function (velocity, friction) {
    // Inline function 'kotlin.math.ln' call
    // Inline function 'kotlin.math.abs' call
    var x = 0.35 * Math.abs(velocity) / friction;
    return Math.log(x);
  };
  var AndroidFlingSpline_instance;
  function AndroidFlingSpline_getInstance() {
    if (AndroidFlingSpline_instance == null)
      new AndroidFlingSpline();
    return AndroidFlingSpline_instance;
  }
  function computeSplineInfo(splinePositions, splineTimes, nbSamples) {
    var xMin = 0.0;
    var yMin = 0.0;
    var inductionVariable = 0;
    if (inductionVariable < nbSamples)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var alpha = i / nbSamples;
        var xMax = 1.0;
        var x;
        var tx;
        var coef;
        $l$loop: while (true) {
          x = xMin + (xMax - xMin) / 2.0;
          coef = 3.0 * x * (1.0 - x);
          tx = coef * ((1.0 - x) * 0.175 + x * 0.35000002) + x * x * x;
          // Inline function 'kotlin.math.abs' call
          var x_0 = tx - alpha;
          if (Math.abs(x_0) < 1.0E-5)
            break $l$loop;
          if (tx > alpha)
            xMax = x;
          else
            xMin = x;
        }
        splinePositions[i] = coef * ((1.0 - x) * 0.5 + x) + x * x * x;
        var yMax = 1.0;
        var y;
        var dy;
        $l$loop_0: while (true) {
          y = yMin + (yMax - yMin) / 2.0;
          coef = 3.0 * y * (1.0 - y);
          dy = coef * ((1.0 - y) * 0.5 + y) + y * y * y;
          // Inline function 'kotlin.math.abs' call
          var x_1 = dy - alpha;
          if (Math.abs(x_1) < 1.0E-5)
            break $l$loop_0;
          if (dy > alpha)
            yMax = y;
          else
            yMin = y;
        }
        splineTimes[i] = coef * ((1.0 - y) * 0.175 + y * 0.35000002) + y * y * y;
      }
       while (inductionVariable < nbSamples);
    splineTimes[nbSamples] = 1.0;
    splinePositions[nbSamples] = splineTimes[nbSamples];
  }
  function flingDistance($this, startVelocity) {
    var tmp = $this.c82_1.a82(startVelocity);
    // Inline function 'kotlin.math.sign' call
    return tmp * sign(startVelocity);
  }
  function SplineBasedFloatDecayAnimationSpec(density) {
    this.c82_1 = new FlingCalculator(get_platformFlingScrollFriction(), density);
  }
  protoOf(SplineBasedFloatDecayAnimationSpec).m7j = function () {
    return 0.0;
  };
  protoOf(SplineBasedFloatDecayAnimationSpec).n7l = function (initialValue, initialVelocity) {
    return initialValue + flingDistance(this, initialVelocity);
  };
  protoOf(SplineBasedFloatDecayAnimationSpec).k7l = function (playTimeNanos, initialValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(new Long(1000000, 0));
    return initialValue + this.c82_1.b82(initialVelocity).u81(playTimeMillis);
  };
  protoOf(SplineBasedFloatDecayAnimationSpec).l7l = function (initialValue, initialVelocity) {
    return this.c82_1.z81(initialVelocity).w9(new Long(1000000, 0));
  };
  protoOf(SplineBasedFloatDecayAnimationSpec).m7l = function (playTimeNanos, initialValue, initialVelocity) {
    var playTimeMillis = playTimeNanos.v9(new Long(1000000, 0));
    return this.c82_1.b82(initialVelocity).y81(playTimeMillis);
  };
  function get_platformFlingScrollFriction() {
    return platformFlingScrollFriction;
  }
  var platformFlingScrollFriction;
  function rememberSplineBasedDecay($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-1977478709);
    sourceInformation($composer_0, 'C(rememberSplineBasedDecay)30@1256L7,31@1275L114:SplineBasedDecayAnimationSpec.js.kt#xbi5r1');
    if (isTraceInProgress()) {
      traceEventStart(-1977478709, $changed, -1, 'androidx.compose.animation.rememberSplineBasedDecay (SplineBasedDecayAnimationSpec.js.kt:27)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalDensity();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_0);
    sourceInformationMarkerEnd($composer_1);
    var density = tmp0;
    var tmp1_remember$arg$0 = density.x35();
    $composer_0.j1l(2068402978);
    sourceInformation($composer_0, 'CC(remember):SplineBasedDecayAnimationSpec.js.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = $composer_0.l1y(tmp1_remember$arg$0);
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance().w1r_1) {
      // Inline function 'androidx.compose.animation.rememberSplineBasedDecay.<anonymous>' call
      var value = generateDecayAnimationSpec(new SplineBasedFloatDecayAnimationSpec(density));
      $composer_0.d1z(value);
      tmp = value;
    } else {
      tmp = it;
    }
    var tmp_0 = tmp;
    var tmp2_group = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    $composer_0.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp2_group;
  }
  //region block: init
  platformFlingScrollFriction = 0.015;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = SplineBasedFloatDecayAnimationSpec;
  _.$_$.b = rememberSplineBasedDecay;
  _.$_$.c = splineBasedDecay;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-animation-animation.js.map
