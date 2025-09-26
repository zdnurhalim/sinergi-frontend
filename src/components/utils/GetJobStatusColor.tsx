export const getStatusColor = (status: string): string => {
  switch (status) {
    case "shortlisted":
      return "bg-green-100 text-green-800";
    case "applied":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "scheduled":
      return "bg-purple-100 text-purple-800";
    case "hired":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
