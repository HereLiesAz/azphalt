(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js', './kotlinx-atomicfu.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'), require('./kotlinx-atomicfu.js'));
  else {
    if (typeof this['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-core'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'kotlinx-coroutines-core'.");
    }
    if (typeof this['kotlinx-atomicfu'] === 'undefined') {
      throw new Error("Error loading module 'kotlinx-coroutines-core'. Its dependency 'kotlinx-atomicfu' was not found. Please, check whether 'kotlinx-atomicfu' is loaded prior to 'kotlinx-coroutines-core'.");
    }
    root['kotlinx-coroutines-core'] = factory(typeof this['kotlinx-coroutines-core'] === 'undefined' ? {} : this['kotlinx-coroutines-core'], this['kotlin-kotlin-stdlib'], this['kotlinx-atomicfu']);
  }
}(this, function (_, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_atomicfu) {
  'use strict';
  //region block: imports
  var imul = Math.imul;
  var Unit_instance = kotlin_kotlin.$_$.q4;
  var protoOf = kotlin_kotlin.$_$.ib;
  var THROW_CCE = kotlin_kotlin.$_$.cf;
  var Continuation = kotlin_kotlin.$_$.h9;
  var classMeta = kotlin_kotlin.$_$.aa;
  var setMetadataFor = kotlin_kotlin.$_$.jb;
  var VOID = kotlin_kotlin.$_$.g;
  var EmptyCoroutineContext_getInstance = kotlin_kotlin.$_$.y3;
  var Key_instance = kotlin_kotlin.$_$.x3;
  var equals = kotlin_kotlin.$_$.da;
  var createCoroutineUnintercepted = kotlin_kotlin.$_$.a9;
  var toString = kotlin_kotlin.$_$.nb;
  var IllegalStateException_init_$Create$ = kotlin_kotlin.$_$.w1;
  var atomic$int$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.e;
  var intercepted = kotlin_kotlin.$_$.b9;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.z8;
  var interfaceMeta = kotlin_kotlin.$_$.na;
  var UnsupportedOperationException_init_$Create$ = kotlin_kotlin.$_$.k2;
  var isInterface = kotlin_kotlin.$_$.wa;
  var toString_0 = kotlin_kotlin.$_$.ng;
  var atomic$ref$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.d;
  var objectMeta = kotlin_kotlin.$_$.hb;
  var hashCode = kotlin_kotlin.$_$.la;
  var CoroutineImpl = kotlin_kotlin.$_$.n9;
  var atomic$boolean$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.b;
  var CancellationException_init_$Create$ = kotlin_kotlin.$_$.c1;
  var Result__exceptionOrNull_impl_p6xea9 = kotlin_kotlin.$_$.r2;
  var _Result___get_value__impl__bjfvqg = kotlin_kotlin.$_$.t2;
  var Companion_instance = kotlin_kotlin.$_$.l4;
  var _Result___init__impl__xyqfz8 = kotlin_kotlin.$_$.q2;
  var createFailure = kotlin_kotlin.$_$.tf;
  var AbstractCoroutineContextKey = kotlin_kotlin.$_$.d9;
  var AbstractCoroutineContextElement = kotlin_kotlin.$_$.c9;
  var get = kotlin_kotlin.$_$.e9;
  var minusKey = kotlin_kotlin.$_$.f9;
  var ContinuationInterceptor = kotlin_kotlin.$_$.g9;
  var RuntimeException_init_$Create$ = kotlin_kotlin.$_$.i2;
  var addSuppressed = kotlin_kotlin.$_$.pf;
  var Enum = kotlin_kotlin.$_$.qe;
  var startCoroutine = kotlin_kotlin.$_$.p9;
  var noWhenBranchMatchedException = kotlin_kotlin.$_$.dg;
  var Long = kotlin_kotlin.$_$.ve;
  var Companion_getInstance = kotlin_kotlin.$_$.k4;
  var ArrayDeque_init_$Create$ = kotlin_kotlin.$_$.l;
  var RuntimeException = kotlin_kotlin.$_$.bf;
  var RuntimeException_init_$Init$ = kotlin_kotlin.$_$.h2;
  var captureStack = kotlin_kotlin.$_$.u9;
  var Error_0 = kotlin_kotlin.$_$.re;
  var Error_init_$Init$ = kotlin_kotlin.$_$.m1;
  var Element = kotlin_kotlin.$_$.l9;
  var CancellationException_init_$Create$_0 = kotlin_kotlin.$_$.e1;
  var StringBuilder_init_$Create$ = kotlin_kotlin.$_$.i1;
  var throwUninitializedPropertyAccessException = kotlin_kotlin.$_$.jg;
  var ArrayList_init_$Create$ = kotlin_kotlin.$_$.m;
  var CancellationException = kotlin_kotlin.$_$.y8;
  var ArrayList = kotlin_kotlin.$_$.y4;
  var SequenceScope = kotlin_kotlin.$_$.tc;
  var IllegalStateException_init_$Create$_0 = kotlin_kotlin.$_$.y1;
  var sequence = kotlin_kotlin.$_$.zc;
  var plus = kotlin_kotlin.$_$.m9;
  var get_0 = kotlin_kotlin.$_$.j9;
  var fold = kotlin_kotlin.$_$.i9;
  var minusKey_0 = kotlin_kotlin.$_$.k9;
  var anyToString = kotlin_kotlin.$_$.r9;
  var UnsupportedOperationException = kotlin_kotlin.$_$.of;
  var CancellationException_init_$Init$ = kotlin_kotlin.$_$.b1;
  var Companion_getInstance_0 = kotlin_kotlin.$_$.i4;
  var DurationUnit_MILLISECONDS_getInstance = kotlin_kotlin.$_$.h;
  var toDuration = kotlin_kotlin.$_$.je;
  var returnIfSuspended = kotlin_kotlin.$_$.k;
  var atomicfu$AtomicRefArray$ofNulls = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.a;
  var ensureNotNull = kotlin_kotlin.$_$.uf;
  var toLong = kotlin_kotlin.$_$.lb;
  var IllegalArgumentException_init_$Create$ = kotlin_kotlin.$_$.q1;
  var atomic$long$1 = kotlin_org_jetbrains_kotlinx_atomicfu.$_$.c;
  var listOf = kotlin_kotlin.$_$.v7;
  var ArrayList_init_$Create$_0 = kotlin_kotlin.$_$.n;
  var NoSuchElementException_init_$Create$ = kotlin_kotlin.$_$.a2;
  var compareTo = kotlin_kotlin.$_$.ba;
  var last = kotlin_kotlin.$_$.nd;
  var _Char___init__impl__6a9atx = kotlin_kotlin.$_$.m2;
  var IllegalStateException = kotlin_kotlin.$_$.ue;
  var IllegalStateException_init_$Init$ = kotlin_kotlin.$_$.v1;
  var NoSuchElementException = kotlin_kotlin.$_$.we;
  var NoSuchElementException_init_$Init$ = kotlin_kotlin.$_$.b2;
  var getKClass = kotlin_kotlin.$_$.e;
  var Unit = kotlin_kotlin.$_$.nf;
  var IntCompanionObject_instance = kotlin_kotlin.$_$.d4;
  var fillArrayVal = kotlin_kotlin.$_$.ea;
  var copyOf = kotlin_kotlin.$_$.j6;
  var joinToString = kotlin_kotlin.$_$.i7;
  var NoSuchElementException_init_$Create$_0 = kotlin_kotlin.$_$.c2;
  var Exception = kotlin_kotlin.$_$.se;
  var toLongOrNull = kotlin_kotlin.$_$.zd;
  var plus_0 = kotlin_kotlin.$_$.d8;
  var List = kotlin_kotlin.$_$.e5;
  var listOf_0 = kotlin_kotlin.$_$.u7;
  var getKClassFromExpression = kotlin_kotlin.$_$.d;
  var CancellationException_init_$Init$_0 = kotlin_kotlin.$_$.d1;
  var getStringHashCode = kotlin_kotlin.$_$.ka;
  var HashSet_init_$Create$ = kotlin_kotlin.$_$.t;
  var RuntimeException_init_$Init$_0 = kotlin_kotlin.$_$.f2;
  var LinkedHashSet_init_$Create$ = kotlin_kotlin.$_$.z;
  var removeFirstOrNull = kotlin_kotlin.$_$.f8;
  var MutableList = kotlin_kotlin.$_$.i5;
  var coerceIn = kotlin_kotlin.$_$.hc;
  var UnsupportedOperationException_init_$Create$_0 = kotlin_kotlin.$_$.j2;
  //endregion
  //region block: pre-declaration
  function cancel$default(cause, $super) {
    cause = cause === VOID ? null : cause;
    var tmp;
    if ($super === VOID) {
      this.sp(cause);
      tmp = Unit_instance;
    } else {
      tmp = $super.sp.call(this, cause);
    }
    return tmp;
  }
  setMetadataFor(Job, 'Job', interfaceMeta, VOID, [Element], VOID, VOID, VOID, [0]);
  setMetadataFor(ParentJob, 'ParentJob', interfaceMeta, VOID, [Job], VOID, VOID, VOID, [0]);
  setMetadataFor(JobSupport, 'JobSupport', classMeta, VOID, [Job, ParentJob], VOID, VOID, VOID, [0]);
  setMetadataFor(CoroutineScope, 'CoroutineScope', interfaceMeta);
  setMetadataFor(AbstractCoroutine, 'AbstractCoroutine', classMeta, JobSupport, [JobSupport, Job, Continuation, CoroutineScope], VOID, VOID, VOID, [0]);
  setMetadataFor(StandaloneCoroutine, 'StandaloneCoroutine', classMeta, AbstractCoroutine, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(LazyStandaloneCoroutine, 'LazyStandaloneCoroutine', classMeta, StandaloneCoroutine, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(ScopeCoroutine, 'ScopeCoroutine', classMeta, AbstractCoroutine, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(DispatchedCoroutine, 'DispatchedCoroutine', classMeta, ScopeCoroutine, VOID, VOID, VOID, VOID, [0]);
  function cancel$default_0(cause, $super) {
    cause = cause === VOID ? null : cause;
    return $super === VOID ? this.ar(cause) : $super.ar.call(this, cause);
  }
  setMetadataFor(CancellableContinuation, 'CancellableContinuation', interfaceMeta, VOID, [Continuation]);
  setMetadataFor(NotCompleted, 'NotCompleted', interfaceMeta);
  setMetadataFor(CancelHandler, 'CancelHandler', interfaceMeta, VOID, [NotCompleted]);
  setMetadataFor(DisposeOnCancel, 'DisposeOnCancel', classMeta, VOID, [CancelHandler]);
  setMetadataFor(Runnable, 'Runnable', interfaceMeta);
  setMetadataFor(SchedulerTask, 'SchedulerTask', classMeta, VOID, [Runnable]);
  setMetadataFor(DispatchedTask, 'DispatchedTask', classMeta, SchedulerTask);
  setMetadataFor(Waiter, 'Waiter', interfaceMeta);
  setMetadataFor(CancellableContinuationImpl, 'CancellableContinuationImpl', classMeta, DispatchedTask, [DispatchedTask, CancellableContinuation, Waiter]);
  setMetadataFor(UserSupplied, 'UserSupplied', classMeta, VOID, [CancelHandler]);
  setMetadataFor(Active, 'Active', objectMeta, VOID, [NotCompleted]);
  setMetadataFor(CompletedContinuation, 'CompletedContinuation', classMeta);
  setMetadataFor($awaitCOROUTINE$2, '$awaitCOROUTINE$2', classMeta, CoroutineImpl);
  setMetadataFor(CompletableDeferredImpl, 'CompletableDeferredImpl', classMeta, JobSupport, [JobSupport, Job], VOID, VOID, VOID, [0]);
  setMetadataFor(UserSupplied_0, 'UserSupplied', classMeta);
  setMetadataFor(CompletedExceptionally, 'CompletedExceptionally', classMeta);
  setMetadataFor(CancelledContinuation, 'CancelledContinuation', classMeta, CompletedExceptionally);
  setMetadataFor(CompletedWithCancellation, 'CompletedWithCancellation', classMeta);
  setMetadataFor(Key, 'Key', objectMeta, AbstractCoroutineContextKey);
  setMetadataFor(CoroutineDispatcher, 'CoroutineDispatcher', classMeta, AbstractCoroutineContextElement, [AbstractCoroutineContextElement, ContinuationInterceptor]);
  setMetadataFor(Key_0, 'Key', objectMeta);
  setMetadataFor(Key_1, 'Key', objectMeta);
  setMetadataFor(CoroutineStart, 'CoroutineStart', classMeta, Enum);
  function invokeOnTimeout(timeMillis, block, context) {
    return get_DefaultDelay().ju(timeMillis, block, context);
  }
  setMetadataFor(Delay, 'Delay', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(DelayWithTimeoutDiagnostics, 'DelayWithTimeoutDiagnostics', interfaceMeta, VOID, [Delay], VOID, VOID, VOID, [1]);
  setMetadataFor(EventLoop, 'EventLoop', classMeta, CoroutineDispatcher);
  setMetadataFor(ThreadLocalEventLoop, 'ThreadLocalEventLoop', objectMeta);
  setMetadataFor(CompletionHandlerException, 'CompletionHandlerException', classMeta, RuntimeException);
  setMetadataFor(CoroutinesInternalError, 'CoroutinesInternalError', classMeta, Error_0);
  setMetadataFor(Key_2, 'Key', objectMeta);
  setMetadataFor(ChildHandle, 'ChildHandle', interfaceMeta);
  setMetadataFor(NonDisposableHandle, 'NonDisposableHandle', objectMeta, VOID, [ChildHandle]);
  setMetadataFor(Incomplete, 'Incomplete', interfaceMeta);
  setMetadataFor(Empty, 'Empty', classMeta, VOID, [Incomplete]);
  setMetadataFor(LinkedListNode, 'LinkedListNode', classMeta, VOID, VOID, LinkedListNode);
  setMetadataFor(LinkedListHead, 'LinkedListHead', classMeta, LinkedListNode, VOID, LinkedListHead);
  setMetadataFor(NodeList, 'NodeList', classMeta, LinkedListHead, [LinkedListHead, Incomplete], NodeList);
  setMetadataFor(JobNode, 'JobNode', classMeta, LinkedListNode, [LinkedListNode, Incomplete]);
  setMetadataFor(SynchronizedObject, 'SynchronizedObject', classMeta, VOID, VOID, SynchronizedObject);
  setMetadataFor(Finishing, 'Finishing', classMeta, SynchronizedObject, [SynchronizedObject, Incomplete]);
  setMetadataFor(ChildCompletion, 'ChildCompletion', classMeta, JobNode);
  setMetadataFor(AwaitContinuation, 'AwaitContinuation', classMeta, CancellableContinuationImpl);
  setMetadataFor(JobSupport$_get_children_$slambda_k839f8, 'JobSupport$<get-children>$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(JobCancellingNode, 'JobCancellingNode', classMeta, JobNode);
  setMetadataFor(InactiveNodeList, 'InactiveNodeList', classMeta, VOID, [Incomplete]);
  setMetadataFor(ChildHandleNode, 'ChildHandleNode', classMeta, JobCancellingNode, [JobCancellingNode, ChildHandle]);
  setMetadataFor(InvokeOnCancelling, 'InvokeOnCancelling', classMeta, JobCancellingNode);
  setMetadataFor(InvokeOnCompletion, 'InvokeOnCompletion', classMeta, JobNode);
  setMetadataFor(ResumeOnCompletion, 'ResumeOnCompletion', classMeta, JobNode);
  setMetadataFor(ResumeAwaitOnCompletion, 'ResumeAwaitOnCompletion', classMeta, JobNode);
  setMetadataFor(IncompleteStateBox, 'IncompleteStateBox', classMeta);
  setMetadataFor(ChildContinuation, 'ChildContinuation', classMeta, JobCancellingNode);
  setMetadataFor(JobImpl, 'JobImpl', classMeta, JobSupport, [JobSupport, Job], VOID, VOID, VOID, [0]);
  setMetadataFor(DisposeOnCompletion, 'DisposeOnCompletion', classMeta, JobNode);
  setMetadataFor(MainCoroutineDispatcher, 'MainCoroutineDispatcher', classMeta, CoroutineDispatcher);
  setMetadataFor(SupervisorJobImpl, 'SupervisorJobImpl', classMeta, JobImpl, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(SupervisorCoroutine, 'SupervisorCoroutine', classMeta, ScopeCoroutine, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(TimeoutCancellationException, 'TimeoutCancellationException', classMeta, CancellationException);
  setMetadataFor(TimeoutCoroutine, 'TimeoutCoroutine', classMeta, ScopeCoroutine, [ScopeCoroutine, Runnable], VOID, VOID, VOID, [0]);
  setMetadataFor($withTimeoutOrNullCOROUTINE$4, '$withTimeoutOrNullCOROUTINE$4', classMeta, CoroutineImpl);
  setMetadataFor(Unconfined, 'Unconfined', objectMeta, CoroutineDispatcher);
  setMetadataFor(Key_3, 'Key', objectMeta);
  setMetadataFor(YieldContext, 'YieldContext', classMeta, AbstractCoroutineContextElement, VOID, YieldContext);
  setMetadataFor(BufferOverflow, 'BufferOverflow', classMeta, Enum);
  setMetadataFor(ConcurrentLinkedListNode, 'ConcurrentLinkedListNode', classMeta);
  setMetadataFor(Segment, 'Segment', classMeta, ConcurrentLinkedListNode, [ConcurrentLinkedListNode, NotCompleted]);
  setMetadataFor(ChannelSegment, 'ChannelSegment', classMeta, Segment);
  setMetadataFor($hasNextCOROUTINE$8, '$hasNextCOROUTINE$8', classMeta, CoroutineImpl);
  setMetadataFor(SendBroadcast, 'SendBroadcast', classMeta, VOID, [Waiter]);
  setMetadataFor(BufferedChannelIterator, 'BufferedChannelIterator', classMeta, VOID, [Waiter], VOID, VOID, VOID, [0, 3]);
  setMetadataFor($sendCOROUTINE$5, '$sendCOROUTINE$5', classMeta, CoroutineImpl);
  setMetadataFor($receiveCOROUTINE$6, '$receiveCOROUTINE$6', classMeta, CoroutineImpl);
  function close$default(cause, $super) {
    cause = cause === VOID ? null : cause;
    return $super === VOID ? this.o16(cause) : $super.o16.call(this, cause);
  }
  setMetadataFor(SendChannel, 'SendChannel', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  function cancel$default_1(cause, $super) {
    cause = cause === VOID ? null : cause;
    var tmp;
    if ($super === VOID) {
      this.sp(cause);
      tmp = Unit_instance;
    } else {
      tmp = $super.sp.call(this, cause);
    }
    return tmp;
  }
  setMetadataFor(ReceiveChannel, 'ReceiveChannel', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(BufferedChannel, 'BufferedChannel', classMeta, VOID, [SendChannel, ReceiveChannel], VOID, VOID, VOID, [1, 4, 0, 3]);
  setMetadataFor(WaiterEB, 'WaiterEB', classMeta);
  setMetadataFor(ReceiveCatching, 'ReceiveCatching', classMeta, VOID, [Waiter]);
  setMetadataFor(Factory, 'Factory', objectMeta);
  setMetadataFor(Failed, 'Failed', classMeta, VOID, VOID, Failed);
  setMetadataFor(Closed, 'Closed', classMeta, Failed);
  setMetadataFor(Companion, 'Companion', objectMeta);
  setMetadataFor(ChannelResult, 'ChannelResult', classMeta);
  setMetadataFor(ClosedSendChannelException, 'ClosedSendChannelException', classMeta, IllegalStateException);
  setMetadataFor(ClosedReceiveChannelException, 'ClosedReceiveChannelException', classMeta, NoSuchElementException);
  setMetadataFor(ChannelCoroutine, 'ChannelCoroutine', classMeta, AbstractCoroutine, [AbstractCoroutine, SendChannel, ReceiveChannel], VOID, VOID, VOID, [0, 1]);
  setMetadataFor(ConflatedBufferedChannel, 'ConflatedBufferedChannel', classMeta, BufferedChannel, VOID, VOID, VOID, VOID, [1, 0]);
  setMetadataFor(ProducerScope, 'ProducerScope', interfaceMeta, VOID, [CoroutineScope, SendChannel], VOID, VOID, VOID, [1]);
  setMetadataFor(ProducerCoroutine, 'ProducerCoroutine', classMeta, ChannelCoroutine, [ChannelCoroutine, ProducerScope], VOID, VOID, VOID, [0, 1]);
  setMetadataFor(AbstractFlow, 'AbstractFlow', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(SafeFlow, 'SafeFlow', classMeta, AbstractFlow, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($collectCOROUTINE$13, '$collectCOROUTINE$13', classMeta, CoroutineImpl);
  setMetadataFor(ChannelFlow, 'ChannelFlow', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ChannelAsFlow, 'ChannelAsFlow', classMeta, ChannelFlow, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor($emitAllImplCOROUTINE$12, '$emitAllImplCOROUTINE$12', classMeta, CoroutineImpl);
  setMetadataFor($collectCOROUTINE$14, '$collectCOROUTINE$14', classMeta, CoroutineImpl);
  setMetadataFor(FlowCollector, 'FlowCollector', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(Emitter, 'Emitter', classMeta);
  setMetadataFor($collectCOROUTINE$15, '$collectCOROUTINE$15', classMeta, CoroutineImpl);
  setMetadataFor(AbstractSharedFlow, 'AbstractSharedFlow', classMeta, SynchronizedObject);
  setMetadataFor(SharedFlowImpl, 'SharedFlowImpl', classMeta, AbstractSharedFlow, [AbstractSharedFlow, FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(AbstractSharedFlowSlot, 'AbstractSharedFlowSlot', classMeta);
  setMetadataFor(SharedFlowSlot, 'SharedFlowSlot', classMeta, AbstractSharedFlowSlot, VOID, SharedFlowSlot);
  setMetadataFor($collectCOROUTINE$16, '$collectCOROUTINE$16', classMeta, CoroutineImpl);
  setMetadataFor(StateFlowImpl, 'StateFlowImpl', classMeta, AbstractSharedFlow, [AbstractSharedFlow, FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(StateFlowSlot, 'StateFlowSlot', classMeta, AbstractSharedFlowSlot, VOID, StateFlowSlot, VOID, VOID, [0]);
  setMetadataFor(ChannelFlow$_get_collectToFun_$slambda_j53z2e, 'ChannelFlow$<get-collectToFun>$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ChannelFlow$collect$slambda, 'ChannelFlow$collect$slambda', classMeta, CoroutineImpl, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(SendingCollector, 'SendingCollector', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(ThrowingCollector, 'ThrowingCollector', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor($onSubscriptionCOROUTINE$23, '$onSubscriptionCOROUTINE$23', classMeta, CoroutineImpl);
  setMetadataFor(SubscribedFlowCollector, 'SubscribedFlowCollector', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1, 0]);
  setMetadataFor($emitCOROUTINE$27, '$emitCOROUTINE$27', classMeta, CoroutineImpl);
  setMetadataFor(_no_name_provided__qut3iv, VOID, classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor($firstCOROUTINE$26, '$firstCOROUTINE$26', classMeta, CoroutineImpl);
  setMetadataFor(OpDescriptor, 'OpDescriptor', classMeta);
  setMetadataFor(SegmentOrClosed, 'SegmentOrClosed', classMeta);
  setMetadataFor(ExceptionSuccessfullyProcessed, 'ExceptionSuccessfullyProcessed', objectMeta, Exception);
  setMetadataFor(DispatchedContinuation, 'DispatchedContinuation', classMeta, DispatchedTask, [DispatchedTask, Continuation]);
  setMetadataFor(UndeliveredElementException, 'UndeliveredElementException', classMeta, RuntimeException);
  setMetadataFor(ContextScope, 'ContextScope', classMeta, VOID, [CoroutineScope]);
  setMetadataFor(Symbol, 'Symbol', classMeta);
  setMetadataFor(SelectInstance, 'SelectInstance', interfaceMeta);
  setMetadataFor(ClauseData, 'ClauseData', classMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(SelectImplementation, 'SelectImplementation', classMeta, VOID, [CancelHandler, SelectInstance, Waiter], VOID, VOID, VOID, [0, 2]);
  setMetadataFor(TrySelectDetailedResult, 'TrySelectDetailedResult', classMeta, Enum);
  function lock$default(owner, $completion, $super) {
    owner = owner === VOID ? null : owner;
    return $super === VOID ? this.v1g(owner, $completion) : $super.v1g.call(this, owner, $completion);
  }
  function unlock$default(owner, $super) {
    owner = owner === VOID ? null : owner;
    var tmp;
    if ($super === VOID) {
      this.x1g(owner);
      tmp = Unit_instance;
    } else {
      tmp = $super.x1g.call(this, owner);
    }
    return tmp;
  }
  setMetadataFor(Mutex, 'Mutex', interfaceMeta, VOID, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(CancellableContinuationWithOwner, 'CancellableContinuationWithOwner', classMeta, VOID, [CancellableContinuation, Waiter]);
  setMetadataFor(SemaphoreImpl, 'SemaphoreImpl', classMeta, VOID, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(MutexImpl, 'MutexImpl', classMeta, SemaphoreImpl, [SemaphoreImpl, Mutex], VOID, VOID, VOID, [1, 0]);
  setMetadataFor(SemaphoreSegment, 'SemaphoreSegment', classMeta, Segment);
  setMetadataFor(UndispatchedCoroutine, 'UndispatchedCoroutine', classMeta, ScopeCoroutine, VOID, VOID, VOID, VOID, [0]);
  setMetadataFor(SetTimeoutBasedDispatcher, 'SetTimeoutBasedDispatcher', classMeta, CoroutineDispatcher, [CoroutineDispatcher, Delay], VOID, VOID, VOID, [1]);
  setMetadataFor(NodeDispatcher, 'NodeDispatcher', objectMeta, SetTimeoutBasedDispatcher, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(MessageQueue, 'MessageQueue', classMeta, VOID, [MutableList]);
  setMetadataFor(ScheduledMessageQueue, 'ScheduledMessageQueue', classMeta, MessageQueue);
  setMetadataFor(WindowMessageQueue, 'WindowMessageQueue', classMeta, MessageQueue);
  setMetadataFor(Dispatchers, 'Dispatchers', objectMeta);
  setMetadataFor(JsMainDispatcher, 'JsMainDispatcher', classMeta, MainCoroutineDispatcher);
  setMetadataFor(UnconfinedEventLoop, 'UnconfinedEventLoop', classMeta, EventLoop, VOID, UnconfinedEventLoop);
  setMetadataFor(JobCancellationException, 'JobCancellationException', classMeta, CancellationException);
  setMetadataFor(TaskContext, 'TaskContext', objectMeta);
  setMetadataFor(AbortFlowException, 'AbortFlowException', classMeta, CancellationException);
  setMetadataFor(SafeCollector, 'SafeCollector', classMeta, VOID, [FlowCollector], VOID, VOID, VOID, [1]);
  setMetadataFor(WorkaroundAtomicReference, 'WorkaroundAtomicReference', classMeta);
  setMetadataFor(DiagnosticCoroutineContextException, 'DiagnosticCoroutineContextException', classMeta, RuntimeException);
  setMetadataFor(SetTimeoutDispatcher, 'SetTimeoutDispatcher', objectMeta, SetTimeoutBasedDispatcher, VOID, VOID, VOID, VOID, [1]);
  setMetadataFor(ClearTimeout, 'ClearTimeout', classMeta, VOID, [CancelHandler]);
  setMetadataFor(WindowClearTimeout, 'WindowClearTimeout', classMeta, ClearTimeout);
  setMetadataFor(WindowDispatcher, 'WindowDispatcher', classMeta, CoroutineDispatcher, [CoroutineDispatcher, Delay], VOID, VOID, VOID, [1]);
  setMetadataFor(CommonThreadLocal, 'CommonThreadLocal', classMeta, VOID, VOID, CommonThreadLocal);
  //endregion
  function AbstractCoroutine(parentContext, initParentJob, active) {
    JobSupport.call(this, active);
    if (initParentJob) {
      this.fo(parentContext.hc(Key_instance_3));
    }
    this.io_1 = parentContext.vf(this);
  }
  protoOf(AbstractCoroutine).t6 = function () {
    return this.io_1;
  };
  protoOf(AbstractCoroutine).jo = function () {
    return this.io_1;
  };
  protoOf(AbstractCoroutine).ko = function () {
    return protoOf(JobSupport).ko.call(this);
  };
  protoOf(AbstractCoroutine).lo = function (value) {
  };
  protoOf(AbstractCoroutine).mo = function (cause, handled) {
  };
  protoOf(AbstractCoroutine).no = function () {
    return get_classSimpleName(this) + ' was cancelled';
  };
  protoOf(AbstractCoroutine).oo = function (state) {
    if (state instanceof CompletedExceptionally) {
      this.mo(state.po_1, state.ro());
    } else {
      this.lo((state == null ? true : !(state == null)) ? state : THROW_CCE());
    }
  };
  protoOf(AbstractCoroutine).u6 = function (result) {
    var state = this.so(toState_0(result));
    if (state === get_COMPLETING_WAITING_CHILDREN())
      return Unit_instance;
    this.to(state);
  };
  protoOf(AbstractCoroutine).to = function (state) {
    return this.uo(state);
  };
  protoOf(AbstractCoroutine).vo = function (exception) {
    handleCoroutineException(this.io_1, exception);
  };
  protoOf(AbstractCoroutine).wo = function () {
    var tmp0_elvis_lhs = get_coroutineName(this.io_1);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return protoOf(JobSupport).wo.call(this);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var coroutineName = tmp;
    return '"' + coroutineName + '":' + protoOf(JobSupport).wo.call(this);
  };
  protoOf(AbstractCoroutine).xo = function (start, receiver, block) {
    start.ap(block, receiver, this);
  };
  function launch(_this__u8e3s4, context, start, block) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
    var newContext = newCoroutineContext(_this__u8e3s4, context);
    var coroutine = start.gq() ? new LazyStandaloneCoroutine(newContext, block) : new StandaloneCoroutine(newContext, true);
    coroutine.xo(start, coroutine, block);
    return coroutine;
  }
  function withContext(context, block, $completion) {
    // Inline function 'kotlin.contracts.contract' call
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.withContext.<anonymous>' call
      var oldContext = $completion.t6();
      var newContext = newCoroutineContext_0(oldContext, context);
      ensureActive(newContext);
      if (newContext === oldContext) {
        var coroutine = new ScopeCoroutine(newContext, $completion);
        tmp$ret$0 = startUndispatchedOrReturn(coroutine, coroutine, block);
        break $l$block_0;
      }
      if (equals(newContext.hc(Key_instance), oldContext.hc(Key_instance))) {
        var coroutine_0 = new UndispatchedCoroutine(newContext, $completion);
        // Inline function 'kotlinx.coroutines.withCoroutineContext' call
        coroutine_0.io_1;
        tmp$ret$0 = startUndispatchedOrReturn(coroutine_0, coroutine_0, block);
        break $l$block_0;
      }
      var coroutine_1 = new DispatchedCoroutine(newContext, $completion);
      startCoroutineCancellable(block, coroutine_1, coroutine_1);
      tmp$ret$0 = coroutine_1.mq();
    }
    return tmp$ret$0;
  }
  function StandaloneCoroutine(parentContext, active) {
    AbstractCoroutine.call(this, parentContext, true, active);
  }
  protoOf(StandaloneCoroutine).eq = function (exception) {
    handleCoroutineException(this.io_1, exception);
    return true;
  };
  function LazyStandaloneCoroutine(parentContext, block) {
    StandaloneCoroutine.call(this, parentContext, false);
    this.tq_1 = createCoroutineUnintercepted(block, this, this);
  }
  protoOf(LazyStandaloneCoroutine).ip = function () {
    startCoroutineCancellable_0(this.tq_1, this);
  };
  function trySuspend($this) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.lq_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.DispatchedCoroutine.trySuspend.<anonymous>' call
      switch (this_0.kotlinx$atomicfu$value) {
        case 0:
          if ($this.lq_1.atomicfu$compareAndSet(0, 1))
            return true;
          break;
        case 2:
          return false;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Already suspended';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function tryResume($this) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.lq_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.DispatchedCoroutine.tryResume.<anonymous>' call
      switch (this_0.kotlinx$atomicfu$value) {
        case 0:
          if ($this.lq_1.atomicfu$compareAndSet(0, 2))
            return true;
          break;
        case 1:
          return false;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Already resumed';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function DispatchedCoroutine(context, uCont) {
    ScopeCoroutine.call(this, context, uCont);
    this.lq_1 = atomic$int$1(0);
  }
  protoOf(DispatchedCoroutine).uo = function (state) {
    this.to(state);
  };
  protoOf(DispatchedCoroutine).to = function (state) {
    if (tryResume(this))
      return Unit_instance;
    resumeCancellableWith(intercepted(this.xq_1), recoverResult(state, this.xq_1));
  };
  protoOf(DispatchedCoroutine).mq = function () {
    if (trySuspend(this))
      return get_COROUTINE_SUSPENDED();
    var state = unboxState(this.ep());
    if (state instanceof CompletedExceptionally)
      throw state.po_1;
    return (state == null ? true : !(state == null)) ? state : THROW_CCE();
  };
  function CancellableContinuation() {
  }
  function disposeOnCancellation(_this__u8e3s4, handle) {
    return invokeOnCancellation(_this__u8e3s4, new DisposeOnCancel(handle));
  }
  function invokeOnCancellation(_this__u8e3s4, handler) {
    var tmp;
    if (_this__u8e3s4 instanceof CancellableContinuationImpl) {
      _this__u8e3s4.lr(handler);
      tmp = Unit_instance;
    } else {
      throw UnsupportedOperationException_init_$Create$('third-party implementation of CancellableContinuation is not supported');
    }
    return tmp;
  }
  function DisposeOnCancel(handle) {
    this.mr_1 = handle;
  }
  protoOf(DisposeOnCancel).nr = function (cause) {
    return this.mr_1.or();
  };
  protoOf(DisposeOnCancel).toString = function () {
    return 'DisposeOnCancel[' + this.mr_1 + ']';
  };
  function getOrCreateCancellableContinuation(delegate) {
    if (!(delegate instanceof DispatchedContinuation)) {
      return new CancellableContinuationImpl(delegate, get_MODE_CANCELLABLE());
    }
    var tmp0_safe_receiver = delegate.vr();
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.takeIf' call
      // Inline function 'kotlin.contracts.contract' call
      var tmp_0;
      // Inline function 'kotlinx.coroutines.getOrCreateCancellableContinuation.<anonymous>' call
      if (tmp0_safe_receiver.wr()) {
        tmp_0 = tmp0_safe_receiver;
      } else {
        tmp_0 = null;
      }
      tmp = tmp_0;
    }
    var tmp1_elvis_lhs = tmp;
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      return new CancellableContinuationImpl(delegate, get_MODE_CANCELLABLE_REUSABLE());
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    return tmp_1;
  }
  function get_RESUME_TOKEN() {
    _init_properties_CancellableContinuationImpl_kt__6rrtdd();
    return RESUME_TOKEN;
  }
  var RESUME_TOKEN;
  function _get_parentHandle__f8dcex($this) {
    return $this.kr_1.kotlinx$atomicfu$value;
  }
  function _get_stateDebugRepresentation__bf18u4($this) {
    var tmp0_subject = $this.ep();
    var tmp;
    if (!(tmp0_subject == null) ? isInterface(tmp0_subject, NotCompleted) : false) {
      tmp = 'Active';
    } else {
      if (tmp0_subject instanceof CancelledContinuation) {
        tmp = 'Cancelled';
      } else {
        tmp = 'Completed';
      }
    }
    return tmp;
  }
  function isReusable($this) {
    var tmp;
    if (get_isReusableMode($this.yr_1)) {
      var tmp_0 = $this.gr_1;
      tmp = (tmp_0 instanceof DispatchedContinuation ? tmp_0 : THROW_CCE()).xr();
    } else {
      tmp = false;
    }
    return tmp;
  }
  function cancelLater($this, cause) {
    if (!isReusable($this))
      return false;
    var tmp = $this.gr_1;
    var dispatched = tmp instanceof DispatchedContinuation ? tmp : THROW_CCE();
    return dispatched.zr(cause);
  }
  function callSegmentOnCancellation($this, segment, cause) {
    // Inline function 'kotlinx.coroutines.index' call
    var index = $this.ir_1.kotlinx$atomicfu$value & 536870911;
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(index === 536870911)) {
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callSegmentOnCancellation.<anonymous>' call
      var message = 'The index for Segment.onCancellation(..) is broken';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callCancelHandlerSafely' call
    try {
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.callSegmentOnCancellation.<anonymous>' call
      segment.es(index, cause, $this.t6());
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        handleCoroutineException($this.t6(), new CompletionHandlerException('Exception in invokeOnCancellation handler for ' + $this, ex));
      } else {
        throw $p;
      }
    }
  }
  function trySuspend_0($this) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.ir_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.trySuspend.<anonymous>' call
      var cur = this_0.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.decision' call
      switch (cur >> _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) {
        case 0:
          // Inline function 'kotlinx.coroutines.decisionAndIndex' call

          // Inline function 'kotlinx.coroutines.index' call

          var index = cur & 536870911;
          var tmp$ret$2 = (1 << _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) + index | 0;
          if ($this.ir_1.atomicfu$compareAndSet(cur, tmp$ret$2))
            return true;
          break;
        case 2:
          return false;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Already suspended';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function tryResume_0($this) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.ir_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.tryResume.<anonymous>' call
      var cur = this_0.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.decision' call
      switch (cur >> _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) {
        case 0:
          // Inline function 'kotlinx.coroutines.decisionAndIndex' call

          // Inline function 'kotlinx.coroutines.index' call

          var index = cur & 536870911;
          var tmp$ret$2 = (2 << _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) + index | 0;
          if ($this.ir_1.atomicfu$compareAndSet(cur, tmp$ret$2))
            return true;
          break;
        case 1:
          return false;
        default:
          // Inline function 'kotlin.error' call

          var message = 'Already resumed';
          throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function installParentHandle($this) {
    var tmp0_elvis_lhs = $this.t6().hc(Key_instance_3);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var parent = tmp;
    var handle = invokeOnCompletion(parent, true, VOID, new ChildContinuation($this));
    $this.kr_1.atomicfu$compareAndSet(null, handle);
    return handle;
  }
  function invokeOnCancellationImpl($this, handler) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.jr_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.invokeOnCancellationImpl.<anonymous>' call
      var state = this_0.kotlinx$atomicfu$value;
      if (state instanceof Active) {
        if ($this.jr_1.atomicfu$compareAndSet(state, handler))
          return Unit_instance;
      } else {
        var tmp;
        if (!(state == null) ? isInterface(state, CancelHandler) : false) {
          tmp = true;
        } else {
          tmp = state instanceof Segment;
        }
        if (tmp) {
          multipleHandlersError($this, handler, state);
        } else {
          if (state instanceof CompletedExceptionally) {
            if (!state.ns()) {
              multipleHandlersError($this, handler, state);
            }
            if (state instanceof CancelledContinuation) {
              var tmp1_safe_receiver = state instanceof CompletedExceptionally ? state : null;
              var cause = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.po_1;
              if (isInterface(handler, CancelHandler)) {
                $this.ks(handler, cause);
              } else {
                var segment = handler instanceof Segment ? handler : THROW_CCE();
                callSegmentOnCancellation($this, segment, cause);
              }
            }
            return Unit_instance;
          } else {
            if (state instanceof CompletedContinuation) {
              if (!(state.gs_1 == null)) {
                multipleHandlersError($this, handler, state);
              }
              if (handler instanceof Segment)
                return Unit_instance;
              if (!isInterface(handler, CancelHandler))
                THROW_CCE();
              if (state.ls()) {
                $this.ks(handler, state.js_1);
                return Unit_instance;
              }
              var update = state.ms(VOID, handler);
              if ($this.jr_1.atomicfu$compareAndSet(state, update))
                return Unit_instance;
            } else {
              if (handler instanceof Segment)
                return Unit_instance;
              if (!isInterface(handler, CancelHandler))
                THROW_CCE();
              var update_0 = new CompletedContinuation(state, handler);
              if ($this.jr_1.atomicfu$compareAndSet(state, update_0))
                return Unit_instance;
            }
          }
        }
      }
    }
  }
  function multipleHandlersError($this, handler, state) {
    // Inline function 'kotlin.error' call
    var message = "It's prohibited to register multiple handlers, tried to register " + toString(handler) + ', already has ' + toString_0(state);
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function dispatchResume($this, mode) {
    if (tryResume_0($this))
      return Unit_instance;
    dispatch($this, mode);
  }
  function resumedState($this, state, proposedUpdate, resumeMode, onCancellation, idempotent) {
    var tmp;
    if (proposedUpdate instanceof CompletedExceptionally) {
      // Inline function 'kotlinx.coroutines.assert' call
      // Inline function 'kotlinx.coroutines.assert' call
      tmp = proposedUpdate;
    } else {
      if (!get_isCancellableMode(resumeMode) ? idempotent == null : false) {
        tmp = proposedUpdate;
      } else {
        var tmp_0;
        var tmp_1;
        if (!(onCancellation == null)) {
          tmp_1 = true;
        } else {
          tmp_1 = isInterface(state, CancelHandler);
        }
        if (tmp_1) {
          tmp_0 = true;
        } else {
          tmp_0 = !(idempotent == null);
        }
        if (tmp_0) {
          tmp = new CompletedContinuation(proposedUpdate, isInterface(state, CancelHandler) ? state : null, onCancellation, idempotent);
        } else {
          tmp = proposedUpdate;
        }
      }
    }
    return tmp;
  }
  function resumeImpl($this, proposedUpdate, resumeMode, onCancellation) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.jr_1;
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.resumeImpl.<anonymous>' call
        var state = this_0.kotlinx$atomicfu$value;
        if (!(state == null) ? isInterface(state, NotCompleted) : false) {
          var update = resumedState($this, state, proposedUpdate, resumeMode, onCancellation, null);
          if (!$this.jr_1.atomicfu$compareAndSet(state, update)) {
            break $l$block;
          }
          detachChildIfNonResuable($this);
          dispatchResume($this, resumeMode);
          return Unit_instance;
        } else {
          if (state instanceof CancelledContinuation) {
            if (state.ss()) {
              if (onCancellation == null)
                null;
              else {
                // Inline function 'kotlin.let' call
                // Inline function 'kotlin.contracts.contract' call
                $this.os(onCancellation, state.po_1);
              }
              return Unit_instance;
            }
          }
        }
        alreadyResumedError($this, proposedUpdate);
      }
    }
  }
  function resumeImpl$default($this, proposedUpdate, resumeMode, onCancellation, $super) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    return resumeImpl($this, proposedUpdate, resumeMode, onCancellation);
  }
  function tryResumeImpl($this, proposedUpdate, idempotent, onCancellation) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = $this.jr_1;
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.tryResumeImpl.<anonymous>' call
        var state = this_0.kotlinx$atomicfu$value;
        if (!(state == null) ? isInterface(state, NotCompleted) : false) {
          var update = resumedState($this, state, proposedUpdate, $this.yr_1, onCancellation, idempotent);
          if (!$this.jr_1.atomicfu$compareAndSet(state, update)) {
            break $l$block;
          }
          detachChildIfNonResuable($this);
          return get_RESUME_TOKEN();
        } else {
          if (state instanceof CompletedContinuation) {
            var tmp;
            if (!(idempotent == null) ? state.is_1 === idempotent : false) {
              // Inline function 'kotlinx.coroutines.assert' call
              tmp = get_RESUME_TOKEN();
            } else {
              tmp = null;
            }
            return tmp;
          } else {
            return null;
          }
        }
      }
    }
  }
  function alreadyResumedError($this, proposedUpdate) {
    // Inline function 'kotlin.error' call
    var message = 'Already resumed, but proposed with update ' + toString_0(proposedUpdate);
    throw IllegalStateException_init_$Create$(toString(message));
  }
  function detachChildIfNonResuable($this) {
    if (!isReusable($this)) {
      $this.ts();
    }
  }
  function CancellableContinuationImpl(delegate, resumeMode) {
    DispatchedTask.call(this, resumeMode);
    this.gr_1 = delegate;
    // Inline function 'kotlinx.coroutines.assert' call
    this.hr_1 = this.gr_1.t6();
    var tmp = this;
    // Inline function 'kotlinx.coroutines.decisionAndIndex' call
    var tmp$ret$0 = (0 << _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) + 536870911 | 0;
    tmp.ir_1 = atomic$int$1(tmp$ret$0);
    this.jr_1 = atomic$ref$1(Active_instance);
    this.kr_1 = atomic$ref$1(null);
  }
  protoOf(CancellableContinuationImpl).us = function () {
    return this.gr_1;
  };
  protoOf(CancellableContinuationImpl).t6 = function () {
    return this.hr_1;
  };
  protoOf(CancellableContinuationImpl).ep = function () {
    return this.jr_1.kotlinx$atomicfu$value;
  };
  protoOf(CancellableContinuationImpl).fp = function () {
    var tmp = this.ep();
    return !(!(tmp == null) ? isInterface(tmp, NotCompleted) : false);
  };
  protoOf(CancellableContinuationImpl).vs = function () {
    var tmp0_elvis_lhs = installParentHandle(this);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var handle = tmp;
    if (this.fp()) {
      handle.or();
      this.kr_1.kotlinx$atomicfu$value = NonDisposableHandle_instance;
    }
  };
  protoOf(CancellableContinuationImpl).wr = function () {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    var state = this.jr_1.kotlinx$atomicfu$value;
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp;
    if (state instanceof CompletedContinuation) {
      tmp = !(state.is_1 == null);
    } else {
      tmp = false;
    }
    if (tmp) {
      this.ts();
      return false;
    }
    var tmp_0 = this.ir_1;
    // Inline function 'kotlinx.coroutines.decisionAndIndex' call
    tmp_0.kotlinx$atomicfu$value = (0 << _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) + 536870911 | 0;
    this.jr_1.kotlinx$atomicfu$value = Active_instance;
    return true;
  };
  protoOf(CancellableContinuationImpl).ws = function () {
    return this.ep();
  };
  protoOf(CancellableContinuationImpl).xs = function (takenState, cause) {
    var this_0 = this.jr_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.cancelCompletedResult.<anonymous>' call
      var state = this_0.kotlinx$atomicfu$value;
      if (!(state == null) ? isInterface(state, NotCompleted) : false) {
        // Inline function 'kotlin.error' call
        var message = 'Not completed';
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        if (state instanceof CompletedExceptionally)
          return Unit_instance;
        else {
          if (state instanceof CompletedContinuation) {
            // Inline function 'kotlin.check' call
            // Inline function 'kotlin.contracts.contract' call
            if (!!state.ls()) {
              // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.cancelCompletedResult.<anonymous>.<anonymous>' call
              var message_0 = 'Must be called at most once';
              throw IllegalStateException_init_$Create$(toString(message_0));
            }
            var update = state.ms(VOID, VOID, VOID, VOID, cause);
            if (this.jr_1.atomicfu$compareAndSet(state, update)) {
              state.ys(this, cause);
              return Unit_instance;
            }
          } else {
            if (this.jr_1.atomicfu$compareAndSet(state, new CompletedContinuation(state, VOID, VOID, VOID, cause))) {
              return Unit_instance;
            }
          }
        }
      }
    }
    return Unit_instance;
  };
  protoOf(CancellableContinuationImpl).ar = function (cause) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.jr_1;
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.cancel.<anonymous>' call
        var state = this_0.kotlinx$atomicfu$value;
        if (!(!(state == null) ? isInterface(state, NotCompleted) : false))
          return false;
        var tmp;
        if (!(state == null) ? isInterface(state, CancelHandler) : false) {
          tmp = true;
        } else {
          tmp = state instanceof Segment;
        }
        var update = new CancelledContinuation(this, cause, tmp);
        if (!this.jr_1.atomicfu$compareAndSet(state, update)) {
          break $l$block;
        }
        if (isInterface(state, CancelHandler)) {
          this.ks(state, cause);
        } else {
          if (state instanceof Segment) {
            callSegmentOnCancellation(this, state, cause);
          }
        }
        detachChildIfNonResuable(this);
        dispatchResume(this, this.yr_1);
        return true;
      }
    }
  };
  protoOf(CancellableContinuationImpl).zs = function (cause) {
    if (cancelLater(this, cause))
      return Unit_instance;
    this.ar(cause);
    detachChildIfNonResuable(this);
  };
  protoOf(CancellableContinuationImpl).ks = function (handler, cause) {
    var tmp;
    try {
      handler.nr(cause);
      tmp = Unit_instance;
    } catch ($p) {
      var tmp_0;
      if ($p instanceof Error) {
        var ex = $p;
        handleCoroutineException(this.t6(), new CompletionHandlerException('Exception in invokeOnCancellation handler for ' + this, ex));
        tmp_0 = Unit_instance;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(CancellableContinuationImpl).os = function (onCancellation, cause) {
    try {
      onCancellation(cause);
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        handleCoroutineException(this.t6(), new CompletionHandlerException('Exception in resume onCancellation handler for ' + this, ex));
      } else {
        throw $p;
      }
    }
  };
  protoOf(CancellableContinuationImpl).at = function (parent) {
    return parent.jp();
  };
  protoOf(CancellableContinuationImpl).mq = function () {
    var isReusable_0 = isReusable(this);
    if (trySuspend_0(this)) {
      if (_get_parentHandle__f8dcex(this) == null) {
        installParentHandle(this);
      }
      if (isReusable_0) {
        this.bt();
      }
      return get_COROUTINE_SUSPENDED();
    }
    if (isReusable_0) {
      this.bt();
    }
    var state = this.ep();
    if (state instanceof CompletedExceptionally)
      throw recoverStackTrace(state.po_1, this);
    if (get_isCancellableMode(this.yr_1)) {
      var job = this.t6().hc(Key_instance_3);
      if (!(job == null) ? !job.ko() : false) {
        var cause = job.jp();
        this.xs(state, cause);
        throw recoverStackTrace(cause, this);
      }
    }
    return this.ct(state);
  };
  protoOf(CancellableContinuationImpl).bt = function () {
    var tmp = this.gr_1;
    var tmp0_safe_receiver = tmp instanceof DispatchedContinuation ? tmp : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.dt(this);
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var cancellationCause = tmp_0;
    this.ts();
    this.ar(cancellationCause);
  };
  protoOf(CancellableContinuationImpl).u6 = function (result) {
    return resumeImpl$default(this, toState(result, this), this.yr_1);
  };
  protoOf(CancellableContinuationImpl).er = function (value, onCancellation) {
    return resumeImpl(this, value, this.yr_1, onCancellation);
  };
  protoOf(CancellableContinuationImpl).et = function (segment, index) {
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      var this_0 = this.ir_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.invokeOnCancellation.<anonymous>' call
        // Inline function 'kotlin.check' call
        // Inline function 'kotlinx.coroutines.index' call
        // Inline function 'kotlin.contracts.contract' call
        if (!((cur & 536870911) === 536870911)) {
          // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.invokeOnCancellation.<anonymous>.<anonymous>' call
          var message = 'invokeOnCancellation should be called at most once';
          throw IllegalStateException_init_$Create$(toString(message));
        }
        // Inline function 'kotlinx.coroutines.decisionAndIndex' call
        // Inline function 'kotlinx.coroutines.decision' call
        var upd = (cur >> _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i() << _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i()) + index | 0;
        if (this_0.atomicfu$compareAndSet(cur, upd)) {
          break $l$block;
        }
      }
    }
    invokeOnCancellationImpl(this, segment);
  };
  protoOf(CancellableContinuationImpl).cr = function (handler) {
    return invokeOnCancellation(this, new UserSupplied(handler));
  };
  protoOf(CancellableContinuationImpl).lr = function (handler) {
    return invokeOnCancellationImpl(this, handler);
  };
  protoOf(CancellableContinuationImpl).ts = function () {
    var tmp0_elvis_lhs = _get_parentHandle__f8dcex(this);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var handle = tmp;
    handle.or();
    this.kr_1.kotlinx$atomicfu$value = NonDisposableHandle_instance;
  };
  protoOf(CancellableContinuationImpl).yq = function (value, idempotent, onCancellation) {
    return tryResumeImpl(this, value, idempotent, onCancellation);
  };
  protoOf(CancellableContinuationImpl).zq = function (token) {
    // Inline function 'kotlinx.coroutines.assert' call
    dispatchResume(this, this.yr_1);
  };
  protoOf(CancellableContinuationImpl).dr = function (_this__u8e3s4, value) {
    var tmp = this.gr_1;
    var dc = tmp instanceof DispatchedContinuation ? tmp : null;
    var tmp_0;
    if ((dc == null ? null : dc.qr_1) === _this__u8e3s4) {
      tmp_0 = get_MODE_UNDISPATCHED();
    } else {
      tmp_0 = this.yr_1;
    }
    resumeImpl$default(this, value, tmp_0);
  };
  protoOf(CancellableContinuationImpl).ct = function (state) {
    var tmp;
    if (state instanceof CompletedContinuation) {
      var tmp_0 = state.fs_1;
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      tmp = (state == null ? true : !(state == null)) ? state : THROW_CCE();
    }
    return tmp;
  };
  protoOf(CancellableContinuationImpl).ft = function (state) {
    var tmp0_safe_receiver = protoOf(DispatchedTask).ft.call(this, state);
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.CancellableContinuationImpl.getExceptionalResult.<anonymous>' call
      tmp = recoverStackTrace(tmp0_safe_receiver, this.gr_1);
    }
    return tmp;
  };
  protoOf(CancellableContinuationImpl).toString = function () {
    return this.wo() + '(' + toDebugString(this.gr_1) + '){' + _get_stateDebugRepresentation__bf18u4(this) + '}@' + get_hexAddress(this);
  };
  protoOf(CancellableContinuationImpl).wo = function () {
    return 'CancellableContinuation';
  };
  function NotCompleted() {
  }
  function UserSupplied(handler) {
    this.it_1 = handler;
  }
  protoOf(UserSupplied).nr = function (cause) {
    this.it_1(cause);
  };
  protoOf(UserSupplied).toString = function () {
    return 'CancelHandler.UserSupplied[' + get_classSimpleName(this.it_1) + '@' + get_hexAddress(this) + ']';
  };
  function CancelHandler() {
  }
  function Active() {
  }
  protoOf(Active).toString = function () {
    return 'Active';
  };
  var Active_instance;
  function Active_getInstance() {
    return Active_instance;
  }
  function CompletedContinuation(result, cancelHandler, onCancellation, idempotentResume, cancelCause) {
    cancelHandler = cancelHandler === VOID ? null : cancelHandler;
    onCancellation = onCancellation === VOID ? null : onCancellation;
    idempotentResume = idempotentResume === VOID ? null : idempotentResume;
    cancelCause = cancelCause === VOID ? null : cancelCause;
    this.fs_1 = result;
    this.gs_1 = cancelHandler;
    this.hs_1 = onCancellation;
    this.is_1 = idempotentResume;
    this.js_1 = cancelCause;
  }
  protoOf(CompletedContinuation).ls = function () {
    return !(this.js_1 == null);
  };
  protoOf(CompletedContinuation).ys = function (cont, cause) {
    var tmp0_safe_receiver = this.gs_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      cont.ks(tmp0_safe_receiver, cause);
    }
    var tmp1_safe_receiver = this.hs_1;
    if (tmp1_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      cont.os(tmp1_safe_receiver, cause);
    }
  };
  protoOf(CompletedContinuation).jt = function (result, cancelHandler, onCancellation, idempotentResume, cancelCause) {
    return new CompletedContinuation(result, cancelHandler, onCancellation, idempotentResume, cancelCause);
  };
  protoOf(CompletedContinuation).ms = function (result, cancelHandler, onCancellation, idempotentResume, cancelCause, $super) {
    result = result === VOID ? this.fs_1 : result;
    cancelHandler = cancelHandler === VOID ? this.gs_1 : cancelHandler;
    onCancellation = onCancellation === VOID ? this.hs_1 : onCancellation;
    idempotentResume = idempotentResume === VOID ? this.is_1 : idempotentResume;
    cancelCause = cancelCause === VOID ? this.js_1 : cancelCause;
    return $super === VOID ? this.jt(result, cancelHandler, onCancellation, idempotentResume, cancelCause) : $super.jt.call(this, result, cancelHandler, onCancellation, idempotentResume, cancelCause);
  };
  protoOf(CompletedContinuation).toString = function () {
    return 'CompletedContinuation(result=' + toString_0(this.fs_1) + ', cancelHandler=' + this.gs_1 + ', onCancellation=' + this.hs_1 + ', idempotentResume=' + toString_0(this.is_1) + ', cancelCause=' + this.js_1 + ')';
  };
  protoOf(CompletedContinuation).hashCode = function () {
    var result = this.fs_1 == null ? 0 : hashCode(this.fs_1);
    result = imul(result, 31) + (this.gs_1 == null ? 0 : hashCode(this.gs_1)) | 0;
    result = imul(result, 31) + (this.hs_1 == null ? 0 : hashCode(this.hs_1)) | 0;
    result = imul(result, 31) + (this.is_1 == null ? 0 : hashCode(this.is_1)) | 0;
    result = imul(result, 31) + (this.js_1 == null ? 0 : hashCode(this.js_1)) | 0;
    return result;
  };
  protoOf(CompletedContinuation).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CompletedContinuation))
      return false;
    var tmp0_other_with_cast = other instanceof CompletedContinuation ? other : THROW_CCE();
    if (!equals(this.fs_1, tmp0_other_with_cast.fs_1))
      return false;
    if (!equals(this.gs_1, tmp0_other_with_cast.gs_1))
      return false;
    if (!equals(this.hs_1, tmp0_other_with_cast.hs_1))
      return false;
    if (!equals(this.is_1, tmp0_other_with_cast.is_1))
      return false;
    if (!equals(this.js_1, tmp0_other_with_cast.js_1))
      return false;
    return true;
  };
  function _get_DECISION_SHIFT_$accessor$2jt7ek_1tkg2i() {
    _init_properties_CancellableContinuationImpl_kt__6rrtdd();
    return 29;
  }
  var properties_initialized_CancellableContinuationImpl_kt_xtzb03;
  function _init_properties_CancellableContinuationImpl_kt__6rrtdd() {
    if (!properties_initialized_CancellableContinuationImpl_kt_xtzb03) {
      properties_initialized_CancellableContinuationImpl_kt_xtzb03 = true;
      RESUME_TOKEN = new Symbol('RESUME_TOKEN');
    }
  }
  function CompletableDeferred(parent) {
    parent = parent === VOID ? null : parent;
    return new CompletableDeferredImpl(parent);
  }
  function $awaitCOROUTINE$2(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.st_1 = _this__u8e3s4;
  }
  protoOf($awaitCOROUTINE$2).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.st_1.tt(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return (suspendResult == null ? true : !(suspendResult == null)) ? suspendResult : THROW_CCE();
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
  function CompletableDeferredImpl(parent) {
    JobSupport.call(this, true);
    this.fo(parent);
  }
  protoOf(CompletableDeferredImpl).rp = function () {
    return true;
  };
  protoOf(CompletableDeferredImpl).wt = function ($completion) {
    var tmp = new $awaitCOROUTINE$2(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(CompletableDeferredImpl).xt = function (value) {
    return this.yt(value);
  };
  function UserSupplied_0(handler) {
    this.zt_1 = handler;
  }
  protoOf(UserSupplied_0).nr = function (cause) {
    this.zt_1(cause);
  };
  protoOf(UserSupplied_0).toString = function () {
    return 'InternalCompletionHandler.UserSupplied[' + get_classSimpleName(this.zt_1) + '@' + get_hexAddress(this) + ']';
  };
  function CompletedExceptionally(cause, handled) {
    handled = handled === VOID ? false : handled;
    this.po_1 = cause;
    this.qo_1 = atomic$boolean$1(handled);
  }
  protoOf(CompletedExceptionally).ro = function () {
    return this.qo_1.kotlinx$atomicfu$value;
  };
  protoOf(CompletedExceptionally).ns = function () {
    return this.qo_1.atomicfu$compareAndSet(false, true);
  };
  protoOf(CompletedExceptionally).toString = function () {
    return get_classSimpleName(this) + '[' + this.po_1 + ']';
  };
  function CancelledContinuation(continuation, cause, handled) {
    CompletedExceptionally.call(this, cause == null ? CancellationException_init_$Create$('Continuation ' + continuation + ' was cancelled normally') : cause, handled);
    this.rs_1 = atomic$boolean$1(false);
  }
  protoOf(CancelledContinuation).ss = function () {
    return this.rs_1.atomicfu$compareAndSet(false, true);
  };
  function toState(_this__u8e3s4, caller) {
    // Inline function 'kotlin.fold' call
    // Inline function 'kotlin.contracts.contract' call
    var exception = Result__exceptionOrNull_impl_p6xea9(_this__u8e3s4);
    var tmp;
    if (exception == null) {
      // Inline function 'kotlinx.coroutines.toState.<anonymous>' call
      var tmp_0 = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
      tmp = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
    } else {
      // Inline function 'kotlinx.coroutines.toState.<anonymous>' call
      tmp = new CompletedExceptionally(recoverStackTrace(exception, caller));
    }
    return tmp;
  }
  function toState_0(_this__u8e3s4, onCancellation) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    // Inline function 'kotlin.fold' call
    // Inline function 'kotlin.contracts.contract' call
    var exception = Result__exceptionOrNull_impl_p6xea9(_this__u8e3s4);
    var tmp;
    if (exception == null) {
      // Inline function 'kotlinx.coroutines.toState.<anonymous>' call
      var tmp_0 = _Result___get_value__impl__bjfvqg(_this__u8e3s4);
      var it = (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
      tmp = !(onCancellation == null) ? new CompletedWithCancellation(it, onCancellation) : it;
    } else {
      // Inline function 'kotlinx.coroutines.toState.<anonymous>' call
      tmp = new CompletedExceptionally(exception);
    }
    return tmp;
  }
  function CompletedWithCancellation(result, onCancellation) {
    this.au_1 = result;
    this.bu_1 = onCancellation;
  }
  protoOf(CompletedWithCancellation).toString = function () {
    return 'CompletedWithCancellation(result=' + toString_0(this.au_1) + ', onCancellation=' + this.bu_1 + ')';
  };
  protoOf(CompletedWithCancellation).hashCode = function () {
    var result = this.au_1 == null ? 0 : hashCode(this.au_1);
    result = imul(result, 31) + hashCode(this.bu_1) | 0;
    return result;
  };
  protoOf(CompletedWithCancellation).equals = function (other) {
    if (this === other)
      return true;
    if (!(other instanceof CompletedWithCancellation))
      return false;
    var tmp0_other_with_cast = other instanceof CompletedWithCancellation ? other : THROW_CCE();
    if (!equals(this.au_1, tmp0_other_with_cast.au_1))
      return false;
    if (!equals(this.bu_1, tmp0_other_with_cast.bu_1))
      return false;
    return true;
  };
  function recoverResult(state, uCont) {
    var tmp;
    if (state instanceof CompletedExceptionally) {
      // Inline function 'kotlin.Companion.failure' call
      var exception = recoverStackTrace(state.po_1, uCont);
      tmp = _Result___init__impl__xyqfz8(createFailure(exception));
    } else {
      // Inline function 'kotlin.Companion.success' call
      var value = (state == null ? true : !(state == null)) ? state : THROW_CCE();
      tmp = _Result___init__impl__xyqfz8(value);
    }
    return tmp;
  }
  function CoroutineDispatcher$Key$_init_$lambda_akl8b5(it) {
    return it instanceof CoroutineDispatcher ? it : null;
  }
  function Key() {
    Key_instance_0 = this;
    var tmp = Key_instance;
    AbstractCoroutineContextKey.call(this, tmp, CoroutineDispatcher$Key$_init_$lambda_akl8b5);
  }
  var Key_instance_0;
  function Key_getInstance() {
    if (Key_instance_0 == null)
      new Key();
    return Key_instance_0;
  }
  function CoroutineDispatcher() {
    Key_getInstance();
    AbstractCoroutineContextElement.call(this, Key_instance);
  }
  protoOf(CoroutineDispatcher).du = function (context) {
    return true;
  };
  protoOf(CoroutineDispatcher).fu = function (context, block) {
    return this.eu(context, block);
  };
  protoOf(CoroutineDispatcher).kc = function (continuation) {
    return new DispatchedContinuation(this, continuation);
  };
  protoOf(CoroutineDispatcher).ic = function (continuation) {
    var dispatched = continuation instanceof DispatchedContinuation ? continuation : THROW_CCE();
    dispatched.gu();
  };
  protoOf(CoroutineDispatcher).toString = function () {
    return get_classSimpleName(this) + '@' + get_hexAddress(this);
  };
  function handleCoroutineException(context, exception) {
    try {
      var tmp0_safe_receiver = context.hc(Key_instance_1);
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        tmp0_safe_receiver.hu(context, exception);
        return Unit_instance;
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var t = $p;
        handleUncaughtCoroutineException(context, handlerException(exception, t));
        return Unit_instance;
      } else {
        throw $p;
      }
    }
    handleUncaughtCoroutineException(context, exception);
  }
  function Key_0() {
  }
  var Key_instance_1;
  function Key_getInstance_0() {
    return Key_instance_1;
  }
  function handlerException(originalException, thrownException) {
    if (originalException === thrownException)
      return originalException;
    // Inline function 'kotlin.apply' call
    var this_0 = RuntimeException_init_$Create$('Exception while trying to handle coroutine exception', thrownException);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.handlerException.<anonymous>' call
    addSuppressed(this_0, originalException);
    return this_0;
  }
  function Key_1() {
  }
  var Key_instance_2;
  function Key_getInstance_1() {
    return Key_instance_2;
  }
  function CoroutineScope() {
  }
  function CoroutineScope_0(context) {
    return new ContextScope(!(context.hc(Key_instance_3) == null) ? context : context.vf(Job_0()));
  }
  function coroutineScope(block, $completion) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.coroutineScope.<anonymous>' call
    var coroutine = new ScopeCoroutine($completion.t6(), $completion);
    return startUndispatchedOrReturn(coroutine, coroutine, block);
  }
  function cancel(_this__u8e3s4, cause) {
    cause = cause === VOID ? null : cause;
    var tmp0_elvis_lhs = _this__u8e3s4.jo().hc(Key_instance_3);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = 'Scope cannot be cancelled because it does not have a job: ' + _this__u8e3s4;
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var job = tmp;
    job.sp(cause);
  }
  function get_isActive(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.jo().hc(Key_instance_3);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ko();
    return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
  }
  var CoroutineStart_DEFAULT_instance;
  var CoroutineStart_LAZY_instance;
  var CoroutineStart_ATOMIC_instance;
  var CoroutineStart_UNDISPATCHED_instance;
  var CoroutineStart_entriesInitialized;
  function CoroutineStart_initEntries() {
    if (CoroutineStart_entriesInitialized)
      return Unit_instance;
    CoroutineStart_entriesInitialized = true;
    CoroutineStart_DEFAULT_instance = new CoroutineStart('DEFAULT', 0);
    CoroutineStart_LAZY_instance = new CoroutineStart('LAZY', 1);
    CoroutineStart_ATOMIC_instance = new CoroutineStart('ATOMIC', 2);
    CoroutineStart_UNDISPATCHED_instance = new CoroutineStart('UNDISPATCHED', 3);
  }
  function CoroutineStart(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  protoOf(CoroutineStart).ap = function (block, receiver, completion) {
    var tmp;
    switch (this.t9_1) {
      case 0:
        startCoroutineCancellable(block, receiver, completion);
        tmp = Unit_instance;
        break;
      case 2:
        startCoroutine(block, receiver, completion);
        tmp = Unit_instance;
        break;
      case 3:
        startCoroutineUndispatched(block, receiver, completion);
        tmp = Unit_instance;
        break;
      case 1:
        tmp = Unit_instance;
        break;
      default:
        noWhenBranchMatchedException();
        break;
    }
    return tmp;
  };
  protoOf(CoroutineStart).gq = function () {
    return this === CoroutineStart_LAZY_getInstance();
  };
  function CoroutineStart_DEFAULT_getInstance() {
    CoroutineStart_initEntries();
    return CoroutineStart_DEFAULT_instance;
  }
  function CoroutineStart_LAZY_getInstance() {
    CoroutineStart_initEntries();
    return CoroutineStart_LAZY_instance;
  }
  function CoroutineStart_ATOMIC_getInstance() {
    CoroutineStart_initEntries();
    return CoroutineStart_ATOMIC_instance;
  }
  function CoroutineStart_UNDISPATCHED_getInstance() {
    CoroutineStart_initEntries();
    return CoroutineStart_UNDISPATCHED_instance;
  }
  function Delay() {
  }
  function get_delay(_this__u8e3s4) {
    var tmp = _this__u8e3s4.hc(Key_instance);
    var tmp0_elvis_lhs = (!(tmp == null) ? isInterface(tmp, Delay) : false) ? tmp : null;
    return tmp0_elvis_lhs == null ? get_DefaultDelay() : tmp0_elvis_lhs;
  }
  function delay(timeMillis, $completion) {
    if (timeMillis.z6(new Long(0, 0)) <= 0)
      return Unit_instance;
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    // Inline function 'kotlinx.coroutines.delay.<anonymous>' call
    Companion_getInstance();
    if (timeMillis.z6(new Long(-1, 2147483647)) < 0) {
      get_delay(cancellable.t6()).iu(timeMillis, cancellable);
    }
    return cancellable.mq();
  }
  function DelayWithTimeoutDiagnostics() {
  }
  function delta($this, unconfined) {
    return unconfined ? new Long(0, 1) : new Long(1, 0);
  }
  function EventLoop() {
    CoroutineDispatcher.call(this);
    this.mu_1 = new Long(0, 0);
    this.nu_1 = false;
    this.ou_1 = null;
  }
  protoOf(EventLoop).pu = function () {
    var tmp0_elvis_lhs = this.ou_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var queue = tmp;
    var tmp1_elvis_lhs = queue.vd();
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return false;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var task = tmp_0;
    task.gt();
    return true;
  };
  protoOf(EventLoop).qu = function (task) {
    var tmp0_elvis_lhs = this.ou_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = ArrayDeque_init_$Create$();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.EventLoop.dispatchUnconfined.<anonymous>' call
      this.ou_1 = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var queue = tmp;
    queue.td(task);
  };
  protoOf(EventLoop).ru = function () {
    return this.mu_1.z6(delta(this, true)) >= 0;
  };
  protoOf(EventLoop).su = function () {
    var tmp0_safe_receiver = this.ou_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.u();
    return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
  };
  protoOf(EventLoop).tu = function (unconfined) {
    this.mu_1 = this.mu_1.eb(delta(this, unconfined));
    if (!unconfined)
      this.nu_1 = true;
  };
  protoOf(EventLoop).uu = function (unconfined) {
    this.mu_1 = this.mu_1.fb(delta(this, unconfined));
    if (this.mu_1.z6(new Long(0, 0)) > 0)
      return Unit_instance;
    // Inline function 'kotlinx.coroutines.assert' call
    if (this.nu_1) {
      this.vu();
    }
  };
  protoOf(EventLoop).vu = function () {
  };
  function ThreadLocalEventLoop() {
    ThreadLocalEventLoop_instance = this;
    this.wu_1 = commonThreadLocal(new Symbol('ThreadLocalEventLoop'));
  }
  protoOf(ThreadLocalEventLoop).xu = function () {
    var tmp0_elvis_lhs = this.wu_1.zu();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = createEventLoop();
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.ThreadLocalEventLoop.<get-eventLoop>.<anonymous>' call
      ThreadLocalEventLoop_getInstance().wu_1.av(this_0);
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  var ThreadLocalEventLoop_instance;
  function ThreadLocalEventLoop_getInstance() {
    if (ThreadLocalEventLoop_instance == null)
      new ThreadLocalEventLoop();
    return ThreadLocalEventLoop_instance;
  }
  function CompletionHandlerException(message, cause) {
    RuntimeException_init_$Init$(message, cause, this);
    captureStack(this, CompletionHandlerException);
  }
  function CoroutinesInternalError(message, cause) {
    Error_init_$Init$(message, cause, this);
    captureStack(this, CoroutinesInternalError);
  }
  function Key_2() {
  }
  var Key_instance_3;
  function Key_getInstance_2() {
    return Key_instance_3;
  }
  function Job() {
  }
  function ParentJob() {
  }
  function ChildHandle() {
  }
  function NonDisposableHandle() {
  }
  protoOf(NonDisposableHandle).dp = function () {
    return null;
  };
  protoOf(NonDisposableHandle).or = function () {
  };
  protoOf(NonDisposableHandle).wp = function (cause) {
    return false;
  };
  protoOf(NonDisposableHandle).toString = function () {
    return 'NonDisposableHandle';
  };
  var NonDisposableHandle_instance;
  function NonDisposableHandle_getInstance() {
    return NonDisposableHandle_instance;
  }
  function ensureActive(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.hc(Key_instance_3);
    if (tmp0_safe_receiver == null)
      null;
    else {
      ensureActive_0(tmp0_safe_receiver);
    }
  }
  function invokeOnCompletion(_this__u8e3s4, onCancelling, invokeImmediately, handler) {
    onCancelling = onCancelling === VOID ? false : onCancelling;
    invokeImmediately = invokeImmediately === VOID ? true : invokeImmediately;
    var tmp;
    if (_this__u8e3s4 instanceof JobSupport) {
      tmp = _this__u8e3s4.op(onCancelling, invokeImmediately, handler);
    } else {
      tmp = _this__u8e3s4.np(onCancelling, invokeImmediately, InternalCompletionHandler$invoke$ref(handler));
    }
    return tmp;
  }
  function ensureActive_0(_this__u8e3s4) {
    if (!_this__u8e3s4.ko())
      throw _this__u8e3s4.jp();
  }
  function Job_0(parent) {
    parent = parent === VOID ? null : parent;
    return new JobImpl(parent);
  }
  function get_job(_this__u8e3s4) {
    var tmp0_elvis_lhs = _this__u8e3s4.hc(Key_instance_3);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      var message = "Current context doesn't contain Job in it: " + _this__u8e3s4;
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function cancelAndJoin(_this__u8e3s4, $completion) {
    _this__u8e3s4.tp();
    return _this__u8e3s4.pp($completion);
  }
  function get_isActive_0(_this__u8e3s4) {
    var tmp0_safe_receiver = _this__u8e3s4.hc(Key_instance_3);
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.ko();
    return tmp1_elvis_lhs == null ? true : tmp1_elvis_lhs;
  }
  function disposeOnCompletion(_this__u8e3s4, handle) {
    return invokeOnCompletion(_this__u8e3s4, VOID, VOID, new DisposeOnCompletion(handle));
  }
  function cancel_0(_this__u8e3s4, message, cause) {
    cause = cause === VOID ? null : cause;
    return _this__u8e3s4.sp(CancellationException_init_$Create$_0(message, cause));
  }
  function InternalCompletionHandler$invoke$ref($boundThis) {
    var l = function (p0) {
      $boundThis.nr(p0);
      return Unit_instance;
    };
    l.callableName = 'invoke';
    return l;
  }
  function get_COMPLETING_ALREADY() {
    _init_properties_JobSupport_kt__68f172();
    return COMPLETING_ALREADY;
  }
  var COMPLETING_ALREADY;
  function get_COMPLETING_WAITING_CHILDREN() {
    _init_properties_JobSupport_kt__68f172();
    return COMPLETING_WAITING_CHILDREN;
  }
  var COMPLETING_WAITING_CHILDREN;
  function get_COMPLETING_RETRY() {
    _init_properties_JobSupport_kt__68f172();
    return COMPLETING_RETRY;
  }
  var COMPLETING_RETRY;
  function get_TOO_LATE_TO_CANCEL() {
    _init_properties_JobSupport_kt__68f172();
    return TOO_LATE_TO_CANCEL;
  }
  var TOO_LATE_TO_CANCEL;
  function get_SEALED() {
    _init_properties_JobSupport_kt__68f172();
    return SEALED;
  }
  var SEALED;
  function get_EMPTY_NEW() {
    _init_properties_JobSupport_kt__68f172();
    return EMPTY_NEW;
  }
  var EMPTY_NEW;
  function get_EMPTY_ACTIVE() {
    _init_properties_JobSupport_kt__68f172();
    return EMPTY_ACTIVE;
  }
  var EMPTY_ACTIVE;
  function Empty(isActive) {
    this.cv_1 = isActive;
  }
  protoOf(Empty).ko = function () {
    return this.cv_1;
  };
  protoOf(Empty).dv = function () {
    return null;
  };
  protoOf(Empty).toString = function () {
    return 'Empty{' + (this.cv_1 ? 'Active' : 'New') + '}';
  };
  function Incomplete() {
  }
  function NodeList() {
    LinkedListHead.call(this);
  }
  protoOf(NodeList).ko = function () {
    return true;
  };
  protoOf(NodeList).dv = function () {
    return this;
  };
  protoOf(NodeList).hv = function (state) {
    // Inline function 'kotlin.text.buildString' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlin.apply' call
    var this_0 = StringBuilder_init_$Create$();
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.NodeList.getString.<anonymous>' call
    this_0.y5('List{');
    this_0.y5(state);
    this_0.y5('}[');
    var first = true;
    // Inline function 'kotlinx.coroutines.internal.LinkedListHead.forEach' call
    var cur = this.iv_1;
    while (!equals(cur, this)) {
      if (cur instanceof JobNode) {
        // Inline function 'kotlinx.coroutines.NodeList.getString.<anonymous>.<anonymous>' call
        var node = cur;
        if (first)
          first = false;
        else {
          this_0.y5(', ');
        }
        this_0.x5(node);
      }
      cur = cur.iv_1;
    }
    this_0.y5(']');
    return this_0.toString();
  };
  protoOf(NodeList).toString = function () {
    return get_DEBUG() ? this.hv('Active') : protoOf(LinkedListHead).toString.call(this);
  };
  function JobNode() {
    LinkedListNode.call(this);
  }
  protoOf(JobNode).vv = function () {
    var tmp = this.uv_1;
    if (!(tmp == null))
      return tmp;
    else {
      throwUninitializedPropertyAccessException('job');
    }
  };
  protoOf(JobNode).ko = function () {
    return true;
  };
  protoOf(JobNode).dv = function () {
    return null;
  };
  protoOf(JobNode).or = function () {
    return this.vv().qp(this);
  };
  protoOf(JobNode).toString = function () {
    return get_classSimpleName(this) + '@' + get_hexAddress(this) + '[job@' + get_hexAddress(this.vv()) + ']';
  };
  function _set_exceptionsHolder__tqm22h($this, value) {
    $this.aw_1.kotlinx$atomicfu$value = value;
  }
  function _get_exceptionsHolder__nhszp($this) {
    return $this.aw_1.kotlinx$atomicfu$value;
  }
  function allocateList($this) {
    return ArrayList_init_$Create$(4);
  }
  function finalizeFinishingState($this, state, proposedUpdate) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp0_safe_receiver = proposedUpdate instanceof CompletedExceptionally ? proposedUpdate : null;
    var proposedException = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.po_1;
    var wasCancelling;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    // Inline function 'kotlinx.coroutines.JobSupport.finalizeFinishingState.<anonymous>' call
    wasCancelling = state.bw();
    var exceptions = state.cw(proposedException);
    var finalCause = getFinalRootCause($this, state, exceptions);
    if (!(finalCause == null)) {
      addSuppressedExceptions($this, finalCause, exceptions);
    }
    var finalException = finalCause;
    var finalState = finalException == null ? proposedUpdate : finalException === proposedException ? proposedUpdate : new CompletedExceptionally(finalException);
    if (!(finalException == null)) {
      var handled = cancelParent($this, finalException) ? true : $this.eq(finalException);
      if (handled) {
        (finalState instanceof CompletedExceptionally ? finalState : THROW_CCE()).ns();
      }
    }
    if (!wasCancelling) {
      $this.bq(finalException);
    }
    $this.oo(finalState);
    var casSuccess = $this.do_1.atomicfu$compareAndSet(state, boxIncomplete(finalState));
    // Inline function 'kotlinx.coroutines.assert' call
    completeStateFinalization($this, state, finalState);
    return finalState;
  }
  function getFinalRootCause($this, state, exceptions) {
    if (exceptions.u()) {
      if (state.bw()) {
        // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
        return new JobCancellationException(null == null ? $this.no() : null, null, $this);
      }
      return null;
    }
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = exceptions.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        // Inline function 'kotlinx.coroutines.JobSupport.getFinalRootCause.<anonymous>' call
        if (!(element instanceof CancellationException)) {
          tmp$ret$2 = element;
          break $l$block;
        }
      }
      tmp$ret$2 = null;
    }
    var firstNonCancellation = tmp$ret$2;
    if (!(firstNonCancellation == null))
      return firstNonCancellation;
    var first = exceptions.n(0);
    if (first instanceof TimeoutCancellationException) {
      var tmp$ret$4;
      $l$block_0: {
        // Inline function 'kotlin.collections.firstOrNull' call
        var tmp0_iterator_0 = exceptions.o();
        while (tmp0_iterator_0.d1()) {
          var element_0 = tmp0_iterator_0.f1();
          // Inline function 'kotlinx.coroutines.JobSupport.getFinalRootCause.<anonymous>' call
          var tmp;
          if (!(element_0 === first)) {
            tmp = element_0 instanceof TimeoutCancellationException;
          } else {
            tmp = false;
          }
          if (tmp) {
            tmp$ret$4 = element_0;
            break $l$block_0;
          }
        }
        tmp$ret$4 = null;
      }
      var detailedTimeoutException = tmp$ret$4;
      if (!(detailedTimeoutException == null))
        return detailedTimeoutException;
    }
    return first;
  }
  function addSuppressedExceptions($this, rootCause, exceptions) {
    if (exceptions.m() <= 1)
      return Unit_instance;
    var seenExceptions = identitySet(exceptions.m());
    var unwrappedCause = unwrap(rootCause);
    var tmp0_iterator = exceptions.o();
    while (tmp0_iterator.d1()) {
      var exception = tmp0_iterator.f1();
      var unwrapped = unwrap(exception);
      var tmp;
      var tmp_0;
      if (!(unwrapped === rootCause) ? !(unwrapped === unwrappedCause) : false) {
        tmp_0 = !(unwrapped instanceof CancellationException);
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp = seenExceptions.a1(unwrapped);
      } else {
        tmp = false;
      }
      if (tmp) {
        addSuppressed(rootCause, unwrapped);
      }
    }
  }
  function tryFinalizeSimpleState($this, state, update) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    if (!$this.do_1.atomicfu$compareAndSet(state, boxIncomplete(update)))
      return false;
    $this.bq(null);
    $this.oo(update);
    completeStateFinalization($this, state, update);
    return true;
  }
  function completeStateFinalization($this, state, update) {
    var tmp0_safe_receiver = $this.cp();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      tmp0_safe_receiver.or();
      $this.bp(NonDisposableHandle_instance);
    }
    var tmp1_safe_receiver = update instanceof CompletedExceptionally ? update : null;
    var cause = tmp1_safe_receiver == null ? null : tmp1_safe_receiver.po_1;
    if (state instanceof JobNode) {
      try {
        state.nr(cause);
      } catch ($p) {
        if ($p instanceof Error) {
          var ex = $p;
          $this.vo(new CompletionHandlerException('Exception in completion handler ' + state + ' for ' + $this, ex));
        } else {
          throw $p;
        }
      }
    } else {
      var tmp2_safe_receiver = state.dv();
      if (tmp2_safe_receiver == null)
        null;
      else {
        notifyCompletion(tmp2_safe_receiver, $this, cause);
      }
    }
  }
  function notifyCancelling($this, list, cause) {
    $this.bq(cause);
    // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers' call
    var exception = null;
    // Inline function 'kotlinx.coroutines.internal.LinkedListHead.forEach' call
    var cur = list.iv_1;
    while (!equals(cur, list)) {
      if (cur instanceof JobCancellingNode) {
        // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers.<anonymous>' call
        var node = cur;
        try {
          node.nr(cause);
        } catch ($p) {
          if ($p instanceof Error) {
            var ex = $p;
            var tmp0_safe_receiver = exception;
            var tmp;
            if (tmp0_safe_receiver == null) {
              tmp = null;
            } else {
              // Inline function 'kotlin.apply' call
              // Inline function 'kotlin.contracts.contract' call
              // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers.<anonymous>.<anonymous>' call
              addSuppressed(tmp0_safe_receiver, ex);
              tmp = tmp0_safe_receiver;
            }
            if (tmp == null) {
              // Inline function 'kotlin.run' call
              // Inline function 'kotlin.contracts.contract' call
              exception = new CompletionHandlerException('Exception in completion handler ' + node + ' for ' + $this, ex);
            }
          } else {
            throw $p;
          }
        }
      }
      cur = cur.iv_1;
    }
    var tmp0_safe_receiver_0 = exception;
    if (tmp0_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      $this.vo(tmp0_safe_receiver_0);
    }
    cancelParent($this, cause);
  }
  function cancelParent($this, cause) {
    if ($this.cq())
      return true;
    var isCancellation = cause instanceof CancellationException;
    var parent = $this.cp();
    if (parent === null ? true : parent === NonDisposableHandle_instance) {
      return isCancellation;
    }
    return parent.wp(cause) ? true : isCancellation;
  }
  function notifyCompletion(_this__u8e3s4, $this, cause) {
    var exception = null;
    // Inline function 'kotlinx.coroutines.internal.LinkedListHead.forEach' call
    var cur = _this__u8e3s4.iv_1;
    while (!equals(cur, _this__u8e3s4)) {
      if (cur instanceof JobNode) {
        // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers.<anonymous>' call
        var node = cur;
        try {
          node.nr(cause);
        } catch ($p) {
          if ($p instanceof Error) {
            var ex = $p;
            var tmp0_safe_receiver = exception;
            var tmp;
            if (tmp0_safe_receiver == null) {
              tmp = null;
            } else {
              // Inline function 'kotlin.apply' call
              // Inline function 'kotlin.contracts.contract' call
              // Inline function 'kotlinx.coroutines.JobSupport.notifyHandlers.<anonymous>.<anonymous>' call
              addSuppressed(tmp0_safe_receiver, ex);
              tmp = tmp0_safe_receiver;
            }
            if (tmp == null) {
              // Inline function 'kotlin.run' call
              // Inline function 'kotlin.contracts.contract' call
              exception = new CompletionHandlerException('Exception in completion handler ' + node + ' for ' + $this, ex);
            }
          } else {
            throw $p;
          }
        }
      }
      cur = cur.iv_1;
    }
    var tmp0_safe_receiver_0 = exception;
    if (tmp0_safe_receiver_0 == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      $this.vo(tmp0_safe_receiver_0);
    }
    return Unit_instance;
  }
  function startInternal($this, state) {
    if (state instanceof Empty) {
      if (state.cv_1)
        return 0;
      if (!$this.do_1.atomicfu$compareAndSet(state, get_EMPTY_ACTIVE()))
        return -1;
      $this.ip();
      return 1;
    } else {
      if (state instanceof InactiveNodeList) {
        if (!$this.do_1.atomicfu$compareAndSet(state, state.dw_1))
          return -1;
        $this.ip();
        return 1;
      } else {
        return 0;
      }
    }
  }
  function makeNode($this, handler, onCancelling) {
    var tmp;
    if (onCancelling) {
      var tmp0_elvis_lhs = handler instanceof JobCancellingNode ? handler : null;
      tmp = tmp0_elvis_lhs == null ? new InvokeOnCancelling(handler) : tmp0_elvis_lhs;
    } else {
      var tmp1_safe_receiver = handler instanceof JobNode ? handler : null;
      var tmp_0;
      if (tmp1_safe_receiver == null) {
        tmp_0 = null;
      } else {
        // Inline function 'kotlin.also' call
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'kotlinx.coroutines.JobSupport.makeNode.<anonymous>' call
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_0 = tmp1_safe_receiver;
      }
      var tmp2_elvis_lhs = tmp_0;
      tmp = tmp2_elvis_lhs == null ? new InvokeOnCompletion(handler) : tmp2_elvis_lhs;
    }
    var node = tmp;
    node.uv_1 = $this;
    return node;
  }
  function addLastAtomic($this, expect, list, node) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.coroutines.internal.LinkedListNode.addLastIf' call
      // Inline function 'kotlinx.coroutines.JobSupport.addLastAtomic.<anonymous>' call
      if (!($this.ep() === expect)) {
        tmp$ret$1 = false;
        break $l$block;
      }
      list.pv(node);
      tmp$ret$1 = true;
    }
    return tmp$ret$1;
  }
  function promoteEmptyToNodeList($this, state) {
    var list = new NodeList();
    var update = state.cv_1 ? list : new InactiveNodeList(list);
    $this.do_1.atomicfu$compareAndSet(state, update);
  }
  function promoteSingleToNodeList($this, state) {
    state.wv(new NodeList());
    // Inline function 'kotlinx.coroutines.internal.LinkedListNode.nextNode' call
    var list = state.iv_1;
    $this.do_1.atomicfu$compareAndSet(state, list);
  }
  function joinInternal($this) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      // Inline function 'kotlinx.coroutines.JobSupport.joinInternal.<anonymous>' call
      var state = $this.ep();
      if (!(!(state == null) ? isInterface(state, Incomplete) : false))
        return false;
      if (startInternal($this, state) >= 0)
        return true;
    }
  }
  function joinSuspend($this, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    // Inline function 'kotlinx.coroutines.JobSupport.joinSuspend.<anonymous>' call
    disposeOnCancellation(cancellable, invokeOnCompletion($this, VOID, VOID, new ResumeOnCompletion(cancellable)));
    return cancellable.mq();
  }
  function cancelMakeCompleting($this, cause) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      // Inline function 'kotlinx.coroutines.JobSupport.cancelMakeCompleting.<anonymous>' call
      var state = $this.ep();
      var tmp;
      if (!(!(state == null) ? isInterface(state, Incomplete) : false)) {
        tmp = true;
      } else {
        var tmp_0;
        if (state instanceof Finishing) {
          tmp_0 = state.ew();
        } else {
          tmp_0 = false;
        }
        tmp = tmp_0;
      }
      if (tmp) {
        return get_COMPLETING_ALREADY();
      }
      var proposedUpdate = new CompletedExceptionally(createCauseException($this, cause));
      var finalState = tryMakeCompleting($this, state, proposedUpdate);
      if (!(finalState === get_COMPLETING_RETRY()))
        return finalState;
    }
  }
  function createCauseException($this, cause) {
    var tmp;
    if (cause == null ? true : cause instanceof Error) {
      var tmp_0;
      if (cause == null) {
        // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
        tmp_0 = new JobCancellationException(null == null ? $this.no() : null, null, $this);
      } else {
        tmp_0 = cause;
      }
      tmp = tmp_0;
    } else {
      tmp = ((!(cause == null) ? isInterface(cause, ParentJob) : false) ? cause : THROW_CCE()).zp();
    }
    return tmp;
  }
  function makeCancelling($this, cause) {
    var causeExceptionCache = null;
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.JobSupport.makeCancelling.<anonymous>' call
        var state = $this.ep();
        if (state instanceof Finishing) {
          // Inline function 'kotlinx.coroutines.internal.synchronized' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
          // Inline function 'kotlinx.coroutines.JobSupport.makeCancelling.<anonymous>.<anonymous>' call
          if (state.fw())
            return get_TOO_LATE_TO_CANCEL();
          var wasCancelling = state.bw();
          if (!(cause == null) ? true : !wasCancelling) {
            var tmp0_elvis_lhs = causeExceptionCache;
            var tmp;
            if (tmp0_elvis_lhs == null) {
              // Inline function 'kotlin.also' call
              var this_0 = createCauseException($this, cause);
              // Inline function 'kotlin.contracts.contract' call
              // Inline function 'kotlinx.coroutines.JobSupport.makeCancelling.<anonymous>.<anonymous>.<anonymous>' call
              causeExceptionCache = this_0;
              tmp = this_0;
            } else {
              tmp = tmp0_elvis_lhs;
            }
            var causeException = tmp;
            state.gw(causeException);
          }
          // Inline function 'kotlin.takeIf' call
          var this_1 = state.hw();
          // Inline function 'kotlin.contracts.contract' call
          var tmp_0;
          // Inline function 'kotlinx.coroutines.JobSupport.makeCancelling.<anonymous>.<anonymous>.<anonymous>' call
          if (!wasCancelling) {
            tmp_0 = this_1;
          } else {
            tmp_0 = null;
          }
          var notifyRootCause = tmp_0;
          if (notifyRootCause == null)
            null;
          else {
            // Inline function 'kotlin.let' call
            // Inline function 'kotlin.contracts.contract' call
            notifyCancelling($this, state.xv_1, notifyRootCause);
          }
          return get_COMPLETING_ALREADY();
        } else {
          if (!(state == null) ? isInterface(state, Incomplete) : false) {
            var tmp2_elvis_lhs = causeExceptionCache;
            var tmp_1;
            if (tmp2_elvis_lhs == null) {
              // Inline function 'kotlin.also' call
              var this_2 = createCauseException($this, cause);
              // Inline function 'kotlin.contracts.contract' call
              // Inline function 'kotlinx.coroutines.JobSupport.makeCancelling.<anonymous>.<anonymous>' call
              causeExceptionCache = this_2;
              tmp_1 = this_2;
            } else {
              tmp_1 = tmp2_elvis_lhs;
            }
            var causeException_0 = tmp_1;
            if (state.ko()) {
              if (tryMakeCancelling($this, state, causeException_0))
                return get_COMPLETING_ALREADY();
            } else {
              var finalState = tryMakeCompleting($this, state, new CompletedExceptionally(causeException_0));
              if (finalState === get_COMPLETING_ALREADY()) {
                // Inline function 'kotlin.error' call
                var message = 'Cannot happen in ' + toString_0(state);
                throw IllegalStateException_init_$Create$(toString(message));
              } else if (finalState === get_COMPLETING_RETRY()) {
                break $l$block;
              } else
                return finalState;
            }
          } else {
            return get_TOO_LATE_TO_CANCEL();
          }
        }
      }
    }
  }
  function getOrPromoteCancellingList($this, state) {
    var tmp1_elvis_lhs = state.dv();
    var tmp;
    if (tmp1_elvis_lhs == null) {
      var tmp_0;
      if (state instanceof Empty) {
        tmp_0 = new NodeList();
      } else {
        if (state instanceof JobNode) {
          promoteSingleToNodeList($this, state);
          tmp_0 = null;
        } else {
          var message = 'State should have list: ' + state;
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
      tmp = tmp_0;
    } else {
      tmp = tmp1_elvis_lhs;
    }
    return tmp;
  }
  function tryMakeCancelling($this, state, rootCause) {
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp0_elvis_lhs = getOrPromoteCancellingList($this, state);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var list = tmp;
    var cancelling = new Finishing(list, false, rootCause);
    if (!$this.do_1.atomicfu$compareAndSet(state, cancelling))
      return false;
    notifyCancelling($this, list, rootCause);
    return true;
  }
  function tryMakeCompleting($this, state, proposedUpdate) {
    if (!(!(state == null) ? isInterface(state, Incomplete) : false))
      return get_COMPLETING_ALREADY();
    var tmp;
    var tmp_0;
    var tmp_1;
    if (state instanceof Empty) {
      tmp_1 = true;
    } else {
      tmp_1 = state instanceof JobNode;
    }
    if (tmp_1) {
      tmp_0 = !(state instanceof ChildHandleNode);
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = !(proposedUpdate instanceof CompletedExceptionally);
    } else {
      tmp = false;
    }
    if (tmp) {
      if (tryFinalizeSimpleState($this, state, proposedUpdate)) {
        return proposedUpdate;
      }
      return get_COMPLETING_RETRY();
    }
    return tryMakeCompletingSlowPath($this, state, proposedUpdate);
  }
  function tryMakeCompletingSlowPath($this, state, proposedUpdate) {
    var tmp0_elvis_lhs = getOrPromoteCancellingList($this, state);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return get_COMPLETING_RETRY();
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var list = tmp;
    var tmp1_elvis_lhs = state instanceof Finishing ? state : null;
    var finishing = tmp1_elvis_lhs == null ? new Finishing(list, false, null) : tmp1_elvis_lhs;
    var notifyRootCause = null;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    if (finishing.ew())
      return get_COMPLETING_ALREADY();
    finishing.iw(true);
    if (!(finishing === state)) {
      if (!$this.do_1.atomicfu$compareAndSet(state, finishing))
        return get_COMPLETING_RETRY();
    }
    // Inline function 'kotlinx.coroutines.assert' call
    var wasCancelling = finishing.bw();
    var tmp0_safe_receiver = proposedUpdate instanceof CompletedExceptionally ? proposedUpdate : null;
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      finishing.gw(tmp0_safe_receiver.po_1);
    }
    // Inline function 'kotlin.takeIf' call
    var this_0 = finishing.hw();
    // Inline function 'kotlin.contracts.contract' call
    var tmp_0;
    // Inline function 'kotlinx.coroutines.JobSupport.tryMakeCompletingSlowPath.<anonymous>.<anonymous>' call
    if (!wasCancelling) {
      tmp_0 = this_0;
    } else {
      tmp_0 = null;
    }
    notifyRootCause = tmp_0;
    var tmp2_safe_receiver = notifyRootCause;
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      notifyCancelling($this, list, tmp2_safe_receiver);
    }
    var child = firstChild($this, state);
    if (!(child == null) ? tryWaitForChild($this, finishing, child, proposedUpdate) : false)
      return get_COMPLETING_WAITING_CHILDREN();
    return finalizeFinishingState($this, finishing, proposedUpdate);
  }
  function _get_exceptionOrNull__b3j7js(_this__u8e3s4, $this) {
    var tmp0_safe_receiver = _this__u8e3s4 instanceof CompletedExceptionally ? _this__u8e3s4 : null;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.po_1;
  }
  function firstChild($this, state) {
    var tmp1_elvis_lhs = state instanceof ChildHandleNode ? state : null;
    var tmp;
    if (tmp1_elvis_lhs == null) {
      var tmp0_safe_receiver = state.dv();
      tmp = tmp0_safe_receiver == null ? null : nextChild(tmp0_safe_receiver, $this);
    } else {
      tmp = tmp1_elvis_lhs;
    }
    return tmp;
  }
  function tryWaitForChild($this, state, child, proposedUpdate) {
    var $this_0 = $this;
    var state_0 = state;
    var child_0 = child;
    var proposedUpdate_0 = proposedUpdate;
    $l$1: do {
      $l$0: do {
        var handle = invokeOnCompletion(child_0.nw_1, VOID, false, new ChildCompletion($this_0, state_0, child_0, proposedUpdate_0));
        if (!(handle === NonDisposableHandle_instance))
          return true;
        var tmp0_elvis_lhs = nextChild(child_0, $this_0);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          return false;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var nextChild_0 = tmp;
        $this_0 = $this_0;
        state_0 = state_0;
        child_0 = nextChild_0;
        proposedUpdate_0 = proposedUpdate_0;
        continue $l$0;
      }
       while (false);
    }
     while (true);
  }
  function continueCompleting($this, state, lastChild, proposedUpdate) {
    // Inline function 'kotlinx.coroutines.assert' call
    var waitChild = nextChild(lastChild, $this);
    if (!(waitChild == null) ? tryWaitForChild($this, state, waitChild, proposedUpdate) : false)
      return Unit_instance;
    var finalState = finalizeFinishingState($this, state, proposedUpdate);
    $this.uo(finalState);
  }
  function nextChild(_this__u8e3s4, $this) {
    var cur = _this__u8e3s4;
    $l$loop: while (true) {
      // Inline function 'kotlinx.coroutines.internal.LinkedListNode.isRemoved' call
      if (!cur.kv_1) {
        break $l$loop;
      }
      // Inline function 'kotlinx.coroutines.internal.LinkedListNode.prevNode' call
      cur = cur.jv_1;
    }
    $l$loop_0: while (true) {
      // Inline function 'kotlinx.coroutines.internal.LinkedListNode.nextNode' call
      cur = cur.iv_1;
      // Inline function 'kotlinx.coroutines.internal.LinkedListNode.isRemoved' call
      if (cur.kv_1)
        continue $l$loop_0;
      if (cur instanceof ChildHandleNode)
        return cur;
      if (cur instanceof NodeList)
        return null;
    }
  }
  function stateString($this, state) {
    var tmp;
    if (state instanceof Finishing) {
      tmp = state.bw() ? 'Cancelling' : state.ew() ? 'Completing' : 'Active';
    } else {
      if (!(state == null) ? isInterface(state, Incomplete) : false) {
        tmp = state.ko() ? 'Active' : 'New';
      } else {
        if (state instanceof CompletedExceptionally) {
          tmp = 'Cancelled';
        } else {
          tmp = 'Completed';
        }
      }
    }
    return tmp;
  }
  function Finishing(list, isCompleting, rootCause) {
    SynchronizedObject.call(this);
    this.xv_1 = list;
    this.yv_1 = atomic$boolean$1(isCompleting);
    this.zv_1 = atomic$ref$1(rootCause);
    this.aw_1 = atomic$ref$1(null);
  }
  protoOf(Finishing).dv = function () {
    return this.xv_1;
  };
  protoOf(Finishing).iw = function (value) {
    this.yv_1.kotlinx$atomicfu$value = value;
  };
  protoOf(Finishing).ew = function () {
    return this.yv_1.kotlinx$atomicfu$value;
  };
  protoOf(Finishing).ow = function (value) {
    this.zv_1.kotlinx$atomicfu$value = value;
  };
  protoOf(Finishing).hw = function () {
    return this.zv_1.kotlinx$atomicfu$value;
  };
  protoOf(Finishing).fw = function () {
    return _get_exceptionsHolder__nhszp(this) === get_SEALED();
  };
  protoOf(Finishing).bw = function () {
    return !(this.hw() == null);
  };
  protoOf(Finishing).ko = function () {
    return this.hw() == null;
  };
  protoOf(Finishing).cw = function (proposedException) {
    var eh = _get_exceptionsHolder__nhszp(this);
    var tmp;
    if (eh == null) {
      tmp = allocateList(this);
    } else {
      if (eh instanceof Error) {
        // Inline function 'kotlin.also' call
        var this_0 = allocateList(this);
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'kotlinx.coroutines.Finishing.sealLocked.<anonymous>' call
        this_0.a1(eh);
        tmp = this_0;
      } else {
        if (eh instanceof ArrayList) {
          tmp = eh instanceof ArrayList ? eh : THROW_CCE();
        } else {
          var message = 'State is ' + toString_0(eh);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    var list = tmp;
    var rootCause = this.hw();
    if (rootCause == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      list.a2(0, rootCause);
    }
    if (!(proposedException == null) ? !equals(proposedException, rootCause) : false) {
      list.a1(proposedException);
    }
    _set_exceptionsHolder__tqm22h(this, get_SEALED());
    return list;
  };
  protoOf(Finishing).gw = function (exception) {
    var rootCause = this.hw();
    if (rootCause == null) {
      this.ow(exception);
      return Unit_instance;
    }
    if (exception === rootCause)
      return Unit_instance;
    var eh = _get_exceptionsHolder__nhszp(this);
    if (eh == null) {
      _set_exceptionsHolder__tqm22h(this, exception);
    } else {
      if (eh instanceof Error) {
        if (exception === eh)
          return Unit_instance;
        // Inline function 'kotlin.apply' call
        var this_0 = allocateList(this);
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'kotlinx.coroutines.Finishing.addExceptionLocked.<anonymous>' call
        this_0.a1(eh);
        this_0.a1(exception);
        _set_exceptionsHolder__tqm22h(this, this_0);
      } else {
        if (eh instanceof ArrayList) {
          (eh instanceof ArrayList ? eh : THROW_CCE()).a1(exception);
        } else {
          var message = 'State is ' + toString_0(eh);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
  };
  protoOf(Finishing).toString = function () {
    return 'Finishing[cancelling=' + this.bw() + ', completing=' + this.ew() + ', rootCause=' + this.hw() + ', exceptions=' + toString_0(_get_exceptionsHolder__nhszp(this)) + ', list=' + this.xv_1 + ']';
  };
  function ChildCompletion(parent, state, child, proposedUpdate) {
    JobNode.call(this);
    this.tw_1 = parent;
    this.uw_1 = state;
    this.vw_1 = child;
    this.ww_1 = proposedUpdate;
  }
  protoOf(ChildCompletion).nr = function (cause) {
    continueCompleting(this.tw_1, this.uw_1, this.vw_1, this.ww_1);
  };
  function AwaitContinuation(delegate, job) {
    CancellableContinuationImpl.call(this, delegate, get_MODE_CANCELLABLE());
    this.dx_1 = job;
  }
  protoOf(AwaitContinuation).at = function (parent) {
    var state = this.dx_1.ep();
    if (state instanceof Finishing) {
      var tmp0_safe_receiver = state.hw();
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        return tmp0_safe_receiver;
      }
    }
    if (state instanceof CompletedExceptionally)
      return state.po_1;
    return parent.jp();
  };
  protoOf(AwaitContinuation).wo = function () {
    return 'AwaitContinuation';
  };
  function awaitSuspend($this, $completion) {
    // Inline function 'kotlinx.coroutines.JobSupport.awaitSuspend.<anonymous>' call
    var cont = new AwaitContinuation(intercepted($completion), $this);
    cont.vs();
    disposeOnCancellation(cont, invokeOnCompletion($this, VOID, VOID, new ResumeAwaitOnCompletion(cont)));
    return cont.mq();
  }
  function JobSupport$_get_children_$slambda_k839f8(this$0, resultContinuation) {
    this.mx_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(JobSupport$_get_children_$slambda_k839f8).wx = function ($this$sequence, $completion) {
    var tmp = this.xx($this$sequence, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(JobSupport$_get_children_$slambda_k839f8).yc = function (p1, $completion) {
    return this.wx(p1 instanceof SequenceScope ? p1 : THROW_CCE(), $completion);
  };
  protoOf(JobSupport$_get_children_$slambda_k839f8).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 8;
            this.ox_1 = this.mx_1.ep();
            var tmp_0 = this.ox_1;
            if (tmp_0 instanceof ChildHandleNode) {
              this.ac_1 = 6;
              suspendResult = this.nx_1.af(this.ox_1.nw_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              var tmp_1 = this.ox_1;
              if (!(tmp_1 == null) ? isInterface(tmp_1, Incomplete) : false) {
                this.px_1 = this.ox_1.dv();
                if (this.px_1 == null) {
                  this.qx_1 = null;
                  this.ac_1 = 5;
                  continue $sm;
                } else {
                  var tmp_2 = this;
                  tmp_2.rx_1 = this.px_1;
                  var tmp_3 = this;
                  tmp_3.sx_1 = this.rx_1;
                  var tmp_4 = this;
                  tmp_4.tx_1 = this.sx_1;
                  this.ux_1 = this.tx_1.iv_1;
                  this.ac_1 = 1;
                  continue $sm;
                }
              } else {
                this.ac_1 = 7;
                continue $sm;
              }
            }

          case 1:
            if (!!equals(this.ux_1, this.tx_1)) {
              this.ac_1 = 4;
              continue $sm;
            }

            var tmp_5 = this.ux_1;
            if (tmp_5 instanceof ChildHandleNode) {
              var tmp_6 = this;
              tmp_6.vx_1 = this.ux_1;
              this.ac_1 = 2;
              suspendResult = this.nx_1.af(this.vx_1.nw_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

          case 2:
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.ux_1 = this.ux_1.iv_1;
            this.ac_1 = 1;
            continue $sm;
          case 4:
            this.qx_1 = Unit_instance;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            this.ac_1 = 7;
            continue $sm;
          case 6:
            this.ac_1 = 7;
            continue $sm;
          case 7:
            return Unit_instance;
          case 8:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 8) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  protoOf(JobSupport$_get_children_$slambda_k839f8).xx = function ($this$sequence, completion) {
    var i = new JobSupport$_get_children_$slambda_k839f8(this.mx_1, completion);
    i.nx_1 = $this$sequence;
    return i;
  };
  function JobSupport$_get_children_$slambda_k839f8_0(this$0, resultContinuation) {
    var i = new JobSupport$_get_children_$slambda_k839f8(this$0, resultContinuation);
    var l = function ($this$sequence, $completion) {
      return i.wx($this$sequence, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function JobSupport(active) {
    this.do_1 = atomic$ref$1(active ? get_EMPTY_ACTIVE() : get_EMPTY_NEW());
    this.eo_1 = atomic$ref$1(null);
  }
  protoOf(JobSupport).r2 = function () {
    return Key_instance_3;
  };
  protoOf(JobSupport).bp = function (value) {
    this.eo_1.kotlinx$atomicfu$value = value;
  };
  protoOf(JobSupport).cp = function () {
    return this.eo_1.kotlinx$atomicfu$value;
  };
  protoOf(JobSupport).dp = function () {
    var tmp0_safe_receiver = this.cp();
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.dp();
  };
  protoOf(JobSupport).fo = function (parent) {
    // Inline function 'kotlinx.coroutines.assert' call
    if (parent == null) {
      this.bp(NonDisposableHandle_instance);
      return Unit_instance;
    }
    parent.hp();
    var handle = parent.aq(this);
    this.bp(handle);
    if (this.fp()) {
      handle.or();
      this.bp(NonDisposableHandle_instance);
    }
  };
  protoOf(JobSupport).ep = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.do_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.JobSupport.<get-state>.<anonymous>' call
      var state = this_0.kotlinx$atomicfu$value;
      if (!(state instanceof OpDescriptor))
        return state;
      state.yx(this);
    }
  };
  protoOf(JobSupport).ko = function () {
    var state = this.ep();
    var tmp;
    if (!(state == null) ? isInterface(state, Incomplete) : false) {
      tmp = state.ko();
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(JobSupport).fp = function () {
    var tmp = this.ep();
    return !(!(tmp == null) ? isInterface(tmp, Incomplete) : false);
  };
  protoOf(JobSupport).gp = function () {
    var state = this.ep();
    var tmp;
    if (state instanceof CompletedExceptionally) {
      tmp = true;
    } else {
      var tmp_0;
      if (state instanceof Finishing) {
        tmp_0 = state.bw();
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(JobSupport).hp = function () {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      // Inline function 'kotlinx.coroutines.JobSupport.start.<anonymous>' call
      var state = this.ep();
      var tmp0_subject = startInternal(this, state);
      if (tmp0_subject === 0)
        return false;
      else if (tmp0_subject === 1)
        return true;
    }
  };
  protoOf(JobSupport).ip = function () {
  };
  protoOf(JobSupport).jp = function () {
    var state = this.ep();
    var tmp;
    if (state instanceof Finishing) {
      var tmp0_safe_receiver = state.hw();
      var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : this.kp(tmp0_safe_receiver, get_classSimpleName(this) + ' is cancelling');
      var tmp_0;
      if (tmp1_elvis_lhs == null) {
        var message = 'Job is still new or active: ' + this;
        throw IllegalStateException_init_$Create$(toString(message));
      } else {
        tmp_0 = tmp1_elvis_lhs;
      }
      tmp = tmp_0;
    } else {
      if (!(state == null) ? isInterface(state, Incomplete) : false) {
        var message_0 = 'Job is still new or active: ' + this;
        throw IllegalStateException_init_$Create$(toString(message_0));
      } else {
        if (state instanceof CompletedExceptionally) {
          tmp = this.lp(state.po_1);
        } else {
          tmp = new JobCancellationException(get_classSimpleName(this) + ' has completed normally', null, this);
        }
      }
    }
    return tmp;
  };
  protoOf(JobSupport).kp = function (_this__u8e3s4, message) {
    var tmp0_elvis_lhs = _this__u8e3s4 instanceof CancellationException ? _this__u8e3s4 : null;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      tmp = new JobCancellationException(message == null ? this.no() : message, _this__u8e3s4, this);
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  };
  protoOf(JobSupport).lp = function (_this__u8e3s4, message, $super) {
    message = message === VOID ? null : message;
    return $super === VOID ? this.kp(_this__u8e3s4, message) : $super.kp.call(this, _this__u8e3s4, message);
  };
  protoOf(JobSupport).mp = function (handler) {
    return this.op(false, true, new UserSupplied_0(handler));
  };
  protoOf(JobSupport).np = function (onCancelling, invokeImmediately, handler) {
    return this.op(onCancelling, invokeImmediately, new UserSupplied_0(handler));
  };
  protoOf(JobSupport).op = function (onCancelling, invokeImmediately, handler) {
    var node = makeNode(this, handler, onCancelling);
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.JobSupport.invokeOnCompletionInternal.<anonymous>' call
        var state = this.ep();
        if (state instanceof Empty) {
          if (state.cv_1) {
            if (this.do_1.atomicfu$compareAndSet(state, node))
              return node;
          } else {
            promoteEmptyToNodeList(this, state);
          }
        } else {
          if (!(state == null) ? isInterface(state, Incomplete) : false) {
            var list = state.dv();
            if (list == null) {
              promoteSingleToNodeList(this, state instanceof JobNode ? state : THROW_CCE());
            } else {
              var rootCause = null;
              var handle = NonDisposableHandle_instance;
              var tmp;
              if (onCancelling) {
                tmp = state instanceof Finishing;
              } else {
                tmp = false;
              }
              if (tmp) {
                // Inline function 'kotlinx.coroutines.internal.synchronized' call
                // Inline function 'kotlin.contracts.contract' call
                // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
                rootCause = state.hw();
                var tmp_0;
                var tmp_1;
                if (rootCause == null) {
                  tmp_1 = true;
                } else {
                  var tmp_2;
                  if (handler instanceof ChildHandleNode) {
                    tmp_2 = !state.ew();
                  } else {
                    tmp_2 = false;
                  }
                  tmp_1 = tmp_2;
                }
                if (tmp_1) {
                  if (!addLastAtomic(this, state, list, node)) {
                    break $l$block;
                  }
                  if (rootCause == null)
                    return node;
                  handle = node;
                  tmp_0 = Unit_instance;
                }
              }
              if (!(rootCause == null)) {
                if (invokeImmediately) {
                  handler.nr(rootCause);
                }
                return handle;
              } else {
                if (addLastAtomic(this, state, list, node))
                  return node;
              }
            }
          } else {
            if (invokeImmediately) {
              var tmp1_safe_receiver = state instanceof CompletedExceptionally ? state : null;
              handler.nr(tmp1_safe_receiver == null ? null : tmp1_safe_receiver.po_1);
            }
            return NonDisposableHandle_instance;
          }
        }
      }
    }
  };
  protoOf(JobSupport).pp = function ($completion) {
    if (!joinInternal(this)) {
      // Inline function 'kotlin.js.getCoroutineContext' call
      var tmp$ret$0 = $completion.t6();
      ensureActive(tmp$ret$0);
      return Unit_instance;
    }
    return joinSuspend(this, $completion);
  };
  protoOf(JobSupport).qp = function (node) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      // Inline function 'kotlinx.coroutines.JobSupport.removeNode.<anonymous>' call
      var state = this.ep();
      if (state instanceof JobNode) {
        if (!(state === node))
          return Unit_instance;
        if (this.do_1.atomicfu$compareAndSet(state, get_EMPTY_ACTIVE()))
          return Unit_instance;
      } else {
        if (!(state == null) ? isInterface(state, Incomplete) : false) {
          if (!(state.dv() == null)) {
            node.ov();
          }
          return Unit_instance;
        } else {
          return Unit_instance;
        }
      }
    }
  };
  protoOf(JobSupport).rp = function () {
    return false;
  };
  protoOf(JobSupport).sp = function (cause) {
    var tmp;
    if (cause == null) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      tmp = new JobCancellationException(null == null ? this.no() : null, null, this);
    } else {
      tmp = cause;
    }
    this.up(tmp);
  };
  protoOf(JobSupport).no = function () {
    return 'Job was cancelled';
  };
  protoOf(JobSupport).up = function (cause) {
    this.yp(cause);
  };
  protoOf(JobSupport).vp = function (parentJob) {
    this.yp(parentJob);
  };
  protoOf(JobSupport).wp = function (cause) {
    if (cause instanceof CancellationException)
      return true;
    return this.yp(cause) ? this.dq() : false;
  };
  protoOf(JobSupport).xp = function (cause) {
    return this.yp(cause);
  };
  protoOf(JobSupport).yp = function (cause) {
    var finalState = get_COMPLETING_ALREADY();
    if (this.rp()) {
      finalState = cancelMakeCompleting(this, cause);
      if (finalState === get_COMPLETING_WAITING_CHILDREN())
        return true;
    }
    if (finalState === get_COMPLETING_ALREADY()) {
      finalState = makeCancelling(this, cause);
    }
    var tmp;
    if (finalState === get_COMPLETING_ALREADY()) {
      tmp = true;
    } else if (finalState === get_COMPLETING_WAITING_CHILDREN()) {
      tmp = true;
    } else if (finalState === get_TOO_LATE_TO_CANCEL()) {
      tmp = false;
    } else {
      this.uo(finalState);
      tmp = true;
    }
    return tmp;
  };
  protoOf(JobSupport).zp = function () {
    var state = this.ep();
    var tmp;
    if (state instanceof Finishing) {
      tmp = state.hw();
    } else {
      if (state instanceof CompletedExceptionally) {
        tmp = state.po_1;
      } else {
        if (!(state == null) ? isInterface(state, Incomplete) : false) {
          var message = 'Cannot be cancelling child in this state: ' + toString_0(state);
          throw IllegalStateException_init_$Create$(toString(message));
        } else {
          tmp = null;
        }
      }
    }
    var rootCause = tmp;
    var tmp1_elvis_lhs = rootCause instanceof CancellationException ? rootCause : null;
    return tmp1_elvis_lhs == null ? new JobCancellationException('Parent job is ' + stateString(this, state), rootCause, this) : tmp1_elvis_lhs;
  };
  protoOf(JobSupport).yt = function (proposedUpdate) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.JobSupport.makeCompleting.<anonymous>' call
        var state = this.ep();
        var finalState = tryMakeCompleting(this, state, proposedUpdate);
        if (finalState === get_COMPLETING_ALREADY())
          return false;
        else if (finalState === get_COMPLETING_WAITING_CHILDREN())
          return true;
        else if (finalState === get_COMPLETING_RETRY()) {
          break $l$block;
        } else {
          this.uo(finalState);
          return true;
        }
      }
    }
  };
  protoOf(JobSupport).so = function (proposedUpdate) {
    // Inline function 'kotlinx.coroutines.JobSupport.loopOnState' call
    while (true) {
      $l$block: {
        // Inline function 'kotlinx.coroutines.JobSupport.makeCompletingOnce.<anonymous>' call
        var state = this.ep();
        var finalState = tryMakeCompleting(this, state, proposedUpdate);
        if (finalState === get_COMPLETING_ALREADY())
          throw IllegalStateException_init_$Create$_0('Job ' + this + ' is already complete or completing, ' + ('but is being completed with ' + toString_0(proposedUpdate)), _get_exceptionOrNull__b3j7js(proposedUpdate, this));
        else if (finalState === get_COMPLETING_RETRY()) {
          break $l$block;
        } else
          return finalState;
      }
    }
  };
  protoOf(JobSupport).bv = function () {
    return sequence(JobSupport$_get_children_$slambda_k839f8_0(this, null));
  };
  protoOf(JobSupport).aq = function (child) {
    var tmp = invokeOnCompletion(this, true, VOID, new ChildHandleNode(child));
    return isInterface(tmp, ChildHandle) ? tmp : THROW_CCE();
  };
  protoOf(JobSupport).vo = function (exception) {
    throw exception;
  };
  protoOf(JobSupport).bq = function (cause) {
  };
  protoOf(JobSupport).cq = function () {
    return false;
  };
  protoOf(JobSupport).dq = function () {
    return true;
  };
  protoOf(JobSupport).eq = function (exception) {
    return false;
  };
  protoOf(JobSupport).oo = function (state) {
  };
  protoOf(JobSupport).uo = function (state) {
  };
  protoOf(JobSupport).toString = function () {
    return this.fq() + '@' + get_hexAddress(this);
  };
  protoOf(JobSupport).fq = function () {
    return this.wo() + '{' + stateString(this, this.ep()) + '}';
  };
  protoOf(JobSupport).wo = function () {
    return get_classSimpleName(this);
  };
  protoOf(JobSupport).tt = function ($completion) {
    $l$loop: while (true) {
      var state = this.ep();
      if (!(!(state == null) ? isInterface(state, Incomplete) : false)) {
        if (state instanceof CompletedExceptionally) {
          // Inline function 'kotlinx.coroutines.internal.recoverAndThrow' call
          throw state.po_1;
        }
        return unboxState(state);
      }
      if (startInternal(this, state) >= 0)
        break $l$loop;
    }
    return awaitSuspend(this, $completion);
  };
  function boxIncomplete(_this__u8e3s4) {
    _init_properties_JobSupport_kt__68f172();
    var tmp;
    if (!(_this__u8e3s4 == null) ? isInterface(_this__u8e3s4, Incomplete) : false) {
      tmp = new IncompleteStateBox(_this__u8e3s4);
    } else {
      tmp = _this__u8e3s4;
    }
    return tmp;
  }
  function JobCancellingNode() {
    JobNode.call(this);
  }
  function InactiveNodeList(list) {
    this.dw_1 = list;
  }
  protoOf(InactiveNodeList).dv = function () {
    return this.dw_1;
  };
  protoOf(InactiveNodeList).ko = function () {
    return false;
  };
  protoOf(InactiveNodeList).toString = function () {
    return get_DEBUG() ? this.dw_1.hv('New') : anyToString(this);
  };
  function ChildHandleNode(childJob) {
    JobCancellingNode.call(this);
    this.nw_1 = childJob;
  }
  protoOf(ChildHandleNode).dp = function () {
    return this.vv();
  };
  protoOf(ChildHandleNode).nr = function (cause) {
    return this.nw_1.vp(this.vv());
  };
  protoOf(ChildHandleNode).wp = function (cause) {
    return this.vv().wp(cause);
  };
  function InvokeOnCancelling(handler) {
    JobCancellingNode.call(this);
    this.dy_1 = handler;
    this.ey_1 = atomic$int$1(0);
  }
  protoOf(InvokeOnCancelling).nr = function (cause) {
    if (this.ey_1.atomicfu$compareAndSet(0, 1)) {
      this.dy_1.nr(cause);
    }
  };
  function InvokeOnCompletion(handler) {
    JobNode.call(this);
    this.jy_1 = handler;
  }
  protoOf(InvokeOnCompletion).nr = function (cause) {
    return this.jy_1.nr(cause);
  };
  function ResumeOnCompletion(continuation) {
    JobNode.call(this);
    this.oy_1 = continuation;
  }
  protoOf(ResumeOnCompletion).nr = function (cause) {
    // Inline function 'kotlin.coroutines.resume' call
    var this_0 = this.oy_1;
    // Inline function 'kotlin.Companion.success' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
    this_0.u6(tmp$ret$0);
    return Unit_instance;
  };
  function unboxState(_this__u8e3s4) {
    _init_properties_JobSupport_kt__68f172();
    var tmp0_safe_receiver = _this__u8e3s4 instanceof IncompleteStateBox ? _this__u8e3s4 : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.py_1;
    return tmp1_elvis_lhs == null ? _this__u8e3s4 : tmp1_elvis_lhs;
  }
  function ResumeAwaitOnCompletion(continuation) {
    JobNode.call(this);
    this.uy_1 = continuation;
  }
  protoOf(ResumeAwaitOnCompletion).nr = function (cause) {
    var state = this.vv().ep();
    // Inline function 'kotlinx.coroutines.assert' call
    if (state instanceof CompletedExceptionally) {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      var this_0 = this.uy_1;
      // Inline function 'kotlin.Companion.failure' call
      var exception = state.po_1;
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
      this_0.u6(tmp$ret$0);
    } else {
      // Inline function 'kotlin.coroutines.resume' call
      var this_1 = this.uy_1;
      var tmp = unboxState(state);
      // Inline function 'kotlin.Companion.success' call
      var value = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
      var tmp$ret$2 = _Result___init__impl__xyqfz8(value);
      this_1.u6(tmp$ret$2);
    }
  };
  function IncompleteStateBox(state) {
    this.py_1 = state;
  }
  function ChildContinuation(child) {
    JobCancellingNode.call(this);
    this.zy_1 = child;
  }
  protoOf(ChildContinuation).nr = function (cause) {
    this.zy_1.zs(this.zy_1.at(this.vv()));
  };
  function handlesException($this) {
    var tmp = $this.cp();
    var tmp0_safe_receiver = tmp instanceof ChildHandleNode ? tmp : null;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : tmp0_safe_receiver.vv();
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      return false;
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    var parentJob = tmp_0;
    while (true) {
      if (parentJob.dq())
        return true;
      var tmp_1 = parentJob.cp();
      var tmp2_safe_receiver = tmp_1 instanceof ChildHandleNode ? tmp_1 : null;
      var tmp3_elvis_lhs = tmp2_safe_receiver == null ? null : tmp2_safe_receiver.vv();
      var tmp_2;
      if (tmp3_elvis_lhs == null) {
        return false;
      } else {
        tmp_2 = tmp3_elvis_lhs;
      }
      parentJob = tmp_2;
    }
  }
  function JobImpl(parent) {
    JobSupport.call(this, true);
    this.fo(parent);
    this.cz_1 = handlesException(this);
  }
  protoOf(JobImpl).rp = function () {
    return true;
  };
  protoOf(JobImpl).dq = function () {
    return this.cz_1;
  };
  protoOf(JobImpl).dz = function (exception) {
    return this.yt(new CompletedExceptionally(exception));
  };
  function DisposeOnCompletion(handle) {
    JobNode.call(this);
    this.iz_1 = handle;
  }
  protoOf(DisposeOnCompletion).nr = function (cause) {
    return this.iz_1.or();
  };
  var properties_initialized_JobSupport_kt_5iq8a4;
  function _init_properties_JobSupport_kt__68f172() {
    if (!properties_initialized_JobSupport_kt_5iq8a4) {
      properties_initialized_JobSupport_kt_5iq8a4 = true;
      COMPLETING_ALREADY = new Symbol('COMPLETING_ALREADY');
      COMPLETING_WAITING_CHILDREN = new Symbol('COMPLETING_WAITING_CHILDREN');
      COMPLETING_RETRY = new Symbol('COMPLETING_RETRY');
      TOO_LATE_TO_CANCEL = new Symbol('TOO_LATE_TO_CANCEL');
      SEALED = new Symbol('SEALED');
      EMPTY_NEW = new Empty(false);
      EMPTY_ACTIVE = new Empty(true);
    }
  }
  function MainCoroutineDispatcher() {
    CoroutineDispatcher.call(this);
  }
  protoOf(MainCoroutineDispatcher).toString = function () {
    var tmp0_elvis_lhs = this.lz();
    return tmp0_elvis_lhs == null ? get_classSimpleName(this) + '@' + get_hexAddress(this) : tmp0_elvis_lhs;
  };
  protoOf(MainCoroutineDispatcher).lz = function () {
    var main = Dispatchers_getInstance().qz();
    if (this === main)
      return 'Dispatchers.Main';
    var tmp;
    try {
      tmp = main.kz();
    } catch ($p) {
      var tmp_0;
      if ($p instanceof UnsupportedOperationException) {
        var e = $p;
        tmp_0 = null;
      } else {
        throw $p;
      }
      tmp = tmp_0;
    }
    var immediate = tmp;
    if (this === immediate)
      return 'Dispatchers.Main.immediate';
    return null;
  };
  function SupervisorJob(parent) {
    parent = parent === VOID ? null : parent;
    return new SupervisorJobImpl(parent);
  }
  function SupervisorJobImpl(parent) {
    JobImpl.call(this, parent);
  }
  protoOf(SupervisorJobImpl).wp = function (cause) {
    return false;
  };
  function supervisorScope(block, $completion) {
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.supervisorScope.<anonymous>' call
    var coroutine = new SupervisorCoroutine($completion.t6(), $completion);
    return startUndispatchedOrReturn(coroutine, coroutine, block);
  }
  function SupervisorCoroutine(context, uCont) {
    ScopeCoroutine.call(this, context, uCont);
  }
  protoOf(SupervisorCoroutine).wp = function (cause) {
    return false;
  };
  function TimeoutCancellationException(message, coroutine) {
    CancellationException_init_$Init$(message, this);
    captureStack(this, TimeoutCancellationException);
    this.yz_1 = coroutine;
  }
  function withTimeoutOrNull(timeMillis, block, $completion) {
    var tmp = new $withTimeoutOrNullCOROUTINE$4(timeMillis, block, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function TimeoutCoroutine(time, uCont) {
    ScopeCoroutine.call(this, uCont.t6(), uCont);
    this.o10_1 = time;
  }
  protoOf(TimeoutCoroutine).gt = function () {
    this.xp(TimeoutCancellationException_0(this.o10_1, get_delay(this.io_1), this));
  };
  protoOf(TimeoutCoroutine).wo = function () {
    return protoOf(ScopeCoroutine).wo.call(this) + '(timeMillis=' + this.o10_1.toString() + ')';
  };
  function setupTimeout(coroutine, block) {
    var cont = coroutine.xq_1;
    var context = cont.t6();
    disposeOnCompletion(coroutine, get_delay(context).ju(coroutine.o10_1, coroutine, coroutine.io_1));
    return startUndispatchedOrReturnIgnoreTimeout(coroutine, coroutine, block);
  }
  function TimeoutCancellationException_0(time, delay, coroutine) {
    var tmp0_safe_receiver = isInterface(delay, DelayWithTimeoutDiagnostics) ? delay : null;
    var tmp;
    if (tmp0_safe_receiver == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.time.Companion.milliseconds' call
      Companion_getInstance_0();
      var tmp$ret$0 = toDuration(time, DurationUnit_MILLISECONDS_getInstance());
      tmp = tmp0_safe_receiver.ku(tmp$ret$0);
    }
    var tmp1_elvis_lhs = tmp;
    var message = tmp1_elvis_lhs == null ? 'Timed out waiting for ' + time.toString() + ' ms' : tmp1_elvis_lhs;
    return new TimeoutCancellationException(message, coroutine);
  }
  function $withTimeoutOrNullCOROUTINE$4(timeMillis, block, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.h10_1 = timeMillis;
    this.i10_1 = block;
  }
  protoOf($withTimeoutOrNullCOROUTINE$4).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            if (this.h10_1.z6(new Long(0, 0)) <= 0)
              return null;
            this.j10_1 = {_v: null};
            this.bc_1 = 2;
            this.ac_1 = 1;
            var timeoutCoroutine = new TimeoutCoroutine(this.h10_1, this);
            this.j10_1._v = timeoutCoroutine;
            suspendResult = returnIfSuspended(setupTimeout(timeoutCoroutine, this.i10_1), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            return suspendResult;
          case 2:
            this.bc_1 = 3;
            var tmp_0 = this.dc_1;
            if (tmp_0 instanceof TimeoutCancellationException) {
              var e = this.dc_1;
              if (e.yz_1 === this.j10_1._v) {
                return null;
              }
              throw e;
            } else {
              throw this.dc_1;
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            return Unit_instance;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 3) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  function Unconfined() {
    Unconfined_instance = this;
    CoroutineDispatcher.call(this);
  }
  protoOf(Unconfined).du = function (context) {
    return false;
  };
  protoOf(Unconfined).eu = function (context, block) {
    var yieldContext = context.hc(Key_instance_4);
    if (!(yieldContext == null)) {
      yieldContext.r10_1 = true;
      return Unit_instance;
    }
    throw UnsupportedOperationException_init_$Create$('Dispatchers.Unconfined.dispatch function can only be used by the yield function. If you wrap Unconfined dispatcher in your code, make sure you properly delegate isDispatchNeeded and dispatch calls.');
  };
  protoOf(Unconfined).toString = function () {
    return 'Dispatchers.Unconfined';
  };
  var Unconfined_instance;
  function Unconfined_getInstance() {
    if (Unconfined_instance == null)
      new Unconfined();
    return Unconfined_instance;
  }
  function Key_3() {
  }
  var Key_instance_4;
  function Key_getInstance_3() {
    return Key_instance_4;
  }
  function YieldContext() {
    AbstractCoroutineContextElement.call(this, Key_instance_4);
    this.r10_1 = false;
  }
  function Waiter() {
  }
  function yield_0($completion) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.yield.<anonymous>' call
      var context = $completion.t6();
      ensureActive(context);
      var tmp = intercepted($completion);
      var tmp0_elvis_lhs = tmp instanceof DispatchedContinuation ? tmp : null;
      var tmp_0;
      if (tmp0_elvis_lhs == null) {
        tmp$ret$0 = Unit_instance;
        break $l$block_0;
      } else {
        tmp_0 = tmp0_elvis_lhs;
      }
      var cont = tmp_0;
      if (cont.qr_1.du(context)) {
        cont.s10(context, Unit_instance);
      } else {
        var yieldContext = new YieldContext();
        cont.s10(context.vf(yieldContext), Unit_instance);
        if (yieldContext.r10_1) {
          tmp$ret$0 = yieldUndispatched(cont) ? get_COROUTINE_SUSPENDED() : Unit_instance;
          break $l$block_0;
        }
      }
      tmp$ret$0 = get_COROUTINE_SUSPENDED();
    }
    return tmp$ret$0;
  }
  var BufferOverflow_SUSPEND_instance;
  var BufferOverflow_DROP_OLDEST_instance;
  var BufferOverflow_DROP_LATEST_instance;
  var BufferOverflow_entriesInitialized;
  function BufferOverflow_initEntries() {
    if (BufferOverflow_entriesInitialized)
      return Unit_instance;
    BufferOverflow_entriesInitialized = true;
    BufferOverflow_SUSPEND_instance = new BufferOverflow('SUSPEND', 0);
    BufferOverflow_DROP_OLDEST_instance = new BufferOverflow('DROP_OLDEST', 1);
    BufferOverflow_DROP_LATEST_instance = new BufferOverflow('DROP_LATEST', 2);
  }
  function BufferOverflow(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function BufferOverflow_SUSPEND_getInstance() {
    BufferOverflow_initEntries();
    return BufferOverflow_SUSPEND_instance;
  }
  function BufferOverflow_DROP_OLDEST_getInstance() {
    BufferOverflow_initEntries();
    return BufferOverflow_DROP_OLDEST_instance;
  }
  function BufferOverflow_DROP_LATEST_getInstance() {
    BufferOverflow_initEntries();
    return BufferOverflow_DROP_LATEST_instance;
  }
  function get_NULL_SEGMENT() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return NULL_SEGMENT;
  }
  var NULL_SEGMENT;
  function get_SEGMENT_SIZE() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return SEGMENT_SIZE;
  }
  var SEGMENT_SIZE;
  function get_EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS;
  }
  var EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS;
  function get_BUFFERED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return BUFFERED;
  }
  var BUFFERED;
  function get_IN_BUFFER() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return IN_BUFFER;
  }
  var IN_BUFFER;
  function get_RESUMING_BY_RCV() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return RESUMING_BY_RCV;
  }
  var RESUMING_BY_RCV;
  function get_RESUMING_BY_EB() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return RESUMING_BY_EB;
  }
  var RESUMING_BY_EB;
  function get_POISONED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return POISONED;
  }
  var POISONED;
  function get_DONE_RCV() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return DONE_RCV;
  }
  var DONE_RCV;
  function get_INTERRUPTED_SEND() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return INTERRUPTED_SEND;
  }
  var INTERRUPTED_SEND;
  function get_INTERRUPTED_RCV() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return INTERRUPTED_RCV;
  }
  var INTERRUPTED_RCV;
  function get_CHANNEL_CLOSED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return CHANNEL_CLOSED;
  }
  var CHANNEL_CLOSED;
  function get_SUSPEND() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return SUSPEND;
  }
  var SUSPEND;
  function get_SUSPEND_NO_WAITER() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return SUSPEND_NO_WAITER;
  }
  var SUSPEND_NO_WAITER;
  function get_FAILED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return FAILED;
  }
  var FAILED;
  function get_NO_RECEIVE_RESULT() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return NO_RECEIVE_RESULT;
  }
  var NO_RECEIVE_RESULT;
  function get_CLOSE_HANDLER_CLOSED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return CLOSE_HANDLER_CLOSED;
  }
  var CLOSE_HANDLER_CLOSED;
  function get_CLOSE_HANDLER_INVOKED() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return CLOSE_HANDLER_INVOKED;
  }
  var CLOSE_HANDLER_INVOKED;
  function get_NO_CLOSE_CAUSE() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return NO_CLOSE_CAUSE;
  }
  var NO_CLOSE_CAUSE;
  function setElementLazy($this, index, value) {
    // Inline function 'kotlinx.atomicfu.AtomicRef.lazySet' call
    $this.y10_1.atomicfu$get(imul(index, 2)).kotlinx$atomicfu$value = value;
  }
  function ChannelSegment(id, prev, channel, pointers) {
    Segment.call(this, id, prev, pointers);
    this.x10_1 = channel;
    this.y10_1 = atomicfu$AtomicRefArray$ofNulls(imul(get_SEGMENT_SIZE(), 2));
  }
  protoOf(ChannelSegment).z10 = function () {
    return ensureNotNull(this.x10_1);
  };
  protoOf(ChannelSegment).a11 = function () {
    return get_SEGMENT_SIZE();
  };
  protoOf(ChannelSegment).b11 = function (index, element) {
    setElementLazy(this, index, element);
  };
  protoOf(ChannelSegment).c11 = function (index) {
    var tmp = this.y10_1.atomicfu$get(imul(index, 2)).kotlinx$atomicfu$value;
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(ChannelSegment).d11 = function (index) {
    // Inline function 'kotlin.also' call
    var this_0 = this.c11(index);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.ChannelSegment.retrieveElement.<anonymous>' call
    this.e11(index);
    return this_0;
  };
  protoOf(ChannelSegment).e11 = function (index) {
    setElementLazy(this, index, null);
  };
  protoOf(ChannelSegment).f11 = function (index) {
    return this.y10_1.atomicfu$get(imul(index, 2) + 1 | 0).kotlinx$atomicfu$value;
  };
  protoOf(ChannelSegment).g11 = function (index, value) {
    this.y10_1.atomicfu$get(imul(index, 2) + 1 | 0).kotlinx$atomicfu$value = value;
  };
  protoOf(ChannelSegment).h11 = function (index, from, to) {
    return this.y10_1.atomicfu$get(imul(index, 2) + 1 | 0).atomicfu$compareAndSet(from, to);
  };
  protoOf(ChannelSegment).i11 = function (index, update) {
    return this.y10_1.atomicfu$get(imul(index, 2) + 1 | 0).atomicfu$getAndSet(update);
  };
  protoOf(ChannelSegment).es = function (index, cause, context) {
    var isSender = index >= get_SEGMENT_SIZE();
    var index_0 = isSender ? index - get_SEGMENT_SIZE() | 0 : index;
    var element = this.c11(index_0);
    $l$loop: while (true) {
      var cur = this.f11(index_0);
      var tmp;
      if (!(cur == null) ? isInterface(cur, Waiter) : false) {
        tmp = true;
      } else {
        tmp = cur instanceof WaiterEB;
      }
      if (tmp) {
        var update = isSender ? get_INTERRUPTED_SEND() : get_INTERRUPTED_RCV();
        if (this.h11(index_0, cur, update)) {
          this.e11(index_0);
          this.v11(index_0, !isSender);
          if (isSender) {
            var tmp0_safe_receiver = this.z10().k11_1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              callUndeliveredElement(tmp0_safe_receiver, element, context);
            }
          }
          return Unit_instance;
        }
      } else {
        if (cur === get_INTERRUPTED_SEND() ? true : cur === get_INTERRUPTED_RCV()) {
          this.e11(index_0);
          if (isSender) {
            var tmp1_safe_receiver = this.z10().k11_1;
            if (tmp1_safe_receiver == null)
              null;
            else {
              callUndeliveredElement(tmp1_safe_receiver, element, context);
            }
          }
          return Unit_instance;
        } else {
          if (cur === get_RESUMING_BY_EB() ? true : cur === get_RESUMING_BY_RCV())
            continue $l$loop;
          else {
            if (cur === get_DONE_RCV() ? true : cur === get_BUFFERED())
              return Unit_instance;
            else {
              if (cur === get_CHANNEL_CLOSED())
                return Unit_instance;
              else {
                var message = 'unexpected state: ' + toString_0(cur);
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }
          }
        }
      }
    }
  };
  protoOf(ChannelSegment).v11 = function (index, receiver) {
    if (receiver) {
      var tmp = this.z10();
      // Inline function 'kotlin.Long.plus' call
      // Inline function 'kotlin.Long.times' call
      var this_0 = this.cs_1;
      var other = get_SEGMENT_SIZE();
      var tmp$ret$1 = this_0.w9(toLong(other)).eb(toLong(index));
      tmp.w11(tmp$ret$1);
    }
    this.x11();
  };
  function onClosedHasNext($this) {
    $this.j12_1 = get_CHANNEL_CLOSED();
    var tmp0_elvis_lhs = $this.l12_1.m12();
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var cause = tmp;
    throw recoverStackTrace_0(cause);
  }
  function hasNextOnNoWaiterSuspend($this, segment, index, r, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutineReusable.<anonymous>' call
    var cancellable = getOrCreateCancellableContinuation(intercepted($completion));
    try {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannelIterator.hasNextOnNoWaiterSuspend.<anonymous>' call
      $this.k12_1 = cancellable;
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImplOnNoWaiter' call
      var this_0 = $this.l12_1;
      var updCellResult = updateCellReceive(this_0, segment, index, r, $this);
      if (updCellResult === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
        prepareReceiverForSuspension($this, this_0, segment, index);
      } else if (updCellResult === _get_FAILED_$accessor$yt74tm_h47uk8()) {
        if (r.z6(this_0.n12()) < 0) {
          segment.h12();
        }
        $l$block_0: {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl' call
          var segment_0 = this_0.q11_1.kotlinx$atomicfu$value;
          $l$loop_0: while (true) {
            if (this_0.o12()) {
              onClosedHasNextNoWaiterSuspend($this);
              break $l$block_0;
            }
            var r_0 = this_0.m11_1.atomicfu$getAndIncrement$long();
            // Inline function 'kotlin.Long.div' call
            var other = get_SEGMENT_SIZE();
            var id = r_0.v9(toLong(other));
            // Inline function 'kotlin.Long.rem' call
            var other_0 = get_SEGMENT_SIZE();
            var i = r_0.gb(toLong(other_0)).ea();
            if (!segment_0.cs_1.equals(id)) {
              var tmp0_elvis_lhs = findSegmentReceive(this_0, id, segment_0);
              var tmp;
              if (tmp0_elvis_lhs == null) {
                continue $l$loop_0;
              } else {
                tmp = tmp0_elvis_lhs;
              }
              segment_0 = tmp;
            }
            var updCellResult_0 = updateCellReceive(this_0, segment_0, i, r_0, $this);
            var tmp_0;
            if (updCellResult_0 === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
              var tmp1_safe_receiver = (!($this == null) ? isInterface($this, Waiter) : false) ? $this : null;
              if (tmp1_safe_receiver == null)
                null;
              else {
                prepareReceiverForSuspension(tmp1_safe_receiver, this_0, segment_0, i);
              }
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImplOnNoWaiter.<anonymous>' call
              tmp_0 = Unit_instance;
            } else if (updCellResult_0 === _get_FAILED_$accessor$yt74tm_h47uk8()) {
              if (r_0.z6(this_0.n12()) < 0) {
                segment_0.h12();
              }
              continue $l$loop_0;
            } else if (updCellResult_0 === _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky()) {
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl.<anonymous>' call
              var message = 'unexpected';
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              segment_0.h12();
              var element = (updCellResult_0 == null ? true : !(updCellResult_0 == null)) ? updCellResult_0 : THROW_CCE();
              $this.j12_1 = element;
              $this.k12_1 = null;
              var tmp0_safe_receiver = $this.l12_1.k11_1;
              cancellable.er(true, tmp0_safe_receiver == null ? null : bindCancellationFun(tmp0_safe_receiver, element, cancellable.t6()));
              tmp_0 = Unit_instance;
            }
            break $l$block_0;
          }
        }
      } else {
        segment.h12();
        // Inline function 'kotlinx.coroutines.channels.BufferedChannelIterator.hasNextOnNoWaiterSuspend.<anonymous>.<anonymous>' call
        var element_0 = (updCellResult == null ? true : !(updCellResult == null)) ? updCellResult : THROW_CCE();
        $this.j12_1 = element_0;
        $this.k12_1 = null;
        var tmp0_safe_receiver_0 = $this.l12_1.k11_1;
        cancellable.er(true, tmp0_safe_receiver_0 == null ? null : bindCancellationFun(tmp0_safe_receiver_0, element_0, cancellable.t6()));
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        cancellable.bt();
        throw e;
      } else {
        throw $p;
      }
    }
    return cancellable.mq();
  }
  function onClosedHasNextNoWaiterSuspend($this) {
    var cont = ensureNotNull($this.k12_1);
    $this.k12_1 = null;
    $this.j12_1 = get_CHANNEL_CLOSED();
    var cause = $this.l12_1.m12();
    if (cause == null) {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(false);
      cont.u6(tmp$ret$0);
    } else {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var exception = recoverStackTrace(cause, cont);
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
      cont.u6(tmp$ret$2);
    }
  }
  function $hasNextCOROUTINE$8(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.x12_1 = _this__u8e3s4;
  }
  protoOf($hasNextCOROUTINE$8).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 8;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0 = this;
            tmp_0.z12_1 = this.x12_1.l12_1;
            var tmp_1 = this;
            tmp_1.a13_1 = null;
            this.b13_1 = this.z12_1.q11_1.kotlinx$atomicfu$value;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            if (!true) {
              this.ac_1 = 9;
              continue $sm;
            }

            if (this.z12_1.o12()) {
              var tmp_2 = this;
              tmp_2.y12_1 = onClosedHasNext(this.x12_1);
              this.ac_1 = 10;
              continue $sm;
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

          case 3:
            this.c13_1 = this.z12_1.m11_1.atomicfu$getAndIncrement$long();
            var tmp_3 = this;
            var this_0 = this.c13_1;
            var other = get_SEGMENT_SIZE();
            tmp_3.d13_1 = this_0.v9(toLong(other));
            var tmp_4 = this;
            var this_1 = this.c13_1;
            var other_0 = get_SEGMENT_SIZE();
            tmp_4.e13_1 = this_1.gb(toLong(other_0)).ea();
            if (!this.b13_1.cs_1.equals(this.d13_1)) {
              this.f13_1 = findSegmentReceive(this.z12_1, this.d13_1, this.b13_1);
              if (this.f13_1 == null) {
                this.ac_1 = 2;
                var tmp_5 = this;
                continue $sm;
              } else {
                this.g13_1 = this.f13_1;
                this.ac_1 = 4;
                continue $sm;
              }
            } else {
              this.ac_1 = 5;
              continue $sm;
            }

          case 4:
            this.b13_1 = this.g13_1;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            this.h13_1 = updateCellReceive(this.z12_1, this.b13_1, this.e13_1, this.c13_1, this.a13_1);
            if (this.h13_1 === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
              var tmp_6 = this;
              var tmp_7 = this.a13_1;
              var tmp1_safe_receiver = (!(tmp_7 == null) ? isInterface(tmp_7, Waiter) : false) ? tmp_7 : null;
              if (tmp1_safe_receiver == null)
                null;
              else {
                prepareReceiverForSuspension(tmp1_safe_receiver, this.z12_1, this.b13_1, this.e13_1);
              }
              this.b13_1;
              this.e13_1;
              this.c13_1;
              var message = 'unreachable';
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              if (this.h13_1 === _get_FAILED_$accessor$yt74tm_h47uk8()) {
                if (this.c13_1.z6(this.z12_1.n12()) < 0) {
                  this.b13_1.h12();
                }
                this.ac_1 = 2;
                var tmp_8 = this;
                continue $sm;
              } else {
                if (this.h13_1 === _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky()) {
                  var tmp_9 = this;
                  tmp_9.j13_1 = this.b13_1;
                  var tmp_10 = this;
                  tmp_10.k13_1 = this.e13_1;
                  var tmp_11 = this;
                  tmp_11.l13_1 = this.c13_1;
                  this.ac_1 = 6;
                  suspendResult = hasNextOnNoWaiterSuspend(this.x12_1, this.j13_1, this.k13_1, this.l13_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_12 = this;
                  this.b13_1.h12();
                  var tmp_13 = this.h13_1;
                  var element = (tmp_13 == null ? true : !(tmp_13 == null)) ? tmp_13 : THROW_CCE();
                  this.x12_1.j12_1 = element;
                  tmp_12.i13_1 = true;
                  this.ac_1 = 7;
                  continue $sm;
                }
              }
            }

          case 6:
            var tmp_14 = this;
            return suspendResult;
          case 7:
            this.y12_1 = this.i13_1;
            this.ac_1 = 10;
            continue $sm;
          case 8:
            throw this.dc_1;
          case 9:
            if (false) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 10;
            continue $sm;
          case 10:
            return this.y12_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 8) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function _get_bufferEndCounter__2d4hee($this) {
    return $this.n11_1.kotlinx$atomicfu$value;
  }
  function _get_isRendezvousOrUnlimited__3mdufi($this) {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.<get-isRendezvousOrUnlimited>.<anonymous>' call
    var it = _get_bufferEndCounter__2d4hee($this);
    return it.equals(new Long(0, 0)) ? true : it.equals(new Long(-1, 2147483647));
  }
  function onClosedSend($this, element, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    $l$block: {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.onClosedSend.<anonymous>' call
      var tmp0_safe_receiver = $this.k11_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : callUndeliveredElementCatchingException(tmp0_safe_receiver, element);
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        addSuppressed(tmp1_safe_receiver, $this.m13());
        // Inline function 'kotlinx.coroutines.resumeWithStackTrace' call
        // Inline function 'kotlin.Companion.failure' call
        var exception = recoverStackTrace(tmp1_safe_receiver, cancellable);
        var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
        cancellable.u6(tmp$ret$0);
        break $l$block;
      }
      // Inline function 'kotlinx.coroutines.resumeWithStackTrace' call
      var exception_0 = $this.m13();
      // Inline function 'kotlin.Companion.failure' call
      var exception_1 = recoverStackTrace(exception_0, cancellable);
      var tmp$ret$3 = _Result___init__impl__xyqfz8(createFailure(exception_1));
      cancellable.u6(tmp$ret$3);
    }
    return cancellable.mq();
  }
  function sendOnNoWaiterSuspend($this, segment, index, element, s, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutineReusable.<anonymous>' call
    var cancellable = getOrCreateCancellableContinuation(intercepted($completion));
    try {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendOnNoWaiterSuspend.<anonymous>' call
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImplOnNoWaiter' call
      var tmp0_subject = updateCellSend($this, segment, index, element, s, cancellable, false);
      if (tmp0_subject === _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8()) {
        segment.h12();
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendOnNoWaiterSuspend.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        cancellable.u6(tmp$ret$0);
      } else if (tmp0_subject === _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m()) {
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendOnNoWaiterSuspend.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$2 = _Result___init__impl__xyqfz8(Unit_instance);
        cancellable.u6(tmp$ret$2);
      } else if (tmp0_subject === _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf()) {
        prepareSenderForSuspension(cancellable, $this, segment, index);
      } else if (tmp0_subject === _get_RESULT_CLOSED_$accessor$yt74tm_10v48j()) {
        if (s.z6($this.n13()) < 0) {
          segment.h12();
        }
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendOnNoWaiterSuspend.<anonymous>.<anonymous>' call
        onClosedSendOnNoWaiterSuspend($this, element, cancellable);
      } else if (tmp0_subject === _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0()) {
        segment.h12();
        $l$block_5: {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl' call
          var segment_0 = $this.p11_1.kotlinx$atomicfu$value;
          $l$loop_0: while (true) {
            var sendersAndCloseStatusCur = $this.l11_1.atomicfu$getAndIncrement$long();
            // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
            var s_0 = sendersAndCloseStatusCur.nb(new Long(-1, 268435455));
            var closed = _get_isClosedForSend0__kxgf9m(sendersAndCloseStatusCur, $this);
            // Inline function 'kotlin.Long.div' call
            var other = get_SEGMENT_SIZE();
            var id = s_0.v9(toLong(other));
            // Inline function 'kotlin.Long.rem' call
            var other_0 = get_SEGMENT_SIZE();
            var i = s_0.gb(toLong(other_0)).ea();
            if (!segment_0.cs_1.equals(id)) {
              var tmp0_elvis_lhs = findSegmentSend($this, id, segment_0);
              var tmp;
              if (tmp0_elvis_lhs == null) {
                var tmp_0;
                if (closed) {
                  onClosedSendOnNoWaiterSuspend($this, element, cancellable);
                  break $l$block_5;
                } else {
                  continue $l$loop_0;
                }
              } else {
                tmp = tmp0_elvis_lhs;
              }
              segment_0 = tmp;
            }
            var tmp1_subject = updateCellSend($this, segment_0, i, element, s_0, cancellable, closed);
            if (tmp1_subject === _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8()) {
              segment_0.h12();
              // Inline function 'kotlin.coroutines.resume' call
              // Inline function 'kotlin.Companion.success' call
              var tmp$ret$8 = _Result___init__impl__xyqfz8(Unit_instance);
              cancellable.u6(tmp$ret$8);
              break $l$block_5;
            } else if (tmp1_subject === _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m()) {
              // Inline function 'kotlin.coroutines.resume' call
              // Inline function 'kotlin.Companion.success' call
              var tmp$ret$10 = _Result___init__impl__xyqfz8(Unit_instance);
              cancellable.u6(tmp$ret$10);
              break $l$block_5;
            } else if (tmp1_subject === _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf()) {
              if (closed) {
                segment_0.x11();
                onClosedSendOnNoWaiterSuspend($this, element, cancellable);
                break $l$block_5;
              }
              var tmp2_safe_receiver = (!(cancellable == null) ? isInterface(cancellable, Waiter) : false) ? cancellable : null;
              if (tmp2_safe_receiver == null)
                null;
              else {
                prepareSenderForSuspension(tmp2_safe_receiver, $this, segment_0, i);
              }
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImplOnNoWaiter.<anonymous>' call
              break $l$block_5;
            } else if (tmp1_subject === _get_RESULT_CLOSED_$accessor$yt74tm_10v48j()) {
              if (s_0.z6($this.n13()) < 0) {
                segment_0.h12();
              }
              onClosedSendOnNoWaiterSuspend($this, element, cancellable);
              break $l$block_5;
            } else if (tmp1_subject === _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0()) {
              segment_0.h12();
              continue $l$loop_0;
            } else if (tmp1_subject === _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m()) {
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl.<anonymous>' call
              var message = 'unexpected';
              throw IllegalStateException_init_$Create$(toString(message));
            }
          }
        }
      } else {
        // Inline function 'kotlin.error' call
        var message_0 = 'unexpected';
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        cancellable.bt();
        throw e;
      } else {
        throw $p;
      }
    }
    return cancellable.mq();
  }
  function prepareSenderForSuspension(_this__u8e3s4, $this, segment, index) {
    _this__u8e3s4.et(segment, index + get_SEGMENT_SIZE() | 0);
  }
  function onClosedSendOnNoWaiterSuspend($this, element, cont) {
    var tmp0_safe_receiver = $this.k11_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      callUndeliveredElement(tmp0_safe_receiver, element, cont.t6());
    }
    // Inline function 'kotlin.coroutines.resumeWithException' call
    // Inline function 'kotlin.Companion.failure' call
    var exception = recoverStackTrace($this.m13(), cont);
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
    cont.u6(tmp$ret$0);
  }
  function SendBroadcast() {
  }
  function updateCellSend($this, segment, index, element, s, waiter, closed) {
    segment.b11(index, element);
    if (closed)
      return updateCellSendSlow($this, segment, index, element, s, waiter, closed);
    var state = segment.f11(index);
    if (state === null) {
      if (bufferOrRendezvousSend($this, s)) {
        if (segment.h11(index, null, get_BUFFERED())) {
          return _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m();
        }
      } else {
        if (waiter == null) {
          return _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m();
        } else {
          if (segment.h11(index, null, waiter))
            return _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf();
        }
      }
    } else {
      if (!(state == null) ? isInterface(state, Waiter) : false) {
        segment.e11(index);
        var tmp;
        if (tryResumeReceiver(state, $this, element)) {
          segment.g11(index, get_DONE_RCV());
          $this.o13();
          tmp = _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8();
        } else {
          if (!(segment.i11(index, get_INTERRUPTED_RCV()) === get_INTERRUPTED_RCV())) {
            segment.v11(index, true);
          }
          tmp = _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0();
        }
        return tmp;
      }
    }
    return updateCellSendSlow($this, segment, index, element, s, waiter, closed);
  }
  function updateCellSendSlow($this, segment, index, element, s, waiter, closed) {
    while (true) {
      var state = segment.f11(index);
      if (state === null) {
        if (bufferOrRendezvousSend($this, s) ? !closed : false) {
          if (segment.h11(index, null, get_BUFFERED())) {
            return _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m();
          }
        } else {
          if (closed) {
            if (segment.h11(index, null, get_INTERRUPTED_SEND())) {
              segment.v11(index, false);
              return _get_RESULT_CLOSED_$accessor$yt74tm_10v48j();
            }
          } else if (waiter == null)
            return _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m();
          else if (segment.h11(index, null, waiter))
            return _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf();
        }
      } else if (state === get_IN_BUFFER()) {
        if (segment.h11(index, state, get_BUFFERED())) {
          return _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m();
        }
      } else if (state === get_INTERRUPTED_RCV()) {
        segment.e11(index);
        return _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0();
      } else if (state === get_POISONED()) {
        segment.e11(index);
        return _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0();
      } else if (state === get_CHANNEL_CLOSED()) {
        segment.e11(index);
        completeCloseOrCancel($this);
        return _get_RESULT_CLOSED_$accessor$yt74tm_10v48j();
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        segment.e11(index);
        var tmp;
        if (state instanceof WaiterEB) {
          tmp = state.p13_1;
        } else {
          tmp = state;
        }
        var receiver = tmp;
        var tmp_0;
        if (tryResumeReceiver(receiver, $this, element)) {
          segment.g11(index, get_DONE_RCV());
          $this.o13();
          tmp_0 = _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8();
        } else {
          if (!(segment.i11(index, get_INTERRUPTED_RCV()) === get_INTERRUPTED_RCV())) {
            segment.v11(index, true);
          }
          tmp_0 = _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0();
        }
        return tmp_0;
      }
    }
  }
  function shouldSendSuspend($this, curSendersAndCloseStatus) {
    if (_get_isClosedForSend0__kxgf9m(curSendersAndCloseStatus, $this))
      return false;
    // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
    var tmp$ret$0 = curSendersAndCloseStatus.nb(new Long(-1, 268435455));
    return !bufferOrRendezvousSend($this, tmp$ret$0);
  }
  function bufferOrRendezvousSend($this, curSenders) {
    var tmp;
    if (curSenders.z6(_get_bufferEndCounter__2d4hee($this)) < 0) {
      tmp = true;
    } else {
      // Inline function 'kotlin.Long.plus' call
      var this_0 = $this.n13();
      var other = $this.j11_1;
      var tmp$ret$0 = this_0.eb(toLong(other));
      tmp = curSenders.z6(tmp$ret$0) < 0;
    }
    return tmp;
  }
  function tryResumeReceiver(_this__u8e3s4, $this, element) {
    var tmp;
    if (isInterface(_this__u8e3s4, SelectInstance)) {
      tmp = _this__u8e3s4.u13($this, element);
    } else {
      if (_this__u8e3s4 instanceof ReceiveCatching) {
        if (!(_this__u8e3s4 instanceof ReceiveCatching))
          THROW_CCE();
        var tmp_0 = Companion_getInstance_1().s13(element);
        var tmp1_safe_receiver = $this.k11_1;
        tmp = tryResume0(_this__u8e3s4.t13_1, new ChannelResult(tmp_0), tmp1_safe_receiver == null ? null : bindCancellationFun(tmp1_safe_receiver, element, _this__u8e3s4.t13_1.t6()));
      } else {
        if (_this__u8e3s4 instanceof BufferedChannelIterator) {
          if (!(_this__u8e3s4 instanceof BufferedChannelIterator))
            THROW_CCE();
          tmp = _this__u8e3s4.q13(element);
        } else {
          if (isInterface(_this__u8e3s4, CancellableContinuation)) {
            if (!isInterface(_this__u8e3s4, CancellableContinuation))
              THROW_CCE();
            var tmp2_safe_receiver = $this.k11_1;
            tmp = tryResume0(_this__u8e3s4, element, tmp2_safe_receiver == null ? null : bindCancellationFun(tmp2_safe_receiver, element, _this__u8e3s4.t6()));
          } else {
            var message = 'Unexpected receiver type: ' + toString(_this__u8e3s4);
            throw IllegalStateException_init_$Create$(toString(message));
          }
        }
      }
    }
    return tmp;
  }
  function receiveOnNoWaiterSuspend($this, segment, index, r, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutineReusable.<anonymous>' call
    var cancellable = getOrCreateCancellableContinuation(intercepted($completion));
    try {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveOnNoWaiterSuspend.<anonymous>' call
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImplOnNoWaiter' call
      var updCellResult = updateCellReceive($this, segment, index, r, cancellable);
      if (updCellResult === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
        prepareReceiverForSuspension(cancellable, $this, segment, index);
      } else if (updCellResult === _get_FAILED_$accessor$yt74tm_h47uk8()) {
        if (r.z6($this.n12()) < 0) {
          segment.h12();
        }
        $l$block_0: {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl' call
          var segment_0 = $this.q11_1.kotlinx$atomicfu$value;
          $l$loop_0: while (true) {
            if ($this.o12()) {
              onClosedReceiveOnNoWaiterSuspend($this, cancellable);
              break $l$block_0;
            }
            var r_0 = $this.m11_1.atomicfu$getAndIncrement$long();
            // Inline function 'kotlin.Long.div' call
            var other = get_SEGMENT_SIZE();
            var id = r_0.v9(toLong(other));
            // Inline function 'kotlin.Long.rem' call
            var other_0 = get_SEGMENT_SIZE();
            var i = r_0.gb(toLong(other_0)).ea();
            if (!segment_0.cs_1.equals(id)) {
              var tmp0_elvis_lhs = findSegmentReceive($this, id, segment_0);
              var tmp;
              if (tmp0_elvis_lhs == null) {
                continue $l$loop_0;
              } else {
                tmp = tmp0_elvis_lhs;
              }
              segment_0 = tmp;
            }
            var updCellResult_0 = updateCellReceive($this, segment_0, i, r_0, cancellable);
            var tmp_0;
            if (updCellResult_0 === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
              var tmp1_safe_receiver = (!(cancellable == null) ? isInterface(cancellable, Waiter) : false) ? cancellable : null;
              if (tmp1_safe_receiver == null)
                null;
              else {
                prepareReceiverForSuspension(tmp1_safe_receiver, $this, segment_0, i);
              }
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImplOnNoWaiter.<anonymous>' call
              tmp_0 = Unit_instance;
            } else if (updCellResult_0 === _get_FAILED_$accessor$yt74tm_h47uk8()) {
              if (r_0.z6($this.n12()) < 0) {
                segment_0.h12();
              }
              continue $l$loop_0;
            } else if (updCellResult_0 === _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky()) {
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl.<anonymous>' call
              var message = 'unexpected';
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              segment_0.h12();
              var element = (updCellResult_0 == null ? true : !(updCellResult_0 == null)) ? updCellResult_0 : THROW_CCE();
              var tmp0_safe_receiver = $this.k11_1;
              var onCancellation = tmp0_safe_receiver == null ? null : bindCancellationFun(tmp0_safe_receiver, element, cancellable.t6());
              cancellable.er(element, onCancellation);
              tmp_0 = Unit_instance;
            }
            break $l$block_0;
          }
        }
      } else {
        segment.h12();
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveOnNoWaiterSuspend.<anonymous>.<anonymous>' call
        var element_0 = (updCellResult == null ? true : !(updCellResult == null)) ? updCellResult : THROW_CCE();
        var tmp0_safe_receiver_0 = $this.k11_1;
        var onCancellation_0 = tmp0_safe_receiver_0 == null ? null : bindCancellationFun(tmp0_safe_receiver_0, element_0, cancellable.t6());
        cancellable.er(element_0, onCancellation_0);
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        cancellable.bt();
        throw e;
      } else {
        throw $p;
      }
    }
    return cancellable.mq();
  }
  function prepareReceiverForSuspension(_this__u8e3s4, $this, segment, index) {
    $this.v13();
    _this__u8e3s4.et(segment, index);
  }
  function onClosedReceiveOnNoWaiterSuspend($this, cont) {
    // Inline function 'kotlin.coroutines.resumeWithException' call
    // Inline function 'kotlin.Companion.failure' call
    var exception = _get_receiveException__foorc1($this);
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception));
    cont.u6(tmp$ret$0);
  }
  function updateCellReceive($this, segment, index, r, waiter) {
    var state = segment.f11(index);
    if (state === null) {
      // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
      var senders = $this.l11_1.kotlinx$atomicfu$value.nb(new Long(-1, 268435455));
      if (r.z6(senders) >= 0) {
        if (waiter === null) {
          return _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky();
        }
        if (segment.h11(index, state, waiter)) {
          expandBuffer($this);
          return _get_SUSPEND_$accessor$yt74tm_ccb8g1();
        }
      }
    } else if (state === get_BUFFERED())
      if (segment.h11(index, state, get_DONE_RCV())) {
        expandBuffer($this);
        return segment.d11(index);
      }
    return updateCellReceiveSlow($this, segment, index, r, waiter);
  }
  function updateCellReceiveSlow($this, segment, index, r, waiter) {
    $l$loop: while (true) {
      var state = segment.f11(index);
      if (state === null ? true : state === get_IN_BUFFER()) {
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var senders = $this.l11_1.kotlinx$atomicfu$value.nb(new Long(-1, 268435455));
        if (r.z6(senders) < 0) {
          if (segment.h11(index, state, get_POISONED())) {
            expandBuffer($this);
            return _get_FAILED_$accessor$yt74tm_h47uk8();
          }
        } else {
          if (waiter === null) {
            return _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky();
          }
          if (segment.h11(index, state, waiter)) {
            expandBuffer($this);
            return _get_SUSPEND_$accessor$yt74tm_ccb8g1();
          }
        }
      } else if (state === get_BUFFERED()) {
        if (segment.h11(index, state, get_DONE_RCV())) {
          expandBuffer($this);
          return segment.d11(index);
        }
      } else if (state === get_INTERRUPTED_SEND())
        return _get_FAILED_$accessor$yt74tm_h47uk8();
      else if (state === get_POISONED())
        return _get_FAILED_$accessor$yt74tm_h47uk8();
      else if (state === get_CHANNEL_CLOSED()) {
        expandBuffer($this);
        return _get_FAILED_$accessor$yt74tm_h47uk8();
      } else if (state === get_RESUMING_BY_EB())
        continue $l$loop;
      else {
        if (segment.h11(index, state, get_RESUMING_BY_RCV())) {
          var helpExpandBuffer = state instanceof WaiterEB;
          var tmp;
          if (state instanceof WaiterEB) {
            tmp = state.p13_1;
          } else {
            tmp = state;
          }
          var sender = tmp;
          var tmp_0;
          if (tryResumeSender(sender, $this, segment, index)) {
            segment.g11(index, get_DONE_RCV());
            expandBuffer($this);
            tmp_0 = segment.d11(index);
          } else {
            segment.g11(index, get_INTERRUPTED_SEND());
            segment.v11(index, false);
            if (helpExpandBuffer) {
              expandBuffer($this);
            }
            tmp_0 = _get_FAILED_$accessor$yt74tm_h47uk8();
          }
          return tmp_0;
        }
      }
    }
  }
  function tryResumeSender(_this__u8e3s4, $this, segment, index) {
    var tmp;
    if (isInterface(_this__u8e3s4, CancellableContinuation)) {
      if (!isInterface(_this__u8e3s4, CancellableContinuation))
        THROW_CCE();
      tmp = tryResume0(_this__u8e3s4, Unit_instance);
    } else {
      if (isInterface(_this__u8e3s4, SelectInstance)) {
        if (!(_this__u8e3s4 instanceof SelectImplementation))
          THROW_CCE();
        var trySelectResult = _this__u8e3s4.a14($this, Unit_instance);
        if (trySelectResult === TrySelectDetailedResult_REREGISTER_getInstance()) {
          segment.e11(index);
        }
        tmp = trySelectResult === TrySelectDetailedResult_SUCCESSFUL_getInstance();
      } else {
        if (_this__u8e3s4 instanceof SendBroadcast) {
          tmp = tryResume0(_this__u8e3s4.w13_1, true);
        } else {
          var message = 'Unexpected waiter: ' + toString(_this__u8e3s4);
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    return tmp;
  }
  function expandBuffer($this) {
    if (_get_isRendezvousOrUnlimited__3mdufi($this))
      return Unit_instance;
    var segment = $this.r11_1.kotlinx$atomicfu$value;
    try_again: while (true) {
      var b = $this.n11_1.atomicfu$getAndIncrement$long();
      // Inline function 'kotlin.Long.div' call
      var other = get_SEGMENT_SIZE();
      var id = b.v9(toLong(other));
      var s = $this.n12();
      if (s.z6(b) <= 0) {
        if (segment.cs_1.z6(id) < 0 ? !(segment.d12() == null) : false) {
          moveSegmentBufferEndToSpecifiedOrLast($this, id, segment);
        }
        incCompletedExpandBufferAttempts$default($this);
        return Unit_instance;
      }
      if (!segment.cs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentBufferEnd($this, id, segment, b);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          continue try_again;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      // Inline function 'kotlin.Long.rem' call
      var other_0 = get_SEGMENT_SIZE();
      var i = b.gb(toLong(other_0)).ea();
      if (updateCellExpandBuffer($this, segment, i, b)) {
        incCompletedExpandBufferAttempts$default($this);
        return Unit_instance;
      } else {
        incCompletedExpandBufferAttempts$default($this);
        continue try_again;
      }
    }
  }
  function updateCellExpandBuffer($this, segment, index, b) {
    var state = segment.f11(index);
    if (!(state == null) ? isInterface(state, Waiter) : false) {
      if (b.z6($this.m11_1.kotlinx$atomicfu$value) >= 0) {
        if (segment.h11(index, state, get_RESUMING_BY_EB())) {
          var tmp;
          if (tryResumeSender(state, $this, segment, index)) {
            segment.g11(index, get_BUFFERED());
            tmp = true;
          } else {
            segment.g11(index, get_INTERRUPTED_SEND());
            segment.v11(index, false);
            tmp = false;
          }
          return tmp;
        }
      }
    }
    return updateCellExpandBufferSlow($this, segment, index, b);
  }
  function updateCellExpandBufferSlow($this, segment, index, b) {
    $l$loop: while (true) {
      var state = segment.f11(index);
      if (!(state == null) ? isInterface(state, Waiter) : false) {
        if (b.z6($this.m11_1.kotlinx$atomicfu$value) < 0) {
          if (segment.h11(index, state, new WaiterEB(state)))
            return true;
        } else {
          if (segment.h11(index, state, get_RESUMING_BY_EB())) {
            var tmp;
            if (tryResumeSender(state, $this, segment, index)) {
              segment.g11(index, get_BUFFERED());
              tmp = true;
            } else {
              segment.g11(index, get_INTERRUPTED_SEND());
              segment.v11(index, false);
              tmp = false;
            }
            return tmp;
          }
        }
      } else {
        if (state === get_INTERRUPTED_SEND())
          return false;
        else {
          if (state === null) {
            if (segment.h11(index, state, get_IN_BUFFER()))
              return true;
          } else {
            if (state === get_BUFFERED())
              return true;
            else {
              if ((state === get_POISONED() ? true : state === get_DONE_RCV()) ? true : state === get_INTERRUPTED_RCV())
                return true;
              else {
                if (state === get_CHANNEL_CLOSED())
                  return true;
                else {
                  if (state === get_RESUMING_BY_RCV())
                    continue $l$loop;
                  else {
                    var message = 'Unexpected cell state: ' + toString_0(state);
                    throw IllegalStateException_init_$Create$(toString(message));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  function incCompletedExpandBufferAttempts($this, nAttempts) {
    // Inline function 'kotlin.also' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.incCompletedExpandBufferAttempts.<anonymous>' call
    // Inline function 'kotlinx.coroutines.channels.ebPauseExpandBuffers' call
    if (!$this.o11_1.atomicfu$addAndGet$long(nAttempts).nb(new Long(0, 1073741824)).equals(new Long(0, 0))) {
      $l$loop: while (true) {
        // Inline function 'kotlinx.coroutines.channels.ebPauseExpandBuffers' call
        if (!!$this.o11_1.kotlinx$atomicfu$value.nb(new Long(0, 1073741824)).equals(new Long(0, 0))) {
          break $l$loop;
        }
      }
    }
  }
  function incCompletedExpandBufferAttempts$default($this, nAttempts, $super) {
    nAttempts = nAttempts === VOID ? new Long(1, 0) : nAttempts;
    return incCompletedExpandBufferAttempts($this, nAttempts);
  }
  function BufferedChannelIterator($outer) {
    this.l12_1 = $outer;
    this.j12_1 = get_NO_RECEIVE_RESULT();
    this.k12_1 = null;
  }
  protoOf(BufferedChannelIterator).b14 = function ($completion) {
    var tmp = new $hasNextCOROUTINE$8(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BufferedChannelIterator).et = function (segment, index) {
    var tmp0_safe_receiver = this.k12_1;
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.et(segment, index);
    }
  };
  protoOf(BufferedChannelIterator).f1 = function () {
    var result = this.j12_1;
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(result === get_NO_RECEIVE_RESULT())) {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannelIterator.next.<anonymous>' call
      var message = '`hasNext()` has not been invoked';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    this.j12_1 = get_NO_RECEIVE_RESULT();
    if (result === get_CHANNEL_CLOSED())
      throw recoverStackTrace_0(_get_receiveException__foorc1(this.l12_1));
    return (result == null ? true : !(result == null)) ? result : THROW_CCE();
  };
  protoOf(BufferedChannelIterator).q13 = function (element) {
    var cont = ensureNotNull(this.k12_1);
    this.k12_1 = null;
    this.j12_1 = element;
    var tmp0_safe_receiver = this.l12_1.k11_1;
    return tryResume0(cont, true, tmp0_safe_receiver == null ? null : bindCancellationFun(tmp0_safe_receiver, element, cont.t6()));
  };
  protoOf(BufferedChannelIterator).c14 = function () {
    var cont = ensureNotNull(this.k12_1);
    this.k12_1 = null;
    this.j12_1 = get_CHANNEL_CLOSED();
    var cause = this.l12_1.m12();
    if (cause == null) {
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(false);
      cont.u6(tmp$ret$0);
    } else {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      // Inline function 'kotlin.Companion.failure' call
      var exception = recoverStackTrace(cause, cont);
      var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
      cont.u6(tmp$ret$2);
    }
  };
  function _get_receiveException__foorc1($this) {
    var tmp0_elvis_lhs = $this.m12();
    return tmp0_elvis_lhs == null ? new ClosedReceiveChannelException(get_DEFAULT_CLOSE_MESSAGE()) : tmp0_elvis_lhs;
  }
  function invokeCloseHandler($this) {
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.getAndUpdate' call
      var this_0 = $this.u11_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.invokeCloseHandler.<anonymous>' call
        var tmp;
        if (cur === null) {
          tmp = get_CLOSE_HANDLER_CLOSED();
        } else {
          tmp = get_CLOSE_HANDLER_INVOKED();
        }
        var upd = tmp;
        if (this_0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$1 = cur;
          break $l$block;
        }
      }
    }
    var tmp0_elvis_lhs = tmp$ret$1;
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return Unit_instance;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var closeHandler = tmp_0;
    if (typeof closeHandler !== 'function')
      THROW_CCE();
    closeHandler($this.m12());
  }
  function markClosed($this) {
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      var this_0 = $this.l11_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.markClosed.<anonymous>' call
        // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
        var tmp;
        switch (cur.lb(60).ea()) {
          case 0:
            // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

            var tmp$ret$1 = cur.nb(new Long(-1, 268435455));
            tmp = constructSendersAndCloseStatus(tmp$ret$1, 2);
            break;
          case 1:
            // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

            var tmp$ret$2 = cur.nb(new Long(-1, 268435455));
            tmp = constructSendersAndCloseStatus(tmp$ret$2, 3);
            break;
          default:
            return Unit_instance;
        }
        var upd = tmp;
        if (this_0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$4 = Unit_instance;
          break $l$block;
        }
      }
    }
    return tmp$ret$4;
  }
  function markCancelled($this) {
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      var this_0 = $this.l11_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.markCancelled.<anonymous>' call
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var tmp$ret$0 = cur.nb(new Long(-1, 268435455));
        var upd = constructSendersAndCloseStatus(tmp$ret$0, 3);
        if (this_0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$2 = Unit_instance;
          break $l$block;
        }
      }
    }
    return tmp$ret$2;
  }
  function markCancellationStarted($this) {
    var tmp$ret$3;
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      var this_0 = $this.l11_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.markCancellationStarted.<anonymous>' call
        var tmp;
        // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
        if (cur.lb(60).ea() === 0) {
          // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
          var tmp$ret$1 = cur.nb(new Long(-1, 268435455));
          tmp = constructSendersAndCloseStatus(tmp$ret$1, 1);
        } else {
          return Unit_instance;
        }
        var upd = tmp;
        if (this_0.atomicfu$compareAndSet(cur, upd)) {
          tmp$ret$3 = Unit_instance;
          break $l$block;
        }
      }
    }
    return tmp$ret$3;
  }
  function completeCloseOrCancel($this) {
    $this.d14();
  }
  function completeClose($this, sendersCur) {
    var lastSegment = closeLinkedList($this);
    if ($this.f14()) {
      var lastBufferedCellGlobalIndex = markAllEmptyCellsAsClosed($this, lastSegment);
      if (!lastBufferedCellGlobalIndex.equals(new Long(-1, -1))) {
        $this.e14(lastBufferedCellGlobalIndex);
      }
    }
    cancelSuspendedReceiveRequests($this, lastSegment, sendersCur);
    return lastSegment;
  }
  function completeCancel($this, sendersCur) {
    var lastSegment = completeClose($this, sendersCur);
    removeUnprocessedElements($this, lastSegment);
  }
  function closeLinkedList($this) {
    var lastSegment = $this.r11_1.kotlinx$atomicfu$value;
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    var it = $this.p11_1.kotlinx$atomicfu$value;
    var tmp;
    if (it.cs_1.z6(lastSegment.cs_1) > 0) {
      lastSegment = it;
      tmp = Unit_instance;
    }
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    var it_0 = $this.q11_1.kotlinx$atomicfu$value;
    var tmp_0;
    if (it_0.cs_1.z6(lastSegment.cs_1) > 0) {
      lastSegment = it_0;
      tmp_0 = Unit_instance;
    }
    return close(lastSegment);
  }
  function markAllEmptyCellsAsClosed($this, lastSegment) {
    var segment = lastSegment;
    while (true) {
      var inductionVariable = get_SEGMENT_SIZE() - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.times' call
          var this_0 = segment.cs_1;
          var other = get_SEGMENT_SIZE();
          var globalIndex = this_0.w9(toLong(other)).eb(toLong(index));
          if (globalIndex.z6($this.n13()) < 0)
            return new Long(-1, -1);
          cell_update: while (true) {
            var state = segment.f11(index);
            if (state === null ? true : state === get_IN_BUFFER()) {
              if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                segment.x11();
                break cell_update;
              }
            } else if (state === get_BUFFERED())
              return globalIndex;
            else
              break cell_update;
          }
        }
         while (0 <= inductionVariable);
      var tmp1_elvis_lhs = segment.g12();
      var tmp;
      if (tmp1_elvis_lhs == null) {
        return new Long(-1, -1);
      } else {
        tmp = tmp1_elvis_lhs;
      }
      segment = tmp;
    }
  }
  function removeUnprocessedElements($this, lastSegment) {
    var onUndeliveredElement = $this.k11_1;
    var undeliveredElementException = null;
    var suspendedSenders = _InlineList___init__impl__z8n56();
    var segment = lastSegment;
    process_segments: while (true) {
      var inductionVariable = get_SEGMENT_SIZE() - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.times' call
          var this_0 = segment.cs_1;
          var other = get_SEGMENT_SIZE();
          var globalIndex = this_0.w9(toLong(other)).eb(toLong(index));
          update_cell: while (true) {
            var state = segment.f11(index);
            if (state === get_DONE_RCV())
              break process_segments;
            else {
              if (state === get_BUFFERED()) {
                if (globalIndex.z6($this.n13()) < 0)
                  break process_segments;
                if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                  if (!(onUndeliveredElement == null)) {
                    var element = segment.c11(index);
                    undeliveredElementException = callUndeliveredElementCatchingException(onUndeliveredElement, element, undeliveredElementException);
                  }
                  segment.e11(index);
                  segment.x11();
                  break update_cell;
                }
              } else {
                if (state === get_IN_BUFFER() ? true : state === null) {
                  if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                    segment.x11();
                    break update_cell;
                  }
                } else {
                  var tmp;
                  if (!(state == null) ? isInterface(state, Waiter) : false) {
                    tmp = true;
                  } else {
                    tmp = state instanceof WaiterEB;
                  }
                  if (tmp) {
                    if (globalIndex.z6($this.n13()) < 0)
                      break process_segments;
                    var tmp_0;
                    if (state instanceof WaiterEB) {
                      tmp_0 = state.p13_1;
                    } else {
                      tmp_0 = (!(state == null) ? isInterface(state, Waiter) : false) ? state : THROW_CCE();
                    }
                    var sender = tmp_0;
                    if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                      if (!(onUndeliveredElement == null)) {
                        var element_0 = segment.c11(index);
                        undeliveredElementException = callUndeliveredElementCatchingException(onUndeliveredElement, element_0, undeliveredElementException);
                      }
                      suspendedSenders = InlineList__plus_impl_nuetvo(suspendedSenders, sender);
                      segment.e11(index);
                      segment.x11();
                      break update_cell;
                    }
                  } else {
                    if (state === get_RESUMING_BY_EB() ? true : state === get_RESUMING_BY_RCV())
                      break process_segments;
                    else {
                      if (state === get_RESUMING_BY_EB())
                        continue update_cell;
                      else {
                        break update_cell;
                      }
                    }
                  }
                }
              }
            }
          }
        }
         while (0 <= inductionVariable);
      var tmp1_elvis_lhs = segment.g12();
      var tmp_1;
      if (tmp1_elvis_lhs == null) {
        break process_segments;
      } else {
        tmp_1 = tmp1_elvis_lhs;
      }
      segment = tmp_1;
    }
    $l$block: {
      // Inline function 'kotlinx.coroutines.internal.InlineList.forEachReversed' call
      var this_1 = suspendedSenders;
      var tmp0_subject = _get_holder__f6h5pd(this_1);
      if (tmp0_subject == null) {
        break $l$block;
      } else {
        if (!(tmp0_subject instanceof ArrayList)) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.removeUnprocessedElements.<anonymous>' call
          var tmp_2 = _get_holder__f6h5pd(this_1);
          var it = (tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE();
          resumeSenderOnCancelledChannel(it, $this);
        } else {
          var tmp_3 = _get_holder__f6h5pd(this_1);
          var list = tmp_3 instanceof ArrayList ? tmp_3 : THROW_CCE();
          var inductionVariable_0 = list.m() - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var i = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.removeUnprocessedElements.<anonymous>' call
              var it_0 = list.n(i);
              resumeSenderOnCancelledChannel(it_0, $this);
            }
             while (0 <= inductionVariable_0);
        }
      }
    }
    var tmp2_safe_receiver = undeliveredElementException;
    if (tmp2_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      throw tmp2_safe_receiver;
    }
  }
  function cancelSuspendedReceiveRequests($this, lastSegment, sendersCounter) {
    var suspendedReceivers = _InlineList___init__impl__z8n56();
    var segment = lastSegment;
    process_segments: while (!(segment == null)) {
      var inductionVariable = get_SEGMENT_SIZE() - 1 | 0;
      if (0 <= inductionVariable)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + -1 | 0;
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.times' call
          var this_0 = segment.cs_1;
          var other = get_SEGMENT_SIZE();
          if (this_0.w9(toLong(other)).eb(toLong(index)).z6(sendersCounter) < 0)
            break process_segments;
          cell_update: while (true) {
            var state = segment.f11(index);
            if (state === null ? true : state === get_IN_BUFFER()) {
              if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                segment.x11();
                break cell_update;
              }
            } else {
              if (state instanceof WaiterEB) {
                if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                  suspendedReceivers = InlineList__plus_impl_nuetvo(suspendedReceivers, state.p13_1);
                  segment.v11(index, true);
                  break cell_update;
                }
              } else {
                if (!(state == null) ? isInterface(state, Waiter) : false) {
                  if (segment.h11(index, state, get_CHANNEL_CLOSED())) {
                    suspendedReceivers = InlineList__plus_impl_nuetvo(suspendedReceivers, state);
                    segment.v11(index, true);
                    break cell_update;
                  }
                } else {
                  break cell_update;
                }
              }
            }
          }
        }
         while (0 <= inductionVariable);
      segment = segment.g12();
    }
    $l$block: {
      // Inline function 'kotlinx.coroutines.internal.InlineList.forEachReversed' call
      var this_1 = suspendedReceivers;
      var tmp0_subject = _get_holder__f6h5pd(this_1);
      if (tmp0_subject == null) {
        break $l$block;
      } else {
        if (!(tmp0_subject instanceof ArrayList)) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.cancelSuspendedReceiveRequests.<anonymous>' call
          var tmp = _get_holder__f6h5pd(this_1);
          var it = (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
          resumeReceiverOnClosedChannel(it, $this);
        } else {
          var tmp_0 = _get_holder__f6h5pd(this_1);
          var list = tmp_0 instanceof ArrayList ? tmp_0 : THROW_CCE();
          var inductionVariable_0 = list.m() - 1 | 0;
          if (0 <= inductionVariable_0)
            do {
              var i = inductionVariable_0;
              inductionVariable_0 = inductionVariable_0 + -1 | 0;
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.cancelSuspendedReceiveRequests.<anonymous>' call
              var it_0 = list.n(i);
              resumeReceiverOnClosedChannel(it_0, $this);
            }
             while (0 <= inductionVariable_0);
        }
      }
    }
  }
  function resumeReceiverOnClosedChannel(_this__u8e3s4, $this) {
    return resumeWaiterOnClosedChannel(_this__u8e3s4, $this, true);
  }
  function resumeSenderOnCancelledChannel(_this__u8e3s4, $this) {
    return resumeWaiterOnClosedChannel(_this__u8e3s4, $this, false);
  }
  function resumeWaiterOnClosedChannel(_this__u8e3s4, $this, receiver) {
    if (_this__u8e3s4 instanceof SendBroadcast) {
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = _this__u8e3s4.w13_1;
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(false);
      this_0.u6(tmp$ret$0);
    } else {
      if (isInterface(_this__u8e3s4, CancellableContinuation)) {
        // Inline function 'kotlin.coroutines.resumeWithException' call
        // Inline function 'kotlin.Companion.failure' call
        var exception = receiver ? _get_receiveException__foorc1($this) : $this.m13();
        var tmp$ret$2 = _Result___init__impl__xyqfz8(createFailure(exception));
        _this__u8e3s4.u6(tmp$ret$2);
      } else {
        if (_this__u8e3s4 instanceof ReceiveCatching) {
          // Inline function 'kotlin.coroutines.resume' call
          var this_1 = _this__u8e3s4.t13_1;
          // Inline function 'kotlin.Companion.success' call
          var value = new ChannelResult(Companion_getInstance_1().g14($this.m12()));
          var tmp$ret$4 = _Result___init__impl__xyqfz8(value);
          this_1.u6(tmp$ret$4);
        } else {
          if (_this__u8e3s4 instanceof BufferedChannelIterator) {
            _this__u8e3s4.c14();
          } else {
            if (isInterface(_this__u8e3s4, SelectInstance)) {
              _this__u8e3s4.u13($this, get_CHANNEL_CLOSED());
            } else {
              var message = 'Unexpected waiter: ' + _this__u8e3s4;
              throw IllegalStateException_init_$Create$(toString(message));
            }
          }
        }
      }
    }
  }
  function _get_isClosedForSend0__kxgf9m(_this__u8e3s4, $this) {
    return isClosed($this, _this__u8e3s4, false);
  }
  function _get_isClosedForReceive0__f7qknl(_this__u8e3s4, $this) {
    return isClosed($this, _this__u8e3s4, true);
  }
  function isClosed($this, sendersAndCloseStatusCur, isClosedForReceive) {
    // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
    var tmp;
    switch (sendersAndCloseStatusCur.lb(60).ea()) {
      case 0:
        tmp = false;
        break;
      case 1:
        tmp = false;
        break;
      case 2:
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

        var tmp$ret$1 = sendersAndCloseStatusCur.nb(new Long(-1, 268435455));
        completeClose($this, tmp$ret$1);
        tmp = isClosedForReceive ? !$this.h14() : true;
        break;
      case 3:
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call

        var tmp$ret$2 = sendersAndCloseStatusCur.nb(new Long(-1, 268435455));
        completeCancel($this, tmp$ret$2);
        tmp = true;
        break;
      default:
        // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call

        var message = 'unexpected close status: ' + sendersAndCloseStatusCur.lb(60).ea();
        throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function isCellNonEmpty($this, segment, index, globalIndex) {
    while (true) {
      var state = segment.f11(index);
      if (state === null ? true : state === get_IN_BUFFER()) {
        if (segment.h11(index, state, get_POISONED())) {
          expandBuffer($this);
          return false;
        }
      } else if (state === get_BUFFERED())
        return true;
      else if (state === get_INTERRUPTED_SEND())
        return false;
      else if (state === get_CHANNEL_CLOSED())
        return false;
      else if (state === get_DONE_RCV())
        return false;
      else if (state === get_POISONED())
        return false;
      else if (state === get_RESUMING_BY_EB())
        return true;
      else if (state === get_RESUMING_BY_RCV())
        return false;
      else
        return globalIndex.equals($this.n13());
    }
  }
  function findSegmentSend($this, id, startFrom) {
    // Inline function 'kotlin.let' call
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      var this_0 = $this.p11_1;
      var createNewSegment = createSegmentFunction();
      while (true) {
        var s = findSegmentInternal(startFrom, id, createNewSegment);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            var to = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
            while (true) {
              // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
              var cur = this_0.kotlinx$atomicfu$value;
              if (cur.cs_1.z6(to.cs_1) >= 0) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (!to.z11()) {
                tmp$ret$0 = false;
                break $l$block_1;
              }
              if (this_0.atomicfu$compareAndSet(cur, to)) {
                if (cur.a12()) {
                  cur.e1();
                }
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (to.a12()) {
                to.e1();
              }
            }
            tmp$ret$0 = Unit_instance;
          }
          tmp = tmp$ret$0;
        }
        if (tmp) {
          tmp$ret$1 = s;
          break $l$block_2;
        }
      }
    }
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.findSegmentSend.<anonymous>' call
    var it = tmp$ret$1;
    var tmp_0;
    if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(it)) {
      completeCloseOrCancel($this);
      // Inline function 'kotlin.Long.times' call
      var this_1 = startFrom.cs_1;
      var other = get_SEGMENT_SIZE();
      if (this_1.w9(toLong(other)).z6($this.n13()) < 0) {
        startFrom.h12();
      }
      tmp_0 = null;
    } else {
      var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(it);
      var tmp_1;
      if (segment.cs_1.z6(id) > 0) {
        // Inline function 'kotlin.Long.times' call
        var this_2 = segment.cs_1;
        var other_0 = get_SEGMENT_SIZE();
        var tmp$ret$3 = this_2.w9(toLong(other_0));
        updateSendersCounterIfLower($this, tmp$ret$3);
        // Inline function 'kotlin.Long.times' call
        var this_3 = segment.cs_1;
        var other_1 = get_SEGMENT_SIZE();
        if (this_3.w9(toLong(other_1)).z6($this.n13()) < 0) {
          segment.h12();
        }
        tmp_1 = null;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_1 = segment;
      }
      tmp_0 = tmp_1;
    }
    return tmp_0;
  }
  function findSegmentReceive($this, id, startFrom) {
    // Inline function 'kotlin.let' call
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      var this_0 = $this.q11_1;
      var createNewSegment = createSegmentFunction();
      while (true) {
        var s = findSegmentInternal(startFrom, id, createNewSegment);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            var to = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
            while (true) {
              // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
              var cur = this_0.kotlinx$atomicfu$value;
              if (cur.cs_1.z6(to.cs_1) >= 0) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (!to.z11()) {
                tmp$ret$0 = false;
                break $l$block_1;
              }
              if (this_0.atomicfu$compareAndSet(cur, to)) {
                if (cur.a12()) {
                  cur.e1();
                }
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (to.a12()) {
                to.e1();
              }
            }
            tmp$ret$0 = Unit_instance;
          }
          tmp = tmp$ret$0;
        }
        if (tmp) {
          tmp$ret$1 = s;
          break $l$block_2;
        }
      }
    }
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.findSegmentReceive.<anonymous>' call
    var it = tmp$ret$1;
    var tmp_0;
    if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(it)) {
      completeCloseOrCancel($this);
      // Inline function 'kotlin.Long.times' call
      var this_1 = startFrom.cs_1;
      var other = get_SEGMENT_SIZE();
      if (this_1.w9(toLong(other)).z6($this.n12()) < 0) {
        startFrom.h12();
      }
      tmp_0 = null;
    } else {
      var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(it);
      var tmp_1;
      if (!_get_isRendezvousOrUnlimited__3mdufi($this)) {
        // Inline function 'kotlin.Long.div' call
        var this_2 = _get_bufferEndCounter__2d4hee($this);
        var other_0 = get_SEGMENT_SIZE();
        var tmp$ret$3 = this_2.v9(toLong(other_0));
        tmp_1 = id.z6(tmp$ret$3) <= 0;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        $l$block_5: {
          // Inline function 'kotlinx.coroutines.internal.moveForward' call
          var this_3 = $this.r11_1;
          while (true) {
            // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
            var cur_0 = this_3.kotlinx$atomicfu$value;
            if (cur_0.cs_1.z6(segment.cs_1) >= 0) {
              break $l$block_5;
            }
            if (!segment.z11()) {
              break $l$block_5;
            }
            if (this_3.atomicfu$compareAndSet(cur_0, segment)) {
              if (cur_0.a12()) {
                cur_0.e1();
              }
              break $l$block_5;
            }
            if (segment.a12()) {
              segment.e1();
            }
          }
        }
      }
      var tmp_2;
      if (segment.cs_1.z6(id) > 0) {
        // Inline function 'kotlin.Long.times' call
        var this_4 = segment.cs_1;
        var other_1 = get_SEGMENT_SIZE();
        var tmp$ret$5 = this_4.w9(toLong(other_1));
        updateReceiversCounterIfLower($this, tmp$ret$5);
        // Inline function 'kotlin.Long.times' call
        var this_5 = segment.cs_1;
        var other_2 = get_SEGMENT_SIZE();
        if (this_5.w9(toLong(other_2)).z6($this.n12()) < 0) {
          segment.h12();
        }
        tmp_2 = null;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_2 = segment;
      }
      tmp_0 = tmp_2;
    }
    return tmp_0;
  }
  function findSegmentBufferEnd($this, id, startFrom, currentBufferEndCounter) {
    // Inline function 'kotlin.let' call
    var tmp$ret$1;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      var this_0 = $this.r11_1;
      var createNewSegment = createSegmentFunction();
      while (true) {
        var s = findSegmentInternal(startFrom, id, createNewSegment);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp$ret$0;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            var to = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
            while (true) {
              // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
              var cur = this_0.kotlinx$atomicfu$value;
              if (cur.cs_1.z6(to.cs_1) >= 0) {
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (!to.z11()) {
                tmp$ret$0 = false;
                break $l$block_1;
              }
              if (this_0.atomicfu$compareAndSet(cur, to)) {
                if (cur.a12()) {
                  cur.e1();
                }
                tmp$ret$0 = true;
                break $l$block_1;
              }
              if (to.a12()) {
                to.e1();
              }
            }
            tmp$ret$0 = Unit_instance;
          }
          tmp = tmp$ret$0;
        }
        if (tmp) {
          tmp$ret$1 = s;
          break $l$block_2;
        }
      }
    }
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.findSegmentBufferEnd.<anonymous>' call
    var it = tmp$ret$1;
    var tmp_0;
    if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(it)) {
      completeCloseOrCancel($this);
      moveSegmentBufferEndToSpecifiedOrLast($this, id, startFrom);
      incCompletedExpandBufferAttempts$default($this);
      tmp_0 = null;
    } else {
      var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(it);
      var tmp_1;
      if (segment.cs_1.z6(id) > 0) {
        // Inline function 'kotlin.Long.plus' call
        var tmp_2 = currentBufferEndCounter.eb(toLong(1));
        // Inline function 'kotlin.Long.times' call
        var this_1 = segment.cs_1;
        var other = get_SEGMENT_SIZE();
        var tmp$ret$3 = this_1.w9(toLong(other));
        if ($this.n11_1.atomicfu$compareAndSet(tmp_2, tmp$ret$3)) {
          // Inline function 'kotlin.Long.times' call
          var this_2 = segment.cs_1;
          var other_0 = get_SEGMENT_SIZE();
          var tmp$ret$4 = this_2.w9(toLong(other_0));
          incCompletedExpandBufferAttempts($this, tmp$ret$4.fb(currentBufferEndCounter));
        } else {
          incCompletedExpandBufferAttempts$default($this);
        }
        tmp_1 = null;
      } else {
        // Inline function 'kotlinx.coroutines.assert' call
        tmp_1 = segment;
      }
      tmp_0 = tmp_1;
    }
    return tmp_0;
  }
  function moveSegmentBufferEndToSpecifiedOrLast($this, id, startFrom) {
    var segment = startFrom;
    $l$loop: while (segment.cs_1.z6(id) < 0) {
      var tmp0_elvis_lhs = segment.d12();
      var tmp;
      if (tmp0_elvis_lhs == null) {
        break $l$loop;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      segment = tmp;
    }
    while (true) {
      $l$loop_0: while (segment.y11()) {
        var tmp1_elvis_lhs = segment.d12();
        var tmp_0;
        if (tmp1_elvis_lhs == null) {
          break $l$loop_0;
        } else {
          tmp_0 = tmp1_elvis_lhs;
        }
        segment = tmp_0;
      }
      var tmp$ret$0;
      $l$block_1: {
        // Inline function 'kotlinx.coroutines.internal.moveForward' call
        var this_0 = $this.r11_1;
        var to = segment;
        while (true) {
          // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
          var cur = this_0.kotlinx$atomicfu$value;
          if (cur.cs_1.z6(to.cs_1) >= 0) {
            tmp$ret$0 = true;
            break $l$block_1;
          }
          if (!to.z11()) {
            tmp$ret$0 = false;
            break $l$block_1;
          }
          if (this_0.atomicfu$compareAndSet(cur, to)) {
            if (cur.a12()) {
              cur.e1();
            }
            tmp$ret$0 = true;
            break $l$block_1;
          }
          if (to.a12()) {
            to.e1();
          }
        }
        tmp$ret$0 = Unit_instance;
      }
      if (tmp$ret$0)
        return Unit_instance;
    }
  }
  function updateSendersCounterIfLower($this, value) {
    var this_0 = $this.l11_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.updateSendersCounterIfLower.<anonymous>' call
      var cur = this_0.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
      var curCounter = cur.nb(new Long(-1, 268435455));
      if (curCounter.z6(value) >= 0)
        return Unit_instance;
      // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
      var tmp$ret$1 = cur.lb(60).ea();
      var update = constructSendersAndCloseStatus(curCounter, tmp$ret$1);
      if ($this.l11_1.atomicfu$compareAndSet(cur, update))
        return Unit_instance;
    }
    return Unit_instance;
  }
  function updateReceiversCounterIfLower($this, value) {
    var this_0 = $this.m11_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.updateReceiversCounterIfLower.<anonymous>' call
      var cur = this_0.kotlinx$atomicfu$value;
      if (cur.z6(value) >= 0)
        return Unit_instance;
      if ($this.m11_1.atomicfu$compareAndSet(cur, value))
        return Unit_instance;
    }
    return Unit_instance;
  }
  function BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda$lambda($element, this$0, $select) {
    return function (it) {
      var tmp;
      if (!($element === get_CHANNEL_CLOSED())) {
        callUndeliveredElement(this$0.k11_1, ($element == null ? true : !($element == null)) ? $element : THROW_CCE(), $select.t6());
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda(this$0) {
    return function (select, _anonymous_parameter_1__qggqgd, element) {
      return BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda$lambda(element, this$0, select);
    };
  }
  function $sendCOROUTINE$5(_this__u8e3s4, element, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.r14_1 = _this__u8e3s4;
    this.s14_1 = element;
  }
  protoOf($sendCOROUTINE$5).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 11;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0 = this;
            tmp_0.u14_1 = this.r14_1;
            var tmp_1 = this;
            tmp_1.v14_1 = this.s14_1;
            var tmp_2 = this;
            tmp_2.w14_1 = null;
            this.x14_1 = this.u14_1.p11_1.kotlinx$atomicfu$value;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            if (!true) {
              this.ac_1 = 12;
              continue $sm;
            }

            this.y14_1 = this.u14_1.l11_1.atomicfu$getAndIncrement$long();
            var tmp_3 = this;
            tmp_3.z14_1 = this.y14_1.nb(new Long(-1, 268435455));
            this.a15_1 = _get_isClosedForSend0__kxgf9m(this.y14_1, this.u14_1);
            var tmp_4 = this;
            var this_0 = this.z14_1;
            var other = get_SEGMENT_SIZE();
            tmp_4.b15_1 = this_0.v9(toLong(other));
            var tmp_5 = this;
            var this_1 = this.z14_1;
            var other_0 = get_SEGMENT_SIZE();
            tmp_5.c15_1 = this_1.gb(toLong(other_0)).ea();
            if (!this.x14_1.cs_1.equals(this.b15_1)) {
              this.d15_1 = findSegmentSend(this.u14_1, this.b15_1, this.x14_1);
              if (this.d15_1 == null) {
                if (this.a15_1) {
                  this.ac_1 = 10;
                  suspendResult = onClosedSend(this.r14_1, this.s14_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  this.ac_1 = 2;
                  continue $sm;
                }
              } else {
                this.e15_1 = this.d15_1;
                this.ac_1 = 3;
                continue $sm;
              }
            } else {
              this.ac_1 = 4;
              continue $sm;
            }

          case 3:
            this.x14_1 = this.e15_1;
            this.ac_1 = 4;
            continue $sm;
          case 4:
            this.f15_1 = updateCellSend(this.u14_1, this.x14_1, this.c15_1, this.v14_1, this.z14_1, this.w14_1, this.a15_1);
            if (this.f15_1 === _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8()) {
              this.x14_1.h12();
              var tmp_6 = this;
              tmp_6.t14_1 = Unit_instance;
              this.ac_1 = 13;
              continue $sm;
            } else {
              if (this.f15_1 === _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m()) {
                var tmp_7 = this;
                tmp_7.t14_1 = Unit_instance;
                this.ac_1 = 13;
                continue $sm;
              } else {
                if (this.f15_1 === _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf()) {
                  if (this.a15_1) {
                    this.x14_1.x11();
                    this.ac_1 = 9;
                    suspendResult = onClosedSend(this.r14_1, this.s14_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    this.ac_1 = 8;
                    continue $sm;
                  }
                } else {
                  if (this.f15_1 === _get_RESULT_CLOSED_$accessor$yt74tm_10v48j()) {
                    if (this.z14_1.z6(this.u14_1.n13()) < 0) {
                      this.x14_1.h12();
                    }
                    this.ac_1 = 7;
                    suspendResult = onClosedSend(this.r14_1, this.s14_1, this);
                    if (suspendResult === get_COROUTINE_SUSPENDED()) {
                      return suspendResult;
                    }
                    continue $sm;
                  } else {
                    if (this.f15_1 === _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0()) {
                      this.x14_1.h12();
                      this.ac_1 = 2;
                      continue $sm;
                    } else {
                      if (this.f15_1 === _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m()) {
                        var tmp_8 = this;
                        tmp_8.g15_1 = this.x14_1;
                        var tmp_9 = this;
                        tmp_9.h15_1 = this.c15_1;
                        var tmp_10 = this;
                        tmp_10.i15_1 = this.v14_1;
                        var tmp_11 = this;
                        tmp_11.j15_1 = this.z14_1;
                        this.ac_1 = 6;
                        suspendResult = sendOnNoWaiterSuspend(this.r14_1, this.g15_1, this.h15_1, this.i15_1, this.j15_1, this);
                        if (suspendResult === get_COROUTINE_SUSPENDED()) {
                          return suspendResult;
                        }
                        continue $sm;
                      } else {
                        this.ac_1 = 5;
                        continue $sm;
                      }
                    }
                  }
                }
              }
            }

          case 5:
            this.ac_1 = 2;
            continue $sm;
          case 6:
            this.t14_1 = suspendResult;
            this.ac_1 = 13;
            continue $sm;
          case 7:
            this.t14_1 = suspendResult;
            this.ac_1 = 13;
            continue $sm;
          case 8:
            var tmp_12 = this.w14_1;
            var tmp2_safe_receiver = (!(tmp_12 == null) ? isInterface(tmp_12, Waiter) : false) ? tmp_12 : null;
            if (tmp2_safe_receiver == null)
              null;
            else {
              prepareSenderForSuspension(tmp2_safe_receiver, this.u14_1, this.x14_1, this.c15_1);
            }

            var tmp_13 = this;
            this.x14_1;
            this.c15_1;
            tmp_13.t14_1 = Unit_instance;
            this.ac_1 = 13;
            continue $sm;
          case 9:
            this.t14_1 = suspendResult;
            this.ac_1 = 13;
            continue $sm;
          case 10:
            this.t14_1 = suspendResult;
            this.ac_1 = 13;
            continue $sm;
          case 11:
            throw this.dc_1;
          case 12:
            if (false) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 13;
            continue $sm;
          case 13:
            return Unit_instance;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 11) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function $receiveCOROUTINE$6(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.s15_1 = _this__u8e3s4;
  }
  protoOf($receiveCOROUTINE$6).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 8;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            var tmp_0 = this;
            tmp_0.u15_1 = this.s15_1;
            var tmp_1 = this;
            tmp_1.v15_1 = null;
            this.w15_1 = this.u15_1.q11_1.kotlinx$atomicfu$value;
            this.ac_1 = 2;
            continue $sm;
          case 2:
            if (!true) {
              this.ac_1 = 9;
              continue $sm;
            }

            if (this.u15_1.o12()) {
              var tmp_2 = this;
              throw recoverStackTrace_0(_get_receiveException__foorc1(this.s15_1));
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

          case 3:
            this.x15_1 = this.u15_1.m11_1.atomicfu$getAndIncrement$long();
            var tmp_3 = this;
            var this_0 = this.x15_1;
            var other = get_SEGMENT_SIZE();
            tmp_3.y15_1 = this_0.v9(toLong(other));
            var tmp_4 = this;
            var this_1 = this.x15_1;
            var other_0 = get_SEGMENT_SIZE();
            tmp_4.z15_1 = this_1.gb(toLong(other_0)).ea();
            if (!this.w15_1.cs_1.equals(this.y15_1)) {
              this.a16_1 = findSegmentReceive(this.u15_1, this.y15_1, this.w15_1);
              if (this.a16_1 == null) {
                this.ac_1 = 2;
                var tmp_5 = this;
                continue $sm;
              } else {
                this.b16_1 = this.a16_1;
                this.ac_1 = 4;
                continue $sm;
              }
            } else {
              this.ac_1 = 5;
              continue $sm;
            }

          case 4:
            this.w15_1 = this.b16_1;
            this.ac_1 = 5;
            continue $sm;
          case 5:
            this.c16_1 = updateCellReceive(this.u15_1, this.w15_1, this.z15_1, this.x15_1, this.v15_1);
            if (this.c16_1 === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
              var tmp_6 = this;
              var tmp_7 = this.v15_1;
              var tmp1_safe_receiver = (!(tmp_7 == null) ? isInterface(tmp_7, Waiter) : false) ? tmp_7 : null;
              if (tmp1_safe_receiver == null)
                null;
              else {
                prepareReceiverForSuspension(tmp1_safe_receiver, this.u15_1, this.w15_1, this.z15_1);
              }
              this.w15_1;
              this.z15_1;
              this.x15_1;
              var message = 'unexpected';
              throw IllegalStateException_init_$Create$(toString(message));
            } else {
              if (this.c16_1 === _get_FAILED_$accessor$yt74tm_h47uk8()) {
                if (this.x15_1.z6(this.u15_1.n12()) < 0) {
                  this.w15_1.h12();
                }
                this.ac_1 = 2;
                var tmp_8 = this;
                continue $sm;
              } else {
                if (this.c16_1 === _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky()) {
                  var tmp_9 = this;
                  tmp_9.e16_1 = this.w15_1;
                  var tmp_10 = this;
                  tmp_10.f16_1 = this.z15_1;
                  var tmp_11 = this;
                  tmp_11.g16_1 = this.x15_1;
                  this.ac_1 = 6;
                  suspendResult = receiveOnNoWaiterSuspend(this.s15_1, this.e16_1, this.f16_1, this.g16_1, this);
                  if (suspendResult === get_COROUTINE_SUSPENDED()) {
                    return suspendResult;
                  }
                  continue $sm;
                } else {
                  var tmp_12 = this;
                  this.w15_1.h12();
                  var tmp_13 = this.c16_1;
                  return (tmp_13 == null ? true : !(tmp_13 == null)) ? tmp_13 : THROW_CCE();
                }
              }
            }

          case 6:
            this.d16_1 = suspendResult;
            this.ac_1 = 7;
            continue $sm;
          case 7:
            this.t15_1 = this.d16_1;
            this.ac_1 = 10;
            continue $sm;
          case 8:
            throw this.dc_1;
          case 9:
            if (false) {
              this.ac_1 = 1;
              continue $sm;
            }

            this.ac_1 = 10;
            continue $sm;
          case 10:
            return this.t15_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 8) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function BufferedChannel(capacity, onUndeliveredElement) {
    onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
    this.j11_1 = capacity;
    this.k11_1 = onUndeliveredElement;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.j11_1 >= 0)) {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.<anonymous>' call
      var message = 'Invalid channel capacity: ' + this.j11_1 + ', should be >=0';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    this.l11_1 = atomic$long$1(new Long(0, 0));
    this.m11_1 = atomic$long$1(new Long(0, 0));
    this.n11_1 = atomic$long$1(initialBufferEnd(this.j11_1));
    this.o11_1 = atomic$long$1(_get_bufferEndCounter__2d4hee(this));
    var firstSegment = new ChannelSegment(new Long(0, 0), null, this, 3);
    this.p11_1 = atomic$ref$1(firstSegment);
    this.q11_1 = atomic$ref$1(firstSegment);
    var tmp = this;
    var tmp_0;
    if (_get_isRendezvousOrUnlimited__3mdufi(this)) {
      var tmp_1 = get_NULL_SEGMENT();
      tmp_0 = tmp_1 instanceof ChannelSegment ? tmp_1 : THROW_CCE();
    } else {
      tmp_0 = firstSegment;
    }
    tmp.r11_1 = atomic$ref$1(tmp_0);
    var tmp_2 = this;
    var tmp_3;
    if (this.k11_1 == null) {
      tmp_3 = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.onUndeliveredElementReceiveCancellationConstructor.<anonymous>' call
      tmp_3 = BufferedChannel$onUndeliveredElementReceiveCancellationConstructor$lambda(this);
    }
    tmp_2.s11_1 = tmp_3;
    this.t11_1 = atomic$ref$1(get_NO_CLOSE_CAUSE());
    this.u11_1 = atomic$ref$1(null);
  }
  protoOf(BufferedChannel).n12 = function () {
    // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
    return this.l11_1.kotlinx$atomicfu$value.nb(new Long(-1, 268435455));
  };
  protoOf(BufferedChannel).n13 = function () {
    return this.m11_1.kotlinx$atomicfu$value;
  };
  protoOf(BufferedChannel).h16 = function (element, $completion) {
    var tmp = new $sendCOROUTINE$5(this, element, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BufferedChannel).i16 = function (element) {
    if (shouldSendSuspend(this, this.l11_1.kotlinx$atomicfu$value))
      return Companion_getInstance_1().j16();
    var tmp$ret$4;
    $l$block_5: {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl' call
      var waiter = get_INTERRUPTED_SEND();
      var segment = this.p11_1.kotlinx$atomicfu$value;
      $l$loop_0: while (true) {
        var sendersAndCloseStatusCur = this.l11_1.atomicfu$getAndIncrement$long();
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var s = sendersAndCloseStatusCur.nb(new Long(-1, 268435455));
        var closed = _get_isClosedForSend0__kxgf9m(sendersAndCloseStatusCur, this);
        // Inline function 'kotlin.Long.div' call
        var other = get_SEGMENT_SIZE();
        var id = s.v9(toLong(other));
        // Inline function 'kotlin.Long.rem' call
        var other_0 = get_SEGMENT_SIZE();
        var i = s.gb(toLong(other_0)).ea();
        if (!segment.cs_1.equals(id)) {
          var tmp0_elvis_lhs = findSegmentSend(this, id, segment);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            var tmp_0;
            if (closed) {
              // Inline function 'kotlinx.coroutines.channels.BufferedChannel.trySend.<anonymous>' call
              tmp$ret$4 = Companion_getInstance_1().g14(this.m13());
              break $l$block_5;
            } else {
              continue $l$loop_0;
            }
          } else {
            tmp = tmp0_elvis_lhs;
          }
          segment = tmp;
        }
        var tmp1_subject = updateCellSend(this, segment, i, element, s, waiter, closed);
        if (tmp1_subject === _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8()) {
          segment.h12();
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.trySend.<anonymous>' call
          tmp$ret$4 = Companion_getInstance_1().s13(Unit_instance);
          break $l$block_5;
        } else if (tmp1_subject === _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m()) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.trySend.<anonymous>' call
          tmp$ret$4 = Companion_getInstance_1().s13(Unit_instance);
          break $l$block_5;
        } else if (tmp1_subject === _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf()) {
          if (closed) {
            segment.x11();
            // Inline function 'kotlinx.coroutines.channels.BufferedChannel.trySend.<anonymous>' call
            tmp$ret$4 = Companion_getInstance_1().g14(this.m13());
            break $l$block_5;
          }
          var tmp2_safe_receiver = (!(waiter == null) ? isInterface(waiter, Waiter) : false) ? waiter : null;
          if (tmp2_safe_receiver == null)
            null;
          else {
            prepareSenderForSuspension(tmp2_safe_receiver, this, segment, i);
          }
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.trySend.<anonymous>' call
          segment.x11();
          tmp$ret$4 = Companion_getInstance_1().j16();
          break $l$block_5;
        } else if (tmp1_subject === _get_RESULT_CLOSED_$accessor$yt74tm_10v48j()) {
          if (s.z6(this.n13()) < 0) {
            segment.h12();
          }
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.trySend.<anonymous>' call
          tmp$ret$4 = Companion_getInstance_1().g14(this.m13());
          break $l$block_5;
        } else if (tmp1_subject === _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0()) {
          segment.h12();
          continue $l$loop_0;
        } else if (tmp1_subject === _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m()) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl.<anonymous>' call
          var message = 'unexpected';
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    return tmp$ret$4;
  };
  protoOf(BufferedChannel).k16 = function (element) {
    var tmp$ret$3;
    $l$block: {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl' call
      var waiter = get_BUFFERED();
      var segment = this.p11_1.kotlinx$atomicfu$value;
      $l$loop_0: while (true) {
        var sendersAndCloseStatusCur = this.l11_1.atomicfu$getAndIncrement$long();
        // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
        var s = sendersAndCloseStatusCur.nb(new Long(-1, 268435455));
        var closed = _get_isClosedForSend0__kxgf9m(sendersAndCloseStatusCur, this);
        // Inline function 'kotlin.Long.div' call
        var other = get_SEGMENT_SIZE();
        var id = s.v9(toLong(other));
        // Inline function 'kotlin.Long.rem' call
        var other_0 = get_SEGMENT_SIZE();
        var i = s.gb(toLong(other_0)).ea();
        if (!segment.cs_1.equals(id)) {
          var tmp0_elvis_lhs = findSegmentSend(this, id, segment);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            var tmp_0;
            if (closed) {
              return Companion_getInstance_1().g14(this.m13());
            } else {
              continue $l$loop_0;
            }
          } else {
            tmp = tmp0_elvis_lhs;
          }
          segment = tmp;
        }
        var tmp1_subject = updateCellSend(this, segment, i, element, s, waiter, closed);
        if (tmp1_subject === _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8()) {
          segment.h12();
          return Companion_getInstance_1().s13(Unit_instance);
        } else if (tmp1_subject === _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m()) {
          return Companion_getInstance_1().s13(Unit_instance);
        } else if (tmp1_subject === _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf()) {
          if (closed) {
            segment.x11();
            return Companion_getInstance_1().g14(this.m13());
          }
          var tmp2_safe_receiver = (!(waiter == null) ? isInterface(waiter, Waiter) : false) ? waiter : null;
          if (tmp2_safe_receiver == null)
            null;
          else {
            prepareSenderForSuspension(tmp2_safe_receiver, this, segment, i);
          }
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.times' call
          var this_0 = segment.cs_1;
          var other_1 = get_SEGMENT_SIZE();
          var tmp$ret$5 = this_0.w9(toLong(other_1)).eb(toLong(i));
          this.e14(tmp$ret$5);
          return Companion_getInstance_1().s13(Unit_instance);
        } else if (tmp1_subject === _get_RESULT_CLOSED_$accessor$yt74tm_10v48j()) {
          if (s.z6(this.n13()) < 0) {
            segment.h12();
          }
          return Companion_getInstance_1().g14(this.m13());
        } else if (tmp1_subject === _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0()) {
          segment.h12();
          continue $l$loop_0;
        } else if (tmp1_subject === _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m()) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.sendImpl.<anonymous>' call
          var message = 'unexpected';
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
    }
    return tmp$ret$3;
  };
  protoOf(BufferedChannel).v13 = function () {
  };
  protoOf(BufferedChannel).o13 = function () {
  };
  protoOf(BufferedChannel).l16 = function ($completion) {
    var tmp = new $receiveCOROUTINE$6(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(BufferedChannel).m16 = function () {
    var r = this.m11_1.kotlinx$atomicfu$value;
    var sendersAndCloseStatusCur = this.l11_1.kotlinx$atomicfu$value;
    if (_get_isClosedForReceive0__f7qknl(sendersAndCloseStatusCur, this)) {
      return Companion_getInstance_1().g14(this.m12());
    }
    // Inline function 'kotlinx.coroutines.channels.sendersCounter' call
    var s = sendersAndCloseStatusCur.nb(new Long(-1, 268435455));
    if (r.z6(s) >= 0)
      return Companion_getInstance_1().j16();
    var tmp$ret$2;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl' call
      var waiter = get_INTERRUPTED_RCV();
      var segment = this.q11_1.kotlinx$atomicfu$value;
      $l$loop_0: while (true) {
        if (this.o12()) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.tryReceive.<anonymous>' call
          tmp$ret$2 = Companion_getInstance_1().g14(this.m12());
          break $l$block_0;
        }
        var r_0 = this.m11_1.atomicfu$getAndIncrement$long();
        // Inline function 'kotlin.Long.div' call
        var other = get_SEGMENT_SIZE();
        var id = r_0.v9(toLong(other));
        // Inline function 'kotlin.Long.rem' call
        var other_0 = get_SEGMENT_SIZE();
        var i = r_0.gb(toLong(other_0)).ea();
        if (!segment.cs_1.equals(id)) {
          var tmp0_elvis_lhs = findSegmentReceive(this, id, segment);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            continue $l$loop_0;
          } else {
            tmp = tmp0_elvis_lhs;
          }
          segment = tmp;
        }
        var updCellResult = updateCellReceive(this, segment, i, r_0, waiter);
        var tmp_0;
        if (updCellResult === _get_SUSPEND_$accessor$yt74tm_ccb8g1()) {
          var tmp1_safe_receiver = (!(waiter == null) ? isInterface(waiter, Waiter) : false) ? waiter : null;
          if (tmp1_safe_receiver == null)
            null;
          else {
            prepareReceiverForSuspension(tmp1_safe_receiver, this, segment, i);
          }
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.tryReceive.<anonymous>' call
          var segm = segment;
          this.w11(r_0);
          segm.x11();
          tmp_0 = Companion_getInstance_1().j16();
        } else if (updCellResult === _get_FAILED_$accessor$yt74tm_h47uk8()) {
          if (r_0.z6(this.n12()) < 0) {
            segment.h12();
          }
          continue $l$loop_0;
        } else if (updCellResult === _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky()) {
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.receiveImpl.<anonymous>' call
          var message = 'unexpected';
          throw IllegalStateException_init_$Create$(toString(message));
        } else {
          segment.h12();
          // Inline function 'kotlinx.coroutines.channels.BufferedChannel.tryReceive.<anonymous>' call
          var element = (updCellResult == null ? true : !(updCellResult == null)) ? updCellResult : THROW_CCE();
          tmp_0 = Companion_getInstance_1().s13(element);
        }
        tmp$ret$2 = tmp_0;
        break $l$block_0;
      }
    }
    return tmp$ret$2;
  };
  protoOf(BufferedChannel).e14 = function (globalCellIndex) {
    // Inline function 'kotlinx.coroutines.assert' call
    var segment = this.q11_1.kotlinx$atomicfu$value;
    $l$loop_0: while (true) {
      var r = this.m11_1.kotlinx$atomicfu$value;
      // Inline function 'kotlin.math.max' call
      // Inline function 'kotlin.Long.plus' call
      var other = this.j11_1;
      var a = r.eb(toLong(other));
      var b = _get_bufferEndCounter__2d4hee(this);
      var tmp$ret$1 = a.z6(b) >= 0 ? a : b;
      if (globalCellIndex.z6(tmp$ret$1) < 0)
        return Unit_instance;
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$2 = r.eb(toLong(1));
      if (!this.m11_1.atomicfu$compareAndSet(r, tmp$ret$2))
        continue $l$loop_0;
      // Inline function 'kotlin.Long.div' call
      var other_0 = get_SEGMENT_SIZE();
      var id = r.v9(toLong(other_0));
      // Inline function 'kotlin.Long.rem' call
      var other_1 = get_SEGMENT_SIZE();
      var i = r.gb(toLong(other_1)).ea();
      if (!segment.cs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentReceive(this, id, segment);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          continue $l$loop_0;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      var updCellResult = updateCellReceive(this, segment, i, r, null);
      if (updCellResult === _get_FAILED_$accessor$yt74tm_h47uk8()) {
        if (r.z6(this.n12()) < 0) {
          segment.h12();
        }
      } else {
        segment.h12();
        var tmp1_safe_receiver = this.k11_1;
        var tmp_0;
        if (tmp1_safe_receiver == null) {
          tmp_0 = null;
        } else {
          tmp_0 = callUndeliveredElementCatchingException(tmp1_safe_receiver, (updCellResult == null ? true : !(updCellResult == null)) ? updCellResult : THROW_CCE());
        }
        var tmp2_safe_receiver = tmp_0;
        if (tmp2_safe_receiver == null)
          null;
        else {
          // Inline function 'kotlin.let' call
          // Inline function 'kotlin.contracts.contract' call
          throw tmp2_safe_receiver;
        }
      }
    }
  };
  protoOf(BufferedChannel).w11 = function (globalIndex) {
    if (_get_isRendezvousOrUnlimited__3mdufi(this))
      return Unit_instance;
    while (_get_bufferEndCounter__2d4hee(this).z6(globalIndex) <= 0) {
    }
    // Inline function 'kotlin.repeat' call
    var times = get_EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS();
    // Inline function 'kotlin.contracts.contract' call
    var inductionVariable = 0;
    if (inductionVariable < times)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.waitExpandBufferCompletion.<anonymous>' call
        var b = _get_bufferEndCounter__2d4hee(this);
        // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
        var ebCompleted = this.o11_1.kotlinx$atomicfu$value.nb(new Long(-1, 1073741823));
        if (b.equals(ebCompleted) ? b.equals(_get_bufferEndCounter__2d4hee(this)) : false)
          return Unit_instance;
      }
       while (inductionVariable < times);
    $l$block: {
      // Inline function 'kotlinx.atomicfu.update' call
      var this_0 = this.o11_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.waitExpandBufferCompletion.<anonymous>' call
        // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
        var tmp$ret$1 = cur.nb(new Long(-1, 1073741823));
        var upd = constructEBCompletedAndPauseFlag(tmp$ret$1, true);
        if (this_0.atomicfu$compareAndSet(cur, upd)) {
          break $l$block;
        }
      }
    }
    while (true) {
      var b_0 = _get_bufferEndCounter__2d4hee(this);
      var ebCompletedAndBit = this.o11_1.kotlinx$atomicfu$value;
      // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
      var ebCompleted_0 = ebCompletedAndBit.nb(new Long(-1, 1073741823));
      // Inline function 'kotlinx.coroutines.channels.ebPauseExpandBuffers' call
      var pauseExpandBuffers = !ebCompletedAndBit.nb(new Long(0, 1073741824)).equals(new Long(0, 0));
      if (b_0.equals(ebCompleted_0) ? b_0.equals(_get_bufferEndCounter__2d4hee(this)) : false) {
        $l$block_0: {
          // Inline function 'kotlinx.atomicfu.update' call
          var this_1 = this.o11_1;
          while (true) {
            var cur_0 = this_1.kotlinx$atomicfu$value;
            // Inline function 'kotlinx.coroutines.channels.BufferedChannel.waitExpandBufferCompletion.<anonymous>' call
            // Inline function 'kotlinx.coroutines.channels.ebCompletedCounter' call
            var tmp$ret$6 = cur_0.nb(new Long(-1, 1073741823));
            var upd_0 = constructEBCompletedAndPauseFlag(tmp$ret$6, false);
            if (this_1.atomicfu$compareAndSet(cur_0, upd_0)) {
              break $l$block_0;
            }
          }
        }
        return Unit_instance;
      }
      if (!pauseExpandBuffers) {
        this.o11_1.atomicfu$compareAndSet(ebCompletedAndBit, constructEBCompletedAndPauseFlag(ebCompleted_0, true));
      }
    }
  };
  protoOf(BufferedChannel).o = function () {
    return new BufferedChannelIterator(this);
  };
  protoOf(BufferedChannel).m12 = function () {
    var tmp = this.t11_1.kotlinx$atomicfu$value;
    return (tmp == null ? true : tmp instanceof Error) ? tmp : THROW_CCE();
  };
  protoOf(BufferedChannel).m13 = function () {
    var tmp0_elvis_lhs = this.m12();
    return tmp0_elvis_lhs == null ? new ClosedSendChannelException(get_DEFAULT_CLOSE_MESSAGE()) : tmp0_elvis_lhs;
  };
  protoOf(BufferedChannel).n16 = function () {
  };
  protoOf(BufferedChannel).o16 = function (cause) {
    return this.p16(cause, false);
  };
  protoOf(BufferedChannel).sp = function (cause) {
    this.r16(cause);
  };
  protoOf(BufferedChannel).r16 = function (cause) {
    return this.p16(cause == null ? CancellationException_init_$Create$('Channel was cancelled') : cause, true);
  };
  protoOf(BufferedChannel).p16 = function (cause, cancel) {
    if (cancel) {
      markCancellationStarted(this);
    }
    var closedByThisOperation = this.t11_1.atomicfu$compareAndSet(get_NO_CLOSE_CAUSE(), cause);
    if (cancel) {
      markCancelled(this);
    } else {
      markClosed(this);
    }
    completeCloseOrCancel(this);
    // Inline function 'kotlin.also' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.BufferedChannel.closeOrCancelImpl.<anonymous>' call
    this.n16();
    if (closedByThisOperation) {
      invokeCloseHandler(this);
    }
    return closedByThisOperation;
  };
  protoOf(BufferedChannel).f14 = function () {
    return false;
  };
  protoOf(BufferedChannel).d14 = function () {
    return _get_isClosedForSend0__kxgf9m(this.l11_1.kotlinx$atomicfu$value, this);
  };
  protoOf(BufferedChannel).o12 = function () {
    return _get_isClosedForReceive0__f7qknl(this.l11_1.kotlinx$atomicfu$value, this);
  };
  protoOf(BufferedChannel).h14 = function () {
    $l$loop: while (true) {
      var segment = this.q11_1.kotlinx$atomicfu$value;
      var r = this.n13();
      var s = this.n12();
      if (s.z6(r) <= 0)
        return false;
      // Inline function 'kotlin.Long.div' call
      var other = get_SEGMENT_SIZE();
      var id = r.v9(toLong(other));
      if (!segment.cs_1.equals(id)) {
        var tmp0_elvis_lhs = findSegmentReceive(this, id, segment);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          var tmp_0;
          if (this.q11_1.kotlinx$atomicfu$value.cs_1.z6(id) < 0) {
            return false;
          } else {
            continue $l$loop;
          }
        } else {
          tmp = tmp0_elvis_lhs;
        }
        segment = tmp;
      }
      segment.h12();
      // Inline function 'kotlin.Long.rem' call
      var other_0 = get_SEGMENT_SIZE();
      var i = r.gb(toLong(other_0)).ea();
      if (isCellNonEmpty(this, segment, i, r))
        return true;
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$2 = r.eb(toLong(1));
      this.m11_1.atomicfu$compareAndSet(r, tmp$ret$2);
    }
  };
  protoOf(BufferedChannel).toString = function () {
    var sb = StringBuilder_init_$Create$();
    // Inline function 'kotlinx.coroutines.channels.sendersCloseStatus' call
    var tmp0_subject = this.l11_1.kotlinx$atomicfu$value.lb(60).ea();
    if (tmp0_subject === 2) {
      sb.y5('closed,');
    } else if (tmp0_subject === 3) {
      sb.y5('cancelled,');
    }
    sb.y5('capacity=' + this.j11_1 + ',');
    sb.y5('data=[');
    var tmp$ret$4;
    $l$block: {
      // Inline function 'kotlin.collections.minBy' call
      // Inline function 'kotlin.collections.filter' call
      // Inline function 'kotlin.collections.filterTo' call
      var this_0 = listOf([this.q11_1.kotlinx$atomicfu$value, this.p11_1.kotlinx$atomicfu$value, this.r11_1.kotlinx$atomicfu$value]);
      var destination = ArrayList_init_$Create$_0();
      var tmp0_iterator = this_0.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.toString.<anonymous>' call
        if (!(element === get_NULL_SEGMENT())) {
          destination.a1(element);
        }
      }
      var iterator = destination.o();
      if (!iterator.d1())
        throw NoSuchElementException_init_$Create$();
      var minElem = iterator.f1();
      if (!iterator.d1()) {
        tmp$ret$4 = minElem;
        break $l$block;
      }
      // Inline function 'kotlinx.coroutines.channels.BufferedChannel.toString.<anonymous>' call
      var minValue = minElem.cs_1;
      do {
        var e = iterator.f1();
        // Inline function 'kotlinx.coroutines.channels.BufferedChannel.toString.<anonymous>' call
        var v = e.cs_1;
        if (compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
       while (iterator.d1());
      tmp$ret$4 = minElem;
    }
    var firstSegment = tmp$ret$4;
    var r = this.n13();
    var s = this.n12();
    var segment = firstSegment;
    append_elements: while (true) {
      var inductionVariable = 0;
      var last_0 = get_SEGMENT_SIZE();
      if (inductionVariable < last_0)
        process_cell: do {
          var i = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlin.Long.plus' call
          // Inline function 'kotlin.Long.times' call
          var this_1 = segment.cs_1;
          var other = get_SEGMENT_SIZE();
          var globalCellIndex = this_1.w9(toLong(other)).eb(toLong(i));
          if (globalCellIndex.z6(s) >= 0 ? globalCellIndex.z6(r) >= 0 : false)
            break append_elements;
          var cellState = segment.f11(i);
          var element_0 = segment.c11(i);
          var tmp;
          if (!(cellState == null) ? isInterface(cellState, CancellableContinuation) : false) {
            tmp = (globalCellIndex.z6(r) < 0 ? globalCellIndex.z6(s) >= 0 : false) ? 'receive' : (globalCellIndex.z6(s) < 0 ? globalCellIndex.z6(r) >= 0 : false) ? 'send' : 'cont';
          } else {
            if (!(cellState == null) ? isInterface(cellState, SelectInstance) : false) {
              tmp = (globalCellIndex.z6(r) < 0 ? globalCellIndex.z6(s) >= 0 : false) ? 'onReceive' : (globalCellIndex.z6(s) < 0 ? globalCellIndex.z6(r) >= 0 : false) ? 'onSend' : 'select';
            } else {
              if (cellState instanceof ReceiveCatching) {
                tmp = 'receiveCatching';
              } else {
                if (cellState instanceof SendBroadcast) {
                  tmp = 'sendBroadcast';
                } else {
                  if (cellState instanceof WaiterEB) {
                    tmp = 'EB(' + toString_0(cellState) + ')';
                  } else {
                    if (equals(cellState, get_RESUMING_BY_RCV()) ? true : equals(cellState, get_RESUMING_BY_EB())) {
                      tmp = 'resuming_sender';
                    } else {
                      if ((((((cellState == null ? true : equals(cellState, get_IN_BUFFER())) ? true : equals(cellState, get_DONE_RCV())) ? true : equals(cellState, get_POISONED())) ? true : equals(cellState, get_INTERRUPTED_RCV())) ? true : equals(cellState, get_INTERRUPTED_SEND())) ? true : equals(cellState, get_CHANNEL_CLOSED())) {
                        continue process_cell;
                      } else {
                        tmp = toString(cellState);
                      }
                    }
                  }
                }
              }
            }
          }
          var cellStateString = tmp;
          if (!(element_0 == null)) {
            sb.y5('(' + cellStateString + ',' + element_0 + '),');
          } else {
            sb.y5(cellStateString + ',');
          }
        }
         while (inductionVariable < last_0);
      var tmp3_elvis_lhs = segment.d12();
      var tmp_0;
      if (tmp3_elvis_lhs == null) {
        break append_elements;
      } else {
        tmp_0 = tmp3_elvis_lhs;
      }
      segment = tmp_0;
    }
    if (last(sb) === _Char___init__impl__6a9atx(44)) {
      sb.v8(sb.a() - 1 | 0);
    }
    sb.y5(']');
    return sb.toString();
  };
  function WaiterEB(waiter) {
    this.p13_1 = waiter;
  }
  protoOf(WaiterEB).toString = function () {
    return 'WaiterEB(' + this.p13_1 + ')';
  };
  function initialBufferEnd(capacity) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    var tmp;
    Factory_getInstance();
    if (capacity === 0) {
      tmp = new Long(0, 0);
    } else {
      Factory_getInstance();
      if (capacity === 2147483647) {
        tmp = new Long(-1, 2147483647);
      } else {
        tmp = toLong(capacity);
      }
    }
    return tmp;
  }
  function ReceiveCatching() {
  }
  function tryResume0(_this__u8e3s4, value, onCancellation) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    _init_properties_BufferedChannel_kt__d6uc4y();
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.channels.tryResume0.<anonymous>' call
    var token = _this__u8e3s4.yq(value, null, onCancellation);
    var tmp;
    if (!(token == null)) {
      _this__u8e3s4.zq(token);
      tmp = true;
    } else {
      tmp = false;
    }
    return tmp;
  }
  function constructEBCompletedAndPauseFlag(counter, pauseEB) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return (pauseEB ? new Long(0, 1073741824) : new Long(0, 0)).eb(counter);
  }
  function constructSendersAndCloseStatus(counter, closeStatus) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return toLong(closeStatus).kb(60).eb(counter);
  }
  function createSegmentFunction() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return createSegment$ref();
  }
  function createSegment(id, prev) {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return new ChannelSegment(id, prev, prev.z10(), 0);
  }
  function _get_RESULT_SUSPEND_NO_WAITER_$accessor$yt74tm_cvzv8m() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return 3;
  }
  function _get_RESULT_RENDEZVOUS_$accessor$yt74tm_3irwt8() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return 0;
  }
  function _get_RESULT_BUFFERED_$accessor$yt74tm_quor5m() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return 1;
  }
  function _get_RESULT_SUSPEND_$accessor$yt74tm_cjypnf() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return 2;
  }
  function _get_RESULT_CLOSED_$accessor$yt74tm_10v48j() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return 4;
  }
  function _get_RESULT_FAILED_$accessor$yt74tm_vo1zj0() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return 5;
  }
  function _get_SUSPEND_NO_WAITER_$accessor$yt74tm_n6n1ky() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return get_SUSPEND_NO_WAITER();
  }
  function _get_SUSPEND_$accessor$yt74tm_ccb8g1() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return get_SUSPEND();
  }
  function _get_FAILED_$accessor$yt74tm_h47uk8() {
    _init_properties_BufferedChannel_kt__d6uc4y();
    return get_FAILED();
  }
  function createSegment$ref() {
    var l = function (p0, p1) {
      return createSegment(p0, p1);
    };
    l.callableName = 'createSegment';
    return l;
  }
  var properties_initialized_BufferedChannel_kt_58tjvw;
  function _init_properties_BufferedChannel_kt__d6uc4y() {
    if (!properties_initialized_BufferedChannel_kt_58tjvw) {
      properties_initialized_BufferedChannel_kt_58tjvw = true;
      NULL_SEGMENT = new ChannelSegment(new Long(-1, -1), null, null, 0);
      SEGMENT_SIZE = systemProp('kotlinx.coroutines.bufferedChannel.segmentSize', 32);
      EXPAND_BUFFER_COMPLETION_WAIT_ITERATIONS = systemProp('kotlinx.coroutines.bufferedChannel.expandBufferCompletionWaitIterations', 10000);
      BUFFERED = new Symbol('BUFFERED');
      IN_BUFFER = new Symbol('SHOULD_BUFFER');
      RESUMING_BY_RCV = new Symbol('S_RESUMING_BY_RCV');
      RESUMING_BY_EB = new Symbol('RESUMING_BY_EB');
      POISONED = new Symbol('POISONED');
      DONE_RCV = new Symbol('DONE_RCV');
      INTERRUPTED_SEND = new Symbol('INTERRUPTED_SEND');
      INTERRUPTED_RCV = new Symbol('INTERRUPTED_RCV');
      CHANNEL_CLOSED = new Symbol('CHANNEL_CLOSED');
      SUSPEND = new Symbol('SUSPEND');
      SUSPEND_NO_WAITER = new Symbol('SUSPEND_NO_WAITER');
      FAILED = new Symbol('FAILED');
      NO_RECEIVE_RESULT = new Symbol('NO_RECEIVE_RESULT');
      CLOSE_HANDLER_CLOSED = new Symbol('CLOSE_HANDLER_CLOSED');
      CLOSE_HANDLER_INVOKED = new Symbol('CLOSE_HANDLER_INVOKED');
      NO_CLOSE_CAUSE = new Symbol('NO_CLOSE_CAUSE');
    }
  }
  function Factory() {
    Factory_instance = this;
    this.s16_1 = 2147483647;
    this.t16_1 = 0;
    this.u16_1 = -1;
    this.v16_1 = -2;
    this.w16_1 = -3;
    this.x16_1 = 'kotlinx.coroutines.channels.defaultBuffer';
    this.y16_1 = systemProp('kotlinx.coroutines.channels.defaultBuffer', 64, 1, 2147483646);
  }
  var Factory_instance;
  function Factory_getInstance() {
    if (Factory_instance == null)
      new Factory();
    return Factory_instance;
  }
  function _ChannelResult___init__impl__siwsuf(holder) {
    return holder;
  }
  function _ChannelResult___get_holder__impl__pm9gzw($this) {
    return $this;
  }
  function _ChannelResult___get_isSuccess__impl__odq1z9($this) {
    var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
    return !(tmp instanceof Failed);
  }
  function _ChannelResult___get_isClosed__impl__mg7kuu($this) {
    var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
    return tmp instanceof Closed;
  }
  function ChannelResult__getOrNull_impl_f5e07h($this) {
    var tmp;
    var tmp_0 = _ChannelResult___get_holder__impl__pm9gzw($this);
    if (!(tmp_0 instanceof Failed)) {
      var tmp_1 = _ChannelResult___get_holder__impl__pm9gzw($this);
      tmp = (tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE();
    } else {
      tmp = null;
    }
    return tmp;
  }
  function ChannelResult__exceptionOrNull_impl_16ei30($this) {
    var tmp = _ChannelResult___get_holder__impl__pm9gzw($this);
    var tmp0_safe_receiver = tmp instanceof Closed ? tmp : null;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.z16_1;
  }
  function Failed() {
  }
  protoOf(Failed).toString = function () {
    return 'Failed';
  };
  function Closed(cause) {
    Failed.call(this);
    this.z16_1 = cause;
  }
  protoOf(Closed).equals = function (other) {
    var tmp;
    if (other instanceof Closed) {
      tmp = equals(this.z16_1, other.z16_1);
    } else {
      tmp = false;
    }
    return tmp;
  };
  protoOf(Closed).hashCode = function () {
    // Inline function 'kotlin.hashCode' call
    var tmp0_safe_receiver = this.z16_1;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs;
  };
  protoOf(Closed).toString = function () {
    return 'Closed(' + this.z16_1 + ')';
  };
  function Companion() {
    Companion_instance_0 = this;
    this.r13_1 = new Failed();
  }
  protoOf(Companion).s13 = function (value) {
    return _ChannelResult___init__impl__siwsuf(value);
  };
  protoOf(Companion).j16 = function () {
    return _ChannelResult___init__impl__siwsuf(this.r13_1);
  };
  protoOf(Companion).g14 = function (cause) {
    return _ChannelResult___init__impl__siwsuf(new Closed(cause));
  };
  var Companion_instance_0;
  function Companion_getInstance_1() {
    if (Companion_instance_0 == null)
      new Companion();
    return Companion_instance_0;
  }
  function ChannelResult__toString_impl_rrcqu7($this) {
    var tmp;
    if (_ChannelResult___get_holder__impl__pm9gzw($this) instanceof Closed) {
      tmp = toString(_ChannelResult___get_holder__impl__pm9gzw($this));
    } else {
      tmp = 'Value(' + toString_0(_ChannelResult___get_holder__impl__pm9gzw($this)) + ')';
    }
    return tmp;
  }
  function ChannelResult__hashCode_impl_lilec2($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function ChannelResult__equals_impl_f471ri($this, other) {
    if (!(other instanceof ChannelResult))
      return false;
    var tmp0_other_with_cast = other instanceof ChannelResult ? other.a17_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function ChannelResult(holder) {
    Companion_getInstance_1();
    this.a17_1 = holder;
  }
  protoOf(ChannelResult).toString = function () {
    return ChannelResult__toString_impl_rrcqu7(this.a17_1);
  };
  protoOf(ChannelResult).hashCode = function () {
    return ChannelResult__hashCode_impl_lilec2(this.a17_1);
  };
  protoOf(ChannelResult).equals = function (other) {
    return ChannelResult__equals_impl_f471ri(this.a17_1, other);
  };
  function ClosedSendChannelException(message) {
    IllegalStateException_init_$Init$(message, this);
    captureStack(this, ClosedSendChannelException);
  }
  function ClosedReceiveChannelException(message) {
    NoSuchElementException_init_$Init$(message, this);
    captureStack(this, ClosedReceiveChannelException);
  }
  function SendChannel() {
  }
  function ReceiveChannel() {
  }
  function Channel(capacity, onBufferOverflow, onUndeliveredElement) {
    capacity = capacity === VOID ? 0 : capacity;
    onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
    onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
    var tmp;
    switch (capacity) {
      case 0:
        tmp = onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()) ? new BufferedChannel(0, onUndeliveredElement) : new ConflatedBufferedChannel(1, onBufferOverflow, onUndeliveredElement);
        break;
      case -1:
        // Inline function 'kotlin.require' call

        // Inline function 'kotlin.contracts.contract' call

        if (!onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance())) {
          // Inline function 'kotlinx.coroutines.channels.Channel.<anonymous>' call
          var message = 'CONFLATED capacity cannot be used with non-default onBufferOverflow';
          throw IllegalArgumentException_init_$Create$(toString(message));
        }

        tmp = new ConflatedBufferedChannel(1, BufferOverflow_DROP_OLDEST_getInstance(), onUndeliveredElement);
        break;
      case 2147483647:
        tmp = new BufferedChannel(2147483647, onUndeliveredElement);
        break;
      case -2:
        tmp = onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()) ? new BufferedChannel(Factory_getInstance().y16_1, onUndeliveredElement) : new ConflatedBufferedChannel(1, onBufferOverflow, onUndeliveredElement);
        break;
      default:
        tmp = onBufferOverflow === BufferOverflow_SUSPEND_getInstance() ? new BufferedChannel(capacity, onUndeliveredElement) : new ConflatedBufferedChannel(capacity, onBufferOverflow, onUndeliveredElement);
        break;
    }
    return tmp;
  }
  function ChannelCoroutine(parentContext, _channel, initParentJob, active) {
    AbstractCoroutine.call(this, parentContext, initParentJob, active);
    this.f17_1 = _channel;
  }
  protoOf(ChannelCoroutine).o16 = function (cause) {
    return this.f17_1.o16(cause);
  };
  protoOf(ChannelCoroutine).o = function () {
    return this.f17_1.o();
  };
  protoOf(ChannelCoroutine).l16 = function ($completion) {
    return this.f17_1.l16($completion);
  };
  protoOf(ChannelCoroutine).h16 = function (element, $completion) {
    return this.f17_1.h16(element, $completion);
  };
  protoOf(ChannelCoroutine).m16 = function () {
    return this.f17_1.m16();
  };
  protoOf(ChannelCoroutine).i16 = function (element) {
    return this.f17_1.i16(element);
  };
  protoOf(ChannelCoroutine).sp = function (cause) {
    if (this.gp())
      return Unit_instance;
    var tmp;
    if (cause == null) {
      // Inline function 'kotlinx.coroutines.JobSupport.defaultCancellationException' call
      tmp = new JobCancellationException(null == null ? this.no() : null, null, this);
    } else {
      tmp = cause;
    }
    this.up(tmp);
  };
  protoOf(ChannelCoroutine).b17 = function (cause, $super) {
    return this.tp(cause, ($super == null ? true : $super instanceof ChannelCoroutine) ? $super : THROW_CCE());
  };
  protoOf(ChannelCoroutine).up = function (cause) {
    var exception = this.lp(cause);
    this.f17_1.sp(exception);
    this.xp(exception);
  };
  function get_DEFAULT_CLOSE_MESSAGE() {
    return DEFAULT_CLOSE_MESSAGE;
  }
  var DEFAULT_CLOSE_MESSAGE;
  function cancelConsumed(_this__u8e3s4, cause) {
    var tmp;
    if (cause == null) {
      tmp = null;
    } else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.channels.cancelConsumed.<anonymous>' call
      var tmp0_elvis_lhs = cause instanceof CancellationException ? cause : null;
      tmp = tmp0_elvis_lhs == null ? CancellationException_init_$Create$_0('Channel was consumed, consumer had failed', cause) : tmp0_elvis_lhs;
    }
    _this__u8e3s4.sp(tmp);
  }
  function trySendImpl($this, element, isSendOp) {
    return $this.t17_1 === BufferOverflow_DROP_LATEST_getInstance() ? trySendDropLatest($this, element, isSendOp) : $this.k16(element);
  }
  function trySendDropLatest($this, element, isSendOp) {
    var result = protoOf(BufferedChannel).i16.call($this, element);
    if (_ChannelResult___get_isSuccess__impl__odq1z9(result) ? true : _ChannelResult___get_isClosed__impl__mg7kuu(result))
      return result;
    if (isSendOp) {
      var tmp0_safe_receiver = $this.k11_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : callUndeliveredElementCatchingException(tmp0_safe_receiver, element);
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        throw tmp1_safe_receiver;
      }
    }
    return Companion_getInstance_1().s13(Unit_instance);
  }
  function ConflatedBufferedChannel(capacity, onBufferOverflow, onUndeliveredElement) {
    onUndeliveredElement = onUndeliveredElement === VOID ? null : onUndeliveredElement;
    BufferedChannel.call(this, capacity, onUndeliveredElement);
    this.s17_1 = capacity;
    this.t17_1 = onBufferOverflow;
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!!(this.t17_1 === BufferOverflow_SUSPEND_getInstance())) {
      // Inline function 'kotlinx.coroutines.channels.ConflatedBufferedChannel.<anonymous>' call
      var message = 'This implementation does not support suspension for senders, use ' + getKClass(BufferedChannel).e7() + ' instead';
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.s17_1 >= 1)) {
      // Inline function 'kotlinx.coroutines.channels.ConflatedBufferedChannel.<anonymous>' call
      var message_0 = 'Buffered channel capacity must be at least 1, but ' + this.s17_1 + ' was specified';
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
  }
  protoOf(ConflatedBufferedChannel).f14 = function () {
    return this.t17_1.equals(BufferOverflow_DROP_OLDEST_getInstance());
  };
  protoOf(ConflatedBufferedChannel).h16 = function (element, $completion) {
    // Inline function 'kotlinx.coroutines.channels.onClosed' call
    var this_0 = trySendImpl(this, element, true);
    // Inline function 'kotlin.contracts.contract' call
    var tmp = _ChannelResult___get_holder__impl__pm9gzw(this_0);
    if (tmp instanceof Closed) {
      // Inline function 'kotlinx.coroutines.channels.ConflatedBufferedChannel.send.<anonymous>' call
      ChannelResult__exceptionOrNull_impl_16ei30(this_0);
      var tmp0_safe_receiver = this.k11_1;
      var tmp1_safe_receiver = tmp0_safe_receiver == null ? null : callUndeliveredElementCatchingException(tmp0_safe_receiver, element);
      if (tmp1_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.let' call
        // Inline function 'kotlin.contracts.contract' call
        addSuppressed(tmp1_safe_receiver, this.m13());
        throw tmp1_safe_receiver;
      }
      throw this.m13();
    }
    return Unit_instance;
  };
  protoOf(ConflatedBufferedChannel).i16 = function (element) {
    return trySendImpl(this, element, false);
  };
  function ProducerScope() {
  }
  function produce(_this__u8e3s4, context, capacity, onBufferOverflow, start, onCompletion, block) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    capacity = capacity === VOID ? 0 : capacity;
    onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
    start = start === VOID ? CoroutineStart_DEFAULT_getInstance() : start;
    onCompletion = onCompletion === VOID ? null : onCompletion;
    var channel = Channel(capacity, onBufferOverflow);
    var newContext = newCoroutineContext(_this__u8e3s4, context);
    var coroutine = new ProducerCoroutine(newContext, channel);
    if (!(onCompletion == null)) {
      coroutine.mp(onCompletion);
    }
    coroutine.xo(start, coroutine, block);
    return coroutine;
  }
  function ProducerCoroutine(parentContext, channel) {
    ChannelCoroutine.call(this, parentContext, channel, true, true);
  }
  protoOf(ProducerCoroutine).ko = function () {
    return protoOf(ChannelCoroutine).ko.call(this);
  };
  protoOf(ProducerCoroutine).y17 = function (value) {
    this.f17_1.q16();
  };
  protoOf(ProducerCoroutine).lo = function (value) {
    return this.y17(value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(ProducerCoroutine).mo = function (cause, handled) {
    var processed = this.f17_1.o16(cause);
    if (!processed ? !handled : false) {
      handleCoroutineException(this.io_1, cause);
    }
  };
  protoOf(ProducerCoroutine).b17 = function (cause, $super) {
    return this.tp(cause, ($super == null ? true : $super instanceof ProducerCoroutine) ? $super : THROW_CCE());
  };
  function flow(block) {
    return new SafeFlow(block);
  }
  function SafeFlow(block) {
    AbstractFlow.call(this);
    this.z17_1 = block;
  }
  protoOf(SafeFlow).a18 = function (collector, $completion) {
    return this.z17_1(collector, $completion);
  };
  function emitAll(_this__u8e3s4, channel, $completion) {
    return emitAllImpl(_this__u8e3s4, channel, true, $completion);
  }
  function emitAllImpl(_this__u8e3s4, channel, consume, $completion) {
    var tmp = new $emitAllImplCOROUTINE$12(_this__u8e3s4, channel, consume, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function receiveAsFlow(_this__u8e3s4) {
    return new ChannelAsFlow(_this__u8e3s4, false);
  }
  function markConsumed($this) {
    if ($this.v18_1) {
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!!$this.w18_1.atomicfu$getAndSet(true)) {
        // Inline function 'kotlinx.coroutines.flow.ChannelAsFlow.markConsumed.<anonymous>' call
        var message = 'ReceiveChannel.consumeAsFlow can be collected just once';
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
  }
  function $collectCOROUTINE$13(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.f19_1 = _this__u8e3s4;
    this.g19_1 = collector;
  }
  protoOf($collectCOROUTINE$13).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            Factory_getInstance();
            if (this.f19_1.i19_1 === -3) {
              markConsumed(this.f19_1);
              this.ac_1 = 2;
              suspendResult = emitAllImpl(this.g19_1, this.f19_1.u18_1, this.f19_1.v18_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 1;
              suspendResult = protoOf(ChannelFlow).b18.call(this.f19_1, this.g19_1, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            }

          case 1:
            this.ac_1 = 3;
            continue $sm;
          case 2:
            this.ac_1 = 3;
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
  function ChannelAsFlow(channel, consume, context, capacity, onBufferOverflow) {
    context = context === VOID ? EmptyCoroutineContext_getInstance() : context;
    var tmp;
    if (capacity === VOID) {
      Factory_getInstance();
      tmp = -3;
    } else {
      tmp = capacity;
    }
    capacity = tmp;
    onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
    ChannelFlow.call(this, context, capacity, onBufferOverflow);
    this.u18_1 = channel;
    this.v18_1 = consume;
    this.w18_1 = atomic$boolean$1(false);
  }
  protoOf(ChannelAsFlow).k19 = function (scope, $completion) {
    return emitAllImpl(new SendingCollector(scope), this.u18_1, this.v18_1, $completion);
  };
  protoOf(ChannelAsFlow).l19 = function (scope) {
    markConsumed(this);
    var tmp;
    Factory_getInstance();
    if (this.i19_1 === -3) {
      tmp = this.u18_1;
    } else {
      tmp = protoOf(ChannelFlow).l19.call(this, scope);
    }
    return tmp;
  };
  protoOf(ChannelAsFlow).b18 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$13(this, collector, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ChannelAsFlow).m19 = function () {
    return 'channel=' + this.u18_1;
  };
  function $emitAllImplCOROUTINE$12(_this__u8e3s4, channel, consume, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.k18_1 = _this__u8e3s4;
    this.l18_1 = channel;
    this.m18_1 = consume;
  }
  protoOf($emitAllImplCOROUTINE$12).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 9;
            ensureActive_1(this.k18_1);
            this.n18_1 = null;
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 7;
            this.bc_1 = 6;
            this.p18_1 = this.l18_1.o();
            this.ac_1 = 2;
            continue $sm;
          case 2:
            this.ac_1 = 3;
            suspendResult = this.p18_1.b14(this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            if (!suspendResult) {
              this.ac_1 = 5;
              continue $sm;
            }

            this.q18_1 = this.p18_1.f1();
            this.ac_1 = 4;
            suspendResult = this.k18_1.p19(this.q18_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 4:
            this.ac_1 = 2;
            continue $sm;
          case 5:
            this.o18_1 = Unit_instance;
            this.bc_1 = 9;
            this.ac_1 = 8;
            continue $sm;
          case 6:
            this.bc_1 = 7;
            var tmp_0 = this.dc_1;
            if (tmp_0 instanceof Error) {
              var e = this.dc_1;
              var tmp_1 = this;
              this.n18_1 = e;
              throw e;
            } else {
              throw this.dc_1;
            }

          case 7:
            this.bc_1 = 9;
            var t = this.dc_1;
            if (this.m18_1) {
              cancelConsumed(this.l18_1, this.n18_1);
            }

            throw t;
          case 8:
            this.bc_1 = 9;
            if (this.m18_1) {
              cancelConsumed(this.l18_1, this.n18_1);
            }

            return Unit_instance;
          case 9:
            throw this.dc_1;
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 9) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  function $collectCOROUTINE$14(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.y19_1 = _this__u8e3s4;
    this.z19_1 = collector;
  }
  protoOf($collectCOROUTINE$14).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 5;
            var tmp_0 = this;
            tmp_0.a1a_1 = new SafeCollector(this.z19_1, this.t6());
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 4;
            this.ac_1 = 2;
            suspendResult = this.y19_1.a18(this.a1a_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.b1a_1 = suspendResult;
            this.bc_1 = 5;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.bc_1 = 5;
            this.a1a_1.g1a();
            return Unit_instance;
          case 4:
            this.bc_1 = 5;
            var t = this.dc_1;
            this.a1a_1.g1a();
            throw t;
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
  function AbstractFlow() {
  }
  protoOf(AbstractFlow).b18 = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$14(this, collector, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function FlowCollector() {
  }
  function get_NO_VALUE() {
    _init_properties_SharedFlow_kt__umasnn();
    return NO_VALUE;
  }
  var NO_VALUE;
  function MutableSharedFlow(replay, extraBufferCapacity, onBufferOverflow) {
    replay = replay === VOID ? 0 : replay;
    extraBufferCapacity = extraBufferCapacity === VOID ? 0 : extraBufferCapacity;
    onBufferOverflow = onBufferOverflow === VOID ? BufferOverflow_SUSPEND_getInstance() : onBufferOverflow;
    _init_properties_SharedFlow_kt__umasnn();
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(replay >= 0)) {
      // Inline function 'kotlinx.coroutines.flow.MutableSharedFlow.<anonymous>' call
      var message = 'replay cannot be negative, but was ' + replay;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(extraBufferCapacity >= 0)) {
      // Inline function 'kotlinx.coroutines.flow.MutableSharedFlow.<anonymous>' call
      var message_0 = 'extraBufferCapacity cannot be negative, but was ' + extraBufferCapacity;
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!((replay > 0 ? true : extraBufferCapacity > 0) ? true : onBufferOverflow.equals(BufferOverflow_SUSPEND_getInstance()))) {
      // Inline function 'kotlinx.coroutines.flow.MutableSharedFlow.<anonymous>' call
      var message_1 = 'replay or extraBufferCapacity must be positive with non-default onBufferOverflow strategy ' + onBufferOverflow;
      throw IllegalArgumentException_init_$Create$(toString(message_1));
    }
    var bufferCapacity0 = replay + extraBufferCapacity | 0;
    var bufferCapacity = bufferCapacity0 < 0 ? IntCompanionObject_instance.MAX_VALUE : bufferCapacity0;
    return new SharedFlowImpl(replay, bufferCapacity, onBufferOverflow);
  }
  function _get_head__d7jo8b($this) {
    // Inline function 'kotlin.comparisons.minOf' call
    var a = $this.q1a_1;
    var b = $this.p1a_1;
    return a.z6(b) <= 0 ? a : b;
  }
  function _get_replaySize__dxgnb1($this) {
    // Inline function 'kotlin.Long.plus' call
    var this_0 = _get_head__d7jo8b($this);
    var other = $this.r1a_1;
    return this_0.eb(toLong(other)).fb($this.p1a_1).ea();
  }
  function _get_totalSize__xhdb3o($this) {
    return $this.r1a_1 + $this.s1a_1 | 0;
  }
  function _get_bufferEndIndex__d2rk18($this) {
    // Inline function 'kotlin.Long.plus' call
    var this_0 = _get_head__d7jo8b($this);
    var other = $this.r1a_1;
    return this_0.eb(toLong(other));
  }
  function _get_queueEndIndex__4m025l($this) {
    // Inline function 'kotlin.Long.plus' call
    // Inline function 'kotlin.Long.plus' call
    var this_0 = _get_head__d7jo8b($this);
    var other = $this.r1a_1;
    var this_1 = this_0.eb(toLong(other));
    var other_0 = $this.s1a_1;
    return this_1.eb(toLong(other_0));
  }
  function tryEmitLocked($this, value) {
    if ($this.u1a_1 === 0)
      return tryEmitNoCollectorsLocked($this, value);
    if ($this.r1a_1 >= $this.m1a_1 ? $this.q1a_1.z6($this.p1a_1) <= 0 : false) {
      switch ($this.n1a_1.t9_1) {
        case 0:
          return false;
        case 2:
          return true;
        case 1:
          break;
      }
    }
    enqueueLocked($this, value);
    $this.r1a_1 = $this.r1a_1 + 1 | 0;
    if ($this.r1a_1 > $this.m1a_1) {
      dropOldestLocked($this);
    }
    if (_get_replaySize__dxgnb1($this) > $this.l1a_1) {
      // Inline function 'kotlin.Long.plus' call
      var tmp$ret$0 = $this.p1a_1.eb(toLong(1));
      updateBufferLocked($this, tmp$ret$0, $this.q1a_1, _get_bufferEndIndex__d2rk18($this), _get_queueEndIndex__4m025l($this));
    }
    return true;
  }
  function tryEmitNoCollectorsLocked($this, value) {
    // Inline function 'kotlinx.coroutines.assert' call
    if ($this.l1a_1 === 0)
      return true;
    enqueueLocked($this, value);
    $this.r1a_1 = $this.r1a_1 + 1 | 0;
    if ($this.r1a_1 > $this.l1a_1) {
      dropOldestLocked($this);
    }
    var tmp = $this;
    // Inline function 'kotlin.Long.plus' call
    var this_0 = _get_head__d7jo8b($this);
    var other = $this.r1a_1;
    tmp.q1a_1 = this_0.eb(toLong(other));
    return true;
  }
  function dropOldestLocked($this) {
    setBufferAt(ensureNotNull($this.o1a_1), _get_head__d7jo8b($this), null);
    $this.r1a_1 = $this.r1a_1 - 1 | 0;
    // Inline function 'kotlin.Long.plus' call
    var newHead = _get_head__d7jo8b($this).eb(toLong(1));
    if ($this.p1a_1.z6(newHead) < 0)
      $this.p1a_1 = newHead;
    if ($this.q1a_1.z6(newHead) < 0) {
      correctCollectorIndexesOnDropOldest($this, newHead);
    }
    // Inline function 'kotlinx.coroutines.assert' call
  }
  function correctCollectorIndexesOnDropOldest($this, newHead) {
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
      if ($this.u1a_1 === 0) {
        break $l$block;
      }
      var tmp0_safe_receiver = $this.t1a_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp0_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp0_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked.<anonymous>' call
          if (!(element == null)) {
            // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.correctCollectorIndexesOnDropOldest.<anonymous>' call
            if (element.x1a_1.z6(new Long(0, 0)) >= 0 ? element.x1a_1.z6(newHead) < 0 : false) {
              element.x1a_1 = newHead;
            }
          }
        }
      }
    }
    $this.q1a_1 = newHead;
  }
  function enqueueLocked($this, item) {
    var curSize = _get_totalSize__xhdb3o($this);
    var curBuffer = $this.o1a_1;
    var buffer = curBuffer == null ? growBuffer($this, null, 0, 2) : curSize >= curBuffer.length ? growBuffer($this, curBuffer, curSize, imul(curBuffer.length, 2)) : curBuffer;
    // Inline function 'kotlin.Long.plus' call
    var tmp$ret$0 = _get_head__d7jo8b($this).eb(toLong(curSize));
    setBufferAt(buffer, tmp$ret$0, item);
  }
  function growBuffer($this, curBuffer, curSize, newSize) {
    // Inline function 'kotlin.check' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(newSize > 0)) {
      // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.growBuffer.<anonymous>' call
      var message = 'Buffer size overflow';
      throw IllegalStateException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.also' call
    // Inline function 'kotlin.arrayOfNulls' call
    var this_0 = fillArrayVal(Array(newSize), null);
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.growBuffer.<anonymous>' call
    $this.o1a_1 = this_0;
    var newBuffer = this_0;
    if (curBuffer == null)
      return newBuffer;
    var head = _get_head__d7jo8b($this);
    var inductionVariable = 0;
    if (inductionVariable < curSize)
      do {
        var i = inductionVariable;
        inductionVariable = inductionVariable + 1 | 0;
        // Inline function 'kotlin.Long.plus' call
        var tmp = head.eb(toLong(i));
        // Inline function 'kotlin.Long.plus' call
        var tmp$ret$4 = head.eb(toLong(i));
        setBufferAt(newBuffer, tmp, getBufferAt(curBuffer, tmp$ret$4));
      }
       while (inductionVariable < curSize);
    return newBuffer;
  }
  function emitSuspend($this, value, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.emitSuspend.<anonymous>' call
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    var tmp$ret$2;
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.emitSuspend.<anonymous>.<anonymous>' call
      if (tryEmitLocked($this, value)) {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        cancellable.u6(tmp$ret$0);
        resumes = findSlotsToResumeLocked($this, resumes);
        tmp$ret$2 = null;
        break $l$block;
      }
      // Inline function 'kotlin.also' call
      // Inline function 'kotlin.Long.plus' call
      var this_0 = _get_head__d7jo8b($this);
      var other = _get_totalSize__xhdb3o($this);
      var tmp$ret$3 = this_0.eb(toLong(other));
      var this_1 = new Emitter($this, tmp$ret$3, value, cancellable);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.emitSuspend.<anonymous>.<anonymous>.<anonymous>' call
      enqueueLocked($this, this_1);
      $this.s1a_1 = $this.s1a_1 + 1 | 0;
      if ($this.m1a_1 === 0)
        resumes = findSlotsToResumeLocked($this, resumes);
      tmp$ret$2 = this_1;
    }
    var emitter = tmp$ret$2;
    if (emitter == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      disposeOnCancellation(cancellable, emitter);
    }
    var indexedObject = resumes;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var r = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (r == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$8 = _Result___init__impl__xyqfz8(Unit_instance);
        r.u6(tmp$ret$8);
      }
    }
    return cancellable.mq();
  }
  function cancelEmitter($this, emitter) {
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    if (emitter.a1b_1.z6(_get_head__d7jo8b($this)) < 0)
      return Unit_instance;
    var buffer = ensureNotNull($this.o1a_1);
    if (!(getBufferAt(buffer, emitter.a1b_1) === emitter))
      return Unit_instance;
    setBufferAt(buffer, emitter.a1b_1, get_NO_VALUE());
    cleanupTailLocked($this);
    return Unit_instance;
  }
  function updateBufferLocked($this, newReplayIndex, newMinCollectorIndex, newBufferEndIndex, newQueueEndIndex) {
    // Inline function 'kotlin.comparisons.minOf' call
    var newHead = newMinCollectorIndex.z6(newReplayIndex) <= 0 ? newMinCollectorIndex : newReplayIndex;
    // Inline function 'kotlinx.coroutines.assert' call
    var inductionVariable = _get_head__d7jo8b($this);
    if (inductionVariable.z6(newHead) < 0)
      do {
        var index = inductionVariable;
        inductionVariable = inductionVariable.eb(new Long(1, 0));
        setBufferAt(ensureNotNull($this.o1a_1), index, null);
      }
       while (inductionVariable.z6(newHead) < 0);
    $this.p1a_1 = newReplayIndex;
    $this.q1a_1 = newMinCollectorIndex;
    $this.r1a_1 = newBufferEndIndex.fb(newHead).ea();
    $this.s1a_1 = newQueueEndIndex.fb(newBufferEndIndex).ea();
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
    // Inline function 'kotlinx.coroutines.assert' call
  }
  function cleanupTailLocked($this) {
    if ($this.m1a_1 === 0 ? $this.s1a_1 <= 1 : false)
      return Unit_instance;
    var buffer = ensureNotNull($this.o1a_1);
    $l$loop: while (true) {
      var tmp;
      if ($this.s1a_1 > 0) {
        // Inline function 'kotlin.Long.minus' call
        // Inline function 'kotlin.Long.plus' call
        var this_0 = _get_head__d7jo8b($this);
        var other = _get_totalSize__xhdb3o($this);
        var tmp$ret$1 = this_0.eb(toLong(other)).fb(toLong(1));
        tmp = getBufferAt(buffer, tmp$ret$1) === get_NO_VALUE();
      } else {
        tmp = false;
      }
      if (!tmp) {
        break $l$loop;
      }
      $this.s1a_1 = $this.s1a_1 - 1 | 0;
      // Inline function 'kotlin.Long.plus' call
      var this_1 = _get_head__d7jo8b($this);
      var other_0 = _get_totalSize__xhdb3o($this);
      var tmp$ret$2 = this_1.eb(toLong(other_0));
      setBufferAt(buffer, tmp$ret$2, null);
    }
  }
  function tryTakeValue($this, slot) {
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.tryTakeValue.<anonymous>' call
    var index = tryPeekLocked($this, slot);
    var tmp;
    if (index.z6(new Long(0, 0)) < 0) {
      tmp = get_NO_VALUE();
    } else {
      var oldIndex = slot.x1a_1;
      var newValue = getPeekedValueLockedAt($this, index);
      var tmp_0 = slot;
      // Inline function 'kotlin.Long.plus' call
      tmp_0.x1a_1 = index.eb(toLong(1));
      resumes = $this.d1b(oldIndex);
      tmp = newValue;
    }
    var value = tmp;
    var indexedObject = resumes;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var resume = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (resume == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$4 = _Result___init__impl__xyqfz8(Unit_instance);
        resume.u6(tmp$ret$4);
      }
    }
    return value;
  }
  function tryPeekLocked($this, slot) {
    var index = slot.x1a_1;
    if (index.z6(_get_bufferEndIndex__d2rk18($this)) < 0)
      return index;
    if ($this.m1a_1 > 0)
      return new Long(-1, -1);
    if (index.z6(_get_head__d7jo8b($this)) > 0)
      return new Long(-1, -1);
    if ($this.s1a_1 === 0)
      return new Long(-1, -1);
    return index;
  }
  function getPeekedValueLockedAt($this, index) {
    var item = getBufferAt(ensureNotNull($this.o1a_1), index);
    var tmp;
    if (item instanceof Emitter) {
      tmp = item.b1b_1;
    } else {
      tmp = item;
    }
    return tmp;
  }
  function awaitValue($this, slot, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.awaitValue.<anonymous>' call
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.awaitValue.<anonymous>.<anonymous>' call
      var index = tryPeekLocked($this, slot);
      if (index.z6(new Long(0, 0)) < 0) {
        slot.y1a_1 = cancellable;
      } else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
        cancellable.u6(tmp$ret$0);
        break $l$block;
      }
      slot.y1a_1 = cancellable;
    }
    return cancellable.mq();
  }
  function findSlotsToResumeLocked($this, resumesIn) {
    var resumes = resumesIn;
    var resumeCount = resumesIn.length;
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
      if ($this.u1a_1 === 0) {
        break $l$block;
      }
      var tmp0_safe_receiver = $this.t1a_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp0_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp0_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked.<anonymous>' call
          if (!(element == null)) {
            $l$block_1: {
              // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.findSlotsToResumeLocked.<anonymous>' call
              var tmp0_elvis_lhs = element.y1a_1;
              var tmp;
              if (tmp0_elvis_lhs == null) {
                break $l$block_1;
              } else {
                tmp = tmp0_elvis_lhs;
              }
              var cont = tmp;
              if (tryPeekLocked($this, element).z6(new Long(0, 0)) < 0) {
                break $l$block_1;
              }
              if (resumeCount >= resumes.length) {
                var tmp_0 = resumes;
                // Inline function 'kotlin.comparisons.maxOf' call
                var b = imul(2, resumes.length);
                var tmp$ret$2 = Math.max(2, b);
                resumes = copyOf(tmp_0, tmp$ret$2);
              }
              var tmp_1 = resumes;
              var tmp1 = resumeCount;
              resumeCount = tmp1 + 1 | 0;
              tmp_1[tmp1] = cont;
              element.y1a_1 = null;
            }
          }
        }
      }
    }
    return resumes;
  }
  function Emitter(flow, index, value, cont) {
    this.z1a_1 = flow;
    this.a1b_1 = index;
    this.b1b_1 = value;
    this.c1b_1 = cont;
  }
  protoOf(Emitter).or = function () {
    return cancelEmitter(this.z1a_1, this);
  };
  function $collectCOROUTINE$15(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.m1b_1 = _this__u8e3s4;
    this.n1b_1 = collector;
  }
  protoOf($collectCOROUTINE$15).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 13;
            this.o1b_1 = this.m1b_1.s1b();
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 12;
            var tmp_0 = this.n1b_1;
            if (tmp_0 instanceof SubscribedFlowCollector) {
              this.ac_1 = 2;
              suspendResult = this.n1b_1.v1b(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

          case 2:
            this.ac_1 = 3;
            continue $sm;
          case 3:
            var tmp_1 = this;
            tmp_1.q1b_1 = this.t6().hc(Key_instance_3);
            this.ac_1 = 4;
            continue $sm;
          case 4:
            if (!true) {
              this.ac_1 = 10;
              continue $sm;
            }

            this.ac_1 = 5;
            continue $sm;
          case 5:
            if (!true) {
              this.ac_1 = 8;
              continue $sm;
            }

            this.r1b_1 = tryTakeValue(this.m1b_1, this.o1b_1);
            if (!(this.r1b_1 === get_NO_VALUE())) {
              this.ac_1 = 8;
              continue $sm;
            } else {
              this.ac_1 = 6;
              continue $sm;
            }

          case 6:
            this.ac_1 = 7;
            suspendResult = awaitValue(this.m1b_1, this.o1b_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 7:
            this.ac_1 = 5;
            continue $sm;
          case 8:
            var tmp0_safe_receiver = this.q1b_1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              ensureActive_0(tmp0_safe_receiver);
            }

            this.ac_1 = 9;
            var tmp_2 = this.r1b_1;
            suspendResult = this.n1b_1.p19((tmp_2 == null ? true : !(tmp_2 == null)) ? tmp_2 : THROW_CCE(), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 9:
            this.ac_1 = 4;
            continue $sm;
          case 10:
            this.p1b_1 = Unit_instance;
            this.bc_1 = 13;
            this.ac_1 = 11;
            continue $sm;
          case 11:
            this.bc_1 = 13;
            this.m1b_1.w1b(this.o1b_1);
            return Unit_instance;
          case 12:
            this.bc_1 = 13;
            var t = this.dc_1;
            this.m1b_1.w1b(this.o1b_1);
            throw t;
          case 13:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 13) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function SharedFlowImpl(replay, bufferCapacity, onBufferOverflow) {
    AbstractSharedFlow.call(this);
    this.l1a_1 = replay;
    this.m1a_1 = bufferCapacity;
    this.n1a_1 = onBufferOverflow;
    this.o1a_1 = null;
    this.p1a_1 = new Long(0, 0);
    this.q1a_1 = new Long(0, 0);
    this.r1a_1 = 0;
    this.s1a_1 = 0;
  }
  protoOf(SharedFlowImpl).x1b = function () {
    var tmp = ensureNotNull(this.o1a_1);
    // Inline function 'kotlin.Long.minus' call
    // Inline function 'kotlin.Long.plus' call
    var this_0 = this.p1a_1;
    var other = _get_replaySize__dxgnb1(this);
    var tmp$ret$1 = this_0.eb(toLong(other)).fb(toLong(1));
    var tmp_0 = getBufferAt(tmp, tmp$ret$1);
    return (tmp_0 == null ? true : !(tmp_0 == null)) ? tmp_0 : THROW_CCE();
  };
  protoOf(SharedFlowImpl).y1b = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$15(this, collector, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(SharedFlowImpl).b18 = function (collector, $completion) {
    return this.y1b(collector, $completion);
  };
  protoOf(SharedFlowImpl).z1b = function (value) {
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.tryEmit.<anonymous>' call
    var tmp;
    if (tryEmitLocked(this, value)) {
      resumes = findSlotsToResumeLocked(this, resumes);
      tmp = true;
    } else {
      tmp = false;
    }
    var emitted = tmp;
    var indexedObject = resumes;
    var inductionVariable = 0;
    var last = indexedObject.length;
    while (inductionVariable < last) {
      var cont = indexedObject[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (cont == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
        cont.u6(tmp$ret$3);
      }
    }
    return emitted;
  };
  protoOf(SharedFlowImpl).p19 = function (value, $completion) {
    if (this.z1b(value))
      return Unit_instance;
    return emitSuspend(this, value, $completion);
  };
  protoOf(SharedFlowImpl).a1c = function () {
    var index = this.p1a_1;
    if (index.z6(this.q1a_1) < 0)
      this.q1a_1 = index;
    return index;
  };
  protoOf(SharedFlowImpl).d1b = function (oldIndex) {
    // Inline function 'kotlinx.coroutines.assert' call
    if (oldIndex.z6(this.q1a_1) > 0)
      return get_EMPTY_RESUMES();
    var head = _get_head__d7jo8b(this);
    // Inline function 'kotlin.Long.plus' call
    var other = this.r1a_1;
    var newMinCollectorIndex = head.eb(toLong(other));
    if (this.m1a_1 === 0 ? this.s1a_1 > 0 : false) {
      newMinCollectorIndex = newMinCollectorIndex.hb();
    }
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked' call
      if (this.u1a_1 === 0) {
        break $l$block;
      }
      var tmp0_safe_receiver = this.t1a_1;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp0_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp0_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.forEachSlotLocked.<anonymous>' call
          if (!(element == null)) {
            // Inline function 'kotlinx.coroutines.flow.SharedFlowImpl.updateCollectorIndexLocked.<anonymous>' call
            if (element.x1a_1.z6(new Long(0, 0)) >= 0 ? element.x1a_1.z6(newMinCollectorIndex) < 0 : false)
              newMinCollectorIndex = element.x1a_1;
          }
        }
      }
    }
    // Inline function 'kotlinx.coroutines.assert' call
    if (newMinCollectorIndex.z6(this.q1a_1) <= 0)
      return get_EMPTY_RESUMES();
    var newBufferEndIndex = _get_bufferEndIndex__d2rk18(this);
    var tmp;
    if (this.u1a_1 > 0) {
      var newBufferSize0 = newBufferEndIndex.fb(newMinCollectorIndex).ea();
      // Inline function 'kotlin.comparisons.minOf' call
      var a = this.s1a_1;
      var b = this.m1a_1 - newBufferSize0 | 0;
      tmp = Math.min(a, b);
    } else {
      tmp = this.s1a_1;
    }
    var maxResumeCount = tmp;
    var resumes = get_EMPTY_RESUMES();
    // Inline function 'kotlin.Long.plus' call
    var this_0 = newBufferEndIndex;
    var other_0 = this.s1a_1;
    var newQueueEndIndex = this_0.eb(toLong(other_0));
    if (maxResumeCount > 0) {
      // Inline function 'kotlin.arrayOfNulls' call
      resumes = fillArrayVal(Array(maxResumeCount), null);
      var resumeCount = 0;
      var buffer = ensureNotNull(this.o1a_1);
      var inductionVariable_0 = newBufferEndIndex;
      if (inductionVariable_0.z6(newQueueEndIndex) < 0)
        $l$loop: do {
          var curEmitterIndex = inductionVariable_0;
          inductionVariable_0 = inductionVariable_0.eb(new Long(1, 0));
          var emitter = getBufferAt(buffer, curEmitterIndex);
          if (!(emitter === get_NO_VALUE())) {
            if (!(emitter instanceof Emitter))
              THROW_CCE();
            var tmp_0 = resumes;
            var tmp2 = resumeCount;
            resumeCount = tmp2 + 1 | 0;
            tmp_0[tmp2] = emitter.c1b_1;
            setBufferAt(buffer, curEmitterIndex, get_NO_VALUE());
            setBufferAt(buffer, newBufferEndIndex, emitter.b1b_1);
            newBufferEndIndex = newBufferEndIndex.hb();
            if (resumeCount >= maxResumeCount)
              break $l$loop;
          }
        }
         while (inductionVariable_0.z6(newQueueEndIndex) < 0);
    }
    var newBufferSize1 = newBufferEndIndex.fb(head).ea();
    if (this.u1a_1 === 0)
      newMinCollectorIndex = newBufferEndIndex;
    // Inline function 'kotlin.comparisons.maxOf' call
    var a_0 = this.p1a_1;
    // Inline function 'kotlin.Long.minus' call
    var this_1 = newBufferEndIndex;
    // Inline function 'kotlin.comparisons.minOf' call
    var a_1 = this.l1a_1;
    var other_1 = Math.min(a_1, newBufferSize1);
    var b_0 = this_1.fb(toLong(other_1));
    var newReplayIndex = a_0.z6(b_0) >= 0 ? a_0 : b_0;
    if ((this.m1a_1 === 0 ? newReplayIndex.z6(newQueueEndIndex) < 0 : false) ? equals(getBufferAt(ensureNotNull(this.o1a_1), newReplayIndex), get_NO_VALUE()) : false) {
      newBufferEndIndex = newBufferEndIndex.hb();
      newReplayIndex = newReplayIndex.hb();
    }
    updateBufferLocked(this, newReplayIndex, newMinCollectorIndex, newBufferEndIndex, newQueueEndIndex);
    cleanupTailLocked(this);
    // Inline function 'kotlin.collections.isNotEmpty' call
    // Inline function 'kotlin.collections.isEmpty' call
    if (!(resumes.length === 0))
      resumes = findSlotsToResumeLocked(this, resumes);
    return resumes;
  };
  protoOf(SharedFlowImpl).b1c = function () {
    return new SharedFlowSlot();
  };
  protoOf(SharedFlowImpl).c1c = function (size) {
    // Inline function 'kotlin.arrayOfNulls' call
    return fillArrayVal(Array(size), null);
  };
  function SharedFlowSlot() {
    AbstractSharedFlowSlot.call(this);
    this.x1a_1 = new Long(-1, -1);
    this.y1a_1 = null;
  }
  protoOf(SharedFlowSlot).d1c = function (flow) {
    if (this.x1a_1.z6(new Long(0, 0)) >= 0)
      return false;
    this.x1a_1 = flow.a1c();
    return true;
  };
  protoOf(SharedFlowSlot).e1c = function (flow) {
    return this.d1c(flow instanceof SharedFlowImpl ? flow : THROW_CCE());
  };
  protoOf(SharedFlowSlot).f1c = function (flow) {
    // Inline function 'kotlinx.coroutines.assert' call
    var oldIndex = this.x1a_1;
    this.x1a_1 = new Long(-1, -1);
    this.y1a_1 = null;
    return flow.d1b(oldIndex);
  };
  protoOf(SharedFlowSlot).g1c = function (flow) {
    return this.f1c(flow instanceof SharedFlowImpl ? flow : THROW_CCE());
  };
  function getBufferAt(_this__u8e3s4, index) {
    _init_properties_SharedFlow_kt__umasnn();
    return _this__u8e3s4[index.ea() & (_this__u8e3s4.length - 1 | 0)];
  }
  function setBufferAt(_this__u8e3s4, index, item) {
    _init_properties_SharedFlow_kt__umasnn();
    return _this__u8e3s4[index.ea() & (_this__u8e3s4.length - 1 | 0)] = item;
  }
  var properties_initialized_SharedFlow_kt_tmefor;
  function _init_properties_SharedFlow_kt__umasnn() {
    if (!properties_initialized_SharedFlow_kt_tmefor) {
      properties_initialized_SharedFlow_kt_tmefor = true;
      NO_VALUE = new Symbol('NO_VALUE');
    }
  }
  function get_NONE() {
    _init_properties_StateFlow_kt__eu9yi5();
    return NONE;
  }
  var NONE;
  function get_PENDING() {
    _init_properties_StateFlow_kt__eu9yi5();
    return PENDING;
  }
  var PENDING;
  function MutableStateFlow(value) {
    _init_properties_StateFlow_kt__eu9yi5();
    return new StateFlowImpl(value == null ? get_NULL() : value);
  }
  function updateState($this, expectedState, newState) {
    var curSequence;
    var curSlots;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    var oldState = $this.l1c_1.kotlinx$atomicfu$value;
    if (!(expectedState == null) ? !equals(oldState, expectedState) : false)
      return false;
    if (equals(oldState, newState))
      return true;
    $this.l1c_1.kotlinx$atomicfu$value = newState;
    curSequence = $this.m1c_1;
    if ((curSequence & 1) === 0) {
      curSequence = curSequence + 1 | 0;
      $this.m1c_1 = curSequence;
    } else {
      $this.m1c_1 = curSequence + 2 | 0;
      return true;
    }
    curSlots = $this.t1a_1;
    while (true) {
      var tmp0_safe_receiver = curSlots;
      if (tmp0_safe_receiver == null)
        null;
      else {
        // Inline function 'kotlin.collections.forEach' call
        var inductionVariable = 0;
        var last = tmp0_safe_receiver.length;
        while (inductionVariable < last) {
          var element = tmp0_safe_receiver[inductionVariable];
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.coroutines.flow.StateFlowImpl.updateState.<anonymous>' call
          if (element == null)
            null;
          else {
            element.o1c();
          }
        }
      }
      // Inline function 'kotlinx.coroutines.internal.synchronized' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
      if ($this.m1c_1 === curSequence) {
        $this.m1c_1 = curSequence + 1 | 0;
        return true;
      }
      curSequence = $this.m1c_1;
      curSlots = $this.t1a_1;
    }
  }
  function $collectCOROUTINE$16(_this__u8e3s4, collector, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.x1c_1 = _this__u8e3s4;
    this.y1c_1 = collector;
  }
  protoOf($collectCOROUTINE$16).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 12;
            this.z1c_1 = this.x1c_1.s1b();
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 11;
            var tmp_0 = this.y1c_1;
            if (tmp_0 instanceof SubscribedFlowCollector) {
              this.ac_1 = 2;
              suspendResult = this.y1c_1.v1b(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

          case 2:
            this.ac_1 = 3;
            continue $sm;
          case 3:
            var tmp_1 = this;
            tmp_1.b1d_1 = this.t6().hc(Key_instance_3);
            this.c1d_1 = null;
            this.ac_1 = 4;
            continue $sm;
          case 4:
            if (!true) {
              this.ac_1 = 9;
              continue $sm;
            }

            this.d1d_1 = this.x1c_1.l1c_1.kotlinx$atomicfu$value;
            var tmp0_safe_receiver = this.b1d_1;
            if (tmp0_safe_receiver == null)
              null;
            else {
              ensureActive_0(tmp0_safe_receiver);
            }

            if (this.c1d_1 == null ? true : !equals(this.c1d_1, this.d1d_1)) {
              this.ac_1 = 5;
              var this_0 = get_NULL();
              var value = this.d1d_1;
              var tmp_2;
              if (value === this_0) {
                tmp_2 = (null == null ? true : !(null == null)) ? null : THROW_CCE();
              } else {
                tmp_2 = (value == null ? true : !(value == null)) ? value : THROW_CCE();
              }
              suspendResult = this.y1c_1.p19(tmp_2, this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 6;
              continue $sm;
            }

          case 5:
            this.c1d_1 = this.d1d_1;
            this.ac_1 = 6;
            continue $sm;
          case 6:
            if (!this.z1c_1.f1d()) {
              this.ac_1 = 7;
              suspendResult = this.z1c_1.e1d(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 8;
              continue $sm;
            }

          case 7:
            this.ac_1 = 8;
            continue $sm;
          case 8:
            this.ac_1 = 4;
            continue $sm;
          case 9:
            this.a1d_1 = Unit_instance;
            this.bc_1 = 12;
            this.ac_1 = 10;
            continue $sm;
          case 10:
            this.bc_1 = 12;
            this.x1c_1.w1b(this.z1c_1);
            return Unit_instance;
          case 11:
            this.bc_1 = 12;
            var t = this.dc_1;
            this.x1c_1.w1b(this.z1c_1);
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
  function StateFlowImpl(initialState) {
    AbstractSharedFlow.call(this);
    this.l1c_1 = atomic$ref$1(initialState);
    this.m1c_1 = 0;
  }
  protoOf(StateFlowImpl).g1d = function (value) {
    updateState(this, null, value == null ? get_NULL() : value);
  };
  protoOf(StateFlowImpl).s2 = function () {
    // Inline function 'kotlinx.coroutines.internal.Symbol.unbox' call
    var this_0 = get_NULL();
    var value = this.l1c_1.kotlinx$atomicfu$value;
    var tmp;
    if (value === this_0) {
      tmp = (null == null ? true : !(null == null)) ? null : THROW_CCE();
    } else {
      tmp = (value == null ? true : !(value == null)) ? value : THROW_CCE();
    }
    return tmp;
  };
  protoOf(StateFlowImpl).h1d = function (expect, update) {
    var tmp = expect == null ? get_NULL() : expect;
    return updateState(this, tmp, update == null ? get_NULL() : update);
  };
  protoOf(StateFlowImpl).z1b = function (value) {
    this.g1d(value);
    return true;
  };
  protoOf(StateFlowImpl).p19 = function (value, $completion) {
    this.g1d(value);
    return Unit_instance;
  };
  protoOf(StateFlowImpl).y1b = function (collector, $completion) {
    var tmp = new $collectCOROUTINE$16(this, collector, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(StateFlowImpl).b18 = function (collector, $completion) {
    return this.y1b(collector, $completion);
  };
  protoOf(StateFlowImpl).b1c = function () {
    return new StateFlowSlot();
  };
  protoOf(StateFlowImpl).c1c = function (size) {
    // Inline function 'kotlin.arrayOfNulls' call
    return fillArrayVal(Array(size), null);
  };
  function StateFlowSlot() {
    AbstractSharedFlowSlot.call(this);
    this.n1c_1 = new WorkaroundAtomicReference(null);
  }
  protoOf(StateFlowSlot).i1d = function (flow) {
    if (!(get_value(this.n1c_1) == null))
      return false;
    set_value(this.n1c_1, get_NONE());
    return true;
  };
  protoOf(StateFlowSlot).e1c = function (flow) {
    return this.i1d(flow instanceof StateFlowImpl ? flow : THROW_CCE());
  };
  protoOf(StateFlowSlot).j1d = function (flow) {
    set_value(this.n1c_1, null);
    return get_EMPTY_RESUMES();
  };
  protoOf(StateFlowSlot).g1c = function (flow) {
    return this.j1d(flow instanceof StateFlowImpl ? flow : THROW_CCE());
  };
  protoOf(StateFlowSlot).o1c = function () {
    // Inline function 'kotlinx.coroutines.internal.loop' call
    var this_0 = this.n1c_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.flow.StateFlowSlot.makePending.<anonymous>' call
      var state = get_value(this_0);
      if (state == null)
        return Unit_instance;
      else if (state === get_PENDING())
        return Unit_instance;
      else if (state === get_NONE()) {
        if (this.n1c_1.h1d(state, get_PENDING()))
          return Unit_instance;
      } else {
        if (this.n1c_1.h1d(state, get_NONE())) {
          // Inline function 'kotlin.coroutines.resume' call
          var this_1 = state instanceof CancellableContinuationImpl ? state : THROW_CCE();
          // Inline function 'kotlin.Companion.success' call
          var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
          this_1.u6(tmp$ret$0);
          return Unit_instance;
        }
      }
    }
  };
  protoOf(StateFlowSlot).f1d = function () {
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.assert' call
    return ensureNotNull(this.n1c_1.l1d(get_NONE())) === get_PENDING();
  };
  protoOf(StateFlowSlot).e1d = function ($completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    $l$block: {
      // Inline function 'kotlinx.coroutines.flow.StateFlowSlot.awaitPending.<anonymous>' call
      // Inline function 'kotlinx.coroutines.assert' call
      if (this.n1c_1.h1d(get_NONE(), cancellable)) {
        break $l$block;
      }
      // Inline function 'kotlinx.coroutines.assert' call
      // Inline function 'kotlin.coroutines.resume' call
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$1 = _Result___init__impl__xyqfz8(Unit_instance);
      cancellable.u6(tmp$ret$1);
    }
    return cancellable.mq();
  };
  var properties_initialized_StateFlow_kt_nsqikx;
  function _init_properties_StateFlow_kt__eu9yi5() {
    if (!properties_initialized_StateFlow_kt_nsqikx) {
      properties_initialized_StateFlow_kt_nsqikx = true;
      NONE = new Symbol('NONE');
      PENDING = new Symbol('PENDING');
    }
  }
  function get_EMPTY_RESUMES() {
    _init_properties_AbstractSharedFlow_kt__h2xygb();
    return EMPTY_RESUMES;
  }
  var EMPTY_RESUMES;
  function AbstractSharedFlow() {
    SynchronizedObject.call(this);
    this.t1a_1 = null;
    this.u1a_1 = 0;
    this.v1a_1 = 0;
    this.w1a_1 = null;
  }
  protoOf(AbstractSharedFlow).s1b = function () {
    var subscriptionCount;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.allocateSlot.<anonymous>' call
    var curSlots = this.t1a_1;
    var tmp;
    if (curSlots == null) {
      // Inline function 'kotlin.also' call
      var this_0 = this.c1c(2);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.allocateSlot.<anonymous>.<anonymous>' call
      this.t1a_1 = this_0;
      tmp = this_0;
    } else {
      var tmp_0;
      if (this.u1a_1 >= curSlots.length) {
        // Inline function 'kotlin.also' call
        var this_1 = copyOf(curSlots, imul(2, curSlots.length));
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.allocateSlot.<anonymous>.<anonymous>' call
        this.t1a_1 = this_1;
        tmp_0 = this_1;
      } else {
        tmp_0 = curSlots;
      }
      tmp = tmp_0;
    }
    var slots = tmp;
    var index = this.v1a_1;
    var slot;
    $l$loop: while (true) {
      var tmp0_elvis_lhs = slots[index];
      var tmp_1;
      if (tmp0_elvis_lhs == null) {
        // Inline function 'kotlin.also' call
        var this_2 = this.b1c();
        // Inline function 'kotlin.contracts.contract' call
        // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.allocateSlot.<anonymous>.<anonymous>' call
        slots[index] = this_2;
        tmp_1 = this_2;
      } else {
        tmp_1 = tmp0_elvis_lhs;
      }
      slot = tmp_1;
      index = index + 1 | 0;
      if (index >= slots.length)
        index = 0;
      if ((slot instanceof AbstractSharedFlowSlot ? slot : THROW_CCE()).e1c(this))
        break $l$loop;
    }
    this.v1a_1 = index;
    this.u1a_1 = this.u1a_1 + 1 | 0;
    subscriptionCount = this.w1a_1;
    var slot_0 = slot;
    if (subscriptionCount == null)
      null;
    else
      subscriptionCount.y1d(1);
    return slot_0;
  };
  protoOf(AbstractSharedFlow).w1b = function (slot) {
    var subscriptionCount;
    // Inline function 'kotlinx.coroutines.internal.synchronized' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.synchronizedImpl' call
    // Inline function 'kotlinx.coroutines.flow.internal.AbstractSharedFlow.freeSlot.<anonymous>' call
    this.u1a_1 = this.u1a_1 - 1 | 0;
    subscriptionCount = this.w1a_1;
    if (this.u1a_1 === 0)
      this.v1a_1 = 0;
    var resumes = (slot instanceof AbstractSharedFlowSlot ? slot : THROW_CCE()).g1c(this);
    var inductionVariable = 0;
    var last = resumes.length;
    while (inductionVariable < last) {
      var cont = resumes[inductionVariable];
      inductionVariable = inductionVariable + 1 | 0;
      if (cont == null)
        null;
      else {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var tmp$ret$3 = _Result___init__impl__xyqfz8(Unit_instance);
        cont.u6(tmp$ret$3);
      }
    }
    if (subscriptionCount == null)
      null;
    else
      subscriptionCount.y1d(-1);
  };
  function AbstractSharedFlowSlot() {
  }
  var properties_initialized_AbstractSharedFlow_kt_2mpafr;
  function _init_properties_AbstractSharedFlow_kt__h2xygb() {
    if (!properties_initialized_AbstractSharedFlow_kt_2mpafr) {
      properties_initialized_AbstractSharedFlow_kt_2mpafr = true;
      // Inline function 'kotlin.arrayOfNulls' call
      EMPTY_RESUMES = fillArrayVal(Array(0), null);
    }
  }
  function ChannelFlow$_get_collectToFun_$slambda_j53z2e(this$0, resultContinuation) {
    this.h1e_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ChannelFlow$_get_collectToFun_$slambda_j53z2e).j1e = function (it, $completion) {
    var tmp = this.k1e(it, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ChannelFlow$_get_collectToFun_$slambda_j53z2e).yc = function (p1, $completion) {
    return this.j1e((!(p1 == null) ? isInterface(p1, ProducerScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ChannelFlow$_get_collectToFun_$slambda_j53z2e).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.h1e_1.k19(this.i1e_1, this);
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
  protoOf(ChannelFlow$_get_collectToFun_$slambda_j53z2e).k1e = function (it, completion) {
    var i = new ChannelFlow$_get_collectToFun_$slambda_j53z2e(this.h1e_1, completion);
    i.i1e_1 = it;
    return i;
  };
  function ChannelFlow$_get_collectToFun_$slambda_j53z2e_0(this$0, resultContinuation) {
    var i = new ChannelFlow$_get_collectToFun_$slambda_j53z2e(this$0, resultContinuation);
    var l = function (it, $completion) {
      return i.j1e(it, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ChannelFlow$collect$slambda($collector, this$0, resultContinuation) {
    this.t1e_1 = $collector;
    this.u1e_1 = this$0;
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf(ChannelFlow$collect$slambda).w1e = function ($this$coroutineScope, $completion) {
    var tmp = this.x1e($this$coroutineScope, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  protoOf(ChannelFlow$collect$slambda).yc = function (p1, $completion) {
    return this.w1e((!(p1 == null) ? isInterface(p1, CoroutineScope) : false) ? p1 : THROW_CCE(), $completion);
  };
  protoOf(ChannelFlow$collect$slambda).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = emitAll(this.t1e_1, this.u1e_1.l19(this.v1e_1), this);
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
  protoOf(ChannelFlow$collect$slambda).x1e = function ($this$coroutineScope, completion) {
    var i = new ChannelFlow$collect$slambda(this.t1e_1, this.u1e_1, completion);
    i.v1e_1 = $this$coroutineScope;
    return i;
  };
  function ChannelFlow$collect$slambda_0($collector, this$0, resultContinuation) {
    var i = new ChannelFlow$collect$slambda($collector, this$0, resultContinuation);
    var l = function ($this$coroutineScope, $completion) {
      return i.w1e($this$coroutineScope, $completion);
    };
    l.$arity = 1;
    return l;
  }
  function ChannelFlow(context, capacity, onBufferOverflow) {
    this.h19_1 = context;
    this.i19_1 = capacity;
    this.j19_1 = onBufferOverflow;
    // Inline function 'kotlinx.coroutines.assert' call
  }
  protoOf(ChannelFlow).n19 = function () {
    return ChannelFlow$_get_collectToFun_$slambda_j53z2e_0(this, null);
  };
  protoOf(ChannelFlow).o19 = function () {
    var tmp;
    Factory_getInstance();
    if (this.i19_1 === -3) {
      Factory_getInstance();
      tmp = -2;
    } else {
      tmp = this.i19_1;
    }
    return tmp;
  };
  protoOf(ChannelFlow).l19 = function (scope) {
    return produce(scope, this.h19_1, this.o19(), this.j19_1, CoroutineStart_ATOMIC_getInstance(), VOID, this.n19());
  };
  protoOf(ChannelFlow).b18 = function (collector, $completion) {
    return coroutineScope(ChannelFlow$collect$slambda_0(collector, this, null), $completion);
  };
  protoOf(ChannelFlow).m19 = function () {
    return null;
  };
  protoOf(ChannelFlow).toString = function () {
    var props = ArrayList_init_$Create$(4);
    var tmp0_safe_receiver = this.m19();
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.flow.internal.ChannelFlow.toString.<anonymous>' call
      props.a1(tmp0_safe_receiver);
    }
    if (!(this.h19_1 === EmptyCoroutineContext_getInstance())) {
      props.a1('context=' + this.h19_1);
    }
    Factory_getInstance();
    if (!(this.i19_1 === -3)) {
      props.a1('capacity=' + this.i19_1);
    }
    if (!this.j19_1.equals(BufferOverflow_SUSPEND_getInstance())) {
      props.a1('onBufferOverflow=' + this.j19_1);
    }
    return get_classSimpleName(this) + '[' + joinToString(props, ', ') + ']';
  };
  function checkOwnership(_this__u8e3s4, owner) {
    if (!(_this__u8e3s4.y1e_1 === owner))
      throw _this__u8e3s4;
  }
  function get_NULL() {
    _init_properties_NullSurrogate_kt__n2yti9();
    return NULL;
  }
  var NULL;
  var UNINITIALIZED;
  var DONE;
  var properties_initialized_NullSurrogate_kt_39v8bl;
  function _init_properties_NullSurrogate_kt__n2yti9() {
    if (!properties_initialized_NullSurrogate_kt_39v8bl) {
      properties_initialized_NullSurrogate_kt_39v8bl = true;
      NULL = new Symbol('NULL');
      UNINITIALIZED = new Symbol('UNINITIALIZED');
      DONE = new Symbol('DONE');
    }
  }
  function checkContext(_this__u8e3s4, currentContext) {
    var result = currentContext.uf(0, checkContext$lambda(_this__u8e3s4));
    if (!(result === _this__u8e3s4.e1a_1)) {
      // Inline function 'kotlin.error' call
      var message = 'Flow invariant is violated:\n' + ('\t\tFlow was collected in ' + _this__u8e3s4.d1a_1 + ',\n') + ('\t\tbut emission happened in ' + currentContext + '.\n') + "\t\tPlease refer to 'flow' documentation or use 'flowOn' instead";
      throw IllegalStateException_init_$Create$(toString(message));
    }
  }
  function transitiveCoroutineParent(_this__u8e3s4, collectJob) {
    var $this = _this__u8e3s4;
    var collectJob_0 = collectJob;
    $l$1: do {
      $l$0: do {
        if ($this === null)
          return null;
        if ($this === collectJob_0)
          return $this;
        if (!($this instanceof ScopeCoroutine))
          return $this;
        $this = $this.dp();
        collectJob_0 = collectJob_0;
        continue $l$0;
      }
       while (false);
    }
     while (true);
  }
  function checkContext$lambda($this_checkContext) {
    return function (count, element) {
      var key = element.r2();
      var collectElement = $this_checkContext.d1a_1.hc(key);
      var tmp;
      if (!(key === Key_instance_3)) {
        return !(element === collectElement) ? IntCompanionObject_instance.MIN_VALUE : count + 1 | 0;
      }
      var collectJob = (collectElement == null ? true : isInterface(collectElement, Job)) ? collectElement : THROW_CCE();
      var emissionParentJob = transitiveCoroutineParent(isInterface(element, Job) ? element : THROW_CCE(), collectJob);
      var tmp_0;
      if (!(emissionParentJob === collectJob)) {
        var message = 'Flow invariant is violated:\n\t\tEmission from another coroutine is detected.\n' + ('\t\tChild of ' + emissionParentJob + ', expected child of ' + collectJob + '.\n') + '\t\tFlowCollector is not thread-safe and concurrent emissions are prohibited.\n' + "\t\tTo mitigate this restriction please use 'channelFlow' builder instead of 'flow'";
        throw IllegalStateException_init_$Create$(toString(message));
      }
      return collectJob == null ? count : count + 1 | 0;
    };
  }
  function SendingCollector(channel) {
    this.z1e_1 = channel;
  }
  protoOf(SendingCollector).p19 = function (value, $completion) {
    return this.z1e_1.h16(value, $completion);
  };
  function ensureActive_1(_this__u8e3s4) {
    if (_this__u8e3s4 instanceof ThrowingCollector)
      throw _this__u8e3s4.a1f_1;
  }
  function ThrowingCollector() {
  }
  function $onSubscriptionCOROUTINE$23(_this__u8e3s4, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.j1f_1 = _this__u8e3s4;
  }
  protoOf($onSubscriptionCOROUTINE$23).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 7;
            var tmp_0 = this;
            tmp_0.k1f_1 = new SafeCollector(this.j1f_1.t1b_1, this.t6());
            this.ac_1 = 1;
            continue $sm;
          case 1:
            this.bc_1 = 6;
            this.ac_1 = 2;
            suspendResult = this.j1f_1.u1b_1(this.k1f_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            this.l1f_1 = suspendResult;
            this.bc_1 = 7;
            this.ac_1 = 3;
            continue $sm;
          case 3:
            this.bc_1 = 7;
            this.k1f_1.g1a();
            var tmp_1 = this.j1f_1.t1b_1;
            if (tmp_1 instanceof SubscribedFlowCollector) {
              this.ac_1 = 4;
              suspendResult = this.j1f_1.t1b_1.v1b(this);
              if (suspendResult === get_COROUTINE_SUSPENDED()) {
                return suspendResult;
              }
              continue $sm;
            } else {
              this.ac_1 = 5;
              continue $sm;
            }

          case 4:
            this.ac_1 = 5;
            continue $sm;
          case 5:
            return Unit_instance;
          case 6:
            this.bc_1 = 7;
            var t = this.dc_1;
            this.k1f_1.g1a();
            throw t;
          case 7:
            throw this.dc_1;
        }
      } catch ($p) {
        var e = $p;
        if (this.bc_1 === 7) {
          throw e;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e;
        }
      }
     while (true);
  };
  function SubscribedFlowCollector() {
  }
  protoOf(SubscribedFlowCollector).v1b = function ($completion) {
    var tmp = new $onSubscriptionCOROUTINE$23(this, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function first(_this__u8e3s4, predicate, $completion) {
    var tmp = new $firstCOROUTINE$26(_this__u8e3s4, predicate, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  }
  function $emitCOROUTINE$27(_this__u8e3s4, value, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.h1g_1 = _this__u8e3s4;
    this.i1g_1 = value;
  }
  protoOf($emitCOROUTINE$27).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 4;
            var tmp_0 = this;
            tmp_0.j1g_1 = this.i1g_1;
            this.ac_1 = 1;
            suspendResult = this.h1g_1.l1g_1(this.j1g_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            if (suspendResult) {
              var tmp_1 = this;
              this.h1g_1.m1g_1._v = this.j1g_1;
              tmp_1.k1g_1 = false;
              this.ac_1 = 2;
              continue $sm;
            } else {
              var tmp_2 = this;
              tmp_2.k1g_1 = true;
              this.ac_1 = 2;
              continue $sm;
            }

          case 2:
            var ARGUMENT = this.k1g_1;
            if (!ARGUMENT) {
              throw new AbortFlowException(this.h1g_1);
            } else {
              this.ac_1 = 3;
              continue $sm;
            }

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
  function _no_name_provided__qut3iv($predicate, $result) {
    this.l1g_1 = $predicate;
    this.m1g_1 = $result;
  }
  protoOf(_no_name_provided__qut3iv).p19 = function (value, $completion) {
    var tmp = new $emitCOROUTINE$27(this, value, $completion);
    tmp.cc_1 = Unit_instance;
    tmp.dc_1 = null;
    return tmp.mc();
  };
  function $firstCOROUTINE$26(_this__u8e3s4, predicate, resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
    this.u1f_1 = _this__u8e3s4;
    this.v1f_1 = predicate;
  }
  protoOf($firstCOROUTINE$26).mc = function () {
    var suspendResult = this.cc_1;
    $sm: do
      try {
        var tmp = this.ac_1;
        switch (tmp) {
          case 0:
            this.bc_1 = 3;
            this.w1f_1 = {_v: get_NULL()};
            var tmp_0 = this;
            tmp_0.x1f_1 = this.u1f_1;
            var tmp_1 = this;
            tmp_1.y1f_1 = new _no_name_provided__qut3iv(this.v1f_1, this.w1f_1);
            this.bc_1 = 2;
            this.ac_1 = 1;
            suspendResult = this.x1f_1.b18(this.y1f_1, this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.bc_1 = 3;
            this.ac_1 = 4;
            continue $sm;
          case 2:
            this.bc_1 = 3;
            var tmp_2 = this.dc_1;
            if (tmp_2 instanceof AbortFlowException) {
              var e = this.dc_1;
              checkOwnership(e, this.y1f_1);
              this.ac_1 = 4;
              continue $sm;
            } else {
              throw this.dc_1;
            }

          case 3:
            throw this.dc_1;
          case 4:
            this.bc_1 = 3;
            if (this.w1f_1._v === get_NULL())
              throw NoSuchElementException_init_$Create$_0('Expected at least one element matching the predicate ' + this.v1f_1);
            var tmp_3 = this.w1f_1._v;
            return (tmp_3 == null ? true : !(tmp_3 == null)) ? tmp_3 : THROW_CCE();
        }
      } catch ($p) {
        var e_0 = $p;
        if (this.bc_1 === 3) {
          throw e_0;
        } else {
          this.ac_1 = this.bc_1;
          this.dc_1 = e_0;
        }
      }
     while (true);
  };
  function OpDescriptor() {
  }
  function set_value(_this__u8e3s4, value) {
    return _this__u8e3s4.av(value);
  }
  function get_value(_this__u8e3s4) {
    return _this__u8e3s4.zu();
  }
  function get_CLOSED() {
    _init_properties_ConcurrentLinkedList_kt__5gcgzy();
    return CLOSED;
  }
  var CLOSED;
  function Segment(id, prev, pointers) {
    ConcurrentLinkedListNode.call(this, prev);
    this.cs_1 = id;
    this.ds_1 = atomic$int$1(pointers << 16);
  }
  protoOf(Segment).y11 = function () {
    return this.ds_1.kotlinx$atomicfu$value === this.a11() ? !this.f12() : false;
  };
  protoOf(Segment).z11 = function () {
    var tmp$ret$1;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.internal.addConditionally' call
      var this_0 = this.ds_1;
      while (true) {
        var cur = this_0.kotlinx$atomicfu$value;
        // Inline function 'kotlinx.coroutines.internal.Segment.tryIncPointers.<anonymous>' call
        if (!(!(cur === this.a11()) ? true : this.f12())) {
          tmp$ret$1 = false;
          break $l$block_0;
        }
        if (this_0.atomicfu$compareAndSet(cur, cur + 65536 | 0)) {
          tmp$ret$1 = true;
          break $l$block_0;
        }
      }
    }
    return tmp$ret$1;
  };
  protoOf(Segment).a12 = function () {
    return this.ds_1.atomicfu$addAndGet(-65536) === this.a11() ? !this.f12() : false;
  };
  protoOf(Segment).x11 = function () {
    if (this.ds_1.atomicfu$incrementAndGet() === this.a11()) {
      this.e1();
    }
  };
  function close(_this__u8e3s4) {
    _init_properties_ConcurrentLinkedList_kt__5gcgzy();
    var cur = _this__u8e3s4;
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
      var this_0 = cur;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed.<anonymous>' call
      var it = _get_nextOrClosed__w0gmuv(this_0);
      var tmp;
      if (it === get_CLOSED()) {
        return cur;
      } else {
        tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode) ? it : THROW_CCE();
      }
      var next = tmp;
      if (next === null) {
        if (cur.i12())
          return cur;
      } else {
        cur = next;
      }
    }
  }
  function _SegmentOrClosed___init__impl__jnexvb(value) {
    return value;
  }
  function _get_value__a43j40($this) {
    return $this;
  }
  function _SegmentOrClosed___get_isClosed__impl__qmxmlo($this) {
    return _get_value__a43j40($this) === get_CLOSED();
  }
  function _SegmentOrClosed___get_segment__impl__jvcr9l($this) {
    var tmp;
    if (_get_value__a43j40($this) === get_CLOSED()) {
      var message = 'Does not contain segment';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      var tmp_0 = _get_value__a43j40($this);
      tmp = tmp_0 instanceof Segment ? tmp_0 : THROW_CCE();
    }
    return tmp;
  }
  function SegmentOrClosed__toString_impl_pzb2an($this) {
    return 'SegmentOrClosed(value=' + toString_0($this) + ')';
  }
  function SegmentOrClosed__hashCode_impl_4855hs($this) {
    return $this == null ? 0 : hashCode($this);
  }
  function SegmentOrClosed__equals_impl_6erq1g($this, other) {
    if (!(other instanceof SegmentOrClosed))
      return false;
    var tmp0_other_with_cast = other instanceof SegmentOrClosed ? other.i14_1 : THROW_CCE();
    if (!equals($this, tmp0_other_with_cast))
      return false;
    return true;
  }
  function SegmentOrClosed(value) {
    this.i14_1 = value;
  }
  protoOf(SegmentOrClosed).toString = function () {
    return SegmentOrClosed__toString_impl_pzb2an(this.i14_1);
  };
  protoOf(SegmentOrClosed).hashCode = function () {
    return SegmentOrClosed__hashCode_impl_4855hs(this.i14_1);
  };
  protoOf(SegmentOrClosed).equals = function (other) {
    return SegmentOrClosed__equals_impl_6erq1g(this.i14_1, other);
  };
  function _get_nextOrClosed__w0gmuv($this) {
    return $this.b12_1.kotlinx$atomicfu$value;
  }
  function _get_aliveSegmentLeft__mr4ndu($this) {
    var cur = $this.g12();
    while (!(cur === null) ? cur.y11() : false)
      cur = cur.c12_1.kotlinx$atomicfu$value;
    return cur;
  }
  function _get_aliveSegmentRight__7ulr0b($this) {
    // Inline function 'kotlinx.coroutines.assert' call
    var cur = ensureNotNull($this.d12());
    while (cur.y11()) {
      var tmp0_elvis_lhs = cur.d12();
      var tmp;
      if (tmp0_elvis_lhs == null) {
        return cur;
      } else {
        tmp = tmp0_elvis_lhs;
      }
      cur = tmp;
    }
    return cur;
  }
  function ConcurrentLinkedListNode(prev) {
    this.b12_1 = atomic$ref$1(null);
    this.c12_1 = atomic$ref$1(prev);
  }
  protoOf(ConcurrentLinkedListNode).d12 = function () {
    // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
    // Inline function 'kotlin.let' call
    // Inline function 'kotlin.contracts.contract' call
    // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed.<anonymous>' call
    var it = _get_nextOrClosed__w0gmuv(this);
    var tmp;
    if (it === get_CLOSED()) {
      return null;
    } else {
      tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode) ? it : THROW_CCE();
    }
    return tmp;
  };
  protoOf(ConcurrentLinkedListNode).e12 = function (value) {
    return this.b12_1.atomicfu$compareAndSet(null, value);
  };
  protoOf(ConcurrentLinkedListNode).f12 = function () {
    return this.d12() == null;
  };
  protoOf(ConcurrentLinkedListNode).g12 = function () {
    return this.c12_1.kotlinx$atomicfu$value;
  };
  protoOf(ConcurrentLinkedListNode).h12 = function () {
    // Inline function 'kotlinx.atomicfu.AtomicRef.lazySet' call
    this.c12_1.kotlinx$atomicfu$value = null;
  };
  protoOf(ConcurrentLinkedListNode).i12 = function () {
    return this.b12_1.atomicfu$compareAndSet(null, get_CLOSED());
  };
  protoOf(ConcurrentLinkedListNode).e1 = function () {
    // Inline function 'kotlinx.coroutines.assert' call
    if (this.f12())
      return Unit_instance;
    $l$loop_0: while (true) {
      var prev = _get_aliveSegmentLeft__mr4ndu(this);
      var next = _get_aliveSegmentRight__7ulr0b(this);
      $l$block: {
        // Inline function 'kotlinx.atomicfu.update' call
        var this_0 = next.c12_1;
        while (true) {
          var cur = this_0.kotlinx$atomicfu$value;
          // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.remove.<anonymous>' call
          var upd = cur === null ? null : prev;
          if (this_0.atomicfu$compareAndSet(cur, upd)) {
            break $l$block;
          }
        }
      }
      if (!(prev === null))
        prev.b12_1.kotlinx$atomicfu$value = next;
      if (next.y11() ? !next.f12() : false)
        continue $l$loop_0;
      if (!(prev === null) ? prev.y11() : false)
        continue $l$loop_0;
      return Unit_instance;
    }
  };
  function findSegmentInternal(_this__u8e3s4, id, createNewSegment) {
    _init_properties_ConcurrentLinkedList_kt__5gcgzy();
    var cur = _this__u8e3s4;
    $l$loop: while (cur.cs_1.z6(id) < 0 ? true : cur.y11()) {
      // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed' call
      var this_0 = cur;
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.internal.ConcurrentLinkedListNode.nextOrIfClosed.<anonymous>' call
      var it = _get_nextOrClosed__w0gmuv(this_0);
      var tmp;
      if (it === get_CLOSED()) {
        return _SegmentOrClosed___init__impl__jnexvb(get_CLOSED());
      } else {
        tmp = (it == null ? true : it instanceof ConcurrentLinkedListNode) ? it : THROW_CCE();
      }
      var next = tmp;
      if (!(next == null)) {
        cur = next;
        continue $l$loop;
      }
      // Inline function 'kotlin.Long.plus' call
      var newTail = createNewSegment(cur.cs_1.eb(toLong(1)), cur);
      if (cur.e12(newTail)) {
        if (cur.y11()) {
          cur.e1();
        }
        cur = newTail;
      }
    }
    return _SegmentOrClosed___init__impl__jnexvb(cur);
  }
  var properties_initialized_ConcurrentLinkedList_kt_kwt434;
  function _init_properties_ConcurrentLinkedList_kt__5gcgzy() {
    if (!properties_initialized_ConcurrentLinkedList_kt_kwt434) {
      properties_initialized_ConcurrentLinkedList_kt_kwt434 = true;
      CLOSED = new Symbol('CLOSED');
    }
  }
  function handleUncaughtCoroutineException(context, exception) {
    var tmp0_iterator = get_platformExceptionHandlers().o();
    while (tmp0_iterator.d1()) {
      var handler = tmp0_iterator.f1();
      try {
        handler.hu(context, exception);
      } catch ($p) {
        if ($p instanceof ExceptionSuccessfullyProcessed) {
          var _ = $p;
          return Unit_instance;
        } else {
          if ($p instanceof Error) {
            var t = $p;
            propagateExceptionFinalResort(handlerException(exception, t));
          } else {
            throw $p;
          }
        }
      }
    }
    try {
      addSuppressed(exception, new DiagnosticCoroutineContextException(context));
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
      } else {
        throw $p;
      }
    }
    propagateExceptionFinalResort(exception);
  }
  function ExceptionSuccessfullyProcessed() {
  }
  function get_UNDEFINED() {
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    return UNDEFINED;
  }
  var UNDEFINED;
  function get_REUSABLE_CLAIMED() {
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    return REUSABLE_CLAIMED;
  }
  var REUSABLE_CLAIMED;
  function _get_reusableCancellableContinuation__9qex09($this) {
    var tmp = $this.ur_1.kotlinx$atomicfu$value;
    return tmp instanceof CancellableContinuationImpl ? tmp : null;
  }
  function DispatchedContinuation(dispatcher, continuation) {
    DispatchedTask.call(this, get_MODE_UNINITIALIZED());
    this.qr_1 = dispatcher;
    this.rr_1 = continuation;
    this.sr_1 = get_UNDEFINED();
    this.tr_1 = threadContextElements(this.t6());
    this.ur_1 = atomic$ref$1(null);
  }
  protoOf(DispatchedContinuation).t6 = function () {
    return this.rr_1.t6();
  };
  protoOf(DispatchedContinuation).xr = function () {
    return !(this.ur_1.kotlinx$atomicfu$value == null);
  };
  protoOf(DispatchedContinuation).n1g = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.ur_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.awaitReusability.<anonymous>' call
      if (!(this_0.kotlinx$atomicfu$value === get_REUSABLE_CLAIMED()))
        return Unit_instance;
    }
  };
  protoOf(DispatchedContinuation).gu = function () {
    this.n1g();
    var tmp0_safe_receiver = _get_reusableCancellableContinuation__9qex09(this);
    if (tmp0_safe_receiver == null)
      null;
    else {
      tmp0_safe_receiver.ts();
    }
  };
  protoOf(DispatchedContinuation).vr = function () {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.ur_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.claimReusableCancellableContinuation.<anonymous>' call
      var state = this_0.kotlinx$atomicfu$value;
      if (state === null) {
        this.ur_1.kotlinx$atomicfu$value = get_REUSABLE_CLAIMED();
        return null;
      } else {
        if (state instanceof CancellableContinuationImpl) {
          if (this.ur_1.atomicfu$compareAndSet(state, get_REUSABLE_CLAIMED())) {
            return state instanceof CancellableContinuationImpl ? state : THROW_CCE();
          }
        } else {
          if (state !== get_REUSABLE_CLAIMED()) {
            if (!(state instanceof Error)) {
              var message = 'Inconsistent state ' + toString_0(state);
              throw IllegalStateException_init_$Create$(toString(message));
            }
          }
        }
      }
    }
  };
  protoOf(DispatchedContinuation).dt = function (continuation) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.ur_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.tryReleaseClaimedContinuation.<anonymous>' call
      var state = this_0.kotlinx$atomicfu$value;
      if (state === get_REUSABLE_CLAIMED()) {
        if (this.ur_1.atomicfu$compareAndSet(get_REUSABLE_CLAIMED(), continuation))
          return null;
      } else {
        if (state instanceof Error) {
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.contracts.contract' call
          // Inline function 'kotlin.require' call
          // Inline function 'kotlin.contracts.contract' call
          if (!this.ur_1.atomicfu$compareAndSet(state, null)) {
            // Inline function 'kotlin.require.<anonymous>' call
            var message = 'Failed requirement.';
            throw IllegalArgumentException_init_$Create$(toString(message));
          }
          return state;
        } else {
          var message_0 = 'Inconsistent state ' + toString_0(state);
          throw IllegalStateException_init_$Create$(toString(message_0));
        }
      }
    }
  };
  protoOf(DispatchedContinuation).zr = function (cause) {
    // Inline function 'kotlinx.atomicfu.loop' call
    var this_0 = this.ur_1;
    while (true) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.postponeCancellation.<anonymous>' call
      var state = this_0.kotlinx$atomicfu$value;
      if (equals(state, get_REUSABLE_CLAIMED())) {
        if (this.ur_1.atomicfu$compareAndSet(get_REUSABLE_CLAIMED(), cause))
          return true;
      } else {
        if (state instanceof Error)
          return true;
        else {
          if (this.ur_1.atomicfu$compareAndSet(state, null))
            return false;
        }
      }
    }
  };
  protoOf(DispatchedContinuation).ws = function () {
    var state = this.sr_1;
    // Inline function 'kotlinx.coroutines.assert' call
    this.sr_1 = get_UNDEFINED();
    return state;
  };
  protoOf(DispatchedContinuation).us = function () {
    return this;
  };
  protoOf(DispatchedContinuation).u6 = function (result) {
    var context = this.rr_1.t6();
    var state = toState_0(result);
    if (this.qr_1.du(context)) {
      this.sr_1 = state;
      this.yr_1 = get_MODE_ATOMIC();
      this.qr_1.eu(context, this);
    } else {
      $l$block: {
        // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
        var mode = get_MODE_ATOMIC();
        // Inline function 'kotlinx.coroutines.assert' call
        var eventLoop = ThreadLocalEventLoop_getInstance().xu();
        if (false ? eventLoop.su() : false) {
          break $l$block;
        }
        var tmp;
        if (eventLoop.ru()) {
          this.sr_1 = state;
          this.yr_1 = mode;
          eventLoop.qu(this);
          tmp = true;
        } else {
          // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
          eventLoop.tu(true);
          try {
            // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeWith.<anonymous>' call
            // Inline function 'kotlinx.coroutines.withCoroutineContext' call
            this.t6();
            this.tr_1;
            this.rr_1.u6(result);
            $l$loop: while (eventLoop.pu()) {
            }
          } catch ($p) {
            if ($p instanceof Error) {
              var e = $p;
              this.ht(e, null);
            } else {
              throw $p;
            }
          }
          finally {
            eventLoop.uu(true);
          }
          tmp = false;
        }
      }
    }
  };
  protoOf(DispatchedContinuation).xs = function (takenState, cause) {
    if (takenState instanceof CompletedWithCancellation) {
      takenState.bu_1(cause);
    }
  };
  protoOf(DispatchedContinuation).s10 = function (context, value) {
    this.sr_1 = value;
    this.yr_1 = get_MODE_CANCELLABLE();
    this.qr_1.fu(context, this);
  };
  protoOf(DispatchedContinuation).toString = function () {
    return 'DispatchedContinuation[' + this.qr_1 + ', ' + toDebugString(this.rr_1) + ']';
  };
  function resumeCancellableWith(_this__u8e3s4, result, onCancellation) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    var tmp;
    if (_this__u8e3s4 instanceof DispatchedContinuation) {
      var state = toState_0(result, onCancellation);
      var tmp_0;
      if (_this__u8e3s4.qr_1.du(_this__u8e3s4.t6())) {
        _this__u8e3s4.sr_1 = state;
        _this__u8e3s4.yr_1 = get_MODE_CANCELLABLE();
        _this__u8e3s4.qr_1.eu(_this__u8e3s4.t6(), _this__u8e3s4);
        tmp_0 = Unit_instance;
      } else {
        $l$block: {
          // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
          var mode = get_MODE_CANCELLABLE();
          // Inline function 'kotlinx.coroutines.assert' call
          var eventLoop = ThreadLocalEventLoop_getInstance().xu();
          if (false ? eventLoop.su() : false) {
            break $l$block;
          }
          var tmp_1;
          if (eventLoop.ru()) {
            _this__u8e3s4.sr_1 = state;
            _this__u8e3s4.yr_1 = mode;
            eventLoop.qu(_this__u8e3s4);
            tmp_1 = true;
          } else {
            // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
            eventLoop.tu(true);
            try {
              // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeCancellableWith.<anonymous>' call
              var tmp$ret$3;
              $l$block_0: {
                // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeCancelled' call
                var job = _this__u8e3s4.t6().hc(Key_instance_3);
                if (!(job == null) ? !job.ko() : false) {
                  var cause = job.jp();
                  _this__u8e3s4.xs(state, cause);
                  // Inline function 'kotlin.coroutines.resumeWithException' call
                  // Inline function 'kotlin.Companion.failure' call
                  var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(cause));
                  _this__u8e3s4.u6(tmp$ret$1);
                  tmp$ret$3 = true;
                  break $l$block_0;
                }
                tmp$ret$3 = false;
              }
              if (!tmp$ret$3) {
                // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeUndispatchedWith' call
                // Inline function 'kotlinx.coroutines.withContinuationContext' call
                _this__u8e3s4.rr_1;
                _this__u8e3s4.tr_1;
                _this__u8e3s4.rr_1.u6(result);
              }
              $l$loop: while (eventLoop.pu()) {
              }
            } catch ($p) {
              if ($p instanceof Error) {
                var e = $p;
                _this__u8e3s4.ht(e, null);
              } else {
                throw $p;
              }
            }
            finally {
              eventLoop.uu(true);
            }
            tmp_1 = false;
          }
        }
        tmp_0 = Unit_instance;
      }
      tmp = tmp_0;
    } else {
      _this__u8e3s4.u6(result);
      tmp = Unit_instance;
    }
    return tmp;
  }
  function yieldUndispatched(_this__u8e3s4) {
    _init_properties_DispatchedContinuation_kt__tnmqc0();
    var tmp$ret$0;
    $l$block: {
      // Inline function 'kotlinx.coroutines.internal.executeUnconfined' call
      var mode = get_MODE_CANCELLABLE();
      // Inline function 'kotlinx.coroutines.assert' call
      var eventLoop = ThreadLocalEventLoop_getInstance().xu();
      if (true ? eventLoop.su() : false) {
        tmp$ret$0 = false;
        break $l$block;
      }
      var tmp;
      if (eventLoop.ru()) {
        _this__u8e3s4.sr_1 = Unit_instance;
        _this__u8e3s4.yr_1 = mode;
        eventLoop.qu(_this__u8e3s4);
        tmp = true;
      } else {
        // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
        eventLoop.tu(true);
        try {
          // Inline function 'kotlinx.coroutines.internal.yieldUndispatched.<anonymous>' call
          _this__u8e3s4.gt();
          $l$loop: while (eventLoop.pu()) {
          }
        } catch ($p) {
          if ($p instanceof Error) {
            var e = $p;
            _this__u8e3s4.ht(e, null);
          } else {
            throw $p;
          }
        }
        finally {
          eventLoop.uu(true);
        }
        tmp = false;
      }
      tmp$ret$0 = tmp;
    }
    return tmp$ret$0;
  }
  var properties_initialized_DispatchedContinuation_kt_2siadq;
  function _init_properties_DispatchedContinuation_kt__tnmqc0() {
    if (!properties_initialized_DispatchedContinuation_kt_2siadq) {
      properties_initialized_DispatchedContinuation_kt_2siadq = true;
      UNDEFINED = new Symbol('UNDEFINED');
      REUSABLE_CLAIMED = new Symbol('REUSABLE_CLAIMED');
    }
  }
  function get_MODE_CANCELLABLE() {
    return MODE_CANCELLABLE;
  }
  var MODE_CANCELLABLE;
  function get_MODE_CANCELLABLE_REUSABLE() {
    return MODE_CANCELLABLE_REUSABLE;
  }
  var MODE_CANCELLABLE_REUSABLE;
  function DispatchedTask(resumeMode) {
    SchedulerTask.call(this);
    this.yr_1 = resumeMode;
  }
  protoOf(DispatchedTask).xs = function (takenState, cause) {
  };
  protoOf(DispatchedTask).ct = function (state) {
    return (state == null ? true : !(state == null)) ? state : THROW_CCE();
  };
  protoOf(DispatchedTask).ft = function (state) {
    var tmp0_safe_receiver = state instanceof CompletedExceptionally ? state : null;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver.po_1;
  };
  protoOf(DispatchedTask).gt = function () {
    // Inline function 'kotlinx.coroutines.assert' call
    var taskContext = get_taskContext(this);
    var fatalException = null;
    try {
      var tmp = this.us();
      var delegate = tmp instanceof DispatchedContinuation ? tmp : THROW_CCE();
      var continuation = delegate.rr_1;
      // Inline function 'kotlinx.coroutines.withContinuationContext' call
      delegate.tr_1;
      var context = continuation.t6();
      var state = this.ws();
      var exception = this.ft(state);
      var job = (exception == null ? get_isCancellableMode(this.yr_1) : false) ? context.hc(Key_instance_3) : null;
      var tmp_0;
      if (!(job == null) ? !job.ko() : false) {
        var cause = job.jp();
        this.xs(state, cause);
        // Inline function 'kotlin.Companion.failure' call
        var exception_0 = recoverStackTrace(cause, continuation);
        var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(exception_0));
        continuation.u6(tmp$ret$0);
        tmp_0 = Unit_instance;
      } else {
        var tmp_1;
        if (!(exception == null)) {
          // Inline function 'kotlin.coroutines.resumeWithException' call
          // Inline function 'kotlin.Companion.failure' call
          var tmp$ret$1 = _Result___init__impl__xyqfz8(createFailure(exception));
          continuation.u6(tmp$ret$1);
          tmp_1 = Unit_instance;
        } else {
          // Inline function 'kotlin.coroutines.resume' call
          // Inline function 'kotlin.Companion.success' call
          var value = this.ct(state);
          var tmp$ret$3 = _Result___init__impl__xyqfz8(value);
          continuation.u6(tmp$ret$3);
          tmp_1 = Unit_instance;
        }
        tmp_0 = tmp_1;
      }
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        fatalException = e;
      } else {
        throw $p;
      }
    }
    finally {
      // Inline function 'kotlin.runCatching' call
      var tmp_2;
      try {
        // Inline function 'kotlin.Companion.success' call
        // Inline function 'kotlinx.coroutines.DispatchedTask.run.<anonymous>' call
        // Inline function 'kotlinx.coroutines.afterTask' call
        tmp_2 = _Result___init__impl__xyqfz8(Unit_instance);
      } catch ($p) {
        var tmp_3;
        if ($p instanceof Error) {
          var e_0 = $p;
          // Inline function 'kotlin.Companion.failure' call
          tmp_3 = _Result___init__impl__xyqfz8(createFailure(e_0));
        } else {
          throw $p;
        }
        tmp_2 = tmp_3;
      }
      var result = tmp_2;
      this.ht(fatalException, Result__exceptionOrNull_impl_p6xea9(result));
    }
  };
  protoOf(DispatchedTask).ht = function (exception, finallyException) {
    if (exception === null ? finallyException === null : false)
      return Unit_instance;
    if (!(exception === null) ? !(finallyException === null) : false) {
      addSuppressed(exception, finallyException);
    }
    var cause = exception == null ? finallyException : exception;
    var reason = new CoroutinesInternalError('Fatal exception in coroutines machinery for ' + this + '. ' + "Please read KDoc to 'handleFatalException' method and report this incident to maintainers", ensureNotNull(cause));
    handleCoroutineException(this.us().t6(), reason);
  };
  function get_MODE_UNINITIALIZED() {
    return MODE_UNINITIALIZED;
  }
  var MODE_UNINITIALIZED;
  function get_isReusableMode(_this__u8e3s4) {
    return _this__u8e3s4 === 2;
  }
  function get_isCancellableMode(_this__u8e3s4) {
    return _this__u8e3s4 === 1 ? true : _this__u8e3s4 === 2;
  }
  function dispatch(_this__u8e3s4, mode) {
    // Inline function 'kotlinx.coroutines.assert' call
    var delegate = _this__u8e3s4.us();
    var undispatched = mode === 4;
    var tmp;
    var tmp_0;
    if (!undispatched) {
      tmp_0 = delegate instanceof DispatchedContinuation;
    } else {
      tmp_0 = false;
    }
    if (tmp_0) {
      tmp = get_isCancellableMode(mode) === get_isCancellableMode(_this__u8e3s4.yr_1);
    } else {
      tmp = false;
    }
    if (tmp) {
      var dispatcher = delegate.qr_1;
      var context = delegate.t6();
      if (dispatcher.du(context)) {
        dispatcher.eu(context, _this__u8e3s4);
      } else {
        resumeUnconfined(_this__u8e3s4);
      }
    } else {
      resume(_this__u8e3s4, delegate, undispatched);
    }
  }
  function get_MODE_UNDISPATCHED() {
    return MODE_UNDISPATCHED;
  }
  var MODE_UNDISPATCHED;
  function resumeUnconfined(_this__u8e3s4) {
    var eventLoop = ThreadLocalEventLoop_getInstance().xu();
    if (eventLoop.ru()) {
      eventLoop.qu(_this__u8e3s4);
    } else {
      // Inline function 'kotlinx.coroutines.runUnconfinedEventLoop' call
      eventLoop.tu(true);
      try {
        // Inline function 'kotlinx.coroutines.resumeUnconfined.<anonymous>' call
        resume(_this__u8e3s4, _this__u8e3s4.us(), true);
        $l$loop: while (eventLoop.pu()) {
        }
      } catch ($p) {
        if ($p instanceof Error) {
          var e = $p;
          _this__u8e3s4.ht(e, null);
        } else {
          throw $p;
        }
      }
      finally {
        eventLoop.uu(true);
      }
    }
  }
  function resume(_this__u8e3s4, delegate, undispatched) {
    var state = _this__u8e3s4.ws();
    var exception = _this__u8e3s4.ft(state);
    var tmp;
    if (!(exception == null)) {
      // Inline function 'kotlin.Companion.failure' call
      tmp = _Result___init__impl__xyqfz8(createFailure(exception));
    } else {
      // Inline function 'kotlin.Companion.success' call
      var value = _this__u8e3s4.ct(state);
      tmp = _Result___init__impl__xyqfz8(value);
    }
    var result = tmp;
    if (undispatched) {
      // Inline function 'kotlinx.coroutines.internal.DispatchedContinuation.resumeUndispatchedWith' call
      var this_0 = delegate instanceof DispatchedContinuation ? delegate : THROW_CCE();
      // Inline function 'kotlinx.coroutines.withContinuationContext' call
      this_0.rr_1;
      this_0.tr_1;
      this_0.rr_1.u6(result);
    } else {
      delegate.u6(result);
    }
  }
  function get_MODE_ATOMIC() {
    return MODE_ATOMIC;
  }
  var MODE_ATOMIC;
  function _InlineList___init__impl__z8n56(holder) {
    holder = holder === VOID ? null : holder;
    return holder;
  }
  function _get_holder__f6h5pd($this) {
    return $this;
  }
  function InlineList__plus_impl_nuetvo($this, element) {
    // Inline function 'kotlinx.coroutines.assert' call
    var tmp0_subject = _get_holder__f6h5pd($this);
    var tmp;
    if (tmp0_subject == null) {
      tmp = _InlineList___init__impl__z8n56(element);
    } else {
      if (tmp0_subject instanceof ArrayList) {
        var tmp_0 = _get_holder__f6h5pd($this);
        (tmp_0 instanceof ArrayList ? tmp_0 : THROW_CCE()).a1(element);
        tmp = _InlineList___init__impl__z8n56(_get_holder__f6h5pd($this));
      } else {
        var list = ArrayList_init_$Create$(4);
        var tmp_1 = _get_holder__f6h5pd($this);
        list.a1((tmp_1 == null ? true : !(tmp_1 == null)) ? tmp_1 : THROW_CCE());
        list.a1(element);
        tmp = _InlineList___init__impl__z8n56(list);
      }
    }
    return tmp;
  }
  function callUndeliveredElement(_this__u8e3s4, element, context) {
    var tmp0_safe_receiver = callUndeliveredElementCatchingException(_this__u8e3s4, element, null);
    if (tmp0_safe_receiver == null)
      null;
    else {
      // Inline function 'kotlin.let' call
      // Inline function 'kotlin.contracts.contract' call
      handleCoroutineException(context, tmp0_safe_receiver);
    }
  }
  function UndeliveredElementException(message, cause) {
    RuntimeException_init_$Init$(message, cause, this);
    captureStack(this, UndeliveredElementException);
  }
  function callUndeliveredElementCatchingException(_this__u8e3s4, element, undeliveredElementException) {
    undeliveredElementException = undeliveredElementException === VOID ? null : undeliveredElementException;
    try {
      _this__u8e3s4(element);
    } catch ($p) {
      if ($p instanceof Error) {
        var ex = $p;
        if (!(undeliveredElementException == null) ? !(undeliveredElementException.cause === ex) : false) {
          addSuppressed(undeliveredElementException, ex);
        } else {
          return new UndeliveredElementException('Exception in undelivered element handler for ' + element, ex);
        }
      } else {
        throw $p;
      }
    }
    return undeliveredElementException;
  }
  function bindCancellationFun(_this__u8e3s4, element, context) {
    return bindCancellationFun$lambda(_this__u8e3s4, element, context);
  }
  function bindCancellationFun$lambda($this_bindCancellationFun, $element, $context) {
    return function (_anonymous_parameter_0__qggqh8) {
      callUndeliveredElement($this_bindCancellationFun, $element, $context);
      return Unit_instance;
    };
  }
  function ContextScope(context) {
    this.o1g_1 = context;
  }
  protoOf(ContextScope).jo = function () {
    return this.o1g_1;
  };
  protoOf(ContextScope).toString = function () {
    return 'CoroutineScope(coroutineContext=' + this.o1g_1 + ')';
  };
  function ScopeCoroutine(context, uCont) {
    AbstractCoroutine.call(this, context, true, true);
    this.xq_1 = uCont;
  }
  protoOf(ScopeCoroutine).cq = function () {
    return true;
  };
  protoOf(ScopeCoroutine).uo = function (state) {
    resumeCancellableWith(intercepted(this.xq_1), recoverResult(state, this.xq_1));
  };
  protoOf(ScopeCoroutine).to = function (state) {
    this.xq_1.u6(recoverResult(state, this.xq_1));
  };
  function Symbol(symbol) {
    this.p1g_1 = symbol;
  }
  protoOf(Symbol).toString = function () {
    return '<' + this.p1g_1 + '>';
  };
  function systemProp(propertyName, defaultValue, minValue, maxValue) {
    minValue = minValue === VOID ? 1 : minValue;
    maxValue = maxValue === VOID ? IntCompanionObject_instance.MAX_VALUE : maxValue;
    return systemProp_0(propertyName, toLong(defaultValue), toLong(minValue), toLong(maxValue)).ea();
  }
  function systemProp_0(propertyName, defaultValue, minValue, maxValue) {
    minValue = minValue === VOID ? new Long(1, 0) : minValue;
    var tmp;
    if (maxValue === VOID) {
      Companion_getInstance();
      tmp = new Long(-1, 2147483647);
    } else {
      tmp = maxValue;
    }
    maxValue = tmp;
    var tmp0_elvis_lhs = systemProp_1(propertyName);
    var tmp_0;
    if (tmp0_elvis_lhs == null) {
      return defaultValue;
    } else {
      tmp_0 = tmp0_elvis_lhs;
    }
    var value = tmp_0;
    var tmp1_elvis_lhs = toLongOrNull(value);
    var tmp_1;
    if (tmp1_elvis_lhs == null) {
      var message = "System property '" + propertyName + "' has unrecognized value '" + value + "'";
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_1 = tmp1_elvis_lhs;
    }
    var parsed = tmp_1;
    if (!(minValue.z6(parsed) <= 0 ? parsed.z6(maxValue) <= 0 : false)) {
      // Inline function 'kotlin.error' call
      var message_0 = "System property '" + propertyName + "' should be in range " + minValue.toString() + '..' + maxValue.toString() + ", but is '" + parsed.toString() + "'";
      throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return parsed;
  }
  function startCoroutineCancellable(_this__u8e3s4, receiver, completion, onCancellation) {
    onCancellation = onCancellation === VOID ? null : onCancellation;
    var tmp;
    try {
      var tmp_0 = intercepted(createCoroutineUnintercepted(_this__u8e3s4, receiver, completion));
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      resumeCancellableWith(tmp_0, tmp$ret$0, onCancellation);
      tmp = Unit_instance;
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var e = $p;
        dispatcherFailure$accessor$glj1hg(completion, e);
        tmp_1 = Unit_instance;
      } else {
        throw $p;
      }
      tmp = tmp_1;
    }
    return tmp;
  }
  function startCoroutineCancellable_0(_this__u8e3s4, fatalCompletion) {
    var tmp;
    try {
      var tmp_0 = intercepted(_this__u8e3s4);
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(Unit_instance);
      resumeCancellableWith(tmp_0, tmp$ret$0);
      tmp = Unit_instance;
    } catch ($p) {
      var tmp_1;
      if ($p instanceof Error) {
        var e = $p;
        dispatcherFailure$accessor$glj1hg(fatalCompletion, e);
        tmp_1 = Unit_instance;
      } else {
        throw $p;
      }
      tmp = tmp_1;
    }
    return tmp;
  }
  function dispatcherFailure(completion, e) {
    // Inline function 'kotlin.Companion.failure' call
    var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(e));
    completion.u6(tmp$ret$0);
    throw e;
  }
  function dispatcherFailure$accessor$glj1hg(completion, e) {
    return dispatcherFailure(completion, e);
  }
  function startUndispatchedOrReturn(_this__u8e3s4, receiver, block) {
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.intrinsics.undispatchedResult' call
      var tmp;
      try {
        // Inline function 'kotlinx.coroutines.intrinsics.startUndispatchedOrReturn.<anonymous>' call
        // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
        // Inline function 'kotlin.js.asDynamic' call
        var a = block;
        tmp = typeof a === 'function' ? a(receiver, _this__u8e3s4) : block.yc(receiver, _this__u8e3s4);
      } catch ($p) {
        var tmp_0;
        if ($p instanceof Error) {
          var e = $p;
          tmp_0 = new CompletedExceptionally(e);
        } else {
          throw $p;
        }
        tmp = tmp_0;
      }
      var result = tmp;
      if (result === get_COROUTINE_SUSPENDED()) {
        tmp$ret$3 = get_COROUTINE_SUSPENDED();
        break $l$block_0;
      }
      var state = _this__u8e3s4.so(result);
      if (state === get_COMPLETING_WAITING_CHILDREN()) {
        tmp$ret$3 = get_COROUTINE_SUSPENDED();
        break $l$block_0;
      }
      var tmp_1;
      if (state instanceof CompletedExceptionally) {
        var tmp_2;
        // Inline function 'kotlinx.coroutines.intrinsics.startUndispatchedOrReturn.<anonymous>' call
        state.po_1;
        if (true) {
          throw recoverStackTrace(state.po_1, _this__u8e3s4.xq_1);
        } else {
          if (result instanceof CompletedExceptionally) {
            throw recoverStackTrace(result.po_1, _this__u8e3s4.xq_1);
          } else {
            tmp_2 = result;
          }
        }
        tmp_1 = tmp_2;
      } else {
        tmp_1 = unboxState(state);
      }
      tmp$ret$3 = tmp_1;
    }
    return tmp$ret$3;
  }
  function startUndispatchedOrReturnIgnoreTimeout(_this__u8e3s4, receiver, block) {
    var tmp$ret$3;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.intrinsics.undispatchedResult' call
      var tmp;
      try {
        // Inline function 'kotlinx.coroutines.intrinsics.startUndispatchedOrReturnIgnoreTimeout.<anonymous>' call
        // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
        // Inline function 'kotlin.js.asDynamic' call
        var a = block;
        tmp = typeof a === 'function' ? a(receiver, _this__u8e3s4) : block.yc(receiver, _this__u8e3s4);
      } catch ($p) {
        var tmp_0;
        if ($p instanceof Error) {
          var e = $p;
          tmp_0 = new CompletedExceptionally(e);
        } else {
          throw $p;
        }
        tmp = tmp_0;
      }
      var result = tmp;
      if (result === get_COROUTINE_SUSPENDED()) {
        tmp$ret$3 = get_COROUTINE_SUSPENDED();
        break $l$block_0;
      }
      var state = _this__u8e3s4.so(result);
      if (state === get_COMPLETING_WAITING_CHILDREN()) {
        tmp$ret$3 = get_COROUTINE_SUSPENDED();
        break $l$block_0;
      }
      var tmp_1;
      if (state instanceof CompletedExceptionally) {
        var tmp_2;
        // Inline function 'kotlinx.coroutines.intrinsics.startUndispatchedOrReturnIgnoreTimeout.<anonymous>' call
        var e_0 = state.po_1;
        var tmp_3;
        if (e_0 instanceof TimeoutCancellationException) {
          tmp_3 = e_0.yz_1 === _this__u8e3s4;
        } else {
          tmp_3 = false;
        }
        if (!tmp_3) {
          throw recoverStackTrace(state.po_1, _this__u8e3s4.xq_1);
        } else {
          if (result instanceof CompletedExceptionally) {
            throw recoverStackTrace(result.po_1, _this__u8e3s4.xq_1);
          } else {
            tmp_2 = result;
          }
        }
        tmp_1 = tmp_2;
      } else {
        tmp_1 = unboxState(state);
      }
      tmp$ret$3 = tmp_1;
    }
    return tmp$ret$3;
  }
  function startCoroutineUndispatched(_this__u8e3s4, receiver, completion) {
    $l$block: {
      // Inline function 'kotlinx.coroutines.intrinsics.startDirect' call
      // Inline function 'kotlinx.coroutines.internal.probeCoroutineCreated' call
      var actualCompletion = completion;
      var tmp;
      try {
        // Inline function 'kotlinx.coroutines.intrinsics.startCoroutineUndispatched.<anonymous>' call
        // Inline function 'kotlinx.coroutines.withCoroutineContext' call
        completion.t6();
        // Inline function 'kotlinx.coroutines.intrinsics.startCoroutineUndispatched.<anonymous>.<anonymous>' call
        // Inline function 'kotlin.coroutines.intrinsics.startCoroutineUninterceptedOrReturn' call
        // Inline function 'kotlin.js.asDynamic' call
        var a = _this__u8e3s4;
        tmp = typeof a === 'function' ? a(receiver, actualCompletion) : _this__u8e3s4.yc(receiver, actualCompletion);
      } catch ($p) {
        var tmp_0;
        if ($p instanceof Error) {
          var e = $p;
          // Inline function 'kotlin.coroutines.resumeWithException' call
          // Inline function 'kotlin.Companion.failure' call
          var tmp$ret$6 = _Result___init__impl__xyqfz8(createFailure(e));
          actualCompletion.u6(tmp$ret$6);
          break $l$block;
        } else {
          throw $p;
        }
      }
      var value = tmp;
      if (!(value === get_COROUTINE_SUSPENDED())) {
        // Inline function 'kotlin.coroutines.resume' call
        // Inline function 'kotlin.Companion.success' call
        var value_0 = (value == null ? true : !(value == null)) ? value : THROW_CCE();
        var tmp$ret$9 = _Result___init__impl__xyqfz8(value_0);
        actualCompletion.u6(tmp$ret$9);
      }
    }
  }
  var DUMMY_PROCESS_RESULT_FUNCTION;
  function get_STATE_REG() {
    _init_properties_Select_kt__zhm2jg();
    return STATE_REG;
  }
  var STATE_REG;
  function get_STATE_COMPLETED() {
    _init_properties_Select_kt__zhm2jg();
    return STATE_COMPLETED;
  }
  var STATE_COMPLETED;
  function get_STATE_CANCELLED() {
    _init_properties_Select_kt__zhm2jg();
    return STATE_CANCELLED;
  }
  var STATE_CANCELLED;
  function get_NO_RESULT() {
    _init_properties_Select_kt__zhm2jg();
    return NO_RESULT;
  }
  var NO_RESULT;
  var PARAM_CLAUSE_0;
  function SelectInstance() {
  }
  function trySelectInternal($this, clauseObject, internalResult) {
    $l$loop: while (true) {
      var curState = $this.x13_1.kotlinx$atomicfu$value;
      if (isInterface(curState, CancellableContinuation)) {
        var tmp0_elvis_lhs = findClause($this, clauseObject);
        var tmp;
        if (tmp0_elvis_lhs == null) {
          continue $l$loop;
        } else {
          tmp = tmp0_elvis_lhs;
        }
        var clause = tmp;
        var onCancellation = clause.u1g($this, internalResult);
        if ($this.x13_1.atomicfu$compareAndSet(curState, clause)) {
          var cont = isInterface(curState, CancellableContinuation) ? curState : THROW_CCE();
          $this.z13_1 = internalResult;
          if (tryResume_1(cont, onCancellation))
            return 0;
          $this.z13_1 = get_NO_RESULT();
          return 2;
        }
      } else {
        var tmp_0;
        if (equals(curState, get_STATE_COMPLETED())) {
          tmp_0 = true;
        } else {
          tmp_0 = curState instanceof ClauseData;
        }
        if (tmp_0)
          return 3;
        else {
          if (equals(curState, get_STATE_CANCELLED()))
            return 2;
          else {
            if (equals(curState, get_STATE_REG())) {
              if ($this.x13_1.atomicfu$compareAndSet(curState, listOf_0(clauseObject)))
                return 1;
            } else {
              if (isInterface(curState, List)) {
                if ($this.x13_1.atomicfu$compareAndSet(curState, plus_0(curState, clauseObject)))
                  return 1;
              } else {
                var message = 'Unexpected state: ' + toString(curState);
                throw IllegalStateException_init_$Create$(toString(message));
              }
            }
          }
        }
      }
    }
  }
  function findClause($this, clauseObject) {
    var tmp0_elvis_lhs = $this.y13_1;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return null;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var clauses = tmp;
    // Inline function 'kotlin.collections.find' call
    var tmp$ret$1;
    $l$block: {
      // Inline function 'kotlin.collections.firstOrNull' call
      var tmp0_iterator = clauses.o();
      while (tmp0_iterator.d1()) {
        var element = tmp0_iterator.f1();
        // Inline function 'kotlinx.coroutines.selects.SelectImplementation.findClause.<anonymous>' call
        if (element.r1g_1 === clauseObject) {
          tmp$ret$1 = element;
          break $l$block;
        }
      }
      tmp$ret$1 = null;
    }
    var tmp1_elvis_lhs = tmp$ret$1;
    var tmp_0;
    if (tmp1_elvis_lhs == null) {
      var message = 'Clause with object ' + toString(clauseObject) + ' is not found';
      throw IllegalStateException_init_$Create$(toString(message));
    } else {
      tmp_0 = tmp1_elvis_lhs;
    }
    return tmp_0;
  }
  function ClauseData() {
  }
  protoOf(ClauseData).u1g = function (select, internalResult) {
    var tmp0_safe_receiver = this.t1g_1;
    return tmp0_safe_receiver == null ? null : tmp0_safe_receiver(select, this.s1g_1, internalResult);
  };
  function SelectImplementation() {
  }
  protoOf(SelectImplementation).a14 = function (clauseObject, result) {
    return TrySelectDetailedResult_0(trySelectInternal(this, clauseObject, result));
  };
  var TrySelectDetailedResult_SUCCESSFUL_instance;
  var TrySelectDetailedResult_REREGISTER_instance;
  var TrySelectDetailedResult_CANCELLED_instance;
  var TrySelectDetailedResult_ALREADY_SELECTED_instance;
  var TrySelectDetailedResult_entriesInitialized;
  function TrySelectDetailedResult_initEntries() {
    if (TrySelectDetailedResult_entriesInitialized)
      return Unit_instance;
    TrySelectDetailedResult_entriesInitialized = true;
    TrySelectDetailedResult_SUCCESSFUL_instance = new TrySelectDetailedResult('SUCCESSFUL', 0);
    TrySelectDetailedResult_REREGISTER_instance = new TrySelectDetailedResult('REREGISTER', 1);
    TrySelectDetailedResult_CANCELLED_instance = new TrySelectDetailedResult('CANCELLED', 2);
    TrySelectDetailedResult_ALREADY_SELECTED_instance = new TrySelectDetailedResult('ALREADY_SELECTED', 3);
  }
  function TrySelectDetailedResult(name, ordinal) {
    Enum.call(this, name, ordinal);
  }
  function TrySelectDetailedResult_0(trySelectInternalResult) {
    _init_properties_Select_kt__zhm2jg();
    var tmp;
    switch (trySelectInternalResult) {
      case 0:
        tmp = TrySelectDetailedResult_SUCCESSFUL_getInstance();
        break;
      case 1:
        tmp = TrySelectDetailedResult_REREGISTER_getInstance();
        break;
      case 2:
        tmp = TrySelectDetailedResult_CANCELLED_getInstance();
        break;
      case 3:
        tmp = TrySelectDetailedResult_ALREADY_SELECTED_getInstance();
        break;
      default:
        var message = 'Unexpected internal result: ' + trySelectInternalResult;
        throw IllegalStateException_init_$Create$(toString(message));
    }
    return tmp;
  }
  function tryResume_1(_this__u8e3s4, onCancellation) {
    _init_properties_Select_kt__zhm2jg();
    var tmp0_elvis_lhs = _this__u8e3s4.yq(Unit_instance, null, onCancellation);
    var tmp;
    if (tmp0_elvis_lhs == null) {
      return false;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    var token = tmp;
    _this__u8e3s4.zq(token);
    return true;
  }
  function DUMMY_PROCESS_RESULT_FUNCTION$lambda(_anonymous_parameter_0__qggqh8, _anonymous_parameter_1__qggqgd, _anonymous_parameter_2__qggqfi) {
    _init_properties_Select_kt__zhm2jg();
    return null;
  }
  function TrySelectDetailedResult_SUCCESSFUL_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_SUCCESSFUL_instance;
  }
  function TrySelectDetailedResult_REREGISTER_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_REREGISTER_instance;
  }
  function TrySelectDetailedResult_CANCELLED_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_CANCELLED_instance;
  }
  function TrySelectDetailedResult_ALREADY_SELECTED_getInstance() {
    TrySelectDetailedResult_initEntries();
    return TrySelectDetailedResult_ALREADY_SELECTED_instance;
  }
  var properties_initialized_Select_kt_7rpl36;
  function _init_properties_Select_kt__zhm2jg() {
    if (!properties_initialized_Select_kt_7rpl36) {
      properties_initialized_Select_kt_7rpl36 = true;
      DUMMY_PROCESS_RESULT_FUNCTION = DUMMY_PROCESS_RESULT_FUNCTION$lambda;
      STATE_REG = new Symbol('STATE_REG');
      STATE_COMPLETED = new Symbol('STATE_COMPLETED');
      STATE_CANCELLED = new Symbol('STATE_CANCELLED');
      NO_RESULT = new Symbol('NO_RESULT');
      PARAM_CLAUSE_0 = new Symbol('PARAM_CLAUSE_0');
    }
  }
  function get_NO_OWNER() {
    _init_properties_Mutex_kt__jod56b();
    return NO_OWNER;
  }
  var NO_OWNER;
  var ON_LOCK_ALREADY_LOCKED_BY_OWNER;
  function Mutex() {
  }
  function Mutex_0(locked) {
    locked = locked === VOID ? false : locked;
    _init_properties_Mutex_kt__jod56b();
    return new MutexImpl(locked);
  }
  function MutexImpl$CancellableContinuationWithOwner$tryResume$lambda(this$0, this$1) {
    return function (it) {
      this$0.g1h_1.kotlinx$atomicfu$value = this$1.j1h_1;
      this$0.x1g(this$1.j1h_1);
      return Unit_instance;
    };
  }
  function MutexImpl$CancellableContinuationWithOwner$resume$lambda(this$0, this$1) {
    return function (it) {
      this$0.x1g(this$1.j1h_1);
      return Unit_instance;
    };
  }
  function holdsLockImpl($this, owner) {
    $l$loop: while (true) {
      if (!$this.l1h())
        return 0;
      var curOwner = $this.g1h_1.kotlinx$atomicfu$value;
      if (curOwner === get_NO_OWNER())
        continue $l$loop;
      return curOwner === owner ? 1 : 2;
    }
  }
  function lockSuspend($this, owner, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutineReusable.<anonymous>' call
    var cancellable = getOrCreateCancellableContinuation(intercepted($completion));
    try {
      // Inline function 'kotlinx.coroutines.sync.MutexImpl.lockSuspend.<anonymous>' call
      var contWithOwner = new CancellableContinuationWithOwner($this, cancellable, owner);
      $this.acquireCont(contWithOwner);
    } catch ($p) {
      if ($p instanceof Error) {
        var e = $p;
        cancellable.bt();
        throw e;
      } else {
        throw $p;
      }
    }
    return cancellable.mq();
  }
  function tryLockImpl($this, owner) {
    $l$loop: while (true) {
      if ($this.t1h()) {
        // Inline function 'kotlinx.coroutines.assert' call
        $this.g1h_1.kotlinx$atomicfu$value = owner;
        return 0;
      } else {
        if (owner == null)
          return 1;
        switch (holdsLockImpl($this, owner)) {
          case 1:
            return 2;
          case 2:
            return 1;
          case 0:
            continue $l$loop;
        }
      }
    }
  }
  function CancellableContinuationWithOwner($outer, cont, owner) {
    this.k1h_1 = $outer;
    this.i1h_1 = cont;
    this.j1h_1 = owner;
  }
  protoOf(CancellableContinuationWithOwner).t6 = function () {
    return this.i1h_1.t6();
  };
  protoOf(CancellableContinuationWithOwner).ar = function (cause) {
    return this.i1h_1.ar(cause);
  };
  protoOf(CancellableContinuationWithOwner).zq = function (token) {
    this.i1h_1.zq(token);
  };
  protoOf(CancellableContinuationWithOwner).cr = function (handler) {
    this.i1h_1.cr(handler);
  };
  protoOf(CancellableContinuationWithOwner).bf = function (result) {
    this.i1h_1.u6(result);
  };
  protoOf(CancellableContinuationWithOwner).u6 = function (result) {
    return this.bf(result);
  };
  protoOf(CancellableContinuationWithOwner).u1h = function (_this__u8e3s4, value) {
    this.i1h_1.dr(_this__u8e3s4, Unit_instance);
  };
  protoOf(CancellableContinuationWithOwner).dr = function (_this__u8e3s4, value) {
    return this.u1h(_this__u8e3s4, value instanceof Unit ? value : THROW_CCE());
  };
  protoOf(CancellableContinuationWithOwner).et = function (segment, index) {
    this.i1h_1.et(segment, index);
  };
  protoOf(CancellableContinuationWithOwner).v1h = function (value, idempotent, onCancellation) {
    // Inline function 'kotlinx.coroutines.assert' call
    var token = this.i1h_1.yq(Unit_instance, idempotent, MutexImpl$CancellableContinuationWithOwner$tryResume$lambda(this.k1h_1, this));
    if (!(token == null)) {
      // Inline function 'kotlinx.coroutines.assert' call
      this.k1h_1.g1h_1.kotlinx$atomicfu$value = this.j1h_1;
    }
    return token;
  };
  protoOf(CancellableContinuationWithOwner).yq = function (value, idempotent, onCancellation) {
    return this.v1h(value instanceof Unit ? value : THROW_CCE(), idempotent, onCancellation);
  };
  protoOf(CancellableContinuationWithOwner).w1h = function (value, onCancellation) {
    // Inline function 'kotlinx.coroutines.assert' call
    this.k1h_1.g1h_1.kotlinx$atomicfu$value = this.j1h_1;
    this.i1h_1.er(Unit_instance, MutexImpl$CancellableContinuationWithOwner$resume$lambda(this.k1h_1, this));
  };
  protoOf(CancellableContinuationWithOwner).er = function (value, onCancellation) {
    return this.w1h(value instanceof Unit ? value : THROW_CCE(), onCancellation);
  };
  function MutexImpl$onSelectCancellationUnlockConstructor$lambda$lambda(this$0, $owner) {
    return function (it) {
      this$0.x1g($owner);
      return Unit_instance;
    };
  }
  function MutexImpl$onSelectCancellationUnlockConstructor$lambda(this$0) {
    return function (_anonymous_parameter_0__qggqh8, owner, _anonymous_parameter_2__qggqfi) {
      return MutexImpl$onSelectCancellationUnlockConstructor$lambda$lambda(this$0, owner);
    };
  }
  function MutexImpl(locked) {
    SemaphoreImpl.call(this, 1, locked ? 1 : 0);
    this.g1h_1 = atomic$ref$1(locked ? null : get_NO_OWNER());
    var tmp = this;
    tmp.h1h_1 = MutexImpl$onSelectCancellationUnlockConstructor$lambda(this);
  }
  protoOf(MutexImpl).l1h = function () {
    return this.x1h() === 0;
  };
  protoOf(MutexImpl).v1g = function (owner, $completion) {
    if (this.y1h(owner))
      return Unit_instance;
    return lockSuspend(this, owner, $completion);
  };
  protoOf(MutexImpl).y1h = function (owner) {
    var tmp;
    switch (tryLockImpl(this, owner)) {
      case 0:
        tmp = true;
        break;
      case 1:
        tmp = false;
        break;
      case 2:
        var message = 'This mutex is already locked by the specified owner: ' + toString_0(owner);
        throw IllegalStateException_init_$Create$(toString(message));
      default:
        var message_0 = 'unexpected';
        throw IllegalStateException_init_$Create$(toString(message_0));
    }
    return tmp;
  };
  protoOf(MutexImpl).x1g = function (owner) {
    $l$loop_0: while (true) {
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!this.l1h()) {
        // Inline function 'kotlinx.coroutines.sync.MutexImpl.unlock.<anonymous>' call
        var message = 'This mutex is not locked';
        throw IllegalStateException_init_$Create$(toString(message));
      }
      var curOwner = this.g1h_1.kotlinx$atomicfu$value;
      if (curOwner === get_NO_OWNER())
        continue $l$loop_0;
      // Inline function 'kotlin.check' call
      // Inline function 'kotlin.contracts.contract' call
      if (!(curOwner === owner ? true : owner == null)) {
        // Inline function 'kotlinx.coroutines.sync.MutexImpl.unlock.<anonymous>' call
        var message_0 = 'This mutex is locked by ' + toString_0(curOwner) + ', but ' + toString_0(owner) + ' is expected';
        throw IllegalStateException_init_$Create$(toString(message_0));
      }
      if (!this.g1h_1.atomicfu$compareAndSet(curOwner, get_NO_OWNER()))
        continue $l$loop_0;
      this.gu();
      return Unit_instance;
    }
  };
  protoOf(MutexImpl).toString = function () {
    return 'Mutex@' + get_hexAddress(this) + '[isLocked=' + this.l1h() + ',owner=' + toString_0(this.g1h_1.kotlinx$atomicfu$value) + ']';
  };
  var properties_initialized_Mutex_kt_yv4p3j;
  function _init_properties_Mutex_kt__jod56b() {
    if (!properties_initialized_Mutex_kt_yv4p3j) {
      properties_initialized_Mutex_kt_yv4p3j = true;
      NO_OWNER = new Symbol('NO_OWNER');
      ON_LOCK_ALREADY_LOCKED_BY_OWNER = new Symbol('ALREADY_LOCKED_BY_OWNER');
    }
  }
  function get_MAX_SPIN_CYCLES() {
    _init_properties_Semaphore_kt__t514r6();
    return MAX_SPIN_CYCLES;
  }
  var MAX_SPIN_CYCLES;
  function get_PERMIT() {
    _init_properties_Semaphore_kt__t514r6();
    return PERMIT;
  }
  var PERMIT;
  function get_TAKEN() {
    _init_properties_Semaphore_kt__t514r6();
    return TAKEN;
  }
  var TAKEN;
  function get_BROKEN() {
    _init_properties_Semaphore_kt__t514r6();
    return BROKEN;
  }
  var BROKEN;
  function get_CANCELLED() {
    _init_properties_Semaphore_kt__t514r6();
    return CANCELLED;
  }
  var CANCELLED;
  function get_SEGMENT_SIZE_0() {
    _init_properties_Semaphore_kt__t514r6();
    return SEGMENT_SIZE_0;
  }
  var SEGMENT_SIZE_0;
  function decPermits($this) {
    $l$loop: while (true) {
      var p = $this.r1h_1.atomicfu$getAndDecrement();
      if (p > $this.m1h_1)
        continue $l$loop;
      return p;
    }
  }
  function coerceAvailablePermitsAtMaximum($this) {
    $l$loop_0: while (true) {
      var cur = $this.r1h_1.kotlinx$atomicfu$value;
      if (cur <= $this.m1h_1)
        break $l$loop_0;
      if ($this.r1h_1.atomicfu$compareAndSet(cur, $this.m1h_1))
        break $l$loop_0;
    }
  }
  function addAcquireToQueue($this, waiter) {
    var curTail = $this.p1h_1.kotlinx$atomicfu$value;
    var enqIdx = $this.q1h_1.atomicfu$getAndIncrement$long();
    var createNewSegment = createSegment$ref_0();
    var tmp$ret$2;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      var this_0 = $this.p1h_1;
      // Inline function 'kotlin.Long.div' call
      var other = get_SEGMENT_SIZE_0();
      var id = enqIdx.v9(toLong(other));
      while (true) {
        var s = findSegmentInternal(curTail, id, createNewSegment);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp$ret$1;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            var to = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
            while (true) {
              // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
              var cur = this_0.kotlinx$atomicfu$value;
              if (cur.cs_1.z6(to.cs_1) >= 0) {
                tmp$ret$1 = true;
                break $l$block_1;
              }
              if (!to.z11()) {
                tmp$ret$1 = false;
                break $l$block_1;
              }
              if (this_0.atomicfu$compareAndSet(cur, to)) {
                if (cur.a12()) {
                  cur.e1();
                }
                tmp$ret$1 = true;
                break $l$block_1;
              }
              if (to.a12()) {
                to.e1();
              }
            }
            tmp$ret$1 = Unit_instance;
          }
          tmp = tmp$ret$1;
        }
        if (tmp) {
          tmp$ret$2 = s;
          break $l$block_2;
        }
      }
    }
    var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(tmp$ret$2);
    // Inline function 'kotlin.Long.rem' call
    var other_0 = get_SEGMENT_SIZE_0();
    var i = enqIdx.gb(toLong(other_0)).ea();
    // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.cas' call
    if (segment.d1i_1.atomicfu$get(i).atomicfu$compareAndSet(null, waiter)) {
      waiter.et(segment, i);
      return true;
    }
    // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.cas' call
    var expected = get_PERMIT();
    var value = get_TAKEN();
    if (segment.d1i_1.atomicfu$get(i).atomicfu$compareAndSet(expected, value)) {
      if (isInterface(waiter, CancellableContinuation)) {
        if (!isInterface(waiter, CancellableContinuation))
          THROW_CCE();
        waiter.er(Unit_instance, $this.s1h_1);
      } else {
        if (isInterface(waiter, SelectInstance)) {
          waiter.q1g(Unit_instance);
        } else {
          var message = 'unexpected: ' + waiter;
          throw IllegalStateException_init_$Create$(toString(message));
        }
      }
      return true;
    }
    // Inline function 'kotlinx.coroutines.assert' call
    return false;
  }
  function tryResumeNextFromQueue($this) {
    var curHead = $this.n1h_1.kotlinx$atomicfu$value;
    var deqIdx = $this.o1h_1.atomicfu$getAndIncrement$long();
    // Inline function 'kotlin.Long.div' call
    var other = get_SEGMENT_SIZE_0();
    var id = deqIdx.v9(toLong(other));
    var createNewSegment = createSegment$ref_1();
    var tmp$ret$2;
    $l$block_2: {
      // Inline function 'kotlinx.coroutines.internal.findSegmentAndMoveForward' call
      var this_0 = $this.n1h_1;
      while (true) {
        var s = findSegmentInternal(curHead, id, createNewSegment);
        var tmp;
        if (_SegmentOrClosed___get_isClosed__impl__qmxmlo(s)) {
          tmp = true;
        } else {
          var tmp$ret$1;
          $l$block_1: {
            // Inline function 'kotlinx.coroutines.internal.moveForward' call
            var to = _SegmentOrClosed___get_segment__impl__jvcr9l(s);
            while (true) {
              // Inline function 'kotlinx.coroutines.internal.moveForward.<anonymous>' call
              var cur = this_0.kotlinx$atomicfu$value;
              if (cur.cs_1.z6(to.cs_1) >= 0) {
                tmp$ret$1 = true;
                break $l$block_1;
              }
              if (!to.z11()) {
                tmp$ret$1 = false;
                break $l$block_1;
              }
              if (this_0.atomicfu$compareAndSet(cur, to)) {
                if (cur.a12()) {
                  cur.e1();
                }
                tmp$ret$1 = true;
                break $l$block_1;
              }
              if (to.a12()) {
                to.e1();
              }
            }
            tmp$ret$1 = Unit_instance;
          }
          tmp = tmp$ret$1;
        }
        if (tmp) {
          tmp$ret$2 = s;
          break $l$block_2;
        }
      }
    }
    var segment = _SegmentOrClosed___get_segment__impl__jvcr9l(tmp$ret$2);
    segment.h12();
    if (segment.cs_1.z6(id) > 0)
      return false;
    // Inline function 'kotlin.Long.rem' call
    var other_0 = get_SEGMENT_SIZE_0();
    var i = deqIdx.gb(toLong(other_0)).ea();
    // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.getAndSet' call
    var value = get_PERMIT();
    var cellState = segment.d1i_1.atomicfu$get(i).atomicfu$getAndSet(value);
    if (cellState === null) {
      // Inline function 'kotlin.repeat' call
      var times = get_MAX_SPIN_CYCLES();
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      if (inductionVariable < times)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.coroutines.sync.SemaphoreImpl.tryResumeNextFromQueue.<anonymous>' call
          // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.get' call
          if (segment.d1i_1.atomicfu$get(i).kotlinx$atomicfu$value === get_TAKEN())
            return true;
        }
         while (inductionVariable < times);
      // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.cas' call
      var expected = get_PERMIT();
      var value_0 = get_BROKEN();
      return !segment.d1i_1.atomicfu$get(i).atomicfu$compareAndSet(expected, value_0);
    } else if (cellState === get_CANCELLED())
      return false;
    else
      return tryResumeAcquire(cellState, $this);
  }
  function tryResumeAcquire(_this__u8e3s4, $this) {
    var tmp;
    if (isInterface(_this__u8e3s4, CancellableContinuation)) {
      if (!isInterface(_this__u8e3s4, CancellableContinuation))
        THROW_CCE();
      var token = _this__u8e3s4.yq(Unit_instance, null, $this.s1h_1);
      var tmp_0;
      if (!(token == null)) {
        _this__u8e3s4.zq(token);
        tmp_0 = true;
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    } else {
      if (isInterface(_this__u8e3s4, SelectInstance)) {
        tmp = _this__u8e3s4.u13($this, Unit_instance);
      } else {
        var message = 'unexpected: ' + toString(_this__u8e3s4);
        throw IllegalStateException_init_$Create$(toString(message));
      }
    }
    return tmp;
  }
  function SemaphoreImpl$onCancellationRelease$lambda(this$0) {
    return function (_anonymous_parameter_0__qggqh8) {
      this$0.gu();
      return Unit_instance;
    };
  }
  function createSegment$ref_0() {
    var l = function (p0, p1) {
      return createSegment_0(p0, p1);
    };
    l.callableName = 'createSegment';
    return l;
  }
  function createSegment$ref_1() {
    var l = function (p0, p1) {
      return createSegment_0(p0, p1);
    };
    l.callableName = 'createSegment';
    return l;
  }
  function SemaphoreImpl(permits, acquiredPermits) {
    this.m1h_1 = permits;
    this.o1h_1 = atomic$long$1(new Long(0, 0));
    this.q1h_1 = atomic$long$1(new Long(0, 0));
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(this.m1h_1 > 0)) {
      // Inline function 'kotlinx.coroutines.sync.SemaphoreImpl.<anonymous>' call
      var message = 'Semaphore should have at least 1 permit, but had ' + this.m1h_1;
      throw IllegalArgumentException_init_$Create$(toString(message));
    }
    // Inline function 'kotlin.require' call
    // Inline function 'kotlin.contracts.contract' call
    if (!(0 <= acquiredPermits ? acquiredPermits <= this.m1h_1 : false)) {
      // Inline function 'kotlinx.coroutines.sync.SemaphoreImpl.<anonymous>' call
      var message_0 = 'The number of acquired permits should be in 0..' + this.m1h_1;
      throw IllegalArgumentException_init_$Create$(toString(message_0));
    }
    var s = new SemaphoreSegment(new Long(0, 0), null, 2);
    this.n1h_1 = atomic$ref$1(s);
    this.p1h_1 = atomic$ref$1(s);
    this.r1h_1 = atomic$int$1(this.m1h_1 - acquiredPermits | 0);
    var tmp = this;
    tmp.s1h_1 = SemaphoreImpl$onCancellationRelease$lambda(this);
  }
  protoOf(SemaphoreImpl).x1h = function () {
    // Inline function 'kotlin.math.max' call
    var a = this.r1h_1.kotlinx$atomicfu$value;
    return Math.max(a, 0);
  };
  protoOf(SemaphoreImpl).t1h = function () {
    $l$loop: while (true) {
      var p = this.r1h_1.kotlinx$atomicfu$value;
      if (p > this.m1h_1) {
        coerceAvailablePermitsAtMaximum(this);
        continue $l$loop;
      }
      if (p <= 0)
        return false;
      if (this.r1h_1.atomicfu$compareAndSet(p, p - 1 | 0))
        return true;
    }
  };
  protoOf(SemaphoreImpl).acquireCont = function (waiter) {
    var tmp$ret$0;
    $l$block_0: {
      // Inline function 'kotlinx.coroutines.sync.SemaphoreImpl.acquire' call
      while (true) {
        var p = decPermits(this);
        if (p > 0) {
          // Inline function 'kotlinx.coroutines.sync.SemaphoreImpl.acquire.<anonymous>' call
          waiter.er(Unit_instance, this.s1h_1);
          tmp$ret$0 = Unit_instance;
          break $l$block_0;
        }
        // Inline function 'kotlinx.coroutines.sync.SemaphoreImpl.acquire.<anonymous>' call
        if (addAcquireToQueue(this, isInterface(waiter, Waiter) ? waiter : THROW_CCE())) {
          tmp$ret$0 = Unit_instance;
          break $l$block_0;
        }
      }
    }
    return tmp$ret$0;
  };
  protoOf(SemaphoreImpl).gu = function () {
    while (true) {
      var p = this.r1h_1.atomicfu$getAndIncrement();
      if (p >= this.m1h_1) {
        coerceAvailablePermitsAtMaximum(this);
        // Inline function 'kotlin.error' call
        var message = 'The number of released permits cannot be greater than ' + this.m1h_1;
        throw IllegalStateException_init_$Create$(toString(message));
      }
      if (p >= 0)
        return Unit_instance;
      if (tryResumeNextFromQueue(this))
        return Unit_instance;
    }
  };
  function SemaphoreSegment(id, prev, pointers) {
    Segment.call(this, id, prev, pointers);
    this.d1i_1 = atomicfu$AtomicRefArray$ofNulls(get_SEGMENT_SIZE_0());
  }
  protoOf(SemaphoreSegment).a11 = function () {
    return get_SEGMENT_SIZE_0();
  };
  protoOf(SemaphoreSegment).es = function (index, cause, context) {
    // Inline function 'kotlinx.coroutines.sync.SemaphoreSegment.set' call
    var value = get_CANCELLED();
    this.d1i_1.atomicfu$get(index).kotlinx$atomicfu$value = value;
    this.x11();
  };
  protoOf(SemaphoreSegment).toString = function () {
    return 'SemaphoreSegment[id=' + this.cs_1.toString() + ', hashCode=' + hashCode(this) + ']';
  };
  function createSegment_0(id, prev) {
    _init_properties_Semaphore_kt__t514r6();
    return new SemaphoreSegment(id, prev, 0);
  }
  var properties_initialized_Semaphore_kt_uqcwok;
  function _init_properties_Semaphore_kt__t514r6() {
    if (!properties_initialized_Semaphore_kt_uqcwok) {
      properties_initialized_Semaphore_kt_uqcwok = true;
      MAX_SPIN_CYCLES = systemProp('kotlinx.coroutines.semaphore.maxSpinCycles', 100);
      PERMIT = new Symbol('PERMIT');
      TAKEN = new Symbol('TAKEN');
      BROKEN = new Symbol('BROKEN');
      CANCELLED = new Symbol('CANCELLED');
      SEGMENT_SIZE_0 = systemProp('kotlinx.coroutines.semaphore.segmentSize', 16);
    }
  }
  function toDebugString(_this__u8e3s4) {
    return toString(_this__u8e3s4);
  }
  function get_DefaultDelay() {
    var tmp = Dispatchers_getInstance().mz_1;
    return isInterface(tmp, Delay) ? tmp : THROW_CCE();
  }
  function createDefaultDispatcher() {
    var tmp;
    if (isJsdom()) {
      tmp = NodeDispatcher_getInstance();
    } else {
      var tmp_0;
      var tmp_1;
      if (!(typeof window === 'undefined')) {
        // Inline function 'kotlin.js.asDynamic' call
        tmp_1 = window != null;
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        // Inline function 'kotlin.js.asDynamic' call
        tmp_0 = !(typeof window.addEventListener === 'undefined');
      } else {
        tmp_0 = false;
      }
      if (tmp_0) {
        tmp = asCoroutineDispatcher(window);
      } else {
        if (typeof process === 'undefined' ? true : typeof process.nextTick === 'undefined') {
          tmp = SetTimeoutDispatcher_getInstance();
        } else {
          tmp = NodeDispatcher_getInstance();
        }
      }
    }
    return tmp;
  }
  function isJsdom() {
    return ((((!(typeof navigator === 'undefined') ? navigator != null : false) ? navigator.userAgent != null : false) ? !(typeof navigator.userAgent === 'undefined') : false) ? !(typeof navigator.userAgent.match === 'undefined') : false) ? navigator.userAgent.match('\\bjsdom\\b') : false;
  }
  function newCoroutineContext(_this__u8e3s4, context) {
    var combined = _this__u8e3s4.jo().vf(context);
    return (!(combined === Dispatchers_getInstance().mz_1) ? combined.hc(Key_instance) == null : false) ? combined.vf(Dispatchers_getInstance().mz_1) : combined;
  }
  function newCoroutineContext_0(_this__u8e3s4, addedContext) {
    return _this__u8e3s4.vf(addedContext);
  }
  function UndispatchedCoroutine(context, uCont) {
    ScopeCoroutine.call(this, context, uCont);
  }
  protoOf(UndispatchedCoroutine).to = function (state) {
    return this.xq_1.u6(recoverResult(state, this.xq_1));
  };
  function get_coroutineName(_this__u8e3s4) {
    return null;
  }
  var counter;
  function get_DEBUG() {
    return DEBUG;
  }
  var DEBUG;
  function get_classSimpleName(_this__u8e3s4) {
    var tmp0_elvis_lhs = getKClassFromExpression(_this__u8e3s4).e7();
    return tmp0_elvis_lhs == null ? 'Unknown' : tmp0_elvis_lhs;
  }
  function get_hexAddress(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    var result = _this__u8e3s4.__debug_counter;
    if (!(typeof result === 'number')) {
      counter = counter + 1 | 0;
      result = counter;
      // Inline function 'kotlin.js.asDynamic' call
      _this__u8e3s4.__debug_counter = result;
    }
    return ((!(result == null) ? typeof result === 'number' : false) ? result : THROW_CCE()).toString();
  }
  function NodeDispatcher() {
    NodeDispatcher_instance = this;
    SetTimeoutBasedDispatcher.call(this);
  }
  protoOf(NodeDispatcher).k1i = function () {
    process.nextTick(this.r1i_1.p1i_1);
  };
  var NodeDispatcher_instance;
  function NodeDispatcher_getInstance() {
    if (NodeDispatcher_instance == null)
      new NodeDispatcher();
    return NodeDispatcher_instance;
  }
  function ScheduledMessageQueue$processQueue$lambda(this$0) {
    return function () {
      this$0.v1i();
      return Unit_instance;
    };
  }
  function ScheduledMessageQueue(dispatcher) {
    MessageQueue.call(this);
    this.o1i_1 = dispatcher;
    var tmp = this;
    tmp.p1i_1 = ScheduledMessageQueue$processQueue$lambda(this);
  }
  protoOf(ScheduledMessageQueue).w1i = function () {
    this.o1i_1.k1i();
  };
  protoOf(ScheduledMessageQueue).x1i = function () {
    setTimeout(this.p1i_1, 0);
  };
  protoOf(ScheduledMessageQueue).y1i = function (timeout) {
    setTimeout(this.p1i_1, timeout);
  };
  function w3cSetTimeout(handler, timeout) {
    return setTimeout(handler, timeout);
  }
  function WindowMessageQueue$lambda(this$0) {
    return function (event) {
      var tmp;
      if (event.source == this$0.m1j_1 ? event.data == this$0.n1j_1 : false) {
        event.stopPropagation();
        this$0.v1i();
        tmp = Unit_instance;
      }
      return Unit_instance;
    };
  }
  function WindowMessageQueue$schedule$lambda(this$0) {
    return function (it) {
      this$0.v1i();
      return Unit_instance;
    };
  }
  function WindowMessageQueue(window_0) {
    MessageQueue.call(this);
    this.m1j_1 = window_0;
    this.n1j_1 = 'dispatchCoroutine';
    this.m1j_1.addEventListener('message', WindowMessageQueue$lambda(this), true);
  }
  protoOf(WindowMessageQueue).w1i = function () {
    var tmp = Promise.resolve(Unit_instance);
    tmp.then(WindowMessageQueue$schedule$lambda(this));
  };
  protoOf(WindowMessageQueue).x1i = function () {
    this.m1j_1.postMessage(this.n1j_1, '*');
  };
  function w3cSetTimeout_0(window_0, handler, timeout) {
    return setTimeout_0(window_0, handler, timeout);
  }
  function w3cClearTimeout(window_0, handle) {
    return window_0.clearTimeout(handle);
  }
  function w3cClearTimeout_0(handle) {
    return clearTimeout(handle);
  }
  function setTimeout_0(window_0, handler, timeout) {
    return window_0.setTimeout(handler, timeout);
  }
  function await_0(_this__u8e3s4, $completion) {
    // Inline function 'kotlinx.coroutines.suspendCancellableCoroutine.<anonymous>' call
    var cancellable = new CancellableContinuationImpl(intercepted($completion), get_MODE_CANCELLABLE());
    cancellable.vs();
    // Inline function 'kotlinx.coroutines.await.<anonymous>' call
    var tmp = await$lambda(cancellable);
    _this__u8e3s4.then(tmp, await$lambda_0(cancellable));
    return cancellable.mq();
  }
  function await$lambda($cont) {
    return function (it) {
      // Inline function 'kotlin.coroutines.resume' call
      var this_0 = $cont;
      // Inline function 'kotlin.Companion.success' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(it);
      this_0.u6(tmp$ret$0);
      return Unit_instance;
    };
  }
  function await$lambda_0($cont) {
    return function (it) {
      // Inline function 'kotlin.coroutines.resumeWithException' call
      var this_0 = $cont;
      // Inline function 'kotlin.Companion.failure' call
      var tmp$ret$0 = _Result___init__impl__xyqfz8(createFailure(it));
      this_0.u6(tmp$ret$0);
      return Unit_instance;
    };
  }
  function asCoroutineDispatcher(_this__u8e3s4) {
    // Inline function 'kotlin.js.asDynamic' call
    var tmp0_elvis_lhs = _this__u8e3s4.coroutineDispatcher;
    var tmp;
    if (tmp0_elvis_lhs == null) {
      // Inline function 'kotlin.also' call
      var this_0 = new WindowDispatcher(_this__u8e3s4);
      // Inline function 'kotlin.contracts.contract' call
      // Inline function 'kotlinx.coroutines.asCoroutineDispatcher.<anonymous>' call
      // Inline function 'kotlin.js.asDynamic' call
      _this__u8e3s4.coroutineDispatcher = this_0;
      tmp = this_0;
    } else {
      tmp = tmp0_elvis_lhs;
    }
    return tmp;
  }
  function propagateExceptionFinalResort(exception) {
    console.error(exception.toString());
  }
  function Dispatchers() {
    Dispatchers_instance = this;
    this.mz_1 = createDefaultDispatcher();
    this.nz_1 = Unconfined_getInstance();
    this.oz_1 = new JsMainDispatcher(this.mz_1, false);
    this.pz_1 = null;
  }
  protoOf(Dispatchers).qz = function () {
    var tmp0_elvis_lhs = this.pz_1;
    return tmp0_elvis_lhs == null ? this.oz_1 : tmp0_elvis_lhs;
  };
  var Dispatchers_instance;
  function Dispatchers_getInstance() {
    if (Dispatchers_instance == null)
      new Dispatchers();
    return Dispatchers_instance;
  }
  function JsMainDispatcher(delegate, invokeImmediately) {
    MainCoroutineDispatcher.call(this);
    this.p1j_1 = delegate;
    this.q1j_1 = invokeImmediately;
    this.r1j_1 = this.q1j_1 ? this : new JsMainDispatcher(this.p1j_1, true);
  }
  protoOf(JsMainDispatcher).kz = function () {
    return this.r1j_1;
  };
  protoOf(JsMainDispatcher).du = function (context) {
    return !this.q1j_1;
  };
  protoOf(JsMainDispatcher).eu = function (context, block) {
    return this.p1j_1.eu(context, block);
  };
  protoOf(JsMainDispatcher).fu = function (context, block) {
    return this.p1j_1.fu(context, block);
  };
  protoOf(JsMainDispatcher).toString = function () {
    var tmp0_elvis_lhs = this.lz();
    return tmp0_elvis_lhs == null ? this.p1j_1.toString() : tmp0_elvis_lhs;
  };
  function createEventLoop() {
    return new UnconfinedEventLoop();
  }
  function UnconfinedEventLoop() {
    EventLoop.call(this);
  }
  protoOf(UnconfinedEventLoop).eu = function (context, block) {
    unsupported();
  };
  function unsupported() {
    throw UnsupportedOperationException_init_$Create$('runBlocking event loop is not supported');
  }
  function JobCancellationException(message, cause, job) {
    CancellationException_init_$Init$_0(message, cause, this);
    captureStack(this, JobCancellationException);
    this.w1j_1 = job;
  }
  protoOf(JobCancellationException).toString = function () {
    return protoOf(CancellationException).toString.call(this) + '; job=' + this.w1j_1;
  };
  protoOf(JobCancellationException).equals = function (other) {
    var tmp;
    if (other === this) {
      tmp = true;
    } else {
      var tmp_0;
      var tmp_1;
      var tmp_2;
      if (other instanceof JobCancellationException) {
        tmp_2 = other.message == this.message;
      } else {
        tmp_2 = false;
      }
      if (tmp_2) {
        tmp_1 = equals(other.w1j_1, this.w1j_1);
      } else {
        tmp_1 = false;
      }
      if (tmp_1) {
        tmp_0 = equals(other.cause, this.cause);
      } else {
        tmp_0 = false;
      }
      tmp = tmp_0;
    }
    return tmp;
  };
  protoOf(JobCancellationException).hashCode = function () {
    var tmp = imul(imul(getStringHashCode(ensureNotNull(this.message)), 31) + hashCode(this.w1j_1) | 0, 31);
    var tmp0_safe_receiver = this.cause;
    var tmp1_elvis_lhs = tmp0_safe_receiver == null ? null : hashCode(tmp0_safe_receiver);
    return tmp + (tmp1_elvis_lhs == null ? 0 : tmp1_elvis_lhs) | 0;
  };
  function Runnable() {
  }
  function SchedulerTask() {
  }
  function get_taskContext(_this__u8e3s4) {
    return TaskContext_instance;
  }
  function TaskContext() {
  }
  var TaskContext_instance;
  function TaskContext_getInstance() {
    return TaskContext_instance;
  }
  function AbortFlowException(owner) {
    CancellationException_init_$Init$('Flow was aborted, no more elements needed', this);
    captureStack(this, AbortFlowException);
    this.y1e_1 = owner;
  }
  function SafeCollector$collectContextSize$lambda(count, _anonymous_parameter_1__qggqgd) {
    return count + 1 | 0;
  }
  function SafeCollector(collector, collectContext) {
    this.c1a_1 = collector;
    this.d1a_1 = collectContext;
    var tmp = this;
    tmp.e1a_1 = this.d1a_1.uf(0, SafeCollector$collectContextSize$lambda);
    this.f1a_1 = null;
  }
  protoOf(SafeCollector).p19 = function (value, $completion) {
    // Inline function 'kotlinx.coroutines.currentCoroutineContext' call
    // Inline function 'kotlin.js.getCoroutineContext' call
    var currentContext = $completion.t6();
    ensureActive(currentContext);
    if (!(this.f1a_1 === currentContext)) {
      checkContext(this, currentContext);
      this.f1a_1 = currentContext;
    }
    return this.c1a_1.p19(value, $completion);
  };
  protoOf(SafeCollector).g1a = function () {
  };
  function identitySet(expectedSize) {
    return HashSet_init_$Create$(expectedSize);
  }
  function WorkaroundAtomicReference(value) {
    this.k1d_1 = value;
  }
  protoOf(WorkaroundAtomicReference).zu = function () {
    return this.k1d_1;
  };
  protoOf(WorkaroundAtomicReference).av = function (value) {
    this.k1d_1 = value;
  };
  protoOf(WorkaroundAtomicReference).l1d = function (value) {
    var prev = this.k1d_1;
    this.k1d_1 = value;
    return prev;
  };
  protoOf(WorkaroundAtomicReference).h1d = function (expected, value) {
    if (this.k1d_1 === expected) {
      this.k1d_1 = value;
      return true;
    }
    return false;
  };
  function get_platformExceptionHandlers_() {
    _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf();
    return platformExceptionHandlers_;
  }
  var platformExceptionHandlers_;
  function get_platformExceptionHandlers() {
    _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf();
    return get_platformExceptionHandlers_();
  }
  function DiagnosticCoroutineContextException(context) {
    RuntimeException_init_$Init$_0(toString(context), this);
    captureStack(this, DiagnosticCoroutineContextException);
  }
  var properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx;
  function _init_properties_CoroutineExceptionHandlerImpl_kt__37d7wf() {
    if (!properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx) {
      properties_initialized_CoroutineExceptionHandlerImpl_kt_qhrgvx = true;
      // Inline function 'kotlin.collections.mutableSetOf' call
      platformExceptionHandlers_ = LinkedHashSet_init_$Create$();
    }
  }
  function SetTimeoutDispatcher() {
    SetTimeoutDispatcher_instance = this;
    SetTimeoutBasedDispatcher.call(this);
  }
  protoOf(SetTimeoutDispatcher).k1i = function () {
    this.r1i_1.y1i(0);
  };
  var SetTimeoutDispatcher_instance;
  function SetTimeoutDispatcher_getInstance() {
    if (SetTimeoutDispatcher_instance == null)
      new SetTimeoutDispatcher();
    return SetTimeoutDispatcher_instance;
  }
  function SetTimeoutBasedDispatcher$invokeOnTimeout$lambda($block) {
    return function () {
      $block.gt();
      return Unit_instance;
    };
  }
  function SetTimeoutBasedDispatcher$scheduleResumeAfterDelay$lambda($continuation, this$0) {
    return function () {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      $continuation.dr(this$0, Unit_instance);
      return Unit_instance;
    };
  }
  function SetTimeoutBasedDispatcher() {
    CoroutineDispatcher.call(this);
    this.r1i_1 = new ScheduledMessageQueue(this);
  }
  protoOf(SetTimeoutBasedDispatcher).eu = function (context, block) {
    this.r1i_1.i1j(block);
  };
  protoOf(SetTimeoutBasedDispatcher).ju = function (timeMillis, block, context) {
    var handle = w3cSetTimeout(SetTimeoutBasedDispatcher$invokeOnTimeout$lambda(block), delayToInt(timeMillis));
    return new ClearTimeout(handle);
  };
  protoOf(SetTimeoutBasedDispatcher).iu = function (timeMillis, continuation) {
    var handle = w3cSetTimeout(SetTimeoutBasedDispatcher$scheduleResumeAfterDelay$lambda(continuation, this), delayToInt(timeMillis));
    invokeOnCancellation(continuation, new ClearTimeout(handle));
  };
  function MessageQueue() {
    this.s1i_1 = ArrayDeque_init_$Create$();
    this.t1i_1 = 16;
    this.u1i_1 = false;
  }
  protoOf(MessageQueue).m = function () {
    return this.s1i_1.nd_1;
  };
  protoOf(MessageQueue).z1i = function (index, element) {
    this.s1i_1.a2(index, element);
  };
  protoOf(MessageQueue).a2 = function (index, element) {
    return this.z1i(index, (!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).a1j = function (element) {
    return this.s1i_1.a1(element);
  };
  protoOf(MessageQueue).a1 = function (element) {
    return this.a1j((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).b1j = function (index, elements) {
    return this.s1i_1.c2(index, elements);
  };
  protoOf(MessageQueue).c2 = function (index, elements) {
    return this.b1j(index, elements);
  };
  protoOf(MessageQueue).c1j = function (elements) {
    return this.s1i_1.g1(elements);
  };
  protoOf(MessageQueue).g1 = function (elements) {
    return this.c1j(elements);
  };
  protoOf(MessageQueue).h1 = function () {
    this.s1i_1.h1();
  };
  protoOf(MessageQueue).d1j = function (element) {
    return this.s1i_1.s(element);
  };
  protoOf(MessageQueue).s = function (element) {
    if (!(!(element == null) ? isInterface(element, Runnable) : false))
      return false;
    return this.d1j((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).e1j = function (elements) {
    return this.s1i_1.t(elements);
  };
  protoOf(MessageQueue).t = function (elements) {
    return this.e1j(elements);
  };
  protoOf(MessageQueue).n = function (index) {
    return this.s1i_1.n(index);
  };
  protoOf(MessageQueue).f1j = function (element) {
    return this.s1i_1.p(element);
  };
  protoOf(MessageQueue).p = function (element) {
    if (!(!(element == null) ? isInterface(element, Runnable) : false))
      return -1;
    return this.f1j((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).u = function () {
    return this.s1i_1.u();
  };
  protoOf(MessageQueue).o = function () {
    return this.s1i_1.o();
  };
  protoOf(MessageQueue).q = function (index) {
    return this.s1i_1.q(index);
  };
  protoOf(MessageQueue).g1j = function (element) {
    return this.s1i_1.b1(element);
  };
  protoOf(MessageQueue).b1 = function (element) {
    if (!(!(element == null) ? isInterface(element, Runnable) : false))
      return false;
    return this.g1j((!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).m1 = function (index) {
    return this.s1i_1.m1(index);
  };
  protoOf(MessageQueue).h1j = function (index, element) {
    return this.s1i_1.z(index, element);
  };
  protoOf(MessageQueue).z = function (index, element) {
    return this.h1j(index, (!(element == null) ? isInterface(element, Runnable) : false) ? element : THROW_CCE());
  };
  protoOf(MessageQueue).r = function (fromIndex, toIndex) {
    return this.s1i_1.r(fromIndex, toIndex);
  };
  protoOf(MessageQueue).i1j = function (element) {
    this.a1j(element);
    if (!this.u1i_1) {
      this.u1i_1 = true;
      this.w1i();
    }
  };
  protoOf(MessageQueue).v1i = function () {
    try {
      // Inline function 'kotlin.repeat' call
      var times = this.t1i_1;
      // Inline function 'kotlin.contracts.contract' call
      var inductionVariable = 0;
      if (inductionVariable < times)
        do {
          var index = inductionVariable;
          inductionVariable = inductionVariable + 1 | 0;
          // Inline function 'kotlinx.coroutines.MessageQueue.process.<anonymous>' call
          var tmp0_elvis_lhs = removeFirstOrNull(this);
          var tmp;
          if (tmp0_elvis_lhs == null) {
            return Unit_instance;
          } else {
            tmp = tmp0_elvis_lhs;
          }
          var element = tmp;
          element.gt();
        }
         while (inductionVariable < times);
    }finally {
      if (this.u()) {
        this.u1i_1 = false;
      } else {
        this.x1i();
      }
    }
  };
  function WindowClearTimeout($outer, handle) {
    this.a1k_1 = $outer;
    ClearTimeout.call(this, handle);
  }
  protoOf(WindowClearTimeout).or = function () {
    w3cClearTimeout(this.a1k_1.c1k_1, this.e1k_1);
  };
  function WindowDispatcher$scheduleResumeAfterDelay$lambda($continuation, this$0) {
    return function () {
      // Inline function 'kotlin.with' call
      // Inline function 'kotlin.contracts.contract' call
      $continuation.dr(this$0, Unit_instance);
      return Unit_instance;
    };
  }
  function Runnable$run$ref($boundThis) {
    var l = function () {
      $boundThis.gt();
      return Unit_instance;
    };
    l.callableName = 'run';
    return l;
  }
  function WindowDispatcher(window_0) {
    CoroutineDispatcher.call(this);
    this.c1k_1 = window_0;
    this.d1k_1 = new WindowMessageQueue(this.c1k_1);
  }
  protoOf(WindowDispatcher).eu = function (context, block) {
    return this.d1k_1.i1j(block);
  };
  protoOf(WindowDispatcher).iu = function (timeMillis, continuation) {
    var handle = w3cSetTimeout_0(this.c1k_1, WindowDispatcher$scheduleResumeAfterDelay$lambda(continuation, this), delayToInt(timeMillis));
    invokeOnCancellation(continuation, new WindowClearTimeout(this, handle));
  };
  protoOf(WindowDispatcher).ju = function (timeMillis, block, context) {
    var handle = w3cSetTimeout_0(this.c1k_1, Runnable$run$ref(block), delayToInt(timeMillis));
    return new WindowClearTimeout(this, handle);
  };
  function delayToInt(timeMillis) {
    return coerceIn(timeMillis, new Long(0, 0), new Long(2147483647, 0)).ea();
  }
  function ClearTimeout(handle) {
    this.e1k_1 = handle;
  }
  protoOf(ClearTimeout).or = function () {
    w3cClearTimeout_0(this.e1k_1);
  };
  protoOf(ClearTimeout).nr = function (cause) {
    this.or();
  };
  protoOf(ClearTimeout).toString = function () {
    return 'ClearTimeout[' + this.e1k_1 + ']';
  };
  function LinkedListHead() {
    LinkedListNode.call(this);
  }
  protoOf(LinkedListHead).ov = function () {
    throw UnsupportedOperationException_init_$Create$_0();
  };
  function LinkedListNode() {
    this.iv_1 = this;
    this.jv_1 = this;
    this.kv_1 = false;
  }
  protoOf(LinkedListNode).pv = function (node) {
    var prev = this.jv_1;
    node.iv_1 = this;
    node.jv_1 = prev;
    prev.iv_1 = node;
    this.jv_1 = node;
  };
  protoOf(LinkedListNode).ov = function () {
    return this.qv();
  };
  protoOf(LinkedListNode).or = function () {
    this.ov();
  };
  protoOf(LinkedListNode).qv = function () {
    if (this.kv_1)
      return false;
    var prev = this.jv_1;
    var next = this.iv_1;
    prev.iv_1 = next;
    next.jv_1 = prev;
    this.kv_1 = true;
    return true;
  };
  protoOf(LinkedListNode).wv = function (node) {
    if (!(this.iv_1 === this))
      return false;
    this.pv(node);
    return true;
  };
  function unwrap(exception) {
    return exception;
  }
  function recoverStackTrace(exception, continuation) {
    return exception;
  }
  function recoverStackTrace_0(exception) {
    return exception;
  }
  function SynchronizedObject() {
  }
  function systemProp_1(propertyName) {
    return null;
  }
  function threadContextElements(context) {
    return 0;
  }
  function CommonThreadLocal() {
    this.yu_1 = null;
  }
  protoOf(CommonThreadLocal).zu = function () {
    var tmp = this.yu_1;
    return (tmp == null ? true : !(tmp == null)) ? tmp : THROW_CCE();
  };
  protoOf(CommonThreadLocal).av = function (value) {
    this.yu_1 = value;
  };
  function commonThreadLocal(name) {
    return new CommonThreadLocal();
  }
  //region block: post-declaration
  protoOf(JobSupport).tp = cancel$default;
  protoOf(JobSupport).vf = plus;
  protoOf(JobSupport).hc = get_0;
  protoOf(JobSupport).uf = fold;
  protoOf(JobSupport).tf = minusKey_0;
  protoOf(CancellableContinuationImpl).br = cancel$default_0;
  protoOf(CoroutineDispatcher).hc = get;
  protoOf(CoroutineDispatcher).tf = minusKey;
  protoOf(BufferedChannel).q16 = close$default;
  protoOf(ChannelCoroutine).q16 = close$default;
  protoOf(CancellableContinuationWithOwner).br = cancel$default_0;
  protoOf(MutexImpl).w1g = lock$default;
  protoOf(MutexImpl).y1g = unlock$default;
  //endregion
  //region block: init
  Active_instance = new Active();
  Key_instance_1 = new Key_0();
  Key_instance_2 = new Key_1();
  Key_instance_3 = new Key_2();
  NonDisposableHandle_instance = new NonDisposableHandle();
  Key_instance_4 = new Key_3();
  DEFAULT_CLOSE_MESSAGE = 'Channel was closed';
  MODE_CANCELLABLE = 1;
  MODE_CANCELLABLE_REUSABLE = 2;
  MODE_UNINITIALIZED = -1;
  MODE_UNDISPATCHED = 4;
  MODE_ATOMIC = 0;
  counter = 0;
  DEBUG = false;
  TaskContext_instance = new TaskContext();
  //endregion
  //region block: exports
  _.$_$ = _.$_$ || {};
  _.$_$.a = BufferOverflow_DROP_OLDEST_getInstance;
  _.$_$.b = CoroutineStart_UNDISPATCHED_getInstance;
  _.$_$.c = first;
  _.$_$.d = await_0;
  _.$_$.e = cancelAndJoin;
  _.$_$.f = coroutineScope;
  _.$_$.g = delay;
  _.$_$.h = supervisorScope;
  _.$_$.i = withContext;
  _.$_$.j = withTimeoutOrNull;
  _.$_$.k = yield_0;
  _.$_$.l = ChannelResult__getOrNull_impl_f5e07h;
  _.$_$.m = _ChannelResult___get_isSuccess__impl__odq1z9;
  _.$_$.n = Factory_getInstance;
  _.$_$.o = Key_instance_1;
  _.$_$.p = Key_instance_2;
  _.$_$.q = Dispatchers_getInstance;
  _.$_$.r = Key_instance_3;
  _.$_$.s = Channel;
  _.$_$.t = cancelConsumed;
  _.$_$.u = FlowCollector;
  _.$_$.v = MutableSharedFlow;
  _.$_$.w = MutableStateFlow;
  _.$_$.x = flow;
  _.$_$.y = receiveAsFlow;
  _.$_$.z = Mutex_0;
  _.$_$.a1 = CancellableContinuationImpl;
  _.$_$.b1 = CompletableDeferred;
  _.$_$.c1 = CoroutineDispatcher;
  _.$_$.d1 = CoroutineScope_0;
  _.$_$.e1 = CoroutineScope;
  _.$_$.f1 = invokeOnTimeout;
  _.$_$.g1 = Delay;
  _.$_$.h1 = Job_0;
  _.$_$.i1 = get_MODE_CANCELLABLE;
  _.$_$.j1 = Runnable;
  _.$_$.k1 = SupervisorJob;
  _.$_$.l1 = cancel;
  _.$_$.m1 = cancel_0;
  _.$_$.n1 = get_isActive_0;
  _.$_$.o1 = get_isActive;
  _.$_$.p1 = get_job;
  _.$_$.q1 = launch;
  //endregion
  return _;
}));

//# sourceMappingURL=kotlinx-coroutines-core.js.map
