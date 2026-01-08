import { spawn } from "node:child_process";
import net from "node:net";

function waitTcp(port, host = "127.0.0.1", timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const socket = net.connect(port, host);
      socket.once("connect", () => {
        socket.end();
        resolve(true);
      });
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for tcp:${host}:${port}`));
        } else {
          setTimeout(tick, 300);
        }
      });
    };
    tick();
  });
}

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });
    p.on("exit", (code) => (code === 0 ? resolve(0) : reject(new Error(`${cmd} exited with ${code}`))));
  });
}

const stub = spawn("npm", ["run", "specmatic:stub"], { stdio: "inherit", shell: true });

try {
  await waitTcp(9000, "127.0.0.1", 60000);
  await run("npm", ["run", "test:contracts"]);
} finally {
  stub.kill("SIGINT");
  setTimeout(() => stub.kill("SIGKILL"), 2000).unref();
}
