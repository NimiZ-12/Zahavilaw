import "server-only";

/* ----------------------------------------------------------------------------
   Monday.com CRM integration
   ---------------------------------------------------------------------------
   New leads submitted through the contact form are pushed into a Monday board
   as items via the Monday GraphQL API (https://developer.monday.com).

   Required environment variables (see .env.example):
     MONDAY_API_TOKEN   – API token from monday.com (Admin → API)
     MONDAY_BOARD_ID    – numeric id of the leads board
     MONDAY_GROUP_ID    – (optional) group to create items in, e.g. "topics"

   Column mapping is configured with MONDAY_COLUMN_MAP, a JSON object mapping
   our lead fields to the column ids on your board, for example:
     {"email":"email_1","phone":"phone_1","subject":"text_1",
      "message":"long_text_1","preferredTime":"text_2","locale":"text_3",
      "source":"text_4"}
   Any field whose column id is not provided is simply skipped, so the
   integration degrades gracefully while you finish building the board.
---------------------------------------------------------------------------- */

const MONDAY_API_URL = "https://api.monday.com/v2";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredTime?: string;
  locale: string;
  source: string;
}

export interface MondayResult {
  ok: boolean;
  /** True when env vars are missing — the lead was accepted but not synced. */
  skipped?: boolean;
  itemId?: string;
  error?: string;
}

type ColumnMap = Partial<Record<keyof Lead, string>>;

function readColumnMap(): ColumnMap {
  const raw = process.env.MONDAY_COLUMN_MAP;
  if (!raw) return {};
  try {
    return JSON.parse(raw) as ColumnMap;
  } catch {
    console.warn("[monday] MONDAY_COLUMN_MAP is not valid JSON — ignoring it");
    return {};
  }
}

/** Build the column_values object Monday expects, keyed by real column ids. */
function buildColumnValues(lead: Lead, map: ColumnMap): Record<string, unknown> {
  const values: Record<string, unknown> = {};

  const set = (field: keyof Lead, value: unknown) => {
    const columnId = map[field];
    if (columnId && value) values[columnId] = value;
  };

  // Monday's typed columns expect specific shapes.
  if (map.email) values[map.email] = { email: lead.email, text: lead.email };
  if (map.phone) values[map.phone] = lead.phone;
  set("subject", lead.subject);
  set("message", lead.message);
  set("preferredTime", lead.preferredTime);
  set("locale", lead.locale);
  set("source", lead.source);

  return values;
}

export async function createMondayLead(lead: Lead): Promise<MondayResult> {
  const token = process.env.MONDAY_API_TOKEN;
  const boardId = process.env.MONDAY_BOARD_ID;

  // Without credentials we accept the lead but don't sync — keeps dev working.
  if (!token || !boardId) {
    console.info(
      "[monday] Skipping CRM sync — MONDAY_API_TOKEN / MONDAY_BOARD_ID not set",
    );
    return { ok: true, skipped: true };
  }

  const groupId = process.env.MONDAY_GROUP_ID;
  const columnValues = buildColumnValues(lead, readColumnMap());

  const query = `
    mutation CreateLead(
      $boardId: ID!
      $groupId: String
      $itemName: String!
      $columnValues: JSON
    ) {
      create_item(
        board_id: $boardId
        group_id: $groupId
        item_name: $itemName
        column_values: $columnValues
        create_labels_if_missing: true
      ) {
        id
      }
    }
  `;

  const variables = {
    boardId,
    groupId: groupId ?? null,
    itemName: lead.name,
    columnValues: JSON.stringify(columnValues),
  };

  try {
    const response = await fetch(MONDAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "API-Version": "2024-01",
      },
      body: JSON.stringify({ query, variables }),
      // Never cache a mutation.
      cache: "no-store",
    });

    const payload = (await response.json()) as {
      data?: { create_item?: { id?: string } };
      errors?: { message: string }[];
      error_message?: string;
    };

    if (!response.ok || payload.errors?.length || payload.error_message) {
      const message =
        payload.errors?.map((e) => e.message).join("; ") ||
        payload.error_message ||
        `Monday API responded with ${response.status}`;
      console.error("[monday] Lead sync failed:", message);
      return { ok: false, error: message };
    }

    return { ok: true, itemId: payload.data?.create_item?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[monday] Lead sync threw:", message);
    return { ok: false, error: message };
  }
}
