import React from "react";

function Filter({ date, type, prefecture, category }) {
  return (
    <div className='flex justify-center  mx-auto my-2 px-2 gap-5'>
      <select
        name='Day'
        className='py-2 px-4  border border-gray-300  rounded-md focus:outline-none'
      >
        {/* <option value=''>日付が入る</option> */}

        {/* {date.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))} */}


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
        <option value=''>Prefecture</option>
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
