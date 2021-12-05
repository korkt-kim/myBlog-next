import {useMemo } from 'react';
import styled from 'styled-components';
import SimpleTable from '../../../src/components/SimpleTable';
import { useSelector } from 'react-redux';
import {API, withSSRContext} from 'aws-amplify';
import { useRouter } from 'next/router';
import {Loader} from 'semantic-ui-react'

const Container = styled.div`
  padding-top:55px;
  display:flex;
  align-items: center;
  flex-direction:column;
  .title{
    text-align=center;
  }
`

export default function PostList({posts,totalCount}){
  const router = useRouter();
  const {categories} = useSelector((state=>state.blog))
  const {id:categoryId,page:currentPage} = router.query;
  const title = useMemo(()=>categories.find(category=>category.id==categoryId)?.name,[categories,categoryId]);
  
  if(router.isFallback){ // direct 접근시 로딩이 필요한데 이때 보여줄 페이지 설정
    return(
      <Container>
        <div style={{padding:"300px 0"}}>
          <Loader inline="centered" active>Loading</Loader>
        </div>
      </Container>
    )
  }

  const routeNewPage = (page) =>{
    router.push({
      pathname:`/category/${categoryId}/${page}`,
    })
  }

  const routePostDetail = (postId) =>{
    router.push({
      pathname:`/post/${postId}`,
      query:{categoryId}
    },`/post/${postId}`)
  }

  return(
    <Container>
      <h1 className="title">{title}</h1>
      <SimpleTable 
        items={posts}
        totalCount={totalCount}
        currentPage={currentPage}
        onClickPagination={routeNewPage}
        onClickItem={routePostDetail}/>
      
    </Container>
  )
}

export async function getStaticPaths({req}){
  const {API} = withSSRContext({req});
  const categories = await API.get('blognextapi','/blog/category')
  return{
    paths:categories.reduce((acc,category)=>{
      acc.push({params:{id:category.id,page:'1'}})
      for(let i = 2 ; i<=Math.ceil(Number(category.entriesInLogin)/5);i++ ){
        acc.push({params:{id:category.id,page:i.toString()}})
      }
      return acc;
    },[]),
    fallback:true,  // fallback이 false면 없는 페이지 대응 X. true면 없는 페이지에 대해서는 첫동작은 serverside rendering처럼 작동한다. 하지만 캐싱하여 뒤부터는 빠르다.
  }
}

export async function getStaticProps({req,params}){
  const {API} = withSSRContext({ req })
  const {id:categoryId,page} = params;
  const {posts,totalCount} = await API.get('blognextapi',`/blog/post?categoryId=${categoryId}&page=${page}`);
  return{
    props:{
      posts,
      totalCount,
    }
  }
}
  