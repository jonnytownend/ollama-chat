import styled from "styled-components"
import { OLLAMA_AI_URL } from "../../constants"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: grey;
`

const OptionsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Checkbox = styled.input`

`

interface ChatOptionsProps {
    jsonModeEnabled: boolean
    onJsonCheckboxPressed: () => void
}

export const ChatOptions = ({ jsonModeEnabled, onJsonCheckboxPressed }: ChatOptionsProps ) => (
    <Container>
        <p>This is an unofficial companion app. It is not affiliated with <a href={OLLAMA_AI_URL} style={{ color: 'grey' }}>Ollama.ai</a>.</p>
        <OptionsContainer>
            <p>JSON mode</p>
            <Checkbox onChange={onJsonCheckboxPressed} type="checkbox" checked={jsonModeEnabled} />
        </OptionsContainer>
    </Container>
)
