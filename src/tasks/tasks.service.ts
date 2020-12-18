import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) { }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.text = createTaskDto.text;
    return this.tasksRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
