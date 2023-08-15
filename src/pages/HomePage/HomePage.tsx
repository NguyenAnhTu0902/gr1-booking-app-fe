import React from 'react';
import Featured from '../../components/Featured/Featured';
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import MailList from '../../components/MailList/MailList';
import Navbar from '../../components/Navbar/Navbar';
import PropertyList from '../../components/PropertyList/PropertyList';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className={styles['home-page__container']}>
        <Featured />
        <h1 className={styles['home-page__container__title']}>
          Browse by property type
        </h1>
        <PropertyList />
        <h1 className={styles['home-page__container__title']}>Home guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;