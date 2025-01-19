import React from "react";

const LanguageSelector = ({ onSelectLanguage }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
    { code: "ta", name: "Tamil" },
    { code: "kn", name: "Kannada" },
    { code: "te", name: "Telugu" },
    { code: "bn", name: "Bengali" },
    { code: "ml", name: "Malayalam" },
    { code: "pa", name: "Punjabi" },
    { code: "or", name: "Odia" },
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-3">Select Language:</h3>
      <ul className="flex flex-wrap gap-4">
        {languages.map((lang) => (
          <li
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {lang.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
