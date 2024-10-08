import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Members from './components/about/members/Members';
import Statutes from './components/about/statutes/Statutes';
import AnnualReports from './components/about/annualreports/AnnualReports';
import Events from './components/events/Events';
import ScientificBlogs from './components/blogs/ScientificBlogs';
import Patients from './components/patients/Patients';
import EventPage from './components/events/eventpage/EventPage';
import BlogPage from './components/blogs/blogpage/BlogPage';
import LogIn from './components/login/LogIn';
import ProtectedRoute from './security/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LogIn />} />

      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
      <Route path="/statutes" element={<ProtectedRoute><Statutes /></ProtectedRoute>} />
      <Route path="/annualReports" element={<ProtectedRoute><AnnualReports /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path="/blogs" element={<ProtectedRoute><ScientificBlogs /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
      <Route path="/event/:id" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
      <Route path="/blog/:id" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
