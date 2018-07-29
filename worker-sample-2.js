const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const request = require('request');