import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.scss';
import discord from '../../../public/icons-footer/discord.svg';
import linkedin from '../../../public/icons-footer/linkedIn.svg';
import github from '../../../public/icons-footer/github.svg';
import facebook from '../../../public/icons-footer/facebook.svg';
import instagram from '../../../public/icons-footer/instagram.svg';
import youtube from '../../../public/icons-footer/youtube.svg';

const SocialMediaLinks = () => {
  return (
    <div className={styles.socialIconsContainer}>
      <Link href="https://discord.com/invite/nUEKUWVveW" target="_blank" rel="noopener noreferrer">
        <Image src={discord} alt="Discord" className={styles.icon} />
      </Link>
      <Link
        href="https://www.linkedin.com/company/102600044/admin/feed/posts/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={linkedin} alt="Linkedin" className={styles.icon} />
      </Link>
      <Link href="https://github.com/learnhubmk" target="_blank" rel="noopener noreferrer">
        <Image src={github} alt="Github" className={styles.icon} />
      </Link>
      <Link
        href="https://www.youtube.com/channel/UCDDywMbRvBXuUFTPBORc-BQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={youtube} alt="Youtube" className={styles.icon} />
      </Link>
      <Link
        href="https://www.instagram.com/learnhub.mk?fbclid=IwAR3bWgALMMaxnp4a9hbUvjXLBOdkWGHcopCsFpp6WyKRRFoMSOyWqVHLNdk_aem_AUc6U-6f2fR5ErfT3g8nroxbZOsFEXjSAh6n06NlfDHWJxvbc-R-DNQ5hJhYnOLCuIWEVpD017qq83l-VqU5y43A"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={instagram} alt="Instagram" className={styles.icon} />
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=61556614894387"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={facebook} alt="Facebook" className={styles.icon} />
      </Link>
    </div>
  );
};

export default SocialMediaLinks;
