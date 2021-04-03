import React, { useState, FC } from "react"
import { Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"

import {
  IIndividualEnrollmentInput,
  ITeamEnrollmentInput,
  IEnrollmentInput,
} from "./types"

import { PlusIcon } from "@heroicons/react/solid"
import { XIcon } from "@heroicons/react/outline"

import IndividualEnrollmentForm from "./IndividualEnrollmentForm"

interface IEnrollmentSlideOverProps {
  showEnrollmentSlideOver: boolean
  setShowEnrollmentSlideOver: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void
}

const EnrollmentSlideOver = ({
  showEnrollmentSlideOver,
  setShowEnrollmentSlideOver,
}: IEnrollmentSlideOverProps) => {
  const onSubmit = async (data: IEnrollmentInput) => {
    console.log(JSON.stringify(data))
    // await fetch("https://usebasin.com/f/97c2ca1e7a73", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
  }

  const {
    register: individualFormRegister,
    handleSubmit: handleIndividualFormSubmit,
    formState: { errors: individualFormErrors },
  } = useForm<IIndividualEnrollmentInput>()

  console.log(individualFormErrors)

  const [isTeamEnrollment, setIsTeamEnrollment] = useState(false)

  const [isAddingTeammate, setIsAddingTeammate] = useState(false)
  const [members, setMembers] = useState([
    {
      firstName: "Diederik",
      lastName: "Bakker",
      birthYear: 1996,
      educationalInstitution: "Universiteit Twente",
      gender: "M",
      bootcamp: true,
      isCoach: true,
      isMainContact: true,
    },
  ])

  // Personal or team?
  // Buttons

  // Category (with explanation)

  // Onderwijsinstelling

  // Contactpersoon

  // Team Coach

  // Individual
  // Name
  // Birth year
  // Onderwijsinstelling
  // E-mailadres

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-20 ${
        !showEnrollmentSlideOver ? "pointer-events-none" : ""
      }`}
      aria-labelledby="enrollment-form"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Transition
          className="absolute inset-0 bg-gray-500 bg-opacity-75"
          onClick={() => setShowEnrollmentSlideOver(false)}
          show={showEnrollmentSlideOver}
          appear={true}
          enter="transition-opacity ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />
        <Transition
          className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
          show={showEnrollmentSlideOver}
          appear={true}
          enter="transform transition ease-in-out duration-500"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="w-screen max-w-xl">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              <div className="flex-1">
                <div className="py-6 px-4 bg-orange-600 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-lg font-medium text-white"
                      id="slide-over-title"
                    >
                      Aanmelden voor Challenge the Cyber CTF 2021
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="bg-orange-600 rounded-md text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setShowEnrollmentSlideOver(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-orange-200">
                      Leuk dat je mee wilt doen met de Challenge the Cyber CTF!
                      Om je aan te melden hebben we wat gegevens van je nodig.
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="px-4 divide-y divide-gray-200 sm:px-6">
                    <div className="space-y-6 pt-6 pb-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Soort inschrijving
                        </label>
                        <nav className="flex space-x-4 mt-2" aria-label="Tabs">
                          <button
                            className={`${
                              !isTeamEnrollment
                                ? "bg-orange-500 text-white"
                                : "bg-gray-50 text-gray-500 hover:text-gray-700"
                            } px-3 py-2 font-medium text-sm rounded-md`}
                            onClick={() => setIsTeamEnrollment(false)}
                          >
                            Individueel
                          </button>
                          <button
                            className={`${
                              isTeamEnrollment
                                ? "bg-orange-500 text-white"
                                : "bg-gray-50 text-gray-500 hover:text-gray-700"
                            } px-3 py-2 font-medium text-sm rounded-md`}
                            onClick={() => setIsTeamEnrollment(true)}
                          >
                            Team
                          </button>
                        </nav>
                      </div>

                      {isTeamEnrollment ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Teamleden
                          </label>
                          <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                            {members.map((member, i) => (
                              <li className="py-3 flex justify-between items-center">
                                <div className="truncate">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {`${member.firstName} ${member.lastName}`}
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    {member.educationalInstitution}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  className="ml-6 bg-white rounded-md text-sm font-medium text-orange-500 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                                  onClick={() =>
                                    setMembers([...members].splice(i - 1, 1))
                                  }
                                >
                                  Verwijderen
                                </button>
                              </li>
                            ))}
                            <li className="py-2 flex justify-between items-center">
                              {isAddingTeammate ? (
                                <div className="px-4 py-5 sm:p-6">
                                  <Input label="Voornaam" />
                                  <Input label="Achternaam" />
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                                  onClick={() => setIsAddingTeammate(true)}
                                >
                                  <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                    <PlusIcon />
                                  </span>
                                  <span className="ml-4 text-sm font-medium text-orange-500 group-hover:text-orange-400">
                                    Teamlid toevoegen
                                  </span>
                                </button>
                              )}
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <IndividualEnrollmentForm
                          register={individualFormRegister}
                          errors={individualFormErrors}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                <div className="space-x-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                    onClick={() =>
                      isTeamEnrollment
                        ? handleIndividualFormSubmit(onSubmit)()
                        : handleIndividualFormSubmit(onSubmit)()
                    }
                  >
                    Aanmelden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default EnrollmentSlideOver
