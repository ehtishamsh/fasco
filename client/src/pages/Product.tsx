import ColorCheckbox from "@/components/product/ColorCheckbox";
import SelectSize from "@/components/product/SelectSize";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import DeliverySection from "@/components/product/DeliverySection";
import TopDetailsGrid from "@/components/product/TopDetailsGrid";
import Details from "@/components/product/Details";
import ProductReview from "@/components/product/ProductReview";
import Recommended from "@/components/product/Recommended";
import { Product as Data } from "@/lib/redux/types";
import { useDispatch } from "react-redux";
import { add } from "@/lib/redux/cartSlice";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { BreadCrum } from "@/components/BreadCrum";
import Loading from "@/components/ui/Loading";
import { toast } from "@/components/ui/use-toast";

interface Variant {
  id: string;
  name: string;
  price: string;
}
interface Color {
  id: string;
  name: string;
}
function Product() {
  const [data, setData] = useState<Data>();

  const [variant, setVariant] = useState<Variant[]>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState<Color[]>([]);
  const { title } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const request = await fetch(
          `https://fascobackend-production.up.railway.app/api/products/${title}`,
          {
            method: "GET",
          }
        );

        const response = await request.json();
        if (response) {
          setLoading(false);
        }
        setData(response.product);
        setVariant(response.product.variants);
        setSelectSize(response.product.variants[0]);
        setColor(response.product.colors);
        setOnChange(response.product.colors[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setData({} as Data);
    };
  }, []);
  const [selectSize, setSelectSize] = useState<Variant>();
  // @ts-ignore
  const [onChange, setOnChange] = useState<Color>();
  const handleClick = () => {
    const productNew: Data = {
      ...(data as Data),
      selectedVariant: selectSize,
      selectedColor: onChange,
      quantity: 1,
    };

    dispatch(add(productNew));
    toast({
      title: "Product added",
      description: "Product added to cart",
      variant: "success",
    });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto pb-20 px-4 max-md:pb-16 max-sm:pb-0">
        <div className="mb-10">
          {data?.category && data?.brand && (
            <BreadCrum
              cat={data?.category as string}
              brand={data?.brand as string}
              productName={data?.title}
            />
          )}
        </div>
        {loading ? (
          <div className="h-[60vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="mt-20 max-md:mt-16 max-sm:mt-7">
              <div className="grid grid-cols-2 gap-8 max-md:gap-6 max-sm:gap-2 max-md:grid-cols-1">
                <div className="flex justify-center cursor-pointer border-2 items-center border-border p-20 max-md:p-4 max-sm:p-3">
                  <Zoom>
                    <img
                      src={`https://fascobackend-production.up.railway.app${data?.cover}`}
                      alt={data?.title}
                      className=" object-cover max-h-[600px] max-md:max-h-[400px] max-sm:max-h-[300px]"
                    />
                  </Zoom>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-6 max-sm:mb-2 max-md:text-2xl max-sm:text-lg">
                    {data?.title}
                  </h1>
                  {Number(data?.discounted) > 0 ? (
                    <div className="flex ju gap-2">
                      <s className="text-3xl mb-6 max-sm:mb-2  max-md:text-xl max-sm:text-lg">
                        ${Number(data?.price) + Number(selectSize?.price)}
                      </s>
                      <span className="text-3xl mb-6 max-sm:mb-2  max-md:text-xl max-sm:text-lg text-red-500 italic">
                        ${Number(data?.discounted) + Number(selectSize?.price)}
                      </span>
                    </div>
                  ) : (
                    <h2 className="text-3xl mb-6 max-sm:mb-2  max-md:text-xl max-sm:text-lg">
                      ${Number(data?.price) + Number(selectSize?.price)}
                    </h2>
                  )}
                  {/* Select color */}
                  <div className="flex items-center mb-6 max-sm:mb-2">
                    <p className="text-sm mr-4">Select color:</p>
                    {color && color.length > 0 && (
                      <ColorCheckbox
                        colors={color}
                        onChange={setOnChange as any}
                      />
                    )}
                  </div>
                  {/* Select variation or size, if any */}
                  <div className="flex items-center max-sm:justify-evenly max-sm:flex-wrap gap-5  max-sm:gap-2 ">
                    {variant && variant.length > 0 && selectSize && (
                      <SelectSize
                        sizes={variant}
                        selectedSize={selectSize}
                        setSelectedSize={setSelectSize as any}
                      />
                    )}
                  </div>
                  {data && <TopDetailsGrid data={data} />}
                  <p className="text-gray-700/80 mt-6 text-sm leading-relaxed  line-clamp-3">
                    {data?.description}
                  </p>
                  <div className=" grid grid-cols-2 max-sm:grid-cols-1   max-sm:gap-3 gap-5 mt-6">
                    <Button
                      variant={"outline"}
                      className="border border-foreground py-7"
                      size={"lg"}
                    >
                      Add to Wishlist
                    </Button>
                    <Button
                      variant={"default"}
                      className="border border-foreground py-7"
                      size={"lg"}
                      onClick={handleClick}
                    >
                      Add to Cart
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap  justify-evenly items-center gap-5">
                    <DeliverySection />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 max-md:mt-16 max-sm:mt-7 bg-gray-100 max-sm:bg-inherit py-20 max-md:py-16 max-sm:py-2">
              {data && <Details data={data} />}
            </div>
            <div className="mt-20 max-md:mt-16 max-sm:mt-0 py-10 max-sm:py-6 ">
              <ProductReview />
            </div>
            <div className="mt-8 max-md:mt-6 max-sm:mt-0 py-10 max-sm:py-6 ">
              <Recommended />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Product;
