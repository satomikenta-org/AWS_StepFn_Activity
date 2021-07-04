const StepFnService = require('../lib/stepFn');

(async() => {
  try {
    const name = process.argv[2];
    const status = await StepFnService.getStatusById(name);
    console.log(" status ", status); 
  } catch (ex) {
    console.log(" failed to get a execution status ", ex);  
  }
})();
