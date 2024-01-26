import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../types/screen";

const initialState: CommunityPageState = {
  targetBoArticles: [],
  chosenMember: null,
  chosenMemberBoArticles: [],
  chosenSingleBoArticle: null,
  memberFollowers: [],
  memberFollowings: [],
};

const communityPageSlice = createSlice({
  name: "communityPage",
  initialState,
  reducers: {
    setTargetBoArticles: (state, action) => {
      state.targetBoArticles = action.payload;
    },
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenMemberBoArticles: (state, action) => {
      state.chosenMemberBoArticles = action.payload;
    },
    setChosenSingleBoArticle: (state, action) => {
      state.chosenSingleBoArticle = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const {
  setTargetBoArticles,
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
  setMemberFollowers,
  setMemberFollowings,
} = communityPageSlice.actions;

const CommunityPageReducer = communityPageSlice.reducer;
export default CommunityPageReducer;
