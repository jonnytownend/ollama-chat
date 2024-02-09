import styled from "styled-components"

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
            There's a problem with Ollama!<br />Make sure that the Ollama app is running, then refresh the page.
        </ErrorMessageContainer>
    </div>
)
