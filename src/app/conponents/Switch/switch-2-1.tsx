export default function Switch21() {
  return (
    <label className="relative w-fit cursor-pointer">
      <input className="sr-only" type="checkbox" />
      <div className="w-11 h-6 bg-slate-500 border-2 border-solid border-slate-500 rounded-full after:content-[''] after:absolute after:bg-slate-200 after:w-5 after:h-5 after:rounded-full after:transition-all"></div>
    </label>
  );
}
