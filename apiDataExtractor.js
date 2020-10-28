//Getting element root from HTML file
const app = document.getElementById('root');

//Creating and apending a div element with class container to the root element
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

//Creating new XMLHTTP request
var request = new XMLHttpRequest();
var paragraphContent = "";


//Using GET on API and calling function when API loads
request.open('GET', 'https://INSERT_YOUR_API_KEY_HERE', true);
request.onload = function () {

    //Parsing JSON response and assigning to data
    let data = JSON.parse(this.response);

    //Creating counter variable to keep track of records that are iterated through
    //in order to give each record a title of Record [counter]
    let counter = 1;

    //Checking if request goes through successfully and running function if it does
    if (request.status >= 200 && request.status < 400) {

        //Looping through records which are stored in an array within data variable
        data.records.forEach(record => {

            //Creating a record-container element and assigning class to it
            const recordContainer = document.createElement('div');
            recordContainer.setAttribute('class', 'record-container');

            //Creating a record-title element and assigning class to it
            //then setting innerHTML to Record [counter] and incrementing 
            //counter to display correctly for next record
            const recordTitle = document.createElement('h3');
            recordTitle.setAttribute('class', 'record-title');
            recordTitle.innerHTML = "Record " + counter;
            counter++;

            //Creating a record-title element and assigning class to it
            const recordParagraph = document.createElement('p');
            recordParagraph.setAttribute('class', 'record-paragraph');

            //Creating a variable of paragraphContent that is used to store the
            //HTML we create during the for loops. Opening an unordered list for
            //displaying the different data in
            paragraphContent = "<ul>";

            //Calling the get data method to loop through all the properties in the record
            getData(record);

            //Adding a linebreak after the list
            paragraphContent += "<br>";

            //Assigning the paragraphContent variable to the innerHTML of recordParagraph
            //Then resetting the paragraph content
            recordParagraph.innerHTML = paragraphContent;
            paragraphContent = "";

            //Append the recordContainer to the container
            //and append recordTitle and recordParagraph to recordContainer
            container.appendChild(recordContainer);
            recordContainer.appendChild(recordTitle);
            recordContainer.appendChild(recordParagraph);
        });
    }
    else {
        //If the request didn't go through successfully, return error to console
        console.log('Error: Request unsuccessful');
    }
}

//Send request
request.send();


function getData(object) {
    //Looping through every property in the object
    for (const property in object) {
        
        //Setting innerProperty to the value of property
        var innerProperty = object[property];
        
        //If innerProperty is an object, adding another layer of list and calling getData recursively
        if(typeof (innerProperty) === "object") {
            paragraphContent += "<li>" + property + "<ul>";
            getData(innerProperty);
            paragraphContent += "</ul></li>";
        }
        //Else print out the data 
        else {
            paragraphContent += "<li>" + property + " Value: " + innerProperty + "</li>";
        }
    }
    
    //Return paragraphContent to the caller
    return paragraphContent;
}

