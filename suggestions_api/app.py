from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/suggestions', methods=['POST'])
def get_suggestions():
    expenses = request.json.get('expenses', [])
    
    df = pd.DataFrame(expenses)

    if df.empty:
        return jsonify({"suggestions": ["No expenses available."]})

    suggestions = []
    category_totals = df.groupby('category')['amount'].sum().sort_values(ascending=False)

    top_category = category_totals.idxmax()
    suggestions.append(f"You spent the most on {top_category}. Try reducing it by 15%.")

    total_spent = df['amount'].sum()
    if 'Food' in category_totals and category_totals['Food'] > 0.25 * total_spent:
        suggestions.append("Your Food expenses are more than 25% of your spending.")

    return jsonify({"suggestions": suggestions})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
