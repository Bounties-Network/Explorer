
import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import { Box } from 'rebass';

interface IVerticalDividerProps {
  backgroundColor?: string;
  ml?: number | number[];
  marginLeft?: number | number[];
  mr?: number | number[];
  marginRight?: number | number[];
}

const VerticalDivider = styled(Box)<IVerticalDividerProps>(props =>
  css({
    display: 'flex',
    ml: props.ml || props.marginLeft || 3,
    mr: props.mr || props.marginRight || 3,
    width: '1px',
    minHeight: '100%',
    backgroundColor: props.backgroundColor || 'gray200',
  })
);

export default VerticalDivider;
