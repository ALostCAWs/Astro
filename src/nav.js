/* ---- Imports Section */
import React from 'react';
/* End ---- */

/* ---- Navigation UI ---- */
export const Nav = () => {
  // Return UI
  return (
    <nav>
      <a href="https://keighly.ca">
        <h1>Keighly.ca</h1>
      </a>
      <ul>
        <li><a href="https://github.com/ALostCAWs"
          target="_blank"
          rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://keighly.ca">Gallery</a></li>
      </ul>
    </nav>
  );
}