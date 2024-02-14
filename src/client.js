import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: "e2k62wfc",
    dataset: "production",
    // apiVersion: '2021-08-18', // Specify the API version
    // useCdn: true, // Enable or disable the CDN as needed (true for CDN, false for fresh data)
});