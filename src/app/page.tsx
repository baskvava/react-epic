import Calendar from "./conponents/calendar";
import Carousel from "./conponents/carousel";
import { GoLinkExternalIcon } from "./conponents/icons";
import Switch from "./conponents/switch";

const demo = [
  {
    id: "calendar",
    name: "Calendar",
    component: <Calendar />,
  },
  {
    id: "inifinite Carousel",
    name: "Inifinite Carousel",
    component: <Carousel />,
  },
  {
    id: "switchBtn",
    name: "Switch Button",
    component: <Switch />,
    link: "react-epic/blog/switch-button",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-start items-center gap-10 p-10">
      <header className="flex flex-col justify-start items-center">
        <h1 className="font-bold text-3xl text-gray-800 mb-2 w-fit">
          Epic React Components
        </h1>
        <h5 className="font-mono text-gray-800">
          Create common react components from scratch
        </h5>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center content-center">
        {demo.map(({ id, name, component, link }) => (
          <div
            key={id}
            className="w-full border-2 border-sky-800 rounded-lg bg-sky-50"
          >
            <div className="h-1/6 px-9 flex justify-between items-center border-b-2 border-sky-800 font-mono font-bold text-gray-200 bg-sky-800">
              <h5>{name}</h5>
              {link && (
                <span title="How it works">
                  <a href={link}>
                    <GoLinkExternalIcon />
                  </a>
                </span>
              )}
            </div>
            <div className="h-5/6 flex justify-center items-center p-8">
              {component}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
