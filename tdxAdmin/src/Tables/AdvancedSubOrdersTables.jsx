import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Button,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconCrossOff, IconUserOff, IconEye } from '@tabler/icons';
import { IconTrash,IconCross } from '@tabler/icons';
import { useNavigate } from 'react-router';
import formatDate from '../utils/FomatDateFromDb';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));



function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}
/**
 * It sorts the data by the sortBy property, and then filters the data by the search property
 * @returns function filterData(
 *   data,
 *   search
 * ) {
 *   if (!search) {
 *     return data;
 *   }
 */

function sortData(
  data,
  payload
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function TableSort({ data ,moveToFeeScreen,MoveToFeeDetail}) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const Navigate = useNavigate()
 
  /**
   * If the field is the same as the current sortBy field, reverse the sort direction, otherwise set it
   * to false. Then set the sortBy field to the field passed in, and sort the data.
   */
  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

/**
 * It takes the value of the search input and sets the search state to that value, then it sorts the
 * data based on the current sortBy and reverseSortDirection states and sets the sortedData state to
 * the result
 */
  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  
  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>{formatDate(row.createdAt)}</td>
      <td>{row.qty }</td>
      <td>{row.price  }</td>
      <td>{row.status ===0  ? <div className='h-8 w-20 flex rounded-full bg-yellow-300 justify-center items-center' >
        <p className='text-yellow-700 text-sm' >pending</p>
      </div> : row.status ===1 ? <div className='h-8 w-20 flex rounded-full bg-green-300 justify-center items-center' >
      <p className='text-green-700 text-sm' >completed</p>
    </div>  : <div className='h-8 w-20 flex rounded-full bg-red-300 justify-center items-center' >
      <p className='text-red-700 text-sm' >canceled</p>
    </div>  }</td>
    <td>  {row.status === 1 ?<Button onClick={()=> MoveToFeeDetail(row.id,row.qty)}    className='bg-green-500 hover:bg-green-800 w-30' leftIcon={<IconEye/>} backgroundColor="yellow" color='yellow' >see Fee detail</Button>  : <Button onClick={()=> moveToFeeScreen(row.id)}    className='bg-green-500 hover:bg-green-800 w-30' leftIcon={<IconEye/>} backgroundColor="yellow" color='yellow' >Add Fee</Button>}  </td>

    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Date
            </Th>
         
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              quantity
            </Th>
        
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
               price
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
               Status
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
               Action
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}