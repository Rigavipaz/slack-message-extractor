# Slack Message Extractor (Pinterest Edition)

The **Slack Message Extractor** is a custom Slack Automation app that enables "Smart Extraction" of message content. It solves the technical limitation where Slack's Workflow Builder provides a "Message Link" instead of the raw IDs required for external integrations like Google Sheets.

---

## Table of Contents
* [Security & Scopes (CorpSec Overview)](#security--scopes-corpsec-overview)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Setup & Environment Migration](#setup--environment-migration)
* [Deployment Modes](#deployment-modes)
* [Workflow Configuration](#workflow-configuration)
* [Viewing Activity Logs](#viewing-activity-logs)
* [Project Structure](#project-structure)

---

## Security & Scopes (CorpSec Overview)
This app follows the principle of **Least Privilege**. It cannot scan your workspace or read messages automatically.

| Scope | Purpose | Security Guardrail |
| :--- | :--- | :--- |
| `channels:history` | To read the text of a message when triggered. | Only active in Public channels where the bot is invited. |
| `groups:history` | To read text in private channels/war rooms. | Only active in Private channels where the bot is invited. |
| `chat:write` | Allows the bot to post confirmation messages. | Limited to specific workflow responses. |
| `channels:read` | To identify channel names/metadata. | Read-only access to basic channel info. |

> **Note:** The bot has **zero access** to any channel until a user explicitly runs the `/invite @AppName` command.

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

### For Windows (PowerShell):
* **Install Deno:** `irm https://deno.land/install.ps1 | iex`
* **Install Slack CLI:** `irm https://downloads.slack-edge.com/slack-cli/install-windows.ps1 | iex`

---

## Setup & Environment Migration
To move this app between **Personal**, **Sandbox**, and **Production** environments, follow these steps to ensure App IDs do not conflict.

### 1. Fresh Start (Identity Reset)
If you are cloning this to a new workspace (e.g., Pinterest Prod):
1. **Delete the `.slack/` folder** if it exists in your directory. This folder stores the unique App ID; deleting it allows you to create a brand new bot identity.
2. **Initialize:** Run `slack init`. When asked "Do you want to add an existing app?", select **No**.

### 2. Workspace Authentication
You must authorize the CLI for each specific Slack Grid/Workspace:
* **Command:** `slack login`.
* **Action:** In the browser window that opens, use the dropdown in the top-right to select the specific **Pinterest Workspace**.

---

## Deployment Modes

### Testing (Sandbox)
Use this to see changes in real-time. The app will appear in Slack with a **(local)** suffix.
* **Command:** `slack run`.
* *Note: The app only works while this terminal command is running.*

### Production (Pinterest)
Use this to host the app permanently on Slack’s infrastructure.
* **Command:** `slack deploy`.
* *Note: This version runs 24/7 on Slack's servers and does not require your local machine to stay online.*

---

## Workflow Configuration
After deploying, you must configure the step in **Slack Workflow Builder**:

1. **Invite the Bot:** Go to your target channel and type `/invite @Extract Message`.
2. **Add Step:** Create a new Workflow (e.g., triggered by an Emoji Reaction) and add the **Extract Message** step.
3. **Smart Mapping:**
    * **Timestamp:** Map to `API timestamp of the reacted message`.
    * **Channel ID:** Map to `Link to the message` (Our custom logic extracts the ID from this link).
4. **Output:** The "Extracted Text" variable can now be sent to Google Sheets or other steps.

---

## Viewing Activity Logs
To monitor your production application in real-time or troubleshoot errors:
`slack activity --tail`.

---

## Project Structure

| File/Folder | Description |
| :--- | :--- |
| `functions/` | Contains `extract_message.ts`, the custom logic that pulls text from a message and parses raw links. |
| `manifest.ts` | The app manifest containing configuration and `botScopes` (permissions). |
| `assets/` | Contains the app icon used when the app is installed. |
| `.slack/` | **(Hidden)** Contains the unique App ID and hooks. **Do not commit to Git**. |
| `.gitignore` | Prevents local metadata and system files from being uploaded to your repository. |
