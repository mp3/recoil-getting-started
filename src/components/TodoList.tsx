import React, { useState, ChangeEvent } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil'

type Item = {
  id: number
  text: string
  isCompleted: boolean
}

const todoListState = atom<Item[]>({
  key: 'todoListState',
  default: []
})

export const TodoList = () => {
  const todoList = useRecoilValue(todoListState)

  return (
    <>
      {/* <TodoListStats /> */}
      {/* <TodoListFilters /> */}
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  )
}

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('')
  const setTodoList = useSetRecoilState(todoListState)

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isCompleted: false
      }
    ])
    setInputValue('')
  }

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value)
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  )
}

let id = 0
const getId = () => {
  return id++
}

const TodoItem = ({ item }: { item: Item }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const index = todoList.findIndex((listItem) => listItem === item)

  const editItemText = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value
    })

    setTodoList(newList)
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isCompleted: !item.isCompleted
    })

    setTodoList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index)

    setTodoList(newList)
  }

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isCompleted}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  )
}

const replaceItemAtIndex = (arr: any[], index: number, newValue: any) => {
  return [...arr].map((item, i) => {
    if (index === i) {
      return newValue
    }

    return item
  })
}

const removeItemAtIndex = (arr: any[], index: number) => {
  return [...arr].filter((_item, i) => index !== i)
}
