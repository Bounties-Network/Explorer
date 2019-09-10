import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import { Box } from 'rebass';

const Divider = styled(Box)<{
  mb?: number;
  marginBottom?: number;
  mt?: number;
  marginTop?: number;
}>(props =>
  css({
    mt: 3,
    mb: props.mb || props.marginBottom || 3,
    width: '100%',
    height: '1px',
    backgroundColor: 'gray200'
  })
);
export default Divider;
