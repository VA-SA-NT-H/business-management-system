export interface AuditLog {

  id: number;

  username: string;

  action: string;

  entityType: string;

  entityId: number;

  timestamp: string;
}