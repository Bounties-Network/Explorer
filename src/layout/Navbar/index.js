import React from 'react';
import styles from './Navbar.module.scss';
import logo from 'assets/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => (
	<header className={styles.Navbar}>
	  <img src={logo} className={styles.logo} alt="logo" />
	  <h1 className={styles.title}>Welcome to Bounties Network</h1>
	  <Link to="/" className={styles.route}>Home</Link>
	  <Link to="Discover" className={styles.route}>Discover</Link>
	</header>
);

export default Navbar;
