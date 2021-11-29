import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Container = styled.ul`
  z-index:100;
  overflow-x:hidden;
  overflow-y:auto;
  top:0;
  bottom:0;
  right:0;
  background:black;
  position:fixed;
  width:20rem;
  color:white;
  list-style:none;
  padding:0 1rem;
  font-size:1.1rem;
  transform: ${props=>props.show ? "translateX(0)":"translateX(100%)"};
  transition: transform 0.8s ease-in;
`
const Item = styled.li`
  cursor:pointer;
  :hover{
    background:rgb(70,70,70);
  }
  padding: 1rem 5rem 1rem 1rem;
  background:${props=>props.isActive ? 'rgb(70,70,70)' : 'transparent'};
`
const CloseIcon = styled(Icon)`
  cursor:pointer;
  width:100% !important;
  padding:1rem 0.5rem 2rem 0;
  font-size:1.7rem !important;
  text-align:right !important;
`
export default function Nav({categories,onClickClose,show}){
  const router = useRouter();
 
  const isActive = (id) => {
    switch(router.pathname){
      case '/post/[id]':
        return id == router.query.categoryId
      case '/category/[id]':
        return id==router.query.id
      default:
        return false;
    }
  }
  return(
    <Container show={show}>
      <CloseIcon onClick={onClickClose} name="close"></CloseIcon>
      {categories.map(category=>
        (<Link
          key={category.id}
          href={{
            pathname:`/category/${category.id}`,
            query:{'page':'1'},
          }}
          passHref
        > 
          <Item isActive={isActive(category.id)}>
            <a>{category.name}</a>
          </Item>
        </Link>)
      )}
    </Container>
  )
}
