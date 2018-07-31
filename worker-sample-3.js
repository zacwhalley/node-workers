const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const request = require('request');

let startWorker = (path, callback) => {
    let worker = new Worker(path, {workerData: null});
    worker.on('message', (msg) => {
        callback(null, msg);
    });
    worker.on('error', callback);
    worker.on('exit', (exitCode) => {
        if(exitCode != 0) {
            return console.error(new Error(`Worker stopped with exit code ${exitCode}`));
        }
    });

    return worker;
}

console.log("MAIN THREAD");

let myWorker = startWorker(__dirname + '/worker-sample-3-code.js', (err, result) => {
    if(err) return console.error(err);
    console.log("[[Heavy computation function finished]]");
    console.log(`First value is: ${result.val}`);
    console.log(`Took: ${result.timeDiff / 1000} seconds`);
});

const start = Date.now();
request.get('http://www.google.com', (err, resp) => {
	if(err) {
		return console.error(err);
	}
	console.log("Total bytes received: ", resp.body.length);
});