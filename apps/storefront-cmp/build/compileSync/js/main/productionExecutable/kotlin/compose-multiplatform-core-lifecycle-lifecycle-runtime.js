(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './compose-multiplatform-core-lifecycle-lifecycle-common.js', './kotlinx-coroutines-core.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./compose-multiplatform-core-lifecycle-lifecycle-common.js'), require('./kotlinx-coroutines-core.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-runtime'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-runtime'.");
    }
    if (typeof this['compose-multiplatform-core-lifecycle-lifecycle-common'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-runtime'. Its dependency 'compose-multiplatform-core-lifecycle-lifecycle-common' was not found. Please, check whether 'compose-multiplatform-core-lifecycle-lifecycle-common' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-runtime'.");
    }
    if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-runtime'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-runtime'.");
    }
    root['compose-multiplatform-core-lifecycle-lifecycle-runtime'] = factory(typeof this['compose-multiplatform-core-lifecycle-lifecycle-runtime'] === 'undefined' ? {} : this['compose-multiplatform-core-lifecycle-lifecycle-runtime'], this['kotlin-kotlin-stdlib'], this['compose-multiplatform-core-lifecycle-lifecycle-common'], this['kotlinx-coroutines-core']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_androidx_lifecycle_lifecycle_common, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.ib;
  var objectCreate = kotlin_kotlin.$_$.gb;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var State_DESTROYED_getInstance = kotlin_org_jetbrains_androidx_lifecycle_lifecycle_common.$_$.e;
  var State_INITIALIZED_getInstance = kotlin_org_jetbrains_androidx_lifecycle_lifecycle_common.$_$.f;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var LinkedHashMap_init_$Create$ = kotlin_kotlin.$_$.x;
  var first = kotlin_kotlin.$_$.w6;
  var last = kotlin_kotlin.$_$.r7;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.z;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.n;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var Map = kotlin_kotlin.$_$.g5;
  var isInterface = kotlin_kotlin.$_$.wa;
  var Companion_instance = kotlin_org_jetbrains_androidx_lifecycle_lifecycle_common.$_$.g;
  var reversed = kotlin_kotlin.$_$.i8;
  var lastOrNull = kotlin_kotlin.$_$.n7;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var Lifecycle = kotlin_org_jetbrains_androidx_lifecycle_lifecycle_common.$_$.a;
  var MutableStateFlow = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.w;
  var classMeta = kotlin_kotlin.$_$.aa;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(LifecycleRegistry, 'LifecycleRegistry', classMeta, Lifecycle);
  setMetadataFor(WeakReference, 'WeakReference', classMeta);
  //endregion
  function LifecycleRegistry_init_$Init$(provider, $this) {
    LifecycleRegistry.call($this, provider, true);
    return $this;
  }
  function LifecycleRegistry_init_$Create$(provider) {
    return LifecycleRegistry_init_$Init$(provider, objectCreate(protoOf(LifecycleRegistry)));
  }
  function moveToState($this, next) {
    if ($this.d4r_1.equals(next)) {
      return Unit_instance;
    }
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!($this.d4r_1.equals(State_INITIALIZED_getInstance()) ? next.equals(State_DESTROYED_getInstance()) : false)) {
      // Inline function 'androidx.lifecycle.LifecycleRegistry.moveToState.<anonymous>' call
      var message = 'State must be at least CREATED to move to ' + next + ', but was ' + $this.d4r_1 + ' in component ' + ('' + $this.e4r_1.zu());
      throw IllegalStateException_init_$Create$(toString(message));
    }
    $this.d4r_1 = next;
    if ($this.g4r_1 ? true : !($this.f4r_1 === 0)) {
      $this.h4r_1 = true;
      return Unit_instance;
    }
    $this.g4r_1 = true;
    sync($this);
    $this.g4r_1 = false;
    if ($this.d4r_1.equals(State_DESTROYED_getInstance())) {
      var tmp = $this;
      // Inline function 'kotlin.collections.linkedMapOf' call
      tmp.c4r_1 = LinkedHashMap_init_$Create$();
    }
  }
  function _get_isSynced__dwdj3t($this) {
    if ($this.c4r_1.u()) {
      return true;
    }
    var eldestObserverState = first($this.c4r_1.n2()).l4r_1;
    var newestObserverState = last($this.c4r_1.n2()).l4r_1;
    return eldestObserverState.equals(newestObserverState) ? $this.d4r_1.equals(newestObserverState) : false;
  }
  function popParentState($this) {
    $this.i4r_1.m1($this.i4r_1.m() - 1 | 0);
  }
  function pushParentState($this, state) {
    $this.i4r_1.a1(state);
  }
  function forwardPass($this, lifecycleOwner) {
    // Inline function 'androidx.lifecycle.LifecycleRegistry.forEachObserverWithAdditions' call
    // Inline function 'kotlin.collections.mutableSetOf' call
    var visited = LinkedHashSet_init_$Create$();
    $l$loop: while (!$this.h4r_1) {
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var this_0 = $this.c4r_1.m2();
      var destination = ArrayList_init_$Create$();
      var tmp0_iterator = this_0.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        // Inline function 'androidx.lifecycle.LifecycleRegistry.forEachObserverWithAdditions.<anonymous>' call
        if (!visited.s(element)) {
          destination.a1(element);
        }
      }
      var keys = destination;
      if (keys.u()) {
        break $l$loop;
      }
      var tmp0_iterator_0 = keys.o();
      $l$loop_1: while (tmp0_iterator_0.d1()) {
        var key = tmp0_iterator_0.f1();
        if ($this.h4r_1) {
          break $l$loop_1;
        }
        var tmp1_elvis_lhs = $this.c4r_1.z2(key);
        var tmp;
        if (tmp1_elvis_lhs == null) {
          continue $l$loop_1;
        } else {
          tmp = tmp1_elvis_lhs;
        }
        var value = tmp;
        // Inline function 'androidx.lifecycle.LifecycleRegistry.forwardPass.<anonymous>' call
        $l$loop_2: while (true) {
          var tmp_0;
          if (value.l4r_1.u9($this.d4r_1) < 0 ? !$this.h4r_1 : false) {
            // Inline function 'kotlin.collections.contains' call
            // Inline function 'kotlin.collections.containsKey' call
            var this_1 = $this.c4r_1;
            tmp_0 = (isInterface(this_1, Map) ? this_1 : THROW_CCE()).w2(key);
          } else {
            tmp_0 = false;
          }
          if (!tmp_0) {
            break $l$loop_2;
          }
          pushParentState($this, value.l4r_1);
          var tmp0_elvis_lhs = Companion_instance.u4q(value.l4r_1);
          var tmp_1;
          if (tmp0_elvis_lhs == null) {
            throw IllegalStateException_init_$Create$('no event up from ' + value.l4r_1);
          } else {
            tmp_1 = tmp0_elvis_lhs;
          }
          var event = tmp_1;
          value.n4r(lifecycleOwner, event);
          popParentState($this);
        }
        visited.a1(key);
      }
    }
  }
  function backwardPass($this, lifecycleOwner) {
    // Inline function 'androidx.lifecycle.LifecycleRegistry.forEachObserverReversed' call
    var keys = reversed($this.c4r_1.m2());
    var tmp0_iterator = keys.o();
    $l$loop_0: while (tmp0_iterator.d1()) {
      var key = tmp0_iterator.f1();
      if ($this.h4r_1) {
        break $l$loop_0;
      }
      var tmp1_elvis_lhs = $this.c4r_1.z2(key);
      var tmp;
      if (tmp1_elvis_lhs == null) {
        continue $l$loop_0;
      } else {
        tmp = tmp1_elvis_lhs;
      }
      var value = tmp;
      // Inline function 'androidx.lifecycle.LifecycleRegistry.backwardPass.<anonymous>' call
      $l$loop_1: while (true) {
        var tmp_0;
        if (value.l4r_1.u9($this.d4r_1) > 0 ? !$this.h4r_1 : false) {
          // Inline function 'kotlin.collections.contains' call
          // Inline function 'kotlin.collections.containsKey' call
          var this_0 = $this.c4r_1;
          tmp_0 = (isInterface(this_0, Map) ? this_0 : THROW_CCE()).w2(key);
        } else {
          tmp_0 = false;
        }
        if (!tmp_0) {
          break $l$loop_1;
        }
        var tmp0_elvis_lhs = Companion_instance.t4q(value.l4r_1);
        var tmp_1;
        if (tmp0_elvis_lhs == null) {
          throw IllegalStateException_init_$Create$('no event down from ' + value.l4r_1);
        } else {
          tmp_1 = tmp0_elvis_lhs;
        }
        var event = tmp_1;
        pushParentState($this, event.x4q());
        value.n4r(lifecycleOwner, event);
        popParentState($this);
      }
    }
  }
  function sync($this) {
    var tmp0_elvis_lhs = $this.e4r_1.zu();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      throw IllegalStateException_init_$Create$('LifecycleOwner of this LifecycleRegistry is already garbage collected. It is too late to change lifecycle state.');
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var lifecycleOwner = tmp;
    while (!_get_isSynced__dwdj3t($this)) {
      $this.h4r_1 = false;
      if ($this.d4r_1.u9(first($this.c4r_1.n2()).l4r_1) < 0) {
        backwardPass($this, lifecycleOwner);
      }
      var newest = lastOrNull($this.c4r_1.n2());
      if ((!$this.h4r_1 ? !(newest == null) : false) ? $this.d4r_1.u9(newest.l4r_1) > 0 : false) {
        forwardPass($this, lifecycleOwner);
      }
    }
    $this.h4r_1 = false;
    $this.j4r_1.g1d($this.o4r());
  }
  function enforceMainThreadIfNeeded($this, methodName) {
    if ($this.b4r_1) {
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!isMainThread()) {
        // Inline function 'androidx.lifecycle.LifecycleRegistry.enforceMainThreadIfNeeded.<anonymous>' call
        var message = 'Method ' + methodName + ' must be called on the main thread';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function Companion() {
  }
  protoOf(Companion).p4r = function (state1, state2) {
    return (!(state2 == null) ? state2.u9(state1) < 0 : false) ? state2 : state1;
  };
  var Companion_instance_0;
  function Companion_getInstance() {
    return Companion_instance_0;
  }
  function LifecycleRegistry(provider, enforceMainThread) {
    Lifecycle.call(this);
    this.b4r_1 = enforceMainThread;
    var tmp = this;
    // Inline function 'kotlin.collections.linkedMapOf' call
    tmp.c4r_1 = LinkedHashMap_init_$Create$();
    this.d4r_1 = State_INITIALIZED_getInstance();
    this.f4r_1 = 0;
    this.g4r_1 = false;
    this.h4r_1 = false;
    this.i4r_1 = ArrayList_init_$Create$();
    this.e4r_1 = new WeakReference(provider);
    this.j4r_1 = MutableStateFlow(State_INITIALIZED_getInstance());
  }
  protoOf(LifecycleRegistry).o4r = function () {
    return this.d4r_1;
  };
  protoOf(LifecycleRegistry).q4r = function (event) {
    enforceMainThreadIfNeeded(this, 'handleLifecycleEvent');
    moveToState(this, event.x4q());
  };
  function isMainThread() {
    return true;
  }
  function WeakReference(reference) {
    this.k4r_1 = reference;
  }
  protoOf(WeakReference).zu = function () {
    return this.k4r_1;
  };
  //region block: init
  Companion_instance_0 = new Companion();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = LifecycleRegistry_init_$Create$;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-lifecycle-lifecycle-runtime.js.map
