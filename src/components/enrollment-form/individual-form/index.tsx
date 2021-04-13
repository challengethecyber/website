import React, { useEffect } from "react"
import {
  UseFormRegister,
  UseFormStateReturn,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { IIndividualEnrollmentInput } from "../types"

import Input from "/src/components/input"
import Select from "/src/components/select"
import Toggle from "/src/components/toggle"
import ContextCard from "components/context-card"

type IIndividualEnrollmentFormProps = {
  register: UseFormRegister<IIndividualEnrollmentInput>
  errors: UseFormStateReturn<IIndividualEnrollmentInput>["errors"]
  setValue: UseFormSetValue<IIndividualEnrollmentInput>
  watch: UseFormWatch<IIndividualEnrollmentInput>
  isMemberForm?: boolean
}

const IndividualEnrollmentForm = ({
  register,
  errors,
  setValue,
  watch,
  isMemberForm = false,
}: IIndividualEnrollmentFormProps) => {
  useEffect(() => {
    register("bootcamp")

    register("newsletter")

    if (!isMemberForm) {
      register("privacyStatement", {
        validate: (privacyStatement?: boolean) =>
          privacyStatement ||
          "Accepteer de privacyverklaring om verder te gaan",
      })
    }
  }, [])

  return (
    <form className="flex flex-col space-y-6">
      {!isMemberForm && (
        <ContextCard
          mainText="Geen team? Geen nood!"
          subText="Meld je aan en wij zorgen dat je in een team komt met andere individuele spelers."
        />
      )}
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
              value: 1995,
              message: "Je kunt alleen deelnemen met een geboortejaar na 1995",
            },
            max: {
              value: 2006,
              message:
                "Je kunt alleen deelnemen met een geboortejaar voor 2006",
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
        mainText="Deelname cyberbootcamp"
        subText={
          isMemberForm
            ? "Geef hier aan of deze deelnemer in aanmerking wil komen voor deelname aan het cyberbootcamp"
            : "Geef hier aan of je in aanmerking wilt komen voor deelname aan het cyberbootcamp"
        }
      />
      <Toggle
        onChange={(value: boolean) => setValue("newsletter", value)}
        value={watch("newsletter")}
        mainText="Aanmelding voor de nieuwsbrief"
        subText={
          isMemberForm
            ? "Geef hier aan of deze deelnemer twee keer per jaar een mailing wil ontvangen van Challenge the Cyber"
            : "Geef hier aan of je twee keer per jaar een mailing wilt ontvangen van Challenge the Cyber"
        }
      />
      {!isMemberForm && (
        <Toggle
          onChange={(value: boolean) => setValue("privacyStatement", value)}
          value={watch("privacyStatement") || false}
          mainText="Ik ga akkoord met de privacyverklaring"
          subText={
            <span>
              Geef hier aan of je akkoord gaat met de{" "}
              <a
                className="underline"
                href="/privacy-statement"
                target="_blank"
              >
                privacyverklaring
              </a>{" "}
              van Challenge the Cyber
            </span>
          }
          error={errors?.privacyStatement}
        />
      )}
    </form>
  )
}

export default IndividualEnrollmentForm
