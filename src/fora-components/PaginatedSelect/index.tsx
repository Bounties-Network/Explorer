/** @jsx jsx */
import { jsx } from "theme-ui";
import ReactPaginate from 'react-paginate';
import React from 'react'

const prefixer = (c: string) => `.ReactPaginate-${c}`
const reactPaginateStyle = {
  '> ul > *:not(:last-of-type)': { mr: 2 },
  [prefixer('arrow')]: {
    display: 'flex',
    height: theme => theme.space[5],
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    px: theme => theme.space[3], py: theme => theme.space[2], bg: 'white', border: 'base', boxSizing: 'border-box', borderRadius: 2,
    color: 'brandGray.400',
    cursor: 'pointer',
    '&:hover': { border: 'input.default' }
  },
  [prefixer('container')]: { display: 'flex' },
  [prefixer('break')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: theme => theme.space[5],
    height: theme => theme.space[5],
    border: 'base',
    borderRadius: 2,
    '> *': theme => ({
      ...theme.text.bodyStrong,
      color: 'brandGray.400'
    })
  },
  [prefixer('page')]: { display: 'flex' },
  [prefixer('pageLink')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: theme => theme.space[5],
    height: theme => theme.space[5],
    borderRadius: 2,
    border: 'base',
    color: 'brandGray.400'

  },
  [prefixer('active')]: { display: 'flex' },
  [prefixer('activeLink')]: { display: 'flex', border: 'input.active', color: 'brandPrimary.300' },
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