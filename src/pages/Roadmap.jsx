
import { useState } from "react";
import {
  Container, Card, Badge, Button,
  ProgressBar, Form, Alert
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { careers } from "../data/careers";

function Roadmap() {
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get("career");

  const career = careers.find((item) => item.id === careerId);

  const [skills] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-skills")) || {};
    } catch {
      return {};
    }
  });

  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-completed")) || {};
    } catch {
      return {};
    }
  });

  if (!career) {
    return (
      <Container className="py-5">
        <h1>Learning Roadmap</h1>
        <Alert variant="info">
          Select a career from your matches to view its learning roadmap.
        </Alert>
        <Button as={Link} to="/careers">
          Explore Careers
        </Button>
      </Container>
    );
  }

  const requirements = Object.entries(career.skills);

  const learningGoals = requirements.filter(
    ([skill, requiredLevel]) =>
      Number(skills[skill] || 0) < requiredLevel
  );

  const completedCount = learningGoals.filter(
    ([skill]) => completed[`${career.id}-${skill}`]
  ).length;

  const progress = learningGoals.length
    ? Math.round((completedCount / learningGoals.length) * 100)
    : 100;

  function toggleCompleted(skill) {
    const key = `${career.id}-${skill}`;

    const updated = {
      ...completed,
      [key]: !completed[key],
    };

    setCompleted(updated);

    localStorage.setItem(
      "skillpath-completed",
      JSON.stringify(updated)
    );
  }

  return (
    <Container className="py-5">
      <Badge bg="primary" className="mb-3">
        Step 3 of 3
      </Badge>

      <h1>Your Learning Roadmap</h1>
      <p className="text-muted mb-4">
        Develop the skills needed to become a {career.title}.
      </p>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <Badge bg="secondary" className="mb-2">
            {career.category}
          </Badge>

          <h2 className="h4">{career.title}</h2>
          <p className="text-muted">{career.description}</p>

          <div className="d-flex justify-content-between">
            <strong>Learning progress</strong>
            <span>{progress}%</span>
          </div>

          <ProgressBar
            now={progress}
            className="mt-2"
            variant="success"
          />

          <p className="text-muted mt-2 mb-0">
            {completedCount} of {learningGoals.length} goals completed
          </p>
        </Card.Body>
      </Card>

      <h2 className="h4 mb-3">Skills to Develop</h2>

      {learningGoals.length === 0 ? (
        <Alert variant="success">
          You already meet all listed skill requirements!
        </Alert>
      ) : (
        learningGoals.map(([skill, requiredLevel]) => {
          const key = `${career.id}-${skill}`;

          return (
            <Card
              key={skill}
              className="shadow-sm border-0 mb-3"
            >
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h5">{skill}</h3>

                    <p className="text-muted mb-0">
                      Current level: {skills[skill] || 0}/5
                      {" · "}
                      Required level: {requiredLevel}/5
                    </p>
                  </div>

                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    checked={Boolean(completed[key])}
                    onChange={() => toggleCompleted(skill)}
                  />
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}

      <Button
        as={Link}
        to="/careers"
        variant="outline-primary"
        className="mt-3"
      >
        ← Back to Career Matches
      </Button>
    </Container>
  );
}

export default Roadmap;
