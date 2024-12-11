import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { UploadDto } from './common.dto';

// api-doc文档用
@ApiTags('common')
// 路径前缀
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() body: UploadDto, @UploadedFile() file: Express.Multer.File) {
    return await this.commonService.uploadFile(body, file)
  }
}
