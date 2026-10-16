declare module "@cesium/core" {
/**
 * Enum containing WebGL Constant values by name.
 * for use without an active WebGL context, or in cases where certain constants are unavailable using the WebGL context
 * (For example, in [Safari 9]{@link https://github.com/CesiumGS/cesium/issues/2989}).
 *
 * These match the constants from the [WebGL 1.0]{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
 * and [WebGL 2.0]{@link https://www.khronos.org/registry/webgl/specs/latest/2.0/}
 * specifications.
 */
export enum WebGLConstants {
    DEPTH_BUFFER_BIT = 256,
    STENCIL_BUFFER_BIT = 1024,
    COLOR_BUFFER_BIT = 16384,
    POINTS = 0,
    LINES = 1,
    LINE_LOOP = 2,
    LINE_STRIP = 3,
    TRIANGLES = 4,
    TRIANGLE_STRIP = 5,
    TRIANGLE_FAN = 6,
    ZERO = 0,
    ONE = 1,
    SRC_COLOR = 768,
    ONE_MINUS_SRC_COLOR = 769,
    SRC_ALPHA = 770,
    ONE_MINUS_SRC_ALPHA = 771,
    DST_ALPHA = 772,
    ONE_MINUS_DST_ALPHA = 773,
    DST_COLOR = 774,
    ONE_MINUS_DST_COLOR = 775,
    SRC_ALPHA_SATURATE = 776,
    FUNC_ADD = 32774,
    BLEND_EQUATION = 32777,
    BLEND_EQUATION_RGB = 32777,
    BLEND_EQUATION_ALPHA = 34877,
    FUNC_SUBTRACT = 32778,
    FUNC_REVERSE_SUBTRACT = 32779,
    BLEND_DST_RGB = 32968,
    BLEND_SRC_RGB = 32969,
    BLEND_DST_ALPHA = 32970,
    BLEND_SRC_ALPHA = 32971,
    CONSTANT_COLOR = 32769,
    ONE_MINUS_CONSTANT_COLOR = 32770,
    CONSTANT_ALPHA = 32771,
    ONE_MINUS_CONSTANT_ALPHA = 32772,
    BLEND_COLOR = 32773,
    ARRAY_BUFFER = 34962,
    ELEMENT_ARRAY_BUFFER = 34963,
    ARRAY_BUFFER_BINDING = 34964,
    ELEMENT_ARRAY_BUFFER_BINDING = 34965,
    STREAM_DRAW = 35040,
    STATIC_DRAW = 35044,
    DYNAMIC_DRAW = 35048,
    BUFFER_SIZE = 34660,
    BUFFER_USAGE = 34661,
    CURRENT_VERTEX_ATTRIB = 34342,
    FRONT = 1028,
    BACK = 1029,
    FRONT_AND_BACK = 1032,
    CULL_FACE = 2884,
    BLEND = 3042,
    DITHER = 3024,
    STENCIL_TEST = 2960,
    DEPTH_TEST = 2929,
    SCISSOR_TEST = 3089,
    POLYGON_OFFSET_FILL = 32823,
    SAMPLE_ALPHA_TO_COVERAGE = 32926,
    SAMPLE_COVERAGE = 32928,
    NO_ERROR = 0,
    INVALID_ENUM = 1280,
    INVALID_VALUE = 1281,
    INVALID_OPERATION = 1282,
    OUT_OF_MEMORY = 1285,
    CW = 2304,
    CCW = 2305,
    LINE_WIDTH = 2849,
    ALIASED_POINT_SIZE_RANGE = 33901,
    ALIASED_LINE_WIDTH_RANGE = 33902,
    CULL_FACE_MODE = 2885,
    FRONT_FACE = 2886,
    DEPTH_RANGE = 2928,
    DEPTH_WRITEMASK = 2930,
    DEPTH_CLEAR_VALUE = 2931,
    DEPTH_FUNC = 2932,
    STENCIL_CLEAR_VALUE = 2961,
    STENCIL_FUNC = 2962,
    STENCIL_FAIL = 2964,
    STENCIL_PASS_DEPTH_FAIL = 2965,
    STENCIL_PASS_DEPTH_PASS = 2966,
    STENCIL_REF = 2967,
    STENCIL_VALUE_MASK = 2963,
    STENCIL_WRITEMASK = 2968,
    STENCIL_BACK_FUNC = 34816,
    STENCIL_BACK_FAIL = 34817,
    STENCIL_BACK_PASS_DEPTH_FAIL = 34818,
    STENCIL_BACK_PASS_DEPTH_PASS = 34819,
    STENCIL_BACK_REF = 36003,
    STENCIL_BACK_VALUE_MASK = 36004,
    STENCIL_BACK_WRITEMASK = 36005,
    VIEWPORT = 2978,
    SCISSOR_BOX = 3088,
    COLOR_CLEAR_VALUE = 3106,
    COLOR_WRITEMASK = 3107,
    UNPACK_ALIGNMENT = 3317,
    PACK_ALIGNMENT = 3333,
    MAX_TEXTURE_SIZE = 3379,
    MAX_VIEWPORT_DIMS = 3386,
    SUBPIXEL_BITS = 3408,
    RED_BITS = 3410,
    GREEN_BITS = 3411,
    BLUE_BITS = 3412,
    ALPHA_BITS = 3413,
    DEPTH_BITS = 3414,
    STENCIL_BITS = 3415,
    POLYGON_OFFSET_UNITS = 10752,
    POLYGON_OFFSET_FACTOR = 32824,
    TEXTURE_BINDING_2D = 32873,
    SAMPLE_BUFFERS = 32936,
    SAMPLES = 32937,
    SAMPLE_COVERAGE_VALUE = 32938,
    SAMPLE_COVERAGE_INVERT = 32939,
    COMPRESSED_TEXTURE_FORMATS = 34467,
    DONT_CARE = 4352,
    FASTEST = 4353,
    NICEST = 4354,
    GENERATE_MIPMAP_HINT = 33170,
    BYTE = 5120,
    UNSIGNED_BYTE = 5121,
    SHORT = 5122,
    UNSIGNED_SHORT = 5123,
    INT = 5124,
    UNSIGNED_INT = 5125,
    FLOAT = 5126,
    DEPTH_COMPONENT = 6402,
    ALPHA = 6406,
    RGB = 6407,
    RGBA = 6408,
    LUMINANCE = 6409,
    LUMINANCE_ALPHA = 6410,
    UNSIGNED_SHORT_4_4_4_4 = 32819,
    UNSIGNED_SHORT_5_5_5_1 = 32820,
    UNSIGNED_SHORT_5_6_5 = 33635,
    FRAGMENT_SHADER = 35632,
    VERTEX_SHADER = 35633,
    MAX_VERTEX_ATTRIBS = 34921,
    MAX_VERTEX_UNIFORM_VECTORS = 36347,
    MAX_VARYING_VECTORS = 36348,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660,
    MAX_TEXTURE_IMAGE_UNITS = 34930,
    MAX_FRAGMENT_UNIFORM_VECTORS = 36349,
    SHADER_TYPE = 35663,
    DELETE_STATUS = 35712,
    LINK_STATUS = 35714,
    VALIDATE_STATUS = 35715,
    ATTACHED_SHADERS = 35717,
    ACTIVE_UNIFORMS = 35718,
    ACTIVE_ATTRIBUTES = 35721,
    SHADING_LANGUAGE_VERSION = 35724,
    CURRENT_PROGRAM = 35725,
    NEVER = 512,
    LESS = 513,
    EQUAL = 514,
    LEQUAL = 515,
    GREATER = 516,
    NOTEQUAL = 517,
    GEQUAL = 518,
    ALWAYS = 519,
    KEEP = 7680,
    REPLACE = 7681,
    INCR = 7682,
    DECR = 7683,
    INVERT = 5386,
    INCR_WRAP = 34055,
    DECR_WRAP = 34056,
    VENDOR = 7936,
    RENDERER = 7937,
    VERSION = 7938,
    NEAREST = 9728,
    LINEAR = 9729,
    NEAREST_MIPMAP_NEAREST = 9984,
    LINEAR_MIPMAP_NEAREST = 9985,
    NEAREST_MIPMAP_LINEAR = 9986,
    LINEAR_MIPMAP_LINEAR = 9987,
    TEXTURE_MAG_FILTER = 10240,
    TEXTURE_MIN_FILTER = 10241,
    TEXTURE_WRAP_S = 10242,
    TEXTURE_WRAP_T = 10243,
    TEXTURE_2D = 3553,
    TEXTURE = 5890,
    TEXTURE_CUBE_MAP = 34067,
    TEXTURE_BINDING_CUBE_MAP = 34068,
    TEXTURE_CUBE_MAP_POSITIVE_X = 34069,
    TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,
    TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,
    TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,
    TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,
    TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074,
    MAX_CUBE_MAP_TEXTURE_SIZE = 34076,
    TEXTURE0 = 33984,
    TEXTURE1 = 33985,
    TEXTURE2 = 33986,
    TEXTURE3 = 33987,
    TEXTURE4 = 33988,
    TEXTURE5 = 33989,
    TEXTURE6 = 33990,
    TEXTURE7 = 33991,
    TEXTURE8 = 33992,
    TEXTURE9 = 33993,
    TEXTURE10 = 33994,
    TEXTURE11 = 33995,
    TEXTURE12 = 33996,
    TEXTURE13 = 33997,
    TEXTURE14 = 33998,
    TEXTURE15 = 33999,
    TEXTURE16 = 34000,
    TEXTURE17 = 34001,
    TEXTURE18 = 34002,
    TEXTURE19 = 34003,
    TEXTURE20 = 34004,
    TEXTURE21 = 34005,
    TEXTURE22 = 34006,
    TEXTURE23 = 34007,
    TEXTURE24 = 34008,
    TEXTURE25 = 34009,
    TEXTURE26 = 34010,
    TEXTURE27 = 34011,
    TEXTURE28 = 34012,
    TEXTURE29 = 34013,
    TEXTURE30 = 34014,
    TEXTURE31 = 34015,
    ACTIVE_TEXTURE = 34016,
    REPEAT = 10497,
    CLAMP_TO_EDGE = 33071,
    MIRRORED_REPEAT = 33648,
    FLOAT_VEC2 = 35664,
    FLOAT_VEC3 = 35665,
    FLOAT_VEC4 = 35666,
    INT_VEC2 = 35667,
    INT_VEC3 = 35668,
    INT_VEC4 = 35669,
    BOOL = 35670,
    BOOL_VEC2 = 35671,
    BOOL_VEC3 = 35672,
    BOOL_VEC4 = 35673,
    FLOAT_MAT2 = 35674,
    FLOAT_MAT3 = 35675,
    FLOAT_MAT4 = 35676,
    SAMPLER_2D = 35678,
    SAMPLER_CUBE = 35680,
    VERTEX_ATTRIB_ARRAY_ENABLED = 34338,
    VERTEX_ATTRIB_ARRAY_SIZE = 34339,
    VERTEX_ATTRIB_ARRAY_STRIDE = 34340,
    VERTEX_ATTRIB_ARRAY_TYPE = 34341,
    VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922,
    VERTEX_ATTRIB_ARRAY_POINTER = 34373,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975,
    IMPLEMENTATION_COLOR_READ_TYPE = 35738,
    IMPLEMENTATION_COLOR_READ_FORMAT = 35739,
    COMPILE_STATUS = 35713,
    LOW_FLOAT = 36336,
    MEDIUM_FLOAT = 36337,
    HIGH_FLOAT = 36338,
    LOW_INT = 36339,
    MEDIUM_INT = 36340,
    HIGH_INT = 36341,
    FRAMEBUFFER = 36160,
    RENDERBUFFER = 36161,
    RGBA4 = 32854,
    RGB5_A1 = 32855,
    RGB565 = 36194,
    DEPTH_COMPONENT16 = 33189,
    STENCIL_INDEX = 6401,
    STENCIL_INDEX8 = 36168,
    DEPTH_STENCIL = 34041,
    RENDERBUFFER_WIDTH = 36162,
    RENDERBUFFER_HEIGHT = 36163,
    RENDERBUFFER_INTERNAL_FORMAT = 36164,
    RENDERBUFFER_RED_SIZE = 36176,
    RENDERBUFFER_GREEN_SIZE = 36177,
    RENDERBUFFER_BLUE_SIZE = 36178,
    RENDERBUFFER_ALPHA_SIZE = 36179,
    RENDERBUFFER_DEPTH_SIZE = 36180,
    RENDERBUFFER_STENCIL_SIZE = 36181,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051,
    COLOR_ATTACHMENT0 = 36064,
    DEPTH_ATTACHMENT = 36096,
    STENCIL_ATTACHMENT = 36128,
    DEPTH_STENCIL_ATTACHMENT = 33306,
    NONE = 0,
    FRAMEBUFFER_COMPLETE = 36053,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057,
    FRAMEBUFFER_UNSUPPORTED = 36061,
    FRAMEBUFFER_BINDING = 36006,
    RENDERBUFFER_BINDING = 36007,
    MAX_RENDERBUFFER_SIZE = 34024,
    INVALID_FRAMEBUFFER_OPERATION = 1286,
    UNPACK_FLIP_Y_WEBGL = 37440,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441,
    CONTEXT_LOST_WEBGL = 37442,
    UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443,
    BROWSER_DEFAULT_WEBGL = 37444,
    COMPRESSED_RGB_S3TC_DXT1_EXT = 33776,
    COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777,
    COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778,
    COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779,
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840,
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841,
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842,
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843,
    COMPRESSED_RGBA_ASTC_4x4_WEBGL = 37808,
    COMPRESSED_RGB_ETC1_WEBGL = 36196,
    COMPRESSED_RGBA_BPTC_UNORM = 36492,
    HALF_FLOAT_OES = 36193,
    DOUBLE = 5130,
    READ_BUFFER = 3074,
    UNPACK_ROW_LENGTH = 3314,
    UNPACK_SKIP_ROWS = 3315,
    UNPACK_SKIP_PIXELS = 3316,
    PACK_ROW_LENGTH = 3330,
    PACK_SKIP_ROWS = 3331,
    PACK_SKIP_PIXELS = 3332,
    COLOR = 6144,
    DEPTH = 6145,
    STENCIL = 6146,
    RED = 6403,
    RGB8 = 32849,
    RGBA8 = 32856,
    RGB10_A2 = 32857,
    TEXTURE_BINDING_3D = 32874,
    UNPACK_SKIP_IMAGES = 32877,
    UNPACK_IMAGE_HEIGHT = 32878,
    TEXTURE_3D = 32879,
    TEXTURE_WRAP_R = 32882,
    MAX_3D_TEXTURE_SIZE = 32883,
    UNSIGNED_INT_2_10_10_10_REV = 33640,
    MAX_ELEMENTS_VERTICES = 33000,
    MAX_ELEMENTS_INDICES = 33001,
    TEXTURE_MIN_LOD = 33082,
    TEXTURE_MAX_LOD = 33083,
    TEXTURE_BASE_LEVEL = 33084,
    TEXTURE_MAX_LEVEL = 33085,
    MIN = 32775,
    MAX = 32776,
    DEPTH_COMPONENT24 = 33190,
    MAX_TEXTURE_LOD_BIAS = 34045,
    TEXTURE_COMPARE_MODE = 34892,
    TEXTURE_COMPARE_FUNC = 34893,
    CURRENT_QUERY = 34917,
    QUERY_RESULT = 34918,
    QUERY_RESULT_AVAILABLE = 34919,
    STREAM_READ = 35041,
    STREAM_COPY = 35042,
    STATIC_READ = 35045,
    STATIC_COPY = 35046,
    DYNAMIC_READ = 35049,
    DYNAMIC_COPY = 35050,
    MAX_DRAW_BUFFERS = 34852,
    DRAW_BUFFER0 = 34853,
    DRAW_BUFFER1 = 34854,
    DRAW_BUFFER2 = 34855,
    DRAW_BUFFER3 = 34856,
    DRAW_BUFFER4 = 34857,
    DRAW_BUFFER5 = 34858,
    DRAW_BUFFER6 = 34859,
    DRAW_BUFFER7 = 34860,
    DRAW_BUFFER8 = 34861,
    DRAW_BUFFER9 = 34862,
    DRAW_BUFFER10 = 34863,
    DRAW_BUFFER11 = 34864,
    DRAW_BUFFER12 = 34865,
    DRAW_BUFFER13 = 34866,
    DRAW_BUFFER14 = 34867,
    DRAW_BUFFER15 = 34868,
    MAX_FRAGMENT_UNIFORM_COMPONENTS = 35657,
    MAX_VERTEX_UNIFORM_COMPONENTS = 35658,
    SAMPLER_3D = 35679,
    SAMPLER_2D_SHADOW = 35682,
    FRAGMENT_SHADER_DERIVATIVE_HINT = 35723,
    PIXEL_PACK_BUFFER = 35051,
    PIXEL_UNPACK_BUFFER = 35052,
    PIXEL_PACK_BUFFER_BINDING = 35053,
    PIXEL_UNPACK_BUFFER_BINDING = 35055,
    FLOAT_MAT2x3 = 35685,
    FLOAT_MAT2x4 = 35686,
    FLOAT_MAT3x2 = 35687,
    FLOAT_MAT3x4 = 35688,
    FLOAT_MAT4x2 = 35689,
    FLOAT_MAT4x3 = 35690,
    SRGB = 35904,
    SRGB8 = 35905,
    SRGB8_ALPHA8 = 35907,
    COMPARE_REF_TO_TEXTURE = 34894,
    RGBA32F = 34836,
    RGB32F = 34837,
    RGBA16F = 34842,
    RGB16F = 34843,
    VERTEX_ATTRIB_ARRAY_INTEGER = 35069,
    MAX_ARRAY_TEXTURE_LAYERS = 35071,
    MIN_PROGRAM_TEXEL_OFFSET = 35076,
    MAX_PROGRAM_TEXEL_OFFSET = 35077,
    MAX_VARYING_COMPONENTS = 35659,
    TEXTURE_2D_ARRAY = 35866,
    TEXTURE_BINDING_2D_ARRAY = 35869,
    R11F_G11F_B10F = 35898,
    UNSIGNED_INT_10F_11F_11F_REV = 35899,
    RGB9_E5 = 35901,
    UNSIGNED_INT_5_9_9_9_REV = 35902,
    TRANSFORM_FEEDBACK_BUFFER_MODE = 35967,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 35968,
    TRANSFORM_FEEDBACK_VARYINGS = 35971,
    TRANSFORM_FEEDBACK_BUFFER_START = 35972,
    TRANSFORM_FEEDBACK_BUFFER_SIZE = 35973,
    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 35976,
    RASTERIZER_DISCARD = 35977,
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 35978,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 35979,
    INTERLEAVED_ATTRIBS = 35980,
    SEPARATE_ATTRIBS = 35981,
    TRANSFORM_FEEDBACK_BUFFER = 35982,
    TRANSFORM_FEEDBACK_BUFFER_BINDING = 35983,
    RGBA32UI = 36208,
    RGB32UI = 36209,
    RGBA16UI = 36214,
    RGB16UI = 36215,
    RGBA8UI = 36220,
    RGB8UI = 36221,
    RGBA32I = 36226,
    RGB32I = 36227,
    RGBA16I = 36232,
    RGB16I = 36233,
    RGBA8I = 36238,
    RGB8I = 36239,
    RED_INTEGER = 36244,
    RGB_INTEGER = 36248,
    RGBA_INTEGER = 36249,
    SAMPLER_2D_ARRAY = 36289,
    SAMPLER_2D_ARRAY_SHADOW = 36292,
    SAMPLER_CUBE_SHADOW = 36293,
    UNSIGNED_INT_VEC2 = 36294,
    UNSIGNED_INT_VEC3 = 36295,
    UNSIGNED_INT_VEC4 = 36296,
    INT_SAMPLER_2D = 36298,
    INT_SAMPLER_3D = 36299,
    INT_SAMPLER_CUBE = 36300,
    INT_SAMPLER_2D_ARRAY = 36303,
    UNSIGNED_INT_SAMPLER_2D = 36306,
    UNSIGNED_INT_SAMPLER_3D = 36307,
    UNSIGNED_INT_SAMPLER_CUBE = 36308,
    UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311,
    DEPTH_COMPONENT32F = 36012,
    DEPTH32F_STENCIL8 = 36013,
    FLOAT_32_UNSIGNED_INT_24_8_REV = 36269,
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 33296,
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 33297,
    FRAMEBUFFER_ATTACHMENT_RED_SIZE = 33298,
    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 33299,
    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 33300,
    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 33301,
    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 33302,
    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 33303,
    FRAMEBUFFER_DEFAULT = 33304,
    UNSIGNED_INT_24_8 = 34042,
    DEPTH24_STENCIL8 = 35056,
    UNSIGNED_NORMALIZED = 35863,
    DRAW_FRAMEBUFFER_BINDING = 36006,
    READ_FRAMEBUFFER = 36008,
    DRAW_FRAMEBUFFER = 36009,
    READ_FRAMEBUFFER_BINDING = 36010,
    RENDERBUFFER_SAMPLES = 36011,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 36052,
    MAX_COLOR_ATTACHMENTS = 36063,
    COLOR_ATTACHMENT1 = 36065,
    COLOR_ATTACHMENT2 = 36066,
    COLOR_ATTACHMENT3 = 36067,
    COLOR_ATTACHMENT4 = 36068,
    COLOR_ATTACHMENT5 = 36069,
    COLOR_ATTACHMENT6 = 36070,
    COLOR_ATTACHMENT7 = 36071,
    COLOR_ATTACHMENT8 = 36072,
    COLOR_ATTACHMENT9 = 36073,
    COLOR_ATTACHMENT10 = 36074,
    COLOR_ATTACHMENT11 = 36075,
    COLOR_ATTACHMENT12 = 36076,
    COLOR_ATTACHMENT13 = 36077,
    COLOR_ATTACHMENT14 = 36078,
    COLOR_ATTACHMENT15 = 36079,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 36182,
    MAX_SAMPLES = 36183,
    HALF_FLOAT = 5131,
    RG = 33319,
    RG_INTEGER = 33320,
    R8 = 33321,
    RG8 = 33323,
    R16F = 33325,
    R32F = 33326,
    RG16F = 33327,
    RG32F = 33328,
    R8I = 33329,
    R8UI = 33330,
    R16I = 33331,
    R16UI = 33332,
    R32I = 33333,
    R32UI = 33334,
    RG8I = 33335,
    RG8UI = 33336,
    RG16I = 33337,
    RG16UI = 33338,
    RG32I = 33339,
    RG32UI = 33340,
    VERTEX_ARRAY_BINDING = 34229,
    R8_SNORM = 36756,
    RG8_SNORM = 36757,
    RGB8_SNORM = 36758,
    RGBA8_SNORM = 36759,
    SIGNED_NORMALIZED = 36764,
    COPY_READ_BUFFER = 36662,
    COPY_WRITE_BUFFER = 36663,
    COPY_READ_BUFFER_BINDING = 36662,
    COPY_WRITE_BUFFER_BINDING = 36663,
    UNIFORM_BUFFER = 35345,
    UNIFORM_BUFFER_BINDING = 35368,
    UNIFORM_BUFFER_START = 35369,
    UNIFORM_BUFFER_SIZE = 35370,
    MAX_VERTEX_UNIFORM_BLOCKS = 35371,
    MAX_FRAGMENT_UNIFORM_BLOCKS = 35373,
    MAX_COMBINED_UNIFORM_BLOCKS = 35374,
    MAX_UNIFORM_BUFFER_BINDINGS = 35375,
    MAX_UNIFORM_BLOCK_SIZE = 35376,
    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 35377,
    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 35379,
    UNIFORM_BUFFER_OFFSET_ALIGNMENT = 35380,
    ACTIVE_UNIFORM_BLOCKS = 35382,
    UNIFORM_TYPE = 35383,
    UNIFORM_SIZE = 35384,
    UNIFORM_BLOCK_INDEX = 35386,
    UNIFORM_OFFSET = 35387,
    UNIFORM_ARRAY_STRIDE = 35388,
    UNIFORM_MATRIX_STRIDE = 35389,
    UNIFORM_IS_ROW_MAJOR = 35390,
    UNIFORM_BLOCK_BINDING = 35391,
    UNIFORM_BLOCK_DATA_SIZE = 35392,
    UNIFORM_BLOCK_ACTIVE_UNIFORMS = 35394,
    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395,
    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396,
    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398,
    INVALID_INDEX = 4294967295,
    MAX_VERTEX_OUTPUT_COMPONENTS = 37154,
    MAX_FRAGMENT_INPUT_COMPONENTS = 37157,
    MAX_SERVER_WAIT_TIMEOUT = 37137,
    OBJECT_TYPE = 37138,
    SYNC_CONDITION = 37139,
    SYNC_STATUS = 37140,
    SYNC_FLAGS = 37141,
    SYNC_FENCE = 37142,
    SYNC_GPU_COMMANDS_COMPLETE = 37143,
    UNSIGNALED = 37144,
    SIGNALED = 37145,
    ALREADY_SIGNALED = 37146,
    TIMEOUT_EXPIRED = 37147,
    CONDITION_SATISFIED = 37148,
    WAIT_FAILED = 37149,
    SYNC_FLUSH_COMMANDS_BIT = 1,
    VERTEX_ATTRIB_ARRAY_DIVISOR = 35070,
    ANY_SAMPLES_PASSED = 35887,
    ANY_SAMPLES_PASSED_CONSERVATIVE = 36202,
    SAMPLER_BINDING = 35097,
    RGB10_A2UI = 36975,
    INT_2_10_10_10_REV = 36255,
    TRANSFORM_FEEDBACK = 36386,
    TRANSFORM_FEEDBACK_PAUSED = 36387,
    TRANSFORM_FEEDBACK_ACTIVE = 36388,
    TRANSFORM_FEEDBACK_BINDING = 36389,
    COMPRESSED_R11_EAC = 37488,
    COMPRESSED_SIGNED_R11_EAC = 37489,
    COMPRESSED_RG11_EAC = 37490,
    COMPRESSED_SIGNED_RG11_EAC = 37491,
    COMPRESSED_RGB8_ETC2 = 37492,
    COMPRESSED_SRGB8_ETC2 = 37493,
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494,
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495,
    COMPRESSED_RGBA8_ETC2_EAC = 37496,
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497,
    TEXTURE_IMMUTABLE_FORMAT = 37167,
    MAX_ELEMENT_INDEX = 36203,
    TEXTURE_IMMUTABLE_LEVELS = 33503,
    MAX_TEXTURE_MAX_ANISOTROPY_EXT = 34047
}

/**
 * ArcType defines the path that should be taken connecting vertices.
 */
export enum ArcType {
    /**
     * Straight line that does not conform to the surface of the ellipsoid.
     */
    NONE = 0,
    /**
     * Follow geodesic path.
     */
    GEODESIC = 1,
    /**
     * Follow rhumb or loxodrome path.
     */
    RHUMB = 2
}

/**
 * A collection of key-value pairs that is stored as a hash for easy
 * lookup but also provides an array for fast iteration.
 */
export class AssociativeArray<T = unknown> {
    /**
     * Gets the number of items in the collection.
     */
    length: number;
    /**
     * Gets an unordered array of all values in the collection.
     * This is a live array that will automatically reflect the values in the collection,
     * it should not be modified directly.
     */
    values: T[];
    /**
     * Determines if the provided key is in the array.
     * @param key - The key to check.
     * @returns <code>true</code> if the key is in the array, <code>false</code> otherwise.
     */
    contains(key: string | number): boolean;
    /**
     * Associates the provided key with the provided value.  If the key already
     * exists, it is overwritten with the new value.
     * @param key - A unique identifier.
     * @param value - The value to associate with the provided key.
     */
    set(key: string | number, value: T): void;
    /**
     * Retrieves the value associated with the provided key.
     * @param key - The key whose value is to be retrieved.
     * @returns The associated value, or undefined if the key does not exist in the collection.
     */
    get(key: string | number): T;
    /**
     * Removes a key-value pair from the collection.
     * @param key - The key to be removed.
     * @returns True if it was removed, false if the key was not in the collection.
     */
    remove(key: string | number): boolean;
    /**
     * Clears the collection.
     */
    removeAll(): void;
}

/**
 * Attribute compression and decompression functions.
 */
export namespace AttributeCompression {
    /**
     * Encodes a normalized vector into 2 SNORM values in the range of [0-rangeMax] following the 'oct' encoding.
     *
     * Oct encoding is a compact representation of unit length vectors.
     * The 'oct' encoding is described in "A Survey of Efficient Representations of Independent Unit Vectors",
     * Cigolle et al 2014: {@link http://jcgt.org/published/0003/02/01/}
     * @param vector - The normalized vector to be compressed into 2 component 'oct' encoding.
     * @param result - The 2 component oct-encoded unit length vector.
     * @param rangeMax - The maximum value of the SNORM range. The encoded vector is stored in log2(rangeMax+1) bits.
     * @returns The 2 component oct-encoded unit length vector.
     */
    function octEncodeInRange(vector: Cartesian3, result: Cartesian2, rangeMax: number): Cartesian2;
    /**
     * Encodes a normalized vector into 2 SNORM values in the range of [0-255] following the 'oct' encoding.
     * @param vector - The normalized vector to be compressed into 2 byte 'oct' encoding.
     * @param result - The 2 byte oct-encoded unit length vector.
     * @returns The 2 byte oct-encoded unit length vector.
     */
    function octEncode(vector: Cartesian3, result: Cartesian2): Cartesian2;
    /**
     * @param vector - The normalized vector to be compressed into 4 byte 'oct' encoding.
     * @param result - The 4 byte oct-encoded unit length vector.
     * @returns The 4 byte oct-encoded unit length vector.
     */
    function octEncodeToCartesian4(vector: Cartesian3, result: Cartesian4): Cartesian4;
    /**
     * Decodes a unit-length vector in 'oct' encoding to a normalized 3-component vector.
     * @param x - The x component of the oct-encoded unit length vector.
     * @param y - The y component of the oct-encoded unit length vector.
     * @param rangeMax - The maximum value of the SNORM range. The encoded vector is stored in log2(rangeMax+1) bits.
     * @param result - The decoded and normalized vector
     * @returns The decoded and normalized vector.
     */
    function octDecodeInRange(x: number, y: number, rangeMax: number, result: Cartesian3): Cartesian3;
    /**
     * Decodes a unit-length vector in 2 byte 'oct' encoding to a normalized 3-component vector.
     * @param x - The x component of the oct-encoded unit length vector.
     * @param y - The y component of the oct-encoded unit length vector.
     * @param result - The decoded and normalized vector.
     * @returns The decoded and normalized vector.
     */
    function octDecode(x: number, y: number, result: Cartesian3): Cartesian3;
    /**
     * Decodes a unit-length vector in 4 byte 'oct' encoding to a normalized 3-component vector.
     * @param encoded - The oct-encoded unit length vector.
     * @param result - The decoded and normalized vector.
     * @returns The decoded and normalized vector.
     */
    function octDecodeFromCartesian4(encoded: Cartesian4, result: Cartesian3): Cartesian3;
    /**
     * Packs an oct encoded vector into a single floating-point number.
     * @param encoded - The oct encoded vector.
     * @returns The oct encoded vector packed into a single float.
     */
    function octPackFloat(encoded: Cartesian2): number;
    /**
     * Encodes a normalized vector into 2 SNORM values in the range of [0-255] following the 'oct' encoding and
     * stores those values in a single float-point number.
     * @param vector - The normalized vector to be compressed into 2 byte 'oct' encoding.
     * @returns The 2 byte oct-encoded unit length vector.
     */
    function octEncodeFloat(vector: Cartesian3): number;
    /**
     * Decodes a unit-length vector in 'oct' encoding packed in a floating-point number to a normalized 3-component vector.
     * @param value - The oct-encoded unit length vector stored as a single floating-point number.
     * @param result - The decoded and normalized vector
     * @returns The decoded and normalized vector.
     */
    function octDecodeFloat(value: number, result: Cartesian3): Cartesian3;
    /**
     * Encodes three normalized vectors into 6 SNORM values in the range of [0-255] following the 'oct' encoding and
     * packs those into two floating-point numbers.
     * @param v1 - A normalized vector to be compressed.
     * @param v2 - A normalized vector to be compressed.
     * @param v3 - A normalized vector to be compressed.
     * @param result - The 'oct' encoded vectors packed into two floating-point numbers.
     * @returns The 'oct' encoded vectors packed into two floating-point numbers.
     */
    function octPack(v1: Cartesian3, v2: Cartesian3, v3: Cartesian3, result: Cartesian2): Cartesian2;
    /**
     * Decodes three unit-length vectors in 'oct' encoding packed into a floating-point number to a normalized 3-component vector.
     * @param packed - The three oct-encoded unit length vectors stored as two floating-point number.
     * @param v1 - One decoded and normalized vector.
     * @param v2 - One decoded and normalized vector.
     * @param v3 - One decoded and normalized vector.
     */
    function octUnpack(packed: Cartesian2, v1: Cartesian3, v2: Cartesian3, v3: Cartesian3): void;
    /**
     * Pack texture coordinates into a single float. The texture coordinates will only preserve 12 bits of precision.
     * @param textureCoordinates - The texture coordinates to compress.  Both coordinates must be in the range 0.0-1.0.
     * @returns The packed texture coordinates.
     */
    function compressTextureCoordinates(textureCoordinates: Cartesian2): number;
    /**
     * Decompresses texture coordinates that were packed into a single float.
     * @param compressed - The compressed texture coordinates.
     * @param result - The decompressed texture coordinates.
     * @returns The modified result parameter.
     */
    function decompressTextureCoordinates(compressed: number, result: Cartesian2): Cartesian2;
    /**
     * Decodes delta and ZigZag encoded vertices. This modifies the buffers in place.
     * @param uBuffer - The buffer view of u values.
     * @param vBuffer - The buffer view of v values.
     * @param [heightBuffer] - The buffer view of height values.
     */
    function zigZagDeltaDecode(uBuffer: Uint16Array, vBuffer: Uint16Array, heightBuffer?: Uint16Array): void;
    /**
     * Dequantizes a quantized typed array into a floating point typed array.
     * @param typedArray - The typed array for the quantized data.
     * @param componentDatatype - The component datatype of the quantized data.
     * @param type - The attribute type of the quantized data.
     * @param count - The number of attributes referenced in the dequantized array.
     * @returns The dequantized array.
     */
    function dequantize(typedArray: Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array, componentDatatype: ComponentDatatype, type: AttributeType, count: number): Float32Array;
    /**
     * Encodes RGB values at 8-bit precision into a single float, equivalent
     * to 0xFFFFFF representation in JavaScript. Perceptually near-lossless
     * in the "srgb" color space; "srgb-linear" and wide-gamut color spaces
     * benefit from 10+ bit precision.
     */
    function encodeRGB8(color: Color): number;
    /**
     * Decodes RGB values at 8-bit precision from a signle float, equivalent
     * to 0xFFFFFF representation in JavaScript. Perceptually near-lossless
     * in the "srgb" color space; "srgb-linear" and wide-gamut color spaces
     * benefit from 10+ bit precision.
     */
    function decodeRGB8(encoded: number, result: Color): Color;
    /**
     * Decode RGB565-encoded colors into a floating point typed array containing
     * normalized RGB values.
     * @param typedArray - Array of RGB565 values
     * @param [result] - Array to store the normalized VEC3 result
     */
    function decodeRGB565(typedArray: Uint16Array, result?: Float32Array): void;
}

/**
 * An enum describing the attribute type for glTF and 3D Tiles.
 */
export enum AttributeType {
    /**
     * The attribute is a single component.
     */
    SCALAR = "SCALAR",
    /**
     * The attribute is a two-component vector.
     */
    VEC2 = "VEC2",
    /**
     * The attribute is a three-component vector.
     */
    VEC3 = "VEC3",
    /**
     * The attribute is a four-component vector.
     */
    VEC4 = "VEC4",
    /**
     * The attribute is a 2x2 matrix.
     */
    MAT2 = "MAT2",
    /**
     * The attribute is a 3x3 matrix.
     */
    MAT3 = "MAT3",
    /**
     * The attribute is a 4x4 matrix.
     */
    MAT4 = "MAT4"
}

/**
 * Creates an instance of an AxisAlignedBoundingBox from the minimum and maximum points along the x, y, and z axes.
 * @param [minimum = Cartesian3.ZERO] - The minimum point along the x, y, and z axes.
 * @param [maximum = Cartesian3.ZERO] - The maximum point along the x, y, and z axes.
 * @param [center] - The center of the box; automatically computed if not supplied.
 */
export class AxisAlignedBoundingBox {
    constructor(minimum?: Cartesian3, maximum?: Cartesian3, center?: Cartesian3);
    /**
     * The minimum point defining the bounding box.
     */
    minimum: Cartesian3;
    /**
     * The maximum point defining the bounding box.
     */
    maximum: Cartesian3;
    /**
     * The center point of the bounding box.
     */
    center: Cartesian3;
    /**
     * Creates an instance of an AxisAlignedBoundingBox from its corners.
     * @example
     * // Compute an axis aligned bounding box from the two corners.
     * const box = Cesium.AxisAlignedBoundingBox.fromCorners(new Cesium.Cartesian3(-1, -1, -1), new Cesium.Cartesian3(1, 1, 1));
     * @param minimum - The minimum point along the x, y, and z axes.
     * @param maximum - The maximum point along the x, y, and z axes.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new AxisAlignedBoundingBox instance if one was not provided.
     */
    static fromCorners(minimum: Cartesian3, maximum: Cartesian3, result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;
    /**
     * Computes an instance of an AxisAlignedBoundingBox. The box is determined by
     * finding the points spaced the farthest apart on the x, y, and z axes.
     * @example
     * // Compute an axis aligned bounding box enclosing two points.
     * const box = Cesium.AxisAlignedBoundingBox.fromPoints([new Cesium.Cartesian3(2, 0, 0), new Cesium.Cartesian3(-2, 0, 0)]);
     * @param positions - List of points that the bounding box will enclose.  Each point must have a <code>x</code>, <code>y</code>, and <code>z</code> properties.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new AxisAlignedBoundingBox instance if one was not provided.
     */
    static fromPoints(positions: Cartesian3[], result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;
    /**
     * Duplicates a AxisAlignedBoundingBox instance.
     * @param box - The bounding box to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new AxisAlignedBoundingBox instance if none was provided. (Returns undefined if box is undefined)
     */
    static clone(box: AxisAlignedBoundingBox, result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;
    /**
     * Compares the provided AxisAlignedBoundingBox componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first AxisAlignedBoundingBox.
     * @param [right] - The second AxisAlignedBoundingBox.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: AxisAlignedBoundingBox, right?: AxisAlignedBoundingBox): boolean;
    /**
     * Determines which side of a plane a box is located.
     * @param box - The bounding box to test.
     * @param plane - The plane to test against.
     * @returns {@link Intersect.INSIDE} if the entire box is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire box is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the box
     *                      intersects the plane.
     */
    static intersectPlane(box: AxisAlignedBoundingBox, plane: Plane): Intersect;
    /**
     * Determines whether two axis aligned bounding boxes intersect.
     * @param box - first box
     * @param other - second box
     * @returns <code>true</code> if the boxes intersect; otherwise, <code>false</code>.
     */
    static intersectAxisAlignedBoundingBox(box: AxisAlignedBoundingBox, other: AxisAlignedBoundingBox): boolean;
    /**
     * Duplicates this AxisAlignedBoundingBox instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new AxisAlignedBoundingBox instance if one was not provided.
     */
    clone(result?: AxisAlignedBoundingBox): AxisAlignedBoundingBox;
    /**
     * Determines which side of a plane this box is located.
     * @param plane - The plane to test against.
     * @returns {@link Intersect.INSIDE} if the entire box is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire box is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the box
     *                      intersects the plane.
     */
    intersectPlane(plane: Plane): Intersect;
    /**
     * Determines whether some other axis aligned bounding box intersects this box.
     * @param other - The other axis aligned bounding box.
     * @returns <code>true</code> if the boxes intersect; otherwise, <code>false</code>.
     */
    intersectAxisAlignedBoundingBox(other: AxisAlignedBoundingBox): boolean;
    /**
     * Compares this AxisAlignedBoundingBox against the provided AxisAlignedBoundingBox componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side AxisAlignedBoundingBox.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: AxisAlignedBoundingBox): boolean;
}

/**
 * A bounding rectangle given by a corner, width and height.
 * @param [x = 0.0] - The x coordinate of the rectangle.
 * @param [y = 0.0] - The y coordinate of the rectangle.
 * @param [width = 0.0] - The width of the rectangle.
 * @param [height = 0.0] - The height of the rectangle.
 */
export class BoundingRectangle {
    constructor(x?: number, y?: number, width?: number, height?: number);
    /**
     * The x coordinate of the rectangle.
     */
    x: number;
    /**
     * The y coordinate of the rectangle.
     */
    y: number;
    /**
     * The width of the rectangle.
     */
    width: number;
    /**
     * The height of the rectangle.
     */
    height: number;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: BoundingRectangle, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: BoundingRectangle): BoundingRectangle;
    /**
     * Computes a bounding rectangle enclosing the list of 2D points.
     * The rectangle is oriented with the corner at the bottom left.
     * @param positions - List of points that the bounding rectangle will enclose.  Each point must have <code>x</code> and <code>y</code> properties.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided.
     */
    static fromPoints(positions: Cartesian2[], result?: BoundingRectangle): BoundingRectangle;
    /**
     * Computes a bounding rectangle from a rectangle.
     * @param rectangle - The valid rectangle used to create a bounding rectangle.
     * @param [projection = GeographicProjection] - The projection used to project the rectangle into 2D.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided.
     */
    static fromRectangle(rectangle: Rectangle, projection?: any, result?: BoundingRectangle): BoundingRectangle;
    /**
     * Duplicates a BoundingRectangle instance.
     * @param rectangle - The bounding rectangle to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided. (Returns undefined if rectangle is undefined)
     */
    static clone(rectangle: BoundingRectangle, result?: BoundingRectangle): BoundingRectangle;
    /**
     * Computes a bounding rectangle that is the union of the left and right bounding rectangles.
     * @param left - A rectangle to enclose in bounding rectangle.
     * @param right - A rectangle to enclose in a bounding rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided.
     */
    static union(left: BoundingRectangle, right: BoundingRectangle, result?: BoundingRectangle): BoundingRectangle;
    /**
     * Computes a bounding rectangle by enlarging the provided rectangle until it contains the provided point.
     * @param rectangle - A rectangle to expand.
     * @param point - A point to enclose in a bounding rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided.
     */
    static expand(rectangle: BoundingRectangle, point: Cartesian2, result?: BoundingRectangle): BoundingRectangle;
    /**
     * Determines if two rectangles intersect.
     * @param left - A rectangle to check for intersection.
     * @param right - The other rectangle to check for intersection.
     * @returns <code>Intersect.INTERSECTING</code> if the rectangles intersect, <code>Intersect.OUTSIDE</code> otherwise.
     */
    static intersect(left: BoundingRectangle, right: BoundingRectangle): Intersect;
    /**
     * Compares the provided BoundingRectangles componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first BoundingRectangle.
     * @param [right] - The second BoundingRectangle.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: BoundingRectangle, right?: BoundingRectangle): boolean;
    /**
     * Duplicates this BoundingRectangle instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingRectangle instance if one was not provided.
     */
    clone(result?: BoundingRectangle): BoundingRectangle;
    /**
     * Determines if this rectangle intersects with another.
     * @param right - A rectangle to check for intersection.
     * @returns <code>Intersect.INTERSECTING</code> if the rectangles intersect, <code>Intersect.OUTSIDE</code> otherwise.
     */
    intersect(right: BoundingRectangle): Intersect;
    /**
     * Compares this BoundingRectangle against the provided BoundingRectangle componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side BoundingRectangle.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: BoundingRectangle): boolean;
}

/**
 * A bounding sphere with a center and a radius.
 * @param [center = Cartesian3.ZERO] - The center of the bounding sphere.
 * @param [radius = 0.0] - The radius of the bounding sphere.
 */
export class BoundingSphere {
    constructor(center?: Cartesian3, radius?: number);
    /**
     * The center point of the sphere.
     */
    center: Cartesian3;
    /**
     * The radius of the sphere.
     */
    radius: number;
    /**
     * Computes a tight-fitting bounding sphere enclosing a list of 3D Cartesian points.
     * The bounding sphere is computed by running two algorithms, a naive algorithm and
     * Ritter's algorithm. The smaller of the two spheres is used to ensure a tight fit.
     * @param [positions] - An array of points that the bounding sphere will enclose.  Each point must have <code>x</code>, <code>y</code>, and <code>z</code> properties.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if one was not provided.
     */
    static fromPoints(positions?: Cartesian3[], result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a bounding sphere from a rectangle projected in 2D.
     * @param [rectangle] - The rectangle around which to create a bounding sphere.
     * @param [projection = GeographicProjection] - The projection used to project the rectangle into 2D.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromRectangle2D(rectangle?: Rectangle, projection?: MapProjection, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a bounding sphere from a rectangle projected in 2D.  The bounding sphere accounts for the
     * object's minimum and maximum heights over the rectangle.
     * @param [rectangle] - The rectangle around which to create a bounding sphere.
     * @param [projection = GeographicProjection] - The projection used to project the rectangle into 2D.
     * @param [minimumHeight = 0.0] - The minimum height over the rectangle.
     * @param [maximumHeight = 0.0] - The maximum height over the rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromRectangleWithHeights2D(rectangle?: Rectangle, projection?: MapProjection, minimumHeight?: number, maximumHeight?: number, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a bounding sphere from a rectangle in 3D. The bounding sphere is created using a subsample of points
     * on the ellipsoid and contained in the rectangle. It may not be accurate for all rectangles on all types of ellipsoids.
     * @param [rectangle] - The valid rectangle used to create a bounding sphere.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid used to determine positions of the rectangle.
     * @param [surfaceHeight = 0.0] - The height above the surface of the ellipsoid.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromRectangle3D(rectangle?: Rectangle, ellipsoid?: Ellipsoid, surfaceHeight?: number, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a tight-fitting bounding sphere enclosing a list of 3D points, where the points are
     * stored in a flat array in X, Y, Z, order.  The bounding sphere is computed by running two
     * algorithms, a naive algorithm and Ritter's algorithm. The smaller of the two spheres is used to
     * ensure a tight fit.
     * @example
     * // Compute the bounding sphere from 3 positions, each specified relative to a center.
     * // In addition to the X, Y, and Z coordinates, the points array contains two additional
     * // elements per point which are ignored for the purpose of computing the bounding sphere.
     * const center = new Cesium.Cartesian3(1.0, 2.0, 3.0);
     * const points = [1.0, 2.0, 3.0, 0.1, 0.2,
     *               4.0, 5.0, 6.0, 0.1, 0.2,
     *               7.0, 8.0, 9.0, 0.1, 0.2];
     * const sphere = Cesium.BoundingSphere.fromVertices(points, center, 5);
     * @param [positions] - An array of points that the bounding sphere will enclose.  Each point
     *        is formed from three elements in the array in the order X, Y, Z.
     * @param [center = Cartesian3.ZERO] - The position to which the positions are relative, which need not be the
     *        origin of the coordinate system.  This is useful when the positions are to be used for
     *        relative-to-center (RTC) rendering.
     * @param [stride = 3] - The number of array elements per vertex.  It must be at least 3, but it may
     *        be higher.  Regardless of the value of this parameter, the X coordinate of the first position
     *        is at array index 0, the Y coordinate is at array index 1, and the Z coordinate is at array index
     *        2.  When stride is 3, the X coordinate of the next position then begins at array index 3.  If
     *        the stride is 5, however, two array elements are skipped and the next position begins at array
     *        index 5.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if one was not provided.
     */
    static fromVertices(positions?: number[] | TypedArray, center?: Cartesian3, stride?: number, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a tight-fitting bounding sphere enclosing a list of EncodedCartesian3s, where the points are
     * stored in parallel flat arrays in X, Y, Z, order.  The bounding sphere is computed by running two
     * algorithms, a naive algorithm and Ritter's algorithm. The smaller of the two spheres is used to
     * ensure a tight fit.
     * @param [positionsHigh] - An array of high bits of the encoded cartesians that the bounding sphere will enclose.  Each point
     *        is formed from three elements in the array in the order X, Y, Z.
     * @param [positionsLow] - An array of low bits of the encoded cartesians that the bounding sphere will enclose.  Each point
     *        is formed from three elements in the array in the order X, Y, Z.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if one was not provided.
     */
    static fromEncodedCartesianVertices(positionsHigh?: number[], positionsLow?: number[], result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a bounding sphere from the corner points of an axis-aligned bounding box.  The sphere
     * tightly and fully encompasses the box.
     * @example
     * // Create a bounding sphere around the unit cube
     * const sphere = Cesium.BoundingSphere.fromCornerPoints(new Cesium.Cartesian3(-0.5, -0.5, -0.5), new Cesium.Cartesian3(0.5, 0.5, 0.5));
     * @param [corner] - The minimum height over the rectangle.
     * @param [oppositeCorner] - The maximum height over the rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromCornerPoints(corner?: Cartesian3, oppositeCorner?: Cartesian3, result?: BoundingSphere): BoundingSphere;
    /**
     * Creates a bounding sphere encompassing an ellipsoid.
     * @example
     * const boundingSphere = Cesium.BoundingSphere.fromEllipsoid(ellipsoid);
     * @param ellipsoid - The ellipsoid around which to create a bounding sphere.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromEllipsoid(ellipsoid: Ellipsoid, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a tight-fitting bounding sphere enclosing the provided array of bounding spheres.
     * @param [boundingSpheres] - The array of bounding spheres.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromBoundingSpheres(boundingSpheres?: BoundingSphere[], result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a tight-fitting bounding sphere enclosing the provided oriented bounding box.
     * @param orientedBoundingBox - The oriented bounding box.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromOrientedBoundingBox(orientedBoundingBox: OrientedBoundingBox, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a tight-fitting bounding sphere enclosing the provided affine transformation.
     * @param transformation - The affine transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static fromTransformation(transformation: Matrix4, result?: BoundingSphere): BoundingSphere;
    /**
     * Duplicates a BoundingSphere instance.
     * @param sphere - The bounding sphere to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided. (Returns undefined if sphere is undefined)
     */
    static clone(sphere: BoundingSphere, result?: BoundingSphere): BoundingSphere;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: BoundingSphere, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a bounding sphere that contains both the left and right bounding spheres.
     * @param left - A sphere to enclose in a bounding sphere.
     * @param right - A sphere to enclose in a bounding sphere.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static union(left: BoundingSphere, right: BoundingSphere, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes a bounding sphere by enlarging the provided sphere to contain the provided point.
     * @param sphere - A sphere to expand.
     * @param point - A point to enclose in a bounding sphere.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static expand(sphere: BoundingSphere, point: Cartesian3, result?: BoundingSphere): BoundingSphere;
    /**
     * Determines which side of a plane a sphere is located.
     * @param sphere - The bounding sphere to test.
     * @param plane - The plane to test against.
     * @returns {@link Intersect.INSIDE} if the entire sphere is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire sphere is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the sphere
     *                      intersects the plane.
     */
    static intersectPlane(sphere: BoundingSphere, plane: Plane): Intersect;
    /**
     * Applies a 4x4 affine transformation matrix to a bounding sphere.
     * @param sphere - The bounding sphere to apply the transformation to.
     * @param transform - The transformation matrix to apply to the bounding sphere.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static transform(sphere: BoundingSphere, transform: Matrix4, result?: BoundingSphere): BoundingSphere;
    /**
     * Computes the estimated distance squared from the closest point on a bounding sphere to a point.
     * @example
     * // Sort bounding spheres from back to front
     * spheres.sort(function(a, b) {
     *     return Cesium.BoundingSphere.distanceSquaredTo(b, camera.positionWC) - Cesium.BoundingSphere.distanceSquaredTo(a, camera.positionWC);
     * });
     * @param sphere - The sphere.
     * @param cartesian - The point
     * @returns The distance squared from the bounding sphere to the point. Returns 0 if the point is inside the sphere.
     */
    static distanceSquaredTo(sphere: BoundingSphere, cartesian: Cartesian3): number;
    /**
     * Applies a 4x4 affine transformation matrix to a bounding sphere where there is no scale
     * The transformation matrix is not verified to have a uniform scale of 1.
     * This method is faster than computing the general bounding sphere transform using {@link BoundingSphere.transform}.
     * @example
     * const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid);
     * const boundingSphere = new Cesium.BoundingSphere();
     * const newBoundingSphere = Cesium.BoundingSphere.transformWithoutScale(boundingSphere, modelMatrix);
     * @param sphere - The bounding sphere to apply the transformation to.
     * @param transform - The transformation matrix to apply to the bounding sphere.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static transformWithoutScale(sphere: BoundingSphere, transform: Matrix4, result?: BoundingSphere): BoundingSphere;
    /**
     * The distances calculated by the vector from the center of the bounding sphere to position projected onto direction
     * plus/minus the radius of the bounding sphere.
     * <br>
     * If you imagine the infinite number of planes with normal direction, this computes the smallest distance to the
     * closest and farthest planes from position that intersect the bounding sphere.
     * @param sphere - The bounding sphere to calculate the distance to.
     * @param position - The position to calculate the distance from.
     * @param direction - The direction from position.
     * @param [result] - A Interval to store the nearest and farthest distances.
     * @returns The nearest and farthest distances on the bounding sphere from position in direction.
     */
    static computePlaneDistances(sphere: BoundingSphere, position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;
    /**
     * Creates a bounding sphere in 2D from a bounding sphere in 3D world coordinates.
     * @param sphere - The bounding sphere to transform to 2D.
     * @param [projection = GeographicProjection] - The projection to 2D.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    static projectTo2D(sphere: BoundingSphere, projection?: MapProjection, result?: BoundingSphere): BoundingSphere;
    /**
     * Determines whether or not a sphere is hidden from view by the occluder.
     * @param sphere - The bounding sphere surrounding the occluded object.
     * @param occluder - The occluder.
     * @returns <code>true</code> if the sphere is not visible; otherwise <code>false</code>.
     */
    static isOccluded(sphere: BoundingSphere, occluder: Occluder): boolean;
    /**
     * Compares the provided BoundingSphere componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first BoundingSphere.
     * @param [right] - The second BoundingSphere.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: BoundingSphere, right?: BoundingSphere): boolean;
    /**
     * Determines which side of a plane the sphere is located.
     * @param plane - The plane to test against.
     * @returns {@link Intersect.INSIDE} if the entire sphere is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire sphere is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the sphere
     *                      intersects the plane.
     */
    intersectPlane(plane: Plane): Intersect;
    /**
     * Computes the estimated distance squared from the closest point on a bounding sphere to a point.
     * @example
     * // Sort bounding spheres from back to front
     * spheres.sort(function(a, b) {
     *     return b.distanceSquaredTo(camera.positionWC) - a.distanceSquaredTo(camera.positionWC);
     * });
     * @param cartesian - The point
     * @returns The estimated distance squared from the bounding sphere to the point.
     */
    distanceSquaredTo(cartesian: Cartesian3): number;
    /**
     * The distances calculated by the vector from the center of the bounding sphere to position projected onto direction
     * plus/minus the radius of the bounding sphere.
     * <br>
     * If you imagine the infinite number of planes with normal direction, this computes the smallest distance to the
     * closest and farthest planes from position that intersect the bounding sphere.
     * @param position - The position to calculate the distance from.
     * @param direction - The direction from position.
     * @param [result] - A Interval to store the nearest and farthest distances.
     * @returns The nearest and farthest distances on the bounding sphere from position in direction.
     */
    computePlaneDistances(position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;
    /**
     * Determines whether or not a sphere is hidden from view by the occluder.
     * @param occluder - The occluder.
     * @returns <code>true</code> if the sphere is not visible; otherwise <code>false</code>.
     */
    isOccluded(occluder: Occluder): boolean;
    /**
     * Compares this BoundingSphere against the provided BoundingSphere componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side BoundingSphere.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: BoundingSphere): boolean;
    /**
     * Duplicates this BoundingSphere instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    clone(result?: BoundingSphere): BoundingSphere;
    /**
     * Computes the radius of the BoundingSphere.
     * @returns The radius of the BoundingSphere.
     */
    volume(): number;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
}

/**
 * Describes a cube centered at the origin.
 * @example
 * const box = new Cesium.BoxGeometry({
 *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
 *   maximum : new Cesium.Cartesian3(250000.0, 250000.0, 250000.0),
 *   minimum : new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0)
 * });
 * const geometry = Cesium.BoxGeometry.createGeometry(box);
 * @param options - Object with the following properties:
 * @param options.minimum - The minimum x, y, and z coordinates of the box.
 * @param options.maximum - The maximum x, y, and z coordinates of the box.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class BoxGeometry {
    constructor(options: {
        minimum: Cartesian3;
        maximum: Cartesian3;
        vertexFormat?: VertexFormat;
    });
    /**
     * Creates a cube centered at the origin given its dimensions.
     * @example
     * const box = Cesium.BoxGeometry.fromDimensions({
     *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
     *   dimensions : new Cesium.Cartesian3(500000.0, 500000.0, 500000.0)
     * });
     * const geometry = Cesium.BoxGeometry.createGeometry(box);
     * @param options - Object with the following properties:
     * @param options.dimensions - The width, depth, and height of the box stored in the x, y, and z coordinates of the <code>Cartesian3</code>, respectively.
     * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
     */
    static fromDimensions(options: {
        dimensions: Cartesian3;
        vertexFormat?: VertexFormat;
    }): BoxGeometry;
    /**
     * Creates a cube from the dimensions of an AxisAlignedBoundingBox.
     * @example
     * const aabb = Cesium.AxisAlignedBoundingBox.fromPoints(Cesium.Cartesian3.fromDegreesArray([
     *      -72.0, 40.0,
     *      -70.0, 35.0,
     *      -75.0, 30.0,
     *      -70.0, 30.0,
     *      -68.0, 40.0
     * ]));
     * const box = Cesium.BoxGeometry.fromAxisAlignedBoundingBox(aabb);
     * @param boundingBox - A description of the AxisAlignedBoundingBox.
     */
    static fromAxisAlignedBoundingBox(boundingBox: AxisAlignedBoundingBox): BoxGeometry;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: BoxGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new BoxGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: BoxGeometry): BoxGeometry;
    /**
     * Computes the geometric representation of a box, including its vertices, indices, and a bounding sphere.
     * @param boxGeometry - A description of the box.
     * @returns The computed vertices and indices.
     */
    static createGeometry(boxGeometry: BoxGeometry): Geometry | undefined;
}

/**
 * A description of the outline of a cube centered at the origin.
 * @example
 * const box = new Cesium.BoxOutlineGeometry({
 *   maximum : new Cesium.Cartesian3(250000.0, 250000.0, 250000.0),
 *   minimum : new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0)
 * });
 * const geometry = Cesium.BoxOutlineGeometry.createGeometry(box);
 * @param options - Object with the following properties:
 * @param options.minimum - The minimum x, y, and z coordinates of the box.
 * @param options.maximum - The maximum x, y, and z coordinates of the box.
 */
export class BoxOutlineGeometry {
    constructor(options: {
        minimum: Cartesian3;
        maximum: Cartesian3;
    });
    /**
     * Creates an outline of a cube centered at the origin given its dimensions.
     * @example
     * const box = Cesium.BoxOutlineGeometry.fromDimensions({
     *   dimensions : new Cesium.Cartesian3(500000.0, 500000.0, 500000.0)
     * });
     * const geometry = Cesium.BoxOutlineGeometry.createGeometry(box);
     * @param options - Object with the following properties:
     * @param options.dimensions - The width, depth, and height of the box stored in the x, y, and z coordinates of the <code>Cartesian3</code>, respectively.
     */
    static fromDimensions(options: {
        dimensions: Cartesian3;
    }): BoxOutlineGeometry;
    /**
     * Creates an outline of a cube from the dimensions of an AxisAlignedBoundingBox.
     * @example
     * const aabb = Cesium.AxisAlignedBoundingBox.fromPoints(Cesium.Cartesian3.fromDegreesArray([
     *      -72.0, 40.0,
     *      -70.0, 35.0,
     *      -75.0, 30.0,
     *      -70.0, 30.0,
     *      -68.0, 40.0
     * ]));
     * const box = Cesium.BoxOutlineGeometry.fromAxisAlignedBoundingBox(aabb);
     *
     *
     * @param boundingBox - A description of the AxisAlignedBoundingBox.
     */
    static fromAxisAlignedBoundingBox(boundingBox: AxisAlignedBoundingBox): BoxOutlineGeometry;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: BoxOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new BoxOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: BoxOutlineGeometry): BoxOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of a box, including its vertices, indices, and a bounding sphere.
     * @param boxGeometry - A description of the box outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(boxGeometry: BoxOutlineGeometry): Geometry | undefined;
}

/**
 * A 2D Cartesian point.
 * @param [x = 0.0] - The X component.
 * @param [y = 0.0] - The Y component.
 */
export class Cartesian2 {
    constructor(x?: number, y?: number);
    /**
     * The X component.
     */
    x: number;
    /**
     * The Y component.
     */
    y: number;
    /**
     * Creates a Cartesian2 instance from x and y coordinates.
     * @param x - The x coordinate.
     * @param y - The y coordinate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    static fromElements(x: number, y: number, result?: Cartesian2): Cartesian2;
    /**
     * Duplicates a Cartesian2 instance.
     * @param cartesian - The Cartesian to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided. (Returns undefined if cartesian is undefined)
     */
    static clone(cartesian: Cartesian2, result?: Cartesian2): Cartesian2;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Cartesian2, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Cartesian2): Cartesian2;
    /**
     * Flattens an array of Cartesian2s into an array of components.
     * @param array - The array of cartesians to pack.
     * @param [result] - The array onto which to store the result. If this is a typed array, it must have array.length * 2 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 2) elements.
     * @returns The packed array.
     */
    static packArray(array: Cartesian2[], result?: number[]): number[];
    /**
     * Unpacks an array of cartesian components into an array of Cartesian2s.
     * @param array - The array of components to unpack.
     * @param [result] - The array onto which to store the result.
     * @returns The unpacked array.
     */
    static unpackArray(array: number[], result?: Cartesian2[]): Cartesian2[];
    /**
     * Computes the value of the maximum component for the supplied Cartesian.
     * @param cartesian - The cartesian to use.
     * @returns The value of the maximum component.
     */
    static maximumComponent(cartesian: Cartesian2): number;
    /**
     * Computes the value of the minimum component for the supplied Cartesian.
     * @param cartesian - The cartesian to use.
     * @returns The value of the minimum component.
     */
    static minimumComponent(cartesian: Cartesian2): number;
    /**
     * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
     * @param first - A cartesian to compare.
     * @param second - A cartesian to compare.
     * @param result - The object into which to store the result.
     * @returns A cartesian with the minimum components.
     */
    static minimumByComponent(first: Cartesian2, second: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
     * @param first - A cartesian to compare.
     * @param second - A cartesian to compare.
     * @param result - The object into which to store the result.
     * @returns A cartesian with the maximum components.
     */
    static maximumByComponent(first: Cartesian2, second: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Constrain a value to lie between two values.
     * @param value - The value to clamp.
     * @param min - The minimum bound.
     * @param max - The maximum bound.
     * @param result - The object into which to store the result.
     * @returns The clamped value such that min <= result <= max.
     */
    static clamp(value: Cartesian2, min: Cartesian2, max: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the provided Cartesian's squared magnitude.
     * @param cartesian - The Cartesian instance whose squared magnitude is to be computed.
     * @returns The squared magnitude.
     */
    static magnitudeSquared(cartesian: Cartesian2): number;
    /**
     * Computes the Cartesian's magnitude (length).
     * @param cartesian - The Cartesian instance whose magnitude is to be computed.
     * @returns The magnitude.
     */
    static magnitude(cartesian: Cartesian2): number;
    /**
     * Computes the distance between two points.
     * @example
     * // Returns 1.0
     * const d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(2.0, 0.0));
     * @param left - The first point to compute the distance from.
     * @param right - The second point to compute the distance to.
     * @returns The distance between two points.
     */
    static distance(left: Cartesian2, right: Cartesian2): number;
    /**
     * Computes the squared distance between two points.  Comparing squared distances
     * using this function is more efficient than comparing distances using {@link Cartesian2#distance}.
     * @example
     * // Returns 4.0, not 2.0
     * const d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(3.0, 0.0));
     * @param left - The first point to compute the distance from.
     * @param right - The second point to compute the distance to.
     * @returns The distance between two points.
     */
    static distanceSquared(left: Cartesian2, right: Cartesian2): number;
    /**
     * Computes the normalized form of the supplied Cartesian.
     * @param cartesian - The Cartesian to be normalized.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static normalize(cartesian: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the dot (scalar) product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @returns The dot product.
     */
    static dot(left: Cartesian2, right: Cartesian2): number;
    /**
     * Computes the magnitude of the cross product that would result from implicitly setting the Z coordinate of the input vectors to 0
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @returns The cross product.
     */
    static cross(left: Cartesian2, right: Cartesian2): number;
    /**
     * Computes the componentwise product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyComponents(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the componentwise quotient of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideComponents(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the componentwise sum of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the componentwise difference of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Cartesian2, right: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Multiplies the provided Cartesian componentwise by the provided scalar.
     * @param cartesian - The Cartesian to be scaled.
     * @param scalar - The scalar to multiply with.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(cartesian: Cartesian2, scalar: number, result: Cartesian2): Cartesian2;
    /**
     * Divides the provided Cartesian componentwise by the provided scalar.
     * @param cartesian - The Cartesian to be divided.
     * @param scalar - The scalar to divide by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideByScalar(cartesian: Cartesian2, scalar: number, result: Cartesian2): Cartesian2;
    /**
     * Negates the provided Cartesian.
     * @param cartesian - The Cartesian to be negated.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(cartesian: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the absolute value of the provided Cartesian.
     * @param cartesian - The Cartesian whose absolute value is to be computed.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static abs(cartesian: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the linear interpolation or extrapolation at t using the provided cartesians.
     * @param start - The value corresponding to t at 0.0.
     * @param end - The value corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static lerp(start: Cartesian2, end: Cartesian2, t: number, result: Cartesian2): Cartesian2;
    /**
     * Returns the angle, in radians, between the provided Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @returns The angle between the Cartesians.
     */
    static angleBetween(left: Cartesian2, right: Cartesian2): number;
    /**
     * Returns the axis that is most orthogonal to the provided Cartesian.
     * @param cartesian - The Cartesian on which to find the most orthogonal axis.
     * @param result - The object onto which to store the result.
     * @returns The most orthogonal axis.
     */
    static mostOrthogonalAxis(cartesian: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Compares the provided Cartesians componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first Cartesian.
     * @param [right] - The second Cartesian.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Cartesian2, right?: Cartesian2): boolean;
    /**
     * Compares the provided Cartesian2 to the values packed into an array, starting at the provided offset.
     * @param cartesian - The Cartesian2 to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the Cartesian2 starts.
     * @returns <code>true</code> if the Cartesian2 matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(cartesian: Cartesian2, array: number[], offset: number): boolean;
    /**
     * Compares the provided Cartesians componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [left] - The first Cartesian.
     * @param [right] - The second Cartesian.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Cartesian2, right?: Cartesian2, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Duplicates this Cartesian2 instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    clone(result?: Cartesian2): Cartesian2;
    /**
     * Compares this Cartesian against the provided Cartesian componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side Cartesian.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Cartesian2): boolean;
    /**
     * Compares this Cartesian against the provided Cartesian componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side Cartesian.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Cartesian2, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Creates a string representing this Cartesian in the format '(x, y)'.
     * @returns A string representing the provided Cartesian in the format '(x, y)'.
     */
    toString(): string;
    /**
     * Creates a Cartesian2 instance from an existing Cartesian3.  This simply takes the
     * x and y properties of the Cartesian3 and drops z.
     * @param cartesian - The Cartesian3 instance to create a Cartesian2 instance from.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    static fromCartesian3(cartesian: Cartesian3, result?: Cartesian2): Cartesian2;
    /**
     * Creates a Cartesian2 instance from an existing Cartesian4.  This simply takes the
     * x and y properties of the Cartesian4 and drops z and w.
     * @param cartesian - The Cartesian4 instance to create a Cartesian2 instance from.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    static fromCartesian4(cartesian: Cartesian4, result?: Cartesian2): Cartesian2;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Creates a Cartesian2 from two consecutive elements in an array.
     * @example
     * // Create a Cartesian2 with (1.0, 2.0)
     * const v = [1.0, 2.0];
     * const p = Cesium.Cartesian2.fromArray(v);
     *
     * // Create a Cartesian2 with (1.0, 2.0) using an offset into an array
     * const v2 = [0.0, 0.0, 1.0, 2.0];
     * const p2 = Cesium.Cartesian2.fromArray(v2, 2);
     * @param array - The array whose two consecutive elements correspond to the x and y components, respectively.
     * @param [startingIndex = 0] - The offset into the array of the first element, which corresponds to the x component.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    static fromArray(array: number[], startingIndex?: number, result?: Cartesian2): Cartesian2;
    /**
     * An immutable Cartesian2 instance initialized to (0.0, 0.0).
     */
    static readonly ZERO: Cartesian2;
    /**
     * An immutable Cartesian2 instance initialized to (1.0, 1.0).
     */
    static readonly ONE: Cartesian2;
    /**
     * An immutable Cartesian2 instance initialized to (1.0, 0.0).
     */
    static readonly UNIT_X: Cartesian2;
    /**
     * An immutable Cartesian2 instance initialized to (0.0, 1.0).
     */
    static readonly UNIT_Y: Cartesian2;
}

/**
 * A 3D Cartesian point.
 * @param [x = 0.0] - The X component.
 * @param [y = 0.0] - The Y component.
 * @param [z = 0.0] - The Z component.
 */
export class Cartesian3 {
    constructor(x?: number, y?: number, z?: number);
    /**
     * The X component.
     */
    x: number;
    /**
     * The Y component.
     */
    y: number;
    /**
     * The Z component.
     */
    z: number;
    /**
     * Converts the provided Spherical into Cartesian3 coordinates.
     * @param spherical - The Spherical to be converted to Cartesian3.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    static fromSpherical(spherical: Spherical, result?: Cartesian3): Cartesian3;
    /**
     * Creates a Cartesian3 instance from x, y and z coordinates.
     * @param x - The x coordinate.
     * @param y - The y coordinate.
     * @param z - The z coordinate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    static fromElements(x: number, y: number, z: number, result?: Cartesian3): Cartesian3;
    /**
     * Duplicates a Cartesian3 instance.
     * @param cartesian - The Cartesian to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided. (Returns undefined if cartesian is undefined)
     */
    static clone(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Cartesian3, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Cartesian3): Cartesian3;
    /**
     * Flattens an array of Cartesian3s into an array of components.
     * @param array - The array of cartesians to pack.
     * @param [result] - The array onto which to store the result. If this is a typed array, it must have array.length * 3 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 3) elements.
     * @returns The packed array.
     */
    static packArray(array: Cartesian3[], result?: number[]): number[];
    /**
     * Unpacks an array of cartesian components into an array of Cartesian3s.
     * @param array - The array of components to unpack.
     * @param [result] - The array onto which to store the result.
     * @returns The unpacked array.
     */
    static unpackArray(array: number[], result?: Cartesian3[]): Cartesian3[];
    /**
     * Computes the value of the maximum component for the supplied Cartesian.
     * @param cartesian - The cartesian to use.
     * @returns The value of the maximum component.
     */
    static maximumComponent(cartesian: Cartesian3): number;
    /**
     * Computes the value of the minimum component for the supplied Cartesian.
     * @param cartesian - The cartesian to use.
     * @returns The value of the minimum component.
     */
    static minimumComponent(cartesian: Cartesian3): number;
    /**
     * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
     * @param first - A cartesian to compare.
     * @param second - A cartesian to compare.
     * @param result - The object into which to store the result.
     * @returns A cartesian with the minimum components.
     */
    static minimumByComponent(first: Cartesian3, second: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
     * @param first - A cartesian to compare.
     * @param second - A cartesian to compare.
     * @param result - The object into which to store the result.
     * @returns A cartesian with the maximum components.
     */
    static maximumByComponent(first: Cartesian3, second: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Constrain a value to lie between two values.
     * @param value - The value to clamp.
     * @param min - The minimum bound.
     * @param max - The maximum bound.
     * @param result - The object into which to store the result.
     * @returns The clamped value such that min <= value <= max.
     */
    static clamp(value: Cartesian3, min: Cartesian3, max: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the provided Cartesian's squared magnitude.
     * @param cartesian - The Cartesian instance whose squared magnitude is to be computed.
     * @returns The squared magnitude.
     */
    static magnitudeSquared(cartesian: Cartesian3): number;
    /**
     * Computes the Cartesian's magnitude (length).
     * @param cartesian - The Cartesian instance whose magnitude is to be computed.
     * @returns The magnitude.
     */
    static magnitude(cartesian: Cartesian3): number;
    /**
     * Computes the distance between two points.
     * @example
     * // Returns 1.0
     * const d = Cesium.Cartesian3.distance(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(2.0, 0.0, 0.0));
     * @param left - The first point to compute the distance from.
     * @param right - The second point to compute the distance to.
     * @returns The distance between two points.
     */
    static distance(left: Cartesian3, right: Cartesian3): number;
    /**
     * Computes the squared distance between two points.  Comparing squared distances
     * using this function is more efficient than comparing distances using {@link Cartesian3#distance}.
     * @example
     * // Returns 4.0, not 2.0
     * const d = Cesium.Cartesian3.distanceSquared(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(3.0, 0.0, 0.0));
     * @param left - The first point to compute the distance from.
     * @param right - The second point to compute the distance to.
     * @returns The distance between two points.
     */
    static distanceSquared(left: Cartesian3, right: Cartesian3): number;
    /**
     * Computes the normalized form of the supplied Cartesian.
     * @param cartesian - The Cartesian to be normalized.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static normalize(cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the dot (scalar) product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @returns The dot product.
     */
    static dot(left: Cartesian3, right: Cartesian3): number;
    /**
     * Computes the componentwise product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyComponents(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the componentwise quotient of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideComponents(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the componentwise sum of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the componentwise difference of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Multiplies the provided Cartesian componentwise by the provided scalar.
     * @param cartesian - The Cartesian to be scaled.
     * @param scalar - The scalar to multiply with.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3;
    /**
     * Divides the provided Cartesian componentwise by the provided scalar.
     * @param cartesian - The Cartesian to be divided.
     * @param scalar - The scalar to divide by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideByScalar(cartesian: Cartesian3, scalar: number, result: Cartesian3): Cartesian3;
    /**
     * Negates the provided Cartesian.
     * @param cartesian - The Cartesian to be negated.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the absolute value of the provided Cartesian.
     * @param cartesian - The Cartesian whose absolute value is to be computed.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static abs(cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the linear interpolation or extrapolation at t using the provided cartesians.
     * @param start - The value corresponding to t at 0.0.
     * @param end - The value corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static lerp(start: Cartesian3, end: Cartesian3, t: number, result: Cartesian3): Cartesian3;
    /**
     * Returns the angle, in radians, between the provided Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @returns The angle between the Cartesians.
     */
    static angleBetween(left: Cartesian3, right: Cartesian3): number;
    /**
     * Returns the axis that is most orthogonal to the provided Cartesian.
     * @param cartesian - The Cartesian on which to find the most orthogonal axis.
     * @param result - The object onto which to store the result.
     * @returns The most orthogonal axis.
     */
    static mostOrthogonalAxis(cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Projects vector a onto vector b
     * @param a - The vector that needs projecting
     * @param b - The vector to project onto
     * @param result - The result cartesian
     * @returns The modified result parameter
     */
    static projectVector(a: Cartesian3, b: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Compares the provided Cartesians componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first Cartesian.
     * @param [right] - The second Cartesian.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Cartesian3, right?: Cartesian3): boolean;
    /**
     * Compares the provided Cartesian3 to the values packed into an array, starting at the provided offset.
     * @param cartesian - The Cartesian3 to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the Cartesian3 starts.
     * @returns <code>true</code> if the Cartesian3 matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(cartesian: Cartesian3, array: number[], offset: number): boolean;
    /**
     * Compares the provided Cartesians componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [left] - The first Cartesian.
     * @param [right] - The second Cartesian.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Cartesian3, right?: Cartesian3, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Computes the cross (outer) product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The cross product.
     */
    static cross(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the midpoint between the right and left Cartesian.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The midpoint.
     */
    static midpoint(left: Cartesian3, right: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Returns a Cartesian3 position from longitude and latitude values given in degrees.
     * @example
     * const position = Cesium.Cartesian3.fromDegrees(-115.0, 37.0);
     * @param longitude - The longitude, in degrees
     * @param latitude - The latitude, in degrees
     * @param [height = 0.0] - The height, in meters, above the ellipsoid.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the position lies.
     * @param [result] - The object onto which to store the result.
     * @returns The position
     */
    static fromDegrees(longitude: number, latitude: number, height?: number, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3;
    /**
     * Returns a Cartesian3 position from longitude and latitude values given in radians.
     * @example
     * const position = Cesium.Cartesian3.fromRadians(-2.007, 0.645);
     * @param longitude - The longitude, in radians
     * @param latitude - The latitude, in radians
     * @param [height = 0.0] - The height, in meters, above the ellipsoid.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the position lies.
     * @param [result] - The object onto which to store the result.
     * @returns The position
     */
    static fromRadians(longitude: number, latitude: number, height?: number, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3;
    /**
     * Returns an array of Cartesian3 positions given an array of longitude and latitude values given in degrees.
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0, -107.0, 33.0]);
     * @param coordinates - A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the coordinates lie.
     * @param [result] - An array of Cartesian3 objects to store the result.
     * @returns The array of positions.
     */
    static fromDegreesArray(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];
    /**
     * Returns an array of Cartesian3 positions given an array of longitude and latitude values given in radians.
     * @example
     * const positions = Cesium.Cartesian3.fromRadiansArray([-2.007, 0.645, -1.867, .575]);
     * @param coordinates - A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the coordinates lie.
     * @param [result] - An array of Cartesian3 objects to store the result.
     * @returns The array of positions.
     */
    static fromRadiansArray(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];
    /**
     * Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in degrees.
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArrayHeights([-115.0, 37.0, 100000.0, -107.0, 33.0, 150000.0]);
     * @param coordinates - A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the position lies.
     * @param [result] - An array of Cartesian3 objects to store the result.
     * @returns The array of positions.
     */
    static fromDegreesArrayHeights(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];
    /**
     * Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in radians.
     * @example
     * const positions = Cesium.Cartesian3.fromRadiansArrayHeights([-2.007, 0.645, 100000.0, -1.867, .575, 150000.0]);
     * @param coordinates - A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the position lies.
     * @param [result] - An array of Cartesian3 objects to store the result.
     * @returns The array of positions.
     */
    static fromRadiansArrayHeights(coordinates: number[], ellipsoid?: Ellipsoid, result?: Cartesian3[]): Cartesian3[];
    /**
     * Duplicates this Cartesian3 instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    clone(result?: Cartesian3): Cartesian3;
    /**
     * Compares this Cartesian against the provided Cartesian componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side Cartesian.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Cartesian3): boolean;
    /**
     * Compares this Cartesian against the provided Cartesian componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side Cartesian.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Cartesian3, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Creates a string representing this Cartesian in the format '(x, y, z)'.
     * @returns A string representing this Cartesian in the format '(x, y, z)'.
     */
    toString(): string;
    /**
     * Creates a Cartesian3 instance from an existing Cartesian4.  This simply takes the
     * x, y, and z properties of the Cartesian4 and drops w.
     * @param cartesian - The Cartesian4 instance to create a Cartesian3 instance from.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    static fromCartesian4(cartesian: Cartesian4, result?: Cartesian3): Cartesian3;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Creates a Cartesian3 from three consecutive elements in an array.
     * @example
     * // Create a Cartesian3 with (1.0, 2.0, 3.0)
     * const v = [1.0, 2.0, 3.0];
     * const p = Cesium.Cartesian3.fromArray(v);
     *
     * // Create a Cartesian3 with (1.0, 2.0, 3.0) using an offset into an array
     * const v2 = [0.0, 0.0, 1.0, 2.0, 3.0];
     * const p2 = Cesium.Cartesian3.fromArray(v2, 2);
     * @param array - The array whose three consecutive elements correspond to the x, y, and z components, respectively.
     * @param [startingIndex = 0] - The offset into the array of the first element, which corresponds to the x component.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    static fromArray(array: number[], startingIndex?: number, result?: Cartesian3): Cartesian3;
    /**
     * An immutable Cartesian3 instance initialized to (0.0, 0.0, 0.0).
     */
    static readonly ZERO: Cartesian3;
    /**
     * An immutable Cartesian3 instance initialized to (1.0, 1.0, 1.0).
     */
    static readonly ONE: Cartesian3;
    /**
     * An immutable Cartesian3 instance initialized to (1.0, 0.0, 0.0).
     */
    static readonly UNIT_X: Cartesian3;
    /**
     * An immutable Cartesian3 instance initialized to (0.0, 1.0, 0.0).
     */
    static readonly UNIT_Y: Cartesian3;
    /**
     * An immutable Cartesian3 instance initialized to (0.0, 0.0, 1.0).
     */
    static readonly UNIT_Z: Cartesian3;
}

/**
 * A 4D Cartesian point.
 * @param [x = 0.0] - The X component.
 * @param [y = 0.0] - The Y component.
 * @param [z = 0.0] - The Z component.
 * @param [w = 0.0] - The W component.
 */
export class Cartesian4 {
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * The X component.
     */
    x: number;
    /**
     * The Y component.
     */
    y: number;
    /**
     * The Z component.
     */
    z: number;
    /**
     * The W component.
     */
    w: number;
    /**
     * Creates a Cartesian4 instance from x, y, z and w coordinates.
     * @param x - The x coordinate.
     * @param y - The y coordinate.
     * @param z - The z coordinate.
     * @param w - The w coordinate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian4 instance if one was not provided.
     */
    static fromElements(x: number, y: number, z: number, w: number, result?: Cartesian4): Cartesian4;
    /**
     * Creates a Cartesian4 instance from a {@link Color}. <code>red</code>, <code>green</code>, <code>blue</code>,
     * and <code>alpha</code> map to <code>x</code>, <code>y</code>, <code>z</code>, and <code>w</code>, respectively.
     * @param color - The source color.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian4 instance if one was not provided.
     */
    static fromColor(color: Color, result?: Cartesian4): Cartesian4;
    /**
     * Duplicates a Cartesian4 instance.
     * @param cartesian - The Cartesian to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian4 instance if one was not provided. (Returns undefined if cartesian is undefined)
     */
    static clone(cartesian: Cartesian4, result?: Cartesian4): Cartesian4;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Cartesian4, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Cartesian4 instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Cartesian4): Cartesian4;
    /**
     * Flattens an array of Cartesian4s into an array of components.
     * @param array - The array of cartesians to pack.
     * @param [result] - The array onto which to store the result. If this is a typed array, it must have array.length * 4 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 4) elements.
     * @returns The packed array.
     */
    static packArray(array: Cartesian4[], result?: number[]): number[];
    /**
     * Unpacks an array of cartesian components into an array of Cartesian4s.
     * @param array - The array of components to unpack.
     * @param [result] - The array onto which to store the result.
     * @returns The unpacked array.
     */
    static unpackArray(array: number[], result?: Cartesian4[]): Cartesian4[];
    /**
     * Computes the value of the maximum component for the supplied Cartesian.
     * @param cartesian - The cartesian to use.
     * @returns The value of the maximum component.
     */
    static maximumComponent(cartesian: Cartesian4): number;
    /**
     * Computes the value of the minimum component for the supplied Cartesian.
     * @param cartesian - The cartesian to use.
     * @returns The value of the minimum component.
     */
    static minimumComponent(cartesian: Cartesian4): number;
    /**
     * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
     * @param first - A cartesian to compare.
     * @param second - A cartesian to compare.
     * @param result - The object into which to store the result.
     * @returns A cartesian with the minimum components.
     */
    static minimumByComponent(first: Cartesian4, second: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
     * @param first - A cartesian to compare.
     * @param second - A cartesian to compare.
     * @param result - The object into which to store the result.
     * @returns A cartesian with the maximum components.
     */
    static maximumByComponent(first: Cartesian4, second: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Constrain a value to lie between two values.
     * @param value - The value to clamp.
     * @param min - The minimum bound.
     * @param max - The maximum bound.
     * @param result - The object into which to store the result.
     * @returns The clamped value such that min <= result <= max.
     */
    static clamp(value: Cartesian4, min: Cartesian4, max: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the provided Cartesian's squared magnitude.
     * @param cartesian - The Cartesian instance whose squared magnitude is to be computed.
     * @returns The squared magnitude.
     */
    static magnitudeSquared(cartesian: Cartesian4): number;
    /**
     * Computes the Cartesian's magnitude (length).
     * @param cartesian - The Cartesian instance whose magnitude is to be computed.
     * @returns The magnitude.
     */
    static magnitude(cartesian: Cartesian4): number;
    /**
     * Computes the 4-space distance between two points.
     * @example
     * // Returns 1.0
     * const d = Cesium.Cartesian4.distance(
     *   new Cesium.Cartesian4(1.0, 0.0, 0.0, 0.0),
     *   new Cesium.Cartesian4(2.0, 0.0, 0.0, 0.0));
     * @param left - The first point to compute the distance from.
     * @param right - The second point to compute the distance to.
     * @returns The distance between two points.
     */
    static distance(left: Cartesian4, right: Cartesian4): number;
    /**
     * Computes the squared distance between two points.  Comparing squared distances
     * using this function is more efficient than comparing distances using {@link Cartesian4#distance}.
     * @example
     * // Returns 4.0, not 2.0
     * const d = Cesium.Cartesian4.distance(
     *   new Cesium.Cartesian4(1.0, 0.0, 0.0, 0.0),
     *   new Cesium.Cartesian4(3.0, 0.0, 0.0, 0.0));
     * @param left - The first point to compute the distance from.
     * @param right - The second point to compute the distance to.
     * @returns The distance between two points.
     */
    static distanceSquared(left: Cartesian4, right: Cartesian4): number;
    /**
     * Computes the normalized form of the supplied Cartesian.
     * @param cartesian - The Cartesian to be normalized.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static normalize(cartesian: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the dot (scalar) product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @returns The dot product.
     */
    static dot(left: Cartesian4, right: Cartesian4): number;
    /**
     * Computes the componentwise product of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyComponents(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the componentwise quotient of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideComponents(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the componentwise sum of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the componentwise difference of two Cartesians.
     * @param left - The first Cartesian.
     * @param right - The second Cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Cartesian4, right: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Multiplies the provided Cartesian componentwise by the provided scalar.
     * @param cartesian - The Cartesian to be scaled.
     * @param scalar - The scalar to multiply with.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(cartesian: Cartesian4, scalar: number, result: Cartesian4): Cartesian4;
    /**
     * Divides the provided Cartesian componentwise by the provided scalar.
     * @param cartesian - The Cartesian to be divided.
     * @param scalar - The scalar to divide by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideByScalar(cartesian: Cartesian4, scalar: number, result: Cartesian4): Cartesian4;
    /**
     * Negates the provided Cartesian.
     * @param cartesian - The Cartesian to be negated.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(cartesian: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the absolute value of the provided Cartesian.
     * @param cartesian - The Cartesian whose absolute value is to be computed.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static abs(cartesian: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the linear interpolation or extrapolation at t using the provided cartesians.
     * @param start - The value corresponding to t at 0.0.
     * @param end - The value corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static lerp(start: Cartesian4, end: Cartesian4, t: number, result: Cartesian4): Cartesian4;
    /**
     * Returns the axis that is most orthogonal to the provided Cartesian.
     * @param cartesian - The Cartesian on which to find the most orthogonal axis.
     * @param result - The object onto which to store the result.
     * @returns The most orthogonal axis.
     */
    static mostOrthogonalAxis(cartesian: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Compares the provided Cartesians componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first Cartesian.
     * @param [right] - The second Cartesian.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Cartesian4, right?: Cartesian4): boolean;
    /**
     * Compares the provided Cartesian4 to the values packed into an array, starting at the provided offset.
     * @param cartesian - The Cartesian4 to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the Cartesian4 starts.
     * @returns <code>true</code> if the Cartesian4 matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(cartesian: Cartesian4, array: number[], offset: number): boolean;
    /**
     * Compares the provided Cartesians componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [left] - The first Cartesian.
     * @param [right] - The second Cartesian.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Cartesian4, right?: Cartesian4, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Duplicates this Cartesian4 instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian4 instance if one was not provided.
     */
    clone(result?: Cartesian4): Cartesian4;
    /**
     * Compares this Cartesian against the provided Cartesian componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side Cartesian.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Cartesian4): boolean;
    /**
     * Compares this Cartesian against the provided Cartesian componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side Cartesian.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Cartesian4, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Creates a string representing this Cartesian in the format '(x, y, z, w)'.
     * @returns A string representing the provided Cartesian in the format '(x, y, z, w)'.
     */
    toString(): string;
    /**
     * Packs an arbitrary floating point value to 4 values representable using uint8.
     * @param value - A floating point number.
     * @param [result] - The Cartesian4 that will contain the packed float.
     * @returns A Cartesian4 representing the float packed to values in x, y, z, and w.
     */
    static packFloat(value: number, result?: Cartesian4): Cartesian4;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Creates a Cartesian4 from four consecutive elements in an array.
     * @example
     * // Create a Cartesian4 with (1.0, 2.0, 3.0, 4.0)
     * const v = [1.0, 2.0, 3.0, 4.0];
     * const p = Cesium.Cartesian4.fromArray(v);
     *
     * // Create a Cartesian4 with (1.0, 2.0, 3.0, 4.0) using an offset into an array
     * const v2 = [0.0, 0.0, 1.0, 2.0, 3.0, 4.0];
     * const p2 = Cesium.Cartesian4.fromArray(v2, 2);
     * @param array - The array whose four consecutive elements correspond to the x, y, z, and w components, respectively.
     * @param [startingIndex = 0] - The offset into the array of the first element, which corresponds to the x component.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian4 instance if one was not provided.
     */
    static fromArray(array: number[], startingIndex?: number, result?: Cartesian4): Cartesian4;
    /**
     * An immutable Cartesian4 instance initialized to (0.0, 0.0, 0.0, 0.0).
     */
    static readonly ZERO: Cartesian4;
    /**
     * An immutable Cartesian4 instance initialized to (1.0, 1.0, 1.0, 1.0).
     */
    static readonly ONE: Cartesian4;
    /**
     * An immutable Cartesian4 instance initialized to (1.0, 0.0, 0.0, 0.0).
     */
    static readonly UNIT_X: Cartesian4;
    /**
     * An immutable Cartesian4 instance initialized to (0.0, 1.0, 0.0, 0.0).
     */
    static readonly UNIT_Y: Cartesian4;
    /**
     * An immutable Cartesian4 instance initialized to (0.0, 0.0, 1.0, 0.0).
     */
    static readonly UNIT_Z: Cartesian4;
    /**
     * An immutable Cartesian4 instance initialized to (0.0, 0.0, 0.0, 1.0).
     */
    static readonly UNIT_W: Cartesian4;
}

/**
 * A position defined by longitude, latitude, and height.
 * @param [longitude = 0.0] - The longitude, in radians.
 * @param [latitude = 0.0] - The latitude, in radians.
 * @param [height = 0.0] - The height, in meters, above the ellipsoid.
 */
export class Cartographic {
    constructor(longitude?: number, latitude?: number, height?: number);
    /**
     * The longitude, in radians.
     */
    longitude: number;
    /**
     * The latitude, in radians.
     */
    latitude: number;
    /**
     * The height, in meters, above the ellipsoid.
     */
    height: number;
    /**
     * Creates a new Cartographic instance from longitude and latitude
     * specified in radians.
     * @param longitude - The longitude, in radians.
     * @param latitude - The latitude, in radians.
     * @param [height = 0.0] - The height, in meters, above the ellipsoid.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if one was not provided.
     */
    static fromRadians(longitude: number, latitude: number, height?: number, result?: Cartographic): Cartographic;
    /**
     * Creates a new Cartographic instance from longitude and latitude
     * specified in degrees.  The values in the resulting object will
     * be in radians.
     * @param longitude - The longitude, in degrees.
     * @param latitude - The latitude, in degrees.
     * @param [height = 0.0] - The height, in meters, above the ellipsoid.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if one was not provided.
     */
    static fromDegrees(longitude: number, latitude: number, height?: number, result?: Cartographic): Cartographic;
    /**
     * Creates a new Cartographic instance from a Cartesian position. The values in the
     * resulting object will be in radians.
     * @param cartesian - The Cartesian position to convert to cartographic representation.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the position lies.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.
     */
    static fromCartesian(cartesian: Cartesian3, ellipsoid?: Ellipsoid, result?: Cartographic): Cartographic;
    /**
     * Creates a new Cartesian3 instance from a Cartographic input. The values in the inputted
     * object should be in radians.
     * @param cartographic - Input to be converted into a Cartesian3 output.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the position lies.
     * @param [result] - The object onto which to store the result.
     * @returns The position
     */
    static toCartesian(cartographic: Cartographic, ellipsoid?: Ellipsoid, result?: Cartesian3): Cartesian3;
    /**
     * Duplicates a Cartographic instance.
     * @param cartographic - The cartographic to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if one was not provided. (Returns undefined if cartographic is undefined)
     */
    static clone(cartographic: Cartographic, result?: Cartographic): Cartographic;
    /**
     * Compares the provided cartographics componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first cartographic.
     * @param [right] - The second cartographic.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Cartographic, right?: Cartographic): boolean;
    /**
     * Compares the provided cartographics componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [left] - The first cartographic.
     * @param [right] - The second cartographic.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Cartographic, right?: Cartographic, epsilon?: number): boolean;
    /**
     * Duplicates this instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if one was not provided.
     */
    clone(result?: Cartographic): Cartographic;
    /**
     * Compares the provided against this cartographic componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The second cartographic.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    equals(right?: Cartographic): boolean;
    /**
     * Compares the provided against this cartographic componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [right] - The second cartographic.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Cartographic, epsilon?: number): boolean;
    /**
     * Creates a string representing this cartographic in the format '(longitude, latitude, height)'.
     * @returns A string representing the provided cartographic in the format '(longitude, latitude, height)'.
     */
    toString(): string;
    /**
     * An immutable Cartographic instance initialized to (0.0, 0.0, 0.0).
     */
    static readonly ZERO: Cartographic;
}

/**
 * A Catmull-Rom spline is a cubic spline where the tangent at control points,
 * except the first and last, are computed using the previous and next control points.
 * Catmull-Rom splines are in the class C<sup>1</sup>.
 * @example
 * // spline above the earth from Philadelphia to Los Angeles
 * const spline = new Cesium.CatmullRomSpline({
 *     times : [ 0.0, 1.5, 3.0, 4.5, 6.0 ],
 *     points : [
 *         new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
 *         new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
 *         new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
 *         new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
 *         new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
 *     ]
 * });
 *
 * const p0 = spline.evaluate(times[i]);         // equal to positions[i]
 * const p1 = spline.evaluate(times[i] + delta); // interpolated value when delta < times[i + 1] - times[i]
 * @param options - Object with the following properties:
 * @param options.times - An array of strictly increasing, unit-less, floating-point times at each point.
 *                The values are in no way connected to the clock time. They are the parameterization for the curve.
 * @param options.points - The array of {@link Cartesian3} control points.
 * @param [options.firstTangent] - The tangent of the curve at the first control point.
 *                     If the tangent is not given, it will be estimated.
 * @param [options.lastTangent] - The tangent of the curve at the last control point.
 *                     If the tangent is not given, it will be estimated.
 */
export class CatmullRomSpline {
    constructor(options: {
        times: number[];
        points: Cartesian3[];
        firstTangent?: Cartesian3;
        lastTangent?: Cartesian3;
    });
    /**
     * An array of times for the control points.
     */
    readonly times: number[];
    /**
     * An array of {@link Cartesian3} control points.
     */
    readonly points: Cartesian3[];
    /**
     * The tangent at the first control point.
     */
    readonly firstTangent: Cartesian3;
    /**
     * The tangent at the last control point.
     */
    readonly lastTangent: Cartesian3;
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: Cartesian3): Cartesian3;
}


/**
 * Contains functions for checking that supplied arguments are of a specified type
 * or meet specified conditions
 */
export const Check: {
  /**
   * Throws if test is not defined
   *
   * @param {string} name The name of the variable being tested
   * @param {*} test The value that is to be checked
   * @exception {DeveloperError} test must be defined
   */
  defined<T>(name: string, test: T): asserts test is NonNullable<T>;
  /**
   * Contains type checking functions, all using the typeof operator
   */
  typeOf: {
    /**
     * Throws if test is not typeof 'string'
     *
     * @param {string} name The name of the variable being tested
     * @param {*} test The value to test
     * @exception {DeveloperError} test must be typeof 'string'
     */
    string(name: string, test: any): asserts test is string;
    /**
     * Throws if test is not typeof 'function'
     *
     * @param {string} name The name of the variable being tested
     * @param {*} test The value to test
     * @exception {DeveloperError} test must be typeof 'function'
     */
    func(name: string, test: any): asserts test is Function;
    /**
     * Throws if test is not typeof 'object'
     *
     * @param {string} name The name of the variable being tested
     * @param {*} test The value to test
     * @exception {DeveloperError} test must be typeof 'object'
     */
    object(
      name: string,
      test: any,
    ): asserts test is Record<string | number | symbol, any>;
    /**
     * Throws if test is not typeof 'boolean'
     *
     * @param {string} name The name of the variable being tested
     * @param {*} test The value to test
     * @exception {DeveloperError} test must be typeof 'boolean'
     */
    bool(name: string, test: any): asserts test is boolean;
    /**
     * Throws if test is not typeof 'bigint'
     *
     * @param {string} name The name of the variable being tested
     * @param {*} test The value to test
     * @exception {DeveloperError} test must be typeof 'bigint'
     */
    bigint(name: string, test: any): asserts test is bigint;
    /**
     * Throws if test is not typeof 'number'
     *
     * @param {string} name The name of the variable being tested
     * @param {*} test The value to test
     * @exception {DeveloperError} test must be typeof 'number'
     */
    number: {
      (name: string, test: any): asserts test is number;
      /**
       * Throws if test is not typeof 'number' and less than limit
       *
       * @param {string} name The name of the variable being tested
       * @param {*} test The value to test
       * @param {number} limit The limit value to compare against
       * @exception {DeveloperError} test must be typeof 'number' and less than limit
       */
      lessThan(name: string, test: any, limit: number): asserts test is number;
      /**
       * Throws if test is not typeof 'number' and less than or equal to limit
       *
       * @param {string} name The name of the variable being tested
       * @param {*} test The value to test
       * @param {number} limit The limit value to compare against
       * @exception {DeveloperError} test must be typeof 'number' and less than or equal to limit
       */
      lessThanOrEquals(
        name: string,
        test: any,
        limit: number,
      ): asserts test is number;
      /**
       * Throws if test is not typeof 'number' and greater than limit
       *
       * @param {string} name The name of the variable being tested
       * @param {*} test The value to test
       * @param {number} limit The limit value to compare against
       * @exception {DeveloperError} test must be typeof 'number' and greater than limit
       */
      greaterThan(
        name: string,
        test: any,
        limit: number,
      ): asserts test is number;
      /**
       * Throws if test is not typeof 'number' and greater than or equal to limit
       *
       * @param {string} name The name of the variable being tested
       * @param {*} test The value to test
       * @param {number} limit The limit value to compare against
       * @exception {DeveloperError} test must be typeof 'number' and greater than or equal to limit
       */
      greaterThanOrEquals(
        name: string,
        test: any,
        limit: number,
      ): asserts test is number;
      /**
       * Throws if test1 and test2 is not typeof 'number' and not equal in value
       *
       * @param {string} name1 The name of the first variable being tested
       * @param {string} name2 The name of the second variable being tested against
       * @param {*} test1 The value to test
       * @param {*} test2 The value to test against
       * @exception {DeveloperError} test1 and test2 should be type of 'number' and be equal in value
       */
      // not yet possible to assert multiple things https://github.com/microsoft/TypeScript/issues/42253
      equals(name1: string, name2: string, test1: any, test2: any): void;
    };
  };
};


/**
 * A description of a circle on the ellipsoid. Circle geometry can be rendered with both {@link Primitive} and {@link GroundPrimitive}.
 * @example
 * // Create a circle.
 * const circle = new Cesium.CircleGeometry({
 *   center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
 *   radius : 100000.0
 * });
 * const geometry = Cesium.CircleGeometry.createGeometry(circle);
 * @param options - Object with the following properties:
 * @param options.center - The circle's center point in the fixed frame.
 * @param options.radius - The radius in meters.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid the circle will be on.
 * @param [options.height = 0.0] - The distance in meters between the circle and the ellipsoid surface.
 * @param [options.granularity = 0.02] - The angular distance between points on the circle in radians.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.extrudedHeight = 0.0] - The distance in meters between the circle's extruded face and the ellipsoid surface.
 * @param [options.stRotation = 0.0] - The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.
 */
export class CircleGeometry {
    constructor(options: {
        center: Cartesian3;
        radius: number;
        ellipsoid?: Ellipsoid;
        height?: number;
        granularity?: number;
        vertexFormat?: VertexFormat;
        extrudedHeight?: number;
        stRotation?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CircleGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CircleGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CircleGeometry): CircleGeometry;
    /**
     * Computes the geometric representation of a circle on an ellipsoid, including its vertices, indices, and a bounding sphere.
     * @param circleGeometry - A description of the circle.
     * @returns The computed vertices and indices.
     */
    static createGeometry(circleGeometry: CircleGeometry): Geometry | undefined;
}

/**
 * A description of the outline of a circle on the ellipsoid.
 * @example
 * // Create a circle.
 * const circle = new Cesium.CircleOutlineGeometry({
 *   center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
 *   radius : 100000.0
 * });
 * const geometry = Cesium.CircleOutlineGeometry.createGeometry(circle);
 * @param options - Object with the following properties:
 * @param options.center - The circle's center point in the fixed frame.
 * @param options.radius - The radius in meters.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid the circle will be on.
 * @param [options.height = 0.0] - The distance in meters between the circle and the ellipsoid surface.
 * @param [options.granularity = 0.02] - The angular distance between points on the circle in radians.
 * @param [options.extrudedHeight = 0.0] - The distance in meters between the circle's extruded face and the ellipsoid surface.
 * @param [options.numberOfVerticalLines = 16] - Number of lines to draw between the top and bottom of an extruded circle.
 */
export class CircleOutlineGeometry {
    constructor(options: {
        center: Cartesian3;
        radius: number;
        ellipsoid?: Ellipsoid;
        height?: number;
        granularity?: number;
        extrudedHeight?: number;
        numberOfVerticalLines?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CircleOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CircleOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CircleOutlineGeometry): CircleOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of a circle on an ellipsoid, including its vertices, indices, and a bounding sphere.
     * @param circleGeometry - A description of the circle.
     * @returns The computed vertices and indices.
     */
    static createGeometry(circleGeometry: CircleOutlineGeometry): Geometry | undefined;
}

/**
 * A simple clock for keeping track of simulated time.
 * @example
 * // Create a clock that loops on Christmas day 2013 and runs in real-time.
 * const clock = new Cesium.Clock({
 *    startTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
 *    currentTime : Cesium.JulianDate.fromIso8601("2013-12-25"),
 *    stopTime : Cesium.JulianDate.fromIso8601("2013-12-26"),
 *    clockRange : Cesium.ClockRange.LOOP_STOP,
 *    clockStep : Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER
 * });
 * @param [options] - Object with the following properties:
 * @param [options.startTime] - The start time of the clock.
 * @param [options.stopTime] - The stop time of the clock.
 * @param [options.currentTime] - The current time.
 * @param [options.multiplier = 1.0] - Determines how much time advances when {@link Clock#tick} is called, negative values allow for advancing backwards.
 * @param [options.clockStep = ClockStep.SYSTEM_CLOCK_MULTIPLIER] - Determines if calls to {@link Clock#tick} are frame dependent or system clock dependent.
 * @param [options.clockRange = ClockRange.UNBOUNDED] - Determines how the clock should behave when {@link Clock#startTime} or {@link Clock#stopTime} is reached.
 * @param [options.canAnimate = true] - Indicates whether {@link Clock#tick} can advance time.  This could be false if data is being buffered, for example.  The clock will only tick when both {@link Clock#canAnimate} and {@link Clock#shouldAnimate} are true.
 * @param [options.shouldAnimate = false] - Indicates whether {@link Clock#tick} should attempt to advance time.  The clock will only tick when both {@link Clock#canAnimate} and {@link Clock#shouldAnimate} are true.
 */
export class Clock {
    constructor(options?: {
        startTime?: JulianDate;
        stopTime?: JulianDate;
        currentTime?: JulianDate;
        multiplier?: number;
        clockStep?: ClockStep;
        clockRange?: ClockRange;
        canAnimate?: boolean;
        shouldAnimate?: boolean;
    });
    /**
     * The start time of the clock.
     */
    startTime: JulianDate;
    /**
     * The stop time of the clock.
     */
    stopTime: JulianDate;
    /**
     * Determines how the clock should behave when
     * {@link Clock#startTime} or {@link Clock#stopTime}
     * is reached.
     */
    clockRange: ClockRange;
    /**
     * Indicates whether {@link Clock#tick} can advance time.  This could be false if data is being buffered,
     * for example.  The clock will only advance time when both
     * {@link Clock#canAnimate} and {@link Clock#shouldAnimate} are true.
     */
    canAnimate: boolean;
    /**
     * An {@link Event} that is fired whenever {@link Clock#tick} is called.
     */
    onTick: Event;
    /**
     * An {@link Event} that is fired whenever {@link Clock#stopTime} is reached.
     */
    onStop: Event;
    /**
     * The current time.
     * Changing this property will change
     * {@link Clock#clockStep} from {@link ClockStep.SYSTEM_CLOCK} to
     * {@link ClockStep.SYSTEM_CLOCK_MULTIPLIER}.
     */
    currentTime: JulianDate;
    /**
     * Gets or sets how much time advances when {@link Clock#tick} is called. Negative values allow for advancing backwards.
     * If {@link Clock#clockStep} is set to {@link ClockStep.TICK_DEPENDENT}, this is the number of seconds to advance.
     * If {@link Clock#clockStep} is set to {@link ClockStep.SYSTEM_CLOCK_MULTIPLIER}, this value is multiplied by the
     * elapsed system time since the last call to {@link Clock#tick}.
     * Changing this property will change
     * {@link Clock#clockStep} from {@link ClockStep.SYSTEM_CLOCK} to
     * {@link ClockStep.SYSTEM_CLOCK_MULTIPLIER}.
     */
    multiplier: number;
    /**
     * Determines if calls to {@link Clock#tick} are frame dependent or system clock dependent.
     * Changing this property to {@link ClockStep.SYSTEM_CLOCK} will set
     * {@link Clock#multiplier} to 1.0, {@link Clock#shouldAnimate} to true, and
     * {@link Clock#currentTime} to the current system clock time.
     */
    clockStep: ClockStep;
    /**
     * Indicates whether {@link Clock#tick} should attempt to advance time.
     * The clock will only advance time when both
     * {@link Clock#canAnimate} and {@link Clock#shouldAnimate} are true.
     * Changing this property will change
     * {@link Clock#clockStep} from {@link ClockStep.SYSTEM_CLOCK} to
     * {@link ClockStep.SYSTEM_CLOCK_MULTIPLIER}.
     */
    shouldAnimate: boolean;
    /**
     * Advances the clock from the current time based on the current configuration options.
     * tick should be called every frame, regardless of whether animation is taking place
     * or not.  To control animation, use the {@link Clock#shouldAnimate} property.
     * @returns The new value of the {@link Clock#currentTime} property.
     */
    tick(): JulianDate;
}

/**
 * Constants used by {@link Clock#tick} to determine behavior
 * when {@link Clock#startTime} or {@link Clock#stopTime} is reached.
 */
export enum ClockRange {
    /**
     * {@link Clock#tick} will always advances the clock in its current direction.
     */
    UNBOUNDED = 0,
    /**
     * When {@link Clock#startTime} or {@link Clock#stopTime} is reached,
     * {@link Clock#tick} will not advance {@link Clock#currentTime} any further.
     */
    CLAMPED = 1,
    /**
     * When {@link Clock#stopTime} is reached, {@link Clock#tick} will advance
     * {@link Clock#currentTime} to the opposite end of the interval.  When
     * time is moving backwards, {@link Clock#tick} will not advance past
     * {@link Clock#startTime}
     */
    LOOP_STOP = 2
}

/**
 * Constants to determine how much time advances with each call
 * to {@link Clock#tick}.
 */
export enum ClockStep {
    /**
     * {@link Clock#tick} advances the current time by a fixed step,
     * which is the number of seconds specified by {@link Clock#multiplier}.
     */
    TICK_DEPENDENT = 0,
    /**
     * {@link Clock#tick} advances the current time by the amount of system
     * time elapsed since the previous call multiplied by {@link Clock#multiplier}.
     */
    SYSTEM_CLOCK_MULTIPLIER = 1,
    /**
     * {@link Clock#tick} sets the clock to the current system time;
     * ignoring all other settings.
     */
    SYSTEM_CLOCK = 2
}

/**
 * A color, specified using red, green, blue, and alpha values,
 * which range from <code>0</code> (no intensity) to <code>1.0</code> (full intensity).
 * @param [red = 1.0] - The red component.
 * @param [green = 1.0] - The green component.
 * @param [blue = 1.0] - The blue component.
 * @param [alpha = 1.0] - The alpha component.
 */
export class Color {
    constructor(red?: number, green?: number, blue?: number, alpha?: number);
    /**
     * The red component.
     */
    red: number;
    /**
     * The green component.
     */
    green: number;
    /**
     * The blue component.
     */
    blue: number;
    /**
     * The alpha component.
     */
    alpha: number;
    /**
     * Creates a Color instance from a {@link Cartesian4}. <code>x</code>, <code>y</code>, <code>z</code>,
     * and <code>w</code> map to <code>red</code>, <code>green</code>, <code>blue</code>, and <code>alpha</code>, respectively.
     * @param cartesian - The source cartesian.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Color instance if one was not provided.
     */
    static fromCartesian4(cartesian: Cartesian4, result?: Color): Color;
    /**
     * Creates a new Color specified using red, green, blue, and alpha values
     * that are in the range of 0 to 255, converting them internally to a range of 0.0 to 1.0.
     * @param [red = 255] - The red component.
     * @param [green = 255] - The green component.
     * @param [blue = 255] - The blue component.
     * @param [alpha = 255] - The alpha component.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Color instance if one was not provided.
     */
    static fromBytes(red?: number, green?: number, blue?: number, alpha?: number, result?: Color): Color;
    /**
     * Creates a new Color that has the same red, green, and blue components
     * of the specified color, but with the specified alpha value.
     * @example
     * const translucentRed = Cesium.Color.fromAlpha(Cesium.Color.RED, 0.9);
     * @param color - The base color
     * @param alpha - The new alpha component.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Color instance if one was not provided.
     */
    static fromAlpha(color: Color, alpha: number, result?: Color): Color;
    /**
     * Creates a new Color from a single numeric unsigned 32-bit RGBA value, using the endianness
     * of the system.
     * @example
     * const color = Cesium.Color.fromRgba(0x67ADDFFF);
     * @param rgba - A single numeric unsigned 32-bit RGBA value.
     * @param [result] - The object to store the result in, if undefined a new instance will be created.
     * @returns The color object.
     */
    static fromRgba(rgba: number, result?: Color): Color;
    /**
     * Creates a Color instance from hue, saturation, and lightness.
     * @param [hue = 0] - The hue angle 0...1
     * @param [saturation = 0] - The saturation value 0...1
     * @param [lightness = 0] - The lightness value 0...1
     * @param [alpha = 1.0] - The alpha component 0...1
     * @param [result] - The object to store the result in, if undefined a new instance will be created.
     * @returns The color object.
     */
    static fromHsl(hue?: number, saturation?: number, lightness?: number, alpha?: number, result?: Color): Color;
    /**
     * Creates a random color using the provided options. For reproducible random colors, you should
     * call {@link Math#setRandomNumberSeed} once at the beginning of your application.
     * @example
     * //Create a completely random color
     * const color = Cesium.Color.fromRandom();
     *
     * //Create a random shade of yellow.
     * const color1 = Cesium.Color.fromRandom({
     *     red : 1.0,
     *     green : 1.0,
     *     alpha : 1.0
     * });
     *
     * //Create a random bright color.
     * const color2 = Cesium.Color.fromRandom({
     *     minimumRed : 0.75,
     *     minimumGreen : 0.75,
     *     minimumBlue : 0.75,
     *     alpha : 1.0
     * });
     * @param [options] - Object with the following properties:
     * @param [options.red] - If specified, the red component to use instead of a randomized value.
     * @param [options.minimumRed = 0.0] - The maximum red value to generate if none was specified.
     * @param [options.maximumRed = 1.0] - The minimum red value to generate if none was specified.
     * @param [options.green] - If specified, the green component to use instead of a randomized value.
     * @param [options.minimumGreen = 0.0] - The maximum green value to generate if none was specified.
     * @param [options.maximumGreen = 1.0] - The minimum green value to generate if none was specified.
     * @param [options.blue] - If specified, the blue component to use instead of a randomized value.
     * @param [options.minimumBlue = 0.0] - The maximum blue value to generate if none was specified.
     * @param [options.maximumBlue = 1.0] - The minimum blue value to generate if none was specified.
     * @param [options.alpha] - If specified, the alpha component to use instead of a randomized value.
     * @param [options.minimumAlpha = 0.0] - The maximum alpha value to generate if none was specified.
     * @param [options.maximumAlpha = 1.0] - The minimum alpha value to generate if none was specified.
     * @param [result] - The object to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    static fromRandom(options?: {
        red?: number;
        minimumRed?: number;
        maximumRed?: number;
        green?: number;
        minimumGreen?: number;
        maximumGreen?: number;
        blue?: number;
        minimumBlue?: number;
        maximumBlue?: number;
        alpha?: number;
        minimumAlpha?: number;
        maximumAlpha?: number;
    }, result?: Color): Color;
    /**
     * Creates a Color instance from a CSS color value.
     * @example
     * const cesiumBlue = Cesium.Color.fromCssColorString('#67ADDF');
     * const green = Cesium.Color.fromCssColorString('green');
     * @param color - The CSS color value in #rgb, #rgba, #rrggbb, #rrggbbaa, rgb(), rgba(), hsl(), or hsla() format.
     * @param [result] - The object to store the result in, if undefined a new instance will be created.
     * @returns The color object, or undefined if the string was not a valid CSS color.
     */
    static fromCssColorString(color: string, result?: Color): Color;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Color, array: number[] | TypedArray, startingIndex?: number): number[] | TypedArray;
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Color instance if one was not provided.
     */
    static unpack(array: number[] | TypedArray, startingIndex?: number, result?: Color): Color;
    /**
     * Converts a 'byte' color component in the range of 0 to 255 into
     * a 'float' color component in the range of 0 to 1.0.
     * @param number - The number to be converted.
     * @returns The converted number.
     */
    static byteToFloat(number: number): number;
    /**
     * Converts a 'float' color component in the range of 0 to 1.0 into
     * a 'byte' color component in the range of 0 to 255.
     * @param number - The number to be converted.
     * @returns The converted number.
     */
    static floatToByte(number: number): number;
    /**
     * Duplicates a Color.
     * @param color - The Color to duplicate.
     * @param [result] - The object to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined. (Returns undefined if color is undefined)
     */
    static clone(color: Color, result?: Color): Color;
    /**
     * Returns true if the first Color equals the second color.
     * @param [left] - The first Color to compare for equality.
     * @param [right] - The second Color to compare for equality.
     * @returns <code>true</code> if the Colors are equal; otherwise, <code>false</code>.
     */
    static equals(left?: Color, right?: Color): boolean;
    /**
     * Compares the provided Color to the values packed into an array, starting at the provided offset.
     * @param color - The color to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the color starts.
     * @returns <code>true</code> if the color matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(color: Color, array: number[], offset: number): boolean;
    /**
     * Returns a duplicate of a Color instance.
     * @param [result] - The object to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    clone(result?: Color): Color;
    /**
     * Returns true if this Color equals other.
     * @param [other] - The Color to compare for equality.
     * @returns <code>true</code> if the Colors are equal; otherwise, <code>false</code>.
     */
    equals(other?: Color): boolean;
    /**
     * Returns <code>true</code> if this Color equals other componentwise within the specified epsilon.
     * @param other - The Color to compare for equality.
     * @param [epsilon = 0.0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if the Colors are equal within the specified epsilon; otherwise, <code>false</code>.
     */
    equalsEpsilon(other: Color, epsilon?: number): boolean;
    /**
     * Creates a string representing this Color in the format '(red, green, blue, alpha)'.
     * @returns A string representing this Color in the format '(red, green, blue, alpha)'.
     */
    toString(): string;
    /**
     * Creates a string containing the CSS color value for this color.
     * @returns The CSS equivalent of this color.
     */
    toCssColorString(): string;
    /**
     * Creates a string containing CSS hex string color value for this color.
     * @returns The CSS hex string equivalent of this color.
     */
    toCssHexString(): string;
    /**
     * Converts this color to an array of red, green, blue, and alpha values
     * that are in the range of 0 to 255.
     * @param [result] - The array to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    toBytes(result?: number[]): number[];
    /**
     * Converts RGBA values in bytes to a single numeric unsigned 32-bit RGBA value, using the endianness
     * of the system.
     * @returns A single numeric unsigned 32-bit RGBA value.
     */
    static bytesToRgba(): number;
    /**
     * Converts this color to a single numeric unsigned 32-bit RGBA value, using the endianness
     * of the system.
     * @example
     * const rgba = Cesium.Color.BLUE.toRgba();
     * @returns A single numeric unsigned 32-bit RGBA value.
     */
    toRgba(): number;
    /**
     * Brightens this color by the provided magnitude.
     * @example
     * const brightBlue = Cesium.Color.BLUE.brighten(0.5, new Cesium.Color());
     * @param magnitude - A positive number indicating the amount to brighten.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    brighten(magnitude: number, result: Color): Color;
    /**
     * Darkens this color by the provided magnitude.
     * @example
     * const darkBlue = Cesium.Color.BLUE.darken(0.5, new Cesium.Color());
     * @param magnitude - A positive number indicating the amount to darken.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    darken(magnitude: number, result: Color): Color;
    /**
     * Creates a new Color that has the same red, green, and blue components
     * as this Color, but with the specified alpha value.
     * @example
     * const translucentRed = Cesium.Color.RED.withAlpha(0.9);
     * @param alpha - The new alpha component.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Color instance if one was not provided.
     */
    withAlpha(alpha: number, result?: Color): Color;
    /**
     * Computes the componentwise sum of two Colors.
     * @param left - The first Color.
     * @param right - The second Color.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Color, right: Color, result: Color): Color;
    /**
     * Computes the componentwise difference of two Colors.
     * @param left - The first Color.
     * @param right - The second Color.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Color, right: Color, result: Color): Color;
    /**
     * Computes the componentwise product of two Colors.
     * @param left - The first Color.
     * @param right - The second Color.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiply(left: Color, right: Color, result: Color): Color;
    /**
     * Computes the componentwise quotient of two Colors.
     * @param left - The first Color.
     * @param right - The second Color.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divide(left: Color, right: Color, result: Color): Color;
    /**
     * Computes the componentwise modulus of two Colors.
     * @param left - The first Color.
     * @param right - The second Color.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static mod(left: Color, right: Color, result: Color): Color;
    /**
     * Computes the linear interpolation or extrapolation at t between the provided colors.
     * @param start - The color corresponding to t at 0.0.
     * @param end - The color corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static lerp(start: Color, end: Color, t: number, result: Color): Color;
    /**
     * Multiplies the provided Color componentwise by the provided scalar.
     * @param color - The Color to be scaled.
     * @param scalar - The scalar to multiply with.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(color: Color, scalar: number, result: Color): Color;
    /**
     * Divides the provided Color componentwise by the provided scalar.
     * @param color - The Color to be divided.
     * @param scalar - The scalar to divide with.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideByScalar(color: Color, scalar: number, result: Color): Color;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * An immutable Color instance initialized to CSS color #F0F8FF
     * <span class="colorSwath" style="background: #F0F8FF;"></span>
     */
    static readonly ALICEBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FAEBD7
     * <span class="colorSwath" style="background: #FAEBD7;"></span>
     */
    static readonly ANTIQUEWHITE: Color;
    /**
     * An immutable Color instance initialized to CSS color #00FFFF
     * <span class="colorSwath" style="background: #00FFFF;"></span>
     */
    static readonly AQUA: Color;
    /**
     * An immutable Color instance initialized to CSS color #7FFFD4
     * <span class="colorSwath" style="background: #7FFFD4;"></span>
     */
    static readonly AQUAMARINE: Color;
    /**
     * An immutable Color instance initialized to CSS color #F0FFFF
     * <span class="colorSwath" style="background: #F0FFFF;"></span>
     */
    static readonly AZURE: Color;
    /**
     * An immutable Color instance initialized to CSS color #F5F5DC
     * <span class="colorSwath" style="background: #F5F5DC;"></span>
     */
    static readonly BEIGE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFE4C4
     * <span class="colorSwath" style="background: #FFE4C4;"></span>
     */
    static readonly BISQUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #000000
     * <span class="colorSwath" style="background: #000000;"></span>
     */
    static readonly BLACK: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFEBCD
     * <span class="colorSwath" style="background: #FFEBCD;"></span>
     */
    static readonly BLANCHEDALMOND: Color;
    /**
     * An immutable Color instance initialized to CSS color #0000FF
     * <span class="colorSwath" style="background: #0000FF;"></span>
     */
    static readonly BLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #8A2BE2
     * <span class="colorSwath" style="background: #8A2BE2;"></span>
     */
    static readonly BLUEVIOLET: Color;
    /**
     * An immutable Color instance initialized to CSS color #A52A2A
     * <span class="colorSwath" style="background: #A52A2A;"></span>
     */
    static readonly BROWN: Color;
    /**
     * An immutable Color instance initialized to CSS color #DEB887
     * <span class="colorSwath" style="background: #DEB887;"></span>
     */
    static readonly BURLYWOOD: Color;
    /**
     * An immutable Color instance initialized to CSS color #5F9EA0
     * <span class="colorSwath" style="background: #5F9EA0;"></span>
     */
    static readonly CADETBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #7FFF00
     * <span class="colorSwath" style="background: #7FFF00;"></span>
     */
    static readonly CHARTREUSE: Color;
    /**
     * An immutable Color instance initialized to CSS color #D2691E
     * <span class="colorSwath" style="background: #D2691E;"></span>
     */
    static readonly CHOCOLATE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF7F50
     * <span class="colorSwath" style="background: #FF7F50;"></span>
     */
    static readonly CORAL: Color;
    /**
     * An immutable Color instance initialized to CSS color #6495ED
     * <span class="colorSwath" style="background: #6495ED;"></span>
     */
    static readonly CORNFLOWERBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFF8DC
     * <span class="colorSwath" style="background: #FFF8DC;"></span>
     */
    static readonly CORNSILK: Color;
    /**
     * An immutable Color instance initialized to CSS color #DC143C
     * <span class="colorSwath" style="background: #DC143C;"></span>
     */
    static readonly CRIMSON: Color;
    /**
     * An immutable Color instance initialized to CSS color #00FFFF
     * <span class="colorSwath" style="background: #00FFFF;"></span>
     */
    static readonly CYAN: Color;
    /**
     * An immutable Color instance initialized to CSS color #00008B
     * <span class="colorSwath" style="background: #00008B;"></span>
     */
    static readonly DARKBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #008B8B
     * <span class="colorSwath" style="background: #008B8B;"></span>
     */
    static readonly DARKCYAN: Color;
    /**
     * An immutable Color instance initialized to CSS color #B8860B
     * <span class="colorSwath" style="background: #B8860B;"></span>
     */
    static readonly DARKGOLDENROD: Color;
    /**
     * An immutable Color instance initialized to CSS color #A9A9A9
     * <span class="colorSwath" style="background: #A9A9A9;"></span>
     */
    static readonly DARKGRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #006400
     * <span class="colorSwath" style="background: #006400;"></span>
     */
    static readonly DARKGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #A9A9A9
     * <span class="colorSwath" style="background: #A9A9A9;"></span>
     */
    static readonly DARKGREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #BDB76B
     * <span class="colorSwath" style="background: #BDB76B;"></span>
     */
    static readonly DARKKHAKI: Color;
    /**
     * An immutable Color instance initialized to CSS color #8B008B
     * <span class="colorSwath" style="background: #8B008B;"></span>
     */
    static readonly DARKMAGENTA: Color;
    /**
     * An immutable Color instance initialized to CSS color #556B2F
     * <span class="colorSwath" style="background: #556B2F;"></span>
     */
    static readonly DARKOLIVEGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF8C00
     * <span class="colorSwath" style="background: #FF8C00;"></span>
     */
    static readonly DARKORANGE: Color;
    /**
     * An immutable Color instance initialized to CSS color #9932CC
     * <span class="colorSwath" style="background: #9932CC;"></span>
     */
    static readonly DARKORCHID: Color;
    /**
     * An immutable Color instance initialized to CSS color #8B0000
     * <span class="colorSwath" style="background: #8B0000;"></span>
     */
    static readonly DARKRED: Color;
    /**
     * An immutable Color instance initialized to CSS color #E9967A
     * <span class="colorSwath" style="background: #E9967A;"></span>
     */
    static readonly DARKSALMON: Color;
    /**
     * An immutable Color instance initialized to CSS color #8FBC8F
     * <span class="colorSwath" style="background: #8FBC8F;"></span>
     */
    static readonly DARKSEAGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #483D8B
     * <span class="colorSwath" style="background: #483D8B;"></span>
     */
    static readonly DARKSLATEBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #2F4F4F
     * <span class="colorSwath" style="background: #2F4F4F;"></span>
     */
    static readonly DARKSLATEGRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #2F4F4F
     * <span class="colorSwath" style="background: #2F4F4F;"></span>
     */
    static readonly DARKSLATEGREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #00CED1
     * <span class="colorSwath" style="background: #00CED1;"></span>
     */
    static readonly DARKTURQUOISE: Color;
    /**
     * An immutable Color instance initialized to CSS color #9400D3
     * <span class="colorSwath" style="background: #9400D3;"></span>
     */
    static readonly DARKVIOLET: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF1493
     * <span class="colorSwath" style="background: #FF1493;"></span>
     */
    static readonly DEEPPINK: Color;
    /**
     * An immutable Color instance initialized to CSS color #00BFFF
     * <span class="colorSwath" style="background: #00BFFF;"></span>
     */
    static readonly DEEPSKYBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #696969
     * <span class="colorSwath" style="background: #696969;"></span>
     */
    static readonly DIMGRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #696969
     * <span class="colorSwath" style="background: #696969;"></span>
     */
    static readonly DIMGREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #1E90FF
     * <span class="colorSwath" style="background: #1E90FF;"></span>
     */
    static readonly DODGERBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #B22222
     * <span class="colorSwath" style="background: #B22222;"></span>
     */
    static readonly FIREBRICK: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFAF0
     * <span class="colorSwath" style="background: #FFFAF0;"></span>
     */
    static readonly FLORALWHITE: Color;
    /**
     * An immutable Color instance initialized to CSS color #228B22
     * <span class="colorSwath" style="background: #228B22;"></span>
     */
    static readonly FORESTGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF00FF
     * <span class="colorSwath" style="background: #FF00FF;"></span>
     */
    static readonly FUCHSIA: Color;
    /**
     * An immutable Color instance initialized to CSS color #DCDCDC
     * <span class="colorSwath" style="background: #DCDCDC;"></span>
     */
    static readonly GAINSBORO: Color;
    /**
     * An immutable Color instance initialized to CSS color #F8F8FF
     * <span class="colorSwath" style="background: #F8F8FF;"></span>
     */
    static readonly GHOSTWHITE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFD700
     * <span class="colorSwath" style="background: #FFD700;"></span>
     */
    static readonly GOLD: Color;
    /**
     * An immutable Color instance initialized to CSS color #DAA520
     * <span class="colorSwath" style="background: #DAA520;"></span>
     */
    static readonly GOLDENROD: Color;
    /**
     * An immutable Color instance initialized to CSS color #808080
     * <span class="colorSwath" style="background: #808080;"></span>
     */
    static readonly GRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #008000
     * <span class="colorSwath" style="background: #008000;"></span>
     */
    static readonly GREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #ADFF2F
     * <span class="colorSwath" style="background: #ADFF2F;"></span>
     */
    static readonly GREENYELLOW: Color;
    /**
     * An immutable Color instance initialized to CSS color #808080
     * <span class="colorSwath" style="background: #808080;"></span>
     */
    static readonly GREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #F0FFF0
     * <span class="colorSwath" style="background: #F0FFF0;"></span>
     */
    static readonly HONEYDEW: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF69B4
     * <span class="colorSwath" style="background: #FF69B4;"></span>
     */
    static readonly HOTPINK: Color;
    /**
     * An immutable Color instance initialized to CSS color #CD5C5C
     * <span class="colorSwath" style="background: #CD5C5C;"></span>
     */
    static readonly INDIANRED: Color;
    /**
     * An immutable Color instance initialized to CSS color #4B0082
     * <span class="colorSwath" style="background: #4B0082;"></span>
     */
    static readonly INDIGO: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFFF0
     * <span class="colorSwath" style="background: #FFFFF0;"></span>
     */
    static readonly IVORY: Color;
    /**
     * An immutable Color instance initialized to CSS color #F0E68C
     * <span class="colorSwath" style="background: #F0E68C;"></span>
     */
    static readonly KHAKI: Color;
    /**
     * An immutable Color instance initialized to CSS color #E6E6FA
     * <span class="colorSwath" style="background: #E6E6FA;"></span>
     */
    static readonly LAVENDER: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFF0F5
     * <span class="colorSwath" style="background: #FFF0F5;"></span>
     */
    static readonly LAVENDAR_BLUSH: Color;
    /**
     * An immutable Color instance initialized to CSS color #7CFC00
     * <span class="colorSwath" style="background: #7CFC00;"></span>
     */
    static readonly LAWNGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFACD
     * <span class="colorSwath" style="background: #FFFACD;"></span>
     */
    static readonly LEMONCHIFFON: Color;
    /**
     * An immutable Color instance initialized to CSS color #ADD8E6
     * <span class="colorSwath" style="background: #ADD8E6;"></span>
     */
    static readonly LIGHTBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #F08080
     * <span class="colorSwath" style="background: #F08080;"></span>
     */
    static readonly LIGHTCORAL: Color;
    /**
     * An immutable Color instance initialized to CSS color #E0FFFF
     * <span class="colorSwath" style="background: #E0FFFF;"></span>
     */
    static readonly LIGHTCYAN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FAFAD2
     * <span class="colorSwath" style="background: #FAFAD2;"></span>
     */
    static readonly LIGHTGOLDENRODYELLOW: Color;
    /**
     * An immutable Color instance initialized to CSS color #D3D3D3
     * <span class="colorSwath" style="background: #D3D3D3;"></span>
     */
    static readonly LIGHTGRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #90EE90
     * <span class="colorSwath" style="background: #90EE90;"></span>
     */
    static readonly LIGHTGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #D3D3D3
     * <span class="colorSwath" style="background: #D3D3D3;"></span>
     */
    static readonly LIGHTGREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFB6C1
     * <span class="colorSwath" style="background: #FFB6C1;"></span>
     */
    static readonly LIGHTPINK: Color;
    /**
     * An immutable Color instance initialized to CSS color #20B2AA
     * <span class="colorSwath" style="background: #20B2AA;"></span>
     */
    static readonly LIGHTSEAGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #87CEFA
     * <span class="colorSwath" style="background: #87CEFA;"></span>
     */
    static readonly LIGHTSKYBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #778899
     * <span class="colorSwath" style="background: #778899;"></span>
     */
    static readonly LIGHTSLATEGRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #778899
     * <span class="colorSwath" style="background: #778899;"></span>
     */
    static readonly LIGHTSLATEGREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #B0C4DE
     * <span class="colorSwath" style="background: #B0C4DE;"></span>
     */
    static readonly LIGHTSTEELBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFFE0
     * <span class="colorSwath" style="background: #FFFFE0;"></span>
     */
    static readonly LIGHTYELLOW: Color;
    /**
     * An immutable Color instance initialized to CSS color #00FF00
     * <span class="colorSwath" style="background: #00FF00;"></span>
     */
    static readonly LIME: Color;
    /**
     * An immutable Color instance initialized to CSS color #32CD32
     * <span class="colorSwath" style="background: #32CD32;"></span>
     */
    static readonly LIMEGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FAF0E6
     * <span class="colorSwath" style="background: #FAF0E6;"></span>
     */
    static readonly LINEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF00FF
     * <span class="colorSwath" style="background: #FF00FF;"></span>
     */
    static readonly MAGENTA: Color;
    /**
     * An immutable Color instance initialized to CSS color #800000
     * <span class="colorSwath" style="background: #800000;"></span>
     */
    static readonly MAROON: Color;
    /**
     * An immutable Color instance initialized to CSS color #66CDAA
     * <span class="colorSwath" style="background: #66CDAA;"></span>
     */
    static readonly MEDIUMAQUAMARINE: Color;
    /**
     * An immutable Color instance initialized to CSS color #0000CD
     * <span class="colorSwath" style="background: #0000CD;"></span>
     */
    static readonly MEDIUMBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #BA55D3
     * <span class="colorSwath" style="background: #BA55D3;"></span>
     */
    static readonly MEDIUMORCHID: Color;
    /**
     * An immutable Color instance initialized to CSS color #9370DB
     * <span class="colorSwath" style="background: #9370DB;"></span>
     */
    static readonly MEDIUMPURPLE: Color;
    /**
     * An immutable Color instance initialized to CSS color #3CB371
     * <span class="colorSwath" style="background: #3CB371;"></span>
     */
    static readonly MEDIUMSEAGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #7B68EE
     * <span class="colorSwath" style="background: #7B68EE;"></span>
     */
    static readonly MEDIUMSLATEBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #00FA9A
     * <span class="colorSwath" style="background: #00FA9A;"></span>
     */
    static readonly MEDIUMSPRINGGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #48D1CC
     * <span class="colorSwath" style="background: #48D1CC;"></span>
     */
    static readonly MEDIUMTURQUOISE: Color;
    /**
     * An immutable Color instance initialized to CSS color #C71585
     * <span class="colorSwath" style="background: #C71585;"></span>
     */
    static readonly MEDIUMVIOLETRED: Color;
    /**
     * An immutable Color instance initialized to CSS color #191970
     * <span class="colorSwath" style="background: #191970;"></span>
     */
    static readonly MIDNIGHTBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #F5FFFA
     * <span class="colorSwath" style="background: #F5FFFA;"></span>
     */
    static readonly MINTCREAM: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFE4E1
     * <span class="colorSwath" style="background: #FFE4E1;"></span>
     */
    static readonly MISTYROSE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFE4B5
     * <span class="colorSwath" style="background: #FFE4B5;"></span>
     */
    static readonly MOCCASIN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFDEAD
     * <span class="colorSwath" style="background: #FFDEAD;"></span>
     */
    static readonly NAVAJOWHITE: Color;
    /**
     * An immutable Color instance initialized to CSS color #000080
     * <span class="colorSwath" style="background: #000080;"></span>
     */
    static readonly NAVY: Color;
    /**
     * An immutable Color instance initialized to CSS color #FDF5E6
     * <span class="colorSwath" style="background: #FDF5E6;"></span>
     */
    static readonly OLDLACE: Color;
    /**
     * An immutable Color instance initialized to CSS color #808000
     * <span class="colorSwath" style="background: #808000;"></span>
     */
    static readonly OLIVE: Color;
    /**
     * An immutable Color instance initialized to CSS color #6B8E23
     * <span class="colorSwath" style="background: #6B8E23;"></span>
     */
    static readonly OLIVEDRAB: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFA500
     * <span class="colorSwath" style="background: #FFA500;"></span>
     */
    static readonly ORANGE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF4500
     * <span class="colorSwath" style="background: #FF4500;"></span>
     */
    static readonly ORANGERED: Color;
    /**
     * An immutable Color instance initialized to CSS color #DA70D6
     * <span class="colorSwath" style="background: #DA70D6;"></span>
     */
    static readonly ORCHID: Color;
    /**
     * An immutable Color instance initialized to CSS color #EEE8AA
     * <span class="colorSwath" style="background: #EEE8AA;"></span>
     */
    static readonly PALEGOLDENROD: Color;
    /**
     * An immutable Color instance initialized to CSS color #98FB98
     * <span class="colorSwath" style="background: #98FB98;"></span>
     */
    static readonly PALEGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #AFEEEE
     * <span class="colorSwath" style="background: #AFEEEE;"></span>
     */
    static readonly PALETURQUOISE: Color;
    /**
     * An immutable Color instance initialized to CSS color #DB7093
     * <span class="colorSwath" style="background: #DB7093;"></span>
     */
    static readonly PALEVIOLETRED: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFEFD5
     * <span class="colorSwath" style="background: #FFEFD5;"></span>
     */
    static readonly PAPAYAWHIP: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFDAB9
     * <span class="colorSwath" style="background: #FFDAB9;"></span>
     */
    static readonly PEACHPUFF: Color;
    /**
     * An immutable Color instance initialized to CSS color #CD853F
     * <span class="colorSwath" style="background: #CD853F;"></span>
     */
    static readonly PERU: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFC0CB
     * <span class="colorSwath" style="background: #FFC0CB;"></span>
     */
    static readonly PINK: Color;
    /**
     * An immutable Color instance initialized to CSS color #DDA0DD
     * <span class="colorSwath" style="background: #DDA0DD;"></span>
     */
    static readonly PLUM: Color;
    /**
     * An immutable Color instance initialized to CSS color #B0E0E6
     * <span class="colorSwath" style="background: #B0E0E6;"></span>
     */
    static readonly POWDERBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #800080
     * <span class="colorSwath" style="background: #800080;"></span>
     */
    static readonly PURPLE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF0000
     * <span class="colorSwath" style="background: #FF0000;"></span>
     */
    static readonly RED: Color;
    /**
     * An immutable Color instance initialized to CSS color #BC8F8F
     * <span class="colorSwath" style="background: #BC8F8F;"></span>
     */
    static readonly ROSYBROWN: Color;
    /**
     * An immutable Color instance initialized to CSS color #4169E1
     * <span class="colorSwath" style="background: #4169E1;"></span>
     */
    static readonly ROYALBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #8B4513
     * <span class="colorSwath" style="background: #8B4513;"></span>
     */
    static readonly SADDLEBROWN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FA8072
     * <span class="colorSwath" style="background: #FA8072;"></span>
     */
    static readonly SALMON: Color;
    /**
     * An immutable Color instance initialized to CSS color #F4A460
     * <span class="colorSwath" style="background: #F4A460;"></span>
     */
    static readonly SANDYBROWN: Color;
    /**
     * An immutable Color instance initialized to CSS color #2E8B57
     * <span class="colorSwath" style="background: #2E8B57;"></span>
     */
    static readonly SEAGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFF5EE
     * <span class="colorSwath" style="background: #FFF5EE;"></span>
     */
    static readonly SEASHELL: Color;
    /**
     * An immutable Color instance initialized to CSS color #A0522D
     * <span class="colorSwath" style="background: #A0522D;"></span>
     */
    static readonly SIENNA: Color;
    /**
     * An immutable Color instance initialized to CSS color #C0C0C0
     * <span class="colorSwath" style="background: #C0C0C0;"></span>
     */
    static readonly SILVER: Color;
    /**
     * An immutable Color instance initialized to CSS color #87CEEB
     * <span class="colorSwath" style="background: #87CEEB;"></span>
     */
    static readonly SKYBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #6A5ACD
     * <span class="colorSwath" style="background: #6A5ACD;"></span>
     */
    static readonly SLATEBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #708090
     * <span class="colorSwath" style="background: #708090;"></span>
     */
    static readonly SLATEGRAY: Color;
    /**
     * An immutable Color instance initialized to CSS color #708090
     * <span class="colorSwath" style="background: #708090;"></span>
     */
    static readonly SLATEGREY: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFAFA
     * <span class="colorSwath" style="background: #FFFAFA;"></span>
     */
    static readonly SNOW: Color;
    /**
     * An immutable Color instance initialized to CSS color #00FF7F
     * <span class="colorSwath" style="background: #00FF7F;"></span>
     */
    static readonly SPRINGGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS color #4682B4
     * <span class="colorSwath" style="background: #4682B4;"></span>
     */
    static readonly STEELBLUE: Color;
    /**
     * An immutable Color instance initialized to CSS color #D2B48C
     * <span class="colorSwath" style="background: #D2B48C;"></span>
     */
    static readonly TAN: Color;
    /**
     * An immutable Color instance initialized to CSS color #008080
     * <span class="colorSwath" style="background: #008080;"></span>
     */
    static readonly TEAL: Color;
    /**
     * An immutable Color instance initialized to CSS color #D8BFD8
     * <span class="colorSwath" style="background: #D8BFD8;"></span>
     */
    static readonly THISTLE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FF6347
     * <span class="colorSwath" style="background: #FF6347;"></span>
     */
    static readonly TOMATO: Color;
    /**
     * An immutable Color instance initialized to CSS color #40E0D0
     * <span class="colorSwath" style="background: #40E0D0;"></span>
     */
    static readonly TURQUOISE: Color;
    /**
     * An immutable Color instance initialized to CSS color #EE82EE
     * <span class="colorSwath" style="background: #EE82EE;"></span>
     */
    static readonly VIOLET: Color;
    /**
     * An immutable Color instance initialized to CSS color #F5DEB3
     * <span class="colorSwath" style="background: #F5DEB3;"></span>
     */
    static readonly WHEAT: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFFFF
     * <span class="colorSwath" style="background: #FFFFFF;"></span>
     */
    static readonly WHITE: Color;
    /**
     * An immutable Color instance initialized to CSS color #F5F5F5
     * <span class="colorSwath" style="background: #F5F5F5;"></span>
     */
    static readonly WHITESMOKE: Color;
    /**
     * An immutable Color instance initialized to CSS color #FFFF00
     * <span class="colorSwath" style="background: #FFFF00;"></span>
     */
    static readonly YELLOW: Color;
    /**
     * An immutable Color instance initialized to CSS color #9ACD32
     * <span class="colorSwath" style="background: #9ACD32;"></span>
     */
    static readonly YELLOWGREEN: Color;
    /**
     * An immutable Color instance initialized to CSS transparent.
     * <span class="colorSwath" style="background: transparent;"></span>
     */
    static readonly TRANSPARENT: Color;
}

/**
 * Value and type information for per-instance geometry color.
 * @example
 * const instance = new Cesium.GeometryInstance({
 *   geometry : Cesium.BoxGeometry.fromDimensions({
 *     dimensions : new Cesium.Cartesian3(1000000.0, 1000000.0, 500000.0)
 *   }),
 *   modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
 *     Cesium.Cartesian3.fromDegrees(0.0, 0.0)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
 *   id : 'box',
 *   attributes : {
 *     color : new Cesium.ColorGeometryInstanceAttribute(red, green, blue, alpha)
 *   }
 * });
 * @param [red = 1.0] - The red component.
 * @param [green = 1.0] - The green component.
 * @param [blue = 1.0] - The blue component.
 * @param [alpha = 1.0] - The alpha component.
 */
export class ColorGeometryInstanceAttribute {
    constructor(red?: number, green?: number, blue?: number, alpha?: number);
    /**
     * The values for the attributes stored in a typed array.
     */
    value: Uint8Array;
    /**
     * The datatype of each component in the attribute, e.g., individual elements in
     * {@link ColorGeometryInstanceAttribute#value}.
     */
    readonly componentDatatype: ComponentDatatype;
    /**
     * The number of components in the attributes, i.e., {@link ColorGeometryInstanceAttribute#value}.
     */
    readonly componentsPerAttribute: number;
    /**
     * When <code>true</code> and <code>componentDatatype</code> is an integer format,
     * indicate that the components should be mapped to the range [0, 1] (unsigned)
     * or [-1, 1] (signed) when they are accessed as floating-point for rendering.
     */
    readonly normalize: boolean;
    /**
     * Creates a new {@link ColorGeometryInstanceAttribute} instance given the provided {@link Color}.
     * @example
     * const instance = new Cesium.GeometryInstance({
     *   geometry : geometry,
     *   attributes : {
     *     color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.CORNFLOWERBLUE),
     *   }
     * });
     * @param color - The color.
     * @returns The new {@link ColorGeometryInstanceAttribute} instance.
     */
    static fromColor(color: Color): ColorGeometryInstanceAttribute;
    /**
     * Converts a color to a typed array that can be used to assign a color attribute.
     * @example
     * const attributes = primitive.getGeometryInstanceAttributes('an id');
     * attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUA, attributes.color);
     * @param color - The color.
     * @param [result] - The array to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    static toValue(color: Color, result?: Uint8Array): Uint8Array;
    /**
     * Compares the provided ColorGeometryInstanceAttributes and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first ColorGeometryInstanceAttribute.
     * @param [right] - The second ColorGeometryInstanceAttribute.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: ColorGeometryInstanceAttribute, right?: ColorGeometryInstanceAttribute): boolean;
}

/**
 * WebGL component datatypes.  Components are intrinsics,
 * which form attributes, which form vertices.
 */
export enum ComponentDatatype {
    /**
     * 8-bit signed byte corresponding to <code>gl.BYTE</code> and the type
     * of an element in <code>Int8Array</code>.
     */
    BYTE = WebGLConstants.BYTE,
    /**
     * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
     * of an element in <code>Uint8Array</code>.
     */
    UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,
    /**
     * 16-bit signed short corresponding to <code>SHORT</code> and the type
     * of an element in <code>Int16Array</code>.
     */
    SHORT = WebGLConstants.SHORT,
    /**
     * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
     * of an element in <code>Uint16Array</code>.
     */
    UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,
    /**
     * 32-bit signed int corresponding to <code>INT</code> and the type
     * of an element in <code>Int32Array</code>.
     */
    INT = WebGLConstants.INT,
    /**
     * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
     * of an element in <code>Uint32Array</code>.
     */
    UNSIGNED_INT = WebGLConstants.UNSIGNED_INT,
    /**
     * 32-bit floating-point corresponding to <code>FLOAT</code> and the type
     * of an element in <code>Float32Array</code>.
     */
    FLOAT = WebGLConstants.FLOAT,
    /**
     * 64-bit floating-point corresponding to <code>gl.DOUBLE</code> (in Desktop OpenGL;
     * this is not supported in WebGL, and is emulated in Cesium via {@link GeometryPipeline.encodeAttribute})
     * and the type of an element in <code>Float64Array</code>.
     */
    DOUBLE = WebGLConstants.DOUBLE
}

/**
 * A spline that evaluates to a constant value. Although this follows the {@link Spline} interface,
 * it does not maintain an internal array of times since its value never changes.
 * @example
 * const position = new Cesium.Cartesian3(1.0, 2.0, 3.0);
 * const spline = new Cesium.ConstantSpline(position);
 *
 * const p0 = spline.evaluate(0.0);
 * @param value - The constant value that the spline evaluates to.
 */
export class ConstantSpline {
    constructor(value: number | Cartesian3 | Quaternion);
    /**
     * The constant value that the spline evaluates to.
     */
    readonly value: number | Cartesian3 | Quaternion;
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     *
     * Since a constant spline has no internal times array, this will throw an error.
     * @param time - The time.
     */
    findTimeInterval(time: number): void;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or the value that the constant spline represents.
     */
    evaluate(time: number, result?: Cartesian3 | Quaternion): number | Cartesian3 | Quaternion;
}

/**
 * A description of a polygon composed of arbitrary coplanar positions.
 * @example
 * const polygonGeometry = new Cesium.CoplanarPolygonGeometry({
 *  polygonHierarchy: new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArrayHeights([
 *      -90.0, 30.0, 0.0,
 *      -90.0, 30.0, 300000.0,
 *      -80.0, 30.0, 300000.0,
 *      -80.0, 30.0, 0.0
 *   ]))
 * });
 * @param options - Object with the following properties:
 * @param options.polygonHierarchy - A polygon hierarchy that can include holes.
 * @param [options.stRotation = 0.0] - The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.textureCoordinates] - Texture coordinates as a {@link PolygonHierarchy} of {@link Cartesian2} points.
 */
export class CoplanarPolygonGeometry {
    constructor(options: {
        polygonHierarchy: PolygonHierarchy;
        stRotation?: number;
        vertexFormat?: VertexFormat;
        ellipsoid?: Ellipsoid;
        textureCoordinates?: PolygonHierarchy;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * A description of a coplanar polygon from an array of positions.
     * @example
     * // create a polygon from points
     * const polygon = Cesium.CoplanarPolygonGeometry.fromPositions({
     *   positions : Cesium.Cartesian3.fromDegreesArray([
     *     -72.0, 40.0,
     *     -70.0, 35.0,
     *     -75.0, 30.0,
     *     -70.0, 30.0,
     *     -68.0, 40.0
     *   ])
     * });
     * const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
     * @param options - Object with the following properties:
     * @param options.positions - An array of positions that defined the corner points of the polygon.
     * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
     * @param [options.stRotation = 0.0] - The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
     * @param [options.textureCoordinates] - Texture coordinates as a {@link PolygonHierarchy} of {@link Cartesian2} points.
     */
    static fromPositions(options: {
        positions: Cartesian3[];
        vertexFormat?: VertexFormat;
        stRotation?: number;
        ellipsoid?: Ellipsoid;
        textureCoordinates?: PolygonHierarchy;
    }): CoplanarPolygonGeometry;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CoplanarPolygonGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CoplanarPolygonGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CoplanarPolygonGeometry): CoplanarPolygonGeometry;
    /**
     * Computes the geometric representation of an arbitrary coplanar polygon, including its vertices, indices, and a bounding sphere.
     * @param polygonGeometry - A description of the polygon.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polygonGeometry: CoplanarPolygonGeometry): Geometry | undefined;
}

/**
 * A description of the outline of a polygon composed of arbitrary coplanar positions.
 * @example
 * const polygonOutline = new Cesium.CoplanarPolygonOutlineGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArrayHeights([
 *      -90.0, 30.0, 0.0,
 *      -90.0, 30.0, 1000.0,
 *      -80.0, 30.0, 1000.0,
 *      -80.0, 30.0, 0.0
 *   ])
 * });
 * const geometry = Cesium.CoplanarPolygonOutlineGeometry.createGeometry(polygonOutline);
 * @param options - Object with the following properties:
 * @param options.polygonHierarchy - A polygon hierarchy that can include holes.
 */
export class CoplanarPolygonOutlineGeometry {
    constructor(options: {
        polygonHierarchy: PolygonHierarchy;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * A description of a coplanar polygon outline from an array of positions.
     * @param options - Object with the following properties:
     * @param options.positions - An array of positions that defined the corner points of the polygon.
     */
    static fromPositions(options: {
        positions: Cartesian3[];
    }): CoplanarPolygonOutlineGeometry;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CoplanarPolygonOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CoplanarPolygonOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CoplanarPolygonOutlineGeometry): CoplanarPolygonOutlineGeometry;
    /**
     * Computes the geometric representation of an arbitrary coplanar polygon, including its vertices, indices, and a bounding sphere.
     * @param polygonGeometry - A description of the polygon.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polygonGeometry: CoplanarPolygonOutlineGeometry): Geometry | undefined;
}

/**
 * Style options for corners.
 */
export enum CornerType {
    /**
     * <img src="Images/CornerTypeRounded.png" style="vertical-align: middle;" width="186" height="189" />
     *
     * Corner has a smooth edge.
     */
    ROUNDED = 0,
    /**
     * <img src="Images/CornerTypeMitered.png" style="vertical-align: middle;" width="186" height="189" />
     *
     * Corner point is the intersection of adjacent edges.
     */
    MITERED = 1,
    /**
     * <img src="Images/CornerTypeBeveled.png" style="vertical-align: middle;" width="186" height="189" />
     *
     * Corner is clipped.
     */
    BEVELED = 2
}

/**
 * A description of a corridor. Corridor geometry can be rendered with both {@link Primitive} and {@link GroundPrimitive}.
 * @example
 * const corridor = new Cesium.CorridorGeometry({
 *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
 *   positions : Cesium.Cartesian3.fromDegreesArray([-72.0, 40.0, -70.0, 35.0]),
 *   width : 100000
 * });
 * @param options - Object with the following properties:
 * @param options.positions - An array of positions that define the center of the corridor.
 * @param options.width - The distance between the edges of the corridor in meters.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.height = 0] - The distance in meters between the ellipsoid surface and the positions.
 * @param [options.extrudedHeight] - The distance in meters between the ellipsoid surface and the extruded face.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.cornerType = CornerType.ROUNDED] - Determines the style of the corners.
 */
export class CorridorGeometry {
    constructor(options: {
        positions: Cartesian3[];
        width: number;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        height?: number;
        extrudedHeight?: number;
        vertexFormat?: VertexFormat;
        cornerType?: CornerType;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CorridorGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CorridorGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CorridorGeometry): CorridorGeometry;
    /**
     * Computes the bounding rectangle given the provided options
     * @param options - Object with the following properties:
     * @param options.positions - An array of positions that define the center of the corridor.
     * @param options.width - The distance between the edges of the corridor in meters.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
     * @param [options.cornerType = CornerType.ROUNDED] - Determines the style of the corners.
     * @param [result] - An object in which to store the result.
     * @returns The result rectangle.
     */
    static computeRectangle(options: {
        positions: Cartesian3[];
        width: number;
        ellipsoid?: Ellipsoid;
        cornerType?: CornerType;
    }, result?: Rectangle): Rectangle;
    /**
     * Computes the geometric representation of a corridor, including its vertices, indices, and a bounding sphere.
     * @param corridorGeometry - A description of the corridor.
     * @returns The computed vertices and indices.
     */
    static createGeometry(corridorGeometry: CorridorGeometry): Geometry | undefined;
}

/**
 * A description of a corridor outline.
 * @example
 * const corridor = new Cesium.CorridorOutlineGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArray([-72.0, 40.0, -70.0, 35.0]),
 *   width : 100000
 * });
 * @param options - Object with the following properties:
 * @param options.positions - An array of positions that define the center of the corridor outline.
 * @param options.width - The distance between the edges of the corridor outline.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.height = 0] - The distance in meters between the positions and the ellipsoid surface.
 * @param [options.extrudedHeight] - The distance in meters between the extruded face and the ellipsoid surface.
 * @param [options.cornerType = CornerType.ROUNDED] - Determines the style of the corners.
 */
export class CorridorOutlineGeometry {
    constructor(options: {
        positions: Cartesian3[];
        width: number;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        height?: number;
        extrudedHeight?: number;
        cornerType?: CornerType;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CorridorOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CorridorOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CorridorOutlineGeometry): CorridorOutlineGeometry;
    /**
     * Computes the geometric representation of a corridor, including its vertices, indices, and a bounding sphere.
     * @param corridorOutlineGeometry - A description of the corridor.
     * @returns The computed vertices and indices.
     */
    static createGeometry(corridorOutlineGeometry: CorridorOutlineGeometry): Geometry | undefined;
}

/**
 * Defines functions for 3rd order polynomial functions of one variable with only real coefficients.
 */
export namespace CubicRealPolynomial {
    /**
     * Provides the discriminant of the cubic equation from the supplied coefficients.
     * @param a - The coefficient of the 3rd order monomial.
     * @param b - The coefficient of the 2nd order monomial.
     * @param c - The coefficient of the 1st order monomial.
     * @param d - The coefficient of the 0th order monomial.
     * @returns The value of the discriminant.
     */
    function computeDiscriminant(a: number, b: number, c: number, d: number): number;
    /**
     * Provides the real valued roots of the cubic polynomial with the provided coefficients.
     * @param a - The coefficient of the 3rd order monomial.
     * @param b - The coefficient of the 2nd order monomial.
     * @param c - The coefficient of the 1st order monomial.
     * @param d - The coefficient of the 0th order monomial.
     * @returns The real valued roots.
     */
    function computeRealRoots(a: number, b: number, c: number, d: number): number[];
}

/**
 * The culling volume defined by planes.
 * @param [planes] - An array of clipping planes.
 */
export class CullingVolume {
    constructor(planes?: Cartesian4[]);
    /**
     * Each plane is represented by a Cartesian4 object, where the x, y, and z components
     * define the unit vector normal to the plane, and the w component is the distance of the
     * plane from the origin.
     */
    planes: Cartesian4[];
    /**
     * Constructs a culling volume from a bounding sphere. Creates six planes that create a box containing the sphere.
     * The planes are aligned to the x, y, and z axes in world coordinates.
     * @param boundingSphere - The bounding sphere used to create the culling volume.
     * @param [result] - The object onto which to store the result.
     * @returns The culling volume created from the bounding sphere.
     */
    static fromBoundingSphere(boundingSphere: BoundingSphere, result?: CullingVolume): CullingVolume;
    /**
     * Determines whether a bounding volume intersects the culling volume.
     * @param boundingVolume - The bounding volume whose intersection with the culling volume is to be tested.
     * @returns Intersect.OUTSIDE, Intersect.INTERSECTING, or Intersect.INSIDE.
     */
    computeVisibility(boundingVolume: any): Intersect;
}

/**
 * A description of a cylinder.
 * @example
 * // create cylinder geometry
 * const cylinder = new Cesium.CylinderGeometry({
 *     length: 200000,
 *     topRadius: 80000,
 *     bottomRadius: 200000,
 * });
 * const geometry = Cesium.CylinderGeometry.createGeometry(cylinder);
 * @param options - Object with the following properties:
 * @param options.length - The length of the cylinder.
 * @param options.topRadius - The radius of the top of the cylinder.
 * @param options.bottomRadius - The radius of the bottom of the cylinder.
 * @param [options.slices = 128] - The number of edges around the perimeter of the cylinder.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class CylinderGeometry {
    constructor(options: {
        length: number;
        topRadius: number;
        bottomRadius: number;
        slices?: number;
        vertexFormat?: VertexFormat;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CylinderGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CylinderGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CylinderGeometry): CylinderGeometry;
    /**
     * Computes the geometric representation of a cylinder, including its vertices, indices, and a bounding sphere.
     * @param cylinderGeometry - A description of the cylinder.
     * @returns The computed vertices and indices.
     */
    static createGeometry(cylinderGeometry: CylinderGeometry): Geometry | undefined;
}

/**
 * A description of the outline of a cylinder.
 * @example
 * // create cylinder geometry
 * const cylinder = new Cesium.CylinderOutlineGeometry({
 *     length: 200000,
 *     topRadius: 80000,
 *     bottomRadius: 200000,
 * });
 * const geometry = Cesium.CylinderOutlineGeometry.createGeometry(cylinder);
 * @param options - Object with the following properties:
 * @param options.length - The length of the cylinder.
 * @param options.topRadius - The radius of the top of the cylinder.
 * @param options.bottomRadius - The radius of the bottom of the cylinder.
 * @param [options.slices = 128] - The number of edges around the perimeter of the cylinder.
 * @param [options.numberOfVerticalLines = 16] - Number of lines to draw between the top and bottom surfaces of the cylinder.
 */
export class CylinderOutlineGeometry {
    constructor(options: {
        length: number;
        topRadius: number;
        bottomRadius: number;
        slices?: number;
        numberOfVerticalLines?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: CylinderOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new CylinderOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: CylinderOutlineGeometry): CylinderOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of a cylinder, including its vertices, indices, and a bounding sphere.
     * @param cylinderGeometry - A description of the cylinder outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(cylinderGeometry: CylinderOutlineGeometry): Geometry | undefined;
}

/**
 * Constructs an exception object that is thrown due to a developer error, e.g., invalid argument,
 * argument out of range, etc.  This exception should only be thrown during development;
 * it usually indicates a bug in the calling code.  This exception should never be
 * caught; instead the calling code should strive not to generate it.
 * <br /><br />
 * On the other hand, a {@link RuntimeError} indicates an exception that may
 * be thrown at runtime, e.g., out of memory, that the calling code should be prepared
 * to catch.
 * @param [message] - The error message for this exception.
 */
export class DeveloperError extends Error {
    constructor(message?: string);
    /**
     * 'DeveloperError' indicating that this exception was thrown due to a developer error.
     */
    readonly name: string;
    /**
     * The explanation for why this exception was thrown.
     */
    readonly message: string;
    /**
     * The stack trace of this exception, if available.
     */
    readonly stack: string;
    static throwInstantiationError(): never;
}

/**
 * Determines visibility based on the distance to the camera.
 * @example
 * // Make a billboard that is only visible when the distance to the camera is between 10 and 20 meters.
 * billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20.0);
 * @param [near = 0.0] - The smallest distance in the interval where the object is visible.
 * @param [far = Number.MAX_VALUE] - The largest distance in the interval where the object is visible.
 */
export class DistanceDisplayCondition {
    constructor(near?: number, far?: number);
    /**
     * The smallest distance in the interval where the object is visible.
     */
    near: number;
    /**
     * The largest distance in the interval where the object is visible.
     */
    far: number;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: DistanceDisplayCondition, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new DistanceDisplayCondition instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: DistanceDisplayCondition): DistanceDisplayCondition;
    /**
     * Determines if two distance display conditions are equal.
     * @param [left] - A distance display condition.
     * @param [right] - Another distance display condition.
     * @returns Whether the two distance display conditions are equal.
     */
    static equals(left?: DistanceDisplayCondition, right?: DistanceDisplayCondition): boolean;
    /**
     * Duplicates a distance display condition instance.
     * @param [value] - The distance display condition to duplicate.
     * @param [result] - The result onto which to store the result.
     * @returns The duplicated instance.
     */
    static clone(value?: DistanceDisplayCondition, result?: DistanceDisplayCondition): DistanceDisplayCondition;
    /**
     * Duplicates this instance.
     * @param [result] - The result onto which to store the result.
     * @returns The duplicated instance.
     */
    clone(result?: DistanceDisplayCondition): DistanceDisplayCondition;
    /**
     * Determines if this distance display condition is equal to another.
     * @param [other] - Another distance display condition.
     * @returns Whether this distance display condition is equal to the other.
     */
    equals(other?: DistanceDisplayCondition): boolean;
}

/**
 * Value and type information for per-instance geometry attribute that determines if the geometry instance has a distance display condition.
 * @example
 * const instance = new Cesium.GeometryInstance({
 *   geometry : new Cesium.BoxGeometry({
 *     vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL,
 *     minimum : new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0),
 *     maximum : new Cesium.Cartesian3(250000.0, 250000.0, 250000.0)
 *   }),
 *   modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
 *     Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
 *   id : 'box',
 *   attributes : {
 *     distanceDisplayCondition : new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(100.0, 10000.0)
 *   }
 * });
 * @param [near = 0.0] - The near distance.
 * @param [far = Number.MAX_VALUE] - The far distance.
 */
export class DistanceDisplayConditionGeometryInstanceAttribute {
    constructor(near?: number, far?: number);
    /**
     * The values for the attributes stored in a typed array.
     */
    value: Float32Array;
    /**
     * The datatype of each component in the attribute, e.g., individual elements in
     * {@link DistanceDisplayConditionGeometryInstanceAttribute#value}.
     */
    readonly componentDatatype: ComponentDatatype;
    /**
     * The number of components in the attributes, i.e., {@link DistanceDisplayConditionGeometryInstanceAttribute#value}.
     */
    readonly componentsPerAttribute: number;
    /**
     * When <code>true</code> and <code>componentDatatype</code> is an integer format,
     * indicate that the components should be mapped to the range [0, 1] (unsigned)
     * or [-1, 1] (signed) when they are accessed as floating-point for rendering.
     */
    readonly normalize: boolean;
    /**
     * Creates a new {@link DistanceDisplayConditionGeometryInstanceAttribute} instance given the provided an enabled flag and {@link DistanceDisplayCondition}.
     * @example
     * const distanceDisplayCondition = new Cesium.DistanceDisplayCondition(100.0, 10000.0);
     * const instance = new Cesium.GeometryInstance({
     *   geometry : geometry,
     *   attributes : {
     *     distanceDisplayCondition : Cesium.DistanceDisplayConditionGeometryInstanceAttribute.fromDistanceDisplayCondition(distanceDisplayCondition)
     *   }
     * });
     * @param distanceDisplayCondition - The distance display condition.
     * @returns The new {@link DistanceDisplayConditionGeometryInstanceAttribute} instance.
     */
    static fromDistanceDisplayCondition(distanceDisplayCondition: DistanceDisplayCondition): DistanceDisplayConditionGeometryInstanceAttribute;
    /**
     * Converts a distance display condition to a typed array that can be used to assign a distance display condition attribute.
     * @example
     * const attributes = primitive.getGeometryInstanceAttributes('an id');
     * attributes.distanceDisplayCondition = Cesium.DistanceDisplayConditionGeometryInstanceAttribute.toValue(distanceDisplayCondition, attributes.distanceDisplayCondition);
     * @param distanceDisplayCondition - The distance display condition value.
     * @param [result] - The array to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    static toValue(distanceDisplayCondition: DistanceDisplayCondition, result?: Float32Array): Float32Array;
}

/**
 * A description of an ellipse on an ellipsoid. Ellipse geometry can be rendered with both {@link Primitive} and {@link GroundPrimitive}.
 * @example
 * // Create an ellipse.
 * const ellipse = new Cesium.EllipseGeometry({
 *   center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
 *   semiMajorAxis : 500000.0,
 *   semiMinorAxis : 300000.0,
 *   rotation : Cesium.Math.toRadians(60.0)
 * });
 * const geometry = Cesium.EllipseGeometry.createGeometry(ellipse);
 * @param options - Object with the following properties:
 * @param options.center - The ellipse's center point in the fixed frame.
 * @param options.semiMajorAxis - The length of the ellipse's semi-major axis in meters.
 * @param options.semiMinorAxis - The length of the ellipse's semi-minor axis in meters.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid the ellipse will be on.
 * @param [options.height = 0.0] - The distance in meters between the ellipse and the ellipsoid surface.
 * @param [options.extrudedHeight] - The distance in meters between the ellipse's extruded face and the ellipsoid surface.
 * @param [options.rotation = 0.0] - The angle of rotation counter-clockwise from north.
 * @param [options.stRotation = 0.0] - The rotation of the texture coordinates counter-clockwise from north.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The angular distance between points on the ellipse in radians.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class EllipseGeometry {
    constructor(options: {
        center: Cartesian3;
        semiMajorAxis: number;
        semiMinorAxis: number;
        ellipsoid?: Ellipsoid;
        height?: number;
        extrudedHeight?: number;
        rotation?: number;
        stRotation?: number;
        granularity?: number;
        vertexFormat?: VertexFormat;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: EllipseGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new EllipseGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: EllipseGeometry): EllipseGeometry;
    /**
     * Computes the bounding rectangle based on the provided options
     * @param options - Object with the following properties:
     * @param options.center - The ellipse's center point in the fixed frame.
     * @param options.semiMajorAxis - The length of the ellipse's semi-major axis in meters.
     * @param options.semiMinorAxis - The length of the ellipse's semi-minor axis in meters.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid the ellipse will be on.
     * @param [options.rotation = 0.0] - The angle of rotation counter-clockwise from north.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The angular distance between points on the ellipse in radians.
     * @param [result] - An object in which to store the result
     * @returns The result rectangle
     */
    static computeRectangle(options: {
        center: Cartesian3;
        semiMajorAxis: number;
        semiMinorAxis: number;
        ellipsoid?: Ellipsoid;
        rotation?: number;
        granularity?: number;
    }, result?: Rectangle): Rectangle;
    /**
     * Computes the geometric representation of a ellipse on an ellipsoid, including its vertices, indices, and a bounding sphere.
     * @param ellipseGeometry - A description of the ellipse.
     * @returns The computed vertices and indices.
     */
    static createGeometry(ellipseGeometry: EllipseGeometry): Geometry | undefined;
}

/**
 * A description of the outline of an ellipse on an ellipsoid.
 * @example
 * const ellipse = new Cesium.EllipseOutlineGeometry({
 *   center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
 *   semiMajorAxis : 500000.0,
 *   semiMinorAxis : 300000.0,
 *   rotation : Cesium.Math.toRadians(60.0)
 * });
 * const geometry = Cesium.EllipseOutlineGeometry.createGeometry(ellipse);
 * @param options - Object with the following properties:
 * @param options.center - The ellipse's center point in the fixed frame.
 * @param options.semiMajorAxis - The length of the ellipse's semi-major axis in meters.
 * @param options.semiMinorAxis - The length of the ellipse's semi-minor axis in meters.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid the ellipse will be on.
 * @param [options.height = 0.0] - The distance in meters between the ellipse and the ellipsoid surface.
 * @param [options.extrudedHeight] - The distance in meters between the ellipse's extruded face and the ellipsoid surface.
 * @param [options.rotation = 0.0] - The angle from north (counter-clockwise) in radians.
 * @param [options.granularity = 0.02] - The angular distance between points on the ellipse in radians.
 * @param [options.numberOfVerticalLines = 16] - Number of lines to draw between the top and bottom surface of an extruded ellipse.
 */
export class EllipseOutlineGeometry {
    constructor(options: {
        center: Cartesian3;
        semiMajorAxis: number;
        semiMinorAxis: number;
        ellipsoid?: Ellipsoid;
        height?: number;
        extrudedHeight?: number;
        rotation?: number;
        granularity?: number;
        numberOfVerticalLines?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: EllipseOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new EllipseOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: EllipseOutlineGeometry): EllipseOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of an ellipse on an ellipsoid, including its vertices, indices, and a bounding sphere.
     * @param ellipseGeometry - A description of the ellipse.
     * @returns The computed vertices and indices.
     */
    static createGeometry(ellipseGeometry: EllipseOutlineGeometry): Geometry | undefined;
}

/**
 * A quadratic surface defined in Cartesian coordinates by the equation
 * <code>(x / a)^2 + (y / b)^2 + (z / c)^2 = 1</code>.  Primarily used
 * by Cesium to represent the shape of planetary bodies.
 *
 * Rather than constructing this object directly, one of the provided
 * constants is normally used.
 * @param [x = 0] - The radius in the x direction.
 * @param [y = 0] - The radius in the y direction.
 * @param [z = 0] - The radius in the z direction.
 */
export class Ellipsoid {
    constructor(x?: number, y?: number, z?: number);
    /**
     * Gets the radii of the ellipsoid.
     */
    readonly radii: Cartesian3;
    /**
     * Gets the squared radii of the ellipsoid.
     */
    readonly radiiSquared: Cartesian3;
    /**
     * Gets the radii of the ellipsoid raise to the fourth power.
     */
    readonly radiiToTheFourth: Cartesian3;
    /**
     * Gets one over the radii of the ellipsoid.
     */
    readonly oneOverRadii: Cartesian3;
    /**
     * Gets one over the squared radii of the ellipsoid.
     */
    readonly oneOverRadiiSquared: Cartesian3;
    /**
     * Gets the minimum radius of the ellipsoid.
     */
    readonly minimumRadius: number;
    /**
     * Gets the maximum radius of the ellipsoid.
     */
    readonly maximumRadius: number;
    /**
     * Duplicates an Ellipsoid instance.
     * @param ellipsoid - The ellipsoid to duplicate.
     * @param [result] - The object onto which to store the result, or undefined if a new
     *                    instance should be created.
     * @returns The cloned Ellipsoid. (Returns undefined if ellipsoid is undefined)
     */
    static clone(ellipsoid: Ellipsoid, result?: Ellipsoid): Ellipsoid;
    /**
     * Computes an Ellipsoid from a Cartesian specifying the radii in x, y, and z directions.
     * @param [cartesian = Cartesian3.ZERO] - The ellipsoid's radius in the x, y, and z directions.
     * @param [result] - The object onto which to store the result, or undefined if a new
     *                    instance should be created.
     * @returns A new Ellipsoid instance.
     */
    static fromCartesian3(cartesian?: Cartesian3, result?: Ellipsoid): Ellipsoid;
    /**
     * The default ellipsoid used when not otherwise specified.
     * @example
     * Cesium.Ellipsoid.default = Cesium.Ellipsoid.MOON;
     *
     * // Apollo 11 landing site
     * const position = Cesium.Cartesian3.fromRadians(
     *   0.67416,
     *   23.47315,
     * );
     */
    static default: Ellipsoid;
    /**
     * Duplicates an Ellipsoid instance.
     * @param [result] - The object onto which to store the result, or undefined if a new
     *                    instance should be created.
     * @returns The cloned Ellipsoid.
     */
    clone(result?: Ellipsoid): Ellipsoid;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Ellipsoid, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Ellipsoid instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Ellipsoid): Ellipsoid;
    /**
     * Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.
     * @param cartographic - The cartographic position for which to to determine the geodetic normal.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if none was provided.
     */
    geodeticSurfaceNormalCartographic(cartographic: Cartographic, result?: Cartesian3): Cartesian3;
    /**
     * Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.
     * @param cartesian - The Cartesian position for which to to determine the surface normal.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if none was provided, or undefined if a normal cannot be found.
     */
    geodeticSurfaceNormal(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Converts the provided cartographic to Cartesian representation.
     * @example
     * //Create a Cartographic and determine it's Cartesian representation on a WGS84 ellipsoid.
     * const position = new Cesium.Cartographic(Cesium.Math.toRadians(21), Cesium.Math.toRadians(78), 5000);
     * const cartesianPosition = Cesium.Ellipsoid.WGS84.cartographicToCartesian(position);
     * @param cartographic - The cartographic position.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if none was provided.
     */
    cartographicToCartesian(cartographic: Cartographic, result?: Cartesian3): Cartesian3;
    /**
     * Converts the provided array of cartographics to an array of Cartesians.
     * @example
     * //Convert an array of Cartographics and determine their Cartesian representation on a WGS84 ellipsoid.
     * const positions = [new Cesium.Cartographic(Cesium.Math.toRadians(21), Cesium.Math.toRadians(78), 0),
     *                  new Cesium.Cartographic(Cesium.Math.toRadians(21.321), Cesium.Math.toRadians(78.123), 100),
     *                  new Cesium.Cartographic(Cesium.Math.toRadians(21.645), Cesium.Math.toRadians(78.456), 250)];
     * const cartesianPositions = Cesium.Ellipsoid.WGS84.cartographicArrayToCartesianArray(positions);
     * @param cartographics - An array of cartographic positions.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Array instance if none was provided.
     */
    cartographicArrayToCartesianArray(cartographics: Cartographic[], result?: Cartesian3[]): Cartesian3[];
    /**
     * Converts the provided cartesian to cartographic representation.
     * The cartesian is undefined at the center of the ellipsoid.
     * @example
     * //Create a Cartesian and determine it's Cartographic representation on a WGS84 ellipsoid.
     * const position = new Cesium.Cartesian3(17832.12, 83234.52, 952313.73);
     * const cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
     * @param cartesian - The Cartesian position to convert to cartographic representation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.
     */
    cartesianToCartographic(cartesian: Cartesian3, result?: Cartographic): Cartographic;
    /**
     * Converts the provided array of cartesians to an array of cartographics.
     * @example
     * //Create an array of Cartesians and determine their Cartographic representation on a WGS84 ellipsoid.
     * const positions = [new Cesium.Cartesian3(17832.12, 83234.52, 952313.73),
     *                  new Cesium.Cartesian3(17832.13, 83234.53, 952313.73),
     *                  new Cesium.Cartesian3(17832.14, 83234.54, 952313.73)]
     * const cartographicPositions = Cesium.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
     * @param cartesians - An array of Cartesian positions.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Array instance if none was provided.
     */
    cartesianArrayToCartographicArray(cartesians: Cartesian3[], result?: Cartographic[]): Cartographic[];
    /**
     * Scales the provided Cartesian position along the geodetic surface normal
     * so that it is on the surface of this ellipsoid.  If the position is
     * at the center of the ellipsoid, this function returns undefined.
     * @param cartesian - The Cartesian position to scale.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter, a new Cartesian3 instance if none was provided, or undefined if the position is at the center.
     */
    scaleToGeodeticSurface(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Scales the provided Cartesian position along the geocentric surface normal
     * so that it is on the surface of this ellipsoid.
     * @param cartesian - The Cartesian position to scale.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if none was provided.
     */
    scaleToGeocentricSurface(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Transforms a Cartesian X, Y, Z position to the ellipsoid-scaled space by multiplying
     * its components by the result of {@link Ellipsoid#oneOverRadii}.
     * @param position - The position to transform.
     * @param [result] - The position to which to copy the result, or undefined to create and
     *        return a new instance.
     * @returns The position expressed in the scaled space.  The returned instance is the
     *          one passed as the result parameter if it is not undefined, or a new instance of it is.
     */
    transformPositionToScaledSpace(position: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Transforms a Cartesian X, Y, Z position from the ellipsoid-scaled space by multiplying
     * its components by the result of {@link Ellipsoid#radii}.
     * @param position - The position to transform.
     * @param [result] - The position to which to copy the result, or undefined to create and
     *        return a new instance.
     * @returns The position expressed in the unscaled space.  The returned instance is the
     *          one passed as the result parameter if it is not undefined, or a new instance of it is.
     */
    transformPositionFromScaledSpace(position: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Compares this Ellipsoid against the provided Ellipsoid componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The other Ellipsoid.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Ellipsoid): boolean;
    /**
     * Creates a string representing this Ellipsoid in the format '(radii.x, radii.y, radii.z)'.
     * @returns A string representing this ellipsoid in the format '(radii.x, radii.y, radii.z)'.
     */
    toString(): string;
    /**
     * Computes a point which is the intersection of the surface normal with the z-axis.
     * @param position - the position. must be on the surface of the ellipsoid.
     * @param [buffer = 0.0] - A buffer to subtract from the ellipsoid size when checking if the point is inside the ellipsoid.
     *                                In earth case, with common earth datums, there is no need for this buffer since the intersection point is always (relatively) very close to the center.
     *                                In WGS84 datum, intersection point is at max z = +-42841.31151331382 (0.673% of z-axis).
     *                                Intersection point could be outside the ellipsoid if the ratio of MajorAxis / AxisOfRotation is bigger than the square root of 2
     * @param [result] - The cartesian to which to copy the result, or undefined to create and
     *        return a new instance.
     * @returns the intersection point if it's inside the ellipsoid, undefined otherwise
     */
    getSurfaceNormalIntersectionWithZAxis(position: Cartesian3, buffer?: number, result?: Cartesian3): Cartesian3 | undefined;
    /**
     * Computes the ellipsoid curvatures at a given position on the surface.
     * @param surfacePosition - The position on the ellipsoid surface where curvatures will be calculated.
     * @param [result] - The cartesian to which to copy the result, or undefined to create and return a new instance.
     * @returns The local curvature of the ellipsoid surface at the provided position, in east and north directions.
     */
    getLocalCurvature(surfacePosition: Cartesian3, result?: Cartesian2): Cartesian2;
    /**
     * Computes an approximation of the surface area of a rectangle on the surface of an ellipsoid using
     * Gauss-Legendre 10th order quadrature.
     * @param rectangle - The rectangle used for computing the surface area.
     * @returns The approximate area of the rectangle on the surface of this ellipsoid.
     */
    surfaceArea(rectangle: Rectangle): number;
    /**
     * An Ellipsoid instance initialized to the WGS84 standard.
     */
    static readonly WGS84: Ellipsoid;
    /**
     * An Ellipsoid instance initialized to radii of (1.0, 1.0, 1.0).
     */
    static readonly UNIT_SPHERE: Ellipsoid;
    /**
     * An Ellipsoid instance initialized to a sphere with the lunar radius.
     */
    static readonly MOON: Ellipsoid;
    /**
     * An Ellipsoid instance initialized to a sphere with the mean radii of Mars.
     * Source: https://epsg.io/104905
     */
    static readonly MARS: Ellipsoid;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Computes the unit vector directed from the center of this ellipsoid toward the provided Cartesian position.
     * @param cartesian - The Cartesian for which to to determine the geocentric normal.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian3 instance if none was provided.
     */
    geocentricSurfaceNormal(cartesian: Cartesian3, result?: Cartesian3): Cartesian3;
}

/**
 * Initializes a geodesic on the ellipsoid connecting the two provided planetodetic points.
 * @param [start] - The initial planetodetic point on the path.
 * @param [end] - The final planetodetic point on the path.
 * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the geodesic lies.
 */
export class EllipsoidGeodesic {
    constructor(start?: Cartographic, end?: Cartographic, ellipsoid?: Ellipsoid);
    /**
     * Gets the ellipsoid.
     */
    readonly ellipsoid: Ellipsoid;
    /**
     * Gets the surface distance between the start and end point
     */
    readonly surfaceDistance: number;
    /**
     * Gets the initial planetodetic point on the path.
     */
    readonly start: Cartographic;
    /**
     * Gets the final planetodetic point on the path.
     */
    readonly end: Cartographic;
    /**
     * Gets the heading at the initial point.
     */
    readonly startHeading: number;
    /**
     * Gets the heading at the final point.
     */
    readonly endHeading: number;
    /**
     * Sets the start and end points of the geodesic
     * @param start - The initial planetodetic point on the path.
     * @param end - The final planetodetic point on the path.
     */
    setEndPoints(start: Cartographic, end: Cartographic): void;
    /**
     * Provides the location of a point at the indicated portion along the geodesic.
     * @param fraction - The portion of the distance between the initial and final points.
     * @param [result] - The object in which to store the result.
     * @returns The location of the point along the geodesic.
     */
    interpolateUsingFraction(fraction: number, result?: Cartographic): Cartographic;
    /**
     * Provides the location of a point at the indicated distance along the geodesic.
     * @param distance - The distance from the initial point to the point of interest along the geodesic
     * @param [result] - The object in which to store the result.
     * @returns The location of the point along the geodesic.
     */
    interpolateUsingSurfaceDistance(distance: number, result?: Cartographic): Cartographic;
}

/**
 * A description of an ellipsoid centered at the origin.
 * @example
 * const ellipsoid = new Cesium.EllipsoidGeometry({
 *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
 *   radii : new Cesium.Cartesian3(1000000.0, 500000.0, 500000.0)
 * });
 * const geometry = Cesium.EllipsoidGeometry.createGeometry(ellipsoid);
 * @param [options] - Object with the following properties:
 * @param [options.radii = Cartesian3(1.0, 1.0, 1.0)] - The radii of the ellipsoid in the x, y, and z directions.
 * @param [options.innerRadii = options.radii] - The inner radii of the ellipsoid in the x, y, and z directions.
 * @param [options.minimumClock = 0.0] - The minimum angle lying in the xy-plane measured from the positive x-axis and toward the positive y-axis.
 * @param [options.maximumClock = 2*PI] - The maximum angle lying in the xy-plane measured from the positive x-axis and toward the positive y-axis.
 * @param [options.minimumCone = 0.0] - The minimum angle measured from the positive z-axis and toward the negative z-axis.
 * @param [options.maximumCone = PI] - The maximum angle measured from the positive z-axis and toward the negative z-axis.
 * @param [options.stackPartitions = 64] - The number of times to partition the ellipsoid into stacks.
 * @param [options.slicePartitions = 64] - The number of times to partition the ellipsoid into radial slices.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class EllipsoidGeometry {
    constructor(options?: {
        radii?: Cartesian3;
        innerRadii?: Cartesian3;
        minimumClock?: number;
        maximumClock?: number;
        minimumCone?: number;
        maximumCone?: number;
        stackPartitions?: number;
        slicePartitions?: number;
        vertexFormat?: VertexFormat;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: EllipsoidGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new EllipsoidGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: EllipsoidGeometry): EllipsoidGeometry;
    /**
     * Computes the geometric representation of an ellipsoid, including its vertices, indices, and a bounding sphere.
     * @param ellipsoidGeometry - A description of the ellipsoid.
     * @returns The computed vertices and indices.
     */
    static createGeometry(ellipsoidGeometry: EllipsoidGeometry): Geometry | undefined;
}

/**
 * A description of the outline of an ellipsoid centered at the origin.
 * @example
 * const ellipsoid = new Cesium.EllipsoidOutlineGeometry({
 *   radii : new Cesium.Cartesian3(1000000.0, 500000.0, 500000.0),
 *   stackPartitions: 6,
 *   slicePartitions: 5
 * });
 * const geometry = Cesium.EllipsoidOutlineGeometry.createGeometry(ellipsoid);
 * @param [options] - Object with the following properties:
 * @param [options.radii = Cartesian3(1.0, 1.0, 1.0)] - The radii of the ellipsoid in the x, y, and z directions.
 * @param [options.innerRadii = options.radii] - The inner radii of the ellipsoid in the x, y, and z directions.
 * @param [options.minimumClock = 0.0] - The minimum angle lying in the xy-plane measured from the positive x-axis and toward the positive y-axis.
 * @param [options.maximumClock = 2*PI] - The maximum angle lying in the xy-plane measured from the positive x-axis and toward the positive y-axis.
 * @param [options.minimumCone = 0.0] - The minimum angle measured from the positive z-axis and toward the negative z-axis.
 * @param [options.maximumCone = PI] - The maximum angle measured from the positive z-axis and toward the negative z-axis.
 * @param [options.stackPartitions = 10] - The count of stacks for the ellipsoid (1 greater than the number of parallel lines).
 * @param [options.slicePartitions = 8] - The count of slices for the ellipsoid (Equal to the number of radial lines).
 * @param [options.subdivisions = 128] - The number of points per line, determining the granularity of the curvature.
 */
export class EllipsoidOutlineGeometry {
    constructor(options?: {
        radii?: Cartesian3;
        innerRadii?: Cartesian3;
        minimumClock?: number;
        maximumClock?: number;
        minimumCone?: number;
        maximumCone?: number;
        stackPartitions?: number;
        slicePartitions?: number;
        subdivisions?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: EllipsoidOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new EllipsoidOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: EllipsoidOutlineGeometry): EllipsoidOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of an ellipsoid, including its vertices, indices, and a bounding sphere.
     * @param ellipsoidGeometry - A description of the ellipsoid outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(ellipsoidGeometry: EllipsoidOutlineGeometry): Geometry | undefined;
}

/**
 * Initializes a rhumb line on the ellipsoid connecting the two provided planetodetic points.
 * @param [start] - The initial planetodetic point on the path.
 * @param [end] - The final planetodetic point on the path.
 * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the rhumb line lies.
 */
export class EllipsoidRhumbLine {
    constructor(start?: Cartographic, end?: Cartographic, ellipsoid?: Ellipsoid);
    /**
     * Gets the ellipsoid.
     */
    readonly ellipsoid: Ellipsoid;
    /**
     * Gets the surface distance between the start and end point
     */
    readonly surfaceDistance: number;
    /**
     * Gets the initial planetodetic point on the path.
     */
    readonly start: Cartographic;
    /**
     * Gets the final planetodetic point on the path.
     */
    readonly end: Cartographic;
    /**
     * Gets the heading from the start point to the end point.
     */
    readonly heading: number;
    /**
     * Create a rhumb line using an initial position with a heading and distance.
     * @param start - The initial planetodetic point on the path.
     * @param heading - The heading in radians.
     * @param distance - The rhumb line distance between the start and end point.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the rhumb line lies.
     * @param [result] - The object in which to store the result.
     * @returns The EllipsoidRhumbLine object.
     */
    static fromStartHeadingDistance(start: Cartographic, heading: number, distance: number, ellipsoid?: Ellipsoid, result?: EllipsoidRhumbLine): EllipsoidRhumbLine;
    /**
     * Sets the start and end points of the rhumb line.
     * @param start - The initial planetodetic point on the path.
     * @param end - The final planetodetic point on the path.
     */
    setEndPoints(start: Cartographic, end: Cartographic): void;
    /**
     * Provides the location of a point at the indicated portion along the rhumb line.
     * @param fraction - The portion of the distance between the initial and final points.
     * @param [result] - The object in which to store the result.
     * @returns The location of the point along the rhumb line.
     */
    interpolateUsingFraction(fraction: number, result?: Cartographic): Cartographic;
    /**
     * Provides the location of a point at the indicated distance along the rhumb line.
     * @param distance - The distance from the initial point to the point of interest along the rhumbLine.
     * @param [result] - The object in which to store the result.
     * @returns The location of the point along the rhumb line.
     */
    interpolateUsingSurfaceDistance(distance: number, result?: Cartographic): Cartographic;
    /**
     * Provides the location of a point at the indicated longitude along the rhumb line.
     * If the longitude is outside the range of start and end points, the first intersection with the longitude from the start point in the direction of the heading is returned. This follows the spiral property of a rhumb line.
     * @param intersectionLongitude - The longitude, in radians, at which to find the intersection point from the starting point using the heading.
     * @param [result] - The object in which to store the result.
     * @returns The location of the intersection point along the rhumb line, undefined if there is no intersection or infinite intersections.
     */
    findIntersectionWithLongitude(intersectionLongitude: number, result?: Cartographic): Cartographic;
    /**
     * Provides the location of a point at the indicated latitude along the rhumb line.
     * If the latitude is outside the range of start and end points, the first intersection with the latitude from that start point in the direction of the heading is returned. This follows the spiral property of a rhumb line.
     * @param intersectionLatitude - The latitude, in radians, at which to find the intersection point from the starting point using the heading.
     * @param [result] - The object in which to store the result.
     * @returns The location of the intersection point along the rhumb line, undefined if there is no intersection or infinite intersections.
     */
    findIntersectionWithLatitude(intersectionLatitude: number, result?: Cartographic): Cartographic;
}

/**
 * A plane tangent to the provided ellipsoid at the provided origin.
 * If origin is not on the surface of the ellipsoid, it's surface projection will be used.
 * If origin is at the center of the ellipsoid, an exception will be thrown.
 * @param origin - The point on the surface of the ellipsoid where the tangent plane touches.
 * @param [ellipsoid = Ellipsoid.default] - The ellipsoid to use.
 */
export class EllipsoidTangentPlane {
    constructor(origin: Cartesian3, ellipsoid?: Ellipsoid);
    /**
     * Gets the ellipsoid.
     */
    ellipsoid: Ellipsoid;
    /**
     * Gets the origin.
     */
    origin: Cartesian3;
    /**
     * Gets the plane which is tangent to the ellipsoid.
     */
    readonly plane: Plane;
    /**
     * Gets the local X-axis (east) of the tangent plane.
     */
    readonly xAxis: Cartesian3;
    /**
     * Gets the local Y-axis (north) of the tangent plane.
     */
    readonly yAxis: Cartesian3;
    /**
     * Gets the local Z-axis (up) of the tangent plane.
     */
    readonly zAxis: Cartesian3;
    /**
     * Creates a new instance from the provided ellipsoid and the center
     * point of the provided Cartesians.
     * @param cartesians - The list of positions surrounding the center point.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid to use.
     * @returns The new instance of EllipsoidTangentPlane.
     */
    static fromPoints(cartesians: Cartesian3[], ellipsoid?: Ellipsoid): EllipsoidTangentPlane;
    /**
     * Computes the projection of the provided 3D position onto the 2D plane, radially outward from the {@link EllipsoidTangentPlane.ellipsoid} coordinate system origin.
     * @param cartesian - The point to project.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if none was provided. Undefined if there is no intersection point
     */
    projectPointOntoPlane(cartesian: Cartesian3, result?: Cartesian2): Cartesian2;
    /**
     * Computes the projection of the provided 3D positions onto the 2D plane (where possible), radially outward from the global origin.
     * The resulting array may be shorter than the input array - if a single projection is impossible it will not be included.
     * @param cartesians - The array of points to project.
     * @param [result] - The array of Cartesian2 instances onto which to store results.
     * @returns The modified result parameter or a new array of Cartesian2 instances if none was provided.
     */
    projectPointsOntoPlane(cartesians: Cartesian3[], result?: Cartesian2[]): Cartesian2[];
    /**
     * Computes the projection of the provided 3D position onto the 2D plane, along the plane normal.
     * @param cartesian - The point to project.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if none was provided.
     */
    projectPointToNearestOnPlane(cartesian: Cartesian3, result?: Cartesian2): Cartesian2;
    /**
     * Computes the projection of the provided 3D positions onto the 2D plane, along the plane normal.
     * @param cartesians - The array of points to project.
     * @param [result] - The array of Cartesian2 instances onto which to store results.
     * @returns The modified result parameter or a new array of Cartesian2 instances if none was provided. This will have the same length as <code>cartesians</code>.
     */
    projectPointsToNearestOnPlane(cartesians: Cartesian3[], result?: Cartesian2[]): Cartesian2[];
    /**
     * Computes the projection of the provided 2D position onto the 3D ellipsoid.
     * @param cartesian - The points to project.
     * @param [result] - The Cartesian3 instance to store result.
     * @returns The modified result parameter or a new Cartesian3 instance if none was provided.
     */
    projectPointOntoEllipsoid(cartesian: Cartesian2, result?: Cartesian3): Cartesian3;
    /**
     * Computes the projection of the provided 2D positions onto the 3D ellipsoid.
     * @param cartesians - The array of points to project.
     * @param [result] - The array of Cartesian3 instances onto which to store results.
     * @returns The modified result parameter or a new array of Cartesian3 instances if none was provided.
     */
    projectPointsOntoEllipsoid(cartesians: Cartesian2[], result?: Cartesian3[]): Cartesian3[];
}

/**
 * Determine whether or not other objects are visible or hidden behind the visible horizon defined by
 * an {@link Ellipsoid} and a camera position.  The ellipsoid is assumed to be located at the
 * origin of the coordinate system.  This class uses the algorithm described in the
 * {@link https://cesium.com/blog/2013/04/25/Horizon-culling/|Horizon Culling} blog post.
 * @example
 * // Construct an ellipsoidal occluder with radii 1.0, 1.1, and 0.9.
 * const cameraPosition = new Cesium.Cartesian3(5.0, 6.0, 7.0);
 * const occluderEllipsoid = new Cesium.Ellipsoid(1.0, 1.1, 0.9);
 * const occluder = new Cesium.EllipsoidalOccluder(occluderEllipsoid, cameraPosition);
 * @param ellipsoid - The ellipsoid to use as an occluder.
 * @param [cameraPosition] - The coordinate of the viewer/camera.  If this parameter is not
 *        specified, {@link EllipsoidalOccluder#cameraPosition} must be called before
 *        testing visibility.
 */
export class EllipsoidalOccluder {
    constructor(ellipsoid: Ellipsoid, cameraPosition?: Cartesian3);
    /**
     * Gets the occluding ellipsoid.
     */
    ellipsoid: Ellipsoid;
    /**
     * Gets or sets the position of the camera.
     */
    cameraPosition: Cartesian3;
    /**
     * Determines whether or not a point, the <code>occludee</code>, is hidden from view by the occluder.
     * @example
     * const cameraPosition = new Cesium.Cartesian3(0, 0, 2.5);
     * const ellipsoid = new Cesium.Ellipsoid(1.0, 1.1, 0.9);
     * const occluder = new Cesium.EllipsoidalOccluder(ellipsoid, cameraPosition);
     * const point = new Cesium.Cartesian3(0, -3, -3);
     * occluder.isPointVisible(point); //returns true
     * @param occludee - The point to test for visibility.
     * @returns <code>true</code> if the occludee is visible; otherwise <code>false</code>.
     */
    isPointVisible(occludee: Cartesian3): boolean;
    /**
     * Determines whether or not a point expressed in the ellipsoid scaled space, is hidden from view by the
     * occluder.  To transform a Cartesian X, Y, Z position in the coordinate system aligned with the ellipsoid
     * into the scaled space, call {@link Ellipsoid#transformPositionToScaledSpace}.
     * @example
     * const cameraPosition = new Cesium.Cartesian3(0, 0, 2.5);
     * const ellipsoid = new Cesium.Ellipsoid(1.0, 1.1, 0.9);
     * const occluder = new Cesium.EllipsoidalOccluder(ellipsoid, cameraPosition);
     * const point = new Cesium.Cartesian3(0, -3, -3);
     * const scaledSpacePoint = ellipsoid.transformPositionToScaledSpace(point);
     * occluder.isScaledSpacePointVisible(scaledSpacePoint); //returns true
     * @param occludeeScaledSpacePosition - The point to test for visibility, represented in the scaled space.
     * @returns <code>true</code> if the occludee is visible; otherwise <code>false</code>.
     */
    isScaledSpacePointVisible(occludeeScaledSpacePosition: Cartesian3): boolean;
    /**
     * Similar to {@link EllipsoidalOccluder#isScaledSpacePointVisible} except tests against an
     * ellipsoid that has been shrunk by the minimum height when the minimum height is below
     * the ellipsoid. This is intended to be used with points generated by
     * {@link EllipsoidalOccluder#computeHorizonCullingPointPossiblyUnderEllipsoid} or
     * {@link EllipsoidalOccluder#computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid}.
     * @param occludeeScaledSpacePosition - The point to test for visibility, represented in the scaled space of the possibly-shrunk ellipsoid.
     * @returns <code>true</code> if the occludee is visible; otherwise <code>false</code>.
     */
    isScaledSpacePointVisiblePossiblyUnderEllipsoid(occludeeScaledSpacePosition: Cartesian3): boolean;
    /**
     * Computes a point that can be used for horizon culling from a list of positions.  If the point is below
     * the horizon, all of the positions are guaranteed to be below the horizon as well.  The returned point
     * is expressed in the ellipsoid-scaled space and is suitable for use with
     * {@link EllipsoidalOccluder#isScaledSpacePointVisible}.
     * @param directionToPoint - The direction that the computed point will lie along.
     *                     A reasonable direction to use is the direction from the center of the ellipsoid to
     *                     the center of the bounding sphere computed from the positions.  The direction need not
     *                     be normalized.
     * @param positions - The positions from which to compute the horizon culling point.  The positions
     *                       must be expressed in a reference frame centered at the ellipsoid and aligned with the
     *                       ellipsoid's axes.
     * @param [result] - The instance on which to store the result instead of allocating a new instance.
     * @returns The computed horizon culling point, expressed in the ellipsoid-scaled space.
     */
    computeHorizonCullingPoint(directionToPoint: Cartesian3, positions: Cartesian3[], result?: Cartesian3): Cartesian3;
    /**
     * Similar to {@link EllipsoidalOccluder#computeHorizonCullingPoint} except computes the culling
     * point relative to an ellipsoid that has been shrunk by the minimum height when the minimum height is below
     * the ellipsoid. The returned point is expressed in the possibly-shrunk ellipsoid-scaled space and is suitable
     * for use with {@link EllipsoidalOccluder#isScaledSpacePointVisiblePossiblyUnderEllipsoid}.
     * @param directionToPoint - The direction that the computed point will lie along.
     *                     A reasonable direction to use is the direction from the center of the ellipsoid to
     *                     the center of the bounding sphere computed from the positions.  The direction need not
     *                     be normalized.
     * @param positions - The positions from which to compute the horizon culling point.  The positions
     *                       must be expressed in a reference frame centered at the ellipsoid and aligned with the
     *                       ellipsoid's axes.
     * @param [minimumHeight] - The minimum height of all positions. If this value is undefined, all positions are assumed to be above the ellipsoid.
     * @param [result] - The instance on which to store the result instead of allocating a new instance.
     * @returns The computed horizon culling point, expressed in the possibly-shrunk ellipsoid-scaled space.
     */
    computeHorizonCullingPointPossiblyUnderEllipsoid(directionToPoint: Cartesian3, positions: Cartesian3[], minimumHeight?: number, result?: Cartesian3): Cartesian3;
    /**
     * Computes a point that can be used for horizon culling from a list of positions.  If the point is below
     * the horizon, all of the positions are guaranteed to be below the horizon as well.  The returned point
     * is expressed in the ellipsoid-scaled space and is suitable for use with
     * {@link EllipsoidalOccluder#isScaledSpacePointVisible}.
     * @param directionToPoint - The direction that the computed point will lie along.
     *                     A reasonable direction to use is the direction from the center of the ellipsoid to
     *                     the center of the bounding sphere computed from the positions.  The direction need not
     *                     be normalized.
     * @param vertices - The vertices from which to compute the horizon culling point. The positions
     *                   must be expressed in a reference frame centered at the ellipsoid and aligned with the
     *                   ellipsoid's axes.
     * @param [result] - The instance on which to store the result instead of allocating a new instance.
     * @returns The computed horizon culling point, expressed in the ellipsoid-scaled space.
     */
    computeHorizonCullingPointFromVertices(directionToPoint: Cartesian3, vertices: number[] | Float32Array | Float64Array, stride?: number, center?: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Similar to {@link EllipsoidalOccluder#computeHorizonCullingPointFromVertices} except computes the culling
     * point relative to an ellipsoid that has been shrunk by the minimum height when the minimum height is below
     * the ellipsoid. The returned point is expressed in the possibly-shrunk ellipsoid-scaled space and is suitable
     * for use with {@link EllipsoidalOccluder#isScaledSpacePointVisiblePossiblyUnderEllipsoid}.
     * @param directionToPoint - The direction that the computed point will lie along.
     *                     A reasonable direction to use is the direction from the center of the ellipsoid to
     *                     the center of the bounding sphere computed from the positions.  The direction need not
     *                     be normalized.
     * @param vertices - The vertices from which to compute the horizon culling point.  The positions
     *                   must be expressed in a reference frame centered at the ellipsoid and aligned with the
     *                   ellipsoid's axes.
     * @param [minimumHeight] - The minimum height of all vertices. If this value is undefined, all vertices are assumed to be above the ellipsoid.
     * @param [result] - The instance on which to store the result instead of allocating a new instance.
     * @returns The computed horizon culling point, expressed in the possibly-shrunk ellipsoid-scaled space.
     */
    computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(directionToPoint: Cartesian3, vertices: number[] | Float32Array | Float64Array, stride?: number, center?: Cartesian3, minimumHeight?: number, result?: Cartesian3): Cartesian3;
    /**
     * Computes a point that can be used for horizon culling of a rectangle.  If the point is below
     * the horizon, the ellipsoid-conforming rectangle is guaranteed to be below the horizon as well.
     * The returned point is expressed in the ellipsoid-scaled space and is suitable for use with
     * {@link EllipsoidalOccluder#isScaledSpacePointVisible}.
     * @param rectangle - The rectangle for which to compute the horizon culling point.
     * @param ellipsoid - The ellipsoid on which the rectangle is defined.  This may be different from
     *                    the ellipsoid used by this instance for occlusion testing.
     * @param [result] - The instance on which to store the result instead of allocating a new instance.
     * @returns The computed horizon culling point, expressed in the ellipsoid-scaled space.
     */
    computeHorizonCullingPointFromRectangle(rectangle: Rectangle, ellipsoid: Ellipsoid, result?: Cartesian3): Cartesian3;
}

/**
 * A fixed-point encoding of a {@link Cartesian3} with 64-bit floating-point components, as two {@link Cartesian3}
 * values that, when converted to 32-bit floating-point and added, approximate the original input.
 * <p>
 * This is used to encode positions in vertex buffers for rendering without jittering artifacts
 * as described in {@link http://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions}.
 * </p>
 */
export class EncodedCartesian3 {
    constructor();
    /**
     * The high bits for each component.  Bits 0 to 22 store the whole value.  Bits 23 to 31 are not used.
     */
    high: Cartesian3;
    /**
     * The low bits for each component.  Bits 7 to 22 store the whole value, and bits 0 to 6 store the fraction.  Bits 23 to 31 are not used.
     */
    low: Cartesian3;
    /**
     * Encodes a 64-bit floating-point value as two floating-point values that, when converted to
     * 32-bit floating-point and added, approximate the original input.  The returned object
     * has <code>high</code> and <code>low</code> properties for the high and low bits, respectively.
     * <p>
     * The fixed-point encoding follows {@link http://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions}.
     * </p>
     * @example
     * const value = 1234567.1234567;
     * const splitValue = Cesium.EncodedCartesian3.encode(value);
     * @param value - The floating-point value to encode.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance if one was not provided.
     */
    static encode(value: number, result?: any): any;
    /**
     * Encodes a {@link Cartesian3} with 64-bit floating-point components as two {@link Cartesian3}
     * values that, when converted to 32-bit floating-point and added, approximate the original input.
     * <p>
     * The fixed-point encoding follows {@link https://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions}.
     * </p>
     * @example
     * const cart = new Cesium.Cartesian3(-10000000.0, 0.0, 10000000.0);
     * const encoded = Cesium.EncodedCartesian3.fromCartesian(cart);
     * @param cartesian - The cartesian to encode.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new EncodedCartesian3 instance if one was not provided.
     */
    static fromCartesian(cartesian: Cartesian3, result?: EncodedCartesian3): EncodedCartesian3;
    /**
     * Encodes the provided <code>cartesian</code>, and writes it to an array with <code>high</code>
     * components followed by <code>low</code> components, i.e. <code>[high.x, high.y, high.z, low.x, low.y, low.z]</code>.
     * <p>
     * This is used to create interleaved high-precision position vertex attributes.
     * </p>
     * @example
     * const positions = [
     *    new Cesium.Cartesian3(),
     *    // ...
     * ];
     * const encodedPositions = new Float32Array(2 * 3 * positions.length);
     * let j = 0;
     * for (let i = 0; i < positions.length; ++i) {
     *   Cesium.EncodedCartesian3.writeElement(positions[i], encodedPositions, j);
     *   j += 6;
     * }
     * @param cartesian - The cartesian to encode.
     * @param cartesianArray - The array to write to.
     * @param index - The index into the array to start writing.  Six elements will be written.
     */
    static writeElements(cartesian: Cartesian3, cartesianArray: number[], index: number): void;
}

/**
 * A generic utility class for managing subscribers for a particular event.
 * This class is usually instantiated inside of a container class and
 * exposed as a property for others to subscribe to.
 * @example
 * MyObject.prototype.myListener = function(arg1, arg2) {
 *     this.myArg1Copy = arg1;
 *     this.myArg2Copy = arg2;
 * }
 *
 * const myObjectInstance = new MyObject();
 * const evt = new Cesium.Event();
 * evt.addEventListener(MyObject.prototype.myListener, myObjectInstance);
 * evt.raiseEvent('1', '2');
 * evt.removeEventListener(MyObject.prototype.myListener);
 */
export class Event<Listener extends (...args: any[]) => void = (...args: any[]) => void> {
    constructor();
    /**
     * The number of listeners currently subscribed to the event.
     */
    readonly numberOfListeners: number;
    /**
     * Registers a callback function to be executed whenever the event is raised.
     * An optional scope can be provided to serve as the <code>this</code> pointer
     * in which the function will execute.
     * @param listener - The function to be executed when the event is raised.
     * @param [scope] - An optional object scope to serve as the <code>this</code>
     *        pointer in which the listener function will execute.
     * @returns A function that will remove this event listener when invoked.
     */
    addEventListener(listener: Listener, scope?: any): Event.RemoveCallback;
    /**
     * Unregisters a previously registered callback.
     * @param listener - The function to be unregistered.
     * @param [scope] - The scope that was originally passed to addEventListener.
     * @returns <code>true</code> if the listener was removed; <code>false</code> if the listener and scope are not registered with the event.
     */
    removeEventListener(listener: Listener, scope?: any): boolean;
    /**
     * Raises the event by calling each registered listener with all supplied arguments.
     * @param arguments - This method takes any number of parameters and passes them through to the listener functions.
     */
    raiseEvent(...arguments: Parameters<Listener>): void;
}

export namespace Event {
    /**
     * A function that removes a listener.
     */
    type RemoveCallback = () => void;
}

/**
 * A convenience object that simplifies the common pattern of attaching event listeners
 * to several events, then removing all those listeners at once later, for example, in
 * a destroy method.
 * @example
 * const helper = new Cesium.EventHelper();
 *
 * helper.add(someObject.event, listener1, this);
 * helper.add(otherObject.event, listener2, this);
 *
 * // later...
 * helper.removeAll();
 */
export class EventHelper {
    constructor();
    /**
     * Adds a listener to an event, and records the registration to be cleaned up later.
     * @param event - The event to attach to.
     * @param listener - The function to be executed when the event is raised.
     * @param [scope] - An optional object scope to serve as the <code>this</code>
     *        pointer in which the listener function will execute.
     * @returns A function that will remove this event listener when invoked.
     */
    add(event: Event, listener: (...params: any[]) => any, scope?: any): EventHelper.RemoveCallback;
    /**
     * Unregisters all previously added listeners.
     */
    removeAll(): void;
}

export namespace EventHelper {
    /**
     * A function that removes a listener.
     */
    type RemoveCallback = () => void;
}

/**
 * Constants to determine how an interpolated value is extrapolated
 * when querying outside the bounds of available data.
 */
export enum ExtrapolationType {
    /**
     * No extrapolation occurs.
     */
    NONE = 0,
    /**
     * The first or last value is used when outside the range of sample data.
     */
    HOLD = 1,
    /**
     * The value is extrapolated.
     */
    EXTRAPOLATE = 2
}

/**
 * Contains functions for transforming positions to various reference frames.
 */
export namespace FixedFrameTransforms {
    /**
     * Generates a function that computes a 4x4 transformation matrix from a reference frame
     * centered at the provided origin to the provided ellipsoid's fixed reference frame.
     * @param firstAxis - name of the first axis of the local reference frame. Must be
     *  'east', 'north', 'up', 'west', 'south' or 'down'.
     * @param secondAxis - name of the second axis of the local reference frame. Must be
     *  'east', 'north', 'up', 'west', 'south' or 'down'.
     * @returns The function that will computes a
     * 4x4 transformation matrix from a reference frame, with first axis and second axis compliant with the parameters,
     */
    function localFrameToFixedFrameGenerator(firstAxis: LocalFrameAxis, secondAxis: LocalFrameAxis): LocalFrameToFixedFrame;
    /**
     * Computes a 4x4 transformation matrix from a reference frame with an east-north-up axes
     * centered at the provided origin to the provided ellipsoid's fixed reference frame.
     * The local axes are defined as:
     * <ul>
     * <li>The <code>x</code> axis points in the local east direction.</li>
     * <li>The <code>y</code> axis points in the local north direction.</li>
     * <li>The <code>z</code> axis points in the direction of the ellipsoid surface normal which passes through the position.</li>
     * </ul>
     * @example
     * // Get the transform from local east-north-up at cartographic (0.0, 0.0) to Earth's fixed frame.
     * const center = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
     * const transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);
     * @param origin - The center point of the local reference frame.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if none was provided.
     */
    function eastNorthUpToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;
    /**
     * Computes a 4x4 transformation matrix from a reference frame with an north-east-down axes
     * centered at the provided origin to the provided ellipsoid's fixed reference frame.
     * The local axes are defined as:
     * <ul>
     * <li>The <code>x</code> axis points in the local north direction.</li>
     * <li>The <code>y</code> axis points in the local east direction.</li>
     * <li>The <code>z</code> axis points in the opposite direction of the ellipsoid surface normal which passes through the position.</li>
     * </ul>
     * @example
     * // Get the transform from local north-east-down at cartographic (0.0, 0.0) to Earth's fixed frame.
     * const center = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
     * const transform = Cesium.Transforms.northEastDownToFixedFrame(center);
     * @param origin - The center point of the local reference frame.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if none was provided.
     */
    function northEastDownToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;
    /**
     * Computes a 4x4 transformation matrix from a reference frame with an north-up-east axes
     * centered at the provided origin to the provided ellipsoid's fixed reference frame.
     * The local axes are defined as:
     * <ul>
     * <li>The <code>x</code> axis points in the local north direction.</li>
     * <li>The <code>y</code> axis points in the direction of the ellipsoid surface normal which passes through the position.</li>
     * <li>The <code>z</code> axis points in the local east direction.</li>
     * </ul>
     * @example
     * // Get the transform from local north-up-east at cartographic (0.0, 0.0) to Earth's fixed frame.
     * const center = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
     * const transform = Cesium.Transforms.northUpEastToFixedFrame(center);
     * @param origin - The center point of the local reference frame.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if none was provided.
     */
    function northUpEastToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;
    /**
     * Computes a 4x4 transformation matrix from a reference frame with an north-west-up axes
     * centered at the provided origin to the provided ellipsoid's fixed reference frame.
     * The local axes are defined as:
     * <ul>
     * <li>The <code>x</code> axis points in the local north direction.</li>
     * <li>The <code>y</code> axis points in the local west direction.</li>
     * <li>The <code>z</code> axis points in the direction of the ellipsoid surface normal which passes through the position.</li>
     * </ul>
     * @example
     * // Get the transform from local north-West-Up at cartographic (0.0, 0.0) to Earth's fixed frame.
     * const center = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
     * const transform = Cesium.Transforms.northWestUpToFixedFrame(center);
     * @param origin - The center point of the local reference frame.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if none was provided.
     */
    function northWestUpToFixedFrame(origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4): Matrix4;
    /**
     * Computes a 4x4 transformation matrix from a reference frame with axes computed from the heading-pitch-roll angles
     * centered at the provided origin to the provided ellipsoid's fixed reference frame. Heading is the rotation from the local east
     * direction where a positive angle is increasing eastward. Pitch is the rotation from the local east-north plane. Positive pitch angles
     * are above the plane. Negative pitch angles are below the plane. Roll is the first rotation applied about the local east axis.
     * @example
     * // Get the transform from local heading-pitch-roll at cartographic (0.0, 0.0) to Earth's fixed frame.
     * const center = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
     * const heading = -Cesium.Math.PI_OVER_TWO;
     * const pitch = Cesium.Math.PI_OVER_FOUR;
     * const roll = 0.0;
     * const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
     * const transform = Cesium.Transforms.headingPitchRollToFixedFrame(center, hpr);
     * @param origin - The center point of the local reference frame.
     * @param headingPitchRoll - The heading, pitch, and roll.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [fixedFrameTransform = FixedFrameTransforms.eastNorthUpToFixedFrame] - A 4x4 transformation
     *  matrix from a reference frame to the provided ellipsoid's fixed reference frame
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if none was provided.
     */
    function headingPitchRollToFixedFrame(origin: Cartesian3, headingPitchRoll: HeadingPitchRoll, ellipsoid?: Ellipsoid, fixedFrameTransform?: LocalFrameToFixedFrame, result?: Matrix4): Matrix4;
    /**
     * Computes a quaternion from a reference frame with axes computed from the heading-pitch-roll angles
     * centered at the provided origin. Heading is the rotation from the local east
     * direction where a positive angle is increasing eastward. Pitch is the rotation from the local east-north plane. Positive pitch angles
     * are above the plane. Negative pitch angles are below the plane. Roll is the first rotation applied about the local east axis.
     * @example
     * // Get the quaternion from local heading-pitch-roll at cartographic (0.0, 0.0) to Earth's fixed frame.
     * const center = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
     * const heading = -Cesium.Math.PI_OVER_TWO;
     * const pitch = Cesium.Math.PI_OVER_FOUR;
     * const roll = 0.0;
     * const hpr = new HeadingPitchRoll(heading, pitch, roll);
     * const quaternion = Cesium.Transforms.headingPitchRollQuaternion(center, hpr);
     * @param origin - The center point of the local reference frame.
     * @param headingPitchRoll - The heading, pitch, and roll.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [fixedFrameTransform = FixedFrameTransforms.eastNorthUpToFixedFrame] - A 4x4 transformation
     *  matrix from a reference frame to the provided ellipsoid's fixed reference frame
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if none was provided.
     */
    function headingPitchRollQuaternion(origin: Cartesian3, headingPitchRoll: HeadingPitchRoll, ellipsoid?: Ellipsoid, fixedFrameTransform?: LocalFrameToFixedFrame, result?: Quaternion): Quaternion;
    /**
     * Computes heading-pitch-roll angles from a transform in a particular reference frame. Heading is the rotation from the local east
     * direction where a positive angle is increasing eastward. Pitch is the rotation from the local east-north plane. Positive pitch angles
     * are above the plane. Negative pitch angles are below the plane. Roll is the first rotation applied about the local east axis.
     * @param transform - The transform
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [fixedFrameTransform = FixedFrameTransforms.eastNorthUpToFixedFrame] - A 4x4 transformation
     *  matrix from a reference frame to the provided ellipsoid's fixed reference frame
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new HeadingPitchRoll instance if none was provided.
     */
    function fixedFrameToHeadingPitchRoll(transform: Matrix4, ellipsoid?: Ellipsoid, fixedFrameTransform?: LocalFrameToFixedFrame, result?: HeadingPitchRoll): HeadingPitchRoll;
    /**
     * Transform a point from model coordinates to window coordinates.
     * @param modelViewProjectionMatrix - The 4x4 model-view-projection matrix.
     * @param viewportTransformation - The 4x4 viewport transformation.
     * @param point - The point to transform.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartesian2 instance if none was provided.
     */
    function pointToWindowCoordinates(modelViewProjectionMatrix: Matrix4, viewportTransformation: Matrix4, point: Cartesian3, result?: Cartesian2): Cartesian2;
    /**
     * Transform a position and velocity to a rotation matrix.
     * @param position - The position to transform.
     * @param velocity - The velocity vector to transform.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix3 instance if none was provided.
     */
    function rotationMatrixFromPositionVelocity(position: Cartesian3, velocity: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix3): Matrix3;
}

/**
 * The name of an axis in a local reference frame centered at a point on the ellipsoid:
 * 'east', 'north', 'up', 'west', 'south', or 'down'.
 */
export type LocalFrameAxis = "east" | "north" | "up" | "west" | "south" | "down";

/**
 * Computes a 4x4 transformation matrix from a reference frame
 * centered at the provided origin to the provided ellipsoid's fixed reference frame.
 * @param origin - The center point of the local reference frame.
 * @param [ellipsoid = Ellipsoid.default] - The ellipsoid whose fixed frame is used in the transformation.
 * @param [result] - The object onto which to store the result.
 */
export type LocalFrameToFixedFrame = (origin: Cartesian3, ellipsoid?: Ellipsoid, result?: Matrix4) => Matrix4;

export const vectorProductLocalFrame: Record<LocalFrameAxis, Partial<Record<LocalFrameAxis, LocalFrameAxis>>>;

export const localFrameToFixedFrameCache: Record<string, LocalFrameToFixedFrame>;

/**
 * Utilities helpful for setting a default value for a parameter.
 */
export namespace Frozen {
    /**
     * A frozen empty object that can be used as the default value for options passed as
     * an object literal.
     */
    var EMPTY_OBJECT: any;
    /**
     * A frozen empty array that can be used as the default value for options passed as
     * an array literal.
     */
    var EMPTY_ARRAY: any[];
}

export interface GeographicProjection extends MapProjection {
}

/**
 * A simple map projection where longitude and latitude are linearly mapped to X and Y by multiplying
 * them by the {@link Ellipsoid#maximumRadius}.  This projection
 * is commonly known as geographic, equirectangular, equidistant cylindrical, or plate carrée. When using the WGS84 ellipsoid, it
 * is also known as EPSG:4326.
 * @param [ellipsoid = Ellipsoid.default] - The ellipsoid.
 */
export class GeographicProjection implements MapProjection {
    constructor(ellipsoid?: Ellipsoid);
    /**
     * Gets the {@link Ellipsoid}.
     */
    readonly ellipsoid: Ellipsoid;
    /**
     * Projects a set of {@link Cartographic} coordinates, in radians, to map coordinates, in meters.
     * X and Y are the longitude and latitude, respectively, multiplied by the maximum radius of the
     * ellipsoid.  Z is the unmodified height.
     * @param cartographic - The coordinates to project.
     * @param [result] - An instance into which to copy the result.  If this parameter is
     *        undefined, a new instance is created and returned.
     * @returns The projected coordinates.  If the result parameter is not undefined, the
     *          coordinates are copied there and that instance is returned.  Otherwise, a new instance is
     *          created and returned.
     */
    project(cartographic: Cartographic, result?: Cartesian3): Cartesian3;
    /**
     * Unprojects a set of projected {@link Cartesian3} coordinates, in meters, to {@link Cartographic}
     * coordinates, in radians.  Longitude and Latitude are the X and Y coordinates, respectively,
     * divided by the maximum radius of the ellipsoid.  Height is the unmodified Z coordinate.
     * @param cartesian - The Cartesian position to unproject with height (z) in meters.
     * @param [result] - An instance into which to copy the result.  If this parameter is
     *        undefined, a new instance is created and returned.
     * @returns The unprojected coordinates.  If the result parameter is not undefined, the
     *          coordinates are copied there and that instance is returned.  Otherwise, a new instance is
     *          created and returned.
     */
    unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic;
}

/**
 * A geometry representation with attributes forming vertices and optional index data
 * defining primitives.  Geometries and an {@link Appearance}, which describes the shading,
 * can be assigned to a {@link Primitive} for visualization.  A <code>Primitive</code> can
 * be created from many heterogeneous - in many cases - geometries for performance.
 * <p>
 * Geometries can be transformed and optimized using functions in {@link GeometryPipeline}.
 * </p>
 * @example
 * // Create geometry with a position attribute and indexed lines.
 * const positions = new Float64Array([
 *   0.0, 0.0, 0.0,
 *   7500000.0, 0.0, 0.0,
 *   0.0, 7500000.0, 0.0
 * ]);
 *
 * const geometry = new Cesium.Geometry({
 *   attributes : {
 *     position : new Cesium.GeometryAttribute({
 *       componentDatatype : Cesium.ComponentDatatype.DOUBLE,
 *       componentsPerAttribute : 3,
 *       values : positions
 *     })
 *   },
 *   indices : new Uint16Array([0, 1, 1, 2, 2, 0]),
 *   primitiveType : Cesium.PrimitiveType.LINES,
 *   boundingSphere : Cesium.BoundingSphere.fromVertices(positions)
 * });
 * @param options - Object with the following properties:
 * @param options.attributes - Attributes, which make up the geometry's vertices.
 * @param [options.primitiveType = PrimitiveType.TRIANGLES] - The type of primitives in the geometry.
 * @param [options.indices] - Optional index data that determines the primitives in the geometry.
 * @param [options.boundingSphere] - An optional bounding sphere that fully enclosed the geometry.
 */
export class Geometry {
    constructor(options: {
        attributes: GeometryAttributes;
        primitiveType?: PrimitiveType;
        indices?: Uint16Array | Uint32Array;
        boundingSphere?: BoundingSphere;
    });
    /**
     * Attributes, which make up the geometry's vertices.  Each property in this object corresponds to a
     * {@link GeometryAttribute} containing the attribute's data.
     * <p>
     * Attributes are always stored non-interleaved in a Geometry.
     * </p>
     * <p>
     * There are reserved attribute names with well-known semantics.  The following attributes
     * are created by a Geometry (depending on the provided {@link VertexFormat}.
     * <ul>
     *    <li><code>position</code> - 3D vertex position.  64-bit floating-point (for precision).  3 components per attribute.  See {@link VertexFormat#position}.</li>
     *    <li><code>normal</code> - Normal (normalized), commonly used for lighting.  32-bit floating-point.  3 components per attribute.  See {@link VertexFormat#normal}.</li>
     *    <li><code>st</code> - 2D texture coordinate.  32-bit floating-point.  2 components per attribute.  See {@link VertexFormat#st}.</li>
     *    <li><code>bitangent</code> - Bitangent (normalized), used for tangent-space effects like bump mapping.  32-bit floating-point.  3 components per attribute.  See {@link VertexFormat#bitangent}.</li>
     *    <li><code>tangent</code> - Tangent (normalized), used for tangent-space effects like bump mapping.  32-bit floating-point.  3 components per attribute.  See {@link VertexFormat#tangent}.</li>
     * </ul>
     * </p>
     * <p>
     * The following attribute names are generally not created by a Geometry, but are added
     * to a Geometry by a {@link Primitive} or {@link GeometryPipeline} functions to prepare
     * the geometry for rendering.
     * <ul>
     *    <li><code>position3DHigh</code> - High 32 bits for encoded 64-bit position computed with {@link GeometryPipeline.encodeAttribute}.  32-bit floating-point.  4 components per attribute.</li>
     *    <li><code>position3DLow</code> - Low 32 bits for encoded 64-bit position computed with {@link GeometryPipeline.encodeAttribute}.  32-bit floating-point.  4 components per attribute.</li>
     *    <li><code>position2DHigh</code> - High 32 bits for encoded 64-bit 2D (Columbus view) position computed with {@link GeometryPipeline.encodeAttribute}.  32-bit floating-point.  4 components per attribute.</li>
     *    <li><code>position2DLow</code> - Low 32 bits for encoded 64-bit 2D (Columbus view) position computed with {@link GeometryPipeline.encodeAttribute}.  32-bit floating-point.  4 components per attribute.</li>
     *    <li><code>color</code> - RGBA color (normalized) usually from {@link GeometryInstance#color}.  32-bit floating-point.  4 components per attribute.</li>
     *    <li><code>pickColor</code> - RGBA color used for picking.  32-bit floating-point.  4 components per attribute.</li>
     * </ul>
     * </p>
     * @example
     * geometry.attributes.position = new Cesium.GeometryAttribute({
     *   componentDatatype : Cesium.ComponentDatatype.FLOAT,
     *   componentsPerAttribute : 3,
     *   values : new Float32Array(0)
     * });
     */
    attributes: GeometryAttributes;
    /**
     * Optional index data that - along with {@link Geometry#primitiveType} -
     * determines the primitives in the geometry.
     */
    indices: any[] | undefined;
    /**
     * The type of primitives in the geometry.  This is most often {@link PrimitiveType.TRIANGLES},
     * but can varying based on the specific geometry.
     */
    primitiveType: PrimitiveType | undefined;
    /**
     * An optional bounding sphere that fully encloses the geometry.  This is
     * commonly used for culling.
     */
    boundingSphere: BoundingSphere | undefined;
    /**
     * Computes the number of vertices in a geometry.  The runtime is linear with
     * respect to the number of attributes in a vertex, not the number of vertices.
     * @example
     * const numVertices = Cesium.Geometry.computeNumberOfVertices(geometry);
     * @param geometry - The geometry.
     * @returns The number of vertices in the geometry.
     */
    static computeNumberOfVertices(geometry: Geometry): number;
}

/**
 * Values and type information for geometry attributes.  A {@link Geometry}
 * generally contains one or more attributes.  All attributes together form
 * the geometry's vertices.
 * @example
 * const geometry = new Cesium.Geometry({
 *   attributes : {
 *     position : new Cesium.GeometryAttribute({
 *       componentDatatype : Cesium.ComponentDatatype.FLOAT,
 *       componentsPerAttribute : 3,
 *       values : new Float32Array([
 *         0.0, 0.0, 0.0,
 *         7500000.0, 0.0, 0.0,
 *         0.0, 7500000.0, 0.0
 *       ])
 *     })
 *   },
 *   primitiveType : Cesium.PrimitiveType.LINE_LOOP
 * });
 * @param [options] - Object with the following properties:
 * @param options.componentDatatype - The datatype of each component in the attribute, e.g., individual elements in values.
 * @param options.componentsPerAttribute - A number between 1 and 4 that defines the number of components in an attributes.
 * @param [options.normalize = false] - When <code>true</code> and <code>componentDatatype</code> is an integer format, indicate that the components should be mapped to the range [0, 1] (unsigned) or [-1, 1] (signed) when they are accessed as floating-point for rendering.
 * @param options.values - The values for the attributes stored in a typed array.
 */
export class GeometryAttribute {
    constructor(options?: {
        componentDatatype: ComponentDatatype;
        componentsPerAttribute: number;
        normalize?: boolean;
        values: number[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
    });
    /**
     * The datatype of each component in the attribute, e.g., individual elements in
     * {@link GeometryAttribute#values}.
     */
    componentDatatype: ComponentDatatype;
    /**
     * A number between 1 and 4 that defines the number of components in an attributes.
     * For example, a position attribute with x, y, and z components would have 3 as
     * shown in the code example.
     * @example
     * attribute.componentDatatype = Cesium.ComponentDatatype.FLOAT;
     * attribute.componentsPerAttribute = 3;
     * attribute.values = new Float32Array([
     *   0.0, 0.0, 0.0,
     *   7500000.0, 0.0, 0.0,
     *   0.0, 7500000.0, 0.0
     * ]);
     */
    componentsPerAttribute: number;
    /**
     * When <code>true</code> and <code>componentDatatype</code> is an integer format,
     * indicate that the components should be mapped to the range [0, 1] (unsigned)
     * or [-1, 1] (signed) when they are accessed as floating-point for rendering.
     * <p>
     * This is commonly used when storing colors using {@link ComponentDatatype.UNSIGNED_BYTE}.
     * </p>
     * @example
     * attribute.componentDatatype = Cesium.ComponentDatatype.UNSIGNED_BYTE;
     * attribute.componentsPerAttribute = 4;
     * attribute.normalize = true;
     * attribute.values = new Uint8Array([
     *   Cesium.Color.floatToByte(color.red),
     *   Cesium.Color.floatToByte(color.green),
     *   Cesium.Color.floatToByte(color.blue),
     *   Cesium.Color.floatToByte(color.alpha)
     * ]);
     */
    normalize: boolean;
    /**
     * The values for the attributes stored in a typed array.  In the code example,
     * every three elements in <code>values</code> defines one attributes since
     * <code>componentsPerAttribute</code> is 3.
     * @example
     * attribute.componentDatatype = Cesium.ComponentDatatype.FLOAT;
     * attribute.componentsPerAttribute = 3;
     * attribute.values = new Float32Array([
     *   0.0, 0.0, 0.0,
     *   7500000.0, 0.0, 0.0,
     *   0.0, 7500000.0, 0.0
     * ]);
     */
    values: number[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
}

/**
 * Attributes, which make up a geometry's vertices.  Each property in this object corresponds to a
 * {@link GeometryAttribute} containing the attribute's data.
 * <p>
 * Attributes are always stored non-interleaved in a Geometry.
 * </p>
 */
export class GeometryAttributes {
    constructor();
    /**
     * The 3D position attribute.
     * <p>
     * 64-bit floating-point (for precision).  3 components per attribute.
     * </p>
     */
    position: GeometryAttribute | undefined;
    /**
     * The normal attribute (normalized), which is commonly used for lighting.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     */
    normal: GeometryAttribute | undefined;
    /**
     * The 2D texture coordinate attribute.
     * <p>
     * 32-bit floating-point.  2 components per attribute
     * </p>
     */
    st: GeometryAttribute | undefined;
    /**
     * The bitangent attribute (normalized), which is used for tangent-space effects like bump mapping.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     */
    bitangent: GeometryAttribute | undefined;
    /**
     * The tangent attribute (normalized), which is used for tangent-space effects like bump mapping.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     */
    tangent: GeometryAttribute | undefined;
    /**
     * The color attribute.
     * <p>
     * 8-bit unsigned integer. 4 components per attribute.
     * </p>
     */
    color: GeometryAttribute | undefined;
}

/**
 * Base class for all geometry creation utility classes that can be passed to {@link GeometryInstance}
 * for asynchronous geometry creation.
 */
export class GeometryFactory {
    constructor();
    /**
     * Returns a geometry.
     * @param geometryFactory - A description of the circle.
     * @returns The computed vertices and indices.
     */
    static createGeometry(geometryFactory: GeometryFactory): Geometry | undefined;
}

/**
 * Geometry instancing allows one {@link Geometry} object to be positions in several
 * different locations and colored uniquely.  For example, one {@link BoxGeometry} can
 * be instanced several times, each with a different <code>modelMatrix</code> to change
 * its position, rotation, and scale.
 * @example
 * // Create geometry for a box, and two instances that refer to it.
 * // One instance positions the box on the bottom and colored aqua.
 * // The other instance positions the box on the top and color white.
 * const geometry = Cesium.BoxGeometry.fromDimensions({
 *   vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL,
 *   dimensions : new Cesium.Cartesian3(1000000.0, 1000000.0, 500000.0)
 * });
 * const instanceBottom = new Cesium.GeometryInstance({
 *   geometry : geometry,
 *   modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
 *     Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
 *   attributes : {
 *     color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
 *   },
 *   id : 'bottom'
 * });
 * const instanceTop = new Cesium.GeometryInstance({
 *   geometry : geometry,
 *   modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
 *     Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 3000000.0), new Cesium.Matrix4()),
 *   attributes : {
 *     color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
 *   },
 *   id : 'top'
 * });
 * @param options - Object with the following properties:
 * @param options.geometry - The geometry to instance.
 * @param [options.modelMatrix = Matrix4.IDENTITY] - The model matrix that transforms to transform the geometry from model to world coordinates.
 * @param [options.id] - A user-defined object to return when the instance is picked with {@link Scene#pick} or get/set per-instance attributes with {@link Primitive#getGeometryInstanceAttributes}.
 * @param [options.attributes] - Per-instance attributes like a show or color attribute shown in the example below.
 */
export class GeometryInstance {
    constructor(options: {
        geometry: Geometry | GeometryFactory;
        modelMatrix?: Matrix4;
        id?: any;
        attributes?: any;
    });
    /**
     * The geometry being instanced.
     */
    geometry: Geometry;
    /**
     * The 4x4 transformation matrix that transforms the geometry from model to world coordinates.
     * When this is the identity matrix, the geometry is drawn in world coordinates, i.e., Earth's WGS84 coordinates.
     * Local reference frames can be used by providing a different transformation matrix, like that returned
     * by {@link Transforms.eastNorthUpToFixedFrame}.
     */
    modelMatrix: Matrix4;
    /**
     * User-defined object returned when the instance is picked or used to get/set per-instance attributes.
     */
    id: any | undefined;
    /**
     * Per-instance attributes like {@link ColorGeometryInstanceAttribute} or {@link ShowGeometryInstanceAttribute}.
     * {@link Geometry} attributes varying per vertex; these attributes are constant for the entire instance.
     */
    attributes: any;
}

/**
 * Values and type information for per-instance geometry attributes.
 * @example
 * const instance = new Cesium.GeometryInstance({
 *   geometry : Cesium.BoxGeometry.fromDimensions({
 *     dimensions : new Cesium.Cartesian3(1000000.0, 1000000.0, 500000.0)
 *   }),
 *   modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
 *     Cesium.Cartesian3.fromDegrees(0.0, 0.0)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
 *   id : 'box',
 *   attributes : {
 *     color : new Cesium.GeometryInstanceAttribute({
 *       componentDatatype : Cesium.ComponentDatatype.UNSIGNED_BYTE,
 *       componentsPerAttribute : 4,
 *       normalize : true,
 *       value : [255, 255, 0, 255]
 *     })
 *   }
 * });
 * @param options - Object with the following properties:
 * @param options.componentDatatype - The datatype of each component in the attribute, e.g., individual elements in values.
 * @param options.componentsPerAttribute - A number between 1 and 4 that defines the number of components in an attributes.
 * @param [options.normalize = false] - When <code>true</code> and <code>componentDatatype</code> is an integer format, indicate that the components should be mapped to the range [0, 1] (unsigned) or [-1, 1] (signed) when they are accessed as floating-point for rendering.
 * @param options.value - The value for the attribute.
 */
export class GeometryInstanceAttribute {
    constructor(options: {
        componentDatatype: ComponentDatatype;
        componentsPerAttribute: number;
        normalize?: boolean;
        value: number[];
    });
    /**
     * The datatype of each component in the attribute, e.g., individual elements in
     * {@link GeometryInstanceAttribute#value}.
     */
    componentDatatype: ComponentDatatype;
    /**
     * A number between 1 and 4 that defines the number of components in an attributes.
     * For example, a position attribute with x, y, and z components would have 3 as
     * shown in the code example.
     * @example
     * show : new Cesium.GeometryInstanceAttribute({
     *   componentDatatype : Cesium.ComponentDatatype.UNSIGNED_BYTE,
     *   componentsPerAttribute : 1,
     *   normalize : true,
     *   value : [1.0]
     * })
     */
    componentsPerAttribute: number;
    /**
     * When <code>true</code> and <code>componentDatatype</code> is an integer format,
     * indicate that the components should be mapped to the range [0, 1] (unsigned)
     * or [-1, 1] (signed) when they are accessed as floating-point for rendering.
     * <p>
     * This is commonly used when storing colors using {@link ComponentDatatype.UNSIGNED_BYTE}.
     * </p>
     * @example
     * attribute.componentDatatype = Cesium.ComponentDatatype.UNSIGNED_BYTE;
     * attribute.componentsPerAttribute = 4;
     * attribute.normalize = true;
     * attribute.value = [
     *   Cesium.Color.floatToByte(color.red),
     *   Cesium.Color.floatToByte(color.green),
     *   Cesium.Color.floatToByte(color.blue),
     *   Cesium.Color.floatToByte(color.alpha)
     * ];
     */
    normalize: boolean;
    /**
     * The values for the attributes stored in a typed array.  In the code example,
     * every three elements in <code>values</code> defines one attributes since
     * <code>componentsPerAttribute</code> is 3.
     * @example
     * show : new Cesium.GeometryInstanceAttribute({
     *   componentDatatype : Cesium.ComponentDatatype.UNSIGNED_BYTE,
     *   componentsPerAttribute : 1,
     *   normalize : true,
     *   value : [1.0]
     * })
     */
    value: number[];
}

/**
 * Represents which vertices should have a value of `true` for the `applyOffset` attribute
 */
export enum GeometryOffsetAttribute {
    NONE = 0,
    TOP = 1,
    ALL = 2
}

/**
 * Content pipeline functions for geometries.
 */
export namespace GeometryPipeline {
    /**
     * Converts a geometry's triangle indices to line indices.  If the geometry has an <code>indices</code>
     * and its <code>primitiveType</code> is <code>TRIANGLES</code>, <code>TRIANGLE_STRIP</code>,
     * <code>TRIANGLE_FAN</code>, it is converted to <code>LINES</code>; otherwise, the geometry is not changed.
     * <p>
     * This is commonly used to create a wireframe geometry for visual debugging.
     * </p>
     * @example
     * geometry = Cesium.GeometryPipeline.toWireframe(geometry);
     * @param geometry - The geometry to modify.
     * @returns The modified <code>geometry</code> argument, with its triangle indices converted to lines.
     */
    function toWireframe(geometry: Geometry): Geometry;
    /**
     * Creates a new {@link Geometry} with <code>LINES</code> representing the provided
     * attribute (<code>attributeName</code>) for the provided geometry.  This is used to
     * visualize vector attributes like normals, tangents, and bitangents.
     * @example
     * const geometry = Cesium.GeometryPipeline.createLineSegmentsForVectors(instance.geometry, 'bitangent', 100000.0);
     * @param geometry - The <code>Geometry</code> instance with the attribute.
     * @param [attributeName = 'normal'] - The name of the attribute.
     * @param [length = 10000.0] - The length of each line segment in meters.  This can be negative to point the vector in the opposite direction.
     * @returns A new <code>Geometry</code> instance with line segments for the vector.
     */
    function createLineSegmentsForVectors(geometry: Geometry, attributeName?: string, length?: number): Geometry;
    /**
     * Creates an object that maps attribute names to unique locations (indices)
     * for matching vertex attributes and shader programs.
     * @example
     * const attributeLocations = Cesium.GeometryPipeline.createAttributeLocations(geometry);
     * // Example output
     * // {
     * //   'position' : 0,
     * //   'normal' : 1
     * // }
     * @param geometry - The geometry, which is not modified, to create the object for.
     * @returns An object with attribute name / index pairs.
     */
    function createAttributeLocations(geometry: Geometry): any;
    /**
     * Reorders a geometry's attributes and <code>indices</code> to achieve better performance from the GPU's pre-vertex-shader cache.
     * @example
     * geometry = Cesium.GeometryPipeline.reorderForPreVertexCache(geometry);
     * @param geometry - The geometry to modify.
     * @returns The modified <code>geometry</code> argument, with its attributes and indices reordered for the GPU's pre-vertex-shader cache.
     */
    function reorderForPreVertexCache(geometry: Geometry): Geometry;
    /**
     * Reorders a geometry's <code>indices</code> to achieve better performance from the GPU's
     * post vertex-shader cache by using the Tipsify algorithm.  If the geometry <code>primitiveType</code>
     * is not <code>TRIANGLES</code> or the geometry does not have an <code>indices</code>, this function has no effect.
     * @example
     * geometry = Cesium.GeometryPipeline.reorderForPostVertexCache(geometry);
     * @param geometry - The geometry to modify.
     * @param [cacheCapacity = 24] - The number of vertices that can be held in the GPU's vertex cache.
     * @returns The modified <code>geometry</code> argument, with its indices reordered for the post-vertex-shader cache.
     */
    function reorderForPostVertexCache(geometry: Geometry, cacheCapacity?: number): Geometry;
    /**
     * Splits a geometry into multiple geometries, if necessary, to ensure that indices in the
     * <code>indices</code> fit into unsigned shorts.  This is used to meet the WebGL requirements
     * when unsigned int indices are not supported.
     * <p>
     * If the geometry does not have any <code>indices</code>, this function has no effect.
     * </p>
     * @example
     * const geometries = Cesium.GeometryPipeline.fitToUnsignedShortIndices(geometry);
     * @param geometry - The geometry to be split into multiple geometries.
     * @returns An array of geometries, each with indices that fit into unsigned shorts.
     */
    function fitToUnsignedShortIndices(geometry: Geometry): Geometry[];
    /**
     * Projects a geometry's 3D <code>position</code> attribute to 2D, replacing the <code>position</code>
     * attribute with separate <code>position3D</code> and <code>position2D</code> attributes.
     * <p>
     * If the geometry does not have a <code>position</code>, this function has no effect.
     * </p>
     * @example
     * geometry = Cesium.GeometryPipeline.projectTo2D(geometry, 'position', 'position3D', 'position2D');
     * @param geometry - The geometry to modify.
     * @param attributeName - The name of the attribute.
     * @param attributeName3D - The name of the attribute in 3D.
     * @param attributeName2D - The name of the attribute in 2D.
     * @param [projection = new GeographicProjection()] - The projection to use.
     * @returns The modified <code>geometry</code> argument with <code>position3D</code> and <code>position2D</code> attributes.
     */
    function projectTo2D(geometry: Geometry, attributeName: string, attributeName3D: string, attributeName2D: string, projection?: any): Geometry;
    /**
     * Encodes floating-point geometry attribute values as two separate attributes to improve
     * rendering precision.
     * <p>
     * This is commonly used to create high-precision position vertex attributes.
     * </p>
     * @example
     * geometry = Cesium.GeometryPipeline.encodeAttribute(geometry, 'position3D', 'position3DHigh', 'position3DLow');
     * @param geometry - The geometry to modify.
     * @param attributeName - The name of the attribute.
     * @param attributeHighName - The name of the attribute for the encoded high bits.
     * @param attributeLowName - The name of the attribute for the encoded low bits.
     * @returns The modified <code>geometry</code> argument, with its encoded attribute.
     */
    function encodeAttribute(geometry: Geometry, attributeName: string, attributeHighName: string, attributeLowName: string): Geometry;
    /**
     * Transforms a geometry instance to world coordinates.  This changes
     * the instance's <code>modelMatrix</code> to {@link Matrix4.IDENTITY} and transforms the
     * following attributes if they are present: <code>position</code>, <code>normal</code>,
     * <code>tangent</code>, and <code>bitangent</code>.
     * @example
     * Cesium.GeometryPipeline.transformToWorldCoordinates(instance);
     * @param instance - The geometry instance to modify.
     * @returns The modified <code>instance</code> argument, with its attributes transforms to world coordinates.
     */
    function transformToWorldCoordinates(instance: GeometryInstance): GeometryInstance;
    /**
     * Computes per-vertex normals for a geometry containing <code>TRIANGLES</code> by averaging the normals of
     * all triangles incident to the vertex.  The result is a new <code>normal</code> attribute added to the geometry.
     * This assumes a counter-clockwise winding order.
     * @example
     * Cesium.GeometryPipeline.computeNormal(geometry);
     * @param geometry - The geometry to modify.
     * @returns The modified <code>geometry</code> argument with the computed <code>normal</code> attribute.
     */
    function computeNormal(geometry: Geometry): Geometry;
    /**
     * Computes per-vertex tangents and bitangents for a geometry containing <code>TRIANGLES</code>.
     * The result is new <code>tangent</code> and <code>bitangent</code> attributes added to the geometry.
     * This assumes a counter-clockwise winding order.
     * <p>
     * Based on <a href="http://www.terathon.com/code/tangent.html">Computing Tangent Space Basis Vectors
     * for an Arbitrary Mesh</a> by Eric Lengyel.
     * </p>
     * @example
     * Cesium.GeometryPipeline.computeTangentAndBiTangent(geometry);
     * @param geometry - The geometry to modify.
     * @returns The modified <code>geometry</code> argument with the computed <code>tangent</code> and <code>bitangent</code> attributes.
     */
    function computeTangentAndBitangent(geometry: Geometry): Geometry;
    /**
     * Compresses and packs geometry normal attribute values to save memory.
     * @example
     * geometry = Cesium.GeometryPipeline.compressVertices(geometry);
     * @param geometry - The geometry to modify.
     * @returns The modified <code>geometry</code> argument, with its normals compressed and packed.
     */
    function compressVertices(geometry: Geometry): Geometry;
}

/**
 * Represents a Gregorian date in a more precise format than the JavaScript Date object.
 * In addition to submillisecond precision, this object can also represent leap seconds.
 * @param [year] - The year as a whole number.
 * @param [month] - The month as a whole number with range [1, 12].
 * @param [day] - The day of the month as a whole number starting at 1.
 * @param [hour] - The hour as a whole number with range [0, 23].
 * @param [minute] - The minute of the hour as a whole number with range [0, 59].
 * @param [second] - The second of the minute as a whole number with range [0, 60], with 60 representing a leap second.
 * @param [millisecond] - The millisecond of the second as a floating point number with range [0.0, 1000.0).
 * @param [isLeapSecond] - Whether this time is during a leap second.
 */
export class GregorianDate {
    constructor(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, isLeapSecond?: boolean);
    /**
     * Gets or sets the year as a whole number.
     */
    year: number;
    /**
     * Gets or sets the month as a whole number with range [1, 12].
     */
    month: number;
    /**
     * Gets or sets the day of the month as a whole number starting at 1.
     */
    day: number;
    /**
     * Gets or sets the hour as a whole number with range [0, 23].
     */
    hour: number;
    /**
     * Gets or sets the minute of the hour as a whole number with range [0, 59].
     */
    minute: number;
    /**
     * Gets or sets the second of the minute as a whole number with range [0, 60], with 60 representing a leap second.
     */
    second: number;
    /**
     * Gets or sets the millisecond of the second as a floating point number with range [0.0, 1000.0).
     */
    millisecond: number;
    /**
     * Gets or sets whether this time is during a leap second.
     */
    isLeapSecond: boolean;
}

/**
 * Defines a heading angle, pitch angle, and range in a local frame.
 * Heading is the rotation from the local east direction where a positive angle is increasing southward.
 * Pitch is the rotation from the local xy-plane. Positive pitch angles are above the plane. Negative pitch
 * angles are below the plane. Range is the distance from the center of the frame.
 * @param [heading = 0.0] - The heading angle in radians.
 * @param [pitch = 0.0] - The pitch angle in radians.
 * @param [range = 0.0] - The distance from the center in meters.
 */
export class HeadingPitchRange {
    constructor(heading?: number, pitch?: number, range?: number);
    /**
     * Heading is the rotation from the local east direction where a positive angle is increasing southward.
     */
    heading: number;
    /**
     * Pitch is the rotation from the local xy-plane. Positive pitch angles
     * are above the plane. Negative pitch angles are below the plane.
     */
    pitch: number;
    /**
     * Range is the distance from the center of the local frame.
     */
    range: number;
    /**
     * Duplicates a HeadingPitchRange instance.
     * @param hpr - The HeadingPitchRange to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new HeadingPitchRange instance if one was not provided. (Returns undefined if hpr is undefined)
     */
    static clone(hpr: HeadingPitchRange, result?: HeadingPitchRange): HeadingPitchRange;
}

/**
 * A rotation expressed as a heading, pitch, and roll. Heading is the rotation about the
 * negative z axis. Pitch is the rotation about the negative y axis. Roll is the rotation about
 * the positive x axis.
 * @param [heading = 0.0] - The heading component in radians.
 * @param [pitch = 0.0] - The pitch component in radians.
 * @param [roll = 0.0] - The roll component in radians.
 */
export class HeadingPitchRoll {
    constructor(heading?: number, pitch?: number, roll?: number);
    /**
     * Gets or sets the heading.
     */
    heading: number;
    /**
     * Gets or sets the pitch.
     */
    pitch: number;
    /**
     * Gets or sets the roll.
     */
    roll: number;
    /**
     * Computes the heading, pitch and roll from a quaternion (see http://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles )
     * @param quaternion - The quaternion from which to retrieve heading, pitch, and roll, all expressed in radians.
     * @param [result] - The object in which to store the result. If not provided, a new instance is created and returned.
     * @returns The modified result parameter or a new HeadingPitchRoll instance if one was not provided.
     */
    static fromQuaternion(quaternion: Quaternion, result?: HeadingPitchRoll): HeadingPitchRoll;
    /**
     * Returns a new HeadingPitchRoll instance from angles given in degrees.
     * @param heading - the heading in degrees
     * @param pitch - the pitch in degrees
     * @param roll - the heading in degrees
     * @param [result] - The object in which to store the result. If not provided, a new instance is created and returned.
     * @returns A new HeadingPitchRoll instance
     */
    static fromDegrees(heading: number, pitch: number, roll: number, result?: HeadingPitchRoll): HeadingPitchRoll;
    /**
     * Duplicates a HeadingPitchRoll instance.
     * @param headingPitchRoll - The HeadingPitchRoll to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new HeadingPitchRoll instance if one was not provided. (Returns undefined if headingPitchRoll is undefined)
     */
    static clone(headingPitchRoll: HeadingPitchRoll, result?: HeadingPitchRoll): HeadingPitchRoll;
    /**
     * Compares the provided HeadingPitchRolls componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first HeadingPitchRoll.
     * @param [right] - The second HeadingPitchRoll.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: HeadingPitchRoll, right?: HeadingPitchRoll): boolean;
    /**
     * Compares the provided HeadingPitchRolls componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [left] - The first HeadingPitchRoll.
     * @param [right] - The second HeadingPitchRoll.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: HeadingPitchRoll, right?: HeadingPitchRoll, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Duplicates this HeadingPitchRoll instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new HeadingPitchRoll instance if one was not provided.
     */
    clone(result?: HeadingPitchRoll): HeadingPitchRoll;
    /**
     * Compares this HeadingPitchRoll against the provided HeadingPitchRoll componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side HeadingPitchRoll.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: HeadingPitchRoll): boolean;
    /**
     * Compares this HeadingPitchRoll against the provided HeadingPitchRoll componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side HeadingPitchRoll.
     * @param [relativeEpsilon = 0] - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: HeadingPitchRoll, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Creates a string representing this HeadingPitchRoll in the format '(heading, pitch, roll)' in radians.
     * @returns A string representing the provided HeadingPitchRoll in the format '(heading, pitch, roll)'.
     */
    toString(): string;
}

/**
 * An {@link InterpolationAlgorithm} for performing Hermite interpolation.
 */
export namespace HermitePolynomialApproximation {
    /**
     * Gets the name of this interpolation algorithm.
     */
    var type: string;
    /**
     * Given the desired degree, returns the number of data points required for interpolation.
     * @param degree - The desired degree of interpolation.
     * @param [inputOrder = 0] - The order of the inputs (0 means just the data, 1 means the data and its derivative, etc).
     * @returns The number of required data points needed for the desired degree of interpolation.
     */
    function getRequiredDataPoints(degree: number, inputOrder?: number): number;
    /**
     * Interpolates values using Hermite Polynomial Approximation.
     * @param x - The independent variable for which the dependent variables will be interpolated.
     * @param xTable - The array of independent variables to use to interpolate.  The values
     * in this array must be in increasing order and the same value must not occur twice in the array.
     * @param yTable - The array of dependent variables to use to interpolate.  For a set of three
     * dependent values (p,q,w) at time 1 and time 2 this should be as follows: {p1, q1, w1, p2, q2, w2}.
     * @param yStride - The number of dependent variable values in yTable corresponding to
     * each independent variable value in xTable.
     * @param [result] - An existing array into which to store the result.
     * @returns The array of interpolated values, or the result parameter if one was provided.
     */
    function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];
    /**
     * Interpolates values using Hermite Polynomial Approximation.
     * @param x - The independent variable for which the dependent variables will be interpolated.
     * @param xTable - The array of independent variables to use to interpolate.  The values
     * in this array must be in increasing order and the same value must not occur twice in the array.
     * @param yTable - The array of dependent variables to use to interpolate.  For a set of three
     * dependent values (p,q,w) at time 1 and time 2 this should be as follows: {p1, q1, w1, p2, q2, w2}.
     * @param yStride - The number of dependent variable values in yTable corresponding to
     * each independent variable value in xTable.
     * @param inputOrder - The number of derivatives supplied for input.
     * @param outputOrder - The number of derivatives desired for output.
     * @param [result] - An existing array into which to store the result.
     * @returns The array of interpolated values, or the result parameter if one was provided.
     */
    function interpolate(x: number, xTable: number[], yTable: number[], yStride: number, inputOrder: number, outputOrder: number, result?: number[]): number[];
}

/**
 * A Hermite spline is a cubic interpolating spline. Points, incoming tangents, outgoing tangents, and times
 * must be defined for each control point. The outgoing tangents are defined for points [0, n - 2] and the incoming
 * tangents are defined for points [1, n - 1]. For example, when interpolating a segment of the curve between <code>points[i]</code> and
 * <code>points[i + 1]</code>, the tangents at the points will be <code>outTangents[i]</code> and <code>inTangents[i]</code>,
 * respectively.
 * @example
 * // Create a G<sup>1</sup> continuous Hermite spline
 * const times = [ 0.0, 1.5, 3.0, 4.5, 6.0 ];
 * const spline = new Cesium.HermiteSpline({
 *     times : times,
 *     points : [
 *         new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
 *         new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
 *         new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
 *         new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
 *         new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
 *     ],
 *     outTangents : [
 *         new Cesium.Cartesian3(1125196, -161816, 270551),
 *         new Cesium.Cartesian3(-996690.5, -365906.5, 184028.5),
 *         new Cesium.Cartesian3(-2096917, 48379.5, -292683.5),
 *         new Cesium.Cartesian3(-890902.5, 408999.5, -447115)
 *     ],
 *     inTangents : [
 *         new Cesium.Cartesian3(-1993381, -731813, 368057),
 *         new Cesium.Cartesian3(-4193834, 96759, -585367),
 *         new Cesium.Cartesian3(-1781805, 817999, -894230),
 *         new Cesium.Cartesian3(1165345, 112641, 47281)
 *     ]
 * });
 *
 * const p0 = spline.evaluate(times[0]);
 * @param options - Object with the following properties:
 * @param options.times - An array of strictly increasing, unit-less, floating-point times at each point.
 *                The values are in no way connected to the clock time. They are the parameterization for the curve.
 * @param options.points - The array of control points.
 * @param options.inTangents - The array of incoming tangents at each control point.
 * @param options.outTangents - The array of outgoing tangents at each control point.
 */
export class HermiteSpline {
    constructor(options: {
        times: number[];
        points: Cartesian3[];
        inTangents: Cartesian3[];
        outTangents: Cartesian3[];
    });
    /**
     * An array of times for the control points.
     */
    readonly times: number[];
    /**
     * An array of control points.
     */
    readonly points: Cartesian3[];
    /**
     * An array of incoming tangents at each control point.
     */
    readonly inTangents: Cartesian3[];
    /**
     * An array of outgoing tangents at each control point.
     */
    readonly outTangents: Cartesian3[];
    /**
     * Creates a spline where the tangents at each control point are the same.
     * The curves are guaranteed to be at least in the class C<sup>1</sup>.
     * @example
     * const points = [
     *     new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
     *     new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
     *     new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
     *     new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
     *     new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
     * ];
     *
     * // Add tangents
     * const tangents = new Array(points.length);
     * tangents[0] = new Cesium.Cartesian3(1125196, -161816, 270551);
     * const temp = new Cesium.Cartesian3();
     * for (let i = 1; i < tangents.length - 1; ++i) {
     *     tangents[i] = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.subtract(points[i + 1], points[i - 1], temp), 0.5, new Cesium.Cartesian3());
     * }
     * tangents[tangents.length - 1] = new Cesium.Cartesian3(1165345, 112641, 47281);
     *
     * const spline = Cesium.HermiteSpline.createC1({
     *     times : times,
     *     points : points,
     *     tangents : tangents
     * });
     * @param options - Object with the following properties:
     * @param options.times - The array of control point times.
     * @param options.points - The array of control points.
     * @param options.tangents - The array of tangents at the control points.
     * @returns A hermite spline.
     */
    static createC1(options: {
        times: number[];
        points: Cartesian3[];
        tangents: Cartesian3[];
    }): HermiteSpline;
    /**
     * Creates a natural cubic spline. The tangents at the control points are generated
     * to create a curve in the class C<sup>2</sup>.
     * @example
     * // Create a natural cubic spline above the earth from Philadelphia to Los Angeles.
     * const spline = Cesium.HermiteSpline.createNaturalCubic({
     *     times : [ 0.0, 1.5, 3.0, 4.5, 6.0 ],
     *     points : [
     *         new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
     *         new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
     *         new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
     *         new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
     *         new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
     *     ]
     * });
     * @param options - Object with the following properties:
     * @param options.times - The array of control point times.
     * @param options.points - The array of control points.
     * @returns A hermite spline, or a linear spline if less than 3 control points were given.
     */
    static createNaturalCubic(options: {
        times: number[];
        points: Cartesian3[];
    }): HermiteSpline | LinearSpline;
    /**
     * Creates a clamped cubic spline. The tangents at the interior control points are generated
     * to create a curve in the class C<sup>2</sup>.
     * @example
     * // Create a clamped cubic spline above the earth from Philadelphia to Los Angeles.
     * const spline = Cesium.HermiteSpline.createClampedCubic({
     *     times : [ 0.0, 1.5, 3.0, 4.5, 6.0 ],
     *     points : [
     *         new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
     *         new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
     *         new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
     *         new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
     *         new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
     *     ],
     *     firstTangent : new Cesium.Cartesian3(1125196, -161816, 270551),
     *     lastTangent : new Cesium.Cartesian3(1165345, 112641, 47281)
     * });
     * @param options - Object with the following properties:
     * @param options.times - The array of control point times.
     * @param options.points - The array of control points.
     * @param options.firstTangent - The outgoing tangent of the first control point.
     * @param options.lastTangent - The incoming tangent of the last control point.
     * @returns A hermite spline, or a linear spline if less than 3 control points were given.
     */
    static createClampedCubic(options: {
        times: number[];
        points: number[] | Cartesian3[];
        firstTangent: Cartesian3;
        lastTangent: Cartesian3;
    }): HermiteSpline | LinearSpline;
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: Cartesian3): Cartesian3;
}

/**
 * Hilbert Order helper functions.
 */
export namespace HilbertOrder {
    /**
     * Computes the Hilbert index at the given level from 2D coordinates.
     * @param level - The level of the curve
     * @param x - The X coordinate
     * @param y - The Y coordinate
     * @returns The Hilbert index.
     */
    function encode2D(level: number, x: number, y: number): number;
    /**
     * Computes the 2D coordinates from the Hilbert index at the given level.
     * @param level - The level of the curve
     * @param index - The Hilbert index
     * @returns An array containing the 2D coordinates ([x, y]) corresponding to the Morton index.
     */
    function decode2D(level: number, index: bigint): number[];
}

/**
 * Constants for WebGL index datatypes.  These corresponds to the
 * <code>type</code> parameter of {@link http://www.khronos.org/opengles/sdk/docs/man/xhtml/glDrawElements.xml|drawElements}.
 */
export enum IndexDatatype {
    /**
     * 8-bit unsigned byte corresponding to <code>UNSIGNED_BYTE</code> and the type
     * of an element in <code>Uint8Array</code>.
     */
    UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,
    /**
     * 16-bit unsigned short corresponding to <code>UNSIGNED_SHORT</code> and the type
     * of an element in <code>Uint16Array</code>.
     */
    UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,
    /**
     * 32-bit unsigned int corresponding to <code>UNSIGNED_INT</code> and the type
     * of an element in <code>Uint32Array</code>.
     */
    UNSIGNED_INT = WebGLConstants.UNSIGNED_INT
}

/**
 * An enum describing the type of interpolation used in a glTF animation.
 */
export enum InterpolationType {
    STEP = 0,
    LINEAR = 1,
    CUBICSPLINE = 2
}

/**
 * This enumerated type is used in determining where, relative to the frustum, an
 * object is located. The object can either be fully contained within the frustum (INSIDE),
 * partially inside the frustum and partially outside (INTERSECTING), or somewhere entirely
 * outside of the frustum's 6 planes (OUTSIDE).
 */
export enum Intersect {
    /**
     * Represents that an object is not contained within the frustum.
     */
    OUTSIDE = -1,
    /**
     * Represents that an object intersects one of the frustum's planes.
     */
    INTERSECTING = 0,
    /**
     * Represents that an object is fully within the frustum.
     */
    INSIDE = 1
}

/**
 * Functions for computing the intersection between geometries such as rays, planes, triangles, and ellipsoids.
 */
export namespace IntersectionTests {
    /**
     * Computes the intersection of a ray and a plane.
     * @param ray - The ray.
     * @param plane - The plane.
     * @param [result] - The object onto which to store the result.
     * @returns The intersection point or undefined if there is no intersections.
     */
    function rayPlane(ray: Ray, plane: Plane, result?: Cartesian3): Cartesian3;
    /**
     * Computes the intersection of a ray and a triangle as a parametric distance along the input ray. The result is negative when the triangle is behind the ray.
     *
     * Implements {@link https://cadxfem.org/inf/Fast MinimumStorage RayTriangle Intersection.pdf|
     * Fast Minimum Storage Ray/Triangle Intersection} by Tomas Moller and Ben Trumbore.
     * @param ray - The ray.
     * @param p0 - The first vertex of the triangle.
     * @param p1 - The second vertex of the triangle.
     * @param p2 - The third vertex of the triangle.
     * @param [cullBackFaces = false] - If <code>true</code>, will only compute an intersection with the front face of the triangle
     *                  and return undefined for intersections with the back face.
     * @returns The intersection as a parametric distance along the ray, or undefined if there is no intersection.
     */
    function rayTriangleParametric(ray: Ray, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean): number;
    /**
     * Computes the intersection of a ray and a triangle as a Cartesian3 coordinate.
     *
     * Implements {@link https://cadxfem.org/inf/Fast MinimumStorage RayTriangle Intersection.pdf|
     * Fast Minimum Storage Ray/Triangle Intersection} by Tomas Moller and Ben Trumbore.
     * @param ray - The ray.
     * @param p0 - The first vertex of the triangle.
     * @param p1 - The second vertex of the triangle.
     * @param p2 - The third vertex of the triangle.
     * @param [cullBackFaces = false] - If <code>true</code>, will only compute an intersection with the front face of the triangle
     *                  and return undefined for intersections with the back face.
     * @param [result] - The <code>Cartesian3</code> onto which to store the result.
     * @returns The intersection point or undefined if there is no intersections.
     */
    function rayTriangle(ray: Ray, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean, result?: Cartesian3): Cartesian3;
    /**
     * Computes the intersection of a line segment and a triangle.
     * @param v0 - The an end point of the line segment.
     * @param v1 - The other end point of the line segment.
     * @param p0 - The first vertex of the triangle.
     * @param p1 - The second vertex of the triangle.
     * @param p2 - The third vertex of the triangle.
     * @param [cullBackFaces = false] - If <code>true</code>, will only compute an intersection with the front face of the triangle
     *                  and return undefined for intersections with the back face.
     * @param [result] - The <code>Cartesian3</code> onto which to store the result.
     * @returns The intersection point or undefined if there is no intersections.
     */
    function lineSegmentTriangle(v0: Cartesian3, v1: Cartesian3, p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, cullBackFaces?: boolean, result?: Cartesian3): Cartesian3;
    /**
     * Computes the intersection points of a ray with a sphere.
     * @param ray - The ray.
     * @param sphere - The sphere.
     * @param [result] - The result onto which to store the result.
     * @returns The interval containing scalar points along the ray or undefined if there are no intersections.
     */
    function raySphere(ray: Ray, sphere: BoundingSphere, result?: Interval): Interval;
    /**
     * Computes the intersection points of a line segment with a sphere.
     * @param p0 - An end point of the line segment.
     * @param p1 - The other end point of the line segment.
     * @param sphere - The sphere.
     * @param [result] - The result onto which to store the result.
     * @returns The interval containing scalar points along the ray or undefined if there are no intersections.
     */
    function lineSegmentSphere(p0: Cartesian3, p1: Cartesian3, sphere: BoundingSphere, result?: Interval): Interval;
    /**
     * Computes the intersection points of a ray with an ellipsoid.
     * @param ray - The ray.
     * @param ellipsoid - The ellipsoid.
     * @returns The interval containing scalar points along the ray or undefined if there are no intersections.
     */
    function rayEllipsoid(ray: Ray, ellipsoid: Ellipsoid): Interval;
    /**
     * Computes the intersection points of a ray with an axis-aligned bounding box. (axis-aligned in the same space as the ray)
     * @param ray - The ray.
     * @param box - The axis-aligned bounding box.
     * @param result - The interval containing scalar points along the ray or undefined if there are no intersections.
     * @returns The modified result parameter, or undefined if there is no intersection.
     */
    function rayAxisAlignedBoundingBox(ray: Ray, box: AxisAlignedBoundingBox, result: Interval | undefined): Interval | undefined;
    /**
     * Provides the point along the ray which is nearest to the ellipsoid.
     * @param ray - The ray.
     * @param ellipsoid - The ellipsoid.
     * @returns The nearest planetodetic point on the ray.
     */
    function grazingAltitudeLocation(ray: Ray, ellipsoid: Ellipsoid): Cartesian3;
    /**
     * Computes the intersection of a line segment and a plane.
     * @example
     * const origin = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
     * const normal = ellipsoid.geodeticSurfaceNormal(origin);
     * const plane = Cesium.Plane.fromPointNormal(origin, normal);
     *
     * const p0 = new Cesium.Cartesian3(...);
     * const p1 = new Cesium.Cartesian3(...);
     *
     * // find the intersection of the line segment from p0 to p1 and the tangent plane at origin.
     * const intersection = Cesium.IntersectionTests.lineSegmentPlane(p0, p1, plane);
     * @param endPoint0 - An end point of the line segment.
     * @param endPoint1 - The other end point of the line segment.
     * @param plane - The plane.
     * @param [result] - The object onto which to store the result.
     * @returns The intersection point or undefined if there is no intersection.
     */
    function lineSegmentPlane(endPoint0: Cartesian3, endPoint1: Cartesian3, plane: Plane, result?: Cartesian3): Cartesian3;
    /**
     * Computes the intersection of a triangle and a plane
     * @example
     * const origin = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
     * const normal = ellipsoid.geodeticSurfaceNormal(origin);
     * const plane = Cesium.Plane.fromPointNormal(origin, normal);
     *
     * const p0 = new Cesium.Cartesian3(...);
     * const p1 = new Cesium.Cartesian3(...);
     * const p2 = new Cesium.Cartesian3(...);
     *
     * // convert the triangle composed of points (p0, p1, p2) to three triangles that don't cross the plane
     * const triangles = Cesium.IntersectionTests.trianglePlaneIntersection(p0, p1, p2, plane);
     * @param p0 - First point of the triangle
     * @param p1 - Second point of the triangle
     * @param p2 - Third point of the triangle
     * @param plane - Intersection plane
     * @returns An object with properties <code>positions</code> and <code>indices</code>, which are arrays that represent three triangles that do not cross the plane. (Undefined if no intersection exists)
     */
    function trianglePlaneIntersection(p0: Cartesian3, p1: Cartesian3, p2: Cartesian3, plane: Plane): any;
}

/**
 * Contains functions for operating on 2D triangles.
 */
export namespace Intersections2D {
    /**
     * Splits a 2D triangle at given axis-aligned threshold value and returns the resulting
     * polygon on a given side of the threshold.  The resulting polygon may have 0, 1, 2,
     * 3, or 4 vertices.
     * @example
     * const result = Cesium.Intersections2D.clipTriangleAtAxisAlignedThreshold(0.5, false, 0.2, 0.6, 0.4);
     * // result === [2, 0, -1, 1, 0, 0.25, -1, 1, 2, 0.5]
     * @param threshold - The threshold coordinate value at which to clip the triangle.
     * @param keepAbove - true to keep the portion of the triangle above the threshold, or false
     *                            to keep the portion below.
     * @param u0 - The coordinate of the first vertex in the triangle, in counter-clockwise order.
     * @param u1 - The coordinate of the second vertex in the triangle, in counter-clockwise order.
     * @param u2 - The coordinate of the third vertex in the triangle, in counter-clockwise order.
     * @param [result] - The array into which to copy the result.  If this parameter is not supplied,
     *                            a new array is constructed and returned.
     * @returns The polygon that results after the clip, specified as a list of
     *                     vertices.  The vertices are specified in counter-clockwise order.
     *                     Each vertex is either an index from the existing list (identified as
     *                     a 0, 1, or 2) or -1 indicating a new vertex not in the original triangle.
     *                     For new vertices, the -1 is followed by three additional numbers: the
     *                     index of each of the two original vertices forming the line segment that
     *                     the new vertex lies on, and the fraction of the distance from the first
     *                     vertex to the second one.
     */
    function clipTriangleAtAxisAlignedThreshold(threshold: number, keepAbove: boolean, u0: number, u1: number, u2: number, result?: number[]): number[];
    /**
     * Compute the barycentric coordinates of a 2D position within a 2D triangle.
     * @example
     * const result = Cesium.Intersections2D.computeBarycentricCoordinates(0.0, 0.0, 0.0, 1.0, -1, -0.5, 1, -0.5);
     * // result === new Cesium.Cartesian3(1.0 / 3.0, 1.0 / 3.0, 1.0 / 3.0);
     * @param x - The x coordinate of the position for which to find the barycentric coordinates.
     * @param y - The y coordinate of the position for which to find the barycentric coordinates.
     * @param x1 - The x coordinate of the triangle's first vertex.
     * @param y1 - The y coordinate of the triangle's first vertex.
     * @param x2 - The x coordinate of the triangle's second vertex.
     * @param y2 - The y coordinate of the triangle's second vertex.
     * @param x3 - The x coordinate of the triangle's third vertex.
     * @param y3 - The y coordinate of the triangle's third vertex.
     * @param [result] - The instance into to which to copy the result.  If this parameter
     *                     is undefined, a new instance is created and returned.
     * @returns The barycentric coordinates of the position within the triangle.
     */
    function computeBarycentricCoordinates(x: number, y: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, result?: Cartesian3): Cartesian3;
    /**
     * Compute the intersection between 2 line segments
     * @example
     * const result = Cesium.Intersections2D.computeLineSegmentLineSegmentIntersection(0.0, 0.0, 0.0, 2.0, -1, 1, 1, 1);
     * // result === new Cesium.Cartesian2(0.0, 1.0);
     * @param x00 - The x coordinate of the first line's first vertex.
     * @param y00 - The y coordinate of the first line's first vertex.
     * @param x01 - The x coordinate of the first line's second vertex.
     * @param y01 - The y coordinate of the first line's second vertex.
     * @param x10 - The x coordinate of the second line's first vertex.
     * @param y10 - The y coordinate of the second line's first vertex.
     * @param x11 - The x coordinate of the second line's second vertex.
     * @param y11 - The y coordinate of the second line's second vertex.
     * @param [result] - The instance into to which to copy the result. If this parameter
     *                     is undefined, a new instance is created and returned.
     * @returns The intersection point, undefined if there is no intersection point or lines are coincident.
     */
    function computeLineSegmentLineSegmentIntersection(x00: number, y00: number, x01: number, y01: number, x10: number, y10: number, x11: number, y11: number, result?: Cartesian2): Cartesian2;
}

/**
 * Represents the closed interval [start, stop].
 * @param [start = 0.0] - The beginning of the interval.
 * @param [stop = 0.0] - The end of the interval.
 */
export class Interval {
    constructor(start?: number, stop?: number);
    /**
     * The beginning of the interval.
     */
    start: number;
    /**
     * The end of the interval.
     */
    stop: number;
}

/**
 * Constants related to ISO8601 support.
 */
export namespace Iso8601 {
    /**
     * A {@link JulianDate} representing the earliest time representable by an ISO8601 date.
     * This is equivalent to the date string '0000-01-01T00:00:00Z'
     */
    const MINIMUM_VALUE: JulianDate;
    /**
     * A {@link JulianDate} representing the latest time representable by an ISO8601 date.
     * This is equivalent to the date string '9999-12-31T24:00:00Z'
     */
    const MAXIMUM_VALUE: JulianDate;
    /**
     * A {@link TimeInterval} representing the largest interval representable by an ISO8601 interval.
     * This is equivalent to the interval string '0000-01-01T00:00:00Z/9999-12-31T24:00:00Z'
     */
    const MAXIMUM_INTERVAL: TimeInterval;
}

/**
 * Represents an astronomical Julian date, which is the number of days since noon on January 1, -4712 (4713 BC).
 * For increased precision, this class stores the whole number part of the date and the seconds
 * part of the date in separate components.  In order to be safe for arithmetic and represent
 * leap seconds, the date is always stored in the International Atomic Time standard
 * {@link TimeStandard.TAI}.
 * @param [julianDayNumber = 0.0] - The Julian Day Number representing the number of whole days.  Fractional days will also be handled correctly.
 * @param [secondsOfDay = 0.0] - The number of seconds into the current Julian Day Number.  Fractional seconds, negative seconds and seconds greater than a day will be handled correctly.
 * @param [timeStandard = TimeStandard.UTC] - The time standard in which the first two parameters are defined.
 */
export class JulianDate {
    constructor(julianDayNumber?: number, secondsOfDay?: number, timeStandard?: TimeStandard);
    /**
     * Gets or sets the number of whole days.
     */
    dayNumber: number;
    /**
     * Gets or sets the number of seconds into the current day.
     */
    secondsOfDay: number;
    /**
     * Creates a new instance from a GregorianDate.
     * @param date - A GregorianDate.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromGregorianDate(date: GregorianDate, result?: JulianDate): JulianDate;
    /**
     * Creates a new instance from a JavaScript Date.
     * @param date - A JavaScript Date.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromDate(date: Date, result?: JulianDate): JulianDate;
    /**
     * Creates a new instance from a from an {@link http://en.wikipedia.org/wiki/ISO_8601|ISO 8601} date.
     * This method is superior to <code>Date.parse</code> because it will handle all valid formats defined by the ISO 8601
     * specification, including leap seconds and sub-millisecond times, which discarded by most JavaScript implementations.
     * @param iso8601String - An ISO 8601 date.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromIso8601(iso8601String: string, result?: JulianDate): JulianDate;
    /**
     * Creates a new instance that represents the current system time.
     * This is equivalent to calling <code>JulianDate.fromDate(new Date());</code>.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static now(result?: JulianDate): JulianDate;
    /**
     * Creates a {@link GregorianDate} from the provided instance.
     * @param julianDate - The date to be converted.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static toGregorianDate(julianDate: JulianDate, result?: GregorianDate): GregorianDate;
    /**
     * Creates a JavaScript Date from the provided instance.
     * Since JavaScript dates are only accurate to the nearest millisecond and
     * cannot represent a leap second, consider using {@link JulianDate.toGregorianDate} instead.
     * If the provided JulianDate is during a leap second, the previous second is used.
     * @param julianDate - The date to be converted.
     * @returns A new instance representing the provided date.
     */
    static toDate(julianDate: JulianDate): Date;
    /**
     * Creates an ISO8601 representation of the provided date.
     * @param julianDate - The date to be converted.
     * @param [precision] - The number of fractional digits used to represent the seconds component.  By default, the most precise representation is used.
     * @returns The ISO8601 representation of the provided date.
     */
    static toIso8601(julianDate: JulianDate, precision?: number): string;
    /**
     * Duplicates a JulianDate instance.
     * @param julianDate - The date to duplicate.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided. Returns undefined if julianDate is undefined.
     */
    static clone(julianDate: JulianDate, result?: JulianDate): JulianDate;
    /**
     * Compares two instances.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns A negative value if left is less than right, a positive value if left is greater than right, or zero if left and right are equal.
     */
    static compare(left: JulianDate, right: JulianDate): number;
    /**
     * Compares two instances and returns <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first instance.
     * @param [right] - The second instance.
     * @returns <code>true</code> if the dates are equal; otherwise, <code>false</code>.
     */
    static equals(left?: JulianDate, right?: JulianDate): boolean;
    /**
     * Compares two instances and returns <code>true</code> if they are within <code>epsilon</code> seconds of
     * each other.  That is, in order for the dates to be considered equal (and for
     * this function to return <code>true</code>), the absolute value of the difference between them, in
     * seconds, must be less than <code>epsilon</code>.
     * @param [left] - The first instance.
     * @param [right] - The second instance.
     * @param [epsilon = 0] - The maximum number of seconds that should separate the two instances.
     * @returns <code>true</code> if the two dates are within <code>epsilon</code> seconds of each other; otherwise <code>false</code>.
     */
    static equalsEpsilon(left?: JulianDate, right?: JulianDate, epsilon?: number): boolean;
    /**
     * Computes the total number of whole and fractional days represented by the provided instance.
     * @param julianDate - The date.
     * @returns The Julian date as single floating point number.
     */
    static totalDays(julianDate: JulianDate): number;
    /**
     * Computes the difference in seconds between the provided instance.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns The difference, in seconds, when subtracting <code>right</code> from <code>left</code>.
     */
    static secondsDifference(left: JulianDate, right: JulianDate): number;
    /**
     * Computes the difference in days between the provided instance.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns The difference, in days, when subtracting <code>right</code> from <code>left</code>.
     */
    static daysDifference(left: JulianDate, right: JulianDate): number;
    /**
     * Computes the number of seconds the provided instance is ahead of UTC.
     * @param julianDate - The date.
     * @returns The number of seconds the provided instance is ahead of UTC
     */
    static computeTaiMinusUtc(julianDate: JulianDate): number;
    /**
     * Adds the provided number of seconds to the provided date instance.
     * @param julianDate - The date.
     * @param seconds - The number of seconds to add or subtract.
     * @param result - An existing instance to use for the result.
     * @returns The modified result parameter.
     */
    static addSeconds(julianDate: JulianDate, seconds: number, result: JulianDate): JulianDate;
    /**
     * Adds the provided number of minutes to the provided date instance.
     * @param julianDate - The date.
     * @param minutes - The number of minutes to add or subtract.
     * @param result - An existing instance to use for the result.
     * @returns The modified result parameter.
     */
    static addMinutes(julianDate: JulianDate, minutes: number, result: JulianDate): JulianDate;
    /**
     * Adds the provided number of hours to the provided date instance.
     * @param julianDate - The date.
     * @param hours - The number of hours to add or subtract.
     * @param result - An existing instance to use for the result.
     * @returns The modified result parameter.
     */
    static addHours(julianDate: JulianDate, hours: number, result: JulianDate): JulianDate;
    /**
     * Adds the provided number of days to the provided date instance.
     * @param julianDate - The date.
     * @param days - The number of days to add or subtract.
     * @param result - An existing instance to use for the result.
     * @returns The modified result parameter.
     */
    static addDays(julianDate: JulianDate, days: number, result: JulianDate): JulianDate;
    /**
     * Compares the provided instances and returns <code>true</code> if <code>left</code> is earlier than <code>right</code>, <code>false</code> otherwise.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns <code>true</code> if <code>left</code> is earlier than <code>right</code>, <code>false</code> otherwise.
     */
    static lessThan(left: JulianDate, right: JulianDate): boolean;
    /**
     * Compares the provided instances and returns <code>true</code> if <code>left</code> is earlier than or equal to <code>right</code>, <code>false</code> otherwise.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns <code>true</code> if <code>left</code> is earlier than or equal to <code>right</code>, <code>false</code> otherwise.
     */
    static lessThanOrEquals(left: JulianDate, right: JulianDate): boolean;
    /**
     * Compares the provided instances and returns <code>true</code> if <code>left</code> is later than <code>right</code>, <code>false</code> otherwise.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns <code>true</code> if <code>left</code> is later than <code>right</code>, <code>false</code> otherwise.
     */
    static greaterThan(left: JulianDate, right: JulianDate): boolean;
    /**
     * Compares the provided instances and returns <code>true</code> if <code>left</code> is later than or equal to <code>right</code>, <code>false</code> otherwise.
     * @param left - The first instance.
     * @param right - The second instance.
     * @returns <code>true</code> if <code>left</code> is later than or equal to <code>right</code>, <code>false</code> otherwise.
     */
    static greaterThanOrEquals(left: JulianDate, right: JulianDate): boolean;
    /**
     * Duplicates this instance.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    clone(result?: JulianDate): JulianDate;
    /**
     * Compares this and the provided instance and returns <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The second instance.
     * @returns <code>true</code> if the dates are equal; otherwise, <code>false</code>.
     */
    equals(right?: JulianDate): boolean;
    /**
     * Compares this and the provided instance and returns <code>true</code> if they are within <code>epsilon</code> seconds of
     * each other.  That is, in order for the dates to be considered equal (and for
     * this function to return <code>true</code>), the absolute value of the difference between them, in
     * seconds, must be less than <code>epsilon</code>.
     * @param [right] - The second instance.
     * @param [epsilon = 0] - The maximum number of seconds that should separate the two instances.
     * @returns <code>true</code> if the two dates are within <code>epsilon</code> seconds of each other; otherwise <code>false</code>.
     */
    equalsEpsilon(right?: JulianDate, epsilon?: number): boolean;
    /**
     * Creates a string representing this date in ISO8601 format.
     * @returns A string representing this date in ISO8601 format.
     */
    toString(): string;
    /**
     * Gets or sets the list of leap seconds used throughout Cesium.
     */
    static leapSeconds: LeapSecond[];
}

/**
 * An {@link InterpolationAlgorithm} for performing Lagrange interpolation.
 */
export namespace LagrangePolynomialApproximation {
    /**
     * Gets the name of this interpolation algorithm.
     */
    var type: string;
    /**
     * Given the desired degree, returns the number of data points required for interpolation.
     * @param degree - The desired degree of interpolation.
     * @returns The number of required data points needed for the desired degree of interpolation.
     */
    function getRequiredDataPoints(degree: number): number;
    /**
     * Interpolates values using Lagrange Polynomial Approximation.
     * @param x - The independent variable for which the dependent variables will be interpolated.
     * @param xTable - The array of independent variables to use to interpolate.  The values
     * in this array must be in increasing order and the same value must not occur twice in the array.
     * @param yTable - The array of dependent variables to use to interpolate.  For a set of three
     * dependent values (p,q,w) at time 1 and time 2 this should be as follows: {p1, q1, w1, p2, q2, w2}.
     * @param yStride - The number of dependent variable values in yTable corresponding to
     * each independent variable value in xTable.
     * @param [result] - An existing array into which to store the result.
     * @returns The array of interpolated values, or the result parameter if one was provided.
     */
    function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];
}

/**
 * Describes a single leap second, which is constructed from a {@link JulianDate} and a
 * numerical offset representing the number of seconds TAI is ahead of the UTC time standard.
 * @param [date] - A Julian date representing the time of the leap second.
 * @param [offset] - The cumulative number of seconds that TAI is ahead of UTC at the provided date.
 */
export class LeapSecond {
    constructor(date?: JulianDate, offset?: number);
    /**
     * Gets or sets the date at which this leap second occurs.
     */
    julianDate: JulianDate;
    /**
     * Gets or sets the cumulative number of seconds between the UTC and TAI time standards at the time
     * of this leap second.
     */
    offset: number;
}

/**
 * An {@link InterpolationAlgorithm} for performing linear interpolation.
 */
export namespace LinearApproximation {
    /**
     * Gets the name of this interpolation algorithm.
     */
    var type: string;
    /**
     * Given the desired degree, returns the number of data points required for interpolation.
     * Since linear interpolation can only generate a first degree polynomial, this function
     * always returns 2.
     * @param degree - The desired degree of interpolation.
     * @returns This function always returns 2.
     */
    function getRequiredDataPoints(degree: number): number;
    /**
     * Interpolates values using linear approximation.
     * @param x - The independent variable for which the dependent variables will be interpolated.
     * @param xTable - The array of independent variables to use to interpolate.  The values
     * in this array must be in increasing order and the same value must not occur twice in the array.
     * @param yTable - The array of dependent variables to use to interpolate.  For a set of three
     * dependent values (p,q,w) at time 1 and time 2 this should be as follows: {p1, q1, w1, p2, q2, w2}.
     * @param yStride - The number of dependent variable values in yTable corresponding to
     * each independent variable value in xTable.
     * @param [result] - An existing array into which to store the result.
     * @returns The array of interpolated values, or the result parameter if one was provided.
     */
    function interpolateOrderZero(x: number, xTable: number[], yTable: number[], yStride: number, result?: number[]): number[];
}

/**
 * A spline that uses piecewise linear interpolation to create a curve.
 * @example
 * const times = [ 0.0, 1.5, 3.0, 4.5, 6.0 ];
 * const spline = new Cesium.LinearSpline({
 *     times : times,
 *     points : [
 *         new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
 *         new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
 *         new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
 *         new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
 *         new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
 *     ]
 * });
 *
 * const p0 = spline.evaluate(times[0]);
 * @param options - Object with the following properties:
 * @param options.times - An array of strictly increasing, unit-less, floating-point times at each point.
 *                The values are in no way connected to the clock time. They are the parameterization for the curve.
 * @param options.points - The array of control points.
 */
export class LinearSpline {
    constructor(options: {
        times: number[];
        points: number[] | Cartesian3[];
    });
    /**
     * An array of times for the control points.
     */
    readonly times: number[];
    /**
     * An array of {@link Cartesian3} control points.
     */
    readonly points: number[] | Cartesian3[];
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: Cartesian3): number | Cartesian3;
}

/**
 * Defines how geodetic ellipsoid coordinates ({@link Cartographic}) project to a
 * flat map like Cesium's 2D and Columbus View modes.
 */
export interface MapProjection {
    /**
     * Gets the {@link Ellipsoid}.
     */
    readonly ellipsoid: Ellipsoid;
    /**
     * Projects {@link Cartographic} coordinates, in radians, to projection-specific map coordinates, in meters.
     * @param cartographic - The coordinates to project.
     * @param [result] - An instance into which to copy the result.  If this parameter is
     *        undefined, a new instance is created and returned.
     * @returns The projected coordinates.  If the result parameter is not undefined, the
     *          coordinates are copied there and that instance is returned.  Otherwise, a new instance is
     *          created and returned.
     */
    project(cartographic: Cartographic, result?: Cartesian3): Cartesian3;
    /**
     * Unprojects projection-specific map {@link Cartesian3} coordinates, in meters, to {@link Cartographic}
     * coordinates, in radians.
     * @param cartesian - The Cartesian position to unproject with height (z) in meters.
     * @param [result] - An instance into which to copy the result.  If this parameter is
     *        undefined, a new instance is created and returned.
     * @returns The unprojected coordinates.  If the result parameter is not undefined, the
     *          coordinates are copied there and that instance is returned.  Otherwise, a new instance is
     *          created and returned.
     */
    unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic;
}

/**
 * Math functions.
 */
export namespace Math {
    /**
     * 0.1
     */
    const EPSILON1 = 0.1;
    /**
     * 0.01
     */
    const EPSILON2 = 0.01;
    /**
     * 0.001
     */
    const EPSILON3 = 0.001;
    /**
     * 0.0001
     */
    const EPSILON4 = 0.0001;
    /**
     * 0.00001
     */
    const EPSILON5 = 0.00001;
    /**
     * 0.000001
     */
    const EPSILON6 = 0.000001;
    /**
     * 0.0000001
     */
    const EPSILON7 = 1e-7;
    /**
     * 0.00000001
     */
    const EPSILON8 = 1e-8;
    /**
     * 0.000000001
     */
    const EPSILON9 = 1e-9;
    /**
     * 0.0000000001
     */
    const EPSILON10 = 1e-10;
    /**
     * 0.00000000001
     */
    const EPSILON11 = 1e-11;
    /**
     * 0.000000000001
     */
    const EPSILON12 = 1e-12;
    /**
     * 0.0000000000001
     */
    const EPSILON13 = 1e-13;
    /**
     * 0.00000000000001
     */
    const EPSILON14 = 1e-14;
    /**
     * 0.000000000000001
     */
    const EPSILON15 = 1e-15;
    /**
     * 0.0000000000000001
     */
    const EPSILON16 = 1e-16;
    /**
     * 0.00000000000000001
     */
    const EPSILON17 = 1e-17;
    /**
     * 0.000000000000000001
     */
    const EPSILON18 = 1e-18;
    /**
     * 0.0000000000000000001
     */
    const EPSILON19 = 1e-19;
    /**
     * 0.00000000000000000001
     */
    const EPSILON20 = 1e-20;
    /**
     * 0.000000000000000000001
     */
    const EPSILON21 = 1e-21;
    /**
     * The gravitational parameter of the Earth in meters cubed
     * per second squared as defined by the WGS84 model: 3.986004418e14
     */
    const GRAVITATIONALPARAMETER = 398600441800000;
    /**
     * Radius of the sun in meters: 6.955e8
     */
    const SOLAR_RADIUS = 695500000;
    /**
     * The mean radius of the moon, according to the "Report of the IAU/IAG Working Group on
     * Cartographic Coordinates and Rotational Elements of the Planets and satellites: 2000",
     * Celestial Mechanics 82: 83-110, 2002.
     */
    const LUNAR_RADIUS = 1737400;
    /**
     * 64 * 1024
     */
    const SIXTY_FOUR_KILOBYTES: number;
    /**
     * 4 * 1024 * 1024 * 1024
     */
    const FOUR_GIGABYTES: number;
    /**
     * Returns the sign of the value; 1 if the value is positive, -1 if the value is
     * negative, or 0 if the value is 0.
     * @param value - The value to return the sign of.
     * @returns The sign of value.
     */
    function sign(value: number): number;
    /**
     * Returns 1.0 if the given value is positive or zero, and -1.0 if it is negative.
     * This is similar to {@link Math#sign} except that returns 1.0 instead of
     * 0.0 when the input value is 0.0.
     * @param value - The value to return the sign of.
     * @returns The sign of value.
     */
    function signNotZero(value: number): number;
    /**
     * Converts a scalar value in the range [-1.0, 1.0] to a SNORM in the range [0, rangeMaximum]
     * @param value - The scalar value in the range [-1.0, 1.0]
     * @param [rangeMaximum = 255] - The maximum value in the mapped range, 255 by default.
     * @returns A SNORM value, where 0 maps to -1.0 and rangeMaximum maps to 1.0.
     */
    function toSNorm(value: number, rangeMaximum?: number): number;
    /**
     * Converts a SNORM value in the range [0, rangeMaximum] to a scalar in the range [-1.0, 1.0].
     * @param value - SNORM value in the range [0, rangeMaximum]
     * @param [rangeMaximum = 255] - The maximum value in the SNORM range, 255 by default.
     * @returns Scalar in the range [-1.0, 1.0].
     */
    function fromSNorm(value: number, rangeMaximum?: number): number;
    /**
     * Converts a scalar value in the range [rangeMinimum, rangeMaximum] to a scalar in the range [0.0, 1.0]
     * @param value - The scalar value in the range [rangeMinimum, rangeMaximum]
     * @param rangeMinimum - The minimum value in the mapped range.
     * @param rangeMaximum - The maximum value in the mapped range.
     * @returns A scalar value, where rangeMinimum maps to 0.0 and rangeMaximum maps to 1.0.
     */
    function normalize(value: number, rangeMinimum: number, rangeMaximum: number): number;
    /**
     * Returns the hyperbolic sine of a number.
     * The hyperbolic sine of <em>value</em> is defined to be
     * (<em>e<sup>x</sup>&nbsp;-&nbsp;e<sup>-x</sup></em>)/2.0
     * where <i>e</i> is Euler's number, approximately 2.71828183.
     *
     * <p>Special cases:
     *   <ul>
     *     <li>If the argument is NaN, then the result is NaN.</li>
     *
     *     <li>If the argument is infinite, then the result is an infinity
     *     with the same sign as the argument.</li>
     *
     *     <li>If the argument is zero, then the result is a zero with the
     *     same sign as the argument.</li>
     *   </ul>
     * </p>
     * @param value - The number whose hyperbolic sine is to be returned.
     * @returns The hyperbolic sine of <code>value</code>.
     */
    function sinh(value: number): number;
    /**
     * Returns the hyperbolic cosine of a number.
     * The hyperbolic cosine of <strong>value</strong> is defined to be
     * (<em>e<sup>x</sup>&nbsp;+&nbsp;e<sup>-x</sup></em>)/2.0
     * where <i>e</i> is Euler's number, approximately 2.71828183.
     *
     * <p>Special cases:
     *   <ul>
     *     <li>If the argument is NaN, then the result is NaN.</li>
     *
     *     <li>If the argument is infinite, then the result is positive infinity.</li>
     *
     *     <li>If the argument is zero, then the result is 1.0.</li>
     *   </ul>
     * </p>
     * @param value - The number whose hyperbolic cosine is to be returned.
     * @returns The hyperbolic cosine of <code>value</code>.
     */
    function cosh(value: number): number;
    /**
     * Computes the linear interpolation of two values.
     * @example
     * const n = Cesium.Math.lerp(0.0, 2.0, 0.5); // returns 1.0
     * @param p - The start value to interpolate.
     * @param q - The end value to interpolate.
     * @param time - The time of interpolation generally in the range <code>[0.0, 1.0]</code>.
     * @returns The linearly interpolated value.
     */
    function lerp(p: number, q: number, time: number): number;
    /**
     * @property value - The new value after applying the smooth damp.
     * @property velocity - The updated current velocity.
     */
    type SmoothDampResult = {
        value: number;
        velocity: number;
    };
    /**
     * Gradually changes a value towards a target value over time. The smoothing function uses a spring-damping algorithm based on Game Programming Gems 4 Chapter 1.10.
     * @param p - The current value.
     * @param q - The target value.
     * @param velocity - The current velocity.
     * @param [deltaTime = 0.0] - The time since the last call to this function. Value must be greater than or equal to 0.0.
     * @param [maximumSpeed = Number.POSITIVE_INFINITY] - Optionally allows clamping to the specified maximum speed.
     * @param [smoothTime = 0.0001] - Approximately the time it will take to reach the target. A smaller value will reach the target faster. This value must be greater than or equal to 0.0001.
     * @param [result] - An object to store the result. If not provided, a new object will be created and returned.
     * @returns An object containing the new value and the updated current velocity.
     */
    function smoothDamp(p: number, q: number, velocity: number, deltaTime?: number, maximumSpeed?: number, smoothTime?: number, result?: SmoothDampResult): SmoothDampResult;
    /**
     * pi
     */
    const PI: number;
    /**
     * 1/pi
     */
    const ONE_OVER_PI: number;
    /**
     * pi/2
     */
    const PI_OVER_TWO: number;
    /**
     * pi/3
     */
    const PI_OVER_THREE: number;
    /**
     * pi/4
     */
    const PI_OVER_FOUR: number;
    /**
     * pi/6
     */
    const PI_OVER_SIX: number;
    /**
     * 3pi/2
     */
    const THREE_PI_OVER_TWO: number;
    /**
     * 2pi
     */
    const TWO_PI: number;
    /**
     * 1/2pi
     */
    const ONE_OVER_TWO_PI: number;
    /**
     * The number of radians in a degree.
     */
    const RADIANS_PER_DEGREE: number;
    /**
     * The number of degrees in a radian.
     */
    const DEGREES_PER_RADIAN: number;
    /**
     * The number of radians in an arc second.
     */
    const RADIANS_PER_ARCSECOND: number;
    /**
     * Converts degrees to radians.
     * @param degrees - The angle to convert in degrees.
     * @returns The corresponding angle in radians.
     */
    function toRadians(degrees: number): number;
    /**
     * Converts radians to degrees.
     * @param radians - The angle to convert in radians.
     * @returns The corresponding angle in degrees.
     */
    function toDegrees(radians: number): number;
    /**
     * Converts a longitude value, in radians, to the range [<code>-Math.PI</code>, <code>Math.PI</code>).
     * @example
     * // Convert 270 degrees to -90 degrees longitude
     * const longitude = Cesium.Math.convertLongitudeRange(Cesium.Math.toRadians(270.0));
     * @param angle - The longitude value, in radians, to convert to the range [<code>-Math.PI</code>, <code>Math.PI</code>).
     * @returns The equivalent longitude value in the range [<code>-Math.PI</code>, <code>Math.PI</code>).
     */
    function convertLongitudeRange(angle: number): number;
    /**
     * Convenience function that clamps a latitude value, in radians, to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
     * Useful for sanitizing data before use in objects requiring correct range.
     * @example
     * // Clamp 108 degrees latitude to 90 degrees latitude
     * const latitude = Cesium.Math.clampToLatitudeRange(Cesium.Math.toRadians(108.0));
     * @param angle - The latitude value, in radians, to clamp to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
     * @returns The latitude value clamped to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
     */
    function clampToLatitudeRange(angle: number): number;
    /**
     * Produces an angle in the range -Pi <= angle <= Pi which is equivalent to the provided angle.
     * @param angle - in radians
     * @returns The angle in the range [<code>-Math.PI</code>, <code>Math.PI</code>].
     */
    function negativePiToPi(angle: number): number;
    /**
     * Produces an angle in the range 0 <= angle <= 2Pi which is equivalent to the provided angle.
     * @param angle - in radians
     * @returns The angle in the range [0, <code>Math.TWO_PI</code>].
     */
    function zeroToTwoPi(angle: number): number;
    /**
     * The modulo operation that also works for negative dividends.
     * @param m - The dividend.
     * @param n - The divisor.
     * @returns The remainder.
     */
    function mod(m: number, n: number): number;
    /**
     * Determines if two values are equal using an absolute or relative tolerance test. This is useful
     * to avoid problems due to roundoff error when comparing floating-point values directly. The values are
     * first compared using an absolute tolerance test. If that fails, a relative tolerance test is performed.
     * Use this test if you are unsure of the magnitudes of left and right.
     * @example
     * const a = Cesium.Math.equalsEpsilon(0.0, 0.01, Cesium.Math.EPSILON2); // true
     * const b = Cesium.Math.equalsEpsilon(0.0, 0.1, Cesium.Math.EPSILON2);  // false
     * const c = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON7); // true
     * const d = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON9); // false
     * @param left - The first value to compare.
     * @param right - The other value to compare.
     * @param [relativeEpsilon = 0] - The maximum inclusive delta between <code>left</code> and <code>right</code> for the relative tolerance test.
     * @param [absoluteEpsilon = relativeEpsilon] - The maximum inclusive delta between <code>left</code> and <code>right</code> for the absolute tolerance test.
     * @returns <code>true</code> if the values are equal within the epsilon; otherwise, <code>false</code>.
     */
    function equalsEpsilon(left: number, right: number, relativeEpsilon?: number, absoluteEpsilon?: number): boolean;
    /**
     * Determines if the left value is less than the right value. If the two values are within
     * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns false.
     * @param left - The first number to compare.
     * @param right - The second number to compare.
     * @param absoluteEpsilon - The absolute epsilon to use in comparison.
     * @returns <code>true</code> if <code>left</code> is less than <code>right</code> by more than
     *          <code>absoluteEpsilon<code>. <code>false</code> if <code>left</code> is greater or if the two
     *          values are nearly equal.
     */
    function lessThan(left: number, right: number, absoluteEpsilon: number): boolean;
    /**
     * Determines if the left value is less than or equal to the right value. If the two values are within
     * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns true.
     * @param left - The first number to compare.
     * @param right - The second number to compare.
     * @param absoluteEpsilon - The absolute epsilon to use in comparison.
     * @returns <code>true</code> if <code>left</code> is less than <code>right</code> or if the
     *          the values are nearly equal.
     */
    function lessThanOrEquals(left: number, right: number, absoluteEpsilon: number): boolean;
    /**
     * Determines if the left value is greater the right value. If the two values are within
     * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns false.
     * @param left - The first number to compare.
     * @param right - The second number to compare.
     * @param absoluteEpsilon - The absolute epsilon to use in comparison.
     * @returns <code>true</code> if <code>left</code> is greater than <code>right</code> by more than
     *          <code>absoluteEpsilon<code>. <code>false</code> if <code>left</code> is less or if the two
     *          values are nearly equal.
     */
    function greaterThan(left: number, right: number, absoluteEpsilon: number): boolean;
    /**
     * Determines if the left value is greater than or equal to the right value. If the two values are within
     * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns true.
     * @param left - The first number to compare.
     * @param right - The second number to compare.
     * @param absoluteEpsilon - The absolute epsilon to use in comparison.
     * @returns <code>true</code> if <code>left</code> is greater than <code>right</code> or if the
     *          the values are nearly equal.
     */
    function greaterThanOrEquals(left: number, right: number, absoluteEpsilon: number): boolean;
    /**
     * Computes the factorial of the provided number.
     * @example
     * //Compute 7!, which is equal to 5040
     * const computedFactorial = Cesium.Math.factorial(7);
     * @param n - The number whose factorial is to be computed.
     * @returns The factorial of the provided number or undefined if the number is less than 0.
     */
    function factorial(n: number): number;
    /**
     * Increments a number with a wrapping to a minimum value if the number exceeds the maximum value.
     * @example
     * const n = Cesium.Math.incrementWrap(5, 10, 0); // returns 6
     * const m = Cesium.Math.incrementWrap(10, 10, 0); // returns 0
     * @param [n] - The number to be incremented.
     * @param [maximumValue] - The maximum incremented value before rolling over to the minimum value.
     * @param [minimumValue = 0.0] - The number reset to after the maximum value has been exceeded.
     * @returns The incremented number.
     */
    function incrementWrap(n?: number, maximumValue?: number, minimumValue?: number): number;
    /**
     * Determines if a non-negative integer is a power of two.
     * The maximum allowed input is (2^32)-1 due to 32-bit bitwise operator limitation in Javascript.
     * @example
     * const t = Cesium.Math.isPowerOfTwo(16); // true
     * const f = Cesium.Math.isPowerOfTwo(20); // false
     * @param n - The integer to test in the range [0, (2^32)-1].
     * @returns <code>true</code> if the number if a power of two; otherwise, <code>false</code>.
     */
    function isPowerOfTwo(n: number): boolean;
    /**
     * Computes the next power-of-two integer greater than or equal to the provided non-negative integer.
     * The maximum allowed input is 2^31 due to 32-bit bitwise operator limitation in Javascript.
     * @example
     * const n = Cesium.Math.nextPowerOfTwo(29); // 32
     * const m = Cesium.Math.nextPowerOfTwo(32); // 32
     * @param n - The integer to test in the range [0, 2^31].
     * @returns The next power-of-two integer.
     */
    function nextPowerOfTwo(n: number): number;
    /**
     * Computes the previous power-of-two integer less than or equal to the provided non-negative integer.
     * The maximum allowed input is (2^32)-1 due to 32-bit bitwise operator limitation in Javascript.
     * @example
     * const n = Cesium.Math.previousPowerOfTwo(29); // 16
     * const m = Cesium.Math.previousPowerOfTwo(32); // 32
     * @param n - The integer to test in the range [0, (2^32)-1].
     * @returns The previous power-of-two integer.
     */
    function previousPowerOfTwo(n: number): number;
    /**
     * Constraint a value to lie between two values.
     * @param value - The value to clamp.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @returns The clamped value such that min <= result <= max.
     */
    function clamp(value: number, min: number, max: number): number;
    /**
     * Sets the seed used by the random number generator
     * in {@link Math#nextRandomNumber}.
     * @param seed - An integer used as the seed.
     */
    function setRandomNumberSeed(seed: number): void;
    /**
     * Generates a random floating point number in the range of [0.0, 1.0)
     * using a Mersenne twister.
     * @returns A random number in the range of [0.0, 1.0).
     */
    function nextRandomNumber(): number;
    /**
     * Generates a random number between two numbers.
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @returns A random number between the min and max.
     */
    function randomBetween(min: number, max: number): number;
    /**
     * Computes <code>Math.acos(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
     * so that the function will never return NaN.
     * @param value - The value for which to compute acos.
     * @returns The acos of the value if the value is in the range [-1.0, 1.0], or the acos of -1.0 or 1.0,
     *          whichever is closer, if the value is outside the range.
     */
    function acosClamped(value: number): number;
    /**
     * Computes <code>Math.asin(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
     * so that the function will never return NaN.
     * @param value - The value for which to compute asin.
     * @returns The asin of the value if the value is in the range [-1.0, 1.0], or the asin of -1.0 or 1.0,
     *          whichever is closer, if the value is outside the range.
     */
    function asinClamped(value: number): number;
    /**
     * Finds the chord length between two points given the circle's radius and the angle between the points.
     * @param angle - The angle between the two points.
     * @param radius - The radius of the circle.
     * @returns The chord length.
     */
    function chordLength(angle: number, radius: number): number;
    /**
     * Finds the logarithm of a number to a base.
     * @param number - The number.
     * @param base - The base.
     * @returns The result.
     */
    function logBase(number: number, base: number): number;
    /**
     * Finds the cube root of a number.
     * Returns NaN if <code>number</code> is not provided.
     * @param [number] - The number.
     * @returns The result.
     */
    function cbrt(number?: number): number;
    /**
     * Finds the base 2 logarithm of a number.
     * @param number - The number.
     * @returns The result.
     */
    function log2(number: number): number;
    /**
     * Computes a fast approximation of Atan for input in the range [-1, 1].
     *
     * Based on Michal Drobot's approximation from ShaderFastLibs,
     * which in turn is based on "Efficient approximations for the arctangent function,"
     * Rajan, S. Sichun Wang Inkol, R. Joyal, A., May 2006.
     * Adapted from ShaderFastLibs under MIT License.
     * @param x - An input number in the range [-1, 1]
     * @returns An approximation of atan(x)
     */
    function fastApproximateAtan(x: number): number;
    /**
     * Computes a fast approximation of Atan2(x, y) for arbitrary input scalars.
     *
     * Range reduction math based on nvidia's cg reference implementation: http://developer.download.nvidia.com/cg/atan2.html
     * @param x - An input number that isn't zero if y is zero.
     * @param y - An input number that isn't zero if x is zero.
     * @returns An approximation of atan2(x, y)
     */
    function fastApproximateAtan2(x: number, y: number): number;
}

export interface Matrix2 extends ArrayLike<number> {
}

/**
 * A 2x2 matrix, indexable as a column-major order array.
 * Constructor parameters are in row-major order for code readability.
 * @param [column0Row0 = 0.0] - The value for column 0, row 0.
 * @param [column1Row0 = 0.0] - The value for column 1, row 0.
 * @param [column0Row1 = 0.0] - The value for column 0, row 1.
 * @param [column1Row1 = 0.0] - The value for column 1, row 1.
 */
export class Matrix2 implements ArrayLike<number> {
    constructor(column0Row0?: number, column1Row0?: number, column0Row1?: number, column1Row1?: number);
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Matrix2, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Matrix2): Matrix2;
    /**
     * Flattens an array of Matrix2s into an array of components. The components
     * are stored in column-major order.
     * @param array - The array of matrices to pack.
     * @param [result] - The array onto which to store the result. If this is a typed array, it must have array.length * 4 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 4) elements.
     * @returns The packed array.
     */
    static packArray(array: Matrix2[], result?: number[]): number[];
    /**
     * Unpacks an array of column-major matrix components into an array of Matrix2s.
     * @param array - The array of components to unpack.
     * @param [result] - The array onto which to store the result.
     * @returns The unpacked array.
     */
    static unpackArray(array: number[], result?: Matrix2[]): Matrix2[];
    /**
     * Duplicates a Matrix2 instance.
     * @param matrix - The matrix to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix2 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    static clone(matrix: Matrix2, result?: Matrix2): Matrix2;
    /**
     * Creates a Matrix2 instance from a column-major order array.
     * @param values - The column-major order array.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    static fromColumnMajorArray(values: number[], result?: Matrix2): Matrix2;
    /**
     * Creates a Matrix2 instance from a row-major order array.
     * The resulting matrix will be in column-major order.
     * @param values - The row-major order array.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    static fromRowMajorArray(values: number[], result?: Matrix2): Matrix2;
    /**
     * Computes a Matrix2 instance representing a non-uniform scale.
     * @example
     * // Creates
     * //   [7.0, 0.0]
     * //   [0.0, 8.0]
     * const m = Cesium.Matrix2.fromScale(new Cesium.Cartesian2(7.0, 8.0));
     * @param scale - The x and y scale factors.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    static fromScale(scale: Cartesian2, result?: Matrix2): Matrix2;
    /**
     * Computes a Matrix2 instance representing a uniform scale.
     * @example
     * // Creates
     * //   [2.0, 0.0]
     * //   [0.0, 2.0]
     * const m = Cesium.Matrix2.fromUniformScale(2.0);
     * @param scale - The uniform scale factor.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    static fromUniformScale(scale: number, result?: Matrix2): Matrix2;
    /**
     * Creates a rotation matrix.
     * @example
     * // Rotate a point 45 degrees counterclockwise.
     * const p = new Cesium.Cartesian2(5, 6);
     * const m = Cesium.Matrix2.fromRotation(Cesium.Math.toRadians(45.0));
     * const rotated = Cesium.Matrix2.multiplyByVector(m, p, new Cesium.Cartesian2());
     * @param angle - The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    static fromRotation(angle: number, result?: Matrix2): Matrix2;
    /**
     * Creates an Array from the provided Matrix2 instance.
     * The array will be in column-major order.
     * @param matrix - The matrix to use..
     * @param [result] - The Array onto which to store the result.
     * @returns The modified Array parameter or a new Array instance if one was not provided.
     */
    static toArray(matrix: Matrix2, result?: number[]): number[];
    /**
     * Computes the array index of the element at the provided row and column.
     * @example
     * const myMatrix = new Cesium.Matrix2();
     * const column1Row0Index = Cesium.Matrix2.getElementIndex(1, 0);
     * const column1Row0 = myMatrix[column1Row0Index]
     * myMatrix[column1Row0Index] = 10.0;
     * @param row - The zero-based index of the row.
     * @param column - The zero-based index of the column.
     * @returns The index of the element at the provided row and column.
     */
    static getElementIndex(row: number, column: number): number;
    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian2 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the column to retrieve.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getColumn(matrix: Matrix2, index: number, result: Cartesian2): Cartesian2;
    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian2 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the column to set.
     * @param cartesian - The Cartesian whose values will be assigned to the specified column.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setColumn(matrix: Matrix2, index: number, cartesian: Cartesian2, result: Matrix2): Matrix2;
    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian2 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the row to retrieve.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getRow(matrix: Matrix2, index: number, result: Cartesian2): Cartesian2;
    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian2 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the row to set.
     * @param cartesian - The Cartesian whose values will be assigned to the specified row.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setRow(matrix: Matrix2, index: number, cartesian: Cartesian2, result: Matrix2): Matrix2;
    /**
     * Computes a new matrix that replaces the scale with the provided scale.
     * This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param scale - The scale that replaces the scale of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setScale(matrix: Matrix2, scale: Cartesian2, result: Matrix2): Matrix2;
    /**
     * Computes a new matrix that replaces the scale with the provided uniform scale.
     * This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param scale - The uniform scale that replaces the scale of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setUniformScale(matrix: Matrix2, scale: number, result: Matrix2): Matrix2;
    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getScale(matrix: Matrix2, result: Cartesian2): Cartesian2;
    /**
     * Computes the maximum scale assuming the matrix is an affine transformation.
     * The maximum scale is the maximum length of the column vectors.
     * @param matrix - The matrix.
     * @returns The maximum scale.
     */
    static getMaximumScale(matrix: Matrix2): number;
    /**
     * Sets the rotation assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param rotation - The rotation matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setRotation(matrix: Matrix2, rotation: Matrix2, result: Matrix2): Matrix2;
    /**
     * Extracts the rotation matrix assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getRotation(matrix: Matrix2, result: Matrix2): Matrix2;
    /**
     * Computes the product of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiply(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2;
    /**
     * Computes the sum of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2;
    /**
     * Computes the difference of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Matrix2, right: Matrix2, result: Matrix2): Matrix2;
    /**
     * Computes the product of a matrix and a column vector.
     * @param matrix - The matrix.
     * @param cartesian - The column.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByVector(matrix: Matrix2, cartesian: Cartesian2, result: Cartesian2): Cartesian2;
    /**
     * Computes the product of a matrix and a scalar.
     * @param matrix - The matrix.
     * @param scalar - The number to multiply by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(matrix: Matrix2, scalar: number, result: Matrix2): Matrix2;
    /**
     * Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.
     * @example
     * // Instead of Cesium.Matrix2.multiply(m, Cesium.Matrix2.fromScale(scale), m);
     * Cesium.Matrix2.multiplyByScale(m, scale, m);
     * @param matrix - The matrix on the left-hand side.
     * @param scale - The non-uniform scale on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScale(matrix: Matrix2, scale: Cartesian2, result: Matrix2): Matrix2;
    /**
     * Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.
     * @example
     * // Instead of Cesium.Matrix2.multiply(m, Cesium.Matrix2.fromUniformScale(scale), m);
     * Cesium.Matrix2.multiplyByUniformScale(m, scale, m);
     * @param matrix - The matrix on the left-hand side.
     * @param scale - The uniform scale on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByUniformScale(matrix: Matrix2, scale: number, result: Matrix2): Matrix2;
    /**
     * Creates a negated copy of the provided matrix.
     * @param matrix - The matrix to negate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(matrix: Matrix2, result: Matrix2): Matrix2;
    /**
     * Computes the transpose of the provided matrix.
     * @param matrix - The matrix to transpose.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static transpose(matrix: Matrix2, result: Matrix2): Matrix2;
    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     * @param matrix - The matrix with signed elements.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static abs(matrix: Matrix2, result: Matrix2): Matrix2;
    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first matrix.
     * @param [right] - The second matrix.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Matrix2, right?: Matrix2): boolean;
    /**
     * Compares provided matrix and array, starting from a given array offset.
     * @param matrix - The matrix to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the matrix starts.
     * @returns <code>true</code> if the matrix matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(matrix: Matrix2, array: number[], offset: number): boolean;
    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [left] - The first matrix.
     * @param [right] - The second matrix.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Matrix2, right?: Matrix2, epsilon?: number): boolean;
    /**
     * Gets the number of items in the collection.
     */
    length: number;
    /**
     * Duplicates the provided Matrix2 instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    clone(result?: Matrix2): Matrix2;
    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side matrix.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Matrix2): boolean;
    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side matrix.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Matrix2, epsilon?: number): boolean;
    /**
     * Creates a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1)'.
     * @returns A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.
     */
    toString(): string;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Creates a Matrix2 from 4 consecutive elements in an array.
     * @example
     * // Create the Matrix2:
     * // [1.0, 2.0]
     * // [1.0, 2.0]
     *
     * const v = [1.0, 1.0, 2.0, 2.0];
     * const m = Cesium.Matrix2.fromArray(v);
     *
     * // Create same Matrix2 with using an offset into an array
     * const v2 = [0.0, 0.0, 1.0, 1.0, 2.0, 2.0];
     * const m2 = Cesium.Matrix2.fromArray(v2, 2);
     * @param array - The array whose 4 consecutive elements correspond to the positions of the matrix.  Assumes column-major order.
     * @param [startingIndex = 0] - The offset into the array of the first element, which corresponds to first column first row position in the matrix.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    static fromArray(array: number[], startingIndex?: number, result?: Matrix2): Matrix2;
    /**
     * An immutable Matrix2 instance initialized to the identity matrix.
     */
    static readonly IDENTITY: Matrix2;
    /**
     * An immutable Matrix2 instance initialized to the zero matrix.
     */
    static readonly ZERO: Matrix2;
    /**
     * The index into Matrix2 for column 0, row 0.
     * @example
     * const matrix = new Cesium.Matrix2();
     * matrix[Cesium.Matrix2.COLUMN0ROW0] = 5.0; // set column 0, row 0 to 5.0
     */
    static readonly COLUMN0ROW0: number;
    /**
     * The index into Matrix2 for column 0, row 1.
     * @example
     * const matrix = new Cesium.Matrix2();
     * matrix[Cesium.Matrix2.COLUMN0ROW1] = 5.0; // set column 0, row 1 to 5.0
     */
    static readonly COLUMN0ROW1: number;
    /**
     * The index into Matrix2 for column 1, row 0.
     * @example
     * const matrix = new Cesium.Matrix2();
     * matrix[Cesium.Matrix2.COLUMN1ROW0] = 5.0; // set column 1, row 0 to 5.0
     */
    static readonly COLUMN1ROW0: number;
    /**
     * The index into Matrix2 for column 1, row 1.
     * @example
     * const matrix = new Cesium.Matrix2();
     * matrix[Cesium.Matrix2.COLUMN1ROW1] = 5.0; // set column 1, row 1 to 5.0
     */
    static readonly COLUMN1ROW1: number;
}

export type EigenDecompositionResult = {
    unitary?: Matrix3;
    diagonal?: Matrix3;
};

export interface Matrix3 extends ArrayLike<number> {
}

/**
 * A 3x3 matrix, indexable as a column-major order array.
 * Constructor parameters are in row-major order for code readability.
 * @param [column0Row0 = 0.0] - The value for column 0, row 0.
 * @param [column1Row0 = 0.0] - The value for column 1, row 0.
 * @param [column2Row0 = 0.0] - The value for column 2, row 0.
 * @param [column0Row1 = 0.0] - The value for column 0, row 1.
 * @param [column1Row1 = 0.0] - The value for column 1, row 1.
 * @param [column2Row1 = 0.0] - The value for column 2, row 1.
 * @param [column0Row2 = 0.0] - The value for column 0, row 2.
 * @param [column1Row2 = 0.0] - The value for column 1, row 2.
 * @param [column2Row2 = 0.0] - The value for column 2, row 2.
 */
export class Matrix3 implements ArrayLike<number> {
    constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number);
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Matrix3, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Matrix3 instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Matrix3): Matrix3;
    /**
     * Flattens an array of Matrix3s into an array of components. The components
     * are stored in column-major order.
     * @param array - The array of matrices to pack.
     * @param [result] - The array onto which to store the result. If this is a typed array, it must have array.length * 9 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 9) elements.
     * @returns The packed array.
     */
    static packArray(array: Matrix3[], result?: number[]): number[];
    /**
     * Unpacks an array of column-major matrix components into an array of Matrix3s.
     * @param array - The array of components to unpack.
     * @param [result] - The array onto which to store the result.
     * @returns The unpacked array.
     */
    static unpackArray(array: number[], result?: Matrix3[]): Matrix3[];
    /**
     * Duplicates a Matrix3 instance.
     * @param matrix - The matrix to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix3 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    static clone(matrix: Matrix3, result?: Matrix3): Matrix3;
    /**
     * Creates a Matrix3 instance from a column-major order array.
     * @param values - The column-major order array.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromColumnMajorArray(values: number[], result?: Matrix3): Matrix3;
    /**
     * Creates a Matrix3 instance from a row-major order array.
     * The resulting matrix will be in column-major order.
     * @param values - The row-major order array.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromRowMajorArray(values: number[], result?: Matrix3): Matrix3;
    /**
     * Computes a 3x3 rotation matrix from the provided quaternion.
     * @param quaternion - the quaternion to use.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The 3x3 rotation matrix from this quaternion.
     */
    static fromQuaternion(quaternion: Quaternion, result?: Matrix3): Matrix3;
    /**
     * Computes a 3x3 rotation matrix from the provided headingPitchRoll. (see http://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles )
     * @param headingPitchRoll - the headingPitchRoll to use.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The 3x3 rotation matrix from this headingPitchRoll.
     */
    static fromHeadingPitchRoll(headingPitchRoll: HeadingPitchRoll, result?: Matrix3): Matrix3;
    /**
     * Computes a Matrix3 instance representing a non-uniform scale.
     * @example
     * // Creates
     * //   [7.0, 0.0, 0.0]
     * //   [0.0, 8.0, 0.0]
     * //   [0.0, 0.0, 9.0]
     * const m = Cesium.Matrix3.fromScale(new Cesium.Cartesian3(7.0, 8.0, 9.0));
     * @param scale - The x, y, and z scale factors.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromScale(scale: Cartesian3, result?: Matrix3): Matrix3;
    /**
     * Computes a Matrix3 instance representing a uniform scale.
     * @example
     * // Creates
     * //   [2.0, 0.0, 0.0]
     * //   [0.0, 2.0, 0.0]
     * //   [0.0, 0.0, 2.0]
     * const m = Cesium.Matrix3.fromUniformScale(2.0);
     * @param scale - The uniform scale factor.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromUniformScale(scale: number, result?: Matrix3): Matrix3;
    /**
     * Computes a Matrix3 instance representing the cross product equivalent matrix of a Cartesian3 vector.
     * @example
     * // Creates
     * //   [0.0, -9.0,  8.0]
     * //   [9.0,  0.0, -7.0]
     * //   [-8.0, 7.0,  0.0]
     * const m = Cesium.Matrix3.fromCrossProduct(new Cesium.Cartesian3(7.0, 8.0, 9.0));
     * @param vector - the vector on the left hand side of the cross product operation.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromCrossProduct(vector: Cartesian3, result?: Matrix3): Matrix3;
    /**
     * Creates a rotation matrix around the x-axis.
     * @example
     * // Rotate a point 45 degrees counterclockwise around the x-axis.
     * const p = new Cesium.Cartesian3(5, 6, 7);
     * const m = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45.0));
     * const rotated = Cesium.Matrix3.multiplyByVector(m, p, new Cesium.Cartesian3());
     * @param angle - The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromRotationX(angle: number, result?: Matrix3): Matrix3;
    /**
     * Creates a rotation matrix around the y-axis.
     * @example
     * // Rotate a point 45 degrees counterclockwise around the y-axis.
     * const p = new Cesium.Cartesian3(5, 6, 7);
     * const m = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(45.0));
     * const rotated = Cesium.Matrix3.multiplyByVector(m, p, new Cesium.Cartesian3());
     * @param angle - The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromRotationY(angle: number, result?: Matrix3): Matrix3;
    /**
     * Creates a rotation matrix around the z-axis.
     * @example
     * // Rotate a point 45 degrees counterclockwise around the z-axis.
     * const p = new Cesium.Cartesian3(5, 6, 7);
     * const m = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(45.0));
     * const rotated = Cesium.Matrix3.multiplyByVector(m, p, new Cesium.Cartesian3());
     * @param angle - The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix3 instance if one was not provided.
     */
    static fromRotationZ(angle: number, result?: Matrix3): Matrix3;
    /**
     * Creates an Array from the provided Matrix3 instance.
     * The array will be in column-major order.
     * @param matrix - The matrix to use..
     * @param [result] - The Array onto which to store the result.
     * @returns The modified Array parameter or a new Array instance if one was not provided.
     */
    static toArray(matrix: Matrix3, result?: number[]): number[];
    /**
     * Computes the array index of the element at the provided row and column.
     * @example
     * const myMatrix = new Cesium.Matrix3();
     * const column1Row0Index = Cesium.Matrix3.getElementIndex(1, 0);
     * const column1Row0 = myMatrix[column1Row0Index]
     * myMatrix[column1Row0Index] = 10.0;
     * @param column - The zero-based index of the column.
     * @param row - The zero-based index of the row.
     * @returns The index of the element at the provided row and column.
     */
    static getElementIndex(column: number, row: number): number;
    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian3 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the column to retrieve.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getColumn(matrix: Matrix3, index: number, result: Cartesian3): Cartesian3;
    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian3 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the column to set.
     * @param cartesian - The Cartesian whose values will be assigned to the specified column.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setColumn(matrix: Matrix3, index: number, cartesian: Cartesian3, result: Matrix3): Matrix3;
    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian3 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the row to retrieve.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getRow(matrix: Matrix3, index: number, result: Cartesian3): Cartesian3;
    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian3 instance.
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the row to set.
     * @param cartesian - The Cartesian whose values will be assigned to the specified row.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setRow(matrix: Matrix3, index: number, cartesian: Cartesian3, result: Matrix3): Matrix3;
    /**
     * Computes a new matrix that replaces the scale with the provided scale.
     * This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param scale - The scale that replaces the scale of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setScale(matrix: Matrix3, scale: Cartesian3, result: Matrix3): Matrix3;
    /**
     * Computes a new matrix that replaces the scale with the provided uniform scale.
     * This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param scale - The uniform scale that replaces the scale of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setUniformScale(matrix: Matrix3, scale: number, result: Matrix3): Matrix3;
    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getScale(matrix: Matrix3, result: Cartesian3): Cartesian3;
    /**
     * Computes the maximum scale assuming the matrix is an affine transformation.
     * The maximum scale is the maximum length of the column vectors.
     * @param matrix - The matrix.
     * @returns The maximum scale.
     */
    static getMaximumScale(matrix: Matrix3): number;
    /**
     * Sets the rotation assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param rotation - The rotation matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setRotation(matrix: Matrix3, rotation: Matrix3, result: Matrix3): Matrix3;
    /**
     * Extracts the rotation matrix assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getRotation(matrix: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the product of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiply(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the sum of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the difference of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Matrix3, right: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the product of a matrix and a column vector.
     * @param matrix - The matrix.
     * @param cartesian - The column.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByVector(matrix: Matrix3, cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the product of a matrix and a scalar.
     * @param matrix - The matrix.
     * @param scalar - The number to multiply by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(matrix: Matrix3, scalar: number, result: Matrix3): Matrix3;
    /**
     * Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.
     * @example
     * // Instead of Cesium.Matrix3.multiply(m, Cesium.Matrix3.fromScale(scale), m);
     * Cesium.Matrix3.multiplyByScale(m, scale, m);
     * @param matrix - The matrix on the left-hand side.
     * @param scale - The non-uniform scale on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScale(matrix: Matrix3, scale: Cartesian3, result: Matrix3): Matrix3;
    /**
     * Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.
     * @example
     * // Instead of Cesium.Matrix3.multiply(m, Cesium.Matrix3.fromUniformScale(scale), m);
     * Cesium.Matrix3.multiplyByUniformScale(m, scale, m);
     * @param matrix - The matrix on the left-hand side.
     * @param scale - The uniform scale on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByUniformScale(matrix: Matrix3, scale: number, result: Matrix3): Matrix3;
    /**
     * Creates a negated copy of the provided matrix.
     * @param matrix - The matrix to negate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(matrix: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the transpose of the provided matrix.
     * @param matrix - The matrix to transpose.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static transpose(matrix: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the eigenvectors and eigenvalues of a symmetric matrix.
     * <p>
     * Returns a diagonal matrix and unitary matrix such that:
     * <code>matrix = unitary matrix * diagonal matrix * transpose(unitary matrix)</code>
     * </p>
     * <p>
     * The values along the diagonal of the diagonal matrix are the eigenvalues. The columns
     * of the unitary matrix are the corresponding eigenvectors.
     * </p>
     * @example
     * const a = //... symetric matrix
     * const result = {
     *     unitary : new Cesium.Matrix3(),
     *     diagonal : new Cesium.Matrix3()
     * };
     * Cesium.Matrix3.computeEigenDecomposition(a, result);
     *
     * const unitaryTranspose = Cesium.Matrix3.transpose(result.unitary, new Cesium.Matrix3());
     * const b = Cesium.Matrix3.multiply(result.unitary, result.diagonal, new Cesium.Matrix3());
     * Cesium.Matrix3.multiply(b, unitaryTranspose, b); // b is now equal to a
     *
     * const lambda = Cesium.Matrix3.getColumn(result.diagonal, 0, new Cesium.Cartesian3()).x;  // first eigenvalue
     * const v = Cesium.Matrix3.getColumn(result.unitary, 0, new Cesium.Cartesian3());          // first eigenvector
     * const c = Cesium.Cartesian3.multiplyByScalar(v, lambda, new Cesium.Cartesian3());        // equal to Cesium.Matrix3.multiplyByVector(a, v)
     * @param matrix - The matrix to decompose into diagonal and unitary matrix. Expected to be symmetric.
     * @param [result] - An object with unitary and diagonal properties which are matrices onto which to store the result.
     * @returns An object with unitary and diagonal properties which are the unitary and diagonal matrices, respectively.
     */
    static computeEigenDecomposition(matrix: Matrix3, result?: EigenDecompositionResult): EigenDecompositionResult;
    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     * @param matrix - The matrix with signed elements.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static abs(matrix: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the determinant of the provided matrix.
     * @param matrix - The matrix to use.
     * @returns The value of the determinant of the matrix.
     */
    static determinant(matrix: Matrix3): number;
    /**
     * Computes the inverse of the provided matrix.
     * @param matrix - The matrix to invert.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static inverse(matrix: Matrix3, result: Matrix3): Matrix3;
    /**
     * Computes the inverse transpose of a matrix.
     * @param matrix - The matrix to transpose and invert.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static inverseTranspose(matrix: Matrix3, result: Matrix3): Matrix3;
    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first matrix.
     * @param [right] - The second matrix.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Matrix3, right?: Matrix3): boolean;
    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [left] - The first matrix.
     * @param [right] - The second matrix.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Matrix3, right?: Matrix3, epsilon?: number): boolean;
    /**
     * Gets the number of items in the collection.
     */
    length: number;
    /**
     * Duplicates the provided Matrix3 instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix3 instance if one was not provided.
     */
    clone(result?: Matrix3): Matrix3;
    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side matrix.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Matrix3): boolean;
    /**
     * Compares provided matrix and array, starting from a given array offset.
     * @param matrix - The matrix to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the matrix starts.
     * @returns <code>true</code> if the matrix matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(matrix: Matrix3, array: number[], offset: number): boolean;
    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side matrix.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Matrix3, epsilon?: number): boolean;
    /**
     * Creates a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1, column2)'.
     * @returns A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2)'.
     */
    toString(): string;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Creates a Matrix3 from 9 consecutive elements in an array.
     * @example
     * // Create the Matrix3:
     * // [1.0, 2.0, 3.0]
     * // [1.0, 2.0, 3.0]
     * // [1.0, 2.0, 3.0]
     *
     * const v = [1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0];
     * const m = Cesium.Matrix3.fromArray(v);
     *
     * // Create same Matrix3 with using an offset into an array
     * const v2 = [0.0, 0.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0];
     * const m2 = Cesium.Matrix3.fromArray(v2, 2);
     * @param array - The array whose 9 consecutive elements correspond to the positions of the matrix.  Assumes column-major order.
     * @param [startingIndex = 0] - The offset into the array of the first element, which corresponds to first column first row position in the matrix.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix3 instance if one was not provided.
     */
    static fromArray(array: number[], startingIndex?: number, result?: Matrix3): Matrix3;
    /**
     * An immutable Matrix3 instance initialized to the identity matrix.
     */
    static readonly IDENTITY: Matrix3;
    /**
     * An immutable Matrix3 instance initialized to the zero matrix.
     */
    static readonly ZERO: Matrix3;
    /**
     * The index into Matrix3 for column 0, row 0.
     */
    static readonly COLUMN0ROW0: number;
    /**
     * The index into Matrix3 for column 0, row 1.
     */
    static readonly COLUMN0ROW1: number;
    /**
     * The index into Matrix3 for column 0, row 2.
     */
    static readonly COLUMN0ROW2: number;
    /**
     * The index into Matrix3 for column 1, row 0.
     */
    static readonly COLUMN1ROW0: number;
    /**
     * The index into Matrix3 for column 1, row 1.
     */
    static readonly COLUMN1ROW1: number;
    /**
     * The index into Matrix3 for column 1, row 2.
     */
    static readonly COLUMN1ROW2: number;
    /**
     * The index into Matrix3 for column 2, row 0.
     */
    static readonly COLUMN2ROW0: number;
    /**
     * The index into Matrix3 for column 2, row 1.
     */
    static readonly COLUMN2ROW1: number;
    /**
     * The index into Matrix3 for column 2, row 2.
     */
    static readonly COLUMN2ROW2: number;
}

export type Viewport = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};

/**
 * An object with the position, direction, and up vector of a camera, such as {@link Camera}.
 */
export type CameraLike = {
    position: Cartesian3;
    direction: Cartesian3;
    up: Cartesian3;
};

export interface Matrix4 extends ArrayLike<number> {
}

/**
 * A 4x4 matrix, indexable as a column-major order array.
 * Constructor parameters are in row-major order for code readability.
 * @param [column0Row0 = 0.0] - The value for column 0, row 0.
 * @param [column1Row0 = 0.0] - The value for column 1, row 0.
 * @param [column2Row0 = 0.0] - The value for column 2, row 0.
 * @param [column3Row0 = 0.0] - The value for column 3, row 0.
 * @param [column0Row1 = 0.0] - The value for column 0, row 1.
 * @param [column1Row1 = 0.0] - The value for column 1, row 1.
 * @param [column2Row1 = 0.0] - The value for column 2, row 1.
 * @param [column3Row1 = 0.0] - The value for column 3, row 1.
 * @param [column0Row2 = 0.0] - The value for column 0, row 2.
 * @param [column1Row2 = 0.0] - The value for column 1, row 2.
 * @param [column2Row2 = 0.0] - The value for column 2, row 2.
 * @param [column3Row2 = 0.0] - The value for column 3, row 2.
 * @param [column0Row3 = 0.0] - The value for column 0, row 3.
 * @param [column1Row3 = 0.0] - The value for column 1, row 3.
 * @param [column2Row3 = 0.0] - The value for column 2, row 3.
 * @param [column3Row3 = 0.0] - The value for column 3, row 3.
 */
export class Matrix4 implements ArrayLike<number> {
    constructor(column0Row0?: number, column1Row0?: number, column2Row0?: number, column3Row0?: number, column0Row1?: number, column1Row1?: number, column2Row1?: number, column3Row1?: number, column0Row2?: number, column1Row2?: number, column2Row2?: number, column3Row2?: number, column0Row3?: number, column1Row3?: number, column2Row3?: number, column3Row3?: number);
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Matrix4, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Matrix4): Matrix4;
    /**
     * Flattens an array of Matrix4s into an array of components. The components
     * are stored in column-major order.
     * @param array - The array of matrices to pack.
     * @param [result] - The array onto which to store the result. If this is a typed array, it must have array.length * 16 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 16) elements.
     * @returns The packed array.
     */
    static packArray(array: Matrix4[], result?: number[]): number[];
    /**
     * Unpacks an array of column-major matrix components into an array of Matrix4s.
     * @param array - The array of components to unpack.
     * @param [result] - The array onto which to store the result.
     * @returns The unpacked array.
     */
    static unpackArray(array: number[], result?: Matrix4[]): Matrix4[];
    /**
     * Duplicates a Matrix4 instance.
     * @param matrix - The matrix to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    static clone(matrix: Matrix4, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance from a column-major order array.
     * @param values - The column-major order array.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromColumnMajorArray(values: number[], result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance from a row-major order array.
     * The resulting matrix will be in column-major order.
     * @param values - The row-major order array.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromRowMajorArray(values: number[], result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance from a Matrix3 representing the rotation
     * and a Cartesian3 representing the translation.
     * @param rotation - The upper left portion of the matrix representing the rotation.
     * @param [translation = Cartesian3.ZERO] - The upper right portion of the matrix representing the translation.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromRotationTranslation(rotation: Matrix3, translation?: Cartesian3, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance from a translation, rotation, and scale (TRS)
     * representation with the rotation represented as a quaternion.
     * @example
     * const result = Cesium.Matrix4.fromTranslationQuaternionRotationScale(
     *   new Cesium.Cartesian3(1.0, 2.0, 3.0), // translation
     *   Cesium.Quaternion.IDENTITY,           // rotation
     *   new Cesium.Cartesian3(7.0, 8.0, 9.0), // scale
     *   result);
     * @param translation - The translation transformation.
     * @param rotation - The rotation transformation.
     * @param scale - The non-uniform scale transformation.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromTranslationQuaternionRotationScale(translation: Cartesian3, rotation: Quaternion, scale: Cartesian3, result?: Matrix4): Matrix4;
    /**
     * Creates a Matrix4 instance from a {@link TranslationRotationScale} instance.
     * @param translationRotationScale - The instance.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromTranslationRotationScale(translationRotationScale: TranslationRotationScale, result?: Matrix4): Matrix4;
    /**
     * Creates a Matrix4 instance from a Cartesian3 representing the translation.
     * @param translation - The upper right portion of the matrix representing the translation.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromTranslation(translation: Cartesian3, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance representing a non-uniform scale.
     * @example
     * // Creates
     * //   [7.0, 0.0, 0.0, 0.0]
     * //   [0.0, 8.0, 0.0, 0.0]
     * //   [0.0, 0.0, 9.0, 0.0]
     * //   [0.0, 0.0, 0.0, 1.0]
     * const m = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(7.0, 8.0, 9.0));
     * @param scale - The x, y, and z scale factors.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromScale(scale: Cartesian3, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance representing a uniform scale.
     * @example
     * // Creates
     * //   [2.0, 0.0, 0.0, 0.0]
     * //   [0.0, 2.0, 0.0, 0.0]
     * //   [0.0, 0.0, 2.0, 0.0]
     * //   [0.0, 0.0, 0.0, 1.0]
     * const m = Cesium.Matrix4.fromUniformScale(2.0);
     * @param scale - The uniform scale factor.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromUniformScale(scale: number, result?: Matrix4): Matrix4;
    /**
     * Creates a rotation matrix.
     * @param rotation - The rotation matrix.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromRotation(rotation: Matrix3, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance from a Camera.
     * @param camera - The camera to use.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    static fromCamera(camera: CameraLike, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance representing a perspective transformation matrix.
     * @param fovY - The field of view along the Y axis in radians.
     * @param aspectRatio - The aspect ratio.
     * @param near - The distance to the near plane in meters.
     * @param far - The distance to the far plane in meters.
     * @param result - The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    static computePerspectiveFieldOfView(fovY: number, aspectRatio: number, near: number, far: number, result: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance representing an orthographic transformation matrix.
     * @param left - The number of meters to the left of the camera that will be in view.
     * @param right - The number of meters to the right of the camera that will be in view.
     * @param bottom - The number of meters below of the camera that will be in view.
     * @param top - The number of meters above of the camera that will be in view.
     * @param near - The distance to the near plane in meters.
     * @param far - The distance to the far plane in meters.
     * @param result - The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    static computeOrthographicOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance representing an off center perspective transformation.
     * @param left - The number of meters to the left of the camera that will be in view.
     * @param right - The number of meters to the right of the camera that will be in view.
     * @param bottom - The number of meters below the camera that will be in view.
     * @param top - The number of meters above the camera that will be in view.
     * @param near - The distance to the near plane in meters.
     * @param far - The distance to the far plane in meters.
     * @param result - The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    static computePerspectiveOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance representing an infinite off center perspective transformation.
     * @param left - The number of meters to the left of the camera that will be in view.
     * @param right - The number of meters to the right of the camera that will be in view.
     * @param bottom - The number of meters below of the camera that will be in view.
     * @param top - The number of meters above of the camera that will be in view.
     * @param near - The distance to the near plane in meters.
     * @param result - The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    static computeInfinitePerspectiveOffCenter(left: number, right: number, bottom: number, top: number, near: number, result: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance that transforms from normalized device coordinates to window coordinates.
     * @example
     * // Create viewport transformation using an explicit viewport and depth range.
     * const m = Cesium.Matrix4.computeViewportTransformation({
     *     x : 0.0,
     *     y : 0.0,
     *     width : 1024.0,
     *     height : 768.0
     * }, 0.0, 1.0, new Cesium.Matrix4());
     * @param [viewport = { x : 0.0, y : 0.0, width : 0.0, height : 0.0 }] - The viewport's corners as shown in Example 1.
     * @param [nearDepthRange = 0.0] - The near plane distance in window coordinates.
     * @param [farDepthRange = 1.0] - The far plane distance in window coordinates.
     * @param [result] - The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    static computeViewportTransformation(viewport?: Viewport, nearDepthRange?: number, farDepthRange?: number, result?: Matrix4): Matrix4;
    /**
     * Computes a Matrix4 instance that transforms from world space to view space.
     * @param position - The position of the camera.
     * @param direction - The forward direction.
     * @param up - The up direction.
     * @param right - The right direction.
     * @param result - The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    static computeView(position: Cartesian3, direction: Cartesian3, up: Cartesian3, right: Cartesian3, result: Matrix4): Matrix4;
    /**
     * Computes an Array from the provided Matrix4 instance.
     * The array will be in column-major order.
     * @example
     * //create an array from an instance of Matrix4
     * // m = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     * const a = Cesium.Matrix4.toArray(m);
     *
     * // m remains the same
     * //creates a = [10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0]
     * @param matrix - The matrix to use..
     * @param [result] - The Array onto which to store the result.
     * @returns The modified Array parameter or a new Array instance if one was not provided.
     */
    static toArray(matrix: Matrix4, result?: number[]): number[];
    /**
     * Computes the array index of the element at the provided row and column.
     * @example
     * const myMatrix = new Cesium.Matrix4();
     * const column1Row0Index = Cesium.Matrix4.getElementIndex(1, 0);
     * const column1Row0 = myMatrix[column1Row0Index];
     * myMatrix[column1Row0Index] = 10.0;
     * @param row - The zero-based index of the row.
     * @param column - The zero-based index of the column.
     * @returns The index of the element at the provided row and column.
     */
    static getElementIndex(row: number, column: number): number;
    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian4 instance.
     * @example
     * //returns a Cartesian4 instance with values from the specified column
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * //Example 1: Creates an instance of Cartesian
     * const a = Cesium.Matrix4.getColumn(m, 2, new Cesium.Cartesian4());
     * @example
     * //Example 2: Sets values for Cartesian instance
     * const a = new Cesium.Cartesian4();
     * Cesium.Matrix4.getColumn(m, 2, a);
     *
     * // a.x = 12.0; a.y = 16.0; a.z = 20.0; a.w = 24.0;
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the column to retrieve.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getColumn(matrix: Matrix4, index: number, result: Cartesian4): Cartesian4;
    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
     * @example
     * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * const a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 11.0, 99.0, 13.0]
     * //     [14.0, 15.0, 98.0, 17.0]
     * //     [18.0, 19.0, 97.0, 21.0]
     * //     [22.0, 23.0, 96.0, 25.0]
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the column to set.
     * @param cartesian - The Cartesian whose values will be assigned to the specified column.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setColumn(matrix: Matrix4, index: number, cartesian: Cartesian4, result: Matrix4): Matrix4;
    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian4 instance.
     * @example
     * //returns a Cartesian4 instance with values from the specified column
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * //Example 1: Returns an instance of Cartesian
     * const a = Cesium.Matrix4.getRow(m, 2, new Cesium.Cartesian4());
     * @example
     * //Example 2: Sets values for a Cartesian instance
     * const a = new Cesium.Cartesian4();
     * Cesium.Matrix4.getRow(m, 2, a);
     *
     * // a.x = 18.0; a.y = 19.0; a.z = 20.0; a.w = 21.0;
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the row to retrieve.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getRow(matrix: Matrix4, index: number, result: Cartesian4): Cartesian4;
    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian4 instance.
     * @example
     * //create a new Matrix4 instance with new row values from the Cartesian4 instance
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * const a = Cesium.Matrix4.setRow(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [99.0, 98.0, 97.0, 96.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     * @param matrix - The matrix to use.
     * @param index - The zero-based index of the row to set.
     * @param cartesian - The Cartesian whose values will be assigned to the specified row.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setRow(matrix: Matrix4, index: number, cartesian: Cartesian4, result: Matrix4): Matrix4;
    /**
     * Computes a new matrix that replaces the translation in the rightmost column of the provided
     * matrix with the provided translation. This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param translation - The translation that replaces the translation of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setTranslation(matrix: Matrix4, translation: Cartesian3, result: Matrix4): Matrix4;
    /**
     * Computes a new matrix that replaces the scale with the provided scale.
     * This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param scale - The scale that replaces the scale of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setScale(matrix: Matrix4, scale: Cartesian3, result: Matrix4): Matrix4;
    /**
     * Computes a new matrix that replaces the scale with the provided uniform scale.
     * This assumes the matrix is an affine transformation.
     * @param matrix - The matrix to use.
     * @param scale - The uniform scale that replaces the scale of the provided matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setUniformScale(matrix: Matrix4, scale: number, result: Matrix4): Matrix4;
    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter
     */
    static getScale(matrix: Matrix4, result: Cartesian3): Cartesian3;
    /**
     * Computes the maximum scale assuming the matrix is an affine transformation.
     * The maximum scale is the maximum length of the column vectors in the upper-left
     * 3x3 matrix.
     * @param matrix - The matrix.
     * @returns The maximum scale.
     */
    static getMaximumScale(matrix: Matrix4): number;
    /**
     * Sets the rotation assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param rotation - The rotation matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static setRotation(matrix: Matrix4, rotation: Matrix3, result: Matrix4): Matrix4;
    /**
     * Extracts the rotation matrix assuming the matrix is an affine transformation.
     * @param matrix - The matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getRotation(matrix: Matrix4, result: Matrix3): Matrix3;
    /**
     * Computes the product of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiply(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes the sum of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes the difference of two matrices.
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes the product of two matrices assuming the matrices are affine transformation matrices,
     * where the upper left 3x3 elements are any matrix, and
     * the upper three elements in the fourth column are the translation.
     * The bottom row is assumed to be [0, 0, 0, 1].
     * The matrix is not verified to be in the proper form.
     * This method is faster than computing the product for general 4x4
     * matrices using {@link Matrix4.multiply}.
     * @example
     * const m1 = new Cesium.Matrix4(1.0, 6.0, 7.0, 0.0, 2.0, 5.0, 8.0, 0.0, 3.0, 4.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0);
     * const m2 = Cesium.Transforms.eastNorthUpToFixedFrame(new Cesium.Cartesian3(1.0, 1.0, 1.0));
     * const m3 = Cesium.Matrix4.multiplyTransformation(m1, m2, new Cesium.Matrix4());
     * @param left - The first matrix.
     * @param right - The second matrix.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyTransformation(left: Matrix4, right: Matrix4, result: Matrix4): Matrix4;
    /**
     * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by a 3x3 rotation matrix.  This is an optimization
     * for <code>Matrix4.multiply(m, Matrix4.fromRotationTranslation(rotation), m);</code> with less allocations and arithmetic operations.
     * @example
     * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromRotationTranslation(rotation), m);
     * Cesium.Matrix4.multiplyByMatrix3(m, rotation, m);
     * @param matrix - The matrix on the left-hand side.
     * @param rotation - The 3x3 rotation matrix on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByMatrix3(matrix: Matrix4, rotation: Matrix3, result: Matrix4): Matrix4;
    /**
     * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by an implicit translation matrix defined by a {@link Cartesian3}.  This is an optimization
     * for <code>Matrix4.multiply(m, Matrix4.fromTranslation(position), m);</code> with less allocations and arithmetic operations.
     * @example
     * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromTranslation(position), m);
     * Cesium.Matrix4.multiplyByTranslation(m, position, m);
     * @param matrix - The matrix on the left-hand side.
     * @param translation - The translation on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByTranslation(matrix: Matrix4, translation: Cartesian3, result: Matrix4): Matrix4;
    /**
     * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by an implicit non-uniform scale matrix. This is an optimization
     * for <code>Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);</code>, where
     * <code>m</code> must be an affine matrix.
     * This function performs fewer allocations and arithmetic operations.
     * @example
     * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromScale(scale), m);
     * Cesium.Matrix4.multiplyByScale(m, scale, m);
     * @param matrix - The affine matrix on the left-hand side.
     * @param scale - The non-uniform scale on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScale(matrix: Matrix4, scale: Cartesian3, result: Matrix4): Matrix4;
    /**
     * Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.
     * @example
     * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromUniformScale(scale), m);
     * Cesium.Matrix4.multiplyByUniformScale(m, scale, m);
     * @param matrix - The matrix on the left-hand side.
     * @param scale - The uniform scale on the right-hand side.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByUniformScale(matrix: Matrix4, scale: number, result: Matrix4): Matrix4;
    /**
     * Computes the product of a matrix and a column vector.
     * @param matrix - The matrix.
     * @param cartesian - The vector.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByVector(matrix: Matrix4, cartesian: Cartesian4, result: Cartesian4): Cartesian4;
    /**
     * Computes the product of a matrix and a {@link Cartesian3}.  This is equivalent to calling {@link Matrix4.multiplyByVector}
     * with a {@link Cartesian4} with a <code>w</code> component of zero.
     * @example
     * const p = new Cesium.Cartesian3(1.0, 2.0, 3.0);
     * const result = Cesium.Matrix4.multiplyByPointAsVector(matrix, p, new Cesium.Cartesian3());
     * // A shortcut for
     * //   Cartesian3 p = ...
     * //   Cesium.Matrix4.multiplyByVector(matrix, new Cesium.Cartesian4(p.x, p.y, p.z, 0.0), result);
     * @param matrix - The matrix.
     * @param cartesian - The point.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByPointAsVector(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the product of a matrix and a {@link Cartesian3}. This is equivalent to calling {@link Matrix4.multiplyByVector}
     * with a {@link Cartesian4} with a <code>w</code> component of 1, but returns a {@link Cartesian3} instead of a {@link Cartesian4}.
     * @example
     * const p = new Cesium.Cartesian3(1.0, 2.0, 3.0);
     * const result = Cesium.Matrix4.multiplyByPoint(matrix, p, new Cesium.Cartesian3());
     * @param matrix - The matrix.
     * @param cartesian - The point.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByPoint(matrix: Matrix4, cartesian: Cartesian3, result: Cartesian3): Cartesian3;
    /**
     * Computes the product of a matrix and a scalar.
     * @example
     * //create a Matrix4 instance which is a scaled version of the supplied Matrix4
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * const a = Cesium.Matrix4.multiplyByScalar(m, -2, new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [-20.0, -22.0, -24.0, -26.0]
     * //     [-28.0, -30.0, -32.0, -34.0]
     * //     [-36.0, -38.0, -40.0, -42.0]
     * //     [-44.0, -46.0, -48.0, -50.0]
     * @param matrix - The matrix.
     * @param scalar - The number to multiply by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(matrix: Matrix4, scalar: number, result: Matrix4): Matrix4;
    /**
     * Computes a negated copy of the provided matrix.
     * @example
     * //create a new Matrix4 instance which is a negation of a Matrix4
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * const a = Cesium.Matrix4.negate(m, new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [-10.0, -11.0, -12.0, -13.0]
     * //     [-14.0, -15.0, -16.0, -17.0]
     * //     [-18.0, -19.0, -20.0, -21.0]
     * //     [-22.0, -23.0, -24.0, -25.0]
     * @param matrix - The matrix to negate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(matrix: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes the transpose of the provided matrix.
     * @example
     * //returns transpose of a Matrix4
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * const a = Cesium.Matrix4.transpose(m, new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     * @param matrix - The matrix to transpose.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static transpose(matrix: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     * @param matrix - The matrix with signed elements.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static abs(matrix: Matrix4, result: Matrix4): Matrix4;
    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @example
     * //compares two Matrix4 instances
     *
     * // a = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * // b = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * if(Cesium.Matrix4.equals(a,b)) {
     *      console.log("Both matrices are equal");
     * } else {
     *      console.log("They are not equal");
     * }
     *
     * //Prints "Both matrices are equal" on the console
     * @param [left] - The first matrix.
     * @param [right] - The second matrix.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Matrix4, right?: Matrix4): boolean;
    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @example
     * //compares two Matrix4 instances
     *
     * // a = [10.5, 14.5, 18.5, 22.5]
     * //     [11.5, 15.5, 19.5, 23.5]
     * //     [12.5, 16.5, 20.5, 24.5]
     * //     [13.5, 17.5, 21.5, 25.5]
     *
     * // b = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * if(Cesium.Matrix4.equalsEpsilon(a,b,0.1)){
     *      console.log("Difference between both the matrices is less than 0.1");
     * } else {
     *      console.log("Difference between both the matrices is not less than 0.1");
     * }
     *
     * //Prints "Difference between both the matrices is not less than 0.1" on the console
     * @param [left] - The first matrix.
     * @param [right] - The second matrix.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Matrix4, right?: Matrix4, epsilon?: number): boolean;
    /**
     * Gets the translation portion of the provided matrix, assuming the matrix is an affine transformation matrix.
     * @param matrix - The matrix to use.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getTranslation(matrix: Matrix4, result: Cartesian3): Cartesian3;
    /**
     * Gets the upper left 3x3 matrix of the provided matrix.
     * @example
     * // returns a Matrix3 instance from a Matrix4 instance
     *
     * // m = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * const b = new Cesium.Matrix3();
     * Cesium.Matrix4.getMatrix3(m,b);
     *
     * // b = [10.0, 14.0, 18.0]
     * //     [11.0, 15.0, 19.0]
     * //     [12.0, 16.0, 20.0]
     * @param matrix - The matrix to use.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static getMatrix3(matrix: Matrix4, result: Matrix3): Matrix3;
    /**
     * Computes the inverse of the provided matrix using Cramers Rule.
     * If the determinant is zero, the matrix can not be inverted, and an exception is thrown.
     * If the matrix is a proper rigid transformation, it is more efficient
     * to invert it with {@link Matrix4.inverseTransformation}.
     * @param matrix - The matrix to invert.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static inverse(matrix: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes the inverse of the provided matrix assuming it is a proper rigid matrix,
     * where the upper left 3x3 elements are a rotation matrix,
     * and the upper three elements in the fourth column are the translation.
     * The bottom row is assumed to be [0, 0, 0, 1].
     * The matrix is not verified to be in the proper form.
     * This method is faster than computing the inverse for a general 4x4
     * matrix using {@link Matrix4.inverse}.
     * @param matrix - The matrix to invert.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static inverseTransformation(matrix: Matrix4, result: Matrix4): Matrix4;
    /**
     * Computes the inverse transpose of a matrix.
     * @param matrix - The matrix to transpose and invert.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static inverseTranspose(matrix: Matrix4, result: Matrix4): Matrix4;
    /**
     * Gets the number of items in the collection.
     */
    length: number;
    /**
     * Duplicates the provided Matrix4 instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if one was not provided.
     */
    clone(result?: Matrix4): Matrix4;
    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side matrix.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: Matrix4): boolean;
    /**
     * Compares provided matrix and array, starting from a given array offset.
     * @param matrix - The matrix to compare.
     * @param array - The packed array.
     * @param offset - The offset into the array at which the matrix starts.
     * @returns <code>true</code> if the matrix matches the packed array values at the offset; otherwise, <code>false</code>.
     */
    static equalsArray(matrix: Matrix4, array: number[], offset: number): boolean;
    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side matrix.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Matrix4, epsilon?: number): boolean;
    /**
     * Computes a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1, column2, column3)'.
     * @returns A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2, column3)'.
     */
    toString(): string;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Creates a Matrix4 from 16 consecutive elements in an array.
     * @example
     * // Create the Matrix4:
     * // [1.0, 2.0, 3.0, 4.0]
     * // [1.0, 2.0, 3.0, 4.0]
     * // [1.0, 2.0, 3.0, 4.0]
     * // [1.0, 2.0, 3.0, 4.0]
     *
     * const v = [1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0];
     * const m = Cesium.Matrix4.fromArray(v);
     *
     * // Create same Matrix4 with using an offset into an array
     * const v2 = [0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0];
     * const m2 = Cesium.Matrix4.fromArray(v2, 2);
     * @param array - The array whose 16 consecutive elements correspond to the positions of the matrix.  Assumes column-major order.
     * @param [startingIndex = 0] - The offset into the array of the first element, which corresponds to first column first row position in the matrix.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Matrix4 instance if one was not provided.
     */
    static fromArray(array: number[], startingIndex?: number, result?: Matrix4): Matrix4;
    /**
     * An immutable Matrix4 instance initialized to the identity matrix.
     */
    static readonly IDENTITY: Matrix4;
    /**
     * An immutable Matrix4 instance initialized to the zero matrix.
     */
    static readonly ZERO: Matrix4;
    /**
     * The index into Matrix4 for column 0, row 0.
     */
    static readonly COLUMN0ROW0: number;
    /**
     * The index into Matrix4 for column 0, row 1.
     */
    static readonly COLUMN0ROW1: number;
    /**
     * The index into Matrix4 for column 0, row 2.
     */
    static readonly COLUMN0ROW2: number;
    /**
     * The index into Matrix4 for column 0, row 3.
     */
    static readonly COLUMN0ROW3: number;
    /**
     * The index into Matrix4 for column 1, row 0.
     */
    static readonly COLUMN1ROW0: number;
    /**
     * The index into Matrix4 for column 1, row 1.
     */
    static readonly COLUMN1ROW1: number;
    /**
     * The index into Matrix4 for column 1, row 2.
     */
    static readonly COLUMN1ROW2: number;
    /**
     * The index into Matrix4 for column 1, row 3.
     */
    static readonly COLUMN1ROW3: number;
    /**
     * The index into Matrix4 for column 2, row 0.
     */
    static readonly COLUMN2ROW0: number;
    /**
     * The index into Matrix4 for column 2, row 1.
     */
    static readonly COLUMN2ROW1: number;
    /**
     * The index into Matrix4 for column 2, row 2.
     */
    static readonly COLUMN2ROW2: number;
    /**
     * The index into Matrix4 for column 2, row 3.
     */
    static readonly COLUMN2ROW3: number;
    /**
     * The index into Matrix4 for column 3, row 0.
     */
    static readonly COLUMN3ROW0: number;
    /**
     * The index into Matrix4 for column 3, row 1.
     */
    static readonly COLUMN3ROW1: number;
    /**
     * The index into Matrix4 for column 3, row 2.
     */
    static readonly COLUMN3ROW2: number;
    /**
     * The index into Matrix4 for column 3, row 3.
     */
    static readonly COLUMN3ROW3: number;
}

/**
 * A spline that linearly interpolates over an array of weight values used by morph targets.
 * @example
 * const times = [ 0.0, 1.5, 3.0, 4.5, 6.0 ];
 * const weights = [0.0, 1.0, 0.25, 0.75, 0.5, 0.5, 0.75, 0.25, 1.0, 0.0]; //Two targets
 * const spline = new Cesium.WeightSpline({
 *     times : times,
 *     weights : weights
 * });
 *
 * const p0 = spline.evaluate(times[0]);
 * @param options - Object with the following properties:
 * @param options.times - An array of strictly increasing, unit-less, floating-point times at each point.
 *                The values are in no way connected to the clock time. They are the parameterization for the curve.
 * @param options.weights - The array of floating-point control weights given. The weights are ordered such
 *                that all weights for the targets are given in chronological order and order in which they appear in
 *                the glTF from which the morph targets come. This means for 2 targets, weights = [w(0,0), w(0,1), w(1,0), w(1,1) ...]
 *                where i and j in w(i,j) are the time indices and target indices, respectively.
 */
export class MorphWeightSpline {
    constructor(options: {
        times: number[];
        weights: number[];
    });
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: number[]): number[];
}

/**
 * Represents a scalar value's lower and upper bound at a near distance and far distance in eye space.
 * @param [near = 0.0] - The lower bound of the camera range.
 * @param [nearValue = 0.0] - The value at the lower bound of the camera range.
 * @param [far = 1.0] - The upper bound of the camera range.
 * @param [farValue = 0.0] - The value at the upper bound of the camera range.
 */
export class NearFarScalar {
    constructor(near?: number, nearValue?: number, far?: number, farValue?: number);
    /**
     * The lower bound of the camera range.
     */
    near: number;
    /**
     * The value at the lower bound of the camera range.
     */
    nearValue: number;
    /**
     * The upper bound of the camera range.
     */
    far: number;
    /**
     * The value at the upper bound of the camera range.
     */
    farValue: number;
    /**
     * Duplicates a NearFarScalar instance.
     * @param nearFarScalar - The NearFarScalar to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new NearFarScalar instance if one was not provided. (Returns undefined if nearFarScalar is undefined)
     */
    static clone(nearFarScalar: NearFarScalar, result?: NearFarScalar): NearFarScalar;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: NearFarScalar, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new NearFarScalar instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: NearFarScalar): NearFarScalar;
    /**
     * Compares the provided NearFarScalar and returns <code>true</code> if they are equal,
     * <code>false</code> otherwise.
     * @param [left] - The first NearFarScalar.
     * @param [right] - The second NearFarScalar.
     * @returns <code>true</code> if left and right are equal; otherwise <code>false</code>.
     */
    static equals(left?: NearFarScalar, right?: NearFarScalar): boolean;
    /**
     * Duplicates this instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new NearFarScalar instance if one was not provided.
     */
    clone(result?: NearFarScalar): NearFarScalar;
    /**
     * Compares this instance to the provided NearFarScalar and returns <code>true</code> if they are equal,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side NearFarScalar.
     * @returns <code>true</code> if left and right are equal; otherwise <code>false</code>.
     */
    equals(right?: NearFarScalar): boolean;
}

/**
 * Creates an Occluder derived from an object's position and radius, as well as the camera position.
 * The occluder can be used to determine whether or not other objects are visible or hidden behind the
 * visible horizon defined by the occluder and camera position.
 * @example
 * // Construct an occluder one unit away from the origin with a radius of one.
 * const cameraPosition = Cesium.Cartesian3.ZERO;
 * const occluderBoundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -1), 1);
 * const occluder = new Cesium.Occluder(occluderBoundingSphere, cameraPosition);
 * @param occluderBoundingSphere - The bounding sphere surrounding the occluder.
 * @param cameraPosition - The coordinate of the viewer/camera.
 */
export class Occluder {
    constructor(occluderBoundingSphere: BoundingSphere, cameraPosition: Cartesian3);
    /**
     * The position of the occluder.
     */
    position: Cartesian3;
    /**
     * The radius of the occluder.
     */
    radius: number;
    /**
     * The position of the camera.
     */
    cameraPosition: Cartesian3;
    /**
     * Creates an occluder from a bounding sphere and the camera position.
     * @param occluderBoundingSphere - The bounding sphere surrounding the occluder.
     * @param cameraPosition - The coordinate of the viewer/camera.
     * @param [result] - The object onto which to store the result.
     * @returns The occluder derived from an object's position and radius, as well as the camera position.
     */
    static fromBoundingSphere(occluderBoundingSphere: BoundingSphere, cameraPosition: Cartesian3, result?: Occluder): Occluder;
    /**
     * Determines whether or not a point, the <code>occludee</code>, is hidden from view by the occluder.
     * @example
     * const cameraPosition = new Cesium.Cartesian3(0, 0, 0);
     * const littleSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -1), 0.25);
     * const occluder = new Cesium.Occluder(littleSphere, cameraPosition);
     * const point = new Cesium.Cartesian3(0, 0, -3);
     * occluder.isPointVisible(point); //returns true
     * @param occludee - The point surrounding the occludee object.
     * @returns <code>true</code> if the occludee is visible; otherwise <code>false</code>.
     */
    isPointVisible(occludee: Cartesian3): boolean;
    /**
     * Determines whether or not a sphere, the <code>occludee</code>, is hidden from view by the occluder.
     * @example
     * const cameraPosition = new Cesium.Cartesian3(0, 0, 0);
     * const littleSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -1), 0.25);
     * const occluder = new Cesium.Occluder(littleSphere, cameraPosition);
     * const bigSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -3), 1);
     * occluder.isBoundingSphereVisible(bigSphere); //returns true
     * @param occludee - The bounding sphere surrounding the occludee object.
     * @returns <code>true</code> if the occludee is visible; otherwise <code>false</code>.
     */
    isBoundingSphereVisible(occludee: BoundingSphere): boolean;
    /**
     * Determine to what extent an occludee is visible (not visible, partially visible,  or fully visible).
     * @example
     * const sphere1 = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -1.5), 0.5);
     * const sphere2 = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -2.5), 0.5);
     * const cameraPosition = new Cesium.Cartesian3(0, 0, 0);
     * const occluder = new Cesium.Occluder(sphere1, cameraPosition);
     * occluder.computeVisibility(sphere2); //returns Visibility.NONE
     * @param occludeeBS - The bounding sphere of the occludee.
     * @returns Visibility.NONE if the occludee is not visible,
     *                       Visibility.PARTIAL if the occludee is partially visible, or
     *                       Visibility.FULL if the occludee is fully visible.
     */
    computeVisibility(occludeeBS: BoundingSphere): Visibility;
    /**
     * Computes a point that can be used as the occludee position to the visibility functions.
     * Use a radius of zero for the occludee radius.  Typically, a user computes a bounding sphere around
     * an object that is used for visibility; however it is also possible to compute a point that if
     * seen/not seen would also indicate if an object is visible/not visible.  This function is better
     * called for objects that do not move relative to the occluder and is large, such as a chunk of
     * terrain.  You are better off not calling this and using the object's bounding sphere for objects
     * such as a satellite or ground vehicle.
     * @example
     * const cameraPosition = new Cesium.Cartesian3(0, 0, 0);
     * const occluderBoundingSphere = new Cesium.BoundingSphere(new Cesium.Cartesian3(0, 0, -8), 2);
     * const occluder = new Cesium.Occluder(occluderBoundingSphere, cameraPosition);
     * const positions = [new Cesium.Cartesian3(-0.25, 0, -5.3), new Cesium.Cartesian3(0.25, 0, -5.3)];
     * const tileOccluderSphere = Cesium.BoundingSphere.fromPoints(positions);
     * const occludeePosition = tileOccluderSphere.center;
     * const occludeePt = Cesium.Occluder.computeOccludeePoint(occluderBoundingSphere, occludeePosition, positions);
     * @param occluderBoundingSphere - The bounding sphere surrounding the occluder.
     * @param occludeePosition - The point where the occludee (bounding sphere of radius 0) is located.
     * @param positions - List of altitude points on the horizon near the surface of the occluder.
     * @returns An object containing two attributes: <code>occludeePoint</code> and <code>valid</code>
     * which is a boolean value.
     */
    static computeOccludeePoint(occluderBoundingSphere: BoundingSphere, occludeePosition: Cartesian3, positions: Cartesian3[]): any;
    /**
     * Computes a point that can be used as the occludee position to the visibility functions from a rectangle.
     * @param rectangle - The rectangle used to create a bounding sphere.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid used to determine positions of the rectangle.
     * @returns An object containing two attributes: <code>occludeePoint</code> and <code>valid</code>
     * which is a boolean value.
     */
    static computeOccludeePointFromRectangle(rectangle: Rectangle, ellipsoid?: Ellipsoid): any;
}

/**
 * Creates an instance of an OrientedBoundingBox.
 * An OrientedBoundingBox of some object is a closed and convex rectangular cuboid. It can provide a tighter bounding volume than {@link BoundingSphere} or {@link AxisAlignedBoundingBox} in many cases.
 * @example
 * // Create an OrientedBoundingBox using a transformation matrix, a position where the box will be translated, and a scale.
 * const center = new Cesium.Cartesian3(1.0, 0.0, 0.0);
 * const halfAxes = Cesium.Matrix3.fromScale(new Cesium.Cartesian3(1.0, 3.0, 2.0), new Cesium.Matrix3());
 *
 * const obb = new Cesium.OrientedBoundingBox(center, halfAxes);
 * @param [center = Cartesian3.ZERO] - The center of the box.
 * @param [halfAxes = Matrix3.ZERO] - The three orthogonal half-axes of the bounding box.
 *                                          Equivalently, the transformation matrix, to rotate and scale a 2x2x2
 *                                          cube centered at the origin.
 */
export class OrientedBoundingBox {
    constructor(center?: Cartesian3, halfAxes?: Matrix3);
    /**
     * The center of the box.
     */
    center: Cartesian3;
    /**
     * The three orthogonal half-axes of the bounding box. Equivalently, the
     * transformation matrix, to rotate and scale a 2x2x2 cube centered at the
     * origin.
     */
    halfAxes: Matrix3;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: OrientedBoundingBox, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new OrientedBoundingBox instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: OrientedBoundingBox): OrientedBoundingBox;
    /**
     * Computes an instance of an OrientedBoundingBox of the given positions.
     * This is an implementation of Stefan Gottschalk's Collision Queries using Oriented Bounding Boxes solution (PHD thesis).
     * Reference: http://gamma.cs.unc.edu/users/gottschalk/main.pdf
     * @example
     * // Compute an object oriented bounding box enclosing two points.
     * const box = Cesium.OrientedBoundingBox.fromPoints([new Cesium.Cartesian3(2, 0, 0), new Cesium.Cartesian3(-2, 0, 0)]);
     * @param [positions] - List of {@link Cartesian3} points that the bounding box will enclose.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrientedBoundingBox instance if one was not provided.
     */
    static fromPoints(positions?: Cartesian3[], result?: OrientedBoundingBox): OrientedBoundingBox;
    /**
     * Computes an OrientedBoundingBox that bounds a {@link Rectangle} on the surface of an {@link Ellipsoid}.
     * There are no guarantees about the orientation of the bounding box.
     * @param rectangle - The cartographic rectangle on the surface of the ellipsoid.
     * @param [minimumHeight = 0.0] - The minimum height (elevation) within the tile.
     * @param [maximumHeight = 0.0] - The maximum height (elevation) within the tile.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the rectangle is defined.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrientedBoundingBox instance if none was provided.
     */
    static fromRectangle(rectangle: Rectangle, minimumHeight?: number, maximumHeight?: number, ellipsoid?: Ellipsoid, result?: OrientedBoundingBox): OrientedBoundingBox;
    /**
     * Computes an OrientedBoundingBox that bounds an affine transformation.
     * @param transformation - The affine transformation.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrientedBoundingBox instance if none was provided.
     */
    static fromTransformation(transformation: Matrix4, result?: OrientedBoundingBox): OrientedBoundingBox;
    /**
     * Duplicates a OrientedBoundingBox instance.
     * @param box - The bounding box to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrientedBoundingBox instance if none was provided. (Returns undefined if box is undefined)
     */
    static clone(box: OrientedBoundingBox, result?: OrientedBoundingBox): OrientedBoundingBox;
    /**
     * Determines which side of a plane the oriented bounding box is located.
     * @param box - The oriented bounding box to test.
     * @param plane - The plane to test against.
     * @returns {@link Intersect.INSIDE} if the entire box is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire box is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the box
     *                      intersects the plane.
     */
    static intersectPlane(box: OrientedBoundingBox, plane: Plane): Intersect;
    /**
     * Computes the estimated distance squared from the closest point on a bounding box to a point.
     * @example
     * // Sort bounding boxes from back to front
     * boxes.sort(function(a, b) {
     *     return Cesium.OrientedBoundingBox.distanceSquaredTo(b, camera.positionWC) - Cesium.OrientedBoundingBox.distanceSquaredTo(a, camera.positionWC);
     * });
     * @param box - The box.
     * @param cartesian - The point
     * @returns The distance squared from the oriented bounding box to the point. Returns 0 if the point is inside the box.
     */
    static distanceSquaredTo(box: OrientedBoundingBox, cartesian: Cartesian3): number;
    /**
     * The distances calculated by the vector from the center of the bounding box to position projected onto direction.
     * <br>
     * If you imagine the infinite number of planes with normal direction, this computes the smallest distance to the
     * closest and farthest planes from position that intersect the bounding box.
     * @param box - The bounding box to calculate the distance to.
     * @param position - The position to calculate the distance from.
     * @param direction - The direction from position.
     * @param [result] - A Interval to store the nearest and farthest distances.
     * @returns The nearest and farthest distances on the bounding box from position in direction.
     */
    static computePlaneDistances(box: OrientedBoundingBox, position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;
    /**
     * Computes the eight corners of an oriented bounding box. The corners are ordered by (-X, -Y, -Z), (-X, -Y, +Z), (-X, +Y, -Z), (-X, +Y, +Z), (+X, -Y, -Z), (+X, -Y, +Z), (+X, +Y, -Z), (+X, +Y, +Z).
     * @param box - The oriented bounding box.
     * @param [result] - An array of eight {@link Cartesian3} instances onto which to store the corners.
     * @returns The modified result parameter or a new array if none was provided.
     */
    static computeCorners(box: OrientedBoundingBox, result?: Cartesian3[]): Cartesian3[];
    /**
     * Computes a transformation matrix from an oriented bounding box.
     * @param box - The oriented bounding box.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new {@link Matrix4} instance if none was provided.
     */
    static computeTransformation(box: OrientedBoundingBox, result: Matrix4): Matrix4;
    /**
     * Determines whether or not a bounding box is hidden from view by the occluder.
     * @param box - The bounding box surrounding the occludee object.
     * @param occluder - The occluder.
     * @returns <code>true</code> if the box is not visible; otherwise <code>false</code>.
     */
    static isOccluded(box: OrientedBoundingBox, occluder: Occluder): boolean;
    /**
     * Determines which side of a plane the oriented bounding box is located.
     * @param plane - The plane to test against.
     * @returns {@link Intersect.INSIDE} if the entire box is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire box is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the box
     *                      intersects the plane.
     */
    intersectPlane(plane: Plane): Intersect;
    /**
     * Computes the estimated distance squared from the closest point on a bounding box to a point.
     * @example
     * // Sort bounding boxes from back to front
     * boxes.sort(function(a, b) {
     *     return b.distanceSquaredTo(camera.positionWC) - a.distanceSquaredTo(camera.positionWC);
     * });
     * @param cartesian - The point
     * @returns The estimated distance squared from the bounding sphere to the point.
     */
    distanceSquaredTo(cartesian: Cartesian3): number;
    /**
     * The distances calculated by the vector from the center of the bounding box to position projected onto direction.
     * <br>
     * If you imagine the infinite number of planes with normal direction, this computes the smallest distance to the
     * closest and farthest planes from position that intersect the bounding box.
     * @param position - The position to calculate the distance from.
     * @param direction - The direction from position.
     * @param [result] - A Interval to store the nearest and farthest distances.
     * @returns The nearest and farthest distances on the bounding box from position in direction.
     */
    computePlaneDistances(position: Cartesian3, direction: Cartesian3, result?: Interval): Interval;
    /**
     * Computes the eight corners of an oriented bounding box. The corners are ordered by (-X, -Y, -Z), (-X, -Y, +Z), (-X, +Y, -Z), (-X, +Y, +Z), (+X, -Y, -Z), (+X, -Y, +Z), (+X, +Y, -Z), (+X, +Y, +Z).
     * @param [result] - An array of eight {@link Cartesian3} instances onto which to store the corners.
     * @returns The modified result parameter or a new array if none was provided.
     */
    computeCorners(result?: Cartesian3[]): Cartesian3[];
    /**
     * Computes a transformation matrix from an oriented bounding box.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new {@link Matrix4} instance if none was provided.
     */
    computeTransformation(result: Matrix4): Matrix4;
    /**
     * Determines whether or not a bounding box is hidden from view by the occluder.
     * @param occluder - The occluder.
     * @returns <code>true</code> if the sphere is not visible; otherwise <code>false</code>.
     */
    isOccluded(occluder: Occluder): boolean;
    /**
     * Compares the provided OrientedBoundingBox componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first OrientedBoundingBox.
     * @param [right] - The second OrientedBoundingBox.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: OrientedBoundingBox, right?: OrientedBoundingBox): boolean;
    /**
     * Duplicates this OrientedBoundingBox instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrientedBoundingBox instance if one was not provided.
     */
    clone(result?: OrientedBoundingBox): OrientedBoundingBox;
    /**
     * Compares this OrientedBoundingBox against the provided OrientedBoundingBox componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side OrientedBoundingBox.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: OrientedBoundingBox): boolean;
}

/**
 * The viewing frustum is defined by 6 planes.
 * Each plane is represented by a {@link Cartesian4} object, where the x, y, and z components
 * define the unit vector normal to the plane, and the w component is the distance of the
 * plane from the origin/camera position.
 * @example
 * const maxRadii = ellipsoid.maximumRadius;
 *
 * const frustum = new Cesium.OrthographicFrustum();
 * frustum.near = 0.01 * maxRadii;
 * frustum.far = 50.0 * maxRadii;
 * @param [options] - An object with the following properties:
 * @param [options.width] - The width of the frustum in meters.
 * @param [options.aspectRatio] - The aspect ratio of the frustum's width to it's height.
 * @param [options.near = 1.0] - The distance of the near plane.
 * @param [options.far = 500000000.0] - The distance of the far plane.
 */
export class OrthographicFrustum {
    constructor(options?: {
        width?: number;
        aspectRatio?: number;
        near?: number;
        far?: number;
    });
    /**
     * The horizontal width of the frustum in meters.
     */
    width: number | undefined;
    /**
     * The aspect ratio of the frustum's width to it's height.
     */
    aspectRatio: number | undefined;
    /**
     * The distance of the near plane.
     */
    near: number;
    /**
     * The distance of the far plane.
     */
    far: number;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: OrthographicFrustum, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new OrthographicFrustum instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: OrthographicFrustum): OrthographicFrustum;
    /**
     * Gets the orthographic projection matrix computed from the view frustum.
     */
    readonly projectionMatrix: Matrix4;
    /**
     * Creates a culling volume for this frustum.
     * @example
     * // Check if a bounding volume intersects the frustum.
     * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
     * const intersect = cullingVolume.computeVisibility(boundingVolume);
     * @param position - The eye position.
     * @param direction - The view direction.
     * @param up - The up direction.
     * @returns A culling volume at the given position and orientation.
     */
    computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;
    /**
     * Returns the pixel's width and height in meters.
     * @example
     * // Example 1
     * // Get the width and height of a pixel.
     * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 0.0, scene.pixelRatio, new Cesium.Cartesian2());
     * @param drawingBufferWidth - The width of the drawing buffer.
     * @param drawingBufferHeight - The height of the drawing buffer.
     * @param distance - The distance to the near plane in meters.
     * @param pixelRatio - The scaling factor from pixel space to coordinate space.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of {@link Cartesian2} with the pixel's width and height in the x and y properties, respectively.
     */
    getPixelDimensions(drawingBufferWidth: number, drawingBufferHeight: number, distance: number, pixelRatio: number, result: Cartesian2): Cartesian2;
    /**
     * Returns a duplicate of a OrthographicFrustum instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrthographicFrustum instance if one was not provided.
     */
    clone(result?: OrthographicFrustum): OrthographicFrustum;
    /**
     * Compares the provided OrthographicFrustum componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [other] - The right hand side OrthographicFrustum.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(other?: OrthographicFrustum): boolean;
    /**
     * Compares the provided OrthographicFrustum componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param other - The right hand side OrthographicFrustum.
     * @param relativeEpsilon - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if this and other are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(other: OrthographicFrustum, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
}

/**
 * The viewing frustum is defined by 6 planes.
 * Each plane is represented by a {@link Cartesian4} object, where the x, y, and z components
 * define the unit vector normal to the plane, and the w component is the distance of the
 * plane from the origin/camera position.
 * @example
 * const maxRadii = ellipsoid.maximumRadius;
 *
 * const frustum = new Cesium.OrthographicOffCenterFrustum();
 * frustum.right = maxRadii * Cesium.Math.PI;
 * frustum.left = -c.frustum.right;
 * frustum.top = c.frustum.right * (canvas.clientHeight / canvas.clientWidth);
 * frustum.bottom = -c.frustum.top;
 * frustum.near = 0.01 * maxRadii;
 * frustum.far = 50.0 * maxRadii;
 * @param [options] - An object with the following properties:
 * @param [options.left] - The left clipping plane distance.
 * @param [options.right] - The right clipping plane distance.
 * @param [options.top] - The top clipping plane distance.
 * @param [options.bottom] - The bottom clipping plane distance.
 * @param [options.near = 1.0] - The near clipping plane distance.
 * @param [options.far = 500000000.0] - The far clipping plane distance.
 */
export class OrthographicOffCenterFrustum {
    constructor(options?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
        near?: number;
        far?: number;
    });
    /**
     * The left clipping plane.
     */
    left: number | undefined;
    /**
     * The right clipping plane.
     */
    right: number | undefined;
    /**
     * The top clipping plane.
     */
    top: number | undefined;
    /**
     * The bottom clipping plane.
     */
    bottom: number | undefined;
    /**
     * The distance of the near plane.
     */
    near: number;
    /**
     * The distance of the far plane.
     */
    far: number;
    /**
     * Gets the orthographic projection matrix computed from the view frustum.
     */
    readonly projectionMatrix: Matrix4;
    /**
     * Creates a culling volume for this frustum.
     * @example
     * // Check if a bounding volume intersects the frustum.
     * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
     * const intersect = cullingVolume.computeVisibility(boundingVolume);
     * @param position - The eye position.
     * @param direction - The view direction.
     * @param up - The up direction.
     * @returns A culling volume at the given position and orientation.
     */
    computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;
    /**
     * Returns the pixel's width and height in meters.
     * @example
     * // Example 1
     * // Get the width and height of a pixel.
     * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 0.0, scene.pixelRatio, new Cesium.Cartesian2());
     * @param drawingBufferWidth - The width of the drawing buffer.
     * @param drawingBufferHeight - The height of the drawing buffer.
     * @param distance - The distance to the near plane in meters.
     * @param pixelRatio - The scaling factor from pixel space to coordinate space.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of {@link Cartesian2} with the pixel's width and height in the x and y properties, respectively.
     */
    getPixelDimensions(drawingBufferWidth: number, drawingBufferHeight: number, distance: number, pixelRatio: number, result: Cartesian2): Cartesian2;
    /**
     * Returns a duplicate of a OrthographicOffCenterFrustum instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new OrthographicOffCenterFrustum instance if one was not provided.
     */
    clone(result?: OrthographicOffCenterFrustum): OrthographicOffCenterFrustum;
    /**
     * Compares the provided OrthographicOffCenterFrustum componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [other] - The right hand side OrthographicOffCenterFrustum.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(other?: OrthographicOffCenterFrustum): boolean;
    /**
     * Compares the provided OrthographicOffCenterFrustum componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param other - The right hand side OrthographicOffCenterFrustum.
     * @param relativeEpsilon - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if this and other are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(other: OrthographicOffCenterFrustum, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
}

export namespace Packable {
    /**
     * The number of elements used to pack the object into an array.
     */
    var packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     */
    function pack(value: any, array: number[], startingIndex?: number): void;
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Object instance if one was not provided.
     */
    function unpack(array: number[], startingIndex?: number, result?: any): any;
}

/**
 * Static interface for types which can store their values as packed
 * elements in an array.  These methods and properties are expected to be
 * defined on a constructor function.
 */
export interface Packable {
}

/**
 * Static interface for {@link Packable} types which are interpolated in a
 * different representation than their packed value.  These methods and
 * properties are expected to be defined on a constructor function.
 */
export namespace PackableForInterpolation {
    /**
     * The number of elements used to store the object into an array in its interpolatable form.
     */
    var packedInterpolationLength: number;
    /**
     * Converts a packed array into a form suitable for interpolation.
     * @param packedArray - The packed array.
     * @param [startingIndex = 0] - The index of the first element to be converted.
     * @param [lastIndex = packedArray.length] - The index of the last element to be converted.
     * @param [result] - The object into which to store the result.
     */
    function convertPackedArrayForInterpolation(packedArray: number[], startingIndex?: number, lastIndex?: number, result?: number[]): void;
    /**
     * Retrieves an instance from a packed array converted with {@link PackableForInterpolation.convertPackedArrayForInterpolation}.
     * @param array - The array previously packed for interpolation.
     * @param sourceArray - The original packed array.
     * @param [startingIndex = 0] - The startingIndex used to convert the array.
     * @param [lastIndex = packedArray.length] - The lastIndex used to convert the array.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Object instance if one was not provided.
     */
    function unpackInterpolationResult(array: number[], sourceArray: number[], startingIndex?: number, lastIndex?: number, result?: any): any;
}

/**
 * The viewing frustum is defined by 6 planes.
 * Each plane is represented by a {@link Cartesian4} object, where the x, y, and z components
 * define the unit vector normal to the plane, and the w component is the distance of the
 * plane from the origin/camera position.
 * @example
 * const frustum = new Cesium.PerspectiveFrustum({
 *     fov : Cesium.Math.PI_OVER_THREE,
 *     aspectRatio : canvas.clientWidth / canvas.clientHeight
 *     near : 1.0,
 *     far : 1000.0
 * });
 * @param [options] - An object with the following properties:
 * @param [options.fov] - The angle of the field of view (FOV), in radians.
 * @param [options.aspectRatio] - The aspect ratio of the frustum's width to it's height.
 * @param [options.near = 1.0] - The distance of the near plane.
 * @param [options.far = 500000000.0] - The distance of the far plane.
 * @param [options.xOffset = 0.0] - The offset in the x direction.
 * @param [options.yOffset = 0.0] - The offset in the y direction.
 */
export class PerspectiveFrustum {
    constructor(options?: {
        fov?: number;
        aspectRatio?: number;
        near?: number;
        far?: number;
        xOffset?: number;
        yOffset?: number;
    });
    /**
     * The angle of the field of view (FOV), in radians.  This angle will be used
     * as the horizontal FOV if the width is greater than the height, otherwise
     * it will be the vertical FOV.
     */
    fov: number | undefined;
    /**
     * The aspect ratio of the frustum's width to it's height.
     */
    aspectRatio: number | undefined;
    /**
     * The distance of the near plane.
     */
    near: number;
    /**
     * The distance of the far plane.
     */
    far: number;
    /**
     * Offsets the frustum in the x direction.
     */
    xOffset: number;
    /**
     * Offsets the frustum in the y direction.
     */
    yOffset: number;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PerspectiveFrustum, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PerspectiveFrustum instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PerspectiveFrustum): PerspectiveFrustum;
    /**
     * Gets the perspective projection matrix computed from the view frustum.
     * If necessary, the projection matrix will be recomputed.
     */
    readonly projectionMatrix: Matrix4;
    /**
     * The perspective projection matrix computed from the view frustum with an infinite far plane.
     */
    readonly infiniteProjectionMatrix: Matrix4;
    /**
     * Gets the angle of the vertical field of view, in radians.
     */
    readonly fovy: number | undefined;
    /**
     * Creates a culling volume for this frustum.
     * @example
     * // Check if a bounding volume intersects the frustum.
     * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
     * const intersect = cullingVolume.computeVisibility(boundingVolume);
     * @param position - The eye position.
     * @param direction - The view direction.
     * @param up - The up direction.
     * @returns A culling volume at the given position and orientation.
     */
    computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;
    /**
     * Returns the pixel's width and height in meters.
     * @example
     * // Example 1
     * // Get the width and height of a pixel.
     * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 1.0, scene.pixelRatio, new Cesium.Cartesian2());
     * @example
     * // Example 2
     * // Get the width and height of a pixel if the near plane was set to 'distance'.
     * // For example, get the size of a pixel of an image on a billboard.
     * const position = camera.position;
     * const direction = camera.direction;
     * const toCenter = Cesium.Cartesian3.subtract(primitive.boundingVolume.center, position, new Cesium.Cartesian3());      // vector from camera to a primitive
     * const toCenterProj = Cesium.Cartesian3.multiplyByScalar(direction, Cesium.Cartesian3.dot(direction, toCenter), new Cesium.Cartesian3()); // project vector onto camera direction vector
     * const distance = Cesium.Cartesian3.magnitude(toCenterProj);
     * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, distance, scene.pixelRatio, new Cesium.Cartesian2());
     * @param drawingBufferWidth - The width of the drawing buffer.
     * @param drawingBufferHeight - The height of the drawing buffer.
     * @param distance - The distance to the near plane in meters.
     * @param pixelRatio - The scaling factor from pixel space to coordinate space.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of {@link Cartesian2} with the pixel's width and height in the x and y properties, respectively.
     */
    getPixelDimensions(drawingBufferWidth: number, drawingBufferHeight: number, distance: number, pixelRatio: number, result: Cartesian2): Cartesian2;
    /**
     * Returns a duplicate of a PerspectiveFrustum instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new PerspectiveFrustum instance if one was not provided.
     */
    clone(result?: PerspectiveFrustum): PerspectiveFrustum;
    /**
     * Compares the provided PerspectiveFrustum componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [other] - The right hand side PerspectiveFrustum.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(other?: PerspectiveFrustum): boolean;
    /**
     * Compares the provided PerspectiveFrustum componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param other - The right hand side PerspectiveFrustum.
     * @param relativeEpsilon - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if this and other are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(other: PerspectiveFrustum, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
}

/**
 * The viewing frustum is defined by 6 planes.
 * Each plane is represented by a {@link Cartesian4} object, where the x, y, and z components
 * define the unit vector normal to the plane, and the w component is the distance of the
 * plane from the origin/camera position.
 * @example
 * const frustum = new Cesium.PerspectiveOffCenterFrustum({
 *     left : -1.0,
 *     right : 1.0,
 *     top : 1.0,
 *     bottom : -1.0,
 *     near : 1.0,
 *     far : 100.0
 * });
 * @param [options] - An object with the following properties:
 * @param [options.left] - The left clipping plane distance.
 * @param [options.right] - The right clipping plane distance.
 * @param [options.top] - The top clipping plane distance.
 * @param [options.bottom] - The bottom clipping plane distance.
 * @param [options.near = 1.0] - The near clipping plane distance.
 * @param [options.far = 500000000.0] - The far clipping plane distance.
 */
export class PerspectiveOffCenterFrustum {
    constructor(options?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
        near?: number;
        far?: number;
    });
    /**
     * Defines the left clipping plane.
     */
    left: number | undefined;
    /**
     * Defines the right clipping plane.
     */
    right: number | undefined;
    /**
     * Defines the top clipping plane.
     */
    top: number | undefined;
    /**
     * Defines the bottom clipping plane.
     */
    bottom: number | undefined;
    /**
     * The distance of the near plane.
     */
    near: number;
    /**
     * The distance of the far plane.
     */
    far: number;
    /**
     * Gets the perspective projection matrix computed from the view frustum.
     * The projection matrix will be recomputed if any frustum parameters have changed.
     */
    readonly projectionMatrix: Matrix4;
    /**
     * Gets the perspective projection matrix computed from the view frustum with an infinite far plane.
     */
    readonly infiniteProjectionMatrix: Matrix4;
    /**
     * Creates a culling volume for this frustum.
     * @example
     * // Check if a bounding volume intersects the frustum.
     * const cullingVolume = frustum.computeCullingVolume(cameraPosition, cameraDirection, cameraUp);
     * const intersect = cullingVolume.computeVisibility(boundingVolume);
     * @param position - The eye position.
     * @param direction - The view direction.
     * @param up - The up direction.
     * @returns A culling volume at the given position and orientation.
     */
    computeCullingVolume(position: Cartesian3, direction: Cartesian3, up: Cartesian3): CullingVolume;
    /**
     * Returns the pixel's width and height in meters.
     * @example
     * // Example 1
     * // Get the width and height of a pixel.
     * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, 1.0, scene.pixelRatio, new Cesium.Cartesian2());
     * @example
     * // Example 2
     * // Get the width and height of a pixel if the near plane was set to 'distance'.
     * // For example, get the size of a pixel of an image on a billboard.
     * const position = camera.position;
     * const direction = camera.direction;
     * const toCenter = Cesium.Cartesian3.subtract(primitive.boundingVolume.center, position, new Cesium.Cartesian3());      // vector from camera to a primitive
     * const toCenterProj = Cesium.Cartesian3.multiplyByScalar(direction, Cesium.Cartesian3.dot(direction, toCenter), new Cesium.Cartesian3()); // project vector onto camera direction vector
     * const distance = Cesium.Cartesian3.magnitude(toCenterProj);
     * const pixelSize = camera.frustum.getPixelDimensions(scene.drawingBufferWidth, scene.drawingBufferHeight, distance, scene.pixelRatio, new Cesium.Cartesian2());
     * @param drawingBufferWidth - The width of the drawing buffer.
     * @param drawingBufferHeight - The height of the drawing buffer.
     * @param distance - The distance to the near plane in meters.
     * @param pixelRatio - The scaling factor from pixel space to coordinate space.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of {@link Cartesian2} with the pixel's width and height in the x and y properties, respectively.
     */
    getPixelDimensions(drawingBufferWidth: number, drawingBufferHeight: number, distance: number, pixelRatio: number, result: Cartesian2): Cartesian2;
    /**
     * Returns a duplicate of a PerspectiveOffCenterFrustum instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new PerspectiveFrustum instance if one was not provided.
     */
    clone(result?: PerspectiveOffCenterFrustum): PerspectiveOffCenterFrustum;
    /**
     * Compares the provided PerspectiveOffCenterFrustum componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [other] - The right hand side PerspectiveOffCenterFrustum.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(other?: PerspectiveOffCenterFrustum): boolean;
    /**
     * Compares the provided PerspectiveOffCenterFrustum componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param other - The right hand side PerspectiveOffCenterFrustum.
     * @param relativeEpsilon - The relative epsilon tolerance to use for equality testing.
     * @param [absoluteEpsilon = relativeEpsilon] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if this and other are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(other: PerspectiveOffCenterFrustum, relativeEpsilon: number, absoluteEpsilon?: number): boolean;
}

/**
 * The data type of a pixel.
 */
export enum PixelDatatype {
    UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,
    UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,
    UNSIGNED_INT = WebGLConstants.UNSIGNED_INT,
    FLOAT = WebGLConstants.FLOAT,
    HALF_FLOAT = WebGLConstants.HALF_FLOAT_OES,
    UNSIGNED_INT_24_8 = WebGLConstants.UNSIGNED_INT_24_8,
    UNSIGNED_SHORT_4_4_4_4 = WebGLConstants.UNSIGNED_SHORT_4_4_4_4,
    UNSIGNED_SHORT_5_5_5_1 = WebGLConstants.UNSIGNED_SHORT_5_5_5_1,
    UNSIGNED_SHORT_5_6_5 = WebGLConstants.UNSIGNED_SHORT_5_6_5
}

/**
 * The format of a pixel, i.e., the number of components it has and what they represent.
 */
export enum PixelFormat {
    /**
     * A pixel format containing a depth value.
     */
    DEPTH_COMPONENT = WebGLConstants.DEPTH_COMPONENT,
    /**
     * A pixel format containing a depth and stencil value, most often used with {@link PixelDatatype.UNSIGNED_INT_24_8}.
     */
    DEPTH_STENCIL = WebGLConstants.DEPTH_STENCIL,
    /**
     * A pixel format containing an alpha channel.
     */
    ALPHA = WebGLConstants.ALPHA,
    /**
     * A pixel format containing a red channel
     */
    RED = WebGLConstants.RED,
    /**
     * A pixel format containing red and green channels.
     */
    RG = WebGLConstants.RG,
    /**
     * A pixel format containing red, green, and blue channels.
     */
    RGB = WebGLConstants.RGB,
    /**
     * A pixel format containing red, green, blue, and alpha channels.
     */
    RGBA = WebGLConstants.RGBA,
    /**
     * A pixel format containing a red channel as an integer.
     */
    RED_INTEGER = WebGLConstants.RED_INTEGER,
    /**
     * A pixel format containing red and green channels as integers.
     */
    RG_INTEGER = WebGLConstants.RG_INTEGER,
    /**
     * A pixel format containing red, green, and blue channels as integers.
     */
    RGB_INTEGER = WebGLConstants.RGB_INTEGER,
    /**
     * A pixel format containing red, green, blue, and alpha channels as integers.
     */
    RGBA_INTEGER = WebGLConstants.RGBA_INTEGER,
    /**
     * A pixel format containing a luminance (intensity) channel.
     */
    LUMINANCE = WebGLConstants.LUMINANCE,
    /**
     * A pixel format containing luminance (intensity) and alpha channels.
     */
    LUMINANCE_ALPHA = WebGLConstants.LUMINANCE_ALPHA,
    /**
     * A pixel format containing red, green, and blue channels that is DXT1 compressed.
     */
    RGB_DXT1 = WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is DXT1 compressed.
     */
    RGBA_DXT1 = WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is DXT3 compressed.
     */
    RGBA_DXT3 = WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is DXT5 compressed.
     */
    RGBA_DXT5 = WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,
    /**
     * A pixel format containing red, green, and blue channels that is PVR 4bpp compressed.
     */
    RGB_PVRTC_4BPPV1 = WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
    /**
     * A pixel format containing red, green, and blue channels that is PVR 2bpp compressed.
     */
    RGB_PVRTC_2BPPV1 = WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is PVR 4bpp compressed.
     */
    RGBA_PVRTC_4BPPV1 = WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is PVR 2bpp compressed.
     */
    RGBA_PVRTC_2BPPV1 = WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is ASTC compressed.
     */
    RGBA_ASTC = WebGLConstants.COMPRESSED_RGBA_ASTC_4x4_WEBGL,
    /**
     * A pixel format containing red, green, and blue channels that is ETC1 compressed.
     */
    RGB_ETC1 = WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,
    /**
     * A pixel format containing red, green, and blue channels that is ETC2 compressed.
     */
    RGB8_ETC2 = WebGLConstants.COMPRESSED_RGB8_ETC2,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is ETC2 compressed.
     */
    RGBA8_ETC2_EAC = WebGLConstants.COMPRESSED_RGBA8_ETC2_EAC,
    /**
     * A pixel format containing red, green, blue, and alpha channels that is BC7 compressed.
     */
    RGBA_BC7 = WebGLConstants.COMPRESSED_RGBA_BPTC_UNORM
}

/**
 * A plane in Hessian Normal Form defined by
 * <pre>
 * ax + by + cz + d = 0
 * </pre>
 * where (a, b, c) is the plane's <code>normal</code>, d is the signed
 * <code>distance</code> to the plane, and (x, y, z) is any point on
 * the plane.
 * @example
 * // The plane x=0
 * const plane = new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0);
 * @param normal - The plane's normal (normalized).
 * @param distance - The shortest distance from the origin to the plane.  The sign of
 * <code>distance</code> determines which side of the plane the origin
 * is on.  If <code>distance</code> is positive, the origin is in the half-space
 * in the direction of the normal; if negative, the origin is in the half-space
 * opposite to the normal; if zero, the plane passes through the origin.
 */
export class Plane {
    constructor(normal: Cartesian3, distance: number);
    /**
     * The plane's normal.
     */
    normal: Cartesian3;
    /**
     * The shortest distance from the origin to the plane.  The sign of
     * <code>distance</code> determines which side of the plane the origin
     * is on.  If <code>distance</code> is positive, the origin is in the half-space
     * in the direction of the normal; if negative, the origin is in the half-space
     * opposite to the normal; if zero, the plane passes through the origin.
     */
    distance: number;
    /**
     * Creates a plane from a normal and a point on the plane.
     * @example
     * const point = Cesium.Cartesian3.fromDegrees(-72.0, 40.0);
     * const normal = ellipsoid.geodeticSurfaceNormal(point);
     * const tangentPlane = Cesium.Plane.fromPointNormal(point, normal);
     * @param point - The point on the plane.
     * @param normal - The plane's normal (normalized).
     * @param [result] - The object onto which to store the result.
     * @returns A new plane instance or the modified result parameter.
     */
    static fromPointNormal(point: Cartesian3, normal: Cartesian3, result?: Plane): Plane;
    /**
     * Creates a plane from the general equation
     * @param coefficients - The plane's normal (normalized).
     * @param [result] - The object onto which to store the result.
     * @returns A new plane instance or the modified result parameter.
     */
    static fromCartesian4(coefficients: Cartesian4, result?: Plane): Plane;
    /**
     * Computes the signed shortest distance of a point to a plane.
     * The sign of the distance determines which side of the plane the point
     * is on.  If the distance is positive, the point is in the half-space
     * in the direction of the normal; if negative, the point is in the half-space
     * opposite to the normal; if zero, the plane passes through the point.
     * @param plane - The plane.
     * @param point - The point.
     * @returns The signed shortest distance of the point to the plane.
     */
    static getPointDistance(plane: Plane, point: Cartesian3): number;
    /**
     * Projects a point onto the plane.
     * @param plane - The plane to project the point onto
     * @param point - The point to project onto the plane
     * @param [result] - The result point.  If undefined, a new Cartesian3 will be created.
     * @returns The modified result parameter or a new Cartesian3 instance if one was not provided.
     */
    static projectPointOntoPlane(plane: Plane, point: Cartesian3, result?: Cartesian3): Cartesian3;
    /**
     * Transforms the plane by the given transformation matrix.
     * @param plane - The plane.
     * @param transform - The transformation matrix.
     * @param [result] - The object into which to store the result.
     * @returns The plane transformed by the given transformation matrix.
     */
    static transform(plane: Plane, transform: Matrix4, result?: Plane): Plane;
    /**
     * Duplicates a Plane instance.
     * @param plane - The plane to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Plane instance if one was not provided.
     */
    static clone(plane: Plane, result?: Plane): Plane;
    /**
     * Compares the provided Planes by normal and distance and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param left - The first plane.
     * @param right - The second plane.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left: Plane, right: Plane): boolean;
    /**
     * A constant initialized to the XY plane passing through the origin, with normal in positive Z.
     */
    static readonly ORIGIN_XY_PLANE: Plane;
    /**
     * A constant initialized to the YZ plane passing through the origin, with normal in positive X.
     */
    static readonly ORIGIN_YZ_PLANE: Plane;
    /**
     * A constant initialized to the ZX plane passing through the origin, with normal in positive Y.
     */
    static readonly ORIGIN_ZX_PLANE: Plane;
}

/**
 * Describes geometry representing a plane centered at the origin, with a unit width and length.
 * @example
 * const planeGeometry = new Cesium.PlaneGeometry({
 *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY
 * });
 * @param [options] - Object with the following properties:
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class PlaneGeometry {
    constructor(options?: {
        vertexFormat?: VertexFormat;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PlaneGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PlaneGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PlaneGeometry): PlaneGeometry;
    /**
     * Computes the geometric representation of a plane, including its vertices, indices, and a bounding sphere.
     * @param planeGeometry - A description of the plane.
     * @returns The computed vertices and indices.
     */
    static createGeometry(planeGeometry: PlaneGeometry): Geometry | undefined;
}

/**
 * Describes geometry representing the outline of a plane centered at the origin, with a unit width and length.
 */
export class PlaneOutlineGeometry {
    constructor();
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @returns The array that was packed into
     */
    static pack(value: PlaneOutlineGeometry, array: number[]): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PlaneOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PlaneOutlineGeometry): PlaneOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of a plane, including its vertices, indices, and a bounding sphere.
     * @returns The computed vertices and indices.
     */
    static createGeometry(): Geometry | undefined;
}

/**
 * A description of a polygon on the ellipsoid. The polygon is defined by a polygon hierarchy. Polygon geometry can be rendered with both {@link Primitive} and {@link GroundPrimitive}.
 * @example
 * // 1. create a polygon from points
 * const polygon = new Cesium.PolygonGeometry({
 *   polygonHierarchy : new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArray([
 *       -72.0, 40.0,
 *       -70.0, 35.0,
 *       -75.0, 30.0,
 *       -70.0, 30.0,
 *       -68.0, 40.0
 *     ])
 *   )
 * });
 * const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
 *
 * // 2. create a nested polygon with holes
 * const polygonWithHole = new Cesium.PolygonGeometry({
 *   polygonHierarchy : new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArray([
 *       -109.0, 30.0,
 *       -95.0, 30.0,
 *       -95.0, 40.0,
 *       -109.0, 40.0
 *     ]),
 *     [new Cesium.PolygonHierarchy(
 *       Cesium.Cartesian3.fromDegreesArray([
 *         -107.0, 31.0,
 *         -107.0, 39.0,
 *         -97.0, 39.0,
 *         -97.0, 31.0
 *       ]),
 *       [new Cesium.PolygonHierarchy(
 *         Cesium.Cartesian3.fromDegreesArray([
 *           -105.0, 33.0,
 *           -99.0, 33.0,
 *           -99.0, 37.0,
 *           -105.0, 37.0
 *         ]),
 *         [new Cesium.PolygonHierarchy(
 *           Cesium.Cartesian3.fromDegreesArray([
 *             -103.0, 34.0,
 *             -101.0, 34.0,
 *             -101.0, 36.0,
 *             -103.0, 36.0
 *           ])
 *         )]
 *       )]
 *     )]
 *   )
 * });
 * const geometry = Cesium.PolygonGeometry.createGeometry(polygonWithHole);
 *
 * // 3. create extruded polygon
 * const extrudedPolygon = new Cesium.PolygonGeometry({
 *   polygonHierarchy : new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArray([
 *       -72.0, 40.0,
 *       -70.0, 35.0,
 *       -75.0, 30.0,
 *       -70.0, 30.0,
 *       -68.0, 40.0
 *     ])
 *   ),
 *   extrudedHeight: 300000
 * });
 * const geometry = Cesium.PolygonGeometry.createGeometry(extrudedPolygon);
 * @param options - Object with the following properties:
 * @param options.polygonHierarchy - A polygon hierarchy that can include holes.
 * @param [options.height = 0.0] - The distance in meters between the polygon and the ellipsoid surface.
 * @param [options.extrudedHeight] - The distance in meters between the polygon's extruded face and the ellipsoid surface.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.stRotation = 0.0] - The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.perPositionHeight = false] - Use the height of options.positions for each position instead of using options.height to determine the height.
 * @param [options.closeTop = true] - When false, leaves off the top of an extruded polygon open.
 * @param [options.closeBottom = true] - When false, leaves off the bottom of an extruded polygon open.
 * @param [options.arcType = ArcType.GEODESIC] - The type of line the polygon edges must follow. Valid options are {@link ArcType.GEODESIC} and {@link ArcType.RHUMB}.
 * @param [options.textureCoordinates] - Texture coordinates as a {@link PolygonHierarchy} of {@link Cartesian2} points. Has no effect for ground primitives.
 */
export class PolygonGeometry {
    constructor(options: {
        polygonHierarchy: PolygonHierarchy;
        height?: number;
        extrudedHeight?: number;
        vertexFormat?: VertexFormat;
        stRotation?: number;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        perPositionHeight?: boolean;
        closeTop?: boolean;
        closeBottom?: boolean;
        arcType?: ArcType;
        textureCoordinates?: PolygonHierarchy;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * A description of a polygon from an array of positions. Polygon geometry can be rendered with both {@link Primitive} and {@link GroundPrimitive}.
     * @example
     * // create a polygon from points
     * const polygon = Cesium.PolygonGeometry.fromPositions({
     *   positions : Cesium.Cartesian3.fromDegreesArray([
     *     -72.0, 40.0,
     *     -70.0, 35.0,
     *     -75.0, 30.0,
     *     -70.0, 30.0,
     *     -68.0, 40.0
     *   ])
     * });
     * const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
     * @param options - Object with the following properties:
     * @param options.positions - An array of positions that defined the corner points of the polygon.
     * @param [options.height = 0.0] - The height of the polygon.
     * @param [options.extrudedHeight] - The height of the polygon extrusion.
     * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
     * @param [options.stRotation = 0.0] - The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.perPositionHeight = false] - Use the height of options.positions for each position instead of using options.height to determine the height.
     * @param [options.closeTop = true] - When false, leaves off the top of an extruded polygon open.
     * @param [options.closeBottom = true] - When false, leaves off the bottom of an extruded polygon open.
     * @param [options.arcType = ArcType.GEODESIC] - The type of line the polygon edges must follow. Valid options are {@link ArcType.GEODESIC} and {@link ArcType.RHUMB}.
     * @param [options.textureCoordinates] - Texture coordinates as a {@link PolygonHierarchy} of {@link Cartesian2} points. Has no effect for ground primitives.
     */
    static fromPositions(options: {
        positions: Cartesian3[];
        height?: number;
        extrudedHeight?: number;
        vertexFormat?: VertexFormat;
        stRotation?: number;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        perPositionHeight?: boolean;
        closeTop?: boolean;
        closeBottom?: boolean;
        arcType?: ArcType;
        textureCoordinates?: PolygonHierarchy;
    }): PolygonGeometry;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PolygonGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PolygonGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PolygonGeometry): PolygonGeometry;
    /**
     * Computes a rectangle which encloses the polygon defined by the list of positions, including cases over the international date line and the poles.
     * @param positions - A linear ring defining the outer boundary of the polygon.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
     * @param [arcType = ArcType.GEODESIC] - The type of line the polygon edges must follow. Valid options are {@link ArcType.GEODESIC} and {@link ArcType.RHUMB}.
     * @param [result] - An object in which to store the result.
     * @returns The result rectangle
     */
    static computeRectangleFromPositions(positions: Cartesian3[], ellipsoid?: Ellipsoid, arcType?: ArcType, result?: Rectangle): Rectangle;
    /**
     * Computes the geometric representation of a polygon, including its vertices, indices, and a bounding sphere.
     * @param polygonGeometry - A description of the polygon.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polygonGeometry: PolygonGeometry): Geometry | undefined;
}

/**
 * An hierarchy of linear rings which define a polygon and its holes.
 * The holes themselves may also have holes which nest inner polygons.
 * @param [positions] - A linear ring defining the outer boundary of the polygon or hole.
 * @param [holes] - An array of polygon hierarchies defining holes in the polygon.
 */
export class PolygonHierarchy {
    constructor(positions?: Cartesian3[], holes?: PolygonHierarchy[]);
    /**
     * A linear ring defining the outer boundary of the polygon or hole.
     */
    positions: Cartesian3[];
    /**
     * An array of polygon hierarchies defining holes in the polygon.
     */
    holes: PolygonHierarchy[];
}

/**
 * A description of the outline of a polygon on the ellipsoid. The polygon is defined by a polygon hierarchy.
 * @example
 * // 1. create a polygon outline from points
 * const polygon = new Cesium.PolygonOutlineGeometry({
 *   polygonHierarchy : new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArray([
 *       -72.0, 40.0,
 *       -70.0, 35.0,
 *       -75.0, 30.0,
 *       -70.0, 30.0,
 *       -68.0, 40.0
 *     ])
 *   )
 * });
 * const geometry = Cesium.PolygonOutlineGeometry.createGeometry(polygon);
 *
 * // 2. create a nested polygon with holes outline
 * const polygonWithHole = new Cesium.PolygonOutlineGeometry({
 *   polygonHierarchy : new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArray([
 *       -109.0, 30.0,
 *       -95.0, 30.0,
 *       -95.0, 40.0,
 *       -109.0, 40.0
 *     ]),
 *     [new Cesium.PolygonHierarchy(
 *       Cesium.Cartesian3.fromDegreesArray([
 *         -107.0, 31.0,
 *         -107.0, 39.0,
 *         -97.0, 39.0,
 *         -97.0, 31.0
 *       ]),
 *       [new Cesium.PolygonHierarchy(
 *         Cesium.Cartesian3.fromDegreesArray([
 *           -105.0, 33.0,
 *           -99.0, 33.0,
 *           -99.0, 37.0,
 *           -105.0, 37.0
 *         ]),
 *         [new Cesium.PolygonHierarchy(
 *           Cesium.Cartesian3.fromDegreesArray([
 *             -103.0, 34.0,
 *             -101.0, 34.0,
 *             -101.0, 36.0,
 *             -103.0, 36.0
 *           ])
 *         )]
 *       )]
 *     )]
 *   )
 * });
 * const geometry = Cesium.PolygonOutlineGeometry.createGeometry(polygonWithHole);
 *
 * // 3. create extruded polygon outline
 * const extrudedPolygon = new Cesium.PolygonOutlineGeometry({
 *   polygonHierarchy : new Cesium.PolygonHierarchy(
 *     Cesium.Cartesian3.fromDegreesArray([
 *       -72.0, 40.0,
 *       -70.0, 35.0,
 *       -75.0, 30.0,
 *       -70.0, 30.0,
 *       -68.0, 40.0
 *     ])
 *   ),
 *   extrudedHeight: 300000
 * });
 * const geometry = Cesium.PolygonOutlineGeometry.createGeometry(extrudedPolygon);
 * @param options - Object with the following properties:
 * @param options.polygonHierarchy - A polygon hierarchy that can include holes.
 * @param [options.height = 0.0] - The distance in meters between the polygon and the ellipsoid surface.
 * @param [options.extrudedHeight] - The distance in meters between the polygon's extruded face and the ellipsoid surface.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.perPositionHeight = false] - Use the height of options.positions for each position instead of using options.height to determine the height.
 * @param [options.arcType = ArcType.GEODESIC] - The type of path the outline must follow. Valid options are {@link ArcType.GEODESIC} and {@link ArcType.RHUMB}.
 */
export class PolygonOutlineGeometry {
    constructor(options: {
        polygonHierarchy: PolygonHierarchy;
        height?: number;
        extrudedHeight?: number;
        vertexFormat?: VertexFormat;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        perPositionHeight?: boolean;
        arcType?: ArcType;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PolygonOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PolygonOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PolygonOutlineGeometry): PolygonOutlineGeometry;
    /**
     * A description of a polygon outline from an array of positions.
     * @example
     * // create a polygon from points
     * const polygon = Cesium.PolygonOutlineGeometry.fromPositions({
     *   positions : Cesium.Cartesian3.fromDegreesArray([
     *     -72.0, 40.0,
     *     -70.0, 35.0,
     *     -75.0, 30.0,
     *     -70.0, 30.0,
     *     -68.0, 40.0
     *   ])
     * });
     * const geometry = Cesium.PolygonOutlineGeometry.createGeometry(polygon);
     * @param options - Object with the following properties:
     * @param options.positions - An array of positions that defined the corner points of the polygon.
     * @param [options.height = 0.0] - The height of the polygon.
     * @param [options.extrudedHeight] - The height of the polygon extrusion.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.perPositionHeight = false] - Use the height of options.positions for each position instead of using options.height to determine the height.
     * @param [options.arcType = ArcType.GEODESIC] - The type of path the outline must follow. Valid options are {@link LinkType.GEODESIC} and {@link ArcType.RHUMB}.
     */
    static fromPositions(options: {
        positions: Cartesian3[];
        height?: number;
        extrudedHeight?: number;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        perPositionHeight?: boolean;
        arcType?: ArcType;
    }): PolygonOutlineGeometry;
    /**
     * Computes the geometric representation of a polygon outline, including its vertices, indices, and a bounding sphere.
     * @param polygonGeometry - A description of the polygon outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polygonGeometry: PolygonOutlineGeometry): Geometry | undefined;
}

/**
 * Polygon geometry processing functions, including triangulation and subdivision.
 */
export namespace PolygonPipeline {
    function computeArea2D(): void;
    /**
     * @returns The winding order.
     */
    function computeWindingOrder2D(): WindingOrder;
    /**
     * Triangulate a polygon.
     * @param positions - Cartesian2 array containing the vertices of the polygon
     * @param [holes] - An array of the staring indices of the holes.
     * @returns Index array representing triangles that fill the polygon
     */
    function triangulate(positions: Cartesian2[], holes?: number[]): number[];
    /**
     * Subdivides positions and raises points to the surface of the ellipsoid.
     * @param ellipsoid - The ellipsoid the polygon in on.
     * @param positions - An array of {@link Cartesian3} positions of the polygon.
     * @param indices - An array of indices that determines the triangles in the polygon.
     * @param texcoords - An optional array of {@link Cartesian2} texture coordinates of the polygon.
     * @param [granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     */
    function computeSubdivision(ellipsoid: Ellipsoid, positions: Cartesian3[], indices: number[], texcoords: Cartesian2[], granularity?: number): void;
    /**
     * Subdivides positions on rhumb lines and raises points to the surface of the ellipsoid.
     * @param ellipsoid - The ellipsoid the polygon in on.
     * @param positions - An array of {@link Cartesian3} positions of the polygon.
     * @param indices - An array of indices that determines the triangles in the polygon.
     * @param texcoords - An optional array of {@link Cartesian2} texture coordinates of the polygon.
     * @param [granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     */
    function computeRhumbLineSubdivision(ellipsoid: Ellipsoid, positions: Cartesian3[], indices: number[], texcoords: Cartesian2[], granularity?: number): void;
    /**
     * Scales each position of a geometry's position attribute to a height, in place.
     * @param positions - The array of numbers representing the positions to be scaled
     * @param [height = 0.0] - The desired height to add to the positions
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid on which the positions lie.
     * @param [scaleToSurface = true] - <code>true</code> if the positions need to be scaled to the surface before the height is added.
     * @returns The input array of positions, scaled to height
     */
    function scaleToGeodeticHeight(positions: number[], height?: number, ellipsoid?: Ellipsoid, scaleToSurface?: boolean): number[];
}

/**
 * A description of a polyline modeled as a line strip; the first two positions define a line segment,
 * and each additional position defines a line segment from the previous position. The polyline is capable of
 * displaying with a material.
 * @example
 * // A polyline with two connected line segments
 * const polyline = new Cesium.PolylineGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArray([
 *     0.0, 0.0,
 *     5.0, 0.0,
 *     5.0, 5.0
 *   ]),
 *   width : 10.0
 * });
 * const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
 * @param options - Object with the following properties:
 * @param options.positions - An array of {@link Cartesian3} defining the positions in the polyline as a line strip.
 * @param [options.width = 1.0] - The width in pixels.
 * @param [options.colors] - An Array of {@link Color} defining the per vertex or per segment colors.
 * @param [options.colorsPerVertex = false] - A boolean that determines whether the colors will be flat across each segment of the line or interpolated across the vertices.
 * @param [options.arcType = ArcType.GEODESIC] - The type of line the polyline segments must follow.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude if options.arcType is not ArcType.NONE. Determines the number of positions in the buffer.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 */
export class PolylineGeometry {
    constructor(options: {
        positions: Cartesian3[];
        width?: number;
        colors?: Color[];
        colorsPerVertex?: boolean;
        arcType?: ArcType;
        granularity?: number;
        vertexFormat?: VertexFormat;
        ellipsoid?: Ellipsoid;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PolylineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PolylineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PolylineGeometry): PolylineGeometry;
    /**
     * Computes the geometric representation of a polyline, including its vertices, indices, and a bounding sphere.
     * @param polylineGeometry - A description of the polyline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polylineGeometry: PolylineGeometry): Geometry | undefined;
}

/**
 * Polyline geometry processing functions, including arc generation and subdivision.
 */
export namespace PolylinePipeline {
    /**
     * Breaks a {@link Polyline} into segments such that it does not cross the &plusmn;180 degree meridian of an ellipsoid.
     * @example
     * const polylines = new Cesium.PolylineCollection();
     * const polyline = polylines.add(...);
     * const positions = polyline.positions;
     * const modelMatrix = polylines.modelMatrix;
     * const segments = Cesium.PolylinePipeline.wrapLongitude(positions, modelMatrix);
     * @param positions - The polyline's Cartesian positions.
     * @param [modelMatrix = Matrix4.IDENTITY] - The polyline's model matrix. Assumed to be an affine
     * transformation matrix, where the upper left 3x3 elements are a rotation matrix, and
     * the upper three elements in the fourth column are the translation.  The bottom row is assumed to be [0, 0, 0, 1].
     * The matrix is not verified to be in the proper form.
     * @returns An object with a <code>positions</code> property that is an array of positions and a
     * <code>segments</code> property.
     */
    function wrapLongitude(positions: Cartesian3[], modelMatrix?: Matrix4): any;
    /**
     * Subdivides polyline and raises all points to the specified height.  Returns an array of numbers to represent the positions.
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateArc({
     *   positons: positions
     * });
     * @param options - Object with the following properties:
     * @param options.positions - The array of type {Cartesian3} representing positions.
     * @param [options.height = 0.0] - A number or array of numbers representing the heights of each position.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the positions lie.
     * @returns A new array of positions of type {number} that have been subdivided and raised to the surface of the ellipsoid.
     */
    function generateArc(options: {
        positions: Cartesian3[];
        height?: number | number[];
        granularity?: number;
        ellipsoid?: Ellipsoid;
    }): number[];
    /**
     * Subdivides polyline and raises all points to the specified height using Rhumb lines.  Returns an array of numbers to represent the positions.
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateRhumbArc({
     *   positons: positions
     * });
     * @param options - Object with the following properties:
     * @param options.positions - The array of type {Cartesian3} representing positions.
     * @param [options.height = 0.0] - A number or array of numbers representing the heights of each position.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the positions lie.
     * @returns A new array of positions of type {number} that have been subdivided and raised to the surface of the ellipsoid.
     */
    function generateRhumbArc(options: {
        positions: Cartesian3[];
        height?: number | number[];
        granularity?: number;
        ellipsoid?: Ellipsoid;
    }): number[];
    /**
     * Subdivides polyline and raises all points to the specified height. Returns an array of new {Cartesian3} positions.
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateCartesianArc({
     *   positons: positions
     * });
     * @param options - Object with the following properties:
     * @param options.positions - The array of type {Cartesian3} representing positions.
     * @param [options.height = 0.0] - A number or array of numbers representing the heights of each position.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the positions lie.
     * @returns A new array of cartesian3 positions that have been subdivided and raised to the surface of the ellipsoid.
     */
    function generateCartesianArc(options: {
        positions: Cartesian3[];
        height?: number | number[];
        granularity?: number;
        ellipsoid?: Ellipsoid;
    }): Cartesian3[];
    /**
     * Subdivides polyline and raises all points to the specified height using Rhumb Lines. Returns an array of new {Cartesian3} positions.
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateCartesianRhumbArc({
     *   positons: positions
     * });
     * @param options - Object with the following properties:
     * @param options.positions - The array of type {Cartesian3} representing positions.
     * @param [options.height = 0.0] - A number or array of numbers representing the heights of each position.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the positions lie.
     * @returns A new array of cartesian3 positions that have been subdivided and raised to the surface of the ellipsoid.
     */
    function generateCartesianRhumbArc(options: {
        positions: Cartesian3[];
        height?: number | number[];
        granularity?: number;
        ellipsoid?: Ellipsoid;
    }): Cartesian3[];
}

/**
 * A description of a polyline with a volume (a 2D shape extruded along a polyline).
 * @example
 * function computeCircle(radius) {
 *   const positions = [];
 *   for (let i = 0; i < 360; i++) {
 *     const radians = Cesium.Math.toRadians(i);
 *     positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
 *   }
 *   return positions;
 * }
 *
 * const volume = new Cesium.PolylineVolumeGeometry({
 *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
 *   polylinePositions : Cesium.Cartesian3.fromDegreesArray([
 *     -72.0, 40.0,
 *     -70.0, 35.0
 *   ]),
 *   shapePositions : computeCircle(100000.0)
 * });
 * @param options - Object with the following properties:
 * @param options.polylinePositions - An array of {@link Cartesian3} positions that define the center of the polyline volume.
 * @param options.shapePositions - An array of {@link Cartesian2} positions that define the shape to be extruded along the polyline
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.cornerType = CornerType.ROUNDED] - Determines the style of the corners.
 */
export class PolylineVolumeGeometry {
    constructor(options: {
        polylinePositions: Cartesian3[];
        shapePositions: Cartesian2[];
        ellipsoid?: Ellipsoid;
        granularity?: number;
        vertexFormat?: VertexFormat;
        cornerType?: CornerType;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PolylineVolumeGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PolylineVolumeGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PolylineVolumeGeometry): PolylineVolumeGeometry;
    /**
     * Computes the geometric representation of a polyline with a volume, including its vertices, indices, and a bounding sphere.
     * @param polylineVolumeGeometry - A description of the polyline volume.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polylineVolumeGeometry: PolylineVolumeGeometry): Geometry | undefined;
}

/**
 * A description of a polyline with a volume (a 2D shape extruded along a polyline).
 * @example
 * function computeCircle(radius) {
 *   const positions = [];
 *   for (let i = 0; i < 360; i++) {
 *     const radians = Cesium.Math.toRadians(i);
 *     positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
 *   }
 *   return positions;
 * }
 *
 * const volumeOutline = new Cesium.PolylineVolumeOutlineGeometry({
 *   polylinePositions : Cesium.Cartesian3.fromDegreesArray([
 *     -72.0, 40.0,
 *     -70.0, 35.0
 *   ]),
 *   shapePositions : computeCircle(100000.0)
 * });
 * @param options - Object with the following properties:
 * @param options.polylinePositions - An array of positions that define the center of the polyline volume.
 * @param options.shapePositions - An array of positions that define the shape to be extruded along the polyline
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.cornerType = CornerType.ROUNDED] - Determines the style of the corners.
 */
export class PolylineVolumeOutlineGeometry {
    constructor(options: {
        polylinePositions: Cartesian3[];
        shapePositions: Cartesian2[];
        ellipsoid?: Ellipsoid;
        granularity?: number;
        cornerType?: CornerType;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: PolylineVolumeOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new PolylineVolumeOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: PolylineVolumeOutlineGeometry): PolylineVolumeOutlineGeometry;
    /**
     * Computes the geometric representation of the outline of a polyline with a volume, including its vertices, indices, and a bounding sphere.
     * @param polylineVolumeOutlineGeometry - A description of the polyline volume outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(polylineVolumeOutlineGeometry: PolylineVolumeOutlineGeometry): Geometry | undefined;
}

/**
 * The type of a geometric primitive, i.e., points, lines, and triangles.
 */
export enum PrimitiveType {
    /**
     * Points primitive where each vertex (or index) is a separate point.
     */
    POINTS = WebGLConstants.POINTS,
    /**
     * Lines primitive where each two vertices (or indices) is a line segment.  Line segments are not necessarily connected.
     */
    LINES = WebGLConstants.LINES,
    /**
     * Line loop primitive where each vertex (or index) after the first connects a line to
     * the previous vertex, and the last vertex implicitly connects to the first.
     */
    LINE_LOOP = WebGLConstants.LINE_LOOP,
    /**
     * Line strip primitive where each vertex (or index) after the first connects a line to the previous vertex.
     */
    LINE_STRIP = WebGLConstants.LINE_STRIP,
    /**
     * Triangles primitive where each three vertices (or indices) is a triangle.  Triangles do not necessarily share edges.
     */
    TRIANGLES = WebGLConstants.TRIANGLES,
    /**
     * Triangle strip primitive where each vertex (or index) after the first two connect to
     * the previous two vertices forming a triangle.  For example, this can be used to model a wall.
     */
    TRIANGLE_STRIP = WebGLConstants.TRIANGLE_STRIP,
    /**
     * Triangle fan primitive where each vertex (or index) after the first two connect to
     * the previous vertex and the first vertex forming a triangle.  For example, this can be used
     * to model a cone or circle.
     */
    TRIANGLE_FAN = WebGLConstants.TRIANGLE_FAN
}

/**
 * Defines functions for 2nd order polynomial functions of one variable with only real coefficients.
 */
export namespace QuadraticRealPolynomial {
    /**
     * Provides the discriminant of the quadratic equation from the supplied coefficients.
     * @param a - The coefficient of the 2nd order monomial.
     * @param b - The coefficient of the 1st order monomial.
     * @param c - The coefficient of the 0th order monomial.
     * @returns The value of the discriminant.
     */
    function computeDiscriminant(a: number, b: number, c: number): number;
    /**
     * Provides the real valued roots of the quadratic polynomial with the provided coefficients.
     * @param a - The coefficient of the 2nd order monomial.
     * @param b - The coefficient of the 1st order monomial.
     * @param c - The coefficient of the 0th order monomial.
     * @returns The real valued roots.
     */
    function computeRealRoots(a: number, b: number, c: number): number[];
}

/**
 * Defines functions for 4th order polynomial functions of one variable with only real coefficients.
 */
export namespace QuarticRealPolynomial {
    /**
     * Provides the discriminant of the quartic equation from the supplied coefficients.
     * @param a - The coefficient of the 4th order monomial.
     * @param b - The coefficient of the 3rd order monomial.
     * @param c - The coefficient of the 2nd order monomial.
     * @param d - The coefficient of the 1st order monomial.
     * @param e - The coefficient of the 0th order monomial.
     * @returns The value of the discriminant.
     */
    function computeDiscriminant(a: number, b: number, c: number, d: number, e: number): number;
    /**
     * Provides the real valued roots of the quartic polynomial with the provided coefficients.
     * @param a - The coefficient of the 4th order monomial.
     * @param b - The coefficient of the 3rd order monomial.
     * @param c - The coefficient of the 2nd order monomial.
     * @param d - The coefficient of the 1st order monomial.
     * @param e - The coefficient of the 0th order monomial.
     * @returns The real valued roots.
     */
    function computeRealRoots(a: number, b: number, c: number, d: number, e: number): number[];
}

/**
 * A set of 4-dimensional coordinates used to represent rotation in 3-dimensional space.
 * @param [x = 0.0] - The X component.
 * @param [y = 0.0] - The Y component.
 * @param [z = 0.0] - The Z component.
 * @param [w = 0.0] - The W component.
 */
export class Quaternion {
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * The X component.
     */
    x: number;
    /**
     * The Y component.
     */
    y: number;
    /**
     * The Z component.
     */
    z: number;
    /**
     * The W component.
     */
    w: number;
    /**
     * Computes a quaternion representing a rotation around an axis.
     * @param axis - The axis of rotation.
     * @param angle - The angle in radians to rotate around the axis.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if one was not provided.
     */
    static fromAxisAngle(axis: Cartesian3, angle: number, result?: Quaternion): Quaternion;
    /**
     * Computes a Quaternion from the provided Matrix3 instance.
     * @param matrix - The rotation matrix.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if one was not provided.
     */
    static fromRotationMatrix(matrix: Matrix3, result?: Quaternion): Quaternion;
    /**
     * Computes a rotation from the given heading, pitch and roll angles. Heading is the rotation about the
     * negative z axis. Pitch is the rotation about the negative y axis. Roll is the rotation about
     * the positive x axis.
     * @param headingPitchRoll - The rotation expressed as a heading, pitch and roll.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if none was provided.
     */
    static fromHeadingPitchRoll(headingPitchRoll: HeadingPitchRoll, result?: Quaternion): Quaternion;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Quaternion, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Quaternion): Quaternion;
    /**
     * The number of elements used to store the object into an array in its interpolatable form.
     */
    static packedInterpolationLength: number;
    /**
     * Converts a packed array into a form suitable for interpolation.
     * @param packedArray - The packed array.
     * @param [startingIndex = 0] - The index of the first element to be converted.
     * @param [lastIndex = packedArray.length] - The index of the last element to be converted.
     * @param [result] - The object into which to store the result.
     */
    static convertPackedArrayForInterpolation(packedArray: number[], startingIndex?: number, lastIndex?: number, result?: number[]): void;
    /**
     * Retrieves an instance from a packed array converted with {@link convertPackedArrayForInterpolation}.
     * @param array - The array previously packed for interpolation.
     * @param sourceArray - The original packed array.
     * @param [firstIndex = 0] - The firstIndex used to convert the array.
     * @param [lastIndex = packedArray.length] - The lastIndex used to convert the array.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if one was not provided.
     */
    static unpackInterpolationResult(array: number[], sourceArray: number[], firstIndex?: number, lastIndex?: number, result?: Quaternion): Quaternion;
    /**
     * Duplicates a Quaternion instance.
     * @param quaternion - The quaternion to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if one was not provided. (Returns undefined if quaternion is undefined)
     */
    static clone(quaternion: Quaternion, result?: Quaternion): Quaternion;
    /**
     * Computes the conjugate of the provided quaternion.
     * @param quaternion - The quaternion to conjugate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static conjugate(quaternion: Quaternion, result: Quaternion): Quaternion;
    /**
     * Computes magnitude squared for the provided quaternion.
     * @param quaternion - The quaternion to conjugate.
     * @returns The magnitude squared.
     */
    static magnitudeSquared(quaternion: Quaternion): number;
    /**
     * Computes magnitude for the provided quaternion.
     * @param quaternion - The quaternion to conjugate.
     * @returns The magnitude.
     */
    static magnitude(quaternion: Quaternion): number;
    /**
     * Computes the normalized form of the provided quaternion.
     * @param quaternion - The quaternion to normalize.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static normalize(quaternion: Quaternion, result: Quaternion): Quaternion;
    /**
     * Computes the inverse of the provided quaternion.
     * @param quaternion - The quaternion to normalize.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static inverse(quaternion: Quaternion, result: Quaternion): Quaternion;
    /**
     * Computes the componentwise sum of two quaternions.
     * @param left - The first quaternion.
     * @param right - The second quaternion.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static add(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion;
    /**
     * Computes the componentwise difference of two quaternions.
     * @param left - The first quaternion.
     * @param right - The second quaternion.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static subtract(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion;
    /**
     * Negates the provided quaternion.
     * @param quaternion - The quaternion to be negated.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static negate(quaternion: Quaternion, result: Quaternion): Quaternion;
    /**
     * Computes the dot (scalar) product of two quaternions.
     * @param left - The first quaternion.
     * @param right - The second quaternion.
     * @returns The dot product.
     */
    static dot(left: Quaternion, right: Quaternion): number;
    /**
     * Computes the product of two quaternions.
     * @param left - The first quaternion.
     * @param right - The second quaternion.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiply(left: Quaternion, right: Quaternion, result: Quaternion): Quaternion;
    /**
     * Multiplies the provided quaternion componentwise by the provided scalar.
     * @param quaternion - The quaternion to be scaled.
     * @param scalar - The scalar to multiply with.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static multiplyByScalar(quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion;
    /**
     * Divides the provided quaternion componentwise by the provided scalar.
     * @param quaternion - The quaternion to be divided.
     * @param scalar - The scalar to divide by.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static divideByScalar(quaternion: Quaternion, scalar: number, result: Quaternion): Quaternion;
    /**
     * Computes the axis of rotation of the provided quaternion.
     * @param quaternion - The quaternion to use.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static computeAxis(quaternion: Quaternion, result: Cartesian3): Cartesian3;
    /**
     * Computes the angle of rotation of the provided quaternion.
     * @param quaternion - The quaternion to use.
     * @returns The angle of rotation.
     */
    static computeAngle(quaternion: Quaternion): number;
    /**
     * Computes the linear interpolation or extrapolation at t using the provided quaternions.
     * @param start - The value corresponding to t at 0.0.
     * @param end - The value corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static lerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion;
    /**
     * Computes the spherical linear interpolation or extrapolation at t using the provided quaternions.
     * @param start - The value corresponding to t at 0.0.
     * @param end - The value corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static slerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion;
    /**
     * The logarithmic quaternion function.
     * @param quaternion - The unit quaternion.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static log(quaternion: Quaternion, result: Cartesian3): Cartesian3;
    /**
     * The exponential quaternion function.
     * @param cartesian - The cartesian.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static exp(cartesian: Cartesian3, result: Quaternion): Quaternion;
    /**
     * Computes an inner quadrangle point.
     * <p>This will compute quaternions that ensure a squad curve is C<sup>1</sup>.</p>
     * @param q0 - The first quaternion.
     * @param q1 - The second quaternion.
     * @param q2 - The third quaternion.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static computeInnerQuadrangle(q0: Quaternion, q1: Quaternion, q2: Quaternion, result: Quaternion): Quaternion;
    /**
     * Computes the spherical quadrangle interpolation between quaternions.
     * @example
     * // 1. compute the squad interpolation between two quaternions on a curve
     * const s0 = Cesium.Quaternion.computeInnerQuadrangle(quaternions[i - 1], quaternions[i], quaternions[i + 1], new Cesium.Quaternion());
     * const s1 = Cesium.Quaternion.computeInnerQuadrangle(quaternions[i], quaternions[i + 1], quaternions[i + 2], new Cesium.Quaternion());
     * const q = Cesium.Quaternion.squad(quaternions[i], quaternions[i + 1], s0, s1, t, new Cesium.Quaternion());
     *
     * // 2. compute the squad interpolation as above but where the first quaternion is a end point.
     * const s1 = Cesium.Quaternion.computeInnerQuadrangle(quaternions[0], quaternions[1], quaternions[2], new Cesium.Quaternion());
     * const q = Cesium.Quaternion.squad(quaternions[0], quaternions[1], quaternions[0], s1, t, new Cesium.Quaternion());
     * @param q0 - The first quaternion.
     * @param q1 - The second quaternion.
     * @param s0 - The first inner quadrangle.
     * @param s1 - The second inner quadrangle.
     * @param t - The time in [0,1] used to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static squad(q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result: Quaternion): Quaternion;
    /**
     * Computes the spherical linear interpolation or extrapolation at t using the provided quaternions.
     * This implementation is faster than {@link Quaternion#slerp}, but is only accurate up to 10<sup>-6</sup>.
     * @param start - The value corresponding to t at 0.0.
     * @param end - The value corresponding to t at 1.0.
     * @param t - The point along t at which to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter.
     */
    static fastSlerp(start: Quaternion, end: Quaternion, t: number, result: Quaternion): Quaternion;
    /**
     * Computes the spherical quadrangle interpolation between quaternions.
     * An implementation that is faster than {@link Quaternion#squad}, but less accurate.
     * @param q0 - The first quaternion.
     * @param q1 - The second quaternion.
     * @param s0 - The first inner quadrangle.
     * @param s1 - The second inner quadrangle.
     * @param t - The time in [0,1] used to interpolate.
     * @param result - The object onto which to store the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fastSquad(q0: Quaternion, q1: Quaternion, s0: Quaternion, s1: Quaternion, t: number, result: Quaternion): Quaternion;
    /**
     * Compares the provided quaternions componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first quaternion.
     * @param [right] - The second quaternion.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    static equals(left?: Quaternion, right?: Quaternion): boolean;
    /**
     * Compares the provided quaternions componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [left] - The first quaternion.
     * @param [right] - The second quaternion.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Quaternion, right?: Quaternion, epsilon?: number): boolean;
    /**
     * An immutable Quaternion instance initialized to (0.0, 0.0, 0.0, 0.0).
     */
    static readonly ZERO: Quaternion;
    /**
     * An immutable Quaternion instance initialized to (0.0, 0.0, 0.0, 1.0).
     */
    static readonly IDENTITY: Quaternion;
    /**
     * Duplicates this Quaternion instance.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Quaternion instance if one was not provided.
     */
    clone(result?: Quaternion): Quaternion;
    /**
     * Compares this and the provided quaternion componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side quaternion.
     * @returns <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    equals(right?: Quaternion): boolean;
    /**
     * Compares this and the provided quaternion componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side quaternion.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: Quaternion, epsilon?: number): boolean;
    /**
     * Returns a string representing this quaternion in the format (x, y, z, w).
     * @returns A string representing this Quaternion.
     */
    toString(): string;
}

/**
 * A spline that uses spherical linear (slerp) interpolation to create a quaternion curve.
 * The generated curve is in the class C<sup>1</sup>.
 * @param options - Object with the following properties:
 * @param options.times - An array of strictly increasing, unit-less, floating-point times at each point.
 *                The values are in no way connected to the clock time. They are the parameterization for the curve.
 * @param options.points - The array of {@link Quaternion} control points.
 */
export class QuaternionSpline {
    constructor(options: {
        times: number[];
        points: Quaternion[];
    });
    /**
     * An array of times for the control points.
     */
    readonly times: number[];
    /**
     * An array of {@link Quaternion} control points.
     */
    readonly points: Quaternion[];
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: Quaternion): Quaternion;
}

/**
 * A queue that can enqueue items at the end, and dequeue items from the front.
 */
export class Queue {
    constructor();
    /**
     * The length of the queue.
     */
    readonly length: number;
    /**
     * Enqueues the specified item.
     * @param item - The item to enqueue.
     */
    enqueue(item: any): void;
    /**
     * Dequeues an item.  Returns undefined if the queue is empty.
     * @returns The the dequeued item.
     */
    dequeue(): any;
    /**
     * Returns the item at the front of the queue.  Returns undefined if the queue is empty.
     * @returns The item at the front of the queue.
     */
    peek(): any;
    /**
     * Check whether this queue contains the specified item.
     * @param item - The item to search for.
     */
    contains(item: any): void;
    /**
     * Remove all items from the queue.
     */
    clear(): void;
    /**
     * Sort the items in the queue in-place.
     * @param compareFunction - A function that defines the sort order.
     */
    sort(compareFunction: Queue.Comparator): void;
}

export namespace Queue {
    /**
     * A function used to compare two items while sorting a queue.
     * @example
     * function compareNumbers(a, b) {
     *     return a - b;
     * }
     * @param a - An item in the array.
     * @param b - An item in the array.
     */
    type Comparator = (a: any, b: any) => number;
}

/**
 * Represents a ray that extends infinitely from the provided origin in the provided direction.
 * @param [origin = Cartesian3.ZERO] - The origin of the ray.
 * @param [direction = Cartesian3.ZERO] - The direction of the ray.
 */
export class Ray {
    constructor(origin?: Cartesian3, direction?: Cartesian3);
    /**
     * The origin of the ray.
     */
    origin: Cartesian3;
    /**
     * The direction of the ray.
     */
    direction: Cartesian3;
    /**
     * Duplicates a Ray instance.
     * @param ray - The ray to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Ray instance if one was not provided. (Returns undefined if ray is undefined)
     */
    static clone(ray: Ray, result?: Ray): Ray;
    /**
     * Computes the point along the ray given by r(t) = o + t*d,
     * where o is the origin of the ray and d is the direction.
     * @example
     * //Get the first intersection point of a ray and an ellipsoid.
     * const intersection = Cesium.IntersectionTests.rayEllipsoid(ray, ellipsoid);
     * const point = Cesium.Ray.getPoint(ray, intersection.start);
     * @param ray - The ray.
     * @param t - A scalar value.
     * @param [result] - The object in which the result will be stored.
     * @returns The modified result parameter, or a new instance if none was provided.
     */
    static getPoint(ray: Ray, t: number, result?: Cartesian3): Cartesian3;
}

/**
 * A two dimensional region specified as longitude and latitude coordinates.
 * @param [west = 0.0] - The westernmost longitude, in radians, in the range [-Pi, Pi].
 * @param [south = 0.0] - The southernmost latitude, in radians, in the range [-Pi/2, Pi/2].
 * @param [east = 0.0] - The easternmost longitude, in radians, in the range [-Pi, Pi].
 * @param [north = 0.0] - The northernmost latitude, in radians, in the range [-Pi/2, Pi/2].
 */
export class Rectangle {
    constructor(west?: number, south?: number, east?: number, north?: number);
    /**
     * The westernmost longitude in radians in the range [-Pi, Pi].
     */
    west: number;
    /**
     * The southernmost latitude in radians in the range [-Pi/2, Pi/2].
     */
    south: number;
    /**
     * The easternmost longitude in radians in the range [-Pi, Pi].
     */
    east: number;
    /**
     * The northernmost latitude in radians in the range [-Pi/2, Pi/2].
     */
    north: number;
    /**
     * Gets the width of the rectangle in radians.
     */
    readonly width: number;
    /**
     * Gets the height of the rectangle in radians.
     */
    readonly height: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: Rectangle, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new Rectangle instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: Rectangle): Rectangle;
    /**
     * Computes the width of a rectangle in radians.
     * @param rectangle - The rectangle to compute the width of.
     * @returns The width.
     */
    static computeWidth(rectangle: Rectangle): number;
    /**
     * Computes the height of a rectangle in radians.
     * @param rectangle - The rectangle to compute the height of.
     * @returns The height.
     */
    static computeHeight(rectangle: Rectangle): number;
    /**
     * Creates a rectangle given the boundary longitude and latitude in degrees.
     * @example
     * const rectangle = Cesium.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0);
     * @param [west = 0.0] - The westernmost longitude in degrees in the range [-180.0, 180.0].
     * @param [south = 0.0] - The southernmost latitude in degrees in the range [-90.0, 90.0].
     * @param [east = 0.0] - The easternmost longitude in degrees in the range [-180.0, 180.0].
     * @param [north = 0.0] - The northernmost latitude in degrees in the range [-90.0, 90.0].
     * @param [result] - The object onto which to store the result, or undefined if a new instance should be created.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static fromDegrees(west?: number, south?: number, east?: number, north?: number, result?: Rectangle): Rectangle;
    /**
     * Creates a rectangle given the boundary longitude and latitude in radians.
     * @example
     * const rectangle = Cesium.Rectangle.fromRadians(0.0, Math.PI/4, Math.PI/8, 3*Math.PI/4);
     * @param [west = 0.0] - The westernmost longitude in radians in the range [-Math.PI, Math.PI].
     * @param [south = 0.0] - The southernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].
     * @param [east = 0.0] - The easternmost longitude in radians in the range [-Math.PI, Math.PI].
     * @param [north = 0.0] - The northernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].
     * @param [result] - The object onto which to store the result, or undefined if a new instance should be created.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static fromRadians(west?: number, south?: number, east?: number, north?: number, result?: Rectangle): Rectangle;
    /**
     * Creates the smallest possible Rectangle that encloses all positions in the provided array.
     * @param cartographics - The list of Cartographic instances.
     * @param [result] - The object onto which to store the result, or undefined if a new instance should be created.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static fromCartographicArray(cartographics: Cartographic[], result?: Rectangle): Rectangle;
    /**
     * Creates the smallest possible Rectangle that encloses all positions in the provided array.
     * @param cartesians - The list of Cartesian instances.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid the cartesians are on.
     * @param [result] - The object onto which to store the result, or undefined if a new instance should be created.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static fromCartesianArray(cartesians: Cartesian3[], ellipsoid?: Ellipsoid, result?: Rectangle): Rectangle;
    /**
     * Create a rectangle from a bounding sphere, ignoring height.
     * @param boundingSphere - The bounding sphere.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid.
     * @param [result] - The object onto which to store the result, or undefined if a new instance should be created.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static fromBoundingSphere(boundingSphere: BoundingSphere, ellipsoid?: Ellipsoid, result?: Rectangle): Rectangle;
    /**
     * Duplicates a Rectangle.
     * @param rectangle - The rectangle to clone.
     * @param [result] - The object onto which to store the result, or undefined if a new instance should be created.
     * @returns The modified result parameter or a new Rectangle instance if none was provided. (Returns undefined if rectangle is undefined)
     */
    static clone(rectangle: Rectangle, result?: Rectangle): Rectangle;
    /**
     * Compares the provided Rectangles componentwise and returns
     * <code>true</code> if they pass an absolute or relative tolerance test,
     * <code>false</code> otherwise.
     * @param [left] - The first Rectangle.
     * @param [right] - The second Rectangle.
     * @param [absoluteEpsilon = 0] - The absolute epsilon tolerance to use for equality testing.
     * @returns <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    static equalsEpsilon(left?: Rectangle, right?: Rectangle, absoluteEpsilon?: number): boolean;
    /**
     * Duplicates this Rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    clone(result?: Rectangle): Rectangle;
    /**
     * Compares the provided Rectangle with this Rectangle componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [other] - The Rectangle to compare.
     * @returns <code>true</code> if the Rectangles are equal, <code>false</code> otherwise.
     */
    equals(other?: Rectangle): boolean;
    /**
     * Compares the provided rectangles and returns <code>true</code> if they are equal,
     * <code>false</code> otherwise.
     * @param [left] - The first Rectangle.
     * @param [right] - The second Rectangle.
     * @returns <code>true</code> if left and right are equal; otherwise <code>false</code>.
     */
    static equals(left?: Rectangle, right?: Rectangle): boolean;
    /**
     * Compares the provided Rectangle with this Rectangle componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [other] - The Rectangle to compare.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @returns <code>true</code> if the Rectangles are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(other?: Rectangle, epsilon?: number): boolean;
    /**
     * Computes the southwest corner of a rectangle.
     * @param rectangle - The rectangle for which to find the corner
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if none was provided.
     */
    static southwest(rectangle: Rectangle, result?: Cartographic): Cartographic;
    /**
     * Computes the northwest corner of a rectangle.
     * @param rectangle - The rectangle for which to find the corner
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if none was provided.
     */
    static northwest(rectangle: Rectangle, result?: Cartographic): Cartographic;
    /**
     * Computes the northeast corner of a rectangle.
     * @param rectangle - The rectangle for which to find the corner
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if none was provided.
     */
    static northeast(rectangle: Rectangle, result?: Cartographic): Cartographic;
    /**
     * Computes the southeast corner of a rectangle.
     * @param rectangle - The rectangle for which to find the corner
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if none was provided.
     */
    static southeast(rectangle: Rectangle, result?: Cartographic): Cartographic;
    /**
     * Computes the center of a rectangle.
     * @param rectangle - The rectangle for which to find the center
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Cartographic instance if none was provided.
     */
    static center(rectangle: Rectangle, result?: Cartographic): Cartographic;
    /**
     * Computes the intersection of two rectangles.  This function assumes that the rectangle's coordinates are
     * latitude and longitude in radians and produces a correct intersection, taking into account the fact that
     * the same angle can be represented with multiple values as well as the wrapping of longitude at the
     * anti-meridian.  For a simple intersection that ignores these factors and can be used with projected
     * coordinates, see {@link Rectangle.simpleIntersection}.
     * @param rectangle - On rectangle to find an intersection
     * @param otherRectangle - Another rectangle to find an intersection
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.
     */
    static intersection(rectangle: Rectangle, otherRectangle: Rectangle, result?: Rectangle): Rectangle | undefined;
    /**
     * Computes a simple intersection of two rectangles.  Unlike {@link Rectangle.intersection}, this function
     * does not attempt to put the angular coordinates into a consistent range or to account for crossing the
     * anti-meridian.  As such, it can be used for rectangles where the coordinates are not simply latitude
     * and longitude (i.e. projected coordinates).
     * @param rectangle - On rectangle to find an intersection
     * @param otherRectangle - Another rectangle to find an intersection
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.
     */
    static simpleIntersection(rectangle: Rectangle, otherRectangle: Rectangle, result?: Rectangle): Rectangle | undefined;
    /**
     * Computes a rectangle that is the union of two rectangles.
     * @param rectangle - A rectangle to enclose in rectangle.
     * @param otherRectangle - A rectangle to enclose in a rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static union(rectangle: Rectangle, otherRectangle: Rectangle, result?: Rectangle): Rectangle;
    /**
     * Computes a rectangle by enlarging the provided rectangle until it contains the provided cartographic.
     * @param rectangle - A rectangle to expand.
     * @param cartographic - A cartographic to enclose in a rectangle.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Rectangle instance if one was not provided.
     */
    static expand(rectangle: Rectangle, cartographic: Cartographic, result?: Rectangle): Rectangle;
    /**
     * Returns true if the cartographic is on or inside the rectangle, false otherwise.
     * @param rectangle - The rectangle
     * @param cartographic - The cartographic to test.
     * @returns true if the provided cartographic is inside the rectangle, false otherwise.
     */
    static contains(rectangle: Rectangle, cartographic: Cartographic): boolean;
    /**
     * Samples a rectangle so that it includes a list of Cartesian points suitable for passing to
     * {@link BoundingSphere#fromPoints}.  Sampling is necessary to account
     * for rectangles that cover the poles or cross the equator.
     * @param rectangle - The rectangle to subsample.
     * @param [ellipsoid = Ellipsoid.default] - The ellipsoid to use.
     * @param [surfaceHeight = 0.0] - The height of the rectangle above the ellipsoid.
     * @param [result] - The array of Cartesians onto which to store the result.
     * @returns The modified result parameter or a new Array of Cartesians instances if none was provided.
     */
    static subsample(rectangle: Rectangle, ellipsoid?: Ellipsoid, surfaceHeight?: number, result?: Cartesian3[]): Cartesian3[];
    /**
     * Computes a subsection of a rectangle from normalized coordinates in the range [0.0, 1.0].
     * @param rectangle - The rectangle to subsection.
     * @param westLerp - The west interpolation factor in the range [0.0, 1.0]. Must be less than or equal to eastLerp.
     * @param southLerp - The south interpolation factor in the range [0.0, 1.0]. Must be less than or equal to northLerp.
     * @param eastLerp - The east interpolation factor in the range [0.0, 1.0]. Must be greater than or equal to westLerp.
     * @param northLerp - The north interpolation factor in the range [0.0, 1.0]. Must be greater than or equal to southLerp.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new Rectangle instance if none was provided.
     */
    static subsection(rectangle: Rectangle, westLerp: number, southLerp: number, eastLerp: number, northLerp: number, result?: Rectangle): Rectangle;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * The largest possible rectangle.
     */
    static readonly MAX_VALUE: Rectangle;
}

/**
 * A description of a cartographic rectangle on an ellipsoid centered at the origin. Rectangle geometry can be rendered with both {@link Primitive} and {@link GroundPrimitive}.
 * @example
 * // 1. create a rectangle
 * const rectangle = new Cesium.RectangleGeometry({
 *   ellipsoid : Cesium.Ellipsoid.default,
 *   rectangle : Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
 *   height : 10000.0
 * });
 * const geometry = Cesium.RectangleGeometry.createGeometry(rectangle);
 *
 * // 2. create an extruded rectangle without a top
 * const rectangle = new Cesium.RectangleGeometry({
 *   ellipsoid : Cesium.Ellipsoid.default,
 *   rectangle : Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
 *   height : 10000.0,
 *   extrudedHeight: 300000
 * });
 * const geometry = Cesium.RectangleGeometry.createGeometry(rectangle);
 * @param options - Object with the following properties:
 * @param options.rectangle - A cartographic rectangle with north, south, east and west properties in radians.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the rectangle lies.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.height = 0.0] - The distance in meters between the rectangle and the ellipsoid surface.
 * @param [options.rotation = 0.0] - The rotation of the rectangle, in radians. A positive rotation is counter-clockwise.
 * @param [options.stRotation = 0.0] - The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.
 * @param [options.extrudedHeight] - The distance in meters between the rectangle's extruded face and the ellipsoid surface.
 */
export class RectangleGeometry {
    constructor(options: {
        rectangle: Rectangle;
        vertexFormat?: VertexFormat;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        height?: number;
        rotation?: number;
        stRotation?: number;
        extrudedHeight?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: RectangleGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new RectangleGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: RectangleGeometry): RectangleGeometry;
    /**
     * Computes the bounding rectangle based on the provided options
     * @param options - Object with the following properties:
     * @param options.rectangle - A cartographic rectangle with north, south, east and west properties in radians.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the rectangle lies.
     * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param [options.rotation = 0.0] - The rotation of the rectangle, in radians. A positive rotation is counter-clockwise.
     * @param [result] - An object in which to store the result.
     * @returns The result rectangle
     */
    static computeRectangle(options: {
        rectangle: Rectangle;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        rotation?: number;
    }, result?: Rectangle): Rectangle;
    /**
     * Computes the geometric representation of a rectangle, including its vertices, indices, and a bounding sphere.
     * @param rectangleGeometry - A description of the rectangle.
     * @returns The computed vertices and indices.
     */
    static createGeometry(rectangleGeometry: RectangleGeometry): Geometry | undefined;
}

/**
 * A description of the outline of a a cartographic rectangle on an ellipsoid centered at the origin.
 * @example
 * const rectangle = new Cesium.RectangleOutlineGeometry({
 *   ellipsoid : Cesium.Ellipsoid.WGS84,
 *   rectangle : Cesium.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
 *   height : 10000.0
 * });
 * const geometry = Cesium.RectangleOutlineGeometry.createGeometry(rectangle);
 * @param options - Object with the following properties:
 * @param options.rectangle - A cartographic rectangle with north, south, east and west properties in radians.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid on which the rectangle lies.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.height = 0.0] - The distance in meters between the rectangle and the ellipsoid surface.
 * @param [options.rotation = 0.0] - The rotation of the rectangle, in radians. A positive rotation is counter-clockwise.
 * @param [options.extrudedHeight] - The distance in meters between the rectangle's extruded face and the ellipsoid surface.
 */
export class RectangleOutlineGeometry {
    constructor(options: {
        rectangle: Rectangle;
        ellipsoid?: Ellipsoid;
        granularity?: number;
        height?: number;
        rotation?: number;
        extrudedHeight?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: RectangleOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new RectangleOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: RectangleOutlineGeometry): RectangleOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of a rectangle, including its vertices, indices, and a bounding sphere.
     * @param rectangleGeometry - A description of the rectangle outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(rectangleGeometry: RectangleOutlineGeometry): Geometry | undefined;
}

/**
 * Constants for identifying well-known reference frames.
 */
export enum ReferenceFrame {
    /**
     * The fixed frame.
     */
    FIXED = 0,
    /**
     * The inertial frame.
     */
    INERTIAL = 1
}

/**
 * Constructs an exception object that is thrown due to an error that can occur at runtime, e.g.,
 * out of memory, could not compile shader, etc.  If a function may throw this
 * exception, the calling code should be prepared to catch it.
 * <br /><br />
 * On the other hand, a {@link DeveloperError} indicates an exception due
 * to a developer error, e.g., invalid argument, that usually indicates a bug in the
 * calling code.
 * @param [message] - The error message for this exception.
 */
export class RuntimeError extends Error {
    constructor(message?: string);
    /**
     * 'RuntimeError' indicating that this exception was thrown due to a runtime error.
     */
    readonly name: string;
    /**
     * The explanation for why this exception was thrown.
     */
    readonly message: string;
    /**
     * The stack trace of this exception, if available.
     */
    readonly stack: string;
}

/**
 * Value and type information for per-instance geometry attribute that determines if the geometry instance will be shown.
 * @example
 * const instance = new Cesium.GeometryInstance({
 *   geometry : new Cesium.BoxGeometry({
 *     vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL,
 *     minimum : new Cesium.Cartesian3(-250000.0, -250000.0, -250000.0),
 *     maximum : new Cesium.Cartesian3(250000.0, 250000.0, 250000.0)
 *   }),
 *   modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
 *     Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000000.0), new Cesium.Matrix4()),
 *   id : 'box',
 *   attributes : {
 *     show : new Cesium.ShowGeometryInstanceAttribute(false)
 *   }
 * });
 * @param [show = true] - Determines if the geometry instance will be shown.
 */
export class ShowGeometryInstanceAttribute {
    constructor(show?: boolean);
    /**
     * The values for the attributes stored in a typed array.
     */
    value: Uint8Array;
    /**
     * The datatype of each component in the attribute, e.g., individual elements in
     * {@link ColorGeometryInstanceAttribute#value}.
     */
    readonly componentDatatype: ComponentDatatype;
    /**
     * The number of components in the attributes, i.e., {@link ColorGeometryInstanceAttribute#value}.
     */
    readonly componentsPerAttribute: number;
    /**
     * When <code>true</code> and <code>componentDatatype</code> is an integer format,
     * indicate that the components should be mapped to the range [0, 1] (unsigned)
     * or [-1, 1] (signed) when they are accessed as floating-point for rendering.
     */
    readonly normalize: boolean;
    /**
     * Converts a boolean show to a typed array that can be used to assign a show attribute.
     * @example
     * const attributes = primitive.getGeometryInstanceAttributes('an id');
     * attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(true, attributes.show);
     * @param show - The show value.
     * @param [result] - The array to store the result in, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    static toValue(show: boolean, result?: Uint8Array): Uint8Array;
}

/**
 * A description of a polyline modeled as a line strip; the first two positions define a line segment,
 * and each additional position defines a line segment from the previous position.
 * @example
 * // A polyline with two connected line segments
 * const polyline = new Cesium.SimplePolylineGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArray([
 *     0.0, 0.0,
 *     5.0, 0.0,
 *     5.0, 5.0
 *   ])
 * });
 * const geometry = Cesium.SimplePolylineGeometry.createGeometry(polyline);
 * @param options - Object with the following properties:
 * @param options.positions - An array of {@link Cartesian3} defining the positions in the polyline as a line strip.
 * @param [options.colors] - An Array of {@link Color} defining the per vertex or per segment colors.
 * @param [options.colorsPerVertex = false] - A boolean that determines whether the colors will be flat across each segment of the line or interpolated across the vertices.
 * @param [options.arcType = ArcType.GEODESIC] - The type of line the polyline segments must follow.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude if options.arcType is not ArcType.NONE. Determines the number of positions in the buffer.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid to be used as a reference.
 */
export class SimplePolylineGeometry {
    constructor(options: {
        positions: Cartesian3[];
        colors?: Color[];
        colorsPerVertex?: boolean;
        arcType?: ArcType;
        granularity?: number;
        ellipsoid?: Ellipsoid;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: SimplePolylineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new SimplePolylineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: SimplePolylineGeometry): SimplePolylineGeometry;
    /**
     * Computes the geometric representation of a simple polyline, including its vertices, indices, and a bounding sphere.
     * @param simplePolylineGeometry - A description of the polyline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(simplePolylineGeometry: SimplePolylineGeometry): Geometry | undefined;
}

/**
 * A description of a sphere centered at the origin.
 * @example
 * const sphere = new Cesium.SphereGeometry({
 *   radius : 100.0,
 *   vertexFormat : Cesium.VertexFormat.POSITION_ONLY
 * });
 * const geometry = Cesium.SphereGeometry.createGeometry(sphere);
 * @param [options] - Object with the following properties:
 * @param [options.radius = 1.0] - The radius of the sphere.
 * @param [options.stackPartitions = 64] - The number of times to partition the ellipsoid into stacks.
 * @param [options.slicePartitions = 64] - The number of times to partition the ellipsoid into radial slices.
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class SphereGeometry {
    constructor(options?: {
        radius?: number;
        stackPartitions?: number;
        slicePartitions?: number;
        vertexFormat?: VertexFormat;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: SphereGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new SphereGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: SphereGeometry): SphereGeometry;
    /**
     * Computes the geometric representation of a sphere, including its vertices, indices, and a bounding sphere.
     * @param sphereGeometry - A description of the sphere.
     * @returns The computed vertices and indices.
     */
    static createGeometry(sphereGeometry: SphereGeometry): Geometry | undefined;
}

/**
 * A description of the outline of a sphere.
 * @example
 * const sphere = new Cesium.SphereOutlineGeometry({
 *   radius : 100.0,
 *   stackPartitions : 6,
 *   slicePartitions: 5
 * });
 * const geometry = Cesium.SphereOutlineGeometry.createGeometry(sphere);
 * @param [options] - Object with the following properties:
 * @param [options.radius = 1.0] - The radius of the sphere.
 * @param [options.stackPartitions = 10] - The count of stacks for the sphere (1 greater than the number of parallel lines).
 * @param [options.slicePartitions = 8] - The count of slices for the sphere (Equal to the number of radial lines).
 * @param [options.subdivisions = 200] - The number of points per line, determining the granularity of the curvature .
 */
export class SphereOutlineGeometry {
    constructor(options?: {
        radius?: number;
        stackPartitions?: number;
        slicePartitions?: number;
        subdivisions?: number;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: SphereOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new SphereOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: SphereOutlineGeometry): SphereOutlineGeometry;
    /**
     * Computes the geometric representation of an outline of a sphere, including its vertices, indices, and a bounding sphere.
     * @param sphereGeometry - A description of the sphere outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(sphereGeometry: SphereOutlineGeometry): Geometry | undefined;
}

/**
 * A set of curvilinear 3-dimensional coordinates.
 * @param [clock = 0.0] - The angular coordinate lying in the xy-plane measured from the positive x-axis and toward the positive y-axis.
 * @param [cone = 0.0] - The angular coordinate measured from the positive z-axis and toward the negative z-axis.
 * @param [magnitude = 1.0] - The linear coordinate measured from the origin.
 */
export class Spherical {
    constructor(clock?: number, cone?: number, magnitude?: number);
    /**
     * The clock component.
     */
    clock: number;
    /**
     * The cone component.
     */
    cone: number;
    /**
     * The magnitude component.
     */
    magnitude: number;
    /**
     * Converts the provided Cartesian3 into Spherical coordinates.
     * @param cartesian3 - The Cartesian3 to be converted to Spherical.
     * @param [result] - The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new instance if one was not provided.
     */
    static fromCartesian3(cartesian3: Cartesian3, result?: Spherical): Spherical;
    /**
     * Creates a duplicate of a Spherical.
     * @param spherical - The spherical to clone.
     * @param [result] - The object to store the result into, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined. (Returns undefined if spherical is undefined)
     */
    static clone(spherical: Spherical, result?: Spherical): Spherical;
    /**
     * Computes the normalized version of the provided spherical.
     * @param spherical - The spherical to be normalized.
     * @param [result] - The object to store the result into, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    static normalize(spherical: Spherical, result?: Spherical): Spherical;
    /**
     * Returns true if the first spherical is equal to the second spherical, false otherwise.
     * @param [left] - The first Spherical to be compared.
     * @param [right] - The second Spherical to be compared.
     * @returns true if the first spherical is equal to the second spherical, false otherwise.
     */
    static equals(left?: Spherical, right?: Spherical): boolean;
    /**
     * Returns true if the first spherical is within the provided epsilon of the second spherical, false otherwise.
     * @param left - The first Spherical to be compared.
     * @param right - The second Spherical to be compared.
     * @param [epsilon = 0.0] - The epsilon to compare against.
     * @returns true if the first spherical is within the provided epsilon of the second spherical, false otherwise.
     */
    static equalsEpsilon(left: Spherical, right: Spherical, epsilon?: number): boolean;
    /**
     * Returns true if this spherical is equal to the provided spherical, false otherwise.
     * @param [other] - The Spherical to be compared.
     * @returns true if this spherical is equal to the provided spherical, false otherwise.
     */
    equals(other?: Spherical): boolean;
    /**
     * Creates a duplicate of this Spherical.
     * @param [result] - The object to store the result into, if undefined a new instance will be created.
     * @returns The modified result parameter or a new instance if result was undefined.
     */
    clone(result?: Spherical): Spherical;
    /**
     * Returns true if this spherical is within the provided epsilon of the provided spherical, false otherwise.
     * @param other - The Spherical to be compared.
     * @param epsilon - The epsilon to compare against.
     * @returns true if this spherical is within the provided epsilon of the provided spherical, false otherwise.
     */
    equalsEpsilon(other: Spherical, epsilon: number): boolean;
    /**
     * Returns a string representing this instance in the format (clock, cone, magnitude).
     * @returns A string representing this instance.
     */
    toString(): string;
}

/**
 * Creates a curve parameterized and evaluated by time. This type describes an interface
 * and is not intended to be instantiated directly.
 */
export class Spline {
    constructor();
    /**
     * An array of times for the control points.
     */
    times: number[];
    /**
     * An array of control points.
     */
    points: Cartesian3[] | Quaternion[];
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: Cartesian3 | Quaternion | number[]): Cartesian3 | Quaternion | number[];
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @param startIndex - The index from which to start the search.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number, startIndex: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around the animation period.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
}

/**
 * A spline that is composed of piecewise constants representing a step function.
 * @example
 * const times = [ 0.0, 1.5, 3.0, 4.5, 6.0 ];
 * const spline = new Cesium.SteppedSpline({
 *     times : times,
 *     points : [
 *         new Cesium.Cartesian3(1235398.0, -4810983.0, 4146266.0),
 *         new Cesium.Cartesian3(1372574.0, -5345182.0, 4606657.0),
 *         new Cesium.Cartesian3(-757983.0, -5542796.0, 4514323.0),
 *         new Cesium.Cartesian3(-2821260.0, -5248423.0, 4021290.0),
 *         new Cesium.Cartesian3(-2539788.0, -4724797.0, 3620093.0)
 *     ]
 * });
 *
 * const p0 = spline.evaluate(times[0]);
 * @param options - Object with the following properties:
 * @param options.times - An array of strictly increasing, unit-less, floating-point times at each point. The values are in no way connected to the clock time. They are the parameterization for the curve.
 * @param options.points - The array of control points.
 */
export class SteppedSpline {
    constructor(options: {
        times: number[];
        points: number[] | Cartesian3[] | Quaternion[];
    });
    /**
     * An array of times for the control points.
     */
    readonly times: number[];
    /**
     * An array of control points.
     */
    readonly points: number[] | Cartesian3[] | Quaternion[];
    /**
     * Finds an index <code>i</code> in <code>times</code> such that the parameter
     * <code>time</code> is in the interval <code>[times[i], times[i + 1]]</code>.
     * @param time - The time.
     * @param startIndex - The index from which to start the search.
     * @returns The index for the element at the start of the interval.
     */
    findTimeInterval(time: number, startIndex: number): number;
    /**
     * Wraps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, wrapped around to the updated animation.
     */
    wrapTime(time: number): number;
    /**
     * Clamps the given time to the period covered by the spline.
     * @param time - The time.
     * @returns The time, clamped to the animation period.
     */
    clampTime(time: number): number;
    /**
     * Evaluates the curve at a given time.
     * @param time - The time at which to evaluate the curve.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new instance of the point on the curve at the given time.
     */
    evaluate(time: number, result?: Cartesian3 | Quaternion): number | Cartesian3 | Quaternion;
}

/**
 * Represents a point in stereographic coordinates, which can be obtained by projecting a cartesian coordinate from one pole onto a tangent plane at the other pole.
 * The stereographic projection faithfully represents the relative directions of all great circles passing through its center point.
 * To faithfully represents angles everywhere, this is a conformal projection, which means points are projected onto an arbrary sphere.
 * @param [position] - The steroegraphic coordinates.
 * @param [tangentPlane] - The tangent plane onto which the point was projected.
 */
export function Stereographic(position?: Cartesian2, tangentPlane?: EllipseGeometry): void;

/**
 * Constants for time conversions like those done by {@link JulianDate}.
 */
export namespace TimeConstants {
    /**
     * The number of seconds in one millisecond: <code>0.001</code>
     */
    const SECONDS_PER_MILLISECOND = 0.001;
    /**
     * The number of seconds in one minute: <code>60</code>.
     */
    const SECONDS_PER_MINUTE = 60;
    /**
     * The number of minutes in one hour: <code>60</code>.
     */
    const MINUTES_PER_HOUR = 60;
    /**
     * The number of hours in one day: <code>24</code>.
     */
    const HOURS_PER_DAY = 24;
    /**
     * The number of seconds in one hour: <code>3600</code>.
     */
    const SECONDS_PER_HOUR = 3600;
    /**
     * The number of minutes in one day: <code>1440</code>.
     */
    const MINUTES_PER_DAY = 1440;
    /**
     * The number of seconds in one day, ignoring leap seconds: <code>86400</code>.
     */
    const SECONDS_PER_DAY = 86400;
    /**
     * The number of days in one Julian century: <code>36525</code>.
     */
    const DAYS_PER_JULIAN_CENTURY = 36525;
    /**
     * One trillionth of a second.
     */
    const PICOSECOND = 1e-9;
    /**
     * The number of days to subtract from a Julian date to determine the
     * modified Julian date, which gives the number of days since midnight
     * on November 17, 1858.
     */
    const MODIFIED_JULIAN_DATE_DIFFERENCE = 2400000.5;
}

/**
 * An interval defined by a start and a stop time; optionally including those times as part of the interval.
 * Arbitrary data can optionally be associated with each instance for used with {@link TimeIntervalCollection}.
 * @example
 * // Create an instance that spans August 1st, 1980 and is associated
 * // with a Cartesian position.
 * const timeInterval = new Cesium.TimeInterval({
 *     start : Cesium.JulianDate.fromIso8601('1980-08-01T00:00:00Z'),
 *     stop : Cesium.JulianDate.fromIso8601('1980-08-02T00:00:00Z'),
 *     isStartIncluded : true,
 *     isStopIncluded : false,
 *     data : Cesium.Cartesian3.fromDegrees(39.921037, -75.170082)
 * });
 * @example
 * // Create two instances from ISO 8601 intervals with associated numeric data
 * // then compute their intersection, summing the data they contain.
 * const left = Cesium.TimeInterval.fromIso8601({
 *     iso8601 : '2000/2010',
 *     data : 2
 * });
 *
 * const right = Cesium.TimeInterval.fromIso8601({
 *     iso8601 : '1995/2005',
 *     data : 3
 * });
 *
 * //The result of the below intersection will be an interval equivalent to
 * //const intersection = Cesium.TimeInterval.fromIso8601({
 * //  iso8601 : '2000/2005',
 * //  data : 5
 * //});
 * const intersection = new Cesium.TimeInterval();
 * Cesium.TimeInterval.intersect(left, right, intersection, function(leftData, rightData) {
 *     return leftData + rightData;
 * });
 * @example
 * // Check if an interval contains a specific time.
 * const dateToCheck = Cesium.JulianDate.fromIso8601('1982-09-08T11:30:00Z');
 * const containsDate = Cesium.TimeInterval.contains(timeInterval, dateToCheck);
 * @param [options] - Object with the following properties:
 * @param [options.start = new JulianDate()] - The start time of the interval.
 * @param [options.stop = new JulianDate()] - The stop time of the interval.
 * @param [options.isStartIncluded = true] - <code>true</code> if <code>options.start</code> is included in the interval, <code>false</code> otherwise.
 * @param [options.isStopIncluded = true] - <code>true</code> if <code>options.stop</code> is included in the interval, <code>false</code> otherwise.
 * @param [options.data] - Arbitrary data associated with this interval.
 */
export class TimeInterval {
    constructor(options?: {
        start?: JulianDate;
        stop?: JulianDate;
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
        data?: any;
    });
    /**
     * Gets or sets the start time of this interval.
     */
    start: JulianDate;
    /**
     * Gets or sets the stop time of this interval.
     */
    stop: JulianDate;
    /**
     * Gets or sets the data associated with this interval.
     */
    data: any;
    /**
     * Gets or sets whether or not the start time is included in this interval.
     */
    isStartIncluded: boolean;
    /**
     * Gets or sets whether or not the stop time is included in this interval.
     */
    isStopIncluded: boolean;
    /**
     * Gets whether or not this interval is empty.
     */
    readonly isEmpty: boolean;
    /**
     * Creates a new instance from a {@link http://en.wikipedia.org/wiki/ISO_8601|ISO 8601} interval.
     * @param options - Object with the following properties:
     * @param options.iso8601 - An ISO 8601 interval.
     * @param [options.isStartIncluded = true] - <code>true</code> if <code>options.start</code> is included in the interval, <code>false</code> otherwise.
     * @param [options.isStopIncluded = true] - <code>true</code> if <code>options.stop</code> is included in the interval, <code>false</code> otherwise.
     * @param [options.data] - Arbitrary data associated with this interval.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromIso8601(options: {
        iso8601: string;
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
        data?: any;
    }, result?: TimeInterval): TimeInterval;
    /**
     * Creates an ISO8601 representation of the provided interval.
     * @param timeInterval - The interval to be converted.
     * @param [precision] - The number of fractional digits used to represent the seconds component.  By default, the most precise representation is used.
     * @returns The ISO8601 representation of the provided interval.
     */
    static toIso8601(timeInterval: TimeInterval, precision?: number): string;
    /**
     * Duplicates the provided instance.
     * @param [timeInterval] - The instance to clone.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static clone(timeInterval?: TimeInterval, result?: TimeInterval): TimeInterval;
    /**
     * Compares two instances and returns <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [left] - The first instance.
     * @param [right] - The second instance.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     * @returns <code>true</code> if the dates are equal; otherwise, <code>false</code>.
     */
    static equals(left?: TimeInterval, right?: TimeInterval, dataComparer?: TimeInterval.DataComparer): boolean;
    /**
     * Compares two instances and returns <code>true</code> if they are within <code>epsilon</code> seconds of
     * each other.  That is, in order for the dates to be considered equal (and for
     * this function to return <code>true</code>), the absolute value of the difference between them, in
     * seconds, must be less than <code>epsilon</code>.
     * @param [left] - The first instance.
     * @param [right] - The second instance.
     * @param [epsilon = 0] - The maximum number of seconds that should separate the two instances.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     * @returns <code>true</code> if the two dates are within <code>epsilon</code> seconds of each other; otherwise <code>false</code>.
     */
    static equalsEpsilon(left?: TimeInterval, right?: TimeInterval, epsilon?: number, dataComparer?: TimeInterval.DataComparer): boolean;
    /**
     * Computes the intersection of two intervals, optionally merging their data.
     * @param left - The first interval.
     * @param [right] - The second interval.
     * @param [result] - An existing instance to use for the result.
     * @param [mergeCallback] - A function which merges the data of the two intervals. If omitted, the data from the left interval will be used.
     * @returns The modified result parameter.
     */
    static intersect(left: TimeInterval, right?: TimeInterval, result?: TimeInterval, mergeCallback?: TimeInterval.MergeCallback): TimeInterval;
    /**
     * Checks if the specified date is inside the provided interval.
     * @param timeInterval - The interval.
     * @param julianDate - The date to check.
     * @returns <code>true</code> if the interval contains the specified date, <code>false</code> otherwise.
     */
    static contains(timeInterval: TimeInterval, julianDate: JulianDate): boolean;
    /**
     * Duplicates this instance.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    clone(result?: TimeInterval): TimeInterval;
    /**
     * Compares this instance against the provided instance componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side interval.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: TimeInterval, dataComparer?: TimeInterval.DataComparer): boolean;
    /**
     * Compares this instance against the provided instance componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @param [right] - The right hand side interval.
     * @param [epsilon = 0] - The epsilon to use for equality testing.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     * @returns <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    equalsEpsilon(right?: TimeInterval, epsilon?: number, dataComparer?: TimeInterval.DataComparer): boolean;
    /**
     * Creates a string representing this TimeInterval in ISO8601 format.
     * @returns A string representing this TimeInterval in ISO8601 format.
     */
    toString(): string;
    /**
     * An immutable empty interval.
     */
    static readonly EMPTY: TimeInterval;
}

export namespace TimeInterval {
    /**
     * Function interface for merging interval data.
     * @param leftData - The first data instance.
     * @param rightData - The second data instance.
     */
    type MergeCallback = (leftData: any, rightData: any) => any;
    /**
     * Function interface for comparing interval data.
     * @param leftData - The first data instance.
     * @param rightData - The second data instance.
     */
    type DataComparer = (leftData: any, rightData: any) => boolean;
}

/**
 * A non-overlapping collection of {@link TimeInterval} instances sorted by start time.
 * @param [intervals] - An array of intervals to add to the collection.
 */
export class TimeIntervalCollection {
    constructor(intervals?: TimeInterval[]);
    /**
     * Gets an event that is raised whenever the collection of intervals change.
     */
    readonly changedEvent: Event;
    /**
     * Gets the start time of the collection.
     */
    readonly start: JulianDate;
    /**
     * Gets whether or not the start time is included in the collection.
     */
    readonly isStartIncluded: boolean;
    /**
     * Gets the stop time of the collection.
     */
    readonly stop: JulianDate;
    /**
     * Gets whether or not the stop time is included in the collection.
     */
    readonly isStopIncluded: boolean;
    /**
     * Gets the number of intervals in the collection.
     */
    readonly length: number;
    /**
     * Gets whether or not the collection is empty.
     */
    readonly isEmpty: boolean;
    /**
     * Compares this instance against the provided instance componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side collection.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: TimeIntervalCollection, dataComparer?: TimeInterval.DataComparer): boolean;
    /**
     * Gets the interval at the specified index.
     * @param index - The index of the interval to retrieve.
     * @returns The interval at the specified index, or <code>undefined</code> if no interval exists as that index.
     */
    get(index: number): TimeInterval | undefined;
    /**
     * Removes all intervals from the collection.
     */
    removeAll(): void;
    /**
     * Finds and returns the interval that contains the specified date.
     * @param date - The date to search for.
     * @returns The interval containing the specified date, <code>undefined</code> if no such interval exists.
     */
    findIntervalContainingDate(date: JulianDate): TimeInterval | undefined;
    /**
     * Finds and returns the data for the interval that contains the specified date.
     * @param date - The date to search for.
     * @returns The data for the interval containing the specified date, or <code>undefined</code> if no such interval exists.
     */
    findDataForIntervalContainingDate(date: JulianDate): any;
    /**
     * Checks if the specified date is inside this collection.
     * @param julianDate - The date to check.
     * @returns <code>true</code> if the collection contains the specified date, <code>false</code> otherwise.
     */
    contains(julianDate: JulianDate): boolean;
    /**
     * Finds and returns the index of the interval in the collection that contains the specified date.
     * @param date - The date to search for.
     * @returns The index of the interval that contains the specified date, if no such interval exists,
     * it returns a negative number which is the bitwise complement of the index of the next interval that
     * starts after the date, or if no interval starts after the specified date, the bitwise complement of
     * the length of the collection.
     */
    indexOf(date: JulianDate): number;
    /**
     * Returns the first interval in the collection that matches the specified parameters.
     * All parameters are optional and <code>undefined</code> parameters are treated as a don't care condition.
     * @param [options] - Object with the following properties:
     * @param [options.start] - The start time of the interval.
     * @param [options.stop] - The stop time of the interval.
     * @param [options.isStartIncluded] - <code>true</code> if <code>options.start</code> is included in the interval, <code>false</code> otherwise.
     * @param [options.isStopIncluded] - <code>true</code> if <code>options.stop</code> is included in the interval, <code>false</code> otherwise.
     * @returns The first interval in the collection that matches the specified parameters.
     */
    findInterval(options?: {
        start?: JulianDate;
        stop?: JulianDate;
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
    }): TimeInterval | undefined;
    /**
     * Adds an interval to the collection, merging intervals that contain the same data and
     * splitting intervals of different data as needed in order to maintain a non-overlapping collection.
     * The data in the new interval takes precedence over any existing intervals in the collection.
     * @param interval - The interval to add.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     */
    addInterval(interval: TimeInterval, dataComparer?: TimeInterval.DataComparer): void;
    /**
     * Removes the specified interval from this interval collection, creating a hole over the specified interval.
     * The data property of the input interval is ignored.
     * @param interval - The interval to remove.
     * @returns <code>true</code> if the interval was removed, <code>false</code> if no part of the interval was in the collection.
     */
    removeInterval(interval: TimeInterval): boolean;
    /**
     * Creates a new instance that is the intersection of this collection and the provided collection.
     * @param other - The collection to intersect with.
     * @param [dataComparer] - A function which compares the data of the two intervals.  If omitted, reference equality is used.
     * @param [mergeCallback] - A function which merges the data of the two intervals. If omitted, the data from the left interval will be used.
     * @returns A new TimeIntervalCollection which is the intersection of this collection and the provided collection.
     */
    intersect(other: TimeIntervalCollection, dataComparer?: TimeInterval.DataComparer, mergeCallback?: TimeInterval.MergeCallback): TimeIntervalCollection;
    /**
     * Creates a new instance from a JulianDate array.
     * @param options - Object with the following properties:
     * @param options.julianDates - An array of ISO 8601 dates.
     * @param [options.isStartIncluded = true] - <code>true</code> if start time is included in the interval, <code>false</code> otherwise.
     * @param [options.isStopIncluded = true] - <code>true</code> if stop time is included in the interval, <code>false</code> otherwise.
     * @param [options.leadingInterval = false] - <code>true</code> if you want to add a interval from Iso8601.MINIMUM_VALUE to start time,  <code>false</code> otherwise.
     * @param [options.trailingInterval = false] - <code>true</code> if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE,  <code>false</code> otherwise.
     * @param [options.dataCallback] - A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromJulianDateArray(options: {
        julianDates: JulianDate[];
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
        leadingInterval?: boolean;
        trailingInterval?: boolean;
        dataCallback?: (...params: any[]) => any;
    }, result?: TimeIntervalCollection): TimeIntervalCollection;
    /**
     * Creates a new instance from an {@link http://en.wikipedia.org/wiki/ISO_8601|ISO 8601} time interval (start/end/duration).
     * @param options - Object with the following properties:
     * @param options.iso8601 - An ISO 8601 interval.
     * @param [options.isStartIncluded = true] - <code>true</code> if start time is included in the interval, <code>false</code> otherwise.
     * @param [options.isStopIncluded = true] - <code>true</code> if stop time is included in the interval, <code>false</code> otherwise.
     * @param [options.leadingInterval = false] - <code>true</code> if you want to add a interval from Iso8601.MINIMUM_VALUE to start time,  <code>false</code> otherwise.
     * @param [options.trailingInterval = false] - <code>true</code> if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE,  <code>false</code> otherwise.
     * @param [options.dataCallback] - A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromIso8601(options: {
        iso8601: string;
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
        leadingInterval?: boolean;
        trailingInterval?: boolean;
        dataCallback?: (...params: any[]) => any;
    }, result?: TimeIntervalCollection): TimeIntervalCollection;
    /**
     * Creates a new instance from a {@link http://en.wikipedia.org/wiki/ISO_8601|ISO 8601} date array.
     * @param options - Object with the following properties:
     * @param options.iso8601Dates - An array of ISO 8601 dates.
     * @param [options.isStartIncluded = true] - <code>true</code> if start time is included in the interval, <code>false</code> otherwise.
     * @param [options.isStopIncluded = true] - <code>true</code> if stop time is included in the interval, <code>false</code> otherwise.
     * @param [options.leadingInterval = false] - <code>true</code> if you want to add a interval from Iso8601.MINIMUM_VALUE to start time,  <code>false</code> otherwise.
     * @param [options.trailingInterval = false] - <code>true</code> if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE,  <code>false</code> otherwise.
     * @param [options.dataCallback] - A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromIso8601DateArray(options: {
        iso8601Dates: string[];
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
        leadingInterval?: boolean;
        trailingInterval?: boolean;
        dataCallback?: (...params: any[]) => any;
    }, result?: TimeIntervalCollection): TimeIntervalCollection;
    /**
     * Creates a new instance from a {@link http://en.wikipedia.org/wiki/ISO_8601|ISO 8601} duration array.
     * @param options - Object with the following properties:
     * @param options.epoch - An date that the durations are relative to.
     * @param options.iso8601Durations - An array of ISO 8601 durations.
     * @param [options.relativeToPrevious = false] - <code>true</code> if durations are relative to previous date, <code>false</code> if always relative to the epoch.
     * @param [options.isStartIncluded = true] - <code>true</code> if start time is included in the interval, <code>false</code> otherwise.
     * @param [options.isStopIncluded = true] - <code>true</code> if stop time is included in the interval, <code>false</code> otherwise.
     * @param [options.leadingInterval = false] - <code>true</code> if you want to add a interval from Iso8601.MINIMUM_VALUE to start time,  <code>false</code> otherwise.
     * @param [options.trailingInterval = false] - <code>true</code> if you want to add a interval from stop time to Iso8601.MAXIMUM_VALUE,  <code>false</code> otherwise.
     * @param [options.dataCallback] - A function that will be return the data that is called with each interval before it is added to the collection. If unspecified, the data will be the index in the collection.
     * @param [result] - An existing instance to use for the result.
     * @returns The modified result parameter or a new instance if none was provided.
     */
    static fromIso8601DurationArray(options: {
        epoch: JulianDate;
        iso8601Durations: string;
        relativeToPrevious?: boolean;
        isStartIncluded?: boolean;
        isStopIncluded?: boolean;
        leadingInterval?: boolean;
        trailingInterval?: boolean;
        dataCallback?: (...params: any[]) => any;
    }, result?: TimeIntervalCollection): TimeIntervalCollection;
}

/**
 * Provides the type of time standards which JulianDate can take as input.
 */
export enum TimeStandard {
    /**
     * Represents the coordinated Universal Time (UTC) time standard.
     *
     * UTC is related to TAI according to the relationship
     * <code>UTC = TAI - deltaT</code> where <code>deltaT</code> is the number of leap
     * seconds which have been introduced as of the time in TAI.
     */
    UTC = 0,
    /**
     * Represents the International Atomic Time (TAI) time standard.
     * TAI is the principal time standard to which the other time standards are related.
     */
    TAI = 1
}

/**
 * Constants for identifying well-known tracking reference frames.
 */
export enum TrackingReferenceFrame {
    /**
     * Auto-detect algorithm. The reference frame used to track the Entity will
     * be automatically selected based on its trajectory: near-surface slow moving
     * objects will be tracked in the entity's local east-north-up reference
     * frame, while faster objects like satellites will use VVLH (Vehicle Velocity,
     * Local Horizontal).
     */
    AUTODETECT = 0,
    /**
     * The entity's local East-North-Up reference frame.
     */
    ENU = 1,
    /**
     * The entity's inertial reference frame. If entity has no defined orientation
     * property, it falls back to auto-detect algorithm.
     */
    INERTIAL = 2,
    /**
     * The entity's inertial reference frame with orientation fixed to its
     * {@link VelocityOrientationProperty}, ignoring its own orientation.
     */
    VELOCITY = 3
}

/**
 * An affine transformation defined by a translation, rotation, and scale.
 * @param [translation = Cartesian3.ZERO] - A {@link Cartesian3} specifying the (x, y, z) translation to apply to the node.
 * @param [rotation = Quaternion.IDENTITY] - A {@link Quaternion} specifying the (x, y, z, w) rotation to apply to the node.
 * @param [scale = new Cartesian3(1.0, 1.0, 1.0)] - A {@link Cartesian3} specifying the (x, y, z) scaling to apply to the node.
 */
export class TranslationRotationScale {
    constructor(translation?: Cartesian3, rotation?: Quaternion, scale?: Cartesian3);
    /**
     * Gets or sets the (x, y, z) translation to apply to the node.
     */
    translation: Cartesian3;
    /**
     * Gets or sets the (x, y, z, w) rotation to apply to the node.
     */
    rotation: Quaternion;
    /**
     * Gets or sets the (x, y, z) scaling to apply to the node.
     */
    scale: Cartesian3;
    /**
     * Compares this instance against the provided instance and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @param [right] - The right hand side TranslationRotationScale.
     * @returns <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    equals(right?: TranslationRotationScale): boolean;
}

/**
 * Uses the Tridiagonal Matrix Algorithm, also known as the Thomas Algorithm, to solve
 * a system of linear equations where the coefficient matrix is a tridiagonal matrix.
 */
export namespace TridiagonalSystemSolver {
    /**
     * Solves a tridiagonal system of linear equations.
     * @example
     * const lowerDiagonal = [1.0, 1.0, 1.0, 1.0];
     * const diagonal = [2.0, 4.0, 4.0, 4.0, 2.0];
     * const upperDiagonal = [1.0, 1.0, 1.0, 1.0];
     * const rightHandSide = [
     *     new Cesium.Cartesian3(410757.0, -1595711.0, 1375302.0),
     *     new Cesium.Cartesian3(-5986705.0, -2190640.0, 1099600.0),
     *     new Cesium.Cartesian3(-12593180.0, 288588.0, -1755549.0),
     *     new Cesium.Cartesian3(-5349898.0, 2457005.0, -2685438.0),
     *     new Cesium.Cartesian3(845820.0, 1573488.0, -1205591.0)
     * ];
     *
     * const solution = Cesium.TridiagonalSystemSolver.solve(lowerDiagonal, diagonal, upperDiagonal, rightHandSide);
     * @param diagonal - An array with length <code>n</code> that contains the diagonal of the coefficient matrix.
     * @param lower - An array with length <code>n - 1</code> that contains the lower diagonal of the coefficient matrix.
     * @param upper - An array with length <code>n - 1</code> that contains the upper diagonal of the coefficient matrix.
     * @param right - An array of Cartesians with length <code>n</code> that is the right side of the system of equations.
     * @returns An array of Cartesians with length <code>n</code> that is the solution to the tridiagonal system of equations.
     */
    function solve(diagonal: number[], lower: number[], upper: number[], right: Cartesian3[]): Cartesian3[];
}

/**
 * A vertex format defines what attributes make up a vertex.  A VertexFormat can be provided
 * to a {@link Geometry} to request that certain properties be computed, e.g., just position,
 * position and normal, etc.
 * @example
 * // Create a vertex format with position and 2D texture coordinate attributes.
 * const format = new Cesium.VertexFormat({
 *   position : true,
 *   st : true
 * });
 * @param [options] - An object with boolean properties corresponding to VertexFormat properties as shown in the code example.
 */
export class VertexFormat {
    constructor(options?: any);
    /**
     * When <code>true</code>, the vertex has a 3D position attribute.
     * <p>
     * 64-bit floating-point (for precision).  3 components per attribute.
     * </p>
     */
    position: boolean;
    /**
     * When <code>true</code>, the vertex has a normal attribute (normalized), which is commonly used for lighting.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     */
    normal: boolean;
    /**
     * When <code>true</code>, the vertex has a 2D texture coordinate attribute.
     * <p>
     * 32-bit floating-point.  2 components per attribute
     * </p>
     */
    st: boolean;
    /**
     * When <code>true</code>, the vertex has a bitangent attribute (normalized), which is used for tangent-space effects like bump mapping.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     */
    bitangent: boolean;
    /**
     * When <code>true</code>, the vertex has a tangent attribute (normalized), which is used for tangent-space effects like bump mapping.
     * <p>
     * 32-bit floating-point.  3 components per attribute.
     * </p>
     */
    tangent: boolean;
    /**
     * When <code>true</code>, the vertex has an RGB color attribute.
     * <p>
     * 8-bit unsigned byte.  3 components per attribute.
     * </p>
     */
    color: boolean;
    /**
     * An immutable vertex format with only a position attribute.
     */
    static readonly POSITION_ONLY: VertexFormat;
    /**
     * An immutable vertex format with position and normal attributes.
     * This is compatible with per-instance color appearances like {@link PerInstanceColorAppearance}.
     */
    static readonly POSITION_AND_NORMAL: VertexFormat;
    /**
     * An immutable vertex format with position, normal, and st attributes.
     * This is compatible with {@link MaterialAppearance} when {@link MaterialAppearance#materialSupport}
     * is <code>TEXTURED/code>.
     */
    static readonly POSITION_NORMAL_AND_ST: VertexFormat;
    /**
     * An immutable vertex format with position and st attributes.
     * This is compatible with {@link EllipsoidSurfaceAppearance}.
     */
    static readonly POSITION_AND_ST: VertexFormat;
    /**
     * An immutable vertex format with position and color attributes.
     */
    static readonly POSITION_AND_COLOR: VertexFormat;
    /**
     * An immutable vertex format with well-known attributes: position, normal, st, tangent, and bitangent.
     */
    static readonly ALL: VertexFormat;
    /**
     * An immutable vertex format with position, normal, and st attributes.
     * This is compatible with most appearances and materials; however
     * normal and st attributes are not always required.  When this is
     * known in advance, another <code>VertexFormat</code> should be used.
     */
    static readonly DEFAULT: VertexFormat;
    /**
     * The number of elements used to pack the object into an array.
     */
    static packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: VertexFormat, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new VertexFormat instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: VertexFormat): VertexFormat;
    /**
     * Duplicates a VertexFormat instance.
     * @param vertexFormat - The vertex format to duplicate.
     * @param [result] - The object onto which to store the result.
     * @returns The modified result parameter or a new VertexFormat instance if one was not provided. (Returns undefined if vertexFormat is undefined)
     */
    static clone(vertexFormat: VertexFormat, result?: VertexFormat): VertexFormat;
}

/**
 * Functions for computing vertically-exaggerated heights and positions.
 */
export namespace VerticalExaggeration {
    /**
     * Scales a height relative to an offset.
     * @param height - The height.
     * @param scale - A scalar used to exaggerate the terrain. If the value is 1.0 there will be no effect.
     * @param relativeHeight - The height relative to which terrain is exaggerated. If the value is 0.0 terrain will be exaggerated relative to the ellipsoid surface.
     */
    function getHeight(height: number, scale: number, relativeHeight: number): void;
    /**
     * Scales a position by exaggeration.
     * @param position - The position.
     * @param ellipsoid - The ellipsoid.
     * @param verticalExaggeration - A scalar used to exaggerate the terrain. If the value is 1.0 there will be no effect.
     * @param verticalExaggerationRelativeHeight - The height relative to which terrain is exaggerated. If the value is 0.0 terrain will be exaggerated relative to the ellipsoid surface.
     * @param [result] - The object onto which to store the result.
     */
    function getPosition(position: Cartesian3, ellipsoid: Ellipsoid, verticalExaggeration: number, verticalExaggerationRelativeHeight: number, result?: Cartesian3): void;
}

/**
 * This enumerated type is used in determining to what extent an object, the occludee,
 * is visible during horizon culling. An occluder may fully block an occludee, in which case
 * it has no visibility, may partially block an occludee from view, or may not block it at all,
 * leading to full visibility.
 */
export enum Visibility {
    /**
     * Represents that no part of an object is visible.
     */
    NONE = -1,
    /**
     * Represents that part, but not all, of an object is visible
     */
    PARTIAL = 0,
    /**
     * Represents that an object is visible in its entirety.
     */
    FULL = 1
}

/**
 * A description of a wall, which is similar to a KML line string. A wall is defined by a series of points,
 * which extrude down to the ground. Optionally, they can extrude downwards to a specified height.
 * @example
 * // create a wall that spans from ground level to 10000 meters
 * const wall = new Cesium.WallGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArrayHeights([
 *     19.0, 47.0, 10000.0,
 *     19.0, 48.0, 10000.0,
 *     20.0, 48.0, 10000.0,
 *     20.0, 47.0, 10000.0,
 *     19.0, 47.0, 10000.0
 *   ])
 * });
 * const geometry = Cesium.WallGeometry.createGeometry(wall);
 * @param options - Object with the following properties:
 * @param options.positions - An array of Cartesian objects, which are the points of the wall.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.maximumHeights] - An array parallel to <code>positions</code> that give the maximum height of the
 *        wall at <code>positions</code>. If undefined, the height of each position in used.
 * @param [options.minimumHeights] - An array parallel to <code>positions</code> that give the minimum height of the
 *        wall at <code>positions</code>. If undefined, the height at each position is 0.0.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid for coordinate manipulation
 * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
 */
export class WallGeometry {
    constructor(options: {
        positions: Cartesian3[];
        granularity?: number;
        maximumHeights?: number[];
        minimumHeights?: number[];
        ellipsoid?: Ellipsoid;
        vertexFormat?: VertexFormat;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: WallGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new WallGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: WallGeometry): WallGeometry;
    /**
     * A description of a wall, which is similar to a KML line string. A wall is defined by a series of points,
     * which extrude down to the ground. Optionally, they can extrude downwards to a specified height.
     * @example
     * // create a wall that spans from 10000 meters to 20000 meters
     * const wall = Cesium.WallGeometry.fromConstantHeights({
     *   positions : Cesium.Cartesian3.fromDegreesArray([
     *     19.0, 47.0,
     *     19.0, 48.0,
     *     20.0, 48.0,
     *     20.0, 47.0,
     *     19.0, 47.0,
     *   ]),
     *   minimumHeight : 20000.0,
     *   maximumHeight : 10000.0
     * });
     * const geometry = Cesium.WallGeometry.createGeometry(wall);
     * @param options - Object with the following properties:
     * @param options.positions - An array of Cartesian objects, which are the points of the wall.
     * @param [options.maximumHeight] - A constant that defines the maximum height of the
     *        wall at <code>positions</code>. If undefined, the height of each position in used.
     * @param [options.minimumHeight] - A constant that defines the minimum height of the
     *        wall at <code>positions</code>. If undefined, the height at each position is 0.0.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid for coordinate manipulation
     * @param [options.vertexFormat = VertexFormat.DEFAULT] - The vertex attributes to be computed.
     */
    static fromConstantHeights(options: {
        positions: Cartesian3[];
        maximumHeight?: number;
        minimumHeight?: number;
        ellipsoid?: Ellipsoid;
        vertexFormat?: VertexFormat;
    }): WallGeometry;
    /**
     * Computes the geometric representation of a wall, including its vertices, indices, and a bounding sphere.
     * @param wallGeometry - A description of the wall.
     * @returns The computed vertices and indices.
     */
    static createGeometry(wallGeometry: WallGeometry): Geometry | undefined;
}

/**
 * A description of a wall outline. A wall is defined by a series of points,
 * which extrude down to the ground. Optionally, they can extrude downwards to a specified height.
 * @example
 * // create a wall outline that spans from ground level to 10000 meters
 * const wall = new Cesium.WallOutlineGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArrayHeights([
 *     19.0, 47.0, 10000.0,
 *     19.0, 48.0, 10000.0,
 *     20.0, 48.0, 10000.0,
 *     20.0, 47.0, 10000.0,
 *     19.0, 47.0, 10000.0
 *   ])
 * });
 * const geometry = Cesium.WallOutlineGeometry.createGeometry(wall);
 * @param options - Object with the following properties:
 * @param options.positions - An array of Cartesian objects, which are the points of the wall.
 * @param [options.granularity = Math.RADIANS_PER_DEGREE] - The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
 * @param [options.maximumHeights] - An array parallel to <code>positions</code> that give the maximum height of the
 *        wall at <code>positions</code>. If undefined, the height of each position in used.
 * @param [options.minimumHeights] - An array parallel to <code>positions</code> that give the minimum height of the
 *        wall at <code>positions</code>. If undefined, the height at each position is 0.0.
 * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid for coordinate manipulation
 */
export class WallOutlineGeometry {
    constructor(options: {
        positions: Cartesian3[];
        granularity?: number;
        maximumHeights?: number[];
        minimumHeights?: number[];
        ellipsoid?: Ellipsoid;
    });
    /**
     * The number of elements used to pack the object into an array.
     */
    packedLength: number;
    /**
     * Stores the provided instance into the provided array.
     * @param value - The value to pack.
     * @param array - The array to pack into.
     * @param [startingIndex = 0] - The index into the array at which to start packing the elements.
     * @returns The array that was packed into
     */
    static pack(value: WallOutlineGeometry, array: number[], startingIndex?: number): number[];
    /**
     * Retrieves an instance from a packed array.
     * @param array - The packed array.
     * @param [startingIndex = 0] - The starting index of the element to be unpacked.
     * @param [result] - The object into which to store the result.
     * @returns The modified result parameter or a new WallOutlineGeometry instance if one was not provided.
     */
    static unpack(array: number[], startingIndex?: number, result?: WallOutlineGeometry): WallOutlineGeometry;
    /**
     * A description of a walloutline. A wall is defined by a series of points,
     * which extrude down to the ground. Optionally, they can extrude downwards to a specified height.
     * @example
     * // create a wall that spans from 10000 meters to 20000 meters
     * const wall = Cesium.WallOutlineGeometry.fromConstantHeights({
     *   positions : Cesium.Cartesian3.fromDegreesArray([
     *     19.0, 47.0,
     *     19.0, 48.0,
     *     20.0, 48.0,
     *     20.0, 47.0,
     *     19.0, 47.0,
     *   ]),
     *   minimumHeight : 20000.0,
     *   maximumHeight : 10000.0
     * });
     * const geometry = Cesium.WallOutlineGeometry.createGeometry(wall);
     * @param options - Object with the following properties:
     * @param options.positions - An array of Cartesian objects, which are the points of the wall.
     * @param [options.maximumHeight] - A constant that defines the maximum height of the
     *        wall at <code>positions</code>. If undefined, the height of each position in used.
     * @param [options.minimumHeight] - A constant that defines the minimum height of the
     *        wall at <code>positions</code>. If undefined, the height at each position is 0.0.
     * @param [options.ellipsoid = Ellipsoid.default] - The ellipsoid for coordinate manipulation
     */
    static fromConstantHeights(options: {
        positions: Cartesian3[];
        maximumHeight?: number;
        minimumHeight?: number;
        ellipsoid?: Ellipsoid;
    }): WallOutlineGeometry;
    /**
     * Computes the geometric representation of a wall outline, including its vertices, indices, and a bounding sphere.
     * @param wallGeometry - A description of the wall outline.
     * @returns The computed vertices and indices.
     */
    static createGeometry(wallGeometry: WallOutlineGeometry): Geometry | undefined;
}

export interface WebMercatorProjection extends MapProjection {
}

/**
 * The map projection used by Google Maps, Bing Maps, and most of ArcGIS Online, EPSG:3857.  This
 * projection use longitude and latitude expressed with the WGS84 and transforms them to Mercator using
 * the spherical (rather than ellipsoidal) equations.
 * @param [ellipsoid = Ellipsoid.WGS84] - The ellipsoid.
 */
export class WebMercatorProjection implements MapProjection {
    constructor(ellipsoid?: Ellipsoid);
    /**
     * Gets the {@link Ellipsoid}.
     */
    readonly ellipsoid: Ellipsoid;
    /**
     * Converts a Mercator angle, in the range -PI to PI, to a geodetic latitude
     * in the range -PI/2 to PI/2.
     * @param mercatorAngle - The angle to convert.
     * @returns The geodetic latitude in radians.
     */
    static mercatorAngleToGeodeticLatitude(mercatorAngle: number): number;
    /**
     * Converts a geodetic latitude in radians, in the range -PI/2 to PI/2, to a Mercator
     * angle in the range -PI to PI.
     * @param latitude - The geodetic latitude in radians.
     * @returns The Mercator angle.
     */
    static geodeticLatitudeToMercatorAngle(latitude: number): number;
    /**
     * Converts geodetic ellipsoid coordinates, in radians, to the equivalent Web Mercator
     * X, Y, Z coordinates expressed in meters and returned in a {@link Cartesian3}.  The height
     * is copied unmodified to the Z coordinate.
     * @param cartographic - The cartographic coordinates in radians.
     * @param [result] - The instance to which to copy the result, or undefined if a
     *        new instance should be created.
     * @returns The equivalent web mercator X, Y, Z coordinates, in meters.
     */
    project(cartographic: Cartographic, result?: Cartesian3): Cartesian3;
    /**
     * Converts Web Mercator X, Y coordinates, expressed in meters, to a {@link Cartographic}
     * containing geodetic ellipsoid coordinates.  The Z coordinate is copied unmodified to the
     * height.
     * @param cartesian - The web mercator Cartesian position to unrproject with height (z) in meters.
     * @param [result] - The instance to which to copy the result, or undefined if a
     *        new instance should be created.
     * @returns The equivalent cartographic coordinates.
     */
    unproject(cartesian: Cartesian3, result?: Cartographic): Cartographic;
    /**
     * The maximum latitude (both North and South) supported by a Web Mercator
     * (EPSG:3857) projection.  Technically, the Mercator projection is defined
     * for any latitude up to (but not including) 90 degrees, but it makes sense
     * to cut it off sooner because it grows exponentially with increasing latitude.
     * The logic behind this particular cutoff value, which is the one used by
     * Google Maps, Bing Maps, and Esri, is that it makes the projection
     * square.  That is, the rectangle is equal in the X and Y directions.
     *
     * The constant value is computed by calling:
     *    WebMercatorProjection.mercatorAngleToGeodeticLatitude(Math.PI)
     */
    static MaximumLatitude: number;
}

/**
 * Winding order defines the order of vertices for a triangle to be considered front-facing.
 */
export enum WindingOrder {
    /**
     * Vertices are in clockwise order.
     */
    CLOCKWISE = WebGLConstants.CW,
    /**
     * Vertices are in counter-clockwise order.
     */
    COUNTER_CLOCKWISE = WebGLConstants.CCW
}

/**
 * Adds all elements from the given source array to the given target array.
 *
 * If the <code>source</code> is <code>null</code>, <code>undefined</code>,
 * or empty, then nothing will be done. Otherwise, this has the same
 * semantics as<br>
 * <code>for (const s of source) target.push(s);</code><br>
 * but is usually more efficient than a <code>for</code>-loop, and does not
 * put the elements of the source on the stack, as it would be done with the
 * spread operator or when using <code>target.push.apply(source)</code>.
 * @example
 * const target = [ 0, 1, 2 ];
 * const source = [ 3, 4, 5 ];
 * Cesium.addAllToArray(target, source);
 * // The target is now [ 0, 1, 2, 3, 4, 5 ]
 * @param target - The target array
 * @param source - The source array
 */
export function addAllToArray(target: any[], source: any[] | undefined): void;

/**
 * Removes adjacent duplicate values in an array of values.
 * @example
 * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0), (1.0, 1.0, 1.0)]
 * const values = [
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
 * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon);
 * @example
 * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0)]
 * const values = [
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
 * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon, true);
 * @example
 * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0)]
 * // removedIndices will be equal to [1, 3, 5]
 * const values = [
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
 * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon, true);
 * @param values - The array of values.
 * @param equalsEpsilon - Function to compare values with an epsilon. Boolean equalsEpsilon(left, right, epsilon).
 * @param [wrapAround = false] - Compare the last value in the array against the first value. If they are equal, the last value is removed.
 * @param [removedIndices] - Store the indices that correspond to the duplicate items removed from the array, if there were any.
 * @returns A new array of values with no adjacent duplicate values or the input array if no duplicates were found.
 */
export function arrayRemoveDuplicates(values: any[], equalsEpsilon: (...params: any[]) => any, wrapAround?: boolean, removedIndices?: number[]): any[];

/**
 * Checks that a condition is truthy, throwing a specified message if condition
 * fails. The `asserts condition` return type allows TypeScript to narrow the
 * types of the condition and enforce stricter types without further if/else
 * checks or nullish coalescing.
 * @example
 * assert(object.optionalProperty, 'Missing .optionalProperty');
 * object.optionalProperty.toString(); // safe; no type error.
 */
export function assert(condition: any, msg: string): void;

/**
 * Computes the barycentric coordinates for a point with respect to a triangle.
 * @example
 * // Returns Cartesian3.UNIT_X
 * const p = new Cesium.Cartesian3(-1.0, 0.0, 0.0);
 * const b = Cesium.barycentricCoordinates(p,
 *   new Cesium.Cartesian3(-1.0, 0.0, 0.0),
 *   new Cesium.Cartesian3( 1.0, 0.0, 0.0),
 *   new Cesium.Cartesian3( 0.0, 1.0, 1.0));
 * @param point - The point to test.
 * @param p0 - The first point of the triangle, corresponding to the barycentric x-axis.
 * @param p1 - The second point of the triangle, corresponding to the barycentric y-axis.
 * @param p2 - The third point of the triangle, corresponding to the barycentric z-axis.
 * @param [result] - The object onto which to store the result.
 * @returns The modified result parameter or a new Cartesian3 instance if one was not provided. If the triangle is degenerate the function will return undefined.
 */
export function barycentricCoordinates(point: Cartesian2 | Cartesian3, p0: Cartesian2 | Cartesian3, p1: Cartesian2 | Cartesian3, p2: Cartesian2 | Cartesian3, result?: Cartesian3): Cartesian3 | undefined;

/**
 * Finds an item in a sorted array.
 * @example
 * // Create a comparator function to search through an array of numbers.
 * function comparator(a, b) {
 *     return a - b;
 * };
 * const numbers = [0, 2, 4, 6, 8];
 * const index = Cesium.binarySearch(numbers, 6, comparator); // 3
 * @param array - The sorted array to search.
 * @param itemToFind - The item to find in the array.
 * @param comparator - The function to use to compare the item to
 *        elements in the array.
 * @returns The index of <code>itemToFind</code> in the array, if it exists.  If <code>itemToFind</code>
 *        does not exist, the return value is a negative number which is the bitwise complement (~)
 *        of the index before which the itemToFind should be inserted in order to maintain the
 *        sorted order of the array.
 */
export function binarySearch(array: any[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, itemToFind: any, comparator: binarySearchComparator): number;

/**
 * A function used to compare two items while performing a binary search.
 * @example
 * function compareNumbers(a, b) {
 *     return a - b;
 * }
 * @param a - An item in the array.
 * @param b - The item being searched for.
 */
export type binarySearchComparator = (a: any, b: any) => number;

/**
 * Clones an object, returning a new object containing the same properties.
 * @param object - The object to clone.
 * @param [deep = false] - If true, all properties will be deep cloned recursively.
 * @returns The cloned object.
 */
export function clone(object: any, deep?: boolean): any;

/**
 * Merges two objects, copying their properties onto a new combined object. When two objects have the same
 * property, the value of the property on the first object is used.  If either object is undefined,
 * it will be treated as an empty object.
 * @example
 * const object1 = {
 *     propOne : 1,
 *     propTwo : {
 *         value1 : 10
 *     }
 * }
 * const object2 = {
 *     propTwo : 2
 * }
 * const final = Cesium.combine(object1, object2);
 *
 * // final === {
 * //     propOne : 1,
 * //     propTwo : {
 * //         value1 : 10
 * //     }
 * // }
 * @param [object1] - The first object to merge.
 * @param [object2] - The second object to merge.
 * @param [deep = false] - Perform a recursive merge.
 * @returns The combined object containing all properties from both objects.
 */
export function combine(object1?: any, object2?: any, deep?: boolean): any;

/**
 * Creates a Globally unique identifier (GUID) string.  A GUID is 128 bits long, and can guarantee uniqueness across space and time.
 * @example
 * this.guid = Cesium.createGuid();
 */
export function createGuid(): string;

/**
 * @example
 * if (Cesium.defined(positions)) {
 *      doSomething();
 * } else {
 *      doSomethingElse();
 * }
 * @param value - The object.
 * @returns Returns true if the object is defined, returns false otherwise.
 */
export function defined<Type>(value: Type): value is NonNullable<Type>;


/**
 * Logs a deprecation message to the console.  Use this function instead of
 * <code>console.log</code> directly since this does not log duplicate messages
 * unless it is called from multiple workers.
 * @example
 * // Deprecated function or class
 * function Foo() {
 *    deprecationWarning('Foo', 'Foo was deprecated in Cesium 1.01.  It will be removed in 1.03.  Use newFoo instead.');
 *    // ...
 * }
 *
 * // Deprecated function
 * Bar.prototype.func = function() {
 *    deprecationWarning('Bar.func', 'Bar.func() was deprecated in Cesium 1.01.  It will be removed in 1.03.  Use Bar.newFunc() instead.');
 *    // ...
 * };
 *
 * // Deprecated property
 * Object.defineProperties(Bar.prototype, {
 *     prop : {
 *         get : function() {
 *             deprecationWarning('Bar.prop', 'Bar.prop was deprecated in Cesium 1.01.  It will be removed in 1.03.  Use Bar.newProp instead.');
 *             // ...
 *         },
 *         set : function(value) {
 *             deprecationWarning('Bar.prop', 'Bar.prop was deprecated in Cesium 1.01.  It will be removed in 1.03.  Use Bar.newProp instead.');
 *             // ...
 *         }
 *     }
 * });
 * @param identifier - The unique identifier for this deprecated API.
 * @param message - The message to log to the console.
 */
export function deprecationWarning(identifier: string, message: string): void;

/**
 * Destroys an object.  Each of the object's functions, including functions in its prototype,
 * is replaced with a function that throws a {@link DeveloperError}, except for the object's
 * <code>isDestroyed</code> function, which is set to a function that returns <code>true</code>.
 * The object's properties are removed with <code>delete</code>.
 * <br /><br />
 * This function is used by objects that hold native resources, e.g., WebGL resources, which
 * need to be explicitly released.  Client code calls an object's <code>destroy</code> function,
 * which then releases the native resource and calls <code>destroyObject</code> to put itself
 * in a destroyed state.
 * @example
 * // How a texture would destroy itself.
 * this.destroy = function () {
 *     _gl.deleteTexture(_texture);
 *     return Cesium.destroyObject(this);
 * };
 * @param object - The object to destroy.
 * @param [message] - The message to include in the exception that is thrown if
 *                           a destroyed object's function is called.
 */
export function destroyObject(object: any, message?: string): void;

/**
 * Formats an error object into a String.  If available, uses name, message, and stack
 * properties, otherwise, falls back on toString().
 * @param object - The item to find in the array.
 * @returns A string containing the formatted error.
 */
export function formatError(object: any): string;

/**
 * Given a relative Uri and a base Uri, returns the absolute Uri of the relative Uri.
 * @example
 * //absolute Uri will be "https://test.com/awesome.png";
 * const absoluteUri = Cesium.getAbsoluteUri('awesome.png', 'https://test.com');
 * @param relative - The relative Uri.
 * @param [base] - The base Uri.
 * @returns The absolute Uri of the given relative Uri.
 */
export function getAbsoluteUri(relative: string, base?: string): string;

/**
 * Given a URI, returns the base path of the URI.
 * @example
 * // basePath will be "/Gallery/";
 * const basePath = Cesium.getBaseUri('/Gallery/simple.czml?value=true&example=false');
 *
 * // basePath will be "/Gallery/?value=true&example=false";
 * const basePath = Cesium.getBaseUri('/Gallery/simple.czml?value=true&example=false', true);
 * @param uri - The Uri.
 * @param [includeQuery = false] - Whether or not to include the query string and fragment form the uri
 * @returns The base path of the Uri.
 */
export function getBaseUri(uri: string, includeQuery?: boolean): string;

/**
 * Given a URI, returns the extension of the URI.
 * @example
 * //extension will be "czml";
 * const extension = Cesium.getExtensionFromUri('/Gallery/simple.czml?value=true&example=false');
 * @param uri - The Uri.
 * @returns The extension of the Uri.
 */
export function getExtensionFromUri(uri: string): string;

/**
 * Given a URI, returns the last segment of the URI, removing any path or query information.
 * @example
 * //fileName will be"simple.czml";
 * const fileName = Cesium.getFilenameFromUri('/Gallery/simple.czml?value=true&example=false');
 * @param uri - The Uri.
 * @returns The last segment of the Uri.
 */
export function getFilenameFromUri(uri: string): string;

/**
 * Parses JSON from a Uint8Array.
 * @param uint8Array - The Uint8Array to read from.
 * @param [byteOffset = 0] - The byte offset to start reading from.
 * @param [byteLength] - The byte length to read. If byteLength is omitted the remainder of the buffer is read.
 * @returns An object containing the parsed JSON.
 */
export function getJsonFromTypedArray(uint8Array: Uint8Array, byteOffset?: number, byteLength?: number): any;

export function getMagic(): void;

/**
 * Reads a string from a Uint8Array.
 * @param uint8Array - The Uint8Array to read from.
 * @param [byteOffset = 0] - The byte offset to start reading from.
 * @param [byteLength] - The byte length to read. If byteLength is omitted the remainder of the buffer is read.
 * @returns The string.
 */
export function getStringFromTypedArray(uint8Array: Uint8Array, byteOffset?: number, byteLength?: number): string;

/**
 * Gets a timestamp that can be used in measuring the time between events.  Timestamps
 * are expressed in milliseconds, but it is not specified what the milliseconds are
 * measured from.  This function uses performance.now() if it is available, or Date.now()
 * otherwise.
 * @returns The timestamp in milliseconds since some unspecified reference time.
 */
export function getTimestamp(): number;

/**
 * Determines if a given date is a leap year.
 * @example
 * const leapYear = Cesium.isLeapYear(2000); // true
 * @param year - The year to be tested.
 * @returns True if <code>year</code> is a leap year.
 */
export function isLeapYear(year: number): boolean;

/**
 * A stable merge sort.
 * @example
 * // Assume array contains BoundingSpheres in world coordinates.
 * // Sort them in ascending order of distance from the camera.
 * const position = camera.positionWC;
 * Cesium.mergeSort(array, function(a, b, position) {
 *     return Cesium.BoundingSphere.distanceSquaredTo(b, position) - Cesium.BoundingSphere.distanceSquaredTo(a, position);
 * }, position);
 * @param array - The array to sort.
 * @param comparator - The function to use to compare elements in the array.
 * @param [userDefinedObject] - Any item to pass as the third parameter to <code>comparator</code>.
 */
export function mergeSort(array: any[] | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array, comparator: mergeSortComparator, userDefinedObject?: any): void;

/**
 * A function used to compare two items while performing a merge sort.
 * @example
 * function compareNumbers(a, b, userDefinedObject) {
 *     return a - b;
 * }
 * @param a - An item in the array.
 * @param b - An item in the array.
 * @param [userDefinedObject] - An object that was passed to {@link mergeSort}.
 */
export type mergeSortComparator = (a: any, b: any, userDefinedObject?: any) => number;

/**
 * Converts an object representing a set of name/value pairs into a query string,
 * with names and values encoded properly for use in a URL.  Values that are arrays
 * will produce multiple values with the same name.
 * @example
 * const str = Cesium.objectToQuery({
 *     key1 : 'some value',
 *     key2 : 'a/b',
 *     key3 : ['x', 'y']
 * });
 * @param obj - The object containing data to encode.
 * @returns An encoded query string.
 */
export function objectToQuery(obj: any): string;

/**
 * Logs a one time message to the console.  Use this function instead of
 * <code>console.log</code> directly since this does not log duplicate messages
 * unless it is called from multiple workers.
 * @example
 * for(let i=0;i<foo.length;++i) {
 *    if (!defined(foo[i].bar)) {
 *       // Something that can be recovered from but may happen a lot
 *       oneTimeWarning('foo.bar undefined', 'foo.bar is undefined. Setting to 0.');
 *       foo[i].bar = 0;
 *       // ...
 *    }
 * }
 * @param identifier - The unique identifier for this warning.
 * @param [message = identifier] - The message to log to the console.
 */
export function oneTimeWarning(identifier: string, message?: string): void;

/**
 * Determines if a point is inside a triangle.
 * @example
 * // Returns true
 * const p = new Cesium.Cartesian2(0.25, 0.25);
 * const b = Cesium.pointInsideTriangle(p,
 *   new Cesium.Cartesian2(0.0, 0.0),
 *   new Cesium.Cartesian2(1.0, 0.0),
 *   new Cesium.Cartesian2(0.0, 1.0));
 * @param point - The point to test.
 * @param p0 - The first point of the triangle.
 * @param p1 - The second point of the triangle.
 * @param p2 - The third point of the triangle.
 * @returns <code>true</code> if the point is inside the triangle; otherwise, <code>false</code>.
 */
export function pointInsideTriangle(point: Cartesian2 | Cartesian3, p0: Cartesian2 | Cartesian3, p1: Cartesian2 | Cartesian3, p2: Cartesian2 | Cartesian3): boolean;

/**
 * Parses a query string into an object, where the keys and values of the object are the
 * name/value pairs from the query string, decoded. If a name appears multiple times,
 * the value in the object will be an array of values.
 * @example
 * const obj = Cesium.queryToObject('key1=some%20value&key2=a%2Fb&key3=x&key3=y');
 * // obj will be:
 * // {
 * //   key1 : 'some value',
 * //   key2 : 'a/b',
 * //   key3 : ['x', 'y']
 * // }
 * @param queryString - The query string.
 * @returns An object containing the parameters parsed from the query string.
 */
export function queryToObject(queryString: string): any;

/**
 * Converts the value from sRGB color space to linear color space.
 * @example
 * const srgbColor = [0.5, 0.5, 0.5];
 * const linearColor = srgbColor.map(function (c) {
 *     return Cesium.srgbToLinear(c);
 * });
 * @param value - The color value in sRGB color space.
 * @returns Returns the color value in linear color space.
 */
export function srgbToLinear(value: number): number;

/**
 * Subdivides an array into a number of smaller, equal sized arrays.
 * @param array - The array to divide.
 * @param numberOfArrays - The number of arrays to divide the provided array into.
 */
export function subdivideArray(array: any[], numberOfArrays: number): void;

/**
 * Union of all numeric typed array types.
 */
export type TypedArray = Float64Array | Float32Array | Uint32Array | Uint16Array | Uint8Array | Int32Array | Int16Array | Int8Array;

/**
 * Union of all numeric typed array constructor types.
 */
export type TypedArrayConstructor = Float64ArrayConstructor | Float32ArrayConstructor | Uint32ArrayConstructor | Uint16ArrayConstructor | Uint8ArrayConstructor | Int32ArrayConstructor | Int16ArrayConstructor | Int8ArrayConstructor;



export const knockout: any;

}
