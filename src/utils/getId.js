const getId = (todos, item) => {
  const todo = todos.find(function (todo) {
    return todo.id === item.id
  })
  return todo
}

const getIndex = (todos, item) => {
  const todo = todos.findIndex(function (todo) {
    return todo.id === item.id
  })
  return todo
}

export { getId, getIndex }
