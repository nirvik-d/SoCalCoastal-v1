"use client";

import React, { useState, useEffect } from "react";
import { CommunityAPI } from "../api/CommunityAPI";
import { GenerateCommunityList } from "../components/CommunityList";
import { Community } from "../components/Community";

export function DisplayCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  let page = 1; // For testing only.

  function handleSaveCommunity(community: Community) {
    saveCommunity(community, communities, setCommunities, setError);
  }

  useEffect(() => {
    loadCommunities(page, setCommunities, setError, setLoading);
  }, [page]);

  return (
    <>
      <header className="title">
        <h1>Coastal Communities of Southern California</h1>
      </header>

      {error && (
        <div className="text-error">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse"></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <section>
        <GenerateCommunityList
          communities={communities}
          onSave={handleSaveCommunity}
        />
      </section>

      {loading && (
        <div className="loading">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export function sortCommunities(communities: Community[]) {
  return [...communities].sort((a, b) => a.name.localeCompare(b.name));
}

export async function saveCommunity(
  community: Community,
  communities: Community[],
  setCommunities: React.Dispatch<React.SetStateAction<Community[]>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  try {
    const updatedCommunity = await CommunityAPI.put(community);
    const updated = communities.map((c) =>
      c.id === updatedCommunity.id ? new Community(updatedCommunity) : c
    );
    setCommunities(sortCommunities(updated));
  } catch (e) {
    if (e instanceof Error) setError(e.message);
  }
}

export async function loadCommunities(
  page: number,
  setCommunities: React.Dispatch<React.SetStateAction<Community[]>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);
  try {
    const data = await CommunityAPI.get(page);
    setCommunities((prev) =>
      sortCommunities(page === 1 ? data : [...prev, ...data])
    );
  } catch (e) {
    if (e instanceof Error) setError(e.message);
  } finally {
    setLoading(false);
  }
}
