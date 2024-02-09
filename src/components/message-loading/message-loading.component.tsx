import styled, { keyframes } from "styled-components"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 12px;
    width: 24px;
`

const bounceAnimation = keyframes`
    0% { transform: translateY(0px); }
    25% { transform: translateY(-3px); }
    50% { transform: translateY(0px); }
`

const Circle = styled.div<{ delay: number }>`
    border-radius: 100%;
    height: 6px;
    width: 6px;
    background-color: black;
    animation-name: ${bounceAnimation};
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-delay: ${p => p.delay}s;
`

export const MessageLoading = () => (
    <Container>
        <Circle delay={0} />
        <Circle delay={0.1} />
        <Circle delay={0.2} />
    </Container>
)