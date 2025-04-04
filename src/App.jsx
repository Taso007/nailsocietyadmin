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
import MemberPage from './components/about/members/membercard/memberPage/MemberPage';
import BlogEditPage from './components/blogs/blogpage/blogEditPage/BlogEditPage';
import EventEditPage from './components/events/eventpage/eventEditPage/EventEditPage';
import LeafletPage from './components/patients/leafletcard/leafletPage/LeafletPage';
import StatutesPage from './components/about/statutes/statutescard/StatutesPage/StatutesPage';
import ReportPage from './components/about/annualreports/reportcard/ReportPage/ReportPage';

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
      <Route path="/member/:id" element={<ProtectedRoute><MemberPage /></ProtectedRoute>} />
      <Route path="/blogs/:id/edit" element={<ProtectedRoute><BlogEditPage/></ProtectedRoute>} />
      <Route path="/events/:id/edit" element={<ProtectedRoute><EventEditPage/></ProtectedRoute>} />
      <Route path="/leaflets/:id/edit" element={<ProtectedRoute><LeafletPage/></ProtectedRoute>} />
      <Route path="/statutes/:id/edit" element={<ProtectedRoute><StatutesPage/></ProtectedRoute>} />
      <Route path="/annualReports/:id/edit" element={<ProtectedRoute><ReportPage/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
