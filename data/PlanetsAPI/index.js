import axios from "axios";

const API_URL = "https://api.le-systeme-solaire.net/rest/bodies/";

export const fetchPlanets = async () => {

  try {

  // Fetch Planets important information
  const planetsObj = await axios.get(API_URL);

  // Now we need to fetch images from a different endpoint
  const planetsImages = await Promise.all(
    planetsObj.data.bodies
      .filter((planet)=> planet.isPlanet)
      .map(async (planet)=> {
        const nasaObj = await axios.get(
          `https://images-api.nasa.gov/search?q=${planet.englishName}&media_type=image`
        );

        // Fetching images
        const image = nasaObj.data.collection.items.length > 0 ? nasaObj.data.collection.items[0].links[0].href : null;


        return {
          name: planet.englishName,
          mass: planet.mass.massValue + " x10" + planet.mass?.massExponent + " kg",
          gravity: planet.gravity + " m/s²",
          density: planet.density + " g/cm³",
          image: image
        };
      })
  );

  return planetsImages;

  } catch(error){
    console.error("Error fetching planets:", error);
  }

};