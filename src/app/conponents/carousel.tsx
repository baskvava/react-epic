"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Switch from "./switch";

const IMAGE_LENGTH = 4;

const imagesData = [
  // append last image to prepare
  {
    id: 0,
    idx: 3,
    src: "/react-epic/carousel-4.jpg",
    width: 500,
    height: 500,
    alt: "dog 5",
  },
  {
    id: 1,
    idx: 0,
    src: "/react-epic/carousel-1.jpg",
    width: 500,
    height: 500,
    alt: "dog 1",
  },
  {
    id: 2,
    idx: 1,
    src: "/react-epic/carousel-2.jpg",
    width: 500,
    height: 500,
    alt: "dog 3",
  },
  {
    id: 3,
    idx: 2,
    src: "/react-epic/carousel-3.jpg",
    width: 500,
    height: 500,
    alt: "dog 4",
  },
  {
    id: 4,
    idx: 3,
    src: "/react-epic/carousel-4.jpg",
    width: 500,
    height: 500,
    alt: "dog 5",
  },
  // append first image to prepare
  {
    id: 5,
    idx: 0,
    src: "/react-epic/carousel-1.jpg",
    width: 500,
    height: 500,
    alt: "dog 1",
  },
];

// @TODO: possible add throttle to avoid too frequently hitting

export default function Carousel() {
  const [currIdx, setCurrIdx] = useState(-1);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const startTime = useRef<number | null>(null);
  const animateRef = useRef<number>(0);

  const [images, setImages] = useState<
    {
      id: number;
      idx: number;
      src: string;
      width: number;
      height: number;
      alt: string;
    }[]
  >([]);

  useEffect(() => {
    if (itemsRef.current && images.length === 0) {
      setImages(imagesData);
    }
  }, [itemsRef.current]);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${
        innerRef?.current?.clientWidth * currIdx
      }px)`;
    }
  }, [images.length]);

  const update = (timeStamp: number) => {
    if (!startTime.current) {
      startTime.current = timeStamp;
    }

    const diff = timeStamp - startTime.current;

    if (diff > 1500) {
      startTime.current = null;
      controlAnimate();
      setCurrIdx((prev) => prev - 1);
      // unable to access state here
    }

    animateRef.current = requestAnimationFrame(update);
  };

  // auto play
  useLayoutEffect(() => {
    if (autoPlay) {
      animateRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(animateRef.current);
  }, [autoPlay]);

  useEffect(() => {
    if (autoPlay && (IMAGE_LENGTH + 1) * -1 === currIdx) {
      setTimeout(() => {
        innerRef?.current?.classList.remove("transition");
        innerRef?.current?.classList.remove("duration-500");
        setCurrIdx(-1);
      }, 0.5 * 1000);
    }
  }, [currIdx, autoPlay]);

  const controlAnimate = () => {
    if (innerRef.current) {
      if (!innerRef.current.classList.contains("transition")) {
        innerRef.current.classList.add("transition");
      }
      if (!innerRef.current.classList.contains("duration-500")) {
        innerRef.current.classList.add("duration-500");
      }
    }
  };

  const handleRight = () => {
    setCurrIdx((prev) => prev - 1);

    if (IMAGE_LENGTH * -1 === currIdx) {
      setTimeout(() => {
        innerRef?.current?.classList.remove("transition");
        innerRef?.current?.classList.remove("duration-500");
        setCurrIdx(-1);
      }, 0.5 * 1000);
    }
  };

  const handleLeft = () => {
    setCurrIdx((prev) => prev + 1);

    if (currIdx === -1) {
      setTimeout(() => {
        innerRef?.current?.classList.remove("transition");
        innerRef?.current?.classList.remove("duration-500");
        setCurrIdx(IMAGE_LENGTH * -1);
      }, 0.5 * 1000);
    }
  };

  const infinite = (direction: string) => {
    controlAnimate();
    direction === "left" ? handleLeft() : handleRight();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* frame */}
      <div className="flex gap-5 items-start w-full">
        AutoPlay: <Switch toggle={() => setAutoPlay(!autoPlay)} />
      </div>
      <div className="pb-4">
        {currIdx === -1 || (IMAGE_LENGTH + 1) * -1 === currIdx
          ? 1
          : currIdx === 0
          ? IMAGE_LENGTH
          : currIdx * -1}{" "}
        / {IMAGE_LENGTH}
      </div>
      <div className="relative ">
        {/* carousel wrapper */}
        <div
          ref={itemsRef}
          className="w-full overflow-hidden max-w-md h-fit flex justify-center"
        >
          {/* items */}
          {itemsRef?.current && (
            <div
              ref={innerRef}
              className="flex"
              style={{
                transform: `translateX(${
                  itemsRef?.current?.clientWidth * currIdx
                }px)`,
              }}
            >
              {/* images */}
              {images.map(({ id, src, width, height, alt }) => (
                <Image
                  key={id}
                  src={src}
                  width={width}
                  height={height}
                  alt={alt}
                  priority
                />
              ))}
            </div>
          )}
        </div>
        {itemsRef.current && (
          <>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
              onClick={() => infinite("left")}
            >
              &lt;
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-2/3 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
              onClick={() => infinite("right")}
            >
              &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
}
