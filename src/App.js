import React from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";  
import ExpenseCharts from "./components/ExpenseCharts/ExpenseCharts"; 
import AIInsights from "./components/ExpenseInsights/AIInsights";  // ✅ Fixed Import Name
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Page transition animations
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = { duration: 0.4 };

// ✅ Wrapper for animated routes
const AnimatedRoute = ({ children }) => (
  <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
    {children}
  </motion.div>
);

function App() {
  return (
    <>
      <Navbar />  {/* ✅ Global Navbar */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
          <Route path="/login" element={<AnimatedRoute><LoginPage /></AnimatedRoute>} />
          <Route path="/signup" element={<AnimatedRoute><SignupPage /></AnimatedRoute>} />
          
          {/* ✅ Dashboard & Add Expense are now accessible without login */}
          <Route path="/dashboard" element={<AnimatedRoute><Dashboard /></AnimatedRoute>} />
          <Route path="/add-expense" element={<AnimatedRoute><AddExpense /></AnimatedRoute>} />
          <Route path="/expense-charts" element={<AnimatedRoute><ExpenseCharts /></AnimatedRoute>} />
          <Route path="/expense-insights" element={<AnimatedRoute><AIInsights /></AnimatedRoute>} /> {/* ✅ Fixed Import */}
        </Routes>
      </AnimatePresence>
      <Footer />  {/* ✅ Global Footer */}
    </>
  );
}

export default App;
