import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch a single community by ID
type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = await params;

  console.log(`Fetching community with ID: ${id}`); // Debugging log

  // Fetch the community by ID from the Supabase database
  const { data, error } = await supabase
    .from("SoCalCoastalCommunities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  console.log("Found community:", data); // Debugging log
  return NextResponse.json(data, { status: 200 });
}

// PUT: Update a community by ID
export async function PUT(request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const numericId = parseInt(id);

  if (isNaN(numericId)) {
    console.error("Invalid ID provided. Must be a valid integer.");
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  console.log(`Received PUT request for ID: ${numericId}`);

  // Parse the updated community data from the request body
  const updatedCommunity = await request.json();
  console.log("Updated community data:", updatedCommunity);

  const { data, error } = await supabase
    .from("SoCalCoastalCommunities")
    .update(updatedCommunity)
    .eq("id", numericId)
    .select()
    .single();

  console.log(data);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  console.log("Successfully updated community:", data);
  return NextResponse.json(data, { status: 200 });
}
