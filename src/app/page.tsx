import Image from "next/image";
import Calendar from "./conponents/calendar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* calendar */}
      <Calendar />
      {/* Carousel */}
    </main>
  );
}
