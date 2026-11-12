
import { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const availableSkills = [
  "Python",
  "JavaScript",
  "React",
  "SQL",
  "Statistics",
  "Machine Learning",
  "Data Visualization",
  "HTML & CSS",
  "Cloud Computing",
  "Cybersecurity",
  "Project Management",
  "Communication",
];

const availableInterests = [
  "Data Science",
  "Artificial Intelligence",
  "Software Development",
  "Cybersecurity",
  "Cloud Computing",
  "Business Analytics",
];

function Skills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-skills")) || {};
    } catch {
      return {};
    }
  });

  const [interests, setInterests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-interests")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("skillpath-skills", JSON.stringify(skills));
    localStorage.setItem("skillpath-interests", JSON.stringify(interests));
  }, [skills, interests]);

  function toggleSkill(skill) {
    setSkills((previous) => {
      const updated = { ...previous };

      if (updated[skill]) {
        delete updated[skill];
      } else {
        updated[skill] = 3;
      }

      return updated;
    });
  }

  function updateSkillLevel(skill, level) {
    setSkills((previous) => ({
      ...previous,
      [skill]: Number(level),
    }));
  }

  function toggleInterest(interest) {
    setInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest]
    );
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Badge bg="primary" className="mb-3">
          Step 1 of 3
        </Badge>
        <h1>Discover Your Career Path</h1>
        <p className="text-muted">
          Tell us what you know and what interests you.
          We'll help you explore suitable career opportunities.
        </p>
      </div>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <h2 className="h4 mb-2">Your Skills</h2>
          <p className="text-muted">
            Select your skills and rate your proficiency from 1 to 5.
          </p>

          <Row className="g-3">
            {availableSkills.map((skill) => (
              <Col md={6} key={skill}>
                <div className="border rounded p-3 h-100">
                  <Form.Check
                    type="checkbox"
                    id={`skill-${skill}`}
                    label={skill}
                    checked={Boolean(skills[skill])}
                    onChange={() => toggleSkill(skill)}
                  />

                  {skills[skill] && (
                    <div className="mt-3">
                      <div className="d-flex justify-content-between">
                        <small className="text-muted">Skill level</small>
                        <strong>{skills[skill]}/5</strong>
                      </div>

                      <Form.Range
                        min={1}
                        max={5}
                        value={skills[skill]}
                        aria-label={`${skill} proficiency`}
                        onChange={(event) =>
                          updateSkillLevel(skill, event.target.value)
                        }
                      />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <h2 className="h4 mb-2">Your Interests</h2>
          <p className="text-muted">
            Which fields would you like to explore?
          </p>

          <Row className="g-3">
            {availableInterests.map((interest) => (
              <Col md={6} key={interest}>
                <div className="border rounded p-3">
                  <Form.Check
                    type="checkbox"
                    id={`interest-${interest}`}
                    label={interest}
                    checked={interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center">
        <span className="text-muted">
          {Object.keys(skills).length} skills selected · {interests.length} interests
        </span>

        <Button
          size="lg"
          disabled={Object.keys(skills).length === 0 || interests.length === 0}
          onClick={() => navigate("/careers")}
        >
          Find My Career Matches →
        </Button>
      </div>
    </Container>
  );
}

export default Skills;
