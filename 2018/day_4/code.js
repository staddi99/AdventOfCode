import input from './input.js';
import inputSample from './inputSample.js';

const obj = ['String'].reduce(
  (obj, name) => {
    obj[`is${name}`] = (a) => toString.call(a) === `[object ${name}]`;
    return obj;
  },
  {
    isGenerator: (a) =>
      a instanceof
      function* () {
        yield;
      }.constructor,
  }
);
const { isString } = obj;

const maxBy = (cb) => (a, b) => cb(b) > cb(a) ? b : a;

const sortBy =
  (...cbs) =>
  (a, b) => {
    for (let i = 0; i < cbs.length; i++) {
      const cb = cbs[i].desc ? cbs[i].cb : cbs[i];
      const aa = cb(a);
      const bb = cb(b);
      const diff = cbs[i].desc
        ? isString(aa)
          ? bb.localeCompare(aa)
          : bb - aa
        : isString(aa)
        ? aa.localeCompare(bb)
        : aa - bb;
      if (diff !== 0) return diff;
    }
    return 0;
  };

const parseInput = (isTest) => {
  const data = isTest ? inputSample : input;
  const guards = {};

  let lastId;
  let lastTime;

  data
    .split('\n')
    .map((str) => {
      const [time, cmd] = str.match(/^\[(.*)\] (.*)/).slice(1);
      return {
        time: new Date(time),
        cmd,
      };
    })
    .sort(sortBy((cmd) => cmd.time))
    .forEach(({ time, cmd }) => {
      const [_, id] = cmd.match(/#(\d+)/) || [];

      if (id) {
        lastId = id;
        if (!guards[id]) {
          guards[id] = {
            days: {},
            totalSleep: 0,
            totalAwake: 0,
          };
        }
      } else {
        const date = time.toLocaleDateString();
        if (!guards[lastId].days[date]) {
          guards[lastId].days[date] = {
            asleep: [],
            awake: [],
          };
        }
        const day = guards[lastId].days[date];
        const timespan = { from: lastTime, to: time };
        if (cmd === 'wakes up') {
          day.asleep.push(timespan);
          guards[lastId].totalSleep += timespan.to - timespan.from;
        } else {
          day.awake.push(timespan);
          guards[lastId].totalAwake += timespan.to - timespan.from;
        }
      }

      lastTime = time;
    });

  return Object.entries(guards).map(([key, value]) => {
    const guard = value;
    guard.id = key;
    return guard;
  });
};

const getMinute = (time) => time.getHours() * 60 + time.getMinutes();

const getMinuteFrequency = (guard) => {
  const minutes = {};
  for (let i = 0; i < 24 * 60; i++) {
    minutes[i] = Object.entries(guard.days)
      .map(
        ([_, value]) =>
          value.asleep.filter(
            (span) => i >= getMinute(span.from) && i < getMinute(span.to)
          ).length
      )
      .reduce((a, b) => a + b, 0);
  }
  return minutes;
};

export function partOne(isTest) {
  const data = parseInput(isTest);
  const guard = data.reduce(maxBy((guard) => guard.totalSleep));

  const minutes = getMinuteFrequency(guard);

  const mostSleptMinute = Object.entries(minutes)
    .map(([key, value]) => ({ minute: parseInt(key), value }))
    .reduce(maxBy((minute) => minute.value)).minute;

  return guard.id * mostSleptMinute;
}

export function partTwo(isTest) {
  const data = parseInput(isTest);
  const frequencies = data.map((guard) => {
    const minutes = getMinuteFrequency(guard);
    return {
      id: guard.id,
      minutes,
      maxFrequency: Object.entries(minutes)
        .map(([key, value]) => ({ minute: parseInt(key), value }))
        .reduce(maxBy((minute) => minute.value)),
    };
  });
  const { id, maxFrequency } = frequencies.reduce(
    maxBy((freq) => freq.maxFrequency.minute)
  );
  return id * maxFrequency.minute;
}

console.log('Part 1: ' + partOne());
console.log('Part 2: ' + partTwo());
