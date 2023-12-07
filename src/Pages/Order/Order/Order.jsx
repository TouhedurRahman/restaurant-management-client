import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { useState } from 'react';
import useMenu from '../../../Hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = [
        'salad',
        'pizza',
        'soup',
        'desserts',
        'drinks'
    ];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);

    const [tabIndex, setIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const offered = menu.filter(item => item.category === 'offered');
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>Bistro | Order Food</title>
            </Helmet>

            <Cover
                img={orderCover}
                title={"Order Food"}
            />
            <div className='my-10'>
                <Tabs
                    selectedIndex={tabIndex}
                    onSelect={(index) => setIndex(index)}
                >
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salad} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizza} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desserts} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;