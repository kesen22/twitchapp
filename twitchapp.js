

var userList = ["imaqtpie", "LIRIK", "StarCraft", "Avilo", "wintergaming", "magic", "TroydanGaming"];
// var allStreamBtn = document.getElementById("all-streams");
// var onlineStreamBtn = document.getElementById("online-streams");
// var offlineStreamBtn = document.getElementById("offline-streams");


function searchUsers(searchVal, status) {
    console.log(searchVal);
    var urlString = "https://wind-bow.gomix.me/twitch-api/streams/" + searchVal + "?callback=?"
    $.ajax({
        type: "GET",
        url: urlString,
        dataType: "jsonp",
        success: function(data) {
            if (status == "all") {
                if (data.stream == null) {
                    searchOfflineUsers(searchVal);
                } else {
                    renderOnlineHTML(data);
                }
            } else if (status == "online") {
                if (data.stream != null) {
                    renderOnlineHTML(data);
                } else {
                    return; 
                }
            } else if (status == "offline") {
                if (data.stream == null) {
                    searchOfflineUsers(searchVal);
                } else {
                    return;
                }
            }

        }
    })
}

function searchOfflineUsers(searchVal) {
    console.log(searchVal);
    var urlString = "https://wind-bow.gomix.me/twitch-api/channels/" + searchVal
    $.ajax({
        type: "GET",
        url: urlString,
        dataType: "jsonp",
        success: function(data) {
          renderOfflineHTML(data);
        }
    })
}

//render HTML creates the HTML to display
//this function will need to know the status to display
function renderOnlineHTML(twitchResponse) {
  var htmlString = "";
  var resultsContainer = document.getElementById("results");
  $("results").html("");
    htmlString += '<div class="row online"><div class="col-xs-12 col-md-2 offset-2" id="logo"><a href="' + twitchResponse.stream.channel.url + '"><img class="img-responsive" src=' + twitchResponse.stream.channel.logo + '></a></div><div class="col-xs-12 col-md-6 id="bio"><p class="lead">' + twitchResponse.stream.channel.display_name + " - " + twitchResponse.stream.channel.status + '</p></div></div>'
  resultsContainer.insertAdjacentHTML('beforeend', htmlString);
}

function renderOfflineHTML(twitchResponse) {
    var htmlString = "";
    var resultsContainer = document.getElementById("results");
    $("results").html("");
      htmlString += '<div class="row offline"><div class="col-xs-12 col-md-2 offset-2" id="logo"><a href="' + twitchResponse.url + '"><img class="img-responsive" src=' + twitchResponse.logo + '></a></div><div class="col-xs-12 col-md-6 id="bio"><p class="lead"> OFFLINE - ' + twitchResponse.display_name + " - " + twitchResponse.status + '</p></div></div>'
    resultsContainer.insertAdjacentHTML('beforeend', htmlString);
  }

function processUsers(users, status) {
    document.getElementById("results").innerHTML = ""
    for (i = 0; i < users.length; i++) {
        searchUsers(users[i], status);
    }
}

// $("#all-streams").click(function() {
//     processUsers(userList, "all");
//     alert("Submit button clicked!");
//     });

// $("#online-streams").click(function() {
//     processUsers(userList, "online");
//     });

// $("#offline-streams").click(function() {
//     processUsers(userList, "offline");
//     });    


// allStreamBtn.addEventListener('click', function() {
//     processUsers(userList, "all");
//   })

// onlineStreamBtn.addEventListener('click', function() {
//     processUsers(userList, "online");
// })

// offlineStreamBtn.addEventListener('click', function() {
//     processUsers(userList, "offline");
// })

$(document).ready(function() {
processUsers(userList, "all");

})
