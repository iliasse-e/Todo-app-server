import { Injectable } from '@nestjs/common';
import { Todo } from './todo.type';

@Injectable()
export class AppService {

  private todos = [
    {id: '1', description: 'Buy a dog and die alone', completed: false},
    {id: '2', description: 'Lets wrestle, lets wrestle', completed: false},
  ]

  findAll(): Todo[] {
    return this.todos;
  }

  create(newTodo: Todo): void {
    this.todos.push(newTodo);
  }

  delete(id: string): void {
    this.todos = this.todos.filter(todo => todo.id === id);
  }

  findOne(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id)
  }

}
