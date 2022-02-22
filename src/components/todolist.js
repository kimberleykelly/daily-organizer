import { v4 as uuidv4 } from 'uuid'
import { getSavedItems, saveItems } from '../utils/getLocalStorage.js'
import { getId, getIndex } from '../utils/getId.js'
import '../style.css'
import '../images/bin.png'

// appends the to do list to the DOM

const appendToDoItems = function (todos) {
  document.querySelector('#to-dos').innerHTML = ''

  const container = document.querySelector('#to-dos')

  // returns each todo item that is completed
  const stillToDo = todos.filter((item) => {
    return item.complete
  })

  // displays the completed todo count
  const summary = document.querySelector('.todo-summary')
  summary.textContent = ` ${stillToDo.length} / ${todos.length} Completed Items`

  // Determines if each todo item should be displayed, or if an empty message when there are no todo items.
  if (todos.length > 0) {
    todos.forEach((item) => {
      container.appendChild(displayItems(item))
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.classList.add('empty-message')
    emptyMessage.textContent = 'No to-dos to show'
    container.appendChild(emptyMessage)
  }
}

// Grabs the id of the todo item that is checked or unchecked and updates the complete property.
const toggleCheckbox = function (item) {
  const todo = getId(todos, item)
  if (todo !== undefined) {
    todo.complete = !todo.complete
  }
}

// Grabs the id of the selected todo item and updates its value to the users input value.

const handleEdit = function (item, e) {
  const todo = getId(todos, item)
  if (todo !== undefined) {
    item.toDoItem = e.target.value
  }
}

// Finds the index of the selected todo item and removes it from the todos array.

const deleteItem = function (item) {
  const todo = getIndex(todos, item)
  if (todo > -1) {
    todos.splice(todo, 1)
  }
}

// Creates the DOM elements for each todo item to be displayed in the todo list.

const displayItems = (item) => {
  // create elements
  const container = document.createElement('div')
  const deleteButton = document.createElement('button')
  const editButton = document.createElement('button')
  const checkbox = document.createElement('input')
  const input = document.createElement('input')

  // set attributes for elements
  input.setAttribute('type', 'text')
  input.setAttribute('value', item.toDoItem)
  input.setAttribute('placeholder', 'Untitled Item')
  input.setAttribute('readonly', 'readonly')

  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = item.complete

  deleteButton.textContent = 'Delete'
  editButton.textContent = 'Edit'

  // add class names to elements

  container.classList.add('todo-item-container')
  deleteButton.classList.add('delete-btn')
  editButton.classList.add('edit-btn')
  input.classList.add('todo-text')

  // Determines if the checkbox should have the readonly attribute and a completed class
  if (checkbox.checked) {
    input.setAttribute('readonly', 'readonly')
    input.classList.add('completed')
  }

  // appends all created elements to the div container
  container.appendChild(checkbox)
  container.appendChild(input)
  container.appendChild(editButton)
  container.appendChild(deleteButton)

  // Event Listeners for each element and based upon the event it :-

  // handles the edit functionality by capturing the event, saves the new value to local storage and appends the updated item to the DOM.
  input.addEventListener('change', function (e) {
    handleEdit(item, e)
    saveItems(todos)
    appendToDoItems(todos)
  })

  // handles the checkbox functionality by toggling its completed state, saves the new value to local storage and appends the updated item to the DOM.
  checkbox.addEventListener('change', function () {
    toggleCheckbox(item)
    saveItems(todos)
    appendToDoItems(todos)
  })

  // handles the delete functionality by removing the item from the array, saving the change to local storage and appends the changes to the DOM.
  deleteButton.addEventListener('click', function () {
    deleteItem(item)
    saveItems(todos)
    appendToDoItems(todos)
  })

  // listens for the edit button being clicked and removes the readonly attribute and updates the textContent of the button.

  editButton.addEventListener('click', function () {
    input.removeAttribute('readonly', 'readonly')
    editButton.textContent = 'Save'
  })

  return container
}

// grabs the todos from local storage, and if there are no todos it will return an empty array.
let todos = getSavedItems()

// Initialize the todo list to show either the todos or an empty message
appendToDoItems(todos)

// Listen for the form submitting
// trims the users input so that there are no whitespaces
// prevent the browser from refreshing on submit
// alert the user if they try and add an empty to do
// push the users input to the todos array with the input value, a unique id and a complete state (default to false)
// save new todo item to local storage
// append the new todo item to the DOM
// reset the input value to an empty string
document.querySelector('#to-do-form').addEventListener('submit', function (e) {
  const usersInput = e.target.elements.toDo.value.trim()
  e.preventDefault()
  if (usersInput.length === 0) {
    alert('please provide a todo item')
  } else {
    todos.push({
      toDoItem: usersInput,
      id: uuidv4(),
      complete: false,
    })
    saveItems(todos)
    appendToDoItems(todos)
    e.target.elements.toDo.value = ''
  }
})
