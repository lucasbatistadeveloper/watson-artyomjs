const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  username: 'apikey',
  password: 'opa3XZK9s7AsyO0GyXsv9iM1T9zJI1lDK6aLuuuwc6Ht',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2019-07-28',
});

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: 'bfd9ca0d-ad5e-414a-a382-72d80a4aa961',
    context,
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.listen(port, () => console.log(`Running on port ${port}`));
