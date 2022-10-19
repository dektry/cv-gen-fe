export interface ITechnology {
  id: string;
  name: string;
}

export interface ITechnologiesState {
  technologiesList: ITechnology[] | [];
  technologiesNames: string[] | [];
  isLoading: boolean;
}
