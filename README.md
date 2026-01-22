Slack Message Extractor
This app provides a custom workflow step to capture Slack message text and send it to other tools like Google Sheets. It is designed to solve the common issue where Slack Workflow Builder provides a "Message Link" instead of a "Channel ID."

Guide Outline:

Setup

Install the Slack CLI

Deploying the App

Running Your Project Locally

Workflow Configuration

Viewing Activity Logs

Project Structure

Setup
Before getting started, make sure you have a development workspace where you have permission to install apps. Please note that the features in this project require that the workspace be part of a Slack paid plan.

Install the Slack CLI
To use this project, you need to install the Slack CLI and Deno.

For Mac / Linux:

Install Deno
$ curl -fsSL https://deno.land/install.sh | sh

Install Slack CLI
$ curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash

For Windows (PowerShell):

Install Deno
$ irm https://deno.land/install.ps1 | iex

Install Slack CLI
$ irm https://downloads.slack-edge.com/slack-cli/install-windows.ps1 | iex

Deploying the App
Once you have cloned this repository, login to your Slack account and deploy the app:

Login to your Slack workspace
$ slack login

Deploy the app to Slack's infrastructure
$ slack deploy

Running Your Project Locally
While building or testing, you can see changes in real-time with slack run. An app is the development version if the name has the string (local) appended.

Run app locally
$ slack run

Workflow Configuration
After deploying, you must set up the workflow in Slack's Workflow Builder:

Create a new Workflow (e.g., triggered by an Emoji Reaction).

Add the Extract Message step.

Map the Timestamp to: API timestamp of the reacted message.

Map the Channel ID to: Link to the message that was reacted to.

Important: You must invite the app to any channel where you want it to work by typing /invite @Extract Message.

Viewing Activity Logs
You can view the production logs of your application as they occur with the following command:

$ slack activity --tail

Project Structure
functions/
Contains extract_message.ts, which is the custom logic that pulls the text from a message. It includes a "Smart Extraction" feature to handle raw message links.

manifest.ts
The app manifest contains the configuration, including the botScopes (permissions) required to read message history.

assets/
Contains the app icon used when the app is installed in your workspace.

.gitignore
Ensures that local Slack metadata (.slack/) and system files are not uploaded to your repository.