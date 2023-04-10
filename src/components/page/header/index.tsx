import React, { Fragment, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Popover, Transition } from "@headlessui/react"

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"
import { DISCORD_BANNER_PARAM_NAME } from "components/page"

import Logo from "assets/ctc-satellite.svg"
import TrainingMissionIcon from "assets/icons8-compass.svg"
import ECSCIcon from "assets/icons8-trophy.svg"
import CTFIcon from "assets/icons8-flag-2.svg"
import BootcampIcon from "assets/icons8-graduation-cap.svg"
import DiscordIcon from "src/assets/discord.svg"
import CyberWorkoutIcon from "assets/dumbbell-gym-svgrepo-com.svg"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showDiscordButton, setShowDiscordButton] = useState(false)

  useEffect(() => {
    setShowDiscordButton(
      localStorage.getItem(DISCORD_BANNER_PARAM_NAME) === "0"
    )
  }, [])

  const pages = [
    {
      link: "/trainingmission/",
      prettyName: "Training Mission",
      icon: <TrainingMissionIcon className="h-6 w-6 fill-white" />,
      description: "Twee maanden de tijd om te oefenen voor de jaarlijkse CTF",
    },
    {
      link: "/cyberworkout/",
      prettyName: "Cyber Workout",
      icon: <CyberWorkoutIcon className="h-6 w-6 fill-white" />,
      description: "Door het jaar heen oefenen met CTFs",
    },
    {
      link: "/ctf/",
      prettyName: "CTF",
      icon: <CTFIcon className="h-6 w-6 fill-white" />,
      description:
        "Strijd met je team voor de winst in de jaarlijkse competitie",
    },
    {
      link: "/cyberbootcamp/",
      prettyName: "Cyberbootcamp",
      icon: <BootcampIcon className="h-6 w-6 fill-white" />,
      description: "Een week lang leren, hacken, trainen en relaxen",
    },
    {
      link: "/ecsc/",
      prettyName: "ECSC",
      icon: <ECSCIcon className="h-6 w-6 fill-white" />,
      description: "Dé hackingcompetitie van Europa",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative z-10 pb-8 bg-white">
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link to="/">
                  <span className="sr-only">Workflow</span>
                  <Logo className="h-8 w-auto sm:h-10" />
                </Link>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                    aria-expanded="false"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            <Popover className="hidden md:flex md:ml-10 md:pr-4 md:space-x-8 md:items-center">
              <Popover.Button className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-orange-500">
                <span>Initiatieven</span>
                <ChevronDownIcon className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 top-10 right-0 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-10">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                      {pages.map(({ link, prettyName, icon, description }) => (
                        <Link
                          key={link}
                          to={link}
                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-orange-400 to-orange-600 text-white sm:h-12 sm:w-12">
                            {icon}
                          </div>
                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">
                              {prettyName}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
              <Link
                to="/news/"
                className="font-medium text-gray-500 hover:text-gray-900"
                activeClassName="!text-orange-500"
              >
                Nieuws
              </Link>
              <Link
                to="/links/"
                className="font-medium text-gray-500 hover:text-gray-900"
                activeClassName="!text-orange-500"
              >
                Links
              </Link>
              {/* <Link
                to="/team/"
                className="font-medium text-gray-500 hover:text-gray-900"
                activeClassName="!text-orange-500"
              >
                Team
              </Link> */}
              {(process.env.GATSBY_SHOW_DISCORD_BANNER !== "true" ||
                showDiscordButton) && (
                <a
                  href={process.env.GATSBY_DISCORD_INVITE_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-opacity-90"
                >
                  <DiscordIcon className="h-5 w-5 mr-2 fill-white" />
                  Discord
                </a>
              )}
            </Popover>
          </nav>
        </div>

        <Transition
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          show={isMenuOpen}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <Link to="/">
                  <span className="sr-only">Challenge the Cyber</span>
                  <Logo className="h-8 w-auto" alt="Challenge the Cyber" />
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close main menu</span>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 mt-2 space-y-1">
              <div>
                {pages.map(({ link, prettyName, icon }) => (
                  <Link
                    key={link}
                    to={link}
                    className="my-3 flex items-center rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-orange-400 to-orange-600 text-white">
                      {icon}
                    </div>
                    <div className="ml-4 text-base font-medium text-gray-900">
                      {prettyName}
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                activeClassName="bg-gray-50 !text-orange-500"
              >
                Home
              </Link>
              <Link
                to="/news/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                activeClassName="bg-gray-50 !text-orange-500"
              >
                Nieuws
              </Link>
              <Link
                to="/links/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                activeClassName="bg-gray-50 !text-orange-500"
              >
                Links
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default Header
