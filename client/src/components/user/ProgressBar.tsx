import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Steps {
  label: string;
  text: string;
  completed: boolean;
}
const ProgressBar = ({
  steps,
  status,
}: {
  steps: Steps[];
  status?: string[];
}) => {
  function reverseArray(arr: string[]) {
    let reverse = [];
    for (let i = 0; i < arr.length; i++) {
      reverse.push(arr[arr.length - i - 1]);
    }
    return reverse;
  }

  const arr = reverseArray(status || []);

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex-1 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`w-8 h-8 max-sm:text-xs max-sm:w-6 max-sm:h-6 mx-auto rounded-full text-lg flex items-center justify-center ${
                step.completed
                  ? "bg-yellow-200 text-yellow-800 border border-yellow-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.completed ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check size={20} />
                </motion.span>
              ) : (
                index + 1
              )}
            </div>
            <p
              className={`mt-2 font-semibold max-sm:text-xs flex items-center flex-col ${
                step.completed ? "text-yellow-800" : "text-gray-600"
              }`}
            >
              {step.label}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        {steps.map(
          (step, index) =>
            index < steps.length - 1 && (
              <motion.div
                key={index}
                className={`flex-1 h-2 rounded-full animate-pulse ${
                  steps[index].completed && steps[index + 1].completed
                    ? "bg-yellow-600"
                    : "bg-gray-200"
                }`}
                initial={{ width: 0 }}
                animate={{ width: steps[index].completed ? "100%" : "0%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="hidden">{step.text}</span>
              </motion.div>
            )
        )}
      </div>
      <motion.div
        className="mt-3 bg-gray-100 rounded-lg flex flex-col gap-1 px-4 py-2 text-center font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {status &&
          arr.map((item, index) => (
            <motion.span
              key={index}
              className="text-xs text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item}
            </motion.span>
          ))}
      </motion.div>
    </div>
  );
};

export default ProgressBar;
