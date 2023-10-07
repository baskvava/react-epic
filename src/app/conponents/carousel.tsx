"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Transform } from "stream";

const images = [
  { id: 0, src: "/carousel-1.jpg", width: 500, height: 500, alt: "dog 1" },
  { id: 1, src: "/carousel-2.jpg", width: 500, height: 500, alt: "dog 3" },
  { id: 2, src: "/carousel-3.jpg", width: 500, height: 500, alt: "dog 4" },
  { id: 3, src: "/carousel-4.jpg", width: 500, height: 500, alt: "dog 5" },
];

export default function Carousel() {
  const [currIdx, setCurrIdx] = useState(0);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  const infinite = (direction: string) => {
    if (direction === "right") {
      if (images.length * -1 === currIdx - 1) {
        setCurrIdx(0);
      } else {
        setCurrIdx(currIdx - 1);
      }
    }

    if (direction === "left") {
      if (currIdx === 0) {
        setCurrIdx((images.length - 1) * -1);
      } else {
        setCurrIdx(currIdx + 1);
      }
    }
  };
  console.log({ currIdx });
  return (
    <div className="relative flex flex-col justify-center items-center">
      {/* frame */}
      <div>
        {currIdx * -1 + 1} / {images.length}
      </div>
      <div className="w-full overflow-hidden max-w-md h-fit flex flex-col justify-center">
        {/* items */}
        <div
          ref={itemsRef}
          // className="flex transition duration-500"
          className={[
            "flex",
            currIdx !== 0 &&
              currIdx !== -(images.length - 1) &&
              "transition duration-500",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            transform: itemsRef?.current?.clientWidth
              ? `translateX(${itemsRef?.current?.clientWidth * currIdx}px)`
              : "translateX(0px)",
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
      </div>
      <button
        className="absolute left-0 top-1/2 -translate-y-2/3 px-2 py-0.5 bg-slate-600 opacity-80 hover:opacity-60 border-solid border-2 rounded-full border-slate-600 text-slate-50 font-bold"
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
      <div>. . .</div>
    </div>
  );
}
