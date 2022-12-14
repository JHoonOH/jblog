import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  wrapper,
  leftMenu,
  container,
  rightMenu,
  dirLinkText,
  dirLinkItem,
  cateLinks,
  cateLinkItem,
  cateLinkText,
  nav,
  navLinks,
} from './Layout.module.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        group(field: frontmatter___directory) {
          totalCount
          fieldValue
          group(field: frontmatter___category) {
            totalCount
            fieldValue
          }
        }
      }
    }
  `)

  return (
    <div className={wrapper}>
      <div className={leftMenu}>
        <nav className={nav}>
          <ul className={navLinks}>
            {
              data.allMdx.group.map(node => (
                <li className={dirLinkItem} key={node.fieldValue}>
                  <Link to={`/more/${node.fieldValue}/1`} className={dirLinkText}>
                    {node.fieldValue.charAt(0).toUpperCase() + node.fieldValue.slice(1)} ({node.totalCount})
                  </Link>
                  <ul className={cateLinks}>
                    {node.group.map(node => (
                      <li className={cateLinkItem} key={node.fieldValue}>
                        <Link to={`/more/${node.fieldValue}/1`} className={cateLinkText}>
                          {node.fieldValue.charAt(0).toUpperCase() + node.fieldValue.slice(1)} ({node.totalCount})
                        </Link>
                      </li>))}
                  </ul>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
      <div className={container}>
        {/* <header className={siteTitle}>{pageTitle}</header> */}
        <main>
          {children}
        </main>
        <footer>
          <Comment repo="JHoonOH/jblog" />
        </footer>
      </div>
      <div className={rightMenu}>
      </div>
    </div>
  )
}

export default Layout