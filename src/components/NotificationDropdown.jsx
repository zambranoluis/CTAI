"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { FaBell } from "react-icons/fa6";
import { subscribeToNotifications } from "../services/notificationService";

const NotificationDropdown = ({ theme }) => {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!session) {
      setIsDropdownOpen(false);
      return;
    }

    const userId = session.user.id;

    // Suscribirse a las notificaciones pasando userId
    const unsubscribe = subscribeToNotifications(userId, (newNotification) => {
      setNotifications((prev) => [...prev, newNotification]);
    });

    // Cleanup on component unmount
    return () => {
      unsubscribe();
    };
  }, [session]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className='relative'>
      <button aria-label='Alert' onClick={toggleDropdown}>
        <FaBell
          className={`text-[30px] hover:text-[--color-primary] transition-all ease-in text-[--color-text] p-1 hover:cursor-pointer`}
        />
        {notifications.length > 0 && (
          <span className='absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full text-white text-xs flex items-center justify-center'>
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown de notificaciones */}
      {isDropdownOpen && (
        <div className='absolute top-[35px] left-[-300px] w-[320px] bg-[--color-background-shade] text-[--color-text] border border-[var(--color-primary)] rounded-md shadow-lg z-10'>
          <div className='p-4'>
            <p className='font-bold text-center'>Notifications</p>
            <div className='mt-2 max-h-48 overflow-y-auto'>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className='p-2 border-b border-[var(--color-background-shade)]'>
                    <p className='font-semibold'>
                      Establishment: {notification.commerceName}
                    </p>
                    <p>Type: {notification.reportType}</p>
                    <p>Date: {notification.reportDate}</p>
                  </div>
                ))
              ) : (
                <p className='text-center'>Dont have notifications</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
