import React, { useCallback } from "react"
import styled from 'styled-components'

const AVAILABLE_MODELS = [
    "llama2:13b-chat",
    "llama2:13b",
    "falcon:40b-instruct",
]

const Container = styled.div`
    display: flex;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid lightgrey;
`

const StyledSelect = styled.select`
    border: 0px solid lightgrey;
    outline: none;
`

const LoadingDiv = styled.div`
    color: grey;
    font-size: 14px;
`

interface ModelSelectorProps {
    selectedModel: string | null
    allModels: string[]
    onModelChanged: (model: string) => void
}

export const ModelSelector = ({ selectedModel, allModels, onModelChanged }: ModelSelectorProps) => {
    const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        onModelChanged(e.target.value)
    }, [onModelChanged])

    return (
        <Container>
            {!selectedModel || allModels.length === 0 && <LoadingDiv>Loading models...</LoadingDiv>}
            <StyledSelect onChange={onChange}>
                {allModels.map(model => (
                    <option
                        key={model}
                        value={model}
                        selected={selectedModel === model}
                    >
                        {model}
                    </option>
                ))}
            </StyledSelect>
        </Container>
    )
}
