import React, { FC } from "react"
import { DateTime } from "luxon"

interface IEventCardProps {
  eventName: string
  startDate: string
  endDate: string
  shortDescription: string
}

const EventCard: FC<IEventCardProps> = ({
  startDate,
  eventName,
  shortDescription,
}) => {
  const parsedStartDate = DateTime.fromISO(startDate).setLocale("nl")

  return (
    <li className="p-2 rounded-lg shadow bg-white">
      <div className="flex items-center gap-8">
        <div className="flex-shrink-0 flex flex-col w-20 rounded-md overflow-hidden border border-gray-200">
          <div className="bg-orange-500 p-px text-white text-center text-sm">
            <span>{parsedStartDate.toFormat("LLLL")}</span>
          </div>
          <div className="p-1 flex flex-col items-center">
            <span className="text-lg font-semibold -mb-1">
              {parsedStartDate.toFormat("dd")}
            </span>
            <span className="text-orange-500 text-sm">
              {parsedStartDate.toFormat("cccc")}
            </span>
          </div>
        </div>

        <div className="space-y-2 overflow-hidden">
          <h4 className="flex-1 text-gray-800 text-xl lg:text-2xl font-semibold tracking-tight">
            {eventName}
          </h4>
          <span className="text-gray-600 break-words">{shortDescription}</span>
        </div>
      </div>
    </li>
  )
}

export default EventCard
