function PulseLoading({ width, height }: { width: number; height: number }) {
  return (
    <>
      <span
        className={`animate-pulse text-gray-300 text-base bg-gray-300 rounded-md  inline-block w-[${width}px] h-[${height}px] max-sm:w-[${
          width / 2
        }px] max-sm:h-[${height / 2}px]`}
      >
        &nbsp;
      </span>
    </>
  );
}

export default PulseLoading;
