package com.ebms.audit.service;

import com.ebms.audit.entity.AuditLog;

import java.util.List;

public interface AuditLogService {

    void log(
            String username,
            String action,
            String entityName,
            Long entityId
    );

    List<AuditLog> getAllLogs();
}