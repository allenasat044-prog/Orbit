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
const MAX_CODE_LENGTH = 15;
const END_OF_BLOCK = 256;
const LENGTH_BASES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
const LENGTH_EXTRA_BITS = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
const DISTANCE_BASES = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
const DISTANCE_EXTRA_BITS = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
const CODE_LENGTH_CODE_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
const FIXED_LITERAL_LENGTHS = new Uint8Array(288);
FIXED_LITERAL_LENGTHS.fill(8, 0, 144);
FIXED_LITERAL_LENGTHS.fill(9, 144, 256);
FIXED_LITERAL_LENGTHS.fill(7, 256, 280);
FIXED_LITERAL_LENGTHS.fill(8, 280, 288);
const FIXED_DISTANCE_LENGTHS = new Uint8Array(30).fill(5);

export function inflateRaw(input) {
	let inputIndex = 0;
	let bitBuffer = 0;
	let bitCount = 0;
	let output = new Uint8Array(1024);
	let outputLength = 0;
	let lastBlock = 0;
	while (!lastBlock) {
		lastBlock = readBits(1);
		const blockType = readBits(2);
		if (blockType == 0) {
			copyStoredBlock();
		} else if (blockType == 1) {
			inflateBlock(buildHuffmanTable(FIXED_LITERAL_LENGTHS), buildHuffmanTable(FIXED_DISTANCE_LENGTHS));
		} else if (blockType == 2) {
			inflateBlock(...readDynamicTables());
		} else {
			throw new Error("invalid deflate block type");
		}
	}
	return output.subarray(0, outputLength);

	function readByte() {
		if (inputIndex >= input.length) {
			throw new Error("unexpected end of deflate data");
		}
		return input[inputIndex++];
	}

	function readBits(count) {
		while (bitCount < count) {
			bitBuffer |= readByte() << bitCount;
			bitCount += 8;
		}
		const value = bitBuffer & ((1 << count) - 1);
		bitBuffer >>>= count;
		bitCount -= count;
		return value;
	}

	function copyStoredBlock() {
		bitBuffer = 0;
		bitCount = 0;
		const length = readByte() | (readByte() << 8);
		inputIndex += 2;
		ensureOutput(outputLength + length);
		for (let indexByte = 0; indexByte < length; indexByte++) {
			output[outputLength++] = readByte();
		}
	}

	function inflateBlock(literalTable, distanceTable) {
		let symbol = decodeSymbol(literalTable);
		while (symbol != END_OF_BLOCK) {
			if (symbol < END_OF_BLOCK) {
				ensureOutput(outputLength + 1);
				output[outputLength++] = symbol;
			} else {
				const lengthIndex = symbol - 257;
				const length = LENGTH_BASES[lengthIndex] + readBits(LENGTH_EXTRA_BITS[lengthIndex]);
				const distanceIndex = decodeSymbol(distanceTable);
				const distance = DISTANCE_BASES[distanceIndex] + readBits(DISTANCE_EXTRA_BITS[distanceIndex]);
				ensureOutput(outputLength + length);
				const copyStart = outputLength - distance;
				for (let indexByte = 0; indexByte < length; indexByte++) {
					output[outputLength++] = output[copyStart + indexByte];
				}
			}
			symbol = decodeSymbol(literalTable);
		}
	}

	function readDynamicTables() {
		const literalLengthCount = readBits(5) + 257;
		const distanceLengthCount = readBits(5) + 1;
		const codeLengthCount = readBits(4) + 4;
		const codeLengthLengths = new Uint8Array(19);
		for (let indexCode = 0; indexCode < codeLengthCount; indexCode++) {
			codeLengthLengths[CODE_LENGTH_CODE_ORDER[indexCode]] = readBits(3);
		}
		const codeLengthTable = buildHuffmanTable(codeLengthLengths);
		const lengths = new Uint8Array(literalLengthCount + distanceLengthCount);
		let indexLength = 0;
		while (indexLength < lengths.length) {
			const symbol = decodeSymbol(codeLengthTable);
			if (symbol < 16) {
				lengths[indexLength++] = symbol;
			} else if (symbol == 16) {
				const previousLength = lengths[indexLength - 1];
				let repeatCount = readBits(2) + 3;
				while (repeatCount--) {
					lengths[indexLength++] = previousLength;
				}
			} else {
				const repeatCount = symbol == 17 ? readBits(3) + 3 : readBits(7) + 11;
				indexLength += repeatCount;
			}
		}
		return [
			buildHuffmanTable(lengths.subarray(0, literalLengthCount)),
			buildHuffmanTable(lengths.subarray(literalLengthCount))
		];
	}

	function decodeSymbol(table) {
		const { lengthCounts, symbols } = table;
		let code = 0;
		let first = 0;
		let index = 0;
		for (let length = 1; length <= MAX_CODE_LENGTH; length++) {
			code |= readBits(1);
			const count = lengthCounts[length];
			if (code - first < count) {
				return symbols[index + (code - first)];
			}
			index += count;
			first = (first + count) << 1;
			code <<= 1;
		}
		throw new Error("invalid huffman code");
	}

	function ensureOutput(length) {
		if (output.length < length) {
			let newLength = output.length * 2;
			while (newLength < length) {
				newLength *= 2;
			}
			const newOutput = new Uint8Array(newLength);
			newOutput.set(output.subarray(0, outputLength));
			output = newOutput;
		}
	}
}

function buildHuffmanTable(codeLengths) {
	const lengthCounts = new Uint16Array(MAX_CODE_LENGTH + 1);
	for (const length of codeLengths) {
		lengthCounts[length]++;
	}
	lengthCounts[0] = 0;
	const offsets = new Uint16Array(MAX_CODE_LENGTH + 2);
	for (let length = 1; length <= MAX_CODE_LENGTH; length++) {
		offsets[length + 1] = offsets[length] + lengthCounts[length];
	}
	const symbols = new Uint16Array(codeLengths.length);
	for (let symbol = 0; symbol < codeLengths.length; symbol++) {
		if (codeLengths[symbol]) {
			symbols[offsets[codeLengths[symbol]]++] = symbol;
		}
	}
	return { lengthCounts, symbols };
}
