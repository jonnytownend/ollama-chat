import React, { useCallback, useEffect, useState } from "react"
import styled from 'styled-components'
import { MessageBubble } from "../message-bubble/message-bubble.component"
import { UserMessageInput } from "../user-message-input/user-message-input.component"
import { Message, postChat } from "../api/ollama-api"

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const MessagesContainer = styled.div`

`

const MessageContainer = styled.div`
    margin-bottom: 16px;
`

const Spacer = styled.div`
    flex: 1;
`

const UserMessageContainer = styled.div`

`

interface ChatProps {
    model: string
}

export const Chat = ({ model }: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([])

    const onMessageSubmitted = useCallback((newMessage: string) => {
        const newMessages: Message[] = [...messages, { role: 'user', content: newMessage }]
        setMessages(newMessages)
        const run = async () => {
            setMessages([...newMessages, { role: 'assistant', content: '' }])
            await postChat(model, newMessages, () => false, (messageContent => {
                setMessages([...newMessages, { role: 'assistant', content: messageContent }])
            }))
        }

        run()
    }, [model, messages, setMessages])

    return (
        <Container>
            <MessagesContainer>
                {messages.map(message => (
                    <MessageContainer>
                        <MessageBubble message={message.content} role={message.role} />
                    </MessageContainer>
                ))}
            </MessagesContainer>
            <Spacer />
            <UserMessageContainer>
                <UserMessageInput onMessageSubmit={onMessageSubmitted} />
            </UserMessageContainer>
        </Container>
    )
}


