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
    header: "Fish#",
  },
  {
    accessorKey: "tideType",
    header: "Tide",
  },
  {
    accessorKey: "url",
    header: "Pics",
    cell: ({ getValue }) => (
      <a href={getValue()} target="_blank" rel="noreferrer" className="flex justify-center">
        <CameraIcon className="h-6 w-6" />
      </a>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
];
