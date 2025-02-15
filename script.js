// export data after fetching data
// store api key in .env

//make link adjustable with user input
//add loading animatio

const apiKey = "";
const baseUrl = "https://www.googleapis.com/youtube/v3";
const requestPath = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=GMHikaru&type=channel&key=${apiKey}`;
let targetChannel = "";
const videoMemory = [];

async function youtube() {
  try {
    const data = await fetch(requestPath);
    if (!data.ok) {
      throw new Error(data.status + " Explenation: " + data.statusText);
    }
    const jsonData = await data.json();
    return jsonData.items[0].id.channelId;
  } catch(error) {
    console.log(error);
  }
};

async function findChannel(targetChannel) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${targetChannel}&key=${apiKey}`);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.items[0].contentDetails.relatedPlaylists.uploads;
    }
  } catch(error) {
    console.log(error);
  }
};

async function getVideos(playlistId) {
  try {
    const response = await fetch(`${baseUrl}/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

async function runFunctions() {
  const response = await youtube();
  const data = await findChannel(response);
  const videoJson = await getVideos(data);
  return videoJson.items;
};

runFunctions()
  .then(video => {
    for (let i = 0; i < 5; i++) {
      document.getElementById(`link${i+1}`).href = `https://www.youtube.com/watch?v=${video[i].snippet.resourceId.videoId}`;
    }
  })
  .catch (data => {
    console.log(data)
  });

