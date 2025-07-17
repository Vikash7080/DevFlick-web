import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Review failed", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Fetching requests failed", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center my-20 px-4 text-center animate-fade-in">
        <h1 className="text-3xl font-bold text-white mb-4 underline decoration-blue-500 decoration-4 underline-offset-4">
          Connection  Requests
        </h1>
        <p className="text-lg text-gray-400 flex items-center gap-2">
          <span>🙅‍♂️</span>No new requests right now!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white underline decoration-purple-500 decoration-4 underline-offset-8 animate-fade-in">
          Connection Requests
        </h1>
        <p className="text-gray-400 mt-2 flex justify-center items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9l-6 6-6-6"
            />
          </svg>
          Accept or reject incoming connection requests.
        </p>
      </div>

      <div className="grid gap-6">
        {requests.map((request, idx) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className={`bg-base-300 p-6 rounded-xl flex flex-col sm:flex-row items-center sm:justify-between shadow-md transition hover:shadow-lg animate-fade-in delay-${idx * 100}`}
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img
                  alt="User"
                  className="w-20 h-20 rounded-full object-cover transform hover:scale-105 transition duration-300"
                  src={photoUrl}
                />
                <div>
                  <h2 className="font-bold text-xl text-white">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-300">{age}, {gender}</p>
                  )}
                  {about && <p className="text-gray-400">{about}</p>}
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-3">
                <button
                  className="btn btn-error text-white"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success text-white"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
