(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-ui-ui-graphics.js', './compose-multiplatform-core-compose-ui-ui-geometry.js', './compose-multiplatform-core-compose-runtime-runtime.js', './kotlinx-coroutines-core.js', './compose-multiplatform-core-compose-ui-ui-util.js', './skiko-kjs.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-ui-ui-graphics.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./kotlinx-coroutines-core.js'), require('./compose-multiplatform-core-compose-ui-ui-util.js'), require('./skiko-kjs.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'compose-multiplatform-core-compose-ui-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-graphics' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-util'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'compose-multiplatform-core-compose-ui-ui-util' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-util' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    if (typeof this['skiko-kjs'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-ui-ui-text'. Its dependency 'skiko-kjs' was not found. Please, check whether 'skiko-kjs' is loaded prior to 'compose-multiplatform-core-compose-ui-ui-text'.");
    }
    root['compose-multiplatform-core-compose-ui-ui-text'] = factory(typeof this['compose-multiplatform-core-compose-ui-ui-text'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-ui-ui-text'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-ui-ui-graphics'], this['compose-multiplatform-core-compose-ui-ui-geometry'], this['compose-multiplatform-core-compose-runtime-runtime'], this['kotlinx-coroutines-core'], this['compose-multiplatform-core-compose-ui-ui-util'], this['skiko-kjs']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core, kotlin_org_jetbrains_compose_ui_ui_util, kotlin_org_jetbrains_skiko_skiko) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.ib;
  var objectCreate = kotlin_kotlin.$_$.gb;
  var emptyList = kotlin_kotlin.$_$.m6;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var VOID = kotlin_kotlin.$_$.g;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var hashCode = kotlin_kotlin.$_$.la;
  var getStringHashCode = kotlin_kotlin.$_$.ka;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var equals = kotlin_kotlin.$_$.da;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var compareValues = kotlin_kotlin.$_$.x8;
  var sortedWith = kotlin_kotlin.$_$.n8;
  var charSequenceGet = kotlin_kotlin.$_$.x9;
  var CharSequence = kotlin_kotlin.$_$.ke;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var coerceIn = kotlin_kotlin.$_$.gc;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var _Constraints___get_minHeight__impl__ev4bgx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t1;
  var _Constraints___get_minWidth__impl__hi9lfi = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u1;
  var _Constraints___get_maxWidth__impl__uuyqc = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s1;
  var _Constraints___get_maxHeight__impl__dt3e8z = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r1;
  var coerceAtLeast = kotlin_kotlin.$_$.ac;
  var _Constraints___get_hasBoundedHeight__impl__bsh4rw = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m1;
  var Constraints = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a;
  var get_lastIndex = kotlin_kotlin.$_$.l7;
  var addAll = kotlin_kotlin.$_$.o5;
  var plus = kotlin_kotlin.$_$.c8;
  var last = kotlin_kotlin.$_$.q7;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.d2;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.z1;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g;
  var BlendMode = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.d;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var Path = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.m;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var getNumberHashCode = kotlin_kotlin.$_$.ia;
  var compareTo = kotlin_kotlin.$_$.ba;
  var LazyThreadSafetyMode_NONE_getInstance = kotlin_kotlin.$_$.i;
  var lazy = kotlin_kotlin.$_$.bg;
  var KProperty1 = kotlin_kotlin.$_$.rc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ja;
  var numberToInt = kotlin_kotlin.$_$.eb;
  var interfaceMeta = kotlin_kotlin.$_$.na;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b3;
  var _TextUnit___get_value__impl__hpbx0k = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m2;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var TextUnit = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r;
  var TextUnit__hashCode_impl_qsmeov = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.h2;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var get_isUnspecified = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a1;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var Color__hashCode_impl_vjyivj = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.k1;
  var _Color___get_value__impl__1pls5m = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l1;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g2;
  var Fill_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.a2;
  var get_sp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g1;
  var _IntSize___get_height__impl__prv63b = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e2;
  var _IntSize___get_width__impl__d9yl4o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f2;
  var IntSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q;
  var IntSize__hashCode_impl_gm9mta = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d2;
  var getBooleanHashCode = kotlin_kotlin.$_$.ga;
  var Constraints__hashCode_impl_ij7484 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q1;
  var Constraints_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b;
  var Long = kotlin_kotlin.$_$.ve;
  var toLong = kotlin_kotlin.$_$.lb;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.dg;
  var fillArrayVal = kotlin_kotlin.$_$.ea;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.s;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.z;
  var NullPointerException_init_$Create$ = kotlin_kotlin.$_$.d2;
  var ensureNotNull = kotlin_kotlin.$_$.uf;
  var first = kotlin_kotlin.$_$.w6;
  var Map = kotlin_kotlin.$_$.g5;
  var isInterface = kotlin_kotlin.$_$.wa;
  var MutableMap = kotlin_kotlin.$_$.k5;
  var MutableCollection = kotlin_kotlin.$_$.h5;
  var println = kotlin_kotlin.$_$.q9;
  var copyOf = kotlin_kotlin.$_$.k6;
  var copyOf_0 = kotlin_kotlin.$_$.j6;
  var ConcurrentModificationException_init_$Create$ = kotlin_kotlin.$_$.j1;
  var arrayCopy = kotlin_kotlin.$_$.p5;
  var ClassCastException = kotlin_kotlin.$_$.me;
  var NullPointerException = kotlin_kotlin.$_$.ye;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.m2;
  var List = kotlin_kotlin.$_$.e5;
  var Exception = kotlin_kotlin.$_$.se;
  var toString_0 = kotlin_kotlin.$_$.ng;
  var State = kotlin_org_jetbrains_compose_runtime_runtime.$_$.x;
  var IllegalStateException = kotlin_kotlin.$_$.ue;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.x1;
  var captureStack = kotlin_kotlin.$_$.u9;
  var CoroutineImpl = kotlin_kotlin.$_$.n9;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.z8;
  var CoroutineScope = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.e1;
  var get_indices = kotlin_kotlin.$_$.g7;
  var yield_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.k;
  var get_isActive = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.n1;
  var withTimeoutOrNull = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.j;
  var Key_instance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.o;
  var IllegalStateException_init_$Create$_0 = kotlin_kotlin.$_$.y1;
  var CancellationException = kotlin_kotlin.$_$.y8;
  var mutableStateOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.i1;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.c9;
  var Element = kotlin_kotlin.$_$.l9;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.y3;
  var Key_instance_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.r;
  var SupervisorJob = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.k1;
  var CoroutineScope_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.d1;
  var CoroutineStart_UNDISPATCHED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.b;
  var launch = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q1;
  var to = kotlin_kotlin.$_$.og;
  var mutableListOf = kotlin_kotlin.$_$.z7;
  var Companion_instance = kotlin_kotlin.$_$.l4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.q2;
  var createFailure = kotlin_kotlin.$_$.tf;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.t2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.s2;
  var KMutableProperty1 = kotlin_kotlin.$_$.pc;
  var listOf = kotlin_kotlin.$_$.v7;
  var Comparable = kotlin_kotlin.$_$.ne;
  var Collection = kotlin_kotlin.$_$.z4;
  var Dispatchers_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.q;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var Enum = kotlin_kotlin.$_$.qe;
  var fastJoinToString = kotlin_org_jetbrains_compose_ui_ui_util.$_$.a;
  var ShaderBrush = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.o;
  var SolidColor = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.p;
  var isNaN_0 = kotlin_kotlin.$_$.zf;
  var _Color___get_alpha__impl__wcfyv1 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.j1;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w1;
  var toList = kotlin_kotlin.$_$.s8;
  var CharDirection_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.l3;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var currentNanoTime = kotlin_org_jetbrains_skiko_skiko.$_$.m4;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.q;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.j4;
  var isLowSurrogate = kotlin_kotlin.$_$.jd;
  var isHighSurrogate = kotlin_kotlin.$_$.id;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.o2;
  var sequence = kotlin_kotlin.$_$.zc;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.n2;
  var SequenceScope = kotlin_kotlin.$_$.tc;
  var numberRangeToNumber = kotlin_kotlin.$_$.cb;
  var lazy_0 = kotlin_kotlin.$_$.cg;
  var FontRastrSettings = kotlin_org_jetbrains_skiko_skiko.$_$.z3;
  var FontEdging_ALIAS_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.e2;
  var FontEdging_ANTI_ALIAS_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.f2;
  var FontEdging_SUBPIXEL_ANTI_ALIAS_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.g2;
  var FontHinting_NONE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.i2;
  var FontHinting_SLIGHT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.k2;
  var FontHinting_NORMAL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.j2;
  var FontHinting_FULL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.h2;
  var asList = kotlin_kotlin.$_$.r5;
  var binarySearch = kotlin_kotlin.$_$.u5;
  var get_lastIndex_0 = kotlin_kotlin.$_$.m7;
  var coerceAtMost = kotlin_kotlin.$_$.dc;
  var charSequenceLength = kotlin_kotlin.$_$.y9;
  var RectHeightMode_STRUT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.x;
  var RectWidthMode_TIGHT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.y;
  var firstOrNull = kotlin_kotlin.$_$.u6;
  var lastOrNull = kotlin_kotlin.$_$.p7;
  var toComposeRect = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.a1;
  var RectHeightMode_MAX_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.w;
  var asSkiaPath = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.u;
  var getOrNull = kotlin_kotlin.$_$.z6;
  var isWhitespace = kotlin_kotlin.$_$.ld;
  var get_nativeCanvas = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.y;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var LineMetrics = kotlin_org_jetbrains_skiko_skiko.$_$.a4;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.k2;
  var _Size___get_packedValue__impl__7rlt1o = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c1;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i1;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.d1;
  var _Size___get_height__impl__a04p02 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.a1;
  var listOf_0 = kotlin_kotlin.$_$.u7;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.w5;
  var FontCollection_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.d3;
  var TypefaceFontProvider = kotlin_org_jetbrains_skiko_skiko.$_$.g4;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.u;
  var Companion_getInstance_5 = kotlin_org_jetbrains_skiko_skiko.$_$.p3;
  var copyToArray = kotlin_kotlin.$_$.l6;
  var first_0 = kotlin_kotlin.$_$.x6;
  var mapOf = kotlin_kotlin.$_$.x7;
  var KProperty0 = kotlin_kotlin.$_$.qc;
  var Companion_getInstance_6 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.b2;
  var Paint_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.h3;
  var asComposePaint = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.t;
  var Companion_getInstance_7 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.e2;
  var TextStyle_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.e3;
  var toArgb = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.z;
  var Companion_getInstance_8 = kotlin_org_jetbrains_skiko_skiko.$_$.o3;
  var Size_0 = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.i;
  var Size__hashCode_impl_2h1qpd = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.z;
  var BlendMode__hashCode_impl_93ceri = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.h1;
  var Companion_getInstance_9 = kotlin_org_jetbrains_skiko_skiko.$_$.q3;
  var DecorationLineStyle_SOLID_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.k;
  var DecorationStyle = kotlin_org_jetbrains_skiko_skiko.$_$.y3;
  var _Offset___get_x__impl__xvi35n = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.x;
  var _Offset___get_y__impl__8bzhra = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.y;
  var Shadow = kotlin_org_jetbrains_skiko_skiko.$_$.e4;
  var _TextUnit___get_isSp__impl__8c3r6q = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.j2;
  var _TextUnit___get_isEm__impl__esrmtl = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.i2;
  var DecorationLineStyle_WAVY_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.l;
  var DecorationLineStyle_DASHED_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.h;
  var DecorationLineStyle_DOTTED_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.i;
  var DecorationLineStyle_DOUBLE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.j;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.jg;
  var sortWith = kotlin_kotlin.$_$.l8;
  var asReversed = kotlin_kotlin.$_$.s5;
  var ParagraphStyle = kotlin_org_jetbrains_skiko_skiko.$_$.c4;
  var HeightMode_DISABLE_ALL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.p;
  var TextIndent = kotlin_org_jetbrains_skiko_skiko.$_$.f4;
  var Font_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.f3;
  var ParagraphBuilder = kotlin_org_jetbrains_skiko_skiko.$_$.b4;
  var charSequenceSubSequence = kotlin_kotlin.$_$.z9;
  var BaselineMode_ALPHABETIC_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.g;
  var PlaceholderStyle = kotlin_org_jetbrains_skiko_skiko.$_$.d4;
  var checkArithmetic = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v;
  var _TextUnit___get_rawType__impl__tu8yq5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l2;
  var pack = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d1;
  var PlaceholderAlignment_MIDDLE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.u;
  var PlaceholderAlignment_BOTTOM_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.t;
  var PlaceholderAlignment_TOP_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.v;
  var PlaceholderAlignment_ABOVE_BASELINE_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.s;
  var Alignment_START_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.f;
  var Alignment_END_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.b;
  var Alignment_JUSTIFY_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.c;
  var Alignment_CENTER_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.a;
  var Alignment_RIGHT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.e;
  var Alignment_LEFT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.d;
  var HeightMode_ALL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.o;
  var HeightMode_DISABLE_LAST_DESCENT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.r;
  var HeightMode_DISABLE_FIRST_ASCENT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.q;
  var Direction_LTR_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.m;
  var Direction_RTL_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.n;
  var firstOrNull_0 = kotlin_kotlin.$_$.t6;
  var coerceIn_0 = kotlin_kotlin.$_$.fc;
  var Stroke = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.c;
  var setOf = kotlin_kotlin.$_$.j8;
  var get_hostOs = kotlin_org_jetbrains_skiko_skiko.$_$.o4;
  var Companion_getInstance_10 = kotlin_org_jetbrains_skiko_skiko.$_$.x3;
  var Companion_getInstance_11 = kotlin_org_jetbrains_skiko_skiko.$_$.n3;
  var Companion_instance_0 = kotlin_org_jetbrains_skiko_skiko.$_$.r3;
  var FontSlant_UPRIGHT_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.m2;
  var FontSlant_ITALIC_getInstance = kotlin_org_jetbrains_skiko_skiko.$_$.l2;
  var FontStyle_init_$Create$ = kotlin_org_jetbrains_skiko_skiko.$_$.g3;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Range, 'Range', classMeta);
  setMetadataFor(sam$kotlin_Comparator$0, 'sam$kotlin_Comparator$0', classMeta);
  setMetadataFor(AnnotatedString, 'AnnotatedString', classMeta, VOID, [CharSequence]);
  setMetadataFor(MultiParagraph, 'MultiParagraph', classMeta);
  setMetadataFor(ParagraphInfo, 'ParagraphInfo', classMeta);
  function get_hasStaleResolvedFonts() {
    return false;
  }
  setMetadataFor(ParagraphIntrinsics, 'ParagraphIntrinsics', interfaceMeta);
  setMetadataFor(MultiParagraphIntrinsics, 'MultiParagraphIntrinsics', classMeta, VOID, [ParagraphIntrinsics]);
  setMetadataFor(ParagraphIntrinsicInfo, 'ParagraphIntrinsicInfo', classMeta);
  setMetadataFor(ParagraphStyle_0, 'ParagraphStyle', classMeta);
  setMetadataFor(Placeholder, 'Placeholder', classMeta);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(SpanStyle, 'SpanStyle', classMeta);
  setMetadataFor(SynchronizedObject, 'SynchronizedObject', classMeta, VOID, VOID, SynchronizedObject);
  setMetadataFor(TextLayoutResult, 'TextLayoutResult', classMeta);
  setMetadataFor(TextLayoutInput, 'TextLayoutInput', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(TextRange, 'TextRange', classMeta);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(TextStyle, 'TextStyle', classMeta);
  setMetadataFor(LruCache, 'LruCache', classMeta);
  setMetadataFor(SimpleArrayMap, 'SimpleArrayMap', classMeta, VOID, VOID, SimpleArrayMap_init_$Create$);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  function get_loadingStrategy() {
    return Companion_getInstance_19().j4d_1;
  }
  setMetadataFor(Font, 'Font', interfaceMeta);
  setMetadataFor(Companion_3, 'Companion', objectMeta);
  setMetadataFor(FontFamily, 'FontFamily', classMeta);
  setMetadataFor(SystemFontFamily, 'SystemFontFamily', classMeta, FontFamily);
  setMetadataFor(DefaultFontFamily, 'DefaultFontFamily', classMeta, SystemFontFamily);
  setMetadataFor(GenericFontFamily, 'GenericFontFamily', classMeta, SystemFontFamily);
  setMetadataFor(FileBasedFontFamily, 'FileBasedFontFamily', classMeta, FontFamily);
  setMetadataFor(FontListFontFamily, 'FontListFontFamily', classMeta, FileBasedFontFamily, [FileBasedFontFamily, List]);
  setMetadataFor(LoadedFontFamily, 'LoadedFontFamily', classMeta, FontFamily);
  setMetadataFor(TypefaceRequestCache, 'TypefaceRequestCache', classMeta, VOID, VOID, TypefaceRequestCache);
  setMetadataFor(TypefaceRequest, 'TypefaceRequest', classMeta);
  setMetadataFor(Immutable, 'Immutable', classMeta, VOID, [State]);
  setMetadataFor(Async, 'Async', classMeta, VOID, [State]);
  setMetadataFor(FontLoadFailedException, 'FontLoadFailedException', classMeta, IllegalStateException);
  setMetadataFor(FontFamilyResolverImpl, 'FontFamilyResolverImpl', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  function interceptFontFamily(fontFamily) {
    return fontFamily;
  }
  function interceptFontWeight(fontWeight) {
    return fontWeight;
  }
  function interceptFontStyle(fontStyle) {
    return fontStyle;
  }
  function interceptFontSynthesis(fontSynthesis) {
    return fontSynthesis;
  }
  setMetadataFor(PlatformResolveInterceptor, 'PlatformResolveInterceptor', interfaceMeta);
  setMetadataFor(PlatformResolveInterceptor$Companion$Default$1, VOID, classMeta, VOID, [PlatformResolveInterceptor]);
  setMetadataFor(Companion_4, 'Companion', objectMeta);
  setMetadataFor(AsyncTypefaceResult, 'AsyncTypefaceResult', classMeta);
  setMetadataFor(Key, 'Key', classMeta);
  setMetadataFor($runCachedCOROUTINE$1, '$runCachedCOROUTINE$1', classMeta, CoroutineImpl);
  setMetadataFor(AsyncTypefaceCache, 'AsyncTypefaceCache', classMeta, VOID, VOID, AsyncTypefaceCache, VOID, VOID, [4]);
  setMetadataFor(AsyncFontListLoader$load$slambda, 'AsyncFontListLoader$load$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(AsyncFontListLoader$loadWithTimeoutOrNull$slambda, 'AsyncFontListLoader$loadWithTimeoutOrNull$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($loadCOROUTINE$2, '$loadCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor($loadWithTimeoutOrNullCOROUTINE$3, '$loadWithTimeoutOrNullCOROUTINE$3', classMeta, CoroutineImpl);
  setMetadataFor(AsyncFontListLoader, 'AsyncFontListLoader', classMeta, VOID, [State], VOID, VOID, VOID, [0]);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, Element]);
  setMetadataFor(Companion_5, 'Companion', objectMeta);
  setMetadataFor(FontListFontFamilyTypefaceAdapter$resolve$slambda, 'FontListFontFamilyTypefaceAdapter$resolve$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(FontListFontFamilyTypefaceAdapter, 'FontListFontFamilyTypefaceAdapter', classMeta, VOID, VOID, FontListFontFamilyTypefaceAdapter, VOID, VOID, [2]);
  setMetadataFor(Companion_6, 'Companion', objectMeta);
  setMetadataFor(FontLoadingStrategy, 'FontLoadingStrategy', classMeta);
  setMetadataFor(FontMatcher, 'FontMatcher', classMeta, VOID, VOID, FontMatcher);
  setMetadataFor(Companion_7, 'Companion', objectMeta);
  setMetadataFor(FontStyle, 'FontStyle', classMeta);
  setMetadataFor(Companion_8, 'Companion', objectMeta);
  setMetadataFor(FontSynthesis, 'FontSynthesis', classMeta);
  setMetadataFor(Companion_9, 'Companion', objectMeta);
  setMetadataFor(FontWeight, 'FontWeight', classMeta, VOID, [Comparable]);
  setMetadataFor(TextInputService, 'TextInputService', classMeta);
  setMetadataFor(Companion_10, 'Companion', objectMeta);
  setMetadataFor(Locale, 'Locale', classMeta);
  setMetadataFor(Companion_11, 'Companion', objectMeta);
  setMetadataFor(LocaleList, 'LocaleList', classMeta, VOID, [Collection]);
  setMetadataFor(Companion_12, 'Companion', objectMeta);
  setMetadataFor(BaselineShift, 'BaselineShift', classMeta);
  setMetadataFor(Companion_13, 'Companion', objectMeta);
  setMetadataFor(Hyphens, 'Hyphens', classMeta);
  setMetadataFor(Companion_14, 'Companion', objectMeta);
  setMetadataFor(Companion_15, 'Companion', objectMeta);
  setMetadataFor(Companion_16, 'Companion', objectMeta);
  setMetadataFor(Trim, 'Trim', classMeta);
  setMetadataFor(Alignment, 'Alignment', classMeta);
  setMetadataFor(LineHeightStyle, 'LineHeightStyle', classMeta);
  setMetadataFor(ResolvedTextDirection, 'ResolvedTextDirection', classMeta, Enum);
  setMetadataFor(Companion_17, 'Companion', objectMeta);
  setMetadataFor(TextAlign, 'TextAlign', classMeta);
  setMetadataFor(Companion_18, 'Companion', objectMeta);
  setMetadataFor(TextDecoration, 'TextDecoration', classMeta);
  setMetadataFor(Companion_19, 'Companion', objectMeta);
  setMetadataFor(TextDirection, 'TextDirection', classMeta);
  function merge(other) {
    var tmp;
    var tmp_0;
    if (other instanceof BrushStyle) {
      tmp_0 = this instanceof BrushStyle;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      var tmp_1 = other.p3n();
      tmp = new BrushStyle(other.e4k_1, takeOrElse_0(tmp_1, TextForegroundStyle$merge$lambda(this)));
    } else {
      var tmp_2;
      if (other instanceof BrushStyle) {
        tmp_2 = !(this instanceof BrushStyle);
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        tmp = other;
      } else {
        var tmp_3;
        if (!(other instanceof BrushStyle)) {
          tmp_3 = this instanceof BrushStyle;
        } else {
          tmp_3 = false;
        }
        if (tmp_3) {
          tmp = this;
        } else {
          tmp = other.s48(TextForegroundStyle$merge$lambda_0(this));
        }
      }
    }
    return tmp;
  }
  function takeOrElse(other) {
    return !equals(this, Unspecified_instance) ? this : other();
  }
  setMetadataFor(TextForegroundStyle, 'TextForegroundStyle', interfaceMeta);
  setMetadataFor(Unspecified, 'Unspecified', objectMeta, VOID, [TextForegroundStyle]);
  setMetadataFor(Companion_20, 'Companion', objectMeta);
  setMetadataFor(BrushStyle, 'BrushStyle', classMeta, VOID, [TextForegroundStyle]);
  setMetadataFor(ColorStyle, 'ColorStyle', classMeta, VOID, [TextForegroundStyle]);
  setMetadataFor(Companion_21, 'Companion', objectMeta);
  setMetadataFor(TextGeometricTransform, 'TextGeometricTransform', classMeta, VOID, VOID, TextGeometricTransform);
  setMetadataFor(Companion_22, 'Companion', objectMeta);
  setMetadataFor(TextIndent_0, 'TextIndent', classMeta, VOID, VOID, TextIndent_0);
  setMetadataFor(Companion_23, 'Companion', objectMeta);
  setMetadataFor(TextOverflow, 'TextOverflow', classMeta);
  setMetadataFor(NoCache, 'NoCache', classMeta, VOID, VOID, NoCache);
  setMetadataFor(PlatformFont, 'PlatformFont', classMeta, VOID, [Font]);
  setMetadataFor(AtomicReference, 'AtomicReference', classMeta);
  setMetadataFor(ExpireAfterAccessCache, 'ExpireAfterAccessCache', classMeta);
  setMetadataFor(Companion_24, 'Companion', objectMeta);
  setMetadataFor(_get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj, '<get-codePointsOutsideDirectionalIsolate>$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(_get_codePoints_$slambda_43x8dt, '<get-codePoints>$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(Companion_25, 'Companion', objectMeta);
  setMetadataFor(FontRasterizationSettings, 'FontRasterizationSettings', classMeta);
  setMetadataFor(FontSmoothing, 'FontSmoothing', classMeta, Enum);
  setMetadataFor(FontHinting, 'FontHinting', classMeta, Enum);
  function paint$default(canvas, color, shadow, textDecoration, drawStyle, blendMode, $super) {
    color = color === VOID ? Companion_getInstance().w3s_1 : color;
    shadow = shadow === VOID ? null : shadow;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    blendMode = blendMode === VOID ? Companion_getInstance_0().z3v_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.j45(canvas, color, shadow, textDecoration, drawStyle, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.j45.call(this, canvas, new Color(color), shadow, textDecoration, drawStyle, new BlendMode(blendMode));
    }
    return tmp;
  }
  function paint$default_0(canvas, brush, alpha, shadow, textDecoration, drawStyle, blendMode, $super) {
    var tmp;
    if (alpha === VOID) {
      tmp = NaN;
    } else {
      tmp = alpha;
    }
    alpha = tmp;
    shadow = shadow === VOID ? null : shadow;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    blendMode = blendMode === VOID ? Companion_getInstance_0().z3v_1 : blendMode;
    var tmp_0;
    if ($super === VOID) {
      this.l45(canvas, brush, alpha, shadow, textDecoration, drawStyle, blendMode);
      tmp_0 = Unit_instance;
    } else {
      tmp_0 = $super.l45.call(this, canvas, brush, alpha, shadow, textDecoration, drawStyle, new BlendMode(blendMode));
    }
    return tmp_0;
  }
  setMetadataFor(Paragraph_1, 'Paragraph', interfaceMeta);
  setMetadataFor(SkiaParagraph, 'SkiaParagraph', classMeta, VOID, [Paragraph_1]);
  setMetadataFor(Companion_26, 'Companion', objectMeta);
  setMetadataFor(TextDecorationLineStyle, 'TextDecorationLineStyle', classMeta);
  setMetadataFor(PlatformTextStyle, 'PlatformTextStyle', classMeta);
  setMetadataFor(PlatformFontFamilyTypefaceAdapter, 'PlatformFontFamilyTypefaceAdapter', classMeta, VOID, VOID, PlatformFontFamilyTypefaceAdapter);
  setMetadataFor(SkiaFontLoader, 'SkiaFontLoader', classMeta, VOID, VOID, SkiaFontLoader, VOID, VOID, [1]);
  setMetadataFor(ParagraphLayouter, 'ParagraphLayouter', classMeta);
  setMetadataFor(Platform, 'Platform', classMeta, Enum);
  setMetadataFor(FontLoadResult, 'FontLoadResult', classMeta);
  setMetadataFor(FontLoader, 'FontLoader', classMeta, VOID, VOID, FontLoader);
  setMetadataFor(FontCache, 'FontCache', classMeta, VOID, VOID, FontCache);
  setMetadataFor(SystemFont, 'SystemFont', classMeta, PlatformFont);
  setMetadataFor(SkiaBackedTypeface, 'SkiaBackedTypeface', classMeta);
  setMetadataFor(LoadedFont, 'LoadedFont', classMeta, PlatformFont);
  setMetadataFor(ComputedStyle, 'ComputedStyle', classMeta);
  setMetadataFor(Op, 'Op', classMeta);
  setMetadataFor(StyleAdd, 'StyleAdd', classMeta, Op);
  setMetadataFor(PutPlaceholder, 'PutPlaceholder', classMeta, Op);
  setMetadataFor(EndPlaceholder, 'EndPlaceholder', classMeta, Op);
  setMetadataFor(Cut, 'Cut', classMeta);
  setMetadataFor(StyleAdd_0, 'StyleAdd', classMeta, Cut);
  setMetadataFor(StyleRemove, 'StyleRemove', classMeta, Cut);
  setMetadataFor(PutPlaceholder_0, 'PutPlaceholder', classMeta, Cut);
  setMetadataFor(EndPlaceholder_0, 'EndPlaceholder', classMeta, Cut);
  setMetadataFor(sam$kotlin_Comparator$0_0, 'sam$kotlin_Comparator$0', classMeta);
  setMetadataFor(ParagraphBuilder_0, 'ParagraphBuilder', classMeta);
  setMetadataFor(SkiaParagraphIntrinsics, 'SkiaParagraphIntrinsics', classMeta, VOID, [ParagraphIntrinsics]);
  setMetadataFor(Companion_27, 'Companion', objectMeta);
  setMetadataFor(LineBreak, 'LineBreak', classMeta);
  setMetadataFor(Companion_28, 'Companion', objectMeta);
  setMetadataFor(TextMotion, 'TextMotion', classMeta);
  setMetadataFor(JsLocale, 'JsLocale', classMeta);
  setMetadataFor(createPlatformLocaleDelegate$1, VOID, classMeta);
  //endregion
  var EmptyAnnotatedString;
  function Range_init_$Init$(item, start, end, $this) {
    Range.call($this, item, start, end, '');
    return $this;
  }
  function Range_init_$Create$(item, start, end) {
    return Range_init_$Init$(item, start, end, objectCreate(protoOf(Range)));
  }
  function AnnotatedString_init_$Init$(text, spanStyles, paragraphStyles, $this) {
    var tmp;
    if (spanStyles === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp = emptyList();
    } else {
      tmp = spanStyles;
    }
    spanStyles = tmp;
    var tmp_0;
    if (paragraphStyles === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp_0 = emptyList();
    } else {
      tmp_0 = paragraphStyles;
    }
    paragraphStyles = tmp_0;
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (spanStyles.u()) {
      // Inline function 'androidx.compose.ui.text.AnnotatedString.<init>.<anonymous>' call
      tmp_1 = null;
    } else {
      tmp_1 = spanStyles;
    }
    var tmp_2 = tmp_1;
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_3;
    if (paragraphStyles.u()) {
      // Inline function 'androidx.compose.ui.text.AnnotatedString.<init>.<anonymous>' call
      tmp_3 = null;
    } else {
      tmp_3 = paragraphStyles;
    }
    var tmp$ret$5 = tmp_3;
    AnnotatedString.call($this, text, tmp_2, tmp$ret$5, null);
    return $this;
  }
  function AnnotatedString_init_$Create$(text, spanStyles, paragraphStyles) {
    return AnnotatedString_init_$Init$(text, spanStyles, paragraphStyles, objectCreate(protoOf(AnnotatedString)));
  }
  function Range(item, start, end, tag) {
    this.i43_1 = item;
    this.j43_1 = start;
    this.k43_1 = end;
    this.l43_1 = tag;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.j43_1 <= this.k43_1)) {
      // Inline function 'androidx.compose.ui.text.Range.<anonymous>' call
      var message = 'Reversed range is not supported';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(Range).re = function () {
    return this.i43_1;
  };
  protoOf(Range).se = function () {
    return this.j43_1;
  };
  protoOf(Range).s41 = function () {
    return this.k43_1;
  };
  protoOf(Range).toString = function () {
    return 'Range(item=' + this.i43_1 + ', start=' + this.j43_1 + ', end=' + this.k43_1 + ', tag=' + this.l43_1 + ')';
  };
  protoOf(Range).hashCode = function () {
    var result = this.i43_1 == null ? 0 : hashCode(this.i43_1);
    result = imul(result, 31) + this.j43_1 | 0;
    result = imul(result, 31) + this.k43_1 | 0;
    result = imul(result, 31) + getStringHashCode(this.l43_1) | 0;
    return result;
  };
  protoOf(Range).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Range))
      return false;
    var tmp0_other_with_cast = other instanceof Range ? other : THROW_CCE();
    if (!equals(this.i43_1, tmp0_other_with_cast.i43_1))
      return false;
    if (!(this.j43_1 === tmp0_other_with_cast.j43_1))
      return false;
    if (!(this.k43_1 === tmp0_other_with_cast.k43_1))
      return false;
    if (!(this.l43_1 === tmp0_other_with_cast.l43_1))
      return false;
    return true;
  };
  function sam$kotlin_Comparator$0(function_0) {
    this.m43_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0).j9 = function (a, b) {
    return this.m43_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0).compare = function (a, b) {
    return this.j9(a, b);
  };
  function AnnotatedString$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    // Inline function 'androidx.compose.ui.text.AnnotatedString.<anonymous>' call
    var tmp = a.j43_1;
    // Inline function 'androidx.compose.ui.text.AnnotatedString.<anonymous>' call
    var tmp$ret$1 = b.j43_1;
    return compareValues(tmp, tmp$ret$1);
  }
  function AnnotatedString(text, spanStylesOrNull, paragraphStylesOrNull, annotations) {
    spanStylesOrNull = spanStylesOrNull === VOID ? null : spanStylesOrNull;
    paragraphStylesOrNull = paragraphStylesOrNull === VOID ? null : paragraphStylesOrNull;
    annotations = annotations === VOID ? null : annotations;
    this.n43_1 = text;
    this.o43_1 = spanStylesOrNull;
    this.p43_1 = paragraphStylesOrNull;
    this.q43_1 = annotations;
    var lastStyleEnd = -1;
    var tmp0_safe_receiver = this.p43_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.sortedBy' call
      // Inline function 'kotlin.comparisons.compareBy' call
      var tmp_0 = AnnotatedString$lambda;
      var tmp$ret$0 = new sam$kotlin_Comparator$0(tmp_0);
      tmp = sortedWith(tmp0_safe_receiver, tmp$ret$0);
    }
    var tmp1_safe_receiver = tmp;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = tmp1_safe_receiver.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = tmp1_safe_receiver.n(index);
          // Inline function 'androidx.compose.ui.text.AnnotatedString.<anonymous>' call
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.contracts.contract' call
          if (!(item.j43_1 >= lastStyleEnd)) {
            // Inline function 'androidx.compose.ui.text.AnnotatedString.<anonymous>.<anonymous>' call
            var message = 'ParagraphStyle should not overlap';
            throw IllegalArgumentException_init_$Create$(toString(message));
          }
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.contracts.contract' call
          if (!(item.k43_1 <= this.n43_1.length)) {
            // Inline function 'androidx.compose.ui.text.AnnotatedString.<anonymous>.<anonymous>' call
            var message_0 = 'ParagraphStyle range [' + item.j43_1 + ', ' + item.k43_1 + ')' + ' is out of boundary';
            throw IllegalArgumentException_init_$Create$(toString(message_0));
          }
          lastStyleEnd = item.k43_1;
        }
         while (inductionVariable <= last);
    }
  }
  protoOf(AnnotatedString).r43 = function () {
    var tmp0_elvis_lhs = this.o43_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(AnnotatedString).a = function () {
    return this.n43_1.length;
  };
  protoOf(AnnotatedString).b = function (index) {
    return charSequenceGet(this.n43_1, index);
  };
  protoOf(AnnotatedString).c = function (startIndex, endIndex) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(startIndex <= endIndex)) {
      // Inline function 'androidx.compose.ui.text.AnnotatedString.subSequence.<anonymous>' call
      var message = 'start (' + startIndex + ') should be less or equal to end (' + endIndex + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (startIndex === 0 ? endIndex === this.n43_1.length : false)
      return this;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    var text = this.n43_1.substring(startIndex, endIndex);
    return new AnnotatedString(text, filterRanges(this.o43_1, startIndex, endIndex), filterRanges(this.p43_1, startIndex, endIndex), filterRanges(this.q43_1, startIndex, endIndex));
  };
  protoOf(AnnotatedString).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof AnnotatedString))
      return false;
    if (!(this.n43_1 === other.n43_1))
      return false;
    if (!equals(this.o43_1, other.o43_1))
      return false;
    if (!equals(this.p43_1, other.p43_1))
      return false;
    if (!equals(this.q43_1, other.q43_1))
      return false;
    return true;
  };
  protoOf(AnnotatedString).hashCode = function () {
    var result = getStringHashCode(this.n43_1);
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.o43_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    var tmp_0 = imul(31, result);
    var tmp2_safe_receiver = this.p43_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : hashCode(tmp2_safe_receiver);
    result = tmp_0 + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    var tmp_1 = imul(31, result);
    var tmp4_safe_receiver = this.q43_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : hashCode(tmp4_safe_receiver);
    result = tmp_1 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
    return result;
  };
  protoOf(AnnotatedString).toString = function () {
    return this.n43_1;
  };
  function filterRanges(ranges, start, end) {
    _init_properties_AnnotatedString_kt__ww2pyh();
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(start <= end)) {
      // Inline function 'androidx.compose.ui.text.filterRanges.<anonymous>' call
      var message = 'start (' + start + ') should be less than or equal to end (' + end + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    if (ranges == null) {
      return null;
    } else {
      tmp = ranges;
    }
    var nonNullRange = tmp;
    // Inline function 'kotlin.collections.ifEmpty' call
    // Inline function 'androidx.compose.ui.util.fastMap' call
    // Inline function 'androidx.compose.ui.util.fastFilter' call
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(nonNullRange.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = nonNullRange.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = nonNullRange.n(index);
        // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.filterRanges.<anonymous>' call
        if (intersect(start, end, item.j43_1, item.k43_1)) {
          // Inline function 'kotlin.collections.plusAssign' call
          target.a1(item);
        }
      }
       while (inductionVariable <= last);
    // Inline function 'kotlin.contracts.contract' call
    var target_0 = ArrayList_init_$Create$(target.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_0 = 0;
    var last_0 = target.m() - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var item_0 = target.n(index_0);
        // Inline function 'androidx.compose.ui.util.fastMap.<anonymous>' call
        // Inline function 'kotlin.collections.plusAssign' call
        // Inline function 'androidx.compose.ui.text.filterRanges.<anonymous>' call
        // Inline function 'kotlin.comparisons.maxOf' call
        var b = item_0.j43_1;
        var tmp_0 = Math.max(start, b) - start | 0;
        // Inline function 'kotlin.comparisons.minOf' call
        var b_0 = item_0.k43_1;
        var tmp$ret$4 = Math.min(end, b_0);
        var element = new Range(item_0.i43_1, tmp_0, tmp$ret$4 - start | 0, item_0.l43_1);
        target_0.a1(element);
      }
       while (inductionVariable_0 <= last_0);
    var tmp_1;
    if (target_0.u()) {
      // Inline function 'androidx.compose.ui.text.filterRanges.<anonymous>' call
      tmp_1 = null;
    } else {
      tmp_1 = target_0;
    }
    return tmp_1;
  }
  function intersect(lStart, lEnd, rStart, rEnd) {
    _init_properties_AnnotatedString_kt__ww2pyh();
    var tmp;
    var tmp_0;
    // Inline function 'kotlin.comparisons.maxOf' call
    var tmp_1 = Math.max(lStart, rStart);
    // Inline function 'kotlin.comparisons.minOf' call
    if (tmp_1 < Math.min(lEnd, rEnd)) {
      tmp_0 = true;
    } else {
      tmp_0 = contains(lStart, lEnd, rStart, rEnd);
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = contains(rStart, rEnd, lStart, lEnd);
    }
    return tmp;
  }
  function getLocalSpanStyles(_this__u8e3s4, start, end) {
    _init_properties_AnnotatedString_kt__ww2pyh();
    if (start === end)
      return null;
    var tmp0_elvis_lhs = _this__u8e3s4.o43_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var spanStyles = tmp;
    if (start === 0 ? end >= _this__u8e3s4.n43_1.length : false) {
      return spanStyles;
    }
    // Inline function 'androidx.compose.ui.util.fastMap' call
    // Inline function 'androidx.compose.ui.util.fastFilter' call
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(spanStyles.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = spanStyles.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = spanStyles.n(index);
        // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.getLocalSpanStyles.<anonymous>' call
        if (intersect(start, end, item.j43_1, item.k43_1)) {
          // Inline function 'kotlin.collections.plusAssign' call
          target.a1(item);
        }
      }
       while (inductionVariable <= last);
    // Inline function 'kotlin.contracts.contract' call
    var target_0 = ArrayList_init_$Create$(target.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_0 = 0;
    var last_0 = target.m() - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var item_0 = target.n(index_0);
        // Inline function 'androidx.compose.ui.util.fastMap.<anonymous>' call
        // Inline function 'kotlin.collections.plusAssign' call
        // Inline function 'androidx.compose.ui.text.getLocalSpanStyles.<anonymous>' call
        var element = Range_init_$Create$(item_0.i43_1, coerceIn(item_0.j43_1, start, end) - start | 0, coerceIn(item_0.k43_1, start, end) - start | 0);
        target_0.a1(element);
      }
       while (inductionVariable_0 <= last_0);
    return target_0;
  }
  function contains(baseStart, baseEnd, targetStart, targetEnd) {
    _init_properties_AnnotatedString_kt__ww2pyh();
    return (baseStart <= targetStart ? targetEnd <= baseEnd : false) ? !(baseEnd === targetEnd) ? true : targetStart === targetEnd === (baseStart === baseEnd) : false;
  }
  function substringWithoutParagraphStyles(_this__u8e3s4, start, end) {
    _init_properties_AnnotatedString_kt__ww2pyh();
    var tmp;
    if (!(start === end)) {
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = _this__u8e3s4.n43_1.substring(start, end);
    } else {
      tmp = '';
    }
    return new AnnotatedString(tmp, getLocalSpanStyles(_this__u8e3s4, start, end));
  }
  function normalizedParagraphStyles(_this__u8e3s4, defaultParagraphStyle) {
    _init_properties_AnnotatedString_kt__ww2pyh();
    var length = _this__u8e3s4.n43_1.length;
    var tmp0_elvis_lhs = _this__u8e3s4.p43_1;
    var paragraphStyles = tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
    var lastOffset = 0;
    // Inline function 'kotlin.collections.mutableListOf' call
    var result = ArrayList_init_$Create$_0();
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = paragraphStyles.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = paragraphStyles.n(index);
        // Inline function 'androidx.compose.ui.text.normalizedParagraphStyles.<anonymous>' call
        var style = item.re();
        var start = item.se();
        var end = item.s41();
        if (!(start === lastOffset)) {
          result.a1(Range_init_$Create$(defaultParagraphStyle, lastOffset, start));
        }
        result.a1(Range_init_$Create$(defaultParagraphStyle.b44(style), start, end));
        lastOffset = end;
      }
       while (inductionVariable <= last);
    if (!(lastOffset === length)) {
      result.a1(Range_init_$Create$(defaultParagraphStyle, lastOffset, length));
    }
    if (result.u()) {
      result.a1(Range_init_$Create$(defaultParagraphStyle, 0, 0));
    }
    return result;
  }
  var properties_initialized_AnnotatedString_kt_um06op;
  function _init_properties_AnnotatedString_kt__ww2pyh() {
    if (!properties_initialized_AnnotatedString_kt_um06op) {
      properties_initialized_AnnotatedString_kt_um06op = true;
      EmptyAnnotatedString = AnnotatedString_init_$Create$('');
    }
  }
  function _get_annotatedString__kqljtk($this) {
    return $this.h44_1.c44_1;
  }
  function requireIndexInRangeInclusiveEnd($this, offset) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= offset ? offset <= _get_annotatedString__kqljtk($this).n43_1.length : false)) {
      // Inline function 'androidx.compose.ui.text.MultiParagraph.requireIndexInRangeInclusiveEnd.<anonymous>' call
      var message = 'offset(' + offset + ') is out of bounds [0, ' + _get_annotatedString__kqljtk($this).a() + ']';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  function requireLineIndexInRange($this, lineIndex) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= lineIndex ? lineIndex < $this.m44_1 : false)) {
      // Inline function 'androidx.compose.ui.text.MultiParagraph.requireLineIndexInRange.<anonymous>' call
      var message = 'lineIndex(' + lineIndex + ') is out of bounds [0, ' + $this.m44_1 + ')';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  function MultiParagraph$getPathForRange$lambda($path, $start, $end) {
    return function (paragraphInfo) {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      $path.m3w(paragraphInfo.y44(paragraphInfo.p44_1.x44(paragraphInfo.w44($start), paragraphInfo.w44($end))));
      return Unit_instance;
    };
  }
  function MultiParagraph(intrinsics, constraints, maxLines, ellipsis) {
    maxLines = maxLines === VOID ? get_DefaultMaxLines() : maxLines;
    ellipsis = ellipsis === VOID ? false : ellipsis;
    this.h44_1 = intrinsics;
    this.i44_1 = maxLines;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(_Constraints___get_minWidth__impl__hi9lfi(constraints) === 0 ? _Constraints___get_minHeight__impl__ev4bgx(constraints) === 0 : false)) {
      // Inline function 'androidx.compose.ui.text.MultiParagraph.<anonymous>' call
      var message = 'Setting Constraints.minWidth and Constraints.minHeight is not supported, these should be the default zero values instead.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var currentHeight = 0.0;
    var currentLineCount = 0;
    var didExceedMaxLines = false;
    // Inline function 'kotlin.collections.mutableListOf' call
    var paragraphInfoList = ArrayList_init_$Create$_0();
    var infoList = this.h44_1.g44_1;
    var inductionVariable = 0;
    var last = infoList.m() - 1 | 0;
    if (inductionVariable <= last)
      $l$loop: do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var paragraphInfo = infoList.n(index);
        var tmp = _Constraints___get_maxWidth__impl__uuyqc(constraints);
        var tmp_0;
        if (_Constraints___get_hasBoundedHeight__impl__bsh4rw(constraints)) {
          tmp_0 = coerceAtLeast(_Constraints___get_maxHeight__impl__dt3e8z(constraints) - ceilToInt(currentHeight) | 0, 0);
        } else {
          tmp_0 = _Constraints___get_maxHeight__impl__dt3e8z(constraints);
        }
        var paragraph = Paragraph(paragraphInfo.z44_1, Constraints(VOID, tmp, VOID, tmp_0), this.i44_1 - currentLineCount | 0, ellipsis);
        var paragraphTop = currentHeight;
        var paragraphBottom = currentHeight + paragraph.f34();
        currentHeight = paragraphBottom;
        var startLineIndex = currentLineCount;
        var endLineIndex = startLineIndex + paragraph.c45() | 0;
        currentLineCount = endLineIndex;
        paragraphInfoList.a1(new ParagraphInfo(paragraph, paragraphInfo.a45_1, paragraphInfo.b45_1, startLineIndex, endLineIndex, paragraphTop, paragraphBottom));
        if (paragraph.d45() ? true : endLineIndex === this.i44_1 ? !(index === get_lastIndex(this.h44_1.g44_1)) : false) {
          didExceedMaxLines = true;
          break $l$loop;
        }
      }
       while (inductionVariable <= last);
    this.l44_1 = currentHeight;
    this.m44_1 = currentLineCount;
    this.j44_1 = didExceedMaxLines;
    this.o44_1 = paragraphInfoList;
    this.k44_1 = _Constraints___get_maxWidth__impl__uuyqc(constraints);
    var tmp_1 = this;
    // Inline function 'kotlin.let' call
    // Inline function 'androidx.compose.ui.util.fastFlatMap' call
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(paragraphInfoList.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_0 = 0;
    var last_0 = paragraphInfoList.m() - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var item = paragraphInfoList.n(index_0);
        // Inline function 'androidx.compose.ui.util.fastFlatMap.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.MultiParagraph.<anonymous>' call
        // Inline function 'kotlin.with' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'androidx.compose.ui.text.MultiParagraph.<anonymous>.<anonymous>' call
        // Inline function 'androidx.compose.ui.util.fastMap' call
        var this_0 = item.p44_1.e45();
        // Inline function 'kotlin.contracts.contract' call
        var target_0 = ArrayList_init_$Create$(this_0.m());
        // Inline function 'androidx.compose.ui.util.fastForEach' call
        // Inline function 'kotlin.contracts.contract' call
        var inductionVariable_1 = 0;
        var last_1 = this_0.m() - 1 | 0;
        if (inductionVariable_1 <= last_1)
          do {
            var index_1 = inductionVariable_1;
            inductionVariable_1 = inductionVariable_1 + 1 | 0;
            var item_0 = this_0.n(index_1);
            // Inline function 'androidx.compose.ui.util.fastMap.<anonymous>' call
            // Inline function 'kotlin.collections.plusAssign' call
            // Inline function 'androidx.compose.ui.text.MultiParagraph.<anonymous>.<anonymous>.<anonymous>' call
            var element = item_0 == null ? null : item.f45(item_0);
            target_0.a1(element);
          }
           while (inductionVariable_1 <= last_1);
        var list = target_0;
        addAll(target, list);
      }
       while (inductionVariable_0 <= last_0);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.<anonymous>' call
    var tmp_2;
    if (target.m() < this.h44_1.d44_1.m()) {
      // Inline function 'kotlin.collections.List' call
      // Inline function 'kotlin.collections.MutableList' call
      var size = this.h44_1.d44_1.m() - target.m() | 0;
      var list_0 = ArrayList_init_$Create$(size);
      // Inline function 'kotlin.repeat' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_2 = 0;
      if (inductionVariable_2 < size)
        do {
          var index_2 = inductionVariable_2;
          inductionVariable_2 = inductionVariable_2 + 1 | 0;
          // Inline function 'kotlin.collections.MutableList.<anonymous>' call
          // Inline function 'androidx.compose.ui.text.MultiParagraph.<anonymous>.<anonymous>' call
          list_0.a1(null);
        }
         while (inductionVariable_2 < size);
      tmp_2 = plus(target, list_0);
    } else {
      tmp_2 = target;
    }
    tmp_1.n44_1 = tmp_2;
  }
  protoOf(MultiParagraph).g45 = function () {
    var tmp;
    if (this.o44_1.u()) {
      tmp = 0.0;
    } else {
      tmp = this.o44_1.n(0).p44_1.g45();
    }
    return tmp;
  };
  protoOf(MultiParagraph).h45 = function () {
    var tmp;
    if (this.o44_1.u()) {
      tmp = 0.0;
    } else {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.MultiParagraph.<get-lastBaseline>.<anonymous>' call
      var $this$with = last(this.o44_1);
      tmp = $this$with.i45($this$with.p44_1.h45());
    }
    return tmp;
  };
  protoOf(MultiParagraph).j45 = function (canvas, color, shadow, decoration, drawStyle, blendMode) {
    canvas.i3q();
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_0 = this.o44_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = this_0.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = this_0.n(index);
        // Inline function 'androidx.compose.ui.text.MultiParagraph.paint.<anonymous>' call
        item.p44_1.j45(canvas, color, shadow, decoration, drawStyle, blendMode);
        canvas.l3q(0.0, item.p44_1.f34());
      }
       while (inductionVariable <= last);
    canvas.j3q();
  };
  protoOf(MultiParagraph).k45 = function (canvas, color, shadow, decoration, drawStyle, blendMode, $super) {
    color = color === VOID ? Companion_getInstance().w3s_1 : color;
    shadow = shadow === VOID ? null : shadow;
    decoration = decoration === VOID ? null : decoration;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    blendMode = blendMode === VOID ? Companion_getInstance_0().z3v_1 : blendMode;
    var tmp;
    if ($super === VOID) {
      this.j45(canvas, color, shadow, decoration, drawStyle, blendMode);
      tmp = Unit_instance;
    } else {
      tmp = $super.j45.call(this, canvas, new Color(color), shadow, decoration, drawStyle, new BlendMode(blendMode));
    }
    return tmp;
  };
  protoOf(MultiParagraph).l45 = function (canvas, brush, alpha, shadow, decoration, drawStyle, blendMode) {
    drawMultiParagraph(this, canvas, brush, alpha, shadow, decoration, drawStyle, blendMode);
  };
  protoOf(MultiParagraph).m45 = function (canvas, brush, alpha, shadow, decoration, drawStyle, blendMode, $super) {
    var tmp;
    if (alpha === VOID) {
      tmp = NaN;
    } else {
      tmp = alpha;
    }
    alpha = tmp;
    shadow = shadow === VOID ? null : shadow;
    decoration = decoration === VOID ? null : decoration;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    blendMode = blendMode === VOID ? Companion_getInstance_0().z3v_1 : blendMode;
    var tmp_0;
    if ($super === VOID) {
      this.l45(canvas, brush, alpha, shadow, decoration, drawStyle, blendMode);
      tmp_0 = Unit_instance;
    } else {
      tmp_0 = $super.l45.call(this, canvas, brush, alpha, shadow, decoration, drawStyle, new BlendMode(blendMode));
    }
    return tmp_0;
  };
  protoOf(MultiParagraph).x44 = function (start, end) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!((0 <= start ? start <= end : false) ? end <= _get_annotatedString__kqljtk(this).n43_1.length : false)) {
      // Inline function 'androidx.compose.ui.text.MultiParagraph.getPathForRange.<anonymous>' call
      var message = 'Start(' + start + ') or End(' + end + ') is out of range [0..' + _get_annotatedString__kqljtk(this).n43_1.length + '),' + ' or start > end!';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (start === end)
      return Path();
    var path = Path();
    var tmp = TextRange_0(start, end);
    findParagraphsByRange(this.o44_1, tmp, MultiParagraph$getPathForRange$lambda(path, start, end));
    return path;
  };
  protoOf(MultiParagraph).n45 = function (vertical) {
    var paragraphIndex = vertical <= 0.0 ? 0 : vertical >= this.l44_1 ? get_lastIndex(this.o44_1) : findParagraphByY(this.o44_1, vertical);
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getLineForVerticalPosition.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    var tmp;
    if ($this$with.a() === 0) {
      tmp = $this$with.s44_1;
    } else {
      tmp = $this$with.p45($this$with.p44_1.n45($this$with.o45(vertical)));
    }
    return tmp;
  };
  protoOf(MultiParagraph).q45 = function (offset) {
    requireIndexInRangeInclusiveEnd(this, offset);
    var tmp;
    if (offset === _get_annotatedString__kqljtk(this).a()) {
      tmp = get_lastIndex(this.o44_1);
    } else {
      tmp = findParagraphByIndex(this.o44_1, offset);
    }
    var paragraphIndex = tmp;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getParagraphDirection.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.p44_1.q45($this$with.w44(offset));
  };
  protoOf(MultiParagraph).r45 = function (offset) {
    requireIndexInRangeInclusiveEnd(this, offset);
    var tmp;
    if (offset === _get_annotatedString__kqljtk(this).a()) {
      tmp = get_lastIndex(this.o44_1);
    } else {
      tmp = findParagraphByIndex(this.o44_1, offset);
    }
    var paragraphIndex = tmp;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getBidiRunDirection.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.p44_1.r45($this$with.w44(offset));
  };
  protoOf(MultiParagraph).s45 = function (offset) {
    requireIndexInRangeInclusiveEnd(this, offset);
    var tmp;
    if (offset === _get_annotatedString__kqljtk(this).a()) {
      tmp = get_lastIndex(this.o44_1);
    } else {
      tmp = findParagraphByIndex(this.o44_1, offset);
    }
    var paragraphIndex = tmp;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getWordBoundary.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.t45($this$with.p44_1.s45($this$with.w44(offset)));
  };
  protoOf(MultiParagraph).u45 = function (offset) {
    var tmp;
    if (offset >= _get_annotatedString__kqljtk(this).a()) {
      tmp = get_lastIndex(this.o44_1);
    } else if (offset < 0) {
      tmp = 0;
    } else {
      tmp = findParagraphByIndex(this.o44_1, offset);
    }
    var paragraphIndex = tmp;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getLineForOffset.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.p45($this$with.p44_1.u45($this$with.w44(offset)));
  };
  protoOf(MultiParagraph).v45 = function (lineIndex) {
    requireLineIndexInRange(this, lineIndex);
    var paragraphIndex = findParagraphByLineIndex(this.o44_1, lineIndex);
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getLineTop.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.i45($this$with.p44_1.v45($this$with.w45(lineIndex)));
  };
  protoOf(MultiParagraph).x45 = function (lineIndex) {
    requireLineIndexInRange(this, lineIndex);
    var paragraphIndex = findParagraphByLineIndex(this.o44_1, lineIndex);
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getLineStart.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.y45($this$with.p44_1.x45($this$with.w45(lineIndex)));
  };
  protoOf(MultiParagraph).z45 = function (lineIndex, visibleEnd) {
    requireLineIndexInRange(this, lineIndex);
    var paragraphIndex = findParagraphByLineIndex(this.o44_1, lineIndex);
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.MultiParagraph.getLineEnd.<anonymous>' call
    var $this$with = this.o44_1.n(paragraphIndex);
    return $this$with.y45($this$with.p44_1.z45($this$with.w45(lineIndex), visibleEnd));
  };
  function ParagraphInfo(paragraph, startIndex, endIndex, startLineIndex, endLineIndex, top, bottom) {
    startLineIndex = startLineIndex === VOID ? -1 : startLineIndex;
    endLineIndex = endLineIndex === VOID ? -1 : endLineIndex;
    top = top === VOID ? -1.0 : top;
    bottom = bottom === VOID ? -1.0 : bottom;
    this.p44_1 = paragraph;
    this.q44_1 = startIndex;
    this.r44_1 = endIndex;
    this.s44_1 = startLineIndex;
    this.t44_1 = endLineIndex;
    this.u44_1 = top;
    this.v44_1 = bottom;
  }
  protoOf(ParagraphInfo).a = function () {
    return this.r44_1 - this.q44_1 | 0;
  };
  protoOf(ParagraphInfo).w44 = function (_this__u8e3s4) {
    return coerceIn(_this__u8e3s4, this.q44_1, this.r44_1) - this.q44_1 | 0;
  };
  protoOf(ParagraphInfo).y45 = function (_this__u8e3s4) {
    return _this__u8e3s4 + this.q44_1 | 0;
  };
  protoOf(ParagraphInfo).w45 = function (_this__u8e3s4) {
    return _this__u8e3s4 - this.s44_1 | 0;
  };
  protoOf(ParagraphInfo).p45 = function (_this__u8e3s4) {
    return _this__u8e3s4 + this.s44_1 | 0;
  };
  protoOf(ParagraphInfo).i45 = function (_this__u8e3s4) {
    return _this__u8e3s4 + this.u44_1;
  };
  protoOf(ParagraphInfo).o45 = function (_this__u8e3s4) {
    return _this__u8e3s4 - this.u44_1;
  };
  protoOf(ParagraphInfo).f45 = function (_this__u8e3s4) {
    return _this__u8e3s4.h34(Offset(0.0, this.u44_1));
  };
  protoOf(ParagraphInfo).y44 = function (_this__u8e3s4) {
    _this__u8e3s4.n3w(Offset(0.0, this.u44_1));
    return _this__u8e3s4;
  };
  protoOf(ParagraphInfo).t45 = function (_this__u8e3s4) {
    return TextRange_0(this.y45(_TextRange___get_start__impl__ww4t90(_this__u8e3s4)), this.y45(_TextRange___get_end__impl__gcdxpp(_this__u8e3s4)));
  };
  protoOf(ParagraphInfo).toString = function () {
    return 'ParagraphInfo(paragraph=' + this.p44_1 + ', startIndex=' + this.q44_1 + ', endIndex=' + this.r44_1 + ', startLineIndex=' + this.s44_1 + ', endLineIndex=' + this.t44_1 + ', top=' + this.u44_1 + ', bottom=' + this.v44_1 + ')';
  };
  protoOf(ParagraphInfo).hashCode = function () {
    var result = hashCode(this.p44_1);
    result = imul(result, 31) + this.q44_1 | 0;
    result = imul(result, 31) + this.r44_1 | 0;
    result = imul(result, 31) + this.s44_1 | 0;
    result = imul(result, 31) + this.t44_1 | 0;
    result = imul(result, 31) + getNumberHashCode(this.u44_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.v44_1) | 0;
    return result;
  };
  protoOf(ParagraphInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ParagraphInfo))
      return false;
    var tmp0_other_with_cast = other instanceof ParagraphInfo ? other : THROW_CCE();
    if (!equals(this.p44_1, tmp0_other_with_cast.p44_1))
      return false;
    if (!(this.q44_1 === tmp0_other_with_cast.q44_1))
      return false;
    if (!(this.r44_1 === tmp0_other_with_cast.r44_1))
      return false;
    if (!(this.s44_1 === tmp0_other_with_cast.s44_1))
      return false;
    if (!(this.t44_1 === tmp0_other_with_cast.t44_1))
      return false;
    if (!equals(this.u44_1, tmp0_other_with_cast.u44_1))
      return false;
    if (!equals(this.v44_1, tmp0_other_with_cast.v44_1))
      return false;
    return true;
  };
  function findParagraphsByRange(paragraphInfoList, range, action) {
    var paragraphIndex = findParagraphByIndex(paragraphInfoList, _TextRange___get_min__impl__uu95c4(range));
    var inductionVariable = paragraphIndex;
    var last = paragraphInfoList.m();
    if (inductionVariable < last)
      $l$loop_0: do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var paragraph = paragraphInfoList.n(i);
        if (paragraph.q44_1 >= _TextRange___get_max__impl__owm8m(range))
          break $l$loop_0;
        if (paragraph.q44_1 === paragraph.r44_1)
          continue $l$loop_0;
        action(paragraph);
      }
       while (inductionVariable < last);
  }
  function findParagraphByY(paragraphInfoList, y) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.text.fastBinarySearch' call
      var low = 0;
      var high = paragraphInfoList.m() - 1 | 0;
      while (low <= high) {
        var mid = (low + high | 0) >>> 1 | 0;
        var midVal = paragraphInfoList.n(mid);
        // Inline function 'androidx.compose.ui.text.findParagraphByY.<anonymous>' call
        var cmp = midVal.u44_1 > y ? 1 : midVal.v44_1 <= y ? -1 : 0;
        if (cmp < 0)
          low = mid + 1 | 0;
        else if (cmp > 0)
          high = mid - 1 | 0;
        else {
          tmp$ret$1 = mid;
          break $l$block;
        }
      }
      tmp$ret$1 = -(low + 1 | 0) | 0;
    }
    return tmp$ret$1;
  }
  function findParagraphByIndex(paragraphInfoList, index) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.text.fastBinarySearch' call
      var low = 0;
      var high = paragraphInfoList.m() - 1 | 0;
      while (low <= high) {
        var mid = (low + high | 0) >>> 1 | 0;
        var midVal = paragraphInfoList.n(mid);
        // Inline function 'androidx.compose.ui.text.findParagraphByIndex.<anonymous>' call
        var cmp = midVal.q44_1 > index ? 1 : midVal.r44_1 <= index ? -1 : 0;
        if (cmp < 0)
          low = mid + 1 | 0;
        else if (cmp > 0)
          high = mid - 1 | 0;
        else {
          tmp$ret$1 = mid;
          break $l$block;
        }
      }
      tmp$ret$1 = -(low + 1 | 0) | 0;
    }
    return tmp$ret$1;
  }
  function findParagraphByLineIndex(paragraphInfoList, lineIndex) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.text.fastBinarySearch' call
      var low = 0;
      var high = paragraphInfoList.m() - 1 | 0;
      while (low <= high) {
        var mid = (low + high | 0) >>> 1 | 0;
        var midVal = paragraphInfoList.n(mid);
        // Inline function 'androidx.compose.ui.text.findParagraphByLineIndex.<anonymous>' call
        var cmp = midVal.s44_1 > lineIndex ? 1 : midVal.t44_1 <= lineIndex ? -1 : 0;
        if (cmp < 0)
          low = mid + 1 | 0;
        else if (cmp > 0)
          high = mid - 1 | 0;
        else {
          tmp$ret$1 = mid;
          break $l$block;
        }
      }
      tmp$ret$1 = -(low + 1 | 0) | 0;
    }
    return tmp$ret$1;
  }
  function resolveTextDirection($this, style, defaultStyle) {
    return !(style.t43_1 === Companion_getInstance_32().g46_1) ? style : style.a46(VOID, defaultStyle.t43_1);
  }
  function MultiParagraphIntrinsics$minIntrinsicWidth$delegate$lambda(this$0) {
    return function () {
      var tmp$ret$0;
      $l$block: {
        // Inline function 'androidx.compose.ui.util.fastMaxBy' call
        var this_0 = this$0.g44_1;
        // Inline function 'kotlin.contracts.contract' call
        if (this_0.u()) {
          tmp$ret$0 = null;
          break $l$block;
        }
        var maxElem = this_0.n(0);
        // Inline function 'androidx.compose.ui.text.MultiParagraphIntrinsics.minIntrinsicWidth$delegate.<anonymous>.<anonymous>' call
        var maxValue = maxElem.z44_1.w3j();
        var inductionVariable = 1;
        var last = get_lastIndex(this_0);
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var e = this_0.n(i);
            // Inline function 'androidx.compose.ui.text.MultiParagraphIntrinsics.minIntrinsicWidth$delegate.<anonymous>.<anonymous>' call
            var v = e.z44_1.w3j();
            if (compareTo(maxValue, v) < 0) {
              maxElem = e;
              maxValue = v;
            }
          }
           while (!(i === last));
        tmp$ret$0 = maxElem;
      }
      var tmp0_safe_receiver = tmp$ret$0;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z44_1;
      var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.w3j();
      return tmp2_elvis_lhs == null ? 0.0 : tmp2_elvis_lhs;
    };
  }
  function MultiParagraphIntrinsics$maxIntrinsicWidth$delegate$lambda(this$0) {
    return function () {
      var tmp$ret$0;
      $l$block: {
        // Inline function 'androidx.compose.ui.util.fastMaxBy' call
        var this_0 = this$0.g44_1;
        // Inline function 'kotlin.contracts.contract' call
        if (this_0.u()) {
          tmp$ret$0 = null;
          break $l$block;
        }
        var maxElem = this_0.n(0);
        // Inline function 'androidx.compose.ui.text.MultiParagraphIntrinsics.maxIntrinsicWidth$delegate.<anonymous>.<anonymous>' call
        var maxValue = maxElem.z44_1.x3j();
        var inductionVariable = 1;
        var last = get_lastIndex(this_0);
        if (inductionVariable <= last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var e = this_0.n(i);
            // Inline function 'androidx.compose.ui.text.MultiParagraphIntrinsics.maxIntrinsicWidth$delegate.<anonymous>.<anonymous>' call
            var v = e.z44_1.x3j();
            if (compareTo(maxValue, v) < 0) {
              maxElem = e;
              maxValue = v;
            }
          }
           while (!(i === last));
        tmp$ret$0 = maxElem;
      }
      var tmp0_safe_receiver = tmp$ret$0;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z44_1;
      var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.x3j();
      return tmp2_elvis_lhs == null ? 0.0 : tmp2_elvis_lhs;
    };
  }
  function MultiParagraphIntrinsics(annotatedString, style, placeholders, density, fontFamilyResolver) {
    this.c44_1 = annotatedString;
    this.d44_1 = placeholders;
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_NONE_getInstance();
    tmp.e44_1 = lazy(tmp_0, MultiParagraphIntrinsics$minIntrinsicWidth$delegate$lambda(this));
    var tmp_1 = this;
    var tmp_2 = LazyThreadSafetyMode_NONE_getInstance();
    tmp_1.f44_1 = lazy(tmp_2, MultiParagraphIntrinsics$maxIntrinsicWidth$delegate$lambda(this));
    var paragraphStyle = style.k46();
    var tmp_3 = this;
    // Inline function 'androidx.compose.ui.text.mapEachParagraphStyle' call
    var this_0 = this.c44_1;
    // Inline function 'androidx.compose.ui.util.fastMap' call
    var this_1 = normalizedParagraphStyles(this_0, paragraphStyle);
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(this_1.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = this_1.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = this_1.n(index);
        // Inline function 'androidx.compose.ui.util.fastMap.<anonymous>' call
        // Inline function 'kotlin.collections.plusAssign' call
        // Inline function 'androidx.compose.ui.text.mapEachParagraphStyle.<anonymous>' call
        var annotatedString_0 = substringWithoutParagraphStyles(this_0, item.j43_1, item.k43_1);
        // Inline function 'androidx.compose.ui.text.MultiParagraphIntrinsics.<anonymous>' call
        var currentParagraphStyle = resolveTextDirection(this, item.i43_1, paragraphStyle);
        var element = new ParagraphIntrinsicInfo(ParagraphIntrinsics_0(annotatedString_0.n43_1, style.l46(currentParagraphStyle), annotatedString_0.r43(), getLocalPlaceholders(this.d44_1, item.j43_1, item.k43_1), density, fontFamilyResolver), item.j43_1, item.k43_1);
        target.a1(element);
      }
       while (inductionVariable <= last);
    tmp_3.g44_1 = target;
  }
  protoOf(MultiParagraphIntrinsics).w3j = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.e44_1;
    minIntrinsicWidth$factory();
    return this_0.s2();
  };
  protoOf(MultiParagraphIntrinsics).x3j = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.f44_1;
    maxIntrinsicWidth$factory();
    return this_0.s2();
  };
  protoOf(MultiParagraphIntrinsics).m46 = function () {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.util.fastAny' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      var this_0 = this.g44_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      var last = this_0.m() - 1 | 0;
      if (inductionVariable <= last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var item = this_0.n(index);
          // Inline function 'androidx.compose.ui.util.fastAny.<anonymous>' call
          // Inline function 'androidx.compose.ui.text.MultiParagraphIntrinsics.<get-hasStaleResolvedFonts>.<anonymous>' call
          if (item.z44_1.m46()) {
            tmp$ret$1 = true;
            break $l$block;
          }
        }
         while (inductionVariable <= last);
      tmp$ret$1 = false;
    }
    return tmp$ret$1;
  };
  function ParagraphIntrinsicInfo(intrinsics, startIndex, endIndex) {
    this.z44_1 = intrinsics;
    this.a45_1 = startIndex;
    this.b45_1 = endIndex;
  }
  protoOf(ParagraphIntrinsicInfo).toString = function () {
    return 'ParagraphIntrinsicInfo(intrinsics=' + this.z44_1 + ', startIndex=' + this.a45_1 + ', endIndex=' + this.b45_1 + ')';
  };
  protoOf(ParagraphIntrinsicInfo).hashCode = function () {
    var result = hashCode(this.z44_1);
    result = imul(result, 31) + this.a45_1 | 0;
    result = imul(result, 31) + this.b45_1 | 0;
    return result;
  };
  protoOf(ParagraphIntrinsicInfo).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ParagraphIntrinsicInfo))
      return false;
    var tmp0_other_with_cast = other instanceof ParagraphIntrinsicInfo ? other : THROW_CCE();
    if (!equals(this.z44_1, tmp0_other_with_cast.z44_1))
      return false;
    if (!(this.a45_1 === tmp0_other_with_cast.a45_1))
      return false;
    if (!(this.b45_1 === tmp0_other_with_cast.b45_1))
      return false;
    return true;
  };
  function getLocalPlaceholders(_this__u8e3s4, start, end) {
    // Inline function 'androidx.compose.ui.util.fastMap' call
    // Inline function 'androidx.compose.ui.util.fastFilter' call
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(_this__u8e3s4.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = _this__u8e3s4.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = _this__u8e3s4.n(index);
        // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.getLocalPlaceholders.<anonymous>' call
        if (intersect(start, end, item.j43_1, item.k43_1)) {
          // Inline function 'kotlin.collections.plusAssign' call
          target.a1(item);
        }
      }
       while (inductionVariable <= last);
    // Inline function 'kotlin.contracts.contract' call
    var target_0 = ArrayList_init_$Create$(target.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_0 = 0;
    var last_0 = target.m() - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var item_0 = target.n(index_0);
        // Inline function 'androidx.compose.ui.util.fastMap.<anonymous>' call
        // Inline function 'kotlin.collections.plusAssign' call
        // Inline function 'androidx.compose.ui.text.getLocalPlaceholders.<anonymous>' call
        // Inline function 'kotlin.require' call
        // Inline function 'kotlin.contracts.contract' call
        if (!(start <= item_0.j43_1 ? item_0.k43_1 <= end : false)) {
          // Inline function 'androidx.compose.ui.text.getLocalPlaceholders.<anonymous>.<anonymous>' call
          var message = 'placeholder can not overlap with paragraph.';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }
        var element = Range_init_$Create$(item_0.i43_1, item_0.j43_1 - start | 0, item_0.k43_1 - start | 0);
        target_0.a1(element);
      }
       while (inductionVariable_0 <= last_0);
    return target_0;
  }
  function minIntrinsicWidth$factory() {
    return getPropertyCallableRef('minIntrinsicWidth', 1, KProperty1, function (receiver) {
      return receiver.w3j();
    }, null);
  }
  function maxIntrinsicWidth$factory() {
    return getPropertyCallableRef('maxIntrinsicWidth', 1, KProperty1, function (receiver) {
      return receiver.x3j();
    }, null);
  }
  function get_DefaultMaxLines() {
    return DefaultMaxLines;
  }
  var DefaultMaxLines;
  function ceilToInt(_this__u8e3s4) {
    // Inline function 'kotlin.math.ceil' call
    var tmp$ret$0 = Math.ceil(_this__u8e3s4);
    return numberToInt(tmp$ret$0);
  }
  function Paragraph(paragraphIntrinsics, constraints, maxLines, ellipsis) {
    maxLines = maxLines === VOID ? 2147483647 : maxLines;
    ellipsis = ellipsis === VOID ? false : ellipsis;
    return ActualParagraph(paragraphIntrinsics, maxLines, ellipsis, constraints);
  }
  function Paragraph_0(text, style, constraints, density, fontFamilyResolver, spanStyles, placeholders, maxLines, ellipsis) {
    var tmp;
    if (spanStyles === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp = emptyList();
    } else {
      tmp = spanStyles;
    }
    spanStyles = tmp;
    var tmp_0;
    if (placeholders === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp_0 = emptyList();
    } else {
      tmp_0 = placeholders;
    }
    placeholders = tmp_0;
    maxLines = maxLines === VOID ? 2147483647 : maxLines;
    ellipsis = ellipsis === VOID ? false : ellipsis;
    return ActualParagraph_0(text, style, spanStyles, placeholders, maxLines, ellipsis, constraints, density, fontFamilyResolver);
  }
  function ParagraphIntrinsics() {
  }
  function ParagraphIntrinsics_0(text, style, spanStyles, placeholders, density, fontFamilyResolver) {
    var tmp;
    if (spanStyles === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp = emptyList();
    } else {
      tmp = spanStyles;
    }
    spanStyles = tmp;
    var tmp_0;
    if (placeholders === VOID) {
      // Inline function 'kotlin.collections.listOf' call
      tmp_0 = emptyList();
    } else {
      tmp_0 = placeholders;
    }
    placeholders = tmp_0;
    return ActualParagraphIntrinsics(text, style, spanStyles, placeholders, density, fontFamilyResolver);
  }
  function get_DefaultLineHeight() {
    _init_properties_ParagraphStyle_kt__lbx7er();
    return DefaultLineHeight;
  }
  var DefaultLineHeight;
  function ParagraphStyle_0(textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) {
    textAlign = textAlign === VOID ? Companion_getInstance_30().t46_1 : textAlign;
    textDirection = textDirection === VOID ? Companion_getInstance_32().g46_1 : textDirection;
    lineHeight = lineHeight === VOID ? Companion_getInstance_1().f37_1 : lineHeight;
    textIndent = textIndent === VOID ? null : textIndent;
    platformStyle = platformStyle === VOID ? null : platformStyle;
    lineHeightStyle = lineHeightStyle === VOID ? null : lineHeightStyle;
    lineBreak = lineBreak === VOID ? Companion_getInstance_40().x46_1 : lineBreak;
    hyphens = hyphens === VOID ? Companion_getInstance_26().a47_1 : hyphens;
    textMotion = textMotion === VOID ? null : textMotion;
    this.s43_1 = textAlign;
    this.t43_1 = textDirection;
    this.u43_1 = lineHeight;
    this.v43_1 = textIndent;
    this.w43_1 = platformStyle;
    this.x43_1 = lineHeightStyle;
    this.y43_1 = lineBreak;
    this.z43_1 = hyphens;
    this.a44_1 = textMotion;
    if (!equals(this.u43_1, Companion_getInstance_1().f37_1)) {
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(_TextUnit___get_value__impl__hpbx0k(this.u43_1) >= 0.0)) {
        // Inline function 'androidx.compose.ui.text.ParagraphStyle.<anonymous>' call
        var message = "lineHeight can't be negative (" + _TextUnit___get_value__impl__hpbx0k(this.u43_1) + ')';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(ParagraphStyle_0).b44 = function (other) {
    if (other == null)
      return this;
    return fastMerge(this, other.s43_1, other.t43_1, other.u43_1, other.v43_1, other.w43_1, other.x43_1, other.y43_1, other.z43_1, other.a44_1);
  };
  protoOf(ParagraphStyle_0).b47 = function (textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) {
    return new ParagraphStyle_0(textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion);
  };
  protoOf(ParagraphStyle_0).a46 = function (textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion, $super) {
    textAlign = textAlign === VOID ? this.s43_1 : textAlign;
    textDirection = textDirection === VOID ? this.t43_1 : textDirection;
    lineHeight = lineHeight === VOID ? this.u43_1 : lineHeight;
    textIndent = textIndent === VOID ? this.v43_1 : textIndent;
    platformStyle = platformStyle === VOID ? this.w43_1 : platformStyle;
    lineHeightStyle = lineHeightStyle === VOID ? this.x43_1 : lineHeightStyle;
    lineBreak = lineBreak === VOID ? this.y43_1 : lineBreak;
    hyphens = hyphens === VOID ? this.z43_1 : hyphens;
    textMotion = textMotion === VOID ? this.a44_1 : textMotion;
    return $super === VOID ? this.b47(textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) : $super.b47.call(this, new TextAlign(textAlign), new TextDirection(textDirection), new TextUnit(lineHeight), textIndent, platformStyle, lineHeightStyle, new LineBreak(lineBreak), new Hyphens(hyphens), textMotion);
  };
  protoOf(ParagraphStyle_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ParagraphStyle_0))
      return false;
    if (!(this.s43_1 === other.s43_1))
      return false;
    if (!(this.t43_1 === other.t43_1))
      return false;
    if (!equals(this.u43_1, other.u43_1))
      return false;
    if (!equals(this.v43_1, other.v43_1))
      return false;
    if (!equals(this.w43_1, other.w43_1))
      return false;
    if (!equals(this.x43_1, other.x43_1))
      return false;
    if (!(this.y43_1 === other.y43_1))
      return false;
    if (!(this.z43_1 === other.z43_1))
      return false;
    if (!equals(this.a44_1, other.a44_1))
      return false;
    return true;
  };
  protoOf(ParagraphStyle_0).hashCode = function () {
    var result = TextAlign__hashCode_impl_s8g35y(this.s43_1);
    result = imul(31, result) + TextDirection__hashCode_impl_g63nwg(this.t43_1) | 0;
    result = imul(31, result) + TextUnit__hashCode_impl_qsmeov(this.u43_1) | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.v43_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    var tmp_0 = imul(31, result);
    var tmp2_safe_receiver = this.w43_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.hashCode();
    result = tmp_0 + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    var tmp_1 = imul(31, result);
    var tmp4_safe_receiver = this.x43_1;
    var tmp5_elvis_lhs = tmp4_safe_receiver == null ? null : tmp4_safe_receiver.hashCode();
    result = tmp_1 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
    result = imul(31, result) + LineBreak__hashCode_impl_ybksn(this.y43_1) | 0;
    result = imul(31, result) + Hyphens__hashCode_impl_yb7t8v(this.z43_1) | 0;
    var tmp_2 = imul(31, result);
    var tmp6_safe_receiver = this.a44_1;
    var tmp7_elvis_lhs = tmp6_safe_receiver == null ? null : hashCode(tmp6_safe_receiver);
    result = tmp_2 + (tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs) | 0;
    return result;
  };
  protoOf(ParagraphStyle_0).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.ParagraphStyle.toString.<anonymous>' call
    this_0.y5('ParagraphStyle(');
    this_0.y5('textAlign=' + new TextAlign(this.s43_1) + ', ');
    this_0.y5('textDirection=' + new TextDirection(this.t43_1) + ', ');
    this_0.y5('lineHeight=' + new TextUnit(this.u43_1) + ', ');
    this_0.y5('textIndent=' + this.v43_1 + ', ');
    this_0.y5('platformStyle=' + this.w43_1 + ', ');
    this_0.y5('lineHeightStyle=' + this.x43_1 + ', ');
    this_0.y5('lineBreak=' + new LineBreak(this.y43_1) + ', ');
    this_0.y5('hyphens=' + new Hyphens(this.z43_1) + ', ');
    this_0.y5('textMotion=' + this.a44_1);
    this_0.y5(')');
    return this_0.toString();
  };
  function fastMerge(_this__u8e3s4, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) {
    _init_properties_ParagraphStyle_kt__lbx7er();
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    var tmp_3;
    var tmp_4;
    var tmp_5;
    var tmp_6;
    if (!(textAlign === Companion_getInstance_30().t46_1) ? !(textAlign === _this__u8e3s4.s43_1) : false) {
      tmp_6 = true;
    } else {
      var tmp_7;
      // Inline function 'androidx.compose.ui.unit.isSpecified' call
      if (!get_isUnspecified(lineHeight)) {
        tmp_7 = !equals(lineHeight, _this__u8e3s4.u43_1);
      } else {
        tmp_7 = false;
      }
      tmp_6 = tmp_7;
    }
    if (tmp_6) {
      tmp_5 = true;
    } else {
      tmp_5 = !(textIndent == null) ? !equals(textIndent, _this__u8e3s4.v43_1) : false;
    }
    if (tmp_5) {
      tmp_4 = true;
    } else {
      tmp_4 = !(textDirection === Companion_getInstance_32().g46_1) ? !(textDirection === _this__u8e3s4.t43_1) : false;
    }
    if (tmp_4) {
      tmp_3 = true;
    } else {
      tmp_3 = !(platformStyle == null) ? !equals(platformStyle, _this__u8e3s4.w43_1) : false;
    }
    if (tmp_3) {
      tmp_2 = true;
    } else {
      tmp_2 = !(lineHeightStyle == null) ? !equals(lineHeightStyle, _this__u8e3s4.x43_1) : false;
    }
    if (tmp_2) {
      tmp_1 = true;
    } else {
      tmp_1 = !(lineBreak === Companion_getInstance_40().x46_1) ? !(lineBreak === _this__u8e3s4.y43_1) : false;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = !(hyphens === Companion_getInstance_26().a47_1) ? !(hyphens === _this__u8e3s4.z43_1) : false;
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = !(textMotion == null) ? !equals(textMotion, _this__u8e3s4.a44_1) : false;
    }
    var requiresAlloc = tmp;
    if (!requiresAlloc) {
      return _this__u8e3s4;
    }
    var tmp_8;
    if (get_isUnspecified(lineHeight)) {
      tmp_8 = _this__u8e3s4.u43_1;
    } else {
      tmp_8 = lineHeight;
    }
    var tmp3_lineHeight = tmp_8;
    var tmp4_textIndent = textIndent == null ? _this__u8e3s4.v43_1 : textIndent;
    var tmp5_textAlign = !(textAlign === Companion_getInstance_30().t46_1) ? textAlign : _this__u8e3s4.s43_1;
    var tmp6_textDirection = !(textDirection === Companion_getInstance_32().g46_1) ? textDirection : _this__u8e3s4.t43_1;
    var tmp7_platformStyle = mergePlatformStyle(_this__u8e3s4, platformStyle);
    var tmp8_lineHeightStyle = lineHeightStyle == null ? _this__u8e3s4.x43_1 : lineHeightStyle;
    var tmp9_lineBreak = !(lineBreak === Companion_getInstance_40().x46_1) ? lineBreak : _this__u8e3s4.y43_1;
    var tmp10_hyphens = !(hyphens === Companion_getInstance_26().a47_1) ? hyphens : _this__u8e3s4.z43_1;
    var tmp11_textMotion = textMotion == null ? _this__u8e3s4.a44_1 : textMotion;
    return new ParagraphStyle_0(tmp5_textAlign, tmp6_textDirection, tmp3_lineHeight, tmp4_textIndent, tmp7_platformStyle, tmp8_lineHeightStyle, tmp9_lineBreak, tmp10_hyphens, tmp11_textMotion);
  }
  function mergePlatformStyle(_this__u8e3s4, other) {
    _init_properties_ParagraphStyle_kt__lbx7er();
    if (_this__u8e3s4.w43_1 == null)
      return other;
    if (other == null)
      return _this__u8e3s4.w43_1;
    return _this__u8e3s4.w43_1.d47(other);
  }
  function resolveParagraphStyleDefaults(style, direction) {
    _init_properties_ParagraphStyle_kt__lbx7er();
    var tmp = style.s43_1 === Companion_getInstance_30().t46_1 ? Companion_getInstance_30().r46_1 : style.s43_1;
    var tmp_0 = resolveTextDirection_0(direction, style.t43_1);
    var tmp_1 = get_isUnspecified(style.u43_1) ? get_DefaultLineHeight() : style.u43_1;
    var tmp0_elvis_lhs = style.v43_1;
    var tmp_2 = tmp0_elvis_lhs == null ? Companion_getInstance_35().e47_1 : tmp0_elvis_lhs;
    var tmp_3 = style.y43_1 === Companion_getInstance_40().x46_1 ? Companion_getInstance_40().u46_1 : style.y43_1;
    var tmp_4 = style.z43_1 === Companion_getInstance_26().a47_1 ? Companion_getInstance_26().y46_1 : style.z43_1;
    var tmp1_elvis_lhs = style.a44_1;
    return new ParagraphStyle_0(tmp, tmp_0, tmp_1, tmp_2, style.w43_1, style.x43_1, tmp_3, tmp_4, tmp1_elvis_lhs == null ? Companion_getInstance_41().f47_1 : tmp1_elvis_lhs);
  }
  var properties_initialized_ParagraphStyle_kt_y6w405;
  function _init_properties_ParagraphStyle_kt__lbx7er() {
    if (!properties_initialized_ParagraphStyle_kt_y6w405) {
      properties_initialized_ParagraphStyle_kt_y6w405 = true;
      DefaultLineHeight = Companion_getInstance_1().f37_1;
    }
  }
  function Placeholder() {
  }
  protoOf(Placeholder).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Placeholder))
      return false;
    if (!equals(this.h47_1, other.h47_1))
      return false;
    if (!equals(this.i47_1, other.i47_1))
      return false;
    if (!(this.j47_1 === other.j47_1))
      return false;
    return true;
  };
  protoOf(Placeholder).hashCode = function () {
    var result = TextUnit__hashCode_impl_qsmeov(this.h47_1);
    result = imul(31, result) + TextUnit__hashCode_impl_qsmeov(this.i47_1) | 0;
    result = imul(31, result) + PlaceholderVerticalAlign__hashCode_impl_1c0k16(this.j47_1) | 0;
    return result;
  };
  function _PlaceholderVerticalAlign___init__impl__mll0or(value) {
    return value;
  }
  function Companion() {
    Companion_instance_1 = this;
    this.k47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(1);
    this.l47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(2);
    this.m47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(3);
    this.n47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(4);
    this.o47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(5);
    this.p47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(6);
    this.q47_1 = _PlaceholderVerticalAlign___init__impl__mll0or(7);
  }
  var Companion_instance_1;
  function Companion_getInstance_12() {
    if (Companion_instance_1 == null)
      new Companion();
    return Companion_instance_1;
  }
  function PlaceholderVerticalAlign__hashCode_impl_1c0k16($this) {
    return $this;
  }
  function get_DefaultFontSize() {
    _init_properties_SpanStyle_kt__ixg4k5();
    return DefaultFontSize;
  }
  var DefaultFontSize;
  function get_DefaultLetterSpacing() {
    _init_properties_SpanStyle_kt__ixg4k5();
    return DefaultLetterSpacing;
  }
  var DefaultLetterSpacing;
  function get_DefaultBackgroundColor() {
    _init_properties_SpanStyle_kt__ixg4k5();
    return DefaultBackgroundColor;
  }
  var DefaultBackgroundColor;
  function get_DefaultColor() {
    _init_properties_SpanStyle_kt__ixg4k5();
    return DefaultColor;
  }
  var DefaultColor;
  function SpanStyle_init_$Init$(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle, $this) {
    color = color === VOID ? Companion_getInstance().w3s_1 : color;
    fontSize = fontSize === VOID ? Companion_getInstance_1().f37_1 : fontSize;
    fontWeight = fontWeight === VOID ? null : fontWeight;
    fontStyle = fontStyle === VOID ? null : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? null : fontSynthesis;
    fontFamily = fontFamily === VOID ? null : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? null : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? Companion_getInstance_1().f37_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? null : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? null : textGeometricTransform;
    localeList = localeList === VOID ? null : localeList;
    background = background === VOID ? Companion_getInstance().w3s_1 : background;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    shadow = shadow === VOID ? null : shadow;
    platformStyle = platformStyle === VOID ? null : platformStyle;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    SpanStyle.call($this, Companion_instance_22.r47(color), fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle);
    return $this;
  }
  function SpanStyle_init_$Create$(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle) {
    return SpanStyle_init_$Init$(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle, objectCreate(protoOf(SpanStyle)));
  }
  function SpanStyle_init_$Init$_0(brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle, $this) {
    var tmp;
    if (alpha === VOID) {
      tmp = NaN;
    } else {
      tmp = alpha;
    }
    alpha = tmp;
    fontSize = fontSize === VOID ? Companion_getInstance_1().f37_1 : fontSize;
    fontWeight = fontWeight === VOID ? null : fontWeight;
    fontStyle = fontStyle === VOID ? null : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? null : fontSynthesis;
    fontFamily = fontFamily === VOID ? null : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? null : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? Companion_getInstance_1().f37_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? null : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? null : textGeometricTransform;
    localeList = localeList === VOID ? null : localeList;
    background = background === VOID ? Companion_getInstance().w3s_1 : background;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    shadow = shadow === VOID ? null : shadow;
    platformStyle = platformStyle === VOID ? null : platformStyle;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    SpanStyle.call($this, Companion_instance_22.s47(brush, alpha), fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle);
    return $this;
  }
  function SpanStyle_init_$Create$_0(brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle) {
    return SpanStyle_init_$Init$_0(brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle, objectCreate(protoOf(SpanStyle)));
  }
  function SpanStyle(textForegroundStyle, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle) {
    fontSize = fontSize === VOID ? Companion_getInstance_1().f37_1 : fontSize;
    fontWeight = fontWeight === VOID ? null : fontWeight;
    fontStyle = fontStyle === VOID ? null : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? null : fontSynthesis;
    fontFamily = fontFamily === VOID ? null : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? null : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? Companion_getInstance_1().f37_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? null : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? null : textGeometricTransform;
    localeList = localeList === VOID ? null : localeList;
    background = background === VOID ? Companion_getInstance().w3s_1 : background;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    shadow = shadow === VOID ? null : shadow;
    platformStyle = platformStyle === VOID ? null : platformStyle;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    this.t47_1 = textForegroundStyle;
    this.u47_1 = fontSize;
    this.v47_1 = fontWeight;
    this.w47_1 = fontStyle;
    this.x47_1 = fontSynthesis;
    this.y47_1 = fontFamily;
    this.z47_1 = fontFeatureSettings;
    this.a48_1 = letterSpacing;
    this.b48_1 = baselineShift;
    this.c48_1 = textGeometricTransform;
    this.d48_1 = localeList;
    this.e48_1 = background;
    this.f48_1 = textDecoration;
    this.g48_1 = shadow;
    this.h48_1 = platformStyle;
    this.i48_1 = drawStyle;
  }
  protoOf(SpanStyle).g41 = function () {
    return this.t47_1.g41();
  };
  protoOf(SpanStyle).j48 = function () {
    return this.t47_1.j48();
  };
  protoOf(SpanStyle).p3n = function () {
    return this.t47_1.p3n();
  };
  protoOf(SpanStyle).k48 = function (other) {
    if (other == null)
      return this;
    return fastMerge_0(this, other.t47_1.g41(), other.t47_1.j48(), other.t47_1.p3n(), other.u47_1, other.v47_1, other.w47_1, other.x47_1, other.y47_1, other.z47_1, other.a48_1, other.b48_1, other.c48_1, other.d48_1, other.e48_1, other.f48_1, other.g48_1, other.h48_1, other.i48_1);
  };
  protoOf(SpanStyle).l48 = function (color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle) {
    var tmp;
    if (equals(color, this.g41())) {
      tmp = this.t47_1;
    } else {
      tmp = Companion_instance_22.r47(color);
    }
    return new SpanStyle(tmp, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle);
  };
  protoOf(SpanStyle).m48 = function (color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle, $super) {
    color = color === VOID ? this.g41() : color;
    fontSize = fontSize === VOID ? this.u47_1 : fontSize;
    fontWeight = fontWeight === VOID ? this.v47_1 : fontWeight;
    fontStyle = fontStyle === VOID ? this.w47_1 : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? this.x47_1 : fontSynthesis;
    fontFamily = fontFamily === VOID ? this.y47_1 : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? this.z47_1 : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? this.a48_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? this.b48_1 : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? this.c48_1 : textGeometricTransform;
    localeList = localeList === VOID ? this.d48_1 : localeList;
    background = background === VOID ? this.e48_1 : background;
    textDecoration = textDecoration === VOID ? this.f48_1 : textDecoration;
    shadow = shadow === VOID ? this.g48_1 : shadow;
    platformStyle = platformStyle === VOID ? this.h48_1 : platformStyle;
    drawStyle = drawStyle === VOID ? this.i48_1 : drawStyle;
    var tmp;
    if ($super === VOID) {
      tmp = this.l48(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle);
    } else {
      var tmp_0 = $super.l48;
      var tmp_1 = fontStyle;
      var tmp_2 = tmp_1 == null ? null : new FontStyle(tmp_1);
      var tmp_3 = fontSynthesis;
      var tmp_4 = tmp_3 == null ? null : new FontSynthesis(tmp_3);
      var tmp_5 = baselineShift;
      tmp = tmp_0.call(this, new Color(color), new TextUnit(fontSize), fontWeight, tmp_2, tmp_4, fontFamily, fontFeatureSettings, new TextUnit(letterSpacing), tmp_5 == null ? null : new BaselineShift(tmp_5), textGeometricTransform, localeList, new Color(background), textDecoration, shadow, platformStyle, drawStyle);
    }
    return tmp;
  };
  protoOf(SpanStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SpanStyle))
      return false;
    return this.o48(other) ? this.n48(other) : false;
  };
  protoOf(SpanStyle).o48 = function (other) {
    if (this === other)
      return true;
    if (!equals(this.u47_1, other.u47_1))
      return false;
    if (!equals(this.v47_1, other.v47_1))
      return false;
    var tmp = this.w47_1;
    var tmp_0 = tmp == null ? null : new FontStyle(tmp);
    var tmp_1 = other.w47_1;
    if (!equals(tmp_0, tmp_1 == null ? null : new FontStyle(tmp_1)))
      return false;
    var tmp_2 = this.x47_1;
    var tmp_3 = tmp_2 == null ? null : new FontSynthesis(tmp_2);
    var tmp_4 = other.x47_1;
    if (!equals(tmp_3, tmp_4 == null ? null : new FontSynthesis(tmp_4)))
      return false;
    if (!equals(this.y47_1, other.y47_1))
      return false;
    if (!(this.z47_1 == other.z47_1))
      return false;
    if (!equals(this.a48_1, other.a48_1))
      return false;
    var tmp_5 = this.b48_1;
    var tmp_6 = tmp_5 == null ? null : new BaselineShift(tmp_5);
    var tmp_7 = other.b48_1;
    if (!equals(tmp_6, tmp_7 == null ? null : new BaselineShift(tmp_7)))
      return false;
    if (!equals(this.c48_1, other.c48_1))
      return false;
    if (!equals(this.d48_1, other.d48_1))
      return false;
    if (!equals(this.e48_1, other.e48_1))
      return false;
    if (!equals(this.h48_1, other.h48_1))
      return false;
    return true;
  };
  protoOf(SpanStyle).n48 = function (other) {
    if (!equals(this.t47_1, other.t47_1))
      return false;
    if (!equals(this.f48_1, other.f48_1))
      return false;
    if (!equals(this.g48_1, other.g48_1))
      return false;
    if (!equals(this.i48_1, other.i48_1))
      return false;
    return true;
  };
  protoOf(SpanStyle).hashCode = function () {
    var result = Color__hashCode_impl_vjyivj(this.g41());
    var tmp = imul(31, result);
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.j48();
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    result = imul(31, result) + getNumberHashCode(this.p3n()) | 0;
    result = imul(31, result) + TextUnit__hashCode_impl_qsmeov(this.u47_1) | 0;
    var tmp_0 = imul(31, result);
    var tmp0_safe_receiver_0 = this.v47_1;
    var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.hashCode();
    result = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    var tmp_1 = imul(31, result);
    var tmp2_safe_receiver = this.w47_1;
    var tmp_2;
    var tmp_3 = tmp2_safe_receiver;
    if ((tmp_3 == null ? null : new FontStyle(tmp_3)) == null) {
      tmp_2 = null;
    } else {
      tmp_2 = FontStyle__hashCode_impl_7qhg4w(tmp2_safe_receiver);
    }
    var tmp3_elvis_lhs = tmp_2;
    result = tmp_1 + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    var tmp_4 = imul(31, result);
    var tmp4_safe_receiver = this.x47_1;
    var tmp_5;
    var tmp_6 = tmp4_safe_receiver;
    if ((tmp_6 == null ? null : new FontSynthesis(tmp_6)) == null) {
      tmp_5 = null;
    } else {
      tmp_5 = FontSynthesis__hashCode_impl_4wi11v(tmp4_safe_receiver);
    }
    var tmp5_elvis_lhs = tmp_5;
    result = tmp_4 + (tmp5_elvis_lhs == null ? 0 : tmp5_elvis_lhs) | 0;
    var tmp_7 = imul(31, result);
    var tmp6_safe_receiver = this.y47_1;
    var tmp7_elvis_lhs = tmp6_safe_receiver == null ? null : hashCode(tmp6_safe_receiver);
    result = tmp_7 + (tmp7_elvis_lhs == null ? 0 : tmp7_elvis_lhs) | 0;
    var tmp_8 = imul(31, result);
    var tmp8_safe_receiver = this.z47_1;
    var tmp9_elvis_lhs = tmp8_safe_receiver == null ? null : getStringHashCode(tmp8_safe_receiver);
    result = tmp_8 + (tmp9_elvis_lhs == null ? 0 : tmp9_elvis_lhs) | 0;
    result = imul(31, result) + TextUnit__hashCode_impl_qsmeov(this.a48_1) | 0;
    var tmp_9 = imul(31, result);
    var tmp10_safe_receiver = this.b48_1;
    var tmp_10;
    var tmp_11 = tmp10_safe_receiver;
    if ((tmp_11 == null ? null : new BaselineShift(tmp_11)) == null) {
      tmp_10 = null;
    } else {
      tmp_10 = BaselineShift__hashCode_impl_g0potx(tmp10_safe_receiver);
    }
    var tmp11_elvis_lhs = tmp_10;
    result = tmp_9 + (tmp11_elvis_lhs == null ? 0 : tmp11_elvis_lhs) | 0;
    var tmp_12 = imul(31, result);
    var tmp12_safe_receiver = this.c48_1;
    var tmp13_elvis_lhs = tmp12_safe_receiver == null ? null : tmp12_safe_receiver.hashCode();
    result = tmp_12 + (tmp13_elvis_lhs == null ? 0 : tmp13_elvis_lhs) | 0;
    var tmp_13 = imul(31, result);
    var tmp14_safe_receiver = this.d48_1;
    var tmp15_elvis_lhs = tmp14_safe_receiver == null ? null : tmp14_safe_receiver.hashCode();
    result = tmp_13 + (tmp15_elvis_lhs == null ? 0 : tmp15_elvis_lhs) | 0;
    result = imul(31, result) + Color__hashCode_impl_vjyivj(this.e48_1) | 0;
    var tmp_14 = imul(31, result);
    var tmp16_safe_receiver = this.f48_1;
    var tmp17_elvis_lhs = tmp16_safe_receiver == null ? null : tmp16_safe_receiver.hashCode();
    result = tmp_14 + (tmp17_elvis_lhs == null ? 0 : tmp17_elvis_lhs) | 0;
    var tmp_15 = imul(31, result);
    var tmp18_safe_receiver = this.g48_1;
    var tmp19_elvis_lhs = tmp18_safe_receiver == null ? null : tmp18_safe_receiver.hashCode();
    result = tmp_15 + (tmp19_elvis_lhs == null ? 0 : tmp19_elvis_lhs) | 0;
    var tmp_16 = imul(31, result);
    var tmp20_safe_receiver = this.h48_1;
    var tmp21_elvis_lhs = tmp20_safe_receiver == null ? null : tmp20_safe_receiver.hashCode();
    result = tmp_16 + (tmp21_elvis_lhs == null ? 0 : tmp21_elvis_lhs) | 0;
    var tmp_17 = imul(31, result);
    var tmp22_safe_receiver = this.i48_1;
    var tmp23_elvis_lhs = tmp22_safe_receiver == null ? null : hashCode(tmp22_safe_receiver);
    result = tmp_17 + (tmp23_elvis_lhs == null ? 0 : tmp23_elvis_lhs) | 0;
    return result;
  };
  protoOf(SpanStyle).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.SpanStyle.toString.<anonymous>' call
    this_0.y5('SpanStyle(');
    this_0.y5('color=' + new Color(this.g41()) + ', ');
    this_0.y5('brush=' + this.j48() + ', ');
    this_0.y5('alpha=' + this.p3n() + ', ');
    this_0.y5('fontSize=' + new TextUnit(this.u47_1) + ', ');
    this_0.y5('fontWeight=' + this.v47_1 + ', ');
    var tmp = this.w47_1;
    this_0.y5('fontStyle=' + (tmp == null ? null : new FontStyle(tmp)) + ', ');
    var tmp_0 = this.x47_1;
    this_0.y5('fontSynthesis=' + (tmp_0 == null ? null : new FontSynthesis(tmp_0)) + ', ');
    this_0.y5('fontFamily=' + this.y47_1 + ', ');
    this_0.y5('fontFeatureSettings=' + this.z47_1 + ', ');
    this_0.y5('letterSpacing=' + new TextUnit(this.a48_1) + ', ');
    var tmp_1 = this.b48_1;
    this_0.y5('baselineShift=' + (tmp_1 == null ? null : new BaselineShift(tmp_1)) + ', ');
    this_0.y5('textGeometricTransform=' + this.c48_1 + ', ');
    this_0.y5('localeList=' + this.d48_1 + ', ');
    this_0.y5('background=' + new Color(this.e48_1) + ', ');
    this_0.y5('textDecoration=' + this.f48_1 + ', ');
    this_0.y5('shadow=' + this.g48_1 + ', ');
    this_0.y5('platformStyle=' + this.h48_1 + ', ');
    this_0.y5('drawStyle=' + this.i48_1);
    this_0.y5(')');
    return this_0.toString();
  };
  function fastMerge_0(_this__u8e3s4, color, brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle, drawStyle) {
    _init_properties_SpanStyle_kt__ixg4k5();
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    var tmp_3;
    var tmp_4;
    var tmp_5;
    var tmp_6;
    var tmp_7;
    var tmp_8;
    var tmp_9;
    var tmp_10;
    var tmp_11;
    var tmp_12;
    var tmp_13;
    var tmp_14;
    var tmp_15;
    var tmp_16;
    // Inline function 'androidx.compose.ui.unit.isSpecified' call
    if (!get_isUnspecified(fontSize)) {
      tmp_16 = !equals(fontSize, _this__u8e3s4.u47_1);
    } else {
      tmp_16 = false;
    }
    if (tmp_16) {
      tmp_15 = true;
    } else {
      var tmp_17;
      var tmp_18;
      if (brush == null) {
        // Inline function 'androidx.compose.ui.graphics.isSpecified' call
        tmp_18 = !equals(_Color___get_value__impl__1pls5m(color), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1));
      } else {
        tmp_18 = false;
      }
      if (tmp_18) {
        tmp_17 = !equals(color, _this__u8e3s4.t47_1.g41());
      } else {
        tmp_17 = false;
      }
      tmp_15 = tmp_17;
    }
    if (tmp_15) {
      tmp_14 = true;
    } else {
      var tmp_19;
      var tmp_20 = fontStyle;
      if (!((tmp_20 == null ? null : new FontStyle(tmp_20)) == null)) {
        var tmp_21 = fontStyle;
        var tmp_22 = tmp_21 == null ? null : new FontStyle(tmp_21);
        var tmp_23 = _this__u8e3s4.w47_1;
        tmp_19 = !equals(tmp_22, tmp_23 == null ? null : new FontStyle(tmp_23));
      } else {
        tmp_19 = false;
      }
      tmp_14 = tmp_19;
    }
    if (tmp_14) {
      tmp_13 = true;
    } else {
      tmp_13 = !(fontWeight == null) ? !equals(fontWeight, _this__u8e3s4.v47_1) : false;
    }
    if (tmp_13) {
      tmp_12 = true;
    } else {
      tmp_12 = !(fontFamily == null) ? !(fontFamily === _this__u8e3s4.y47_1) : false;
    }
    if (tmp_12) {
      tmp_11 = true;
    } else {
      var tmp_24;
      // Inline function 'androidx.compose.ui.unit.isSpecified' call
      if (!get_isUnspecified(letterSpacing)) {
        tmp_24 = !equals(letterSpacing, _this__u8e3s4.a48_1);
      } else {
        tmp_24 = false;
      }
      tmp_11 = tmp_24;
    }
    if (tmp_11) {
      tmp_10 = true;
    } else {
      tmp_10 = !(textDecoration == null) ? !equals(textDecoration, _this__u8e3s4.f48_1) : false;
    }
    if (tmp_10) {
      tmp_9 = true;
    } else {
      tmp_9 = !equals(brush, _this__u8e3s4.t47_1.j48());
    }
    if (tmp_9) {
      tmp_8 = true;
    } else {
      tmp_8 = !(brush == null) ? !(alpha === _this__u8e3s4.t47_1.p3n()) : false;
    }
    if (tmp_8) {
      tmp_7 = true;
    } else {
      var tmp_25;
      var tmp_26 = fontSynthesis;
      if (!((tmp_26 == null ? null : new FontSynthesis(tmp_26)) == null)) {
        var tmp_27 = fontSynthesis;
        var tmp_28 = tmp_27 == null ? null : new FontSynthesis(tmp_27);
        var tmp_29 = _this__u8e3s4.x47_1;
        tmp_25 = !equals(tmp_28, tmp_29 == null ? null : new FontSynthesis(tmp_29));
      } else {
        tmp_25 = false;
      }
      tmp_7 = tmp_25;
    }
    if (tmp_7) {
      tmp_6 = true;
    } else {
      tmp_6 = !(fontFeatureSettings == null) ? !(fontFeatureSettings == _this__u8e3s4.z47_1) : false;
    }
    if (tmp_6) {
      tmp_5 = true;
    } else {
      var tmp_30;
      var tmp_31 = baselineShift;
      if (!((tmp_31 == null ? null : new BaselineShift(tmp_31)) == null)) {
        var tmp_32 = baselineShift;
        var tmp_33 = tmp_32 == null ? null : new BaselineShift(tmp_32);
        var tmp_34 = _this__u8e3s4.b48_1;
        tmp_30 = !equals(tmp_33, tmp_34 == null ? null : new BaselineShift(tmp_34));
      } else {
        tmp_30 = false;
      }
      tmp_5 = tmp_30;
    }
    if (tmp_5) {
      tmp_4 = true;
    } else {
      tmp_4 = !(textGeometricTransform == null) ? !equals(textGeometricTransform, _this__u8e3s4.c48_1) : false;
    }
    if (tmp_4) {
      tmp_3 = true;
    } else {
      tmp_3 = !(localeList == null) ? !equals(localeList, _this__u8e3s4.d48_1) : false;
    }
    if (tmp_3) {
      tmp_2 = true;
    } else {
      var tmp_35;
      // Inline function 'androidx.compose.ui.graphics.isSpecified' call
      if (!equals(_Color___get_value__impl__1pls5m(background), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
        tmp_35 = !equals(background, _this__u8e3s4.e48_1);
      } else {
        tmp_35 = false;
      }
      tmp_2 = tmp_35;
    }
    if (tmp_2) {
      tmp_1 = true;
    } else {
      tmp_1 = !(shadow == null) ? !equals(shadow, _this__u8e3s4.g48_1) : false;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = !(platformStyle == null) ? !equals(platformStyle, _this__u8e3s4.h48_1) : false;
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = !(drawStyle == null) ? !equals(drawStyle, _this__u8e3s4.i48_1) : false;
    }
    var requiresAlloc = tmp;
    if (!requiresAlloc) {
      return _this__u8e3s4;
    }
    var tmp_36;
    if (!(brush == null)) {
      tmp_36 = Companion_instance_22.s47(brush, alpha);
    } else {
      tmp_36 = Companion_instance_22.r47(color);
    }
    var otherTextForegroundStyle = tmp_36;
    var tmp11_textForegroundStyle = _this__u8e3s4.t47_1.p48(otherTextForegroundStyle);
    var tmp12_fontFamily = fontFamily == null ? _this__u8e3s4.y47_1 : fontFamily;
    var tmp13_fontSize = !get_isUnspecified(fontSize) ? fontSize : _this__u8e3s4.u47_1;
    var tmp14_fontWeight = fontWeight == null ? _this__u8e3s4.v47_1 : fontWeight;
    var tmp_37;
    var tmp_38 = fontStyle;
    if ((tmp_38 == null ? null : new FontStyle(tmp_38)) == null) {
      tmp_37 = _this__u8e3s4.w47_1;
    } else {
      tmp_37 = fontStyle;
    }
    var tmp15_fontStyle = tmp_37;
    var tmp_39;
    var tmp_40 = fontSynthesis;
    if ((tmp_40 == null ? null : new FontSynthesis(tmp_40)) == null) {
      tmp_39 = _this__u8e3s4.x47_1;
    } else {
      tmp_39 = fontSynthesis;
    }
    var tmp16_fontSynthesis = tmp_39;
    var tmp17_fontFeatureSettings = fontFeatureSettings == null ? _this__u8e3s4.z47_1 : fontFeatureSettings;
    var tmp_41;
    if (!get_isUnspecified(letterSpacing)) {
      tmp_41 = letterSpacing;
    } else {
      tmp_41 = _this__u8e3s4.a48_1;
    }
    var tmp18_letterSpacing = tmp_41;
    var tmp_42;
    var tmp_43 = baselineShift;
    if ((tmp_43 == null ? null : new BaselineShift(tmp_43)) == null) {
      tmp_42 = _this__u8e3s4.b48_1;
    } else {
      tmp_42 = baselineShift;
    }
    var tmp19_baselineShift = tmp_42;
    var tmp20_textGeometricTransform = textGeometricTransform == null ? _this__u8e3s4.c48_1 : textGeometricTransform;
    var tmp21_localeList = localeList == null ? _this__u8e3s4.d48_1 : localeList;
    // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
    var tmp_44;
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    if (!equals(_Color___get_value__impl__1pls5m(background), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      tmp_44 = background;
    } else {
      // Inline function 'androidx.compose.ui.text.fastMerge.<anonymous>' call
      tmp_44 = _this__u8e3s4.e48_1;
    }
    var tmp22_background = tmp_44;
    var tmp23_textDecoration = textDecoration == null ? _this__u8e3s4.f48_1 : textDecoration;
    var tmp24_shadow = shadow == null ? _this__u8e3s4.g48_1 : shadow;
    var tmp25_platformStyle = mergePlatformStyle_0(_this__u8e3s4, platformStyle);
    var tmp26_drawStyle = drawStyle == null ? _this__u8e3s4.i48_1 : drawStyle;
    return new SpanStyle(tmp11_textForegroundStyle, tmp13_fontSize, tmp14_fontWeight, tmp15_fontStyle, tmp16_fontSynthesis, tmp12_fontFamily, tmp17_fontFeatureSettings, tmp18_letterSpacing, tmp19_baselineShift, tmp20_textGeometricTransform, tmp21_localeList, tmp22_background, tmp23_textDecoration, tmp24_shadow, tmp25_platformStyle, tmp26_drawStyle);
  }
  function mergePlatformStyle_0(_this__u8e3s4, other) {
    _init_properties_SpanStyle_kt__ixg4k5();
    if (_this__u8e3s4.h48_1 == null)
      return other;
    if (other == null)
      return _this__u8e3s4.h48_1;
    return _this__u8e3s4.h48_1.r48(other);
  }
  function resolveSpanStyleDefaults(style) {
    _init_properties_SpanStyle_kt__ixg4k5();
    var tmp = style.t47_1.s48(resolveSpanStyleDefaults$lambda);
    var tmp_0 = get_isUnspecified(style.u47_1) ? get_DefaultFontSize() : style.u47_1;
    var tmp0_elvis_lhs = style.v47_1;
    var tmp_1 = tmp0_elvis_lhs == null ? Companion_getInstance_22().f49_1 : tmp0_elvis_lhs;
    var tmp1_elvis_lhs = style.w47_1;
    var tmp_2;
    var tmp_3 = tmp1_elvis_lhs;
    if ((tmp_3 == null ? null : new FontStyle(tmp_3)) == null) {
      tmp_2 = Companion_getInstance_20().m49_1;
    } else {
      tmp_2 = tmp1_elvis_lhs;
    }
    var tmp_4 = tmp_2;
    var tmp2_elvis_lhs = style.x47_1;
    var tmp_5;
    var tmp_6 = tmp2_elvis_lhs;
    if ((tmp_6 == null ? null : new FontSynthesis(tmp_6)) == null) {
      tmp_5 = Companion_getInstance_21().p49_1;
    } else {
      tmp_5 = tmp2_elvis_lhs;
    }
    var tmp_7 = tmp_5;
    var tmp3_elvis_lhs = style.y47_1;
    var tmp_8 = tmp3_elvis_lhs == null ? Companion_getInstance_16().s49_1 : tmp3_elvis_lhs;
    var tmp4_elvis_lhs = style.z47_1;
    var tmp_9 = tmp4_elvis_lhs == null ? '' : tmp4_elvis_lhs;
    var tmp_10;
    if (get_isUnspecified(style.a48_1)) {
      tmp_10 = get_DefaultLetterSpacing();
    } else {
      tmp_10 = style.a48_1;
    }
    var tmp_11 = tmp_10;
    var tmp5_elvis_lhs = style.b48_1;
    var tmp_12;
    var tmp_13 = tmp5_elvis_lhs;
    if ((tmp_13 == null ? null : new BaselineShift(tmp_13)) == null) {
      tmp_12 = Companion_getInstance_25().z49_1;
    } else {
      tmp_12 = tmp5_elvis_lhs;
    }
    var tmp_14 = tmp_12;
    var tmp6_elvis_lhs = style.c48_1;
    var tmp_15 = tmp6_elvis_lhs == null ? Companion_getInstance_34().a4a_1 : tmp6_elvis_lhs;
    var tmp7_elvis_lhs = style.d48_1;
    var tmp_16 = tmp7_elvis_lhs == null ? Companion_instance_13.f1k() : tmp7_elvis_lhs;
    // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
    var this_0 = style.e48_1;
    var tmp_17;
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    if (!equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      tmp_17 = this_0;
    } else {
      // Inline function 'androidx.compose.ui.text.resolveSpanStyleDefaults.<anonymous>' call
      tmp_17 = get_DefaultBackgroundColor();
    }
    var tmp_18 = tmp_17;
    var tmp8_elvis_lhs = style.f48_1;
    var tmp_19 = tmp8_elvis_lhs == null ? Companion_getInstance_31().b4a_1 : tmp8_elvis_lhs;
    var tmp9_elvis_lhs = style.g48_1;
    var tmp_20 = tmp9_elvis_lhs == null ? Companion_getInstance_2().x3w_1 : tmp9_elvis_lhs;
    var tmp10_elvis_lhs = style.i48_1;
    return new SpanStyle(tmp, tmp_0, tmp_1, tmp_4, tmp_7, tmp_8, tmp_9, tmp_11, tmp_14, tmp_15, tmp_16, tmp_18, tmp_19, tmp_20, style.h48_1, tmp10_elvis_lhs == null ? Fill_getInstance() : tmp10_elvis_lhs);
  }
  function resolveSpanStyleDefaults$lambda() {
    _init_properties_SpanStyle_kt__ixg4k5();
    return Companion_instance_22.r47(get_DefaultColor());
  }
  var properties_initialized_SpanStyle_kt_cqbdlj;
  function _init_properties_SpanStyle_kt__ixg4k5() {
    if (!properties_initialized_SpanStyle_kt_cqbdlj) {
      properties_initialized_SpanStyle_kt_cqbdlj = true;
      DefaultFontSize = get_sp(14);
      DefaultLetterSpacing = get_sp(0);
      DefaultBackgroundColor = Companion_getInstance().v3s_1;
      DefaultColor = Companion_getInstance().k3s_1;
    }
  }
  function SynchronizedObject() {
  }
  function createSynchronizedObject() {
    return new SynchronizedObject();
  }
  function TextLayoutResult(layoutInput, multiParagraph, size) {
    this.e4a_1 = layoutInput;
    this.f4a_1 = multiParagraph;
    this.g4a_1 = size;
    this.h4a_1 = this.f4a_1.g45();
    this.i4a_1 = this.f4a_1.h45();
    this.j4a_1 = this.f4a_1.n44_1;
  }
  protoOf(TextLayoutResult).k4a = function () {
    return this.f4a_1.j44_1 ? true : _IntSize___get_height__impl__prv63b(this.g4a_1) < this.f4a_1.l44_1;
  };
  protoOf(TextLayoutResult).l4a = function () {
    return _IntSize___get_width__impl__d9yl4o(this.g4a_1) < this.f4a_1.k44_1;
  };
  protoOf(TextLayoutResult).m4a = function () {
    return this.l4a() ? true : this.k4a();
  };
  protoOf(TextLayoutResult).c45 = function () {
    return this.f4a_1.m44_1;
  };
  protoOf(TextLayoutResult).x45 = function (lineIndex) {
    return this.f4a_1.x45(lineIndex);
  };
  protoOf(TextLayoutResult).z45 = function (lineIndex, visibleEnd) {
    return this.f4a_1.z45(lineIndex, visibleEnd);
  };
  protoOf(TextLayoutResult).n4a = function (lineIndex, visibleEnd, $super) {
    visibleEnd = visibleEnd === VOID ? false : visibleEnd;
    return $super === VOID ? this.z45(lineIndex, visibleEnd) : $super.z45.call(this, lineIndex, visibleEnd);
  };
  protoOf(TextLayoutResult).v45 = function (lineIndex) {
    return this.f4a_1.v45(lineIndex);
  };
  protoOf(TextLayoutResult).u45 = function (offset) {
    return this.f4a_1.u45(offset);
  };
  protoOf(TextLayoutResult).n45 = function (vertical) {
    return this.f4a_1.n45(vertical);
  };
  protoOf(TextLayoutResult).q45 = function (offset) {
    return this.f4a_1.q45(offset);
  };
  protoOf(TextLayoutResult).r45 = function (offset) {
    return this.f4a_1.r45(offset);
  };
  protoOf(TextLayoutResult).s45 = function (offset) {
    return this.f4a_1.s45(offset);
  };
  protoOf(TextLayoutResult).x44 = function (start, end) {
    return this.f4a_1.x44(start, end);
  };
  protoOf(TextLayoutResult).o4a = function (layoutInput, size) {
    return new TextLayoutResult(layoutInput, this.f4a_1, size);
  };
  protoOf(TextLayoutResult).p4a = function (layoutInput, size, $super) {
    layoutInput = layoutInput === VOID ? this.e4a_1 : layoutInput;
    size = size === VOID ? this.g4a_1 : size;
    return $super === VOID ? this.o4a(layoutInput, size) : $super.o4a.call(this, layoutInput, new IntSize(size));
  };
  protoOf(TextLayoutResult).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextLayoutResult))
      return false;
    if (!this.e4a_1.equals(other.e4a_1))
      return false;
    if (!equals(this.f4a_1, other.f4a_1))
      return false;
    if (!equals(this.g4a_1, other.g4a_1))
      return false;
    if (!(this.h4a_1 === other.h4a_1))
      return false;
    if (!(this.i4a_1 === other.i4a_1))
      return false;
    if (!equals(this.j4a_1, other.j4a_1))
      return false;
    return true;
  };
  protoOf(TextLayoutResult).hashCode = function () {
    var result = this.e4a_1.hashCode();
    result = imul(31, result) + hashCode(this.f4a_1) | 0;
    result = imul(31, result) + IntSize__hashCode_impl_gm9mta(this.g4a_1) | 0;
    result = imul(31, result) + getNumberHashCode(this.h4a_1) | 0;
    result = imul(31, result) + getNumberHashCode(this.i4a_1) | 0;
    result = imul(31, result) + hashCode(this.j4a_1) | 0;
    return result;
  };
  protoOf(TextLayoutResult).toString = function () {
    return 'TextLayoutResult(' + ('layoutInput=' + this.e4a_1 + ', ') + ('multiParagraph=' + this.f4a_1 + ', ') + ('size=' + new IntSize(this.g4a_1) + ', ') + ('firstBaseline=' + this.h4a_1 + ', ') + ('lastBaseline=' + this.i4a_1 + ', ') + ('placeholderRects=' + this.j4a_1) + ')';
  };
  function TextLayoutInput_init_$Init$(text, style, placeholders, maxLines, softWrap, overflow, density, layoutDirection, fontFamilyResolver, constraints, $this) {
    TextLayoutInput.call($this, text, style, placeholders, maxLines, softWrap, overflow, density, layoutDirection, null, fontFamilyResolver, constraints);
    return $this;
  }
  function TextLayoutInput_init_$Create$(text, style, placeholders, maxLines, softWrap, overflow, density, layoutDirection, fontFamilyResolver, constraints) {
    return TextLayoutInput_init_$Init$(text, style, placeholders, maxLines, softWrap, overflow, density, layoutDirection, fontFamilyResolver, constraints, objectCreate(protoOf(TextLayoutInput)));
  }
  function TextLayoutInput(text, style, placeholders, maxLines, softWrap, overflow, density, layoutDirection, resourceLoader, fontFamilyResolver, constraints) {
    this.q4a_1 = text;
    this.r4a_1 = style;
    this.s4a_1 = placeholders;
    this.t4a_1 = maxLines;
    this.u4a_1 = softWrap;
    this.v4a_1 = overflow;
    this.w4a_1 = density;
    this.x4a_1 = layoutDirection;
    this.y4a_1 = fontFamilyResolver;
    this.z4a_1 = constraints;
    this.a4b_1 = resourceLoader;
  }
  protoOf(TextLayoutInput).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextLayoutInput))
      return false;
    if (!this.q4a_1.equals(other.q4a_1))
      return false;
    if (!this.r4a_1.equals(other.r4a_1))
      return false;
    if (!equals(this.s4a_1, other.s4a_1))
      return false;
    if (!(this.t4a_1 === other.t4a_1))
      return false;
    if (!(this.u4a_1 === other.u4a_1))
      return false;
    if (!(this.v4a_1 === other.v4a_1))
      return false;
    if (!equals(this.w4a_1, other.w4a_1))
      return false;
    if (!this.x4a_1.equals(other.x4a_1))
      return false;
    if (!equals(this.y4a_1, other.y4a_1))
      return false;
    if (!equals(this.z4a_1, other.z4a_1))
      return false;
    return true;
  };
  protoOf(TextLayoutInput).hashCode = function () {
    var result = this.q4a_1.hashCode();
    result = imul(31, result) + this.r4a_1.hashCode() | 0;
    result = imul(31, result) + hashCode(this.s4a_1) | 0;
    result = imul(31, result) + this.t4a_1 | 0;
    result = imul(31, result) + getBooleanHashCode(this.u4a_1) | 0;
    result = imul(31, result) + TextOverflow__hashCode_impl_kqdwgt(this.v4a_1) | 0;
    result = imul(31, result) + hashCode(this.w4a_1) | 0;
    result = imul(31, result) + this.x4a_1.hashCode() | 0;
    result = imul(31, result) + hashCode(this.y4a_1) | 0;
    result = imul(31, result) + Constraints__hashCode_impl_ij7484(this.z4a_1) | 0;
    return result;
  };
  protoOf(TextLayoutInput).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.TextLayoutInput.toString.<anonymous>' call
    this_0.y5('TextLayoutInput(');
    this_0.y5('text=' + this.q4a_1 + ', ');
    this_0.y5('style=' + this.r4a_1 + ', ');
    this_0.y5('placeholders=' + this.s4a_1 + ', ');
    this_0.y5('maxLines=' + this.t4a_1 + ', ');
    this_0.y5('softWrap=' + this.u4a_1 + ', ');
    this_0.y5('overflow=' + new TextOverflow(this.v4a_1) + ', ');
    this_0.y5('density=' + this.w4a_1 + ', ');
    this_0.y5('layoutDirection=' + this.x4a_1 + ', ');
    this_0.y5('fontFamilyResolver=' + this.y4a_1 + ', ');
    this_0.y5('constraints=' + new Constraints_0(this.z4a_1));
    this_0.y5(')');
    return this_0.toString();
  };
  var DefaultCacheSize;
  function _TextRange___init__impl__h6icbt(packedValue) {
    return packedValue;
  }
  function _get_packedValue__aj623s($this) {
    return $this;
  }
  function _TextRange___get_start__impl__ww4t90($this) {
    // Inline function 'androidx.compose.ui.util.unpackInt1' call
    return _get_packedValue__aj623s($this).lb(32).ea();
  }
  function _TextRange___get_end__impl__gcdxpp($this) {
    // Inline function 'androidx.compose.ui.util.unpackInt2' call
    return _get_packedValue__aj623s($this).nb(new Long(-1, 0)).ea();
  }
  function _TextRange___get_min__impl__uu95c4($this) {
    return _TextRange___get_start__impl__ww4t90($this) > _TextRange___get_end__impl__gcdxpp($this) ? _TextRange___get_end__impl__gcdxpp($this) : _TextRange___get_start__impl__ww4t90($this);
  }
  function _TextRange___get_max__impl__owm8m($this) {
    return _TextRange___get_start__impl__ww4t90($this) > _TextRange___get_end__impl__gcdxpp($this) ? _TextRange___get_start__impl__ww4t90($this) : _TextRange___get_end__impl__gcdxpp($this);
  }
  function TextRange__toString_impl_pqvlzl($this) {
    return 'TextRange(' + _TextRange___get_start__impl__ww4t90($this) + ', ' + _TextRange___get_end__impl__gcdxpp($this) + ')';
  }
  function Companion_0() {
    Companion_instance_2 = this;
    this.b4b_1 = TextRange_1(0);
  }
  var Companion_instance_2;
  function Companion_getInstance_13() {
    if (Companion_instance_2 == null)
      new Companion_0();
    return Companion_instance_2;
  }
  function TextRange__hashCode_impl_3zpp6q($this) {
    return $this.hashCode();
  }
  function TextRange__equals_impl_hkkmea($this, other) {
    if (!(other instanceof TextRange))
      return false;
    var tmp0_other_with_cast = other instanceof TextRange ? other.c4b_1 : THROW_CCE();
    if (!$this.equals(tmp0_other_with_cast))
      return false;
    return true;
  }
  function TextRange(packedValue) {
    Companion_getInstance_13();
    this.c4b_1 = packedValue;
  }
  protoOf(TextRange).toString = function () {
    return TextRange__toString_impl_pqvlzl(this.c4b_1);
  };
  protoOf(TextRange).hashCode = function () {
    return TextRange__hashCode_impl_3zpp6q(this.c4b_1);
  };
  protoOf(TextRange).equals = function (other) {
    return TextRange__equals_impl_hkkmea(this.c4b_1, other);
  };
  function TextRange_0(start, end) {
    return _TextRange___init__impl__h6icbt(packWithCheck(start, end));
  }
  function TextRange_1(index) {
    return TextRange_0(index, index);
  }
  function packWithCheck(start, end) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(start >= 0)) {
      // Inline function 'androidx.compose.ui.text.packWithCheck.<anonymous>' call
      var message = 'start cannot be negative. [start: ' + start + ', end: ' + end + ']';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(end >= 0)) {
      // Inline function 'androidx.compose.ui.text.packWithCheck.<anonymous>' call
      var message_0 = 'end cannot be negative. [start: ' + start + ', end: ' + end + ']';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    // Inline function 'androidx.compose.ui.util.packInts' call
    return toLong(start).kb(32).ob(toLong(end).nb(new Long(-1, 0)));
  }
  function TextStyle_init_$Init$(spanStyle, paragraphStyle, $this) {
    TextStyle.call($this, spanStyle, paragraphStyle, createPlatformTextStyleInternal(spanStyle.h48_1, paragraphStyle.w43_1));
    return $this;
  }
  function TextStyle_init_$Create$_0(spanStyle, paragraphStyle) {
    return TextStyle_init_$Init$(spanStyle, paragraphStyle, objectCreate(protoOf(TextStyle)));
  }
  function TextStyle_init_$Init$_0(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion, $this) {
    color = color === VOID ? Companion_getInstance().w3s_1 : color;
    fontSize = fontSize === VOID ? Companion_getInstance_1().f37_1 : fontSize;
    fontWeight = fontWeight === VOID ? null : fontWeight;
    fontStyle = fontStyle === VOID ? null : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? null : fontSynthesis;
    fontFamily = fontFamily === VOID ? null : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? null : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? Companion_getInstance_1().f37_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? null : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? null : textGeometricTransform;
    localeList = localeList === VOID ? null : localeList;
    background = background === VOID ? Companion_getInstance().w3s_1 : background;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    shadow = shadow === VOID ? null : shadow;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    textAlign = textAlign === VOID ? Companion_getInstance_30().t46_1 : textAlign;
    textDirection = textDirection === VOID ? Companion_getInstance_32().g46_1 : textDirection;
    lineHeight = lineHeight === VOID ? Companion_getInstance_1().f37_1 : lineHeight;
    textIndent = textIndent === VOID ? null : textIndent;
    platformStyle = platformStyle === VOID ? null : platformStyle;
    lineHeightStyle = lineHeightStyle === VOID ? null : lineHeightStyle;
    lineBreak = lineBreak === VOID ? Companion_getInstance_40().x46_1 : lineBreak;
    hyphens = hyphens === VOID ? Companion_getInstance_26().a47_1 : hyphens;
    textMotion = textMotion === VOID ? null : textMotion;
    var tmp = SpanStyle_init_$Create$(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle == null ? null : platformStyle.d4b_1, drawStyle);
    TextStyle.call($this, tmp, new ParagraphStyle_0(textAlign, textDirection, lineHeight, textIndent, platformStyle == null ? null : platformStyle.e4b_1, lineHeightStyle, lineBreak, hyphens, textMotion), platformStyle);
    return $this;
  }
  function TextStyle_init_$Create$_1(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) {
    return TextStyle_init_$Init$_0(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion, objectCreate(protoOf(TextStyle)));
  }
  function Companion_1() {
    Companion_instance_3 = this;
    this.f4b_1 = TextStyle_init_$Create$_1();
  }
  var Companion_instance_3;
  function Companion_getInstance_14() {
    if (Companion_instance_3 == null)
      new Companion_1();
    return Companion_instance_3;
  }
  function TextStyle(spanStyle, paragraphStyle, platformStyle) {
    Companion_getInstance_14();
    platformStyle = platformStyle === VOID ? null : platformStyle;
    this.h46_1 = spanStyle;
    this.i46_1 = paragraphStyle;
    this.j46_1 = platformStyle;
  }
  protoOf(TextStyle).g4b = function () {
    return this.h46_1;
  };
  protoOf(TextStyle).k46 = function () {
    return this.i46_1;
  };
  protoOf(TextStyle).h4b = function (other) {
    if (other == null ? true : equals(other, Companion_getInstance_14().f4b_1))
      return this;
    return TextStyle_init_$Create$_0(this.g4b().k48(other.g4b()), this.k46().b44(other.k46()));
  };
  protoOf(TextStyle).i4b = function (color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, lineHeightStyle, lineBreak, hyphens, platformStyle, textMotion) {
    var mergedSpanStyle = fastMerge_0(this.h46_1, color, null, NaN, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle == null ? null : platformStyle.d4b_1, drawStyle);
    var mergedParagraphStyle = fastMerge(this.i46_1, textAlign, textDirection, lineHeight, textIndent, platformStyle == null ? null : platformStyle.e4b_1, lineHeightStyle, lineBreak, hyphens, textMotion);
    if (this.h46_1 === mergedSpanStyle ? this.i46_1 === mergedParagraphStyle : false)
      return this;
    return TextStyle_init_$Create$_0(mergedSpanStyle, mergedParagraphStyle);
  };
  protoOf(TextStyle).j4b = function (color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, lineHeightStyle, lineBreak, hyphens, platformStyle, textMotion, $super) {
    color = color === VOID ? Companion_getInstance().w3s_1 : color;
    fontSize = fontSize === VOID ? Companion_getInstance_1().f37_1 : fontSize;
    fontWeight = fontWeight === VOID ? null : fontWeight;
    fontStyle = fontStyle === VOID ? null : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? null : fontSynthesis;
    fontFamily = fontFamily === VOID ? null : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? null : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? Companion_getInstance_1().f37_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? null : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? null : textGeometricTransform;
    localeList = localeList === VOID ? null : localeList;
    background = background === VOID ? Companion_getInstance().w3s_1 : background;
    textDecoration = textDecoration === VOID ? null : textDecoration;
    shadow = shadow === VOID ? null : shadow;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    textAlign = textAlign === VOID ? Companion_getInstance_30().t46_1 : textAlign;
    textDirection = textDirection === VOID ? Companion_getInstance_32().g46_1 : textDirection;
    lineHeight = lineHeight === VOID ? Companion_getInstance_1().f37_1 : lineHeight;
    textIndent = textIndent === VOID ? null : textIndent;
    lineHeightStyle = lineHeightStyle === VOID ? null : lineHeightStyle;
    lineBreak = lineBreak === VOID ? Companion_getInstance_40().x46_1 : lineBreak;
    hyphens = hyphens === VOID ? Companion_getInstance_26().a47_1 : hyphens;
    platformStyle = platformStyle === VOID ? null : platformStyle;
    textMotion = textMotion === VOID ? null : textMotion;
    var tmp;
    if ($super === VOID) {
      tmp = this.i4b(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, lineHeightStyle, lineBreak, hyphens, platformStyle, textMotion);
    } else {
      var tmp_0 = $super.i4b;
      var tmp_1 = fontStyle;
      var tmp_2 = tmp_1 == null ? null : new FontStyle(tmp_1);
      var tmp_3 = fontSynthesis;
      var tmp_4 = tmp_3 == null ? null : new FontSynthesis(tmp_3);
      var tmp_5 = baselineShift;
      tmp = tmp_0.call(this, new Color(color), new TextUnit(fontSize), fontWeight, tmp_2, tmp_4, fontFamily, fontFeatureSettings, new TextUnit(letterSpacing), tmp_5 == null ? null : new BaselineShift(tmp_5), textGeometricTransform, localeList, new Color(background), textDecoration, shadow, drawStyle, new TextAlign(textAlign), new TextDirection(textDirection), new TextUnit(lineHeight), textIndent, lineHeightStyle, new LineBreak(lineBreak), new Hyphens(hyphens), platformStyle, textMotion);
    }
    return tmp;
  };
  protoOf(TextStyle).l46 = function (other) {
    return TextStyle_init_$Create$_0(this.g4b(), this.k46().b44(other));
  };
  protoOf(TextStyle).k4b = function (color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) {
    var tmp;
    if (equals(color, this.h46_1.g41())) {
      tmp = this.h46_1.t47_1;
    } else {
      tmp = Companion_instance_22.r47(color);
    }
    var tmp_0 = tmp;
    var tmp_1 = new SpanStyle(tmp_0, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle == null ? null : platformStyle.d4b_1, drawStyle);
    return new TextStyle(tmp_1, new ParagraphStyle_0(textAlign, textDirection, lineHeight, textIndent, platformStyle == null ? null : platformStyle.e4b_1, lineHeightStyle, lineBreak, hyphens, textMotion), platformStyle);
  };
  protoOf(TextStyle).l4b = function (color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion, $super) {
    color = color === VOID ? this.h46_1.g41() : color;
    fontSize = fontSize === VOID ? this.h46_1.u47_1 : fontSize;
    fontWeight = fontWeight === VOID ? this.h46_1.v47_1 : fontWeight;
    fontStyle = fontStyle === VOID ? this.h46_1.w47_1 : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? this.h46_1.x47_1 : fontSynthesis;
    fontFamily = fontFamily === VOID ? this.h46_1.y47_1 : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? this.h46_1.z47_1 : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? this.h46_1.a48_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? this.h46_1.b48_1 : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? this.h46_1.c48_1 : textGeometricTransform;
    localeList = localeList === VOID ? this.h46_1.d48_1 : localeList;
    background = background === VOID ? this.h46_1.e48_1 : background;
    textDecoration = textDecoration === VOID ? this.h46_1.f48_1 : textDecoration;
    shadow = shadow === VOID ? this.h46_1.g48_1 : shadow;
    drawStyle = drawStyle === VOID ? this.h46_1.i48_1 : drawStyle;
    textAlign = textAlign === VOID ? this.i46_1.s43_1 : textAlign;
    textDirection = textDirection === VOID ? this.i46_1.t43_1 : textDirection;
    lineHeight = lineHeight === VOID ? this.i46_1.u43_1 : lineHeight;
    textIndent = textIndent === VOID ? this.i46_1.v43_1 : textIndent;
    platformStyle = platformStyle === VOID ? this.j46_1 : platformStyle;
    lineHeightStyle = lineHeightStyle === VOID ? this.i46_1.x43_1 : lineHeightStyle;
    lineBreak = lineBreak === VOID ? this.i46_1.y43_1 : lineBreak;
    hyphens = hyphens === VOID ? this.i46_1.z43_1 : hyphens;
    textMotion = textMotion === VOID ? this.i46_1.a44_1 : textMotion;
    var tmp;
    if ($super === VOID) {
      tmp = this.k4b(color, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion);
    } else {
      var tmp_0 = $super.k4b;
      var tmp_1 = fontStyle;
      var tmp_2 = tmp_1 == null ? null : new FontStyle(tmp_1);
      var tmp_3 = fontSynthesis;
      var tmp_4 = tmp_3 == null ? null : new FontSynthesis(tmp_3);
      var tmp_5 = baselineShift;
      tmp = tmp_0.call(this, new Color(color), new TextUnit(fontSize), fontWeight, tmp_2, tmp_4, fontFamily, fontFeatureSettings, new TextUnit(letterSpacing), tmp_5 == null ? null : new BaselineShift(tmp_5), textGeometricTransform, localeList, new Color(background), textDecoration, shadow, drawStyle, new TextAlign(textAlign), new TextDirection(textDirection), new TextUnit(lineHeight), textIndent, platformStyle, lineHeightStyle, new LineBreak(lineBreak), new Hyphens(hyphens), textMotion);
    }
    return tmp;
  };
  protoOf(TextStyle).m4b = function (brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion) {
    var tmp = SpanStyle_init_$Create$_0(brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, platformStyle == null ? null : platformStyle.d4b_1, drawStyle);
    return new TextStyle(tmp, new ParagraphStyle_0(textAlign, textDirection, lineHeight, textIndent, platformStyle == null ? null : platformStyle.e4b_1, lineHeightStyle, lineBreak, hyphens, textMotion), platformStyle);
  };
  protoOf(TextStyle).n4b = function (brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion, $super) {
    alpha = alpha === VOID ? this.h46_1.p3n() : alpha;
    fontSize = fontSize === VOID ? this.h46_1.u47_1 : fontSize;
    fontWeight = fontWeight === VOID ? this.h46_1.v47_1 : fontWeight;
    fontStyle = fontStyle === VOID ? this.h46_1.w47_1 : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? this.h46_1.x47_1 : fontSynthesis;
    fontFamily = fontFamily === VOID ? this.h46_1.y47_1 : fontFamily;
    fontFeatureSettings = fontFeatureSettings === VOID ? this.h46_1.z47_1 : fontFeatureSettings;
    letterSpacing = letterSpacing === VOID ? this.h46_1.a48_1 : letterSpacing;
    baselineShift = baselineShift === VOID ? this.h46_1.b48_1 : baselineShift;
    textGeometricTransform = textGeometricTransform === VOID ? this.h46_1.c48_1 : textGeometricTransform;
    localeList = localeList === VOID ? this.h46_1.d48_1 : localeList;
    background = background === VOID ? this.h46_1.e48_1 : background;
    textDecoration = textDecoration === VOID ? this.h46_1.f48_1 : textDecoration;
    shadow = shadow === VOID ? this.h46_1.g48_1 : shadow;
    drawStyle = drawStyle === VOID ? this.h46_1.i48_1 : drawStyle;
    textAlign = textAlign === VOID ? this.i46_1.s43_1 : textAlign;
    textDirection = textDirection === VOID ? this.i46_1.t43_1 : textDirection;
    lineHeight = lineHeight === VOID ? this.i46_1.u43_1 : lineHeight;
    textIndent = textIndent === VOID ? this.i46_1.v43_1 : textIndent;
    platformStyle = platformStyle === VOID ? this.j46_1 : platformStyle;
    lineHeightStyle = lineHeightStyle === VOID ? this.i46_1.x43_1 : lineHeightStyle;
    lineBreak = lineBreak === VOID ? this.i46_1.y43_1 : lineBreak;
    hyphens = hyphens === VOID ? this.i46_1.z43_1 : hyphens;
    textMotion = textMotion === VOID ? this.i46_1.a44_1 : textMotion;
    var tmp;
    if ($super === VOID) {
      tmp = this.m4b(brush, alpha, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, shadow, drawStyle, textAlign, textDirection, lineHeight, textIndent, platformStyle, lineHeightStyle, lineBreak, hyphens, textMotion);
    } else {
      var tmp_0 = $super.m4b;
      var tmp_1 = fontStyle;
      var tmp_2 = tmp_1 == null ? null : new FontStyle(tmp_1);
      var tmp_3 = fontSynthesis;
      var tmp_4 = tmp_3 == null ? null : new FontSynthesis(tmp_3);
      var tmp_5 = baselineShift;
      tmp = tmp_0.call(this, brush, alpha, new TextUnit(fontSize), fontWeight, tmp_2, tmp_4, fontFamily, fontFeatureSettings, new TextUnit(letterSpacing), tmp_5 == null ? null : new BaselineShift(tmp_5), textGeometricTransform, localeList, new Color(background), textDecoration, shadow, drawStyle, new TextAlign(textAlign), new TextDirection(textDirection), new TextUnit(lineHeight), textIndent, platformStyle, lineHeightStyle, new LineBreak(lineBreak), new Hyphens(hyphens), textMotion);
    }
    return tmp;
  };
  protoOf(TextStyle).j48 = function () {
    return this.h46_1.j48();
  };
  protoOf(TextStyle).g41 = function () {
    return this.h46_1.g41();
  };
  protoOf(TextStyle).p3n = function () {
    return this.h46_1.p3n();
  };
  protoOf(TextStyle).o4b = function () {
    return this.h46_1.u47_1;
  };
  protoOf(TextStyle).p4b = function () {
    return this.h46_1.v47_1;
  };
  protoOf(TextStyle).q4b = function () {
    return this.h46_1.w47_1;
  };
  protoOf(TextStyle).r4b = function () {
    return this.h46_1.x47_1;
  };
  protoOf(TextStyle).s4b = function () {
    return this.h46_1.y47_1;
  };
  protoOf(TextStyle).t4b = function () {
    return this.h46_1.z47_1;
  };
  protoOf(TextStyle).u4b = function () {
    return this.h46_1.a48_1;
  };
  protoOf(TextStyle).v4b = function () {
    return this.h46_1.b48_1;
  };
  protoOf(TextStyle).w4b = function () {
    return this.h46_1.c48_1;
  };
  protoOf(TextStyle).x4b = function () {
    return this.h46_1.d48_1;
  };
  protoOf(TextStyle).y4b = function () {
    return this.h46_1.e48_1;
  };
  protoOf(TextStyle).z4b = function () {
    return this.h46_1.f48_1;
  };
  protoOf(TextStyle).a4c = function () {
    return this.h46_1.g48_1;
  };
  protoOf(TextStyle).b4c = function () {
    return this.h46_1.i48_1;
  };
  protoOf(TextStyle).c4c = function () {
    return this.i46_1.s43_1;
  };
  protoOf(TextStyle).d4c = function () {
    return this.i46_1.t43_1;
  };
  protoOf(TextStyle).e4c = function () {
    return this.i46_1.u43_1;
  };
  protoOf(TextStyle).f4c = function () {
    return this.i46_1.v43_1;
  };
  protoOf(TextStyle).g4c = function () {
    return this.i46_1.x43_1;
  };
  protoOf(TextStyle).h4c = function () {
    return this.i46_1.z43_1;
  };
  protoOf(TextStyle).i4c = function () {
    return this.i46_1.y43_1;
  };
  protoOf(TextStyle).j4c = function () {
    return this.i46_1.a44_1;
  };
  protoOf(TextStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextStyle))
      return false;
    if (!this.h46_1.equals(other.h46_1))
      return false;
    if (!this.i46_1.equals(other.i46_1))
      return false;
    if (!equals(this.j46_1, other.j46_1))
      return false;
    return true;
  };
  protoOf(TextStyle).k4c = function (other) {
    return this === other ? true : this.i46_1.equals(other.i46_1) ? this.h46_1.o48(other.h46_1) : false;
  };
  protoOf(TextStyle).l4c = function (other) {
    return this === other ? true : this.h46_1.n48(other.h46_1);
  };
  protoOf(TextStyle).hashCode = function () {
    var result = this.h46_1.hashCode();
    result = imul(31, result) + this.i46_1.hashCode() | 0;
    var tmp = imul(31, result);
    var tmp0_safe_receiver = this.j46_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
    result = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    return result;
  };
  protoOf(TextStyle).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.TextStyle.toString.<anonymous>' call
    this_0.y5('TextStyle(');
    this_0.y5('color=' + new Color(this.g41()) + ', ');
    this_0.y5('brush=' + this.j48() + ', ');
    this_0.y5('alpha=' + this.p3n() + ', ');
    this_0.y5('fontSize=' + new TextUnit(this.o4b()) + ', ');
    this_0.y5('fontWeight=' + this.p4b() + ', ');
    var tmp = this.q4b();
    this_0.y5('fontStyle=' + (tmp == null ? null : new FontStyle(tmp)) + ', ');
    var tmp_0 = this.r4b();
    this_0.y5('fontSynthesis=' + (tmp_0 == null ? null : new FontSynthesis(tmp_0)) + ', ');
    this_0.y5('fontFamily=' + this.s4b() + ', ');
    this_0.y5('fontFeatureSettings=' + this.t4b() + ', ');
    this_0.y5('letterSpacing=' + new TextUnit(this.u4b()) + ', ');
    var tmp_1 = this.v4b();
    this_0.y5('baselineShift=' + (tmp_1 == null ? null : new BaselineShift(tmp_1)) + ', ');
    this_0.y5('textGeometricTransform=' + this.w4b() + ', ');
    this_0.y5('localeList=' + this.x4b() + ', ');
    this_0.y5('background=' + new Color(this.y4b()) + ', ');
    this_0.y5('textDecoration=' + this.z4b() + ', ');
    this_0.y5('shadow=' + this.a4c() + ', ');
    this_0.y5('drawStyle=' + this.b4c() + ', ');
    this_0.y5('textAlign=' + new TextAlign(this.c4c()) + ', ');
    this_0.y5('textDirection=' + new TextDirection(this.d4c()) + ', ');
    this_0.y5('lineHeight=' + new TextUnit(this.e4c()) + ', ');
    this_0.y5('textIndent=' + this.f4c() + ', ');
    this_0.y5('platformStyle=' + this.j46_1 + ', ');
    this_0.y5('lineHeightStyle=' + this.g4c() + ', ');
    this_0.y5('lineBreak=' + new LineBreak(this.i4c()) + ', ');
    this_0.y5('hyphens=' + new Hyphens(this.h4c()) + ', ');
    this_0.y5('textMotion=' + this.j4c());
    this_0.y5(')');
    return this_0.toString();
  };
  function createPlatformTextStyleInternal(platformSpanStyle, platformParagraphStyle) {
    var tmp;
    if (platformSpanStyle == null ? platformParagraphStyle == null : false) {
      tmp = null;
    } else {
      tmp = createPlatformTextStyle(platformSpanStyle, platformParagraphStyle);
    }
    return tmp;
  }
  function resolveDefaults(style, direction) {
    return new TextStyle(resolveSpanStyleDefaults(style.h46_1), resolveParagraphStyleDefaults(style.i46_1, direction), style.j46_1);
  }
  function resolveTextDirection_0(layoutDirection, textDirection) {
    var tmp;
    if (textDirection === Companion_getInstance_32().d46_1) {
      var tmp_0;
      switch (layoutDirection.t9_1) {
        case 0:
          tmp_0 = Companion_getInstance_32().e46_1;
          break;
        case 1:
          tmp_0 = Companion_getInstance_32().f46_1;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_0;
    } else if (textDirection === Companion_getInstance_32().g46_1) {
      var tmp_1;
      switch (layoutDirection.t9_1) {
        case 0:
          tmp_1 = Companion_getInstance_32().b46_1;
          break;
        case 1:
          tmp_1 = Companion_getInstance_32().c46_1;
          break;
        default:
          noWhenBranchMatchedException();
          break;
      }
      tmp = tmp_1;
    } else {
      tmp = textDirection;
    }
    return tmp;
  }
  function get_EMPTY_INTS() {
    _init_properties_ContainerHelpers_kt__6fon4s();
    return EMPTY_INTS;
  }
  var EMPTY_INTS;
  function get_EMPTY_OBJECTS() {
    _init_properties_ContainerHelpers_kt__6fon4s();
    return EMPTY_OBJECTS;
  }
  var EMPTY_OBJECTS;
  function binarySearchInternal(_this__u8e3s4, size, value) {
    _init_properties_ContainerHelpers_kt__6fon4s();
    var lo = 0;
    var hi = size - 1 | 0;
    while (lo <= hi) {
      var mid = (lo + hi | 0) >>> 1 | 0;
      var midVal = _this__u8e3s4[mid];
      if (midVal < value) {
        lo = mid + 1 | 0;
      } else if (midVal > value) {
        hi = mid - 1 | 0;
      } else {
        return mid;
      }
    }
    return ~lo;
  }
  var properties_initialized_ContainerHelpers_kt_9fe6be;
  function _init_properties_ContainerHelpers_kt__6fon4s() {
    if (!properties_initialized_ContainerHelpers_kt_9fe6be) {
      properties_initialized_ContainerHelpers_kt_9fe6be = true;
      EMPTY_INTS = new Int32Array(0);
      // Inline function 'kotlin.arrayOfNulls' call
      EMPTY_OBJECTS = fillArrayVal(Array(0), null);
    }
  }
  function LruCache_init_$Init$(maxSize, $this) {
    LruCache.call($this);
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(maxSize > 0)) {
      // Inline function 'androidx.compose.ui.text.caches.LruCache.<init>.<anonymous>' call
      var message = 'maxSize <= 0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    $this.q4c_1 = maxSize;
    $this.n4c_1 = HashMap_init_$Create$(0, 0.75);
    $this.o4c_1 = LinkedHashSet_init_$Create$();
    return $this;
  }
  function LruCache_init_$Create$(maxSize) {
    return LruCache_init_$Init$(maxSize, objectCreate(protoOf(LruCache)));
  }
  function safeSizeOf($this, key, value) {
    var result = $this.w4c(key, value);
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(result >= 0)) {
      // Inline function 'androidx.compose.ui.text.caches.LruCache.safeSizeOf.<anonymous>' call
      var message = 'Negative size: ' + key + '=' + value;
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return result;
  }
  protoOf(LruCache).m = function () {
    // Inline function 'androidx.compose.ui.text.caches.LruCache.synchronizedValue' call
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.m4c_1;
    return this.p4c_1;
  };
  protoOf(LruCache).z2 = function (key) {
    var mapValue = null;
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.m4c_1;
    // Inline function 'androidx.compose.ui.text.caches.LruCache.get.<anonymous>' call
    mapValue = this.n4c_1.z2(key);
    var tmp;
    if (!(mapValue == null)) {
      this.o4c_1.b1(key);
      this.o4c_1.a1(key);
      this.u4c_1 = this.u4c_1 + 1 | 0;
      return mapValue;
    } else {
      var tmp3 = this.v4c_1;
      this.v4c_1 = tmp3 + 1 | 0;
      tmp = tmp3;
    }
    var createdValue = this.x4c(key);
    if (createdValue == null) {
      return null;
    }
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.m4c_1;
    this.s4c_1 = this.s4c_1 + 1 | 0;
    var previousValue = this.n4c_1.p2(key, createdValue);
    this.o4c_1.b1(key);
    this.o4c_1.a1(key);
    var tmp_0;
    if (!(previousValue == null)) {
      this.n4c_1.p2(key, previousValue);
      mapValue = previousValue;
      tmp_0 = Unit_instance;
    } else {
      this.p4c_1 = this.m() + safeSizeOf(this, key, createdValue) | 0;
      tmp_0 = Unit_instance;
    }
    if (!(mapValue == null)) {
      this.z4c(false, key, createdValue, mapValue);
      return mapValue;
    } else {
      this.y4c(this.q4c_1);
      return createdValue;
    }
  };
  protoOf(LruCache).p2 = function (key, value) {
    if (key == null ? true : value == null) {
      throw NullPointerException_init_$Create$();
    }
    var previous = null;
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.m4c_1;
    // Inline function 'androidx.compose.ui.text.caches.LruCache.put.<anonymous>' call
    this.r4c_1 = this.r4c_1 + 1 | 0;
    this.p4c_1 = this.m() + safeSizeOf(this, key, value) | 0;
    previous = this.n4c_1.p2(key, value);
    if (!(previous == null)) {
      this.p4c_1 = this.m() - safeSizeOf(this, key, ensureNotNull(previous)) | 0;
    }
    if (this.o4c_1.s(key)) {
      this.o4c_1.b1(key);
    }
    this.o4c_1.a1(key);
    if (!(previous == null)) {
      this.z4c(false, key, ensureNotNull(previous), value);
    }
    this.y4c(this.q4c_1);
    return previous;
  };
  protoOf(LruCache).y4c = function (maxSize) {
    $l$loop: while (true) {
      var key = null;
      var value = null;
      // Inline function 'androidx.compose.ui.text.synchronized' call
      // Inline function 'kotlinx.atomicfu.locks.synchronized' call
      this.m4c_1;
      if ((this.m() < 0 ? true : this.n4c_1.u() ? !(this.m() === 0) : false) ? true : !(this.n4c_1.u() === this.o4c_1.u())) {
        throw IllegalStateException_init_$Create$('map/keySet size inconsistency');
      }
      var tmp;
      if (this.m() > maxSize ? !this.n4c_1.u() : false) {
        key = first(this.o4c_1);
        // Inline function 'kotlin.collections.get' call
        var this_0 = this.n4c_1;
        var key_0 = key;
        var tmp0_elvis_lhs = (isInterface(this_0, Map) ? this_0 : THROW_CCE()).z2(key_0);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          throw IllegalStateException_init_$Create$('inconsistent state');
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        value = tmp_0;
        // Inline function 'kotlin.collections.remove' call
        var this_1 = this.n4c_1;
        var key_1 = key;
        (isInterface(this_1, MutableMap) ? this_1 : THROW_CCE()).t2(key_1);
        // Inline function 'kotlin.collections.remove' call
        var this_2 = this.o4c_1;
        var element = key;
        (isInterface(this_2, MutableCollection) ? this_2 : THROW_CCE()).b1(element);
        this.p4c_1 = this.m() - safeSizeOf(this, ensureNotNull(key), ensureNotNull(value)) | 0;
        this.t4c_1 = this.t4c_1 + 1 | 0;
        tmp = Unit_instance;
      }
      if (key == null ? value == null : false) {
        break $l$loop;
      } else {
        this.z4c(true, ensureNotNull(key), ensureNotNull(value), null);
      }
    }
  };
  protoOf(LruCache).t2 = function (key) {
    if (key == null) {
      throw NullPointerException_init_$Create$();
    }
    var previous = null;
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.m4c_1;
    previous = this.n4c_1.t2(key);
    this.o4c_1.b1(key);
    var tmp;
    if (!(previous == null)) {
      this.p4c_1 = this.m() - safeSizeOf(this, key, ensureNotNull(previous)) | 0;
      tmp = Unit_instance;
    }
    if (!(previous == null)) {
      this.z4c(false, key, ensureNotNull(previous), null);
    }
    return previous;
  };
  protoOf(LruCache).z4c = function (evicted, key, oldValue, newValue) {
  };
  protoOf(LruCache).x4c = function (key) {
    return null;
  };
  protoOf(LruCache).w4c = function (key, value) {
    return 1;
  };
  protoOf(LruCache).toString = function () {
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.m4c_1;
    var accesses = this.u4c_1 + this.v4c_1 | 0;
    var hitPercent = !(accesses === 0) ? imul(100, this.u4c_1) / accesses | 0 : 0;
    return 'LruCache[maxSize=' + this.q4c_1 + ',hits=' + this.u4c_1 + ',misses=' + this.v4c_1 + ',' + ('hitRate=' + hitPercent + '%]');
  };
  function LruCache() {
    this.m4c_1 = createSynchronizedObject();
    this.p4c_1 = 0;
    this.q4c_1 = 0;
    this.r4c_1 = 0;
    this.s4c_1 = 0;
    this.t4c_1 = 0;
    this.u4c_1 = 0;
    this.v4c_1 = 0;
  }
  function SimpleArrayMap_init_$Init$(capacity, $this) {
    capacity = capacity === VOID ? 0 : capacity;
    SimpleArrayMap.call($this);
    if (capacity === 0) {
      $this.a4d_1 = get_EMPTY_INTS();
      $this.b4d_1 = get_EMPTY_OBJECTS();
    } else {
      $this.a4d_1 = new Int32Array(capacity);
      var tmp = $this;
      // Inline function 'kotlin.arrayOfNulls' call
      var size = capacity << 1;
      tmp.b4d_1 = fillArrayVal(Array(size), null);
    }
    $this.c4d_1 = 0;
    return $this;
  }
  function SimpleArrayMap_init_$Create$(capacity) {
    return SimpleArrayMap_init_$Init$(capacity, objectCreate(protoOf(SimpleArrayMap)));
  }
  protoOf(SimpleArrayMap).d4d = function (key, hash) {
    var N = this.c4d_1;
    if (N === 0) {
      return -1;
    }
    var index = binarySearchInternal(this.a4d_1, N, hash);
    if (index < 0) {
      return index;
    }
    if (equals(key, this.b4d_1[index << 1])) {
      return index;
    }
    var end;
    end = index + 1 | 0;
    while (end < N ? this.a4d_1[end] === hash : false) {
      if (equals(key, this.b4d_1[end << 1]))
        return end;
      end = end + 1 | 0;
    }
    var i = index - 1 | 0;
    while (i >= 0 ? this.a4d_1[i] === hash : false) {
      if (equals(key, this.b4d_1[i << 1]))
        return i;
      i = i - 1 | 0;
    }
    return ~end;
  };
  protoOf(SimpleArrayMap).e4d = function () {
    var N = this.c4d_1;
    if (N === 0) {
      return -1;
    }
    var index = binarySearchInternal(this.a4d_1, N, 0);
    if (index < 0) {
      return index;
    }
    if (null == this.b4d_1[index << 1]) {
      return index;
    }
    var end;
    end = index + 1 | 0;
    while (end < N ? this.a4d_1[end] === 0 : false) {
      if (null == this.b4d_1[end << 1])
        return end;
      end = end + 1 | 0;
    }
    var i = index - 1 | 0;
    while (i >= 0 ? this.a4d_1[i] === 0 : false) {
      if (null == this.b4d_1[i << 1])
        return i;
      i = i - 1 | 0;
    }
    return ~end;
  };
  protoOf(SimpleArrayMap).w2 = function (key) {
    return this.f4d(key) >= 0;
  };
  protoOf(SimpleArrayMap).f4d = function (key) {
    return key == null ? this.e4d() : this.d4d(key, hashCode(key));
  };
  protoOf(SimpleArrayMap).z2 = function (key) {
    var index = this.f4d(key);
    var tmp;
    if (index >= 0) {
      var tmp_0 = this.b4d_1[(index << 1) + 1 | 0];
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      tmp = null;
    }
    return tmp;
  };
  protoOf(SimpleArrayMap).zn = function (index) {
    var tmp = this.b4d_1[index << 1];
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(SimpleArrayMap).ao = function (index) {
    var tmp = this.b4d_1[(index << 1) + 1 | 0];
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(SimpleArrayMap).u = function () {
    return this.c4d_1 <= 0;
  };
  protoOf(SimpleArrayMap).p2 = function (key, value) {
    var osize = this.c4d_1;
    var hash;
    var index;
    if (key == null) {
      hash = 0;
      index = this.e4d();
    } else {
      hash = hashCode(key);
      index = this.d4d(key, hash);
    }
    if (index >= 0) {
      index = (index << 1) + 1 | 0;
      var tmp = this.b4d_1[index];
      var old = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      this.b4d_1[index] = value;
      return old;
    }
    index = ~index;
    if (osize >= this.a4d_1.length) {
      var n = osize >= 8 ? osize + (osize >> 1) | 0 : osize >= 4 ? 8 : 4;
      if (false) {
        println('SimpleArrayMap put: grow from ' + this.a4d_1.length + ' to ' + n);
      }
      this.a4d_1 = copyOf(this.a4d_1, n);
      this.b4d_1 = copyOf_0(this.b4d_1, n << 1);
      if (!(osize === this.c4d_1)) {
        throw ConcurrentModificationException_init_$Create$();
      }
    }
    if (index < osize) {
      if (false) {
        println('SimpleArrayMap put: move ' + index + '-' + (osize - index | 0) + ' to ' + (index + 1 | 0));
      }
      // Inline function 'kotlin.collections.copyInto' call
      var this_0 = this.a4d_1;
      var destination = this.a4d_1;
      var destinationOffset = index + 1 | 0;
      var startIndex = index;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp_0 = this_0;
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      arrayCopy(tmp_0, destination, destinationOffset, startIndex, osize);
      // Inline function 'kotlin.collections.copyInto' call
      var this_1 = this.b4d_1;
      var destination_0 = this.b4d_1;
      var destinationOffset_0 = (index + 1 | 0) << 1;
      var startIndex_0 = index << 1;
      var endIndex = this.c4d_1 << 1;
      arrayCopy(this_1, destination_0, destinationOffset_0, startIndex_0, endIndex);
    }
    if (!(osize === this.c4d_1) ? true : index >= this.a4d_1.length) {
      throw ConcurrentModificationException_init_$Create$();
    }
    this.a4d_1[index] = hash;
    this.b4d_1[index << 1] = key;
    this.b4d_1[(index << 1) + 1 | 0] = value;
    this.c4d_1 = this.c4d_1 + 1 | 0;
    return null;
  };
  protoOf(SimpleArrayMap).equals = function (other) {
    if (this === other) {
      return true;
    }
    try {
      if (other instanceof SimpleArrayMap) {
        var map = other instanceof SimpleArrayMap ? other : THROW_CCE();
        if (!(this.c4d_1 === map.c4d_1)) {
          return false;
        }
        var inductionVariable = 0;
        var last = this.c4d_1;
        if (inductionVariable < last)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var key = this.zn(i);
            var mine = this.ao(i);
            var theirs = map.z2(key);
            if (mine == null) {
              if (!(theirs == null) ? true : !map.w2(key)) {
                return false;
              }
            } else if (!equals(mine, theirs)) {
              return false;
            }
          }
           while (inductionVariable < last);
        return true;
      } else {
        if (!(other == null) ? isInterface(other, Map) : false) {
          var map_0 = other;
          if (!(this.c4d_1 === map_0.m())) {
            return false;
          }
          var inductionVariable_0 = 0;
          var last_0 = this.c4d_1;
          if (inductionVariable_0 < last_0)
            do {
              var i_0 = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              var key_0 = this.zn(i_0);
              var mine_0 = this.ao(i_0);
              // Inline function 'kotlin.collections.get' call
              var theirs_0 = (isInterface(map_0, Map) ? map_0 : THROW_CCE()).z2(key_0);
              if (mine_0 == null) {
                var tmp;
                if (!(theirs_0 == null)) {
                  tmp = true;
                } else {
                  // Inline function 'kotlin.collections.containsKey' call
                  tmp = !(isInterface(map_0, Map) ? map_0 : THROW_CCE()).w2(key_0);
                }
                if (tmp) {
                  return false;
                }
              } else if (!equals(mine_0, theirs_0)) {
                return false;
              }
            }
             while (inductionVariable_0 < last_0);
          return true;
        }
      }
    } catch ($p) {
      if ($p instanceof NullPointerException) {
        var ignored = $p;
      } else {
        if ($p instanceof ClassCastException) {
          var ignored_0 = $p;
        } else {
          throw $p;
        }
      }
    }
    return false;
  };
  protoOf(SimpleArrayMap).hashCode = function () {
    var hashes = this.a4d_1;
    var array = this.b4d_1;
    var result = 0;
    var i = 0;
    var v = 1;
    var s = this.c4d_1;
    while (i < s) {
      var value = array[v];
      var tmp = result;
      var tmp_0 = hashes[i];
      var tmp1_elvis_lhs = value == null ? null : hashCode(value);
      result = tmp + (tmp_0 ^ (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs)) | 0;
      i = i + 1 | 0;
      v = v + 2 | 0;
    }
    return result;
  };
  protoOf(SimpleArrayMap).toString = function () {
    if (this.u()) {
      return '{}';
    }
    var buffer = StringBuilder_init_$Create$_0(imul(this.c4d_1, 28));
    buffer.z5(_Char___init__impl__6a9atx(123));
    var inductionVariable = 0;
    var last = this.c4d_1;
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (i > 0) {
          buffer.y5(', ');
        }
        var key = this.zn(i);
        if (!(key === this)) {
          buffer.x5(key);
        } else {
          buffer.y5('(this Map)');
        }
        buffer.z5(_Char___init__impl__6a9atx(61));
        var value = this.ao(i);
        if (!(value === this)) {
          buffer.x5(value);
        } else {
          buffer.y5('(this Map)');
        }
      }
       while (inductionVariable < last);
    buffer.z5(_Char___init__impl__6a9atx(125));
    return buffer.toString();
  };
  function SimpleArrayMap() {
    this.c4d_1 = 0;
  }
  function Companion_2() {
    Companion_instance_4 = this;
    this.g4d_1 = new Long(15000, 0);
  }
  var Companion_instance_4;
  function Companion_getInstance_15() {
    if (Companion_instance_4 == null)
      new Companion_2();
    return Companion_instance_4;
  }
  function Font() {
  }
  function Companion_3() {
    Companion_instance_5 = this;
    this.s49_1 = new DefaultFontFamily();
    this.t49_1 = new GenericFontFamily('sans-serif', 'FontFamily.SansSerif');
    this.u49_1 = new GenericFontFamily('serif', 'FontFamily.Serif');
    this.v49_1 = new GenericFontFamily('monospace', 'FontFamily.Monospace');
    this.w49_1 = new GenericFontFamily('cursive', 'FontFamily.Cursive');
  }
  var Companion_instance_5;
  function Companion_getInstance_16() {
    if (Companion_instance_5 == null)
      new Companion_3();
    return Companion_instance_5;
  }
  function FontFamily(canLoadSynchronously) {
    Companion_getInstance_16();
    this.m4d_1 = canLoadSynchronously;
  }
  function SystemFontFamily() {
    FontFamily.call(this, true);
  }
  function DefaultFontFamily() {
    SystemFontFamily.call(this);
  }
  protoOf(DefaultFontFamily).toString = function () {
    return 'FontFamily.Default';
  };
  function GenericFontFamily(name, fontFamilyName) {
    SystemFontFamily.call(this);
    this.o4d_1 = name;
    this.p4d_1 = fontFamilyName;
  }
  protoOf(GenericFontFamily).toString = function () {
    return this.p4d_1;
  };
  function FontListFontFamily() {
  }
  function FileBasedFontFamily() {
  }
  function LoadedFontFamily() {
  }
  function get_GlobalTypefaceRequestCache() {
    _init_properties_FontFamilyResolver_kt__lawdt3();
    return GlobalTypefaceRequestCache;
  }
  var GlobalTypefaceRequestCache;
  function get_GlobalAsyncTypefaceCache() {
    _init_properties_FontFamilyResolver_kt__lawdt3();
    return GlobalAsyncTypefaceCache;
  }
  var GlobalAsyncTypefaceCache;
  function TypefaceRequestCache$runCached$lambda(this$0, $typefaceRequest) {
    return function (finalResult) {
      // Inline function 'androidx.compose.ui.text.synchronized' call
      // Inline function 'kotlinx.atomicfu.locks.synchronized' call
      this$0.q4d_1;
      var tmp;
      if (finalResult.s4d()) {
        this$0.r4d_1.p2($typefaceRequest, finalResult);
        tmp = Unit_instance;
      } else {
        this$0.r4d_1.t2($typefaceRequest);
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function TypefaceRequestCache() {
    this.q4d_1 = createSynchronizedObject();
    this.r4d_1 = LruCache_init_$Create$(16);
  }
  protoOf(TypefaceRequestCache).t4d = function (typefaceRequest, resolveTypeface) {
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.q4d_1;
    // Inline function 'androidx.compose.ui.text.font.TypefaceRequestCache.runCached.<anonymous>' call
    var tmp0_safe_receiver = this.r4d_1.z2(typefaceRequest);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.font.TypefaceRequestCache.runCached.<anonymous>.<anonymous>' call
      var tmp_0;
      if (tmp0_safe_receiver.s4d()) {
        return tmp0_safe_receiver;
      } else {
        tmp_0 = this.r4d_1.t2(typefaceRequest);
      }
      tmp = tmp_0;
    }
    var tmp_1;
    try {
      tmp_1 = resolveTypeface(TypefaceRequestCache$runCached$lambda(this, typefaceRequest));
    } catch ($p) {
      var tmp_2;
      if ($p instanceof Exception) {
        var cause = $p;
        throw new FontLoadFailedException(typefaceRequest.u4d_1, cause);
      } else {
        throw $p;
      }
    }
    var currentTypefaceResult = tmp_1;
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.q4d_1;
    var tmp_3;
    if (this.r4d_1.z2(typefaceRequest) == null ? currentTypefaceResult.s4d() : false) {
      this.r4d_1.p2(typefaceRequest, currentTypefaceResult);
      tmp_3 = Unit_instance;
    }
    return currentTypefaceResult;
  };
  function TypefaceRequest(fontFamily, fontWeight, fontStyle, fontSynthesis, resourceLoaderCacheKey) {
    this.u4d_1 = fontFamily;
    this.v4d_1 = fontWeight;
    this.w4d_1 = fontStyle;
    this.x4d_1 = fontSynthesis;
    this.y4d_1 = resourceLoaderCacheKey;
  }
  protoOf(TypefaceRequest).z4d = function (fontFamily, fontWeight, fontStyle, fontSynthesis, resourceLoaderCacheKey) {
    return new TypefaceRequest(fontFamily, fontWeight, fontStyle, fontSynthesis, resourceLoaderCacheKey);
  };
  protoOf(TypefaceRequest).a4e = function (fontFamily, fontWeight, fontStyle, fontSynthesis, resourceLoaderCacheKey, $super) {
    fontFamily = fontFamily === VOID ? this.u4d_1 : fontFamily;
    fontWeight = fontWeight === VOID ? this.v4d_1 : fontWeight;
    fontStyle = fontStyle === VOID ? this.w4d_1 : fontStyle;
    fontSynthesis = fontSynthesis === VOID ? this.x4d_1 : fontSynthesis;
    resourceLoaderCacheKey = resourceLoaderCacheKey === VOID ? this.y4d_1 : resourceLoaderCacheKey;
    return $super === VOID ? this.z4d(fontFamily, fontWeight, fontStyle, fontSynthesis, resourceLoaderCacheKey) : $super.z4d.call(this, fontFamily, fontWeight, new FontStyle(fontStyle), new FontSynthesis(fontSynthesis), resourceLoaderCacheKey);
  };
  protoOf(TypefaceRequest).toString = function () {
    return 'TypefaceRequest(fontFamily=' + this.u4d_1 + ', fontWeight=' + this.v4d_1 + ', fontStyle=' + new FontStyle(this.w4d_1) + ', fontSynthesis=' + new FontSynthesis(this.x4d_1) + ', resourceLoaderCacheKey=' + toString_0(this.y4d_1) + ')';
  };
  protoOf(TypefaceRequest).hashCode = function () {
    var result = this.u4d_1 == null ? 0 : hashCode(this.u4d_1);
    result = imul(result, 31) + this.v4d_1.hashCode() | 0;
    result = imul(result, 31) + FontStyle__hashCode_impl_7qhg4w(this.w4d_1) | 0;
    result = imul(result, 31) + FontSynthesis__hashCode_impl_4wi11v(this.x4d_1) | 0;
    result = imul(result, 31) + (this.y4d_1 == null ? 0 : hashCode(this.y4d_1)) | 0;
    return result;
  };
  protoOf(TypefaceRequest).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TypefaceRequest))
      return false;
    var tmp0_other_with_cast = other instanceof TypefaceRequest ? other : THROW_CCE();
    if (!equals(this.u4d_1, tmp0_other_with_cast.u4d_1))
      return false;
    if (!this.v4d_1.equals(tmp0_other_with_cast.v4d_1))
      return false;
    if (!(this.w4d_1 === tmp0_other_with_cast.w4d_1))
      return false;
    if (!(this.x4d_1 === tmp0_other_with_cast.x4d_1))
      return false;
    if (!equals(this.y4d_1, tmp0_other_with_cast.y4d_1))
      return false;
    return true;
  };
  function Immutable(value, cacheable) {
    cacheable = cacheable === VOID ? true : cacheable;
    this.b4e_1 = value;
    this.c4e_1 = cacheable;
  }
  protoOf(Immutable).s2 = function () {
    return this.b4e_1;
  };
  protoOf(Immutable).s4d = function () {
    return this.c4e_1;
  };
  function Async(current) {
    this.d4e_1 = current;
  }
  protoOf(Async).s2 = function () {
    return this.d4e_1.s2();
  };
  protoOf(Async).s4d = function () {
    return this.d4e_1.k4e_1;
  };
  function FontLoadFailedException(fontFamily, cause) {
    cause = cause === VOID ? null : cause;
    IllegalStateException_init_$Init$('Failed to load font ' + fontFamily + '. Is it installed on the system?', cause, this);
    captureStack(this, FontLoadFailedException);
  }
  function resolve($this, typefaceRequest) {
    var result = $this.n4e_1.t4d(typefaceRequest, FontFamilyResolverImpl$resolve$lambda($this, typefaceRequest));
    return result;
  }
  function FontFamilyResolverImpl$createDefaultTypeface$lambda(this$0) {
    return function (it) {
      return resolve(this$0, it.a4e(null)).s2();
    };
  }
  function FontFamilyResolverImpl$resolve$lambda(this$0, $typefaceRequest) {
    return function (onAsyncCompletion) {
      var tmp0_elvis_lhs = this$0.o4e_1.t4e($typefaceRequest, this$0.l4e_1, onAsyncCompletion, this$0.q4e_1);
      var tmp1_elvis_lhs = tmp0_elvis_lhs == null ? this$0.p4e_1.t4e($typefaceRequest, this$0.l4e_1, onAsyncCompletion, this$0.q4e_1) : tmp0_elvis_lhs;
      var tmp;
      if (tmp1_elvis_lhs == null) {
        throw new FontLoadFailedException($typefaceRequest.u4d_1);
      } else {
        tmp = tmp1_elvis_lhs;
      }
      return tmp;
    };
  }
  function FontFamilyResolverImpl(platformFontLoader, platformResolveInterceptor, typefaceRequestCache, fontListFontFamilyTypefaceAdapter, platformFamilyTypefaceAdapter) {
    platformResolveInterceptor = platformResolveInterceptor === VOID ? Companion_getInstance_17().u4e_1 : platformResolveInterceptor;
    typefaceRequestCache = typefaceRequestCache === VOID ? get_GlobalTypefaceRequestCache() : typefaceRequestCache;
    fontListFontFamilyTypefaceAdapter = fontListFontFamilyTypefaceAdapter === VOID ? new FontListFontFamilyTypefaceAdapter(get_GlobalAsyncTypefaceCache()) : fontListFontFamilyTypefaceAdapter;
    platformFamilyTypefaceAdapter = platformFamilyTypefaceAdapter === VOID ? new PlatformFontFamilyTypefaceAdapter() : platformFamilyTypefaceAdapter;
    this.l4e_1 = platformFontLoader;
    this.m4e_1 = platformResolveInterceptor;
    this.n4e_1 = typefaceRequestCache;
    this.o4e_1 = fontListFontFamilyTypefaceAdapter;
    this.p4e_1 = platformFamilyTypefaceAdapter;
    var tmp = this;
    tmp.q4e_1 = FontFamilyResolverImpl$createDefaultTypeface$lambda(this);
  }
  protoOf(FontFamilyResolverImpl).v4e = function (fontFamily, fontWeight, fontStyle, fontSynthesis) {
    return resolve(this, new TypefaceRequest(this.m4e_1.w4e(fontFamily), this.m4e_1.x4e(fontWeight), this.m4e_1.y4e(fontStyle), this.m4e_1.z4e(fontSynthesis), this.l4e_1.a4f()));
  };
  function PlatformResolveInterceptor$Companion$Default$1() {
  }
  function Companion_4() {
    Companion_instance_6 = this;
    var tmp = this;
    tmp.u4e_1 = new PlatformResolveInterceptor$Companion$Default$1();
  }
  var Companion_instance_6;
  function Companion_getInstance_17() {
    if (Companion_instance_6 == null)
      new Companion_4();
    return Companion_instance_6;
  }
  function PlatformResolveInterceptor() {
  }
  var properties_initialized_FontFamilyResolver_kt_43uw85;
  function _init_properties_FontFamilyResolver_kt__lawdt3() {
    if (!properties_initialized_FontFamilyResolver_kt_43uw85) {
      properties_initialized_FontFamilyResolver_kt_43uw85 = true;
      GlobalTypefaceRequestCache = new TypefaceRequestCache();
      GlobalAsyncTypefaceCache = new AsyncTypefaceCache();
    }
  }
  function _AsyncTypefaceResult___init__impl__h4msax(result) {
    return result;
  }
  function _AsyncTypefaceResult___get_result__impl__kpcqqb($this) {
    return $this;
  }
  function _AsyncTypefaceResult___get_isPermanentFailure__impl__sthpca($this) {
    return _AsyncTypefaceResult___get_result__impl__kpcqqb($this) == null;
  }
  function AsyncTypefaceResult__toString_impl_imltdd($this) {
    return 'AsyncTypefaceResult(result=' + toString_0($this) + ')';
  }
  function AsyncTypefaceResult__hashCode_impl_34k3fi($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function AsyncTypefaceResult__equals_impl_4qqxz2($this, other) {
    if (!(other instanceof AsyncTypefaceResult))
      return false;
    var tmp0_other_with_cast = other instanceof AsyncTypefaceResult ? other.b4f_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function AsyncTypefaceResult(result) {
    this.b4f_1 = result;
  }
  protoOf(AsyncTypefaceResult).toString = function () {
    return AsyncTypefaceResult__toString_impl_imltdd(this.b4f_1);
  };
  protoOf(AsyncTypefaceResult).hashCode = function () {
    return AsyncTypefaceResult__hashCode_impl_34k3fi(this.b4f_1);
  };
  protoOf(AsyncTypefaceResult).equals = function (other) {
    return AsyncTypefaceResult__equals_impl_4qqxz2(this.b4f_1, other);
  };
  function Key(font, loaderKey) {
    this.c4f_1 = font;
    this.d4f_1 = loaderKey;
  }
  protoOf(Key).toString = function () {
    return 'Key(font=' + this.c4f_1 + ', loaderKey=' + toString_0(this.d4f_1) + ')';
  };
  protoOf(Key).hashCode = function () {
    var result = hashCode(this.c4f_1);
    result = imul(result, 31) + (this.d4f_1 == null ? 0 : hashCode(this.d4f_1)) | 0;
    return result;
  };
  protoOf(Key).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Key))
      return false;
    var tmp0_other_with_cast = other instanceof Key ? other : THROW_CCE();
    if (!equals(this.c4f_1, tmp0_other_with_cast.c4f_1))
      return false;
    if (!equals(this.d4f_1, tmp0_other_with_cast.d4f_1))
      return false;
    return true;
  };
  function $runCachedCOROUTINE$1(_this__u8e3s4, font, platformFontLoader, forever, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.m4f_1 = _this__u8e3s4;
    this.n4f_1 = font;
    this.o4f_1 = platformFontLoader;
    this.p4f_1 = forever;
    this.q4f_1 = block;
  }
  protoOf($runCachedCOROUTINE$1).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.r4f_1 = new Key(this.n4f_1, this.o4f_1.a4f());
            this.m4f_1.v4f_1;
            var tmp0_elvis_lhs = this.m4f_1.t4f_1.z2(this.r4f_1);
            var priorResult = tmp0_elvis_lhs == null ? this.m4f_1.u4f_1.z2(this.r4f_1) : tmp0_elvis_lhs;
            if (!(priorResult == null)) {
              return _AsyncTypefaceResult___get_result__impl__kpcqqb(priorResult.b4f_1);
            }

            this.ac_1 = 1;
            suspendResult = this.q4f_1(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            var this_0 = suspendResult;
            this.m4f_1.v4f_1;
            if (this_0 == null) {
              this.m4f_1.u4f_1.p2(this.r4f_1, new AsyncTypefaceResult(this.m4f_1.s4f_1));
            } else if (this.p4f_1) {
              this.m4f_1.u4f_1.p2(this.r4f_1, new AsyncTypefaceResult(_AsyncTypefaceResult___init__impl__h4msax(this_0)));
            } else {
              this.m4f_1.t4f_1.p2(this.r4f_1, new AsyncTypefaceResult(_AsyncTypefaceResult___init__impl__h4msax(this_0)));
            }

            return this_0;
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
  function AsyncTypefaceCache() {
    this.s4f_1 = _AsyncTypefaceResult___init__impl__h4msax(null);
    this.t4f_1 = LruCache_init_$Create$(16);
    this.u4f_1 = SimpleArrayMap_init_$Create$();
    this.v4f_1 = createSynchronizedObject();
  }
  protoOf(AsyncTypefaceCache).w4f = function (font, platformFontLoader, result, forever) {
    var key = new Key(font, platformFontLoader.a4f());
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.v4f_1;
    // Inline function 'androidx.compose.ui.text.font.AsyncTypefaceCache.put.<anonymous>' call
    var tmp;
    if (result == null) {
      tmp = this.u4f_1.p2(key, new AsyncTypefaceResult(this.s4f_1));
    } else if (forever) {
      tmp = this.u4f_1.p2(key, new AsyncTypefaceResult(_AsyncTypefaceResult___init__impl__h4msax(result)));
    } else {
      tmp = this.t4f_1.p2(key, new AsyncTypefaceResult(_AsyncTypefaceResult___init__impl__h4msax(result)));
    }
  };
  protoOf(AsyncTypefaceCache).x4f = function (font, platformFontLoader, result, forever, $super) {
    forever = forever === VOID ? false : forever;
    var tmp;
    if ($super === VOID) {
      this.w4f(font, platformFontLoader, result, forever);
      tmp = Unit_instance;
    } else {
      tmp = $super.w4f.call(this, font, platformFontLoader, result, forever);
    }
    return tmp;
  };
  protoOf(AsyncTypefaceCache).y4f = function (font, platformFontLoader) {
    var key = new Key(font, platformFontLoader.a4f());
    // Inline function 'androidx.compose.ui.text.synchronized' call
    // Inline function 'kotlinx.atomicfu.locks.synchronized' call
    this.v4f_1;
    // Inline function 'androidx.compose.ui.text.font.AsyncTypefaceCache.get.<anonymous>' call
    var tmp0_elvis_lhs = this.t4f_1.z2(key);
    return tmp0_elvis_lhs == null ? this.u4f_1.z2(key) : tmp0_elvis_lhs;
  };
  protoOf(AsyncTypefaceCache).z4f = function (font, platformFontLoader, forever, block, $completion) {
    var tmp = new $runCachedCOROUTINE$1(this, font, platformFontLoader, forever, block, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function _set_value__lx0xdg($this, _set____db54di) {
    var this_0 = $this.j4e_1;
    value$factory();
    this_0.g1d(_set____db54di);
    return Unit_instance;
  }
  function AsyncFontListLoader$load$slambda(this$0, $font, resultContinuation) {
    this.i4g_1 = this$0;
    this.j4g_1 = $font;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AsyncFontListLoader$load$slambda).k4g = function ($completion) {
    var tmp = this.l4g($completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AsyncFontListLoader$load$slambda).m4g = function ($completion) {
    return this.k4g($completion);
  };
  protoOf(AsyncFontListLoader$load$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.i4g_1.n4g(this.j4g_1, this);
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
  protoOf(AsyncFontListLoader$load$slambda).l4g = function (completion) {
    return new AsyncFontListLoader$load$slambda(this.i4g_1, this.j4g_1, completion);
  };
  function AsyncFontListLoader$load$slambda_0(this$0, $font, resultContinuation) {
    var i = new AsyncFontListLoader$load$slambda(this$0, $font, resultContinuation);
    var l = function ($completion) {
      return i.k4g($completion);
    };
    l.$arity = 0;
    return l;
  }
  function AsyncFontListLoader$loadWithTimeoutOrNull$slambda(this$0, $this_loadWithTimeoutOrNull, resultContinuation) {
    this.w4g_1 = this$0;
    this.x4g_1 = $this_loadWithTimeoutOrNull;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(AsyncFontListLoader$loadWithTimeoutOrNull$slambda).z4g = function ($this$withTimeoutOrNull, $completion) {
    var tmp = this.x1e($this$withTimeoutOrNull, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AsyncFontListLoader$loadWithTimeoutOrNull$slambda).yc = function (p1, $completion) {
    return this.z4g((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(AsyncFontListLoader$loadWithTimeoutOrNull$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.w4g_1.i4e_1.a4h(this.x4g_1, this);
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
  protoOf(AsyncFontListLoader$loadWithTimeoutOrNull$slambda).x1e = function ($this$withTimeoutOrNull, completion) {
    var i = new AsyncFontListLoader$loadWithTimeoutOrNull$slambda(this.w4g_1, this.x4g_1, completion);
    i.y4g_1 = $this$withTimeoutOrNull;
    return i;
  };
  function AsyncFontListLoader$loadWithTimeoutOrNull$slambda_0(this$0, $this_loadWithTimeoutOrNull, resultContinuation) {
    var i = new AsyncFontListLoader$loadWithTimeoutOrNull$slambda(this$0, $this_loadWithTimeoutOrNull, resultContinuation);
    var l = function ($this$withTimeoutOrNull, $completion) {
      return i.z4g($this$withTimeoutOrNull, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function $loadCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.j4h_1 = _this__u8e3s4;
  }
  protoOf($loadCOROUTINE$2).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 12;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.bc_1 = 11;
            var tmp_0 = this;
            tmp_0.m4h_1 = this.j4h_1.e4e_1;
            this.n4h_1 = get_indices(this.m4h_1).o();
            this.ac_1 = 3;
            continue $sm;
          case 3:
            if (!this.n4h_1.d1()) {
              this.ac_1 = 9;
              continue $sm;
            }

            this.o4h_1 = this.n4h_1.f1();
            this.p4h_1 = this.m4h_1.n(this.o4h_1);
            var tmp_1 = this;
            tmp_1.q4h_1 = this.p4h_1;
            if (this.q4h_1.i4d() === Companion_getInstance_19().l4d_1) {
              this.ac_1 = 4;
              suspendResult = this.j4h_1.g4e_1.z4f(this.q4h_1, this.j4h_1.i4e_1, false, AsyncFontListLoader$load$slambda_0(this.j4h_1, this.q4h_1, null), this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 7;
              continue $sm;
            }

          case 4:
            this.r4h_1 = suspendResult;
            if (!(this.r4h_1 == null)) {
              _set_value__lx0xdg(this.j4h_1, synthesizeTypeface(this.j4h_1.f4e_1.x4d_1, this.r4h_1, this.q4h_1, this.j4h_1.f4e_1.v4d_1, this.j4h_1.f4e_1.w4d_1));
              this.l4h_1 = Unit_instance;
              this.bc_1 = 12;
              this.ac_1 = 8;
              continue $sm;
            } else {
              this.ac_1 = 5;
              suspendResult = yield_0(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 5:
            this.ac_1 = 6;
            continue $sm;
          case 6:
            this.ac_1 = 7;
            continue $sm;
          case 7:
            this.ac_1 = 3;
            continue $sm;
          case 8:
            this.bc_1 = 12;
            var shouldCache = get_isActive(this.t6());
            this.j4h_1.k4e_1 = false;
            this.j4h_1.h4e_1(new Immutable(this.j4h_1.s2(), shouldCache));
            return Unit_instance;
          case 9:
            this.k4h_1 = Unit_instance;
            this.bc_1 = 12;
            this.ac_1 = 10;
            continue $sm;
          case 10:
            this.bc_1 = 12;
            var shouldCache_0 = get_isActive(this.t6());
            this.j4h_1.k4e_1 = false;
            this.j4h_1.h4e_1(new Immutable(this.j4h_1.s2(), shouldCache_0));
            return Unit_instance;
          case 11:
            this.bc_1 = 12;
            var t = this.dc_1;
            var shouldCache_1 = get_isActive(this.t6());
            this.j4h_1.k4e_1 = false;
            this.j4h_1.h4e_1(new Immutable(this.j4h_1.s2(), shouldCache_1));
            throw t;
          case 12:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 12) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $loadWithTimeoutOrNullCOROUTINE$3(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.a4i_1 = _this__u8e3s4;
    this.b4i_1 = _this__u8e3s4_0;
  }
  protoOf($loadWithTimeoutOrNullCOROUTINE$3).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.bc_1 = 2;
            this.ac_1 = 1;
            Companion_getInstance_15();
            var tmp_0 = new Long(15000, 0);
            suspendResult = withTimeoutOrNull(tmp_0, AsyncFontListLoader$loadWithTimeoutOrNull$slambda_0(this.a4i_1, this.b4i_1, null), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.c4i_1 = suspendResult;
            this.bc_1 = 3;
            this.ac_1 = 4;
            continue $sm;
          case 2:
            this.bc_1 = 3;
            var tmp_1 = this.dc_1;
            if (tmp_1 instanceof CancellationException) {
              var cancel = this.dc_1;
              var tmp_2 = this;
              var tmp_3;
              if (get_isActive(this.t6())) {
                tmp_3 = null;
              } else {
                throw cancel;
              }
              tmp_2.c4i_1 = tmp_3;
              this.ac_1 = 4;
              continue $sm;
            } else {
              var tmp_4 = this.dc_1;
              if (tmp_4 instanceof Exception) {
                var uncaughtFontLoadException = this.dc_1;
                var tmp_5 = this;
                var tmp0_safe_receiver = this.t6().hc(Key_instance);
                if (tmp0_safe_receiver == null)
                  null;
                else {
                  tmp0_safe_receiver.hu(this.t6(), IllegalStateException_init_$Create$_0('Unable to load font ' + this.b4i_1, uncaughtFontLoadException));
                }
                tmp_5.c4i_1 = null;
                this.ac_1 = 4;
                continue $sm;
              } else {
                throw this.dc_1;
              }
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            return this.c4i_1;
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
  function AsyncFontListLoader(fontList, initialType, typefaceRequest, asyncTypefaceCache, onCompletion, platformFontLoader) {
    this.e4e_1 = fontList;
    this.f4e_1 = typefaceRequest;
    this.g4e_1 = asyncTypefaceCache;
    this.h4e_1 = onCompletion;
    this.i4e_1 = platformFontLoader;
    this.j4e_1 = mutableStateOf(initialType);
    this.k4e_1 = true;
  }
  protoOf(AsyncFontListLoader).s2 = function () {
    // Inline function 'androidx.compose.runtime.getValue' call
    var this_0 = this.j4e_1;
    value$factory_0();
    return this_0.s2();
  };
  protoOf(AsyncFontListLoader).d4i = function ($completion) {
    var tmp = new $loadCOROUTINE$2(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(AsyncFontListLoader).n4g = function (_this__u8e3s4, $completion) {
    var tmp = new $loadWithTimeoutOrNullCOROUTINE$3(this, _this__u8e3s4, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function _no_name_provided__qut3iv() {
    AbstractCoroutineContextElement.call(this, Key_instance);
  }
  protoOf(_no_name_provided__qut3iv).hu = function (context, exception) {
    // Inline function 'androidx.compose.ui.text.font.Companion.DropExceptionHandler.<anonymous>' call
    return Unit_instance;
  };
  function Companion_5() {
    Companion_instance_7 = this;
    this.f4i_1 = new FontMatcher();
    var tmp = this;
    // Inline function 'kotlinx.coroutines.CoroutineExceptionHandler' call
    tmp.g4i_1 = new _no_name_provided__qut3iv();
  }
  var Companion_instance_7;
  function Companion_getInstance_18() {
    if (Companion_instance_7 == null)
      new Companion_5();
    return Companion_instance_7;
  }
  function FontListFontFamilyTypefaceAdapter$resolve$slambda($asyncLoader, resultContinuation) {
    this.p4i_1 = $asyncLoader;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(FontListFontFamilyTypefaceAdapter$resolve$slambda).w1e = function ($this$launch, $completion) {
    var tmp = this.x1e($this$launch, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(FontListFontFamilyTypefaceAdapter$resolve$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(FontListFontFamilyTypefaceAdapter$resolve$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.p4i_1.d4i(this);
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
  protoOf(FontListFontFamilyTypefaceAdapter$resolve$slambda).x1e = function ($this$launch, completion) {
    var i = new FontListFontFamilyTypefaceAdapter$resolve$slambda(this.p4i_1, completion);
    i.q4i_1 = $this$launch;
    return i;
  };
  function FontListFontFamilyTypefaceAdapter$resolve$slambda_0($asyncLoader, resultContinuation) {
    var i = new FontListFontFamilyTypefaceAdapter$resolve$slambda($asyncLoader, resultContinuation);
    var l = function ($this$launch, $completion) {
      return i.w1e($this$launch, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function FontListFontFamilyTypefaceAdapter(asyncTypefaceCache, injectedContext) {
    Companion_getInstance_18();
    asyncTypefaceCache = asyncTypefaceCache === VOID ? new AsyncTypefaceCache() : asyncTypefaceCache;
    injectedContext = injectedContext === VOID ? EmptyCoroutineContext_getInstance() : injectedContext;
    this.r4e_1 = asyncTypefaceCache;
    this.s4e_1 = CoroutineScope_0(Companion_getInstance_18().g4i_1.vf(get_FontCacheManagementDispatcher()).vf(injectedContext).vf(SupervisorJob(injectedContext.hc(Key_instance_0))));
  }
  protoOf(FontListFontFamilyTypefaceAdapter).t4e = function (typefaceRequest, platformFontLoader, onAsyncCompletion, createDefaultTypeface) {
    var tmp = typefaceRequest.u4d_1;
    if (!(tmp instanceof FontListFontFamily))
      return null;
    var matched = Companion_getInstance_18().f4i_1.t4i(typefaceRequest.u4d_1.s4i_1, typefaceRequest.v4d_1, typefaceRequest.w4d_1);
    var tmp0_container = firstImmediatelyAvailable(matched, typefaceRequest, this.r4e_1, platformFontLoader, createDefaultTypeface);
    var asyncFontsToLoad = tmp0_container.re();
    var synthesizedTypeface = tmp0_container.se();
    if (asyncFontsToLoad == null)
      return new Immutable(synthesizedTypeface);
    var asyncLoader = new AsyncFontListLoader(asyncFontsToLoad, synthesizedTypeface, typefaceRequest, this.r4e_1, onAsyncCompletion, platformFontLoader);
    var tmp_0 = this.s4e_1;
    var tmp_1 = CoroutineStart_UNDISPATCHED_getInstance();
    launch(tmp_0, VOID, tmp_1, FontListFontFamilyTypefaceAdapter$resolve$slambda_0(asyncLoader, null));
    return new Async(asyncLoader);
  };
  function firstImmediatelyAvailable(_this__u8e3s4, typefaceRequest, asyncTypefaceCache, platformFontLoader, createDefaultTypeface) {
    var asyncFontsToLoad = null;
    var inductionVariable = 0;
    var last = _this__u8e3s4.m() - 1 | 0;
    if (inductionVariable <= last)
      $l$loop: do {
        var idx = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var font = _this__u8e3s4.n(idx);
        var tmp1_subject = font.i4d();
        if (tmp1_subject === Companion_getInstance_19().j4d_1) {
          var tmp$ret$0;
          $l$block: {
            // Inline function 'androidx.compose.ui.text.font.AsyncTypefaceCache.runCachedBlocking' call
            // Inline function 'androidx.compose.ui.text.synchronized' call
            // Inline function 'kotlinx.atomicfu.locks.synchronized' call
            asyncTypefaceCache.v4f_1;
            var key = new Key(font, platformFontLoader.a4f());
            var tmp0_elvis_lhs = asyncTypefaceCache.t4f_1.z2(key);
            var priorResult = tmp0_elvis_lhs == null ? asyncTypefaceCache.u4f_1.z2(key) : tmp0_elvis_lhs;
            var tmp;
            if (!(priorResult == null)) {
              tmp$ret$0 = _AsyncTypefaceResult___get_result__impl__kpcqqb(priorResult.b4f_1);
              break $l$block;
            }
            // Inline function 'kotlin.also' call
            // Inline function 'androidx.compose.ui.text.font.firstImmediatelyAvailable.<anonymous>' call
            var tmp_0;
            try {
              tmp_0 = platformFontLoader.u4i(font);
            } catch ($p) {
              var tmp_1;
              if ($p instanceof Exception) {
                var cause = $p;
                throw IllegalStateException_init_$Create$_0('Unable to load font ' + font, cause);
              } else {
                throw $p;
              }
            }
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'androidx.compose.ui.text.font.AsyncTypefaceCache.runCachedBlocking.<anonymous>' call
            asyncTypefaceCache.x4f(font, platformFontLoader, tmp_0);
            tmp$ret$0 = tmp_0;
          }
          var tmp2_elvis_lhs = tmp$ret$0;
          var tmp_2;
          if (tmp2_elvis_lhs == null) {
            throw IllegalStateException_init_$Create$('Unable to load font ' + font);
          } else {
            tmp_2 = tmp2_elvis_lhs;
          }
          var result = tmp_2;
          return to(asyncFontsToLoad, synthesizeTypeface(typefaceRequest.x4d_1, result, font, typefaceRequest.v4d_1, typefaceRequest.w4d_1));
        } else if (tmp1_subject === Companion_getInstance_19().k4d_1) {
          var tmp$ret$5;
          $l$block_0: {
            // Inline function 'androidx.compose.ui.text.font.AsyncTypefaceCache.runCachedBlocking' call
            // Inline function 'androidx.compose.ui.text.synchronized' call
            // Inline function 'kotlinx.atomicfu.locks.synchronized' call
            asyncTypefaceCache.v4f_1;
            var key_0 = new Key(font, platformFontLoader.a4f());
            var tmp0_elvis_lhs_0 = asyncTypefaceCache.t4f_1.z2(key_0);
            var priorResult_0 = tmp0_elvis_lhs_0 == null ? asyncTypefaceCache.u4f_1.z2(key_0) : tmp0_elvis_lhs_0;
            var tmp_3;
            if (!(priorResult_0 == null)) {
              tmp$ret$5 = _AsyncTypefaceResult___get_result__impl__kpcqqb(priorResult_0.b4f_1);
              break $l$block_0;
            }
            // Inline function 'kotlin.also' call
            // Inline function 'androidx.compose.ui.text.font.firstImmediatelyAvailable.<anonymous>' call
            // Inline function 'kotlin.Result.getOrNull' call
            // Inline function 'kotlin.runCatching' call
            var tmp_4;
            try {
              // Inline function 'kotlin.Companion.success' call
              // Inline function 'androidx.compose.ui.text.font.firstImmediatelyAvailable.<anonymous>.<anonymous>' call
              var value = platformFontLoader.u4i(font);
              tmp_4 = _Result___init__impl__xyqfz8(value);
            } catch ($p) {
              var tmp_5;
              if ($p instanceof Error) {
                var e = $p;
                // Inline function 'kotlin.Companion.failure' call
                tmp_5 = _Result___init__impl__xyqfz8(createFailure(e));
              } else {
                throw $p;
              }
              tmp_4 = tmp_5;
            }
            var this_0 = tmp_4;
            var tmp_6;
            if (_Result___get_isFailure__impl__jpiriv(this_0)) {
              tmp_6 = null;
            } else {
              var tmp_7 = _Result___get_value__impl__bjfvqg(this_0);
              tmp_6 = (tmp_7 == null ? true : !(tmp_7 == null)) ? tmp_7 : THROW_CCE();
            }
            var this_1 = tmp_6;
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'androidx.compose.ui.text.font.AsyncTypefaceCache.runCachedBlocking.<anonymous>' call
            asyncTypefaceCache.x4f(font, platformFontLoader, this_1);
            tmp$ret$5 = this_1;
          }
          var result_0 = tmp$ret$5;
          if (!(result_0 == null)) {
            return to(asyncFontsToLoad, synthesizeTypeface(typefaceRequest.x4d_1, result_0, font, typefaceRequest.v4d_1, typefaceRequest.w4d_1));
          }
        } else if (tmp1_subject === Companion_getInstance_19().l4d_1) {
          var cacheResult = asyncTypefaceCache.y4f(font, platformFontLoader);
          if (cacheResult == null) {
            if (asyncFontsToLoad == null) {
              asyncFontsToLoad = mutableListOf([font]);
            } else {
              asyncFontsToLoad.a1(font);
            }
          } else if (_AsyncTypefaceResult___get_isPermanentFailure__impl__sthpca(cacheResult.b4f_1)) {
            continue $l$loop;
          } else if (!(_AsyncTypefaceResult___get_result__impl__kpcqqb(cacheResult.b4f_1) == null)) {
            return to(asyncFontsToLoad, synthesizeTypeface(typefaceRequest.x4d_1, _AsyncTypefaceResult___get_result__impl__kpcqqb(cacheResult.b4f_1), font, typefaceRequest.v4d_1, typefaceRequest.w4d_1));
          }
        } else
          throw IllegalStateException_init_$Create$('Unknown font type ' + font);
      }
       while (inductionVariable <= last);
    var fallbackTypeface = createDefaultTypeface(typefaceRequest);
    return to(asyncFontsToLoad, fallbackTypeface);
  }
  function value$factory() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return _set_value__lx0xdg(receiver, value);
    });
  }
  function value$factory_0() {
    return getPropertyCallableRef('value', 1, KMutableProperty1, function (receiver) {
      return receiver.s2();
    }, function (receiver, value) {
      return _set_value__lx0xdg(receiver, value);
    });
  }
  function _FontLoadingStrategy___init__impl__if1sp3(value) {
    return value;
  }
  function _FontLoadingStrategy___get_value__impl__ggsl83($this) {
    return $this;
  }
  function FontLoadingStrategy__toString_impl_fx0z8f($this) {
    return $this === Companion_getInstance_19().j4d_1 ? 'Blocking' : $this === Companion_getInstance_19().k4d_1 ? 'Optional' : $this === Companion_getInstance_19().l4d_1 ? 'Async' : 'Invalid(value=' + _FontLoadingStrategy___get_value__impl__ggsl83($this) + ')';
  }
  function Companion_6() {
    Companion_instance_8 = this;
    this.j4d_1 = _FontLoadingStrategy___init__impl__if1sp3(0);
    this.k4d_1 = _FontLoadingStrategy___init__impl__if1sp3(1);
    this.l4d_1 = _FontLoadingStrategy___init__impl__if1sp3(2);
  }
  var Companion_instance_8;
  function Companion_getInstance_19() {
    if (Companion_instance_8 == null)
      new Companion_6();
    return Companion_instance_8;
  }
  function FontLoadingStrategy__hashCode_impl_xcx5xu($this) {
    return $this;
  }
  function FontLoadingStrategy__equals_impl_5w10z2($this, other) {
    if (!(other instanceof FontLoadingStrategy))
      return false;
    if (!($this === (other instanceof FontLoadingStrategy ? other.v4i_1 : THROW_CCE())))
      return false;
    return true;
  }
  function FontLoadingStrategy(value) {
    Companion_getInstance_19();
    this.v4i_1 = value;
  }
  protoOf(FontLoadingStrategy).toString = function () {
    return FontLoadingStrategy__toString_impl_fx0z8f(this.v4i_1);
  };
  protoOf(FontLoadingStrategy).hashCode = function () {
    return FontLoadingStrategy__hashCode_impl_xcx5xu(this.v4i_1);
  };
  protoOf(FontLoadingStrategy).equals = function (other) {
    return FontLoadingStrategy__equals_impl_5w10z2(this.v4i_1, other);
  };
  function FontMatcher() {
  }
  protoOf(FontMatcher).t4i = function (fontList, fontWeight, fontStyle) {
    // Inline function 'kotlin.let' call
    // Inline function 'androidx.compose.ui.util.fastFilter' call
    // Inline function 'kotlin.contracts.contract' call
    var target = ArrayList_init_$Create$(fontList.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = fontList.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = fontList.n(index);
        // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.font.FontMatcher.matchFont.<anonymous>' call
        if (item.t3c().equals(fontWeight) ? item.h4d() === fontStyle : false) {
          // Inline function 'kotlin.collections.plusAssign' call
          target.a1(item);
        }
      }
       while (inductionVariable <= last);
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    if (!target.u()) {
      return target;
    }
    // Inline function 'kotlin.collections.ifEmpty' call
    // Inline function 'androidx.compose.ui.util.fastFilter' call
    // Inline function 'kotlin.contracts.contract' call
    var target_0 = ArrayList_init_$Create$(fontList.m());
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable_0 = 0;
    var last_0 = fontList.m() - 1 | 0;
    if (inductionVariable_0 <= last_0)
      do {
        var index_0 = inductionVariable_0;
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        var item_0 = fontList.n(index_0);
        // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.font.FontMatcher.matchFont.<anonymous>' call
        if (item_0.h4d() === fontStyle) {
          // Inline function 'kotlin.collections.plusAssign' call
          target_0.a1(item_0);
        }
      }
       while (inductionVariable_0 <= last_0);
    var tmp_0;
    if (target_0.u()) {
      // Inline function 'androidx.compose.ui.text.font.FontMatcher.matchFont.<anonymous>' call
      tmp_0 = fontList;
    } else {
      tmp_0 = target_0;
    }
    var fontsToSearch = tmp_0;
    var tmp_1;
    if (fontWeight.x4i(Companion_getInstance_22().w48_1) < 0) {
      // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight' call
      var bestWeightAbove = null;
      var bestWeightBelow = null;
      var inductionVariable_1 = 0;
      var last_1 = fontsToSearch.m() - 1 | 0;
      if (inductionVariable_1 <= last_1)
        $l$loop_1: do {
          var index_1 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          var font = fontsToSearch.n(index_1);
          var possibleWeight = font.t3c();
          if (!(null == null) ? possibleWeight.x4i(null) < 0 : false) {
            continue $l$loop_1;
          }
          if (!(null == null) ? possibleWeight.x4i(null) > 0 : false) {
            continue $l$loop_1;
          }
          if (possibleWeight.x4i(fontWeight) < 0) {
            if (bestWeightBelow == null ? true : possibleWeight.x4i(bestWeightBelow) > 0) {
              bestWeightBelow = possibleWeight;
            }
          } else if (possibleWeight.x4i(fontWeight) > 0) {
            if (bestWeightAbove == null ? true : possibleWeight.x4i(bestWeightAbove) < 0) {
              bestWeightAbove = possibleWeight;
            }
          } else {
            bestWeightAbove = possibleWeight;
            bestWeightBelow = possibleWeight;
            break $l$loop_1;
          }
        }
         while (inductionVariable_1 <= last_1);
      var tmp_2;
      if (true) {
        var tmp1_elvis_lhs = bestWeightBelow;
        tmp_2 = tmp1_elvis_lhs == null ? bestWeightAbove : tmp1_elvis_lhs;
      } else {
        var tmp2_elvis_lhs = bestWeightAbove;
        tmp_2 = tmp2_elvis_lhs == null ? bestWeightBelow : tmp2_elvis_lhs;
      }
      var bestWeight = tmp_2;
      // Inline function 'androidx.compose.ui.util.fastFilter' call
      // Inline function 'kotlin.contracts.contract' call
      var target_1 = ArrayList_init_$Create$(fontsToSearch.m());
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_2 = 0;
      var last_2 = fontsToSearch.m() - 1 | 0;
      if (inductionVariable_2 <= last_2)
        do {
          var index_2 = inductionVariable_2;
          inductionVariable_2 = inductionVariable_2 + 1 | 0;
          var item_1 = fontsToSearch.n(index_2);
          // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
          // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight.<anonymous>' call
          if (item_1.t3c().equals(bestWeight)) {
            // Inline function 'kotlin.collections.plusAssign' call
            target_1.a1(item_1);
          }
        }
         while (inductionVariable_2 <= last_2);
      tmp_1 = target_1;
    } else if (fontWeight.x4i(Companion_getInstance_22().x48_1) > 0) {
      // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight' call
      var bestWeightAbove_0 = null;
      var bestWeightBelow_0 = null;
      var inductionVariable_3 = 0;
      var last_3 = fontsToSearch.m() - 1 | 0;
      if (inductionVariable_3 <= last_3)
        $l$loop_4: do {
          var index_3 = inductionVariable_3;
          inductionVariable_3 = inductionVariable_3 + 1 | 0;
          var font_0 = fontsToSearch.n(index_3);
          var possibleWeight_0 = font_0.t3c();
          if (!(null == null) ? possibleWeight_0.x4i(null) < 0 : false) {
            continue $l$loop_4;
          }
          if (!(null == null) ? possibleWeight_0.x4i(null) > 0 : false) {
            continue $l$loop_4;
          }
          if (possibleWeight_0.x4i(fontWeight) < 0) {
            if (bestWeightBelow_0 == null ? true : possibleWeight_0.x4i(bestWeightBelow_0) > 0) {
              bestWeightBelow_0 = possibleWeight_0;
            }
          } else if (possibleWeight_0.x4i(fontWeight) > 0) {
            if (bestWeightAbove_0 == null ? true : possibleWeight_0.x4i(bestWeightAbove_0) < 0) {
              bestWeightAbove_0 = possibleWeight_0;
            }
          } else {
            bestWeightAbove_0 = possibleWeight_0;
            bestWeightBelow_0 = possibleWeight_0;
            break $l$loop_4;
          }
        }
         while (inductionVariable_3 <= last_3);
      var tmp_3;
      if (false) {
        var tmp1_elvis_lhs_0 = bestWeightBelow_0;
        tmp_3 = tmp1_elvis_lhs_0 == null ? bestWeightAbove_0 : tmp1_elvis_lhs_0;
      } else {
        var tmp2_elvis_lhs_0 = bestWeightAbove_0;
        tmp_3 = tmp2_elvis_lhs_0 == null ? bestWeightBelow_0 : tmp2_elvis_lhs_0;
      }
      var bestWeight_0 = tmp_3;
      // Inline function 'androidx.compose.ui.util.fastFilter' call
      // Inline function 'kotlin.contracts.contract' call
      var target_2 = ArrayList_init_$Create$(fontsToSearch.m());
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_4 = 0;
      var last_4 = fontsToSearch.m() - 1 | 0;
      if (inductionVariable_4 <= last_4)
        do {
          var index_4 = inductionVariable_4;
          inductionVariable_4 = inductionVariable_4 + 1 | 0;
          var item_2 = fontsToSearch.n(index_4);
          // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
          // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight.<anonymous>' call
          if (item_2.t3c().equals(bestWeight_0)) {
            // Inline function 'kotlin.collections.plusAssign' call
            target_2.a1(item_2);
          }
        }
         while (inductionVariable_4 <= last_4);
      tmp_1 = target_2;
    } else {
      // Inline function 'kotlin.collections.ifEmpty' call
      // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight' call
      var maxSearchRange = Companion_getInstance_22().x48_1;
      var bestWeightAbove_1 = null;
      var bestWeightBelow_1 = null;
      var inductionVariable_5 = 0;
      var last_5 = fontsToSearch.m() - 1 | 0;
      if (inductionVariable_5 <= last_5)
        $l$loop_7: do {
          var index_5 = inductionVariable_5;
          inductionVariable_5 = inductionVariable_5 + 1 | 0;
          var font_1 = fontsToSearch.n(index_5);
          var possibleWeight_1 = font_1.t3c();
          if (!(null == null) ? possibleWeight_1.x4i(null) < 0 : false) {
            continue $l$loop_7;
          }
          if (!(maxSearchRange == null) ? possibleWeight_1.x4i(maxSearchRange) > 0 : false) {
            continue $l$loop_7;
          }
          if (possibleWeight_1.x4i(fontWeight) < 0) {
            if (bestWeightBelow_1 == null ? true : possibleWeight_1.x4i(bestWeightBelow_1) > 0) {
              bestWeightBelow_1 = possibleWeight_1;
            }
          } else if (possibleWeight_1.x4i(fontWeight) > 0) {
            if (bestWeightAbove_1 == null ? true : possibleWeight_1.x4i(bestWeightAbove_1) < 0) {
              bestWeightAbove_1 = possibleWeight_1;
            }
          } else {
            bestWeightAbove_1 = possibleWeight_1;
            bestWeightBelow_1 = possibleWeight_1;
            break $l$loop_7;
          }
        }
         while (inductionVariable_5 <= last_5);
      var tmp_4;
      if (false) {
        var tmp1_elvis_lhs_1 = bestWeightBelow_1;
        tmp_4 = tmp1_elvis_lhs_1 == null ? bestWeightAbove_1 : tmp1_elvis_lhs_1;
      } else {
        var tmp2_elvis_lhs_1 = bestWeightAbove_1;
        tmp_4 = tmp2_elvis_lhs_1 == null ? bestWeightBelow_1 : tmp2_elvis_lhs_1;
      }
      var bestWeight_1 = tmp_4;
      // Inline function 'androidx.compose.ui.util.fastFilter' call
      // Inline function 'kotlin.contracts.contract' call
      var target_3 = ArrayList_init_$Create$(fontsToSearch.m());
      // Inline function 'androidx.compose.ui.util.fastForEach' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_6 = 0;
      var last_6 = fontsToSearch.m() - 1 | 0;
      if (inductionVariable_6 <= last_6)
        do {
          var index_6 = inductionVariable_6;
          inductionVariable_6 = inductionVariable_6 + 1 | 0;
          var item_3 = fontsToSearch.n(index_6);
          // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
          // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight.<anonymous>' call
          if (item_3.t3c().equals(bestWeight_1)) {
            // Inline function 'kotlin.collections.plusAssign' call
            target_3.a1(item_3);
          }
        }
         while (inductionVariable_6 <= last_6);
      var tmp_5;
      if (target_3.u()) {
        // Inline function 'androidx.compose.ui.text.font.FontMatcher.matchFont.<anonymous>' call
        // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight' call
        var minSearchRange = Companion_getInstance_22().x48_1;
        var bestWeightAbove_2 = null;
        var bestWeightBelow_2 = null;
        var inductionVariable_7 = 0;
        var last_7 = fontsToSearch.m() - 1 | 0;
        if (inductionVariable_7 <= last_7)
          $l$loop_10: do {
            var index_7 = inductionVariable_7;
            inductionVariable_7 = inductionVariable_7 + 1 | 0;
            var font_2 = fontsToSearch.n(index_7);
            var possibleWeight_2 = font_2.t3c();
            if (!(minSearchRange == null) ? possibleWeight_2.x4i(minSearchRange) < 0 : false) {
              continue $l$loop_10;
            }
            if (!(null == null) ? possibleWeight_2.x4i(null) > 0 : false) {
              continue $l$loop_10;
            }
            if (possibleWeight_2.x4i(fontWeight) < 0) {
              if (bestWeightBelow_2 == null ? true : possibleWeight_2.x4i(bestWeightBelow_2) > 0) {
                bestWeightBelow_2 = possibleWeight_2;
              }
            } else if (possibleWeight_2.x4i(fontWeight) > 0) {
              if (bestWeightAbove_2 == null ? true : possibleWeight_2.x4i(bestWeightAbove_2) < 0) {
                bestWeightAbove_2 = possibleWeight_2;
              }
            } else {
              bestWeightAbove_2 = possibleWeight_2;
              bestWeightBelow_2 = possibleWeight_2;
              break $l$loop_10;
            }
          }
           while (inductionVariable_7 <= last_7);
        var tmp_6;
        if (false) {
          var tmp1_elvis_lhs_2 = bestWeightBelow_2;
          tmp_6 = tmp1_elvis_lhs_2 == null ? bestWeightAbove_2 : tmp1_elvis_lhs_2;
        } else {
          var tmp2_elvis_lhs_2 = bestWeightAbove_2;
          tmp_6 = tmp2_elvis_lhs_2 == null ? bestWeightBelow_2 : tmp2_elvis_lhs_2;
        }
        var bestWeight_2 = tmp_6;
        // Inline function 'androidx.compose.ui.util.fastFilter' call
        // Inline function 'kotlin.contracts.contract' call
        var target_4 = ArrayList_init_$Create$(fontsToSearch.m());
        // Inline function 'androidx.compose.ui.util.fastForEach' call
        // Inline function 'kotlin.contracts.contract' call
        var inductionVariable_8 = 0;
        var last_8 = fontsToSearch.m() - 1 | 0;
        if (inductionVariable_8 <= last_8)
          do {
            var index_8 = inductionVariable_8;
            inductionVariable_8 = inductionVariable_8 + 1 | 0;
            var item_4 = fontsToSearch.n(index_8);
            // Inline function 'androidx.compose.ui.util.fastFilter.<anonymous>' call
            // Inline function 'androidx.compose.ui.text.font.FontMatcher.filterByClosestWeight.<anonymous>' call
            if (item_4.t3c().equals(bestWeight_2)) {
              // Inline function 'kotlin.collections.plusAssign' call
              target_4.a1(item_4);
            }
          }
           while (inductionVariable_8 <= last_8);
        tmp_5 = target_4;
      } else {
        tmp_5 = target_3;
      }
      tmp_1 = tmp_5;
    }
    var result = tmp_1;
    return result;
  };
  function _FontStyle___init__impl__jcnduf(value) {
    return value;
  }
  function FontStyle__toString_impl_thncxr($this) {
    return $this === Companion_getInstance_20().m49_1 ? 'Normal' : $this === Companion_getInstance_20().n49_1 ? 'Italic' : 'Invalid';
  }
  function Companion_7() {
    Companion_instance_9 = this;
    this.m49_1 = _FontStyle___init__impl__jcnduf(0);
    this.n49_1 = _FontStyle___init__impl__jcnduf(1);
  }
  var Companion_instance_9;
  function Companion_getInstance_20() {
    if (Companion_instance_9 == null)
      new Companion_7();
    return Companion_instance_9;
  }
  function FontStyle__hashCode_impl_7qhg4w($this) {
    return $this;
  }
  function FontStyle__equals_impl_2zal3g($this, other) {
    if (!(other instanceof FontStyle))
      return false;
    if (!($this === (other instanceof FontStyle ? other.y4i_1 : THROW_CCE())))
      return false;
    return true;
  }
  function FontStyle(value) {
    Companion_getInstance_20();
    this.y4i_1 = value;
  }
  protoOf(FontStyle).toString = function () {
    return FontStyle__toString_impl_thncxr(this.y4i_1);
  };
  protoOf(FontStyle).hashCode = function () {
    return FontStyle__hashCode_impl_7qhg4w(this.y4i_1);
  };
  protoOf(FontStyle).equals = function (other) {
    return FontStyle__equals_impl_2zal3g(this.y4i_1, other);
  };
  function _FontSynthesis___init__impl__n397bg(value) {
    return value;
  }
  function FontSynthesis__toString_impl_gunvr0($this) {
    return $this === Companion_getInstance_21().o49_1 ? 'None' : $this === Companion_getInstance_21().p49_1 ? 'All' : $this === Companion_getInstance_21().q49_1 ? 'Weight' : $this === Companion_getInstance_21().r49_1 ? 'Style' : 'Invalid';
  }
  function Companion_8() {
    Companion_instance_10 = this;
    this.o49_1 = _FontSynthesis___init__impl__n397bg(0);
    this.p49_1 = _FontSynthesis___init__impl__n397bg(1);
    this.q49_1 = _FontSynthesis___init__impl__n397bg(2);
    this.r49_1 = _FontSynthesis___init__impl__n397bg(3);
  }
  var Companion_instance_10;
  function Companion_getInstance_21() {
    if (Companion_instance_10 == null)
      new Companion_8();
    return Companion_instance_10;
  }
  function FontSynthesis__hashCode_impl_4wi11v($this) {
    return $this;
  }
  function FontSynthesis__equals_impl_zgu9mf($this, other) {
    if (!(other instanceof FontSynthesis))
      return false;
    if (!($this === (other instanceof FontSynthesis ? other.z4i_1 : THROW_CCE())))
      return false;
    return true;
  }
  function FontSynthesis(value) {
    Companion_getInstance_21();
    this.z4i_1 = value;
  }
  protoOf(FontSynthesis).toString = function () {
    return FontSynthesis__toString_impl_gunvr0(this.z4i_1);
  };
  protoOf(FontSynthesis).hashCode = function () {
    return FontSynthesis__hashCode_impl_4wi11v(this.z4i_1);
  };
  protoOf(FontSynthesis).equals = function (other) {
    return FontSynthesis__equals_impl_zgu9mf(this.z4i_1, other);
  };
  function Companion_9() {
    Companion_instance_11 = this;
    this.t48_1 = new FontWeight(100);
    this.u48_1 = new FontWeight(200);
    this.v48_1 = new FontWeight(300);
    this.w48_1 = new FontWeight(400);
    this.x48_1 = new FontWeight(500);
    this.y48_1 = new FontWeight(600);
    this.z48_1 = new FontWeight(700);
    this.a49_1 = new FontWeight(800);
    this.b49_1 = new FontWeight(900);
    this.c49_1 = this.t48_1;
    this.d49_1 = this.u48_1;
    this.e49_1 = this.v48_1;
    this.f49_1 = this.w48_1;
    this.g49_1 = this.x48_1;
    this.h49_1 = this.y48_1;
    this.i49_1 = this.z48_1;
    this.j49_1 = this.a49_1;
    this.k49_1 = this.b49_1;
    this.l49_1 = listOf([this.t48_1, this.u48_1, this.v48_1, this.w48_1, this.x48_1, this.y48_1, this.z48_1, this.a49_1, this.b49_1]);
  }
  var Companion_instance_11;
  function Companion_getInstance_22() {
    if (Companion_instance_11 == null)
      new Companion_9();
    return Companion_instance_11;
  }
  function FontWeight(weight) {
    Companion_getInstance_22();
    this.w4i_1 = weight;
    // Inline function 'kotlin.require' call
    var containsArg = this.w4i_1;
    // Inline function 'kotlin.contracts.contract' call
    if (!(1 <= containsArg ? containsArg <= 1000 : false)) {
      // Inline function 'androidx.compose.ui.text.font.FontWeight.<anonymous>' call
      var message = 'Font weight can be in range [1, 1000]. Current value: ' + this.w4i_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(FontWeight).x4i = function (other) {
    return compareTo(this.w4i_1, other.w4i_1);
  };
  protoOf(FontWeight).d = function (other) {
    return this.x4i(other instanceof FontWeight ? other : THROW_CCE());
  };
  protoOf(FontWeight).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FontWeight))
      return false;
    if (!(this.w4i_1 === other.w4i_1))
      return false;
    return true;
  };
  protoOf(FontWeight).hashCode = function () {
    return this.w4i_1;
  };
  protoOf(FontWeight).toString = function () {
    return 'FontWeight(weight=' + this.w4i_1 + ')';
  };
  function TextInputService(platformTextInputService) {
    this.a4j_1 = platformTextInputService;
    this.b4j_1 = new AtomicReference(null);
  }
  function Companion_10() {
  }
  protoOf(Companion_10).f1k = function () {
    return get_platformLocaleDelegate().f1k().n(0);
  };
  var Companion_instance_12;
  function Companion_getInstance_23() {
    return Companion_instance_12;
  }
  function Locale(platformLocale) {
    this.e4j_1 = platformLocale;
  }
  protoOf(Locale).f4j = function () {
    return this.e4j_1.f4j();
  };
  protoOf(Locale).equals = function (other) {
    if (other == null)
      return false;
    if (!(other instanceof Locale))
      return false;
    if (this === other)
      return true;
    return this.f4j() === other.f4j();
  };
  protoOf(Locale).hashCode = function () {
    return getStringHashCode(this.f4j());
  };
  protoOf(Locale).toString = function () {
    return this.f4j();
  };
  function Companion_11() {
  }
  protoOf(Companion_11).f1k = function () {
    return get_platformLocaleDelegate().f1k();
  };
  var Companion_instance_13;
  function Companion_getInstance_24() {
    return Companion_instance_13;
  }
  function LocaleList(localeList) {
    this.c4j_1 = localeList;
    this.d4j_1 = this.c4j_1.m();
  }
  protoOf(LocaleList).n = function (i) {
    return this.c4j_1.n(i);
  };
  protoOf(LocaleList).m = function () {
    return this.d4j_1;
  };
  protoOf(LocaleList).g4j = function (element) {
    return this.c4j_1.s(element);
  };
  protoOf(LocaleList).s = function (element) {
    if (!(element instanceof Locale))
      return false;
    return this.g4j(element instanceof Locale ? element : THROW_CCE());
  };
  protoOf(LocaleList).h4j = function (elements) {
    return this.c4j_1.t(elements);
  };
  protoOf(LocaleList).t = function (elements) {
    return this.h4j(elements);
  };
  protoOf(LocaleList).u = function () {
    return this.c4j_1.u();
  };
  protoOf(LocaleList).o = function () {
    return this.c4j_1.o();
  };
  protoOf(LocaleList).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LocaleList))
      return false;
    if (!equals(this.c4j_1, other.c4j_1))
      return false;
    return true;
  };
  protoOf(LocaleList).hashCode = function () {
    return hashCode(this.c4j_1);
  };
  protoOf(LocaleList).toString = function () {
    return 'LocaleList(localeList=' + this.c4j_1 + ')';
  };
  function get_platformLocaleDelegate() {
    _init_properties_PlatformLocale_kt__d5ixzh();
    return platformLocaleDelegate;
  }
  var platformLocaleDelegate;
  var properties_initialized_PlatformLocale_kt_ya8ii9;
  function _init_properties_PlatformLocale_kt__d5ixzh() {
    if (!properties_initialized_PlatformLocale_kt_ya8ii9) {
      properties_initialized_PlatformLocale_kt_ya8ii9 = true;
      platformLocaleDelegate = createPlatformLocaleDelegate();
    }
  }
  function get_FontCacheManagementDispatcher() {
    _init_properties_Dispatcher_kt__c4qz95();
    return FontCacheManagementDispatcher;
  }
  var FontCacheManagementDispatcher;
  var properties_initialized_Dispatcher_kt_c7cauv;
  function _init_properties_Dispatcher_kt__c4qz95() {
    if (!properties_initialized_Dispatcher_kt_c7cauv) {
      properties_initialized_Dispatcher_kt_c7cauv = true;
      FontCacheManagementDispatcher = Dispatchers_getInstance().qz();
    }
  }
  function _BaselineShift___init__impl__scj05g(multiplier) {
    return multiplier;
  }
  function _BaselineShift___get_multiplier__impl__qhmjek($this) {
    return $this;
  }
  function Companion_12() {
    Companion_instance_14 = this;
    this.x49_1 = _BaselineShift___init__impl__scj05g(0.5);
    this.y49_1 = _BaselineShift___init__impl__scj05g(-0.5);
    this.z49_1 = _BaselineShift___init__impl__scj05g(0.0);
  }
  var Companion_instance_14;
  function Companion_getInstance_25() {
    if (Companion_instance_14 == null)
      new Companion_12();
    return Companion_instance_14;
  }
  function BaselineShift__toString_impl_x98gcc($this) {
    return 'BaselineShift(multiplier=' + $this + ')';
  }
  function BaselineShift__hashCode_impl_g0potx($this) {
    return getNumberHashCode($this);
  }
  function BaselineShift__equals_impl_37wrjj($this, other) {
    if (!(other instanceof BaselineShift))
      return false;
    var tmp0_other_with_cast = other instanceof BaselineShift ? other.i4j_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function BaselineShift(multiplier) {
    Companion_getInstance_25();
    this.i4j_1 = multiplier;
  }
  protoOf(BaselineShift).toString = function () {
    return BaselineShift__toString_impl_x98gcc(this.i4j_1);
  };
  protoOf(BaselineShift).hashCode = function () {
    return BaselineShift__hashCode_impl_g0potx(this.i4j_1);
  };
  protoOf(BaselineShift).equals = function (other) {
    return BaselineShift__equals_impl_37wrjj(this.i4j_1, other);
  };
  function _Hyphens___init__impl__m2cvg8(value) {
    return value;
  }
  function Companion_13() {
    Companion_instance_15 = this;
    this.y46_1 = _Hyphens___init__impl__m2cvg8(1);
    this.z46_1 = _Hyphens___init__impl__m2cvg8(2);
    this.a47_1 = _Hyphens___init__impl__m2cvg8(IntCompanionObject_instance.MIN_VALUE);
  }
  var Companion_instance_15;
  function Companion_getInstance_26() {
    if (Companion_instance_15 == null)
      new Companion_13();
    return Companion_instance_15;
  }
  function Hyphens__toString_impl_ck1wg0($this) {
    return $this === Companion_getInstance_26().y46_1 ? 'Hyphens.None' : $this === Companion_getInstance_26().z46_1 ? 'Hyphens.Auto' : $this === Companion_getInstance_26().a47_1 ? 'Hyphens.Unspecified' : 'Invalid';
  }
  function Hyphens__hashCode_impl_yb7t8v($this) {
    return $this;
  }
  function Hyphens__equals_impl_oqoi4t($this, other) {
    if (!(other instanceof Hyphens))
      return false;
    if (!($this === (other instanceof Hyphens ? other.j4j_1 : THROW_CCE())))
      return false;
    return true;
  }
  function Hyphens(value) {
    Companion_getInstance_26();
    this.j4j_1 = value;
  }
  protoOf(Hyphens).toString = function () {
    return Hyphens__toString_impl_ck1wg0(this.j4j_1);
  };
  protoOf(Hyphens).hashCode = function () {
    return Hyphens__hashCode_impl_yb7t8v(this.j4j_1);
  };
  protoOf(Hyphens).equals = function (other) {
    return Hyphens__equals_impl_oqoi4t(this.j4j_1, other);
  };
  function _Trim___init__impl__tcc1lr(value) {
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function Trim__toString_impl_hxcm0x($this) {
    var tmp0_subject = _get_value__a43j40($this);
    return tmp0_subject === _get_value__a43j40(Companion_getInstance_27().m4j_1) ? 'LineHeightStyle.Trim.FirstLineTop' : tmp0_subject === _get_value__a43j40(Companion_getInstance_27().n4j_1) ? 'LineHeightStyle.Trim.LastLineBottom' : tmp0_subject === _get_value__a43j40(Companion_getInstance_27().o4j_1) ? 'LineHeightStyle.Trim.Both' : tmp0_subject === _get_value__a43j40(Companion_getInstance_27().p4j_1) ? 'LineHeightStyle.Trim.None' : 'Invalid';
  }
  function Companion_14() {
    Companion_instance_16 = this;
    this.k4j_1 = 1;
    this.l4j_1 = 16;
    this.m4j_1 = _Trim___init__impl__tcc1lr(1);
    this.n4j_1 = _Trim___init__impl__tcc1lr(16);
    this.o4j_1 = _Trim___init__impl__tcc1lr(17);
    this.p4j_1 = _Trim___init__impl__tcc1lr(0);
  }
  var Companion_instance_16;
  function Companion_getInstance_27() {
    if (Companion_instance_16 == null)
      new Companion_14();
    return Companion_instance_16;
  }
  function Trim__isTrimFirstLineTop_impl_tqdsaa($this) {
    return (_get_value__a43j40($this) & 1) > 0;
  }
  function Trim__isTrimLastLineBottom_impl_8k6x3e($this) {
    return (_get_value__a43j40($this) & 16) > 0;
  }
  function Trim__hashCode_impl_vclj5c($this) {
    return $this;
  }
  function Trim__equals_impl_6x7eks($this, other) {
    if (!(other instanceof Trim))
      return false;
    if (!($this === (other instanceof Trim ? other.q4j_1 : THROW_CCE())))
      return false;
    return true;
  }
  function _Alignment___init__impl__it107q(topRatio) {
    // Inline function 'kotlin.check' call
    var tmp;
    var containsArg = _Alignment___get_topRatio__impl__gg7tir(topRatio);
    if (0.0 <= containsArg ? containsArg <= 1.0 : false) {
      tmp = true;
    } else {
      tmp = _Alignment___get_topRatio__impl__gg7tir(topRatio) === -1.0;
    }
    // Inline function 'kotlin.contracts.contract' call
    if (!tmp) {
      // Inline function 'androidx.compose.ui.text.style.Alignment.<anonymous>' call
      var message = 'topRatio should be in [0..1] range or -1';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return topRatio;
  }
  function _Alignment___get_topRatio__impl__gg7tir($this) {
    return $this;
  }
  function Alignment__toString_impl_on6yhu($this) {
    var tmp0_subject = _Alignment___get_topRatio__impl__gg7tir($this);
    return tmp0_subject === _Alignment___get_topRatio__impl__gg7tir(Companion_getInstance_28().r4j_1) ? 'LineHeightStyle.Alignment.Top' : tmp0_subject === _Alignment___get_topRatio__impl__gg7tir(Companion_getInstance_28().s4j_1) ? 'LineHeightStyle.Alignment.Center' : tmp0_subject === _Alignment___get_topRatio__impl__gg7tir(Companion_getInstance_28().t4j_1) ? 'LineHeightStyle.Alignment.Proportional' : tmp0_subject === _Alignment___get_topRatio__impl__gg7tir(Companion_getInstance_28().u4j_1) ? 'LineHeightStyle.Alignment.Bottom' : 'LineHeightStyle.Alignment(topPercentage = ' + _Alignment___get_topRatio__impl__gg7tir($this) + ')';
  }
  function Companion_15() {
    Companion_instance_17 = this;
    this.r4j_1 = _Alignment___init__impl__it107q(0.0);
    this.s4j_1 = _Alignment___init__impl__it107q(0.5);
    this.t4j_1 = _Alignment___init__impl__it107q(-1.0);
    this.u4j_1 = _Alignment___init__impl__it107q(1.0);
  }
  var Companion_instance_17;
  function Companion_getInstance_28() {
    if (Companion_instance_17 == null)
      new Companion_15();
    return Companion_instance_17;
  }
  function Alignment__hashCode_impl_omr6of($this) {
    return getNumberHashCode($this);
  }
  function Alignment__equals_impl_9ve0tn($this, other) {
    if (!(other instanceof Alignment))
      return false;
    var tmp0_other_with_cast = other instanceof Alignment ? other.v4j_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function Companion_16() {
    Companion_instance_18 = this;
    this.w4j_1 = new LineHeightStyle(Companion_getInstance_28().t4j_1, Companion_getInstance_27().o4j_1);
  }
  var Companion_instance_18;
  function Companion_getInstance_29() {
    if (Companion_instance_18 == null)
      new Companion_16();
    return Companion_instance_18;
  }
  function Trim(value) {
    Companion_getInstance_27();
    this.q4j_1 = value;
  }
  protoOf(Trim).toString = function () {
    return Trim__toString_impl_hxcm0x(this.q4j_1);
  };
  protoOf(Trim).hashCode = function () {
    return Trim__hashCode_impl_vclj5c(this.q4j_1);
  };
  protoOf(Trim).equals = function (other) {
    return Trim__equals_impl_6x7eks(this.q4j_1, other);
  };
  function Alignment(topRatio) {
    Companion_getInstance_28();
    this.v4j_1 = topRatio;
  }
  protoOf(Alignment).toString = function () {
    return Alignment__toString_impl_on6yhu(this.v4j_1);
  };
  protoOf(Alignment).hashCode = function () {
    return Alignment__hashCode_impl_omr6of(this.v4j_1);
  };
  protoOf(Alignment).equals = function (other) {
    return Alignment__equals_impl_9ve0tn(this.v4j_1, other);
  };
  function LineHeightStyle(alignment, trim) {
    Companion_getInstance_29();
    this.x4j_1 = alignment;
    this.y4j_1 = trim;
  }
  protoOf(LineHeightStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof LineHeightStyle))
      return false;
    if (!equals(this.x4j_1, other.x4j_1))
      return false;
    if (!(this.y4j_1 === other.y4j_1))
      return false;
    return true;
  };
  protoOf(LineHeightStyle).hashCode = function () {
    var result = Alignment__hashCode_impl_omr6of(this.x4j_1);
    result = imul(31, result) + Trim__hashCode_impl_vclj5c(this.y4j_1) | 0;
    return result;
  };
  protoOf(LineHeightStyle).toString = function () {
    return 'LineHeightStyle(' + ('alignment=' + new Alignment(this.x4j_1) + ', ') + ('trim=' + new Trim(this.y4j_1)) + ')';
  };
  var ResolvedTextDirection_Ltr_instance;
  var ResolvedTextDirection_Rtl_instance;
  var ResolvedTextDirection_entriesInitialized;
  function ResolvedTextDirection_initEntries() {
    if (ResolvedTextDirection_entriesInitialized)
      return Unit_instance;
    ResolvedTextDirection_entriesInitialized = true;
    ResolvedTextDirection_Ltr_instance = new ResolvedTextDirection('Ltr', 0);
    ResolvedTextDirection_Rtl_instance = new ResolvedTextDirection('Rtl', 1);
  }
  function ResolvedTextDirection(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ResolvedTextDirection_Ltr_getInstance() {
    ResolvedTextDirection_initEntries();
    return ResolvedTextDirection_Ltr_instance;
  }
  function ResolvedTextDirection_Rtl_getInstance() {
    ResolvedTextDirection_initEntries();
    return ResolvedTextDirection_Rtl_instance;
  }
  function _TextAlign___init__impl__99wz4v(value) {
    return value;
  }
  function TextAlign__toString_impl_6ha6d3($this) {
    return $this === Companion_getInstance_30().n46_1 ? 'Left' : $this === Companion_getInstance_30().o46_1 ? 'Right' : $this === Companion_getInstance_30().p46_1 ? 'Center' : $this === Companion_getInstance_30().q46_1 ? 'Justify' : $this === Companion_getInstance_30().r46_1 ? 'Start' : $this === Companion_getInstance_30().s46_1 ? 'End' : $this === Companion_getInstance_30().t46_1 ? 'Unspecified' : 'Invalid';
  }
  function Companion_17() {
    Companion_instance_19 = this;
    this.n46_1 = _TextAlign___init__impl__99wz4v(1);
    this.o46_1 = _TextAlign___init__impl__99wz4v(2);
    this.p46_1 = _TextAlign___init__impl__99wz4v(3);
    this.q46_1 = _TextAlign___init__impl__99wz4v(4);
    this.r46_1 = _TextAlign___init__impl__99wz4v(5);
    this.s46_1 = _TextAlign___init__impl__99wz4v(6);
    this.t46_1 = _TextAlign___init__impl__99wz4v(IntCompanionObject_instance.MIN_VALUE);
  }
  var Companion_instance_19;
  function Companion_getInstance_30() {
    if (Companion_instance_19 == null)
      new Companion_17();
    return Companion_instance_19;
  }
  function TextAlign__hashCode_impl_s8g35y($this) {
    return $this;
  }
  function TextAlign__equals_impl_latoh6($this, other) {
    if (!(other instanceof TextAlign))
      return false;
    if (!($this === (other instanceof TextAlign ? other.z4j_1 : THROW_CCE())))
      return false;
    return true;
  }
  function TextAlign(value) {
    Companion_getInstance_30();
    this.z4j_1 = value;
  }
  protoOf(TextAlign).toString = function () {
    return TextAlign__toString_impl_6ha6d3(this.z4j_1);
  };
  protoOf(TextAlign).hashCode = function () {
    return TextAlign__hashCode_impl_s8g35y(this.z4j_1);
  };
  protoOf(TextAlign).equals = function (other) {
    return TextAlign__equals_impl_latoh6(this.z4j_1, other);
  };
  function Companion_18() {
    Companion_instance_20 = this;
    this.b4a_1 = new TextDecoration(0);
    this.c4a_1 = new TextDecoration(1);
    this.d4a_1 = new TextDecoration(2);
  }
  var Companion_instance_20;
  function Companion_getInstance_31() {
    if (Companion_instance_20 == null)
      new Companion_18();
    return Companion_instance_20;
  }
  function TextDecoration(mask) {
    Companion_getInstance_31();
    this.a4k_1 = mask;
  }
  protoOf(TextDecoration).b4k = function (other) {
    return (this.a4k_1 | other.a4k_1) === this.a4k_1;
  };
  protoOf(TextDecoration).toString = function () {
    if (this.a4k_1 === 0) {
      return 'TextDecoration.None';
    }
    // Inline function 'kotlin.collections.mutableListOf' call
    var values = ArrayList_init_$Create$_0();
    if (!((this.a4k_1 & Companion_getInstance_31().c4a_1.a4k_1) === 0)) {
      values.a1('Underline');
    }
    if (!((this.a4k_1 & Companion_getInstance_31().d4a_1.a4k_1) === 0)) {
      values.a1('LineThrough');
    }
    if (values.m() === 1) {
      return 'TextDecoration.' + values.n(0);
    }
    return 'TextDecoration[' + fastJoinToString(values, ', ') + ']';
  };
  protoOf(TextDecoration).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextDecoration))
      return false;
    if (!(this.a4k_1 === other.a4k_1))
      return false;
    return true;
  };
  protoOf(TextDecoration).hashCode = function () {
    return this.a4k_1;
  };
  function _TextDirection___init__impl__lh8lzt(value) {
    return value;
  }
  function TextDirection__toString_impl_x3uh9t($this) {
    return $this === Companion_getInstance_32().b46_1 ? 'Ltr' : $this === Companion_getInstance_32().c46_1 ? 'Rtl' : $this === Companion_getInstance_32().d46_1 ? 'Content' : $this === Companion_getInstance_32().e46_1 ? 'ContentOrLtr' : $this === Companion_getInstance_32().f46_1 ? 'ContentOrRtl' : $this === Companion_getInstance_32().g46_1 ? 'Unspecified' : 'Invalid';
  }
  function Companion_19() {
    Companion_instance_21 = this;
    this.b46_1 = _TextDirection___init__impl__lh8lzt(1);
    this.c46_1 = _TextDirection___init__impl__lh8lzt(2);
    this.d46_1 = _TextDirection___init__impl__lh8lzt(3);
    this.e46_1 = _TextDirection___init__impl__lh8lzt(4);
    this.f46_1 = _TextDirection___init__impl__lh8lzt(5);
    this.g46_1 = _TextDirection___init__impl__lh8lzt(IntCompanionObject_instance.MIN_VALUE);
  }
  var Companion_instance_21;
  function Companion_getInstance_32() {
    if (Companion_instance_21 == null)
      new Companion_19();
    return Companion_instance_21;
  }
  function TextDirection__hashCode_impl_g63nwg($this) {
    return $this;
  }
  function TextDirection__equals_impl_3fvxt0($this, other) {
    if (!(other instanceof TextDirection))
      return false;
    if (!($this === (other instanceof TextDirection ? other.c4k_1 : THROW_CCE())))
      return false;
    return true;
  }
  function TextDirection(value) {
    Companion_getInstance_32();
    this.c4k_1 = value;
  }
  protoOf(TextDirection).toString = function () {
    return TextDirection__toString_impl_x3uh9t(this.c4k_1);
  };
  protoOf(TextDirection).hashCode = function () {
    return TextDirection__hashCode_impl_g63nwg(this.c4k_1);
  };
  protoOf(TextDirection).equals = function (other) {
    return TextDirection__equals_impl_3fvxt0(this.c4k_1, other);
  };
  function Unspecified() {
  }
  protoOf(Unspecified).g41 = function () {
    return Companion_getInstance().w3s_1;
  };
  protoOf(Unspecified).j48 = function () {
    return null;
  };
  protoOf(Unspecified).p3n = function () {
    return NaN;
  };
  var Unspecified_instance;
  function Unspecified_getInstance() {
    return Unspecified_instance;
  }
  function Companion_20() {
  }
  protoOf(Companion_20).r47 = function (color) {
    var tmp;
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    if (!equals(_Color___get_value__impl__1pls5m(color), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      tmp = new ColorStyle(color);
    } else {
      tmp = Unspecified_instance;
    }
    return tmp;
  };
  protoOf(Companion_20).s47 = function (brush, alpha) {
    var tmp;
    if (brush == null) {
      tmp = Unspecified_instance;
    } else {
      if (brush instanceof SolidColor) {
        tmp = this.r47(modulate(brush.d4k_1, alpha));
      } else {
        if (brush instanceof ShaderBrush) {
          tmp = new BrushStyle(brush, alpha);
        } else {
          noWhenBranchMatchedException();
        }
      }
    }
    return tmp;
  };
  var Companion_instance_22;
  function Companion_getInstance_33() {
    return Companion_instance_22;
  }
  function TextForegroundStyle$merge$lambda(this$0) {
    return function () {
      return this$0.p3n();
    };
  }
  function TextForegroundStyle$merge$lambda_0(this$0) {
    return function () {
      return this$0;
    };
  }
  function TextForegroundStyle() {
  }
  function BrushStyle(value, alpha) {
    this.e4k_1 = value;
    this.f4k_1 = alpha;
  }
  protoOf(BrushStyle).p3n = function () {
    return this.f4k_1;
  };
  protoOf(BrushStyle).g41 = function () {
    return Companion_getInstance().w3s_1;
  };
  protoOf(BrushStyle).j48 = function () {
    return this.e4k_1;
  };
  protoOf(BrushStyle).toString = function () {
    return 'BrushStyle(value=' + this.e4k_1 + ', alpha=' + this.f4k_1 + ')';
  };
  protoOf(BrushStyle).hashCode = function () {
    var result = hashCode(this.e4k_1);
    result = imul(result, 31) + getNumberHashCode(this.f4k_1) | 0;
    return result;
  };
  protoOf(BrushStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BrushStyle))
      return false;
    var tmp0_other_with_cast = other instanceof BrushStyle ? other : THROW_CCE();
    if (!equals(this.e4k_1, tmp0_other_with_cast.e4k_1))
      return false;
    if (!equals(this.f4k_1, tmp0_other_with_cast.f4k_1))
      return false;
    return true;
  };
  function takeOrElse_0(_this__u8e3s4, block) {
    return isNaN_0(_this__u8e3s4) ? block() : _this__u8e3s4;
  }
  function ColorStyle(value) {
    this.g4k_1 = value;
    // Inline function 'kotlin.require' call
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    var this_0 = this.g4k_1;
    // Inline function 'kotlin.contracts.contract' call
    if (!!equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      // Inline function 'androidx.compose.ui.text.style.ColorStyle.<anonymous>' call
      var message = 'ColorStyle value must be specified, use TextForegroundStyle.Unspecified instead.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(ColorStyle).g41 = function () {
    return this.g4k_1;
  };
  protoOf(ColorStyle).j48 = function () {
    return null;
  };
  protoOf(ColorStyle).p3n = function () {
    return _Color___get_alpha__impl__wcfyv1(this.g41());
  };
  protoOf(ColorStyle).toString = function () {
    return 'ColorStyle(value=' + new Color(this.g4k_1) + ')';
  };
  protoOf(ColorStyle).hashCode = function () {
    return Color__hashCode_impl_vjyivj(this.g4k_1);
  };
  protoOf(ColorStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ColorStyle))
      return false;
    var tmp0_other_with_cast = other instanceof ColorStyle ? other : THROW_CCE();
    if (!equals(this.g4k_1, tmp0_other_with_cast.g4k_1))
      return false;
    return true;
  };
  function modulate(_this__u8e3s4, alpha) {
    return (isNaN_0(alpha) ? true : alpha >= 1.0) ? _this__u8e3s4 : Color__copy$default_impl_ectz3s(_this__u8e3s4, _Color___get_alpha__impl__wcfyv1(_this__u8e3s4) * alpha);
  }
  function Companion_21() {
    Companion_instance_23 = this;
    this.a4a_1 = new TextGeometricTransform(1.0, 0.0);
  }
  var Companion_instance_23;
  function Companion_getInstance_34() {
    if (Companion_instance_23 == null)
      new Companion_21();
    return Companion_instance_23;
  }
  function TextGeometricTransform(scaleX, skewX) {
    Companion_getInstance_34();
    scaleX = scaleX === VOID ? 1.0 : scaleX;
    skewX = skewX === VOID ? 0.0 : skewX;
    this.h4k_1 = scaleX;
    this.i4k_1 = skewX;
  }
  protoOf(TextGeometricTransform).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextGeometricTransform))
      return false;
    if (!(this.h4k_1 === other.h4k_1))
      return false;
    if (!(this.i4k_1 === other.i4k_1))
      return false;
    return true;
  };
  protoOf(TextGeometricTransform).hashCode = function () {
    var result = getNumberHashCode(this.h4k_1);
    result = imul(31, result) + getNumberHashCode(this.i4k_1) | 0;
    return result;
  };
  protoOf(TextGeometricTransform).toString = function () {
    return 'TextGeometricTransform(scaleX=' + this.h4k_1 + ', skewX=' + this.i4k_1 + ')';
  };
  function Companion_22() {
    Companion_instance_24 = this;
    this.e47_1 = new TextIndent_0();
  }
  var Companion_instance_24;
  function Companion_getInstance_35() {
    if (Companion_instance_24 == null)
      new Companion_22();
    return Companion_instance_24;
  }
  function TextIndent_0(firstLine, restLine) {
    Companion_getInstance_35();
    firstLine = firstLine === VOID ? get_sp(0) : firstLine;
    restLine = restLine === VOID ? get_sp(0) : restLine;
    this.j4k_1 = firstLine;
    this.k4k_1 = restLine;
  }
  protoOf(TextIndent_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof TextIndent_0))
      return false;
    if (!equals(this.j4k_1, other.j4k_1))
      return false;
    if (!equals(this.k4k_1, other.k4k_1))
      return false;
    return true;
  };
  protoOf(TextIndent_0).hashCode = function () {
    var result = TextUnit__hashCode_impl_qsmeov(this.j4k_1);
    result = imul(31, result) + TextUnit__hashCode_impl_qsmeov(this.k4k_1) | 0;
    return result;
  };
  protoOf(TextIndent_0).toString = function () {
    return 'TextIndent(firstLine=' + new TextUnit(this.j4k_1) + ', restLine=' + new TextUnit(this.k4k_1) + ')';
  };
  function _TextOverflow___init__impl__obguoe(value) {
    return value;
  }
  function _TextOverflow___get_value__impl__vugm5i($this) {
    return $this;
  }
  function TextOverflow__toString_impl_10s0c2($this) {
    return $this === Companion_getInstance_36().l4k_1 ? 'Clip' : $this === Companion_getInstance_36().m4k_1 ? 'Ellipsis' : $this === Companion_getInstance_36().n4k_1 ? 'Visible' : 'Invalid';
  }
  function Companion_23() {
    Companion_instance_25 = this;
    this.l4k_1 = _TextOverflow___init__impl__obguoe(1);
    this.m4k_1 = _TextOverflow___init__impl__obguoe(2);
    this.n4k_1 = _TextOverflow___init__impl__obguoe(3);
  }
  var Companion_instance_25;
  function Companion_getInstance_36() {
    if (Companion_instance_25 == null)
      new Companion_23();
    return Companion_instance_25;
  }
  function TextOverflow__hashCode_impl_kqdwgt($this) {
    return $this;
  }
  function TextOverflow__equals_impl_jkxdof($this, other) {
    if (!(other instanceof TextOverflow))
      return false;
    if (!($this === (other instanceof TextOverflow ? other.o4k_1 : THROW_CCE())))
      return false;
    return true;
  }
  function TextOverflow(value) {
    Companion_getInstance_36();
    this.o4k_1 = value;
  }
  protoOf(TextOverflow).toString = function () {
    return TextOverflow__toString_impl_10s0c2(this.o4k_1);
  };
  protoOf(TextOverflow).hashCode = function () {
    return TextOverflow__hashCode_impl_kqdwgt(this.o4k_1);
  };
  protoOf(TextOverflow).equals = function (other) {
    return TextOverflow__equals_impl_jkxdof(this.o4k_1, other);
  };
  function userPreferredLanguages() {
    return toList(getUserPreferredLanguagesAsArray());
  }
  function getUserPreferredLanguagesAsArray() {
    return window.navigator.languages;
  }
  function strongDirectionType(_this__u8e3s4) {
    var tmp0_subject = CharDirection_getInstance().g3i(_this__u8e3s4);
    var tmp;
    CharDirection_getInstance();
    if (tmp0_subject === 0) {
      tmp = Companion_getInstance_37().q4k_1;
    } else {
      var tmp_0;
      CharDirection_getInstance();
      if (tmp0_subject === 1) {
        tmp_0 = true;
      } else {
        CharDirection_getInstance();
        tmp_0 = tmp0_subject === 13;
      }
      if (tmp_0) {
        tmp = Companion_getInstance_37().r4k_1;
      } else {
        tmp = Companion_getInstance_37().p4k_1;
      }
    }
    return tmp;
  }
  function NoCache() {
  }
  protoOf(NoCache).s4k = function (key, loader) {
    return loader(key);
  };
  protoOf(NoCache).t4k = function (key, loader) {
    return this.s4k(!(key == null) ? key : THROW_CCE(), loader);
  };
  function synthesizeTypeface(_this__u8e3s4, typeface, font, requestedWeight, requestedStyle) {
    return typeface;
  }
  function PlatformFont() {
  }
  protoOf(PlatformFont).a4f = function () {
    return '' + getKClassFromExpression(this).e7() + '|' + this.u4k() + '|weight=' + this.t3c().w4i_1 + '|style=' + new FontStyle(this.h4d());
  };
  function AtomicReference(value) {
    this.v4k_1 = value;
  }
  function checkEvicted($this, now) {
    var expireTime = now.fb($this.w4k_1);
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.takeWhile' call
    var this_0 = $this.z4k_1.m2();
    var list = ArrayList_init_$Create$_0();
    var tmp0_iterator = this_0.o();
    $l$loop: while (tmp0_iterator.d1()) {
      var item = tmp0_iterator.f1();
      // Inline function 'androidx.compose.ui.text.ExpireAfterAccessCache.checkEvicted.<anonymous>' call
      if (!(ensureNotNull($this.z4k_1.z2(item)).z6(expireTime) < 0))
        break $l$loop;
      list.a1(item);
    }
    var tmp0_iterator_0 = list.o();
    while (tmp0_iterator_0.d1()) {
      var element = tmp0_iterator_0.f1();
      // Inline function 'androidx.compose.ui.text.ExpireAfterAccessCache.checkEvicted.<anonymous>' call
      $this.y4k_1.t2(element);
      $this.z4k_1.t2(element);
    }
  }
  function currentNanoTime$ref() {
    var l = function () {
      return currentNanoTime();
    };
    l.callableName = 'currentNanoTime';
    return l;
  }
  function ExpireAfterAccessCache(expireAfterNanos, currentNanos) {
    var tmp;
    if (currentNanos === VOID) {
      tmp = currentNanoTime$ref();
    } else {
      tmp = currentNanos;
    }
    currentNanos = tmp;
    this.w4k_1 = expireAfterNanos;
    this.x4k_1 = currentNanos;
    this.y4k_1 = HashMap_init_$Create$_0();
    this.z4k_1 = LinkedHashMap_init_$Create$();
  }
  protoOf(ExpireAfterAccessCache).t4k = function (key, loader) {
    this.z4k_1.t2(key);
    // Inline function 'kotlin.also' call
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.y4k_1;
    var value = this_0.z2(key);
    var tmp;
    if (value == null) {
      // Inline function 'androidx.compose.ui.text.ExpireAfterAccessCache.get.<anonymous>' call
      var answer = loader(key);
      this_0.p2(key, answer);
      tmp = answer;
    } else {
      tmp = value;
    }
    var this_1 = tmp;
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.ExpireAfterAccessCache.get.<anonymous>' call
    var now = this.x4k_1();
    // Inline function 'kotlin.collections.set' call
    this.z4k_1.p2(key, now);
    checkEvicted(this, now);
    return this_1;
  };
  function get_PUSH_DIRECTIONAL_ISOLATE_RANGE() {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    return PUSH_DIRECTIONAL_ISOLATE_RANGE;
  }
  var PUSH_DIRECTIONAL_ISOLATE_RANGE;
  function _StrongDirectionType___init__impl__59uet3(value) {
    return value;
  }
  function Companion_24() {
    Companion_instance_26 = this;
    this.p4k_1 = _StrongDirectionType___init__impl__59uet3(0);
    this.q4k_1 = _StrongDirectionType___init__impl__59uet3(1);
    this.r4k_1 = _StrongDirectionType___init__impl__59uet3(2);
  }
  var Companion_instance_26;
  function Companion_getInstance_37() {
    if (Companion_instance_26 == null)
      new Companion_24();
    return Companion_instance_26;
  }
  function firstStrongDirectionType(_this__u8e3s4) {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    var tmp0_iterator = get_codePointsOutsideDirectionalIsolate(_this__u8e3s4).o();
    $l$loop: while (tmp0_iterator.d1()) {
      var codePoint = tmp0_iterator.f1();
      var strongDirectionType_0 = strongDirectionType(codePoint);
      var tmp;
      if (strongDirectionType_0 === Companion_getInstance_37().p4k_1) {
        continue $l$loop;
      } else {
        tmp = strongDirectionType_0;
      }
      return tmp;
    }
    return Companion_getInstance_37().p4k_1;
  }
  function codePointAt(_this__u8e3s4, index) {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    var high = charSequenceGet(_this__u8e3s4, index);
    if (isHighSurrogate(high) ? (index + 1 | 0) < _this__u8e3s4.length : false) {
      var low = charSequenceGet(_this__u8e3s4, index + 1 | 0);
      if (isLowSurrogate(low)) {
        return toCodePoint(Companion_getInstance_3(), high, low);
      }
    }
    // Inline function 'kotlin.code' call
    return Char__toInt_impl_vasixd(high);
  }
  function get_codePointsOutsideDirectionalIsolate(_this__u8e3s4) {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    return sequence(_get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj_0(_this__u8e3s4, null));
  }
  function toCodePoint(_this__u8e3s4, high, low) {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    Companion_getInstance_3();
    var tmp = Char__minus_impl_a2frrh(high, _Char___init__impl__6a9atx(55296)) << 10;
    Companion_getInstance_3();
    return (tmp | Char__minus_impl_a2frrh(low, _Char___init__impl__6a9atx(56320))) + 65536 | 0;
  }
  function get_codePoints(_this__u8e3s4) {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    return sequence(_get_codePoints_$slambda_43x8dt_0(_this__u8e3s4, null));
  }
  function charCount(_this__u8e3s4) {
    _init_properties_CharHelpers_skiko_kt__8ej40s();
    return _this__u8e3s4 >= 65536 ? 2 : 1;
  }
  function _get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj($this_codePointsOutsideDirectionalIsolate, resultContinuation) {
    this.i4l_1 = $this_codePointsOutsideDirectionalIsolate;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(_get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj).t2x = function ($this$sequence, $completion) {
    var tmp = this.u2x($this$sequence, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(_get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj).yc = function (p1, $completion) {
    return this.t2x(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(_get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            this.k4l_1 = 0;
            this.l4l_1 = get_codePoints(this.i4l_1).o();
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!this.l4l_1.d1()) {
              this.ac_1 = 4;
              continue $sm;
            }

            this.m4l_1 = this.l4l_1.f1();
            var progression = get_PUSH_DIRECTIONAL_ISOLATE_RANGE();
            var containsLower = progression.aa_1;
            var containsUpper = progression.ba_1;
            var containsArg = this.m4l_1;
            if (containsLower <= containsArg ? containsArg <= containsUpper : false) {
              this.k4l_1 = this.k4l_1 + 1 | 0;
              this.ac_1 = 3;
              continue $sm;
            } else {
              if (this.m4l_1 === 8297) {
                if (this.k4l_1 > 0) {
                  this.k4l_1 = this.k4l_1 - 1 | 0;
                }
                this.ac_1 = 3;
                continue $sm;
              } else {
                if (this.k4l_1 === 0) {
                  this.ac_1 = 2;
                  suspendResult = this.j4l_1.af(this.m4l_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.ac_1 = 3;
                  continue $sm;
                }
              }
            }

          case 2:
            this.ac_1 = 3;
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
  protoOf(_get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj).u2x = function ($this$sequence, completion) {
    var i = new _get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj(this.i4l_1, completion);
    i.j4l_1 = $this$sequence;
    return i;
  };
  function _get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj_0($this_codePointsOutsideDirectionalIsolate, resultContinuation) {
    var i = new _get_codePointsOutsideDirectionalIsolate_$slambda_cun5rj($this_codePointsOutsideDirectionalIsolate, resultContinuation);
    var l = function ($this$sequence, $completion) {
      return i.t2x($this$sequence, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function _get_codePoints_$slambda_43x8dt($this_codePoints, resultContinuation) {
    this.v4l_1 = $this_codePoints;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(_get_codePoints_$slambda_43x8dt).t2x = function ($this$sequence, $completion) {
    var tmp = this.u2x($this$sequence, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(_get_codePoints_$slambda_43x8dt).yc = function (p1, $completion) {
    return this.t2x(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(_get_codePoints_$slambda_43x8dt).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            this.x4l_1 = 0;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!(this.x4l_1 < this.v4l_1.length)) {
              this.ac_1 = 3;
              continue $sm;
            }

            this.y4l_1 = codePointAt(this.v4l_1, this.x4l_1);
            this.ac_1 = 2;
            suspendResult = this.w4l_1.af(this.y4l_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.x4l_1 = this.x4l_1 + charCount(this.y4l_1) | 0;
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
  protoOf(_get_codePoints_$slambda_43x8dt).u2x = function ($this$sequence, completion) {
    var i = new _get_codePoints_$slambda_43x8dt(this.v4l_1, completion);
    i.w4l_1 = $this$sequence;
    return i;
  };
  function _get_codePoints_$slambda_43x8dt_0($this_codePoints, resultContinuation) {
    var i = new _get_codePoints_$slambda_43x8dt($this_codePoints, resultContinuation);
    var l = function ($this$sequence, $completion) {
      return i.t2x($this$sequence, $completion);
    };
    l.$arity = 1;
    return l;
  }
  var properties_initialized_CharHelpers_skiko_kt_d762bq;
  function _init_properties_CharHelpers_skiko_kt__8ej40s() {
    if (!properties_initialized_CharHelpers_skiko_kt_d762bq) {
      properties_initialized_CharHelpers_skiko_kt_d762bq = true;
      PUSH_DIRECTIONAL_ISOLATE_RANGE = numberRangeToNumber(8294, 8296);
    }
  }
  function FontRasterizationSettings$Companion$PlatformDefault$delegate$lambda() {
    var tmp;
    switch (currentPlatform().t9_1) {
      case 2:
        var tmp1_smoothing = FontSmoothing_AntiAlias_getInstance();
        var tmp2_hinting = FontHinting_Normal_getInstance();
        tmp = new FontRasterizationSettings(tmp1_smoothing, tmp2_hinting, true, false);
        break;
      case 1:
      case 0:
        var tmp3_smoothing = FontSmoothing_AntiAlias_getInstance();
        var tmp4_hinting = FontHinting_Slight_getInstance();
        tmp = new FontRasterizationSettings(tmp3_smoothing, tmp4_hinting, true, false);
        break;
      case 7:
        var tmp5_smoothing = FontSmoothing_AntiAlias_getInstance();
        var tmp6_hinting = FontHinting_Slight_getInstance();
        tmp = new FontRasterizationSettings(tmp5_smoothing, tmp6_hinting, true, false);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        var tmp7_smoothing = FontSmoothing_AntiAlias_getInstance();
        var tmp8_hinting = FontHinting_Normal_getInstance();
        tmp = new FontRasterizationSettings(tmp7_smoothing, tmp8_hinting, true, false);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function Companion_25() {
    Companion_instance_27 = this;
    var tmp = this;
    tmp.z4l_1 = lazy_0(FontRasterizationSettings$Companion$PlatformDefault$delegate$lambda);
  }
  protoOf(Companion_25).a4m = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.z4l_1;
    PlatformDefault$factory();
    return this_0.s2();
  };
  var Companion_instance_27;
  function Companion_getInstance_38() {
    if (Companion_instance_27 == null)
      new Companion_25();
    return Companion_instance_27;
  }
  function FontRasterizationSettings(smoothing, hinting, subpixelPositioning, autoHintingForced) {
    Companion_getInstance_38();
    this.b4m_1 = smoothing;
    this.c4m_1 = hinting;
    this.d4m_1 = subpixelPositioning;
    this.e4m_1 = autoHintingForced;
  }
  protoOf(FontRasterizationSettings).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof FontRasterizationSettings))
      THROW_CCE();
    if (!this.b4m_1.equals(other.b4m_1))
      return false;
    if (!this.c4m_1.equals(other.c4m_1))
      return false;
    if (!(this.d4m_1 === other.d4m_1))
      return false;
    return this.e4m_1 === other.e4m_1;
  };
  protoOf(FontRasterizationSettings).hashCode = function () {
    var result = this.b4m_1.hashCode();
    result = imul(31, result) + this.c4m_1.hashCode() | 0;
    result = imul(31, result) + getBooleanHashCode(this.d4m_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.e4m_1) | 0;
    return result;
  };
  protoOf(FontRasterizationSettings).toString = function () {
    return 'FontRasterizationSettings(smoothing=' + this.b4m_1 + ', ' + ('hinting=' + this.c4m_1 + ', ') + ('subpixelPositioning=' + this.d4m_1 + ', ') + ('autoHintingForced=' + this.e4m_1 + ')');
  };
  var FontSmoothing_None_instance;
  var FontSmoothing_AntiAlias_instance;
  var FontSmoothing_SubpixelAntiAlias_instance;
  var FontSmoothing_entriesInitialized;
  function FontSmoothing_initEntries() {
    if (FontSmoothing_entriesInitialized)
      return Unit_instance;
    FontSmoothing_entriesInitialized = true;
    FontSmoothing_None_instance = new FontSmoothing('None', 0);
    FontSmoothing_AntiAlias_instance = new FontSmoothing('AntiAlias', 1);
    FontSmoothing_SubpixelAntiAlias_instance = new FontSmoothing('SubpixelAntiAlias', 2);
  }
  function FontSmoothing(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  var FontHinting_None_instance;
  var FontHinting_Slight_instance;
  var FontHinting_Normal_instance;
  var FontHinting_Full_instance;
  var FontHinting_entriesInitialized;
  function FontHinting_initEntries() {
    if (FontHinting_entriesInitialized)
      return Unit_instance;
    FontHinting_entriesInitialized = true;
    FontHinting_None_instance = new FontHinting('None', 0);
    FontHinting_Slight_instance = new FontHinting('Slight', 1);
    FontHinting_Normal_instance = new FontHinting('Normal', 2);
    FontHinting_Full_instance = new FontHinting('Full', 3);
  }
  function FontHinting(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function toSkFontRastrSettings(_this__u8e3s4) {
    return new FontRastrSettings(toSkFontEdging(_this__u8e3s4.b4m_1), toSkFontHinting(_this__u8e3s4.c4m_1), _this__u8e3s4.d4m_1);
  }
  function toSkFontEdging(_this__u8e3s4) {
    var tmp;
    switch (_this__u8e3s4.t9_1) {
      case 0:
        tmp = FontEdging_ALIAS_getInstance();
        break;
      case 1:
        tmp = FontEdging_ANTI_ALIAS_getInstance();
        break;
      case 2:
        tmp = FontEdging_SUBPIXEL_ANTI_ALIAS_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function toSkFontHinting(_this__u8e3s4) {
    var tmp;
    switch (_this__u8e3s4.t9_1) {
      case 0:
        tmp = FontHinting_NONE_getInstance();
        break;
      case 1:
        tmp = FontHinting_SLIGHT_getInstance();
        break;
      case 2:
        tmp = FontHinting_NORMAL_getInstance();
        break;
      case 3:
        tmp = FontHinting_FULL_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function FontSmoothing_AntiAlias_getInstance() {
    FontSmoothing_initEntries();
    return FontSmoothing_AntiAlias_instance;
  }
  function FontHinting_Slight_getInstance() {
    FontHinting_initEntries();
    return FontHinting_Slight_instance;
  }
  function FontHinting_Normal_getInstance() {
    FontHinting_initEntries();
    return FontHinting_Normal_instance;
  }
  function PlatformDefault$factory() {
    return getPropertyCallableRef('PlatformDefault', 1, KProperty1, function (receiver) {
      return receiver.a4m();
    }, null);
  }
  function Paragraph_1() {
  }
  function _set_paragraph__p1bfvb($this, value) {
    $this.n4m_1 = value;
    $this.o4m_1 = null;
  }
  function _get_text__de5ose($this) {
    return $this.l4m_1.p4m_1;
  }
  function lineMetricsForOffset($this, offset) {
    // Inline function 'androidx.compose.ui.text.SkiaParagraph.checkOffsetIsValid' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= offset ? offset <= _get_text__de5ose($this).length : false)) {
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.checkOffsetIsValid.<anonymous>' call
      var message = 'Invalid offset: ' + offset + '. Valid range is [0, ' + _get_text__de5ose($this).length + ']';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp$ret$2;
    $l$block: {
      // Inline function 'androidx.compose.ui.text.binarySearchFirstMatchingOrLast' call
      var this_0 = _get_lineMetrics__5iiuki($this);
      // Inline function 'kotlin.collections.isEmpty' call
      if (this_0.length === 0) {
        tmp$ret$2 = null;
        break $l$block;
      }
      var tmp = asList(this_0);
      var index = binarySearch(tmp, VOID, VOID, SkiaParagraph$lineMetricsForOffset$lambda(offset));
      tmp$ret$2 = this_0[coerceAtMost((-index | 0) - 1 | 0, get_lastIndex_0(this_0))];
    }
    return tmp$ret$2;
  }
  function getLineMetricsForVerticalPosition($this, vertical) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'androidx.compose.ui.text.binarySearchFirstMatchingOrLast' call
      var this_0 = _get_lineMetrics__5iiuki($this);
      // Inline function 'kotlin.collections.isEmpty' call
      if (this_0.length === 0) {
        tmp$ret$1 = null;
        break $l$block;
      }
      var tmp = asList(this_0);
      var index = binarySearch(tmp, VOID, VOID, SkiaParagraph$getLineMetricsForVerticalPosition$lambda(vertical));
      tmp$ret$1 = this_0[coerceAtMost((-index | 0) - 1 | 0, get_lastIndex_0(this_0))];
    }
    return tmp$ret$1;
  }
  function _get_lineMetrics__5iiuki($this) {
    var tmp0_elvis_lhs = $this.o4m_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = receiveLineMetrics($this);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.<get-lineMetrics>.<anonymous>' call
      $this.o4m_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var lineMetrics = tmp;
    return lineMetrics;
  }
  function receiveLineMetrics($this) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    var this_0 = _get_text__de5ose($this);
    if (charSequenceLength(this_0) === 0) {
      tmp = $this.m4m_1.d4n($this.n4m_1);
    } else {
      tmp = $this.n4m_1.f3k();
    }
    var lineMetrics = tmp;
    var fontMetrics = $this.e4n().d3b();
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (!(lineMetrics.length === 0)) {
      lineMetrics[0] = trimFirstAscent(lineMetrics[0], fontMetrics, $this.m4m_1.f4n());
      lineMetrics[lineMetrics.length - 1 | 0] = trimLastDescent(lineMetrics[lineMetrics.length - 1 | 0], fontMetrics, $this.m4m_1.f4n());
    }
    return lineMetrics;
  }
  function getBoxForwardByOffset($this, offset) {
    // Inline function 'androidx.compose.ui.text.SkiaParagraph.checkOffsetIsValid' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= offset ? offset <= _get_text__de5ose($this).length : false)) {
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.checkOffsetIsValid.<anonymous>' call
      var message = 'Invalid offset: ' + offset + '. Valid range is [0, ' + _get_text__de5ose($this).length + ']';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var to = offset + 1 | 0;
    while (to <= _get_text__de5ose($this).length) {
      var box = firstOrNull($this.n4m_1.c3k(offset, to, RectHeightMode_STRUT_getInstance(), RectWidthMode_TIGHT_getInstance()));
      if (!(box == null)) {
        return box;
      }
      to = to + 1 | 0;
    }
    return null;
  }
  function SkiaParagraph$lineMetricsForOffset$lambda($offset) {
    return function (it) {
      var tmp;
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.lineMetricsForOffset.<anonymous>' call
      if ($offset < it.i3j_1) {
        tmp = 1;
      } else {
        tmp = -1;
      }
      return tmp;
    };
  }
  function SkiaParagraph$getLineMetricsForVerticalPosition$lambda($vertical) {
    return function (it) {
      var tmp;
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.getLineMetricsForVerticalPosition.<anonymous>' call
      if ($vertical < it.q3j_1 + it.l3j_1) {
        tmp = 1;
      } else {
        tmp = -1;
      }
      return tmp;
    };
  }
  function SkiaParagraph(intrinsics, maxLines, ellipsis, constraints) {
    this.h4m_1 = maxLines;
    this.i4m_1 = ellipsis;
    this.j4m_1 = constraints;
    this.k4m_1 = this.i4m_1 ? '\u2026' : '';
    var tmp = this;
    tmp.l4m_1 = intrinsics instanceof SkiaParagraphIntrinsics ? intrinsics : THROW_CCE();
    var tmp_0 = this;
    // Inline function 'kotlin.apply' call
    var this_0 = this.l4m_1.g4n();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.SkiaParagraph.layouter.<anonymous>' call
    this_0.h4n(this.h4m_1, this.k4m_1);
    tmp_0.m4m_1 = this_0;
    this.n4m_1 = this.m4m_1.i4n(this.e34());
    this.n4m_1.a3k(this.e34());
    this.o4m_1 = null;
  }
  protoOf(SkiaParagraph).e4n = function () {
    return this.m4m_1.e4n();
  };
  protoOf(SkiaParagraph).e34 = function () {
    return _Constraints___get_maxWidth__impl__uuyqc(this.j4m_1);
  };
  protoOf(SkiaParagraph).f34 = function () {
    return this.n4m_1.f34();
  };
  protoOf(SkiaParagraph).x3j = function () {
    return this.l4m_1.y4m_1;
  };
  protoOf(SkiaParagraph).g45 = function () {
    var tmp0_safe_receiver = firstOrNull(_get_lineMetrics__5iiuki(this));
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.<get-firstBaseline>.<anonymous>' call
      tmp = tmp0_safe_receiver.q3j_1;
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? 0.0 : tmp1_elvis_lhs;
  };
  protoOf(SkiaParagraph).h45 = function () {
    var tmp0_safe_receiver = lastOrNull(_get_lineMetrics__5iiuki(this));
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.<get-lastBaseline>.<anonymous>' call
      tmp = tmp0_safe_receiver.q3j_1;
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? 0.0 : tmp1_elvis_lhs;
  };
  protoOf(SkiaParagraph).d45 = function () {
    return this.n4m_1.z3j();
  };
  protoOf(SkiaParagraph).c45 = function () {
    var tmp;
    if (_get_text__de5ose(this) === '' ? true : this.n4m_1.g3k() < 1) {
      tmp = 1;
    } else {
      tmp = this.n4m_1.g3k();
    }
    return tmp;
  };
  protoOf(SkiaParagraph).e45 = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = this.n4m_1.d3k();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(this_0.length);
    var inductionVariable = 0;
    var last = this_0.length;
    while (inductionVariable < last) {
      var item = this_0[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.<get-placeholderRects>.<anonymous>' call
      var tmp$ret$0 = toComposeRect(item.m3l_1);
      destination.a1(tmp$ret$0);
    }
    return destination;
  };
  protoOf(SkiaParagraph).x44 = function (start, end) {
    var boxes = this.n4m_1.c3k(start, end, RectHeightMode_MAX_getInstance(), RectWidthMode_TIGHT_getInstance());
    var path = Path();
    var inductionVariable = 0;
    var last = boxes.length;
    while (inductionVariable < last) {
      var b = boxes[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      asSkiaPath(path).c3f(b.m3l_1);
    }
    return path;
  };
  protoOf(SkiaParagraph).v45 = function (lineIndex) {
    var tmp0_safe_receiver = getOrNull(_get_lineMetrics__5iiuki(this), lineIndex);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.getLineTop.<anonymous>' call
      // Inline function 'kotlin.math.floor' call
      var x = tmp0_safe_receiver.q3j_1 - tmp0_safe_receiver.k3j_1;
      tmp = Math.floor(x);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? 0.0 : tmp1_elvis_lhs;
  };
  protoOf(SkiaParagraph).x45 = function (lineIndex) {
    var tmp0_safe_receiver = getOrNull(_get_lineMetrics__5iiuki(this), lineIndex);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f3j_1;
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  protoOf(SkiaParagraph).z45 = function (lineIndex, visibleEnd) {
    var tmp0_elvis_lhs = getOrNull(_get_lineMetrics__5iiuki(this), lineIndex);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return 0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var metrics = tmp;
    var tmp_0;
    if (visibleEnd) {
      var tmp_1;
      if (lineIndex > 0 ? metrics.f3j_1 < _get_lineMetrics__5iiuki(this)[lineIndex - 1 | 0].g3j_1 : false) {
        tmp_1 = metrics.g3j_1;
      } else if (metrics.f3j_1 < _get_text__de5ose(this).length ? charSequenceGet(_get_text__de5ose(this), metrics.f3j_1) === _Char___init__impl__6a9atx(10) : false) {
        tmp_1 = metrics.f3j_1;
      } else {
        tmp_1 = metrics.h3j_1;
      }
      tmp_0 = tmp_1;
    } else {
      tmp_0 = metrics.g3j_1;
    }
    return tmp_0;
  };
  protoOf(SkiaParagraph).u45 = function (offset) {
    var tmp0_safe_receiver = lineMetricsForOffset(this, offset);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r3j_1;
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  protoOf(SkiaParagraph).n45 = function (vertical) {
    var tmp0_safe_receiver = getLineMetricsForVerticalPosition(this, vertical);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.r3j_1;
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  protoOf(SkiaParagraph).q45 = function (offset) {
    return this.l4m_1.v4m_1;
  };
  protoOf(SkiaParagraph).r45 = function (offset) {
    var tmp0_safe_receiver = getBoxForwardByOffset(this, offset);
    var tmp1_subject = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.o3l();
    var tmp;
    switch (tmp1_subject == null ? -1 : tmp1_subject.t9_1) {
      case 0:
        tmp = ResolvedTextDirection_Rtl_getInstance();
        break;
      case 1:
        tmp = ResolvedTextDirection_Ltr_getInstance();
        break;
      case -1:
        tmp = ResolvedTextDirection_Ltr_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  protoOf(SkiaParagraph).s45 = function (offset) {
    // Inline function 'androidx.compose.ui.text.SkiaParagraph.checkOffsetIsValid' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= offset ? offset <= _get_text__de5ose(this).length : false)) {
      // Inline function 'androidx.compose.ui.text.SkiaParagraph.checkOffsetIsValid.<anonymous>' call
      var message = 'Invalid offset: ' + offset + '. Valid range is [0, ' + _get_text__de5ose(this).length + ']';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if ((offset < _get_text__de5ose(this).length ? isWhitespace(charSequenceGet(_get_text__de5ose(this), offset)) : false) ? true : offset === _get_text__de5ose(this).length) {
      var tmp;
      if (offset > 0 ? !isWhitespace(charSequenceGet(_get_text__de5ose(this), offset - 1 | 0)) : false) {
        tmp = toTextRange(this.n4m_1.e3k(offset - 1 | 0));
      } else {
        tmp = TextRange_0(offset, offset);
      }
      return tmp;
    }
    return toTextRange(this.n4m_1.e3k(offset));
  };
  protoOf(SkiaParagraph).j45 = function (canvas, color, shadow, textDecoration, drawStyle, blendMode) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.SkiaParagraph.paint.<anonymous>' call
    var $this$with = this.m4m_1;
    $this$with.j4n(color, shadow, textDecoration);
    $this$with.k4n(drawStyle);
    $this$with.l4n(blendMode);
    var tmp$ret$1 = $this$with.i4n(this.e34());
    _set_paragraph__p1bfvb(this, tmp$ret$1);
    this.n4m_1.b3k(get_nativeCanvas(canvas), 0.0, 0.0);
  };
  protoOf(SkiaParagraph).l45 = function (canvas, brush, alpha, shadow, textDecoration, drawStyle, blendMode) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.SkiaParagraph.paint.<anonymous>' call
    var $this$with = this.m4m_1;
    $this$with.m4n(brush, Size(this.e34(), this.f34()), alpha, shadow, textDecoration);
    $this$with.k4n(drawStyle);
    $this$with.l4n(blendMode);
    var tmp$ret$1 = $this$with.i4n(this.e34());
    _set_paragraph__p1bfvb(this, tmp$ret$1);
    this.n4m_1.b3k(get_nativeCanvas(canvas), 0.0, 0.0);
  };
  function trimFirstAscent(_this__u8e3s4, fontMetrics, textStyle) {
    if (get_isUnspecified(textStyle.e4c()))
      return _this__u8e3s4;
    var tmp0_elvis_lhs = textStyle.g4c();
    var style = tmp0_elvis_lhs == null ? Companion_getInstance_29().w4j_1 : tmp0_elvis_lhs;
    var tmp;
    if (Trim__isTrimFirstLineTop_impl_tqdsaa(style.y4j_1)) {
      tmp = -fontMetrics.x3b_1;
    } else {
      tmp = _this__u8e3s4.k3j_1;
    }
    var ascent = tmp;
    return copy(_this__u8e3s4, VOID, VOID, VOID, VOID, VOID, ascent);
  }
  function trimLastDescent(_this__u8e3s4, fontMetrics, textStyle) {
    if (get_isUnspecified(textStyle.e4c()))
      return _this__u8e3s4;
    var tmp0_elvis_lhs = textStyle.g4c();
    var style = tmp0_elvis_lhs == null ? Companion_getInstance_29().w4j_1 : tmp0_elvis_lhs;
    var tmp;
    if (Trim__isTrimLastLineBottom_impl_8k6x3e(style.y4j_1)) {
      tmp = fontMetrics.y3b_1;
    } else {
      tmp = _this__u8e3s4.l3j_1;
    }
    var descent = tmp;
    return copy(_this__u8e3s4, VOID, VOID, VOID, VOID, VOID, VOID, descent);
  }
  function toTextRange(_this__u8e3s4) {
    return TextRange_0(_this__u8e3s4.q3d_1, _this__u8e3s4.r3d_1);
  }
  function copy(_this__u8e3s4, startIndex, endIndex, endExcludingWhitespaces, endIncludingNewline, isHardBreak, ascent, descent, unscaledAscent, height, width, left, baseline, lineNumber) {
    startIndex = startIndex === VOID ? _this__u8e3s4.f3j_1 : startIndex;
    endIndex = endIndex === VOID ? _this__u8e3s4.g3j_1 : endIndex;
    endExcludingWhitespaces = endExcludingWhitespaces === VOID ? _this__u8e3s4.h3j_1 : endExcludingWhitespaces;
    endIncludingNewline = endIncludingNewline === VOID ? _this__u8e3s4.i3j_1 : endIncludingNewline;
    isHardBreak = isHardBreak === VOID ? _this__u8e3s4.j3j_1 : isHardBreak;
    ascent = ascent === VOID ? _this__u8e3s4.k3j_1 : ascent;
    descent = descent === VOID ? _this__u8e3s4.l3j_1 : descent;
    unscaledAscent = unscaledAscent === VOID ? _this__u8e3s4.m3j_1 : unscaledAscent;
    height = height === VOID ? _this__u8e3s4.n3j_1 : height;
    width = width === VOID ? _this__u8e3s4.o3j_1 : width;
    left = left === VOID ? _this__u8e3s4.p3j_1 : left;
    baseline = baseline === VOID ? _this__u8e3s4.q3j_1 : baseline;
    lineNumber = lineNumber === VOID ? _this__u8e3s4.r3j_1 : lineNumber;
    return new LineMetrics(startIndex, endIndex, endExcludingWhitespaces, endIncludingNewline, isHardBreak, ascent, descent, unscaledAscent, height, width, left, baseline, lineNumber);
  }
  function _TextDecorationLineStyle___init__impl__fccanb(value) {
    return value;
  }
  function TextDecorationLineStyle__toString_impl_uezvi9($this) {
    return $this === Companion_getInstance_39().n4n_1 ? 'Solid' : $this === Companion_getInstance_39().o4n_1 ? 'Double' : $this === Companion_getInstance_39().p4n_1 ? 'Dotted' : $this === Companion_getInstance_39().q4n_1 ? 'Dashed' : $this === Companion_getInstance_39().r4n_1 ? 'Wavy' : 'Invalid';
  }
  function Companion_26() {
    Companion_instance_28 = this;
    this.n4n_1 = _TextDecorationLineStyle___init__impl__fccanb(1);
    this.o4n_1 = _TextDecorationLineStyle___init__impl__fccanb(2);
    this.p4n_1 = _TextDecorationLineStyle___init__impl__fccanb(3);
    this.q4n_1 = _TextDecorationLineStyle___init__impl__fccanb(4);
    this.r4n_1 = _TextDecorationLineStyle___init__impl__fccanb(5);
  }
  var Companion_instance_28;
  function Companion_getInstance_39() {
    if (Companion_instance_28 == null)
      new Companion_26();
    return Companion_instance_28;
  }
  function TextDecorationLineStyle__hashCode_impl_8ntype($this) {
    return $this;
  }
  function TextDecorationLineStyle__equals_impl_3jy6m($this, other) {
    if (!(other instanceof TextDecorationLineStyle))
      return false;
    if (!($this === (other instanceof TextDecorationLineStyle ? other.s4n_1 : THROW_CCE())))
      return false;
    return true;
  }
  function TextDecorationLineStyle(value) {
    Companion_getInstance_39();
    this.s4n_1 = value;
  }
  protoOf(TextDecorationLineStyle).toString = function () {
    return TextDecorationLineStyle__toString_impl_uezvi9(this.s4n_1);
  };
  protoOf(TextDecorationLineStyle).hashCode = function () {
    return TextDecorationLineStyle__hashCode_impl_8ntype(this.s4n_1);
  };
  protoOf(TextDecorationLineStyle).equals = function (other) {
    return TextDecorationLineStyle__equals_impl_3jy6m(this.s4n_1, other);
  };
  function PlatformTextStyle_init_$Init$(spanStyle, paragraphStyle, $this) {
    PlatformTextStyle.call($this);
    $this.d4b_1 = spanStyle;
    $this.e4b_1 = paragraphStyle;
    return $this;
  }
  function PlatformTextStyle_init_$Create$(spanStyle, paragraphStyle) {
    return PlatformTextStyle_init_$Init$(spanStyle, paragraphStyle, objectCreate(protoOf(PlatformTextStyle)));
  }
  protoOf(PlatformTextStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PlatformTextStyle))
      return false;
    if (!equals(this.e4b_1, other.e4b_1))
      return false;
    if (!equals(this.d4b_1, other.d4b_1))
      return false;
    return true;
  };
  protoOf(PlatformTextStyle).hashCode = function () {
    var tmp0_safe_receiver = this.d4b_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.hashCode();
    var result = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var tmp = imul(31, result);
    var tmp2_safe_receiver = this.e4b_1;
    var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.hashCode();
    result = tmp + (tmp3_elvis_lhs == null ? 0 : tmp3_elvis_lhs) | 0;
    return result;
  };
  function PlatformTextStyle() {
  }
  function createPlatformTextStyle(spanStyle, paragraphStyle) {
    return PlatformTextStyle_init_$Create$(spanStyle, paragraphStyle);
  }
  function createFontFamilyResolver(fontCache) {
    return new FontFamilyResolverImpl(new SkiaFontLoader(fontCache));
  }
  function createFontFamilyResolver_0() {
    return new FontFamilyResolverImpl(new SkiaFontLoader());
  }
  function PlatformFontFamilyTypefaceAdapter() {
  }
  protoOf(PlatformFontFamilyTypefaceAdapter).t4e = function (typefaceRequest, platformFontLoader, onAsyncCompletion, createDefaultTypeface) {
    var tmp = typefaceRequest.u4d_1;
    if (tmp instanceof FontListFontFamily)
      return null;
    var skiaFontLoader = platformFontLoader instanceof SkiaFontLoader ? platformFontLoader : THROW_CCE();
    var tmp0_elvis_lhs = typefaceRequest.u4d_1;
    var result = skiaFontLoader.v4n(tmp0_elvis_lhs == null ? Companion_getInstance_16().s49_1 : tmp0_elvis_lhs, typefaceRequest.v4d_1, typefaceRequest.w4d_1);
    return new Immutable(result);
  };
  function SkiaFontLoader(fontCache) {
    fontCache = fontCache === VOID ? new FontCache() : fontCache;
    this.t4n_1 = fontCache;
    this.u4n_1 = this.t4n_1;
  }
  protoOf(SkiaFontLoader).w4n = function () {
    return this.t4n_1.x4n_1;
  };
  protoOf(SkiaFontLoader).u4i = function (font) {
    if (!(font instanceof PlatformFont)) {
      if (!(font.i4d() === Companion_getInstance_19().k4d_1)) {
        throw IllegalArgumentException_init_$Create$('Unsupported font type: ' + font);
      }
      return null;
    }
    var tmp0_subject = font.i4d();
    var tmp;
    if (tmp0_subject === Companion_getInstance_19().j4d_1) {
      tmp = this.t4n_1.b4o(font);
    } else if (tmp0_subject === Companion_getInstance_19().k4d_1) {
      // Inline function 'kotlin.Result.getOrNull' call
      // Inline function 'kotlin.runCatching' call
      var tmp_0;
      try {
        // Inline function 'kotlin.Companion.success' call
        // Inline function 'androidx.compose.ui.text.font.SkiaFontLoader.loadBlocking.<anonymous>' call
        var value = this.t4n_1.b4o(font);
        tmp_0 = _Result___init__impl__xyqfz8(value);
      } catch ($p) {
        var tmp_1;
        if ($p instanceof Error) {
          var e = $p;
          // Inline function 'kotlin.Companion.failure' call
          tmp_1 = _Result___init__impl__xyqfz8(createFailure(e));
        } else {
          throw $p;
        }
        tmp_0 = tmp_1;
      }
      var this_0 = tmp_0;
      var tmp_2;
      if (_Result___get_isFailure__impl__jpiriv(this_0)) {
        tmp_2 = null;
      } else {
        var tmp_3 = _Result___get_value__impl__bjfvqg(this_0);
        tmp_2 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      }
      tmp = tmp_2;
    } else if (tmp0_subject === Companion_getInstance_19().l4d_1) {
      throw UnsupportedOperationException_init_$Create$('Unsupported Async font load path');
    } else {
      throw IllegalArgumentException_init_$Create$('Unknown loading type ' + new FontLoadingStrategy(font.i4d()));
    }
    return tmp;
  };
  protoOf(SkiaFontLoader).v4n = function (fontFamily, fontWeight, fontStyle) {
    return this.t4n_1.v4n(fontFamily, fontWeight, fontStyle);
  };
  protoOf(SkiaFontLoader).c4o = function (font, $completion) {
    return this.u4i(font);
  };
  protoOf(SkiaFontLoader).a4h = function (font, $completion) {
    return this.c4o(font, $completion);
  };
  protoOf(SkiaFontLoader).a4f = function () {
    return this.u4n_1;
  };
  function ParagraphLayouter(text, textDirection, style, spanStyles, placeholders, density, fontFamilyResolver) {
    this.z4m_1 = text;
    this.a4n_1 = new ParagraphBuilder_0(fontFamilyResolver, this.z4m_1, style, VOID, VOID, VOID, spanStyles, placeholders, density, textDirection);
    this.b4n_1 = null;
    var tmp = this;
    tmp.c4n_1 = NaN;
  }
  protoOf(ParagraphLayouter).e4n = function () {
    return this.a4n_1.e4n();
  };
  protoOf(ParagraphLayouter).f4n = function () {
    return this.a4n_1.f4o_1;
  };
  protoOf(ParagraphLayouter).d4n = function (paragraph) {
    return this.a4n_1.d4n(paragraph);
  };
  protoOf(ParagraphLayouter).h4n = function (maxLines, ellipsis) {
    if (!(this.a4n_1.i4o_1 === maxLines) ? true : !(this.a4n_1.h4o_1 === ellipsis)) {
      this.a4n_1.i4o_1 = maxLines;
      this.a4n_1.h4o_1 = ellipsis;
      this.b4n_1 = null;
    }
  };
  protoOf(ParagraphLayouter).j4n = function (color, shadow, textDecoration) {
    // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
    var tmp;
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    if (!equals(_Color___get_value__impl__1pls5m(color), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      tmp = color;
    } else {
      // Inline function 'androidx.compose.ui.text.platform.ParagraphLayouter.setTextStyle.<anonymous>' call
      tmp = this.a4n_1.f4o_1.g41();
    }
    var actualColor = tmp;
    if ((!equals(this.a4n_1.f4o_1.g41(), actualColor) ? true : !equals(this.a4n_1.f4o_1.a4c(), shadow)) ? true : !equals(this.a4n_1.f4o_1.z4b(), textDecoration)) {
      this.a4n_1.f4o_1 = this.a4n_1.f4o_1.l4b(actualColor, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, textDecoration, shadow);
      this.b4n_1 = null;
    }
  };
  protoOf(ParagraphLayouter).m4n = function (brush, brushSize, alpha, shadow, textDecoration) {
    var actualSize = this.a4n_1.g4o_1;
    var tmp;
    var tmp_0;
    var tmp_1;
    var tmp_2;
    var tmp_3;
    var tmp_4;
    if (!equals(this.a4n_1.f4o_1.j48(), brush)) {
      tmp_4 = true;
    } else {
      // Inline function 'androidx.compose.ui.geometry.isUnspecified' call
      tmp_4 = _Size___get_packedValue__impl__7rlt1o(actualSize).equals(_Size___get_packedValue__impl__7rlt1o(Companion_getInstance_4().x34_1));
    }
    if (tmp_4) {
      tmp_3 = true;
    } else {
      tmp_3 = !sameValueAs(_Size___get_width__impl__58y75t(actualSize), _Size___get_width__impl__58y75t(brushSize));
    }
    if (tmp_3) {
      tmp_2 = true;
    } else {
      tmp_2 = !sameValueAs(_Size___get_height__impl__a04p02(actualSize), _Size___get_height__impl__a04p02(brushSize));
    }
    if (tmp_2) {
      tmp_1 = true;
    } else {
      tmp_1 = !sameValueAs(this.a4n_1.f4o_1.p3n(), alpha);
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = !equals(this.a4n_1.f4o_1.a4c(), shadow);
    }
    if (tmp_0) {
      tmp = true;
    } else {
      tmp = !equals(this.a4n_1.f4o_1.z4b(), textDecoration);
    }
    if (tmp) {
      this.a4n_1.f4o_1 = this.a4n_1.f4o_1.n4b(brush, alpha, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, textDecoration, shadow);
      this.a4n_1.g4o_1 = brushSize;
      this.b4n_1 = null;
    }
  };
  protoOf(ParagraphLayouter).k4n = function (drawStyle) {
    if (!equals(this.a4n_1.n4o_1, drawStyle)) {
      this.a4n_1.n4o_1 = drawStyle;
      this.b4n_1 = null;
    }
  };
  protoOf(ParagraphLayouter).l4n = function (blendMode) {
    if (!(this.a4n_1.o4o_1 === blendMode)) {
      this.a4n_1.o4o_1 = blendMode;
      this.b4n_1 = null;
    }
  };
  protoOf(ParagraphLayouter).i4n = function (width) {
    var paragraph = this.b4n_1;
    var tmp;
    if (!(paragraph == null)) {
      if (!sameValueAs(this.c4n_1, width)) {
        this.c4n_1 = width;
        paragraph.a3k(width);
      }
      tmp = paragraph;
    } else {
      // Inline function 'kotlin.apply' call
      var this_0 = this.a4n_1.n1r();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.ParagraphLayouter.layoutParagraph.<anonymous>' call
      this.b4n_1 = this_0;
      this_0.a3k(width);
      tmp = this_0;
    }
    return tmp;
  };
  function sameValueAs(_this__u8e3s4, other) {
    // Inline function 'kotlin.math.abs' call
    var x = _this__u8e3s4 - other;
    return Math.abs(x) < 1.0E-5;
  }
  function get_GenericFontFamiliesMapping() {
    _init_properties_PlatformFont_skiko_kt__1fvojb();
    // Inline function 'kotlin.getValue' call
    var this_0 = GenericFontFamiliesMapping$delegate;
    GenericFontFamiliesMapping$factory();
    return this_0.s2();
  }
  var GenericFontFamiliesMapping$delegate;
  var Platform_Unknown_instance;
  var Platform_Linux_instance;
  var Platform_Windows_instance;
  var Platform_MacOS_instance;
  var Platform_IOS_instance;
  var Platform_TvOS_instance;
  var Platform_WatchOS_instance;
  var Platform_Android_instance;
  var Platform_entriesInitialized;
  function Platform_initEntries() {
    if (Platform_entriesInitialized)
      return Unit_instance;
    Platform_entriesInitialized = true;
    Platform_Unknown_instance = new Platform('Unknown', 0);
    Platform_Linux_instance = new Platform('Linux', 1);
    Platform_Windows_instance = new Platform('Windows', 2);
    Platform_MacOS_instance = new Platform('MacOS', 3);
    Platform_IOS_instance = new Platform('IOS', 4);
    Platform_TvOS_instance = new Platform('TvOS', 5);
    Platform_WatchOS_instance = new Platform('WatchOS', 6);
    Platform_Android_instance = new Platform('Android', 7);
  }
  function Platform(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function FontLoadResult(typeface, aliases) {
    this.t4o_1 = typeface;
    this.u4o_1 = aliases;
  }
  function FontLoader() {
    this.v4o_1 = new FontCache();
    this.w4o_1 = createFontFamilyResolver(this.v4o_1);
  }
  function ensureRegistered($this, typeface, key) {
    if (!$this.z4n_1.s(key)) {
      $this.y4n_1.t3m(typeface, key);
      $this.z4n_1.a1(key);
    }
  }
  function ensureRegistered_0($this, fontFamily) {
    var tmp;
    if (fontFamily instanceof FontListFontFamily) {
      // Inline function 'kotlin.collections.filterIsInstance' call
      // Inline function 'kotlin.collections.filterIsInstanceTo' call
      var this_0 = fontFamily.s4i_1;
      var destination = ArrayList_init_$Create$_0();
      var tmp0_iterator = this_0.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        if (element instanceof SystemFont) {
          destination.a1(element);
        }
      }
      var fonts = destination;
      var tmp_0;
      if (fonts.m() === fontFamily.s4i_1.m()) {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(fonts, 10));
        var tmp0_iterator_0 = fonts.o();
        while (tmp0_iterator_0.d1()) {
          var item = tmp0_iterator_0.f1();
          // Inline function 'androidx.compose.ui.text.platform.FontCache.ensureRegistered.<anonymous>' call
          var tmp$ret$2 = item.b4p_1;
          destination_0.a1(tmp$ret$2);
        }
        tmp_0 = destination_0;
      } else {
        throw IllegalArgumentException_init_$Create$("Don't load FontListFontFamily through ensureRegistered: " + fontFamily);
      }
      tmp = tmp_0;
    } else {
      if (fontFamily instanceof LoadedFontFamily) {
        var tmp_1 = fontFamily.y4o_1;
        var typeface = tmp_1 instanceof SkiaBackedTypeface ? tmp_1 : THROW_CCE();
        ensureRegistered($this, typeface.z4o_1, typeface.a4p_1);
        tmp = listOf_0(typeface.a4p_1);
      } else {
        if (fontFamily instanceof GenericFontFamily) {
          tmp = get_aliases(fontFamily);
        } else {
          if (fontFamily instanceof DefaultFontFamily) {
            tmp = get_aliases(Companion_getInstance_16().t49_1);
          } else {
            throw IllegalArgumentException_init_$Create$('Unknown font family type: ' + fontFamily);
          }
        }
      }
    }
    return tmp;
  }
  function FontCache$load$lambda($font) {
    return function (it) {
      return loadTypeface($font);
    };
  }
  function FontCache() {
    this.x4n_1 = FontCollection_init_$Create$();
    this.y4n_1 = new TypefaceFontProvider();
    this.z4n_1 = HashSet_init_$Create$();
    this.a4o_1 = new ExpireAfterAccessCache(new Long(-129542144, 13));
    this.x4n_1.t3i(Companion_getInstance_5().n3c_1);
    this.x4n_1.s3i(this.y4n_1);
  }
  protoOf(FontCache).b4o = function (font) {
    var tmp = font.a4f();
    var typeface = this.a4o_1.t4k(tmp, FontCache$load$lambda(font));
    ensureRegistered(this, typeface, font.a4f());
    return new FontLoadResult(typeface, listOf_0(font.a4f()));
  };
  protoOf(FontCache).v4n = function (fontFamily, fontWeight, fontStyle) {
    var aliases = ensureRegistered_0(this, fontFamily);
    var style = toSkFontStyle(fontStyle).u3c(fontWeight.w4i_1);
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(aliases);
    return new FontLoadResult(first_0(this.x4n_1.v3i(tmp$ret$0, style)), aliases);
  };
  function SystemFont() {
  }
  function SkiaBackedTypeface() {
  }
  function get_aliases(_this__u8e3s4) {
    _init_properties_PlatformFont_skiko_kt__1fvojb();
    var tmp0_elvis_lhs = get_GenericFontFamiliesMapping().z2(_this__u8e3s4.o4d_1);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Unknown generic font family ' + _this__u8e3s4.o4d_1;
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function LoadedFont() {
  }
  function GenericFontFamiliesMapping$delegate$lambda() {
    _init_properties_PlatformFont_skiko_kt__1fvojb();
    var tmp;
    switch (currentPlatform().t9_1) {
      case 1:
        tmp = mapOf([to(Companion_getInstance_16().t49_1.o4d_1, listOf(['Noto Sans', 'DejaVu Sans', 'Arial'])), to(Companion_getInstance_16().u49_1.o4d_1, listOf(['Noto Serif', 'DejaVu Serif', 'Times New Roman'])), to(Companion_getInstance_16().v49_1.o4d_1, listOf(['Noto Sans Mono', 'DejaVu Sans Mono', 'Consolas'])), to(Companion_getInstance_16().w49_1.o4d_1, listOf_0('Comic Sans MS'))]);
        break;
      case 2:
        tmp = mapOf([to(Companion_getInstance_16().t49_1.o4d_1, listOf(['Segoe UI', 'Arial'])), to(Companion_getInstance_16().u49_1.o4d_1, listOf_0('Times New Roman')), to(Companion_getInstance_16().v49_1.o4d_1, listOf_0('Consolas')), to(Companion_getInstance_16().w49_1.o4d_1, listOf_0('Comic Sans MS'))]);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
        tmp = mapOf([to(Companion_getInstance_16().t49_1.o4d_1, listOf(['.AppleSystemUIFont', 'Helvetica Neue', 'Helvetica'])), to(Companion_getInstance_16().u49_1.o4d_1, listOf(['.AppleSystemUIFontSerif', 'Times', 'Times New Roman'])), to(Companion_getInstance_16().v49_1.o4d_1, listOf(['.AppleSystemUIFontMonospaced', 'Menlo', 'Courier'])), to(Companion_getInstance_16().w49_1.o4d_1, listOf(['Apple Chancery', 'Snell Roundhand']))]);
        break;
      case 7:
        tmp = mapOf([to(Companion_getInstance_16().t49_1.o4d_1, listOf(['Roboto', 'Noto Sans'])), to(Companion_getInstance_16().u49_1.o4d_1, listOf(['Roboto Serif', 'Noto Serif'])), to(Companion_getInstance_16().v49_1.o4d_1, listOf(['Roboto Mono', 'Noto Sans Mono'])), to(Companion_getInstance_16().w49_1.o4d_1, listOf_0('Comic Sans MS'))]);
        break;
      case 0:
        tmp = mapOf([to(Companion_getInstance_16().t49_1.o4d_1, listOf_0('Arial')), to(Companion_getInstance_16().u49_1.o4d_1, listOf_0('Times New Roman')), to(Companion_getInstance_16().v49_1.o4d_1, listOf_0('Consolas')), to(Companion_getInstance_16().w49_1.o4d_1, listOf_0('Comic Sans MS'))]);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function Platform_Unknown_getInstance() {
    Platform_initEntries();
    return Platform_Unknown_instance;
  }
  function Platform_Linux_getInstance() {
    Platform_initEntries();
    return Platform_Linux_instance;
  }
  function Platform_Windows_getInstance() {
    Platform_initEntries();
    return Platform_Windows_instance;
  }
  function Platform_MacOS_getInstance() {
    Platform_initEntries();
    return Platform_MacOS_instance;
  }
  function Platform_IOS_getInstance() {
    Platform_initEntries();
    return Platform_IOS_instance;
  }
  function Platform_Android_getInstance() {
    Platform_initEntries();
    return Platform_Android_instance;
  }
  function GenericFontFamiliesMapping$factory() {
    return getPropertyCallableRef('GenericFontFamiliesMapping', 0, KProperty0, function () {
      return get_GenericFontFamiliesMapping();
    }, null);
  }
  var properties_initialized_PlatformFont_skiko_kt_pdb6wl;
  function _init_properties_PlatformFont_skiko_kt__1fvojb() {
    if (!properties_initialized_PlatformFont_skiko_kt_pdb6wl) {
      properties_initialized_PlatformFont_skiko_kt_pdb6wl = true;
      GenericFontFamiliesMapping$delegate = lazy_0(GenericFontFamiliesMapping$delegate$lambda);
    }
  }
  function drawMultiParagraph(_this__u8e3s4, canvas, brush, alpha, shadow, decoration, drawStyle, blendMode) {
    var tmp;
    if (alpha === VOID) {
      tmp = NaN;
    } else {
      tmp = alpha;
    }
    alpha = tmp;
    shadow = shadow === VOID ? null : shadow;
    decoration = decoration === VOID ? null : decoration;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    blendMode = blendMode === VOID ? Companion_getInstance_6().g3p_1 : blendMode;
    canvas.i3q();
    // Inline function 'androidx.compose.ui.util.fastForEach' call
    var this_0 = _this__u8e3s4.o44_1;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = this_0.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = this_0.n(index);
        // Inline function 'androidx.compose.ui.text.platform.drawMultiParagraph.<anonymous>' call
        item.p44_1.l45(canvas, brush, alpha, shadow, decoration, drawStyle, blendMode);
        canvas.l3q(0.0, item.p44_1.f34());
      }
       while (inductionVariable <= last);
    canvas.j3q();
  }
  function get_DefaultFontSize_0() {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return DefaultFontSize_0;
  }
  var DefaultFontSize_0;
  function get_skTextStylesCache() {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return skTextStylesCache;
  }
  var skTextStylesCache;
  function ComputedStyle_init_$Init$(density, spanStyle, brushSize, blendMode, lineHeight, $this) {
    brushSize = brushSize === VOID ? Companion_getInstance_4().x34_1 : brushSize;
    blendMode = blendMode === VOID ? Companion_getInstance_0().z3v_1 : blendMode;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.<init>.<anonymous>' call
    var tmp = density.a36(spanStyle.u47_1);
    var tmp_0;
    // Inline function 'androidx.compose.ui.unit.isSpecified' call
    var this_0 = spanStyle.a48_1;
    if (!get_isUnspecified(this_0)) {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.<init>.<anonymous>' call
      tmp_0 = density.a36(spanStyle.a48_1);
    } else {
      tmp_0 = null;
    }
    var tmp_1 = tmp_0;
    var tmp0_safe_receiver = spanStyle.h48_1;
    var tmp_2 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.q48_1;
    var tmp_3;
    // Inline function 'androidx.compose.ui.unit.isSpecified' call
    if (!get_isUnspecified(lineHeight)) {
      tmp_3 = toPx(lineHeight, density, spanStyle.u47_1);
    } else {
      tmp_3 = null;
    }
    ComputedStyle.call($this, spanStyle.t47_1, brushSize, tmp, spanStyle.v47_1, spanStyle.w47_1, spanStyle.x47_1, spanStyle.y47_1, spanStyle.z47_1, tmp_1, spanStyle.b48_1, spanStyle.c48_1, spanStyle.d48_1, spanStyle.e48_1, spanStyle.f48_1, tmp_2, spanStyle.g48_1, spanStyle.i48_1, blendMode, tmp_3);
    return $this;
  }
  function ComputedStyle_init_$Create$(density, spanStyle, brushSize, blendMode, lineHeight) {
    return ComputedStyle_init_$Init$(density, spanStyle, brushSize, blendMode, lineHeight, objectCreate(protoOf(ComputedStyle)));
  }
  function toTextPaint($this) {
    // Inline function 'kotlin.let' call
    var this_0 = Paint_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.toTextPaint.<anonymous>' call
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = asComposePaint(this_0);
      $this$with.f41($this.c4p_1.g41());
      applyBrush($this$with, $this.c4p_1.j48(), $this.d4p_1, $this.c4p_1.p3n());
      applyDrawStyle($this$with, $this.s4p_1);
      $this$with.k41($this.t4p_1);
      // Inline function 'kotlin.takeIf' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp;
      // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.toTextPaint.<anonymous>.<anonymous>.<anonymous>' call
      if ((!($this$with.e41() == null) ? true : !($this$with.c43() === Companion_getInstance_7().i3w_1)) ? true : !this_0.r3e()) {
        tmp = this_0;
      } else {
        tmp = null;
      }
      tmp$ret$2 = tmp;
      break $l$block;
    }
    return tmp$ret$2;
  }
  function ComputedStyle(textForegroundStyle, brushSize, fontSize, fontWeight, fontStyle, fontSynthesis, fontFamily, fontFeatureSettings, letterSpacing, baselineShift, textGeometricTransform, localeList, background, textDecoration, textDecorationLineStyle, shadow, drawStyle, blendMode, lineHeight) {
    background = background === VOID ? Companion_getInstance().w3s_1 : background;
    this.c4p_1 = textForegroundStyle;
    this.d4p_1 = brushSize;
    this.e4p_1 = fontSize;
    this.f4p_1 = fontWeight;
    this.g4p_1 = fontStyle;
    this.h4p_1 = fontSynthesis;
    this.i4p_1 = fontFamily;
    this.j4p_1 = fontFeatureSettings;
    this.k4p_1 = letterSpacing;
    this.l4p_1 = baselineShift;
    this.m4p_1 = textGeometricTransform;
    this.n4p_1 = localeList;
    this.o4p_1 = background;
    this.p4p_1 = textDecoration;
    this.q4p_1 = textDecorationLineStyle;
    this.r4p_1 = shadow;
    this.s4p_1 = drawStyle;
    this.t4p_1 = blendMode;
    this.u4p_1 = lineHeight;
  }
  protoOf(ComputedStyle).v4p = function (fontFamilyResolver) {
    var res = TextStyle_init_$Create$();
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    var this_0 = this.c4p_1.g41();
    if (!equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      res.g3e(toArgb(this.c4p_1.g41()));
    }
    var foreground = toTextPaint(this);
    if (!(foreground == null)) {
      res.t3l(foreground);
    }
    var tmp0_safe_receiver = this.g4p_1;
    var tmp = tmp0_safe_receiver;
    if ((tmp == null ? null : new FontStyle(tmp)) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp_0 = tmp0_safe_receiver;
      // Inline function 'kotlin.contracts.contract' call
      var it = (tmp_0 == null ? null : new FontStyle(tmp_0)).y4i_1;
      res.z3l(toSkFontStyle(it));
    }
    var tmp1_safe_receiver = this.p4p_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      res.x3l(toSkDecorationStyle(tmp1_safe_receiver, this.c4p_1.g41(), this.q4p_1));
    }
    if (!equals(this.o4p_1, Companion_getInstance().w3s_1)) {
      // Inline function 'kotlin.also' call
      var this_1 = Paint_init_$Create$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.toSkTextStyle.<anonymous>' call
      this_1.g3e(toArgb(this.o4p_1));
      res.v3l(this_1);
    }
    var tmp2_safe_receiver = this.f4p_1;
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      res.z3l(res.f3h().u3c(tmp2_safe_receiver.w4i_1));
    }
    var tmp3_safe_receiver = this.r4p_1;
    if (tmp3_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.toSkTextStyle.<anonymous>' call
      res.b3m(toSkShadow(tmp3_safe_receiver));
    }
    var tmp4_safe_receiver = this.k4p_1;
    if (tmp4_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      res.k3m(tmp4_safe_receiver);
    }
    var tmp_1 = Companion_getInstance_8();
    // Inline function 'kotlin.text.orEmpty' call
    var tmp0_elvis_lhs = this.j4p_1;
    var tmp$ret$8 = tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs;
    res.d3m(tmp_1.p3b(tmp$ret$8));
    res.e3m(this.e4p_1);
    var tmp5_safe_receiver = this.i4p_1;
    if (tmp5_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp0_elvis_lhs_0 = this.f4p_1;
      var tmp_2 = tmp0_elvis_lhs_0 == null ? Companion_getInstance_22().f49_1 : tmp0_elvis_lhs_0;
      var tmp1_elvis_lhs = this.g4p_1;
      var tmp_3;
      var tmp_4 = tmp1_elvis_lhs;
      if ((tmp_4 == null ? null : new FontStyle(tmp_4)) == null) {
        tmp_3 = Companion_getInstance_20().m49_1;
      } else {
        tmp_3 = tmp1_elvis_lhs;
      }
      var tmp_5 = tmp_3;
      var tmp2_elvis_lhs = this.h4p_1;
      var tmp_6;
      var tmp_7 = tmp2_elvis_lhs;
      if ((tmp_7 == null ? null : new FontSynthesis(tmp_7)) == null) {
        tmp_6 = Companion_getInstance_21().o49_1;
      } else {
        tmp_6 = tmp2_elvis_lhs;
      }
      var tmp_8 = fontFamilyResolver.v4e(tmp5_safe_receiver, tmp_2, tmp_5, tmp_6).s2();
      var resolved = tmp_8 instanceof FontLoadResult ? tmp_8 : THROW_CCE();
      // Inline function 'kotlin.collections.toTypedArray' call
      var this_2 = resolved.u4o_1;
      var tmp$ret$9 = copyToArray(this_2);
      res.g3m(tmp$ret$9);
      res.o3m(resolved.t4o_1);
    }
    var tmp6_safe_receiver = this.l4p_1;
    var tmp_9 = tmp6_safe_receiver;
    if ((tmp_9 == null ? null : new BaselineShift(tmp_9)) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp_10 = tmp6_safe_receiver;
      // Inline function 'kotlin.contracts.contract' call
      var it_0 = (tmp_10 == null ? null : new BaselineShift(tmp_10)).i4j_1;
      var fontMetrics = res.q3m();
      res.m3m(_BaselineShift___get_multiplier__impl__qhmjek(it_0) * fontMetrics.x3b_1);
    }
    var tmp7_safe_receiver = this.u4p_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      res.i3m(tmp7_safe_receiver / this.e4p_1);
    }
    return res;
  };
  protoOf(ComputedStyle).w4p = function (density, other) {
    var fontSize = toPx_0(other.u47_1, density, this.e4p_1);
    this.c4p_1 = this.c4p_1.p48(other.t47_1);
    var tmp0_safe_receiver = other.y47_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.i4p_1 = tmp0_safe_receiver;
    }
    this.e4p_1 = fontSize;
    var tmp1_safe_receiver = other.v47_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.f4p_1 = tmp1_safe_receiver;
    }
    var tmp2_safe_receiver = other.w47_1;
    var tmp = tmp2_safe_receiver;
    if ((tmp == null ? null : new FontStyle(tmp)) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp_0 = tmp2_safe_receiver;
      // Inline function 'kotlin.contracts.contract' call
      this.g4p_1 = (tmp_0 == null ? null : new FontStyle(tmp_0)).y4i_1;
    }
    var tmp3_safe_receiver = other.x47_1;
    var tmp_1 = tmp3_safe_receiver;
    if ((tmp_1 == null ? null : new FontSynthesis(tmp_1)) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp_2 = tmp3_safe_receiver;
      // Inline function 'kotlin.contracts.contract' call
      this.h4p_1 = (tmp_2 == null ? null : new FontSynthesis(tmp_2)).z4i_1;
    }
    var tmp4_safe_receiver = other.z47_1;
    if (tmp4_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.j4p_1 = tmp4_safe_receiver;
    }
    if (!get_isUnspecified(other.a48_1)) {
      this.k4p_1 = toPx_0(other.a48_1, density, fontSize);
    }
    var tmp5_safe_receiver = other.b48_1;
    var tmp_3 = tmp5_safe_receiver;
    if ((tmp_3 == null ? null : new BaselineShift(tmp_3)) == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      var tmp_4 = tmp5_safe_receiver;
      // Inline function 'kotlin.contracts.contract' call
      this.l4p_1 = (tmp_4 == null ? null : new BaselineShift(tmp_4)).i4j_1;
    }
    var tmp6_safe_receiver = other.c48_1;
    if (tmp6_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.m4p_1 = tmp6_safe_receiver;
    }
    var tmp7_safe_receiver = other.d48_1;
    if (tmp7_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.n4p_1 = tmp7_safe_receiver;
    }
    // Inline function 'androidx.compose.ui.graphics.isSpecified' call
    var this_0 = other.e48_1;
    if (!equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1))) {
      this.o4p_1 = other.e48_1;
    }
    var tmp8_safe_receiver = other.f48_1;
    if (tmp8_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.p4p_1 = tmp8_safe_receiver;
    }
    var tmp9_safe_receiver = other.g48_1;
    if (tmp9_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.r4p_1 = tmp9_safe_receiver;
    }
    var tmp10_safe_receiver = other.i48_1;
    if (tmp10_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      this.s4p_1 = tmp10_safe_receiver;
    }
    var tmp11_safe_receiver = other.h48_1;
    if (tmp11_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.ComputedStyle.merge.<anonymous>' call
      var tmp0_safe_receiver_0 = tmp11_safe_receiver.q48_1;
      var tmp_5;
      var tmp_6 = tmp0_safe_receiver_0;
      if ((tmp_6 == null ? null : new TextDecorationLineStyle(tmp_6)) == null) {
        tmp_5 = null;
      } else {
        // Inline function 'kotlin.let' call
        var tmp_7 = tmp0_safe_receiver_0;
        // Inline function 'kotlin.contracts.contract' call
        this.q4p_1 = (tmp_7 == null ? null : new TextDecorationLineStyle(tmp_7)).s4n_1;
        tmp_5 = Unit_instance;
      }
    }
  };
  protoOf(ComputedStyle).toString = function () {
    var tmp = this.c4p_1;
    var tmp_0 = this.d4p_1;
    var tmp_1 = this.e4p_1;
    var tmp_2 = this.f4p_1;
    var tmp_3 = this.g4p_1;
    var tmp_4 = tmp_3 == null ? null : new FontStyle(tmp_3);
    var tmp_5 = this.h4p_1;
    var tmp_6 = tmp_5 == null ? null : new FontSynthesis(tmp_5);
    var tmp_7 = this.i4p_1;
    var tmp_8 = this.j4p_1;
    var tmp_9 = this.k4p_1;
    var tmp_10 = this.l4p_1;
    var tmp_11 = tmp_10 == null ? null : new BaselineShift(tmp_10);
    var tmp_12 = this.m4p_1;
    var tmp_13 = this.n4p_1;
    var tmp_14 = this.o4p_1;
    var tmp_15 = this.p4p_1;
    var tmp_16 = this.q4p_1;
    return 'ComputedStyle(textForegroundStyle=' + tmp + ', brushSize=' + new Size_0(tmp_0) + ', fontSize=' + tmp_1 + ', fontWeight=' + tmp_2 + ', fontStyle=' + tmp_4 + ', fontSynthesis=' + tmp_6 + ', fontFamily=' + tmp_7 + ', fontFeatureSettings=' + tmp_8 + ', letterSpacing=' + tmp_9 + ', baselineShift=' + tmp_11 + ', textGeometricTransform=' + tmp_12 + ', localeList=' + tmp_13 + ', background=' + new Color(tmp_14) + ', textDecoration=' + tmp_15 + ', textDecorationLineStyle=' + (tmp_16 == null ? null : new TextDecorationLineStyle(tmp_16)) + ', shadow=' + this.r4p_1 + ', drawStyle=' + this.s4p_1 + ', blendMode=' + new BlendMode(this.t4p_1) + ', lineHeight=' + this.u4p_1 + ')';
  };
  protoOf(ComputedStyle).hashCode = function () {
    var result = hashCode(this.c4p_1);
    result = imul(result, 31) + Size__hashCode_impl_2h1qpd(this.d4p_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.e4p_1) | 0;
    result = imul(result, 31) + (this.f4p_1 == null ? 0 : this.f4p_1.hashCode()) | 0;
    var tmp = imul(result, 31);
    var tmp_0;
    var tmp_1 = this.g4p_1;
    if ((tmp_1 == null ? null : new FontStyle(tmp_1)) == null) {
      tmp_0 = 0;
    } else {
      tmp_0 = FontStyle__hashCode_impl_7qhg4w(this.g4p_1);
    }
    result = tmp + tmp_0 | 0;
    var tmp_2 = imul(result, 31);
    var tmp_3;
    var tmp_4 = this.h4p_1;
    if ((tmp_4 == null ? null : new FontSynthesis(tmp_4)) == null) {
      tmp_3 = 0;
    } else {
      tmp_3 = FontSynthesis__hashCode_impl_4wi11v(this.h4p_1);
    }
    result = tmp_2 + tmp_3 | 0;
    result = imul(result, 31) + (this.i4p_1 == null ? 0 : hashCode(this.i4p_1)) | 0;
    result = imul(result, 31) + (this.j4p_1 == null ? 0 : getStringHashCode(this.j4p_1)) | 0;
    result = imul(result, 31) + (this.k4p_1 == null ? 0 : getNumberHashCode(this.k4p_1)) | 0;
    var tmp_5 = imul(result, 31);
    var tmp_6;
    var tmp_7 = this.l4p_1;
    if ((tmp_7 == null ? null : new BaselineShift(tmp_7)) == null) {
      tmp_6 = 0;
    } else {
      tmp_6 = BaselineShift__hashCode_impl_g0potx(this.l4p_1);
    }
    result = tmp_5 + tmp_6 | 0;
    result = imul(result, 31) + (this.m4p_1 == null ? 0 : this.m4p_1.hashCode()) | 0;
    result = imul(result, 31) + (this.n4p_1 == null ? 0 : this.n4p_1.hashCode()) | 0;
    result = imul(result, 31) + Color__hashCode_impl_vjyivj(this.o4p_1) | 0;
    result = imul(result, 31) + (this.p4p_1 == null ? 0 : this.p4p_1.hashCode()) | 0;
    var tmp_8 = imul(result, 31);
    var tmp_9;
    var tmp_10 = this.q4p_1;
    if ((tmp_10 == null ? null : new TextDecorationLineStyle(tmp_10)) == null) {
      tmp_9 = 0;
    } else {
      tmp_9 = TextDecorationLineStyle__hashCode_impl_8ntype(this.q4p_1);
    }
    result = tmp_8 + tmp_9 | 0;
    result = imul(result, 31) + (this.r4p_1 == null ? 0 : this.r4p_1.hashCode()) | 0;
    result = imul(result, 31) + (this.s4p_1 == null ? 0 : hashCode(this.s4p_1)) | 0;
    result = imul(result, 31) + BlendMode__hashCode_impl_93ceri(this.t4p_1) | 0;
    result = imul(result, 31) + (this.u4p_1 == null ? 0 : getNumberHashCode(this.u4p_1)) | 0;
    return result;
  };
  protoOf(ComputedStyle).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ComputedStyle))
      return false;
    var tmp0_other_with_cast = other instanceof ComputedStyle ? other : THROW_CCE();
    if (!equals(this.c4p_1, tmp0_other_with_cast.c4p_1))
      return false;
    if (!equals(this.d4p_1, tmp0_other_with_cast.d4p_1))
      return false;
    if (!equals(this.e4p_1, tmp0_other_with_cast.e4p_1))
      return false;
    if (!equals(this.f4p_1, tmp0_other_with_cast.f4p_1))
      return false;
    var tmp = this.g4p_1;
    var tmp_0 = tmp == null ? null : new FontStyle(tmp);
    var tmp_1 = tmp0_other_with_cast.g4p_1;
    if (!equals(tmp_0, tmp_1 == null ? null : new FontStyle(tmp_1)))
      return false;
    var tmp_2 = this.h4p_1;
    var tmp_3 = tmp_2 == null ? null : new FontSynthesis(tmp_2);
    var tmp_4 = tmp0_other_with_cast.h4p_1;
    if (!equals(tmp_3, tmp_4 == null ? null : new FontSynthesis(tmp_4)))
      return false;
    if (!equals(this.i4p_1, tmp0_other_with_cast.i4p_1))
      return false;
    if (!(this.j4p_1 == tmp0_other_with_cast.j4p_1))
      return false;
    if (!equals(this.k4p_1, tmp0_other_with_cast.k4p_1))
      return false;
    var tmp_5 = this.l4p_1;
    var tmp_6 = tmp_5 == null ? null : new BaselineShift(tmp_5);
    var tmp_7 = tmp0_other_with_cast.l4p_1;
    if (!equals(tmp_6, tmp_7 == null ? null : new BaselineShift(tmp_7)))
      return false;
    if (!equals(this.m4p_1, tmp0_other_with_cast.m4p_1))
      return false;
    if (!equals(this.n4p_1, tmp0_other_with_cast.n4p_1))
      return false;
    if (!equals(this.o4p_1, tmp0_other_with_cast.o4p_1))
      return false;
    if (!equals(this.p4p_1, tmp0_other_with_cast.p4p_1))
      return false;
    var tmp_8 = this.q4p_1;
    var tmp_9 = tmp_8 == null ? null : new TextDecorationLineStyle(tmp_8);
    var tmp_10 = tmp0_other_with_cast.q4p_1;
    if (!equals(tmp_9, tmp_10 == null ? null : new TextDecorationLineStyle(tmp_10)))
      return false;
    if (!equals(this.r4p_1, tmp0_other_with_cast.r4p_1))
      return false;
    if (!equals(this.s4p_1, tmp0_other_with_cast.s4p_1))
      return false;
    if (!(this.t4p_1 === tmp0_other_with_cast.t4p_1))
      return false;
    if (!equals(this.u4p_1, tmp0_other_with_cast.u4p_1))
      return false;
    return true;
  };
  function toPx(_this__u8e3s4, density, fontSize) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.ui.text.platform.toPx.<anonymous>' call
    var tmp$ret$1 = density.a36(fontSize);
    return toPx_0(_this__u8e3s4, density, tmp$ret$1);
  }
  function toSkFontStyle(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return _this__u8e3s4 === Companion_getInstance_20().n49_1 ? Companion_getInstance_9().r3c_1 : Companion_getInstance_9().p3c_1;
  }
  function toSkDecorationStyle(_this__u8e3s4, color, textDecorationLineStyle) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var underline = _this__u8e3s4.b4k(Companion_getInstance_31().c4a_1);
    var overline = false;
    var lineThrough = _this__u8e3s4.b4k(Companion_getInstance_31().d4a_1);
    var gaps = false;
    var tmp;
    var tmp_0 = textDecorationLineStyle;
    if ((tmp_0 == null ? null : new TextDecorationLineStyle(tmp_0)) == null) {
      tmp = null;
    } else {
      tmp = toSkDecorationLineStyle(textDecorationLineStyle);
    }
    var tmp1_elvis_lhs = tmp;
    var lineStyle = tmp1_elvis_lhs == null ? DecorationLineStyle_SOLID_getInstance() : tmp1_elvis_lhs;
    var thicknessMultiplier = 1.0;
    return new DecorationStyle(underline, overline, lineThrough, gaps, toArgb(color), lineStyle, thicknessMultiplier);
  }
  function toSkShadow(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return new Shadow(toArgb(_this__u8e3s4.y3w_1), _Offset___get_x__impl__xvi35n(_this__u8e3s4.z3w_1), _Offset___get_y__impl__8bzhra(_this__u8e3s4.z3w_1), _this__u8e3s4.a3x_1);
  }
  function toPx_0(_this__u8e3s4, density, fontSize) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var tmp;
    if (get_isUnspecified(_this__u8e3s4)) {
      tmp = fontSize;
    } else if (_TextUnit___get_isEm__impl__esrmtl(_this__u8e3s4)) {
      tmp = fontSize * _TextUnit___get_value__impl__hpbx0k(_this__u8e3s4);
    } else if (_TextUnit___get_isSp__impl__8c3r6q(_this__u8e3s4)) {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.toPx.<anonymous>' call
      tmp = density.a36(_this__u8e3s4);
    } else {
      var message = 'Unexpected size in TextUnit.toPx';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function toSkDecorationLineStyle(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return _this__u8e3s4 === Companion_getInstance_39().n4n_1 ? DecorationLineStyle_SOLID_getInstance() : _this__u8e3s4 === Companion_getInstance_39().o4n_1 ? DecorationLineStyle_DOUBLE_getInstance() : _this__u8e3s4 === Companion_getInstance_39().p4n_1 ? DecorationLineStyle_DOTTED_getInstance() : _this__u8e3s4 === Companion_getInstance_39().q4n_1 ? DecorationLineStyle_DASHED_getInstance() : _this__u8e3s4 === Companion_getInstance_39().r4n_1 ? DecorationLineStyle_WAVY_getInstance() : DecorationLineStyle_SOLID_getInstance();
  }
  function ActualParagraph(paragraphIntrinsics, maxLines, ellipsis, constraints) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return new SkiaParagraph(paragraphIntrinsics instanceof SkiaParagraphIntrinsics ? paragraphIntrinsics : THROW_CCE(), maxLines, ellipsis, constraints);
  }
  function StyleAdd(position, style) {
    Op.call(this);
    this.x4p_1 = position;
    this.y4p_1 = style;
  }
  protoOf(StyleAdd).z4p = function () {
    return this.x4p_1;
  };
  protoOf(StyleAdd).toString = function () {
    return 'StyleAdd(position=' + this.x4p_1 + ', style=' + this.y4p_1 + ')';
  };
  protoOf(StyleAdd).hashCode = function () {
    var result = this.x4p_1;
    result = imul(result, 31) + this.y4p_1.hashCode() | 0;
    return result;
  };
  protoOf(StyleAdd).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof StyleAdd))
      return false;
    var tmp0_other_with_cast = other instanceof StyleAdd ? other : THROW_CCE();
    if (!(this.x4p_1 === tmp0_other_with_cast.x4p_1))
      return false;
    if (!this.y4p_1.equals(tmp0_other_with_cast.y4p_1))
      return false;
    return true;
  };
  function PutPlaceholder(cut, width, height) {
    Op.call(this);
    this.a4q_1 = cut;
    this.b4q_1 = width;
    this.c4q_1 = height;
    this.d4q_1 = position$factory(this.a4q_1);
  }
  protoOf(PutPlaceholder).z4p = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.d4q_1;
    position$factory_0();
    return this_0.get();
  };
  protoOf(PutPlaceholder).toString = function () {
    return 'PutPlaceholder(cut=' + this.a4q_1 + ', width=' + this.b4q_1 + ', height=' + this.c4q_1 + ')';
  };
  protoOf(PutPlaceholder).hashCode = function () {
    var result = this.a4q_1.hashCode();
    result = imul(result, 31) + getNumberHashCode(this.b4q_1) | 0;
    result = imul(result, 31) + getNumberHashCode(this.c4q_1) | 0;
    return result;
  };
  protoOf(PutPlaceholder).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PutPlaceholder))
      return false;
    var tmp0_other_with_cast = other instanceof PutPlaceholder ? other : THROW_CCE();
    if (!this.a4q_1.equals(tmp0_other_with_cast.a4q_1))
      return false;
    if (!equals(this.b4q_1, tmp0_other_with_cast.b4q_1))
      return false;
    if (!equals(this.c4q_1, tmp0_other_with_cast.c4q_1))
      return false;
    return true;
  };
  function EndPlaceholder(cut) {
    Op.call(this);
    this.e4q_1 = cut;
    this.f4q_1 = position$factory_1(this.e4q_1);
  }
  protoOf(EndPlaceholder).z4p = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.f4q_1;
    position$factory_2();
    return this_0.get();
  };
  protoOf(EndPlaceholder).toString = function () {
    return 'EndPlaceholder(cut=' + this.e4q_1 + ')';
  };
  protoOf(EndPlaceholder).hashCode = function () {
    return this.e4q_1.hashCode();
  };
  protoOf(EndPlaceholder).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof EndPlaceholder))
      return false;
    var tmp0_other_with_cast = other instanceof EndPlaceholder ? other : THROW_CCE();
    if (!this.e4q_1.equals(tmp0_other_with_cast.e4q_1))
      return false;
    return true;
  };
  function StyleAdd_0(position, style) {
    Cut.call(this);
    this.g4q_1 = position;
    this.h4q_1 = style;
  }
  protoOf(StyleAdd_0).z4p = function () {
    return this.g4q_1;
  };
  protoOf(StyleAdd_0).toString = function () {
    return 'StyleAdd(position=' + this.g4q_1 + ', style=' + this.h4q_1 + ')';
  };
  protoOf(StyleAdd_0).hashCode = function () {
    var result = this.g4q_1;
    result = imul(result, 31) + this.h4q_1.hashCode() | 0;
    return result;
  };
  protoOf(StyleAdd_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof StyleAdd_0))
      return false;
    var tmp0_other_with_cast = other instanceof StyleAdd_0 ? other : THROW_CCE();
    if (!(this.g4q_1 === tmp0_other_with_cast.g4q_1))
      return false;
    if (!this.h4q_1.equals(tmp0_other_with_cast.h4q_1))
      return false;
    return true;
  };
  function StyleRemove(position, style) {
    Cut.call(this);
    this.i4q_1 = position;
    this.j4q_1 = style;
  }
  protoOf(StyleRemove).z4p = function () {
    return this.i4q_1;
  };
  protoOf(StyleRemove).toString = function () {
    return 'StyleRemove(position=' + this.i4q_1 + ', style=' + this.j4q_1 + ')';
  };
  protoOf(StyleRemove).hashCode = function () {
    var result = this.i4q_1;
    result = imul(result, 31) + this.j4q_1.hashCode() | 0;
    return result;
  };
  protoOf(StyleRemove).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof StyleRemove))
      return false;
    var tmp0_other_with_cast = other instanceof StyleRemove ? other : THROW_CCE();
    if (!(this.i4q_1 === tmp0_other_with_cast.i4q_1))
      return false;
    if (!this.j4q_1.equals(tmp0_other_with_cast.j4q_1))
      return false;
    return true;
  };
  function PutPlaceholder_0(position, placeholder) {
    Cut.call(this);
    this.k4q_1 = position;
    this.l4q_1 = placeholder;
  }
  protoOf(PutPlaceholder_0).z4p = function () {
    return this.k4q_1;
  };
  protoOf(PutPlaceholder_0).toString = function () {
    return 'PutPlaceholder(position=' + this.k4q_1 + ', placeholder=' + this.l4q_1 + ')';
  };
  protoOf(PutPlaceholder_0).hashCode = function () {
    var result = this.k4q_1;
    result = imul(result, 31) + this.l4q_1.hashCode() | 0;
    return result;
  };
  protoOf(PutPlaceholder_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PutPlaceholder_0))
      return false;
    var tmp0_other_with_cast = other instanceof PutPlaceholder_0 ? other : THROW_CCE();
    if (!(this.k4q_1 === tmp0_other_with_cast.k4q_1))
      return false;
    if (!this.l4q_1.equals(tmp0_other_with_cast.l4q_1))
      return false;
    return true;
  };
  function EndPlaceholder_0(position) {
    Cut.call(this);
    this.m4q_1 = position;
  }
  protoOf(EndPlaceholder_0).z4p = function () {
    return this.m4q_1;
  };
  protoOf(EndPlaceholder_0).toString = function () {
    return 'EndPlaceholder(position=' + this.m4q_1 + ')';
  };
  protoOf(EndPlaceholder_0).hashCode = function () {
    return this.m4q_1;
  };
  protoOf(EndPlaceholder_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof EndPlaceholder_0))
      return false;
    var tmp0_other_with_cast = other instanceof EndPlaceholder_0 ? other : THROW_CCE();
    if (!(this.m4q_1 === tmp0_other_with_cast.m4q_1))
      return false;
    return true;
  };
  function _get_initialStyle__6to25e($this) {
    var tmp = $this.p4o_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('initialStyle');
    }
  }
  function _get_defaultStyle__bt02u3($this) {
    var tmp = $this.q4o_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('defaultStyle');
    }
  }
  function _get_ops__e6e97j($this) {
    var tmp = $this.r4o_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('ops');
    }
  }
  function Op() {
  }
  function Cut() {
  }
  function makeOps($this, spans, placeholders) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var cuts = ArrayList_init_$Create$_0();
    var tmp0_iterator = spans.o();
    while (tmp0_iterator.d1()) {
      var span = tmp0_iterator.f1();
      cuts.a1(new StyleAdd_0(span.j43_1, span.i43_1));
      cuts.a1(new StyleRemove(span.k43_1, span.i43_1));
    }
    var tmp1_iterator = placeholders.o();
    while (tmp1_iterator.d1()) {
      var placeholder = tmp1_iterator.f1();
      cuts.a1(new PutPlaceholder_0(placeholder.j43_1, placeholder.i43_1));
      cuts.a1(new EndPlaceholder_0(placeholder.k43_1));
    }
    var ops = mutableListOf([new StyleAdd(0, _get_defaultStyle__bt02u3($this))]);
    // Inline function 'kotlin.collections.sortBy' call
    if (cuts.m() > 1) {
      // Inline function 'kotlin.comparisons.compareBy' call
      var tmp = ParagraphBuilder$makeOps$lambda;
      var tmp$ret$1 = new sam$kotlin_Comparator$0_0(tmp);
      sortWith(cuts, tmp$ret$1);
    }
    var activeStyles = mutableListOf([_get_initialStyle__6to25e($this)]);
    var tmp2_iterator = cuts.o();
    while (tmp2_iterator.d1()) {
      var cut = tmp2_iterator.f1();
      if (cut instanceof StyleAdd_0) {
        activeStyles.a1(cut.h4q_1);
        var prev = previousStyleAddAtTheSamePosition($this, cut.z4p(), ops);
        if (prev == null) {
          var tmp_0 = cut.z4p();
          // Inline function 'kotlin.also' call
          var this_0 = mergeStyles($this, activeStyles);
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'androidx.compose.ui.text.platform.ParagraphBuilder.makeOps.<anonymous>' call
          this_0.w4p($this.l4o_1, cut.h4q_1);
          ops.a1(new StyleAdd(tmp_0, this_0));
        } else {
          prev.y4p_1.w4p($this.l4o_1, cut.h4q_1);
        }
      } else {
        if (cut instanceof StyleRemove) {
          activeStyles.b1(cut.j4q_1);
          ops.a1(new StyleAdd(cut.z4p(), mergeStyles($this, activeStyles)));
        } else {
          if (cut instanceof PutPlaceholder_0) {
            var currentStyle = mergeStyles($this, activeStyles);
            var op = new PutPlaceholder(cut, toPx_0(cut.l4q_1.h47_1, $this.l4o_1, currentStyle.e4p_1), toPx_0(cut.l4q_1.i47_1, $this.l4o_1, currentStyle.e4p_1));
            ops.a1(op);
          } else {
            if (cut instanceof EndPlaceholder_0) {
              ops.a1(new EndPlaceholder(cut));
            }
          }
        }
      }
    }
    return ops;
  }
  function mergeStyles($this, activeStyles) {
    var style = ComputedStyle_init_$Create$($this.l4o_1, activeStyles.n(0), $this.g4o_1, $this.o4o_1, $this.f4o_1.e4c());
    var inductionVariable = 1;
    var last = activeStyles.m();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        style.w4p($this.l4o_1, activeStyles.n(i));
      }
       while (inductionVariable < last);
    return style;
  }
  function previousStyleAddAtTheSamePosition($this, position, ops) {
    var tmp0_iterator = asReversed(ops).o();
    while (tmp0_iterator.d1()) {
      var prevOp = tmp0_iterator.f1();
      if (prevOp.z4p() < position)
        return null;
      if (prevOp instanceof StyleAdd)
        return prevOp;
    }
    return null;
  }
  function makeSkFontRasterizationSettings($this, style) {
    var tmp0_safe_receiver = style.i46_1.w43_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.c47_1;
    var rasterizationSettings = tmp1_elvis_lhs == null ? Companion_getInstance_38().a4m() : tmp1_elvis_lhs;
    return toSkFontRastrSettings(rasterizationSettings);
  }
  function textStyleToParagraphStyle($this, style, computedStyle) {
    var pStyle = new ParagraphStyle();
    pStyle.e3l(makeSkFontRasterizationSettings($this, style));
    pStyle.y3k(makeSkTextStyle($this, computedStyle));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    var it = style.c4c();
    pStyle.a3l(toSkAlignment(it));
    var lineHeight = computedStyle.u4p_1;
    if (!(lineHeight == null) ? lineHeight > computedStyle.e4p_1 : false) {
      var tmp0_elvis_lhs = style.g4c();
      var lineHeightStyle = tmp0_elvis_lhs == null ? Companion_getInstance_29().w4j_1 : tmp0_elvis_lhs;
      pStyle.d3l(toHeightMode(lineHeightStyle.y4j_1));
    } else {
      pStyle.d3l(HeightMode_DISABLE_ALL_getInstance());
    }
    pStyle.z3k(toSkDirection($this.m4o_1));
    var tmp1_safe_receiver = $this.f4o_1.f4c();
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      var $this$with = $this.l4o_1;
      pStyle.f3l(new TextIndent($this$with.a36(tmp1_safe_receiver.j4k_1), $this$with.a36(tmp1_safe_receiver.k4k_1)));
    }
    return pStyle;
  }
  function makeSkTextStyle($this, style) {
    var tmp = get_skTextStylesCache();
    return tmp.s4k(style, ParagraphBuilder$makeSkTextStyle$lambda($this));
  }
  function sam$kotlin_Comparator$0_0(function_0) {
    this.n4q_1 = function_0;
  }
  protoOf(sam$kotlin_Comparator$0_0).j9 = function (a, b) {
    return this.n4q_1(a, b);
  };
  protoOf(sam$kotlin_Comparator$0_0).compare = function (a, b) {
    return this.j9(a, b);
  };
  function ParagraphBuilder$makeOps$lambda(a, b) {
    // Inline function 'kotlin.comparisons.compareValuesBy' call
    // Inline function 'androidx.compose.ui.text.platform.ParagraphBuilder.makeOps.<anonymous>' call
    var tmp = a.z4p();
    // Inline function 'androidx.compose.ui.text.platform.ParagraphBuilder.makeOps.<anonymous>' call
    var tmp$ret$1 = b.z4p();
    return compareValues(tmp, tmp$ret$1);
  }
  function ParagraphBuilder$makeSkTextStyle$lambda(this$0) {
    return function (it) {
      return it.v4p(this$0.d4o_1);
    };
  }
  function ParagraphBuilder$defaultFont$delegate$lambda(this$0) {
    return function () {
      var loadResult = resolveFontFamily(this$0.f4o_1, this$0.d4o_1);
      return Font_init_$Create$(loadResult == null ? null : loadResult.t4o_1, _get_defaultStyle__bt02u3(this$0).e4p_1);
    };
  }
  function ParagraphBuilder_0(fontFamilyResolver, text, textStyle, brushSize, ellipsis, maxLines, spanStyles, placeholders, density, textDirection, drawStyle, blendMode) {
    brushSize = brushSize === VOID ? Companion_getInstance_4().x34_1 : brushSize;
    ellipsis = ellipsis === VOID ? '' : ellipsis;
    maxLines = maxLines === VOID ? IntCompanionObject_instance.MAX_VALUE : maxLines;
    drawStyle = drawStyle === VOID ? null : drawStyle;
    blendMode = blendMode === VOID ? Companion_getInstance_0().z3v_1 : blendMode;
    this.d4o_1 = fontFamilyResolver;
    this.e4o_1 = text;
    this.f4o_1 = textStyle;
    this.g4o_1 = brushSize;
    this.h4o_1 = ellipsis;
    this.i4o_1 = maxLines;
    this.j4o_1 = spanStyles;
    this.k4o_1 = placeholders;
    this.l4o_1 = density;
    this.m4o_1 = textDirection;
    this.n4o_1 = drawStyle;
    this.o4o_1 = blendMode;
    var tmp = this;
    tmp.s4o_1 = lazy_0(ParagraphBuilder$defaultFont$delegate$lambda(this));
  }
  protoOf(ParagraphBuilder_0).n1r = function () {
    this.p4o_1 = copyWithDefaultFontSize(this.f4o_1.g4b(), this.n4o_1);
    this.q4o_1 = ComputedStyle_init_$Create$(this.l4o_1, _get_initialStyle__6to25e(this), this.g4o_1, this.o4o_1, this.f4o_1.e4c());
    this.r4o_1 = makeOps(this, this.j4o_1, this.k4o_1);
    var pos = 0;
    var ps = textStyleToParagraphStyle(this, this.f4o_1, _get_defaultStyle__bt02u3(this));
    if (!(this.i4o_1 === IntCompanionObject_instance.MAX_VALUE)) {
      ps.b3l(this.i4o_1);
      ps.c3l(this.h4o_1);
    }
    var tmp = this.d4o_1;
    var platformFontLoader = (tmp instanceof FontFamilyResolverImpl ? tmp : THROW_CCE()).l4e_1;
    var tmp_0;
    if (platformFontLoader instanceof SkiaFontLoader) {
      tmp_0 = platformFontLoader.w4n();
    } else {
      throw IllegalStateException_init_$Create$('Unsupported font loader ' + platformFontLoader);
    }
    var fontCollection = tmp_0;
    var pb = new ParagraphBuilder(ps, fontCollection);
    var addText = true;
    var tmp1_iterator = _get_ops__e6e97j(this).o();
    while (tmp1_iterator.d1()) {
      var op = tmp1_iterator.f1();
      if (addText ? pos < op.z4p() : false) {
        pb.m3k(toString(charSequenceSubSequence(this.e4o_1, pos, op.z4p())));
      }
      if (op instanceof StyleAdd) {
        var tmp_1 = op.y4p_1.i4p_1;
        var tmp3_elvis_lhs = op.y4p_1.f4p_1;
        var tmp_2 = tmp3_elvis_lhs == null ? Companion_getInstance_22().f49_1 : tmp3_elvis_lhs;
        var tmp4_elvis_lhs = op.y4p_1.g4p_1;
        var tmp_3;
        var tmp_4 = tmp4_elvis_lhs;
        if ((tmp_4 == null ? null : new FontStyle(tmp_4)) == null) {
          tmp_3 = Companion_getInstance_20().m49_1;
        } else {
          tmp_3 = tmp4_elvis_lhs;
        }
        var tmp_5 = tmp_3;
        var tmp5_elvis_lhs = op.y4p_1.h4p_1;
        var tmp_6;
        var tmp_7 = tmp5_elvis_lhs;
        if ((tmp_7 == null ? null : new FontSynthesis(tmp_7)) == null) {
          tmp_6 = Companion_getInstance_21().p49_1;
        } else {
          tmp_6 = tmp5_elvis_lhs;
        }
        this.d4o_1.v4e(tmp_1, tmp_2, tmp_5, tmp_6);
        pb.l3k(makeSkTextStyle(this, op.y4p_1));
      } else {
        if (op instanceof PutPlaceholder) {
          var placeholderStyle = new PlaceholderStyle(op.b4q_1, op.c4q_1, toSkPlaceholderAlignment(op.a4q_1.l4q_1.j47_1), BaselineMode_ALPHABETIC_getInstance(), 0.0);
          pb.n3k(placeholderStyle);
          addText = false;
        } else {
          if (op instanceof EndPlaceholder) {
            addText = true;
          }
        }
      }
      pos = op.z4p();
    }
    if (addText ? pos < this.e4o_1.length : false) {
      pb.m3k(toString(charSequenceSubSequence(this.e4o_1, pos, this.e4o_1.length)));
    }
    return pb.n1r();
  };
  protoOf(ParagraphBuilder_0).e4n = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.s4o_1;
    defaultFont$factory();
    return this_0.s2();
  };
  protoOf(ParagraphBuilder_0).d4n = function (paragraph) {
    var metrics = this.e4n().d3b();
    var tmp0_safe_receiver = _get_defaultStyle__bt02u3(this).u4p_1;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.ParagraphBuilder.emptyLineMetrics.<anonymous>' call
      tmp = tmp0_safe_receiver / _get_defaultStyle__bt02u3(this).e4p_1;
    }
    var tmp1_elvis_lhs = tmp;
    var heightMultiplier = tmp1_elvis_lhs == null ? 1.0 : tmp1_elvis_lhs;
    var ascent = metrics.x3b_1 * heightMultiplier;
    var descent = metrics.y3b_1 * heightMultiplier;
    var baseline = paragraph.y3j();
    var height = descent - ascent;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [new LineMetrics(0, 0, 0, 0, true, -ascent, descent, ascent, height, 0.0, 0.0, baseline, 0)];
  };
  function copyWithDefaultFontSize(_this__u8e3s4, drawStyle) {
    drawStyle = drawStyle === VOID ? null : drawStyle;
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var fontSize = orDefaultFontSize(_this__u8e3s4.u47_1);
    var tmp;
    if (_TextUnit___get_isEm__impl__esrmtl(_this__u8e3s4.a48_1)) {
      // Inline function 'androidx.compose.ui.unit.TextUnit.times' call
      var other = _TextUnit___get_value__impl__hpbx0k(_this__u8e3s4.a48_1);
      checkArithmetic(fontSize);
      tmp = pack(_TextUnit___get_rawType__impl__tu8yq5(fontSize), _TextUnit___get_value__impl__hpbx0k(fontSize) * other);
    } else {
      tmp = _this__u8e3s4.a48_1;
    }
    var letterSpacing = tmp;
    return _this__u8e3s4.m48(VOID, fontSize, VOID, VOID, VOID, VOID, VOID, letterSpacing, VOID, VOID, VOID, VOID, VOID, VOID, VOID, drawStyle);
  }
  function toSkPlaceholderAlignment(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var tmp;
    if (_this__u8e3s4 === Companion_getInstance_12().k47_1) {
      tmp = PlaceholderAlignment_ABOVE_BASELINE_getInstance();
    } else if (_this__u8e3s4 === Companion_getInstance_12().o47_1) {
      tmp = PlaceholderAlignment_TOP_getInstance();
    } else if (_this__u8e3s4 === Companion_getInstance_12().p47_1) {
      tmp = PlaceholderAlignment_BOTTOM_getInstance();
    } else if (_this__u8e3s4 === Companion_getInstance_12().q47_1) {
      tmp = PlaceholderAlignment_MIDDLE_getInstance();
    } else if (_this__u8e3s4 === Companion_getInstance_12().l47_1) {
      tmp = PlaceholderAlignment_TOP_getInstance();
    } else if (_this__u8e3s4 === Companion_getInstance_12().m47_1) {
      tmp = PlaceholderAlignment_BOTTOM_getInstance();
    } else if (_this__u8e3s4 === Companion_getInstance_12().n47_1) {
      tmp = PlaceholderAlignment_MIDDLE_getInstance();
    } else {
      var message = 'Invalid PlaceholderVerticalAlign.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function toSkAlignment(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return _this__u8e3s4 === Companion_getInstance_30().n46_1 ? Alignment_LEFT_getInstance() : _this__u8e3s4 === Companion_getInstance_30().o46_1 ? Alignment_RIGHT_getInstance() : _this__u8e3s4 === Companion_getInstance_30().p46_1 ? Alignment_CENTER_getInstance() : _this__u8e3s4 === Companion_getInstance_30().q46_1 ? Alignment_JUSTIFY_getInstance() : _this__u8e3s4 === Companion_getInstance_30().r46_1 ? Alignment_START_getInstance() : _this__u8e3s4 === Companion_getInstance_30().s46_1 ? Alignment_END_getInstance() : Alignment_START_getInstance();
  }
  function toHeightMode(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return _this__u8e3s4 === Companion_getInstance_27().o4j_1 ? HeightMode_DISABLE_ALL_getInstance() : _this__u8e3s4 === Companion_getInstance_27().m4j_1 ? HeightMode_DISABLE_FIRST_ASCENT_getInstance() : _this__u8e3s4 === Companion_getInstance_27().n4j_1 ? HeightMode_DISABLE_LAST_DESCENT_getInstance() : _this__u8e3s4 === Companion_getInstance_27().p4j_1 ? HeightMode_ALL_getInstance() : HeightMode_DISABLE_ALL_getInstance();
  }
  function toSkDirection(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var tmp;
    switch (_this__u8e3s4.t9_1) {
      case 0:
        tmp = Direction_LTR_getInstance();
        break;
      case 1:
        tmp = Direction_RTL_getInstance();
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function resolveFontFamily(_this__u8e3s4, fontFamilyResolver) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var tmp0_safe_receiver = _this__u8e3s4.s4b();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.ui.text.platform.resolveFontFamily.<anonymous>' call
      var tmp0_elvis_lhs = _this__u8e3s4.p4b();
      var tmp_0 = tmp0_elvis_lhs == null ? Companion_getInstance_22().f49_1 : tmp0_elvis_lhs;
      var tmp1_elvis_lhs = _this__u8e3s4.q4b();
      var tmp_1;
      var tmp_2 = tmp1_elvis_lhs;
      if ((tmp_2 == null ? null : new FontStyle(tmp_2)) == null) {
        tmp_1 = Companion_getInstance_20().m49_1;
      } else {
        tmp_1 = tmp1_elvis_lhs;
      }
      var tmp_3 = tmp_1;
      var tmp2_elvis_lhs = _this__u8e3s4.r4b();
      var tmp_4;
      var tmp_5 = tmp2_elvis_lhs;
      if ((tmp_5 == null ? null : new FontSynthesis(tmp_5)) == null) {
        tmp_4 = Companion_getInstance_21().p49_1;
      } else {
        tmp_4 = tmp2_elvis_lhs;
      }
      var tmp_6 = fontFamilyResolver.v4e(tmp0_safe_receiver, tmp_0, tmp_3, tmp_4).s2();
      tmp = tmp_6 instanceof FontLoadResult ? tmp_6 : THROW_CCE();
    }
    return tmp;
  }
  function orDefaultFontSize(_this__u8e3s4) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    var tmp;
    if (get_isUnspecified(_this__u8e3s4)) {
      tmp = get_DefaultFontSize_0();
    } else if (_TextUnit___get_isEm__impl__esrmtl(_this__u8e3s4)) {
      // Inline function 'androidx.compose.ui.unit.TextUnit.times' call
      var this_0 = get_DefaultFontSize_0();
      var other = _TextUnit___get_value__impl__hpbx0k(_this__u8e3s4);
      checkArithmetic(this_0);
      tmp = pack(_TextUnit___get_rawType__impl__tu8yq5(this_0), _TextUnit___get_value__impl__hpbx0k(this_0) * other);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function ActualParagraph_0(text, style, spanStyles, placeholders, maxLines, ellipsis, constraints, density, fontFamilyResolver) {
    _init_properties_SkiaParagraph_skiko_kt__cbqn0t();
    return new SkiaParagraph(new SkiaParagraphIntrinsics(text, style, spanStyles, placeholders, density, fontFamilyResolver), maxLines, ellipsis, constraints);
  }
  function position$factory($b0) {
    return getPropertyCallableRef('position', 0, KProperty0, function () {
      return $b0.k4q_1;
    }, null);
  }
  function position$factory_0() {
    return getPropertyCallableRef('position', 1, KProperty1, function (receiver) {
      return receiver.z4p();
    }, null);
  }
  function position$factory_1($b0) {
    return getPropertyCallableRef('position', 0, KProperty0, function () {
      return $b0.m4q_1;
    }, null);
  }
  function position$factory_2() {
    return getPropertyCallableRef('position', 1, KProperty1, function (receiver) {
      return receiver.z4p();
    }, null);
  }
  function defaultFont$factory() {
    return getPropertyCallableRef('defaultFont', 1, KProperty1, function (receiver) {
      return receiver.e4n();
    }, null);
  }
  var properties_initialized_SkiaParagraph_skiko_kt_jww0jv;
  function _init_properties_SkiaParagraph_skiko_kt__cbqn0t() {
    if (!properties_initialized_SkiaParagraph_skiko_kt_jww0jv) {
      properties_initialized_SkiaParagraph_skiko_kt_jww0jv = true;
      DefaultFontSize_0 = get_sp(16);
      skTextStylesCache = new NoCache();
    }
  }
  function ActualParagraphIntrinsics(text, style, spanStyles, placeholders, density, fontFamilyResolver) {
    return new SkiaParagraphIntrinsics(text, style, spanStyles, placeholders, density, fontFamilyResolver);
  }
  function newLayouter($this) {
    return new ParagraphLayouter($this.p4m_1, $this.v4m_1, $this.q4m_1, $this.r4m_1, $this.s4m_1, $this.t4m_1, $this.u4m_1);
  }
  function SkiaParagraphIntrinsics(text, style, spanStyles, placeholders, density, fontFamilyResolver) {
    this.p4m_1 = text;
    this.q4m_1 = style;
    this.r4m_1 = spanStyles;
    this.s4m_1 = placeholders;
    this.t4m_1 = density;
    this.u4m_1 = fontFamilyResolver;
    this.v4m_1 = resolveTextDirection_1(this.p4m_1, this.q4m_1.d4c(), this.q4m_1.x4b());
    this.w4m_1 = newLayouter(this);
    this.x4m_1 = 0.0;
    this.y4m_1 = 0.0;
    var tmp = ensureNotNull(this.w4m_1);
    var para = tmp.i4n(Infinity);
    var tmp_0 = this;
    // Inline function 'kotlin.math.ceil' call
    var x = para.w3j();
    tmp_0.x4m_1 = Math.ceil(x);
    var tmp_1 = this;
    // Inline function 'kotlin.math.ceil' call
    var x_0 = para.x3j();
    tmp_1.y4m_1 = Math.ceil(x_0);
  }
  protoOf(SkiaParagraphIntrinsics).g4n = function () {
    var tmp0_elvis_lhs = this.w4m_1;
    var layouter = tmp0_elvis_lhs == null ? newLayouter(this) : tmp0_elvis_lhs;
    this.w4m_1 = null;
    return layouter;
  };
  protoOf(SkiaParagraphIntrinsics).w3j = function () {
    return this.x4m_1;
  };
  protoOf(SkiaParagraphIntrinsics).x3j = function () {
    return this.y4m_1;
  };
  function resolveTextDirection_1(text, textDirection, localeList) {
    textDirection = textDirection === VOID ? null : textDirection;
    localeList = localeList === VOID ? null : localeList;
    var tmp;
    var tmp_0 = textDirection;
    if ((tmp_0 == null ? null : new TextDirection(tmp_0)) == null) {
      tmp = Companion_getInstance_32().d46_1;
    } else {
      tmp = textDirection;
    }
    var tmp1_subject = tmp;
    var tmp_1;
    if (tmp1_subject === Companion_getInstance_32().b46_1) {
      tmp_1 = ResolvedTextDirection_Ltr_getInstance();
    } else if (tmp1_subject === Companion_getInstance_32().c46_1) {
      tmp_1 = ResolvedTextDirection_Rtl_getInstance();
    } else if (tmp1_subject === Companion_getInstance_32().d46_1 ? true : tmp1_subject === Companion_getInstance_32().g46_1) {
      tmp_1 = contentBasedTextDirection(text, resolveTextDirection$lambda(localeList));
    } else if (tmp1_subject === Companion_getInstance_32().e46_1) {
      tmp_1 = contentBasedTextDirection(text, resolveTextDirection$lambda_0);
    } else if (tmp1_subject === Companion_getInstance_32().f46_1) {
      tmp_1 = contentBasedTextDirection(text, resolveTextDirection$lambda_1);
    } else {
      var message = 'Invalid TextDirection.';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp_1;
  }
  function contentBasedTextDirection(text, fallback) {
    var tmp0_subject = firstStrongDirectionType(text);
    return tmp0_subject === Companion_getInstance_37().q4k_1 ? ResolvedTextDirection_Ltr_getInstance() : tmp0_subject === Companion_getInstance_37().r4k_1 ? ResolvedTextDirection_Rtl_getInstance() : fallback();
  }
  function localeBasedTextDirection(locale) {
    var tmp;
    if (isRtl((locale == null ? Companion_instance_12.f1k() : locale).e4j_1)) {
      tmp = ResolvedTextDirection_Rtl_getInstance();
    } else {
      tmp = ResolvedTextDirection_Ltr_getInstance();
    }
    return tmp;
  }
  function resolveTextDirection$lambda($localeList) {
    return function () {
      var tmp0_safe_receiver = $localeList;
      return localeBasedTextDirection(tmp0_safe_receiver == null ? null : firstOrNull_0(tmp0_safe_receiver));
    };
  }
  function resolveTextDirection$lambda_0() {
    return ResolvedTextDirection_Ltr_getInstance();
  }
  function resolveTextDirection$lambda_1() {
    return ResolvedTextDirection_Rtl_getInstance();
  }
  function applyBrush(_this__u8e3s4, brush, size, alpha) {
    var tmp;
    if (alpha === VOID) {
      tmp = NaN;
    } else {
      tmp = alpha;
    }
    alpha = tmp;
    var tmp_0;
    var tmp_1;
    if (brush instanceof SolidColor) {
      // Inline function 'androidx.compose.ui.graphics.isSpecified' call
      var this_0 = brush.d4k_1;
      tmp_1 = !equals(_Color___get_value__impl__1pls5m(this_0), _Color___get_value__impl__1pls5m(Companion_getInstance().w3s_1));
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      var tmp_2;
      if (brush instanceof ShaderBrush) {
        // Inline function 'androidx.compose.ui.geometry.isSpecified' call
        tmp_2 = !_Size___get_packedValue__impl__7rlt1o(size).equals(_Size___get_packedValue__impl__7rlt1o(Companion_getInstance_4().x34_1));
      } else {
        tmp_2 = false;
      }
      tmp_0 = tmp_2;
    }
    if (tmp_0) {
      brush.h3q(size, _this__u8e3s4, isNaN_0(alpha) ? 1.0 : coerceIn_0(alpha, 0.0, 1.0));
    } else {
      if (brush == null) {
        _this__u8e3s4.n3e(null);
      }
    }
  }
  function applyDrawStyle(_this__u8e3s4, drawStyle) {
    if (equals(drawStyle, Fill_getInstance()) ? true : drawStyle == null) {
      _this__u8e3s4.q40(Companion_getInstance_7().i3w_1);
    } else {
      if (drawStyle instanceof Stroke) {
        _this__u8e3s4.q40(Companion_getInstance_7().j3w_1);
        _this__u8e3s4.i3e(drawStyle.r40_1);
        _this__u8e3s4.y40(drawStyle.s40_1);
        _this__u8e3s4.a41(drawStyle.u40_1);
        _this__u8e3s4.w40(drawStyle.t40_1);
        _this__u8e3s4.c41(drawStyle.v40_1);
      }
    }
  }
  function _LineBreak___init__impl__o5i11q(mask) {
    return mask;
  }
  function Companion_27() {
    Companion_instance_29 = this;
    this.u46_1 = _LineBreak___init__impl__o5i11q(1);
    this.v46_1 = _LineBreak___init__impl__o5i11q(2);
    this.w46_1 = _LineBreak___init__impl__o5i11q(3);
    this.x46_1 = _LineBreak___init__impl__o5i11q(4);
  }
  var Companion_instance_29;
  function Companion_getInstance_40() {
    if (Companion_instance_29 == null)
      new Companion_27();
    return Companion_instance_29;
  }
  function LineBreak__toString_impl_mphhli($this) {
    return 'LineBreak(mask=' + $this + ')';
  }
  function LineBreak__hashCode_impl_ybksn($this) {
    return $this;
  }
  function LineBreak__equals_impl_1r98t9($this, other) {
    if (!(other instanceof LineBreak))
      return false;
    if (!($this === (other instanceof LineBreak ? other.o4q_1 : THROW_CCE())))
      return false;
    return true;
  }
  function LineBreak(mask) {
    Companion_getInstance_40();
    this.o4q_1 = mask;
  }
  protoOf(LineBreak).toString = function () {
    return LineBreak__toString_impl_mphhli(this.o4q_1);
  };
  protoOf(LineBreak).hashCode = function () {
    return LineBreak__hashCode_impl_ybksn(this.o4q_1);
  };
  protoOf(LineBreak).equals = function (other) {
    return LineBreak__equals_impl_1r98t9(this.o4q_1, other);
  };
  function Companion_28() {
    Companion_instance_30 = this;
    this.f47_1 = new TextMotion();
    this.g47_1 = new TextMotion();
  }
  var Companion_instance_30;
  function Companion_getInstance_41() {
    if (Companion_instance_30 == null)
      new Companion_28();
    return Companion_instance_30;
  }
  function TextMotion() {
    Companion_getInstance_41();
  }
  function get_rtlLanguagesSet() {
    _init_properties_JsPlatformLocale_web_kt__p8iahw();
    return rtlLanguagesSet;
  }
  var rtlLanguagesSet;
  function createPlatformLocaleDelegate() {
    _init_properties_JsPlatformLocale_web_kt__p8iahw();
    return new createPlatformLocaleDelegate$1();
  }
  function JsLocale_init_$Init$(languageTag, $this) {
    JsLocale.call($this, toIntlLocale(languageTag));
    return $this;
  }
  function JsLocale_init_$Create$(languageTag) {
    return JsLocale_init_$Init$(languageTag, objectCreate(protoOf(JsLocale)));
  }
  function JsLocale(locale) {
    this.p4q_1 = locale;
  }
  protoOf(JsLocale).q4q = function () {
    return this.p4q_1.language;
  };
  protoOf(JsLocale).f4j = function () {
    return this.p4q_1.baseName;
  };
  function toIntlLocale(_this__u8e3s4) {
    _init_properties_JsPlatformLocale_web_kt__p8iahw();
    return parseLanguageTagToIntlLocale(_this__u8e3s4);
  }
  function parseLanguageTagToIntlLocale(languageTag) {
    _init_properties_JsPlatformLocale_web_kt__p8iahw();
    return new Intl.Locale(languageTag);
  }
  function isRtl(_this__u8e3s4) {
    _init_properties_JsPlatformLocale_web_kt__p8iahw();
    return get_rtlLanguagesSet().s(_this__u8e3s4.q4q());
  }
  function createPlatformLocaleDelegate$1() {
  }
  protoOf(createPlatformLocaleDelegate$1).f1k = function () {
    // Inline function 'kotlin.collections.map' call
    var this_0 = userPreferredLanguages();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.o();
    while (tmp0_iterator.d1()) {
      var item = tmp0_iterator.f1();
      // Inline function 'androidx.compose.ui.text.intl.<no name provided>.<get-current>.<anonymous>' call
      var tmp$ret$0 = new Locale(JsLocale_init_$Create$(item));
      destination.a1(tmp$ret$0);
    }
    return new LocaleList(destination);
  };
  var properties_initialized_JsPlatformLocale_web_kt_cqhywu;
  function _init_properties_JsPlatformLocale_web_kt__p8iahw() {
    if (!properties_initialized_JsPlatformLocale_web_kt_cqhywu) {
      properties_initialized_JsPlatformLocale_web_kt_cqhywu = true;
      rtlLanguagesSet = setOf(['ar', 'fa', 'he', 'iw', 'ji', 'ur', 'yi']);
    }
  }
  function currentPlatform() {
    switch (get_hostOs().t9_1) {
      case 0:
        return Platform_Android_getInstance();
      case 4:
        return Platform_IOS_getInstance();
      case 3:
        return Platform_MacOS_getInstance();
      case 1:
        return Platform_Linux_getInstance();
      case 2:
        return Platform_Windows_getInstance();
      default:
        return Platform_Unknown_getInstance();
    }
  }
  function loadTypeface(font) {
    if (!(font instanceof PlatformFont)) {
      throw IllegalArgumentException_init_$Create$('Unsupported font type: ' + font);
    }
    var tmp;
    if (font instanceof LoadedFont) {
      tmp = Companion_getInstance_10().c3h(Companion_getInstance_11().o3a(font.r4q_1()));
    } else {
      if (font instanceof SystemFont) {
        tmp = Companion_getInstance_10().a3h(font.u4k(), get_skFontStyle(font));
      } else {
        noWhenBranchMatchedException();
      }
    }
    return tmp;
  }
  function get_skFontStyle(_this__u8e3s4) {
    var tmp = _this__u8e3s4.t3c().w4i_1;
    return FontStyle_init_$Create$(tmp, 5, _this__u8e3s4.h4d() === Companion_getInstance_20().n49_1 ? FontSlant_ITALIC_getInstance() : FontSlant_UPRIGHT_getInstance());
  }
  //region block: post-declaration
  protoOf(PlatformResolveInterceptor$Companion$Default$1).w4e = interceptFontFamily;
  protoOf(PlatformResolveInterceptor$Companion$Default$1).x4e = interceptFontWeight;
  protoOf(PlatformResolveInterceptor$Companion$Default$1).y4e = interceptFontStyle;
  protoOf(PlatformResolveInterceptor$Companion$Default$1).z4e = interceptFontSynthesis;
  protoOf(Unspecified).p48 = merge;
  protoOf(Unspecified).s48 = takeOrElse;
  protoOf(BrushStyle).p48 = merge;
  protoOf(BrushStyle).s48 = takeOrElse;
  protoOf(ColorStyle).p48 = merge;
  protoOf(ColorStyle).s48 = takeOrElse;
  protoOf(SkiaParagraph).f4m = paint$default;
  protoOf(SkiaParagraph).g4m = paint$default_0;
  protoOf(SkiaParagraphIntrinsics).m46 = get_hasStaleResolvedFonts;
  //endregion
  //region block: init
  DefaultMaxLines = 2147483647;
  DefaultCacheSize = 8;
  Companion_instance_12 = new Companion_10();
  Companion_instance_13 = new Companion_11();
  Unspecified_instance = new Unspecified();
  Companion_instance_22 = new Companion_20();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = FontStyle;
  _.$_$.b = createFontFamilyResolver_0;
  _.$_$.c = TextInputService;
  _.$_$.d = FontLoader;
  _.$_$.e = LineHeightStyle;
  _.$_$.f = TextAlign;
  _.$_$.g = TextOverflow;
  _.$_$.h = MultiParagraphIntrinsics;
  _.$_$.i = MultiParagraph;
  _.$_$.j = ParagraphIntrinsics_0;
  _.$_$.k = Paragraph;
  _.$_$.l = Paragraph_0;
  _.$_$.m = TextLayoutResult;
  _.$_$.n = TextRange_0;
  _.$_$.o = TextRange;
  _.$_$.p = resolveDefaults;
  _.$_$.q = AnnotatedString_init_$Create$;
  _.$_$.r = TextLayoutInput_init_$Create$;
  _.$_$.s = _TextOverflow___init__impl__obguoe;
  _.$_$.t = TextOverflow__hashCode_impl_kqdwgt;
  _.$_$.u = _TextOverflow___get_value__impl__vugm5i;
  _.$_$.v = _TextRange___get_end__impl__gcdxpp;
  _.$_$.w = _TextRange___get_start__impl__ww4t90;
  _.$_$.x = Companion_getInstance_16;
  _.$_$.y = Companion_getInstance_22;
  _.$_$.z = Companion_getInstance_28;
  _.$_$.a1 = Companion_getInstance_27;
  _.$_$.b1 = Companion_getInstance_30;
  _.$_$.c1 = Companion_getInstance_31;
  _.$_$.d1 = Companion_getInstance_36;
  _.$_$.e1 = Companion_getInstance_14;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-ui-ui-text.js.map
