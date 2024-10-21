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
import { IconSelector, IconChevronDown, IconChevronUp,  IconEye } from '@tabler/icons';
import {   ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { Link, useParams } from 'react-router-dom';
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
  
  const theme =  useMantineTheme()
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

  const rows = sortedData.map((row) => (
    <tr key={row.tickerName}>
      <td>{row.title}</td>
      <td>{row.country.countryName}</td>
      <td>{row.warehouse.warehouseName}</td>
      <td>{row.commodity.commodityName}</td>
      <td>{row.commodityType.commodityTypeName}</td>
      <td>{row.grade.gradeValue}</td>
      
      <td className='flex gap-x-2' > <Link to={`/admin/tickers/ticker/${row.id}`} ><Button   className='bg-blue-500 hover:bg-blue-800 w-30' leftIcon={<IconEye/>} backgroundColor="yellow" color='yellow' >see detail</Button></Link>  </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <div className='self-center my-4' >
<TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      value={search}
        onChange={handleSearchChange}
      rightSection={
        <ActionIcon size={32} className="bg-green-600 hover:bg-green-800" radius="xl" color={theme.colors.green[9]} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search a ticker"
      rightSectionWidth={42}
    />
</div>
      {/* <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      /> */}
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'tickerName'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('tickerName')}
            >
              Ticker Name
            </Th>
            <Th
              sorted={sortBy === 'country'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('country')}
            >
             Country
            </Th>
            <Th
              sorted={sortBy === 'warehouse'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('warehouse')}
            >
              WareHouse
            </Th>
            <Th
              sorted={sortBy === 'commodity'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('commodity')}
            >
              Commodity
            </Th>
            <Th
              sorted={sortBy === 'commodityType'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('commodityType')}
            >
              Commodity Type
            </Th>
            <Th
              sorted={sortBy === 'grade'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('grade')}
            >
              Grade
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