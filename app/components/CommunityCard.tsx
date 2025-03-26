import { Community } from "@/app/components/Community";
import Link from "next/link";

// Function to format the community description
function formatDescription(description: string): string {
  return description.length > 60
    ? description.substring(0, 60) + "..."
    : description;
}

interface CommunityCardProps {
  community: Community;
  onEdit: (community: Community) => void;
}

// DisplayCommunityCard component
function DisplayCommunityCard({ community, onEdit }: CommunityCardProps) {
  const handleOnClickEdit = (communityBeingEdited: Community) => {
    onEdit(communityBeingEdited);
  };

  return (
    <div className="card communities-card">
      <img
        className="communities-card-img"
        src={community.image_url}
        alt={community.name}
      />
      <section className="section dark communities-card-section">
        <Link href={`/communities/${community.id}`} passHref>
          <h5 className="strong">
            <strong>{community.name}</strong>
          </h5>
          <p>
            <b>Description: </b>
            {formatDescription(community.description)}
          </p>
          <p>
            <b>County: </b>
            {community.county}
          </p>
        </Link>
        <div className="button-container communities-card-button">
          <button
            className="bordered"
            onClick={() => handleOnClickEdit(community)}
          >
            <span className="icon-edit"></span> Edit
          </button>
        </div>
      </section>
    </div>
  );
}

export default DisplayCommunityCard;
