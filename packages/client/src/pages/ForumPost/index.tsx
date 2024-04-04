import React from 'react'
import {
  StyledWrapper,
  Container,
  StyledPost,
  Title,
  Text,
  StyledComment,
  StyledUser,
  StyledTime,
} from '@/pages/ForumPost/style'
import { useParams } from 'react-router-dom'
import { useAddCommentMutation, useGetTopicsQuery } from '@/store/api/forum'
import { StyledText } from '@/pages/Forum/style'
import Button from '@/components/Button'
import { RootState, useAppSelector } from '@/store/store'

export const ForumPostPage = () => {
  const selectUser = (state: RootState) => state.userState.user
  const selectUserId = (state: RootState) => selectUser(state)?.id
  const userId = useAppSelector(state => selectUserId(state))

  const { forumId } = useParams<{ forumId?: string }>()
  const defaultId = Number(forumId) || 1

  const { data: topicsData } = useGetTopicsQuery()

  const data = topicsData?.find(f => f.index === defaultId)
  const [addComment] = useAddCommentMutation()

  const formatDate = (date: string) => {
    return (date ? new Date(date) : new Date()).toLocaleString('ru-RU')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { topicDescription } = e.target as typeof e.target & {
      topicDescription: { value: string }
    }
    addComment({
      id: data?.index,
      message: topicDescription.value,
      authorIndex: userId,
    })
    // e.target as HTMLFormElement.reset()
  }

  return (
    <StyledWrapper>
      <Container>
        <StyledPost>
          <StyledUser>
            <img src="/avatar.png" width="50" />
            <p>{data?.author}</p>
          </StyledUser>
          <Title>{data?.title}</Title>
          <Text>{data?.description}</Text>
        </StyledPost>
        {data?.Comments?.map(comment => (
          <StyledComment>
            <StyledUser>
              <img src="/avatar.png" width="50" />
              <p>{comment.author ?? 'Неизвестный пользователь'}</p>
            </StyledUser>
            <p>{comment.message}</p>
            <StyledTime>{formatDate(comment.createdAt)}</StyledTime>
          </StyledComment>
        ))}
        <StyledComment>
          <form onSubmit={handleSubmit}>
            <StyledText
              name="topicDescription"
              placeholder="Новый комментарий..."
            />
            <Button type="submit" $primary={true}>
              Отправить
            </Button>
          </form>
        </StyledComment>
      </Container>
    </StyledWrapper>
  )
}
