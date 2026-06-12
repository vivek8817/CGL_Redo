import React from 'react';
import BottomSheet from './BottomSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const settingsOptions = [
    { icon: 'solar:bell-bing-linear', label: 'Notifications' },
    { icon: 'solar:moon-linear', label: 'Dark Mode' },
    { icon: 'solar:shield-warning-linear', label: 'Privacy & Security' },
    { icon: 'solar:help-linear', label: 'Help & Support' },
    { icon: 'solar:logout-2-linear', label: 'Logout', color: 'text-widget-sleep-chart' },
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="flex flex-col gap-2 py-2">
        {settingsOptions.map((opt, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-sm  bg-surface-hover active:scale-95  cursor-pointer transition-transform">
            <iconify-icon icon={opt.icon} width="24" className={opt.color || "text-text-primary"}></iconify-icon>
            <span className={`text-base font-bold ${opt.color || "text-text-primary"}`}>{opt.label}</span>
            <iconify-icon icon="solar:alt-arrow-right-linear" width="20" className="ml-auto opacity-50"></iconify-icon>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
};

export default SettingsModal;
