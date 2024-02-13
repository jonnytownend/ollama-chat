import React, { useCallback, useEffect, useMemo, useRef, useState, useContext } from "react"
import styled from 'styled-components'
import { MessageBubble } from "../message-bubble/message-bubble.component"
import { UserMessageInput } from "../user-message-input/user-message-input.component"
import { ChatOptions } from "../chat-options/chat-options"
import { Message, postChat } from "../../api/ollama-api"
import { ErrorContext, ResetContext } from "../../App"

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 32px;
`

const MessagesContainer = styled.div`

`

const EmptyState = styled.div`
    color: grey;
`

const MessageContainer = styled.div`
    margin-bottom: 16px;
`

const Spacer = styled.div`
    height: 100px;
`

const UserMessageContainer = styled.div`
    position: fixed;
    padding: 24px;
    padding-bottom: 32px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    background-color: white;
    // box-shadow: 0px -2px 2px rgba(50, 50, 50, 0.2);
`

interface ChatProps {
    model: string
}

let stopFlag = false

const USER_MESSAGE_PADDING = 32

export const Chat = ({ model }: ChatProps) => {
    const { setError } = useContext(ErrorContext)
    const resetTime = useContext(ResetContext)
    const [messages, setMessages] = useState<Message[]>([])
    const [useJsonMode, setUseJsonMode] = useState(false)
    const [userMessageMaxWidth, setUserMessageMaxWidth] = useState(window.innerWidth - (2 * USER_MESSAGE_PADDING))

    useEffect(() => {
        setMessages([])
    }, [resetTime, setMessages])

    useEffect(() => {
        window.scrollTo(0, 1000)
    }, [messages])

    useEffect(() => {
        const listener = () => {
            setUserMessageMaxWidth(window.innerWidth - (2 * USER_MESSAGE_PADDING))
        }
        window.addEventListener('resize', listener)
        return () => window.removeEventListener('resize', listener)
    }, [setUserMessageMaxWidth])

    const postMessages = useCallback((messages: Message[]) => {
        stopFlag = false
        const run = async () => {
            setMessages([...messages, { role: 'assistant', content: '' }])

            var shouldStop = false
            try {
                await postChat(model, messages, ((messageContent, isFinished) => {
                    if (shouldStop) {
                        return false
                    }

                    const isPartial = !stopFlag && !isFinished
                    setMessages([...messages, { role: 'assistant', content: messageContent, isPartial: isPartial }])
                    shouldStop = stopFlag
                    return !shouldStop
                }), { jsonMode: useJsonMode })
            } catch {
                setError(true)
            }
        }
        run()
    }, [setMessages, model, useJsonMode, setError])

    const onMessageSubmitted = useCallback((newMessage: string) => {
        const newMessages: Message[] = [...messages, { role: 'user', content: newMessage }]
        setMessages(newMessages)
        postMessages(newMessages)
    }, [model, messages, setMessages, postMessages])

    const onMessageStopped = useCallback(() => {
        stopFlag = true
    }, [messages, setMessages])

    const onRetryLastMessage = useCallback(() => {
        const previousMessages = messages.slice(0, messages.length - 1)
        setMessages(previousMessages)
        postMessages(previousMessages)
    }, [messages, setMessages])

    const onJsonCheckboxPressed = useCallback(() => {
        setUseJsonMode(!useJsonMode)
    }, [useJsonMode, setUseJsonMode])

    const isStreaming = useMemo(() => {
        if (messages.length == 0) {
            return false
        }

        return messages[messages.length - 1].isPartial ?? false
    }, [messages])

    return (
        <>
            <Container>
                <MessagesContainer>
                    {messages.length == 0 && (
                        <EmptyState>Send a message to start.</EmptyState>
                    )}
                    {messages.map((message, index) => (
                        <MessageContainer>
                            <div>
                                <MessageBubble
                                    message={message.content}
                                    role={message.role}
                                    isPartial={message.isPartial}
                                    isLast={index == messages.length - 1}
                                    onRetryClicked={onRetryLastMessage}
                                />
                            </div>
                        </MessageContainer>
                    ))}
                </MessagesContainer>
                <Spacer />
            </Container>
            <UserMessageContainer style={{ maxWidth: userMessageMaxWidth }}>
                <UserMessageInput
                    onMessageSubmit={onMessageSubmitted}
                    onMessageStop={onMessageStopped}
                    showStop={isStreaming}
                />
                <ChatOptions onJsonCheckboxPressed={onJsonCheckboxPressed} jsonModeEnabled={useJsonMode} />
            </UserMessageContainer>
        </>
    )
}


