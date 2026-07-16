import { createContext, useContext, useState, type ReactNode } from "react";

interface StudentContextValue {
  student: any;
  setStudent: React.Dispatch<React.SetStateAction<any>>;
  logout: () => void;
}

const StudentContext = createContext<StudentContextValue | null>(null);

function readStoredStudent() {
  try {
    return JSON.parse(localStorage.getItem("student") || "null");
  } catch {
    localStorage.removeItem("student");
    return null;
  }
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState(readStoredStudent());

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    setStudent(null);
  }

  return (
    <StudentContext.Provider value={{ student, setStudent, logout }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within StudentProvider");
  }
  return context;
}
