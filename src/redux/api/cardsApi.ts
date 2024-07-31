import {
  createApi,
  EndpointBuilder,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { VehicleDetails, VehiclesResponse } from '../../shared/types/types';

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>) => ({
    getCards: builder.query<
      VehiclesResponse<VehicleDetails>,
      { search?: string; page?: number }
    >({
      query: ({ search = '', page = 1 }) =>
        `vehicles/?search=${search}&page=${page}`,
    }),
    getCardDetails: builder.query<VehiclesResponse<VehicleDetails>, string>({
      query: (id) => `vehicles/${id}/`,
    }),
  }),
});

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
type TagTypes = never;
type ReducerPath = 'cardsApi';

export const { useGetCardsQuery, useGetCardDetailsQuery, util: { getRunningQueriesThunk }, } = cardsApi;
export const { getCards, getCardDetails } = cardsApi.endpoints;
