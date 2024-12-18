import React, { useEffect, useState } from "react";
import { Button, CardTitle, Col, Row } from "reactstrap";
import EventsAPI from "../../api/EventsAPI";
import GroupsAPI from "../../api/GroupsAPI";
import Loader from "../Loader";
import PostsTable from "../shared/PostsTable";
import RecentPostCard from "./RecentPostCard";
import UpcomingEventCard from "./UpcomingEventCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const getUpcomingEvents = async () => {
    const res = await EventsAPI.getAll({
      filter: { isAttending: true, minDate: new Date() },
    });
    setEvents(res);
  };

  const getGroupPosts = async () => {
    const locationReviews = await GroupsAPI.getRecentPosts();
    setPosts(locationReviews);
  };

  const getData = async () => {
    try {
      await Promise.all([getUpcomingEvents(), getGroupPosts()]);
      setIsLoading(false);
    } catch (e) {
      setError(e?.message || "Failed to get event/posts");
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div class="alert alert-danger container" role="alert">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Row style={{ gap: "32px", justifyContent: "center" }}>
      <Col sm="5">
        <CardTitle className="fs-4" style={{ marginBottom: "16px" }}>
          Recent Activity
        </CardTitle>
        {posts.length === 0 ? (
          <>
            <p>Feed is empty at this moment</p>
            <Link to="/groups">
              <Button className="yellow-button" color="warning">
                Explore Groups
              </Button>
            </Link>
          </>
        ) : (
          <PostsTable
            posts={posts}
            CardComponent={RecentPostCard}
          />
        )}
      </Col>
      <Col sm="5">
        <CardTitle className="fs-4" style={{ marginBottom: "16px" }}>
          Upcoming Events
        </CardTitle>
        {events.length > 0 ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {events.map((event) => (
              <UpcomingEventCard
                key={event.id}
                event={event}
                getEvents={getUpcomingEvents}
              />
            ))}
          </div>
        ) : (
          <>
            <p>No results</p>
            <Link to="/events">
              <Button className="yellow-button" color="warning">
                Explore Events
              </Button>
            </Link>
          </>
        )}
      </Col>
    </Row>
  );
};

export default HomePage;
