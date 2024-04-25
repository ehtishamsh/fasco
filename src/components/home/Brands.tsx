import { useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useMeasure } from "@uidotdev/usehooks";
import { animate } from "framer-motion/dom";

function Brands() {
  const fast_duration = 25;
  const slow_duration = 75;
  const [duration, setDuration] = useState(fast_duration);
  const [ref, { width }] = useMeasure();
  const xTransition = useMotionValue(0);
  useEffect(() => {
    let controls;
    let finalPosition = -(width || 0) / 2 - 8;
    controls = animate(xTransition, [0, finalPosition], {
      ease: "linear",
      duration: duration,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });
  }, []);
  return <div className=""></div>;
}

export default Brands;
