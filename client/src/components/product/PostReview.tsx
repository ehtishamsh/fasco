import { User } from "@/lib/redux/types";
import React, { useEffect, useState } from "react";

function PostReview() {
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    if (!user) {
      window.location.href = "/signin";
    }
    if (user.id) {
      const fetchData = async () => {
        try {
          const req = await fetch(
            `http://localhost:4000/api/review/user/${user.id}`,
            {
              method: "GET",
            }
          );
          const res = await req.json();
          if (res.status === 200) {
            setShowInput(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
    return () => {};
  }, []);
  return <div>PostReview</div>;
}

export default PostReview;
