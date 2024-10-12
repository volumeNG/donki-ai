import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IConversation = { role: "user" | "assistant"; content: string };
type IState = {
    conversation: IConversation[];
    isError: boolean;
};

const initialState: IState = {
    // accessToken: null,
    conversation: [],
    isError: false,
};

const openAiSlice = createSlice({
    name: "openAi",
    initialState,
    reducers: {
        addConversationMessage: (state, action: PayloadAction<IConversation>) => {
            state.conversation.push(action.payload);
        },
        setConversationMessage: (state, action: PayloadAction<IConversation[]>) => {
            state.conversation = action.payload;
        },
        deleteConversationMessages: (state, action: PayloadAction<number[]>) => {
            state.conversation = state.conversation.filter((c, i) => !action.payload.includes(i));
        },
        setIsError: (state, action: PayloadAction<boolean>) => {
            {
                state.isError = action.payload;
            }
        },
    },
});

export const { addConversationMessage, setConversationMessage, deleteConversationMessages, setIsError } =
    openAiSlice.actions;

export default openAiSlice.reducer;
