import { useEffect, useState } from "react";

import { useGetStatusQuery, useSetStatusMutation } from "@/redux/features/dashboard/dashboardApi";
import { CircleOff, Info, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import AnimationWrapper from "../shared/AnimationWrapper";
import { AppAlert } from "../shared/AppAlert";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type TInfo = {
    createdAt: string;
    description: string;
    id: string;
    status: "info" | "warning" | "error";
    updatedAt: string;
};

const StatusManagement = () => {
    const [info, setInfo] = useState<TInfo | null>();
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    const [setConfirmStatus] = useSetStatusMutation();
    const { data, isSuccess } = useGetStatusQuery("");

    useEffect(() => {
        if (isSuccess) {
            setInfo(data?.data);
            setDescription(data?.data?.description);
        } else {
            setInfo(null);
        }
    }, [data?.data, isSuccess]);

    const handleSetStatus = async () => {
        if (!status) {
            toast.error("Please select a status.");
            return;
        }
        if (!description) {
            toast.error("Please enter a description.");
            return;
        }
        const submittedMessage = {
            status,
            description,
        };
        await setConfirmStatus(submittedMessage)
            .unwrap()
            .then((res) => {
                toast.success(res?.message || "Log in successful ✅.");
                setStatus("");
                setDescription("");
            })
            .catch((res) => {
                toast.error(res?.data?.message || "something went wrong");
            });
    };

    return (
        <AnimationWrapper key={"Status_Management"}>
            <div className="mx-auto w-[90%] md:w-[60%] rounded-xl bg-secondary md:p-8">
                <div className="rounded-xl space-y-4 bg-background max-sm:drop-shadow-lg px-4 md:px-10 py-8">
                    <h1 className="text-2xl md:text-4xl font-medium">theDonki</h1>
                    {info && <AppAlert description={info?.description} status={info?.status} showbutton={true} />}
                    <Select
                        onValueChange={(e) => {
                            setStatus(e);
                        }}
                    >
                        <p className="pb-1">Status</p>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose Alert Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="info">
                                <span className="flex items-center gap-4">
                                    <Info /> Information
                                </span>
                            </SelectItem>
                            <SelectItem value="warning">
                                <span className="flex items-center gap-4">
                                    {" "}
                                    <TriangleAlert /> Warning
                                </span>
                            </SelectItem>
                            <SelectItem value="error">
                                <span className="flex items-center gap-4">
                                    <CircleOff /> Error
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="mt-4 grid w-full gap-1.5">
                        <Label className="text-base" htmlFor="message">
                            Status Description
                        </Label>
                        <Textarea
                            onChange={(e) => setDescription(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSetStatus();
                                }
                            }}
                            value={description}
                            className="resize-none"
                            placeholder="Type status description"
                            id="message"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button onClick={handleSetStatus} className="mx-auto mt-4 md:mt-8 px-6 md:px-10">
                            Confirm Status
                        </Button>
                    </div>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export { StatusManagement };
