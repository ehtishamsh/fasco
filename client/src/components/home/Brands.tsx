import { useEffect, useRef } from "react";
import { Reveal } from "../animation/Reveal";

function Brands() {
  const marqueeContentRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-displayed"
    );
    const marqueeContent = marqueeContentRef.current;

    if (marqueeContent) {
      root.style.setProperty(
        "--marquee-elements",
        marqueeContent.children.length.toString()
      );

      for (let i = 0; i < parseInt(marqueeElementsDisplayed); i++) {
        marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
      }
    }
  }, []);

  return (
    <Reveal width="100%" delayTime={0.8}>
      <div className="py-16 my-12 max-md:py-10 max-md:my-8 max-sm:py-3 max-sm:my-3">
        <div className="marquee">
          <ul className="marquee-content max-sm:gap-16" ref={marqueeContentRef}>
            <li>
              <img
                src="/brand-1.png"
                className="max-w-52 max-md:max-w-28 max-sm:w-28 transition-all duration-300"
                alt=""
              />
            </li>
            <li>
              <img
                src="/brand-2.png"
                className="max-w-52 max-md:max-w-28 max-sm:w-28 transition-all duration-300"
                alt=""
              />
            </li>
            <li>
              <img
                src="/brand-3.png"
                className="max-w-52 max-md:max-w-28 max-sm:w-28 transition-all duration-300"
                alt=""
              />
            </li>
            <li>
              <img
                src="/brand-4.png"
                className="max-w-52 max-md:max-w-28 max-sm:w-28 transition-all duration-300"
                alt=""
              />
            </li>
            <li>
              <img
                src="/brand-5.png"
                className="max-w-52 max-md:max-w-28 max-sm:w-28 transition-all duration-300"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export default Brands;
