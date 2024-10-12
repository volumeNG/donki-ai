import { useDeleteStatusMutation } from "@/redux/features/dashboard/dashboardApi";
import { CircleOff, Info, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const AppAlert = ({
    status,
    description,
    showbutton,
}: {
    description: string;
    status?: "info" | "warning" | "error";
    showbutton?: boolean;
}) => {
    let icon = <Info className="text-primary" />;

    if (status === "info") {
        icon = <Info className="text-primary" />;
    } else if (status === "warning") {
        icon = <TriangleAlert className="text-yellow-400" />;
    } else if (status === "error") {
        icon = <CircleOff className="text-red-500" />;
    }

    const [deleteInfo] = useDeleteStatusMutation();

    const handleDeleteInfo = async () => {
        await deleteInfo("")
            .unwrap()
            .then((res) => {
                toast.success(res?.message);
            })
            .catch((res) => {
                toast.error(res?.data?.message || "something went wrong");
            });
    };

    return (
        <div
            className={cn(
                "border rounded-md flex max-sm:items-start text-xs lg:text-md  items-center px-3 py-2 gap-3",
                status === "info" && "border-primary",
                status === "warning" && "border-yellow-400",
                status === "error" && "border-red-500",
                "max-sm:items-start"
            )}
        >
            <div className="min-w-[20px]">{icon}</div>
            {description}
            {showbutton && (
                <Button
                    onClick={handleDeleteInfo}
                    size={"sm"}
                    className={cn(
                        "pl-4 inline-block",
                        status === "info" && "bg-primary",
                        status === "warning" && "bg-yellow-400 text-gray-800 hover:bg-yellow-500",
                        status === "error" && "bg-red-500 hover:bg-red-600"
                    )}
                >
                    Unpublish
                </Button>
            )}
        </div>
    );
};

export { AppAlert };
