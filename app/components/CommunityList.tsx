"use client";

import React, { useState } from "react";
import { Community } from "../components/Community";
import { DisplayCommunityCard } from "../components/CommunityCard";
import { DisplayCommunityForm } from "../components/CommunityForm";

interface CommunityListProps {
  communities: Community[];
  onSave: (community: Community) => void;
}

export function GenerateCommunityList({
  communities,
  onSave,
}: CommunityListProps) {
  const [communityBeingEdited, setCommunityBeingEdited] = useState<
    Community | {}
  >({});

  const handleEditClick = (community: Community) => {
    setCommunityBeingEdited(community);
  };

  const handleCancelClick = () => {
    setCommunityBeingEdited({});
  };

  const listItems = communities.map((community) => (
    <div key={community.id} className="cols-sm">
      {communityBeingEdited === community ? (
        <DisplayCommunityForm
          onSave={onSave}
          onCancel={handleCancelClick}
          community={community}
        />
      ) : (
        <DisplayCommunityCard community={community} onEdit={handleEditClick} />
      )}
    </div>
  ));

  return <div className="row communities-body">{listItems}</div>;
}
