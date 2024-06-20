import React from "react";

export const Services = (props) => {
  const data = props.data || [];

  // Chunk the data into arrays of three items each
  const chunkedData = [];
  for (let i = 0; i < data.length; i += 3) {
    chunkedData.push(data.slice(i, i + 3));
  }

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
            dapibus leonec.
          </p>
        </div>
        <div id="servicesCarousel" className="carousel slide" data-ride="carousel" data-interval="3000">
          <div className="carousel-inner">
            {chunkedData.length > 0
              ? chunkedData.map((chunk, index) => (
                  <div key={index} className={`item ${index === 0 ? "active" : ""}`}>
                    <div className="row">
                      {chunk.map((d, i) => (
                        <div key={`${d.name}-${i}`} className="col-md-4">
                          <i className={`fa ${d.icon}`}></i>
                          <div className="service-desc">
                            <h3>{d.name}</h3>
                            <p>{d.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
          <a className="left carousel-control" href="#servicesCarousel" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#servicesCarousel" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};