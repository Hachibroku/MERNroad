function computeAngle(p1, p2, p3) {
    const v1 = { lng: p1.lng - p2.lng, lat: p1.lat - p2.lat };
    const v2 = { lng: p3.lng - p2.lng, lat: p3.lat - p2.lat };

    const dotProduct = v1.lng * v2.lng + v1.lat * v2.lat;
    const magnitude1 = Math.sqrt(v1.lng * v1.lng + v1.lat * v1.lat);
    const magnitude2 = Math.sqrt(v2.lng * v2.lng + v2.lat * v2.lat);

    const angleRad = Math.acos(dotProduct / (magnitude1 * magnitude2));
    return Math.abs(angleRad * (180 / Math.PI));  // Convert to degrees
}


function computeDistance(p1, p2, p3) {
    const dx1 = p2.lng - p1.lng;
    const dy1 = p2.lat - p1.lat;
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

    const dx2 = p3.lng - p2.lng;
    const dy2 = p3.lat - p2.lat;
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    return distance1 + distance2;
}

function computeCurvature(polylinePoints) {
    const curvatures = [];
    for (let i = 0; i < polylinePoints.length - 2; i++) {
        const p1 = polylinePoints[i];
        const p2 = polylinePoints[i + 1];
        const p3 = polylinePoints[i + 2];

        const angle = computeInteriorAngle(p1, p2, p3);
        const ds = computeDistance(p1, p3);

        const curvature = angle / ds;
        curvatures.push(curvature);
    }
    return curvatures;
}

const polylinePoints = [
    { lat: 10.0522, lng: -18.2437 },
    { lat: 70.0525, lng: -119.2440 },
    { lat: 20.0528, lng: -20.2443 },
    { lat: 40.0531, lng: -121.2446 },
    { lat: 45.0534, lng: -22.2449 },
    { lat: 11.4180, lng: -123.6990 }
];
const curvatures = computeCurvature(polylinePoints);

function isRoadFun(curvatures, thresholdAngle = 30, minFunPercent = 0.5) {
    const funSegments = curvatures.filter(curvature => curvature > thresholdAngle);
    const funFactor = funSegments.length / curvatures.length;
    return funFactor > minFunPercent;
}

const fun = isRoadFun(curvatures);
console.log(`Is the road fun? ${fun ? 'Yes' : 'No'}`);
console.log(curvatures)
console.log(fun)
