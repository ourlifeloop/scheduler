## Out of Office Notifier

Track who is out of office and notify via discord channel daily.

This project uses firebase on the backend to handle authentication, database, hosting, and the daily scheduled function.

## Setup

### Initial Setup

1. `cp .env.example .env.local`
2. `npm i && cd functions && npm i`

### Setup & Connection Firebase

3. Create a new firebase application
4. Enable email/password authentication and the Firestore database in the web interface.
5. Fill out `.env.local` with the config found in the firebase project settings.
6. `$(npm bin)/firebase login` or use your global firebase instance if you installed it globally.
7. `$(npm bin)/firebase use --add` and select the project you configured in the firebase console.

### Discord Bot Setup

7. Go to `https://discordapp.com/developers/applications/`, login, and create a new application
8. Take note of the client id
9. Create a new bot from the sidebar and take note of the token
10. Back in your project's root run...

```
$(npm bin)/firebase functions:config:set discord.token="BOT_TOKEN"
$(npm bin)/firebase functions:config:set discord.channel="CHANNEL_NAME"
```

11. Navigate in a browser to `https://discordapp.com/api/oauth2/authorize?client_id=CLIENT_ID&scope=bot&permissions=1` and replace the client id
12. `npm run deploy` in project root and ensure it's running at the given firebase domain
