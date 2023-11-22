"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

type Props = {
  images: {
    url: string;
    alt: string;
  }[];
  height?: number;
  width?: number;
  delay?: number;
  autoPlay?: boolean;
  dots?: boolean;
  loop?: boolean;
};

/**
 * A11y Enhancement:
 * TabIndex - 0 focusable, -1 not focusable
 * role="region"
 * aria-label="Carousel"
 *
 * Scroll Enhancement:
 * ScrollTo to replace tranform: translateX(xxxpx)
 */

export default function Carousel({
  images: data,
  width = 500,
  height = 500,
  delay = 1500,
  autoPlay = false,
  loop = false,
  dots = false,
}: Props) {
  const IMAGE_LENGTH = data.length;

  const [currIdx, setCurrIdx] = useState(-1);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const startTime = useRef<number | null>(null);
  const animateRef = useRef<number>(0);
  const { debouncedValue } = useDebounce(delay, 0.5 * 1000);

  const [images, setImages] = useState<
    {
      idx: number;
      url: string;
      alt: string;
      ariaHidden?: boolean;
    }[]
  >([]);

  useEffect(() => {
    // possible return some error msg if data.length not greater than 0

    if (itemsRef.current && images.length === 0 && data.length > 0) {
      // process data before setImages
      // clone to append last to first and append last to first
      const imageData = [
        // optimization A11y: add aria-hidden for screen reader setting, set aria-hidden false for the clone to void screen reader
        { ...data[data.length - 1], ariaHidden: true },
        ...data,
        // optimization A11y: add aria-hidden for screen reader setting, set aria-hidden false for the clone to void screen reader
        { ...data[0], ariaHidden: true },
      ].map((d, idx) => ({ ...d, idx }));

      setImages(imageData);
    }
  }, [itemsRef.current, data.length]);

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
              {images.map(({ idx, url, alt, ariaHidden }) => (
                <Image
                  key={idx}
                  src={url}
                  width={width}
                  height={height}
                  alt={alt}
                  aria-hidden={ariaHidden}
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
    </div>
  );
}
