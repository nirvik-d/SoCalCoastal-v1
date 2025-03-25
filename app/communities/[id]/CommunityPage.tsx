import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Use Next.js's useRouter hook
import { CommunityAPI } from "@/app/api/CommunityAPI";
import { Community } from "@/app/components/Community";
import DisplayCommunityDetails from "@/app/components/CommunityDetails";

interface CommunityPageProps {
  initialCommunity: Community | null;
  error: string | null;
}

const DisplayCommunityPage = ({
  initialCommunity,
  error,
}: CommunityPageProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [community, setCommunity] = useState<Community | null>(
    initialCommunity
  );
  const [errorState, setErrorState] = useState<string | null>(error);
  const router = useRouter();
  const { id } = router.query; // Extract the dynamic ID from the URL

  useEffect(() => {
    if (id) {
      setLoading(true);
      CommunityAPI.find(Number(id)) // Ensure that id is a number
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
};

export default DisplayCommunityPage;

export const getServerSideProps = async (context: any) => {
  const { id } = context.params; // Access the dynamic `id` parameter
  let community = null;
  let error = null;

  try {
    community = await CommunityAPI.find(Number(id));
  } catch (e: any) {
    error = e.message || "Error loading community";
  }

  return {
    props: {
      initialCommunity: community,
      error,
    },
  };
};
