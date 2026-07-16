(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-collection-collection'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-collection-collection'.");
    }
    root['compose-multiplatform-core-collection-collection'] = factory(typeof this['compose-multiplatform-core-collection-collection'] === 'undefined' ? {} : this['compose-multiplatform-core-collection-collection'], this['kotlin-kotlin-stdlib']);
  }
}(this, function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var clz32 = Math.clz32;
  var longArray = kotlin_kotlin.$_$.bb;
  var fill = kotlin_kotlin.$_$.q6;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Long = kotlin_kotlin.$_$.ve;
  var toLong = kotlin_kotlin.$_$.lb;
  var countTrailingZeroBits = kotlin_kotlin.$_$.sf;
  var _ULong___init__impl__c78o9k = kotlin_kotlin.$_$.i3;
  var _ULong___get_data__impl__fggpzb = kotlin_kotlin.$_$.j3;
  var ulongCompare = kotlin_kotlin.$_$.qg;
  var VOID = kotlin_kotlin.$_$.g;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var protoOf = kotlin_kotlin.$_$.ib;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var NoSuchElementException_init_$Create$ = kotlin_kotlin.$_$.c2;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.m2;
  var fillArrayVal = kotlin_kotlin.$_$.ea;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var hashCode = kotlin_kotlin.$_$.la;
  var equals = kotlin_kotlin.$_$.da;
  var fill_0 = kotlin_kotlin.$_$.r6;
  var longArrayOf = kotlin_kotlin.$_$.ab;
  var toString_0 = kotlin_kotlin.$_$.ng;
  var copyOf = kotlin_kotlin.$_$.d6;
  var copyOf_0 = kotlin_kotlin.$_$.j6;
  var arrayCopy = kotlin_kotlin.$_$.p5;
  var StringBuilder_init_$Create$_0 = kotlin_kotlin.$_$.h1;
  //endregion
  //region block: pre-declaration
  setMetadataFor(IntIntMap, 'IntIntMap', classMeta);
  setMetadataFor(MutableIntIntMap, 'MutableIntIntMap', classMeta, IntIntMap, VOID, MutableIntIntMap);
  setMetadataFor(IntObjectMap, 'IntObjectMap', classMeta);
  setMetadataFor(MutableIntObjectMap, 'MutableIntObjectMap', classMeta, IntObjectMap, VOID, MutableIntObjectMap);
  setMetadataFor(IntSet, 'IntSet', classMeta);
  setMetadataFor(MutableIntSet, 'MutableIntSet', classMeta, IntSet, VOID, MutableIntSet);
  setMetadataFor(LongSet, 'LongSet', classMeta);
  setMetadataFor(MutableLongSet, 'MutableLongSet', classMeta, LongSet, VOID, MutableLongSet);
  setMetadataFor(ObjectIntMap, 'ObjectIntMap', classMeta);
  setMetadataFor(MutableObjectIntMap, 'MutableObjectIntMap', classMeta, ObjectIntMap, VOID, MutableObjectIntMap);
  setMetadataFor(ScatterMap, 'ScatterMap', classMeta);
  setMetadataFor(MutableScatterMap, 'MutableScatterMap', classMeta, ScatterMap, VOID, MutableScatterMap);
  setMetadataFor(ScatterSet, 'ScatterSet', classMeta);
  setMetadataFor(MutableScatterSet, 'MutableScatterSet', classMeta, ScatterSet, VOID, MutableScatterSet);
  setMetadataFor(LongSparseArray, 'LongSparseArray', classMeta, VOID, VOID, LongSparseArray);
  //endregion
  function initializeStorage($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.comparisons.maxOf' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.dk_1 = newCapacity;
    initializeMetadata($this, newCapacity);
    $this.bk_1 = new Int32Array(newCapacity);
    $this.ck_1 = new Int32Array(newCapacity);
  }
  function initializeMetadata($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + get_ClonedMetadataCount() | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableIntIntMap.initializeMetadata.<anonymous>' call
      fill(this_0, get_AllEmpty());
      tmp_0 = this_0;
    }
    tmp.ak_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.ak_1;
    var value = get_Sentinel();
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth($this);
  }
  function initializeGrowth($this) {
    $this.kk_1 = loadedCapacity($this.lk()) - $this.ek_1 | 0;
  }
  function findInsertIndex($this, key) {
    // Inline function 'androidx.collection.hash' call
    var hash = imul(key, get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h1' call
    var hash1 = hash_0 >>> 7 | 0;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = $this.dk_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.ak_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$4);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if ($this.bk_1[index] === key) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    var index_0 = findFirstAvailableSlot($this, hash1);
    var tmp_0;
    if ($this.kk_1 === 0) {
      // Inline function 'androidx.collection.isDeleted' call
      // Inline function 'androidx.collection.readRawMetadata' call
      var offset_0 = index_0;
      tmp_0 = !$this.ak_1[offset_0 >> 3].lb((offset_0 & 7) << 3).nb(new Long(255, 0)).equals(get_Deleted());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      adjustStorage($this);
      index_0 = findFirstAvailableSlot($this, hash1);
    }
    $this.ek_1 = $this.ek_1 + 1 | 0;
    var tmp_1 = $this;
    var tmp_2 = $this.kk_1;
    var tmp_3;
    // Inline function 'androidx.collection.isEmpty' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_1 = index_0;
    if ($this.ak_1[offset_1 >> 3].lb((offset_1 & 7) << 3).nb(new Long(255, 0)).equals(get_Empty())) {
      tmp_3 = 1;
    } else {
      tmp_3 = 0;
    }
    tmp_1.kk_1 = tmp_2 - tmp_3 | 0;
    // Inline function 'androidx.collection.MutableIntIntMap.writeMetadata' call
    var index_1 = index_0;
    var value = toLong(hash2);
    var m_0 = $this.ak_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = index_1 >> 3;
    var b_0 = (index_1 & 7) << 3;
    m_0[i_0] = m_0[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    var c = $this.dk_1;
    var cloneIndex = ((index_1 - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_1 = cloneIndex >> 3;
    var b_1 = (cloneIndex & 7) << 3;
    m_0[i_1] = m_0[i_1].nb((new Long(255, 0)).kb(b_1).jb()).ob(value.kb(b_1));
    return ~index_0;
  }
  function findFirstAvailableSlot($this, hash1) {
    var probeMask = $this.dk_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.ak_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
      var m = g.nb(g.jb().kb(7)).nb(get_BitmaskMsb());
      if (!m.equals(new Long(0, 0))) {
        var tmp = probeOffset;
        // Inline function 'androidx.collection.lowestBitSet' call
        return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
  }
  function adjustStorage($this) {
    var tmp;
    if ($this.dk_1 > get_GroupWidth()) {
      // Inline function 'kotlin.ULong.compareTo' call
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_0 = $this.ek_1;
      var this_1 = _ULong___init__impl__c78o9k(toLong(this_0));
      var other = _ULong___init__impl__c78o9k(new Long(32, 0));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).w9(_ULong___get_data__impl__fggpzb(other)));
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_3 = $this.dk_1;
      var this_4 = _ULong___init__impl__c78o9k(toLong(this_3));
      var other_0 = _ULong___init__impl__c78o9k(new Long(25, 0));
      var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).w9(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      resizeStorage($this, nextCapacity($this.dk_1));
    } else {
      resizeStorage($this, nextCapacity($this.dk_1));
    }
  }
  function resizeStorage($this, newCapacity) {
    var previousMetadata = $this.ak_1;
    var previousKeys = $this.bk_1;
    var previousValues = $this.ck_1;
    var previousCapacity = $this.dk_1;
    initializeStorage($this, newCapacity);
    var newKeys = $this.bk_1;
    var newValues = $this.ck_1;
    var inductionVariable = 0;
    if (inductionVariable < previousCapacity)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.collection.isFull' call
        // Inline function 'androidx.collection.readRawMetadata' call
        if (previousMetadata[i >> 3].lb((i & 7) << 3).nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
          var previousKey = previousKeys[i];
          // Inline function 'androidx.collection.hash' call
          var hash = imul(previousKey, get_MurmurHashC1());
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var tmp$ret$3 = hash_0 >>> 7 | 0;
          var index = findFirstAvailableSlot($this, tmp$ret$3);
          // Inline function 'androidx.collection.MutableIntIntMap.writeMetadata' call
          // Inline function 'androidx.collection.h2' call
          var tmp$ret$4 = hash_0 & 127;
          var value = toLong(tmp$ret$4);
          var m = $this.ak_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_0 = index >> 3;
          var b = (index & 7) << 3;
          m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
          var c = $this.dk_1;
          var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_1 = cloneIndex >> 3;
          var b_0 = (cloneIndex & 7) << 3;
          m[i_1] = m[i_1].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
          newKeys[index] = previousKey;
          newValues[index] = previousValues[i];
        }
      }
       while (inductionVariable < previousCapacity);
  }
  function MutableIntIntMap(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? get_DefaultScatterCapacity() : initialCapacity;
    IntIntMap.call(this);
    this.kk_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableIntIntMap.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage(this, unloadedCapacity(initialCapacity));
  }
  protoOf(MutableIntIntMap).mk = function (key, value) {
    var index = findInsertIndex(this, key);
    if (index < 0)
      index = ~index;
    this.bk_1[index] = key;
    this.ck_1[index] = value;
  };
  function IntIntMap() {
    this.ak_1 = get_EmptyGroup();
    this.bk_1 = get_EmptyIntArray();
    this.ck_1 = get_EmptyIntArray();
    this.dk_1 = 0;
    this.ek_1 = 0;
  }
  protoOf(IntIntMap).lk = function () {
    return this.dk_1;
  };
  protoOf(IntIntMap).m = function () {
    return this.ek_1;
  };
  protoOf(IntIntMap).u = function () {
    return this.ek_1 === 0;
  };
  protoOf(IntIntMap).n = function (key) {
    var index = this.nk(key);
    if (index < 0) {
      throw NoSuchElementException_init_$Create$('Cannot find value for key ' + key);
    }
    return this.ck_1[index];
  };
  protoOf(IntIntMap).fg = function (key) {
    return this.nk(key) >= 0;
  };
  protoOf(IntIntMap).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.IntIntMap.forEach' call
    var k = this.bk_1;
    var v = this.ck_1;
    $l$block: {
      // Inline function 'androidx.collection.IntIntMap.forEachIndexed' call
      var m = this.ak_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntIntMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntIntMap.hashCode.<anonymous>' call
                  hash = hash + (k[index] ^ v[index]) | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(IntIntMap).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof IntIntMap)) {
      return false;
    }
    if (!(other.m() === this.m())) {
      return false;
    }
    // Inline function 'androidx.collection.IntIntMap.forEach' call
    var k = this.bk_1;
    var v = this.ck_1;
    $l$block: {
      // Inline function 'androidx.collection.IntIntMap.forEachIndexed' call
      var m = this.ak_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntIntMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntIntMap.equals.<anonymous>' call
                  var key = k[index];
                  if (!(v[index] === other.n(key))) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(IntIntMap).toString = function () {
    if (this.u()) {
      return '{}';
    }
    var s = StringBuilder_init_$Create$().z5(_Char___init__impl__6a9atx(123));
    var i = 0;
    // Inline function 'androidx.collection.IntIntMap.forEach' call
    var k = this.bk_1;
    var v = this.ck_1;
    $l$block: {
      // Inline function 'androidx.collection.IntIntMap.forEachIndexed' call
      var m = this.ak_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i_0];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i_0 - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i_0 << 3) + j | 0;
                  // Inline function 'androidx.collection.IntIntMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntIntMap.toString.<anonymous>' call
                  var key = k[index];
                  var value = v[index];
                  s.r8(key);
                  s.y5('=');
                  s.r8(value);
                  i = i + 1 | 0;
                  if (i < this.ek_1) {
                    s.z5(_Char___init__impl__6a9atx(44)).z5(_Char___init__impl__6a9atx(32));
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i_0 === lastIndex));
    }
    return s.z5(_Char___init__impl__6a9atx(125)).toString();
  };
  protoOf(IntIntMap).nk = function (key) {
    // Inline function 'androidx.collection.hash' call
    var hash = imul(key, get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = this.dk_1;
    // Inline function 'androidx.collection.h1' call
    var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = this.ak_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$4);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if (this.bk_1[index] === key) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    return -1;
  };
  var EmptyIntObjectMap;
  function initializeStorage_0($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.comparisons.maxOf' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.rk_1 = newCapacity;
    initializeMetadata_0($this, newCapacity);
    $this.pk_1 = new Int32Array(newCapacity);
    var tmp_0 = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp_0.qk_1 = fillArrayVal(Array(newCapacity), null);
  }
  function initializeMetadata_0($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + get_ClonedMetadataCount() | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableIntObjectMap.initializeMetadata.<anonymous>' call
      fill(this_0, get_AllEmpty());
      tmp_0 = this_0;
    }
    tmp.ok_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.ok_1;
    var value = get_Sentinel();
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth_0($this);
  }
  function initializeGrowth_0($this) {
    $this.yk_1 = loadedCapacity($this.lk()) - $this.sk_1 | 0;
  }
  function findAbsoluteInsertIndex($this, key) {
    // Inline function 'androidx.collection.hash' call
    var hash = imul(key, get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h1' call
    var hash1 = hash_0 >>> 7 | 0;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = $this.rk_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.ok_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$4);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if ($this.pk_1[index] === key) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    var index_0 = findFirstAvailableSlot_0($this, hash1);
    var tmp_0;
    if ($this.yk_1 === 0) {
      // Inline function 'androidx.collection.isDeleted' call
      // Inline function 'androidx.collection.readRawMetadata' call
      var offset_0 = index_0;
      tmp_0 = !$this.ok_1[offset_0 >> 3].lb((offset_0 & 7) << 3).nb(new Long(255, 0)).equals(get_Deleted());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      adjustStorage_0($this);
      index_0 = findFirstAvailableSlot_0($this, hash1);
    }
    $this.sk_1 = $this.sk_1 + 1 | 0;
    var tmp_1 = $this;
    var tmp_2 = $this.yk_1;
    var tmp_3;
    // Inline function 'androidx.collection.isEmpty' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_1 = index_0;
    if ($this.ok_1[offset_1 >> 3].lb((offset_1 & 7) << 3).nb(new Long(255, 0)).equals(get_Empty())) {
      tmp_3 = 1;
    } else {
      tmp_3 = 0;
    }
    tmp_1.yk_1 = tmp_2 - tmp_3 | 0;
    // Inline function 'androidx.collection.MutableIntObjectMap.writeMetadata' call
    var index_1 = index_0;
    var value = toLong(hash2);
    var m_0 = $this.ok_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = index_1 >> 3;
    var b_0 = (index_1 & 7) << 3;
    m_0[i_0] = m_0[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    var c = $this.rk_1;
    var cloneIndex = ((index_1 - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_1 = cloneIndex >> 3;
    var b_1 = (cloneIndex & 7) << 3;
    m_0[i_1] = m_0[i_1].nb((new Long(255, 0)).kb(b_1).jb()).ob(value.kb(b_1));
    return index_0;
  }
  function findFirstAvailableSlot_0($this, hash1) {
    var probeMask = $this.rk_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.ok_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
      var m = g.nb(g.jb().kb(7)).nb(get_BitmaskMsb());
      if (!m.equals(new Long(0, 0))) {
        var tmp = probeOffset;
        // Inline function 'androidx.collection.lowestBitSet' call
        return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
  }
  function adjustStorage_0($this) {
    var tmp;
    if ($this.rk_1 > get_GroupWidth()) {
      // Inline function 'kotlin.ULong.compareTo' call
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_0 = $this.sk_1;
      var this_1 = _ULong___init__impl__c78o9k(toLong(this_0));
      var other = _ULong___init__impl__c78o9k(new Long(32, 0));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).w9(_ULong___get_data__impl__fggpzb(other)));
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_3 = $this.rk_1;
      var this_4 = _ULong___init__impl__c78o9k(toLong(this_3));
      var other_0 = _ULong___init__impl__c78o9k(new Long(25, 0));
      var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).w9(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      resizeStorage_0($this, nextCapacity($this.rk_1));
    } else {
      resizeStorage_0($this, nextCapacity($this.rk_1));
    }
  }
  function resizeStorage_0($this, newCapacity) {
    var previousMetadata = $this.ok_1;
    var previousKeys = $this.pk_1;
    var previousValues = $this.qk_1;
    var previousCapacity = $this.rk_1;
    initializeStorage_0($this, newCapacity);
    var newKeys = $this.pk_1;
    var newValues = $this.qk_1;
    var inductionVariable = 0;
    if (inductionVariable < previousCapacity)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.collection.isFull' call
        // Inline function 'androidx.collection.readRawMetadata' call
        if (previousMetadata[i >> 3].lb((i & 7) << 3).nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
          var previousKey = previousKeys[i];
          // Inline function 'androidx.collection.hash' call
          var hash = imul(previousKey, get_MurmurHashC1());
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var tmp$ret$3 = hash_0 >>> 7 | 0;
          var index = findFirstAvailableSlot_0($this, tmp$ret$3);
          // Inline function 'androidx.collection.MutableIntObjectMap.writeMetadata' call
          // Inline function 'androidx.collection.h2' call
          var tmp$ret$4 = hash_0 & 127;
          var value = toLong(tmp$ret$4);
          var m = $this.ok_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_0 = index >> 3;
          var b = (index & 7) << 3;
          m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
          var c = $this.rk_1;
          var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_1 = cloneIndex >> 3;
          var b_0 = (cloneIndex & 7) << 3;
          m[i_1] = m[i_1].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
          newKeys[index] = previousKey;
          newValues[index] = previousValues[i];
        }
      }
       while (inductionVariable < previousCapacity);
  }
  function MutableIntObjectMap(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? get_DefaultScatterCapacity() : initialCapacity;
    IntObjectMap.call(this);
    this.yk_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableIntObjectMap.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage_0(this, unloadedCapacity(initialCapacity));
  }
  protoOf(MutableIntObjectMap).zk = function (key, value) {
    var index = findAbsoluteInsertIndex(this, key);
    this.pk_1[index] = key;
    this.qk_1[index] = value;
  };
  function IntObjectMap() {
    this.ok_1 = get_EmptyGroup();
    this.pk_1 = get_EmptyIntArray();
    this.qk_1 = get_EMPTY_OBJECTS();
    this.rk_1 = 0;
    this.sk_1 = 0;
  }
  protoOf(IntObjectMap).lk = function () {
    return this.rk_1;
  };
  protoOf(IntObjectMap).m = function () {
    return this.sk_1;
  };
  protoOf(IntObjectMap).u = function () {
    return this.sk_1 === 0;
  };
  protoOf(IntObjectMap).n = function (key) {
    var tmp$ret$9;
    $l$block: {
      // Inline function 'androidx.collection.IntObjectMap.findKeyIndex' call
      // Inline function 'androidx.collection.hash' call
      var hash = imul(key, get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.rk_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.ok_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$4);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (this.pk_1[index] === key) {
            tmp$ret$9 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$9 = -1;
    }
    var index_0 = tmp$ret$9;
    var tmp_0;
    if (index_0 >= 0) {
      var tmp_1 = this.qk_1[index_0];
      tmp_0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    } else {
      tmp_0 = null;
    }
    return tmp_0;
  };
  protoOf(IntObjectMap).al = function (key) {
    var tmp$ret$9;
    $l$block: {
      // Inline function 'androidx.collection.IntObjectMap.findKeyIndex' call
      // Inline function 'androidx.collection.hash' call
      var hash = imul(key, get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.rk_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.ok_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$4);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (this.pk_1[index] === key) {
            tmp$ret$9 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$9 = -1;
    }
    return tmp$ret$9 >= 0;
  };
  protoOf(IntObjectMap).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.IntObjectMap.forEach' call
    var k = this.pk_1;
    var v = this.qk_1;
    $l$block: {
      // Inline function 'androidx.collection.IntObjectMap.forEachIndexed' call
      var m = this.ok_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntObjectMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntObjectMap.hashCode.<anonymous>' call
                  var key = k[index];
                  var tmp = v[index];
                  var tmp_0 = hash;
                  var tmp_1 = key;
                  // Inline function 'kotlin.hashCode' call
                  var tmp0_safe_receiver = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
                  hash = tmp_0 + (tmp_1 ^ (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs)) | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(IntObjectMap).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof IntObjectMap)) {
      return false;
    }
    if (!(other.m() === this.m())) {
      return false;
    }
    // Inline function 'androidx.collection.IntObjectMap.forEach' call
    var k = this.pk_1;
    var v = this.qk_1;
    $l$block: {
      // Inline function 'androidx.collection.IntObjectMap.forEachIndexed' call
      var m = this.ok_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntObjectMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntObjectMap.equals.<anonymous>' call
                  var key = k[index];
                  var tmp = v[index];
                  var value = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  if (value == null) {
                    if (!(other.n(key) == null) ? true : !other.al(key)) {
                      return false;
                    }
                  } else if (!equals(value, other.n(key))) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(IntObjectMap).toString = function () {
    if (this.u()) {
      return '{}';
    }
    var s = StringBuilder_init_$Create$().z5(_Char___init__impl__6a9atx(123));
    var i = 0;
    // Inline function 'androidx.collection.IntObjectMap.forEach' call
    var k = this.pk_1;
    var v = this.qk_1;
    $l$block: {
      // Inline function 'androidx.collection.IntObjectMap.forEachIndexed' call
      var m = this.ok_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i_0];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i_0 - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i_0 << 3) + j | 0;
                  // Inline function 'androidx.collection.IntObjectMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntObjectMap.toString.<anonymous>' call
                  var key = k[index];
                  var tmp = v[index];
                  var value = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  s.r8(key);
                  s.y5('=');
                  s.x5(value === this ? '(this)' : value);
                  i = i + 1 | 0;
                  if (i < this.sk_1) {
                    s.z5(_Char___init__impl__6a9atx(44)).z5(_Char___init__impl__6a9atx(32));
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i_0 === lastIndex));
    }
    return s.z5(_Char___init__impl__6a9atx(125)).toString();
  };
  function mutableIntObjectMapOf() {
    _init_properties_IntObjectMap_kt__bzh4pa();
    return new MutableIntObjectMap();
  }
  var properties_initialized_IntObjectMap_kt_hqy7tc;
  function _init_properties_IntObjectMap_kt__bzh4pa() {
    if (!properties_initialized_IntObjectMap_kt_hqy7tc) {
      properties_initialized_IntObjectMap_kt_hqy7tc = true;
      EmptyIntObjectMap = new MutableIntObjectMap(0);
    }
  }
  var EmptyIntSet;
  function get_EmptyIntArray() {
    _init_properties_IntSet_kt__km4dgt();
    return EmptyIntArray;
  }
  var EmptyIntArray;
  function IntSet() {
    this.bl_1 = get_EmptyGroup();
    this.cl_1 = get_EmptyIntArray();
    this.dl_1 = 0;
    this.el_1 = 0;
  }
  protoOf(IntSet).lk = function () {
    return this.dl_1;
  };
  protoOf(IntSet).fg = function (element) {
    var tmp$ret$9;
    $l$block: {
      // Inline function 'androidx.collection.IntSet.findElementIndex' call
      // Inline function 'androidx.collection.hash' call
      var hash = imul(element, get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.dl_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.bl_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$4);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (this.cl_1[index] === element) {
            tmp$ret$9 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$9 = -1;
    }
    return tmp$ret$9 >= 0;
  };
  protoOf(IntSet).fl = function (separator, prefix, postfix, limit, truncated) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    $l$block: {
      // Inline function 'androidx.collection.IntSet.joinToString.<anonymous>' call
      this_0.o8(prefix);
      var index = 0;
      // Inline function 'androidx.collection.IntSet.forEach' call
      // Inline function 'kotlin.contracts.contract' call
      var k = this.cl_1;
      $l$block_0: {
        // Inline function 'androidx.collection.IntSet.forEachIndex' call
        // Inline function 'kotlin.contracts.contract' call
        var m = this.bl_1;
        var lastIndex = m.length - 2 | 0;
        var inductionVariable = 0;
        if (inductionVariable <= lastIndex)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slot = m[i];
            // Inline function 'androidx.collection.maskEmptyOrDeleted' call
            var this_1 = slot;
            if (!this_1.nb(this_1.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
              var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
              var inductionVariable_0 = 0;
              if (inductionVariable_0 < bitCount)
                do {
                  var j = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  // Inline function 'androidx.collection.isFull' call
                  if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                    var index_0 = (i << 3) + j | 0;
                    // Inline function 'androidx.collection.IntSet.forEach.<anonymous>' call
                    // Inline function 'androidx.collection.IntSet.joinToString.<anonymous>.<anonymous>' call
                    var element = k[index_0];
                    if (index === limit) {
                      this_0.o8(truncated);
                      break $l$block;
                    }
                    if (!(index === 0)) {
                      this_0.o8(separator);
                    }
                    this_0.r8(element);
                    index = index + 1 | 0;
                  }
                  slot = slot.lb(8);
                }
                 while (inductionVariable_0 < bitCount);
              if (!(bitCount === 8)) {
                break $l$block_0;
              }
            }
          }
           while (!(i === lastIndex));
      }
      this_0.o8(postfix);
    }
    return this_0.toString();
  };
  protoOf(IntSet).gl = function (separator, prefix, postfix, limit, truncated, $super) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    return $super === VOID ? this.fl(separator, prefix, postfix, limit, truncated) : $super.fl.call(this, separator, prefix, postfix, limit, truncated);
  };
  protoOf(IntSet).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.IntSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var k = this.cl_1;
    $l$block: {
      // Inline function 'androidx.collection.IntSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this.bl_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntSet.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntSet.hashCode.<anonymous>' call
                  hash = hash + k[index] | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(IntSet).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof IntSet)) {
      return false;
    }
    if (!(other.el_1 === this.el_1)) {
      return false;
    }
    // Inline function 'androidx.collection.IntSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var k = this.cl_1;
    $l$block: {
      // Inline function 'androidx.collection.IntSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this.bl_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.IntSet.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.IntSet.equals.<anonymous>' call
                  var element = k[index];
                  if (!other.fg(element)) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(IntSet).toString = function () {
    return this.gl(VOID, '[', ']');
  };
  function initializeStorage_1($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.comparisons.maxOf' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.dl_1 = newCapacity;
    initializeMetadata_1($this, newCapacity);
    $this.cl_1 = new Int32Array(newCapacity);
  }
  function initializeMetadata_1($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + get_ClonedMetadataCount() | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableIntSet.initializeMetadata.<anonymous>' call
      fill(this_0, get_AllEmpty());
      tmp_0 = this_0;
    }
    tmp.bl_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.bl_1;
    var value = get_Sentinel();
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth_1($this);
  }
  function initializeGrowth_1($this) {
    $this.ll_1 = loadedCapacity($this.lk()) - $this.el_1 | 0;
  }
  function MutableIntSet(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? get_DefaultScatterCapacity() : initialCapacity;
    IntSet.call(this);
    this.ll_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableIntSet.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage_1(this, unloadedCapacity(initialCapacity));
  }
  var properties_initialized_IntSet_kt_za7tcl;
  function _init_properties_IntSet_kt__km4dgt() {
    if (!properties_initialized_IntSet_kt_za7tcl) {
      properties_initialized_IntSet_kt_za7tcl = true;
      EmptyIntSet = new MutableIntSet(0);
      EmptyIntArray = new Int32Array(0);
    }
  }
  var EmptyLongSet;
  function get_EmptyLongArray() {
    _init_properties_LongSet_kt__wt9fxo();
    return EmptyLongArray;
  }
  var EmptyLongArray;
  function LongSet() {
    this.ml_1 = get_EmptyGroup();
    this.nl_1 = get_EmptyLongArray();
    this.ol_1 = 0;
    this.pl_1 = 0;
  }
  protoOf(LongSet).lk = function () {
    return this.ol_1;
  };
  protoOf(LongSet).ql = function (element) {
    var tmp$ret$9;
    $l$block: {
      // Inline function 'androidx.collection.LongSet.findElementIndex' call
      // Inline function 'androidx.collection.hash' call
      var hash = imul(element.hashCode(), get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.ol_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.ml_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$4);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (this.nl_1[index].equals(element)) {
            tmp$ret$9 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$9 = -1;
    }
    return tmp$ret$9 >= 0;
  };
  protoOf(LongSet).fl = function (separator, prefix, postfix, limit, truncated) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    $l$block: {
      // Inline function 'androidx.collection.LongSet.joinToString.<anonymous>' call
      this_0.o8(prefix);
      var index = 0;
      // Inline function 'androidx.collection.LongSet.forEach' call
      // Inline function 'kotlin.contracts.contract' call
      var k = this.nl_1;
      $l$block_0: {
        // Inline function 'androidx.collection.LongSet.forEachIndex' call
        // Inline function 'kotlin.contracts.contract' call
        var m = this.ml_1;
        var lastIndex = m.length - 2 | 0;
        var inductionVariable = 0;
        if (inductionVariable <= lastIndex)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slot = m[i];
            // Inline function 'androidx.collection.maskEmptyOrDeleted' call
            var this_1 = slot;
            if (!this_1.nb(this_1.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
              var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
              var inductionVariable_0 = 0;
              if (inductionVariable_0 < bitCount)
                do {
                  var j = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  // Inline function 'androidx.collection.isFull' call
                  if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                    var index_0 = (i << 3) + j | 0;
                    // Inline function 'androidx.collection.LongSet.forEach.<anonymous>' call
                    // Inline function 'androidx.collection.LongSet.joinToString.<anonymous>.<anonymous>' call
                    var element = k[index_0];
                    if (index === limit) {
                      this_0.o8(truncated);
                      break $l$block;
                    }
                    if (!(index === 0)) {
                      this_0.o8(separator);
                    }
                    this_0.s8(element);
                    index = index + 1 | 0;
                  }
                  slot = slot.lb(8);
                }
                 while (inductionVariable_0 < bitCount);
              if (!(bitCount === 8)) {
                break $l$block_0;
              }
            }
          }
           while (!(i === lastIndex));
      }
      this_0.o8(postfix);
    }
    return this_0.toString();
  };
  protoOf(LongSet).rl = function (separator, prefix, postfix, limit, truncated, $super) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    return $super === VOID ? this.fl(separator, prefix, postfix, limit, truncated) : $super.fl.call(this, separator, prefix, postfix, limit, truncated);
  };
  protoOf(LongSet).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.LongSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var k = this.nl_1;
    $l$block: {
      // Inline function 'androidx.collection.LongSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this.ml_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.LongSet.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.LongSet.hashCode.<anonymous>' call
                  hash = hash + k[index].hashCode() | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(LongSet).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof LongSet)) {
      return false;
    }
    if (!(other.pl_1 === this.pl_1)) {
      return false;
    }
    // Inline function 'androidx.collection.LongSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var k = this.nl_1;
    $l$block: {
      // Inline function 'androidx.collection.LongSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this.ml_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.LongSet.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.LongSet.equals.<anonymous>' call
                  var element = k[index];
                  if (!other.ql(element)) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(LongSet).toString = function () {
    return this.rl(VOID, '[', ']');
  };
  function initializeStorage_2($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.comparisons.maxOf' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.ol_1 = newCapacity;
    initializeMetadata_2($this, newCapacity);
    $this.nl_1 = longArray(newCapacity);
  }
  function initializeMetadata_2($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + get_ClonedMetadataCount() | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableLongSet.initializeMetadata.<anonymous>' call
      fill(this_0, get_AllEmpty());
      tmp_0 = this_0;
    }
    tmp.ml_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.ml_1;
    var value = get_Sentinel();
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth_2($this);
  }
  function initializeGrowth_2($this) {
    $this.wl_1 = loadedCapacity($this.lk()) - $this.pl_1 | 0;
  }
  function removeElementAt($this, index) {
    $this.pl_1 = $this.pl_1 - 1 | 0;
    // Inline function 'androidx.collection.MutableLongSet.writeMetadata' call
    var value = get_Deleted();
    var m = $this.ml_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i = index >> 3;
    var b = (index & 7) << 3;
    m[i] = m[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    var c = $this.ol_1;
    var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = cloneIndex >> 3;
    var b_0 = (cloneIndex & 7) << 3;
    m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
  }
  function findAbsoluteInsertIndex_0($this, element) {
    // Inline function 'androidx.collection.hash' call
    var hash = imul(element.hashCode(), get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h1' call
    var hash1 = hash_0 >>> 7 | 0;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = $this.ol_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.ml_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$4);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if ($this.nl_1[index].equals(element)) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    var index_0 = findFirstAvailableSlot_1($this, hash1);
    var tmp_0;
    if ($this.wl_1 === 0) {
      // Inline function 'androidx.collection.isDeleted' call
      // Inline function 'androidx.collection.readRawMetadata' call
      var offset_0 = index_0;
      tmp_0 = !$this.ml_1[offset_0 >> 3].lb((offset_0 & 7) << 3).nb(new Long(255, 0)).equals(get_Deleted());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      adjustStorage_1($this);
      index_0 = findFirstAvailableSlot_1($this, hash1);
    }
    $this.pl_1 = $this.pl_1 + 1 | 0;
    var tmp_1 = $this;
    var tmp_2 = $this.wl_1;
    var tmp_3;
    // Inline function 'androidx.collection.isEmpty' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_1 = index_0;
    if ($this.ml_1[offset_1 >> 3].lb((offset_1 & 7) << 3).nb(new Long(255, 0)).equals(get_Empty())) {
      tmp_3 = 1;
    } else {
      tmp_3 = 0;
    }
    tmp_1.wl_1 = tmp_2 - tmp_3 | 0;
    // Inline function 'androidx.collection.MutableLongSet.writeMetadata' call
    var index_1 = index_0;
    var value = toLong(hash2);
    var m_0 = $this.ml_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = index_1 >> 3;
    var b_0 = (index_1 & 7) << 3;
    m_0[i_0] = m_0[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    var c = $this.ol_1;
    var cloneIndex = ((index_1 - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_1 = cloneIndex >> 3;
    var b_1 = (cloneIndex & 7) << 3;
    m_0[i_1] = m_0[i_1].nb((new Long(255, 0)).kb(b_1).jb()).ob(value.kb(b_1));
    return index_0;
  }
  function findFirstAvailableSlot_1($this, hash1) {
    var probeMask = $this.ol_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.ml_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
      var m = g.nb(g.jb().kb(7)).nb(get_BitmaskMsb());
      if (!m.equals(new Long(0, 0))) {
        var tmp = probeOffset;
        // Inline function 'androidx.collection.lowestBitSet' call
        return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
  }
  function adjustStorage_1($this) {
    var tmp;
    if ($this.ol_1 > get_GroupWidth()) {
      // Inline function 'kotlin.ULong.compareTo' call
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_0 = $this.pl_1;
      var this_1 = _ULong___init__impl__c78o9k(toLong(this_0));
      var other = _ULong___init__impl__c78o9k(new Long(32, 0));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).w9(_ULong___get_data__impl__fggpzb(other)));
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_3 = $this.ol_1;
      var this_4 = _ULong___init__impl__c78o9k(toLong(this_3));
      var other_0 = _ULong___init__impl__c78o9k(new Long(25, 0));
      var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).w9(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      resizeStorage_1($this, nextCapacity($this.ol_1));
    } else {
      resizeStorage_1($this, nextCapacity($this.ol_1));
    }
  }
  function resizeStorage_1($this, newCapacity) {
    var previousMetadata = $this.ml_1;
    var previousElements = $this.nl_1;
    var previousCapacity = $this.ol_1;
    initializeStorage_2($this, newCapacity);
    var newElements = $this.nl_1;
    var inductionVariable = 0;
    if (inductionVariable < previousCapacity)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.collection.isFull' call
        // Inline function 'androidx.collection.readRawMetadata' call
        if (previousMetadata[i >> 3].lb((i & 7) << 3).nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
          var previousElement = previousElements[i];
          // Inline function 'androidx.collection.hash' call
          var hash = imul(previousElement.hashCode(), get_MurmurHashC1());
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var tmp$ret$3 = hash_0 >>> 7 | 0;
          var index = findFirstAvailableSlot_1($this, tmp$ret$3);
          // Inline function 'androidx.collection.MutableLongSet.writeMetadata' call
          // Inline function 'androidx.collection.h2' call
          var tmp$ret$4 = hash_0 & 127;
          var value = toLong(tmp$ret$4);
          var m = $this.ml_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_0 = index >> 3;
          var b = (index & 7) << 3;
          m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
          var c = $this.ol_1;
          var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_1 = cloneIndex >> 3;
          var b_0 = (cloneIndex & 7) << 3;
          m[i_1] = m[i_1].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
          newElements[index] = previousElement;
        }
      }
       while (inductionVariable < previousCapacity);
  }
  function MutableLongSet(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? get_DefaultScatterCapacity() : initialCapacity;
    LongSet.call(this);
    this.wl_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableLongSet.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage_2(this, unloadedCapacity(initialCapacity));
  }
  protoOf(MutableLongSet).xl = function (element) {
    var index = findAbsoluteInsertIndex_0(this, element);
    this.nl_1[index] = element;
  };
  protoOf(MutableLongSet).yl = function (element) {
    var tmp$ret$9;
    $l$block: {
      // Inline function 'androidx.collection.LongSet.findElementIndex' call
      // Inline function 'androidx.collection.hash' call
      var hash = imul(element.hashCode(), get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.ol_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.ml_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$4 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$4);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (this.nl_1[index].equals(element)) {
            tmp$ret$9 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$9 = -1;
    }
    var index_0 = tmp$ret$9;
    var exists = index_0 >= 0;
    if (exists) {
      removeElementAt(this, index_0);
    }
    return exists;
  };
  var properties_initialized_LongSet_kt_r3x9iu;
  function _init_properties_LongSet_kt__wt9fxo() {
    if (!properties_initialized_LongSet_kt_r3x9iu) {
      properties_initialized_LongSet_kt_r3x9iu = true;
      EmptyLongSet = new MutableLongSet(0);
      EmptyLongArray = longArray(0);
    }
  }
  function get_DELETED() {
    _init_properties_LongSparseArray_kt__ucg8tx();
    return DELETED;
  }
  var DELETED;
  function _get_DELETED_$accessor$1kak71x_1rrpqv() {
    _init_properties_LongSparseArray_kt__ucg8tx();
    return get_DELETED();
  }
  var properties_initialized_LongSparseArray_kt_xmlmcz;
  function _init_properties_LongSparseArray_kt__ucg8tx() {
    if (!properties_initialized_LongSparseArray_kt_xmlmcz) {
      properties_initialized_LongSparseArray_kt_xmlmcz = true;
      DELETED = new Object();
    }
  }
  function get_EmptyObjectIntMap() {
    _init_properties_ObjectIntMap_kt__tjeyss();
    return EmptyObjectIntMap;
  }
  var EmptyObjectIntMap;
  function initializeStorage_3($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.comparisons.maxOf' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.cm_1 = newCapacity;
    initializeMetadata_3($this, newCapacity);
    var tmp_0 = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp_0.am_1 = fillArrayVal(Array(newCapacity), null);
    $this.bm_1 = new Int32Array(newCapacity);
  }
  function initializeMetadata_3($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + get_ClonedMetadataCount() | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableObjectIntMap.initializeMetadata.<anonymous>' call
      fill(this_0, get_AllEmpty());
      tmp_0 = this_0;
    }
    tmp.zl_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.zl_1;
    var value = get_Sentinel();
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth_3($this);
  }
  function initializeGrowth_3($this) {
    $this.jm_1 = loadedCapacity($this.lk()) - $this.dm_1 | 0;
  }
  function findIndex($this, key) {
    // Inline function 'androidx.collection.hash' call
    // Inline function 'kotlin.hashCode' call
    var tmp1_elvis_lhs = key == null ? null : hashCode(key);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var hash = imul(tmp$ret$0, get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h1' call
    var hash1 = hash_0 >>> 7 | 0;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = $this.cm_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.zl_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$5 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$5);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if (equals($this.am_1[index], key)) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    var index_0 = findFirstAvailableSlot_2($this, hash1);
    var tmp_0;
    if ($this.jm_1 === 0) {
      // Inline function 'androidx.collection.isDeleted' call
      // Inline function 'androidx.collection.readRawMetadata' call
      var offset_0 = index_0;
      tmp_0 = !$this.zl_1[offset_0 >> 3].lb((offset_0 & 7) << 3).nb(new Long(255, 0)).equals(get_Deleted());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      adjustStorage_2($this);
      index_0 = findFirstAvailableSlot_2($this, hash1);
    }
    $this.dm_1 = $this.dm_1 + 1 | 0;
    var tmp_1 = $this;
    var tmp_2 = $this.jm_1;
    var tmp_3;
    // Inline function 'androidx.collection.isEmpty' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_1 = index_0;
    if ($this.zl_1[offset_1 >> 3].lb((offset_1 & 7) << 3).nb(new Long(255, 0)).equals(get_Empty())) {
      tmp_3 = 1;
    } else {
      tmp_3 = 0;
    }
    tmp_1.jm_1 = tmp_2 - tmp_3 | 0;
    // Inline function 'androidx.collection.MutableObjectIntMap.writeMetadata' call
    var index_1 = index_0;
    var value = toLong(hash2);
    var m_0 = $this.zl_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = index_1 >> 3;
    var b_0 = (index_1 & 7) << 3;
    m_0[i_0] = m_0[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    var c = $this.cm_1;
    var cloneIndex = ((index_1 - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_1 = cloneIndex >> 3;
    var b_1 = (cloneIndex & 7) << 3;
    m_0[i_1] = m_0[i_1].nb((new Long(255, 0)).kb(b_1).jb()).ob(value.kb(b_1));
    return ~index_0;
  }
  function findFirstAvailableSlot_2($this, hash1) {
    var probeMask = $this.cm_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.zl_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
      var m = g.nb(g.jb().kb(7)).nb(get_BitmaskMsb());
      if (!m.equals(new Long(0, 0))) {
        var tmp = probeOffset;
        // Inline function 'androidx.collection.lowestBitSet' call
        return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
  }
  function adjustStorage_2($this) {
    var tmp;
    if ($this.cm_1 > get_GroupWidth()) {
      // Inline function 'kotlin.ULong.compareTo' call
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_0 = $this.dm_1;
      var this_1 = _ULong___init__impl__c78o9k(toLong(this_0));
      var other = _ULong___init__impl__c78o9k(new Long(32, 0));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).w9(_ULong___get_data__impl__fggpzb(other)));
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_3 = $this.cm_1;
      var this_4 = _ULong___init__impl__c78o9k(toLong(this_3));
      var other_0 = _ULong___init__impl__c78o9k(new Long(25, 0));
      var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).w9(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      resizeStorage_2($this, nextCapacity($this.cm_1));
    } else {
      resizeStorage_2($this, nextCapacity($this.cm_1));
    }
  }
  function resizeStorage_2($this, newCapacity) {
    var previousMetadata = $this.zl_1;
    var previousKeys = $this.am_1;
    var previousValues = $this.bm_1;
    var previousCapacity = $this.cm_1;
    initializeStorage_3($this, newCapacity);
    var newKeys = $this.am_1;
    var newValues = $this.bm_1;
    var inductionVariable = 0;
    if (inductionVariable < previousCapacity)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.collection.isFull' call
        // Inline function 'androidx.collection.readRawMetadata' call
        if (previousMetadata[i >> 3].lb((i & 7) << 3).nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
          var previousKey = previousKeys[i];
          // Inline function 'androidx.collection.hash' call
          // Inline function 'kotlin.hashCode' call
          var tmp1_elvis_lhs = previousKey == null ? null : hashCode(previousKey);
          var tmp$ret$2 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
          var hash = imul(tmp$ret$2, get_MurmurHashC1());
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var tmp$ret$4 = hash_0 >>> 7 | 0;
          var index = findFirstAvailableSlot_2($this, tmp$ret$4);
          // Inline function 'androidx.collection.MutableObjectIntMap.writeMetadata' call
          // Inline function 'androidx.collection.h2' call
          var tmp$ret$5 = hash_0 & 127;
          var value = toLong(tmp$ret$5);
          var m = $this.zl_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_0 = index >> 3;
          var b = (index & 7) << 3;
          m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
          var c = $this.cm_1;
          var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_1 = cloneIndex >> 3;
          var b_0 = (cloneIndex & 7) << 3;
          m[i_1] = m[i_1].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
          newKeys[index] = previousKey;
          newValues[index] = previousValues[i];
        }
      }
       while (inductionVariable < previousCapacity);
  }
  function MutableObjectIntMap(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? get_DefaultScatterCapacity() : initialCapacity;
    ObjectIntMap.call(this);
    this.jm_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableObjectIntMap.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage_3(this, unloadedCapacity(initialCapacity));
  }
  protoOf(MutableObjectIntMap).km = function (key, value) {
    var index = findIndex(this, key);
    if (index < 0)
      index = ~index;
    this.am_1[index] = key;
    this.bm_1[index] = value;
  };
  protoOf(MutableObjectIntMap).lm = function (key, value, default_0) {
    var index = findIndex(this, key);
    var previous = default_0;
    if (index < 0) {
      index = ~index;
    } else {
      previous = this.bm_1[index];
    }
    this.am_1[index] = key;
    this.bm_1[index] = value;
    return previous;
  };
  protoOf(MutableObjectIntMap).mm = function (index) {
    this.dm_1 = this.dm_1 - 1 | 0;
    // Inline function 'androidx.collection.MutableObjectIntMap.writeMetadata' call
    var value = get_Deleted();
    var m = this.zl_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i = index >> 3;
    var b = (index & 7) << 3;
    m[i] = m[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    var c = this.cm_1;
    var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = cloneIndex >> 3;
    var b_0 = (cloneIndex & 7) << 3;
    m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    this.am_1[index] = null;
  };
  function ObjectIntMap() {
    this.zl_1 = get_EmptyGroup();
    this.am_1 = get_EMPTY_OBJECTS();
    this.bm_1 = get_EmptyIntArray();
    this.cm_1 = 0;
    this.dm_1 = 0;
  }
  protoOf(ObjectIntMap).lk = function () {
    return this.cm_1;
  };
  protoOf(ObjectIntMap).m = function () {
    return this.dm_1;
  };
  protoOf(ObjectIntMap).u = function () {
    return this.dm_1 === 0;
  };
  protoOf(ObjectIntMap).nm = function () {
    return !(this.dm_1 === 0);
  };
  protoOf(ObjectIntMap).z2 = function (key) {
    var index = this.pm(key);
    if (index < 0) {
      throw NoSuchElementException_init_$Create$('There is no key ' + key + ' in the map');
    }
    return this.bm_1[index];
  };
  protoOf(ObjectIntMap).om = function (key, defaultValue) {
    var index = this.pm(key);
    if (index >= 0) {
      return this.bm_1[index];
    }
    return defaultValue;
  };
  protoOf(ObjectIntMap).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.ObjectIntMap.forEach' call
    var k = this.am_1;
    var v = this.bm_1;
    $l$block: {
      // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
      var m = this.zl_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ObjectIntMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ObjectIntMap.hashCode.<anonymous>' call
                  var tmp = k[index];
                  var key = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var tmp_0 = hash;
                  // Inline function 'kotlin.hashCode' call
                  var tmp1_elvis_lhs = key == null ? null : hashCode(key);
                  hash = tmp_0 + ((tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) ^ v[index]) | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(ObjectIntMap).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof ObjectIntMap)) {
      return false;
    }
    if (!(other.m() === this.m())) {
      return false;
    }
    var o = other instanceof ObjectIntMap ? other : THROW_CCE();
    // Inline function 'androidx.collection.ObjectIntMap.forEach' call
    var k = this.am_1;
    var v = this.bm_1;
    $l$block: {
      // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
      var m = this.zl_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ObjectIntMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ObjectIntMap.equals.<anonymous>' call
                  var tmp = k[index];
                  var key = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  if (!(v[index] === o.z2(key))) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(ObjectIntMap).toString = function () {
    if (this.u()) {
      return '{}';
    }
    var s = StringBuilder_init_$Create$().z5(_Char___init__impl__6a9atx(123));
    var i = 0;
    // Inline function 'androidx.collection.ObjectIntMap.forEach' call
    var k = this.am_1;
    var v = this.bm_1;
    $l$block: {
      // Inline function 'androidx.collection.ObjectIntMap.forEachIndexed' call
      var m = this.zl_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i_0];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i_0 - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i_0 << 3) + j | 0;
                  // Inline function 'androidx.collection.ObjectIntMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ObjectIntMap.toString.<anonymous>' call
                  var tmp = k[index];
                  var key = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var value = v[index];
                  s.x5(key === this ? '(this)' : key);
                  s.y5('=');
                  s.r8(value);
                  i = i + 1 | 0;
                  if (i < this.dm_1) {
                    s.z5(_Char___init__impl__6a9atx(44)).z5(_Char___init__impl__6a9atx(32));
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i_0 === lastIndex));
    }
    return s.z5(_Char___init__impl__6a9atx(125)).toString();
  };
  protoOf(ObjectIntMap).pm = function (key) {
    // Inline function 'androidx.collection.hash' call
    // Inline function 'kotlin.hashCode' call
    var tmp1_elvis_lhs = key == null ? null : hashCode(key);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var hash = imul(tmp$ret$0, get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = this.cm_1;
    // Inline function 'androidx.collection.h1' call
    var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = this.zl_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$5 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$5);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if (equals(this.am_1[index], key)) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    return -1;
  };
  function emptyObjectIntMap() {
    _init_properties_ObjectIntMap_kt__tjeyss();
    var tmp = get_EmptyObjectIntMap();
    return tmp instanceof ObjectIntMap ? tmp : THROW_CCE();
  }
  var properties_initialized_ObjectIntMap_kt_ycqxma;
  function _init_properties_ObjectIntMap_kt__tjeyss() {
    if (!properties_initialized_ObjectIntMap_kt_ycqxma) {
      properties_initialized_ObjectIntMap_kt_ycqxma = true;
      EmptyObjectIntMap = new MutableObjectIntMap(0);
    }
  }
  function get_EmptyGroup() {
    _init_properties_ScatterMap_kt__cygxb2();
    return EmptyGroup;
  }
  var EmptyGroup;
  var EmptyScatterMap;
  function get_DefaultScatterCapacity() {
    return DefaultScatterCapacity;
  }
  var DefaultScatterCapacity;
  function unloadedCapacity(capacity) {
    _init_properties_ScatterMap_kt__cygxb2();
    if (capacity === 7) {
      return 8;
    }
    return capacity + ((capacity - 1 | 0) / 7 | 0) | 0;
  }
  function normalizeCapacity(n) {
    _init_properties_ScatterMap_kt__cygxb2();
    var tmp;
    if (n > 0) {
      // Inline function 'kotlin.countLeadingZeroBits' call
      tmp = -1 >>> clz32(n) | 0;
    } else {
      tmp = 0;
    }
    return tmp;
  }
  function get_ClonedMetadataCount() {
    return ClonedMetadataCount;
  }
  var ClonedMetadataCount;
  function get_AllEmpty() {
    return AllEmpty;
  }
  var AllEmpty;
  function get_Sentinel() {
    return Sentinel;
  }
  var Sentinel;
  function loadedCapacity(capacity) {
    _init_properties_ScatterMap_kt__cygxb2();
    if (capacity === 7) {
      return 6;
    }
    return capacity - (capacity / 8 | 0) | 0;
  }
  function get_Deleted() {
    return Deleted;
  }
  var Deleted;
  function get_GroupWidth() {
    return GroupWidth;
  }
  var GroupWidth;
  function nextCapacity(capacity) {
    _init_properties_ScatterMap_kt__cygxb2();
    var tmp;
    if (capacity === 0) {
      tmp = 6;
    } else {
      tmp = imul(capacity, 2) + 1 | 0;
    }
    return tmp;
  }
  function get_BitmaskMsb() {
    return BitmaskMsb;
  }
  var BitmaskMsb;
  function get_MurmurHashC1() {
    return MurmurHashC1;
  }
  var MurmurHashC1;
  function initializeStorage_4($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.math.max' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.tm_1 = newCapacity;
    initializeMetadata_4($this, newCapacity);
    var tmp_0 = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp_0.rm_1 = fillArrayVal(Array(newCapacity), null);
    var tmp_1 = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp_1.sm_1 = fillArrayVal(Array(newCapacity), null);
  }
  function initializeMetadata_4($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + 7 | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableScatterMap.initializeMetadata.<anonymous>' call
      fill(this_0, new Long(-2139062144, -2139062144));
      tmp_0 = this_0;
    }
    tmp.qm_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.qm_1;
    var value = new Long(255, 0);
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth_4($this);
  }
  function initializeGrowth_4($this) {
    $this.an_1 = loadedCapacity($this.lk()) - $this.um_1 | 0;
  }
  function findFirstAvailableSlot_3($this, hash1) {
    var probeMask = $this.tm_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.qm_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
      var m = g.nb(g.jb().kb(7)).nb(new Long(-2139062144, -2139062144));
      if (!m.equals(new Long(0, 0))) {
        var tmp = probeOffset;
        // Inline function 'androidx.collection.lowestBitSet' call
        return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
      }
      probeIndex = probeIndex + 8 | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
  }
  function adjustStorage_3($this) {
    var tmp;
    if ($this.tm_1 > 8) {
      // Inline function 'kotlin.ULong.compareTo' call
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_0 = $this.um_1;
      var this_1 = _ULong___init__impl__c78o9k(toLong(this_0));
      var other = _ULong___init__impl__c78o9k(new Long(32, 0));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).w9(_ULong___get_data__impl__fggpzb(other)));
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_3 = $this.tm_1;
      var this_4 = _ULong___init__impl__c78o9k(toLong(this_3));
      var other_0 = _ULong___init__impl__c78o9k(new Long(25, 0));
      var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).w9(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      resizeStorage_3($this, nextCapacity($this.tm_1));
    } else {
      resizeStorage_3($this, nextCapacity($this.tm_1));
    }
  }
  function resizeStorage_3($this, newCapacity) {
    var previousMetadata = $this.qm_1;
    var previousKeys = $this.rm_1;
    var previousValues = $this.sm_1;
    var previousCapacity = $this.tm_1;
    initializeStorage_4($this, newCapacity);
    var newKeys = $this.rm_1;
    var newValues = $this.sm_1;
    var inductionVariable = 0;
    if (inductionVariable < previousCapacity)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.collection.isFull' call
        // Inline function 'androidx.collection.readRawMetadata' call
        if (previousMetadata[i >> 3].lb((i & 7) << 3).nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
          var previousKey = previousKeys[i];
          // Inline function 'androidx.collection.hash' call
          // Inline function 'kotlin.hashCode' call
          var tmp1_elvis_lhs = previousKey == null ? null : hashCode(previousKey);
          var tmp$ret$2 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
          var hash = imul(tmp$ret$2, -862048943);
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var tmp$ret$4 = hash_0 >>> 7 | 0;
          var index = findFirstAvailableSlot_3($this, tmp$ret$4);
          // Inline function 'androidx.collection.MutableScatterMap.writeMetadata' call
          // Inline function 'androidx.collection.h2' call
          var tmp$ret$5 = hash_0 & 127;
          var value = toLong(tmp$ret$5);
          var m = $this.qm_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_0 = index >> 3;
          var b = (index & 7) << 3;
          m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
          var c = $this.tm_1;
          var cloneIndex = ((index - 7 | 0) & c) + (7 & c) | 0;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_1 = cloneIndex >> 3;
          var b_0 = (cloneIndex & 7) << 3;
          m[i_1] = m[i_1].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
          newKeys[index] = previousKey;
          newValues[index] = previousValues[i];
        }
      }
       while (inductionVariable < previousCapacity);
  }
  function MutableScatterMap(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? 6 : initialCapacity;
    ScatterMap.call(this);
    this.an_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableScatterMap.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage_4(this, unloadedCapacity(initialCapacity));
  }
  protoOf(MutableScatterMap).bn = function (key, value) {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'androidx.collection.MutableScatterMap.set.<anonymous>' call
    var index = this.cn(key);
    var index_0 = index < 0 ? ~index : index;
    this.rm_1[index_0] = key;
    this.sm_1[index_0] = value;
  };
  protoOf(MutableScatterMap).t2 = function (key) {
    var tmp$ret$10;
    $l$block: {
      // Inline function 'androidx.collection.ScatterMap.findKeyIndex' call
      // Inline function 'androidx.collection.hash' call
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = key == null ? null : hashCode(key);
      var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      var hash = imul(tmp$ret$0, -862048943);
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.tm_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.qm_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$5 = (new Long(16843009, 16843009)).w9(toLong(hash2));
        var x = g.pb(tmp$ret$5);
        var m = x.fb(new Long(16843009, 16843009)).nb(x.jb()).nb(new Long(-2139062144, -2139062144));
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (equals(this.rm_1[index], key)) {
            tmp$ret$10 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(new Long(-2139062144, -2139062144)).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + 8 | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$10 = -1;
    }
    var index_0 = tmp$ret$10;
    if (index_0 >= 0) {
      return this.dn(index_0);
    }
    return null;
  };
  protoOf(MutableScatterMap).dn = function (index) {
    this.um_1 = this.um_1 - 1 | 0;
    // Inline function 'androidx.collection.MutableScatterMap.writeMetadata' call
    var value = new Long(254, 0);
    var m = this.qm_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i = index >> 3;
    var b = (index & 7) << 3;
    m[i] = m[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    var c = this.tm_1;
    var cloneIndex = ((index - 7 | 0) & c) + (7 & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = cloneIndex >> 3;
    var b_0 = (cloneIndex & 7) << 3;
    m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    this.rm_1[index] = null;
    var oldValue = this.sm_1[index];
    this.sm_1[index] = null;
    return (oldValue == null ? true : !(oldValue == null)) ? oldValue : THROW_CCE();
  };
  protoOf(MutableScatterMap).h1 = function () {
    this.um_1 = 0;
    if (!(this.qm_1 === get_EmptyGroup())) {
      fill(this.qm_1, new Long(-2139062144, -2139062144));
      // Inline function 'androidx.collection.writeRawMetadata' call
      var data = this.qm_1;
      var offset = this.tm_1;
      var value = new Long(255, 0);
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    }
    fill_0(this.sm_1, null, 0, this.tm_1);
    fill_0(this.rm_1, null, 0, this.tm_1);
    initializeGrowth_4(this);
  };
  protoOf(MutableScatterMap).cn = function (key) {
    // Inline function 'androidx.collection.hash' call
    // Inline function 'kotlin.hashCode' call
    var tmp1_elvis_lhs = key == null ? null : hashCode(key);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var hash = imul(tmp$ret$0, -862048943);
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h1' call
    var hash1 = hash_0 >>> 7 | 0;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = this.tm_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = this.qm_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$5 = (new Long(16843009, 16843009)).w9(toLong(hash2));
      var x = g.pb(tmp$ret$5);
      var m = x.fb(new Long(16843009, 16843009)).nb(x.jb()).nb(new Long(-2139062144, -2139062144));
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if (equals(this.rm_1[index], key)) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(new Long(-2139062144, -2139062144)).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + 8 | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    var index_0 = findFirstAvailableSlot_3(this, hash1);
    var tmp_0;
    if (this.an_1 === 0) {
      // Inline function 'androidx.collection.isDeleted' call
      // Inline function 'androidx.collection.readRawMetadata' call
      var offset_0 = index_0;
      tmp_0 = !this.qm_1[offset_0 >> 3].lb((offset_0 & 7) << 3).nb(new Long(255, 0)).equals(new Long(254, 0));
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      adjustStorage_3(this);
      index_0 = findFirstAvailableSlot_3(this, hash1);
    }
    this.um_1 = this.um_1 + 1 | 0;
    var tmp_1 = this;
    var tmp_2 = this.an_1;
    var tmp_3;
    // Inline function 'androidx.collection.isEmpty' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_1 = index_0;
    if (this.qm_1[offset_1 >> 3].lb((offset_1 & 7) << 3).nb(new Long(255, 0)).equals(new Long(128, 0))) {
      tmp_3 = 1;
    } else {
      tmp_3 = 0;
    }
    tmp_1.an_1 = tmp_2 - tmp_3 | 0;
    // Inline function 'androidx.collection.MutableScatterMap.writeMetadata' call
    var index_1 = index_0;
    var value = toLong(hash2);
    var m_0 = this.qm_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = index_1 >> 3;
    var b_0 = (index_1 & 7) << 3;
    m_0[i_0] = m_0[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    var c = this.tm_1;
    var cloneIndex = ((index_1 - 7 | 0) & c) + (7 & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_1 = cloneIndex >> 3;
    var b_1 = (cloneIndex & 7) << 3;
    m_0[i_1] = m_0[i_1].nb((new Long(255, 0)).kb(b_1).jb()).ob(value.kb(b_1));
    return ~index_0;
  };
  function get_BitmaskLsb() {
    return BitmaskLsb;
  }
  var BitmaskLsb;
  function get_Empty() {
    return Empty;
  }
  var Empty;
  function ScatterMap() {
    this.qm_1 = get_EmptyGroup();
    this.rm_1 = get_EMPTY_OBJECTS();
    this.sm_1 = get_EMPTY_OBJECTS();
    this.tm_1 = 0;
    this.um_1 = 0;
  }
  protoOf(ScatterMap).lk = function () {
    return this.tm_1;
  };
  protoOf(ScatterMap).m = function () {
    return this.um_1;
  };
  protoOf(ScatterMap).u = function () {
    return this.um_1 === 0;
  };
  protoOf(ScatterMap).nm = function () {
    return !(this.um_1 === 0);
  };
  protoOf(ScatterMap).z2 = function (key) {
    var tmp$ret$10;
    $l$block: {
      // Inline function 'androidx.collection.ScatterMap.findKeyIndex' call
      // Inline function 'androidx.collection.hash' call
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = key == null ? null : hashCode(key);
      var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      var hash = imul(tmp$ret$0, -862048943);
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.tm_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.qm_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$5 = (new Long(16843009, 16843009)).w9(toLong(hash2));
        var x = g.pb(tmp$ret$5);
        var m = x.fb(new Long(16843009, 16843009)).nb(x.jb()).nb(new Long(-2139062144, -2139062144));
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (equals(this.rm_1[index], key)) {
            tmp$ret$10 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(new Long(-2139062144, -2139062144)).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + 8 | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$10 = -1;
    }
    var index_0 = tmp$ret$10;
    var tmp_0;
    if (index_0 >= 0) {
      var tmp_1 = this.sm_1[index_0];
      tmp_0 = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    } else {
      tmp_0 = null;
    }
    return tmp_0;
  };
  protoOf(ScatterMap).w2 = function (key) {
    var tmp$ret$10;
    $l$block: {
      // Inline function 'androidx.collection.ScatterMap.findKeyIndex' call
      // Inline function 'androidx.collection.hash' call
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = key == null ? null : hashCode(key);
      var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      var hash = imul(tmp$ret$0, -862048943);
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.tm_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.qm_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$5 = (new Long(16843009, 16843009)).w9(toLong(hash2));
        var x = g.pb(tmp$ret$5);
        var m = x.fb(new Long(16843009, 16843009)).nb(x.jb()).nb(new Long(-2139062144, -2139062144));
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (equals(this.rm_1[index], key)) {
            tmp$ret$10 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(new Long(-2139062144, -2139062144)).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + 8 | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$10 = -1;
    }
    return tmp$ret$10 >= 0;
  };
  protoOf(ScatterMap).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.ScatterMap.forEach' call
    var k = this.rm_1;
    var v = this.sm_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
      var m = this.qm_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(new Long(-2139062144, -2139062144)).equals(new Long(-2139062144, -2139062144))) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ScatterMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ScatterMap.hashCode.<anonymous>' call
                  var tmp = k[index];
                  var key = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var tmp_0 = v[index];
                  var tmp_1 = hash;
                  // Inline function 'kotlin.hashCode' call
                  var tmp1_elvis_lhs = key == null ? null : hashCode(key);
                  var tmp_2 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
                  // Inline function 'kotlin.hashCode' call
                  var tmp0_safe_receiver = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                  var tmp1_elvis_lhs_0 = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
                  hash = tmp_1 + (tmp_2 ^ (tmp1_elvis_lhs_0 == null ? 0 : tmp1_elvis_lhs_0)) | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(ScatterMap).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof ScatterMap)) {
      return false;
    }
    if (!(other.m() === this.m())) {
      return false;
    }
    var o = other instanceof ScatterMap ? other : THROW_CCE();
    // Inline function 'androidx.collection.ScatterMap.forEach' call
    var k = this.rm_1;
    var v = this.sm_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
      var m = this.qm_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(new Long(-2139062144, -2139062144)).equals(new Long(-2139062144, -2139062144))) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ScatterMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ScatterMap.equals.<anonymous>' call
                  var tmp = k[index];
                  var key = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var tmp_0 = v[index];
                  var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                  if (value == null) {
                    if (!(o.z2(key) == null) ? true : !o.w2(key)) {
                      return false;
                    }
                  } else if (!equals(value, o.z2(key))) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(ScatterMap).toString = function () {
    if (this.u()) {
      return '{}';
    }
    var s = StringBuilder_init_$Create$().z5(_Char___init__impl__6a9atx(123));
    var i = 0;
    // Inline function 'androidx.collection.ScatterMap.forEach' call
    var k = this.rm_1;
    var v = this.sm_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterMap.forEachIndexed' call
      var m = this.qm_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i_0 = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i_0];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(new Long(-2139062144, -2139062144)).equals(new Long(-2139062144, -2139062144))) {
            var bitCount = 8 - (~(i_0 - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i_0 << 3) + j | 0;
                  // Inline function 'androidx.collection.ScatterMap.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ScatterMap.toString.<anonymous>' call
                  var tmp = k[index];
                  var key = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var tmp_0 = v[index];
                  var value = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
                  s.x5(key === this ? '(this)' : key);
                  s.y5('=');
                  s.x5(value === this ? '(this)' : value);
                  i = i + 1 | 0;
                  if (i < this.um_1) {
                    s.z5(_Char___init__impl__6a9atx(44)).z5(_Char___init__impl__6a9atx(32));
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i_0 === lastIndex));
    }
    return s.z5(_Char___init__impl__6a9atx(125)).toString();
  };
  function mutableScatterMapOf() {
    _init_properties_ScatterMap_kt__cygxb2();
    return new MutableScatterMap();
  }
  var properties_initialized_ScatterMap_kt_apzngg;
  function _init_properties_ScatterMap_kt__cygxb2() {
    if (!properties_initialized_ScatterMap_kt_apzngg) {
      properties_initialized_ScatterMap_kt_apzngg = true;
      // Inline function 'kotlin.longArrayOf' call
      EmptyGroup = longArrayOf([new Long(-2139062017, -2139062144), new Long(-1, -1)]);
      EmptyScatterMap = new MutableScatterMap(0);
    }
  }
  var EmptyScatterSet;
  function ScatterSet$toString$lambda(this$0) {
    return function (element) {
      var tmp;
      if (element === this$0) {
        tmp = '(this)';
      } else {
        tmp = toString_0(element);
      }
      return tmp;
    };
  }
  function ScatterSet() {
    this.en_1 = get_EmptyGroup();
    this.fn_1 = get_EMPTY_OBJECTS();
    this.gn_1 = 0;
    this.hn_1 = 0;
  }
  protoOf(ScatterSet).lk = function () {
    return this.gn_1;
  };
  protoOf(ScatterSet).m = function () {
    return this.hn_1;
  };
  protoOf(ScatterSet).u = function () {
    return this.hn_1 === 0;
  };
  protoOf(ScatterSet).s = function (element) {
    var tmp$ret$10;
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.findElementIndex' call
      // Inline function 'androidx.collection.hash' call
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = element == null ? null : hashCode(element);
      var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      var hash = imul(tmp$ret$0, get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.gn_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.en_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$5 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$5);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (equals(this.fn_1[index], element)) {
            tmp$ret$10 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$10 = -1;
    }
    return tmp$ret$10 >= 0;
  };
  protoOf(ScatterSet).in = function (separator, prefix, postfix, limit, truncated, transform) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.joinToString.<anonymous>' call
      this_0.o8(prefix);
      var index = 0;
      // Inline function 'androidx.collection.ScatterSet.forEach' call
      // Inline function 'kotlin.contracts.contract' call
      var k = this.fn_1;
      $l$block_0: {
        // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
        // Inline function 'kotlin.contracts.contract' call
        var m = this.en_1;
        var lastIndex = m.length - 2 | 0;
        var inductionVariable = 0;
        if (inductionVariable <= lastIndex)
          do {
            var i = inductionVariable;
            inductionVariable = inductionVariable + 1 | 0;
            var slot = m[i];
            // Inline function 'androidx.collection.maskEmptyOrDeleted' call
            var this_1 = slot;
            if (!this_1.nb(this_1.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
              var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
              var inductionVariable_0 = 0;
              if (inductionVariable_0 < bitCount)
                do {
                  var j = inductionVariable_0;
                  inductionVariable_0 = inductionVariable_0 + 1 | 0;
                  // Inline function 'androidx.collection.isFull' call
                  if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                    var index_0 = (i << 3) + j | 0;
                    // Inline function 'androidx.collection.ScatterSet.forEach.<anonymous>' call
                    // Inline function 'androidx.collection.ScatterSet.joinToString.<anonymous>.<anonymous>' call
                    var tmp = k[index_0];
                    var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                    if (index === limit) {
                      this_0.o8(truncated);
                      break $l$block;
                    }
                    if (!(index === 0)) {
                      this_0.o8(separator);
                    }
                    if (transform == null) {
                      this_0.x5(element);
                    } else {
                      this_0.o8(transform(element));
                    }
                    index = index + 1 | 0;
                  }
                  slot = slot.lb(8);
                }
                 while (inductionVariable_0 < bitCount);
              if (!(bitCount === 8)) {
                break $l$block_0;
              }
            }
          }
           while (!(i === lastIndex));
      }
      this_0.o8(postfix);
    }
    return this_0.toString();
  };
  protoOf(ScatterSet).jn = function (separator, prefix, postfix, limit, truncated, transform, $super) {
    separator = separator === VOID ? ', ' : separator;
    prefix = prefix === VOID ? '' : prefix;
    postfix = postfix === VOID ? '' : postfix;
    limit = limit === VOID ? -1 : limit;
    truncated = truncated === VOID ? '...' : truncated;
    transform = transform === VOID ? null : transform;
    return $super === VOID ? this.in(separator, prefix, postfix, limit, truncated, transform) : $super.in.call(this, separator, prefix, postfix, limit, truncated, transform);
  };
  protoOf(ScatterSet).hashCode = function () {
    var hash = 0;
    // Inline function 'androidx.collection.ScatterSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var k = this.fn_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this.en_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ScatterSet.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ScatterSet.hashCode.<anonymous>' call
                  var tmp = k[index];
                  var tmp_0 = hash;
                  // Inline function 'kotlin.hashCode' call
                  var tmp0_safe_receiver = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
                  hash = tmp_0 + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return hash;
  };
  protoOf(ScatterSet).equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!(other instanceof ScatterSet)) {
      return false;
    }
    if (!(other.m() === this.m())) {
      return false;
    }
    var o = other instanceof ScatterSet ? other : THROW_CCE();
    // Inline function 'androidx.collection.ScatterSet.forEach' call
    // Inline function 'kotlin.contracts.contract' call
    var k = this.fn_1;
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.forEachIndex' call
      // Inline function 'kotlin.contracts.contract' call
      var m = this.en_1;
      var lastIndex = m.length - 2 | 0;
      var inductionVariable = 0;
      if (inductionVariable <= lastIndex)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var slot = m[i];
          // Inline function 'androidx.collection.maskEmptyOrDeleted' call
          var this_0 = slot;
          if (!this_0.nb(this_0.jb().kb(7)).nb(get_BitmaskMsb()).equals(get_BitmaskMsb())) {
            var bitCount = 8 - (~(i - lastIndex | 0) >>> 31 | 0) | 0;
            var inductionVariable_0 = 0;
            if (inductionVariable_0 < bitCount)
              do {
                var j = inductionVariable_0;
                inductionVariable_0 = inductionVariable_0 + 1 | 0;
                // Inline function 'androidx.collection.isFull' call
                if (slot.nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
                  var index = (i << 3) + j | 0;
                  // Inline function 'androidx.collection.ScatterSet.forEach.<anonymous>' call
                  // Inline function 'androidx.collection.ScatterSet.equals.<anonymous>' call
                  var tmp = k[index];
                  var element = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
                  if (!o.s(element)) {
                    return false;
                  }
                }
                slot = slot.lb(8);
              }
               while (inductionVariable_0 < bitCount);
            if (!(bitCount === 8)) {
              break $l$block;
            }
          }
        }
         while (!(i === lastIndex));
    }
    return true;
  };
  protoOf(ScatterSet).toString = function () {
    return this.jn(VOID, '[', ']', VOID, VOID, ScatterSet$toString$lambda(this));
  };
  function initializeStorage_5($this, initialCapacity) {
    var tmp;
    if (initialCapacity > 0) {
      // Inline function 'kotlin.comparisons.maxOf' call
      var b = normalizeCapacity(initialCapacity);
      tmp = Math.max(7, b);
    } else {
      tmp = 0;
    }
    var newCapacity = tmp;
    $this.gn_1 = newCapacity;
    initializeMetadata_5($this, newCapacity);
    var tmp_0 = $this;
    // Inline function 'kotlin.arrayOfNulls' call
    tmp_0.fn_1 = fillArrayVal(Array(newCapacity), null);
  }
  function initializeMetadata_5($this, capacity) {
    var tmp = $this;
    var tmp_0;
    if (capacity === 0) {
      tmp_0 = get_EmptyGroup();
    } else {
      var size = ((((capacity + 1 | 0) + get_ClonedMetadataCount() | 0) + 7 | 0) & -8) >> 3;
      // Inline function 'kotlin.apply' call
      var this_0 = longArray(size);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.MutableScatterSet.initializeMetadata.<anonymous>' call
      fill(this_0, get_AllEmpty());
      tmp_0 = this_0;
    }
    tmp.en_1 = tmp_0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var data = $this.en_1;
    var value = get_Sentinel();
    var i = capacity >> 3;
    var b = (capacity & 7) << 3;
    data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    initializeGrowth_5($this);
  }
  function initializeGrowth_5($this) {
    $this.on_1 = loadedCapacity($this.lk()) - $this.hn_1 | 0;
  }
  function findAbsoluteInsertIndex_1($this, element) {
    // Inline function 'androidx.collection.hash' call
    // Inline function 'kotlin.hashCode' call
    var tmp1_elvis_lhs = element == null ? null : hashCode(element);
    var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
    var hash = imul(tmp$ret$0, get_MurmurHashC1());
    var hash_0 = hash ^ hash << 16;
    // Inline function 'androidx.collection.h1' call
    var hash1 = hash_0 >>> 7 | 0;
    // Inline function 'androidx.collection.h2' call
    var hash2 = hash_0 & 127;
    var probeMask = $this.gn_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    $l$loop_0: while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.en_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.match' call
      // Inline function 'kotlin.Long.times' call
      var tmp$ret$5 = get_BitmaskLsb().w9(toLong(hash2));
      var x = g.pb(tmp$ret$5);
      var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
      $l$loop: while (true) {
        // Inline function 'androidx.collection.hasNext' call
        if (!!m.equals(new Long(0, 0))) {
          break $l$loop;
        }
        var tmp = probeOffset;
        // Inline function 'androidx.collection.get' call
        // Inline function 'androidx.collection.lowestBitSet' call
        var this_0 = m;
        var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
        if (equals($this.fn_1[index], element)) {
          return index;
        }
        // Inline function 'androidx.collection.next' call
        var this_1 = m;
        m = this_1.nb(this_1.fb(new Long(1, 0)));
      }
      // Inline function 'androidx.collection.maskEmpty' call
      if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
        break $l$loop_0;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
    var index_0 = findFirstAvailableSlot_4($this, hash1);
    var tmp_0;
    if ($this.on_1 === 0) {
      // Inline function 'androidx.collection.isDeleted' call
      // Inline function 'androidx.collection.readRawMetadata' call
      var offset_0 = index_0;
      tmp_0 = !$this.en_1[offset_0 >> 3].lb((offset_0 & 7) << 3).nb(new Long(255, 0)).equals(get_Deleted());
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      adjustStorage_4($this);
      index_0 = findFirstAvailableSlot_4($this, hash1);
    }
    $this.hn_1 = $this.hn_1 + 1 | 0;
    var tmp_1 = $this;
    var tmp_2 = $this.on_1;
    var tmp_3;
    // Inline function 'androidx.collection.isEmpty' call
    // Inline function 'androidx.collection.readRawMetadata' call
    var offset_1 = index_0;
    if ($this.en_1[offset_1 >> 3].lb((offset_1 & 7) << 3).nb(new Long(255, 0)).equals(get_Empty())) {
      tmp_3 = 1;
    } else {
      tmp_3 = 0;
    }
    tmp_1.on_1 = tmp_2 - tmp_3 | 0;
    // Inline function 'androidx.collection.MutableScatterSet.writeMetadata' call
    var index_1 = index_0;
    var value = toLong(hash2);
    var m_0 = $this.en_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = index_1 >> 3;
    var b_0 = (index_1 & 7) << 3;
    m_0[i_0] = m_0[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    var c = $this.gn_1;
    var cloneIndex = ((index_1 - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_1 = cloneIndex >> 3;
    var b_1 = (cloneIndex & 7) << 3;
    m_0[i_1] = m_0[i_1].nb((new Long(255, 0)).kb(b_1).jb()).ob(value.kb(b_1));
    return index_0;
  }
  function findFirstAvailableSlot_4($this, hash1) {
    var probeMask = $this.gn_1;
    var probeOffset = hash1 & probeMask;
    var probeIndex = 0;
    while (true) {
      // Inline function 'androidx.collection.group' call
      var metadata = $this.en_1;
      var offset = probeOffset;
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
      // Inline function 'androidx.collection.maskEmptyOrDeleted' call
      var m = g.nb(g.jb().kb(7)).nb(get_BitmaskMsb());
      if (!m.equals(new Long(0, 0))) {
        var tmp = probeOffset;
        // Inline function 'androidx.collection.lowestBitSet' call
        return (tmp + (countTrailingZeroBits(m) >> 3) | 0) & probeMask;
      }
      probeIndex = probeIndex + get_GroupWidth() | 0;
      probeOffset = (probeOffset + probeIndex | 0) & probeMask;
    }
  }
  function adjustStorage_4($this) {
    var tmp;
    if ($this.gn_1 > get_GroupWidth()) {
      // Inline function 'kotlin.ULong.compareTo' call
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_0 = $this.hn_1;
      var this_1 = _ULong___init__impl__c78o9k(toLong(this_0));
      var other = _ULong___init__impl__c78o9k(new Long(32, 0));
      var this_2 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_1).w9(_ULong___get_data__impl__fggpzb(other)));
      // Inline function 'kotlin.ULong.times' call
      // Inline function 'kotlin.toULong' call
      var this_3 = $this.gn_1;
      var this_4 = _ULong___init__impl__c78o9k(toLong(this_3));
      var other_0 = _ULong___init__impl__c78o9k(new Long(25, 0));
      var other_1 = _ULong___init__impl__c78o9k(_ULong___get_data__impl__fggpzb(this_4).w9(_ULong___get_data__impl__fggpzb(other_0)));
      tmp = ulongCompare(_ULong___get_data__impl__fggpzb(this_2), _ULong___get_data__impl__fggpzb(other_1)) <= 0;
    } else {
      tmp = false;
    }
    if (tmp) {
      resizeStorage_4($this, nextCapacity($this.gn_1));
    } else {
      resizeStorage_4($this, nextCapacity($this.gn_1));
    }
  }
  function resizeStorage_4($this, newCapacity) {
    var previousMetadata = $this.en_1;
    var previousElements = $this.fn_1;
    var previousCapacity = $this.gn_1;
    initializeStorage_5($this, newCapacity);
    var newElements = $this.fn_1;
    var inductionVariable = 0;
    if (inductionVariable < previousCapacity)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'androidx.collection.isFull' call
        // Inline function 'androidx.collection.readRawMetadata' call
        if (previousMetadata[i >> 3].lb((i & 7) << 3).nb(new Long(255, 0)).z6(new Long(128, 0)) < 0) {
          var previousElement = previousElements[i];
          // Inline function 'androidx.collection.hash' call
          // Inline function 'kotlin.hashCode' call
          var tmp1_elvis_lhs = previousElement == null ? null : hashCode(previousElement);
          var tmp$ret$2 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
          var hash = imul(tmp$ret$2, get_MurmurHashC1());
          var hash_0 = hash ^ hash << 16;
          // Inline function 'androidx.collection.h1' call
          var tmp$ret$4 = hash_0 >>> 7 | 0;
          var index = findFirstAvailableSlot_4($this, tmp$ret$4);
          // Inline function 'androidx.collection.MutableScatterSet.writeMetadata' call
          // Inline function 'androidx.collection.h2' call
          var tmp$ret$5 = hash_0 & 127;
          var value = toLong(tmp$ret$5);
          var m = $this.en_1;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_0 = index >> 3;
          var b = (index & 7) << 3;
          m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
          var c = $this.gn_1;
          var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
          // Inline function 'androidx.collection.writeRawMetadata' call
          var i_1 = cloneIndex >> 3;
          var b_0 = (cloneIndex & 7) << 3;
          m[i_1] = m[i_1].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
          newElements[index] = previousElement;
        }
      }
       while (inductionVariable < previousCapacity);
  }
  function MutableScatterSet(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? get_DefaultScatterCapacity() : initialCapacity;
    ScatterSet.call(this);
    this.on_1 = 0;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(initialCapacity >= 0)) {
      // Inline function 'androidx.collection.MutableScatterSet.<anonymous>' call
      var message = 'Capacity must be a positive value.';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    initializeStorage_5(this, unloadedCapacity(initialCapacity));
  }
  protoOf(MutableScatterSet).a1 = function (element) {
    var oldSize = this.m();
    var index = findAbsoluteInsertIndex_1(this, element);
    this.fn_1[index] = element;
    return !(this.m() === oldSize);
  };
  protoOf(MutableScatterSet).pn = function (element) {
    var index = findAbsoluteInsertIndex_1(this, element);
    this.fn_1[index] = element;
  };
  protoOf(MutableScatterSet).b1 = function (element) {
    var tmp$ret$10;
    $l$block: {
      // Inline function 'androidx.collection.ScatterSet.findElementIndex' call
      // Inline function 'androidx.collection.hash' call
      // Inline function 'kotlin.hashCode' call
      var tmp1_elvis_lhs = element == null ? null : hashCode(element);
      var tmp$ret$0 = tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
      var hash = imul(tmp$ret$0, get_MurmurHashC1());
      var hash_0 = hash ^ hash << 16;
      // Inline function 'androidx.collection.h2' call
      var hash2 = hash_0 & 127;
      var probeMask = this.gn_1;
      // Inline function 'androidx.collection.h1' call
      var probeOffset = (hash_0 >>> 7 | 0) & probeMask;
      var probeIndex = 0;
      $l$loop_0: while (true) {
        // Inline function 'androidx.collection.group' call
        var metadata = this.en_1;
        var offset = probeOffset;
        var i = offset >> 3;
        var b = (offset & 7) << 3;
        var g = metadata[i].mb(b).ob(metadata[i + 1 | 0].kb(64 - b | 0).nb(toLong(b).b7().lb(63)));
        // Inline function 'androidx.collection.match' call
        // Inline function 'kotlin.Long.times' call
        var tmp$ret$5 = get_BitmaskLsb().w9(toLong(hash2));
        var x = g.pb(tmp$ret$5);
        var m = x.fb(get_BitmaskLsb()).nb(x.jb()).nb(get_BitmaskMsb());
        $l$loop: while (true) {
          // Inline function 'androidx.collection.hasNext' call
          if (!!m.equals(new Long(0, 0))) {
            break $l$loop;
          }
          var tmp = probeOffset;
          // Inline function 'androidx.collection.get' call
          // Inline function 'androidx.collection.lowestBitSet' call
          var this_0 = m;
          var index = (tmp + (countTrailingZeroBits(this_0) >> 3) | 0) & probeMask;
          if (equals(this.fn_1[index], element)) {
            tmp$ret$10 = index;
            break $l$block;
          }
          // Inline function 'androidx.collection.next' call
          var this_1 = m;
          m = this_1.nb(this_1.fb(new Long(1, 0)));
        }
        // Inline function 'androidx.collection.maskEmpty' call
        if (!g.nb(g.jb().kb(6)).nb(get_BitmaskMsb()).equals(new Long(0, 0))) {
          break $l$loop_0;
        }
        probeIndex = probeIndex + get_GroupWidth() | 0;
        probeOffset = (probeOffset + probeIndex | 0) & probeMask;
      }
      tmp$ret$10 = -1;
    }
    var index_0 = tmp$ret$10;
    var exists = index_0 >= 0;
    if (exists) {
      this.qn(index_0);
    }
    return exists;
  };
  protoOf(MutableScatterSet).qn = function (index) {
    this.hn_1 = this.hn_1 - 1 | 0;
    // Inline function 'androidx.collection.MutableScatterSet.writeMetadata' call
    var value = get_Deleted();
    var m = this.en_1;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i = index >> 3;
    var b = (index & 7) << 3;
    m[i] = m[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    var c = this.gn_1;
    var cloneIndex = ((index - get_ClonedMetadataCount() | 0) & c) + (get_ClonedMetadataCount() & c) | 0;
    // Inline function 'androidx.collection.writeRawMetadata' call
    var i_0 = cloneIndex >> 3;
    var b_0 = (cloneIndex & 7) << 3;
    m[i_0] = m[i_0].nb((new Long(255, 0)).kb(b_0).jb()).ob(value.kb(b_0));
    this.fn_1[index] = null;
  };
  protoOf(MutableScatterSet).h1 = function () {
    this.hn_1 = 0;
    if (!(this.en_1 === get_EmptyGroup())) {
      fill(this.en_1, get_AllEmpty());
      // Inline function 'androidx.collection.writeRawMetadata' call
      var data = this.en_1;
      var offset = this.gn_1;
      var value = get_Sentinel();
      var i = offset >> 3;
      var b = (offset & 7) << 3;
      data[i] = data[i].nb((new Long(255, 0)).kb(b).jb()).ob(value.kb(b));
    }
    fill_0(this.fn_1, null, 0, this.gn_1);
    initializeGrowth_5(this);
  };
  function mutableScatterSetOf() {
    _init_properties_ScatterSet_kt__vy48mc();
    return new MutableScatterSet();
  }
  var properties_initialized_ScatterSet_kt_dmj456;
  function _init_properties_ScatterSet_kt__vy48mc() {
    if (!properties_initialized_ScatterSet_kt_dmj456) {
      properties_initialized_ScatterSet_kt_dmj456 = true;
      EmptyScatterSet = new MutableScatterSet(0);
    }
  }
  var EMPTY_INTS;
  function get_EMPTY_LONGS() {
    _init_properties_ContainerHelpers_kt__6fon4s();
    return EMPTY_LONGS;
  }
  var EMPTY_LONGS;
  function get_EMPTY_OBJECTS() {
    _init_properties_ContainerHelpers_kt__6fon4s();
    return EMPTY_OBJECTS;
  }
  var EMPTY_OBJECTS;
  function idealLongArraySize(need) {
    _init_properties_ContainerHelpers_kt__6fon4s();
    return idealByteArraySize(imul(need, 8)) / 8 | 0;
  }
  function idealByteArraySize(need) {
    _init_properties_ContainerHelpers_kt__6fon4s();
    var inductionVariable = 4;
    if (inductionVariable <= 31)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        if (need <= ((1 << i) - 12 | 0)) {
          return (1 << i) - 12 | 0;
        }
      }
       while (inductionVariable <= 31);
    return need;
  }
  function binarySearch(array, size, value) {
    _init_properties_ContainerHelpers_kt__6fon4s();
    var lo = 0;
    var hi = size - 1 | 0;
    while (lo <= hi) {
      var mid = (lo + hi | 0) >>> 1 | 0;
      var midVal = array[mid];
      if (midVal.z6(value) < 0) {
        lo = mid + 1 | 0;
      } else if (midVal.z6(value) > 0) {
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
      EMPTY_LONGS = longArray(0);
      // Inline function 'kotlin.arrayOfNulls' call
      EMPTY_OBJECTS = fillArrayVal(Array(0), null);
    }
  }
  function LongSparseArray(initialCapacity) {
    initialCapacity = initialCapacity === VOID ? 10 : initialCapacity;
    this.rn_1 = false;
    this.un_1 = 0;
    if (initialCapacity === 0) {
      this.sn_1 = get_EMPTY_LONGS();
      this.tn_1 = get_EMPTY_OBJECTS();
    } else {
      var idealCapacity = idealLongArraySize(initialCapacity);
      this.sn_1 = longArray(idealCapacity);
      var tmp = this;
      // Inline function 'kotlin.arrayOfNulls' call
      tmp.tn_1 = fillArrayVal(Array(idealCapacity), null);
    }
  }
  protoOf(LongSparseArray).vn = function (key) {
    // Inline function 'androidx.collection.commonGet' call
    // Inline function 'androidx.collection.commonGetInternal' call
    var i = binarySearch(this.sn_1, this.un_1, key);
    var tmp;
    if (i < 0 ? true : this.tn_1[i] === _get_DELETED_$accessor$1kak71x_1rrpqv()) {
      tmp = null;
    } else {
      tmp = this.tn_1[i];
    }
    var tmp_0 = tmp;
    return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  };
  protoOf(LongSparseArray).wn = function (key) {
    var i = binarySearch(this.sn_1, this.un_1, key);
    var tmp;
    if (i >= 0) {
      var tmp_0;
      if (!(this.tn_1[i] === _get_DELETED_$accessor$1kak71x_1rrpqv())) {
        this.tn_1[i] = _get_DELETED_$accessor$1kak71x_1rrpqv();
        this.rn_1 = true;
        tmp_0 = Unit_instance;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(LongSparseArray).xn = function (key, value) {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'androidx.collection.commonPut' call
      var index = binarySearch(this.sn_1, this.un_1, key);
      if (index >= 0) {
        this.tn_1[index] = value;
      } else {
        index = ~index;
        if (index < this.un_1 ? this.tn_1[index] === _get_DELETED_$accessor$1kak71x_1rrpqv() : false) {
          this.sn_1[index] = key;
          this.tn_1[index] = value;
          tmp$ret$0 = Unit_instance;
          break $l$block;
        }
        if (this.rn_1 ? this.un_1 >= this.sn_1.length : false) {
          // Inline function 'androidx.collection.commonGc' call
          var n = this.un_1;
          var newSize = 0;
          var keys = this.sn_1;
          var values = this.tn_1;
          var inductionVariable = 0;
          if (inductionVariable < n)
            do {
              var i = inductionVariable;
              inductionVariable = inductionVariable + 1 | 0;
              var value_0 = values[i];
              if (!(value_0 === _get_DELETED_$accessor$1kak71x_1rrpqv())) {
                if (!(i === newSize)) {
                  keys[newSize] = keys[i];
                  values[newSize] = value_0;
                  values[i] = null;
                }
                newSize = newSize + 1 | 0;
              }
            }
             while (inductionVariable < n);
          this.rn_1 = false;
          this.un_1 = newSize;
          index = ~binarySearch(this.sn_1, this.un_1, key);
        }
        if (this.un_1 >= this.sn_1.length) {
          var newSize_0 = idealLongArraySize(this.un_1 + 1 | 0);
          this.sn_1 = copyOf(this.sn_1, newSize_0);
          this.tn_1 = copyOf_0(this.tn_1, newSize_0);
        }
        if (!((this.un_1 - index | 0) === 0)) {
          // Inline function 'kotlin.collections.copyInto' call
          var this_0 = this.sn_1;
          var destination = this.sn_1;
          var destinationOffset = index + 1 | 0;
          var startIndex = index;
          var endIndex = this.un_1;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          var tmp = this_0;
          // Inline function 'kotlin.js.unsafeCast' call
          // Inline function 'kotlin.js.asDynamic' call
          arrayCopy(tmp, destination, destinationOffset, startIndex, endIndex);
          // Inline function 'kotlin.collections.copyInto' call
          var this_1 = this.tn_1;
          var destination_0 = this.tn_1;
          var destinationOffset_0 = index + 1 | 0;
          var startIndex_0 = index;
          var endIndex_0 = this.un_1;
          arrayCopy(this_1, destination_0, destinationOffset_0, startIndex_0, endIndex_0);
        }
        this.sn_1[index] = key;
        this.tn_1[index] = value;
        this.un_1 = this.un_1 + 1 | 0;
      }
    }
    return tmp$ret$0;
  };
  protoOf(LongSparseArray).yn = function () {
    // Inline function 'androidx.collection.commonSize' call
    if (this.rn_1) {
      // Inline function 'androidx.collection.commonGc' call
      var n = this.un_1;
      var newSize = 0;
      var keys = this.sn_1;
      var values = this.tn_1;
      var inductionVariable = 0;
      if (inductionVariable < n)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var value = values[i];
          if (!(value === _get_DELETED_$accessor$1kak71x_1rrpqv())) {
            if (!(i === newSize)) {
              keys[newSize] = keys[i];
              values[newSize] = value;
              values[i] = null;
            }
            newSize = newSize + 1 | 0;
          }
        }
         while (inductionVariable < n);
      this.rn_1 = false;
      this.un_1 = newSize;
    }
    return this.un_1;
  };
  protoOf(LongSparseArray).u = function () {
    // Inline function 'androidx.collection.commonIsEmpty' call
    return this.yn() === 0;
  };
  protoOf(LongSparseArray).zn = function (index) {
    // Inline function 'androidx.collection.commonKeyAt' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= index ? index < this.un_1 : false)) {
      // Inline function 'androidx.collection.commonKeyAt.<anonymous>' call
      var message = 'Expected index to be within 0..size()-1, but was ' + index;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.rn_1) {
      // Inline function 'androidx.collection.commonGc' call
      var n = this.un_1;
      var newSize = 0;
      var keys = this.sn_1;
      var values = this.tn_1;
      var inductionVariable = 0;
      if (inductionVariable < n)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var value = values[i];
          if (!(value === _get_DELETED_$accessor$1kak71x_1rrpqv())) {
            if (!(i === newSize)) {
              keys[newSize] = keys[i];
              values[newSize] = value;
              values[i] = null;
            }
            newSize = newSize + 1 | 0;
          }
        }
         while (inductionVariable < n);
      this.rn_1 = false;
      this.un_1 = newSize;
    }
    return this.sn_1[index];
  };
  protoOf(LongSparseArray).ao = function (index) {
    // Inline function 'androidx.collection.commonValueAt' call
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= index ? index < this.un_1 : false)) {
      // Inline function 'androidx.collection.commonValueAt.<anonymous>' call
      var message = 'Expected index to be within 0..size()-1, but was ' + index;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    if (this.rn_1) {
      // Inline function 'androidx.collection.commonGc' call
      var n = this.un_1;
      var newSize = 0;
      var keys = this.sn_1;
      var values = this.tn_1;
      var inductionVariable = 0;
      if (inductionVariable < n)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var value = values[i];
          if (!(value === _get_DELETED_$accessor$1kak71x_1rrpqv())) {
            if (!(i === newSize)) {
              keys[newSize] = keys[i];
              values[newSize] = value;
              values[i] = null;
            }
            newSize = newSize + 1 | 0;
          }
        }
         while (inductionVariable < n);
      this.rn_1 = false;
      this.un_1 = newSize;
    }
    var tmp = this.tn_1[index];
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(LongSparseArray).bo = function (key) {
    // Inline function 'androidx.collection.commonIndexOfKey' call
    if (this.rn_1) {
      // Inline function 'androidx.collection.commonGc' call
      var n = this.un_1;
      var newSize = 0;
      var keys = this.sn_1;
      var values = this.tn_1;
      var inductionVariable = 0;
      if (inductionVariable < n)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          var value = values[i];
          if (!(value === _get_DELETED_$accessor$1kak71x_1rrpqv())) {
            if (!(i === newSize)) {
              keys[newSize] = keys[i];
              values[newSize] = value;
              values[i] = null;
            }
            newSize = newSize + 1 | 0;
          }
        }
         while (inductionVariable < n);
      this.rn_1 = false;
      this.un_1 = newSize;
    }
    return binarySearch(this.sn_1, this.un_1, key);
  };
  protoOf(LongSparseArray).co = function (key) {
    // Inline function 'androidx.collection.commonContainsKey' call
    return this.bo(key) >= 0;
  };
  protoOf(LongSparseArray).h1 = function () {
    var n = this.un_1;
    var values = this.tn_1;
    var inductionVariable = 0;
    if (inductionVariable < n)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        values[i] = null;
      }
       while (inductionVariable < n);
    this.un_1 = 0;
    this.rn_1 = false;
    return Unit_instance;
  };
  protoOf(LongSparseArray).toString = function () {
    var tmp$ret$0;
    $l$block: {
      // Inline function 'androidx.collection.commonToString' call
      if (this.yn() <= 0) {
        tmp$ret$0 = '{}';
        break $l$block;
      }
      // Inline function 'kotlin.text.buildString' call
      var capacity = imul(this.un_1, 28);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlin.apply' call
      var this_0 = StringBuilder_init_$Create$_0(capacity);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'androidx.collection.commonToString.<anonymous>' call
      this_0.z5(_Char___init__impl__6a9atx(123));
      var inductionVariable = 0;
      var last = this.un_1;
      if (inductionVariable < last)
        do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          if (i > 0) {
            this_0.y5(', ');
          }
          var key = this.zn(i);
          this_0.s8(key);
          this_0.z5(_Char___init__impl__6a9atx(61));
          var value = this.ao(i);
          if (!(value === this_0)) {
            this_0.x5(value);
          } else {
            this_0.y5('(this Map)');
          }
        }
         while (inductionVariable < last);
      this_0.z5(_Char___init__impl__6a9atx(125));
      tmp$ret$0 = this_0.toString();
    }
    return tmp$ret$0;
  };
  //region block: init
  DefaultScatterCapacity = 6;
  ClonedMetadataCount = 7;
  AllEmpty = new Long(-2139062144, -2139062144);
  Sentinel = new Long(255, 0);
  Deleted = new Long(254, 0);
  GroupWidth = 8;
  BitmaskMsb = new Long(-2139062144, -2139062144);
  MurmurHashC1 = -862048943;
  BitmaskLsb = new Long(16843009, 16843009);
  Empty = new Long(128, 0);
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = get_BitmaskMsb;
  _.$_$.b = LongSparseArray;
  _.$_$.c = MutableIntIntMap;
  _.$_$.d = MutableLongSet;
  _.$_$.e = MutableObjectIntMap;
  _.$_$.f = MutableScatterMap;
  _.$_$.g = MutableScatterSet;
  _.$_$.h = emptyObjectIntMap;
  _.$_$.i = mutableIntObjectMapOf;
  _.$_$.j = mutableScatterMapOf;
  _.$_$.k = mutableScatterSetOf;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-collection-collection.js.map
