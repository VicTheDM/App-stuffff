export class SessionLogin {
  userId = '';
  userName = '';
  firstName = '';
  lastName = '';
  userType = 0;
  secondLastName: string | null;
  accessToken: AccessToken;
  lastLoginTime: string | null;
  roles: string[];
  permissions: Permission[];
  claimsAssign: any[]; // Specify a more detailed type if possible
  password: string | null;
  roleName: string | null;
  allLocations: boolean;
  locations: any | null; // Specify a more detailed type if possible
  allCorporations: boolean;
  corporations: any[]; // Specify a more detailed type if possible
  zones: number[];
  email: string | null;
  active: boolean;
  employeeId: number;
  idCorporacion: number;
  cultureInfo: string;
  timeZoneId: string;
  refreshToken: string | null;
  aspNetUsersLocations: any | null; // Specify a more detailed type if possible
  aspNetUsersCorporations: any | null; // Specify a more detailed type if possible
  aspNetUsersZones: any | null; // Specify a more detailed type if possible
}

export interface AccessToken {
  token: string;
  expiresIn: number;
  status: number;
}

export interface Permission {
  groupName: string;
  name: string;
  description: string;
  permission: number;
}

export interface SessionLoginInterface {
  userId : string;
  firstName : string;
  lastName : string;
  userType : string;
}
export interface accessToken  {
  token: string;
  expiresIn: number;
}

export interface refreshToken {
  token: string;
  expireAt: number;

}
