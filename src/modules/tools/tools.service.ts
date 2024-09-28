import { Injectable, NotFoundException } from '@nestjs/common';
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

      select: {
        id: true,
        title: true,
        link: true,
        description: true,
        tags: true,
      },
    });

    return tool;
  }

  async findAll(
    userId: string,
    filters?: {
      tag?: string;
    },
  ) {
    const tools = await this.toolsRepository.findMany({
      where: {
        userId,
        tags: filters?.tag
          ? {
              has: filters.tag,
            }
          : undefined,
      },

      select: {
        id: true,
        title: true,
        link: true,
        description: true,
        tags: true,
      },
    });

    const hasNotResult = filters?.tag && tools.length === 0;

    if (hasNotResult) {
      return [];
    }

    return tools;
  }

  findOne(id: number) {
    return `This action returns a #${id} tool`;
  }

  async update(id: string, updateToolDto: UpdateToolDto) {
    const { title, link, description, tags } = updateToolDto;

    const toolExists = await this.toolsRepository.findUnique({
      where: {
        id,
      },
    });

    if (!toolExists) {
      throw new NotFoundException('Tool not found');
    }

    return await this.toolsRepository.update({
      where: {
        id,
      },
      data: {
        title,
        link,
        description,
        tags,
      },

      select: {
        id: true,
        title: true,
        link: true,
        description: true,
        tags: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} tool`;
  }
}
