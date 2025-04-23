import React from "react";
import Title from "./Title";
import HomeItems from "./HomeItems";

export type IpropsType = { title: string; link: string };
function HomeItem({
  title,
  type,
  link,
}: {
  title: string;
  type: string;
  link: string;
}) {
  return (
    <section
      className="w-full flex flex-col justify-center items-center"
      style={{ margin: "2rem 0" }}
    >
      <div className="w-11/12">
        <Title title={title} type={type} />
        <HomeItems link={link} />
      </div>
    </section>
  );
}

export default HomeItem;
