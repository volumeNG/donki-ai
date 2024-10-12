import { config } from "@/config";
import { authKey } from "@/constants/storageKey";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getFromLocalStorage } from "@/lib/local-storage";

import { tagTypesList } from "./tagTypesList";

const baseQuery = fetchBaseQuery({
    baseUrl: config.baseApi,
    prepareHeaders: (headers) => {
        const accessToken = getFromLocalStorage(authKey);

        if (accessToken) {
            headers.set("authorization", accessToken);
        }
        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,

    endpoints: () => ({}),
    tagTypes: tagTypesList,
});
