import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  // image data, url is image src, alt is alternative text for image if image cannot display, or screen reader
  data?: { url: string; alt: string }[];
  // image width
  width?: number;
  // image height
  height?: number;
  // scroll infinite
  loop?: boolean;
  // dots, pagination
  dots?: boolean;
  // auto play
  autoPlay?: boolean;
  // animate dely
  delay?: number;
}

export default function CarouselV2({
  data = [],
  width = 500,
  height = 500,
  loop = false,
  dots = true,
  autoPlay = true,
  delay = 2000,
}: Props) {
  const IMAGE_LENGTH = data.length;
  // append last to first and append first to last, give the idx for each imgage
  const images = [data[IMAGE_LENGTH - 1], ...data, data[0]].map(
    (image, idx) => ({ ...image, idx })
  );
  const [currIdx, setCurrIdx] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const startTime = useRef<number | null>(null);
  const [showImg, setShowImg] = useState(false);
  const animateRef = useRef<number>(0);
  const { debouncedValue } = useDebounce(delay, 0.5 * 1000);

  useLayoutEffect(() => {
    if (carouselRef?.current && images.length > 0) {
      carouselRef?.current?.scrollTo(width, 0);
      setShowImg(true);
    }
  }, [carouselRef.current, images.length]);

  const update = (timeStamp: number) => {
    if (!startTime.current) {
      startTime.current = timeStamp;
    }

    const diff = timeStamp - startTime.current;

    if (diff > debouncedValue) {
      startTime.current = null;
      handleRight();
    }

    animateRef.current = requestAnimationFrame(update);
  };

  useLayoutEffect(() => {
    // requestAnimationFrame
    if (autoPlay) {
      animateRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animateRef.current);
  }, [animateRef.current, autoPlay]);

  const cancelAnimate = () => {
    if (animateRef.current) {
      cancelAnimationFrame(animateRef.current);
      startTime.current = null;
    }
  };

  const handleScroll = (idx: number) => {
    carouselRef.current?.scrollTo({
      left: idx * width,
      behavior: "smooth",
    });
  };

  const handleRight = () => {
    if (currIdx > IMAGE_LENGTH + 1) {
      return;
    }

    cancelAnimate();

    const idx = currIdx + 1;
    setCurrIdx(idx);

    handleScroll(idx);

    if (currIdx === IMAGE_LENGTH) {
      setTimeout(() => {
        setCurrIdx(1);
        carouselRef?.current?.scrollTo({ left: 1 * width });
      }, 0.5 * 1000);
    }
  };

  const handleLeft = () => {
    if (currIdx <= 0) {
      return;
    }
    cancelAnimate();

    const idx = currIdx - 1;
    setCurrIdx(idx);

    handleScroll(idx);

    if (idx === 0) {
      setTimeout(() => {
        setCurrIdx(IMAGE_LENGTH);
        carouselRef?.current?.scrollTo({ left: IMAGE_LENGTH * width });
      }, 0.5 * 1000);
    }
  };

  const handleDots = (idx: number) => {
    handleScroll(idx);
    setCurrIdx(idx);
    cancelAnimate();
  };

  return (
    <>
      {/* Carousel Image Container */}
      <div className="pb-4">
        {currIdx === 1 || IMAGE_LENGTH + 1 === currIdx
          ? 1
          : currIdx === 0
          ? IMAGE_LENGTH
          : currIdx}{" "}
        / {IMAGE_LENGTH}
      </div>
      <div className="relative">
        <div
          ref={carouselRef}
          className="overflow-x-scroll lg:overflow-x-hidden snap-mandatory snap-x"
          style={{ width: `${width}px` }}
        >
          {/* Carousel Images */}
          <div
            // scrollable if in mobile/touch screen device
            className="flex"
            style={{ width: width * (IMAGE_LENGTH + 2) }}
          >
            {showImg &&
              images.map(({ idx, url, alt }) => (
                <Image
                  key={idx}
                  src={url}
                  width={width}
                  height={height}
                  alt={alt}
                  priority
                  className="snap-center"
                />
              ))}
          </div>
        </div>
        {/* left arrow */}
        {(loop || (loop === false && currIdx !== 1)) && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
            onClick={handleLeft}
          >
            &lt;
          </button>
        )}
        {/* right arrow */}
        {(loop || (loop === false && currIdx !== IMAGE_LENGTH)) && (
          <button
            className="absolute right-0 top-1/2 -translate-y-2/3 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
            onClick={handleRight}
          >
            &gt;
          </button>
        )}
        {dots && (
          <div className="my-2 flex gap-2 justify-center">
            {[1, 2, 3, 4].map((id) => (
              <button
                key={id}
                className={[
                  "w-3",
                  "h-3",
                  `${currIdx == id ? "bg-gray-500" : "bg-gray-300"}`,
                  "rounded-full",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleDots(id)}
              ></button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
