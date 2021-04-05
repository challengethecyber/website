import React, { useEffect } from "react"
import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { PlusIcon, XCircleIcon, CheckIcon } from "@heroicons/react/solid"

import { ITeamEnrollmentInput, IIndividualEnrollmentInput } from "../types"

import Input from "components/Input"
import MemberCard from "./MemberCard"
import IndividualEnrollmentForm from "../IndividualEnrollmentForm"

type ITeamEnrollmentFormProps = {
  register: UseFormRegister<ITeamEnrollmentInput>
  setValue: UseFormSetValue<ITeamEnrollmentInput>
  watch: UseFormWatch<ITeamEnrollmentInput>
  errors: any
}

const TeamEnrollmentForm = ({
  register,
  setValue,
  watch,
  errors,
}: ITeamEnrollmentFormProps) => {
  const {
    register: memberFormRegister,
    handleSubmit: handleMemberFormSubmit,
    formState: { errors: memberFormErrors },
    setValue: memberFormSetValue,
    watch: memberFormWatch,
    reset: memberFormReset,
  } = useForm<IIndividualEnrollmentInput>({ defaultValues: { bootcamp: true } })

  useEffect(() => {
    register("members", {
      validate: members =>
        (members?.length > 1 && members?.length <= 5) ||
        "Voeg minimaal twee en maximaal vijf teamleden toe",
    })
  }, [])

  const members = watch("members", [])

  const onMemberFormSubmit = (newMember: IIndividualEnrollmentInput) => {
    if (!members?.length) {
      newMember.isCaptain = true
    }
    setValue("members", [...(members ? members : []), newMember])
    memberFormReset()
  }

  const removeMember = (index: number) => {
    let newMembers = members
    const replaceCaptain = newMembers[index].isCaptain
    newMembers.splice(index, 1)
    if (newMembers.length && replaceCaptain) {
      newMembers[0].isCaptain = true
    }
    setValue("members", newMembers)
  }

  const setCaptain = (index: number) => {
    let newMembers = members
    for (let i = 0; i < newMembers.length; i++) {
      let currentMember = newMembers[i]
      currentMember.isCaptain = i == index
      newMembers[i] = currentMember
    }
    setValue("members", newMembers)
  }

  return (
    <form className="flex flex-col space-y-6">
      <Input
        label="Teamnaam*"
        error={errors?.teamName}
        {...register("teamName", {
          required: { value: true, message: "Dit veld is verplicht" },
        })}
      />
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-900">
          Teamleden
        </label>
        {members?.length > 0 ? (
          <ul className="grid gap-4 mb-4">
            {members?.map((member, index) => (
              <MemberCard
                member={member}
                onDelete={() => removeMember(index)}
                onSetCaptain={() => setCaptain(index)}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600 italic">
            Je hebt nog geen teamleden toegevoegd
          </p>
        )}
        {errors?.members && (
          <div className="flex mt-2">
            <XCircleIcon className="flex-shrink-0 h-5 w-5 text-red-500" />
            <p className="ml-2 text-sm text-red-500">
              {errors?.members.message}
            </p>
          </div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-900">
          Teamlid toevoegen
        </label>
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-black ring-opacity-5 p-6">
          <IndividualEnrollmentForm
            register={memberFormRegister}
            errors={memberFormErrors}
            setValue={memberFormSetValue}
            watch={memberFormWatch}
          />
          <div className="w-full flex justify-end">
            <button
              className="mt-6 inline-flex space-x-2 justify-center shadow-sm py-2 px-3 font-medium text-sm rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              onClick={handleMemberFormSubmit(onMemberFormSubmit)}
            >
              <CheckIcon className="h-5 w-5" />
              <span>Teamlid toevoegen</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default TeamEnrollmentForm