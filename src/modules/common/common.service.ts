import { Body, Injectable, UploadedFile } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import path from 'path';
import fs from 'fs';
import { UploadDto } from './common.dto';

@Injectable()
export class CommonService {
  constructor(private readonly prismaService: PrismaService) {}

  // 上传图片到指定目录
  async uploadFile(
    body: UploadDto,
    file: Express.Multer.File,
  ) {
    const uploadDir = path.join(__dirname, '..', body.dir ? `uploads/${body.dir}` : 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    return this.prismaService.file.create({
      data: {
        title: body.name ?? file.originalname,
        url: `http://static.mingyueforever.cn/uploads/${uploadDir}/${file.originalname}`
      },
    })
  }
}
