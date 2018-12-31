import * as React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard";

const routes = {
  dashboard: "/"
};

const pages = [
  { url: routes.dashboard, label: "Dashboard", component: Dashboard }
];

export default function App() {
  return (
    <Router>
      <>
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand" href="#">
              Spontaneo
            </a>
            <ul className="navbar-nav">
              {pages.map(({ label, url }) => (
                <li key={url} className="nav-item">
                  <Link className="nav-link" to={url}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {pages.map(({ url, component }) => (
          <Route key={url} exact path={url} component={component} />
        ))}
      </>
    </Router>
  );
}
