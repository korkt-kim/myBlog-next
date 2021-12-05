import { Icon } from "semantic-ui-react";
import styled from 'styled-components';

const Container = styled.div`
  padding: 200px 0;
  text-align: center;
  font-size: 1.5rem;
`


export default function Error404(){
  return(
    <Container>
      <Icon name="warning circle" color="red"/>
      404 : 페이지를 찾을 수 없습니다.
    </Container>
  )
}