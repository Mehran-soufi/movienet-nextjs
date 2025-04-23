import Image from "next/image";

export default function loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center select-none">
      <div
        className="shadow-inner shadow-gray-900 rounded-xl
       flex flex-col items-center justify-between gap-1"
        style={{ padding: "1rem" }}
      >
        <h1 className="lg:text-4xl md:text-3xl text-xl font-bold text-red-500 uppercase">
          movienet
        </h1>
        <Image
          src="/assets/loading/loading.gif"
          alt="loading...."
          width={128}
          height={128}
          className="w-32"
        />
      </div>
    </div>
  );
}
