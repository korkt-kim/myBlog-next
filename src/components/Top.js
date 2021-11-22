import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import {Icon,Button} from 'semantic-ui-react'
import { useState } from 'react'

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
  .header__header-item{
    .v-btn{
      height:2.4rem;
      min-height:24px;
    }
    .v-icon{
      font-size:2.4rem;
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

const NavIcon = styled(Icon)`
  cursor:pointer;
`

export default function Top(){
  const [user, setUser] = useState(null);

  const logout = () =>{

  }

  const toggleNav = () =>{

  }
  return(
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
          <span style={{marginRight:'1rem'}}>안녕하세요 {user.name} 님!</span>
          <Button onClick={logout}>로그아웃</Button>
        </span> : 
        <span>
          <Link href="/login" passHref><Button>로그인</Button></Link>
          <Link href="/signup" passHref><Button>회원가입</Button></Link>
        </span>
        }
        
        <span><NavIcon onClick={toggleNav} name="bars" size='big'/></span>
      </div>
    </Container>
  )
}