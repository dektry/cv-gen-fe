export interface IPagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export interface IFilter {
  nameFilter: string;
}

export interface ITableExtension extends IPagination, IFilter {}
