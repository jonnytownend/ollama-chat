import React, { useCallback, useEffect, useMemo, useState } from "react"
import Markdown from "react-markdown"
import styled from "styled-components"
import { format } from "../util/formatting"
import { MessageLoading } from "../message-loading/message-loading.component"
import { CopyButton } from "../copy-button/copy-button.component"

const Container = styled.div<{ isAssistant: boolean }>`
    position: relative;
    margin-left: ${p => p.isAssistant ? 32 : 0}px;
`

const Bubble = styled.div<{ isAssistant: boolean }>`
    padding: 24px;
    padding-right: 24px;
    background-color: ${p => p.isAssistant ? '#E6F7FF' : '#F0F0F0'};
    border-radius: 8px;
`

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 4px;
`

const MessageContainer = styled.div`
    font-size: 12px;
    color: grey;
`

const ButtonsContainer = styled.div`
    display: flex;
`

const ActionButton = styled.div`
    position: relative;
    cursor: pointer;
    font-size: 20px;
    margin-left: 8px;
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
    const [showWaitingMessage, setShowWaitingMessage] = useState(false)
    const [showMarkdown, setShowMarkdown] = useState(true)
    const isAssistant = role === "assistant"
    const messageHasContent = useMemo(() => message.trim() !== '', [message])

    useEffect(() => {
        if (messageHasContent) {
            setShowWaitingMessage(false)
            return
        }

        const timeout = setTimeout(() => {
            if (messageHasContent) {
                return
            }

            setShowWaitingMessage(true)
        }, 4000)

        return () => clearTimeout(timeout)
    }, [messageHasContent, setShowWaitingMessage])

    const content = useMemo(() => {
        return showMarkdown ? format(message) : message
    }, [message, showMarkdown])

    return (
        <Container isAssistant={isAssistant}>
            <Bubble isAssistant={isAssistant}>
                {isAssistant && !messageHasContent ? <MessageLoading /> : content}
            </Bubble>
            <FooterContainer>
                {showWaitingMessage && (
                    <MessageContainer>
                        <em>
                            The model is taking longer than expected to respond.<br />
                            This can happen when you first run the model, or if your machine doesn't have enough RAM.<br />
                            If nothing happens for a while, try a different model.
                        </em>
                    </MessageContainer>
                )}
                <div />
                {isAssistant && !isPartial && messageHasContent && isLast && (
                    <ButtonsContainer>
                        <ActionButton onClick={() => setShowMarkdown(!showMarkdown)}>🖊️</ActionButton>
                        <CopyButton copyText={message} />
                        <ActionButton onClick={onRetryClicked}>🔄</ActionButton>
                    </ButtonsContainer>
                )}
            </FooterContainer>
        </Container>
    )
}
