import { useEffect, useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { FaChevronLeft } from "react-icons/fa";
import Loading from "../ui/Loading";

interface Data {
  brands?: string[];
  batteryCapacity?: string[];
  screenSize?: string[];
  ram?: string[];
  price?: string[];
  cpu?: string[];
  mainCamera?: string[];
  frontCamera?: string[];
  screenType?: string[];
  lens?: string[];
  zoom?: string[];
  megapixels?: string[];
  aperture?: string[];
  videoResolution?: string[];
  storage?: string[];
  gpu?: string[];
  maxResolution?: string[];
}

interface AllFilters {
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

interface SidebarProps {
  setAllFilters: React.Dispatch<React.SetStateAction<AllFilters>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setAllFilters, setOpen }) => {
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [screenSize, setScreenSize] = useState<string[]>([]);
  const [batteryCapacity, setBatteryCapacity] = useState<string[]>([]);
  const [ram, setRAM] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [cpu, setCpu] = useState<string[]>([]);
  const [mainCamera, setMainCamera] = useState<string[]>([]);
  const [frontCamera, setFrontCamera] = useState<string[]>([]);
  const [screenType, setScreenType] = useState<string[]>([]);
  const [lens, setLens] = useState<string[]>([]);
  const [zoom, setZoom] = useState<string[]>([]);
  const [megapixels, setMegapixels] = useState<string[]>([]);
  const [aperture, setAperture] = useState<string[]>([]);
  const [videoResolution, setVideoResolution] = useState<string[]>([]);
  const [storage, setStorage] = useState<string[]>([]);
  const [gpu, setGpu] = useState<string[]>([]);
  const [maxResolution, setMaxResolution] = useState<string[]>([]);
  const [numberOfControllers, setNumberOfControllers] = useState<string[]>([]);
  const [compatibleGames, setCompatibleGames] = useState<string[]>([]);
  const [data, setData] = useState<Data>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  console.log(category);
  // Fetch initial data (brands, capacities, etc.)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products/filter", {
          method: "GET",
        });
        const filterData = await res.json();

        if (filterData) {
          setLoading(false);
          setData({
            brands: filterData.data.brand,
            batteryCapacity: [
              "1000",
              "2000",
              "3000",
              "4000",
              "5000",
              "6000",
              "7000",
              "8000",
              "9000",
              "10000",
            ],
            screenSize: [
              "Over 1",
              "Over 1.5",
              "Over 2.5",
              "Over 3.5",
              "Over 4.5",
              "Over 5.5",
              "Over 6.5",
              "Over 7.5",
              "Over 8.5",
            ],
            ram: filterData.data.ram
              .map((ram: string) => ram)
              .filter((ram: string) => !ram.includes("LPDDR5"))
              .sort((a: string, b: string) => parseFloat(a) - parseFloat(b))
              .map((ram: string) => ram + "GB"),
            price: [
              "$100",
              "$200",
              "$300",
              "$400",
              "$500",
              "$600",
              "$700",
              "$800",
              "$900",
              "$1000",
              "$1500",
            ],
            // You will need to add corresponding data for the new filters
            cpu: ["Intel", "AMD", "Snapdragon", "Exynos"],
            mainCamera: filterData.data.mainCamera
              .map((cam: string) =>
                cam
                  .replace("MP", "")
                  .replace(" ", "")
                  .replace("p", "")
                  .replace("HD", "")
              )
              .sort((a: string, b: string) => parseFloat(a) - parseFloat(b))
              .filter((cam: string) => parseFloat(cam) <= 200)
              .map((cam: string) => cam + "MP"),
            frontCamera: filterData.data.frontCamera
              .map((cam: string) =>
                cam
                  .replace("MP", "")
                  .replace(" ", "")
                  .replace("p", "")
                  .replace("HD", "")
              )
              .sort((a: string, b: string) => parseFloat(a) - parseFloat(b))
              .filter((cam: string) => parseFloat(cam) <= 200)
              .map((cam: string) => cam + "MP"),
            screenType: ["LCD", "AMOLED", "OLED"],
            lens: ["Wide", "Telephoto", "Macro"],
            zoom: filterData.data.zoom,
            megapixels: ["12MP", "16MP", "20MP"],
            aperture: filterData.data.aperture,
            videoResolution: ["1080p", "4K", "8K"],
            storage: ["64GB", "128GB", "256GB"],
            gpu: ["NVIDIA", "AMD"],
            maxResolution: ["720p", "1080p", "1440p", "4K"],
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    return () => {
      setLoading(false);
    };
  }, []);

  // Parse URL parameters to initialize filter states
  useEffect(() => {
    const filterParams = (param: string) =>
      searchParams.getAll(param).flatMap((p) => p.split(" "));
    if (searchParams.get("brand")) {
      setSelectedBrand(filterParams("brand"));
    }
    if (searchParams.get("screenSize")) {
      setScreenSize(filterParams("screenSize"));
    }
    if (searchParams.get("batteryCapacity")) {
      setBatteryCapacity(filterParams("batteryCapacity"));
    }
    if (searchParams.get("ram")) {
      setRAM(filterParams("ram"));
    }
    if (searchParams.get("price")) {
      setPrice(filterParams("price"));
    }
    // Add additional useEffect hooks to handle the new filters
    if (searchParams.get("cpu")) {
      setCpu(filterParams("cpu"));
    }
    if (searchParams.get("mainCamera")) {
      setMainCamera(filterParams("mainCamera"));
    }
    if (searchParams.get("frontCamera")) {
      setFrontCamera(filterParams("frontCamera"));
    }
    if (searchParams.get("screenType")) {
      setScreenType(filterParams("screenType"));
    }
    if (searchParams.get("lens")) {
      setLens(filterParams("lens"));
    }
    if (searchParams.get("zoom")) {
      setZoom(filterParams("zoom"));
    }
    if (searchParams.get("megapixels")) {
      setMegapixels(filterParams("megapixels"));
    }
    if (searchParams.get("aperture")) {
      setAperture(filterParams("aperture"));
    }
    if (searchParams.get("videoResolution")) {
      setVideoResolution(filterParams("videoResolution"));
    }

    if (searchParams.get("storage")) {
      setStorage(filterParams("storage"));
    }
    if (searchParams.get("gpu")) {
      setGpu(filterParams("gpu"));
    }
    if (searchParams.get("maxResolution")) {
      setMaxResolution(filterParams("maxResolution"));
    }
    if (searchParams.get("numberOfControllers")) {
      setNumberOfControllers(filterParams("numberOfControllers"));
    }
    if (searchParams.get("compatibleGames")) {
      setCompatibleGames(filterParams("compatibleGames"));
    }
    console.log(selectedBrand, screenSize, batteryCapacity);
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (selectedBrand.length > 0) {
      newSearchParams.set("brand", selectedBrand.join(" ").toLowerCase());
    }
    if (screenSize.length > 0)
      newSearchParams.set("screenSize", screenSize.join(" ").toLowerCase());
    if (batteryCapacity.length > 0)
      newSearchParams.set(
        "batteryCapacity",
        batteryCapacity.join(" ").toLowerCase()
      );
    if (ram.length > 0) newSearchParams.set("ram", ram.join(" ").toLowerCase());
    if (price.length > 0)
      newSearchParams.set("price", price.join(" ").toLowerCase());

    // Add the additional filters to the URL params
    if (cpu.length > 0) newSearchParams.set("cpu", cpu.join(" ").toLowerCase());
    if (mainCamera.length > 0)
      newSearchParams.set("mainCamera", mainCamera.join(" ").toLowerCase());
    if (frontCamera.length > 0)
      newSearchParams.set("frontCamera", frontCamera.join(" ").toLowerCase());
    if (screenType.length > 0)
      newSearchParams.set("screenType", screenType.join(" ").toLowerCase());
    if (lens.length > 0)
      newSearchParams.set("lens", lens.join(" ").toLowerCase());
    if (zoom.length > 0)
      newSearchParams.set("zoom", zoom.join(" ").toLowerCase());
    if (megapixels.length > 0)
      newSearchParams.set("megapixels", megapixels.join(" ").toLowerCase());
    if (aperture.length > 0)
      newSearchParams.set("aperture", aperture.join(" ").toLowerCase());
    if (videoResolution.length > 0)
      newSearchParams.set(
        "videoResolution",
        videoResolution.join(" ").toLowerCase()
      );

    if (storage.length > 0)
      newSearchParams.set("storage", storage.join(" ").toLowerCase());
    if (gpu.length > 0) newSearchParams.set("gpu", gpu.join(" ").toLowerCase());
    if (maxResolution.length > 0)
      newSearchParams.set(
        "maxResolution",
        maxResolution.join(" ").toLowerCase()
      );

    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
    setSearchParams(newSearchParams);
    console.log(selectedBrand, screenSize, batteryCapacity);
    setAllFilters({
      brands: selectedBrand,
      screenSize,
      batteryCapacity,
      ram,
      price,
      cpu,
      mainCamera,
      frontCamera,
      screenType,
      lens,
      zoom,
      megapixels,
      aperture,
      videoResolution,
      storage,
      gpu,
      maxResolution,
    });
  }, [
    selectedBrand,
    screenSize,
    batteryCapacity,
    ram,
    price,
    cpu,
    mainCamera,
    frontCamera,
    screenType,
    lens,
    zoom,
    megapixels,
    aperture,
    videoResolution,
    storage,
    gpu,
    maxResolution,
    numberOfControllers,
    compatibleGames,
  ]);

  return (
    <div className={`max-md:max-h-[80svh] max-md:overflow-y-auto`}>
      <div className="hidden max-md:block">
        <div className="flex items-center">
          <Button variant={"ghost"} onClick={() => setOpen(false)}>
            <FaChevronLeft className="text-base" />
          </Button>
          <h1 className="text-xl font-semibold">Filter</h1>
        </div>
      </div>
      <div className="max-md:px-6">
        <motion.div className={`flex flex-col p-2 gap-2 w-full bg-white`}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {/* Common filters */}
              <CollapsibleSection
                select={selectedBrand}
                setSelected={setSelectedBrand}
                title="Brand"
                data={data?.brands || []}
              />
              <CollapsibleSection
                select={price}
                setSelected={setPrice}
                title="Price"
                data={data?.price || []}
              />

              {/* Category-specific filters */}
              {category === "laptops" && (
                <>
                  <CollapsibleSection
                    select={screenSize}
                    setSelected={setScreenSize}
                    title="Screen Size"
                    data={data?.screenSize || []}
                  />
                  <CollapsibleSection
                    select={cpu}
                    setSelected={setCpu}
                    title="CPU"
                    data={data?.cpu || []}
                  />

                  <CollapsibleSection
                    select={frontCamera}
                    setSelected={setFrontCamera}
                    title="Front Camera"
                    data={data?.frontCamera || []}
                  />
                  <CollapsibleSection
                    select={ram}
                    setSelected={setRAM}
                    title="RAM"
                    data={data?.ram || []}
                  />
                  <CollapsibleSection
                    select={batteryCapacity}
                    setSelected={setBatteryCapacity}
                    title="Battery"
                    data={data?.batteryCapacity || []}
                  />
                </>
              )}

              {category === "smartphones" && (
                <>
                  <CollapsibleSection
                    select={screenSize}
                    setSelected={setScreenSize}
                    title="Screen Size"
                    data={data?.screenSize || []}
                  />
                  <CollapsibleSection
                    select={cpu}
                    setSelected={setCpu}
                    title="CPU"
                    data={data?.cpu || []}
                  />

                  <CollapsibleSection
                    select={mainCamera}
                    setSelected={setMainCamera}
                    title="Main Camera"
                    data={data?.mainCamera || []}
                  />
                  <CollapsibleSection
                    select={frontCamera}
                    setSelected={setFrontCamera}
                    title="Front Camera"
                    data={data?.frontCamera || []}
                  />
                  <CollapsibleSection
                    select={ram}
                    setSelected={setRAM}
                    title="RAM"
                    data={data?.ram || []}
                  />
                  <CollapsibleSection
                    select={batteryCapacity}
                    setSelected={setBatteryCapacity}
                    title="Battery"
                    data={data?.batteryCapacity || []}
                  />
                </>
              )}

              {category === "smartwatches" && (
                <>
                  <CollapsibleSection
                    select={screenSize}
                    setSelected={setScreenSize}
                    title="Screen Size"
                    data={data?.screenSize || []}
                  />
                  <CollapsibleSection
                    select={cpu}
                    setSelected={setCpu}
                    title="CPU"
                    data={data?.cpu || []}
                  />
                  <CollapsibleSection
                    select={screenType}
                    setSelected={setScreenType}
                    title="Screen Type"
                    data={data?.screenType || []}
                  />

                  <CollapsibleSection
                    select={batteryCapacity}
                    setSelected={setBatteryCapacity}
                    title="Battery"
                    data={data?.batteryCapacity || []}
                  />
                </>
              )}

              {category === "headphones" && (
                <>
                  <CollapsibleSection
                    select={batteryCapacity}
                    setSelected={setBatteryCapacity}
                    title="Battery"
                    data={data?.batteryCapacity || []}
                  />
                </>
              )}

              {category === "cameras" && (
                <>
                  <CollapsibleSection
                    select={lens}
                    setSelected={setLens}
                    title="Lens"
                    data={data?.lens || []}
                  />
                  <CollapsibleSection
                    select={maxResolution}
                    setSelected={setMaxResolution}
                    title="Max Resolution"
                    data={data?.maxResolution || []}
                  />
                  <CollapsibleSection
                    select={aperture}
                    setSelected={setAperture}
                    title="Aperture"
                    data={data?.aperture || []}
                  />
                  <CollapsibleSection
                    select={videoResolution}
                    setSelected={setVideoResolution}
                    title="Video Resolution"
                    data={data?.videoResolution || []}
                  />
                  <CollapsibleSection
                    select={zoom}
                    setSelected={setZoom}
                    title="Zoom"
                    data={data?.zoom || []}
                  />
                  <CollapsibleSection
                    select={megapixels}
                    setSelected={setMegapixels}
                    title="Megapixels"
                    data={data?.megapixels || []}
                  />
                </>
              )}

              {category === "gaming" && (
                <>
                  <CollapsibleSection
                    select={screenSize}
                    setSelected={setScreenSize}
                    title="Screen Size"
                    data={data?.screenSize || []}
                  />
                  <CollapsibleSection
                    select={screenType}
                    setSelected={setScreenType}
                    title="Screen Type"
                    data={data?.screenType || []}
                  />
                  <CollapsibleSection
                    select={storage}
                    setSelected={setStorage}
                    title="Storage"
                    data={data?.storage || []}
                  />
                  <CollapsibleSection
                    select={cpu}
                    setSelected={setCpu}
                    title="CPU"
                    data={data?.cpu || []}
                  />

                  <CollapsibleSection
                    select={gpu}
                    setSelected={setGpu}
                    title="GPU"
                    data={data?.gpu || []}
                  />
                  <CollapsibleSection
                    select={maxResolution}
                    setSelected={setMaxResolution}
                    title="Max Resolution"
                    data={data?.maxResolution || []}
                  />
                </>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Sidebar;
