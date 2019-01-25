import { Component } from '@angular/core';
import { Todo } from './class/todo';
import { TodoDataService } from './services/todo-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  newTodo:Todo=new Todo();
  editForm:FormGroup;

  constructor( 
    private todoService:TodoDataService,
    private modalService: NgbModal,
    private fb:FormBuilder){}

  get todos(){
    return this.todoService.getAllTodos();
  }

  addTodo(){
    // console.log(this.newTodo);
    if(this.newTodo.title && this.newTodo.date){
      this.todoService.addTodos(this.newTodo);
      //cek isi new todo apakah berhasil
      // console.log(this.newTodo);
      this.newTodo= new Todo();
      this.newTodo.title='';
      this.newTodo.date='';
    }
  }

  deleteTod(todo){
    this.todoService.deleteTodoById(todo.id);
  }

  completeTodo(todo){
    this.todoService.compoleteTodo(todo);
  }

  open(content,todo){
    this.initForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  updateTodo(){

  }

  initForm(){
    this.editForm=this.fb.group({
      title:['',Validators.required],
      date:['',Validators.required]
    });

  }
}
