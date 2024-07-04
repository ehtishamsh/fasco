import { Check } from "lucide-react";

interface Steps {
  label: string;
  text: string;
  completed: boolean;
}
const ProgressBar = ({ steps }: { steps: Steps[] }) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`w-8 h-8  max-sm:text-xs max-sm:w-6 max-sm:h-6 mx-auto rounded-full text-lg flex items-center justify-center ${
                step.completed
                  ? "bg-yellow-200 text-yellow-800 border border-yellow-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.completed ? (
                <span>
                  <Check size={20} />
                </span>
              ) : (
                index + 1
              )}
            </div>
            <p
              className={`mt-2 font-semibold  max-sm:text-xs flex items-center flex-col ${
                step.completed ? "text-yellow-800" : "text-gray-600"
              }`}
            >
              {step.label}
              <span className="text-xs font-normal text-gray-400 mt-1">
                {step.text}
              </span>
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        {steps.map(
          (step, index) =>
            index < steps.length - 1 && (
              <div
                key={index}
                className={`flex-1 h-1 ${
                  steps[index].completed && steps[index + 1].completed
                    ? "bg-yellow-600"
                    : "bg-gray-200"
                }`}
              >
                <span className="hidden">{step.text}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
