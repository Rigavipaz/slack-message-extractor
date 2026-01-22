import { Manifest } from "deno-slack-sdk/mod.ts";

import { ExtractMessageFunction } from "./functions/extract_message.ts";

export default Manifest({
  name: "Extract Message",
  description: "A workflow step to extract message text",
  icon: "assets/default_new_app_icon.png",
  functions: [ExtractMessageFunction],
  workflows: [],
  outgoingDomains: [],
  botScopes: [
    "channels:history", // For public channels
    "groups:history",   // For private channels
    "chat:write",       // Optional: if you want the bot to post a confirmation
    "channels:read",
  ]
});