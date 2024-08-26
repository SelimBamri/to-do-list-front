import { ToDoListElement } from './to-do-list-element';

export class ToDoList {
  constructor(
    public id: number,
    public title: string,
    public elements: ToDoListElement[]
  ) {}
}
