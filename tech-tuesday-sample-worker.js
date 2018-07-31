const { parentPort, workerData } = require('worker_threads');

console.log("WORKER THREAD");

const startValue = workerData;

parentPort.on('message', (msg) => {
    setTimeout(() => {
        console.log(`[ WORKER THREAD ] value ${msg.value}`);
        parentPort.postMessage({value: msg.value + 1});
    }, 1000);
});

parentPort.postMessage({value: workerData + 1});