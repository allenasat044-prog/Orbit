// One place that builds the address of a saved preview image.
// The "v" number changes whenever browsers must forget what they remembered about these addresses.
// (Version 2: earlier "image missing" answers were wrongly remembered for a year.)
export const IMAGE_URL_VERSION = 2;

export const chipImageUrl = (chipId) => `/api/chips/${chipId}/image?v=${IMAGE_URL_VERSION}`;
export const chipDisplayUrl = (chipId) => `/api/chips/${chipId}/image?variant=display&v=${IMAGE_URL_VERSION}`;
