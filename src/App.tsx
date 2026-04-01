/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Departments } from "./pages/Departments";
import { Doctors } from "./pages/Doctors";
import { Contact } from "./pages/Contact";
import { BookAppointment } from "./pages/BookAppointment";
import { NABH } from "./pages/NABH";
import { MJPJAY } from "./pages/MJPJAY";
import { ABPMJAY } from "./pages/ABPMJAY";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="nabh" element={<NABH />} />
          <Route path="mjpjay" element={<MJPJAY />} />
          <Route path="ab-pmjay" element={<ABPMJAY />} />
        </Route>
      </Routes>
    </Router>
  );
}
