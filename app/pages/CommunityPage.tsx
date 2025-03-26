"use client"; // Ensure this is a Client Component

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // For dynamic routing in Next.js App Router
import { CommunityAPI } from "@/app/api/CommunityAPI";
import { Community } from "@/app/components/Community";
import DisplayCommunityDetails from "@/app/components/CommunityDetails";

function DisplayCommunityPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [community, setCommunity] = useState<Community | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const { id } = useParams(); // Get dynamic ID from the URL

  useEffect(() => {
    if (id) {
      setLoading(true);
      CommunityAPI.find(Number(id)) // Ensure `id` is a number
        .then((data) => {
          setCommunity(data);
          setLoading(false);
        })
        .catch((e) => {
          setErrorState(e.message || "An error occurred");
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div>
      <header className="title">
        <h1>Community Details</h1>
      </header>

      {loading && (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}

      {errorState && (
        <div className="card large error">
          <section>
            <p>
              <span className="icon-alert inverse "></span> {errorState}
            </p>
          </section>
        </div>
      )}

      {community && <DisplayCommunityDetails community={community} />}
    </div>
  );
}

export default DisplayCommunityPage;
