import { Entity } from ".";

export type User = Entity<{
    email: string;
    username: string
}>
