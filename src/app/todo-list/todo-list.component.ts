import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  // Tells Angular to only re-render the component when its input properties change or when
  // an event originates from within the component itself or one of its children.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos$: Observable<Todo[]>; // An Observable that will emit the array of todos
  private subscription: Subscription = new Subscription(); // To manage our subscriptions

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.todos; // Assign the observable from the service
  }

  ngOnInit(): void {
    // No need to manually fetch data here, the Observable will emit updates automatically
    // whenever the todo list in the service changes.
  }

  toggleTodo(todo: Todo): void {
    this.todoService.toggleComplete(todo.id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up subscriptions to prevent memory leaks
  }
}
