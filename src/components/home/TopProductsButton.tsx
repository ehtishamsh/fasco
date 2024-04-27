import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const activeData = [
  {
    name: "new",
    title: "New Arrivals",
  },
  {
    name: "best",
    title: "Bestsellers",
  },
  {
    name: "featured",
    title: "Featured",
  },
];
type Data = {
  name: string;
  title: string;
};
function TopProductsButton({
  active,
  setActive,
}: {
  active: string;
  setActive: Function;
}) {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    setData(activeData);
  }, []);
  const elementCreate: JSX.Element[] = data?.map((item, i) => {
    return (
      <Button
        variant={"ghost"}
        name={item.name}
        key={i}
        onClick={() => setActive(item.name)}
      >
        <span
          className={`transition-all duration-300 ${
            active === item.name ? "underline underline-offset-8" : ""
          }`}
        >
          {item.title}
        </span>
      </Button>
    );
  });
  return <div className="flex items-center justify-start">{elementCreate}</div>;
}

export default TopProductsButton;
