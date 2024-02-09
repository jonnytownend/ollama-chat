import React, { useCallback, useEffect, useMemo, useState } from "react"
import Markdown from "react-markdown"
import styled from "styled-components"
import { format } from "../util/formatting"
import { MessageLoading } from "../message-loading/message-loading.component"
import { CopyButton } from "../copy-button/copy-button.component"

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

const ActionButton = styled.div`
    position: relative;
    cursor: pointer;
    font-size: 20px;
    margin-left: 8px;
`

const TickButtonContainer = styled.div<{ show: boolean }>`
    position: absolute;
    top: 0;
    opacity: ${p => p.show ? 1 : 0};
    transition: opacity 0.5s;
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
                    <CopyButton copyText={message} />
                    <ActionButton onClick={onRetryClicked}>🔄</ActionButton>
                </ButtonsContainer>
            )}
        </Container>
    )
}
