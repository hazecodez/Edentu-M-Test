import PropTypes from "prop-types";

export default function UserListPdf({ users,CompoRef }) {
  return (
    <div ref={CompoRef} className="flex flex-col">
      <div className="flex items-center justify-center p-6">
        <h1 className="text-4xl">User Details</h1>
      </div>
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
          </tr>
        </thead>
        <tbody>
          {users.map((data, index) => (
            <>
              <tr key={index} className="odd:bg-white even:bg-gray-100">
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
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

UserListPdf.propTypes = {
  users: PropTypes.array.isRequired,
  CompoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};
