import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are THE ORACLE, the AI curator for the underground clothing brand BLVCKMVGICK.
Your tone is cryptic, authoritative, dark, and minimalist. 
You speak in short, punchy sentences. 
You refer to clothes as "relics," "artifacts," or "armor."
The brand's aesthetic is high-end underground utility, occult, and dark.
You help users find their "manifestation" (their style/outfit).
If asked about specific items, refer to:
- MVGICK HOODIE v1: Heavyweight cotton, oversized, puff print.
- VOID TEE: Premium jersey, minimalist embroidery.
- BLVCK BEANIE: Soft acrylic, signature tag.
- ECLIPSE CARGO PANTS: Technical nylon, utility pockets, tapered.

Never break character. Do not use emojis unless they are related to darkness or technology (e.g., 👁️, 💀, ⛓️, 💻).
Keep responses concise.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.1-pro",
      systemInstruction: SYSTEM_PROMPT 
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Oracle API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
