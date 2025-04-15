
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

export type Persona = {
  id: string;
  createdAt: Date | null;
  userId: string;
 
  listingName: string;
  personaDetails: string;
  approved: boolean;
}