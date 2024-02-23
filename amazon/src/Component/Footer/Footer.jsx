import React from 'react'
import classes from "../Footer/Footer.module.css"
import { TbWorld } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>

      <div className={classes.btn__button}>
          <Link to="">
            <p>Back to Top</p>
            </Link>
      </div>

      <div className={classes.outer__wrapper}>
        <div className={classes.footer__container}>
          <div className={classes.footer__wrapper}>
            <div>
                <h3>Get to Know Us</h3>
                <ul>
                    <li><a href="">Careers</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">About Amazon</a></li>
                    <li><a href="">Investor Relation</a></li>
                    <li><a href="">Amazon Devices</a></li>
                    <li><a href="">Amazon Science</a></li>    
                </ul>
            </div>

            <div>
              <h3>Make Money with Us</h3>
              <ul>
                <li><a href="">Sell products on Amazon</a></li>
                <li><a href="">Sell on Amazon Business</a></li>
                <li><a href="">Sell apps on Amazon</a></li>
                <li><a href="">Become an Affiliate</a></li>
                <li><a href="">Advertise Your Products</a></li>
                <li><a href="">Self-Publish with Us</a></li>
                <li><a href="">Host an Amazon Hub</a></li>
                <li><a href="">›See More Make Money <br /> with Us</a></li>
              </ul>
            </div>

            <div>
              <h3>Amazon Payment Products</h3>
              <ul>
                <li><a href="">Amazon Business Card</a></li>
                <li><a href="">Shop with Points</a></li>
                <li><a href="">Reload Your Balance</a></li>
                <li><a href="">Amazon Currency Converter</a></li>
              </ul>
            </div>

            <div>
              <h3>Let Us Help You</h3>
              <ul>
                <li><a href="">Amazon and COVID-19</a></li>
                <li><a href="">Your Account</a></li>
                <li><a href="">Your Orders</a></li>
                <li><a href="">Shipping Rates & Policies</a></li>
                <li><a href="">Returns & Replacements</a></li>
                <li><a href="">Manage Your Content and Devices</a></li>
                <li><a href="">Amazon Assistant</a></li>
                <li><a href="">Help</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={classes.ft__footer}>
          <Link to="" className={classes.footer__logo}>
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
          </Link>
          <Link to="">
          <TbWorld /> <p>English</p>
          </Link>
          {/* <a href="">
            <h5>$ USD-U.S. Dollar</h5>
          </a> */}
          <Link to="/" className={classes.footer__language}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png" alt="Language" />
            <p>United States</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Footer