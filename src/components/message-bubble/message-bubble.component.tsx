import React from "react"
import styled from "styled-components"

const Container = styled.div`
    padding: 16px;
    background-color: lightblue;
    border-radius: 8px;
`


interface MessageBubbleProps {
    message: string
}

export const MessageBubble = ({ message }: MessageBubbleProps) => (
    <Container>{message}</Container>
)
