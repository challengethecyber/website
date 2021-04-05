import React, { useState } from "react"
import { Link } from "gatsby"
import { Transition } from "@headlessui/react"

import { MenuIcon, XIcon } from "@heroicons/react/outline"

import Logo from "../images/ctc-satellite.svg" // TODO take care of linting

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <svg
        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
        fill="currentColor"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>

      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex items-center justify-between sm:h-10 lg:justify-start"
          aria-label="Global"
        >
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/">
                <span className="sr-only">Workflow</span>
                <img className="h-8 w-auto sm:h-10" src={Logo} />
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
            <Link
              to="/news/"
              className="font-medium text-gray-500 hover:text-gray-900"
            >
              Nieuws
            </Link>
            <Link
              to="/links/"
              className="font-medium text-gray-500 hover:text-gray-900"
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
                <img className="h-8 w-auto" src={Logo} />
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
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/links/"
              className="block px-3 py-2 rounded-md text-base font-medium text-orange-500 hover:text-orange-600 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/news/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Nieuws
            </Link>
            <Link
              to="/links/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Links
            </Link>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default Header
