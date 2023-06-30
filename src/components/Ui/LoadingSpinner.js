import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${classes.spinner} ${classes[props?.className] || ""}`}
    ></div>
  );
};

export default LoadingSpinner;
