//This file is automatically rebuilt by the Cesium build process.
export default "/**\n\
 * Derives each vertex's UV within the rectangle the lookup textures were baked for, where [0,1] spans the rectangle.\n\
 * {@link ModelVectorLookupStageFS.glsl} samples those textures with it.\n\
 *\n\
 * v_positionWC is unusable here: it is 32-bit and too large to resolve a geodetic position precisely, and splitting it\n\
 * into hi/lo components would still not support the trigonometry needed to derive longitude and latitude. Instead,\n\
 * {@link czm_eyeToCartographicDelta} returns a geodetic delta from the camera to the vertex, a small quantity that\n\
 * grows more precise as the camera approaches. Adding it to the camera's own UV, computed on the CPU in double\n\
 * precision, keeps the result precise across the rectangle.\n\
 */\n\
void modelVectorLookupStage(ProcessedAttributes attributes)\n\
{\n\
    vec2 delta = czm_eyeToCartographicDelta(v_positionEC).xy;\n\
    v_vectorUv = u_vectorCameraUv + delta * u_vectorRectangleInverseSize;\n\
}\n\
";
