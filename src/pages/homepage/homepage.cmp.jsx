import React, {useEffect, useState} from "react";
import { FullPage, Slide } from "react-full-page";
import Hero from "../../components/hero/hero.cmp";
import ItemHome from "../../components/item-home/item-home.cmp";
import "./homepage.scss";

const HomePage = () => {
  const [galeries, setGaleries] = useState([]);

  useEffect(() => {
      fetch(
      "https://www.api.benjamincopinet.fr/wp-json/wp/v2/galerie?_embed"
      )
      .then((response) => response.json())
      .then((data) => {
          const galeries = data.map((galerie) => {
              return {
                  id: galerie.id,
                  slug: galerie.slug,
                  title: galerie.title.rendered,
                  subtitle: galerie.title.rendered,
                  imageUrl: galerie._embedded["wp:featuredmedia"]["0"].source_url,
                  revield: false,
              };
          });
          setGaleries(galeries);
      });
  }, []);

  const handleWaypoint = (index, action) => {
      setGaleries(
      galeries.map((item, i) => {
          let r = item.revield;
          if (index === i) {
              if (action === "enter") {
                  r = true;
              } else if (action === "leave") {
                  r = false;
              }
          }
          return {...item, revield: r};
      })
      );
  };

  return (
      <FullPage className="fullpage-wrapper">
          <Slide>
            <Hero />
          </Slide>
              {galeries.map((item, index) => (
                  <Slide key={item.id}>
                    <ItemHome
                      item={item}
                      handleWaypoint={handleWaypoint}
                      reviel={galeries}
                      index={index}
                    />
                  </Slide>
                ))}
      </FullPage>
    );
}

export default HomePage;
