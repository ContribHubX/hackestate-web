import { Entity } from ".";

export type User = Entity<{
    email: string;
    name: string;
    picture?: string;
}>
