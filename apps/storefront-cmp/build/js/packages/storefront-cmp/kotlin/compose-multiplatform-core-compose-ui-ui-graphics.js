(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui-geometry.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './skiko-kjs.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./skiko-kjs.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-graphics'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-graphics'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-graphics'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-graphics'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-graphics'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-graphics'.");
    }
    if (typeof this['skiko-kjs'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-graphics'. Its dependency 'skiko-kjs' was not found. Please, check whether 'skiko-kjs' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-graphics'.");
    }
    root['compose-multiplatform-core-compose-ui-ui-graphics'] = factory(typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-ui-ui-graphics'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui-geometry'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['skiko-kjs']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_skiko_skiko) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var sign = Math.sign;
  var protoOf = kotlin_kotlin.$_$.jb;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var classMeta = kotlin_kotlin.$_$.ba;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var VOID = kotlin_kotlin.$_$.g;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.j1;
  var Size__isEmpty_impl_o9ye97 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.b1;
  var equals = kotlin_kotlin.$_$.ea;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.x;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.e1;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.y;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var hashCode = kotlin_kotlin.$_$.ma;
  var Offset__hashCode_impl_hbql41 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.s;
  var Offset_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d;
  var get_isFinite = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.k;
  var interfaceMeta = kotlin_kotlin.$_$.oa;
  var Long = kotlin_kotlin.$_$.we;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.i3;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.j3;
  var ulongToDouble = kotlin_kotlin.$_$.sg;
  var ULong__hashCode_impl_6hv2lb = kotlin_kotlin.$_$.k3;
  var toLong = kotlin_kotlin.$_$.mb;
  var toString = kotlin_kotlin.$_$.ob;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var numberToInt = kotlin_kotlin.$_$.fb;
  var toRawBits = kotlin_kotlin.$_$.ng;
  var toShort = kotlin_kotlin.$_$.nb;
  var floatFromBits = kotlin_kotlin.$_$.ga;
  var isFinite = kotlin_kotlin.$_$.yf;
  var trimIndent = kotlin_kotlin.$_$.ge;
  var get_PI = kotlin_kotlin.$_$.pb;
  var _CornerRadius___get_x__impl__1594cn = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.n;
  var _CornerRadius___get_y__impl__tyvleu = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.o;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.eg;
  var CornerRadius = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h1;
  var toRect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.m;
  var getNumberHashCode = kotlin_kotlin.$_$.ja;
  var charSequenceLength = kotlin_kotlin.$_$.z9;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var getStringHashCode = kotlin_kotlin.$_$.la;
  var withSign = kotlin_kotlin.$_$.yb;
  var compareTo = kotlin_kotlin.$_$.ca;
  var objectCreate = kotlin_kotlin.$_$.hb;
  var coerceIn = kotlin_kotlin.$_$.gc;
  var arrayCopy = kotlin_kotlin.$_$.p5;
  var coerceIn_0 = kotlin_kotlin.$_$.fc;
  var contentEquals = kotlin_kotlin.$_$.z5;
  var contentHashCode = kotlin_kotlin.$_$.b6;
  var toBits = kotlin_kotlin.$_$.lg;
  var isNaN_0 = kotlin_kotlin.$_$.bg;
  var LayoutDirection_Ltr_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.k1;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var Size__hashCode_impl_2h1qpd = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.z;
  var toPx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d;
  var toPx_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e;
  var roundToPx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c;
  var toDp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m;
  var toSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f;
  var Density = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g;
  var get_center = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.j;
  var _Size___get_minDimension__impl__4iso0r = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c1;
  var Density_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.h;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.j2;
  var BlendMode_SRC_OVER_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.z1;
  var BlendMode_LUMINOSITY_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.o1;
  var BlendMode_COLOR_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.c1;
  var BlendMode_SATURATION_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.t1;
  var BlendMode_HUE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.m1;
  var BlendMode_MULTIPLY_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.q1;
  var BlendMode_EXCLUSION_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.k1;
  var BlendMode_DIFFERENCE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.e1;
  var BlendMode_SOFT_LIGHT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.v1;
  var BlendMode_HARD_LIGHT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.l1;
  var BlendMode_COLOR_BURN_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.a1;
  var BlendMode_COLOR_DODGE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.b1;
  var BlendMode_LIGHTEN_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.n1;
  var BlendMode_DARKEN_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.d1;
  var BlendMode_OVERLAY_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.r1;
  var BlendMode_SCREEN_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.u1;
  var BlendMode_MODULATE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.p1;
  var BlendMode_PLUS_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.s1;
  var BlendMode_XOR_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.b2;
  var BlendMode_DST_ATOP_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.f1;
  var BlendMode_SRC_ATOP_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.w1;
  var BlendMode_DST_OUT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.h1;
  var BlendMode_SRC_OUT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.y1;
  var BlendMode_DST_IN_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.g1;
  var BlendMode_SRC_IN_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.x1;
  var BlendMode_DST_OVER_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.i1;
  var BlendMode_DST_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.j1;
  var BlendMode_SRC_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.a2;
  var BlendMode_CLEAR_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.z;
  var Matrix33 = kotlin_org_jetbrains_skiko_skiko.$_$.n4;
  var Companion_instance = kotlin_org_jetbrains_skiko_skiko.$_$.z3;
  var Companion_instance_0 = kotlin_org_jetbrains_skiko_skiko.$_$.y3;
  var Rect = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.f;
  var ClipMode_INTERSECT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.d2;
  var ClipMode_DIFFERENCE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.c2;
  var Matrix44 = kotlin_org_jetbrains_skiko_skiko.$_$.o4;
  var PaintMode_FILL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.r2;
  var PaintMode_STROKE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.s2;
  var PaintStrokeCap_BUTT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.t2;
  var PaintStrokeCap_SQUARE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.v2;
  var PaintStrokeCap_ROUND_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.u2;
  var PaintStrokeJoin_MITER_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.x2;
  var PaintStrokeJoin_BEVEL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.w2;
  var PaintStrokeJoin_ROUND_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.y2;
  var Paint_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.l3;
  var PathOp_XOR_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.g3;
  var PathOp_REVERSE_DIFFERENCE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.e3;
  var PathOp_UNION_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.f3;
  var PathOp_INTERSECT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.d3;
  var PathOp_DIFFERENCE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.c3;
  var Path_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.m3;
  var PathFillMode_WINDING_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.b3;
  var PathFillMode_EVEN_ODD_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.a3;
  var PathDirection_COUNTER_CLOCKWISE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.z2;
  var Companion_getInstance_1 = kotlin_org_jetbrains_skiko_skiko.$_$.w3;
  var Companion_getInstance_2 = kotlin_org_jetbrains_skiko_skiko.$_$.x3;
  var UnsupportedOperationException_init_$Create$_0 = kotlin_kotlin.$_$.k2;
  var Companion_getInstance_3 = kotlin_org_jetbrains_skiko_skiko.$_$.a4;
  var toFloatArray = kotlin_kotlin.$_$.p8;
  var GradientStyle = kotlin_org_jetbrains_skiko_skiko.$_$.m4;
  var FilterTileMode_CLAMP_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.e2;
  var FilterTileMode_DECAL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.f2;
  var FilterTileMode_MIRROR_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.g2;
  var FilterTileMode_REPEAT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.h2;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(BlendMode, 'BlendMode', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(Brush, 'Brush', classMeta);
  setMetadataFor(ShaderBrush, 'ShaderBrush', classMeta, Brush);
  setMetadataFor(SolidColor, 'SolidColor', classMeta, Brush);
  setMetadataFor(LinearGradient, 'LinearGradient', classMeta, ShaderBrush);
  function clipRect(rect, clipOp) {
    return this.g3s(rect.a34_1, rect.b34_1, rect.c34_1, rect.d34_1, clipOp);
  }
  function clipRect$default(rect, clipOp, $super) {
    clipOp = clipOp === VOID ? Companion_getInstance_6().j3s_1 : clipOp;
    var tmp;
    if ($super === VOID) {
      this.f3s(rect, clipOp);
      tmp = Unit_instance;
    } else {
      clipRect(rect, clipOp);
      tmp = Unit_instance;
    }
    return tmp;
  }
  function clipPath$default(path, clipOp, $super) {
    clipOp = clipOp === VOID ? Companion_getInstance_6().j3s_1 : clipOp;
    var tmp;
    if ($super === VOID) {
      this.k3s(path, clipOp);
      tmp = Unit_instance;
    } else {
      tmp = $super.k3s.call(this, path, new ClipOp(clipOp));
    }
    return tmp;
  }
  function drawRect(rect, paint) {
    return this.n3s(rect.a34_1, rect.b34_1, rect.c34_1, rect.d34_1, paint);
  }
  setMetadataFor(Canvas, 'Canvas', interfaceMeta);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(ClipOp, 'ClipOp', classMeta);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(Color, 'Color', classMeta);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(Companion_4, 'Companion', objectMeta);
  setMetadataFor(Companion_5, 'Companion', objectMeta);
  setMetadataFor(Matrix, 'Matrix', classMeta);
  setMetadataFor(Outline, 'Outline', classMeta);
  setMetadataFor(Rectangle, 'Rectangle', classMeta, Outline);
  setMetadataFor(Rounded, 'Rounded', classMeta, Outline);
  setMetadataFor(Generic, 'Generic', classMeta, Outline);
  setMetadataFor(Companion_6, 'Companion', objectMeta);
  function addPath$default(path, offset, $super) {
    offset = offset === VOID ? Companion_getInstance_0().u33_1 : offset;
    var tmp;
    if ($super === VOID) {
      this.q3x(path, offset);
      tmp = Unit_instance;
    } else {
      tmp = $super.q3x.call(this, path, new Offset_0(offset));
    }
    return tmp;
  }
  setMetadataFor(Path, 'Path', interfaceMeta);
  setMetadataFor(Companion_7, 'Companion', objectMeta);
  setMetadataFor(Companion_8, 'Companion', objectMeta);
  setMetadataFor(RectangleShape$1, VOID, classMeta);
  setMetadataFor(Companion_9, 'Companion', objectMeta);
  setMetadataFor(Shadow, 'Shadow', classMeta, VOID, VOID, Shadow);
  setMetadataFor(Companion_10, 'Companion', objectMeta);
  setMetadataFor(StrokeCap, 'StrokeCap', classMeta);
  setMetadataFor(Companion_11, 'Companion', objectMeta);
  setMetadataFor(StrokeJoin, 'StrokeJoin', classMeta);
  setMetadataFor(Companion_12, 'Companion', objectMeta);
  setMetadataFor(TileMode, 'TileMode', classMeta);
  setMetadataFor(Adaptation, 'Adaptation', classMeta);
  setMetadataFor(Adaptation$Companion$Bradford$1, VOID, classMeta, Adaptation);
  setMetadataFor(Adaptation$Companion$VonKries$1, VOID, classMeta, Adaptation);
  setMetadataFor(Adaptation$Companion$Ciecat02$1, VOID, classMeta, Adaptation);
  setMetadataFor(Companion_13, 'Companion', objectMeta);
  setMetadataFor(Companion_14, 'Companion', objectMeta);
  setMetadataFor(ColorModel, 'ColorModel', classMeta);
  setMetadataFor(Companion_15, 'Companion', objectMeta);
  setMetadataFor(ColorSpace, 'ColorSpace', classMeta);
  setMetadataFor(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0, 'sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0', classMeta);
  setMetadataFor(ColorSpaces, 'ColorSpaces', objectMeta);
  setMetadataFor(Connector, 'Connector', classMeta);
  setMetadataFor(Connector$Companion$identity$1, VOID, classMeta, Connector);
  setMetadataFor(RgbConnector, 'RgbConnector', classMeta, Connector);
  setMetadataFor(Companion_16, 'Companion', objectMeta);
  setMetadataFor(Illuminant, 'Illuminant', objectMeta);
  setMetadataFor(Companion_17, 'Companion', objectMeta);
  setMetadataFor(Lab, 'Lab', classMeta, ColorSpace);
  setMetadataFor(Companion_18, 'Companion', objectMeta);
  setMetadataFor(Oklab, 'Oklab', classMeta, ColorSpace);
  setMetadataFor(Companion_19, 'Companion', objectMeta);
  setMetadataFor(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_0, 'sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0', classMeta);
  setMetadataFor(Companion_20, 'Companion', objectMeta);
  setMetadataFor(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_1, 'sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0', classMeta);
  setMetadataFor(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_2, 'sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0', classMeta);
  setMetadataFor(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3, 'sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0', classMeta);
  setMetadataFor(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_4, 'sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0', classMeta);
  setMetadataFor(Rgb, 'Rgb', classMeta, ColorSpace);
  setMetadataFor(TransferParameters, 'TransferParameters', classMeta);
  setMetadataFor(WhitePoint, 'WhitePoint', classMeta);
  setMetadataFor(Xyz, 'Xyz', classMeta, ColorSpace);
  setMetadataFor(DrawParams, 'DrawParams', classMeta, VOID, VOID, DrawParams);
  function get_canvas() {
    return new EmptyCanvas();
  }
  setMetadataFor(DrawContext, 'DrawContext', interfaceMeta);
  setMetadataFor(CanvasDrawScope$drawContext$1, VOID, classMeta, VOID, [DrawContext]);
  function get_center_0() {
    return get_center(this.b43().g34());
  }
  function get_size() {
    return this.b43().g34();
  }
  function drawRect$default(brush, topLeft, size, alpha, style, colorFilter, blendMode, $super) {
    topLeft = topLeft === VOID ? Companion_getInstance_0().u33_1 : topLeft;
    size = size === VOID ? offsetSize(this.g34(), this, topLeft) : size;
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.m3x(brush, topLeft, size, alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.m3x.call(this, brush, new Offset_0(topLeft), new Size_0(size), alpha, style, colorFilter, new BlendMode(blendMode));
    }
    return tmp;
  }
  function drawRect$default_0(color, topLeft, size, alpha, style, colorFilter, blendMode, $super) {
    topLeft = topLeft === VOID ? Companion_getInstance_0().u33_1 : topLeft;
    size = size === VOID ? offsetSize(this.g34(), this, topLeft) : size;
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.j3x(color, topLeft, size, alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.j3x.call(this, new Color(color), new Offset_0(topLeft), new Size_0(size), alpha, style, colorFilter, new BlendMode(blendMode));
    }
    return tmp;
  }
  function drawCircle$default(color, radius, center, alpha, style, colorFilter, blendMode, $super) {
    radius = radius === VOID ? _Size___get_minDimension__impl__4iso0r(this.g34()) / 2.0 : radius;
    center = center === VOID ? this.j43() : center;
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.e43(color, radius, center, alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.e43.call(this, new Color(color), radius, new Offset_0(center), alpha, style, colorFilter, new BlendMode(blendMode));
    }
    return tmp;
  }
  function drawArc$default(color, startAngle, sweepAngle, useCenter, topLeft, size, alpha, style, colorFilter, blendMode, $super) {
    topLeft = topLeft === VOID ? Companion_getInstance_0().u33_1 : topLeft;
    size = size === VOID ? offsetSize(this.g34(), this, topLeft) : size;
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.g43(color, startAngle, sweepAngle, useCenter, topLeft, size, alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.g43.call(this, new Color(color), startAngle, sweepAngle, useCenter, new Offset_0(topLeft), new Size_0(size), alpha, style, colorFilter, new BlendMode(blendMode));
    }
    return tmp;
  }
  function drawPath$default(path, color, alpha, style, colorFilter, blendMode, $super) {
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.h3x(path, color, alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.h3x.call(this, path, new Color(color), alpha, style, colorFilter, new BlendMode(blendMode));
    }
    return tmp;
  }
  setMetadataFor(DrawScope, 'DrawScope', interfaceMeta, VOID, [Density_0]);
  setMetadataFor(CanvasDrawScope, 'CanvasDrawScope', classMeta, VOID, [DrawScope], CanvasDrawScope);
  setMetadataFor(asDrawTransform$1, VOID, classMeta);
  setMetadataFor(DrawStyle, 'DrawStyle', classMeta);
  setMetadataFor(Companion_21, 'Companion', objectMeta);
  setMetadataFor(Fill, 'Fill', objectMeta, DrawStyle);
  setMetadataFor(Companion_22, 'Companion', objectMeta);
  setMetadataFor(Stroke, 'Stroke', classMeta, DrawStyle, VOID, Stroke);
  setMetadataFor(EmptyCanvas, 'EmptyCanvas', classMeta, VOID, [Canvas], EmptyCanvas);
  setMetadataFor(SkiaBackedCanvas, 'SkiaBackedCanvas', classMeta, VOID, [Canvas]);
  setMetadataFor(SkiaBackedPaint, 'SkiaBackedPaint', classMeta, VOID, VOID, SkiaBackedPaint);
  setMetadataFor(SkiaBackedPath, 'SkiaBackedPath', classMeta, VOID, [Path], SkiaBackedPath);
  setMetadataFor(SkiaBackedPathEffect, 'SkiaBackedPathEffect', classMeta);
  //endregion
  function _BlendMode___init__impl__q6jalh(value) {
    return value;
  }
  function Companion() {
    Companion_instance_1 = this;
    this.k3p_1 = _BlendMode___init__impl__q6jalh(0);
    this.l3p_1 = _BlendMode___init__impl__q6jalh(1);
    this.m3p_1 = _BlendMode___init__impl__q6jalh(2);
    this.n3p_1 = _BlendMode___init__impl__q6jalh(3);
    this.o3p_1 = _BlendMode___init__impl__q6jalh(4);
    this.p3p_1 = _BlendMode___init__impl__q6jalh(5);
    this.q3p_1 = _BlendMode___init__impl__q6jalh(6);
    this.r3p_1 = _BlendMode___init__impl__q6jalh(7);
    this.s3p_1 = _BlendMode___init__impl__q6jalh(8);
    this.t3p_1 = _BlendMode___init__impl__q6jalh(9);
    this.u3p_1 = _BlendMode___init__impl__q6jalh(10);
    this.v3p_1 = _BlendMode___init__impl__q6jalh(11);
    this.w3p_1 = _BlendMode___init__impl__q6jalh(12);
    this.x3p_1 = _BlendMode___init__impl__q6jalh(13);
    this.y3p_1 = _BlendMode___init__impl__q6jalh(14);
    this.z3p_1 = _BlendMode___init__impl__q6jalh(15);
    this.a3q_1 = _BlendMode___init__impl__q6jalh(16);
    this.b3q_1 = _BlendMode___init__impl__q6jalh(17);
    this.c3q_1 = _BlendMode___init__impl__q6jalh(18);
    this.d3q_1 = _BlendMode___init__impl__q6jalh(19);
    this.e3q_1 = _BlendMode___init__impl__q6jalh(20);
    this.f3q_1 = _BlendMode___init__impl__q6jalh(21);
    this.g3q_1 = _BlendMode___init__impl__q6jalh(22);
    this.h3q_1 = _BlendMode___init__impl__q6jalh(23);
    this.i3q_1 = _BlendMode___init__impl__q6jalh(24);
    this.j3q_1 = _BlendMode___init__impl__q6jalh(25);
    this.k3q_1 = _BlendMode___init__impl__q6jalh(26);
    this.l3q_1 = _BlendMode___init__impl__q6jalh(27);
    this.m3q_1 = _BlendMode___init__impl__q6jalh(28);
  }
  var Companion_instance_1;
  function Companion_getInstance_4() {
    if (Companion_instance_1 == null)
      new Companion();
    return Companion_instance_1;
  }
  function BlendMode__toString_impl_uuibkd($this) {
    return $this === Companion_getInstance_4().k3p_1 ? 'Clear' : $this === Companion_getInstance_4().l3p_1 ? 'Src' : $this === Companion_getInstance_4().m3p_1 ? 'Dst' : $this === Companion_getInstance_4().n3p_1 ? 'SrcOver' : $this === Companion_getInstance_4().o3p_1 ? 'DstOver' : $this === Companion_getInstance_4().p3p_1 ? 'SrcIn' : $this === Companion_getInstance_4().q3p_1 ? 'DstIn' : $this === Companion_getInstance_4().r3p_1 ? 'SrcOut' : $this === Companion_getInstance_4().s3p_1 ? 'DstOut' : $this === Companion_getInstance_4().t3p_1 ? 'SrcAtop' : $this === Companion_getInstance_4().u3p_1 ? 'DstAtop' : $this === Companion_getInstance_4().v3p_1 ? 'Xor' : $this === Companion_getInstance_4().w3p_1 ? 'Plus' : $this === Companion_getInstance_4().x3p_1 ? 'Modulate' : $this === Companion_getInstance_4().y3p_1 ? 'Screen' : $this === Companion_getInstance_4().z3p_1 ? 'Overlay' : $this === Companion_getInstance_4().a3q_1 ? 'Darken' : $this === Companion_getInstance_4().b3q_1 ? 'Lighten' : $this === Companion_getInstance_4().c3q_1 ? 'ColorDodge' : $this === Companion_getInstance_4().d3q_1 ? 'ColorBurn' : $this === Companion_getInstance_4().e3q_1 ? 'HardLight' : $this === Companion_getInstance_4().f3q_1 ? 'Softlight' : $this === Companion_getInstance_4().g3q_1 ? 'Difference' : $this === Companion_getInstance_4().h3q_1 ? 'Exclusion' : $this === Companion_getInstance_4().i3q_1 ? 'Multiply' : $this === Companion_getInstance_4().j3q_1 ? 'Hue' : $this === Companion_getInstance_4().k3q_1 ? 'Saturation' : $this === Companion_getInstance_4().l3q_1 ? 'Color' : $this === Companion_getInstance_4().m3q_1 ? 'Luminosity' : 'Unknown';
  }
  function BlendMode__hashCode_impl_93ceri($this) {
    return $this;
  }
  function BlendMode__equals_impl_1tm25i($this, other) {
    if (!(other instanceof BlendMode))
      return false;
    if (!($this === (other instanceof BlendMode ? other.n3q_1 : THROW_CCE())))
      return false;
    return true;
  }
  function BlendMode(value) {
    Companion_getInstance_4();
    this.n3q_1 = value;
  }
  protoOf(BlendMode).toString = function () {
    return BlendMode__toString_impl_uuibkd(this.n3q_1);
  };
  protoOf(BlendMode).hashCode = function () {
    return BlendMode__hashCode_impl_93ceri(this.n3q_1);
  };
  protoOf(BlendMode).equals = function (other) {
    return BlendMode__equals_impl_1tm25i(this.n3q_1, other);
  };
  function Companion_0() {
  }
  protoOf(Companion_0).o3q = function (colors, start, end, tileMode) {
    return new LinearGradient(colors, null, start, end, tileMode);
  };
  protoOf(Companion_0).p3q = function (colors, startY, endY, tileMode) {
    return this.o3q(colors, Offset(0.0, startY), Offset(0.0, endY), tileMode);
  };
  protoOf(Companion_0).q3q = function (colors, startY, endY, tileMode, $super) {
    startY = startY === VOID ? 0.0 : startY;
    var tmp;
    if (endY === VOID) {
      tmp = Infinity;
    } else {
      tmp = endY;
    }
    endY = tmp;
    tileMode = tileMode === VOID ? Companion_getInstance_17().r3q_1 : tileMode;
    return $super === VOID ? this.p3q(colors, startY, endY, tileMode) : $super.p3q.call(this, colors, startY, endY, new TileMode(tileMode));
  };
  var Companion_instance_2;
  function Companion_getInstance_5() {
    return Companion_instance_2;
  }
  function Brush() {
    this.v3q_1 = Companion_getInstance().x34_1;
  }
  function ShaderBrush() {
    Brush.call(this);
    this.y3q_1 = null;
    this.z3q_1 = Companion_getInstance().x34_1;
  }
  protoOf(ShaderBrush).w3q = function (size, p, alpha) {
    var shader = this.y3q_1;
    if (shader == null ? true : !equals(this.z3q_1, size)) {
      if (Size__isEmpty_impl_o9ye97(size)) {
        shader = null;
        this.y3q_1 = null;
        this.z3q_1 = Companion_getInstance().x34_1;
      } else {
        // Inline function 'kotlin.also' call
        var this_0 = this.a3r(size);
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.ui.graphics.ShaderBrush.applyTo.<anonymous>' call
        this.y3q_1 = this_0;
        shader = this_0;
        this.z3q_1 = size;
      }
    }
    if (!equals(p.p3r(), Companion_getInstance_7().b3r_1)) {
      p.o3r(Companion_getInstance_7().b3r_1);
    }
    if (!equals(p.q3r(), shader)) {
      p.u3e(shader);
    }
    if (!(p.w3n() === alpha)) {
      p.r3r(alpha);
    }
  };
  function SolidColor() {
  }
  function LinearGradient(colors, stops, start, end, tileMode) {
    stops = stops === VOID ? null : stops;
    tileMode = tileMode === VOID ? Companion_getInstance_17().r3q_1 : tileMode;
    ShaderBrush.call(this);
    this.v3r_1 = colors;
    this.w3r_1 = stops;
    this.x3r_1 = start;
    this.y3r_1 = end;
    this.z3r_1 = tileMode;
  }
  protoOf(LinearGradient).a3r = function (size) {
    var tmp;
    var tmp_0 = _Offset___get_x__impl__xvi35n(this.x3r_1);
    if (tmp_0 === Infinity) {
      tmp = _Size___get_width__impl__58y75t(size);
    } else {
      tmp = _Offset___get_x__impl__xvi35n(this.x3r_1);
    }
    var startX = tmp;
    var tmp_1;
    var tmp_2 = _Offset___get_y__impl__8bzhra(this.x3r_1);
    if (tmp_2 === Infinity) {
      tmp_1 = _Size___get_height__impl__a04p02(size);
    } else {
      tmp_1 = _Offset___get_y__impl__8bzhra(this.x3r_1);
    }
    var startY = tmp_1;
    var tmp_3;
    var tmp_4 = _Offset___get_x__impl__xvi35n(this.y3r_1);
    if (tmp_4 === Infinity) {
      tmp_3 = _Size___get_width__impl__58y75t(size);
    } else {
      tmp_3 = _Offset___get_x__impl__xvi35n(this.y3r_1);
    }
    var endX = tmp_3;
    var tmp_5;
    var tmp_6 = _Offset___get_y__impl__8bzhra(this.y3r_1);
    if (tmp_6 === Infinity) {
      tmp_5 = _Size___get_height__impl__a04p02(size);
    } else {
      tmp_5 = _Offset___get_y__impl__8bzhra(this.y3r_1);
    }
    var endY = tmp_5;
    var tmp0_colors = this.v3r_1;
    var tmp1_colorStops = this.w3r_1;
    var tmp2_from = Offset(startX, startY);
    var tmp3_to = Offset(endX, endY);
    var tmp4_tileMode = this.z3r_1;
    return LinearGradientShader(tmp2_from, tmp3_to, tmp0_colors, tmp1_colorStops, tmp4_tileMode);
  };
  protoOf(LinearGradient).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LinearGradient))
      return false;
    if (!equals(this.v3r_1, other.v3r_1))
      return false;
    if (!equals(this.w3r_1, other.w3r_1))
      return false;
    if (!equals(this.x3r_1, other.x3r_1))
      return false;
    if (!equals(this.y3r_1, other.y3r_1))
      return false;
    if (!(this.z3r_1 === other.z3r_1))
      return false;
    return true;
  };
  protoOf(LinearGradient).hashCode = function () {
    var result = hashCode(this.v3r_1);
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.w3r_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + Offset__hashCode_impl_hbql41(this.x3r_1) | 0;
    result = imul(31, result) + Offset__hashCode_impl_hbql41(this.y3r_1) | 0;
    result = imul(31, result) + TileMode__hashCode_impl_7u5am9(this.z3r_1) | 0;
    return result;
  };
  protoOf(LinearGradient).toString = function () {
    var startValue = get_isFinite(this.x3r_1) ? 'start=' + new Offset_0(this.x3r_1) + ', ' : '';
    var endValue = get_isFinite(this.y3r_1) ? 'end=' + new Offset_0(this.y3r_1) + ', ' : '';
    return 'LinearGradient(colors=' + this.v3r_1 + ', ' + ('stops=' + this.w3r_1 + ', ') + startValue + endValue + ('tileMode=' + new TileMode(this.z3r_1) + ')');
  };
  function Canvas() {
  }
  function _ClipOp___init__impl__pqwwy8(value) {
    return value;
  }
  function Companion_1() {
    Companion_instance_3 = this;
    this.i3s_1 = _ClipOp___init__impl__pqwwy8(0);
    this.j3s_1 = _ClipOp___init__impl__pqwwy8(1);
  }
  var Companion_instance_3;
  function Companion_getInstance_6() {
    if (Companion_instance_3 == null)
      new Companion_1();
    return Companion_instance_3;
  }
  function ClipOp__toString_impl_vwrlao($this) {
    return $this === Companion_getInstance_6().i3s_1 ? 'Difference' : $this === Companion_getInstance_6().j3s_1 ? 'Intersect' : 'Unknown';
  }
  function ClipOp__hashCode_impl_hd6jvl($this) {
    return $this;
  }
  function ClipOp__equals_impl_g5ajel($this, other) {
    if (!(other instanceof ClipOp))
      return false;
    if (!($this === (other instanceof ClipOp ? other.s3s_1 : THROW_CCE())))
      return false;
    return true;
  }
  function ClipOp(value) {
    Companion_getInstance_6();
    this.s3s_1 = value;
  }
  protoOf(ClipOp).toString = function () {
    return ClipOp__toString_impl_vwrlao(this.s3s_1);
  };
  protoOf(ClipOp).hashCode = function () {
    return ClipOp__hashCode_impl_hd6jvl(this.s3s_1);
  };
  protoOf(ClipOp).equals = function (other) {
    return ClipOp__equals_impl_g5ajel(this.s3s_1, other);
  };
  function _Color___init__impl__r6cqi2(value) {
    return value;
  }
  function _Color___get_value__impl__1pls5m($this) {
    return $this;
  }
  function _Color___get_colorSpace__impl__jqqozk($this) {
    // Inline function 'androidx.compose.ui.graphics.colorspace.ColorSpaces.getColorSpace' call
    var this_0 = ColorSpaces_getInstance();
    // Inline function 'kotlin.ULong.toInt' call
    // Inline function 'kotlin.ULong.and' call
    var this_1 = _Color___get_value__impl__1pls5m($this);
    var other = _ULong___init__impl__c78o9k(new Long(63, 0));
    var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).nb(_ULong___get_data__impl__fggpzb(other)));
    var id = _ULong___get_data__impl__fggpzb(this_2).ea();
    return this_0.p3t_1[id];
  }
  function Color__convert_impl_so5m8t($this, colorSpace) {
    var thisColorSpace = _Color___get_colorSpace__impl__jqqozk($this);
    if (colorSpace.equals(thisColorSpace)) {
      return $this;
    }
    var connector = connect(thisColorSpace, colorSpace);
    return connector.w3t(_Color___get_red__impl__cwrsk6($this), _Color___get_green__impl__bta9rs($this), _Color___get_blue__impl__xwez13($this), _Color___get_alpha__impl__wcfyv1($this));
  }
  function _Color___get_red__impl__cwrsk6($this) {
    var tmp;
    // Inline function 'kotlin.ULong.and' call
    var this_0 = _Color___get_value__impl__1pls5m($this);
    var other = _ULong___init__impl__c78o9k(new Long(63, 0));
    var tmp$ret$0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).nb(_ULong___get_data__impl__fggpzb(other)));
    if (equals(tmp$ret$0, _ULong___init__impl__c78o9k(new Long(0, 0)))) {
      // Inline function 'kotlin.ULong.toFloat' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_1 = _Color___get_value__impl__1pls5m($this);
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).mb(48));
      var other_0 = _ULong___init__impl__c78o9k(new Long(255, 0));
      // Inline function 'kotlin.ULong.toDouble' call
      var this_3 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_2).nb(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongToDouble(_ULong___get_data__impl__fggpzb(this_3)) / 255.0;
    } else {
      // Inline function 'kotlin.ULong.toShort' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_4 = _Color___get_value__impl__1pls5m($this);
      var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).mb(48));
      var other_1 = _ULong___init__impl__c78o9k(new Long(65535, 0));
      var this_6 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_5).nb(_ULong___get_data__impl__fggpzb(other_1)));
      var tmp$ret$7 = _ULong___get_data__impl__fggpzb(this_6).rb();
      tmp = Float16__toFloat_impl_6i8dal(_Float16___init__impl__fckrew(tmp$ret$7));
    }
    return tmp;
  }
  function _Color___get_green__impl__bta9rs($this) {
    var tmp;
    // Inline function 'kotlin.ULong.and' call
    var this_0 = _Color___get_value__impl__1pls5m($this);
    var other = _ULong___init__impl__c78o9k(new Long(63, 0));
    var tmp$ret$0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).nb(_ULong___get_data__impl__fggpzb(other)));
    if (equals(tmp$ret$0, _ULong___init__impl__c78o9k(new Long(0, 0)))) {
      // Inline function 'kotlin.ULong.toFloat' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_1 = _Color___get_value__impl__1pls5m($this);
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).mb(40));
      var other_0 = _ULong___init__impl__c78o9k(new Long(255, 0));
      // Inline function 'kotlin.ULong.toDouble' call
      var this_3 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_2).nb(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongToDouble(_ULong___get_data__impl__fggpzb(this_3)) / 255.0;
    } else {
      // Inline function 'kotlin.ULong.toShort' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_4 = _Color___get_value__impl__1pls5m($this);
      var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).mb(32));
      var other_1 = _ULong___init__impl__c78o9k(new Long(65535, 0));
      var this_6 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_5).nb(_ULong___get_data__impl__fggpzb(other_1)));
      var tmp$ret$7 = _ULong___get_data__impl__fggpzb(this_6).rb();
      tmp = Float16__toFloat_impl_6i8dal(_Float16___init__impl__fckrew(tmp$ret$7));
    }
    return tmp;
  }
  function _Color___get_blue__impl__xwez13($this) {
    var tmp;
    // Inline function 'kotlin.ULong.and' call
    var this_0 = _Color___get_value__impl__1pls5m($this);
    var other = _ULong___init__impl__c78o9k(new Long(63, 0));
    var tmp$ret$0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).nb(_ULong___get_data__impl__fggpzb(other)));
    if (equals(tmp$ret$0, _ULong___init__impl__c78o9k(new Long(0, 0)))) {
      // Inline function 'kotlin.ULong.toFloat' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_1 = _Color___get_value__impl__1pls5m($this);
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).mb(32));
      var other_0 = _ULong___init__impl__c78o9k(new Long(255, 0));
      // Inline function 'kotlin.ULong.toDouble' call
      var this_3 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_2).nb(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongToDouble(_ULong___get_data__impl__fggpzb(this_3)) / 255.0;
    } else {
      // Inline function 'kotlin.ULong.toShort' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_4 = _Color___get_value__impl__1pls5m($this);
      var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).mb(16));
      var other_1 = _ULong___init__impl__c78o9k(new Long(65535, 0));
      var this_6 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_5).nb(_ULong___get_data__impl__fggpzb(other_1)));
      var tmp$ret$7 = _ULong___get_data__impl__fggpzb(this_6).rb();
      tmp = Float16__toFloat_impl_6i8dal(_Float16___init__impl__fckrew(tmp$ret$7));
    }
    return tmp;
  }
  function _Color___get_alpha__impl__wcfyv1($this) {
    var tmp;
    // Inline function 'kotlin.ULong.and' call
    var this_0 = _Color___get_value__impl__1pls5m($this);
    var other = _ULong___init__impl__c78o9k(new Long(63, 0));
    var tmp$ret$0 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).nb(_ULong___get_data__impl__fggpzb(other)));
    if (equals(tmp$ret$0, _ULong___init__impl__c78o9k(new Long(0, 0)))) {
      // Inline function 'kotlin.ULong.toFloat' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_1 = _Color___get_value__impl__1pls5m($this);
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).mb(56));
      var other_0 = _ULong___init__impl__c78o9k(new Long(255, 0));
      // Inline function 'kotlin.ULong.toDouble' call
      var this_3 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_2).nb(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongToDouble(_ULong___get_data__impl__fggpzb(this_3)) / 255.0;
    } else {
      // Inline function 'kotlin.ULong.toFloat' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.ULong.shr' call
      var this_4 = _Color___get_value__impl__1pls5m($this);
      var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).mb(6));
      var other_1 = _ULong___init__impl__c78o9k(new Long(1023, 0));
      // Inline function 'kotlin.ULong.toDouble' call
      var this_6 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_5).nb(_ULong___get_data__impl__fggpzb(other_1)));
      tmp = ulongToDouble(_ULong___get_data__impl__fggpzb(this_6)) / 1023.0;
    }
    return tmp;
  }
  function Color__copy_impl_qlvcl1($this, alpha, red, green, blue) {
    return Color_1(red, green, blue, alpha, _Color___get_colorSpace__impl__jqqozk($this));
  }
  function Color__copy$default_impl_ectz3s($this, alpha, red, green, blue, $super) {
    alpha = alpha === VOID ? _Color___get_alpha__impl__wcfyv1($this) : alpha;
    red = red === VOID ? _Color___get_red__impl__cwrsk6($this) : red;
    green = green === VOID ? _Color___get_green__impl__bta9rs($this) : green;
    blue = blue === VOID ? _Color___get_blue__impl__xwez13($this) : blue;
    var tmp;
    if ($super === VOID) {
      tmp = Color__copy_impl_qlvcl1($this, alpha, red, green, blue);
    } else {
      var tmp_0 = $super;
      tmp = (tmp_0 == null ? null : new Color(tmp_0)).y3t.call(new Color($this), alpha, red, green, blue).x3t_1;
    }
    return tmp;
  }
  function Color__toString_impl_hpzmaq($this) {
    return 'Color(' + _Color___get_red__impl__cwrsk6($this) + ', ' + _Color___get_green__impl__bta9rs($this) + ', ' + _Color___get_blue__impl__xwez13($this) + ', ' + _Color___get_alpha__impl__wcfyv1($this) + ', ' + _Color___get_colorSpace__impl__jqqozk($this).z3t_1 + ')';
  }
  function Companion_2() {
    Companion_instance_4 = this;
    this.b3r_1 = Color_2(new Long(-16777216, 0));
    this.c3r_1 = Color_2(new Long(-12303292, 0));
    this.d3r_1 = Color_2(new Long(-7829368, 0));
    this.e3r_1 = Color_2(new Long(-3355444, 0));
    this.f3r_1 = Color_2(new Long(-1, 0));
    this.g3r_1 = Color_2(new Long(-65536, 0));
    this.h3r_1 = Color_2(new Long(-16711936, 0));
    this.i3r_1 = Color_2(new Long(-16776961, 0));
    this.j3r_1 = Color_2(new Long(-256, 0));
    this.k3r_1 = Color_2(new Long(-16711681, 0));
    this.l3r_1 = Color_2(new Long(-65281, 0));
    this.m3r_1 = Color_0(0);
    this.n3r_1 = Color_1(0.0, 0.0, 0.0, 0.0, ColorSpaces_getInstance().n3t_1);
  }
  var Companion_instance_4;
  function Companion_getInstance_7() {
    if (Companion_instance_4 == null)
      new Companion_2();
    return Companion_instance_4;
  }
  function Color__hashCode_impl_vjyivj($this) {
    return ULong__hashCode_impl_6hv2lb($this);
  }
  function Color__equals_impl_k06uqz($this, other) {
    if (!(other instanceof Color))
      return false;
    var tmp0_other_with_cast = other instanceof Color ? other.x3t_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function Color(value) {
    Companion_getInstance_7();
    this.x3t_1 = value;
  }
  protoOf(Color).toString = function () {
    return Color__toString_impl_hpzmaq(this.x3t_1);
  };
  protoOf(Color).hashCode = function () {
    return Color__hashCode_impl_vjyivj(this.x3t_1);
  };
  protoOf(Color).equals = function (other) {
    return Color__equals_impl_k06uqz(this.x3t_1, other);
  };
  function toArgb(_this__u8e3s4) {
    // Inline function 'kotlin.ULong.toInt' call
    // Inline function 'kotlin.ULong.shr' call
    var this_0 = _Color___get_value__impl__1pls5m(Color__convert_impl_so5m8t(_this__u8e3s4, ColorSpaces_getInstance().x3s_1));
    var this_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).mb(32));
    return _ULong___get_data__impl__fggpzb(this_1).ea();
  }
  function Color_0(color) {
    // Inline function 'kotlin.ULong.shl' call
    // Inline function 'kotlin.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(toLong(color));
    var tmp$ret$1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).kb(32));
    return _Color___init__impl__r6cqi2(tmp$ret$1);
  }
  function Color_1(red, green, blue, alpha, colorSpace) {
    alpha = alpha === VOID ? 1.0 : alpha;
    colorSpace = colorSpace === VOID ? ColorSpaces_getInstance().x3s_1 : colorSpace;
    // Inline function 'kotlin.require' call
    var tmp;
    var tmp_0;
    var tmp_1;
    var containsLower = colorSpace.c3u(0);
    if (red <= colorSpace.d3u(0) ? containsLower <= red : false) {
      var containsLower_0 = colorSpace.c3u(1);
      tmp_1 = green <= colorSpace.d3u(1) ? containsLower_0 <= green : false;
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      var containsLower_1 = colorSpace.c3u(2);
      tmp_0 = blue <= colorSpace.d3u(2) ? containsLower_1 <= blue : false;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = 0.0 <= alpha ? alpha <= 1.0 : false;
    } else {
      tmp = false;
    }
    // Inline function 'kotlin.contracts.contract' call
    if (!tmp) {
      // Inline function 'androidx.compose.ui.graphics.Color.<anonymous>' call
      var message = 'red = ' + red + ', green = ' + green + ', blue = ' + blue + ', alpha = ' + alpha + ' outside the range for ' + colorSpace;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (colorSpace.e3u()) {
      var argb = numberToInt(alpha * 255.0 + 0.5) << 24 | numberToInt(red * 255.0 + 0.5) << 16 | numberToInt(green * 255.0 + 0.5) << 8 | numberToInt(blue * 255.0 + 0.5);
      // Inline function 'kotlin.ULong.shl' call
      // Inline function 'kotlin.ULong.and' call
      // Inline function 'kotlin.toULong' call
      var this_0 = _ULong___init__impl__c78o9k(toLong(argb));
      var other = _ULong___init__impl__c78o9k(new Long(-1, 0));
      var this_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).nb(_ULong___get_data__impl__fggpzb(other)));
      var tmp$ret$3 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).kb(32));
      return _Color___init__impl__r6cqi2(tmp$ret$3);
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(colorSpace.f3u() === 3)) {
      // Inline function 'androidx.compose.ui.graphics.Color.<anonymous>' call
      var message_0 = 'Color only works with ColorSpaces with 3 components';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var id = colorSpace.b3u_1;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(id === -1)) {
      // Inline function 'androidx.compose.ui.graphics.Color.<anonymous>' call
      var message_1 = 'Unknown color space, please use a color space in ColorSpaces';
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var r = _Float16___init__impl__fckrew_0(red);
    var g = _Float16___init__impl__fckrew_0(green);
    var b = _Float16___init__impl__fckrew_0(blue);
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.min' call
    var b_0 = Math.min(alpha, 1.0);
    var tmp$ret$7 = Math.max(0.0, b_0);
    var a = numberToInt(tmp$ret$7 * 1023.0 + 0.5);
    // Inline function 'kotlin.ULong.or' call
    // Inline function 'kotlin.ULong.or' call
    // Inline function 'kotlin.ULong.or' call
    // Inline function 'kotlin.ULong.or' call
    // Inline function 'kotlin.ULong.shl' call
    // Inline function 'kotlin.ULong.and' call
    // Inline function 'kotlin.toULong' call
    var this_2 = _Float16___get_halfValue__impl__89tmwx(r);
    var this_3 = _ULong___init__impl__c78o9k(toLong(this_2));
    var other_0 = _ULong___init__impl__c78o9k(new Long(65535, 0));
    var this_4 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_3).nb(_ULong___get_data__impl__fggpzb(other_0)));
    var this_5 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).kb(48));
    // Inline function 'kotlin.ULong.shl' call
    // Inline function 'kotlin.ULong.and' call
    // Inline function 'kotlin.toULong' call
    var this_6 = _Float16___get_halfValue__impl__89tmwx(g);
    var this_7 = _ULong___init__impl__c78o9k(toLong(this_6));
    var other_1 = _ULong___init__impl__c78o9k(new Long(65535, 0));
    var this_8 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_7).nb(_ULong___get_data__impl__fggpzb(other_1)));
    var other_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_8).kb(32));
    var this_9 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_5).ob(_ULong___get_data__impl__fggpzb(other_2)));
    // Inline function 'kotlin.ULong.shl' call
    // Inline function 'kotlin.ULong.and' call
    // Inline function 'kotlin.toULong' call
    var this_10 = _Float16___get_halfValue__impl__89tmwx(b);
    var this_11 = _ULong___init__impl__c78o9k(toLong(this_10));
    var other_3 = _ULong___init__impl__c78o9k(new Long(65535, 0));
    var this_12 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_11).nb(_ULong___get_data__impl__fggpzb(other_3)));
    var other_4 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_12).kb(16));
    var this_13 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_9).ob(_ULong___get_data__impl__fggpzb(other_4)));
    // Inline function 'kotlin.ULong.shl' call
    // Inline function 'kotlin.ULong.and' call
    // Inline function 'kotlin.toULong' call
    var this_14 = _ULong___init__impl__c78o9k(toLong(a));
    var other_5 = _ULong___init__impl__c78o9k(new Long(1023, 0));
    var this_15 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_14).nb(_ULong___get_data__impl__fggpzb(other_5)));
    var other_6 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_15).kb(6));
    var this_16 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_13).ob(_ULong___get_data__impl__fggpzb(other_6)));
    // Inline function 'kotlin.ULong.and' call
    // Inline function 'kotlin.toULong' call
    var this_17 = _ULong___init__impl__c78o9k(toLong(id));
    var other_7 = _ULong___init__impl__c78o9k(new Long(63, 0));
    var other_8 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_17).nb(_ULong___get_data__impl__fggpzb(other_7)));
    var tmp$ret$25 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_16).ob(_ULong___get_data__impl__fggpzb(other_8)));
    return _Color___init__impl__r6cqi2(tmp$ret$25);
  }
  function Color_2(color) {
    // Inline function 'kotlin.ULong.shl' call
    // Inline function 'kotlin.ULong.and' call
    // Inline function 'kotlin.toULong' call
    var this_0 = _ULong___init__impl__c78o9k(color);
    var other = _ULong___init__impl__c78o9k(new Long(-1, 0));
    var this_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_0).nb(_ULong___get_data__impl__fggpzb(other)));
    var tmp$ret$2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).kb(32));
    return _Color___init__impl__r6cqi2(tmp$ret$2);
  }
  function luminance(_this__u8e3s4) {
    var colorSpace = _Color___get_colorSpace__impl__jqqozk(_this__u8e3s4);
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!equals(colorSpace.a3u_1, Companion_getInstance_19().g3u_1)) {
      // Inline function 'androidx.compose.ui.graphics.luminance.<anonymous>' call
      var message = 'The specified color must be encoded in an RGB color space. ' + ('The supplied color space is ' + new ColorModel(colorSpace.a3u_1));
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var eotf = (colorSpace instanceof Rgb ? colorSpace : THROW_CCE()).z3u_1;
    var r = eotf.c3v(_Color___get_red__impl__cwrsk6(_this__u8e3s4));
    var g = eotf.c3v(_Color___get_green__impl__bta9rs(_this__u8e3s4));
    var b = eotf.c3v(_Color___get_blue__impl__xwez13(_this__u8e3s4));
    return saturate(0.2126 * r + 0.7152 * g + 0.0722 * b);
  }
  function Color_3(red, green, blue, alpha) {
    alpha = alpha === VOID ? 255 : alpha;
    var color = (alpha & 255) << 24 | (red & 255) << 16 | (green & 255) << 8 | blue & 255;
    return Color_0(color);
  }
  function saturate(v) {
    return v <= 0.0 ? 0.0 : v >= 1.0 ? 1.0 : v;
  }
  function _FilterQuality___init__impl__nv51aq(value) {
    return value;
  }
  function Companion_3() {
    Companion_instance_5 = this;
    this.d3v_1 = _FilterQuality___init__impl__nv51aq(0);
    this.e3v_1 = _FilterQuality___init__impl__nv51aq(1);
    this.f3v_1 = _FilterQuality___init__impl__nv51aq(2);
    this.g3v_1 = _FilterQuality___init__impl__nv51aq(3);
  }
  var Companion_instance_5;
  function Companion_getInstance_8() {
    if (Companion_instance_5 == null)
      new Companion_3();
    return Companion_instance_5;
  }
  function floatToHalf($this, f) {
    var bits = toRawBits(f);
    var s = bits >>> 31 | 0;
    var e = (bits >>> 23 | 0) & 255;
    var m = bits & 8388607;
    var outE = 0;
    var outM = 0;
    if (e === 255) {
      outE = 31;
      outM = !(m === 0) ? 512 : 0;
    } else {
      e = (e - 127 | 0) + 15 | 0;
      if (e >= 31) {
        outE = 49;
      } else if (e <= 0) {
        if (e >= -10) {
          m = (m | 8388608) >> (1 - e | 0);
          if (!((m & 4096) === 0))
            m = m + 8192 | 0;
          outM = m >> 13;
        }
      } else {
        outE = e;
        outM = m >> 13;
        if (!((m & 4096) === 0)) {
          var out = outE << 10 | outM;
          out = out + 1 | 0;
          return toShort(out | s << 15);
        }
      }
    }
    return toShort(s << 15 | outE << 10 | outM);
  }
  function _Float16___init__impl__fckrew(halfValue) {
    return halfValue;
  }
  function _Float16___get_halfValue__impl__89tmwx($this) {
    return $this;
  }
  function _Float16___init__impl__fckrew_0(value) {
    return _Float16___init__impl__fckrew(floatToHalf(Companion_getInstance_9(), value));
  }
  function Float16__toFloat_impl_6i8dal($this) {
    var bits = _Float16___get_halfValue__impl__89tmwx($this) & 65535;
    var s = bits & 32768;
    var e = (bits >>> 10 | 0) & 31;
    var m = bits & 1023;
    var outE = 0;
    var outM = 0;
    if (e === 0) {
      if (!(m === 0)) {
        // Inline function 'kotlin.fromBits' call
        var bits_0 = 1056964608 + m | 0;
        var o = floatFromBits(bits_0);
        o = o - Companion_getInstance_9().l3w_1;
        return s === 0 ? o : -o;
      }
    } else {
      outM = m << 13;
      if (e === 31) {
        outE = 255;
        if (!(outM === 0)) {
          outM = outM | 4194304;
        }
      } else {
        outE = (e - 15 | 0) + 127 | 0;
      }
    }
    var out = s << 16 | outE << 23 | outM;
    // Inline function 'kotlin.fromBits' call
    return floatFromBits(out);
  }
  function Companion_4() {
    Companion_instance_6 = this;
    this.h3v_1 = 16;
    this.i3v_1 = _Float16___init__impl__fckrew(5120);
    this.j3v_1 = 15;
    this.k3v_1 = -14;
    this.l3v_1 = _Float16___init__impl__fckrew(-1025);
    this.m3v_1 = _Float16___init__impl__fckrew(31743);
    this.n3v_1 = _Float16___init__impl__fckrew(1024);
    this.o3v_1 = _Float16___init__impl__fckrew(1);
    this.p3v_1 = _Float16___init__impl__fckrew(32256);
    this.q3v_1 = _Float16___init__impl__fckrew(-1024);
    this.r3v_1 = _Float16___init__impl__fckrew(-32768);
    this.s3v_1 = _Float16___init__impl__fckrew(31744);
    this.t3v_1 = _Float16___init__impl__fckrew(0);
    this.u3v_1 = _Float16___init__impl__fckrew_0(1.0);
    this.v3v_1 = _Float16___init__impl__fckrew_0(-1.0);
    this.w3v_1 = 15;
    this.x3v_1 = 32768;
    this.y3v_1 = 10;
    this.z3v_1 = 31;
    this.a3w_1 = 1023;
    this.b3w_1 = 15;
    this.c3w_1 = 32767;
    this.d3w_1 = 31744;
    this.e3w_1 = 31;
    this.f3w_1 = 23;
    this.g3w_1 = 255;
    this.h3w_1 = 8388607;
    this.i3w_1 = 127;
    this.j3w_1 = 4194304;
    this.k3w_1 = 1056964608;
    var tmp = this;
    // Inline function 'kotlin.fromBits' call
    var bits = 1056964608;
    tmp.l3w_1 = floatFromBits(bits);
  }
  var Companion_instance_6;
  function Companion_getInstance_9() {
    if (Companion_instance_6 == null)
      new Companion_4();
    return Companion_instance_6;
  }
  function _Matrix___init__impl__q3kp4w(values) {
    var tmp;
    if (values === VOID) {
      // Inline function 'kotlin.floatArrayOf' call
      tmp = new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
    } else {
      tmp = values;
    }
    values = tmp;
    return values;
  }
  function _Matrix___get_values__impl__fblr7b($this) {
    return $this;
  }
  function Matrix__map_impl_7meu7m($this, point) {
    var x = _Offset___get_x__impl__xvi35n(point);
    var y = _Offset___get_y__impl__8bzhra(point);
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_0 = tmp + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var z = tmp_0 + _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 3 | 0];
    var inverseZ = 1 / z;
    var pZ = isFinite(inverseZ) ? inverseZ : 0.0;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_1 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_2 = tmp_1 + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_3 = pZ * (tmp_2 + _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0]);
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_4 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_5 = tmp_4 + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp$ret$8 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0];
    return Offset(tmp_3, pZ * (tmp_5 + tmp$ret$8));
  }
  function Matrix__map_impl_7meu7m_0($this, rect) {
    var p0 = Matrix__map_impl_7meu7m($this, Offset(rect.p33_1, rect.q33_1));
    var p1 = Matrix__map_impl_7meu7m($this, Offset(rect.p33_1, rect.s33_1));
    var p3 = Matrix__map_impl_7meu7m($this, Offset(rect.r33_1, rect.q33_1));
    var p4 = Matrix__map_impl_7meu7m($this, Offset(rect.r33_1, rect.s33_1));
    var tmp = rect;
    // Inline function 'kotlin.math.min' call
    // Inline function 'kotlin.math.min' call
    var a = _Offset___get_x__impl__xvi35n(p0);
    var b = _Offset___get_x__impl__xvi35n(p1);
    var a_0 = Math.min(a, b);
    // Inline function 'kotlin.math.min' call
    var a_1 = _Offset___get_x__impl__xvi35n(p3);
    var b_0 = _Offset___get_x__impl__xvi35n(p4);
    var b_1 = Math.min(a_1, b_0);
    tmp.p33_1 = Math.min(a_0, b_1);
    var tmp_0 = rect;
    // Inline function 'kotlin.math.min' call
    // Inline function 'kotlin.math.min' call
    var a_2 = _Offset___get_y__impl__8bzhra(p0);
    var b_2 = _Offset___get_y__impl__8bzhra(p1);
    var a_3 = Math.min(a_2, b_2);
    // Inline function 'kotlin.math.min' call
    var a_4 = _Offset___get_y__impl__8bzhra(p3);
    var b_3 = _Offset___get_y__impl__8bzhra(p4);
    var b_4 = Math.min(a_4, b_3);
    tmp_0.q33_1 = Math.min(a_3, b_4);
    var tmp_1 = rect;
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.max' call
    var a_5 = _Offset___get_x__impl__xvi35n(p0);
    var b_5 = _Offset___get_x__impl__xvi35n(p1);
    var a_6 = Math.max(a_5, b_5);
    // Inline function 'kotlin.math.max' call
    var a_7 = _Offset___get_x__impl__xvi35n(p3);
    var b_6 = _Offset___get_x__impl__xvi35n(p4);
    var b_7 = Math.max(a_7, b_6);
    tmp_1.r33_1 = Math.max(a_6, b_7);
    var tmp_2 = rect;
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.math.max' call
    var a_8 = _Offset___get_y__impl__8bzhra(p0);
    var b_8 = _Offset___get_y__impl__8bzhra(p1);
    var a_9 = Math.max(a_8, b_8);
    // Inline function 'kotlin.math.max' call
    var a_10 = _Offset___get_y__impl__8bzhra(p3);
    var b_9 = _Offset___get_y__impl__8bzhra(p4);
    var b_10 = Math.max(a_10, b_9);
    tmp_2.s33_1 = Math.max(a_9, b_10);
  }
  function Matrix__timesAssign_impl_oas521($this, m) {
    var v00 = dot($this, 0, m, 0);
    var v01 = dot($this, 0, m, 1);
    var v02 = dot($this, 0, m, 2);
    var v03 = dot($this, 0, m, 3);
    var v10 = dot($this, 1, m, 0);
    var v11 = dot($this, 1, m, 1);
    var v12 = dot($this, 1, m, 2);
    var v13 = dot($this, 1, m, 3);
    var v20 = dot($this, 2, m, 0);
    var v21 = dot($this, 2, m, 1);
    var v22 = dot($this, 2, m, 2);
    var v23 = dot($this, 2, m, 3);
    var v30 = dot($this, 3, m, 0);
    var v31 = dot($this, 3, m, 1);
    var v32 = dot($this, 3, m, 2);
    var v33 = dot($this, 3, m, 3);
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] = v00;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] = v01;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] = v02;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0] = v03;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] = v10;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] = v11;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] = v12;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0] = v13;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0] = v20;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0] = v21;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0] = v22;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 3 | 0] = v23;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0] = v30;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0] = v31;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0] = v32;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 3 | 0] = v33;
  }
  function Matrix__toString_impl_l0abk0($this) {
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_0 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_1 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_2 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_3 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_4 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_5 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_6 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_7 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_8 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_9 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_10 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_11 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_12 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_13 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp$ret$15 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 3 | 0];
    return trimIndent('\n            |' + tmp + ' ' + tmp_0 + ' ' + tmp_1 + ' ' + tmp_2 + '|\n            |' + tmp_3 + ' ' + tmp_4 + ' ' + tmp_5 + ' ' + tmp_6 + '|\n            |' + tmp_7 + ' ' + tmp_8 + ' ' + tmp_9 + ' ' + tmp_10 + '|\n            |' + tmp_11 + ' ' + tmp_12 + ' ' + tmp_13 + ' ' + tmp$ret$15 + '|\n        ');
  }
  function Matrix__reset_impl_4l49i7($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var c = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 <= 3)
          do {
            var r = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
            var v = c === r ? 1.0 : 0.0;
            _Matrix___get_values__impl__fblr7b($this)[imul(r, 4) + c | 0] = v;
          }
           while (inductionVariable_0 <= 3);
      }
       while (inductionVariable <= 3);
  }
  function Matrix__rotateX_impl_3e5y7j($this, degrees) {
    // Inline function 'kotlin.math.cos' call
    var x = degrees * get_PI() / 180.0;
    var c = Math.cos(x);
    // Inline function 'kotlin.math.sin' call
    var x_0 = degrees * get_PI() / 180.0;
    var s = Math.sin(x_0);
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a01 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a02 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0];
    var v01 = a01 * c - a02 * s;
    var v02 = a01 * s + a02 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a11 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a12 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0];
    var v11 = a11 * c - a12 * s;
    var v12 = a11 * s + a12 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a21 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a22 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0];
    var v21 = a21 * c - a22 * s;
    var v22 = a21 * s + a22 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a31 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a32 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0];
    var v31 = a31 * c - a32 * s;
    var v32 = a31 * s + a32 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] = v01;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] = v02;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] = v11;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] = v12;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0] = v21;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0] = v22;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0] = v31;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0] = v32;
  }
  function Matrix__rotateY_impl_2x4btc($this, degrees) {
    // Inline function 'kotlin.math.cos' call
    var x = degrees * get_PI() / 180.0;
    var c = Math.cos(x);
    // Inline function 'kotlin.math.sin' call
    var x_0 = degrees * get_PI() / 180.0;
    var s = Math.sin(x_0);
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a00 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a02 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0];
    var v00 = a00 * c + a02 * s;
    var v02 = -a00 * s + a02 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a10 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a12 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0];
    var v10 = a10 * c + a12 * s;
    var v12 = -a10 * s + a12 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a20 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a22 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0];
    var v20 = a20 * c + a22 * s;
    var v22 = -a20 * s + a22 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a30 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a32 = _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0];
    var v30 = a30 * c + a32 * s;
    var v32 = -a30 * s + a32 * c;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] = v00;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] = v02;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] = v10;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] = v12;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0] = v20;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0] = v22;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0] = v30;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0] = v32;
  }
  function Matrix__rotateZ_impl_2g2pf5($this, degrees) {
    // Inline function 'kotlin.math.cos' call
    var x = degrees * get_PI() / 180.0;
    var c = Math.cos(x);
    // Inline function 'kotlin.math.sin' call
    var x_0 = degrees * get_PI() / 180.0;
    var s = Math.sin(x_0);
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a00 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a10 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0];
    var v00 = c * a00 + s * a10;
    var v10 = -s * a00 + c * a10;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a01 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a11 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0];
    var v01 = c * a01 + s * a11;
    var v11 = -s * a01 + c * a11;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a02 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a12 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0];
    var v02 = c * a02 + s * a12;
    var v12 = -s * a02 + c * a12;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a03 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var a13 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0];
    var v03 = c * a03 + s * a13;
    var v13 = -s * a03 + c * a13;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] = v00;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] = v01;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] = v02;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0] = v03;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] = v10;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] = v11;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] = v12;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0] = v13;
  }
  function Matrix__scale_impl_6w89a4($this, x, y, z) {
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] * x;
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] = v;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_0 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] * x;
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] = v_0;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_1 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] * x;
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] = v_1;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_2 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0] * x;
    _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0] = v_2;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_3 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] * y;
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] = v_3;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_4 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] * y;
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] = v_4;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_5 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] * y;
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] = v_5;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_6 = _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0] * y;
    _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0] = v_6;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_7 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0] * z;
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0] = v_7;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_8 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0] * z;
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0] = v_8;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_9 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0] * z;
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0] = v_9;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var v_10 = _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 3 | 0] * z;
    _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 3 | 0] = v_10;
  }
  function Matrix__scale$default_impl_snaws9($this, x, y, z, $super) {
    x = x === VOID ? 1.0 : x;
    y = y === VOID ? 1.0 : y;
    z = z === VOID ? 1.0 : z;
    var tmp;
    if ($super === VOID) {
      Matrix__scale_impl_6w89a4($this, x, y, z);
      tmp = Unit_instance;
    } else {
      var tmp_0 = $super;
      tmp = (tmp_0 == null ? null : new Matrix(tmp_0)).n3w.call(new Matrix($this), x, y, z);
    }
    return tmp;
  }
  function Matrix__translate_impl_1hftog($this, x, y, z) {
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 0 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_0 = tmp + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 0 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_1 = tmp_0 + _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 0 | 0] * z;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var t1 = tmp_1 + _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_2 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 1 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_3 = tmp_2 + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 1 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_4 = tmp_3 + _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 1 | 0] * z;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var t2 = tmp_4 + _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_5 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 2 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_6 = tmp_5 + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 2 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_7 = tmp_6 + _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 2 | 0] * z;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var t3 = tmp_7 + _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_8 = _Matrix___get_values__impl__fblr7b($this)[imul(0, 4) + 3 | 0] * x;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_9 = tmp_8 + _Matrix___get_values__impl__fblr7b($this)[imul(1, 4) + 3 | 0] * y;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_10 = tmp_9 + _Matrix___get_values__impl__fblr7b($this)[imul(2, 4) + 3 | 0] * z;
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var t4 = tmp_10 + _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 0 | 0] = t1;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 1 | 0] = t2;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 2 | 0] = t3;
    // Inline function 'androidx.compose.ui.graphics.Matrix.set' call
    _Matrix___get_values__impl__fblr7b($this)[imul(3, 4) + 3 | 0] = t4;
  }
  function Matrix__translate$default_impl_10t8ql($this, x, y, z, $super) {
    x = x === VOID ? 0.0 : x;
    y = y === VOID ? 0.0 : y;
    z = z === VOID ? 0.0 : z;
    var tmp;
    if ($super === VOID) {
      Matrix__translate_impl_1hftog($this, x, y, z);
      tmp = Unit_instance;
    } else {
      var tmp_0 = $super;
      tmp = (tmp_0 == null ? null : new Matrix(tmp_0)).o3w.call(new Matrix($this), x, y, z);
    }
    return tmp;
  }
  function Companion_5() {
    this.p3w_1 = 0;
    this.q3w_1 = 1;
    this.r3w_1 = 3;
    this.s3w_1 = 4;
    this.t3w_1 = 5;
    this.u3w_1 = 7;
    this.v3w_1 = 10;
    this.w3w_1 = 12;
    this.x3w_1 = 13;
    this.y3w_1 = 14;
    this.z3w_1 = 15;
  }
  var Companion_instance_7;
  function Companion_getInstance_10() {
    return Companion_instance_7;
  }
  function Matrix__hashCode_impl_s9ntm9($this) {
    return hashCode($this);
  }
  function Matrix__equals_impl_g5p8p9($this, other) {
    if (!(other instanceof Matrix))
      return false;
    var tmp0_other_with_cast = other instanceof Matrix ? other.m3w_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function Matrix(values) {
    this.m3w_1 = values;
  }
  protoOf(Matrix).toString = function () {
    return Matrix__toString_impl_l0abk0(this.m3w_1);
  };
  protoOf(Matrix).hashCode = function () {
    return Matrix__hashCode_impl_s9ntm9(this.m3w_1);
  };
  protoOf(Matrix).equals = function (other) {
    return Matrix__equals_impl_g5p8p9(this.m3w_1, other);
  };
  function dot(m1, row, m2, column) {
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp = _Matrix___get_values__impl__fblr7b(m1)[imul(row, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_0 = tmp * _Matrix___get_values__impl__fblr7b(m2)[imul(0, 4) + column | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_1 = _Matrix___get_values__impl__fblr7b(m1)[imul(row, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_2 = tmp_0 + tmp_1 * _Matrix___get_values__impl__fblr7b(m2)[imul(1, 4) + column | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_3 = _Matrix___get_values__impl__fblr7b(m1)[imul(row, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_4 = tmp_2 + tmp_3 * _Matrix___get_values__impl__fblr7b(m2)[imul(2, 4) + column | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_5 = _Matrix___get_values__impl__fblr7b(m1)[imul(row, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    return tmp_4 + tmp_5 * _Matrix___get_values__impl__fblr7b(m2)[imul(3, 4) + column | 0];
  }
  function isIdentity(_this__u8e3s4) {
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var row = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var inductionVariable_0 = 0;
        if (inductionVariable_0 <= 3)
          do {
            var column = inductionVariable_0;
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            var expected = row === column ? 1.0 : 0.0;
            // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
            if (!(_Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(row, 4) + column | 0] === expected)) {
              return false;
            }
          }
           while (inductionVariable_0 <= 3);
      }
       while (inductionVariable <= 3);
    return true;
  }
  function Rectangle(rect) {
    Outline.call(this);
    this.a3x_1 = rect;
  }
  protoOf(Rectangle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Rectangle))
      return false;
    if (!this.a3x_1.equals(other.a3x_1))
      return false;
    return true;
  };
  protoOf(Rectangle).hashCode = function () {
    return this.a3x_1.hashCode();
  };
  function Rounded(roundRect) {
    Outline.call(this);
    this.b3x_1 = roundRect;
    var tmp = this;
    var tmp_0;
    if (!hasSameCornerRadius(this.b3x_1)) {
      // Inline function 'kotlin.apply' call
      var this_0 = Path_0();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.Rounded.<anonymous>' call
      this_0.d3x(this.b3x_1);
      tmp_0 = this_0;
    } else {
      tmp_0 = null;
    }
    tmp.c3x_1 = tmp_0;
  }
  protoOf(Rounded).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Rounded))
      return false;
    if (!this.b3x_1.equals(other.b3x_1))
      return false;
    return true;
  };
  protoOf(Rounded).hashCode = function () {
    return this.b3x_1.hashCode();
  };
  function Generic() {
  }
  function Outline() {
  }
  function hasSameCornerRadius(_this__u8e3s4) {
    var sameRadiusX = (_CornerRadius___get_x__impl__1594cn(_this__u8e3s4.u34_1) === _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.t34_1) ? _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.t34_1) === _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.s34_1) : false) ? _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.s34_1) === _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.r34_1) : false;
    var sameRadiusY = (_CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.u34_1) === _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.t34_1) ? _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.t34_1) === _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.s34_1) : false) ? _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.s34_1) === _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.r34_1) : false;
    return sameRadiusX ? sameRadiusY : false;
  }
  function drawOutline(_this__u8e3s4, outline, color, alpha, style, colorFilter, blendMode) {
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    // Inline function 'androidx.compose.ui.graphics.drawOutlineHelper' call
    var tmp;
    if (outline instanceof Rectangle) {
      var rect = outline.a3x_1;
      _this__u8e3s4.j3x(color, topLeft(rect), size(rect), alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      if (outline instanceof Rounded) {
        var path = outline.c3x_1;
        var tmp_0;
        if (!(path == null)) {
          _this__u8e3s4.h3x(path, color, alpha, style, colorFilter, blendMode);
          tmp_0 = Unit_instance;
        } else {
          var rrect = outline.b3x_1;
          var radius = _CornerRadius___get_x__impl__1594cn(rrect.u34_1);
          var tmp0_topLeft = topLeft_0(rrect);
          var tmp1_size = size_0(rrect);
          var tmp2_cornerRadius = CornerRadius(radius);
          _this__u8e3s4.i3x(color, tmp0_topLeft, tmp1_size, tmp2_cornerRadius, style, alpha, colorFilter, blendMode);
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else {
        if (outline instanceof Generic) {
          var path_0 = outline.g3x_1;
          _this__u8e3s4.h3x(path_0, color, alpha, style, colorFilter, blendMode);
          tmp = Unit_instance;
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return tmp;
  }
  function drawOutline_0(_this__u8e3s4, outline, brush, alpha, style, colorFilter, blendMode) {
    alpha = alpha === VOID ? 1.0 : alpha;
    style = style === VOID ? Fill_getInstance() : style;
    colorFilter = colorFilter === VOID ? null : colorFilter;
    blendMode = blendMode === VOID ? Companion_getInstance_26().e3x_1 : blendMode;
    // Inline function 'androidx.compose.ui.graphics.drawOutlineHelper' call
    var tmp;
    if (outline instanceof Rectangle) {
      var rect = outline.a3x_1;
      _this__u8e3s4.m3x(brush, topLeft(rect), size(rect), alpha, style, colorFilter, blendMode);
      tmp = Unit_instance;
    } else {
      if (outline instanceof Rounded) {
        var path = outline.c3x_1;
        var tmp_0;
        if (!(path == null)) {
          _this__u8e3s4.k3x(path, brush, alpha, style, colorFilter, blendMode);
          tmp_0 = Unit_instance;
        } else {
          var rrect = outline.b3x_1;
          var radius = _CornerRadius___get_x__impl__1594cn(rrect.u34_1);
          _this__u8e3s4.l3x(brush, topLeft_0(rrect), size_0(rrect), CornerRadius(radius), alpha, style, colorFilter, blendMode);
          tmp_0 = Unit_instance;
        }
        tmp = tmp_0;
      } else {
        if (outline instanceof Generic) {
          var path_0 = outline.g3x_1;
          _this__u8e3s4.k3x(path_0, brush, alpha, style, colorFilter, blendMode);
          tmp = Unit_instance;
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return tmp;
  }
  function topLeft(_this__u8e3s4) {
    return Offset(_this__u8e3s4.a34_1, _this__u8e3s4.b34_1);
  }
  function size(_this__u8e3s4) {
    return Size(_this__u8e3s4.e34(), _this__u8e3s4.f34());
  }
  function topLeft_0(_this__u8e3s4) {
    return Offset(_this__u8e3s4.n34_1, _this__u8e3s4.o34_1);
  }
  function size_0(_this__u8e3s4) {
    return Size(_this__u8e3s4.e34(), _this__u8e3s4.f34());
  }
  function _PaintingStyle___init__impl__pwxppo(value) {
    return value;
  }
  function Companion_6() {
    Companion_instance_8 = this;
    this.n3x_1 = _PaintingStyle___init__impl__pwxppo(0);
    this.o3x_1 = _PaintingStyle___init__impl__pwxppo(1);
  }
  var Companion_instance_8;
  function Companion_getInstance_11() {
    if (Companion_instance_8 == null)
      new Companion_6();
    return Companion_instance_8;
  }
  function Path() {
  }
  function _PathFillType___init__impl__d59lzz(value) {
    return value;
  }
  function Companion_7() {
    Companion_instance_9 = this;
    this.u3x_1 = _PathFillType___init__impl__d59lzz(0);
    this.v3x_1 = _PathFillType___init__impl__d59lzz(1);
  }
  var Companion_instance_9;
  function Companion_getInstance_12() {
    if (Companion_instance_9 == null)
      new Companion_7();
    return Companion_instance_9;
  }
  function _PathOperation___init__impl__8ddeif(value) {
    return value;
  }
  function Companion_8() {
    Companion_instance_10 = this;
    this.w3x_1 = _PathOperation___init__impl__8ddeif(0);
    this.x3x_1 = _PathOperation___init__impl__8ddeif(1);
    this.y3x_1 = _PathOperation___init__impl__8ddeif(2);
    this.z3x_1 = _PathOperation___init__impl__8ddeif(3);
    this.a3y_1 = _PathOperation___init__impl__8ddeif(4);
  }
  var Companion_instance_10;
  function Companion_getInstance_13() {
    if (Companion_instance_10 == null)
      new Companion_8();
    return Companion_instance_10;
  }
  function get_RectangleShape() {
    _init_properties_RectangleShape_kt__k3dd0u();
    return RectangleShape;
  }
  var RectangleShape;
  function RectangleShape$1() {
  }
  protoOf(RectangleShape$1).b3y = function (size, layoutDirection, density) {
    return new Rectangle(toRect(size));
  };
  protoOf(RectangleShape$1).toString = function () {
    return 'RectangleShape';
  };
  var properties_initialized_RectangleShape_kt_h73j90;
  function _init_properties_RectangleShape_kt__k3dd0u() {
    if (!properties_initialized_RectangleShape_kt_h73j90) {
      properties_initialized_RectangleShape_kt_h73j90 = true;
      RectangleShape = new RectangleShape$1();
    }
  }
  function LinearGradientShader(from, to, colors, colorStops, tileMode) {
    colorStops = colorStops === VOID ? null : colorStops;
    tileMode = tileMode === VOID ? Companion_getInstance_17().r3q_1 : tileMode;
    return ActualLinearGradientShader(from, to, colors, colorStops, tileMode);
  }
  function Companion_9() {
    Companion_instance_11 = this;
    this.c3y_1 = new Shadow();
  }
  var Companion_instance_11;
  function Companion_getInstance_14() {
    if (Companion_instance_11 == null)
      new Companion_9();
    return Companion_instance_11;
  }
  function Shadow(color, offset, blurRadius) {
    Companion_getInstance_14();
    color = color === VOID ? Color_2(new Long(-16777216, 0)) : color;
    offset = offset === VOID ? Companion_getInstance_0().u33_1 : offset;
    blurRadius = blurRadius === VOID ? 0.0 : blurRadius;
    this.d3y_1 = color;
    this.e3y_1 = offset;
    this.f3y_1 = blurRadius;
  }
  protoOf(Shadow).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Shadow))
      return false;
    if (!equals(this.d3y_1, other.d3y_1))
      return false;
    if (!equals(this.e3y_1, other.e3y_1))
      return false;
    if (!(this.f3y_1 === other.f3y_1))
      return false;
    return true;
  };
  protoOf(Shadow).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.d3y_1);
    result = imul(31, result) + Offset__hashCode_impl_hbql41(this.e3y_1) | 0;
    result = imul(31, result) + getNumberHashCode(this.f3y_1) | 0;
    return result;
  };
  protoOf(Shadow).toString = function () {
    return 'Shadow(color=' + new Color(this.d3y_1) + ', offset=' + new Offset_0(this.e3y_1) + ', blurRadius=' + this.f3y_1 + ')';
  };
  function _StrokeCap___init__impl__kfgr27(value) {
    return value;
  }
  function Companion_10() {
    Companion_instance_12 = this;
    this.g3y_1 = _StrokeCap___init__impl__kfgr27(0);
    this.h3y_1 = _StrokeCap___init__impl__kfgr27(1);
    this.i3y_1 = _StrokeCap___init__impl__kfgr27(2);
  }
  var Companion_instance_12;
  function Companion_getInstance_15() {
    if (Companion_instance_12 == null)
      new Companion_10();
    return Companion_instance_12;
  }
  function StrokeCap__toString_impl_3xn0rd($this) {
    return $this === Companion_getInstance_15().g3y_1 ? 'Butt' : $this === Companion_getInstance_15().h3y_1 ? 'Round' : $this === Companion_getInstance_15().i3y_1 ? 'Square' : 'Unknown';
  }
  function StrokeCap__hashCode_impl_posxk8($this) {
    return $this;
  }
  function StrokeCap__equals_impl_m9bjik($this, other) {
    if (!(other instanceof StrokeCap))
      return false;
    if (!($this === (other instanceof StrokeCap ? other.j3y_1 : THROW_CCE())))
      return false;
    return true;
  }
  function StrokeCap(value) {
    Companion_getInstance_15();
    this.j3y_1 = value;
  }
  protoOf(StrokeCap).toString = function () {
    return StrokeCap__toString_impl_3xn0rd(this.j3y_1);
  };
  protoOf(StrokeCap).hashCode = function () {
    return StrokeCap__hashCode_impl_posxk8(this.j3y_1);
  };
  protoOf(StrokeCap).equals = function (other) {
    return StrokeCap__equals_impl_m9bjik(this.j3y_1, other);
  };
  function _StrokeJoin___init__impl__ig23zz(value) {
    return value;
  }
  function Companion_11() {
    Companion_instance_13 = this;
    this.k3y_1 = _StrokeJoin___init__impl__ig23zz(0);
    this.l3y_1 = _StrokeJoin___init__impl__ig23zz(1);
    this.m3y_1 = _StrokeJoin___init__impl__ig23zz(2);
  }
  var Companion_instance_13;
  function Companion_getInstance_16() {
    if (Companion_instance_13 == null)
      new Companion_11();
    return Companion_instance_13;
  }
  function StrokeJoin__toString_impl_ph4e1r($this) {
    return $this === Companion_getInstance_16().k3y_1 ? 'Miter' : $this === Companion_getInstance_16().l3y_1 ? 'Round' : $this === Companion_getInstance_16().m3y_1 ? 'Bevel' : 'Unknown';
  }
  function StrokeJoin__hashCode_impl_3pyh8w($this) {
    return $this;
  }
  function StrokeJoin__equals_impl_hf9ej8($this, other) {
    if (!(other instanceof StrokeJoin))
      return false;
    if (!($this === (other instanceof StrokeJoin ? other.n3y_1 : THROW_CCE())))
      return false;
    return true;
  }
  function StrokeJoin(value) {
    Companion_getInstance_16();
    this.n3y_1 = value;
  }
  protoOf(StrokeJoin).toString = function () {
    return StrokeJoin__toString_impl_ph4e1r(this.n3y_1);
  };
  protoOf(StrokeJoin).hashCode = function () {
    return StrokeJoin__hashCode_impl_3pyh8w(this.n3y_1);
  };
  protoOf(StrokeJoin).equals = function (other) {
    return StrokeJoin__equals_impl_hf9ej8(this.n3y_1, other);
  };
  function _TileMode___init__impl__syhjao(value) {
    return value;
  }
  function Companion_12() {
    Companion_instance_14 = this;
    this.r3q_1 = _TileMode___init__impl__syhjao(0);
    this.s3q_1 = _TileMode___init__impl__syhjao(1);
    this.t3q_1 = _TileMode___init__impl__syhjao(2);
    this.u3q_1 = _TileMode___init__impl__syhjao(3);
  }
  var Companion_instance_14;
  function Companion_getInstance_17() {
    if (Companion_instance_14 == null)
      new Companion_12();
    return Companion_instance_14;
  }
  function TileMode__toString_impl_tlb7f4($this) {
    return $this === Companion_getInstance_17().r3q_1 ? 'Clamp' : $this === Companion_getInstance_17().s3q_1 ? 'Repeated' : $this === Companion_getInstance_17().t3q_1 ? 'Mirror' : $this === Companion_getInstance_17().u3q_1 ? 'Decal' : 'Unknown';
  }
  function TileMode__hashCode_impl_7u5am9($this) {
    return $this;
  }
  function TileMode__equals_impl_7nvbdv($this, other) {
    if (!(other instanceof TileMode))
      return false;
    if (!($this === (other instanceof TileMode ? other.o3y_1 : THROW_CCE())))
      return false;
    return true;
  }
  function TileMode(value) {
    Companion_getInstance_17();
    this.o3y_1 = value;
  }
  protoOf(TileMode).toString = function () {
    return TileMode__toString_impl_tlb7f4(this.o3y_1);
  };
  protoOf(TileMode).hashCode = function () {
    return TileMode__hashCode_impl_7u5am9(this.o3y_1);
  };
  protoOf(TileMode).equals = function (other) {
    return TileMode__equals_impl_7nvbdv(this.o3y_1, other);
  };
  function Adaptation$Companion$Bradford$1() {
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$0 = new Float32Array([0.8951, -0.7502, 0.0389, 0.2664, 1.7135, -0.0685, -0.1614, 0.0367, 1.0296]);
    Adaptation.call(this, tmp$ret$0);
  }
  protoOf(Adaptation$Companion$Bradford$1).toString = function () {
    return 'Bradford';
  };
  function Adaptation$Companion$VonKries$1() {
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$0 = new Float32Array([0.40024, -0.2263, 0.0, 0.7076, 1.16532, 0.0, -0.08081, 0.0457, 0.91822]);
    Adaptation.call(this, tmp$ret$0);
  }
  protoOf(Adaptation$Companion$VonKries$1).toString = function () {
    return 'VonKries';
  };
  function Adaptation$Companion$Ciecat02$1() {
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$0 = new Float32Array([0.7328, -0.7036, 0.003, 0.4296, 1.6975, 0.0136, -0.1624, 0.0061, 0.9834]);
    Adaptation.call(this, tmp$ret$0);
  }
  protoOf(Adaptation$Companion$Ciecat02$1).toString = function () {
    return 'Ciecat02';
  };
  function Companion_13() {
    Companion_instance_15 = this;
    var tmp = this;
    tmp.p3y_1 = new Adaptation$Companion$Bradford$1();
    var tmp_0 = this;
    tmp_0.q3y_1 = new Adaptation$Companion$VonKries$1();
    var tmp_1 = this;
    tmp_1.r3y_1 = new Adaptation$Companion$Ciecat02$1();
  }
  var Companion_instance_15;
  function Companion_getInstance_18() {
    if (Companion_instance_15 == null)
      new Companion_13();
    return Companion_instance_15;
  }
  function Adaptation(transform) {
    Companion_getInstance_18();
    this.s3y_1 = transform;
  }
  function _ColorModel___init__impl__b968n9(packedValue) {
    return packedValue;
  }
  function _ColorModel___get_packedValue__impl__uvxrhj($this) {
    return $this;
  }
  function _ColorModel___get_componentCount__impl__au0uoc($this) {
    // Inline function 'androidx.compose.ui.util.unpackInt1' call
    return _ColorModel___get_packedValue__impl__uvxrhj($this).lb(32).ea();
  }
  function Companion_14() {
    Companion_instance_16 = this;
    var tmp = this;
    // Inline function 'androidx.compose.ui.util.packInts' call
    var tmp$ret$0 = toLong(3).kb(32).ob(toLong(0).nb(new Long(-1, 0)));
    tmp.g3u_1 = _ColorModel___init__impl__b968n9(tmp$ret$0);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.util.packInts' call
    var tmp$ret$1 = toLong(3).kb(32).ob(toLong(1).nb(new Long(-1, 0)));
    tmp_0.h3u_1 = _ColorModel___init__impl__b968n9(tmp$ret$1);
    var tmp_1 = this;
    // Inline function 'androidx.compose.ui.util.packInts' call
    var tmp$ret$2 = toLong(3).kb(32).ob(toLong(2).nb(new Long(-1, 0)));
    tmp_1.i3u_1 = _ColorModel___init__impl__b968n9(tmp$ret$2);
    var tmp_2 = this;
    // Inline function 'androidx.compose.ui.util.packInts' call
    var tmp$ret$3 = toLong(4).kb(32).ob(toLong(3).nb(new Long(-1, 0)));
    tmp_2.j3u_1 = _ColorModel___init__impl__b968n9(tmp$ret$3);
  }
  var Companion_instance_16;
  function Companion_getInstance_19() {
    if (Companion_instance_16 == null)
      new Companion_14();
    return Companion_instance_16;
  }
  function ColorModel__toString_impl_msukd7($this) {
    return equals($this, Companion_getInstance_19().g3u_1) ? 'Rgb' : equals($this, Companion_getInstance_19().h3u_1) ? 'Xyz' : equals($this, Companion_getInstance_19().i3u_1) ? 'Lab' : equals($this, Companion_getInstance_19().j3u_1) ? 'Cmyk' : 'Unknown';
  }
  function ColorModel__hashCode_impl_11onkc($this) {
    return $this.hashCode();
  }
  function ColorModel__equals_impl_dbkfqg($this, other) {
    if (!(other instanceof ColorModel))
      return false;
    var tmp0_other_with_cast = other instanceof ColorModel ? other.t3y_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function ColorModel(packedValue) {
    Companion_getInstance_19();
    this.t3y_1 = packedValue;
  }
  protoOf(ColorModel).toString = function () {
    return ColorModel__toString_impl_msukd7(this.t3y_1);
  };
  protoOf(ColorModel).hashCode = function () {
    return ColorModel__hashCode_impl_11onkc(this.t3y_1);
  };
  protoOf(ColorModel).equals = function (other) {
    return ColorModel__equals_impl_dbkfqg(this.t3y_1, other);
  };
  function Companion_15() {
    this.u3y_1 = -1;
    this.v3y_1 = 63;
  }
  var Companion_instance_17;
  function Companion_getInstance_20() {
    return Companion_instance_17;
  }
  function ColorSpace(name, model, id) {
    this.z3t_1 = name;
    this.a3u_1 = model;
    this.b3u_1 = id;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = this.z3t_1;
    if (charSequenceLength(this_0) === 0) {
      throw IllegalArgumentException_init_$Create$('The name of a color space cannot be null and must contain at least 1 character');
    }
    if (this.b3u_1 < -1 ? true : this.b3u_1 > 63) {
      throw IllegalArgumentException_init_$Create$('The id must be between -1 and 63');
    }
  }
  protoOf(ColorSpace).f3u = function () {
    return _ColorModel___get_componentCount__impl__au0uoc(this.a3u_1);
  };
  protoOf(ColorSpace).e3u = function () {
    return false;
  };
  protoOf(ColorSpace).w3y = function (r, g, b) {
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$0 = new Float32Array([r, g, b]);
    return this.x3y(tmp$ret$0);
  };
  protoOf(ColorSpace).y3y = function (v0, v1, v2) {
    var xyz = this.w3y(v0, v1, v2);
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var val1 = xyz[0];
    var val2 = xyz[1];
    var v1_0 = toLong(toRawBits(val1));
    var v2_0 = toLong(toRawBits(val2));
    return v1_0.kb(32).ob(v2_0.nb(new Long(-1, 0)));
  };
  protoOf(ColorSpace).z3y = function (v0, v1, v2) {
    var xyz = this.w3y(v0, v1, v2);
    return xyz[2];
  };
  protoOf(ColorSpace).a3z = function (x, y, z, a, colorSpace) {
    var colors = this.b3z(x, y, z);
    return Color_1(colors[0], colors[1], colors[2], a, colorSpace);
  };
  protoOf(ColorSpace).b3z = function (x, y, z) {
    var xyz = new Float32Array(_ColorModel___get_componentCount__impl__au0uoc(this.a3u_1));
    xyz[0] = x;
    xyz[1] = y;
    xyz[2] = z;
    return this.c3z(xyz);
  };
  protoOf(ColorSpace).toString = function () {
    return this.z3t_1 + ' (id=' + this.b3u_1 + ', model=' + new ColorModel(this.a3u_1) + ')';
  };
  protoOf(ColorSpace).equals = function (other) {
    if (this === other) {
      return true;
    }
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other))) {
      return false;
    }
    var that = other instanceof ColorSpace ? other : THROW_CCE();
    if (!(this.b3u_1 === that.b3u_1))
      return false;
    return !(this.z3t_1 === that.z3t_1) ? false : equals(this.a3u_1, that.a3u_1);
  };
  protoOf(ColorSpace).hashCode = function () {
    var result = getStringHashCode(this.z3t_1);
    result = imul(31, result) + ColorModel__hashCode_impl_11onkc(this.a3u_1) | 0;
    result = imul(31, result) + this.b3u_1 | 0;
    return result;
  };
  function connect(_this__u8e3s4, destination, intent) {
    destination = destination === VOID ? ColorSpaces_getInstance().x3s_1 : destination;
    intent = intent === VOID ? Companion_getInstance_24().d3z_1 : intent;
    if (_this__u8e3s4 === ColorSpaces_getInstance().x3s_1) {
      if (destination === ColorSpaces_getInstance().x3s_1) {
        return Companion_getInstance_21().h3z_1;
      }
      if (destination === ColorSpaces_getInstance().o3t_1 ? intent === Companion_getInstance_24().d3z_1 : false) {
        return Companion_getInstance_21().i3z_1;
      }
    } else if ((_this__u8e3s4 === ColorSpaces_getInstance().o3t_1 ? destination === ColorSpaces_getInstance().x3s_1 : false) ? intent === Companion_getInstance_24().d3z_1 : false) {
      return Companion_getInstance_21().j3z_1;
    }
    if (_this__u8e3s4 === destination) {
      return Companion_getInstance_21().k3z(_this__u8e3s4);
    }
    var tmp;
    if (equals(_this__u8e3s4.a3u_1, Companion_getInstance_19().g3u_1) ? equals(destination.a3u_1, Companion_getInstance_19().g3u_1) : false) {
      var tmp_0 = _this__u8e3s4 instanceof Rgb ? _this__u8e3s4 : THROW_CCE();
      tmp = new RgbConnector(tmp_0, destination instanceof Rgb ? destination : THROW_CCE(), intent);
    } else {
      tmp = Connector_init_$Create$(_this__u8e3s4, destination, intent);
    }
    return tmp;
  }
  function absRcpResponse(x, a, b, c, d, g) {
    return withSign(rcpResponse(x < 0.0 ? -x : x, a, b, c, d, g), x);
  }
  function absResponse(x, a, b, c, d, g) {
    return withSign(response(x < 0.0 ? -x : x, a, b, c, d, g), x);
  }
  function adapt(_this__u8e3s4, whitePoint, adaptation) {
    adaptation = adaptation === VOID ? Companion_getInstance_18().p3y_1 : adaptation;
    if (equals(_this__u8e3s4.a3u_1, Companion_getInstance_19().g3u_1)) {
      var rgb = _this__u8e3s4 instanceof Rgb ? _this__u8e3s4 : THROW_CCE();
      if (compare_0(rgb.n3u_1, whitePoint)) {
        return _this__u8e3s4;
      }
      var xyz = whitePoint.n3z();
      var adaptationTransform = chromaticAdaptation(adaptation.s3y_1, rgb.n3u_1.n3z(), xyz);
      var transform = mul3x3(adaptationTransform, rgb.s3u_1);
      return Rgb_init_$Create$_1(rgb, transform, whitePoint);
    }
    return _this__u8e3s4;
  }
  function compare(a, b) {
    if (a === b)
      return true;
    var inductionVariable = 0;
    var last = a.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp;
        if (!(compareTo(a[i], b[i]) === 0)) {
          // Inline function 'kotlin.math.abs' call
          var x = a[i] - b[i];
          tmp = Math.abs(x) > 0.001;
        } else {
          tmp = false;
        }
        if (tmp)
          return false;
      }
       while (inductionVariable <= last);
    return true;
  }
  function mul3x3Float3(lhs, rhs) {
    var r0 = rhs[0];
    var r1 = rhs[1];
    var r2 = rhs[2];
    rhs[0] = lhs[0] * r0 + lhs[3] * r1 + lhs[6] * r2;
    rhs[1] = lhs[1] * r0 + lhs[4] * r1 + lhs[7] * r2;
    rhs[2] = lhs[2] * r0 + lhs[5] * r1 + lhs[8] * r2;
    return rhs;
  }
  function mul3x3Float3_0(lhs, r0, r1, r2) {
    return lhs[0] * r0 + lhs[3] * r1 + lhs[6] * r2;
  }
  function mul3x3Float3_1(lhs, r0, r1, r2) {
    return lhs[1] * r0 + lhs[4] * r1 + lhs[7] * r2;
  }
  function mul3x3Float3_2(lhs, r0, r1, r2) {
    return lhs[2] * r0 + lhs[5] * r1 + lhs[8] * r2;
  }
  function compare_0(a, b) {
    if (a === b)
      return true;
    var tmp;
    // Inline function 'kotlin.math.abs' call
    var x = a.l3z_1 - b.l3z_1;
    if (Math.abs(x) < 0.001) {
      // Inline function 'kotlin.math.abs' call
      var x_0 = a.m3z_1 - b.m3z_1;
      tmp = Math.abs(x_0) < 0.001;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function mul3x3(lhs, rhs) {
    var r = new Float32Array(9);
    r[0] = lhs[0] * rhs[0] + lhs[3] * rhs[1] + lhs[6] * rhs[2];
    r[1] = lhs[1] * rhs[0] + lhs[4] * rhs[1] + lhs[7] * rhs[2];
    r[2] = lhs[2] * rhs[0] + lhs[5] * rhs[1] + lhs[8] * rhs[2];
    r[3] = lhs[0] * rhs[3] + lhs[3] * rhs[4] + lhs[6] * rhs[5];
    r[4] = lhs[1] * rhs[3] + lhs[4] * rhs[4] + lhs[7] * rhs[5];
    r[5] = lhs[2] * rhs[3] + lhs[5] * rhs[4] + lhs[8] * rhs[5];
    r[6] = lhs[0] * rhs[6] + lhs[3] * rhs[7] + lhs[6] * rhs[8];
    r[7] = lhs[1] * rhs[6] + lhs[4] * rhs[7] + lhs[7] * rhs[8];
    r[8] = lhs[2] * rhs[6] + lhs[5] * rhs[7] + lhs[8] * rhs[8];
    return r;
  }
  function chromaticAdaptation(matrix, srcWhitePoint, dstWhitePoint) {
    var srcLMS = mul3x3Float3(matrix, srcWhitePoint);
    var dstLMS = mul3x3Float3(matrix, dstWhitePoint);
    // Inline function 'kotlin.floatArrayOf' call
    var LMS = new Float32Array([dstLMS[0] / srcLMS[0], dstLMS[1] / srcLMS[1], dstLMS[2] / srcLMS[2]]);
    return mul3x3(inverse3x3(matrix), mul3x3Diag(LMS, matrix));
  }
  function inverse3x3(m) {
    var a = m[0];
    var b = m[3];
    var c = m[6];
    var d = m[1];
    var e = m[4];
    var f = m[7];
    var g = m[2];
    var h = m[5];
    var i = m[8];
    var xA = e * i - f * h;
    var xB = f * g - d * i;
    var xC = d * h - e * g;
    var det = a * xA + b * xB + c * xC;
    var inverted = new Float32Array(m.length);
    inverted[0] = xA / det;
    inverted[1] = xB / det;
    inverted[2] = xC / det;
    inverted[3] = (c * h - b * i) / det;
    inverted[4] = (a * i - c * g) / det;
    inverted[5] = (b * g - a * h) / det;
    inverted[6] = (b * f - c * e) / det;
    inverted[7] = (c * d - a * f) / det;
    inverted[8] = (a * e - b * d) / det;
    return inverted;
  }
  function mul3x3Diag(lhs, rhs) {
    // Inline function 'kotlin.floatArrayOf' call
    return new Float32Array([lhs[0] * rhs[0], lhs[1] * rhs[1], lhs[2] * rhs[2], lhs[0] * rhs[3], lhs[1] * rhs[4], lhs[2] * rhs[5], lhs[0] * rhs[6], lhs[1] * rhs[7], lhs[2] * rhs[8]]);
  }
  function rcpResponse(x, a, b, c, d, g) {
    var tmp;
    if (x >= d * c) {
      // Inline function 'kotlin.math.pow' call
      var x_0 = 1.0 / g;
      tmp = (Math.pow(x, x_0) - b) / a;
    } else {
      tmp = x / c;
    }
    return tmp;
  }
  function rcpResponse_0(x, a, b, c, d, e, f, g) {
    var tmp;
    if (x >= d * c) {
      // Inline function 'kotlin.math.pow' call
      var this_0 = x - e;
      var x_0 = 1.0 / g;
      tmp = (Math.pow(this_0, x_0) - b) / a;
    } else {
      tmp = (x - f) / c;
    }
    return tmp;
  }
  function response(x, a, b, c, d, g) {
    var tmp;
    if (x >= d) {
      // Inline function 'kotlin.math.pow' call
      var this_0 = a * x + b;
      tmp = Math.pow(this_0, g);
    } else {
      tmp = c * x;
    }
    return tmp;
  }
  function response_0(x, a, b, c, d, e, f, g) {
    var tmp;
    if (x >= d) {
      // Inline function 'kotlin.math.pow' call
      var this_0 = a * x + b;
      tmp = Math.pow(this_0, g) + e;
    } else {
      tmp = c * x + f;
    }
    return tmp;
  }
  function sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0(function_0) {
    this.o3z_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0).c3v = function (double) {
    return this.o3z_1(double);
  };
  function ColorSpaces$ExtendedSrgb$lambda(x) {
    return absRcpResponse(x, 0.9478672985781991, 0.05213270142180095, 0.07739938080495357, 0.04045, 2.4);
  }
  function ColorSpaces$ExtendedSrgb$lambda_0(x) {
    return absResponse(x, 0.9478672985781991, 0.05213270142180095, 0.07739938080495357, 0.04045, 2.4);
  }
  function ColorSpaces() {
    ColorSpaces_instance = this;
    var tmp = this;
    // Inline function 'kotlin.floatArrayOf' call
    tmp.t3s_1 = new Float32Array([0.64, 0.33, 0.3, 0.6, 0.15, 0.06]);
    var tmp_0 = this;
    // Inline function 'kotlin.floatArrayOf' call
    tmp_0.u3s_1 = new Float32Array([0.67, 0.33, 0.21, 0.71, 0.14, 0.08]);
    this.v3s_1 = new TransferParameters(2.4, 0.9478672985781991, 0.05213270142180095, 0.07739938080495357, 0.04045);
    this.w3s_1 = new TransferParameters(2.2, 0.9478672985781991, 0.05213270142180095, 0.07739938080495357, 0.04045);
    this.x3s_1 = Rgb_init_$Create$('sRGB IEC61966-2.1', this.t3s_1, Illuminant_getInstance().v3z_1, this.v3s_1, 0);
    this.y3s_1 = Rgb_init_$Create$_0('sRGB IEC61966-2.1 (Linear)', this.t3s_1, Illuminant_getInstance().v3z_1, 1.0, 0.0, 1.0, 1);
    var tmp_1 = this;
    var tmp_2 = Illuminant_getInstance().v3z_1;
    var tmp_3 = ColorSpaces$ExtendedSrgb$lambda;
    var tmp_4 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0(tmp_3);
    var tmp_5 = ColorSpaces$ExtendedSrgb$lambda_0;
    tmp_1.z3s_1 = new Rgb('scRGB-nl IEC 61966-2-2:2003', this.t3s_1, tmp_2, null, tmp_4, new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0(tmp_5), -0.799, 2.399, this.v3s_1, 2);
    this.a3t_1 = Rgb_init_$Create$_0('scRGB IEC 61966-2-2:2003', this.t3s_1, Illuminant_getInstance().v3z_1, 1.0, -0.5, 7.499, 3);
    var tmp_6 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$2 = new Float32Array([0.64, 0.33, 0.3, 0.6, 0.15, 0.06]);
    tmp_6.b3t_1 = Rgb_init_$Create$('Rec. ITU-R BT.709-5', tmp$ret$2, Illuminant_getInstance().v3z_1, new TransferParameters(2.2222222222222223, 0.9099181073703367, 0.09008189262966333, 0.2222222222222222, 0.081), 4);
    var tmp_7 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$3 = new Float32Array([0.708, 0.292, 0.17, 0.797, 0.131, 0.046]);
    tmp_7.c3t_1 = Rgb_init_$Create$('Rec. ITU-R BT.2020-1', tmp$ret$3, Illuminant_getInstance().v3z_1, new TransferParameters(2.2222222222222223, 0.9096697898662786, 0.09033021013372146, 0.2222222222222222, 0.08145), 5);
    var tmp_8 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$4 = new Float32Array([0.68, 0.32, 0.265, 0.69, 0.15, 0.06]);
    tmp_8.d3t_1 = Rgb_init_$Create$_0('SMPTE RP 431-2-2007 DCI (P3)', tmp$ret$4, new WhitePoint(0.314, 0.351), 2.6, 0.0, 1.0, 6);
    var tmp_9 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$5 = new Float32Array([0.68, 0.32, 0.265, 0.69, 0.15, 0.06]);
    tmp_9.e3t_1 = Rgb_init_$Create$('Display P3', tmp$ret$5, Illuminant_getInstance().v3z_1, this.v3s_1, 7);
    this.f3t_1 = Rgb_init_$Create$('NTSC (1953)', this.u3s_1, Illuminant_getInstance().r3z_1, new TransferParameters(2.2222222222222223, 0.9099181073703367, 0.09008189262966333, 0.2222222222222222, 0.081), 8);
    var tmp_10 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$6 = new Float32Array([0.63, 0.34, 0.31, 0.595, 0.155, 0.07]);
    tmp_10.g3t_1 = Rgb_init_$Create$('SMPTE-C RGB', tmp$ret$6, Illuminant_getInstance().v3z_1, new TransferParameters(2.2222222222222223, 0.9099181073703367, 0.09008189262966333, 0.2222222222222222, 0.081), 9);
    var tmp_11 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$7 = new Float32Array([0.64, 0.33, 0.21, 0.71, 0.15, 0.06]);
    tmp_11.h3t_1 = Rgb_init_$Create$_0('Adobe RGB (1998)', tmp$ret$7, Illuminant_getInstance().v3z_1, 2.2, 0.0, 1.0, 10);
    var tmp_12 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$8 = new Float32Array([0.7347, 0.2653, 0.1596, 0.8404, 0.0366, 1.0E-4]);
    tmp_12.i3t_1 = Rgb_init_$Create$('ROMM RGB ISO 22028-2:2013', tmp$ret$8, Illuminant_getInstance().s3z_1, new TransferParameters(1.8, 1.0, 0.0, 0.0625, 0.031248), 11);
    var tmp_13 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$9 = new Float32Array([0.7347, 0.2653, 0.0, 1.0, 1.0E-4, -0.077]);
    tmp_13.j3t_1 = Rgb_init_$Create$_0('SMPTE ST 2065-1:2012 ACES', tmp$ret$9, Illuminant_getInstance().u3z_1, 1.0, -65504.0, 65504.0, 12);
    var tmp_14 = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$10 = new Float32Array([0.713, 0.293, 0.165, 0.83, 0.128, 0.044]);
    tmp_14.k3t_1 = Rgb_init_$Create$_0('Academy S-2014-004 ACEScg', tmp$ret$10, Illuminant_getInstance().u3z_1, 1.0, -65504.0, 65504.0, 13);
    this.l3t_1 = new Xyz('Generic XYZ', 14);
    this.m3t_1 = new Lab('Generic L*a*b*', 15);
    this.n3t_1 = Rgb_init_$Create$('None', this.t3s_1, Illuminant_getInstance().v3z_1, this.w3s_1, 16);
    this.o3t_1 = new Oklab('Oklab', 17);
    var tmp_15 = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp_15.p3t_1 = [this.x3s_1, this.y3s_1, this.z3s_1, this.a3t_1, this.b3t_1, this.c3t_1, this.d3t_1, this.e3t_1, this.f3t_1, this.g3t_1, this.h3t_1, this.i3t_1, this.j3t_1, this.k3t_1, this.l3t_1, this.m3t_1, this.n3t_1, this.o3t_1];
  }
  var ColorSpaces_instance;
  function ColorSpaces_getInstance() {
    if (ColorSpaces_instance == null)
      new ColorSpaces();
    return ColorSpaces_instance;
  }
  function computeTransform($this, source, destination, intent) {
    if (compare_0(source.n3u_1, destination.n3u_1)) {
      return mul3x3(destination.t3u_1, source.s3u_1);
    } else {
      var transform = source.s3u_1;
      var inverseTransform = destination.t3u_1;
      var srcXYZ = source.n3u_1.n3z();
      var dstXYZ = destination.n3u_1.n3z();
      if (!compare_0(source.n3u_1, Illuminant_getInstance().s3z_1)) {
        var tmp = Companion_getInstance_18().p3y_1.s3y_1;
        // Inline function 'kotlin.collections.copyOf' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$1 = Illuminant_getInstance().y3z_1.slice();
        var srcAdaptation = chromaticAdaptation(tmp, srcXYZ, tmp$ret$1);
        transform = mul3x3(srcAdaptation, source.s3u_1);
      }
      if (!compare_0(destination.n3u_1, Illuminant_getInstance().s3z_1)) {
        var tmp_0 = Companion_getInstance_18().p3y_1.s3y_1;
        // Inline function 'kotlin.collections.copyOf' call
        // Inline function 'kotlin.js.asDynamic' call
        var tmp$ret$3 = Illuminant_getInstance().y3z_1.slice();
        var dstAdaptation = chromaticAdaptation(tmp_0, dstXYZ, tmp$ret$3);
        inverseTransform = inverse3x3(mul3x3(dstAdaptation, destination.s3u_1));
      }
      if (intent === Companion_getInstance_24().g3z_1) {
        // Inline function 'kotlin.floatArrayOf' call
        var tmp$ret$4 = new Float32Array([srcXYZ[0] / dstXYZ[0], srcXYZ[1] / dstXYZ[1], srcXYZ[2] / dstXYZ[2]]);
        transform = mul3x3Diag(tmp$ret$4, transform);
      }
      return mul3x3(inverseTransform, transform);
    }
  }
  function computeTransform_0($this, source, destination, intent) {
    if (!(intent === Companion_getInstance_24().g3z_1))
      return null;
    var srcRGB = equals(source.a3u_1, Companion_getInstance_19().g3u_1);
    var dstRGB = equals(destination.a3u_1, Companion_getInstance_19().g3u_1);
    if (srcRGB ? dstRGB : false)
      return null;
    if (srcRGB ? true : dstRGB) {
      var tmp = srcRGB ? source : destination;
      var rgb = tmp instanceof Rgb ? tmp : THROW_CCE();
      var srcXYZ = srcRGB ? rgb.n3u_1.n3z() : Illuminant_getInstance().y3z_1;
      var dstXYZ = dstRGB ? rgb.n3u_1.n3z() : Illuminant_getInstance().y3z_1;
      // Inline function 'kotlin.floatArrayOf' call
      return new Float32Array([srcXYZ[0] / dstXYZ[0], srcXYZ[1] / dstXYZ[1], srcXYZ[2] / dstXYZ[2]]);
    }
    return null;
  }
  function Connector$Companion$identity$1($source) {
    Connector_init_$Init$($source, $source, Companion_getInstance_24().e3z_1, this);
  }
  protoOf(Connector$Companion$identity$1).w3t = function (r, g, b, a) {
    return Color_1(r, g, b, a, this.r3t_1);
  };
  function Connector_init_$Init$(source, destination, intent, $this) {
    var tmp = equals(source.a3u_1, Companion_getInstance_19().g3u_1) ? adapt(source, Illuminant_getInstance().s3z_1) : source;
    var tmp_0;
    if (equals(destination.a3u_1, Companion_getInstance_19().g3u_1)) {
      tmp_0 = adapt(destination, Illuminant_getInstance().s3z_1);
    } else {
      tmp_0 = destination;
    }
    Connector.call($this, source, destination, tmp, tmp_0, intent, computeTransform_0(Companion_getInstance_21(), source, destination, intent));
    return $this;
  }
  function Connector_init_$Create$(source, destination, intent) {
    return Connector_init_$Init$(source, destination, intent, objectCreate(protoOf(Connector)));
  }
  function RgbConnector(mSource, mDestination, intent) {
    Connector.call(this, mSource, mDestination, mSource, mDestination, intent, null);
    this.l40_1 = mSource;
    this.m40_1 = mDestination;
    this.n40_1 = computeTransform(this, this.l40_1, this.m40_1, intent);
  }
  protoOf(RgbConnector).w3t = function (r, g, b, a) {
    var v0 = this.l40_1.z3u_1.c3v(r);
    var v1 = this.l40_1.z3u_1.c3v(g);
    var v2 = this.l40_1.z3u_1.c3v(b);
    var v01 = mul3x3Float3_0(this.n40_1, v0, v1, v2);
    var v11 = mul3x3Float3_1(this.n40_1, v0, v1, v2);
    var v21 = mul3x3Float3_2(this.n40_1, v0, v1, v2);
    var v02 = this.m40_1.w3u_1.c3v(v01);
    var v12 = this.m40_1.w3u_1.c3v(v11);
    var v22 = this.m40_1.w3u_1.c3v(v21);
    return Color_1(v02, v12, v22, a, this.m40_1);
  };
  function Companion_16() {
    Companion_instance_18 = this;
    this.h3z_1 = this.k3z(ColorSpaces_getInstance().x3s_1);
    this.i3z_1 = Connector_init_$Create$(ColorSpaces_getInstance().x3s_1, ColorSpaces_getInstance().o3t_1, Companion_getInstance_24().d3z_1);
    this.j3z_1 = Connector_init_$Create$(ColorSpaces_getInstance().o3t_1, ColorSpaces_getInstance().x3s_1, Companion_getInstance_24().d3z_1);
  }
  protoOf(Companion_16).k3z = function (source) {
    return new Connector$Companion$identity$1(source);
  };
  var Companion_instance_18;
  function Companion_getInstance_21() {
    if (Companion_instance_18 == null)
      new Companion_16();
    return Companion_instance_18;
  }
  function Connector(source, destination, transformSource, transformDestination, renderIntent, transform) {
    Companion_getInstance_21();
    this.q3t_1 = source;
    this.r3t_1 = destination;
    this.s3t_1 = transformSource;
    this.t3t_1 = transformDestination;
    this.u3t_1 = renderIntent;
    this.v3t_1 = transform;
  }
  protoOf(Connector).w3t = function (r, g, b, a) {
    var packed = this.s3t_1.y3y(r, g, b);
    // Inline function 'androidx.compose.ui.util.unpackFloat1' call
    // Inline function 'kotlin.fromBits' call
    var bits = packed.lb(32).ea();
    var x = floatFromBits(bits);
    // Inline function 'androidx.compose.ui.util.unpackFloat2' call
    // Inline function 'kotlin.fromBits' call
    var bits_0 = packed.nb(new Long(-1, 0)).ea();
    var y = floatFromBits(bits_0);
    var z = this.s3t_1.z3y(r, g, b);
    if (!(this.v3t_1 == null)) {
      x = x * this.v3t_1[0];
      y = y * this.v3t_1[1];
      z = z * this.v3t_1[2];
    }
    return this.t3t_1.a3z(x, y, z, a, this.r3t_1);
  };
  function Illuminant() {
    Illuminant_instance = this;
    this.p3z_1 = new WhitePoint(0.44757, 0.40745);
    this.q3z_1 = new WhitePoint(0.34842, 0.35161);
    this.r3z_1 = new WhitePoint(0.31006, 0.31616);
    this.s3z_1 = new WhitePoint(0.34567, 0.3585);
    this.t3z_1 = new WhitePoint(0.33242, 0.34743);
    this.u3z_1 = new WhitePoint(0.32168, 0.33767);
    this.v3z_1 = new WhitePoint(0.31271, 0.32902);
    this.w3z_1 = new WhitePoint(0.29902, 0.31485);
    this.x3z_1 = new WhitePoint(0.33333, 0.33333);
    var tmp = this;
    // Inline function 'kotlin.floatArrayOf' call
    tmp.y3z_1 = new Float32Array([0.964212, 1.0, 0.825188]);
  }
  var Illuminant_instance;
  function Illuminant_getInstance() {
    if (Illuminant_instance == null)
      new Illuminant();
    return Illuminant_instance;
  }
  function Companion_17() {
    this.o40_1 = 0.008856452;
    this.p40_1 = 7.787037;
    this.q40_1 = 0.13793103;
    this.r40_1 = 0.20689656;
  }
  var Companion_instance_19;
  function Companion_getInstance_22() {
    return Companion_instance_19;
  }
  function Lab(name, id) {
    ColorSpace.call(this, name, Companion_getInstance_19().i3u_1, id);
  }
  protoOf(Lab).c3u = function (component) {
    return component === 0 ? 0.0 : -128.0;
  };
  protoOf(Lab).d3u = function (component) {
    return component === 0 ? 100.0 : 128.0;
  };
  protoOf(Lab).x3y = function (v) {
    v[0] = coerceIn(v[0], 0.0, 100.0);
    v[1] = coerceIn(v[1], -128.0, 128.0);
    v[2] = coerceIn(v[2], -128.0, 128.0);
    var fy = (v[0] + 16.0) / 116.0;
    var fx = fy + v[1] * 0.002;
    var fz = fy - v[2] * 0.005;
    var x = fx > 0.20689656 ? fx * fx * fx : 0.12841854995680643 * (fx - 0.13793103);
    var y = fy > 0.20689656 ? fy * fy * fy : 0.12841854995680643 * (fy - 0.13793103);
    var z = fz > 0.20689656 ? fz * fz * fz : 0.12841854995680643 * (fz - 0.13793103);
    v[0] = x * Illuminant_getInstance().y3z_1[0];
    v[1] = y * Illuminant_getInstance().y3z_1[1];
    v[2] = z * Illuminant_getInstance().y3z_1[2];
    return v;
  };
  protoOf(Lab).y3y = function (v0, v1, v2) {
    var v00 = coerceIn(v0, 0.0, 100.0);
    var v10 = coerceIn(v1, -128.0, 128.0);
    var fy = (v00 + 16.0) / 116.0;
    var fx = fy + v10 * 0.002;
    var x = fx > 0.20689656 ? fx * fx * fx : 0.12841854995680643 * (fx - 0.13793103);
    var y = fy > 0.20689656 ? fy * fy * fy : 0.12841854995680643 * (fy - 0.13793103);
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var val1 = x * Illuminant_getInstance().y3z_1[0];
    var val2 = y * Illuminant_getInstance().y3z_1[1];
    var v1_0 = toLong(toRawBits(val1));
    var v2_0 = toLong(toRawBits(val2));
    return v1_0.kb(32).ob(v2_0.nb(new Long(-1, 0)));
  };
  protoOf(Lab).z3y = function (v0, v1, v2) {
    var v00 = coerceIn(v0, 0.0, 100.0);
    var v20 = coerceIn(v2, -128.0, 128.0);
    var fy = (v00 + 16.0) / 116.0;
    var fz = fy - v20 * 0.005;
    var z = fz > 0.20689656 ? fz * fz * fz : 0.12841854995680643 * (fz - 0.13793103);
    return z * Illuminant_getInstance().y3z_1[2];
  };
  protoOf(Lab).a3z = function (x, y, z, a, colorSpace) {
    var x1 = x / Illuminant_getInstance().y3z_1[0];
    var y1 = y / Illuminant_getInstance().y3z_1[1];
    var z1 = z / Illuminant_getInstance().y3z_1[2];
    var tmp;
    if (x1 > 0.008856452) {
      // Inline function 'kotlin.math.pow' call
      var x_0 = 0.3333333333333333;
      tmp = Math.pow(x1, x_0);
    } else {
      tmp = 7.787037 * x1 + 0.13793103;
    }
    var fx = tmp;
    var tmp_0;
    if (y1 > 0.008856452) {
      // Inline function 'kotlin.math.pow' call
      var x_1 = 0.3333333333333333;
      tmp_0 = Math.pow(y1, x_1);
    } else {
      tmp_0 = 7.787037 * y1 + 0.13793103;
    }
    var fy = tmp_0;
    var tmp_1;
    if (z1 > 0.008856452) {
      // Inline function 'kotlin.math.pow' call
      var x_2 = 0.3333333333333333;
      tmp_1 = Math.pow(z1, x_2);
    } else {
      tmp_1 = 7.787037 * z1 + 0.13793103;
    }
    var fz = tmp_1;
    var l = 116.0 * fy - 16.0;
    var a1 = 500.0 * (fx - fy);
    var b = 200.0 * (fy - fz);
    return Color_1(coerceIn(l, 0.0, 100.0), coerceIn(a1, -128.0, 128.0), coerceIn(b, -128.0, 128.0), a, colorSpace);
  };
  protoOf(Lab).c3z = function (v) {
    var x = v[0] / Illuminant_getInstance().y3z_1[0];
    var y = v[1] / Illuminant_getInstance().y3z_1[1];
    var z = v[2] / Illuminant_getInstance().y3z_1[2];
    var tmp;
    if (x > 0.008856452) {
      // Inline function 'kotlin.math.pow' call
      var x_0 = 0.3333333333333333;
      tmp = Math.pow(x, x_0);
    } else {
      tmp = 7.787037 * x + 0.13793103;
    }
    var fx = tmp;
    var tmp_0;
    if (y > 0.008856452) {
      // Inline function 'kotlin.math.pow' call
      var x_1 = 0.3333333333333333;
      tmp_0 = Math.pow(y, x_1);
    } else {
      tmp_0 = 7.787037 * y + 0.13793103;
    }
    var fy = tmp_0;
    var tmp_1;
    if (z > 0.008856452) {
      // Inline function 'kotlin.math.pow' call
      var x_2 = 0.3333333333333333;
      tmp_1 = Math.pow(z, x_2);
    } else {
      tmp_1 = 7.787037 * z + 0.13793103;
    }
    var fz = tmp_1;
    var l = 116.0 * fy - 16.0;
    var a = 500.0 * (fx - fy);
    var b = 200.0 * (fy - fz);
    v[0] = coerceIn(l, 0.0, 100.0);
    v[1] = coerceIn(a, -128.0, 128.0);
    v[2] = coerceIn(b, -128.0, 128.0);
    return v;
  };
  function Companion_18() {
    Companion_instance_20 = this;
    var tmp = this;
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$0 = new Float32Array([0.818933, 0.032984544, 0.0482003, 0.36186674, 0.9293119, 0.26436627, -0.12885971, 0.03614564, 0.6338517]);
    tmp.v40_1 = mul3x3(tmp$ret$0, chromaticAdaptation(Companion_getInstance_18().p3y_1.s3y_1, Illuminant_getInstance().s3z_1.n3z(), Illuminant_getInstance().v3z_1.n3z()));
    var tmp_0 = this;
    // Inline function 'kotlin.floatArrayOf' call
    tmp_0.w40_1 = new Float32Array([0.21045426, 1.9779985, 0.025904037, 0.7936178, -2.4285922, 0.78277177, -0.004072047, 0.4505937, -0.80867577]);
    this.x40_1 = inverse3x3(this.v40_1);
    this.y40_1 = inverse3x3(this.w40_1);
  }
  var Companion_instance_20;
  function Companion_getInstance_23() {
    if (Companion_instance_20 == null)
      new Companion_18();
    return Companion_instance_20;
  }
  function Oklab(name, id) {
    Companion_getInstance_23();
    ColorSpace.call(this, name, Companion_getInstance_19().i3u_1, id);
  }
  protoOf(Oklab).c3u = function (component) {
    return component === 0 ? 0.0 : -0.5;
  };
  protoOf(Oklab).d3u = function (component) {
    return component === 0 ? 1.0 : 0.5;
  };
  protoOf(Oklab).x3y = function (v) {
    v[0] = coerceIn(v[0], 0.0, 1.0);
    v[1] = coerceIn(v[1], -0.5, 0.5);
    v[2] = coerceIn(v[2], -0.5, 0.5);
    mul3x3Float3(Companion_getInstance_23().y40_1, v);
    v[0] = v[0] * v[0] * v[0];
    v[1] = v[1] * v[1] * v[1];
    v[2] = v[2] * v[2] * v[2];
    mul3x3Float3(Companion_getInstance_23().x40_1, v);
    return v;
  };
  protoOf(Oklab).y3y = function (v0, v1, v2) {
    var v00 = coerceIn(v0, 0.0, 1.0);
    var v10 = coerceIn(v1, -0.5, 0.5);
    var v20 = coerceIn(v2, -0.5, 0.5);
    var v01 = mul3x3Float3_0(Companion_getInstance_23().y40_1, v00, v10, v20);
    var v11 = mul3x3Float3_1(Companion_getInstance_23().y40_1, v00, v10, v20);
    var v21 = mul3x3Float3_2(Companion_getInstance_23().y40_1, v00, v10, v20);
    var v02 = v01 * v01 * v01;
    var v12 = v11 * v11 * v11;
    var v22 = v21 * v21 * v21;
    var v03 = mul3x3Float3_0(Companion_getInstance_23().x40_1, v02, v12, v22);
    var v13 = mul3x3Float3_1(Companion_getInstance_23().x40_1, v02, v12, v22);
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1_0 = toLong(toRawBits(v03));
    var v2_0 = toLong(toRawBits(v13));
    return v1_0.kb(32).ob(v2_0.nb(new Long(-1, 0)));
  };
  protoOf(Oklab).z3y = function (v0, v1, v2) {
    var v00 = coerceIn(v0, 0.0, 1.0);
    var v10 = coerceIn(v1, -0.5, 0.5);
    var v20 = coerceIn(v2, -0.5, 0.5);
    var v01 = mul3x3Float3_0(Companion_getInstance_23().y40_1, v00, v10, v20);
    var v11 = mul3x3Float3_1(Companion_getInstance_23().y40_1, v00, v10, v20);
    var v21 = mul3x3Float3_2(Companion_getInstance_23().y40_1, v00, v10, v20);
    var v02 = v01 * v01 * v01;
    var v12 = v11 * v11 * v11;
    var v22 = v21 * v21 * v21;
    var v23 = mul3x3Float3_2(Companion_getInstance_23().x40_1, v02, v12, v22);
    return v23;
  };
  protoOf(Oklab).a3z = function (x, y, z, a, colorSpace) {
    var v0 = mul3x3Float3_0(Companion_getInstance_23().v40_1, x, y, z);
    var v1 = mul3x3Float3_1(Companion_getInstance_23().v40_1, x, y, z);
    var v2 = mul3x3Float3_2(Companion_getInstance_23().v40_1, x, y, z);
    // Inline function 'kotlin.math.sign' call
    var x_0 = v0;
    var tmp = sign(x_0);
    // Inline function 'kotlin.math.pow' call
    // Inline function 'kotlin.math.abs' call
    var x_1 = v0;
    var this_0 = Math.abs(x_1);
    var x_2 = 0.3333333333333333;
    v0 = tmp * Math.pow(this_0, x_2);
    // Inline function 'kotlin.math.sign' call
    var x_3 = v1;
    var tmp_0 = sign(x_3);
    // Inline function 'kotlin.math.pow' call
    // Inline function 'kotlin.math.abs' call
    var x_4 = v1;
    var this_1 = Math.abs(x_4);
    var x_5 = 0.3333333333333333;
    v1 = tmp_0 * Math.pow(this_1, x_5);
    // Inline function 'kotlin.math.sign' call
    var x_6 = v2;
    var tmp_1 = sign(x_6);
    // Inline function 'kotlin.math.pow' call
    // Inline function 'kotlin.math.abs' call
    var x_7 = v2;
    var this_2 = Math.abs(x_7);
    var x_8 = 0.3333333333333333;
    v2 = tmp_1 * Math.pow(this_2, x_8);
    var v01 = mul3x3Float3_0(Companion_getInstance_23().w40_1, v0, v1, v2);
    var v11 = mul3x3Float3_1(Companion_getInstance_23().w40_1, v0, v1, v2);
    var v21 = mul3x3Float3_2(Companion_getInstance_23().w40_1, v0, v1, v2);
    return Color_1(v01, v11, v21, a, colorSpace);
  };
  protoOf(Oklab).c3z = function (v) {
    mul3x3Float3(Companion_getInstance_23().v40_1, v);
    // Inline function 'kotlin.math.sign' call
    var x = v[0];
    var tmp = sign(x);
    // Inline function 'kotlin.math.pow' call
    // Inline function 'kotlin.math.abs' call
    var x_0 = v[0];
    var this_0 = Math.abs(x_0);
    var x_1 = 0.3333333333333333;
    v[0] = tmp * Math.pow(this_0, x_1);
    // Inline function 'kotlin.math.sign' call
    var x_2 = v[1];
    var tmp_0 = sign(x_2);
    // Inline function 'kotlin.math.pow' call
    // Inline function 'kotlin.math.abs' call
    var x_3 = v[1];
    var this_1 = Math.abs(x_3);
    var x_4 = 0.3333333333333333;
    v[1] = tmp_0 * Math.pow(this_1, x_4);
    // Inline function 'kotlin.math.sign' call
    var x_5 = v[2];
    var tmp_1 = sign(x_5);
    // Inline function 'kotlin.math.pow' call
    // Inline function 'kotlin.math.abs' call
    var x_6 = v[2];
    var this_2 = Math.abs(x_6);
    var x_7 = 0.3333333333333333;
    v[2] = tmp_1 * Math.pow(this_2, x_7);
    mul3x3Float3(Companion_getInstance_23().w40_1, v);
    return v;
  };
  function _RenderIntent___init__impl__jceahd(value) {
    return value;
  }
  function Companion_19() {
    Companion_instance_21 = this;
    this.d3z_1 = _RenderIntent___init__impl__jceahd(0);
    this.e3z_1 = _RenderIntent___init__impl__jceahd(1);
    this.f3z_1 = _RenderIntent___init__impl__jceahd(2);
    this.g3z_1 = _RenderIntent___init__impl__jceahd(3);
  }
  var Companion_instance_21;
  function Companion_getInstance_24() {
    if (Companion_instance_21 == null)
      new Companion_19();
    return Companion_instance_21;
  }
  function isSrgb($this, primaries, whitePoint, OETF, EOTF, min, max, id) {
    if (id === 0)
      return true;
    if (!compare(primaries, ColorSpaces_getInstance().t3s_1)) {
      return false;
    }
    if (!compare_0(whitePoint, Illuminant_getInstance().v3z_1)) {
      return false;
    }
    if (!(min === 0.0))
      return false;
    if (!(max === 1.0))
      return false;
    var srgb = ColorSpaces_getInstance().x3s_1;
    var x = 0.0;
    while (x <= 1.0) {
      if (!compare_1($this, x, OETF, srgb.u3u_1))
        return false;
      if (!compare_1($this, x, EOTF, srgb.x3u_1))
        return false;
      x = x + 0.00392156862745098;
    }
    return true;
  }
  function compare_1($this, point, a, b) {
    var rA = a.c3v(point);
    var rB = b.c3v(point);
    // Inline function 'kotlin.math.abs' call
    var x = rA - rB;
    return Math.abs(x) <= 0.001;
  }
  function isWideGamut($this, primaries, min, max) {
    return (area($this, primaries) / area($this, ColorSpaces_getInstance().u3s_1) > 0.9 ? contains($this, primaries, ColorSpaces_getInstance().t3s_1) : false) ? true : min < 0.0 ? max > 1.0 : false;
  }
  function area($this, primaries) {
    var rx = primaries[0];
    var ry = primaries[1];
    var gx = primaries[2];
    var gy = primaries[3];
    var bx = primaries[4];
    var by = primaries[5];
    var det = rx * gy + ry * bx + gx * by - gy * bx - ry * gx - rx * by;
    var r = 0.5 * det;
    return r < 0.0 ? -r : r;
  }
  function cross($this, ax, ay, bx, by) {
    return ax * by - ay * bx;
  }
  function contains($this, p1, p2) {
    // Inline function 'kotlin.floatArrayOf' call
    var p0 = new Float32Array([p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2], p1[3] - p2[3], p1[4] - p2[4], p1[5] - p2[5]]);
    if (cross($this, p0[0], p0[1], p2[0] - p2[4], p2[1] - p2[5]) < 0.0 ? true : cross($this, p2[0] - p2[2], p2[1] - p2[3], p0[0], p0[1]) < 0.0) {
      return false;
    }
    if (cross($this, p0[2], p0[3], p2[2] - p2[0], p2[3] - p2[1]) < 0.0 ? true : cross($this, p2[2] - p2[4], p2[3] - p2[5], p0[2], p0[3]) < 0.0) {
      return false;
    }
    return !(cross($this, p0[4], p0[5], p2[4] - p2[2], p2[5] - p2[3]) < 0.0 ? true : cross($this, p2[4] - p2[0], p2[5] - p2[1], p0[4], p0[5]) < 0.0);
  }
  function xyPrimaries($this, primaries) {
    var xyPrimaries = new Float32Array(6);
    if (primaries.length === 9) {
      var sum = primaries[0] + primaries[1] + primaries[2];
      xyPrimaries[0] = primaries[0] / sum;
      xyPrimaries[1] = primaries[1] / sum;
      sum = primaries[3] + primaries[4] + primaries[5];
      xyPrimaries[2] = primaries[3] / sum;
      xyPrimaries[3] = primaries[4] / sum;
      sum = primaries[6] + primaries[7] + primaries[8];
      xyPrimaries[4] = primaries[6] / sum;
      xyPrimaries[5] = primaries[7] / sum;
    } else {
      // Inline function 'kotlin.collections.copyInto' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp = primaries;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp, xyPrimaries, 0, 0, 6);
    }
    return xyPrimaries;
  }
  function computeXYZMatrix($this, primaries, whitePoint) {
    var rx = primaries[0];
    var ry = primaries[1];
    var gx = primaries[2];
    var gy = primaries[3];
    var bx = primaries[4];
    var by = primaries[5];
    var wx = whitePoint.l3z_1;
    var wy = whitePoint.m3z_1;
    var oneRxRy = (1 - rx) / ry;
    var oneGxGy = (1 - gx) / gy;
    var oneBxBy = (1 - bx) / by;
    var oneWxWy = (1 - wx) / wy;
    var rxRy = rx / ry;
    var gxGy = gx / gy;
    var bxBy = bx / by;
    var wxWy = wx / wy;
    var byNumerator = (oneWxWy - oneRxRy) * (gxGy - rxRy) - (wxWy - rxRy) * (oneGxGy - oneRxRy);
    var byDenominator = (oneBxBy - oneRxRy) * (gxGy - rxRy) - (bxBy - rxRy) * (oneGxGy - oneRxRy);
    var bY = byNumerator / byDenominator;
    var gY = (wxWy - rxRy - bY * (bxBy - rxRy)) / (gxGy - rxRy);
    var rY = 1.0 - gY - bY;
    var rYRy = rY / ry;
    var gYGy = gY / gy;
    var bYBy = bY / by;
    // Inline function 'kotlin.floatArrayOf' call
    return new Float32Array([rYRy * rx, rY, rYRy * (1.0 - rx - ry), gYGy * gx, gY, gYGy * (1.0 - gx - gy), bYBy * bx, bY, bYBy * (1.0 - bx - by)]);
  }
  function sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_0(function_0) {
    this.c41_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_0).c3v = function (double) {
    return this.c41_1(double);
  };
  function Rgb$Companion$DoubleIdentity$lambda(d) {
    return d;
  }
  function Rgb_init_$Init$(name, primaries, whitePoint, function_0, id, $this) {
    var tmp;
    if (function_0.i41_1 === 0.0 ? function_0.j41_1 === 0.0 : false) {
      var tmp_0 = Rgb$_init_$lambda_yyl4se(function_0);
      tmp = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3(tmp_0);
    } else {
      var tmp_1 = Rgb$_init_$lambda_yyl4se_0(function_0);
      tmp = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3(tmp_1);
    }
    var tmp_2 = tmp;
    var tmp_3;
    if (function_0.i41_1 === 0.0 ? function_0.j41_1 === 0.0 : false) {
      var tmp_4 = Rgb$_init_$lambda_yyl4se_1(function_0);
      tmp_3 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3(tmp_4);
    } else {
      var tmp_5 = Rgb$_init_$lambda_yyl4se_2(function_0);
      tmp_3 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3(tmp_5);
    }
    Rgb.call($this, name, primaries, whitePoint, null, tmp_2, tmp_3, 0.0, 1.0, function_0, id);
    return $this;
  }
  function Rgb_init_$Create$(name, primaries, whitePoint, function_0, id) {
    return Rgb_init_$Init$(name, primaries, whitePoint, function_0, id, objectCreate(protoOf(Rgb)));
  }
  function Rgb_init_$Init$_0(name, primaries, whitePoint, gamma, min, max, id, $this) {
    var tmp;
    if (gamma === 1.0) {
      tmp = Companion_getInstance_25().k41_1;
    } else {
      var tmp_0 = Rgb$_init_$lambda_yyl4se_3(gamma);
      tmp = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_4(tmp_0);
    }
    var tmp_1 = tmp;
    var tmp_2;
    if (gamma === 1.0) {
      tmp_2 = Companion_getInstance_25().k41_1;
    } else {
      var tmp_3 = Rgb$_init_$lambda_yyl4se_4(gamma);
      tmp_2 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_4(tmp_3);
    }
    Rgb.call($this, name, primaries, whitePoint, null, tmp_1, tmp_2, min, max, new TransferParameters(gamma, 1.0, 0.0, 0.0, 0.0), id);
    return $this;
  }
  function Rgb_init_$Create$_0(name, primaries, whitePoint, gamma, min, max, id) {
    return Rgb_init_$Init$_0(name, primaries, whitePoint, gamma, min, max, id, objectCreate(protoOf(Rgb)));
  }
  function Rgb_init_$Init$_1(colorSpace, transform, whitePoint, $this) {
    Rgb.call($this, colorSpace.z3t_1, colorSpace.r3u_1, whitePoint, transform, colorSpace.u3u_1, colorSpace.x3u_1, colorSpace.o3u_1, colorSpace.p3u_1, colorSpace.q3u_1, -1);
    return $this;
  }
  function Rgb_init_$Create$_1(colorSpace, transform, whitePoint) {
    return Rgb_init_$Init$_1(colorSpace, transform, whitePoint, objectCreate(protoOf(Rgb)));
  }
  function Companion_20() {
    Companion_instance_22 = this;
    var tmp = this;
    var tmp_0 = Rgb$Companion$DoubleIdentity$lambda;
    tmp.k41_1 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_0(tmp_0);
  }
  var Companion_instance_22;
  function Companion_getInstance_25() {
    if (Companion_instance_22 == null)
      new Companion_20();
    return Companion_instance_22;
  }
  function sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_1(function_0) {
    this.l41_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_1).c3v = function (double) {
    return this.l41_1(double);
  };
  function sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_2(function_0) {
    this.m41_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_2).c3v = function (double) {
    return this.m41_1(double);
  };
  function sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3(function_0) {
    this.n41_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_3).c3v = function (double) {
    return this.n41_1(double);
  };
  function sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_4(function_0) {
    this.o41_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_4).c3v = function (double) {
    return this.o41_1(double);
  };
  function Rgb$oetf$lambda(this$0) {
    return function (x) {
      return coerceIn_0(this$0.u3u_1.c3v(x), this$0.o3u_1, this$0.p3u_1);
    };
  }
  function Rgb$oetfFunc$lambda(this$0) {
    return function (x) {
      return coerceIn_0(this$0.u3u_1.c3v(x), this$0.o3u_1, this$0.p3u_1);
    };
  }
  function Rgb$eotf$lambda(this$0) {
    return function (x) {
      return this$0.x3u_1.c3v(coerceIn_0(x, this$0.o3u_1, this$0.p3u_1));
    };
  }
  function Rgb$eotfFunc$lambda(this$0) {
    return function (x) {
      return this$0.x3u_1.c3v(coerceIn_0(x, this$0.o3u_1, this$0.p3u_1));
    };
  }
  function Rgb$_init_$lambda_yyl4se($function) {
    return function (x) {
      return rcpResponse(x, $function.e41_1, $function.f41_1, $function.g41_1, $function.h41_1, $function.d41_1);
    };
  }
  function Rgb$_init_$lambda_yyl4se_0($function) {
    return function (x) {
      return rcpResponse_0(x, $function.e41_1, $function.f41_1, $function.g41_1, $function.h41_1, $function.i41_1, $function.j41_1, $function.d41_1);
    };
  }
  function Rgb$_init_$lambda_yyl4se_1($function) {
    return function (x) {
      return response(x, $function.e41_1, $function.f41_1, $function.g41_1, $function.h41_1, $function.d41_1);
    };
  }
  function Rgb$_init_$lambda_yyl4se_2($function) {
    return function (x) {
      return response_0(x, $function.e41_1, $function.f41_1, $function.g41_1, $function.h41_1, $function.i41_1, $function.j41_1, $function.d41_1);
    };
  }
  function Rgb$_init_$lambda_yyl4se_3($gamma) {
    return function (x) {
      // Inline function 'kotlin.math.pow' call
      var this_0 = x < 0.0 ? 0.0 : x;
      var x_0 = 1.0 / $gamma;
      return Math.pow(this_0, x_0);
    };
  }
  function Rgb$_init_$lambda_yyl4se_4($gamma) {
    return function (x) {
      // Inline function 'kotlin.math.pow' call
      var this_0 = x < 0.0 ? 0.0 : x;
      var x_0 = $gamma;
      return Math.pow(this_0, x_0);
    };
  }
  function Rgb(name, primaries, whitePoint, transform, oetf, eotf, min, max, transferParameters, id) {
    Companion_getInstance_25();
    ColorSpace.call(this, name, Companion_getInstance_19().g3u_1, id);
    this.n3u_1 = whitePoint;
    this.o3u_1 = min;
    this.p3u_1 = max;
    this.q3u_1 = transferParameters;
    this.u3u_1 = oetf;
    var tmp = this;
    tmp.v3u_1 = Rgb$oetf$lambda(this);
    var tmp_0 = this;
    var tmp_1 = Rgb$oetfFunc$lambda(this);
    tmp_0.w3u_1 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_1(tmp_1);
    this.x3u_1 = eotf;
    var tmp_2 = this;
    tmp_2.y3u_1 = Rgb$eotf$lambda(this);
    var tmp_3 = this;
    var tmp_4 = Rgb$eotfFunc$lambda(this);
    tmp_3.z3u_1 = new sam$androidx_compose_ui_graphics_colorspace_DoubleFunction$0_2(tmp_4);
    if (!(primaries.length === 6) ? !(primaries.length === 9) : false) {
      throw IllegalArgumentException_init_$Create$("The color space's primaries must be defined as an array of 6 floats in xyY or 9 floats in XYZ");
    }
    if (this.o3u_1 >= this.p3u_1) {
      throw IllegalArgumentException_init_$Create$('Invalid range: min=' + this.o3u_1 + ', max=' + this.p3u_1 + '; min must ' + 'be strictly < max');
    }
    this.r3u_1 = xyPrimaries(Companion_getInstance_25(), primaries);
    if (transform == null) {
      this.s3u_1 = computeXYZMatrix(Companion_getInstance_25(), this.r3u_1, this.n3u_1);
    } else {
      if (!(transform.length === 9)) {
        throw IllegalArgumentException_init_$Create$('Transform must have 9 entries! Has ' + ('' + transform.length));
      }
      this.s3u_1 = transform;
    }
    this.t3u_1 = inverse3x3(this.s3u_1);
    this.a3v_1 = isWideGamut(Companion_getInstance_25(), this.r3u_1, this.o3u_1, this.p3u_1);
    this.b3v_1 = isSrgb(Companion_getInstance_25(), this.r3u_1, this.n3u_1, oetf, eotf, this.o3u_1, this.p3u_1, id);
  }
  protoOf(Rgb).e3u = function () {
    return this.b3v_1;
  };
  protoOf(Rgb).c3u = function (component) {
    return this.o3u_1;
  };
  protoOf(Rgb).d3u = function (component) {
    return this.p3u_1;
  };
  protoOf(Rgb).x3y = function (v) {
    v[0] = this.z3u_1.c3v(v[0]);
    v[1] = this.z3u_1.c3v(v[1]);
    v[2] = this.z3u_1.c3v(v[2]);
    return mul3x3Float3(this.s3u_1, v);
  };
  protoOf(Rgb).y3y = function (v0, v1, v2) {
    var v00 = this.z3u_1.c3v(v0);
    var v10 = this.z3u_1.c3v(v1);
    var v20 = this.z3u_1.c3v(v2);
    var x = mul3x3Float3_0(this.s3u_1, v00, v10, v20);
    var y = mul3x3Float3_1(this.s3u_1, v00, v10, v20);
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var v1_0 = toLong(toRawBits(x));
    var v2_0 = toLong(toRawBits(y));
    return v1_0.kb(32).ob(v2_0.nb(new Long(-1, 0)));
  };
  protoOf(Rgb).z3y = function (v0, v1, v2) {
    var v00 = this.z3u_1.c3v(v0);
    var v10 = this.z3u_1.c3v(v1);
    var v20 = this.z3u_1.c3v(v2);
    var z = mul3x3Float3_2(this.s3u_1, v00, v10, v20);
    return z;
  };
  protoOf(Rgb).a3z = function (x, y, z, a, colorSpace) {
    var v0 = mul3x3Float3_0(this.t3u_1, x, y, z);
    var v1 = mul3x3Float3_1(this.t3u_1, x, y, z);
    var v2 = mul3x3Float3_2(this.t3u_1, x, y, z);
    v0 = this.w3u_1.c3v(v0);
    v1 = this.w3u_1.c3v(v1);
    v2 = this.w3u_1.c3v(v2);
    return Color_1(v0, v1, v2, a, colorSpace);
  };
  protoOf(Rgb).c3z = function (v) {
    mul3x3Float3(this.t3u_1, v);
    v[0] = this.w3u_1.c3v(v[0]);
    v[1] = this.w3u_1.c3v(v[1]);
    v[2] = this.w3u_1.c3v(v[2]);
    return v;
  };
  protoOf(Rgb).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!protoOf(ColorSpace).equals.call(this, other))
      return false;
    var rgb = other instanceof Rgb ? other : THROW_CCE();
    if (!(compareTo(rgb.o3u_1, this.o3u_1) === 0))
      return false;
    if (!(compareTo(rgb.p3u_1, this.p3u_1) === 0))
      return false;
    if (!this.n3u_1.equals(rgb.n3u_1))
      return false;
    if (!contentEquals(this.r3u_1, rgb.r3u_1))
      return false;
    if (!(this.q3u_1 == null)) {
      return equals(this.q3u_1, rgb.q3u_1);
    } else if (rgb.q3u_1 == null) {
      return true;
    }
    return !equals(this.u3u_1, rgb.u3u_1) ? false : equals(this.x3u_1, rgb.x3u_1);
  };
  protoOf(Rgb).hashCode = function () {
    var result = protoOf(ColorSpace).hashCode.call(this);
    result = imul(31, result) + this.n3u_1.hashCode() | 0;
    result = imul(31, result) + contentHashCode(this.r3u_1) | 0;
    result = imul(31, result) + (!(this.o3u_1 === 0.0) ? toBits(this.o3u_1) : 0) | 0;
    result = imul(31, result) + (!(this.p3u_1 === 0.0) ? toBits(this.p3u_1) : 0) | 0;
    result = imul(31, result) + (!(this.q3u_1 == null) ? this.q3u_1.hashCode() : 0) | 0;
    if (this.q3u_1 == null) {
      result = imul(31, result) + hashCode(this.u3u_1) | 0;
      result = imul(31, result) + hashCode(this.x3u_1) | 0;
    }
    return result;
  };
  function TransferParameters(gamma, a, b, c, d, e, f) {
    e = e === VOID ? 0.0 : e;
    f = f === VOID ? 0.0 : f;
    this.d41_1 = gamma;
    this.e41_1 = a;
    this.f41_1 = b;
    this.g41_1 = c;
    this.h41_1 = d;
    this.i41_1 = e;
    this.j41_1 = f;
    if ((((((isNaN_0(this.e41_1) ? true : isNaN_0(this.f41_1)) ? true : isNaN_0(this.g41_1)) ? true : isNaN_0(this.h41_1)) ? true : isNaN_0(this.i41_1)) ? true : isNaN_0(this.j41_1)) ? true : isNaN_0(this.d41_1)) {
      throw IllegalArgumentException_init_$Create$('Parameters cannot be NaN');
    }
    if (!(this.h41_1 >= 0.0 ? this.h41_1 <= 1.0 : false)) {
      throw IllegalArgumentException_init_$Create$('Parameter d must be in the range [0..1], was ' + ('' + this.h41_1));
    }
    if (this.h41_1 === 0.0 ? this.e41_1 === 0.0 ? true : this.d41_1 === 0.0 : false) {
      throw IllegalArgumentException_init_$Create$('Parameter a or g is zero, the transfer function is constant');
    }
    if (this.h41_1 >= 1.0 ? this.g41_1 === 0.0 : false) {
      throw IllegalArgumentException_init_$Create$('Parameter c is zero, the transfer function is constant');
    }
    if ((this.e41_1 === 0.0 ? true : this.d41_1 === 0.0) ? this.g41_1 === 0.0 : false) {
      throw IllegalArgumentException_init_$Create$('Parameter a or g is zero, and c is zero, the transfer function is constant');
    }
    if (this.g41_1 < 0.0) {
      throw IllegalArgumentException_init_$Create$('The transfer function must be increasing');
    }
    if (this.e41_1 < 0.0 ? true : this.d41_1 < 0.0) {
      throw IllegalArgumentException_init_$Create$('The transfer function must be positive or increasing');
    }
  }
  protoOf(TransferParameters).toString = function () {
    return 'TransferParameters(gamma=' + this.d41_1 + ', a=' + this.e41_1 + ', b=' + this.f41_1 + ', c=' + this.g41_1 + ', d=' + this.h41_1 + ', e=' + this.i41_1 + ', f=' + this.j41_1 + ')';
  };
  protoOf(TransferParameters).hashCode = function () {
    var result = getNumberHashCode(this.d41_1);
    result = imul(result, 31) + getNumberHashCode(this.e41_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.f41_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.g41_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.h41_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.i41_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.j41_1) | 0;
    return result;
  };
  protoOf(TransferParameters).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TransferParameters))
      return false;
    var tmp0_other_with_cast = other instanceof TransferParameters ? other : THROW_CCE();
    if (!equals(this.d41_1, tmp0_other_with_cast.d41_1))
      return false;
    if (!equals(this.e41_1, tmp0_other_with_cast.e41_1))
      return false;
    if (!equals(this.f41_1, tmp0_other_with_cast.f41_1))
      return false;
    if (!equals(this.g41_1, tmp0_other_with_cast.g41_1))
      return false;
    if (!equals(this.h41_1, tmp0_other_with_cast.h41_1))
      return false;
    if (!equals(this.i41_1, tmp0_other_with_cast.i41_1))
      return false;
    if (!equals(this.j41_1, tmp0_other_with_cast.j41_1))
      return false;
    return true;
  };
  function WhitePoint(x, y) {
    this.l3z_1 = x;
    this.m3z_1 = y;
  }
  protoOf(WhitePoint).n3z = function () {
    // Inline function 'kotlin.floatArrayOf' call
    return new Float32Array([this.l3z_1 / this.m3z_1, 1.0, (1.0 - this.l3z_1 - this.m3z_1) / this.m3z_1]);
  };
  protoOf(WhitePoint).toString = function () {
    return 'WhitePoint(x=' + this.l3z_1 + ', y=' + this.m3z_1 + ')';
  };
  protoOf(WhitePoint).hashCode = function () {
    var result = getNumberHashCode(this.l3z_1);
    result = imul(result, 31) + getNumberHashCode(this.m3z_1) | 0;
    return result;
  };
  protoOf(WhitePoint).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof WhitePoint))
      return false;
    var tmp0_other_with_cast = other instanceof WhitePoint ? other : THROW_CCE();
    if (!equals(this.l3z_1, tmp0_other_with_cast.l3z_1))
      return false;
    if (!equals(this.m3z_1, tmp0_other_with_cast.m3z_1))
      return false;
    return true;
  };
  function clamp($this, x) {
    return coerceIn(x, -2.0, 2.0);
  }
  function Xyz(name, id) {
    ColorSpace.call(this, name, Companion_getInstance_19().h3u_1, id);
  }
  protoOf(Xyz).c3u = function (component) {
    return -2.0;
  };
  protoOf(Xyz).d3u = function (component) {
    return 2.0;
  };
  protoOf(Xyz).x3y = function (v) {
    v[0] = clamp(this, v[0]);
    v[1] = clamp(this, v[1]);
    v[2] = clamp(this, v[2]);
    return v;
  };
  protoOf(Xyz).y3y = function (v0, v1, v2) {
    // Inline function 'androidx.compose.ui.util.packFloats' call
    var val1 = clamp(this, v0);
    var val2 = clamp(this, v1);
    var v1_0 = toLong(toRawBits(val1));
    var v2_0 = toLong(toRawBits(val2));
    return v1_0.kb(32).ob(v2_0.nb(new Long(-1, 0)));
  };
  protoOf(Xyz).z3y = function (v0, v1, v2) {
    return clamp(this, v2);
  };
  protoOf(Xyz).a3z = function (x, y, z, a, colorSpace) {
    return Color_1(clamp(this, x), clamp(this, y), clamp(this, z), a, colorSpace);
  };
  protoOf(Xyz).c3z = function (v) {
    v[0] = clamp(this, v[0]);
    v[1] = clamp(this, v[1]);
    v[2] = clamp(this, v[2]);
    return v;
  };
  function obtainFillPaint($this) {
    var tmp0_elvis_lhs = $this.u41_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.apply' call
      var this_0 = Paint();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.obtainFillPaint.<anonymous>' call
      this_0.w41(Companion_getInstance_11().n3x_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.obtainFillPaint.<anonymous>' call
      $this.u41_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function obtainStrokePaint($this) {
    var tmp0_elvis_lhs = $this.v41_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.apply' call
      var this_0 = Paint();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.obtainStrokePaint.<anonymous>' call
      this_0.w41(Companion_getInstance_11().o3x_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.obtainStrokePaint.<anonymous>' call
      $this.v41_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function selectPaint($this, drawStyle) {
    var tmp;
    if (equals(drawStyle, Fill_getInstance())) {
      tmp = obtainFillPaint($this);
    } else {
      if (drawStyle instanceof Stroke) {
        // Inline function 'kotlin.apply' call
        var this_0 = obtainStrokePaint($this);
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.selectPaint.<anonymous>' call
        if (!(this_0.q3e() === drawStyle.x41_1)) {
          this_0.p3e(drawStyle.x41_1);
        }
        if (!(this_0.d42() === drawStyle.z41_1)) {
          this_0.c42(drawStyle.z41_1);
        }
        if (!(this_0.f42() === drawStyle.y41_1)) {
          this_0.e42(drawStyle.y41_1);
        }
        if (!(this_0.h42() === drawStyle.a42_1)) {
          this_0.g42(drawStyle.a42_1);
        }
        if (!equals(this_0.j42(), drawStyle.b42_1)) {
          this_0.i42(drawStyle.b42_1);
        }
        tmp = this_0;
      } else {
        noWhenBranchMatchedException();
      }
    }
    return tmp;
  }
  function configurePaint($this, brush, style, alpha, colorFilter, blendMode, filterQuality) {
    // Inline function 'kotlin.apply' call
    var this_0 = selectPaint($this, style);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.configurePaint.<anonymous>' call
    if (!(brush == null)) {
      brush.w3q($this.g34(), this_0, alpha);
    } else {
      if (!(this_0.q3r() == null)) {
        this_0.u3e(null);
      }
      if (!equals(this_0.p3r(), Companion_getInstance_7().b3r_1)) {
        this_0.o3r(Companion_getInstance_7().b3r_1);
      }
      if (!(this_0.w3n() === alpha)) {
        this_0.r3r(alpha);
      }
    }
    if (!equals(this_0.l42(), colorFilter)) {
      this_0.k42(colorFilter);
    }
    if (!(this_0.n42() === blendMode)) {
      this_0.m42(blendMode);
    }
    if (!(this_0.p42() === filterQuality)) {
      this_0.o42(filterQuality);
    }
    return this_0;
  }
  function configurePaint$default($this, brush, style, alpha, colorFilter, blendMode, filterQuality, $super) {
    filterQuality = filterQuality === VOID ? Companion_getInstance_26().f3x_1 : filterQuality;
    return configurePaint($this, brush, style, alpha, colorFilter, blendMode, filterQuality);
  }
  function configurePaint_0($this, color, style, alpha, colorFilter, blendMode, filterQuality) {
    // Inline function 'kotlin.apply' call
    var this_0 = selectPaint($this, style);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.graphics.drawscope.CanvasDrawScope.configurePaint.<anonymous>' call
    var targetColor = modulate(color, $this, alpha);
    if (!equals(this_0.p3r(), targetColor)) {
      this_0.o3r(targetColor);
    }
    if (!(this_0.q3r() == null)) {
      this_0.u3e(null);
    }
    if (!equals(this_0.l42(), colorFilter)) {
      this_0.k42(colorFilter);
    }
    if (!(this_0.n42() === blendMode)) {
      this_0.m42(blendMode);
    }
    if (!(this_0.p42() === filterQuality)) {
      this_0.o42(filterQuality);
    }
    return this_0;
  }
  function configurePaint$default_0($this, color, style, alpha, colorFilter, blendMode, filterQuality, $super) {
    filterQuality = filterQuality === VOID ? Companion_getInstance_26().f3x_1 : filterQuality;
    return configurePaint_0($this, color, style, alpha, colorFilter, blendMode, filterQuality);
  }
  function modulate(_this__u8e3s4, $this, alpha) {
    var tmp;
    if (!(alpha === 1.0)) {
      tmp = Color__copy$default_impl_ectz3s(_this__u8e3s4, _Color___get_alpha__impl__wcfyv1(_this__u8e3s4) * alpha);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function DrawParams(density, layoutDirection, canvas, size) {
    density = density === VOID ? get_DefaultDensity() : density;
    layoutDirection = layoutDirection === VOID ? LayoutDirection_Ltr_getInstance() : layoutDirection;
    canvas = canvas === VOID ? new EmptyCanvas() : canvas;
    size = size === VOID ? Companion_getInstance().w34_1 : size;
    this.q42_1 = density;
    this.r42_1 = layoutDirection;
    this.s42_1 = canvas;
    this.t42_1 = size;
  }
  protoOf(DrawParams).re = function () {
    return this.q42_1;
  };
  protoOf(DrawParams).se = function () {
    return this.r42_1;
  };
  protoOf(DrawParams).u42 = function () {
    return this.s42_1;
  };
  protoOf(DrawParams).v42 = function () {
    return this.t42_1;
  };
  protoOf(DrawParams).toString = function () {
    return 'DrawParams(density=' + this.q42_1 + ', layoutDirection=' + this.r42_1 + ', canvas=' + this.s42_1 + ', size=' + new Size_0(this.t42_1) + ')';
  };
  protoOf(DrawParams).hashCode = function () {
    var result = hashCode(this.q42_1);
    result = imul(result, 31) + this.r42_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.s42_1) | 0;
    result = imul(result, 31) + Size__hashCode_impl_2h1qpd(this.t42_1) | 0;
    return result;
  };
  protoOf(DrawParams).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof DrawParams))
      return false;
    var tmp0_other_with_cast = other instanceof DrawParams ? other : THROW_CCE();
    if (!equals(this.q42_1, tmp0_other_with_cast.q42_1))
      return false;
    if (!this.r42_1.equals(tmp0_other_with_cast.r42_1))
      return false;
    if (!equals(this.s42_1, tmp0_other_with_cast.s42_1))
      return false;
    if (!equals(this.t42_1, tmp0_other_with_cast.t42_1))
      return false;
    return true;
  };
  function CanvasDrawScope$drawContext$1(this$0) {
    this.x42_1 = this$0;
    this.w42_1 = asDrawTransform(this);
  }
  protoOf(CanvasDrawScope$drawContext$1).f3h = function () {
    return this.x42_1.s41_1.s42_1;
  };
  protoOf(CanvasDrawScope$drawContext$1).y42 = function (value) {
    this.x42_1.s41_1.t42_1 = value;
  };
  protoOf(CanvasDrawScope$drawContext$1).g34 = function () {
    return this.x42_1.s41_1.t42_1;
  };
  protoOf(CanvasDrawScope$drawContext$1).z42 = function () {
    return this.w42_1;
  };
  function CanvasDrawScope() {
    this.s41_1 = new DrawParams();
    var tmp = this;
    tmp.t41_1 = new CanvasDrawScope$drawContext$1(this);
    this.u41_1 = null;
    this.v41_1 = null;
  }
  protoOf(CanvasDrawScope).a43 = function () {
    return this.s41_1.r42_1;
  };
  protoOf(CanvasDrawScope).x35 = function () {
    return this.s41_1.q42_1.x35();
  };
  protoOf(CanvasDrawScope).i36 = function () {
    return this.s41_1.q42_1.i36();
  };
  protoOf(CanvasDrawScope).b43 = function () {
    return this.t41_1;
  };
  protoOf(CanvasDrawScope).m3x = function (brush, topLeft, size, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.n3s(_Offset___get_x__impl__xvi35n(topLeft), _Offset___get_y__impl__8bzhra(topLeft), _Offset___get_x__impl__xvi35n(topLeft) + _Size___get_width__impl__58y75t(size), _Offset___get_y__impl__8bzhra(topLeft) + _Size___get_height__impl__a04p02(size), configurePaint$default(this, brush, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).j3x = function (color, topLeft, size, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.n3s(_Offset___get_x__impl__xvi35n(topLeft), _Offset___get_y__impl__8bzhra(topLeft), _Offset___get_x__impl__xvi35n(topLeft) + _Size___get_width__impl__58y75t(size), _Offset___get_y__impl__8bzhra(topLeft) + _Size___get_height__impl__a04p02(size), configurePaint$default_0(this, color, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).l3x = function (brush, topLeft, size, cornerRadius, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.o3s(_Offset___get_x__impl__xvi35n(topLeft), _Offset___get_y__impl__8bzhra(topLeft), _Offset___get_x__impl__xvi35n(topLeft) + _Size___get_width__impl__58y75t(size), _Offset___get_y__impl__8bzhra(topLeft) + _Size___get_height__impl__a04p02(size), _CornerRadius___get_x__impl__1594cn(cornerRadius), _CornerRadius___get_y__impl__tyvleu(cornerRadius), configurePaint$default(this, brush, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).i3x = function (color, topLeft, size, cornerRadius, style, alpha, colorFilter, blendMode) {
    return this.s41_1.s42_1.o3s(_Offset___get_x__impl__xvi35n(topLeft), _Offset___get_y__impl__8bzhra(topLeft), _Offset___get_x__impl__xvi35n(topLeft) + _Size___get_width__impl__58y75t(size), _Offset___get_y__impl__8bzhra(topLeft) + _Size___get_height__impl__a04p02(size), _CornerRadius___get_x__impl__1594cn(cornerRadius), _CornerRadius___get_y__impl__tyvleu(cornerRadius), configurePaint$default_0(this, color, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).e43 = function (color, radius, center, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.p3s(center, radius, configurePaint$default_0(this, color, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).g43 = function (color, startAngle, sweepAngle, useCenter, topLeft, size, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.q3s(_Offset___get_x__impl__xvi35n(topLeft), _Offset___get_y__impl__8bzhra(topLeft), _Offset___get_x__impl__xvi35n(topLeft) + _Size___get_width__impl__58y75t(size), _Offset___get_y__impl__8bzhra(topLeft) + _Size___get_height__impl__a04p02(size), startAngle, sweepAngle, useCenter, configurePaint$default_0(this, color, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).h3x = function (path, color, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.r3s(path, configurePaint$default_0(this, color, style, alpha, colorFilter, blendMode));
  };
  protoOf(CanvasDrawScope).k3x = function (path, brush, alpha, style, colorFilter, blendMode) {
    return this.s41_1.s42_1.r3s(path, configurePaint$default(this, brush, style, alpha, colorFilter, blendMode));
  };
  function asDrawTransform(_this__u8e3s4) {
    return new asDrawTransform$1(_this__u8e3s4);
  }
  function asDrawTransform$1($this_asDrawTransform) {
    this.k43_1 = $this_asDrawTransform;
  }
  protoOf(asDrawTransform$1).g3s = function (left, top, right, bottom, clipOp) {
    this.k43_1.f3h().g3s(left, top, right, bottom, clipOp);
  };
  function get_DefaultDensity() {
    _init_properties_DrawContext_kt__bfvdzt();
    return DefaultDensity;
  }
  var DefaultDensity;
  function DrawContext() {
  }
  var properties_initialized_DrawContext_kt_nwly1n;
  function _init_properties_DrawContext_kt__bfvdzt() {
    if (!properties_initialized_DrawContext_kt_nwly1n) {
      properties_initialized_DrawContext_kt_nwly1n = true;
      DefaultDensity = Density(1.0, 1.0);
    }
  }
  function DrawStyle() {
  }
  function offsetSize(_this__u8e3s4, $this, offset) {
    return Size(_Size___get_width__impl__58y75t(_this__u8e3s4) - _Offset___get_x__impl__xvi35n(offset), _Size___get_height__impl__a04p02(_this__u8e3s4) - _Offset___get_y__impl__8bzhra(offset));
  }
  function Companion_21() {
    Companion_instance_23 = this;
    this.e3x_1 = Companion_getInstance_4().n3p_1;
    this.f3x_1 = Companion_getInstance_8().e3v_1;
  }
  var Companion_instance_23;
  function Companion_getInstance_26() {
    if (Companion_instance_23 == null)
      new Companion_21();
    return Companion_instance_23;
  }
  function DrawScope() {
  }
  function Fill() {
    Fill_instance = this;
    DrawStyle.call(this);
  }
  var Fill_instance;
  function Fill_getInstance() {
    if (Fill_instance == null)
      new Fill();
    return Fill_instance;
  }
  function Companion_22() {
    Companion_instance_24 = this;
    this.l43_1 = 0.0;
    this.m43_1 = 4.0;
    this.n43_1 = Companion_getInstance_15().g3y_1;
    this.o43_1 = Companion_getInstance_16().k3y_1;
  }
  var Companion_instance_24;
  function Companion_getInstance_27() {
    if (Companion_instance_24 == null)
      new Companion_22();
    return Companion_instance_24;
  }
  function Stroke(width, miter, cap, join, pathEffect) {
    Companion_getInstance_27();
    width = width === VOID ? 0.0 : width;
    miter = miter === VOID ? 4.0 : miter;
    cap = cap === VOID ? Companion_getInstance_27().n43_1 : cap;
    join = join === VOID ? Companion_getInstance_27().o43_1 : join;
    pathEffect = pathEffect === VOID ? null : pathEffect;
    DrawStyle.call(this);
    this.x41_1 = width;
    this.y41_1 = miter;
    this.z41_1 = cap;
    this.a42_1 = join;
    this.b42_1 = pathEffect;
  }
  protoOf(Stroke).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Stroke))
      return false;
    if (!(this.x41_1 === other.x41_1))
      return false;
    if (!(this.y41_1 === other.y41_1))
      return false;
    if (!(this.z41_1 === other.z41_1))
      return false;
    if (!(this.a42_1 === other.a42_1))
      return false;
    if (!equals(this.b42_1, other.b42_1))
      return false;
    return true;
  };
  protoOf(Stroke).hashCode = function () {
    var result = getNumberHashCode(this.x41_1);
    result = imul(31, result) + getNumberHashCode(this.y41_1) | 0;
    result = imul(31, result) + StrokeCap__hashCode_impl_posxk8(this.z41_1) | 0;
    result = imul(31, result) + StrokeJoin__hashCode_impl_3pyh8w(this.a42_1) | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.b42_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    return result;
  };
  protoOf(Stroke).toString = function () {
    return 'Stroke(width=' + this.x41_1 + ', miter=' + this.y41_1 + ', cap=' + new StrokeCap(this.z41_1) + ', join=' + new StrokeJoin(this.a42_1) + ', pathEffect=' + this.b42_1 + ')';
  };
  function EmptyCanvas() {
  }
  protoOf(EmptyCanvas).a3s = function () {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).b3s = function () {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).c3s = function (bounds, paint) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).d3s = function (dx, dy) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).e3s = function (matrix) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).g3s = function (left, top, right, bottom, clipOp) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).k3s = function (path, clipOp) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).n3s = function (left, top, right, bottom, paint) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).o3s = function (left, top, right, bottom, radiusX, radiusY, paint) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).p3s = function (center, radius, paint) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).q3s = function (left, top, right, bottom, startAngle, sweepAngle, useCenter, paint) {
    throw UnsupportedOperationException_init_$Create$();
  };
  protoOf(EmptyCanvas).r3s = function (path, paint) {
    throw UnsupportedOperationException_init_$Create$();
  };
  function toSkia(_this__u8e3s4) {
    return _this__u8e3s4 === Companion_getInstance_4().k3p_1 ? BlendMode_CLEAR_getInstance() : _this__u8e3s4 === Companion_getInstance_4().l3p_1 ? BlendMode_SRC_getInstance() : _this__u8e3s4 === Companion_getInstance_4().m3p_1 ? BlendMode_DST_getInstance() : _this__u8e3s4 === Companion_getInstance_4().n3p_1 ? BlendMode_SRC_OVER_getInstance() : _this__u8e3s4 === Companion_getInstance_4().o3p_1 ? BlendMode_DST_OVER_getInstance() : _this__u8e3s4 === Companion_getInstance_4().p3p_1 ? BlendMode_SRC_IN_getInstance() : _this__u8e3s4 === Companion_getInstance_4().q3p_1 ? BlendMode_DST_IN_getInstance() : _this__u8e3s4 === Companion_getInstance_4().r3p_1 ? BlendMode_SRC_OUT_getInstance() : _this__u8e3s4 === Companion_getInstance_4().s3p_1 ? BlendMode_DST_OUT_getInstance() : _this__u8e3s4 === Companion_getInstance_4().t3p_1 ? BlendMode_SRC_ATOP_getInstance() : _this__u8e3s4 === Companion_getInstance_4().u3p_1 ? BlendMode_DST_ATOP_getInstance() : _this__u8e3s4 === Companion_getInstance_4().v3p_1 ? BlendMode_XOR_getInstance() : _this__u8e3s4 === Companion_getInstance_4().w3p_1 ? BlendMode_PLUS_getInstance() : _this__u8e3s4 === Companion_getInstance_4().x3p_1 ? BlendMode_MODULATE_getInstance() : _this__u8e3s4 === Companion_getInstance_4().y3p_1 ? BlendMode_SCREEN_getInstance() : _this__u8e3s4 === Companion_getInstance_4().z3p_1 ? BlendMode_OVERLAY_getInstance() : _this__u8e3s4 === Companion_getInstance_4().a3q_1 ? BlendMode_DARKEN_getInstance() : _this__u8e3s4 === Companion_getInstance_4().b3q_1 ? BlendMode_LIGHTEN_getInstance() : _this__u8e3s4 === Companion_getInstance_4().c3q_1 ? BlendMode_COLOR_DODGE_getInstance() : _this__u8e3s4 === Companion_getInstance_4().d3q_1 ? BlendMode_COLOR_BURN_getInstance() : _this__u8e3s4 === Companion_getInstance_4().e3q_1 ? BlendMode_HARD_LIGHT_getInstance() : _this__u8e3s4 === Companion_getInstance_4().f3q_1 ? BlendMode_SOFT_LIGHT_getInstance() : _this__u8e3s4 === Companion_getInstance_4().g3q_1 ? BlendMode_DIFFERENCE_getInstance() : _this__u8e3s4 === Companion_getInstance_4().h3q_1 ? BlendMode_EXCLUSION_getInstance() : _this__u8e3s4 === Companion_getInstance_4().i3q_1 ? BlendMode_MULTIPLY_getInstance() : _this__u8e3s4 === Companion_getInstance_4().j3q_1 ? BlendMode_HUE_getInstance() : _this__u8e3s4 === Companion_getInstance_4().k3q_1 ? BlendMode_SATURATION_getInstance() : _this__u8e3s4 === Companion_getInstance_4().l3q_1 ? BlendMode_COLOR_getInstance() : _this__u8e3s4 === Companion_getInstance_4().m3q_1 ? BlendMode_LUMINOSITY_getInstance() : BlendMode_SRC_OVER_getInstance();
  }
  function identityMatrix33() {
    return new Matrix33(new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0]));
  }
  function toSkiaRect(_this__u8e3s4) {
    return Companion_instance.r3g(_this__u8e3s4.a34_1, _this__u8e3s4.b34_1, _this__u8e3s4.c34_1, _this__u8e3s4.d34_1);
  }
  function toSkiaRRect(_this__u8e3s4) {
    var radii = new Float32Array(8);
    radii[0] = _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.r34_1);
    radii[1] = _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.r34_1);
    radii[2] = _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.s34_1);
    radii[3] = _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.s34_1);
    radii[4] = _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.t34_1);
    radii[5] = _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.t34_1);
    radii[6] = _CornerRadius___get_x__impl__1594cn(_this__u8e3s4.u34_1);
    radii[7] = _CornerRadius___get_y__impl__tyvleu(_this__u8e3s4.u34_1);
    return Companion_instance_0.q3g(_this__u8e3s4.n34_1, _this__u8e3s4.o34_1, _this__u8e3s4.p34_1, _this__u8e3s4.q34_1, radii);
  }
  function toComposeRect(_this__u8e3s4) {
    return new Rect(_this__u8e3s4.b39_1, _this__u8e3s4.c39_1, _this__u8e3s4.d39_1, _this__u8e3s4.e39_1);
  }
  function get_nativeCanvas(_this__u8e3s4) {
    return (_this__u8e3s4 instanceof SkiaBackedCanvas ? _this__u8e3s4 : THROW_CCE()).p43_1;
  }
  function asComposeCanvas(_this__u8e3s4) {
    return new SkiaBackedCanvas(_this__u8e3s4);
  }
  function set_alphaMultiplier(_this__u8e3s4, value) {
    (_this__u8e3s4 instanceof SkiaBackedCanvas ? _this__u8e3s4 : THROW_CCE()).q43_1 = value;
  }
  function _get_skia__ddpejf(_this__u8e3s4, $this) {
    // Inline function 'kotlin.apply' call
    var this_0 = _this__u8e3s4 instanceof SkiaBackedPaint ? _this__u8e3s4 : THROW_CCE();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.graphics.SkiaBackedCanvas.<get-skia>.<anonymous>' call
    this_0.c44($this.q43_1);
    return this_0.r43_1;
  }
  function toSkia_0(_this__u8e3s4, $this) {
    return _this__u8e3s4 === Companion_getInstance_6().i3s_1 ? ClipMode_DIFFERENCE_getInstance() : _this__u8e3s4 === Companion_getInstance_6().j3s_1 ? ClipMode_INTERSECT_getInstance() : ClipMode_INTERSECT_getInstance();
  }
  function toSkia_1(_this__u8e3s4, $this) {
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(0, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_0 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(1, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_1 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(2, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_2 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(3, 4) + 0 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_3 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(0, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_4 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(1, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_5 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(2, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_6 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(3, 4) + 1 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_7 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(0, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_8 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(1, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_9 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(2, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_10 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(3, 4) + 2 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_11 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(0, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_12 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(1, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp_13 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(2, 4) + 3 | 0];
    // Inline function 'androidx.compose.ui.graphics.Matrix.get' call
    var tmp$ret$15 = _Matrix___get_values__impl__fblr7b(_this__u8e3s4)[imul(3, 4) + 3 | 0];
    return new Matrix44(new Float32Array([tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp$ret$15]));
  }
  function SkiaBackedCanvas(skia) {
    this.p43_1 = skia;
    this.q43_1 = 1.0;
  }
  protoOf(SkiaBackedCanvas).a3s = function () {
    this.p43_1.w39();
  };
  protoOf(SkiaBackedCanvas).b3s = function () {
    this.p43_1.y39();
  };
  protoOf(SkiaBackedCanvas).c3s = function (bounds, paint) {
    this.p43_1.x39(bounds.a34_1, bounds.b34_1, bounds.c34_1, bounds.d34_1, _get_skia__ddpejf(paint, this));
  };
  protoOf(SkiaBackedCanvas).d3s = function (dx, dy) {
    this.p43_1.i34(dx, dy);
  };
  protoOf(SkiaBackedCanvas).e3s = function (matrix) {
    if (!isIdentity(matrix)) {
      this.p43_1.u39(toSkia_1(matrix, this));
    }
  };
  protoOf(SkiaBackedCanvas).g3s = function (left, top, right, bottom, clipOp) {
    var antiAlias = true;
    this.p43_1.r39(Companion_instance.r3g(left, top, right, bottom), toSkia_0(clipOp, this), antiAlias);
  };
  protoOf(SkiaBackedCanvas).k3s = function (path, clipOp) {
    var antiAlias = true;
    this.p43_1.t39(asSkiaPath(path), toSkia_0(clipOp, this), antiAlias);
  };
  protoOf(SkiaBackedCanvas).n3s = function (left, top, right, bottom, paint) {
    this.p43_1.a39(Companion_instance.r3g(left, top, right, bottom), _get_skia__ddpejf(paint, this));
  };
  protoOf(SkiaBackedCanvas).o3s = function (left, top, right, bottom, radiusX, radiusY, paint) {
    this.p43_1.g39(Companion_instance_0.p3g(left, top, right, bottom, radiusX, radiusY), _get_skia__ddpejf(paint, this));
  };
  protoOf(SkiaBackedCanvas).p3s = function (center, radius, paint) {
    this.p43_1.f39(_Offset___get_x__impl__xvi35n(center), _Offset___get_y__impl__8bzhra(center), radius, _get_skia__ddpejf(paint, this));
  };
  protoOf(SkiaBackedCanvas).q3s = function (left, top, right, bottom, startAngle, sweepAngle, useCenter, paint) {
    this.p43_1.z38(left, top, right, bottom, startAngle, sweepAngle, useCenter, _get_skia__ddpejf(paint, this));
  };
  protoOf(SkiaBackedCanvas).r3s = function (path, paint) {
    this.p43_1.n39(asSkiaPath(path), _get_skia__ddpejf(paint, this));
  };
  function asComposePaint(_this__u8e3s4) {
    return new SkiaBackedPaint(_this__u8e3s4);
  }
  function Paint() {
    return new SkiaBackedPaint();
  }
  function updateAlpha($this, alpha, multiplier) {
    $this.r43_1.n3e(toArgb(Color__copy$default_impl_ectz3s(Color_0($this.r43_1.o3e()), alpha * multiplier)));
  }
  function updateAlpha$default($this, alpha, multiplier, $super) {
    alpha = alpha === VOID ? $this.w3n() : alpha;
    multiplier = multiplier === VOID ? $this.s43_1 : multiplier;
    return updateAlpha($this, alpha, multiplier);
  }
  function toSkia_2(_this__u8e3s4, $this) {
    return _this__u8e3s4 === Companion_getInstance_11().n3x_1 ? PaintMode_FILL_getInstance() : _this__u8e3s4 === Companion_getInstance_11().o3x_1 ? PaintMode_STROKE_getInstance() : PaintMode_FILL_getInstance();
  }
  function toSkia_3(_this__u8e3s4, $this) {
    return _this__u8e3s4 === Companion_getInstance_15().g3y_1 ? PaintStrokeCap_BUTT_getInstance() : _this__u8e3s4 === Companion_getInstance_15().h3y_1 ? PaintStrokeCap_ROUND_getInstance() : _this__u8e3s4 === Companion_getInstance_15().i3y_1 ? PaintStrokeCap_SQUARE_getInstance() : PaintStrokeCap_BUTT_getInstance();
  }
  function toSkia_4(_this__u8e3s4, $this) {
    return _this__u8e3s4 === Companion_getInstance_16().k3y_1 ? PaintStrokeJoin_MITER_getInstance() : _this__u8e3s4 === Companion_getInstance_16().l3y_1 ? PaintStrokeJoin_ROUND_getInstance() : _this__u8e3s4 === Companion_getInstance_16().m3y_1 ? PaintStrokeJoin_BEVEL_getInstance() : PaintStrokeJoin_MITER_getInstance();
  }
  function SkiaBackedPaint(skia) {
    skia = skia === VOID ? Paint_init_$Create$() : skia;
    this.r43_1 = skia;
    this.s43_1 = 1.0;
    this.t43_1 = Companion_getInstance_4().n3p_1;
    this.u43_1 = Companion_getInstance_11().n3x_1;
    this.v43_1 = Companion_getInstance_15().g3y_1;
    this.w43_1 = Companion_getInstance_16().l3y_1;
    this.x43_1 = 0.0;
    this.y43_1 = Companion_getInstance_8().f3v_1;
    this.z43_1 = null;
    this.a44_1 = null;
    this.b44_1 = null;
  }
  protoOf(SkiaBackedPaint).d44 = function () {
    return this.r43_1;
  };
  protoOf(SkiaBackedPaint).c44 = function (value) {
    var multiplier = coerceIn(value, 0.0, 1.0);
    updateAlpha$default(this, VOID, multiplier);
    this.s43_1 = multiplier;
  };
  protoOf(SkiaBackedPaint).r3r = function (value) {
    updateAlpha$default(this, value);
  };
  protoOf(SkiaBackedPaint).w3n = function () {
    return _Color___get_alpha__impl__wcfyv1(Color_0(this.r43_1.o3e()));
  };
  protoOf(SkiaBackedPaint).o3r = function (color) {
    this.r43_1.n3e(toArgb(color));
  };
  protoOf(SkiaBackedPaint).p3r = function () {
    return Color_0(this.r43_1.o3e());
  };
  protoOf(SkiaBackedPaint).m42 = function (value) {
    this.r43_1.w3e(toSkia(value));
    this.t43_1 = value;
  };
  protoOf(SkiaBackedPaint).n42 = function () {
    return this.t43_1;
  };
  protoOf(SkiaBackedPaint).w41 = function (value) {
    this.r43_1.m3e(toSkia_2(value, this));
    this.u43_1 = value;
  };
  protoOf(SkiaBackedPaint).e44 = function () {
    return this.u43_1;
  };
  protoOf(SkiaBackedPaint).p3e = function (value) {
    this.r43_1.p3e(value);
  };
  protoOf(SkiaBackedPaint).q3e = function () {
    return this.r43_1.q3e();
  };
  protoOf(SkiaBackedPaint).c42 = function (value) {
    this.r43_1.s3e(toSkia_3(value, this));
    this.v43_1 = value;
  };
  protoOf(SkiaBackedPaint).d42 = function () {
    return this.v43_1;
  };
  protoOf(SkiaBackedPaint).g42 = function (value) {
    this.r43_1.t3e(toSkia_4(value, this));
    this.w43_1 = value;
  };
  protoOf(SkiaBackedPaint).h42 = function () {
    return this.w43_1;
  };
  protoOf(SkiaBackedPaint).e42 = function (value) {
    this.r43_1.r3e(value);
    this.x43_1 = value;
  };
  protoOf(SkiaBackedPaint).f42 = function () {
    return this.x43_1;
  };
  protoOf(SkiaBackedPaint).o42 = function (_set____db54di) {
    this.y43_1 = _set____db54di;
  };
  protoOf(SkiaBackedPaint).p42 = function () {
    return this.y43_1;
  };
  protoOf(SkiaBackedPaint).u3e = function (value) {
    this.r43_1.u3e(value);
    this.z43_1 = value;
  };
  protoOf(SkiaBackedPaint).q3r = function () {
    return this.z43_1;
  };
  protoOf(SkiaBackedPaint).k42 = function (value) {
    this.r43_1.v3e(value == null ? null : asSkiaColorFilter(value));
    this.a44_1 = value;
  };
  protoOf(SkiaBackedPaint).l42 = function () {
    return this.a44_1;
  };
  protoOf(SkiaBackedPaint).i42 = function (value) {
    var tmp0_safe_receiver = (value == null ? true : value instanceof SkiaBackedPathEffect) ? value : THROW_CCE();
    this.r43_1.z3e(tmp0_safe_receiver == null ? null : asSkiaPathEffect(tmp0_safe_receiver));
    this.b44_1 = value;
  };
  protoOf(SkiaBackedPaint).j42 = function () {
    return this.b44_1;
  };
  function Path_0() {
    return new SkiaBackedPath();
  }
  function toSkiaOperation(_this__u8e3s4, $this) {
    return _this__u8e3s4 === Companion_getInstance_13().w3x_1 ? PathOp_DIFFERENCE_getInstance() : _this__u8e3s4 === Companion_getInstance_13().x3x_1 ? PathOp_INTERSECT_getInstance() : _this__u8e3s4 === Companion_getInstance_13().y3x_1 ? PathOp_UNION_getInstance() : _this__u8e3s4 === Companion_getInstance_13().z3x_1 ? PathOp_XOR_getInstance() : _this__u8e3s4 === Companion_getInstance_13().a3y_1 ? PathOp_REVERSE_DIFFERENCE_getInstance() : PathOp_XOR_getInstance();
  }
  function SkiaBackedPath(internalPath) {
    internalPath = internalPath === VOID ? Path_init_$Create$() : internalPath;
    this.f44_1 = internalPath;
  }
  protoOf(SkiaBackedPath).g44 = function (value) {
    var tmp = this.f44_1;
    var tmp_0;
    if (value === Companion_getInstance_12().v3x_1) {
      tmp_0 = PathFillMode_EVEN_ODD_getInstance();
    } else {
      tmp_0 = PathFillMode_WINDING_getInstance();
    }
    tmp.f3f(tmp_0);
  };
  protoOf(SkiaBackedPath).h44 = function () {
    if (this.f44_1.g3f().equals(PathFillMode_EVEN_ODD_getInstance())) {
      return Companion_getInstance_12().v3x_1;
    } else {
      return Companion_getInstance_12().u3x_1;
    }
  };
  protoOf(SkiaBackedPath).p3x = function (rect) {
    this.f44_1.j3f(toSkiaRect(rect), PathDirection_COUNTER_CLOCKWISE_getInstance());
  };
  protoOf(SkiaBackedPath).d3x = function (roundRect) {
    this.f44_1.l3f(toSkiaRRect(roundRect), PathDirection_COUNTER_CLOCKWISE_getInstance());
  };
  protoOf(SkiaBackedPath).q3x = function (path, offset) {
    this.f44_1.n3f(asSkiaPath(path), _Offset___get_x__impl__xvi35n(offset), _Offset___get_y__impl__8bzhra(offset));
  };
  protoOf(SkiaBackedPath).v2b = function () {
    var fillType = this.h44();
    this.f44_1.h3f();
    this.g44(fillType);
  };
  protoOf(SkiaBackedPath).s3x = function (offset) {
    this.f44_1.p3f(Companion_getInstance_1().h3e(_Offset___get_x__impl__xvi35n(offset), _Offset___get_y__impl__8bzhra(offset)));
  };
  protoOf(SkiaBackedPath).t3x = function (path1, path2, operation) {
    var path = Companion_getInstance_2().b3f(asSkiaPath(path1), asSkiaPath(path2), toSkiaOperation(operation, this));
    var tmp = this;
    tmp.f44_1 = path == null ? this.f44_1 : path;
    return !(path == null);
  };
  protoOf(SkiaBackedPath).s1t = function () {
    return this.f44_1.s1t();
  };
  function asSkiaPath(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof SkiaBackedPath) {
      tmp = _this__u8e3s4.f44_1;
    } else {
      throw UnsupportedOperationException_init_$Create$_0('Unable to obtain org.jetbrains.skia.Path');
    }
    return tmp;
  }
  function SkiaBackedPathEffect() {
  }
  function asSkiaPathEffect(_this__u8e3s4) {
    return (_this__u8e3s4 instanceof SkiaBackedPathEffect ? _this__u8e3s4 : THROW_CCE()).i44_1;
  }
  function asSkiaColorFilter(_this__u8e3s4) {
    return _this__u8e3s4.j44_1;
  }
  function ActualLinearGradientShader(from, to, colors, colorStops, tileMode) {
    validateColorStops(colors, colorStops);
    var tmp = Companion_getInstance_3();
    var tmp_0 = _Offset___get_x__impl__xvi35n(from);
    var tmp_1 = _Offset___get_y__impl__8bzhra(from);
    var tmp_2 = _Offset___get_x__impl__xvi35n(to);
    var tmp_3 = _Offset___get_y__impl__8bzhra(to);
    var tmp_4 = toIntArray(colors);
    return tmp.s3g(tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, colorStops == null ? null : toFloatArray(colorStops), new GradientStyle(toSkiaTileMode(tileMode), true, identityMatrix33()));
  }
  function validateColorStops(colors, colorStops) {
    if (colorStops == null) {
      if (colors.m() < 2) {
        throw IllegalArgumentException_init_$Create$('colors must have length of at least 2 if colorStops is omitted.');
      }
    } else if (!(colors.m() === colorStops.m())) {
      throw IllegalArgumentException_init_$Create$('colors and colorStops arguments must have equal length.');
    }
  }
  function toIntArray(_this__u8e3s4) {
    var tmp = 0;
    var tmp_0 = _this__u8e3s4.m();
    var tmp_1 = new Int32Array(tmp_0);
    while (tmp < tmp_0) {
      var tmp_2 = tmp;
      tmp_1[tmp_2] = toArgb(_this__u8e3s4.n(tmp_2).x3t_1);
      tmp = tmp + 1 | 0;
    }
    return tmp_1;
  }
  function toSkiaTileMode(_this__u8e3s4) {
    return _this__u8e3s4 === Companion_getInstance_17().r3q_1 ? FilterTileMode_CLAMP_getInstance() : _this__u8e3s4 === Companion_getInstance_17().s3q_1 ? FilterTileMode_REPEAT_getInstance() : _this__u8e3s4 === Companion_getInstance_17().t3q_1 ? FilterTileMode_MIRROR_getInstance() : _this__u8e3s4 === Companion_getInstance_17().u3q_1 ? FilterTileMode_DECAL_getInstance() : FilterTileMode_CLAMP_getInstance();
  }
  //region block: post-declaration
  protoOf(CanvasDrawScope).c43 = drawRect$default;
  protoOf(CanvasDrawScope).d43 = drawRect$default_0;
  protoOf(CanvasDrawScope).f43 = drawCircle$default;
  protoOf(CanvasDrawScope).h43 = drawArc$default;
  protoOf(CanvasDrawScope).i43 = drawPath$default;
  protoOf(CanvasDrawScope).j43 = get_center_0;
  protoOf(CanvasDrawScope).g34 = get_size;
  protoOf(CanvasDrawScope).y35 = toPx;
  protoOf(CanvasDrawScope).a36 = toPx_0;
  protoOf(CanvasDrawScope).z35 = roundToPx;
  protoOf(CanvasDrawScope).e36 = toDp;
  protoOf(CanvasDrawScope).f36 = toSize;
  protoOf(EmptyCanvas).l3s = clipPath$default;
  protoOf(EmptyCanvas).f3s = clipRect;
  protoOf(EmptyCanvas).h3s = clipRect$default;
  protoOf(EmptyCanvas).m3s = drawRect;
  protoOf(SkiaBackedCanvas).l3s = clipPath$default;
  protoOf(SkiaBackedCanvas).f3s = clipRect;
  protoOf(SkiaBackedCanvas).h3s = clipRect$default;
  protoOf(SkiaBackedCanvas).m3s = drawRect;
  protoOf(SkiaBackedPath).r3x = addPath$default;
  //endregion
  //region block: init
  Companion_instance_2 = new Companion_0();
  Companion_instance_7 = new Companion_5();
  Companion_instance_17 = new Companion_15();
  Companion_instance_19 = new Companion_17();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = CanvasDrawScope;
  _.$_$.b = DrawScope;
  _.$_$.c = Stroke;
  _.$_$.d = BlendMode;
  _.$_$.e = Color_3;
  _.$_$.f = Color_2;
  _.$_$.g = Color;
  _.$_$.h = Matrix;
  _.$_$.i = Generic;
  _.$_$.j = Rectangle;
  _.$_$.k = Rounded;
  _.$_$.l = Paint;
  _.$_$.m = Path_0;
  _.$_$.n = get_RectangleShape;
  _.$_$.o = ShaderBrush;
  _.$_$.p = SolidColor;
  _.$_$.q = StrokeCap;
  _.$_$.r = set_alphaMultiplier;
  _.$_$.s = asComposeCanvas;
  _.$_$.t = asComposePaint;
  _.$_$.u = asSkiaPath;
  _.$_$.v = drawOutline;
  _.$_$.w = drawOutline_0;
  _.$_$.x = luminance;
  _.$_$.y = get_nativeCanvas;
  _.$_$.z = toArgb;
  _.$_$.a1 = toComposeRect;
  _.$_$.b1 = toSkiaRRect;
  _.$_$.c1 = drawArc$default;
  _.$_$.d1 = drawCircle$default;
  _.$_$.e1 = drawPath$default;
  _.$_$.f1 = drawRect$default;
  _.$_$.g1 = drawRect$default_0;
  _.$_$.h1 = BlendMode__hashCode_impl_93ceri;
  _.$_$.i1 = _Color___init__impl__r6cqi2;
  _.$_$.j1 = _Color___get_alpha__impl__wcfyv1;
  _.$_$.k1 = Color__hashCode_impl_vjyivj;
  _.$_$.l1 = _Color___get_value__impl__1pls5m;
  _.$_$.m1 = _Matrix___init__impl__q3kp4w;
  _.$_$.n1 = Matrix__map_impl_7meu7m;
  _.$_$.o1 = Matrix__map_impl_7meu7m_0;
  _.$_$.p1 = Matrix__reset_impl_4l49i7;
  _.$_$.q1 = Matrix__rotateX_impl_3e5y7j;
  _.$_$.r1 = Matrix__rotateY_impl_2x4btc;
  _.$_$.s1 = Matrix__rotateZ_impl_2g2pf5;
  _.$_$.t1 = Matrix__timesAssign_impl_oas521;
  _.$_$.u1 = _Matrix___get_values__impl__fblr7b;
  _.$_$.v1 = _StrokeCap___init__impl__kfgr27;
  _.$_$.w1 = Color__copy$default_impl_ectz3s;
  _.$_$.x1 = Matrix__scale$default_impl_snaws9;
  _.$_$.y1 = Matrix__translate$default_impl_10t8ql;
  _.$_$.z1 = Companion_getInstance_26;
  _.$_$.a2 = Fill_getInstance;
  _.$_$.b2 = Companion_getInstance_4;
  _.$_$.c2 = Companion_instance_2;
  _.$_$.d2 = Companion_getInstance_6;
  _.$_$.e2 = Companion_getInstance_7;
  _.$_$.f2 = Companion_getInstance_11;
  _.$_$.g2 = Companion_getInstance_13;
  _.$_$.h2 = Companion_getInstance_14;
  _.$_$.i2 = Companion_getInstance_15;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-ui-ui-graphics.js.map
