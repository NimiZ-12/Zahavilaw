#!/usr/bin/env node
/* ----------------------------------------------------------------------------
 * Monday.com board bootstrapper for the Zahavi Law website.
 *
 * Creates a leads board with the columns the contact form needs, then prints
 * the exact environment variables to paste into `.env.local`.
 *
 * Usage:
 *   MONDAY_API_TOKEN=xxxxx node scripts/setup-monday.mjs
 *
 * Safe to read first: it only CREATES a new board (it never deletes anything).
 * Re-running it creates another, separate board.
 * -------------------------------------------------------------------------- */

const API_URL = "https://api.monday.com/v2";
const API_VERSION = "2024-10";

const token = process.env.MONDAY_API_TOKEN;
if (!token) {
  console.error(
    "\n✖ חסר טוקן. הריצו כך:\n" +
      "   MONDAY_API_TOKEN=<הטוקן-שלכם> node scripts/setup-monday.mjs\n",
  );
  process.exit(1);
}

const BOARD_NAME = "לידים מהאתר – משרד עורכי דין זהבי";
const GROUP_NAME = "פניות חדשות מהאתר";

// field = the key our app uses; matches MONDAY_COLUMN_MAP in src/lib/monday.ts.
const COLUMNS = [
  { field: "phone", title: "טלפון", type: "text" },
  { field: "email", title: "אימייל", type: "email" },
  { field: "subject", title: "נושא הפנייה", type: "text" },
  { field: "message", title: "תיאור הפנייה", type: "long_text" },
  { field: "preferredTime", title: "מועד מועדף לפגישה", type: "text" },
  { field: "locale", title: "שפת הפנייה", type: "text" },
  { field: "source", title: "מקור", type: "text" },
  // Pipeline status — not filled by the form; manage it inside Monday.
  { field: null, title: "סטטוס טיפול", type: "status" },
];

async function gql(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": API_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length || json.error_message) {
    const msg =
      json.errors?.map((e) => e.message).join("; ") || json.error_message;
    throw new Error(msg);
  }
  return json.data;
}

async function main() {
  console.log("\n⏳ מתחבר ל-Monday ובודק את הטוקן...");
  const me = await gql(`query { me { name email } }`);
  console.log(`✓ מחובר כ-${me.me.name} (${me.me.email})`);

  console.log(`⏳ יוצר לוח: "${BOARD_NAME}"...`);
  const board = await gql(
    `mutation ($name: String!) {
       create_board(board_name: $name, board_kind: public) { id }
     }`,
    { name: BOARD_NAME },
  );
  const boardId = board.create_board.id;
  console.log(`✓ נוצר לוח (ID: ${boardId})`);

  console.log(`⏳ יוצר קבוצה: "${GROUP_NAME}"...`);
  const group = await gql(
    `mutation ($boardId: ID!, $name: String!) {
       create_group(board_id: $boardId, group_name: $name) { id }
     }`,
    { boardId, name: GROUP_NAME },
  );
  const groupId = group.create_group.id;
  console.log(`✓ נוצרה קבוצה (ID: ${groupId})`);

  const columnMap = {};
  for (const col of COLUMNS) {
    const created = await gql(
      `mutation ($boardId: ID!, $title: String!, $type: ColumnType!) {
         create_column(board_id: $boardId, title: $title, column_type: $type) {
           id
         }
       }`,
      { boardId, title: col.title, type: col.type },
    );
    const id = created.create_column.id;
    if (col.field) columnMap[col.field] = id;
    console.log(`✓ עמודה "${col.title}" (${col.type}) → ${id}`);
  }

  const envLines = [
    "",
    "─".repeat(64),
    "✅  הלוח מוכן! העתיקו את השורות הבאות אל הקובץ .env.local :",
    "─".repeat(64),
    `MONDAY_API_TOKEN=${token}`,
    `MONDAY_BOARD_ID=${boardId}`,
    `MONDAY_GROUP_ID=${groupId}`,
    `MONDAY_COLUMN_MAP=${JSON.stringify(columnMap)}`,
    "─".repeat(64),
    `🔗  פתחו את הלוח: https://view.monday.com/boards/${boardId}`,
    "",
  ];
  console.log(envLines.join("\n"));
}

main().catch((err) => {
  console.error(`\n✖ שגיאה: ${err.message}\n`);
  process.exit(1);
});
