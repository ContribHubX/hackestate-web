import { Entity } from ".";

export type userRoles =  "user" | "developer" | "agent";

export type User = Entity<{
    email: string;
    role: userRoles
}>
