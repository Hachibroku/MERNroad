function computeAngle(p1, p2, p3) {
    const angleRad = Math.atan2(p3.lng - p1.lng, p3.lat - p1.lat) -
                    Math.atan2(p2.lng - p1.lng, p2.lat - p1.lat);
    return Math.abs(angleRad * (180 / Math.PI));
}

function computeDistance(p1, p3) {
    const dx = p3.lng - p1.lng;
    const dy = p3.lat - p1.lat;
    return Math.sqrt(dx * dx + dy * dy);
}

function computeCurvature(polylinePoints) {
    const curvatures = [];
    for(let i = 0; i < polylinePoints.length - 2; i++) {
        const p1 = polylinePoints[i];
        const p2 = polylinePoints[i+1];
        const p3 = polylinePoints[i+2];

        const angle = computeAngle(p1, p2, p3);
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
