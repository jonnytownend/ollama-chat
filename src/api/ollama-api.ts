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
    output: (messageContent: string, isFinished: boolean) => boolean,
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
    console.log('Getting a first response from Ollama API...')
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
        console.log('Fetching from Ollama API...')
        const { value } = await reader.read();
        const rawData = decoder.decode(value, { stream: true });
        const data =  JSON.parse(rawData)
        messageContent += data.message.content
        const shouldContinue = output(messageContent, data.done)
        if (data.done || !shouldContinue) {
            break
        }
    }
}

export async function getModels(): Promise<string[]> {
    const response = await fetch(BASE_URL + MODEL_LIST_ENDPOINT)
    const data = await response.json()
    return (data.models as { name: string }[]).map(model => model.name)
}
