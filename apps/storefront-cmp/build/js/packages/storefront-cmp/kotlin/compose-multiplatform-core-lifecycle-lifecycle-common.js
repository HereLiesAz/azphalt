(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-atomicfu.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-atomicfu.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-common'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-common'.");
    }
    if (typeof this['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'compose-multiplatform-core-lifecycle-lifecycle-common'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'compose-multiplatform-core-lifecycle-lifecycle-common'.");
    }
    root['compose-multiplatform-core-lifecycle-lifecycle-common'] = factory(typeof this['compose-multiplatform-core-lifecycle-lifecycle-common'] === 'undefined' ? {} : this['compose-multiplatform-core-lifecycle-lifecycle-common'], this['kotlin-kotlin-stdlib'], this['kotlinx-atomicfu']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_atomicfu) {
  'use strict';
  //region block: imports
  var protoOf = kotlin_kotlin.$_$.jb;
  var objectMeta = kotlin_kotlin.$_$.ib;
  var setMetadataFor = kotlin_kotlin.$_$.kb;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var Enum = kotlin_kotlin.$_$.re;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var classMeta = kotlin_kotlin.$_$.ba;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  //endregion
  //region block: pre-declaration
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(Event, 'Event', classMeta, Enum);
  setMetadataFor(State, 'State', classMeta, Enum);
  setMetadataFor(Lifecycle, 'Lifecycle', classMeta);
  setMetadataFor(AtomicReference, 'AtomicReference', classMeta);
  //endregion
  var Event_ON_CREATE_instance;
  var Event_ON_START_instance;
  var Event_ON_RESUME_instance;
  var Event_ON_PAUSE_instance;
  var Event_ON_STOP_instance;
  var Event_ON_DESTROY_instance;
  var Event_ON_ANY_instance;
  function Companion() {
  }
  protoOf(Companion).w4r = function (state) {
    switch (state.t9_1) {
      case 2:
        return Event_ON_DESTROY_getInstance();
      case 3:
        return Event_ON_STOP_getInstance();
      case 4:
        return Event_ON_PAUSE_getInstance();
      default:
        return null;
    }
  };
  protoOf(Companion).x4r = function (state) {
    switch (state.t9_1) {
      case 1:
        return Event_ON_CREATE_getInstance();
      case 2:
        return Event_ON_START_getInstance();
      case 3:
        return Event_ON_RESUME_getInstance();
      default:
        return null;
    }
  };
  var Companion_instance;
  function Companion_getInstance() {
    return Companion_instance;
  }
  var Event_entriesInitialized;
  function Event_initEntries() {
    if (Event_entriesInitialized)
      return Unit_instance;
    Event_entriesInitialized = true;
    Event_ON_CREATE_instance = new Event('ON_CREATE', 0);
    Event_ON_START_instance = new Event('ON_START', 1);
    Event_ON_RESUME_instance = new Event('ON_RESUME', 2);
    Event_ON_PAUSE_instance = new Event('ON_PAUSE', 3);
    Event_ON_STOP_instance = new Event('ON_STOP', 4);
    Event_ON_DESTROY_instance = new Event('ON_DESTROY', 5);
    Event_ON_ANY_instance = new Event('ON_ANY', 6);
  }
  var State_DESTROYED_instance;
  var State_INITIALIZED_instance;
  var State_CREATED_instance;
  var State_STARTED_instance;
  var State_RESUMED_instance;
  var State_entriesInitialized;
  function State_initEntries() {
    if (State_entriesInitialized)
      return Unit_instance;
    State_entriesInitialized = true;
    State_DESTROYED_instance = new State('DESTROYED', 0);
    State_INITIALIZED_instance = new State('INITIALIZED', 1);
    State_CREATED_instance = new State('CREATED', 2);
    State_STARTED_instance = new State('STARTED', 3);
    State_RESUMED_instance = new State('RESUMED', 4);
  }
  function Event(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  protoOf(Event).a4s = function () {
    switch (this.t9_1) {
      case 0:
      case 4:
        return State_CREATED_getInstance();
      case 1:
      case 3:
        return State_STARTED_getInstance();
      case 2:
        return State_RESUMED_getInstance();
      case 5:
        return State_DESTROYED_getInstance();
      case 6:
        break;
    }
    throw IllegalArgumentException_init_$Create$('' + this + ' has no target state');
  };
  function State(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function Event_ON_CREATE_getInstance() {
    Event_initEntries();
    return Event_ON_CREATE_instance;
  }
  function Event_ON_START_getInstance() {
    Event_initEntries();
    return Event_ON_START_instance;
  }
  function Event_ON_RESUME_getInstance() {
    Event_initEntries();
    return Event_ON_RESUME_instance;
  }
  function Event_ON_PAUSE_getInstance() {
    Event_initEntries();
    return Event_ON_PAUSE_instance;
  }
  function Event_ON_STOP_getInstance() {
    Event_initEntries();
    return Event_ON_STOP_instance;
  }
  function Event_ON_DESTROY_getInstance() {
    Event_initEntries();
    return Event_ON_DESTROY_instance;
  }
  function State_DESTROYED_getInstance() {
    State_initEntries();
    return State_DESTROYED_instance;
  }
  function State_INITIALIZED_getInstance() {
    State_initEntries();
    return State_INITIALIZED_instance;
  }
  function State_CREATED_getInstance() {
    State_initEntries();
    return State_CREATED_instance;
  }
  function State_STARTED_getInstance() {
    State_initEntries();
    return State_STARTED_instance;
  }
  function State_RESUMED_getInstance() {
    State_initEntries();
    return State_RESUMED_instance;
  }
  function Lifecycle() {
    this.b4s_1 = new AtomicReference(null);
  }
  function AtomicReference(value) {
    this.c4s_1 = atomic$ref$1(value);
  }
  //region block: init
  Companion_instance = new Companion();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = Lifecycle;
  _.$_$.b = Event_ON_PAUSE_getInstance;
  _.$_$.c = Event_ON_RESUME_getInstance;
  _.$_$.d = Event_ON_START_getInstance;
  _.$_$.e = State_DESTROYED_getInstance;
  _.$_$.f = State_INITIALIZED_getInstance;
  _.$_$.g = Companion_instance;
  //endregion
  return _;
}));

//# sourceMappingURL=compose-multiplatform-core-lifecycle-lifecycle-common.js.map
