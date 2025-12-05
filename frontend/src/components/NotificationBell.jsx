// components/NotificationBell.jsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";

import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/api/notifications";

export default function NotificationBell({ notifications = [], isLoading }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const unreadCount = notifications.filter(
    (n) => n.status === "PENDING"
  ).length;

  const markOneMutation = useMutation({
    mutationFn: (id) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const markAllMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  return (
    <div className="relative">
      {/* Дзвіночок */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-black/10 transition"
      >
        <Bell className="w-7 h-7 text-black" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] px-1 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Випадаюче меню */}
      {open && (
        <div className="absolute right-0 mt-3 w-80 max-h-96 overflow-auto rounded-2xl bg-white shadow-xl border border-gray-200 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-semibold text-sm">Сповіщення</span>

            {notifications.length > 0 && (
              <button
                className="text-xs text-blue-600 hover:underline"
                onClick={() => markAllMutation.mutate()}
              >
                Позначити всі
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto">
            {isLoading && (
              <p className="px-4 py-3 text-sm text-gray-500">
                Завантаження...
              </p>
            )}

            {!isLoading && notifications.length === 0 && (
              <p className="px-4 py-3 text-sm text-gray-500">
                Сповіщень поки немає 💌
              </p>
            )}

            {!isLoading &&
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() =>
                    n.status === "PENDING" &&
                    markOneMutation.mutate(n.id)
                  }
                  className={`w-full text-left px-4 py-3 text-sm border-b last:border-b-0 ${
                    n.status === "PENDING"
                      ? "bg-orange-50 hover:bg-orange-100"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex gap-2 items-start">
                    <span className="mt-1 text-xs">🔔</span>
                    <span>{n.message}</span>
                  </div>
                </button>
              ))}
          </div>

          <div className="px-4 py-2 border-t text-xs text-right">
            <a href="/notifications" className="text-blue-600 hover:underline">
              Показати всі
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
