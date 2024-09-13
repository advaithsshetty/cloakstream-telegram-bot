# Cloakstream Telegram Bot

This is a Telegram bot that provides URL encryption services, bringing [cloakstream website](https://proxy-download.cdxfedcxadsdcsdxz.workers.dev/) features to Telegram. It uses AES-GCM encryption to securely encrypt URLs and provides a simple interface for users to interact with the bot.

## Features

- **Encrypt URLs**: Send a URL to the bot, and it will provide an encrypted version of the URL.
- **Commands**:
  - `/start`: Welcome message with instructions.
  - `/help`: Instructions on how to use the bot.
  - `/about`: Information about the bot.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- A Telegram Bot Token (create a bot via [BotFather](https://core.telegram.org/bots#botfather))
- Basic knowledge of environment variables and encryption

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/advaithsshetty/cloakstream-telegram-bot.git
   cd cloakstream-telegram-bot
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add the following variables:

   ```env
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   ENCRYPTION_PASSWORD=your-encryption-password
   BASE_URL=https://proxy-download.cdxfedcxadsdcsdxz.workers.dev/
   PORT=5050
   ```

   Replace `your-telegram-bot-token` with the token you received from BotFather, and `your-encryption-password` with a secure password of your choice.

### Running the Bot

To start the bot, run:

```sh
node --no-deprecation bot.js
```
or
```sh
node bot.js
```

The bot will start and listen for incoming messages. It will also start a basic HTTP server on the specified port (default is 5050).

### Usage

The bot is hosted over [here](https://t.me/cloakstreambot) using daki.

- **Start the Bot**: Send `/start` to the bot to receive a welcome message.
- **Get Help**: Send `/help` to the bot to get instructions on how to use it.
- **Learn More About the Bot**: Send `/about` to get information about the bot.
- **Encrypt a URL**: Simply send a URL (starting with `http://` or `https://`) to the bot, and it will respond with the encrypted version of the URL.

## Encryption Details

The bot uses AES-GCM for encryption. The encryption process involves:
- Deriving a key from a password using PBKDF2.
- Encrypting the URL with AES-GCM.
- Returning the encrypted URL as a base64-encoded string.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) for the Telegram Bot API integration.
- [Crypto API](https://nodejs.org/api/crypto.html) for encryption utilities.

## Troubleshooting

- Ensure that your `.env` file is correctly configured.
- Make sure all dependencies are properly installed.
- Verify that your bot token and encryption password are correct.
- Check the server logs for any errors or issues during runtime.

For any additional help or to report issues, please open an issue on the [GitHub repository](https://github.com/advaithsshetty/cloakstream-telegram-bot/issues).

---