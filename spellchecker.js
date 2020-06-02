
$(document).ready(function () {
  var char_index = 0; // For tracking the typed characters in the input
  var word_index = 0; // For tracking the typed words in the input

  // Event for textarea input
  $("#input").keyup(function (e) {
    var val = document.getElementById("input").value;
    var current = val.charAt(char_index);

    // Check for word separator characters
    if (
      current == " " ||
      current == "." ||
      current == "," ||
      current == "!" ||
      current == "?"
    ) {
      // Store word
      var word = val.substring(word_index, char_index);
      word = word.trim();

      // Query database
      if (window.XMLHttpRequest) {
        xh = new XMLHttpRequest();
      }
      xh.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Create element for word display
          var new_word = document.createElement("span");
          var content = document.createTextNode(" " + word);
          new_word.appendChild(content);

          //Confirm response does NOT contain HTML
          var response = "";

          for (var i = 0; i < this.responseText.length; i++) {
            if (this.responseText.charAt(i) == "{") {
              response += this.responseText.substring(i);
              break;
            }
          }

          // Retrieve and parse result object
          var result = JSON.parse(response);

          // Check if the word is misspelled or not and add appropriate class
          if (result.mutated && !result.correct) {
            new_word.setAttribute("class", "misspelled");
          } else if (!result.correct && !result.mutation) {
            new_word.setAttribute("class", "other");
          }

          document.getElementById("result").append(new_word);
        }
      };
      // Send request to script
      xh.open("GET", "check_word.php?word=" + word, true);
      xh.send();

      // Update the word index
      word_index = char_index;
    }

    // Update the char index
    char_index++;
  });
});
