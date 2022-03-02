import { v4 as uuidv4 } from 'uuid'
import { getSavedItems, saveItems } from '../utils/getLocalStorage.js'
import { getId, getIndex } from '../utils/getId.js'
import '../style.css'

const todos = getSavedItems()

const appendToDoItems = function (todos) {
  document.querySelector('#to-dos').innerHTML = ''

  const container = document.querySelector('#to-dos')

  const stillToDo = todos.filter((item) => {
    return item.complete
  })

  const summary = document.querySelector('.todo-summary')
  summary.textContent = ` ${stillToDo.length} / ${todos.length} Completed Items`

  if (todos.length === 0) {
    const emptyMessage = document.createElement('p')
    emptyMessage.classList.add('empty-message')
    emptyMessage.textContent = 'No to-dos to show'
    container.appendChild(emptyMessage)
    return
  }

  todos.forEach((item) => {
    container.appendChild(displayItems(item))
  })
}

const displayItems = (item) => {
  const container = document.createElement('div')
  const deleteButton = document.createElement('button')
  const editButton = document.createElement('button')
  const checkbox = document.createElement('input')
  const input = document.createElement('input')

  input.setAttribute('type', 'text')
  input.setAttribute('value', item.toDoItem)
  input.setAttribute('placeholder', 'Untitled Item')
  input.setAttribute('readonly', 'readonly')

  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = item.complete

  deleteButton.textContent = 'Delete'
  editButton.textContent = 'Edit'

  container.classList.add('todo-item-container')
  deleteButton.classList.add('delete-btn')
  editButton.classList.add('edit-btn')
  input.classList.add('todo-text')

  if (checkbox.checked) {
    input.setAttribute('readonly', 'readonly')
    input.classList.add('completed')
  }

  container.appendChild(checkbox)
  container.appendChild(input)
  container.appendChild(editButton)
  container.appendChild(deleteButton)

  input.addEventListener('change', function (e) {
    const todo = getId(todos, item)
    if (todo !== undefined) item.toDoItem = e.target.value

    saveItems(todos)
    appendToDoItems(todos)
  })

  checkbox.addEventListener('change', function () {
    const todo = getId(todos, item)
    if (todo !== undefined) todo.complete = !todo.complete

    saveItems(todos)
    appendToDoItems(todos)
  })

  deleteButton.addEventListener('click', function () {
    const todo = getIndex(todos, item)
    if (todo > -1) todos.splice(todo, 1)

    saveItems(todos)
    appendToDoItems(todos)
  })

  editButton.addEventListener('click', function () {
    input.removeAttribute('readonly', 'readonly')
    editButton.textContent = 'Save'
  })

  return container
}

appendToDoItems(todos)

document.querySelector('#to-do-form').addEventListener('submit', function (e) {
  const usersInput = e.target.elements.toDo.value.trim()
  e.preventDefault()

  if (usersInput.length === 0) {
    alert('please provide a todo item')
    return
  }

  todos.push({
    toDoItem: usersInput,
    id: uuidv4(),
    complete: false,
  })

  saveItems(todos)
  appendToDoItems(todos)
  e.target.elements.toDo.value = ''
})
