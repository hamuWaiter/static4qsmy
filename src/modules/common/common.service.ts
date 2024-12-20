import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import path from 'path';
import fs from 'fs';
import { UploadDto } from './common.dto';

@Injectable()
export class CommonService {
  constructor(private readonly prismaService: PrismaService) {}

  // 上传图片到指定目录
  async uploadFile(
    { filename, path }: Express.Multer.File,
  ) {
    // 将本地文件路径转换为URL
    return this.prismaService.file.create({
      data: {
        name: filename,
        path: `http://static-server.mingyueforever.cn/${path.replace(/\\/g, '/')}`
      },
    })
  }

  // 多文件上传
  async uploadFiles(
    files: Express.Multer.File[],
  ) {
    const res = [];
    for (let i = 0; i < files.length; i++) {
      const { filename, path } = files[i];
      res.push(await this.prismaService.file.create({
        data: {
          name: filename,
          path: `http://static-server.mingyueforever.cn/${path.replace(/\\/g, '/')}`
        },
      }))
    }
    return res;
  }
}
