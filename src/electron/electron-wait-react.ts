import { Socket } from "net";

const port = process.env.PORT ? Number(process.env.PORT) - 100 : 3000;

process.env.ELECTRON_DEV_URL = `http://localhost:${port}`;

const client = new Socket();

let startedElectron = false;
const tryConnection = () => {
  // tslint:disable-next-line:no-console
  console.log(`Trying to connect on port ${port}...`);
  client.connect(
    { port },
    () => {
      client.end();
      if (!startedElectron) {
        startedElectron = true;
        const exec = require("child_process").exec;
        exec("npm run electron");
      }
    }
  );
};

tryConnection();

client.on("error", error => {
  setTimeout(tryConnection, 1000);
});
