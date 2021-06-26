import styled from 'styled-components';

const TitleContainer = styled.div`
    display: flex;
    flex-direction: center;
    transform: translate3d(-50%, ${props => props.translateY}, 0);

    font-family: 'Montserrat';
    font-weight: 600;
    color: white;
    white-space: nowrap;

    font-size: 30px;
    padding-left: 8px;
    
`;

export default TitleContainer;