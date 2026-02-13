import { NextResponse } from "next/server";
import { PrintfulClient } from "@/lib/printful";
import { generateDesign } from "@/lib/generator";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 1. Generate Design
    const designUrl = await generateDesign(prompt);
    
    // 2. Initialize Printful
    const printful = new PrintfulClient(process.env.PRINTFUL_API_TOKEN || "");
    
    // 3. Upload to Printful
    const file = await printful.uploadFile(designUrl, `blvck-${Date.now()}.png`);
    
    // 4. Create Product (Gildan Hoodie)
    const product = await printful.createProduct(`BLVCK // ${prompt.toUpperCase()}`, designUrl);
    
    // 5. Add Variant (Black Hoodie)
    // ID 4011 = Gildan 18500 Unisex Heavy Blend Hooded Sweatshirt (Black / L)
    await printful.createVariant(product.id, file.id, 4011);

    // 6. Save to our local database
    if (db) {
      await addDoc(collection(db, "products"), {
        name: product.name,
        printfulId: product.id,
        image: designUrl,
        category: "Generated",
        price: 85.00,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ success: true, product });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
