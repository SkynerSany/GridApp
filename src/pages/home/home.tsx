import {Component} from 'react'
import './home.scss'
import { homeProps } from './home.types'
import {Link} from "react-router-dom";

export default class Home extends Component<homeProps> {
  render() {
    return (
      <article className="home d-flex align-items-center justify-content-center h-100">
        <section className="greeting d-flex align-items-center justify-content-center bg-dark">
          <p className="greeting__text text-light fs-3">Welcome to my app</p>
          <div className="auth_btns d-flex gap-3">
            <Link to="/grid" className="btn btn-primary btn-lg">Login</Link>
            <Link to="/grid" className="btn btn-danger btn-lg">Register</Link>
          </div>
        </section>
      </article>
    )
  }
}
