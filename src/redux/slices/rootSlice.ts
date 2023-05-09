import { createSlice } from "@reduxjs/toolkit"

const rootSlice = createSlice({
    name: "root",
    initialState: {
        show: "Show",
        author: "Author",
        review: "Review",
        rating: "Rating",
    },
    reducers: {
        // action is submitted elsewhere - written to state.name
        chooseShow: (state, action) => { state.show = action.payload }, 
        chooseAuthor: (state, action) => { state.author = action.payload },
        chooseRating: (state, action) => { state.rating = action.payload },
        chooseReview: (state, action) => { state.review = action.payload },
    }
})

export const reducer = rootSlice.reducer;
export const { chooseShow, chooseAuthor, chooseRating, chooseReview } = rootSlice.actions