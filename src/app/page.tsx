import Calendar from "./conponents/calendar";
import Carousel from "./conponents/carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      {/* calendar */}
      <Calendar />
      {/* Carousel */}
      <Carousel />
    </main>
  );
}
