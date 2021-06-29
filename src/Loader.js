import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import styled from 'styled-components';

const ContainerPage = styled.div`
    width: 100vw;
    min-height: 100vh;
    
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #59196A;
    background-image: linear-gradient(90deg, #261757 0%, #59196A 100%);
`;

const LoadingBar = styled.div`
    border: 4px solid white;
    width: 200px;
    height: 40px;
`;

const FillLoadingBar = styled.div`
    width: ${props => `${props.progress}%`};
    height: 35px;
    background-color: white;   
    margin-top: -2px;
`;

const Loader = () => {
    const { progress, loaded } = useProgress();
    
    return (
        <Html center>
            <ContainerPage>
            <LoadingBar>
                <FillLoadingBar progress={progress} />
            </LoadingBar>
            </ContainerPage>
        </Html>
    );
}

export default Loader;