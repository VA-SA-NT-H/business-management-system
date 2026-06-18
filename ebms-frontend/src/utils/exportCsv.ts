import { saveAs } from "file-saver";

export const exportToCsv = (
  filename: string,
  rows: any[]
) => {

  if (!rows.length) return;

  const headers =
    Object.keys(rows[0]);

  const csv = [

    headers.join(","),

    ...rows.map(row =>
      headers
        .map(
          header =>
            row[header]
        )
        .join(",")
    )

  ].join("\n");

  const blob =
    new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8;"
      }
    );

  saveAs(
    blob,
    `${filename}.csv`
  );
};