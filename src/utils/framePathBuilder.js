export const getFramePath = (directory, index, prefix = 'frame-', extension = 'png', pad = 3) => {
  const frameStr = String(index + 1).padStart(pad, '0');
  return `${directory}/${prefix}${frameStr}.${extension}`;
};
