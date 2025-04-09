import React, { useState, useEffect } from 'react';
import { Card, Input, Table, message, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import txtContent from './安全考试（使用中）.txt'

const { Search } = Input;

const SafetyExam = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共 ${total} 条数据`,
  });

  // 自定义空状态展示
  const CustomEmpty = () => (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span>
          {searchText ? `未找到包含 "${searchText}" 的内容` : '暂无数据'}
        </span>
      }
    />
  );

  // 高亮文本的处理函数
  const highlightText = (text, keyword) => {
    if (!keyword || !text) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <span key={index} style={{ color: '#f50' }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // 表格列定义
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      fixed: 'left',
      render: (_, __, index) => index + 1
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      // ellipsis: true,
      render: (text) => highlightText(text, searchText)
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: [
        { text: '选择题', value: '选择题' },
        { text: '判断题', value: '判断题' }
      ],
      onFilter: (value, record) => record.type === value
    }
  ];

  // 加载文件数据
  useEffect(() => {
    loadData();
  }, []);

  // 搜索过滤
  useEffect(() => {
    filterData(searchText);
  }, [searchText, dataSource]);

  // 加载txt文件数据
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(txtContent);
      const text = await response.text();
      const parsedData = parseTextData(text);
      setDataSource(parsedData);
      setFilteredData(parsedData);
      setPagination(prev => ({
        ...prev,
        total: parsedData.length
      }));
    } catch (error) {
      message.error('加载数据失败');
      console.error('加载数据错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 解析文本数据
  const parseTextData = (text) => {
    // 按行分割文本
    const lines = text.split('\n').filter(line => line.trim());
    
    // 将每行文本转换为数据对象
    return lines.map((line, index) => {
      // 假设文本格式为: "类型:内容"
      const isXz = ['A', 'B', 'C', 'D', 'E', 'F', 'G'].some(item => line.includes(item))
      const isPd = ['对', '错', '正确', '错误'].some(item => line.includes(item))
      const [content = line] = line.split(':').map(str => str.trim());
      return {
        key: index,
        type: isXz ? '选择题' : isPd ? '判断题' : '未分类',
        content: content // 如果没有分隔符，整行作为内容
      };
    });
  };

  // 搜索过滤
  const filterData = (value) => {
    const filtered = dataSource.filter(item => 
      item.content.toLowerCase().includes(value.toLowerCase())
      // item.type.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);

    setPagination(prev => ({
      ...prev,
      total: filteredData.length
    }));
  };

  // 处理搜索
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // 处理表格变化
  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(prev => ({
      ...prev,
      ...newPagination,
    }));
  };

  return (
    <div className={styles.container}>
      <Card title="安全知识库" className={styles.card}>
        <div className={styles.searchBar}>
          <Search
            placeholder="请输入搜索内容"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
          {searchText && (
            <div className={styles.searchInfo}>
              当前搜索：{searchText}
              {filteredData.length > 0 ? 
                `，找到 ${filteredData.length} 条结果` : 
                '，未找到匹配内容'}
            </div>
          )}
        </div>
        
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          className={styles.table}
          locale={{
            emptyText: <CustomEmpty />
          }}
        />
      </Card>
    </div>
  );
};

export default SafetyExam;