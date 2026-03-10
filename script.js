// MARK: CONSTANTS & VARIABLES

// add and remove person
const addPersonButton = document.querySelector(".addPerson");
const everyRemovePersonButton = document.querySelectorAll(".removePerson");

//validation
const everyRequiredQuestion = document.querySelectorAll("[required]")
const everyProgressiveQuestionActiveButton = document.querySelectorAll(".progressiveQuestionGreyed label:first-of-type [type='radio'], .progressiveQuestionHide label:first-of-type [type='radio']")
const everyProgressiveQuestionInactiveButton = document.querySelectorAll(".progressiveQuestionGreyed label:nth-of-type(2) [type='radio'], .progressiveQuestionHide label:nth-of-type(2) [type='radio']")
console.log(everyProgressiveQuestionActiveButton)
console.log(everyProgressiveQuestionInactiveButton)

// MARK: ADD AND REMOVE PERSON

addPersonButton.addEventListener("click", injectHTMLOnClick);

everyRemovePersonButton.forEach(function (removePersonButton) {
    removePersonButton.addEventListener("click", removePersonFunction);
});

function injectHTMLOnClick() {
    addPersonButton.insertAdjacentHTML(
        "beforebegin",
        `
        <fieldset class="verkrijgers">
            <legend>Verkrijger</legend>
            <button type="button" class="removePerson"></button>
            <fieldset>
                <legend>Persoongegevens</legend>
                <div class="name">
                    <label>
                        Voorletter(s)
                        <input type="text" name="voorletters">
                    </label>
                    <label>
                        Tussenvoegsel
                        <input type="text" name="tussenvoegsel">
                    </label>
                    <label>
                        Achternaam
                        <input type="text" name="achternaam">
                    </label>
                </div>
                <label>
                    Bsn/RSIN
                    <input type="text" name="bsn_rsin">
                </label>
            </fieldset>

            <fieldset>
                <legend>Krijgt deze verkrijger waarvoor u geen aangifte doet het hele vermogen?</legend>
                <label><input type="radio" name="geheleVermogen_${Date.now()}"> Ja</label>
                <label><input type="radio" name="geheleVermogen_${Date.now() + 1}"> Nee</label>
            </fieldset>

            <fieldset>
                <legend>Doet deze verkrijger een beroep op diens legitieme portie (wettelijke erfdeel)?</legend>
                <label><input type="radio" name="legitiemePortie_${Date.now()}"> Ja</label>
                <label><input type="radio" name="legitiemePortie_${Date.now() + 1}"> Nee</label>
            </fieldset>
        </fieldset>
        `
    );

    const allVerkrijgers = document.querySelectorAll(".verkrijgers");
    const newestVerkrijger = allVerkrijgers[allVerkrijgers.length - 1];
    newestVerkrijger
        .querySelector(".removePerson")
        .addEventListener("click", removePersonFunction);
}

function removePersonFunction() {
    this.closest(".verkrijgers").remove();
}

// MARK: DISABLE POINTER EVENTS NONE QUESTIONS AND RESET RADIOBUTTONS
everyProgressiveQuestionActiveButton.forEach(function(oneProgressiveQuestionActiveButton){
    oneProgressiveQuestionActiveButton.addEventListener("click", disableRequired)
})

function disableRequired(event){
    const parentFieldset = event.target.closest(".progressiveQuestionGreyed, .progressiveQuestionHide");
    const targetSibling = parentFieldset.nextElementSibling;

    targetSibling.querySelectorAll("input").forEach(r => r.required = true)
}

everyProgressiveQuestionInactiveButton.forEach(function(oneProgressiveQuestionInactiveButton){
    oneProgressiveQuestionInactiveButton.addEventListener("click", resetTargetButtons)
})

function resetTargetButtons(event) {
    const parentFieldset = event.target.closest(".progressiveQuestionGreyed, .progressiveQuestionHide");
    const targetSibling = parentFieldset.nextElementSibling;

    targetSibling.querySelectorAll("input[type='radio']").forEach(r => r.checked = false)
    targetSibling.querySelectorAll("input").forEach(r => r.required = false)
}