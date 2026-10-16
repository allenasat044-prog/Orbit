//This file is automatically rebuilt by the Cesium build process.
export default "\n\
precision highp float;\n\
\n\
// ──────────────────────────────────────────────────────────────────────\n\
// BENTLEY_materials_planar_fill constants\n\
//\n\
// These factors scale gl_FragDepth AFTER czm_writeLogDepth has run, so\n\
// they are proportional offsets in log-depth space. The corresponding\n\
// eye-space offset therefore varies with the fragment's distance from\n\
// the camera (growing with distance). This is the intended behavior: it\n\
// matches the proportional depth comparison tolerance used by the edge\n\
// visibility system, so fills and edges stay consistently ordered at all\n\
// viewing distances.\n\
// ──────────────────────────────────────────────────────────────────────\n\
// Depth pull factor for all planar fills: scales log depth by 0.9995,\n\
// i.e. a 0.05% pull toward the camera in log-depth space.\n\
const float PLANAR_DEPTH_PULL = 0.9995;\n\
// Depth push factor for behind fills: scales log depth by 1.0002, i.e. a\n\
// 0.02% push away from the camera in log-depth space, so behind fills sit\n\
// behind same-object siblings.\n\
const float BEHIND_DEPTH_PUSH = 1.0002;\n\
// Tolerance for comparing feature IDs stored as floats (integer equality).\n\
const float FEATURE_ID_TOLERANCE = 0.5;\n\
// Offset added to feature IDs so 0 means \"no planar fill\" in the texture.\n\
const float FEATURE_ID_OFFSET = 1.0;\n\
\n\
czm_modelMaterial defaultModelMaterial()\n\
{\n\
    czm_modelMaterial material;\n\
    material.diffuse = vec3(0.0);\n\
    material.specular = vec3(1.0);\n\
    material.roughness = 1.0;\n\
    material.occlusion = 1.0;\n\
    material.normalEC = vec3(0.0, 0.0, 1.0);\n\
    material.emissive = vec3(0.0);\n\
    material.alpha = 1.0;\n\
    return material;\n\
}\n\
\n\
vec4 handleAlpha(vec3 color, float alpha)\n\
{\n\
    #ifdef ALPHA_MODE_MASK\n\
    if (alpha < u_alphaCutoff) {\n\
        discard;\n\
    }\n\
    #endif\n\
\n\
    return vec4(color, alpha);\n\
}\n\
\n\
void lineStyleStage()\n\
{\n\
    #if defined(HAS_LINE_PATTERN) && !defined(HAS_EDGE_VISIBILITY)\n\
    const float maskLength = 16.0;\n\
    float dashPosition = fract(v_lineCoord / maskLength);\n\
    float maskIndex = floor(dashPosition * maskLength);\n\
    float maskTest = floor(u_linePattern / pow(2.0, maskIndex));\n\
    if (mod(maskTest, 2.0) < 1.0) {\n\
        discard;\n\
    }\n\
    #endif\n\
}\n\
\n\
SelectedFeature selectedFeature;\n\
\n\
// Set by edge-pass fragments below; consumed by the snapId expression built\n\
// in PickingPipelineStage (see Scene#snap).\n\
bool isEdge = false;\n\
\n\
void main()\n\
{\n\
    #if defined(PRIMITIVE_TYPE_POINTS) && defined(HAS_POINT_DIAMETER)\n\
    // Render points as circles\n\
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));\n\
    if (distanceToCenter > 0.5) {\n\
        discard;\n\
    }\n\
    #endif\n\
\n\
    #ifdef HAS_POINT_CLOUD_SHOW_STYLE\n\
        if (v_pointCloudShow == 0.0)\n\
        {\n\
            discard;\n\
        }\n\
    #endif\n\
\n\
    #ifdef HAS_MODEL_SPLITTER\n\
    modelSplitterStage();\n\
    #endif\n\
\n\
    czm_modelMaterial material = defaultModelMaterial();\n\
\n\
    ProcessedAttributes attributes;\n\
    geometryStage(attributes);\n\
\n\
    FeatureIds featureIds;\n\
    featureIdStage(featureIds, attributes);\n\
\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    // BENTLEY_materials_planar_fill: Feature-ID pre-pass output.\n\
    //\n\
    // When HAS_PLANAR_FILL_ID_PASS is defined this command is being rendered\n\
    // into the planar fill ID framebuffer.  Non-behind planar geometry writes\n\
    // its feature ID + 1 into the R channel (0 = no feature) and returns.\n\
    // No material / lighting / post-process stages are needed.\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    #ifdef HAS_PLANAR_FILL_ID_PASS\n\
    if (u_isPlanarFillIdPass) {\n\
        float fid = float(featureIds.PLANAR_FILL_FEATURE_ID) + FEATURE_ID_OFFSET;\n\
        out_FragColor = vec4(fid, 0.0, 0.0, 1.0);\n\
        // Still need to write log depth so the depth buffer is correct.\n\
        #ifdef LOG_DEPTH\n\
        czm_writeLogDepth();\n\
        #endif\n\
        return;\n\
    }\n\
    #endif\n\
\n\
    Metadata metadata;\n\
    MetadataClass metadataClass;\n\
    MetadataStatistics metadataStatistics;\n\
    metadataStage(featureIds, metadata, metadataClass, metadataStatistics, attributes);\n\
\n\
    //========================================================================\n\
    // When not picking metadata START\n\
    #ifndef METADATA_PICKING_ENABLED\n\
\n\
    #ifdef HAS_SELECTED_FEATURE_ID\n\
    selectedFeatureIdStage(selectedFeature, featureIds);\n\
    #endif\n\
\n\
    #ifndef CUSTOM_SHADER_REPLACE_MATERIAL\n\
    materialStage(material, attributes, selectedFeature);\n\
    #endif\n\
\n\
    #ifdef HAS_CUSTOM_FRAGMENT_SHADER\n\
    customShaderStage(material, attributes, featureIds, metadata, metadataClass, metadataStatistics);\n\
    #endif\n\
\n\
    lightingStage(material, attributes);\n\
\n\
    #ifdef HAS_SELECTED_FEATURE_ID\n\
    cpuStylingStage(material, selectedFeature);\n\
    #endif\n\
\n\
    #ifdef HAS_MODEL_COLOR\n\
    modelColorStage(material);\n\
    #endif\n\
\n\
    #ifdef HAS_PRIMITIVE_OUTLINE\n\
    primitiveOutlineStage(material);\n\
    #endif\n\
\n\
    vec4 color = handleAlpha(material.diffuse, material.alpha);\n\
\n\
    // When not picking metadata END\n\
    //========================================================================\n\
    #else\n\
    //========================================================================\n\
    // When picking metadata START\n\
\n\
    vec4 metadataValues = vec4(0.0, 0.0, 0.0, 0.0);\n\
    metadataPickingStage(metadata, metadataClass, metadataValues);\n\
    vec4 color = metadataValues;\n\
\n\
    #endif\n\
    // When picking metadata END\n\
    //========================================================================\n\
\n\
    lineStyleStage();\n\
\n\
    #ifdef HAS_CLIPPING_PLANES\n\
    modelClippingPlanesStage(color);\n\
    #endif\n\
\n\
    #ifdef ENABLE_CLIPPING_POLYGONS\n\
    modelClippingPolygonsStage();\n\
    #endif\n\
\n\
    #ifdef HAS_VECTOR_LOOKUP\n\
    modelVectorLookupStage(color);\n\
    #endif\n\
\n\
    //========================================================================\n\
    // When not picking metadata START\n\
    #ifndef METADATA_PICKING_ENABLED\n\
\n\
    #if defined(HAS_SILHOUETTE) && defined(HAS_NORMALS)\n\
    silhouetteStage(color);\n\
    #endif\n\
\n\
    #ifdef HAS_ATMOSPHERE\n\
    atmosphereStage(color, attributes);\n\
    #endif\n\
\n\
    #ifdef HAS_EDGE_VISIBILITY\n\
    edgeVisibilityStage(color, featureIds);\n\
    edgeDetectionStage(color, featureIds);\n\
    // Edge-pass fragments rasterize the edge band itself. Flag them so the\n\
    // snap payload (see Scene#snap) can distinguish edges from surfaces;\n\
    // surface fragments leave isEdge false.\n\
    if (u_isEdgePass) {\n\
        isEdge = true;\n\
    }\n\
    #endif\n\
\n\
    #endif\n\
    // When not picking metadata END\n\
    //========================================================================\n\
\n\
    out_FragColor = color;\n\
\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    // Explicit log-depth write.\n\
    //\n\
    // DerivedCommand.getLogDepthShaderProgram auto-wraps only when the raw\n\
    // source does NOT already mention czm_writeLogDepth.  We mention it\n\
    // above in the HAS_PLANAR_FILL_ID_PASS block, so we must also handle\n\
    // the normal code path ourselves.  The LOG_DEPTH define is injected by\n\
    // that same auto-wrapper, so this block is active exactly when needed.\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    #ifdef LOG_DEPTH\n\
    czm_writeLogDepth();\n\
    #endif\n\
\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    // BENTLEY_materials_planar_fill: Proportional depth adjustment.\n\
    //\n\
    // Per the spec, planar primitives must render in front of non-planar\n\
    // geometry. We use proportional depth scaling (similar to edge visibility)\n\
    // which scales naturally with logarithmic depth at all viewing distances.\n\
    //\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    #ifdef HAS_PLANAR_FILL_DEPTH\n\
    gl_FragDepth *= PLANAR_DEPTH_PULL;\n\
    #endif\n\
\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    // BENTLEY_materials_planar_fill: Behind fill depth adjustment.\n\
    //\n\
    // After the proportional depth pull has been applied, sample the planar\n\
    // fill ID texture. If the pixel already belongs to the same feature,\n\
    // apply a small proportional push so this \"behind\" fill sits behind its\n\
    // non-behind sibling. If the pixel has no stored feature, the base pull\n\
    // still keeps us in front of non-planar geometry.\n\
    //\n\
    // ──────────────────────────────────────────────────────────────────────\n\
    #ifdef HAS_PLANAR_FILL_BEHIND\n\
    {\n\
        vec2 screenCoord = gl_FragCoord.xy / czm_viewport.zw;\n\
        float storedEncoded = texture(czm_planarFillIdTexture, screenCoord).r;\n\
        float storedFeatureId = storedEncoded - FEATURE_ID_OFFSET;\n\
        float myFeatureId = float(featureIds.PLANAR_FILL_FEATURE_ID);\n\
\n\
        // storedFeatureId < 0 means \"no planar fill at this pixel\".\n\
        if (storedFeatureId >= 0.0 && abs(storedFeatureId - myFeatureId) < FEATURE_ID_TOLERANCE) {\n\
            // Proportional push: multiply by >1 to move away from camera.\n\
            // Net effect: PLANAR_DEPTH_PULL * BEHIND_DEPTH_PUSH ≈ 0.9997,\n\
            // still in front of non-planar but behind same-feature non-behind fills.\n\
            gl_FragDepth *= BEHIND_DEPTH_PUSH;\n\
        }\n\
    }\n\
    #endif\n\
}\n\
\n\
";
