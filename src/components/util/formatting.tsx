import reactStringReplace from 'react-string-replace'
import styled from 'styled-components'
import { InlineCode } from '../inline-code/inline-code'
import { CustomCodeBlock } from '../code-block/code-block.component'
import Markdown from 'react-markdown'

const StyledMarkdown = styled(Markdown)`
    padding: 0;
    margin-top: -20px;
    margin-bottom: -20px;
    max-width: 800px;

    & img {
        max-width: 720px;
    }
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
    var formattedMessage = reactStringReplace(formattedMessageString.trim(), /```([\s\S]*?)```/g, (match) => {
        return (
            <CustomCodeBlock
                text={match.trim()}
                language={getCodeLanguage(message)}
                showLineNumbers
                wrapLongLines
            />
        )
    })

    // Then format JSON
    formattedMessage = reactStringReplace(formattedMessage, /{([\s\S]*)}/g, (match) => {
        const jsonString = '{'+match.trim()+'}'
        var indentedJson = jsonString
        try {
            indentedJson = JSON.stringify(JSON.parse(jsonString), null, 2)
        } catch {
            // no op
        }
        return (
            <CustomCodeBlock
                text={indentedJson}
                language={'json'}
                showLineNumbers
                wrapLongLines
            />
        )
    })

    // Then format markdown
    formattedMessage = reactStringReplace(formattedMessage, /(.*|\n.)/g, (match) => {
        return <StyledMarkdown>{match.split('\n')[0]}</StyledMarkdown>
    })

    // Then format inline code
    // TODO: - This no longer works because markdown comes first
    formattedMessage = reactStringReplace(formattedMessage, /`(.*?)`/, (match) => (
        <InlineCode>{`${match}`}</InlineCode>
    ))

    // Format line breaks
    formattedMessage = reactStringReplace(formattedMessage, '\n', () => <br />)

    return formattedMessage
}
