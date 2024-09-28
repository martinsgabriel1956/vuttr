import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ToolsRepository } from 'src/shared/database/repositories/tools.repositories';

@Injectable()
export class ToolsService {
  constructor(private readonly toolsRepository: ToolsRepository) {}
  async create(userId: string, createToolDto: CreateToolDto) {
    const { title, link, description, tags } = createToolDto;
    const tool = await this.toolsRepository.create({
      data: {
        title,
        link,
        description,
        tags,
        userId,
      },
    });

    return {
      id: tool.id,
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tool.tags,
    };
  }

  findAll() {
    return `This action returns all tools`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return `This action updates a #${id} tool`;
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
