
const express = require('express');
const { spawn } = require('child_process');
const { NodeVM } = require('vm2');
const {executions} = require('./config');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const restrictedPatterns = [/exec\(/, /spawn\(/, /rm/, /npm/, /git/, /ls/, /forever/, /killall/, /kill/, /fkill/, /taskkill/, /nodemon/, /node/, /cat/, /cd/];
const restrictedModules =  ['fs', 'express', 'vm2', 'child_process', 'child_process.promises', 'os', 'process']

function isCodeRestricted(code) {
    // Check for restricted modules
    const hasRestrictedModule = restrictedModules.some(module => {
        const requirePattern = new RegExp(`require\\(['"]${module}['"]\\)`);
        const importPattern = new RegExp(`import.*['"]${module}['"]`);
        return requirePattern.test(code) || importPattern.test(code);
    });

    // Check for restricted patterns
    // const hasRestrictedPattern = restrictedPatterns.some(pattern => pattern.test(code));

    // Return true if any restricted module or pattern is found
    return hasRestrictedModule ; //|| hasRestrictedPattern;
}


var javascriptCompiler = (req, res) => {
    var code = req.body.code;
    
    var response = {
        is_error: true,
        output: "",
        message: "Something went wrong"
    };

    // Check if the submitted code contains restricted patterns
    if (isCodeRestricted(code)) {
        response.message = "The module you import is currently unavailable but will be accessible shortly.";
        response.is_error = true;
        return res.send(response);
    }

    // create temp file if it doesn't exist
    const tempDir = path.resolve(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    // build file of temp name
    const filename = `code_${uuidv4()}.js`;
    const filepath = path.join(tempDir, filename);

    // create the file in temp root
    fs.writeFile(filepath, code, (err) => {
        if (err) {
            response.message = 'Internal server error.';
            response.is_error = true;
            return res.send(response);
        }

        // Spawn a child process to execute the code with 'node' as the command
        const execution = spawn(executions.javascript, [filepath], {
            cwd: tempDir,
            timeout: 1000,
            maxBuffer: 1024 * 1024, // 1MB buffer for stdout and stderr
            detached: true,
            stdio: ['ignore', 'pipe', 'pipe']
        });

        execution.on('error', (err) => {
            return res.send({
                is_error: true,
                message: 'An error occurred while trying to execute JavaScript:',
                data: err.message || err.toString()
            });
        });
        

        let stdout = '';
        let stderr = '';

        // Capture stdout
        execution.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        // Capture stderr
        execution.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        execution.on('close', (code, signal) => {
            fs.unlink(filepath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting temp file:', unlinkErr);
                }
            });

            if (stderr) {
                response.is_error = true;
                response.output = stderr;
                response.message = "An error occurred while executing your code.";
            } else {
                response.output = stdout;
                response.is_error = false;
                response.message = "Your code was executed successfully.";
            }

            return res.send(response);
        });
        
    });
}

module.exports = {javascriptCompiler}