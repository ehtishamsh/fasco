import { BsPhoneFill } from "react-icons/bs";
import { BsCpu } from "react-icons/bs";
import { GoCpu } from "react-icons/go";
import { IoMdCamera } from "react-icons/io";
import { IoMdReverseCamera } from "react-icons/io";
import { PiBatteryVerticalHighBold } from "react-icons/pi";
import { AiOutlineWifi } from "react-icons/ai";
import { GiCircuitry, GiProcessor } from "react-icons/gi";
import { FaGamepad, FaHdd, FaVideo } from "react-icons/fa";
import { MdScreenShare, MdCamera } from "react-icons/md";
import { RiGamepadFill } from "react-icons/ri";
import { HiOutlineMicrophone } from "react-icons/hi";
import { SwitchCamera } from "lucide-react";

// Mapping object for all field labels and icons
const FieldMappings = {
  // Smartphone & Laptop
  screenSize: {
    label: "Screen Size",
    icon: (
      <BsPhoneFill size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  cpu: {
    label: "CPU",
    icon: <BsCpu size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  ram: {
    label: "RAM",
    icon: (
      <GiProcessor size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  cores: {
    label: "Cores",
    icon: <GoCpu size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  mainCamera: {
    label: "Main Camera",
    icon: (
      <IoMdCamera size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  frontCamera: {
    label: "Front Camera",
    icon: (
      <IoMdReverseCamera
        size={24}
        className="text-gray-800/75 max-sm:text-base"
      />
    ),
  },
  battery: {
    label: "Battery",
    icon: (
      <PiBatteryVerticalHighBold
        size={24}
        className="text-gray-800/75 max-sm:text-base"
      />
    ),
  },

  // Smartwatch
  connectivity: {
    label: "Connectivity",
    icon: (
      <AiOutlineWifi size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  sensor: {
    label: "Sensor",
    icon: (
      <GiCircuitry size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  screenType: {
    label: "Screen Type",
    icon: (
      <MdScreenShare size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },

  // Camera
  lens: {
    label: "Lens",
    icon: <MdCamera size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  zoom: {
    label: "Zoom",
    icon: (
      <SwitchCamera size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  megapixels: {
    label: "Megapixels",
    icon: (
      <IoMdCamera size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  aperture: {
    label: "Aperture",
    icon: <MdCamera size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  videoResolution: {
    label: "Video Resolution",
    icon: <FaVideo size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  maxResolution: {
    label: "Max Resolution",
    icon: (
      <MdScreenShare size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },

  // Headphones
  type: {
    label: "Type",
    icon: (
      <GiProcessor size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  noiseCancellation: {
    label: "Noise Cancellation",
    icon: (
      <GiCircuitry size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  batteryLife: {
    label: "Battery Life",
    icon: (
      <PiBatteryVerticalHighBold
        size={24}
        className="text-gray-800/75 max-sm:text-base"
      />
    ),
  },
  wireless: {
    label: "Wireless",
    icon: (
      <AiOutlineWifi size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  microphone: {
    label: "Microphone",
    icon: (
      <HiOutlineMicrophone
        size={24}
        className="text-gray-800/75 max-sm:text-base"
      />
    ),
  },

  // Gaming
  storage: {
    label: "Storage",
    icon: <FaHdd size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  gpu: {
    label: "GPU",
    icon: (
      <GiProcessor size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
  numberOfControllers: {
    label: "Number of Controllers",
    icon: <FaGamepad size={24} className="text-gray-800/75 max-sm:text-base" />,
  },
  compatibleGames: {
    label: "Compatible Games",
    icon: (
      <RiGamepadFill size={24} className="text-gray-800/75 max-sm:text-base" />
    ),
  },
};

export default FieldMappings;
