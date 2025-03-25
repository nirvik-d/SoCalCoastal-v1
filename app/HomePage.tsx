export default function Home() {
  return (
    <div>
      <header className="title">
        <h1>Explore Southern California's Coastal Communities</h1>
        <p>
          Discover the charm, lifestyle, and unique character of SoCal's top
          beachside towns.
        </p>
      </header>

      <section className="homepage-body">
        <h2>Featured Coastal Communities</h2>
        <p>
          From Malibu to San Diego, learn about the best coastal towns, their
          culture, real estate, and attractions.
        </p>
        <div>
          {[
            {
              name: "Malibu",
              description: "Famous for luxury living and iconic surf spots.",
              imageURL: "/assets/malibu.jfif",
            },
            {
              name: "Laguna Beach",
              description: "An artistic seaside retreat with stunning coves.",
              imageURL: "/assets/laguna_beach.jfif",
            },
            {
              name: "San Diego",
              description:
                "Vibrant city with beautiful beaches and laid-back vibes.",
              imageURL: "/assets/san_diego.jfif",
            },
          ].map((community, index) => (
            <div key={index}>
              <h3>{community.name}</h3>
              <p>{community.description}</p>
              <img
                src={community.imageURL}
                alt={community.name}
                className="homepage-community-image"
              />
            </div>
          ))}
        </div>
      </section>

      <footer className="homepage-footer">
        All images used in this website belong to their respective creators.
      </footer>
    </div>
  );
}
