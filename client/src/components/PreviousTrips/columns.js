import { CameraIcon } from "@heroicons/react/24/solid";

export const columnDef = [
  {
    accessorKey: "pk",
    header: "#",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "siteName",
    header: "Site Location",
  },
  {
    accessorKey: "descrb",
    header: "Description",
  },
  {
    accessorKey: "fishCaught",
    header: "Fish Caught",
  },
  {
    accessorKey: "tideType",
    header: "Tide",
  },
  {
    accessorKey: "url",
    header: "Photos",
    cell: ({ getValue }) => (
      <div className="">
        <a href={getValue()} target="_blank">
          <CameraIcon className="h-6 w-6" />
        </a>
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
];
