// Import the necessary modules and Community class
import { Community } from "@/app/components/Community"; // Adjust the path as needed

interface CommunityDetailsProps {
  community: Community;
}

const DisplayCommunityDetails = ({ community }: CommunityDetailsProps) => {
  return (
    <div className="community-details-card">
      <div>
        <div className="card large">
          <img
            className="rounded"
            src={community.imageUrl}
            alt={community.name}
          />
          <section className="section dark">
            <h3 className="strong">
              <strong>{community.name}</strong>
            </h3>
            <p>{community.description}</p>
            <p>County: {community.county}</p>
            <p>
              <mark className="active">
                {community.isVisited ? "Visited." : "Not visited yet."}
              </mark>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisplayCommunityDetails;
