import React, { useState, FC } from "react"
import { Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"

import { IIndividualEnrollmentInput, ITeamEnrollmentInput } from "./types"

import { XIcon } from "@heroicons/react/outline"
import { UserIcon, UsersIcon } from "@heroicons/react/solid"

import IndividualEnrollmentForm from "./individual-form"
import TeamEnrollmentForm from "./team-form"
import SuccessScreen from "./success-screen"

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
  const {
    register: individualFormRegister,
    handleSubmit: handleIndividualFormSubmit,
    setValue: setIndividualFormValue,
    watch: individualFormWatch,
    formState: { errors: individualFormErrors },
  } = useForm<IIndividualEnrollmentInput>({
    defaultValues: {
      bootcamp: true,
      newsletter: true,
      privacyStatement: false,
    },
  })

  const {
    register: teamFormRegister,
    handleSubmit: handleTeamFormSubmit,
    setValue: setTeamFormValue,
    watch: teamFormWatch,
    formState: { errors: teamFormErrors },
  } = useForm<ITeamEnrollmentInput>({
    defaultValues: { privacyStatement: false },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmissionSucceeded, setHasSubmissionSucceeded] = useState(false)
  const [isTeamEnrollment, setIsTeamEnrollment] = useState(true)

  const onSubmit = async (
    data: IIndividualEnrollmentInput | ITeamEnrollmentInput
  ) => {
    setIsLoading(true)

    const enrollmentUrl = isTeamEnrollment
      ? process.env.GATSBY_ENROLLMENT_WEBHOOK_TEAM!
      : process.env.GATSBY_ENROLLMENT_WEBHOOK_INDIVIDUAL!

    await fetch(enrollmentUrl, {
      method: "POST",
      body: JSON.stringify(data),
    })

    setIsLoading(false)
    setHasSubmissionSucceeded(true)
  }

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
              {hasSubmissionSucceeded ? (
                <SuccessScreen />
              ) : (
                <div className="flex-1">
                  <div className="py-6 px-4 bg-orange-500 sm:px-6">
                    <div className="flex items-center justify-between">
                      <h2
                        className="text-xl font-medium text-white"
                        id="slide-over-title"
                      >
                        Aanmelden voor Challenge the Cyber CTF 2021
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-orange-500 rounded-md text-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setShowEnrollmentSlideOver(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-orange-200">
                        Leuk dat je mee wilt doen met de Challenge the Cyber
                        CTF! Om je aan te melden hebben we wat gegevens van je
                        nodig.
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
                          <nav
                            className="flex space-x-4 mt-2"
                            aria-label="Tabs"
                          >
                            <button
                              className={`transition ease-in-out duration-100 inline-flex space-x-2 ${
                                !isTeamEnrollment
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-100 text-gray-500 hover:text-gray-700"
                              } py-3 px-4 font-medium text-md rounded-md`}
                              onClick={() => setIsTeamEnrollment(false)}
                            >
                              <UserIcon className="h-6 w-6" />
                              <span>Individueel</span>
                            </button>
                            <button
                              className={`transition ease-in-out duration-100 inline-flex space-x-2 ${
                                isTeamEnrollment
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-100 text-gray-500 hover:text-gray-700"
                              } py-3 px-4 font-medium text-md rounded-md`}
                              onClick={() => setIsTeamEnrollment(true)}
                            >
                              <UsersIcon className="h-6 w-6" />
                              <span>Team</span>
                            </button>
                          </nav>
                        </div>

                        {isTeamEnrollment ? (
                          <TeamEnrollmentForm
                            register={teamFormRegister}
                            errors={teamFormErrors}
                            setValue={setTeamFormValue}
                            watch={teamFormWatch}
                          />
                        ) : (
                          <IndividualEnrollmentForm
                            register={individualFormRegister}
                            errors={individualFormErrors}
                            setValue={setIndividualFormValue}
                            watch={individualFormWatch}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                <div className="space-x-3 flex justify-end">
                  {hasSubmissionSucceeded ? (
                    <button
                      disabled={isLoading}
                      className="inline-flex justify-center text-white border border-transparent shadow-sm py-3 px-4 font-medium text-md rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 bg-orange-500 hover:bg-orange-600"
                      onClick={() => setShowEnrollmentSlideOver(false)}
                    >
                      Sluiten
                    </button>
                  ) : (
                    <button
                      disabled={isLoading}
                      className={`inline-flex justify-center text-white border border-transparent shadow-sm py-3 px-4 font-medium text-md rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
                        isLoading
                          ? "bg-gray-400 cursor-default"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                      onClick={() =>
                        isTeamEnrollment
                          ? handleTeamFormSubmit(onSubmit)()
                          : handleIndividualFormSubmit(onSubmit)()
                      }
                    >
                      Aanmelden
                    </button>
                  )}
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
