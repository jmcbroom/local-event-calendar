import * as ToggleGroup from "@radix-ui/react-toggle-group";

import * as Separator from "@radix-ui/react-separator";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { eventInRange } from "../lib/common";
import * as Toggle from "@radix-ui/react-toggle";
import eventTypes from "../studio/schemas/eventTypes";

const EventsFilter = ({ events, setEvents }) => {
  // state for date filter
  let [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  let [endDate, setEndDate] = useState(dayjs().add(7, "days").format("YYYY-MM-DD"));

  // values & state for age filter
  let ages = [
    { name: "All Ages", value: "all_ages" },
    { name: "18+", value: "eighteen_and_up" },
    { name: "21+", value: "twentyone_and_up" },
  ];
  const [ageValue, setAgeValue] = useState(ages[0].value);

  const [typeValue, setTypeValue] = useState([]);

  // effect fires when any filter changes
  useEffect(() => {
    let byDate = events.filter((event) => eventInRange(startDate, endDate, event));

    if (typeValue.length > 0) {
      let byType = byDate.filter((event) =>
        typeValue.indexOf(event.eventType) > -1 ? true : false
      );
      setEvents(byType);
    } else {
      setEvents(byDate);
    }
  }, [startDate, endDate, events, setEvents, typeValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-filters gap-2 mt-4 md:mt-8">

      <div>
        <span className="filter-heading block w-full">Date</span>
        <div className="date-group">
          <div className="text-sm text-gray-500">
            <span>from</span>
            <input
              type="date"
              value={startDate}
              min={dayjs().format("YYYY-MM-DD")}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="text-sm text-gray-500">
            <span>to</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <span className="filter-heading block w-full">Type</span>
        <ToggleGroup.Root
          type="multiple"
          value={typeValue}
          className="type-group"
          onValueChange={(value) => {
            setTypeValue(value);
          }}
        >
          {eventTypes.map((type) => (
            <ToggleGroup.Item key={type.value} value={type.value}>
              {type.title}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </div>
  );
};

export default EventsFilter;
