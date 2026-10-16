/*
 Copyright (c) 2025 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
const BASE64_TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function base64Decode(b64) {
	b64 = String(b64).replace(/[^A-Za-z0-9+/=]/g, "");
	const len = b64.length;
	const out = [];
	for (let i = 0; i < len; i += 4) {
		const a = BASE64_TABLE.indexOf(b64[i]);
		const b = BASE64_TABLE.indexOf(b64[i + 1]);
		const c = BASE64_TABLE.indexOf(b64[i + 2]);
		const d = BASE64_TABLE.indexOf(b64[i + 3]);
		const n = (a << 18) | (b << 12) | ((c & 63) << 6) | (d & 63);
		out.push((n >> 16) & 0xff);
		if (b64[i + 2] !== "=") {
			out.push((n >> 8) & 0xff);
		}
		if (b64[i + 3] !== "=") {
			out.push(n & 0xff);
		}
	}
	return new Uint8Array(out);
}

export function base64Encode(bytes) {
	let out = "";
	const len = bytes.length;
	let i = 0;
	for (; i + 2 < len; i += 3) {
		const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
		out += BASE64_TABLE[(n >> 18) & 63] + BASE64_TABLE[(n >> 12) & 63] + BASE64_TABLE[(n >> 6) & 63] + BASE64_TABLE[n & 63];
	}
	const rem = len - i;
	if (rem === 1) {
		const n = bytes[i] << 16;
		out += BASE64_TABLE[(n >> 18) & 63] + BASE64_TABLE[(n >> 12) & 63] + "==";
	} else if (rem === 2) {
		const n = (bytes[i] << 16) | (bytes[i + 1] << 8);
		out += BASE64_TABLE[(n >> 18) & 63] + BASE64_TABLE[(n >> 12) & 63] + BASE64_TABLE[(n >> 6) & 63] + "=";
	}
	return out;
}
