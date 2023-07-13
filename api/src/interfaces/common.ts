import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IBloodGroup = 'O+' | 'O-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'A+' | 'A-'