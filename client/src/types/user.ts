import { Entity } from ".";

export type User = Entity<{
    email: string;
    role: "admin" | "super_admin";
}>
