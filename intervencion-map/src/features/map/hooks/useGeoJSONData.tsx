import { useEffect, useState } from "react";

import { GeoJSON } from "geojson";

type ResponseBody = {
  files: [{ content: string | GeoJSON }];
};

const tryParseGist = (responseBody: ResponseBody): GeoJSON | null => {
  if ("files" in responseBody) {
    const file = Object.values(responseBody.files)[0];
    if (typeof file.content === "string") {
      try {
        return JSON.parse(file.content);
      } catch (e) {
        console.error("Failed to parse Gist file content as JSON:", e);
        return null;
      }
    }
  }
  return null;
};

export default function useGeoJSONData(url: string, resourceName?: string) {
  const [data, setData] = useState<GeoJSON | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseBody = await response.json();
        console.log(responseBody);

        const parsedData = tryParseGist(responseBody) ?? responseBody;
        console.log(parsedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing GeoJSON data:", error);
        setError((error as Error).message);
      }
    };

    fetchGeoJSON();
  }, []);

  return { data, error };
}
