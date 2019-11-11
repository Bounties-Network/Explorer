/** @jsx jsx */
import { jsx } from "theme-ui";
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import React from 'react'
import { Flex } from "rebass";
import { Global } from "@emotion/core";
import css from "@styled-system/css";

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
  >
    {children}
  </div>
)

interface IPageCounterProps { onClick: any, active: boolean }
const PageCounter: React.FC<IPageCounterProps> = (props) => (
  <div {...props} />
)

const prefixer = (c) => `.ReactPaginate-${c}`
const reactPaginateStyle = {
  '> ul > *:not(:last-of-type)': { mr: 2 },
  [prefixer('arrow')]: {
    display: 'flex',
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: 3, py: 2, bg: 'white', border: 'base', boxSizing: 'border-box', borderRadius: 2,
    color: 'gray400',
    cursor: 'pointer',
    '&:hover': { border: 'active' }
  },
  [prefixer('container')]: { display: 'flex' },
  [prefixer('break')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 5,
    height: 5,
    border: 'base',
    borderRadius: 2,
    '> *': theme => ({
      ...theme.text.bodyStrong,
      color: 'gray400'
    })
  },
  [prefixer('page')]: { display: 'flex' },
  [prefixer('pageLink')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 5,
    height: 5,
    border: 'base',
    borderRadius: 2,
    color: 'gray400'
    
  },
  [prefixer('active')]: { display: 'flex' },
  [prefixer('activeLink')]: { display: 'flex', border: 'primaryActive', color: 'seaGlass300' },
  [prefixer('disabled')]: { display: 'none' },
}

const PaginatedSelect: React.FC<any> = (props) => {
  return (
    <div sx={reactPaginateStyle as any}>
      <ReactPaginate
        previousLabel={'←'}
        nextLabel={'→'}
        breakLabel={'...'}
        pageRangeDisplayed={2}
        marginRangeDisplayed={6}
        containerClassName={prefixer('container').replace('.','')}
        breakClassName={prefixer('break').replace('.','')}
        breakLinkClassName={prefixer('breakLink').replace('.','')}
        pageClassName={prefixer('page').replace('.','')}
        pageLinkClassName={prefixer('pageLink').replace('.','')}
        activeClassName={prefixer('active').replace('.','')}
        activeLinkClassName={prefixer('activeLink').replace('.','')}
        nextLinkClassName={prefixer('arrow').replace('.','')}
        previousLinkClassName={prefixer('arrow').replace('.','')}
        disabledClassName={prefixer('disabled').replace('.','')}
        {...props}
      />
    </div>
  )
}

export default PaginatedSelect