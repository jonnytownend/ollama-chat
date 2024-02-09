import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import { Chat } from './components/chat/chat.component'
import { ModelSelector } from './components/model-selector/model-selector.component';
import { Message, getModels, postChat } from "./api/ollama-api"

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

const DEFAULT_MODEL = 'llama2:13b-chat'

function App() {
  const [allModels, setAllModels] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const models = await getModels()
      console.log(models)
      setAllModels(models)
      if (models.includes(DEFAULT_MODEL)) {
        setSelectedModel(DEFAULT_MODEL)
      } else {
        setSelectedModel(models[0])
      }
    }
    run()
  }, [setAllModels, setSelectedModel])

  return (
    <WindowContainer>
      <Container>
        <ModelSelectorContainer>
          <h1>Ollama Chat</h1>
          <ModelSelector selectedModel={selectedModel} allModels={allModels} onModelChanged={setSelectedModel} />
        </ModelSelectorContainer>
        {allModels.length > 0 && !!selectedModel && (
          <ChatContainer>
            <Chat model={selectedModel} />
          </ChatContainer>
        )}
        {allModels.length === 0 && (
          <p>Loading Ollama models...</p>
        )}
      </Container>
    </WindowContainer>
  );
}

export default App;
