function computeAngle(p1, p2, p3) {
    const angleRad = Math.atan2(p3.lat - p2.lat, p3.lng - p2.lng) -
                    Math.atan2(p1.lat - p2.lat, p1.lng - p2.lng);
    return Math.abs(angleRad * (180 / Math.PI));
}

function isFunRoad(points, angleThreshold = 30, percentageThreshold = 0.5) {
    let angleExceedCount = 0;

    for (let i = 1; i < points.length - 1; i++) {
        const angle = computeAngle(points[i-1], points[i], points[i+1]);
        if (angle > angleThreshold) {
            angleExceedCount++;
        }
    }

    const percentageExceed = angleExceedCount / (points.length - 2);
    return percentageExceed > percentageThreshold;
}

const result = isFunRoad(polylinePoints);
console.log(result ? "Fun Road" : "Not Fun Road");
