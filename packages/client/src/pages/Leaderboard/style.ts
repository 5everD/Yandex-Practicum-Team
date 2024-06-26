import styled from 'styled-components'

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 50%;
`

export const StyledTitle = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  color: ${props => props.theme.color};
`

export const StyledTh = styled.div`
  padding: 16px;
  border-bottom: 1px solid #d5d5d5;
  font-weight: 700;
  color: ${props => props.theme.color};
`

export const StyledTd = styled.div`
  padding: 8px;
  border-bottom: 1px solid #d5d5d5;
  color: ${props => props.theme.color};
`

export const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  color: ${props => props.theme.color}
  text-align: center;
`
