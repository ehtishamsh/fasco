import { TbLoader3 } from "react-icons/tb";

function Loader() {
  return (
    <div
      className={`transition-all duration-300 bg-background absolute z-50 h-screen w-full top-0 right-0 flex justify-center items-center`}
    >
      <TbLoader3 className="animate-spin h-14 w-14" />
    </div>
  );
}

export default Loader;
