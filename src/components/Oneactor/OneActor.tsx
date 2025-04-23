import React from "react";
import { OnePersonType } from "@/app/person/[id]/[name]/page";
import OneActorPicture from "./OneActorPicture";
import OneActorDetail from "./OneActorDetail";
import OneActorCast from "./OneActorCast";

function OneActor({ PersonData }: { PersonData: OnePersonType }) {
  return (
    <>
      <section className="w-full lg:h-screen flex items-center justify-center flex-col">
        <div className="w-11/12 lg:h-11/12 flex items-center justify-center">
          <div className="w-11/12 lg:h-11/12 flex lg:flex-row flex-col items-center justify-center">
            <div className="lg:w-1/3 md:w-4/5 w-11/12 lg:h-full md:h-[80vh] h-[60vh] flex items-center justify-center">
              <OneActorPicture PersonData={PersonData} />
            </div>
            <div className="lg:w-2/3 md:w-4/5 w-11/12 lg:h-full flex justify-center items-center">
              <OneActorDetail PersonData={PersonData} />
            </div>
          </div>
        </div>
      </section>
      <div
        className="w-full flex justify-center items-center"
        style={{ margin: "1rem auto" }}
      >
        <OneActorCast actorId={PersonData.id} />
      </div>
    </>
  );
}

export default OneActor;
