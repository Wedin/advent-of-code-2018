const parseToEvents = input => {
  const guardData = [];
  let currentGuardId;
  let currentGuardData;

  input.forEach(entry => {
    if (entry.includes("#")) {
      currentGuardId = entry.split("#")[1].split(" ")[0];
      if (currentGuardData) guardData.push(currentGuardData);
      currentGuardData = {};
      currentGuardData.id = currentGuardId;
      currentGuardData.events = {};
    } else {
      const minute = parseInt(entry.match(/:([^)]+)\]/)[1], 10);
      currentGuardData.date = entry.split(" ")[0].slice(6);
      const state = entry.includes("falls asleep") ? "SLEEPING" : "AWAKE";
      currentGuardData.events[minute] = state;
    }
  });

  guardData.push(currentGuardData);
  return guardData;
};

function getGuardSleepData(guardData) {
  const totalGuardSleep = {};
  const guardSleepPerMinute = {};
  guardData.forEach(guard => {
    if (!totalGuardSleep[guard.id]) {
      totalGuardSleep[guard.id] = 0;
      guardSleepPerMinute[guard.id] = {};
    }
    let isSleeping = false;
    for (let minute = 0; minute < 60; minute++) {
      if (guard.events[minute]) {
        isSleeping = guard.events[minute] === "SLEEPING";
      }

      if (isSleeping) totalGuardSleep[guard.id]++;

      if (guardSleepPerMinute[guard.id][minute] === undefined) {
        guardSleepPerMinute[guard.id][minute] = isSleeping ? 1 : 0;
      } else if (isSleeping) {
        guardSleepPerMinute[guard.id][minute]++;
      }
    }
  });

  return Object.keys(guardSleepPerMinute).map(guardId => {
    return {
      sleepMinutes: guardSleepPerMinute[guardId],
      totalSlept: totalGuardSleep[guardId],
      guardId,
    };
  });
}

function getSleepingGuardForMinute(guardData) {
  let maxedMinuteAmount = 0;
  let maxedMinute = 0;
  let maxedId;

  const guardSleepData = getGuardSleepData(guardData);

  guardSleepData.forEach(sleepData => {
    const minutes = Object.values(sleepData.sleepMinutes);
    const maxSleptMin = Math.max(...minutes);
    if (maxSleptMin > maxedMinuteAmount) {
      maxedId = sleepData.guardId;
      maxedMinuteAmount = maxSleptMin;
      maxedMinute = minutes.findIndex(m => m === maxSleptMin);
    }
  });

  return { id: maxedId, minute: maxedMinute };
}

function part1(input) {
  input.sort();
  const guardData = parseToEvents(input);
  const guardSleepData = getGuardSleepData(guardData);

  const mostSleptGuard = guardSleepData.reduce(
    (mostSlept, guardSleepData) => (guardSleepData.totalSlept > mostSlept.totalSlept ? guardSleepData : mostSlept),
    { totalSlept: 0 }
  );

  const maxSleepMinAmount = Math.max(...Object.values(mostSleptGuard.sleepMinutes));
  const maxSleepMin = Object.values(mostSleptGuard.sleepMinutes).findIndex(m => m === maxSleepMinAmount);

  return mostSleptGuard.guardId * maxSleepMin;
}

function part2(input) {
  input.sort();
  const guardData = parseToEvents(input);
  const sleeperGuard = getSleepingGuardForMinute(guardData);
  return sleeperGuard.id * sleeperGuard.minute;
}

module.exports = {
  part1,
  part2,
};
