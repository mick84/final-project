/**
 * @param {Buffer} buffer
 */
export const ImageUrlFromBuffer = (buffer) => {
  const binData = new Uint8Array(buffer);
  const blob = new Blob([binData], { type: "image/jpeg" });
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
};
