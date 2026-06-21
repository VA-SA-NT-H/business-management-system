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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
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
          className="border rounded-lg px-4 py-2 w-80 text-black dark:text-white bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <AuditLogTable
        logs={filteredLogs}
      />

    </MainLayout>

  );
};

export default AuditLogs;