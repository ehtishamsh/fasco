import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" bg-black">
      <div className="max-w-6xl mx-auto px-2 py-28 max-sm:py-20 text-white">
        <div className="grid grid-cols-1  gap-11 max-sm:gap-6">
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-32 max-md:gap-20 max-sm:gap-6">
            <div className="flex justify-start items-start ">
              <div>
                <img src="/logo.png" alt="" className="max-w-[100px]" />
                <p className="text-xs text-gray-300 mt-4">
                  We're your one-stop online shop for everything you need. From
                  electronics to fashion, home decor to kitchen essentials.
                </p>
              </div>
            </div>
            <div className="flex flex-col  h-full justify-start items-start  max-sm:justify-center max-sm:items-center">
              <h1 className="text-xl font-semibold mb-4 max-sm:text-base">
                Information
              </h1>
              <div className="text-base max-sm:text-sm text-gray-300 flex flex-col gap-4 max-sm:justify-center max-sm:items-center">
                <Link to="/">Home</Link>

                <Link to="/">Shop</Link>

                <Link to="/">About Us</Link>

                <Link to="/">Our's Blog</Link>
              </div>
            </div>
            <div className="flex flex-col  h-full justify-start items-start  max-sm:justify-center max-sm:items-center">
              <h1 className="text-xl font-semibold mb-4 max-sm:text-base">
                Information
              </h1>
              <div className="text-base max-sm:text-sm text-gray-300 flex flex-col gap-4 max-sm:justify-center max-sm:items-center">
                <Link to="/">Home</Link>

                <Link to="/">Shop</Link>

                <Link to="/">About Us</Link>

                <Link to="/">Our's Blog</Link>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 max-sm:justify-center">
            <a
              href="https://twitter.com"
              className="rounded-full p-2 border border-border"
            >
              <RiTwitterXLine className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              className="rounded-full p-2 border border-border"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              className="rounded-full p-2 border border-border"
            >
              <InstagramLogoIcon width={20} height={20} />
            </a>
            <a
              href="https://Youtube.com"
              className="rounded-full p-2 border border-border"
            >
              <FaYoutube className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
