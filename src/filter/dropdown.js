// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import document from 'global/document';

import Popper from 'popper.js';
import get from 'lodash/get';

import {theme} from './theme';

export const Container = styled.div`
  position: absolute;
  top: ${p => p.offsets.top}px;
  left: ${p => p.offsets.left}px;
  background-color: ${theme('colors.mono100')};
  z-index: 10;
  border-radius: 3px;
  background-color: white;
  position: absolute;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  font-weight: 500;
  justify-content: center;
  padding: 5px 0;
`;

export const Item = styled.div`
  color: ${theme('colors.mono800')};
  line-height: 16px;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${theme('colors.baseUIprimary300')};
    background-color: ${theme('colors.baseUIprimary50')};
  }
`;

export const PLACEMENT = {
  auto: 'auto',
  topLeft: 'topLeft',
  top: 'top',
  topRight: 'topRight',
  rightTop: 'rightTop',
  right: 'right',
  rightBottom: 'rightBottom',
  bottomRight: 'bottomRight',
  bottom: 'bottom',
  bottomLeft: 'bottomLeft',
  leftBottom: 'leftBottom',
  left: 'left',
  leftTop: 'leftTop'
};

export type Placement = $Keys<typeof PLACEMENT>;
export type Offset = {
  top: number,
  left: number
};
export type State = {
  offsets: Offset,
  placement: Placement,
  isOpen: boolean
};
export type ContentRenderProp = () => React.Node;
export type Child = void | null | boolean | number | string | React.Element<*>;
export type Children = React.ChildrenArray<Child>;
export type Option = $ReadOnly<{|
  key?: ?string,
  value: string,
  onClick: () => void
|}>;
export type Props = {
  children: Children,
  className?: string,
  onClick?: (e: Event) => void,
  onClickOutside?: () => void,
  onEsc?: () => void,
  onFocus?: () => void,
  optionArgs?: any,
  options: $ReadOnlyArray<Option>,
  placement: Placement
};
export type PopperOffset = {
  top?: number | null,
  left?: number | null
};
export type PopperDataObject = {
  offsets: {
    popper: PopperOffset
  },
  placement: string
};
export type PopperOptions = {
  placement: string,
  modifiers: {
    computeStyle: {},
    applyStyle: {},
    applyReactStyle: {
      fn: (data: PopperDataObject) => void
    }
  }
};

export const toPopperPlacement = (p: Placement) =>
  p.replace(/(Top|Left)$/, '-start').replace(/(Right|Bottom)$/, '-end');

export const fromPopperPlacement = (p: Placement): Placement | null => {
  const placement = p
    .replace(/(top|bottom)-start$/, '$1Left')
    .replace(/(top|bottom)-end$/, '$1Right')
    .replace(/(left|right)-start$/, '$1Top')
    .replace(/(left|right)-end$/, '$1Bottom');
  return PLACEMENT[placement] || null;
};

export const parsePopperOffset = (offset: Offset) => ({
  top: Math.floor(offset.top || 0),
  left: Math.floor(offset.left || 0)
});

export type AnchorProps = {
  'aria-controls'?: string | null,
  'aria-describedby'?: string | null,
  'aria-expanded'?: string,
  'aria-haspopup'?: string,
  'aria-owns'?: string | null,
  id?: string | null,
  onFocus?: () => void,
  ref?: React.Ref<*>,
  tabIndex?: '0'
};

export type ReactObjRef<ElementType: React.ElementType> = {
  current: null | React.ElementRef<ElementType>
};

export default class Dropdown extends React.Component<Props, State> {
  static defaultProps = {
    placement: PLACEMENT.auto
  };

  popper: ?Popper;
  anchorRef = (React.createRef(): ReactObjRef<*>);
  popperRef = (React.createRef(): ReactObjRef<*>);

  state = {
    offsets: {left: 0, top: 0},
    placement: this.props.placement,
    isOpen: false
  };

  componentWillUnmount() {
    this.destroyPopover();
    this.destroyListeners();
  }

  initializePopper = () =>
    (this.popper = new Popper(this.anchorRef.current, this.popperRef.current, {
      placement: toPopperPlacement(this.state.placement),
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        },
        applyStyle: {
          enabled: false
        },
        applyReactStyle: {
          enabled: true,
          fn: this.onPopperUpdate,
          order: 900
        }
      }
    }));

  initListeners = () => {
    document.addEventListener('mousedown', this.onDocumentClick);
    document.addEventListener('keyup', this.onKeyPress);
  };

  destroyListeners = () => {
    document.removeEventListener('mousedown', this.onDocumentClick);
    document.removeEventListener('keyup', this.onKeyPress);
  };

  onClick = () => {
    if (this.state.isOpen) return this.close();
    this.open();
  };

  onClickOutside = () =>
    this.props.onClickOutside ? this.props.onClickOutside() : this.close();

  onEsc = () => (this.props.onEsc ? this.props.onEsc() : this.close());

  open = () =>
    this.setState(
      {
        isOpen: true
      },
      () => {
        this.initializePopper();
        this.initListeners();
      }
    );

  close = () =>
    this.setState(
      {
        isOpen: false
      },
      () => {
        this.destroyPopover();
        this.destroyListeners();
      }
    );

  onClickItem = (onClick: any => void) => () => {
    onClick(this.props.optionArgs);
    this.close();
  };

  onKeyPress = (e: KeyboardEvent) =>
    e.key === 'Escape' && this.props.onEsc ? this.props.onEsc() : this.onEsc();

  onPopperUpdate = (data: PopperDataObject) => {
    const placement = fromPopperPlacement(get(data, 'placement')) || 'auto';
    this.setState({
      offsets: parsePopperOffset(get(data, 'offsets.popper')),
      placement
    });
    return data;
  };

  onDocumentClick = (evt: MouseEvent) => {
    const target = evt.target;
    const popper = this.popperRef.current;
    const anchor = this.anchorRef.current;
    if (!popper || popper === target || popper.contains(target)) return;
    if (!anchor || anchor === target || anchor.contains(target)) return;
    this.onClickOutside();
  };

  destroyPopover = () => {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }
  };

  renderAnchor = () => {
    const {isOpen} = this.state;
    const {children} = this.props;
    const childArray = React.Children.toArray(children);
    const anchor =
      childArray.length > 1 ? (
        <React.Fragment> {childArray} </React.Fragment>
      ) : childArray.length === 0 ? (
        <React.Fragment />
      ) : (
        childArray[0]
      );
    const anchorProps = {
      'aria-haspopup': 'true',
      'aria-expanded': isOpen ? 'true' : 'false',
      'aria-controls': isOpen ? 'dropdown' : null,
      onClick: this.onClick,
      key: 'dropdown-anchor',
      innerRef: this.anchorRef
    };

    if (typeof anchor === 'object' && React.isValidElement(anchor))
      return React.cloneElement(anchor, anchorProps);

    return <span {...anchorProps}>{anchor}</span>;
  };

  renderPopover = () => {
    const {className, options, optionArgs} = this.props;
    const {offsets, placement} = this.state;
    return (
      <Container
        className={className}
        key="dropdown-container"
        innerRef={this.popperRef}
        id="dropdown"
        placement={placement}
        offsets={offsets}
      >
        {options.map(({value, onClick}, idx) => (
          <Item key={value} onClick={this.onClickItem(onClick)}>
            {typeof value === 'function' ? value(optionArgs) : value}
          </Item>
        ))}
      </Container>
    );
  };

  render() {
    return [
      this.renderAnchor(),
      // TODO(cmartell): check for browser environment and conditionally render this.
      this.state.isOpen &&
        // $FlowFixMe
        ReactDOM.createPortal(this.renderPopover(), document.body)
    ];
  }
}
