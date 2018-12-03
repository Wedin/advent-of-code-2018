const parseToObj = row => {
  const split = row.split(" ");
  const coords = split[2].slice(0, -1).split(",");
  const size = split[3].split("x");
  return {
    id: split[0].substring(1),
    left: parseInt(coords[0], 10),
    top: parseInt(coords[1], 10),
    width: parseInt(size[0], 10),
    height: parseInt(size[1], 10),
  };
};

// claim coords:
// x-led: left boundaries claim.left
// x-led: right boundaries clain.left + claim.width
// y-led: top boundaries -claim.top
// y-led: bottom boundaries -clain.top-claim.height

function getSeenCords(claims) {
  const seenCoords = {};
  claims.forEach(claim => {
    for (let i = 0; i < claim.width; i++) {
      for (let j = 0; j < claim.height; j++) {
        const x = claim.left + i;
        const y = -claim.top - j;
        const key = `${x}:${y}`;
        seenCoords[key] ? seenCoords[key]++ : (seenCoords[key] = 1);
      }
    }
  });
  return seenCoords;
}

function part1(input) {
  const claims = input.map(parseToObj);
  const seenCoords = getSeenCords(claims);
  const multiple = Object.values(seenCoords).filter(val => val > 1);
  return multiple.length;
}

function part2(input) {
  const claims = input.map(parseToObj);
  const seenCoords = getSeenCords(claims);
  let uniqueClaimId;
  claims.forEach(claim => {
    let thisUniqueClaim = true;
    for (let i = 0; i < claim.width; i++) {
      for (let j = 0; j < claim.height; j++) {
        const x = claim.left + i;
        const y = -claim.top - j;
        const key = `${x}:${y}`;
        if (seenCoords[key] !== 1) {
          thisUniqueClaim = false;
        }
      }
    }
    if (thisUniqueClaim) {
      uniqueClaimId = claim.id;
    }
  });

  return uniqueClaimId;
}

module.exports = {
  part1,
  part2,
};
