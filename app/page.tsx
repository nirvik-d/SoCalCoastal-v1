// app/page.tsx
import { supabase } from "./supabase";

interface Community {
  id: number;
  name: string;
  description: string;
  image_url: string;
  county: string;
  is_visited: boolean;
}

export default async function Home() {
  const { data, error, status } = await supabase
    .from("SoCalCoastalCommunities")
    .select("*");

  // Log the full response data and status
  console.log("Response Data:", data);
  console.log("Error:", error);
  console.log("Status:", status);

  if (error) {
    console.error("Error loading data:", error);
    return <div>Error loading data.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No communities found.</div>;
  }

  return (
    <div>
      <h1>SoCal Coastal Communities</h1>
      <ul>
        {data.map((community: Community) => (
          <li key={community.id}>
            <h3>{community.name || "Unnamed Community"}</h3>
            <p>{community.description || "No description available"}</p>
            <p>
              <img
                src={community.image_url || "/default-image.jpg"}
                alt={community.name || "No image"}
                width={200}
                height={150}
              />
            </p>
            <p>{community.county || "Unknown county"}</p>
            <p>{community.is_visited ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
