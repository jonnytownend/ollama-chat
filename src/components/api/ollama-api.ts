const BASE_URL = 'http://localhost:11434'
const CHAT_ENDPOINT = '/api/chat'

export interface Message {
    role: 'user' | 'assistant' | 'system',
    content: string,
}

export async function postChat(
    model: string,
    messages: Message[],
    stopListener: () => boolean,
    output: (messageContent: string) => void
) {
    const payload = {
        model,
        messages,
        stream: true,
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
    while (!stopListener()) {
        const { value, done } = await reader.read();
        if (done) break;
        const rawData = decoder.decode(value, { stream: true });
        const data =  JSON.parse(rawData)
        messageContent += data.message.content
        output(messageContent)
    }
}
