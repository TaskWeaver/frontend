// src/domains/team/type.ts
export interface Team {
  id: string;
  name: string;
  description: string;
  myRole: string;
  totalMembers: number;
  createdAt: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string | number;
  name: string;
  email?: string;
  role?: string;
}

export interface TeamResponse {
  result?: any[];
}
