import dayjs from "dayjs";
import Head from "next/head";
import { getSiteSettings, getUpcomingEvents } from "../lib/api";
import EventCard from "../components/EventCard";
import { useState } from "react";
import { eventInRange } from "../lib/common";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect } from "react";

export async function getStaticProps(context) {
  const data = await getSiteSettings();
  const events = await getUpcomingEvents();

  return {
    props: {
      events,
      ...data,
    },
  };
}

export default function EventsPage(props) {
  let { events } = props;
  let { siteTitle, description } = props;

  let [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  let [endDate, setEndDate] = useState(dayjs().add(7, "days").format("YYYY-MM-DD"));

  let ages = [
    { name: "All Ages", value: "all_ages" },
    { name: "18+", value: "eighteen_and_up" },
    { name: "21+", value: "twentyone_and_up" },
  ];

  const [value, setValue] = useState(ages[0].value);

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta name="description" content={description} key="description" />
        <meta property="og:title" content={siteTitle} key="title" />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="max-w-3xl mx-auto">
        <h1>Events</h1>
        <div className="text-sm md:text-base flex flex-col md:grid md:grid-cols-filters filters gap-0 md:gap-4">
          <span className="filter-heading">Date range</span>
          <div className="button-group">
            <input
              type="date"
              className="p-2 bg-gray-100"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="mx-2">to</span>
            <input
              type="date"
              className="p-2 bg-gray-100"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <span className="filter-heading">Ages</span>
          <div className="button-group">
            <ToggleGroup.Root
              type="single"
              value={value}
              onValueChange={(value) => {
                if (value) setValue(value);
              }}
            >
              {ages.map(age => (
                <ToggleGroup.Item value={age.value} key={age.value}>
                  {age.name}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>
          <span className="filter-heading">Other</span>
          <div className="flex items-center gap-4">
            <button>Family-friendly</button>
            <button>Free</button>
            <button>Outdoors</button>
          </div>
        </div>
        <ul className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-8 pt-4 md:pt-10 list-none m-0">
          {events
            .filter((event) => eventInRange(startDate, endDate, event))
            .map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
        </ul>
      </div>
    </>
  );
}
