import loadAPI from './load-api';

export default {
  _queue: [] as any[],
  _isLoaded: false,

  load(component: any) {
    // if the API is loaded just create the player
    if (this._isLoaded) {
      component._createPlayer();
    } else {
      this._queue.push(component);

      // load the Youtube API if this was the first component added
      if (this._queue.length === 1) {
        this._loadAPI();
      }
    }
  },

  _loadAPI() {
    loadAPI('//youtube.com/player_api');

    (window as any).onYouTubeIframeAPIReady = () => {
      this._isLoaded = true;
      for (let i = this._queue.length; i--; ) {
        this._queue[i]._createPlayer();
      }
      this._queue = [];
    };
  },
};
