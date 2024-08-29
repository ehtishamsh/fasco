import { Link, useParams } from "react-router-dom";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { useEffect, useState } from "react";
import { Order } from "@/lib/redux/types";
import Loading from "../ui/Loading";
import { StarIcon, Stars } from "lucide-react";
import { Button } from "../ui/button";

function GiveReview() {
  const [orders, setOrders] = useState<Order>();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/order/" + id);
        const data = await response.json();
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard", "Reviews"]} end={"Give Review"} />
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Give Review
        </h1>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2">
        {loading ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="border border-gray-300/85 rounded-lg mt-3 gap-2 text-sm  items-center">
              <div className="flex justify-between items-center border-b border-gray-300/85  px-4 py-2 ">
                <div className=" flex flex-col gap-1">
                  <span className="text-gray-500 text-sm">
                    Delivered on{" "}
                    {new Date(orders?.updatedAt || 0).toDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-4 px-6 py-2 ">
                {orders?.items &&
                  orders?.items.map((item) => (
                    <>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between gap-4 items-start">
                          <span>
                            <img
                              src={"http://localhost:4000" + item.product.cover}
                              alt=""
                              className="w-16 h-16 rounded-lg"
                            />
                          </span>
                          <span className="w-full   grid grid-cols-1  gap-2">
                            <Link
                              to={`/${
                                typeof item.product.category === "object" &&
                                item.product.category.name.toLowerCase()
                              }/${
                                typeof item.product.brand === "object" &&
                                item.product.brand.name.toLowerCase()
                              }/${item.product.slug}`}
                              className="text-primary underline"
                            >
                              {item.product.title}
                            </Link>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              Color :{" "}
                              <span
                                className="w-[10px] h-[10px] inline-block rounded-full border border-muted-foreground"
                                style={{ backgroundColor: item.color.color }}
                              >
                                &nbsp;
                              </span>
                              , Variant : {item.variant.variant}
                            </span>
                            <div className="flex items-center gap-1 mt-10">
                              {[...Array(5)].map((_, index) => (
                                <>
                                  <Button variant="ghost" size="icon">
                                    <StarIcon className="text-accent" />
                                  </Button>
                                </>
                              ))}
                            </div>
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GiveReview;
