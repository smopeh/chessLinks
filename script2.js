const apiKey = "AIzaSyC2L1GFUrBkXAaEdXcijUsqmPTxT-joEzE";
const baseUrl = "https://www.googleapis.com/youtube/v3";

async function youtube(name) {
  try {
    const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&type=channel&key=${apiKey}`);
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
    const response = await fetch(`${baseUrl}/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${apiKey}`);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch(error) {
    console.log(error);
  }
}

async function runFunctions(name) {
  const response = await youtube(name);
  const data = await findChannel(response);
  const videoJson = await getVideos(data);
  return videoJson.items;
};

export { runFunctions };
