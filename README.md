# StepFunctions Activity

### StateMachineのStartExecution
- STATE_MACHINE_ARN=<ARN> npm run start:exec

### Activity Workerの起動(Polling開始)
- ACTIVITY_ARN=<ARN> npm run start:worker

### 特定ExecutionのStatus取得
- STATE_MACHINE_ARN=<ARN> node cmd/getStatus <Execution ID>


### Sample StateMachine Definition
{
  "Comment": "This is your state machine",
  "StartAt": "Step Functions Run Activity",
  "States": {
    "Step Functions Run Activity": {
      "Type": "Task",
      "Resource": "arn:aws:states:ap-northeast-1:<YOUR-ACCOUNT>:activity:HelloWorldEc2Activity",
      "End": true,
      "Retry": [
        {
          "ErrorEquals": [
            "States.TaskFailed"
          ],
          "BackoffRate": 1,
          "IntervalSeconds": 1,
          "MaxAttempts": 2
        }
      ],
      "TimeoutSeconds": 30
    }
  }
}