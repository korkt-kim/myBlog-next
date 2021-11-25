import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import {Icon} from 'semantic-ui-react'
import { useState,useEffect } from 'react'
import {API} from 'aws-amplify'
import Nav from './Nav.js';
import { useRouter } from 'next/router'

const Container = styled.div`
  position:fixed;
  padding:0 1em;
  z-index:100;
  display:flex;
  width:100%;
  min-height:4rem;
  justify-content:space-between;
  align-items:center;
  background:black;
  color:white;
  top:0;
  .header__header-item{
    .button{
      height:2.4rem;
      min-height:2rem;
      padding-left:1rem;
      padding-right:1rem;
    }
    .icon{
      line-height:1;
      vertical-align:middle !important;
      font-size:2rem !important;
    }
  }
`
const ImageWrapper = styled.div`
  height: 2rem;
  width: 5.2rem;
  transform: rotateY(360deg);
  animation: turn 5s ease-out forwards 1s infinite;
  cursor:pointer;
  @keyframes turn {
    60% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
`
const AuthMenu = styled.span`
  font-size:1rem;
  a{
    padding:1rem;
  }
`
const NavIcon = styled(Icon)`
  cursor:pointer;
`


  


export default function Top(){
  const [user, setUser] = useState(null);
  const [categories,setCategories] = useState([]);
  const [showNav,setShowNav] = useState(false);
  const router = useRouter();

  const fetchCategories = async()=>{
    const categories = await API.get('blognextapi','/blog/category');
    console.log(categories);
    setCategories(categories);
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  function logout (){
  
  }
  function toggleNav(){
    setShowNav(!showNav);
  }
  function RoutePageList(categoryId){
    console.log(categoryId)
    router.push(`/category/${categoryId}&page=1`);
  }
  
  return(
    <section>
      <Container>
        <Link href="/" passHref>
          <ImageWrapper>
            <Image 
              src="/images/polz-logo.png" 
              alt="polz"
              layout="fill"
            />
          </ImageWrapper>
        </Link>
        <div className="header__header-item">
          {user ? <span >
            <span>안녕하세요 {user.name} 님!</span>
            <span onClick={logout}>로그아웃</span>
          </span> : 
            <AuthMenu>
              <Link href="/login" passHref>로그인</Link>
              <Link  ink href="/signup" passHref>회원가입</Link>
            </AuthMenu>
          }
          <NavIcon onClick={toggleNav} name="bars" />
        </div>
      </Container>
      <Nav show={showNav} categories={categories} onClickNav={RoutePageList} onClickClose={toggleNav}></Nav>
    </section>
  )
}
