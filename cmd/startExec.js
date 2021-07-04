const { v4: uuidv4 } = require('uuid');
const StepFnService = require('../lib/stepFn.js');

// State Machineの起動　
(async() => {
  const name = uuidv4(); // execution id. cannot be duplicated
  const payload = {
    arg1: "Hello",
    arg2: "World",
    name: String(name)
  }
  try {
    const execInfo = await StepFnService.enqueue(name, payload);
    console.log("executed successfully.", execInfo);
  } catch (ex) {
    console.log("failed to execute StateMachine: ", ex.message);
  }
})();