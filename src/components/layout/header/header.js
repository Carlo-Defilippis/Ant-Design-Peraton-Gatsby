import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import { defaultLangKey } from '../../../../i18n'

import './header.css'

const windowGlobal = typeof window !== 'undefined' && window

/**
 * The header component.
 */
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.toggleDark()
  }

  toggleDark = () => {
    if (windowGlobal) {
      windowGlobal.document.body.classList.add('dark')
    }
  }

  render() {
    const { title, langKey } = this.props

    return (
      <header id="header" className="clearfix">
        <span id="logo">
          <StaticQuery
            query={headerQuery}
            render={data => (
              <React.Fragment>
                <Image
                  fixed={data.file.childImageSharp.fixed}
                  imgStyle={{ borderRadius: '50%' }}
                />
                <Link
                  to={
                    langKey
                      ? langKey !== defaultLangKey
                        ? `/${langKey}`
                        : `/`
                      : '/'
                  }
                  id="name"
                >
                  {title || data.site.siteMetadata.title}
                </Link>
              </React.Fragment>
            )}
          />
        </span>
      </header>
    )
  }
}

const headerQuery = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        author
        title
      }
    }

    file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 32, height: 32) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
