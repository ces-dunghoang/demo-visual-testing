import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildProcess, spawn } from 'child_process';

@Injectable()
export default class VisualTestingService {
    constructor() 
        { }
        visualTesting() {
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
            });
            // Listen for the process to close
            child.on('close', (code: number) => {
                console.log(`child process exited with code ${code}`);
                return 'ok';
            });
        }
    }

