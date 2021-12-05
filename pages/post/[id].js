//serverside rendering

import {useRouter} from 'next/router';
import {API,withSSRContext} from 'aws-amplify';
import styled from 'styled-components';
import Comment from '../../src/components/Comment'
import Head from 'next/head'

const Container = styled.div`
  padding-top:70px;
  padding-bottom:55px;
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


export default function Post({title,content,date}){
	const router = useRouter();
	const {id:postId} = router.query;
	
  return(
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Container>
				<h1 className="title">{title}</h1>
				<div className="post">
					<div className="post__content" dangerouslySetInnerHTML={{__html:content}}></div>
				</div>
				<Comment postId={postId}></Comment>
			</Container>
		</>
  )
}

export async function getStaticPaths(){
	return{
		paths:[],
		fallback:'blocking',
	}
}

export async function getStaticProps({req,params}){ // context: params,요청,응답 query 
	const {API} = withSSRContext({ req })
	const postId = params.id;
	const {title,content,date} = await API.get('blognextapi',`/blog/post/${postId}`)
	return{
		props:{
			title,
			content,
			date
		}
	}
}