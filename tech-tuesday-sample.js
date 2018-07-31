const { Worker, workerData } = require('worker_threads');

let startWorker = (path, callback) => {
    let worker = new Worker(path, {workerData: 0});
    worker.on('message', (msg) => {
        callback(msg);
    });

    return worker;
}

console.log("MAIN THREAD");

let myWorker = startWorker(__dirname + '/tech-tuesday-sample-worker.js', (result) => {
    setTimeout(() => {
        console.log(`[ MAIN ] value: ${result.value}`);
        myWorker.postMessage({value: result.value + 1});
    }, 1000);    
});