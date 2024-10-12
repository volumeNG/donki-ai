import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  emailVerified: string;
  isBlocked: boolean;
  image: string;
  isTwoFactorEnabled: string;
};

export enum UserRole {
  user = "user",
  admin = "admin",
  superAdmin = "superAdmin",
}

export type TResendToken = {
  email: string;
  token: number;
  expires: Date;
};

export interface ISearchParams {
  searchParams: { callbackUrl: string; email: string };
}

export type TGenericResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  error?: FetchBaseQueryError | SerializedError;
};
