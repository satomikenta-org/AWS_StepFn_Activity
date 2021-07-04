const AWS = require('aws-sdk');
const STATE_MACHINE_ARN = process.env.STATE_MACHINE_ARN;

const ExecutionStatus = {
  InProgress: "RUNNING", // 実行中のexecution
  Completed: "SUCCEEDED", // 完了したexecution
  Failed: "FAILED" // 失敗したexecution
}


class StepFnService {
  StepFunctions = null;

  constructor() {
    const awsConfig = new AWS.Config({
      region: "ap-northeast-1" // state machine がある region
    });
    this.StepFunctions = new AWS.StepFunctions(awsConfig);
  }

  async enqueue (name, payload) {
    var params = {
      name: name, // execution id
      input: JSON.stringify(payload),
      stateMachineArn: STATE_MACHINE_ARN
    }
    return await this.StepFunctions.startExecution(params).promise()
  }

  async getStatusById(id) {
    const list = await this.StepFunctions.listExecutions({ 
      stateMachineArn: STATE_MACHINE_ARN,
      // statusFilter: ExecutionStatus.InProgress,
    }).promise();
    return list.executions.find(exe => exe.name === id).status;
  }
}

module.exports = new StepFnService();