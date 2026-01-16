import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional AI that creates websites, apps, dashboards, and code.",
        },
        { role: "user", content: message },
      ],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "AI request failed" });
  }
}
