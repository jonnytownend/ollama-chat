import styled from "styled-components"
import { CopyBlock } from 'react-code-blocks'
import { CopyButton } from '../copy-button/copy-button.component'

const CodeBlockContainer = styled.div`
    position: relative;
    background-color: #FAFAFA;
    margin: 16px 0;
    overflow: hidden;
`

const CodeBlockInnerContainer = styled.div`
    width: 110%;
`

const CopyButtonContainer = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
`

export const CustomCodeBlock = (props: any) => (
    <CodeBlockContainer>
        <CodeBlockInnerContainer>
            <CopyBlock {...props} />
        </CodeBlockInnerContainer>
        <CopyButtonContainer>
            <CopyButton copyText={props.text} />
        </CopyButtonContainer>
    </CodeBlockContainer>
)
