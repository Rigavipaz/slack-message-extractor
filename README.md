# Slack Message Extractor (Pinterest Production Edition)

The **Slack Message Extractor** is a high-integrity Slack Automation app designed for "Smart Extraction." It bridges the gap between Slack's Workflow Builder and external systems (like Google Sheets) by transforming a standard Message Link into actionable, audited data.

---

## 🛡️ Security & Compliance (CorpSec Overview)
This application was built with a **Fail-Closed** architecture, ensuring data privacy and user accountability are enforced at the code level.

### 1. Privacy Guardrails (Public-Only Policy)
Unlike basic extractors, this app performs a metadata check via `conversations.info` to verify the `is_private` status of a channel.
* **Metadata Enforcement:** Even if the bot is invited to a private channel, the function will block the extraction and notify the user that only Public channels are supported in v1.
* **Scope Restriction:** The `manifest.ts` explicitly excludes `groups:history` (Private Channels) and `im:history` (Direct Messages) to follow the Principle of Least Privilege.

### 2. Mandatory User Attestation
To meet Pinterest's data handling requirements, the app enforces a **Preflight Notice**:
* **Ephemeral Notice:** An unskippable legal disclaimer is sent to the user triggering the extraction.
* **Responsibility Mapping:** If the notice cannot be delivered, the app terminates the process before any message content is read.

### 3. Auditability & Accountability
Every extraction creates a permanent "Paper Trail" in the destination (e.g., Google Sheets):
* **Actor ID:** Logs exactly who triggered the extraction (Extracted by).
* **Author ID:** Logs the original creator of the message (Message Author).
* **Reactor Validation:** The app verifies that the user triggering the workflow is the same user who applied the emoji reaction, preventing unauthorized data movement.

---

## 🔑 Permissions (Least Privilege Model)

| Scope | Purpose | Security Control |
| :--- | :--- | :--- |
| `channels:history` | To read the text of the target message. | Limited to Public channels only. |
| `channels:read` | To verify `is_private` status. | Used to block private channel data. |
| `chat:write` | To deliver the Ephemeral Preflight Notice. | Visible only to the user moving the data. |

---

## 🚀 Deployment & Migration

### Environment Sync
To ensure the bot identity is correct for the Pinterest Workspace:
1. **Reset Identity:** Delete the local `.slack/` folder.
2. **Login:** Run `slack login` and select the **Pinterest Grid/Workspace**.
3. **Deploy:** Run `slack deploy` to host the app on Slack's secure infrastructure.

### Workflow Setup
1. **Invite:** `/invite @Extract Message` to the target public channel.
2. **Trigger:** Configure a workflow using the **Emoji Reaction** trigger.
3. **Map Variables:**
    * **Message Link:** Map to the "Link to message" variable.
    * **Actor User ID:** Map to the "User who reacted" variable.
    * **Reaction Name:** Map to "The reaction used."

---

## 📂 Project Structure
* `manifest.ts`: Defines strict bot scopes and application metadata.
* `functions/extract_message.ts`: Core logic containing the **Privacy Guard** and **Reactor Validation**.
* `assets/`: Official application branding and icons.
* `.gitignore`: Configured to prevent the leakage of `.slack/` App IDs or local Deno credentials.
