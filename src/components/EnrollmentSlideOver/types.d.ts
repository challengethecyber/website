export type IIndividualEnrollmentInput = {
  name: {
    firstName: string
    lastName: string
  }
  emailAddress: string
  birthYear: number
  educationalInstitute: string
}

export type ITeamEnrollmentInput = {
  teamName: string
}

export type IEnrollmentInput = IIndividualEnrollmentInput | ITeamEnrollmentInput
