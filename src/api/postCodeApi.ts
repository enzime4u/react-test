const POSTCODE_API_BASE_URL = "http://api.getthedata.com/postcode/";

interface PostcodeData {
  postcode: string;
  data: {
    latitude: number;
    longitude: number;
  };
}

export const fetchPostcodeData = async (
  postcode: string,
): Promise<PostcodeData> => {
  try {
    const apiUrl = `${POSTCODE_API_BASE_URL}${postcode}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch postcode data");
    }

    const data: PostcodeData = await response.json();
    // Add any necessary data transformations or validations here

    return data;
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    throw new Error("Failed to fetch postcode data");
  }
};
