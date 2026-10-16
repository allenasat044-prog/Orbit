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
  BoundingSphere_default,
  Cartesian3_default,
  Cartesian4_default,
  Check_default,
  ComponentDatatype_default,
  GeometryAttribute_default,
  GeometryAttributes_default,
  Geometry_default,
  Matrix3_default,
  Matrix4_default,
  OrthographicFrustum_default,
  PerspectiveFrustum_default,
  PrimitiveType_default,
  Quaternion_default,
  VertexFormat_default,
  defined_default
} from "./chunk-N4AX4H36.js";

// packages/engine/Source/Core/FrustumGeometry.js
var PERSPECTIVE = 0;
var ORTHOGRAPHIC = 1;
function FrustumGeometry(options) {
  Check_default.typeOf.object("options", options);
  Check_default.typeOf.object("options.frustum", options.frustum);
  Check_default.typeOf.object("options.origin", options.origin);
  Check_default.typeOf.object("options.orientation", options.orientation);
  const frustum = options.frustum;
  const orientation = options.orientation;
  const origin = options.origin;
  const vertexFormat = options.vertexFormat ?? VertexFormat_default.DEFAULT;
  const drawNearPlane = options._drawNearPlane ?? true;
  let frustumType;
  let frustumPackedLength;
  if (frustum instanceof PerspectiveFrustum_default) {
    frustumType = PERSPECTIVE;
    frustumPackedLength = PerspectiveFrustum_default.packedLength;
  } else if (frustum instanceof OrthographicFrustum_default) {
    frustumType = ORTHOGRAPHIC;
    frustumPackedLength = OrthographicFrustum_default.packedLength;
  }
  this._frustumType = frustumType;
  this._frustum = frustum.clone();
  this._origin = Cartesian3_default.clone(origin);
  this._orientation = Quaternion_default.clone(orientation);
  this._drawNearPlane = drawNearPlane;
  this._vertexFormat = vertexFormat;
  this._workerName = "createFrustumGeometry";
  this.packedLength = 2 + frustumPackedLength + Cartesian3_default.packedLength + Quaternion_default.packedLength + VertexFormat_default.packedLength;
}
FrustumGeometry.pack = function(value, array, startingIndex) {
  Check_default.typeOf.object("value", value);
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  const frustumType = value._frustumType;
  const frustum = value._frustum;
  array[startingIndex++] = frustumType;
  if (frustumType === PERSPECTIVE) {
    PerspectiveFrustum_default.pack(frustum, array, startingIndex);
    startingIndex += PerspectiveFrustum_default.packedLength;
  } else {
    OrthographicFrustum_default.pack(frustum, array, startingIndex);
    startingIndex += OrthographicFrustum_default.packedLength;
  }
  Cartesian3_default.pack(value._origin, array, startingIndex);
  startingIndex += Cartesian3_default.packedLength;
  Quaternion_default.pack(value._orientation, array, startingIndex);
  startingIndex += Quaternion_default.packedLength;
  VertexFormat_default.pack(value._vertexFormat, array, startingIndex);
  startingIndex += VertexFormat_default.packedLength;
  array[startingIndex] = value._drawNearPlane ? 1 : 0;
  return array;
};
var scratchPackPerspective = new PerspectiveFrustum_default();
var scratchPackOrthographic = new OrthographicFrustum_default();
var scratchPackQuaternion = new Quaternion_default();
var scratchPackorigin = new Cartesian3_default();
var scratchVertexFormat = new VertexFormat_default();
FrustumGeometry.unpack = function(array, startingIndex, result) {
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  const frustumType = array[startingIndex++];
  let frustum;
  if (frustumType === PERSPECTIVE) {
    frustum = PerspectiveFrustum_default.unpack(
      array,
      startingIndex,
      scratchPackPerspective
    );
    startingIndex += PerspectiveFrustum_default.packedLength;
  } else {
    frustum = OrthographicFrustum_default.unpack(
      array,
      startingIndex,
      scratchPackOrthographic
    );
    startingIndex += OrthographicFrustum_default.packedLength;
  }
  const origin = Cartesian3_default.unpack(array, startingIndex, scratchPackorigin);
  startingIndex += Cartesian3_default.packedLength;
  const orientation = Quaternion_default.unpack(
    array,
    startingIndex,
    scratchPackQuaternion
  );
  startingIndex += Quaternion_default.packedLength;
  const vertexFormat = VertexFormat_default.unpack(
    array,
    startingIndex,
    scratchVertexFormat
  );
  startingIndex += VertexFormat_default.packedLength;
  const drawNearPlane = array[startingIndex] === 1;
  if (!defined_default(result)) {
    return new FrustumGeometry({
      frustum,
      origin,
      orientation,
      vertexFormat,
      _drawNearPlane: drawNearPlane
    });
  }
  const frustumResult = frustumType === result._frustumType ? result._frustum : void 0;
  result._frustum = frustum.clone(frustumResult);
  result._frustumType = frustumType;
  result._origin = Cartesian3_default.clone(origin, result._origin);
  result._orientation = Quaternion_default.clone(orientation, result._orientation);
  result._vertexFormat = VertexFormat_default.clone(vertexFormat, result._vertexFormat);
  result._drawNearPlane = drawNearPlane;
  return result;
};
function getAttributes(offset, normals, tangents, bitangents, st, normal, tangent, bitangent) {
  const stOffset = offset / 3 * 2;
  for (let i = 0; i < 4; ++i) {
    if (defined_default(normals)) {
      normals[offset] = normal.x;
      normals[offset + 1] = normal.y;
      normals[offset + 2] = normal.z;
    }
    if (defined_default(tangents)) {
      tangents[offset] = tangent.x;
      tangents[offset + 1] = tangent.y;
      tangents[offset + 2] = tangent.z;
    }
    if (defined_default(bitangents)) {
      bitangents[offset] = bitangent.x;
      bitangents[offset + 1] = bitangent.y;
      bitangents[offset + 2] = bitangent.z;
    }
    offset += 3;
  }
  st[stOffset] = 0;
  st[stOffset + 1] = 0;
  st[stOffset + 2] = 1;
  st[stOffset + 3] = 0;
  st[stOffset + 4] = 1;
  st[stOffset + 5] = 1;
  st[stOffset + 6] = 0;
  st[stOffset + 7] = 1;
}
var scratchRotationMatrix = new Matrix3_default();
var scratchViewMatrix = new Matrix4_default();
var scratchInverseMatrix = new Matrix4_default();
var scratchXDirection = new Cartesian3_default();
var scratchYDirection = new Cartesian3_default();
var scratchZDirection = new Cartesian3_default();
var scratchNegativeX = new Cartesian3_default();
var scratchNegativeY = new Cartesian3_default();
var scratchNegativeZ = new Cartesian3_default();
var frustumSplits = new Array(3);
var frustumCornersNDC = new Array(4);
frustumCornersNDC[0] = new Cartesian4_default(-1, -1, 1, 1);
frustumCornersNDC[1] = new Cartesian4_default(1, -1, 1, 1);
frustumCornersNDC[2] = new Cartesian4_default(1, 1, 1, 1);
frustumCornersNDC[3] = new Cartesian4_default(-1, 1, 1, 1);
var scratchFrustumCorners = new Array(4);
for (let i = 0; i < 4; ++i) {
  scratchFrustumCorners[i] = new Cartesian4_default();
}
FrustumGeometry._computeNearFarPlanes = function(origin, orientation, frustumType, frustum, positions, xDirection, yDirection, zDirection) {
  const rotationMatrix = Matrix3_default.fromQuaternion(
    orientation,
    scratchRotationMatrix
  );
  let x = xDirection ?? scratchXDirection;
  let y = yDirection ?? scratchYDirection;
  let z = zDirection ?? scratchZDirection;
  x = Matrix3_default.getColumn(rotationMatrix, 0, x);
  y = Matrix3_default.getColumn(rotationMatrix, 1, y);
  z = Matrix3_default.getColumn(rotationMatrix, 2, z);
  Cartesian3_default.normalize(x, x);
  Cartesian3_default.normalize(y, y);
  Cartesian3_default.normalize(z, z);
  Cartesian3_default.negate(x, x);
  const view = Matrix4_default.computeView(origin, z, y, x, scratchViewMatrix);
  let inverseView;
  let inverseViewProjection;
  const projection = frustum.projectionMatrix;
  if (frustumType === PERSPECTIVE) {
    const viewProjection = Matrix4_default.multiply(
      projection,
      view,
      scratchInverseMatrix
    );
    inverseViewProjection = Matrix4_default.inverse(
      viewProjection,
      scratchInverseMatrix
    );
  } else {
    inverseView = Matrix4_default.inverseTransformation(view, scratchInverseMatrix);
  }
  if (defined_default(inverseViewProjection)) {
    frustumSplits[0] = frustum.near;
    frustumSplits[1] = frustum.far;
  } else {
    frustumSplits[0] = 0;
    frustumSplits[1] = frustum.near;
    frustumSplits[2] = frustum.far;
  }
  for (let i = 0; i < 2; ++i) {
    for (let j = 0; j < 4; ++j) {
      let corner = Cartesian4_default.clone(
        frustumCornersNDC[j],
        scratchFrustumCorners[j]
      );
      if (!defined_default(inverseViewProjection)) {
        const offCenterFrustum = frustum.offCenterFrustum;
        if (defined_default(offCenterFrustum)) {
          frustum = offCenterFrustum;
        }
        const near = frustumSplits[i];
        const far = frustumSplits[i + 1];
        corner.x = (corner.x * (frustum.right - frustum.left) + frustum.left + frustum.right) * 0.5;
        corner.y = (corner.y * (frustum.top - frustum.bottom) + frustum.bottom + frustum.top) * 0.5;
        corner.z = (corner.z * (near - far) - near - far) * 0.5;
        corner.w = 1;
        Matrix4_default.multiplyByVector(inverseView, corner, corner);
      } else {
        corner = Matrix4_default.multiplyByVector(
          inverseViewProjection,
          corner,
          corner
        );
        const w = 1 / corner.w;
        Cartesian3_default.multiplyByScalar(corner, w, corner);
        Cartesian3_default.subtract(corner, origin, corner);
        Cartesian3_default.normalize(corner, corner);
        const fac = Cartesian3_default.dot(z, corner);
        Cartesian3_default.multiplyByScalar(corner, frustumSplits[i] / fac, corner);
        Cartesian3_default.add(corner, origin, corner);
      }
      positions[12 * i + j * 3] = corner.x;
      positions[12 * i + j * 3 + 1] = corner.y;
      positions[12 * i + j * 3 + 2] = corner.z;
    }
  }
};
FrustumGeometry.createGeometry = function(frustumGeometry) {
  const frustumType = frustumGeometry._frustumType;
  const frustum = frustumGeometry._frustum;
  const origin = frustumGeometry._origin;
  const orientation = frustumGeometry._orientation;
  const drawNearPlane = frustumGeometry._drawNearPlane;
  const vertexFormat = frustumGeometry._vertexFormat;
  const numberOfPlanes = drawNearPlane ? 6 : 5;
  let positions = new Float64Array(3 * 4 * 6);
  FrustumGeometry._computeNearFarPlanes(
    origin,
    orientation,
    frustumType,
    frustum,
    positions
  );
  let offset = 3 * 4 * 2;
  positions[offset] = positions[3 * 4];
  positions[offset + 1] = positions[3 * 4 + 1];
  positions[offset + 2] = positions[3 * 4 + 2];
  positions[offset + 3] = positions[0];
  positions[offset + 4] = positions[1];
  positions[offset + 5] = positions[2];
  positions[offset + 6] = positions[3 * 3];
  positions[offset + 7] = positions[3 * 3 + 1];
  positions[offset + 8] = positions[3 * 3 + 2];
  positions[offset + 9] = positions[3 * 7];
  positions[offset + 10] = positions[3 * 7 + 1];
  positions[offset + 11] = positions[3 * 7 + 2];
  offset += 3 * 4;
  positions[offset] = positions[3 * 5];
  positions[offset + 1] = positions[3 * 5 + 1];
  positions[offset + 2] = positions[3 * 5 + 2];
  positions[offset + 3] = positions[3];
  positions[offset + 4] = positions[3 + 1];
  positions[offset + 5] = positions[3 + 2];
  positions[offset + 6] = positions[0];
  positions[offset + 7] = positions[1];
  positions[offset + 8] = positions[2];
  positions[offset + 9] = positions[3 * 4];
  positions[offset + 10] = positions[3 * 4 + 1];
  positions[offset + 11] = positions[3 * 4 + 2];
  offset += 3 * 4;
  positions[offset] = positions[3];
  positions[offset + 1] = positions[3 + 1];
  positions[offset + 2] = positions[3 + 2];
  positions[offset + 3] = positions[3 * 5];
  positions[offset + 4] = positions[3 * 5 + 1];
  positions[offset + 5] = positions[3 * 5 + 2];
  positions[offset + 6] = positions[3 * 6];
  positions[offset + 7] = positions[3 * 6 + 1];
  positions[offset + 8] = positions[3 * 6 + 2];
  positions[offset + 9] = positions[3 * 2];
  positions[offset + 10] = positions[3 * 2 + 1];
  positions[offset + 11] = positions[3 * 2 + 2];
  offset += 3 * 4;
  positions[offset] = positions[3 * 2];
  positions[offset + 1] = positions[3 * 2 + 1];
  positions[offset + 2] = positions[3 * 2 + 2];
  positions[offset + 3] = positions[3 * 6];
  positions[offset + 4] = positions[3 * 6 + 1];
  positions[offset + 5] = positions[3 * 6 + 2];
  positions[offset + 6] = positions[3 * 7];
  positions[offset + 7] = positions[3 * 7 + 1];
  positions[offset + 8] = positions[3 * 7 + 2];
  positions[offset + 9] = positions[3 * 3];
  positions[offset + 10] = positions[3 * 3 + 1];
  positions[offset + 11] = positions[3 * 3 + 2];
  if (!drawNearPlane) {
    positions = positions.subarray(3 * 4);
  }
  const attributes = new GeometryAttributes_default({
    position: new GeometryAttribute_default({
      componentDatatype: ComponentDatatype_default.DOUBLE,
      componentsPerAttribute: 3,
      values: positions
    })
  });
  if (defined_default(vertexFormat.normal) || defined_default(vertexFormat.tangent) || defined_default(vertexFormat.bitangent) || defined_default(vertexFormat.st)) {
    const normals = defined_default(vertexFormat.normal) ? new Float32Array(3 * 4 * numberOfPlanes) : void 0;
    const tangents = defined_default(vertexFormat.tangent) ? new Float32Array(3 * 4 * numberOfPlanes) : void 0;
    const bitangents = defined_default(vertexFormat.bitangent) ? new Float32Array(3 * 4 * numberOfPlanes) : void 0;
    const st = defined_default(vertexFormat.st) ? new Float32Array(2 * 4 * numberOfPlanes) : void 0;
    const x = scratchXDirection;
    const y = scratchYDirection;
    const z = scratchZDirection;
    const negativeX = Cartesian3_default.negate(x, scratchNegativeX);
    const negativeY = Cartesian3_default.negate(y, scratchNegativeY);
    const negativeZ = Cartesian3_default.negate(z, scratchNegativeZ);
    offset = 0;
    if (drawNearPlane) {
      getAttributes(offset, normals, tangents, bitangents, st, negativeZ, x, y);
      offset += 3 * 4;
    }
    getAttributes(offset, normals, tangents, bitangents, st, z, negativeX, y);
    offset += 3 * 4;
    getAttributes(
      offset,
      normals,
      tangents,
      bitangents,
      st,
      negativeX,
      negativeZ,
      y
    );
    offset += 3 * 4;
    getAttributes(
      offset,
      normals,
      tangents,
      bitangents,
      st,
      negativeY,
      negativeZ,
      negativeX
    );
    offset += 3 * 4;
    getAttributes(offset, normals, tangents, bitangents, st, x, z, y);
    offset += 3 * 4;
    getAttributes(offset, normals, tangents, bitangents, st, y, z, negativeX);
    if (defined_default(normals)) {
      attributes.normal = new GeometryAttribute_default({
        componentDatatype: ComponentDatatype_default.FLOAT,
        componentsPerAttribute: 3,
        values: normals
      });
    }
    if (defined_default(tangents)) {
      attributes.tangent = new GeometryAttribute_default({
        componentDatatype: ComponentDatatype_default.FLOAT,
        componentsPerAttribute: 3,
        values: tangents
      });
    }
    if (defined_default(bitangents)) {
      attributes.bitangent = new GeometryAttribute_default({
        componentDatatype: ComponentDatatype_default.FLOAT,
        componentsPerAttribute: 3,
        values: bitangents
      });
    }
    if (defined_default(st)) {
      attributes.st = new GeometryAttribute_default({
        componentDatatype: ComponentDatatype_default.FLOAT,
        componentsPerAttribute: 2,
        values: st
      });
    }
  }
  const indices = new Uint16Array(6 * numberOfPlanes);
  for (let i = 0; i < numberOfPlanes; ++i) {
    const indexOffset = i * 6;
    const index = i * 4;
    indices[indexOffset] = index;
    indices[indexOffset + 1] = index + 1;
    indices[indexOffset + 2] = index + 2;
    indices[indexOffset + 3] = index;
    indices[indexOffset + 4] = index + 2;
    indices[indexOffset + 5] = index + 3;
  }
  return new Geometry_default({
    attributes,
    indices,
    primitiveType: PrimitiveType_default.TRIANGLES,
    boundingSphere: BoundingSphere_default.fromVertices(positions)
  });
};
var FrustumGeometry_default = FrustumGeometry;

export {
  FrustumGeometry_default
};
