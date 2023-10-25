const polylinePoints = require('./exampleData');
const { computeCurvature, isRoadFun } = require('./routeScorer');

const curvatures = polylinePoints.map((point, index, array) => {
    if (index === 0 || index === array.length - 1) return null; // Skip first and last
    return computeCurvature(array[index - 1], point, array[index + 1]);
}).filter(val => val !== null);

console.log("Curvatures:", curvatures);

const funFactor = isRoadFun(curvatures);
console.log("Is the route fun?", funFactor);
