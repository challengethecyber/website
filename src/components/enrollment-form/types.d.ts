export type IIndividualEnrollmentInput = {
  name: {
    firstName: string
    lastName: string
  }
  emailAddress: string
  birthYear: number
  gender: "Man" | "Vrouw" | "Anders"
  educationalInstitution: string
  isCaptain?: boolean
  bootcamp: boolean
  newsletter: boolean
  privacyStatement?: boolean
}

export type ITeamEnrollmentInput = {
  teamName: string
  members: IIndividualEnrollmentInput[]
  privacyStatement: boolean
}
