import React from "react"
import { UseFormRegister } from "react-hook-form"

import { IIndividualEnrollmentInput } from "../types"

import Input from "components/Input"

type IIndividualEnrollmentFormProps = {
  register: UseFormRegister<IIndividualEnrollmentInput>
  errors: any
}

const IndividualEnrollmentForm = ({
  register,
  errors,
}: IIndividualEnrollmentFormProps) => {
  return (
    <form className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
        <Input
          label="Voornaam*"
          error={errors?.name?.firstName}
          {...register("name.firstName", {
            required: { value: true, message: "Dit veld is verplicht" },
          })}
        />
        <Input
          label="Achternaam*"
          error={errors?.name?.lastName}
          {...register("name.lastName", {
            required: { value: true, message: "Dit veld is verplicht" },
          })}
        />
      </div>
      <Input
        label="E-mailadres*"
        type="email"
        error={errors?.emailAddress}
        {...register("emailAddress", {
          required: { value: true, message: "Dit veld is verplicht" },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Je e-mailadres is ongeldig",
          },
        })}
      />
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
        <Input
          className="md:w-48 md:flex-none"
          type="number"
          label="Geboortejaar*"
          error={errors?.birthYear}
          {...register("birthYear", {
            required: { value: true, message: "Dit veld is verplicht" },
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
        <Input
          className="md:flex-1"
          label="Onderwijsinstelling"
          error={errors?.educationalInstitute}
          {...register("educationalInstitute")}
        />
      </div>
    </form>
  )
}

export default IndividualEnrollmentForm
