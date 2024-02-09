import React, { useState } from 'react';
import styled from 'styled-components'
import { Chat } from './components/chat/chat.component'
import { ModelSelector } from './components/model-selector/model-selector.component';

const WindowContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: lightgrey;
  width: 100vw;
  min-height: 100vh;
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
  justify-content: flex-end;
  margin-bottom: 32px;
`

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
`

function App() {
  const [model, setModel] = useState('llama2:13b-chat')

  return (
    <WindowContainer>
      <Container>
        <ModelSelectorContainer>
          <ModelSelector onModelChanged={setModel} />
        </ModelSelectorContainer>
        <ChatContainer>
          <Chat model={model} />
        </ChatContainer>
      </Container>
    </WindowContainer>
  );
}

export default App;
