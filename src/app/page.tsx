import Calendar from "./conponents/calendar";
import Carousel from "./conponents/carousel";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen justify-start items-center gap-10 p-10">
      <header className="flex flex-col justify-start items-center">
        <h1 className="font-mono font-bold text-3xl text-gray-800 mb-2 w-fit">
          Epic React Components
        </h1>
        <h5 className="font-mono text-gray-800">
          Create common react components from scratch
        </h5>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center content-center">
        {/* calendar */}
        <div className="w-full border-2 border-sky-800 rounded-lg">
          <h5 className="h-1/6 flex justify-center items-center border-b-2 border-sky-800 font-mono font-bold text-gray-200 bg-sky-800">
            Calendar
          </h5>
          <div className="h-5/6 flex justify-center items-center p-8">
            <Calendar />
          </div>
        </div>
        {/* Carousel */}
        <div className="w-full border-2 border-sky-800 rounded-lg">
          <h5 className="h-1/6 flex justify-center items-center border-b-2 border-sky-800 font-mono font-bold text-gray-200 bg-sky-800">
            Inifite Carousel
          </h5>
          <div className="h-5/6 flex justify-center items-center p-8">
            <Carousel />
          </div>
        </div>
      </section>
    </main>
  );
}
