import React from "react";
import styled from "styled-components";

const Button = () => {
    return(
        <StyledDiv>
            <h3>스타일드 컴포넌트</h3>
        </StyledDiv>
    )
}


const StyledDiv = styled.div`
	width: 100px;
    height: 50px;
    background-color: yellow;
    position: static;
`;


export default Button;