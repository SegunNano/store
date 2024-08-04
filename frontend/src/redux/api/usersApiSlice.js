import { apiSlice } from './apiSlice';
import { USERS_URL } from '../constants';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        profile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),

        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/admin`
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),

        deleteUsers: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/admin/${userId}`,
                method: "DELETE"
            }),
        }),

        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/admin/${userId}`,
                method: "DELETE"
            }),
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/admin/${data.userId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['User'],
        })
    })
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUsersMutation, useGetUserDetailsQuery, useUpdateUserMutation } = userApiSlice;