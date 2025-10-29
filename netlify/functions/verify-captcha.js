// netlify/functions/verify-captcha.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { token } = JSON.parse(event.body);

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );

    const data = await response.json();

    if (data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "CAPTCHA verified" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "CAPTCHA failed" }),
      };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
