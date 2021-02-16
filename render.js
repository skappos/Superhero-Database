/** 
 * Course: COMP 426
 * Assignment: a05
 * Author: <Sophia Kappos>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */

export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    let string = `
    <div data-id= ${hero.id} class="heroCard">
        <div class="columns is-multiline justify-center">
            <div class="column">
                <div class="content has-text-centered" style="background-color:${hero.backgroundColor};">
                    <img src="${hero.img}" alt="Superheo Image">
                    <div class="heroName" style="color:${hero.color}">${hero.name}</div>
                </div>
            
                <div class="content has-text-centered">
                    <h2 class="subtitle">${hero.subtitle}</h2>
                </div>
                <div class="bolded">
                    <p><b>Alter ego:</b> ${hero.first} ${hero.last}</p>
                    <p><b>First appearance:</b> ${(new Date(hero.firstSeen)).toISOString()}</p>
                </div>
                <div class="backgroundInfo">
                    <p>${hero.description}<p>
                </div>
              
                
                <span class="editButton">
                    <button class="edit button is-rounded" type="button" id="${hero.name} style="float: right;">Edit</button>
                </span>
            </div>
        </div>
            

    </div>`;
return string;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    

    let string = `
    <div data-id= ${hero.id} class="heroEditCard">
        <div class="banner" style="background-color:${hero.backgroundColor};">
            <img src="${hero.img}" alt="Superhero Image">
        </div>

        <form class="editCard">
            <div class= "field">
                <label class="label">Hero Name</label>
                <input id="heroName" class="input" type="text" value="${hero.name}">
    
                <label class="label">First Name</label>
                <input id="firstName" class="input" type="text" value="${hero.first}">
            
                <label class="label">last Name</label>
                <input id="lastName" class="input" type="text" value="${hero.last}">
            
                <label class="label">Subtitle</label>
                <input id="subtitle" class="input" type="text" value="${hero.subtitle}">
           
                <label class="label">First Appearance</label>
                <input id="firstAppearance" class="input" type="text" value="${(new Date(hero.firstSeen)).toISOString()}">
           
                <label class="label">Description</label>
                <textarea id="description" class="textarea">${hero.description}</textarea>
                
                <span class="submitButton">
                    <button class="submit button is-rounded" type="button" id="${hero.name} style="float: right;">Save</button>
                </span>
                <span class="cancelButton">
                    <button class="cancel button is-rounded" type="button" id="${hero.name} style="float: right;">Cancel</button>
                </span>
            </div>
        </form>
        
        

    </div>`;
    
 return string;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let hero = heroicData.find(h => h.id ==  $(event.target).parent().closest(".heroCard").data("id"))
    $(event.target).parent().closest(".heroCard").replaceWith(renderHeroEditForm(hero))
    
    
};
    


/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    event.preventDefault()
    let hero = heroicData.find(h => h.id ==  $(event.target).parent().parent().closest(".heroEditCard").data("id"))
    $(event.target).parent().parent().closest(".heroEditCard").replaceWith(renderHeroCard(hero))
    
   
   

};



/**
 * Handles the JavaScript event representing a user clicking on the "save"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault()

    let newHero = heroicData.find(h => h.id ==  $(event.target).parent().closest(".heroEditCard").data("id"))
   //console.log(newHero)
    newHero.name = $('#heroName').val();
    newHero.first = $('#firstName').val();
    newHero.last = $('#lastName').val();
    newHero.subtitle = $('#subtitle').val();
    newHero.firstSeen = new Date($('#firstAppearance').val());
    newHero.description = $('#description').val();

    console.log(newHero.firstSeen)

    
    $(event.target).parent().closest(".heroEditCard").replaceWith(renderHeroCard(newHero))




};

/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    heroes.forEach(hero => {
        $root.append(renderHeroCard(hero));
    });

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $root.on('click', '.edit', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on('click', '.submit', handleEditFormSubmit);
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on('click', '.cancel', handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);

    
});