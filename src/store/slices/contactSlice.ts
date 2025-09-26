import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        list: [
            { id: 1, name: "Owner", phone: "+91 8892111452" },
            { id: 2, name: "Maintenance", phone: "+91 7815015012" },
            { id: 3, name: "Help Desk", phone: "+91 8310048499"}
        ],
    },
    reducers: {},
})

export default contactsSlice.reducer;