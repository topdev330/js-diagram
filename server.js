const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const app = express();
const port = process.env.PORT || 3011;

const fs = require('fs');
const path = require('path');

const k8sObjsDir = './objJsons';

function getK8sObjs(callback) {
  var fileObjs = fs.readdirSync(k8sObjsDir)
  .filter(name => path.extname(name) === '.json');
  var obj = {};
  async.forEachOf(fileObjs, (value, key, callback) => {
    fs.readFile(`${k8sObjsDir}/${value}`, (err, data) => {
        if (err) return callback(err);
        var keyName = value.replace(".json", "");
        obj[keyName] = {};
        obj[keyName] = JSON.parse(data);
        callback();
    });
  }, err => {
    callback(obj);
  });

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/k8sObjs', (req, res) => {
  getK8sObjs((data) => {
    res.send(data);
  })
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));