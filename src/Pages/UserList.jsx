import { useEffect, useRef, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import Button from "../Components/Button";
import Table from "../Components/Table";
import { handleGeneratePDF } from "../Utilities/ReactToPDF";
//import UserListPdf from "../Components/UserListPdf";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const componentRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/users");
        if (response.data) {
          //no need this timeout actually but for showing the loader one second.
          setTimeout(() => {
            setUsers(response.data);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const downloadPDF = () => {
    handleGeneratePDF(componentRef, "Users_List");
  };

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
          <Button ButtonName="Download" handleButton={downloadPDF} />
        </div>

        <div ref={componentRef} className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table tableData={users} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
