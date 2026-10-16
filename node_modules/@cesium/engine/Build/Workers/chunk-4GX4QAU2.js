/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.146.0
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  Check_default,
  DeveloperError_default,
  Event_default,
  Frozen_default,
  Math_default,
  RuntimeError_default,
  __require,
  __toESM,
  clone_default,
  combine_default,
  defined_default,
  getAbsoluteUri_default,
  getBaseUri_default,
  getExtensionFromUri_default,
  objectToQuery_default,
  queryToObject_default,
  require_URI
} from "./chunk-N4AX4H36.js";

// packages/engine/Source/Core/Resource.js
var import_urijs3 = __toESM(require_URI(), 1);

// packages/engine/Source/Core/appendForwardSlash.js
function appendForwardSlash(url) {
  if (url.length === 0 || url[url.length - 1] !== "/") {
    url = `${url}/`;
  }
  return url;
}
var appendForwardSlash_default = appendForwardSlash;

// packages/engine/Source/Core/defer.js
function defer() {
  let resolve;
  let reject;
  const promise = new Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });
  return {
    resolve,
    reject,
    promise
  };
}
var defer_default = defer;

// packages/engine/Source/Core/getImagePixels.js
var context2DsByWidthAndHeight = {};
function getImagePixels(image, width, height) {
  if (!defined_default(width)) {
    width = image.width;
  }
  if (!defined_default(height)) {
    height = image.height;
  }
  let context2DsByHeight = context2DsByWidthAndHeight[width];
  if (!defined_default(context2DsByHeight)) {
    context2DsByHeight = {};
    context2DsByWidthAndHeight[width] = context2DsByHeight;
  }
  let context2d = context2DsByHeight[height];
  if (!defined_default(context2d)) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    context2d = canvas.getContext("2d", { willReadFrequently: true });
    context2d.globalCompositeOperation = "copy";
    context2DsByHeight[height] = context2d;
  }
  context2d.drawImage(image, 0, 0, width, height);
  return context2d.getImageData(0, 0, width, height).data;
}
var getImagePixels_default = getImagePixels;

// packages/engine/Source/Core/isBlobUri.js
var blobUriRegex = /^blob:/i;
function isBlobUri(uri) {
  Check_default.typeOf.string("uri", uri);
  return blobUriRegex.test(uri);
}
var isBlobUri_default = isBlobUri;

// packages/engine/Source/Core/isCrossOriginUrl.js
var a;
function isCrossOriginUrl(url) {
  if (!defined_default(a)) {
    a = document.createElement("a");
  }
  a.href = window.location.href;
  const host = a.host;
  const protocol = a.protocol;
  a.href = url;
  a.href = a.href;
  return protocol !== a.protocol || host !== a.host;
}
var isCrossOriginUrl_default = isCrossOriginUrl;

// packages/engine/Source/Core/isDataUri.js
var dataUriRegex = /^data:/i;
function isDataUri(uri) {
  Check_default.typeOf.string("uri", uri);
  return dataUriRegex.test(uri);
}
var isDataUri_default = isDataUri;

// packages/engine/Source/Core/loadAndExecuteScript.js
function loadAndExecuteScript(url) {
  const script = document.createElement("script");
  script.async = true;
  script.src = url;
  return new Promise((resolve, reject) => {
    if (window.crossOriginIsolated) {
      script.setAttribute("crossorigin", "anonymous");
    }
    const head = document.getElementsByTagName("head")[0];
    script.onload = function() {
      script.onload = void 0;
      head.removeChild(script);
      resolve();
    };
    script.onerror = function(e) {
      reject(e);
    };
    head.appendChild(script);
  });
}
var loadAndExecuteScript_default = loadAndExecuteScript;

// packages/engine/Source/Core/RequestState.js
var RequestState = {
  /**
   * Initial unissued state.
   *
   * @type {number}
   * @constant
   */
  UNISSUED: 0,
  /**
   * Issued but not yet active. Will become active when open slots are available.
   *
   * @type {number}
   * @constant
   */
  ISSUED: 1,
  /**
   * Actual http request has been sent.
   *
   * @type {number}
   * @constant
   */
  ACTIVE: 2,
  /**
   * Request completed successfully.
   *
   * @type {number}
   * @constant
   */
  RECEIVED: 3,
  /**
   * Request was cancelled, either explicitly or automatically because of low priority.
   *
   * @type {number}
   * @constant
   */
  CANCELLED: 4,
  /**
   * Request failed.
   *
   * @type {number}
   * @constant
   */
  FAILED: 5
};
Object.freeze(RequestState);
var RequestState_default = RequestState;

// packages/engine/Source/Core/RequestType.js
var RequestType = {
  /**
   * Terrain request.
   *
   * @type {number}
   * @constant
   */
  TERRAIN: 0,
  /**
   * Imagery request.
   *
   * @type {number}
   * @constant
   */
  IMAGERY: 1,
  /**
   * 3D Tiles request.
   *
   * @type {number}
   * @constant
   */
  TILES3D: 2,
  /**
   * Other request.
   *
   * @type {number}
   * @constant
   */
  OTHER: 3
};
Object.freeze(RequestType);
var RequestType_default = RequestType;

// packages/engine/Source/Core/Request.js
function Request(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  const throttleByServer = options.throttleByServer ?? false;
  const throttle = options.throttle ?? false;
  this.url = options.url;
  this.requestFunction = options.requestFunction;
  this.cancelFunction = options.cancelFunction;
  this.priorityFunction = options.priorityFunction;
  this.priority = options.priority ?? 0;
  this.throttle = throttle;
  this.throttleByServer = throttleByServer;
  this.type = options.type ?? RequestType_default.OTHER;
  this.serverKey = options.serverKey;
  this.state = RequestState_default.UNISSUED;
  this.deferred = void 0;
  this.cancelled = false;
}
Request.prototype.cancel = function() {
  this.cancelled = true;
};
Request.prototype.clone = function(result) {
  if (!defined_default(result)) {
    return new Request(this);
  }
  result.url = this.url;
  result.requestFunction = this.requestFunction;
  result.cancelFunction = this.cancelFunction;
  result.priorityFunction = this.priorityFunction;
  result.priority = this.priority;
  result.throttle = this.throttle;
  result.throttleByServer = this.throttleByServer;
  result.type = this.type;
  result.serverKey = this.serverKey;
  result.state = RequestState_default.UNISSUED;
  result.deferred = void 0;
  result.cancelled = false;
  return result;
};
var Request_default = Request;

// packages/engine/Source/Core/parseResponseHeaders.js
function parseResponseHeaders(headerString) {
  const headers = {};
  if (!headerString) {
    return headers;
  }
  const headerPairs = headerString.split("\r\n");
  for (let i = 0; i < headerPairs.length; ++i) {
    const headerPair = headerPairs[i];
    const index = headerPair.indexOf(": ");
    if (index > 0) {
      const key = headerPair.substring(0, index);
      const val = headerPair.substring(index + 2);
      headers[key] = val;
    }
  }
  return headers;
}
var parseResponseHeaders_default = parseResponseHeaders;

// packages/engine/Source/Core/RequestErrorEvent.js
function RequestErrorEvent(statusCode, response, responseHeaders) {
  this.statusCode = statusCode;
  this.response = response;
  this.responseHeaders = responseHeaders;
  if (typeof this.responseHeaders === "string") {
    this.responseHeaders = parseResponseHeaders_default(this.responseHeaders);
  }
}
RequestErrorEvent.prototype.toString = function() {
  let str = "Request has failed.";
  if (defined_default(this.statusCode)) {
    str += ` Status Code: ${this.statusCode}`;
  }
  return str;
};
var RequestErrorEvent_default = RequestErrorEvent;

// packages/engine/Source/Core/RequestScheduler.js
var import_urijs = __toESM(require_URI(), 1);

// packages/engine/Source/Core/Heap.js
function Heap(options) {
  Check_default.typeOf.object("options", options);
  Check_default.defined("options.comparator", options.comparator);
  this._comparator = options.comparator;
  this._array = [];
  this._length = 0;
  this._maximumLength = void 0;
}
Object.defineProperties(Heap.prototype, {
  /**
   * Gets the length of the heap.
   *
   * @memberof Heap.prototype
   *
   * @type {number}
   * @readonly
   */
  length: {
    get: function() {
      return this._length;
    }
  },
  /**
   * Gets the internal array.
   *
   * @memberof Heap.prototype
   *
   * @type {Array}
   * @readonly
   */
  internalArray: {
    get: function() {
      return this._array;
    }
  },
  /**
   * Gets and sets the maximum length of the heap.
   *
   * @memberof Heap.prototype
   *
   * @type {number}
   */
  maximumLength: {
    get: function() {
      return this._maximumLength;
    },
    set: function(value) {
      Check_default.typeOf.number.greaterThanOrEquals("maximumLength", value, 0);
      const originalLength = this._length;
      if (value < originalLength) {
        const array = this._array;
        for (let i = value; i < originalLength; ++i) {
          array[i] = void 0;
        }
        this._length = value;
        array.length = value;
      }
      this._maximumLength = value;
    }
  },
  /**
   * The comparator to use for the heap. If comparator(a, b) is less than 0, sort a to a lower index than b, otherwise sort to a higher index.
   *
   * @memberof Heap.prototype
   *
   * @type {Heap.ComparatorCallback}
   */
  comparator: {
    get: function() {
      return this._comparator;
    }
  }
});
function swap(array, a3, b) {
  const temp = array[a3];
  array[a3] = array[b];
  array[b] = temp;
}
Heap.prototype.reserve = function(length) {
  length = length ?? this._length;
  this._array.length = length;
};
Heap.prototype.heapify = function(index) {
  index = index ?? 0;
  const length = this._length;
  const comparator = this._comparator;
  const array = this._array;
  let candidate;
  let inserting = true;
  while (inserting) {
    const right = 2 * (index + 1);
    const left = right - 1;
    if (left < length && comparator(array[left], array[index]) < 0) {
      candidate = left;
    } else {
      candidate = index;
    }
    if (right < length && comparator(array[right], array[candidate]) < 0) {
      candidate = right;
    }
    if (candidate !== index) {
      swap(array, candidate, index);
      index = candidate;
    } else {
      inserting = false;
    }
  }
};
Heap.prototype.resort = function() {
  const length = this._length;
  for (let i = Math.ceil(length / 2); i >= 0; --i) {
    this.heapify(i);
  }
};
Heap.prototype.insert = function(element) {
  Check_default.defined("element", element);
  const array = this._array;
  const comparator = this._comparator;
  const maximumLength = this._maximumLength;
  let index = this._length++;
  if (index < array.length) {
    array[index] = element;
  } else {
    array.push(element);
  }
  while (index !== 0) {
    const parent = Math.floor((index - 1) / 2);
    if (comparator(array[index], array[parent]) < 0) {
      swap(array, index, parent);
      index = parent;
    } else {
      break;
    }
  }
  let removedElement;
  if (defined_default(maximumLength) && this._length > maximumLength) {
    removedElement = array[maximumLength];
    this._length = maximumLength;
  }
  return removedElement;
};
Heap.prototype.pop = function(index) {
  index = index ?? 0;
  if (this._length === 0) {
    return void 0;
  }
  Check_default.typeOf.number.lessThan("index", index, this._length);
  const array = this._array;
  const root = array[index];
  swap(array, index, --this._length);
  this.heapify(index);
  array[this._length] = void 0;
  return root;
};
var Heap_default = Heap;

// packages/engine/Source/Core/RequestScheduler.js
function sortRequests(a3, b) {
  return a3.priority - b.priority;
}
var statistics = {
  numberOfAttemptedRequests: 0,
  numberOfActiveRequests: 0,
  numberOfCancelledRequests: 0,
  numberOfCancelledActiveRequests: 0,
  numberOfFailedRequests: 0,
  numberOfActiveRequestsEver: 0,
  lastNumberOfActiveRequests: 0
};
var priorityHeapLength = 20;
var requestHeap = new Heap_default({
  comparator: sortRequests
});
requestHeap.maximumLength = priorityHeapLength;
requestHeap.reserve(priorityHeapLength);
var activeRequests = [];
var numberOfActiveRequestsByServer = {};
var pageUri = typeof document !== "undefined" ? new import_urijs.default(document.location.href) : new import_urijs.default();
var requestCompletedEvent = new Event_default();
function RequestScheduler() {
}
RequestScheduler.maximumRequests = 50;
RequestScheduler.maximumRequestsPerServer = 18;
RequestScheduler.requestsByServer = {};
RequestScheduler.throttleRequests = true;
RequestScheduler.debugShowStatistics = false;
RequestScheduler.requestCompletedEvent = requestCompletedEvent;
Object.defineProperties(RequestScheduler, {
  /**
   * Returns the statistics used by the request scheduler.
   *
   * @memberof RequestScheduler
   *
   * @type {object}
   * @readonly
   * @private
   */
  statistics: {
    get: function() {
      return statistics;
    }
  },
  /**
   * The maximum size of the priority heap. This limits the number of requests that are sorted by priority. Only applies to requests that are not yet active.
   *
   * @memberof RequestScheduler
   *
   * @type {number}
   * @default 20
   * @private
   */
  priorityHeapLength: {
    get: function() {
      return priorityHeapLength;
    },
    set: function(value) {
      if (value < priorityHeapLength) {
        while (requestHeap.length > value) {
          const request = requestHeap.pop();
          cancelRequest(request);
        }
      }
      priorityHeapLength = value;
      requestHeap.maximumLength = value;
      requestHeap.reserve(value);
    }
  }
});
function updatePriority(request) {
  if (defined_default(request.priorityFunction)) {
    request.priority = request.priorityFunction();
  }
}
RequestScheduler.serverHasOpenSlots = function(serverKey, desiredRequests) {
  desiredRequests = desiredRequests ?? 1;
  const maxRequests = RequestScheduler.requestsByServer[serverKey] ?? RequestScheduler.maximumRequestsPerServer;
  const hasOpenSlotsServer = numberOfActiveRequestsByServer[serverKey] + desiredRequests <= maxRequests;
  return hasOpenSlotsServer;
};
RequestScheduler.heapHasOpenSlots = function(desiredRequests) {
  const hasOpenSlotsHeap = requestHeap.length + desiredRequests <= priorityHeapLength;
  return hasOpenSlotsHeap;
};
function issueRequest(request) {
  if (request.state === RequestState_default.UNISSUED) {
    request.state = RequestState_default.ISSUED;
    request.deferred = defer_default();
  }
  return request.deferred.promise;
}
function getRequestReceivedFunction(request) {
  return function(results) {
    if (request.state === RequestState_default.CANCELLED) {
      return;
    }
    const deferred = request.deferred;
    --statistics.numberOfActiveRequests;
    --numberOfActiveRequestsByServer[request.serverKey];
    requestCompletedEvent.raiseEvent();
    request.state = RequestState_default.RECEIVED;
    request.deferred = void 0;
    deferred.resolve(results);
  };
}
function getRequestFailedFunction(request) {
  return function(error) {
    if (request.state === RequestState_default.CANCELLED) {
      return;
    }
    ++statistics.numberOfFailedRequests;
    --statistics.numberOfActiveRequests;
    --numberOfActiveRequestsByServer[request.serverKey];
    requestCompletedEvent.raiseEvent(error);
    request.state = RequestState_default.FAILED;
    request.deferred.reject(error);
  };
}
function startRequest(request) {
  const promise = issueRequest(request);
  request.state = RequestState_default.ACTIVE;
  activeRequests.push(request);
  ++statistics.numberOfActiveRequests;
  ++statistics.numberOfActiveRequestsEver;
  ++numberOfActiveRequestsByServer[request.serverKey];
  request.requestFunction().then(getRequestReceivedFunction(request)).catch(getRequestFailedFunction(request));
  return promise;
}
function cancelRequest(request) {
  const active = request.state === RequestState_default.ACTIVE;
  request.state = RequestState_default.CANCELLED;
  ++statistics.numberOfCancelledRequests;
  if (defined_default(request.deferred)) {
    const deferred = request.deferred;
    deferred.promise.catch(() => {
    });
    request.deferred = void 0;
    deferred.reject(new RuntimeError_default(`Request cancelled: "${request.url}"`));
  }
  if (active) {
    --statistics.numberOfActiveRequests;
    --numberOfActiveRequestsByServer[request.serverKey];
    ++statistics.numberOfCancelledActiveRequests;
  }
  if (defined_default(request.cancelFunction)) {
    request.cancelFunction();
  }
}
RequestScheduler.update = function() {
  let i;
  let request;
  let removeCount = 0;
  const activeLength = activeRequests.length;
  for (i = 0; i < activeLength; ++i) {
    request = activeRequests[i];
    if (request.cancelled) {
      cancelRequest(request);
    }
    if (request.state !== RequestState_default.ACTIVE) {
      ++removeCount;
      continue;
    }
    if (removeCount > 0) {
      activeRequests[i - removeCount] = request;
    }
  }
  activeRequests.length -= removeCount;
  const issuedRequests = requestHeap.internalArray;
  const issuedLength = requestHeap.length;
  for (i = 0; i < issuedLength; ++i) {
    updatePriority(issuedRequests[i]);
  }
  requestHeap.resort();
  const openSlots = Math.max(
    RequestScheduler.maximumRequests - activeRequests.length,
    0
  );
  let filledSlots = 0;
  while (filledSlots < openSlots && requestHeap.length > 0) {
    request = requestHeap.pop();
    if (request.cancelled) {
      cancelRequest(request);
      continue;
    }
    if (request.throttleByServer && !RequestScheduler.serverHasOpenSlots(request.serverKey)) {
      cancelRequest(request);
      continue;
    }
    startRequest(request);
    ++filledSlots;
  }
  updateStatistics();
};
RequestScheduler.getServerKey = function(url) {
  Check_default.typeOf.string("url", url);
  let uri = new import_urijs.default(url);
  if (uri.scheme() === "") {
    uri = uri.absoluteTo(pageUri);
    uri.normalize();
  }
  let serverKey = uri.authority();
  if (!/:/.test(serverKey)) {
    serverKey = `${serverKey}:${uri.scheme() === "https" ? "443" : "80"}`;
  }
  const length = numberOfActiveRequestsByServer[serverKey];
  if (!defined_default(length)) {
    numberOfActiveRequestsByServer[serverKey] = 0;
  }
  return serverKey;
};
RequestScheduler.request = function(request) {
  Check_default.typeOf.object("request", request);
  Check_default.typeOf.string("request.url", request.url);
  Check_default.typeOf.func("request.requestFunction", request.requestFunction);
  if (isDataUri_default(request.url) || isBlobUri_default(request.url)) {
    requestCompletedEvent.raiseEvent();
    request.state = RequestState_default.RECEIVED;
    return request.requestFunction();
  }
  ++statistics.numberOfAttemptedRequests;
  if (!defined_default(request.serverKey)) {
    request.serverKey = RequestScheduler.getServerKey(request.url);
  }
  if (RequestScheduler.throttleRequests && request.throttleByServer && !RequestScheduler.serverHasOpenSlots(request.serverKey)) {
    return void 0;
  }
  if (!RequestScheduler.throttleRequests || !request.throttle) {
    return startRequest(request);
  }
  if (activeRequests.length >= RequestScheduler.maximumRequests) {
    return void 0;
  }
  updatePriority(request);
  const removedRequest = requestHeap.insert(request);
  if (defined_default(removedRequest)) {
    if (removedRequest === request) {
      return void 0;
    }
    cancelRequest(removedRequest);
  }
  return issueRequest(request);
};
function updateStatistics() {
  if (!RequestScheduler.debugShowStatistics) {
    return;
  }
  if (statistics.numberOfActiveRequests === 0 && statistics.lastNumberOfActiveRequests > 0) {
    if (statistics.numberOfAttemptedRequests > 0) {
      console.log(
        `Number of attempted requests: ${statistics.numberOfAttemptedRequests}`
      );
      statistics.numberOfAttemptedRequests = 0;
    }
    if (statistics.numberOfCancelledRequests > 0) {
      console.log(
        `Number of cancelled requests: ${statistics.numberOfCancelledRequests}`
      );
      statistics.numberOfCancelledRequests = 0;
    }
    if (statistics.numberOfCancelledActiveRequests > 0) {
      console.log(
        `Number of cancelled active requests: ${statistics.numberOfCancelledActiveRequests}`
      );
      statistics.numberOfCancelledActiveRequests = 0;
    }
    if (statistics.numberOfFailedRequests > 0) {
      console.log(
        `Number of failed requests: ${statistics.numberOfFailedRequests}`
      );
      statistics.numberOfFailedRequests = 0;
    }
  }
  statistics.lastNumberOfActiveRequests = statistics.numberOfActiveRequests;
}
RequestScheduler.clearForSpecs = function() {
  while (requestHeap.length > 0) {
    const request = requestHeap.pop();
    cancelRequest(request);
  }
  const length = activeRequests.length;
  for (let i = 0; i < length; ++i) {
    cancelRequest(activeRequests[i]);
  }
  activeRequests.length = 0;
  numberOfActiveRequestsByServer = {};
  statistics.numberOfAttemptedRequests = 0;
  statistics.numberOfActiveRequests = 0;
  statistics.numberOfCancelledRequests = 0;
  statistics.numberOfCancelledActiveRequests = 0;
  statistics.numberOfFailedRequests = 0;
  statistics.numberOfActiveRequestsEver = 0;
  statistics.lastNumberOfActiveRequests = 0;
};
RequestScheduler.numberOfActiveRequestsByServer = function(serverKey) {
  return numberOfActiveRequestsByServer[serverKey];
};
RequestScheduler.requestHeap = requestHeap;
var RequestScheduler_default = RequestScheduler;

// packages/engine/Source/Core/TrustedServers.js
var import_urijs2 = __toESM(require_URI(), 1);
var TrustedServers = {};
var _servers = {};
TrustedServers.add = function(host, port) {
  if (!defined_default(host)) {
    throw new DeveloperError_default("host is required.");
  }
  if (!defined_default(port) || port <= 0) {
    throw new DeveloperError_default("port is required to be greater than 0.");
  }
  const authority = `${host.toLowerCase()}:${port}`;
  if (!defined_default(_servers[authority])) {
    _servers[authority] = true;
  }
};
TrustedServers.remove = function(host, port) {
  if (!defined_default(host)) {
    throw new DeveloperError_default("host is required.");
  }
  if (!defined_default(port) || port <= 0) {
    throw new DeveloperError_default("port is required to be greater than 0.");
  }
  const authority = `${host.toLowerCase()}:${port}`;
  if (defined_default(_servers[authority])) {
    delete _servers[authority];
  }
};
function getAuthority(url) {
  const uri = new import_urijs2.default(url);
  uri.normalize();
  let authority = uri.authority();
  if (authority.length === 0) {
    return void 0;
  }
  uri.authority(authority);
  if (authority.indexOf("@") !== -1) {
    const parts = authority.split("@");
    authority = parts[1];
  }
  if (authority.indexOf(":") === -1) {
    let scheme = uri.scheme();
    if (scheme.length === 0) {
      scheme = window.location.protocol;
      scheme = scheme.substring(0, scheme.length - 1);
    }
    if (scheme === "http") {
      authority += ":80";
    } else if (scheme === "https") {
      authority += ":443";
    } else {
      return void 0;
    }
  }
  return authority;
}
TrustedServers.contains = function(url) {
  if (!defined_default(url)) {
    throw new DeveloperError_default("url is required.");
  }
  const authority = getAuthority(url);
  if (defined_default(authority) && defined_default(_servers[authority])) {
    return true;
  }
  return false;
};
TrustedServers.clear = function() {
  _servers = {};
};
var TrustedServers_default = TrustedServers;

// packages/engine/Source/Core/Resource.js
var xhrBlobSupported = (function() {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "#", true);
    xhr.responseType = "blob";
    return xhr.responseType === "blob";
  } catch (e) {
    return false;
  }
})();
function Resource(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  if (typeof options === "string") {
    options = {
      url: options
    };
  }
  Check_default.typeOf.string("options.url", options.url);
  this._url = void 0;
  this._templateValues = defaultClone(options.templateValues, {});
  this._queryParameters = defaultClone(options.queryParameters, {});
  this.headers = defaultClone(options.headers, {});
  this.request = options.request ?? new Request_default();
  this.proxy = options.proxy;
  this.retryCallback = options.retryCallback;
  this.retryAttempts = options.retryAttempts ?? 0;
  this._retryCount = 0;
  const parseUrl = options.parseUrl ?? true;
  if (parseUrl) {
    this.parseUrl(options.url, true, true);
  } else {
    this._url = options.url;
  }
  this._credits = options.credits;
}
function defaultClone(value, defaultValue) {
  return defined_default(value) ? clone_default(value) : defaultValue;
}
Resource.createIfNeeded = function(resource) {
  if (resource instanceof Resource) {
    return resource.getDerivedResource({
      request: resource.request
    });
  }
  if (typeof resource !== "string") {
    return resource;
  }
  return new Resource({
    url: resource
  });
};
var supportsImageBitmapOptionsPromise;
Resource.supportsImageBitmapOptions = function() {
  if (defined_default(supportsImageBitmapOptionsPromise)) {
    return supportsImageBitmapOptionsPromise;
  }
  if (typeof createImageBitmap !== "function") {
    supportsImageBitmapOptionsPromise = Promise.resolve(false);
    return supportsImageBitmapOptionsPromise;
  }
  const imageDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAAE4g3rEiDgAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADElEQVQI12Ng6GAAAAEUAIngE3ZiAAAAAElFTkSuQmCC";
  supportsImageBitmapOptionsPromise = Resource.fetchBlob({
    url: imageDataUri
  }).then(function(blob) {
    const imageBitmapOptions = {
      // 'from-image' is deprecated, new option is 'none'. However, we still need to support older browsers,
      // and there's no good way to detect support for these options. For now, continue to use 'from-image'. See: https://github.com/CesiumGS/cesium/issues/12846
      imageOrientation: "flipY",
      // default is "from-image"
      premultiplyAlpha: "none",
      // default is "default"
      colorSpaceConversion: "none"
      // default is "default"
    };
    return Promise.all([
      createImageBitmap(blob, imageBitmapOptions),
      createImageBitmap(blob)
    ]);
  }).then(function(imageBitmaps) {
    const colorWithOptions = getImagePixels_default(imageBitmaps[0]);
    const colorWithDefaults = getImagePixels_default(imageBitmaps[1]);
    return colorWithOptions[1] !== colorWithDefaults[1];
  }).catch(function() {
    return false;
  });
  return supportsImageBitmapOptionsPromise;
};
Object.defineProperties(Resource, {
  /**
   * Returns true if blobs are supported.
   *
   * @memberof Resource
   * @type {boolean}
   *
   * @readonly
   */
  isBlobSupported: {
    get: function() {
      return xhrBlobSupported;
    }
  }
});
Object.defineProperties(Resource.prototype, {
  /**
   * Query parameters appended to the url.
   *
   * @memberof Resource.prototype
   * @type {object}
   *
   * @readonly
   */
  queryParameters: {
    get: function() {
      return this._queryParameters;
    }
  },
  /**
   * The key/value pairs used to replace template parameters in the url.
   *
   * @memberof Resource.prototype
   * @type {object}
   *
   * @readonly
   */
  templateValues: {
    get: function() {
      return this._templateValues;
    }
  },
  /**
   * The url to the resource with template values replaced, query string appended and encoded by proxy if one was set.
   *
   * @memberof Resource.prototype
   * @type {string}
   */
  url: {
    get: function() {
      return this.getUrlComponent(true, true);
    },
    set: function(value) {
      this.parseUrl(value, false, false);
    }
  },
  /**
   * The file extension of the resource.
   *
   * @memberof Resource.prototype
   * @type {string}
   *
   * @readonly
   */
  extension: {
    get: function() {
      return getExtensionFromUri_default(this._url);
    }
  },
  /**
   * True if the Resource refers to a data URI.
   *
   * @memberof Resource.prototype
   * @type {boolean}
   */
  isDataUri: {
    get: function() {
      return isDataUri_default(this._url);
    }
  },
  /**
   * True if the Resource refers to a blob URI.
   *
   * @memberof Resource.prototype
   * @type {boolean}
   */
  isBlobUri: {
    get: function() {
      return isBlobUri_default(this._url);
    }
  },
  /**
   * True if the Resource refers to a cross origin URL.
   *
   * @memberof Resource.prototype
   * @type {boolean}
   */
  isCrossOriginUrl: {
    get: function() {
      return isCrossOriginUrl_default(this._url);
    }
  },
  /**
   * True if the Resource has request headers. This is equivalent to checking if the headers property has any keys.
   *
   * @memberof Resource.prototype
   * @type {boolean}
   */
  hasHeaders: {
    get: function() {
      return Object.keys(this.headers).length > 0;
    }
  },
  /**
   * Gets the credits required for attribution of an asset.
   * @private
   */
  credits: {
    get: function() {
      return this._credits;
    }
  }
});
Resource.prototype.toString = function() {
  return this.getUrlComponent(true, true);
};
Resource.prototype.parseUrl = function(url, merge, preserveQuery, baseUrl) {
  let uri = new import_urijs3.default(url);
  const query = parseQueryString(uri.query());
  this._queryParameters = merge ? combineQueryParameters(query, this.queryParameters, preserveQuery) : query;
  uri.search("");
  uri.fragment("");
  if (defined_default(baseUrl) && uri.scheme() === "") {
    uri = uri.absoluteTo(getAbsoluteUri_default(baseUrl));
  }
  this._url = uri.toString();
};
function parseQueryString(queryString) {
  if (queryString.length === 0) {
    return {};
  }
  if (queryString.indexOf("=") === -1) {
    return { [queryString]: void 0 };
  }
  return queryToObject_default(queryString);
}
function combineQueryParameters(q1, q2, preserveQueryParameters) {
  if (!preserveQueryParameters) {
    return combine_default(q1, q2);
  }
  const result = clone_default(q1, true);
  for (const param in q2) {
    if (q2.hasOwnProperty(param)) {
      let value = result[param];
      const q2Value = q2[param];
      if (defined_default(value)) {
        if (!Array.isArray(value)) {
          value = result[param] = [value];
        }
        result[param] = value.concat(q2Value);
      } else {
        result[param] = Array.isArray(q2Value) ? q2Value.slice() : q2Value;
      }
    }
  }
  return result;
}
Resource.prototype.getUrlComponent = function(query, proxy) {
  if (this.isDataUri) {
    return this._url;
  }
  let url = this._url;
  if (query) {
    url = `${url}${stringifyQuery(this.queryParameters)}`;
  }
  url = url.replace(/%7B/g, "{").replace(/%7D/g, "}");
  const templateValues = this._templateValues;
  if (Object.keys(templateValues).length > 0) {
    url = url.replace(/{(.*?)}/g, function(match, key) {
      const replacement = templateValues[key];
      if (defined_default(replacement)) {
        return encodeURIComponent(replacement);
      }
      return match;
    });
  }
  if (proxy && defined_default(this.proxy)) {
    url = this.proxy.getURL(url);
  }
  return url;
};
function stringifyQuery(queryObject) {
  const keys = Object.keys(queryObject);
  if (keys.length === 0) {
    return "";
  }
  if (keys.length === 1 && !defined_default(queryObject[keys[0]])) {
    return `?${keys[0]}`;
  }
  return `?${objectToQuery_default(queryObject)}`;
}
Resource.prototype.setQueryParameters = function(params, useAsDefault) {
  if (useAsDefault) {
    this._queryParameters = combineQueryParameters(
      this._queryParameters,
      params,
      false
    );
  } else {
    this._queryParameters = combineQueryParameters(
      params,
      this._queryParameters,
      false
    );
  }
};
Resource.prototype.appendQueryParameters = function(params) {
  this._queryParameters = combineQueryParameters(
    params,
    this._queryParameters,
    true
  );
};
Resource.prototype.setTemplateValues = function(template, useAsDefault) {
  if (useAsDefault) {
    this._templateValues = combine_default(this._templateValues, template);
  } else {
    this._templateValues = combine_default(template, this._templateValues);
  }
};
Resource.prototype.getDerivedResource = function(options) {
  const resource = this.clone();
  resource._retryCount = 0;
  if (defined_default(options.url)) {
    const preserveQuery = options.preserveQueryParameters ?? false;
    resource.parseUrl(options.url, true, preserveQuery, this._url);
  }
  if (defined_default(options.queryParameters)) {
    resource._queryParameters = combine_default(
      options.queryParameters,
      resource.queryParameters
    );
  }
  if (defined_default(options.templateValues)) {
    resource._templateValues = combine_default(
      options.templateValues,
      resource.templateValues
    );
  }
  if (defined_default(options.headers)) {
    resource.headers = combine_default(options.headers, resource.headers);
  }
  if (defined_default(options.proxy)) {
    resource.proxy = options.proxy;
  }
  if (defined_default(options.request)) {
    resource.request = options.request;
  }
  if (defined_default(options.retryCallback)) {
    resource.retryCallback = options.retryCallback;
  }
  if (defined_default(options.retryAttempts)) {
    resource.retryAttempts = options.retryAttempts;
  }
  return resource;
};
Resource.prototype.retryOnError = function(error) {
  const retryCallback = this.retryCallback;
  if (typeof retryCallback !== "function" || this._retryCount >= this.retryAttempts) {
    return Promise.resolve(false);
  }
  const that = this;
  return Promise.resolve(retryCallback(this, error)).then(function(result) {
    ++that._retryCount;
    return result;
  });
};
Resource.prototype.clone = function(result) {
  if (!defined_default(result)) {
    return new Resource({
      url: this._url,
      queryParameters: this.queryParameters,
      templateValues: this.templateValues,
      headers: this.headers,
      proxy: this.proxy,
      retryCallback: this.retryCallback,
      retryAttempts: this.retryAttempts,
      request: this.request.clone(),
      parseUrl: false,
      credits: defined_default(this.credits) ? this.credits.slice() : void 0
    });
  }
  result._url = this._url;
  result._queryParameters = clone_default(this._queryParameters);
  result._templateValues = clone_default(this._templateValues);
  result.headers = clone_default(this.headers);
  result.proxy = this.proxy;
  result.retryCallback = this.retryCallback;
  result.retryAttempts = this.retryAttempts;
  result._retryCount = 0;
  result.request = this.request.clone();
  return result;
};
Resource.prototype.getBaseUri = function(includeQuery) {
  return getBaseUri_default(this.getUrlComponent(includeQuery), includeQuery);
};
Resource.prototype.appendForwardSlash = function() {
  this._url = appendForwardSlash_default(this._url);
};
Resource.prototype.fetchArrayBuffer = function() {
  return this.fetch({
    responseType: "arraybuffer"
  });
};
Resource.fetchArrayBuffer = function(options) {
  const resource = new Resource(options);
  return resource.fetchArrayBuffer();
};
Resource.prototype.fetchBlob = function() {
  return this.fetch({
    responseType: "blob"
  });
};
Resource.fetchBlob = function(options) {
  const resource = new Resource(options);
  return resource.fetchBlob();
};
Resource.prototype.fetchImage = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  const preferImageBitmap = options.preferImageBitmap ?? false;
  const preferBlob = options.preferBlob ?? false;
  const flipY = options.flipY ?? false;
  const skipColorSpaceConversion = options.skipColorSpaceConversion ?? false;
  checkAndResetRequest(this.request);
  if (!xhrBlobSupported || this.isDataUri || this.isBlobUri || !this.hasHeaders && !preferBlob) {
    return this._fetchImage({
      resource: this,
      flipY,
      skipColorSpaceConversion,
      preferImageBitmap
    });
  }
  const blobPromise = this.fetchBlob();
  if (!defined_default(blobPromise)) {
    return;
  }
  let supportsImageBitmap;
  let useImageBitmap;
  let generatedBlobResource;
  let generatedBlob;
  return Resource.supportsImageBitmapOptions().then(function(result) {
    supportsImageBitmap = result;
    useImageBitmap = supportsImageBitmap && preferImageBitmap;
    return blobPromise;
  }).then(function(blob) {
    if (!defined_default(blob)) {
      return;
    }
    generatedBlob = blob;
    if (useImageBitmap) {
      return Resource.createImageBitmapFromBlob(blob, {
        flipY,
        premultiplyAlpha: false,
        skipColorSpaceConversion
      });
    }
    const blobUrl = window.URL.createObjectURL(blob);
    generatedBlobResource = new Resource({
      url: blobUrl
    });
    return generatedBlobResource._fetchImage({
      flipY,
      skipColorSpaceConversion,
      preferImageBitmap: false
    });
  }).then(function(image) {
    if (!defined_default(image)) {
      return;
    }
    image.blob = generatedBlob;
    if (useImageBitmap) {
      return image;
    }
    window.URL.revokeObjectURL(generatedBlobResource.url);
    return image;
  }).catch(function(error) {
    if (defined_default(generatedBlobResource)) {
      window.URL.revokeObjectURL(generatedBlobResource.url);
    }
    error.blob = generatedBlob;
    return Promise.reject(error);
  });
};
Resource.prototype._fetchImage = function(options) {
  const resource = this;
  const flipY = options.flipY;
  const skipColorSpaceConversion = options.skipColorSpaceConversion;
  const preferImageBitmap = options.preferImageBitmap;
  const request = resource.request;
  request.url = resource.url;
  request.requestFunction = function() {
    let crossOrigin = false;
    if (!resource.isDataUri && !resource.isBlobUri) {
      crossOrigin = resource.isCrossOriginUrl;
    }
    const deferred = defer_default();
    Resource._Implementations.createImage(
      request,
      crossOrigin,
      deferred,
      flipY,
      skipColorSpaceConversion,
      preferImageBitmap
    );
    return deferred.promise;
  };
  const promise = RequestScheduler_default.request(request);
  if (!defined_default(promise)) {
    return;
  }
  return promise.catch(function(e) {
    if (request.state !== RequestState_default.FAILED) {
      return Promise.reject(e);
    }
    return resource.retryOnError(e).then(function(retry) {
      if (retry) {
        request.state = RequestState_default.UNISSUED;
        request.deferred = void 0;
        return resource._fetchImage({
          flipY,
          skipColorSpaceConversion,
          preferImageBitmap
        });
      }
      return Promise.reject(e);
    });
  });
};
Resource.fetchImage = function(options) {
  const resource = new Resource(options);
  return resource.fetchImage({
    flipY: options.flipY,
    skipColorSpaceConversion: options.skipColorSpaceConversion,
    preferBlob: options.preferBlob,
    preferImageBitmap: options.preferImageBitmap
  });
};
Resource.prototype.fetchText = function() {
  return this.fetch({
    responseType: "text"
  });
};
Resource.fetchText = function(options) {
  const resource = new Resource(options);
  return resource.fetchText();
};
Resource.prototype.fetchJson = function() {
  const promise = this.fetch({
    responseType: "text",
    headers: {
      Accept: "application/json,*/*;q=0.01"
    }
  });
  if (!defined_default(promise)) {
    return void 0;
  }
  return promise.then(function(value) {
    if (!defined_default(value)) {
      return;
    }
    return JSON.parse(value);
  });
};
Resource.fetchJson = function(options) {
  const resource = new Resource(options);
  return resource.fetchJson();
};
Resource.prototype.fetchXML = function() {
  return this.fetch({
    responseType: "document",
    overrideMimeType: "text/xml"
  });
};
Resource.fetchXML = function(options) {
  const resource = new Resource(options);
  return resource.fetchXML();
};
Resource.prototype.fetchJsonp = function(callbackParameterName) {
  callbackParameterName = callbackParameterName ?? "callback";
  checkAndResetRequest(this.request);
  let functionName;
  do {
    functionName = `loadJsonp${Math_default.nextRandomNumber().toString().substring(2, 8)}`;
  } while (defined_default(window[functionName]));
  return fetchJsonp(this, callbackParameterName, functionName);
};
function fetchJsonp(resource, callbackParameterName, functionName) {
  const callbackQuery = {};
  callbackQuery[callbackParameterName] = functionName;
  resource.setQueryParameters(callbackQuery);
  const request = resource.request;
  const url = resource.url;
  request.url = url;
  request.requestFunction = function() {
    const deferred = defer_default();
    window[functionName] = function(data) {
      deferred.resolve(data);
      try {
        delete window[functionName];
      } catch (e) {
        window[functionName] = void 0;
      }
    };
    Resource._Implementations.loadAndExecuteScript(url, functionName, deferred);
    return deferred.promise;
  };
  const promise = RequestScheduler_default.request(request);
  if (!defined_default(promise)) {
    return;
  }
  return promise.catch(function(e) {
    if (request.state !== RequestState_default.FAILED) {
      return Promise.reject(e);
    }
    return resource.retryOnError(e).then(function(retry) {
      if (retry) {
        request.state = RequestState_default.UNISSUED;
        request.deferred = void 0;
        return fetchJsonp(resource, callbackParameterName, functionName);
      }
      return Promise.reject(e);
    });
  });
}
Resource.fetchJsonp = function(options) {
  const resource = new Resource(options);
  return resource.fetchJsonp(options.callbackParameterName);
};
Resource.prototype._makeRequest = function(options) {
  const resource = this;
  checkAndResetRequest(resource.request);
  const request = resource.request;
  const url = resource.url;
  request.url = url;
  request.requestFunction = function() {
    const responseType = options.responseType;
    const headers = combine_default(options.headers, resource.headers);
    const overrideMimeType = options.overrideMimeType;
    const method = options.method;
    const data = options.data;
    const deferred = defer_default();
    const xhr = Resource._Implementations.loadWithXhr(
      url,
      responseType,
      method,
      data,
      headers,
      deferred,
      overrideMimeType
    );
    if (defined_default(xhr) && defined_default(xhr.abort)) {
      request.cancelFunction = function() {
        xhr.abort();
      };
    }
    return deferred.promise;
  };
  const promise = RequestScheduler_default.request(request);
  if (!defined_default(promise)) {
    return;
  }
  return promise.then(function(data) {
    request.cancelFunction = void 0;
    return data;
  }).catch(function(e) {
    request.cancelFunction = void 0;
    if (request.state !== RequestState_default.FAILED) {
      return Promise.reject(e);
    }
    return resource.retryOnError(e).then(function(retry) {
      if (retry) {
        request.state = RequestState_default.UNISSUED;
        request.deferred = void 0;
        return resource.fetch(options);
      }
      return Promise.reject(e);
    });
  });
};
function checkAndResetRequest(request) {
  if (request.state === RequestState_default.ISSUED || request.state === RequestState_default.ACTIVE) {
    throw new RuntimeError_default("The Resource is already being fetched.");
  }
  request.state = RequestState_default.UNISSUED;
  request.deferred = void 0;
}
var dataUriRegex2 = /^data:(.*?)(;base64)?,(.*)$/;
function decodeDataUriText(isBase64, data) {
  const result = decodeURIComponent(data);
  if (isBase64) {
    return atob(result);
  }
  return result;
}
function decodeDataUriArrayBuffer(isBase64, data) {
  const byteString = decodeDataUriText(isBase64, data);
  const buffer = new ArrayBuffer(byteString.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i);
  }
  return buffer;
}
function decodeDataUri(dataUriRegexResult, responseType) {
  responseType = responseType ?? "";
  const mimeType = dataUriRegexResult[1];
  const isBase64 = !!dataUriRegexResult[2];
  const data = dataUriRegexResult[3];
  let buffer;
  let parser;
  switch (responseType) {
    case "":
    case "text":
      return decodeDataUriText(isBase64, data);
    case "arraybuffer":
      return decodeDataUriArrayBuffer(isBase64, data);
    case "blob":
      buffer = decodeDataUriArrayBuffer(isBase64, data);
      return new Blob([buffer], {
        type: mimeType
      });
    case "document":
      parser = new DOMParser();
      return parser.parseFromString(
        decodeDataUriText(isBase64, data),
        mimeType
      );
    case "json":
      return JSON.parse(decodeDataUriText(isBase64, data));
    default:
      throw new DeveloperError_default(`Unhandled responseType: ${responseType}`);
  }
}
Resource.prototype.fetch = function(options) {
  options = defaultClone(options, {});
  options.method = "GET";
  return this._makeRequest(options);
};
Resource.fetch = function(options) {
  const resource = new Resource(options);
  return resource.fetch({
    // Make copy of just the needed fields because headers can be passed to both the constructor and to fetch
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType
  });
};
Resource.prototype.delete = function(options) {
  options = defaultClone(options, {});
  options.method = "DELETE";
  return this._makeRequest(options);
};
Resource.delete = function(options) {
  const resource = new Resource(options);
  return resource.delete({
    // Make copy of just the needed fields because headers can be passed to both the constructor and to fetch
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType,
    data: options.data
  });
};
Resource.prototype.head = function(options) {
  options = defaultClone(options, {});
  options.method = "HEAD";
  return this._makeRequest(options);
};
Resource.head = function(options) {
  const resource = new Resource(options);
  return resource.head({
    // Make copy of just the needed fields because headers can be passed to both the constructor and to fetch
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType
  });
};
Resource.prototype.options = function(options) {
  options = defaultClone(options, {});
  options.method = "OPTIONS";
  return this._makeRequest(options);
};
Resource.options = function(options) {
  const resource = new Resource(options);
  return resource.options({
    // Make copy of just the needed fields because headers can be passed to both the constructor and to fetch
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType
  });
};
Resource.prototype.post = function(data, options) {
  Check_default.defined("data", data);
  options = defaultClone(options, {});
  options.method = "POST";
  options.data = data;
  return this._makeRequest(options);
};
Resource.post = function(options) {
  const resource = new Resource(options);
  return resource.post(options.data, {
    // Make copy of just the needed fields because headers can be passed to both the constructor and to post
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType
  });
};
Resource.prototype.put = function(data, options) {
  Check_default.defined("data", data);
  options = defaultClone(options, {});
  options.method = "PUT";
  options.data = data;
  return this._makeRequest(options);
};
Resource.put = function(options) {
  const resource = new Resource(options);
  return resource.put(options.data, {
    // Make copy of just the needed fields because headers can be passed to both the constructor and to post
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType
  });
};
Resource.prototype.patch = function(data, options) {
  Check_default.defined("data", data);
  options = defaultClone(options, {});
  options.method = "PATCH";
  options.data = data;
  return this._makeRequest(options);
};
Resource.patch = function(options) {
  const resource = new Resource(options);
  return resource.patch(options.data, {
    // Make copy of just the needed fields because headers can be passed to both the constructor and to post
    responseType: options.responseType,
    overrideMimeType: options.overrideMimeType
  });
};
Resource._Implementations = {};
Resource._Implementations.loadImageElement = function(url, crossOrigin, deferred) {
  const image = new Image();
  image.onload = function() {
    if (image.naturalWidth === 0 && image.naturalHeight === 0 && image.width === 0 && image.height === 0) {
      image.width = 300;
      image.height = 150;
    }
    deferred.resolve(image);
  };
  image.onerror = function(e) {
    deferred.reject(e);
  };
  if (crossOrigin) {
    if (TrustedServers_default.contains(url)) {
      image.crossOrigin = "use-credentials";
    } else {
      image.crossOrigin = "";
    }
  }
  image.src = url;
};
Resource._Implementations.createImage = function(request, crossOrigin, deferred, flipY, skipColorSpaceConversion, preferImageBitmap, headers) {
  const url = request.url;
  Resource.supportsImageBitmapOptions().then(function(supportsImageBitmap) {
    if (!(supportsImageBitmap && preferImageBitmap)) {
      Resource._Implementations.loadImageElement(url, crossOrigin, deferred);
      return;
    }
    const responseType = "blob";
    const method = "GET";
    const xhrDeferred = defer_default();
    const xhr = Resource._Implementations.loadWithXhr(
      url,
      responseType,
      method,
      void 0,
      headers,
      xhrDeferred,
      void 0,
      void 0,
      void 0
    );
    if (defined_default(xhr) && defined_default(xhr.abort)) {
      request.cancelFunction = function() {
        xhr.abort();
      };
    }
    return xhrDeferred.promise.then(function(blob) {
      if (!defined_default(blob)) {
        deferred.reject(
          new RuntimeError_default(
            `Successfully retrieved ${url} but it contained no content.`
          )
        );
        return;
      }
      return Resource.createImageBitmapFromBlob(blob, {
        flipY,
        premultiplyAlpha: false,
        skipColorSpaceConversion
      });
    }).then(function(image) {
      deferred.resolve(image);
    });
  }).catch(function(e) {
    deferred.reject(e);
  });
};
Resource.createImageBitmapFromBlob = function(blob, options) {
  Check_default.defined("options", options);
  Check_default.typeOf.bool("options.flipY", options.flipY);
  Check_default.typeOf.bool("options.premultiplyAlpha", options.premultiplyAlpha);
  Check_default.typeOf.bool(
    "options.skipColorSpaceConversion",
    options.skipColorSpaceConversion
  );
  return createImageBitmap(blob, {
    // 'from-image' is deprecated, new option is 'none'. However, we still need to support older browsers,
    // and there's no good way to detect support for these options. For now, continue to use 'from-image'. See: https://github.com/CesiumGS/cesium/issues/12846
    imageOrientation: options.flipY ? "flipY" : "none",
    premultiplyAlpha: options.premultiplyAlpha ? "premultiply" : "none",
    colorSpaceConversion: options.skipColorSpaceConversion ? "none" : "default"
  });
};
function loadWithHttpRequest(url, responseType, method, data, headers, deferred, overrideMimeType) {
  fetch(url, {
    method,
    headers
  }).then(async (response) => {
    if (!response.ok) {
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      deferred.reject(
        new RequestErrorEvent_default(response.status, response, responseHeaders)
      );
      return;
    }
    switch (responseType) {
      case "text":
        deferred.resolve(response.text());
        break;
      case "json":
        deferred.resolve(response.json());
        break;
      default:
        deferred.resolve(new Uint8Array(await response.arrayBuffer()).buffer);
        break;
    }
  }).catch(() => {
    deferred.reject(new RequestErrorEvent_default());
  });
}
var noXMLHttpRequest = typeof XMLHttpRequest === "undefined";
Resource._Implementations.loadWithXhr = function(url, responseType, method, data, headers, deferred, overrideMimeType) {
  const dataUriRegexResult = dataUriRegex2.exec(url);
  if (dataUriRegexResult !== null) {
    deferred.resolve(decodeDataUri(dataUriRegexResult, responseType));
    return;
  }
  if (noXMLHttpRequest) {
    loadWithHttpRequest(
      url,
      responseType,
      method,
      data,
      headers,
      deferred,
      overrideMimeType
    );
    return;
  }
  const xhr = new XMLHttpRequest();
  if (TrustedServers_default.contains(url)) {
    xhr.withCredentials = true;
  }
  xhr.open(method, url, true);
  if (defined_default(overrideMimeType) && defined_default(xhr.overrideMimeType)) {
    xhr.overrideMimeType(overrideMimeType);
  }
  if (defined_default(headers)) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }
  if (defined_default(responseType)) {
    xhr.responseType = responseType;
  }
  let localFile = false;
  if (typeof url === "string") {
    localFile = url.indexOf("file://") === 0 || typeof window !== "undefined" && window.location.origin === "file://";
  }
  xhr.onload = function() {
    if ((xhr.status < 200 || xhr.status >= 300) && !(localFile && xhr.status === 0)) {
      deferred.reject(
        new RequestErrorEvent_default(
          xhr.status,
          xhr.response,
          xhr.getAllResponseHeaders()
        )
      );
      return;
    }
    const response = xhr.response;
    const browserResponseType = xhr.responseType;
    if (method === "HEAD" || method === "OPTIONS") {
      const responseHeaderString = xhr.getAllResponseHeaders();
      const splitHeaders = responseHeaderString.trim().split(/[\r\n]+/);
      const responseHeaders = {};
      splitHeaders.forEach(function(line) {
        const parts = line.split(": ");
        const header = parts.shift();
        responseHeaders[header] = parts.join(": ");
      });
      deferred.resolve(responseHeaders);
      return;
    }
    if (xhr.status === 204) {
      deferred.resolve(void 0);
    } else if (defined_default(response) && (!defined_default(responseType) || browserResponseType === responseType)) {
      deferred.resolve(response);
    } else if (responseType === "json" && typeof response === "string") {
      try {
        deferred.resolve(JSON.parse(response));
      } catch (e) {
        deferred.reject(e);
      }
    } else if ((browserResponseType === "" || browserResponseType === "document") && defined_default(xhr.responseXML) && xhr.responseXML.hasChildNodes()) {
      deferred.resolve(xhr.responseXML);
    } else if ((browserResponseType === "" || browserResponseType === "text") && defined_default(xhr.responseText)) {
      deferred.resolve(xhr.responseText);
    } else {
      deferred.reject(
        new RuntimeError_default("Invalid XMLHttpRequest response type.")
      );
    }
  };
  xhr.onerror = function(e) {
    deferred.reject(new RequestErrorEvent_default());
  };
  xhr.send(data);
  return xhr;
};
Resource._Implementations.loadAndExecuteScript = function(url, functionName, deferred) {
  return loadAndExecuteScript_default(url, functionName).catch(function(e) {
    deferred.reject(e);
  });
};
Resource._DefaultImplementations = {};
Resource._DefaultImplementations.createImage = Resource._Implementations.createImage;
Resource._DefaultImplementations.loadWithXhr = Resource._Implementations.loadWithXhr;
Resource._DefaultImplementations.loadAndExecuteScript = Resource._Implementations.loadAndExecuteScript;
Resource.DEFAULT = Object.freeze(
  new Resource({
    url: typeof document === "undefined" ? "" : document.location.href.split("?")[0]
  })
);
var Resource_default = Resource;

// packages/engine/Source/Core/buildModuleUrl.js
var cesiumScriptRegex = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/;
function getBaseUrlFromCesiumScript() {
  const scripts = document.getElementsByTagName("script");
  for (let i = 0, len = scripts.length; i < len; ++i) {
    const src = scripts[i].getAttribute("src");
    const result = cesiumScriptRegex.exec(src);
    if (result !== null) {
      return result[1];
    }
  }
  return void 0;
}
var a2;
function tryMakeAbsolute(url) {
  if (typeof document === "undefined") {
    return url;
  }
  if (!defined_default(a2)) {
    a2 = document.createElement("a");
  }
  a2.href = url;
  return a2.href;
}
var baseResource;
function getCesiumBaseUrl() {
  if (defined_default(baseResource)) {
    return baseResource;
  }
  let baseUrlString;
  if (typeof CESIUM_BASE_URL !== "undefined") {
    baseUrlString = CESIUM_BASE_URL;
  } else if (defined_default(import.meta?.url)) {
    baseUrlString = getAbsoluteUri_default(".", import.meta.url);
  } else if (typeof define === "object" && defined_default(define.amd) && !define.amd.toUrlUndefined && defined_default(__require.toUrl)) {
    baseUrlString = getAbsoluteUri_default(
      "..",
      buildModuleUrl("Core/buildModuleUrl.js")
    );
  } else {
    baseUrlString = getBaseUrlFromCesiumScript();
  }
  if (!defined_default(baseUrlString)) {
    throw new DeveloperError_default(
      "Unable to determine Cesium base URL automatically, try defining a global variable called CESIUM_BASE_URL."
    );
  }
  baseResource = new Resource_default({
    url: tryMakeAbsolute(baseUrlString)
  });
  baseResource.appendForwardSlash();
  return baseResource;
}
function buildModuleUrlFromRequireToUrl(moduleID) {
  return tryMakeAbsolute(__require.toUrl(`../${moduleID}`));
}
function buildModuleUrlFromBaseUrl(moduleID) {
  const resource = getCesiumBaseUrl().getDerivedResource({
    url: moduleID
  });
  return resource.url;
}
var implementation;
function buildModuleUrl(relativeUrl) {
  if (!defined_default(implementation)) {
    if (typeof define === "object" && defined_default(define.amd) && !define.amd.toUrlUndefined && defined_default(__require.toUrl)) {
      implementation = buildModuleUrlFromRequireToUrl;
    } else {
      implementation = buildModuleUrlFromBaseUrl;
    }
  }
  const url = implementation(relativeUrl);
  return url;
}
buildModuleUrl._cesiumScriptRegex = cesiumScriptRegex;
buildModuleUrl._buildModuleUrlFromBaseUrl = buildModuleUrlFromBaseUrl;
buildModuleUrl._clearBaseResource = function() {
  baseResource = void 0;
};
buildModuleUrl.setBaseUrl = function(value) {
  baseResource = Resource_default.DEFAULT.getDerivedResource({
    url: value
  });
};
buildModuleUrl.getCesiumBaseUrl = getCesiumBaseUrl;
var buildModuleUrl_default = buildModuleUrl;

export {
  isCrossOriginUrl_default,
  Resource_default,
  buildModuleUrl_default
};
