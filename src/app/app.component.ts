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
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(4),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.loadItems();
  }

  // Funções 
  add() {
    //this.form.value => {title: 'Titulo'}
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    let date = this.datePipe.transform((new Date), 'dd/MM/yy h:mm');
    this.todos.push(new Todo(date, id, title, false));
    this.save();
    this.clear();
  }
  loadItems() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }
  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
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
    this.loadItems();
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
