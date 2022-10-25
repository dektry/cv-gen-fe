export interface IEducation {
  id?: string;
  university: string;
  specialization: string;
  startYear: number;
  endYear: number;
  employeeId?: string;
}

export interface IEducationState {
  educationIsLoading: boolean;
  education: IEducation[] | [];
}
