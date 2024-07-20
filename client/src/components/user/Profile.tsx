import { User } from "@/lib/redux/types";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../ui/select";
import { BirthDayPicker } from "./BirthDayPicker";
import { toast } from "../ui/use-toast";

function Profile() {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const fullName = `${user.firstname} ${user.lastname}`;
  const [checkClick, setCheckClick] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [name, setName] = useState<string>(fullName);
  const [email, setEmail] = useState<string>(user.email);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const convertDate = new Date(date || "").toISOString();
    const updateUser = {
      id: user.id,
      firstname: name.split(" ")[0],
      lastname: name.split(" ")[1],
      email: email,
      gender: gender,
      date: convertDate,
    };
    const req = await fetch(`http://localhost:4000/api/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    const res = await req.json();
    if (res) {
      toast({
        title: "Profile Updated",
        description: "Profile updated successfully",
        variant: "success",
      });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };
  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard"]} end={"Profile"} />
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Profile
        </h1>
      </div>
      <form
        className="mt-6 grid grid-cols-1 gap-3 max-sm:gap-2 border border-gray-300/85 rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-start flex-col text-xs  gap-2 p-3">
          <span>Full Name</span>

          {!checkClick ? (
            <span className="text-sm  font-semibold">{name}</span>
          ) : (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          )}
        </div>
        <div className="flex justify-start flex-col text-xs  gap-2 p-3">
          <span>Email</span>

          {!checkClick ? (
            <span className="text-sm  font-semibold">{user.email}</span>
          ) : (
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          )}
        </div>
        <div className="flex justify-start flex-col text-xs  gap-2 p-3">
          <span>Gender</span>

          {!checkClick ? (
            <span className="text-sm  font-semibold">
              {user.gender === "m"
                ? "Male"
                : user.gender === "f"
                ? "Female"
                : "Other" || "Please enter your gender"}
            </span>
          ) : (
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-[100px] max-md:w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="m">Male</SelectItem>
                  <SelectItem value="f">Female</SelectItem>
                  <SelectItem value="o">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-start flex-col text-xs  gap-2 p-3">
          <span>Birthday</span>

          {!checkClick ? (
            <span className="text-sm  font-semibold">
              {new Date().getFullYear() -
                new Date(user.birthday || "").getFullYear() ||
                "Please enter your birthday"}
            </span>
          ) : (
            <div className="mb-5">
              <BirthDayPicker date={date as Date} setDate={setDate} />
            </div>
          )}
        </div>

        {!checkClick ? (
          ""
        ) : (
          <Button
            variant={"primary"}
            className="mt-6"
            size={"lg"}
            type="submit"
          >
            Save
          </Button>
        )}
      </form>
      {!checkClick && (
        <Button
          variant={"default"}
          className="mt-6 w-full"
          type="button"
          onClick={() => setCheckClick((prev) => !prev)}
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
}

export default Profile;
