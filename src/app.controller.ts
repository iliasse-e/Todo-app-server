import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './todo.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTodos(): Todo[] {
    return this.appService.findAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Todo | undefined {
    return this.appService.findOne(id);
  }

  @Post('create')
  addTodo(@Body() {newTodo}: {newTodo: Todo}): string {
    this.appService.create(newTodo);
    return 'New todo created';
  }

  // TODO : Add delete feature

  // TODO : Add modify feature
}
