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

  counter = undefined;

  startTimer = () => {
    const { isRunning, time } = this.state;
    if (!isRunning && time > 0) {
      this.setState({ isRunning: true });
      this.counter = setInterval(() => {
        this.setState((state) => {
          let updateTime;
          if (state.time > 0) {
            updateTime = state.time - 1;
          } else {
            updateTime = 0;
          }
          return {
            time: updateTime,
          };
        });
      }, 1000);
    } else {
      clearInterval(this.counter);
      this.setState({ isRunning: false });
    }
  };

  pauseTimer = () => {
    clearInterval(this.counter);
    this.setState({ isRunning: false });
  };

  componentWillUnmount() {
    clearInterval(this.counter);
  }

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
