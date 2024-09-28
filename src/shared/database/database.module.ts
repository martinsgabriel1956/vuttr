import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { ToolsRepository } from './repositories/tools.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, ToolsRepository],
  exports: [UsersRepository, ToolsRepository],
})
export class DatabaseModule {}
