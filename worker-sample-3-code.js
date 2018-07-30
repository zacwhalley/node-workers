const { parentPort } = require('worker_threads');

let random = (min, max) => {
    return Math.random() * (max - min) + min;
}

const sorter = require('./worker-sample-sorter');

const start = Date.now();
let bigList = Array(1000000).fill().map((_) => random(1, 10000));

sorter.sort(bigList);
parentPort.postMessage({val: sorter.firstValue, timeDiff: Date.now() - start});