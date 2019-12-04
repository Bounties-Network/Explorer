/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import { Flex, Text, Link, Button } from "rebass";
import moment from "moment";
import { useTable, useSortBy, Cell } from "react-table";
import {
  faArrowRight,
  faArrowDown,
  faArrowUp,
  faExternalLink
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Divider from "fora-components/Divider";
import Pill from "fora-components/Pill";
import { getStatusPillVariant } from "../../utils/helpers";

type RecentTransactionsProps = {
  transactions: ITransactionProps[];
  totalTransactionCount: number;
};

export interface ITransactionProps {
  transactionHash: string;
  from: string;
  to: string;
  timestamp: any;
  status: string;
  ethUSDAmount: any;
  ethAmount: any;
}
interface ILoadMoreProps {
  status: string;
}
const LoadMore: React.FC<ILoadMoreProps> = props => (
  <Flex
    sx={{ bg: "gray.100", height: "60px", width: "100%" }}
    justifyContent="center"
    alignItems="center"
  >
    <Text variant="link">Load More</Text>
  </Flex>
);

const shortenAddress = address => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

type IRenderCellProps = Cell<ITransactionProps>;
const RenderCell: React.FC<IRenderCellProps> = props => {
  switch (props.column.id) {
    case "transactionHash": {
      return (
        <Link variant="link" href={`https://etherscan.io/tx/${props.value}`}>
          <Flex alignItems="center" sx={{ "> :first-of-type": { mr: 2 } }}>
            <Text variant="link">{shortenAddress(props.value)}</Text>
            <FontAwesomeIcon
              icon={faExternalLink}
              sx={{ ":hover": { color: "seaGlass.300" } }}
            ></FontAwesomeIcon>
          </Flex>
        </Link>
      );
    }
    case "from": {
      return (
        <Flex
          alignItems="center"
          sx={{ "> svg:first-of-type": { ml: 3, color: "gray.400" } }}
        >
          <Text fontFamily="secondary" color="gray.500" variant="body">
            {shortenAddress(props.value)}
          </Text>
          <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
        </Flex>
      );
    }
    case "to": {
      return (
        <Text fontFamily="secondary" color="gray.500" variant="body">
          {shortenAddress(props.value)}
        </Text>
      );
    }
    case "status": {
      return (
        <Pill variant={getStatusPillVariant(props.value)}>{props.value}</Pill>
      );
    }
    case "ethAmount": {
      return (
        <Text variant={"small"} color="gray.400">
          {`${props.value} ETH`}
        </Text>
      );
    }
    case "ethUSDAmount": {
      return (
        <Text variant={"numericalMonospaceLarge"}>{`$${props.value}`}</Text>
      );
    }
    case "timestamp": {
      return (
        <Text fontFamily="secondary" variant="body" color="gray.400">
          {moment(props.value).fromNow()}
        </Text>
      );
    }
    default: {
      return null;
    }
  }
};

interface ITableProps {
  columns: any;
  data: ITransactionProps[];
  totalTransactionCount: number;
}
const Table: React.FC<ITableProps> = ({
  data,
  columns,
  totalTransactionCount
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <table
      sx={{
        borderCollapse: "unset",
        border: "base",
        borderRadius: 2,
        bg: "white"
      }}
      {...getTableProps()}
    >
      <thead>
        <tr>
          {headers.map((column: any) => (
            <th
              sx={{ bg: "gray.100", py: 2, px: 3 }}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <Text
                variant="small"
                color="gray.400"
                sx={{ textTransform: "uppercase" }}
              >
                {column.render("Header")}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <FontAwesomeIcon
                      sx={{ color: "gray.400", ml: 2 }}
                      icon={faArrowDown}
                    ></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon
                      sx={{ color: "gray.400", ml: 2 }}
                      icon={faArrowUp}
                    ></FontAwesomeIcon>
                  )
                ) : (
                  ""
                )}
              </Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} sx={{ borderBottom: "active" }}>
              {row.cells.map(cell => {
                return (
                  <td sx={{ py: 3, px: 3 }} {...cell.getCellProps()}>
                    <RenderCell {...cell}></RenderCell>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const RecentTransactions: React.FunctionComponent<RecentTransactionsProps> = props => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Transaction Hash",
        accessor: "transactionHash"
      },
      {
        Header: "From",
        accessor: "from"
      },
      {
        Header: "To",
        accessor: "to"
      },
      {
        Header: "Time",
        accessor: "timestamp"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "ETH",
        accessor: "ethAmount"
      },
      {
        Header: "USD",
        accessor: "ethUSDAmount"
      }
    ],
    []
  );

  return (
    <Table
      columns={columns}
      data={props.transactions}
      totalTransactionCount={props.totalTransactionCount}
    />
  );
};

export default RecentTransactions;
