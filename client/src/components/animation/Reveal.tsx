import React, { useEffect, useRef } from "react";
import { useAnimation, motion, useInView } from "framer-motion";

export const Reveal = ({
  children,
  width = "fit-content",
  center = false,
  delayTime = 0.25,
  height = "auto",
}: {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  center?: boolean;
  delayTime?: number;
  height?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const mediaControlls = useAnimation();
  useEffect(() => {
    if (inView) {
      mediaControlls.start("visible");
    }
  }, [inView]);
  return (
    <div ref={ref} style={{ position: "relative", width, height }}>
      <motion.div
        style={{ width: "100%", height: "100%" }}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mediaControlls}
        transition={{ delay: delayTime, ease: "easeInOut", duration: 0.5 }}
        className={center ? "text-center" : ""}
      >
        {children}
      </motion.div>
    </div>
  );
};
