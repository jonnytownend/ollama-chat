import React, { useCallback, useState } from "react"
import Markdown from 'react-markdown'
import 'react-quill/dist/quill.snow.css'
import styled from "styled-components"
import { format } from "../util/formatting"

const Container = styled.form`
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid lightgrey;
    border-radius: 16px;
    padding: 12px;

    &:focus {
        border: 1px solid black;
    }
`

const HiddenInput = styled.input`
    font-size: 18px;
    flex: 1;
    border: 0px solid lightgrey;
    outline: none;
`

const StyledTextArea = styled.div`
    font-size: 18px;
    flex: 1;
    border: 0px solid lightgrey;
    outline: none;
`

const FakeInput = styled.div`
    flex: 1;
    font-size: 18px;
    padding: 8px 2px;
`

const FakeCursor = styled.div`
    width: 2px;
    height: 30px;
    background-color: black;
    margin-left: 8px;
`

const SendButton = styled.button<{ enabled?: boolean }>`
    ${p => p.enabled ? 'cursor: pointer;' : ''}
    width: 40px;
    height: 40px;
    margin-left: 8px;
    font-size: 24px;
    border: 0px;
    border-radius: 8px;
    color: white;
    background-color: ${p => p.enabled ? 'grey' : 'lightgrey'};
`

interface UserMessageInputProps {
    showStop?: boolean
    onMessageSubmit?: (message: string) => void
    onMessageStop?: () => void
}

export const UserMessageInput = ({ showStop, onMessageSubmit, onMessageStop }: UserMessageInputProps) => {
    const [message, setMessage] = useState("")

    const onTextChanged = useCallback((e: any) => {
        setMessage(e.target.value)
    }, [setMessage])

    const onSubmit = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (message === '') {
            return
        }
        onMessageSubmit?.(message)
        setMessage('')
    }, [message, setMessage, onMessageSubmit])

    const onStop = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onMessageStop?.()
    }, [onMessageStop])

    return (
        <Container>
            <HiddenInput
                type="text"
                placeholder='Enter your message here...'
                value={message}
                onChange={onTextChanged}
            />
            {!showStop && <SendButton enabled={message !== ''} onClick={onSubmit}>{'⬆'}</SendButton>}
            {showStop && <SendButton enabled onClick={onStop}>{'◼'}</SendButton>}
        </Container>
    )
}
