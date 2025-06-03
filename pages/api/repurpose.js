export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { input, format } = req.body;

  const prompt = `Convert the following into a ${format}:
\n${input}`;

  const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(500).json({ error: data.error });
  }

  return res.status(200).json({ result: data[0].generated_text });
}