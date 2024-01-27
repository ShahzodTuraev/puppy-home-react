import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectCommunityPage = (state: AppRootState) => state.communityPage;
export const retrieveTargetBoArticles = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.targetBoArticles
);
export const retrieveChosenMember = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.chosenMember
);
export const retrieveChosenMemberBoArticles = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.chosenMemberBoArticles
);
export const retrieveChosenSingleBoArticle = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.chosenSingleBoArticle
);
export const retrieveMemberFollowers = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.memberFollowings
);
export const retrieveBoArticleReviews = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.boArticleReviews
);
