import React, { Fragment, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Popover, Disclosure, Menu, Transition } from "@headlessui/react"
import classNames from "classnames"

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

const pages = [
  { name: "Nieuws", href: "/news/" },
  { name: "Links", href: "/links/" },
  { name: "Team", href: "/team/" },
  // { name: "Stichting", href: "/foundation/" },
]

const Navigation = () => {
  const [showDiscordButton, setShowDiscordButton] = useState(false)

  useEffect(() => {
    setShowDiscordButton(
      localStorage.getItem(DISCORD_BANNER_PARAM_NAME) === "0"
    )
  }, [])

  const initiativePages = [
    {
      href: "/trainingmission/",
      name: "Training Mission",
      icon: <TrainingMissionIcon className="h-6 w-6 fill-white" />,
      description: "Twee maanden de tijd om te oefenen voor de jaarlijkse CTF",
    },
    {
      href: "/ctf/",
      name: "CTF",
      icon: <CTFIcon className="h-6 w-6 fill-white" />,
      description:
        "Strijd met je team voor de winst in de jaarlijkse competitie",
    },
    {
      href: "/cyberbootcamp/",
      name: "Cyberbootcamp",
      icon: <BootcampIcon className="h-6 w-6 fill-white" />,
      description: "Een week lang leren, hacken, trainen en relaxen",
    },
    {
      href: "/ecsc/",
      name: "ECSC",
      icon: <ECSCIcon className="h-6 w-6 fill-white" />,
      description: "Dé hackingcompetitie van Europa",
    },
  ]

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 space-x-8 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <span className="sr-only">Home</span>
                    <Logo className="h-8 w-auto" />
                  </Link>
                </div>
                <div className="hidden md:flex md:flex-1 md:gap-8 md:items-center">
                  <Popover className="flex space-x-8 items-center">
                    <Popover.Button className="text-gray-700 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-orange-500">
                      <span>Initiatieven</span>
                      <ChevronDownIcon className="text-gray-500 ml-2 h-5 w-5 group-hover:text-gray-600" />
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
                      <Popover.Panel className="absolute z-50 top-14 right-0 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-4">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {initiativePages.map(
                              ({ href, name, icon, description }) => (
                                <Link
                                  key={href}
                                  to={href}
                                  className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-orange-400 to-orange-600 text-white sm:h-12 sm:w-12">
                                    {icon}
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      {name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {description}
                                    </p>
                                  </div>
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>

                  {/* Other navigation items */}
                  {pages.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="leading-6 text-base font-medium hover:text-gray-900 text-gray-700"
                      activeClassName="!text-orange-500"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Discord button */}
                <div className="hidden lg:flex lg:flex-shrink-0">
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
                </div>
              </div>
              <div className="absolute flex inset-y-0 right-0 items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {pages.map(item => (
                  <Disclosure.Button
                    as={Link}
                    key={item.href}
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    activeClassName="bg-gray-50 !text-orange-500"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                <div className="px-3 py-2 tracking-wider uppercase text-xs font-semibold text-gray-400">
                  Initiatieven
                </div>
                {initiativePages.map(item => (
                  <Disclosure.Button
                    as={Link}
                    key={item.href}
                    to={item.href}
                    className="block px-6 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    activeClassName="bg-gray-50 !text-orange-500"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

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
    <div className="w-full mx-auto">
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

export default Navigation
