import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Loader2 } from "lucide-react";
import React from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Error verifying premium user", err);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      setLoading(true);
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevFlick",
        description: "Unlock premium features for developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: { color: "#2563EB" },
        handler: async function (response) {
          try {
            console.log("Payment success:", response);
            // Webhook backend pe call hoga → user premium banega
            // thoda delay de ke dobara verify call
            setTimeout(() => verifyPremiumUser(), 3000);
          } catch (err) {
            console.error("Payment handling failed:", err);
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error creating payment", err);
      setLoading(false);
    }
  };

  if (isUserPremium) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center items-center h-[80vh] text-center"
      >
        <div className="bg-green-100 border border-green-300 rounded-2xl shadow-lg p-10">
          <h1 className="text-3xl font-bold text-green-700">
            🎉 You're already a Premium Member!
          </h1>
          <p className="mt-4 text-gray-600">
            Enjoy unlimited connections and exclusive perks 🚀
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-16 px-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10"
      >
        Choose Your <span className="text-blue-600">Premium Plan</span>
      </motion.h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Silver Plan */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Silver Membership
            </h2>
            <p className="text-gray-500 mt-2">Best for starters</p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✔ Chat with developers</li>
              <li>✔ 100 connection requests / day</li>
              <li>✔ Blue verification tick</li>
              <li>✔ Valid for 3 months</li>
            </ul>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={() => handleBuyClick("silver")}
            className={`mt-8 w-full py-3 rounded-xl text-white font-semibold transition-all cursor-pointer flex items-center justify-center ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing...
              </>
            ) : (
              "Buy Silver - ₹499"
            )}
          </motion.button>
        </motion.div>

        {/* Gold Plan */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-2xl rounded-2xl p-8 flex flex-col justify-between border-2 border-yellow-400"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Gold Membership ⭐
            </h2>
            <p className="text-gray-600 mt-2">Most Popular</p>
            <ul className="mt-6 space-y-3 text-gray-800">
              <li>✔ Chat with developers</li>
              <li>✔ Unlimited connection requests</li>
              <li>✔ Blue verification tick</li>
              <li>✔ Valid for 6 months</li>
            </ul>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            onClick={() => handleBuyClick("gold")}
            className={`mt-8 w-full py-3 rounded-xl text-white font-bold transition-all cursor-pointer flex items-center justify-center ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing...
              </>
            ) : (
              "Buy Gold - ₹899"
            )}
          </motion.button>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center text-gray-500 text-sm"
      >
        Secure payments powered by Razorpay 🔒
      </motion.p>
    </div>
  );
};

export default Premium;
