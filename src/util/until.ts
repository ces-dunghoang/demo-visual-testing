import { ChildProcess, spawn } from 'child_process';

const visualTesting = () => {
  return new Promise((resolve, reject) => {
    // Command and arguments
    const command: string = 'npx';
    const args: string[] = ['playwright', 'test'];
    // Spawn the process
    const child: ChildProcess = spawn(command, args);

    // Listen for data from the process
    child.stdout.on('data', (data: Buffer) => {
      console.log(`stdout: ${data}`);
    });

    // Listen for errors from the process
    child.stderr.on('data', (data: Buffer) => {
      console.error(`stderr: ${data}`);
      reject(`Error during visual testing: ${data}`);
    });

    // Listen for the process to close
    child.on('close', (code: number) => {
      console.log(`child process exited with code ${code}`);
      resolve('ok');
    });
    child.on('exit', (code: number, signal: string) => {
      console.log(`child process exited with code ${code}, signal ${signal}`);
    });
  });
};

export default visualTesting;
