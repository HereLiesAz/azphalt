(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-geometry'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-geometry'.");
    }
    root['compose-multiplatform-core-compose-ui-ui-geometry'] = factory(typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-ui-ui-geometry'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var floatFromBits = kotlin_kotlin.$_$.fa;
  var Long = kotlin_kotlin.$_$.ve;
  var protoOf = kotlin_kotlin.$_$.ib;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var classMeta = kotlin_kotlin.$_$.aa;
  var VOID = kotlin_kotlin.$_$.g;
  var toRawBits = kotlin_kotlin.$_$.mg;
  var toLong = kotlin_kotlin.$_$.lb;
  var numberToInt = kotlin_kotlin.$_$.eb;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var isFinite = kotlin_kotlin.$_$.xf;
  var getNumberHashCode = kotlin_kotlin.$_$.ia;
  var equals = kotlin_kotlin.$_$.da;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(CornerRadius, 'CornerRadius', classMeta);
  setMetadataFor(MutableRect, 'MutableRect', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(Offset, 'Offset', classMeta);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(Rect, 'Rect', classMeta);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(RoundRect, 'RoundRect', classMeta);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(Size, 'Size', classMeta);
  //endregion
  function _CornerRadius___init__impl__ojmabe(packedValue) {
    return packedValue;
  }
  function _CornerRadius___get_packedValue__impl__okv4jq($this) {
    return $this;
  }
  function _CornerRadius___get_x__impl__1594cn($this) {
    // Inline function 'androidx.compose.ui.util.unpackFloat1' call
    // Inline function 'kotlin.fromBits' call
    var bits = _CornerRadius___get_packedValue__impl__okv4jq($this).lb(32).ea();
    return floatFromBits(bits);
  }
  function _CornerRadius___get_y__impl__tyvleu($this) {
    // Inline function 'androidx.compose.ui.util.unpackFloat2' call
    // Inline function 'kotlin.fromBits' call
    var bits = _CornerRadius___get_packedValue__impl__okv4jq($this).nb(new Long(-1, 0)).ea();
    return floatFromBits(bits);
  }
  function Companion() {
    Companion_instance = this;
    this.n33_1 = CornerRadius_0(0.0);
  }
  var Companion_instance;
  function Companion_getInstance() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function CornerRadius__toString_impl_m3k4zq($this) {
    var tmp;
    if (_CornerRadius___get_x__impl__1594cn($this) === _CornerRadius___get_y__impl__tyvleu($this)) {
      tmp = 'CornerRadius.circular(' + toStringAsFixed(_CornerRadius___get_x__impl__1594cn($this), 1) + ')';
    } else {
      tmp = 'CornerRadius.elliptical(' + toStringAsFixed(_CornerRadius___get_x__impl__1594cn($this), 1) + ', ' + toStringAsFixed(_CornerRadius___get_y__impl__tyvleu($this), 1) + ')';
    }
    return tmp;
  }
  function CornerRadius__hashCode_impl_r6e06j($this) {
    return $this.hashCode();
  }
  function CornerRadius__equals_impl_776hdl($this, other) {
    if (!(other instanceof CornerRadius))
      return false;
    var tmp0_other_with_cast = other instanceof CornerRadius ? other.o33_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function CornerRadius(packedValue) {
    Companion_getInstance();
    this.o33_1 = packedValue;
  }
  protoOf(CornerRadius).toString = function () {
    return CornerRadius__toString_impl_m3k4zq(this.o33_1);
  };
  protoOf(CornerRadius).hashCode = function () {
    return CornerRadius__hashCode_impl_r6e06j(this.o33_1);
  };
  protoOf(CornerRadius).equals = function (other) {
    return CornerRadius__equals_impl_776hdl(this.o33_1, other);
  };
  function CornerRadius_0(x, y) {
    y = y === VOID ? x : y;
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1 = toLong(toRawBits(x));
    var v2 = toLong(toRawBits(y));
    var tmp$ret$0 = v1.kb(32).ob(v2.nb(new Long(-1, 0)));
    return _CornerRadius___init__impl__ojmabe(tmp$ret$0);
  }
  function toStringAsFixed(_this__u8e3s4, digits) {
    // Inline function 'kotlin.math.max' call
    var clampedDigits = Math.max(digits, 0);
    // Inline function 'kotlin.math.pow' call
    var pow = Math.pow(10.0, clampedDigits);
    var shifted = _this__u8e3s4 * pow;
    var decimal = shifted - numberToInt(shifted);
    var tmp;
    if (decimal >= 0.5) {
      tmp = numberToInt(shifted) + 1 | 0;
    } else {
      tmp = numberToInt(shifted);
    }
    var roundedShifted = tmp;
    var rounded = roundedShifted / pow;
    var tmp_0;
    if (clampedDigits > 0) {
      tmp_0 = rounded.toString();
    } else {
      tmp_0 = numberToInt(rounded).toString();
    }
    return tmp_0;
  }
  function MutableRect(left, top, right, bottom) {
    this.p33_1 = left;
    this.q33_1 = top;
    this.r33_1 = right;
    this.s33_1 = bottom;
  }
  protoOf(MutableRect).s1t = function () {
    return this.p33_1 >= this.r33_1 ? true : this.q33_1 >= this.s33_1;
  };
  protoOf(MutableRect).t33 = function (left, top, right, bottom) {
    var tmp = this;
    // Inline function 'kotlin.math.max' call
    var b = this.p33_1;
    tmp.p33_1 = Math.max(left, b);
    var tmp_0 = this;
    // Inline function 'kotlin.math.max' call
    var b_0 = this.q33_1;
    tmp_0.q33_1 = Math.max(top, b_0);
    var tmp_1 = this;
    // Inline function 'kotlin.math.min' call
    var b_1 = this.r33_1;
    tmp_1.r33_1 = Math.min(right, b_1);
    var tmp_2 = this;
    // Inline function 'kotlin.math.min' call
    var b_2 = this.s33_1;
    tmp_2.s33_1 = Math.min(bottom, b_2);
  };
  protoOf(MutableRect).toString = function () {
    return 'MutableRect(' + (toStringAsFixed(this.p33_1, 1) + ', ') + (toStringAsFixed(this.q33_1, 1) + ', ') + (toStringAsFixed(this.r33_1, 1) + ', ') + (toStringAsFixed(this.s33_1, 1) + ')');
  };
  function toRect(_this__u8e3s4) {
    return new Rect(_this__u8e3s4.p33_1, _this__u8e3s4.q33_1, _this__u8e3s4.r33_1, _this__u8e3s4.s33_1);
  }
  function _Offset___init__impl__c168vi(packedValue) {
    return packedValue;
  }
  function _Offset___get_packedValue__impl__xh2k8q($this) {
    return $this;
  }
  function _Offset___get_x__impl__xvi35n($this) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!_Offset___get_packedValue__impl__xh2k8q($this).equals(_Offset___get_packedValue__impl__xh2k8q(Companion_getInstance_0().w33_1))) {
      // Inline function 'androidx.compose.ui.geometry.Offset.<get-x>.<anonymous>' call
      var message = 'Offset is unspecified';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'androidx.compose.ui.util.unpackFloat1' call
    // Inline function 'kotlin.fromBits' call
    var bits = _Offset___get_packedValue__impl__xh2k8q($this).lb(32).ea();
    return floatFromBits(bits);
  }
  function _Offset___get_y__impl__8bzhra($this) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!_Offset___get_packedValue__impl__xh2k8q($this).equals(_Offset___get_packedValue__impl__xh2k8q(Companion_getInstance_0().w33_1))) {
      // Inline function 'androidx.compose.ui.geometry.Offset.<get-y>.<anonymous>' call
      var message = 'Offset is unspecified';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'androidx.compose.ui.util.unpackFloat2' call
    // Inline function 'kotlin.fromBits' call
    var bits = _Offset___get_packedValue__impl__xh2k8q($this).nb(new Long(-1, 0)).ea();
    return floatFromBits(bits);
  }
  function Offset__copy_impl_9gtypn($this, x, y) {
    return Offset_0(x, y);
  }
  function Offset__copy$default_impl_bmwjg8($this, x, y, $super) {
    x = x === VOID ? _Offset___get_x__impl__xvi35n($this) : x;
    y = y === VOID ? _Offset___get_y__impl__8bzhra($this) : y;
    var tmp;
    if ($super === VOID) {
      tmp = Offset__copy_impl_9gtypn($this, x, y);
    } else {
      var tmp_0 = $super;
      tmp = (tmp_0 == null ? null : new Offset(tmp_0)).y33.call(new Offset($this), x, y).x33_1;
    }
    return tmp;
  }
  function Companion_0() {
    Companion_instance_0 = this;
    this.u33_1 = Offset_0(0.0, 0.0);
    var tmp = this;
    tmp.v33_1 = Offset_0(Infinity, Infinity);
    var tmp_0 = this;
    tmp_0.w33_1 = Offset_0(NaN, NaN);
  }
  var Companion_instance_0;
  function Companion_getInstance_0() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function Offset__getDistance_impl_pclvxn($this) {
    // Inline function 'kotlin.math.sqrt' call
    var x = _Offset___get_x__impl__xvi35n($this) * _Offset___get_x__impl__xvi35n($this) + _Offset___get_y__impl__8bzhra($this) * _Offset___get_y__impl__8bzhra($this);
    return Math.sqrt(x);
  }
  function Offset__getDistanceSquared_impl_97mhi6($this) {
    return _Offset___get_x__impl__xvi35n($this) * _Offset___get_x__impl__xvi35n($this) + _Offset___get_y__impl__8bzhra($this) * _Offset___get_y__impl__8bzhra($this);
  }
  function Offset__unaryMinus_impl_ssu2iv($this) {
    return Offset_0(-_Offset___get_x__impl__xvi35n($this), -_Offset___get_y__impl__8bzhra($this));
  }
  function Offset__minus_impl_hoj2c0($this, other) {
    return Offset_0(_Offset___get_x__impl__xvi35n($this) - _Offset___get_x__impl__xvi35n(other), _Offset___get_y__impl__8bzhra($this) - _Offset___get_y__impl__8bzhra(other));
  }
  function Offset__plus_impl_c78cg0($this, other) {
    return Offset_0(_Offset___get_x__impl__xvi35n($this) + _Offset___get_x__impl__xvi35n(other), _Offset___get_y__impl__8bzhra($this) + _Offset___get_y__impl__8bzhra(other));
  }
  function Offset__times_impl_jz1mli($this, operand) {
    return Offset_0(_Offset___get_x__impl__xvi35n($this) * operand, _Offset___get_y__impl__8bzhra($this) * operand);
  }
  function Offset__div_impl_eaxtg1($this, operand) {
    return Offset_0(_Offset___get_x__impl__xvi35n($this) / operand, _Offset___get_y__impl__8bzhra($this) / operand);
  }
  function Offset__toString_impl_4ffbou($this) {
    var tmp;
    if (get_isSpecified($this)) {
      tmp = 'Offset(' + toStringAsFixed(_Offset___get_x__impl__xvi35n($this), 1) + ', ' + toStringAsFixed(_Offset___get_y__impl__8bzhra($this), 1) + ')';
    } else {
      tmp = 'Offset.Unspecified';
    }
    return tmp;
  }
  function Offset__hashCode_impl_hbql41($this) {
    return $this.hashCode();
  }
  function Offset__equals_impl_exf2yj($this, other) {
    if (!(other instanceof Offset))
      return false;
    var tmp0_other_with_cast = other instanceof Offset ? other.x33_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function Offset(packedValue) {
    Companion_getInstance_0();
    this.x33_1 = packedValue;
  }
  protoOf(Offset).toString = function () {
    return Offset__toString_impl_4ffbou(this.x33_1);
  };
  protoOf(Offset).hashCode = function () {
    return Offset__hashCode_impl_hbql41(this.x33_1);
  };
  protoOf(Offset).equals = function (other) {
    return Offset__equals_impl_exf2yj(this.x33_1, other);
  };
  function Offset_0(x, y) {
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1 = toLong(toRawBits(x));
    var v2 = toLong(toRawBits(y));
    var tmp$ret$0 = v1.kb(32).ob(v2.nb(new Long(-1, 0)));
    return _Offset___init__impl__c168vi(tmp$ret$0);
  }
  function get_isFinite(_this__u8e3s4) {
    return isFinite(_Offset___get_x__impl__xvi35n(_this__u8e3s4)) ? isFinite(_Offset___get_y__impl__8bzhra(_this__u8e3s4)) : false;
  }
  function get_isSpecified(_this__u8e3s4) {
    return !_Offset___get_packedValue__impl__xh2k8q(_this__u8e3s4).equals(_Offset___get_packedValue__impl__xh2k8q(Companion_getInstance_0().w33_1));
  }
  function Companion_1() {
    Companion_instance_1 = this;
    this.z33_1 = new Rect(0.0, 0.0, 0.0, 0.0);
  }
  var Companion_instance_1;
  function Companion_getInstance_1() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function Rect(left, top, right, bottom) {
    Companion_getInstance_1();
    this.a34_1 = left;
    this.b34_1 = top;
    this.c34_1 = right;
    this.d34_1 = bottom;
  }
  protoOf(Rect).e34 = function () {
    return this.c34_1 - this.a34_1;
  };
  protoOf(Rect).f34 = function () {
    return this.d34_1 - this.b34_1;
  };
  protoOf(Rect).g34 = function () {
    return Size_0(this.e34(), this.f34());
  };
  protoOf(Rect).h34 = function (offset) {
    return new Rect(this.a34_1 + _Offset___get_x__impl__xvi35n(offset), this.b34_1 + _Offset___get_y__impl__8bzhra(offset), this.c34_1 + _Offset___get_x__impl__xvi35n(offset), this.d34_1 + _Offset___get_y__impl__8bzhra(offset));
  };
  protoOf(Rect).i34 = function (translateX, translateY) {
    return new Rect(this.a34_1 + translateX, this.b34_1 + translateY, this.c34_1 + translateX, this.d34_1 + translateY);
  };
  protoOf(Rect).j34 = function (other) {
    // Inline function 'kotlin.math.max' call
    var a = this.a34_1;
    var b = other.a34_1;
    var tmp = Math.max(a, b);
    // Inline function 'kotlin.math.max' call
    var a_0 = this.b34_1;
    var b_0 = other.b34_1;
    var tmp_0 = Math.max(a_0, b_0);
    // Inline function 'kotlin.math.min' call
    var a_1 = this.c34_1;
    var b_1 = other.c34_1;
    var tmp_1 = Math.min(a_1, b_1);
    // Inline function 'kotlin.math.min' call
    var a_2 = this.d34_1;
    var b_2 = other.d34_1;
    var tmp$ret$3 = Math.min(a_2, b_2);
    return new Rect(tmp, tmp_0, tmp_1, tmp$ret$3);
  };
  protoOf(Rect).k34 = function () {
    return Offset_0(this.a34_1, this.b34_1);
  };
  protoOf(Rect).l34 = function (offset) {
    return ((_Offset___get_x__impl__xvi35n(offset) >= this.a34_1 ? _Offset___get_x__impl__xvi35n(offset) < this.c34_1 : false) ? _Offset___get_y__impl__8bzhra(offset) >= this.b34_1 : false) ? _Offset___get_y__impl__8bzhra(offset) < this.d34_1 : false;
  };
  protoOf(Rect).toString = function () {
    return 'Rect.fromLTRB(' + (toStringAsFixed(this.a34_1, 1) + ', ') + (toStringAsFixed(this.b34_1, 1) + ', ') + (toStringAsFixed(this.c34_1, 1) + ', ') + (toStringAsFixed(this.d34_1, 1) + ')');
  };
  protoOf(Rect).hashCode = function () {
    var result = getNumberHashCode(this.a34_1);
    result = imul(result, 31) + getNumberHashCode(this.b34_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.c34_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.d34_1) | 0;
    return result;
  };
  protoOf(Rect).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Rect))
      return false;
    var tmp0_other_with_cast = other instanceof Rect ? other : THROW_CCE();
    if (!equals(this.a34_1, tmp0_other_with_cast.a34_1))
      return false;
    if (!equals(this.b34_1, tmp0_other_with_cast.b34_1))
      return false;
    if (!equals(this.c34_1, tmp0_other_with_cast.c34_1))
      return false;
    if (!equals(this.d34_1, tmp0_other_with_cast.d34_1))
      return false;
    return true;
  };
  function Rect_0(offset, size) {
    return new Rect(_Offset___get_x__impl__xvi35n(offset), _Offset___get_y__impl__8bzhra(offset), _Offset___get_x__impl__xvi35n(offset) + _Size___get_width__impl__58y75t(size), _Offset___get_y__impl__8bzhra(offset) + _Size___get_height__impl__a04p02(size));
  }
  function Companion_2() {
    Companion_instance_2 = this;
    this.m34_1 = RoundRect_1(0.0, 0.0, 0.0, 0.0, Companion_getInstance().n33_1);
  }
  var Companion_instance_2;
  function Companion_getInstance_2() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function RoundRect(left, top, right, bottom, topLeftCornerRadius, topRightCornerRadius, bottomRightCornerRadius, bottomLeftCornerRadius) {
    Companion_getInstance_2();
    topLeftCornerRadius = topLeftCornerRadius === VOID ? Companion_getInstance().n33_1 : topLeftCornerRadius;
    topRightCornerRadius = topRightCornerRadius === VOID ? Companion_getInstance().n33_1 : topRightCornerRadius;
    bottomRightCornerRadius = bottomRightCornerRadius === VOID ? Companion_getInstance().n33_1 : bottomRightCornerRadius;
    bottomLeftCornerRadius = bottomLeftCornerRadius === VOID ? Companion_getInstance().n33_1 : bottomLeftCornerRadius;
    this.n34_1 = left;
    this.o34_1 = top;
    this.p34_1 = right;
    this.q34_1 = bottom;
    this.r34_1 = topLeftCornerRadius;
    this.s34_1 = topRightCornerRadius;
    this.t34_1 = bottomRightCornerRadius;
    this.u34_1 = bottomLeftCornerRadius;
    this.v34_1 = null;
  }
  protoOf(RoundRect).e34 = function () {
    return this.p34_1 - this.n34_1;
  };
  protoOf(RoundRect).f34 = function () {
    return this.q34_1 - this.o34_1;
  };
  protoOf(RoundRect).toString = function () {
    var tlRadius = this.r34_1;
    var trRadius = this.s34_1;
    var brRadius = this.t34_1;
    var blRadius = this.u34_1;
    var rect = toStringAsFixed(this.n34_1, 1) + ', ' + (toStringAsFixed(this.o34_1, 1) + ', ') + (toStringAsFixed(this.p34_1, 1) + ', ') + toStringAsFixed(this.q34_1, 1);
    if ((equals(tlRadius, trRadius) ? equals(trRadius, brRadius) : false) ? equals(brRadius, blRadius) : false) {
      if (_CornerRadius___get_x__impl__1594cn(tlRadius) === _CornerRadius___get_y__impl__tyvleu(tlRadius)) {
        return 'RoundRect(rect=' + rect + ', radius=' + toStringAsFixed(_CornerRadius___get_x__impl__1594cn(tlRadius), 1) + ')';
      }
      return 'RoundRect(rect=' + rect + ', x=' + toStringAsFixed(_CornerRadius___get_x__impl__1594cn(tlRadius), 1) + ', ' + ('y=' + toStringAsFixed(_CornerRadius___get_y__impl__tyvleu(tlRadius), 1) + ')');
    }
    return 'RoundRect(' + ('rect=' + rect + ', ') + ('topLeft=' + new CornerRadius(tlRadius) + ', ') + ('topRight=' + new CornerRadius(trRadius) + ', ') + ('bottomRight=' + new CornerRadius(brRadius) + ', ') + ('bottomLeft=' + new CornerRadius(blRadius) + ')');
  };
  protoOf(RoundRect).hashCode = function () {
    var result = getNumberHashCode(this.n34_1);
    result = imul(result, 31) + getNumberHashCode(this.o34_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.p34_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.q34_1) | 0;
    result = imul(result, 31) + CornerRadius__hashCode_impl_r6e06j(this.r34_1) | 0;
    result = imul(result, 31) + CornerRadius__hashCode_impl_r6e06j(this.s34_1) | 0;
    result = imul(result, 31) + CornerRadius__hashCode_impl_r6e06j(this.t34_1) | 0;
    result = imul(result, 31) + CornerRadius__hashCode_impl_r6e06j(this.u34_1) | 0;
    return result;
  };
  protoOf(RoundRect).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RoundRect))
      return false;
    var tmp0_other_with_cast = other instanceof RoundRect ? other : THROW_CCE();
    if (!equals(this.n34_1, tmp0_other_with_cast.n34_1))
      return false;
    if (!equals(this.o34_1, tmp0_other_with_cast.o34_1))
      return false;
    if (!equals(this.p34_1, tmp0_other_with_cast.p34_1))
      return false;
    if (!equals(this.q34_1, tmp0_other_with_cast.q34_1))
      return false;
    if (!equals(this.r34_1, tmp0_other_with_cast.r34_1))
      return false;
    if (!equals(this.s34_1, tmp0_other_with_cast.s34_1))
      return false;
    if (!equals(this.t34_1, tmp0_other_with_cast.t34_1))
      return false;
    if (!equals(this.u34_1, tmp0_other_with_cast.u34_1))
      return false;
    return true;
  };
  function RoundRect_0(rect, topLeft, topRight, bottomRight, bottomLeft) {
    topLeft = topLeft === VOID ? Companion_getInstance().n33_1 : topLeft;
    topRight = topRight === VOID ? Companion_getInstance().n33_1 : topRight;
    bottomRight = bottomRight === VOID ? Companion_getInstance().n33_1 : bottomRight;
    bottomLeft = bottomLeft === VOID ? Companion_getInstance().n33_1 : bottomLeft;
    return new RoundRect(rect.a34_1, rect.b34_1, rect.c34_1, rect.d34_1, topLeft, topRight, bottomRight, bottomLeft);
  }
  function RoundRect_1(left, top, right, bottom, cornerRadius) {
    return RoundRect_2(left, top, right, bottom, _CornerRadius___get_x__impl__1594cn(cornerRadius), _CornerRadius___get_y__impl__tyvleu(cornerRadius));
  }
  function RoundRect_2(left, top, right, bottom, radiusX, radiusY) {
    var radius = CornerRadius_0(radiusX, radiusY);
    return new RoundRect(left, top, right, bottom, radius, radius, radius, radius);
  }
  function _Size___init__impl__aywn0g(packedValue) {
    return packedValue;
  }
  function _Size___get_packedValue__impl__7rlt1o($this) {
    return $this;
  }
  function _Size___get_width__impl__58y75t($this) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!_Size___get_packedValue__impl__7rlt1o($this).equals(_Size___get_packedValue__impl__7rlt1o(Companion_getInstance_3().x34_1))) {
      // Inline function 'androidx.compose.ui.geometry.Size.<get-width>.<anonymous>' call
      var message = 'Size is unspecified';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'androidx.compose.ui.util.unpackFloat1' call
    // Inline function 'kotlin.fromBits' call
    var bits = _Size___get_packedValue__impl__7rlt1o($this).lb(32).ea();
    return floatFromBits(bits);
  }
  function _Size___get_height__impl__a04p02($this) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!_Size___get_packedValue__impl__7rlt1o($this).equals(_Size___get_packedValue__impl__7rlt1o(Companion_getInstance_3().x34_1))) {
      // Inline function 'androidx.compose.ui.geometry.Size.<get-height>.<anonymous>' call
      var message = 'Size is unspecified';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'androidx.compose.ui.util.unpackFloat2' call
    // Inline function 'kotlin.fromBits' call
    var bits = _Size___get_packedValue__impl__7rlt1o($this).nb(new Long(-1, 0)).ea();
    return floatFromBits(bits);
  }
  function Size__copy_impl_jrw2sp($this, width, height) {
    return Size_0(width, height);
  }
  function Size__copy$default_impl_nrzrkq($this, width, height, $super) {
    width = width === VOID ? _Size___get_width__impl__58y75t($this) : width;
    height = height === VOID ? _Size___get_height__impl__a04p02($this) : height;
    var tmp;
    if ($super === VOID) {
      tmp = Size__copy_impl_jrw2sp($this, width, height);
    } else {
      var tmp_0 = $super;
      tmp = (tmp_0 == null ? null : new Size(tmp_0)).z34.call(new Size($this), width, height).y34_1;
    }
    return tmp;
  }
  function Companion_3() {
    Companion_instance_3 = this;
    this.w34_1 = Size_0(0.0, 0.0);
    var tmp = this;
    tmp.x34_1 = Size_0(NaN, NaN);
  }
  var Companion_instance_3;
  function Companion_getInstance_3() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function _Size___get_minDimension__impl__4iso0r($this) {
    // Inline function 'kotlin.math.min' call
    // Inline function 'kotlin.math.absoluteValue' call
    var this_0 = _Size___get_width__impl__58y75t($this);
    var a = Math.abs(this_0);
    // Inline function 'kotlin.math.absoluteValue' call
    var this_1 = _Size___get_height__impl__a04p02($this);
    var b = Math.abs(this_1);
    return Math.min(a, b);
  }
  function Size__toString_impl_o87ni8($this) {
    var tmp;
    // Inline function 'androidx.compose.ui.geometry.isSpecified' call
    if (!_Size___get_packedValue__impl__7rlt1o($this).equals(_Size___get_packedValue__impl__7rlt1o(Companion_getInstance_3().x34_1))) {
      tmp = 'Size(' + toStringAsFixed(_Size___get_width__impl__58y75t($this), 1) + ', ' + toStringAsFixed(_Size___get_height__impl__a04p02($this), 1) + ')';
    } else {
      tmp = 'Size.Unspecified';
    }
    return tmp;
  }
  function Size__hashCode_impl_2h1qpd($this) {
    return $this.hashCode();
  }
  function Size__equals_impl_gzcc1f($this, other) {
    if (!(other instanceof Size))
      return false;
    var tmp0_other_with_cast = other instanceof Size ? other.y34_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function Size(packedValue) {
    Companion_getInstance_3();
    this.y34_1 = packedValue;
  }
  protoOf(Size).toString = function () {
    return Size__toString_impl_o87ni8(this.y34_1);
  };
  protoOf(Size).hashCode = function () {
    return Size__hashCode_impl_2h1qpd(this.y34_1);
  };
  protoOf(Size).equals = function (other) {
    return Size__equals_impl_gzcc1f(this.y34_1, other);
  };
  function toRect_0(_this__u8e3s4) {
    return Rect_0(Companion_getInstance_0().u33_1, _this__u8e3s4);
  }
  function Size_0(width, height) {
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1 = toLong(toRawBits(width));
    var v2 = toLong(toRawBits(height));
    var tmp$ret$0 = v1.kb(32).ob(v2.nb(new Long(-1, 0)));
    return _Size___init__impl__aywn0g(tmp$ret$0);
  }
  function get_center(_this__u8e3s4) {
    return Offset_0(_Size___get_width__impl__58y75t(_this__u8e3s4) / 2.0, _Size___get_height__impl__a04p02(_this__u8e3s4) / 2.0);
  }
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = CornerRadius_0;
  _.$_$.b = MutableRect;
  _.$_$.c = Offset_0;
  _.$_$.d = Offset;
  _.$_$.e = Rect_0;
  _.$_$.f = Rect;
  _.$_$.g = RoundRect_0;
  _.$_$.h = Size_0;
  _.$_$.i = Size;
  _.$_$.j = get_center;
  _.$_$.k = get_isFinite;
  _.$_$.l = toRect;
  _.$_$.m = toRect_0;
  _.$_$.n = _CornerRadius___get_x__impl__1594cn;
  _.$_$.o = _CornerRadius___get_y__impl__tyvleu;
  _.$_$.p = Offset__div_impl_eaxtg1;
  _.$_$.q = Offset__getDistanceSquared_impl_97mhi6;
  _.$_$.r = Offset__getDistance_impl_pclvxn;
  _.$_$.s = Offset__hashCode_impl_hbql41;
  _.$_$.t = Offset__minus_impl_hoj2c0;
  _.$_$.u = Offset__plus_impl_c78cg0;
  _.$_$.v = Offset__times_impl_jz1mli;
  _.$_$.w = Offset__unaryMinus_impl_ssu2iv;
  _.$_$.x = _Offset___get_x__impl__xvi35n;
  _.$_$.y = _Offset___get_y__impl__8bzhra;
  _.$_$.z = Size__hashCode_impl_2h1qpd;
  _.$_$.a1 = _Size___get_height__impl__a04p02;
  _.$_$.b1 = _Size___get_minDimension__impl__4iso0r;
  _.$_$.c1 = _Size___get_packedValue__impl__7rlt1o;
  _.$_$.d1 = _Size___get_width__impl__58y75t;
  _.$_$.e1 = Offset__copy$default_impl_bmwjg8;
  _.$_$.f1 = Size__copy$default_impl_nrzrkq;
  _.$_$.g1 = Companion_getInstance_0;
  _.$_$.h1 = Companion_getInstance_1;
  _.$_$.i1 = Companion_getInstance_3;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-ui-ui-geometry.js.map
