import styled from 'styled-components';
import {useEffect,useRef} from 'react';
import styles from '../../styles/Section.module.css';
const Container = styled.div`
  height:100vh;
  width:100%;
  background-size:cover;
  background-position:center;
  background-image:${props=>`url("/images/${props.bgImage}")`};
  z-index:-1;
  visibility:hidden;
  .section__content{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    height:100%;
    width:100%;
    .section__content__text-group{
      padding-top:15vh;
      text-align:center;
      font-size:35px;
      color:black;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen';
    }
    .section__content__button-group{
      margin-bottom:100px;
    }
  }
`
const Button = styled.button`
  background-color: black;
  border: none;
  color: white;
  padding: 1.2rem 4rem;
  margin:10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  min-width:64px;
  cursor:pointer;
  border-radius:40px;
  :hover{
    transition: background-color 0.2s;
    background-color: rgb(70,70,70);
  }
  :active{
    transition: background-color 0.1s;
    background-color: rgb(120,120,120) !important;
  }
`
export default function Section({title,description,backgroundImage,btnText}){
  const containerRef = useRef();
  useEffect(()=>{
    const intersectionObserver = new IntersectionObserver((entries,observer)=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting) return;
        entry.target.classList.add(styles['content-animation']);
        entry.target.style.visibility = 'visible';
        observer.unobserve(entry.target);
      })
    },{
      root:null,
      threshold:0.07
    })
    intersectionObserver.observe(containerRef.current)
  },[])
  return(
    <Container bgImage={backgroundImage} ref={containerRef}>
      <div className="section__content">
        <div className="section__content__text-group">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="section__content__button-group">
          <Button >{btnText}</Button>
        </div>
      </div>
    </Container>
  )
}
