
type BaseEntity = {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Entity<T> = BaseEntity & T;



