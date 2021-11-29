import { useState,useMemo,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import styled from 'styled-components';

const Container = styled.div`
  width:70%;
  margin-top:1rem;
  
  @media (max-width:768px){
    width:100%;
    margin-top:1rem;
    padding : 0 1rem;
  }
  .comment__title{
    font-size:1.35rem;
    border-bottom:1px solid grey;
    padding-bottom:1.5rem;
  }
  .comment__list{
    padding:2rem 0;
    border-bottom: 1px solid grey;
    &:last-of-type{
      border-bottom:0;
    }
    .comment__list__header{
      padding-bottom:1rem;
      .comment__list__header__user{
        &::after{
          content:"";
          font-size:2px;
          border-right: 1px solid grey;
          padding-left: 1rem;
          margin-right:1rem;
        }
        
      }
      .comment__list__header__date{
        font-size:0.8rem;
      }
    } 
  }
  .comment-input{
    margin-top:1rem;
    border:lightgray 0.2rem solid;
    width:100%;
    overflow-y:auto;
    min-height:7rem;
    &:focus{
      border:lightgreen 0.2rem solid;
      outline: none;
    }
    
  }
  .comment-register{
    background:gainsboro;
    border-radius:20px;
    display:inline-box;
    padding:1rem;
    cursor:pointer;
    font-size:1rem;
    
  }
`

export default function Comment({postId}){
  const {user} = useSelector((state)=>state.auth);
  const [comments,setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const placeholder = useMemo(() => user ? '' : `Please login to comment`, [user])
  
  const fetchComments=async ()=>{
    const headers={
      headers:{
        "Authorization": `Bearer ${user?.signInUserSession?.idToken?.jwtToken}`
      }
    }
    const {result:{Count,Items}} = await API.get('blognextapi',`/blog/comment?postId=${postId}`,headers);
    setComments(Items);
  }

  const registerComment = async (commentInput) => {
    const request = {
      body:{
        comment:commentInput,
        postId
      },
      headers:{
        "Content-Type": "application/json; charset=utf-8",
        "Accept": "application/json",
        "Authorization": `Bearer ${user?.signInUserSession?.idToken?.jwtToken}`
      }
    };
    
    try{
      await API.post('blognextapi','/blog/comment',request)
    }catch(e){
      console.error(e);
      alert(e.message);
    } 
  }

  // const deleteComment = async () =>{
  //   await API.delete()
  // }

  useEffect(()=>{
    fetchComments();
  },[comments.join('')])

  return(
    <Container>
      <div className="comment__title">Comment</div>
      {comments.map((comment,index)=>
        (<div className="comment__list"  key={index}>
          <div className="comment__list__header"><span className="comment__list__header__user">{comment.userName}</span>
            <span className="comment__list__header__date">{new Date(comment.updatedAt).toLocaleString()}</span>
          </div>
          <div className="comment__list__content">{comment.comment}</div>
        </div>)
      )}
        
      <textarea className="comment-input" onChange={(e)=>setCommentInput(e.target.value)} placeholder={placeholder}></textarea>
      <div className="comment-register" onClick={(e)=>{
        e.preventDefault();
        registerComment(commentInput);
      }} disabled={!user}>Register</div>
    </Container>
  )
}