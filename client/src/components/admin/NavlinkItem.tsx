import { Link, useLocation } from "react-router-dom";

const NavLinkItem = ({
  to,
  Icon,
  label,
}: {
  to: string;
  Icon: any;
  label: string;
}) => {
  const { pathname } = useLocation();

  return (
    <Link reloadDocument to={to} className="mt-5">
      <span
        className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
          pathname === to ? "bg-accent" : ""
        } transparent`}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{label}</span>
      </span>
    </Link>
  );
};

export default NavLinkItem;
