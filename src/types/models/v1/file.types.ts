export interface Base64FileUpload {
  base64: string;
  mimeType: string;
  fileName?: string;
}

export interface FileUploadResponse {
  fileName: string;
  path: string;
  mimeType: string;
  size: number;
} 