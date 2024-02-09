import reactStringReplace from 'react-string-replace'
import styled from "styled-components"
import { CopyBlock } from 'react-code-blocks'
import { InlineCode } from '../inline-code/inline-code'

const CodeBlockContainer = styled.div`
    background-color: #FAFAFA;
    margin: 16px 0;
`

export function getCodeLanguage(message: string): string {
    const lowerCased = message.toLocaleLowerCase()
    if (lowerCased.includes('javascript')) {
        return 'javascript'
    } else if (lowerCased.includes('swift')) {
        return 'swift'
    } else {
        return 'javascript'
    }
}

export function format(message: string): React.ReactNode[] {
    var formattedMessageString = message

    // Add closing code backticks if there are none
    if (formattedMessageString.split('```').length % 2 == 0) {
        formattedMessageString += '```'
    }

    // Add closing code curly brackets if there are none
    if (formattedMessageString[0] === '{' && formattedMessageString[formattedMessageString.length - 1] !== '}') {
        formattedMessageString += '}'
    }

    // Format code blocks first
    var formattedMessage = reactStringReplace(formattedMessageString.trim(), /```([\s\S]*?)```/g, (match) => (
        <CodeBlockContainer>
            <CopyBlock
                text={match.trim()}
                language={getCodeLanguage(message)}
                showLineNumbers
                wrapLongLines
            />
        </CodeBlockContainer>
    ))

    // Then format inline code
    formattedMessage = reactStringReplace(formattedMessage, /`(.*?)`/, (match) => (
        <InlineCode>{`${match}`}</InlineCode>
    ))

    // Then format JSON
    formattedMessage = reactStringReplace(formattedMessage, /{([\s\S]*)}/g, (match) => (
        <CodeBlockContainer>
            <CopyBlock
                text={'{\n'+match.trim()+'\n}'}
                language={getCodeLanguage(message)}
                showLineNumbers
                wrapLongLines
            />
        </CodeBlockContainer>
    ))

    // Format line breaks
    formattedMessage = reactStringReplace(formattedMessage, '\n', () => <br />)

    return formattedMessage
}
