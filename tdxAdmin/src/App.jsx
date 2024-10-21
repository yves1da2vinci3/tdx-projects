import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import {RecoilRoot} from 'recoil'
import './index.css'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/Main/DashBoardScreen'
import NotificationsScreen from './screens/Main/Notifications/Overview'
import TickerScreen from './screens/Main/Tickers/Overview'
import OneTickerScreen from './screens/Main/Tickers/SingleTicker'
import CreateTickerScreen from './screens/Main/Tickers/AddTicker'
import CreateCommodityScreen from './screens/Main/settings/createCommodity'
import CreateWarehouseScreen from './screens/Main/settings/createWarehouse'
import CreateAdministratorScreen from './screens/Main/User/admin/createAdmin'
import CreateClientScreen from './screens/Main/User/Client/CreateUserScreen'
import UserScreen from './screens/Main/User/HomeScreen'
import DepositsOverview from './screens/Main/Transactions/DepositsOverview'
import WithdrawalsOverview from './screens/Main/Transactions/WithdrawalsOverview';
import BasicOrderScreen from './screens/Main/Orders/basic/Overview'
import AdvancedOrderScreen from './screens/Main/Orders/advanced/Overview'
import SingleBasicOrderScreen from './screens/Main/Orders/basic/SingleOrder'
import SingleAdvancedOrderScreen from './screens/Main/Orders/advanced/SingleOrder'
import ArticleScreen from './screens/Main/Articles/Overview'
import CallScreen from './screens/Main/Calls/Overview'
import CreateArticleScreen from './screens/Main/Articles/AddArticle'
import HomeOrderScreen from './screens/Main/Orders/HomeScreen'
import HomeTransactionScreen from './screens/Main/Transactions/HomeScreen'
import MainLayout from "./Layout/MainLayout"
import AdminOverview from './screens/Main/User/admin/Overview'
import AdminUserOverview from './screens/Main/User/Client/Overview'
import SingleUser from './screens/Main/User/Client/SingleUser'
import FeeScreen from './screens/Main/Orders/FeeScreen'
//settings
import SettingsScreen from './screens/Main/settings/HomeScreen'
import CreateHarvest from './screens/Main/settings/createHarvestYear'
import CreateCommodityCategory from './screens/Main/settings/createCommodityCategory'
import CreateCountry from './screens/Main/settings/createCountry'
import CreateCommodityType from './screens/Main/settings/createCommodityType'
import IssueScreen from './screens/IssueScreen'
import RequestScreen from './screens/RequestScreen'
import FeeDetailsScreen from './screens/Main/Orders/FeeDetailsScreen';

function App() {


  return (
    <RecoilRoot>

    
    <Router>
      <MantineProvider>
     <NotificationsProvider>
      <Routes>
        <Route element={<LoginScreen />} path='/' />
        <Route   element={<MainLayout />}>
        <Route element={<HomeScreen />} path='/admin/home' />
        <Route element={<NotificationsScreen />} path='/admin/notifications' />
        <Route element={<TickerScreen />} path='/admin/tickers' />
        <Route element={<OneTickerScreen />} path='/admin/tickers/ticker/:tickerId' />
        <Route element={<CreateTickerScreen />} path='/admin/tickers/create' />
        <Route element={<CreateCommodityScreen />} path='/admin/commodity/create' />
        <Route element={<CreateWarehouseScreen />} path='/admin/warehouse/create' />
        <Route element={<CreateAdministratorScreen />} path='/admin/administrator/create' />
        <Route element={<CreateClientScreen />} path='/admin/client/create' />
        <Route element={<UserScreen />} path='/admin/user' />
        <Route element={<AdminOverview />} path='/admin/administrator' />
        <Route element={<AdminUserOverview />} path='/admin/client' />
        <Route element={<SingleUser />} path='/admin/client/:userId' />
        <Route element={<HomeTransactionScreen />} path='/admin/transactions' />
        <Route element={<DepositsOverview />} path='/admin/transactions/deposits' />
        <Route element={<WithdrawalsOverview />} path='/admin/transactions/withdrawals' />
        <Route element={<HomeOrderScreen />} path='/admin/orders' />
        <Route element={<AdvancedOrderScreen />} path='/admin/orders/advanced' />
        <Route element={<SingleAdvancedOrderScreen />} path='/admin/orders/advanced/:orderId/single' />
        <Route element={<BasicOrderScreen />} path='/admin/orders/basic' />
        <Route element={<SingleBasicOrderScreen />} path='/admin/orders/basic/single/:orderId' />
        <Route element={<ArticleScreen />} path='/admin/articles' />
        <Route element={<CreateArticleScreen />} path='/admin/articles/create' />
        <Route element={<CallScreen />} path='/admin/calls' />
        <Route element={<IssueScreen />} path='/admin/issues' />
        <Route element={<RequestScreen />} path='/admin/requests' />
        <Route element={<SettingsScreen />} path='/admin/settings' />
        <Route element={<CreateCommodityCategory />} path='/admin/settings/createCommodityCategory' />
        <Route element={<CreateCommodityType />} path='/admin/settings/createCommodityType' />
        <Route element={<CreateCountry />} path='/admin/settings/createCountry' />
        <Route element={<CreateHarvest />} path='/admin/settings/createHarvest' />
        <Route element={<FeeScreen />} path='/admin/order/fee' />
        <Route element={<FeeDetailsScreen />} path='/admin/order/fee/detail' />
      
    </Route>
      </Routes>
      </NotificationsProvider>
      </MantineProvider>
    </Router>
    </RecoilRoot>
  )
}

export default App
