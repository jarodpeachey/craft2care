import React from "react";
import Head from "../components/Head";
import "../styles/partials/pages/_home.scss";
import { Row, Column } from "@react-tiny-grid/core";

const Home = () => {
  return (
    <>
      <Head bodyClass="home" />
      <header>
        {/* <Navigation showButton={true} /> */}

        <section className="hero">
          <div className="container">
            <img src="/media/img/logos/logo--craft2care.svg" alt="Craft2Care" />
            <h1 className="section-heading">Welcome to Craft2Care!</h1>
            <p className="section-description">I'm so glad you're here.</p>
            <p className="section-description">Click the "Download" button below to get printable templates for the projects listed below,</p>
          </div>
        </section>
      </header>
      <main>
        <section className="download">
          <div className="container">
            <Row breakpoints={[576]} spacing={[24]}>
              <Column widths={[6]}>
                <div className="download__item">
                  <img src="/media/img/felt-puppets.png" alt="Felt puppets" />
                  <h3>Cat + Bear Felt Puppets</h3>
                  <a download href="/media/downloads/felt-puppets.pdf" className="btn">
                    Download
                  </a>
                </div>
              </Column>
              <Column widths={[6]}>
                <div className="download__item">
                  <img src="/media/img/hair-clips.png" alt="Felt hair clips" />
                  <h3>Felt Hair Clip Templates</h3>
                  <a download href="/media/downloads/felt-flowers.pdf" className="btn">
                    Download
                  </a>
                </div>
              </Column>
            </Row>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
