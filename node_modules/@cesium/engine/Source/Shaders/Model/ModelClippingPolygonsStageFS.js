//This file is automatically rebuilt by the Cesium build process.
export default "void modelClippingPolygonsStage()\n\
{\n\
    // The lookup uv was computed per vertex in the vertex stage and\n\
    // interpolated across the primitive, so the fragment shader only samples it.\n\
    bool insideAny = vectorClip(v_clippingUv);\n\
\n\
#ifdef CLIPPING_INVERSE\n\
    if (!insideAny)\n\
    {\n\
        discard;\n\
    }\n\
#else\n\
    if (insideAny)\n\
    {\n\
        discard;\n\
    }\n\
#endif\n\
}\n\
";
