import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are AkinS AI — a premium AI website and software builder.

RULES:
- Respond professionally
- Use clear headings
- Use bullet points
- When generating websites:
  • Explain briefly
  • Then provide FULL HTML + CSS + JS
- Always format code using markdown blocks
- Do NOT greet repeatedly
- Do NOT mention OpenAI
`
        },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
}
