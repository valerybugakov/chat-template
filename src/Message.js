import React, { PropTypes } from 'react';
import Avatar from './Avatar';
import MessageContent from './MessageContent';
import { StyleSheet, css } from 'aphrodite';
import assignDeep from 'object-assign-deep';

const defaultStyle = {
  container: {
    width: '100%',
    clear: 'both',
    display: 'flex',
    overflow: 'hidden',
  },
};

const Message = ({ height, className = '', message, styles, imageRenderer }) => {
  const style = StyleSheet.create(assignDeep({}, defaultStyle, styles));

  const avatarStyles = {
    container: {
      order: message.inbound ? 1 : 3,
    },
  };

  return (
    <div className={`${className} ${css(style.container)}`}>
      <Avatar src={message.avatar} styles={avatarStyles} />
      <MessageContent height={height} message={message} imageRenderer={imageRenderer} />
    </div>
  );
};

Message.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  imageRenderer: PropTypes.func,
  message: PropTypes.shape({
    message: PropTypes.string,
    src: PropTypes.string,
    inbound: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
    backColor: PropTypes.string.isRequired,
    textColor: PropTypes.string,
  }),
  styles: PropTypes.object,
};

export default Message;
