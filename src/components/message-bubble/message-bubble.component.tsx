import React, { useMemo } from "react"
import styled from "styled-components"
import { format } from "../util/formatting"
import { MessageLoading } from "../message-loading/message-loading.component"

const Container = styled.div`
    position: relative;
`

const Bubble = styled.div<{ isAssistant: boolean }>`
    padding: 24px;
    padding-right: 24px;
    background-color: ${p => p.isAssistant ? '#E6F7FF' : '#F0F0F0'};
    border-radius: 8px;
    margin-left: ${p => p.isAssistant ? 32 : 0}px;
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 4px;
`

const RetryButton = styled.div`
    cursor: pointer;
    font-size: 18px;
`

interface MessageBubbleProps {
    message: string
    role: 'user' | 'assistant' | 'system'
    isPartial?: boolean
    isLast?: boolean
    onStopClicked?: () => void
    onRetryClicked?: () => void
}

export const MessageBubble = ({ message, role, isPartial, isLast, onStopClicked, onRetryClicked }: MessageBubbleProps) => {
    const isAssistant = role === "assistant"
    const messageHasContent = useMemo(() => message.trim() !== '', [message])

    return (
        <Container>
            <Bubble isAssistant={isAssistant}>
                {isAssistant && !messageHasContent ? <MessageLoading /> : format(message)}
            </Bubble>
            {isAssistant && !isPartial && messageHasContent && isLast && (
                <ButtonsContainer>
                    <RetryButton onClick={onRetryClicked}>🔄</RetryButton>
                </ButtonsContainer>
            )}
        </Container>
    )
}
