from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/translate', methods=['POST'])
def translate():

    data = request.get_json()

    text = data.get("text")
    source = data.get("source")
    target = data.get("target")

    if not text:
        return jsonify({"error": "Please enter text"})

    try:
        if source == "auto":
            translated = GoogleTranslator(
                source="auto",
                target=target
            ).translate(text)
        else:
            translated = GoogleTranslator(
                source=source,
                target=target
            ).translate(text)

        return jsonify({"translatedText": translated})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)