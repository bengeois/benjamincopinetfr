import React, {useEffect, useState} from "react";
import { PhotoSwipe } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";
import PortfolioContainer from "../../components/portfilio-container/portfolio-container.cmp";
import "./portfolio.scss";
import {useParams} from "react-router-dom";

const PortfolioPage = () => {
    const { slug } = useParams();
    const [gallery, setGallery] = useState([]);
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState({
        escKey: false,
        showHideOpacity: true,
        bgOpacity: 0.85,
        spacing: 0.15,
    });

    useEffect(() => {
        fetch(
        `https://www.api.benjamincopinet.fr/wp-json/wp/v2/galerie?slug=${slug}`
        )
        .then((response) => response.json())
        .then((data) => {
            setGallery(data[0].acf.photos.map((p) => p.id));
        });
    }, [slug]);

    useEffect(() => {
        fetch(
        `https://api.benjamincopinet.fr/wp-json/wp/v2/media?per_page=100&include=${gallery}`
        )
        .then((response) => response.json())
        .then((data) => {
            const images = data.map((photo) => {
                let imageData = {
                    src: photo.source_url,
                    w: photo.media_details.width,
                    h: photo.media_details.height,
                };
                return imageData;
            });
            setItems(images);
        });
    }, [gallery]);

    const openPhotoSwipe = (index) => {
        setIsOpen(true);
        setOptions({
            ...options,
            closeOnScroll: false,
            index: index,
        });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <PortfolioContainer>
        {
            // check if array of items is ready
            items.length > 0 ? (
            <PhotoSwipe
                isOpen={isOpen}
                items={items}
                options={options}
                onClose={handleClose}
            />
            ) : (
            ""
            )
        }
        {items.map((data, index) => {
            return (
                <div className="responsive" key={index}>
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${data.src})`,
                    }}
                    onClick={() => openPhotoSwipe(index)}
                  />
                </div>
            );
        })}
        </PortfolioContainer>
    );
}

export default PortfolioPage;
