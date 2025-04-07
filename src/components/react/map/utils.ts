export function getBoundsFromCoordinates(coordinates) {
  const [minLng, minLat, maxLng, maxLat] = coordinates;
  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ] as [[number, number], [number, number]];
}