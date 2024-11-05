import { METHOD, tagTypes } from "@/redux/api/tagTypesList";

import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/signin",
                method: METHOD.POST,
                body: { email: userInfo.email, password: userInfo.password, token: userInfo.token },
                // headers: { authorization: userInfo.token },
            }),
        }),
        getCaptchaValidation: builder.query({
            query: () => ({
                url: `/auth/captcha-validation`,
                method: METHOD.GET,
            }),
            providesTags: [tagTypes.user],
        }),
    }),
});

export const { useLoginMutation, useGetCaptchaValidationQuery } = authApi;
