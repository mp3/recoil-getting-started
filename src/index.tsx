import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { CharacterCounter } from './components/CharacterCounter'
import { TodoList } from './components/TodoList'

const Main = () => {
  return (
    <RecoilRoot>
      <CharacterCounter />
      <TodoList />
    </RecoilRoot>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
