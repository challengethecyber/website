import React, { useState, FC } from "react"
import { useForm } from "react-hook-form"

import Input from "components/Input"

type IIndividualEnrollmentInput = {
  name: {
    firstName: string
    lastName: string
  }
  emailAddress: string
  birthYear: number
  educationalInstitute: string
}

const IndividualEnrollmentForm: FC = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IIndividualEnrollmentInput>()

  const onSubmit = (data: IIndividualEnrollmentInput) => console.log(data)

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row gap-4">
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
        type="number"
        label="Geboortejaar*"
        error={errors?.birthYear}
        {...register("birthYear", {
          required: { value: true, message: "Dit veld is verplicht" },
          min: { value: 1900, message: "Je geboortejaar is ongeldig" },
          max: { value: 2021, message: "Je geboortejaar is ongeldig" },
        })}
      />
      <Input
        label="Onderwijsinstelling"
        error={errors?.educationalInstitute}
        {...register("educationalInstitute")}
      />
      <div className="space-x-3 flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
        >
          Aanmelden
        </button>
      </div>
    </form>
  )
}

export default IndividualEnrollmentForm
