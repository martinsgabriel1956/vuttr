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

  findUnique(findUnique: Prisma.ToolFindUniqueArgs) {
    return this.prismaService.tool.findUnique(findUnique);
  }

  update(updateDTO: Prisma.ToolUpdateArgs) {
    return this.prismaService.tool.update(updateDTO);
  }

  delete(deleteDTO: Prisma.ToolDeleteArgs) {
    return this.prismaService.tool.delete(deleteDTO);
  }
}
