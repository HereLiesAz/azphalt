(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui-graphics.js', './compose-multiplatform-core-compose-runtime-runtime.js', './compose-multiplatform-core-compose-ui-ui-unit.js', './compose-multiplatform-core-compose-material-material-ripple.js', './compose-multiplatform-core-compose-foundation-foundation.js', './compose-multiplatform-core-compose-ui-ui.js', './compose-multiplatform-core-compose-animation-animation-core.js', './compose-multiplatform-core-compose-foundation-foundation-layout.js', './compose-multiplatform-core-compose-ui-ui-geometry.js', './compose-multiplatform-core-compose-ui-ui-text.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui-graphics.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'), require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./compose-multiplatform-core-compose-material-material-ripple.js'), require('./compose-multiplatform-core-compose-foundation-foundation.js'), require('./compose-multiplatform-core-compose-ui-ui.js'), require('./compose-multiplatform-core-compose-animation-animation-core.js'), require('./compose-multiplatform-core-compose-foundation-foundation-layout.js'), require('./compose-multiplatform-core-compose-ui-ui-geometry.js'), require('./compose-multiplatform-core-compose-ui-ui-text.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-graphics'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-ui-ui-graphics' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-graphics' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-material-material-ripple'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-material-material-ripple' was not found. Please, check whether 'compose-multiplatform-core-compose-material-material-ripple' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-animation-animation-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-animation-animation-core' was not found. Please, check whether 'compose-multiplatform-core-compose-animation-animation-core' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-foundation-foundation-layout'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-foundation-foundation-layout' was not found. Please, check whether 'compose-multiplatform-core-compose-foundation-foundation-layout' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-geometry'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-ui-ui-geometry' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-geometry' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui-text'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-material3-material3'. Its dependency 'compose-multiplatform-core-compose-ui-ui-text' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-text' is loaded prior to 'compose-multiplatform-core-compose-material3-material3'.");
    }
    root['compose-multiplatform-core-compose-material3-material3'] = factory(typeof this['compose-multiplatform-core-compose-material3-material3'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-material3-material3'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui-graphics'], this['compose-multiplatform-core-compose-runtime-runtime'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['compose-multiplatform-core-compose-material-material-ripple'], this['compose-multiplatform-core-compose-foundation-foundation'], this['compose-multiplatform-core-compose-ui-ui'], this['compose-multiplatform-core-compose-animation-animation-core'], this['compose-multiplatform-core-compose-foundation-foundation-layout'], this['compose-multiplatform-core-compose-ui-ui-geometry'], this['compose-multiplatform-core-compose-ui-ui-text']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui_graphics, kotlin_org_jetbrains_compose_runtime_runtime, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_org_jetbrains_compose_material_material_ripple, kotlin_org_jetbrains_compose_foundation_foundation, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_animation_animation_core, kotlin_org_jetbrains_compose_foundation_foundation_layout, kotlin_org_jetbrains_compose_ui_ui_geometry, kotlin_org_jetbrains_compose_ui_ui_text) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Color = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.g;
  var protoOf = kotlin_kotlin.$_$.jb;
  var classMeta = kotlin_kotlin.$_$.ba;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var VOID = kotlin_kotlin.$_$.g;
  var sourceInformationMarkerStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.q1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var sourceInformationMarkerEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.p1;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.e2;
  var staticCompositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.s1;
  var compositionLocalOf = kotlin_org_jetbrains_compose_runtime_runtime.$_$.y;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var Long = kotlin_kotlin.$_$.we;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.i3;
  var _Color___init__impl__r6cqi2 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.i1;
  var rememberRipple = kotlin_org_jetbrains_compose_material_material_ripple.$_$.c;
  var get_LocalIndication = kotlin_org_jetbrains_compose_foundation_foundation.$_$.u;
  var get_LocalRippleTheme = kotlin_org_jetbrains_compose_material_material_ripple.$_$.a;
  var get_LocalTextSelectionColors = kotlin_org_jetbrains_compose_foundation_foundation.$_$.q;
  var composableLambda = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var CompositionLocalProvider = kotlin_org_jetbrains_compose_runtime_runtime.$_$.k;
  var _Color___get_value__impl__1pls5m = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.l1;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.j3;
  var Color__copy$default_impl_ectz3s = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.w1;
  var TextSelectionColors = kotlin_org_jetbrains_compose_foundation_foundation.$_$.r;
  var updateChangedFlags = kotlin_org_jetbrains_compose_runtime_runtime.$_$.w1;
  var RippleAlpha = kotlin_org_jetbrains_compose_material_material_ripple.$_$.b;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l;
  var StrokeCap = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.q;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y1;
  var Companion_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.n5;
  var get_LocalDensity = kotlin_org_jetbrains_compose_ui_ui.$_$.d3;
  var Stroke = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.c;
  var rememberInfiniteTransition = kotlin_org_jetbrains_compose_animation_animation_core.$_$.t;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var get_VectorConverter = kotlin_org_jetbrains_compose_animation_animation_core.$_$.k;
  var get_LinearEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.g;
  var tween = kotlin_org_jetbrains_compose_animation_animation_core.$_$.v;
  var infiniteRepeatable = kotlin_org_jetbrains_compose_animation_animation_core.$_$.r;
  var animateValue = kotlin_org_jetbrains_compose_animation_animation_core.$_$.o;
  var animateFloat = kotlin_org_jetbrains_compose_animation_animation_core.$_$.n;
  var keyframes = kotlin_org_jetbrains_compose_animation_animation_core.$_$.s;
  var progressSemantics = kotlin_org_jetbrains_compose_foundation_foundation.$_$.y;
  var size = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.m;
  var Canvas = kotlin_org_jetbrains_compose_foundation_foundation.$_$.t;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.i2;
  var Spring_instance = kotlin_org_jetbrains_compose_animation_animation_core.$_$.a1;
  var SpringSpec = kotlin_org_jetbrains_compose_animation_animation_core.$_$.h;
  var get_PI = kotlin_kotlin.$_$.pb;
  var _Size___get_width__impl__58y75t = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.e1;
  var Offset = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.c;
  var Size = kotlin_org_jetbrains_compose_ui_ui_geometry.$_$.h;
  var offset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c1;
  var layout = kotlin_org_jetbrains_compose_ui_ui.$_$.v1;
  var semantics = kotlin_org_jetbrains_compose_ui_ui.$_$.f4;
  var padding = kotlin_org_jetbrains_compose_foundation_foundation_layout.$_$.j;
  var CubicBezierEasing = kotlin_org_jetbrains_compose_animation_animation_core.$_$.e;
  var equals = kotlin_kotlin.$_$.ea;
  var hashCode = kotlin_kotlin.$_$.ma;
  var TextUnit = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r;
  var FontStyle = kotlin_org_jetbrains_compose_ui_ui_text.$_$.a;
  var TextAlign = kotlin_org_jetbrains_compose_ui_ui_text.$_$.f;
  var TextOverflow = kotlin_org_jetbrains_compose_ui_ui_text.$_$.g;
  var _TextUnit___get_packedValue__impl__it60w4 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.k2;
  var _TextOverflow___get_value__impl__vugm5i = kotlin_org_jetbrains_compose_ui_ui_text.$_$.u;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b3;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.d1;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.b1;
  var BasicText = kotlin_org_jetbrains_compose_foundation_foundation.$_$.s;
  var CompositionLocalProvider_0 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.l;
  var structuralEqualityPolicy = kotlin_org_jetbrains_compose_runtime_runtime.$_$.t1;
  var Enum = kotlin_kotlin.$_$.re;
  var Color_0 = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.e;
  var RoundedCornerShape = kotlin_org_jetbrains_compose_foundation_foundation.$_$.o;
  var RoundedCornerShape_0 = kotlin_org_jetbrains_compose_foundation_foundation.$_$.p;
  var get_CircleShape = kotlin_org_jetbrains_compose_foundation_foundation.$_$.n;
  var get_RectangleShape = kotlin_org_jetbrains_compose_ui_ui_graphics.$_$.n;
  var get_sp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f1;
  var get_sp_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.g1;
  var checkArithmetic = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v;
  var _TextUnit___get_rawType__impl__tu8yq5 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l2;
  var _TextUnit___get_value__impl__hpbx0k = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m2;
  var pack = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.d1;
  var Companion_getInstance_5 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.x;
  var Companion_getInstance_6 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.y;
  var Companion_getInstance_7 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.z;
  var Companion_getInstance_8 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.a1;
  var LineHeightStyle = kotlin_org_jetbrains_compose_ui_ui_text.$_$.e;
  var Companion_getInstance_9 = kotlin_org_jetbrains_compose_ui_ui_text.$_$.e1;
  //endregion
  //region block: pre-declaration
  setMetadataFor(ColorScheme, 'ColorScheme', classMeta);
  setMetadataFor(MaterialTheme, 'MaterialTheme', objectMeta);
  setMetadataFor(MaterialRippleTheme, 'MaterialRippleTheme', objectMeta);
  setMetadataFor(ProgressIndicatorDefaults, 'ProgressIndicatorDefaults', objectMeta);
  setMetadataFor(Shapes, 'Shapes', classMeta, VOID, VOID, Shapes);
  setMetadataFor(ShapeDefaults, 'ShapeDefaults', objectMeta);
  setMetadataFor(Typography, 'Typography', classMeta, VOID, VOID, Typography);
  setMetadataFor(CircularProgressIndicatorTokens, 'CircularProgressIndicatorTokens', objectMeta);
  setMetadataFor(ColorDarkTokens, 'ColorDarkTokens', objectMeta);
  setMetadataFor(ColorLightTokens, 'ColorLightTokens', objectMeta);
  setMetadataFor(ColorSchemeKeyTokens, 'ColorSchemeKeyTokens', classMeta, Enum);
  setMetadataFor(LinearProgressIndicatorTokens, 'LinearProgressIndicatorTokens', objectMeta);
  setMetadataFor(PaletteTokens, 'PaletteTokens', objectMeta);
  setMetadataFor(ShapeKeyTokens, 'ShapeKeyTokens', classMeta, Enum);
  setMetadataFor(ShapeTokens, 'ShapeTokens', objectMeta);
  setMetadataFor(StateTokens, 'StateTokens', objectMeta);
  setMetadataFor(TypeScaleTokens, 'TypeScaleTokens', objectMeta);
  setMetadataFor(TypefaceTokens, 'TypefaceTokens', objectMeta);
  setMetadataFor(TypographyTokens, 'TypographyTokens', objectMeta);
  //endregion
  function get_LocalColorScheme() {
    _init_properties_ColorScheme_kt__xhtsty();
    return LocalColorScheme;
  }
  var LocalColorScheme;
  var LocalTonalElevationEnabled;
  function ColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim, surfaceBright, surfaceDim, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, surfaceContainerLow, surfaceContainerLowest) {
    this.ibk_1 = primary;
    this.jbk_1 = onPrimary;
    this.kbk_1 = primaryContainer;
    this.lbk_1 = onPrimaryContainer;
    this.mbk_1 = inversePrimary;
    this.nbk_1 = secondary;
    this.obk_1 = onSecondary;
    this.pbk_1 = secondaryContainer;
    this.qbk_1 = onSecondaryContainer;
    this.rbk_1 = tertiary;
    this.sbk_1 = onTertiary;
    this.tbk_1 = tertiaryContainer;
    this.ubk_1 = onTertiaryContainer;
    this.vbk_1 = background;
    this.wbk_1 = onBackground;
    this.xbk_1 = surface;
    this.ybk_1 = onSurface;
    this.zbk_1 = surfaceVariant;
    this.abl_1 = onSurfaceVariant;
    this.bbl_1 = surfaceTint;
    this.cbl_1 = inverseSurface;
    this.dbl_1 = inverseOnSurface;
    this.ebl_1 = error;
    this.fbl_1 = onError;
    this.gbl_1 = errorContainer;
    this.hbl_1 = onErrorContainer;
    this.ibl_1 = outline;
    this.jbl_1 = outlineVariant;
    this.kbl_1 = scrim;
    this.lbl_1 = surfaceBright;
    this.mbl_1 = surfaceDim;
    this.nbl_1 = surfaceContainer;
    this.obl_1 = surfaceContainerHigh;
    this.pbl_1 = surfaceContainerHighest;
    this.qbl_1 = surfaceContainerLow;
    this.rbl_1 = surfaceContainerLowest;
    this.sbl_1 = null;
    this.tbl_1 = null;
    this.ubl_1 = null;
    this.vbl_1 = null;
    this.wbl_1 = null;
    this.xbl_1 = null;
    this.ybl_1 = null;
    this.zbl_1 = null;
    this.abm_1 = null;
    this.bbm_1 = null;
    this.cbm_1 = null;
    this.dbm_1 = null;
    this.ebm_1 = null;
    this.fbm_1 = null;
    this.gbm_1 = null;
    this.hbm_1 = null;
    this.ibm_1 = null;
    this.jbm_1 = null;
    this.kbm_1 = null;
    this.lbm_1 = null;
    this.mbm_1 = null;
    this.nbm_1 = null;
    this.obm_1 = null;
    this.pbm_1 = null;
    this.qbm_1 = null;
    this.rbm_1 = null;
    this.sbm_1 = null;
    this.tbm_1 = null;
    this.ubm_1 = null;
    this.vbm_1 = null;
    this.wbm_1 = null;
    this.xbm_1 = null;
    this.ybm_1 = null;
  }
  protoOf(ColorScheme).toString = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.material3.ColorScheme.toString.<anonymous>' call
    this_0.y5('ColorScheme(');
    this_0.y5('primary=' + new Color(this.ibk_1) + ', ');
    this_0.y5('onPrimary=' + new Color(this.jbk_1) + ', ');
    this_0.y5('primaryContainer=' + new Color(this.kbk_1) + ', ');
    this_0.y5('onPrimaryContainer=' + new Color(this.lbk_1) + ', ');
    this_0.y5('inversePrimary=' + new Color(this.mbk_1) + ', ');
    this_0.y5('secondary=' + new Color(this.nbk_1) + ', ');
    this_0.y5('onSecondary=' + new Color(this.obk_1) + ', ');
    this_0.y5('secondaryContainer=' + new Color(this.pbk_1) + ', ');
    this_0.y5('onSecondaryContainer=' + new Color(this.qbk_1) + ', ');
    this_0.y5('tertiary=' + new Color(this.rbk_1) + ', ');
    this_0.y5('onTertiary=' + new Color(this.sbk_1) + ', ');
    this_0.y5('tertiaryContainer=' + new Color(this.tbk_1) + ', ');
    this_0.y5('onTertiaryContainer=' + new Color(this.ubk_1) + ', ');
    this_0.y5('background=' + new Color(this.vbk_1) + ', ');
    this_0.y5('onBackground=' + new Color(this.wbk_1) + ', ');
    this_0.y5('surface=' + new Color(this.xbk_1) + ', ');
    this_0.y5('onSurface=' + new Color(this.ybk_1) + ', ');
    this_0.y5('surfaceVariant=' + new Color(this.zbk_1) + ', ');
    this_0.y5('onSurfaceVariant=' + new Color(this.abl_1) + ', ');
    this_0.y5('surfaceTint=' + new Color(this.bbl_1) + ', ');
    this_0.y5('inverseSurface=' + new Color(this.cbl_1) + ', ');
    this_0.y5('inverseOnSurface=' + new Color(this.dbl_1) + ', ');
    this_0.y5('error=' + new Color(this.ebl_1) + ', ');
    this_0.y5('onError=' + new Color(this.fbl_1) + ', ');
    this_0.y5('errorContainer=' + new Color(this.gbl_1) + ', ');
    this_0.y5('onErrorContainer=' + new Color(this.hbl_1) + ', ');
    this_0.y5('outline=' + new Color(this.ibl_1) + ', ');
    this_0.y5('outlineVariant=' + new Color(this.jbl_1) + ', ');
    this_0.y5('scrim=' + new Color(this.kbl_1) + ', ');
    this_0.y5('surfaceBright=' + new Color(this.lbl_1) + ', ');
    this_0.y5('surfaceDim=' + new Color(this.mbl_1) + ', ');
    this_0.y5('surfaceContainer=' + new Color(this.nbl_1) + ', ');
    this_0.y5('surfaceContainerHigh=' + new Color(this.obl_1) + ', ');
    this_0.y5('surfaceContainerHighest=' + new Color(this.pbl_1) + ', ');
    this_0.y5('surfaceContainerLow=' + new Color(this.qbl_1) + ', ');
    this_0.y5('surfaceContainerLowest=' + new Color(this.rbl_1) + ', ');
    this_0.y5(')');
    return this_0.toString();
  };
  function lightColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim, surfaceBright, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, surfaceContainerLow, surfaceContainerLowest, surfaceDim) {
    primary = primary === VOID ? ColorLightTokens_getInstance().ybn_1 : primary;
    onPrimary = onPrimary === VOID ? ColorLightTokens_getInstance().ibn_1 : onPrimary;
    primaryContainer = primaryContainer === VOID ? ColorLightTokens_getInstance().zbn_1 : primaryContainer;
    onPrimaryContainer = onPrimaryContainer === VOID ? ColorLightTokens_getInstance().jbn_1 : onPrimaryContainer;
    inversePrimary = inversePrimary === VOID ? ColorLightTokens_getInstance().dbn_1 : inversePrimary;
    secondary = secondary === VOID ? ColorLightTokens_getInstance().dbo_1 : secondary;
    onSecondary = onSecondary === VOID ? ColorLightTokens_getInstance().mbn_1 : onSecondary;
    secondaryContainer = secondaryContainer === VOID ? ColorLightTokens_getInstance().ebo_1 : secondaryContainer;
    onSecondaryContainer = onSecondaryContainer === VOID ? ColorLightTokens_getInstance().nbn_1 : onSecondaryContainer;
    tertiary = tertiary === VOID ? ColorLightTokens_getInstance().rbo_1 : tertiary;
    onTertiary = onTertiary === VOID ? ColorLightTokens_getInstance().sbn_1 : onTertiary;
    tertiaryContainer = tertiaryContainer === VOID ? ColorLightTokens_getInstance().sbo_1 : tertiaryContainer;
    onTertiaryContainer = onTertiaryContainer === VOID ? ColorLightTokens_getInstance().tbn_1 : onTertiaryContainer;
    background = background === VOID ? ColorLightTokens_getInstance().zbm_1 : background;
    onBackground = onBackground === VOID ? ColorLightTokens_getInstance().fbn_1 : onBackground;
    surface = surface === VOID ? ColorLightTokens_getInstance().hbo_1 : surface;
    onSurface = onSurface === VOID ? ColorLightTokens_getInstance().qbn_1 : onSurface;
    surfaceVariant = surfaceVariant === VOID ? ColorLightTokens_getInstance().qbo_1 : surfaceVariant;
    onSurfaceVariant = onSurfaceVariant === VOID ? ColorLightTokens_getInstance().rbn_1 : onSurfaceVariant;
    surfaceTint = surfaceTint === VOID ? primary : surfaceTint;
    inverseSurface = inverseSurface === VOID ? ColorLightTokens_getInstance().ebn_1 : inverseSurface;
    inverseOnSurface = inverseOnSurface === VOID ? ColorLightTokens_getInstance().cbn_1 : inverseOnSurface;
    error = error === VOID ? ColorLightTokens_getInstance().abn_1 : error;
    onError = onError === VOID ? ColorLightTokens_getInstance().gbn_1 : onError;
    errorContainer = errorContainer === VOID ? ColorLightTokens_getInstance().bbn_1 : errorContainer;
    onErrorContainer = onErrorContainer === VOID ? ColorLightTokens_getInstance().hbn_1 : onErrorContainer;
    outline = outline === VOID ? ColorLightTokens_getInstance().wbn_1 : outline;
    outlineVariant = outlineVariant === VOID ? ColorLightTokens_getInstance().xbn_1 : outlineVariant;
    scrim = scrim === VOID ? ColorLightTokens_getInstance().cbo_1 : scrim;
    surfaceBright = surfaceBright === VOID ? ColorLightTokens_getInstance().ibo_1 : surfaceBright;
    surfaceContainer = surfaceContainer === VOID ? ColorLightTokens_getInstance().jbo_1 : surfaceContainer;
    surfaceContainerHigh = surfaceContainerHigh === VOID ? ColorLightTokens_getInstance().kbo_1 : surfaceContainerHigh;
    surfaceContainerHighest = surfaceContainerHighest === VOID ? ColorLightTokens_getInstance().lbo_1 : surfaceContainerHighest;
    surfaceContainerLow = surfaceContainerLow === VOID ? ColorLightTokens_getInstance().mbo_1 : surfaceContainerLow;
    surfaceContainerLowest = surfaceContainerLowest === VOID ? ColorLightTokens_getInstance().nbo_1 : surfaceContainerLowest;
    surfaceDim = surfaceDim === VOID ? ColorLightTokens_getInstance().obo_1 : surfaceDim;
    _init_properties_ColorScheme_kt__xhtsty();
    return new ColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim, surfaceBright, surfaceDim, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, surfaceContainerLow, surfaceContainerLowest);
  }
  function get_value(_this__u8e3s4, $composer, $changed) {
    _init_properties_ColorScheme_kt__xhtsty();
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, -810780884, 'C949@42617L11:ColorScheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-810780884, $changed, -1, 'androidx.compose.material3.<get-value> (ColorScheme.kt:949)');
    }
    var tmp0 = fromToken(MaterialTheme_instance.vbo($composer_0, 6), _this__u8e3s4);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  }
  function fromToken(_this__u8e3s4, value) {
    _init_properties_ColorScheme_kt__xhtsty();
    switch (value.t9_1) {
      case 0:
        return _this__u8e3s4.vbk_1;
      case 1:
        return _this__u8e3s4.ebl_1;
      case 2:
        return _this__u8e3s4.gbl_1;
      case 3:
        return _this__u8e3s4.dbl_1;
      case 4:
        return _this__u8e3s4.mbk_1;
      case 5:
        return _this__u8e3s4.cbl_1;
      case 6:
        return _this__u8e3s4.wbk_1;
      case 7:
        return _this__u8e3s4.fbl_1;
      case 8:
        return _this__u8e3s4.hbl_1;
      case 9:
        return _this__u8e3s4.jbk_1;
      case 10:
        return _this__u8e3s4.lbk_1;
      case 13:
        return _this__u8e3s4.obk_1;
      case 14:
        return _this__u8e3s4.qbk_1;
      case 17:
        return _this__u8e3s4.ybk_1;
      case 18:
        return _this__u8e3s4.abl_1;
      case 42:
        return _this__u8e3s4.bbl_1;
      case 19:
        return _this__u8e3s4.sbk_1;
      case 20:
        return _this__u8e3s4.ubk_1;
      case 23:
        return _this__u8e3s4.ibl_1;
      case 24:
        return _this__u8e3s4.jbl_1;
      case 25:
        return _this__u8e3s4.ibk_1;
      case 26:
        return _this__u8e3s4.kbk_1;
      case 29:
        return _this__u8e3s4.kbl_1;
      case 30:
        return _this__u8e3s4.nbk_1;
      case 31:
        return _this__u8e3s4.pbk_1;
      case 34:
        return _this__u8e3s4.xbk_1;
      case 43:
        return _this__u8e3s4.zbk_1;
      case 35:
        return _this__u8e3s4.lbl_1;
      case 36:
        return _this__u8e3s4.nbl_1;
      case 37:
        return _this__u8e3s4.obl_1;
      case 38:
        return _this__u8e3s4.pbl_1;
      case 39:
        return _this__u8e3s4.qbl_1;
      case 40:
        return _this__u8e3s4.rbl_1;
      case 41:
        return _this__u8e3s4.mbl_1;
      case 44:
        return _this__u8e3s4.rbk_1;
      case 45:
        return _this__u8e3s4.tbk_1;
      default:
        return Companion_getInstance().n3r_1;
    }
  }
  function darkColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim, surfaceBright, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, surfaceContainerLow, surfaceContainerLowest, surfaceDim) {
    primary = primary === VOID ? ColorDarkTokens_getInstance().vbp_1 : primary;
    onPrimary = onPrimary === VOID ? ColorDarkTokens_getInstance().fbp_1 : onPrimary;
    primaryContainer = primaryContainer === VOID ? ColorDarkTokens_getInstance().wbp_1 : primaryContainer;
    onPrimaryContainer = onPrimaryContainer === VOID ? ColorDarkTokens_getInstance().gbp_1 : onPrimaryContainer;
    inversePrimary = inversePrimary === VOID ? ColorDarkTokens_getInstance().abp_1 : inversePrimary;
    secondary = secondary === VOID ? ColorDarkTokens_getInstance().abq_1 : secondary;
    onSecondary = onSecondary === VOID ? ColorDarkTokens_getInstance().jbp_1 : onSecondary;
    secondaryContainer = secondaryContainer === VOID ? ColorDarkTokens_getInstance().bbq_1 : secondaryContainer;
    onSecondaryContainer = onSecondaryContainer === VOID ? ColorDarkTokens_getInstance().kbp_1 : onSecondaryContainer;
    tertiary = tertiary === VOID ? ColorDarkTokens_getInstance().obq_1 : tertiary;
    onTertiary = onTertiary === VOID ? ColorDarkTokens_getInstance().pbp_1 : onTertiary;
    tertiaryContainer = tertiaryContainer === VOID ? ColorDarkTokens_getInstance().pbq_1 : tertiaryContainer;
    onTertiaryContainer = onTertiaryContainer === VOID ? ColorDarkTokens_getInstance().qbp_1 : onTertiaryContainer;
    background = background === VOID ? ColorDarkTokens_getInstance().wbo_1 : background;
    onBackground = onBackground === VOID ? ColorDarkTokens_getInstance().cbp_1 : onBackground;
    surface = surface === VOID ? ColorDarkTokens_getInstance().ebq_1 : surface;
    onSurface = onSurface === VOID ? ColorDarkTokens_getInstance().nbp_1 : onSurface;
    surfaceVariant = surfaceVariant === VOID ? ColorDarkTokens_getInstance().nbq_1 : surfaceVariant;
    onSurfaceVariant = onSurfaceVariant === VOID ? ColorDarkTokens_getInstance().obp_1 : onSurfaceVariant;
    surfaceTint = surfaceTint === VOID ? primary : surfaceTint;
    inverseSurface = inverseSurface === VOID ? ColorDarkTokens_getInstance().bbp_1 : inverseSurface;
    inverseOnSurface = inverseOnSurface === VOID ? ColorDarkTokens_getInstance().zbo_1 : inverseOnSurface;
    error = error === VOID ? ColorDarkTokens_getInstance().xbo_1 : error;
    onError = onError === VOID ? ColorDarkTokens_getInstance().dbp_1 : onError;
    errorContainer = errorContainer === VOID ? ColorDarkTokens_getInstance().ybo_1 : errorContainer;
    onErrorContainer = onErrorContainer === VOID ? ColorDarkTokens_getInstance().ebp_1 : onErrorContainer;
    outline = outline === VOID ? ColorDarkTokens_getInstance().tbp_1 : outline;
    outlineVariant = outlineVariant === VOID ? ColorDarkTokens_getInstance().ubp_1 : outlineVariant;
    scrim = scrim === VOID ? ColorDarkTokens_getInstance().zbp_1 : scrim;
    surfaceBright = surfaceBright === VOID ? ColorDarkTokens_getInstance().fbq_1 : surfaceBright;
    surfaceContainer = surfaceContainer === VOID ? ColorDarkTokens_getInstance().gbq_1 : surfaceContainer;
    surfaceContainerHigh = surfaceContainerHigh === VOID ? ColorDarkTokens_getInstance().hbq_1 : surfaceContainerHigh;
    surfaceContainerHighest = surfaceContainerHighest === VOID ? ColorDarkTokens_getInstance().ibq_1 : surfaceContainerHighest;
    surfaceContainerLow = surfaceContainerLow === VOID ? ColorDarkTokens_getInstance().jbq_1 : surfaceContainerLow;
    surfaceContainerLowest = surfaceContainerLowest === VOID ? ColorDarkTokens_getInstance().kbq_1 : surfaceContainerLowest;
    surfaceDim = surfaceDim === VOID ? ColorDarkTokens_getInstance().lbq_1 : surfaceDim;
    _init_properties_ColorScheme_kt__xhtsty();
    return new ColorScheme(primary, onPrimary, primaryContainer, onPrimaryContainer, inversePrimary, secondary, onSecondary, secondaryContainer, onSecondaryContainer, tertiary, onTertiary, tertiaryContainer, onTertiaryContainer, background, onBackground, surface, onSurface, surfaceVariant, onSurfaceVariant, surfaceTint, inverseSurface, inverseOnSurface, error, onError, errorContainer, onErrorContainer, outline, outlineVariant, scrim, surfaceBright, surfaceDim, surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, surfaceContainerLow, surfaceContainerLowest);
  }
  function LocalColorScheme$lambda() {
    _init_properties_ColorScheme_kt__xhtsty();
    return lightColorScheme();
  }
  function LocalTonalElevationEnabled$lambda() {
    _init_properties_ColorScheme_kt__xhtsty();
    return true;
  }
  var properties_initialized_ColorScheme_kt_ox8mco;
  function _init_properties_ColorScheme_kt__xhtsty() {
    if (!properties_initialized_ColorScheme_kt_ox8mco) {
      properties_initialized_ColorScheme_kt_ox8mco = true;
      LocalColorScheme = staticCompositionLocalOf(LocalColorScheme$lambda);
      LocalTonalElevationEnabled = staticCompositionLocalOf(LocalTonalElevationEnabled$lambda);
    }
  }
  function get_LocalContentColor() {
    _init_properties_ContentColor_kt__5mda8a();
    return LocalContentColor;
  }
  var LocalContentColor;
  function LocalContentColor$lambda() {
    _init_properties_ContentColor_kt__5mda8a();
    return new Color(Companion_getInstance().b3r_1);
  }
  var properties_initialized_ContentColor_kt_sc8rw;
  function _init_properties_ContentColor_kt__5mda8a() {
    if (!properties_initialized_ContentColor_kt_sc8rw) {
      properties_initialized_ContentColor_kt_sc8rw = true;
      LocalContentColor = compositionLocalOf(VOID, LocalContentColor$lambda);
    }
  }
  function get_DefaultRippleAlpha() {
    _init_properties_MaterialTheme_kt__ccmets();
    return DefaultRippleAlpha;
  }
  var DefaultRippleAlpha;
  function MaterialTheme() {
  }
  protoOf(MaterialTheme).vbo = function ($composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, -561618718, 'C86@3799L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-561618718, $changed, -1, 'androidx.compose.material3.MaterialTheme.<get-colorScheme> (MaterialTheme.kt:86)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalColorScheme();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_0);
    sourceInformationMarkerEnd($composer_1);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  };
  protoOf(MaterialTheme).sbq = function ($composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, -942794935, 'C94@4023L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-942794935, $changed, -1, 'androidx.compose.material3.MaterialTheme.<get-typography> (MaterialTheme.kt:94)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalTypography();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_0);
    sourceInformationMarkerEnd($composer_1);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  };
  protoOf(MaterialTheme).tbq = function ($composer, $changed) {
    var $composer_0 = $composer;
    sourceInformationMarkerStart($composer_0, 419509830, 'C102@4231L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(419509830, $changed, -1, 'androidx.compose.material3.MaterialTheme.<get-shapes> (MaterialTheme.kt:102)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalShapes();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_0);
    sourceInformationMarkerEnd($composer_1);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    sourceInformationMarkerEnd($composer_0);
    return tmp0;
  };
  var MaterialTheme_instance;
  function MaterialTheme_getInstance() {
    return MaterialTheme_instance;
  }
  function MaterialTheme_0(colorScheme, shapes, typography, content, $composer, $changed, $default) {
    _init_properties_MaterialTheme_kt__ccmets();
    var colorScheme_0 = {_v: colorScheme};
    var shapes_0 = {_v: shapes};
    var typography_0 = {_v: typography};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-2127166334);
    sourceInformation($composer_0, 'C(MaterialTheme)P(!1,2,3)56@2691L11,57@2739L6,58@2790L10,61@2902L16,62@2945L40,63@2990L440:MaterialTheme.kt#uh7d8r');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ((($default & 1) === 0 ? $composer_0.v1o(colorScheme_0._v) : false) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ((($default & 2) === 0 ? $composer_0.v1o(shapes_0._v) : false) ? 32 : 16);
    if (($changed & 896) === 0)
      $dirty = $dirty | ((($default & 4) === 0 ? $composer_0.v1o(typography_0._v) : false) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.j1y(content) ? 2048 : 1024);
    if (!(($dirty & 5851) === 1170) ? true : !$composer_0.f1x()) {
      $composer_0.j1x();
      if (($changed & 1) === 0 ? true : $composer_0.n1x()) {
        if (!(($default & 1) === 0)) {
          colorScheme_0._v = MaterialTheme_instance.vbo($composer_0, 6);
          $dirty = $dirty & -15;
        }
        if (!(($default & 2) === 0)) {
          shapes_0._v = MaterialTheme_instance.tbq($composer_0, 6);
          $dirty = $dirty & -113;
        }
        if (!(($default & 4) === 0)) {
          typography_0._v = MaterialTheme_instance.sbq($composer_0, 6);
          $dirty = $dirty & -897;
        }
      } else {
        $composer_0.q1r();
        if (!(($default & 1) === 0))
          $dirty = $dirty & -15;
        if (!(($default & 2) === 0))
          $dirty = $dirty & -113;
        if (!(($default & 4) === 0))
          $dirty = $dirty & -897;
      }
      $composer_0.k1x();
      if (isTraceInProgress()) {
        traceEventStart(-2127166334, $dirty, -1, 'androidx.compose.material3.MaterialTheme (MaterialTheme.kt:60)');
      }
      var tmp = _Dp___init__impl__ms3zkb(0.0);
      var rippleIndication = rememberRipple(false, tmp, _Color___init__impl__r6cqi2(_ULong___init__impl__c78o9k(new Long(0, 0))), $composer_0, 0, 7);
      var selectionColors = rememberTextSelectionColors(colorScheme_0._v, $composer_0, 14 & $dirty);
      var tmp_0 = [get_LocalColorScheme().g24(colorScheme_0._v), get_LocalIndication().g24(rippleIndication), get_LocalRippleTheme().g24(MaterialRippleTheme_instance), get_LocalShapes().g24(shapes_0._v), get_LocalTextSelectionColors().g24(selectionColors), get_LocalTypography().g24(typography_0._v)];
      // Inline function 'kotlin.run' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.MaterialTheme.<anonymous>' call
      var tmp_1 = $composer_0;
      var dispatchReceiver = composableLambda(tmp_1, -1066563262, true, MaterialTheme$lambda(typography_0, content));
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
      if (invalid ? true : it === Companion_getInstance_0().w1r_1) {
        // Inline function 'androidx.compose.material3.MaterialTheme.<anonymous>.<anonymous>' call
        var value = ComposableLambda$invoke$ref(dispatchReceiver);
        $composer_1.d1z(value);
        tmp_2 = value;
      } else {
        tmp_2 = it;
      }
      var tmp_3 = tmp_2;
      var tmp0 = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      $composer_1.l1l();
      CompositionLocalProvider(tmp_0, tmp0, $composer_0, 56);
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
      tmp0_safe_receiver.j24(MaterialTheme$lambda_0(colorScheme_0, shapes_0, typography_0, content, $changed, $default));
    }
  }
  function rememberTextSelectionColors(colorScheme, $composer, $changed) {
    _init_properties_MaterialTheme_kt__ccmets();
    var $composer_0 = $composer;
    $composer_0.j1l(1866455512);
    sourceInformation($composer_0, 'C(rememberTextSelectionColors)128@5053L198:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1866455512, $changed, -1, 'androidx.compose.material3.rememberTextSelectionColors (MaterialTheme.kt:126)');
    }
    var primaryColor = colorScheme.ibk_1;
    $composer_0.j1l(-1160119707);
    sourceInformation($composer_0, 'CC(remember):MaterialTheme.kt#9igjgp');
    // Inline function 'androidx.compose.runtime.cache' call
    var invalid = $composer_0.m1y(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(primaryColor)));
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
    var it = $composer_0.x1y();
    var tmp;
    if (invalid ? true : it === Companion_getInstance_0().w1r_1) {
      // Inline function 'androidx.compose.material3.rememberTextSelectionColors.<anonymous>' call
      var value = new TextSelectionColors(primaryColor, Color__copy$default_impl_ectz3s(primaryColor, 0.4));
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
  function MaterialRippleTheme() {
  }
  protoOf(MaterialRippleTheme).sb0 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-2059468846);
    sourceInformation($composer_0, 'C(defaultColor)110@4479L7:MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-2059468846, $changed, -1, 'androidx.compose.material3.MaterialRippleTheme.defaultColor (MaterialTheme.kt:110)');
    }
    // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
    var this_0 = get_LocalContentColor();
    var $composer_1 = $composer_0;
    sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
    var tmp0 = $composer_1.j1z(this_0);
    sourceInformationMarkerEnd($composer_1);
    var tmp0_0 = tmp0.x3t_1;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0_0;
  };
  protoOf(MaterialRippleTheme).tb0 = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1285764247);
    sourceInformation($composer_0, 'C(rippleAlpha):MaterialTheme.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1285764247, $changed, -1, 'androidx.compose.material3.MaterialRippleTheme.rippleAlpha (MaterialTheme.kt:114)');
    }
    var tmp0 = get_DefaultRippleAlpha();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  var MaterialRippleTheme_instance;
  function MaterialRippleTheme_getInstance() {
    return MaterialRippleTheme_instance;
  }
  function MaterialTheme$lambda($typography, $content) {
    return function ($composer, $changed) {
      var $composer_0 = $composer;
      sourceInformation($composer_0, 'C71@3359L65:MaterialTheme.kt#uh7d8r');
      var tmp;
      if (!(($changed & 11) === 2) ? true : !$composer_0.f1x()) {
        if (isTraceInProgress()) {
          traceEventStart(-1066563262, $changed, -1, 'androidx.compose.material3.MaterialTheme.<anonymous> (MaterialTheme.kt:71)');
        }
        ProvideTextStyle($typography._v.dbr_1, $content, $composer_0, 0);
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
  function MaterialTheme$lambda_0($colorScheme, $shapes, $typography, $content, $$changed, $$default) {
    return function ($composer, $force) {
      MaterialTheme_0($colorScheme._v, $shapes._v, $typography._v, $content, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  var properties_initialized_MaterialTheme_kt_8j16em;
  function _init_properties_MaterialTheme_kt__ccmets() {
    if (!properties_initialized_MaterialTheme_kt_8j16em) {
      properties_initialized_MaterialTheme_kt_8j16em = true;
      DefaultRippleAlpha = new RippleAlpha(0.16, 0.12, 0.08, 0.12);
    }
  }
  function get_SemanticsBoundsPadding() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return SemanticsBoundsPadding;
  }
  var SemanticsBoundsPadding;
  var IncreaseSemanticsBounds;
  var LinearIndicatorWidth;
  var LinearIndicatorHeight;
  function get_CircularIndicatorDiameter() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return CircularIndicatorDiameter;
  }
  var CircularIndicatorDiameter;
  var FirstLineHeadEasing;
  var FirstLineTailEasing;
  var SecondLineHeadEasing;
  var SecondLineTailEasing;
  function get_CircularEasing() {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return CircularEasing;
  }
  var CircularEasing;
  function CircularProgressIndicator(modifier, color, strokeWidth, trackColor, strokeCap, $composer, $changed, $default) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    var modifier_0 = {_v: modifier};
    var color_0 = {_v: new Color(color)};
    var strokeWidth_0 = {_v: new Dp(strokeWidth)};
    var trackColor_0 = {_v: new Color(trackColor)};
    var strokeCap_0 = {_v: new StrokeCap(strokeCap)};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-115871647);
    sourceInformation($composer_0, 'C(CircularProgressIndicator)P(1,0:c#ui.graphics.Color,3:c#ui.unit.Dp,4:c#ui.graphics.Color,2:c#ui.graphics.StrokeCap)391@16088L13,393@16222L18,*396@16366L7,400@16465L28,402@16622L278,414@17014L230,429@17476L215,425@17361L346,440@17855L224,436@17740L355,447@18100L737:ProgressIndicator.kt#uh7d8r');
    var $dirty = $changed;
    if (!(($default & 1) === 0))
      $dirty = $dirty | 6;
    else if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(modifier_0._v) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ((($default & 2) === 0 ? $composer_0.m1y(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(color_0._v.x3t_1))) : false) ? 32 : 16);
    if (!(($default & 4) === 0))
      $dirty = $dirty | 384;
    else if (($changed & 896) === 0)
      $dirty = $dirty | ($composer_0.l1y(_Dp___get_value__impl__geb1vb(strokeWidth_0._v.o36_1)) ? 256 : 128);
    if (($changed & 7168) === 0)
      $dirty = $dirty | ((($default & 8) === 0 ? $composer_0.m1y(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(trackColor_0._v.x3t_1))) : false) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.v1o(strokeCap_0._v) ? 16384 : 8192);
    if (!(($dirty & 46811) === 9362) ? true : !$composer_0.f1x()) {
      $composer_0.j1x();
      if (($changed & 1) === 0 ? true : $composer_0.n1x()) {
        if (!(($default & 1) === 0)) {
          modifier_0._v = Companion_instance;
        }
        if (!(($default & 2) === 0)) {
          color_0._v = new Color(ProgressIndicatorDefaults_getInstance().obr($composer_0, 6));
          $dirty = $dirty & -113;
        }
        if (!(($default & 4) === 0)) {
          strokeWidth_0._v = new Dp(ProgressIndicatorDefaults_getInstance().jbr_1);
        }
        if (!(($default & 8) === 0)) {
          trackColor_0._v = new Color(ProgressIndicatorDefaults_getInstance().pbr($composer_0, 6));
          $dirty = $dirty & -7169;
        }
        if (!(($default & 16) === 0)) {
          strokeCap_0._v = new StrokeCap(ProgressIndicatorDefaults_getInstance().mbr_1);
        }
      } else {
        $composer_0.q1r();
        if (!(($default & 2) === 0))
          $dirty = $dirty & -113;
        if (!(($default & 8) === 0))
          $dirty = $dirty & -7169;
      }
      $composer_0.k1x();
      if (isTraceInProgress()) {
        traceEventStart(-115871647, $dirty, -1, 'androidx.compose.material3.CircularProgressIndicator (ProgressIndicator.kt:395)');
      }
      // Inline function 'kotlin.with' call
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalDensity();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.j1z(this_0);
      sourceInformationMarkerEnd($composer_1);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.material3.CircularProgressIndicator.<anonymous>' call
      var stroke = new Stroke(tmp0.y35(strokeWidth_0._v.o36_1), VOID, strokeCap_0._v.j3y_1);
      var transition = rememberInfiniteTransition(null, $composer_0, 0, 1);
      var tmp = get_VectorConverter(IntCompanionObject_instance);
      var tmp_0 = infiniteRepeatable(tween(6660, VOID, get_LinearEasing()));
      var currentRotation = animateValue(transition, 0, 5, tmp, tmp_0, null, $composer_0, 37304, 16);
      var tmp_1 = infiniteRepeatable(tween(1332, VOID, get_LinearEasing()));
      var baseRotation = animateFloat(transition, 0.0, 286.0, tmp_1, null, $composer_0, 4536, 8);
      $composer_0.j1l(-291835305);
      sourceInformation($composer_0, 'CC(remember):ProgressIndicator.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var this_1 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = this_1.x1y();
      var tmp_2;
      if (false ? true : it === Companion_getInstance_0().w1r_1) {
        // Inline function 'androidx.compose.material3.CircularProgressIndicator.<anonymous>' call
        var value = CircularProgressIndicator$lambda;
        this_1.d1z(value);
        tmp_2 = value;
      } else {
        tmp_2 = it;
      }
      var tmp_3 = tmp_2;
      var tmp0_group = (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
      $composer_0.l1l();
      var tmp_4 = infiniteRepeatable(keyframes(tmp0_group));
      var endAngle = animateFloat(transition, 0.0, 290.0, tmp_4, null, $composer_0, 4536, 8);
      $composer_0.j1l(-291823168);
      sourceInformation($composer_0, 'CC(remember):ProgressIndicator.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var this_2 = $composer_0;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it_0 = this_2.x1y();
      var tmp_5;
      if (false ? true : it_0 === Companion_getInstance_0().w1r_1) {
        // Inline function 'androidx.compose.material3.CircularProgressIndicator.<anonymous>' call
        var value_0 = CircularProgressIndicator$lambda_0;
        this_2.d1z(value_0);
        tmp_5 = value_0;
      } else {
        tmp_5 = it_0;
      }
      var tmp_6 = tmp_5;
      var tmp1_group = (tmp_6 == null ? true : !(tmp_6 == null)) ? tmp_6 : THROW_CCE();
      $composer_0.l1l();
      var tmp_7 = infiniteRepeatable(keyframes(tmp1_group));
      var startAngle = animateFloat(transition, 0.0, 290.0, tmp_7, null, $composer_0, 4536, 8);
      var tmp_8 = size(progressSemantics(modifier_0._v), get_CircularIndicatorDiameter());
      Canvas(tmp_8, CircularProgressIndicator$lambda_1(trackColor_0, stroke, currentRotation, endAngle, startAngle, baseRotation, strokeWidth_0, color_0), $composer_0, 0);
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
      tmp2_safe_receiver.j24(CircularProgressIndicator$lambda_2(modifier_0, color_0, strokeWidth_0, trackColor_0, strokeCap_0, $changed, $default));
    }
  }
  function ProgressIndicatorDefaults() {
    ProgressIndicatorDefaults_instance = this;
    this.jbr_1 = CircularProgressIndicatorTokens_getInstance().sbr_1;
    this.kbr_1 = Companion_getInstance_1().g3y_1;
    this.lbr_1 = Companion_getInstance_1().g3y_1;
    this.mbr_1 = Companion_getInstance_1().i3y_1;
    var tmp = this;
    tmp.nbr_1 = new SpringSpec(1.0, 50.0, 0.001);
  }
  protoOf(ProgressIndicatorDefaults).obr = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(1803349725);
    sourceInformation($composer_0, 'C601@23454L5:ProgressIndicator.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(1803349725, $changed, -1, 'androidx.compose.material3.ProgressIndicatorDefaults.<get-circularColor> (ProgressIndicator.kt:601)');
    }
    var tmp0 = get_value(CircularProgressIndicatorTokens_getInstance().qbr_1, $composer_0, 6);
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  protoOf(ProgressIndicatorDefaults).pbr = function ($composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-404222247);
    sourceInformation($composer_0, 'C:ProgressIndicator.kt#uh7d8r');
    if (isTraceInProgress()) {
      traceEventStart(-404222247, $changed, -1, 'androidx.compose.material3.ProgressIndicatorDefaults.<get-circularTrackColor> (ProgressIndicator.kt:608)');
    }
    var tmp0 = Companion_getInstance().m3r_1;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  };
  var ProgressIndicatorDefaults_instance;
  function ProgressIndicatorDefaults_getInstance() {
    if (ProgressIndicatorDefaults_instance == null)
      new ProgressIndicatorDefaults();
    return ProgressIndicatorDefaults_instance;
  }
  function drawCircularIndicatorTrack(_this__u8e3s4, color, stroke) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return drawCircularIndicator(_this__u8e3s4, 0.0, 360.0, color, stroke);
  }
  function drawIndeterminateCircularIndicator(_this__u8e3s4, startAngle, strokeWidth, sweep, color, stroke) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    var tmp;
    if (stroke.z41_1 === Companion_getInstance_1().g3y_1) {
      tmp = 0.0;
    } else {
      var tmp_0 = 180.0 / get_PI();
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      // Inline function 'androidx.compose.ui.unit.Dp.div' call
      var this_0 = get_CircularIndicatorDiameter();
      var other = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) / 2);
      tmp = tmp_0 * (_Dp___get_value__impl__geb1vb(strokeWidth) / _Dp___get_value__impl__geb1vb(other)) / 2.0;
    }
    var strokeCapOffset = tmp;
    var adjustedStartAngle = startAngle + strokeCapOffset;
    // Inline function 'kotlin.math.max' call
    var adjustedSweep = Math.max(sweep, 0.1);
    drawCircularIndicator(_this__u8e3s4, adjustedStartAngle, adjustedSweep, color, stroke);
  }
  function drawCircularIndicator(_this__u8e3s4, startAngle, sweep, color, stroke) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    var diameterOffset = stroke.x41_1 / 2;
    var arcDimen = _Size___get_width__impl__58y75t(_this__u8e3s4.g34()) - 2 * diameterOffset;
    _this__u8e3s4.h43(color, startAngle, sweep, false, Offset(diameterOffset, diameterOffset), Size(arcDimen, arcDimen), VOID, stroke);
  }
  function IncreaseSemanticsBounds$lambda($this$layout, measurable, constraints) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    var paddingPx = $this$layout.z35(get_SemanticsBoundsPadding());
    var newConstraint = offset(constraints.s35_1, 0, imul(paddingPx, 2));
    var placeable = measurable.m57(newConstraint);
    var height = placeable.o57_1 - imul(paddingPx, 2) | 0;
    var width = placeable.n57_1;
    return $this$layout.s57(width, height, VOID, IncreaseSemanticsBounds$lambda$lambda(placeable, paddingPx));
  }
  function IncreaseSemanticsBounds$lambda$lambda($placeable, $paddingPx) {
    return function ($this$layout) {
      $this$layout.d5s($placeable, 0, -$paddingPx | 0);
      return Unit_instance;
    };
  }
  function IncreaseSemanticsBounds$lambda_0($this$semantics) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    return Unit_instance;
  }
  function CircularProgressIndicator$lambda($this$keyframes) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    $this$keyframes.w7j_1 = 1332;
    $this$keyframes.z7j($this$keyframes.v7j(0.0, 0), get_CircularEasing());
    $this$keyframes.v7j(290.0, 666);
    return Unit_instance;
  }
  function CircularProgressIndicator$lambda_0($this$keyframes) {
    _init_properties_ProgressIndicator_kt__3rbzw0();
    $this$keyframes.w7j_1 = 1332;
    $this$keyframes.z7j($this$keyframes.v7j(0.0, 666), get_CircularEasing());
    $this$keyframes.v7j(290.0, $this$keyframes.w7j_1);
    return Unit_instance;
  }
  function CircularProgressIndicator$lambda_1($trackColor, $stroke, $currentRotation, $endAngle, $startAngle, $baseRotation, $strokeWidth, $color) {
    return function ($this$Canvas) {
      drawCircularIndicatorTrack($this$Canvas, $trackColor._v.x3t_1, $stroke);
      var currentRotationAngleOffset = $currentRotation.s2() * 216.0 % 360.0;
      // Inline function 'kotlin.math.abs' call
      var x = $endAngle.s2() - $startAngle.s2();
      var sweep = Math.abs(x);
      var offset = -90.0 + currentRotationAngleOffset + $baseRotation.s2();
      drawIndeterminateCircularIndicator($this$Canvas, $startAngle.s2() + offset, $strokeWidth._v.o36_1, sweep, $color._v.x3t_1, $stroke);
      return Unit_instance;
    };
  }
  function CircularProgressIndicator$lambda_2($modifier, $color, $strokeWidth, $trackColor, $strokeCap, $$changed, $$default) {
    return function ($composer, $force) {
      CircularProgressIndicator($modifier._v, $color._v.x3t_1, $strokeWidth._v.o36_1, $trackColor._v.x3t_1, $strokeCap._v.j3y_1, $composer, updateChangedFlags($$changed | 1), $$default);
      return Unit_instance;
    };
  }
  var properties_initialized_ProgressIndicator_kt_5iutny;
  function _init_properties_ProgressIndicator_kt__3rbzw0() {
    if (!properties_initialized_ProgressIndicator_kt_5iutny) {
      properties_initialized_ProgressIndicator_kt_5iutny = true;
      // Inline function 'androidx.compose.ui.unit.dp' call
      SemanticsBoundsPadding = _Dp___init__impl__ms3zkb(10);
      var tmp = Companion_instance;
      var tmp_0 = layout(tmp, IncreaseSemanticsBounds$lambda);
      IncreaseSemanticsBounds = padding(semantics(tmp_0, true, IncreaseSemanticsBounds$lambda_0), VOID, get_SemanticsBoundsPadding());
      // Inline function 'androidx.compose.ui.unit.dp' call
      LinearIndicatorWidth = _Dp___init__impl__ms3zkb(240);
      LinearIndicatorHeight = LinearProgressIndicatorTokens_getInstance().gbs_1;
      // Inline function 'androidx.compose.ui.unit.Dp.minus' call
      var this_0 = CircularProgressIndicatorTokens_getInstance().xbr_1;
      // Inline function 'androidx.compose.ui.unit.Dp.times' call
      var this_1 = CircularProgressIndicatorTokens_getInstance().sbr_1;
      var other = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_1) * 2);
      CircularIndicatorDiameter = _Dp___init__impl__ms3zkb(_Dp___get_value__impl__geb1vb(this_0) - _Dp___get_value__impl__geb1vb(other));
      FirstLineHeadEasing = new CubicBezierEasing(0.2, 0.0, 0.8, 1.0);
      FirstLineTailEasing = new CubicBezierEasing(0.4, 0.0, 1.0, 1.0);
      SecondLineHeadEasing = new CubicBezierEasing(0.0, 0.0, 0.65, 1.0);
      SecondLineTailEasing = new CubicBezierEasing(0.1, 0.0, 0.45, 1.0);
      CircularEasing = new CubicBezierEasing(0.4, 0.0, 0.2, 1.0);
    }
  }
  function get_LocalShapes() {
    _init_properties_Shapes_kt__48nj2q();
    return LocalShapes;
  }
  var LocalShapes;
  function Shapes(extraSmall, small, medium, large, extraLarge) {
    extraSmall = extraSmall === VOID ? ShapeDefaults_getInstance().ibs_1 : extraSmall;
    small = small === VOID ? ShapeDefaults_getInstance().jbs_1 : small;
    medium = medium === VOID ? ShapeDefaults_getInstance().kbs_1 : medium;
    large = large === VOID ? ShapeDefaults_getInstance().lbs_1 : large;
    extraLarge = extraLarge === VOID ? ShapeDefaults_getInstance().mbs_1 : extraLarge;
    this.nbs_1 = extraSmall;
    this.obs_1 = small;
    this.pbs_1 = medium;
    this.qbs_1 = large;
    this.rbs_1 = extraLarge;
  }
  protoOf(Shapes).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Shapes))
      return false;
    if (!equals(this.nbs_1, other.nbs_1))
      return false;
    if (!equals(this.obs_1, other.obs_1))
      return false;
    if (!equals(this.pbs_1, other.pbs_1))
      return false;
    if (!equals(this.qbs_1, other.qbs_1))
      return false;
    if (!equals(this.rbs_1, other.rbs_1))
      return false;
    return true;
  };
  protoOf(Shapes).hashCode = function () {
    var result = hashCode(this.nbs_1);
    result = imul(31, result) + hashCode(this.obs_1) | 0;
    result = imul(31, result) + hashCode(this.pbs_1) | 0;
    result = imul(31, result) + hashCode(this.qbs_1) | 0;
    result = imul(31, result) + hashCode(this.rbs_1) | 0;
    return result;
  };
  protoOf(Shapes).toString = function () {
    return 'Shapes(' + ('extraSmall=' + this.nbs_1 + ', ') + ('small=' + this.obs_1 + ', ') + ('medium=' + this.pbs_1 + ', ') + ('large=' + this.qbs_1 + ', ') + ('extraLarge=' + this.rbs_1 + ')');
  };
  function ShapeDefaults() {
    ShapeDefaults_instance = this;
    this.ibs_1 = ShapeTokens_getInstance().ubs_1;
    this.jbs_1 = ShapeTokens_getInstance().cbt_1;
    this.kbs_1 = ShapeTokens_getInstance().abt_1;
    this.lbs_1 = ShapeTokens_getInstance().xbs_1;
    this.mbs_1 = ShapeTokens_getInstance().sbs_1;
  }
  var ShapeDefaults_instance;
  function ShapeDefaults_getInstance() {
    if (ShapeDefaults_instance == null)
      new ShapeDefaults();
    return ShapeDefaults_instance;
  }
  function LocalShapes$lambda() {
    _init_properties_Shapes_kt__48nj2q();
    return new Shapes();
  }
  var properties_initialized_Shapes_kt_91wqbw;
  function _init_properties_Shapes_kt__48nj2q() {
    if (!properties_initialized_Shapes_kt_91wqbw) {
      properties_initialized_Shapes_kt_91wqbw = true;
      LocalShapes = staticCompositionLocalOf(LocalShapes$lambda);
    }
  }
  function get_LocalTextStyle() {
    _init_properties_Text_kt__l2j80d();
    return LocalTextStyle;
  }
  var LocalTextStyle;
  function Text(text, modifier, color, fontSize, fontStyle, fontWeight, fontFamily, letterSpacing, textDecoration, textAlign, lineHeight, overflow, softWrap, maxLines, minLines, onTextLayout, style, $composer, $changed, $changed1, $default) {
    _init_properties_Text_kt__l2j80d();
    var modifier_0 = {_v: modifier};
    var color_0 = {_v: new Color(color)};
    var fontSize_0 = {_v: new TextUnit(fontSize)};
    var tmp = fontStyle;
    var fontStyle_0 = {_v: tmp == null ? null : new FontStyle(tmp)};
    var fontWeight_0 = {_v: fontWeight};
    var fontFamily_0 = {_v: fontFamily};
    var letterSpacing_0 = {_v: new TextUnit(letterSpacing)};
    var textDecoration_0 = {_v: textDecoration};
    var tmp_0 = textAlign;
    var textAlign_0 = {_v: tmp_0 == null ? null : new TextAlign(tmp_0)};
    var lineHeight_0 = {_v: new TextUnit(lineHeight)};
    var overflow_0 = {_v: new TextOverflow(overflow)};
    var softWrap_0 = {_v: softWrap};
    var maxLines_0 = {_v: maxLines};
    var minLines_0 = {_v: minLines};
    var onTextLayout_0 = {_v: onTextLayout};
    var style_0 = {_v: style};
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-2055108902);
    sourceInformation($composer_0, 'C(Text)P(14,9,0:c#ui.graphics.Color,2:c#ui.unit.TextUnit,3:c#ui.text.font.FontStyle,4!1,5:c#ui.unit.TextUnit,16,15:c#ui.text.style.TextAlign,6:c#ui.unit.TextUnit,11:c#ui.text.style.TextOverflow,12)108@5588L7,117@5732L530:Text.kt#uh7d8r');
    var $dirty = $changed;
    var $dirty1 = $changed1;
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
      $dirty = $dirty | ($composer_0.m1y(_ULong___get_data__impl__fggpzb(_Color___get_value__impl__1pls5m(color_0._v.x3t_1))) ? 256 : 128);
    if (!(($default & 8) === 0))
      $dirty = $dirty | 3072;
    else if (($changed & 7168) === 0)
      $dirty = $dirty | ($composer_0.m1y(_TextUnit___get_packedValue__impl__it60w4(fontSize_0._v.h37_1)) ? 2048 : 1024);
    if (!(($default & 16) === 0))
      $dirty = $dirty | 24576;
    else if (($changed & 57344) === 0)
      $dirty = $dirty | ($composer_0.v1o(fontStyle_0._v) ? 16384 : 8192);
    if (!(($default & 32) === 0))
      $dirty = $dirty | 196608;
    else if (($changed & 458752) === 0)
      $dirty = $dirty | ($composer_0.v1o(fontWeight_0._v) ? 131072 : 65536);
    if (!(($default & 64) === 0))
      $dirty = $dirty | 1572864;
    else if (($changed & 3670016) === 0)
      $dirty = $dirty | ($composer_0.v1o(fontFamily_0._v) ? 1048576 : 524288);
    if (!(($default & 128) === 0))
      $dirty = $dirty | 12582912;
    else if (($changed & 29360128) === 0)
      $dirty = $dirty | ($composer_0.m1y(_TextUnit___get_packedValue__impl__it60w4(letterSpacing_0._v.h37_1)) ? 8388608 : 4194304);
    if (!(($default & 256) === 0))
      $dirty = $dirty | 100663296;
    else if (($changed & 234881024) === 0)
      $dirty = $dirty | ($composer_0.v1o(textDecoration_0._v) ? 67108864 : 33554432);
    if (!(($default & 512) === 0))
      $dirty = $dirty | 805306368;
    else if (($changed & 1879048192) === 0)
      $dirty = $dirty | ($composer_0.v1o(textAlign_0._v) ? 536870912 : 268435456);
    if (!(($default & 1024) === 0))
      $dirty1 = $dirty1 | 6;
    else if (($changed1 & 14) === 0)
      $dirty1 = $dirty1 | ($composer_0.m1y(_TextUnit___get_packedValue__impl__it60w4(lineHeight_0._v.h37_1)) ? 4 : 2);
    if (!(($default & 2048) === 0))
      $dirty1 = $dirty1 | 48;
    else if (($changed1 & 112) === 0)
      $dirty1 = $dirty1 | ($composer_0.n1y(_TextOverflow___get_value__impl__vugm5i(overflow_0._v.r4l_1)) ? 32 : 16);
    if (!(($default & 4096) === 0))
      $dirty1 = $dirty1 | 384;
    else if (($changed1 & 896) === 0)
      $dirty1 = $dirty1 | ($composer_0.k1y(softWrap_0._v) ? 256 : 128);
    if (!(($default & 8192) === 0))
      $dirty1 = $dirty1 | 3072;
    else if (($changed1 & 7168) === 0)
      $dirty1 = $dirty1 | ($composer_0.n1y(maxLines_0._v) ? 2048 : 1024);
    if (!(($default & 16384) === 0))
      $dirty1 = $dirty1 | 24576;
    else if (($changed1 & 57344) === 0)
      $dirty1 = $dirty1 | ($composer_0.n1y(minLines_0._v) ? 16384 : 8192);
    if (!(($default & 32768) === 0))
      $dirty1 = $dirty1 | 196608;
    else if (($changed1 & 458752) === 0)
      $dirty1 = $dirty1 | ($composer_0.j1y(onTextLayout_0._v) ? 131072 : 65536);
    if (($changed1 & 3670016) === 0)
      $dirty1 = $dirty1 | ((($default & 65536) === 0 ? $composer_0.v1o(style_0._v) : false) ? 1048576 : 524288);
    if ((!(($dirty & 1533916891) === 306783378) ? true : !(($dirty1 & 2995931) === 599186)) ? true : !$composer_0.f1x()) {
      $composer_0.j1x();
      if (($changed & 1) === 0 ? true : $composer_0.n1x()) {
        if (!(($default & 2) === 0)) {
          modifier_0._v = Companion_instance;
        }
        if (!(($default & 4) === 0)) {
          color_0._v = new Color(Companion_getInstance().n3r_1);
        }
        if (!(($default & 8) === 0)) {
          fontSize_0._v = new TextUnit(Companion_getInstance_2().f37_1);
        }
        if (!(($default & 16) === 0)) {
          fontStyle_0._v = null;
        }
        if (!(($default & 32) === 0)) {
          fontWeight_0._v = null;
        }
        if (!(($default & 64) === 0)) {
          fontFamily_0._v = null;
        }
        if (!(($default & 128) === 0)) {
          letterSpacing_0._v = new TextUnit(Companion_getInstance_2().f37_1);
        }
        if (!(($default & 256) === 0)) {
          textDecoration_0._v = null;
        }
        if (!(($default & 512) === 0)) {
          textAlign_0._v = null;
        }
        if (!(($default & 1024) === 0)) {
          lineHeight_0._v = new TextUnit(Companion_getInstance_2().f37_1);
        }
        if (!(($default & 2048) === 0)) {
          overflow_0._v = new TextOverflow(Companion_getInstance_3().o4l_1);
        }
        if (!(($default & 4096) === 0)) {
          softWrap_0._v = true;
        }
        if (!(($default & 8192) === 0)) {
          maxLines_0._v = IntCompanionObject_instance.MAX_VALUE;
        }
        if (!(($default & 16384) === 0)) {
          minLines_0._v = 1;
        }
        if (!(($default & 32768) === 0)) {
          onTextLayout_0._v = null;
        }
        if (!(($default & 65536) === 0)) {
          // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
          var this_0 = get_LocalTextStyle();
          var $composer_1 = $composer_0;
          sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
          var tmp0 = $composer_1.j1z(this_0);
          sourceInformationMarkerEnd($composer_1);
          style_0._v = tmp0;
          $dirty1 = $dirty1 & -3670017;
        }
      } else {
        $composer_0.q1r();
        if (!(($default & 65536) === 0))
          $dirty1 = $dirty1 & -3670017;
      }
      $composer_0.k1x();
      if (isTraceInProgress()) {
        traceEventStart(-2055108902, $dirty, $dirty1, 'androidx.compose.material3.Text (Text.kt:109)');
      }
      $composer_0.j1l(-1827893933);
      sourceInformation($composer_0, '');
      // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
      var this_1 = color_0._v.x3t_1;
      var tmp_1;
      // Inline function 'androidx.compose.ui.graphics.isSpecified' call
      if (!equals(_Color___get_value__impl__1pls5m(this_1), _Color___get_value__impl__1pls5m(Companion_getInstance().n3r_1))) {
        tmp_1 = this_1;
      } else {
        // Inline function 'androidx.compose.material3.Text.<anonymous>' call
        $composer_0.j1l(-1827892916);
        sourceInformation($composer_0, '*113@5703L7');
        // Inline function 'androidx.compose.ui.graphics.takeOrElse' call
        var this_2 = style_0._v.p3r();
        var tmp_2;
        // Inline function 'androidx.compose.ui.graphics.isSpecified' call
        if (!equals(_Color___get_value__impl__1pls5m(this_2), _Color___get_value__impl__1pls5m(Companion_getInstance().n3r_1))) {
          tmp_2 = this_2;
        } else {
          // Inline function 'androidx.compose.material3.Text.<anonymous>.<anonymous>' call
          // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
          var this_3 = get_LocalContentColor();
          var $composer_2 = $composer_0;
          sourceInformationMarkerStart($composer_2, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
          var tmp0_0 = $composer_2.j1z(this_3);
          sourceInformationMarkerEnd($composer_2);
          tmp_2 = tmp0_0.x3t_1;
        }
        var tmp0_group = tmp_2;
        $composer_0.l1l();
        tmp_1 = tmp0_group;
      }
      var tmp0_group_0 = tmp_1;
      $composer_0.l1l();
      var textColor = tmp0_group_0;
      var tmp_3 = modifier_0._v;
      var tmp_4 = textAlign_0._v;
      var tmp0_elvis_lhs = tmp_4 == null ? null : tmp_4.b4l_1;
      var tmp_5;
      var tmp_6 = tmp0_elvis_lhs;
      if ((tmp_6 == null ? null : new TextAlign(tmp_6)) == null) {
        tmp_5 = Companion_getInstance_4().v47_1;
      } else {
        tmp_5 = tmp0_elvis_lhs;
      }
      var tmp1_textAlign = tmp_5;
      var tmp_7 = style_0._v;
      var tmp_8 = fontSize_0._v;
      var tmp_9 = fontWeight_0._v;
      var tmp_10 = fontStyle_0._v;
      var tmp_11 = tmp_7.l4c(textColor, tmp_8.h37_1, tmp_9, tmp_10 == null ? null : tmp_10.a4k_1, VOID, fontFamily_0._v, VOID, letterSpacing_0._v.h37_1, VOID, VOID, VOID, VOID, textDecoration_0._v, VOID, VOID, tmp1_textAlign, VOID, lineHeight_0._v.h37_1);
      var tmp_12 = onTextLayout_0._v;
      var tmp_13 = overflow_0._v;
      var tmp_14 = softWrap_0._v;
      var tmp_15 = maxLines_0._v;
      var tmp_16 = minLines_0._v;
      BasicText(text, tmp_3, tmp_11, tmp_12, tmp_13.r4l_1, tmp_14, tmp_15, tmp_16, null, $composer_0, 14 & $dirty | 112 & $dirty | 7168 & $dirty1 >> 6 | 57344 & $dirty1 << 9 | 458752 & $dirty1 << 9 | 3670016 & $dirty1 << 9 | 29360128 & $dirty1 << 9, 256);
      if (isTraceInProgress()) {
        traceEventEnd();
      }
    } else {
      $composer_0.q1r();
    }
    var tmp1_safe_receiver = $composer_0.m20();
    if (tmp1_safe_receiver == null)
      null;
    else {
      tmp1_safe_receiver.j24(Text$lambda(text, modifier_0, color_0, fontSize_0, fontStyle_0, fontWeight_0, fontFamily_0, letterSpacing_0, textDecoration_0, textAlign_0, lineHeight_0, overflow_0, softWrap_0, maxLines_0, minLines_0, onTextLayout_0, style_0, $changed, $changed1, $default));
    }
  }
  function ProvideTextStyle(value, content, $composer, $changed) {
    _init_properties_Text_kt__l2j80d();
    var $composer_0 = $composer;
    $composer_0 = $composer_0.l20(-460300127);
    sourceInformation($composer_0, 'C(ProvideTextStyle)P(1)350@14496L7,351@14521L80:Text.kt#uh7d8r');
    var $dirty = $changed;
    if (($changed & 14) === 0)
      $dirty = $dirty | ($composer_0.v1o(value) ? 4 : 2);
    if (($changed & 112) === 0)
      $dirty = $dirty | ($composer_0.j1y(content) ? 32 : 16);
    if (!(($dirty & 91) === 18) ? true : !$composer_0.f1x()) {
      if (isTraceInProgress()) {
        traceEventStart(-460300127, $dirty, -1, 'androidx.compose.material3.ProvideTextStyle (Text.kt:349)');
      }
      // Inline function 'androidx.compose.runtime.CompositionLocal.current' call
      var this_0 = get_LocalTextStyle();
      var $composer_1 = $composer_0;
      sourceInformationMarkerStart($composer_1, 2023513938, 'CC:CompositionLocal.kt#9igjgp');
      var tmp0 = $composer_1.j1z(this_0);
      sourceInformationMarkerEnd($composer_1);
      var mergedStyle = tmp0.j4c(value);
      CompositionLocalProvider_0(get_LocalTextStyle().g24(mergedStyle), content, $composer_0, 0 | 112 & $dirty);
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
      tmp0_safe_receiver.j24(ProvideTextStyle$lambda(value, content, $changed));
    }
  }
  function LocalTextStyle$lambda() {
    _init_properties_Text_kt__l2j80d();
    return get_DefaultTextStyle();
  }
  function Text$lambda($text, $modifier, $color, $fontSize, $fontStyle, $fontWeight, $fontFamily, $letterSpacing, $textDecoration, $textAlign, $lineHeight, $overflow, $softWrap, $maxLines, $minLines, $onTextLayout, $style, $$changed, $$changed1, $$default) {
    return function ($composer, $force) {
      var tmp = $modifier._v;
      var tmp_0 = $color._v;
      var tmp_1 = $fontSize._v;
      var tmp_2 = $fontStyle._v;
      var tmp_3 = tmp_2 == null ? null : tmp_2.a4k_1;
      var tmp_4 = $fontWeight._v;
      var tmp_5 = $fontFamily._v;
      var tmp_6 = $letterSpacing._v;
      var tmp_7 = $textDecoration._v;
      var tmp_8 = $textAlign._v;
      Text($text, tmp, tmp_0.x3t_1, tmp_1.h37_1, tmp_3, tmp_4, tmp_5, tmp_6.h37_1, tmp_7, tmp_8 == null ? null : tmp_8.b4l_1, $lineHeight._v.h37_1, $overflow._v.r4l_1, $softWrap._v, $maxLines._v, $minLines._v, $onTextLayout._v, $style._v, $composer, updateChangedFlags($$changed | 1), updateChangedFlags($$changed1), $$default);
      return Unit_instance;
    };
  }
  function ProvideTextStyle$lambda($value, $content, $$changed) {
    return function ($composer, $force) {
      ProvideTextStyle($value, $content, $composer, updateChangedFlags($$changed | 1));
      return Unit_instance;
    };
  }
  var properties_initialized_Text_kt_kgdrtb;
  function _init_properties_Text_kt__l2j80d() {
    if (!properties_initialized_Text_kt_kgdrtb) {
      properties_initialized_Text_kt_kgdrtb = true;
      var tmp = structuralEqualityPolicy();
      LocalTextStyle = compositionLocalOf(tmp, LocalTextStyle$lambda);
    }
  }
  function get_LocalTypography() {
    _init_properties_Typography_kt__rm3fch();
    return LocalTypography;
  }
  var LocalTypography;
  function Typography(displayLarge, displayMedium, displaySmall, headlineLarge, headlineMedium, headlineSmall, titleLarge, titleMedium, titleSmall, bodyLarge, bodyMedium, bodySmall, labelLarge, labelMedium, labelSmall) {
    displayLarge = displayLarge === VOID ? TypographyTokens_getInstance().gbt_1 : displayLarge;
    displayMedium = displayMedium === VOID ? TypographyTokens_getInstance().hbt_1 : displayMedium;
    displaySmall = displaySmall === VOID ? TypographyTokens_getInstance().ibt_1 : displaySmall;
    headlineLarge = headlineLarge === VOID ? TypographyTokens_getInstance().jbt_1 : headlineLarge;
    headlineMedium = headlineMedium === VOID ? TypographyTokens_getInstance().kbt_1 : headlineMedium;
    headlineSmall = headlineSmall === VOID ? TypographyTokens_getInstance().lbt_1 : headlineSmall;
    titleLarge = titleLarge === VOID ? TypographyTokens_getInstance().pbt_1 : titleLarge;
    titleMedium = titleMedium === VOID ? TypographyTokens_getInstance().qbt_1 : titleMedium;
    titleSmall = titleSmall === VOID ? TypographyTokens_getInstance().rbt_1 : titleSmall;
    bodyLarge = bodyLarge === VOID ? TypographyTokens_getInstance().dbt_1 : bodyLarge;
    bodyMedium = bodyMedium === VOID ? TypographyTokens_getInstance().ebt_1 : bodyMedium;
    bodySmall = bodySmall === VOID ? TypographyTokens_getInstance().fbt_1 : bodySmall;
    labelLarge = labelLarge === VOID ? TypographyTokens_getInstance().mbt_1 : labelLarge;
    labelMedium = labelMedium === VOID ? TypographyTokens_getInstance().nbt_1 : labelMedium;
    labelSmall = labelSmall === VOID ? TypographyTokens_getInstance().obt_1 : labelSmall;
    this.ubq_1 = displayLarge;
    this.vbq_1 = displayMedium;
    this.wbq_1 = displaySmall;
    this.xbq_1 = headlineLarge;
    this.ybq_1 = headlineMedium;
    this.zbq_1 = headlineSmall;
    this.abr_1 = titleLarge;
    this.bbr_1 = titleMedium;
    this.cbr_1 = titleSmall;
    this.dbr_1 = bodyLarge;
    this.ebr_1 = bodyMedium;
    this.fbr_1 = bodySmall;
    this.gbr_1 = labelLarge;
    this.hbr_1 = labelMedium;
    this.ibr_1 = labelSmall;
  }
  protoOf(Typography).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof Typography))
      return false;
    if (!this.ubq_1.equals(other.ubq_1))
      return false;
    if (!this.vbq_1.equals(other.vbq_1))
      return false;
    if (!this.wbq_1.equals(other.wbq_1))
      return false;
    if (!this.xbq_1.equals(other.xbq_1))
      return false;
    if (!this.ybq_1.equals(other.ybq_1))
      return false;
    if (!this.zbq_1.equals(other.zbq_1))
      return false;
    if (!this.abr_1.equals(other.abr_1))
      return false;
    if (!this.bbr_1.equals(other.bbr_1))
      return false;
    if (!this.cbr_1.equals(other.cbr_1))
      return false;
    if (!this.dbr_1.equals(other.dbr_1))
      return false;
    if (!this.ebr_1.equals(other.ebr_1))
      return false;
    if (!this.fbr_1.equals(other.fbr_1))
      return false;
    if (!this.gbr_1.equals(other.gbr_1))
      return false;
    if (!this.hbr_1.equals(other.hbr_1))
      return false;
    if (!this.ibr_1.equals(other.ibr_1))
      return false;
    return true;
  };
  protoOf(Typography).hashCode = function () {
    var result = this.ubq_1.hashCode();
    result = imul(31, result) + this.vbq_1.hashCode() | 0;
    result = imul(31, result) + this.wbq_1.hashCode() | 0;
    result = imul(31, result) + this.xbq_1.hashCode() | 0;
    result = imul(31, result) + this.ybq_1.hashCode() | 0;
    result = imul(31, result) + this.zbq_1.hashCode() | 0;
    result = imul(31, result) + this.abr_1.hashCode() | 0;
    result = imul(31, result) + this.bbr_1.hashCode() | 0;
    result = imul(31, result) + this.cbr_1.hashCode() | 0;
    result = imul(31, result) + this.dbr_1.hashCode() | 0;
    result = imul(31, result) + this.ebr_1.hashCode() | 0;
    result = imul(31, result) + this.fbr_1.hashCode() | 0;
    result = imul(31, result) + this.gbr_1.hashCode() | 0;
    result = imul(31, result) + this.hbr_1.hashCode() | 0;
    result = imul(31, result) + this.ibr_1.hashCode() | 0;
    return result;
  };
  protoOf(Typography).toString = function () {
    return 'Typography(displayLarge=' + this.ubq_1 + ', displayMedium=' + this.vbq_1 + ',' + ('displaySmall=' + this.wbq_1 + ', ') + ('headlineLarge=' + this.xbq_1 + ', headlineMedium=' + this.ybq_1 + ',') + (' headlineSmall=' + this.zbq_1 + ', ') + ('titleLarge=' + this.abr_1 + ', titleMedium=' + this.bbr_1 + ', titleSmall=' + this.cbr_1 + ', ') + ('bodyLarge=' + this.dbr_1 + ', bodyMedium=' + this.ebr_1 + ', bodySmall=' + this.fbr_1 + ', ') + ('labelLarge=' + this.gbr_1 + ', labelMedium=' + this.hbr_1 + ', labelSmall=' + this.ibr_1 + ')');
  };
  function LocalTypography$lambda() {
    _init_properties_Typography_kt__rm3fch();
    return new Typography();
  }
  var properties_initialized_Typography_kt_bpd27j;
  function _init_properties_Typography_kt__rm3fch() {
    if (!properties_initialized_Typography_kt_bpd27j) {
      properties_initialized_Typography_kt_bpd27j = true;
      LocalTypography = staticCompositionLocalOf(LocalTypography$lambda);
    }
  }
  function CircularProgressIndicatorTokens() {
    CircularProgressIndicatorTokens_instance = this;
    this.qbr_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.rbr_1 = ShapeKeyTokens_CornerNone_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.sbr_1 = _Dp___init__impl__ms3zkb(4.0);
    this.tbr_1 = ColorSchemeKeyTokens_TertiaryContainer_getInstance();
    this.ubr_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.vbr_1 = ColorSchemeKeyTokens_Tertiary_getInstance();
    this.wbr_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.xbr_1 = _Dp___init__impl__ms3zkb(48.0);
  }
  var CircularProgressIndicatorTokens_instance;
  function CircularProgressIndicatorTokens_getInstance() {
    if (CircularProgressIndicatorTokens_instance == null)
      new CircularProgressIndicatorTokens();
    return CircularProgressIndicatorTokens_instance;
  }
  function ColorDarkTokens() {
    ColorDarkTokens_instance = this;
    this.wbo_1 = PaletteTokens_getInstance().hbu_1;
    this.xbo_1 = PaletteTokens_getInstance().cbu_1;
    this.ybo_1 = PaletteTokens_getInstance().xbt_1;
    this.zbo_1 = PaletteTokens_getInstance().lbu_1;
    this.abp_1 = PaletteTokens_getInstance().wbv_1;
    this.bbp_1 = PaletteTokens_getInstance().xbu_1;
    this.cbp_1 = PaletteTokens_getInstance().xbu_1;
    this.dbp_1 = PaletteTokens_getInstance().wbt_1;
    this.ebp_1 = PaletteTokens_getInstance().dbu_1;
    this.fbp_1 = PaletteTokens_getInstance().ubv_1;
    this.gbp_1 = PaletteTokens_getInstance().bbw_1;
    this.hbp_1 = PaletteTokens_getInstance().sbv_1;
    this.ibp_1 = PaletteTokens_getInstance().vbv_1;
    this.jbp_1 = PaletteTokens_getInstance().hbw_1;
    this.kbp_1 = PaletteTokens_getInstance().obw_1;
    this.lbp_1 = PaletteTokens_getInstance().fbw_1;
    this.mbp_1 = PaletteTokens_getInstance().ibw_1;
    this.nbp_1 = PaletteTokens_getInstance().xbu_1;
    this.obp_1 = PaletteTokens_getInstance().nbv_1;
    this.pbp_1 = PaletteTokens_getInstance().ubw_1;
    this.qbp_1 = PaletteTokens_getInstance().bbx_1;
    this.rbp_1 = PaletteTokens_getInstance().sbw_1;
    this.sbp_1 = PaletteTokens_getInstance().vbw_1;
    this.tbp_1 = PaletteTokens_getInstance().lbv_1;
    this.ubp_1 = PaletteTokens_getInstance().ibv_1;
    this.vbp_1 = PaletteTokens_getInstance().abw_1;
    this.wbp_1 = PaletteTokens_getInstance().vbv_1;
    this.xbp_1 = PaletteTokens_getInstance().bbw_1;
    this.ybp_1 = PaletteTokens_getInstance().abw_1;
    this.zbp_1 = PaletteTokens_getInstance().gbu_1;
    this.abq_1 = PaletteTokens_getInstance().nbw_1;
    this.bbq_1 = PaletteTokens_getInstance().ibw_1;
    this.cbq_1 = PaletteTokens_getInstance().obw_1;
    this.dbq_1 = PaletteTokens_getInstance().nbw_1;
    this.ebq_1 = PaletteTokens_getInstance().hbu_1;
    this.fbq_1 = PaletteTokens_getInstance().nbu_1;
    this.gbq_1 = PaletteTokens_getInstance().jbu_1;
    this.hbq_1 = PaletteTokens_getInstance().kbu_1;
    this.ibq_1 = PaletteTokens_getInstance().mbu_1;
    this.jbq_1 = PaletteTokens_getInstance().hbu_1;
    this.kbq_1 = PaletteTokens_getInstance().pbu_1;
    this.lbq_1 = PaletteTokens_getInstance().sbu_1;
    this.mbq_1 = this.vbp_1;
    this.nbq_1 = PaletteTokens_getInstance().ibv_1;
    this.obq_1 = PaletteTokens_getInstance().abx_1;
    this.pbq_1 = PaletteTokens_getInstance().vbw_1;
    this.qbq_1 = PaletteTokens_getInstance().bbx_1;
    this.rbq_1 = PaletteTokens_getInstance().abx_1;
  }
  var ColorDarkTokens_instance;
  function ColorDarkTokens_getInstance() {
    if (ColorDarkTokens_instance == null)
      new ColorDarkTokens();
    return ColorDarkTokens_instance;
  }
  function ColorLightTokens() {
    ColorLightTokens_instance = this;
    this.zbm_1 = PaletteTokens_getInstance().dbv_1;
    this.abn_1 = PaletteTokens_getInstance().ybt_1;
    this.bbn_1 = PaletteTokens_getInstance().dbu_1;
    this.cbn_1 = PaletteTokens_getInstance().abv_1;
    this.dbn_1 = PaletteTokens_getInstance().abw_1;
    this.ebn_1 = PaletteTokens_getInstance().lbu_1;
    this.fbn_1 = PaletteTokens_getInstance().hbu_1;
    this.gbn_1 = PaletteTokens_getInstance().vbt_1;
    this.hbn_1 = PaletteTokens_getInstance().ubt_1;
    this.ibn_1 = PaletteTokens_getInstance().tbv_1;
    this.jbn_1 = PaletteTokens_getInstance().sbv_1;
    this.kbn_1 = PaletteTokens_getInstance().sbv_1;
    this.lbn_1 = PaletteTokens_getInstance().vbv_1;
    this.mbn_1 = PaletteTokens_getInstance().gbw_1;
    this.nbn_1 = PaletteTokens_getInstance().fbw_1;
    this.obn_1 = PaletteTokens_getInstance().fbw_1;
    this.pbn_1 = PaletteTokens_getInstance().ibw_1;
    this.qbn_1 = PaletteTokens_getInstance().hbu_1;
    this.rbn_1 = PaletteTokens_getInstance().ibv_1;
    this.sbn_1 = PaletteTokens_getInstance().tbw_1;
    this.tbn_1 = PaletteTokens_getInstance().sbw_1;
    this.ubn_1 = PaletteTokens_getInstance().sbw_1;
    this.vbn_1 = PaletteTokens_getInstance().vbw_1;
    this.wbn_1 = PaletteTokens_getInstance().kbv_1;
    this.xbn_1 = PaletteTokens_getInstance().nbv_1;
    this.ybn_1 = PaletteTokens_getInstance().wbv_1;
    this.zbn_1 = PaletteTokens_getInstance().bbw_1;
    this.abo_1 = PaletteTokens_getInstance().bbw_1;
    this.bbo_1 = PaletteTokens_getInstance().abw_1;
    this.cbo_1 = PaletteTokens_getInstance().gbu_1;
    this.dbo_1 = PaletteTokens_getInstance().jbw_1;
    this.ebo_1 = PaletteTokens_getInstance().obw_1;
    this.fbo_1 = PaletteTokens_getInstance().obw_1;
    this.gbo_1 = PaletteTokens_getInstance().nbw_1;
    this.hbo_1 = PaletteTokens_getInstance().dbv_1;
    this.ibo_1 = PaletteTokens_getInstance().cbv_1;
    this.jbo_1 = PaletteTokens_getInstance().zbu_1;
    this.kbo_1 = PaletteTokens_getInstance().ybu_1;
    this.lbo_1 = PaletteTokens_getInstance().xbu_1;
    this.mbo_1 = PaletteTokens_getInstance().bbv_1;
    this.nbo_1 = PaletteTokens_getInstance().ibu_1;
    this.obo_1 = PaletteTokens_getInstance().wbu_1;
    this.pbo_1 = this.ybn_1;
    this.qbo_1 = PaletteTokens_getInstance().obv_1;
    this.rbo_1 = PaletteTokens_getInstance().wbw_1;
    this.sbo_1 = PaletteTokens_getInstance().bbx_1;
    this.tbo_1 = PaletteTokens_getInstance().bbx_1;
    this.ubo_1 = PaletteTokens_getInstance().abx_1;
  }
  var ColorLightTokens_instance;
  function ColorLightTokens_getInstance() {
    if (ColorLightTokens_instance == null)
      new ColorLightTokens();
    return ColorLightTokens_instance;
  }
  var ColorSchemeKeyTokens_Background_instance;
  var ColorSchemeKeyTokens_Error_instance;
  var ColorSchemeKeyTokens_ErrorContainer_instance;
  var ColorSchemeKeyTokens_InverseOnSurface_instance;
  var ColorSchemeKeyTokens_InversePrimary_instance;
  var ColorSchemeKeyTokens_InverseSurface_instance;
  var ColorSchemeKeyTokens_OnBackground_instance;
  var ColorSchemeKeyTokens_OnError_instance;
  var ColorSchemeKeyTokens_OnErrorContainer_instance;
  var ColorSchemeKeyTokens_OnPrimary_instance;
  var ColorSchemeKeyTokens_OnPrimaryContainer_instance;
  var ColorSchemeKeyTokens_OnPrimaryFixed_instance;
  var ColorSchemeKeyTokens_OnPrimaryFixedVariant_instance;
  var ColorSchemeKeyTokens_OnSecondary_instance;
  var ColorSchemeKeyTokens_OnSecondaryContainer_instance;
  var ColorSchemeKeyTokens_OnSecondaryFixed_instance;
  var ColorSchemeKeyTokens_OnSecondaryFixedVariant_instance;
  var ColorSchemeKeyTokens_OnSurface_instance;
  var ColorSchemeKeyTokens_OnSurfaceVariant_instance;
  var ColorSchemeKeyTokens_OnTertiary_instance;
  var ColorSchemeKeyTokens_OnTertiaryContainer_instance;
  var ColorSchemeKeyTokens_OnTertiaryFixed_instance;
  var ColorSchemeKeyTokens_OnTertiaryFixedVariant_instance;
  var ColorSchemeKeyTokens_Outline_instance;
  var ColorSchemeKeyTokens_OutlineVariant_instance;
  var ColorSchemeKeyTokens_Primary_instance;
  var ColorSchemeKeyTokens_PrimaryContainer_instance;
  var ColorSchemeKeyTokens_PrimaryFixed_instance;
  var ColorSchemeKeyTokens_PrimaryFixedDim_instance;
  var ColorSchemeKeyTokens_Scrim_instance;
  var ColorSchemeKeyTokens_Secondary_instance;
  var ColorSchemeKeyTokens_SecondaryContainer_instance;
  var ColorSchemeKeyTokens_SecondaryFixed_instance;
  var ColorSchemeKeyTokens_SecondaryFixedDim_instance;
  var ColorSchemeKeyTokens_Surface_instance;
  var ColorSchemeKeyTokens_SurfaceBright_instance;
  var ColorSchemeKeyTokens_SurfaceContainer_instance;
  var ColorSchemeKeyTokens_SurfaceContainerHigh_instance;
  var ColorSchemeKeyTokens_SurfaceContainerHighest_instance;
  var ColorSchemeKeyTokens_SurfaceContainerLow_instance;
  var ColorSchemeKeyTokens_SurfaceContainerLowest_instance;
  var ColorSchemeKeyTokens_SurfaceDim_instance;
  var ColorSchemeKeyTokens_SurfaceTint_instance;
  var ColorSchemeKeyTokens_SurfaceVariant_instance;
  var ColorSchemeKeyTokens_Tertiary_instance;
  var ColorSchemeKeyTokens_TertiaryContainer_instance;
  var ColorSchemeKeyTokens_TertiaryFixed_instance;
  var ColorSchemeKeyTokens_TertiaryFixedDim_instance;
  var ColorSchemeKeyTokens_entriesInitialized;
  function ColorSchemeKeyTokens_initEntries() {
    if (ColorSchemeKeyTokens_entriesInitialized)
      return Unit_instance;
    ColorSchemeKeyTokens_entriesInitialized = true;
    ColorSchemeKeyTokens_Background_instance = new ColorSchemeKeyTokens('Background', 0);
    ColorSchemeKeyTokens_Error_instance = new ColorSchemeKeyTokens('Error', 1);
    ColorSchemeKeyTokens_ErrorContainer_instance = new ColorSchemeKeyTokens('ErrorContainer', 2);
    ColorSchemeKeyTokens_InverseOnSurface_instance = new ColorSchemeKeyTokens('InverseOnSurface', 3);
    ColorSchemeKeyTokens_InversePrimary_instance = new ColorSchemeKeyTokens('InversePrimary', 4);
    ColorSchemeKeyTokens_InverseSurface_instance = new ColorSchemeKeyTokens('InverseSurface', 5);
    ColorSchemeKeyTokens_OnBackground_instance = new ColorSchemeKeyTokens('OnBackground', 6);
    ColorSchemeKeyTokens_OnError_instance = new ColorSchemeKeyTokens('OnError', 7);
    ColorSchemeKeyTokens_OnErrorContainer_instance = new ColorSchemeKeyTokens('OnErrorContainer', 8);
    ColorSchemeKeyTokens_OnPrimary_instance = new ColorSchemeKeyTokens('OnPrimary', 9);
    ColorSchemeKeyTokens_OnPrimaryContainer_instance = new ColorSchemeKeyTokens('OnPrimaryContainer', 10);
    ColorSchemeKeyTokens_OnPrimaryFixed_instance = new ColorSchemeKeyTokens('OnPrimaryFixed', 11);
    ColorSchemeKeyTokens_OnPrimaryFixedVariant_instance = new ColorSchemeKeyTokens('OnPrimaryFixedVariant', 12);
    ColorSchemeKeyTokens_OnSecondary_instance = new ColorSchemeKeyTokens('OnSecondary', 13);
    ColorSchemeKeyTokens_OnSecondaryContainer_instance = new ColorSchemeKeyTokens('OnSecondaryContainer', 14);
    ColorSchemeKeyTokens_OnSecondaryFixed_instance = new ColorSchemeKeyTokens('OnSecondaryFixed', 15);
    ColorSchemeKeyTokens_OnSecondaryFixedVariant_instance = new ColorSchemeKeyTokens('OnSecondaryFixedVariant', 16);
    ColorSchemeKeyTokens_OnSurface_instance = new ColorSchemeKeyTokens('OnSurface', 17);
    ColorSchemeKeyTokens_OnSurfaceVariant_instance = new ColorSchemeKeyTokens('OnSurfaceVariant', 18);
    ColorSchemeKeyTokens_OnTertiary_instance = new ColorSchemeKeyTokens('OnTertiary', 19);
    ColorSchemeKeyTokens_OnTertiaryContainer_instance = new ColorSchemeKeyTokens('OnTertiaryContainer', 20);
    ColorSchemeKeyTokens_OnTertiaryFixed_instance = new ColorSchemeKeyTokens('OnTertiaryFixed', 21);
    ColorSchemeKeyTokens_OnTertiaryFixedVariant_instance = new ColorSchemeKeyTokens('OnTertiaryFixedVariant', 22);
    ColorSchemeKeyTokens_Outline_instance = new ColorSchemeKeyTokens('Outline', 23);
    ColorSchemeKeyTokens_OutlineVariant_instance = new ColorSchemeKeyTokens('OutlineVariant', 24);
    ColorSchemeKeyTokens_Primary_instance = new ColorSchemeKeyTokens('Primary', 25);
    ColorSchemeKeyTokens_PrimaryContainer_instance = new ColorSchemeKeyTokens('PrimaryContainer', 26);
    ColorSchemeKeyTokens_PrimaryFixed_instance = new ColorSchemeKeyTokens('PrimaryFixed', 27);
    ColorSchemeKeyTokens_PrimaryFixedDim_instance = new ColorSchemeKeyTokens('PrimaryFixedDim', 28);
    ColorSchemeKeyTokens_Scrim_instance = new ColorSchemeKeyTokens('Scrim', 29);
    ColorSchemeKeyTokens_Secondary_instance = new ColorSchemeKeyTokens('Secondary', 30);
    ColorSchemeKeyTokens_SecondaryContainer_instance = new ColorSchemeKeyTokens('SecondaryContainer', 31);
    ColorSchemeKeyTokens_SecondaryFixed_instance = new ColorSchemeKeyTokens('SecondaryFixed', 32);
    ColorSchemeKeyTokens_SecondaryFixedDim_instance = new ColorSchemeKeyTokens('SecondaryFixedDim', 33);
    ColorSchemeKeyTokens_Surface_instance = new ColorSchemeKeyTokens('Surface', 34);
    ColorSchemeKeyTokens_SurfaceBright_instance = new ColorSchemeKeyTokens('SurfaceBright', 35);
    ColorSchemeKeyTokens_SurfaceContainer_instance = new ColorSchemeKeyTokens('SurfaceContainer', 36);
    ColorSchemeKeyTokens_SurfaceContainerHigh_instance = new ColorSchemeKeyTokens('SurfaceContainerHigh', 37);
    ColorSchemeKeyTokens_SurfaceContainerHighest_instance = new ColorSchemeKeyTokens('SurfaceContainerHighest', 38);
    ColorSchemeKeyTokens_SurfaceContainerLow_instance = new ColorSchemeKeyTokens('SurfaceContainerLow', 39);
    ColorSchemeKeyTokens_SurfaceContainerLowest_instance = new ColorSchemeKeyTokens('SurfaceContainerLowest', 40);
    ColorSchemeKeyTokens_SurfaceDim_instance = new ColorSchemeKeyTokens('SurfaceDim', 41);
    ColorSchemeKeyTokens_SurfaceTint_instance = new ColorSchemeKeyTokens('SurfaceTint', 42);
    ColorSchemeKeyTokens_SurfaceVariant_instance = new ColorSchemeKeyTokens('SurfaceVariant', 43);
    ColorSchemeKeyTokens_Tertiary_instance = new ColorSchemeKeyTokens('Tertiary', 44);
    ColorSchemeKeyTokens_TertiaryContainer_instance = new ColorSchemeKeyTokens('TertiaryContainer', 45);
    ColorSchemeKeyTokens_TertiaryFixed_instance = new ColorSchemeKeyTokens('TertiaryFixed', 46);
    ColorSchemeKeyTokens_TertiaryFixedDim_instance = new ColorSchemeKeyTokens('TertiaryFixedDim', 47);
  }
  function ColorSchemeKeyTokens(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ColorSchemeKeyTokens_Primary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Primary_instance;
  }
  function ColorSchemeKeyTokens_PrimaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_PrimaryContainer_instance;
  }
  function ColorSchemeKeyTokens_SurfaceVariant_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_SurfaceVariant_instance;
  }
  function ColorSchemeKeyTokens_Tertiary_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_Tertiary_instance;
  }
  function ColorSchemeKeyTokens_TertiaryContainer_getInstance() {
    ColorSchemeKeyTokens_initEntries();
    return ColorSchemeKeyTokens_TertiaryContainer_instance;
  }
  function LinearProgressIndicatorTokens() {
    LinearProgressIndicatorTokens_instance = this;
    this.ybr_1 = ColorSchemeKeyTokens_Primary_getInstance();
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.zbr_1 = _Dp___init__impl__ms3zkb(4.0);
    this.abs_1 = ShapeKeyTokens_CornerNone_getInstance();
    this.bbs_1 = ColorSchemeKeyTokens_TertiaryContainer_getInstance();
    this.cbs_1 = ColorSchemeKeyTokens_Primary_getInstance();
    this.dbs_1 = ColorSchemeKeyTokens_Tertiary_getInstance();
    this.ebs_1 = ColorSchemeKeyTokens_PrimaryContainer_getInstance();
    this.fbs_1 = ColorSchemeKeyTokens_SurfaceVariant_getInstance();
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp_0.gbs_1 = _Dp___init__impl__ms3zkb(4.0);
    this.hbs_1 = ShapeKeyTokens_CornerNone_getInstance();
  }
  var LinearProgressIndicatorTokens_instance;
  function LinearProgressIndicatorTokens_getInstance() {
    if (LinearProgressIndicatorTokens_instance == null)
      new LinearProgressIndicatorTokens();
    return LinearProgressIndicatorTokens_instance;
  }
  function PaletteTokens() {
    PaletteTokens_instance = this;
    this.sbt_1 = Color_0(0, 0, 0);
    this.tbt_1 = Color_0(0, 0, 0);
    this.ubt_1 = Color_0(65, 14, 11);
    this.vbt_1 = Color_0(255, 255, 255);
    this.wbt_1 = Color_0(96, 20, 16);
    this.xbt_1 = Color_0(140, 29, 24);
    this.ybt_1 = Color_0(179, 38, 30);
    this.zbt_1 = Color_0(220, 54, 46);
    this.abu_1 = Color_0(228, 105, 98);
    this.bbu_1 = Color_0(236, 146, 142);
    this.cbu_1 = Color_0(242, 184, 181);
    this.dbu_1 = Color_0(249, 222, 220);
    this.ebu_1 = Color_0(252, 238, 238);
    this.fbu_1 = Color_0(255, 251, 249);
    this.gbu_1 = Color_0(0, 0, 0);
    this.hbu_1 = Color_0(28, 27, 31);
    this.ibu_1 = Color_0(255, 255, 255);
    this.jbu_1 = Color_0(32, 31, 35);
    this.kbu_1 = Color_0(43, 41, 45);
    this.lbu_1 = Color_0(49, 48, 51);
    this.mbu_1 = Color_0(49, 48, 51);
    this.nbu_1 = Color_0(49, 48, 51);
    this.obu_1 = Color_0(72, 70, 73);
    this.pbu_1 = Color_0(14, 14, 17);
    this.qbu_1 = Color_0(96, 93, 98);
    this.rbu_1 = Color_0(120, 117, 121);
    this.sbu_1 = Color_0(20, 19, 23);
    this.tbu_1 = Color_0(147, 144, 148);
    this.ubu_1 = Color_0(174, 170, 174);
    this.vbu_1 = Color_0(201, 197, 202);
    this.wbu_1 = Color_0(221, 216, 221);
    this.xbu_1 = Color_0(230, 225, 229);
    this.ybu_1 = Color_0(236, 231, 236);
    this.zbu_1 = Color_0(241, 236, 241);
    this.abv_1 = Color_0(244, 239, 244);
    this.bbv_1 = Color_0(247, 242, 247);
    this.cbv_1 = Color_0(253, 248, 253);
    this.dbv_1 = Color_0(255, 251, 254);
    this.ebv_1 = Color_0(0, 0, 0);
    this.fbv_1 = Color_0(29, 26, 34);
    this.gbv_1 = Color_0(255, 255, 255);
    this.hbv_1 = Color_0(50, 47, 55);
    this.ibv_1 = Color_0(73, 69, 79);
    this.jbv_1 = Color_0(96, 93, 102);
    this.kbv_1 = Color_0(121, 116, 126);
    this.lbv_1 = Color_0(147, 143, 153);
    this.mbv_1 = Color_0(174, 169, 180);
    this.nbv_1 = Color_0(202, 196, 208);
    this.obv_1 = Color_0(231, 224, 236);
    this.pbv_1 = Color_0(245, 238, 250);
    this.qbv_1 = Color_0(255, 251, 254);
    this.rbv_1 = Color_0(0, 0, 0);
    this.sbv_1 = Color_0(33, 0, 93);
    this.tbv_1 = Color_0(255, 255, 255);
    this.ubv_1 = Color_0(56, 30, 114);
    this.vbv_1 = Color_0(79, 55, 139);
    this.wbv_1 = Color_0(103, 80, 164);
    this.xbv_1 = Color_0(127, 103, 190);
    this.ybv_1 = Color_0(154, 130, 219);
    this.zbv_1 = Color_0(182, 157, 248);
    this.abw_1 = Color_0(208, 188, 255);
    this.bbw_1 = Color_0(234, 221, 255);
    this.cbw_1 = Color_0(246, 237, 255);
    this.dbw_1 = Color_0(255, 251, 254);
    this.ebw_1 = Color_0(0, 0, 0);
    this.fbw_1 = Color_0(29, 25, 43);
    this.gbw_1 = Color_0(255, 255, 255);
    this.hbw_1 = Color_0(51, 45, 65);
    this.ibw_1 = Color_0(74, 68, 88);
    this.jbw_1 = Color_0(98, 91, 113);
    this.kbw_1 = Color_0(122, 114, 137);
    this.lbw_1 = Color_0(149, 141, 165);
    this.mbw_1 = Color_0(176, 167, 192);
    this.nbw_1 = Color_0(204, 194, 220);
    this.obw_1 = Color_0(232, 222, 248);
    this.pbw_1 = Color_0(246, 237, 255);
    this.qbw_1 = Color_0(255, 251, 254);
    this.rbw_1 = Color_0(0, 0, 0);
    this.sbw_1 = Color_0(49, 17, 29);
    this.tbw_1 = Color_0(255, 255, 255);
    this.ubw_1 = Color_0(73, 37, 50);
    this.vbw_1 = Color_0(99, 59, 72);
    this.wbw_1 = Color_0(125, 82, 96);
    this.xbw_1 = Color_0(152, 105, 119);
    this.ybw_1 = Color_0(181, 131, 146);
    this.zbw_1 = Color_0(210, 157, 172);
    this.abx_1 = Color_0(239, 184, 200);
    this.bbx_1 = Color_0(255, 216, 228);
    this.cbx_1 = Color_0(255, 236, 241);
    this.dbx_1 = Color_0(255, 251, 250);
    this.ebx_1 = Color_0(255, 255, 255);
  }
  var PaletteTokens_instance;
  function PaletteTokens_getInstance() {
    if (PaletteTokens_instance == null)
      new PaletteTokens();
    return PaletteTokens_instance;
  }
  var ShapeKeyTokens_CornerExtraLarge_instance;
  var ShapeKeyTokens_CornerExtraLargeTop_instance;
  var ShapeKeyTokens_CornerExtraSmall_instance;
  var ShapeKeyTokens_CornerExtraSmallTop_instance;
  var ShapeKeyTokens_CornerFull_instance;
  var ShapeKeyTokens_CornerLarge_instance;
  var ShapeKeyTokens_CornerLargeEnd_instance;
  var ShapeKeyTokens_CornerLargeTop_instance;
  var ShapeKeyTokens_CornerMedium_instance;
  var ShapeKeyTokens_CornerNone_instance;
  var ShapeKeyTokens_CornerSmall_instance;
  var ShapeKeyTokens_entriesInitialized;
  function ShapeKeyTokens_initEntries() {
    if (ShapeKeyTokens_entriesInitialized)
      return Unit_instance;
    ShapeKeyTokens_entriesInitialized = true;
    ShapeKeyTokens_CornerExtraLarge_instance = new ShapeKeyTokens('CornerExtraLarge', 0);
    ShapeKeyTokens_CornerExtraLargeTop_instance = new ShapeKeyTokens('CornerExtraLargeTop', 1);
    ShapeKeyTokens_CornerExtraSmall_instance = new ShapeKeyTokens('CornerExtraSmall', 2);
    ShapeKeyTokens_CornerExtraSmallTop_instance = new ShapeKeyTokens('CornerExtraSmallTop', 3);
    ShapeKeyTokens_CornerFull_instance = new ShapeKeyTokens('CornerFull', 4);
    ShapeKeyTokens_CornerLarge_instance = new ShapeKeyTokens('CornerLarge', 5);
    ShapeKeyTokens_CornerLargeEnd_instance = new ShapeKeyTokens('CornerLargeEnd', 6);
    ShapeKeyTokens_CornerLargeTop_instance = new ShapeKeyTokens('CornerLargeTop', 7);
    ShapeKeyTokens_CornerMedium_instance = new ShapeKeyTokens('CornerMedium', 8);
    ShapeKeyTokens_CornerNone_instance = new ShapeKeyTokens('CornerNone', 9);
    ShapeKeyTokens_CornerSmall_instance = new ShapeKeyTokens('CornerSmall', 10);
  }
  function ShapeKeyTokens(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ShapeKeyTokens_CornerNone_getInstance() {
    ShapeKeyTokens_initEntries();
    return ShapeKeyTokens_CornerNone_instance;
  }
  function ShapeTokens() {
    ShapeTokens_instance = this;
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$0 = _Dp___init__impl__ms3zkb(28.0);
    tmp.sbs_1 = RoundedCornerShape(tmp$ret$0);
    var tmp_0 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_1 = _Dp___init__impl__ms3zkb(28.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_2 = _Dp___init__impl__ms3zkb(28.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_3 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$4 = _Dp___init__impl__ms3zkb(0.0);
    tmp_0.tbs_1 = RoundedCornerShape_0(tmp_1, tmp_2, tmp_3, tmp$ret$4);
    var tmp_4 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$5 = _Dp___init__impl__ms3zkb(4.0);
    tmp_4.ubs_1 = RoundedCornerShape(tmp$ret$5);
    var tmp_5 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_6 = _Dp___init__impl__ms3zkb(4.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_7 = _Dp___init__impl__ms3zkb(4.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_8 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$9 = _Dp___init__impl__ms3zkb(0.0);
    tmp_5.vbs_1 = RoundedCornerShape_0(tmp_6, tmp_7, tmp_8, tmp$ret$9);
    this.wbs_1 = get_CircleShape();
    var tmp_9 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$10 = _Dp___init__impl__ms3zkb(16.0);
    tmp_9.xbs_1 = RoundedCornerShape(tmp$ret$10);
    var tmp_10 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_11 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_12 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_13 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$14 = _Dp___init__impl__ms3zkb(0.0);
    tmp_10.ybs_1 = RoundedCornerShape_0(tmp_11, tmp_12, tmp_13, tmp$ret$14);
    var tmp_14 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_15 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_16 = _Dp___init__impl__ms3zkb(16.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp_17 = _Dp___init__impl__ms3zkb(0.0);
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$18 = _Dp___init__impl__ms3zkb(0.0);
    tmp_14.zbs_1 = RoundedCornerShape_0(tmp_15, tmp_16, tmp_17, tmp$ret$18);
    var tmp_18 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$19 = _Dp___init__impl__ms3zkb(12.0);
    tmp_18.abt_1 = RoundedCornerShape(tmp$ret$19);
    this.bbt_1 = get_RectangleShape();
    var tmp_19 = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    var tmp$ret$20 = _Dp___init__impl__ms3zkb(8.0);
    tmp_19.cbt_1 = RoundedCornerShape(tmp$ret$20);
  }
  var ShapeTokens_instance;
  function ShapeTokens_getInstance() {
    if (ShapeTokens_instance == null)
      new ShapeTokens();
    return ShapeTokens_instance;
  }
  function StateTokens() {
    this.fbx_1 = 0.16;
    this.gbx_1 = 0.12;
    this.hbx_1 = 0.08;
    this.ibx_1 = 0.12;
  }
  var StateTokens_instance;
  function StateTokens_getInstance() {
    return StateTokens_instance;
  }
  function TypeScaleTokens() {
    TypeScaleTokens_instance = this;
    this.jbx_1 = TypefaceTokens_getInstance().hc0_1;
    this.kbx_1 = get_sp(24.0);
    this.lbx_1 = get_sp_0(16);
    this.mbx_1 = get_sp(0.5);
    this.nbx_1 = TypefaceTokens_getInstance().kc0_1;
    this.obx_1 = TypefaceTokens_getInstance().hc0_1;
    this.pbx_1 = get_sp(20.0);
    this.qbx_1 = get_sp_0(14);
    this.rbx_1 = get_sp(0.2);
    this.sbx_1 = TypefaceTokens_getInstance().kc0_1;
    this.tbx_1 = TypefaceTokens_getInstance().hc0_1;
    this.ubx_1 = get_sp(16.0);
    this.vbx_1 = get_sp_0(12);
    this.wbx_1 = get_sp(0.4);
    this.xbx_1 = TypefaceTokens_getInstance().kc0_1;
    this.ybx_1 = TypefaceTokens_getInstance().gc0_1;
    this.zbx_1 = get_sp(64.0);
    this.aby_1 = get_sp_0(57);
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.TextUnit.unaryMinus' call
    var this_0 = get_sp(0.2);
    checkArithmetic(this_0);
    tmp.bby_1 = pack(_TextUnit___get_rawType__impl__tu8yq5(this_0), -_TextUnit___get_value__impl__hpbx0k(this_0));
    this.cby_1 = TypefaceTokens_getInstance().kc0_1;
    this.dby_1 = TypefaceTokens_getInstance().gc0_1;
    this.eby_1 = get_sp(52.0);
    this.fby_1 = get_sp_0(45);
    this.gby_1 = get_sp(0.0);
    this.hby_1 = TypefaceTokens_getInstance().kc0_1;
    this.iby_1 = TypefaceTokens_getInstance().gc0_1;
    this.jby_1 = get_sp(44.0);
    this.kby_1 = get_sp_0(36);
    this.lby_1 = get_sp(0.0);
    this.mby_1 = TypefaceTokens_getInstance().kc0_1;
    this.nby_1 = TypefaceTokens_getInstance().gc0_1;
    this.oby_1 = get_sp(40.0);
    this.pby_1 = get_sp_0(32);
    this.qby_1 = get_sp(0.0);
    this.rby_1 = TypefaceTokens_getInstance().kc0_1;
    this.sby_1 = TypefaceTokens_getInstance().gc0_1;
    this.tby_1 = get_sp(36.0);
    this.uby_1 = get_sp_0(28);
    this.vby_1 = get_sp(0.0);
    this.wby_1 = TypefaceTokens_getInstance().kc0_1;
    this.xby_1 = TypefaceTokens_getInstance().gc0_1;
    this.yby_1 = get_sp(32.0);
    this.zby_1 = get_sp_0(24);
    this.abz_1 = get_sp(0.0);
    this.bbz_1 = TypefaceTokens_getInstance().kc0_1;
    this.cbz_1 = TypefaceTokens_getInstance().hc0_1;
    this.dbz_1 = get_sp(20.0);
    this.ebz_1 = get_sp_0(14);
    this.fbz_1 = get_sp(0.1);
    this.gbz_1 = TypefaceTokens_getInstance().jc0_1;
    this.hbz_1 = TypefaceTokens_getInstance().hc0_1;
    this.ibz_1 = get_sp(16.0);
    this.jbz_1 = get_sp_0(12);
    this.kbz_1 = get_sp(0.5);
    this.lbz_1 = TypefaceTokens_getInstance().jc0_1;
    this.mbz_1 = TypefaceTokens_getInstance().hc0_1;
    this.nbz_1 = get_sp(16.0);
    this.obz_1 = get_sp_0(11);
    this.pbz_1 = get_sp(0.5);
    this.qbz_1 = TypefaceTokens_getInstance().jc0_1;
    this.rbz_1 = TypefaceTokens_getInstance().gc0_1;
    this.sbz_1 = get_sp(28.0);
    this.tbz_1 = get_sp_0(22);
    this.ubz_1 = get_sp(0.0);
    this.vbz_1 = TypefaceTokens_getInstance().kc0_1;
    this.wbz_1 = TypefaceTokens_getInstance().hc0_1;
    this.xbz_1 = get_sp(24.0);
    this.ybz_1 = get_sp_0(16);
    this.zbz_1 = get_sp(0.2);
    this.ac0_1 = TypefaceTokens_getInstance().jc0_1;
    this.bc0_1 = TypefaceTokens_getInstance().hc0_1;
    this.cc0_1 = get_sp(20.0);
    this.dc0_1 = get_sp_0(14);
    this.ec0_1 = get_sp(0.1);
    this.fc0_1 = TypefaceTokens_getInstance().jc0_1;
  }
  var TypeScaleTokens_instance;
  function TypeScaleTokens_getInstance() {
    if (TypeScaleTokens_instance == null)
      new TypeScaleTokens();
    return TypeScaleTokens_instance;
  }
  function TypefaceTokens() {
    TypefaceTokens_instance = this;
    this.gc0_1 = Companion_getInstance_5().v4a_1;
    this.hc0_1 = Companion_getInstance_5().v4a_1;
    this.ic0_1 = Companion_getInstance_6().k4a_1;
    this.jc0_1 = Companion_getInstance_6().i4a_1;
    this.kc0_1 = Companion_getInstance_6().h4a_1;
  }
  var TypefaceTokens_instance;
  function TypefaceTokens_getInstance() {
    if (TypefaceTokens_instance == null)
      new TypefaceTokens();
    return TypefaceTokens_instance;
  }
  function get_DefaultLineHeightStyle() {
    _init_properties_TypographyTokens_kt__by6b7t();
    return DefaultLineHeightStyle;
  }
  var DefaultLineHeightStyle;
  function get_DefaultTextStyle() {
    _init_properties_TypographyTokens_kt__by6b7t();
    return DefaultTextStyle;
  }
  var DefaultTextStyle;
  function TypographyTokens() {
    TypographyTokens_instance = this;
    var tmp = this;
    var tmp0_$this = get_DefaultTextStyle();
    var tmp1_fontFamily = TypeScaleTokens_getInstance().jbx_1;
    var tmp2_fontWeight = TypeScaleTokens_getInstance().nbx_1;
    var tmp3_fontSize = TypeScaleTokens_getInstance().lbx_1;
    var tmp4_lineHeight = TypeScaleTokens_getInstance().kbx_1;
    var tmp5_letterSpacing = TypeScaleTokens_getInstance().mbx_1;
    tmp.dbt_1 = tmp0_$this.n4c(VOID, tmp3_fontSize, tmp2_fontWeight, VOID, VOID, tmp1_fontFamily, VOID, tmp5_letterSpacing, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight);
    var tmp_0 = this;
    var tmp0_$this_0 = get_DefaultTextStyle();
    var tmp1_fontFamily_0 = TypeScaleTokens_getInstance().obx_1;
    var tmp2_fontWeight_0 = TypeScaleTokens_getInstance().sbx_1;
    var tmp3_fontSize_0 = TypeScaleTokens_getInstance().qbx_1;
    var tmp4_lineHeight_0 = TypeScaleTokens_getInstance().pbx_1;
    var tmp5_letterSpacing_0 = TypeScaleTokens_getInstance().rbx_1;
    tmp_0.ebt_1 = tmp0_$this_0.n4c(VOID, tmp3_fontSize_0, tmp2_fontWeight_0, VOID, VOID, tmp1_fontFamily_0, VOID, tmp5_letterSpacing_0, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_0);
    var tmp_1 = this;
    var tmp0_$this_1 = get_DefaultTextStyle();
    var tmp1_fontFamily_1 = TypeScaleTokens_getInstance().tbx_1;
    var tmp2_fontWeight_1 = TypeScaleTokens_getInstance().xbx_1;
    var tmp3_fontSize_1 = TypeScaleTokens_getInstance().vbx_1;
    var tmp4_lineHeight_1 = TypeScaleTokens_getInstance().ubx_1;
    var tmp5_letterSpacing_1 = TypeScaleTokens_getInstance().wbx_1;
    tmp_1.fbt_1 = tmp0_$this_1.n4c(VOID, tmp3_fontSize_1, tmp2_fontWeight_1, VOID, VOID, tmp1_fontFamily_1, VOID, tmp5_letterSpacing_1, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_1);
    var tmp_2 = this;
    var tmp0_$this_2 = get_DefaultTextStyle();
    var tmp1_fontFamily_2 = TypeScaleTokens_getInstance().ybx_1;
    var tmp2_fontWeight_2 = TypeScaleTokens_getInstance().cby_1;
    var tmp3_fontSize_2 = TypeScaleTokens_getInstance().aby_1;
    var tmp4_lineHeight_2 = TypeScaleTokens_getInstance().zbx_1;
    var tmp5_letterSpacing_2 = TypeScaleTokens_getInstance().bby_1;
    tmp_2.gbt_1 = tmp0_$this_2.n4c(VOID, tmp3_fontSize_2, tmp2_fontWeight_2, VOID, VOID, tmp1_fontFamily_2, VOID, tmp5_letterSpacing_2, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_2);
    var tmp_3 = this;
    var tmp0_$this_3 = get_DefaultTextStyle();
    var tmp1_fontFamily_3 = TypeScaleTokens_getInstance().dby_1;
    var tmp2_fontWeight_3 = TypeScaleTokens_getInstance().hby_1;
    var tmp3_fontSize_3 = TypeScaleTokens_getInstance().fby_1;
    var tmp4_lineHeight_3 = TypeScaleTokens_getInstance().eby_1;
    var tmp5_letterSpacing_3 = TypeScaleTokens_getInstance().gby_1;
    tmp_3.hbt_1 = tmp0_$this_3.n4c(VOID, tmp3_fontSize_3, tmp2_fontWeight_3, VOID, VOID, tmp1_fontFamily_3, VOID, tmp5_letterSpacing_3, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_3);
    var tmp_4 = this;
    var tmp0_$this_4 = get_DefaultTextStyle();
    var tmp1_fontFamily_4 = TypeScaleTokens_getInstance().iby_1;
    var tmp2_fontWeight_4 = TypeScaleTokens_getInstance().mby_1;
    var tmp3_fontSize_4 = TypeScaleTokens_getInstance().kby_1;
    var tmp4_lineHeight_4 = TypeScaleTokens_getInstance().jby_1;
    var tmp5_letterSpacing_4 = TypeScaleTokens_getInstance().lby_1;
    tmp_4.ibt_1 = tmp0_$this_4.n4c(VOID, tmp3_fontSize_4, tmp2_fontWeight_4, VOID, VOID, tmp1_fontFamily_4, VOID, tmp5_letterSpacing_4, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_4);
    var tmp_5 = this;
    var tmp0_$this_5 = get_DefaultTextStyle();
    var tmp1_fontFamily_5 = TypeScaleTokens_getInstance().nby_1;
    var tmp2_fontWeight_5 = TypeScaleTokens_getInstance().rby_1;
    var tmp3_fontSize_5 = TypeScaleTokens_getInstance().pby_1;
    var tmp4_lineHeight_5 = TypeScaleTokens_getInstance().oby_1;
    var tmp5_letterSpacing_5 = TypeScaleTokens_getInstance().qby_1;
    tmp_5.jbt_1 = tmp0_$this_5.n4c(VOID, tmp3_fontSize_5, tmp2_fontWeight_5, VOID, VOID, tmp1_fontFamily_5, VOID, tmp5_letterSpacing_5, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_5);
    var tmp_6 = this;
    var tmp0_$this_6 = get_DefaultTextStyle();
    var tmp1_fontFamily_6 = TypeScaleTokens_getInstance().sby_1;
    var tmp2_fontWeight_6 = TypeScaleTokens_getInstance().wby_1;
    var tmp3_fontSize_6 = TypeScaleTokens_getInstance().uby_1;
    var tmp4_lineHeight_6 = TypeScaleTokens_getInstance().tby_1;
    var tmp5_letterSpacing_6 = TypeScaleTokens_getInstance().vby_1;
    tmp_6.kbt_1 = tmp0_$this_6.n4c(VOID, tmp3_fontSize_6, tmp2_fontWeight_6, VOID, VOID, tmp1_fontFamily_6, VOID, tmp5_letterSpacing_6, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_6);
    var tmp_7 = this;
    var tmp0_$this_7 = get_DefaultTextStyle();
    var tmp1_fontFamily_7 = TypeScaleTokens_getInstance().xby_1;
    var tmp2_fontWeight_7 = TypeScaleTokens_getInstance().bbz_1;
    var tmp3_fontSize_7 = TypeScaleTokens_getInstance().zby_1;
    var tmp4_lineHeight_7 = TypeScaleTokens_getInstance().yby_1;
    var tmp5_letterSpacing_7 = TypeScaleTokens_getInstance().abz_1;
    tmp_7.lbt_1 = tmp0_$this_7.n4c(VOID, tmp3_fontSize_7, tmp2_fontWeight_7, VOID, VOID, tmp1_fontFamily_7, VOID, tmp5_letterSpacing_7, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_7);
    var tmp_8 = this;
    var tmp0_$this_8 = get_DefaultTextStyle();
    var tmp1_fontFamily_8 = TypeScaleTokens_getInstance().cbz_1;
    var tmp2_fontWeight_8 = TypeScaleTokens_getInstance().gbz_1;
    var tmp3_fontSize_8 = TypeScaleTokens_getInstance().ebz_1;
    var tmp4_lineHeight_8 = TypeScaleTokens_getInstance().dbz_1;
    var tmp5_letterSpacing_8 = TypeScaleTokens_getInstance().fbz_1;
    tmp_8.mbt_1 = tmp0_$this_8.n4c(VOID, tmp3_fontSize_8, tmp2_fontWeight_8, VOID, VOID, tmp1_fontFamily_8, VOID, tmp5_letterSpacing_8, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_8);
    var tmp_9 = this;
    var tmp0_$this_9 = get_DefaultTextStyle();
    var tmp1_fontFamily_9 = TypeScaleTokens_getInstance().hbz_1;
    var tmp2_fontWeight_9 = TypeScaleTokens_getInstance().lbz_1;
    var tmp3_fontSize_9 = TypeScaleTokens_getInstance().jbz_1;
    var tmp4_lineHeight_9 = TypeScaleTokens_getInstance().ibz_1;
    var tmp5_letterSpacing_9 = TypeScaleTokens_getInstance().kbz_1;
    tmp_9.nbt_1 = tmp0_$this_9.n4c(VOID, tmp3_fontSize_9, tmp2_fontWeight_9, VOID, VOID, tmp1_fontFamily_9, VOID, tmp5_letterSpacing_9, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_9);
    var tmp_10 = this;
    var tmp0_$this_10 = get_DefaultTextStyle();
    var tmp1_fontFamily_10 = TypeScaleTokens_getInstance().mbz_1;
    var tmp2_fontWeight_10 = TypeScaleTokens_getInstance().qbz_1;
    var tmp3_fontSize_10 = TypeScaleTokens_getInstance().obz_1;
    var tmp4_lineHeight_10 = TypeScaleTokens_getInstance().nbz_1;
    var tmp5_letterSpacing_10 = TypeScaleTokens_getInstance().pbz_1;
    tmp_10.obt_1 = tmp0_$this_10.n4c(VOID, tmp3_fontSize_10, tmp2_fontWeight_10, VOID, VOID, tmp1_fontFamily_10, VOID, tmp5_letterSpacing_10, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_10);
    var tmp_11 = this;
    var tmp0_$this_11 = get_DefaultTextStyle();
    var tmp1_fontFamily_11 = TypeScaleTokens_getInstance().rbz_1;
    var tmp2_fontWeight_11 = TypeScaleTokens_getInstance().vbz_1;
    var tmp3_fontSize_11 = TypeScaleTokens_getInstance().tbz_1;
    var tmp4_lineHeight_11 = TypeScaleTokens_getInstance().sbz_1;
    var tmp5_letterSpacing_11 = TypeScaleTokens_getInstance().ubz_1;
    tmp_11.pbt_1 = tmp0_$this_11.n4c(VOID, tmp3_fontSize_11, tmp2_fontWeight_11, VOID, VOID, tmp1_fontFamily_11, VOID, tmp5_letterSpacing_11, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_11);
    var tmp_12 = this;
    var tmp0_$this_12 = get_DefaultTextStyle();
    var tmp1_fontFamily_12 = TypeScaleTokens_getInstance().wbz_1;
    var tmp2_fontWeight_12 = TypeScaleTokens_getInstance().ac0_1;
    var tmp3_fontSize_12 = TypeScaleTokens_getInstance().ybz_1;
    var tmp4_lineHeight_12 = TypeScaleTokens_getInstance().xbz_1;
    var tmp5_letterSpacing_12 = TypeScaleTokens_getInstance().zbz_1;
    tmp_12.qbt_1 = tmp0_$this_12.n4c(VOID, tmp3_fontSize_12, tmp2_fontWeight_12, VOID, VOID, tmp1_fontFamily_12, VOID, tmp5_letterSpacing_12, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_12);
    var tmp_13 = this;
    var tmp0_$this_13 = get_DefaultTextStyle();
    var tmp1_fontFamily_13 = TypeScaleTokens_getInstance().bc0_1;
    var tmp2_fontWeight_13 = TypeScaleTokens_getInstance().fc0_1;
    var tmp3_fontSize_13 = TypeScaleTokens_getInstance().dc0_1;
    var tmp4_lineHeight_13 = TypeScaleTokens_getInstance().cc0_1;
    var tmp5_letterSpacing_13 = TypeScaleTokens_getInstance().ec0_1;
    tmp_13.rbt_1 = tmp0_$this_13.n4c(VOID, tmp3_fontSize_13, tmp2_fontWeight_13, VOID, VOID, tmp1_fontFamily_13, VOID, tmp5_letterSpacing_13, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, tmp4_lineHeight_13);
  }
  var TypographyTokens_instance;
  function TypographyTokens_getInstance() {
    if (TypographyTokens_instance == null)
      new TypographyTokens();
    return TypographyTokens_instance;
  }
  var properties_initialized_TypographyTokens_kt_gw7fqt;
  function _init_properties_TypographyTokens_kt__by6b7t() {
    if (!properties_initialized_TypographyTokens_kt_gw7fqt) {
      properties_initialized_TypographyTokens_kt_gw7fqt = true;
      DefaultLineHeightStyle = new LineHeightStyle(Companion_getInstance_7().u4k_1, Companion_getInstance_8().r4k_1);
      DefaultTextStyle = Companion_getInstance_9().h4c_1.n4c(VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, VOID, defaultPlatformTextStyle(), get_DefaultLineHeightStyle());
    }
  }
  var nextHash;
  function defaultPlatformTextStyle() {
    return null;
  }
  //region block: init
  MaterialTheme_instance = new MaterialTheme();
  MaterialRippleTheme_instance = new MaterialRippleTheme();
  StateTokens_instance = new StateTokens();
  nextHash = 1;
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = CircularProgressIndicator;
  _.$_$.b = MaterialTheme_0;
  _.$_$.c = Text;
  _.$_$.d = darkColorScheme;
  _.$_$.e = MaterialTheme_instance;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-material3-material3.js.map
