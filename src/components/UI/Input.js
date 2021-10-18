import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  //the spread operator automaitcally adds the arguments to JSX elems
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
