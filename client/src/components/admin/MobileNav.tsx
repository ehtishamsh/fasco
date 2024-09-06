import { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { DashboardIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { UserSquare2, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { FaProductHunt } from "react-icons/fa";
import { TbBrandSass } from "react-icons/tb";
const links = [
  {
    href: "/admin",
    text: "Dashboard",
    icon: <DashboardIcon width={25} height={25} />,
    path: "/admin",
  },
  {
    href: "/admin/orders",
    text: "Orders",
    icon: <HamburgerMenuIcon width={25} height={25} />,
    path: "/admin/orders",
  },
  {
    href: "/admin/products",
    text: "Products",
    icon: <FaProductHunt width={25} height={25} />,
    path: "/admin/products",
  },
  {
    href: "/admin/users",
    text: "Users",
    icon: <UserSquare2 width={25} height={25} />,
    path: "/admin/users",
  },
  {
    href: "/admin/brands",
    text: "Brands",
    icon: <TbBrandSass width={25} height={25} />,
    path: "/admin/brands",
  },
  {
    href: "/admin/categories",
    text: "Categories",
    icon: <HamburgerMenuIcon width={25} height={25} />,
    path: "/admin/categories",
  },
];
function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const [leave, setLeave] = useState<boolean>(false);
  const path = useLocation().pathname;
  const mapLink = links.map((link, index) => {
    return (
      <motion.div key={index}>
        <Link
          to={link.href}
          target={link.path ? "_self" : "_blank"}
          className={`text-lg text-center min-w-max block mx-3 px-2 py-2 max-sm:text-sm hover:bg-gray-600 ${
            path === link.path ? "bg-gray-800 text-white" : " text-black"
          } transition-all duration-300 rounded-md border border-border flex justify-center items-center gap-3`}
        >
          <span>{link.icon}</span>
          {link.text}
        </Link>
      </motion.div>
    );
  });
  return (
    <>
      <div className="hidden max-md:block">
        <div
          className={`fixed top-0 left-0 h-screen w-screen bg-transparent  -z-50 ${
            open ? "block" : "hidden"
          }`}
          onClick={() => leave && setOpen(false)}
        >
          &nbsp;
        </div>
        <Button
          variant="outline"
          className={`p-1 ${open ? "z-[9999] absolute top-3 left-4" : ""}`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div>
            {open ? (
              <motion.span>
                <X width={25} height={25} />
              </motion.span>
            ) : (
              <HamburgerMenuIcon width={25} height={25} />
            )}
          </motion.div>
        </Button>
        {open ? (
          <motion.div
            variants={{
              hidden: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
              visible: {
                x: "0%",
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
            }}
            initial="hidden"
            animate={open ? "visible" : "hidden"}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
            className={`${
              open ? "visible" : "invisible"
            } text-white w-[50vw] h-screen bg-background border border-border absolute top-0 left-0 z-50`}
          >
            <motion.div
              className="w-full h-full relative mt-24 flex flex-col gap-4"
              onMouseLeave={() => setLeave(true)}
              onMouseEnter={() => setLeave(false)}
              onMouseOut={() => setLeave(true)}
            >
              {mapLink}
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </>
  );
}

export default MobileNav;
