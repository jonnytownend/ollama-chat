const BASE_URL = 'http://localhost:11434'
const CHAT_ENDPOINT = '/api/chat'
const MODEL_LIST_ENDPOINT = '/api/tags'

const JSON_PROMPT = 'Respond with valid JSON.'

const NO_SYSTEM_MESSAGE = ''

export interface Message {
    role: 'user' | 'assistant' | 'system',
    content: string,
    isPartial?: boolean
}

interface PostChatOptions {
    jsonMode?: boolean
}

export async function postChat(
    model: string,
    messages: Message[],
    output: (messageContent: string, isFinished: boolean) => void,
    options?: PostChatOptions
) {
    var systemMessage: Message = {
        role: 'system',
        content: NO_SYSTEM_MESSAGE
    }
    if (options?.jsonMode) {
        systemMessage = {...systemMessage, content: JSON_PROMPT}
    }
    const payload = {
        model,
        messages: [systemMessage, ...messages],
        stream: true,
        format: options?.jsonMode ? 'json' : null
    }
    const response = await fetch(BASE_URL + CHAT_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
    })

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8')
    if (!reader) {
        return
    }

    var messageContent = ''
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            output(messageContent, true)
            break
        }
        const rawData = decoder.decode(value, { stream: true });
        const data =  JSON.parse(rawData)
        messageContent += data.message.content
        output(messageContent, false)
    }
}

export async function getModels(): Promise<string[]> {
    const response = await fetch(BASE_URL + MODEL_LIST_ENDPOINT)
    const data = await response.json()
    return (data.models as { name: string }[]).map(model => model.name)
}
