import { Entity } from ".";

export type userRoles =  "user" | "developer" | "agent";

export type User = Entity<{
    id:string;
    email: string;
    role: userRoles;
    name: string;
    contactNumber: string;
}>
