// MARK: CONSTANTS & VARIABLES

// add and remove person
const addPersonButton = document.querySelector(".addPerson");
const everyRemovePersonButton = document.querySelectorAll(".removePerson");

//validation
const everyRequiredQuestion = document.querySelectorAll("[required]")
const everyProgressiveQuestionActiveButton = document.querySelectorAll(".progressiveQuestionGreyed label:first-of-type [type='radio'], .progressiveQuestionHide label:first-of-type [type='radio']")
const everyProgressiveQuestionInactiveButton = document.querySelectorAll(".progressiveQuestionGreyed label:nth-of-type(2) [type='radio'], .progressiveQuestionHide label:nth-of-type(2) [type='radio']")


// MARK: ADD AND REMOVE PERSON

addPersonButton.addEventListener("click", injectHTMLOnClick);

function injectHTMLOnClick() {
    addPersonButton.insertAdjacentHTML(
        "beforebegin",
        `
        <div class="verkrijger">
            <button type="button" class="removePerson"></button>
            <fieldset>
                <legend>Verkrijger</legend>
                <fieldset>
                    <legend>Persoongegevens</legend>
                        <div class="nameField">
                            <label for="Naam">
                                Voorletter(s)
                                <input type="text" name="volledige_naam" pattern="[A-Za-zÀ-ÿ\s\-]+" id="">
                                <div class="errorMessage">
                                    <p>ongeldig</p>
                                    <p>leeg veld</p>
                                </div>
                            </label>
                            
                            <label for="Naam">
                                Tussenvoegsel
                                <input type="text" name="volledige_naam" pattern="[A-Za-zÀ-ÿ\s\-]+" id="">
                                <div class="errorMessage">
                                    <p>ongeldig</p>
                                    <p>leeg veld</p>
                                </div>
                            </label>  
                            
                            <label for="Naam">
                                Achternaam
                                <input type="text" name="volledige_naam" pattern="[A-Za-zÀ-ÿ\s\-]+" id="">
                                <div class="errorMessage">
                                    <p>ongeldig</p>
                                    <p>leeg veld</p>
                                </div>
                            </label>
                        </div>
                        <label for="">
                            Bsn/RSIN 
                            <input type="text" name="" minlength="9" maxlength="9" id="">
                            <div class="errorMessage">
                                <p>Vul een geldige BSN in</p>
                                <p>leeg veld</p>
                            </div>
                        </label>
                </fieldset>
                
                <fieldset>
                    <legend>Krijgt deze verkrijger waarvoor u geen aangifte doet het hele vermogen? </legend>
                    <label for=""><input required type="radio" name="geheleVermogen"> Ja</label>
                    <label for=""><input required type="radio" name="geheleVermogen"> Nee</label>
                </fieldset>
                
                <fieldset>
                    <legend>Doet deze verkrijger een beroep op diens legitieme portie (wettelijke erfdeel)?</legend>
                    <label for=""><input required type="radio" name="beroepOpLegitiemePortie"> Ja</label>
                    <label for=""><input required type="radio" name="beroepOpLegitiemePortie"> Nee</label>
                </fieldset>
            </fieldset>
        </div>
        `)
        const allVerkrijgers = document.querySelectorAll(".verkrijger");
        const newestVerkrijger = allVerkrijgers[allVerkrijgers.length - 1];
        newestVerkrijger
            .addEventListener("click", removePersonFunction);
        ;
    }

everyRemovePersonButton.forEach(function (removePersonButton) {
    removePersonButton.addEventListener("click", removePersonFunction);
});

function removePersonFunction() {
    this.closest(".verkrijger").remove();
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