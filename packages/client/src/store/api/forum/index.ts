import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TTopic } from './types'
import { API_URL } from '@/store/api/config'

export const forumApi = createApi({
  reducerPath: 'forumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ['Forums', 'Topics'],
  endpoints: builder => ({
    getTopics: builder.query<TTopic[], void>({
      query: () => 'topics',
      providesTags: result =>
        result
          ? [
              ...result!.map(
                ({ index }) => ({ type: 'Topics', index } as const)
              ),
              { type: 'Topics', id: 'LIST' },
            ]
          : [{ type: 'Topics', id: 'LIST' }],
    }),
    createTopic: builder.mutation({
      query(body) {
        return {
          url: `topics`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Topics', id: 'LIST' }],
    }),
    addComment: builder.mutation({
      query({ id, ...body }) {
        return {
          url: `comments/${id}`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Topics', id: 'LIST' }],
    }),
  }),
})

export const {
  useCreateTopicMutation,
  useGetTopicsQuery,
  useAddCommentMutation,
} = forumApi
