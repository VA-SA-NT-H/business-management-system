import type { AuditLog } from "../../types/auditLog";

interface Props {
  logs: AuditLog[];
}

const AuditLogTable = ({
  logs
}: Props) => {

  return (

    <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100 dark:bg-slate-700">

            <th className="p-3 text-left">
              User
            </th>

            <th className="p-3 text-left">
              Action
            </th>

            <th className="p-3 text-left">
              Entity
            </th>

            <th className="p-3 text-left">
              Entity ID
            </th>

            <th className="p-3 text-left">
              Timestamp
            </th>

          </tr>

        </thead>

        <tbody>

          {logs.map((log) => (

            <tr
              key={log.id}
              className="border-b"
            >

              <td className="p-3">
                {log.username}
              </td>

              <td className="p-3">
                {log.action}
              </td>

              <td className="p-3">
                {log.entityType}
              </td>

              <td className="p-3">
                {log.entityId}
              </td>

              <td className="p-3">
                {new Date(
                  log.timestamp
                ).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default AuditLogTable;