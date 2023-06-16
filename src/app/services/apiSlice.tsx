import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import React from 'react';
export const apiSlice:any =createApi({
    reducerPath : 'apiSlice',
    tagTypes : ['Todos'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: builder =>({
        getTodos: builder.query({
            query : () => 'todos',
            providesTags: ['Todos']
        }),
        putTodos: builder.mutation({
            query: (data) =>({
                url: 'todos',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Todos']
        }),
        update: builder.mutation({
            query:({id,body}) =>({
                url: `todo/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodos: builder.mutation({
            query: id =>({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        })
    }),


})
export const{useGetTodosQuery,usePutTodosMutation,useUpdateMutation,useDeleteTodosMutation} = apiSlice;