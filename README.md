# slack2cord 2022
 Joins slack and discord channels together

![](https://i.imgur.com/CbFORRc.gif)

If you would like a full tutorial on setting this up (the hard stuff like the api keys, etc) please contact **Asptu#0003** on discord and I can guide you through the process.

## Requires

- git (https://git-scm.com/)
- Node.js (https://nodejs.org/en/)
- Basic javascript understanding 

## Usage

Start off by cloning the respository by going

```
git clone https://github.com/asptu/slack2cord
```

Then cd to the repo and run 

```
npm install
```

Remove example from the 'example' from your .env file and then paste the matching values within

Setup your channel arrays properly in app.js and then run

```
node .
```

If all has been done correctly then it should be working, if not contact **Asptu#0003** on discord

## Todo

- Make a cache list for slack users profile pictures and names as getting them in the first place is quite a slow process
- Support for slack attachments to discord?
- Maybe redoing how slack to discord threads work as they're kinda weird

Heavily inspired by https://github.com/HackSoc/slack-discord-bridge