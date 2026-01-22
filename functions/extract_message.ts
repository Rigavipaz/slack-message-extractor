import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ExtractMessageFunction = DefineFunction({
  callback_id: "extract_message_function",
  source_file: "functions/extract_message.ts",
  title: "Extract Message",
  input_parameters: {
    properties: {
      message_ts: {
        type: Schema.types.string,
        title: "Timestamp of message"
      },
      channel_id: {
        type: Schema.types.string,
        title: "ID of channel"
      }
    },
    required: ["message_ts", "channel_id"],
  },
  output_parameters: {
    properties: {
      message_text: {
        type: Schema.types.string,
      }
    },
    required: ["message_text"],
  }
});

export default SlackFunction(
  ExtractMessageFunction,
  async ({ inputs, client }) => {
    let { message_ts, channel_id } = inputs;

    console.log(`DEBUG: Input received: ${channel_id}`);

    // --- THE "SNIPPER" LOGIC ---
    // This regex looks for a 'C' followed by 7-11 characters (the standard Slack ID format)
    const idMatch = channel_id.match(/(C[A-Z0-9]{7,11})/);

    if (idMatch) {
      channel_id = idMatch[0]; // This turns the URL into 'C0568GKR1GD'
      console.log(`DEBUG: Extracted Clean ID: ${channel_id}`);
    } else if (channel_id.startsWith("#")) {
      return { error: `Cannot use channel name (${channel_id}). Please provide a Link or ID.` };
    }
    // ----------------------------

    const response = await client.conversations.replies({
      channel: channel_id,
      ts: message_ts,
      limit: 1,
      inclusive: true,
    });

    if (!response.ok) {
      console.log(`API ERROR: ${response.error}`);
      return { error: `Slack API Error: ${response.error}. (ID used: ${channel_id})` };
    }

    return {
      outputs: {
        message_text: response.messages[0]?.text || "No text found",
      },
    };
  }
);