import { Tabs } from 'antd';
import { useState } from 'react';
import { Note } from '../Notes';
import { Users } from '../Users';



const HeaderMain = () => {
    const [size, setSize] = useState('large');
    const items = [
        { id: 1, label: "Notes", children: <Note /> },
        { id: 2, label: "Users", children: <Users /> },
        { id: 3, label: "Select", children: 'ok' },
    ]

    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size={size}
                centered
                items={items.map((data) => {
                    return {
                        label: data.label,
                        key: data.id,
                        children: data.children
                    }
                })}
            >

            </Tabs>
        </div>
    );
};
export default HeaderMain;