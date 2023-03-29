const functions = require('firebase-functions');
const { exec } = require('child_process');
const path = require('path');

exports.myFunction = functions.https.onRequest((request, response) => {
  const appPath = path.join(__dirname, 'IPRWC-Backend-0.0.1-SNAPSHOT.jar');
  const command = `java -jar ${appPath}`;
  exec(command, { cwd: '/tmp' }, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      response.status(500).send('Error running backend');
    } else {
      console.log(stdout);
      console.error(stderr);
      response.send('Backend executed successfully');
    }
  });
});
