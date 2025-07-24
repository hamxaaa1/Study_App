import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoteCreate from "./pages/NoteCreate";
import Notes from "./pages/Notes";
import NoteEdit from "./pages/NoteEdit";
import NoteDetail from "./pages/NoteDetail";
import ScheduleList from "./pages/ScheduleList";
import ScheduleCreate from "./pages/ScheduleCreate";
import Todo from "./pages/Todo";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { ToastContainer } from "react-toastify";
import "./App.css";
import ContactUs from "./pages/ContactUs";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        {/* Public Pages with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Chatbot />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <ContactUs />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <>
                <Register />
              </>
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <>
                <Login />
              </>
            </PublicRoute>
          }
        />

        {/* Private Dashboard Pages with Sidebar */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Notes />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/create"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <NoteCreate />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/edit/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <NoteEdit />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <NoteDetail />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ScheduleList />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/schedules/create"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ScheduleCreate />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Todo />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
