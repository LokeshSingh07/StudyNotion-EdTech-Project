import React from 'react';

const Stats = [
    {count:"5K", label:"Active Students"},
    {count:"10K", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"500+", label:"Awards"}
]



const StatsComponent = () => {

  return (
    <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto mt-20'>
        <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
            {
                Stats.map((element, index) => (
                    <div key={index} className="flex flex-col py-10">
                        <h1 className='text-[30px] font-bold'>{element.count}</h1>
                        <p className='text-richblack-400'>{element.label}</p>
                    </div>
                ))
            }
        </div>



    </div>
  )
}

export default StatsComponent