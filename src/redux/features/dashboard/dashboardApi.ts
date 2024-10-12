import { METHOD, tagTypes } from "@/redux/api/tagTypesList";

import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        setAiConfig: builder.mutation({
            query: (userInfo) => ({
                url: "/ai-config",
                method: METHOD.POST,
                body: userInfo,
            }),
            invalidatesTags: [tagTypes.aiConfig],
        }),
        getAiConfig: builder.query({
            query: () => ({
                url: `/ai-config`,
                method: METHOD.GET,
            }),
            providesTags: [tagTypes.aiConfig],
        }),
        setStatus: builder.mutation({
            query: (userInfo) => ({
                url: "/info",
                method: METHOD.POST,
                body: userInfo,
            }),
            invalidatesTags: [tagTypes.info],
        }),
        getStatus: builder.query({
            query: () => ({
                url: `/info`,
                method: METHOD.GET,
            }),
            providesTags: [tagTypes.info],
        }),
        deleteStatus: builder.mutation({
            query: () => ({
                url: `/info`,
                method: METHOD.DELETE,
            }),
            invalidatesTags: [tagTypes.info],
        }),
        increaseUntruthful: builder.mutation({
            query: () => ({
                url: "/ai-config/increase-untruthful-count",
                method: METHOD.POST,
                body: "",
            }),
            invalidatesTags: [tagTypes.aiConfig],
        }),
    }),
});

export const {
    useGetStatusQuery,
    useDeleteStatusMutation,
    useSetStatusMutation,
    useGetAiConfigQuery,
    useSetAiConfigMutation,
    useIncreaseUntruthfulMutation,
} = dashboardApi;
