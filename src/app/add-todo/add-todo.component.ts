import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoComponent implements OnInit {
  todoControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  addTodo(): void {
    if (this.todoControl.valid) {
      this.todoService.addTodo(this.todoControl.value);
      this.todoControl.reset(); // Clear the input field after adding
    }
  }
}
