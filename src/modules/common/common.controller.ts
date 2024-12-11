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
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.commonService.uploadFile(file)
  }

  // 多文件上传
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files',4))
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.commonService.uploadFiles(files)
  }
}
