const express = require("express");
const Expense = require("../models/expenseModel");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get Expenses by Category (Moved above "/:id")
router.get("/category/:category", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id, category: req.params.category }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("❌ Error fetching category expenses:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Recurring Expenses (Moved above "/:id")
router.get("/recurring", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id, isRecurring: true }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("❌ Error fetching recurring expenses:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get All Expenses for a User with Pagination
router.get("/", verifyToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalExpenses = await Expense.countDocuments({ user: req.user.id });

    res.json({
      totalExpenses,
      currentPage: Number(page),
      totalPages: Math.ceil(totalExpenses / limit),
      expenses,
    });
  } catch (error) {
    console.error("❌ Error fetching expenses:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Single Expense by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }
    res.json(expense);
  } catch (error) {
    console.error("❌ Error fetching expense:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Create a New Expense
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, amount, category, paymentMethod, isRecurring, recurrenceType, budgetLimit, notes, attachment, type } = req.body;

    if (!title || !amount || !category || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields: title, amount, category, paymentMethod" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      paymentMethod,
      isRecurring,
      recurrenceType: isRecurring ? recurrenceType : null,
      budgetLimit,
      notes,
      attachment,
      type,
      date: new Date(),
    });

    await expense.save();
    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("❌ Error adding expense:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Update an Expense (Fix: Ensure Only Allowed Fields Are Updated)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this expense" });
    }

    const allowedUpdates = ["title", "amount", "category", "paymentMethod", "notes", "date", "type"];
    const updateFields = Object.keys(req.body);
    const isValidUpdate = updateFields.every((field) => allowedUpdates.includes(field));

    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid update fields" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    console.error("❌ Error updating expense:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Delete an Expense
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this expense" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting expense:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// ✅ Get Budget Status
router.get("/budget-status", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    const budgetUsage = expenses.reduce((acc, expense) => {
      if (expense.budgetLimit) {
        if (!acc[expense.category]) {
          acc[expense.category] = { spent: 0, limit: expense.budgetLimit };
        }
        acc[expense.category].spent += expense.amount;
      }
      return acc;
    }, {});

    res.json({ message: "Budget status retrieved", budgetUsage });
  } catch (error) {
    console.error("❌ Error fetching budget status:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
