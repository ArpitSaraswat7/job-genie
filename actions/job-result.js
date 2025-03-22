"use server";

export default async function jobResult({
  datePosted = "anyTime",
  jobType = "",
  experienceLevel = "",
  onsiteRemote = "",
  keywords = "golang",
  location = "91999990",
  sort = "mostRelevant",
}) {
  try {
    console.log("result");
    const baseUrl = "https://linkedin-data-api.p.rapidapi.com/search-jobs";

    const params = new URLSearchParams();

    // Append optional parameters only if they exist
    params.append("keywords", keywords);
    if (jobType) params.append("jobType", jobType);
    if (experienceLevel) params.append("experienceLevel", experienceLevel);
    if (onsiteRemote) params.append("onsiteRemote", onsiteRemote);
    if (datePosted) params.append("datePosted", datePosted);
    if (location) params.append("location", location);
    if (sort) params.append("sort", sort);

    const url = `${baseUrl}?${params.toString()}`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "5b66def8a8msha752736f6b9799ep1965cdjsn477922c7f855",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json(); // Use response.text() if API doesn't return JSON

    return result.data || result; // Adjust based on API response format
  } catch (error) {
    console.error("Error fetching LinkedIn jobs:", error);
    return { error: error.message };
  }
}
