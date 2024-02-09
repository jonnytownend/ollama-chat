import React from "react"
import reactStringReplace from 'react-string-replace'
import { CopyBlock } from 'react-code-blocks'
import styled from "styled-components"

const Container = styled.div<{ isAssistant: boolean }>`
    position: relative;
    padding: 16px;
    padding-right: 24px;
    background-color: ${p => p.isAssistant ? 'lightblue' : 'lightgreen'};
    border-radius: 8px;
    margin-left: ${p => p.isAssistant ? 32 : 0}px;
`

const StopButton = styled.div`
    position: absolute;
    cursor: pointer;
    width: 10px;
    height: 10px;
    right: 16px;
    bottom: 16px;
    background-color: black;
`

const CodeBlockContainer = styled.div`
    background-color: #FAFAFA;
    margin: 16px 0;
`

const StyledInlineCode = styled.code`
    color: red;
`

interface MessageBubbleProps {
    message: string
    role: 'user' | 'assistant' | 'system'
    onStopClicked?: () => void
}

function getCodeLanguage(message: string): string | null {
    const lowerCased = message.toLocaleLowerCase()
    if (lowerCased.includes('javascript')) {
        return 'javascript'
    } else if (lowerCased.includes('swift')) {
        return 'swift'
    }

    return null
}

export const MessageBubble = ({ message, role, onStopClicked }: MessageBubbleProps) => {
    var formattedMessageString = message
    
    // Add closing code backticks if there are none
    if (formattedMessageString.split('```').length % 2 == 0) {
        formattedMessageString += '```'
    }

    // Format inline code
    var formattedMessage = reactStringReplace(formattedMessageString.trim(), /[ |.]`(.*?)`[ |.]/, (match) => (
        <StyledInlineCode>{` ${match} `}</StyledInlineCode>
    ))

    // Format code blocks
    formattedMessage = reactStringReplace(formattedMessage, /```([\s\S]*?)```/g, (match) => (
        <CodeBlockContainer>
            <CopyBlock text={match.trim()} language={getCodeLanguage(message) ?? 'javascript'} showLineNumbers wrapLongLines />
        </CodeBlockContainer>
    ))

    // Format line breaks
    formattedMessage = reactStringReplace(formattedMessage, '\n', () => <br />)
    return (
        <Container isAssistant={role === "assistant"}>
            {message.trim() === '' ? '...' : formattedMessage}
            {role === 'assistant' && <StopButton onClick={onStopClicked} />}
        </Container>
    )
}
