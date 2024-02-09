import React, { useCallback } from "react"
import styled from 'styled-components'

const AVAILABLE_MODELS = [
    "llama2:13b-chat",
    "llama2:13b",
    "falcon:40b-instruct",
]

const StyledSelect = styled.select`
    padding: 8px;
    border-radius: 4px;
`

interface ModelSelectorProps {
    onModelChanged: (model: string) => void
}

export const ModelSelector = ({ onModelChanged }: ModelSelectorProps) => {
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        onModelChanged(e.target.value)
    }, [onModelChanged])

    return (
        <StyledSelect onChange={onChange}>
            {AVAILABLE_MODELS.map(model => (
                <option key={model} value={model}>{model}</option>
            ))}
        </StyledSelect>
    )
}
