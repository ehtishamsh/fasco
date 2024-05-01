import { Reveal } from "../animation/Reveal";
import { Button } from "../ui/button";
import { GridCarousel } from "./GridCarousel";

interface Data {
  src: string;
  alt: string;
  title: string;
  description: string;
  bg_color: string;
  heading_color?: string;
}

const data: Data[] = [
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
    heading_color: "text-white",
    bg_color: "bg-gray-700",
  },
];
function ShowcaseProductGrid() {
  return (
    <div className="mt-28">
      <Reveal delayTime={0.5}>
        <div className="grid grid-cols-4  max-lg:grid-cols-2  max-sm:hidden">
          {data.map((item, index) => {
            return (
              <div
                key={index}
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
                  <h1
                    className={`text-3xl max-md:text-xl max-sm:text-lg font-semibold ${item.heading_color}`}
                  >
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-500  line-clamp-3">
                    {item.description}
                  </p>
                  <Button variant={"default"} size={"lg"}>
                    Shop now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
      <div className="max-sm:block hidden">
        <GridCarousel data={data} />
      </div>
    </div>
  );
}

export default ShowcaseProductGrid;
