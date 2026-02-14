import React from "react"
import { Link } from "gatsby"

import {
  InformationCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline"

interface ICTFCallToActionProps {
  setShowEnrollmentSlideOver: (
    value: boolean | ((prevVar: boolean) => boolean),
  ) => void
}

const CTFCallToAction = ({
  setShowEnrollmentSlideOver,
}: ICTFCallToActionProps) => (
  <div className="bg-white">
    <div className="max-w-8xl md:max-w-full mx-auto py-12 lg:py-0 px-4 sm:px-6 lg:px-0">
      <div className="bg-orange-500 rounded-lg lg:rounded-none shadow-xl overflow-hidden lg:gap-4">
        <div className="max-w-3xl mx-auto text-center py-12 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">
              Meld je nu aan voor de Challenge the Cyber CTF!
            </span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-orange-100 sm:text-lg md:mt-5 md:text-xl md:max-w-4xl">
            De Challenge the Cyber CTF is dé nationale hacking-competitie voor
            jong talent. In teams wordt op zaterdag 18 april 2026 een dag lang
            gestreden om de felbegeerde beker en een plaats bij het
            Cyberbootcamp.
          </p>
          <div className="mt-5 max-w-xl mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-50 bg-orange-400 hover:bg-orange-450 md:py-4 md:text-lg md:px-10"
              to="/ctf"
            >
              <InformationCircleIcon className="h-6 w-6" />
              <span className="ml-2">Meer informatie</span>
            </Link>
            <button
              onClick={() => setShowEnrollmentSlideOver(true)}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-500 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 sm:ml-4 mt-2 sm:mt-0"
            >
              <ArrowRightCircleIcon className="h-6 w-6" />
              <span className="ml-2">Aanmelden</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CTFCallToAction
