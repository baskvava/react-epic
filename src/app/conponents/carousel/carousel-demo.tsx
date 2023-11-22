"use client";

import { useState } from "react";
import Switch from "../switch";
import Carousel from "./carousel";
import CarouselV2 from "./carousel-v2";

export const images = [
  {
    url: "/react-epic/carousel-1.jpg",
    alt: "dog 1",
  },
  {
    url: "/react-epic/carousel-2.jpg",
    alt: "dog 2",
  },
  {
    url: "/react-epic/carousel-3.jpg",
    alt: "dog 3",
  },
  {
    url: "/react-epic/carousel-4.jpg",
    alt: "dog 4",
  },
];

export default function CarouselDemo() {
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(true);
  const [dots, setDots] = useState<boolean>(true);
  const [delay, setDelay] = useState<number>(1500);

  return (
    <div className="flex flex-col justify-center items-center">
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
      <CarouselV2
        data={images}
        loop={loop}
        dots={dots}
        autoPlay={autoPlay}
        delay={delay}
      />
      {/* <Carousel
        images={images}
        width={500}
        height={500}
        autoPlay={autoPlay}
        loop={loop}
        dots={dots}
        delay={delay}
      /> */}
    </div>
  );
}
