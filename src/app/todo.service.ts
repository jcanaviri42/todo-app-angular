import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos$ = new BehaviorSubject<Todo[]>([]); // Our reactive stream of todos
  readonly todos = this.todos$.asObservable(); // Expose an observable for components to subscribe to

  private nextId = 1;

  constructor() {}

  addTodo(text: string): void {
    const newTodo: Todo = {
      id: this.nextId++,
      text: text,
      completed: false,
    };
    this.todos$.next([...this.todos$.value, newTodo]); // Emit the updated array
  }

  toggleComplete(id: number): void {
    const updatedTodos = this.todos$.value.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todos$.next(updatedTodos); // Emit the updated array
  }

  deleteTodo(id: number): void {
    const updatedTodos = this.todos$.value.filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos); // Emit the updated array
  }
}
