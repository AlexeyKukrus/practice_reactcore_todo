import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    const { initialTime } = this.props;
    this.state = {
      time: initialTime,
      isRunning: false,
    };
  }

  startTimer = () => {
    const { isRunning, time } = this.state;
    if (!isRunning && time > 0) {
      this.timer = setInterval(() => {
        if (time > 0) {
          this.setState((prevState) => ({ time: prevState.time - 1 }));
        } else {
          clearInterval(this.timer);
          this.setState({ isRunning: false });
        }
      }, 1000);
      this.setState({ isRunning: true });
    }
  };

  pauseTimer = () => {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
  };

  render() {
    const { time, isRunning } = this.state;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
      <>
        <button
          type="button"
          className="icon icon-play"
          onClick={this.startTimer}
          disabled={isRunning}
          aria-label="play"
        />
        <button
          type="button"
          className="icon icon-pause"
          onClick={this.pauseTimer}
          disabled={!isRunning}
          aria-label="pause"
        />
        {` ${minutes}:${seconds}`}
      </>
    );
  }
}

export default Timer;
