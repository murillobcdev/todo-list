import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public todos: Todo[] = []; //empty Array
  public title: string = 'Tarefas de Hoje';
  public formTitle: string = 'Adicionar nova tarefa';
  public form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load()
    this.handleHour()
  }

  // Funções 
  add() {
    //this.form.value => {title: 'Titulo'}
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    let date = this.datepipe.transform((new Date), 'dd/MM/yy h:mm:ss');
    this.todos.push(new Todo(id, title, false, date));
    this.save();
    this.clear();
  }
  load() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '{}');
  }
  handleHour() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '{}');
    let actualDate = this.datepipe.transform((new Date), 'dd/MM/yy h:mm:ss');
    this.todos.map(event =>{
      console.log(event.date, actualDate)
    })
  }
  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }
  clear() {
    this.form.reset();
  }
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

}
