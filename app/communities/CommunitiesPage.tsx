import { useState, useEffect } from "react";
import GenerateCommunityList from "@/app/components/CommunityList"; // Adjust the import path
import { Community } from "@/app/components/Community"; // Adjust the import path
import { CommunityAPI } from "@/app/api/CommunityAPI"; // Adjust the import path

interface CommunitiesPageProps {
  initialCommunities: Community[];
  page: number;
}

const DisplayCommunitiesPage = ({
  initialCommunities,
  page,
}: CommunitiesPageProps) => {
  const [communities, setCommunities] =
    useState<Community[]>(initialCommunities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const saveCommunity = (community: Community) => {
    CommunityAPI.put(community)
      .then((community) => {
        let updatedCommunities = communities.map((c: Community) => {
          return c.id === community.id ? new Community(community) : c;
        });
        setCommunities(updatedCommunities);
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
        if (page === 1) {
          setCommunities(data);
        } else {
          setCommunities((communities) => [...communities, ...data]);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (!initialCommunities.length) {
      loadCommunities();
    }
  }, [page, initialCommunities]);

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
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default DisplayCommunitiesPage;

export const getServerSideProps = async (context: any) => {
  const page = context.query.page || 1;

  try {
    const communities = await CommunityAPI.get(page);
    return {
      props: {
        initialCommunities: communities,
        page: parseInt(page as string),
      },
    };
  } catch (e) {
    return {
      props: {
        initialCommunities: [],
        page: parseInt(page as string),
      },
    };
  }
};
