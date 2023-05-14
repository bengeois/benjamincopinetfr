import React from "react";
import { PhotoSwipe } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";
import PortfolioContainer from "../../components/portfilio-container/portfolio-container.cmp";
import "./portfolio.scss";

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      items: [],
      isOpen: false,
      options: {
        escKey: false,
        showHideOpacity: true,
        bgOpacity: 0.85,
        spacing: 0.15,
      },
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    fetch(
      `https://www.api.benjamincopinet.fr/wp-json/wp/v2/galerie?slug=${slug}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gallery: data[0].acf.photos.map((p) => p.id) });
        this.createUrlArray();
      });
  }

  createUrlArray = () => {
    fetch(
      `https://api.benjamincopinet.fr/wp-json/wp/v2/media?per_page=100&include=${this.state.gallery}`
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
        this.setState({ items: images });
      });
  };

  openPhotoSwipe = (index) => {
    this.setState({
      isOpen: true,
      options: {
        ...this.state.options,
        closeOnScroll: false,
        index: index,
      },
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    return (
      <PortfolioContainer>
        {
          // check if array of items is ready
          this.state.items.length > 0 ? (
            <PhotoSwipe
              isOpen={this.state.isOpen}
              items={this.state.items}
              options={this.state.options}
              onClose={this.handleClose}
            />
          ) : (
            ""
          )
        }
        {this.state.items.map((data, index) => {
          return (
            <div className="responsive" key={index}>
              <div
                className="img"
                style={{
                  backgroundImage: `url(${data.src})`,
                }}
                onClick={() => this.openPhotoSwipe(index)}
              />
            </div>
          );
        })}
      </PortfolioContainer>
    );
  }
}

export default PortfolioPage;
