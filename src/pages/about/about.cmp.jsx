import React from "react";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import "./about.scss";

const AboutPage = () => {
  const [revield, setRevield] = React.useState(false);

  const handleWaypoint = () => {
    setRevield(true);
  };

  return (
      <div className="about flex-c">
        <div className={`letters ${revield ? "show" : ""}`}>
          Photographe.
        </div>
        <div className="backround" />
        <div
          className={`about-text flex-c ${revield ? "show" : ""}`}
        >
          <Waypoint onEnter={() => handleWaypoint()} />
          <h1 className="title">A propos</h1>
          <h2>Enchanté, je m'appelle Benjamin Copinet.</h2>
          <p>
            La photographie est un hobby qui me plaît depuis longtemps mais que
            j'exerce depuis peu. Je ne suis pas bloqué dans un certain type :
            paysages, portraits, couples, etc... Je reste ouvert à la demande et
            à ce que j'observe tous les jours. La photographie n'était pas mon
            domaine de prédilection, cependant après l'avoir pratiqué c'est
            réellement une passion que j'aimerais partager autour de moi.
            N'étant pas issu d'un milieu de photographes, les nombreuses séances
            de shootings avec mes amis m'ont formé et fait découvrir de
            nombreuses astuces, de plus j'ai eu le plaisir de converser avec des
            professionnels du milieu qui me l'ont fait voir d'un œil différent.
          </p>
          <div className="about-social flex-c">
            <Link className="link-button" to="/contact">
              Me contacter
            </Link>
            <a href="https://www.instagram.com/benjamincopinet/" target="blank">
              <FaInstagram className="react-icons" />
            </a>
          </div>
        </div>
        <div className="about-image-area flex-c">
          {/* <img
            src=""
            className={`about-img ${revield ? "show" : ""}`}
            alt="benjamin-copinet-portrait"
          /> */}
        </div>
      </div>
  );
}

export default AboutPage;
