import React from "react";
import "./AboutUs.css";
import woWeAre from "../../assets/whoWeAre.jpg";
import ourMission from "../../assets/ourMission.jpg";
import ourVision from "../../assets/ourVision.jpg";
import whyUs from "../../assets/whyUs.jpg";
function AboutUs() {
  return (
    <div>
      <section className=" h-[300px] bg-red-100 flex justify-center items-center">
        <h1 className=" text-6xl font-bold">ABOUT US</h1>
      </section>
      <section className="text-gray-600 body-font mb-12">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={woWeAre}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Who we are
            </h1>
            <p className="text-secondary pe-md-5 me-lg-5">
              Welcome to Shopping Mall! We are dedicated to helping you find the
              best deals on a wide range of products and services. Our goal is
              to make your shopping experience as easy and convenient as
              possible by providing you with a comprehensive list of prices from
              various retailers and merchants.
              <br />
              <br />
              We understand that shopping can be overwhelming, especially when
              you are trying to find the best deal. That's why we have created a
              user-friendly platform that allows you to compare prices, read
              reviews, and find the perfect product for you.
              <br />
              <br />
              Our team of experts works tirelessly to ensure that our website is
              always up-to-date with the latest prices and deals. We also work
              with a variety of retailers and merchants to bring you exclusive
              offers and discounts.
              <br />
              <br />
              We believe that shopping should be a stress-free and enjoyable
              experience. That's why we are committed to providing you with the
              best possible service. If you ever have any questions or concerns,
              please don't hesitate to contact us. We would be more than happy
              to help.
              <br />
              <br />
              Thank you for choosing Shopping Mall. We look forward to helping
              you find the best deals on all your shopping needs. Happy
              shopping!
            </p>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font flex">
        <div className="container mx-auto flex px-3 py-16 items-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={ourMission}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Our Mission
            </h1>
            <p className="mb-8 leading-relaxed">
              Our mission as Shopping Mall is to provide consumers with the most
              accurate and up-to-date information on the prices of products and
              services from various retailers and suppliers. We strive to make
              the process of finding the best deals and discounts as easy and
              convenient as possible, saving our users time and money. We are
              committed to providing unbiased and transparent information, and
              we strive to be the go-to resource for consumers looking to make
              informed purchasing decisions.
            </p>
          </div>
        </div>
        <div className="container mx-auto flex px-3 py-16 items-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={ourVision}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Our Vision
            </h1>
            <p className="mb-8 leading-relaxed">
              Our vision for a Shopping Mall is to create a user-friendly
              platform that allows consumers to easily compare prices and
              features of products and services from various retailers and
              providers. Our goal is to empower consumers with the information
              they need to make informed purchasing decisions and save money. We
              will strive to provide accurate and up-to-date pricing
              information, as well as detailed product information, reviews, and
              ratings. Additionally, we will work to create a seamless and
              efficient user experience, with features such as price alerts,
              price history charts, and personalized product recommendations.
              Ultimately, our vision is to be the go-to destination for
              consumers looking to save money and make informed purchasing
              decisions.
            </p>
          </div>
        </div>
      </section>
      <h2 className=" text-4xl text-center mt-16 mb-[-50px] font-bold">
        WHY CHOOSE US
      </h2>
      <section className="text-gray-600 body-font flex items-center justify-center px-16">
        <div className="container py-24 mx-auto flex flex-wrap">
          <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            {/* <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">1</div> */}
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-red-100 text-red-500 rounded-full inline-flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                  Best Price
                </h2>
                <p className="leading-relaxed">
                  Our Stress-Free Finance Department That Can Find Financial
                  Solutions To Save You Money.
                </p>
              </div>
            </div>
          </div>
          <div className="flex relative pb-20 sm:items-center md:w-2/3">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            {/* <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">2</div> */}
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-red-100 text-red-500 rounded-full inline-flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                  Trusted By Thousands
                </h2>
                <p className="leading-relaxed lowercase">
                  NUMBER 1 PROVIDER OF THE GRIPPING DRIVING EXPERIENCES
                </p>
              </div>
            </div>
          </div>
          <div className="flex relative pb-20 sm:items-center md:w-2/3">
            <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            {/* <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-red-500 text-white relative z-10 title-font font-medium text-sm">3</div> */}
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-red-100 text-red-500 rounded-full inline-flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="5" r="3"></circle>
                  <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                  Wide Range of Brands
                </h2>
                <p className="leading-relaxed">
                  We Have A Wide Range Of Different Car Brands.
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src={whyUs}
        />
      </section>
    </div>
  );
}

export default AboutUs;
