# Slack Message Extractor

The **Slack Message Extractor** provides a custom workflow step to capture Slack message text and send it to external tools like Google Sheets. It is specifically designed to solve the common issue where Slack Workflow Builder provides a "Message Link" instead of a raw "Channel ID."

---

## 📋 Table of Contents
* [Setup](#setup)
* [Install the Slack CLI](#install-the-slack-cli)
* [Deploying the App](#deploying-the-app)
* [Running Your Project Locally](#running-your-project-locally)
* [Workflow Configuration](#workflow-configuration)
* [Viewing Activity Logs](#viewing-activity-logs)
* [Project Structure](#project-structure)

---

## 🛠 Setup
Before getting started, ensure you have a development workspace where you have permission to install apps. 

> **Note:** The features in this project require that the workspace be part of a **Slack paid plan**.

### Install the Slack CLI
To use this project, you need to install the **Slack CLI** and **Deno**.

#### For Mac / Linux:
* **Install Deno:** `curl -fsSL https://deno.land/install.sh | sh`
* **Install Slack CLI:** `curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash`

#### For Windows (PowerShell):
* **Install Deno:** `irm https://deno.land/install.ps1 | iex`
* **Install Slack CLI:** `irm https://downloads.slack-edge.com/slack-cli/install-windows.ps1 | iex`

---

## 🚀 Deploying the App
Once you have cloned this repository, login to your Slack account and deploy the app:

1. **Login to your Slack workspace:** `slack login`
2. **Deploy the app to Slack's infrastructure:** `slack deploy`

### Running Your Project Locally
While building or testing, you can see changes in real-time. An app is recognized as the development version if the name has the string `(local)` appended.
* **Run app locally:** `slack run`

---

## ⚙️ Workflow Configuration
After deploying, you must set up the workflow in Slack's **Workflow Builder**:

1. Create a new Workflow (e.g., triggered by an **Emoji Reaction**).
2. Add the **Extract Message** step.
3. **Map the Timestamp to:** `API timestamp of the reacted message`.
4. **Map the Channel ID to:** `Link to the message that was reacted to`.

> **Important:** You must invite the app to any channel where you want it to work by typing `/invite @Extract Message`.

---

## 📊 Viewing Activity Logs
You can view the production logs of your application in real-time with the following command:
`slack activity --tail`

---

## 📂 Project Structure

| File/Folder | Description |
| :--- | :--- |
| `functions/` | Contains `extract_message.ts`, the custom logic that pulls text from a message. Includes "Smart Extraction" to handle raw message links. |
| `manifest.ts` | The app manifest containing configuration and `botScopes` (permissions) required to read message history. |
| `assets/` | Contains the app icon used when the app is installed in your workspace. |
| `.gitignore` | Prevents local Slack metadata (`.slack/`) and system files from being uploaded to your repository. |
