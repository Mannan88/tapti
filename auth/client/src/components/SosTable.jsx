import React from "react";

const SosTable = () => {
  const sosData = [
    {
      id: 1,
      name: "Shubham Jha",
      location: "19.197957722447885, 72.82725739491308",
      message: "Need urgent help at my location!",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto rounded-xl shadow-md bg-white/80 backdrop-blur-lg">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-indigo-600 text-white text-xs uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {sosData.map((sos) => (
              <tr key={sos.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{sos.id}</td>
                <td className="px-6 py-4">{sos.name}</td>
                <td className="px-6 py-4">{sos.location}</td>
                <td className="px-6 py-4">{sos.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SosTable;
