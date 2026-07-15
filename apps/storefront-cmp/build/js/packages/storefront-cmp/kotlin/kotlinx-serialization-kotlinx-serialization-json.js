(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlinx-serialization-kotlinx-serialization-core.js', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlinx-serialization-kotlinx-serialization-core.js'), require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlinx-serialization-kotlinx-serialization-core' was not found. Please, check whether 'kotlinx-serialization-kotlinx-serialization-core' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-json'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-json'.");
    }
    root['kotlinx-serialization-kotlinx-serialization-json'] = factory(typeof this['kotlinx-serialization-kotlinx-serialization-json'] === 'undefined' ? {} : this['kotlinx-serialization-kotlinx-serialization-json'], this['kotlinx-serialization-kotlinx-serialization-core'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var EmptySerializersModule = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r1;
  var protoOf = kotlin_kotlin.$_$.jb;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var classMeta = kotlin_kotlin.$_$.ba;
  var VOID = kotlin_kotlin.$_$.g;
  var toString = kotlin_kotlin.$_$.ob;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var charSequenceLength = kotlin_kotlin.$_$.z9;
  var charSequenceGet = kotlin_kotlin.$_$.y9;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.m2;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var equals = kotlin_kotlin.$_$.ea;
  var Enum = kotlin_kotlin.$_$.re;
  var Decoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g1;
  var CompositeDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f1;
  var interfaceMeta = kotlin_kotlin.$_$.oa;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var THROW_CCE = kotlin_kotlin.$_$.df;
  var hashCode = kotlin_kotlin.$_$.ma;
  var joinToString = kotlin_kotlin.$_$.i7;
  var Map = kotlin_kotlin.$_$.g5;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.j;
  var lazy = kotlin_kotlin.$_$.cg;
  var SerializerFactory = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.o1;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var getBooleanHashCode = kotlin_kotlin.$_$.ha;
  var getStringHashCode = kotlin_kotlin.$_$.la;
  var List = kotlin_kotlin.$_$.e5;
  var NumberFormatException_init_$Create$ = kotlin_kotlin.$_$.e2;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var numberRangeToNumber = kotlin_kotlin.$_$.db;
  var ClosedRange = kotlin_kotlin.$_$.zb;
  var isInterface = kotlin_kotlin.$_$.xa;
  var contains = kotlin_kotlin.$_$.jc;
  var toDouble = kotlin_kotlin.$_$.xd;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.f4;
  var serializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p;
  var InlinePrimitiveDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.l1;
  var SEALED_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c;
  var buildSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.c1;
  var KSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v1;
  var MapSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.n;
  var SerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a1;
  var ListSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m;
  var STRING_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d;
  var ENUM_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.f;
  var PrimitiveSerialDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var lazy_0 = kotlin_kotlin.$_$.dg;
  var get_isNullable = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.z;
  var get_isInline = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y;
  var get_annotations = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x;
  var KProperty1 = kotlin_kotlin.$_$.sc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ka;
  var ElementMarker = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i1;
  var captureStack = kotlin_kotlin.$_$.v9;
  var SerializationException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.x1;
  var SerializationException_init_$Init$ = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.a;
  var charSequenceSubSequence = kotlin_kotlin.$_$.aa;
  var coerceAtLeast = kotlin_kotlin.$_$.bc;
  var coerceAtMost = kotlin_kotlin.$_$.ec;
  var Companion_instance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.j;
  var CLASS_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.g;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.n;
  var singleOrNull = kotlin_kotlin.$_$.k8;
  var emptyMap = kotlin_kotlin.$_$.n6;
  var getValue = kotlin_kotlin.$_$.b7;
  var copyOf = kotlin_kotlin.$_$.j6;
  var copyOf_0 = kotlin_kotlin.$_$.k6;
  var fillArrayVal = kotlin_kotlin.$_$.fa;
  var LIST_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h;
  var DeepRecursiveFunction = kotlin_kotlin.$_$.pe;
  var invoke = kotlin_kotlin.$_$.wf;
  var CoroutineImpl = kotlin_kotlin.$_$.o9;
  var DeepRecursiveScope = kotlin_kotlin.$_$.qe;
  var Unit = kotlin_kotlin.$_$.of;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.a9;
  var AbstractPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.h1;
  var getKClass = kotlin_kotlin.$_$.e;
  var findPolymorphicSerializer = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.y1;
  var ensureNotNull = kotlin_kotlin.$_$.vf;
  var DeserializationStrategy = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u1;
  var CONTEXTUAL_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e;
  var PolymorphicKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.u;
  var PrimitiveKind = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.v;
  var MAP_getInstance = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.i;
  var ENUM = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.b1;
  var contextual = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s1;
  var SerializersModuleCollector = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t1;
  var AbstractDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.e1;
  var substringBefore = kotlin_kotlin.$_$.vd;
  var removeSuffix = kotlin_kotlin.$_$.pd;
  var substringAfter = kotlin_kotlin.$_$.ud;
  var contains_0 = kotlin_kotlin.$_$.ed;
  var plus = kotlin_kotlin.$_$.fg;
  var MissingFieldException = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.w1;
  var toLong = kotlin_kotlin.$_$.mb;
  var IllegalArgumentException = kotlin_kotlin.$_$.ue;
  var isFinite = kotlin_kotlin.$_$.yf;
  var isFinite_0 = kotlin_kotlin.$_$.xf;
  var toUInt = kotlin_kotlin.$_$.de;
  var _UInt___get_data__impl__f0vqqw = kotlin_kotlin.$_$.c3;
  var toULong = kotlin_kotlin.$_$.ee;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.j3;
  var toUByte = kotlin_kotlin.$_$.ce;
  var _UByte___get_data__impl__jof9qr = kotlin_kotlin.$_$.v2;
  var toUShort = kotlin_kotlin.$_$.fe;
  var _UShort___get_data__impl__g0245 = kotlin_kotlin.$_$.r3;
  var Companion_getInstance = kotlin_kotlin.$_$.n4;
  var serializer_0 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.r;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.o4;
  var serializer_1 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.t;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.m4;
  var serializer_2 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.s;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.p4;
  var serializer_3 = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.q;
  var setOf = kotlin_kotlin.$_$.j8;
  var Char__toInt_impl_vasixd = kotlin_kotlin.$_$.o2;
  var numberToChar = kotlin_kotlin.$_$.eb;
  var equals_0 = kotlin_kotlin.$_$.gd;
  var toString_0 = kotlin_kotlin.$_$.p2;
  var NamedValueDecoder = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.m1;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.a4;
  var toByte = kotlin_kotlin.$_$.lb;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.e4;
  var toShort = kotlin_kotlin.$_$.nb;
  var single = kotlin_kotlin.$_$.rd;
  var Char = kotlin_kotlin.$_$.me;
  var jsonCachedSerialNames = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.p1;
  var emptySet = kotlin_kotlin.$_$.o6;
  var plus_0 = kotlin_kotlin.$_$.b8;
  var toInt = kotlin_kotlin.$_$.zd;
  var toList = kotlin_kotlin.$_$.s8;
  var getContextualDescriptor = kotlin_org_jetbrains_kotlinx_kotlinx_serialization_core.$_$.d1;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.eg;
  var last = kotlin_kotlin.$_$.q7;
  var removeLast = kotlin_kotlin.$_$.h8;
  var lastIndexOf = kotlin_kotlin.$_$.nd;
  var Long = kotlin_kotlin.$_$.we;
  var Char__minus_impl_a2frrh = kotlin_kotlin.$_$.n2;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.k4;
  var numberToLong = kotlin_kotlin.$_$.gb;
  var charArray = kotlin_kotlin.$_$.x9;
  var indexOf = kotlin_kotlin.$_$.hd;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.p;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Json, 'Json', classMeta);
  setMetadataFor(Default, 'Default', objectMeta, Json);
  setMetadataFor(JsonBuilder, 'JsonBuilder', classMeta);
  setMetadataFor(JsonImpl, 'JsonImpl', classMeta, Json);
  setMetadataFor(JsonClassDiscriminator, 'JsonClassDiscriminator', classMeta);
  setMetadataFor(JsonNames, 'JsonNames', classMeta);
  setMetadataFor(JsonConfiguration, 'JsonConfiguration', classMeta);
  setMetadataFor(ClassDiscriminatorMode, 'ClassDiscriminatorMode', classMeta, Enum);
  setMetadataFor(JsonDecoder, 'JsonDecoder', interfaceMeta, VOID, [Decoder, CompositeDecoder]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(JsonElement, 'JsonElement', classMeta, VOID, VOID, VOID, VOID, {0: JsonElementSerializer_getInstance});
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(JsonObject, 'JsonObject', classMeta, JsonElement, [JsonElement, Map], VOID, VOID, {0: JsonObjectSerializer_getInstance});
  setMetadataFor(JsonPrimitive, 'JsonPrimitive', classMeta, JsonElement, VOID, VOID, VOID, {0: JsonPrimitiveSerializer_getInstance});
  setMetadataFor(JsonNull, 'JsonNull', objectMeta, JsonPrimitive, [JsonPrimitive, SerializerFactory], VOID, VOID, {0: JsonNull_getInstance});
  setMetadataFor(Companion_1, 'Companion', objectMeta);
  setMetadataFor(JsonLiteral, 'JsonLiteral', classMeta, JsonPrimitive);
  setMetadataFor(Companion_2, 'Companion', objectMeta);
  setMetadataFor(JsonArray, 'JsonArray', classMeta, JsonElement, [JsonElement, List], VOID, VOID, {0: JsonArraySerializer_getInstance});
  setMetadataFor(JsonElementSerializer, 'JsonElementSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonObjectDescriptor, 'JsonObjectDescriptor', objectMeta, VOID, [SerialDescriptor]);
  setMetadataFor(JsonObjectSerializer, 'JsonObjectSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonArrayDescriptor, 'JsonArrayDescriptor', objectMeta, VOID, [SerialDescriptor]);
  setMetadataFor(JsonArraySerializer, 'JsonArraySerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonPrimitiveSerializer, 'JsonPrimitiveSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonNullSerializer, 'JsonNullSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(JsonLiteralSerializer, 'JsonLiteralSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(defer$1, VOID, classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(JsonElementMarker, 'JsonElementMarker', classMeta);
  setMetadataFor(JsonException, 'JsonException', classMeta, SerializationException);
  setMetadataFor(JsonEncodingException, 'JsonEncodingException', classMeta, JsonException);
  setMetadataFor(JsonDecodingException, 'JsonDecodingException', classMeta, JsonException);
  setMetadataFor(Tombstone, 'Tombstone', objectMeta);
  setMetadataFor(JsonPath, 'JsonPath', classMeta, VOID, VOID, JsonPath);
  setMetadataFor(JsonTreeReader$readDeepRecursive$slambda, 'JsonTreeReader$readDeepRecursive$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [2]);
  setMetadataFor($readObjectCOROUTINE$0, '$readObjectCOROUTINE$0', classMeta, CoroutineImpl);
  setMetadataFor(JsonTreeReader, 'JsonTreeReader', classMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(PolymorphismValidator, 'PolymorphismValidator', classMeta, VOID, [SerializersModuleCollector]);
  setMetadataFor(Key, 'Key', classMeta, VOID, VOID, Key);
  setMetadataFor(DescriptorSchemaCache, 'DescriptorSchemaCache', classMeta, VOID, VOID, DescriptorSchemaCache);
  setMetadataFor(DiscriminatorHolder, 'DiscriminatorHolder', classMeta);
  setMetadataFor(StreamingJsonDecoder, 'StreamingJsonDecoder', classMeta, AbstractDecoder, [JsonDecoder, AbstractDecoder]);
  setMetadataFor(JsonDecoderForUnsignedTypes, 'JsonDecoderForUnsignedTypes', classMeta, AbstractDecoder);
  setMetadataFor(AbstractJsonTreeDecoder, 'AbstractJsonTreeDecoder', classMeta, NamedValueDecoder, [NamedValueDecoder, JsonDecoder]);
  setMetadataFor(JsonTreeDecoder, 'JsonTreeDecoder', classMeta, AbstractJsonTreeDecoder);
  setMetadataFor(JsonTreeListDecoder, 'JsonTreeListDecoder', classMeta, AbstractJsonTreeDecoder);
  setMetadataFor(JsonPrimitiveDecoder, 'JsonPrimitiveDecoder', classMeta, AbstractJsonTreeDecoder);
  setMetadataFor(JsonTreeMapDecoder, 'JsonTreeMapDecoder', classMeta, JsonTreeDecoder);
  setMetadataFor(WriteMode, 'WriteMode', classMeta, Enum);
  setMetadataFor(AbstractJsonLexer, 'AbstractJsonLexer', classMeta);
  setMetadataFor(CharMappings, 'CharMappings', objectMeta);
  setMetadataFor(StringJsonLexer, 'StringJsonLexer', classMeta, AbstractJsonLexer);
  //endregion
  function Default() {
    Default_instance = this;
    Json.call(this, new JsonConfiguration(), EmptySerializersModule());
  }
  var Default_instance;
  function Default_getInstance() {
    if (Default_instance == null)
      new Default();
    return Default_instance;
  }
  function Json(configuration, serializersModule) {
    Default_getInstance();
    this.lc0_1 = configuration;
    this.mc0_1 = serializersModule;
    this.nc0_1 = new DescriptorSchemaCache();
  }
  protoOf(Json).pb8 = function () {
    return this.mc0_1;
  };
  protoOf(Json).oc0 = function (deserializer, string) {
    var lexer = new StringJsonLexer(string);
    var input = new StreamingJsonDecoder(this, WriteMode_OBJ_getInstance(), lexer, deserializer.ib5(), null);
    var result = input.zb7(deserializer);
    lexer.bc1();
    return result;
  };
  function Json_0(from, builderAction) {
    from = from === VOID ? Default_getInstance() : from;
    var builder = new JsonBuilder(from);
    builderAction(builder);
    var conf = builder.n1r();
    return new JsonImpl(conf, builder.sc1_1);
  }
  function JsonBuilder(json) {
    this.cc1_1 = json.lc0_1.tc1_1;
    this.dc1_1 = json.lc0_1.yc1_1;
    this.ec1_1 = json.lc0_1.uc1_1;
    this.fc1_1 = json.lc0_1.vc1_1;
    this.gc1_1 = json.lc0_1.wc1_1;
    this.hc1_1 = json.lc0_1.xc1_1;
    this.ic1_1 = json.lc0_1.zc1_1;
    this.jc1_1 = json.lc0_1.ac2_1;
    this.kc1_1 = json.lc0_1.bc2_1;
    this.lc1_1 = json.lc0_1.cc2_1;
    this.mc1_1 = json.lc0_1.ic2_1;
    this.nc1_1 = json.lc0_1.dc2_1;
    this.oc1_1 = json.lc0_1.ec2_1;
    this.pc1_1 = json.lc0_1.fc2_1;
    this.qc1_1 = json.lc0_1.gc2_1;
    this.rc1_1 = json.lc0_1.hc2_1;
    this.sc1_1 = json.pb8();
  }
  protoOf(JsonBuilder).n1r = function () {
    if (this.kc1_1) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(this.lc1_1 === 'type')) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message = 'Class discriminator should not be specified when array polymorphism is specified';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!this.mc1_1.equals(ClassDiscriminatorMode_POLYMORPHIC_getInstance())) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_0 = 'useArrayPolymorphism option can only be used if classDiscriminatorMode in a default POLYMORPHIC state.';
        throw IllegalArgumentException_init_$Create$(toString(message_0));
      }
    }
    if (!this.hc1_1) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(this.ic1_1 === '    ')) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_1 = 'Indent should not be specified when default printing mode is used';
        throw IllegalArgumentException_init_$Create$(toString(message_1));
      }
    } else if (!(this.ic1_1 === '    ')) {
      var tmp$ret$4;
      $l$block: {
        // Inline function 'kotlin.text.all' call
        var indexedObject = this.ic1_1;
        var inductionVariable = 0;
        while (inductionVariable < charSequenceLength(indexedObject)) {
          var element = charSequenceGet(indexedObject, inductionVariable);
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
          if (!(((element === _Char___init__impl__6a9atx(32) ? true : element === _Char___init__impl__6a9atx(9)) ? true : element === _Char___init__impl__6a9atx(13)) ? true : element === _Char___init__impl__6a9atx(10))) {
            tmp$ret$4 = false;
            break $l$block;
          }
        }
        tmp$ret$4 = true;
      }
      var allWhitespaces = tmp$ret$4;
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!allWhitespaces) {
        // Inline function 'kotlinx.serialization.json.JsonBuilder.build.<anonymous>' call
        var message_2 = 'Only whitespace, tab, newline and carriage return are allowed as pretty print symbols. Had ' + this.ic1_1;
        throw IllegalArgumentException_init_$Create$(toString(message_2));
      }
    }
    return new JsonConfiguration(this.cc1_1, this.ec1_1, this.fc1_1, this.gc1_1, this.hc1_1, this.dc1_1, this.ic1_1, this.jc1_1, this.kc1_1, this.lc1_1, this.nc1_1, this.oc1_1, this.pc1_1, this.qc1_1, this.rc1_1, this.mc1_1);
  };
  function validateConfiguration($this) {
    if (equals($this.pb8(), EmptySerializersModule()))
      return Unit_instance;
    var collector = new PolymorphismValidator($this.lc0_1.bc2_1, $this.lc0_1.cc2_1);
    $this.pb8().rbj(collector);
  }
  function JsonImpl(configuration, module_0) {
    Json.call(this, configuration, module_0);
    validateConfiguration(this);
  }
  function JsonClassDiscriminator() {
  }
  function JsonNames() {
  }
  function JsonConfiguration(encodeDefaults, ignoreUnknownKeys, isLenient, allowStructuredMapKeys, prettyPrint, explicitNulls, prettyPrintIndent, coerceInputValues, useArrayPolymorphism, classDiscriminator, allowSpecialFloatingPointValues, useAlternativeNames, namingStrategy, decodeEnumsCaseInsensitive, allowTrailingComma, classDiscriminatorMode) {
    encodeDefaults = encodeDefaults === VOID ? false : encodeDefaults;
    ignoreUnknownKeys = ignoreUnknownKeys === VOID ? false : ignoreUnknownKeys;
    isLenient = isLenient === VOID ? false : isLenient;
    allowStructuredMapKeys = allowStructuredMapKeys === VOID ? false : allowStructuredMapKeys;
    prettyPrint = prettyPrint === VOID ? false : prettyPrint;
    explicitNulls = explicitNulls === VOID ? true : explicitNulls;
    prettyPrintIndent = prettyPrintIndent === VOID ? '    ' : prettyPrintIndent;
    coerceInputValues = coerceInputValues === VOID ? false : coerceInputValues;
    useArrayPolymorphism = useArrayPolymorphism === VOID ? false : useArrayPolymorphism;
    classDiscriminator = classDiscriminator === VOID ? 'type' : classDiscriminator;
    allowSpecialFloatingPointValues = allowSpecialFloatingPointValues === VOID ? false : allowSpecialFloatingPointValues;
    useAlternativeNames = useAlternativeNames === VOID ? true : useAlternativeNames;
    namingStrategy = namingStrategy === VOID ? null : namingStrategy;
    decodeEnumsCaseInsensitive = decodeEnumsCaseInsensitive === VOID ? false : decodeEnumsCaseInsensitive;
    allowTrailingComma = allowTrailingComma === VOID ? false : allowTrailingComma;
    classDiscriminatorMode = classDiscriminatorMode === VOID ? ClassDiscriminatorMode_POLYMORPHIC_getInstance() : classDiscriminatorMode;
    this.tc1_1 = encodeDefaults;
    this.uc1_1 = ignoreUnknownKeys;
    this.vc1_1 = isLenient;
    this.wc1_1 = allowStructuredMapKeys;
    this.xc1_1 = prettyPrint;
    this.yc1_1 = explicitNulls;
    this.zc1_1 = prettyPrintIndent;
    this.ac2_1 = coerceInputValues;
    this.bc2_1 = useArrayPolymorphism;
    this.cc2_1 = classDiscriminator;
    this.dc2_1 = allowSpecialFloatingPointValues;
    this.ec2_1 = useAlternativeNames;
    this.fc2_1 = namingStrategy;
    this.gc2_1 = decodeEnumsCaseInsensitive;
    this.hc2_1 = allowTrailingComma;
    this.ic2_1 = classDiscriminatorMode;
  }
  protoOf(JsonConfiguration).toString = function () {
    return 'JsonConfiguration(encodeDefaults=' + this.tc1_1 + ', ignoreUnknownKeys=' + this.uc1_1 + ', isLenient=' + this.vc1_1 + ', ' + ('allowStructuredMapKeys=' + this.wc1_1 + ', prettyPrint=' + this.xc1_1 + ', explicitNulls=' + this.yc1_1 + ', ') + ("prettyPrintIndent='" + this.zc1_1 + "', coerceInputValues=" + this.ac2_1 + ', useArrayPolymorphism=' + this.bc2_1 + ', ') + ("classDiscriminator='" + this.cc2_1 + "', allowSpecialFloatingPointValues=" + this.dc2_1 + ', ') + ('useAlternativeNames=' + this.ec2_1 + ', namingStrategy=' + this.fc2_1 + ', decodeEnumsCaseInsensitive=' + this.gc2_1 + ', ') + ('allowTrailingComma=' + this.hc2_1 + ', classDiscriminatorMode=' + this.ic2_1 + ')');
  };
  var ClassDiscriminatorMode_NONE_instance;
  var ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance;
  var ClassDiscriminatorMode_POLYMORPHIC_instance;
  var ClassDiscriminatorMode_entriesInitialized;
  function ClassDiscriminatorMode_initEntries() {
    if (ClassDiscriminatorMode_entriesInitialized)
      return Unit_instance;
    ClassDiscriminatorMode_entriesInitialized = true;
    ClassDiscriminatorMode_NONE_instance = new ClassDiscriminatorMode('NONE', 0);
    ClassDiscriminatorMode_ALL_JSON_OBJECTS_instance = new ClassDiscriminatorMode('ALL_JSON_OBJECTS', 1);
    ClassDiscriminatorMode_POLYMORPHIC_instance = new ClassDiscriminatorMode('POLYMORPHIC', 2);
  }
  function ClassDiscriminatorMode(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function ClassDiscriminatorMode_POLYMORPHIC_getInstance() {
    ClassDiscriminatorMode_initEntries();
    return ClassDiscriminatorMode_POLYMORPHIC_instance;
  }
  function JsonDecoder() {
  }
  var jsonUnquotedLiteralDescriptor;
  function Companion() {
  }
  var Companion_instance_0;
  function Companion_getInstance_4() {
    return Companion_instance_0;
  }
  function JsonElement() {
  }
  function Companion_0() {
  }
  var Companion_instance_1;
  function Companion_getInstance_5() {
    return Companion_instance_1;
  }
  function JsonObject$toString$lambda(_name_for_destructuring_parameter_0__wldtmu) {
    // Inline function 'kotlin.collections.component1' call
    var k = _name_for_destructuring_parameter_0__wldtmu.r2();
    // Inline function 'kotlin.collections.component2' call
    var v = _name_for_destructuring_parameter_0__wldtmu.s2();
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.json.JsonObject.toString.<anonymous>.<anonymous>' call
    printQuoted(this_0, k);
    this_0.z5(_Char___init__impl__6a9atx(58));
    this_0.x5(v);
    return this_0.toString();
  }
  function JsonObject(content) {
    JsonElement.call(this);
    this.lc2_1 = content;
  }
  protoOf(JsonObject).o2 = function () {
    return this.lc2_1.o2();
  };
  protoOf(JsonObject).m2 = function () {
    return this.lc2_1.m2();
  };
  protoOf(JsonObject).m = function () {
    return this.lc2_1.m();
  };
  protoOf(JsonObject).mc2 = function (key) {
    return this.lc2_1.w2(key);
  };
  protoOf(JsonObject).w2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return false;
    return this.mc2((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).nc2 = function (key) {
    return this.lc2_1.z2(key);
  };
  protoOf(JsonObject).z2 = function (key) {
    if (!(!(key == null) ? typeof key === 'string' : false))
      return null;
    return this.nc2((!(key == null) ? typeof key === 'string' : false) ? key : THROW_CCE());
  };
  protoOf(JsonObject).u = function () {
    return this.lc2_1.u();
  };
  protoOf(JsonObject).equals = function (other) {
    return equals(this.lc2_1, other);
  };
  protoOf(JsonObject).hashCode = function () {
    return hashCode(this.lc2_1);
  };
  protoOf(JsonObject).toString = function () {
    var tmp = this.lc2_1.o2();
    return joinToString(tmp, ',', '{', '}', VOID, VOID, JsonObject$toString$lambda);
  };
  function _get_$cachedSerializer__te6jhj($this) {
    return $this.pc2_1.s2();
  }
  function JsonNull$_anonymous__enib48() {
    return JsonNullSerializer_getInstance();
  }
  function JsonNull() {
    JsonNull_instance = this;
    JsonPrimitive.call(this);
    this.oc2_1 = 'null';
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.pc2_1 = lazy(tmp_0, JsonNull$_anonymous__enib48);
  }
  protoOf(JsonNull).yac = function () {
    return this.oc2_1;
  };
  protoOf(JsonNull).qc2 = function () {
    return _get_$cachedSerializer__te6jhj(this);
  };
  protoOf(JsonNull).ubd = function (typeParamsSerializers) {
    return this.qc2();
  };
  var JsonNull_instance;
  function JsonNull_getInstance() {
    if (JsonNull_instance == null)
      new JsonNull();
    return JsonNull_instance;
  }
  function Companion_1() {
  }
  var Companion_instance_2;
  function Companion_getInstance_6() {
    return Companion_instance_2;
  }
  function JsonPrimitive() {
    JsonElement.call(this);
  }
  protoOf(JsonPrimitive).toString = function () {
    return this.yac();
  };
  function JsonPrimitive_0(value) {
    _init_properties_JsonElement_kt__7cbdc2();
    if (value == null)
      return JsonNull_getInstance();
    return new JsonLiteral(value, true);
  }
  function JsonLiteral(body, isString, coerceToInlineType) {
    coerceToInlineType = coerceToInlineType === VOID ? null : coerceToInlineType;
    JsonPrimitive.call(this);
    this.rc2_1 = isString;
    this.sc2_1 = coerceToInlineType;
    this.tc2_1 = toString(body);
    if (!(this.sc2_1 == null)) {
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!this.sc2_1.kb6()) {
        // Inline function 'kotlin.require.<anonymous>' call
        var message = 'Failed requirement.';
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
    }
  }
  protoOf(JsonLiteral).yac = function () {
    return this.tc2_1;
  };
  protoOf(JsonLiteral).toString = function () {
    var tmp;
    if (this.rc2_1) {
      // Inline function 'kotlin.text.buildString' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.JsonLiteral.toString.<anonymous>' call
      printQuoted(this_0, this.tc2_1);
      tmp = this_0.toString();
    } else {
      tmp = this.tc2_1;
    }
    return tmp;
  };
  protoOf(JsonLiteral).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof JsonLiteral))
      THROW_CCE();
    if (!(this.rc2_1 === other.rc2_1))
      return false;
    if (!(this.tc2_1 === other.tc2_1))
      return false;
    return true;
  };
  protoOf(JsonLiteral).hashCode = function () {
    var result = getBooleanHashCode(this.rc2_1);
    result = imul(31, result) + getStringHashCode(this.tc2_1) | 0;
    return result;
  };
  function Companion_2() {
  }
  var Companion_instance_3;
  function Companion_getInstance_7() {
    return Companion_instance_3;
  }
  function JsonArray(content) {
    JsonElement.call(this);
    this.uc2_1 = content;
  }
  protoOf(JsonArray).m = function () {
    return this.uc2_1.m();
  };
  protoOf(JsonArray).vc2 = function (element) {
    return this.uc2_1.s(element);
  };
  protoOf(JsonArray).s = function (element) {
    if (!(element instanceof JsonElement))
      return false;
    return this.vc2(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).wc2 = function (elements) {
    return this.uc2_1.t(elements);
  };
  protoOf(JsonArray).t = function (elements) {
    return this.wc2(elements);
  };
  protoOf(JsonArray).n = function (index) {
    return this.uc2_1.n(index);
  };
  protoOf(JsonArray).xc2 = function (element) {
    return this.uc2_1.p(element);
  };
  protoOf(JsonArray).p = function (element) {
    if (!(element instanceof JsonElement))
      return -1;
    return this.xc2(element instanceof JsonElement ? element : THROW_CCE());
  };
  protoOf(JsonArray).u = function () {
    return this.uc2_1.u();
  };
  protoOf(JsonArray).o = function () {
    return this.uc2_1.o();
  };
  protoOf(JsonArray).q = function (index) {
    return this.uc2_1.q(index);
  };
  protoOf(JsonArray).r = function (fromIndex, toIndex) {
    return this.uc2_1.r(fromIndex, toIndex);
  };
  protoOf(JsonArray).equals = function (other) {
    return equals(this.uc2_1, other);
  };
  protoOf(JsonArray).hashCode = function () {
    return hashCode(this.uc2_1);
  };
  protoOf(JsonArray).toString = function () {
    return joinToString(this.uc2_1, ',', '[', ']');
  };
  function get_booleanOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toBooleanStrictOrNull(_this__u8e3s4.yac());
  }
  function get_int(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      // Inline function 'kotlinx.serialization.json.<get-int>.<anonymous>' call
      tmp = (new StringJsonLexer(_this__u8e3s4.yac())).yc2();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        throw NumberFormatException_init_$Create$(e.message);
      } else {
        throw $p;
      }
    }
    var result = tmp;
    // Inline function 'kotlin.ranges.contains' call
    var this_0 = numberRangeToNumber(IntCompanionObject_instance.MIN_VALUE, IntCompanionObject_instance.MAX_VALUE);
    if (!contains(isInterface(this_0, ClosedRange) ? this_0 : THROW_CCE(), result))
      throw NumberFormatException_init_$Create$(_this__u8e3s4.yac() + ' is not an Int');
    return result.ea();
  }
  function get_long(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlinx.serialization.json.mapExceptions' call
    var tmp;
    try {
      // Inline function 'kotlinx.serialization.json.<get-long>.<anonymous>' call
      tmp = (new StringJsonLexer(_this__u8e3s4.yac())).yc2();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof JsonDecodingException) {
        var e = $p;
        throw NumberFormatException_init_$Create$(e.message);
      } else {
        throw $p;
      }
    }
    return tmp;
  }
  function get_float(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    // Inline function 'kotlin.text.toFloat' call
    var this_0 = _this__u8e3s4.yac();
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return toDouble(this_0);
  }
  function get_double(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    return toDouble(_this__u8e3s4.yac());
  }
  function get_contentOrNull(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp;
    if (_this__u8e3s4 instanceof JsonNull) {
      tmp = null;
    } else {
      tmp = _this__u8e3s4.yac();
    }
    return tmp;
  }
  function get_jsonPrimitive(_this__u8e3s4) {
    _init_properties_JsonElement_kt__7cbdc2();
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonPrimitive ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      error(_this__u8e3s4, 'JsonPrimitive');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function error(_this__u8e3s4, element) {
    _init_properties_JsonElement_kt__7cbdc2();
    throw IllegalArgumentException_init_$Create$('Element ' + getKClassFromExpression(_this__u8e3s4) + ' is not a ' + element);
  }
  var properties_initialized_JsonElement_kt_abxy8s;
  function _init_properties_JsonElement_kt__7cbdc2() {
    if (!properties_initialized_JsonElement_kt_abxy8s) {
      properties_initialized_JsonElement_kt_abxy8s = true;
      jsonUnquotedLiteralDescriptor = InlinePrimitiveDescriptor('kotlinx.serialization.json.JsonUnquotedLiteral', serializer(StringCompanionObject_instance));
    }
  }
  function JsonElementSerializer$descriptor$lambda($this$buildSerialDescriptor) {
    $this$buildSerialDescriptor.sb5('JsonPrimitive', defer(JsonElementSerializer$descriptor$lambda$lambda));
    $this$buildSerialDescriptor.sb5('JsonNull', defer(JsonElementSerializer$descriptor$lambda$lambda_0));
    $this$buildSerialDescriptor.sb5('JsonLiteral', defer(JsonElementSerializer$descriptor$lambda$lambda_1));
    $this$buildSerialDescriptor.sb5('JsonObject', defer(JsonElementSerializer$descriptor$lambda$lambda_2));
    $this$buildSerialDescriptor.sb5('JsonArray', defer(JsonElementSerializer$descriptor$lambda$lambda_3));
    return Unit_instance;
  }
  function JsonElementSerializer$descriptor$lambda$lambda() {
    return JsonPrimitiveSerializer_getInstance().zc2_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_0() {
    return JsonNullSerializer_getInstance().ac3_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_1() {
    return JsonLiteralSerializer_getInstance().bc3_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_2() {
    return JsonObjectSerializer_getInstance().cc3_1;
  }
  function JsonElementSerializer$descriptor$lambda$lambda_3() {
    return JsonArraySerializer_getInstance().dc3_1;
  }
  function JsonElementSerializer() {
    JsonElementSerializer_instance = this;
    var tmp = this;
    var tmp_0 = SEALED_getInstance();
    tmp.ec3_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonElement', tmp_0, [], JsonElementSerializer$descriptor$lambda);
  }
  protoOf(JsonElementSerializer).ib5 = function () {
    return this.ec3_1;
  };
  protoOf(JsonElementSerializer).jb5 = function (decoder) {
    var input = asJsonDecoder(decoder);
    return input.kc2();
  };
  var JsonElementSerializer_instance;
  function JsonElementSerializer_getInstance() {
    if (JsonElementSerializer_instance == null)
      new JsonElementSerializer();
    return JsonElementSerializer_instance;
  }
  function JsonObjectDescriptor() {
    JsonObjectDescriptor_instance = this;
    this.fc3_1 = MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).ib5();
    this.gc3_1 = 'kotlinx.serialization.json.JsonObject';
  }
  protoOf(JsonObjectDescriptor).ib6 = function () {
    return this.fc3_1.ib6();
  };
  protoOf(JsonObjectDescriptor).jb6 = function () {
    return this.fc3_1.jb6();
  };
  protoOf(JsonObjectDescriptor).kb6 = function () {
    return this.fc3_1.kb6();
  };
  protoOf(JsonObjectDescriptor).db6 = function () {
    return this.fc3_1.db6();
  };
  protoOf(JsonObjectDescriptor).lb6 = function () {
    return this.fc3_1.lb6();
  };
  protoOf(JsonObjectDescriptor).mb6 = function (index) {
    return this.fc3_1.mb6(index);
  };
  protoOf(JsonObjectDescriptor).nb6 = function (index) {
    return this.fc3_1.nb6(index);
  };
  protoOf(JsonObjectDescriptor).ob6 = function (name) {
    return this.fc3_1.ob6(name);
  };
  protoOf(JsonObjectDescriptor).pb6 = function (index) {
    return this.fc3_1.pb6(index);
  };
  protoOf(JsonObjectDescriptor).qb6 = function (index) {
    return this.fc3_1.qb6(index);
  };
  protoOf(JsonObjectDescriptor).hb6 = function () {
    return this.gc3_1;
  };
  var JsonObjectDescriptor_instance;
  function JsonObjectDescriptor_getInstance() {
    if (JsonObjectDescriptor_instance == null)
      new JsonObjectDescriptor();
    return JsonObjectDescriptor_instance;
  }
  function JsonObjectSerializer() {
    JsonObjectSerializer_instance = this;
    this.cc3_1 = JsonObjectDescriptor_getInstance();
  }
  protoOf(JsonObjectSerializer).ib5 = function () {
    return this.cc3_1;
  };
  protoOf(JsonObjectSerializer).jb5 = function (decoder) {
    verify(decoder);
    return new JsonObject(MapSerializer(serializer(StringCompanionObject_instance), JsonElementSerializer_getInstance()).jb5(decoder));
  };
  var JsonObjectSerializer_instance;
  function JsonObjectSerializer_getInstance() {
    if (JsonObjectSerializer_instance == null)
      new JsonObjectSerializer();
    return JsonObjectSerializer_instance;
  }
  function JsonArrayDescriptor() {
    JsonArrayDescriptor_instance = this;
    this.hc3_1 = ListSerializer(JsonElementSerializer_getInstance()).ib5();
    this.ic3_1 = 'kotlinx.serialization.json.JsonArray';
  }
  protoOf(JsonArrayDescriptor).ib6 = function () {
    return this.hc3_1.ib6();
  };
  protoOf(JsonArrayDescriptor).jb6 = function () {
    return this.hc3_1.jb6();
  };
  protoOf(JsonArrayDescriptor).kb6 = function () {
    return this.hc3_1.kb6();
  };
  protoOf(JsonArrayDescriptor).db6 = function () {
    return this.hc3_1.db6();
  };
  protoOf(JsonArrayDescriptor).lb6 = function () {
    return this.hc3_1.lb6();
  };
  protoOf(JsonArrayDescriptor).mb6 = function (index) {
    return this.hc3_1.mb6(index);
  };
  protoOf(JsonArrayDescriptor).nb6 = function (index) {
    return this.hc3_1.nb6(index);
  };
  protoOf(JsonArrayDescriptor).ob6 = function (name) {
    return this.hc3_1.ob6(name);
  };
  protoOf(JsonArrayDescriptor).pb6 = function (index) {
    return this.hc3_1.pb6(index);
  };
  protoOf(JsonArrayDescriptor).qb6 = function (index) {
    return this.hc3_1.qb6(index);
  };
  protoOf(JsonArrayDescriptor).hb6 = function () {
    return this.ic3_1;
  };
  var JsonArrayDescriptor_instance;
  function JsonArrayDescriptor_getInstance() {
    if (JsonArrayDescriptor_instance == null)
      new JsonArrayDescriptor();
    return JsonArrayDescriptor_instance;
  }
  function JsonArraySerializer() {
    JsonArraySerializer_instance = this;
    this.dc3_1 = JsonArrayDescriptor_getInstance();
  }
  protoOf(JsonArraySerializer).ib5 = function () {
    return this.dc3_1;
  };
  protoOf(JsonArraySerializer).jb5 = function (decoder) {
    verify(decoder);
    return new JsonArray(ListSerializer(JsonElementSerializer_getInstance()).jb5(decoder));
  };
  var JsonArraySerializer_instance;
  function JsonArraySerializer_getInstance() {
    if (JsonArraySerializer_instance == null)
      new JsonArraySerializer();
    return JsonArraySerializer_instance;
  }
  function defer(deferred) {
    return new defer$1(deferred);
  }
  function JsonPrimitiveSerializer() {
    JsonPrimitiveSerializer_instance = this;
    this.zc2_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonPrimitive', STRING_getInstance(), []);
  }
  protoOf(JsonPrimitiveSerializer).ib5 = function () {
    return this.zc2_1;
  };
  protoOf(JsonPrimitiveSerializer).jb5 = function (decoder) {
    var result = asJsonDecoder(decoder).kc2();
    if (!(result instanceof JsonPrimitive))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonPrimitive, had ' + getKClassFromExpression(result), toString(result));
    return result;
  };
  var JsonPrimitiveSerializer_instance;
  function JsonPrimitiveSerializer_getInstance() {
    if (JsonPrimitiveSerializer_instance == null)
      new JsonPrimitiveSerializer();
    return JsonPrimitiveSerializer_instance;
  }
  function JsonNullSerializer() {
    JsonNullSerializer_instance = this;
    this.ac3_1 = buildSerialDescriptor('kotlinx.serialization.json.JsonNull', ENUM_getInstance(), []);
  }
  protoOf(JsonNullSerializer).ib5 = function () {
    return this.ac3_1;
  };
  protoOf(JsonNullSerializer).jb5 = function (decoder) {
    verify(decoder);
    if (decoder.mb7()) {
      throw new JsonDecodingException("Expected 'null' literal");
    }
    decoder.nb7();
    return JsonNull_getInstance();
  };
  var JsonNullSerializer_instance;
  function JsonNullSerializer_getInstance() {
    if (JsonNullSerializer_instance == null)
      new JsonNullSerializer();
    return JsonNullSerializer_instance;
  }
  function JsonLiteralSerializer() {
    JsonLiteralSerializer_instance = this;
    this.bc3_1 = PrimitiveSerialDescriptor('kotlinx.serialization.json.JsonLiteral', STRING_getInstance());
  }
  protoOf(JsonLiteralSerializer).ib5 = function () {
    return this.bc3_1;
  };
  protoOf(JsonLiteralSerializer).jb5 = function (decoder) {
    var result = asJsonDecoder(decoder).kc2();
    if (!(result instanceof JsonLiteral))
      throw JsonDecodingException_0(-1, 'Unexpected JSON element, expected JsonLiteral, had ' + getKClassFromExpression(result), toString(result));
    return result;
  };
  var JsonLiteralSerializer_instance;
  function JsonLiteralSerializer_getInstance() {
    if (JsonLiteralSerializer_instance == null)
      new JsonLiteralSerializer();
    return JsonLiteralSerializer_instance;
  }
  function asJsonDecoder(_this__u8e3s4) {
    var tmp0_elvis_lhs = isInterface(_this__u8e3s4, JsonDecoder) ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('This serializer can be used only with Json format.' + ('Expected Decoder to be JsonDecoder, got ' + getKClassFromExpression(_this__u8e3s4)));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function verify(decoder) {
    asJsonDecoder(decoder);
  }
  function _get_original__l7ku1m($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.jc3_1;
    original$factory();
    return this_0.s2();
  }
  function defer$1($deferred) {
    this.jc3_1 = lazy_0($deferred);
  }
  protoOf(defer$1).hb6 = function () {
    return _get_original__l7ku1m(this).hb6();
  };
  protoOf(defer$1).lb6 = function () {
    return _get_original__l7ku1m(this).lb6();
  };
  protoOf(defer$1).jb6 = function () {
    return _get_original__l7ku1m(this).jb6();
  };
  protoOf(defer$1).pb6 = function (index) {
    return _get_original__l7ku1m(this).pb6(index);
  };
  protoOf(defer$1).ob6 = function (name) {
    return _get_original__l7ku1m(this).ob6(name);
  };
  protoOf(defer$1).mb6 = function (index) {
    return _get_original__l7ku1m(this).mb6(index);
  };
  protoOf(defer$1).nb6 = function (index) {
    return _get_original__l7ku1m(this).nb6(index);
  };
  protoOf(defer$1).qb6 = function (index) {
    return _get_original__l7ku1m(this).qb6(index);
  };
  function original$factory() {
    return getPropertyCallableRef('original', 1, KProperty1, function (receiver) {
      return _get_original__l7ku1m(receiver);
    }, null);
  }
  function readIfAbsent($this, descriptor, index) {
    $this.lc3_1 = !descriptor.qb6(index) ? descriptor.nb6(index).db6() : false;
    return $this.lc3_1;
  }
  function JsonElementMarker$readIfAbsent$ref($boundThis) {
    var l = function (p0, p1) {
      return readIfAbsent($boundThis, p0, p1);
    };
    l.callableName = 'readIfAbsent';
    return l;
  }
  function JsonElementMarker(descriptor) {
    var tmp = this;
    tmp.kc3_1 = new ElementMarker(descriptor, JsonElementMarker$readIfAbsent$ref(this));
    this.lc3_1 = false;
  }
  protoOf(JsonElementMarker).hbc = function (index) {
    this.kc3_1.hbc(index);
  };
  protoOf(JsonElementMarker).ibc = function () {
    return this.kc3_1.ibc();
  };
  function invalidTrailingComma(_this__u8e3s4, entity) {
    entity = entity === VOID ? 'object' : entity;
    _this__u8e3s4.mc3('Trailing comma before the end of JSON ' + entity, _this__u8e3s4.xc0_1 - 1 | 0, "Trailing commas are non-complaint JSON and not allowed by default. Use 'allowTrailingCommas = true' in 'Json {}' builder to support them.");
  }
  function throwInvalidFloatingPointDecoded(_this__u8e3s4, result) {
    _this__u8e3s4.nc3('Unexpected special floating-point value ' + toString(result) + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification', VOID, get_specialFlowingValuesHint());
  }
  function JsonEncodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonEncodingException);
  }
  function InvalidKeyKindException(keyDescriptor) {
    return new JsonEncodingException("Value of type '" + keyDescriptor.hb6() + "' can't be used in JSON as a key in the map. " + ("It should have either primitive or enum kind, but its kind is '" + keyDescriptor.lb6() + "'.\n") + get_allowStructuredMapKeysHint());
  }
  function JsonDecodingException(message) {
    JsonException.call(this, message);
    captureStack(this, JsonDecodingException);
  }
  function JsonDecodingException_0(offset, message, input) {
    return JsonDecodingException_1(offset, message + '\nJSON input: ' + minify(input, offset));
  }
  function InvalidFloatingPointDecoded(value, key, output) {
    return JsonDecodingException_1(-1, unexpectedFpErrorMessage(value, key, output));
  }
  function JsonDecodingException_1(offset, message) {
    return new JsonDecodingException(offset >= 0 ? 'Unexpected JSON token at offset ' + offset + ': ' + message : message);
  }
  function UnknownKeyException(key, input) {
    return JsonDecodingException_1(-1, "Encountered an unknown key '" + key + "'.\n" + (get_ignoreUnknownKeysHint() + '\n') + ('Current input: ' + minify(input)));
  }
  function JsonException(message) {
    SerializationException_init_$Init$(message, this);
    captureStack(this, JsonException);
  }
  function unexpectedFpErrorMessage(value, key, output) {
    return 'Unexpected special floating-point value ' + toString(value) + ' with key ' + key + '. By default, ' + 'non-finite floating point values are prohibited because they do not conform JSON specification. ' + (get_specialFlowingValuesHint() + '\n') + ('Current output: ' + minify(output));
  }
  function minify(_this__u8e3s4, offset) {
    offset = offset === VOID ? -1 : offset;
    if (charSequenceLength(_this__u8e3s4) < 200)
      return _this__u8e3s4;
    if (offset === -1) {
      var start = charSequenceLength(_this__u8e3s4) - 60 | 0;
      if (start <= 0)
        return _this__u8e3s4;
      // Inline function 'kotlin.text.substring' call
      var endIndex = charSequenceLength(_this__u8e3s4);
      return '.....' + toString(charSequenceSubSequence(_this__u8e3s4, start, endIndex));
    }
    var start_0 = offset - 30 | 0;
    var end = offset + 30 | 0;
    var prefix = start_0 <= 0 ? '' : '.....';
    var suffix = end >= charSequenceLength(_this__u8e3s4) ? '' : '.....';
    // Inline function 'kotlin.text.substring' call
    var startIndex = coerceAtLeast(start_0, 0);
    var endIndex_0 = coerceAtMost(end, charSequenceLength(_this__u8e3s4));
    return prefix + toString(charSequenceSubSequence(_this__u8e3s4, startIndex, endIndex_0)) + suffix;
  }
  function get_JsonDeserializationNamesKey() {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return JsonDeserializationNamesKey;
  }
  var JsonDeserializationNamesKey;
  var JsonSerializationNamesKey;
  function getJsonNameIndex(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    if (decodeCaseInsensitive(json, _this__u8e3s4)) {
      // Inline function 'kotlin.text.lowercase' call
      // Inline function 'kotlin.js.asDynamic' call
      var tmp$ret$1 = name.toLowerCase();
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, tmp$ret$1);
    }
    var strategy = namingStrategy(_this__u8e3s4, json);
    if (!(strategy == null))
      return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
    var index = _this__u8e3s4.ob6(name);
    if (!(index === -3))
      return index;
    if (!json.lc0_1.ec2_1)
      return index;
    return getJsonNameIndexSlowPath(_this__u8e3s4, json, name);
  }
  function namingStrategy(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return equals(_this__u8e3s4.lb6(), CLASS_getInstance()) ? json.lc0_1.fc2_1 : null;
  }
  function deserializationNamesMap(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp = get_schemaCache(_this__u8e3s4);
    var tmp_0 = get_JsonDeserializationNamesKey();
    return tmp.pc3(descriptor, tmp_0, deserializationNamesMap$lambda(descriptor, _this__u8e3s4));
  }
  function decodeCaseInsensitive(_this__u8e3s4, descriptor) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    return _this__u8e3s4.lc0_1.gc2_1 ? equals(descriptor.lb6(), ENUM_getInstance()) : false;
  }
  function getJsonNameIndexSlowPath(_this__u8e3s4, json, name) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    var tmp0_elvis_lhs = deserializationNamesMap(json, _this__u8e3s4).z2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = -3;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function buildDeserializationNamesMap(_this__u8e3s4, json) {
    _init_properties_JsonNamesMap_kt__cbbp0k();
    // Inline function 'kotlin.collections.mutableMapOf' call
    var builder = LinkedHashMap_init_$Create$();
    var useLowercaseEnums = decodeCaseInsensitive(json, _this__u8e3s4);
    var strategyForClasses = namingStrategy(_this__u8e3s4, json);
    var inductionVariable = 0;
    var last = _this__u8e3s4.jb6();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.filterIsInstance' call
        // Inline function 'kotlin.collections.filterIsInstanceTo' call
        var this_0 = _this__u8e3s4.mb6(i);
        var destination = ArrayList_init_$Create$();
        var tmp0_iterator = this_0.o();
        while (tmp0_iterator.d1()) {
          var element = tmp0_iterator.f1();
          if (element instanceof JsonNames) {
            destination.a1(element);
          }
        }
        var tmp1_safe_receiver = singleOrNull(destination);
        var tmp2_safe_receiver = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.qc3_1;
        if (tmp2_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.collections.forEach' call
          var inductionVariable_0 = 0;
          var last_0 = tmp2_safe_receiver.length;
          while (inductionVariable_0 < last_0) {
            var element_0 = tmp2_safe_receiver[inductionVariable_0];
            inductionVariable_0 = inductionVariable_0 + 1 | 0;
            // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
            var tmp;
            if (useLowercaseEnums) {
              // Inline function 'kotlin.text.lowercase' call
              // Inline function 'kotlin.js.asDynamic' call
              tmp = element_0.toLowerCase();
            } else {
              tmp = element_0;
            }
            buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, tmp, i);
          }
        }
        var tmp_0;
        if (useLowercaseEnums) {
          // Inline function 'kotlin.text.lowercase' call
          // Inline function 'kotlin.js.asDynamic' call
          tmp_0 = _this__u8e3s4.pb6(i).toLowerCase();
        } else if (!(strategyForClasses == null)) {
          tmp_0 = strategyForClasses.rc3(_this__u8e3s4, i, _this__u8e3s4.pb6(i));
        } else {
          tmp_0 = null;
        }
        var nameToPut = tmp_0;
        if (nameToPut == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          buildDeserializationNamesMap$putOrThrow(builder, _this__u8e3s4, nameToPut, i);
        }
      }
       while (inductionVariable < last);
    // Inline function 'kotlin.collections.ifEmpty' call
    var tmp_1;
    if (builder.u()) {
      // Inline function 'kotlinx.serialization.json.internal.buildDeserializationNamesMap.<anonymous>' call
      tmp_1 = emptyMap();
    } else {
      tmp_1 = builder;
    }
    return tmp_1;
  }
  function buildDeserializationNamesMap$putOrThrow(_this__u8e3s4, $this_buildDeserializationNamesMap, name, index) {
    var entity = equals($this_buildDeserializationNamesMap.lb6(), ENUM_getInstance()) ? 'enum value' : 'property';
    // Inline function 'kotlin.collections.contains' call
    // Inline function 'kotlin.collections.containsKey' call
    if ((isInterface(_this__u8e3s4, Map) ? _this__u8e3s4 : THROW_CCE()).w2(name)) {
      throw new JsonException("The suggested name '" + name + "' for " + entity + ' ' + $this_buildDeserializationNamesMap.pb6(index) + ' is already one of the names for ' + entity + ' ' + ($this_buildDeserializationNamesMap.pb6(getValue(_this__u8e3s4, name)) + ' in ' + $this_buildDeserializationNamesMap));
    }
    // Inline function 'kotlin.collections.set' call
    _this__u8e3s4.p2(name, index);
  }
  function deserializationNamesMap$lambda($descriptor, $this_deserializationNamesMap) {
    return function () {
      return buildDeserializationNamesMap($descriptor, $this_deserializationNamesMap);
    };
  }
  var properties_initialized_JsonNamesMap_kt_ljpf42;
  function _init_properties_JsonNamesMap_kt__cbbp0k() {
    if (!properties_initialized_JsonNamesMap_kt_ljpf42) {
      properties_initialized_JsonNamesMap_kt_ljpf42 = true;
      JsonDeserializationNamesKey = new Key();
      JsonSerializationNamesKey = new Key();
    }
  }
  function Tombstone() {
  }
  var Tombstone_instance;
  function Tombstone_getInstance() {
    return Tombstone_instance;
  }
  function resize($this) {
    var newSize = imul($this.uc3_1, 2);
    $this.sc3_1 = copyOf($this.sc3_1, newSize);
    $this.tc3_1 = copyOf_0($this.tc3_1, newSize);
  }
  function JsonPath() {
    var tmp = this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp.sc3_1 = fillArrayVal(Array(8), null);
    var tmp_0 = this;
    var tmp_1 = 0;
    var tmp_2 = new Int32Array(8);
    while (tmp_1 < 8) {
      tmp_2[tmp_1] = -1;
      tmp_1 = tmp_1 + 1 | 0;
    }
    tmp_0.tc3_1 = tmp_2;
    this.uc3_1 = -1;
  }
  protoOf(JsonPath).vc3 = function (sd) {
    this.uc3_1 = this.uc3_1 + 1 | 0;
    var depth = this.uc3_1;
    if (depth === this.sc3_1.length) {
      resize(this);
    }
    this.sc3_1[depth] = sd;
  };
  protoOf(JsonPath).wc3 = function (index) {
    this.tc3_1[this.uc3_1] = index;
  };
  protoOf(JsonPath).xc3 = function (key) {
    var tmp;
    if (!(this.tc3_1[this.uc3_1] === -2)) {
      this.uc3_1 = this.uc3_1 + 1 | 0;
      tmp = this.uc3_1 === this.sc3_1.length;
    } else {
      tmp = false;
    }
    if (tmp) {
      resize(this);
    }
    this.sc3_1[this.uc3_1] = key;
    this.tc3_1[this.uc3_1] = -2;
  };
  protoOf(JsonPath).yc3 = function () {
    if (this.tc3_1[this.uc3_1] === -2) {
      this.sc3_1[this.uc3_1] = Tombstone_instance;
    }
  };
  protoOf(JsonPath).zc3 = function () {
    var depth = this.uc3_1;
    if (this.tc3_1[depth] === -2) {
      this.tc3_1[depth] = -1;
      this.uc3_1 = this.uc3_1 - 1 | 0;
    }
    if (!(this.uc3_1 === -1)) {
      this.uc3_1 = this.uc3_1 - 1 | 0;
    }
  };
  protoOf(JsonPath).ac4 = function () {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.json.internal.JsonPath.getPath.<anonymous>' call
    this_0.y5('$');
    // Inline function 'kotlin.repeat' call
    var times = this.uc3_1 + 1 | 0;
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.serialization.json.internal.JsonPath.getPath.<anonymous>.<anonymous>' call
        var element = this.sc3_1[index];
        if (!(element == null) ? isInterface(element, SerialDescriptor) : false) {
          if (equals(element.lb6(), LIST_getInstance())) {
            if (!(this.tc3_1[index] === -1)) {
              this_0.y5('[');
              this_0.r8(this.tc3_1[index]);
              this_0.y5(']');
            }
          } else {
            var idx = this.tc3_1[index];
            if (idx >= 0) {
              this_0.y5('.');
              this_0.y5(element.pb6(idx));
            }
          }
        } else {
          if (!(element === Tombstone_instance)) {
            this_0.y5('[');
            this_0.y5("'");
            this_0.x5(element);
            this_0.y5("'");
            this_0.y5(']');
          }
        }
      }
       while (inductionVariable < times);
    return this_0.toString();
  };
  protoOf(JsonPath).toString = function () {
    return this.ac4();
  };
  function readObject($this) {
    // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObjectImpl' call
    var lastToken = $this.bc4_1.fc4(get_TC_BEGIN_OBJ());
    if ($this.bc4_1.gc4() === get_TC_COMMA()) {
      $this.bc4_1.nc3('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.linkedMapOf' call
    var result = LinkedHashMap_init_$Create$();
    $l$loop: while ($this.bc4_1.hc4()) {
      var key = $this.cc4_1 ? $this.bc4_1.jc4() : $this.bc4_1.ic4();
      $this.bc4_1.fc4(get_TC_COLON());
      // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readObject.<anonymous>' call
      var element = $this.kc4();
      // Inline function 'kotlin.collections.set' call
      result.p2(key, element);
      lastToken = $this.bc4_1.lc4();
      var tmp0_subject = lastToken;
      if (tmp0_subject !== get_TC_COMMA())
        if (tmp0_subject === get_TC_END_OBJ())
          break $l$loop;
        else {
          $this.bc4_1.nc3('Expected end of the object or comma');
        }
    }
    if (lastToken === get_TC_BEGIN_OBJ()) {
      $this.bc4_1.fc4(get_TC_END_OBJ());
    } else if (lastToken === get_TC_COMMA()) {
      if (!$this.dc4_1) {
        invalidTrailingComma($this.bc4_1);
      }
      $this.bc4_1.fc4(get_TC_END_OBJ());
    }
    return new JsonObject(result);
  }
  function readObject_0(_this__u8e3s4, $this, $completion) {
    var tmp = new $readObjectCOROUTINE$0($this, _this__u8e3s4, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function readArray($this) {
    var lastToken = $this.bc4_1.lc4();
    if ($this.bc4_1.gc4() === get_TC_COMMA()) {
      $this.bc4_1.nc3('Unexpected leading comma');
    }
    // Inline function 'kotlin.collections.arrayListOf' call
    var result = ArrayList_init_$Create$();
    while ($this.bc4_1.hc4()) {
      var element = $this.kc4();
      result.a1(element);
      lastToken = $this.bc4_1.lc4();
      if (!(lastToken === get_TC_COMMA())) {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
        var this_0 = $this.bc4_1;
        var condition = lastToken === get_TC_END_LIST();
        var position = this_0.xc0_1;
        if (!condition) {
          // Inline function 'kotlinx.serialization.json.internal.JsonTreeReader.readArray.<anonymous>' call
          var tmp$ret$1 = 'Expected end of the array or comma';
          this_0.nc3(tmp$ret$1, position);
        }
      }
    }
    if (lastToken === get_TC_BEGIN_LIST()) {
      $this.bc4_1.fc4(get_TC_END_LIST());
    } else if (lastToken === get_TC_COMMA()) {
      if (!$this.dc4_1) {
        invalidTrailingComma($this.bc4_1, 'array');
      }
      $this.bc4_1.fc4(get_TC_END_LIST());
    }
    return new JsonArray(result);
  }
  function readValue($this, isString) {
    var tmp;
    if ($this.cc4_1 ? true : !isString) {
      tmp = $this.bc4_1.jc4();
    } else {
      tmp = $this.bc4_1.ic4();
    }
    var string = tmp;
    if (!isString ? string === get_NULL() : false)
      return JsonNull_getInstance();
    return new JsonLiteral(string, isString);
  }
  function readDeepRecursive($this) {
    return invoke(new DeepRecursiveFunction(JsonTreeReader$readDeepRecursive$slambda_0($this, null)), Unit_instance);
  }
  function JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation) {
    this.ic5_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JsonTreeReader$readDeepRecursive$slambda).nc5 = function ($this$$receiver, it, $completion) {
    var tmp = this.oc5($this$$receiver, it, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).nh = function (p1, p2, $completion) {
    var tmp = p1 instanceof DeepRecursiveScope ? p1 : THROW_CCE();
    return this.nc5(tmp, p2 instanceof Unit ? p2 : THROW_CCE(), $completion);
  };
  protoOf(JsonTreeReader$readDeepRecursive$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.lc5_1 = this.ic5_1.bc4_1.gc4();
            if (this.lc5_1 === get_TC_STRING()) {
              this.mc5_1 = readValue(this.ic5_1, true);
              this.ac_1 = 2;
              continue $sm;
            } else {
              if (this.lc5_1 === get_TC_OTHER()) {
                this.mc5_1 = readValue(this.ic5_1, false);
                this.ac_1 = 2;
                continue $sm;
              } else {
                if (this.lc5_1 === get_TC_BEGIN_OBJ()) {
                  this.ac_1 = 1;
                  suspendResult = readObject_0(this.jc5_1, this.ic5_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  if (this.lc5_1 === get_TC_BEGIN_LIST()) {
                    this.mc5_1 = readArray(this.ic5_1);
                    this.ac_1 = 2;
                    continue $sm;
                  } else {
                    var tmp_0 = this;
                    this.ic5_1.bc4_1.nc3("Can't begin reading element, unexpected token");
                  }
                }
              }
            }

            break;
          case 1:
            this.mc5_1 = suspendResult;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            return this.mc5_1;
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
  protoOf(JsonTreeReader$readDeepRecursive$slambda).oc5 = function ($this$$receiver, it, completion) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this.ic5_1, completion);
    i.jc5_1 = $this$$receiver;
    i.kc5_1 = it;
    return i;
  };
  function JsonTreeReader$readDeepRecursive$slambda_0(this$0, resultContinuation) {
    var i = new JsonTreeReader$readDeepRecursive$slambda(this$0, resultContinuation);
    var l = function ($this$$receiver, it, $completion) {
      return i.nc5($this$$receiver, it, $completion);
    };
    l.$arity = 2;
    return l;
  }
  function $readObjectCOROUTINE$0(_this__u8e3s4, _this__u8e3s4_0, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.uc4_1 = _this__u8e3s4;
    this.vc4_1 = _this__u8e3s4_0;
  }
  protoOf($readObjectCOROUTINE$0).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            var tmp_0 = this;
            tmp_0.wc4_1 = this.uc4_1;
            this.xc4_1 = this.wc4_1.bc4_1.fc4(get_TC_BEGIN_OBJ());
            if (this.wc4_1.bc4_1.gc4() === get_TC_COMMA()) {
              this.wc4_1.bc4_1.nc3('Unexpected leading comma');
            }

            var tmp_1 = this;
            tmp_1.yc4_1 = LinkedHashMap_init_$Create$();
            this.ac_1 = 1;
            continue $sm;
          case 1:
            if (!this.wc4_1.bc4_1.hc4()) {
              this.ac_1 = 4;
              continue $sm;
            }

            this.zc4_1 = this.wc4_1.cc4_1 ? this.wc4_1.bc4_1.jc4() : this.wc4_1.bc4_1.ic4();
            this.wc4_1.bc4_1.fc4(get_TC_COLON());
            this.ac_1 = 2;
            suspendResult = this.vc4_1.fh(Unit_instance, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            var element = suspendResult;
            var this_0 = this.yc4_1;
            var key = this.zc4_1;
            this_0.p2(key, element);
            this.xc4_1 = this.wc4_1.bc4_1.lc4();
            var tmp0_subject = this.xc4_1;
            if (tmp0_subject === get_TC_COMMA()) {
              this.ac_1 = 3;
              continue $sm;
            } else {
              if (tmp0_subject === get_TC_END_OBJ()) {
                this.ac_1 = 4;
                continue $sm;
              } else {
                this.wc4_1.bc4_1.nc3('Expected end of the object or comma');
              }
            }

            break;
          case 3:
            this.ac_1 = 1;
            continue $sm;
          case 4:
            if (this.xc4_1 === get_TC_BEGIN_OBJ()) {
              this.wc4_1.bc4_1.fc4(get_TC_END_OBJ());
            } else if (this.xc4_1 === get_TC_COMMA()) {
              if (!this.wc4_1.dc4_1) {
                invalidTrailingComma(this.wc4_1.bc4_1);
              }
              this.wc4_1.bc4_1.fc4(get_TC_END_OBJ());
            }

            return new JsonObject(this.yc4_1);
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
  function JsonTreeReader(configuration, lexer) {
    this.bc4_1 = lexer;
    this.cc4_1 = configuration.vc1_1;
    this.dc4_1 = configuration.hc2_1;
    this.ec4_1 = 0;
  }
  protoOf(JsonTreeReader).kc4 = function () {
    var token = this.bc4_1.gc4();
    var tmp;
    if (token === get_TC_STRING()) {
      tmp = readValue(this, true);
    } else if (token === get_TC_OTHER()) {
      tmp = readValue(this, false);
    } else if (token === get_TC_BEGIN_OBJ()) {
      var tmp_0;
      this.ec4_1 = this.ec4_1 + 1 | 0;
      if (this.ec4_1 === 200) {
        tmp_0 = readDeepRecursive(this);
      } else {
        tmp_0 = readObject(this);
      }
      var result = tmp_0;
      this.ec4_1 = this.ec4_1 - 1 | 0;
      tmp = result;
    } else if (token === get_TC_BEGIN_LIST()) {
      tmp = readArray(this);
    } else {
      this.bc4_1.nc3('Cannot read Json element because of unexpected ' + tokenDescription(token));
    }
    return tmp;
  };
  function classDiscriminator(_this__u8e3s4, json) {
    var tmp0_iterator = _this__u8e3s4.ib6().o();
    while (tmp0_iterator.d1()) {
      var annotation = tmp0_iterator.f1();
      if (annotation instanceof JsonClassDiscriminator)
        return annotation.pc5_1;
    }
    return json.lc0_1.cc2_1;
  }
  function decodeSerializableValuePolymorphic(_this__u8e3s4, deserializer) {
    var tmp;
    if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
      tmp = true;
    } else {
      tmp = _this__u8e3s4.jc2().lc0_1.bc2_1;
    }
    if (tmp) {
      return deserializer.jb5(_this__u8e3s4);
    }
    var discriminator = classDiscriminator(deserializer.ib5(), _this__u8e3s4.jc2());
    // Inline function 'kotlinx.serialization.json.internal.cast' call
    var value = _this__u8e3s4.kc2();
    var descriptor = deserializer.ib5();
    if (!(value instanceof JsonObject)) {
      throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor.hb6() + ', but had ' + getKClassFromExpression(value));
    }
    var jsonTree = value;
    var tmp0_safe_receiver = jsonTree.nc2(discriminator);
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_jsonPrimitive(tmp0_safe_receiver);
    var type = tmp1_safe_receiver == null ? null : get_contentOrNull(tmp1_safe_receiver);
    var tmp_0;
    try {
      tmp_0 = findPolymorphicSerializer(deserializer, _this__u8e3s4, type);
    } catch ($p) {
      var tmp_1;
      if ($p instanceof SerializationException) {
        var it = $p;
        throw JsonDecodingException_0(-1, ensureNotNull(it.message), jsonTree.toString());
      } else {
        throw $p;
      }
    }
    var tmp_2 = tmp_0;
    var actualSerializer = isInterface(tmp_2, DeserializationStrategy) ? tmp_2 : THROW_CCE();
    return readPolymorphicJson(_this__u8e3s4.jc2(), discriminator, jsonTree, actualSerializer);
  }
  function checkKind($this, descriptor, actualClass) {
    var kind = descriptor.lb6();
    var tmp;
    if (kind instanceof PolymorphicKind) {
      tmp = true;
    } else {
      tmp = equals(kind, CONTEXTUAL_getInstance());
    }
    if (tmp) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.e7() + " can't be registered as a subclass for polymorphic serialization " + ('because its kind ' + kind + ' is not concrete. To work with multiple hierarchies, register it as a base class.'));
    }
    if ($this.qc5_1)
      return Unit_instance;
    var tmp_0;
    var tmp_1;
    if (equals(kind, LIST_getInstance()) ? true : equals(kind, MAP_getInstance())) {
      tmp_1 = true;
    } else {
      tmp_1 = kind instanceof PrimitiveKind;
    }
    if (tmp_1) {
      tmp_0 = true;
    } else {
      tmp_0 = kind instanceof ENUM;
    }
    if (tmp_0) {
      throw IllegalArgumentException_init_$Create$('Serializer for ' + actualClass.e7() + ' of kind ' + kind + ' cannot be serialized polymorphically with class discriminator.');
    }
  }
  function checkDiscriminatorCollisions($this, descriptor, actualClass) {
    var inductionVariable = 0;
    var last = descriptor.jb6();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var name = descriptor.pb6(i);
        if (name === $this.rc5_1) {
          throw IllegalArgumentException_init_$Create$('Polymorphic serializer for ' + actualClass + " has property '" + name + "' that conflicts " + 'with JSON class discriminator. You can either change class discriminator in JsonConfiguration, ' + 'rename property with @SerialName annotation ' + 'or fall back to array polymorphism');
        }
      }
       while (inductionVariable < last);
  }
  function PolymorphismValidator(useArrayPolymorphism, discriminator) {
    this.qc5_1 = useArrayPolymorphism;
    this.rc5_1 = discriminator;
  }
  protoOf(PolymorphismValidator).zbj = function (kClass, provider) {
  };
  protoOf(PolymorphismValidator).cbk = function (baseClass, actualClass, actualSerializer) {
    var descriptor = actualSerializer.ib5();
    checkKind(this, descriptor, actualClass);
    if (!this.qc5_1) {
      checkDiscriminatorCollisions(this, descriptor, actualClass);
    }
  };
  protoOf(PolymorphismValidator).dbk = function (baseClass, defaultSerializerProvider) {
  };
  protoOf(PolymorphismValidator).ebk = function (baseClass, defaultDeserializerProvider) {
  };
  function Key() {
  }
  function DescriptorSchemaCache() {
    this.oc3_1 = createMapForCache(16);
  }
  protoOf(DescriptorSchemaCache).sc5 = function (descriptor, key, value) {
    // Inline function 'kotlin.collections.set' call
    // Inline function 'kotlin.collections.getOrPut' call
    var this_0 = this.oc3_1;
    var value_0 = this_0.z2(descriptor);
    var tmp;
    if (value_0 == null) {
      // Inline function 'kotlinx.serialization.json.internal.DescriptorSchemaCache.set.<anonymous>' call
      var answer = createMapForCache(2);
      this_0.p2(descriptor, answer);
      tmp = answer;
    } else {
      tmp = value_0;
    }
    var this_1 = tmp;
    var key_0 = key instanceof Key ? key : THROW_CCE();
    var value_1 = !(value == null) ? value : THROW_CCE();
    this_1.p2(key_0, value_1);
  };
  protoOf(DescriptorSchemaCache).pc3 = function (descriptor, key, defaultValue) {
    var tmp0_safe_receiver = this.tc5(descriptor, key);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return tmp0_safe_receiver;
    }
    var value = defaultValue();
    this.sc5(descriptor, key, value);
    return value;
  };
  protoOf(DescriptorSchemaCache).tc5 = function (descriptor, key) {
    var tmp0_safe_receiver = this.oc3_1.z2(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      tmp = tmp0_safe_receiver.z2(key instanceof Key ? key : THROW_CCE());
    }
    var tmp_0 = tmp;
    return !(tmp_0 == null) ? tmp_0 : null;
  };
  function DiscriminatorHolder(discriminatorToSkip) {
    this.uc5_1 = discriminatorToSkip;
  }
  function trySkip(_this__u8e3s4, $this, unknownKey) {
    if (_this__u8e3s4 == null)
      return false;
    if (_this__u8e3s4.uc5_1 === unknownKey) {
      _this__u8e3s4.uc5_1 = null;
      return true;
    }
    return false;
  }
  function skipLeftoverElements($this, descriptor) {
    $l$loop: while (true) {
      var tmp = $this.rb8(descriptor);
      if (!!(tmp === -1)) {
        break $l$loop;
      }
    }
  }
  function checkLeadingComma($this) {
    if ($this.rc0_1.gc4() === get_TC_COMMA()) {
      $this.rc0_1.nc3('Unexpected leading comma');
    }
  }
  function decodeMapIndex($this) {
    var hasComma = false;
    var decodingKey = !(($this.tc0_1 % 2 | 0) === 0);
    if (decodingKey) {
      if (!($this.tc0_1 === -1)) {
        hasComma = $this.rc0_1.wc5();
      }
    } else {
      $this.rc0_1.vc5(get_COLON());
    }
    var tmp;
    if ($this.rc0_1.hc4()) {
      if (decodingKey) {
        if ($this.tc0_1 === -1) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var this_0 = $this.rc0_1;
          var condition = !hasComma;
          var position = this_0.xc0_1;
          if (!condition) {
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeMapIndex.<anonymous>' call
            var tmp$ret$0 = 'Unexpected leading comma';
            this_0.nc3(tmp$ret$0, position);
          }
        } else {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.require' call
          var this_1 = $this.rc0_1;
          var condition_0 = hasComma;
          var position_0 = this_1.xc0_1;
          if (!condition_0) {
            // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeMapIndex.<anonymous>' call
            var tmp$ret$1 = 'Expected comma after the key-value pair';
            this_1.nc3(tmp$ret$1, position_0);
          }
        }
      }
      $this.tc0_1 = $this.tc0_1 + 1 | 0;
      tmp = $this.tc0_1;
    } else {
      if (hasComma ? !$this.pc0_1.lc0_1.hc2_1 : false) {
        invalidTrailingComma($this.rc0_1);
      }
      tmp = -1;
    }
    return tmp;
  }
  function coerceInputValue($this, descriptor, index) {
    var tmp$ret$0;
    $l$block_3: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var this_0 = $this.pc0_1;
      if (!descriptor.qb6(index)) {
        tmp$ret$0 = false;
        break $l$block_3;
      }
      var elementDescriptor = descriptor.nb6(index);
      var tmp;
      if (!elementDescriptor.db6()) {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
        tmp = $this.rc0_1.xc5(true);
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_3;
      }
      if (equals(elementDescriptor.lb6(), ENUM_getInstance())) {
        var tmp_0;
        if (elementDescriptor.db6()) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
          tmp_0 = $this.rc0_1.xc5(false);
        } else {
          tmp_0 = false;
        }
        if (tmp_0) {
          tmp$ret$0 = false;
          break $l$block_3;
        }
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
        var tmp0_elvis_lhs = $this.rc0_1.yc5($this.vc0_1.vc1_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$0 = false;
          break $l$block_3;
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_1;
        var enumIndex = getJsonNameIndex(elementDescriptor, this_0, enumValue);
        if (enumIndex === -3) {
          // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.coerceInputValue.<anonymous>' call
          $this.rc0_1.ic4();
          tmp$ret$0 = true;
          break $l$block_3;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  }
  function decodeObjectIndex($this, descriptor) {
    var hasComma = $this.rc0_1.wc5();
    while ($this.rc0_1.hc4()) {
      hasComma = false;
      var key = decodeStringKey($this);
      $this.rc0_1.vc5(get_COLON());
      var index = getJsonNameIndex(descriptor, $this.pc0_1, key);
      var tmp;
      if (!(index === -3)) {
        var tmp_0;
        if ($this.vc0_1.ac2_1 ? coerceInputValue($this, descriptor, index) : false) {
          hasComma = $this.rc0_1.wc5();
          tmp_0 = false;
        } else {
          var tmp0_safe_receiver = $this.wc0_1;
          if (tmp0_safe_receiver == null)
            null;
          else {
            tmp0_safe_receiver.hbc(index);
          }
          return index;
        }
        tmp = tmp_0;
      } else {
        tmp = true;
      }
      var isUnknown = tmp;
      if (isUnknown) {
        hasComma = handleUnknown($this, key);
      }
    }
    if (hasComma ? !$this.pc0_1.lc0_1.hc2_1 : false) {
      invalidTrailingComma($this.rc0_1);
    }
    var tmp1_safe_receiver = $this.wc0_1;
    var tmp2_elvis_lhs = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.ibc();
    var tmp_1;
    if (tmp2_elvis_lhs == null) {
      tmp_1 = -1;
    } else {
      tmp_1 = tmp2_elvis_lhs;
    }
    return tmp_1;
  }
  function handleUnknown($this, key) {
    if ($this.vc0_1.uc1_1 ? true : trySkip($this.uc0_1, $this, key)) {
      $this.rc0_1.ac6($this.vc0_1.vc1_1);
    } else {
      $this.rc0_1.zc5(key);
    }
    return $this.rc0_1.wc5();
  }
  function decodeListIndex($this) {
    var hasComma = $this.rc0_1.wc5();
    var tmp;
    if ($this.rc0_1.hc4()) {
      if (!($this.tc0_1 === -1) ? !hasComma : false) {
        $this.rc0_1.nc3('Expected end of the array or comma');
      }
      $this.tc0_1 = $this.tc0_1 + 1 | 0;
      tmp = $this.tc0_1;
    } else {
      if (hasComma ? !$this.pc0_1.lc0_1.hc2_1 : false) {
        invalidTrailingComma($this.rc0_1, 'array');
      }
      tmp = -1;
    }
    return tmp;
  }
  function decodeStringKey($this) {
    var tmp;
    if ($this.vc0_1.vc1_1) {
      tmp = $this.rc0_1.cc6();
    } else {
      tmp = $this.rc0_1.bc6();
    }
    return tmp;
  }
  function StreamingJsonDecoder(json, mode, lexer, descriptor, discriminatorHolder) {
    AbstractDecoder.call(this);
    this.pc0_1 = json;
    this.qc0_1 = mode;
    this.rc0_1 = lexer;
    this.sc0_1 = this.pc0_1.pb8();
    this.tc0_1 = -1;
    this.uc0_1 = discriminatorHolder;
    this.vc0_1 = this.pc0_1.lc0_1;
    this.wc0_1 = this.vc0_1.yc1_1 ? null : new JsonElementMarker(descriptor);
  }
  protoOf(StreamingJsonDecoder).jc2 = function () {
    return this.pc0_1;
  };
  protoOf(StreamingJsonDecoder).pb8 = function () {
    return this.sc0_1;
  };
  protoOf(StreamingJsonDecoder).kc2 = function () {
    return (new JsonTreeReader(this.pc0_1.lc0_1, this.rc0_1)).kc4();
  };
  protoOf(StreamingJsonDecoder).zb7 = function (deserializer) {
    try {
      var tmp;
      if (!(deserializer instanceof AbstractPolymorphicSerializer)) {
        tmp = true;
      } else {
        tmp = this.pc0_1.lc0_1.bc2_1;
      }
      if (tmp) {
        return deserializer.jb5(this);
      }
      var discriminator = classDiscriminator(deserializer.ib5(), this.pc0_1);
      var tmp0_elvis_lhs = this.rc0_1.dc6(discriminator, this.vc0_1.vc1_1);
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        return decodeSerializableValuePolymorphic(this, isInterface(deserializer, DeserializationStrategy) ? deserializer : THROW_CCE());
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var type = tmp_0;
      var tmp_1;
      try {
        tmp_1 = findPolymorphicSerializer(deserializer, this, type);
      } catch ($p) {
        var tmp_2;
        if ($p instanceof SerializationException) {
          var it = $p;
          var message = removeSuffix(substringBefore(ensureNotNull(it.message), _Char___init__impl__6a9atx(10)), '.');
          var hint = substringAfter(ensureNotNull(it.message), _Char___init__impl__6a9atx(10), '');
          this.rc0_1.nc3(message, VOID, hint);
        } else {
          throw $p;
        }
        tmp_1 = tmp_2;
      }
      var tmp_3 = tmp_1;
      var actualSerializer = isInterface(tmp_3, DeserializationStrategy) ? tmp_3 : THROW_CCE();
      this.uc0_1 = new DiscriminatorHolder(discriminator);
      return actualSerializer.jb5(this);
    } catch ($p) {
      if ($p instanceof MissingFieldException) {
        var e = $p;
        if (contains_0(ensureNotNull(e.message), 'at path'))
          throw e;
        throw new MissingFieldException(e.yb5_1, plus(e.message, ' at path: ') + this.rc0_1.yc0_1.ac4(), e);
      } else {
        throw $p;
      }
    }
  };
  protoOf(StreamingJsonDecoder).ab8 = function (descriptor) {
    var newMode = switchMode(this.pc0_1, descriptor);
    this.rc0_1.yc0_1.vc3(descriptor);
    this.rc0_1.vc5(newMode.gc6_1);
    checkLeadingComma(this);
    var tmp;
    switch (newMode.t9_1) {
      case 1:
      case 2:
      case 3:
        tmp = new StreamingJsonDecoder(this.pc0_1, newMode, this.rc0_1, descriptor, this.uc0_1);
        break;
      default:
        var tmp_0;
        if (this.qc0_1.equals(newMode) ? this.pc0_1.lc0_1.yc1_1 : false) {
          tmp_0 = this;
        } else {
          tmp_0 = new StreamingJsonDecoder(this.pc0_1, newMode, this.rc0_1, descriptor, this.uc0_1);
        }

        tmp = tmp_0;
        break;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).bb8 = function (descriptor) {
    if (this.pc0_1.lc0_1.uc1_1 ? descriptor.jb6() === 0 : false) {
      skipLeftoverElements(this, descriptor);
    }
    if (this.rc0_1.wc5() ? !this.pc0_1.lc0_1.hc2_1 : false) {
      invalidTrailingComma(this.rc0_1, '');
    }
    this.rc0_1.vc5(this.qc0_1.hc6_1);
    this.rc0_1.yc0_1.zc3();
  };
  protoOf(StreamingJsonDecoder).mb7 = function () {
    var tmp;
    var tmp0_safe_receiver = this.wc0_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.lc3_1;
    if (!(tmp1_elvis_lhs == null ? false : tmp1_elvis_lhs)) {
      tmp = !this.rc0_1.ic6();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).nb7 = function () {
    return null;
  };
  protoOf(StreamingJsonDecoder).mb8 = function (descriptor, index, deserializer, previousValue) {
    var isMapKey = this.qc0_1.equals(WriteMode_MAP_getInstance()) ? (index & 1) === 0 : false;
    if (isMapKey) {
      this.rc0_1.yc0_1.yc3();
    }
    var value = protoOf(AbstractDecoder).mb8.call(this, descriptor, index, deserializer, previousValue);
    if (isMapKey) {
      this.rc0_1.yc0_1.xc3(value);
    }
    return value;
  };
  protoOf(StreamingJsonDecoder).rb8 = function (descriptor) {
    var index;
    switch (this.qc0_1.t9_1) {
      case 0:
        index = decodeObjectIndex(this, descriptor);
        break;
      case 2:
        index = decodeMapIndex(this);
        break;
      default:
        index = decodeListIndex(this);
        break;
    }
    if (!this.qc0_1.equals(WriteMode_MAP_getInstance())) {
      this.rc0_1.yc0_1.wc3(index);
    }
    return index;
  };
  protoOf(StreamingJsonDecoder).ob7 = function () {
    return this.rc0_1.jc6();
  };
  protoOf(StreamingJsonDecoder).pb7 = function () {
    var value = this.rc0_1.yc2();
    if (!value.equals(toLong(value.qb()))) {
      this.rc0_1.nc3("Failed to parse byte for input '" + value.toString() + "'");
    }
    return value.qb();
  };
  protoOf(StreamingJsonDecoder).qb7 = function () {
    var value = this.rc0_1.yc2();
    if (!value.equals(toLong(value.rb()))) {
      this.rc0_1.nc3("Failed to parse short for input '" + value.toString() + "'");
    }
    return value.rb();
  };
  protoOf(StreamingJsonDecoder).rb7 = function () {
    var value = this.rc0_1.yc2();
    if (!value.equals(toLong(value.ea()))) {
      this.rc0_1.nc3("Failed to parse int for input '" + value.toString() + "'");
    }
    return value.ea();
  };
  protoOf(StreamingJsonDecoder).sb7 = function () {
    return this.rc0_1.yc2();
  };
  protoOf(StreamingJsonDecoder).tb7 = function () {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.rc0_1;
      var input = this_0.jc4();
      try {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeFloat.<anonymous>' call
        // Inline function 'kotlin.text.toFloat' call
        // Inline function 'kotlin.js.unsafeCast' call
        // Inline function 'kotlin.js.asDynamic' call
        tmp$ret$4 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.nc3("Failed to parse type '" + 'float' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$4;
    var specialFp = this.pc0_1.lc0_1.dc2_1;
    if (specialFp ? true : isFinite(result))
      return result;
    throwInvalidFloatingPointDecoded(this.rc0_1, result);
  };
  protoOf(StreamingJsonDecoder).ub7 = function () {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.rc0_1;
      var input = this_0.jc4();
      try {
        // Inline function 'kotlinx.serialization.json.internal.StreamingJsonDecoder.decodeDouble.<anonymous>' call
        tmp$ret$1 = toDouble(input);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.nc3("Failed to parse type '" + 'double' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.pc0_1.lc0_1.dc2_1;
    if (specialFp ? true : isFinite_0(result))
      return result;
    throwInvalidFloatingPointDecoded(this.rc0_1, result);
  };
  protoOf(StreamingJsonDecoder).vb7 = function () {
    var string = this.rc0_1.jc4();
    if (!(string.length === 1)) {
      this.rc0_1.nc3("Expected single char, but got '" + string + "'");
    }
    return charSequenceGet(string, 0);
  };
  protoOf(StreamingJsonDecoder).wb7 = function () {
    var tmp;
    if (this.vc0_1.vc1_1) {
      tmp = this.rc0_1.cc6();
    } else {
      tmp = this.rc0_1.ic4();
    }
    return tmp;
  };
  protoOf(StreamingJsonDecoder).xb7 = function (descriptor) {
    return get_isUnsignedNumber(descriptor) ? new JsonDecoderForUnsignedTypes(this.rc0_1, this.pc0_1) : protoOf(AbstractDecoder).xb7.call(this, descriptor);
  };
  function JsonDecoderForUnsignedTypes(lexer, json) {
    AbstractDecoder.call(this);
    this.kc6_1 = lexer;
    this.lc6_1 = json.pb8();
  }
  protoOf(JsonDecoderForUnsignedTypes).pb8 = function () {
    return this.lc6_1;
  };
  protoOf(JsonDecoderForUnsignedTypes).rb8 = function (descriptor) {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(JsonDecoderForUnsignedTypes).rb7 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.kc6_1;
      var input = this_0.jc4();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeInt.<anonymous>' call
        // Inline function 'kotlin.UInt.toInt' call
        var this_1 = toUInt(input);
        tmp$ret$2 = _UInt___get_data__impl__f0vqqw(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.nc3("Failed to parse type '" + 'UInt' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).sb7 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.kc6_1;
      var input = this_0.jc4();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeLong.<anonymous>' call
        // Inline function 'kotlin.ULong.toLong' call
        var this_1 = toULong(input);
        tmp$ret$2 = _ULong___get_data__impl__fggpzb(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.nc3("Failed to parse type '" + 'ULong' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).pb7 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.kc6_1;
      var input = this_0.jc4();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeByte.<anonymous>' call
        // Inline function 'kotlin.UByte.toByte' call
        var this_1 = toUByte(input);
        tmp$ret$2 = _UByte___get_data__impl__jof9qr(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.nc3("Failed to parse type '" + 'UByte' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  protoOf(JsonDecoderForUnsignedTypes).qb7 = function () {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.parseString' call
      var this_0 = this.kc6_1;
      var input = this_0.jc4();
      try {
        // Inline function 'kotlinx.serialization.json.internal.JsonDecoderForUnsignedTypes.decodeShort.<anonymous>' call
        // Inline function 'kotlin.UShort.toShort' call
        var this_1 = toUShort(input);
        tmp$ret$2 = _UShort___get_data__impl__g0245(this_1);
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          this_0.nc3("Failed to parse type '" + 'UShort' + "' for input '" + input + "'");
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$2;
  };
  function get_unsignedNumberDescriptors() {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return unsignedNumberDescriptors;
  }
  var unsignedNumberDescriptors;
  function get_isUnsignedNumber(_this__u8e3s4) {
    _init_properties_StreamingJsonEncoder_kt__pn1bsi();
    return _this__u8e3s4.kb6() ? get_unsignedNumberDescriptors().s(_this__u8e3s4) : false;
  }
  var properties_initialized_StreamingJsonEncoder_kt_6ifwwk;
  function _init_properties_StreamingJsonEncoder_kt__pn1bsi() {
    if (!properties_initialized_StreamingJsonEncoder_kt_6ifwwk) {
      properties_initialized_StreamingJsonEncoder_kt_6ifwwk = true;
      unsignedNumberDescriptors = setOf([serializer_0(Companion_getInstance()).ib5(), serializer_1(Companion_getInstance_0()).ib5(), serializer_2(Companion_getInstance_1()).ib5(), serializer_3(Companion_getInstance_2()).ib5()]);
    }
  }
  function get_ESCAPE_STRINGS() {
    _init_properties_StringOps_kt__fcy1db();
    return ESCAPE_STRINGS;
  }
  var ESCAPE_STRINGS;
  var ESCAPE_MARKERS;
  function toHexChar(i) {
    _init_properties_StringOps_kt__fcy1db();
    var d = i & 15;
    var tmp;
    if (d < 10) {
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      var tmp$ret$0 = Char__toInt_impl_vasixd(this_0);
      tmp = numberToChar(d + tmp$ret$0 | 0);
    } else {
      var tmp_0 = d - 10 | 0;
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      var tmp$ret$1 = Char__toInt_impl_vasixd(this_1);
      tmp = numberToChar(tmp_0 + tmp$ret$1 | 0);
    }
    return tmp;
  }
  function printQuoted(_this__u8e3s4, value) {
    _init_properties_StringOps_kt__fcy1db();
    _this__u8e3s4.z5(get_STRING());
    var lastPos = 0;
    var inductionVariable = 0;
    var last = charSequenceLength(value) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.code' call
        var this_0 = charSequenceGet(value, i);
        var c = Char__toInt_impl_vasixd(this_0);
        if (c < get_ESCAPE_STRINGS().length ? !(get_ESCAPE_STRINGS()[c] == null) : false) {
          _this__u8e3s4.p8(value, lastPos, i);
          _this__u8e3s4.y5(get_ESCAPE_STRINGS()[c]);
          lastPos = i + 1 | 0;
        }
      }
       while (inductionVariable <= last);
    if (!(lastPos === 0)) {
      _this__u8e3s4.p8(value, lastPos, value.length);
    } else {
      _this__u8e3s4.y5(value);
    }
    _this__u8e3s4.z5(get_STRING());
  }
  function toBooleanStrictOrNull(_this__u8e3s4) {
    _init_properties_StringOps_kt__fcy1db();
    return equals_0(_this__u8e3s4, 'true', true) ? true : equals_0(_this__u8e3s4, 'false', true) ? false : null;
  }
  var properties_initialized_StringOps_kt_wzaea7;
  function _init_properties_StringOps_kt__fcy1db() {
    if (!properties_initialized_StringOps_kt_wzaea7) {
      properties_initialized_StringOps_kt_wzaea7 = true;
      // Inline function 'kotlin.apply' call
      // Inline function 'kotlin.arrayOfNulls' call
      var this_0 = fillArrayVal(Array(93), null);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.internal.ESCAPE_STRINGS.<anonymous>' call
      var inductionVariable = 0;
      if (inductionVariable <= 31)
        do {
          var c = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var c1 = toHexChar(c >> 12);
          var c2 = toHexChar(c >> 8);
          var c3 = toHexChar(c >> 4);
          var c4 = toHexChar(c);
          this_0[c] = '\\u' + toString_0(c1) + toString_0(c2) + toString_0(c3) + toString_0(c4);
        }
         while (inductionVariable <= 31);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(34);
      this_0[Char__toInt_impl_vasixd(this_1)] = '\\"';
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(92);
      this_0[Char__toInt_impl_vasixd(this_2)] = '\\\\';
      // Inline function 'kotlin.code' call
      var this_3 = _Char___init__impl__6a9atx(9);
      this_0[Char__toInt_impl_vasixd(this_3)] = '\\t';
      // Inline function 'kotlin.code' call
      var this_4 = _Char___init__impl__6a9atx(8);
      this_0[Char__toInt_impl_vasixd(this_4)] = '\\b';
      // Inline function 'kotlin.code' call
      var this_5 = _Char___init__impl__6a9atx(10);
      this_0[Char__toInt_impl_vasixd(this_5)] = '\\n';
      // Inline function 'kotlin.code' call
      var this_6 = _Char___init__impl__6a9atx(13);
      this_0[Char__toInt_impl_vasixd(this_6)] = '\\r';
      this_0[12] = '\\f';
      ESCAPE_STRINGS = this_0;
      // Inline function 'kotlin.apply' call
      var this_7 = new Int8Array(93);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.internal.ESCAPE_MARKERS.<anonymous>' call
      var inductionVariable_0 = 0;
      if (inductionVariable_0 <= 31)
        do {
          var c_0 = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0 + 1 | 0;
          this_7[c_0] = 1;
        }
         while (inductionVariable_0 <= 31);
      // Inline function 'kotlin.code' call
      var this_8 = _Char___init__impl__6a9atx(34);
      this_7[Char__toInt_impl_vasixd(this_8)] = 34;
      // Inline function 'kotlin.code' call
      var this_9 = _Char___init__impl__6a9atx(92);
      this_7[Char__toInt_impl_vasixd(this_9)] = 92;
      // Inline function 'kotlin.code' call
      var this_10 = _Char___init__impl__6a9atx(9);
      this_7[Char__toInt_impl_vasixd(this_10)] = 116;
      // Inline function 'kotlin.code' call
      var this_11 = _Char___init__impl__6a9atx(8);
      this_7[Char__toInt_impl_vasixd(this_11)] = 98;
      // Inline function 'kotlin.code' call
      var this_12 = _Char___init__impl__6a9atx(10);
      this_7[Char__toInt_impl_vasixd(this_12)] = 110;
      // Inline function 'kotlin.code' call
      var this_13 = _Char___init__impl__6a9atx(13);
      this_7[Char__toInt_impl_vasixd(this_13)] = 114;
      this_7[12] = 102;
      ESCAPE_MARKERS = this_7;
    }
  }
  function unparsedPrimitive($this, primitive) {
    throw JsonDecodingException_0(-1, "Failed to parse literal as '" + primitive + "' value", toString($this.rc6()));
  }
  function asLiteral(_this__u8e3s4, $this, type) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof JsonLiteral ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw JsonDecodingException_1(-1, "Unexpected 'null' literal when non-nullable " + type + ' was expected');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function AbstractJsonTreeDecoder(json, value) {
    NamedValueDecoder.call(this);
    this.oc6_1 = json;
    this.pc6_1 = value;
    this.qc6_1 = this.jc2().lc0_1;
  }
  protoOf(AbstractJsonTreeDecoder).jc2 = function () {
    return this.oc6_1;
  };
  protoOf(AbstractJsonTreeDecoder).s2 = function () {
    return this.pc6_1;
  };
  protoOf(AbstractJsonTreeDecoder).pb8 = function () {
    return this.jc2().pb8();
  };
  protoOf(AbstractJsonTreeDecoder).rc6 = function () {
    var tmp0_safe_receiver = this.ebi();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.currentObject.<anonymous>' call
      tmp = this.sc6(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp;
    return tmp1_elvis_lhs == null ? this.s2() : tmp1_elvis_lhs;
  };
  protoOf(AbstractJsonTreeDecoder).kc2 = function () {
    return this.rc6();
  };
  protoOf(AbstractJsonTreeDecoder).zb7 = function (deserializer) {
    return decodeSerializableValuePolymorphic(this, deserializer);
  };
  protoOf(AbstractJsonTreeDecoder).fbi = function (parentName, childName) {
    return childName;
  };
  protoOf(AbstractJsonTreeDecoder).ab8 = function (descriptor) {
    var currentObject = this.rc6();
    var tmp0_subject = descriptor.lb6();
    var tmp;
    var tmp_0;
    if (equals(tmp0_subject, LIST_getInstance())) {
      tmp_0 = true;
    } else {
      tmp_0 = tmp0_subject instanceof PolymorphicKind;
    }
    if (tmp_0) {
      var tmp_1 = this.jc2();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      if (!(currentObject instanceof JsonArray)) {
        throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonArray) + ' as the serialized body of ' + descriptor.hb6() + ', but had ' + getKClassFromExpression(currentObject));
      }
      tmp = new JsonTreeListDecoder(tmp_1, currentObject);
    } else {
      if (equals(tmp0_subject, MAP_getInstance())) {
        // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
        var this_0 = this.jc2();
        var keyDescriptor = carrierDescriptor(descriptor.nb6(0), this_0.pb8());
        var keyKind = keyDescriptor.lb6();
        var tmp_2;
        var tmp_3;
        if (keyKind instanceof PrimitiveKind) {
          tmp_3 = true;
        } else {
          tmp_3 = equals(keyKind, ENUM_getInstance());
        }
        if (tmp_3) {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.beginStructure.<anonymous>' call
          var tmp_4 = this.jc2();
          // Inline function 'kotlinx.serialization.json.internal.cast' call
          if (!(currentObject instanceof JsonObject)) {
            throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor.hb6() + ', but had ' + getKClassFromExpression(currentObject));
          }
          tmp_2 = new JsonTreeMapDecoder(tmp_4, currentObject);
        } else {
          if (this_0.lc0_1.wc1_1) {
            // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.beginStructure.<anonymous>' call
            var tmp_5 = this.jc2();
            // Inline function 'kotlinx.serialization.json.internal.cast' call
            if (!(currentObject instanceof JsonArray)) {
              throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonArray) + ' as the serialized body of ' + descriptor.hb6() + ', but had ' + getKClassFromExpression(currentObject));
            }
            tmp_2 = new JsonTreeListDecoder(tmp_5, currentObject);
          } else {
            throw InvalidKeyKindException(keyDescriptor);
          }
        }
        tmp = tmp_2;
      } else {
        var tmp_6 = this.jc2();
        // Inline function 'kotlinx.serialization.json.internal.cast' call
        if (!(currentObject instanceof JsonObject)) {
          throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor.hb6() + ', but had ' + getKClassFromExpression(currentObject));
        }
        tmp = new JsonTreeDecoder(tmp_6, currentObject);
      }
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).bb8 = function (descriptor) {
  };
  protoOf(AbstractJsonTreeDecoder).mb7 = function () {
    var tmp = this.rc6();
    return !(tmp instanceof JsonNull);
  };
  protoOf(AbstractJsonTreeDecoder).tc6 = function (tag) {
    var currentElement = this.sc6(tag);
    var tmp0_elvis_lhs = currentElement instanceof JsonPrimitive ? currentElement : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw JsonDecodingException_0(-1, 'Expected JsonPrimitive at ' + tag + ', found ' + currentElement, toString(this.rc6()));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(AbstractJsonTreeDecoder).uc6 = function (tag) {
    return !(this.sc6(tag) === JsonNull_getInstance());
  };
  protoOf(AbstractJsonTreeDecoder).hbi = function (tag) {
    return this.uc6((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).vc6 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        var tmp0_elvis_lhs = get_booleanOrNull(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'boolean');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'boolean');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).ibi = function (tag) {
    return this.vc6((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).wc6 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedByte.<anonymous>' call
        var result = get_int(this_0);
        var tmp;
        var containsLower = ByteCompanionObject_instance.MIN_VALUE;
        if (result <= ByteCompanionObject_instance.MAX_VALUE ? containsLower <= result : false) {
          tmp = toByte(result);
        } else {
          tmp = null;
        }
        var tmp0_elvis_lhs = tmp;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'byte');
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'byte');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).jbi = function (tag) {
    return this.wc6((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).xc6 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedShort.<anonymous>' call
        var result = get_int(this_0);
        var tmp;
        var containsLower = ShortCompanionObject_instance.MIN_VALUE;
        if (result <= ShortCompanionObject_instance.MAX_VALUE ? containsLower <= result : false) {
          tmp = toShort(result);
        } else {
          tmp = null;
        }
        var tmp0_elvis_lhs = tmp;
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'short');
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp_0;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'short');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).kbi = function (tag) {
    return this.xc6((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).yc6 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedInt.<anonymous>' call
        var tmp0_elvis_lhs = get_int(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'int');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'int');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).lbi = function (tag) {
    return this.yc6((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).zc6 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedLong.<anonymous>' call
        var tmp0_elvis_lhs = get_long(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'long');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'long');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).mbi = function (tag) {
    return this.zc6((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).ac7 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedFloat.<anonymous>' call
        var tmp0_elvis_lhs = get_float(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'float');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'float');
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.jc2().lc0_1.dc2_1;
    if (specialFp ? true : isFinite(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.rc6()));
  };
  protoOf(AbstractJsonTreeDecoder).nbi = function (tag) {
    return this.ac7((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).bc7 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedDouble.<anonymous>' call
        var tmp0_elvis_lhs = get_double(this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          unparsedPrimitive(this, 'double');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'double');
        } else {
          throw $p;
        }
      }
    }
    var result = tmp$ret$1;
    var specialFp = this.jc2().lc0_1.dc2_1;
    if (specialFp ? true : isFinite_0(result))
      return result;
    throw InvalidFloatingPointDecoded(result, tag, toString(this.rc6()));
  };
  protoOf(AbstractJsonTreeDecoder).obi = function (tag) {
    return this.bc7((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).cc7 = function (tag) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.primitive' call
      var this_0 = this.tc6(tag);
      try {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonTreeDecoder.decodeTaggedChar.<anonymous>' call
        var tmp0_elvis_lhs = single(this_0.yac());
        var tmp;
        var tmp_0 = tmp0_elvis_lhs;
        if ((tmp_0 == null ? null : new Char(tmp_0)) == null) {
          unparsedPrimitive(this, 'char');
        } else {
          tmp = tmp0_elvis_lhs;
        }
        tmp$ret$1 = tmp;
        break $l$block;
      } catch ($p) {
        if ($p instanceof IllegalArgumentException) {
          var e = $p;
          unparsedPrimitive(this, 'char');
        } else {
          throw $p;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(AbstractJsonTreeDecoder).pbi = function (tag) {
    return this.cc7((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).dc7 = function (tag) {
    var value = this.tc6(tag);
    if (!this.jc2().lc0_1.vc1_1) {
      var literal = asLiteral(value, this, 'string');
      if (!literal.rc2_1)
        throw JsonDecodingException_0(-1, "String literal for key '" + tag + "' should be quoted.\n" + get_lenientHint(), toString(this.rc6()));
    }
    if (value instanceof JsonNull)
      throw JsonDecodingException_0(-1, "Unexpected 'null' value instead of string literal", toString(this.rc6()));
    return value.yac();
  };
  protoOf(AbstractJsonTreeDecoder).qbi = function (tag) {
    return this.dc7((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE());
  };
  protoOf(AbstractJsonTreeDecoder).ec7 = function (tag, inlineDescriptor) {
    return get_isUnsignedNumber(inlineDescriptor) ? new JsonDecoderForUnsignedTypes(new StringJsonLexer(this.tc6(tag).yac()), this.jc2()) : protoOf(NamedValueDecoder).rbi.call(this, tag, inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).rbi = function (tag, inlineDescriptor) {
    return this.ec7((!(tag == null) ? typeof tag === 'string' : false) ? tag : THROW_CCE(), inlineDescriptor);
  };
  protoOf(AbstractJsonTreeDecoder).xb7 = function (descriptor) {
    return !(this.ebi() == null) ? protoOf(NamedValueDecoder).xb7.call(this, descriptor) : (new JsonPrimitiveDecoder(this.jc2(), this.s2())).xb7(descriptor);
  };
  function coerceInputValue_0($this, descriptor, index, tag) {
    var tmp$ret$0;
    $l$block_3: {
      // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue' call
      var this_0 = $this.jc2();
      if (!descriptor.qb6(index)) {
        tmp$ret$0 = false;
        break $l$block_3;
      }
      var elementDescriptor = descriptor.nb6(index);
      var tmp;
      if (!elementDescriptor.db6()) {
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
        var tmp_0 = $this.sc6(tag);
        tmp = tmp_0 instanceof JsonNull;
      } else {
        tmp = false;
      }
      if (tmp) {
        tmp$ret$0 = true;
        break $l$block_3;
      }
      if (equals(elementDescriptor.lb6(), ENUM_getInstance())) {
        var tmp_1;
        if (elementDescriptor.db6()) {
          // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
          var tmp_2 = $this.sc6(tag);
          tmp_1 = tmp_2 instanceof JsonNull;
        } else {
          tmp_1 = false;
        }
        if (tmp_1) {
          tmp$ret$0 = false;
          break $l$block_3;
        }
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.coerceInputValue.<anonymous>' call
        var tmp_3 = $this.sc6(tag);
        var tmp0_safe_receiver = tmp_3 instanceof JsonPrimitive ? tmp_3 : null;
        var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : get_contentOrNull(tmp0_safe_receiver);
        var tmp_4;
        if (tmp0_elvis_lhs == null) {
          tmp$ret$0 = false;
          break $l$block_3;
        } else {
          tmp_4 = tmp0_elvis_lhs;
        }
        var enumValue = tmp_4;
        var enumIndex = getJsonNameIndex(elementDescriptor, this_0, enumValue);
        if (enumIndex === -3) {
          // Inline function 'kotlinx.serialization.json.internal.tryCoerceValue.<anonymous>' call
          tmp$ret$0 = true;
          break $l$block_3;
        }
      }
      tmp$ret$0 = false;
    }
    return tmp$ret$0;
  }
  function absenceIsNull($this, descriptor, index) {
    $this.oc7_1 = (!$this.jc2().lc0_1.yc1_1 ? !descriptor.qb6(index) : false) ? descriptor.nb6(index).db6() : false;
    return $this.oc7_1;
  }
  function JsonTreeDecoder(json, value, polyDiscriminator, polyDescriptor) {
    polyDiscriminator = polyDiscriminator === VOID ? null : polyDiscriminator;
    polyDescriptor = polyDescriptor === VOID ? null : polyDescriptor;
    AbstractJsonTreeDecoder.call(this, json, value);
    this.kc7_1 = value;
    this.lc7_1 = polyDiscriminator;
    this.mc7_1 = polyDescriptor;
    this.nc7_1 = 0;
    this.oc7_1 = false;
  }
  protoOf(JsonTreeDecoder).s2 = function () {
    return this.kc7_1;
  };
  protoOf(JsonTreeDecoder).rb8 = function (descriptor) {
    while (this.nc7_1 < descriptor.jb6()) {
      var tmp1 = this.nc7_1;
      this.nc7_1 = tmp1 + 1 | 0;
      var name = this.zbh(descriptor, tmp1);
      var index = this.nc7_1 - 1 | 0;
      this.oc7_1 = false;
      var tmp;
      var tmp_0;
      // Inline function 'kotlin.collections.contains' call
      // Inline function 'kotlin.collections.containsKey' call
      var this_0 = this.s2();
      if ((isInterface(this_0, Map) ? this_0 : THROW_CCE()).w2(name)) {
        tmp_0 = true;
      } else {
        tmp_0 = absenceIsNull(this, descriptor, index);
      }
      if (tmp_0) {
        tmp = !this.qc6_1.ac2_1 ? true : !coerceInputValue_0(this, descriptor, index, name);
      } else {
        tmp = false;
      }
      if (tmp) {
        return index;
      }
    }
    return -1;
  };
  protoOf(JsonTreeDecoder).mb7 = function () {
    return !this.oc7_1 ? protoOf(AbstractJsonTreeDecoder).mb7.call(this) : false;
  };
  protoOf(JsonTreeDecoder).abi = function (descriptor, index) {
    var strategy = namingStrategy(descriptor, this.jc2());
    var baseName = descriptor.pb6(index);
    if (strategy == null) {
      if (!this.qc6_1.ec2_1)
        return baseName;
      if (this.s2().m2().s(baseName))
        return baseName;
    }
    var deserializationNamesMap_0 = deserializationNamesMap(this.jc2(), descriptor);
    // Inline function 'kotlin.collections.find' call
    var this_0 = this.s2().m2();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = this_0.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        // Inline function 'kotlinx.serialization.json.internal.JsonTreeDecoder.elementName.<anonymous>' call
        if (deserializationNamesMap_0.z2(element) === index) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp0_safe_receiver = tmp$ret$1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return tmp0_safe_receiver;
    }
    var fallbackName = strategy == null ? null : strategy.rc3(descriptor, index, baseName);
    return fallbackName == null ? baseName : fallbackName;
  };
  protoOf(JsonTreeDecoder).sc6 = function (tag) {
    return getValue(this.s2(), tag);
  };
  protoOf(JsonTreeDecoder).ab8 = function (descriptor) {
    if (descriptor === this.mc7_1) {
      var tmp = this.jc2();
      // Inline function 'kotlinx.serialization.json.internal.cast' call
      var value = this.rc6();
      var descriptor_0 = this.mc7_1;
      if (!(value instanceof JsonObject)) {
        throw JsonDecodingException_1(-1, 'Expected ' + getKClass(JsonObject) + ' as the serialized body of ' + descriptor_0.hb6() + ', but had ' + getKClassFromExpression(value));
      }
      return new JsonTreeDecoder(tmp, value, this.lc7_1, this.mc7_1);
    }
    return protoOf(AbstractJsonTreeDecoder).ab8.call(this, descriptor);
  };
  protoOf(JsonTreeDecoder).bb8 = function (descriptor) {
    var tmp;
    if (this.qc6_1.uc1_1) {
      tmp = true;
    } else {
      var tmp_0 = descriptor.lb6();
      tmp = tmp_0 instanceof PolymorphicKind;
    }
    if (tmp)
      return Unit_instance;
    var strategy = namingStrategy(descriptor, this.jc2());
    var tmp_1;
    if (strategy == null ? !this.qc6_1.ec2_1 : false) {
      tmp_1 = jsonCachedSerialNames(descriptor);
    } else if (!(strategy == null)) {
      tmp_1 = deserializationNamesMap(this.jc2(), descriptor).m2();
    } else {
      var tmp_2 = jsonCachedSerialNames(descriptor);
      // Inline function 'kotlin.collections.orEmpty' call
      var tmp0_safe_receiver = get_schemaCache(this.jc2()).tc5(descriptor, get_JsonDeserializationNamesKey());
      var tmp0_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.m2();
      var tmp$ret$0 = tmp0_elvis_lhs == null ? emptySet() : tmp0_elvis_lhs;
      tmp_1 = plus_0(tmp_2, tmp$ret$0);
    }
    var names = tmp_1;
    var tmp1_iterator = this.s2().m2().o();
    while (tmp1_iterator.d1()) {
      var key = tmp1_iterator.f1();
      if (!names.s(key) ? !(key === this.lc7_1) : false) {
        throw UnknownKeyException(key, this.s2().toString());
      }
    }
  };
  function JsonTreeListDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.uc7_1 = value;
    this.vc7_1 = this.uc7_1.m();
    this.wc7_1 = -1;
  }
  protoOf(JsonTreeListDecoder).s2 = function () {
    return this.uc7_1;
  };
  protoOf(JsonTreeListDecoder).abi = function (descriptor, index) {
    return index.toString();
  };
  protoOf(JsonTreeListDecoder).sc6 = function (tag) {
    return this.uc7_1.n(toInt(tag));
  };
  protoOf(JsonTreeListDecoder).rb8 = function (descriptor) {
    while (this.wc7_1 < (this.vc7_1 - 1 | 0)) {
      this.wc7_1 = this.wc7_1 + 1 | 0;
      return this.wc7_1;
    }
    return -1;
  };
  function JsonPrimitiveDecoder(json, value) {
    AbstractJsonTreeDecoder.call(this, json, value);
    this.cc8_1 = value;
    this.sbi(get_PRIMITIVE_TAG());
  }
  protoOf(JsonPrimitiveDecoder).s2 = function () {
    return this.cc8_1;
  };
  protoOf(JsonPrimitiveDecoder).rb8 = function (descriptor) {
    return 0;
  };
  protoOf(JsonPrimitiveDecoder).sc6 = function (tag) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(tag === get_PRIMITIVE_TAG())) {
      // Inline function 'kotlinx.serialization.json.internal.JsonPrimitiveDecoder.currentElement.<anonymous>' call
      var message = "This input can only handle primitives with '" + get_PRIMITIVE_TAG() + "' tag";
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.cc8_1;
  };
  function JsonTreeMapDecoder(json, value) {
    JsonTreeDecoder.call(this, json, value);
    this.nc8_1 = value;
    this.oc8_1 = toList(this.nc8_1.m2());
    this.pc8_1 = imul(this.oc8_1.m(), 2);
    this.qc8_1 = -1;
  }
  protoOf(JsonTreeMapDecoder).s2 = function () {
    return this.nc8_1;
  };
  protoOf(JsonTreeMapDecoder).abi = function (descriptor, index) {
    var i = index / 2 | 0;
    return this.oc8_1.n(i);
  };
  protoOf(JsonTreeMapDecoder).rb8 = function (descriptor) {
    while (this.qc8_1 < (this.pc8_1 - 1 | 0)) {
      this.qc8_1 = this.qc8_1 + 1 | 0;
      return this.qc8_1;
    }
    return -1;
  };
  protoOf(JsonTreeMapDecoder).sc6 = function (tag) {
    return (this.qc8_1 % 2 | 0) === 0 ? JsonPrimitive_0(tag) : getValue(this.nc8_1, tag);
  };
  protoOf(JsonTreeMapDecoder).bb8 = function (descriptor) {
  };
  function readPolymorphicJson(_this__u8e3s4, discriminator, element, deserializer) {
    return (new JsonTreeDecoder(_this__u8e3s4, element, discriminator, deserializer.ib5())).zb7(deserializer);
  }
  function get_PRIMITIVE_TAG() {
    return PRIMITIVE_TAG;
  }
  var PRIMITIVE_TAG;
  var WriteMode_OBJ_instance;
  var WriteMode_LIST_instance;
  var WriteMode_MAP_instance;
  var WriteMode_POLY_OBJ_instance;
  var WriteMode_entriesInitialized;
  function WriteMode_initEntries() {
    if (WriteMode_entriesInitialized)
      return Unit_instance;
    WriteMode_entriesInitialized = true;
    WriteMode_OBJ_instance = new WriteMode('OBJ', 0, get_BEGIN_OBJ(), get_END_OBJ());
    WriteMode_LIST_instance = new WriteMode('LIST', 1, get_BEGIN_LIST(), get_END_LIST());
    WriteMode_MAP_instance = new WriteMode('MAP', 2, get_BEGIN_OBJ(), get_END_OBJ());
    WriteMode_POLY_OBJ_instance = new WriteMode('POLY_OBJ', 3, get_BEGIN_LIST(), get_END_LIST());
  }
  function WriteMode(name, ordinal, begin, end) {
    Enum.call(this, name, ordinal);
    this.gc6_1 = begin;
    this.hc6_1 = end;
  }
  function switchMode(_this__u8e3s4, desc) {
    var tmp0_subject = desc.lb6();
    var tmp;
    if (tmp0_subject instanceof PolymorphicKind) {
      tmp = WriteMode_POLY_OBJ_getInstance();
    } else {
      if (equals(tmp0_subject, LIST_getInstance())) {
        tmp = WriteMode_LIST_getInstance();
      } else {
        if (equals(tmp0_subject, MAP_getInstance())) {
          // Inline function 'kotlinx.serialization.json.internal.selectMapMode' call
          var keyDescriptor = carrierDescriptor(desc.nb6(0), _this__u8e3s4.pb8());
          var keyKind = keyDescriptor.lb6();
          var tmp_0;
          var tmp_1;
          if (keyKind instanceof PrimitiveKind) {
            tmp_1 = true;
          } else {
            tmp_1 = equals(keyKind, ENUM_getInstance());
          }
          if (tmp_1) {
            // Inline function 'kotlinx.serialization.json.internal.switchMode.<anonymous>' call
            tmp_0 = WriteMode_MAP_getInstance();
          } else {
            if (_this__u8e3s4.lc0_1.wc1_1) {
              // Inline function 'kotlinx.serialization.json.internal.switchMode.<anonymous>' call
              tmp_0 = WriteMode_LIST_getInstance();
            } else {
              throw InvalidKeyKindException(keyDescriptor);
            }
          }
          tmp = tmp_0;
        } else {
          tmp = WriteMode_OBJ_getInstance();
        }
      }
    }
    return tmp;
  }
  function carrierDescriptor(_this__u8e3s4, module_0) {
    var tmp;
    if (equals(_this__u8e3s4.lb6(), CONTEXTUAL_getInstance())) {
      var tmp0_safe_receiver = getContextualDescriptor(module_0, _this__u8e3s4);
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : carrierDescriptor(tmp0_safe_receiver, module_0);
      tmp = tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
    } else if (_this__u8e3s4.kb6()) {
      tmp = carrierDescriptor(_this__u8e3s4.nb6(0), module_0);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function WriteMode_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_OBJ_instance;
  }
  function WriteMode_LIST_getInstance() {
    WriteMode_initEntries();
    return WriteMode_LIST_instance;
  }
  function WriteMode_MAP_getInstance() {
    WriteMode_initEntries();
    return WriteMode_MAP_instance;
  }
  function WriteMode_POLY_OBJ_getInstance() {
    WriteMode_initEntries();
    return WriteMode_POLY_OBJ_instance;
  }
  function appendEscape($this, lastPosition, current) {
    $this.rc8(lastPosition, current);
    return appendEsc($this, current + 1 | 0);
  }
  function decodedString($this, lastPosition, currentPosition) {
    $this.rc8(lastPosition, currentPosition);
    var result = $this.ac1_1.toString();
    $this.ac1_1.u8(0);
    return result;
  }
  function takePeeked($this) {
    // Inline function 'kotlin.also' call
    var this_0 = ensureNotNull($this.zc0_1);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.takePeeked.<anonymous>' call
    $this.zc0_1 = null;
    return this_0;
  }
  function wasUnquotedString($this) {
    return !(charSequenceGet($this.sc8(), $this.xc0_1 - 1 | 0) === _Char___init__impl__6a9atx(34));
  }
  function appendEsc($this, startPosition) {
    var currentPosition = startPosition;
    currentPosition = $this.tc8(currentPosition);
    if (currentPosition === -1) {
      $this.nc3('Expected escape sequence to continue, got EOF');
    }
    var tmp = $this.sc8();
    var tmp0 = currentPosition;
    currentPosition = tmp0 + 1 | 0;
    var currentChar = charSequenceGet(tmp, tmp0);
    if (currentChar === _Char___init__impl__6a9atx(117)) {
      return appendHex($this, $this.sc8(), currentPosition);
    }
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(currentChar);
    var c = escapeToChar(tmp$ret$0);
    if (c === _Char___init__impl__6a9atx(0)) {
      $this.nc3("Invalid escaped char '" + toString_0(currentChar) + "'");
    }
    $this.ac1_1.z5(c);
    return currentPosition;
  }
  function appendHex($this, source, startPos) {
    if ((startPos + 4 | 0) >= charSequenceLength(source)) {
      $this.xc0_1 = startPos;
      $this.uc8();
      if (($this.xc0_1 + 4 | 0) >= charSequenceLength(source)) {
        $this.nc3('Unexpected EOF during unicode escape');
      }
      return appendHex($this, source, $this.xc0_1);
    }
    $this.ac1_1.z5(numberToChar((((fromHexChar($this, source, startPos) << 12) + (fromHexChar($this, source, startPos + 1 | 0) << 8) | 0) + (fromHexChar($this, source, startPos + 2 | 0) << 4) | 0) + fromHexChar($this, source, startPos + 3 | 0) | 0));
    return startPos + 4 | 0;
  }
  function fromHexChar($this, source, currentPosition) {
    var character = charSequenceGet(source, currentPosition);
    var tmp;
    if (_Char___init__impl__6a9atx(48) <= character ? character <= _Char___init__impl__6a9atx(57) : false) {
      // Inline function 'kotlin.code' call
      var tmp_0 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_0 = _Char___init__impl__6a9atx(48);
      tmp = tmp_0 - Char__toInt_impl_vasixd(this_0) | 0;
    } else if (_Char___init__impl__6a9atx(97) <= character ? character <= _Char___init__impl__6a9atx(102) : false) {
      // Inline function 'kotlin.code' call
      var tmp_1 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_1 = _Char___init__impl__6a9atx(97);
      tmp = (tmp_1 - Char__toInt_impl_vasixd(this_1) | 0) + 10 | 0;
    } else if (_Char___init__impl__6a9atx(65) <= character ? character <= _Char___init__impl__6a9atx(70) : false) {
      // Inline function 'kotlin.code' call
      var tmp_2 = Char__toInt_impl_vasixd(character);
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(65);
      tmp = (tmp_2 - Char__toInt_impl_vasixd(this_2) | 0) + 10 | 0;
    } else {
      $this.nc3("Invalid toHexChar char '" + toString_0(character) + "' in unicode escape");
    }
    return tmp;
  }
  function consumeBoolean($this, start) {
    var current = $this.tc8(start);
    if (current >= charSequenceLength($this.sc8()) ? true : current === -1) {
      $this.nc3('EOF');
    }
    // Inline function 'kotlin.code' call
    var tmp = $this.sc8();
    var tmp0 = current;
    current = tmp0 + 1 | 0;
    var this_0 = charSequenceGet(tmp, tmp0);
    var tmp1_subject = Char__toInt_impl_vasixd(this_0) | 32;
    var tmp_0;
    // Inline function 'kotlin.code' call
    var this_1 = _Char___init__impl__6a9atx(116);
    if (tmp1_subject === Char__toInt_impl_vasixd(this_1)) {
      consumeBooleanLiteral($this, 'rue', current);
      tmp_0 = true;
    } else {
      // Inline function 'kotlin.code' call
      var this_2 = _Char___init__impl__6a9atx(102);
      if (tmp1_subject === Char__toInt_impl_vasixd(this_2)) {
        consumeBooleanLiteral($this, 'alse', current);
        tmp_0 = false;
      } else {
        $this.nc3("Expected valid boolean literal prefix, but had '" + $this.jc4() + "'");
      }
    }
    return tmp_0;
  }
  function consumeBooleanLiteral($this, literalSuffix, current) {
    if ((charSequenceLength($this.sc8()) - current | 0) < literalSuffix.length) {
      $this.nc3('Unexpected end of boolean literal');
    }
    var inductionVariable = 0;
    var last = charSequenceLength(literalSuffix) - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var expected = charSequenceGet(literalSuffix, i);
        var actual = charSequenceGet($this.sc8(), current + i | 0);
        // Inline function 'kotlin.code' call
        var tmp = Char__toInt_impl_vasixd(expected);
        // Inline function 'kotlin.code' call
        if (!(tmp === (Char__toInt_impl_vasixd(actual) | 32))) {
          $this.nc3("Expected valid boolean literal prefix, but had '" + $this.jc4() + "'");
        }
      }
       while (inductionVariable <= last);
    $this.xc0_1 = current + literalSuffix.length | 0;
  }
  function consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive) {
    var tmp;
    switch (isExponentPositive) {
      case false:
        // Inline function 'kotlin.math.pow' call

        var x = -exponentAccumulator.a7();
        tmp = Math.pow(10.0, x);
        break;
      case true:
        // Inline function 'kotlin.math.pow' call

        var x_0 = exponentAccumulator.a7();
        tmp = Math.pow(10.0, x_0);
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  }
  function AbstractJsonLexer() {
    this.xc0_1 = 0;
    this.yc0_1 = new JsonPath();
    this.zc0_1 = null;
    this.ac1_1 = StringBuilder_init_$Create$();
  }
  protoOf(AbstractJsonLexer).uc8 = function () {
  };
  protoOf(AbstractJsonLexer).vc8 = function (c) {
    return (((c === _Char___init__impl__6a9atx(125) ? true : c === _Char___init__impl__6a9atx(93)) ? true : c === _Char___init__impl__6a9atx(58)) ? true : c === _Char___init__impl__6a9atx(44)) ? false : true;
  };
  protoOf(AbstractJsonLexer).bc1 = function () {
    var nextToken = this.lc4();
    if (!(nextToken === 10)) {
      this.nc3('Expected EOF after parsing, but had ' + toString_0(charSequenceGet(this.sc8(), this.xc0_1 - 1 | 0)) + ' instead');
    }
  };
  protoOf(AbstractJsonLexer).fc4 = function (expected) {
    var token = this.lc4();
    if (!(token === expected)) {
      this.wc8(expected);
    }
    return token;
  };
  protoOf(AbstractJsonLexer).vc5 = function (expected) {
    this.uc8();
    var source = this.sc8();
    var cpos = this.xc0_1;
    $l$loop_0: while (true) {
      cpos = this.tc8(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var tmp0 = cpos;
      cpos = tmp0 + 1 | 0;
      var c = charSequenceGet(source, tmp0);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9))
        continue $l$loop_0;
      this.xc0_1 = cpos;
      if (c === expected)
        return Unit_instance;
      this.xc8(expected);
    }
    this.xc0_1 = cpos;
    this.xc8(expected);
  };
  protoOf(AbstractJsonLexer).xc8 = function (expected) {
    if (this.xc0_1 > 0 ? expected === _Char___init__impl__6a9atx(34) : false) {
      var tmp$ret$1;
      $l$block: {
        // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.withPositionRollback' call
        var snapshot = this.xc0_1;
        try {
          // Inline function 'kotlinx.serialization.json.internal.AbstractJsonLexer.unexpectedToken.<anonymous>' call
          this.xc0_1 = this.xc0_1 - 1 | 0;
          tmp$ret$1 = this.jc4();
          break $l$block;
        }finally {
          this.xc0_1 = snapshot;
        }
      }
      var inputLiteral = tmp$ret$1;
      if (inputLiteral === 'null') {
        this.mc3("Expected string literal but 'null' literal was found", this.xc0_1 - 1 | 0, "Use 'coerceInputValues = true' in 'Json {}' builder to coerce nulls if property has a default value.");
      }
    }
    this.wc8(charToTokenClass(expected));
  };
  protoOf(AbstractJsonLexer).yc8 = function (expectedToken, wasConsumed) {
    var expected = tokenDescription(expectedToken);
    var position = wasConsumed ? this.xc0_1 - 1 | 0 : this.xc0_1;
    var s = (this.xc0_1 === charSequenceLength(this.sc8()) ? true : position < 0) ? 'EOF' : toString_0(charSequenceGet(this.sc8(), position));
    this.nc3('Expected ' + expected + ", but had '" + s + "' instead", position);
  };
  protoOf(AbstractJsonLexer).wc8 = function (expectedToken, wasConsumed, $super) {
    wasConsumed = wasConsumed === VOID ? true : wasConsumed;
    return $super === VOID ? this.yc8(expectedToken, wasConsumed) : $super.yc8.call(this, expectedToken, wasConsumed);
  };
  protoOf(AbstractJsonLexer).gc4 = function () {
    var source = this.sc8();
    var cpos = this.xc0_1;
    $l$loop_0: while (true) {
      cpos = this.tc8(cpos);
      if (cpos === -1)
        break $l$loop_0;
      var ch = charSequenceGet(source, cpos);
      if (((ch === _Char___init__impl__6a9atx(32) ? true : ch === _Char___init__impl__6a9atx(10)) ? true : ch === _Char___init__impl__6a9atx(13)) ? true : ch === _Char___init__impl__6a9atx(9)) {
        cpos = cpos + 1 | 0;
        continue $l$loop_0;
      }
      this.xc0_1 = cpos;
      return charToTokenClass(ch);
    }
    this.xc0_1 = cpos;
    return 10;
  };
  protoOf(AbstractJsonLexer).xc5 = function (doConsume) {
    var current = this.zc8();
    current = this.tc8(current);
    var len = charSequenceLength(this.sc8()) - current | 0;
    if (len < 4 ? true : current === -1)
      return false;
    var inductionVariable = 0;
    if (inductionVariable <= 3)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!(charSequenceGet('null', i) === charSequenceGet(this.sc8(), current + i | 0)))
          return false;
      }
       while (inductionVariable <= 3);
    if (len > 4 ? charToTokenClass(charSequenceGet(this.sc8(), current + 4 | 0)) === 0 : false)
      return false;
    if (doConsume) {
      this.xc0_1 = current + 4 | 0;
    }
    return true;
  };
  protoOf(AbstractJsonLexer).ic6 = function (doConsume, $super) {
    doConsume = doConsume === VOID ? true : doConsume;
    return $super === VOID ? this.xc5(doConsume) : $super.xc5.call(this, doConsume);
  };
  protoOf(AbstractJsonLexer).zc8 = function () {
    var current = this.xc0_1;
    $l$loop_0: while (true) {
      current = this.tc8(current);
      if (current === -1)
        break $l$loop_0;
      var c = charSequenceGet(this.sc8(), current);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop_0;
      }
    }
    this.xc0_1 = current;
    return current;
  };
  protoOf(AbstractJsonLexer).yc5 = function (isLenient) {
    var token = this.gc4();
    var tmp;
    if (isLenient) {
      if (!(token === 1) ? !(token === 0) : false)
        return null;
      tmp = this.jc4();
    } else {
      if (!(token === 1))
        return null;
      tmp = this.ic4();
    }
    var string = tmp;
    this.zc0_1 = string;
    return string;
  };
  protoOf(AbstractJsonLexer).ac9 = function () {
    this.zc0_1 = null;
  };
  protoOf(AbstractJsonLexer).bc9 = function (startPos, endPos) {
    // Inline function 'kotlin.text.substring' call
    var this_0 = this.sc8();
    return toString(charSequenceSubSequence(this_0, startPos, endPos));
  };
  protoOf(AbstractJsonLexer).ic4 = function () {
    if (!(this.zc0_1 == null)) {
      return takePeeked(this);
    }
    return this.bc6();
  };
  protoOf(AbstractJsonLexer).consumeString2 = function (source, startPosition, current) {
    var currentPosition = current;
    var lastPosition = startPosition;
    var char = charSequenceGet(source, currentPosition);
    var usedAppend = false;
    while (!(char === _Char___init__impl__6a9atx(34))) {
      if (char === _Char___init__impl__6a9atx(92)) {
        usedAppend = true;
        currentPosition = this.tc8(appendEscape(this, lastPosition, currentPosition));
        if (currentPosition === -1) {
          this.nc3('Unexpected EOF', currentPosition);
        }
        lastPosition = currentPosition;
      } else {
        currentPosition = currentPosition + 1 | 0;
        if (currentPosition >= charSequenceLength(source)) {
          usedAppend = true;
          this.rc8(lastPosition, currentPosition);
          currentPosition = this.tc8(currentPosition);
          if (currentPosition === -1) {
            this.nc3('Unexpected EOF', currentPosition);
          }
          lastPosition = currentPosition;
        }
      }
      char = charSequenceGet(source, currentPosition);
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.bc9(lastPosition, currentPosition);
    } else {
      tmp = decodedString(this, lastPosition, currentPosition);
    }
    var string = tmp;
    this.xc0_1 = currentPosition + 1 | 0;
    return string;
  };
  protoOf(AbstractJsonLexer).cc6 = function () {
    var result = this.jc4();
    if (result === 'null' ? wasUnquotedString(this) : false) {
      this.nc3("Unexpected 'null' value instead of string literal");
    }
    return result;
  };
  protoOf(AbstractJsonLexer).jc4 = function () {
    if (!(this.zc0_1 == null)) {
      return takePeeked(this);
    }
    var current = this.zc8();
    if (current >= charSequenceLength(this.sc8()) ? true : current === -1) {
      this.nc3('EOF', current);
    }
    var token = charToTokenClass(charSequenceGet(this.sc8(), current));
    if (token === 1) {
      return this.ic4();
    }
    if (!(token === 0)) {
      this.nc3('Expected beginning of the string, but got ' + toString_0(charSequenceGet(this.sc8(), current)));
    }
    var usedAppend = false;
    while (charToTokenClass(charSequenceGet(this.sc8(), current)) === 0) {
      current = current + 1 | 0;
      if (current >= charSequenceLength(this.sc8())) {
        usedAppend = true;
        this.rc8(this.xc0_1, current);
        var eof = this.tc8(current);
        if (eof === -1) {
          this.xc0_1 = current;
          return decodedString(this, 0, 0);
        } else {
          current = eof;
        }
      }
    }
    var tmp;
    if (!usedAppend) {
      tmp = this.bc9(this.xc0_1, current);
    } else {
      tmp = decodedString(this, this.xc0_1, current);
    }
    var result = tmp;
    this.xc0_1 = current;
    return result;
  };
  protoOf(AbstractJsonLexer).rc8 = function (fromIndex, toIndex) {
    this.ac1_1.p8(this.sc8(), fromIndex, toIndex);
  };
  protoOf(AbstractJsonLexer).ac6 = function (allowLenientStrings) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var tokenStack = ArrayList_init_$Create$();
    var lastToken = this.gc4();
    if (!(lastToken === 8) ? !(lastToken === 6) : false) {
      this.jc4();
      return Unit_instance;
    }
    $l$loop: while (true) {
      lastToken = this.gc4();
      if (lastToken === 1) {
        if (allowLenientStrings) {
          this.jc4();
        } else {
          this.bc6();
        }
        continue $l$loop;
      }
      var tmp0_subject = lastToken;
      if (tmp0_subject === 8 ? true : tmp0_subject === 6) {
        tokenStack.a1(lastToken);
      } else if (tmp0_subject === 9) {
        if (!(last(tokenStack) === 8))
          throw JsonDecodingException_0(this.xc0_1, 'found ] instead of } at path: ' + this.yc0_1, this.sc8());
        removeLast(tokenStack);
      } else if (tmp0_subject === 7) {
        if (!(last(tokenStack) === 6))
          throw JsonDecodingException_0(this.xc0_1, 'found } instead of ] at path: ' + this.yc0_1, this.sc8());
        removeLast(tokenStack);
      } else if (tmp0_subject === 10) {
        this.nc3('Unexpected end of input due to malformed JSON during ignoring unknown keys');
      }
      this.lc4();
      if (tokenStack.m() === 0)
        return Unit_instance;
    }
  };
  protoOf(AbstractJsonLexer).toString = function () {
    return "JsonReader(source='" + this.sc8() + "', currentPosition=" + this.xc0_1 + ')';
  };
  protoOf(AbstractJsonLexer).zc5 = function (key) {
    var processed = this.bc9(0, this.xc0_1);
    var lastIndexOf_0 = lastIndexOf(processed, key);
    this.mc3("Encountered an unknown key '" + key + "'", lastIndexOf_0, "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.");
  };
  protoOf(AbstractJsonLexer).mc3 = function (message, position, hint) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(hint) === 0) {
      tmp = '';
    } else {
      tmp = '\n' + hint;
    }
    var hintMessage = tmp;
    throw JsonDecodingException_0(position, message + ' at path: ' + this.yc0_1.ac4() + hintMessage, this.sc8());
  };
  protoOf(AbstractJsonLexer).nc3 = function (message, position, hint, $super) {
    position = position === VOID ? this.xc0_1 : position;
    hint = hint === VOID ? '' : hint;
    return $super === VOID ? this.mc3(message, position, hint) : $super.mc3.call(this, message, position, hint);
  };
  protoOf(AbstractJsonLexer).yc2 = function () {
    var current = this.zc8();
    current = this.tc8(current);
    if (current >= charSequenceLength(this.sc8()) ? true : current === -1) {
      this.nc3('EOF');
    }
    var tmp;
    if (charSequenceGet(this.sc8(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      if (current === charSequenceLength(this.sc8())) {
        this.nc3('EOF');
      }
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var accumulator = new Long(0, 0);
    var exponentAccumulator = new Long(0, 0);
    var isNegative = false;
    var isExponentPositive = false;
    var hasExponent = false;
    var start = current;
    $l$loop_4: while (!(current === charSequenceLength(this.sc8()))) {
      var ch = charSequenceGet(this.sc8(), current);
      if ((ch === _Char___init__impl__6a9atx(101) ? true : ch === _Char___init__impl__6a9atx(69)) ? !hasExponent : false) {
        if (current === start) {
          this.nc3('Unexpected symbol ' + toString_0(ch) + ' in numeric literal');
        }
        isExponentPositive = true;
        hasExponent = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45) ? hasExponent : false) {
        if (current === start) {
          this.nc3("Unexpected symbol '-' in numeric literal");
        }
        isExponentPositive = false;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(43) ? hasExponent : false) {
        if (current === start) {
          this.nc3("Unexpected symbol '+' in numeric literal");
        }
        isExponentPositive = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      if (ch === _Char___init__impl__6a9atx(45)) {
        if (!(current === start)) {
          this.nc3("Unexpected symbol '-' in numeric literal");
        }
        isNegative = true;
        current = current + 1 | 0;
        continue $l$loop_4;
      }
      var token = charToTokenClass(ch);
      if (!(token === 0))
        break $l$loop_4;
      current = current + 1 | 0;
      var digit = Char__minus_impl_a2frrh(ch, _Char___init__impl__6a9atx(48));
      if (!(0 <= digit ? digit <= 9 : false)) {
        this.nc3("Unexpected symbol '" + toString_0(ch) + "' in numeric literal");
      }
      if (hasExponent) {
        // Inline function 'kotlin.Long.plus' call
        // Inline function 'kotlin.Long.times' call
        exponentAccumulator = exponentAccumulator.w9(toLong(10)).eb(toLong(digit));
        continue $l$loop_4;
      }
      // Inline function 'kotlin.Long.minus' call
      // Inline function 'kotlin.Long.times' call
      accumulator = accumulator.w9(toLong(10)).fb(toLong(digit));
      if (accumulator.z6(new Long(0, 0)) > 0) {
        this.nc3('Numeric value overflow');
      }
    }
    var hasChars = !(current === start);
    if (start === current ? true : isNegative ? start === (current - 1 | 0) : false) {
      this.nc3('Expected numeric literal');
    }
    if (hasQuotation) {
      if (!hasChars) {
        this.nc3('EOF');
      }
      if (!(charSequenceGet(this.sc8(), current) === _Char___init__impl__6a9atx(34))) {
        this.nc3('Expected closing quotation mark');
      }
      current = current + 1 | 0;
    }
    this.xc0_1 = current;
    if (hasExponent) {
      var doubleAccumulator = accumulator.a7() * consumeNumericLiteral$calculateExponent(exponentAccumulator, isExponentPositive);
      var tmp_0;
      Companion_getInstance_3();
      if (doubleAccumulator > (new Long(-1, 2147483647)).a7()) {
        tmp_0 = true;
      } else {
        Companion_getInstance_3();
        tmp_0 = doubleAccumulator < (new Long(0, -2147483648)).a7();
      }
      if (tmp_0) {
        this.nc3('Numeric value overflow');
      }
      // Inline function 'kotlin.math.floor' call
      if (!(Math.floor(doubleAccumulator) === doubleAccumulator)) {
        this.nc3("Can't convert " + doubleAccumulator + ' to Long');
      }
      accumulator = numberToLong(doubleAccumulator);
    }
    var tmp_1;
    if (isNegative) {
      tmp_1 = accumulator;
    } else {
      var tmp_2 = accumulator;
      Companion_getInstance_3();
      if (!tmp_2.equals(new Long(0, -2147483648))) {
        tmp_1 = accumulator.b7();
      } else {
        this.nc3('Numeric value overflow');
      }
    }
    return tmp_1;
  };
  protoOf(AbstractJsonLexer).jc6 = function () {
    var current = this.zc8();
    if (current === charSequenceLength(this.sc8())) {
      this.nc3('EOF');
    }
    var tmp;
    if (charSequenceGet(this.sc8(), current) === _Char___init__impl__6a9atx(34)) {
      current = current + 1 | 0;
      tmp = true;
    } else {
      tmp = false;
    }
    var hasQuotation = tmp;
    var result = consumeBoolean(this, current);
    if (hasQuotation) {
      if (this.xc0_1 === charSequenceLength(this.sc8())) {
        this.nc3('EOF');
      }
      if (!(charSequenceGet(this.sc8(), this.xc0_1) === _Char___init__impl__6a9atx(34))) {
        this.nc3('Expected closing quotation mark');
      }
      this.xc0_1 = this.xc0_1 + 1 | 0;
    }
    return result;
  };
  function charToTokenClass(c) {
    var tmp;
    // Inline function 'kotlin.code' call
    if (Char__toInt_impl_vasixd(c) < 126) {
      var tmp_0 = CharMappings_getInstance().dc9_1;
      // Inline function 'kotlin.code' call
      tmp = tmp_0[Char__toInt_impl_vasixd(c)];
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function get_TC_WHITESPACE() {
    return TC_WHITESPACE;
  }
  var TC_WHITESPACE;
  function get_TC_EOF() {
    return TC_EOF;
  }
  var TC_EOF;
  function get_STRING() {
    return STRING;
  }
  var STRING;
  function get_TC_STRING() {
    return TC_STRING;
  }
  var TC_STRING;
  function get_STRING_ESC() {
    return STRING_ESC;
  }
  var STRING_ESC;
  function get_TC_BEGIN_OBJ() {
    return TC_BEGIN_OBJ;
  }
  var TC_BEGIN_OBJ;
  function get_TC_COLON() {
    return TC_COLON;
  }
  var TC_COLON;
  function get_TC_COMMA() {
    return TC_COMMA;
  }
  var TC_COMMA;
  function get_COLON() {
    return COLON;
  }
  var COLON;
  function get_BEGIN_OBJ() {
    return BEGIN_OBJ;
  }
  var BEGIN_OBJ;
  function get_END_OBJ() {
    return END_OBJ;
  }
  var END_OBJ;
  function get_BEGIN_LIST() {
    return BEGIN_LIST;
  }
  var BEGIN_LIST;
  function get_END_LIST() {
    return END_LIST;
  }
  var END_LIST;
  function get_lenientHint() {
    return lenientHint;
  }
  var lenientHint;
  function get_NULL() {
    return NULL;
  }
  var NULL;
  function tokenDescription(token) {
    return token === 1 ? "quotation mark '\"'" : token === 2 ? "string escape sequence '\\'" : token === 4 ? "comma ','" : token === 5 ? "colon ':'" : token === 6 ? "start of the object '{'" : token === 7 ? "end of the object '}'" : token === 8 ? "start of the array '['" : token === 9 ? "end of the array ']'" : token === 10 ? 'end of the input' : token === 127 ? 'invalid token' : 'valid token';
  }
  function get_TC_OTHER() {
    return TC_OTHER;
  }
  var TC_OTHER;
  function escapeToChar(c) {
    return c < 117 ? CharMappings_getInstance().cc9_1[c] : _Char___init__impl__6a9atx(0);
  }
  function get_TC_BEGIN_LIST() {
    return TC_BEGIN_LIST;
  }
  var TC_BEGIN_LIST;
  function get_TC_END_LIST() {
    return TC_END_LIST;
  }
  var TC_END_LIST;
  function get_TC_END_OBJ() {
    return TC_END_OBJ;
  }
  var TC_END_OBJ;
  function get_ignoreUnknownKeysHint() {
    return ignoreUnknownKeysHint;
  }
  var ignoreUnknownKeysHint;
  function initEscape($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2ESC($this, i, _Char___init__impl__6a9atx(117));
      }
       while (inductionVariable <= 31);
    initC2ESC($this, 8, _Char___init__impl__6a9atx(98));
    initC2ESC($this, 9, _Char___init__impl__6a9atx(116));
    initC2ESC($this, 10, _Char___init__impl__6a9atx(110));
    initC2ESC($this, 12, _Char___init__impl__6a9atx(102));
    initC2ESC($this, 13, _Char___init__impl__6a9atx(114));
    initC2ESC_0($this, _Char___init__impl__6a9atx(47), _Char___init__impl__6a9atx(47));
    initC2ESC_0($this, _Char___init__impl__6a9atx(34), _Char___init__impl__6a9atx(34));
    initC2ESC_0($this, _Char___init__impl__6a9atx(92), _Char___init__impl__6a9atx(92));
  }
  function initCharToToken($this) {
    var inductionVariable = 0;
    if (inductionVariable <= 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        initC2TC($this, i, 127);
      }
       while (inductionVariable <= 32);
    initC2TC($this, 9, 3);
    initC2TC($this, 10, 3);
    initC2TC($this, 13, 3);
    initC2TC($this, 32, 3);
    initC2TC_0($this, _Char___init__impl__6a9atx(44), 4);
    initC2TC_0($this, _Char___init__impl__6a9atx(58), 5);
    initC2TC_0($this, _Char___init__impl__6a9atx(123), 6);
    initC2TC_0($this, _Char___init__impl__6a9atx(125), 7);
    initC2TC_0($this, _Char___init__impl__6a9atx(91), 8);
    initC2TC_0($this, _Char___init__impl__6a9atx(93), 9);
    initC2TC_0($this, _Char___init__impl__6a9atx(34), 1);
    initC2TC_0($this, _Char___init__impl__6a9atx(92), 2);
  }
  function initC2ESC($this, c, esc) {
    if (!(esc === _Char___init__impl__6a9atx(117))) {
      // Inline function 'kotlin.code' call
      var tmp$ret$0 = Char__toInt_impl_vasixd(esc);
      $this.cc9_1[tmp$ret$0] = numberToChar(c);
    }
  }
  function initC2ESC_0($this, c, esc) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2ESC($this, tmp$ret$0, esc);
  }
  function initC2TC($this, c, cl) {
    $this.dc9_1[c] = cl;
  }
  function initC2TC_0($this, c, cl) {
    // Inline function 'kotlin.code' call
    var tmp$ret$0 = Char__toInt_impl_vasixd(c);
    return initC2TC($this, tmp$ret$0, cl);
  }
  function CharMappings() {
    CharMappings_instance = this;
    this.cc9_1 = charArray(117);
    this.dc9_1 = new Int8Array(126);
    initEscape(this);
    initCharToToken(this);
  }
  var CharMappings_instance;
  function CharMappings_getInstance() {
    if (CharMappings_instance == null)
      new CharMappings();
    return CharMappings_instance;
  }
  function get_specialFlowingValuesHint() {
    return specialFlowingValuesHint;
  }
  var specialFlowingValuesHint;
  function get_allowStructuredMapKeysHint() {
    return allowStructuredMapKeysHint;
  }
  var allowStructuredMapKeysHint;
  function StringJsonLexer(source) {
    AbstractJsonLexer.call(this);
    this.ic9_1 = source;
  }
  protoOf(StringJsonLexer).sc8 = function () {
    return this.ic9_1;
  };
  protoOf(StringJsonLexer).tc8 = function (position) {
    return position < this.ic9_1.length ? position : -1;
  };
  protoOf(StringJsonLexer).lc4 = function () {
    var source = this.ic9_1;
    $l$loop: while (!(this.xc0_1 === -1) ? this.xc0_1 < source.length : false) {
      var tmp1 = this.xc0_1;
      this.xc0_1 = tmp1 + 1 | 0;
      var ch = charSequenceGet(source, tmp1);
      var tc = charToTokenClass(ch);
      var tmp;
      if (tc === get_TC_WHITESPACE()) {
        continue $l$loop;
      } else {
        tmp = tc;
      }
      return tmp;
    }
    return get_TC_EOF();
  };
  protoOf(StringJsonLexer).wc5 = function () {
    var current = this.zc8();
    if (current === this.ic9_1.length ? true : current === -1)
      return false;
    if (charSequenceGet(this.ic9_1, current) === _Char___init__impl__6a9atx(44)) {
      this.xc0_1 = this.xc0_1 + 1 | 0;
      return true;
    }
    return false;
  };
  protoOf(StringJsonLexer).hc4 = function () {
    var current = this.xc0_1;
    if (current === -1)
      return false;
    $l$loop: while (current < this.ic9_1.length) {
      var c = charSequenceGet(this.ic9_1, current);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
        continue $l$loop;
      }
      this.xc0_1 = current;
      return this.vc8(c);
    }
    this.xc0_1 = current;
    return false;
  };
  protoOf(StringJsonLexer).zc8 = function () {
    var current = this.xc0_1;
    if (current === -1)
      return current;
    $l$loop: while (current < this.ic9_1.length) {
      var c = charSequenceGet(this.ic9_1, current);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9)) {
        current = current + 1 | 0;
      } else {
        break $l$loop;
      }
    }
    this.xc0_1 = current;
    return current;
  };
  protoOf(StringJsonLexer).vc5 = function (expected) {
    if (this.xc0_1 === -1) {
      this.xc8(expected);
    }
    var source = this.ic9_1;
    $l$loop: while (this.xc0_1 < source.length) {
      var tmp1 = this.xc0_1;
      this.xc0_1 = tmp1 + 1 | 0;
      var c = charSequenceGet(source, tmp1);
      if (((c === _Char___init__impl__6a9atx(32) ? true : c === _Char___init__impl__6a9atx(10)) ? true : c === _Char___init__impl__6a9atx(13)) ? true : c === _Char___init__impl__6a9atx(9))
        continue $l$loop;
      if (c === expected)
        return Unit_instance;
      this.xc8(expected);
    }
    this.xc0_1 = -1;
    this.xc8(expected);
  };
  protoOf(StringJsonLexer).bc6 = function () {
    this.vc5(get_STRING());
    var current = this.xc0_1;
    var closingQuote = indexOf(this.ic9_1, _Char___init__impl__6a9atx(34), current);
    if (closingQuote === -1) {
      this.jc4();
      this.yc8(get_TC_STRING(), false);
    }
    var inductionVariable = current;
    if (inductionVariable < closingQuote)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (charSequenceGet(this.ic9_1, i) === get_STRING_ESC()) {
          return this.consumeString2(this.ic9_1, this.xc0_1, i);
        }
      }
       while (inductionVariable < closingQuote);
    this.xc0_1 = closingQuote + 1 | 0;
    // Inline function 'kotlin.text.substring' call
    // Inline function 'kotlin.js.asDynamic' call
    return this.ic9_1.substring(current, closingQuote);
  };
  protoOf(StringJsonLexer).dc6 = function (keyToMatch, isLenient) {
    var positionSnapshot = this.xc0_1;
    try {
      if (!(this.lc4() === get_TC_BEGIN_OBJ()))
        return null;
      var firstKey = this.yc5(isLenient);
      if (!(firstKey === keyToMatch))
        return null;
      this.ac9();
      if (!(this.lc4() === get_TC_COLON()))
        return null;
      return this.yc5(isLenient);
    }finally {
      this.xc0_1 = positionSnapshot;
      this.ac9();
    }
  };
  function get_schemaCache(_this__u8e3s4) {
    return _this__u8e3s4.nc0_1;
  }
  function createMapForCache(initialCapacity) {
    return HashMap_init_$Create$(initialCapacity);
  }
  //region block: post-declaration
  protoOf(defer$1).db6 = get_isNullable;
  protoOf(defer$1).kb6 = get_isInline;
  protoOf(defer$1).ib6 = get_annotations;
  protoOf(PolymorphismValidator).bbk = contextual;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion();
  Companion_instance_1 = new Companion_0();
  Companion_instance_2 = new Companion_1();
  Companion_instance_3 = new Companion_2();
  Tombstone_instance = new Tombstone();
  PRIMITIVE_TAG = 'primitive';
  TC_WHITESPACE = 3;
  TC_EOF = 10;
  STRING = _Char___init__impl__6a9atx(34);
  TC_STRING = 1;
  STRING_ESC = _Char___init__impl__6a9atx(92);
  TC_BEGIN_OBJ = 6;
  TC_COLON = 5;
  TC_COMMA = 4;
  COLON = _Char___init__impl__6a9atx(58);
  BEGIN_OBJ = _Char___init__impl__6a9atx(123);
  END_OBJ = _Char___init__impl__6a9atx(125);
  BEGIN_LIST = _Char___init__impl__6a9atx(91);
  END_LIST = _Char___init__impl__6a9atx(93);
  lenientHint = "Use 'isLenient = true' in 'Json {}' builder to accept non-compliant JSON.";
  NULL = 'null';
  TC_OTHER = 0;
  TC_BEGIN_LIST = 8;
  TC_END_LIST = 9;
  TC_END_OBJ = 7;
  ignoreUnknownKeysHint = "Use 'ignoreUnknownKeys = true' in 'Json {}' builder to ignore unknown keys.";
  specialFlowingValuesHint = "It is possible to deserialize them using 'JsonBuilder.allowSpecialFloatingPointValues = true'";
  allowStructuredMapKeysHint = "Use 'allowStructuredMapKeys = true' in 'Json {}' builder to convert such maps to [key1, value1, key2, value2,...] arrays.";
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Json_0;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-json.js.map
