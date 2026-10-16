!(function() {
  "use strict";
  const { Array: t, Object: n, Number: e, Math: o, Error: r, Uint8Array: c, Uint16Array: s, Uint32Array: a, Int32Array: i, Map: f, DataView: u, Promise: w, TextEncoder: l, crypto: d, postMessage: p, TransformStream: h, ReadableStream: y, WritableStream: m, CompressionStream: S, DecompressionStream: g } = self, v = void 0, b = "undefined", k = "function", z = new c(), C = [[], [], [], [], [], [], [], []];
  for (let t2 = 0; t2 < 256; t2++) {
    let n2 = t2;
    for (let t3 = 0; t3 < 8; t3++) n2 = 1 & n2 ? n2 >>> 1 ^ 3988292384 : n2 >>> 1;
    C[0][t2] = n2;
  }
  for (let t2 = 0; t2 < 256; t2++) for (let n2 = 1; n2 < 8; n2++) {
    const e2 = C[n2 - 1][t2];
    C[n2][t2] = e2 >>> 8 ^ C[0][255 & e2];
  }
  const [I, M, A, E, R, x, P, D] = C;
  class F {
    constructor(t2) {
      this.o = t2 || -1;
    }
    append(t2) {
      let n2 = 0 | this.o;
      const e2 = 0 | t2.length;
      let o2 = 0;
      if (e2 >= 8 && t2.buffer) {
        const r2 = new u(t2.buffer, t2.byteOffset, e2), c2 = e2 - 8;
        for (; o2 <= c2; o2 += 8) {
          const t3 = n2 ^ r2.getInt32(o2, true), e3 = r2.getInt32(o2 + 4, true);
          n2 = D[255 & t3] ^ P[t3 >>> 8 & 255] ^ x[t3 >>> 16 & 255] ^ R[t3 >>> 24 & 255] ^ E[255 & e3] ^ A[e3 >>> 8 & 255] ^ M[e3 >>> 16 & 255] ^ I[e3 >>> 24 & 255];
        }
      }
      for (; o2 < e2; o2++) n2 = n2 >>> 8 ^ I[255 & (n2 ^ t2[o2])];
      this.o = n2;
    }
    get() {
      return ~this.o;
    }
  }
  class U extends h {
    constructor() {
      let t2;
      const n2 = new F();
      super({ transform(t3, e2) {
        n2.append(t3), e2.enqueue(t3);
      }, flush() {
        const e2 = new c(4);
        new u(e2.buffer).setUint32(0, n2.get()), t2.value = e2;
      } }), t2 = this;
    }
  }
  function B(t2, n2) {
    const e2 = new c(t2.length + n2.length);
    return e2.set(t2), e2.set(n2, t2.length), e2;
  }
  function W(t2) {
    return new u(t2.buffer, t2.byteOffset, t2.byteLength);
  }
  const O = 64, V = 20, K = new c([128]), T = new c(1), _ = new i([1732584193, 4023233417, 2562383102, 271733878, 3285377520]), j = new c(256), H = new i(256), L = new i(256), Z = new i(256), N = new i(256);
  let q = false;
  function G(t2, n2) {
    !(function() {
      if (!q) {
        let t3 = 1, n3 = 1;
        do {
          t3 = 255 & (t3 ^ t3 << 1 ^ (128 & t3 ? 27 : 0)), n3 = 255 & (n3 ^ n3 << 1), n3 = 255 & (n3 ^ n3 << 2), n3 = 255 & (n3 ^ n3 << 4), 128 & n3 && (n3 ^= 9), j[t3] = 255 & (n3 ^ (n3 << 1 | n3 >> 7) ^ (n3 << 2 | n3 >> 6) ^ (n3 << 3 | n3 >> 5) ^ (n3 << 4 | n3 >> 4) ^ 99);
        } while (1 != t3);
        j[0] = 99;
        for (let t4 = 0; t4 < 256; t4++) {
          const n4 = j[t4], e3 = Y(n4), o3 = e3 << 24 | n4 << 16 | n4 << 8 | e3 ^ n4;
          H[t4] = o3, L[t4] = o3 >>> 8 | o3 << 24, Z[t4] = o3 >>> 16 | o3 << 16, N[t4] = o3 >>> 24 | o3 << 8;
        }
        q = true;
      }
    })();
    const e2 = new i(60), o2 = (function(t3, n3) {
      const e3 = t3.length >> 2, o3 = e3 + 6, r3 = 4 * (o3 + 1);
      let c3 = 1;
      for (let o4 = 0; o4 < e3; o4++) n3[o4] = t3[4 * o4] << 24 | t3[4 * o4 + 1] << 16 | t3[4 * o4 + 2] << 8 | t3[4 * o4 + 3];
      for (let t4 = e3; t4 < r3; t4++) {
        let o4 = n3[t4 - 1];
        t4 % e3 == 0 ? (o4 = Q(o4 << 8 | o4 >>> 24) ^ c3 << 24, c3 = Y(c3)) : e3 > 6 && t4 % e3 == 4 && (o4 = Q(o4)), n3[t4] = n3[t4 - e3] ^ o4;
      }
      return o3;
    })(t2, e2), r2 = new i(4), c2 = J(n2);
    let s2 = 0, a2 = 0, f2 = 0, w2 = 0;
    return { process(t3, n3) {
      n3 && c2.update(t3, 0, t3.length), (function(t4) {
        const n4 = new u(t4.buffer, t4.byteOffset, t4.byteLength), e3 = t4.length;
        let o3 = 0;
        for (; o3 + 16 <= e3; o3 += 16) l2(), n4.setInt32(o3, n4.getInt32(o3) ^ r2[0]), n4.setInt32(o3 + 4, n4.getInt32(o3 + 4) ^ r2[1]), n4.setInt32(o3 + 8, n4.getInt32(o3 + 8) ^ r2[2]), n4.setInt32(o3 + 12, n4.getInt32(o3 + 12) ^ r2[3]);
        if (o3 < e3) {
          l2();
          for (let n5 = 0; o3 < e3; o3++, n5++) t4[o3] ^= r2[n5 >> 2] >>> 24 - 8 * (3 & n5);
        }
      })(t3), n3 || c2.update(t3, 0, t3.length);
    }, digest: () => c2.digest() };
    function l2() {
      s2 = s2 + 1 | 0, s2 || (a2 = a2 + 1 | 0, a2 || (f2 = f2 + 1 | 0, f2 || (w2 = w2 + 1 | 0)));
      let t3 = X(s2) ^ e2[0], n3 = X(a2) ^ e2[1], c3 = X(f2) ^ e2[2], i2 = X(w2) ^ e2[3], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[4], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[5], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[6], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[7];
      t3 = H[u2 >>> 24] ^ L[l3 >>> 16 & 255] ^ Z[d2 >>> 8 & 255] ^ N[255 & p2] ^ e2[8], n3 = H[l3 >>> 24] ^ L[d2 >>> 16 & 255] ^ Z[p2 >>> 8 & 255] ^ N[255 & u2] ^ e2[9], c3 = H[d2 >>> 24] ^ L[p2 >>> 16 & 255] ^ Z[u2 >>> 8 & 255] ^ N[255 & l3] ^ e2[10], i2 = H[p2 >>> 24] ^ L[u2 >>> 16 & 255] ^ Z[l3 >>> 8 & 255] ^ N[255 & d2] ^ e2[11], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[12], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[13], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[14], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[15], t3 = H[u2 >>> 24] ^ L[l3 >>> 16 & 255] ^ Z[d2 >>> 8 & 255] ^ N[255 & p2] ^ e2[16], n3 = H[l3 >>> 24] ^ L[d2 >>> 16 & 255] ^ Z[p2 >>> 8 & 255] ^ N[255 & u2] ^ e2[17], c3 = H[d2 >>> 24] ^ L[p2 >>> 16 & 255] ^ Z[u2 >>> 8 & 255] ^ N[255 & l3] ^ e2[18], i2 = H[p2 >>> 24] ^ L[u2 >>> 16 & 255] ^ Z[l3 >>> 8 & 255] ^ N[255 & d2] ^ e2[19], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[20], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[21], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[22], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[23], t3 = H[u2 >>> 24] ^ L[l3 >>> 16 & 255] ^ Z[d2 >>> 8 & 255] ^ N[255 & p2] ^ e2[24], n3 = H[l3 >>> 24] ^ L[d2 >>> 16 & 255] ^ Z[p2 >>> 8 & 255] ^ N[255 & u2] ^ e2[25], c3 = H[d2 >>> 24] ^ L[p2 >>> 16 & 255] ^ Z[u2 >>> 8 & 255] ^ N[255 & l3] ^ e2[26], i2 = H[p2 >>> 24] ^ L[u2 >>> 16 & 255] ^ Z[l3 >>> 8 & 255] ^ N[255 & d2] ^ e2[27], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[28], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[29], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[30], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[31], t3 = H[u2 >>> 24] ^ L[l3 >>> 16 & 255] ^ Z[d2 >>> 8 & 255] ^ N[255 & p2] ^ e2[32], n3 = H[l3 >>> 24] ^ L[d2 >>> 16 & 255] ^ Z[p2 >>> 8 & 255] ^ N[255 & u2] ^ e2[33], c3 = H[d2 >>> 24] ^ L[p2 >>> 16 & 255] ^ Z[u2 >>> 8 & 255] ^ N[255 & l3] ^ e2[34], i2 = H[p2 >>> 24] ^ L[u2 >>> 16 & 255] ^ Z[l3 >>> 8 & 255] ^ N[255 & d2] ^ e2[35], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[36], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[37], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[38], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[39];
      let h2 = 40;
      o2 > 10 && (t3 = H[u2 >>> 24] ^ L[l3 >>> 16 & 255] ^ Z[d2 >>> 8 & 255] ^ N[255 & p2] ^ e2[40], n3 = H[l3 >>> 24] ^ L[d2 >>> 16 & 255] ^ Z[p2 >>> 8 & 255] ^ N[255 & u2] ^ e2[41], c3 = H[d2 >>> 24] ^ L[p2 >>> 16 & 255] ^ Z[u2 >>> 8 & 255] ^ N[255 & l3] ^ e2[42], i2 = H[p2 >>> 24] ^ L[u2 >>> 16 & 255] ^ Z[l3 >>> 8 & 255] ^ N[255 & d2] ^ e2[43], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[44], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[45], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[46], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[47], h2 = 48), o2 > 12 && (t3 = H[u2 >>> 24] ^ L[l3 >>> 16 & 255] ^ Z[d2 >>> 8 & 255] ^ N[255 & p2] ^ e2[48], n3 = H[l3 >>> 24] ^ L[d2 >>> 16 & 255] ^ Z[p2 >>> 8 & 255] ^ N[255 & u2] ^ e2[49], c3 = H[d2 >>> 24] ^ L[p2 >>> 16 & 255] ^ Z[u2 >>> 8 & 255] ^ N[255 & l3] ^ e2[50], i2 = H[p2 >>> 24] ^ L[u2 >>> 16 & 255] ^ Z[l3 >>> 8 & 255] ^ N[255 & d2] ^ e2[51], u2 = H[t3 >>> 24] ^ L[n3 >>> 16 & 255] ^ Z[c3 >>> 8 & 255] ^ N[255 & i2] ^ e2[52], l3 = H[n3 >>> 24] ^ L[c3 >>> 16 & 255] ^ Z[i2 >>> 8 & 255] ^ N[255 & t3] ^ e2[53], d2 = H[c3 >>> 24] ^ L[i2 >>> 16 & 255] ^ Z[t3 >>> 8 & 255] ^ N[255 & n3] ^ e2[54], p2 = H[i2 >>> 24] ^ L[t3 >>> 16 & 255] ^ Z[n3 >>> 8 & 255] ^ N[255 & c3] ^ e2[55], h2 = 56), r2[0] = (j[u2 >>> 24] << 24 | j[l3 >>> 16 & 255] << 16 | j[d2 >>> 8 & 255] << 8 | j[255 & p2]) ^ e2[h2], r2[1] = (j[l3 >>> 24] << 24 | j[d2 >>> 16 & 255] << 16 | j[p2 >>> 8 & 255] << 8 | j[255 & u2]) ^ e2[h2 + 1], r2[2] = (j[d2 >>> 24] << 24 | j[p2 >>> 16 & 255] << 16 | j[u2 >>> 8 & 255] << 8 | j[255 & l3]) ^ e2[h2 + 2], r2[3] = (j[p2 >>> 24] << 24 | j[u2 >>> 16 & 255] << 16 | j[l3 >>> 8 & 255] << 8 | j[255 & d2]) ^ e2[h2 + 3];
    }
  }
  function J(t2) {
    const n2 = (function() {
      const t3 = new i(_), n3 = new i(16), e3 = new c(O), r3 = new u(e3.buffer), s2 = new c(8);
      let a2 = 0, f2 = 0;
      return { update: w2, digest: function() {
        const n4 = 8 * f2, e4 = o.floor(n4 / 4294967296), r4 = n4 >>> 0;
        for (w2(K, 0, 1); 56 != a2; ) w2(T, 0, 1);
        s2[0] = e4 >>> 24, s2[1] = e4 >>> 16, s2[2] = e4 >>> 8, s2[3] = e4, s2[4] = r4 >>> 24, s2[5] = r4 >>> 16, s2[6] = r4 >>> 8, s2[7] = r4, w2(s2, 0, 8);
        const i2 = new c(V), l3 = new u(i2.buffer);
        for (let n5 = 0; n5 < t3.length; n5++) l3.setInt32(4 * n5, t3[n5]);
        return t3.set(_), a2 = 0, f2 = 0, i2;
      } };
      function w2(t4, n4, o2) {
        const c2 = n4 + o2;
        if (f2 += o2, a2) {
          for (; n4 < c2 && a2 < O; ) e3[a2++] = t4[n4++];
          a2 == O && (l2(r3, 0), a2 = 0);
        }
        if (n4 + O <= c2) {
          const e4 = new u(t4.buffer, t4.byteOffset, t4.byteLength);
          for (; n4 + O <= c2; n4 += O) l2(e4, n4);
        }
        for (; n4 < c2; ) e3[a2++] = t4[n4++];
      }
      function l2(e4, o2) {
        for (let t4 = 0; t4 < 16; t4++) n3[t4] = e4.getInt32(o2 + 4 * t4);
        let r4, c2 = t3[0], s3 = t3[1], a3 = t3[2], i2 = t3[3], f3 = t3[4];
        for (let t4 = 0; t4 < 15; t4 += 5) f3 = (c2 << 5 | c2 >>> 27) + ((a3 ^ i2) & s3 ^ i2) + f3 + 1518500249 + n3[t4] | 0, s3 = s3 << 30 | s3 >>> 2, i2 = (f3 << 5 | f3 >>> 27) + ((s3 ^ a3) & c2 ^ a3) + i2 + 1518500249 + n3[t4 + 1] | 0, c2 = c2 << 30 | c2 >>> 2, a3 = (i2 << 5 | i2 >>> 27) + ((c2 ^ s3) & f3 ^ s3) + a3 + 1518500249 + n3[t4 + 2] | 0, f3 = f3 << 30 | f3 >>> 2, s3 = (a3 << 5 | a3 >>> 27) + ((f3 ^ c2) & i2 ^ c2) + s3 + 1518500249 + n3[t4 + 3] | 0, i2 = i2 << 30 | i2 >>> 2, c2 = (s3 << 5 | s3 >>> 27) + ((i2 ^ f3) & a3 ^ f3) + c2 + 1518500249 + n3[t4 + 4] | 0, a3 = a3 << 30 | a3 >>> 2;
        f3 = (c2 << 5 | c2 >>> 27) + ((a3 ^ i2) & s3 ^ i2) + f3 + 1518500249 + n3[15] | 0, s3 = s3 << 30 | s3 >>> 2, r4 = n3[13] ^ n3[8] ^ n3[2] ^ n3[0], r4 = r4 << 1 | r4 >>> 31, n3[0] = r4, i2 = (f3 << 5 | f3 >>> 27) + ((s3 ^ a3) & c2 ^ a3) + i2 + 1518500249 + r4 | 0, c2 = c2 << 30 | c2 >>> 2, r4 = n3[14] ^ n3[9] ^ n3[3] ^ n3[1], r4 = r4 << 1 | r4 >>> 31, n3[1] = r4, a3 = (i2 << 5 | i2 >>> 27) + ((c2 ^ s3) & f3 ^ s3) + a3 + 1518500249 + r4 | 0, f3 = f3 << 30 | f3 >>> 2, r4 = n3[15] ^ n3[10] ^ n3[4] ^ n3[2], r4 = r4 << 1 | r4 >>> 31, n3[2] = r4, s3 = (a3 << 5 | a3 >>> 27) + ((f3 ^ c2) & i2 ^ c2) + s3 + 1518500249 + r4 | 0, i2 = i2 << 30 | i2 >>> 2, r4 = n3[0] ^ n3[11] ^ n3[5] ^ n3[3], r4 = r4 << 1 | r4 >>> 31, n3[3] = r4, c2 = (s3 << 5 | s3 >>> 27) + ((i2 ^ f3) & a3 ^ f3) + c2 + 1518500249 + r4 | 0, a3 = a3 << 30 | a3 >>> 2;
        for (let t4 = 20; t4 < 40; t4 += 5) r4 = n3[t4 - 3 & 15] ^ n3[t4 - 8 & 15] ^ n3[t4 - 14 & 15] ^ n3[15 & t4], r4 = r4 << 1 | r4 >>> 31, n3[15 & t4] = r4, f3 = (c2 << 5 | c2 >>> 27) + (s3 ^ a3 ^ i2) + f3 + 1859775393 + r4 | 0, s3 = s3 << 30 | s3 >>> 2, r4 = n3[t4 - 2 & 15] ^ n3[t4 - 7 & 15] ^ n3[t4 - 13 & 15] ^ n3[t4 + 1 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 1 & 15] = r4, i2 = (f3 << 5 | f3 >>> 27) + (c2 ^ s3 ^ a3) + i2 + 1859775393 + r4 | 0, c2 = c2 << 30 | c2 >>> 2, r4 = n3[t4 - 1 & 15] ^ n3[t4 - 6 & 15] ^ n3[t4 - 12 & 15] ^ n3[t4 + 2 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 2 & 15] = r4, a3 = (i2 << 5 | i2 >>> 27) + (f3 ^ c2 ^ s3) + a3 + 1859775393 + r4 | 0, f3 = f3 << 30 | f3 >>> 2, r4 = n3[15 & t4] ^ n3[t4 - 5 & 15] ^ n3[t4 - 11 & 15] ^ n3[t4 + 3 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 3 & 15] = r4, s3 = (a3 << 5 | a3 >>> 27) + (i2 ^ f3 ^ c2) + s3 + 1859775393 + r4 | 0, i2 = i2 << 30 | i2 >>> 2, r4 = n3[t4 + 1 & 15] ^ n3[t4 - 4 & 15] ^ n3[t4 - 10 & 15] ^ n3[t4 + 4 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 4 & 15] = r4, c2 = (s3 << 5 | s3 >>> 27) + (a3 ^ i2 ^ f3) + c2 + 1859775393 + r4 | 0, a3 = a3 << 30 | a3 >>> 2;
        for (let t4 = 40; t4 < 60; t4 += 5) r4 = n3[t4 - 3 & 15] ^ n3[t4 - 8 & 15] ^ n3[t4 - 14 & 15] ^ n3[15 & t4], r4 = r4 << 1 | r4 >>> 31, n3[15 & t4] = r4, f3 = (c2 << 5 | c2 >>> 27) + (s3 & a3 | (s3 | a3) & i2) + f3 + 2400959708 + r4 | 0, s3 = s3 << 30 | s3 >>> 2, r4 = n3[t4 - 2 & 15] ^ n3[t4 - 7 & 15] ^ n3[t4 - 13 & 15] ^ n3[t4 + 1 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 1 & 15] = r4, i2 = (f3 << 5 | f3 >>> 27) + (c2 & s3 | (c2 | s3) & a3) + i2 + 2400959708 + r4 | 0, c2 = c2 << 30 | c2 >>> 2, r4 = n3[t4 - 1 & 15] ^ n3[t4 - 6 & 15] ^ n3[t4 - 12 & 15] ^ n3[t4 + 2 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 2 & 15] = r4, a3 = (i2 << 5 | i2 >>> 27) + (f3 & c2 | (f3 | c2) & s3) + a3 + 2400959708 + r4 | 0, f3 = f3 << 30 | f3 >>> 2, r4 = n3[15 & t4] ^ n3[t4 - 5 & 15] ^ n3[t4 - 11 & 15] ^ n3[t4 + 3 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 3 & 15] = r4, s3 = (a3 << 5 | a3 >>> 27) + (i2 & f3 | (i2 | f3) & c2) + s3 + 2400959708 + r4 | 0, i2 = i2 << 30 | i2 >>> 2, r4 = n3[t4 + 1 & 15] ^ n3[t4 - 4 & 15] ^ n3[t4 - 10 & 15] ^ n3[t4 + 4 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 4 & 15] = r4, c2 = (s3 << 5 | s3 >>> 27) + (a3 & i2 | (a3 | i2) & f3) + c2 + 2400959708 + r4 | 0, a3 = a3 << 30 | a3 >>> 2;
        for (let t4 = 60; t4 < 80; t4 += 5) r4 = n3[t4 - 3 & 15] ^ n3[t4 - 8 & 15] ^ n3[t4 - 14 & 15] ^ n3[15 & t4], r4 = r4 << 1 | r4 >>> 31, n3[15 & t4] = r4, f3 = (c2 << 5 | c2 >>> 27) + (s3 ^ a3 ^ i2) + f3 + 3395469782 + r4 | 0, s3 = s3 << 30 | s3 >>> 2, r4 = n3[t4 - 2 & 15] ^ n3[t4 - 7 & 15] ^ n3[t4 - 13 & 15] ^ n3[t4 + 1 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 1 & 15] = r4, i2 = (f3 << 5 | f3 >>> 27) + (c2 ^ s3 ^ a3) + i2 + 3395469782 + r4 | 0, c2 = c2 << 30 | c2 >>> 2, r4 = n3[t4 - 1 & 15] ^ n3[t4 - 6 & 15] ^ n3[t4 - 12 & 15] ^ n3[t4 + 2 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 2 & 15] = r4, a3 = (i2 << 5 | i2 >>> 27) + (f3 ^ c2 ^ s3) + a3 + 3395469782 + r4 | 0, f3 = f3 << 30 | f3 >>> 2, r4 = n3[15 & t4] ^ n3[t4 - 5 & 15] ^ n3[t4 - 11 & 15] ^ n3[t4 + 3 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 3 & 15] = r4, s3 = (a3 << 5 | a3 >>> 27) + (i2 ^ f3 ^ c2) + s3 + 3395469782 + r4 | 0, i2 = i2 << 30 | i2 >>> 2, r4 = n3[t4 + 1 & 15] ^ n3[t4 - 4 & 15] ^ n3[t4 - 10 & 15] ^ n3[t4 + 4 & 15], r4 = r4 << 1 | r4 >>> 31, n3[t4 + 4 & 15] = r4, c2 = (s3 << 5 | s3 >>> 27) + (a3 ^ i2 ^ f3) + c2 + 3395469782 + r4 | 0, a3 = a3 << 30 | a3 >>> 2;
        t3[0] = t3[0] + c2 | 0, t3[1] = t3[1] + s3 | 0, t3[2] = t3[2] + a3 | 0, t3[3] = t3[3] + i2 | 0, t3[4] = t3[4] + f3 | 0;
      }
    })(), e2 = new c(O), r2 = new c(O);
    t2.length > O && (n2.update(t2, 0, t2.length), t2 = n2.digest());
    for (let n3 = 0; n3 < O; n3++) {
      const o2 = n3 < t2.length ? t2[n3] : 0;
      e2[n3] = 54 ^ o2, r2[n3] = 92 ^ o2;
    }
    return n2.update(e2, 0, O), { update(t3, e3, o2) {
      n2.update(t3, e3, o2);
    }, digest() {
      const t3 = n2.digest();
      n2.update(r2, 0, O), n2.update(t3, 0, V);
      const o2 = n2.digest();
      return n2.update(e2, 0, O), o2;
    } };
  }
  function Q(t2) {
    return j[t2 >>> 24] << 24 | j[t2 >>> 16 & 255] << 16 | j[t2 >>> 8 & 255] << 8 | j[255 & t2];
  }
  function X(t2) {
    return t2 << 24 | (65280 & t2) << 8 | t2 >>> 8 & 65280 | t2 >>> 24;
  }
  function Y(t2) {
    return 255 & (t2 << 1 ^ 27 * (t2 >> 7));
  }
  const $ = typeof d != b && typeof d.getRandomValues == k, tt = "Invalid password", nt = "zipjs-abort-check-password";
  function et(t2) {
    if ($) return d.getRandomValues(t2);
    throw new r("Crypto API not supported");
  }
  const ot = { name: "PBKDF2" }, rt = n.assign({ hash: { name: "HMAC" } }, ot), ct = n.assign({ iterations: 1e3, hash: { name: "SHA-1" } }, ot), st = ["deriveBits"], at = [8, 12, 16], it = [16, 24, 32], ft = 10, ut = typeof d != b, wt = ut && d.subtle;
  let lt = ut && typeof wt != b && typeof wt.importKey == k && typeof wt.deriveBits == k, dt = G;
  class pt extends h {
    constructor({ password: t2, rawPassword: n2, encryptionStrength: e2, checkPasswordOnly: o2, checkAuthenticationCode: s2 = true }) {
      const a2 = {};
      super({ start() {
        yt(a2, t2, n2, e2);
      }, async transform(t3, n3) {
        const { password: e3, strength: s3, l: i2, ready: f2 } = a2;
        if (e3 ? (await (async function(t4, n4, e4, o3) {
          const c2 = await vt(t4, n4, e4, kt(o3, 0, at[n4])), s4 = kt(o3, at[n4]);
          if (c2[0] != s4[0] || c2[1] != s4[1]) throw gt(t4), new r(tt);
        })(a2, s3, e3, kt(t3, 0, at[s3] + 2)), t3 = kt(t3, at[s3] + 2), o2 ? (gt(a2), n3.error(new r(nt))) : i2()) : await f2, a2.h) return;
        const u2 = new c(t3.length - ft - (t3.length - ft) % 16);
        n3.enqueue(St(a2, t3, u2, 0, ft, true));
      }, async flush(t3) {
        const { m: n3, S: e3, ready: o3 } = a2;
        if (n3) {
          if (await o3, a2.h) return;
          const i2 = kt(e3, e3.length - ft), f2 = new c(kt(e3, 0, e3.length - ft));
          n3.process(f2, true);
          const u2 = n3.digest();
          let w2 = e3.length < ft ? 1 : 0;
          for (let t4 = 0; t4 < ft; t4++) w2 |= u2[t4] ^ i2[t4];
          if (w2 && s2) return void t3.error(new r("Invalid authentication code"));
          t3.enqueue(f2);
        }
      } }), mt(this, a2);
    }
  }
  class ht extends h {
    constructor({ password: t2, rawPassword: n2, encryptionStrength: e2 }) {
      const o2 = {};
      super({ start() {
        yt(o2, t2, n2, e2);
      }, async transform(t3, n3) {
        const { password: e3, strength: r2, l: s2, ready: a2 } = o2;
        let i2 = z;
        if (e3 ? (i2 = await (async function(t4, n4, e4) {
          const o3 = et(new c(at[n4]));
          return B(o3, await vt(t4, n4, e4, o3));
        })(o2, r2, e3), s2()) : await a2, o2.h) return;
        const f2 = new c(i2.length + t3.length - t3.length % 16);
        f2.set(i2, 0), n3.enqueue(St(o2, t3, f2, i2.length, 0, false));
      }, async flush(t3) {
        const { m: n3, S: e3, ready: r2 } = o2;
        if (n3) {
          if (await r2, o2.h) return;
          const s2 = new c(e3);
          n3.process(s2, false);
          const a2 = kt(n3.digest(), 0, ft);
          t3.enqueue(B(s2, a2));
        }
      } }), mt(this, o2);
    }
  }
  function yt(t2, e2, o2, r2) {
    n.assign(t2, { ready: new w((n2) => t2.l = n2), password: bt(e2, o2), strength: r2 - 1, S: z, h: false });
  }
  function mt(t2, e2) {
    const o2 = t2.readable.getReader(), r2 = new y({ async pull(t3) {
      try {
        const { value: n2, done: e3 } = await o2.read();
        e3 ? t3.close() : t3.enqueue(n2);
      } catch (t4) {
        throw gt(e2), o2.cancel(t4).catch(() => {
        }), t4;
      }
    }, cancel: (t3) => (gt(e2), o2.cancel(t3)) });
    n.defineProperty(t2, "readable", { get: () => r2 });
  }
  function St(t2, n2, e2, o2, r2, s2) {
    const { m: a2, S: i2 } = t2;
    i2.length && (n2 = B(i2, n2));
    const f2 = n2.length - r2, u2 = f2 - f2 % 16;
    if (e2 = (function(t3, n3) {
      if (n3 && n3 > t3.length) {
        const e3 = t3;
        (t3 = new c(n3)).set(e3, 0);
      }
      return t3;
    })(e2, o2 + u2), u2) {
      const t3 = kt(e2, o2, o2 + u2);
      t3.set(kt(n2, 0, u2)), a2.process(t3, s2);
    }
    return t2.S = kt(n2, u2), e2;
  }
  function gt(t2) {
    const { m: n2 } = t2;
    t2.h = true, n2 && n2.dispose && n2.dispose();
  }
  async function vt(t2, e2, r2, s2) {
    t2.password = null;
    const a2 = it[e2], i2 = await (async function(t3, e3, r3) {
      if (lt) try {
        const o2 = await wt.importKey("raw", t3, rt, false, st);
        return new c(await wt.deriveBits(n.assign({ salt: e3 }, ct), o2, 8 * r3));
      } catch {
        lt = false;
      }
      return (function(t4, n2, e4, r4) {
        const s3 = J(t4), a3 = new c(r4), i3 = new c(n2.length + 4), f2 = new u(i3.buffer);
        i3.set(n2);
        for (let t5 = 1, e5 = 0; e5 < r4; t5++, e5 += V) {
          f2.setUint32(n2.length, t5), s3.update(i3, 0, i3.length);
          let c2 = s3.digest();
          const u2 = c2.slice();
          for (let t6 = 1; t6 < 1e3; t6++) {
            s3.update(c2, 0, V), c2 = s3.digest();
            for (let t7 = 0; t7 < V; t7++) u2[t7] ^= c2[t7];
          }
          a3.set(u2.subarray(0, o.min(V, r4 - e5)), e5);
        }
        return a3;
      })(t3, e3, 0, r3);
    })(r2, s2, 2 * a2 + 2);
    return t2.m = dt(kt(i2, 0, a2), kt(i2, a2, 2 * a2)), t2.h && gt(t2), kt(i2, 2 * a2);
  }
  function bt(t2, n2) {
    return n2 === v ? (function(t3) {
      if (typeof l == b) {
        t3 = unescape(encodeURIComponent(t3));
        const n3 = new c(t3.length);
        for (let e2 = 0; e2 < n3.length; e2++) n3[e2] = t3.charCodeAt(e2);
        return n3;
      }
      return new l().encode(t3);
    })(t2) : n2;
  }
  function kt(t2, n2, e2) {
    return t2.subarray(n2, e2);
  }
  class zt extends h {
    constructor({ password: t2, rawPassword: n2, passwordVerification: e2, checkPasswordOnly: o2 }) {
      super({ start() {
        It(this, t2, n2, e2);
      }, transform(t3, n3) {
        const e3 = this;
        if (e3.password || e3.rawPassword) {
          const n4 = Mt(e3, t3.subarray(0, 12));
          if (e3.password = e3.rawPassword = null, 0 != (n4[11] ^ e3.passwordVerification)) throw new r(tt);
          t3 = t3.subarray(12);
        }
        o2 ? n3.error(new r(nt)) : n3.enqueue(Mt(e3, t3));
      } });
    }
  }
  class Ct extends h {
    constructor({ password: t2, rawPassword: n2, passwordVerification: e2 }) {
      super({ start() {
        It(this, t2, n2, e2);
      }, transform(t3, n3) {
        const e3 = this;
        let o2, r2;
        if (e3.password || e3.rawPassword) {
          e3.password = e3.rawPassword = null;
          const n4 = et(new c(12));
          n4[11] = e3.passwordVerification, o2 = new c(t3.length + n4.length), o2.set(At(e3, n4), 0), r2 = 12;
        } else o2 = new c(t3.length), r2 = 0;
        o2.set(At(e3, t3), r2), n3.enqueue(o2);
      } });
    }
  }
  function It(t2, e2, o2, r2) {
    n.assign(t2, { password: e2, rawPassword: o2, passwordVerification: r2 }), (function(t3, e3, o3) {
      const r3 = [305419896, 591751049, 878082192];
      if (n.assign(t3, { v: r3, C: new F(r3[0]), I: new F(r3[2]) }), o3) for (let n2 = 0; n2 < o3.length; n2++) Et(t3, o3[n2]);
      else for (let n2 = 0; n2 < e3.length; n2++) Et(t3, e3.charCodeAt(n2));
    })(t2, e2, o2);
  }
  function Mt(t2, n2) {
    const e2 = new c(n2.length);
    for (let o2 = 0; o2 < n2.length; o2++) e2[o2] = Rt(t2) ^ n2[o2], Et(t2, e2[o2]);
    return e2;
  }
  function At(t2, n2) {
    const e2 = new c(n2.length);
    for (let o2 = 0; o2 < n2.length; o2++) e2[o2] = Rt(t2) ^ n2[o2], Et(t2, n2[o2]);
    return e2;
  }
  function Et(t2, n2) {
    let [, e2] = t2.v;
    t2.C.append([n2]);
    const r2 = ~t2.C.get();
    e2 = Pt(o.imul(Pt(e2 + xt(r2)), 134775813) + 1), t2.I.append([e2 >>> 24]);
    const c2 = ~t2.I.get();
    t2.v = [r2, e2, c2];
  }
  function Rt(t2) {
    const n2 = 2 | t2.v[2];
    return xt(o.imul(n2, 1 ^ n2) >>> 8);
  }
  function xt(t2) {
    return 255 & t2;
  }
  function Pt(t2) {
    return 4294967295 & t2;
  }
  function Dt(t2) {
    return Boolean(t2) && "object" == typeof t2;
  }
  const Ft = new f();
  function Ut(t2) {
    return Ft.get(t2);
  }
  const Bt = "Invalid uncompressed size", Wt = "Codec out of memory", Ot = "Invalid CRC32", Vt = "deflate-raw", Kt = "gzip", Tt = [31, 139, 8];
  class _t extends h {
    constructor(t2, { chunkSize: n2, CompressionStreamFallback: e2, CompressionStream: o2 }) {
      super({});
      const { compressed: r2, encrypted: c2, useCompressionStream: s2, zipCrypto: a2, computeCrc32: i2, level: f2, deflate64: w2, format: l2, compressionMethod: d2, inputSize: p2 } = t2, h2 = this;
      let y2, m2, S2, g2 = super.readable;
      const v2 = l2 && Ut(l2), b2 = qt(s2, o2, e2), k2 = i2 && r2 && !w2 && !v2 && (!c2 || a2) && Boolean(b2);
      if (c2 && !a2 || !i2 || k2 || (y2 = new U(), g2 = Jt(g2, y2)), r2) if (v2) g2 = Qt(g2, Nt(v2.CompressionStream, l2, { level: f2, chunkSize: n2, compressionMethod: d2, uncompressedSize: p2 }));
      else if (k2) S2 = new jt(), g2 = Qt(g2, new b2(Kt, { level: f2, chunkSize: n2 })), g2 = Jt(g2, S2);
      else try {
        g2 = Gt(g2, s2, { level: f2, chunkSize: n2 }, o2, e2);
      } catch (t3) {
        if (!s2 && e2) throw nn(t3);
        let n3;
        try {
          n3 = new o2(Kt);
        } catch {
          throw nn(t3);
        }
        g2 = Qt(g2, n3), g2 = Jt(g2, new jt());
      }
      c2 && (a2 ? g2 = Jt(g2, new Ct(t2)) : (m2 = new ht(t2), g2 = Jt(g2, m2))), Zt(h2, g2, () => {
        c2 && !a2 || !i2 || (h2.crc32 = k2 ? S2.crc32 : new u(y2.value.buffer).getUint32(0));
      });
    }
  }
  class jt extends h {
    constructor() {
      let t2, n2 = 10, e2 = new c(0);
      super({ transform(t3, r2) {
        if (n2) {
          const e3 = o.min(n2, t3.length);
          if (n2 -= e3, !(t3 = t3.subarray(e3)).length) return;
        }
        const c2 = e2.length + t3.length;
        if (c2 <= 8) return void (e2 = B(e2, t3));
        const s2 = c2 - 8, a2 = o.min(s2, e2.length);
        r2.enqueue(B(e2.subarray(0, a2), t3.subarray(0, s2 - a2))), e2 = B(e2.subarray(a2), t3.subarray(s2 - a2));
      }, flush() {
        const n3 = W(e2);
        t2.crc32 = n3.getUint32(0, true), t2.uncompressedSize = n3.getUint32(4, true);
      } }), t2 = this;
    }
  }
  class Ht extends h {
    constructor(t2, { chunkSize: n2, DecompressionStreamFallback: e2, DecompressionStream: o2 }) {
      super({});
      const { zipCrypto: s2, encrypted: a2, checkCrc32: i2, crc32: f2, compressed: l2, useCompressionStream: d2, deflate64: p2, format: h2, compressionMethod: m2, rawBitFlag: S2, outputSize: g2 } = t2;
      let b2, k2, z2, C2 = super.readable;
      if (a2 && (s2 ? C2 = Jt(C2, new zt(t2)) : (k2 = new pt(t2), C2 = Jt(C2, k2))), l2) {
        const t3 = /* @__PURE__ */ new Set(), s3 = h2 && Ut(h2);
        let a3;
        if (s3) C2 = Qt(C2, Nt(s3.DecompressionStream, h2, { chunkSize: n2, compressionMethod: m2, rawBitFlag: S2, uncompressedSize: g2 }), t3);
        else {
          const r2 = qt(d2, o2, e2);
          if (i2 && !p2 && f2 !== v && g2 !== v && r2) try {
            a3 = new r2(Kt, { chunkSize: n2 });
          } catch {
            a3 = v;
          }
          if (!a3) try {
            C2 = Gt(C2, d2, { chunkSize: n2, deflate64: p2 }, o2, e2, t3);
          } catch (t4) {
            if (p2 || g2 === v || !d2 && e2) throw nn(t4);
            try {
              a3 = new o2(Kt);
            } catch {
              throw nn(t4);
            }
          }
        }
        a3 ? (z2 = true, C2 = (function(t4, n3, e3, o3, s4) {
          const a4 = n3.writable.getWriter(), i3 = n3.readable.getReader(), f3 = o3 === v ? new F() : v;
          let u2, l3, d3 = 0, p3 = false, h3 = false;
          const m3 = new y({ start(t5) {
            l3 = t5;
          }, pull() {
            b3();
          }, cancel: (t5) => (h3 = true, b3(), i3.cancel(t5)) });
          return (async function() {
            const n4 = t4.getReader();
            try {
              const t5 = new c(10);
              for (t5.set(Tt), await a4.write(t5); ; ) {
                await g3(), await a4.ready;
                const { value: t6, done: e4 } = await $t(n4, s4);
                if (e4) break;
                await a4.write(t6);
              }
              f3 && await a4.write(new c(0));
              const r2 = new c(8), i4 = W(r2);
              i4.setUint32(0, f3 ? f3.get() : o3, true), i4.setUint32(4, e3, true), p3 = true, await a4.write(r2), await a4.close();
            } catch (t5) {
              await Xt(a4, t5), await Yt(n4, t5);
            }
          })(), (async function() {
            try {
              for (; ; ) {
                const { value: t5, done: n4 } = await S3();
                if (n4) break;
                if (d3 += t5.length, d3 > e3) throw new r(Bt);
                f3 && f3.append(t5), l3.enqueue(t5);
              }
              h3 || (h3 = true, l3.close());
            } catch (t5) {
              !(function(t6) {
                h3 || (h3 = true, l3.error(t6), b3());
              })(t5), await Yt(i3, t5);
            }
          })(), m3;
          function S3() {
            return i3.read().catch((t5) => {
              if (p3) {
                if (!f3) throw on(t5, Ot);
                if (d3 != e3) throw on(t5, Bt);
                return { done: true };
              }
              throw tn(t5, s4);
            });
          }
          function g3() {
            if (!h3 && l3.desiredSize <= 0) return new w((t5) => u2 = t5);
          }
          function b3() {
            if (u2) {
              const t5 = u2;
              u2 = v, t5();
            }
          }
        })(C2, a3, g2, f2, t3)) : C2 = (function(t4, n3) {
          const e3 = t4.getReader();
          return new y({ async pull(t5) {
            try {
              const { value: n4, done: o3 } = await e3.read();
              o3 ? t5.close() : t5.enqueue(n4);
            } catch (t6) {
              throw await Yt(e3, t6), tn(t6, n3);
            }
          }, cancel: (t5) => e3.cancel(t5) });
        })(C2, t3);
      }
      i2 && !z2 && (b2 = new U(), C2 = Jt(C2, b2)), Zt(this, C2, () => {
        if (b2) {
          const t3 = new u(b2.value.buffer).getUint32(0, false);
          if (f2 != t3) throw new r(Ot);
        }
      });
    }
  }
  const Lt = new f();
  function Zt(t2, e2, o2) {
    e2 = Jt(e2, new h({ flush: o2 })), n.defineProperty(t2, "readable", { get: () => e2 });
  }
  function Nt(t2, n2, e2) {
    if (!t2) throw new r("Compression method not supported");
    return new t2(n2, e2);
  }
  function qt(t2, n2, e2) {
    return t2 && n2 ? n2 : e2 && e2.requiresModule ? e2 : void 0;
  }
  function Gt(t2, n2, e2, o2, r2, c2) {
    const s2 = n2 && o2 ? o2 : r2 || o2, a2 = e2.deflate64 ? "deflate64-raw" : Vt;
    let i2;
    try {
      i2 = new s2(a2, e2);
    } catch (t3) {
      if (!n2 || !r2 || s2 == r2) throw t3;
      i2 = new r2(a2, e2);
    }
    return Qt(t2, i2, c2);
  }
  function Jt(t2, n2) {
    return (function(t3) {
      if (t3 instanceof y) return t3;
      const n3 = t3.getReader();
      return new y({ async pull(t4) {
        try {
          const { value: e2, done: o2 } = await n3.read();
          o2 ? t4.close() : t4.enqueue(e2);
        } catch (t5) {
          throw n3.cancel(t5).catch(() => {
          }), t5;
        }
      }, cancel: (t4) => n3.cancel(t4) });
    })(t2).pipeThrough(n2);
  }
  function Qt(t2, n2, e2) {
    const o2 = n2.writable.getWriter(), r2 = t2.getReader();
    return (async function() {
      try {
        for (; ; ) {
          await o2.ready;
          const t3 = await $t(r2, e2);
          if (t3.done) {
            await o2.close();
            break;
          }
          await o2.write(t3.value);
        }
      } catch (t3) {
        await Xt(o2, t3), await Yt(r2, t3);
      }
    })(), n2.readable;
  }
  async function Xt(t2, n2) {
    try {
      await t2.abort(n2);
    } catch {
    }
  }
  async function Yt(t2, n2) {
    try {
      await t2.cancel(n2);
    } catch {
    }
  }
  function $t(t2, n2) {
    const e2 = t2.read();
    return n2 ? e2.catch((t3) => {
      throw n2.add(t3), t3;
    }) : e2;
  }
  function tn(t2, n2) {
    return n2.has(t2) ? t2 : on(t2, en(t2) ? Wt : "Invalid compressed data");
  }
  function nn(t2) {
    return en(t2) ? on(t2, Wt) : t2;
  }
  function en(t2) {
    return Dt(t2) && "Z_MEM_ERROR" == t2.code;
  }
  function on(t2, n2) {
    const e2 = new r(n2);
    return e2.cause = t2, e2;
  }
  const rn = "data", cn = "deflate";
  class sn extends h {
    constructor(t2, e2) {
      super({});
      const o2 = this, { codecType: c2 } = t2;
      let s2;
      c2.startsWith(cn) ? s2 = _t : c2.startsWith("inflate") && (s2 = Ht), o2.outputSize = 0;
      let a2 = 0;
      const i2 = new s2(t2, e2), f2 = super.readable, u2 = new h({ transform(t3, n2) {
        t3 && t3.length && (a2 += t3.length, n2.enqueue(t3));
      }, flush() {
        n.assign(o2, { inputSize: a2 });
      } }), w2 = new h({ transform(n2, e3) {
        if (n2 && n2.length && (e3.enqueue(n2), o2.outputSize += n2.length, t2.outputSize !== v && o2.outputSize > t2.outputSize)) throw new r(Bt);
      }, flush() {
        const { crc32: t3 } = i2;
        n.assign(o2, { crc32: t3, inputSize: a2 });
      } });
      n.defineProperty(o2, "readable", { get: () => f2.pipeThrough(u2).pipeThrough(i2).pipeThrough(w2) });
    }
  }
  class an extends h {
    constructor(t2) {
      const o2 = [];
      let r2 = 0, s2 = 0;
      function a2() {
        const n2 = new c(t2);
        let e2 = 0;
        for (; e2 < t2; ) {
          const r3 = o2[0], c2 = t2 - e2;
          r3.length <= c2 ? (n2.set(r3, e2), e2 += r3.length, o2.shift()) : (n2.set(r3.subarray(0, c2), e2), o2[0] = r3.subarray(c2), e2 += c2);
        }
        return r2 -= t2, n2;
      }
      (!e.isFinite(t2) || t2 < 1) && (t2 = 262144), super({ transform(n2, e2) {
        for (o2.push(n2), r2 += n2.length; r2 > t2; ) s2 += t2, e2.enqueue(a2());
      }, flush(t3) {
        r2 && (s2 += r2, t3.enqueue((function(t4, n2) {
          const e2 = new c(n2);
          let o3 = 0;
          for (const n3 of t4) e2.set(n3, o3), o3 += n3.length;
          return e2;
        })(o2, r2)));
      } }), n.defineProperty(this, "outputSize", { get: () => s2 });
    }
  }
  let fn = 2;
  try {
    typeof navigator != b && navigator.hardwareConcurrency && (fn = navigator.hardwareConcurrency);
  } catch {
  }
  const un = new f(), wn = new f(), ln = (function() {
    try {
      return structuredClone(new r()) instanceof r;
    } catch {
      return false;
    }
  })();
  let dn = 0;
  async function pn(t2) {
    let n2, c2, s2;
    try {
      const { options: a2, config: i2 } = t2;
      if (a2.format) try {
        await (async function(t3, n3) {
          !Ft.has(t3) && n3 && (function(t4, n4) {
            const { CompressionStream: e2, DecompressionStream: o2 } = n4;
            if (typeof e2 != k && typeof o2 != k) throw new r("Invalid codec module");
            Ft.set(t4, { CompressionStream: e2, DecompressionStream: o2 });
          })(t3, await import(
            /* webpackIgnore: true */
            /* @vite-ignore */
            n3
          ));
        })(a2.format, a2.codecURI);
      } catch (t3) {
        if (Dt(t3)) try {
          t3.codecImportFailed = true;
        } catch {
        }
        throw t3;
      }
      if (i2.CompressionStream = self.CompressionStream, i2.DecompressionStream = self.DecompressionStream, a2.compressed && !a2.format) if (a2.useCompressionStream) {
        if (!(function(t3, n3) {
          if (!t3) return false;
          let e2 = Lt.get(t3);
          e2 || (e2 = new f(), Lt.set(t3, e2));
          let o2 = e2.get(n3);
          if (o2 === v) {
            try {
              new t3(n3), o2 = true;
            } catch {
              o2 = false;
            }
            e2.set(n3, o2);
          }
          return o2;
        })(a2.codecType.startsWith(cn) ? i2.CompressionStream : i2.DecompressionStream, Vt)) try {
          await self.initModule(t2.config);
        } catch {
        }
      } else try {
        await self.initModule(t2.config);
      } catch {
        a2.useCompressionStream = true;
      }
      if (a2.encrypted && !a2.zipCrypto) try {
        await self.initModule(t2.config);
      } catch {
      }
      !i2.CompressionStreamFallback && i2.CompressionStreamZlib && (i2.CompressionStreamFallback = i2.CompressionStreamZlib), !i2.DecompressionStreamFallback && i2.DecompressionStreamZlib && (i2.DecompressionStreamFallback = i2.DecompressionStreamZlib);
      const u2 = { highWaterMark: 1 }, l2 = new y({ async pull(t3) {
        const n3 = new w((t4) => un.set(dn, t4));
        hn({ type: "pull", messageId: dn }), dn = (dn + 1) % e.MAX_SAFE_INTEGER;
        const { value: o2, done: r2 } = await n3;
        t3.enqueue(o2), r2 && t3.close();
      } }, u2);
      s2 = new m({ async write(t3) {
        let n3;
        const o2 = new w((t4) => n3 = t4);
        wn.set(dn, n3), hn({ type: rn, value: t3, messageId: dn }), dn = (dn + 1) % e.MAX_SAFE_INTEGER, await o2;
      } }, u2), n2 = new sn(a2, i2), c2 = new an((function(t3) {
        return r2 = "string" == typeof (n3 = r2 = t3.chunkSize) && n3.trim() ? e(n3) : n3, e.isInteger(r2) && r2 >= 1 ? o.max(r2, 64) : 262144;
        var n3, r2;
      })(i2)), await l2.pipeThrough(n2).pipeThrough(c2).pipeTo(s2, { preventClose: true, preventAbort: true }), await s2.getWriter().close();
      const { crc32: d2, inputSize: p2, outputSize: h2 } = n2;
      hn({ type: "close", result: { crc32: d2, inputSize: p2, outputSize: h2 } });
    } catch (t3) {
      const n3 = c2 ? c2.outputSize : 0;
      if (Dt(t3)) try {
        t3.outputSize = n3;
      } catch {
      }
      if (s2 && !s2.locked) try {
        await s2.getWriter().close();
      } catch {
      }
      yn(t3, n3);
    }
  }
  function hn(t2) {
    const { value: n2 } = t2;
    if (n2) if (n2.length) try {
      t2.value = (e2 = n2, e2.byteOffset || e2.byteLength != e2.buffer.byteLength ? new c(e2) : e2).buffer, p(t2, [t2.value]);
    } catch {
      p(t2);
    }
    else p(t2);
    else p(t2);
    var e2;
  }
  function yn(t2, n2) {
    const { message: e2, stack: o2, code: c2, name: s2, outputSize: a2, cause: i2, codecImportFailed: f2 } = (function(t3 = new r("Unknown error")) {
      return Dt(t3) ? t3 : new r(String(t3));
    })(t2), u2 = { message: e2, stack: o2, code: c2, name: s2, outputSize: a2 === v ? n2 : a2 };
    if (Dt(i2) && (u2.cause = { name: i2.name, message: i2.message, code: i2.code }), f2 && (u2.codecImportFailed = true), ln) try {
      return void p({ error: u2, errorValue: { value: t2 } });
    } catch {
    }
    p({ error: u2 });
  }
  addEventListener("message", ({ data: t2 }) => {
    const { type: n2, messageId: e2, value: o2, done: r2 } = t2;
    try {
      if ("start" == n2 && pn(t2), n2 == rn) {
        const t3 = un.get(e2);
        un.delete(e2), t3({ value: o2 || new c(), done: r2 });
      }
      if ("ack" == n2) {
        const t3 = wn.get(e2);
        wn.delete(e2), t3();
      }
    } catch (t3) {
      yn(t3);
    }
  }), p({ type: "ready" });
  const mn = "deflate", Sn = "deflate-raw", gn = "deflate64-raw", vn = "gzip", bn = [mn, Sn, vn], kn = [mn, Sn, vn, gn];
  let zn, Cn, In, Mn, An;
  function En(t2, n2) {
    return -4 === n2 && (t2.code = "Z_MEM_ERROR"), t2;
  }
  function Rn(t2, n2, e2 = {}) {
    if (!(t2 ? bn : kn).includes(n2)) throw new TypeError("Unsupported format: " + n2);
    if (!zn) {
      const t3 = new r("WASM module not loaded");
      throw t3.cause = An, t3;
    }
    const s2 = "number" == typeof e2.level ? e2.level : -1, a2 = "number" == typeof e2.outBuffer ? e2.outBuffer : 65536, i2 = "number" == typeof e2.inBufferSize ? e2.inBufferSize : 65536, f2 = { M: 0, in: 0, inBufferSize: 0, A: 0, R: false };
    let u2, l2, d2, p2, h2 = true, S2 = false;
    return (function() {
      try {
        let e3;
        if (f2.M = Cn(a2), f2.in = Cn(i2), f2.inBufferSize = i2, !f2.M || !f2.in) throw En(new r("allocation failed"), -4);
        if (t2 ? (f2.P = zn.deflate_process, f2.D = zn.deflate_last_consumed, f2.F = zn.deflate_end, f2.A = zn.deflate_new(), e3 = n2 === vn ? zn.deflate_init_gzip(f2.A, s2) : n2 === Sn ? zn.deflate_init_raw(f2.A, s2) : zn.deflate_init(f2.A, s2)) : n2 === gn ? (f2.P = zn.inflate9_process, f2.D = zn.inflate9_last_consumed, f2.F = zn.inflate9_end, f2.A = zn.inflate9_new(), e3 = zn.inflate9_init_raw(f2.A)) : (f2.P = zn.inflate_process, f2.D = zn.inflate_last_consumed, f2.F = zn.inflate_end, f2.A = zn.inflate_new(), e3 = n2 === Sn ? zn.inflate_init_raw(f2.A) : n2 === vn ? zn.inflate_init_gzip(f2.A) : zn.inflate_init(f2.A)), 0 !== e3) throw En(new r("init failed:" + e3), e3);
      } catch (t3) {
        throw b2(f2), t3;
      }
    })(), { readable: new y({ start(t3) {
      u2 = t3;
    }, pull() {
      h2 = false, v2();
    }, cancel(t3) {
      S2 = true, p2 = t3, b2(f2), l2.error(t3), v2();
    } }, { highWaterMark: 0 }), writable: new m({ start(t3) {
      l2 = t3;
    }, async write(t3) {
      if (h2 && await new w((t4) => d2 = t4), S2) throw p2;
      try {
        !(function(t4) {
          const n3 = new c(Mn.buffer), e3 = f2.P, s3 = f2.D, i3 = f2.M;
          let u3 = 0;
          for (; u3 < t4.length; ) {
            if (f2.R) throw new r("trailing data after the end of the stream");
            const c2 = o.min(t4.length - u3, 32768);
            if ((!f2.in || f2.inBufferSize < c2) && (f2.in && In && (In(f2.in), f2.in = 0), f2.in = Cn(c2), f2.inBufferSize = c2, !f2.in)) throw En(new r("allocation failed"), -4);
            n3.set(t4.subarray(u3, u3 + c2), f2.in);
            const w2 = e3(f2.A, f2.in, c2, i3, a2, 0), l3 = w2 >> 24 & 255, d3 = 128 & l3 ? l3 - 256 : l3;
            if (d3 < 0) throw En(new r("process error:" + d3), d3);
            const p3 = 16777215 & w2;
            p3 && g2(n3.slice(i3, i3 + p3));
            const h3 = s3(f2.A);
            if (1 === l3) f2.R = true;
            else if (0 === h3 && 0 === p3) break;
            u3 += h3;
          }
        })(t3);
      } catch (t4) {
        throw b2(f2), u2.error(t4), t4;
      }
    }, close() {
      if (S2) return;
      try {
        !(function() {
          const t4 = new c(Mn.buffer), n3 = f2.P, e3 = f2.M;
          for (; ; ) {
            const o2 = n3(f2.A, 0, 0, e3, a2, 4), c2 = o2 >> 24 & 255, s3 = 128 & c2 ? c2 - 256 : c2;
            if (s3 < 0) throw En(new r("process error:" + s3), s3);
            const i3 = 16777215 & o2;
            if (i3 && g2(t4.slice(e3, e3 + i3)), 1 === c2 || 0 === i3) break;
          }
        })();
      } catch (t4) {
        throw b2(f2), u2.error(t4), t4;
      }
      const t3 = b2(f2);
      if (0 !== t3) {
        const n3 = En(new r("end error:" + t3), t3);
        throw u2.error(n3), n3;
      }
      u2.close();
    }, abort(t3) {
      b2(f2), u2.error(t3);
    } }, { highWaterMark: 1 }) };
    function g2(t3) {
      h2 = true, u2.enqueue(t3);
    }
    function v2() {
      if (d2) {
        const t3 = d2;
        d2 = null, t3();
      }
    }
    function b2(t3) {
      let n3 = 0;
      return t3.A && t3.F && (n3 = t3.F(t3.A)), t3.A = 0, t3.in && In && In(t3.in), t3.in = 0, t3.M && In && In(t3.M), t3.M = 0, n3;
    }
  }
  class xn {
    constructor(t2 = mn, n2) {
      return Rn(true, t2, n2);
    }
  }
  class Pn {
    constructor(t2 = mn, n2) {
      return Rn(false, t2, n2);
    }
  }
  xn.requiresModule = true, Pn.requiresModule = true, xn.supportedFormats = bn, Pn.supportedFormats = kn;
  const Dn = 65536;
  let Fn, Un;
  function Bn(t2) {
    return new c(t2.memory.buffer);
  }
  let Wn = false;
  !(function(t2 = {}) {
    const { init: n2, U: e2 } = t2, o2 = t2.CompressionStreamFallback || t2.CompressionStreamZlib, r2 = t2.DecompressionStreamFallback || t2.DecompressionStreamZlib;
    e2 && (dt = e2 || G), self.initModule = async (t3) => {
      n2 && await n2(t3), o2 && (t3.CompressionStreamFallback = o2), r2 && (t3.DecompressionStreamFallback = r2);
    };
  })({ CompressionStreamFallback: xn, DecompressionStreamFallback: Pn, U: function(t2, n2) {
    const e2 = Fn;
    let o2 = e2 ? (function(t3, n3, e3) {
      Un || (Un = t3.malloc(Dn));
      const o3 = Un ? t3.aes_hmac_new() : 0;
      if (o3) {
        const r3 = Bn(t3);
        if (r3.set(n3, Un), r3.set(e3, Un + n3.length), t3.aes_hmac_init(o3, Un, n3.length, Un + n3.length, e3.length)) return t3.aes_hmac_end(o3, 0), 0;
      }
      return o3;
    })(e2, t2, n2) : 0;
    if (!o2) return G(t2, n2);
    const r2 = Un;
    return { process(t3, n3) {
      for (let c2 = 0; c2 < t3.length; c2 += Dn) {
        const s2 = t3.subarray(c2, c2 + Dn), a2 = Bn(e2);
        a2.set(s2, r2), e2.aes_hmac_process(o2, r2, s2.length, n3 ? 1 : 0), s2.set(a2.subarray(r2, r2 + s2.length));
      }
    }, digest: () => (e2.aes_hmac_end(o2, r2), o2 = 0, Bn(e2).slice(r2, r2 + 20)), dispose() {
      o2 && (e2.aes_hmac_end(o2, 0), o2 = 0);
    } };
  }, init: (t2) => (async function(t3, { baseURI: n2 }) {
    if (!Wn) try {
      await (async function(t4, n3) {
        let e2, o2;
        try {
          try {
            o2 = new URL(t4, n3);
          } catch {
          }
          const r2 = await fetch(o2);
          e2 = await r2.arrayBuffer();
        } catch (n4) {
          if (!t4.startsWith("data:application/wasm;base64,")) throw n4;
          e2 = (function(t5) {
            const n5 = t5.split(",")[1], e3 = atob(n5), o3 = e3.length, r2 = new c(o3);
            for (let t6 = 0; t6 < o3; ++t6) r2[t6] = e3.charCodeAt(t6);
            return r2.buffer;
          })(t4);
        }
        const s2 = await WebAssembly.instantiate(e2);
        var a2;
        (function(t5) {
          if (zn = t5, { malloc: Cn, free: In, memory: Mn } = zn, "function" != typeof Cn || "function" != typeof In || !Mn) throw zn = Cn = In = Mn = null, new r("Invalid WASM module");
        })(s2.instance.exports), typeof (a2 = s2.instance.exports).aes_hmac_new == k && (Fn = a2, Un = 0);
      })(t3, n2), Wn = true;
    } catch (t4) {
      throw (function(t5) {
        An = t5;
      })(t4), t4;
    }
  })(t2.wasmURI, t2) });
})();
