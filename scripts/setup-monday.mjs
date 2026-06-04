#!/usr/bin/env node
/* ----------------------------------------------------------------------------
 * Monday.com board bootstrapper for the Zahavi Law website.
 *
 * Creates a leads board with the columns the contact form needs, then writes
 * the matching variables straight into `.env.local` (and prints them too).
 *
 * Usage (any of these):
 *   npm run setup:monday                 → asks for the token interactively
 *   npm run setup:monday -- <API_TOKEN>  → token as an argument
 *   MONDAY_API_TOKEN=<token> npm run setup:monday
 *
 * Safe to read first: it only CREATES a new board (it never deletes anything).
 * -------------------------------------------------------------------------- */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const API_URL = "https://api.monday.com/v2";
const API_VERSION = "2024-10";
const SITE_URL = "https://www.zahavilaw.com";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, "..", ".env.local");

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

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    }),
  );
}

async function getToken() {
  const fromArg = process.argv[2];
  if (fromArg) return fromArg.trim();
  if (process.env.MONDAY_API_TOKEN) return process.env.MONDAY_API_TOKEN.trim();
  const entered = await ask("\nהדביקו כאן את ה-API Token של Monday ולחצו Enter:\n> ");
  return entered;
}

async function gql(token, query, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": API_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(
      `התקבלה תשובה לא צפויה מהשרת (קוד ${res.status}). ` +
        `ודאו שיש חיבור לאינטרנט ושהטוקן תקין.`,
    );
  }
  if (json.errors?.length || json.error_message) {
    const msg =
      json.errors?.map((e) => e.message).join("; ") || json.error_message;
    throw new Error(msg);
  }
  return json.data;
}

/** Write the managed keys into .env.local, preserving any other lines. */
function writeEnvFile(vars) {
  const managed = Object.keys(vars);
  let preserved = "";
  if (fs.existsSync(ENV_PATH)) {
    fs.copyFileSync(ENV_PATH, `${ENV_PATH}.bak`);
    preserved = fs
      .readFileSync(ENV_PATH, "utf8")
      .split(/\r?\n/)
      .filter((line) => {
        const key = line.split("=")[0].trim();
        return key && !managed.includes(key);
      })
      .join("\n")
      .trim();
  }
  const block = managed.map((k) => `${k}=${vars[k]}`).join("\n");
  const content = (preserved ? `${preserved}\n\n` : "") + block + "\n";
  fs.writeFileSync(ENV_PATH, content, "utf8");
}

async function main() {
  const token = await getToken();
  if (!token) {
    console.error("\n✖ לא הוזן טוקן. צאו והריצו שוב.\n");
    process.exit(1);
  }

  console.log("\n⏳ מתחבר ל-Monday ובודק את הטוקן...");
  const me = await gql(token, `query { me { name email } }`);
  console.log(`✓ מחובר כ-${me.me.name} (${me.me.email})`);

  console.log(`⏳ יוצר לוח: "${BOARD_NAME}"...`);
  const board = await gql(
    token,
    `mutation ($name: String!) {
       create_board(board_name: $name, board_kind: public) { id }
     }`,
    { name: BOARD_NAME },
  );
  const boardId = board.create_board.id;
  console.log(`✓ נוצר לוח (ID: ${boardId})`);

  console.log(`⏳ יוצר קבוצה: "${GROUP_NAME}"...`);
  const group = await gql(
    token,
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
      token,
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

  const vars = {
    NEXT_PUBLIC_SITE_URL: SITE_URL,
    MONDAY_API_TOKEN: token,
    MONDAY_BOARD_ID: boardId,
    MONDAY_GROUP_ID: groupId,
    MONDAY_COLUMN_MAP: JSON.stringify(columnMap),
  };
  writeEnvFile(vars);

  console.log(
    [
      "",
      "─".repeat(64),
      `✅  הכול מוכן! הקובץ .env.local נכתב אוטומטית עם הערכים:`,
      "─".repeat(64),
      ...Object.entries(vars).map(([k, v]) => `${k}=${v}`),
      "─".repeat(64),
      `🔗  הלוח שלך: https://view.monday.com/boards/${boardId}`,
      "",
      "הצעד הבא: הריצו  npm run dev  ומלאו את הטופס באתר כדי לבדוק שהפנייה",
      "נכנסת ללוח. (כדי לפרוס לאוויר — הוסיפו את אותם משתנים בהגדרות האירוח.)",
      "",
    ].join("\n"),
  );
}

main().catch((err) => {
  console.error(`\n✖ שגיאה: ${err.message}\n`);
  process.exit(1);
});
