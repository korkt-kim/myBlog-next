import styled from 'styled-components';
const Container = styled.section` 
	position:fixed;
	bottom:0;
	color:white;
	padding:0.4rem;
	background:black;
	width:100%;
	font-size:1rem;
	@media (max-width:768px){
		font-size:0.5rem;
	}
`
export default function Footer(){
	return(
		<Container>
			<span >
				&copy; { new Date().getFullYear() } - PolZ(Kim Kyungtae). All rights
				reserved
			</span>
		</Container>
	)
}
