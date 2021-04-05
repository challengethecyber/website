import React from "react"

import { IIndividualEnrollmentInput } from "../../types"

interface IMemberCardProps {
  member: IIndividualEnrollmentInput
  onDelete: () => void
  onSetCaptain: () => void
}

const Select = ({ member, onDelete, onSetCaptain }: IMemberCardProps) => (
  <li className="w-full bg-white shadow-sm rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 divide-x divide-gray-200">
    <div className="w-0 flex-1 flex items-center py-4 px-6">
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <h3 className="text-gray-900 text-sm font-medium truncate">
            {`${member.name.firstName} ${member.name.lastName}`}
          </h3>
          {member.isCaptain && (
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-white text-xs font-medium bg-orange-500 rounded-full">
              Captain
            </span>
          )}
        </div>
        <p className="mt-1 text-gray-500 text-sm truncate">
          {`${member.gender} (${member.birthYear}) - ${member.emailAddress}`}
        </p>
      </div>
    </div>
    <div className="flex">
      <div className="flex flex-col divide-y divide-gray-200">
        <div className="h-0 flex-1 flex">
          <button
            disabled={member.isCaptain}
            onClick={onSetCaptain}
            className={`w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium ${
              member.isCaptain
                ? "cursor-default text-gray-300"
                : "text-orange-500 hover:text-orange-400 focus:outline-none focus:z-10 focus:ring-2 focus:ring-indigo-500"
            }`}
          >
            Maak captain
          </button>
        </div>
        <div className="h-0 flex-1 flex">
          <button
            className="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={onDelete}
          >
            Verwijderen
          </button>
        </div>
      </div>
    </div>
  </li>
)

{
  /* <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="w-0 flex-1 flex">
          <a href="mailto:janecooper@example.com" class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
            <!-- Heroicon name: solid/mail -->
            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span class="ml-3">Email</span>
          </a>
        </div>
        <div class="-ml-px w-0 flex-1 flex">
          <a href="tel:+1-202-555-0170" class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
            <!-- Heroicon name: solid/phone -->
            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span class="ml-3">Call</span>
          </a>
        </div>
      </div>
    </div> */
}

export default Select
