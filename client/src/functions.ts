import { iSet } from "./App";
import { UserProblem } from "./server/user.ts";

/**
 * Determines whether the given value is a record.
 * @param val the value in question
 * @return true if the value is a record and false otherwise
 */
export const isRecord = (val: unknown): val is Record<string, unknown> => {
    return val !== null && typeof val === "object";
};

export const userInfoToSet = (ps?: [UserProblem] | []): iSet => {
    
    const comp = new Set()
    const att = new Set()
    if (!ps) return {comp: comp, att: att}
    for (const p of ps) {
      if (p.status === 'completed') {
        comp.add(p.url)
      } else {
        att.add(p.url)
      }
    }
    return {comp: comp, att: att}
  }

