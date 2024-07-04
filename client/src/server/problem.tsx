import { isRecord } from "../functions";

export type Problem = {
    _id: string,
    title: string,
    url: string,
    description: string,
    starterCode: string,
    difficulty: string,
}

const checkTypeProblem = (obj: Record<string, string>): boolean => {
    if (typeof obj['_id'] !== "string") {
        return false;
    }
    if (typeof obj['title'] !== "string") {
        return false;
    }
    if (typeof obj['url'] !== "string") {
        return false;
    }
    if (typeof obj['description'] !== "string") {
        return false;
    }
    if (typeof obj['starterCode'] !== "string") {
        return false;
    }
    if (typeof obj['difficulty'] !== "string") {
        return false;
    }
    return true;
}

export type ListProblemsCallback = (problems: Array<Problem>) => void;

export const listProblems = (cb: ListProblemsCallback) => {

    fetch('http://localhost:3000/api/problem/list', {
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

const doListJson = (problems: Array<Problem>, cb: ListProblemsCallback) => {

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


    fetch(`http://localhost:3000/api/problem/load/${endpoint}`, {
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

export type runCallback = (out: Record<string, string>) => void;

export const runProblem = (code: string, tests: Array<any>, cb: runCallback) => {
    fetch('http://localhost:3000/api/problem/python', {
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

const doRunJson = (out: any, cb: runCallback) => {
    // if (!isRecord(out)) {
    //     doLoadError('item not of type problem')
    //     return;
    // }
    // console.log(out)
    // if (typeof out['error'] !== "string") {
    //     doLoadError('out is missing error')
    //     return;
    // }
    // if (typeof out['stdout'] !== "string") {
    //     doLoadError('out is missing stdout')
    //     return;
    // }
    cb(out)
}

const doRunError = (msg: string) => {
    console.error(msg)
}


