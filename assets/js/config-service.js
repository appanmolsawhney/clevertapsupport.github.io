const ConfigService = (function () {
  const configUrl = 'https://script.google.com/macros/s/AKfycbyQlXmuLuYFyayHA-SdN2uU75s4Yxm9xSaSb4Hb8cDNMOBvVgEDKORtSIwxVbbKETjj/exec';
  const env = 'PROD';
  let cache = null;

  async function loadConfig() {
    if (cache) {
      return cache;
    }

    const response = await fetch(configUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`);
    }

    cache = await response.json();
    console.log("Config loaded and cached:", cache);
    return cache;
  }

  async function getAppUrl(appId) {
    const configData = await loadConfig();
    const match = configData.find(row =>
      row.app.toLowerCase() === appId.toLowerCase() && row.env === env
    );
    return match?.url || null;
  }

  return {
    getAppUrl
  };
})();
