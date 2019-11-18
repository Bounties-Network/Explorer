import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import { Box } from 'rebass';

interface IDividerProps {
  backgroundColor?: string;
  mb?: number | number[] | string;
  marginBottom?: number | number[];
  mt?: number | number[] | string;
  marginTop?: number | number[];
}

const Divider = styled(Box)<IDividerProps>(props =>
  css({
    mt: props.mt || props.marginTop || 3,
    mb: props.mb || props.marginBottom || 3,
    width: '100%',
    height: '1px',
    backgroundColor: props.backgroundColor || 'gray200'
  })
);

export default Divider;
