import React, { useState } from "react"
import { Link } from "gatsby"
import { Transition } from "@headlessui/react"

import {
  MenuIcon,
  XIcon,
  PuzzleIcon,
  AcademicCapIcon,
  FlagIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline"

import Logo from "/src/assets/ctc-satellite.svg"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isInitiativesOpen, setIsInitiativesOpen] = useState(false)

  const pages = [
    {
      link: "/ctf/",
      prettyName: "CTF",
      icon: <PuzzleIcon className="h-6 w-6" />,
      description:
        "Strijd met je team voor de winst in de jaarlijkse competitie",
    },
    {
      link: "/cyberbootcamp/",
      prettyName: "Cyberbootcamp",
      icon: <AcademicCapIcon className="h-6 w-6" />,
      description: "Een week lang leren, hacken, trainen en relaxen",
    },
    {
      link: "/ecsc/",
      prettyName: "ECSC",
      icon: <FlagIcon className="h-6 w-6" />,
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
                    <MenuIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              <button
                type="button"
                className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-orange-500"
                aria-expanded="false"
                onClick={() => setIsInitiativesOpen(!isInitiativesOpen)}
              >
                <span>Initiatieven</span>
                <ChevronDownIcon className="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" />
              </button>

              <Transition
                className="absolute z-10 -ml-4 mt-3 right-0 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-10"
                show={isInitiativesOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
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
            </div>
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
                  <img
                    className="h-8 w-auto"
                    src={Logo}
                    alt="Challenge the Cyber"
                  />
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="h-6 w-6" />
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
