// Simplified equirectangular world continent polygons for high-performance SVG canvas
// Coordinate system: X from -180 to 180, Y from 90 to -90
export interface MapFeature {
  id: string;
  name: string;
  path: string; // SVG path data in projection coords (lon, lat)
}

// Convert longitude (-180..180) and latitude (-90..90) to SVG viewbox coords (width 1000, height 500)
export function geoToSvgCoords(lng: number, lat: number, width = 1000, height = 500): [number, number] {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

export function svgCoordsToGeo(x: number, y: number, width = 1000, height = 500): [number, number] {
  const lng = (x / width) * 360 - 180;
  const lat = 90 - (y / height) * 180;
  return [lng, lat];
}

// Low-poly clean coastline coordinates for world landmasses
export const CONTINENT_POLYGONS: { id: string; name: string; coordinates: [number, number][] }[] = [
  {
    id: 'north-america',
    name: 'North America',
    coordinates: [
      [-168, 65], [-160, 71], [-130, 70], [-120, 76], [-85, 75], [-65, 82],
      [-55, 60], [-60, 46], [-66, 44], [-75, 35], [-80, 25], [-81, 25],
      [-97, 26], [-97, 20], [-87, 16], [-77, 8], [-83, 10], [-92, 16],
      [-105, 23], [-110, 31], [-124, 38], [-124, 48], [-136, 58], [-150, 60],
      [-165, 60], [-168, 65]
    ]
  },
  {
    id: 'south-america',
    name: 'South America',
    coordinates: [
      [-77, 8], [-72, 12], [-61, 10], [-50, 0], [-35, -5], [-37, -12],
      [-41, -21], [-48, -28], [-53, -33], [-58, -38], [-65, -43], [-66, -55],
      [-74, -53], [-73, -42], [-72, -32], [-70, -18], [-77, -12], [-81, -5],
      [-79, 1], [-77, 8]
    ]
  },
  {
    id: 'eurasia',
    name: 'Eurasia',
    coordinates: [
      [-9, 36], [-9, 43], [1, 43], [8, 54], [5, 60], [25, 71], [40, 68],
      [60, 73], [100, 77], [140, 75], [170, 67], [180, 65], [160, 55],
      [140, 50], [130, 42], [122, 37], [121, 31], [118, 24], [108, 19],
      [104, 10], [98, 8], [92, 22], [88, 22], [80, 16], [77, 8], [72, 19],
      [68, 24], [62, 25], [55, 25], [51, 14], [43, 12], [35, 27], [35, 36],
      [27, 41], [15, 40], [14, 45], [0, 49], [-5, 48], [-9, 43], [-9, 36]
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    coordinates: [
      [-6, 36], [11, 37], [15, 32], [32, 31], [33, 27], [43, 12], [51, 11],
      [43, -11], [40, -17], [35, -24], [32, -28], [26, -34], [18, -34],
      [14, -28], [12, -16], [9, 1], [3, 6], [-17, 14], [-17, 21], [-13, 28],
      [-6, 36]
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    coordinates: [
      [114, -22], [122, -18], [130, -12], [136, -12], [142, -11], [146, -19],
      [153, -28], [150, -37], [143, -39], [137, -35], [135, -33], [124, -34],
      [115, -34], [113, -26], [114, -22]
    ]
  },
  {
    id: 'greenland',
    name: 'Greenland',
    coordinates: [
      [-44, 60], [-35, 66], [-20, 71], [-20, 78], [-30, 83], [-50, 82],
      [-58, 77], [-52, 70], [-44, 60]
    ]
  },
  {
    id: 'japan',
    name: 'Japan',
    coordinates: [
      [131, 33], [136, 35], [141, 41], [145, 44], [141, 45], [138, 38], [131, 33]
    ]
  },
  {
    id: 'uk',
    name: 'British Isles',
    coordinates: [
      [-5, 50], [1, 51], [0, 54], [-2, 58], [-6, 58], [-5, 54], [-5, 50]
    ]
  },
  {
    id: 'madagascar',
    name: 'Madagascar',
    coordinates: [
      [49, -12], [50, -16], [47, -25], [44, -25], [44, -18], [49, -12]
    ]
  },
  {
    id: 'antarctica',
    name: 'Antarctica',
    coordinates: [
      [-180, -78], [-120, -74], [-60, -65], [0, -69], [60, -67], [120, -66], [180, -78],
      [180, -88], [-180, -88], [-180, -78]
    ]
  }
];
