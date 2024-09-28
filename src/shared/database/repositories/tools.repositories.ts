import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ToolsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDTO: Prisma.ToolCreateArgs) {
    return this.prismaService.tool.create(createDTO);
  }

  findMany(findManyDTO: Prisma.ToolFindManyArgs) {
    return this.prismaService.tool.findMany(findManyDTO);
  }
}
