import React, { useState } from 'react'
import { createStyles, Navbar, Group, Code, Avatar } from '@mantine/core';
import data from './SidebarData.js'
import TdxLogo from '../assets/TdxLogo.jpg'
import { IconLogout, IconSwitchHorizontal,IconUserCircle } from '@tabler/icons';
import { Link, useNavigate } from 'react-router-dom';
// state managment 
import {useRecoilValue} from 'recoil'
import userAtom from '../recoil/atoms/UserAtom'
function SideBar() {
  const user = useRecoilValue(userAtom)
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) 
   console.log(user)
  const navigate = useNavigate()
  const logout = () => { 
    localStorage.removeItem('userInfo');
    navigate('/')
   }
    const useStyles = createStyles((theme, _params, getRef) => {
        const icon = getRef('icon');
        return {
          header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            display : 'flex',
            justifyContent : "center",
            borderBottom: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          },
      
          footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${
              theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          },
      
          link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,
      
            '&:hover': {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      
              [`& .${icon}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
              },
            },
          },
      
          linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
          },
      
          linkActive: {
            '&, &:hover': {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.green[4],
              color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.green[9],
              [`& .${icon}`]: {
                color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.green[9]
              },
            },
          },
        };
      });
    const { classes, cx } = useStyles();
  const [active, setActive] = useState('Dashboard');
    const links = data.map((item) => (
        <Link
          
          className={cx(classes.link, { [classes.linkActive]: item.label === active })}
          to={item.link}
          key={item.label}
          onClick={(event) => {
            event.preventDefault();
            navigate(`${item.link}`)
            setActive(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </Link>
      ));
  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
    <Navbar.Section grow>
      <Group className={classes.header} position="apart">
      <img src={TdxLogo} className='h-24 w-48 self-center' />
      </Group>
      {links}
    </Navbar.Section>

    <Navbar.Section className={classes.footer}>
      <Link to='/' className={classes.link} >
        <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
        <span>Change account</span>
      </Link>

      <div  className="cursor-pointer flex p-3 hover:bg-gray-50 rounded-lg " onClick={logout} >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Logout</span>
      </div>
    
    </Navbar.Section>
    <Navbar.Section className={classes.footer}>
      <div  className='flex gap-x-3 items-center flex-row'>
      <Avatar radius="xl" src={userInfo.adminImageUrl} />
      <div className='flex flex-col' >
        <p className='text-xl font-semibold'>{ userInfo.firstName + " " +userInfo.lastName }</p>
        <p className='text-center' >{userInfo.role.roleName}</p>
      </div>
      </div>

      
    
    </Navbar.Section>
  </Navbar>

  )
}

export default SideBar