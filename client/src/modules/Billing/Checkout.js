import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  // More products...
]

function Example(props) {
  const { hostels, loading, hostlePrice, setHostlePrice, months, setMonths, id } = props
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Book this hostel</h1>
        <form className="mt-12">
          <div>
            <h2 className="sr-only">Items in your shopping cart</h2>
            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {
                loading ?
                  <div className=" h-[43vh] flex justify-center items-center text-6xl font-bold">
                    {[1, 2, 3, 4, 5].map(item => <div key={item} className="animate-bounce mx-2"></div>)}
                  </div>
                  :
                  <li key={id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={hostels?.hostelPics?.url || "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg"}
                        alt={hostels?.hostelName}
                        className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                      />
                    </div>

                    <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div>
                        <div className="flex justify-between sm:grid sm:grid-cols-2">
                          <div className="pr-6">
                            <h3 className="font-medium text-gray-700 hover:text-gray-800 text-sm">
                              {hostels?.hostelName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Bed: {hostels?.beds} | Baths: {hostels?.baths} | SqFt: {hostels?.sqFt}</p>
                          </div>

                          <p className="text-right text-sm font-medium text-gray-900">{hostlePrice}</p>
                        </div>
                        <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                          <select
                            id={`months`}
                            name={`months`}
                            className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            onChange={(e) => {
                              setHostlePrice(e.target.value * hostels?.hostelPrice)
                              setMonths(e.target.value)
                            }}
                          >
                            <option value={1}>1 month</option>
                            <option value={3}>3 months</option>
                            <option value={6}>6 months</option>
                            <option value={9}>9 months</option>
                            <option value={12}>12 months</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
              }
            </ul>
          </div>
        </form>
      </div>
    </div>
  )
}


export default function CheckoutForm(props) {
  const { id } = props
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      console.log("No client secret provided.",)
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3002/checkout/${id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="flex flex-col items-center">
      <Example {...props} />
      <form id="payment-form" className=" w-[500px] mb-20" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e?.target?.value)}
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="bg-blue-600 text-white w-full py-2 rounded-md">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}