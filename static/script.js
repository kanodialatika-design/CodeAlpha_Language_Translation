const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    translateBtn.innerText = "Translating...";
    translateBtn.disabled = true;

    try {

        const response = await fetch("/translate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: text,
                source: sourceLanguage.value,
                target: targetLanguage.value
            })

        });

        const data = await response.json();

        if (data.translatedText) {
            outputText.value = data.translatedText;
        }
        else {
            outputText.value = "";
            alert(data.error || "Translation failed.");
        }

    }
    catch (error) {

        console.error(error);

        alert("Server Error. Please try again.");

    }

    translateBtn.innerText = "Translate";
    translateBtn.disabled = false;

});


copyBtn.addEventListener("click", () => {

    if (outputText.value === "") {
        alert("Nothing to copy.");
        return;
    }

    navigator.clipboard.writeText(outputText.value);

    alert("Translation copied successfully!");

});
