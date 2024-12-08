import {Component} from 'react'
import './error-page.scss'
import { errorPageProps } from './error-page.types'

export default class ErrorPage extends Component<errorPageProps> {
  render() {
    return (
      <article className="h-100 d-flex align-items-center justify-content-center">
        <section className="d-flex flex-column align-items-center text-light">
          <p className="fs-1 m-0">404</p>
          <p className="fs-2">Page not found</p>
        </section>
      </article>
    )
  }
}
