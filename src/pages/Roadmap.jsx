
import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Badge,
  Button,
  ProgressBar,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { careers } from "../data/careers";
import { searchOccupations } from "../services/escoApi";

function Roadmap() {
  const [searchParams] = useSearchParams();
  const careerId = searchParams.get("career");

  const career = careers.find((item) => item.id === careerId);

  // Load user's skills from localStorage
  const [skills] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-skills")) || {};
    } catch {
      return {};
    }
  });

  // Load completed learning goals
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillpath-completed")) || {};
    } catch {
      return {};
    }
  });

  // ESCO API states
  const [occupation, setOccupation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Fetch official occupation information from ESCO
  useEffect(() => {
    if (!career) return;

    let cancelled = false;

    async function loadOccupation() {
      setLoading(true);
      setApiError("");
      setOccupation(null);

      try {
        const results = await searchOccupations(career.title);

        if (!cancelled) {
          const exactMatch = results.find(
            (item) =>
              item.title?.toLowerCase() ===
              career.title.toLowerCase()
          );

          setOccupation(exactMatch || results[0] || null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("ESCO API error:", error);
          setApiError(
            "Unable to load occupation information. Please try again later."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOccupation();

    return () => {
      cancelled = true;
    };
  }, [careerId]);

  // Show fallback if no career was selected
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

  // Calculate learning goals
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

  // Update completed goals and save to localStorage
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

      {/* Career overview and learning progress */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <Badge bg="secondary" className="mb-2">
            {career.category}
          </Badge>

          <h2 className="h4">{career.title}</h2>

          <p className="text-muted">
            {career.description}
          </p>

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

      {/* Official ESCO API information */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <Badge bg="info" className="mb-3">
            External API
          </Badge>

          <h2 className="h4">
            Official Career Information
          </h2>

          <p className="text-muted">
            Occupation information retrieved from the
            European Commission's ESCO database.
          </p>

          {loading && (
            <div className="d-flex align-items-center gap-2 my-3">
              <Spinner
                animation="border"
                size="sm"
                role="status"
              />
              <span>Loading occupation information...</span>
            </div>
          )}

          {apiError && (
            <Alert variant="warning">
              {apiError}
            </Alert>
          )}

          {!loading && !apiError && occupation && (
            <div className="mt-3">
              <h3 className="h5">
                {occupation.title}
              </h3>

              <p className="text-muted mb-2">
                ESCO occupation code: {occupation.code || "N/A"}
              </p>

              {occupation._links?.self?.href && (
                <a
                  href={occupation._links.self.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View official ESCO occupation data →
                </a>
              )}
            </div>
          )}

          {!loading && !apiError && !occupation && (
            <Alert variant="secondary">
              No occupation information found.
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Learning goals */}
      <h2 className="h4 mb-3">
        Skills to Develop
      </h2>

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
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <div>
                    <h3 className="h5">
                      {skill}
                    </h3>

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
