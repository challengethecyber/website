import React, { useEffect } from "react"
import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { XCircleIcon, UserPlusIcon } from "@heroicons/react/20/solid"

import { ITeamEnrollmentInput, IIndividualEnrollmentInput } from "../types"

import Input from "components/input"
import Select from "components/select"
import ContextCard from "components/context-card"
import MemberCard from "./member-card"
import IndividualEnrollmentForm from "../individual-form"
import Toggle from "components/toggle"

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
  } = useForm<IIndividualEnrollmentInput>({
    defaultValues: {
      bootcamp: true,
      newsletter: true,
    },
  })

  useEffect(() => {
    register("members", {
      validate: members =>
        (members?.length > 1 && members?.length <= 4) ||
        "Voeg minimaal twee en maximaal vier teamleden toe",
    })

    register("privacyStatement", {
      validate: (privacyStatement: boolean) =>
        privacyStatement || "Accepteer de privacyverklaring om verder te gaan",
    })
  }, [])

  const members = watch("members", [])
  const isBuitenCategorie = members.find(
    member => member.birthYear < new Date().getFullYear() - 25,
  )

  const onMemberFormSubmit = (newMember: IIndividualEnrollmentInput) => {
    if (!members?.length) {
      newMember.isCaptain = true
    }
    setValue("members", [...(members ? members : []), newMember])

    // Temporary fix - explicitly reset all fields
    memberFormReset({
      name: { firstName: "", lastName: "" },
      birthYear: undefined,
      gender: undefined,
      emailAddress: undefined,
      educationalInstitution: "",
      dietaryPreferences: "",
      bootcamp: true,
      newsletter: true,
    })
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
    <div className="flex flex-col space-y-6">
      {isBuitenCategorie && (
        <ContextCard
          mainText="Buitencategorie"
          subText="Je voegt een team toe in de buitencategorie. We geven voorrang aan deelnemers tussen de 14 en 25 jaar oud. Je team wordt op de wachtlijst geplaatst en je hoort twee weken van tevoren of er plek is om mee te doen."
          isAlert
        />
      )}
      <Input
        label="Teamnaam*"
        error={errors?.teamName}
        {...register("teamName", {
          required: { value: true, message: "Dit veld is verplicht" },
          maxLength: { value: 30, message: "Je teamnaam is te lang!" },
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
                key={index}
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
            <XCircleIcon className="shrink-0 h-5 w-5 text-red-500" />
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
        <div className="bg-white rounded-lg shadow-xs ring-1 ring-black/5 p-6">
          <IndividualEnrollmentForm
            register={memberFormRegister}
            errors={memberFormErrors}
            setValue={memberFormSetValue}
            watch={memberFormWatch}
            isMemberForm
          />
          <div className="w-full flex justify-end">
            <button
              className="mt-6 w-full inline-flex space-x-2 justify-center shadow-xs py-3 px-4 font-medium text-md rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              onClick={handleMemberFormSubmit(onMemberFormSubmit)}
            >
              <UserPlusIcon className="h-6 w-6" />
              <span>Teamlid toevoegen</span>
            </button>
          </div>
        </div>
      </div>
      {members?.length === 2 && (
        <Toggle
          onChange={(value: boolean) => setValue("combineWithOtherDuo", value)}
          value={watch("combineWithOtherDuo") ?? true}
          mainText="Combineer ons met een ander duo"
          subText="We combineren jullie team met een ander duo met soortgelijk ervaringsniveau en leeftijd. De definitieve samenstelling volgt uiterlijk een week voor het evenement."
        />
      )}
      {members?.length === 2 && watch("combineWithOtherDuo") && (
        <Select
          label="Ervaringsniveau*"
          options={[
            "Geen ervaring (dit is onze eerste CTF)",
            "Een beetje ervaring (we hebben aan enkele CTFs meegedaan)",
            "We hebben veel CTF-ervaring (>5 CTFs)",
          ]}
          error={errors?.experienceLevel}
          {...register("experienceLevel", {
            required: { value: true, message: "Dit veld is verplicht" },
            setValueAs: (value: string) => {
              if (value === "Geen ervaring (dit is onze eerste CTF)") return 0
              if (
                value ===
                "Een beetje ervaring (we hebben aan enkele CTFs meegedaan)"
              )
                return 1
              if (value === "We hebben veel CTF-ervaring (>5 CTFs)") return 2
              return undefined
            },
          })}
        />
      )}
      <Toggle
        onChange={(value: boolean) => setValue("privacyStatement", value)}
        value={watch("privacyStatement")}
        mainText="Ik ga akkoord met de privacyverklaring"
        subText={
          <span>
            Geef hier aan of je akkoord gaat met de{" "}
            <a className="underline" href="/privacy-statement" target="_blank">
              privacyverklaring
            </a>{" "}
            van Challenge the Cyber
          </span>
        }
        error={errors?.privacyStatement}
      />
    </div>
  )
}

export default TeamEnrollmentForm
