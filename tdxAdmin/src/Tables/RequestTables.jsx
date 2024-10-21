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
  Avatar,
  Anchor,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconCrossOff, IconUserOff,IconEye } from '@tabler/icons';
import formatDate from '../utils/FomatDateFromDb.js'
import  { useNavigate} from 'react-router-dom'
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

export default function TableSort({ data }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const moveToOrderScreen = (id,type) => { 
    if(type===1){
        navigate(`/admin/orders/basic/single/${id}`) 
    }else{
      navigate(`/admin/orders/advanced/${id}/single/`)   
    }

   }
  const rows = sortedData.map((row) => (
    <tr key={row.id}>
         <td>{formatDate(row.createdAt) }</td>
      <td>{row.user.firstName + " " +row.user.lastName}</td>
      <td><Avatar radius="xl" src={row.user.userImgUrl} /></td>
      <td>{row.parentId.toString().padStart(10,"0") } </td>
      <td>{row.type === 1 ? "basic" : "advanced"  } </td>
      <td>{row.status === 2 ? <div className='h-8 w-28 flex rounded-full bg-green-300 justify-center items-center' >
        <p className='text-green-700' >approved</p>
      </div> : row.status===3 ?  <div className='h-8 w-20 rounded-full flex bg-red-300 justify-center items-center' >
        <p className='text-red-700' >rejected</p>
      </div>:  <div className='h-8 w-20 rounded-full flex bg-yellow-300 justify-center items-center' >
        <p className='text-yellow-700' >pending</p>
      </div>  }</td>
      <td className='flex gap-x-2' ><Button   onClick={ ()=>{moveToOrderScreen(row.parentId,row.type)} }  className='bg-blue-500 hover:bg-blue-700 w-30' leftIcon={<IconEye/>} backgroundColor="blue" color='yellow' >see order detail</Button> 
    </td>
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
              sorted={sortBy === ''}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
        Date
            </Th>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              user Full name
            </Th>
         
           
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              photoUrl
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              orderId
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              order category
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              status
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Actions
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