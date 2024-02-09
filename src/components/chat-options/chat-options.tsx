import styled from "styled-components"

const OptionsContainer = styled.div`
    display: flex;
    font-size: 12px;
    color: grey;
    justify-content: flex-end;
`

const Checkbox = styled.input`

`

interface ChatOptionsProps {
    jsonModeEnabled: boolean
    onJsonCheckboxPressed: () => void
}

export const ChatOptions = ({ jsonModeEnabled, onJsonCheckboxPressed }: ChatOptionsProps ) => (
    <OptionsContainer>
        <p>JSON mode</p>
        <Checkbox onChange={onJsonCheckboxPressed} type="checkbox" checked={jsonModeEnabled} />
    </OptionsContainer>
)
