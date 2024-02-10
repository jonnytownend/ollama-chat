interface OllamaLogoProps { 
    size?: number
}

export const OllamaLogo = ({ size = 24 }: OllamaLogoProps) => (
    <img src="https://ollama.com/public/ollama.png" width={size} />
)
