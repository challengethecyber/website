import React from "react"
import { CalendarIcon } from "@heroicons/react/solid"

type EventSchedule = { time: string; description: string }[]

const Schedule = ({ schedule }: { schedule: EventSchedule }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 w-full">
    <div className="px-4 py-5 sm:px-6 text-xl font-semibold text-gray-700 inline-flex items-center">
      <CalendarIcon className="h-7 w-7 mr-4" />
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
              <div className="relative flex items-center justify-center space-x-6">
                <div>
                  <span className="flex items-center justify-center px-2 py-0.5 rounded-md text-sm font-medium bg-orange-500 text-white ring-4 ring-white w-14">
                    {item.time}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Schedule
