// import React from 'react';
// import Card from '../components/Card';
// import Button from '../components/Button';

// const Settings = () => {
//   const handleSave = () => {
//     alert('Settings saved successfully!');
//   };

//   const handleUpdate = () => {
//     alert('Checking for rule engine updates... You are on the latest version.');
//   };

//   return (
//     <div className="space-y-8 max-w-4xl mx-auto p-4">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight text-primary">Settings</h1>
//         <p className="text-gray-500 mt-1">Configure your LegalScan AI preferences.</p>
//       </div>

//       <Card title="AI Confidence Thresholds">
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">High Confidence Threshold (%)</label>
//             <input type="range" min="0" max="100" defaultValue="90" className="w-full accent-accent" />
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>0%</span>
//               <span>90%</span>
//               <span>100%</span>
//             </div>
//             <p className="text-xs text-gray-400 mt-2">Findings above this threshold will be marked as highly confident.</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Review Required Threshold (%)</label>
//             <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-accent" />
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//               <span>0%</span>
//               <span>75%</span>
//               <span>100%</span>
//             </div>
//             <p className="text-xs text-gray-400 mt-2">Findings below this threshold will automatically be flagged for officer review.</p>
//           </div>
//           <Button onClick={handleSave}>Save Thresholds</Button>
//         </div>
//       </Card>

//       <Card title="System Configuration">
//         <div className="space-y-4">
//           <div className="flex items-center justify-between border-b border-border pb-4">
//             <div>
//               <p className="font-medium text-primary">Active Rule Engine Version</p>
//               <p className="text-sm text-gray-500">Legal Metrology Rules 2011 (v2.4)</p>
//             </div>
//             <Button variant="outline" onClick={handleUpdate}>Update Engine</Button>
//           </div>
//           <div className="flex items-center justify-between pt-2">
//             <div>
//               <p className="font-medium text-primary">Notification Preferences</p>
//               <p className="text-sm text-gray-500">Receive alerts for High Severity violations</p>
//             </div>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input type="checkbox" defaultChecked className="sr-only peer" />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
//             </label>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Settings;


import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const SETTINGS_STORAGE_KEY = 'legalscan_settings';

const DEFAULT_SETTINGS = {
  highConfidenceThreshold: 90,
  reviewRequiredThreshold: 75,
  highSeverityNotifications: true
};

const Settings = () => {
  const [settings, setSettings] = useState(
    DEFAULT_SETTINGS
  );

  const [savedMessage, setSavedMessage] = useState('');

  // ============================================================
  // LOAD SETTINGS
  // ============================================================

  useEffect(() => {
    try {
      const savedSettings =
        localStorage.getItem(
          SETTINGS_STORAGE_KEY
        );

      if (savedSettings) {
        const parsedSettings =
          JSON.parse(savedSettings);

        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsedSettings
        });
      }
    } catch (error) {
      console.error(
        'Failed to load settings:',
        error
      );
    }
  }, []);

  // ============================================================
  // HANDLE SETTING CHANGE
  // ============================================================

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));

    setSavedMessage('');
  };

  // ============================================================
  // SAVE SETTINGS
  // ============================================================

  const handleSave = () => {
    try {
      localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(settings)
      );

      setSavedMessage(
        'Settings saved successfully!'
      );

      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    } catch (error) {
      console.error(
        'Failed to save settings:',
        error
      );

      alert(
        'Failed to save settings.'
      );
    }
  };

  // ============================================================
  // RULE ENGINE UPDATE
  // ============================================================

  const handleUpdate = () => {
    alert(
      'Checking for rule engine updates... You are on the latest version.'
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">

      {/* ======================================================
          PAGE HEADER
      ======================================================= */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Configure your LegalScan AI preferences.
        </p>
      </div>

      {/* ======================================================
          AI CONFIDENCE THRESHOLDS
      ======================================================= */}

      <Card title="AI Confidence Thresholds">

        <div className="space-y-6">

          {/* HIGH CONFIDENCE */}

          <div>

            <div className="flex justify-between items-center mb-2">

              <label className="block text-sm font-medium text-gray-700">
                High Confidence Threshold (%)
              </label>

              <span className="text-sm font-semibold text-accent">
                {settings.highConfidenceThreshold}%
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={
                settings.highConfidenceThreshold
              }
              onChange={(e) =>
                handleChange(
                  'highConfidenceThreshold',
                  Number(e.target.value)
                )
              }
              className="w-full accent-accent"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>

              <span>
                {settings.highConfidenceThreshold}%
              </span>

              <span>100%</span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Findings above this threshold will be marked
              as highly confident.
            </p>

          </div>

          {/* REVIEW REQUIRED */}

          <div>

            <div className="flex justify-between items-center mb-2">

              <label className="block text-sm font-medium text-gray-700">
                Review Required Threshold (%)
              </label>

              <span className="text-sm font-semibold text-accent">
                {settings.reviewRequiredThreshold}%
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={
                settings.reviewRequiredThreshold
              }
              onChange={(e) =>
                handleChange(
                  'reviewRequiredThreshold',
                  Number(e.target.value)
                )
              }
              className="w-full accent-accent"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>

              <span>
                {settings.reviewRequiredThreshold}%
              </span>

              <span>100%</span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Findings below this threshold will automatically
              be flagged for officer review.
            </p>

          </div>

          {/* SAVE */}

          <div className="flex items-center gap-4">

            <Button onClick={handleSave}>
              Save Thresholds
            </Button>

            {savedMessage && (
              <span className="text-sm text-green-600 font-medium">
                ✓ {savedMessage}
              </span>
            )}

          </div>

        </div>

      </Card>

      {/* ======================================================
          SYSTEM CONFIGURATION
      ======================================================= */}

      <Card title="System Configuration">

        <div className="space-y-4">

          {/* RULE ENGINE VERSION */}

          <div className="flex items-center justify-between border-b border-border pb-4">

            <div>

              <p className="font-medium text-primary">
                Active Rule Engine Version
              </p>

              <p className="text-sm text-gray-500">
                Legal Metrology Rules 2011 (v2.4)
              </p>

            </div>

            <Button
              variant="outline"
              onClick={handleUpdate}
            >
              Update Engine
            </Button>

          </div>

          {/* NOTIFICATIONS */}

          <div className="flex items-center justify-between pt-2">

            <div>

              <p className="font-medium text-primary">
                Notification Preferences
              </p>

              <p className="text-sm text-gray-500">
                Receive alerts for High Severity violations
              </p>

            </div>

            <label className="relative inline-flex items-center cursor-pointer">

              <input
                type="checkbox"
                checked={
                  settings.highSeverityNotifications
                }
                onChange={(e) =>
                  handleChange(
                    'highSeverityNotifications',
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />

              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent">
              </div>

            </label>

          </div>

          {/* SAVE NOTIFICATION SETTING */}

          <div className="pt-3">

            <Button
              variant="outline"
              onClick={handleSave}
            >
              Save Preferences
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default Settings;