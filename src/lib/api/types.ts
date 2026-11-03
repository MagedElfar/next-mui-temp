export interface UserView {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface PermissionView {
  id: string;
  key: string;
  description: string | null;
}

export interface RoleView {
  id: string;
  name: string;
  description: string | null;
  permissionKeys: string[];
}
