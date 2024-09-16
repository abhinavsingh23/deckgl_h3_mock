import {polygonToCells} from 'h3-js';

type H3Index = string;

// Type for the result of getH3IndexesForArea
interface IndexesByResolution {
  [resolution: number]: H3Index[];
}

// Approximate polygon for San Francisco
const sanFranciscoBoundaries = [
    [37.8116, -122.5170],
    [37.8116, -122.3551],
    [37.7023, -122.3551],
    [37.7023, -122.5170],
    [37.8116, -122.5170]  
  ];


function getH3IndexesForArea(resolutions: number[]): IndexesByResolution {
  const indexesByResolution: IndexesByResolution = {};

  resolutions.forEach(resolution => {
    const h3Indexes: H3Index[] = polygonToCells(sanFranciscoBoundaries, resolution);
    indexesByResolution[resolution] = h3Indexes;
  });

  return indexesByResolution;
}

// GeoJSON types
// interface GeoJsonFeature {
//   type: 'Feature';
//   properties: { h3Index: H3Index };
//   geometry: {
//     type: 'Polygon';
//     coordinates: Coordinate[][];
//   };
// }

// interface GeoJsonFeatureCollection {
//   type: 'FeatureCollection';
//   features: GeoJsonFeature[];
// }

// function getGeoJsonForIndexes(indexes: H3Index[]): GeoJsonFeatureCollection {
//   return {
//     type: 'FeatureCollection',
//     features: indexes.map(h3Index => ({
//       type: 'Feature',
//       properties: { h3Index },
//       geometry: {
//         type: 'Polygon',
//         coordinates: [h3ToGeoBoundary(h3Index, true)]
//       }
//     }))
//   };
// }

// // Usage
// const resolutions: number[] = [5, 6, 7, 8];
// const sfH3Indexes: IndexesByResolution = getH3IndexesForArea(sanFranciscoBoundaries, resolutions);

// console.log('H3 Indexes for San Francisco:');
// resolutions.forEach(resolution => {
//   console.log(`Resolution ${resolution}: ${sfH3Indexes[resolution].length} hexagons`);
// });

// // Example: Get GeoJSON for resolution 6
// const resolution6GeoJson: GeoJsonFeatureCollection = getGeoJsonForIndexes(sfH3Indexes[6]);
// console.log('GeoJSON for resolution 6:', JSON.stringify(resolution6GeoJson).slice(0, 200) + '...');

// Export the functions if you want to use them in other files
export { getH3IndexesForArea };
