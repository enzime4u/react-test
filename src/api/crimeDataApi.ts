const CRIME_DATA_API_BASE_URL =
  "https://data.police.uk/api/crimes-street/all-crime?";

interface CrimeData {
  // Define the structure of crime data based on the API response
  // Replace any with actual data types
  id: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
  };
  postcode: string;
  date: string;
  outcomeStatus?: string | null;
}

export const fetchCrimeData = async (latitude: number, longitude: number): Promise<CrimeData[]> => {
  try {
    const apiUrl = `${CRIME_DATA_API_BASE_URL}lat=${latitude}&lng=${longitude}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch crime data');
    }

    const crimeData: CrimeData[] = await response.json();
    return crimeData;
  } catch (error) {
    console.error('Error handling crime data:', error);
    throw new Error('Failed to fetch crime data');
  }
};

