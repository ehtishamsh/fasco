import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Reveal } from "../animation/Reveal";
interface Data {
  src: string;
  alt: string;
  title: string;
  description: string;
  bg_color: string;
}

export function GridCarousel({ data }: { data: Data[] }) {
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
    <Reveal delayTime={0.5}>
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
    </Reveal>
  );
}
