import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { CharacterCounter } from './components/CharacterCounter'

const Main = () => {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
