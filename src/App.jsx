
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Compass } from "lucide-react";

import Skills from "./pages/Skills";
import Careers from "./pages/Careers";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <Compass size={22} className="me-2" />
            SkillPath
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navigation" />

          <Navbar.Collapse id="main-navigation">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Skills & Interests
              </Nav.Link>

              <Nav.Link as={NavLink} to="/careers">
                Career Matches
              </Nav.Link>

              <Nav.Link as={NavLink} to="/roadmap">
                Learning Roadmap
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Skills />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
