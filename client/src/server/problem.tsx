import { isRecord } from "../functions";

export type Problem = {
    _id: string,
    title: string,
    url: string,
    topic: string,
    description: string,
    args: [],
    returns: [],
    starterCode: string,
    difficulty: string,
    hints: [],
    constraints: [],
    tests: []
}

export type Submission = {
    testCaseResults: Array<{
        result: {
            error: string,
            message: string,
            out: [string],
            result: string,
            time: number
        }
    }>,
    time: number
}



const checkTypeProblem = (obj: Problem): boolean => {
    if (typeof obj['_id'] !== "string") {
        return false;
    }
    if (typeof obj['title'] !== "string") {
        return false;
    }
    if (typeof obj['url'] !== "string") {
        return false;
    }
    if (typeof obj['topic'] !== "string") {
        return false;
    }
    if (typeof obj['description'] !== "string") {
        return false;
    }
    if (typeof obj['args'] !== "object") {
        return false;
    }
    if (typeof obj['returns'] !== "object") {
        return false;
    }
    if (typeof obj['starterCode'] !== "string") {
        return false;
    }
    if (typeof obj['difficulty'] !== "string") {
        return false;
    }
    if (typeof obj['hints'] !== "object") {
        return false;
    }
    if (typeof obj['constraints'] !== "object") {
        return false;
    }
    if (typeof obj['tests'] !== "object") {
        return false;
    }
    return true;
}

const checkTypeSubmission = (s: Submission): boolean => {
    if (typeof s['time'] !== "number") {
        return false;
    }
    if (typeof s['testCaseResults'] !== "object") {
        return false;
    }
    return true;
}  

export type ListProblemsCallback = (problems: [Problem]) => void;

export const listProblems = (cb: ListProblemsCallback) => {

    fetch(`${import.meta.env.VITE_API_URL}/problem/list`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    } )
    .then((res) => doListResp(res, cb)) 
    .catch(() => doListError("failed to connect to server"));

}

const doListResp = (res: Response, cb: ListProblemsCallback) => {
    if (res.status === 200) {
        res.json().then((name) => doListJson(name, cb))
          .catch(() => doListError("200 response is not JSON"));
      } else if (res.status === 400) {
        res.text().then(doListError)
          .catch(() => doListError("400 response is not text"));
      } else {
        doListError(`bad status code: ${res.status}`);
      }
}

const doListJson = (problems: [Problem], cb: ListProblemsCallback) => {

    if (!Array.isArray(problems)) {
        doListError('response is not an array')
        return;
    }
    for(const item of problems){
        if (!checkTypeProblem(item)) {
            doListError('item is not a problem')
            return;
        }
    }
    cb(problems)

}

const doListError = (msg: string) => {
    console.error(msg)
}


export type LoadProblemCallback = (problem: Problem) => void;

export const loadProblem = (endpoint: string, cb: LoadProblemCallback) => {


    fetch(`${import.meta.env.VITE_API_URL}/problem/load/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    } )
    .then((res) => doLoadResp(res, cb)) 
    .catch(() => doLoadError("failed to connect to server"));

}


const doLoadResp = (res: Response, cb: LoadProblemCallback) => {
    if (res.status === 200) {
        res.json().then((name) => doLoadJson(name, cb))
          .catch(() => doLoadError("200 response is not JSON"));
      } else if (res.status === 400) {
        res.text().then(doLoadError)
          .catch(() => doLoadError("400 response is not text"));
      } else {
        doLoadError(`bad status code: ${res.status}`);
      }
}

const doLoadJson = (problem: Problem, cb: LoadProblemCallback) => {

    if (!checkTypeProblem(problem)) {
        doLoadError('item not of type problem')
        return;
    }
    cb(problem)

}

const doLoadError = (msg: string) => {
    console.error(msg)
}

export type runCallback = (out: Submission) => void;

export const runProblem = (code: string, tests: [], cb: runCallback) => {
    fetch(`${import.meta.env.VITE_API_URL}/problem/python`, {
        method: "POST",
        body: JSON.stringify({
            code: code,
            tests: tests,
        }),
        headers: {
            "Content-type": "application/json",
        }
    })
    .then((res) => doRunResp(res, cb)) 
    .catch(() => doRunError("failed to connect to server"));

}

const doRunResp = (res: Response, cb: runCallback) => {
    if (res.status === 200) {
        res.json().then((o) => doRunJson(o, cb))
          .catch(() => doRunError("200 response is not JSON"));
      } else if (res.status === 400) {
        res.text().then(doRunError)
          .catch(() => doRunError("400 response is not text"));
      } else {
        doRunError(`bad status code: ${res.status}`);
      }
}

const doRunJson = (out: Submission, cb: runCallback) => {
    if (!isRecord(out)) {
        doLoadError('item is not record')
        return;
    }
    if (!checkTypeSubmission(out)) {
        doLoadError('item not of type problem')
        return;
    }
    cb(out)
}

const doRunError = (msg: string) => {
    console.error(msg)
}


