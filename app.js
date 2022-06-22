
// this all available icons name and icon url
var iconsUrl = [
    {
        "Name": "facebook",
        "iconUrl": "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-256.png",
    },
    {
        "Name": "twitter",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_twitter-256.png",
    },
    {
        "Name": "google",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_google_plus-256.png"
    },
    {
        "Name": "linkedin",
        "iconUrl": "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-256.png"
    },
    {
        "Name": "youtube",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/capsocial-round/500/youtube-256.png"
    },
    {
        "Name": "instagram",
        "iconUrl": "https://cdn1.iconfinder.com/data/icons/social-circle-3/32/instagram_circle-256.png"
    },
    {
        "Name": "pinterest",
        "iconUrl": "https://cdn1.iconfinder.com/data/icons/social-media-set-for-free/32/pintrest-256.png"
    },
    {
        "Name": "snapchat",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/snapchat-2-256.png"
    },
    {
        "Name": "skype",
        "iconUrl": "https://cdn0.iconfinder.com/data/icons/social-circle-3/72/Skype-256.png"
    },
    {
        "Name": "android",
        "iconUrl": "https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Android-256.png"
    },
    {
        "Name": "dribbble",
        "iconUrl": "https://cdn0.iconfinder.com/data/icons/social-circle-3/72/Dribbble-256.png"
    },
    {
        "Name": "vimeo",
        "iconUrl": "https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/vimeo-256.png"
    },
    {
        "Name": "tumblr",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_tumblr-256.png"
    },
    {
        "Name": "vine",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_vine-256.png"
    },
    {
        "Name": "foursquare",
        "iconUrl": "https://cdn0.iconfinder.com/data/icons/social-circle-3/72/Foursquare-256.png"
    },
    {
        "Name": "stumbleupon",
        "iconUrl": "https://cdn1.iconfinder.com/data/icons/logotypes/32/stumbleupon-256.png"
    },
    {
        "Name": "flickr",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/free-social-icons/67/flickr_circle_color-256.png"
    },
    {
        "Name": "yahoo",
        "iconUrl": "https://cdn0.iconfinder.com/data/icons/flat-social-media-icons-set-round-style-1/550/yahoo-256.png"
    },
    {
        "Name": "reddit",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_reddit-256.png"
    },
    {
        "Name": "rss",
        "iconUrl": "https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/rss-256.png"
    }
]
//wil be saving selected icons name in this array
var selectedIconsName;
//getting the boostrap model of form in an constant variable myModel
const myModal = new bootstrap.Modal(document.getElementById('myModal'));

// ------------ Step 1 get selected icons names------------
//functon to get the selected icons names
function getIcons() {

    //getting the selected icon 
    var checkedOption = document.querySelectorAll('input[name="Icon"]:checked');
    selectedIconsName = [];
    //checking either user selected any icon or not using if-else
    if (checkedOption.length == 0) {

        //code to show an warning alert when user click on GC button without selecting an icon 
        document.getElementById('warAlert').style.display = 'block';

    } else {

        //code to remove the warning alert if any
        document.getElementById('warAlert').style.display = 'none';

        //loop to put the selected icons ids in an array
        for (var i = 0; checkedOption[i]; ++i) {
            selectedIconsName.push(checkedOption[i].id);
        }
        //Caling show model function
        showModel();
    }
}

// ------------ Step 2 get show form with input fields to get links of all selected icons ------------

//function to show the form model to get the links from user
function showModel() {
    //get the from placed in the model
    let form = document.getElementById('links');
    form.innerHTML = "";

    //Creats an input field for each selected icon in the model to get its URL
    selectedIconsName.forEach(name => {
        //creating a div
        let inputField = document.createElement('div');

        //putting an input field along  with label in this div
        inputField.innerHTML = [
            `<label for="${name.toUpperCase()}">Enter your ${name} URL :</label>`,
            `<input class="urlInput" id="${name.toUpperCase()}" type="url" placeholder="https://www.xyz.com" required="required">`
        ].join('');

        //puting this div in the form 
        form.append(inputField);
    });

    //display the model of form
    myModal.show()
}

// ------------ Step 3 get links entered by the user in step 2 form and create an array of objects to store that------------
//function to get the links from input fields of model
function getLinks(event) { 
    
    event.preventDefault();
    //the selectedIconInfo array will contain the information about the icons like social media name its link and its icon url
    let selectedIconsInfo = [];
    
    selectedIconsName.forEach(name => {
        let iconUrl = iconsUrl.find(iconUrl => iconUrl.Name == name);
        let link = document.getElementById(name.toUpperCase()).value;

        // making an object 'Info' will containing selected icon's info
        let Info = {
            smName: name,
            iconUrl: iconUrl.iconUrl,
            smLink: link
        };
        //enering this 'Info' object into the selectedIconsInfo array
        selectedIconsInfo.push(Info);
    });
    //Hide the model of form
    myModal.hide();

    //calling the displayCode function that generate the code
    displayCode(selectedIconsInfo);
}

// ------------ Step 4 using the slectedIconsInfo data made in step 3 generate the html code ------------
//function that display the code of selected icons on screen
function displayCode(data) {
    document.getElementById("codeBox").style.display = "block";
    var htmlCodeing = "";
    data.forEach(value => {
        let Name = value.smName;
        let link = value.smLink;
        let iconUrl = value.iconUrl
        htmlCodeing += `  &lt;a href="${link}" style="text-decoration: none; margin:5px" &gt; &lt;img width="70px" height="70px" src="${iconUrl}" alt="${Name} icon"&gt; &lt;/a&gt; <br>`

    });
    let htmlDiv = document.getElementById('htmlCode');
    htmlDiv.innerHTML = `<pre><code data-lang="html" >&lt;div&gt; <br>${htmlCodeing}&lt;/div&gt;</code></pre>`;

    //console.log(data);
}

//copy code button  ----
document.getElementById("copyBtn").addEventListener("click", function () {
    //getting the div containing html coding by its id 
    var copyText = document.getElementById("htmlCode").innerText;
    //this is a js built-in method to copy text to clipboard
    navigator.clipboard.writeText(copyText);
    //changing copy button style and icon after copy operation performed
    copyBtn = document.getElementById("copyBtn")
    copyBtn.classList.value = "fa fa-check-circle"
    copyBtn.innerHTML = " Copied!";
    copyBtn.title = "Copied!"
     //setting copy button style and icon to default after 3 seconds 
    setTimeout(() => {
        copyBtn.classList.value = "fa fa-clone"
        copyBtn.innerHTML = "";
        copyBtn.title = "Copy to clipboard"
    }, 3000);

});

