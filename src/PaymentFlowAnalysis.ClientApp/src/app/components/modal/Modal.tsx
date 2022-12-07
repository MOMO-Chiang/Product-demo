import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalTitle } from './ModalTitle';
import { ModalCloseButton } from './ModalCloseButton';

const modalRoot = document.getElementById('modal-root');

interface ModalWrapProps {}

class ModalWrap extends React.Component {
  el: HTMLDivElement;

  constructor(props: ModalWrapProps) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot!.appendChild(this.el);
    const body = document.getElementsByTagName('body')[0];
    if (!body.className.includes('overflow-hidden')) {
      body.className = `${body.className.trim()} overflow-hidden`;
    }
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot!.removeChild(this.el);
    if (!modalRoot!.innerHTML) {
      const body = document.getElementsByTagName('body')[0];
      body.className = body.className.replace(/overflow-hidden/, '').trim();
    }
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}

interface ModalProps {
  /** 是否顯示 Modal */
  show: boolean;
  /** class name */
  dialogClassName?: string;
}

interface ModalState {
  exactShow: boolean;
  fadeIn: boolean;
}

/** Modal */
export class Modal extends React.Component<ModalProps, ModalState> {
  static Header = ModalHeader;
  static Title = ModalTitle;
  static Body = ModalBody;
  static Footer = ModalFooter;
  static CloseButton = ModalCloseButton;

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      exactShow: props.show,
      fadeIn: props.show,
    };
  }

  componentDidUpdate(prevProps: ModalProps) {
    const isShowChanged = this.props.show !== prevProps.show;

    if (isShowChanged) {
      if (this.props.show) {
        this.setState({ exactShow: true });

        setTimeout(() => {
          this.setState({ fadeIn: true });
        }, 0);
      }

      if (!this.props.show) {
        this.setState({ fadeIn: false });

        setTimeout(() => {
          this.setState({ exactShow: false });
        }, 520);
      }
    }
  }

  render(): React.ReactNode {
    return (
      this.state.exactShow && (
        <ModalWrap>
          {this.state.fadeIn && <div className="modal-dimmer" />}
          <div className={`modal fade ${this.state.fadeIn ? 'show' : ''}`}>
            <div className={`modal-dialog ${this.props.dialogClassName || ''}`}>
              <div className="modal-content">{this.props.children}</div>
            </div>
          </div>
        </ModalWrap>
      )
    );
  }
}
