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
    file: Express.Multer.File,
  ) {
    return this.prismaService.file.create({
      data: {
        name: file.filename,
        path: `http://static-server.mingyueforever.cn/uploads/${file.filename}`
      },
    })
  }

  // 多文件上传
  async uploadFiles(
    files: Express.Multer.File[],
  ) {
    const res = [];
    for (let i = 0; i < files.length; i++) {
      res.push(await this.prismaService.file.create({
        data: {
          name: files[i].filename,
          path: `http://static-server.mingyueforever.cn/uploads/${files[i].filename}`
        },
      }))
    }
    return res;
  }
}
