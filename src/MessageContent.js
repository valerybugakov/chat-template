import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import assignDeep from 'object-assign-deep';

const defaultStyle = {
  contentBase: {
  },
  contentRight: {
    marginLeft: 'auto',
  },
  image: {
    width: '100%',
  },
  imageContainer: {
    minHeight: '100px',
    height: '100px',
    width: '100%',
    margin: '0px',
  },
};

const MessageContent = ({ height, message, styles, imageRenderer: Image }) => {
  const style = StyleSheet.create(assignDeep({}, defaultStyle, {
    contentBase: {
      color: message.textColor || defaultStyle.contentBase.color,
      backgroundColor: message.backColor || defaultStyle.contentBase.backgroundColor,
    },
  }, styles || {}));

  const imageContainer = src => {
    const heightNeeded = (height || 0) / 3;
    return src && <div className={css(style.imageContainer)}><img src={src} role="presentation" height={`${heightNeeded}px`} className={css(style.image)} /></div>;
  };

  const className = css(style.contentBase, !message.inbound && style.contentRight);

  return (
    <div className={`chat-content ${className}`} >
      <div className="chat-bubble">
        <span>{message.message}</span>
        {
          Image
            ? <Image src={message.src} />
            : imageContainer(message.src, height)
        }
      </div>
    </div>
  );
};

MessageContent.propTypes = {
  height: PropTypes.number,
  imageRenderer: PropTypes.func,
  message: PropTypes.shape({
    message: PropTypes.string,
    src: PropTypes.string,
    inbound: PropTypes.bool.isRequired,
    avatar: PropTypes.string,
    backColor: PropTypes.string.isRequired,
    textColor: PropTypes.string,
  }).isRequired,
  styles: PropTypes.object,
};

export default MessageContent;
