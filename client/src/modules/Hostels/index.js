import React from 'react'
import Card from '../../components/Card'

const Hostels = () => {
  return (
    <div className=" flex justify-between items-center flex-wrap max-w-[80%] mx-auto my-[100px]">
      {(JSON.parse(localStorage.getItem("data")) || [])?.map(
        (item, index) => (
          <Card key={index} {...item} />
        )
      )}
    </div>
  )
}

export default Hostels