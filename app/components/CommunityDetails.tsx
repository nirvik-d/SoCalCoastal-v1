"use client";

import React from "react";
import { Community } from "../components/Community";

interface CommunityDetailsProps {
  community: Community;
}

export function DisplayCommunityDetails({ community }: CommunityDetailsProps) {
  return (
    <div className="community-details-card">
      <div>
        <div className="card large">
          <img
            className="rounded"
            src={community.image_url}
            alt={community.name}
          />
          <section className="section dark community-details-center">
            <h3 className="strong">
              <strong>{community.name}</strong>
            </h3>
            <p>{community.description}</p>
            <p>County: {community.county}</p>
            <p>
              <mark className="active">
                {community.is_visited ? "Visited." : "Not visited yet."}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
