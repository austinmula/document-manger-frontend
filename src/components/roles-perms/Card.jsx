import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
// import { deletepermission } from "../../features/permissions/permissionSlice";

import { DeleteButton } from "../forms/components/DeleteButton";

export default function Card({ item, remove }) {
  const dispatch = useDispatch();

  return (
    <div>
      <div
        key={item.id}
        className="flex bg-white items-center p-2 justify-between shadow-sm"
      >
        <div className="flex items-center ">
          <div className="rounded-full shrink-0 bg-gray-100 h-8 w-8 flex items-center justify-center">
            <BriefcaseIcon className="h-4 w-4 text-emerald-800" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-700">{item.name}</p>
            <p className="text-sm text-gray-500 truncate">{item.slug}</p>
          </div>
        </div>
        <div>
          <DeleteButton
            onClick={() => remove(item.id)}
            className="rounded-full shrink-0 bg-gray-100 h-8 w-8 flex items-center justify-center cursor-pointer"
          >
            <TrashIcon className="h-5 w-5 text-red-700" />
          </DeleteButton>
        </div>
      </div>
    </div>
  );
}
