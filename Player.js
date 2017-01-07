/**
 * Created by buhe on 16/5/4.
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {
    requireNativeComponent,
    View,
} from 'react-native';

class Player extends Component {

  constructor(props, context) {
    super(props, context);
    this._onLoading = this._onLoading.bind(this);
    this._onPaused = this._onPaused.bind(this);
    this._onShutdown = this._onShutdown.bind(this);
    this._onError = this._onError.bind(this);
    this._onPlaying = this._onPlaying.bind(this);
  }

  _onLoading(event) {
    this.props.onPlayerLoading && this.props.onPlayerLoading(event.nativeEvent);
  }

  _onPaused(event) {
    this.props.onPlayerPaused && this.props.onPlayerPaused(event.nativeEvent);
  }

  _onShutdown(event) {
    this.props.onPlayerShutdown && this.props.onPlayerShutdown(event.nativeEvent);
  }


  _onError(event) {
    this.props.onPlayerError && this.props.onPlayerError(event.nativeEvent);
  }

  _onPlaying(event) {
    this.props.onPlayerPlaying && this.props.onPlayerPlaying(event.nativeEvent);
  }

  render() {
    const nativeProps = Object.assign({}, this.props);
    Object.assign(nativeProps, {
      onPlayerLoading: this._onLoading,
      onPlayerPaused: this._onPaused,
      onPlayerShutdown: this._onShutdown,
      onPlayerError: this._onError,
      onPlayerPlaying: this._onPlaying,
    });
    return (
        <RCTPlayer
            {...nativeProps}
            />
    )
  }
}

Player.propTypes = {
  source: PropTypes.shape({                          // 是否符合指定格式的物件
    uri: PropTypes.string.isRequired,
    controller: PropTypes.bool, //Android only
    timeout: PropTypes.number, //Android only
    hardCodec: PropTypes.bool, //Android only
    live: PropTypes.bool, //Android only
  }).isRequired,
  started:PropTypes.bool,
  muted:PropTypes.bool, //iOS only
  aspectRatio: PropTypes.oneOf([0, 1, 2, 3, 4]),
  onPlayerLoading: PropTypes.func,
  onPlayerPaused: PropTypes.func,
  onPlayerShutdown: PropTypes.func,
  onPlayerError: PropTypes.func,
  onPlayerPlaying: PropTypes.func,
  ...View.propTypes,
}

const RCTPlayer = requireNativeComponent('RCTPlayer', Player);

module.exports = Player;
