import React, { useEffect } from 'react'
import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import { Table, Tag } from 'antd'
import axios from 'axios'

const IndexPage = () => {
  const [data, setData] = React.useState({
    data: {
      first: '',
      last: '',
      title: '',
      age: 0,
      large: '',
      state: '',
      email: '',
    },
  })

  const columns = [
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
      render: (_, { title }) => (
        <>
          {title === 'Mr' ? (
            <Tag color="blue">{title}</Tag>
          ) : title === 'Miss' ? (
            <Tag color="green">{title}</Tag>
          ) : title === 'Mrs' ? (
            <Tag color="pink">{title}</Tag>
          ) : title === 'Ms' ? (
            <Tag color="orange">{title}</Tag>
          ) : null}
        </>
      ),
      size: 'small',
    },
    {
      title: 'First Name',
      dataIndex: 'first',
      key: 'date',
    },
    {
      title: 'Last Name',
      dataIndex: 'last',
      key: 'last',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
  ]

  useEffect(() => {
    console.log('useEffect')
    axios
      .get('https://randomuser.me/api/?results=100&nat=us')
      .then(response => {
        console.log(response.data.results)
        var dataRows = []
        response.data.results.forEach((item, i) => {
          let myData = {
            ...item.name,
            ...item.dob,
            ...item.picture,
            ...item.location,
            ...item,
          }
          dataRows.push(myData)
        })
        return dataRows
      })
      .then(dataRows => {
        console.log(dataRows)
        setData({
          data: dataRows,
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      {data.data.length > 2 ? (
        <div className="initial" key="data-table-list">
          <Table
            dataSource={data.data}
            columns={columns}
            rowKey={data => data.cell}
          />
        </div>
      ) : null}
      {console.log(data)}
    </Layout>
  )
}

export default IndexPage
