const { App } = require("@slack/bolt");
const { WebClient } = require("@slack/web-api");
const { Client, Intents, WebhookClient } = require("discord.js");

require("dotenv").config();

const slack_web = new WebClient(process.env.SLACK_BOT_TOKEN);
const discord_client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

const slack_app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

slack_app.event("message", async ({ message }) => {

  // Make an array of all the slack channel ids in your workspace and then an array with all of the webhooks links then Position 1 of slack array will match with Position 1 in discord array

  // Example:
  var slackChats = [
    'DJSJSDDS',
    'DSJKDJKS'
  ];
  // Example:
  var discordChats = [
    "https://discord.com/api/webhooks/8958934859340435/fhjsdjkfsd87f7823fdysfsd",
    "https://discord.com/api/webhooks/8958934859340435/5488543uhdsfsd8fv234f83478f",
  ];

  if (slackChats.indexOf(message.channel) > -1) {
    let n_discordchats = slackChats.lastIndexOf(message.channel);

    if (message.attachments) if (message.type.bot) return;
    if (message.text == null || undefined) return;
    if (message.text == "") return;
    if (message.text.includes("@everyone" || "@here")) return;

    const webhookClient = new WebhookClient({
      url: discordChats[n_discordchats],
    });

    let p = await slack_app.client.users.profile.get({ user: message.user });

    if (message.parent_user_id !== undefined) {
      let pThread = await slack_app.client.users.profile.get({
        user: message.parent_user_id,
      });

      webhookClient.send({
        content: `**Replying to ${pThread.profile.display_name} ⇒** ${message.text}`,
        username: `Slack: ${p.profile.display_name}`,
        avatarURL: p.profile.image_192,
      });
    } else {
      webhookClient.send({
        content: message.text,
        username: `Slack: ${p.profile.display_name}`,
        avatarURL: p.profile.image_192,
      });
    }
  }
});

discord_client.on("messageCreate", (message) => {

  // Make an array of all the slack channel ids in your workspace and then an array with all of the channel ids then Position 1 of slack array will match with Position 1 in discord array

// Example: (same as channel ids above)
  var slackChats = [
    "DJSJSDDS",
    "DSJKDJKS",
  ];
  // Example
  var discordChats = [
    "478958934758973894",
    "438756345873589783",
  ];

  if (discordChats.indexOf(message.channel.id) > -1) {
    let n_slackchats = discordChats.lastIndexOf(message.channel.id);

    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.includes("<!channel>" || "<!here>"))
      return message.delete();
    let AvatarURL1 = message.member.displayAvatarURL().slice(0, -4);
    let AvatarURL2 = AvatarURL1.concat("png");
    if (message.attachments.size > 0) {
      message.attachments.forEach((attachment) => {
        const ImageLink = attachment.proxyURL;

        if (message.member.nickname == null) {
          slack_web.chat.postMessage({
            channel: slackChats[n_slackchats],
            text: ImageLink,
            username: `Discord: ${message.author.username}`,
            icon_url: AvatarURL2,
          });
        } else {
          slack_web.chat.postMessage({
            channel: slackChats[n_slackchats],
            text: ImageLink,
            username: `Discord: ${message.member.nickname}`,
            icon_url: AvatarURL2,
          });
        }
      });
    }

    if (message.content == null || undefined) return;
    if (message.content == "") return;
    if (message.member.nickname == null) {
      slack_web.chat.postMessage({
        channel: slackChats[n_slackchats],
        text: message.content,
        username: `Discord: ${message.author.username}`,
        icon_url: AvatarURL2,
      });
    } else {
      slack_web.chat.postMessage({
        channel: slackChats[n_slackchats],
        text: message.content,
        username: `Discord: ${message.member.nickname}`,
        icon_url: AvatarURL2,
      });
    }
  }
});

discord_client.once("ready", () => {
  console.log("Discord is up!");
});

(async () => {
  // Start your app
  await slack_app.start();

  console.log("Slack is up!");
})();

discord_client.login(process.env.DISCORD_BOT_TOKEN);
