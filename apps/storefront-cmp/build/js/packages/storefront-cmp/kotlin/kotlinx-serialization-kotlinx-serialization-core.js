(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-serialization-kotlinx-serialization-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-serialization-kotlinx-serialization-core'.");
    }
    root['kotlinx-serialization-kotlinx-serialization-core'] = factory(typeof this['kotlinx-serialization-kotlinx-serialization-core'] === 'undefined' ? {} : this['kotlinx-serialization-kotlinx-serialization-core'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var protoOf = kotlin_kotlin.$_$.ib;
  var interfaceMeta = kotlin_kotlin.$_$.na;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var VOID = kotlin_kotlin.$_$.g;
  var StringCompanionObject_instance = kotlin_kotlin.$_$.f4;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var emptyList = kotlin_kotlin.$_$.m6;
  var LazyThreadSafetyMode_PUBLICATION_getInstance = kotlin_kotlin.$_$.j;
  var lazy = kotlin_kotlin.$_$.bg;
  var classMeta = kotlin_kotlin.$_$.aa;
  var KProperty1 = kotlin_kotlin.$_$.rc;
  var getPropertyCallableRef = kotlin_kotlin.$_$.ja;
  var IllegalArgumentException_init_$Init$ = kotlin_kotlin.$_$.n1;
  var objectCreate = kotlin_kotlin.$_$.gb;
  var captureStack = kotlin_kotlin.$_$.u9;
  var IllegalArgumentException_init_$Init$_0 = kotlin_kotlin.$_$.p1;
  var IllegalArgumentException_init_$Init$_1 = kotlin_kotlin.$_$.r1;
  var IllegalArgumentException = kotlin_kotlin.$_$.te;
  var collectionSizeOrDefault = kotlin_kotlin.$_$.w5;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var KClass = kotlin_kotlin.$_$.nc;
  var isInterface = kotlin_kotlin.$_$.wa;
  var Triple = kotlin_kotlin.$_$.ef;
  var getKClass = kotlin_kotlin.$_$.e;
  var Pair = kotlin_kotlin.$_$.ze;
  var Entry = kotlin_kotlin.$_$.f5;
  var LinkedHashMap = kotlin_kotlin.$_$.c5;
  var MutableMap = kotlin_kotlin.$_$.k5;
  var Map = kotlin_kotlin.$_$.g5;
  var HashMap = kotlin_kotlin.$_$.a5;
  var LinkedHashSet = kotlin_kotlin.$_$.d5;
  var MutableSet = kotlin_kotlin.$_$.l5;
  var Set = kotlin_kotlin.$_$.m5;
  var HashSet = kotlin_kotlin.$_$.b5;
  var ArrayList = kotlin_kotlin.$_$.y4;
  var MutableList = kotlin_kotlin.$_$.i5;
  var List = kotlin_kotlin.$_$.e5;
  var Collection = kotlin_kotlin.$_$.z4;
  var copyToArray = kotlin_kotlin.$_$.l6;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.t2;
  var _Result___get_isFailure__impl__jpiriv = kotlin_kotlin.$_$.s2;
  var Result = kotlin_kotlin.$_$.af;
  var ensureNotNull = kotlin_kotlin.$_$.uf;
  var equals = kotlin_kotlin.$_$.da;
  var getStringHashCode = kotlin_kotlin.$_$.ka;
  var isBlank = kotlin_kotlin.$_$.hd;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var toList = kotlin_kotlin.$_$.s8;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.u;
  var toHashSet = kotlin_kotlin.$_$.p8;
  var toBooleanArray = kotlin_kotlin.$_$.o8;
  var withIndex = kotlin_kotlin.$_$.w8;
  var to = kotlin_kotlin.$_$.og;
  var toMap = kotlin_kotlin.$_$.t8;
  var lazy_0 = kotlin_kotlin.$_$.cg;
  var contentEquals = kotlin_kotlin.$_$.y5;
  var until = kotlin_kotlin.$_$.mc;
  var joinToString = kotlin_kotlin.$_$.i7;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var Long = kotlin_kotlin.$_$.ve;
  var Char = kotlin_kotlin.$_$.le;
  var Companion_getInstance = kotlin_kotlin.$_$.i4;
  var Duration = kotlin_kotlin.$_$.he;
  var toIntOrNull = kotlin_kotlin.$_$.xd;
  var hashCode = kotlin_kotlin.$_$.la;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var ArrayList_init_$Create$_1 = kotlin_kotlin.$_$.o;
  var HashSet_init_$Create$_0 = kotlin_kotlin.$_$.v;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.z;
  var LinkedHashSet_init_$Create$_0 = kotlin_kotlin.$_$.a1;
  var HashMap_init_$Create$ = kotlin_kotlin.$_$.q;
  var HashMap_init_$Create$_0 = kotlin_kotlin.$_$.r;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var LinkedHashMap_init_$Create$_0 = kotlin_kotlin.$_$.y;
  var asList = kotlin_kotlin.$_$.r5;
  var isArray = kotlin_kotlin.$_$.oa;
  var step = kotlin_kotlin.$_$.lc;
  var getValue = kotlin_kotlin.$_$.b7;
  var longArray = kotlin_kotlin.$_$.bb;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.k4;
  var get_lastIndex = kotlin_kotlin.$_$.k7;
  var countTrailingZeroBits = kotlin_kotlin.$_$.sf;
  var HashSet_init_$Create$_1 = kotlin_kotlin.$_$.t;
  var KTypeParameter = kotlin_kotlin.$_$.sc;
  var fillArrayVal = kotlin_kotlin.$_$.ea;
  var booleanArray = kotlin_kotlin.$_$.t9;
  var emptyMap = kotlin_kotlin.$_$.n6;
  var contentHashCode = kotlin_kotlin.$_$.a6;
  var Companion_getInstance_1 = kotlin_kotlin.$_$.j4;
  var isCharArray = kotlin_kotlin.$_$.ra;
  var charArray = kotlin_kotlin.$_$.w9;
  var DoubleCompanionObject_instance = kotlin_kotlin.$_$.b4;
  var isDoubleArray = kotlin_kotlin.$_$.ta;
  var FloatCompanionObject_instance = kotlin_kotlin.$_$.c4;
  var isFloatArray = kotlin_kotlin.$_$.ua;
  var isLongArray = kotlin_kotlin.$_$.xa;
  var Companion_getInstance_2 = kotlin_kotlin.$_$.o4;
  var ULongArray = kotlin_kotlin.$_$.jf;
  var _ULongArray___init__impl__twm1l3 = kotlin_kotlin.$_$.l3;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.i3;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var isIntArray = kotlin_kotlin.$_$.va;
  var Companion_getInstance_3 = kotlin_kotlin.$_$.n4;
  var UIntArray = kotlin_kotlin.$_$.hf;
  var _UIntArray___init__impl__ghjpc6 = kotlin_kotlin.$_$.d3;
  var _UInt___init__impl__l7qpdl = kotlin_kotlin.$_$.b3;
  var ShortCompanionObject_instance = kotlin_kotlin.$_$.e4;
  var isShortArray = kotlin_kotlin.$_$.ya;
  var Companion_getInstance_4 = kotlin_kotlin.$_$.p4;
  var UShortArray = kotlin_kotlin.$_$.lf;
  var _UShortArray___init__impl__9b26ef = kotlin_kotlin.$_$.s3;
  var _UShort___init__impl__jigrne = kotlin_kotlin.$_$.q3;
  var ByteCompanionObject_instance = kotlin_kotlin.$_$.a4;
  var isByteArray = kotlin_kotlin.$_$.qa;
  var Companion_getInstance_5 = kotlin_kotlin.$_$.m4;
  var UByteArray = kotlin_kotlin.$_$.ff;
  var _UByteArray___init__impl__ip4y9n = kotlin_kotlin.$_$.x2;
  var _UByte___init__impl__g9hnc4 = kotlin_kotlin.$_$.u2;
  var BooleanCompanionObject_instance = kotlin_kotlin.$_$.z3;
  var isBooleanArray = kotlin_kotlin.$_$.pa;
  var coerceAtLeast = kotlin_kotlin.$_$.ac;
  var copyOf = kotlin_kotlin.$_$.f6;
  var copyOf_0 = kotlin_kotlin.$_$.h6;
  var copyOf_1 = kotlin_kotlin.$_$.i6;
  var copyOf_2 = kotlin_kotlin.$_$.d6;
  var _ULongArray___get_size__impl__ju6dtr = kotlin_kotlin.$_$.o3;
  var _ULongArray___get_storage__impl__28e64j = kotlin_kotlin.$_$.p3;
  var _ULongArray___init__impl__twm1l3_0 = kotlin_kotlin.$_$.m3;
  var ULongArray__set_impl_z19mvh = kotlin_kotlin.$_$.n3;
  var copyOf_3 = kotlin_kotlin.$_$.k6;
  var _UIntArray___get_size__impl__r6l8ci = kotlin_kotlin.$_$.g3;
  var _UIntArray___get_storage__impl__92a0v0 = kotlin_kotlin.$_$.h3;
  var _UIntArray___init__impl__ghjpc6_0 = kotlin_kotlin.$_$.e3;
  var UIntArray__set_impl_7f2zu2 = kotlin_kotlin.$_$.f3;
  var copyOf_4 = kotlin_kotlin.$_$.c6;
  var _UShortArray___get_size__impl__jqto1b = kotlin_kotlin.$_$.v3;
  var _UShortArray___get_storage__impl__t2jpv5 = kotlin_kotlin.$_$.w3;
  var _UShortArray___init__impl__9b26ef_0 = kotlin_kotlin.$_$.t3;
  var UShortArray__set_impl_6d8whp = kotlin_kotlin.$_$.u3;
  var copyOf_5 = kotlin_kotlin.$_$.g6;
  var _UByteArray___get_size__impl__h6pkdv = kotlin_kotlin.$_$.z2;
  var _UByteArray___get_storage__impl__d4kctt = kotlin_kotlin.$_$.a3;
  var _UByteArray___init__impl__ip4y9n_0 = kotlin_kotlin.$_$.w2;
  var UByteArray__set_impl_jvcicn = kotlin_kotlin.$_$.y2;
  var copyOf_6 = kotlin_kotlin.$_$.e6;
  var trimIndent = kotlin_kotlin.$_$.fe;
  var equals_0 = kotlin_kotlin.$_$.fd;
  var charSequenceLength = kotlin_kotlin.$_$.y9;
  var charSequenceGet = kotlin_kotlin.$_$.x9;
  var toString_0 = kotlin_kotlin.$_$.p2;
  var titlecase = kotlin_kotlin.$_$.vd;
  var isLowerCase = kotlin_kotlin.$_$.kd;
  var PrimitiveClasses_getInstance = kotlin_kotlin.$_$.h4;
  var ULong = kotlin_kotlin.$_$.kf;
  var UInt = kotlin_kotlin.$_$.if;
  var UShort = kotlin_kotlin.$_$.mf;
  var UByte = kotlin_kotlin.$_$.gf;
  var Unit = kotlin_kotlin.$_$.nf;
  var mapOf = kotlin_kotlin.$_$.x7;
  var lastOrNull = kotlin_kotlin.$_$.o7;
  var get_lastIndex_0 = kotlin_kotlin.$_$.l7;
  var get_js = kotlin_kotlin.$_$.za;
  var findAssociatedObject = kotlin_kotlin.$_$.c;
  var get_indices = kotlin_kotlin.$_$.f7;
  var IndexOutOfBoundsException_init_$Create$ = kotlin_kotlin.$_$.z1;
  var get_indices_0 = kotlin_kotlin.$_$.d7;
  var Companion_instance = kotlin_kotlin.$_$.l4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.q2;
  var createFailure = kotlin_kotlin.$_$.tf;
  //endregion
  //region block: pre-declaration
  setMetadataFor(DeserializationStrategy, 'DeserializationStrategy', interfaceMeta);
  setMetadataFor(KSerializer, 'KSerializer', interfaceMeta, VOID, [DeserializationStrategy]);
  setMetadataFor(AbstractPolymorphicSerializer, 'AbstractPolymorphicSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(PolymorphicSerializer, 'PolymorphicSerializer', classMeta, AbstractPolymorphicSerializer);
  setMetadataFor(SerializationException, 'SerializationException', classMeta, IllegalArgumentException, VOID, SerializationException_init_$Create$);
  setMetadataFor(UnknownFieldException, 'UnknownFieldException', classMeta, SerializationException);
  setMetadataFor(MissingFieldException, 'MissingFieldException', classMeta, SerializationException);
  function get_isNullable() {
    return false;
  }
  function get_isInline() {
    return false;
  }
  function get_annotations() {
    return emptyList();
  }
  setMetadataFor(SerialDescriptor, 'SerialDescriptor', interfaceMeta);
  setMetadataFor(ContextDescriptor, 'ContextDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(elementDescriptors$1$1, VOID, classMeta);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta);
  setMetadataFor(ClassSerialDescriptorBuilder, 'ClassSerialDescriptorBuilder', classMeta);
  setMetadataFor(CachedNames, 'CachedNames', interfaceMeta);
  setMetadataFor(SerialDescriptorImpl, 'SerialDescriptorImpl', classMeta, VOID, [SerialDescriptor, CachedNames]);
  setMetadataFor(SerialKind, 'SerialKind', classMeta);
  setMetadataFor(ENUM, 'ENUM', objectMeta, SerialKind);
  setMetadataFor(CONTEXTUAL, 'CONTEXTUAL', objectMeta, SerialKind);
  setMetadataFor(PrimitiveKind, 'PrimitiveKind', classMeta, SerialKind);
  setMetadataFor(BOOLEAN, 'BOOLEAN', objectMeta, PrimitiveKind);
  setMetadataFor(BYTE, 'BYTE', objectMeta, PrimitiveKind);
  setMetadataFor(CHAR, 'CHAR', objectMeta, PrimitiveKind);
  setMetadataFor(SHORT, 'SHORT', objectMeta, PrimitiveKind);
  setMetadataFor(INT, 'INT', objectMeta, PrimitiveKind);
  setMetadataFor(LONG, 'LONG', objectMeta, PrimitiveKind);
  setMetadataFor(FLOAT, 'FLOAT', objectMeta, PrimitiveKind);
  setMetadataFor(DOUBLE, 'DOUBLE', objectMeta, PrimitiveKind);
  setMetadataFor(STRING, 'STRING', objectMeta, PrimitiveKind);
  setMetadataFor(StructureKind, 'StructureKind', classMeta, SerialKind);
  setMetadataFor(CLASS, 'CLASS', objectMeta, StructureKind);
  setMetadataFor(LIST, 'LIST', objectMeta, StructureKind);
  setMetadataFor(MAP, 'MAP', objectMeta, StructureKind);
  setMetadataFor(OBJECT, 'OBJECT', objectMeta, StructureKind);
  setMetadataFor(PolymorphicKind, 'PolymorphicKind', classMeta, SerialKind);
  setMetadataFor(SEALED, 'SEALED', objectMeta, PolymorphicKind);
  setMetadataFor(OPEN, 'OPEN', objectMeta, PolymorphicKind);
  function decodeSerializableValue(deserializer) {
    return deserializer.zb4(this);
  }
  setMetadataFor(Decoder, 'Decoder', interfaceMeta);
  function decodeSequentially() {
    return false;
  }
  function decodeCollectionSize(descriptor) {
    return -1;
  }
  function decodeSerializableElement$default(descriptor, index, deserializer, previousValue, $super) {
    previousValue = previousValue === VOID ? null : previousValue;
    return $super === VOID ? this.cb8(descriptor, index, deserializer, previousValue) : $super.cb8.call(this, descriptor, index, deserializer, previousValue);
  }
  setMetadataFor(CompositeDecoder, 'CompositeDecoder', interfaceMeta);
  setMetadataFor(AbstractDecoder, 'AbstractDecoder', classMeta, VOID, [Decoder, CompositeDecoder]);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(NothingSerializer_0, 'NothingSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(DurationSerializer, 'DurationSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(ListLikeDescriptor, 'ListLikeDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(ArrayListClassDesc, 'ArrayListClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(HashSetClassDesc, 'HashSetClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(LinkedHashSetClassDesc, 'LinkedHashSetClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(MapLikeDescriptor, 'MapLikeDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(HashMapClassDesc, 'HashMapClassDesc', classMeta, MapLikeDescriptor);
  setMetadataFor(LinkedHashMapClassDesc, 'LinkedHashMapClassDesc', classMeta, MapLikeDescriptor);
  setMetadataFor(ArrayClassDesc, 'ArrayClassDesc', classMeta, ListLikeDescriptor);
  setMetadataFor(PrimitiveArrayDescriptor, 'PrimitiveArrayDescriptor', classMeta, ListLikeDescriptor);
  setMetadataFor(AbstractCollectionSerializer, 'AbstractCollectionSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(CollectionLikeSerializer, 'CollectionLikeSerializer', classMeta, AbstractCollectionSerializer);
  setMetadataFor(CollectionSerializer, 'CollectionSerializer', classMeta, CollectionLikeSerializer);
  setMetadataFor(ArrayListSerializer, 'ArrayListSerializer', classMeta, CollectionSerializer);
  setMetadataFor(HashSetSerializer, 'HashSetSerializer', classMeta, CollectionSerializer);
  setMetadataFor(LinkedHashSetSerializer, 'LinkedHashSetSerializer', classMeta, CollectionSerializer);
  setMetadataFor(MapLikeSerializer, 'MapLikeSerializer', classMeta, AbstractCollectionSerializer);
  setMetadataFor(HashMapSerializer, 'HashMapSerializer', classMeta, MapLikeSerializer);
  setMetadataFor(LinkedHashMapSerializer, 'LinkedHashMapSerializer', classMeta, MapLikeSerializer);
  setMetadataFor(ReferenceArraySerializer, 'ReferenceArraySerializer', classMeta, CollectionLikeSerializer);
  setMetadataFor(PrimitiveArraySerializer, 'PrimitiveArraySerializer', classMeta, CollectionLikeSerializer);
  setMetadataFor(PrimitiveArrayBuilder, 'PrimitiveArrayBuilder', classMeta);
  setMetadataFor(Companion_0, 'Companion', objectMeta);
  setMetadataFor(ElementMarker, 'ElementMarker', classMeta);
  setMetadataFor(PluginGeneratedSerialDescriptor, 'PluginGeneratedSerialDescriptor', classMeta, VOID, [SerialDescriptor, CachedNames]);
  setMetadataFor(InlineClassDescriptor, 'InlineClassDescriptor', classMeta, PluginGeneratedSerialDescriptor);
  function typeParametersSerializers() {
    return get_EMPTY_SERIALIZER_ARRAY();
  }
  setMetadataFor(GeneratedSerializer, 'GeneratedSerializer', interfaceMeta, VOID, [KSerializer]);
  setMetadataFor(InlinePrimitiveDescriptor$1, VOID, classMeta, VOID, [GeneratedSerializer]);
  setMetadataFor(NothingSerialDescriptor, 'NothingSerialDescriptor', objectMeta, VOID, [SerialDescriptor]);
  setMetadataFor(NullableSerializer, 'NullableSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(SerialDescriptorForNullable, 'SerialDescriptorForNullable', classMeta, VOID, [SerialDescriptor, CachedNames]);
  setMetadataFor(ObjectSerializer, 'ObjectSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(SerializerFactory, 'SerializerFactory', interfaceMeta);
  setMetadataFor(CharArraySerializer_0, 'CharArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(DoubleArraySerializer_0, 'DoubleArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(FloatArraySerializer_0, 'FloatArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(LongArraySerializer_0, 'LongArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(ULongArraySerializer_0, 'ULongArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(IntArraySerializer_0, 'IntArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(UIntArraySerializer_0, 'UIntArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(ShortArraySerializer_0, 'ShortArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(UShortArraySerializer_0, 'UShortArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(ByteArraySerializer_0, 'ByteArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(UByteArraySerializer_0, 'UByteArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(BooleanArraySerializer_0, 'BooleanArraySerializer', objectMeta, PrimitiveArraySerializer, [KSerializer, PrimitiveArraySerializer]);
  setMetadataFor(CharArrayBuilder, 'CharArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(DoubleArrayBuilder, 'DoubleArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(FloatArrayBuilder, 'FloatArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(LongArrayBuilder, 'LongArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(ULongArrayBuilder, 'ULongArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(IntArrayBuilder, 'IntArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(UIntArrayBuilder, 'UIntArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(ShortArrayBuilder, 'ShortArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(UShortArrayBuilder, 'UShortArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(ByteArrayBuilder, 'ByteArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(UByteArrayBuilder, 'UByteArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(BooleanArrayBuilder, 'BooleanArrayBuilder', classMeta, PrimitiveArrayBuilder);
  setMetadataFor(StringSerializer, 'StringSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(CharSerializer, 'CharSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(DoubleSerializer, 'DoubleSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(FloatSerializer, 'FloatSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(LongSerializer, 'LongSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(IntSerializer, 'IntSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(ShortSerializer, 'ShortSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(ByteSerializer, 'ByteSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(BooleanSerializer, 'BooleanSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UnitSerializer, 'UnitSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(PrimitiveSerialDescriptor_0, 'PrimitiveSerialDescriptor', classMeta, VOID, [SerialDescriptor]);
  setMetadataFor(TaggedDecoder, 'TaggedDecoder', classMeta, VOID, [Decoder, CompositeDecoder]);
  setMetadataFor(NamedValueDecoder, 'NamedValueDecoder', classMeta, TaggedDecoder);
  setMetadataFor(MapEntry, 'MapEntry', classMeta, VOID, [Entry]);
  setMetadataFor(KeyValueSerializer, 'KeyValueSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(MapEntrySerializer_0, 'MapEntrySerializer', classMeta, KeyValueSerializer);
  setMetadataFor(PairSerializer_0, 'PairSerializer', classMeta, KeyValueSerializer);
  setMetadataFor(TripleSerializer_0, 'TripleSerializer', classMeta, VOID, [KSerializer]);
  setMetadataFor(ULongSerializer, 'ULongSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UIntSerializer, 'UIntSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UShortSerializer, 'UShortSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(UByteSerializer, 'UByteSerializer', objectMeta, VOID, [KSerializer]);
  setMetadataFor(SerializersModule, 'SerializersModule', classMeta);
  setMetadataFor(SerialModuleImpl, 'SerialModuleImpl', classMeta, SerializersModule);
  setMetadataFor(ContextualProvider, 'ContextualProvider', classMeta);
  setMetadataFor(Argless, 'Argless', classMeta, ContextualProvider);
  setMetadataFor(WithTypeArguments, 'WithTypeArguments', classMeta, ContextualProvider);
  function contextual(kClass, serializer) {
    return this.pbj(kClass, SerializersModuleCollector$contextual$lambda(serializer));
  }
  setMetadataFor(SerializersModuleCollector, 'SerializersModuleCollector', interfaceMeta);
  setMetadataFor(SerializableWith, 'SerializableWith', classMeta, VOID, VOID, VOID, 0);
  setMetadataFor(createCache$1, VOID, classMeta);
  setMetadataFor(createParametrizedCache$1, VOID, classMeta);
  //endregion
  function KSerializer() {
  }
  function DeserializationStrategy() {
  }
  function PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.ib5('type', serializer_0(StringCompanionObject_instance).yb4());
      $this$buildSerialDescriptor.ib5('value', buildSerialDescriptor('kotlinx.serialization.Polymorphic<' + this$0.jb5_1.e7() + '>', CONTEXTUAL_getInstance(), []));
      $this$buildSerialDescriptor.cb5_1 = this$0.kb5_1;
      return Unit_instance;
    };
  }
  function PolymorphicSerializer$descriptor$delegate$lambda(this$0) {
    return function () {
      var tmp = OPEN_getInstance();
      return withContext(buildSerialDescriptor('kotlinx.serialization.Polymorphic', tmp, [], PolymorphicSerializer$descriptor$delegate$lambda$lambda(this$0)), this$0.jb5_1);
    };
  }
  function PolymorphicSerializer(baseClass) {
    AbstractPolymorphicSerializer.call(this);
    this.jb5_1 = baseClass;
    this.kb5_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.lb5_1 = lazy(tmp_0, PolymorphicSerializer$descriptor$delegate$lambda(this));
  }
  protoOf(PolymorphicSerializer).mb5 = function () {
    return this.jb5_1;
  };
  protoOf(PolymorphicSerializer).yb4 = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.lb5_1;
    descriptor$factory();
    return this_0.s2();
  };
  protoOf(PolymorphicSerializer).toString = function () {
    return 'kotlinx.serialization.PolymorphicSerializer(baseClass: ' + this.jb5_1 + ')';
  };
  function findPolymorphicSerializer(_this__u8e3s4, decoder, klassName) {
    var tmp0_elvis_lhs = _this__u8e3s4.nb5(decoder, klassName);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throwSubtypeNotRegistered(klassName, _this__u8e3s4.mb5());
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function descriptor$factory() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.yb4();
    }, null);
  }
  function SerializationException_init_$Init$($this) {
    IllegalArgumentException_init_$Init$($this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$() {
    var tmp = SerializationException_init_$Init$(objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$);
    return tmp;
  }
  function SerializationException_init_$Init$_0(message, $this) {
    IllegalArgumentException_init_$Init$_0(message, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException_init_$Create$_0(message) {
    var tmp = SerializationException_init_$Init$_0(message, objectCreate(protoOf(SerializationException)));
    captureStack(tmp, SerializationException_init_$Create$_0);
    return tmp;
  }
  function SerializationException_init_$Init$_1(message, cause, $this) {
    IllegalArgumentException_init_$Init$_1(message, cause, $this);
    SerializationException.call($this);
    return $this;
  }
  function SerializationException() {
    captureStack(this, SerializationException);
  }
  function UnknownFieldException_init_$Init$(index, $this) {
    UnknownFieldException.call($this, 'An unknown field for index ' + index);
    return $this;
  }
  function UnknownFieldException_init_$Create$(index) {
    var tmp = UnknownFieldException_init_$Init$(index, objectCreate(protoOf(UnknownFieldException)));
    captureStack(tmp, UnknownFieldException_init_$Create$);
    return tmp;
  }
  function UnknownFieldException(message) {
    SerializationException_init_$Init$_0(message, this);
    captureStack(this, UnknownFieldException);
  }
  function MissingFieldException_init_$Init$(missingFields, serialName, $this) {
    MissingFieldException.call($this, missingFields, missingFields.m() === 1 ? "Field '" + missingFields.n(0) + "' is required for type with serial name '" + serialName + "', but it was missing" : 'Fields ' + missingFields + " are required for type with serial name '" + serialName + "', but they were missing", null);
    return $this;
  }
  function MissingFieldException_init_$Create$(missingFields, serialName) {
    var tmp = MissingFieldException_init_$Init$(missingFields, serialName, objectCreate(protoOf(MissingFieldException)));
    captureStack(tmp, MissingFieldException_init_$Create$);
    return tmp;
  }
  function MissingFieldException(missingFields, message, cause) {
    SerializationException_init_$Init$_1(message, cause, this);
    captureStack(this, MissingFieldException);
    this.ob5_1 = missingFields;
  }
  function serializerOrNull(_this__u8e3s4) {
    var tmp0_elvis_lhs = compiledSerializerImpl(_this__u8e3s4);
    return tmp0_elvis_lhs == null ? builtinSerializerOrNull(_this__u8e3s4) : tmp0_elvis_lhs;
  }
  function serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer) {
    var tmp;
    if (failOnMissingTypeArgSerializer) {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var tmp0_iterator = typeArguments.o();
      while (tmp0_iterator.d1()) {
        var item = tmp0_iterator.f1();
        // Inline function 'kotlinx.serialization.serializersForParameters.<anonymous>' call
        var tmp$ret$0 = serializer(_this__u8e3s4, item);
        destination.a1(tmp$ret$0);
      }
      tmp = destination;
    } else {
      // Inline function 'kotlin.collections.map' call
      // Inline function 'kotlin.collections.mapTo' call
      var destination_0 = ArrayList_init_$Create$(collectionSizeOrDefault(typeArguments, 10));
      var tmp0_iterator_0 = typeArguments.o();
      while (tmp0_iterator_0.d1()) {
        var item_0 = tmp0_iterator_0.f1();
        // Inline function 'kotlinx.serialization.serializersForParameters.<anonymous>' call
        var tmp0_elvis_lhs = serializerOrNull_0(_this__u8e3s4, item_0);
        var tmp_0;
        if (tmp0_elvis_lhs == null) {
          return null;
        } else {
          tmp_0 = tmp0_elvis_lhs;
        }
        var tmp$ret$3 = tmp_0;
        destination_0.a1(tmp$ret$3);
      }
      tmp = destination_0;
    }
    var serializers = tmp;
    return serializers;
  }
  function parametrizedSerializerOrNull(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp0_elvis_lhs = builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray);
    return tmp0_elvis_lhs == null ? compiledParametrizedSerializer(_this__u8e3s4, serializers) : tmp0_elvis_lhs;
  }
  function serializer(_this__u8e3s4, type) {
    var tmp0_elvis_lhs = serializerByKTypeImpl(_this__u8e3s4, type, true);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      platformSpecificSerializerNotRegistered(kclass(type));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function serializerOrNull_0(_this__u8e3s4, type) {
    return serializerByKTypeImpl(_this__u8e3s4, type, false);
  }
  function builtinParametrizedSerializer(_this__u8e3s4, serializers, elementClassifierIfArray) {
    var tmp;
    if (((_this__u8e3s4.equals(getKClass(Collection)) ? true : _this__u8e3s4.equals(getKClass(List))) ? true : _this__u8e3s4.equals(getKClass(MutableList))) ? true : _this__u8e3s4.equals(getKClass(ArrayList))) {
      tmp = new ArrayListSerializer(serializers.n(0));
    } else if (_this__u8e3s4.equals(getKClass(HashSet))) {
      tmp = new HashSetSerializer(serializers.n(0));
    } else if ((_this__u8e3s4.equals(getKClass(Set)) ? true : _this__u8e3s4.equals(getKClass(MutableSet))) ? true : _this__u8e3s4.equals(getKClass(LinkedHashSet))) {
      tmp = new LinkedHashSetSerializer(serializers.n(0));
    } else if (_this__u8e3s4.equals(getKClass(HashMap))) {
      tmp = new HashMapSerializer(serializers.n(0), serializers.n(1));
    } else if ((_this__u8e3s4.equals(getKClass(Map)) ? true : _this__u8e3s4.equals(getKClass(MutableMap))) ? true : _this__u8e3s4.equals(getKClass(LinkedHashMap))) {
      tmp = new LinkedHashMapSerializer(serializers.n(0), serializers.n(1));
    } else if (_this__u8e3s4.equals(getKClass(Entry))) {
      tmp = MapEntrySerializer(serializers.n(0), serializers.n(1));
    } else if (_this__u8e3s4.equals(getKClass(Pair))) {
      tmp = PairSerializer(serializers.n(0), serializers.n(1));
    } else if (_this__u8e3s4.equals(getKClass(Triple))) {
      tmp = TripleSerializer(serializers.n(0), serializers.n(1), serializers.n(2));
    } else {
      var tmp_0;
      if (isReferenceArray(_this__u8e3s4)) {
        var tmp_1 = elementClassifierIfArray();
        tmp_0 = ArraySerializer((!(tmp_1 == null) ? isInterface(tmp_1, KClass) : false) ? tmp_1 : THROW_CCE(), serializers.n(0));
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    return tmp;
  }
  function compiledParametrizedSerializer(_this__u8e3s4, serializers) {
    // Inline function 'kotlin.collections.toTypedArray' call
    var tmp$ret$0 = copyToArray(serializers);
    return constructSerializerForGivenTypeArgs(_this__u8e3s4, tmp$ret$0.slice());
  }
  function serializerByKTypeImpl(_this__u8e3s4, type, failOnMissingTypeArgSerializer) {
    var rootClass = kclass(type);
    var isNullable = type.t7();
    // Inline function 'kotlin.collections.map' call
    var this_0 = type.s7();
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_0, 10));
    var tmp0_iterator = this_0.o();
    while (tmp0_iterator.d1()) {
      var item = tmp0_iterator.f1();
      var tmp$ret$0 = typeOrThrow(item);
      destination.a1(tmp$ret$0);
    }
    var typeArguments = destination;
    var tmp;
    if (typeArguments.u()) {
      tmp = findCachedSerializer(rootClass, isNullable);
    } else {
      // Inline function 'kotlin.Result.getOrNull' call
      var this_1 = findParametrizedCachedSerializer(rootClass, typeArguments, isNullable);
      var tmp_0;
      if (_Result___get_isFailure__impl__jpiriv(this_1)) {
        tmp_0 = null;
      } else {
        var tmp_1 = _Result___get_value__impl__bjfvqg(this_1);
        tmp_0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
      }
      tmp = tmp_0;
    }
    var cachedSerializer = tmp;
    if (cachedSerializer == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      return cachedSerializer;
    }
    var tmp_2;
    if (typeArguments.u()) {
      tmp_2 = _this__u8e3s4.qb5(rootClass);
    } else {
      var tmp1_elvis_lhs = serializersForParameters(_this__u8e3s4, typeArguments, failOnMissingTypeArgSerializer);
      var tmp_3;
      if (tmp1_elvis_lhs == null) {
        return null;
      } else {
        tmp_3 = tmp1_elvis_lhs;
      }
      var serializers = tmp_3;
      var tmp2_elvis_lhs = parametrizedSerializerOrNull(rootClass, serializers, serializerByKTypeImpl$lambda(typeArguments));
      tmp_2 = tmp2_elvis_lhs == null ? _this__u8e3s4.pb5(rootClass, serializers) : tmp2_elvis_lhs;
    }
    var contextualSerializer = tmp_2;
    var tmp_4;
    if (contextualSerializer == null) {
      tmp_4 = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp_4 = isInterface(contextualSerializer, KSerializer) ? contextualSerializer : THROW_CCE();
    }
    var tmp4_safe_receiver = tmp_4;
    return tmp4_safe_receiver == null ? null : nullable(tmp4_safe_receiver, isNullable);
  }
  function nullable(_this__u8e3s4, shouldBeNullable) {
    if (shouldBeNullable)
      return get_nullable(_this__u8e3s4);
    return isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
  }
  function serializerByKTypeImpl$lambda($typeArguments) {
    return function () {
      return $typeArguments.n(0).r7();
    };
  }
  function get_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE;
  }
  var SERIALIZERS_CACHE;
  function get_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return SERIALIZERS_CACHE_NULLABLE;
  }
  var SERIALIZERS_CACHE_NULLABLE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE;
  function get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE() {
    _init_properties_SerializersCache_kt__hgwi2p();
    return PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  }
  var PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE;
  function findCachedSerializer(clazz, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp0_safe_receiver = get_SERIALIZERS_CACHE().rb5(clazz);
      var tmp_0;
      if (tmp0_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlinx.serialization.internal.cast' call
        tmp_0 = isInterface(tmp0_safe_receiver, KSerializer) ? tmp0_safe_receiver : THROW_CCE();
      }
      tmp = tmp_0;
    } else {
      tmp = get_SERIALIZERS_CACHE_NULLABLE().rb5(clazz);
    }
    return tmp;
  }
  function findParametrizedCachedSerializer(clazz, types, isNullable) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp;
    if (!isNullable) {
      var tmp_0 = get_PARAMETRIZED_SERIALIZERS_CACHE().sb5(clazz, types);
      tmp = new Result(tmp_0) instanceof Result ? tmp_0 : THROW_CCE();
    } else {
      tmp = get_PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE().sb5(clazz, types);
    }
    return tmp;
  }
  function SERIALIZERS_CACHE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    return serializerOrNull(it);
  }
  function SERIALIZERS_CACHE_NULLABLE$lambda(it) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var tmp0_safe_receiver = serializerOrNull(it);
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, KSerializer) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    return parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda(types));
  }
  function PARAMETRIZED_SERIALIZERS_CACHE$lambda$lambda($types) {
    return function () {
      return $types.n(0).r7();
    };
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda(clazz, types) {
    _init_properties_SerializersCache_kt__hgwi2p();
    var serializers = ensureNotNull(serializersForParameters(EmptySerializersModule_0(), types, true));
    var tmp0_safe_receiver = parametrizedSerializerOrNull(clazz, serializers, PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda(types));
    var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : get_nullable(tmp0_safe_receiver);
    var tmp;
    if (tmp1_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlinx.serialization.internal.cast' call
      tmp = isInterface(tmp1_safe_receiver, KSerializer) ? tmp1_safe_receiver : THROW_CCE();
    }
    return tmp;
  }
  function PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda$lambda($types) {
    return function () {
      return $types.n(0).r7();
    };
  }
  var properties_initialized_SerializersCache_kt_q8kf25;
  function _init_properties_SerializersCache_kt__hgwi2p() {
    if (!properties_initialized_SerializersCache_kt_q8kf25) {
      properties_initialized_SerializersCache_kt_q8kf25 = true;
      SERIALIZERS_CACHE = createCache(SERIALIZERS_CACHE$lambda);
      SERIALIZERS_CACHE_NULLABLE = createCache(SERIALIZERS_CACHE_NULLABLE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE$lambda);
      PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE = createParametrizedCache(PARAMETRIZED_SERIALIZERS_CACHE_NULLABLE$lambda);
    }
  }
  function get_nullable(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4.yb4().tb5()) {
      tmp = isInterface(_this__u8e3s4, KSerializer) ? _this__u8e3s4 : THROW_CCE();
    } else {
      tmp = new NullableSerializer(_this__u8e3s4);
    }
    return tmp;
  }
  function serializer_0(_this__u8e3s4) {
    return StringSerializer_getInstance();
  }
  function serializer_1(_this__u8e3s4) {
    return CharSerializer_getInstance();
  }
  function CharArraySerializer() {
    return CharArraySerializer_getInstance();
  }
  function serializer_2(_this__u8e3s4) {
    return DoubleSerializer_getInstance();
  }
  function DoubleArraySerializer() {
    return DoubleArraySerializer_getInstance();
  }
  function serializer_3(_this__u8e3s4) {
    return FloatSerializer_getInstance();
  }
  function FloatArraySerializer() {
    return FloatArraySerializer_getInstance();
  }
  function serializer_4(_this__u8e3s4) {
    return LongSerializer_getInstance();
  }
  function LongArraySerializer() {
    return LongArraySerializer_getInstance();
  }
  function serializer_5(_this__u8e3s4) {
    return ULongSerializer_getInstance();
  }
  function ULongArraySerializer() {
    return ULongArraySerializer_getInstance();
  }
  function serializer_6(_this__u8e3s4) {
    return IntSerializer_getInstance();
  }
  function IntArraySerializer() {
    return IntArraySerializer_getInstance();
  }
  function serializer_7(_this__u8e3s4) {
    return UIntSerializer_getInstance();
  }
  function UIntArraySerializer() {
    return UIntArraySerializer_getInstance();
  }
  function serializer_8(_this__u8e3s4) {
    return ShortSerializer_getInstance();
  }
  function ShortArraySerializer() {
    return ShortArraySerializer_getInstance();
  }
  function serializer_9(_this__u8e3s4) {
    return UShortSerializer_getInstance();
  }
  function UShortArraySerializer() {
    return UShortArraySerializer_getInstance();
  }
  function serializer_10(_this__u8e3s4) {
    return ByteSerializer_getInstance();
  }
  function ByteArraySerializer() {
    return ByteArraySerializer_getInstance();
  }
  function serializer_11(_this__u8e3s4) {
    return UByteSerializer_getInstance();
  }
  function UByteArraySerializer() {
    return UByteArraySerializer_getInstance();
  }
  function serializer_12(_this__u8e3s4) {
    return BooleanSerializer_getInstance();
  }
  function BooleanArraySerializer() {
    return BooleanArraySerializer_getInstance();
  }
  function serializer_13(_this__u8e3s4) {
    return UnitSerializer_getInstance();
  }
  function NothingSerializer() {
    return NothingSerializer_getInstance();
  }
  function serializer_14(_this__u8e3s4) {
    return DurationSerializer_getInstance();
  }
  function MapEntrySerializer(keySerializer, valueSerializer) {
    return new MapEntrySerializer_0(keySerializer, valueSerializer);
  }
  function PairSerializer(keySerializer, valueSerializer) {
    return new PairSerializer_0(keySerializer, valueSerializer);
  }
  function TripleSerializer(aSerializer, bSerializer, cSerializer) {
    return new TripleSerializer_0(aSerializer, bSerializer, cSerializer);
  }
  function ArraySerializer(kClass, elementSerializer) {
    return new ReferenceArraySerializer(kClass, elementSerializer);
  }
  function MapSerializer(keySerializer, valueSerializer) {
    return new LinkedHashMapSerializer(keySerializer, valueSerializer);
  }
  function ListSerializer(elementSerializer) {
    return new ArrayListSerializer(elementSerializer);
  }
  function withContext(_this__u8e3s4, context) {
    return new ContextDescriptor(_this__u8e3s4, context);
  }
  function ContextDescriptor(original, kClass) {
    this.ub5_1 = original;
    this.vb5_1 = kClass;
    this.wb5_1 = this.ub5_1.xb5() + '<' + this.vb5_1.e7() + '>';
  }
  protoOf(ContextDescriptor).yb5 = function () {
    return this.ub5_1.yb5();
  };
  protoOf(ContextDescriptor).zb5 = function () {
    return this.ub5_1.zb5();
  };
  protoOf(ContextDescriptor).ab6 = function () {
    return this.ub5_1.ab6();
  };
  protoOf(ContextDescriptor).tb5 = function () {
    return this.ub5_1.tb5();
  };
  protoOf(ContextDescriptor).bb6 = function () {
    return this.ub5_1.bb6();
  };
  protoOf(ContextDescriptor).cb6 = function (index) {
    return this.ub5_1.cb6(index);
  };
  protoOf(ContextDescriptor).db6 = function (index) {
    return this.ub5_1.db6(index);
  };
  protoOf(ContextDescriptor).eb6 = function (name) {
    return this.ub5_1.eb6(name);
  };
  protoOf(ContextDescriptor).fb6 = function (index) {
    return this.ub5_1.fb6(index);
  };
  protoOf(ContextDescriptor).gb6 = function (index) {
    return this.ub5_1.gb6(index);
  };
  protoOf(ContextDescriptor).xb5 = function () {
    return this.wb5_1;
  };
  protoOf(ContextDescriptor).equals = function (other) {
    var tmp0_elvis_lhs = other instanceof ContextDescriptor ? other : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var another = tmp;
    return equals(this.ub5_1, another.ub5_1) ? another.vb5_1.equals(this.vb5_1) : false;
  };
  protoOf(ContextDescriptor).hashCode = function () {
    var result = this.vb5_1.hashCode();
    result = imul(31, result) + getStringHashCode(this.wb5_1) | 0;
    return result;
  };
  protoOf(ContextDescriptor).toString = function () {
    return 'ContextDescriptor(kClass: ' + this.vb5_1 + ', original: ' + this.ub5_1 + ')';
  };
  function getContextualDescriptor(_this__u8e3s4, descriptor) {
    var tmp0_safe_receiver = get_capturedKClass(descriptor);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.descriptors.getContextualDescriptor.<anonymous>' call
      var tmp0_safe_receiver_0 = _this__u8e3s4.qb5(tmp0_safe_receiver);
      tmp = tmp0_safe_receiver_0 == null ? null : tmp0_safe_receiver_0.yb4();
    }
    return tmp;
  }
  function get_capturedKClass(_this__u8e3s4) {
    var tmp;
    if (_this__u8e3s4 instanceof ContextDescriptor) {
      tmp = _this__u8e3s4.vb5_1;
    } else {
      if (_this__u8e3s4 instanceof SerialDescriptorForNullable) {
        tmp = get_capturedKClass(_this__u8e3s4.hb6_1);
      } else {
        tmp = null;
      }
    }
    return tmp;
  }
  function SerialDescriptor() {
  }
  function get_elementDescriptors(_this__u8e3s4) {
    // Inline function 'kotlin.collections.Iterable' call
    return new _no_name_provided__qut3iv(_this__u8e3s4);
  }
  function elementDescriptors$1$1($this_elementDescriptors) {
    this.lb6_1 = $this_elementDescriptors;
    this.kb6_1 = $this_elementDescriptors.zb5();
  }
  protoOf(elementDescriptors$1$1).d1 = function () {
    return this.kb6_1 > 0;
  };
  protoOf(elementDescriptors$1$1).f1 = function () {
    var tmp = this.lb6_1.zb5();
    var tmp1 = this.kb6_1;
    this.kb6_1 = tmp1 - 1 | 0;
    return this.lb6_1.db6(tmp - tmp1 | 0);
  };
  function _no_name_provided__qut3iv($this_elementDescriptors) {
    this.mb6_1 = $this_elementDescriptors;
  }
  protoOf(_no_name_provided__qut3iv).o = function () {
    // Inline function 'kotlinx.serialization.descriptors.<get-elementDescriptors>.<anonymous>' call
    return new elementDescriptors$1$1(this.mb6_1);
  };
  function buildSerialDescriptor(serialName, kind, typeParameters, builder) {
    var tmp;
    if (builder === VOID) {
      tmp = buildSerialDescriptor$lambda;
    } else {
      tmp = builder;
    }
    builder = tmp;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.buildSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!equals(kind, CLASS_getInstance())) {
      // Inline function 'kotlinx.serialization.descriptors.buildSerialDescriptor.<anonymous>' call
      var message_0 = "For StructureKind.CLASS please use 'buildClassSerialDescriptor' instead";
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builder(sdBuilder);
    return new SerialDescriptorImpl(serialName, kind, sdBuilder.db5_1.m(), toList(typeParameters), sdBuilder);
  }
  function ClassSerialDescriptorBuilder(serialName) {
    this.ab5_1 = serialName;
    this.bb5_1 = false;
    this.cb5_1 = emptyList();
    this.db5_1 = ArrayList_init_$Create$_0();
    this.eb5_1 = HashSet_init_$Create$();
    this.fb5_1 = ArrayList_init_$Create$_0();
    this.gb5_1 = ArrayList_init_$Create$_0();
    this.hb5_1 = ArrayList_init_$Create$_0();
  }
  protoOf(ClassSerialDescriptorBuilder).nb6 = function (elementName, descriptor, annotations, isOptional) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!this.eb5_1.a1(elementName)) {
      // Inline function 'kotlinx.serialization.descriptors.ClassSerialDescriptorBuilder.element.<anonymous>' call
      var message = "Element with name '" + elementName + "' is already registered in " + this.ab5_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.collections.plusAssign' call
    this.db5_1.a1(elementName);
    // Inline function 'kotlin.collections.plusAssign' call
    this.fb5_1.a1(descriptor);
    // Inline function 'kotlin.collections.plusAssign' call
    this.gb5_1.a1(annotations);
    // Inline function 'kotlin.collections.plusAssign' call
    this.hb5_1.a1(isOptional);
  };
  protoOf(ClassSerialDescriptorBuilder).ib5 = function (elementName, descriptor, annotations, isOptional, $super) {
    annotations = annotations === VOID ? emptyList() : annotations;
    isOptional = isOptional === VOID ? false : isOptional;
    var tmp;
    if ($super === VOID) {
      this.nb6(elementName, descriptor, annotations, isOptional);
      tmp = Unit_instance;
    } else {
      tmp = $super.nb6.call(this, elementName, descriptor, annotations, isOptional);
    }
    return tmp;
  };
  function buildClassSerialDescriptor(serialName, typeParameters, builderAction) {
    var tmp;
    if (builderAction === VOID) {
      tmp = buildClassSerialDescriptor$lambda;
    } else {
      tmp = builderAction;
    }
    builderAction = tmp;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.buildClassSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var sdBuilder = new ClassSerialDescriptorBuilder(serialName);
    builderAction(sdBuilder);
    return new SerialDescriptorImpl(serialName, CLASS_getInstance(), sdBuilder.db5_1.m(), toList(typeParameters), sdBuilder);
  }
  function _get__hashCode__tgwhef($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.zb6_1;
    _hashCode$factory();
    return this_0.s2();
  }
  function SerialDescriptorImpl$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.yb6_1);
    };
  }
  function SerialDescriptorImpl$toString$lambda(this$0) {
    return function (it) {
      return this$0.fb6(it) + ': ' + this$0.db6(it).xb5();
    };
  }
  function SerialDescriptorImpl(serialName, kind, elementsCount, typeParameters, builder) {
    this.ob6_1 = serialName;
    this.pb6_1 = kind;
    this.qb6_1 = elementsCount;
    this.rb6_1 = builder.cb5_1;
    this.sb6_1 = toHashSet(builder.db5_1);
    var tmp = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_0 = builder.db5_1;
    tmp.tb6_1 = copyToArray(this_0);
    this.ub6_1 = compactArray(builder.fb5_1);
    var tmp_0 = this;
    // Inline function 'kotlin.collections.toTypedArray' call
    var this_1 = builder.gb5_1;
    tmp_0.vb6_1 = copyToArray(this_1);
    this.wb6_1 = toBooleanArray(builder.hb5_1);
    var tmp_1 = this;
    // Inline function 'kotlin.collections.map' call
    var this_2 = withIndex(this.tb6_1);
    // Inline function 'kotlin.collections.mapTo' call
    var destination = ArrayList_init_$Create$(collectionSizeOrDefault(this_2, 10));
    var tmp0_iterator = this_2.o();
    while (tmp0_iterator.d1()) {
      var item = tmp0_iterator.f1();
      // Inline function 'kotlinx.serialization.descriptors.SerialDescriptorImpl.name2Index.<anonymous>' call
      var tmp$ret$2 = to(item.he_1, item.ge_1);
      destination.a1(tmp$ret$2);
    }
    tmp_1.xb6_1 = toMap(destination);
    this.yb6_1 = compactArray(typeParameters);
    var tmp_2 = this;
    tmp_2.zb6_1 = lazy_0(SerialDescriptorImpl$_hashCode$delegate$lambda(this));
  }
  protoOf(SerialDescriptorImpl).xb5 = function () {
    return this.ob6_1;
  };
  protoOf(SerialDescriptorImpl).bb6 = function () {
    return this.pb6_1;
  };
  protoOf(SerialDescriptorImpl).zb5 = function () {
    return this.qb6_1;
  };
  protoOf(SerialDescriptorImpl).yb5 = function () {
    return this.rb6_1;
  };
  protoOf(SerialDescriptorImpl).ab7 = function () {
    return this.sb6_1;
  };
  protoOf(SerialDescriptorImpl).fb6 = function (index) {
    return getChecked(this.tb6_1, index);
  };
  protoOf(SerialDescriptorImpl).eb6 = function (name) {
    var tmp0_elvis_lhs = this.xb6_1.z2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = -3;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(SerialDescriptorImpl).cb6 = function (index) {
    return getChecked(this.vb6_1, index);
  };
  protoOf(SerialDescriptorImpl).db6 = function (index) {
    return getChecked(this.ub6_1, index);
  };
  protoOf(SerialDescriptorImpl).gb6 = function (index) {
    return getChecked_0(this.wb6_1, index);
  };
  protoOf(SerialDescriptorImpl).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof SerialDescriptorImpl)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.xb5() === other.xb5())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.descriptors.SerialDescriptorImpl.equals.<anonymous>' call
      if (!contentEquals(this.yb6_1, other.yb6_1)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.zb5() === other.zb5())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.zb5();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.db6(index).xb5() === other.db6(index).xb5())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.db6(index).bb6(), other.db6(index).bb6())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(SerialDescriptorImpl).hashCode = function () {
    return _get__hashCode__tgwhef(this);
  };
  protoOf(SerialDescriptorImpl).toString = function () {
    var tmp = until(0, this.qb6_1);
    var tmp_0 = this.ob6_1 + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, SerialDescriptorImpl$toString$lambda(this));
  };
  function PrimitiveSerialDescriptor(serialName, kind) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.text.isNotBlank' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!isBlank(serialName)) {
      // Inline function 'kotlinx.serialization.descriptors.PrimitiveSerialDescriptor.<anonymous>' call
      var message = 'Blank serial names are prohibited';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return PrimitiveDescriptorSafe(serialName, kind);
  }
  function buildSerialDescriptor$lambda($this$null) {
    return Unit_instance;
  }
  function buildClassSerialDescriptor$lambda($this$null) {
    return Unit_instance;
  }
  function _hashCode$factory() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef(receiver);
    }, null);
  }
  function ENUM() {
    ENUM_instance = this;
    SerialKind.call(this);
  }
  var ENUM_instance;
  function ENUM_getInstance() {
    if (ENUM_instance == null)
      new ENUM();
    return ENUM_instance;
  }
  function CONTEXTUAL() {
    CONTEXTUAL_instance = this;
    SerialKind.call(this);
  }
  var CONTEXTUAL_instance;
  function CONTEXTUAL_getInstance() {
    if (CONTEXTUAL_instance == null)
      new CONTEXTUAL();
    return CONTEXTUAL_instance;
  }
  function SerialKind() {
  }
  protoOf(SerialKind).toString = function () {
    return ensureNotNull(getKClassFromExpression(this).e7());
  };
  protoOf(SerialKind).hashCode = function () {
    return getStringHashCode(this.toString());
  };
  function BOOLEAN() {
    BOOLEAN_instance = this;
    PrimitiveKind.call(this);
  }
  var BOOLEAN_instance;
  function BOOLEAN_getInstance() {
    if (BOOLEAN_instance == null)
      new BOOLEAN();
    return BOOLEAN_instance;
  }
  function BYTE() {
    BYTE_instance = this;
    PrimitiveKind.call(this);
  }
  var BYTE_instance;
  function BYTE_getInstance() {
    if (BYTE_instance == null)
      new BYTE();
    return BYTE_instance;
  }
  function CHAR() {
    CHAR_instance = this;
    PrimitiveKind.call(this);
  }
  var CHAR_instance;
  function CHAR_getInstance() {
    if (CHAR_instance == null)
      new CHAR();
    return CHAR_instance;
  }
  function SHORT() {
    SHORT_instance = this;
    PrimitiveKind.call(this);
  }
  var SHORT_instance;
  function SHORT_getInstance() {
    if (SHORT_instance == null)
      new SHORT();
    return SHORT_instance;
  }
  function INT() {
    INT_instance = this;
    PrimitiveKind.call(this);
  }
  var INT_instance;
  function INT_getInstance() {
    if (INT_instance == null)
      new INT();
    return INT_instance;
  }
  function LONG() {
    LONG_instance = this;
    PrimitiveKind.call(this);
  }
  var LONG_instance;
  function LONG_getInstance() {
    if (LONG_instance == null)
      new LONG();
    return LONG_instance;
  }
  function FLOAT() {
    FLOAT_instance = this;
    PrimitiveKind.call(this);
  }
  var FLOAT_instance;
  function FLOAT_getInstance() {
    if (FLOAT_instance == null)
      new FLOAT();
    return FLOAT_instance;
  }
  function DOUBLE() {
    DOUBLE_instance = this;
    PrimitiveKind.call(this);
  }
  var DOUBLE_instance;
  function DOUBLE_getInstance() {
    if (DOUBLE_instance == null)
      new DOUBLE();
    return DOUBLE_instance;
  }
  function STRING() {
    STRING_instance = this;
    PrimitiveKind.call(this);
  }
  var STRING_instance;
  function STRING_getInstance() {
    if (STRING_instance == null)
      new STRING();
    return STRING_instance;
  }
  function PrimitiveKind() {
    SerialKind.call(this);
  }
  function CLASS() {
    CLASS_instance = this;
    StructureKind.call(this);
  }
  var CLASS_instance;
  function CLASS_getInstance() {
    if (CLASS_instance == null)
      new CLASS();
    return CLASS_instance;
  }
  function LIST() {
    LIST_instance = this;
    StructureKind.call(this);
  }
  var LIST_instance;
  function LIST_getInstance() {
    if (LIST_instance == null)
      new LIST();
    return LIST_instance;
  }
  function MAP() {
    MAP_instance = this;
    StructureKind.call(this);
  }
  var MAP_instance;
  function MAP_getInstance() {
    if (MAP_instance == null)
      new MAP();
    return MAP_instance;
  }
  function OBJECT() {
    OBJECT_instance = this;
    StructureKind.call(this);
  }
  var OBJECT_instance;
  function OBJECT_getInstance() {
    if (OBJECT_instance == null)
      new OBJECT();
    return OBJECT_instance;
  }
  function StructureKind() {
    SerialKind.call(this);
  }
  function SEALED() {
    SEALED_instance = this;
    PolymorphicKind.call(this);
  }
  var SEALED_instance;
  function SEALED_getInstance() {
    if (SEALED_instance == null)
      new SEALED();
    return SEALED_instance;
  }
  function OPEN() {
    OPEN_instance = this;
    PolymorphicKind.call(this);
  }
  var OPEN_instance;
  function OPEN_getInstance() {
    if (OPEN_instance == null)
      new OPEN();
    return OPEN_instance;
  }
  function PolymorphicKind() {
    SerialKind.call(this);
  }
  function AbstractDecoder() {
  }
  protoOf(AbstractDecoder).bb7 = function () {
    throw SerializationException_init_$Create$_0('' + getKClassFromExpression(this) + " can't retrieve untyped values");
  };
  protoOf(AbstractDecoder).cb7 = function () {
    return true;
  };
  protoOf(AbstractDecoder).db7 = function () {
    return null;
  };
  protoOf(AbstractDecoder).eb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).fb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).gb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).hb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).ib7 = function () {
    var tmp = this.bb7();
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).jb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).kb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).lb7 = function () {
    var tmp = this.bb7();
    return tmp instanceof Char ? tmp.ia_1 : THROW_CCE();
  };
  protoOf(AbstractDecoder).mb7 = function () {
    var tmp = this.bb7();
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(AbstractDecoder).nb7 = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).ob7 = function (deserializer, previousValue) {
    return this.pb7(deserializer);
  };
  protoOf(AbstractDecoder).qb7 = function (descriptor) {
    return this;
  };
  protoOf(AbstractDecoder).rb7 = function (descriptor) {
  };
  protoOf(AbstractDecoder).sb7 = function (descriptor, index) {
    return this.eb7();
  };
  protoOf(AbstractDecoder).tb7 = function (descriptor, index) {
    return this.fb7();
  };
  protoOf(AbstractDecoder).ub7 = function (descriptor, index) {
    return this.gb7();
  };
  protoOf(AbstractDecoder).vb7 = function (descriptor, index) {
    return this.hb7();
  };
  protoOf(AbstractDecoder).wb7 = function (descriptor, index) {
    return this.ib7();
  };
  protoOf(AbstractDecoder).xb7 = function (descriptor, index) {
    return this.jb7();
  };
  protoOf(AbstractDecoder).yb7 = function (descriptor, index) {
    return this.kb7();
  };
  protoOf(AbstractDecoder).zb7 = function (descriptor, index) {
    return this.lb7();
  };
  protoOf(AbstractDecoder).ab8 = function (descriptor, index) {
    return this.mb7();
  };
  protoOf(AbstractDecoder).bb8 = function (descriptor, index) {
    return this.nb7(descriptor.db6(index));
  };
  protoOf(AbstractDecoder).cb8 = function (descriptor, index, deserializer, previousValue) {
    return this.ob7(deserializer, previousValue);
  };
  protoOf(AbstractDecoder).eb8 = function (descriptor, index, deserializer, previousValue) {
    // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
    var isNullabilitySupported = deserializer.yb4().tb5();
    var tmp;
    if (isNullabilitySupported ? true : this.cb7()) {
      // Inline function 'kotlinx.serialization.encoding.AbstractDecoder.decodeNullableSerializableElement.<anonymous>' call
      tmp = this.ob7(deserializer, previousValue);
    } else {
      tmp = this.db7();
    }
    return tmp;
  };
  function Decoder() {
  }
  function Companion() {
    this.jb8_1 = -1;
    this.kb8_1 = -3;
  }
  var Companion_instance_0;
  function Companion_getInstance_6() {
    return Companion_instance_0;
  }
  function CompositeDecoder() {
  }
  function decodeSequentially_0($this, compositeDecoder) {
    var klassName = compositeDecoder.ab8($this.yb4(), 0);
    var serializer = findPolymorphicSerializer($this, compositeDecoder, klassName);
    return compositeDecoder.db8($this.yb4(), 1, serializer);
  }
  function AbstractPolymorphicSerializer() {
  }
  protoOf(AbstractPolymorphicSerializer).zb4 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.yb4();
    var composite = decoder.qb7(descriptor);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>' call
      var klassName = null;
      var value = null;
      if (composite.gb8()) {
        tmp$ret$0 = decodeSequentially_0(this, composite);
        break $l$block;
      }
      mainLoop: while (true) {
        var index = composite.hb8(this.yb4());
        if (index === -1) {
          break mainLoop;
        } else {
          if (index === 0) {
            klassName = composite.ab8(this.yb4(), index);
          } else {
            if (index === 1) {
              var tmp$ret$2;
              $l$block_0: {
                // Inline function 'kotlin.requireNotNull' call
                var value_0 = klassName;
                // Inline function 'kotlin.contracts.contract' call
                if (value_0 == null) {
                  // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>.<anonymous>' call
                  var message = 'Cannot read polymorphic value before its type token';
                  throw IllegalArgumentException_init_$Create$(toString(message));
                } else {
                  tmp$ret$2 = value_0;
                  break $l$block_0;
                }
              }
              klassName = tmp$ret$2;
              var serializer = findPolymorphicSerializer(this, composite, klassName);
              value = composite.db8(this.yb4(), index, serializer);
            } else {
              var tmp0_elvis_lhs = klassName;
              throw SerializationException_init_$Create$_0('Invalid index in polymorphic deserialization of ' + (tmp0_elvis_lhs == null ? 'unknown class' : tmp0_elvis_lhs) + ('\n Expected 0, 1 or DECODE_DONE(-1), but found ' + index));
            }
          }
        }
      }
      var tmp$ret$4;
      $l$block_1: {
        // Inline function 'kotlin.requireNotNull' call
        var value_1 = value;
        // Inline function 'kotlin.contracts.contract' call
        if (value_1 == null) {
          // Inline function 'kotlinx.serialization.internal.AbstractPolymorphicSerializer.deserialize.<anonymous>.<anonymous>' call
          var message_0 = 'Polymorphic value has not been read for class ' + klassName;
          throw IllegalArgumentException_init_$Create$(toString(message_0));
        } else {
          tmp$ret$4 = value_1;
          break $l$block_1;
        }
      }
      var tmp = tmp$ret$4;
      tmp$ret$0 = !(tmp == null) ? tmp : THROW_CCE();
    }
    var result = tmp$ret$0;
    composite.rb7(descriptor);
    return result;
  };
  protoOf(AbstractPolymorphicSerializer).nb5 = function (decoder, klassName) {
    return decoder.fb8().lb8(this.mb5(), klassName);
  };
  function throwSubtypeNotRegistered(subClassName, baseClass) {
    var scope = "in the polymorphic scope of '" + baseClass.e7() + "'";
    throw SerializationException_init_$Create$_0(subClassName == null ? 'Class discriminator was missing and no default serializers were registered ' + scope + '.' : "Serializer for subclass '" + subClassName + "' is not found " + scope + '.\n' + ("Check if class with serial name '" + subClassName + "' exists and serializer is registered in a corresponding SerializersModule.\n") + ("To be registered automatically, class '" + subClassName + "' has to be '@Serializable', and the base class '" + baseClass.e7() + "' has to be sealed and '@Serializable'."));
  }
  function NothingSerializer_0() {
    NothingSerializer_instance = this;
    this.mb8_1 = NothingSerialDescriptor_getInstance();
  }
  protoOf(NothingSerializer_0).yb4 = function () {
    return this.mb8_1;
  };
  protoOf(NothingSerializer_0).zb4 = function (decoder) {
    throw SerializationException_init_$Create$_0("'kotlin.Nothing' does not have instances");
  };
  var NothingSerializer_instance;
  function NothingSerializer_getInstance() {
    if (NothingSerializer_instance == null)
      new NothingSerializer_0();
    return NothingSerializer_instance;
  }
  function DurationSerializer() {
    DurationSerializer_instance = this;
    this.nb8_1 = new PrimitiveSerialDescriptor_0('kotlin.time.Duration', STRING_getInstance());
  }
  protoOf(DurationSerializer).yb4 = function () {
    return this.nb8_1;
  };
  protoOf(DurationSerializer).ob8 = function (decoder) {
    return Companion_getInstance().ch(decoder.mb7());
  };
  protoOf(DurationSerializer).zb4 = function (decoder) {
    return new Duration(this.ob8(decoder));
  };
  var DurationSerializer_instance;
  function DurationSerializer_getInstance() {
    if (DurationSerializer_instance == null)
      new DurationSerializer();
    return DurationSerializer_instance;
  }
  function CachedNames() {
  }
  function ArrayListClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayListClassDesc).xb5 = function () {
    return 'kotlin.collections.ArrayList';
  };
  function HashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(HashSetClassDesc).xb5 = function () {
    return 'kotlin.collections.HashSet';
  };
  function LinkedHashSetClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(LinkedHashSetClassDesc).xb5 = function () {
    return 'kotlin.collections.LinkedHashSet';
  };
  function HashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.HashMap', keyDesc, valueDesc);
  }
  function LinkedHashMapClassDesc(keyDesc, valueDesc) {
    MapLikeDescriptor.call(this, 'kotlin.collections.LinkedHashMap', keyDesc, valueDesc);
  }
  function ArrayClassDesc(elementDesc) {
    ListLikeDescriptor.call(this, elementDesc);
  }
  protoOf(ArrayClassDesc).xb5 = function () {
    return 'kotlin.Array';
  };
  function ListLikeDescriptor(elementDescriptor) {
    this.rb8_1 = elementDescriptor;
    this.sb8_1 = 1;
  }
  protoOf(ListLikeDescriptor).bb6 = function () {
    return LIST_getInstance();
  };
  protoOf(ListLikeDescriptor).zb5 = function () {
    return this.sb8_1;
  };
  protoOf(ListLikeDescriptor).fb6 = function (index) {
    return index.toString();
  };
  protoOf(ListLikeDescriptor).eb6 = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid list index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(ListLikeDescriptor).gb6 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.isElementOptional.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.xb5() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(ListLikeDescriptor).cb6 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.getElementAnnotations.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.xb5() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(ListLikeDescriptor).db6 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.ListLikeDescriptor.getElementDescriptor.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.xb5() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return this.rb8_1;
  };
  protoOf(ListLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof ListLikeDescriptor))
      return false;
    if (equals(this.rb8_1, other.rb8_1) ? this.xb5() === other.xb5() : false)
      return true;
    return false;
  };
  protoOf(ListLikeDescriptor).hashCode = function () {
    return imul(hashCode(this.rb8_1), 31) + getStringHashCode(this.xb5()) | 0;
  };
  protoOf(ListLikeDescriptor).toString = function () {
    return this.xb5() + '(' + this.rb8_1 + ')';
  };
  function MapLikeDescriptor(serialName, keyDescriptor, valueDescriptor) {
    this.xb8_1 = serialName;
    this.yb8_1 = keyDescriptor;
    this.zb8_1 = valueDescriptor;
    this.ab9_1 = 2;
  }
  protoOf(MapLikeDescriptor).xb5 = function () {
    return this.xb8_1;
  };
  protoOf(MapLikeDescriptor).bb6 = function () {
    return MAP_getInstance();
  };
  protoOf(MapLikeDescriptor).zb5 = function () {
    return this.ab9_1;
  };
  protoOf(MapLikeDescriptor).fb6 = function (index) {
    return index.toString();
  };
  protoOf(MapLikeDescriptor).eb6 = function (name) {
    var tmp0_elvis_lhs = toIntOrNull(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalArgumentException_init_$Create$(name + ' is not a valid map index');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).gb6 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.isElementOptional.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.xb5() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return false;
  };
  protoOf(MapLikeDescriptor).cb6 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.getElementAnnotations.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.xb5() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    return emptyList();
  };
  protoOf(MapLikeDescriptor).db6 = function (index) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(index >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeDescriptor.getElementDescriptor.<anonymous>' call
      var message = 'Illegal index ' + index + ', ' + this.xb5() + ' expects only non-negative indices';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var tmp;
    switch (index % 2 | 0) {
      case 0:
        tmp = this.yb8_1;
        break;
      case 1:
        tmp = this.zb8_1;
        break;
      default:
        var message_0 = 'Unreached';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MapLikeDescriptor).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapLikeDescriptor))
      return false;
    if (!(this.xb5() === other.xb5()))
      return false;
    if (!equals(this.yb8_1, other.yb8_1))
      return false;
    if (!equals(this.zb8_1, other.zb8_1))
      return false;
    return true;
  };
  protoOf(MapLikeDescriptor).hashCode = function () {
    var result = getStringHashCode(this.xb5());
    result = imul(31, result) + hashCode(this.yb8_1) | 0;
    result = imul(31, result) + hashCode(this.zb8_1) | 0;
    return result;
  };
  protoOf(MapLikeDescriptor).toString = function () {
    return this.xb5() + '(' + this.yb8_1 + ', ' + this.zb8_1 + ')';
  };
  function PrimitiveArrayDescriptor(primitive) {
    ListLikeDescriptor.call(this, primitive);
    this.fb9_1 = primitive.xb5() + 'Array';
  }
  protoOf(PrimitiveArrayDescriptor).xb5 = function () {
    return this.fb9_1;
  };
  function ArrayListSerializer(element) {
    CollectionSerializer.call(this, element);
    this.hb9_1 = new ArrayListClassDesc(element.yb4());
  }
  protoOf(ArrayListSerializer).yb4 = function () {
    return this.hb9_1;
  };
  protoOf(ArrayListSerializer).m1r = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ArrayListSerializer).ib9 = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ArrayListSerializer).jb9 = function (_this__u8e3s4) {
    return this.ib9(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).kb9 = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(ArrayListSerializer).lb9 = function (_this__u8e3s4) {
    return this.kb9(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).mb9 = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? ArrayList_init_$Create$_1(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(ArrayListSerializer).nb9 = function (_this__u8e3s4) {
    return this.mb9((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, List) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ArrayListSerializer).ob9 = function (_this__u8e3s4, size) {
    return _this__u8e3s4.g3(size);
  };
  protoOf(ArrayListSerializer).pb9 = function (_this__u8e3s4, size) {
    return this.ob9(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ArrayListSerializer).qb9 = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.a2(index, element);
  };
  protoOf(ArrayListSerializer).rb9 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.qb9(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.yb9_1 = new HashSetClassDesc(eSerializer.yb4());
  }
  protoOf(HashSetSerializer).yb4 = function () {
    return this.yb9_1;
  };
  protoOf(HashSetSerializer).m1r = function () {
    return HashSet_init_$Create$();
  };
  protoOf(HashSetSerializer).zb9 = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(HashSetSerializer).jb9 = function (_this__u8e3s4) {
    return this.zb9(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).aba = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashSetSerializer).lb9 = function (_this__u8e3s4) {
    return this.aba(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).bba = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashSetSerializer).nb9 = function (_this__u8e3s4) {
    return this.bba((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Set) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashSetSerializer).cba = function (_this__u8e3s4, size) {
  };
  protoOf(HashSetSerializer).pb9 = function (_this__u8e3s4, size) {
    return this.cba(_this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(HashSetSerializer).dba = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.a1(element);
  };
  protoOf(HashSetSerializer).rb9 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof HashSet ? _this__u8e3s4 : THROW_CCE();
    return this.dba(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function LinkedHashSetSerializer(eSerializer) {
    CollectionSerializer.call(this, eSerializer);
    this.fba_1 = new LinkedHashSetClassDesc(eSerializer.yb4());
  }
  protoOf(LinkedHashSetSerializer).yb4 = function () {
    return this.fba_1;
  };
  protoOf(LinkedHashSetSerializer).m1r = function () {
    // Inline function 'kotlin.collections.linkedSetOf' call
    return LinkedHashSet_init_$Create$();
  };
  protoOf(LinkedHashSetSerializer).gba = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(LinkedHashSetSerializer).jb9 = function (_this__u8e3s4) {
    return this.gba(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).hba = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashSetSerializer).lb9 = function (_this__u8e3s4) {
    return this.hba(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).bba = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashSet_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashSetSerializer).nb9 = function (_this__u8e3s4) {
    return this.bba((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Set) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashSetSerializer).iba = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashSetSerializer).pb9 = function (_this__u8e3s4, size) {
    return this.iba(_this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(LinkedHashSetSerializer).jba = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.a1(element);
  };
  protoOf(LinkedHashSetSerializer).rb9 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof LinkedHashSet ? _this__u8e3s4 : THROW_CCE();
    return this.jba(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function HashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.mba_1 = new HashMapClassDesc(kSerializer.yb4(), vSerializer.yb4());
  }
  protoOf(HashMapSerializer).yb4 = function () {
    return this.mba_1;
  };
  protoOf(HashMapSerializer).m1r = function () {
    return HashMap_init_$Create$();
  };
  protoOf(HashMapSerializer).nba = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(HashMapSerializer).jb9 = function (_this__u8e3s4) {
    return this.nba(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).oba = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(HashMapSerializer).lb9 = function (_this__u8e3s4) {
    return this.oba(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).pba = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? HashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(HashMapSerializer).nb9 = function (_this__u8e3s4) {
    return this.pba((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(HashMapSerializer).qba = function (_this__u8e3s4, size) {
  };
  protoOf(HashMapSerializer).pb9 = function (_this__u8e3s4, size) {
    return this.qba(_this__u8e3s4 instanceof HashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function LinkedHashMapSerializer(kSerializer, vSerializer) {
    MapLikeSerializer.call(this, kSerializer, vSerializer);
    this.xba_1 = new LinkedHashMapClassDesc(kSerializer.yb4(), vSerializer.yb4());
  }
  protoOf(LinkedHashMapSerializer).yb4 = function () {
    return this.xba_1;
  };
  protoOf(LinkedHashMapSerializer).m1r = function () {
    return LinkedHashMap_init_$Create$();
  };
  protoOf(LinkedHashMapSerializer).yba = function (_this__u8e3s4) {
    return imul(_this__u8e3s4.m(), 2);
  };
  protoOf(LinkedHashMapSerializer).jb9 = function (_this__u8e3s4) {
    return this.yba(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).zba = function (_this__u8e3s4) {
    return _this__u8e3s4;
  };
  protoOf(LinkedHashMapSerializer).lb9 = function (_this__u8e3s4) {
    return this.zba(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).pba = function (_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : null;
    return tmp0_elvis_lhs == null ? LinkedHashMap_init_$Create$_0(_this__u8e3s4) : tmp0_elvis_lhs;
  };
  protoOf(LinkedHashMapSerializer).nb9 = function (_this__u8e3s4) {
    return this.pba((!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Map) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LinkedHashMapSerializer).abb = function (_this__u8e3s4, size) {
  };
  protoOf(LinkedHashMapSerializer).pb9 = function (_this__u8e3s4, size) {
    return this.abb(_this__u8e3s4 instanceof LinkedHashMap ? _this__u8e3s4 : THROW_CCE(), size);
  };
  function ReferenceArraySerializer(kClass, eSerializer) {
    CollectionLikeSerializer.call(this, eSerializer);
    this.cbb_1 = kClass;
    this.dbb_1 = new ArrayClassDesc(eSerializer.yb4());
  }
  protoOf(ReferenceArraySerializer).yb4 = function () {
    return this.dbb_1;
  };
  protoOf(ReferenceArraySerializer).m1r = function () {
    // Inline function 'kotlin.collections.arrayListOf' call
    return ArrayList_init_$Create$_0();
  };
  protoOf(ReferenceArraySerializer).ebb = function (_this__u8e3s4) {
    return _this__u8e3s4.m();
  };
  protoOf(ReferenceArraySerializer).jb9 = function (_this__u8e3s4) {
    return this.ebb(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).fbb = function (_this__u8e3s4) {
    return toNativeArrayImpl(_this__u8e3s4, this.cbb_1);
  };
  protoOf(ReferenceArraySerializer).lb9 = function (_this__u8e3s4) {
    return this.fbb(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).gbb = function (_this__u8e3s4) {
    return ArrayList_init_$Create$_1(asList(_this__u8e3s4));
  };
  protoOf(ReferenceArraySerializer).nb9 = function (_this__u8e3s4) {
    return this.gbb((!(_this__u8e3s4 == null) ? isArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ReferenceArraySerializer).hbb = function (_this__u8e3s4, size) {
    return _this__u8e3s4.g3(size);
  };
  protoOf(ReferenceArraySerializer).pb9 = function (_this__u8e3s4, size) {
    return this.hbb(_this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(ReferenceArraySerializer).ibb = function (_this__u8e3s4, index, element) {
    _this__u8e3s4.a2(index, element);
  };
  protoOf(ReferenceArraySerializer).rb9 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof ArrayList ? _this__u8e3s4 : THROW_CCE();
    return this.ibb(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  function CollectionSerializer(element) {
    CollectionLikeSerializer.call(this, element);
  }
  function MapLikeSerializer(keySerializer, valueSerializer) {
    AbstractCollectionSerializer.call(this);
    this.rba_1 = keySerializer;
    this.sba_1 = valueSerializer;
  }
  protoOf(MapLikeSerializer).tba = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(size >= 0)) {
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readAll.<anonymous>' call
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var progression = step(until(0, imul(size, 2)), 2);
    var inductionVariable = progression.aa_1;
    var last = progression.ba_1;
    var step_0 = progression.ca_1;
    if ((step_0 > 0 ? inductionVariable <= last : false) ? true : step_0 < 0 ? last <= inductionVariable : false)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + step_0 | 0;
        this.uba(decoder, startIndex + index | 0, builder, false);
      }
       while (!(index === last));
  };
  protoOf(MapLikeSerializer).tb9 = function (decoder, builder, startIndex, size) {
    return this.tba(decoder, (!(builder == null) ? isInterface(builder, MutableMap) : false) ? builder : THROW_CCE(), startIndex, size);
  };
  protoOf(MapLikeSerializer).uba = function (decoder, index, builder, checkIndex) {
    var key = decoder.db8(this.yb4(), index, this.rba_1);
    var tmp;
    if (checkIndex) {
      // Inline function 'kotlin.also' call
      var this_0 = decoder.hb8(this.yb4());
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readElement.<anonymous>' call
      // Inline function 'kotlin.require' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(this_0 === (index + 1 | 0))) {
        // Inline function 'kotlinx.serialization.internal.MapLikeSerializer.readElement.<anonymous>.<anonymous>' call
        var message = 'Value must follow key in a map, index for key: ' + index + ', returned index for value: ' + this_0;
        throw IllegalArgumentException_init_$Create$(toString(message));
      }
      tmp = this_0;
    } else {
      tmp = index + 1 | 0;
    }
    var vIndex = tmp;
    var tmp_0;
    var tmp_1;
    if (builder.w2(key)) {
      var tmp_2 = this.sba_1.yb4().bb6();
      tmp_1 = !(tmp_2 instanceof PrimitiveKind);
    } else {
      tmp_1 = false;
    }
    if (tmp_1) {
      tmp_0 = decoder.cb8(this.yb4(), vIndex, this.sba_1, getValue(builder, key));
    } else {
      tmp_0 = decoder.db8(this.yb4(), vIndex, this.sba_1);
    }
    var value = tmp_0;
    // Inline function 'kotlin.collections.set' call
    builder.p2(key, value);
  };
  protoOf(MapLikeSerializer).ub9 = function (decoder, index, builder, checkIndex) {
    return this.uba(decoder, index, (!(builder == null) ? isInterface(builder, MutableMap) : false) ? builder : THROW_CCE(), checkIndex);
  };
  function CollectionLikeSerializer(elementSerializer) {
    AbstractCollectionSerializer.call(this);
    this.sb9_1 = elementSerializer;
  }
  protoOf(CollectionLikeSerializer).tb9 = function (decoder, builder, startIndex, size) {
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(size >= 0)) {
      // Inline function 'kotlinx.serialization.internal.CollectionLikeSerializer.readAll.<anonymous>' call
      var message = 'Size must be known in advance when using READ_ALL';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    var inductionVariable = 0;
    if (inductionVariable < size)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        this.ub9(decoder, startIndex + index | 0, builder, false);
      }
       while (inductionVariable < size);
  };
  protoOf(CollectionLikeSerializer).ub9 = function (decoder, index, builder, checkIndex) {
    this.rb9(builder, index, decoder.db8(this.yb4(), index, this.sb9_1));
  };
  function readSize($this, decoder, builder) {
    var size = decoder.ib8($this.yb4());
    $this.pb9(builder, size);
    return size;
  }
  function AbstractCollectionSerializer() {
  }
  protoOf(AbstractCollectionSerializer).wb9 = function (decoder, previous) {
    var tmp1_elvis_lhs = previous == null ? null : this.nb9(previous);
    var builder = tmp1_elvis_lhs == null ? this.m1r() : tmp1_elvis_lhs;
    var startIndex = this.jb9(builder);
    var compositeDecoder = decoder.qb7(this.yb4());
    if (compositeDecoder.gb8()) {
      this.tb9(compositeDecoder, builder, startIndex, readSize(this, compositeDecoder, builder));
    } else {
      $l$loop: while (true) {
        var index = compositeDecoder.hb8(this.yb4());
        if (index === -1)
          break $l$loop;
        this.vb9(compositeDecoder, startIndex + index | 0, builder);
      }
    }
    compositeDecoder.rb7(this.yb4());
    return this.lb9(builder);
  };
  protoOf(AbstractCollectionSerializer).zb4 = function (decoder) {
    return this.wb9(decoder, null);
  };
  protoOf(AbstractCollectionSerializer).vb9 = function (decoder, index, builder, checkIndex, $super) {
    checkIndex = checkIndex === VOID ? true : checkIndex;
    var tmp;
    if ($super === VOID) {
      this.ub9(decoder, index, builder, checkIndex);
      tmp = Unit_instance;
    } else {
      tmp = $super.ub9.call(this, decoder, index, builder, checkIndex);
    }
    return tmp;
  };
  function PrimitiveArraySerializer(primitiveSerializer) {
    CollectionLikeSerializer.call(this, primitiveSerializer);
    this.kbb_1 = new PrimitiveArrayDescriptor(primitiveSerializer.yb4());
  }
  protoOf(PrimitiveArraySerializer).yb4 = function () {
    return this.kbb_1;
  };
  protoOf(PrimitiveArraySerializer).lbb = function (_this__u8e3s4) {
    return _this__u8e3s4.z4p();
  };
  protoOf(PrimitiveArraySerializer).jb9 = function (_this__u8e3s4) {
    return this.lbb(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).mbb = function (_this__u8e3s4) {
    return _this__u8e3s4.n1r();
  };
  protoOf(PrimitiveArraySerializer).lb9 = function (_this__u8e3s4) {
    return this.mbb(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).nbb = function (_this__u8e3s4, size) {
    return _this__u8e3s4.g3(size);
  };
  protoOf(PrimitiveArraySerializer).pb9 = function (_this__u8e3s4, size) {
    return this.nbb(_this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE(), size);
  };
  protoOf(PrimitiveArraySerializer).obb = function (_this__u8e3s4, index, element) {
    var message = 'This method lead to boxing and must not be used, use Builder.append instead';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(PrimitiveArraySerializer).rb9 = function (_this__u8e3s4, index, element) {
    var tmp = _this__u8e3s4 instanceof PrimitiveArrayBuilder ? _this__u8e3s4 : THROW_CCE();
    return this.obb(tmp, index, (element == null ? true : !(element == null)) ? element : THROW_CCE());
  };
  protoOf(PrimitiveArraySerializer).m1r = function () {
    return this.nb9(this.pbb());
  };
  protoOf(PrimitiveArraySerializer).zb4 = function (decoder) {
    return this.wb9(decoder, null);
  };
  function PrimitiveArrayBuilder() {
  }
  protoOf(PrimitiveArrayBuilder).rbb = function (requiredCapacity, $super) {
    requiredCapacity = requiredCapacity === VOID ? this.z4p() + 1 | 0 : requiredCapacity;
    var tmp;
    if ($super === VOID) {
      this.g3(requiredCapacity);
      tmp = Unit_instance;
    } else {
      tmp = $super.g3.call(this, requiredCapacity);
    }
    return tmp;
  };
  function Companion_0() {
    Companion_instance_1 = this;
    this.sbb_1 = longArray(0);
  }
  var Companion_instance_1;
  function Companion_getInstance_7() {
    if (Companion_instance_1 == null)
      new Companion_0();
    return Companion_instance_1;
  }
  function prepareHighMarksArray($this, elementsCount) {
    var slotsCount = (elementsCount - 1 | 0) >>> 6 | 0;
    Companion_getInstance_0();
    var elementsInLastSlot = elementsCount & (64 - 1 | 0);
    var highMarks = longArray(slotsCount);
    if (!(elementsInLastSlot === 0)) {
      highMarks[get_lastIndex(highMarks)] = (new Long(-1, -1)).kb(elementsCount);
    }
    return highMarks;
  }
  function markHigh($this, index) {
    var slot = (index >>> 6 | 0) - 1 | 0;
    Companion_getInstance_0();
    var offsetInSlot = index & (64 - 1 | 0);
    $this.wbb_1[slot] = $this.wbb_1[slot].ob((new Long(1, 0)).kb(offsetInSlot));
  }
  function nextUnmarkedHighIndex($this) {
    var inductionVariable = 0;
    var last = $this.wbb_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var slot = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        var tmp = slot + 1 | 0;
        Companion_getInstance_0();
        var slotOffset = imul(tmp, 64);
        var slotMarks = $this.wbb_1[slot];
        while (!slotMarks.equals(new Long(-1, -1))) {
          var indexInSlot = countTrailingZeroBits(slotMarks.jb());
          slotMarks = slotMarks.ob((new Long(1, 0)).kb(indexInSlot));
          var index = slotOffset + indexInSlot | 0;
          if ($this.ubb_1($this.tbb_1, index)) {
            $this.wbb_1[slot] = slotMarks;
            return index;
          }
        }
        $this.wbb_1[slot] = slotMarks;
      }
       while (inductionVariable <= last);
    return -1;
  }
  function ElementMarker(descriptor, readIfAbsent) {
    Companion_getInstance_7();
    this.tbb_1 = descriptor;
    this.ubb_1 = readIfAbsent;
    var elementsCount = this.tbb_1.zb5();
    Companion_getInstance_0();
    if (elementsCount <= 64) {
      var tmp = this;
      var tmp_0;
      Companion_getInstance_0();
      if (elementsCount === 64) {
        tmp_0 = new Long(0, 0);
      } else {
        tmp_0 = (new Long(-1, -1)).kb(elementsCount);
      }
      tmp.vbb_1 = tmp_0;
      this.wbb_1 = Companion_getInstance_7().sbb_1;
    } else {
      this.vbb_1 = new Long(0, 0);
      this.wbb_1 = prepareHighMarksArray(this, elementsCount);
    }
  }
  protoOf(ElementMarker).xbb = function (index) {
    Companion_getInstance_0();
    if (index < 64) {
      this.vbb_1 = this.vbb_1.ob((new Long(1, 0)).kb(index));
    } else {
      markHigh(this, index);
    }
  };
  protoOf(ElementMarker).ybb = function () {
    var elementsCount = this.tbb_1.zb5();
    while (!this.vbb_1.equals(new Long(-1, -1))) {
      var index = countTrailingZeroBits(this.vbb_1.jb());
      this.vbb_1 = this.vbb_1.ob((new Long(1, 0)).kb(index));
      if (this.ubb_1(this.tbb_1, index)) {
        return index;
      }
    }
    Companion_getInstance_0();
    if (elementsCount > 64) {
      return nextUnmarkedHighIndex(this);
    }
    return -1;
  };
  function InlinePrimitiveDescriptor(name, primitiveSerializer) {
    return new InlineClassDescriptor(name, new InlinePrimitiveDescriptor$1(primitiveSerializer));
  }
  function InlineClassDescriptor(name, generatedSerializer) {
    PluginGeneratedSerialDescriptor.call(this, name, generatedSerializer, 1);
    this.lbc_1 = true;
  }
  protoOf(InlineClassDescriptor).ab6 = function () {
    return this.lbc_1;
  };
  protoOf(InlineClassDescriptor).hashCode = function () {
    return imul(protoOf(PluginGeneratedSerialDescriptor).hashCode.call(this), 31);
  };
  protoOf(InlineClassDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof InlineClassDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.xb5() === other.xb5())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.internal.InlineClassDescriptor.equals.<anonymous>' call
      if (!(other.lbc_1 ? contentEquals(this.ybc(), other.ybc()) : false)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.zb5() === other.zb5())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.zb5();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.db6(index).xb5() === other.db6(index).xb5())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.db6(index).bb6(), other.db6(index).bb6())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  function InlinePrimitiveDescriptor$1($primitiveSerializer) {
    this.abd_1 = $primitiveSerializer;
  }
  protoOf(InlinePrimitiveDescriptor$1).bbd = function () {
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    return [this.abd_1];
  };
  protoOf(InlinePrimitiveDescriptor$1).yb4 = function () {
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  protoOf(InlinePrimitiveDescriptor$1).zb4 = function (decoder) {
    // Inline function 'kotlin.error' call
    var message = 'unsupported';
    throw IllegalStateException_init_$Create$(toString(message));
  };
  function jsonCachedSerialNames(_this__u8e3s4) {
    return cachedSerialNames(_this__u8e3s4);
  }
  function error($this) {
    throw IllegalStateException_init_$Create$('Descriptor for type `kotlin.Nothing` does not have elements');
  }
  function NothingSerialDescriptor() {
    NothingSerialDescriptor_instance = this;
    this.dbd_1 = OBJECT_getInstance();
    this.ebd_1 = 'kotlin.Nothing';
  }
  protoOf(NothingSerialDescriptor).bb6 = function () {
    return this.dbd_1;
  };
  protoOf(NothingSerialDescriptor).xb5 = function () {
    return this.ebd_1;
  };
  protoOf(NothingSerialDescriptor).zb5 = function () {
    return 0;
  };
  protoOf(NothingSerialDescriptor).fb6 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).eb6 = function (name) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).gb6 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).db6 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).cb6 = function (index) {
    error(this);
  };
  protoOf(NothingSerialDescriptor).toString = function () {
    return 'NothingSerialDescriptor';
  };
  protoOf(NothingSerialDescriptor).equals = function (other) {
    return this === other;
  };
  protoOf(NothingSerialDescriptor).hashCode = function () {
    return getStringHashCode(this.ebd_1) + imul(31, this.dbd_1.hashCode()) | 0;
  };
  var NothingSerialDescriptor_instance;
  function NothingSerialDescriptor_getInstance() {
    if (NothingSerialDescriptor_instance == null)
      new NothingSerialDescriptor();
    return NothingSerialDescriptor_instance;
  }
  function NullableSerializer(serializer) {
    this.fbd_1 = serializer;
    this.gbd_1 = new SerialDescriptorForNullable(this.fbd_1.yb4());
  }
  protoOf(NullableSerializer).yb4 = function () {
    return this.gbd_1;
  };
  protoOf(NullableSerializer).zb4 = function (decoder) {
    return decoder.cb7() ? decoder.pb7(this.fbd_1) : decoder.db7();
  };
  protoOf(NullableSerializer).equals = function (other) {
    if (this === other)
      return true;
    if (other == null ? true : !getKClassFromExpression(this).equals(getKClassFromExpression(other)))
      return false;
    if (!(other instanceof NullableSerializer))
      THROW_CCE();
    if (!equals(this.fbd_1, other.fbd_1))
      return false;
    return true;
  };
  protoOf(NullableSerializer).hashCode = function () {
    return hashCode(this.fbd_1);
  };
  function SerialDescriptorForNullable(original) {
    this.hb6_1 = original;
    this.ib6_1 = this.hb6_1.xb5() + '?';
    this.jb6_1 = cachedSerialNames(this.hb6_1);
  }
  protoOf(SerialDescriptorForNullable).yb5 = function () {
    return this.hb6_1.yb5();
  };
  protoOf(SerialDescriptorForNullable).zb5 = function () {
    return this.hb6_1.zb5();
  };
  protoOf(SerialDescriptorForNullable).ab6 = function () {
    return this.hb6_1.ab6();
  };
  protoOf(SerialDescriptorForNullable).bb6 = function () {
    return this.hb6_1.bb6();
  };
  protoOf(SerialDescriptorForNullable).cb6 = function (index) {
    return this.hb6_1.cb6(index);
  };
  protoOf(SerialDescriptorForNullable).db6 = function (index) {
    return this.hb6_1.db6(index);
  };
  protoOf(SerialDescriptorForNullable).eb6 = function (name) {
    return this.hb6_1.eb6(name);
  };
  protoOf(SerialDescriptorForNullable).fb6 = function (index) {
    return this.hb6_1.fb6(index);
  };
  protoOf(SerialDescriptorForNullable).gb6 = function (index) {
    return this.hb6_1.gb6(index);
  };
  protoOf(SerialDescriptorForNullable).xb5 = function () {
    return this.ib6_1;
  };
  protoOf(SerialDescriptorForNullable).ab7 = function () {
    return this.jb6_1;
  };
  protoOf(SerialDescriptorForNullable).tb5 = function () {
    return true;
  };
  protoOf(SerialDescriptorForNullable).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof SerialDescriptorForNullable))
      return false;
    if (!equals(this.hb6_1, other.hb6_1))
      return false;
    return true;
  };
  protoOf(SerialDescriptorForNullable).toString = function () {
    return '' + this.hb6_1 + '?';
  };
  protoOf(SerialDescriptorForNullable).hashCode = function () {
    return imul(hashCode(this.hb6_1), 31);
  };
  function ObjectSerializer$descriptor$delegate$lambda$lambda(this$0) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.cb5_1 = this$0.ibd_1;
      return Unit_instance;
    };
  }
  function ObjectSerializer$descriptor$delegate$lambda($serialName, this$0) {
    return function () {
      var tmp = OBJECT_getInstance();
      return buildSerialDescriptor($serialName, tmp, [], ObjectSerializer$descriptor$delegate$lambda$lambda(this$0));
    };
  }
  function ObjectSerializer(serialName, objectInstance) {
    this.hbd_1 = objectInstance;
    this.ibd_1 = emptyList();
    var tmp = this;
    var tmp_0 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp.jbd_1 = lazy(tmp_0, ObjectSerializer$descriptor$delegate$lambda(serialName, this));
  }
  protoOf(ObjectSerializer).yb4 = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.jbd_1;
    descriptor$factory_0();
    return this_0.s2();
  };
  protoOf(ObjectSerializer).zb4 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.yb4();
    var composite = decoder.qb7(descriptor);
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.serialization.internal.ObjectSerializer.deserialize.<anonymous>' call
      if (composite.gb8()) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      }
      var index = composite.hb8(this.yb4());
      if (index === -1) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else {
        throw SerializationException_init_$Create$_0('Unexpected index ' + index);
      }
    }
    var result = tmp$ret$0;
    composite.rb7(descriptor);
    return this.hbd_1;
  };
  function descriptor$factory_0() {
    return getPropertyCallableRef('descriptor', 1, KProperty1, function (receiver) {
      return receiver.yb4();
    }, null);
  }
  function get_EMPTY_DESCRIPTOR_ARRAY() {
    _init_properties_Platform_common_kt__3qzecs();
    return EMPTY_DESCRIPTOR_ARRAY;
  }
  var EMPTY_DESCRIPTOR_ARRAY;
  function cachedSerialNames(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    if (isInterface(_this__u8e3s4, CachedNames))
      return _this__u8e3s4.ab7();
    var result = HashSet_init_$Create$_1(_this__u8e3s4.zb5());
    var inductionVariable = 0;
    var last = _this__u8e3s4.zb5();
    if (inductionVariable < last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.plusAssign' call
        var element = _this__u8e3s4.fb6(i);
        result.a1(element);
      }
       while (inductionVariable < last);
    return result;
  }
  function kclass(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var t = _this__u8e3s4.r7();
    var tmp;
    if (!(t == null) ? isInterface(t, KClass) : false) {
      tmp = t;
    } else {
      if (!(t == null) ? isInterface(t, KTypeParameter) : false) {
        throw IllegalArgumentException_init_$Create$('Captured type parameter ' + t + ' from generic non-reified function. ' + ('Such functionality cannot be supported because ' + t + ' is erased, either specify serializer explicitly or make ') + ('calling function inline with reified ' + t + '.'));
      } else {
        throw IllegalArgumentException_init_$Create$('Only KClass supported as classifier, got ' + t);
      }
    }
    var tmp_0 = tmp;
    return isInterface(tmp_0, KClass) ? tmp_0 : THROW_CCE();
  }
  function typeOrThrow(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.requireNotNull' call
      var value = _this__u8e3s4.og_1;
      // Inline function 'kotlin.contracts.contract' call
      if (value == null) {
        // Inline function 'kotlinx.serialization.internal.typeOrThrow.<anonymous>' call
        var message = 'Star projections in type arguments are not allowed, but had ' + _this__u8e3s4.og_1;
        throw IllegalArgumentException_init_$Create$(toString(message));
      } else {
        tmp$ret$1 = value;
        break $l$block;
      }
    }
    return tmp$ret$1;
  }
  function notRegisteredMessage(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    var tmp0_elvis_lhs = _this__u8e3s4.e7();
    return notRegisteredMessage_0(tmp0_elvis_lhs == null ? '<local class name not available>' : tmp0_elvis_lhs);
  }
  function notRegisteredMessage_0(className) {
    _init_properties_Platform_common_kt__3qzecs();
    return "Serializer for class '" + className + "' is not found.\n" + "Please ensure that class is marked as '@Serializable' and that the serialization compiler plugin is applied.\n";
  }
  function compactArray(_this__u8e3s4) {
    _init_properties_Platform_common_kt__3qzecs();
    // Inline function 'kotlin.takeUnless' call
    // Inline function 'kotlin.contracts.contract' call
    var tmp;
    // Inline function 'kotlinx.serialization.internal.compactArray.<anonymous>' call
    // Inline function 'kotlin.collections.isNullOrEmpty' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(_this__u8e3s4 == null ? true : _this__u8e3s4.u())) {
      tmp = _this__u8e3s4;
    } else {
      tmp = null;
    }
    var tmp0_safe_receiver = tmp;
    var tmp_0;
    if (tmp0_safe_receiver == null) {
      tmp_0 = null;
    } else {
      // Inline function 'kotlin.collections.toTypedArray' call
      tmp_0 = copyToArray(tmp0_safe_receiver);
    }
    var tmp1_elvis_lhs = tmp_0;
    return tmp1_elvis_lhs == null ? get_EMPTY_DESCRIPTOR_ARRAY() : tmp1_elvis_lhs;
  }
  var properties_initialized_Platform_common_kt_i7q4ty;
  function _init_properties_Platform_common_kt__3qzecs() {
    if (!properties_initialized_Platform_common_kt_i7q4ty) {
      properties_initialized_Platform_common_kt_i7q4ty = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_DESCRIPTOR_ARRAY = [];
    }
  }
  function throwMissingFieldException(seen, goldenMask, descriptor) {
    // Inline function 'kotlin.collections.mutableListOf' call
    var missingFields = ArrayList_init_$Create$_0();
    var missingFieldsBits = goldenMask & ~seen;
    var inductionVariable = 0;
    if (inductionVariable < 32)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (!((missingFieldsBits & 1) === 0)) {
          // Inline function 'kotlin.collections.plusAssign' call
          var element = descriptor.fb6(i);
          missingFields.a1(element);
        }
        missingFieldsBits = missingFieldsBits >>> 1 | 0;
      }
       while (inductionVariable < 32);
    throw MissingFieldException_init_$Create$(missingFields, descriptor.xb5());
  }
  function _get_childSerializers__7vnyfa($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.vbc_1;
    childSerializers$factory();
    return this_0.s2();
  }
  function _get__hashCode__tgwhef_0($this) {
    // Inline function 'kotlin.getValue' call
    var this_0 = $this.xbc_1;
    _hashCode$factory_0();
    return this_0.s2();
  }
  function buildIndices($this) {
    var indices = HashMap_init_$Create$();
    var inductionVariable = 0;
    var last = $this.qbc_1.length - 1 | 0;
    if (inductionVariable <= last)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.collections.set' call
        var key = $this.qbc_1[i];
        indices.p2(key, i);
      }
       while (inductionVariable <= last);
    return indices;
  }
  function PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.nbc_1;
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.bbd();
      return tmp1_elvis_lhs == null ? get_EMPTY_SERIALIZER_ARRAY() : tmp1_elvis_lhs;
    };
  }
  function PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this$0) {
    return function () {
      var tmp0_safe_receiver = this$0.nbc_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.cbd();
      var tmp;
      if (tmp1_safe_receiver == null) {
        tmp = null;
      } else {
        // Inline function 'kotlin.collections.map' call
        // Inline function 'kotlin.collections.mapTo' call
        var destination = ArrayList_init_$Create$(tmp1_safe_receiver.length);
        var inductionVariable = 0;
        var last = tmp1_safe_receiver.length;
        while (inductionVariable < last) {
          var item = tmp1_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.serialization.internal.PluginGeneratedSerialDescriptor.typeParameterDescriptors$delegate.<anonymous>.<anonymous>' call
          var tmp$ret$0 = item.yb4();
          destination.a1(tmp$ret$0);
        }
        tmp = destination;
      }
      return compactArray(tmp);
    };
  }
  function PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this$0) {
    return function () {
      return hashCodeImpl(this$0, this$0.ybc());
    };
  }
  function PluginGeneratedSerialDescriptor$toString$lambda(this$0) {
    return function (i) {
      return this$0.fb6(i) + ': ' + this$0.db6(i).xb5();
    };
  }
  function PluginGeneratedSerialDescriptor(serialName, generatedSerializer, elementsCount) {
    generatedSerializer = generatedSerializer === VOID ? null : generatedSerializer;
    this.mbc_1 = serialName;
    this.nbc_1 = generatedSerializer;
    this.obc_1 = elementsCount;
    this.pbc_1 = -1;
    var tmp = this;
    var tmp_0 = 0;
    var tmp_1 = this.obc_1;
    // Inline function 'kotlin.arrayOfNulls' call
    var tmp_2 = fillArrayVal(Array(tmp_1), null);
    while (tmp_0 < tmp_1) {
      tmp_2[tmp_0] = '[UNINITIALIZED]';
      tmp_0 = tmp_0 + 1 | 0;
    }
    tmp.qbc_1 = tmp_2;
    var tmp_3 = this;
    // Inline function 'kotlin.arrayOfNulls' call
    var size = this.obc_1;
    tmp_3.rbc_1 = fillArrayVal(Array(size), null);
    this.sbc_1 = null;
    this.tbc_1 = booleanArray(this.obc_1);
    this.ubc_1 = emptyMap();
    var tmp_4 = this;
    var tmp_5 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_4.vbc_1 = lazy(tmp_5, PluginGeneratedSerialDescriptor$childSerializers$delegate$lambda(this));
    var tmp_6 = this;
    var tmp_7 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_6.wbc_1 = lazy(tmp_7, PluginGeneratedSerialDescriptor$typeParameterDescriptors$delegate$lambda(this));
    var tmp_8 = this;
    var tmp_9 = LazyThreadSafetyMode_PUBLICATION_getInstance();
    tmp_8.xbc_1 = lazy(tmp_9, PluginGeneratedSerialDescriptor$_hashCode$delegate$lambda(this));
  }
  protoOf(PluginGeneratedSerialDescriptor).xb5 = function () {
    return this.mbc_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).zb5 = function () {
    return this.obc_1;
  };
  protoOf(PluginGeneratedSerialDescriptor).bb6 = function () {
    return CLASS_getInstance();
  };
  protoOf(PluginGeneratedSerialDescriptor).yb5 = function () {
    var tmp0_elvis_lhs = this.sbc_1;
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).ab7 = function () {
    return this.ubc_1.m2();
  };
  protoOf(PluginGeneratedSerialDescriptor).ybc = function () {
    // Inline function 'kotlin.getValue' call
    var this_0 = this.wbc_1;
    typeParameterDescriptors$factory();
    return this_0.s2();
  };
  protoOf(PluginGeneratedSerialDescriptor).zbc = function (name, isOptional) {
    this.pbc_1 = this.pbc_1 + 1 | 0;
    this.qbc_1[this.pbc_1] = name;
    this.tbc_1[this.pbc_1] = isOptional;
    this.rbc_1[this.pbc_1] = null;
    if (this.pbc_1 === (this.obc_1 - 1 | 0)) {
      this.ubc_1 = buildIndices(this);
    }
  };
  protoOf(PluginGeneratedSerialDescriptor).db6 = function (index) {
    return getChecked(_get_childSerializers__7vnyfa(this), index).yb4();
  };
  protoOf(PluginGeneratedSerialDescriptor).gb6 = function (index) {
    return getChecked_0(this.tbc_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).cb6 = function (index) {
    var tmp0_elvis_lhs = getChecked(this.rbc_1, index);
    return tmp0_elvis_lhs == null ? emptyList() : tmp0_elvis_lhs;
  };
  protoOf(PluginGeneratedSerialDescriptor).fb6 = function (index) {
    return getChecked(this.qbc_1, index);
  };
  protoOf(PluginGeneratedSerialDescriptor).eb6 = function (name) {
    var tmp0_elvis_lhs = this.ubc_1.z2(name);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      tmp = -3;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(PluginGeneratedSerialDescriptor).equals = function (other) {
    var tmp$ret$0;
    $l$block_5: {
      // Inline function 'kotlinx.serialization.internal.equalsImpl' call
      if (this === other) {
        tmp$ret$0 = true;
        break $l$block_5;
      }
      if (!(other instanceof PluginGeneratedSerialDescriptor)) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.xb5() === other.xb5())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      // Inline function 'kotlinx.serialization.internal.PluginGeneratedSerialDescriptor.equals.<anonymous>' call
      if (!contentEquals(this.ybc(), other.ybc())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      if (!(this.zb5() === other.zb5())) {
        tmp$ret$0 = false;
        break $l$block_5;
      }
      var inductionVariable = 0;
      var last = this.zb5();
      if (inductionVariable < last)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (!(this.db6(index).xb5() === other.db6(index).xb5())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
          if (!equals(this.db6(index).bb6(), other.db6(index).bb6())) {
            tmp$ret$0 = false;
            break $l$block_5;
          }
        }
         while (inductionVariable < last);
      tmp$ret$0 = true;
    }
    return tmp$ret$0;
  };
  protoOf(PluginGeneratedSerialDescriptor).hashCode = function () {
    return _get__hashCode__tgwhef_0(this);
  };
  protoOf(PluginGeneratedSerialDescriptor).toString = function () {
    var tmp = until(0, this.obc_1);
    var tmp_0 = this.xb5() + '(';
    return joinToString(tmp, ', ', tmp_0, ')', VOID, VOID, PluginGeneratedSerialDescriptor$toString$lambda(this));
  };
  function hashCodeImpl(_this__u8e3s4, typeParams) {
    var result = getStringHashCode(_this__u8e3s4.xb5());
    result = imul(31, result) + contentHashCode(typeParams) | 0;
    var elementDescriptors = get_elementDescriptors(_this__u8e3s4);
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator = 1;
    var tmp0_iterator = elementDescriptors.o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy.<anonymous>' call
      var hash = accumulator;
      var tmp = imul(31, hash);
      // Inline function 'kotlin.hashCode' call
      // Inline function 'kotlinx.serialization.internal.hashCodeImpl.<anonymous>' call
      var tmp0_safe_receiver = element.xb5();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
      accumulator = tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
    }
    var namesHash = accumulator;
    // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy' call
    // Inline function 'kotlin.collections.fold' call
    var accumulator_0 = 1;
    var tmp0_iterator_0 = elementDescriptors.o();
    while (tmp0_iterator_0.d1()) {
      var element_0 = tmp0_iterator_0.f1();
      // Inline function 'kotlinx.serialization.internal.elementsHashCodeBy.<anonymous>' call
      var hash_0 = accumulator_0;
      var tmp_0 = imul(31, hash_0);
      // Inline function 'kotlin.hashCode' call
      // Inline function 'kotlinx.serialization.internal.hashCodeImpl.<anonymous>' call
      var tmp0_safe_receiver_0 = element_0.bb6();
      var tmp1_elvis_lhs_0 = tmp0_safe_receiver_0 == null ? null : hashCode(tmp0_safe_receiver_0);
      accumulator_0 = tmp_0 + (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0) | 0;
    }
    var kindHash = accumulator_0;
    result = imul(31, result) + namesHash | 0;
    result = imul(31, result) + kindHash | 0;
    return result;
  }
  function childSerializers$factory() {
    return getPropertyCallableRef('childSerializers', 1, KProperty1, function (receiver) {
      return _get_childSerializers__7vnyfa(receiver);
    }, null);
  }
  function typeParameterDescriptors$factory() {
    return getPropertyCallableRef('typeParameterDescriptors', 1, KProperty1, function (receiver) {
      return receiver.ybc();
    }, null);
  }
  function _hashCode$factory_0() {
    return getPropertyCallableRef('_hashCode', 1, KProperty1, function (receiver) {
      return _get__hashCode__tgwhef_0(receiver);
    }, null);
  }
  function get_EMPTY_SERIALIZER_ARRAY() {
    _init_properties_PluginHelperInterfaces_kt__xgvzfp();
    return EMPTY_SERIALIZER_ARRAY;
  }
  var EMPTY_SERIALIZER_ARRAY;
  function SerializerFactory() {
  }
  function GeneratedSerializer() {
  }
  var properties_initialized_PluginHelperInterfaces_kt_ap8in1;
  function _init_properties_PluginHelperInterfaces_kt__xgvzfp() {
    if (!properties_initialized_PluginHelperInterfaces_kt_ap8in1) {
      properties_initialized_PluginHelperInterfaces_kt_ap8in1 = true;
      // Inline function 'kotlin.arrayOf' call
      // Inline function 'kotlin.js.unsafeCast' call
      // Inline function 'kotlin.js.asDynamic' call
      EMPTY_SERIALIZER_ARRAY = [];
    }
  }
  function CharArraySerializer_0() {
    CharArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_1(Companion_getInstance_1()));
  }
  protoOf(CharArraySerializer_0).nbd = function (_this__u8e3s4) {
    return new CharArrayBuilder(_this__u8e3s4);
  };
  protoOf(CharArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.nbd((!(_this__u8e3s4 == null) ? isCharArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(CharArraySerializer_0).pbb = function () {
    return charArray(0);
  };
  protoOf(CharArraySerializer_0).obd = function (decoder, index, builder, checkIndex) {
    builder.rbd(decoder.zb7(this.kbb_1, index));
  };
  protoOf(CharArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.obd(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(CharArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.obd(decoder, index, builder instanceof CharArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var CharArraySerializer_instance;
  function CharArraySerializer_getInstance() {
    if (CharArraySerializer_instance == null)
      new CharArraySerializer_0();
    return CharArraySerializer_instance;
  }
  function DoubleArraySerializer_0() {
    DoubleArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_2(DoubleCompanionObject_instance));
  }
  protoOf(DoubleArraySerializer_0).ubd = function (_this__u8e3s4) {
    return new DoubleArrayBuilder(_this__u8e3s4);
  };
  protoOf(DoubleArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.ubd((!(_this__u8e3s4 == null) ? isDoubleArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(DoubleArraySerializer_0).pbb = function () {
    return new Float64Array(0);
  };
  protoOf(DoubleArraySerializer_0).vbd = function (decoder, index, builder, checkIndex) {
    builder.ybd(decoder.yb7(this.kbb_1, index));
  };
  protoOf(DoubleArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.vbd(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(DoubleArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.vbd(decoder, index, builder instanceof DoubleArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var DoubleArraySerializer_instance;
  function DoubleArraySerializer_getInstance() {
    if (DoubleArraySerializer_instance == null)
      new DoubleArraySerializer_0();
    return DoubleArraySerializer_instance;
  }
  function FloatArraySerializer_0() {
    FloatArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_3(FloatCompanionObject_instance));
  }
  protoOf(FloatArraySerializer_0).bbe = function (_this__u8e3s4) {
    return new FloatArrayBuilder(_this__u8e3s4);
  };
  protoOf(FloatArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.bbe((!(_this__u8e3s4 == null) ? isFloatArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(FloatArraySerializer_0).pbb = function () {
    return new Float32Array(0);
  };
  protoOf(FloatArraySerializer_0).cbe = function (decoder, index, builder, checkIndex) {
    builder.fbe(decoder.xb7(this.kbb_1, index));
  };
  protoOf(FloatArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.cbe(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(FloatArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.cbe(decoder, index, builder instanceof FloatArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var FloatArraySerializer_instance;
  function FloatArraySerializer_getInstance() {
    if (FloatArraySerializer_instance == null)
      new FloatArraySerializer_0();
    return FloatArraySerializer_instance;
  }
  function LongArraySerializer_0() {
    LongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_4(Companion_getInstance_0()));
  }
  protoOf(LongArraySerializer_0).ibe = function (_this__u8e3s4) {
    return new LongArrayBuilder(_this__u8e3s4);
  };
  protoOf(LongArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.ibe((!(_this__u8e3s4 == null) ? isLongArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(LongArraySerializer_0).pbb = function () {
    return longArray(0);
  };
  protoOf(LongArraySerializer_0).jbe = function (decoder, index, builder, checkIndex) {
    builder.mbe(decoder.wb7(this.kbb_1, index));
  };
  protoOf(LongArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.jbe(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(LongArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.jbe(decoder, index, builder instanceof LongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var LongArraySerializer_instance;
  function LongArraySerializer_getInstance() {
    if (LongArraySerializer_instance == null)
      new LongArraySerializer_0();
    return LongArraySerializer_instance;
  }
  function ULongArraySerializer_0() {
    ULongArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_5(Companion_getInstance_2()));
  }
  protoOf(ULongArraySerializer_0).pbe = function (_this__u8e3s4) {
    return new ULongArrayBuilder(_this__u8e3s4);
  };
  protoOf(ULongArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.pbe(_this__u8e3s4 instanceof ULongArray ? _this__u8e3s4.cj_1 : THROW_CCE());
  };
  protoOf(ULongArraySerializer_0).qbe = function () {
    return _ULongArray___init__impl__twm1l3(0);
  };
  protoOf(ULongArraySerializer_0).pbb = function () {
    return new ULongArray(this.qbe());
  };
  protoOf(ULongArraySerializer_0).rbe = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.bb8(this.kbb_1, index).ib7();
    var tmp$ret$0 = _ULong___init__impl__c78o9k(this_0);
    builder.ube(tmp$ret$0);
  };
  protoOf(ULongArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.rbe(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ULongArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.rbe(decoder, index, builder instanceof ULongArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var ULongArraySerializer_instance;
  function ULongArraySerializer_getInstance() {
    if (ULongArraySerializer_instance == null)
      new ULongArraySerializer_0();
    return ULongArraySerializer_instance;
  }
  function IntArraySerializer_0() {
    IntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_6(IntCompanionObject_instance));
  }
  protoOf(IntArraySerializer_0).xbe = function (_this__u8e3s4) {
    return new IntArrayBuilder(_this__u8e3s4);
  };
  protoOf(IntArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.xbe((!(_this__u8e3s4 == null) ? isIntArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(IntArraySerializer_0).pbb = function () {
    return new Int32Array(0);
  };
  protoOf(IntArraySerializer_0).ybe = function (decoder, index, builder, checkIndex) {
    builder.bbf(decoder.vb7(this.kbb_1, index));
  };
  protoOf(IntArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.ybe(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(IntArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.ybe(decoder, index, builder instanceof IntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var IntArraySerializer_instance;
  function IntArraySerializer_getInstance() {
    if (IntArraySerializer_instance == null)
      new IntArraySerializer_0();
    return IntArraySerializer_instance;
  }
  function UIntArraySerializer_0() {
    UIntArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_7(Companion_getInstance_3()));
  }
  protoOf(UIntArraySerializer_0).ebf = function (_this__u8e3s4) {
    return new UIntArrayBuilder(_this__u8e3s4);
  };
  protoOf(UIntArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.ebf(_this__u8e3s4 instanceof UIntArray ? _this__u8e3s4.qi_1 : THROW_CCE());
  };
  protoOf(UIntArraySerializer_0).fbf = function () {
    return _UIntArray___init__impl__ghjpc6(0);
  };
  protoOf(UIntArraySerializer_0).pbb = function () {
    return new UIntArray(this.fbf());
  };
  protoOf(UIntArraySerializer_0).gbf = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.bb8(this.kbb_1, index).hb7();
    var tmp$ret$0 = _UInt___init__impl__l7qpdl(this_0);
    builder.jbf(tmp$ret$0);
  };
  protoOf(UIntArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.gbf(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UIntArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.gbf(decoder, index, builder instanceof UIntArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var UIntArraySerializer_instance;
  function UIntArraySerializer_getInstance() {
    if (UIntArraySerializer_instance == null)
      new UIntArraySerializer_0();
    return UIntArraySerializer_instance;
  }
  function ShortArraySerializer_0() {
    ShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_8(ShortCompanionObject_instance));
  }
  protoOf(ShortArraySerializer_0).mbf = function (_this__u8e3s4) {
    return new ShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(ShortArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.mbf((!(_this__u8e3s4 == null) ? isShortArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ShortArraySerializer_0).pbb = function () {
    return new Int16Array(0);
  };
  protoOf(ShortArraySerializer_0).nbf = function (decoder, index, builder, checkIndex) {
    builder.qbf(decoder.ub7(this.kbb_1, index));
  };
  protoOf(ShortArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.nbf(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ShortArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.nbf(decoder, index, builder instanceof ShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var ShortArraySerializer_instance;
  function ShortArraySerializer_getInstance() {
    if (ShortArraySerializer_instance == null)
      new ShortArraySerializer_0();
    return ShortArraySerializer_instance;
  }
  function UShortArraySerializer_0() {
    UShortArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_9(Companion_getInstance_4()));
  }
  protoOf(UShortArraySerializer_0).tbf = function (_this__u8e3s4) {
    return new UShortArrayBuilder(_this__u8e3s4);
  };
  protoOf(UShortArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.tbf(_this__u8e3s4 instanceof UShortArray ? _this__u8e3s4.oj_1 : THROW_CCE());
  };
  protoOf(UShortArraySerializer_0).ubf = function () {
    return _UShortArray___init__impl__9b26ef(0);
  };
  protoOf(UShortArraySerializer_0).pbb = function () {
    return new UShortArray(this.ubf());
  };
  protoOf(UShortArraySerializer_0).vbf = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.bb8(this.kbb_1, index).gb7();
    var tmp$ret$0 = _UShort___init__impl__jigrne(this_0);
    builder.ybf(tmp$ret$0);
  };
  protoOf(UShortArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.vbf(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UShortArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.vbf(decoder, index, builder instanceof UShortArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var UShortArraySerializer_instance;
  function UShortArraySerializer_getInstance() {
    if (UShortArraySerializer_instance == null)
      new UShortArraySerializer_0();
    return UShortArraySerializer_instance;
  }
  function ByteArraySerializer_0() {
    ByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_10(ByteCompanionObject_instance));
  }
  protoOf(ByteArraySerializer_0).bbg = function (_this__u8e3s4) {
    return new ByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(ByteArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.bbg((!(_this__u8e3s4 == null) ? isByteArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(ByteArraySerializer_0).pbb = function () {
    return new Int8Array(0);
  };
  protoOf(ByteArraySerializer_0).cbg = function (decoder, index, builder, checkIndex) {
    builder.fbg(decoder.tb7(this.kbb_1, index));
  };
  protoOf(ByteArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.cbg(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(ByteArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.cbg(decoder, index, builder instanceof ByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var ByteArraySerializer_instance;
  function ByteArraySerializer_getInstance() {
    if (ByteArraySerializer_instance == null)
      new ByteArraySerializer_0();
    return ByteArraySerializer_instance;
  }
  function UByteArraySerializer_0() {
    UByteArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_11(Companion_getInstance_5()));
  }
  protoOf(UByteArraySerializer_0).ibg = function (_this__u8e3s4) {
    return new UByteArrayBuilder(_this__u8e3s4);
  };
  protoOf(UByteArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.ibg(_this__u8e3s4 instanceof UByteArray ? _this__u8e3s4.ei_1 : THROW_CCE());
  };
  protoOf(UByteArraySerializer_0).jbg = function () {
    return _UByteArray___init__impl__ip4y9n(0);
  };
  protoOf(UByteArraySerializer_0).pbb = function () {
    return new UByteArray(this.jbg());
  };
  protoOf(UByteArraySerializer_0).kbg = function (decoder, index, builder, checkIndex) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.bb8(this.kbb_1, index).fb7();
    var tmp$ret$0 = _UByte___init__impl__g9hnc4(this_0);
    builder.nbg(tmp$ret$0);
  };
  protoOf(UByteArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.kbg(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(UByteArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.kbg(decoder, index, builder instanceof UByteArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var UByteArraySerializer_instance;
  function UByteArraySerializer_getInstance() {
    if (UByteArraySerializer_instance == null)
      new UByteArraySerializer_0();
    return UByteArraySerializer_instance;
  }
  function BooleanArraySerializer_0() {
    BooleanArraySerializer_instance = this;
    PrimitiveArraySerializer.call(this, serializer_12(BooleanCompanionObject_instance));
  }
  protoOf(BooleanArraySerializer_0).qbg = function (_this__u8e3s4) {
    return new BooleanArrayBuilder(_this__u8e3s4);
  };
  protoOf(BooleanArraySerializer_0).nb9 = function (_this__u8e3s4) {
    return this.qbg((!(_this__u8e3s4 == null) ? isBooleanArray(_this__u8e3s4) : false) ? _this__u8e3s4 : THROW_CCE());
  };
  protoOf(BooleanArraySerializer_0).pbb = function () {
    return booleanArray(0);
  };
  protoOf(BooleanArraySerializer_0).rbg = function (decoder, index, builder, checkIndex) {
    builder.ubg(decoder.sb7(this.kbb_1, index));
  };
  protoOf(BooleanArraySerializer_0).ub9 = function (decoder, index, builder, checkIndex) {
    return this.rbg(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  protoOf(BooleanArraySerializer_0).qbb = function (decoder, index, builder, checkIndex) {
    return this.rbg(decoder, index, builder instanceof BooleanArrayBuilder ? builder : THROW_CCE(), checkIndex);
  };
  var BooleanArraySerializer_instance;
  function BooleanArraySerializer_getInstance() {
    if (BooleanArraySerializer_instance == null)
      new BooleanArraySerializer_0();
    return BooleanArraySerializer_instance;
  }
  function CharArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.pbd_1 = bufferWithData;
    this.qbd_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(CharArrayBuilder).z4p = function () {
    return this.qbd_1;
  };
  protoOf(CharArrayBuilder).g3 = function (requiredCapacity) {
    if (this.pbd_1.length < requiredCapacity)
      this.pbd_1 = copyOf(this.pbd_1, coerceAtLeast(requiredCapacity, imul(this.pbd_1.length, 2)));
  };
  protoOf(CharArrayBuilder).rbd = function (c) {
    this.rbb();
    var tmp = this.pbd_1;
    var tmp1 = this.qbd_1;
    this.qbd_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(CharArrayBuilder).n1r = function () {
    return copyOf(this.pbd_1, this.qbd_1);
  };
  function DoubleArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.wbd_1 = bufferWithData;
    this.xbd_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(DoubleArrayBuilder).z4p = function () {
    return this.xbd_1;
  };
  protoOf(DoubleArrayBuilder).g3 = function (requiredCapacity) {
    if (this.wbd_1.length < requiredCapacity)
      this.wbd_1 = copyOf_0(this.wbd_1, coerceAtLeast(requiredCapacity, imul(this.wbd_1.length, 2)));
  };
  protoOf(DoubleArrayBuilder).ybd = function (c) {
    this.rbb();
    var tmp = this.wbd_1;
    var tmp1 = this.xbd_1;
    this.xbd_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(DoubleArrayBuilder).n1r = function () {
    return copyOf_0(this.wbd_1, this.xbd_1);
  };
  function FloatArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.dbe_1 = bufferWithData;
    this.ebe_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(FloatArrayBuilder).z4p = function () {
    return this.ebe_1;
  };
  protoOf(FloatArrayBuilder).g3 = function (requiredCapacity) {
    if (this.dbe_1.length < requiredCapacity)
      this.dbe_1 = copyOf_1(this.dbe_1, coerceAtLeast(requiredCapacity, imul(this.dbe_1.length, 2)));
  };
  protoOf(FloatArrayBuilder).fbe = function (c) {
    this.rbb();
    var tmp = this.dbe_1;
    var tmp1 = this.ebe_1;
    this.ebe_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(FloatArrayBuilder).n1r = function () {
    return copyOf_1(this.dbe_1, this.ebe_1);
  };
  function LongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.kbe_1 = bufferWithData;
    this.lbe_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(LongArrayBuilder).z4p = function () {
    return this.lbe_1;
  };
  protoOf(LongArrayBuilder).g3 = function (requiredCapacity) {
    if (this.kbe_1.length < requiredCapacity)
      this.kbe_1 = copyOf_2(this.kbe_1, coerceAtLeast(requiredCapacity, imul(this.kbe_1.length, 2)));
  };
  protoOf(LongArrayBuilder).mbe = function (c) {
    this.rbb();
    var tmp = this.kbe_1;
    var tmp1 = this.lbe_1;
    this.lbe_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(LongArrayBuilder).n1r = function () {
    return copyOf_2(this.kbe_1, this.lbe_1);
  };
  function ULongArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.sbe_1 = bufferWithData;
    this.tbe_1 = _ULongArray___get_size__impl__ju6dtr(bufferWithData);
    this.g3(10);
  }
  protoOf(ULongArrayBuilder).z4p = function () {
    return this.tbe_1;
  };
  protoOf(ULongArrayBuilder).g3 = function (requiredCapacity) {
    if (_ULongArray___get_size__impl__ju6dtr(this.sbe_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.sbe_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_ULongArray___get_size__impl__ju6dtr(this.sbe_1), 2));
      tmp.sbe_1 = _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(this_0), newSize));
    }
  };
  protoOf(ULongArrayBuilder).ube = function (c) {
    this.rbb();
    var tmp = this.sbe_1;
    var tmp1 = this.tbe_1;
    this.tbe_1 = tmp1 + 1 | 0;
    ULongArray__set_impl_z19mvh(tmp, tmp1, c);
  };
  protoOf(ULongArrayBuilder).vbg = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.sbe_1;
    var newSize = this.tbe_1;
    return _ULongArray___init__impl__twm1l3_0(copyOf_2(_ULongArray___get_storage__impl__28e64j(this_0), newSize));
  };
  protoOf(ULongArrayBuilder).n1r = function () {
    return new ULongArray(this.vbg());
  };
  function IntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.zbe_1 = bufferWithData;
    this.abf_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(IntArrayBuilder).z4p = function () {
    return this.abf_1;
  };
  protoOf(IntArrayBuilder).g3 = function (requiredCapacity) {
    if (this.zbe_1.length < requiredCapacity)
      this.zbe_1 = copyOf_3(this.zbe_1, coerceAtLeast(requiredCapacity, imul(this.zbe_1.length, 2)));
  };
  protoOf(IntArrayBuilder).bbf = function (c) {
    this.rbb();
    var tmp = this.zbe_1;
    var tmp1 = this.abf_1;
    this.abf_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(IntArrayBuilder).n1r = function () {
    return copyOf_3(this.zbe_1, this.abf_1);
  };
  function UIntArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.hbf_1 = bufferWithData;
    this.ibf_1 = _UIntArray___get_size__impl__r6l8ci(bufferWithData);
    this.g3(10);
  }
  protoOf(UIntArrayBuilder).z4p = function () {
    return this.ibf_1;
  };
  protoOf(UIntArrayBuilder).g3 = function (requiredCapacity) {
    if (_UIntArray___get_size__impl__r6l8ci(this.hbf_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.hbf_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_UIntArray___get_size__impl__r6l8ci(this.hbf_1), 2));
      tmp.hbf_1 = _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(this_0), newSize));
    }
  };
  protoOf(UIntArrayBuilder).jbf = function (c) {
    this.rbb();
    var tmp = this.hbf_1;
    var tmp1 = this.ibf_1;
    this.ibf_1 = tmp1 + 1 | 0;
    UIntArray__set_impl_7f2zu2(tmp, tmp1, c);
  };
  protoOf(UIntArrayBuilder).wbg = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.hbf_1;
    var newSize = this.ibf_1;
    return _UIntArray___init__impl__ghjpc6_0(copyOf_3(_UIntArray___get_storage__impl__92a0v0(this_0), newSize));
  };
  protoOf(UIntArrayBuilder).n1r = function () {
    return new UIntArray(this.wbg());
  };
  function ShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.obf_1 = bufferWithData;
    this.pbf_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(ShortArrayBuilder).z4p = function () {
    return this.pbf_1;
  };
  protoOf(ShortArrayBuilder).g3 = function (requiredCapacity) {
    if (this.obf_1.length < requiredCapacity)
      this.obf_1 = copyOf_4(this.obf_1, coerceAtLeast(requiredCapacity, imul(this.obf_1.length, 2)));
  };
  protoOf(ShortArrayBuilder).qbf = function (c) {
    this.rbb();
    var tmp = this.obf_1;
    var tmp1 = this.pbf_1;
    this.pbf_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(ShortArrayBuilder).n1r = function () {
    return copyOf_4(this.obf_1, this.pbf_1);
  };
  function UShortArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.wbf_1 = bufferWithData;
    this.xbf_1 = _UShortArray___get_size__impl__jqto1b(bufferWithData);
    this.g3(10);
  }
  protoOf(UShortArrayBuilder).z4p = function () {
    return this.xbf_1;
  };
  protoOf(UShortArrayBuilder).g3 = function (requiredCapacity) {
    if (_UShortArray___get_size__impl__jqto1b(this.wbf_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.wbf_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_UShortArray___get_size__impl__jqto1b(this.wbf_1), 2));
      tmp.wbf_1 = _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(this_0), newSize));
    }
  };
  protoOf(UShortArrayBuilder).ybf = function (c) {
    this.rbb();
    var tmp = this.wbf_1;
    var tmp1 = this.xbf_1;
    this.xbf_1 = tmp1 + 1 | 0;
    UShortArray__set_impl_6d8whp(tmp, tmp1, c);
  };
  protoOf(UShortArrayBuilder).xbg = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.wbf_1;
    var newSize = this.xbf_1;
    return _UShortArray___init__impl__9b26ef_0(copyOf_4(_UShortArray___get_storage__impl__t2jpv5(this_0), newSize));
  };
  protoOf(UShortArrayBuilder).n1r = function () {
    return new UShortArray(this.xbg());
  };
  function ByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.dbg_1 = bufferWithData;
    this.ebg_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(ByteArrayBuilder).z4p = function () {
    return this.ebg_1;
  };
  protoOf(ByteArrayBuilder).g3 = function (requiredCapacity) {
    if (this.dbg_1.length < requiredCapacity)
      this.dbg_1 = copyOf_5(this.dbg_1, coerceAtLeast(requiredCapacity, imul(this.dbg_1.length, 2)));
  };
  protoOf(ByteArrayBuilder).fbg = function (c) {
    this.rbb();
    var tmp = this.dbg_1;
    var tmp1 = this.ebg_1;
    this.ebg_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(ByteArrayBuilder).n1r = function () {
    return copyOf_5(this.dbg_1, this.ebg_1);
  };
  function UByteArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.lbg_1 = bufferWithData;
    this.mbg_1 = _UByteArray___get_size__impl__h6pkdv(bufferWithData);
    this.g3(10);
  }
  protoOf(UByteArrayBuilder).z4p = function () {
    return this.mbg_1;
  };
  protoOf(UByteArrayBuilder).g3 = function (requiredCapacity) {
    if (_UByteArray___get_size__impl__h6pkdv(this.lbg_1) < requiredCapacity) {
      var tmp = this;
      // Inline function 'kotlin.collections.copyOf' call
      var this_0 = this.lbg_1;
      var newSize = coerceAtLeast(requiredCapacity, imul(_UByteArray___get_size__impl__h6pkdv(this.lbg_1), 2));
      tmp.lbg_1 = _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(this_0), newSize));
    }
  };
  protoOf(UByteArrayBuilder).nbg = function (c) {
    this.rbb();
    var tmp = this.lbg_1;
    var tmp1 = this.mbg_1;
    this.mbg_1 = tmp1 + 1 | 0;
    UByteArray__set_impl_jvcicn(tmp, tmp1, c);
  };
  protoOf(UByteArrayBuilder).ybg = function () {
    // Inline function 'kotlin.collections.copyOf' call
    var this_0 = this.lbg_1;
    var newSize = this.mbg_1;
    return _UByteArray___init__impl__ip4y9n_0(copyOf_5(_UByteArray___get_storage__impl__d4kctt(this_0), newSize));
  };
  protoOf(UByteArrayBuilder).n1r = function () {
    return new UByteArray(this.ybg());
  };
  function BooleanArrayBuilder(bufferWithData) {
    PrimitiveArrayBuilder.call(this);
    this.sbg_1 = bufferWithData;
    this.tbg_1 = bufferWithData.length;
    this.g3(10);
  }
  protoOf(BooleanArrayBuilder).z4p = function () {
    return this.tbg_1;
  };
  protoOf(BooleanArrayBuilder).g3 = function (requiredCapacity) {
    if (this.sbg_1.length < requiredCapacity)
      this.sbg_1 = copyOf_6(this.sbg_1, coerceAtLeast(requiredCapacity, imul(this.sbg_1.length, 2)));
  };
  protoOf(BooleanArrayBuilder).ubg = function (c) {
    this.rbb();
    var tmp = this.sbg_1;
    var tmp1 = this.tbg_1;
    this.tbg_1 = tmp1 + 1 | 0;
    tmp[tmp1] = c;
  };
  protoOf(BooleanArrayBuilder).n1r = function () {
    return copyOf_6(this.sbg_1, this.tbg_1);
  };
  function get_BUILTIN_SERIALIZERS() {
    _init_properties_Primitives_kt__k0eto4();
    return BUILTIN_SERIALIZERS;
  }
  var BUILTIN_SERIALIZERS;
  function builtinSerializerOrNull(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    var tmp = get_BUILTIN_SERIALIZERS().z2(_this__u8e3s4);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : THROW_CCE();
  }
  function StringSerializer() {
    StringSerializer_instance = this;
    this.zbg_1 = new PrimitiveSerialDescriptor_0('kotlin.String', STRING_getInstance());
  }
  protoOf(StringSerializer).yb4 = function () {
    return this.zbg_1;
  };
  protoOf(StringSerializer).zb4 = function (decoder) {
    return decoder.mb7();
  };
  var StringSerializer_instance;
  function StringSerializer_getInstance() {
    if (StringSerializer_instance == null)
      new StringSerializer();
    return StringSerializer_instance;
  }
  function CharSerializer() {
    CharSerializer_instance = this;
    this.abh_1 = new PrimitiveSerialDescriptor_0('kotlin.Char', CHAR_getInstance());
  }
  protoOf(CharSerializer).yb4 = function () {
    return this.abh_1;
  };
  protoOf(CharSerializer).bbh = function (decoder) {
    return decoder.lb7();
  };
  protoOf(CharSerializer).zb4 = function (decoder) {
    return new Char(this.bbh(decoder));
  };
  var CharSerializer_instance;
  function CharSerializer_getInstance() {
    if (CharSerializer_instance == null)
      new CharSerializer();
    return CharSerializer_instance;
  }
  function DoubleSerializer() {
    DoubleSerializer_instance = this;
    this.cbh_1 = new PrimitiveSerialDescriptor_0('kotlin.Double', DOUBLE_getInstance());
  }
  protoOf(DoubleSerializer).yb4 = function () {
    return this.cbh_1;
  };
  protoOf(DoubleSerializer).zb4 = function (decoder) {
    return decoder.kb7();
  };
  var DoubleSerializer_instance;
  function DoubleSerializer_getInstance() {
    if (DoubleSerializer_instance == null)
      new DoubleSerializer();
    return DoubleSerializer_instance;
  }
  function FloatSerializer() {
    FloatSerializer_instance = this;
    this.dbh_1 = new PrimitiveSerialDescriptor_0('kotlin.Float', FLOAT_getInstance());
  }
  protoOf(FloatSerializer).yb4 = function () {
    return this.dbh_1;
  };
  protoOf(FloatSerializer).zb4 = function (decoder) {
    return decoder.jb7();
  };
  var FloatSerializer_instance;
  function FloatSerializer_getInstance() {
    if (FloatSerializer_instance == null)
      new FloatSerializer();
    return FloatSerializer_instance;
  }
  function LongSerializer() {
    LongSerializer_instance = this;
    this.ebh_1 = new PrimitiveSerialDescriptor_0('kotlin.Long', LONG_getInstance());
  }
  protoOf(LongSerializer).yb4 = function () {
    return this.ebh_1;
  };
  protoOf(LongSerializer).zb4 = function (decoder) {
    return decoder.ib7();
  };
  var LongSerializer_instance;
  function LongSerializer_getInstance() {
    if (LongSerializer_instance == null)
      new LongSerializer();
    return LongSerializer_instance;
  }
  function IntSerializer() {
    IntSerializer_instance = this;
    this.fbh_1 = new PrimitiveSerialDescriptor_0('kotlin.Int', INT_getInstance());
  }
  protoOf(IntSerializer).yb4 = function () {
    return this.fbh_1;
  };
  protoOf(IntSerializer).zb4 = function (decoder) {
    return decoder.hb7();
  };
  var IntSerializer_instance;
  function IntSerializer_getInstance() {
    if (IntSerializer_instance == null)
      new IntSerializer();
    return IntSerializer_instance;
  }
  function ShortSerializer() {
    ShortSerializer_instance = this;
    this.gbh_1 = new PrimitiveSerialDescriptor_0('kotlin.Short', SHORT_getInstance());
  }
  protoOf(ShortSerializer).yb4 = function () {
    return this.gbh_1;
  };
  protoOf(ShortSerializer).zb4 = function (decoder) {
    return decoder.gb7();
  };
  var ShortSerializer_instance;
  function ShortSerializer_getInstance() {
    if (ShortSerializer_instance == null)
      new ShortSerializer();
    return ShortSerializer_instance;
  }
  function ByteSerializer() {
    ByteSerializer_instance = this;
    this.hbh_1 = new PrimitiveSerialDescriptor_0('kotlin.Byte', BYTE_getInstance());
  }
  protoOf(ByteSerializer).yb4 = function () {
    return this.hbh_1;
  };
  protoOf(ByteSerializer).zb4 = function (decoder) {
    return decoder.fb7();
  };
  var ByteSerializer_instance;
  function ByteSerializer_getInstance() {
    if (ByteSerializer_instance == null)
      new ByteSerializer();
    return ByteSerializer_instance;
  }
  function BooleanSerializer() {
    BooleanSerializer_instance = this;
    this.ibh_1 = new PrimitiveSerialDescriptor_0('kotlin.Boolean', BOOLEAN_getInstance());
  }
  protoOf(BooleanSerializer).yb4 = function () {
    return this.ibh_1;
  };
  protoOf(BooleanSerializer).zb4 = function (decoder) {
    return decoder.eb7();
  };
  var BooleanSerializer_instance;
  function BooleanSerializer_getInstance() {
    if (BooleanSerializer_instance == null)
      new BooleanSerializer();
    return BooleanSerializer_instance;
  }
  function UnitSerializer() {
    UnitSerializer_instance = this;
    this.jbh_1 = new ObjectSerializer('kotlin.Unit', Unit_instance);
  }
  protoOf(UnitSerializer).yb4 = function () {
    return this.jbh_1.yb4();
  };
  protoOf(UnitSerializer).kbh = function (decoder) {
    this.jbh_1.zb4(decoder);
  };
  protoOf(UnitSerializer).zb4 = function (decoder) {
    this.kbh(decoder);
    return Unit_instance;
  };
  var UnitSerializer_instance;
  function UnitSerializer_getInstance() {
    if (UnitSerializer_instance == null)
      new UnitSerializer();
    return UnitSerializer_instance;
  }
  function error_0($this) {
    throw IllegalStateException_init_$Create$('Primitive descriptor does not have elements');
  }
  function PrimitiveSerialDescriptor_0(serialName, kind) {
    this.lbh_1 = serialName;
    this.mbh_1 = kind;
  }
  protoOf(PrimitiveSerialDescriptor_0).xb5 = function () {
    return this.lbh_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).bb6 = function () {
    return this.mbh_1;
  };
  protoOf(PrimitiveSerialDescriptor_0).zb5 = function () {
    return 0;
  };
  protoOf(PrimitiveSerialDescriptor_0).fb6 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).eb6 = function (name) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).gb6 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).db6 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).cb6 = function (index) {
    error_0(this);
  };
  protoOf(PrimitiveSerialDescriptor_0).toString = function () {
    return 'PrimitiveDescriptor(' + this.lbh_1 + ')';
  };
  protoOf(PrimitiveSerialDescriptor_0).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof PrimitiveSerialDescriptor_0))
      return false;
    if (this.lbh_1 === other.lbh_1 ? equals(this.mbh_1, other.mbh_1) : false)
      return true;
    return false;
  };
  protoOf(PrimitiveSerialDescriptor_0).hashCode = function () {
    return getStringHashCode(this.lbh_1) + imul(31, this.mbh_1.hashCode()) | 0;
  };
  function PrimitiveDescriptorSafe(serialName, kind) {
    _init_properties_Primitives_kt__k0eto4();
    checkName(serialName);
    return new PrimitiveSerialDescriptor_0(serialName, kind);
  }
  function checkName(serialName) {
    _init_properties_Primitives_kt__k0eto4();
    var keys = get_BUILTIN_SERIALIZERS().m2();
    var tmp0_iterator = keys.o();
    while (tmp0_iterator.d1()) {
      var primitive = tmp0_iterator.f1();
      var simpleName = capitalize(ensureNotNull(primitive.e7()));
      var qualifiedName = 'kotlin.' + simpleName;
      if (equals_0(serialName, qualifiedName, true) ? true : equals_0(serialName, simpleName, true)) {
        throw IllegalArgumentException_init_$Create$(trimIndent('\n                The name of serial descriptor should uniquely identify associated serializer.\n                For serial name ' + serialName + ' there already exist ' + capitalize(simpleName) + 'Serializer.\n                Please refer to SerialDescriptor documentation for additional information.\n            '));
      }
    }
  }
  function capitalize(_this__u8e3s4) {
    _init_properties_Primitives_kt__k0eto4();
    // Inline function 'kotlin.text.replaceFirstChar' call
    var tmp;
    // Inline function 'kotlin.text.isNotEmpty' call
    if (charSequenceLength(_this__u8e3s4) > 0) {
      // Inline function 'kotlinx.serialization.internal.capitalize.<anonymous>' call
      var it = charSequenceGet(_this__u8e3s4, 0);
      var tmp$ret$1 = isLowerCase(it) ? titlecase(it) : toString_0(it);
      var tmp_0 = toString(tmp$ret$1);
      // Inline function 'kotlin.text.substring' call
      // Inline function 'kotlin.js.asDynamic' call
      tmp = tmp_0 + _this__u8e3s4.substring(1);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  var properties_initialized_Primitives_kt_6dpii6;
  function _init_properties_Primitives_kt__k0eto4() {
    if (!properties_initialized_Primitives_kt_6dpii6) {
      properties_initialized_Primitives_kt_6dpii6 = true;
      BUILTIN_SERIALIZERS = mapOf([to(PrimitiveClasses_getInstance().e8(), serializer_0(StringCompanionObject_instance)), to(getKClass(Char), serializer_1(Companion_getInstance_1())), to(PrimitiveClasses_getInstance().h8(), CharArraySerializer()), to(PrimitiveClasses_getInstance().c8(), serializer_2(DoubleCompanionObject_instance)), to(PrimitiveClasses_getInstance().n8(), DoubleArraySerializer()), to(PrimitiveClasses_getInstance().b8(), serializer_3(FloatCompanionObject_instance)), to(PrimitiveClasses_getInstance().m8(), FloatArraySerializer()), to(getKClass(Long), serializer_4(Companion_getInstance_0())), to(PrimitiveClasses_getInstance().l8(), LongArraySerializer()), to(getKClass(ULong), serializer_5(Companion_getInstance_2())), to(getKClass(ULongArray), ULongArraySerializer()), to(PrimitiveClasses_getInstance().a8(), serializer_6(IntCompanionObject_instance)), to(PrimitiveClasses_getInstance().k8(), IntArraySerializer()), to(getKClass(UInt), serializer_7(Companion_getInstance_3())), to(getKClass(UIntArray), UIntArraySerializer()), to(PrimitiveClasses_getInstance().z7(), serializer_8(ShortCompanionObject_instance)), to(PrimitiveClasses_getInstance().j8(), ShortArraySerializer()), to(getKClass(UShort), serializer_9(Companion_getInstance_4())), to(getKClass(UShortArray), UShortArraySerializer()), to(PrimitiveClasses_getInstance().y7(), serializer_10(ByteCompanionObject_instance)), to(PrimitiveClasses_getInstance().i8(), ByteArraySerializer()), to(getKClass(UByte), serializer_11(Companion_getInstance_5())), to(getKClass(UByteArray), UByteArraySerializer()), to(PrimitiveClasses_getInstance().x7(), serializer_12(BooleanCompanionObject_instance)), to(PrimitiveClasses_getInstance().g8(), BooleanArraySerializer()), to(getKClass(Unit), serializer_13(Unit_instance)), to(PrimitiveClasses_getInstance().w7(), NothingSerializer()), to(getKClass(Duration), serializer_14(Companion_getInstance()))]);
    }
  }
  function NamedValueDecoder() {
    TaggedDecoder.call(this);
  }
  protoOf(NamedValueDecoder).pbh = function (_this__u8e3s4, index) {
    return this.rbh(this.qbh(_this__u8e3s4, index));
  };
  protoOf(NamedValueDecoder).rbh = function (nestedName) {
    var tmp0_elvis_lhs = this.ubh();
    return this.vbh(tmp0_elvis_lhs == null ? '' : tmp0_elvis_lhs, nestedName);
  };
  protoOf(NamedValueDecoder).qbh = function (descriptor, index) {
    return descriptor.fb6(index);
  };
  protoOf(NamedValueDecoder).vbh = function (parentName, childName) {
    var tmp;
    // Inline function 'kotlin.text.isEmpty' call
    if (charSequenceLength(parentName) === 0) {
      tmp = childName;
    } else {
      tmp = parentName + '.' + childName;
    }
    return tmp;
  };
  function tagBlock($this, tag, block) {
    $this.ibi(tag);
    var r = block();
    if (!$this.tbh_1) {
      $this.jbi();
    }
    $this.tbh_1 = false;
    return r;
  }
  function TaggedDecoder$decodeSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      return this$0.ob7($deserializer, $previousValue);
    };
  }
  function TaggedDecoder$decodeNullableSerializableElement$lambda(this$0, $deserializer, $previousValue) {
    return function () {
      // Inline function 'kotlinx.serialization.encoding.decodeIfNullable' call
      var this_0 = this$0;
      var isNullabilitySupported = $deserializer.yb4().tb5();
      var tmp;
      if (isNullabilitySupported ? true : this_0.cb7()) {
        // Inline function 'kotlinx.serialization.internal.TaggedDecoder.decodeNullableSerializableElement.<anonymous>.<anonymous>' call
        tmp = this$0.ob7($deserializer, $previousValue);
      } else {
        tmp = this_0.db7();
      }
      return tmp;
    };
  }
  function TaggedDecoder() {
    var tmp = this;
    // Inline function 'kotlin.collections.arrayListOf' call
    tmp.sbh_1 = ArrayList_init_$Create$_0();
    this.tbh_1 = false;
  }
  protoOf(TaggedDecoder).fb8 = function () {
    return EmptySerializersModule_0();
  };
  protoOf(TaggedDecoder).wbh = function (tag) {
    throw SerializationException_init_$Create$_0('' + getKClassFromExpression(this) + " can't retrieve untyped values");
  };
  protoOf(TaggedDecoder).xbh = function (tag) {
    return true;
  };
  protoOf(TaggedDecoder).ybh = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'boolean' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).zbh = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).abi = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).bbi = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).cbi = function (tag) {
    var tmp = this.wbh(tag);
    return tmp instanceof Long ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).dbi = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).ebi = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'number' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).fbi = function (tag) {
    var tmp = this.wbh(tag);
    return tmp instanceof Char ? tmp.ia_1 : THROW_CCE();
  };
  protoOf(TaggedDecoder).gbi = function (tag) {
    var tmp = this.wbh(tag);
    return typeof tmp === 'string' ? tmp : THROW_CCE();
  };
  protoOf(TaggedDecoder).hbi = function (tag, inlineDescriptor) {
    // Inline function 'kotlin.apply' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.serialization.internal.TaggedDecoder.decodeTaggedInline.<anonymous>' call
    this.ibi(tag);
    return this;
  };
  protoOf(TaggedDecoder).ob7 = function (deserializer, previousValue) {
    return this.pb7(deserializer);
  };
  protoOf(TaggedDecoder).nb7 = function (descriptor) {
    return this.hbi(this.jbi(), descriptor);
  };
  protoOf(TaggedDecoder).cb7 = function () {
    var tmp0_elvis_lhs = this.ubh();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var currentTag = tmp;
    return this.xbh(currentTag);
  };
  protoOf(TaggedDecoder).db7 = function () {
    return null;
  };
  protoOf(TaggedDecoder).eb7 = function () {
    return this.ybh(this.jbi());
  };
  protoOf(TaggedDecoder).fb7 = function () {
    return this.zbh(this.jbi());
  };
  protoOf(TaggedDecoder).gb7 = function () {
    return this.abi(this.jbi());
  };
  protoOf(TaggedDecoder).hb7 = function () {
    return this.bbi(this.jbi());
  };
  protoOf(TaggedDecoder).ib7 = function () {
    return this.cbi(this.jbi());
  };
  protoOf(TaggedDecoder).jb7 = function () {
    return this.dbi(this.jbi());
  };
  protoOf(TaggedDecoder).kb7 = function () {
    return this.ebi(this.jbi());
  };
  protoOf(TaggedDecoder).lb7 = function () {
    return this.fbi(this.jbi());
  };
  protoOf(TaggedDecoder).mb7 = function () {
    return this.gbi(this.jbi());
  };
  protoOf(TaggedDecoder).qb7 = function (descriptor) {
    return this;
  };
  protoOf(TaggedDecoder).rb7 = function (descriptor) {
  };
  protoOf(TaggedDecoder).sb7 = function (descriptor, index) {
    return this.ybh(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).tb7 = function (descriptor, index) {
    return this.zbh(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).ub7 = function (descriptor, index) {
    return this.abi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).vb7 = function (descriptor, index) {
    return this.bbi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).wb7 = function (descriptor, index) {
    return this.cbi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).xb7 = function (descriptor, index) {
    return this.dbi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).yb7 = function (descriptor, index) {
    return this.ebi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).zb7 = function (descriptor, index) {
    return this.fbi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).ab8 = function (descriptor, index) {
    return this.gbi(this.pbh(descriptor, index));
  };
  protoOf(TaggedDecoder).bb8 = function (descriptor, index) {
    return this.hbi(this.pbh(descriptor, index), descriptor.db6(index));
  };
  protoOf(TaggedDecoder).cb8 = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.pbh(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).eb8 = function (descriptor, index, deserializer, previousValue) {
    var tmp = this.pbh(descriptor, index);
    return tagBlock(this, tmp, TaggedDecoder$decodeNullableSerializableElement$lambda(this, deserializer, previousValue));
  };
  protoOf(TaggedDecoder).ubh = function () {
    return lastOrNull(this.sbh_1);
  };
  protoOf(TaggedDecoder).ibi = function (name) {
    this.sbh_1.a1(name);
  };
  protoOf(TaggedDecoder).jbi = function () {
    var r = this.sbh_1.m1(get_lastIndex_0(this.sbh_1));
    this.tbh_1 = true;
    return r;
  };
  function get_NULL() {
    _init_properties_Tuples_kt__dz0qyd();
    return NULL;
  }
  var NULL;
  function MapEntry(key, value) {
    this.kbi_1 = key;
    this.lbi_1 = value;
  }
  protoOf(MapEntry).r2 = function () {
    return this.kbi_1;
  };
  protoOf(MapEntry).s2 = function () {
    return this.lbi_1;
  };
  protoOf(MapEntry).toString = function () {
    return 'MapEntry(key=' + this.kbi_1 + ', value=' + this.lbi_1 + ')';
  };
  protoOf(MapEntry).hashCode = function () {
    var result = this.kbi_1 == null ? 0 : hashCode(this.kbi_1);
    result = imul(result, 31) + (this.lbi_1 == null ? 0 : hashCode(this.lbi_1)) | 0;
    return result;
  };
  protoOf(MapEntry).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof MapEntry))
      return false;
    var tmp0_other_with_cast = other instanceof MapEntry ? other : THROW_CCE();
    if (!equals(this.kbi_1, tmp0_other_with_cast.kbi_1))
      return false;
    if (!equals(this.lbi_1, tmp0_other_with_cast.lbi_1))
      return false;
    return true;
  };
  function MapEntrySerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildSerialDescriptor) {
      $this$buildSerialDescriptor.ib5('key', $keySerializer.yb4());
      $this$buildSerialDescriptor.ib5('value', $valueSerializer.yb4());
      return Unit_instance;
    };
  }
  function MapEntrySerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    var tmp_0 = MAP_getInstance();
    tmp.obi_1 = buildSerialDescriptor('kotlin.collections.Map.Entry', tmp_0, [], MapEntrySerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(MapEntrySerializer_0).yb4 = function () {
    return this.obi_1;
  };
  protoOf(MapEntrySerializer_0).pbi = function (key, value) {
    return new MapEntry(key, value);
  };
  function PairSerializer$descriptor$lambda($keySerializer, $valueSerializer) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.ib5('first', $keySerializer.yb4());
      $this$buildClassSerialDescriptor.ib5('second', $valueSerializer.yb4());
      return Unit_instance;
    };
  }
  function PairSerializer_0(keySerializer, valueSerializer) {
    KeyValueSerializer.call(this, keySerializer, valueSerializer);
    var tmp = this;
    tmp.ubi_1 = buildClassSerialDescriptor('kotlin.Pair', [], PairSerializer$descriptor$lambda(keySerializer, valueSerializer));
  }
  protoOf(PairSerializer_0).yb4 = function () {
    return this.ubi_1;
  };
  protoOf(PairSerializer_0).pbi = function (key, value) {
    return to(key, value);
  };
  function decodeSequentially_1($this, composite) {
    var a = composite.db8($this.ybi_1, 0, $this.vbi_1);
    var b = composite.db8($this.ybi_1, 1, $this.wbi_1);
    var c = composite.db8($this.ybi_1, 2, $this.xbi_1);
    composite.rb7($this.ybi_1);
    return new Triple(a, b, c);
  }
  function decodeStructure($this, composite) {
    var a = get_NULL();
    var b = get_NULL();
    var c = get_NULL();
    mainLoop: while (true) {
      var index = composite.hb8($this.ybi_1);
      if (index === -1) {
        break mainLoop;
      } else {
        if (index === 0) {
          a = composite.db8($this.ybi_1, 0, $this.vbi_1);
        } else {
          if (index === 1) {
            b = composite.db8($this.ybi_1, 1, $this.wbi_1);
          } else {
            if (index === 2) {
              c = composite.db8($this.ybi_1, 2, $this.xbi_1);
            } else {
              throw SerializationException_init_$Create$_0('Unexpected index ' + index);
            }
          }
        }
      }
    }
    composite.rb7($this.ybi_1);
    if (a === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'first' is missing");
    if (b === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'second' is missing");
    if (c === get_NULL())
      throw SerializationException_init_$Create$_0("Element 'third' is missing");
    var tmp = (a == null ? true : !(a == null)) ? a : THROW_CCE();
    var tmp_0 = (b == null ? true : !(b == null)) ? b : THROW_CCE();
    return new Triple(tmp, tmp_0, (c == null ? true : !(c == null)) ? c : THROW_CCE());
  }
  function TripleSerializer$descriptor$lambda(this$0) {
    return function ($this$buildClassSerialDescriptor) {
      $this$buildClassSerialDescriptor.ib5('first', this$0.vbi_1.yb4());
      $this$buildClassSerialDescriptor.ib5('second', this$0.wbi_1.yb4());
      $this$buildClassSerialDescriptor.ib5('third', this$0.xbi_1.yb4());
      return Unit_instance;
    };
  }
  function TripleSerializer_0(aSerializer, bSerializer, cSerializer) {
    this.vbi_1 = aSerializer;
    this.wbi_1 = bSerializer;
    this.xbi_1 = cSerializer;
    var tmp = this;
    tmp.ybi_1 = buildClassSerialDescriptor('kotlin.Triple', [], TripleSerializer$descriptor$lambda(this));
  }
  protoOf(TripleSerializer_0).yb4 = function () {
    return this.ybi_1;
  };
  protoOf(TripleSerializer_0).zb4 = function (decoder) {
    var composite = decoder.qb7(this.ybi_1);
    if (composite.gb8()) {
      return decodeSequentially_1(this, composite);
    }
    return decodeStructure(this, composite);
  };
  function KeyValueSerializer(keySerializer, valueSerializer) {
    this.qbi_1 = keySerializer;
    this.rbi_1 = valueSerializer;
  }
  protoOf(KeyValueSerializer).zb4 = function (decoder) {
    // Inline function 'kotlinx.serialization.encoding.decodeStructure' call
    var descriptor = this.yb4();
    var composite = decoder.qb7(descriptor);
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.serialization.internal.KeyValueSerializer.deserialize.<anonymous>' call
      if (composite.gb8()) {
        var key = composite.db8(this.yb4(), 0, this.qbi_1);
        var value = composite.db8(this.yb4(), 1, this.rbi_1);
        tmp$ret$0 = this.pbi(key, value);
        break $l$block;
      }
      var key_0 = get_NULL();
      var value_0 = get_NULL();
      mainLoop: while (true) {
        var idx = composite.hb8(this.yb4());
        if (idx === -1) {
          break mainLoop;
        } else {
          if (idx === 0) {
            key_0 = composite.db8(this.yb4(), 0, this.qbi_1);
          } else {
            if (idx === 1) {
              value_0 = composite.db8(this.yb4(), 1, this.rbi_1);
            } else {
              throw SerializationException_init_$Create$_0('Invalid index: ' + idx);
            }
          }
        }
      }
      if (key_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'key' is missing");
      if (value_0 === get_NULL())
        throw SerializationException_init_$Create$_0("Element 'value' is missing");
      var tmp = (key_0 == null ? true : !(key_0 == null)) ? key_0 : THROW_CCE();
      tmp$ret$0 = this.pbi(tmp, (value_0 == null ? true : !(value_0 == null)) ? value_0 : THROW_CCE());
    }
    var result = tmp$ret$0;
    composite.rb7(descriptor);
    return result;
  };
  var properties_initialized_Tuples_kt_3vs7ar;
  function _init_properties_Tuples_kt__dz0qyd() {
    if (!properties_initialized_Tuples_kt_3vs7ar) {
      properties_initialized_Tuples_kt_3vs7ar = true;
      NULL = new Object();
    }
  }
  function ULongSerializer() {
    ULongSerializer_instance = this;
    this.zbi_1 = InlinePrimitiveDescriptor('kotlin.ULong', serializer_4(Companion_getInstance_0()));
  }
  protoOf(ULongSerializer).yb4 = function () {
    return this.zbi_1;
  };
  protoOf(ULongSerializer).abj = function (decoder) {
    // Inline function 'kotlin.toULong' call
    var this_0 = decoder.nb7(this.zbi_1).ib7();
    return _ULong___init__impl__c78o9k(this_0);
  };
  protoOf(ULongSerializer).zb4 = function (decoder) {
    return new ULong(this.abj(decoder));
  };
  var ULongSerializer_instance;
  function ULongSerializer_getInstance() {
    if (ULongSerializer_instance == null)
      new ULongSerializer();
    return ULongSerializer_instance;
  }
  function UIntSerializer() {
    UIntSerializer_instance = this;
    this.bbj_1 = InlinePrimitiveDescriptor('kotlin.UInt', serializer_6(IntCompanionObject_instance));
  }
  protoOf(UIntSerializer).yb4 = function () {
    return this.bbj_1;
  };
  protoOf(UIntSerializer).cbj = function (decoder) {
    // Inline function 'kotlin.toUInt' call
    var this_0 = decoder.nb7(this.bbj_1).hb7();
    return _UInt___init__impl__l7qpdl(this_0);
  };
  protoOf(UIntSerializer).zb4 = function (decoder) {
    return new UInt(this.cbj(decoder));
  };
  var UIntSerializer_instance;
  function UIntSerializer_getInstance() {
    if (UIntSerializer_instance == null)
      new UIntSerializer();
    return UIntSerializer_instance;
  }
  function UShortSerializer() {
    UShortSerializer_instance = this;
    this.dbj_1 = InlinePrimitiveDescriptor('kotlin.UShort', serializer_8(ShortCompanionObject_instance));
  }
  protoOf(UShortSerializer).yb4 = function () {
    return this.dbj_1;
  };
  protoOf(UShortSerializer).ebj = function (decoder) {
    // Inline function 'kotlin.toUShort' call
    var this_0 = decoder.nb7(this.dbj_1).gb7();
    return _UShort___init__impl__jigrne(this_0);
  };
  protoOf(UShortSerializer).zb4 = function (decoder) {
    return new UShort(this.ebj(decoder));
  };
  var UShortSerializer_instance;
  function UShortSerializer_getInstance() {
    if (UShortSerializer_instance == null)
      new UShortSerializer();
    return UShortSerializer_instance;
  }
  function UByteSerializer() {
    UByteSerializer_instance = this;
    this.fbj_1 = InlinePrimitiveDescriptor('kotlin.UByte', serializer_10(ByteCompanionObject_instance));
  }
  protoOf(UByteSerializer).yb4 = function () {
    return this.fbj_1;
  };
  protoOf(UByteSerializer).gbj = function (decoder) {
    // Inline function 'kotlin.toUByte' call
    var this_0 = decoder.nb7(this.fbj_1).fb7();
    return _UByte___init__impl__g9hnc4(this_0);
  };
  protoOf(UByteSerializer).zb4 = function (decoder) {
    return new UByte(this.gbj(decoder));
  };
  var UByteSerializer_instance;
  function UByteSerializer_getInstance() {
    if (UByteSerializer_instance == null)
      new UByteSerializer();
    return UByteSerializer_instance;
  }
  function get_EmptySerializersModuleLegacyJs() {
    _init_properties_SerializersModule_kt__u78ha3();
    return EmptySerializersModule;
  }
  var EmptySerializersModule;
  function SerializersModule() {
  }
  protoOf(SerializersModule).qb5 = function (kClass, typeArgumentsSerializers, $super) {
    typeArgumentsSerializers = typeArgumentsSerializers === VOID ? emptyList() : typeArgumentsSerializers;
    return $super === VOID ? this.pb5(kClass, typeArgumentsSerializers) : $super.pb5.call(this, kClass, typeArgumentsSerializers);
  };
  function SerialModuleImpl(class2ContextualFactory, polyBase2Serializers, polyBase2DefaultSerializerProvider, polyBase2NamedSerializers, polyBase2DefaultDeserializerProvider) {
    SerializersModule.call(this);
    this.ibj_1 = class2ContextualFactory;
    this.jbj_1 = polyBase2Serializers;
    this.kbj_1 = polyBase2DefaultSerializerProvider;
    this.lbj_1 = polyBase2NamedSerializers;
    this.mbj_1 = polyBase2DefaultDeserializerProvider;
  }
  protoOf(SerialModuleImpl).lb8 = function (baseClass, serializedClassName) {
    var tmp0_safe_receiver = this.lbj_1.z2(baseClass);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.collections.get' call
      tmp = (isInterface(tmp0_safe_receiver, Map) ? tmp0_safe_receiver : THROW_CCE()).z2(serializedClassName);
    }
    var tmp_0 = tmp;
    var registered = (!(tmp_0 == null) ? isInterface(tmp_0, KSerializer) : false) ? tmp_0 : null;
    if (!(registered == null))
      return registered;
    var tmp_1 = this.mbj_1.z2(baseClass);
    var tmp1_safe_receiver = (!(tmp_1 == null) ? typeof tmp_1 === 'function' : false) ? tmp_1 : null;
    return tmp1_safe_receiver == null ? null : tmp1_safe_receiver(serializedClassName);
  };
  protoOf(SerialModuleImpl).pb5 = function (kClass, typeArgumentsSerializers) {
    var tmp0_safe_receiver = this.ibj_1.z2(kClass);
    var tmp = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.nbj(typeArgumentsSerializers);
    return (tmp == null ? true : isInterface(tmp, KSerializer)) ? tmp : null;
  };
  protoOf(SerialModuleImpl).hbj = function (collector) {
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator = this.ibj_1.o2().o();
    while (tmp0_iterator.d1()) {
      var element = tmp0_iterator.f1();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var kclass = element.r2();
      // Inline function 'kotlin.collections.component2' call
      var serial = element.s2();
      if (serial instanceof Argless) {
        var tmp = isInterface(kclass, KClass) ? kclass : THROW_CCE();
        var tmp_0 = serial.qbj_1;
        collector.rbj(tmp, isInterface(tmp_0, KSerializer) ? tmp_0 : THROW_CCE());
      } else {
        if (serial instanceof WithTypeArguments) {
          collector.pbj(kclass, serial.obj_1);
        }
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator_0 = this.jbj_1.o2().o();
    while (tmp0_iterator_0.d1()) {
      var element_0 = tmp0_iterator_0.f1();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass = element_0.r2();
      // Inline function 'kotlin.collections.component2' call
      var classMap = element_0.s2();
      // Inline function 'kotlin.collections.forEach' call
      // Inline function 'kotlin.collections.iterator' call
      var tmp0_iterator_1 = classMap.o2().o();
      while (tmp0_iterator_1.d1()) {
        var element_1 = tmp0_iterator_1.f1();
        // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.collections.component1' call
        var actualClass = element_1.r2();
        // Inline function 'kotlin.collections.component2' call
        var serializer = element_1.s2();
        var tmp_1 = isInterface(baseClass, KClass) ? baseClass : THROW_CCE();
        var tmp_2 = isInterface(actualClass, KClass) ? actualClass : THROW_CCE();
        // Inline function 'kotlinx.serialization.internal.cast' call
        var tmp$ret$9 = isInterface(serializer, KSerializer) ? serializer : THROW_CCE();
        collector.sbj(tmp_1, tmp_2, tmp$ret$9);
      }
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator_2 = this.kbj_1.o2().o();
    while (tmp0_iterator_2.d1()) {
      var element_2 = tmp0_iterator_2.f1();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass_0 = element_2.r2();
      // Inline function 'kotlin.collections.component2' call
      var provider = element_2.s2();
      var tmp_3 = isInterface(baseClass_0, KClass) ? baseClass_0 : THROW_CCE();
      collector.tbj(tmp_3, typeof provider === 'function' ? provider : THROW_CCE());
    }
    // Inline function 'kotlin.collections.forEach' call
    // Inline function 'kotlin.collections.iterator' call
    var tmp0_iterator_3 = this.mbj_1.o2().o();
    while (tmp0_iterator_3.d1()) {
      var element_3 = tmp0_iterator_3.f1();
      // Inline function 'kotlinx.serialization.modules.SerialModuleImpl.dumpTo.<anonymous>' call
      // Inline function 'kotlin.collections.component1' call
      var baseClass_1 = element_3.r2();
      // Inline function 'kotlin.collections.component2' call
      var provider_0 = element_3.s2();
      var tmp_4 = isInterface(baseClass_1, KClass) ? baseClass_1 : THROW_CCE();
      collector.ubj(tmp_4, typeof provider_0 === 'function' ? provider_0 : THROW_CCE());
    }
  };
  function Argless() {
  }
  function WithTypeArguments() {
  }
  function ContextualProvider() {
  }
  var properties_initialized_SerializersModule_kt_fjigjn;
  function _init_properties_SerializersModule_kt__u78ha3() {
    if (!properties_initialized_SerializersModule_kt_fjigjn) {
      properties_initialized_SerializersModule_kt_fjigjn = true;
      EmptySerializersModule = new SerialModuleImpl(emptyMap(), emptyMap(), emptyMap(), emptyMap(), emptyMap());
    }
  }
  function EmptySerializersModule_0() {
    return get_EmptySerializersModuleLegacyJs();
  }
  function SerializersModuleCollector$contextual$lambda($serializer) {
    return function (it) {
      return $serializer;
    };
  }
  function SerializersModuleCollector() {
  }
  function SerializableWith(serializer) {
    this.vbj_1 = serializer;
  }
  protoOf(SerializableWith).equals = function (other) {
    if (!(other instanceof SerializableWith))
      return false;
    var tmp0_other_with_cast = other instanceof SerializableWith ? other : THROW_CCE();
    if (!this.vbj_1.equals(tmp0_other_with_cast.vbj_1))
      return false;
    return true;
  };
  protoOf(SerializableWith).hashCode = function () {
    return imul(getStringHashCode('serializer'), 127) ^ this.vbj_1.hashCode();
  };
  protoOf(SerializableWith).toString = function () {
    return '@kotlinx.serialization.SerializableWith(serializer=' + this.vbj_1 + ')';
  };
  function createCache(factory) {
    return new createCache$1(factory);
  }
  function createParametrizedCache(factory) {
    return new createParametrizedCache$1(factory);
  }
  function compiledSerializerImpl(_this__u8e3s4) {
    var tmp1_elvis_lhs = constructSerializerForGivenTypeArgs(_this__u8e3s4, []);
    var tmp;
    if (tmp1_elvis_lhs == null) {
      var tmp_0;
      if (_this__u8e3s4 === PrimitiveClasses_getInstance().w7()) {
        tmp_0 = NothingSerializer_getInstance();
      } else {
        // Inline function 'kotlin.js.asDynamic' call
        var tmp0_safe_receiver = get_js(_this__u8e3s4).Companion;
        tmp_0 = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.serializer();
      }
      var tmp_1 = tmp_0;
      tmp = (!(tmp_1 == null) ? isInterface(tmp_1, KSerializer) : false) ? tmp_1 : null;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    return tmp;
  }
  function platformSpecificSerializerNotRegistered(_this__u8e3s4) {
    throw SerializationException_init_$Create$_0(notRegisteredMessage(_this__u8e3s4) + 'To get enum serializer on Kotlin/JS, it should be annotated with @Serializable annotation.');
  }
  function isReferenceArray(rootClass) {
    return rootClass.equals(PrimitiveClasses_getInstance().d8());
  }
  function constructSerializerForGivenTypeArgs(_this__u8e3s4, args) {
    var tmp;
    try {
      // Inline function 'kotlin.reflect.findAssociatedObject' call
      var assocObject = findAssociatedObject(_this__u8e3s4, getKClass(SerializableWith));
      var tmp_0;
      if (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) {
        tmp_0 = (!(assocObject == null) ? isInterface(assocObject, KSerializer) : false) ? assocObject : THROW_CCE();
      } else {
        if (!(assocObject == null) ? isInterface(assocObject, SerializerFactory) : false) {
          var tmp_1 = assocObject.kbd(args.slice());
          tmp_0 = isInterface(tmp_1, KSerializer) ? tmp_1 : THROW_CCE();
        } else {
          if (get_isInterface(_this__u8e3s4)) {
            tmp_0 = new PolymorphicSerializer(_this__u8e3s4);
          } else {
            tmp_0 = null;
          }
        }
      }
      tmp = tmp_0;
    } catch ($p) {
      var tmp_2;
      var e = $p;
      tmp_2 = null;
      tmp = tmp_2;
    }
    return tmp;
  }
  function get_isInterface(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_safe_receiver = get_js(_this__u8e3s4).$metadata$;
    return (tmp0_safe_receiver == null ? null : tmp0_safe_receiver.kind) == 'interface';
  }
  function toNativeArrayImpl(_this__u8e3s4, eClass) {
    // Inline function 'kotlin.collections.toTypedArray' call
    return copyToArray(_this__u8e3s4);
  }
  function getChecked(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices(_this__u8e3s4));
    return _this__u8e3s4[index];
  }
  function getChecked_0(_this__u8e3s4, index) {
    if (!(0 <= index ? index <= (_this__u8e3s4.length - 1 | 0) : false))
      throw IndexOutOfBoundsException_init_$Create$('Index ' + index + ' out of bounds ' + get_indices_0(_this__u8e3s4));
    return _this__u8e3s4[index];
  }
  function createCache$1($factory) {
    this.wbj_1 = $factory;
  }
  protoOf(createCache$1).rb5 = function (key) {
    return this.wbj_1(key);
  };
  function createParametrizedCache$1($factory) {
    this.xbj_1 = $factory;
  }
  protoOf(createParametrizedCache$1).sb5 = function (key, types) {
    // Inline function 'kotlin.runCatching' call
    var tmp;
    try {
      // Inline function 'kotlin.Companion.success' call
      // Inline function 'kotlinx.serialization.internal.<no name provided>.get.<anonymous>' call
      var value = this.xbj_1(key, types);
      tmp = _Result___init__impl__xyqfz8(value);
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var e = $p;
        // Inline function 'kotlin.Companion.failure' call
        tmp_0 = _Result___init__impl__xyqfz8(createFailure(e));
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  //region block: post-declaration
  protoOf(SerialDescriptorImpl).tb5 = get_isNullable;
  protoOf(SerialDescriptorImpl).ab6 = get_isInline;
  protoOf(AbstractDecoder).db8 = decodeSerializableElement$default;
  protoOf(AbstractDecoder).pb7 = decodeSerializableValue;
  protoOf(AbstractDecoder).gb8 = decodeSequentially;
  protoOf(AbstractDecoder).ib8 = decodeCollectionSize;
  protoOf(ListLikeDescriptor).tb5 = get_isNullable;
  protoOf(ListLikeDescriptor).ab6 = get_isInline;
  protoOf(ListLikeDescriptor).yb5 = get_annotations;
  protoOf(MapLikeDescriptor).tb5 = get_isNullable;
  protoOf(MapLikeDescriptor).ab6 = get_isInline;
  protoOf(MapLikeDescriptor).yb5 = get_annotations;
  protoOf(PluginGeneratedSerialDescriptor).tb5 = get_isNullable;
  protoOf(PluginGeneratedSerialDescriptor).ab6 = get_isInline;
  protoOf(InlinePrimitiveDescriptor$1).cbd = typeParametersSerializers;
  protoOf(NothingSerialDescriptor).tb5 = get_isNullable;
  protoOf(NothingSerialDescriptor).ab6 = get_isInline;
  protoOf(NothingSerialDescriptor).yb5 = get_annotations;
  protoOf(PrimitiveSerialDescriptor_0).tb5 = get_isNullable;
  protoOf(PrimitiveSerialDescriptor_0).ab6 = get_isInline;
  protoOf(PrimitiveSerialDescriptor_0).yb5 = get_annotations;
  protoOf(TaggedDecoder).db8 = decodeSerializableElement$default;
  protoOf(TaggedDecoder).pb7 = decodeSerializableValue;
  protoOf(TaggedDecoder).gb8 = decodeSequentially;
  protoOf(TaggedDecoder).ib8 = decodeCollectionSize;
  //endregion
  //region block: init
  Companion_instance_0 = new Companion();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = SerializationException_init_$Init$_0;
  _.$_$.b = UnknownFieldException_init_$Create$;
  _.$_$.c = SEALED_getInstance;
  _.$_$.d = STRING_getInstance;
  _.$_$.e = CONTEXTUAL_getInstance;
  _.$_$.f = ENUM_getInstance;
  _.$_$.g = CLASS_getInstance;
  _.$_$.h = LIST_getInstance;
  _.$_$.i = MAP_getInstance;
  _.$_$.j = Companion_instance_0;
  _.$_$.k = IntSerializer_getInstance;
  _.$_$.l = StringSerializer_getInstance;
  _.$_$.m = ListSerializer;
  _.$_$.n = MapSerializer;
  _.$_$.o = get_nullable;
  _.$_$.p = serializer_0;
  _.$_$.q = serializer_9;
  _.$_$.r = serializer_7;
  _.$_$.s = serializer_11;
  _.$_$.t = serializer_5;
  _.$_$.u = PolymorphicKind;
  _.$_$.v = PrimitiveKind;
  _.$_$.w = PrimitiveSerialDescriptor;
  _.$_$.x = get_annotations;
  _.$_$.y = get_isInline;
  _.$_$.z = get_isNullable;
  _.$_$.a1 = SerialDescriptor;
  _.$_$.b1 = ENUM;
  _.$_$.c1 = buildSerialDescriptor;
  _.$_$.d1 = getContextualDescriptor;
  _.$_$.e1 = AbstractDecoder;
  _.$_$.f1 = CompositeDecoder;
  _.$_$.g1 = Decoder;
  _.$_$.h1 = AbstractPolymorphicSerializer;
  _.$_$.i1 = ElementMarker;
  _.$_$.j1 = typeParametersSerializers;
  _.$_$.k1 = GeneratedSerializer;
  _.$_$.l1 = InlinePrimitiveDescriptor;
  _.$_$.m1 = NamedValueDecoder;
  _.$_$.n1 = PluginGeneratedSerialDescriptor;
  _.$_$.o1 = SerializerFactory;
  _.$_$.p1 = jsonCachedSerialNames;
  _.$_$.q1 = throwMissingFieldException;
  _.$_$.r1 = EmptySerializersModule_0;
  _.$_$.s1 = contextual;
  _.$_$.t1 = SerializersModuleCollector;
  _.$_$.u1 = DeserializationStrategy;
  _.$_$.v1 = KSerializer;
  _.$_$.w1 = MissingFieldException;
  _.$_$.x1 = SerializationException;
  _.$_$.y1 = findPolymorphicSerializer;
  _.$_$.z1 = serializer;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-serialization-kotlinx-serialization-core.js.map
