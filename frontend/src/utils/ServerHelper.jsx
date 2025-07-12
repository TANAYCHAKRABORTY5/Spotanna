import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();

  const response = await fetch(backendUrl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  // const formattedResponse = await response.json();
  // // if (!formattedResponse) return {};

  // // return JSON.parse(formattedResponse);
  // // const formattedResponse = await response.json();
  // return formattedResponse;
  try {
    const formattedResponse = await response.json();
    return formattedResponse;
  } catch (err) {
    console.warn("⚠️ Failed to parse JSON response. Possibly empty.");
    return {}; // fallback to prevent crash
  }
};

export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  // console.log("Sending request to:", backendUrl + route);
  // console.log("With token:", token)

  const response = await fetch(backendUrl + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const formattedResponse = await response.json();
  // console.log("GET Response from", route, ":", formattedResponse);

  return formattedResponse;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  // console.log("Fetched token:", accessToken);

  return accessToken;
};
