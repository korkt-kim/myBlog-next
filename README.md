### create-next-app
- crete-next-app으로 설치하면
  1. 컴파일과 번들링이 자동으로 된다(webpack과 babel)
  2. 자동 리프레쉬 기능으로 수정하면 화면에 바로 반영된다.
  3. 서버사이드 렌더링 지원된다.
  4. 스태틱 파일 지원된다. 

### _app.js
- 페이지 전환시 레이아웃을 유지할 수 있다.
- 페이지 전환시 상태값을 유지할 수 있다.
- componentDidCatch를 이용해서 커스텀 에러 핸들링을 할수 있다.
- 추가적인 데이터를 페이지로 주입시켜주는게 가능하다
- 글로벌 CSS를 이곳에 선언한다.
- Component: 현재 페이지, pageProps: data fetching method를 통해 미리 가져온 초기 객체. 이 메서드를 사용하지 않는다면 빈 객체가 전달됨

 
### _document.js
- next에서 제공하는 document를 customize할 수 있다.
- 서버에서만 렌더링됨. onClick과 같은 이벤트 작동X