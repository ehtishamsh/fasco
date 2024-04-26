import { CiApple } from "react-icons/ci";
import { SiSamsung } from "react-icons/si";

function Brands() {
  return (
    <div className="py-10 mt-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <img
          src="/brand-1.png"
          className="max-w-44 max-md:max-w-28 max-sm:max-w-14 transition-all duration-300"
          alt=""
        />
        <img
          src="/brand-2.png"
          className="max-w-44 max-md:max-w-28 max-sm:max-w-14 transition-all duration-300"
          alt=""
        />
        <img
          src="/brand-3.png"
          className="max-w-44 max-md:max-w-28 max-sm:max-w-14 transition-all duration-300"
          alt=""
        />
        <img
          src="/brand-4.png"
          className="max-w-44 max-md:max-w-28 max-sm:max-w-14 transition-all duration-300"
          alt=""
        />
        <img
          src="/brand-5.png"
          className="max-w-44 max-md:max-w-28 max-sm:max-w-14 transition-all duration-300"
          alt=""
        />
      </div>
    </div>
  );
}

export default Brands;
