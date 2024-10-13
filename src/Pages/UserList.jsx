import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await axiosInstance.get("/users");
      if (response.data) {
        //no need this timeout actually but for showing the loader one second.
        setTimeout(() => {
          setUsers(response.data);
          setLoading(false);
        }, 1000);
      }
    };
    fetchUsers();
  }, []);
  return (
    <DashboardLayout>
      {loading && (
        <div className="absolute left-56 inset-0 flex items-center justify-center z-10">
          <BeatLoader loading={loading} size={30} />
        </div>
      )}
      <div className="xl:pl-72">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Users List</h1>
          <button
            className="border rounded-md transition-colors duration-500 w-32 bg-gray-200 hover:bg-white"
            onClick={() => console.log("hello")}
          >
            Download
          </button>
        </div>

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        User Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((data, index) => (
                      <>
                        <tr
                          key={index}
                          className="odd:bg-white even:bg-gray-100"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {data.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {data.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {data.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-red-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Block
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
