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
      .comment__list__header__func{
        margin-left:2rem;
        cursor:pointer;
        color:grey;
        &:hover{
          color:black;
          text-decoration:underline;
        }
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
  const [refresh,setRefresh] = useState(0);
  const [comments,setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const placeholder = useMemo(() => user ? '' : `Please login to comment`, [user])
  
  const showCommentFunc = (commentUserSub)=>{
    return commentUserSub==user?.attributes?.sub
  }
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
      await API.post('blognextapi','/blog/comment',request);
      setRefresh(refresh+1)
    }catch(e){
      console.error(e);
      alert(e.message);
    } 
  }

  const deleteComment = async (commentId) =>{
    const request = {
      headers:{
        "Authorization": `Bearer ${user?.signInUserSession?.idToken?.jwtToken}`
      }
    };
    try{
      await API.del('blognextapi',`/blog/comment?id=${commentId}`,request);
      setRefresh(refresh+1)
    }catch(e){
      console.error(e);
      alert(e.message);
    }
  }

  useEffect(()=>{
    setCommentInput('');
    fetchComments();
  },[refresh])

  return(
    <Container>
      <div className="comment__title">Comment</div>
      {comments.map((comment,index)=>
        (<div className="comment__list"  key={comment.id}>
          <div className="comment__list__header"><span className="comment__list__header__user">{comment.userName}</span>
            <span className="comment__list__header__date">{new Date(comment.updatedAt).toLocaleString()}</span>
            {showCommentFunc(comment.userSub) && <span className="comment__list__header__func" onClick={()=>deleteComment(comment.id)}>
              <small>Del</small>
            </span>}
          </div>
          <div className="comment__list__content">{comment.comment}</div>
        </div>)
      )}
        
      <textarea className="comment-input" onChange={(e)=>setCommentInput(e.target.value)} value={commentInput} placeholder={placeholder}></textarea>
      <div className="comment-register" onClick={(e)=>{
        e.preventDefault();
        registerComment(commentInput);
      }} disabled={!user}>Register</div>
    </Container>
  )
}