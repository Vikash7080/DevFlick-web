import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
//import { Link } from "react-router-dom";

const Connections = () => {
  const [loading, setLoading] = useState(true); // loading state
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // stop loading in all cases
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return <h1 className="text-center text-xl my-10">Loading...</h1>;
  }

  if (!connections || connections.length === 0) {
    return <h1 className="text-center text-xl my-10">No Connections Found</h1>;
  }

  return (
    <div className="my-10">
      <h1 className="text-bold text-2xl">Connections</h1>

      {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, age, gender, about } = connection;

        return (
          <div key={index} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2">
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p>{age + ", " + gender}</p>
              )}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
