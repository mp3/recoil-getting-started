import React, { ChangeEvent } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from 'recoil'

const textState = atom({
  key: 'textState',
  default: ''
})

const charCountState = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState)

    return text.length
  }
})

export const CharacterCounter = () => {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  )
}

export const TextInput = () => {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br/>
      Echo: {text}
    </div>
  )
}

export const CharacterCount = () => {
  const count = useRecoilValue(charCountState)

  return <>Character count: {count}</> 
}
