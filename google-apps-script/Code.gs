/**
 * Saves AgentiX workshop registrations to this Google Sheet.
 * Setup steps are in the project README.
 *
 * Rows are written by column header, not position, so you can reorder
 * or delete columns in the Sheet without breaking new registrations.
 */
const SHEET_NAME = "Registrations";

// Sheet column header -> form field name (null = filled by this script)
const COLUMNS = [
  ["Submitted at", null],
  ["Status", null],
  ["Full name", "name"],
  ["Personal email", "email"],
  ["Phone number", "phone"],
  ["Company", "company"],
  ["Role", "role"],
  ["AI experience", "experience"],
  ["Built AI workflow, automation, or agent", "aiBuilt"],
  ["Personal AI tool access", "aiToolAccess"],
  ["LinkedIn", "linkedin"],
  ["Consent", "consent"],
  ["Duplicate email", null]
];
const HEADERS = COLUMNS.map(c => c[0]);
const REQUIRED = ["name", "email", "phone", "company", "role", "aiBuilt", "aiToolAccess"];

// Columns from earlier versions of the form. Run removeRetiredColumns() once to delete them.
const RETIRED = ["Preferred agent", "Teammates", "Dietary needs", "Notes", "AI usage statement"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);
    if (REQUIRED.some(f => !data[f])) return json({ok: false, error: "Missing required fields"});

    const sheet = getSheet();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const email = String(data.email).trim().toLowerCase();

    const emailCol = headers.indexOf("Personal email") + 1;
    const emails = sheet.getLastRow() > 1 && emailCol
      ? sheet.getRange(2, emailCol, sheet.getLastRow() - 1, 1).getValues().flat().map(v => String(v).toLowerCase())
      : [];

    const values = {
      "Submitted at": new Date(),
      "Status": "Pending",
      "Duplicate email": emails.includes(email) ? "Yes" : ""
    };
    COLUMNS.forEach(([header, field]) => {
      if (field) values[header] = clean(field === "email" ? email : data[field]);
    });

    sheet.appendRow(headers.map(h => h in values ? values[h] : ""));
    return json({ok: true});
  } catch (err) {
    return json({ok: false, error: String(err)});
  } finally {
    lock.releaseLock();
  }
}

// Visiting the web app URL in a browser shows this, which confirms the deployment works.
function doGet() {
  return json({ok: true, message: "AgentiX registration endpoint is running"});
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    styleHeader(sheet.getRange(1, 1, 1, HEADERS.length));
    sheet.setFrozenRows(1);
  } else {
    // Rename the old "Work email" header, then add any headers the Sheet is missing.
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const workEmail = headers.indexOf("Work email");
    if (workEmail >= 0 && !headers.includes("Personal email")) {
      sheet.getRange(1, workEmail + 1).setValue("Personal email");
      headers[workEmail] = "Personal email";
    }
    const missing = HEADERS.filter(h => !headers.includes(h));
    if (missing.length) styleHeader(sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]));
  }

  const statusCol = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].indexOf("Status") + 1;
  if (statusCol) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(["Pending", "Approved", "Rejected", "Paid", "Ticket sent"], true).build();
    sheet.getRange(2, statusCol, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  }
  return sheet;
}

/**
 * One-time cleanup: deletes the retired columns (and their data) from the Sheet.
 * Run it from the Apps Script editor: pick removeRetiredColumns in the toolbar, then Run.
 */
function removeRetiredColumns() {
  const sheet = getSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  // Delete right to left so column positions don't shift under us.
  const removed = [];
  for (let i = headers.length - 1; i >= 0; i--) {
    if (RETIRED.includes(headers[i])) { sheet.deleteColumn(i + 1); removed.push(headers[i]); }
  }
  Logger.log(removed.length ? "Removed: " + removed.join(", ") : "Nothing to remove");
}

function styleHeader(range) {
  range.setFontWeight("bold").setBackground("#0d1333").setFontColor("#ffffff");
}

// Stops values starting with = + - @ from running as formulas in the Sheet.
function clean(v) {
  const s = String(v == null ? "" : v).trim().slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
