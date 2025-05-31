export default async function handler(req, res) {
  const { name, social } = req.body;

  const prompt = `Pretend you're an AI that reveals what the internet thinks of someone. Here's the input:
Name: ${name}
Social Handle: ${social}

Return a creative summary with:
1. Internet Reputation Score (/100)
2. Perceived Personality Traits
3. An AI-generated Roast or Compliment
Format it nicely for web output.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content || "AI failed to reflect you.";

  res.status(200).json({ result });
}
