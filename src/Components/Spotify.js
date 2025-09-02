const clientId = "51da9a77217b49a8bb7ab72e36cc5579";
const redirectUri = "https://barnspider93.github.io/jamming/";
let accessToken = "";

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    const hash = window.location.hash;
    if (hash) {
      const tokenMatch = hash.match(/access_token=([^&]*)/);
      const expiresMatch = hash.match(/expires_in=([^&]*)/);

      if (tokenMatch && expiresMatch) {
        accessToken = tokenMatch[1];
        const expiresIn = Number(expiresMatch[1]);

        // Clear token from URL after extraction
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
        return accessToken;
      }
    }

    // Redirect to Spotify login
    const scope = "playlist-modify-public playlist-modify-private";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
      scope
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location = authUrl;
  },

  async search(query) {
    if (!query) return [];

    const token = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
        query
      )}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    const token = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Get current user's ID
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers,
    });
    const userData = await userResponse.json();
    const userId = userData.id;

    // Create a new playlist
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ name }),
      }
    );
    const playlistData = await playlistResponse.json();

    // Add tracks to playlist
    await fetch(
      `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ uris: trackUris }),
      }
    );

    alert(`Playlist "${name}" saved to Spotify!`);
  },
};

export default Spotify;
