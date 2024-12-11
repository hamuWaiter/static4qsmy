import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma/prisma.service'
import { AppService } from './app.service';
import { CommonModule } from './modules';

@Module({
  imports: [
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
