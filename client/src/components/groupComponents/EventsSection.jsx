import React from "react";

function EventsSection({ events }) {
  return (
    <div className=" my-4 mx-auto w-full ">
      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      {/* query all the event from this group */}
      <div className="bg-slate-100 mt-4">
        <div className="flex">
          <img src="" alt="" className="w-52" />
          <div>
            <h1 className="text-xl">Event_Name</h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae, eveniet fugiat saepe esse error accusantium ipsa
            praesentium est quos ipsum voluptates! Tempore vel velit incidunt
            voluptatem in accusantium blanditiis voluptates.
          </div>
        </div>
      </div>
      <div className=" bg-slate-100 mt-4">
        <div className="flex">
          <img src="" alt="" className="w-52" />
          <div>
            <h1 className="text-xl">Event_Name</h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae, eveniet fugiat saepe esse error accusantium ipsa
            praesentium est quos ipsum voluptates! Tempore vel velit incidunt
            voluptatem in accusantium blanditiis voluptates.
          </div>
        </div>
      </div>
      <div className=" bg-slate-100 mt-4">
        <div className="flex">
          <img src="" alt="" className="w-52" />
          <div>
            <h1 className="text-xl">Event_Name</h1>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae, eveniet fugiat saepe esse error accusantium ipsa
            praesentium est quos ipsum voluptates! Tempore vel velit incidunt
            voluptatem in accusantium blanditiis voluptates.
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
