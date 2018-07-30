const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const request = require('request');

if (isMainThread) { // MAIN THREAD CODE
    console.log("MAIN THREAD");

    let worker = new Worker(__filename, {workerData: null});
    worker.on('message', (msg) => {
        console.log(`First value is: ${msg.val}`);
        console.log(`Took: ${msg.timeDiff / 1000} seconds`);
    });
    worker.on('error', console.error);
    worker.on('exit', (exitCode) => {
        if(exitCode != 0) {
            console.error(new Error(`Worker stopped with exit code ${exitCode}`));
        }
    });

    request.get('http://www.google.com', (err, resp) => {
        if(err) {
            return console.error(err);
        }
        console.log(`Total bytes received: ${resp.body.length}`);
    });
}
else { // WORKER'S CODE
    let random = (min, max) => {
        return Math.random() * (max - min) +  min;
    }

    const sorter = require("./worker-sample-sorter");

    const start = Date.now();
    let bigList = Array(1000000).fill().map((_) => random(1, 10000));

    sorter.sort(bigList);
    parentPort.postMessage({val: sorter.firstValue, timeDiff: Date.now() - start});
}