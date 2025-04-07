import { useEffect, useState } from "react";

export default function useGeoJSONData(url: string) {
  const [data, setData] = useState<GeoJSONFile | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(url);
        const gistData = await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const files = gistData.files;
        const fileContent = Object.values(files)[0].content;

        const geoJSON =
          typeof fileContent === "string"
            ? JSON.parse(fileContent)
            : fileContent;

        setData(geoJSON);
      } catch (error) {
        console.error("Error fetching intervention spots:", error);
      }
    };

    fetchGeoJSON();
  }, []);

  return { data };
}
