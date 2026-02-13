import { NextResponse } from "next/server";
import { PrintfulClient } from "@/lib/printful";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// This route is your "Sync Button"
// When you visit /api/admin/sync-printful (or trigger it), it will:
// 1. Fetch all products from your Printful store
// 2. Add any NEW products to your Firebase database
// 3. Update the site's catalog

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const apiKey = process.env.PRINTFUL_API_TOKEN;
    if (!apiKey) {
      return NextResponse.json({ error: "Printful API Token not found. Add it to .env.local" }, { status: 500 });
    }

    const printful = new PrintfulClient(apiKey);
    
    // 1. Fetch Products from Printful
    // Note: This assumes we have a getProducts method in lib/printful.ts
    // If not, I will add it in the next step.
    const printfulProducts = await printful.getProducts(); 

    if (!db) {
       return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }

    const productsRef = collection(db, "products");
    let addedCount = 0;

    for (const item of printfulProducts) {
      // Check if product already exists to avoid duplicates
      const q = query(productsRef, where("printfulId", "==", item.id));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        // Add new product to "The Catalog"
        await addDoc(productsRef, {
          name: item.name,
          printfulId: item.id,
          image: item.thumbnail_url,
          category: "Drop", // Default category
          price: 85.00, // You can set a default markup here
          createdAt: new Date(),
        });
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sync Complete. Added ${addedCount} new artifacts to the void.` 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
