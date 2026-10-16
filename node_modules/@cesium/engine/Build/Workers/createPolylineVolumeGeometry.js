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
  Ellipsoid_default,
  PolylineVolumeGeometry_default,
  defined_default
} from "./chunk-N4AX4H36.js";

// packages/engine/Source/Workers/createPolylineVolumeGeometry.js
function createPolylineVolumeGeometry(polylineVolumeGeometry, offset) {
  if (defined_default(offset)) {
    polylineVolumeGeometry = PolylineVolumeGeometry_default.unpack(
      polylineVolumeGeometry,
      offset
    );
  }
  polylineVolumeGeometry._ellipsoid = Ellipsoid_default.clone(
    polylineVolumeGeometry._ellipsoid
  );
  return PolylineVolumeGeometry_default.createGeometry(polylineVolumeGeometry);
}
var createPolylineVolumeGeometry_default = createPolylineVolumeGeometry;
export {
  createPolylineVolumeGeometry_default as default
};
