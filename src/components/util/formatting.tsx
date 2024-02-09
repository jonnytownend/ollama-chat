import reactStringReplace from 'react-string-replace'
import { InlineCode } from '../inline-code/inline-code'
import { CustomCodeBlock } from '../code-block/code-block.component'

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

    // Then format inline code
    formattedMessage = reactStringReplace(formattedMessage, /`(.*?)`/, (match) => (
        <InlineCode>{`${match}`}</InlineCode>
    ))

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

    // Eveything else as markdown
    // TODO
    // formattedMessage = reactStringReplace(formattedMessage, /(.*|\n.)/g, (match) => {
    //     return <Markdown>{match.split('\n')[0]}</Markdown>
    // })

    // Format line breaks
    formattedMessage = reactStringReplace(formattedMessage, '\n', () => <br />)

    return formattedMessage
}
