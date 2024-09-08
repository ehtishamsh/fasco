import { useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

interface Data {
  brands: string[];
  batteryCapacity: string[];
  screenSize: string[];
  ram: string[];
  price: string[];
  cpu: string[];
  mainCamera: string[];
  frontCamera: string[];
  screenType: string[];
  lens: string[];
  zoom: string[];
  megapixels: string[];
  aperture: string[];
  videoResolution: string[];
  storage: string[];
  gpu: string[];
  maxResolution: string[];
}

function Filter() {
  const [open, setOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [allFilters, setAllFilters] = useState<Data>({
    batteryCapacity: [],
    price: [],
    ram: [],
    screenSize: [],
    brands: [],
    cpu: [],
    mainCamera: [],
    frontCamera: [],
    screenType: [],
    lens: [],
    zoom: [],
    megapixels: [],
    aperture: [],
    videoResolution: [],
    storage: [],
    gpu: [],
    maxResolution: [],
  });

  return (
    <div className="grid grid-cols-8 gap-8 mt-28 max-md:mt-10">
      <motion.div
        className={`col-span-2 max-sm:col-span-2 ${
          open
            ? "max-md:block max-md:col-span-8 max-md:z-50 max-md:top-20 transition-all duration-300 overflow-y-scroll max-md:bg-white max-md:h-screen max-md:fixed max-md:right-0 max-md:w-full"
            : "max-md:hidden"
        }`}
      >
        <Sidebar setAllFilters={setAllFilters} setOpen={setOpen} />
      </motion.div>
      <div className="col-span-6 max-md:col-span-8">
        <Content
          loading={loaded}
          setLoading={setLoaded}
          setOpen={setOpen}
          open={open}
          batteryCapacity={allFilters.batteryCapacity}
          price={allFilters.price}
          ram={allFilters.ram}
          screenSize={allFilters.screenSize}
          brands={allFilters.brands}
          cpu={allFilters.cpu}
          mainCamera={allFilters.mainCamera}
          frontCamera={allFilters.frontCamera}
          screenType={allFilters.screenType}
          lens={allFilters.lens}
          zoom={allFilters.zoom}
          megapixels={allFilters.megapixels}
          aperture={allFilters.aperture}
          videoResolution={allFilters.videoResolution}
          storage={allFilters.storage}
          gpu={allFilters.gpu}
          maxResolution={allFilters.maxResolution}
        />
      </div>
    </div>
  );
}

export default Filter;
