import { ROLE } from "@/features/user/types/user"

export type Permission =
    "USER_LIST" |
    "USER_READ" |
    "USER_WRITE" |
    "USER_DELETE" |
    "USER_STATES"

export const Role_PERMISSIONS: Record<ROLE, Permission[]> = {
    super_admin: [],
    admin: [],
    support: [],
    student: []
}