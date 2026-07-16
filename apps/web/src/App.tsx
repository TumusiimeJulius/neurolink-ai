import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useStudent } from "./context/StudentContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LearningTwinPage from "./pages/LearningTwinPage";
import RecommendationPage from "./pages/RecommendationPage";
import AIInsightPage from "./pages/AIInsightPage";
import FocusPlanPage from "./pages/FocusPlanPage";
import StudyFocusPage from "./pages/StudyFocusPage";

function App() {
  const { student } = useStudent();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={student ? <Navigate to="/dashboard" replace /> : <Register />}
        />
        <Route
          path="/login"
          element={student ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={student ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/learning-twin"
          element={student ? <LearningTwinPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/recommendations"
          element={student ? <RecommendationPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/focus-plan"
          element={student ? <FocusPlanPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/ai-insight"
          element={student ? <AIInsightPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/study-focus"
          element={student ? <StudyFocusPage /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={student ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
