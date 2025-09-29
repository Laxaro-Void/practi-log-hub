import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { applications as initialApplications } from "@/pages/Practices/data.json";

interface Application {
  id: string;
  title: string;
  company: string;
  location: string;
  appliedDate: string;
  status: "under_review" | "accepted" | "rejected";
  progress: number;
}

interface ApplicationContextType {
  applications: Application[];
  addApplication: (application: Omit<Application, "id" | "appliedDate" | "status" | "progress">) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<Application[]>([]);

  // Load applications from localStorage on mount
  useEffect(() => {
    const savedApplications = localStorage.getItem('practiceApplications');
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    } else {
      // Initialize with data from JSON if no saved data
      const initialApps = initialApplications.map(app => ({
        ...app,
        status: app.status as "under_review" | "accepted" | "rejected"
      }));
      setApplications(initialApps);
      localStorage.setItem('practiceApplications', JSON.stringify(initialApps));
    }
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    if (applications.length > 0) {
      localStorage.setItem('practiceApplications', JSON.stringify(applications));
    }
  }, [applications]);

  const addApplication = (newApplication: Omit<Application, "id" | "appliedDate" | "status" | "progress">) => {
    const application: Application = {
      ...newApplication,
      id: Date.now().toString(), // Use timestamp for unique ID
      appliedDate: new Date().toLocaleDateString("es-ES", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      }),
      status: "under_review",
      progress: 25,
    };

    setApplications(prev => [...prev, application]);
  };

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
};