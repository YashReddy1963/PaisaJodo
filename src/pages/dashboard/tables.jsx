import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

// Sample datasets for different categories
const essentialThingsData = [
  {
    img: "/img/team-1.jpeg",
    name: "John Doe",
    email: "john@example.com",
    job: ["Engineer", "Tech"],
    online: true,
    date: "2024-03-21",
  },
  {
    img: "/img/team-1.jpeg",
    name: "Jane Smith",
    email: "jane@example.com",
    job: ["Manager", "HR"],
    online: false,
    date: "2024-03-19",
  },
];

const savingsData = [
  {
    img: "/img/team-1.jpeg",
    name: "Alice Brown",
    email: "alice@example.com",
    job: ["Accountant", "Finance"],
    online: true,
    date: "2024-02-15",
  },
  {
    img: "/img/team-1.jpeg",
    name: "Bob Johnson",
    email: "bob@example.com",
    job: ["Analyst", "Investment"],
    online: false,
    date: "2024-02-10",
  },
];

const lifestyleData = [
  {
    img: "/img/team-1.jpeg",
    name: "Charlie Green",
    email: "charlie@example.com",
    job: ["Designer", "Fashion"],
    online: true,
    date: "2024-01-05",
  },
  {
    img: "/img/team-1.jpeg",
    name: "Diana White",
    email: "diana@example.com",
    job: ["Photographer", "Travel"],
    online: false,
    date: "2024-01-01",
  },
];

export function Tables() {
  const [tableData, setTableData] = useState(essentialThingsData);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex items-center space-x-5">
          <Typography
              variant="h6"
              className="cursor-pointer text-gray-400 hover:text-gray-100 hover:bg-gray-900 px-2 py-1 rounded transition-all duration-200"
              onClick={() => setTableData(essentialThingsData)}
            >
              Essentials
            </Typography>
            <Typography
              variant="h6"
              className="cursor-pointer text-gray-400 hover:text-gray-100 hover:bg-gray-900 px-2 py-1 rounded transition-all duration-200"
              onClick={() => setTableData(savingsData)}
            >
              Savings
            </Typography>
            <Typography
              variant="h6"
              className="cursor-pointer text-gray-400 hover:text-gray-100 hover:bg-gray-900 px-2 py-1 rounded transition-all duration-200"
              onClick={() => setTableData(lifestyleData)}
            >
              Lifestyle
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Author", "Function", "Status", "Employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ img, name, email, job, online, date }, key) => {
                const className = `py-3 px-5 ${
                  key === tableData.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={img} alt={name} size="sm" variant="rounded" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {job[0]}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {job[1]}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={online ? "green" : "blue-gray"}
                        value={online ? "Online" : "Offline"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {date}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;