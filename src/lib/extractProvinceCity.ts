export default function extractProvinceCity(addressString: string): string {
  // Regular expression to extract province and city
  const regex = /^(.*?), (.*?), (.*?), (.*?)$/;

  // Match the address string against the regular expression
  const match = addressString?.match(regex);

  // Check if the match is successful
  if (match) {
    // Extract the province and city from the match
    const province = match[3];
    const city = match[4];

    // Return the combined province and city
    return `${province}`;
  } else {
    // Return an empty string if the match fails
    return "";
  }
}

