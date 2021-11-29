import { useEffect,useState,useMemo } from 'react';
import styled from 'styled-components';
import SimpleTable from '../../src/components/SimpleTable';
import {API} from 'aws-amplify';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';

const Container = styled.div`
  padding-top:55px;
  display:flex;
  align-items: center;
  flex-direction:column;
  .title{
    text-align=center;
  }
`

export default function PostList(){
  const router = useRouter();
  const [posts,setPosts] = useState([]);
  const [totalCount,setTotalCount] = useState(0);
  const {id:categoryId,page:currentPage} = router.query;
  const [isLoading ,setIsLoading] = useState(true);

  const fetchPostList = async (categoryId,page)=>{
    setIsLoading(true);
    const {posts,totalCount} = await API.get('blognextapi',`/blog/post?categoryId=${categoryId}&page=${page}`);
    setPosts(posts);
    setTotalCount(totalCount);
    setIsLoading(false);
  }

  useEffect(()=>{
    if(!router.query.id || !router.query.page) return; 
    fetchPostList(categoryId,currentPage); 
  },[router.query.id,router.query.page])
  
  const routeNewPage = (page) =>{
    router.push({
      pathname:`/category/${categoryId}`,
      query:{page}
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
      <h1 className="title"></h1>
      {isLoading ? (<div style={{padding:"300px 0"}}>
        <Loader inline="centered" active>Loading</Loader>
      </div>):(<SimpleTable 
        items={posts}
        totalCount={totalCount}
        currentPage={currentPage}
        onClickPagination={routeNewPage}
        onClickItem={routePostDetail}/>)}
      
    </Container>
  )
}
  