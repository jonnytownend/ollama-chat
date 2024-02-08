import React, { useCallback, useState } from "react"
import styled from 'styled-components'
import { MessageBubble } from "../message-bubble/message-bubble.component"
import { UserMessageInput } from "../user-message-input/user-message-input.component"

const Container = styled.div`
    height: 95%;
    margin: 32px;
    display: flex;
    flex-direction: column;
`

const MessagesContainer = styled.div`

`

const MessageContainer = styled.div`
    margin-bottom: 8px;
`

const UserMessageContainer = styled.div`
    position: absolute;
    bottom: 32px;
    min-width: 700px;
`

export const Chat = () => {
    const [messages, setMessages] = useState<string[]>([])

    const onMessageSubmitted = useCallback((newMessage: string) => {
        setMessages([...messages, newMessage])
    }, [messages, setMessages])

    return (
        <Container>
            <MessagesContainer>
                {messages.map(message => (
                    <MessageContainer>
                        <MessageBubble message={message} />
                    </MessageContainer>
                ))}
            </MessagesContainer>
            <UserMessageContainer>
                <UserMessageInput onMessageSubmit={onMessageSubmitted} />
            </UserMessageContainer>
        </Container>
    )
}
