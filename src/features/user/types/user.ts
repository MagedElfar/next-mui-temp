import { Entity } from "@/types/entity";

export interface User extends Entity {
    name: string;
    email: string;
    role: ROLE
}

export type ROLE = "super_admin" | "admin" | "support" | "student"