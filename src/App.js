import * as React from 'react';
import RwdSvg from './img/rewind.svg';
import PlaySvg from './img/play.svg';
import PauseSvg from './img/pause.svg';
import FfwdSvg from './img/ffwd.svg';
import './App.css';

function App() {
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [videoTime, setVideoTime] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current?.play();
      setPlaying(true);
      var vid = document.getElementById("video1");
      setVideoTime(vid?.duration);
    } else if (control === "pause") {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  window.setInterval(function () {
    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  return (
    <div className="app">
      <video
        id="video1"
        className="video"
        ref={videoRef}
        src="https://res.cloudinary.com/dssvrf9oz/video/upload/v1635662987/pexels-pavel-danilyuk-5359634_1_gmixla.mp4"
      />
      <div className="controlsContainer">
        <div className="controls">
          <img
            onClick={revert}
            className="controlsIcon"
            alt=""
            src={RwdSvg}
          />
          {playing ? (
            <img
              onClick={() => videoHandler("pause")}
              className="controlsIcon--small"
              alt=""
              src={PauseSvg}
            />
          ) : (
            <img
              onClick={() => videoHandler("play")}
              className="controlsIcon--small"
              alt=""
              src={PlaySvg}
            />
          )}
          <img
            className="controlsIcon"
            onClick={fastForward}
            alt=""
            src={FfwdSvg}
          />
        </div>
      </div>

      <div className="timecontrols">
        <p className="controlsTime">
          {Math.floor(currentTime / 60) +
            ":" +
            ("0" + Math.floor(currentTime % 60)).slice(-2)}
        </p>
        <div className="time_progressbarContainer">
          <div
            style={{ width: `${progress}%` }}
            className="time_progressBar"
          ></div>
        </div>
        <p className="controlsTime">
          {Math.floor(videoTime / 60) +
            ":" +
            ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </p>
      </div>
    </div>
  );
}

export default App;
