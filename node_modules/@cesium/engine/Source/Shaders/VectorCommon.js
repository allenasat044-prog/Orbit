//This file is automatically rebuilt by the Cesium build process.
export default "uniform highp sampler2D u_vectorColorTexture;\n\
uniform highp sampler2D u_vectorPickColorTexture;\n\
\n\
// Primitive index of the topmost vector draped over this fragment, or -1 for none.\n\
int vectorPickPrimitiveIndex = -1;\n\
\n\
#ifdef HAS_VECTOR_POLYLINES\n\
uniform highp sampler2D u_vectorSegmentTexture;\n\
uniform highp sampler2D u_vectorWidthTexture;\n\
uniform highp sampler2D u_vectorSegmentPrimitiveIndicesTexture;\n\
uniform highp sampler2D u_vectorGridCellIndicesTexture;\n\
// Ground size, in meters, of the tile's UV domain.\n\
uniform vec2 u_vectorMetersPerUv;\n\
#endif\n\
\n\
#ifdef HAS_VECTOR_POLYGONS\n\
uniform highp sampler2D u_vectorPolygonEdgeTexture;\n\
uniform highp sampler2D u_vectorPolygonEdgePrimitiveIndicesTexture;\n\
uniform highp sampler2D u_vectorPolygonGridCellIndicesTexture;\n\
#endif\n\
\n\
uniform highp sampler2D u_clippingEdgeTexture;\n\
uniform highp sampler2D u_clippingEdgePrimitiveIndicesTexture;\n\
uniform highp sampler2D u_clippingGridCellIndicesTexture;\n\
\n\
// UV-space offset from the closest point on the segment to p.\n\
vec2 vectorOffsetToLine(vec2 p, vec4 line)\n\
{\n\
    vec2 a = line.xy;\n\
    vec2 b = line.zw;\n\
    vec2 ab = b - a;\n\
    float abLengthSquared = dot(ab, ab);\n\
    if (abLengthSquared < 1.0e-8)\n\
    {\n\
        return p - a;\n\
    }\n\
    float t = clamp(dot(p - a, ab) / abLengthSquared, 0.0, 1.0);\n\
    return p - (a + t * ab);\n\
}\n\
\n\
ivec2 vectorIndexToUv(int index, ivec2 size)\n\
{\n\
    int v = index / size.x;\n\
    int u = index - v * size.x;\n\
    return ivec2(u, v);\n\
}\n\
\n\
// Returns [start, end) index range for the grid cell containing uv. An empty\n\
// range (start == end == 0) means a placeholder grid, so callers loop zero times.\n\
ivec2 vectorCellRange(vec2 uv, highp sampler2D gridCellIndicesTexture)\n\
{\n\
    ivec2 headerSize = textureSize(gridCellIndicesTexture, 0);\n\
    if (headerSize.x * headerSize.y < 3)\n\
    {\n\
        return ivec2(0);\n\
    }\n\
\n\
    int gridWidth  = int(texelFetch(gridCellIndicesTexture, vectorIndexToUv(0, headerSize), 0).r);\n\
    int gridHeight = int(texelFetch(gridCellIndicesTexture, vectorIndexToUv(1, headerSize), 0).r);\n\
    int cellX = clamp(int(uv.x * float(gridWidth)),  0, gridWidth  - 1);\n\
    int cellY = clamp(int(uv.y * float(gridHeight)), 0, gridHeight - 1);\n\
    int cellIndex = cellX + cellY * gridWidth;\n\
\n\
    int indexEnd = int(texelFetch(gridCellIndicesTexture, vectorIndexToUv(cellIndex + 2, headerSize), 0).r);\n\
    int indexStart = cellIndex == 0\n\
        ? 0\n\
        : int(texelFetch(gridCellIndicesTexture, vectorIndexToUv(cellIndex + 1, headerSize), 0).r);\n\
\n\
    return ivec2(indexStart, indexEnd);\n\
}\n\
\n\
#ifdef VECTOR_ANTIALIAS\n\
// Half-pixel band across a line's edge over which coverage fades.\n\
const float vectorCoverageRadius = 0.5;\n\
#else\n\
const float vectorCoverageRadius = 0.0;\n\
#endif\n\
\n\
// Drape vector polylines onto the terrain surface. The fragment's\n\
// tile UV picks a grid cell, then only that cell's line segments (packed in\n\
// tile-local UV space) are tested for proximity. Within the line width, the\n\
// vector color is alpha-composited over the terrain (no discard).\n\
vec4 vectorPolylineRender(vec2 vectorUv, vec3 positionEC, vec4 baseColor)\n\
{\n\
#ifdef HAS_VECTOR_POLYLINES\n\
    // A width in pixels is sized at the fragment's depth, which is independent of the surface orientation.\n\
    mat2 metersFromUv = mat2(u_vectorMetersPerUv.x, 0.0, 0.0, u_vectorMetersPerUv.y);\n\
    float metersPerPixel = czm_metersPerPixel(vec4(positionEC, 1.0));\n\
\n\
    // A tile without polylines binds a 1x1 placeholder; a real grid header\n\
    // [gridWidth, gridHeight, ...] is at least 3 texels.\n\
    ivec2 headerSize = textureSize(u_vectorGridCellIndicesTexture, 0);\n\
    if (headerSize.x * headerSize.y < 3)\n\
    {\n\
        return baseColor;\n\
    }\n\
\n\
    ivec2 range = vectorCellRange(vectorUv, u_vectorGridCellIndicesTexture);\n\
    ivec2 segmentTextureSize = textureSize(u_vectorSegmentTexture, 0);\n\
    ivec2 primitiveTextureSize = textureSize(u_vectorWidthTexture, 0);\n\
\n\
    // Signed distance to the nearest edge, negative inside the line. Consecutive\n\
    // segments overlap at their shared vertex, so only the nearest is composited;\n\
    // compositing each in turn would darken the joints.\n\
    float nearestEdgeDistance = 1.0e30;\n\
    int nearestPrimitiveIndex = -1;\n\
\n\
    for (int i = range.x; i < range.y; i++)\n\
    {\n\
        ivec2 segmentUv = vectorIndexToUv(i, segmentTextureSize);\n\
        vec4 segment = texelFetch(u_vectorSegmentTexture, segmentUv, 0);\n\
\n\
        int primitiveIndex = int(texelFetch(u_vectorSegmentPrimitiveIndicesTexture, segmentUv, 0).r);\n\
        ivec2 primitiveUv = vectorIndexToUv(primitiveIndex, primitiveTextureSize);\n\
\n\
        float width = texelFetch(u_vectorWidthTexture, primitiveUv, 0).r;\n\
        float halfWidth = abs(width) * 0.5;\n\
        vec2 offsetToLine = vectorOffsetToLine(vectorUv, segment);\n\
\n\
#if defined(VECTOR_WIDTH_MIXED_UNITS)\n\
        // A negative width marks a width in meters; see VectorPipeline.\n\
        float halfWidthMeters = width < 0.0 ? halfWidth : halfWidth * metersPerPixel;\n\
#elif defined(VECTOR_WIDTH_IN_METERS)\n\
        float halfWidthMeters = halfWidth;\n\
#else\n\
        float halfWidthMeters = halfWidth * metersPerPixel;\n\
#endif\n\
        float edgeDistance = (length(metersFromUv * offsetToLine) - halfWidthMeters) / metersPerPixel;\n\
\n\
        if (edgeDistance < nearestEdgeDistance)\n\
        {\n\
            nearestEdgeDistance = edgeDistance;\n\
            nearestPrimitiveIndex = primitiveIndex;\n\
        }\n\
\n\
        // Coverage is saturated; no further segment can raise it. Only the nearest\n\
        // segment supplies the color, so overlapping translucent lines do not blend.\n\
        if (nearestEdgeDistance <= -vectorCoverageRadius)\n\
        {\n\
            break;\n\
        }\n\
    }\n\
\n\
    if (nearestEdgeDistance > vectorCoverageRadius)\n\
    {\n\
        return baseColor;\n\
    }\n\
\n\
#ifdef VECTOR_ANTIALIAS\n\
    float coverage = 1.0 - smoothstep(-vectorCoverageRadius, vectorCoverageRadius, nearestEdgeDistance);\n\
#else\n\
    float coverage = 1.0;\n\
#endif\n\
\n\
    vectorPickPrimitiveIndex = nearestPrimitiveIndex;\n\
\n\
    // Alpha-composite vector over terrain.\n\
    ivec2 primitiveUv = vectorIndexToUv(nearestPrimitiveIndex, primitiveTextureSize);\n\
    vec4 vectorColor = texelFetch(u_vectorColorTexture, primitiveUv, 0);\n\
    vectorColor.a *= coverage;\n\
    return vectorColor * vec4(vectorColor.aaa, 1.0) + baseColor * (1.0 - vectorColor.a);\n\
#else\n\
    return baseColor;\n\
#endif\n\
}\n\
\n\
// Composites a polygon's fill over baseColor when the pixel is inside it. A\n\
// negative index (empty cell or first iteration) or an outside pixel is a\n\
// no-op.\n\
vec4 vectorCompositePolygonFill(vec4 baseColor, int primitiveIndex, bool inside, ivec2 primitiveTextureSize)\n\
{\n\
    if (!inside || primitiveIndex < 0)\n\
    {\n\
        return baseColor;\n\
    }\n\
\n\
    vectorPickPrimitiveIndex = primitiveIndex;\n\
\n\
    ivec2 primitiveUv = vectorIndexToUv(primitiveIndex, primitiveTextureSize);\n\
    vec4 fillColor = texelFetch(u_vectorColorTexture, primitiveUv, 0);\n\
    return fillColor * vec4(fillColor.aaa, 1.0) + baseColor * (1.0 - fillColor.a);\n\
}\n\
\n\
// True if a horizontal +x ray from p crosses the edge. The half-open interval\n\
// (> vs <=) counts a ray through a shared vertex exactly once.\n\
bool vectorEdgeCrossesRay(vec4 edge, vec2 p)\n\
{\n\
    if ((edge.y > p.y) == (edge.w > p.y))\n\
    {\n\
        return false;\n\
    }\n\
\n\
    float t = (p.y - edge.y) / (edge.w - edge.y);\n\
    float xIntersect = edge.x + t * (edge.z - edge.x);\n\
    return p.x < xIntersect;\n\
}\n\
\n\
// Drape vector polygon fills onto the terrain surface. The fragment's\n\
// tile UV picks a grid cell whose edges were clipped to the cell on the CPU,\n\
// forming closed loops, so an even-odd horizontal ray cast within the cell\n\
// decides coverage. Edges arrive grouped by primitive; each covering\n\
// primitive's fill color is alpha-composited in primitive order (no discard).\n\
vec4 vectorPolygonRender(vec2 vectorUv, vec4 baseColor)\n\
{\n\
#ifdef HAS_VECTOR_POLYGONS\n\
    ivec2 range = vectorCellRange(vectorUv, u_vectorPolygonGridCellIndicesTexture);\n\
    ivec2 edgeTextureSize = textureSize(u_vectorPolygonEdgeTexture, 0);\n\
    ivec2 primitiveTextureSize = textureSize(u_vectorColorTexture, 0);\n\
\n\
    int currentPrimitive = -1;\n\
    bool inside = false;\n\
\n\
    for (int i = range.x; i < range.y; i++)\n\
    {\n\
        ivec2 edgeUv = vectorIndexToUv(i, edgeTextureSize);\n\
        vec4 edge = texelFetch(u_vectorPolygonEdgeTexture, edgeUv, 0);\n\
        int primitiveIndex = int(texelFetch(u_vectorPolygonEdgePrimitiveIndicesTexture, edgeUv, 0).r);\n\
\n\
        // A new primitive means the previous group is complete: composite it,\n\
        // then start counting the new one fresh.\n\
        if (primitiveIndex != currentPrimitive)\n\
        {\n\
            baseColor = vectorCompositePolygonFill(baseColor, currentPrimitive, inside, primitiveTextureSize);\n\
            currentPrimitive = primitiveIndex;\n\
            inside = false;\n\
        }\n\
\n\
        if (vectorEdgeCrossesRay(edge, vectorUv))\n\
        {\n\
            inside = !inside;\n\
        }\n\
    }\n\
\n\
    // The last primitive group has no trailing edge to trigger its composite.\n\
    baseColor = vectorCompositePolygonFill(baseColor, currentPrimitive, inside, primitiveTextureSize);\n\
\n\
    return baseColor;\n\
#else\n\
    return baseColor;\n\
#endif\n\
}\n\
\n\
// Pick color of the vector draped over this fragment, or the surface's own where none is.\n\
vec4 vectorPickColorOver(vec4 surfacePickColor)\n\
{\n\
    if (vectorPickPrimitiveIndex < 0)\n\
    {\n\
        return surfacePickColor;\n\
    }\n\
\n\
    ivec2 primitiveTextureSize = textureSize(u_vectorPickColorTexture, 0);\n\
    return texelFetch(u_vectorPickColorTexture, vectorIndexToUv(vectorPickPrimitiveIndex, primitiveTextureSize), 0);\n\
}\n\
\n\
// Returns true if uv is inside any polygon in its grid cell\n\
// If performing inverse-clipping, it is up to the caller to negate the result.\n\
bool vectorClip(vec2 uv)\n\
{\n\
    // Clamp to [0, 1] to address small interpolation precision error that can occur at the boundaries of tiles\n\
    uv = clamp(uv, vec2(0.0), vec2(1.0));\n\
    ivec2 range = vectorCellRange(uv, u_clippingGridCellIndicesTexture);\n\
    ivec2 edgeTextureSize = textureSize(u_clippingEdgeTexture, 0);\n\
\n\
    int currentPrimitive = -1;\n\
    bool inside = false;\n\
\n\
    for (int i = range.x; i < range.y; i++)\n\
    {\n\
        ivec2 edgeUv = vectorIndexToUv(i, edgeTextureSize);\n\
        int primitiveIndex = int(texelFetch(u_clippingEdgePrimitiveIndicesTexture, edgeUv, 0).r);\n\
\n\
        // New primitive: the previous group is complete, check if it was inside and return early if so.\n\
        if (primitiveIndex != currentPrimitive)\n\
        {\n\
            if (inside)\n\
            {\n\
                return true;\n\
            }\n\
            currentPrimitive = primitiveIndex;\n\
            inside = false;\n\
        }\n\
\n\
        vec4 edge = texelFetch(u_clippingEdgeTexture, edgeUv, 0);\n\
        if (vectorEdgeCrossesRay(edge, uv))\n\
        {\n\
            inside = !inside;\n\
        }\n\
    }\n\
\n\
    return inside; // last group\n\
}\n\
";
