"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";

interface UserData {
  name?: string;
  email?: string;
}

interface ProfileMenuProps {
  user: UserData;
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-primary-600 text-white font-semibold flex items-center justify-center"
      >
        {user?.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-800">
              {user?.name ?? "User"}
            </p>
            <p className="text-sm text-gray-500">
              {user?.email ?? "No email available"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
