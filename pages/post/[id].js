import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import {API} from 'aws-amplify';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';

const Container = styled.div`
  padding-top:55px;
  display:flex;
  align-items: center;
  flex-direction:column;
  .title{
    padding-bottom:1rem;
		font-size:2rem !important;
		margin-bottom:2rem;
    text-align:center;
  }
  .post{
		padding:1.5rem;
		background-color:whitesmoke;	
    align-self:center;
		width:70%;
		@media (max-width:768px) {
			width:100%;
		}
		
		.post__content{
			overflow-x:auto;
      
			h3{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 5rem;
				margin-bottom: 2rem;
				padding: 0.5em 0;
				letter-spacing: -.02rem;
				line-height: 2.625rem;
				font-size: 1.5rem;
				font-weight: 600;
				color: #2e2e2e;
				&::before{
					content: "";
					text-align: left;
					-webkit-box-flex: 1;
					-ms-flex-positive: 1;
					flex-grow: 1;
					margin-right: 0.5rem;
					border-bottom: 1px solid lightgrey;
				}
				&::after{
					content: "";
					text-align: right;
					-webkit-box-flex: 1;
					-ms-flex-positive: 1;
					flex-grow: 1;
					margin-left: 0.5rem;
					border-bottom: 1px solid lightgrey;
				}
			}
			img{
				height: auto;
        max-width: 100%;
			}
			pre{
				background: rgb(238,238,238);
				border: 1px solid #ddd;
				border-left: 3px solid #f36d33;
				color: #666;
				page-break-inside: avoid;
				font-family: monospace;
				font-size: 1rem;
				line-height: 1.6;
				margin-bottom: 1.6em;
				max-width: 100%;
				overflow: auto;
				padding: 1em 1.5em;
				display: block;
				word-wrap: break-word;
			}
		}	
	}
`


export default function Post(){
  const router = useRouter();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [date,setDate] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  const {id:postId} = router.query
  
  const fetchPostDetail = async (postId) =>{
    setIsLoading(true)
    const {title,content,categoryId,date} = await API.get('blognextapi',`/blog/post/${postId}`)
    setTitle(title);
    setContent(content);
    setDate(date);
    setIsLoading(false)
  }

  useEffect(()=>{
    if(!router.query.id) return;
    fetchPostDetail(postId);
  },[router.query.id])
  return(
    <>
      {isLoading ? (
        <div style={{padding:"300px 0"}}>
          <Loader inline="centered" active>Loading</Loader>
        </div>):
        (
          <Container>
            <h1 className="title">{title}</h1>
            <div className="post">
              <div className="post__content" dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
          </Container>
        )
      }
    </>
    
  )
}