import React, { useCallback, useState } from "react"
import styled from "styled-components"

const Container = styled.form`
    display: flex;
    align-items: stretch;
`

const StyledInput = styled.input`
    padding: 16px;
    font-size: 20px;
    width: 100%;
`

const SendButton = styled.button`
    width: 60px;
    margin-left: 8px;
    font-size: 24px;
`

interface UserMessageInputProps {
    onMessageSubmit?: (message: string) => void
}

export const UserMessageInput = ({ onMessageSubmit }: UserMessageInputProps) => {
    const [message, setMessage] = useState("")

    const onTextChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }, [setMessage])

    const onSubmit = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onMessageSubmit?.(message)
        setMessage('')
    }, [message, setMessage, onMessageSubmit])

    return (
        <Container>
            <StyledInput
                type="text"
                placeholder='Enter your message here...'
                value={message}
                onChange={onTextChanged}
            />
            <SendButton onClick={onSubmit}>{'>'}</SendButton>
        </Container>
    )
}
