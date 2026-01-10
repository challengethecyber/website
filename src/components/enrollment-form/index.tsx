import React, { useState, FC } from "react"
import { Transition } from "@headlessui/react"
import { useForm } from "react-hook-form"

import { IIndividualEnrollmentInput, ITeamEnrollmentInput } from "./types"

import { XMarkIcon } from "@heroicons/react/24/outline"
import { UserIcon, UsersIcon, XCircleIcon } from "@heroicons/react/20/solid"

import IndividualEnrollmentForm from "./individual-form"
import TeamEnrollmentForm from "./team-form"
import SuccessScreen from "./success-screen"
import ContextCard from "components/context-card"

interface IEnrollmentSlideOverProps {
  showEnrollmentSlideOver: boolean
  setShowEnrollmentSlideOver: (
    value: boolean | ((prevVar: boolean) => boolean),
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
  } = useForm<IEnrollmentInput>({
    defaultValues: {
      type: "individual",
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
  } = useForm<IEnrollmentInput>({
    defaultValues: {
      type: "team",
      privacyStatement: false,
      combineWithOtherDuo: true,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [hasErrored, setHasErrored] = useState(false)
  const [hasSubmissionSucceeded, setHasSubmissionSucceeded] = useState(false)
  const [isTeamEnrollment, setIsTeamEnrollment] = useState(true)

  const onSubmit = async (data: IEnrollmentInput) => {
    setIsLoading(true)

    const enrollmentUrl = process.env.GATSBY_ENROLLMENT_WEBHOOK!

    const enrollmentResponse = await fetch(enrollmentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (enrollmentResponse.ok) {
      setIsLoading(false)
      setHasErrored(false)
      setHasSubmissionSucceeded(true)
    } else {
      setHasErrored(true)
      setIsLoading(false)
    }
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
          className="absolute inset-0 bg-gray-500/75"
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
                        {`Aanmelden voor Challenge the Cyber CTF ${new Date().getFullYear()}`}
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-orange-500 rounded-md text-gray-100 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-white"
                          onClick={() => setShowEnrollmentSlideOver(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" />
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
                        <ContextCard
                          mainText="Let op!"
                          subText="Challenge the Cyber is een fysiek evenement - online deelname is niet mogelijk."
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-900">
                            Soort inschrijving
                          </label>
                          <nav
                            className="flex space-x-4 mt-2"
                            aria-label="Tabs"
                          >
                            <button
                              className={`transition ease-in-out duration-100 inline-flex space-x-2 cursor-pointer ${
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
                              className={`transition ease-in-out duration-100 inline-flex space-x-2 cursor-pointer ${
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
              <div className="shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                <div className="space-x-3 flex justify-end">
                  {hasErrored && (
                    <div className="w-full bg-gray-100 rounded-md flex items-center gap-3 px-2 py-1">
                      <div className="shrink-0">
                        <XCircleIcon className="size-6 text-orange-500" />
                      </div>
                      <span className="text-sm font-normal text-gray-800">
                        Er ging iets mis bij het aanmelden. Probeer het later
                        opnieuw of neem contact met ons op.
                      </span>
                    </div>
                  )}
                  {hasSubmissionSucceeded ? (
                    <button
                      disabled={isLoading}
                      className="inline-flex justify-center text-white border border-transparent shadow-xs py-3 px-4 font-medium text-md rounded-md  focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 bg-orange-500 hover:bg-orange-600"
                      onClick={() => setShowEnrollmentSlideOver(false)}
                    >
                      Sluiten
                    </button>
                  ) : (
                    <button
                      disabled={isLoading}
                      className={`inline-flex justify-center text-white border border-transparent shadow-sm py-3 px-4 font-medium text-md rounded-md  focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
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
