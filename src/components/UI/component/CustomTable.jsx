import React from 'react'
import { Table } from 'antd';

const CustomTable = ({
    dataSource,
    columns,
    loading,
    pageSize,
    totalPages,
    showPagination = true,
    onPaginationChange,
    onTableChange,
    showSizeChanger
}) => {
    const paginationConfig = showPagination ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
        showPagination: true
    } : false;
    return (
        <Table
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            onChange={onTableChange}
            pagination={paginationConfig}
            scroll={{
                y:420
            }}
        />
    )
}

export default CustomTable