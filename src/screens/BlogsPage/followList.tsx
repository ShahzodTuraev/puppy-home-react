import { Avatar, Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
// REDUX
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowers, setMemberFollowings } from "./slice";
import { retrieveMemberFollowers, retrieveMemberFollowings } from "./selector";
import { Follower, Following } from "../../types/follow";
import FollowApiService from "../../app/apiServices/followApi";
import { serverApi } from "../../app/lib/config";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispatch(setMemberFollowers(data)),
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});
// REDUX SELECTOR
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({
    memberFollowers,
  })
);
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);

const FollowList = ({
  followCase,
  user,
  unfollowHandler,
  followRebuild,
  followHandler,
}: any) => {
  /*INITIALIZATIONS*/
  const { setMemberFollowers, setMemberFollowings } = actionDispatch(
    useDispatch()
  );
  const { memberFollowers } = useSelector(memberFollowersRetriever);
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers({
        page: 1,
        limit: 100,
        mb_id: user._id,
      })
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [user, followRebuild]);

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings({
        page: 1,
        limit: 100,
        mb_id: user?._id,
      })

      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [user, followRebuild]);

  /*HANDLERS*/

  return (
    <Stack className="follow_list_container">
      <p className="follow_title">{followCase}</p>
      <Box className="user_list">
        {followCase === "followers" &&
          memberFollowers.map((follower) => {
            const img_path = follower.subscriber_member_data.mb_image
              ? `${serverApi}/${follower.subscriber_member_data.mb_image}`
              : "/icons/user_avatar.jpg";
            return (
              <Box key={follower._id} className="user_item">
                <Box className="user_info_wrap">
                  <Avatar className="user_avatar" src={img_path} alt="User" />
                  <Box className="user_info">
                    <p className="user_nick">
                      {follower.subscriber_member_data.mb_nick}
                    </p>
                    <p className="user_type">
                      {follower.subscriber_member_data.mb_type}
                    </p>
                  </Box>
                </Box>
                {follower?.me_followed &&
                follower?.me_followed[0]?.my_following ? (
                  <Button disabled className="follow_btn follow_disable_btn">
                    Following
                  </Button>
                ) : (
                  <Button
                    id={follower.subscriber_member_data?._id}
                    onClick={followHandler}
                    className="follow_btn"
                  >
                    Follow
                  </Button>
                )}
              </Box>
            );
          })}
        {followCase === "following" &&
          memberFollowings.map((following) => {
            const img_path = following.follow_member_data.mb_image
              ? `${serverApi}/${following.follow_member_data.mb_image}`
              : "/icons/user_avatar.jpg";
            return (
              <Box key={following._id} className="user_item">
                <Box className="user_info_wrap">
                  <Avatar className="user_avatar" src={img_path} alt="User" />
                  <Box className="user_info">
                    <p className="user_nick">
                      {following.follow_member_data.mb_nick}
                    </p>
                    <p className="user_type">
                      {following.follow_member_data.mb_type}
                    </p>
                  </Box>
                </Box>
                <Button
                  onClick={unfollowHandler}
                  id={following?.follow_member_data?._id}
                  className="follow_btn"
                >
                  Unfollow
                </Button>
              </Box>
            );
          })}
      </Box>
    </Stack>
  );
};

export default FollowList;
