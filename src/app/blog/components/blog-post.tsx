import { PropsWithChildren } from "react";
import { AiFillHome } from "react-icons/ai";

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
    <div className="blog w-full flex flex-col justify-center items-center mt-0 mb-20">
      <nav className="flex justify-start items-start w-full max-w-2xl py-10">
        <a
          href="/react-epic"
          className="flex gap-1 justify-center items-center border-solid border-2 border-transparent hover:border-b-green-400"
        >
          <AiFillHome className="fill-green-700" />
          Home
        </a>
      </nav>
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-nunito text-4xl">{title}</h1>
        <div>
          <p className="mb-2 -mt-4 text-lg">{description}</p>
          <span
            role="img"
            className="flex items-center gap-x-2"
            aria-label="read time"
          >
            <span className="mr-4">{date}</span>☕
            {" " + readTime + " mins read"}
          </span>
        </div>
        <article className="flex flex-col gap-6">{children}</article>
      </div>
    </div>
  );
}
