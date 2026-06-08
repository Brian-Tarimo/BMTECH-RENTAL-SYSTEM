import {
    useEffect,
    useState,
  } from "react";
  
  import DashboardLayout from "../../layouts/DashboardLayout";
  
  import API from "../../services/api";
  
  function Notifications() {
  
    const [notifications, setNotifications] =
      useState([]);
  
    const fetchNotifications =
      async () => {
  
        const response =
          await API.get(
            "/notifications"
          );
  
        setNotifications(
          response.data
        );
      };
  
    useEffect(() => {
  
      fetchNotifications();
  
    }, []);
  
    const markAsRead = async (id) => {
  
      await API.put(
        `/notifications/read/${id}`
      );
  
      fetchNotifications();
    };
  
    return (
      <DashboardLayout>
  
        <div>
  
          <h1 className="text-3xl font-bold mb-8">
            Notifications
          </h1>
  
          <div className="space-y-4">
  
            {notifications.map(
              (notification) => (
  
                <div
                  key={notification._id}
                  className={`p-5 rounded-2xl shadow-md border ${
                    notification.isRead
                      ? "bg-gray-100"
                      : "bg-white"
                  }`}
                >
  
                  <div className="flex justify-between items-start">
  
                    <div>
  
                      <h2 className="font-bold text-lg">
                        {notification.title}
                      </h2>
  
                      <p className="text-gray-600 mt-1">
                        {notification.message}
                      </p>
  
                      <span className="inline-block mt-3 text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
  
                        {notification.type}
  
                      </span>
  
                    </div>
  
                    {!notification.isRead && (
  
                      <button
                        onClick={() =>
                          markAsRead(
                            notification._id
                          )
                        }
                        className="bg-emerald-500 text-white px-4 py-2 rounded-lg"
                      >
                        Mark Read
                      </button>
  
                    )}
  
                  </div>
  
                </div>
  
              )
            )}
  
          </div>
  
        </div>
  
      </DashboardLayout>
    );
  }
  
  export default Notifications;