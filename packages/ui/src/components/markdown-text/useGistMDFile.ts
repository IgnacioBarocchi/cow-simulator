import { useState } from "react";

const useGistMDFile = (gistEndpoint: string) => {
    const [text, setText] = useState("");
    const fetchData = async () => {
        try {
            console.log(gistEndpoint);
            const response = await fetch(gistEndpoint);

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const data = await response.json();
            const files = data.files;
            // @ts-ignore
            const markdownText = Object.values(files)[0].content;

            console.log(markdownText);

            setText(markdownText);
        } catch (err) {
            console.error("Error fetching Gist:", err);
        }
    };

    fetchData();


    return text
}

export default useGistMDFile