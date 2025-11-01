import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [sosMessage, setSosMessage] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [confirmSOS, setConfirmSOS] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const savedMsg = localStorage.getItem("sosMessage");
    const savedC1 = localStorage.getItem("contact1");
    const savedC2 = localStorage.getItem("contact2");
    if (savedMsg) setSosMessage(savedMsg);
    if (savedC1) setContact1(savedC1);
    if (savedC2) setContact2(savedC2);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("sosMessage", sosMessage);
    localStorage.setItem("contact1", contact1);
    localStorage.setItem("contact2", contact2);
    setToast("Settings Saved");
    setSettingsOpen(false);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-teal-200 flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <nav className="p-5 backdrop-blur-lg bg-white/20 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">SOS Safety Center</h1>
        <button
          onClick={() => setSettingsOpen(true)}
          className="px-4 py-2 bg-indigo-500 rounded-xl text-white hover:bg-indigo-600"
        >
          Settings
        </button>
      </nav>

      {/* CHATBOT PLACEHOLDER */}
      <div className="flex-grow flex flex-col p-5">
        <div className="flex-grow rounded-2xl bg-white/40 backdrop-blur-xl shadow-md p-5 overflow-y-auto">
          <p className="text-gray-600 italic text-center mt-10">
            🤖 Chatbot coming soon… (will assist you in emergencies)
          </p>
        </div>

        {/* DISABLED INPUT */}
        <div className="w-full mt-4">
          <input
            disabled
            placeholder="Chatbot unavailable — coming soon"
            className="w-full bg-white/60 backdrop-blur-xl p-3 rounded-xl text-gray-400 border border-gray-300"
          />
        </div>
      </div>

      {/* SLIDE-OVER SETTINGS */}
      {settingsOpen && (
        <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl p-5 animate-slide-left">
          <h2 className="text-xl font-bold mb-5 text-gray-700">Settings</h2>

          <label className="text-sm font-semibold">SOS Message</label>
          <input
            value={sosMessage}
            onChange={(e) => setSosMessage(e.target.value)}
            className="w-full p-2 mb-3 border rounded-lg"
          />

          <label className="text-sm font-semibold">Primary Contact</label>
          <input
            value={contact1}
            onChange={(e) => setContact1(e.target.value)}
            className="w-full p-2 mb-3 border rounded-lg"
          />

          <label className="text-sm font-semibold">Secondary Contact</label>
          <input
            value={contact2}
            onChange={(e) => setContact2(e.target.value)}
            className="w-full p-2 mb-5 border rounded-lg"
          />

          <button
            onClick={saveSettings}
            className="w-full py-2 bg-indigo-500 text-white rounded-xl"
          >
            Save
          </button>

          <button
            onClick={() => setSettingsOpen(false)}
            className="w-full py-2 mt-2 bg-gray-300 rounded-xl"
          >
            Close
          </button>
        </div>
      )}

      {/* SOS CONFIRM MODAL */}
      {confirmSOS && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-3">Send SOS?</h2>
            <p className="text-sm text-gray-600 mb-5">Your emergency message will be sent.</p>
            <button className="w-full py-2 bg-red-500 text-white rounded-xl mb-2">YES, SEND</button>
            <button
              onClick={() => setConfirmSOS(false)}
              className="w-full py-2 bg-gray-300 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
