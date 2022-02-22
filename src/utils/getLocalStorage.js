const getSavedItems = () => {
  const todosJSON = localStorage.getItem('todos')
  if (todosJSON !== null) {
    return JSON.parse(todosJSON)
  } else {
    return []
  }
}

const saveItems = function (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export { getSavedItems, saveItems }
