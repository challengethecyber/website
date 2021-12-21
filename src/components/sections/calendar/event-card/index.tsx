import React, { FC } from "react"
import { DateTime } from "luxon"
import ical from "ical-generator"
import slugify from "slugify"
import { DownloadIcon } from "@heroicons/react/outline"

interface IEventCardProps {
  eventName: string
  startDate: string
  endDate: string
  shortDescription: string
}

const downloadIcal = (eventName: string, data: Blob) => {
  const element = document.createElement("a")
  const file = new Blob([data], {
    type: "text/calendar",
  })
  element.href = URL.createObjectURL(file)
  element.download = `${slugify(eventName)}.ics`
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

const EventCard: FC<IEventCardProps> = ({
  startDate,
  endDate,
  eventName,
  shortDescription,
}) => {
  const parsedStartDate = DateTime.fromISO(startDate).setLocale("nl")
  const parsedEndDate = DateTime.fromISO(endDate).setLocale("nl")

  const icalItem = ical({ name: "Challenge the Cyber" })

  icalItem.createEvent({
    start: parsedStartDate,
    end: parsedEndDate,
    summary: eventName,
    description: shortDescription,
    url: "https://www.challengethecyber.nl/",
  })

  return (
    <li className="p-2 rounded-lg shadow bg-white">
      <div className="flex items-center gap-4 lg:gap-8">
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

        <div className="space-y-2 overflow-hidden flex-1">
          <h4 className="flex-1 text-gray-800 text-lg md:text-xl lg:text-2xl font-semibold tracking-tight truncate">
            {eventName}
          </h4>
          <p className="text-gray-600 truncate">
            {shortDescription}
          </p>
        </div>

        <div
          className="p-2 lg:mr-2 cursor-pointer"
          onClick={() => downloadIcal(eventName, icalItem.toBlob())}
        >
          <DownloadIcon
            aria-label="Add to calendar"
            className="h-6 w-6 text-orange-500"
          />
        </div>
      </div>
    </li>
  )
}

export default EventCard