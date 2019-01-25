import { Injectable } from "@angular/core";
import { Todo } from "../class/todo";

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  lastid = 0;
  todos: Todo[] = [];

  constructor() {
    const todos=this.getAllTodos();
    if (todos.length===0){
      this.lastid=0;
    }else {
      const maxId= todos[todos.length-1].id;
      this.lastid = maxId+1;
    }
  }

  addTodos(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastid;
    }
    const todos = this.getAllTodos();
    todos.push(todo);
    //add code
    this.setTodo(todos);
    return this;
  }

  getAllTodos() {
    const storageItem = JSON.parse(window.localStorage.getItem("app-todos"));
    if (storageItem === null) {
      return [];
    } else {
      return storageItem.todos;
    }
  }

  getTodoById(id:number):Todo{
    const todos=this.getAllTodos();
    return todos.filter(todo=>todo.id===id).pop();
  }

  updateTodo(id:number,values:Object={}){
    const todo=this.getTodoById(id);
    if(!todo){
      return null;
    }
    let todos = this.getAllTodos();
    todos = todos.filter(t=>t.id !== todo.id);
    const todoValues= Object.assign(todo,values);
    todos.push(todoValues);
    this.setTodo(todos);
  }

  compoleteTodo(todo:Todo){
    const updateTodo= this.updateTodo(todo.id,{
      complete:!todo.complete
    });
    return updateTodo;
  }

  deleteTodoById(id:number){
    let todos = this.getAllTodos();
    todos = todos.filter(todo => todo.id!==id);
    this.setTodo(todos);
  }

  setTodo(usertodos: Todo[]) {
    window.localStorage.setItem(
      "app-todos",
      JSON.stringify({ todos: usertodos })
    );
  }
}
