import React from "react"
import { CalendarIcon } from "@heroicons/react/solid"

import Page from "components/page"

const Stream = () => {
  const streamChannelId = process.env.GATSBY_EVENT_STREAM_CHANNEL_ID

  const schedule = [
    {
      time: "10:30",
      description:
        "Introductie, bekendmaking van het thema, presentatie van de jury en succeswensen van de sponsoren",
    },
    { time: "11:00", description: "Start CTF!" },
    {
      time: "11:00",
      description:
        "Gesprek over het spelen van CTF's, hacking en ethiek en meer over Challenge the Cyber, het Cyberbootcamp en de European Cyber Challenge",
    },
    {
      time: "11:30",
      description: "Het scoreboard wordt getoond op de stream",
    },
    {
      time: "16:30",
      description:
        "Discussie over het scoreboard, update van de jury, gesprek met bedrijfsleven over de brug tussen CTF's en de realiteit",
    },
    { time: "17:00", description: "Einde CTF!" },
    {
      time: "17:00",
      description:
        "Bekendmaking eindstand, prijsuitreiking, interviews met de winnaars en een vooruitblik op de komende activiteiten van Challenge the Cyber",
    },
  ]

  return (
    <Page title="Livestream">
      <div className="bg-white px-4 py-6 sm:px-6 max-w-full mx-auto">
        <span className="mt-2 mb-6 block text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Livestream
        </span>
        <div className="flex flex-col 2xl:flex-row space-y-8 2xl:space-y-0 2xl:space-x-4">
          <div className="flex-grow bg-white overflow-hidden shadow rounded-lg">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="overflow-hidden -z-10w-full h-full my-auto"
                src={`https://www.youtube.com/embed/live_stream?channel=${streamChannelId}&autoplay=1&controls=1&rel=0`}
                frameBorder="0"
                allow="autoplay"
              />
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 w-full 2xl:w-3/12">
            <div className="px-4 py-5 sm:px-6 text-lg font-semibold text-gray-700 inline-flex items-center">
              <CalendarIcon className="h-6 w-6 mr-2" />
              Programma
            </div>
            <div className="px-4 py-4">
              <ul className="-mb-8">
                {schedule.map((item, id) => (
                  <li key={id}>
                    <div className="relative pb-8">
                      {id !== schedule.length - 1 ? (
                        <span
                          className="absolute top-4 left-7 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex items-center justify-center px-2 py-0.5 rounded-md text-sm font-medium bg-orange-500 text-white ring-4 ring-white w-14">
                            {item.time}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Stream
