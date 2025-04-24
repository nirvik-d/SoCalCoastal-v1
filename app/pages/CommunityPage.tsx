"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CommunityAPI } from "../api/CommunityAPI";
import { Community } from "../components/Community";
import { DisplayCommunityDetails } from "../components/CommunityDetails";

export function DisplayCommunityPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [community, setCommunity] = useState<Community | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setLoading(true);
      CommunityAPI.find(Number(id))
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
        <div className="loading">
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
