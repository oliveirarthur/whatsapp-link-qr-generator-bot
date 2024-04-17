# WhatsApp Link & QR Generator - Telegram bot

#### ngrok setup

1. **Download Ngrok:**
   - Visit the Ngrok website [https://ngrok.com/download](https://ngrok.com/download) and download the appropriate version for your operating system.

2. **Installation:**
   - Unzip the downloaded file.
   - Move the Ngrok binary to a directory in your system's PATH for easier access.

3. **Signup/Login to Ngrok:**
   - If you haven't already, sign up for a Ngrok account on their website [https://ngrok.com/signup](https://ngrok.com/signup).

4. **Authenticating Ngrok:**
   - Log in to your Ngrok account using the following command:
     ```sh
     ngrok authtoken YOUR_AUTH_TOKEN
     ```
     Replace `YOUR_AUTH_TOKEN` with the token provided in your Ngrok account dashboard.

5. **Exposing Port 5001:**
   - To expose port 5001 on your local machine, run the following command:
     ```sh
     ngrok http 5001
     ```

6. **Accessing the Public URL:**
   - After running the command, Ngrok will generate a public URL that forwards to your local port 5001.
   - Copy the provided HTTPS URL and share it with anyone you want to access your application.

7. **Testing:**
   - To ensure everything is set up correctly, open a web browser and paste the Ngrok URL.
   - You should be able to access your application running on port 5001.

8. **Closing Ngrok:**
   - When you're done with Ngrok, simply press `Ctrl + C` in the terminal where Ngrok is running to stop the tunnel.

9. **Additional Notes:**
   - Ngrok provides various features and configurations. Refer to the Ngrok documentation for advanced usage: [https://ngrok.com/docs](https://ngrok.com/docs).


#### dotnev setup

1. **Copy the example file**
   - Inside the `functions` folder, copy the `.env.example` file contents into a new `.env` file

2. **Insert values**
   - Replace each entry with real values:
        - `BOT_ENDPOINT` is compound by ngrok public URL + Firebase functions endpoint - eg `https://da00-000-000-000-000.ngrok-free.app/whatsapp-link-generator-aa0a0/us-central1/botHandler`
        - `BOT_TOKEN` can be retrieved from BotFather on Telegram
