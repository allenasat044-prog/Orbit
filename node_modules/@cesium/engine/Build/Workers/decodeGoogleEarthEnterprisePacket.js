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
  createTaskProcessorWorker_default
} from "./chunk-ACC5TYIT.js";
import {
  Check_default,
  RuntimeError_default,
  defined_default
} from "./chunk-N4AX4H36.js";

// packages/engine/Source/Core/decodeGoogleEarthEnterpriseData.js
var compressedMagic = 1953029805;
var compressedMagicSwap = 2917034100;
function decodeGoogleEarthEnterpriseData(key, data) {
  if (decodeGoogleEarthEnterpriseData.passThroughDataForTesting) {
    return data;
  }
  Check_default.typeOf.object("key", key);
  Check_default.typeOf.object("data", data);
  const keyLength = key.byteLength;
  if (keyLength === 0 || keyLength % 4 !== 0) {
    throw new RuntimeError_default(
      "The length of key must be greater than 0 and a multiple of 4."
    );
  }
  const dataView = new DataView(data);
  const magic = dataView.getUint32(0, true);
  if (magic === compressedMagic || magic === compressedMagicSwap) {
    return data;
  }
  const keyView = new DataView(key);
  let dp = 0;
  const dpend = data.byteLength;
  const dpend64 = dpend - dpend % 8;
  const kpend = keyLength;
  let kp;
  let off = 8;
  while (dp < dpend64) {
    off = (off + 8) % 24;
    kp = off;
    while (dp < dpend64 && kp < kpend) {
      dataView.setUint32(
        dp,
        dataView.getUint32(dp, true) ^ keyView.getUint32(kp, true),
        true
      );
      dataView.setUint32(
        dp + 4,
        dataView.getUint32(dp + 4, true) ^ keyView.getUint32(kp + 4, true),
        true
      );
      dp += 8;
      kp += 24;
    }
  }
  if (dp < dpend) {
    if (kp >= kpend) {
      off = (off + 8) % 24;
      kp = off;
    }
    while (dp < dpend) {
      dataView.setUint8(dp, dataView.getUint8(dp) ^ keyView.getUint8(kp));
      dp++;
      kp++;
    }
  }
}
decodeGoogleEarthEnterpriseData.passThroughDataForTesting = false;
var decodeGoogleEarthEnterpriseData_default = decodeGoogleEarthEnterpriseData;

// packages/engine/Source/Core/isBitSet.js
function isBitSet(bits, mask) {
  return (bits & mask) !== 0;
}
var isBitSet_default = isBitSet;

// packages/engine/Source/Core/GoogleEarthEnterpriseTileInformation.js
var childrenBitmasks = [1, 2, 4, 8];
var anyChildBitmask = 15;
var cacheFlagBitmask = 16;
var imageBitmask = 64;
var terrainBitmask = 128;
function GoogleEarthEnterpriseTileInformation(bits, cnodeVersion, imageryVersion, terrainVersion, imageryProvider, terrainProvider) {
  this._bits = bits;
  this.cnodeVersion = cnodeVersion;
  this.imageryVersion = imageryVersion;
  this.terrainVersion = terrainVersion;
  this.imageryProvider = imageryProvider;
  this.terrainProvider = terrainProvider;
  this.ancestorHasTerrain = false;
  this.terrainState = void 0;
}
GoogleEarthEnterpriseTileInformation.clone = function(info, result) {
  if (!defined_default(result)) {
    result = new GoogleEarthEnterpriseTileInformation(
      info._bits,
      info.cnodeVersion,
      info.imageryVersion,
      info.terrainVersion,
      info.imageryProvider,
      info.terrainProvider
    );
  } else {
    result._bits = info._bits;
    result.cnodeVersion = info.cnodeVersion;
    result.imageryVersion = info.imageryVersion;
    result.terrainVersion = info.terrainVersion;
    result.imageryProvider = info.imageryProvider;
    result.terrainProvider = info.terrainProvider;
  }
  result.ancestorHasTerrain = info.ancestorHasTerrain;
  result.terrainState = info.terrainState;
  return result;
};
GoogleEarthEnterpriseTileInformation.prototype.setParent = function(parent) {
  this.ancestorHasTerrain = parent.ancestorHasTerrain || this.hasTerrain();
};
GoogleEarthEnterpriseTileInformation.prototype.hasSubtree = function() {
  return isBitSet_default(this._bits, cacheFlagBitmask);
};
GoogleEarthEnterpriseTileInformation.prototype.hasImagery = function() {
  return isBitSet_default(this._bits, imageBitmask);
};
GoogleEarthEnterpriseTileInformation.prototype.hasTerrain = function() {
  return isBitSet_default(this._bits, terrainBitmask);
};
GoogleEarthEnterpriseTileInformation.prototype.hasChildren = function() {
  return isBitSet_default(this._bits, anyChildBitmask);
};
GoogleEarthEnterpriseTileInformation.prototype.hasChild = function(index) {
  return isBitSet_default(this._bits, childrenBitmasks[index]);
};
GoogleEarthEnterpriseTileInformation.prototype.getChildBitmask = function() {
  return this._bits & anyChildBitmask;
};
var GoogleEarthEnterpriseTileInformation_default = GoogleEarthEnterpriseTileInformation;

// node_modules/pako/dist/browser/pako_inflate.esm.min.mjs
var e = 4;
var t = 0;
var n = 1;
function r(e2) {
  let t2 = e2.length;
  for (; --t2 >= 0; ) e2[t2] = 0;
}
var i = 29;
var a = 256;
var o = 30;
var s = 19;
var c = 573;
var l = 15;
var u = 16;
var d = 256;
var f = 16;
var p = 17;
var m = 18;
var h = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
var g = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
var _ = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var v = 512;
var y = Array(288 * 2);
r(y);
var b = Array(o * 2);
r(b);
var x = Array(v);
r(x);
var S = Array(256);
r(S);
var C = Array(i);
r(C);
var w = Array(o);
r(w);
var T = (e2) => e2 < 256 ? x[e2] : x[256 + (e2 >>> 7)];
var E = (e2, t2) => {
  e2.pending_buf[e2.pending++] = t2 & 255, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
};
var D = (e2, t2, n2) => {
  e2.bi_valid > u - n2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, E(e2, e2.bi_buf), e2.bi_buf = t2 >> u - e2.bi_valid, e2.bi_valid += n2 - u) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += n2);
};
var O = (e2, t2, n2) => {
  D(e2, n2[t2 * 2], n2[t2 * 2 + 1]);
};
var ee = (e2, t2) => {
  let n2 = 0;
  do
    n2 |= e2 & 1, e2 >>>= 1, n2 <<= 1;
  while (--t2 > 0);
  return n2 >>> 1;
};
var k = (e2, t2) => {
  let n2 = t2.dyn_tree, r2 = t2.max_code, i2 = t2.stat_desc.static_tree, a2 = t2.stat_desc.has_stree, o2 = t2.stat_desc.extra_bits, s2 = t2.stat_desc.extra_base, u2 = t2.stat_desc.max_length, d2, f2, p2, m2, h2, g2, _2 = 0;
  for (m2 = 0; m2 <= l; m2++) e2.bl_count[m2] = 0;
  for (n2[e2.heap[e2.heap_max] * 2 + 1] = 0, d2 = e2.heap_max + 1; d2 < c; d2++) f2 = e2.heap[d2], m2 = n2[n2[f2 * 2 + 1] * 2 + 1] + 1, m2 > u2 && (m2 = u2, _2++), n2[f2 * 2 + 1] = m2, !(f2 > r2) && (e2.bl_count[m2]++, h2 = 0, f2 >= s2 && (h2 = o2[f2 - s2]), g2 = n2[f2 * 2], e2.opt_len += g2 * (m2 + h2), a2 && (e2.static_len += g2 * (i2[f2 * 2 + 1] + h2)));
  if (_2 !== 0) {
    do {
      for (m2 = u2 - 1; e2.bl_count[m2] === 0; ) m2--;
      e2.bl_count[m2]--, e2.bl_count[m2 + 1] += 2, e2.bl_count[u2]--, _2 -= 2;
    } while (_2 > 0);
    for (m2 = u2; m2 !== 0; m2--) for (f2 = e2.bl_count[m2]; f2 !== 0; ) p2 = e2.heap[--d2], !(p2 > r2) && (n2[p2 * 2 + 1] !== m2 && (e2.opt_len += (m2 - n2[p2 * 2 + 1]) * n2[p2 * 2], n2[p2 * 2 + 1] = m2), f2--);
  }
};
var A = (e2, t2, n2) => {
  let r2 = Array(16), i2 = 0, a2, o2;
  for (a2 = 1; a2 <= l; a2++) i2 = i2 + n2[a2 - 1] << 1, r2[a2] = i2;
  for (o2 = 0; o2 <= t2; o2++) {
    let t3 = e2[o2 * 2 + 1];
    t3 !== 0 && (e2[o2 * 2] = ee(r2[t3]++, t3));
  }
};
var te = (e2) => {
  let t2;
  for (t2 = 0; t2 < 286; t2++) e2.dyn_ltree[t2 * 2] = 0;
  for (t2 = 0; t2 < o; t2++) e2.dyn_dtree[t2 * 2] = 0;
  for (t2 = 0; t2 < s; t2++) e2.bl_tree[t2 * 2] = 0;
  e2.dyn_ltree[d * 2] = 1, e2.opt_len = e2.static_len = 0, e2.sym_next = e2.matches = 0;
};
var ne = (e2) => {
  e2.bi_valid > 8 ? E(e2, e2.bi_buf) : e2.bi_valid > 0 && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
};
var re = (e2, t2, n2, r2) => {
  let i2 = t2 * 2, a2 = n2 * 2;
  return e2[i2] < e2[a2] || e2[i2] === e2[a2] && r2[t2] <= r2[n2];
};
var ie = (e2, t2, n2) => {
  let r2 = e2.heap[n2], i2 = n2 << 1;
  for (; i2 <= e2.heap_len && (i2 < e2.heap_len && re(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !re(t2, r2, e2.heap[i2], e2.depth)); ) e2.heap[n2] = e2.heap[i2], n2 = i2, i2 <<= 1;
  e2.heap[n2] = r2;
};
var ae = (e2, t2, n2) => {
  let r2, i2, o2 = 0, s2, c2;
  if (e2.sym_next !== 0) do
    r2 = e2.pending_buf[e2.sym_buf + o2++] & 255, r2 += (e2.pending_buf[e2.sym_buf + o2++] & 255) << 8, i2 = e2.pending_buf[e2.sym_buf + o2++], r2 === 0 ? O(e2, i2, t2) : (s2 = S[i2], O(e2, s2 + a + 1, t2), c2 = h[s2], c2 !== 0 && (i2 -= C[s2], D(e2, i2, c2)), r2--, s2 = T(r2), O(e2, s2, n2), c2 = g[s2], c2 !== 0 && (r2 -= w[s2], D(e2, r2, c2)));
  while (o2 < e2.sym_next);
  O(e2, d, t2);
};
var oe = (e2, t2) => {
  let n2 = t2.dyn_tree, r2 = t2.stat_desc.static_tree, i2 = t2.stat_desc.has_stree, a2 = t2.stat_desc.elems, o2, s2, l2 = -1, u2;
  for (e2.heap_len = 0, e2.heap_max = c, o2 = 0; o2 < a2; o2++) n2[o2 * 2] === 0 ? n2[o2 * 2 + 1] = 0 : (e2.heap[++e2.heap_len] = l2 = o2, e2.depth[o2] = 0);
  for (; e2.heap_len < 2; ) u2 = e2.heap[++e2.heap_len] = l2 < 2 ? ++l2 : 0, n2[u2 * 2] = 1, e2.depth[u2] = 0, e2.opt_len--, i2 && (e2.static_len -= r2[u2 * 2 + 1]);
  for (t2.max_code = l2, o2 = e2.heap_len >> 1; o2 >= 1; o2--) ie(e2, n2, o2);
  u2 = a2;
  do
    o2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], ie(e2, n2, 1), s2 = e2.heap[1], e2.heap[--e2.heap_max] = o2, e2.heap[--e2.heap_max] = s2, n2[u2 * 2] = n2[o2 * 2] + n2[s2 * 2], e2.depth[u2] = (e2.depth[o2] >= e2.depth[s2] ? e2.depth[o2] : e2.depth[s2]) + 1, n2[o2 * 2 + 1] = n2[s2 * 2 + 1] = u2, e2.heap[1] = u2++, ie(e2, n2, 1);
  while (e2.heap_len >= 2);
  e2.heap[--e2.heap_max] = e2.heap[1], k(e2, t2), A(n2, l2, e2.bl_count);
};
var se = (e2, t2, n2) => {
  let r2, i2 = -1, a2, o2 = t2[1], s2 = 0, c2 = 7, l2 = 4;
  for (o2 === 0 && (c2 = 138, l2 = 3), t2[(n2 + 1) * 2 + 1] = 65535, r2 = 0; r2 <= n2; r2++) a2 = o2, o2 = t2[(r2 + 1) * 2 + 1], !(++s2 < c2 && a2 === o2) && (s2 < l2 ? e2.bl_tree[a2 * 2] += s2 : a2 === 0 ? s2 <= 10 ? e2.bl_tree[p * 2]++ : e2.bl_tree[m * 2]++ : (a2 !== i2 && e2.bl_tree[a2 * 2]++, e2.bl_tree[f * 2]++), s2 = 0, i2 = a2, o2 === 0 ? (c2 = 138, l2 = 3) : a2 === o2 ? (c2 = 6, l2 = 3) : (c2 = 7, l2 = 4));
};
var ce = (e2, t2, n2) => {
  let r2, i2 = -1, a2, o2 = t2[1], s2 = 0, c2 = 7, l2 = 4;
  for (o2 === 0 && (c2 = 138, l2 = 3), r2 = 0; r2 <= n2; r2++) if (a2 = o2, o2 = t2[(r2 + 1) * 2 + 1], !(++s2 < c2 && a2 === o2)) {
    if (s2 < l2) do
      O(e2, a2, e2.bl_tree);
    while (--s2 !== 0);
    else a2 === 0 ? s2 <= 10 ? (O(e2, p, e2.bl_tree), D(e2, s2 - 3, 3)) : (O(e2, m, e2.bl_tree), D(e2, s2 - 11, 7)) : (a2 !== i2 && (O(e2, a2, e2.bl_tree), s2--), O(e2, f, e2.bl_tree), D(e2, s2 - 3, 2));
    s2 = 0, i2 = a2, o2 === 0 ? (c2 = 138, l2 = 3) : a2 === o2 ? (c2 = 6, l2 = 3) : (c2 = 7, l2 = 4);
  }
};
var le = (e2) => {
  let t2;
  for (se(e2, e2.dyn_ltree, e2.l_desc.max_code), se(e2, e2.dyn_dtree, e2.d_desc.max_code), oe(e2, e2.bl_desc), t2 = s - 1; t2 >= 3 && e2.bl_tree[_[t2] * 2 + 1] === 0; t2--) ;
  return e2.opt_len += 3 * (t2 + 1) + 5 + 5 + 4, t2;
};
var ue = (e2, t2, n2, r2) => {
  let i2;
  for (D(e2, t2 - 257, 5), D(e2, n2 - 1, 5), D(e2, r2 - 4, 4), i2 = 0; i2 < r2; i2++) D(e2, e2.bl_tree[_[i2] * 2 + 1], 3);
  ce(e2, e2.dyn_ltree, t2 - 1), ce(e2, e2.dyn_dtree, n2 - 1);
};
var de = (e2) => {
  let r2 = 4093624447, i2;
  for (i2 = 0; i2 <= 31; i2++, r2 >>>= 1) if (r2 & 1 && e2.dyn_ltree[i2 * 2] !== 0) return t;
  if (e2.dyn_ltree[18] !== 0 || e2.dyn_ltree[20] !== 0 || e2.dyn_ltree[26] !== 0) return n;
  for (i2 = 32; i2 < a; i2++) if (e2.dyn_ltree[i2 * 2] !== 0) return n;
  return t;
};
var fe = (e2, t2, n2, r2) => {
  D(e2, 0 + +!!r2, 3), ne(e2), E(e2, n2), E(e2, ~n2), n2 && e2.pending_buf.set(e2.window.subarray(t2, t2 + n2), e2.pending), e2.pending += n2;
};
var pe = (t2, n2, r2, i2) => {
  let a2, o2, s2 = 0;
  t2.level > 0 ? (t2.strm.data_type === 2 && (t2.strm.data_type = de(t2)), oe(t2, t2.l_desc), oe(t2, t2.d_desc), s2 = le(t2), a2 = t2.opt_len + 3 + 7 >>> 3, o2 = t2.static_len + 3 + 7 >>> 3, (o2 <= a2 || t2.strategy === e) && (a2 = o2)) : a2 = o2 = r2 + 5, r2 + 4 <= a2 && n2 !== -1 ? fe(t2, n2, r2, i2) : t2.strategy === e || o2 === a2 ? (D(t2, 2 + +!!i2, 3), ae(t2, y, b)) : (D(t2, 4 + +!!i2, 3), ue(t2, t2.l_desc.max_code + 1, t2.d_desc.max_code + 1, s2 + 1), ae(t2, t2.dyn_ltree, t2.dyn_dtree)), te(t2), i2 && ne(t2);
};
var j = (e2, t2, n2) => (e2.pending_buf[e2.sym_buf + e2.sym_next++] = t2, e2.pending_buf[e2.sym_buf + e2.sym_next++] = t2 >> 8, e2.pending_buf[e2.sym_buf + e2.sym_next++] = n2, t2 === 0 ? e2.dyn_ltree[n2 * 2]++ : (e2.matches++, t2--, e2.dyn_ltree[(S[n2] + a + 1) * 2]++, e2.dyn_dtree[T(t2) * 2]++), e2.sym_next === e2.sym_end);
var M = (e2, t2, n2, r2) => {
  let i2 = e2 & 65535 | 0, a2 = e2 >>> 16 & 65535 | 0, o2 = 0;
  for (; n2 !== 0; ) {
    o2 = n2 > 2e3 ? 2e3 : n2, n2 -= o2;
    do
      i2 = i2 + t2[r2++] | 0, a2 = a2 + i2 | 0;
    while (--o2);
    i2 %= 65521, a2 %= 65521;
  }
  return i2 | a2 << 16 | 0;
};
var me = new Uint32Array((() => {
  let e2, t2 = [];
  for (var n2 = 0; n2 < 256; n2++) {
    e2 = n2;
    for (var r2 = 0; r2 < 8; r2++) e2 = e2 & 1 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
    t2[n2] = e2;
  }
  return t2;
})());
var N = (e2, t2, n2, r2) => {
  let i2 = me, a2 = r2 + n2;
  e2 ^= -1;
  for (let n3 = r2; n3 < a2; n3++) e2 = e2 >>> 8 ^ i2[(e2 ^ t2[n3]) & 255];
  return e2 ^ -1;
};
var he = { 2: `need dictionary`, 1: `stream end`, 0: ``, "-1": `file error`, "-2": `stream error`, "-3": `data error`, "-4": `insufficient memory`, "-5": `buffer error`, "-6": `incompatible version` };
var P = 3;
var ge = 258;
var F = 262;
var I = 1;
var _e = 2;
var ve = 3;
var ye = 4;
var be = (e2) => {
  let t2, n2, r2, i2 = e2.w_size;
  t2 = e2.hash_size, r2 = t2;
  do
    n2 = e2.head[--r2], e2.head[r2] = n2 >= i2 ? n2 - i2 : 0;
  while (--t2);
  t2 = i2, r2 = t2;
  do
    n2 = e2.prev[--r2], e2.prev[r2] = n2 >= i2 ? n2 - i2 : 0;
  while (--t2);
};
var xe = (e2, t2, n2) => (t2 << e2.hash_shift ^ n2) & e2.hash_mask;
var L = (e2, t2) => {
  let n2;
  if (e2.legacy_hash) n2 = e2.ins_h = xe(e2, e2.ins_h, e2.window[t2 + P - 1]);
  else {
    let r3 = e2.window, i2 = r3[t2] | r3[t2 + 1] << 8 | r3[t2 + 2] << 16 | r3[t2 + 3] << 24;
    n2 = e2.ins_h = Math.imul(i2, 66521) + 66521 >>> 16 & e2.hash_mask;
  }
  let r2 = e2.prev[t2 & e2.w_mask] = e2.head[n2];
  return e2.head[n2] = t2, r2;
};
var Se = (e2) => {
  let t2 = e2.state, n2 = t2.pending;
  n2 > e2.avail_out && (n2 = e2.avail_out), n2 !== 0 && (e2.output.set(t2.pending_buf.subarray(t2.pending_out, t2.pending_out + n2), e2.next_out), e2.next_out += n2, t2.pending_out += n2, e2.total_out += n2, e2.avail_out -= n2, t2.pending -= n2, t2.pending === 0 && (t2.pending_out = 0));
};
var R = (e2, t2) => {
  pe(e2, e2.block_start >= 0 ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, Se(e2.strm);
};
var Ce = (e2, t2, n2, r2) => {
  let i2 = e2.avail_in;
  return i2 > r2 && (i2 = r2), i2 === 0 ? 0 : (e2.avail_in -= i2, t2.set(e2.input.subarray(e2.next_in, e2.next_in + i2), n2), e2.state.wrap === 1 ? e2.adler = M(e2.adler, t2, i2, n2) : e2.state.wrap === 2 && (e2.adler = N(e2.adler, t2, i2, n2)), e2.next_in += i2, e2.total_in += i2, i2);
};
var we = (e2, t2) => {
  let n2 = e2.max_chain_length, r2 = e2.strstart, i2, a2, o2 = e2.prev_length, s2 = e2.nice_match, c2 = e2.strstart > e2.w_size - F ? e2.strstart - (e2.w_size - F) : 0, l2 = e2.window, u2 = e2.w_mask, d2 = e2.prev, f2 = e2.strstart + ge, p2 = l2[r2 + o2 - 1], m2 = l2[r2 + o2];
  e2.prev_length >= e2.good_match && (n2 >>= 2), s2 > e2.lookahead && (s2 = e2.lookahead);
  do {
    if (i2 = t2, l2[i2 + o2] !== m2 || l2[i2 + o2 - 1] !== p2 || l2[i2] !== l2[r2] || l2[++i2] !== l2[r2 + 1]) continue;
    r2 += 2, i2++;
    do
      ;
    while (l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && l2[++r2] === l2[++i2] && r2 < f2);
    if (a2 = ge - (f2 - r2), r2 = f2 - ge, a2 > o2) {
      if (e2.match_start = t2, o2 = a2, a2 >= s2) break;
      p2 = l2[r2 + o2 - 1], m2 = l2[r2 + o2];
    }
  } while ((t2 = d2[t2 & u2]) > c2 && --n2 !== 0);
  return o2 <= e2.lookahead ? o2 : e2.lookahead;
};
var Te = (e2) => {
  let t2 = e2.w_size, n2, r2, i2;
  do {
    if (r2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= t2 + (t2 - F) && (e2.window.set(e2.window.subarray(t2, t2 + t2 - r2), 0), e2.match_start -= t2, e2.strstart -= t2, e2.block_start -= t2, e2.insert > e2.strstart && (e2.insert = e2.strstart), be(e2), r2 += t2), e2.strm.avail_in === 0) break;
    if (n2 = Ce(e2.strm, e2.window, e2.strstart + e2.lookahead, r2), e2.lookahead += n2, !e2.legacy_hash) {
      if (e2.lookahead + e2.insert > P) for (i2 = e2.strstart - e2.insert; e2.insert && (L(e2, i2), i2++, e2.insert--, !(e2.lookahead + e2.insert <= P)); ) ;
    } else if (e2.lookahead + e2.insert >= P) for (i2 = e2.strstart - e2.insert, e2.ins_h = e2.window[i2], e2.ins_h = xe(e2, e2.ins_h, e2.window[i2 + 1]); e2.insert && (L(e2, i2), i2++, e2.insert--, !(e2.lookahead + e2.insert < P)); ) ;
  } while (e2.lookahead < F && e2.strm.avail_in !== 0);
};
var Ee = (e2, t2) => {
  let n2 = e2.pending_buf_size - 5 > e2.w_size ? e2.w_size : e2.pending_buf_size - 5, r2, i2, a2, o2 = 0, s2 = e2.strm.avail_in;
  do {
    if (r2 = 65535, a2 = e2.bi_valid + 42 >> 3, e2.strm.avail_out < a2 || (a2 = e2.strm.avail_out - a2, i2 = e2.strstart - e2.block_start, r2 > i2 + e2.strm.avail_in && (r2 = i2 + e2.strm.avail_in), r2 > a2 && (r2 = a2), r2 < n2 && (r2 === 0 && t2 !== 4 || t2 === 0 || r2 !== i2 + e2.strm.avail_in))) break;
    o2 = +(t2 === 4 && r2 === i2 + e2.strm.avail_in), fe(e2, 0, 0, o2), e2.pending_buf[e2.pending - 4] = r2, e2.pending_buf[e2.pending - 3] = r2 >> 8, e2.pending_buf[e2.pending - 2] = ~r2, e2.pending_buf[e2.pending - 1] = ~r2 >> 8, Se(e2.strm), i2 && (i2 > r2 && (i2 = r2), e2.strm.output.set(e2.window.subarray(e2.block_start, e2.block_start + i2), e2.strm.next_out), e2.strm.next_out += i2, e2.strm.avail_out -= i2, e2.strm.total_out += i2, e2.block_start += i2, r2 -= i2), r2 && (Ce(e2.strm, e2.strm.output, e2.strm.next_out, r2), e2.strm.next_out += r2, e2.strm.avail_out -= r2, e2.strm.total_out += r2);
  } while (o2 === 0);
  return s2 -= e2.strm.avail_in, s2 && (s2 >= e2.w_size ? (e2.matches = 2, e2.window.set(e2.strm.input.subarray(e2.strm.next_in - e2.w_size, e2.strm.next_in), 0), e2.strstart = e2.w_size, e2.insert = e2.strstart) : (e2.window_size - e2.strstart <= s2 && (e2.strstart -= e2.w_size, e2.window.set(e2.window.subarray(e2.w_size, e2.w_size + e2.strstart), 0), e2.matches < 2 && e2.matches++, e2.insert > e2.strstart && (e2.insert = e2.strstart)), e2.window.set(e2.strm.input.subarray(e2.strm.next_in - s2, e2.strm.next_in), e2.strstart), e2.strstart += s2, e2.insert += s2 > e2.w_size - e2.insert ? e2.w_size - e2.insert : s2), e2.block_start = e2.strstart), e2.high_water < e2.strstart && (e2.high_water = e2.strstart), o2 ? ye : t2 !== 0 && t2 !== 4 && e2.strm.avail_in === 0 && e2.strstart === e2.block_start ? _e : (a2 = e2.window_size - e2.strstart, e2.strm.avail_in > a2 && e2.block_start >= e2.w_size && (e2.block_start -= e2.w_size, e2.strstart -= e2.w_size, e2.window.set(e2.window.subarray(e2.w_size, e2.w_size + e2.strstart), 0), e2.matches < 2 && e2.matches++, a2 += e2.w_size, e2.insert > e2.strstart && (e2.insert = e2.strstart)), a2 > e2.strm.avail_in && (a2 = e2.strm.avail_in), a2 && (Ce(e2.strm, e2.window, e2.strstart, a2), e2.strstart += a2, e2.insert += a2 > e2.w_size - e2.insert ? e2.w_size - e2.insert : a2), e2.high_water < e2.strstart && (e2.high_water = e2.strstart), a2 = e2.bi_valid + 42 >> 3, a2 = e2.pending_buf_size - a2 > 65535 ? 65535 : e2.pending_buf_size - a2, n2 = a2 > e2.w_size ? e2.w_size : a2, i2 = e2.strstart - e2.block_start, (i2 >= n2 || (i2 || t2 === 4) && t2 !== 0 && e2.strm.avail_in === 0 && i2 <= a2) && (r2 = i2 > a2 ? a2 : i2, o2 = +(t2 === 4 && e2.strm.avail_in === 0 && r2 === i2), fe(e2, e2.block_start, r2, o2), e2.block_start += r2, Se(e2.strm)), o2 ? ve : I);
};
var De = (e2, t2) => {
  let n2, r2;
  for (; ; ) {
    if (e2.lookahead < F) {
      if (Te(e2), e2.lookahead < F && t2 === 0) return I;
      if (e2.lookahead === 0) break;
    }
    if (n2 = 0, e2.lookahead >= P && (n2 = L(e2, e2.strstart)), n2 !== 0 && e2.strstart - n2 <= e2.w_size - F && (e2.match_length = we(e2, n2)), e2.match_length >= P) if (r2 = j(e2, e2.strstart - e2.match_start, e2.match_length - P), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= P) {
      e2.match_length--;
      do
        e2.strstart++, n2 = L(e2, e2.strstart);
      while (--e2.match_length !== 0);
      e2.strstart++;
    } else e2.strstart += e2.match_length, e2.match_length = 0, e2.legacy_hash && (e2.ins_h = e2.window[e2.strstart], e2.ins_h = xe(e2, e2.ins_h, e2.window[e2.strstart + 1]));
    else r2 = j(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
    if (r2 && (R(e2, false), e2.strm.avail_out === 0)) return I;
  }
  return e2.insert = e2.strstart < P - 1 ? e2.strstart : P - 1, t2 === 4 ? (R(e2, true), e2.strm.avail_out === 0 ? ve : ye) : e2.sym_next && (R(e2, false), e2.strm.avail_out === 0) ? I : _e;
};
var z = (e2, t2) => {
  let n2, r2, i2;
  for (; ; ) {
    if (e2.lookahead < F) {
      if (Te(e2), e2.lookahead < F && t2 === 0) return I;
      if (e2.lookahead === 0) break;
    }
    if (n2 = 0, e2.lookahead >= P && (n2 = L(e2, e2.strstart)), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = P - 1, n2 !== 0 && e2.prev_length < e2.max_lazy_match && e2.strstart - n2 <= e2.w_size - F && (e2.match_length = we(e2, n2), e2.match_length <= 5 && (e2.strategy === 1 || e2.match_length === P && e2.strstart - e2.match_start > 4096) && (e2.match_length = P - 1)), e2.prev_length >= P && e2.match_length <= e2.prev_length) {
      i2 = e2.strstart + e2.lookahead - P, r2 = j(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - P), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2;
      do
        ++e2.strstart <= i2 && (n2 = L(e2, e2.strstart));
      while (--e2.prev_length !== 0);
      if (e2.match_available = 0, e2.match_length = P - 1, e2.strstart++, r2 && (R(e2, false), e2.strm.avail_out === 0)) return I;
    } else if (e2.match_available) {
      if (r2 = j(e2, 0, e2.window[e2.strstart - 1]), r2 && R(e2, false), e2.strstart++, e2.lookahead--, e2.strm.avail_out === 0) return I;
    } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
  }
  return e2.match_available && (r2 = j(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < P - 1 ? e2.strstart : P - 1, t2 === 4 ? (R(e2, true), e2.strm.avail_out === 0 ? ve : ye) : e2.sym_next && (R(e2, false), e2.strm.avail_out === 0) ? I : _e;
};
var B = class {
  constructor(e2, t2, n2, r2, i2) {
    this.good_length = e2, this.max_lazy = t2, this.nice_length = n2, this.max_chain = r2, this.func = i2;
  }
};
new B(0, 0, 0, 0, Ee), new B(4, 4, 8, 4, De), new B(4, 5, 16, 8, De), new B(4, 6, 32, 32, De), new B(4, 4, 16, 16, z), new B(8, 16, 32, 32, z), new B(8, 16, 128, 128, z), new B(8, 32, 128, 256, z), new B(32, 128, 258, 1024, z), new B(32, 258, 258, 4096, z);
var V = 16209;
var Oe = 16191;
function ke(e2, t2) {
  let n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2, g2, _2, v2, y2, b2, x2, S2, C2, w2, T2, E2 = e2.state;
  n2 = e2.next_in, w2 = e2.input, r2 = n2 + (e2.avail_in - 5), i2 = e2.next_out, T2 = e2.output, a2 = i2 - (t2 - e2.avail_out), o2 = i2 + (e2.avail_out - 257), s2 = E2.dmax, c2 = E2.wsize, l2 = E2.whave, u2 = E2.wnext, d2 = E2.window, f2 = E2.hold, p2 = E2.bits, m2 = E2.lencode, h2 = E2.distcode, g2 = (1 << E2.lenbits) - 1, _2 = (1 << E2.distbits) - 1;
  top: do {
    p2 < 15 && (f2 += w2[n2++] << p2, p2 += 8, f2 += w2[n2++] << p2, p2 += 8), v2 = m2[f2 & g2];
    dolen: for (; ; ) {
      if (y2 = v2 >>> 24, f2 >>>= y2, p2 -= y2, y2 = v2 >>> 16 & 255, y2 === 0) T2[i2++] = v2 & 65535;
      else if (y2 & 16) {
        b2 = v2 & 65535, y2 &= 15, y2 && (p2 < y2 && (f2 += w2[n2++] << p2, p2 += 8), b2 += f2 & (1 << y2) - 1, f2 >>>= y2, p2 -= y2), p2 < 15 && (f2 += w2[n2++] << p2, p2 += 8, f2 += w2[n2++] << p2, p2 += 8), v2 = h2[f2 & _2];
        dodist: for (; ; ) {
          if (y2 = v2 >>> 24, f2 >>>= y2, p2 -= y2, y2 = v2 >>> 16 & 255, y2 & 16) {
            if (x2 = v2 & 65535, y2 &= 15, p2 < y2 && (f2 += w2[n2++] << p2, p2 += 8, p2 < y2 && (f2 += w2[n2++] << p2, p2 += 8)), x2 += f2 & (1 << y2) - 1, x2 > s2) {
              e2.msg = `invalid distance too far back`, E2.mode = V;
              break top;
            }
            if (f2 >>>= y2, p2 -= y2, y2 = i2 - a2, x2 > y2) {
              if (y2 = x2 - y2, y2 > l2 && E2.sane) {
                e2.msg = `invalid distance too far back`, E2.mode = V;
                break top;
              }
              if (S2 = 0, C2 = d2, u2 === 0) {
                if (S2 += c2 - y2, y2 < b2) {
                  b2 -= y2;
                  do
                    T2[i2++] = d2[S2++];
                  while (--y2);
                  S2 = i2 - x2, C2 = T2;
                }
              } else if (u2 < y2) {
                if (S2 += c2 + u2 - y2, y2 -= u2, y2 < b2) {
                  b2 -= y2;
                  do
                    T2[i2++] = d2[S2++];
                  while (--y2);
                  if (S2 = 0, u2 < b2) {
                    y2 = u2, b2 -= y2;
                    do
                      T2[i2++] = d2[S2++];
                    while (--y2);
                    S2 = i2 - x2, C2 = T2;
                  }
                }
              } else if (S2 += u2 - y2, y2 < b2) {
                b2 -= y2;
                do
                  T2[i2++] = d2[S2++];
                while (--y2);
                S2 = i2 - x2, C2 = T2;
              }
              for (; b2 > 2; ) T2[i2++] = C2[S2++], T2[i2++] = C2[S2++], T2[i2++] = C2[S2++], b2 -= 3;
              b2 && (T2[i2++] = C2[S2++], b2 > 1 && (T2[i2++] = C2[S2++]));
            } else {
              S2 = i2 - x2;
              do
                T2[i2++] = T2[S2++], T2[i2++] = T2[S2++], T2[i2++] = T2[S2++], b2 -= 3;
              while (b2 > 2);
              b2 && (T2[i2++] = T2[S2++], b2 > 1 && (T2[i2++] = T2[S2++]));
            }
          } else if (y2 & 64) {
            e2.msg = `invalid distance code`, E2.mode = V;
            break top;
          } else {
            v2 = h2[(v2 & 65535) + (f2 & (1 << y2) - 1)];
            continue dodist;
          }
          break;
        }
      } else if (!(y2 & 64)) {
        v2 = m2[(v2 & 65535) + (f2 & (1 << y2) - 1)];
        continue dolen;
      } else if (y2 & 32) {
        E2.mode = Oe;
        break top;
      } else {
        e2.msg = `invalid literal/length code`, E2.mode = V;
        break top;
      }
      break;
    }
  } while (n2 < r2 && i2 < o2);
  b2 = p2 >> 3, n2 -= b2, p2 -= b2 << 3, f2 &= (1 << p2) - 1, e2.next_in = n2, e2.next_out = i2, e2.avail_in = n2 < r2 ? 5 + (r2 - n2) : 5 - (n2 - r2), e2.avail_out = i2 < o2 ? 257 + (o2 - i2) : 257 - (i2 - o2), E2.hold = f2, E2.bits = p2;
}
var H = 15;
var Ae = 852;
var je = 592;
var Me = 0;
var Ne = 1;
var Pe = 2;
var Fe = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
var Ie = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 199, 75]);
var Le = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]);
var Re = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
var U = (e2, t2, n2, r2, i2, a2, o2, s2) => {
  let c2 = s2.bits, l2 = 0, u2 = 0, d2 = 0, f2 = 0, p2 = 0, m2 = 0, h2 = 0, g2 = 0, _2 = 0, v2 = 0, y2, b2, x2, S2, C2, w2 = null, T2, E2 = new Uint16Array(16), D2 = new Uint16Array(16), O2 = null, ee2, k2, A2;
  for (l2 = 0; l2 <= H; l2++) E2[l2] = 0;
  for (u2 = 0; u2 < r2; u2++) E2[t2[n2 + u2]]++;
  for (p2 = c2, f2 = H; f2 >= 1 && E2[f2] === 0; f2--) ;
  if (p2 > f2 && (p2 = f2), f2 === 0) return i2[a2++] = 20971520, i2[a2++] = 20971520, s2.bits = 1, 0;
  for (d2 = 1; d2 < f2 && E2[d2] === 0; d2++) ;
  for (p2 < d2 && (p2 = d2), g2 = 1, l2 = 1; l2 <= H; l2++) if (g2 <<= 1, g2 -= E2[l2], g2 < 0) return -1;
  if (g2 > 0 && (e2 === Me || f2 !== 1)) return -1;
  for (D2[1] = 0, l2 = 1; l2 < H; l2++) D2[l2 + 1] = D2[l2] + E2[l2];
  for (u2 = 0; u2 < r2; u2++) t2[n2 + u2] !== 0 && (o2[D2[t2[n2 + u2]]++] = u2);
  if (e2 === Me ? (w2 = O2 = o2, T2 = 20) : e2 === Ne ? (w2 = Fe, O2 = Ie, T2 = 257) : (w2 = Le, O2 = Re, T2 = 0), v2 = 0, u2 = 0, l2 = d2, C2 = a2, m2 = p2, h2 = 0, x2 = -1, _2 = 1 << p2, S2 = _2 - 1, e2 === Ne && _2 > Ae || e2 === Pe && _2 > je) return 1;
  for (; ; ) {
    ee2 = l2 - h2, o2[u2] + 1 < T2 ? (k2 = 0, A2 = o2[u2]) : o2[u2] >= T2 ? (k2 = O2[o2[u2] - T2], A2 = w2[o2[u2] - T2]) : (k2 = 96, A2 = 0), y2 = 1 << l2 - h2, b2 = 1 << m2, d2 = b2;
    do
      b2 -= y2, i2[C2 + (v2 >> h2) + b2] = ee2 << 24 | k2 << 16 | A2 | 0;
    while (b2 !== 0);
    for (y2 = 1 << l2 - 1; v2 & y2; ) y2 >>= 1;
    if (y2 === 0 ? v2 = 0 : (v2 &= y2 - 1, v2 += y2), u2++, --E2[l2] === 0) {
      if (l2 === f2) break;
      l2 = t2[n2 + o2[u2]];
    }
    if (l2 > p2 && (v2 & S2) !== x2) {
      for (h2 === 0 && (h2 = p2), C2 += d2, m2 = l2 - h2, g2 = 1 << m2; m2 + h2 < f2 && (g2 -= E2[m2 + h2], !(g2 <= 0)); ) m2++, g2 <<= 1;
      if (_2 += 1 << m2, e2 === Ne && _2 > Ae || e2 === Pe && _2 > je) return 1;
      x2 = v2 & S2, i2[x2] = p2 << 24 | m2 << 16 | C2 - a2 | 0;
    }
  }
  return v2 !== 0 && (i2[C2 + v2] = l2 - h2 << 24 | 4194304), s2.bits = p2, 0;
};
var ze = 0;
var Be = 1;
var Ve = 2;
var W = 16180;
var He = 16181;
var Ue = 16182;
var We = 16183;
var Ge = 16184;
var Ke = 16185;
var qe = 16186;
var Je = 16187;
var Ye = 16188;
var Xe = 16189;
var G = 16190;
var K = 16191;
var Ze = 16192;
var Qe = 16193;
var $e = 16194;
var et = 16195;
var tt = 16196;
var nt = 16197;
var rt = 16198;
var q = 16199;
var J = 16200;
var it = 16201;
var at = 16202;
var ot = 16203;
var st = 16204;
var ct = 16205;
var lt = 16206;
var ut = 16207;
var dt = 16208;
var Y = 16209;
var ft = 16210;
var pt = 16211;
var mt = 852;
var ht = 592;
var gt = (e2) => (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((e2 & 65280) << 8) + ((e2 & 255) << 24);
var _t = class {
  constructor() {
    this.strm = null, this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
};
var X = (e2) => {
  if (!e2) return 1;
  let t2 = e2.state;
  return +(!t2 || t2.strm !== e2 || t2.mode < W || t2.mode > pt);
};
var vt = (e2) => {
  if (X(e2)) return -2;
  let t2 = e2.state;
  return e2.total_in = e2.total_out = t2.total = 0, e2.msg = ``, t2.wrap && (e2.adler = t2.wrap & 1), t2.mode = W, t2.last = 0, t2.havedict = 0, t2.flags = -1, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new Int32Array(mt), t2.distcode = t2.distdyn = new Int32Array(ht), t2.sane = 1, t2.back = -1, 0;
};
var yt = (e2) => {
  if (X(e2)) return -2;
  let t2 = e2.state;
  return t2.wsize = 0, t2.whave = 0, t2.wnext = 0, vt(e2);
};
var bt = (e2, t2) => {
  let n2;
  if (X(e2)) return -2;
  let r2 = e2.state;
  return t2 < 0 ? (n2 = 0, t2 = -t2) : (n2 = (t2 >> 4) + 5, t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || t2 > 15) ? -2 : (r2.window !== null && r2.wbits !== t2 && (r2.window = null), r2.wrap = n2, r2.wbits = t2, yt(e2));
};
var xt = (e2, t2) => {
  if (!e2) return -2;
  let n2 = new _t();
  e2.state = n2, n2.strm = e2, n2.window = null, n2.mode = W;
  let r2 = bt(e2, t2);
  return r2 !== 0 && (e2.state = null), r2;
};
var St = true;
var Ct;
var wt;
var Tt = (e2) => {
  if (St) {
    Ct = new Int32Array(512), wt = new Int32Array(32);
    let t2 = 0;
    for (; t2 < 144; ) e2.lens[t2++] = 8;
    for (; t2 < 256; ) e2.lens[t2++] = 9;
    for (; t2 < 280; ) e2.lens[t2++] = 7;
    for (; t2 < 288; ) e2.lens[t2++] = 8;
    for (U(Be, e2.lens, 0, 288, Ct, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
    U(Ve, e2.lens, 0, 32, wt, 0, e2.work, { bits: 5 }), St = false;
  }
  e2.lencode = Ct, e2.lenbits = 9, e2.distcode = wt, e2.distbits = 5;
};
var Et = (e2, t2, n2, r2) => {
  let i2, a2 = e2.state;
  return a2.window === null && (a2.window = new Uint8Array(1 << a2.wbits)), a2.wsize === 0 && (a2.wsize = 1 << a2.wbits, a2.wnext = 0, a2.whave = 0), r2 >= a2.wsize ? (a2.window.set(t2.subarray(n2 - a2.wsize, n2), 0), a2.wnext = 0, a2.whave = a2.wsize) : (i2 = a2.wsize - a2.wnext, i2 > r2 && (i2 = r2), a2.window.set(t2.subarray(n2 - r2, n2 - r2 + i2), a2.wnext), r2 -= i2, r2 ? (a2.window.set(t2.subarray(n2 - r2, n2), 0), a2.wnext = r2, a2.whave = a2.wsize) : (a2.wnext += i2, a2.wnext === a2.wsize && (a2.wnext = 0), a2.whave < a2.wsize && (a2.whave += i2))), 0;
};
var Dt = (e2, t2) => {
  let n2, r2, i2, a2, o2, s2, c2, l2, u2, d2, f2, p2, m2, h2, g2 = 0, _2, v2, y2, b2, x2, S2, C2, w2, T2 = new Uint8Array(4), E2, D2, O2 = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (X(e2) || !e2.output || !e2.input && e2.avail_in !== 0) return -2;
  n2 = e2.state, n2.mode === K && (n2.mode = Ze), o2 = e2.next_out, i2 = e2.output, c2 = e2.avail_out, a2 = e2.next_in, r2 = e2.input, s2 = e2.avail_in, l2 = n2.hold, u2 = n2.bits, d2 = s2, f2 = c2, w2 = 0;
  inf_leave: for (; ; ) switch (n2.mode) {
    case W:
      if (n2.wrap === 0) {
        n2.mode = Ze;
        break;
      }
      for (; u2 < 16; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (n2.wrap & 2 && l2 === 35615) {
        n2.wbits === 0 && (n2.wbits = 15), n2.check = 0, T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = N(n2.check, T2, 2, 0), l2 = 0, u2 = 0, n2.mode = He;
        break;
      }
      if (n2.head && (n2.head.done = false), !(n2.wrap & 1) || (((l2 & 255) << 8) + (l2 >> 8)) % 31) {
        e2.msg = `incorrect header check`, n2.mode = Y;
        break;
      }
      if ((l2 & 15) != 8) {
        e2.msg = `unknown compression method`, n2.mode = Y;
        break;
      }
      if (l2 >>>= 4, u2 -= 4, C2 = (l2 & 15) + 8, n2.wbits === 0 && (n2.wbits = C2), C2 > 15 || C2 > n2.wbits) {
        e2.msg = `invalid window size`, n2.mode = Y;
        break;
      }
      n2.dmax = 1 << n2.wbits, n2.flags = 0, e2.adler = n2.check = 1, n2.mode = l2 & 512 ? Xe : K, l2 = 0, u2 = 0;
      break;
    case He:
      for (; u2 < 16; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (n2.flags = l2, (n2.flags & 255) != 8) {
        e2.msg = `unknown compression method`, n2.mode = Y;
        break;
      }
      if (n2.flags & 57344) {
        e2.msg = `unknown header flags set`, n2.mode = Y;
        break;
      }
      n2.head && (n2.head.text = l2 >> 8 & 1), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = N(n2.check, T2, 2, 0)), l2 = 0, u2 = 0, n2.mode = Ue;
    case Ue:
      for (; u2 < 32; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      n2.head && (n2.head.time = l2 >>> 0), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, T2[2] = l2 >>> 16 & 255, T2[3] = l2 >>> 24 & 255, n2.check = N(n2.check, T2, 4, 0)), l2 = 0, u2 = 0, n2.mode = We;
    case We:
      for (; u2 < 16; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      n2.head && (n2.head.xflags = l2 & 255, n2.head.os = l2 >> 8), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = N(n2.check, T2, 2, 0)), l2 = 0, u2 = 0, n2.mode = Ge;
    case Ge:
      if (n2.flags & 1024) {
        for (; u2 < 16; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.length = l2, n2.head && (n2.head.extra_len = l2), n2.flags & 512 && n2.wrap & 4 && (T2[0] = l2 & 255, T2[1] = l2 >>> 8 & 255, n2.check = N(n2.check, T2, 2, 0)), l2 = 0, u2 = 0;
      } else n2.head && (n2.head.extra = null);
      n2.mode = Ke;
    case Ke:
      if (n2.flags & 1024 && (p2 = n2.length, p2 > s2 && (p2 = s2), p2 && (n2.head && (C2 = n2.head.extra_len - n2.length, n2.head.extra || (n2.head.extra = new Uint8Array(n2.head.extra_len)), n2.head.extra.set(r2.subarray(a2, a2 + p2), C2)), n2.flags & 512 && n2.wrap & 4 && (n2.check = N(n2.check, r2, p2, a2)), s2 -= p2, a2 += p2, n2.length -= p2), n2.length)) break inf_leave;
      n2.length = 0, n2.mode = qe;
    case qe:
      if (n2.flags & 2048) {
        if (s2 === 0) break inf_leave;
        p2 = 0;
        do
          C2 = r2[a2 + p2++], n2.head && C2 && n2.length < 65536 && (n2.head.name += String.fromCharCode(C2));
        while (C2 && p2 < s2);
        if (n2.flags & 512 && n2.wrap & 4 && (n2.check = N(n2.check, r2, p2, a2)), s2 -= p2, a2 += p2, C2) break inf_leave;
      } else n2.head && (n2.head.name = null);
      n2.length = 0, n2.mode = Je;
    case Je:
      if (n2.flags & 4096) {
        if (s2 === 0) break inf_leave;
        p2 = 0;
        do
          C2 = r2[a2 + p2++], n2.head && C2 && n2.length < 65536 && (n2.head.comment += String.fromCharCode(C2));
        while (C2 && p2 < s2);
        if (n2.flags & 512 && n2.wrap & 4 && (n2.check = N(n2.check, r2, p2, a2)), s2 -= p2, a2 += p2, C2) break inf_leave;
      } else n2.head && (n2.head.comment = null);
      n2.mode = Ye;
    case Ye:
      if (n2.flags & 512) {
        for (; u2 < 16; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        if (n2.wrap & 4 && l2 !== (n2.check & 65535)) {
          e2.msg = `header crc mismatch`, n2.mode = Y;
          break;
        }
        l2 = 0, u2 = 0;
      }
      n2.head && (n2.head.hcrc = n2.flags >> 9 & 1, n2.head.done = true), e2.adler = n2.check = 0, n2.mode = K;
      break;
    case Xe:
      for (; u2 < 32; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      e2.adler = n2.check = gt(l2), l2 = 0, u2 = 0, n2.mode = G;
    case G:
      if (n2.havedict === 0) return e2.next_out = o2, e2.avail_out = c2, e2.next_in = a2, e2.avail_in = s2, n2.hold = l2, n2.bits = u2, 2;
      e2.adler = n2.check = 1, n2.mode = K;
    case K:
      if (t2 === 5 || t2 === 6) break inf_leave;
    case Ze:
      if (n2.last) {
        l2 >>>= u2 & 7, u2 -= u2 & 7, n2.mode = lt;
        break;
      }
      for (; u2 < 3; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      switch (n2.last = l2 & 1, l2 >>>= 1, --u2, l2 & 3) {
        case 0:
          n2.mode = Qe;
          break;
        case 1:
          if (Tt(n2), n2.mode = q, t2 === 6) {
            l2 >>>= 2, u2 -= 2;
            break inf_leave;
          }
          break;
        case 2:
          n2.mode = tt;
          break;
        case 3:
          e2.msg = `invalid block type`, n2.mode = Y;
      }
      l2 >>>= 2, u2 -= 2;
      break;
    case Qe:
      for (l2 >>>= u2 & 7, u2 -= u2 & 7; u2 < 32; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if ((l2 & 65535) != (l2 >>> 16 ^ 65535)) {
        e2.msg = `invalid stored block lengths`, n2.mode = Y;
        break;
      }
      if (n2.length = l2 & 65535, l2 = 0, u2 = 0, n2.mode = $e, t2 === 6) break inf_leave;
    case $e:
      n2.mode = et;
    case et:
      if (p2 = n2.length, p2) {
        if (p2 > s2 && (p2 = s2), p2 > c2 && (p2 = c2), p2 === 0) break inf_leave;
        i2.set(r2.subarray(a2, a2 + p2), o2), s2 -= p2, a2 += p2, c2 -= p2, o2 += p2, n2.length -= p2;
        break;
      }
      n2.mode = K;
      break;
    case tt:
      for (; u2 < 14; ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (n2.nlen = (l2 & 31) + 257, l2 >>>= 5, u2 -= 5, n2.ndist = (l2 & 31) + 1, l2 >>>= 5, u2 -= 5, n2.ncode = (l2 & 15) + 4, l2 >>>= 4, u2 -= 4, n2.nlen > 286 || n2.ndist > 30) {
        e2.msg = `too many length or distance symbols`, n2.mode = Y;
        break;
      }
      n2.have = 0, n2.mode = nt;
    case nt:
      for (; n2.have < n2.ncode; ) {
        for (; u2 < 3; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.lens[O2[n2.have++]] = l2 & 7, l2 >>>= 3, u2 -= 3;
      }
      for (; n2.have < 19; ) n2.lens[O2[n2.have++]] = 0;
      if (n2.lencode = n2.lendyn, n2.lenbits = 7, E2 = { bits: n2.lenbits }, w2 = U(ze, n2.lens, 0, 19, n2.lencode, 0, n2.work, E2), n2.lenbits = E2.bits, w2) {
        e2.msg = `invalid code lengths set`, n2.mode = Y;
        break;
      }
      n2.have = 0, n2.mode = rt;
    case rt:
      for (; n2.have < n2.nlen + n2.ndist; ) {
        for (; g2 = n2.lencode[l2 & (1 << n2.lenbits) - 1], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(_2 <= u2); ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        if (y2 < 16) l2 >>>= _2, u2 -= _2, n2.lens[n2.have++] = y2;
        else {
          if (y2 === 16) {
            for (D2 = _2 + 2; u2 < D2; ) {
              if (s2 === 0) break inf_leave;
              s2--, l2 += r2[a2++] << u2, u2 += 8;
            }
            if (l2 >>>= _2, u2 -= _2, n2.have === 0) {
              e2.msg = `invalid bit length repeat`, n2.mode = Y;
              break;
            }
            C2 = n2.lens[n2.have - 1], p2 = 3 + (l2 & 3), l2 >>>= 2, u2 -= 2;
          } else if (y2 === 17) {
            for (D2 = _2 + 3; u2 < D2; ) {
              if (s2 === 0) break inf_leave;
              s2--, l2 += r2[a2++] << u2, u2 += 8;
            }
            l2 >>>= _2, u2 -= _2, C2 = 0, p2 = 3 + (l2 & 7), l2 >>>= 3, u2 -= 3;
          } else {
            for (D2 = _2 + 7; u2 < D2; ) {
              if (s2 === 0) break inf_leave;
              s2--, l2 += r2[a2++] << u2, u2 += 8;
            }
            l2 >>>= _2, u2 -= _2, C2 = 0, p2 = 11 + (l2 & 127), l2 >>>= 7, u2 -= 7;
          }
          if (n2.have + p2 > n2.nlen + n2.ndist) {
            e2.msg = `invalid bit length repeat`, n2.mode = Y;
            break;
          }
          for (; p2--; ) n2.lens[n2.have++] = C2;
        }
      }
      if (n2.mode === Y) break;
      if (n2.lens[256] === 0) {
        e2.msg = `invalid code -- missing end-of-block`, n2.mode = Y;
        break;
      }
      if (n2.lenbits = 9, E2 = { bits: n2.lenbits }, w2 = U(Be, n2.lens, 0, n2.nlen, n2.lencode, 0, n2.work, E2), n2.lenbits = E2.bits, w2) {
        e2.msg = `invalid literal/lengths set`, n2.mode = Y;
        break;
      }
      if (n2.distbits = 6, n2.distcode = n2.distdyn, E2 = { bits: n2.distbits }, w2 = U(Ve, n2.lens, n2.nlen, n2.ndist, n2.distcode, 0, n2.work, E2), n2.distbits = E2.bits, w2) {
        e2.msg = `invalid distances set`, n2.mode = Y;
        break;
      }
      if (n2.mode = q, t2 === 6) break inf_leave;
    case q:
      n2.mode = J;
    case J:
      if (s2 >= 6 && c2 >= 258) {
        e2.next_out = o2, e2.avail_out = c2, e2.next_in = a2, e2.avail_in = s2, n2.hold = l2, n2.bits = u2, ke(e2, f2), o2 = e2.next_out, i2 = e2.output, c2 = e2.avail_out, a2 = e2.next_in, r2 = e2.input, s2 = e2.avail_in, l2 = n2.hold, u2 = n2.bits, n2.mode === K && (n2.back = -1);
        break;
      }
      for (n2.back = 0; g2 = n2.lencode[l2 & (1 << n2.lenbits) - 1], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(_2 <= u2); ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (v2 && !(v2 & 240)) {
        for (b2 = _2, x2 = v2, S2 = y2; g2 = n2.lencode[S2 + ((l2 & (1 << b2 + x2) - 1) >> b2)], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(b2 + _2 <= u2); ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        l2 >>>= b2, u2 -= b2, n2.back += b2;
      }
      if (l2 >>>= _2, u2 -= _2, n2.back += _2, n2.length = y2, v2 === 0) {
        n2.mode = ct;
        break;
      }
      if (v2 & 32) {
        n2.back = -1, n2.mode = K;
        break;
      }
      if (v2 & 64) {
        e2.msg = `invalid literal/length code`, n2.mode = Y;
        break;
      }
      n2.extra = v2 & 15, n2.mode = it;
    case it:
      if (n2.extra) {
        for (D2 = n2.extra; u2 < D2; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.length += l2 & (1 << n2.extra) - 1, l2 >>>= n2.extra, u2 -= n2.extra, n2.back += n2.extra;
      }
      n2.was = n2.length, n2.mode = at;
    case at:
      for (; g2 = n2.distcode[l2 & (1 << n2.distbits) - 1], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(_2 <= u2); ) {
        if (s2 === 0) break inf_leave;
        s2--, l2 += r2[a2++] << u2, u2 += 8;
      }
      if (!(v2 & 240)) {
        for (b2 = _2, x2 = v2, S2 = y2; g2 = n2.distcode[S2 + ((l2 & (1 << b2 + x2) - 1) >> b2)], _2 = g2 >>> 24, v2 = g2 >>> 16 & 255, y2 = g2 & 65535, !(b2 + _2 <= u2); ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        l2 >>>= b2, u2 -= b2, n2.back += b2;
      }
      if (l2 >>>= _2, u2 -= _2, n2.back += _2, v2 & 64) {
        e2.msg = `invalid distance code`, n2.mode = Y;
        break;
      }
      n2.offset = y2, n2.extra = v2 & 15, n2.mode = ot;
    case ot:
      if (n2.extra) {
        for (D2 = n2.extra; u2 < D2; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        n2.offset += l2 & (1 << n2.extra) - 1, l2 >>>= n2.extra, u2 -= n2.extra, n2.back += n2.extra;
      }
      if (n2.offset > n2.dmax) {
        e2.msg = `invalid distance too far back`, n2.mode = Y;
        break;
      }
      n2.mode = st;
    case st:
      if (c2 === 0) break inf_leave;
      if (p2 = f2 - c2, n2.offset > p2) {
        if (p2 = n2.offset - p2, p2 > n2.whave && n2.sane) {
          e2.msg = `invalid distance too far back`, n2.mode = Y;
          break;
        }
        p2 > n2.wnext ? (p2 -= n2.wnext, m2 = n2.wsize - p2) : m2 = n2.wnext - p2, p2 > n2.length && (p2 = n2.length), h2 = n2.window;
      } else h2 = i2, m2 = o2 - n2.offset, p2 = n2.length;
      p2 > c2 && (p2 = c2), c2 -= p2, n2.length -= p2;
      do
        i2[o2++] = h2[m2++];
      while (--p2);
      n2.length === 0 && (n2.mode = J);
      break;
    case ct:
      if (c2 === 0) break inf_leave;
      i2[o2++] = n2.length, c2--, n2.mode = J;
      break;
    case lt:
      if (n2.wrap) {
        for (; u2 < 32; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 |= r2[a2++] << u2, u2 += 8;
        }
        if (f2 -= c2, e2.total_out += f2, n2.total += f2, n2.wrap & 4 && f2 && (e2.adler = n2.check = n2.flags ? N(n2.check, i2, f2, o2 - f2) : M(n2.check, i2, f2, o2 - f2)), f2 = c2, n2.wrap & 4 && (n2.flags ? l2 : gt(l2)) !== n2.check) {
          e2.msg = `incorrect data check`, n2.mode = Y;
          break;
        }
        l2 = 0, u2 = 0;
      }
      n2.mode = ut;
    case ut:
      if (n2.wrap && n2.flags) {
        for (; u2 < 32; ) {
          if (s2 === 0) break inf_leave;
          s2--, l2 += r2[a2++] << u2, u2 += 8;
        }
        if (n2.wrap & 4 && l2 !== (n2.total & 4294967295)) {
          e2.msg = `incorrect length check`, n2.mode = Y;
          break;
        }
        l2 = 0, u2 = 0;
      }
      n2.mode = dt;
    case dt:
      w2 = 1;
      break inf_leave;
    case Y:
      w2 = -3;
      break inf_leave;
    case ft:
      return -4;
    case pt:
    default:
      return -2;
  }
  return e2.next_out = o2, e2.avail_out = c2, e2.next_in = a2, e2.avail_in = s2, n2.hold = l2, n2.bits = u2, (n2.wsize || f2 !== e2.avail_out && n2.mode < Y && (n2.mode < lt || t2 !== 4)) && Et(e2, e2.output, e2.next_out, f2 - e2.avail_out) ? (n2.mode = ft, -4) : (d2 -= e2.avail_in, f2 -= e2.avail_out, e2.total_in += d2, e2.total_out += f2, n2.total += f2, n2.wrap & 4 && f2 && (e2.adler = n2.check = n2.flags ? N(n2.check, i2, f2, e2.next_out - f2) : M(n2.check, i2, f2, e2.next_out - f2)), e2.data_type = n2.bits + (n2.last ? 64 : 0) + (n2.mode === K ? 128 : 0) + (n2.mode === q || n2.mode === $e ? 256 : 0), (d2 === 0 && f2 === 0 || t2 === 4) && w2 === 0 && (w2 = -5), w2);
};
var Ot = (e2) => {
  if (X(e2)) return -2;
  let t2 = e2.state;
  return t2.window && (t2.window = null), e2.state = null, 0;
};
var kt = (e2, t2) => {
  let n2 = t2.length, r2, i2, a2;
  return X(e2) || (r2 = e2.state, r2.wrap !== 0 && r2.mode !== G) ? -2 : r2.mode === G && (i2 = 1, i2 = M(i2, t2, n2, 0), i2 !== r2.check) ? -3 : (a2 = Et(e2, t2, n2, n2), a2 ? (r2.mode = ft, -4) : (r2.havedict = 1, 0));
};
var At = class {
  constructor() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = ``, this.state = null, this.data_type = 2, this.adler = 0;
  }
};
var jt = (e2) => {
  let t2 = new Uint8Array(e2.reduce((e3, t3) => e3 + t3.length, 0)), n2 = 0;
  for (let r2 of e2) t2.set(r2, n2), n2 += r2.length;
  return t2;
};
function Z(e2) {
  "@babel/helpers - typeof";
  return Z = typeof Symbol == `function` && typeof Symbol.iterator == `symbol` ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && typeof Symbol == `function` && e3.constructor === Symbol && e3 !== Symbol.prototype ? `symbol` : typeof e3;
  }, Z(e2);
}
function Mt(e2, t2) {
  if (Z(e2) != `object` || !e2) return e2;
  var n2 = e2[Symbol.toPrimitive];
  if (n2 !== void 0) {
    var r2 = n2.call(e2, t2 || `default`);
    if (Z(r2) != `object`) return r2;
    throw TypeError(`@@toPrimitive must return a primitive value.`);
  }
  return (t2 === `string` ? String : Number)(e2);
}
function Nt(e2) {
  var t2 = Mt(e2, `string`);
  return Z(t2) == `symbol` ? t2 : t2 + ``;
}
function Q(e2, t2, n2) {
  return (t2 = Nt(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
}
var It = Object.prototype.toString;
var Lt = { chunkSize: 1024 * 64, windowBits: 15, raw: false, dictionary: new Uint8Array() };
var Rt = class {
  constructor(e2 = {}) {
    Q(this, `options`, void 0), Q(this, `err`, void 0), Q(this, `msg`, void 0), Q(this, `ended`, void 0), Q(this, `started`, void 0), Q(this, `chunks`, void 0), Q(this, `strm`, void 0), Q(this, `result`, void 0), this.options = Object.assign({}, Lt, e2);
    let t2 = this.options;
    t2.raw && t2.windowBits >= 0 && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, t2.windowBits === 0 && (t2.windowBits = -15)), t2.windowBits >= 0 && t2.windowBits < 16 && !e2.windowBits && (t2.windowBits += 32), t2.windowBits > 15 && t2.windowBits < 48 && (t2.windowBits & 15 || (t2.windowBits |= 15)), this.err = 0, this.msg = ``, this.ended = false, this.started = false, this.chunks = [], this.result = new Uint8Array(), this.strm = new At(), this.strm.avail_out = 0;
    let n2 = xt(this.strm, t2.windowBits);
    if (n2 !== 0) throw Error(he[n2]);
    It.call(t2.dictionary) === `[object ArrayBuffer]` && (t2.dictionary = new Uint8Array(t2.dictionary));
    let r2 = t2.dictionary;
    if (t2.raw && r2.length && (n2 = kt(this.strm, r2), n2 !== 0)) throw Error(he[n2]);
  }
  push(e2, t2 = false) {
    let n2 = this.strm, r2 = this.options.chunkSize, i2, a2, o2;
    if (this.ended) return this.err === 0;
    for (a2 = typeof t2 == `number` ? t2 : t2 === true ? 4 : 0, It.call(e2) === `[object ArrayBuffer]` ? n2.input = new Uint8Array(e2) : n2.input = e2, n2.next_in = 0, n2.avail_in = n2.input.length, this.started || (this.started = true, this.onStart(n2)); ; ) {
      if (n2.avail_out === 0 && (n2.output = new Uint8Array(r2), n2.next_out = 0, n2.avail_out = r2), i2 = Dt(n2, a2), i2 === 2) {
        let e3 = this.options.dictionary;
        e3.length && (i2 = kt(n2, e3), i2 === 0 ? i2 = Dt(n2, a2) : i2 === -3 && (i2 = 2));
      }
      for (; n2.avail_in > 0 && i2 === 1 && n2.state.wrap & 2 && n2.state.flags !== 0 && n2.input[n2.next_in] !== 0; ) yt(n2), i2 = Dt(n2, a2);
      if (i2 === -2 || i2 === -3 || i2 === 2 || i2 === -4) break;
      if (o2 = n2.avail_out, n2.next_out && (n2.avail_out === 0 || i2 === 1 || a2 > 0) && (this.onData(n2.output.length === n2.next_out ? n2.output : n2.output.subarray(0, n2.next_out)), n2.avail_out = 0, n2.next_out = 0), !((i2 === 0 || i2 === -5) && o2 === 0)) {
        if (i2 === 1) {
          i2 = Ot(this.strm);
          break;
        }
        if (n2.avail_in === 0) {
          if (a2 === 4) {
            i2 = Ot(this.strm), i2 === 0 && (i2 = -5);
            break;
          }
          return true;
        }
      }
    }
    return this.err = i2, this.msg = n2.msg || he[i2], this.ended = true, this.onEnd(i2), i2 === 0;
  }
  onStart(e2) {
  }
  onData(e2) {
    this.chunks.push(e2);
  }
  onEnd(e2) {
    e2 === 0 && (this.result = jt(this.chunks)), this.chunks = [];
  }
};
function $(e2, t2 = {}) {
  let n2 = new Rt(t2);
  if (n2.push(e2, true), n2.err) throw Error(n2.msg);
  let r2 = n2.result;
  return t2.toText ? new TextDecoder().decode(r2) : r2;
}

// packages/engine/Source/Workers/decodeGoogleEarthEnterprisePacket.js
var sizeOfUint16 = Uint16Array.BYTES_PER_ELEMENT;
var sizeOfInt32 = Int32Array.BYTES_PER_ELEMENT;
var sizeOfUint32 = Uint32Array.BYTES_PER_ELEMENT;
var Types = {
  METADATA: 0,
  TERRAIN: 1,
  DBROOT: 2
};
Types.fromString = function(s2) {
  if (s2 === "Metadata") {
    return Types.METADATA;
  } else if (s2 === "Terrain") {
    return Types.TERRAIN;
  } else if (s2 === "DbRoot") {
    return Types.DBROOT;
  }
};
function decodeGoogleEarthEnterprisePacket(parameters, transferableObjects) {
  const type = Types.fromString(parameters.type);
  let buffer = parameters.buffer;
  decodeGoogleEarthEnterpriseData_default(parameters.key, buffer);
  const uncompressedTerrain = uncompressPacket(buffer);
  buffer = uncompressedTerrain.buffer;
  const length = uncompressedTerrain.length;
  switch (type) {
    case Types.METADATA:
      return processMetadata(buffer, length, parameters.quadKey);
    case Types.TERRAIN:
      return processTerrain(buffer, length, transferableObjects);
    case Types.DBROOT:
      transferableObjects.push(buffer);
      return {
        buffer
      };
  }
}
var qtMagic = 32301;
function processMetadata(buffer, totalSize, quadKey) {
  const dv = new DataView(buffer);
  let offset = 0;
  const magic = dv.getUint32(offset, true);
  offset += sizeOfUint32;
  if (magic !== qtMagic) {
    throw new RuntimeError_default("Invalid magic");
  }
  const dataTypeId = dv.getUint32(offset, true);
  offset += sizeOfUint32;
  if (dataTypeId !== 1) {
    throw new RuntimeError_default("Invalid data type. Must be 1 for QuadTreePacket");
  }
  const quadVersion = dv.getUint32(offset, true);
  offset += sizeOfUint32;
  if (quadVersion !== 2) {
    throw new RuntimeError_default(
      "Invalid QuadTreePacket version. Only version 2 is supported."
    );
  }
  const numInstances = dv.getInt32(offset, true);
  offset += sizeOfInt32;
  const dataInstanceSize = dv.getInt32(offset, true);
  offset += sizeOfInt32;
  if (dataInstanceSize !== 32) {
    throw new RuntimeError_default("Invalid instance size.");
  }
  const dataBufferOffset = dv.getInt32(offset, true);
  offset += sizeOfInt32;
  const dataBufferSize = dv.getInt32(offset, true);
  offset += sizeOfInt32;
  const metaBufferSize = dv.getInt32(offset, true);
  offset += sizeOfInt32;
  if (dataBufferOffset !== numInstances * dataInstanceSize + offset) {
    throw new RuntimeError_default("Invalid dataBufferOffset");
  }
  if (dataBufferOffset + dataBufferSize + metaBufferSize !== totalSize) {
    throw new RuntimeError_default("Invalid packet offsets");
  }
  const instances = [];
  for (let i2 = 0; i2 < numInstances; ++i2) {
    const bitfield = dv.getUint8(offset);
    ++offset;
    ++offset;
    const cnodeVersion = dv.getUint16(offset, true);
    offset += sizeOfUint16;
    const imageVersion = dv.getUint16(offset, true);
    offset += sizeOfUint16;
    const terrainVersion = dv.getUint16(offset, true);
    offset += sizeOfUint16;
    offset += sizeOfUint16;
    offset += sizeOfUint16;
    offset += sizeOfInt32;
    offset += sizeOfInt32;
    offset += 8;
    const imageProvider = dv.getUint8(offset++);
    const terrainProvider = dv.getUint8(offset++);
    offset += sizeOfUint16;
    instances.push(
      new GoogleEarthEnterpriseTileInformation_default(
        bitfield,
        cnodeVersion,
        imageVersion,
        terrainVersion,
        imageProvider,
        terrainProvider
      )
    );
  }
  const tileInfo = [];
  let index = 0;
  function populateTiles(parentKey, parent, level2) {
    let isLeaf = false;
    if (level2 === 4) {
      if (parent.hasSubtree()) {
        return;
      }
      isLeaf = true;
    }
    for (let i2 = 0; i2 < 4; ++i2) {
      const childKey = parentKey + i2.toString();
      if (isLeaf) {
        tileInfo[childKey] = null;
      } else if (level2 < 4) {
        if (!parent.hasChild(i2)) {
          tileInfo[childKey] = null;
        } else {
          if (index === numInstances) {
            console.log("Incorrect number of instances");
            return;
          }
          const instance = instances[index++];
          tileInfo[childKey] = instance;
          populateTiles(childKey, instance, level2 + 1);
        }
      }
    }
  }
  let level = 0;
  const root = instances[index++];
  if (quadKey === "") {
    ++level;
  } else {
    tileInfo[quadKey] = root;
  }
  populateTiles(quadKey, root, level);
  return tileInfo;
}
var numMeshesPerPacket = 5;
var numSubMeshesPerMesh = 4;
function processTerrain(buffer, totalSize, transferableObjects) {
  const dv = new DataView(buffer);
  const advanceMesh = function(pos) {
    for (let sub = 0; sub < numSubMeshesPerMesh; ++sub) {
      const size = dv.getUint32(pos, true);
      pos += sizeOfUint32;
      pos += size;
      if (pos > totalSize) {
        throw new RuntimeError_default("Malformed terrain packet found.");
      }
    }
    return pos;
  };
  let offset = 0;
  const terrainMeshes = [];
  while (terrainMeshes.length < numMeshesPerPacket) {
    const start = offset;
    offset = advanceMesh(offset);
    const mesh = buffer.slice(start, offset);
    transferableObjects.push(mesh);
    terrainMeshes.push(mesh);
  }
  return terrainMeshes;
}
var compressedMagic2 = 1953029805;
var compressedMagicSwap2 = 2917034100;
function uncompressPacket(data) {
  const dv = new DataView(data);
  let offset = 0;
  const magic = dv.getUint32(offset, true);
  offset += sizeOfUint32;
  if (magic !== compressedMagic2 && magic !== compressedMagicSwap2) {
    throw new RuntimeError_default("Invalid magic");
  }
  const size = dv.getUint32(offset, magic === compressedMagic2);
  offset += sizeOfUint32;
  const compressedPacket = new Uint8Array(data, offset);
  const uncompressedPacket = $(compressedPacket);
  if (uncompressedPacket.length !== size) {
    throw new RuntimeError_default("Size of packet doesn't match header");
  }
  return uncompressedPacket;
}
var decodeGoogleEarthEnterprisePacket_default = createTaskProcessorWorker_default(decodeGoogleEarthEnterprisePacket);
export {
  decodeGoogleEarthEnterprisePacket_default as default
};
