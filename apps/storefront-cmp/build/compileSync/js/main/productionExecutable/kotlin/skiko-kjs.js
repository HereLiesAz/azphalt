(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'skiko-kjs'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'skiko-kjs'.");
    }
    root['skiko-kjs'] = factory(typeof this['skiko-kjs'] === 'undefined' ? {} : this['skiko-kjs'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.ib;
  var objectCreate = kotlin_kotlin.$_$.gb;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var VOID = kotlin_kotlin.$_$.g;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Enum = kotlin_kotlin.$_$.qe;
  var charSequenceGet = kotlin_kotlin.$_$.x9;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.o2;
  var toShort = kotlin_kotlin.$_$.mb;
  var RuntimeException_init_$Create$ = kotlin_kotlin.$_$.g2;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var isCharSequence = kotlin_kotlin.$_$.sa;
  var trim = kotlin_kotlin.$_$.ge;
  var toString = kotlin_kotlin.$_$.nb;
  var split = kotlin_kotlin.$_$.sd;
  var getOrNull = kotlin_kotlin.$_$.a7;
  var toIntOrNull = kotlin_kotlin.$_$.xd;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.b3;
  var fillArrayVal = kotlin_kotlin.$_$.ea;
  var splitToSequence = kotlin_kotlin.$_$.rd;
  var mapNotNull = kotlin_kotlin.$_$.wc;
  var toList = kotlin_kotlin.$_$.ad;
  var copyToArray = kotlin_kotlin.$_$.l6;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.c3;
  var uintCompare = kotlin_kotlin.$_$.pg;
  var Companion_getInstance = kotlin_kotlin.$_$.n4;
  var UInt = kotlin_kotlin.$_$.if;
  var compareTo = kotlin_kotlin.$_$.ba;
  var toBits = kotlin_kotlin.$_$.kg;
  var hashCode = kotlin_kotlin.$_$.la;
  var isNaN_0 = kotlin_kotlin.$_$.zf;
  var numberToChar = kotlin_kotlin.$_$.db;
  var charArrayOf = kotlin_kotlin.$_$.v9;
  var concatToString = kotlin_kotlin.$_$.cd;
  var decodeToString = kotlin_kotlin.$_$.ed;
  var contentEquals = kotlin_kotlin.$_$.z5;
  var contentHashCode = kotlin_kotlin.$_$.b6;
  var equals = kotlin_kotlin.$_$.da;
  var contentHashCode_0 = kotlin_kotlin.$_$.a6;
  var NoSuchElementException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var NotImplementedError = kotlin_kotlin.$_$.xe;
  var last = kotlin_kotlin.$_$.s7;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var floatFromBits = kotlin_kotlin.$_$.fa;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.dg;
  var joinToString = kotlin_kotlin.$_$.h7;
  var Error_init_$Create$ = kotlin_kotlin.$_$.l1;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.o1;
  var until = kotlin_kotlin.$_$.mc;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.w5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var getBooleanHashCode = kotlin_kotlin.$_$.ga;
  var toBits_0 = kotlin_kotlin.$_$.lg;
  var ensureNotNull = kotlin_kotlin.$_$.uf;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var getNumberHashCode = kotlin_kotlin.$_$.ia;
  var RuntimeException = kotlin_kotlin.$_$.bf;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.h2;
  var captureStack = kotlin_kotlin.$_$.u9;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var toIntArray = kotlin_kotlin.$_$.q8;
  var defineProp = kotlin_kotlin.$_$.ca;
  var Regex_init_$Create$ = kotlin_kotlin.$_$.g1;
  var charSequenceLength = kotlin_kotlin.$_$.y9;
  var lazy = kotlin_kotlin.$_$.cg;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var plus = kotlin_kotlin.$_$.eg;
  var toString_0 = kotlin_kotlin.$_$.ae;
  var numberToLong = kotlin_kotlin.$_$.fb;
  var contains = kotlin_kotlin.$_$.dd;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Native, 'Native', classMeta);
  setMetadataFor(Managed, 'Managed', classMeta, Native);
  setMetadataFor(BBHFactory, 'BBHFactory', classMeta, Managed);
  setMetadataFor(RTreeFactory, 'RTreeFactory', classMeta, BBHFactory, VOID, RTreeFactory_init_$Create$);
  setMetadataFor(_FinalizerHolder, '_FinalizerHolder', objectMeta);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_0, '_FinalizerHolder', objectMeta);
  setMetadataFor(BackendRenderTarget, 'BackendRenderTarget', classMeta, Managed);
  setMetadataFor(BlendMode, 'BlendMode', classMeta, Enum);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_1, '_FinalizerHolder', objectMeta);
  setMetadataFor(BreakIterator, 'BreakIterator', classMeta, Managed);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_2, '_FinalizerHolder', objectMeta);
  setMetadataFor(Canvas, 'Canvas', classMeta, Managed);
  setMetadataFor(ClipMode, 'ClipMode', classMeta, Enum);
  setMetadataFor(Color, 'Color', objectMeta);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_3, '_FinalizerHolder', objectMeta);
  setMetadataFor(ColorSpace, 'ColorSpace', classMeta, Managed);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_4, '_FinalizerHolder', objectMeta);
  setMetadataFor(Data, 'Data', classMeta, Managed);
  setMetadataFor(Companion_4, 'Companion', objectMeta);
  setMetadataFor(RefCnt, 'RefCnt', classMeta, Managed);
  setMetadataFor(DirectContext, 'DirectContext', classMeta, RefCnt);
  setMetadataFor(Companion_5, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_5, '_FinalizerHolder', objectMeta);
  setMetadataFor(Font, 'Font', classMeta, Managed, VOID, Font_init_$Create$);
  setMetadataFor(FontEdging, 'FontEdging', classMeta, Enum);
  setMetadataFor(Companion_6, 'Companion', objectMeta);
  setMetadataFor(FontFeature, 'FontFeature', classMeta);
  setMetadataFor(FontHinting, 'FontHinting', classMeta, Enum);
  setMetadataFor(Companion_7, 'Companion', objectMeta);
  setMetadataFor(FontMetrics, 'FontMetrics', classMeta);
  setMetadataFor(Companion_8, 'Companion', objectMeta);
  setMetadataFor(FontMgr, 'FontMgr', classMeta, RefCnt);
  setMetadataFor(FontSlant, 'FontSlant', classMeta, Enum);
  setMetadataFor(Companion_9, 'Companion', objectMeta);
  setMetadataFor(FontStyle, 'FontStyle', classMeta);
  setMetadataFor(Companion_10, 'Companion', objectMeta);
  setMetadataFor(Companion_11, 'Companion', objectMeta);
  setMetadataFor(Companion_12, 'Companion', objectMeta);
  setMetadataFor(Companion_13, 'Companion', objectMeta);
  setMetadataFor(IRange, 'IRange', classMeta);
  setMetadataFor(Companion_14, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_6, '_FinalizerHolder', objectMeta);
  setMetadataFor(ManagedString, 'ManagedString', classMeta, Managed);
  setMetadataFor(Companion_15, 'Companion', objectMeta);
  setMetadataFor(Matrix33, 'Matrix33', classMeta);
  setMetadataFor(Companion_16, 'Companion', objectMeta);
  setMetadataFor(Matrix44, 'Matrix44', classMeta);
  setMetadataFor(Companion_17, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_7, '_FinalizerHolder', objectMeta);
  setMetadataFor(Paint, 'Paint', classMeta, Managed, VOID, Paint_init_$Create$);
  setMetadataFor(PaintMode, 'PaintMode', classMeta, Enum);
  setMetadataFor(PaintStrokeCap, 'PaintStrokeCap', classMeta, Enum);
  setMetadataFor(PaintStrokeJoin, 'PaintStrokeJoin', classMeta, Enum);
  setMetadataFor(Companion_18, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_8, '_FinalizerHolder', objectMeta);
  setMetadataFor(Path, 'Path', classMeta, Managed, VOID, Path_init_$Create$);
  setMetadataFor(PathDirection, 'PathDirection', classMeta, Enum);
  setMetadataFor(PathFillMode, 'PathFillMode', classMeta, Enum);
  setMetadataFor(PathOp, 'PathOp', classMeta, Enum);
  setMetadataFor(PathSegment, 'PathSegment', classMeta, VOID, VOID, PathSegment);
  setMetadataFor(Companion_19, 'Companion', objectMeta);
  setMetadataFor(PathSegmentIterator, 'PathSegmentIterator', classMeta, Managed);
  setMetadataFor(PathVerb, 'PathVerb', classMeta, Enum);
  setMetadataFor(Companion_20, 'Companion', objectMeta);
  setMetadataFor(Picture, 'Picture', classMeta, RefCnt);
  setMetadataFor(Companion_21, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_9, '_FinalizerHolder', objectMeta);
  setMetadataFor(PictureRecorder, 'PictureRecorder', classMeta, Managed, VOID, PictureRecorder_init_$Create$);
  setMetadataFor(PixelGeometry, 'PixelGeometry', classMeta, Enum);
  setMetadataFor(Companion_22, 'Companion', objectMeta);
  setMetadataFor(Point, 'Point', classMeta);
  setMetadataFor(Point3, 'Point3', classMeta);
  setMetadataFor(Companion_23, 'Companion', objectMeta);
  setMetadataFor(Rect, 'Rect', classMeta);
  setMetadataFor(RRect, 'RRect', classMeta, Rect);
  setMetadataFor(Companion_24, 'Companion', objectMeta);
  setMetadataFor(ShadowUtils, 'ShadowUtils', objectMeta);
  setMetadataFor(ArrayDecoder, 'ArrayDecoder', classMeta);
  setMetadataFor(Companion_25, 'Companion', objectMeta);
  setMetadataFor(Surface, 'Surface', classMeta, RefCnt);
  setMetadataFor(SurfaceColorFormat, 'SurfaceColorFormat', classMeta, Enum);
  setMetadataFor(SurfaceOrigin, 'SurfaceOrigin', classMeta, Enum);
  setMetadataFor(SurfaceProps, 'SurfaceProps', classMeta, VOID, VOID, SurfaceProps);
  setMetadataFor(Companion_26, 'Companion', objectMeta);
  setMetadataFor(Typeface, 'Typeface', classMeta, RefCnt);
  setMetadataFor(Companion_27, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_10, '_FinalizerHolder', objectMeta);
  setMetadataFor(U16String, 'U16String', classMeta, Managed);
  setMetadataFor(CharDirection, 'CharDirection', objectMeta);
  setMetadataFor(Alignment, 'Alignment', classMeta, Enum);
  setMetadataFor(BaselineMode, 'BaselineMode', classMeta, Enum);
  setMetadataFor(DecorationLineStyle, 'DecorationLineStyle', classMeta, Enum);
  setMetadataFor(Companion_28, 'Companion', objectMeta);
  setMetadataFor(DecorationStyle, 'DecorationStyle', classMeta);
  setMetadataFor(Direction, 'Direction', classMeta, Enum);
  setMetadataFor(Companion_29, 'Companion', objectMeta);
  setMetadataFor(FontCollection, 'FontCollection', classMeta, RefCnt, VOID, FontCollection_init_$Create$);
  setMetadataFor(FontRastrSettings, 'FontRastrSettings', classMeta);
  setMetadataFor(HeightMode, 'HeightMode', classMeta, Enum);
  setMetadataFor(Companion_30, 'Companion', objectMeta);
  setMetadataFor(LineMetrics, 'LineMetrics', classMeta);
  setMetadataFor(Companion_31, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_11, '_FinalizerHolder', objectMeta);
  setMetadataFor(Paragraph, 'Paragraph', classMeta, Managed);
  setMetadataFor(Companion_32, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_12, '_FinalizerHolder', objectMeta);
  setMetadataFor(ParagraphBuilder, 'ParagraphBuilder', classMeta, Managed);
  setMetadataFor(Companion_33, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_13, '_FinalizerHolder', objectMeta);
  setMetadataFor(ParagraphStyle, 'ParagraphStyle', classMeta, Managed, VOID, ParagraphStyle);
  setMetadataFor(PlaceholderAlignment, 'PlaceholderAlignment', classMeta, Enum);
  setMetadataFor(PlaceholderStyle, 'PlaceholderStyle', classMeta);
  setMetadataFor(RectHeightMode, 'RectHeightMode', classMeta, Enum);
  setMetadataFor(RectWidthMode, 'RectWidthMode', classMeta, Enum);
  setMetadataFor(Companion_34, 'Companion', objectMeta);
  setMetadataFor(Shadow, 'Shadow', classMeta);
  setMetadataFor(Companion_35, 'Companion', objectMeta);
  setMetadataFor(TextBox, 'TextBox', classMeta);
  setMetadataFor(TextIndent, 'TextIndent', classMeta, VOID, VOID, TextIndent);
  setMetadataFor(Companion_36, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_14, '_FinalizerHolder', objectMeta);
  setMetadataFor(TextStyle, 'TextStyle', classMeta, Managed, VOID, TextStyle_init_$Create$);
  setMetadataFor(Companion_37, 'Companion', objectMeta);
  setMetadataFor(TypefaceFontProvider, 'TypefaceFontProvider', classMeta, FontMgr, VOID, TypefaceFontProvider);
  setMetadataFor(GraphicsApi, 'GraphicsApi', classMeta, Enum);
  setMetadataFor(OS, 'OS', classMeta, Enum);
  setMetadataFor(Arch, 'Arch', classMeta, Enum);
  setMetadataFor(ClipboardManager, 'ClipboardManager', classMeta, VOID, VOID, ClipboardManager);
  setMetadataFor(URIManager, 'URIManager', classMeta, VOID, VOID, URIManager);
  setMetadataFor(RenderException, 'RenderException', classMeta, RuntimeException, VOID, RenderException);
  setMetadataFor(SystemTheme, 'SystemTheme', classMeta, Enum);
  setMetadataFor(InteropScope, 'InteropScope', classMeta, VOID, VOID, InteropScope);
  setMetadataFor(createWebGLContext$contextAttributes$1, VOID, classMeta);
  setMetadataFor(Pattern, 'Pattern', classMeta);
  setMetadataFor(Companion_38, 'Companion', objectMeta);
  setMetadataFor(FinalizationThunk, 'FinalizationThunk', classMeta);
  setMetadataFor(Companion_39, 'Companion', objectMeta);
  setMetadataFor(_FinalizerHolder_15, '_FinalizerHolder', objectMeta);
  setMetadataFor(Stats, 'Stats', objectMeta);
  setMetadataFor(CanvasRenderer, 'CanvasRenderer', classMeta);
  setMetadataFor(SkiaLayer$attachTo$1, VOID, classMeta, CanvasRenderer);
  setMetadataFor(SkiaLayer, 'SkiaLayer', classMeta, VOID, VOID, SkiaLayer);
  //endregion
  function RTreeFactory_init_$Init$($this) {
    BBHFactory.call($this, org_jetbrains_skia_RTreeFactory__1nMake());
    RTreeFactory.call($this);
    Stats_instance.l37();
    return $this;
  }
  function RTreeFactory_init_$Create$() {
    return RTreeFactory_init_$Init$(objectCreate(protoOf(RTreeFactory)));
  }
  function RTreeFactory() {
  }
  function _FinalizerHolder() {
    _FinalizerHolder_instance = this;
    this.q37_1 = org_jetbrains_skia_BBHFactory__1nGetFinalizer();
  }
  var _FinalizerHolder_instance;
  function _FinalizerHolder_getInstance() {
    if (_FinalizerHolder_instance == null)
      new _FinalizerHolder();
    return _FinalizerHolder_instance;
  }
  function BBHFactory(ptr) {
    Managed.call(this, ptr, _FinalizerHolder_getInstance().q37_1);
  }
  function Companion() {
    Companion_instance = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion).s37 = function (width, height, sampleCnt, stencilBits, fbId, fbFormat) {
    Stats_instance.l37();
    var ptr = org_jetbrains_skia_BackendRenderTarget__1nMakeGL(width, height, sampleCnt, stencilBits, fbId, fbFormat);
    if (ptr === Companion_instance_39.t37())
      throw new RenderException("Can't create OpenGL BackendRenderTarget");
    return new BackendRenderTarget(ptr);
  };
  var Companion_instance;
  function Companion_getInstance_0() {
    if (Companion_instance == null)
      new Companion();
    return Companion_instance;
  }
  function _FinalizerHolder_0() {
    _FinalizerHolder_instance_0 = this;
    this.u37_1 = org_jetbrains_skia_BackendRenderTarget__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_0;
  function _FinalizerHolder_getInstance_0() {
    if (_FinalizerHolder_instance_0 == null)
      new _FinalizerHolder_0();
    return _FinalizerHolder_instance_0;
  }
  function BackendRenderTarget(ptr) {
    Companion_getInstance_0();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_0().u37_1);
  }
  var BlendMode_CLEAR_instance;
  var BlendMode_SRC_instance;
  var BlendMode_DST_instance;
  var BlendMode_SRC_OVER_instance;
  var BlendMode_DST_OVER_instance;
  var BlendMode_SRC_IN_instance;
  var BlendMode_DST_IN_instance;
  var BlendMode_SRC_OUT_instance;
  var BlendMode_DST_OUT_instance;
  var BlendMode_SRC_ATOP_instance;
  var BlendMode_DST_ATOP_instance;
  var BlendMode_XOR_instance;
  var BlendMode_PLUS_instance;
  var BlendMode_MODULATE_instance;
  var BlendMode_SCREEN_instance;
  var BlendMode_OVERLAY_instance;
  var BlendMode_DARKEN_instance;
  var BlendMode_LIGHTEN_instance;
  var BlendMode_COLOR_DODGE_instance;
  var BlendMode_COLOR_BURN_instance;
  var BlendMode_HARD_LIGHT_instance;
  var BlendMode_SOFT_LIGHT_instance;
  var BlendMode_DIFFERENCE_instance;
  var BlendMode_EXCLUSION_instance;
  var BlendMode_MULTIPLY_instance;
  var BlendMode_HUE_instance;
  var BlendMode_SATURATION_instance;
  var BlendMode_COLOR_instance;
  var BlendMode_LUMINOSITY_instance;
  function values() {
    return [BlendMode_CLEAR_getInstance(), BlendMode_SRC_getInstance(), BlendMode_DST_getInstance(), BlendMode_SRC_OVER_getInstance(), BlendMode_DST_OVER_getInstance(), BlendMode_SRC_IN_getInstance(), BlendMode_DST_IN_getInstance(), BlendMode_SRC_OUT_getInstance(), BlendMode_DST_OUT_getInstance(), BlendMode_SRC_ATOP_getInstance(), BlendMode_DST_ATOP_getInstance(), BlendMode_XOR_getInstance(), BlendMode_PLUS_getInstance(), BlendMode_MODULATE_getInstance(), BlendMode_SCREEN_getInstance(), BlendMode_OVERLAY_getInstance(), BlendMode_DARKEN_getInstance(), BlendMode_LIGHTEN_getInstance(), BlendMode_COLOR_DODGE_getInstance(), BlendMode_COLOR_BURN_getInstance(), BlendMode_HARD_LIGHT_getInstance(), BlendMode_SOFT_LIGHT_getInstance(), BlendMode_DIFFERENCE_getInstance(), BlendMode_EXCLUSION_getInstance(), BlendMode_MULTIPLY_getInstance(), BlendMode_HUE_getInstance(), BlendMode_SATURATION_getInstance(), BlendMode_COLOR_getInstance(), BlendMode_LUMINOSITY_getInstance()];
  }
  var BlendMode_entriesInitialized;
  function BlendMode_initEntries() {
    if (BlendMode_entriesInitialized)
      return Unit_instance;
    BlendMode_entriesInitialized = true;
    BlendMode_CLEAR_instance = new BlendMode('CLEAR', 0);
    BlendMode_SRC_instance = new BlendMode('SRC', 1);
    BlendMode_DST_instance = new BlendMode('DST', 2);
    BlendMode_SRC_OVER_instance = new BlendMode('SRC_OVER', 3);
    BlendMode_DST_OVER_instance = new BlendMode('DST_OVER', 4);
    BlendMode_SRC_IN_instance = new BlendMode('SRC_IN', 5);
    BlendMode_DST_IN_instance = new BlendMode('DST_IN', 6);
    BlendMode_SRC_OUT_instance = new BlendMode('SRC_OUT', 7);
    BlendMode_DST_OUT_instance = new BlendMode('DST_OUT', 8);
    BlendMode_SRC_ATOP_instance = new BlendMode('SRC_ATOP', 9);
    BlendMode_DST_ATOP_instance = new BlendMode('DST_ATOP', 10);
    BlendMode_XOR_instance = new BlendMode('XOR', 11);
    BlendMode_PLUS_instance = new BlendMode('PLUS', 12);
    BlendMode_MODULATE_instance = new BlendMode('MODULATE', 13);
    BlendMode_SCREEN_instance = new BlendMode('SCREEN', 14);
    BlendMode_OVERLAY_instance = new BlendMode('OVERLAY', 15);
    BlendMode_DARKEN_instance = new BlendMode('DARKEN', 16);
    BlendMode_LIGHTEN_instance = new BlendMode('LIGHTEN', 17);
    BlendMode_COLOR_DODGE_instance = new BlendMode('COLOR_DODGE', 18);
    BlendMode_COLOR_BURN_instance = new BlendMode('COLOR_BURN', 19);
    BlendMode_HARD_LIGHT_instance = new BlendMode('HARD_LIGHT', 20);
    BlendMode_SOFT_LIGHT_instance = new BlendMode('SOFT_LIGHT', 21);
    BlendMode_DIFFERENCE_instance = new BlendMode('DIFFERENCE', 22);
    BlendMode_EXCLUSION_instance = new BlendMode('EXCLUSION', 23);
    BlendMode_MULTIPLY_instance = new BlendMode('MULTIPLY', 24);
    BlendMode_HUE_instance = new BlendMode('HUE', 25);
    BlendMode_SATURATION_instance = new BlendMode('SATURATION', 26);
    BlendMode_COLOR_instance = new BlendMode('COLOR', 27);
    BlendMode_LUMINOSITY_instance = new BlendMode('LUMINOSITY', 28);
  }
  function BlendMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function BlendMode_CLEAR_getInstance() {
    BlendMode_initEntries();
    return BlendMode_CLEAR_instance;
  }
  function BlendMode_SRC_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SRC_instance;
  }
  function BlendMode_DST_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DST_instance;
  }
  function BlendMode_SRC_OVER_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SRC_OVER_instance;
  }
  function BlendMode_DST_OVER_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DST_OVER_instance;
  }
  function BlendMode_SRC_IN_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SRC_IN_instance;
  }
  function BlendMode_DST_IN_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DST_IN_instance;
  }
  function BlendMode_SRC_OUT_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SRC_OUT_instance;
  }
  function BlendMode_DST_OUT_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DST_OUT_instance;
  }
  function BlendMode_SRC_ATOP_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SRC_ATOP_instance;
  }
  function BlendMode_DST_ATOP_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DST_ATOP_instance;
  }
  function BlendMode_XOR_getInstance() {
    BlendMode_initEntries();
    return BlendMode_XOR_instance;
  }
  function BlendMode_PLUS_getInstance() {
    BlendMode_initEntries();
    return BlendMode_PLUS_instance;
  }
  function BlendMode_MODULATE_getInstance() {
    BlendMode_initEntries();
    return BlendMode_MODULATE_instance;
  }
  function BlendMode_SCREEN_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SCREEN_instance;
  }
  function BlendMode_OVERLAY_getInstance() {
    BlendMode_initEntries();
    return BlendMode_OVERLAY_instance;
  }
  function BlendMode_DARKEN_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DARKEN_instance;
  }
  function BlendMode_LIGHTEN_getInstance() {
    BlendMode_initEntries();
    return BlendMode_LIGHTEN_instance;
  }
  function BlendMode_COLOR_DODGE_getInstance() {
    BlendMode_initEntries();
    return BlendMode_COLOR_DODGE_instance;
  }
  function BlendMode_COLOR_BURN_getInstance() {
    BlendMode_initEntries();
    return BlendMode_COLOR_BURN_instance;
  }
  function BlendMode_HARD_LIGHT_getInstance() {
    BlendMode_initEntries();
    return BlendMode_HARD_LIGHT_instance;
  }
  function BlendMode_SOFT_LIGHT_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SOFT_LIGHT_instance;
  }
  function BlendMode_DIFFERENCE_getInstance() {
    BlendMode_initEntries();
    return BlendMode_DIFFERENCE_instance;
  }
  function BlendMode_EXCLUSION_getInstance() {
    BlendMode_initEntries();
    return BlendMode_EXCLUSION_instance;
  }
  function BlendMode_MULTIPLY_getInstance() {
    BlendMode_initEntries();
    return BlendMode_MULTIPLY_instance;
  }
  function BlendMode_HUE_getInstance() {
    BlendMode_initEntries();
    return BlendMode_HUE_instance;
  }
  function BlendMode_SATURATION_getInstance() {
    BlendMode_initEntries();
    return BlendMode_SATURATION_instance;
  }
  function BlendMode_COLOR_getInstance() {
    BlendMode_initEntries();
    return BlendMode_COLOR_instance;
  }
  function BlendMode_LUMINOSITY_getInstance() {
    BlendMode_initEntries();
    return BlendMode_LUMINOSITY_instance;
  }
  function BreakIterator$Companion$makeCharacterInstance$lambda($locale) {
    return function ($this$withErrorGuard, it) {
      return org_jetbrains_skia_BreakIterator__1nMake(0, $this$withErrorGuard.x37($locale), it);
    };
  }
  function Companion_0() {
    Companion_instance_0 = this;
    this.y37_1 = -1;
    this.z37_1 = 0;
    this.a38_1 = 100;
    this.b38_1 = 100;
    this.c38_1 = 200;
    this.d38_1 = 200;
    this.e38_1 = 300;
    this.f38_1 = 300;
    this.g38_1 = 400;
    this.h38_1 = 400;
    this.i38_1 = 500;
    Companion_instance_38.r37();
  }
  protoOf(Companion_0).j38 = function (locale) {
    Stats_instance.l37();
    return new BreakIterator(withErrorGuard('Failed to create character iterator', BreakIterator$Companion$makeCharacterInstance$lambda(locale)));
  };
  protoOf(Companion_0).k38 = function (locale, $super) {
    locale = locale === VOID ? null : locale;
    return $super === VOID ? this.j38(locale) : $super.j38.call(this, locale);
  };
  var Companion_instance_0;
  function Companion_getInstance_1() {
    if (Companion_instance_0 == null)
      new Companion_0();
    return Companion_instance_0;
  }
  function _FinalizerHolder_1() {
    _FinalizerHolder_instance_1 = this;
    this.l38_1 = org_jetbrains_skia_BreakIterator__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_1;
  function _FinalizerHolder_getInstance_1() {
    if (_FinalizerHolder_instance_1 == null)
      new _FinalizerHolder_1();
    return _FinalizerHolder_instance_1;
  }
  function BreakIterator$setText$lambda(this$0, $text) {
    return function ($this$withErrorGuard, it) {
      var tmp = this$0.o37_1;
      var tmp_0;
      if ($text == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'org.jetbrains.skia.BreakIterator.setText.<anonymous>.<anonymous>' call
        var tmp_1 = 0;
        var tmp_2 = $text.length;
        var tmp_3 = new Int16Array(tmp_2);
        while (tmp_1 < tmp_2) {
          var tmp_4 = tmp_1;
          // Inline function 'kotlin.code' call
          var this_0 = charSequenceGet($text, tmp_4);
          var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
          tmp_3[tmp_4] = toShort(tmp$ret$0);
          tmp_1 = tmp_1 + 1 | 0;
        }
        tmp_0 = tmp_3;
      }
      var tmp_5 = $this$withErrorGuard.m38(tmp_0);
      var tmp1_safe_receiver = $text;
      var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.length;
      return org_jetbrains_skia_BreakIterator__1nSetText(tmp, tmp_5, tmp2_elvis_lhs == null ? 0 : tmp2_elvis_lhs, it);
    };
  }
  function BreakIterator(ptr) {
    Companion_getInstance_1();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_1().l38_1);
    this.p38_1 = null;
  }
  protoOf(BreakIterator).b1q = function () {
    protoOf(Managed).b1q.call(this);
    var tmp0_safe_receiver = this.p38_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.b1q();
    }
  };
  protoOf(BreakIterator).q38 = function (offset) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_BreakIterator__1nPreceding(this.o37_1, offset);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(BreakIterator).r38 = function (offset) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_BreakIterator__1nFollowing(this.o37_1, offset);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(BreakIterator).s38 = function (text) {
    try {
      Stats_instance.l37();
      var tmp0_safe_receiver = this.p38_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        tmp0_safe_receiver.b1q();
      }
      var tmp = this;
      tmp.p38_1 = new U16String(withErrorGuard('Failed to setText', BreakIterator$setText$lambda(this, text)));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(this.p38_1);
    }
  };
  function withErrorGuard(message, block) {
    var errorCode = new Int32Array(1);
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.withErrorGuard.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var handle = $this$interopScope.t38(errorCode);
        var res = block($this$interopScope, handle);
        $this$interopScope.u38(handle, errorCode);
        if (errorCode[0] > 0) {
          throw RuntimeException_init_$Create$(message + '; operation failed with status ' + errorCode);
        }
        if (res === Companion_instance_39.t37()) {
          throw IllegalArgumentException_init_$Create$(message);
        }
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return res;
  }
  function Companion_1() {
    Companion_instance_1 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_1;
  function Companion_getInstance_2() {
    if (Companion_instance_1 == null)
      new Companion_1();
    return Companion_instance_1;
  }
  function _FinalizerHolder_2() {
    _FinalizerHolder_instance_2 = this;
    this.v38_1 = org_jetbrains_skia_Canvas__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_2;
  function _FinalizerHolder_getInstance_2() {
    if (_FinalizerHolder_instance_2 == null)
      new _FinalizerHolder_2();
    return _FinalizerHolder_instance_2;
  }
  function Canvas(ptr, managed, _owner) {
    Companion_getInstance_2();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_2().v38_1, managed);
    this.y38_1 = _owner;
  }
  protoOf(Canvas).z38 = function (left, top, right, bottom, startAngle, sweepAngle, includeCenter, paint) {
    Stats_instance.l37();
    try {
      org_jetbrains_skia_Canvas__1nDrawArc(this.o37_1, left, top, right, bottom, startAngle, sweepAngle, includeCenter, getPtr(paint));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(paint);
    }
    return this;
  };
  protoOf(Canvas).a39 = function (r, paint) {
    Stats_instance.l37();
    try {
      org_jetbrains_skia_Canvas__1nDrawRect(this.o37_1, r.b39_1, r.c39_1, r.d39_1, r.e39_1, getPtr(paint));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(paint);
    }
    return this;
  };
  protoOf(Canvas).f39 = function (x, y, radius, paint) {
    Stats_instance.l37();
    try {
      org_jetbrains_skia_Canvas__1nDrawOval(this.o37_1, x - radius, y - radius, x + radius, y + radius, getPtr(paint));
    }finally {
      reachabilityBarrier(paint);
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(Canvas).g39 = function (r, paint) {
    Stats_instance.l37();
    try {
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_Canvas__1nDrawRRect(this.o37_1, r.b39_1, r.c39_1, r.d39_1, r.e39_1, $this$interopScope.m39(r.l39_1), r.l39_1.length, getPtr(paint));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
    }finally {
      reachabilityBarrier(paint);
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(Canvas).n39 = function (path, paint) {
    Stats_instance.l37();
    try {
      org_jetbrains_skia_Canvas__1nDrawPath(this.o37_1, getPtr(path), getPtr(paint));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(path);
      reachabilityBarrier(paint);
    }
    return this;
  };
  protoOf(Canvas).o39 = function (picture, matrix, paint) {
    Stats_instance.l37();
    try {
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          var tmp = this.o37_1;
          var tmp_0 = getPtr(picture);
          org_jetbrains_skia_Canvas__1nDrawPicture(tmp, tmp_0, $this$interopScope.m39(matrix == null ? null : matrix.p39_1), getPtr(paint));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(picture);
      reachabilityBarrier(paint);
    }
    return this;
  };
  protoOf(Canvas).h2t = function (color) {
    Stats_instance.l37();
    try {
      org_jetbrains_skia_Canvas__1nClear(this.o37_1, color);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(Canvas).q39 = function () {
    Stats_instance.l37();
    org_jetbrains_skia_Canvas__1nResetMatrix(this.o37_1);
    return this;
  };
  protoOf(Canvas).r39 = function (r, mode, antiAlias) {
    Stats_instance.l37();
    org_jetbrains_skia_Canvas__1nClipRect(this.o37_1, r.b39_1, r.c39_1, r.d39_1, r.e39_1, mode.t9_1, antiAlias);
    return this;
  };
  protoOf(Canvas).s39 = function (r, mode, antiAlias) {
    Stats_instance.l37();
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        org_jetbrains_skia_Canvas__1nClipRRect(this.o37_1, r.b39_1, r.c39_1, r.d39_1, r.e39_1, $this$interopScope.m39(r.l39_1), r.l39_1.length, mode.t9_1, antiAlias);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return this;
  };
  protoOf(Canvas).t39 = function (p, mode, antiAlias) {
    Stats_instance.l37();
    try {
      org_jetbrains_skia_Canvas__1nClipPath(this.o37_1, getPtr(p), mode.t9_1, antiAlias);
    }finally {
      reachabilityBarrier(p);
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(Canvas).i34 = function (dx, dy) {
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        Stats_instance.l37();
        org_jetbrains_skia_Canvas__1nTranslate(this.o37_1, dx, dy);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return this;
  };
  protoOf(Canvas).u39 = function (matrix) {
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        Stats_instance.l37();
        org_jetbrains_skia_Canvas__1nConcat44(this.o37_1, $this$interopScope.m39(matrix.v39_1));
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return this;
  };
  protoOf(Canvas).w39 = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Canvas__1nSave(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Canvas).x39 = function (left, top, right, bottom, paint) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Canvas__1nSaveLayerRect(this.o37_1, left, top, right, bottom, getPtr(paint));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(paint);
    }
    return tmp;
  };
  protoOf(Canvas).y39 = function () {
    Stats_instance.l37();
    org_jetbrains_skia_Canvas__1nRestore(this.o37_1);
    return this;
  };
  var ClipMode_DIFFERENCE_instance;
  var ClipMode_INTERSECT_instance;
  var ClipMode_entriesInitialized;
  function ClipMode_initEntries() {
    if (ClipMode_entriesInitialized)
      return Unit_instance;
    ClipMode_entriesInitialized = true;
    ClipMode_DIFFERENCE_instance = new ClipMode('DIFFERENCE', 0);
    ClipMode_INTERSECT_instance = new ClipMode('INTERSECT', 1);
  }
  function ClipMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClipMode_DIFFERENCE_getInstance() {
    ClipMode_initEntries();
    return ClipMode_DIFFERENCE_instance;
  }
  function ClipMode_INTERSECT_getInstance() {
    ClipMode_initEntries();
    return ClipMode_INTERSECT_instance;
  }
  function Color() {
    this.z39_1 = 0;
    this.a3a_1 = -16777216;
    this.b3a_1 = -1;
    this.c3a_1 = -65536;
    this.d3a_1 = -16711936;
    this.e3a_1 = -16776961;
    this.f3a_1 = -256;
    this.g3a_1 = -16711681;
    this.h3a_1 = -65281;
  }
  var Color_instance;
  function Color_getInstance() {
    return Color_instance;
  }
  function Companion_2() {
    Companion_instance_2 = this;
    Companion_instance_38.r37();
    this.i3a_1 = ColorSpace_init_$Create$(org_jetbrains_skia_ColorSpace__1nMakeSRGB(), false);
    this.j3a_1 = ColorSpace_init_$Create$(org_jetbrains_skia_ColorSpace__1nMakeSRGBLinear(), false);
    this.k3a_1 = ColorSpace_init_$Create$(org_jetbrains_skia_ColorSpace__1nMakeDisplayP3(), false);
  }
  var Companion_instance_2;
  function Companion_getInstance_3() {
    if (Companion_instance_2 == null)
      new Companion_2();
    return Companion_instance_2;
  }
  function ColorSpace_init_$Init$(ptr, managed, $this) {
    Managed.call($this, ptr, _FinalizerHolder_getInstance_3().l3a_1, managed);
    ColorSpace.call($this);
    return $this;
  }
  function ColorSpace_init_$Create$(ptr, managed) {
    return ColorSpace_init_$Init$(ptr, managed, objectCreate(protoOf(ColorSpace)));
  }
  function _FinalizerHolder_3() {
    _FinalizerHolder_instance_3 = this;
    this.l3a_1 = org_jetbrains_skia_ColorSpace__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_3;
  function _FinalizerHolder_getInstance_3() {
    if (_FinalizerHolder_instance_3 == null)
      new _FinalizerHolder_3();
    return _FinalizerHolder_instance_3;
  }
  function ColorSpace() {
    Companion_getInstance_3();
  }
  function Companion_3() {
    Companion_instance_3 = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion_3).m3a = function (bytes, offset, length) {
    Stats_instance.l37();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.Companion.makeFromBytes.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        tmp$ret$1 = org_jetbrains_skia_Data__1nMakeFromBytes($this$interopScope.n3a(bytes), offset, length);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return new Data(tmp$ret$1);
  };
  protoOf(Companion_3).o3a = function (bytes, offset, length, $super) {
    offset = offset === VOID ? 0 : offset;
    length = length === VOID ? bytes.length : length;
    return $super === VOID ? this.m3a(bytes, offset, length) : $super.m3a.call(this, bytes, offset, length);
  };
  var Companion_instance_3;
  function Companion_getInstance_4() {
    if (Companion_instance_3 == null)
      new Companion_3();
    return Companion_instance_3;
  }
  function _FinalizerHolder_4() {
    _FinalizerHolder_instance_4 = this;
    this.p3a_1 = org_jetbrains_skia_Data__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_4;
  function _FinalizerHolder_getInstance_4() {
    if (_FinalizerHolder_instance_4 == null)
      new _FinalizerHolder_4();
    return _FinalizerHolder_instance_4;
  }
  function Data(ptr) {
    Companion_getInstance_4();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_4().p3a_1);
    this.s3a_1 = null;
  }
  protoOf(Data).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof Data ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var otherData = tmp;
    return this.p37(otherData);
  };
  protoOf(Data).p37 = function (other) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Data__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  function Companion_4() {
    Companion_instance_4 = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion_4).t3a = function () {
    Stats_instance.l37();
    loadOpenGLLibrary();
    var ptr = org_jetbrains_skia_DirectContext__1nMakeGL();
    if (ptr === Companion_instance_39.t37())
      throw new RenderException("Can't create OpenGL DirectContext");
    return new DirectContext(ptr);
  };
  var Companion_instance_4;
  function Companion_getInstance_5() {
    if (Companion_instance_4 == null)
      new Companion_4();
    return Companion_instance_4;
  }
  function DirectContext(ptr) {
    Companion_getInstance_5();
    RefCnt_init_$Init$(ptr, this);
  }
  protoOf(DirectContext).w3a = function () {
    Stats_instance.l37();
    org_jetbrains_skia_DirectContext__1nFlush(this.o37_1);
    return this;
  };
  function Companion_5() {
    Companion_instance_5 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_5;
  function Companion_getInstance_6() {
    if (Companion_instance_5 == null)
      new Companion_5();
    return Companion_instance_5;
  }
  function Font_init_$Init$(ptr, $this) {
    Managed.call($this, ptr, _FinalizerHolder_getInstance_5().a3b_1);
    Font.call($this);
    return $this;
  }
  function Font_init_$Init$_0($this) {
    Font_init_$Init$(org_jetbrains_skia_Font__1nMakeDefault(), $this);
    Stats_instance.l37();
    return $this;
  }
  function Font_init_$Create$() {
    return Font_init_$Init$_0(objectCreate(protoOf(Font)));
  }
  function Font_init_$Init$_1(typeface, size, $this) {
    Font_init_$Init$(org_jetbrains_skia_Font__1nMakeTypefaceSize(getPtr(typeface), size), $this);
    Stats_instance.l37();
    reachabilityBarrier(typeface);
    return $this;
  }
  function Font_init_$Create$_0(typeface, size) {
    return Font_init_$Init$_1(typeface, size, objectCreate(protoOf(Font)));
  }
  function _FinalizerHolder_5() {
    _FinalizerHolder_instance_5 = this;
    this.a3b_1 = org_jetbrains_skia_Font__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_5;
  function _FinalizerHolder_getInstance_5() {
    if (_FinalizerHolder_instance_5 == null)
      new _FinalizerHolder_5();
    return _FinalizerHolder_instance_5;
  }
  function Font$_get_metrics_$lambda_bxy7iq(this$0) {
    return function ($this$fromInteropPointer, it) {
      org_jetbrains_skia_Font__1nGetMetrics(this$0.o37_1, it);
      return Unit_instance;
    };
  }
  protoOf(Font).p37 = function (other) {
    var tmp;
    try {
      tmp = org_jetbrains_skia_Font__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  protoOf(Font).d3b = function () {
    var tmp;
    try {
      Stats_instance.l37();
      var tmp_0 = Companion_instance_7;
      tmp = fromInteropPointer(tmp_0, Font$_get_metrics_$lambda_bxy7iq(this));
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  function Font() {
    Companion_getInstance_6();
  }
  var FontEdging_ALIAS_instance;
  var FontEdging_ANTI_ALIAS_instance;
  var FontEdging_SUBPIXEL_ANTI_ALIAS_instance;
  var FontEdging_entriesInitialized;
  function FontEdging_initEntries() {
    if (FontEdging_entriesInitialized)
      return Unit_instance;
    FontEdging_entriesInitialized = true;
    FontEdging_ALIAS_instance = new FontEdging('ALIAS', 0);
    FontEdging_ANTI_ALIAS_instance = new FontEdging('ANTI_ALIAS', 1);
    FontEdging_SUBPIXEL_ANTI_ALIAS_instance = new FontEdging('SUBPIXEL_ANTI_ALIAS', 2);
  }
  function FontEdging(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FontEdging_ALIAS_getInstance() {
    FontEdging_initEntries();
    return FontEdging_ALIAS_instance;
  }
  function FontEdging_ANTI_ALIAS_getInstance() {
    FontEdging_initEntries();
    return FontEdging_ANTI_ALIAS_instance;
  }
  function FontEdging_SUBPIXEL_ANTI_ALIAS_getInstance() {
    FontEdging_initEntries();
    return FontEdging_SUBPIXEL_ANTI_ALIAS_instance;
  }
  function FontFeature$Companion$parseW3$lambda(it) {
    // Inline function 'kotlin.text.trim' call
    var tmp$ret$0 = toString(trim(isCharSequence(it) ? it : THROW_CCE()));
    var parts = split(tmp$ret$0, [' ']);
    var name = parts.n(0);
    var value = getOrNull(parts, 1);
    var tmp;
    switch (value) {
      case 'on':
      case null:
        tmp = 1;
        break;
      case 'off':
        tmp = 0;
        break;
      default:
        var tmp0_elvis_lhs = toIntOrNull(value);
        tmp = tmp0_elvis_lhs == null ? 1 : tmp0_elvis_lhs;
        break;
    }
    var value_0 = tmp;
    return name.length === 4 ? FontFeature_init_$Create$(name, value_0) : null;
  }
  function FontFeature_init_$Init$(feature, value, $this) {
    FontFeature.call($this, Companion_instance_12.e3b(feature), value, _UInt___init__impl__l7qpdl(0), _UInt___init__impl__l7qpdl(-1));
    return $this;
  }
  function FontFeature_init_$Create$(feature, value) {
    return FontFeature_init_$Init$(feature, value, objectCreate(protoOf(FontFeature)));
  }
  function Companion_6() {
    Companion_instance_6 = this;
    this.f3b_1 = _UInt___init__impl__l7qpdl(0);
    this.g3b_1 = _UInt___init__impl__l7qpdl(-1);
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.h3b_1 = fillArrayVal(Array(0), null);
    this.i3b_1 = compilePattern('\\s+');
    this.j3b_1 = compilePattern('([-+])?([a-z0-9]{4})(?:\\[(\\d+)?:(\\d+)?\\])?(?:=(\\d+))?');
    this.k3b_1 = 1;
    this.l3b_1 = 2;
    this.m3b_1 = 3;
    this.n3b_1 = 4;
    this.o3b_1 = 5;
  }
  protoOf(Companion_6).p3b = function (str) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp = splitToSequence(str, [',']);
    var this_0 = toList(mapNotNull(tmp, FontFeature$Companion$parseW3$lambda));
    return copyToArray(this_0);
  };
  var Companion_instance_6;
  function Companion_getInstance_7() {
    if (Companion_instance_6 == null)
      new Companion_6();
    return Companion_instance_6;
  }
  function FontFeature(_tag, value, start, end) {
    Companion_getInstance_7();
    this.q3b_1 = _tag;
    this.r3b_1 = value;
    this.s3b_1 = start;
    this.t3b_1 = end;
  }
  protoOf(FontFeature).u3b = function () {
    return Companion_instance_12.v3b(this.q3b_1);
  };
  protoOf(FontFeature).toString = function () {
    var range = '';
    var tmp;
    // Inline function 'kotlin.UInt.compareTo' call
    var this_0 = this.s3b_1;
    var other = _UInt___init__impl__l7qpdl(0);
    if (uintCompare(_UInt___get_data__impl__f0vqqw(this_0), _UInt___get_data__impl__f0vqqw(other)) > 0) {
      tmp = true;
    } else {
      // Inline function 'kotlin.UInt.compareTo' call
      var this_1 = this.t3b_1;
      Companion_getInstance();
      var other_0 = _UInt___init__impl__l7qpdl(-1);
      tmp = uintCompare(_UInt___get_data__impl__f0vqqw(this_1), _UInt___get_data__impl__f0vqqw(other_0)) < 0;
    }
    if (tmp) {
      var tmp_0;
      // Inline function 'kotlin.UInt.compareTo' call
      var this_2 = this.s3b_1;
      var other_1 = _UInt___init__impl__l7qpdl(0);
      if (uintCompare(_UInt___get_data__impl__f0vqqw(this_2), _UInt___get_data__impl__f0vqqw(other_1)) > 0) {
        tmp_0 = new UInt(this.s3b_1);
      } else {
        tmp_0 = '';
      }
      var tmp_1 = '[' + tmp_0 + ':';
      var tmp_2;
      // Inline function 'kotlin.UInt.compareTo' call
      var this_3 = this.t3b_1;
      Companion_getInstance();
      var other_2 = _UInt___init__impl__l7qpdl(-1);
      if (uintCompare(_UInt___get_data__impl__f0vqqw(this_3), _UInt___get_data__impl__f0vqqw(other_2)) < 0) {
        tmp_2 = new UInt(this.t3b_1);
      } else {
        tmp_2 = '';
      }
      range = tmp_1 + toString(tmp_2) + ']';
    }
    var valuePrefix = '';
    var valueSuffix = '';
    if (this.r3b_1 === 0)
      valuePrefix = '-';
    else if (this.r3b_1 === 1)
      valuePrefix = '+';
    else
      valueSuffix = '=' + this.r3b_1;
    return 'FontFeature(' + valuePrefix + this.q3b_1 + range + valueSuffix + ')';
  };
  protoOf(FontFeature).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof FontFeature))
      return false;
    if (!(this.u3b() === other.u3b()))
      return false;
    if (!(this.r3b_1 === other.r3b_1))
      return false;
    if (!(this.s3b_1 === other.s3b_1))
      return false;
    return this.t3b_1 === other.t3b_1;
  };
  protoOf(FontFeature).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + this.q3b_1 | 0;
    result = imul(result, PRIME) + this.r3b_1 | 0;
    var tmp = imul(result, PRIME);
    // Inline function 'kotlin.UInt.toInt' call
    // Inline function 'kotlin.UInt.xor' call
    // Inline function 'kotlin.UInt.shr' call
    var this_0 = this.s3b_1;
    var this_1 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_0) >>> 16 | 0);
    var other = this.s3b_1;
    var this_2 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_1) ^ _UInt___get_data__impl__f0vqqw(other));
    result = tmp + _UInt___get_data__impl__f0vqqw(this_2) | 0;
    var tmp_0 = imul(result, PRIME);
    // Inline function 'kotlin.UInt.toInt' call
    // Inline function 'kotlin.UInt.xor' call
    // Inline function 'kotlin.UInt.shr' call
    var this_3 = this.t3b_1;
    var this_4 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_3) >>> 16 | 0);
    var other_0 = this.t3b_1;
    var this_5 = _UInt___init__impl__l7qpdl(_UInt___get_data__impl__f0vqqw(this_4) ^ _UInt___get_data__impl__f0vqqw(other_0));
    result = tmp_0 + _UInt___get_data__impl__f0vqqw(this_5) | 0;
    return result;
  };
  var FontHinting_NONE_instance;
  var FontHinting_SLIGHT_instance;
  var FontHinting_NORMAL_instance;
  var FontHinting_FULL_instance;
  var FontHinting_entriesInitialized;
  function FontHinting_initEntries() {
    if (FontHinting_entriesInitialized)
      return Unit_instance;
    FontHinting_entriesInitialized = true;
    FontHinting_NONE_instance = new FontHinting('NONE', 0);
    FontHinting_SLIGHT_instance = new FontHinting('SLIGHT', 1);
    FontHinting_NORMAL_instance = new FontHinting('NORMAL', 2);
    FontHinting_FULL_instance = new FontHinting('FULL', 3);
  }
  function FontHinting(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FontHinting_NONE_getInstance() {
    FontHinting_initEntries();
    return FontHinting_NONE_instance;
  }
  function FontHinting_SLIGHT_getInstance() {
    FontHinting_initEntries();
    return FontHinting_SLIGHT_instance;
  }
  function FontHinting_NORMAL_getInstance() {
    FontHinting_initEntries();
    return FontHinting_NORMAL_instance;
  }
  function FontHinting_FULL_getInstance() {
    FontHinting_initEntries();
    return FontHinting_FULL_instance;
  }
  function Companion_7() {
  }
  var Companion_instance_7;
  function Companion_getInstance_8() {
    return Companion_instance_7;
  }
  function FontMetrics(top, ascent, descent, bottom, leading, avgCharWidth, maxCharWidth, xMin, xMax, xHeight, capHeight, underlineThickness, underlinePosition, strikeoutThickness, strikeoutPosition) {
    this.w3b_1 = top;
    this.x3b_1 = ascent;
    this.y3b_1 = descent;
    this.z3b_1 = bottom;
    this.a3c_1 = leading;
    this.b3c_1 = avgCharWidth;
    this.c3c_1 = maxCharWidth;
    this.d3c_1 = xMin;
    this.e3c_1 = xMax;
    this.f3c_1 = xHeight;
    this.g3c_1 = capHeight;
    this.h3c_1 = underlineThickness;
    this.i3c_1 = underlinePosition;
    this.j3c_1 = strikeoutThickness;
    this.k3c_1 = strikeoutPosition;
  }
  protoOf(FontMetrics).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof FontMetrics))
      return false;
    if (!(compareTo(this.w3b_1, other.w3b_1) === 0))
      return false;
    if (!(compareTo(this.x3b_1, other.x3b_1) === 0))
      return false;
    if (!(compareTo(this.y3b_1, other.y3b_1) === 0))
      return false;
    if (!(compareTo(this.z3b_1, other.z3b_1) === 0))
      return false;
    if (!(compareTo(this.a3c_1, other.a3c_1) === 0))
      return false;
    if (!(compareTo(this.b3c_1, other.b3c_1) === 0))
      return false;
    if (!(compareTo(this.c3c_1, other.c3c_1) === 0))
      return false;
    if (!(compareTo(this.d3c_1, other.d3c_1) === 0))
      return false;
    if (!(compareTo(this.e3c_1, other.e3c_1) === 0))
      return false;
    if (!(compareTo(this.f3c_1, other.f3c_1) === 0))
      return false;
    if (!(compareTo(this.g3c_1, other.g3c_1) === 0))
      return false;
    if (this.h3c_1 == null ? !(other.h3c_1 == null) : !(this.h3c_1 == other.h3c_1))
      return false;
    if (this.i3c_1 == null ? !(other.i3c_1 == null) : !(this.i3c_1 == other.i3c_1))
      return false;
    if (this.j3c_1 == null ? !(other.j3c_1 == null) : !(this.j3c_1 == other.j3c_1))
      return false;
    return !(this.k3c_1 == null ? !(other.k3c_1 == null) : !(this.k3c_1 == other.k3c_1));
  };
  protoOf(FontMetrics).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + toBits(this.w3b_1) | 0;
    result = imul(result, PRIME) + toBits(this.x3b_1) | 0;
    result = imul(result, PRIME) + toBits(this.y3b_1) | 0;
    result = imul(result, PRIME) + toBits(this.z3b_1) | 0;
    result = imul(result, PRIME) + toBits(this.a3c_1) | 0;
    result = imul(result, PRIME) + toBits(this.b3c_1) | 0;
    result = imul(result, PRIME) + toBits(this.c3c_1) | 0;
    result = imul(result, PRIME) + toBits(this.d3c_1) | 0;
    result = imul(result, PRIME) + toBits(this.e3c_1) | 0;
    result = imul(result, PRIME) + toBits(this.f3c_1) | 0;
    result = imul(result, PRIME) + toBits(this.g3c_1) | 0;
    var tmp = imul(result, PRIME);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.h3c_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    var tmp_0 = imul(result, PRIME);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_0 = this.i3c_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
    result = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    var tmp_1 = imul(result, PRIME);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_1 = this.j3c_1;
    var tmp1_elvis_lhs_1 = tmp0_safe_receiver_1 == null ? null : hashCode(tmp0_safe_receiver_1);
    result = tmp_1 + (tmp1_elvis_lhs_1 == null ? 0 : tmp1_elvis_lhs_1) | 0;
    var tmp_2 = imul(result, PRIME);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver_2 = this.k3c_1;
    var tmp1_elvis_lhs_2 = tmp0_safe_receiver_2 == null ? null : hashCode(tmp0_safe_receiver_2);
    result = tmp_2 + (tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2) | 0;
    return result;
  };
  protoOf(FontMetrics).toString = function () {
    return 'FontMetrics(_top=' + this.w3b_1 + ', _ascent=' + this.x3b_1 + ', _descent=' + this.y3b_1 + ', _bottom=' + this.z3b_1 + ', _leading=' + this.a3c_1 + ', _avgCharWidth=' + this.b3c_1 + ', _maxCharWidth=' + this.c3c_1 + ', _xMin=' + this.d3c_1 + ', _xMax=' + this.e3c_1 + ', _xHeight=' + this.f3c_1 + ', _capHeight=' + this.g3c_1 + ', _underlineThickness=' + this.h3c_1 + ', _underlinePosition=' + this.i3c_1 + ', _strikeoutThickness=' + this.j3c_1 + ', _strikeoutPosition=' + this.k3c_1 + ')';
  };
  function fromInteropPointer(_this__u8e3s4, block) {
    // Inline function 'org.jetbrains.skia.impl.withResult' call
    var result = new Float32Array(15);
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.impl.withResult.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var handle = $this$interopScope.l3c(result);
        block($this$interopScope, handle);
        $this$interopScope.m3c(handle, result);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return fromRawData(_this__u8e3s4, result);
  }
  function fromRawData(_this__u8e3s4, rawData) {
    var tmp = rawData[0];
    var tmp_0 = rawData[1];
    var tmp_1 = rawData[2];
    var tmp_2 = rawData[3];
    var tmp_3 = rawData[4];
    var tmp_4 = rawData[5];
    var tmp_5 = rawData[6];
    var tmp_6 = rawData[7];
    var tmp_7 = rawData[8];
    var tmp_8 = rawData[9];
    var tmp_9 = rawData[10];
    // Inline function 'org.jetbrains.skia.asNumberOrNull' call
    var this_0 = rawData[11];
    var tmp_10 = isNaN_0(this_0) ? null : this_0;
    // Inline function 'org.jetbrains.skia.asNumberOrNull' call
    var this_1 = rawData[12];
    var tmp_11 = isNaN_0(this_1) ? null : this_1;
    // Inline function 'org.jetbrains.skia.asNumberOrNull' call
    var this_2 = rawData[13];
    var tmp_12 = isNaN_0(this_2) ? null : this_2;
    // Inline function 'org.jetbrains.skia.asNumberOrNull' call
    var this_3 = rawData[14];
    var tmp$ret$3 = isNaN_0(this_3) ? null : this_3;
    return new FontMetrics(tmp, tmp_0, tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp_9, tmp_10, tmp_11, tmp_12, tmp$ret$3);
  }
  function Companion_8() {
    Companion_instance_8 = this;
    Companion_instance_38.r37();
    this.n3c_1 = FontMgr_init_$Create$(org_jetbrains_skia_FontMgr__1nDefault(), false);
  }
  var Companion_instance_8;
  function Companion_getInstance_9() {
    if (Companion_instance_8 == null)
      new Companion_8();
    return Companion_instance_8;
  }
  function FontMgr_init_$Init$(ptr, $this) {
    RefCnt_init_$Init$(ptr, $this);
    FontMgr.call($this);
    return $this;
  }
  function FontMgr_init_$Init$_0(ptr, allowClose, $this) {
    RefCnt_init_$Init$_0(ptr, allowClose, $this);
    FontMgr.call($this);
    return $this;
  }
  function FontMgr_init_$Create$(ptr, allowClose) {
    return FontMgr_init_$Init$_0(ptr, allowClose, objectCreate(protoOf(FontMgr)));
  }
  function FontMgr() {
    Companion_getInstance_9();
  }
  var FontSlant_UPRIGHT_instance;
  var FontSlant_ITALIC_instance;
  var FontSlant_OBLIQUE_instance;
  function values_0() {
    return [FontSlant_UPRIGHT_getInstance(), FontSlant_ITALIC_getInstance(), FontSlant_OBLIQUE_getInstance()];
  }
  var FontSlant_entriesInitialized;
  function FontSlant_initEntries() {
    if (FontSlant_entriesInitialized)
      return Unit_instance;
    FontSlant_entriesInitialized = true;
    FontSlant_UPRIGHT_instance = new FontSlant('UPRIGHT', 0);
    FontSlant_ITALIC_instance = new FontSlant('ITALIC', 1);
    FontSlant_OBLIQUE_instance = new FontSlant('OBLIQUE', 2);
  }
  function FontSlant(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FontSlant_UPRIGHT_getInstance() {
    FontSlant_initEntries();
    return FontSlant_UPRIGHT_instance;
  }
  function FontSlant_ITALIC_getInstance() {
    FontSlant_initEntries();
    return FontSlant_ITALIC_instance;
  }
  function FontSlant_OBLIQUE_getInstance() {
    FontSlant_initEntries();
    return FontSlant_OBLIQUE_instance;
  }
  function FontStyle_init_$Init$(weight, width, slant, $this) {
    FontStyle.call($this);
    $this.o3c_1 = weight & 65535 | (width & 255) << 16 | slant.t9_1 << 24;
    return $this;
  }
  function FontStyle_init_$Create$(weight, width, slant) {
    return FontStyle_init_$Init$(weight, width, slant, objectCreate(protoOf(FontStyle)));
  }
  function FontStyle_init_$Init$_0(value, $this) {
    FontStyle.call($this);
    $this.o3c_1 = value;
    return $this;
  }
  function FontStyle_init_$Create$_0(value) {
    return FontStyle_init_$Init$_0(value, objectCreate(protoOf(FontStyle)));
  }
  function Companion_9() {
    Companion_instance_9 = this;
    var tmp = this;
    tmp.p3c_1 = FontStyle_init_$Create$(400, 5, FontSlant_UPRIGHT_getInstance());
    var tmp_0 = this;
    tmp_0.q3c_1 = FontStyle_init_$Create$(700, 5, FontSlant_UPRIGHT_getInstance());
    var tmp_1 = this;
    tmp_1.r3c_1 = FontStyle_init_$Create$(400, 5, FontSlant_ITALIC_getInstance());
    var tmp_2 = this;
    tmp_2.s3c_1 = FontStyle_init_$Create$(700, 5, FontSlant_ITALIC_getInstance());
  }
  var Companion_instance_9;
  function Companion_getInstance_10() {
    if (Companion_instance_9 == null)
      new Companion_9();
    return Companion_instance_9;
  }
  protoOf(FontStyle).t3c = function () {
    return this.o3c_1 & 65535;
  };
  protoOf(FontStyle).u3c = function (weight) {
    return FontStyle_init_$Create$(weight, this.e34(), this.v3c());
  };
  protoOf(FontStyle).e34 = function () {
    return this.o3c_1 >> 16 & 255;
  };
  protoOf(FontStyle).v3c = function () {
    return values_0()[this.o3c_1 >> 24 & 255];
  };
  protoOf(FontStyle).toString = function () {
    return 'FontStyle(weight=' + this.t3c() + ', width=' + this.e34() + ', slant=' + this.v3c() + ')';
  };
  protoOf(FontStyle).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof FontStyle))
      return false;
    return this.o3c_1 === other.o3c_1;
  };
  protoOf(FontStyle).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + this.o3c_1 | 0;
    return result;
  };
  function FontStyle() {
    Companion_getInstance_10();
  }
  function Companion_10() {
    this.w3c_1 = 0;
    this.x3c_1 = 100;
    this.y3c_1 = 200;
    this.z3c_1 = 300;
    this.a3d_1 = 400;
    this.b3d_1 = 500;
    this.c3d_1 = 600;
    this.d3d_1 = 700;
    this.e3d_1 = 800;
    this.f3d_1 = 900;
    this.g3d_1 = 1000;
  }
  var Companion_instance_10;
  function Companion_getInstance_11() {
    return Companion_instance_10;
  }
  function Companion_11() {
    this.h3d_1 = 1;
    this.i3d_1 = 2;
    this.j3d_1 = 3;
    this.k3d_1 = 4;
    this.l3d_1 = 5;
    this.m3d_1 = 6;
    this.n3d_1 = 7;
    this.o3d_1 = 8;
    this.p3d_1 = 9;
  }
  var Companion_instance_11;
  function Companion_getInstance_12() {
    return Companion_instance_11;
  }
  function Companion_12() {
  }
  protoOf(Companion_12).e3b = function (name) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(name.length === 4)) {
      // Inline function 'org.jetbrains.skia.Companion.fromString.<anonymous>' call
      var message = "Name must be exactly 4 symbols, got: '" + name + "'";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.code' call
    var this_0 = charSequenceGet(name, 0);
    var tmp = (Char__toInt_impl_vasixd(this_0) & 255) << 24;
    // Inline function 'kotlin.code' call
    var this_1 = charSequenceGet(name, 1);
    var tmp_0 = tmp | (Char__toInt_impl_vasixd(this_1) & 255) << 16;
    // Inline function 'kotlin.code' call
    var this_2 = charSequenceGet(name, 2);
    var tmp_1 = tmp_0 | (Char__toInt_impl_vasixd(this_2) & 255) << 8;
    // Inline function 'kotlin.code' call
    var this_3 = charSequenceGet(name, 3);
    return tmp_1 | Char__toInt_impl_vasixd(this_3) & 255;
  };
  protoOf(Companion_12).v3b = function (tag) {
    // Inline function 'kotlin.charArrayOf' call
    var tmp$ret$0 = charArrayOf([numberToChar(tag >> 24 & 255), numberToChar(tag >> 16 & 255), numberToChar(tag >> 8 & 255), numberToChar(tag & 255)]);
    return concatToString(tmp$ret$0);
  };
  var Companion_instance_12;
  function Companion_getInstance_13() {
    return Companion_instance_12;
  }
  function Companion_13() {
  }
  var Companion_instance_13;
  function Companion_getInstance_14() {
    return Companion_instance_13;
  }
  function IRange(start, end) {
    this.q3d_1 = start;
    this.r3d_1 = end;
  }
  protoOf(IRange).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof IRange))
      return false;
    if (!(this.q3d_1 === other.q3d_1))
      return false;
    return this.r3d_1 === other.r3d_1;
  };
  protoOf(IRange).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + this.q3d_1 | 0;
    result = imul(result, PRIME) + this.r3d_1 | 0;
    return result;
  };
  protoOf(IRange).toString = function () {
    return 'IRange(_start=' + this.q3d_1 + ', _end=' + this.r3d_1 + ')';
  };
  function fromInteropPointer_0(_this__u8e3s4, block) {
    // Inline function 'org.jetbrains.skia.impl.withResult' call
    var result = new Int32Array(2);
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.impl.withResult.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var handle = $this$interopScope.s3d(result);
        block($this$interopScope, handle);
        $this$interopScope.u38(handle, result);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    var result_0 = result;
    return new IRange(result_0[0], result_0[1]);
  }
  function Companion_14() {
    Companion_instance_14 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_14;
  function Companion_getInstance_15() {
    if (Companion_instance_14 == null)
      new Companion_14();
    return Companion_instance_14;
  }
  function ManagedString_init_$Init$(s, $this) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.ManagedString.<init>.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        tmp$ret$1 = org_jetbrains_skia_ManagedString__1nMake($this$interopScope.x37(s));
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    ManagedString.call($this, tmp$ret$1);
    Stats_instance.l37();
    return $this;
  }
  function ManagedString_init_$Create$(s) {
    return ManagedString_init_$Init$(s, objectCreate(protoOf(ManagedString)));
  }
  function _FinalizerHolder_6() {
    _FinalizerHolder_instance_6 = this;
    this.t3d_1 = org_jetbrains_skia_ManagedString__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_6;
  function _FinalizerHolder_getInstance_6() {
    if (_FinalizerHolder_instance_6 == null)
      new _FinalizerHolder_6();
    return _FinalizerHolder_instance_6;
  }
  function ManagedString(ptr, managed) {
    Companion_getInstance_15();
    managed = managed === VOID ? true : managed;
    Managed.call(this, ptr, _FinalizerHolder_getInstance_6().t3d_1, managed);
  }
  protoOf(ManagedString).toString = function () {
    var tmp;
    try {
      Stats_instance.l37();
      var size = org_jetbrains_skia_ManagedString__nStringSize(this.o37_1);
      // Inline function 'org.jetbrains.skia.impl.withResult' call
      var result = new Int8Array(size);
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          // Inline function 'org.jetbrains.skia.impl.withResult.<anonymous>' call
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          var handle = $this$interopScope.u3d(result);
          // Inline function 'org.jetbrains.skia.ManagedString.toString.<anonymous>' call
          org_jetbrains_skia_ManagedString__nStringData(this.o37_1, handle, size);
          $this$interopScope.v3d(handle, result);
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = decodeToString(result);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ManagedString).y3d = function (s) {
    Stats_instance.l37();
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        org_jetbrains_skia_ManagedString__1nAppend(this.o37_1, $this$interopScope.x37(s));
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return this;
  };
  function Companion_15() {
    Companion_instance_15 = this;
    this.z3d_1 = this.a3e(0.0, 0.0);
  }
  protoOf(Companion_15).a3e = function (dx, dy) {
    return new Matrix33(new Float32Array([1.0, 0.0, dx, 0.0, 1.0, dy, 0.0, 0.0, 1.0]));
  };
  var Companion_instance_15;
  function Companion_getInstance_16() {
    if (Companion_instance_15 == null)
      new Companion_15();
    return Companion_instance_15;
  }
  function Matrix33(mat) {
    Companion_getInstance_16();
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(mat.length === 9)) {
      // Inline function 'org.jetbrains.skia.Matrix33.<anonymous>' call
      var message = 'Expected 9 elements, got ' + mat.length;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    this.p39_1 = mat;
  }
  protoOf(Matrix33).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof Matrix33))
      return false;
    return contentEquals(this.p39_1, other.p39_1);
  };
  protoOf(Matrix33).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + contentHashCode(this.p39_1) | 0;
    return result;
  };
  protoOf(Matrix33).toString = function () {
    return 'Matrix33(_mat=' + this.p39_1 + ')';
  };
  function Companion_16() {
    Companion_instance_16 = this;
    this.b3e_1 = new Matrix44(new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]));
  }
  var Companion_instance_16;
  function Companion_getInstance_17() {
    if (Companion_instance_16 == null)
      new Companion_16();
    return Companion_instance_16;
  }
  function Matrix44(mat) {
    Companion_getInstance_17();
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(mat.length === 16)) {
      // Inline function 'org.jetbrains.skia.Matrix44.<anonymous>' call
      var message = 'Expected 16 elements, got ' + mat.length;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    this.v39_1 = mat;
  }
  protoOf(Matrix44).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof Matrix44))
      return false;
    return contentEquals(this.v39_1, other.v39_1);
  };
  protoOf(Matrix44).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + contentHashCode(this.v39_1) | 0;
    return result;
  };
  protoOf(Matrix44).toString = function () {
    return 'Matrix44(_mat=' + this.v39_1 + ')';
  };
  function Companion_17() {
    Companion_instance_17 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_17;
  function Companion_getInstance_18() {
    if (Companion_instance_17 == null)
      new Companion_17();
    return Companion_instance_17;
  }
  function _FinalizerHolder_7() {
    _FinalizerHolder_instance_7 = this;
    this.c3e_1 = org_jetbrains_skia_Paint__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_7;
  function _FinalizerHolder_getInstance_7() {
    if (_FinalizerHolder_instance_7 == null)
      new _FinalizerHolder_7();
    return _FinalizerHolder_instance_7;
  }
  function Paint_init_$Init$($this) {
    Managed.call($this, org_jetbrains_skia_Paint__1nMake(), _FinalizerHolder_getInstance_7().c3e_1);
    Paint.call($this);
    Stats_instance.l37();
    return $this;
  }
  function Paint_init_$Create$() {
    return Paint_init_$Init$(objectCreate(protoOf(Paint)));
  }
  protoOf(Paint).p37 = function (other) {
    var tmp;
    try {
      tmp = org_jetbrains_skia_Paint__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  protoOf(Paint).f3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetMode(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).g3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetColor(this.o37_1, value);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).h3e = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Paint__1nGetColor(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).i3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetStrokeWidth(this.o37_1, value);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).j3e = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Paint__1nGetStrokeWidth(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).k3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetStrokeMiter(this.o37_1, value);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).l3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetStrokeCap(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).m3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetStrokeJoin(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).n3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetShader(this.o37_1, getPtr(value));
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(value);
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).o3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetColorFilter(this.o37_1, getPtr(value));
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(value);
    }
    return tmp;
  };
  protoOf(Paint).p3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetBlendMode(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).q3e = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = values()[org_jetbrains_skia_Paint__1nGetBlendMode(this.o37_1)];
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paint).r3e = function () {
    return this.q3e().equals(BlendMode_SRC_OVER_getInstance());
  };
  protoOf(Paint).s3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetPathEffect(this.o37_1, getPtr(value));
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(value);
    }
    return tmp;
  };
  protoOf(Paint).t3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Paint__1nSetImageFilter(this.o37_1, getPtr(value));
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(value);
    }
    return tmp;
  };
  function Paint() {
    Companion_getInstance_18();
  }
  var PaintMode_FILL_instance;
  var PaintMode_STROKE_instance;
  var PaintMode_STROKE_AND_FILL_instance;
  var PaintMode_entriesInitialized;
  function PaintMode_initEntries() {
    if (PaintMode_entriesInitialized)
      return Unit_instance;
    PaintMode_entriesInitialized = true;
    PaintMode_FILL_instance = new PaintMode('FILL', 0);
    PaintMode_STROKE_instance = new PaintMode('STROKE', 1);
    PaintMode_STROKE_AND_FILL_instance = new PaintMode('STROKE_AND_FILL', 2);
  }
  function PaintMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PaintMode_FILL_getInstance() {
    PaintMode_initEntries();
    return PaintMode_FILL_instance;
  }
  function PaintMode_STROKE_getInstance() {
    PaintMode_initEntries();
    return PaintMode_STROKE_instance;
  }
  var PaintStrokeCap_BUTT_instance;
  var PaintStrokeCap_ROUND_instance;
  var PaintStrokeCap_SQUARE_instance;
  var PaintStrokeCap_entriesInitialized;
  function PaintStrokeCap_initEntries() {
    if (PaintStrokeCap_entriesInitialized)
      return Unit_instance;
    PaintStrokeCap_entriesInitialized = true;
    PaintStrokeCap_BUTT_instance = new PaintStrokeCap('BUTT', 0);
    PaintStrokeCap_ROUND_instance = new PaintStrokeCap('ROUND', 1);
    PaintStrokeCap_SQUARE_instance = new PaintStrokeCap('SQUARE', 2);
  }
  function PaintStrokeCap(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PaintStrokeCap_BUTT_getInstance() {
    PaintStrokeCap_initEntries();
    return PaintStrokeCap_BUTT_instance;
  }
  function PaintStrokeCap_ROUND_getInstance() {
    PaintStrokeCap_initEntries();
    return PaintStrokeCap_ROUND_instance;
  }
  function PaintStrokeCap_SQUARE_getInstance() {
    PaintStrokeCap_initEntries();
    return PaintStrokeCap_SQUARE_instance;
  }
  var PaintStrokeJoin_MITER_instance;
  var PaintStrokeJoin_ROUND_instance;
  var PaintStrokeJoin_BEVEL_instance;
  var PaintStrokeJoin_entriesInitialized;
  function PaintStrokeJoin_initEntries() {
    if (PaintStrokeJoin_entriesInitialized)
      return Unit_instance;
    PaintStrokeJoin_entriesInitialized = true;
    PaintStrokeJoin_MITER_instance = new PaintStrokeJoin('MITER', 0);
    PaintStrokeJoin_ROUND_instance = new PaintStrokeJoin('ROUND', 1);
    PaintStrokeJoin_BEVEL_instance = new PaintStrokeJoin('BEVEL', 2);
  }
  function PaintStrokeJoin(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PaintStrokeJoin_MITER_getInstance() {
    PaintStrokeJoin_initEntries();
    return PaintStrokeJoin_MITER_instance;
  }
  function PaintStrokeJoin_ROUND_getInstance() {
    PaintStrokeJoin_initEntries();
    return PaintStrokeJoin_ROUND_instance;
  }
  function PaintStrokeJoin_BEVEL_getInstance() {
    PaintStrokeJoin_initEntries();
    return PaintStrokeJoin_BEVEL_instance;
  }
  function Companion_18() {
    Companion_instance_18 = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion_18).u3e = function (one, two, op) {
    var tmp;
    try {
      Stats_instance.l37();
      var ptr = org_jetbrains_skia_Path__1nMakeCombining(getPtr(one), getPtr(two), op.t9_1);
      tmp = ptr === Companion_instance_39.t37() ? null : new Path(ptr);
    }finally {
      reachabilityBarrier(one);
      reachabilityBarrier(two);
    }
    return tmp;
  };
  var Companion_instance_18;
  function Companion_getInstance_19() {
    if (Companion_instance_18 == null)
      new Companion_18();
    return Companion_instance_18;
  }
  function _FinalizerHolder_8() {
    _FinalizerHolder_instance_8 = this;
    this.v3e_1 = org_jetbrains_skia_Path__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_8;
  function _FinalizerHolder_getInstance_8() {
    if (_FinalizerHolder_instance_8 == null)
      new _FinalizerHolder_8();
    return _FinalizerHolder_instance_8;
  }
  function Path_init_$Init$($this) {
    Path.call($this, org_jetbrains_skia_Path__1nMake());
    Stats_instance.l37();
    return $this;
  }
  function Path_init_$Create$() {
    return Path_init_$Init$(objectCreate(protoOf(Path)));
  }
  function Path(ptr) {
    Companion_getInstance_19();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_8().v3e_1);
  }
  protoOf(Path).p37 = function (other) {
    var tmp;
    try {
      tmp = org_jetbrains_skia_Path__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  protoOf(Path).y3e = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Path__1nSetFillMode(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Path).z3e = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = values_1()[org_jetbrains_skia_Path__1nGetFillMode(this.o37_1)];
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Path).a3f = function () {
    Stats_instance.l37();
    org_jetbrains_skia_Path__1nReset(this.o37_1);
    return this;
  };
  protoOf(Path).s1t = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Path__1nIsEmpty(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Path).b3f = function (rect, dir, start) {
    Stats_instance.l37();
    org_jetbrains_skia_Path__1nAddRect(this.o37_1, rect.b39_1, rect.c39_1, rect.d39_1, rect.e39_1, dir.t9_1, start);
    return this;
  };
  protoOf(Path).c3f = function (rect, dir, start, $super) {
    dir = dir === VOID ? PathDirection_CLOCKWISE_getInstance() : dir;
    start = start === VOID ? 0 : start;
    return $super === VOID ? this.b3f(rect, dir, start) : $super.b3f.call(this, rect, dir, start);
  };
  protoOf(Path).d3f = function (rrect, dir, start) {
    Stats_instance.l37();
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        org_jetbrains_skia_Path__1nAddRRect(this.o37_1, rrect.b39_1, rrect.c39_1, rrect.d39_1, rrect.e39_1, $this$interopScope.m39(rrect.l39_1), rrect.l39_1.length, dir.t9_1, start);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return this;
  };
  protoOf(Path).e3f = function (rrect, dir, start, $super) {
    dir = dir === VOID ? PathDirection_CLOCKWISE_getInstance() : dir;
    start = start === VOID ? 6 : start;
    return $super === VOID ? this.d3f(rrect, dir, start) : $super.d3f.call(this, rrect, dir, start);
  };
  protoOf(Path).f3f = function (src, dx, dy, extend) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Path__1nAddPathOffset(this.o37_1, getPtr(src), dx, dy, extend);
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(src);
    }
    return tmp;
  };
  protoOf(Path).g3f = function (src, dx, dy, extend, $super) {
    extend = extend === VOID ? false : extend;
    return $super === VOID ? this.f3f(src, dx, dy, extend) : $super.f3f.call(this, src, dx, dy, extend);
  };
  protoOf(Path).h3f = function (matrix, dst, applyPerspectiveClip) {
    var tmp;
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_Path__1nTransform(this.o37_1, $this$interopScope.m39(matrix.p39_1), getPtr(dst), applyPerspectiveClip);
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(dst);
    }
    return tmp;
  };
  protoOf(Path).i3f = function (matrix, dst, applyPerspectiveClip, $super) {
    dst = dst === VOID ? null : dst;
    applyPerspectiveClip = applyPerspectiveClip === VOID ? true : applyPerspectiveClip;
    return $super === VOID ? this.h3f(matrix, dst, applyPerspectiveClip) : $super.h3f.call(this, matrix, dst, applyPerspectiveClip);
  };
  protoOf(Path).o = function () {
    return this.j3f(false);
  };
  protoOf(Path).j3f = function (forceClose) {
    return Companion_getInstance_20().k3f(this, forceClose);
  };
  var PathDirection_CLOCKWISE_instance;
  var PathDirection_COUNTER_CLOCKWISE_instance;
  var PathDirection_entriesInitialized;
  function PathDirection_initEntries() {
    if (PathDirection_entriesInitialized)
      return Unit_instance;
    PathDirection_entriesInitialized = true;
    PathDirection_CLOCKWISE_instance = new PathDirection('CLOCKWISE', 0);
    PathDirection_COUNTER_CLOCKWISE_instance = new PathDirection('COUNTER_CLOCKWISE', 1);
  }
  function PathDirection(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PathDirection_CLOCKWISE_getInstance() {
    PathDirection_initEntries();
    return PathDirection_CLOCKWISE_instance;
  }
  function PathDirection_COUNTER_CLOCKWISE_getInstance() {
    PathDirection_initEntries();
    return PathDirection_COUNTER_CLOCKWISE_instance;
  }
  var PathFillMode_WINDING_instance;
  var PathFillMode_EVEN_ODD_instance;
  var PathFillMode_INVERSE_WINDING_instance;
  var PathFillMode_INVERSE_EVEN_ODD_instance;
  function values_1() {
    return [PathFillMode_WINDING_getInstance(), PathFillMode_EVEN_ODD_getInstance(), PathFillMode_INVERSE_WINDING_getInstance(), PathFillMode_INVERSE_EVEN_ODD_getInstance()];
  }
  var PathFillMode_entriesInitialized;
  function PathFillMode_initEntries() {
    if (PathFillMode_entriesInitialized)
      return Unit_instance;
    PathFillMode_entriesInitialized = true;
    PathFillMode_WINDING_instance = new PathFillMode('WINDING', 0);
    PathFillMode_EVEN_ODD_instance = new PathFillMode('EVEN_ODD', 1);
    PathFillMode_INVERSE_WINDING_instance = new PathFillMode('INVERSE_WINDING', 2);
    PathFillMode_INVERSE_EVEN_ODD_instance = new PathFillMode('INVERSE_EVEN_ODD', 3);
  }
  function PathFillMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PathFillMode_WINDING_getInstance() {
    PathFillMode_initEntries();
    return PathFillMode_WINDING_instance;
  }
  function PathFillMode_EVEN_ODD_getInstance() {
    PathFillMode_initEntries();
    return PathFillMode_EVEN_ODD_instance;
  }
  function PathFillMode_INVERSE_WINDING_getInstance() {
    PathFillMode_initEntries();
    return PathFillMode_INVERSE_WINDING_instance;
  }
  function PathFillMode_INVERSE_EVEN_ODD_getInstance() {
    PathFillMode_initEntries();
    return PathFillMode_INVERSE_EVEN_ODD_instance;
  }
  var PathOp_DIFFERENCE_instance;
  var PathOp_INTERSECT_instance;
  var PathOp_UNION_instance;
  var PathOp_XOR_instance;
  var PathOp_REVERSE_DIFFERENCE_instance;
  var PathOp_entriesInitialized;
  function PathOp_initEntries() {
    if (PathOp_entriesInitialized)
      return Unit_instance;
    PathOp_entriesInitialized = true;
    PathOp_DIFFERENCE_instance = new PathOp('DIFFERENCE', 0);
    PathOp_INTERSECT_instance = new PathOp('INTERSECT', 1);
    PathOp_UNION_instance = new PathOp('UNION', 2);
    PathOp_XOR_instance = new PathOp('XOR', 3);
    PathOp_REVERSE_DIFFERENCE_instance = new PathOp('REVERSE_DIFFERENCE', 4);
  }
  function PathOp(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PathOp_DIFFERENCE_getInstance() {
    PathOp_initEntries();
    return PathOp_DIFFERENCE_instance;
  }
  function PathOp_INTERSECT_getInstance() {
    PathOp_initEntries();
    return PathOp_INTERSECT_instance;
  }
  function PathOp_UNION_getInstance() {
    PathOp_initEntries();
    return PathOp_UNION_instance;
  }
  function PathOp_XOR_getInstance() {
    PathOp_initEntries();
    return PathOp_XOR_instance;
  }
  function PathOp_REVERSE_DIFFERENCE_getInstance() {
    PathOp_initEntries();
    return PathOp_REVERSE_DIFFERENCE_instance;
  }
  function PathSegment_init_$Init$(verbOrdinal, x0, y0, isClosedContour, $this) {
    PathSegment.call($this, values_2()[verbOrdinal], new Point(x0, y0), null, null, null, 0.0, false, isClosedContour);
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(verbOrdinal === PathVerb_MOVE_getInstance().t9_1 ? true : verbOrdinal === PathVerb_CLOSE_getInstance().t9_1)) {
      // Inline function 'org.jetbrains.skia.PathSegment.<init>.<anonymous>' call
      var message = 'Expected MOVE or CLOSE, got ' + values_2()[verbOrdinal];
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return $this;
  }
  function PathSegment_init_$Create$(verbOrdinal, x0, y0, isClosedContour) {
    return PathSegment_init_$Init$(verbOrdinal, x0, y0, isClosedContour, objectCreate(protoOf(PathSegment)));
  }
  function PathSegment_init_$Init$_0(x0, y0, x1, y1, isCloseLine, isClosedContour, $this) {
    PathSegment.call($this, PathVerb_LINE_getInstance(), new Point(x0, y0), new Point(x1, y1), null, null, 0.0, isCloseLine, isClosedContour);
    return $this;
  }
  function PathSegment_init_$Create$_0(x0, y0, x1, y1, isCloseLine, isClosedContour) {
    return PathSegment_init_$Init$_0(x0, y0, x1, y1, isCloseLine, isClosedContour, objectCreate(protoOf(PathSegment)));
  }
  function PathSegment_init_$Init$_1(x0, y0, x1, y1, x2, y2, isClosedContour, $this) {
    PathSegment.call($this, PathVerb_QUAD_getInstance(), new Point(x0, y0), new Point(x1, y1), new Point(x2, y2), null, 0.0, false, isClosedContour);
    return $this;
  }
  function PathSegment_init_$Create$_1(x0, y0, x1, y1, x2, y2, isClosedContour) {
    return PathSegment_init_$Init$_1(x0, y0, x1, y1, x2, y2, isClosedContour, objectCreate(protoOf(PathSegment)));
  }
  function PathSegment_init_$Init$_2(x0, y0, x1, y1, x2, y2, conicWeight, isClosedContour, $this) {
    PathSegment.call($this, PathVerb_CONIC_getInstance(), new Point(x0, y0), new Point(x1, y1), new Point(x2, y2), null, conicWeight, false, isClosedContour);
    return $this;
  }
  function PathSegment_init_$Create$_2(x0, y0, x1, y1, x2, y2, conicWeight, isClosedContour) {
    return PathSegment_init_$Init$_2(x0, y0, x1, y1, x2, y2, conicWeight, isClosedContour, objectCreate(protoOf(PathSegment)));
  }
  function PathSegment_init_$Init$_3(x0, y0, x1, y1, x2, y2, x3, y3, isClosedContour, $this) {
    PathSegment.call($this, PathVerb_CUBIC_getInstance(), new Point(x0, y0), new Point(x1, y1), new Point(x2, y2), new Point(x3, y3), 0.0, false, isClosedContour);
    return $this;
  }
  function PathSegment_init_$Create$_3(x0, y0, x1, y1, x2, y2, x3, y3, isClosedContour) {
    return PathSegment_init_$Init$_3(x0, y0, x1, y1, x2, y2, x3, y3, isClosedContour, objectCreate(protoOf(PathSegment)));
  }
  function PathSegment(verb, p0, p1, p2, p3, conicWeight, isCloseLine, isClosedContour) {
    verb = verb === VOID ? PathVerb_DONE_getInstance() : verb;
    p0 = p0 === VOID ? null : p0;
    p1 = p1 === VOID ? null : p1;
    p2 = p2 === VOID ? null : p2;
    p3 = p3 === VOID ? null : p3;
    conicWeight = conicWeight === VOID ? 0.0 : conicWeight;
    isCloseLine = isCloseLine === VOID ? false : isCloseLine;
    isClosedContour = isClosedContour === VOID ? false : isClosedContour;
    this.l3f_1 = verb;
    this.m3f_1 = p0;
    this.n3f_1 = p1;
    this.o3f_1 = p2;
    this.p3f_1 = p3;
    this.q3f_1 = conicWeight;
    this.r3f_1 = isCloseLine;
    this.s3f_1 = isClosedContour;
  }
  protoOf(PathSegment).toString = function () {
    return 'Segment(verb=' + this.l3f_1 + (!this.l3f_1.equals(PathVerb_DONE_getInstance()) ? ', p0=' + this.m3f_1 : '') + ((((this.l3f_1.equals(PathVerb_LINE_getInstance()) ? true : this.l3f_1.equals(PathVerb_QUAD_getInstance())) ? true : this.l3f_1.equals(PathVerb_CONIC_getInstance())) ? true : this.l3f_1.equals(PathVerb_CUBIC_getInstance())) ? ', p1=' + this.n3f_1 : '') + (((this.l3f_1.equals(PathVerb_QUAD_getInstance()) ? true : this.l3f_1.equals(PathVerb_CONIC_getInstance())) ? true : this.l3f_1.equals(PathVerb_CUBIC_getInstance())) ? ', p2=' + this.o3f_1 : '') + (this.l3f_1.equals(PathVerb_CUBIC_getInstance()) ? ', p3=' + this.p3f_1 : '') + (this.l3f_1.equals(PathVerb_CONIC_getInstance()) ? ', conicWeight=' + this.q3f_1 : '') + (this.l3f_1.equals(PathVerb_LINE_getInstance()) ? ', closeLine=' + this.r3f_1 : '') + (!this.l3f_1.equals(PathVerb_DONE_getInstance()) ? ', closedContour=' + this.s3f_1 : '') + ')';
  };
  protoOf(PathSegment).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PathSegment))
      return false;
    return ((((((this.l3f_1.equals(other.l3f_1) ? !this.l3f_1.equals(PathVerb_DONE_getInstance()) ? equals(this.m3f_1, other.m3f_1) : true : false) ? (((this.l3f_1.equals(PathVerb_LINE_getInstance()) ? true : this.l3f_1.equals(PathVerb_QUAD_getInstance())) ? true : this.l3f_1.equals(PathVerb_CONIC_getInstance())) ? true : this.l3f_1.equals(PathVerb_CUBIC_getInstance())) ? equals(this.n3f_1, other.n3f_1) : true : false) ? ((this.l3f_1.equals(PathVerb_QUAD_getInstance()) ? true : this.l3f_1.equals(PathVerb_CONIC_getInstance())) ? true : this.l3f_1.equals(PathVerb_CUBIC_getInstance())) ? equals(this.o3f_1, other.o3f_1) : true : false) ? this.l3f_1.equals(PathVerb_CUBIC_getInstance()) ? equals(this.p3f_1, other.p3f_1) : true : false) ? this.l3f_1.equals(PathVerb_CONIC_getInstance()) ? compareTo(other.q3f_1, this.q3f_1) === 0 : true : false) ? this.l3f_1.equals(PathVerb_LINE_getInstance()) ? this.r3f_1 === other.r3f_1 : true : false) ? !this.l3f_1.equals(PathVerb_DONE_getInstance()) ? this.s3f_1 === other.s3f_1 : true : false;
  };
  protoOf(PathSegment).hashCode = function () {
    var tmp;
    switch (this.l3f_1.t9_1) {
      case 6:
        tmp = objectHashes([this.l3f_1]);
        break;
      case 0:
        tmp = objectHashes([this.l3f_1, this.m3f_1, this.s3f_1]);
        break;
      case 1:
        tmp = objectHashes([this.l3f_1, this.m3f_1, this.n3f_1, this.r3f_1, this.s3f_1]);
        break;
      case 2:
        tmp = objectHashes([this.l3f_1, this.m3f_1, this.n3f_1, this.o3f_1, this.s3f_1]);
        break;
      case 3:
        tmp = objectHashes([this.l3f_1, this.m3f_1, this.n3f_1, this.o3f_1, this.q3f_1, this.s3f_1]);
        break;
      case 4:
        tmp = objectHashes([this.l3f_1, this.m3f_1, this.n3f_1, this.o3f_1, this.p3f_1, this.s3f_1]);
        break;
      default:
        throw RuntimeException_init_$Create$('Unreachable');
    }
    return tmp;
  };
  function objectHashes(args) {
    return contentHashCode_0(args);
  }
  function Companion_19() {
    Companion_instance_19 = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion_19).k3f = function (path, forceClose) {
    var tmp;
    try {
      var i = new PathSegmentIterator(path, org_jetbrains_skia_PathSegmentIterator__1nMake(getPtr(path), forceClose));
      i.w3f_1 = nextSegment(i);
      tmp = i;
    }finally {
      reachabilityBarrier(path);
    }
    return tmp;
  };
  var Companion_instance_19;
  function Companion_getInstance_20() {
    if (Companion_instance_19 == null)
      new Companion_19();
    return Companion_instance_19;
  }
  function nextSegment($this) {
    // Inline function 'org.jetbrains.skia.impl.withResult' call
    var result = new Int32Array(10);
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.impl.withResult.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var handle = $this$interopScope.s3d(result);
        // Inline function 'org.jetbrains.skia.PathSegmentIterator.nextSegment.<anonymous>' call
        org_jetbrains_skia_PathSegmentIterator__1nNext($this.o37_1, handle);
        $this$interopScope.u38(handle, result);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return pathSegmentFromIntArray(result);
  }
  function PathSegmentIterator(_path, ptr) {
    Companion_getInstance_20();
    Managed.call(this, ptr, org_jetbrains_skia_PathSegmentIterator__1nGetFinalizer());
    this.v3f_1 = _path;
    this.w3f_1 = null;
    Stats_instance.l37();
  }
  protoOf(PathSegmentIterator).f1 = function () {
    var tmp;
    try {
      var tmp0_safe_receiver = this.w3f_1;
      if (equals(tmp0_safe_receiver == null ? null : tmp0_safe_receiver.l3f_1, PathVerb_DONE_getInstance()))
        throw NoSuchElementException_init_$Create$();
      var res = this.w3f_1;
      this.w3f_1 = nextSegment(this);
      tmp = res;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(PathSegmentIterator).d1 = function () {
    var tmp0_safe_receiver = this.w3f_1;
    return !equals(tmp0_safe_receiver == null ? null : tmp0_safe_receiver.l3f_1, PathVerb_DONE_getInstance());
  };
  protoOf(PathSegmentIterator).e1 = function () {
    // Inline function 'kotlin.TODO' call
    var reason = 'Not yet implemented';
    throw new NotImplementedError('An operation is not implemented: ' + reason);
  };
  function pathSegmentFromIntArray(points) {
    var context = last(points);
    var verb = context & 7;
    var isClosedBit = context >> 7 & 1;
    var isClosedLineBit = context >> 6 & 1;
    var isClosed = !(isClosedBit === 0);
    var tmp;
    switch (values_2()[verb].t9_1) {
      case 0:
      case 5:
        // Inline function 'kotlin.fromBits' call

        var bits = points[0];
        var tmp_0 = floatFromBits(bits);
        // Inline function 'kotlin.fromBits' call

        var bits_0 = points[1];
        var tmp$ret$1 = floatFromBits(bits_0);
        tmp = PathSegment_init_$Create$(verb, tmp_0, tmp$ret$1, isClosed);
        break;
      case 1:
        // Inline function 'kotlin.fromBits' call

        var bits_1 = points[0];
        var tmp_1 = floatFromBits(bits_1);
        // Inline function 'kotlin.fromBits' call

        var bits_2 = points[1];
        var tmp_2 = floatFromBits(bits_2);
        // Inline function 'kotlin.fromBits' call

        var bits_3 = points[2];
        var tmp_3 = floatFromBits(bits_3);
        // Inline function 'kotlin.fromBits' call

        var bits_4 = points[3];
        var tmp$ret$5 = floatFromBits(bits_4);
        tmp = PathSegment_init_$Create$_0(tmp_1, tmp_2, tmp_3, tmp$ret$5, !(isClosedLineBit === 0), isClosed);
        break;
      case 2:
        // Inline function 'kotlin.fromBits' call

        var bits_5 = points[0];
        var tmp_4 = floatFromBits(bits_5);
        // Inline function 'kotlin.fromBits' call

        var bits_6 = points[1];
        var tmp_5 = floatFromBits(bits_6);
        // Inline function 'kotlin.fromBits' call

        var bits_7 = points[2];
        var tmp_6 = floatFromBits(bits_7);
        // Inline function 'kotlin.fromBits' call

        var bits_8 = points[3];
        var tmp_7 = floatFromBits(bits_8);
        // Inline function 'kotlin.fromBits' call

        var bits_9 = points[4];
        var tmp_8 = floatFromBits(bits_9);
        // Inline function 'kotlin.fromBits' call

        var bits_10 = points[5];
        var tmp$ret$11 = floatFromBits(bits_10);
        tmp = PathSegment_init_$Create$_1(tmp_4, tmp_5, tmp_6, tmp_7, tmp_8, tmp$ret$11, isClosed);
        break;
      case 3:
        // Inline function 'kotlin.fromBits' call

        var bits_11 = points[0];
        var tmp_9 = floatFromBits(bits_11);
        // Inline function 'kotlin.fromBits' call

        var bits_12 = points[1];
        var tmp_10 = floatFromBits(bits_12);
        // Inline function 'kotlin.fromBits' call

        var bits_13 = points[2];
        var tmp_11 = floatFromBits(bits_13);
        // Inline function 'kotlin.fromBits' call

        var bits_14 = points[3];
        var tmp_12 = floatFromBits(bits_14);
        // Inline function 'kotlin.fromBits' call

        var bits_15 = points[4];
        var tmp_13 = floatFromBits(bits_15);
        // Inline function 'kotlin.fromBits' call

        var bits_16 = points[5];
        var tmp_14 = floatFromBits(bits_16);
        // Inline function 'kotlin.fromBits' call

        var bits_17 = points[8];
        var tmp$ret$18 = floatFromBits(bits_17);
        tmp = PathSegment_init_$Create$_2(tmp_9, tmp_10, tmp_11, tmp_12, tmp_13, tmp_14, tmp$ret$18, isClosed);
        break;
      case 4:
        // Inline function 'kotlin.fromBits' call

        var bits_18 = points[0];
        var tmp_15 = floatFromBits(bits_18);
        // Inline function 'kotlin.fromBits' call

        var bits_19 = points[1];
        var tmp_16 = floatFromBits(bits_19);
        // Inline function 'kotlin.fromBits' call

        var bits_20 = points[2];
        var tmp_17 = floatFromBits(bits_20);
        // Inline function 'kotlin.fromBits' call

        var bits_21 = points[3];
        var tmp_18 = floatFromBits(bits_21);
        // Inline function 'kotlin.fromBits' call

        var bits_22 = points[4];
        var tmp_19 = floatFromBits(bits_22);
        // Inline function 'kotlin.fromBits' call

        var bits_23 = points[5];
        var tmp_20 = floatFromBits(bits_23);
        // Inline function 'kotlin.fromBits' call

        var bits_24 = points[6];
        var tmp_21 = floatFromBits(bits_24);
        // Inline function 'kotlin.fromBits' call

        var bits_25 = points[7];
        var tmp$ret$26 = floatFromBits(bits_25);
        tmp = PathSegment_init_$Create$_3(tmp_15, tmp_16, tmp_17, tmp_18, tmp_19, tmp_20, tmp_21, tmp$ret$26, isClosed);
        break;
      case 6:
        tmp = new PathSegment();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  var PathVerb_MOVE_instance;
  var PathVerb_LINE_instance;
  var PathVerb_QUAD_instance;
  var PathVerb_CONIC_instance;
  var PathVerb_CUBIC_instance;
  var PathVerb_CLOSE_instance;
  var PathVerb_DONE_instance;
  function values_2() {
    return [PathVerb_MOVE_getInstance(), PathVerb_LINE_getInstance(), PathVerb_QUAD_getInstance(), PathVerb_CONIC_getInstance(), PathVerb_CUBIC_getInstance(), PathVerb_CLOSE_getInstance(), PathVerb_DONE_getInstance()];
  }
  var PathVerb_entriesInitialized;
  function PathVerb_initEntries() {
    if (PathVerb_entriesInitialized)
      return Unit_instance;
    PathVerb_entriesInitialized = true;
    PathVerb_MOVE_instance = new PathVerb('MOVE', 0);
    PathVerb_LINE_instance = new PathVerb('LINE', 1);
    PathVerb_QUAD_instance = new PathVerb('QUAD', 2);
    PathVerb_CONIC_instance = new PathVerb('CONIC', 3);
    PathVerb_CUBIC_instance = new PathVerb('CUBIC', 4);
    PathVerb_CLOSE_instance = new PathVerb('CLOSE', 5);
    PathVerb_DONE_instance = new PathVerb('DONE', 6);
  }
  function PathVerb(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PathVerb_MOVE_getInstance() {
    PathVerb_initEntries();
    return PathVerb_MOVE_instance;
  }
  function PathVerb_LINE_getInstance() {
    PathVerb_initEntries();
    return PathVerb_LINE_instance;
  }
  function PathVerb_QUAD_getInstance() {
    PathVerb_initEntries();
    return PathVerb_QUAD_instance;
  }
  function PathVerb_CONIC_getInstance() {
    PathVerb_initEntries();
    return PathVerb_CONIC_instance;
  }
  function PathVerb_CUBIC_getInstance() {
    PathVerb_initEntries();
    return PathVerb_CUBIC_instance;
  }
  function PathVerb_CLOSE_getInstance() {
    PathVerb_initEntries();
    return PathVerb_CLOSE_instance;
  }
  function PathVerb_DONE_getInstance() {
    PathVerb_initEntries();
    return PathVerb_DONE_instance;
  }
  function Companion_20() {
    Companion_instance_20 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_20;
  function Companion_getInstance_21() {
    if (Companion_instance_20 == null)
      new Companion_20();
    return Companion_instance_20;
  }
  function Picture(ptr) {
    Companion_getInstance_21();
    RefCnt_init_$Init$(ptr, this);
  }
  function Companion_21() {
    Companion_instance_21 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_21;
  function Companion_getInstance_22() {
    if (Companion_instance_21 == null)
      new Companion_21();
    return Companion_instance_21;
  }
  function PictureRecorder_init_$Init$($this) {
    PictureRecorder.call($this, org_jetbrains_skia_PictureRecorder__1nMake());
    Stats_instance.l37();
    return $this;
  }
  function PictureRecorder_init_$Create$() {
    return PictureRecorder_init_$Init$(objectCreate(protoOf(PictureRecorder)));
  }
  function _FinalizerHolder_9() {
    _FinalizerHolder_instance_9 = this;
    this.x3f_1 = org_jetbrains_skia_PictureRecorder__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_9;
  function _FinalizerHolder_getInstance_9() {
    if (_FinalizerHolder_instance_9 == null)
      new _FinalizerHolder_9();
    return _FinalizerHolder_instance_9;
  }
  function PictureRecorder(ptr) {
    Companion_getInstance_22();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_9().x3f_1);
  }
  protoOf(PictureRecorder).a3g = function (bounds, bbh) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = new Canvas(org_jetbrains_skia_PictureRecorder__1nBeginRecording(this.o37_1, bounds.b39_1, bounds.c39_1, bounds.d39_1, bounds.e39_1, getPtr(bbh)), false, this);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(PictureRecorder).b3g = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = new Picture(org_jetbrains_skia_PictureRecorder__1nFinishRecordingAsPicture(this.o37_1));
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  var PixelGeometry_UNKNOWN_instance;
  var PixelGeometry_RGB_H_instance;
  var PixelGeometry_BGR_H_instance;
  var PixelGeometry_RGB_V_instance;
  var PixelGeometry_BGR_V_instance;
  var PixelGeometry_entriesInitialized;
  function PixelGeometry_initEntries() {
    if (PixelGeometry_entriesInitialized)
      return Unit_instance;
    PixelGeometry_entriesInitialized = true;
    PixelGeometry_UNKNOWN_instance = new PixelGeometry('UNKNOWN', 0);
    PixelGeometry_RGB_H_instance = new PixelGeometry('RGB_H', 1);
    PixelGeometry_BGR_H_instance = new PixelGeometry('BGR_H', 2);
    PixelGeometry_RGB_V_instance = new PixelGeometry('RGB_V', 3);
    PixelGeometry_BGR_V_instance = new PixelGeometry('BGR_V', 4);
  }
  function PixelGeometry(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PixelGeometry_UNKNOWN_getInstance() {
    PixelGeometry_initEntries();
    return PixelGeometry_UNKNOWN_instance;
  }
  function Companion_22() {
    Companion_instance_22 = this;
    this.c3g_1 = new Point(0.0, 0.0);
  }
  var Companion_instance_22;
  function Companion_getInstance_23() {
    if (Companion_instance_22 == null)
      new Companion_22();
    return Companion_instance_22;
  }
  function Point(x, y) {
    Companion_getInstance_23();
    this.d3g_1 = x;
    this.e3g_1 = y;
  }
  protoOf(Point).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof Point))
      return false;
    if (!(compareTo(this.d3g_1, other.d3g_1) === 0))
      return false;
    return compareTo(this.e3g_1, other.e3g_1) === 0;
  };
  protoOf(Point).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + toBits(this.d3g_1) | 0;
    result = imul(result, PRIME) + toBits(this.e3g_1) | 0;
    return result;
  };
  protoOf(Point).toString = function () {
    return 'Point(_x=' + this.d3g_1 + ', _y=' + this.e3g_1 + ')';
  };
  function Point3(x, y, z) {
    this.f3g_1 = x;
    this.g3g_1 = y;
    this.h3g_1 = z;
  }
  protoOf(Point3).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof Point3))
      return false;
    if (!(compareTo(this.f3g_1, other.f3g_1) === 0))
      return false;
    if (!(compareTo(this.g3g_1, other.g3g_1) === 0))
      return false;
    return compareTo(this.h3g_1, other.h3g_1) === 0;
  };
  protoOf(Point3).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + toBits(this.f3g_1) | 0;
    result = imul(result, PRIME) + toBits(this.g3g_1) | 0;
    result = imul(result, PRIME) + toBits(this.h3g_1) | 0;
    return result;
  };
  protoOf(Point3).toString = function () {
    return 'Point3(_x=' + this.f3g_1 + ', _y=' + this.g3g_1 + ', _z=' + this.h3g_1 + ')';
  };
  function Companion_23() {
  }
  protoOf(Companion_23).i3g = function (l, t, r, b, xRad, yRad) {
    // Inline function 'kotlin.floatArrayOf' call
    var tmp$ret$0 = new Float32Array([xRad, yRad]);
    return new RRect(l, t, r, b, tmp$ret$0);
  };
  protoOf(Companion_23).j3g = function (l, t, r, b, radii) {
    return new RRect(l, t, r, b, radii);
  };
  var Companion_instance_23;
  function Companion_getInstance_24() {
    return Companion_instance_23;
  }
  function RRect(l, t, r, b, radii) {
    Rect.call(this, l, t, r, b);
    this.l39_1 = radii;
  }
  protoOf(RRect).toString = function () {
    return 'RRect(_left=' + this.b39_1 + ', _top=' + this.c39_1 + ', _right=' + this.d39_1 + ', _bottom=' + this.e39_1 + ', _radii=' + joinToString(this.l39_1) + ')';
  };
  protoOf(RRect).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof RRect))
      return false;
    if (!protoOf(Rect).equals.call(this, other))
      return false;
    var tmp;
    if (this.l39_1.length === other.l39_1.length) {
      tmp = contentEquals(this.l39_1, other.l39_1);
    } else {
      tmp = contentEquals(normalizeRadii(this.l39_1), normalizeRadii(other.l39_1));
    }
    return tmp;
  };
  protoOf(RRect).hashCode = function () {
    var PRIME = 59;
    var result = protoOf(Rect).hashCode.call(this);
    result = imul(result, PRIME) + contentHashCode(this.l39_1) | 0;
    return result;
  };
  function normalizeRadii(radii) {
    var tmp;
    switch (radii.length) {
      case 0:
        var tmp_0 = 0;
        var tmp_1 = new Float32Array(8);
        while (tmp_0 < 8) {
          tmp_1[tmp_0] = 0.0;
          tmp_0 = tmp_0 + 1 | 0;
        }

        tmp = tmp_1;
        break;
      case 1:
        var tmp_2 = 0;
        var tmp_3 = new Float32Array(8);
        while (tmp_2 < 8) {
          tmp_3[tmp_2] = radii[0];
          tmp_2 = tmp_2 + 1 | 0;
        }

        tmp = tmp_3;
        break;
      case 2:
        var tmp_4 = 0;
        var tmp_5 = new Float32Array(8);
        while (tmp_4 < 8) {
          var tmp_6 = tmp_4;
          tmp_5[tmp_6] = radii[tmp_6 % 2 | 0];
          tmp_4 = tmp_4 + 1 | 0;
        }

        tmp = tmp_5;
        break;
      case 4:
        var tmp_7 = 0;
        var tmp_8 = new Float32Array(8);
        while (tmp_7 < 8) {
          var tmp_9 = tmp_7;
          tmp_8[tmp_9] = radii[tmp_9 / 2 | 0];
          tmp_7 = tmp_7 + 1 | 0;
        }

        tmp = tmp_8;
        break;
      case 8:
        tmp = radii;
        break;
      default:
        throw Error_init_$Create$('illegal radii array');
    }
    return tmp;
  }
  function Companion_24() {
  }
  protoOf(Companion_24).k3g = function (l, t, r, b) {
    return new Rect(l, t, r, b);
  };
  var Companion_instance_24;
  function Companion_getInstance_25() {
    return Companion_instance_24;
  }
  function Rect(left, top, right, bottom) {
    this.b39_1 = left;
    this.c39_1 = top;
    this.d39_1 = right;
    this.e39_1 = bottom;
  }
  protoOf(Rect).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof Rect))
      return false;
    if (!(compareTo(this.b39_1, other.b39_1) === 0))
      return false;
    if (!(compareTo(this.c39_1, other.c39_1) === 0))
      return false;
    if (!(compareTo(this.d39_1, other.d39_1) === 0))
      return false;
    return compareTo(this.e39_1, other.e39_1) === 0;
  };
  protoOf(Rect).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + toBits(this.b39_1) | 0;
    result = imul(result, PRIME) + toBits(this.c39_1) | 0;
    result = imul(result, PRIME) + toBits(this.d39_1) | 0;
    result = imul(result, PRIME) + toBits(this.e39_1) | 0;
    return result;
  };
  protoOf(Rect).toString = function () {
    return 'Rect(_left=' + this.b39_1 + ', _top=' + this.c39_1 + ', _right=' + this.d39_1 + ', _bottom=' + this.e39_1 + ')';
  };
  function ShadowUtils() {
    ShadowUtils_instance = this;
    Companion_instance_38.r37();
  }
  protoOf(ShadowUtils).l3g = function (canvas, path, zPlaneParams, lightPos, lightRadius, ambientColor, spotColor, transparentOccluder, geometricOnly) {
    Stats_instance.l37();
    var flags = 0;
    if (transparentOccluder)
      flags = flags | 1;
    if (geometricOnly)
      flags = flags | 2;
    try {
      org_jetbrains_skia_ShadowUtils__1nDrawShadow(getPtr(canvas), getPtr(path), zPlaneParams.f3g_1, zPlaneParams.g3g_1, zPlaneParams.h3g_1, lightPos.f3g_1, lightPos.g3g_1, lightPos.h3g_1, lightRadius, ambientColor, spotColor, flags);
    }finally {
      reachabilityBarrier(canvas);
      reachabilityBarrier(path);
    }
  };
  var ShadowUtils_instance;
  function ShadowUtils_getInstance() {
    if (ShadowUtils_instance == null)
      new ShadowUtils();
    return ShadowUtils_instance;
  }
  function ArrayDecoder(ptr, disposePtr) {
    this.m3g_1 = ptr;
    this.n3g_1 = disposePtr;
  }
  protoOf(ArrayDecoder).or = function () {
    org_jetbrains_skia_StdVectorDecoder__1nDisposeArray(this.m3g_1, this.n3g_1);
  };
  protoOf(ArrayDecoder).o3g = function (index) {
    return org_jetbrains_skia_StdVectorDecoder__1nReleaseElement(this.m3g_1, index);
  };
  protoOf(ArrayDecoder).m = function () {
    return org_jetbrains_skia_StdVectorDecoder__1nGetArraySize(this.m3g_1);
  };
  function Companion_25() {
    Companion_instance_25 = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion_25).p3g = function (context, rt, origin, colorFormat, colorSpace, surfaceProps) {
    var tmp;
    try {
      Stats_instance.l37();
      var tmp$ret$1;
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          // Inline function 'org.jetbrains.skia.Companion.makeFromBackendRenderTarget.<anonymous>' call
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          var tmp_0 = getPtr(context);
          var tmp_1 = getPtr(rt);
          var tmp_2 = getPtr(colorSpace);
          tmp$ret$1 = org_jetbrains_skia_Surface__1nMakeFromBackendRenderTarget(tmp_0, tmp_1, origin.t9_1, colorFormat.t9_1, tmp_2, $this$interopScope.t38(surfaceProps == null ? null : surfaceProps.s3g()));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      var ptr = tmp$ret$1;
      tmp = ptr === Companion_instance_39.t37() ? null : Surface_init_$Create$(ptr, context, rt);
    }finally {
      reachabilityBarrier(context);
      reachabilityBarrier(rt);
      reachabilityBarrier(colorSpace);
    }
    return tmp;
  };
  var Companion_instance_25;
  function Companion_getInstance_26() {
    if (Companion_instance_25 == null)
      new Companion_25();
    return Companion_instance_25;
  }
  function Surface_init_$Init$(ptr, context, renderTarget, $this) {
    RefCnt_init_$Init$(ptr, $this);
    Surface.call($this);
    $this.v3g_1 = context;
    $this.w3g_1 = renderTarget;
    return $this;
  }
  function Surface_init_$Create$(ptr, context, renderTarget) {
    return Surface_init_$Init$(ptr, context, renderTarget, objectCreate(protoOf(Surface)));
  }
  protoOf(Surface).x3g = function () {
    var tmp;
    try {
      Stats_instance.l37();
      var ptr = org_jetbrains_skia_Surface__1nGetCanvas(this.o37_1);
      var tmp_0;
      if (ptr === Companion_instance_39.t37()) {
        throw IllegalArgumentException_init_$Create$_0();
      } else {
        tmp_0 = new Canvas(ptr, false, this);
      }
      tmp = tmp_0;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Surface).y3g = function () {
    try {
      Stats_instance.l37();
      org_jetbrains_skia_Surface__1nFlushAndSubmit(this.o37_1, false);
    }finally {
      reachabilityBarrier(this);
    }
  };
  function Surface() {
    Companion_getInstance_26();
  }
  var SurfaceColorFormat_UNKNOWN_instance;
  var SurfaceColorFormat_ALPHA_8_instance;
  var SurfaceColorFormat_RGB_565_instance;
  var SurfaceColorFormat_ARGB_4444_instance;
  var SurfaceColorFormat_RGBA_8888_instance;
  var SurfaceColorFormat_RGB_888x_instance;
  var SurfaceColorFormat_BGRA_8888_instance;
  var SurfaceColorFormat_RGBA_1010102_instance;
  var SurfaceColorFormat_RGB_101010x_instance;
  var SurfaceColorFormat_GRAY_8_instance;
  var SurfaceColorFormat_RGBA_F16_NORM_instance;
  var SurfaceColorFormat_RGBA_F16_instance;
  var SurfaceColorFormat_RGBA_F32_instance;
  var SurfaceColorFormat_R8G8_UNORM_instance;
  var SurfaceColorFormat_A16_FLOAT_instance;
  var SurfaceColorFormat_R16G16_FLOAT_instance;
  var SurfaceColorFormat_A16_UNORM_instance;
  var SurfaceColorFormat_R16G16_UNORM_instance;
  var SurfaceColorFormat_R16G16B16A16_UNORM_instance;
  var SurfaceColorFormat_entriesInitialized;
  function SurfaceColorFormat_initEntries() {
    if (SurfaceColorFormat_entriesInitialized)
      return Unit_instance;
    SurfaceColorFormat_entriesInitialized = true;
    SurfaceColorFormat_UNKNOWN_instance = new SurfaceColorFormat('UNKNOWN', 0);
    SurfaceColorFormat_ALPHA_8_instance = new SurfaceColorFormat('ALPHA_8', 1);
    SurfaceColorFormat_RGB_565_instance = new SurfaceColorFormat('RGB_565', 2);
    SurfaceColorFormat_ARGB_4444_instance = new SurfaceColorFormat('ARGB_4444', 3);
    SurfaceColorFormat_RGBA_8888_instance = new SurfaceColorFormat('RGBA_8888', 4);
    SurfaceColorFormat_RGB_888x_instance = new SurfaceColorFormat('RGB_888x', 5);
    SurfaceColorFormat_BGRA_8888_instance = new SurfaceColorFormat('BGRA_8888', 6);
    SurfaceColorFormat_RGBA_1010102_instance = new SurfaceColorFormat('RGBA_1010102', 7);
    SurfaceColorFormat_RGB_101010x_instance = new SurfaceColorFormat('RGB_101010x', 8);
    SurfaceColorFormat_GRAY_8_instance = new SurfaceColorFormat('GRAY_8', 9);
    SurfaceColorFormat_RGBA_F16_NORM_instance = new SurfaceColorFormat('RGBA_F16_NORM', 10);
    SurfaceColorFormat_RGBA_F16_instance = new SurfaceColorFormat('RGBA_F16', 11);
    SurfaceColorFormat_RGBA_F32_instance = new SurfaceColorFormat('RGBA_F32', 12);
    SurfaceColorFormat_R8G8_UNORM_instance = new SurfaceColorFormat('R8G8_UNORM', 13);
    SurfaceColorFormat_A16_FLOAT_instance = new SurfaceColorFormat('A16_FLOAT', 14);
    SurfaceColorFormat_R16G16_FLOAT_instance = new SurfaceColorFormat('R16G16_FLOAT', 15);
    SurfaceColorFormat_A16_UNORM_instance = new SurfaceColorFormat('A16_UNORM', 16);
    SurfaceColorFormat_R16G16_UNORM_instance = new SurfaceColorFormat('R16G16_UNORM', 17);
    SurfaceColorFormat_R16G16B16A16_UNORM_instance = new SurfaceColorFormat('R16G16B16A16_UNORM', 18);
  }
  function SurfaceColorFormat(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function SurfaceColorFormat_RGBA_8888_getInstance() {
    SurfaceColorFormat_initEntries();
    return SurfaceColorFormat_RGBA_8888_instance;
  }
  var SurfaceOrigin_TOP_LEFT_instance;
  var SurfaceOrigin_BOTTOM_LEFT_instance;
  var SurfaceOrigin_entriesInitialized;
  function SurfaceOrigin_initEntries() {
    if (SurfaceOrigin_entriesInitialized)
      return Unit_instance;
    SurfaceOrigin_entriesInitialized = true;
    SurfaceOrigin_TOP_LEFT_instance = new SurfaceOrigin('TOP_LEFT', 0);
    SurfaceOrigin_BOTTOM_LEFT_instance = new SurfaceOrigin('BOTTOM_LEFT', 1);
  }
  function SurfaceOrigin(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function SurfaceOrigin_BOTTOM_LEFT_getInstance() {
    SurfaceOrigin_initEntries();
    return SurfaceOrigin_BOTTOM_LEFT_instance;
  }
  function _getPixelGeometryOrdinal($this) {
    return $this.r3g_1.t9_1;
  }
  function SurfaceProps(isDeviceIndependentFonts, pixelGeometry) {
    isDeviceIndependentFonts = isDeviceIndependentFonts === VOID ? false : isDeviceIndependentFonts;
    pixelGeometry = pixelGeometry === VOID ? PixelGeometry_UNKNOWN_getInstance() : pixelGeometry;
    this.q3g_1 = isDeviceIndependentFonts;
    this.r3g_1 = pixelGeometry;
  }
  protoOf(SurfaceProps).z3g = function () {
    return 0 | (this.q3g_1 ? 1 : 0);
  };
  protoOf(SurfaceProps).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof SurfaceProps))
      return false;
    if (!(this.q3g_1 === other.q3g_1))
      return false;
    return this.r3g_1.equals(other.r3g_1);
  };
  protoOf(SurfaceProps).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + (this.q3g_1 ? 79 : 97) | 0;
    result = imul(result, PRIME) + this.r3g_1.hashCode() | 0;
    return result;
  };
  protoOf(SurfaceProps).toString = function () {
    return 'SurfaceProps(_deviceIndependentFonts=' + this.q3g_1 + ', _pixelGeometry=' + this.r3g_1 + ')';
  };
  protoOf(SurfaceProps).s3g = function () {
    // Inline function 'kotlin.intArrayOf' call
    return new Int32Array([this.z3g(), _getPixelGeometryOrdinal(this)]);
  };
  function Companion_26() {
    Companion_instance_26 = this;
    Companion_instance_38.r37();
  }
  protoOf(Companion_26).a3h = function (name, style) {
    Stats_instance.l37();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.Companion.makeFromName.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        tmp$ret$1 = new Typeface(org_jetbrains_skia_Typeface__1nMakeFromName($this$interopScope.x37(name), style.o3c_1));
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(Companion_26).b3h = function (data, index) {
    var tmp;
    try {
      Stats_instance.l37();
      var ptr = org_jetbrains_skia_Typeface__1nMakeFromData(getPtr(data), index);
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!!(ptr === Companion_instance_39.t37())) {
        // Inline function 'org.jetbrains.skia.Companion.makeFromData.<anonymous>' call
        var message = 'Failed to create Typeface from data ' + data;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = new Typeface(ptr);
    }finally {
      reachabilityBarrier(data);
    }
    return tmp;
  };
  protoOf(Companion_26).c3h = function (data, index, $super) {
    index = index === VOID ? 0 : index;
    return $super === VOID ? this.b3h(data, index) : $super.b3h.call(this, data, index);
  };
  var Companion_instance_26;
  function Companion_getInstance_27() {
    if (Companion_instance_26 == null)
      new Companion_26();
    return Companion_instance_26;
  }
  function Typeface(ptr) {
    Companion_getInstance_27();
    RefCnt_init_$Init$(ptr, this);
  }
  protoOf(Typeface).f3h = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = FontStyle_init_$Create$_0(org_jetbrains_skia_Typeface__1nGetFontStyle(this.o37_1));
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Typeface).g3h = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_Typeface__1nGetUniqueId(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Typeface).p37 = function (other) {
    var tmp;
    try {
      tmp = org_jetbrains_skia_Typeface__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  protoOf(Typeface).h3h = function () {
    var tmp;
    try {
      Stats_instance.l37();
      // Inline function 'org.jetbrains.skia.impl.withStringResult' call
      // Inline function 'org.jetbrains.skia.impl.use' call
      // Inline function 'org.jetbrains.skia.Typeface.<get-familyName>.<anonymous>' call
      var tmp$ret$0 = org_jetbrains_skia_Typeface__1nGetFamilyName(this.o37_1);
      var this_0 = new ManagedString(tmp$ret$0);
      var tmp_0;
      try {
        // Inline function 'org.jetbrains.skia.impl.withStringResult.<anonymous>' call
        tmp_0 = this_0.toString();
      }finally {
        this_0.b1q();
      }
      tmp = tmp_0;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Typeface).toString = function () {
    return "Typeface(familyName='" + this.h3h() + "', fontStyle=" + this.f3h() + ', uniqueId=' + this.g3h() + ')';
  };
  function Companion_27() {
    Companion_instance_27 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_27;
  function Companion_getInstance_28() {
    if (Companion_instance_27 == null)
      new Companion_27();
    return Companion_instance_27;
  }
  function _FinalizerHolder_10() {
    _FinalizerHolder_instance_10 = this;
    this.i3h_1 = org_jetbrains_skia_U16String__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_10;
  function _FinalizerHolder_getInstance_10() {
    if (_FinalizerHolder_instance_10 == null)
      new _FinalizerHolder_10();
    return _FinalizerHolder_instance_10;
  }
  function U16String(ptr) {
    Companion_getInstance_28();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_10().i3h_1);
  }
  function CharDirection() {
    CharDirection_instance = this;
    Companion_instance_38.r37();
    this.j3h_1 = 0;
    this.k3h_1 = 1;
    this.l3h_1 = 2;
    this.m3h_1 = 3;
    this.n3h_1 = 4;
    this.o3h_1 = 5;
    this.p3h_1 = 6;
    this.q3h_1 = 7;
    this.r3h_1 = 8;
    this.s3h_1 = 9;
    this.t3h_1 = 10;
    this.u3h_1 = 11;
    this.v3h_1 = 12;
    this.w3h_1 = 13;
    this.x3h_1 = 14;
    this.y3h_1 = 15;
    this.z3h_1 = 16;
    this.a3i_1 = 17;
    this.b3i_1 = 18;
    this.c3i_1 = 19;
    this.d3i_1 = 20;
    this.e3i_1 = 21;
    this.f3i_1 = 22;
  }
  protoOf(CharDirection).g3i = function (codePoint) {
    return org_jetbrains_skia_icu_Unicode_charDirection(codePoint);
  };
  var CharDirection_instance;
  function CharDirection_getInstance() {
    if (CharDirection_instance == null)
      new CharDirection();
    return CharDirection_instance;
  }
  function getPtr(n) {
    var tmp1_elvis_lhs = n == null ? null : n.o37_1;
    return tmp1_elvis_lhs == null ? Companion_instance_39.t37() : tmp1_elvis_lhs;
  }
  var Alignment_LEFT_instance;
  var Alignment_RIGHT_instance;
  var Alignment_CENTER_instance;
  var Alignment_JUSTIFY_instance;
  var Alignment_START_instance;
  var Alignment_END_instance;
  var Alignment_entriesInitialized;
  function Alignment_initEntries() {
    if (Alignment_entriesInitialized)
      return Unit_instance;
    Alignment_entriesInitialized = true;
    Alignment_LEFT_instance = new Alignment('LEFT', 0);
    Alignment_RIGHT_instance = new Alignment('RIGHT', 1);
    Alignment_CENTER_instance = new Alignment('CENTER', 2);
    Alignment_JUSTIFY_instance = new Alignment('JUSTIFY', 3);
    Alignment_START_instance = new Alignment('START', 4);
    Alignment_END_instance = new Alignment('END', 5);
  }
  function Alignment(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Alignment_LEFT_getInstance() {
    Alignment_initEntries();
    return Alignment_LEFT_instance;
  }
  function Alignment_RIGHT_getInstance() {
    Alignment_initEntries();
    return Alignment_RIGHT_instance;
  }
  function Alignment_CENTER_getInstance() {
    Alignment_initEntries();
    return Alignment_CENTER_instance;
  }
  function Alignment_JUSTIFY_getInstance() {
    Alignment_initEntries();
    return Alignment_JUSTIFY_instance;
  }
  function Alignment_START_getInstance() {
    Alignment_initEntries();
    return Alignment_START_instance;
  }
  function Alignment_END_getInstance() {
    Alignment_initEntries();
    return Alignment_END_instance;
  }
  var BaselineMode_ALPHABETIC_instance;
  var BaselineMode_IDEOGRAPHIC_instance;
  var BaselineMode_entriesInitialized;
  function BaselineMode_initEntries() {
    if (BaselineMode_entriesInitialized)
      return Unit_instance;
    BaselineMode_entriesInitialized = true;
    BaselineMode_ALPHABETIC_instance = new BaselineMode('ALPHABETIC', 0);
    BaselineMode_IDEOGRAPHIC_instance = new BaselineMode('IDEOGRAPHIC', 1);
  }
  function BaselineMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function BaselineMode_ALPHABETIC_getInstance() {
    BaselineMode_initEntries();
    return BaselineMode_ALPHABETIC_instance;
  }
  var DecorationLineStyle_SOLID_instance;
  var DecorationLineStyle_DOUBLE_instance;
  var DecorationLineStyle_DOTTED_instance;
  var DecorationLineStyle_DASHED_instance;
  var DecorationLineStyle_WAVY_instance;
  var DecorationLineStyle_entriesInitialized;
  function DecorationLineStyle_initEntries() {
    if (DecorationLineStyle_entriesInitialized)
      return Unit_instance;
    DecorationLineStyle_entriesInitialized = true;
    DecorationLineStyle_SOLID_instance = new DecorationLineStyle('SOLID', 0);
    DecorationLineStyle_DOUBLE_instance = new DecorationLineStyle('DOUBLE', 1);
    DecorationLineStyle_DOTTED_instance = new DecorationLineStyle('DOTTED', 2);
    DecorationLineStyle_DASHED_instance = new DecorationLineStyle('DASHED', 3);
    DecorationLineStyle_WAVY_instance = new DecorationLineStyle('WAVY', 4);
  }
  function DecorationLineStyle(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function DecorationLineStyle_SOLID_getInstance() {
    DecorationLineStyle_initEntries();
    return DecorationLineStyle_SOLID_instance;
  }
  function DecorationLineStyle_DOUBLE_getInstance() {
    DecorationLineStyle_initEntries();
    return DecorationLineStyle_DOUBLE_instance;
  }
  function DecorationLineStyle_DOTTED_getInstance() {
    DecorationLineStyle_initEntries();
    return DecorationLineStyle_DOTTED_instance;
  }
  function DecorationLineStyle_DASHED_getInstance() {
    DecorationLineStyle_initEntries();
    return DecorationLineStyle_DASHED_instance;
  }
  function DecorationLineStyle_WAVY_getInstance() {
    DecorationLineStyle_initEntries();
    return DecorationLineStyle_WAVY_instance;
  }
  function Companion_28() {
    Companion_instance_28 = this;
    this.h3i_1 = new DecorationStyle(false, false, false, true, -16777216, DecorationLineStyle_SOLID_getInstance(), 1.0);
  }
  var Companion_instance_28;
  function Companion_getInstance_29() {
    if (Companion_instance_28 == null)
      new Companion_28();
    return Companion_instance_28;
  }
  function DecorationStyle(_underline, _overline, _lineThrough, _gaps, color, lineStyle, thicknessMultiplier) {
    Companion_getInstance_29();
    this.i3i_1 = _underline;
    this.j3i_1 = _overline;
    this.k3i_1 = _lineThrough;
    this.l3i_1 = _gaps;
    this.m3i_1 = color;
    this.n3i_1 = lineStyle;
    this.o3i_1 = thicknessMultiplier;
  }
  protoOf(DecorationStyle).p3i = function () {
    return this.n3i_1;
  };
  protoOf(DecorationStyle).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof DecorationStyle))
      return false;
    if (!(this.i3i_1 === other.i3i_1))
      return false;
    if (!(this.j3i_1 === other.j3i_1))
      return false;
    if (!(this.k3i_1 === other.k3i_1))
      return false;
    if (!(this.l3i_1 === other.l3i_1))
      return false;
    if (!(this.m3i_1 === other.m3i_1))
      return false;
    if (!(compareTo(this.o3i_1, other.o3i_1) === 0))
      return false;
    return this.p3i().equals(other.p3i());
  };
  protoOf(DecorationStyle).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + (this.i3i_1 ? 79 : 97) | 0;
    result = imul(result, PRIME) + (this.j3i_1 ? 79 : 97) | 0;
    result = imul(result, PRIME) + (this.k3i_1 ? 79 : 97) | 0;
    result = imul(result, PRIME) + (this.l3i_1 ? 79 : 97) | 0;
    result = imul(result, PRIME) + this.m3i_1 | 0;
    result = imul(result, PRIME) + toBits(this.o3i_1) | 0;
    result = imul(result, PRIME) + this.p3i().hashCode() | 0;
    return result;
  };
  protoOf(DecorationStyle).toString = function () {
    return 'DecorationStyle(_underline=' + this.i3i_1 + ', _overline=' + this.j3i_1 + ', _lineThrough=' + this.k3i_1 + ', _gaps=' + this.l3i_1 + ', _color=' + this.m3i_1 + ', _lineStyle=' + this.p3i() + ', _thicknessMultiplier=' + this.o3i_1 + ')';
  };
  var Direction_RTL_instance;
  var Direction_LTR_instance;
  function values_3() {
    return [Direction_RTL_getInstance(), Direction_LTR_getInstance()];
  }
  var Direction_entriesInitialized;
  function Direction_initEntries() {
    if (Direction_entriesInitialized)
      return Unit_instance;
    Direction_entriesInitialized = true;
    Direction_RTL_instance = new Direction('RTL', 0);
    Direction_LTR_instance = new Direction('LTR', 1);
  }
  function Direction(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Direction_RTL_getInstance() {
    Direction_initEntries();
    return Direction_RTL_instance;
  }
  function Direction_LTR_getInstance() {
    Direction_initEntries();
    return Direction_LTR_instance;
  }
  function Companion_29() {
    Companion_instance_29 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_29;
  function Companion_getInstance_30() {
    if (Companion_instance_29 == null)
      new Companion_29();
    return Companion_instance_29;
  }
  function FontCollection_init_$Init$($this) {
    FontCollection.call($this, org_jetbrains_skia_paragraph_FontCollection__1nMake());
    Stats_instance.l37();
    return $this;
  }
  function FontCollection_init_$Create$() {
    return FontCollection_init_$Init$(objectCreate(protoOf(FontCollection)));
  }
  function FontCollection(ptr) {
    Companion_getInstance_30();
    RefCnt_init_$Init$(ptr, this);
  }
  protoOf(FontCollection).s3i = function (fontMgr) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_FontCollection__1nSetAssetFontManager(this.o37_1, getPtr(fontMgr), Companion_instance_39.t37());
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(fontMgr);
    }
    return tmp;
  };
  protoOf(FontCollection).t3i = function (fontMgr) {
    return this.u3i(fontMgr, null);
  };
  protoOf(FontCollection).u3i = function (fontMgr, defaultFamilyName) {
    var tmp;
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_paragraph_FontCollection__1nSetDefaultFontManager(this.o37_1, getPtr(fontMgr), $this$interopScope.x37(defaultFamilyName));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(fontMgr);
    }
    return tmp;
  };
  protoOf(FontCollection).v3i = function (familyNames, style) {
    var tmp;
    try {
      Stats_instance.l37();
      // Inline function 'org.jetbrains.skia.arrayDecoderScope' call
      var arrayDecoder = null;
      var tmp_0;
      try {
        // Inline function 'org.jetbrains.skia.paragraph.FontCollection.findTypefaces.<anonymous>' call
        var tmp$ret$1;
        $l$block: {
          // Inline function 'org.jetbrains.skia.impl.interopScope' call
          try {
            var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
            _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
            // Inline function 'org.jetbrains.skia.paragraph.FontCollection.findTypefaces.<anonymous>.<anonymous>' call
            var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
            var tmp_1 = this.o37_1;
            var tmp_2 = $this$interopScope.w3i(familyNames);
            var tmp1_elvis_lhs = familyNames == null ? null : familyNames.length;
            tmp$ret$1 = org_jetbrains_skia_paragraph_FontCollection__1nFindTypefaces(tmp_1, tmp_2, tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs, style.o3c_1);
            break $l$block;
          }finally {
            var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
            _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
            if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
              _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
            }
          }
        }
        arrayDecoder = new ArrayDecoder(tmp$ret$1, org_jetbrains_skia_impl_RefCnt__getFinalizer());
        // Inline function 'org.jetbrains.skia.paragraph.FontCollection.findTypefaces.<anonymous>' call
        var arrayDecoder_0 = arrayDecoder;
        // Inline function 'kotlin.collections.toTypedArray' call
        // Inline function 'kotlin.collections.map' call
        var this_0 = until(0, arrayDecoder_0.m());
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
        var tmp0_iterator = this_0.o();
        while (tmp0_iterator.d1()) {
          var item = tmp0_iterator.f1();
          // Inline function 'org.jetbrains.skia.paragraph.FontCollection.findTypefaces.<anonymous>.<anonymous>' call
          var tmp$ret$3 = new Typeface(arrayDecoder_0.o3g(item));
          destination.a1(tmp$ret$3);
        }
        tmp_0 = copyToArray(destination);
      }finally {
        var tmp0_safe_receiver = arrayDecoder;
        if (tmp0_safe_receiver == null)
          null;
        else {
          tmp0_safe_receiver.or();
        }
      }
      tmp = tmp_0;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  function FontRastrSettings(edging, hinting, subpixel) {
    this.x3i_1 = edging;
    this.y3i_1 = hinting;
    this.z3i_1 = subpixel;
  }
  protoOf(FontRastrSettings).toString = function () {
    return 'FontRastrSettings(edging=' + this.x3i_1 + ', hinting=' + this.y3i_1 + ', subpixel=' + this.z3i_1 + ')';
  };
  protoOf(FontRastrSettings).hashCode = function () {
    var result = this.x3i_1.hashCode();
    result = imul(result, 31) + this.y3i_1.hashCode() | 0;
    result = imul(result, 31) + getBooleanHashCode(this.z3i_1) | 0;
    return result;
  };
  protoOf(FontRastrSettings).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontRastrSettings))
      return false;
    var tmp0_other_with_cast = other instanceof FontRastrSettings ? other : THROW_CCE();
    if (!this.x3i_1.equals(tmp0_other_with_cast.x3i_1))
      return false;
    if (!this.y3i_1.equals(tmp0_other_with_cast.y3i_1))
      return false;
    if (!(this.z3i_1 === tmp0_other_with_cast.z3i_1))
      return false;
    return true;
  };
  var HeightMode_ALL_instance;
  var HeightMode_DISABLE_FIRST_ASCENT_instance;
  var HeightMode_DISABLE_LAST_DESCENT_instance;
  var HeightMode_DISABLE_ALL_instance;
  var HeightMode_entriesInitialized;
  function HeightMode_initEntries() {
    if (HeightMode_entriesInitialized)
      return Unit_instance;
    HeightMode_entriesInitialized = true;
    HeightMode_ALL_instance = new HeightMode('ALL', 0);
    HeightMode_DISABLE_FIRST_ASCENT_instance = new HeightMode('DISABLE_FIRST_ASCENT', 1);
    HeightMode_DISABLE_LAST_DESCENT_instance = new HeightMode('DISABLE_LAST_DESCENT', 2);
    HeightMode_DISABLE_ALL_instance = new HeightMode('DISABLE_ALL', 3);
  }
  function HeightMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function HeightMode_ALL_getInstance() {
    HeightMode_initEntries();
    return HeightMode_ALL_instance;
  }
  function HeightMode_DISABLE_FIRST_ASCENT_getInstance() {
    HeightMode_initEntries();
    return HeightMode_DISABLE_FIRST_ASCENT_instance;
  }
  function HeightMode_DISABLE_LAST_DESCENT_getInstance() {
    HeightMode_initEntries();
    return HeightMode_DISABLE_LAST_DESCENT_instance;
  }
  function HeightMode_DISABLE_ALL_getInstance() {
    HeightMode_initEntries();
    return HeightMode_DISABLE_ALL_instance;
  }
  function Companion_30() {
  }
  protoOf(Companion_30).a3j = function (array) {
    return org_jetbrains_skia_paragraph_LineMetrics__1nGetArraySize(array);
  };
  protoOf(Companion_30).b3j = function (array) {
    return org_jetbrains_skia_paragraph_LineMetrics__1nDisposeArray(array);
  };
  protoOf(Companion_30).c3j = function (array, index) {
    var intArray = new Int32Array(6);
    var doubleArray = new Float64Array(7);
    // Inline function 'org.jetbrains.skia.impl.withResult' call
    $l$block_0: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        // Inline function 'org.jetbrains.skia.impl.withResult.<anonymous>' call
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var handle = $this$interopScope.s3d(intArray);
        // Inline function 'org.jetbrains.skia.paragraph.Companion.getArrayElement.<anonymous>' call
        // Inline function 'org.jetbrains.skia.impl.withResult' call
        $l$block: {
          // Inline function 'org.jetbrains.skia.impl.interopScope' call
          try {
            var tmp0_0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
            _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0_0 + 1 | 0);
            // Inline function 'org.jetbrains.skia.impl.withResult.<anonymous>' call
            var $this$interopScope_0 = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
            var handle_0 = $this$interopScope_0.d3j(doubleArray);
            // Inline function 'org.jetbrains.skia.paragraph.Companion.getArrayElement.<anonymous>.<anonymous>' call
            org_jetbrains_skia_paragraph_LineMetrics__1nGetArrayElement(array, index, handle, handle_0);
            $this$interopScope_0.e3j(handle_0, doubleArray);
            break $l$block;
          }finally {
            var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
            _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
            if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
              _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
            }
          }
        }
        $this$interopScope.u38(handle, intArray);
        break $l$block_0;
      }finally {
        var tmp1_0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1_0 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return new LineMetrics(intArray[0], intArray[1], intArray[2], intArray[3], !(intArray[4] === 0), doubleArray[0], doubleArray[1], doubleArray[2], doubleArray[3], doubleArray[4], doubleArray[5], doubleArray[6], intArray[5]);
  };
  var Companion_instance_30;
  function Companion_getInstance_31() {
    return Companion_instance_30;
  }
  function LineMetrics(startIndex, endIndex, endExcludingWhitespaces, endIncludingNewline, isHardBreak, ascent, descent, unscaledAscent, height, width, left, baseline, lineNumber) {
    this.f3j_1 = startIndex;
    this.g3j_1 = endIndex;
    this.h3j_1 = endExcludingWhitespaces;
    this.i3j_1 = endIncludingNewline;
    this.j3j_1 = isHardBreak;
    this.k3j_1 = ascent;
    this.l3j_1 = descent;
    this.m3j_1 = unscaledAscent;
    this.n3j_1 = height;
    this.o3j_1 = width;
    this.p3j_1 = left;
    this.q3j_1 = baseline;
    this.r3j_1 = lineNumber;
  }
  protoOf(LineMetrics).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof LineMetrics))
      return false;
    if (!(this.f3j_1 === other.f3j_1))
      return false;
    if (!(this.g3j_1 === other.g3j_1))
      return false;
    if (!(this.h3j_1 === other.h3j_1))
      return false;
    if (!(this.i3j_1 === other.i3j_1))
      return false;
    if (!(this.j3j_1 === other.j3j_1))
      return false;
    if (!(compareTo(this.k3j_1, other.k3j_1) === 0))
      return false;
    if (!(compareTo(this.l3j_1, other.l3j_1) === 0))
      return false;
    if (!(compareTo(this.m3j_1, other.m3j_1) === 0))
      return false;
    if (!(compareTo(this.n3j_1, other.n3j_1) === 0))
      return false;
    if (!(compareTo(this.o3j_1, other.o3j_1) === 0))
      return false;
    if (!(compareTo(this.p3j_1, other.p3j_1) === 0))
      return false;
    if (!(compareTo(this.q3j_1, other.q3j_1) === 0))
      return false;
    return this.r3j_1 === other.r3j_1;
  };
  protoOf(LineMetrics).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + this.f3j_1 | 0;
    result = imul(result, PRIME) + this.g3j_1 | 0;
    result = imul(result, PRIME) + this.h3j_1 | 0;
    result = imul(result, PRIME) + this.i3j_1 | 0;
    result = imul(result, PRIME) + (this.j3j_1 ? 79 : 97) | 0;
    result = imul(result, PRIME) + toBits_0(this.k3j_1).ea() | 0;
    result = imul(result, PRIME) + toBits_0(this.l3j_1).ea() | 0;
    result = imul(result, PRIME) + toBits_0(this.m3j_1).ea() | 0;
    result = imul(result, PRIME) + toBits_0(this.n3j_1).ea() | 0;
    result = imul(result, PRIME) + toBits_0(this.o3j_1).ea() | 0;
    result = imul(result, PRIME) + toBits_0(this.p3j_1).ea() | 0;
    result = imul(result, PRIME) + toBits_0(this.q3j_1).ea() | 0;
    result = imul(result, PRIME) + this.r3j_1 | 0;
    return result;
  };
  protoOf(LineMetrics).toString = function () {
    return 'LineMetrics(_startIndex=' + this.f3j_1 + ', _endIndex=' + this.g3j_1 + ', _endExcludingWhitespaces=' + this.h3j_1 + ', _endIncludingNewline=' + this.i3j_1 + ', _hardBreak=' + this.j3j_1 + ', _ascent=' + this.k3j_1 + ', _descent=' + this.l3j_1 + ', _unscaledAscent=' + this.m3j_1 + ', _height=' + this.n3j_1 + ', _width=' + this.o3j_1 + ', _left=' + this.p3j_1 + ', _baseline=' + this.q3j_1 + ', _lineNumber=' + this.r3j_1 + ')';
  };
  function Companion_31() {
    Companion_instance_31 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_31;
  function Companion_getInstance_32() {
    if (Companion_instance_31 == null)
      new Companion_31();
    return Companion_instance_31;
  }
  function _FinalizerHolder_11() {
    _FinalizerHolder_instance_11 = this;
    this.s3j_1 = org_jetbrains_skia_paragraph_Paragraph__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_11;
  function _FinalizerHolder_getInstance_11() {
    if (_FinalizerHolder_instance_11 == null)
      new _FinalizerHolder_11();
    return _FinalizerHolder_instance_11;
  }
  function Paragraph$getWordBoundary$lambda(this$0, $offset) {
    return function ($this$fromInteropPointer, it) {
      org_jetbrains_skia_paragraph_Paragraph__1nGetWordBoundary(this$0.o37_1, $offset, it);
      return Unit_instance;
    };
  }
  function Paragraph(ptr, text) {
    Companion_getInstance_32();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_11().s3j_1);
    Stats_instance.l37();
    this.v3j_1 = text;
  }
  protoOf(Paragraph).b1q = function () {
    if (!(this.v3j_1 == null)) {
      ensureNotNull(this.v3j_1).b1q();
      this.v3j_1 = null;
    }
    protoOf(Managed).b1q.call(this);
  };
  protoOf(Paragraph).f34 = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_Paragraph__1nGetHeight(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).w3j = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_Paragraph__1nGetMinIntrinsicWidth(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).x3j = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_Paragraph__1nGetMaxIntrinsicWidth(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).y3j = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_Paragraph__1nGetAlphabeticBaseline(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).z3j = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_Paragraph__1nDidExceedMaxLines(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).a3k = function (width) {
    Stats_instance.l37();
    org_jetbrains_skia_paragraph_Paragraph__1nLayout(this.o37_1, width);
    return this;
  };
  protoOf(Paragraph).b3k = function (canvas, x, y) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_Paragraph__1nPaint(this.o37_1, getPtr(canvas), x, y);
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(canvas);
    }
    return tmp;
  };
  protoOf(Paragraph).c3k = function (start, end, rectHeightMode, rectWidthMode) {
    var tmp;
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          // Inline function 'org.jetbrains.skia.paragraph.Paragraph.getRectsForRange.<anonymous>' call
          // Inline function 'org.jetbrains.skia.impl.InteropScope.fromInterop' call
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          var this_0 = org_jetbrains_skia_paragraph_Paragraph__1nGetRectsForRange(this.o37_1, start, end, rectHeightMode.t9_1, rectWidthMode.t9_1);
          var size = Companion_instance_35.a3j(this_0);
          var tmp_0 = 0;
          // Inline function 'kotlin.arrayOfNulls' call
          var tmp_1 = fillArrayVal(Array(size), null);
          while (tmp_0 < size) {
            var tmp_2 = tmp_0;
            tmp_1[tmp_2] = Companion_instance_35.c3j(this_0, tmp_2);
            tmp_0 = tmp_0 + 1 | 0;
          }
          var result = tmp_1;
          Companion_instance_35.b3j(this_0);
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = result;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).d3k = function () {
    var tmp;
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          // Inline function 'org.jetbrains.skia.paragraph.Paragraph.<get-rectsForPlaceholders>.<anonymous>' call
          // Inline function 'org.jetbrains.skia.impl.InteropScope.fromInterop' call
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          var this_0 = org_jetbrains_skia_paragraph_Paragraph__1nGetRectsForPlaceholders(this.o37_1);
          var size = Companion_instance_35.a3j(this_0);
          var tmp_0 = 0;
          // Inline function 'kotlin.arrayOfNulls' call
          var tmp_1 = fillArrayVal(Array(size), null);
          while (tmp_0 < size) {
            var tmp_2 = tmp_0;
            tmp_1[tmp_2] = Companion_instance_35.c3j(this_0, tmp_2);
            tmp_0 = tmp_0 + 1 | 0;
          }
          var result = tmp_1;
          Companion_instance_35.b3j(this_0);
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = result;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).e3k = function (offset) {
    var tmp;
    try {
      Stats_instance.l37();
      var tmp_0 = Companion_instance_13;
      tmp = fromInteropPointer_0(tmp_0, Paragraph$getWordBoundary$lambda(this, offset));
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(Paragraph).f3k = function () {
    var tmp;
    try {
      var tmp_0;
      if (this.v3j_1 == null) {
        // Inline function 'kotlin.arrayOf' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = [];
      } else {
        Stats_instance.l37();
        $l$block: {
          // Inline function 'org.jetbrains.skia.impl.interopScope' call
          try {
            var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
            _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
            // Inline function 'org.jetbrains.skia.paragraph.Paragraph.<get-lineMetrics>.<anonymous>' call
            // Inline function 'org.jetbrains.skia.impl.InteropScope.fromInterop' call
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
            var this_0 = org_jetbrains_skia_paragraph_Paragraph__1nGetLineMetrics(this.o37_1, getPtr(this.v3j_1));
            var size = Companion_instance_30.a3j(this_0);
            var tmp_1 = 0;
            // Inline function 'kotlin.arrayOfNulls' call
            var tmp_2 = fillArrayVal(Array(size), null);
            while (tmp_1 < size) {
              var tmp_3 = tmp_1;
              tmp_2[tmp_3] = Companion_instance_30.c3j(this_0, tmp_3);
              tmp_1 = tmp_1 + 1 | 0;
            }
            var result = tmp_2;
            Companion_instance_30.b3j(this_0);
            break $l$block;
          }finally {
            var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
            _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
            if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
              _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
            }
          }
        }
        tmp_0 = result;
      }
      tmp = tmp_0;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(this.v3j_1);
    }
    return tmp;
  };
  protoOf(Paragraph).g3k = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_Paragraph__1nGetLineNumber(this.o37_1);
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  function Companion_32() {
    Companion_instance_32 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_32;
  function Companion_getInstance_33() {
    if (Companion_instance_32 == null)
      new Companion_32();
    return Companion_instance_32;
  }
  function _FinalizerHolder_12() {
    _FinalizerHolder_instance_12 = this;
    this.h3k_1 = org_jetbrains_skia_paragraph_ParagraphBuilder__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_12;
  function _FinalizerHolder_getInstance_12() {
    if (_FinalizerHolder_instance_12 == null)
      new _FinalizerHolder_12();
    return _FinalizerHolder_instance_12;
  }
  function ParagraphBuilder(style, fc) {
    Companion_getInstance_33();
    Managed.call(this, makeParagraphBuilder(style, fc), _FinalizerHolder_getInstance_12().h3k_1);
    this.k3k_1 = null;
  }
  protoOf(ParagraphBuilder).l3k = function (style) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphBuilder__1nPushStyle(this.o37_1, getPtr(style));
      tmp = this;
    }finally {
      reachabilityBarrier(style);
    }
    return tmp;
  };
  protoOf(ParagraphBuilder).m3k = function (text) {
    Stats_instance.l37();
    try {
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_paragraph_ParagraphBuilder__1nAddText(this.o37_1, $this$interopScope.x37(text));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
    }finally {
      reachabilityBarrier(this);
    }
    if (this.k3k_1 == null)
      this.k3k_1 = ManagedString_init_$Create$(text);
    else {
      ensureNotNull(this.k3k_1).y3d(text);
    }
    return this;
  };
  protoOf(ParagraphBuilder).n3k = function (style) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isNaN_0(style.o3k_1)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isNaN_0(style.p3k_1)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message_0 = 'Check failed.';
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isNaN_0(style.s3k_1)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message_1 = 'Check failed.';
      throw IllegalStateException_init_$Create$(toString(message_1));
    }
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphBuilder__1nAddPlaceholder(this.o37_1, style.o3k_1, style.p3k_1, style.t3k().t9_1, style.u3k().t9_1, style.s3k_1);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(ParagraphBuilder).n1r = function () {
    var tmp;
    try {
      Stats_instance.l37();
      var paragraph = new Paragraph(org_jetbrains_skia_paragraph_ParagraphBuilder__1nBuild(this.o37_1), this.k3k_1);
      this.k3k_1 = null;
      tmp = paragraph;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  function makeParagraphBuilder(style, fc) {
    Stats_instance.l37();
    var tmp;
    try {
      tmp = org_jetbrains_skia_paragraph_ParagraphBuilder__1nMake(getPtr(style), getPtr(fc));
    }finally {
      reachabilityBarrier(style);
      reachabilityBarrier(fc);
    }
    return tmp;
  }
  function Companion_33() {
    Companion_instance_33 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_33;
  function Companion_getInstance_34() {
    if (Companion_instance_33 == null)
      new Companion_33();
    return Companion_instance_33;
  }
  function _FinalizerHolder_13() {
    _FinalizerHolder_instance_13 = this;
    this.v3k_1 = org_jetbrains_skia_paragraph_ParagraphStyle__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_13;
  function _FinalizerHolder_getInstance_13() {
    if (_FinalizerHolder_instance_13 == null)
      new _FinalizerHolder_13();
    return _FinalizerHolder_instance_13;
  }
  function ParagraphStyle() {
    Companion_getInstance_34();
    Managed.call(this, org_jetbrains_skia_paragraph_ParagraphStyle__1nMake(), _FinalizerHolder_getInstance_13().v3k_1);
    Stats_instance.l37();
  }
  protoOf(ParagraphStyle).p37 = function (other) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_ParagraphStyle__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).y3k = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetTextStyle(this.o37_1, getPtr(value));
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(value);
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).z3k = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetDirection(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).a3l = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetAlignment(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).b3l = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetMaxLinesCount(this.o37_1, value);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).c3l = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_paragraph_ParagraphStyle__1nSetEllipsis(this.o37_1, $this$interopScope.x37(value));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).d3l = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetHeightMode(this.o37_1, value.t9_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).e3l = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetFontRastrSettings(this.o37_1, value.x3i_1.t9_1, value.y3i_1.t9_1, value.z3i_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(ParagraphStyle).f3l = function (value) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_ParagraphStyle__1nSetTextIndent(this.o37_1, value.g3l_1, value.h3l_1);
      tmp = Unit_instance;
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  var PlaceholderAlignment_BASELINE_instance;
  var PlaceholderAlignment_ABOVE_BASELINE_instance;
  var PlaceholderAlignment_BELOW_BASELINE_instance;
  var PlaceholderAlignment_TOP_instance;
  var PlaceholderAlignment_BOTTOM_instance;
  var PlaceholderAlignment_MIDDLE_instance;
  var PlaceholderAlignment_entriesInitialized;
  function PlaceholderAlignment_initEntries() {
    if (PlaceholderAlignment_entriesInitialized)
      return Unit_instance;
    PlaceholderAlignment_entriesInitialized = true;
    PlaceholderAlignment_BASELINE_instance = new PlaceholderAlignment('BASELINE', 0);
    PlaceholderAlignment_ABOVE_BASELINE_instance = new PlaceholderAlignment('ABOVE_BASELINE', 1);
    PlaceholderAlignment_BELOW_BASELINE_instance = new PlaceholderAlignment('BELOW_BASELINE', 2);
    PlaceholderAlignment_TOP_instance = new PlaceholderAlignment('TOP', 3);
    PlaceholderAlignment_BOTTOM_instance = new PlaceholderAlignment('BOTTOM', 4);
    PlaceholderAlignment_MIDDLE_instance = new PlaceholderAlignment('MIDDLE', 5);
  }
  function PlaceholderAlignment(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function PlaceholderAlignment_ABOVE_BASELINE_getInstance() {
    PlaceholderAlignment_initEntries();
    return PlaceholderAlignment_ABOVE_BASELINE_instance;
  }
  function PlaceholderAlignment_TOP_getInstance() {
    PlaceholderAlignment_initEntries();
    return PlaceholderAlignment_TOP_instance;
  }
  function PlaceholderAlignment_BOTTOM_getInstance() {
    PlaceholderAlignment_initEntries();
    return PlaceholderAlignment_BOTTOM_instance;
  }
  function PlaceholderAlignment_MIDDLE_getInstance() {
    PlaceholderAlignment_initEntries();
    return PlaceholderAlignment_MIDDLE_instance;
  }
  function PlaceholderStyle(width, height, alignment, baselineMode, baseline) {
    this.o3k_1 = width;
    this.p3k_1 = height;
    this.q3k_1 = alignment;
    this.r3k_1 = baselineMode;
    this.s3k_1 = baseline;
  }
  protoOf(PlaceholderStyle).t3k = function () {
    return this.q3k_1;
  };
  protoOf(PlaceholderStyle).u3k = function () {
    return this.r3k_1;
  };
  protoOf(PlaceholderStyle).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof PlaceholderStyle))
      return false;
    if (!(compareTo(this.o3k_1, other.o3k_1) === 0))
      return false;
    if (!(compareTo(this.p3k_1, other.p3k_1) === 0))
      return false;
    if (!(compareTo(this.s3k_1, other.s3k_1) === 0))
      return false;
    if (!this.t3k().equals(other.t3k()))
      return false;
    return this.u3k().equals(other.u3k());
  };
  protoOf(PlaceholderStyle).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + toBits(this.o3k_1) | 0;
    result = imul(result, PRIME) + toBits(this.p3k_1) | 0;
    result = imul(result, PRIME) + toBits(this.s3k_1) | 0;
    result = imul(result, PRIME) + this.t3k().hashCode() | 0;
    result = imul(result, PRIME) + this.u3k().hashCode() | 0;
    return result;
  };
  protoOf(PlaceholderStyle).toString = function () {
    return 'PlaceholderStyle(_width=' + this.o3k_1 + ', _height=' + this.p3k_1 + ', _alignment=' + this.t3k() + ', _baselineMode=' + this.u3k() + ', _baseline=' + this.s3k_1 + ')';
  };
  var RectHeightMode_TIGHT_instance;
  var RectHeightMode_MAX_instance;
  var RectHeightMode_INCLUDE_LINE_SPACING_MIDDLE_instance;
  var RectHeightMode_INCLUDE_LINE_SPACING_TOP_instance;
  var RectHeightMode_INCLUDE_LINE_SPACING_BOTTOM_instance;
  var RectHeightMode_STRUT_instance;
  var RectHeightMode_entriesInitialized;
  function RectHeightMode_initEntries() {
    if (RectHeightMode_entriesInitialized)
      return Unit_instance;
    RectHeightMode_entriesInitialized = true;
    RectHeightMode_TIGHT_instance = new RectHeightMode('TIGHT', 0);
    RectHeightMode_MAX_instance = new RectHeightMode('MAX', 1);
    RectHeightMode_INCLUDE_LINE_SPACING_MIDDLE_instance = new RectHeightMode('INCLUDE_LINE_SPACING_MIDDLE', 2);
    RectHeightMode_INCLUDE_LINE_SPACING_TOP_instance = new RectHeightMode('INCLUDE_LINE_SPACING_TOP', 3);
    RectHeightMode_INCLUDE_LINE_SPACING_BOTTOM_instance = new RectHeightMode('INCLUDE_LINE_SPACING_BOTTOM', 4);
    RectHeightMode_STRUT_instance = new RectHeightMode('STRUT', 5);
  }
  function RectHeightMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function RectHeightMode_MAX_getInstance() {
    RectHeightMode_initEntries();
    return RectHeightMode_MAX_instance;
  }
  function RectHeightMode_STRUT_getInstance() {
    RectHeightMode_initEntries();
    return RectHeightMode_STRUT_instance;
  }
  var RectWidthMode_TIGHT_instance;
  var RectWidthMode_MAX_instance;
  var RectWidthMode_entriesInitialized;
  function RectWidthMode_initEntries() {
    if (RectWidthMode_entriesInitialized)
      return Unit_instance;
    RectWidthMode_entriesInitialized = true;
    RectWidthMode_TIGHT_instance = new RectWidthMode('TIGHT', 0);
    RectWidthMode_MAX_instance = new RectWidthMode('MAX', 1);
  }
  function RectWidthMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function RectWidthMode_TIGHT_getInstance() {
    RectWidthMode_initEntries();
    return RectWidthMode_TIGHT_instance;
  }
  function Companion_34() {
  }
  var Companion_instance_34;
  function Companion_getInstance_35() {
    return Companion_instance_34;
  }
  function Shadow(color, offsetX, offsetY, blurSigma) {
    this.i3l_1 = color;
    this.j3l_1 = offsetX;
    this.k3l_1 = offsetY;
    this.l3l_1 = blurSigma;
  }
  protoOf(Shadow).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof Shadow))
      return false;
    if (!(this.i3l_1 === other.i3l_1))
      return false;
    if (!(compareTo(this.j3l_1, other.j3l_1) === 0))
      return false;
    if (!(compareTo(this.k3l_1, other.k3l_1) === 0))
      return false;
    return compareTo(this.l3l_1, other.l3l_1) === 0;
  };
  protoOf(Shadow).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + this.i3l_1 | 0;
    result = imul(result, PRIME) + toBits(this.j3l_1) | 0;
    result = imul(result, PRIME) + toBits(this.k3l_1) | 0;
    var blurSigma = toBits_0(this.l3l_1);
    result = imul(result, PRIME) + blurSigma.mb(32).pb(blurSigma).ea() | 0;
    return result;
  };
  protoOf(Shadow).toString = function () {
    return 'Shadow(_color=' + this.i3l_1 + ', _offsetX=' + this.j3l_1 + ', _offsetY=' + this.k3l_1 + ', _blurSigma=' + this.l3l_1 + ')';
  };
  function TextBox_init_$Init$(l, t, r, b, direction, $this) {
    TextBox.call($this, Companion_instance_24.k3g(l, t, r, b), values_3()[direction]);
    return $this;
  }
  function TextBox_init_$Create$(l, t, r, b, direction) {
    return TextBox_init_$Init$(l, t, r, b, direction, objectCreate(protoOf(TextBox)));
  }
  function Companion_35() {
  }
  protoOf(Companion_35).c3j = function (array, index) {
    var rect = new Float32Array(4);
    var direction = new Int32Array(1);
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var rectPtr = $this$interopScope.m39(rect);
        var directionPtr = $this$interopScope.t38(direction);
        org_jetbrains_skia_paragraph_TextBox__1nGetArrayElement(array, index, rectPtr, directionPtr);
        $this$interopScope.m3c(rectPtr, rect);
        $this$interopScope.u38(directionPtr, direction);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return TextBox_init_$Create$(rect[0], rect[1], rect[2], rect[3], direction[0]);
  };
  protoOf(Companion_35).a3j = function (array) {
    return org_jetbrains_skia_paragraph_TextBox__1nGetArraySize(array);
  };
  protoOf(Companion_35).b3j = function (array) {
    return org_jetbrains_skia_paragraph_TextBox__1nDisposeArray(array);
  };
  var Companion_instance_35;
  function Companion_getInstance_36() {
    return Companion_instance_35;
  }
  function TextBox(rect, direction) {
    this.m3l_1 = rect;
    this.n3l_1 = direction;
  }
  protoOf(TextBox).o3l = function () {
    return this.n3l_1;
  };
  protoOf(TextBox).equals = function (other) {
    if (other === this)
      return true;
    if (!(other instanceof TextBox))
      return false;
    if (!this.m3l_1.equals(other.m3l_1))
      return false;
    return this.o3l().equals(other.o3l());
  };
  protoOf(TextBox).hashCode = function () {
    var PRIME = 59;
    var result = 1;
    result = imul(result, PRIME) + this.m3l_1.hashCode() | 0;
    result = imul(result, PRIME) + this.o3l().hashCode() | 0;
    return result;
  };
  protoOf(TextBox).toString = function () {
    return 'TextBox(_rect=' + this.m3l_1 + ', _direction=' + this.o3l() + ')';
  };
  function TextIndent(firstLine, restLine) {
    firstLine = firstLine === VOID ? 0.0 : firstLine;
    restLine = restLine === VOID ? 0.0 : restLine;
    this.g3l_1 = firstLine;
    this.h3l_1 = restLine;
  }
  protoOf(TextIndent).toString = function () {
    return 'TextIndent(firstLine=' + this.g3l_1 + ', restLine=' + this.h3l_1 + ')';
  };
  protoOf(TextIndent).hashCode = function () {
    var result = getNumberHashCode(this.g3l_1);
    result = imul(result, 31) + getNumberHashCode(this.h3l_1) | 0;
    return result;
  };
  protoOf(TextIndent).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextIndent))
      return false;
    var tmp0_other_with_cast = other instanceof TextIndent ? other : THROW_CCE();
    if (!equals(this.g3l_1, tmp0_other_with_cast.g3l_1))
      return false;
    if (!equals(this.h3l_1, tmp0_other_with_cast.h3l_1))
      return false;
    return true;
  };
  function Companion_36() {
    Companion_instance_36 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_36;
  function Companion_getInstance_37() {
    if (Companion_instance_36 == null)
      new Companion_36();
    return Companion_instance_36;
  }
  function TextStyle_init_$Init$($this) {
    TextStyle.call($this, org_jetbrains_skia_paragraph_TextStyle__1nMake());
    Stats_instance.l37();
    return $this;
  }
  function TextStyle_init_$Create$() {
    return TextStyle_init_$Init$(objectCreate(protoOf(TextStyle)));
  }
  function _FinalizerHolder_14() {
    _FinalizerHolder_instance_14 = this;
    this.p3l_1 = org_jetbrains_skia_paragraph_TextStyle__1nGetFinalizer();
  }
  var _FinalizerHolder_instance_14;
  function _FinalizerHolder_getInstance_14() {
    if (_FinalizerHolder_instance_14 == null)
      new _FinalizerHolder_14();
    return _FinalizerHolder_instance_14;
  }
  function TextStyle$_get_fontMetrics_$lambda_9osnwy(this$0) {
    return function ($this$fromInteropPointer, it) {
      org_jetbrains_skia_paragraph_TextStyle__1nGetFontMetrics(this$0.o37_1, it);
      return Unit_instance;
    };
  }
  function TextStyle(ptr) {
    Companion_getInstance_37();
    Managed.call(this, ptr, _FinalizerHolder_getInstance_14().p3l_1);
  }
  protoOf(TextStyle).p37 = function (other) {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = org_jetbrains_skia_paragraph_TextStyle__1nEquals(this.o37_1, getPtr(other));
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(other);
    }
    return tmp;
  };
  protoOf(TextStyle).g3e = function (value) {
    this.s3l(value);
  };
  protoOf(TextStyle).s3l = function (color) {
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetColor(this.o37_1, color);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).t3l = function (value) {
    this.u3l(value);
  };
  protoOf(TextStyle).u3l = function (paint) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetForeground(this.o37_1, getPtr(paint));
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(paint);
    }
    return tmp;
  };
  protoOf(TextStyle).v3l = function (value) {
    this.w3l(value);
  };
  protoOf(TextStyle).w3l = function (paint) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetBackground(this.o37_1, getPtr(paint));
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(paint);
    }
    return tmp;
  };
  protoOf(TextStyle).x3l = function (value) {
    this.y3l(value);
  };
  protoOf(TextStyle).y3l = function (d) {
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetDecorationStyle(this.o37_1, d.i3i_1, d.j3i_1, d.k3i_1, d.l3i_1, d.m3i_1, d.n3i_1.t9_1, d.o3i_1);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).z3l = function (value) {
    this.a3m(value);
  };
  protoOf(TextStyle).f3h = function () {
    var tmp;
    try {
      Stats_instance.l37();
      tmp = FontStyle_init_$Create$_0(org_jetbrains_skia_paragraph_TextStyle__1nGetFontStyle(this.o37_1));
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  protoOf(TextStyle).a3m = function (s) {
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetFontStyle(this.o37_1, s.o3c_1);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).b3m = function (s) {
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nAddShadow(this.o37_1, s.i3l_1, s.j3l_1, s.k3l_1, s.l3l_1);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).c3m = function (f) {
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_paragraph_TextStyle__1nAddFontFeature(this.o37_1, $this$interopScope.x37(f.u3b()), f.r3b_1);
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).d3m = function (FontFeatures) {
    var inductionVariable = 0;
    var last = FontFeatures.length;
    while (inductionVariable < last) {
      var s = FontFeatures[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      this.c3m(s);
    }
    return this;
  };
  protoOf(TextStyle).e3m = function (value) {
    this.f3m(value);
  };
  protoOf(TextStyle).f3m = function (size) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isNaN_0(size)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetFontSize(this.o37_1, size);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).g3m = function (value) {
    this.h3m(value);
  };
  protoOf(TextStyle).h3m = function (families) {
    Stats_instance.l37();
    $l$block: {
      // Inline function 'org.jetbrains.skia.impl.interopScope' call
      try {
        var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
        var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
        var tmp = this.o37_1;
        var tmp_0 = $this$interopScope.w3i(families);
        var tmp1_elvis_lhs = families == null ? null : families.length;
        org_jetbrains_skia_paragraph_TextStyle__1nSetFontFamilies(tmp, tmp_0, tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs);
        break $l$block;
      }finally {
        var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
        _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
        if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
          _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
        }
      }
    }
    return this;
  };
  protoOf(TextStyle).i3m = function (value) {
    this.j3m(value);
  };
  protoOf(TextStyle).j3m = function (height) {
    if (height == null) {
      try {
        Stats_instance.l37();
        org_jetbrains_skia_paragraph_TextStyle__1nSetHeight(this.o37_1, false, 0.0);
      }finally {
        reachabilityBarrier(this);
      }
    } else {
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!!isNaN_0(height)) {
        // Inline function 'kotlin.check.<anonymous>' call
        var message = 'Check failed.';
        throw IllegalStateException_init_$Create$(toString(message));
      }
      try {
        Stats_instance.l37();
        org_jetbrains_skia_paragraph_TextStyle__1nSetHeight(this.o37_1, true, height);
      }finally {
        reachabilityBarrier(this);
      }
    }
    return this;
  };
  protoOf(TextStyle).k3m = function (value) {
    this.l3m(value);
  };
  protoOf(TextStyle).l3m = function (letterSpacing) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isNaN_0(letterSpacing)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetLetterSpacing(this.o37_1, letterSpacing);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).m3m = function (value) {
    this.n3m(value);
  };
  protoOf(TextStyle).n3m = function (baselineShift) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isNaN_0(baselineShift)) {
      // Inline function 'kotlin.check.<anonymous>' call
      var message = 'Check failed.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetBaselineShift(this.o37_1, baselineShift);
    }finally {
      reachabilityBarrier(this);
    }
    return this;
  };
  protoOf(TextStyle).o3m = function (value) {
    this.p3m(value);
  };
  protoOf(TextStyle).p3m = function (typeface) {
    var tmp;
    try {
      Stats_instance.l37();
      org_jetbrains_skia_paragraph_TextStyle__1nSetTypeface(this.o37_1, getPtr(typeface));
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(typeface);
    }
    return tmp;
  };
  protoOf(TextStyle).q3m = function () {
    var tmp;
    try {
      Stats_instance.l37();
      var tmp_0 = Companion_instance_7;
      tmp = fromInteropPointer(tmp_0, TextStyle$_get_fontMetrics_$lambda_9osnwy(this));
    }finally {
      reachabilityBarrier(this);
    }
    return tmp;
  };
  function Companion_37() {
    Companion_instance_37 = this;
    Companion_instance_38.r37();
  }
  var Companion_instance_37;
  function Companion_getInstance_38() {
    if (Companion_instance_37 == null)
      new Companion_37();
    return Companion_instance_37;
  }
  function TypefaceFontProvider() {
    Companion_getInstance_38();
    FontMgr_init_$Init$(org_jetbrains_skia_paragraph_TypefaceFontProvider__1nMake(), this);
    Stats_instance.l37();
  }
  protoOf(TypefaceFontProvider).t3m = function (typeface, alias) {
    var tmp;
    try {
      Stats_instance.l37();
      $l$block: {
        // Inline function 'org.jetbrains.skia.impl.interopScope' call
        try {
          var tmp0 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp0 + 1 | 0);
          var $this$interopScope = _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi();
          org_jetbrains_skia_paragraph_TypefaceFontProvider__1nRegisterTypeface(this.o37_1, getPtr(typeface), $this$interopScope.x37(alias));
          break $l$block;
        }finally {
          var tmp1 = _get_interopScopeCounter_$accessor$14q3g08_y31ph7();
          _set_interopScopeCounter_$accessor$14q3g08_7yblxt(tmp1 - 1 | 0);
          if (_get_interopScopeCounter_$accessor$14q3g08_y31ph7() === 0) {
            _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi().gu();
          }
        }
      }
      tmp = this;
    }finally {
      reachabilityBarrier(this);
      reachabilityBarrier(typeface);
    }
    return tmp;
  };
  var GraphicsApi_UNKNOWN_instance;
  var GraphicsApi_SOFTWARE_FAST_instance;
  var GraphicsApi_SOFTWARE_COMPAT_instance;
  var GraphicsApi_OPENGL_instance;
  var GraphicsApi_DIRECT3D_instance;
  var GraphicsApi_VULKAN_instance;
  var GraphicsApi_METAL_instance;
  var GraphicsApi_WEBGL_instance;
  var GraphicsApi_entriesInitialized;
  function GraphicsApi_initEntries() {
    if (GraphicsApi_entriesInitialized)
      return Unit_instance;
    GraphicsApi_entriesInitialized = true;
    GraphicsApi_UNKNOWN_instance = new GraphicsApi('UNKNOWN', 0);
    GraphicsApi_SOFTWARE_FAST_instance = new GraphicsApi('SOFTWARE_FAST', 1);
    GraphicsApi_SOFTWARE_COMPAT_instance = new GraphicsApi('SOFTWARE_COMPAT', 2);
    GraphicsApi_OPENGL_instance = new GraphicsApi('OPENGL', 3);
    GraphicsApi_DIRECT3D_instance = new GraphicsApi('DIRECT3D', 4);
    GraphicsApi_VULKAN_instance = new GraphicsApi('VULKAN', 5);
    GraphicsApi_METAL_instance = new GraphicsApi('METAL', 6);
    GraphicsApi_WEBGL_instance = new GraphicsApi('WEBGL', 7);
  }
  function GraphicsApi(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function GraphicsApi_WEBGL_getInstance() {
    GraphicsApi_initEntries();
    return GraphicsApi_WEBGL_instance;
  }
  var OS_Android_instance;
  var OS_Linux_instance;
  var OS_Windows_instance;
  var OS_MacOS_instance;
  var OS_Ios_instance;
  var OS_JS_instance;
  var OS_Unknown_instance;
  var OS_entriesInitialized;
  function OS_initEntries() {
    if (OS_entriesInitialized)
      return Unit_instance;
    OS_entriesInitialized = true;
    OS_Android_instance = new OS('Android', 0, 'android');
    OS_Linux_instance = new OS('Linux', 1, 'linux');
    OS_Windows_instance = new OS('Windows', 2, 'windows');
    OS_MacOS_instance = new OS('MacOS', 3, 'macos');
    OS_Ios_instance = new OS('Ios', 4, 'ios');
    OS_JS_instance = new OS('JS', 5, 'js');
    OS_Unknown_instance = new OS('Unknown', 6, 'unknown');
  }
  function OS(name, ordinal, id) {
    Enum.call(this, name, ordinal);
    this.w3m_1 = id;
  }
  var Arch_X64_instance;
  var Arch_Arm64_instance;
  var Arch_JS_instance;
  var Arch_WASM_instance;
  var Arch_Unknown_instance;
  var Arch_entriesInitialized;
  function Arch_initEntries() {
    if (Arch_entriesInitialized)
      return Unit_instance;
    Arch_entriesInitialized = true;
    Arch_X64_instance = new Arch('X64', 0, 'x64');
    Arch_Arm64_instance = new Arch('Arm64', 1, 'arm64');
    Arch_JS_instance = new Arch('JS', 2, 'js');
    Arch_WASM_instance = new Arch('WASM', 3, 'wasm');
    Arch_Unknown_instance = new Arch('Unknown', 4, 'unknown');
  }
  function Arch(name, ordinal, id) {
    Enum.call(this, name, ordinal);
    this.z3m_1 = id;
  }
  function OS_Android_getInstance() {
    OS_initEntries();
    return OS_Android_instance;
  }
  function OS_Linux_getInstance() {
    OS_initEntries();
    return OS_Linux_instance;
  }
  function OS_Windows_getInstance() {
    OS_initEntries();
    return OS_Windows_instance;
  }
  function OS_MacOS_getInstance() {
    OS_initEntries();
    return OS_MacOS_instance;
  }
  function OS_Ios_getInstance() {
    OS_initEntries();
    return OS_Ios_instance;
  }
  function OS_Unknown_getInstance() {
    OS_initEntries();
    return OS_Unknown_instance;
  }
  function Arch_Unknown_getInstance() {
    Arch_initEntries();
    return Arch_Unknown_instance;
  }
  function ClipboardManager() {
  }
  function URIManager() {
  }
  function RenderException(message, cause) {
    message = message === VOID ? null : message;
    cause = cause === VOID ? null : cause;
    RuntimeException_init_$Init$(message, cause, this);
    captureStack(this, RenderException);
  }
  var SystemTheme_DARK_instance;
  var SystemTheme_LIGHT_instance;
  var SystemTheme_UNKNOWN_instance;
  var SystemTheme_entriesInitialized;
  function SystemTheme_initEntries() {
    if (SystemTheme_entriesInitialized)
      return Unit_instance;
    SystemTheme_entriesInitialized = true;
    SystemTheme_DARK_instance = new SystemTheme('DARK', 0);
    SystemTheme_LIGHT_instance = new SystemTheme('LIGHT', 1);
    SystemTheme_UNKNOWN_instance = new SystemTheme('UNKNOWN', 2);
  }
  function SystemTheme(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function SystemTheme_UNKNOWN_getInstance() {
    SystemTheme_initEntries();
    return SystemTheme_UNKNOWN_instance;
  }
  function get_registry() {
    _init_properties_Managed_js_kt__4ok5rc();
    return registry;
  }
  var registry;
  function unregister(managed) {
    _init_properties_Managed_js_kt__4ok5rc();
    get_registry().unregister(managed);
  }
  function register(managed, thunk) {
    _init_properties_Managed_js_kt__4ok5rc();
    get_registry().register(managed, thunk);
  }
  function registry$lambda(it) {
    _init_properties_Managed_js_kt__4ok5rc();
    var thunk = it instanceof FinalizationThunk ? it : THROW_CCE();
    thunk.c3n();
    return Unit_instance;
  }
  var properties_initialized_Managed_js_kt_llxy4m;
  function _init_properties_Managed_js_kt__4ok5rc() {
    if (!properties_initialized_Managed_js_kt_llxy4m) {
      properties_initialized_Managed_js_kt_llxy4m = true;
      registry = new FinalizationRegistry(registry$lambda);
    }
  }
  function toInterop($this, array, copyArrayToWasm) {
    var tmp;
    var tmp_0;
    if (!(array == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      // Inline function 'kotlin.collections.isEmpty' call
      tmp_0 = !(array.length === 0);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var data = _malloc(array.length);
      $this.v37_1.a1(data);
      if (copyArrayToWasm) {
        toWasm(data, array);
      }
      tmp = data;
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function toInterop_0($this, array, copyArrayToWasm) {
    var tmp;
    var tmp_0;
    if (!(array == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      // Inline function 'kotlin.collections.isEmpty' call
      tmp_0 = !(array.length === 0);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var data = _malloc(imul(array.length, 2));
      $this.v37_1.a1(data);
      if (copyArrayToWasm) {
        toWasm_0(data, array);
      }
      tmp = data;
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function toInterop_1($this, array, copyArrayToWasm) {
    var tmp;
    var tmp_0;
    if (!(array == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      // Inline function 'kotlin.collections.isEmpty' call
      tmp_0 = !(array.length === 0);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var data = _malloc(imul(array.length, 4));
      $this.v37_1.a1(data);
      if (copyArrayToWasm) {
        toWasm_1(data, array);
      }
      tmp = data;
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function toInterop_2($this, array, copyArrayToWasm) {
    var tmp;
    var tmp_0;
    if (!(array == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      // Inline function 'kotlin.collections.isEmpty' call
      tmp_0 = !(array.length === 0);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var data = _malloc(imul(array.length, 4));
      $this.v37_1.a1(data);
      if (copyArrayToWasm) {
        toWasm_2(data, array);
      }
      tmp = data;
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function toInterop_3($this, array, copyArrayToWasm) {
    var tmp;
    var tmp_0;
    if (!(array == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      // Inline function 'kotlin.collections.isEmpty' call
      tmp_0 = !(array.length === 0);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var data = _malloc(imul(array.length, 8));
      $this.v37_1.a1(data);
      if (copyArrayToWasm) {
        toWasm_3(data, array);
      }
      tmp = data;
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function InteropScope() {
    var tmp = this;
    // Inline function 'kotlin.collections.mutableListOf' call
    tmp.v37_1 = ArrayList_init_$Create$_0();
    this.w37_1 = false;
  }
  protoOf(InteropScope).x37 = function (string) {
    var tmp;
    if (!(string == null)) {
      var data = _malloc(imul(string.length, 4));
      stringToUTF8(string, data, imul(string.length, 4));
      this.v37_1.a1(data);
      tmp = data;
    } else {
      tmp = 0;
    }
    return tmp;
  };
  protoOf(InteropScope).n3a = function (array) {
    return toInterop(this, array, true);
  };
  protoOf(InteropScope).u3d = function (array) {
    return toInterop(this, array, false);
  };
  protoOf(InteropScope).m38 = function (array) {
    return toInterop_0(this, array, true);
  };
  protoOf(InteropScope).u38 = function (_this__u8e3s4, result) {
    fromWasm(_this__u8e3s4, result);
  };
  protoOf(InteropScope).t38 = function (array) {
    return toInterop_1(this, array, true);
  };
  protoOf(InteropScope).s3d = function (array) {
    return toInterop_1(this, array, false);
  };
  protoOf(InteropScope).m3c = function (_this__u8e3s4, result) {
    fromWasm_0(_this__u8e3s4, result);
  };
  protoOf(InteropScope).m39 = function (array) {
    return toInterop_2(this, array, true);
  };
  protoOf(InteropScope).l3c = function (array) {
    return toInterop_2(this, array, false);
  };
  protoOf(InteropScope).e3j = function (_this__u8e3s4, result) {
    fromWasm_1(_this__u8e3s4, result);
  };
  protoOf(InteropScope).d3j = function (array) {
    return toInterop_3(this, array, false);
  };
  protoOf(InteropScope).v3d = function (_this__u8e3s4, result) {
    fromWasm_2(_this__u8e3s4, result);
  };
  protoOf(InteropScope).w3i = function (stringArray) {
    var tmp;
    var tmp_0;
    if (!(stringArray == null)) {
      // Inline function 'kotlin.collections.isNotEmpty' call
      // Inline function 'kotlin.collections.isEmpty' call
      tmp_0 = !(stringArray.length === 0);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(stringArray.length);
      var inductionVariable = 0;
      var last = stringArray.length;
      while (inductionVariable < last) {
        var item = stringArray[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'org.jetbrains.skia.impl.InteropScope.toInterop.<anonymous>' call
        var tmp$ret$2 = this.x37(item);
        destination.a1(tmp$ret$2);
      }
      var ptrs = toIntArray(destination);
      tmp = this.t38(ptrs);
    } else {
      tmp = 0;
    }
    return tmp;
  };
  protoOf(InteropScope).gu = function () {
    // Inline function 'kotlin.collections.forEach' call
    var tmp0_iterator = this.v37_1.o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'org.jetbrains.skia.impl.InteropScope.release.<anonymous>' call
      _free(element);
    }
    this.v37_1.h1();
    // Inline function 'org.jetbrains.skia.impl.InteropScope.releaseCallbacks' call
    if (this.w37_1) {
      _releaseLocalCallbackScope$accessor$wmqves();
      this.w37_1 = false;
    }
  };
  function toWasm(dest, src) {
    return HEAPU8.set(src, dest);
  }
  function toWasm_0(dest, src) {
    return HEAPU16.set(src, dest / 2 | 0);
  }
  function fromWasm(src, result) {
    var startIndex = src / 4 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    result.set(HEAPU32.subarray(startIndex, startIndex + result.length | 0));
  }
  function toWasm_1(dest, src) {
    return HEAPU32.set(src, dest / 4 | 0);
  }
  function fromWasm_0(src, result) {
    var startIndex = src / 4 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    result.set(HEAPF32.subarray(startIndex, startIndex + result.length | 0));
  }
  function toWasm_2(dest, src) {
    return HEAPF32.set(src, dest / 4 | 0);
  }
  function fromWasm_1(src, result) {
    var startIndex = src / 8 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    result.set(HEAPF64.subarray(startIndex, startIndex + result.length | 0));
  }
  function toWasm_3(dest, src) {
    return HEAPF64.set(src, dest / 8 | 0);
  }
  function fromWasm_2(src, result) {
    // Inline function 'kotlin.js.asDynamic' call
    result.set(HEAPU8.subarray(src, src + result.length | 0));
  }
  function _createLocalCallbackScope$accessor$wmqves() {
    return _createLocalCallbackScope();
  }
  function _releaseLocalCallbackScope$accessor$wmqves() {
    return _releaseLocalCallbackScope();
  }
  function getNavigatorInfo() {
    var tmp = navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform;
    return (!(tmp == null) ? typeof tmp === 'string' : false) ? tmp : THROW_CCE();
  }
  function makeGLContextCurrent(contextPointer) {
    GL.makeContextCurrent(contextPointer);
  }
  function createWebGLContext(canvas, attr) {
    attr = attr === VOID ? null : attr;
    var contextAttributes = new createWebGLContext$contextAttributes$1(attr);
    return GL.createContext(canvas, asJsObject(contextAttributes));
  }
  function asJsObject(_this__u8e3s4) {
    var jsObject = {};
    if (_this__u8e3s4.alpha == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.alpha = _this__u8e3s4.alpha;
    }
    if (_this__u8e3s4.depth == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.depth = _this__u8e3s4.depth;
    }
    if (_this__u8e3s4.stencil == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.stencil = _this__u8e3s4.stencil;
    }
    if (_this__u8e3s4.antialias == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.antialias = _this__u8e3s4.antialias;
    }
    if (_this__u8e3s4.premultipliedAlpha == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.premultipliedAlpha = _this__u8e3s4.premultipliedAlpha;
    }
    if (_this__u8e3s4.preserveDrawingBuffer == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.preserveDrawingBuffer = _this__u8e3s4.preserveDrawingBuffer;
    }
    if (_this__u8e3s4.preferLowPowerToHighPerformance == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.preferLowPowerToHighPerformance = _this__u8e3s4.preferLowPowerToHighPerformance;
    }
    if (_this__u8e3s4.failIfMajorPerformanceCaveat == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.failIfMajorPerformanceCaveat = _this__u8e3s4.failIfMajorPerformanceCaveat;
    }
    if (_this__u8e3s4.enableExtensionsByDefault == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.enableExtensionsByDefault = _this__u8e3s4.enableExtensionsByDefault;
    }
    if (_this__u8e3s4.explicitSwapControl == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.explicitSwapControl = _this__u8e3s4.explicitSwapControl;
    }
    if (_this__u8e3s4.renderViaOffscreenBackBuffer == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.renderViaOffscreenBackBuffer = _this__u8e3s4.renderViaOffscreenBackBuffer;
    }
    if (_this__u8e3s4.majorVersion == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      jsObject.majorVersion = _this__u8e3s4.majorVersion;
    }
    return jsObject;
  }
  function createWebGLContext$contextAttributes$1($attr) {
    var tmp = this;
    var tmp1_elvis_lhs = $attr == null ? null : $attr.alpha;
    tmp.d3n_1 = tmp1_elvis_lhs == null ? 1 : tmp1_elvis_lhs;
    var tmp_0 = this;
    var tmp1_elvis_lhs_0 = $attr == null ? null : $attr.depth;
    tmp_0.e3n_1 = tmp1_elvis_lhs_0 == null ? 1 : tmp1_elvis_lhs_0;
    var tmp_1 = this;
    var tmp1_elvis_lhs_1 = $attr == null ? null : $attr.stencil;
    tmp_1.f3n_1 = tmp1_elvis_lhs_1 == null ? 8 : tmp1_elvis_lhs_1;
    var tmp_2 = this;
    var tmp1_elvis_lhs_2 = $attr == null ? null : $attr.antialias;
    tmp_2.g3n_1 = tmp1_elvis_lhs_2 == null ? 0 : tmp1_elvis_lhs_2;
    var tmp_3 = this;
    var tmp1_elvis_lhs_3 = $attr == null ? null : $attr.premultipliedAlpha;
    tmp_3.h3n_1 = tmp1_elvis_lhs_3 == null ? 1 : tmp1_elvis_lhs_3;
    var tmp_4 = this;
    var tmp1_elvis_lhs_4 = $attr == null ? null : $attr.preserveDrawingBuffer;
    tmp_4.i3n_1 = tmp1_elvis_lhs_4 == null ? 0 : tmp1_elvis_lhs_4;
    var tmp_5 = this;
    var tmp1_elvis_lhs_5 = $attr == null ? null : $attr.preferLowPowerToHighPerformance;
    tmp_5.j3n_1 = tmp1_elvis_lhs_5 == null ? 0 : tmp1_elvis_lhs_5;
    var tmp_6 = this;
    var tmp1_elvis_lhs_6 = $attr == null ? null : $attr.failIfMajorPerformanceCaveat;
    tmp_6.k3n_1 = tmp1_elvis_lhs_6 == null ? 0 : tmp1_elvis_lhs_6;
    var tmp_7 = this;
    var tmp1_elvis_lhs_7 = $attr == null ? null : $attr.enableExtensionsByDefault;
    tmp_7.l3n_1 = tmp1_elvis_lhs_7 == null ? 1 : tmp1_elvis_lhs_7;
    var tmp_8 = this;
    var tmp1_elvis_lhs_8 = $attr == null ? null : $attr.explicitSwapControl;
    tmp_8.m3n_1 = tmp1_elvis_lhs_8 == null ? 0 : tmp1_elvis_lhs_8;
    var tmp_9 = this;
    var tmp1_elvis_lhs_9 = $attr == null ? null : $attr.renderViaOffscreenBackBuffer;
    tmp_9.n3n_1 = tmp1_elvis_lhs_9 == null ? 0 : tmp1_elvis_lhs_9;
    var tmp_10 = this;
    var tmp1_elvis_lhs_10 = $attr == null ? null : $attr.majorVersion;
    tmp_10.o3n_1 = tmp1_elvis_lhs_10 == null ? 2 : tmp1_elvis_lhs_10;
  }
  protoOf(createWebGLContext$contextAttributes$1).p3n = function () {
    return this.d3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).q3n = function () {
    return this.e3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).r3n = function () {
    return this.f3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).s3n = function () {
    return this.g3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).t3n = function () {
    return this.h3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).u3n = function () {
    return this.i3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).v3n = function () {
    return this.j3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).w3n = function () {
    return this.k3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).x3n = function () {
    return this.l3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).y3n = function () {
    return this.m3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).z3n = function () {
    return this.n3n_1;
  };
  protoOf(createWebGLContext$contextAttributes$1).a3o = function () {
    return this.o3n_1;
  };
  var LANG$delegate;
  function Pattern(regex) {
    this.b3o_1 = Regex_init_$Create$(regex);
  }
  function compilePattern(regex) {
    _init_properties_Actuals_js_kt__v403ki();
    return new Pattern(regex);
  }
  function LANG$delegate$lambda() {
    _init_properties_Actuals_js_kt__v403ki();
    var lang = window.navigator.language;
    var tmp;
    var tmp_0;
    if (lang == null) {
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.text.isEmpty' call
      tmp_0 = charSequenceLength(lang) === 0;
    }
    if (tmp_0) {
      tmp = 'en-US';
    } else {
      tmp = lang;
    }
    return tmp;
  }
  var properties_initialized_Actuals_js_kt_fw1oy4;
  function _init_properties_Actuals_js_kt__v403ki() {
    if (!properties_initialized_Actuals_js_kt_fw1oy4) {
      properties_initialized_Actuals_js_kt_fw1oy4 = true;
      LANG$delegate = lazy(LANG$delegate$lambda);
    }
  }
  function Companion_38() {
  }
  protoOf(Companion_38).r37 = function () {
  };
  var Companion_instance_38;
  function Companion_getInstance_39() {
    return Companion_instance_38;
  }
  function FinalizationThunk(finalizer, obj) {
    this.a3n_1 = finalizer;
    this.b3n_1 = obj;
  }
  protoOf(FinalizationThunk).c3n = function () {
    if (!(this.b3n_1 === 0)) {
      org_jetbrains_skia_impl_Managed__invokeFinalizer(this.a3n_1, this.b3n_1);
    }
    this.b3n_1 = 0;
  };
  function Managed(ptr, finalizer, managed) {
    managed = managed === VOID ? true : managed;
    Native.call(this, ptr);
    this.n37_1 = null;
    if (managed) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!!(ptr === 0)) {
        // Inline function 'org.jetbrains.skia.impl.Managed.<anonymous>' call
        var message = 'Managed ptr is 0';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!!(finalizer === 0)) {
        // Inline function 'org.jetbrains.skia.impl.Managed.<anonymous>' call
        var message_0 = 'Managed finalizer is 0';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
      var thunk = new FinalizationThunk(finalizer, ptr);
      register(this, thunk);
      this.n37_1 = thunk;
    }
  }
  protoOf(Managed).b1q = function () {
    if (Companion_instance_39.t37() === this.o37_1)
      throw RuntimeException_init_$Create$('Object already closed: ' + getKClassFromExpression(this).e7() + ', _ptr=' + this.o37_1);
    else if (null == this.n37_1)
      throw RuntimeException_init_$Create$("Object is not managed, can't close(): " + getKClassFromExpression(this).e7() + ', _ptr=' + this.o37_1);
    else {
      unregister(this);
      ensureNotNull(this.n37_1).c3n();
      this.n37_1 = null;
      this.o37_1 = 0;
    }
  };
  function get_INTEROP_SCOPE() {
    _init_properties_Native_js_kt__80argu();
    return INTEROP_SCOPE;
  }
  var INTEROP_SCOPE;
  function set_interopScopeCounter(_set____db54di) {
    _init_properties_Native_js_kt__80argu();
    interopScopeCounter = _set____db54di;
  }
  function get_interopScopeCounter() {
    _init_properties_Native_js_kt__80argu();
    return interopScopeCounter;
  }
  var interopScopeCounter;
  function Companion_39() {
  }
  protoOf(Companion_39).t37 = function () {
    return 0;
  };
  var Companion_instance_39;
  function Companion_getInstance_40() {
    return Companion_instance_39;
  }
  function Native(ptr) {
    if (ptr === Companion_instance_39.t37())
      throw RuntimeException_init_$Create$("Can't wrap nullptr");
    this.o37_1 = ptr;
  }
  protoOf(Native).equals = function (other) {
    if (this === other)
      return true;
    if (null == other)
      return false;
    if (!(other instanceof Native))
      return false;
    return this.o37_1 === other.o37_1 ? true : this.p37(other);
  };
  protoOf(Native).hashCode = function () {
    return this.o37_1;
  };
  protoOf(Native).p37 = function (other) {
    return false;
  };
  protoOf(Native).toString = function () {
    return plus(getKClassFromExpression(this).e7(), '(_ptr=0x') + toString_0(this.o37_1, 16) + ')';
  };
  function reachabilityBarrier(obj) {
    _init_properties_Native_js_kt__80argu();
  }
  function _set_interopScopeCounter_$accessor$14q3g08_7yblxt(_set____db54di) {
    _init_properties_Native_js_kt__80argu();
    return set_interopScopeCounter(_set____db54di);
  }
  function _get_interopScopeCounter_$accessor$14q3g08_y31ph7() {
    _init_properties_Native_js_kt__80argu();
    return get_interopScopeCounter();
  }
  function _get_INTEROP_SCOPE_$accessor$14q3g08_4sg8oi() {
    _init_properties_Native_js_kt__80argu();
    return get_INTEROP_SCOPE();
  }
  var properties_initialized_Native_js_kt_fdhhkg;
  function _init_properties_Native_js_kt__80argu() {
    if (!properties_initialized_Native_js_kt_fdhhkg) {
      properties_initialized_Native_js_kt_fdhhkg = true;
      INTEROP_SCOPE = new InteropScope();
      interopScopeCounter = 0;
    }
  }
  function RefCnt_init_$Init$(ptr, $this) {
    Managed.call($this, ptr, _FinalizerHolder_getInstance_15().c3o_1, true);
    RefCnt.call($this);
    return $this;
  }
  function RefCnt_init_$Init$_0(ptr, allowClose, $this) {
    Managed.call($this, ptr, _FinalizerHolder_getInstance_15().c3o_1, allowClose);
    RefCnt.call($this);
    return $this;
  }
  protoOf(RefCnt).z3a = function () {
    Stats_instance.l37();
    return org_jetbrains_skia_impl_RefCnt__getRefCount(this.o37_1);
  };
  protoOf(RefCnt).toString = function () {
    var s = protoOf(Managed).toString.call(this);
    // Inline function 'kotlin.text.substring' call
    var endIndex = s.length - 1 | 0;
    // Inline function 'kotlin.js.asDynamic' call
    return s.substring(0, endIndex) + ', refCount=' + this.z3a() + ')';
  };
  function RefCnt() {
  }
  function _FinalizerHolder_15() {
    _FinalizerHolder_instance_15 = this;
    this.c3o_1 = org_jetbrains_skia_impl_RefCnt__getFinalizer();
  }
  var _FinalizerHolder_instance_15;
  function _FinalizerHolder_getInstance_15() {
    if (_FinalizerHolder_instance_15 == null)
      new _FinalizerHolder_15();
    return _FinalizerHolder_instance_15;
  }
  function Stats() {
  }
  protoOf(Stats).l37 = function () {
  };
  var Stats_instance;
  function Stats_getInstance() {
    return Stats_instance;
  }
  function currentNanoTime() {
    return numberToLong(window.performance.now() * 1000000);
  }
  function loadOpenGLLibrary() {
  }
  function disposeCanvas($this) {
    var tmp0_safe_receiver = $this.h3o_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.b1q();
    }
    $this.h3o_1 = null;
    var tmp1_safe_receiver = $this.i3o_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      tmp1_safe_receiver.b1q();
    }
    $this.i3o_1 = null;
  }
  function CanvasRenderer$needRedraw$lambda(this$0) {
    return function (timestamp) {
      this$0.k3o_1 = false;
      makeGLContextCurrent(this$0.d3o_1);
      var tmp0_safe_receiver = this$0.j3o_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        tmp0_safe_receiver.h2t(-1);
      }
      var tmp1_safe_receiver = this$0.j3o_1;
      if (tmp1_safe_receiver == null)
        null;
      else
        tmp1_safe_receiver.q39();
      this$0.l3o(timestamp);
      var tmp2_safe_receiver = this$0.h3o_1;
      if (tmp2_safe_receiver == null)
        null;
      else {
        tmp2_safe_receiver.y3g();
      }
      this$0.g3o_1.w3a();
      return Unit_instance;
    };
  }
  function CanvasRenderer(contextPointer, width, height) {
    this.d3o_1 = contextPointer;
    this.e3o_1 = width;
    this.f3o_1 = height;
    this.h3o_1 = null;
    this.i3o_1 = null;
    this.j3o_1 = null;
    makeGLContextCurrent(this.d3o_1);
    this.g3o_1 = Companion_getInstance_5().t3a();
    this.m3o();
    this.k3o_1 = false;
  }
  protoOf(CanvasRenderer).m3o = function () {
    disposeCanvas(this);
    this.i3o_1 = Companion_getInstance_0().s37(this.e3o_1, this.f3o_1, 1, 8, 0, 32856);
    var tmp = this;
    var tmp0_elvis_lhs = Companion_getInstance_26().p3g(this.g3o_1, ensureNotNull(this.i3o_1), SurfaceOrigin_BOTTOM_LEFT_getInstance(), SurfaceColorFormat_RGBA_8888_getInstance(), Companion_getInstance_3().i3a_1, new SurfaceProps());
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      throw new RenderException('Cannot create surface');
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    tmp.h3o_1 = tmp_0;
    this.j3o_1 = ensureNotNull(this.h3o_1).x3g();
  };
  protoOf(CanvasRenderer).n3o = function () {
    if (this.k3o_1) {
      return Unit_instance;
    }
    this.k3o_1 = true;
    var tmp = window;
    tmp.requestAnimationFrame(CanvasRenderer$needRedraw$lambda(this));
  };
  function get_hostOs() {
    _init_properties_OsArch_js_kt__jkqwph();
    return hostOs;
  }
  var hostOs;
  function get_hostArch() {
    _init_properties_OsArch_js_kt__jkqwph();
    return hostArch;
  }
  var hostArch;
  var hostId$delegate;
  function detectHostOs() {
    _init_properties_OsArch_js_kt__jkqwph();
    // Inline function 'kotlin.takeIf' call
    var this_0 = getNavigatorInfo();
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'org.jetbrains.skiko.detectHostOs.<anonymous>' call
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(this_0) > 0) {
      tmp = this_0;
    } else {
      tmp = null;
    }
    var tmp0_elvis_lhs = tmp;
    var platformInfo = tmp0_elvis_lhs == null ? window.navigator.userAgent : tmp0_elvis_lhs;
    return contains(platformInfo, 'Android', true) ? OS_Android_getInstance() : contains(platformInfo, 'iPhone', true) ? OS_Ios_getInstance() : contains(platformInfo, 'iOS', true) ? OS_Ios_getInstance() : contains(platformInfo, 'iPad', true) ? OS_Ios_getInstance() : contains(platformInfo, 'Linux', true) ? OS_Linux_getInstance() : contains(platformInfo, 'Mac', true) ? OS_MacOS_getInstance() : contains(platformInfo, 'Win', true) ? OS_Windows_getInstance() : OS_Unknown_getInstance();
  }
  function hostId$delegate$lambda() {
    _init_properties_OsArch_js_kt__jkqwph();
    return get_hostOs().w3m_1 + '-' + get_hostArch().z3m_1;
  }
  var properties_initialized_OsArch_js_kt_ik094d;
  function _init_properties_OsArch_js_kt__jkqwph() {
    if (!properties_initialized_OsArch_js_kt_ik094d) {
      properties_initialized_OsArch_js_kt_ik094d = true;
      hostOs = detectHostOs();
      hostArch = Arch_Unknown_getInstance();
      hostId$delegate = lazy(hostId$delegate$lambda);
    }
  }
  function attachTo($this, htmlCanvas) {
    $this.r3o_1 = htmlCanvas;
    var tmp = $this;
    tmp.o3o_1 = new SkiaLayer$attachTo$1(htmlCanvas, $this);
  }
  function SkiaLayer$attachTo$1($htmlCanvas, this$0) {
    this.a3p_1 = this$0;
    CanvasRenderer.call(this, createWebGLContext($htmlCanvas), $htmlCanvas.width, $htmlCanvas.height);
  }
  protoOf(SkiaLayer$attachTo$1).l3o = function (currentTimestamp) {
    var currentNanos = currentTimestamp * 1000000;
    var tmp0_safe_receiver = this.a3p_1.q3o_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.b3p(ensureNotNull(this.j3o_1), this.e3o_1, this.f3o_1, numberToLong(currentNanos));
    }
  };
  function SkiaLayer() {
    this.o3o_1 = null;
    this.p3o_1 = GraphicsApi_WEBGL_getInstance();
    this.q3o_1 = null;
    this.r3o_1 = null;
  }
  protoOf(SkiaLayer).n3o = function () {
    var tmp0_safe_receiver = this.o3o_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.n3o();
    }
  };
  protoOf(SkiaLayer).c3p = function (container) {
    attachTo(this, container instanceof HTMLCanvasElement ? container : THROW_CCE());
  };
  function get_currentSystemTheme() {
    return SystemTheme_UNKNOWN_getInstance();
  }
  //region block: post-declaration
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'alpha', function () {
    return this.p3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'depth', function () {
    return this.q3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'stencil', function () {
    return this.r3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'antialias', function () {
    return this.s3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'premultipliedAlpha', function () {
    return this.t3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'preserveDrawingBuffer', function () {
    return this.u3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'preferLowPowerToHighPerformance', function () {
    return this.v3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'failIfMajorPerformanceCaveat', function () {
    return this.w3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'enableExtensionsByDefault', function () {
    return this.x3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'explicitSwapControl', function () {
    return this.y3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'renderViaOffscreenBackBuffer', function () {
    return this.z3n();
  });
  defineProp(protoOf(createWebGLContext$contextAttributes$1), 'majorVersion', function () {
    return this.a3o();
  });
  //endregion
  //region block: init
  Color_instance = new Color();
  Companion_instance_7 = new Companion_7();
  Companion_instance_10 = new Companion_10();
  Companion_instance_11 = new Companion_11();
  Companion_instance_12 = new Companion_12();
  Companion_instance_13 = new Companion_13();
  Companion_instance_23 = new Companion_23();
  Companion_instance_24 = new Companion_24();
  Companion_instance_30 = new Companion_30();
  Companion_instance_34 = new Companion_34();
  Companion_instance_35 = new Companion_35();
  Companion_instance_38 = new Companion_38();
  Companion_instance_39 = new Companion_39();
  Stats_instance = new Stats();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Alignment_CENTER_getInstance;
  _.$_$.b = Alignment_END_getInstance;
  _.$_$.c = Alignment_JUSTIFY_getInstance;
  _.$_$.d = Alignment_LEFT_getInstance;
  _.$_$.e = Alignment_RIGHT_getInstance;
  _.$_$.f = Alignment_START_getInstance;
  _.$_$.g = BaselineMode_ALPHABETIC_getInstance;
  _.$_$.h = DecorationLineStyle_DASHED_getInstance;
  _.$_$.i = DecorationLineStyle_DOTTED_getInstance;
  _.$_$.j = DecorationLineStyle_DOUBLE_getInstance;
  _.$_$.k = DecorationLineStyle_SOLID_getInstance;
  _.$_$.l = DecorationLineStyle_WAVY_getInstance;
  _.$_$.m = Direction_LTR_getInstance;
  _.$_$.n = Direction_RTL_getInstance;
  _.$_$.o = HeightMode_ALL_getInstance;
  _.$_$.p = HeightMode_DISABLE_ALL_getInstance;
  _.$_$.q = HeightMode_DISABLE_FIRST_ASCENT_getInstance;
  _.$_$.r = HeightMode_DISABLE_LAST_DESCENT_getInstance;
  _.$_$.s = PlaceholderAlignment_ABOVE_BASELINE_getInstance;
  _.$_$.t = PlaceholderAlignment_BOTTOM_getInstance;
  _.$_$.u = PlaceholderAlignment_MIDDLE_getInstance;
  _.$_$.v = PlaceholderAlignment_TOP_getInstance;
  _.$_$.w = RectHeightMode_MAX_getInstance;
  _.$_$.x = RectHeightMode_STRUT_getInstance;
  _.$_$.y = RectWidthMode_TIGHT_getInstance;
  _.$_$.z = BlendMode_CLEAR_getInstance;
  _.$_$.a1 = BlendMode_COLOR_BURN_getInstance;
  _.$_$.b1 = BlendMode_COLOR_DODGE_getInstance;
  _.$_$.c1 = BlendMode_COLOR_getInstance;
  _.$_$.d1 = BlendMode_DARKEN_getInstance;
  _.$_$.e1 = BlendMode_DIFFERENCE_getInstance;
  _.$_$.f1 = BlendMode_DST_ATOP_getInstance;
  _.$_$.g1 = BlendMode_DST_IN_getInstance;
  _.$_$.h1 = BlendMode_DST_OUT_getInstance;
  _.$_$.i1 = BlendMode_DST_OVER_getInstance;
  _.$_$.j1 = BlendMode_DST_getInstance;
  _.$_$.k1 = BlendMode_EXCLUSION_getInstance;
  _.$_$.l1 = BlendMode_HARD_LIGHT_getInstance;
  _.$_$.m1 = BlendMode_HUE_getInstance;
  _.$_$.n1 = BlendMode_LIGHTEN_getInstance;
  _.$_$.o1 = BlendMode_LUMINOSITY_getInstance;
  _.$_$.p1 = BlendMode_MODULATE_getInstance;
  _.$_$.q1 = BlendMode_MULTIPLY_getInstance;
  _.$_$.r1 = BlendMode_OVERLAY_getInstance;
  _.$_$.s1 = BlendMode_PLUS_getInstance;
  _.$_$.t1 = BlendMode_SATURATION_getInstance;
  _.$_$.u1 = BlendMode_SCREEN_getInstance;
  _.$_$.v1 = BlendMode_SOFT_LIGHT_getInstance;
  _.$_$.w1 = BlendMode_SRC_ATOP_getInstance;
  _.$_$.x1 = BlendMode_SRC_IN_getInstance;
  _.$_$.y1 = BlendMode_SRC_OUT_getInstance;
  _.$_$.z1 = BlendMode_SRC_OVER_getInstance;
  _.$_$.a2 = BlendMode_SRC_getInstance;
  _.$_$.b2 = BlendMode_XOR_getInstance;
  _.$_$.c2 = ClipMode_DIFFERENCE_getInstance;
  _.$_$.d2 = ClipMode_INTERSECT_getInstance;
  _.$_$.e2 = FontEdging_ALIAS_getInstance;
  _.$_$.f2 = FontEdging_ANTI_ALIAS_getInstance;
  _.$_$.g2 = FontEdging_SUBPIXEL_ANTI_ALIAS_getInstance;
  _.$_$.h2 = FontHinting_FULL_getInstance;
  _.$_$.i2 = FontHinting_NONE_getInstance;
  _.$_$.j2 = FontHinting_NORMAL_getInstance;
  _.$_$.k2 = FontHinting_SLIGHT_getInstance;
  _.$_$.l2 = FontSlant_ITALIC_getInstance;
  _.$_$.m2 = FontSlant_UPRIGHT_getInstance;
  _.$_$.n2 = PaintMode_FILL_getInstance;
  _.$_$.o2 = PaintMode_STROKE_getInstance;
  _.$_$.p2 = PaintStrokeCap_BUTT_getInstance;
  _.$_$.q2 = PaintStrokeCap_ROUND_getInstance;
  _.$_$.r2 = PaintStrokeCap_SQUARE_getInstance;
  _.$_$.s2 = PaintStrokeJoin_BEVEL_getInstance;
  _.$_$.t2 = PaintStrokeJoin_MITER_getInstance;
  _.$_$.u2 = PaintStrokeJoin_ROUND_getInstance;
  _.$_$.v2 = PathDirection_COUNTER_CLOCKWISE_getInstance;
  _.$_$.w2 = PathFillMode_EVEN_ODD_getInstance;
  _.$_$.x2 = PathFillMode_WINDING_getInstance;
  _.$_$.y2 = PathOp_DIFFERENCE_getInstance;
  _.$_$.z2 = PathOp_INTERSECT_getInstance;
  _.$_$.a3 = PathOp_REVERSE_DIFFERENCE_getInstance;
  _.$_$.b3 = PathOp_UNION_getInstance;
  _.$_$.c3 = PathOp_XOR_getInstance;
  _.$_$.d3 = FontCollection_init_$Create$;
  _.$_$.e3 = TextStyle_init_$Create$;
  _.$_$.f3 = Font_init_$Create$_0;
  _.$_$.g3 = FontStyle_init_$Create$;
  _.$_$.h3 = Paint_init_$Create$;
  _.$_$.i3 = Path_init_$Create$;
  _.$_$.j3 = PictureRecorder_init_$Create$;
  _.$_$.k3 = RTreeFactory_init_$Create$;
  _.$_$.l3 = CharDirection_getInstance;
  _.$_$.m3 = Companion_getInstance_1;
  _.$_$.n3 = Companion_getInstance_4;
  _.$_$.o3 = Companion_getInstance_7;
  _.$_$.p3 = Companion_getInstance_9;
  _.$_$.q3 = Companion_getInstance_10;
  _.$_$.r3 = Companion_instance_11;
  _.$_$.s3 = Companion_getInstance_16;
  _.$_$.t3 = Companion_getInstance_19;
  _.$_$.u3 = Companion_instance_23;
  _.$_$.v3 = Companion_instance_24;
  _.$_$.w3 = ShadowUtils_getInstance;
  _.$_$.x3 = Companion_getInstance_27;
  _.$_$.y3 = DecorationStyle;
  _.$_$.z3 = FontRastrSettings;
  _.$_$.a4 = LineMetrics;
  _.$_$.b4 = ParagraphBuilder;
  _.$_$.c4 = ParagraphStyle;
  _.$_$.d4 = PlaceholderStyle;
  _.$_$.e4 = Shadow;
  _.$_$.f4 = TextIndent;
  _.$_$.g4 = TypefaceFontProvider;
  _.$_$.h4 = Matrix44;
  _.$_$.i4 = Point3;
  _.$_$.j4 = ClipboardManager;
  _.$_$.k4 = SkiaLayer;
  _.$_$.l4 = URIManager;
  _.$_$.m4 = currentNanoTime;
  _.$_$.n4 = get_currentSystemTheme;
  _.$_$.o4 = get_hostOs;
  //endregion
  return _;
}));

//# sourceMappingURL=skiko-kjs.js.map
