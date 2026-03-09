import { NextResponse } from "next/server";

const MODEL = "gemini-1.5-flash";
const ANIMAL_SCOPE =
  "You are a wildlife-only assistant. Answer only about animals, wildlife habitats, conservation, behavior, ecology, and biodiversity. If a question is outside wildlife topics, refuse briefly and ask for an animal-related question.";

const ANIMAL_KEYWORDS = [
  "animal",
  "wildlife",
  "species",
  "habitat",
  "conservation",
  "zoo",
  "bird",
  "mammal",
  "reptile",
  "amphibian",
  "fish",
  "insect",
  "marine",
  "forest",
  "savannah",
  "ocean",
  "jungle",
  "cat",
  "dog",
  "tiger",
  "lion",
  "elephant",
  "whale",
  "shark",
  "wolf",
  "fox",
  "bear",
  "owl",
  "eagle",
  "penguin",
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in server environment." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as { message?: string };
    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    const normalized = message.toLowerCase();
    const inAnimalScope = ANIMAL_KEYWORDS.some((word) => normalized.includes(word));
    if (!inAnimalScope) {
      return NextResponse.json({
        text: "I can only respond to animal and wildlife topics. Please ask about species, habitats, or conservation.",
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: ANIMAL_SCOPE }],
        },
        contents: [{ role: "user", parts: [{ text: message }] }],
      }),
    });

    const data = (await upstream.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
      error?: { message?: string };
    };

    if (!upstream.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Gemini request failed." },
        { status: upstream.status }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("\n").trim();
    return NextResponse.json({ text: text || "No text returned from Gemini." });
  } catch {
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
