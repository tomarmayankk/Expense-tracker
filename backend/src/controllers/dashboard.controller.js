import Expense from "../models/expense.model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get all expenses for the current month
    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: startOfMonth }
    });

    const totalSpent = expenses.reduce((acc, item) => acc + item.amount, 0);

    // Calculate category totals
    const categoryTotals = {};
    const paymentMethodTotals = {};
    const dailyTotals = {};  // for line chart

    expenses.forEach(exp => {
      // Category-wise totals
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;

      // Payment method-wise totals
      paymentMethodTotals[exp.paymentMethod] = (paymentMethodTotals[exp.paymentMethod] || 0) + exp.amount;

      // Day-wise spending for line chart (YYYY-MM-DD)
      const day = exp.date.toISOString().split('T')[0];
      dailyTotals[day] = (dailyTotals[day] || 0) + exp.amount;
    });

    //  Find top category
    const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    //  Top 3 payment methods
    const topPaymentMethods = Object.entries(paymentMethodTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([method, total]) => ({ method, total }));

    res.status(200).json({
      totalSpent,
      topCategory,
      topPaymentMethods,
      categoryWise: categoryTotals,
      spendingOverTime: dailyTotals
    });

  } catch (error) {
    console.error("Error in dashboard summary:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
