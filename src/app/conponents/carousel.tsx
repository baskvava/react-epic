"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Switch from "./switch";
import { useDebounce } from "./hooks/useDebounce";

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
  const [loop, setLoop] = useState<boolean>(true);
  const [dots, setDots] = useState<boolean>(true);
  const startTime = useRef<number | null>(null);
  const animateRef = useRef<number>(0);
  const [delay, setDelay] = useState<number>(1500);
  const { debouncedValue } = useDebounce(delay, 0.5 * 1000);

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

    if (diff > debouncedValue) {
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
  }, [autoPlay, delay, debouncedValue, currIdx]);

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

  const scroll = (direction: string) => {
    controlAnimate();
    direction === "left" ? handleLeft() : handleRight();
  };

  const handleDots = (idx: number) => {
    controlAnimate();
    setCurrIdx(() => idx);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* frame */}
      <div className="flex flex-col gap-5 items-start w-full mt-2 mb-5">
        <div className="flex gap-5">
          <div className="flex gap-2">
            AutoPlay:{" "}
            <Switch
              checked={autoPlay}
              toggle={() => {
                setAutoPlay((prev) => !prev);
                if (!autoPlay) {
                  setLoop(true);
                }
              }}
            />
          </div>
          <div className="flex gap-2">
            Loop:
            <Switch
              disabled={autoPlay}
              checked={loop}
              toggle={() => {
                setLoop(!loop);
              }}
            />
          </div>
          <div className="flex gap-2">
            Dots:
            <Switch
              checked={dots}
              toggle={() => {
                setDots(!dots);
              }}
            />
          </div>
        </div>
        <div className="flex gap-5">
          Delay:{" "}
          <input
            className="border solid border-black"
            type="number"
            value={delay}
            min={500}
            onChange={(e) => setDelay(Number(e.target.value))}
          />{" "}
          milliseconds
        </div>
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
            {(loop || (!loop && currIdx !== -1)) && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
                onClick={() => scroll("left")}
              >
                &lt;
              </button>
            )}
            {(loop || (!loop && currIdx !== IMAGE_LENGTH * -1)) && (
              <button
                className="absolute right-0 top-1/2 -translate-y-2/3 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
                onClick={() => scroll("right")}
              >
                &gt;
              </button>
            )}
          </>
        )}
        {dots && (
          <div className="my-2 flex gap-2 justify-center">
            {[-1, -2, -3, -4].map((id) => (
              <button
                key={id}
                className="w-3 h-3 bg-gray-500 rounded-full"
                onClick={() => handleDots(id)}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
