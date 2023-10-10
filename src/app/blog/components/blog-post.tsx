import { PropsWithChildren } from "react";
import { GiCoffeeCupIcon } from "./icons";

type Props = {
  meta: {
    title: string;
    description: string;
    date: string;
    readTime: number;
  };
};

// try to move to mdx-components.tsx
export default function BlogPost({ children, meta }: PropsWithChildren<Props>) {
  const { title, description, date, readTime } = meta;
  return (
    <div className="blog w-full flex justify-center items-center my-20">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-nunito text-4xl">{title}</h1>
        <div>
          <p className="mb-1">{description}</p>
          <span
            role="img"
            className="flex items-center gap-x-2"
            aria-label="read time"
          >
            <span className="mr-4">{date}</span>
            <GiCoffeeCupIcon />
            {readTime + " mins read"}
          </span>
        </div>
        <article className="flex flex-col gap-2">{children}</article>
      </div>
    </div>
  );
}
