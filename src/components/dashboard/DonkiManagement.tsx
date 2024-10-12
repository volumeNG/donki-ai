import { useEffect, useState } from "react";

import { useGetAiConfigQuery, useSetAiConfigMutation } from "@/redux/features/dashboard/dashboardApi";
import { toast } from "sonner";

import AnimationWrapper from "../shared/AnimationWrapper";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const DonkiManagement = () => {
    const [model, setModel] = useState("");
    const [modelMessage, setModelMessage] = useState("");
    const [setAiConfig] = useSetAiConfigMutation();
    const { data: aiModelData, isSuccess: aiModelSuccess } = useGetAiConfigQuery("");

    useEffect(() => {
        if (aiModelSuccess) {
            setModel(aiModelData?.data?.aiModel);
            setModelMessage(aiModelData?.data?.instructions);
        } else {
            setModel("");
            setModelMessage("");
        }
    }, [aiModelData?.data, aiModelSuccess]);

    const handleSetAIModel = async () => {
        if (!model) {
            toast.error("Please select a model");
            return;
        }
        if (!modelMessage) {
            toast.error("Please enter a message");
            return;
        }
        const submittedMessage = {
            aiModel: model,
            instructions: modelMessage,
        };
        await setAiConfig(submittedMessage)
            .unwrap()
            .then((res) => {
                toast.success(res?.message || "Log in successful ✅.");
                setModel("");
                setModelMessage("");
            })
            .catch((res) => {
                toast.error(res?.data?.message || "something went wrong");
            });
    };

    return (
        <AnimationWrapper key={"theDonki_Management"}>
            <div className="mx-auto w-[90%] md:w-[60%] rounded-xl bg-secondary md:p-8">
                <div className="rounded-xl space-y-4 bg-background max-sm:drop-shadow-lg px-4 md:px-10 py-8">
                    <h1 className="text-2xl md:text-4xl font-medium">theDonki</h1>

                    <Select value={model} onValueChange={(e) => setModel(e)}>
                        <p>AI Model</p>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose AI model" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="GPT_4">GPT 4</SelectItem>
                            <SelectItem value="GPT_4_TURBO">GPT 4 TURBO</SelectItem>
                            <SelectItem value="GPT_3_5_TURBO">GPT 3.5 TURBO </SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="mt-4 grid w-full gap-1.5">
                        <Label className="text-base" htmlFor="message">
                            Your message
                        </Label>
                        <Textarea
                            value={modelMessage}
                            onChange={(e) => setModelMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSetAIModel();
                                }
                            }}
                            className="resize-none"
                            placeholder="Type your message here."
                            id="message"
                        />
                    </div>
                    <p className="mt-4 max-sm:text-sm  md:mt-6">
                        Unfruitful Count: <span className="font-medium">{aiModelData?.data?.unTruthfulCount}</span>
                    </p>
                    <div className="flex items-center justify-center">
                        <Button onClick={handleSetAIModel} className="mx-auto mt-4 md:mt-8 px-6 md:px-10">
                            Change AI Model
                        </Button>
                    </div>
                </div>
            </div>
        </AnimationWrapper>
    );
};

export { DonkiManagement };
