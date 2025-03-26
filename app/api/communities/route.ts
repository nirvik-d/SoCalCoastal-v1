import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch all communities
export async function GET(request: Request) {
  console.log("API GET called!"); // Debugging log

  // Fetch all communities from the Supabase database
  const { data, error } = await supabase
    .from("SoCalCoastalCommunities")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log(`Found ${data.length} communities`); // Debugging log
  return NextResponse.json(data, { status: 200 });
}
