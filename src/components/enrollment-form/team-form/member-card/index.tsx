import React from "react"

import { IIndividualEnrollmentInput } from "../../types"

interface IMemberCardProps {
  member: IIndividualEnrollmentInput
  onDelete: () => void
  onSetCaptain: () => void
}

const MemberCard = ({ member, onDelete, onSetCaptain }: IMemberCardProps) => {
  const subTitle = `${member.gender} (${member.birthYear}) - ${
    member.emailAddress
  } ${member.educationalInstitution && `- ${member.educationalInstitution}`}`

  return (
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
          <p className="mt-1 text-gray-500 text-sm truncate" title={subTitle}>
            {subTitle}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col divide-y divide-gray-200">
          <div className="h-0 flex-1 flex">
            <button
              disabled={member.isCaptain}
              onClick={() => onSetCaptain()}
              className={`w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium ${
                member.isCaptain
                  ? "cursor-default text-gray-300"
                  : "text-orange-500 hover:text-orange-400 focus:outline-none focus:z-10 focus:ring-2 focus:ring-orange-400"
              }`}
            >
              Maak captain
            </button>
          </div>
          <div className="h-0 flex-1 flex">
            <button
              className="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={() => onDelete()}
            >
              Verwijderen
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default MemberCard
