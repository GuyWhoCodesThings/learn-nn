import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getUserInfo, UserWork } from "../server/user";

const Profile = (props: {userInfo: Array<any>, currentUser: User, totalProblems: number, getInfo: (u: User) => void}) => {

  const [problems, setProblems] = useState<Array<UserWork>>([]);

  useEffect(() => {
    props.getInfo(props.currentUser)
    
  }, [props.userInfo]);

  return (
    <div className="w-screen h-screen">
      <div className="m-6 bg-zinc-700 rounded-md p-3">
        <h3 className="font-bold text-3xl">Dashboard</h3>
        <p>email: {props.currentUser.email}</p>
      </div>

      <div className="bg-zinc-700 rounded-md p-5 flex justify-evenly m-6">
        <div className="font-semibold">
          {3} <span className="text-green-500 m-1">Easy</span>
        </div>
        <div>|</div>
        <div className="font-semibold">
          {2} <span className="text-yellow-500 m-1">Medium</span>
        </div>
        <div>|</div>
        <div className="font-semibold">
          {2} <span className="text-red-500 m-1">Hard</span>
        </div>
      </div>

      <div className="">
        <h3 className="bg-zinc-700 m-1 flex justify-center p-6 pl-5 pr-5 h-10 content-center items-center font-bold">
          <p className="items-center content-center">
            Completed: {props.userInfo && props.userInfo.filter((problem) => problem.status === 'completed').length} / {props.totalProblems}
          </p>
        </h3>
        <ul>
          {props.userInfo && props.userInfo.map((problem, idx) => {
            if (problem.status === 'completed') {
              return (
                <li key={idx} className="bg-zinc-700 p-4 pl-6 pr-6 m-1 rounded-md flex justify-between">
                  <div className="flex gap-2">
                    <NavLink to={"../problem/" + problem.url}>{problem.url}</NavLink>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className="">
        <h3 className="bg-zinc-700 m-1 flex justify-center p-6 pl-5 pr-5 h-10 content-center items-center font-bold">
          <p className="items-center content-center">
            Attempted: {props.userInfo && props.userInfo.filter((problem) => problem.status === 'attempted').length} / {props.totalProblems}
          </p>
        </h3>
        <ul>
          {props.userInfo && props.userInfo.map((problem, idx) => {
            if (problem.status === 'attempted') {
              return (
                <li key={idx} className="bg-zinc-700 p-4 pl-6 pr-6 m-1 rounded-md flex justify-between">
                  <div className="flex gap-2">
                    <NavLink to={"../problem/" + problem.url}>{problem.url}</NavLink>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
