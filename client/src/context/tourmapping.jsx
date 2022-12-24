import { createContext, useState, useEffect } from "react";

/* example Data Model */
const placesData = [
    {
      title: "Rotes Rathaus",
      description:
        "The Rotes Rathaus (German: [ˈʁoːtəs ˈʁaːtˌhaʊs], Red City Hall) is the town hall of Berlin, located in the Mitte district on Rathausstraße near Alexanderplatz. It is the home to the governing mayor and the government (the Senate of Berlin) of the state of Berlin. The name of the landmark building dates from the façade design with red clinker bricks.",
      picture:
        "https://localpedia.de/wp-content/uploads/2016/03/rotes-rathaus-5059513.jpg",
      position: [52.518532, 13.408210],
      seeMoreLink: "https://localpedia.de/berlin/rotes-rathaus-in-berlin",
    },
    {
      title: "Berlin TV Tower",
      description:
        "The Berliner Fernsehturm or Fernsehturm Berlin (English: Berlin Television Tower) is a television tower in central Berlin, Germany.",
      picture:
        "https://localpedia.de/wp-content/uploads/2015/11/fernsehturm-berlin-158513762.jpg",
      position: [52.520860, 13.408890],
      seeMoreLink: "https://en.wikipedia.org/wiki/Fernsehturm_Berlin",
    },
    {
      title: "Märkisches Museum",
      description:
        "The Märkisches Museum (Marcher Museum; originally Märkisches Provinzial-Museum, i.e. Museum of the Province of the March [of Brandenburg]) is a museum in Mitte, Berlin. Founded in 1874 as the museum of the city of Berlin and its political region, the March of Brandenburg, it occupies a building on the northern edge of Köllnischer Park, facing the Spree, which was designed by Ludwig Hoffmann and completed in 1908. It is now the main facility of the Stiftung Stadtmuseum Berlin, Landesmuseum für Kultur und Geschichte Berlins, the City of Berlin museum foundation, which also operates four other sites.",
      picture:
        "https://www.berlin-welcomecard.de/sites/default/files/styles/node_2_col/public/images/05_mm_aussen_foto_michael_setzpfandt.jpg?itok=2We2PfPw",
      position: [52.513580, 13.415170],
      seeMoreLink: "https://www.berlin-welcomecard.de/de/partner/maerkisches-museum-stadtmuseum-berlin",
    }
  ]
  

const TourMapContext = createContext();

const TourMapProviderWrapper = ({ children }) => {
    const [places, setPlaces] = useState(placesData);
    const [previewPlace, setPreviewPlace] = useState(null)
    const [showPreview, setShowPreview] = useState(false);

    const closePreview = () => {
        setShowPreview(false);
        setPreviewPlace(null);
    }

    const setNewPreviewPlace = place => {
        setPreviewPlace(place);
    }

    const togglePreview = bool => {
        setShowPreview(bool);
    }  

    useEffect(() => {
        console.log("showPreview: " + showPreview)
        console.log("place : " + previewPlace)
    }, [showPreview])

   return <TourMapContext.Provider value={{  showPreview, togglePreview, closePreview,  previewPlace, setNewPreviewPlace, places }}>{children}</TourMapContext.Provider>;
}

export { TourMapContext, TourMapProviderWrapper };