import React, { useEffect, useState } from "react";
import { Eye, X, Search, Filter, Calendar, Mail, MailOpen } from "lucide-react";
import {
  getNotificationMessage,
  markMessageAsSeen, // You'll need to create this API function
} from "../../../../api/service/axiosService";
import Pagination from "./Pagination";

const MessageTable = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeen, setFilterSeen] = useState("unseen"); 

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // State for preview modal
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [markingAsSeen, setMarkingAsSeen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getNotificationMessage();

        const formattedMessages = response.data.data.map((message) => ({
          _id: message._id,
          name: message.name || "Unknown",
          mobile: message.mobile || "",
          email: message.email || "",
          message: message.message || "",
          isSeen: message.isSeen || false,
          createdAt: new Date(message.createdAt).toLocaleDateString() || "",
          updatedAt: message.updatedAt || "",
        }));

        setMessages(formattedMessages);
        setFilteredMessages(formattedMessages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching message data:", err);
        setError("Failed to load message data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = messages;

    // Filter by seen status
    if (filterSeen !== "all") {
      result = result.filter((message) => {
        if (filterSeen === "seen") return message.isSeen;
        if (filterSeen === "unseen") return !message.isSeen;
        return true;
      });
    }

    // Search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(
        (message) =>
          (message.name || "").toLowerCase().includes(lowercasedSearch) ||
          (message.email || "").toLowerCase().includes(lowercasedSearch) ||
          (message.mobile || "").toLowerCase().includes(lowercasedSearch) ||
          (message.message || "").toLowerCase().includes(lowercasedSearch)
      );
    }

    setFilteredMessages(result);
    setCurrentPage(1);
  }, [searchTerm, filterSeen, messages]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMessages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviewMessage = async (message) => {
    setSelectedMessage(message);
    setIsPreviewOpen(true);

    // If message is unseen, mark it as seen
    if (!message.isSeen) {
      try {
        setMarkingAsSeen(true);
        await markMessageAsSeen(message._id);

        // Update local state
        const updatedMessages = messages.map((msg) => {
          if (msg._id === message._id) {
            return { ...msg, isSeen: true };
          }
          return msg;
        });

        setMessages(updatedMessages);
        setSelectedMessage({ ...message, isSeen: true });
        setMarkingAsSeen(false);
      } catch (error) {
        console.error("Error marking message as seen:", error);
        setMarkingAsSeen(false);
      }
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedMessage(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterSeen("unseen");
  };

  const getSeenBadgeColor = (isSeen) => {
    return isSeen
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg">
        <div className="text-center text-red-600 p-4 border border-red-200 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-2xl font-bold text-red-900">
          Message Notifications
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search messages..."
              className="px-4 py-2 pr-10 w-full border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              {searchTerm ? (
                <button onClick={clearSearch}>
                  <X size={18} className="text-red-500" />
                </button>
              ) : (
                <Search size={18} />
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-full sm:w-auto">
              <select
                value={filterSeen}
                onChange={(e) => setFilterSeen(e.target.value)}
                className="px-3 py-2 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm bg-white"
              >
                <option value="unseen">Unseen Messages</option>
                <option value="seen">Seen Messages</option>
                <option value="all">All Messages</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center"
            >
              <X size={16} className="mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Filter size={16} />
        <span>
          Showing {filteredMessages.length} of {messages.length} messages
        </span>
      </div>

      <div className="bg-white rounded-lg border border-red-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50 border-b border-red-100">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sl. No.
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Sender Details
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Message Preview
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-100">
              {currentItems.length > 0 ? (
                currentItems.map((message, index) => (
                  <tr
                    key={message._id}
                    className={`hover:bg-red-50 transition-colors duration-200 ${
                      !message.isSeen ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="p-3 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar size={12} className="mr-1" />
                        {message.createdAt}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {message.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.email}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.mobile}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="text-sm text-gray-900 truncate">
                        {message.message.length > 50
                          ? `${message.message.substring(0, 50)}...`
                          : message.message}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getSeenBadgeColor(
                          message.isSeen
                        )}`}
                      >
                        {message.isSeen ? (
                          <>
                            <MailOpen size={12} className="mr-1" />
                            Seen
                          </>
                        ) : (
                          <>
                            <Mail size={12} className="mr-1" />
                            Unseen
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center space-x-1"
                        onClick={() => handlePreviewMessage(message)}
                        title="Preview Message"
                      >
                        <Eye size={14} />
                        <span className="text-xs font-medium">Preview</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    No messages found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredMessages.length > 0 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            filteredBookings={filteredMessages}
            paginate={paginate}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>

      {/* Message Preview Modal */}
      {isPreviewOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-900 flex items-center">
                <Mail size={20} className="mr-2" />
                Message Details
                {markingAsSeen && (
                  <div className="ml-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500"></div>
                )}
              </h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sender Name
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm font-medium">
                    {selectedMessage.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {selectedMessage.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm">
                    {selectedMessage.mobile}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Received
                  </label>
                  <div className="bg-gray-50 p-3 rounded border border-gray-200 text-sm flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {selectedMessage.createdAt}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeenBadgeColor(
                    selectedMessage.isSeen
                  )}`}
                >
                  {selectedMessage.isSeen ? (
                    <>
                      <MailOpen size={14} className="mr-1" />
                      Seen
                    </>
                  ) : (
                    <>
                      <Mail size={14} className="mr-1" />
                      Unseen
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm leading-relaxed min-h-[120px]">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleClosePreview}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageTable;
