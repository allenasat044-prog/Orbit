//This file is automatically rebuilt by the Cesium build process.
export default "void modelVectorLookupStage(inout vec4 color)\n\
{\n\
    // Fills composite before strokes. Both no-op against 1x1 placeholder textures.\n\
    color = vectorPolygonRender(v_vectorUv, color);\n\
    color = vectorPolylineRender(v_vectorUv, v_positionEC, color);\n\
}\n\
";
