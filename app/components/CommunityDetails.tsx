import { Community } from "@/app/components/Community";
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
};

export default DisplayCommunityDetails;
