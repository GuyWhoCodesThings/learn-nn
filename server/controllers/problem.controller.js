import Problem from "../models/problem.model.js";
import * as fs from 'fs';
import {PythonShell} from 'python-shell';
import { isSafe } from "../utils/checkCode.js";

export const createProblem = async (req, res) => {

    try {
     
        const {title, description, starterCode, difficulty} = req.body;

        if (typeof title === 'undefined') {
            res.status(400).send('title must exist')
            return;
        }
        if (typeof description === 'undefined') {
            res.status(400).send('description must exist')
            return;
        }
        if (typeof starterCode === 'undefined') {
            res.status(400).send('starter code must exist')
            return;
        }
        if (typeof difficulty=== 'undefined') {
            res.status(400).send('difficulty must exist')
            return;
        }

        const problemFound = await Problem.findOne({title})

        if (problemFound) {
            res.status(422).json({error: "user already exists"})
            return;

        } else {
            const url = title.toLowerCase().replace(/\s+/g, '-')
            const newProblem = new Problem({
                title: title,
                url: url,
                description: description,
                starterCode: starterCode,
                difficulty: difficulty,           
            })
             await newProblem.save()
            res.status(201).json({message: `problem ${title} created successfully`})
        }

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const loadProblem = async (req, res) => {

    try {
        const url = req.params.id

        if (typeof url !== 'string') {
            res.status(400).send('url must be a string')
            return;
        }
        const problem = await Problem.findOne({url})
        if (!problem) {
            res.status(400).json({message: `problem of name ${url} doesn't exists`})
            return;
        }
  
        res.status(200).json(problem)
        

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    }
}

export const listProblems = async (_req, res) => {

    try {

        const problems = await Problem.find()
        
        if (!problems || problems.length === 0) {
            res.status(400).json({message: "no problems"})
            return;
        }
        res.status(200).json(problems)
        
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server error" });
    } 
}
export const python = (req, res) => {

    const ms = 30000
    const tests = req.body.tests;
    const userCode = req.body.code.replace(/\u00A0/g, " ")
    const safe = isSafe(userCode)
    if (!safe) {
        const testCaseResults = []
        for(let i = 0; i < tests.length; i++){
            testCaseResults.push({result: {
                out: [],    // To capture stdout messages
                result: "", // To store the final result
                message: "", // To store the message (e.g., 'passed' or 'failed')
                error: "unsafe code",   // To store any errors encountered
                time: 0
            }})
        }
        res.json({ testCaseResults, time: 0});
        return;
    }
    const code = "import torch\n" + userCode;
    

    fs.writeFileSync("submission.py", code);

    const promises = [];
    const testCaseResults = [];

    const start = performance.now();

    tests.forEach((test) => {
        promises.push(
            new Promise((resolve, reject) => {

                const tempResults = {
                    out: [],    // To capture stdout messages
                    result: "", // To store the final result
                    message: "", // To store the message (e.g., 'passed' or 'failed')
                    error: "",   // To store any errors encountered
                    time: 0
                };

                const command = `test.py`; // Limit to 1GB (1048576 KB)
                // console.log("test: ", test)
                const shell = new PythonShell(command, {
                    mode: "text",
                    pythonOptions: ["-u"],
                    args: [test[0]].concat(test.map(arg => JSON.stringify(arg)).slice(1)),
                });

                const kill = setTimeout(() => {
                    tempResults.error += `\nScript timed out after ${ms} ms`;
                    shell.childProcess.kill();
                }, ms)

                

                shell.on("error", (err) => {
                    tempResults.error += "\n" + err.message;
          
                    reject(err); // Reject promise on error
                });

                shell.on("stderr", (stderr) => {
           
                    tempResults.error += "\n" + stderr;
                });

                shell.on("message", (message) => {
                    try {
                        const parsedMessage = JSON.parse(message);
                        if (parsedMessage.hasOwnProperty('out')) {
                            tempResults.out.push(parsedMessage.out);
                        }
                        if (parsedMessage.hasOwnProperty('result')) {
                            tempResults.result = parsedMessage.result;
                        }
                        if (parsedMessage.hasOwnProperty('message')) {
                            tempResults.message = parsedMessage.message;
                        }
                    } catch (err) {
                        tempResults.error = "Failed to parse JSON response";
                        tempResults.message = message; // Store the original message
                    }
                });

                shell.end((err) => {
                    
                    if (err) {
                        tempResults.error += `\nEnd Error: ${err.message}`;
                        testCaseResults.push({ result: tempResults });
                        reject(err);
                    } else {
                        testCaseResults.push({ result: tempResults });
                        resolve(true);
                    }
                    clearTimeout(kill)
                });
            })
        );
    });

    Promise.allSettled(promises)
        .then(() => console.log(testCaseResults))
        .then(() => Math.floor(performance.now() - start))
        .then((time) => {
            res.json({ testCaseResults, time: time });
        })
        .catch((time, err) => {
            console.error("Promise.all Error:", err);
            res.json({ testCaseResults, time: time });
        });
};
