import React from 'react'
import { daysArray } from '../../../constant/global'
import { FaEdit, FaPlus } from "react-icons/fa";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'
import { Button } from 'antd';

const TabForm = ({ handleOnSelect, content, data, showEditModal, showModal }) => {
    return (
        <Tabs
            defaultActiveKey="sunday"
            id="uncontrolled-tab-example-schedule"
            className="mb-3"
            onSelect={(k) => handleOnSelect(k)}
        >
            {
                daysArray.map((item) => (
                    <Tab eventKey={item} title={item.toUpperCase()}>
                        <div className='d-flex justify-content-between'>
                            {content}
                            {
                                <Button type="primary" shape="circle" onClick={data && data?.length > 0 ? showEditModal : showModal}>
                                    {data && data?.length > 0 ? <FaEdit /> : <FaPlus />}
                                </Button>
                            }
                        </div>
                    </Tab>
                ))
            }
        </Tabs>
    )
}

export default TabForm