const manhattanDistance = ([x1, x0], [y1, y0]) => Math.abs(y0 - x0) + Math.abs(y1 - x1);
const getCoords = input => input.map(i => i.split(", ")).map(([x, y]) => [parseInt(x, 10), parseInt(y, 10)]);
const getBoundaries = coordinates => {
  const xCoords = coordinates.map(([x]) => x);
  const yCoords = coordinates.map(([x, y]) => y); //eslint-disable-line
  return {
    xMin: Math.min(...xCoords),
    xMax: Math.max(...xCoords),
    yMin: Math.min(...yCoords),
    yMax: Math.max(...yCoords),
  };
};

const getPointIndex = (points, comparePoint) => {
  const distances = points.map(c => manhattanDistance(c, comparePoint));
  const minimum = Math.min(...distances);
  // Multiple points are closes
  if (distances.filter(dist => dist === minimum).length !== 1) {
    return null;
  }
  const i = distances.findIndex(c => c === minimum);
  return i;
};

const getInfinites = (bounds, coords) => {
  const infinitePoints = new Set();
  for (let xCoord = bounds.xMin; xCoord <= bounds.xMax; xCoord++) {
    const coord1 = [xCoord, bounds.yMin];
    const coord2 = [xCoord, bounds.yMax];
    infinitePoints.add(getPointIndex(coords, coord1));
    infinitePoints.add(getPointIndex(coords, coord2));
  }
  for (let yCoord = bounds.xMin; yCoord <= bounds.yMax; yCoord++) {
    const coord1 = [bounds.xMin, yCoord];
    const coord2 = [bounds.xMax, yCoord];
    infinitePoints.add(getPointIndex(coords, coord1));
    infinitePoints.add(getPointIndex(coords, coord2));
  }

  return infinitePoints;
};

function part1(input) {
  const coords = getCoords(input);
  const bounds = getBoundaries(coords);
  const finitePoints = getInfinites(bounds, coords);

  const distPerCoordI = coords.map(() => 0);
  for (let x = bounds.xMin; x <= bounds.xMax; x++) {
    for (let y = bounds.yMin; y <= bounds.yMax; y++) {
      const coordIndex = getPointIndex(coords, [x, y]);
      if (coordIndex && !finitePoints.has(coordIndex)) {
        distPerCoordI[coordIndex]++;
      }
    }
  }

  return Math.max(...distPerCoordI);
}

function part2(input, isTest = false) {
  const coords = getCoords(input);
  const bounds = getBoundaries(coords);
  let areaSize = 0;
  for (let x = 0; x <= bounds.xMax; x++) {
    for (let y = 0; y <= bounds.yMax; y++) {
      const distances = coords.map(c => manhattanDistance(c, [x, y]));
      const sum = distances.reduce((a, b) => a + b, 0);
      if (sum < (isTest ? 32 : 10000)) {
        areaSize++;
      }
    }
  }

  return areaSize;
}

module.exports = {
  part1,
  part2,
};
