import { motion } from "framer-motion";

function CancelPage() {
  return <>
    <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-10 bg-white rounded-lg shadow-lg text-center"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold text-red-500 mb-4"
          >
            Payment Failed
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg mb-2"
          >
            Your payment was not successful
          </motion.p>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-lg"
          >
            Please try again
          </motion.p>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            redirecting to home page in 3 seconds...
          </motion.span>
        </motion.div>
      
  </>;
}

export default CancelPage;
