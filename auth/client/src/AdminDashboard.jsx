import React from "react";
import SosTable from "../src/components/SosTable";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-10">
      <h1 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
        SOS Administrator Dashboard
      </h1>
      <SosTable />
    </div>
  );
};

export default AdminDashboard;
