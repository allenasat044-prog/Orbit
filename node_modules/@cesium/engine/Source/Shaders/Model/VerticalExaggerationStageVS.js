//This file is automatically rebuilt by the Cesium build process.
export default "void verticalExaggerationStage(\n\
  inout ProcessedAttributes attributes\n\
) {\n\
  // Compute the distance from the camera to the local center of curvature.\n\
  vec4 vertexPositionENU = czm_modelToEnu * vec4(attributes.positionMC, 1.0);\n\
  vec2 vertexAzimuth = normalize(vertexPositionENU.xy);\n\
  // Curvature = 1 / radius of curvature.\n\
  float azimuthalCurvature = dot(vertexAzimuth * vertexAzimuth, czm_eyeEllipsoidCurvature);\n\
  float eyeToCenter = 1.0 / azimuthalCurvature + czm_eyeHeight;\n\
\n\
  // Compute the approximate ellipsoid normal at the vertex position.\n\
  // Uses a circular approximation for the Earth curvature along the geodesic.\n\
  vec3 vertexPositionEC = (czm_modelView * vec4(attributes.positionMC, 1.0)).xyz;\n\
  vec3 centerToVertex = eyeToCenter * czm_eyeEllipsoidNormalEC + vertexPositionEC;\n\
  vec3 vertexEllipsoidNormalEC = normalize(centerToVertex);\n\
\n\
  // Estimate the (sine of the) angle between the camera direction and the ellipsoid normal.\n\
  float verticalDistance = dot(vertexPositionEC, czm_eyeEllipsoidNormalEC);\n\
  float horizontalDistance = length(vertexPositionEC - verticalDistance * czm_eyeEllipsoidNormalEC);\n\
  float sinTheta = horizontalDistance / (eyeToCenter + verticalDistance);\n\
  bool isSmallAngle = clamp(sinTheta, 0.0, 0.05) == sinTheta;\n\
\n\
  // Approximate the change in height above the ellipsoid, from camera to vertex position.\n\
  float exactVersine = 1.0 - dot(czm_eyeEllipsoidNormalEC, vertexEllipsoidNormalEC);\n\
  float smallAngleVersine = 0.5 * sinTheta * sinTheta;\n\
  float versine = isSmallAngle ? smallAngleVersine : exactVersine;\n\
  float dHeight = dot(vertexPositionEC, vertexEllipsoidNormalEC) - eyeToCenter * versine;\n\
  float vertexHeight = czm_eyeHeight + dHeight;\n\
\n\
  // Transform the approximate ellipsoid normal to model coordinates.\n\
  vec3 exaggerationDirectionScaledMC = (czm_inverseModelView * vec4(vertexEllipsoidNormalEC, 0.0)).xyz;\n\
\n\
  // Compute the exaggeration and apply it along the exaggeration direction in model coordinates.\n\
  float stretch = u_verticalExaggerationAndRelativeHeight.x;\n\
  float shift = u_verticalExaggerationAndRelativeHeight.y;\n\
  float exaggeration = (vertexHeight - shift) * (stretch - 1.0);\n\
  attributes.positionMC += exaggeration * exaggerationDirectionScaledMC;\n\
}";
