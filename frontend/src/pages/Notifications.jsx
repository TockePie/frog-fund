// pages/NotificationsPage.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/api/notifications"

export default function NotificationsPage() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications().then((res) => res.data),
  })

  const notifications = data || []

  const markOneMutation = useMutation({
    mutationFn: (id) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"])
    },
  })

  const markAllMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"])
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Сповіщення</h1>
          {notifications.length > 0 && (
            <button
              onClick={() => markAllMutation.mutate()}
              className="text-sm px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
            >
              Позначити всі прочитаними
            </button>
          )}
        </div>

        {isLoading && <p>Завантаження...</p>}

        {!isLoading && notifications.length === 0 && (
          <p className="text-gray-500">У вас ще немає сповіщень 💌</p>
        )}

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3 rounded-2xl border ${
                n.status === "PENDING"
                  ? "border-orange-300 bg-orange-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="mt-1">🔔</div>
              <div className="flex-1">
                <p className="text-sm">{n.message}</p>
              </div>
              {n.status === "PENDING" && (
                <button
                  onClick={() => markOneMutation.mutate(n.id)}
                  className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-white"
                >
                  Прочитано
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
