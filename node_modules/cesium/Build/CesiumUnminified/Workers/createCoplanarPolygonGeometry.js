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
  CoplanarPolygonGeometry_default,
  defined_default
} from "./chunk-N4AX4H36.js";

// packages/engine/Source/Workers/createCoplanarPolygonGeometry.js
function createCoplanarPolygonGeometry(polygonGeometry, offset) {
  if (defined_default(offset)) {
    polygonGeometry = CoplanarPolygonGeometry_default.unpack(polygonGeometry, offset);
  }
  return CoplanarPolygonGeometry_default.createGeometry(polygonGeometry);
}
var createCoplanarPolygonGeometry_default = createCoplanarPolygonGeometry;
export {
  createCoplanarPolygonGeometry_default as default
};
