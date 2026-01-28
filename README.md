# Slack Message Extractor (Pinterest Edition)

The **Slack Message Extractor** is a custom Slack Automation app that enables "Smart Extraction" of message content. It solves the technical limitation where Slack's Workflow Builder provides a "Message Link" instead of the raw IDs required for external integrations like Google Sheets.

---

## Table of Contents
* [Security & Scopes (CorpSec Overview)](#security--scopes-corpsec-overview)
* [Privacy & Compliance Guardrails](#privacy--compliance-guardrails)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Setup & Environment Migration](#setup--environment-migration)
* [Deployment Modes](#deployment-modes)
* [Workflow Configuration](#workflow-configuration)
* [Project Structure](#project-structure)

---

## Security & Scopes (CorpSec Overview)
This app follows the principle of **Least Privilege**. It cannot scan your workspace or read messages without an explicit trigger and metadata validation.

| Scope | Purpose | Security Guardrail |
| :--- | :--- | :--- |
| `channels:history` | To read the text of a message when triggered. | **Public channels only.** Locked via `conversations.info` check. |
| `channels:read` | To identify channel names/metadata. | Required to enforce the "Public-Only" privacy policy. |
| `chat:write` | Allows the bot to post ephemeral notices. | Used for mandatory legal attestation before data export. |

---

## Privacy & Compliance Guardrails
To meet Pinterest's internal security standards, this version includes three hard-coded "Safety Gates":

### 1. Privacy Guardrails (Public-Only Policy)
The app performs a real-time metadata check to verify the `is_private` status of a channel.
* **Metadata Enforcement:** If the bot is triggered in a private channel, the function "fails closed," blocks the extraction, and notifies the user that private data movement is restricted.

### 2. Mandatory User Attestation
Before any data is read or moved, the app delivers a **Preflight Notice** to the user.
* **Legal Notice:** An ephemeral disclaimer reminds the user they are now the "Data Owner" responsible for handling and retention once the data leaves Slack.

### 3. Auditability & Accountability
Every extraction creates a permanent "Paper Trail" for the CorpSec team:
* **Extractor ID:** Captures the ID of the person who triggered the workflow.
* **Author ID:** Captures the ID of the person who wrote the original message.
* **Reactor Validation:** The app verifies the trigger user actually reacted with the emoji to prevent unauthorized "shadow extraction."

---

## Prerequisites
* A Slack development workspace on a **Slack paid plan**.
* Permission to install apps within your Slack Grid/Workspace.

---

## Installation
To use this project, you need to install the **Slack CLI** and **Deno**.

### For Mac / Linux:
* **Install Deno:** `curl -fsSL https://deno.land/install.sh | sh`
* **Install Slack CLI:** `curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash`

---

## Setup & Environment Migration
To move this app between **Personal**, **Sandbox**, and **Production** environments:

1. **Delete the `.slack/` folder** to reset the unique App ID.
2. **Initialize:** Run `slack init` and select **No** for adding an existing app.
3. **Workspace Auth:** Run `slack login` and select the **Pinterest Workspace**.

---

## Deployment Modes

### Testing (Sandbox)
Use this for real-time changes. The app will appear in Slack with a **(local)** suffix.
* **Command:** `slack run`

### Production (Pinterest)
Use this to host the app permanently on Slack’s secure infrastructure.
* **Command:** `slack deploy`

---

## Workflow Configuration
1. **Invite the Bot:** Type `/invite @Extract Message` in your target public channel.
2. **Add Step:** In Workflow Builder, add the **Extract Message** step.
3. **Smart Mapping:**
    * **URL:** Map to `Link to the message`.
    * **Actor User ID:** Map to `User who reacted to the message`.
    * **Reaction Name:** Map to `The reaction used`.

---

## Project Structure
* `functions/`: Contains the logic for the **Privacy Guard** and **Attestation**.
* `manifest.ts`: Contains the restricted `botScopes`.
* `assets/`: App icons.
* `.gitignore`: Prevents leakage of private `.slack/` metadata.
