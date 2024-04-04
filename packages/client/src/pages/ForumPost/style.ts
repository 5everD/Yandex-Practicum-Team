import styled from 'styled-components'

export const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: ${props => props.theme.backgroundColor};
  padding: 5rem 0;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`

export const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50rem;
  padding: 1.2rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 20px -1px rgba(34, 60, 80, 0.2);
  background-color: white;
  cursor: pointer;
`

export const Container = styled.div`
  display: block;
`

export const Title = styled.h2`
  width: 100%;
  font: 1.3rem 'Gill Sans';
  font-weight: 700;
`

export const Text = styled.p`
  font: 1rem 'Gill Sans';
  width: 100%;
`

export const StyledComment = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  font: 1rem 'Gill Sans';
  border-radius: 0.3rem;
  background-color: white;
  box-shadow: 0 0 20px -1px rgba(34, 60, 80, 0.2);
  margin: 1rem 0;
`

export const StyledUser = styled.p`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font: 1rem 'Gill Sans';
  font-weight: 400;
  color: cornflowerblue;
`

export const StyledTime = styled.p`
  color: #afaeae;
`
