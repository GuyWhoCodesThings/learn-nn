import { User } from "firebase/auth";
import { isRecord } from "../functions";

export type UserWork = Array<Record<string, string>>

export type UserProblem = {url: string, status: string, code: string}

const checkTypeUserProblem = (obj: Record<string, string>) => {
  if (typeof obj['title'] !== "string") {
    return false;
  }
  if (typeof obj['status'] !== "string") {
    return false;
  }
  if (typeof obj['code'] !== "string") {
    return false;
  }
  return true;

}


export type SaveUserCallback = (name: string) => void;

export const createUser = (user: User, cb: SaveUserCallback) => {


    user.getIdToken(true)
    .then((idToken) => {
      
      fetch(`${import.meta.env.VITE_API_URL}/user/sign-up`, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${idToken}`,
        }
      })
      .then((res) => doSaveResp(res, cb)) 
      .catch(() => doSaveError("failed to connect to server"));
    })

}


// Called when the server responds to a request to save
const doSaveResp = (res: Response, cb: SaveUserCallback): void => {
    if (res.status === 201) {
      res.json().then((name) => doSaveJson(name, cb))
        .catch(() => doSaveError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(doSaveError)
        .catch(() => doSaveError("400 response is not text"));
    } else {
      doSaveError(`bad status code: ${res.status}`);
    }
};

// Called when the save response JSON has been parsed.
const doSaveJson = (name: string, cb: SaveUserCallback): void => {
 
    cb(name);
};

// Called if an error occurs trying to save the file
const doSaveError = (msg: string): void => {
    console.error(`Error fetching /api/user/sign-up: ${msg}`);
};

export type LoadUserCallback = (problems: UserWork) => void;

export const loadUser = (user: User, cb: LoadUserCallback) => {

  
  user.getIdToken(true)
    .then((idToken) => {
      fetch(`${import.meta.env.VITE_API_URL}/user/load`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        }
      })
      .then((res) => doLoadUserResp(res, cb))
      .catch(() => doLoadUserError("failed to connect to server"));
    })
    .catch(() => doLoadUserError("failed to get token"));
};

const doLoadUserResp = (res: Response, cb: LoadUserCallback): void => {
  
  if (res.status === 200) {
    res.json()
      .then((problems) => doLoadUserJson(problems, cb))
      .catch(() => doLoadUserError("200 response is not JSON"));
  } else if (res.status === 400) {
    res.text()
      .then(doLoadUserError)
      .catch(() => doLoadUserError("400 response is not text"));
  } else {
    doLoadUserError(`bad status code: ${res.status}`);
  }
};

const doLoadUserJson = (problems: UserWork, cb: LoadUserCallback): void => {
 
  if (!Array.isArray(problems)) {
    doLoadUserError('problems not an array');
    return;
  }
  for (const p of problems) {
    if (!isRecord(p)) {
      doLoadUserError('problems must all be records');
      return;
    }
    // if (!checkTypeUserProblem(p)) {
    //   doLoadUserError(`problem is not valid: ${p}`);
    //   return;
    // }
  }

  cb(problems);
};

const doLoadUserError = (msg: string): void => {
  console.error(`Error fetching /api/user/load: ${msg}`);
};



export type LoadWorkCallback = (work: UserProblem) => void;

export const loadWork = (user: User, url: string, cb: LoadWorkCallback): void => {
  console.log('trying to load user code...')
  user.getIdToken(true)
  .then((idToken) => {
    fetch(`${import.meta.env.VITE_API_URL}/user/code?url=${url}` , {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${idToken}`,
      }
    })
    .then((res) => doLoadWorkResp(res, cb)) 
    .catch(() => doLoadWorkError("failed to connect to server"));

  })
  .catch(() => doLoadWorkError("failed to get token"))
}

const doLoadWorkResp = (res: Response, cb: LoadWorkCallback): void => {
  if (res.status === 200) {
    res.json().then((problem) => doLoadWorkJson(problem, cb))
      .catch(() => doLoadWorkError("200 response is not JSON"));
  } else if (res.status === 400) {
    res.text().then(doLoadWorkError)
      .catch(() => doLoadWorkError("400 response is not text"));
  } else {
    doLoadWorkError(`bad status code: ${res.status}`);
  }
};

const doLoadWorkJson = (problem: UserProblem, cb: LoadWorkCallback): void => {
  
  if (!isRecord(problem)) {
    doLoadWorkError('problem is not a record');
    return;
  }
  if (typeof problem['code'] !== 'string') {
    doLoadWorkError('code must be a string');
    return;
  }
  if (problem['code'] === '') {
    cb(problem)
    return;
  }
  if (typeof problem['url'] !== 'string') {
    doLoadWorkError('url must be a string');
    return;
  }
  if (typeof problem['status'] !== 'string') {
    doLoadWorkError('status must be a string');
    return;
  }
  
  cb(problem);
};

const doLoadWorkError = (msg: string): void => {
  console.error(`Error fetching /api/code: ${msg}`);
};


export type SaveWorkCallback = (msg: string) => void;

export const saveWork = (user: User, code: string, url: string, completed: boolean, time: number, cb: SaveWorkCallback) => {


    user.getIdToken(true)
    .then((idToken) => {
      fetch(`${import.meta.env.VITE_API_URL}/user/save`, {
        method: "POST",
        body: JSON.stringify({
          url: url,
          code: code,
          time: time,
          completed: completed,
        }),
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${idToken}`,
        }
      })
      .then((res) => doSaveWorkResp(res, cb)) 
      .catch(() => doSaveWorkError("failed to connect to server"));
    })
}
const doSaveWorkResp = (res: Response, cb: SaveWorkCallback): void => {
  if (res.status === 200) {
    res.json().then((msg) => cb(msg))
      .catch(() => doSaveWorkError("200 response is not JSON"));
  } else if (res.status === 400) {
    res.text().then(doSaveWorkError)
      .catch(() => doSaveWorkError("400 response is not text"));
  } else {
    doSaveWorkError(`bad status code: ${res.status}`);
  }
};

const doSaveWorkError = (msg: string): void => {
  console.error(`Error fetching /api/save: ${msg}`);
};

export type GetUserInfoCallback = (work: UserProblem) => void;

export const getUserInfo = (user: User, cb: GetUserInfoCallback): void => {
  
  user.getIdToken(true)
  .then((idToken) => {
    fetch(`${import.meta.env.VITE_API_URL}/user/code?url=${url}` , {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${idToken}`,
      }
    })
    .then((res) => doLoadWorkResp(res, cb)) 
    .catch(() => doLoadWorkError("failed to connect to server"));

  })
  .catch(() => doLoadWorkError("failed to get token"))
}


  
