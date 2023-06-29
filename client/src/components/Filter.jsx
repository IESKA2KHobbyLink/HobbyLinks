import React from "react";

function Filter() {
  return (
    <div className='flex justify-center  mx-auto my-2 px-2 gap-5'>
      <select
        name='Day'
        className='py-2 px-4  border border-gray-300  rounded-md focus:outline-none'
      >
        <option value=''>Day</option>
      </select>
      <select
        name='Type'
        className='py-2 px-4  border border-gray-300 rounded-md focus:outline-none'
      >
        <option value=''>Type</option>
      </select>
      <select
        name='Distance'
        className='py-2 px-4  border border-gray-300 rounded-md focus:outline-none'
      >
        <option value=''>Distance</option>
      </select>
      <select
        name='Category'
        className='py-2 px-4  border border-gray-300 rounded-md focus:outline-none'
      >
        <option value=''>Category</option>
      </select>
      <button className='bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 w-24'>
        Filter
      </button>
    </div>
  );
}

export default Filter;
