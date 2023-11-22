import { PropsWithChildren } from "react";

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
        <a href="/react-epic">Home</a>
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
