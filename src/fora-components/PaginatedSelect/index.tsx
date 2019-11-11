/** @jsx jsx */
import { jsx } from "theme-ui";
import React from 'react'
import { Flex } from "rebass";

interface IArrowProp {
  pageCount: number,
  currentPage: number,
  setPage: Function,
  variant: 'left' | 'right'
}
const Arrow: React.FC<IArrowProp> = ({ pageCount, currentPage, variant, setPage, children }) => (
  <div
    onClick={() => {
      const addition = variant === 'right' ? 1 : -1
      let newPage = currentPage + addition
      if (newPage === 0 || newPage > pageCount) {
        return
      }
      setPage(newPage)
    }}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 3, py: 2, bg: 'white', border: 'base', boxSizing: 'border-box', borderRadius: 2,
      color: 'gray400',
      cursor: 'pointer',
      '&:hover': { border: 'active' }
    }}>
    {children}
  </div>
)

interface IPageCounterProps { onClick: any, active: boolean }
const PageCounter: React.FC<IPageCounterProps> = (props) => (
  <div sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 5,
    height: 5,
    border: props.active ? 'primaryActive' : 'base',
    borderRadius: 2,
    '> *': theme => ({
      ...theme.text.bodyStrong,
      color: props.active ? 'seaGlass300' : 'gray400'
    })
  }} {...props} />
)

interface IPaginatedSelectProps { pageCount: number, defaultPage: number }
const PaginatedSelect: React.FC<IPaginatedSelectProps> = (props) => {
  const [currentPage, setPage] = React.useState<number>(props.defaultPage)

  return (
    <Flex sx={{ '> *:not(:last-of-type)': { mr: 2 } }}>
      <Arrow currentPage={currentPage} pageCount={props.pageCount} variant='left' setPage={setPage}> {'←'} </Arrow>
      {
        Array(props.pageCount).fill('lol', 0, props.pageCount).map((_, index) => (
          <PageCounter active={currentPage === index + 1} onClick={() => setPage(index + 1)}>
            {index + 1}
          </PageCounter>
        ))}
      <Arrow pageCount={props.pageCount} currentPage={currentPage} variant='right' setPage={setPage} >{"→"} </Arrow>
    </Flex>)
}

export default PaginatedSelect