from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/suggestions', methods=['POST'])
def get_suggestions():
    expenses = request.json.get('expenses', [])

    if not expenses:
        return jsonify({"suggestions": ["No expenses available."]})

    # Calculate totals per category
    category_totals = {}
    total_spent = 0
    for expense in expenses:
        category = expense.get('category', 'Other')
        amount = expense.get('amount', 0)
        total_spent += amount
        category_totals[category] = category_totals.get(category, 0) + amount

    # Get top spending category
    top_category = max(category_totals, key=category_totals.get)
    
    suggestions = [f"You spent the most on {top_category}. Try reducing it by 15%."]

    # Add food spending warning
    if category_totals.get('Food', 0) > 0.25 * total_spent:
        suggestions.append("Your Food expenses are more than 25% of your total spending.")

    return jsonify({"suggestions": suggestions})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
