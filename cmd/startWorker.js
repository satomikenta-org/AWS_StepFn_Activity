const StepFunctionWorker = require('step-function-worker');
const ACTIVITY_ARN = process.env.ACTIVITY_ARN;

const fn = function(input, cb, heartbeat) {
  // setTimeout(() => {
  //   cb(null, {"foo" : "bar"}); // 先にtimeoutしたら cbは機能しない。 => Retry設定があれば, Retryされる。
  // }, 1000 * 35);
  // throw new Error("Something Wrong"); // Retroy Policy に States.TaskFailed が設定されていれば, Retryされる。
  cb(null, { number : input.number });
};
 
const worker = new StepFunctionWorker({
  activityArn : ACTIVITY_ARN,
  workerName : 'MyActivityWorker',
  fn : fn,
  taskConcurrency : 1,
  awsConfig: {
    region: 'ap-northeast-1'
  }
});

worker.on('task', function(task){ // PollingでTaskを発見した際に呼び出される
  console.log("Worker1 task ", task.input)
});

worker.on('empty', function(){
  console.log("empty");
});

worker.on('error', function(err){
  console.log("error ", err)
  worker.close(() => process.exit());
});

worker.on('failure', function(failure){
  console.log("Failure :",failure.error)
  worker.close(() => process.exit());
});

process.on('SIGTERM', () => {
  console.log(" Close worker. ");
  worker.close(() => process.exit());
});
 
 



