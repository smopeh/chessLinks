import { runFunctions } from "script2.js";

let toggleLoading = document.getElementsByClassName("centerBlock")[0];
let toggleLinks = document.getElementsByClassName("centerBlock")[1];
const dropdown = document.getElementById("dropDown");

toggleLoading.style.display = "none";
toggleLinks.style.display = "none";

async function loading(name) {
  toggleLoading.style.display = "flex";
  toggleLinks.style.display = "none";
  
    try {
      const videos = await runFunctions(name);
      console.log(videos[0]);
      for (let i = 0; i < 5; i++) {
        document.getElementById(`element${i+1}`).href = `https://www.youtube.com/watch?v=${videos[i].snippet.resourceId.videoId}`;
      }
      document.getElementsByClassName("centerBlock")[1].style.display = "flex";
      document.getElementsByClassName("centerBlock")[0].style.display = "none";
    } catch(error) {
      console.log(error);
    }
}

dropdown.addEventListener("change", function() {
  switch (dropdown.value) {
    case "":
      toggleLinks.style.display = "none";
      toggleLoading.style.display = "none";
      break;
    case "GMHikaru":
    case "TruckerTim":
      loading(dropdown.value);
      break;
    default:
      break;
  }
});
