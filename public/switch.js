const keyup = (e) => {
    if(!window.netflix) return;
    const selectedPolishSubtitles = e.key === 'p'
    const selectedEnglishSubtitles = e.key === 'e'
    if(!selectedPolishSubtitles && !selectedEnglishSubtitles) return;
    // eslint-disable-next-line no-undef
    const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
    const playerSessionId = videoPlayer.getAllPlayerSessionIds()[0];
    const player = videoPlayer.getVideoPlayerBySessionId(playerSessionId);
    // const currentTime = player.getCurrentTime()
    // player.seek(currentTime - 3000)
    // player.pause()
    const audioTrackPLId = player.getTextTrackList().find((track) => track.bcp47 === 'pl')
    const audioTrackENId = player.getTextTrackList().find((track) => track.bcp47 === 'en')
    console.log(audioTrackPLId)
    if(selectedPolishSubtitles) player.setTextTrack(audioTrackPLId)
    if(selectedEnglishSubtitles) player.setTextTrack(audioTrackENId)
}
document.addEventListener('keyup', keyup);