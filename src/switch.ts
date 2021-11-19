type Track = {
    bcp47: string
}
type Player = {
    getTextTrackList: () => Track[]
    setTextTrack: (track: Track) => void
}
type Netflix = {
  appContext: {
      state: {
          playerApp: {
              getAPI: () => { videoPlayer: {
                  getAllPlayerSessionIds: () => string[]
                  getVideoPlayerBySessionId: (id: string) => Player
              }}
          }
      }
  }
}

const keyup = (e: KeyboardEvent) => {
    const netflix: Netflix = (window as any).netflix
    if(!netflix) return;
    const selectedPolishSubtitles = e.key === 'p'
    const selectedEnglishSubtitles = e.key === 'e'
    if(!selectedPolishSubtitles && !selectedEnglishSubtitles) return;
    // eslint-disable-next-line no-undef
    const videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
    const playerSessionId = videoPlayer.getAllPlayerSessionIds()[0];
    const player = videoPlayer.getVideoPlayerBySessionId(playerSessionId);
    // const currentTime = player.getCurrentTime()
    // player.seek(currentTime - 3000)
    // player.pause()
    const audioTrackPLId = player.getTextTrackList().find((track) => track.bcp47 === 'pl')
    const audioTrackENId = player.getTextTrackList().find((track) => track.bcp47 === 'en')
    if(selectedPolishSubtitles && audioTrackPLId) player.setTextTrack(audioTrackPLId)
    if(selectedEnglishSubtitles && audioTrackENId) player.setTextTrack(audioTrackENId)
}
document.addEventListener('keyup', keyup);

export {}