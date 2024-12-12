import React from "react";
import GroupPostCard from "./GroupPostCard";

const GroupPostsTable = ({ groupPosts, groupAdminId, getPosts }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {groupPosts.length === 0 ? (
        <p>Feed is empty at this moment.</p>
      ) : (
        <>
          {groupPosts.map((groupPost) => (
            <GroupPostCard
              key={groupPost.id}
              groupPost={groupPost}
              groupAdminId={groupAdminId}
              getPosts={getPosts}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GroupPostsTable;
