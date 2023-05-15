import React from "react";
import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.cmp";
import AboutPage from "./pages/about/about.cmp";
import ContactPage from "./pages/contact/contact.cmp";
import HomePage from "./pages/homepage/homepage.cmp";
import PortfolioPage from "./pages/portfolio/portfolio.cmp";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    fetch(`https://www.api.benjamincopinet.fr/wp-json/wp/v2/pages/4204`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ seo: data.acf });
      });
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.state.seo?.titre}</title>
          <meta name="description" content={this.state.seo?.description} />
          <meta name="keywords" content={this.state.seo?.keyword} />
          <meta name="robots" content="index,follow" />
          <link rel="canonical" href="http://benjamincopinet.fr" />
          <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
        </Helmet>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            component={() => <HomePage handleClick={this.handleClick} />}
          />
          <Route exact path="/portfolio/:slug" component={PortfolioPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
        </Routes>
      </div>
    );
  }
}

export default App;
