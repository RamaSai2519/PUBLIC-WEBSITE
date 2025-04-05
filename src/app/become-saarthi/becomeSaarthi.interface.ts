export type BecomeSaarthiTypes = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | null;
  skillArea?: '',
  languages?: string[],
  numberOfHours?: string
};
