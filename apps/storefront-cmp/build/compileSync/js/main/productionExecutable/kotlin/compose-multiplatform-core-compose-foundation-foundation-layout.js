(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './compose-multiplatform-core-compose-ui-ui-unit.js', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-compose-ui-ui.js', './compose-multiplatform-core-compose-runtime-runtime.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./compose-multiplatform-core-compose-ui-ui-unit.js'), require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-compose-ui-ui.js'), require('./compose-multiplatform-core-compose-runtime-runtime.js'));
  else {
    if (typeof this['compose-multiplatform-core-compose-ui-ui-unit'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation-layout'. Its dependency 'compose-multiplatform-core-compose-ui-ui-unit' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui-unit' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation-layout'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation-layout'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation-layout'.");
    }
    if (typeof this['compose-multiplatform-core-compose-ui-ui'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation-layout'. Its dependency 'compose-multiplatform-core-compose-ui-ui' was not found. Please, check whether 'compose-multiplatform-core-compose-ui-ui' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation-layout'.");
    }
    if (typeof this['compose-multiplatform-core-compose-runtime-runtime'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-compose-foundation-foundation-layout'. Its dependency 'compose-multiplatform-core-compose-runtime-runtime' was not found. Please, check whether 'compose-multiplatform-core-compose-runtime-runtime' is loaded prior to 'compose-multiplatform-core-compose-foundation-foundation-layout'.");
    }
    root['compose-multiplatform-core-compose-foundation-foundation-layout'] = factory(typeof this['compose-multiplatform-core-compose-foundation-foundation-layout'] === 'undefined' ? {} : this['compose-multiplatform-core-compose-foundation-foundation-layout'], this['compose-multiplatform-core-compose-ui-ui-unit'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-compose-ui-ui'], this['compose-multiplatform-core-compose-runtime-runtime']);
  }
}(this, function (_, kotlin_org_jetbrains_compose_ui_ui_unit, kotlin_kotlin, kotlin_org_jetbrains_compose_ui_ui, kotlin_org_jetbrains_compose_runtime_runtime) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var _Dp___init__impl__ms3zkb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v1;
  var protoOf = kotlin_kotlin.$_$.jb;
  var interfaceMeta = kotlin_kotlin.$_$.oa;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var LayoutDirection_Rtl_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l1;
  var LayoutDirection_Ltr_getInstance = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.k1;
  var Dp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.l;
  var Dp__hashCode_impl_sxkrra = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x1;
  var getBooleanHashCode = kotlin_kotlin.$_$.ha;
  var hashCode = kotlin_kotlin.$_$.ma;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var equals = kotlin_kotlin.$_$.ea;
  var classMeta = kotlin_kotlin.$_$.ba;
  var VOID = kotlin_kotlin.$_$.g;
  var Companion_getInstance = kotlin_org_jetbrains_compose_ui_ui.$_$.m5;
  var roundToInt = kotlin_kotlin.$_$.ub;
  var get_lastIndex = kotlin_kotlin.$_$.j7;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var Placeable = kotlin_org_jetbrains_compose_ui_ui.$_$.r1;
  var _Constraints___get_minWidth__impl__hi9lfi = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.u1;
  var _Constraints___get_minHeight__impl__ev4bgx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.t1;
  var Constraints__copy$default_impl_f452rp = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s2;
  var Companion_getInstance_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.v2;
  var fillArrayVal = kotlin_kotlin.$_$.fa;
  var Constraints = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a;
  var IntSize = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p;
  var Node = kotlin_org_jetbrains_compose_ui_ui.$_$.o4;
  var ParentDataModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.n2;
  var sourceInformation = kotlin_org_jetbrains_compose_runtime_runtime.$_$.r1;
  var traceEventStart = kotlin_org_jetbrains_compose_runtime_runtime.$_$.v1;
  var isTraceInProgress = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e1;
  var Companion_getInstance_1 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.e2;
  var traceEventEnd = kotlin_org_jetbrains_compose_runtime_runtime.$_$.u1;
  var Constraints_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.b;
  var toString = kotlin_kotlin.$_$.ob;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var coerceAtMost = kotlin_kotlin.$_$.dc;
  var ModifierNodeElement = kotlin_org_jetbrains_compose_ui_ui.$_$.m2;
  var Companion_getInstance_2 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w2;
  var _Dp___get_value__impl__geb1vb = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y1;
  var offset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.c1;
  var constrainWidth = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.x;
  var constrainHeight = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.w;
  var LayoutModifierNode = kotlin_org_jetbrains_compose_ui_ui.$_$.l2;
  var Enum = kotlin_kotlin.$_$.re;
  var getNumberHashCode = kotlin_kotlin.$_$.ja;
  var _Constraints___get_maxHeight__impl__dt3e8z = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.r1;
  var _Constraints___get_maxWidth__impl__uuyqc = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.s1;
  var Constraints__hashCode_impl_ij7484 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q1;
  var toLong = kotlin_kotlin.$_$.mb;
  var Long = kotlin_kotlin.$_$.we;
  var numberToLong = kotlin_kotlin.$_$.gb;
  var coerceAtLeast = kotlin_kotlin.$_$.ac;
  var IllegalArgumentException_init_$Create$_0 = kotlin_kotlin.$_$.s1;
  var IllegalArgumentException = kotlin_kotlin.$_$.ue;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var get_sign = kotlin_kotlin.$_$.wb;
  var coerceIn = kotlin_kotlin.$_$.ic;
  var ensureNotNull = kotlin_kotlin.$_$.vf;
  var Companion_instance = kotlin_org_jetbrains_compose_ui_ui.$_$.h5;
  var _IntSize___get_width__impl__d9yl4o = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.f2;
  var IntOffset = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n;
  var IntOffset_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o;
  var _IntSize___get_height__impl__prv63b = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.e2;
  var Companion_getInstance_3 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.a3;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var coerceIn_0 = kotlin_kotlin.$_$.hc;
  var _Constraints___get_hasBoundedWidth__impl__7hd0wr = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.n1;
  var _Constraints___get_hasBoundedHeight__impl__bsh4rw = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.m1;
  var IntSize_0 = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.q;
  var get_NoInspectorInfo = kotlin_org_jetbrains_compose_ui_ui.$_$.i3;
  var get_isDebugInspectorInfoEnabled = kotlin_org_jetbrains_compose_ui_ui.$_$.k3;
  var coerceAtLeast_0 = kotlin_kotlin.$_$.bc;
  var coerceAtMost_0 = kotlin_kotlin.$_$.ec;
  var constrain = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.y;
  var Companion_instance_0 = kotlin_org_jetbrains_compose_ui_ui.$_$.n5;
  var get_currentCompositeKeyHash = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a1;
  var materialize = kotlin_org_jetbrains_compose_ui_ui.$_$.t4;
  var Companion_getInstance_4 = kotlin_org_jetbrains_compose_ui_ui.$_$.j5;
  var invalidApplier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.d1;
  var Applier = kotlin_org_jetbrains_compose_runtime_runtime.$_$.h;
  var isInterface = kotlin_kotlin.$_$.xa;
  var _Updater___init__impl__rbfxm8 = kotlin_org_jetbrains_compose_runtime_runtime.$_$.a2;
  var Updater__set_impl_v7kwss = kotlin_org_jetbrains_compose_runtime_runtime.$_$.c2;
  var _Updater___get_composer__impl__9ty7av = kotlin_org_jetbrains_compose_runtime_runtime.$_$.b2;
  var _Constraints___get_hasFixedWidth__impl__4p17wc = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.p1;
  var _Constraints___get_hasFixedHeight__impl__y56fxx = kotlin_org_jetbrains_compose_ui_ui_unit.$_$.o1;
  //endregion
  //region block: pre-declaration
  function get_spacing() {
    // Inline function 'androidx.compose.ui.unit.dp' call
    return _Dp___init__impl__ms3zkb(0);
  }
  setMetadataFor(Horizontal, 'Horizontal', interfaceMeta);
  function get_spacing_0() {
    // Inline function 'androidx.compose.ui.unit.dp' call
    return _Dp___init__impl__ms3zkb(0);
  }
  setMetadataFor(Vertical, 'Vertical', interfaceMeta);
  setMetadataFor(SpacedAligned, 'SpacedAligned', classMeta, VOID, [Vertical, Horizontal]);
  setMetadataFor(Arrangement$Start$1, VOID, classMeta, VOID, [Horizontal]);
  setMetadataFor(Arrangement$End$1, VOID, classMeta, VOID, [Horizontal]);
  setMetadataFor(Arrangement$Top$1, VOID, classMeta, VOID, [Vertical]);
  setMetadataFor(Arrangement$Bottom$1, VOID, classMeta, VOID, [Vertical]);
  setMetadataFor(Arrangement$Center$1, VOID, classMeta, VOID, [Vertical, Horizontal]);
  setMetadataFor(Arrangement$SpaceEvenly$1, VOID, classMeta, VOID, [Vertical, Horizontal]);
  setMetadataFor(Arrangement$SpaceBetween$1, VOID, classMeta, VOID, [Vertical, Horizontal]);
  setMetadataFor(Arrangement$SpaceAround$1, VOID, classMeta, VOID, [Vertical, Horizontal]);
  setMetadataFor(Arrangement, 'Arrangement', objectMeta);
  setMetadataFor(BoxMeasurePolicy, 'BoxMeasurePolicy', classMeta);
  setMetadataFor(BoxChildDataNode, 'BoxChildDataNode', classMeta, Node, [ParentDataModifierNode, Node]);
  setMetadataFor(BoxScopeInstance, 'BoxScopeInstance', objectMeta);
  setMetadataFor(sam$androidx_compose_ui_layout_MeasurePolicy$0, 'sam$androidx_compose_ui_layout_MeasurePolicy$0', classMeta);
  function weight$default(_this__u8e3s4, weight, fill, $super) {
    fill = fill === VOID ? true : fill;
    return $super === VOID ? this.l7u(_this__u8e3s4, weight, fill) : $super.l7u.call(this, _this__u8e3s4, weight, fill);
  }
  setMetadataFor(ColumnScope, 'ColumnScope', interfaceMeta);
  setMetadataFor(ColumnScopeInstance, 'ColumnScopeInstance', objectMeta, VOID, [ColumnScope]);
  setMetadataFor(PaddingValuesImpl, 'PaddingValuesImpl', classMeta, VOID, VOID, PaddingValuesImpl);
  setMetadataFor(PaddingElement, 'PaddingElement', classMeta, ModifierNodeElement);
  setMetadataFor(PaddingNode, 'PaddingNode', classMeta, Node, [LayoutModifierNode, Node]);
  function weight$default_0(_this__u8e3s4, weight, fill, $super) {
    fill = fill === VOID ? true : fill;
    return $super === VOID ? this.l7u(_this__u8e3s4, weight, fill) : $super.l7u.call(this, _this__u8e3s4, weight, fill);
  }
  setMetadataFor(RowScope, 'RowScope', interfaceMeta);
  setMetadataFor(RowScopeInstance, 'RowScopeInstance', objectMeta, VOID, [RowScope]);
  setMetadataFor(RowColumnMeasurePolicy, 'RowColumnMeasurePolicy', classMeta);
  setMetadataFor(LayoutOrientation, 'LayoutOrientation', classMeta, Enum);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(CrossAxisAlignment, 'CrossAxisAlignment', classMeta);
  setMetadataFor(CenterCrossAxisAlignment, 'CenterCrossAxisAlignment', objectMeta, CrossAxisAlignment);
  setMetadataFor(StartCrossAxisAlignment, 'StartCrossAxisAlignment', objectMeta, CrossAxisAlignment);
  setMetadataFor(EndCrossAxisAlignment, 'EndCrossAxisAlignment', objectMeta, CrossAxisAlignment);
  setMetadataFor(VerticalCrossAxisAlignment, 'VerticalCrossAxisAlignment', classMeta, CrossAxisAlignment);
  setMetadataFor(HorizontalCrossAxisAlignment, 'HorizontalCrossAxisAlignment', classMeta, CrossAxisAlignment);
  setMetadataFor(SizeMode, 'SizeMode', classMeta, Enum);
  setMetadataFor(RowColumnParentData, 'RowColumnParentData', classMeta, VOID, VOID, RowColumnParentData);
  setMetadataFor(OrientationIndependentConstraints, 'OrientationIndependentConstraints', classMeta);
  setMetadataFor(LayoutWeightElement, 'LayoutWeightElement', classMeta, ModifierNodeElement);
  setMetadataFor(HorizontalAlignElement, 'HorizontalAlignElement', classMeta, ModifierNodeElement);
  setMetadataFor(LayoutWeightNode, 'LayoutWeightNode', classMeta, Node, [ParentDataModifierNode, Node]);
  setMetadataFor(HorizontalAlignNode, 'HorizontalAlignNode', classMeta, Node, [ParentDataModifierNode, Node]);
  setMetadataFor(RowColumnMeasurementHelper, 'RowColumnMeasurementHelper', classMeta);
  setMetadataFor(RowColumnMeasureHelperResult, 'RowColumnMeasureHelperResult', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(FillElement, 'FillElement', classMeta, ModifierNodeElement);
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(WrapContentElement, 'WrapContentElement', classMeta, ModifierNodeElement);
  setMetadataFor(FillNode, 'FillNode', classMeta, Node, [LayoutModifierNode, Node]);
  setMetadataFor(Direction, 'Direction', classMeta, Enum);
  setMetadataFor(WrapContentNode, 'WrapContentNode', classMeta, Node, [LayoutModifierNode, Node]);
  setMetadataFor(SizeElement, 'SizeElement', classMeta, ModifierNodeElement);
  setMetadataFor(SizeNode, 'SizeNode', classMeta, Node, [LayoutModifierNode, Node]);
  setMetadataFor(SpacerMeasurePolicy, 'SpacerMeasurePolicy', objectMeta);
  //endregion
  function Horizontal() {
  }
  function Vertical() {
  }
  function SpacedAligned(space, rtlMirror, alignment) {
    this.w7s_1 = space;
    this.x7s_1 = rtlMirror;
    this.y7s_1 = alignment;
    this.z7s_1 = this.w7s_1;
  }
  protoOf(SpacedAligned).t7s = function () {
    return this.z7s_1;
  };
  protoOf(SpacedAligned).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (sizes.length === 0)
      return Unit_instance;
    var spacePx = _this__u8e3s4.z35(this.w7s_1);
    var occupied = 0;
    var lastSpace = 0;
    var reversed = this.x7s_1 ? layoutDirection.equals(LayoutDirection_Rtl_getInstance()) : false;
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    Arrangement_getInstance();
    if (!reversed) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable = 0;
      var last = sizes.length;
      while (inductionVariable < last) {
        var item = sizes[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.SpacedAligned.arrange.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        // Inline function 'kotlin.math.min' call
        var a = occupied;
        var b = totalSize - item | 0;
        outPositions[tmp1] = Math.min(a, b);
        // Inline function 'kotlin.math.min' call
        var b_0 = (totalSize - outPositions[tmp1] | 0) - item | 0;
        lastSpace = Math.min(spacePx, b_0);
        occupied = (outPositions[tmp1] + item | 0) + lastSpace | 0;
      }
    } else {
      var inductionVariable_0 = sizes.length - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var i = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.SpacedAligned.arrange.<anonymous>' call
          var it = sizes[i];
          // Inline function 'kotlin.math.min' call
          var a_0 = occupied;
          var b_1 = totalSize - it | 0;
          outPositions[i] = Math.min(a_0, b_1);
          // Inline function 'kotlin.math.min' call
          var b_2 = (totalSize - outPositions[i] | 0) - it | 0;
          lastSpace = Math.min(spacePx, b_2);
          occupied = (outPositions[i] + it | 0) + lastSpace | 0;
        }
         while (0 <= inductionVariable_0);
    }
    occupied = occupied - lastSpace | 0;
    if (!(this.y7s_1 == null) ? occupied < totalSize : false) {
      var groupPosition = this.y7s_1(totalSize - occupied | 0, layoutDirection);
      var inductionVariable_1 = 0;
      var last_0 = outPositions.length - 1 | 0;
      if (inductionVariable_1 <= last_0)
        do {
          var index_0 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          outPositions[index_0] = outPositions[index_0] + groupPosition | 0;
        }
         while (inductionVariable_1 <= last_0);
    }
  };
  protoOf(SpacedAligned).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return this.u7s(_this__u8e3s4, totalSize, sizes, LayoutDirection_Ltr_getInstance(), outPositions);
  };
  protoOf(SpacedAligned).toString = function () {
    return (this.x7s_1 ? '' : 'Absolute') + 'Arrangement#spacedAligned(' + new Dp(this.w7s_1) + ', ' + this.y7s_1 + ')';
  };
  protoOf(SpacedAligned).hashCode = function () {
    var result = Dp__hashCode_impl_sxkrra(this.w7s_1);
    result = imul(result, 31) + getBooleanHashCode(this.x7s_1) | 0;
    result = imul(result, 31) + (this.y7s_1 == null ? 0 : hashCode(this.y7s_1)) | 0;
    return result;
  };
  protoOf(SpacedAligned).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SpacedAligned))
      return false;
    var tmp0_other_with_cast = other instanceof SpacedAligned ? other : THROW_CCE();
    if (!equals(this.w7s_1, tmp0_other_with_cast.w7s_1))
      return false;
    if (!(this.x7s_1 === tmp0_other_with_cast.x7s_1))
      return false;
    if (!equals(this.y7s_1, tmp0_other_with_cast.y7s_1))
      return false;
    return true;
  };
  function Arrangement$Start$1() {
  }
  protoOf(Arrangement$Start$1).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      Arrangement_getInstance().j7t(sizes, outPositions, false);
      tmp = Unit_instance;
    } else {
      Arrangement_getInstance().i7t(totalSize, sizes, outPositions, true);
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(Arrangement$Start$1).toString = function () {
    return 'Arrangement#Start';
  };
  function Arrangement$End$1() {
  }
  protoOf(Arrangement$End$1).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      Arrangement_getInstance().i7t(totalSize, sizes, outPositions, false);
      tmp = Unit_instance;
    } else {
      Arrangement_getInstance().j7t(sizes, outPositions, true);
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(Arrangement$End$1).toString = function () {
    return 'Arrangement#End';
  };
  function Arrangement$Top$1() {
  }
  protoOf(Arrangement$Top$1).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return Arrangement_getInstance().j7t(sizes, outPositions, false);
  };
  protoOf(Arrangement$Top$1).toString = function () {
    return 'Arrangement#Top';
  };
  function Arrangement$Bottom$1() {
  }
  protoOf(Arrangement$Bottom$1).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return Arrangement_getInstance().i7t(totalSize, sizes, outPositions, false);
  };
  protoOf(Arrangement$Bottom$1).toString = function () {
    return 'Arrangement#Bottom';
  };
  function Arrangement$Center$1() {
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.k7t_1 = _Dp___init__impl__ms3zkb(0);
  }
  protoOf(Arrangement$Center$1).t7s = function () {
    return this.k7t_1;
  };
  protoOf(Arrangement$Center$1).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      Arrangement_getInstance().l7t(totalSize, sizes, outPositions, false);
      tmp = Unit_instance;
    } else {
      Arrangement_getInstance().l7t(totalSize, sizes, outPositions, true);
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(Arrangement$Center$1).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return Arrangement_getInstance().l7t(totalSize, sizes, outPositions, false);
  };
  protoOf(Arrangement$Center$1).toString = function () {
    return 'Arrangement#Center';
  };
  function Arrangement$SpaceEvenly$1() {
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.m7t_1 = _Dp___init__impl__ms3zkb(0);
  }
  protoOf(Arrangement$SpaceEvenly$1).t7s = function () {
    return this.m7t_1;
  };
  protoOf(Arrangement$SpaceEvenly$1).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      Arrangement_getInstance().n7t(totalSize, sizes, outPositions, false);
      tmp = Unit_instance;
    } else {
      Arrangement_getInstance().n7t(totalSize, sizes, outPositions, true);
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(Arrangement$SpaceEvenly$1).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return Arrangement_getInstance().n7t(totalSize, sizes, outPositions, false);
  };
  protoOf(Arrangement$SpaceEvenly$1).toString = function () {
    return 'Arrangement#SpaceEvenly';
  };
  function Arrangement$SpaceBetween$1() {
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.o7t_1 = _Dp___init__impl__ms3zkb(0);
  }
  protoOf(Arrangement$SpaceBetween$1).t7s = function () {
    return this.o7t_1;
  };
  protoOf(Arrangement$SpaceBetween$1).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      Arrangement_getInstance().p7t(totalSize, sizes, outPositions, false);
      tmp = Unit_instance;
    } else {
      Arrangement_getInstance().p7t(totalSize, sizes, outPositions, true);
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(Arrangement$SpaceBetween$1).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return Arrangement_getInstance().p7t(totalSize, sizes, outPositions, false);
  };
  protoOf(Arrangement$SpaceBetween$1).toString = function () {
    return 'Arrangement#SpaceBetween';
  };
  function Arrangement$SpaceAround$1() {
    var tmp = this;
    // Inline function 'androidx.compose.ui.unit.dp' call
    tmp.q7t_1 = _Dp___init__impl__ms3zkb(0);
  }
  protoOf(Arrangement$SpaceAround$1).t7s = function () {
    return this.q7t_1;
  };
  protoOf(Arrangement$SpaceAround$1).u7s = function (_this__u8e3s4, totalSize, sizes, layoutDirection, outPositions) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      Arrangement_getInstance().r7t(totalSize, sizes, outPositions, false);
      tmp = Unit_instance;
    } else {
      Arrangement_getInstance().r7t(totalSize, sizes, outPositions, true);
      tmp = Unit_instance;
    }
    return tmp;
  };
  protoOf(Arrangement$SpaceAround$1).v7s = function (_this__u8e3s4, totalSize, sizes, outPositions) {
    return Arrangement_getInstance().r7t(totalSize, sizes, outPositions, false);
  };
  protoOf(Arrangement$SpaceAround$1).toString = function () {
    return 'Arrangement#SpaceAround';
  };
  function Arrangement$spacedBy$lambda(size, layoutDirection) {
    return Companion_getInstance().g4t_1.k4t(0, size, layoutDirection);
  }
  function Arrangement() {
    Arrangement_instance = this;
    var tmp = this;
    tmp.a7t_1 = new Arrangement$Start$1();
    var tmp_0 = this;
    tmp_0.b7t_1 = new Arrangement$End$1();
    var tmp_1 = this;
    tmp_1.c7t_1 = new Arrangement$Top$1();
    var tmp_2 = this;
    tmp_2.d7t_1 = new Arrangement$Bottom$1();
    var tmp_3 = this;
    tmp_3.e7t_1 = new Arrangement$Center$1();
    var tmp_4 = this;
    tmp_4.f7t_1 = new Arrangement$SpaceEvenly$1();
    var tmp_5 = this;
    tmp_5.g7t_1 = new Arrangement$SpaceBetween$1();
    var tmp_6 = this;
    tmp_6.h7t_1 = new Arrangement$SpaceAround$1();
  }
  protoOf(Arrangement).s7t = function (space) {
    return new SpacedAligned(space, true, Arrangement$spacedBy$lambda);
  };
  protoOf(Arrangement).i7t = function (totalSize, size, outPosition, reverseInput) {
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 0;
    var inductionVariable = 0;
    var last = size.length;
    while (inductionVariable < last) {
      var element = size[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.layout.Arrangement.placeRightOrBottom.<anonymous>' call
      accumulator = accumulator + element | 0;
    }
    var consumedSize = accumulator;
    var current = totalSize - consumedSize | 0;
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    if (!reverseInput) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable_0 = 0;
      var last_0 = size.length;
      while (inductionVariable_0 < last_0) {
        var item = size[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.Arrangement.placeRightOrBottom.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        outPosition[tmp1] = current;
        current = current + item | 0;
      }
    } else {
      var inductionVariable_1 = size.length - 1 | 0;
      if (0 <= inductionVariable_1)
        do {
          var i = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.Arrangement.placeRightOrBottom.<anonymous>' call
          var it = size[i];
          outPosition[i] = current;
          current = current + it | 0;
        }
         while (0 <= inductionVariable_1);
    }
  };
  protoOf(Arrangement).j7t = function (size, outPosition, reverseInput) {
    var current = 0;
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    if (!reverseInput) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable = 0;
      var last = size.length;
      while (inductionVariable < last) {
        var item = size[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.Arrangement.placeLeftOrTop.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        outPosition[tmp1] = current;
        current = current + item | 0;
      }
    } else {
      var inductionVariable_0 = size.length - 1 | 0;
      if (0 <= inductionVariable_0)
        do {
          var i = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.Arrangement.placeLeftOrTop.<anonymous>' call
          var it = size[i];
          outPosition[i] = current;
          current = current + it | 0;
        }
         while (0 <= inductionVariable_0);
    }
  };
  protoOf(Arrangement).l7t = function (totalSize, size, outPosition, reverseInput) {
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 0;
    var inductionVariable = 0;
    var last = size.length;
    while (inductionVariable < last) {
      var element = size[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.layout.Arrangement.placeCenter.<anonymous>' call
      accumulator = accumulator + element | 0;
    }
    var consumedSize = accumulator;
    var current = (totalSize - consumedSize | 0) / 2;
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    if (!reverseInput) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable_0 = 0;
      var last_0 = size.length;
      while (inductionVariable_0 < last_0) {
        var item = size[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.Arrangement.placeCenter.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        // Inline function 'kotlin.math.roundToInt' call
        var this_0 = current;
        outPosition[tmp1] = roundToInt(this_0);
        current = current + item;
      }
    } else {
      var inductionVariable_1 = size.length - 1 | 0;
      if (0 <= inductionVariable_1)
        do {
          var i = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.Arrangement.placeCenter.<anonymous>' call
          var it = size[i];
          // Inline function 'kotlin.math.roundToInt' call
          var this_1 = current;
          outPosition[i] = roundToInt(this_1);
          current = current + it;
        }
         while (0 <= inductionVariable_1);
    }
  };
  protoOf(Arrangement).n7t = function (totalSize, size, outPosition, reverseInput) {
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 0;
    var inductionVariable = 0;
    var last = size.length;
    while (inductionVariable < last) {
      var element = size[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceEvenly.<anonymous>' call
      accumulator = accumulator + element | 0;
    }
    var consumedSize = accumulator;
    var gapSize = (totalSize - consumedSize | 0) / (size.length + 1 | 0);
    var current = gapSize;
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    if (!reverseInput) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable_0 = 0;
      var last_0 = size.length;
      while (inductionVariable_0 < last_0) {
        var item = size[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceEvenly.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        // Inline function 'kotlin.math.roundToInt' call
        var this_0 = current;
        outPosition[tmp1] = roundToInt(this_0);
        current = current + (item + gapSize);
      }
    } else {
      var inductionVariable_1 = size.length - 1 | 0;
      if (0 <= inductionVariable_1)
        do {
          var i = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceEvenly.<anonymous>' call
          var it = size[i];
          // Inline function 'kotlin.math.roundToInt' call
          var this_1 = current;
          outPosition[i] = roundToInt(this_1);
          current = current + (it + gapSize);
        }
         while (0 <= inductionVariable_1);
    }
  };
  protoOf(Arrangement).p7t = function (totalSize, size, outPosition, reverseInput) {
    // Inline function 'kotlin.collections.isEmpty' call
    if (size.length === 0)
      return Unit_instance;
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 0;
    var inductionVariable = 0;
    var last = size.length;
    while (inductionVariable < last) {
      var element = size[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceBetween.<anonymous>' call
      accumulator = accumulator + element | 0;
    }
    var consumedSize = accumulator;
    // Inline function 'kotlin.comparisons.maxOf' call
    var a = get_lastIndex(size);
    var noOfGaps = Math.max(a, 1);
    var gapSize = (totalSize - consumedSize | 0) / noOfGaps;
    var current = 0.0;
    if (reverseInput ? size.length === 1 : false) {
      current = gapSize;
    }
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    if (!reverseInput) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable_0 = 0;
      var last_0 = size.length;
      while (inductionVariable_0 < last_0) {
        var item = size[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceBetween.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        // Inline function 'kotlin.math.roundToInt' call
        var this_0 = current;
        outPosition[tmp1] = roundToInt(this_0);
        current = current + (item + gapSize);
      }
    } else {
      var inductionVariable_1 = size.length - 1 | 0;
      if (0 <= inductionVariable_1)
        do {
          var i = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceBetween.<anonymous>' call
          var it = size[i];
          // Inline function 'kotlin.math.roundToInt' call
          var this_1 = current;
          outPosition[i] = roundToInt(this_1);
          current = current + (it + gapSize);
        }
         while (0 <= inductionVariable_1);
    }
  };
  protoOf(Arrangement).r7t = function (totalSize, size, outPosition, reverseInput) {
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 0;
    var inductionVariable = 0;
    var last = size.length;
    while (inductionVariable < last) {
      var element = size[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceAround.<anonymous>' call
      accumulator = accumulator + element | 0;
    }
    var consumedSize = accumulator;
    var tmp;
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (!(size.length === 0)) {
      tmp = (totalSize - consumedSize | 0) / size.length;
    } else {
      tmp = 0.0;
    }
    var gapSize = tmp;
    var current = gapSize / 2;
    // Inline function 'androidx.compose.foundation.layout.Arrangement.forEachIndexed' call
    if (!reverseInput) {
      // Inline function 'kotlin.collections.forEachIndexed' call
      var index = 0;
      var inductionVariable_0 = 0;
      var last_0 = size.length;
      while (inductionVariable_0 < last_0) {
        var item = size[inductionVariable_0];
        inductionVariable_0 = inductionVariable_0 + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceAround.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        // Inline function 'kotlin.math.roundToInt' call
        var this_0 = current;
        outPosition[tmp1] = roundToInt(this_0);
        current = current + (item + gapSize);
      }
    } else {
      var inductionVariable_1 = size.length - 1 | 0;
      if (0 <= inductionVariable_1)
        do {
          var i = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + -1 | 0;
          // Inline function 'androidx.compose.foundation.layout.Arrangement.placeSpaceAround.<anonymous>' call
          var it = size[i];
          // Inline function 'kotlin.math.roundToInt' call
          var this_1 = current;
          outPosition[i] = roundToInt(this_1);
          current = current + (it + gapSize);
        }
         while (0 <= inductionVariable_1);
    }
  };
  var Arrangement_instance;
  function Arrangement_getInstance() {
    if (Arrangement_instance == null)
      new Arrangement();
    return Arrangement_instance;
  }
  function get_DefaultBoxMeasurePolicy() {
    _init_properties_Box_kt__tvzvdl();
    return DefaultBoxMeasurePolicy;
  }
  var DefaultBoxMeasurePolicy;
  var EmptyBoxMeasurePolicy;
  function BoxMeasurePolicy$measure$lambda($this$layout) {
    return Unit_instance;
  }
  function BoxMeasurePolicy$measure$lambda_0($placeable, $measurable, $this_measure, $boxWidth, $boxHeight, this$0) {
    return function ($this$layout) {
      placeInBox($this$layout, $placeable, $measurable, $this_measure.a43(), $boxWidth, $boxHeight, this$0.t7t_1);
      return Unit_instance;
    };
  }
  function BoxMeasurePolicy$measure$lambda_1($placeables, $measurables, $this_measure, $boxWidth, $boxHeight, this$0) {
    return function ($this$layout) {
      var index = 0;
      var indexedObject = $placeables;
      var inductionVariable = 0;
      var last = indexedObject.length;
      while (inductionVariable < last) {
        var item = indexedObject[inductionVariable];
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.compose.foundation.layout.BoxMeasurePolicy.measure.<anonymous>.<anonymous>' call
        var tmp1 = index;
        index = tmp1 + 1 | 0;
        if (!(item instanceof Placeable))
          THROW_CCE();
        var measurable = $measurables.n(tmp1);
        placeInBox($this$layout, item, measurable, $this_measure.a43(), $boxWidth._v, $boxHeight._v, this$0.t7t_1);
      }
      return Unit_instance;
    };
  }
  function BoxMeasurePolicy(alignment, propagateMinConstraints) {
    this.t7t_1 = alignment;
    this.u7t_1 = propagateMinConstraints;
  }
  protoOf(BoxMeasurePolicy).w5s = function (_this__u8e3s4, measurables, constraints) {
    if (measurables.u()) {
      var tmp = _Constraints___get_minWidth__impl__hi9lfi(constraints);
      var tmp_0 = _Constraints___get_minHeight__impl__ev4bgx(constraints);
      return _this__u8e3s4.s57(tmp, tmp_0, VOID, BoxMeasurePolicy$measure$lambda);
    }
    var tmp_1;
    if (this.u7t_1) {
      tmp_1 = constraints;
    } else {
      tmp_1 = Constraints__copy$default_impl_f452rp(constraints, 0, VOID, 0);
    }
    var contentConstraints = tmp_1;
    if (measurables.m() === 1) {
      var measurable = measurables.n(0);
      var boxWidth;
      var boxHeight;
      var placeable;
      if (!get_matchesParentSize(measurable)) {
        placeable = measurable.m57(contentConstraints);
        // Inline function 'kotlin.math.max' call
        var a = _Constraints___get_minWidth__impl__hi9lfi(constraints);
        var b = placeable.n57_1;
        boxWidth = Math.max(a, b);
        // Inline function 'kotlin.math.max' call
        var a_0 = _Constraints___get_minHeight__impl__ev4bgx(constraints);
        var b_0 = placeable.o57_1;
        boxHeight = Math.max(a_0, b_0);
      } else {
        boxWidth = _Constraints___get_minWidth__impl__hi9lfi(constraints);
        boxHeight = _Constraints___get_minHeight__impl__ev4bgx(constraints);
        placeable = measurable.m57(Companion_getInstance_0().u35(_Constraints___get_minWidth__impl__hi9lfi(constraints), _Constraints___get_minHeight__impl__ev4bgx(constraints)));
      }
      return _this__u8e3s4.s57(boxWidth, boxHeight, VOID, BoxMeasurePolicy$measure$lambda_0(placeable, measurable, _this__u8e3s4, boxWidth, boxHeight, this));
    }
    // Inline function 'kotlin.arrayOfNulls' call
    var size = measurables.m();
    var placeables = fillArrayVal(Array(size), null);
    var hasMatchParentSizeChildren = false;
    var boxWidth_0 = {_v: _Constraints___get_minWidth__impl__hi9lfi(constraints)};
    var boxHeight_0 = {_v: _Constraints___get_minHeight__impl__ev4bgx(constraints)};
    // Inline function 'androidx.compose.ui.util.fastForEachIndexed' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    var last = measurables.m() - 1 | 0;
    if (inductionVariable <= last)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var item = measurables.n(index);
        // Inline function 'androidx.compose.foundation.layout.BoxMeasurePolicy.measure.<anonymous>' call
        if (!get_matchesParentSize(item)) {
          var placeable_0 = item.m57(contentConstraints);
          placeables[index] = placeable_0;
          // Inline function 'kotlin.math.max' call
          var a_1 = boxWidth_0._v;
          var b_1 = placeable_0.n57_1;
          boxWidth_0._v = Math.max(a_1, b_1);
          // Inline function 'kotlin.math.max' call
          var a_2 = boxHeight_0._v;
          var b_2 = placeable_0.o57_1;
          boxHeight_0._v = Math.max(a_2, b_2);
        } else {
          hasMatchParentSizeChildren = true;
        }
      }
       while (inductionVariable <= last);
    if (hasMatchParentSizeChildren) {
      var tmp_2;
      var tmp_3 = boxWidth_0._v;
      Companion_getInstance_0();
      if (!(tmp_3 === 2147483647)) {
        tmp_2 = boxWidth_0._v;
      } else {
        tmp_2 = 0;
      }
      var tmp0_minWidth = tmp_2;
      var tmp_4;
      var tmp_5 = boxHeight_0._v;
      Companion_getInstance_0();
      if (!(tmp_5 === 2147483647)) {
        tmp_4 = boxHeight_0._v;
      } else {
        tmp_4 = 0;
      }
      var tmp1_minHeight = tmp_4;
      var tmp2_maxWidth = boxWidth_0._v;
      var tmp3_maxHeight = boxHeight_0._v;
      var matchParentSizeConstraints = Constraints(tmp0_minWidth, tmp2_maxWidth, tmp1_minHeight, tmp3_maxHeight);
      // Inline function 'androidx.compose.ui.util.fastForEachIndexed' call
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable_0 = 0;
      var last_0 = measurables.m() - 1 | 0;
      if (inductionVariable_0 <= last_0)
        do {
          var index_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var item_0 = measurables.n(index_0);
          // Inline function 'androidx.compose.foundation.layout.BoxMeasurePolicy.measure.<anonymous>' call
          if (get_matchesParentSize(item_0)) {
            placeables[index_0] = item_0.m57(matchParentSizeConstraints);
          }
        }
         while (inductionVariable_0 <= last_0);
    }
    var tmp_6 = boxWidth_0._v;
    var tmp_7 = boxHeight_0._v;
    return _this__u8e3s4.s57(tmp_6, tmp_7, VOID, BoxMeasurePolicy$measure$lambda_1(placeables, measurables, _this__u8e3s4, boxWidth_0, boxHeight_0, this));
  };
  protoOf(BoxMeasurePolicy).toString = function () {
    return 'BoxMeasurePolicy(alignment=' + this.t7t_1 + ', propagateMinConstraints=' + this.u7t_1 + ')';
  };
  protoOf(BoxMeasurePolicy).hashCode = function () {
    var result = hashCode(this.t7t_1);
    result = imul(result, 31) + getBooleanHashCode(this.u7t_1) | 0;
    return result;
  };
  protoOf(BoxMeasurePolicy).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof BoxMeasurePolicy))
      return false;
    var tmp0_other_with_cast = other instanceof BoxMeasurePolicy ? other : THROW_CCE();
    if (!equals(this.t7t_1, tmp0_other_with_cast.t7t_1))
      return false;
    if (!(this.u7t_1 === tmp0_other_with_cast.u7t_1))
      return false;
    return true;
  };
  function get_matchesParentSize(_this__u8e3s4) {
    _init_properties_Box_kt__tvzvdl();
    var tmp0_safe_receiver = get_boxChildDataNode(_this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.j7u_1;
    return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
  }
  function placeInBox(_this__u8e3s4, placeable, measurable, layoutDirection, boxWidth, boxHeight, alignment) {
    _init_properties_Box_kt__tvzvdl();
    var tmp0_safe_receiver = get_boxChildDataNode(measurable);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.i7u_1;
    var childAlignment = tmp1_elvis_lhs == null ? alignment : tmp1_elvis_lhs;
    var position = childAlignment.p4t(IntSize(placeable.n57_1, placeable.o57_1), IntSize(boxWidth, boxHeight), layoutDirection);
    _this__u8e3s4.e5s(placeable, position);
  }
  function BoxChildDataNode() {
  }
  function get_boxChildDataNode(_this__u8e3s4) {
    _init_properties_Box_kt__tvzvdl();
    var tmp = _this__u8e3s4.m5p();
    return tmp instanceof BoxChildDataNode ? tmp : null;
  }
  function rememberBoxMeasurePolicy(alignment, propagateMinConstraints, $composer, $changed) {
    _init_properties_Box_kt__tvzvdl();
    var $composer_0 = $composer;
    $composer_0.j1l(56522820);
    sourceInformation($composer_0, 'C(rememberBoxMeasurePolicy)87@3770L113:Box.kt#2w3rfo');
    if (isTraceInProgress()) {
      traceEventStart(56522820, $changed, -1, 'androidx.compose.foundation.layout.rememberBoxMeasurePolicy (Box.kt:84)');
    }
    var tmp;
    if (equals(alignment, Companion_getInstance().u4s_1) ? !propagateMinConstraints : false) {
      tmp = get_DefaultBoxMeasurePolicy();
    } else {
      $composer_0.j1l(-55193971);
      sourceInformation($composer_0, 'CC(remember):Box.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.v1o(alignment) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.k1y(propagateMinConstraints) : false) ? true : ($changed & 48) === 32));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_1().w1r_1) {
        // Inline function 'androidx.compose.foundation.layout.rememberBoxMeasurePolicy.<anonymous>' call
        var value = new BoxMeasurePolicy(alignment, propagateMinConstraints);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      tmp = tmp1_group;
    }
    var tmp0 = tmp;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function BoxScopeInstance() {
  }
  var BoxScopeInstance_instance;
  function BoxScopeInstance_getInstance() {
    return BoxScopeInstance_instance;
  }
  function sam$androidx_compose_ui_layout_MeasurePolicy$0(function_0) {
    this.k7u_1 = function_0;
  }
  protoOf(sam$androidx_compose_ui_layout_MeasurePolicy$0).w5s = function (_this__u8e3s4, measurables, constraints) {
    return this.k7u_1(_this__u8e3s4, measurables, new Constraints_0(constraints));
  };
  function EmptyBoxMeasurePolicy$lambda($this$MeasurePolicy, _anonymous_parameter_0__qggqh8, constraints) {
    _init_properties_Box_kt__tvzvdl();
    var tmp = _Constraints___get_minWidth__impl__hi9lfi(constraints.s35_1);
    var tmp_0 = _Constraints___get_minHeight__impl__ev4bgx(constraints.s35_1);
    return $this$MeasurePolicy.s57(tmp, tmp_0, VOID, EmptyBoxMeasurePolicy$lambda$lambda);
  }
  function EmptyBoxMeasurePolicy$lambda$lambda($this$layout) {
    _init_properties_Box_kt__tvzvdl();
    return Unit_instance;
  }
  var properties_initialized_Box_kt_kr8cbp;
  function _init_properties_Box_kt__tvzvdl() {
    if (!properties_initialized_Box_kt_kr8cbp) {
      properties_initialized_Box_kt_kr8cbp = true;
      DefaultBoxMeasurePolicy = new BoxMeasurePolicy(Companion_getInstance().u4s_1, false);
      var tmp = EmptyBoxMeasurePolicy$lambda;
      EmptyBoxMeasurePolicy = new sam$androidx_compose_ui_layout_MeasurePolicy$0(tmp);
    }
  }
  function get_DefaultColumnMeasurePolicy() {
    _init_properties_Column_kt__s1zb92();
    return DefaultColumnMeasurePolicy;
  }
  var DefaultColumnMeasurePolicy;
  function ColumnScope() {
  }
  function columnMeasurePolicy(verticalArrangement, horizontalAlignment, $composer, $changed) {
    _init_properties_Column_kt__s1zb92();
    var $composer_0 = $composer;
    $composer_0.j1l(1089876336);
    sourceInformation($composer_0, 'C(columnMeasurePolicy)P(1)105@4845L476:Column.kt#2w3rfo');
    if (isTraceInProgress()) {
      traceEventStart(1089876336, $changed, -1, 'androidx.compose.foundation.layout.columnMeasurePolicy (Column.kt:102)');
    }
    var tmp;
    if (equals(verticalArrangement, Arrangement_getInstance().c7t_1) ? equals(horizontalAlignment, Companion_getInstance().g4t_1) : false) {
      tmp = get_DefaultColumnMeasurePolicy();
    } else {
      $composer_0.j1l(-1789958996);
      sourceInformation($composer_0, 'CC(remember):Column.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.v1o(verticalArrangement) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.v1o(horizontalAlignment) : false) ? true : ($changed & 48) === 32));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_1().w1r_1) {
        // Inline function 'androidx.compose.foundation.layout.columnMeasurePolicy.<anonymous>' call
        var tmp0_orientation = LayoutOrientation_Vertical_getInstance();
        var tmp1_arrangementSpacing = verticalArrangement.t7s();
        var tmp2_crossAxisAlignment = Companion_getInstance_5().r7u(horizontalAlignment);
        var tmp3_crossAxisSize = SizeMode_Wrap_getInstance();
        var value = new RowColumnMeasurePolicy(tmp0_orientation, null, verticalArrangement, tmp1_arrangementSpacing, tmp3_crossAxisSize, tmp2_crossAxisAlignment);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      tmp = tmp1_group;
    }
    var tmp0 = tmp;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function ColumnScopeInstance() {
  }
  protoOf(ColumnScopeInstance).l7u = function (_this__u8e3s4, weight, fill) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(weight > 0.0)) {
      // Inline function 'androidx.compose.foundation.layout.ColumnScopeInstance.weight.<anonymous>' call
      var message = 'invalid weight ' + weight + '; must be greater than zero';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return _this__u8e3s4.q4t(new LayoutWeightElement(coerceAtMost(weight, 3.4028235E38), fill));
  };
  protoOf(ColumnScopeInstance).n7u = function (_this__u8e3s4, alignment) {
    return _this__u8e3s4.q4t(new HorizontalAlignElement(alignment));
  };
  var ColumnScopeInstance_instance;
  function ColumnScopeInstance_getInstance() {
    return ColumnScopeInstance_instance;
  }
  var properties_initialized_Column_kt_nm4x4;
  function _init_properties_Column_kt__s1zb92() {
    if (!properties_initialized_Column_kt_nm4x4) {
      properties_initialized_Column_kt_nm4x4 = true;
      var tmp0_orientation = LayoutOrientation_Vertical_getInstance();
      var tmp1_verticalArrangement = Arrangement_getInstance().c7t_1;
      var tmp2_arrangementSpacing = Arrangement_getInstance().c7t_1.t7s();
      var tmp3_crossAxisAlignment = Companion_getInstance_5().r7u(Companion_getInstance().g4t_1);
      var tmp4_crossAxisSize = SizeMode_Wrap_getInstance();
      DefaultColumnMeasurePolicy = new RowColumnMeasurePolicy(tmp0_orientation, null, tmp1_verticalArrangement, tmp2_arrangementSpacing, tmp4_crossAxisSize, tmp3_crossAxisAlignment);
    }
  }
  function PaddingValues(all) {
    return new PaddingValuesImpl(all, all, all, all);
  }
  function padding(_this__u8e3s4, horizontal, vertical) {
    var tmp;
    if (horizontal === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = horizontal;
    }
    horizontal = tmp;
    var tmp_0;
    if (vertical === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_0 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_0 = vertical;
    }
    vertical = tmp_0;
    return _this__u8e3s4.q4t(new PaddingElement(horizontal, vertical, horizontal, vertical, true, padding$lambda(horizontal, vertical)));
  }
  function calculateStartPadding(_this__u8e3s4, layoutDirection) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      tmp = _this__u8e3s4.t7u(layoutDirection);
    } else {
      tmp = _this__u8e3s4.s7u(layoutDirection);
    }
    return tmp;
  }
  function calculateEndPadding(_this__u8e3s4, layoutDirection) {
    var tmp;
    if (layoutDirection.equals(LayoutDirection_Ltr_getInstance())) {
      tmp = _this__u8e3s4.s7u(layoutDirection);
    } else {
      tmp = _this__u8e3s4.t7u(layoutDirection);
    }
    return tmp;
  }
  function padding_0(_this__u8e3s4, all) {
    return _this__u8e3s4.q4t(new PaddingElement(all, all, all, all, true, padding$lambda_0(all)));
  }
  function PaddingValuesImpl(start, top, end, bottom) {
    var tmp;
    if (start === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = start;
    }
    start = tmp;
    var tmp_0;
    if (top === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_0 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_0 = top;
    }
    top = tmp_0;
    var tmp_1;
    if (end === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_1 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_1 = end;
    }
    end = tmp_1;
    var tmp_2;
    if (bottom === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_2 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_2 = bottom;
    }
    bottom = tmp_2;
    this.u7u_1 = start;
    this.v7u_1 = top;
    this.w7u_1 = end;
    this.x7u_1 = bottom;
  }
  protoOf(PaddingValuesImpl).t7u = function (layoutDirection) {
    return layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? this.u7u_1 : this.w7u_1;
  };
  protoOf(PaddingValuesImpl).y7u = function () {
    return this.v7u_1;
  };
  protoOf(PaddingValuesImpl).s7u = function (layoutDirection) {
    return layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? this.w7u_1 : this.u7u_1;
  };
  protoOf(PaddingValuesImpl).z7u = function () {
    return this.x7u_1;
  };
  protoOf(PaddingValuesImpl).equals = function (other) {
    if (!(other instanceof PaddingValuesImpl))
      return false;
    return ((equals(this.u7u_1, other.u7u_1) ? equals(this.v7u_1, other.v7u_1) : false) ? equals(this.w7u_1, other.w7u_1) : false) ? equals(this.x7u_1, other.x7u_1) : false;
  };
  protoOf(PaddingValuesImpl).hashCode = function () {
    return imul(imul(imul(Dp__hashCode_impl_sxkrra(this.u7u_1), 31) + Dp__hashCode_impl_sxkrra(this.v7u_1) | 0, 31) + Dp__hashCode_impl_sxkrra(this.w7u_1) | 0, 31) + Dp__hashCode_impl_sxkrra(this.x7u_1) | 0;
  };
  protoOf(PaddingValuesImpl).toString = function () {
    return 'PaddingValues(start=' + new Dp(this.u7u_1) + ', top=' + new Dp(this.v7u_1) + ', end=' + new Dp(this.w7u_1) + ', bottom=' + new Dp(this.x7u_1) + ')';
  };
  function PaddingElement(start, top, end, bottom, rtlAware, inspectorInfo) {
    var tmp;
    if (start === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = start;
    }
    start = tmp;
    var tmp_0;
    if (top === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_0 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_0 = top;
    }
    top = tmp_0;
    var tmp_1;
    if (end === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_1 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_1 = end;
    }
    end = tmp_1;
    var tmp_2;
    if (bottom === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_2 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_2 = bottom;
    }
    bottom = tmp_2;
    ModifierNodeElement.call(this);
    this.b7v_1 = start;
    this.c7v_1 = top;
    this.d7v_1 = end;
    this.e7v_1 = bottom;
    this.f7v_1 = rtlAware;
    this.g7v_1 = inspectorInfo;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!((((_Dp___get_value__impl__geb1vb(this.b7v_1) >= 0.0 ? true : equals(this.b7v_1, Companion_getInstance_2().n36_1)) ? _Dp___get_value__impl__geb1vb(this.c7v_1) >= 0.0 ? true : equals(this.c7v_1, Companion_getInstance_2().n36_1) : false) ? _Dp___get_value__impl__geb1vb(this.d7v_1) >= 0.0 ? true : equals(this.d7v_1, Companion_getInstance_2().n36_1) : false) ? _Dp___get_value__impl__geb1vb(this.e7v_1) >= 0.0 ? true : equals(this.e7v_1, Companion_getInstance_2().n36_1) : false)) {
      // Inline function 'androidx.compose.foundation.layout.PaddingElement.<anonymous>' call
      var message = 'Padding must be non-negative';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
  }
  protoOf(PaddingElement).g25 = function () {
    return new PaddingNode(this.b7v_1, this.c7v_1, this.d7v_1, this.e7v_1, this.f7v_1);
  };
  protoOf(PaddingElement).h7v = function (node) {
    node.v7v_1 = this.b7v_1;
    node.w7v_1 = this.c7v_1;
    node.x7v_1 = this.d7v_1;
    node.y7v_1 = this.e7v_1;
    node.z7v_1 = this.f7v_1;
  };
  protoOf(PaddingElement).t4v = function (node) {
    return this.h7v(node instanceof PaddingNode ? node : THROW_CCE());
  };
  protoOf(PaddingElement).hashCode = function () {
    var result = Dp__hashCode_impl_sxkrra(this.b7v_1);
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.c7v_1) | 0;
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.d7v_1) | 0;
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.e7v_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.f7v_1) | 0;
    return result;
  };
  protoOf(PaddingElement).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof PaddingElement ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var otherModifierElement = tmp;
    return (((equals(this.b7v_1, otherModifierElement.b7v_1) ? equals(this.c7v_1, otherModifierElement.c7v_1) : false) ? equals(this.d7v_1, otherModifierElement.d7v_1) : false) ? equals(this.e7v_1, otherModifierElement.e7v_1) : false) ? this.f7v_1 === otherModifierElement.f7v_1 : false;
  };
  function PaddingNode$measure$lambda(this$0, $placeable, $this_measure) {
    return function ($this$layout) {
      var tmp;
      if (this$0.z7v_1) {
        $this$layout.b5s($placeable, $this_measure.z35(this$0.v7v_1), $this_measure.z35(this$0.w7v_1));
        tmp = Unit_instance;
      } else {
        $this$layout.d5s($placeable, $this_measure.z35(this$0.v7v_1), $this_measure.z35(this$0.w7v_1));
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function PaddingNode(start, top, end, bottom, rtlAware) {
    var tmp;
    if (start === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp = start;
    }
    start = tmp;
    var tmp_0;
    if (top === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_0 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_0 = top;
    }
    top = tmp_0;
    var tmp_1;
    if (end === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_1 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_1 = end;
    }
    end = tmp_1;
    var tmp_2;
    if (bottom === VOID) {
      // Inline function 'androidx.compose.ui.unit.dp' call
      tmp_2 = _Dp___init__impl__ms3zkb(0);
    } else {
      tmp_2 = bottom;
    }
    bottom = tmp_2;
    Node.call(this);
    this.v7v_1 = start;
    this.w7v_1 = top;
    this.x7v_1 = end;
    this.y7v_1 = bottom;
    this.z7v_1 = rtlAware;
  }
  protoOf(PaddingNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    var horizontal = _this__u8e3s4.z35(this.v7v_1) + _this__u8e3s4.z35(this.x7v_1) | 0;
    var vertical = _this__u8e3s4.z35(this.w7v_1) + _this__u8e3s4.z35(this.y7v_1) | 0;
    var placeable = measurable.m57(offset(constraints, -horizontal | 0, -vertical | 0));
    var width = constrainWidth(constraints, placeable.n57_1 + horizontal | 0);
    var height = constrainHeight(constraints, placeable.o57_1 + vertical | 0);
    return _this__u8e3s4.s57(width, height, VOID, PaddingNode$measure$lambda(this, placeable, _this__u8e3s4));
  };
  function padding$lambda($horizontal, $vertical) {
    return function ($this$$receiver) {
      $this$$receiver.a7w_1 = 'padding';
      $this$$receiver.c7w_1.e7w('horizontal', new Dp($horizontal));
      $this$$receiver.c7w_1.e7w('vertical', new Dp($vertical));
      return Unit_instance;
    };
  }
  function padding$lambda_0($all) {
    return function ($this$$receiver) {
      $this$$receiver.a7w_1 = 'padding';
      $this$$receiver.b7w_1 = new Dp($all);
      return Unit_instance;
    };
  }
  function get_DefaultRowMeasurePolicy() {
    _init_properties_Row_kt__jenljs();
    return DefaultRowMeasurePolicy;
  }
  var DefaultRowMeasurePolicy;
  function RowScope() {
  }
  function rowMeasurePolicy(horizontalArrangement, verticalAlignment, $composer, $changed) {
    _init_properties_Row_kt__jenljs();
    var $composer_0 = $composer;
    $composer_0.j1l(-837807694);
    sourceInformation($composer_0, 'C(rowMeasurePolicy)121@5619L478:Row.kt#2w3rfo');
    if (isTraceInProgress()) {
      traceEventStart(-837807694, $changed, -1, 'androidx.compose.foundation.layout.rowMeasurePolicy (Row.kt:118)');
    }
    var tmp;
    if (equals(horizontalArrangement, Arrangement_getInstance().a7t_1) ? equals(verticalAlignment, Companion_getInstance().d4t_1) : false) {
      tmp = get_DefaultRowMeasurePolicy();
    } else {
      $composer_0.j1l(-1828508738);
      sourceInformation($composer_0, 'CC(remember):Row.kt#9igjgp');
      // Inline function 'androidx.compose.runtime.cache' call
      var invalid = !!(((($changed & 14 ^ 6) > 4 ? $composer_0.v1o(horizontalArrangement) : false) ? true : ($changed & 6) === 4) | ((($changed & 112 ^ 48) > 32 ? $composer_0.v1o(verticalAlignment) : false) ? true : ($changed & 48) === 32));
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.runtime.cache.<anonymous>' call
      var it = $composer_0.x1y();
      var tmp_0;
      if (invalid ? true : it === Companion_getInstance_1().w1r_1) {
        // Inline function 'androidx.compose.foundation.layout.rowMeasurePolicy.<anonymous>' call
        var tmp0_orientation = LayoutOrientation_Horizontal_getInstance();
        var tmp1_arrangementSpacing = horizontalArrangement.t7s();
        var tmp2_crossAxisAlignment = Companion_getInstance_5().g7w(verticalAlignment);
        var tmp3_crossAxisSize = SizeMode_Wrap_getInstance();
        var value = new RowColumnMeasurePolicy(tmp0_orientation, horizontalArrangement, null, tmp1_arrangementSpacing, tmp3_crossAxisSize, tmp2_crossAxisAlignment);
        $composer_0.d1z(value);
        tmp_0 = value;
      } else {
        tmp_0 = it;
      }
      var tmp_1 = tmp_0;
      var tmp1_group = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      $composer_0.l1l();
      tmp = tmp1_group;
    }
    var tmp0 = tmp;
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
    return tmp0;
  }
  function RowScopeInstance() {
  }
  protoOf(RowScopeInstance).l7u = function (_this__u8e3s4, weight, fill) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(weight > 0.0)) {
      // Inline function 'androidx.compose.foundation.layout.RowScopeInstance.weight.<anonymous>' call
      var message = 'invalid weight ' + weight + '; must be greater than zero';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return _this__u8e3s4.q4t(new LayoutWeightElement(coerceAtMost(weight, 3.4028235E38), fill));
  };
  var RowScopeInstance_instance;
  function RowScopeInstance_getInstance() {
    return RowScopeInstance_instance;
  }
  var properties_initialized_Row_kt_sbxnna;
  function _init_properties_Row_kt__jenljs() {
    if (!properties_initialized_Row_kt_sbxnna) {
      properties_initialized_Row_kt_sbxnna = true;
      var tmp0_orientation = LayoutOrientation_Horizontal_getInstance();
      var tmp1_horizontalArrangement = Arrangement_getInstance().a7t_1;
      var tmp2_arrangementSpacing = Arrangement_getInstance().a7t_1.t7s();
      var tmp3_crossAxisAlignment = Companion_getInstance_5().g7w(Companion_getInstance().d4t_1);
      var tmp4_crossAxisSize = SizeMode_Wrap_getInstance();
      DefaultRowMeasurePolicy = new RowColumnMeasurePolicy(tmp0_orientation, tmp1_horizontalArrangement, null, tmp2_arrangementSpacing, tmp4_crossAxisSize, tmp3_crossAxisAlignment);
    }
  }
  function RowColumnMeasurePolicy$measure$lambda($rowColumnMeasureHelper, $measureResult, $this_measure) {
    return function ($this$layout) {
      $rowColumnMeasureHelper.q7w($this$layout, $measureResult, 0, $this_measure.a43());
      return Unit_instance;
    };
  }
  function RowColumnMeasurePolicy(orientation, horizontalArrangement, verticalArrangement, arrangementSpacing, crossAxisSize, crossAxisAlignment) {
    this.r7w_1 = orientation;
    this.s7w_1 = horizontalArrangement;
    this.t7w_1 = verticalArrangement;
    this.u7w_1 = arrangementSpacing;
    this.v7w_1 = crossAxisSize;
    this.w7w_1 = crossAxisAlignment;
  }
  protoOf(RowColumnMeasurePolicy).w5s = function (_this__u8e3s4, measurables, constraints) {
    // Inline function 'kotlin.arrayOfNulls' call
    var size = measurables.m();
    var placeables = fillArrayVal(Array(size), null);
    var rowColumnMeasureHelper = new RowColumnMeasurementHelper(this.r7w_1, this.s7w_1, this.t7w_1, this.u7w_1, this.v7w_1, this.w7w_1, measurables, placeables);
    var measureResult = rowColumnMeasureHelper.x7w(_this__u8e3s4, constraints, 0, measurables.m());
    var layoutWidth;
    var layoutHeight;
    if (this.r7w_1.equals(LayoutOrientation_Horizontal_getInstance())) {
      layoutWidth = measureResult.z7w_1;
      layoutHeight = measureResult.y7w_1;
    } else {
      layoutWidth = measureResult.y7w_1;
      layoutHeight = measureResult.z7w_1;
    }
    return _this__u8e3s4.s57(layoutWidth, layoutHeight, VOID, RowColumnMeasurePolicy$measure$lambda(rowColumnMeasureHelper, measureResult, _this__u8e3s4));
  };
  protoOf(RowColumnMeasurePolicy).toString = function () {
    return 'RowColumnMeasurePolicy(orientation=' + this.r7w_1 + ', horizontalArrangement=' + this.s7w_1 + ', verticalArrangement=' + this.t7w_1 + ', arrangementSpacing=' + new Dp(this.u7w_1) + ', crossAxisSize=' + this.v7w_1 + ', crossAxisAlignment=' + this.w7w_1 + ')';
  };
  protoOf(RowColumnMeasurePolicy).hashCode = function () {
    var result = this.r7w_1.hashCode();
    result = imul(result, 31) + (this.s7w_1 == null ? 0 : hashCode(this.s7w_1)) | 0;
    result = imul(result, 31) + (this.t7w_1 == null ? 0 : hashCode(this.t7w_1)) | 0;
    result = imul(result, 31) + Dp__hashCode_impl_sxkrra(this.u7w_1) | 0;
    result = imul(result, 31) + this.v7w_1.hashCode() | 0;
    result = imul(result, 31) + hashCode(this.w7w_1) | 0;
    return result;
  };
  protoOf(RowColumnMeasurePolicy).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RowColumnMeasurePolicy))
      return false;
    var tmp0_other_with_cast = other instanceof RowColumnMeasurePolicy ? other : THROW_CCE();
    if (!this.r7w_1.equals(tmp0_other_with_cast.r7w_1))
      return false;
    if (!equals(this.s7w_1, tmp0_other_with_cast.s7w_1))
      return false;
    if (!equals(this.t7w_1, tmp0_other_with_cast.t7w_1))
      return false;
    if (!equals(this.u7w_1, tmp0_other_with_cast.u7w_1))
      return false;
    if (!this.v7w_1.equals(tmp0_other_with_cast.v7w_1))
      return false;
    if (!equals(this.w7w_1, tmp0_other_with_cast.w7w_1))
      return false;
    return true;
  };
  var LayoutOrientation_Horizontal_instance;
  var LayoutOrientation_Vertical_instance;
  var LayoutOrientation_entriesInitialized;
  function LayoutOrientation_initEntries() {
    if (LayoutOrientation_entriesInitialized)
      return Unit_instance;
    LayoutOrientation_entriesInitialized = true;
    LayoutOrientation_Horizontal_instance = new LayoutOrientation('Horizontal', 0);
    LayoutOrientation_Vertical_instance = new LayoutOrientation('Vertical', 1);
  }
  function LayoutOrientation(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Companion() {
    Companion_instance_1 = this;
    this.o7u_1 = CenterCrossAxisAlignment_getInstance();
    this.p7u_1 = StartCrossAxisAlignment_getInstance();
    this.q7u_1 = EndCrossAxisAlignment_getInstance();
  }
  protoOf(Companion).g7w = function (vertical) {
    return new VerticalCrossAxisAlignment(vertical);
  };
  protoOf(Companion).r7u = function (horizontal) {
    return new HorizontalCrossAxisAlignment(horizontal);
  };
  var Companion_instance_1;
  function Companion_getInstance_5() {
    if (Companion_instance_1 == null)
      new Companion();
    return Companion_instance_1;
  }
  function CenterCrossAxisAlignment() {
    CenterCrossAxisAlignment_instance = this;
    CrossAxisAlignment.call(this);
  }
  protoOf(CenterCrossAxisAlignment).e7x = function (size, layoutDirection, placeable, beforeCrossAxisAlignmentLine) {
    return size / 2 | 0;
  };
  var CenterCrossAxisAlignment_instance;
  function CenterCrossAxisAlignment_getInstance() {
    if (CenterCrossAxisAlignment_instance == null)
      new CenterCrossAxisAlignment();
    return CenterCrossAxisAlignment_instance;
  }
  function StartCrossAxisAlignment() {
    StartCrossAxisAlignment_instance = this;
    CrossAxisAlignment.call(this);
  }
  protoOf(StartCrossAxisAlignment).e7x = function (size, layoutDirection, placeable, beforeCrossAxisAlignmentLine) {
    return layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? 0 : size;
  };
  var StartCrossAxisAlignment_instance;
  function StartCrossAxisAlignment_getInstance() {
    if (StartCrossAxisAlignment_instance == null)
      new StartCrossAxisAlignment();
    return StartCrossAxisAlignment_instance;
  }
  function EndCrossAxisAlignment() {
    EndCrossAxisAlignment_instance = this;
    CrossAxisAlignment.call(this);
  }
  protoOf(EndCrossAxisAlignment).e7x = function (size, layoutDirection, placeable, beforeCrossAxisAlignmentLine) {
    return layoutDirection.equals(LayoutDirection_Ltr_getInstance()) ? size : 0;
  };
  var EndCrossAxisAlignment_instance;
  function EndCrossAxisAlignment_getInstance() {
    if (EndCrossAxisAlignment_instance == null)
      new EndCrossAxisAlignment();
    return EndCrossAxisAlignment_instance;
  }
  function VerticalCrossAxisAlignment(vertical) {
    CrossAxisAlignment.call(this);
    this.h7x_1 = vertical;
  }
  protoOf(VerticalCrossAxisAlignment).e7x = function (size, layoutDirection, placeable, beforeCrossAxisAlignmentLine) {
    return this.h7x_1.m4t(0, size);
  };
  protoOf(VerticalCrossAxisAlignment).toString = function () {
    return 'VerticalCrossAxisAlignment(vertical=' + this.h7x_1 + ')';
  };
  protoOf(VerticalCrossAxisAlignment).hashCode = function () {
    return hashCode(this.h7x_1);
  };
  protoOf(VerticalCrossAxisAlignment).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof VerticalCrossAxisAlignment))
      return false;
    var tmp0_other_with_cast = other instanceof VerticalCrossAxisAlignment ? other : THROW_CCE();
    if (!equals(this.h7x_1, tmp0_other_with_cast.h7x_1))
      return false;
    return true;
  };
  function HorizontalCrossAxisAlignment(horizontal) {
    CrossAxisAlignment.call(this);
    this.i7x_1 = horizontal;
  }
  protoOf(HorizontalCrossAxisAlignment).e7x = function (size, layoutDirection, placeable, beforeCrossAxisAlignmentLine) {
    return this.i7x_1.k4t(0, size, layoutDirection);
  };
  protoOf(HorizontalCrossAxisAlignment).toString = function () {
    return 'HorizontalCrossAxisAlignment(horizontal=' + this.i7x_1 + ')';
  };
  protoOf(HorizontalCrossAxisAlignment).hashCode = function () {
    return hashCode(this.i7x_1);
  };
  protoOf(HorizontalCrossAxisAlignment).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof HorizontalCrossAxisAlignment))
      return false;
    var tmp0_other_with_cast = other instanceof HorizontalCrossAxisAlignment ? other : THROW_CCE();
    if (!equals(this.i7x_1, tmp0_other_with_cast.i7x_1))
      return false;
    return true;
  };
  function CrossAxisAlignment() {
    Companion_getInstance_5();
  }
  protoOf(CrossAxisAlignment).f7x = function () {
    return false;
  };
  protoOf(CrossAxisAlignment).g7x = function (placeable) {
    return null;
  };
  var SizeMode_Wrap_instance;
  var SizeMode_Expand_instance;
  var SizeMode_entriesInitialized;
  function SizeMode_initEntries() {
    if (SizeMode_entriesInitialized)
      return Unit_instance;
    SizeMode_entriesInitialized = true;
    SizeMode_Wrap_instance = new SizeMode('Wrap', 0);
    SizeMode_Expand_instance = new SizeMode('Expand', 1);
  }
  function SizeMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function get_weight(_this__u8e3s4) {
    var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : _this__u8e3s4.j7x_1;
    return tmp1_elvis_lhs == null ? 0.0 : tmp1_elvis_lhs;
  }
  function RowColumnParentData(weight, fill, crossAxisAlignment) {
    weight = weight === VOID ? 0.0 : weight;
    fill = fill === VOID ? true : fill;
    crossAxisAlignment = crossAxisAlignment === VOID ? null : crossAxisAlignment;
    this.j7x_1 = weight;
    this.k7x_1 = fill;
    this.l7x_1 = crossAxisAlignment;
  }
  protoOf(RowColumnParentData).toString = function () {
    return 'RowColumnParentData(weight=' + this.j7x_1 + ', fill=' + this.k7x_1 + ', crossAxisAlignment=' + this.l7x_1 + ')';
  };
  protoOf(RowColumnParentData).hashCode = function () {
    var result = getNumberHashCode(this.j7x_1);
    result = imul(result, 31) + getBooleanHashCode(this.k7x_1) | 0;
    result = imul(result, 31) + (this.l7x_1 == null ? 0 : hashCode(this.l7x_1)) | 0;
    return result;
  };
  protoOf(RowColumnParentData).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof RowColumnParentData))
      return false;
    var tmp0_other_with_cast = other instanceof RowColumnParentData ? other : THROW_CCE();
    if (!equals(this.j7x_1, tmp0_other_with_cast.j7x_1))
      return false;
    if (!(this.k7x_1 === tmp0_other_with_cast.k7x_1))
      return false;
    if (!equals(this.l7x_1, tmp0_other_with_cast.l7x_1))
      return false;
    return true;
  };
  function get_rowColumnParentData(_this__u8e3s4) {
    var tmp = _this__u8e3s4.m5p();
    return tmp instanceof RowColumnParentData ? tmp : null;
  }
  function _OrientationIndependentConstraints___init__impl__1uqmhf(value) {
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function _OrientationIndependentConstraints___init__impl__1uqmhf_0(mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax) {
    return _OrientationIndependentConstraints___init__impl__1uqmhf(Constraints(mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax));
  }
  function _OrientationIndependentConstraints___init__impl__1uqmhf_1(c, orientation) {
    return _OrientationIndependentConstraints___init__impl__1uqmhf_0(orientation === LayoutOrientation_Horizontal_getInstance() ? _Constraints___get_minWidth__impl__hi9lfi(c) : _Constraints___get_minHeight__impl__ev4bgx(c), orientation === LayoutOrientation_Horizontal_getInstance() ? _Constraints___get_maxWidth__impl__uuyqc(c) : _Constraints___get_maxHeight__impl__dt3e8z(c), orientation === LayoutOrientation_Horizontal_getInstance() ? _Constraints___get_minHeight__impl__ev4bgx(c) : _Constraints___get_minWidth__impl__hi9lfi(c), orientation === LayoutOrientation_Horizontal_getInstance() ? _Constraints___get_maxHeight__impl__dt3e8z(c) : _Constraints___get_maxWidth__impl__uuyqc(c));
  }
  function OrientationIndependentConstraints__toBoxConstraints_impl_o98i7v($this, orientation) {
    var tmp;
    if (orientation === LayoutOrientation_Horizontal_getInstance()) {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
      var tmp_0 = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40($this));
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
      var tmp_1 = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40($this));
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMin' call
      var tmp_2 = _Constraints___get_minHeight__impl__ev4bgx(_get_value__a43j40($this));
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMax' call
      var tmp$ret$3 = _Constraints___get_maxHeight__impl__dt3e8z(_get_value__a43j40($this));
      tmp = Constraints(tmp_0, tmp_1, tmp_2, tmp$ret$3);
    } else {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMin' call
      var tmp_3 = _Constraints___get_minHeight__impl__ev4bgx(_get_value__a43j40($this));
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMax' call
      var tmp_4 = _Constraints___get_maxHeight__impl__dt3e8z(_get_value__a43j40($this));
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
      var tmp_5 = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40($this));
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
      var tmp$ret$7 = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40($this));
      tmp = Constraints(tmp_3, tmp_4, tmp_5, tmp$ret$7);
    }
    return tmp;
  }
  function OrientationIndependentConstraints__copy_impl_osm42c($this, mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax) {
    return _OrientationIndependentConstraints___init__impl__1uqmhf_0(mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax);
  }
  function OrientationIndependentConstraints__copy$default_impl_4x4eq9($this, mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax, $super) {
    var tmp;
    if (mainAxisMin === VOID) {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
      tmp = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40($this));
    } else {
      tmp = mainAxisMin;
    }
    mainAxisMin = tmp;
    var tmp_0;
    if (mainAxisMax === VOID) {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
      tmp_0 = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40($this));
    } else {
      tmp_0 = mainAxisMax;
    }
    mainAxisMax = tmp_0;
    var tmp_1;
    if (crossAxisMin === VOID) {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMin' call
      tmp_1 = _Constraints___get_minHeight__impl__ev4bgx(_get_value__a43j40($this));
    } else {
      tmp_1 = crossAxisMin;
    }
    crossAxisMin = tmp_1;
    var tmp_2;
    if (crossAxisMax === VOID) {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMax' call
      tmp_2 = _Constraints___get_maxHeight__impl__dt3e8z(_get_value__a43j40($this));
    } else {
      tmp_2 = crossAxisMax;
    }
    crossAxisMax = tmp_2;
    var tmp_3;
    if ($super === VOID) {
      tmp_3 = OrientationIndependentConstraints__copy_impl_osm42c($this, mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax);
    } else {
      var tmp_4 = $super;
      tmp_3 = (tmp_4 == null ? null : new OrientationIndependentConstraints(tmp_4)).n7x.call(new OrientationIndependentConstraints($this), mainAxisMin, mainAxisMax, crossAxisMin, crossAxisMax).m7x_1;
    }
    return tmp_3;
  }
  function OrientationIndependentConstraints__toString_impl_h1z0yz($this) {
    return 'OrientationIndependentConstraints(value=' + new Constraints_0($this) + ')';
  }
  function OrientationIndependentConstraints__hashCode_impl_w7z47a($this) {
    return Constraints__hashCode_impl_ij7484($this);
  }
  function OrientationIndependentConstraints__equals_impl_b6og0u($this, other) {
    if (!(other instanceof OrientationIndependentConstraints))
      return false;
    var tmp0_other_with_cast = other instanceof OrientationIndependentConstraints ? other.m7x_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function OrientationIndependentConstraints(value) {
    this.m7x_1 = value;
  }
  protoOf(OrientationIndependentConstraints).toString = function () {
    return OrientationIndependentConstraints__toString_impl_h1z0yz(this.m7x_1);
  };
  protoOf(OrientationIndependentConstraints).hashCode = function () {
    return OrientationIndependentConstraints__hashCode_impl_w7z47a(this.m7x_1);
  };
  protoOf(OrientationIndependentConstraints).equals = function (other) {
    return OrientationIndependentConstraints__equals_impl_b6og0u(this.m7x_1, other);
  };
  function get_isRelative(_this__u8e3s4) {
    var tmp0_safe_receiver = get_crossAxisAlignment(_this__u8e3s4);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.f7x();
    return tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs;
  }
  function get_fill(_this__u8e3s4) {
    var tmp1_elvis_lhs = _this__u8e3s4 == null ? null : _this__u8e3s4.k7x_1;
    return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
  }
  function get_crossAxisAlignment(_this__u8e3s4) {
    return _this__u8e3s4 == null ? null : _this__u8e3s4.l7x_1;
  }
  function LayoutWeightElement(weight, fill) {
    ModifierNodeElement.call(this);
    this.p7x_1 = weight;
    this.q7x_1 = fill;
  }
  protoOf(LayoutWeightElement).g25 = function () {
    return new LayoutWeightNode(this.p7x_1, this.q7x_1);
  };
  protoOf(LayoutWeightElement).r7x = function (node) {
    node.f7y_1 = this.p7x_1;
    node.g7y_1 = this.q7x_1;
  };
  protoOf(LayoutWeightElement).t4v = function (node) {
    return this.r7x(node instanceof LayoutWeightNode ? node : THROW_CCE());
  };
  protoOf(LayoutWeightElement).hashCode = function () {
    var result = getNumberHashCode(this.p7x_1);
    result = imul(31, result) + getBooleanHashCode(this.q7x_1) | 0;
    return result;
  };
  protoOf(LayoutWeightElement).equals = function (other) {
    if (this === other)
      return true;
    var tmp0_elvis_lhs = other instanceof LayoutWeightElement ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var otherModifier = tmp;
    return this.p7x_1 === otherModifier.p7x_1 ? this.q7x_1 === otherModifier.q7x_1 : false;
  };
  function HorizontalAlignElement(horizontal) {
    ModifierNodeElement.call(this);
    this.i7y_1 = horizontal;
  }
  protoOf(HorizontalAlignElement).g25 = function () {
    return new HorizontalAlignNode(this.i7y_1);
  };
  protoOf(HorizontalAlignElement).j7y = function (node) {
    node.x7y_1 = this.i7y_1;
  };
  protoOf(HorizontalAlignElement).t4v = function (node) {
    return this.j7y(node instanceof HorizontalAlignNode ? node : THROW_CCE());
  };
  protoOf(HorizontalAlignElement).hashCode = function () {
    return hashCode(this.i7y_1);
  };
  protoOf(HorizontalAlignElement).equals = function (other) {
    if (this === other)
      return true;
    var tmp0_elvis_lhs = other instanceof HorizontalAlignElement ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var otherModifier = tmp;
    return equals(this.i7y_1, otherModifier.i7y_1);
  };
  function LayoutWeightNode(weight, fill) {
    Node.call(this);
    this.f7y_1 = weight;
    this.g7y_1 = fill;
  }
  protoOf(LayoutWeightNode).o5s = function (_this__u8e3s4, parentData) {
    // Inline function 'kotlin.also' call
    var tmp0_elvis_lhs = parentData instanceof RowColumnParentData ? parentData : null;
    var this_0 = tmp0_elvis_lhs == null ? new RowColumnParentData() : tmp0_elvis_lhs;
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.layout.LayoutWeightNode.modifyParentData.<anonymous>' call
    this_0.j7x_1 = this.f7y_1;
    this_0.k7x_1 = this.g7y_1;
    return this_0;
  };
  function HorizontalAlignNode(horizontal) {
    Node.call(this);
    this.x7y_1 = horizontal;
  }
  protoOf(HorizontalAlignNode).o5s = function (_this__u8e3s4, parentData) {
    // Inline function 'kotlin.also' call
    var tmp0_elvis_lhs = parentData instanceof RowColumnParentData ? parentData : null;
    var this_0 = tmp0_elvis_lhs == null ? new RowColumnParentData() : tmp0_elvis_lhs;
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.layout.HorizontalAlignNode.modifyParentData.<anonymous>' call
    this_0.l7x_1 = Companion_getInstance_5().r7u(this.x7y_1);
    return this_0;
  };
  function LayoutOrientation_Horizontal_getInstance() {
    LayoutOrientation_initEntries();
    return LayoutOrientation_Horizontal_instance;
  }
  function LayoutOrientation_Vertical_getInstance() {
    LayoutOrientation_initEntries();
    return LayoutOrientation_Vertical_instance;
  }
  function SizeMode_Wrap_getInstance() {
    SizeMode_initEntries();
    return SizeMode_Wrap_instance;
  }
  function SizeMode_Expand_getInstance() {
    SizeMode_initEntries();
    return SizeMode_Expand_instance;
  }
  function mainAxisPositions($this, mainAxisLayoutSize, childrenMainAxisSize, mainAxisPositions, measureScope) {
    if ($this.h7w_1.equals(LayoutOrientation_Vertical_getInstance())) {
      // Inline function 'kotlin.with' call
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlin.requireNotNull' call
        var value = $this.j7w_1;
        // Inline function 'kotlin.contracts.contract' call
        if (value == null) {
          // Inline function 'androidx.compose.foundation.layout.RowColumnMeasurementHelper.mainAxisPositions.<anonymous>' call
          var message = 'null verticalArrangement in Column';
          throw IllegalArgumentException_init_$Create$(toString(message));
        } else {
          tmp$ret$1 = value;
          break $l$block;
        }
      }
      // Inline function 'kotlin.contracts.contract' call
      tmp$ret$1.v7s(measureScope, mainAxisLayoutSize, childrenMainAxisSize, mainAxisPositions);
    } else {
      // Inline function 'kotlin.with' call
      var tmp$ret$4;
      $l$block_0: {
        // Inline function 'kotlin.requireNotNull' call
        var value_0 = $this.i7w_1;
        // Inline function 'kotlin.contracts.contract' call
        if (value_0 == null) {
          // Inline function 'androidx.compose.foundation.layout.RowColumnMeasurementHelper.mainAxisPositions.<anonymous>' call
          var message_0 = 'null horizontalArrangement in Row';
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = value_0;
          break $l$block_0;
        }
      }
      // Inline function 'kotlin.contracts.contract' call
      tmp$ret$4.u7s(measureScope, mainAxisLayoutSize, childrenMainAxisSize, measureScope.a43(), mainAxisPositions);
    }
    return mainAxisPositions;
  }
  function getCrossAxisPosition($this, placeable, parentData, crossAxisLayoutSize, layoutDirection, beforeCrossAxisAlignmentLine) {
    var tmp1_elvis_lhs = parentData == null ? null : parentData.l7x_1;
    var childCrossAlignment = tmp1_elvis_lhs == null ? $this.m7w_1 : tmp1_elvis_lhs;
    var tmp = crossAxisLayoutSize - $this.y7y(placeable) | 0;
    var tmp_0;
    if ($this.h7w_1.equals(LayoutOrientation_Horizontal_getInstance())) {
      tmp_0 = LayoutDirection_Ltr_getInstance();
    } else {
      tmp_0 = layoutDirection;
    }
    return childCrossAlignment.e7x(tmp, tmp_0, placeable, beforeCrossAxisAlignmentLine);
  }
  function RowColumnMeasurementHelper(orientation, horizontalArrangement, verticalArrangement, arrangementSpacing, crossAxisSize, crossAxisAlignment, measurables, placeables) {
    this.h7w_1 = orientation;
    this.i7w_1 = horizontalArrangement;
    this.j7w_1 = verticalArrangement;
    this.k7w_1 = arrangementSpacing;
    this.l7w_1 = crossAxisSize;
    this.m7w_1 = crossAxisAlignment;
    this.n7w_1 = measurables;
    this.o7w_1 = placeables;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.n7w_1.m();
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = fillArrayVal(Array(tmp_1), null);
    while (tmp_0 < tmp_1) {
      var tmp_3 = tmp_0;
      tmp_2[tmp_3] = get_rowColumnParentData(this.n7w_1.n(tmp_3));
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.p7w_1 = tmp_2;
  }
  protoOf(RowColumnMeasurementHelper).z7y = function (_this__u8e3s4) {
    return this.h7w_1.equals(LayoutOrientation_Horizontal_getInstance()) ? _this__u8e3s4.n57_1 : _this__u8e3s4.o57_1;
  };
  protoOf(RowColumnMeasurementHelper).y7y = function (_this__u8e3s4) {
    return this.h7w_1.equals(LayoutOrientation_Horizontal_getInstance()) ? _this__u8e3s4.o57_1 : _this__u8e3s4.n57_1;
  };
  protoOf(RowColumnMeasurementHelper).x7w = function (measureScope, constraints, startIndex, endIndex) {
    var constraints_0 = _OrientationIndependentConstraints___init__impl__1uqmhf_1(constraints, this.h7w_1);
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.layout.RowColumnMeasurementHelper.measureWithoutPlacing.<anonymous>' call
    var arrangementSpacingPx = toLong(measureScope.z35(this.k7w_1));
    var totalWeight = 0.0;
    var fixedSpace = new Long(0, 0);
    var crossAxisSpace = 0;
    var weightChildrenCount = 0;
    var anyAlignBy = false;
    var subSize = endIndex - startIndex | 0;
    var spaceAfterLastNoWeight = 0;
    var inductionVariable = startIndex;
    if (inductionVariable < endIndex)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var child = this.n7w_1.n(i);
        var parentData = this.p7w_1[i];
        var weight = get_weight(parentData);
        if (weight > 0.0) {
          totalWeight = totalWeight + weight;
          weightChildrenCount = weightChildrenCount + 1 | 0;
        } else {
          // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
          var mainAxisMax = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40(constraints_0));
          var tmp1_elvis_lhs = this.o7w_1[i];
          var tmp;
          if (tmp1_elvis_lhs == null) {
            var tmp_0;
            Companion_getInstance_0();
            if (mainAxisMax === 2147483647) {
              Companion_getInstance_0();
              tmp_0 = 2147483647;
            } else {
              tmp_0 = coerceAtLeast(numberToLong(mainAxisMax).fb(fixedSpace), new Long(0, 0)).ea();
            }
            tmp = child.m57(OrientationIndependentConstraints__toBoxConstraints_impl_o98i7v(OrientationIndependentConstraints__copy$default_impl_4x4eq9(constraints_0, 0, tmp_0, 0), this.h7w_1));
          } else {
            tmp = tmp1_elvis_lhs;
          }
          var placeable = tmp;
          // Inline function 'kotlin.math.min' call
          var a = arrangementSpacingPx.ea();
          // Inline function 'kotlin.Long.minus' call
          var this_0 = numberToLong(mainAxisMax).fb(fixedSpace);
          var other = this.z7y(placeable);
          var tmp$ret$3 = this_0.fb(toLong(other));
          var b = coerceAtLeast(tmp$ret$3, new Long(0, 0)).ea();
          spaceAfterLastNoWeight = Math.min(a, b);
          // Inline function 'kotlin.Long.plus' call
          var this_1 = fixedSpace;
          var other_0 = this.z7y(placeable) + spaceAfterLastNoWeight | 0;
          fixedSpace = this_1.eb(toLong(other_0));
          // Inline function 'kotlin.math.max' call
          var a_0 = crossAxisSpace;
          var b_0 = this.y7y(placeable);
          crossAxisSpace = Math.max(a_0, b_0);
          anyAlignBy = anyAlignBy ? true : get_isRelative(parentData);
          this.o7w_1[i] = placeable;
        }
      }
       while (inductionVariable < endIndex);
    var weightedSpace = 0;
    if (weightChildrenCount === 0) {
      // Inline function 'kotlin.Long.minus' call
      var this_2 = fixedSpace;
      var other_1 = spaceAfterLastNoWeight;
      fixedSpace = this_2.fb(toLong(other_1));
    } else {
      var tmp_1;
      var tmp_2;
      if (totalWeight > 0.0) {
        // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
        var tmp_3 = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40(constraints_0));
        Companion_getInstance_0();
        tmp_2 = !(tmp_3 === 2147483647);
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
        tmp_1 = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40(constraints_0));
      } else {
        // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
        tmp_1 = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40(constraints_0));
      }
      var targetSpace = tmp_1;
      // Inline function 'kotlin.Long.times' call
      var other_2 = weightChildrenCount - 1 | 0;
      var arrangementSpacingTotal = arrangementSpacingPx.w9(toLong(other_2));
      var remainingToTarget = coerceAtLeast(numberToLong(targetSpace).fb(fixedSpace).fb(arrangementSpacingTotal), new Long(0, 0));
      var tmp_4;
      if (totalWeight > 0.0) {
        // Inline function 'kotlin.Long.div' call
        var other_3 = totalWeight;
        tmp_4 = remainingToTarget.sb() / other_3;
      } else {
        tmp_4 = 0.0;
      }
      var weightUnitSpace = tmp_4;
      var remainder = remainingToTarget;
      var inductionVariable_0 = startIndex;
      if (inductionVariable_0 < endIndex)
        do {
          var i_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          var itemWeight = get_weight(this.p7w_1[i_0]);
          var weightedSize = weightUnitSpace * itemWeight;
          try {
            // Inline function 'kotlin.Long.minus' call
            var this_3 = remainder;
            // Inline function 'kotlin.math.roundToInt' call
            var other_4 = roundToInt(weightedSize);
            remainder = this_3.fb(toLong(other_4));
          } catch ($p) {
            if ($p instanceof IllegalArgumentException) {
              var e = $p;
              // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
              var tmp_5 = 'This log indicates a hard-to-reproduce Compose issue, modified with additional debugging details. Please help us by adding your experiences to the bug link provided. Thank you for helping us improve Compose. https://issuetracker.google.com/issues/297974033 mainAxisMax ' + _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40(constraints_0)) + 'mainAxisMin ';
              // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
              var tmp$ret$16 = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40(constraints_0));
              throw IllegalArgumentException_init_$Create$_0(tmp_5 + tmp$ret$16 + 'targetSpace ' + targetSpace + 'arrangementSpacingPx ' + arrangementSpacingPx + 'weightChildrenCount ' + weightChildrenCount + 'fixedSpace ' + fixedSpace + 'arrangementSpacingTotal ' + arrangementSpacingTotal + 'remainingToTarget ' + remainingToTarget.toString() + 'totalWeight ' + totalWeight + 'weightUnitSpace ' + weightUnitSpace + 'itemWeight ' + itemWeight + 'weightedSize ' + weightedSize, e);
            } else {
              throw $p;
            }
          }
        }
         while (inductionVariable_0 < endIndex);
      var inductionVariable_1 = startIndex;
      if (inductionVariable_1 < endIndex)
        do {
          var i_1 = inductionVariable_1;
          inductionVariable_1 = inductionVariable_1 + 1 | 0;
          if (this.o7w_1[i_1] == null) {
            var child_0 = this.n7w_1.n(i_1);
            var parentData_0 = this.p7w_1[i_1];
            var weight_0 = get_weight(parentData_0);
            // Inline function 'kotlin.check' call
            // Inline function 'kotlin.contracts.contract' call
            if (!(weight_0 > 0.0)) {
              // Inline function 'androidx.compose.foundation.layout.RowColumnMeasurementHelper.measureWithoutPlacing.<anonymous>' call
              var message = 'All weights <= 0 should have placeables';
              throw IllegalStateException_init_$Create$(toString(message));
            }
            var remainderUnit = get_sign(remainder);
            // Inline function 'kotlin.Long.minus' call
            remainder = remainder.fb(toLong(remainderUnit));
            var weightedSize_0 = weightUnitSpace * weight_0;
            // Inline function 'kotlin.math.max' call
            // Inline function 'kotlin.math.roundToInt' call
            var b_1 = roundToInt(weightedSize_0) + remainderUnit | 0;
            var childMainAxisSize = Math.max(0, b_1);
            var childConstraints;
            try {
              var tmp_6;
              var tmp_7;
              if (get_fill(parentData_0)) {
                Companion_getInstance_0();
                tmp_7 = !(childMainAxisSize === 2147483647);
              } else {
                tmp_7 = false;
              }
              if (tmp_7) {
                tmp_6 = childMainAxisSize;
              } else {
                tmp_6 = 0;
              }
              var tmp_8 = tmp_6;
              // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMax' call
              var tmp$ret$21 = _Constraints___get_maxHeight__impl__dt3e8z(_get_value__a43j40(constraints_0));
              childConstraints = OrientationIndependentConstraints__toBoxConstraints_impl_o98i7v(_OrientationIndependentConstraints___init__impl__1uqmhf_0(tmp_8, childMainAxisSize, 0, tmp$ret$21), this.h7w_1);
            } catch ($p) {
              if ($p instanceof IllegalArgumentException) {
                var e_0 = $p;
                // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
                var tmp_9 = 'This log indicates a hard-to-reproduce Compose issue, modified with additional debugging details. Please help us by adding your experiences to the bug link provided. Thank you for helping us improve Compose. https://issuetracker.google.com/issues/300280216 mainAxisMax ' + _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40(constraints_0)) + 'mainAxisMin ';
                // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
                var tmp$ret$23 = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40(constraints_0));
                throw IllegalArgumentException_init_$Create$_0(tmp_9 + tmp$ret$23 + 'targetSpace ' + targetSpace + 'arrangementSpacingPx ' + arrangementSpacingPx + 'weightChildrenCount ' + weightChildrenCount + 'fixedSpace ' + fixedSpace + 'arrangementSpacingTotal ' + arrangementSpacingTotal + 'remainingToTarget ' + remainingToTarget.toString() + 'totalWeight ' + totalWeight + 'weightUnitSpace ' + weightUnitSpace + 'weight ' + weight_0 + 'weightedSize ' + weightedSize_0 + 'remainderUnit ' + remainderUnit + 'childMainAxisSize ' + childMainAxisSize, e_0);
              } else {
                throw $p;
              }
            }
            var placeable_0 = child_0.m57(childConstraints);
            weightedSpace = weightedSpace + this.z7y(placeable_0) | 0;
            // Inline function 'kotlin.math.max' call
            var a_1 = crossAxisSpace;
            var b_2 = this.y7y(placeable_0);
            crossAxisSpace = Math.max(a_1, b_2);
            anyAlignBy = anyAlignBy ? true : get_isRelative(parentData_0);
            this.o7w_1[i_1] = placeable_0;
          }
        }
         while (inductionVariable_1 < endIndex);
      var tmp_10 = numberToLong(weightedSpace).eb(arrangementSpacingTotal);
      var tmp_11 = new Long(0, 0);
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMax' call
      var tmp$ret$25 = _Constraints___get_maxWidth__impl__uuyqc(_get_value__a43j40(constraints_0));
      weightedSpace = coerceIn(tmp_10, tmp_11, numberToLong(tmp$ret$25).fb(fixedSpace)).ea();
    }
    var beforeCrossAxisAlignmentLine = 0;
    var afterCrossAxisAlignmentLine = 0;
    if (anyAlignBy) {
      var inductionVariable_2 = startIndex;
      if (inductionVariable_2 < endIndex)
        do {
          var i_2 = inductionVariable_2;
          inductionVariable_2 = inductionVariable_2 + 1 | 0;
          var placeable_1 = ensureNotNull(this.o7w_1[i_2]);
          var parentData_1 = this.p7w_1[i_2];
          var tmp5_safe_receiver = get_crossAxisAlignment(parentData_1);
          var alignmentLinePosition = tmp5_safe_receiver == null ? null : tmp5_safe_receiver.g7x(placeable_1);
          if (!(alignmentLinePosition == null)) {
            // Inline function 'kotlin.math.max' call
            var a_2 = beforeCrossAxisAlignmentLine;
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'androidx.compose.foundation.layout.RowColumnMeasurementHelper.measureWithoutPlacing.<anonymous>' call
            var tmp_12;
            if (!(alignmentLinePosition === -2147483648)) {
              tmp_12 = alignmentLinePosition;
            } else {
              tmp_12 = 0;
            }
            var b_3 = tmp_12;
            beforeCrossAxisAlignmentLine = Math.max(a_2, b_3);
            // Inline function 'kotlin.math.max' call
            var a_3 = afterCrossAxisAlignmentLine;
            var tmp_13 = this.y7y(placeable_1);
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            // Inline function 'androidx.compose.foundation.layout.RowColumnMeasurementHelper.measureWithoutPlacing.<anonymous>' call
            var tmp_14;
            if (!(alignmentLinePosition === -2147483648)) {
              tmp_14 = alignmentLinePosition;
            } else {
              tmp_14 = this.y7y(placeable_1);
            }
            var b_4 = tmp_13 - tmp_14 | 0;
            afterCrossAxisAlignmentLine = Math.max(a_3, b_4);
          }
        }
         while (inductionVariable_2 < endIndex);
    }
    // Inline function 'kotlin.math.max' call
    // Inline function 'kotlin.Long.plus' call
    var this_4 = fixedSpace;
    var other_5 = weightedSpace;
    var tmp$ret$32 = this_4.eb(toLong(other_5));
    var a_4 = coerceAtLeast(tmp$ret$32, new Long(0, 0)).ea();
    // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.mainAxisMin' call
    var b_5 = _Constraints___get_minWidth__impl__hi9lfi(_get_value__a43j40(constraints_0));
    var mainAxisLayoutSize = Math.max(a_4, b_5);
    var tmp_15;
    var tmp_16;
    // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMax' call
    var tmp_17 = _Constraints___get_maxHeight__impl__dt3e8z(_get_value__a43j40(constraints_0));
    Companion_getInstance_0();
    if (!(tmp_17 === 2147483647)) {
      tmp_16 = this.l7w_1.equals(SizeMode_Expand_getInstance());
    } else {
      tmp_16 = false;
    }
    if (tmp_16) {
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMax' call
      tmp_15 = _Constraints___get_maxHeight__impl__dt3e8z(_get_value__a43j40(constraints_0));
    } else {
      // Inline function 'kotlin.math.max' call
      var a_5 = crossAxisSpace;
      // Inline function 'kotlin.math.max' call
      // Inline function 'androidx.compose.foundation.layout.OrientationIndependentConstraints.crossAxisMin' call
      var a_6 = _Constraints___get_minHeight__impl__ev4bgx(_get_value__a43j40(constraints_0));
      var b_6 = beforeCrossAxisAlignmentLine + afterCrossAxisAlignmentLine | 0;
      var b_7 = Math.max(a_6, b_6);
      tmp_15 = Math.max(a_5, b_7);
    }
    var crossAxisLayoutSize = tmp_15;
    var tmp_18 = 0;
    var tmp_19 = new Int32Array(subSize);
    while (tmp_18 < subSize) {
      tmp_19[tmp_18] = 0;
      tmp_18 = tmp_18 + 1 | 0;
    }
    var mainAxisPositions_0 = tmp_19;
    var tmp_20 = 0;
    var tmp_21 = new Int32Array(subSize);
    while (tmp_20 < subSize) {
      var tmp_22 = tmp_20;
      tmp_21[tmp_22] = this.z7y(ensureNotNull(this.o7w_1[tmp_22 + startIndex | 0]));
      tmp_20 = tmp_20 + 1 | 0;
    }
    var childrenMainAxisSize = tmp_21;
    var tmp6_beforeCrossAxisAlignmentLine = beforeCrossAxisAlignmentLine;
    var tmp7_mainAxisPositions = mainAxisPositions(this, mainAxisLayoutSize, childrenMainAxisSize, mainAxisPositions_0, measureScope);
    return new RowColumnMeasureHelperResult(crossAxisLayoutSize, mainAxisLayoutSize, startIndex, endIndex, tmp6_beforeCrossAxisAlignmentLine, tmp7_mainAxisPositions);
  };
  protoOf(RowColumnMeasurementHelper).q7w = function (placeableScope, measureResult, crossAxisOffset, layoutDirection) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = measureResult.a7x_1;
    var last = measureResult.b7x_1;
    var tmp;
    if (inductionVariable < last) {
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var placeable = this.o7w_1[i];
        ensureNotNull(placeable);
        var mainAxisPositions = measureResult.d7x_1;
        var tmp_0 = this.n7w_1.n(i).m5p();
        var crossAxisPosition = getCrossAxisPosition(this, placeable, tmp_0 instanceof RowColumnParentData ? tmp_0 : null, measureResult.y7w_1, layoutDirection, measureResult.c7x_1) + crossAxisOffset | 0;
        if (this.h7w_1.equals(LayoutOrientation_Horizontal_getInstance())) {
          placeableScope.d5s(placeable, mainAxisPositions[i - measureResult.a7x_1 | 0], crossAxisPosition);
        } else {
          placeableScope.d5s(placeable, crossAxisPosition, mainAxisPositions[i - measureResult.a7x_1 | 0]);
        }
      }
       while (inductionVariable < last);
      tmp = Unit_instance;
    }
  };
  function RowColumnMeasureHelperResult(crossAxisSize, mainAxisSize, startIndex, endIndex, beforeCrossAxisAlignmentLine, mainAxisPositions) {
    this.y7w_1 = crossAxisSize;
    this.z7w_1 = mainAxisSize;
    this.a7x_1 = startIndex;
    this.b7x_1 = endIndex;
    this.c7x_1 = beforeCrossAxisAlignmentLine;
    this.d7x_1 = mainAxisPositions;
  }
  function get_FillWholeMaxWidth() {
    _init_properties_Size_kt__jcru8v();
    return FillWholeMaxWidth;
  }
  var FillWholeMaxWidth;
  var FillWholeMaxHeight;
  function get_FillWholeMaxSize() {
    _init_properties_Size_kt__jcru8v();
    return FillWholeMaxSize;
  }
  var FillWholeMaxSize;
  var WrapContentWidthCenter;
  var WrapContentWidthStart;
  var WrapContentHeightCenter;
  var WrapContentHeightTop;
  var WrapContentSizeCenter;
  var WrapContentSizeTopStart;
  function Companion_0() {
  }
  protoOf(Companion_0).a7z = function (fraction) {
    return new FillElement(Direction_Horizontal_getInstance(), fraction, 'fillMaxWidth');
  };
  protoOf(Companion_0).b7z = function (fraction) {
    return new FillElement(Direction_Vertical_getInstance(), fraction, 'fillMaxHeight');
  };
  protoOf(Companion_0).c7z = function (fraction) {
    return new FillElement(Direction_Both_getInstance(), fraction, 'fillMaxSize');
  };
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function FillElement(direction, fraction, inspectorName) {
    ModifierNodeElement.call(this);
    this.e7z_1 = direction;
    this.f7z_1 = fraction;
    this.g7z_1 = inspectorName;
  }
  protoOf(FillElement).g25 = function () {
    return new FillNode(this.e7z_1, this.f7z_1);
  };
  protoOf(FillElement).h7z = function (node) {
    node.v7z_1 = this.e7z_1;
    node.w7z_1 = this.f7z_1;
  };
  protoOf(FillElement).t4v = function (node) {
    return this.h7z(node instanceof FillNode ? node : THROW_CCE());
  };
  protoOf(FillElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof FillElement))
      return false;
    if (!this.e7z_1.equals(other.e7z_1))
      return false;
    if (!(this.f7z_1 === other.f7z_1))
      return false;
    return true;
  };
  protoOf(FillElement).hashCode = function () {
    var result = this.e7z_1.hashCode();
    result = imul(31, result) + getNumberHashCode(this.f7z_1) | 0;
    return result;
  };
  function WrapContentElement$Companion$width$lambda($align) {
    return function (size, layoutDirection) {
      return new IntOffset_0(IntOffset($align.k4t(0, _IntSize___get_width__impl__d9yl4o(size.d37_1), layoutDirection), 0));
    };
  }
  function WrapContentElement$Companion$height$lambda($align) {
    return function (size, _anonymous_parameter_1__qggqgd) {
      return new IntOffset_0(IntOffset(0, $align.m4t(0, _IntSize___get_height__impl__prv63b(size.d37_1))));
    };
  }
  function WrapContentElement$Companion$size$lambda($align) {
    return function (size, layoutDirection) {
      return new IntOffset_0($align.p4t(Companion_getInstance_3().c37_1, size.d37_1, layoutDirection));
    };
  }
  function Companion_1() {
  }
  protoOf(Companion_1).x7z = function (align, unbounded) {
    var tmp = Direction_Horizontal_getInstance();
    return new WrapContentElement(tmp, unbounded, WrapContentElement$Companion$width$lambda(align), align, 'wrapContentWidth');
  };
  protoOf(Companion_1).y7z = function (align, unbounded) {
    var tmp = Direction_Vertical_getInstance();
    return new WrapContentElement(tmp, unbounded, WrapContentElement$Companion$height$lambda(align), align, 'wrapContentHeight');
  };
  protoOf(Companion_1).z7z = function (align, unbounded) {
    var tmp = Direction_Both_getInstance();
    return new WrapContentElement(tmp, unbounded, WrapContentElement$Companion$size$lambda(align), align, 'wrapContentSize');
  };
  var Companion_instance_3;
  function Companion_getInstance_7() {
    return Companion_instance_3;
  }
  function WrapContentElement(direction, unbounded, alignmentCallback, align, inspectorName) {
    ModifierNodeElement.call(this);
    this.b80_1 = direction;
    this.c80_1 = unbounded;
    this.d80_1 = alignmentCallback;
    this.e80_1 = align;
    this.f80_1 = inspectorName;
  }
  protoOf(WrapContentElement).g25 = function () {
    return new WrapContentNode(this.b80_1, this.c80_1, this.d80_1);
  };
  protoOf(WrapContentElement).g80 = function (node) {
    node.u80_1 = this.b80_1;
    node.v80_1 = this.c80_1;
    node.w80_1 = this.d80_1;
  };
  protoOf(WrapContentElement).t4v = function (node) {
    return this.g80(node instanceof WrapContentNode ? node : THROW_CCE());
  };
  protoOf(WrapContentElement).equals = function (other) {
    if (this === other)
      return true;
    if (other === null)
      return false;
    if (!getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof WrapContentElement))
      THROW_CCE();
    if (!this.b80_1.equals(other.b80_1))
      return false;
    if (!(this.c80_1 === other.c80_1))
      return false;
    if (!equals(this.e80_1, other.e80_1))
      return false;
    return true;
  };
  protoOf(WrapContentElement).hashCode = function () {
    var result = this.b80_1.hashCode();
    result = imul(31, result) + getBooleanHashCode(this.c80_1) | 0;
    result = imul(31, result) + hashCode(this.e80_1) | 0;
    return result;
  };
  function FillNode$measure$lambda($placeable) {
    return function ($this$layout) {
      $this$layout.b5s($placeable, 0, 0);
      return Unit_instance;
    };
  }
  function FillNode(direction, fraction) {
    Node.call(this);
    this.v7z_1 = direction;
    this.w7z_1 = fraction;
  }
  protoOf(FillNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    var minWidth;
    var maxWidth;
    if (_Constraints___get_hasBoundedWidth__impl__7hd0wr(constraints) ? !this.v7z_1.equals(Direction_Vertical_getInstance()) : false) {
      // Inline function 'kotlin.math.roundToInt' call
      var this_0 = _Constraints___get_maxWidth__impl__uuyqc(constraints) * this.w7z_1;
      var tmp$ret$0 = roundToInt(this_0);
      var width = coerceIn_0(tmp$ret$0, _Constraints___get_minWidth__impl__hi9lfi(constraints), _Constraints___get_maxWidth__impl__uuyqc(constraints));
      minWidth = width;
      maxWidth = width;
    } else {
      minWidth = _Constraints___get_minWidth__impl__hi9lfi(constraints);
      maxWidth = _Constraints___get_maxWidth__impl__uuyqc(constraints);
    }
    var minHeight;
    var maxHeight;
    if (_Constraints___get_hasBoundedHeight__impl__bsh4rw(constraints) ? !this.v7z_1.equals(Direction_Horizontal_getInstance()) : false) {
      // Inline function 'kotlin.math.roundToInt' call
      var this_1 = _Constraints___get_maxHeight__impl__dt3e8z(constraints) * this.w7z_1;
      var tmp$ret$1 = roundToInt(this_1);
      var height = coerceIn_0(tmp$ret$1, _Constraints___get_minHeight__impl__ev4bgx(constraints), _Constraints___get_maxHeight__impl__dt3e8z(constraints));
      minHeight = height;
      maxHeight = height;
    } else {
      minHeight = _Constraints___get_minHeight__impl__ev4bgx(constraints);
      maxHeight = _Constraints___get_maxHeight__impl__dt3e8z(constraints);
    }
    var placeable = measurable.m57(Constraints(minWidth, maxWidth, minHeight, maxHeight));
    var tmp = placeable.n57_1;
    var tmp_0 = placeable.o57_1;
    return _this__u8e3s4.s57(tmp, tmp_0, VOID, FillNode$measure$lambda(placeable));
  };
  var Direction_Vertical_instance;
  var Direction_Horizontal_instance;
  var Direction_Both_instance;
  var Direction_entriesInitialized;
  function Direction_initEntries() {
    if (Direction_entriesInitialized)
      return Unit_instance;
    Direction_entriesInitialized = true;
    Direction_Vertical_instance = new Direction('Vertical', 0);
    Direction_Horizontal_instance = new Direction('Horizontal', 1);
    Direction_Both_instance = new Direction('Both', 2);
  }
  function Direction(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function WrapContentNode$measure$lambda(this$0, $wrapperWidth, $placeable, $wrapperHeight, $this_measure) {
    return function ($this$layout) {
      var position = this$0.w80_1(new IntSize_0(IntSize($wrapperWidth - $placeable.n57_1 | 0, $wrapperHeight - $placeable.o57_1 | 0)), $this_measure.a43()).t36_1;
      $this$layout.e5s($placeable, position);
      return Unit_instance;
    };
  }
  function WrapContentNode(direction, unbounded, alignmentCallback) {
    Node.call(this);
    this.u80_1 = direction;
    this.v80_1 = unbounded;
    this.w80_1 = alignmentCallback;
  }
  protoOf(WrapContentNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    var tmp0_minWidth = !this.u80_1.equals(Direction_Vertical_getInstance()) ? 0 : _Constraints___get_minWidth__impl__hi9lfi(constraints);
    var tmp1_minHeight = !this.u80_1.equals(Direction_Horizontal_getInstance()) ? 0 : _Constraints___get_minHeight__impl__ev4bgx(constraints);
    var tmp;
    if (!this.u80_1.equals(Direction_Vertical_getInstance()) ? this.v80_1 : false) {
      Companion_getInstance_0();
      tmp = 2147483647;
    } else {
      tmp = _Constraints___get_maxWidth__impl__uuyqc(constraints);
    }
    var tmp2_maxWidth = tmp;
    var tmp_0;
    if (!this.u80_1.equals(Direction_Horizontal_getInstance()) ? this.v80_1 : false) {
      Companion_getInstance_0();
      tmp_0 = 2147483647;
    } else {
      tmp_0 = _Constraints___get_maxHeight__impl__dt3e8z(constraints);
    }
    var tmp3_maxHeight = tmp_0;
    var wrappedConstraints = Constraints(tmp0_minWidth, tmp2_maxWidth, tmp1_minHeight, tmp3_maxHeight);
    var placeable = measurable.m57(wrappedConstraints);
    var wrapperWidth = coerceIn_0(placeable.n57_1, _Constraints___get_minWidth__impl__hi9lfi(constraints), _Constraints___get_maxWidth__impl__uuyqc(constraints));
    var wrapperHeight = coerceIn_0(placeable.o57_1, _Constraints___get_minHeight__impl__ev4bgx(constraints), _Constraints___get_maxHeight__impl__dt3e8z(constraints));
    return _this__u8e3s4.s57(wrapperWidth, wrapperHeight, VOID, WrapContentNode$measure$lambda(this, wrapperWidth, placeable, wrapperHeight, _this__u8e3s4));
  };
  function size(_this__u8e3s4, size) {
    _init_properties_Size_kt__jcru8v();
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = size$lambda(size);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp0_inspectorInfo = tmp;
    return _this__u8e3s4.q4t(new SizeElement(size, size, size, size, true, tmp0_inspectorInfo));
  }
  function fillMaxSize(_this__u8e3s4, fraction) {
    fraction = fraction === VOID ? 1.0 : fraction;
    _init_properties_Size_kt__jcru8v();
    return _this__u8e3s4.q4t(fraction === 1.0 ? get_FillWholeMaxSize() : Companion_instance_2.c7z(fraction));
  }
  function height(_this__u8e3s4, height) {
    _init_properties_Size_kt__jcru8v();
    // Inline function 'androidx.compose.ui.platform.debugInspectorInfo' call
    var tmp;
    if (get_isDebugInspectorInfoEnabled()) {
      tmp = height$lambda(height);
    } else {
      tmp = get_NoInspectorInfo();
    }
    var tmp$ret$0 = tmp;
    return _this__u8e3s4.q4t(new SizeElement(VOID, height, VOID, height, true, tmp$ret$0));
  }
  function fillMaxWidth(_this__u8e3s4, fraction) {
    fraction = fraction === VOID ? 1.0 : fraction;
    _init_properties_Size_kt__jcru8v();
    return _this__u8e3s4.q4t(fraction === 1.0 ? get_FillWholeMaxWidth() : Companion_instance_2.a7z(fraction));
  }
  function SizeElement(minWidth, minHeight, maxWidth, maxHeight, enforceIncoming, inspectorInfo) {
    minWidth = minWidth === VOID ? Companion_getInstance_2().n36_1 : minWidth;
    minHeight = minHeight === VOID ? Companion_getInstance_2().n36_1 : minHeight;
    maxWidth = maxWidth === VOID ? Companion_getInstance_2().n36_1 : maxWidth;
    maxHeight = maxHeight === VOID ? Companion_getInstance_2().n36_1 : maxHeight;
    ModifierNodeElement.call(this);
    this.y80_1 = minWidth;
    this.z80_1 = minHeight;
    this.a81_1 = maxWidth;
    this.b81_1 = maxHeight;
    this.c81_1 = enforceIncoming;
    this.d81_1 = inspectorInfo;
  }
  protoOf(SizeElement).g25 = function () {
    return new SizeNode(this.y80_1, this.z80_1, this.a81_1, this.b81_1, this.c81_1);
  };
  protoOf(SizeElement).e81 = function (node) {
    node.s81_1 = this.y80_1;
    node.t81_1 = this.z80_1;
    node.u81_1 = this.a81_1;
    node.v81_1 = this.b81_1;
    node.w81_1 = this.c81_1;
  };
  protoOf(SizeElement).t4v = function (node) {
    return this.e81(node instanceof SizeNode ? node : THROW_CCE());
  };
  protoOf(SizeElement).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SizeElement))
      return false;
    if (!equals(this.y80_1, other.y80_1))
      return false;
    if (!equals(this.z80_1, other.z80_1))
      return false;
    if (!equals(this.a81_1, other.a81_1))
      return false;
    if (!equals(this.b81_1, other.b81_1))
      return false;
    if (!(this.c81_1 === other.c81_1))
      return false;
    return true;
  };
  protoOf(SizeElement).hashCode = function () {
    var result = Dp__hashCode_impl_sxkrra(this.y80_1);
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.z80_1) | 0;
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.a81_1) | 0;
    result = imul(31, result) + Dp__hashCode_impl_sxkrra(this.b81_1) | 0;
    result = imul(31, result) + getBooleanHashCode(this.c81_1) | 0;
    return result;
  };
  function _get_targetConstraints__wn7g24(_this__u8e3s4, $this) {
    var tmp;
    if (!equals($this.u81_1, Companion_getInstance_2().n36_1)) {
      tmp = coerceAtLeast_0(_this__u8e3s4.z35($this.u81_1), 0);
    } else {
      Companion_getInstance_0();
      tmp = 2147483647;
    }
    var maxWidth = tmp;
    var tmp_0;
    if (!equals($this.v81_1, Companion_getInstance_2().n36_1)) {
      tmp_0 = coerceAtLeast_0(_this__u8e3s4.z35($this.v81_1), 0);
    } else {
      Companion_getInstance_0();
      tmp_0 = 2147483647;
    }
    var maxHeight = tmp_0;
    var tmp_1;
    if (!equals($this.s81_1, Companion_getInstance_2().n36_1)) {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.layout.SizeNode.<get-targetConstraints>.<anonymous>' call
      var it = coerceAtLeast_0(coerceAtMost_0(_this__u8e3s4.z35($this.s81_1), maxWidth), 0);
      var tmp_2;
      Companion_getInstance_0();
      if (!(it === 2147483647)) {
        tmp_2 = it;
      } else {
        tmp_2 = 0;
      }
      tmp_1 = tmp_2;
    } else {
      tmp_1 = 0;
    }
    var minWidth = tmp_1;
    var tmp_3;
    if (!equals($this.t81_1, Companion_getInstance_2().n36_1)) {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.compose.foundation.layout.SizeNode.<get-targetConstraints>.<anonymous>' call
      var it_0 = coerceAtLeast_0(coerceAtMost_0(_this__u8e3s4.z35($this.t81_1), maxHeight), 0);
      var tmp_4;
      Companion_getInstance_0();
      if (!(it_0 === 2147483647)) {
        tmp_4 = it_0;
      } else {
        tmp_4 = 0;
      }
      tmp_3 = tmp_4;
    } else {
      tmp_3 = 0;
    }
    var minHeight = tmp_3;
    return Constraints(minWidth, maxWidth, minHeight, maxHeight);
  }
  function SizeNode$measure$lambda($placeable) {
    return function ($this$layout) {
      $this$layout.b5s($placeable, 0, 0);
      return Unit_instance;
    };
  }
  function SizeNode(minWidth, minHeight, maxWidth, maxHeight, enforceIncoming) {
    minWidth = minWidth === VOID ? Companion_getInstance_2().n36_1 : minWidth;
    minHeight = minHeight === VOID ? Companion_getInstance_2().n36_1 : minHeight;
    maxWidth = maxWidth === VOID ? Companion_getInstance_2().n36_1 : maxWidth;
    maxHeight = maxHeight === VOID ? Companion_getInstance_2().n36_1 : maxHeight;
    Node.call(this);
    this.s81_1 = minWidth;
    this.t81_1 = minHeight;
    this.u81_1 = maxWidth;
    this.v81_1 = maxHeight;
    this.w81_1 = enforceIncoming;
  }
  protoOf(SizeNode).l57 = function (_this__u8e3s4, measurable, constraints) {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.layout.SizeNode.measure.<anonymous>' call
    var targetConstraints = _get_targetConstraints__wn7g24(_this__u8e3s4, this);
    var tmp;
    if (this.w81_1) {
      tmp = constrain(constraints, targetConstraints);
    } else {
      var tmp_0;
      if (!equals(this.s81_1, Companion_getInstance_2().n36_1)) {
        tmp_0 = _Constraints___get_minWidth__impl__hi9lfi(targetConstraints);
      } else {
        tmp_0 = coerceAtMost_0(_Constraints___get_minWidth__impl__hi9lfi(constraints), _Constraints___get_maxWidth__impl__uuyqc(targetConstraints));
      }
      var resolvedMinWidth = tmp_0;
      var tmp_1;
      if (!equals(this.u81_1, Companion_getInstance_2().n36_1)) {
        tmp_1 = _Constraints___get_maxWidth__impl__uuyqc(targetConstraints);
      } else {
        tmp_1 = coerceAtLeast_0(_Constraints___get_maxWidth__impl__uuyqc(constraints), _Constraints___get_minWidth__impl__hi9lfi(targetConstraints));
      }
      var resolvedMaxWidth = tmp_1;
      var tmp_2;
      if (!equals(this.t81_1, Companion_getInstance_2().n36_1)) {
        tmp_2 = _Constraints___get_minHeight__impl__ev4bgx(targetConstraints);
      } else {
        tmp_2 = coerceAtMost_0(_Constraints___get_minHeight__impl__ev4bgx(constraints), _Constraints___get_maxHeight__impl__dt3e8z(targetConstraints));
      }
      var resolvedMinHeight = tmp_2;
      var tmp_3;
      if (!equals(this.v81_1, Companion_getInstance_2().n36_1)) {
        tmp_3 = _Constraints___get_maxHeight__impl__dt3e8z(targetConstraints);
      } else {
        tmp_3 = coerceAtLeast_0(_Constraints___get_maxHeight__impl__dt3e8z(constraints), _Constraints___get_minHeight__impl__ev4bgx(targetConstraints));
      }
      var resolvedMaxHeight = tmp_3;
      tmp = Constraints(resolvedMinWidth, resolvedMaxWidth, resolvedMinHeight, resolvedMaxHeight);
    }
    var wrappedConstraints = tmp;
    var placeable = measurable.m57(wrappedConstraints);
    var tmp_4 = placeable.n57_1;
    var tmp_5 = placeable.o57_1;
    return _this__u8e3s4.s57(tmp_4, tmp_5, VOID, SizeNode$measure$lambda(placeable));
  };
  function size$lambda($size) {
    return function ($this$null) {
      $this$null.a7w_1 = 'size';
      $this$null.b7w_1 = new Dp($size);
      return Unit_instance;
    };
  }
  function height$lambda($height) {
    return function ($this$null) {
      $this$null.a7w_1 = 'height';
      $this$null.b7w_1 = new Dp($height);
      return Unit_instance;
    };
  }
  function Direction_Vertical_getInstance() {
    Direction_initEntries();
    return Direction_Vertical_instance;
  }
  function Direction_Horizontal_getInstance() {
    Direction_initEntries();
    return Direction_Horizontal_instance;
  }
  function Direction_Both_getInstance() {
    Direction_initEntries();
    return Direction_Both_instance;
  }
  var properties_initialized_Size_kt_x7rk2r;
  function _init_properties_Size_kt__jcru8v() {
    if (!properties_initialized_Size_kt_x7rk2r) {
      properties_initialized_Size_kt_x7rk2r = true;
      FillWholeMaxWidth = Companion_instance_2.a7z(1.0);
      FillWholeMaxHeight = Companion_instance_2.b7z(1.0);
      FillWholeMaxSize = Companion_instance_2.c7z(1.0);
      WrapContentWidthCenter = Companion_instance_3.x7z(Companion_getInstance().h4t_1, false);
      WrapContentWidthStart = Companion_instance_3.x7z(Companion_getInstance().g4t_1, false);
      WrapContentHeightCenter = Companion_instance_3.y7z(Companion_getInstance().e4t_1, false);
      WrapContentHeightTop = Companion_instance_3.y7z(Companion_getInstance().d4t_1, false);
      WrapContentSizeCenter = Companion_instance_3.z7z(Companion_getInstance().y4s_1, false);
      WrapContentSizeTopStart = Companion_instance_3.z7z(Companion_getInstance().u4s_1, false);
    }
  }
  function Spacer(modifier, $composer, $changed) {
    var $composer_0 = $composer;
    $composer_0.j1l(-72882467);
    sourceInformation($composer_0, 'C(Spacer)39@1433L64:Spacer.kt#2w3rfo');
    if (isTraceInProgress()) {
      traceEventStart(-72882467, $changed, -1, 'androidx.compose.foundation.layout.Spacer (Spacer.kt:38)');
    }
    // Inline function 'androidx.compose.ui.layout.Layout' call
    var modifier_0 = modifier;
    var $composer_1 = $composer_0;
    $composer_1.j1l(544976794);
    sourceInformation($composer_1, 'CC(Layout)P(1)124@4810L23,127@4961L385:Layout.kt#80mrfh');
    if (!((0 & 1) === 0))
      modifier_0 = Companion_instance_0;
    var compositeKeyHash = get_currentCompositeKeyHash($composer_1, 0);
    var materialized = materialize($composer_1, modifier_0);
    var localMap = $composer_1.v1y();
    // Inline function 'androidx.compose.runtime.ReusableComposeNode' call
    var factory = Companion_getInstance_4().p5p_1;
    var $composer_2 = $composer_1;
    $composer_2.j1l(1405779621);
    sourceInformation($composer_2, 'CC(ReusableComposeNode):Composables.kt#9igjgp');
    var tmp = $composer_2.g1x();
    if (!isInterface(tmp, Applier)) {
      invalidApplier();
    }
    $composer_2.t1x();
    if ($composer_2.p1x()) {
      var tmp_0 = $composer_2;
      tmp_0.u1x(Spacer$lambda(factory));
    } else {
      $composer_2.x1x();
    }
    // Inline function 'androidx.compose.ui.layout.Layout.<anonymous>' call
    var $this$ReusableComposeNode = _Updater___init__impl__rbfxm8($composer_2);
    Updater__set_impl_v7kwss($this$ReusableComposeNode, SpacerMeasurePolicy_instance, Companion_getInstance_4().u5p_1);
    Updater__set_impl_v7kwss($this$ReusableComposeNode, localMap, Companion_getInstance_4().t5p_1);
    Updater__set_impl_v7kwss($this$ReusableComposeNode, materialized, Companion_getInstance_4().r5p_1);
    // Inline function 'androidx.compose.runtime.Updater.set' call
    var block = Companion_getInstance_4().x5p_1;
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    var $this$with = _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode);
    var tmp_1;
    if ($this$with.p1x() ? true : !equals($this$with.x1y(), compositeKeyHash)) {
      $this$with.d1z(compositeKeyHash);
      _Updater___get_composer__impl__9ty7av($this$ReusableComposeNode).e1y(compositeKeyHash, block);
      tmp_1 = Unit_instance;
    }
    $composer_2.z1x();
    $composer_2.l1l();
    $composer_1.l1l();
    if (isTraceInProgress()) {
      traceEventEnd();
    }
    $composer_0.l1l();
  }
  function SpacerMeasurePolicy$measure$lambda($this$layout) {
    return Unit_instance;
  }
  function SpacerMeasurePolicy() {
  }
  protoOf(SpacerMeasurePolicy).w5s = function (_this__u8e3s4, measurables, constraints) {
    // Inline function 'kotlin.with' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.compose.foundation.layout.SpacerMeasurePolicy.measure.<anonymous>' call
    var width = _Constraints___get_hasFixedWidth__impl__4p17wc(constraints) ? _Constraints___get_maxWidth__impl__uuyqc(constraints) : 0;
    var height = _Constraints___get_hasFixedHeight__impl__y56fxx(constraints) ? _Constraints___get_maxHeight__impl__dt3e8z(constraints) : 0;
    return _this__u8e3s4.s57(width, height, VOID, SpacerMeasurePolicy$measure$lambda);
  };
  var SpacerMeasurePolicy_instance;
  function SpacerMeasurePolicy_getInstance() {
    return SpacerMeasurePolicy_instance;
  }
  function Spacer$lambda($factory) {
    return function () {
      return $factory();
    };
  }
  //region block: post-declaration
  protoOf(Arrangement$Start$1).t7s = get_spacing;
  protoOf(Arrangement$End$1).t7s = get_spacing;
  protoOf(Arrangement$Top$1).t7s = get_spacing_0;
  protoOf(Arrangement$Bottom$1).t7s = get_spacing_0;
  protoOf(ColumnScopeInstance).m7u = weight$default;
  protoOf(RowScopeInstance).f7w = weight$default_0;
  //endregion
  //region block: init
  BoxScopeInstance_instance = new BoxScopeInstance();
  ColumnScopeInstance_instance = new ColumnScopeInstance();
  RowScopeInstance_instance = new RowScopeInstance();
  Companion_instance_2 = new Companion_0();
  Companion_instance_3 = new Companion_1();
  SpacerMeasurePolicy_instance = new SpacerMeasurePolicy();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = PaddingValues;
  _.$_$.b = Spacer;
  _.$_$.c = calculateEndPadding;
  _.$_$.d = calculateStartPadding;
  _.$_$.e = columnMeasurePolicy;
  _.$_$.f = fillMaxSize;
  _.$_$.g = fillMaxWidth;
  _.$_$.h = height;
  _.$_$.i = padding_0;
  _.$_$.j = padding;
  _.$_$.k = rememberBoxMeasurePolicy;
  _.$_$.l = rowMeasurePolicy;
  _.$_$.m = size;
  _.$_$.n = Arrangement_getInstance;
  _.$_$.o = BoxScopeInstance_instance;
  _.$_$.p = ColumnScopeInstance_instance;
  _.$_$.q = RowScopeInstance_instance;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-compose-foundation-foundation-layout.js.map
