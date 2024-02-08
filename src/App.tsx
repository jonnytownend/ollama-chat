import React from 'react';
import styled from 'styled-components'
import { Chat } from './components/chat/chat.component'

const WindowContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  background-color: lightgrey;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: white;
`

function App() {
  return (
    <WindowContainer>
      <Container>
        <Chat />
      </Container>
    </WindowContainer>
  );
}

export default App;
