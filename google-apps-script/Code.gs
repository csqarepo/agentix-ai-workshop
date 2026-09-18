/**
 * Saves AgentiX workshop registrations to this Google Sheet.
 * Setup steps are in the project README.
 */
const SHEET_NAME = "Registrations";
const HEADERS = [
  "Submitted at", "Status", "Full name", "Work email", "Company", "Role", "AI experience",
  "Preferred agent", "LinkedIn", "Teammates", "Dietary needs", "Consent", "Duplicate email", "Notes",
  "Phone number", "Built AI workflow, automation, or agent", "AI usage statement", "Personal AI tool access"
];
const FIELDS = ["name", "email", "company", "role", "experience", "agent", "linkedin", "teammates", "dietary", "consent"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);
    if (!data.name || !data.email || !data.phone || !data.company || !data.role || !data.aiBuilt || !data.aiToolAccess) {
      return json({ok: false, error: "Missing required fields"});
    }

    const sheet = getSheet();
    const email = String(data.email).trim().toLowerCase();
    const emails = sheet.getLastRow() > 1 ? sheet.getRange(2, 4, sheet.getLastRow() - 1, 1).getValues().flat().map(v => String(v).toLowerCase()) : [];

    sheet.appendRow([
      new Date(), "Pending",
      ...FIELDS.map(f => clean(f === "email" ? email : data[f])),
      emails.includes(email) ? "Yes" : "", "",
      clean(data.phone), clean(data.aiBuilt), clean(data.aiStatement), clean(data.aiToolAccess)
    ]);
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
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#0d1333").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(["Pending", "Approved", "Rejected", "Paid", "Ticket sent"], true).build();
    sheet.getRange("B2:B").setDataValidation(rule);
  } else if (sheet.getLastColumn() < HEADERS.length) {
    const missing = HEADERS.slice(sheet.getLastColumn());
    sheet.getRange(1, sheet.getLastColumn() + 1, 1, missing.length).setValues([missing]).setFontWeight("bold").setBackground("#0d1333").setFontColor("#ffffff");
  }
  return sheet;
}

// Stops values starting with = + - @ from running as formulas in the Sheet.
function clean(v) {
  const s = String(v == null ? "" : v).trim().slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
