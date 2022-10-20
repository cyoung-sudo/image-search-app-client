import "./PopUp.css";
// React
import { useRef, useEffect } from "react";
// Animation
import { motion } from "framer-motion";

export default function PopUp(props) {
  // References
  const timerId = useRef(null);

  // Hide pop-up after specified time
  useEffect(() => {
    // Set timer
    timerId.current = setTimeout(() => {
      props.setShowPopUp(false);
    }, 3000);
    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    };
  }, []);

  // Override existing pop-up for new pop-ups
  useEffect(() => {
    // Clear timer in-progress
    clearTimeout(timerId.current);
    // Reset timer
    timerId.current = setTimeout(() => {
      props.setShowPopUp(false);
    }, 3000);
    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    }
  }, [props.overridePopUp]);

  return (
    <div id="popUp">
      <motion.div
        data-testid="popUp-msg"
        className={props.popUpType === "success" ? "popUp-success" : "popUp-error"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        {props.popUp}   
      </motion.div>
    </div>
  );
};