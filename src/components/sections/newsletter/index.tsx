import React from "react"
import { Link } from "gatsby"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

export default function Newsletter() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="px-6 py-6 bg-orange-500 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Op de hoogte blijven van Challenge the Cyber?
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-50">
              Meld je aan voor onze nieuwsbrief! We sturen je enkele keren per
              jaar een mailtje met informatie over aanstaande events.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            {/* <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:shrink-0"
              >
                Notify me
              </button>
            </form> */}
            <Link
              to={process.env.GATSBY_NEWSLETTER_SIGNUP_LINK as string}
              target="_blank"
            >
              <button
                type="submit"
                className="mt-3 w-full flex gap-2 items-center justify-center px-5 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-orange-500 bg-white hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:shrink-0"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
                Aanmelden
              </button>
            </Link>
            <p className="mt-3 text-sm text-gray-50">
              We vinden de bescherming van jouw data belangrijk. Lees onze{" "}
              <Link
                className="text-white font-medium underline"
                to="/privacy-statement"
              >
                privacyverklaring
              </Link>{" "}
              voor meer informatie.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
