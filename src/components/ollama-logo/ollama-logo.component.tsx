import styled from "styled-components"

interface OllamaLogoProps { 
    size?: number
}

export const OllamaLogo = ({ size = 24 }: OllamaLogoProps) => (
    // <img src="https://ollama.com/public/ollama.png" width={size} />
    <p style={{ fontSize: `${size}px`, transform: 'scale(1.5)'}}>🦙</p>
)
