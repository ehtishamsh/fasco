import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
const data = [
  {
    src: "/oneplus.png",
    alt: "OnePlus 12",
    title: "OnePlus 12",
    description:
      "The OnePlus 12 is a premium phone with a curved AMOLED display, Hasselblad-powered camera system, and a starting price of $799.",
    bg_color: "bg-white",
  },
  {
    src: "/watch.png",
    alt: "Galaxy Watch 6",
    title: "Galaxy Watch 6",
    description:
      "Galaxy Watch 6 is a bright, always-on Super AMOLED touch display, a touch bezel for scrolling, and a water-friendly sport band.",
    bg_color: "bg-gray-100",
  },
  {
    src: "/ipadpro.png",
    alt: "iPad Pro",
    title: "iPad Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking, and ease of use.",
    bg_color: "bg-gray-200",
  },
  {
    src: "/mc_grid.png",
    alt: "MacBook Pro",
    title: "MacBook Pro",
    description:
      "The new 15‑inch MacBook Pro makes room for more of what you love with a spacious Liquid Retina display.",
    bg_color: "bg-gray-700",
  },
];

export function GridCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex justify-center items-center flex-col overflow-hidden">
      <Carousel setApi={setApi} className="w-full max-w-[250px]">
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className={`grid grid-cols-1 rounded-md h-full border border-border ${item.bg_color}`}
              >
                <div className="p-6 max-sm:p-4 flex justify-center items-center">
                  <img
                    src={item.src}
                    alt=""
                    className="max-w-full object-cover max-h-80"
                  />
                </div>
                <div className="p-6 max-sm:p-4 flex flex-col gap-4 justify-end">
                  <h1 className="text-3xl max-md:text-xl max-sm:text-lg font-semibold">
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-500   line-clamp-3">
                    {item.description}
                  </p>
                  <Button variant={"default"} size={"lg"}>
                    Shop now
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground w-full">
        Slide {current} of {count}
      </div>
    </div>
  );
}
