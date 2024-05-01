import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { CgYoutube } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";

function Footer() {
  return (
    <div className=" bg-black">
      <div className="max-w-7xl mx-auto px-2 py-28 text-white">
        <div className="grid grid-cols-3 h-[50vh]">
          <div className="flex justify-between h-full  flex-col">
            <div>
              <img src="/logo.png" alt="" className="max-w-[100px]" />
              <p className="text-sm max-sm:text-xs text-gray-300 mt-4">
                We're your one-stop online shop for everything you need. From
                electronics to fashion, home decor to kitchen essentials.
              </p>
            </div>
            <div className="flex justify-start items-center gap-3">
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
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
