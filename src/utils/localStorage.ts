import {Todo} from "../ts/todo" 
export function saveTodos(todos: Todo[]){
    localStorage.setItem("todos_key", JSON.stringify(todos))
}

export function loadTodos(): Todo[]{
    return JSON.parse(localStorage.getItem("todos_key") || '[]')
}