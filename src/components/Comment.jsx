import React, { useEffect, useState } from "react";
import { Avatar, Card, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { GetCompanyComment, addCompanyReview } from "../store/API/reviews";
import { Divider } from "@chakra-ui/react";

function Comment({ id }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { data: user, isLoading: userLoading } = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    dispatch(GetCompanyComment(id));
  }, [id, dispatch]);

  const { data: reviews, isLoading: reLoading } = useSelector(
    (state) => state.reviews.companyReview
  );
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const neComment = {
      content: comment,
      company: id,
    };
    dispatch(addCompanyReview(neComment));
    setComment("");
    dispatch(GetCompanyComment(id));
  };

  return (
    <Card className="bg-slate-500">
      {user.id ? (
        <>
          <div className="flex">
            <div className="flex gap-3 items-center">
              {user && (
                <>
                  <Avatar
                    alt={user.fullName}
                    img={user.profile}
                    rounded={true}
                  />
                  <span className="text-xl font-bold text-white">
                    {user.fullName}
                  </span>
                </>
              )}
            </div>
          </div>
          <Textarea
            value={comment}
            rows={4}
            placeholder="Write Your Review"
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="bg-secondary text-black rounded-lg h-12 font-bold text-xl"
          >
            Send
          </button>
          <div className="flex flex-col gap-3">
            {reLoading ? (
              <h5 className="text-base font-medium dark:text-white">
                Loading...
              </h5>
            ) : (
              reviews.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-slate-700 rounded-xl pl-10 py-2 pr-12"
                >
                  <div className="flex items-center mb-4 ">
                    <Avatar
                      alt={comment.user.fullName}
                      img={comment.user.profile}
                      rounded={true}
                      className="text-xl mr-5 "
                    />

                    <p className="text-base text-slate-100 dark:text-slate-100">
                      {comment.user.fullName}
                    </p>
                  </div>
                  <Divider />
                  <h5 className="text-base font-medium dark:text-white pl-2">
                    {comment.content}
                  </h5>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>you cant write review</p>
      )}
    </Card>
  );
}

export default Comment;
