import React, { useState } from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faTwitter, faBehance } from "@fortawesome/free-brands-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Team Member Item Component
const TeamMemberItem = ({ member }) => (
  <Card className="mt-4 mt-lg-0">
    <Card.Header className="position-relative p-0">
      <img className="card-img-top" style={{maxHeight:`230px`}}src={member.img} alt={member.name} />
      <div className="ezy__team2-content px-3 py-4 px-xl-4">
        <h4>{member.name}</h4>
        <h6>{member.job}</h6>
        <p className="opacity-50 mb-0">Lorem ipsum dolor sit amet.</p>
        <div className="ezy__team2-social-links mt-4">
          <a href="#" className="ms-3">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" className="ms-3">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="#" className="ms-3">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="ms-3">
            <FontAwesomeIcon icon={faBehance} />
          </a>
        </div>
      </div>
    </Card.Header>
  </Card>
);

TeamMemberItem.propTypes = {
  member: PropTypes.object.isRequired,
};

// Main Team Component
export const Team = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  // Split team members into a rolling set of 4, sliding by one each time
  const rollingTeamMembers = data.reduce((acc, member, i) => {
    // Create a group of 4 team members for each slide
    const startIndex = i % data.length; // This will wrap around when it exceeds the length of the array
    const group = [];

    // Loop over the team members to get the next 4 members, and wrap around if needed
    for (let j = 0; j < 4; j++) {
        group.push(data[(startIndex + j) % data.length]); // This ensures we never go out of bounds
    }

    acc.push(group);
    return acc;
}, []);

  return (
    <section className="ezy__team2">
      <Container>
        <Row className="justify-content-center mb-4 mb-md-5">
          <Col lg={6} xl={5} className="text-center">
            <h2 className="ezy__team2-heading mb-3">Our Experts Team</h2>
            <p className="ezy__team2-sub-heading mb-0">
              Meet the best professionals in the industry.
            </p>
          </Col>
        </Row>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={true}
          indicators={true}
          prevIcon={<FontAwesomeIcon icon={faAngleLeft} />}
          nextIcon={<FontAwesomeIcon icon={faAngleRight} />}
        >
          {rollingTeamMembers.map((group, i) => (
            <Carousel.Item key={i}>
              <Row>
                {group.map((member, i) => (
                  <Col xs={12} md={6} lg={3} key={i}>
                    <TeamMemberItem member={member} />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

Team.propTypes = {
  data: PropTypes.array.isRequired,
};
