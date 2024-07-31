import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './Checkout';
import { useParams } from 'react-router-dom';

let price = 5000

const Billing = ({ stripePromise }) => {
  const [clientSecret, setClientSecret] = useState("")
  const [hostels, setHostels] = useState({});
  const [loading, setLoading] = useState(true);
  const [hostlePrice, setHostlePrice] = useState('');
  const [months, setMonths] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchHostels = async () => {
      console.log('1st useeffect')
      const res = await fetch(`http://localhost:8000/api/hostels/${id}`)
      if (!res.ok) {
        console.log('error');
        setHostels({});
      }
      const data = await res.json();
      setHostels(data?.hostel);
      setHostlePrice(data?.hostel?.hostelPrice);
      setLoading(false);
      price = data?.hostel?.hostelPrice;
    }
    fetchHostels();
  }, [])

  useEffect(() => {
    if (hostels?.hostelPrice) {
      // Create PaymentIntent as soon as the page loads
      fetch("http://localhost:8000/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: hostels?.hostelPrice || price, months, hostelId: id }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [id, months, hostels?.hostelPrice]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  const props = {
    hostels,
    setHostels,
    loading,
    setLoading,
    hostlePrice,
    setHostlePrice,
    months,
    setMonths,
  }

  return (
    <div className='mx-auto flex items-center justify-center w-full'>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm id={id} {...props} />
        </Elements>
      )
        :
        <div className=" h-[43vh] flex justify-center items-center text-6xl font-bold">
          {
            [1, 2, 3, 4, 5].map((item) => {
              return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z" clip-rule="evenodd" />
                  <path
                    fill-rule="evenodd"
                    d="M13.707 7.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>

              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Billing