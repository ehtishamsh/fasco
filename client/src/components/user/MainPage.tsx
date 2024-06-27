import { User } from "@/lib/redux/types";
import { Link } from "react-router-dom";

function MainPage() {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="w-full">
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Manage My Account
        </h1>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 max-sm:gap-2 max-sm:grid-cols-1">
        <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center border border-border rounded-lg">
          <h1 className="text-sm">
            Personal Profile <span className="text-gray-400 text-sm"> | </span>
            <Link to={"/profile"} className="text-yellow-600">
              Edit
            </Link>
          </h1>
          <div className="mt-2">
            <h1 className="text-sm mb-2">
              {user.firstname} {user.lastname}
            </h1>
            <h1 className="text-sm">{user.email}</h1>
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 border border-border rounded-lg ">
          <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center border-r border-border">
            <h1 className="text-sm">
              Address Book<span className="text-gray-400 text-sm"> | </span>
              <Link to={"/profile"} className="text-yellow-600">
                Edit
              </Link>
            </h1>
            <span className="text-gray-400 text-xs">
              DEFAULT DELIVERY ADDRESS
            </span>
            <div className="mt-2">
              <h1 className="text-sm mb-2 font-semibold">
                {user.firstname} {user.lastname}
              </h1>
              <div className="text-xs flex flex-col gap-2">
                <span>123, High Street, Cambridge, CB2 1TN</span>
                <span>Cambridge - CB2 1TN - UK</span>
                <span>(+44 123 456 789)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 max-sm:p-2 max-sm:justify-center">
            <span className="text-gray-400 text-xs mt-[30px]">
              DEFAULT BILLING ADDRESS
            </span>
            <div className="mt-2">
              <h1 className="text-sm mb-2 font-semibold">
                {user.firstname} {user.lastname}
              </h1>
              <div className="text-xs flex flex-col gap-2">
                <span>123, High Street, Cambridge, CB2 1TN</span>
                <span>Cambridge - CB2 1TN - UK</span>
                <span>(+44 123 456 789)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
