import React, { useState, useEffect, createContext, useCallback, PropsWithChildren, useContext } from 'react';
import styled from 'styled-components'
import { Chat } from './components/chat/chat.component'
import { ModelSelector } from './components/model-selector/model-selector.component';
import { getModels } from "./api/ollama-api"
import { OllamaAppError } from './components/ollama-app-error/ollama-app-error.component';
import { OllamaLogo } from './components/ollama-logo/ollama-logo.component';

const WindowContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  background-color: white;
  padding: 32px 32px;
`

const ModelSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
`

const NewChatButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  background-color: lightgrey;
  border-radius: 8px;
  margin-left: 16px;
  font-size: 38px;

  &:hover {
    background-color: grey;
  }
`

const NewChatButtonContent = styled.div`
  transform: translateY(-3px);
  color: white;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

const DEFAULT_MODEL = 'llama2:13b-chat'

export const ResetContext = createContext<Date>(new Date())

interface ErrorValue {
  error: boolean
  setError: (error: boolean) => void
}

export const ErrorContext = createContext<ErrorValue>({ error: false, setError: () => {} })

export const ErrorProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState(false)

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}

function App() {
  const { error, setError} = useContext(ErrorContext)
  const [allModels, setAllModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [resetTime, setResetTime] = useState(new Date())

  useEffect(() => {
    const run = async () => {
      setError(false)
      try {
        const models = await getModels()
        setAllModels(models)
        if (models.includes(DEFAULT_MODEL)) {
          setSelectedModel(DEFAULT_MODEL)
        } else {
          setSelectedModel(models[0])
        }
      } catch {
        setError(true)
        setAllModels([])
        setSelectedModel(null)
      }
    }
    run()
  }, [setAllModels, setSelectedModel, setError])

  const resetButtonPressed = useCallback(() => {
    setResetTime(new Date())
  }, [setResetTime])

  return (
    <WindowContainer>
      <Container>
        <ModelSelectorContainer>
          <TitleContainer>
            <OllamaLogo />
            <h1 style={{ marginLeft: 16 }}>Ollama Chat</h1>
            <NewChatButton onClick={resetButtonPressed}>
              <NewChatButtonContent>
                +
              </NewChatButtonContent>
            </NewChatButton>
          </TitleContainer>
          <ModelSelector selectedModel={selectedModel} allModels={allModels} onModelChanged={setSelectedModel} />
        </ModelSelectorContainer>
        {!error && allModels.length > 0 && !!selectedModel && (
          <ResetContext.Provider value={resetTime}>
            <ChatContainer>
              <Chat model={selectedModel} />
            </ChatContainer>
          </ResetContext.Provider>
        )}
        {!error && allModels.length === 0 && (
          <p>Loading Ollama models...</p>
        )}
        {error && <OllamaAppError />}
      </Container>
    </WindowContainer>
  );
}

export default App;
