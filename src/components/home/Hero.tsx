function Hero() {
  return (
    <div className="grid grid-cols-3  gap-8 h-[75vh]">
      <div className=" bg-black rounded-lg">
        <img src="/hero-right.png" className="h-full w-full" />
      </div>
      <div className="grid grid-cols-1 grid-rows-8 gap-8">
        <div className="row-span-2 bg-black rounded-lg">Top</div>
        <div className=" row-span-4 bg-black rounded-lg">middle</div>
        <div className="row-span-2 bg-black rounded-lg">bottom</div>
      </div>
      <div className=" bg-black rounded-lg">
        <img src="/hero-right.png" className="h-full w-full" />
      </div>
    </div>
  );
}

export default Hero;
