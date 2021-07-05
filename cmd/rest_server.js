const StepFnService = require('../lib/stepFn');
const express = require('express')
const app = express();

app.use(express.json())

app.post('/auth/confirm', async (req, res) => { // taskToken handler
  try {
    await StepFnService.sendTaskToken(req.body.token);
    res.sendStatus(200);
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

app.listen(3000);