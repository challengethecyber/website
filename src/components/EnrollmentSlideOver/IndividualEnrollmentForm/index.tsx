import React, { useEffect } from "react"
import {
  UseFormRegister,
  UseFormStateReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { IIndividualEnrollmentInput } from "../types"

import Input from "components/Input"
import Select from "components/Select"
import Toggle from "components/Toggle"

type IIndividualEnrollmentFormProps = {
  register: UseFormRegister<IIndividualEnrollmentInput>
  errors: UseFormStateReturn<IIndividualEnrollmentInput>["errors"]
  setValue: UseFormSetValue<IIndividualEnrollmentInput>
  watch: UseFormWatch<IIndividualEnrollmentInput>
}

const IndividualEnrollmentForm = ({
  register,
  errors,
  setValue,
  watch,
}: IIndividualEnrollmentFormProps) => {
  useEffect(() => {
    register("bootcamp", {
      required: { value: true, message: "Dit veld is verplicht" },
    })
  }, [])

  return (
    <form className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        <Input
          label="Voornaam*"
          error={errors?.name?.firstName}
          autoComplete="given-name"
          {...register("name.firstName", {
            required: { value: true, message: "Dit veld is verplicht" },
          })}
        />
        <Input
          label="Achternaam*"
          error={errors?.name?.lastName}
          autoComplete="family-name"
          {...register("name.lastName", {
            required: { value: true, message: "Dit veld is verplicht" },
          })}
        />
      </div>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8">
        <Input
          type="number"
          label="Geboortejaar*"
          autoComplete="bday-year"
          error={errors?.birthYear}
          {...register("birthYear", {
            required: { value: true, message: "Dit veld is verplicht" },
            valueAsNumber: true,
            min: {
              value: new Date().getFullYear() - 80,
              message: "Je geboortejaar is ongeldig",
            },
            max: {
              value: new Date().getFullYear(),
              message: "Je geboortejaar is ongeldig",
            },
          })}
        />
        <Select
          label="Geslacht*"
          options={["Man", "Vrouw", "Anders"]}
          {...register("gender", {
            required: { value: true, message: "Dit veld is verplicht" },
          })}
        />
      </div>
      <Input
        label="E-mailadres*"
        type="email"
        autoComplete="email"
        error={errors?.emailAddress}
        {...register("emailAddress", {
          required: { value: true, message: "Dit veld is verplicht" },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Je e-mailadres is ongeldig",
          },
        })}
      />
      <Input
        className="md:flex-1"
        label="Onderwijsinstelling"
        error={errors?.educationalInstitution}
        {...register("educationalInstitution")}
      />
      <Toggle
        onChange={(value: boolean) => setValue("bootcamp", value)}
        value={watch("bootcamp")}
      />
    </form>
  )
}

export default IndividualEnrollmentForm
