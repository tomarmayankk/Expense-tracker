import Budget from "../models/budget.model.js";
import Expense from "../models/expense.model.js";

// Set or Update Budget for a category
export const setBudget = async (req, res) => {
  const { category, monthlyLimit } = req.body;

  try {
    let budget = await Budget.findOne({ userId: req.user._id, category });

    if (budget) {
      budget.monthlyLimit = monthlyLimit;
      await budget.save();
    } else {
      budget = new Budget({
        userId: req.user._id,
        category,
        monthlyLimit
      });
      await budget.save();
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error("Error setting budget:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all budgets for the user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error getting budgets:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Check if spending crossed 80% or 100%
export const checkBudgetAlerts = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" }
        }
      }
    ]);

    const alerts = budgets.map(budget => {
      const spentData = expenses.find(e => e._id === budget.category);
      const spent = spentData ? spentData.totalSpent : 0;
      const percentage = ((spent / budget.monthlyLimit) * 100).toFixed(1);

      let alert = null;
      if (percentage >= 100) {
        alert = `❌ Budget exceeded for ${budget.category}`;
      } else if (percentage >= 80) {
        alert = `⚠️ Warning: ${budget.category} reached ${percentage}% of its budget`;
      }

      return {
        category: budget.category,
        monthlyLimit: budget.monthlyLimit,
        spent,
        percentage,
        alert
      };
    });

    res.status(200).json(alerts);
  } catch (error) {
    console.error("Error checking budget alerts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
