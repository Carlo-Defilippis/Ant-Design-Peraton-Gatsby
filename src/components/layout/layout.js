import React, { Fragment } from 'react'
import { Col, Row } from 'antd'
import { StaticQuery } from 'gatsby'

import Header from './header/header'

import './layout.css'

class Layout extends React.Component {
  render() {
    const { children, title, langKey } = this.props

    return (
      <StaticQuery
        query={layoutQuery}
        render={data => (
          <Fragment>
            <div className="wrapper">
              <Header title={title} langKey={langKey} />
              <p>List data sourced from randomuser.me/api via axios</p>
              <Row gutter={48}>
                <Col xs={30} sm={24} md={18} lg={18} xl={18} xxl={18}>
                  <main>{children}</main>
                </Col>
              </Row>
            </div>
          </Fragment>
        )}
      />
    )
  }
}

const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        author
        title
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Layout
