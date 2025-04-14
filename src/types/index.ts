
type BaseEntity = {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Entity<T> = BaseEntity & T;

export type UploadedFile = {
  file: File
  id: string
  preview?: string
  valid: boolean
}