package com.ebms.audit.service;

import com.ebms.audit.entity.AuditLog;
import com.ebms.audit.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl
        implements AuditLogService {

    private final AuditLogRepository repository;

    @Override
    public void log(
            String username,
            String action,
            String entityName,
            Long entityId) {

        AuditLog log =
                AuditLog.builder()
                        .username(username)
                        .action(action)
                        .entityName(entityName)
                        .entityId(entityId)
                        .timestamp(
                                LocalDateTime.now()
                        )
                        .build();

        repository.save(log);
    }
}