import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import AuditLogTable from "../components/audit/AuditLogTable";

import {
  getAuditLogs
} from "../services/auditApi";

import type {
  AuditLog
} from "../types/auditLog";

const AuditLogs = () => {

  const [logs,
    setLogs] =
    useState<AuditLog[]>([]);

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    loadLogs();

  }, []);

  const loadLogs =
    async () => {

      const data =
        await getAuditLogs();

      setLogs(data);
    };

  const filteredLogs =
  logs.filter(
    log => {

      const text =
        search.toLowerCase();

      return (

        log.username
          .toLowerCase()
          .includes(text)

        ||

        log.action
          .toLowerCase()
          .includes(text)

        ||

        log.entityType
          .toLowerCase()
          .includes(text)

        ||

        log.entityId
          .toString()
          .includes(text)

      );

    }
  );

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Audit Logs
      </h1>

      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="
        border
        rounded-lg
        p-3
        mb-6
        w-full
        md:w-96"
      />

      <AuditLogTable
        logs={filteredLogs}
      />

    </MainLayout>

  );
};

export default AuditLogs;