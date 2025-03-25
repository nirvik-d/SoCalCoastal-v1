import { Community } from "@/app/components/Community";

const baseUrl = "/api"; // Next.js API base URL
const url = `${baseUrl}/communities`;

function checkStatus(response: Response) {
  if (response.ok) {
    return response;
  } else {
    console.error("API Error:", response.status, response.statusText);
    throw new Error("Error processing request.");
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function convertToCommunityModel(item: any): Community {
  return new Community(item);
}

const CommunityAPI = {
  async get(page: number) {
    return fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.error("Client error:", error);
        throw new Error("Error retrieving communities.");
      });
  },

  async put(community: Community) {
    return fetch(`${url}/${community.id}`, {
      method: "PUT",
      body: JSON.stringify(community),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.error("Client error:", error);
        throw new Error("Error updating community.");
      });
  },

  async find(id: number) {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToCommunityModel)
      .catch((error) => {
        console.error("Client error:", error);
        throw new Error("Error finding community.");
      });
  },
};

export { CommunityAPI };
