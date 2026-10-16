//This file is automatically rebuilt by the Cesium build process.
export default "/**\n\
 * Computes the geodetic offset (delta longitude, latitude, and height) from a reference cartographic position\n\
 * to a point given in eye coordinates.\n\
 *\n\
 * This is designed to preserve precision. Rather than converting the point's absolute world position to\n\
 * cartographic -- which is too large to process precisely at 32 bits -- it works entirely with the small\n\
 * delta between the point and the camera. By projecting the eye-space offset onto the ellipsoid's equatorial\n\
 * and meridional planes, it derives the change in (longitude, latitude, height) as small, precisely-representable\n\
 * quantities. The delta gets smaller and more precise as one zooms in.\n\
 * <br /><br />\n\
 * This assumes an ellipsoid of revolution (equatorial radii equal, as with WGS84), so that longitude is exact.\n\
 * The latitude calculation is only first-order accurate, since the meridian is an ellipse rather than a circle.\n\
 *\n\
 * @name czm_eyeToCartographicDelta\n\
 * @glslFunction\n\
 *\n\
 * @param {vec3} positionEC The position, in eye coordinates, to measure to.\n\
 *\n\
 * @returns {vec3} The geodetic offset from the camera to <code>positionEC</code>, as (delta longitude, delta latitude in radians, delta height in meters).\n\
 */\n\
vec3 czm_eyeToCartographicDelta(vec3 positionEC)\n\
{\n\
    // A vector representing the camera-to-vertex offset, in an ENU oriented reference frame (centered at the camera)\n\
    vec3 cameraToVertex = czm_eyeToEnu * positionEC;\n\
\n\
    float cosLatitude = cos(czm_eyeCartographic.y);\n\
    float sinLatitude = sin(czm_eyeCartographic.y);\n\
\n\
    // To derive longitude, project the camera and vertex onto the equatorial plane, in a frame such that the camera lies along the +x axis. In this frame,\n\
    // the vertex's (delta) longitude is simply the atan of its x and y components.\n\
    float primeVerticalRadius = 1.0 / czm_eyeEllipsoidCurvature.x;\n\
    vec2 cameraEquatorialPos = vec2((primeVerticalRadius + czm_eyeCartographic.z) * cosLatitude, 0.0);\n\
    vec2 vertexEquatorialPos = cameraEquatorialPos + vec2(-cameraToVertex.y * sinLatitude + cameraToVertex.z * cosLatitude, cameraToVertex.x);\n\
    float deltaLongitude = atan(vertexEquatorialPos.y, vertexEquatorialPos.x);\n\
\n\
    // Deriving latitude is a bit harder: we can't directly project the vertex onto the camera's meridian — the latitude projection is dependent on the longitude.\n\
    // Instead we can rotate the vertex (by -deltaLongitude) onto the camera's meridional plane.  (Note: (unlike the exact longitude case) this is only first-order accurate because the meridian is an ellipse rather than a circle)\n\
    // Using a 2D rotation formula introduces precision issues (subtraction of large-magnitude quantities), so instead we can calculate the vector difference\n\
    // between the vertex and its rotated version, and apply that offset to the cameraToVertex vector. Then, the cameraToVertex vector accurately\n\
    // reflects the difference between the camera and the _rotated_ vertex, so we can then project the camera onto the meridional plane and apply this offset - just as we did for deltaLongitude, above.\n\
    // Best of all, we can do this all with small delta quantities which preserve precision.\n\
    //\n\
    // (I suggest drawing this out -- with the vertex and camera vectors projected onto the equatorial plane, with the camera on the +x axis)\n\
    // Mathematically: if you compare (subtract) vertexEquatorialPos and the same vector rotated onto the camera's meridional plane, you get\n\
    // |dx| = |vertexEquatorialPos| - vertexEquatorialPos.x = (r - x) = r * (1 - cos(deltaLongitude))\n\
    // |dy| = cameraToVertex.x (the east component)\n\
    // (To avoid precision issues, we'll use the identity (1 - cos(x) = 2 * sin^2(x/2)))\n\
    //\n\
    // Since these offsets were produced in the equatorial plane, and cameraToVertex is in the camera's ENU frame, we need to deconstruct along the camera's north and up axes. And we only care about\n\
    // dx, since dy is in the camera's east direction, and that component gets zeroed out when projecting onto the camera's meridional plane.\n\
    float sinHalfLongitude = sin(deltaLongitude * 0.5);\n\
    float dx = length(vertexEquatorialPos) * 2.0 * sinHalfLongitude * sinHalfLongitude;\n\
    vec3 meridionalOffset = vec3(\n\
        0.0,                                 // east\n\
        cameraToVertex.y - dx * sinLatitude, // north\n\
        cameraToVertex.z + dx * cosLatitude  // up\n\
    );\n\
\n\
    // Reframe the camera in a meridional plane, where it lies along the +z axis, and apply the meridionalOffset to get the vertex's position in that plane.\n\
    // Then, deltaLatitude is simply the atan of its x and y components.\n\
    float meridionalRadius = 1.0 / czm_eyeEllipsoidCurvature.y;\n\
    vec2 cameraMeridionalPos = vec2(meridionalRadius + czm_eyeCartographic.z, 0.0);\n\
    vec2 vertMeridionalPos = cameraMeridionalPos + vec2(meridionalOffset.z, meridionalOffset.y);\n\
    float deltaLatitude = atan(vertMeridionalPos.y, vertMeridionalPos.x);\n\
\n\
    // Finally, derive the change in height above the ellipsoid. This is the meridional-plane analogue of the dx step above:\n\
    // there we rotated the vertex (in the equatorial plane) to the camera's longitude; here we rotate it (in the meridional plane, by -deltaLatitude)\n\
    // to the camera's latitude, aligning it with the camera's radial (up) direction.\n\
    float sinHalfLatitude = sin(deltaLatitude * 0.5);\n\
    float dz = length(vertMeridionalPos) * 2.0 * sinHalfLatitude * sinHalfLatitude;\n\
    float deltaHeight = meridionalOffset.z + dz;\n\
\n\
    return vec3(deltaLongitude, deltaLatitude, deltaHeight);\n\
}\n\
";
