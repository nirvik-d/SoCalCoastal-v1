"use client";

import { useState, useEffect } from "react";
import GenerateCommunityList from "@/app/components/CommunityList";
import { Community } from "@/app/components/Community";
import { CommunityAPI } from "@/app/api/CommunityAPI";

function DisplayCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  let page = 1; // For testing only.

  const sortCommunities = (communities: Community[]) => {
    return communities.sort((a, b) => a.name.localeCompare(b.name));
  };

  const saveCommunity = (community: Community) => {
    CommunityAPI.put(community)
      .then((updatedCommunity) => {
        let updatedCommunities = communities.map((c) =>
          c.id === updatedCommunity.id ? new Community(updatedCommunity) : c
        );
        setCommunities(sortCommunities(updatedCommunities));
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  useEffect(() => {
    async function loadCommunities() {
      setLoading(true);
      try {
        const data = await CommunityAPI.get(page);
        setCommunities((prevCommunities) =>
          sortCommunities(page === 1 ? data : [...prevCommunities, ...data])
        );
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadCommunities();
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

      <section className="communities-body">
        <GenerateCommunityList
          communities={communities}
          onSave={saveCommunity}
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

export default DisplayCommunitiesPage;
