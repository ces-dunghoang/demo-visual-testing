import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const readFileAsync = util.promisify(fs.readFile);

@Injectable()
export class S3Service {
  async uploadImage(filePath: string): Promise<{ key: string; url: string }> {
    if (!filePath) throw new BadRequestException('File path is required');

    const fileBuffer = await readFileAsync(filePath);
    const mimeType = this.getMimeType(filePath);

    const s3 = new S3();

    const uploadResult = await s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME,
        Body: fileBuffer,
        Key: `${uuid()}-${path.basename(filePath)}`,
        ContentType: mimeType,
      })
      .promise();

    return {
      key: uploadResult.Key,
      url: uploadResult.Location,
    };
  }

  private getMimeType(filePath: string): string {
    const extension = path.extname(filePath).toLowerCase();
    switch (extension) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      // Add more cases for other image types if needed
      default:
        return 'application/octet-stream'; // Default to binary data if MIME type is unknown
    }
  }
  async deleteImage(key: string): Promise<void> {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      })
      .promise();
  }
}
