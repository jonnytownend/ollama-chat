import styled from "styled-components"
import { OLLAMA_AI_URL } from "../../constants"

const WarningSymbolContainer = styled.p`
    font-size: 42px;
`

const ErrorMessageContainer = styled.p`
    font-size: 24px;
`

export const OllamaAppError = () => (
    <div>
        <WarningSymbolContainer>⚠️</WarningSymbolContainer>
        <ErrorMessageContainer>
            There's a problem with Ollama!
            <br />
            Make sure that the Ollama app is running, then refresh the page.
            <br />
            <br />
            Visit <a href={OLLAMA_AI_URL} style={{ color: 'black' }}>Ollama.ai</a> to download the app.
        </ErrorMessageContainer>
    </div>
)
