import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import EventCard from "./EventCard";
import Slider from "react-slick";

const EventsSection = forwardRef(({ events }, ref) => {
  console.log(events);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 1500, // Thời gian giữa các lần chuyển slide (1.5 giây)
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="mx-5" ref={ref}>
      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      {/* query all the event from this group */}
      <div className="h-60 w-full">
        {events.length === 0 ? (
          <div className="flex gap-1 justify-center items-center bg-slate-100 max-w-4xl w-full h-52 mt-2 border-slate-200 rounded-md">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faCalendar} size="2xl" />
              <p className="font-thin">No Upcoming Events</p>
            </div>
          </div>
        ) : events.length < 4 ? (
          <div className="flex flex-row">
            {events.map((event) => (
              <EventCard
                key={event.event_id}
                id={event.event_id}
                name={event.event_name}
                date={event.date}
                imgPath={`http://localhost:8000${event.header_path}`}
              />
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {events.map((event) => (
              <EventCard
                key={event.event_id}
                id={event.event_id}
                name={event.event_name}
                date={event.date}
                imgPath={`http://localhost:8000${event.header_path}`}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "50px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "50px",
      }}
      onClick={onClick}
    />
  );
}

export default EventsSection;
