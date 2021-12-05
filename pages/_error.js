import styled from 'styled-components'

const Container = styled.p`
  padding:200px 0;
  text-align: center;
  font-size: 1.5rem;
`
//customizing 500 eror page
 function Error({
  statusCode
}){
  return(<Container>
    {statusCode
      ? `An Error ${statusCode} occurred on server`:
      `An error occurred on client`
    }
  </Container>)

}

Error.getInitialProps = ({res,err})=>{ // serverside rendering을 가능하게 한다.
  const statusCode = res ? res.statusCode : err ? err.statusCode: 404;
  return {statusCode};
}

export default Error;