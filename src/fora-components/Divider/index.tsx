import styled from 'lib/emotion-styled';
import css from '@styled-system/css';
import { Box } from 'rebass';

const Divider = styled(Box)(() =>
  css({
    mt: 3,
    mb: 5,
    width: '100%',
    height: '1px',
    backgroundColor: 'gray200'
  })
);
export default Divider;
