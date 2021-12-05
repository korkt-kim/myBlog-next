import { useMemo, useState } from 'react';
import styled from 'styled-components';

const PAGE_SIZE=5;
const Container = styled.div`
  width:50%;
  display:flex;
  flex-direction: column;
`
const Table = styled.div`
  .table__summary{
  border-bottom:1px solid grey;
  padding:2rem 0;
  cursor: pointer;
  .table__summary__header{
    display:flex;
    justify-content: space-between;
    align-items: baseline;
    padding:0.5rem;
  }
}
`
const Pagination = styled.div`
  align-self:center;
  margin-top:1rem;
  span {
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #ccc;
    margin: 0 4px;
    border-radius: 4px;
    cursor: pointer;
    &.current-page {
      background-color: #333;
      color: #fff;
    }
    &.prev-page::before {
      content: '◀️'
    }
    &.next-page::before {
      content: '▶️'
    }
  } 
`
export default function SimpleTable({items=[],totalCount,currentPage,onClickPagination,onClickItem}){
  const lastPaginationIndex = useMemo(()=>{
    const limit = Math.floor((totalCount-1)/PAGE_SIZE)+1;
    return Math.min(limit,(Math.floor((currentPage-1)/PAGE_SIZE))*PAGE_SIZE+PAGE_SIZE);
  },[currentPage,totalCount])
  const showNextButton = useMemo(()=>lastPaginationIndex < Math.floor((totalCount-1)/PAGE_SIZE)+1,[lastPaginationIndex,totalCount]);
  const firstPaginationIndex = useMemo(()=>Math.floor((currentPage-1)/PAGE_SIZE)*PAGE_SIZE+1,[currentPage])
  const showPrevButton = useMemo(()=>firstPaginationIndex!==1,[firstPaginationIndex]);
  
  return(
    <Container>
      <Table>
        {items.map(item=>
          (<div key={item.id} className="table__summary" onClick={()=>onClickItem(item.id)}>
            <div className="table__summary__header">
              <h3>{item.title}</h3>
              <small>{item.date}</small>
            </div>
          </div>)
        )}
      </Table>
      {currentPage && <Pagination>
        {showPrevButton && <span  className="prev-page" onClick={()=>onClickPagination((Math.floor(this.currentPage/PAGE_SIZE)-1)*PAGE_SIZE+1)}></span>}
        {new Array(lastPaginationIndex-firstPaginationIndex+1).fill(0).map((_,index)=>{
          return<span key={index} onClick={()=>onClickPagination(firstPaginationIndex+index)} className={currentPage%5===index+1 ? `current-page`:``}>{firstPaginationIndex+index}</span>
        })}
        {showNextButton && <span className="next-page" onClick={()=>onClickPagination(Math.floor(this.currentPage/PAGE_SIZE)*PAGE_SIZE+1)}></span>}
      </Pagination>}
    </Container>
  )
}
