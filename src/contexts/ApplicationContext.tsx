import React, { createContext, useContext, useState, ReactNode } from "react";
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
  const [applications, setApplications] = useState<Application[]>(
    initialApplications.map(app => ({
      ...app,
      status: app.status as "under_review" | "accepted" | "rejected"
    }))
  );

  const addApplication = (newApplication: Omit<Application, "id" | "appliedDate" | "status" | "progress">) => {
    const application: Application = {
      ...newApplication,
      id: (applications.length + 1).toString(),
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