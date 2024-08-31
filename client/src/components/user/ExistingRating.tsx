import { Input } from "../ui/input";

const ExistingRating = ({
  ratings,
  comment,
}: {
  ratings: number;
  comment: string;
}) => {
  return (
    <>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <svg
              key={index}
              className={`cursor-pointer w-8 h-8 ${
                ratingValue <= ratings ? "text-yellow-500" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927a.75.75 0 011.902 0l1.03 3.17a.75.75 0 00.708.515h3.346c.658 0 .936.84.404 1.196l-2.707 1.83a.75.75 0 00-.272.832l1.03 3.17c.21.646-.54 1.185-1.104.832l-2.707-1.83a.75.75 0 00-.884 0l-2.707 1.83c-.564.353-1.314-.186-1.104-.832l1.03-3.17a.75.75 0 00-.272-.832L3.51 7.808c-.532-.356-.254-1.196.404-1.196h3.346a.75.75 0 00.708-.515l1.03-3.17z" />
            </svg>
          );
        })}
      </div>
      <div className="flex flex-col justify-center gap-1 mt-2">
        <span className="text-gray-500 text-xs mb-2">Comment :</span>
        <Input type="text" value={comment || ""} disabled />
      </div>
    </>
  );
};

export default ExistingRating;
