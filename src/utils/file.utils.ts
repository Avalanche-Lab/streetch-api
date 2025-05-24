import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { Base64FileUpload, FileUploadResponse } from '@/types/models/v1/file.types';

export class FileUtils {
  private static UPLOAD_DIR = 'uploads';

  private static getFileExtensionFromMimeType(mimeType: string): string {
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'application/pdf': 'pdf',
      'image/gif': 'gif'
    };

    return mimeToExt[mimeType] || 'unknown';
  }

  private static createUploadDirIfNotExists(): void {
    if (!fs.existsSync(this.UPLOAD_DIR)) {
      fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
    }
  }

  private static extractBase64Data(base64String: string): string {
    const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    return matches ? matches[2] : base64String;
  }

  static async saveBase64File(fileData: Base64FileUpload): Promise<FileUploadResponse> {
    this.createUploadDirIfNotExists();

    const fileExtension = this.getFileExtensionFromMimeType(fileData.mimeType);
    const fileName = fileData.fileName || `${randomUUID()}.${fileExtension}`;
    const filePath = path.join(this.UPLOAD_DIR, fileName);

    const base64Data = this.extractBase64Data(fileData.base64);
    const buffer = Buffer.from(base64Data, 'base64');

    await fs.promises.writeFile(filePath, buffer);

    const stats = await fs.promises.stat(filePath);

    return {
      fileName,
      path: filePath,
      mimeType: fileData.mimeType,
      size: stats.size
    };
  }

  static async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
} 