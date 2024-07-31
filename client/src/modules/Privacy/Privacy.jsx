import React from "react";
import { contentData } from "./data";
function Privacy() {
  return (
    <>
      <section className=" h-[200px] bg-red-100 flex justify-center items-center">
        <h1 className=" text-6xl font-bold">Privacy</h1>
      </section>
      <section className="text-gray-600 body-font mb-12">
        <div className="pt-5 mt-5"></div>
        <div className="container mx-auto flex px-5 py-24 md:flex-col flex-col items-center">
          {contentData.map(({ id, heading, para }) => (
            <>
              <div className=" md:pr-3" key={id}>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  {heading}
                </h1>
                <p className="text-gray-600 md:pr-5 mr-5 mb-5 text-lg">
                  {para}{" "}
                </p>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default Privacy;
