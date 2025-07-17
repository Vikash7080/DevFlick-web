import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data || []));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary loading-lg" />
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="text-6xl mb-4">🫂</div>
        <h1 className="text-2xl font-semibold text-gray-200 mb-2">
          No Connections Yet
        </h1>
        <p className="text-gray-400 max-w-md">
          You haven’t connected with anyone yet. Start exploring developer profiles and send some connection requests to grow your network!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
        👥 Your Connections
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={index}
              className="bg-[#1f1f1f] rounded-2xl shadow-lg border border-gray-700 p-6 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <img
                src={photoUrl || "https://placehold.co/120x120?text=User"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4"
              />
              <h2 className="text-lg font-semibold text-white">
                {firstName} {lastName}
              </h2>
              {(age || gender) && (
                <p className="text-sm text-gray-400">{age}{age && gender ? ", " : ""}{gender}</p>
              )}
              <p className="text-sm text-gray-300 mt-2 line-clamp-3">{about || "No bio available."}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
