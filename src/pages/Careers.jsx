
import { useMemo } from "react";
import { Container, Card, Row, Col, Badge, Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { calculateMatches } from "../data/careers";

function Careers() {
  const skills = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-skills")) || {};
    } catch {
      return {};
    }
  }, []);

  const interests = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-interests")) || [];
    } catch {
      return [];
    }
  }, []);

  const matches = calculateMatches(skills, interests);
  const hasProfile = Object.keys(skills).length > 0 && interests.length > 0;

  return (
    <Container className="py-5">
      <Badge bg="primary" className="mb-3">Step 2 of 3</Badge>

      <h1>Your Career Matches</h1>
      <p className="text-muted mb-4">
        Explore careers based on your skills and interests.
      </p>

      {!hasProfile ? (
        <Card className="p-4">
          <h2 className="h4">Complete your profile first</h2>
          <p>Select your skills and interests to get recommendations.</p>
          <div>
            <Button as={Link} to="/">Get Started</Button>
          </div>
        </Card>
      ) : (
        <>
          <p className="text-muted">
            Showing {matches.length} career recommendations.
          </p>

          <Row className="g-4">
            {matches.map((career) => (
              <Col md={6} key={career.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Badge bg="secondary" className="mb-2">
                          {career.category}
                        </Badge>
                        <h2 className="h4">{career.title}</h2>
                      </div>
                      <strong className="fs-4 text-primary">
                        {career.matchScore}%
                      </strong>
                    </div>

                    <ProgressBar
                      now={career.matchScore}
                      className="my-3"
                    />

                    <p className="text-muted">{career.description}</p>

                    <h3 className="h6 mt-4">Skills to develop</h3>

                    {career.missingSkills.length === 0 ? (
                      <p className="text-success">
                        All listed skill requirements met!
                      </p>
                    ) : (
                      <div className="d-flex flex-wrap gap-2">
                        {career.missingSkills.map((skill) => (
                          <Badge bg="light" text="dark" key={skill.name}>
                            {skill.name} ({skill.currentLevel}/{skill.requiredLevel})
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button
                      as={Link}
                      to={`/roadmap?career=${career.id}`}
                      variant="outline-primary"
                      className="mt-4"
                    >
                      View Learning Roadmap →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Careers;
