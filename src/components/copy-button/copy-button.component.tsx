import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div``

const ActionButton = styled.div<{ size: number }>`
    position: relative;
    cursor: pointer;
    font-size: ${p => p.size}px;
    margin-left: 8px;
`

const TickButtonContainer = styled.div<{ show: boolean }>`
    position: absolute;
    top: 0;
    opacity: ${p => p.show ? 1 : 0};
    transition: opacity 0.5s;
`

interface CopyButtonProps {
    copyText: string
    size?: number
}

export const CopyButton = ({ copyText, size = 20 }: CopyButtonProps) => {
    const [hasCopiedToClipboard, setHasCopiedToClipboard] = useState(false)

    useEffect(() => {
        if (!hasCopiedToClipboard) {
            return
        }

        const timeout = setTimeout(() => {
            setHasCopiedToClipboard(false)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [hasCopiedToClipboard, setHasCopiedToClipboard])

    const onCopyClicked = useCallback(() => {
        navigator.clipboard.writeText(copyText)
        setHasCopiedToClipboard(true)
    }, [copyText, setHasCopiedToClipboard])

    return (
        <Container>
            <ActionButton size={size} onClick={onCopyClicked}>
                <div>📋</div>
                <TickButtonContainer show={hasCopiedToClipboard}>✅</TickButtonContainer>
            </ActionButton>
        </Container>
    )
}