import React from 'react';
import { TextField } from "@material-ui/core";
import styled from 'styled-components'; //CSS-IN_JS
import ShortReport from '../component/ShortReport';
import { useLocation } from 'react-router-dom';

const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: space-around;
`;

const Spacing = styled.div`
    width: 100%;
    height: 30px;
`;

const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    padding: 0rem 2rem 2rem;
`;

export default function GatherReportPage () {
    const {state} = useLocation();
    return (
        <Wrap>
            <LeftSide>
                <img src = {state.thumbnail} alt="logo-img"/>
                <Spacing/>
                    <TextField
                        id="filled-read-only-input"
                        label="책 제목"
                        defaultValue={state.title}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="저자"
                        defaultValue={state.authors}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-read-only-input"
                        label="출판사"
                        defaultValue={state.publisher}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
            </LeftSide>
            <div>
                <ShortReport
                isbn={ state.isbn } />
            </div>
        </Wrap>
    );
}