/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableColumn<T> {
  key: string;
  cell: (row: T) => string;
  filterValue?: (row: T) => string | string[];
  title?: (row: T) => string;
  styles?: (row: T) => string;
  icon?: (row: T) => string;
}

export interface Filter {
  label: string;
  filterOptions: string[];
  key: string;
}

export interface ReportHeader {
  key: string;
  value: string;
}

export interface ReportHeaderFormat {
  key: string;
  value: string;
}

export interface HeaderColumn {
  label: string;
  colspan?: number;
  rowspan?: number;
  key?: string;
  styles?: string;
  subColumn: SubColumn[];
}

export interface TableHeaderCell {
  label: string;
  colspan?: number;
  rowspan?: number;
  key?: string;
  width?: string;
  styles?: string;
}

export type CTASummary = {
  name: string;
  message: string;
  link: string;
};

export interface SubColumn {
  label: string;
  key?: string;
}
