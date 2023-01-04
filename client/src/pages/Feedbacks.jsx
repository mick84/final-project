import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import { FormLayout, Page, Button, FormButtons, Card } from "../common/layout";
import { useCallback } from "react";
import { palette } from "../common/palette";
import { formatDate } from "../utils/date";
const Form = styled(FormLayout)`
  .top {
    display: flex;
    justify-content: space-between;
  }
  textarea {
    border-radius: 0.5rem;
    border: none;
    outline: none;
    padding: 1rem;
    font-size: 1.1rem;
    resize: none;
  }
  button[type="button"] {
    color: blue;
  }
`;
const FeedbackComp = styled(Card)`
  font-size: 1.3rem;
  color: white;
  max-width: 800px;
  &:nth-of-type(even) {
    background-image: linear-gradient(
      to top right,
      ${palette.steelTeal} 30%,
      ${palette.lapisLazuli} 70%
    );
  }
  &:nth-of-type(odd) {
    background-image: linear-gradient(
      to top right,
      ${palette.lapisLazuli} 30%,
      ${palette.steelTeal} 70%
    );
  }
  .top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .sendername {
      color: ${(props) => props.color};
    }
    .date {
      margin: 0 1rem;
    }
  }
  .content {
    font-style: italic;
    padding: 1rem;
    letter-spacing: 0.075rem;
  }
  .buttons {
    display: flex;
    gap: 1rem;
    margin-left: auto;
    width: fit-content;
    button {
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      border: none;
      width: 5rem;
      color: white;
    }
    .delete {
      background-color: ${palette.rossoCorsa};
    }
    .edit {
      background-color: ${palette.lapisLazuli};
    }
  }
`;
const FeedbacksPage = styled(Page)`
  .feedbacks-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
export const Feedbacks = () => {
  const theme = useTheme();
  const { state } = useAuth();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const handleRating = (rate) => setRating(() => rate);
  const [page, setPage] = useState(1);

  const [posts, setPosts] = useState({
    feedbacks: [],
    lastPage: false,
  });
  const fetchPortionFeedbacks = useCallback(async (page) => {
    try {
      const { data: feedbackList } = await API.get(`/feedbacks/${page}`);
      setPosts((ps) => ({
        feedbacks: ps.feedbacks.concat(feedbackList),
        lastPage: feedbackList.length < 10,
      }));
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchPortionFeedbacks(page);
    //!delete it after!
    setPage(1);
  }, [fetchPortionFeedbacks, page]);
  console.log(posts.feedbacks);
  const resetFeedback = () => {
    setContent(() => "");
  };
  const sendFeedback = async (e) => {
    try {
      e.preventDefault();
      const { data } = await API.post(
        "/feedbacks",
        { rating, content },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setContent(() => "");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFeedback = async (id, index) => {
    try {
      const { data } = await API.delete(`/feedbacks/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      posts.feedbacks.splice(index, 1);
      setPosts((p) => ({ ...p }));
      console.log(data);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  return (
    <FeedbacksPage theme={theme}>
      {state.user && (
        <Form onSubmit={sendFeedback} onReset={resetFeedback}>
          <div className="top">
            <div className="title"> Feedback:</div>
            <Rating onClick={handleRating} iconsCount={5} size={20} />
          </div>
          <hr />
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => setContent(() => e.target.value)}
          />
          <FormButtons>
            <Button type="reset">Clear</Button>

            <Button type="submit" disabled={!content}>
              Send feedback
            </Button>
          </FormButtons>
        </Form>
      )}
      <div className="feedbacks-list">
        {posts.feedbacks.map((fb, index) => (
          <FeedbackComp
            key={fb._id}
            color={fb.senderNick === state.user?.nickname ? "#84fd8a" : "white"}
          >
            <div className="top">
              <div>
                <span className="sendername"> @{fb.senderNick}</span>, at
                <span className="date">{formatDate(fb.updatedAt)}</span>
              </div>
              <Rating
                size={15}
                iconsCount={5}
                initialValue={fb.rating}
                readonly={true}
              />
            </div>
            <div className="content">{fb.content}</div>
            {state.user && state.user.nickname === fb.senderNick && (
              <div className="buttons">
                <button
                  className="delete"
                  onClick={deleteFeedback.bind(null, fb._id, index)}
                >
                  Delete
                </button>
              </div>
            )}
          </FeedbackComp>
        ))}
      </div>
    </FeedbacksPage>
  );
};
