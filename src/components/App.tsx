import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import avatarPng from "@/assets/Avatar.png";
import avatarJpeg from "@/assets/Avatar.png";
import CloceIcon from "@/assets/Calendar.svg";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    throw new Error()
  };

  const handleDecrement = () => {
    setCount((numb) => numb - 1);
  };

  return (
    <div data-testid="App.DataTestId">
      <h1>цлоуаилцоуиало</h1>
      <div>platforerkjgnejrngm={__PLATFORM__}</div>
      <div>
        <img width={100} height={100} src={avatarPng} alt="avatar" />
        <img width={100} height={100} src={avatarJpeg} alt="avatar" />
      </div>
      <div>
        <CloceIcon color={"blue"} width="100" height="100" />
      </div>
      <Link to={"/about"}>about</Link>
      <br />
      <Link to={"/shop"}>shop</Link>
      <br />
      <button className={classes.button} onClick={handleIncrement}>
        +
      </button>
      <span className={classes.text}>{count}</span>
      <button onClick={handleDecrement}>-</button>
      <Outlet />
    </div>
  );
};
