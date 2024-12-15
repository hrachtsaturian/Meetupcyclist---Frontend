import React from "react";

const PostsTable = ({ posts, getPosts, CardComponent }) => {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
            }}
        >
            {posts.length === 0 ? (
                <p>Feed is empty at this moment</p>
            ) : (
                <>
                    {posts.map((post) => (
                        <CardComponent
                            key={post.id}
                            post={post}
                            getPosts={getPosts}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default PostsTable;
