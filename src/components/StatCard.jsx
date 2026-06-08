import { motion } from "framer-motion";

function StatCard({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
    >
      <div>
        <h3 className="text-gray-500 text-sm">
          {title}
        </h3>

        <p className="text-3xl font-bold mt-2">
          {value}
        </p>
      </div>

      <div className={`text-4xl ${color}`}>
        {icon}
      </div>
    </motion.div>
  );
}

export default StatCard;