const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const port = process.env.PORT || 5050;

async function encryptData(data, password) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    const key = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode('salt'),
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        {
            name: 'AES-GCM',
            length: 256
        },
        true,
        ['encrypt', 'decrypt']
    );
    const iv = crypto.randomBytes(12);
    const encryptedContent = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        encoder.encode(data)
    );
    const encryptedArray = new Uint8Array(encryptedContent);
    const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
    combinedArray.set(iv, 0);
    combinedArray.set(encryptedArray, iv.length);
    return Buffer.from(combinedArray).toString('base64');
}

async function encrypt_url(url) {
    const encryptedPath = await encryptData(url, process.env.ENCRYPTION_PASSWORD);
    const cloakstreamUrl = process.env.BASE_URL + encodeURIComponent(encryptedPath);
    return cloakstreamUrl;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 'Welcome to Cloakstream Bot. Send me a URL to encrypt it.');
    });
    
    bot.onText(/\/help/, async (msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 'Send me a URL to encrypt it.');
    });
    
    bot.onText(/\/about/, async (msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 'Cloakstream Bot is a simple bot that implements the Cloakstream website in the form of a telegram bot.');
    });

    bot.onText(/^(https?:\/\/[^\s]+)$/i, async (msg, match) => {
        const chatId = msg.chat.id;
        const url = match[0]; // The URL that matched the regex
    
        try {
            const encryptedUrl = await encrypt_url(url);
            await bot.sendMessage(chatId, `Encrypted URL: ${encryptedUrl}`);
        } catch (error) {
            await bot.sendMessage(chatId, 'Error encrypting URL. Please try again.');
        }
    });
    
});
