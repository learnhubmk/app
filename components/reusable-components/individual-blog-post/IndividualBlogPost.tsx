'use client';

import React from 'react';
import Image from 'next/image';
import style from './individualBlogPost.module.scss';
import BlogImg from '../../../public/blog-img.jpg';
import SocialMediaLinks from '../footer/SocialMediaIcons';
import Button from '../button/Button';
import PopularPosts from './PopularPosts';
import SuggestedPost from './SuggestedPost';
import suggestedPosts from '../../../data/BlogData';
import shortenString from '../../../utils/shortenString';
import calculateReadingTime from '../../../utils/calculateReadingTime';
import { useTheme } from '../../../app/context/themeContext';

interface PostInfo {
  author: string;
  category: string;
  postedOn: string;
}

interface IndividualBlogPostProps {
  title: string;
  postInfo: PostInfo;
  paragraph: string;
  tags: string[];
}

const IndividualBlogPost = ({ title, postInfo, paragraph, tags }: IndividualBlogPostProps) => {
  const { theme } = useTheme();
  const lightTheme = theme === 'light';

  const MAX_TITLE_LENGTH = 26;

  return (
    <div
      className={`${style.backgroundWrapper} ${lightTheme ? style.lightIndividualBlog : style.darkIndividualBlog}`}
    >
      <Image src={BlogImg} className={`${style.blogImg}`} alt={title} />
      <div className={style.layoutContainer}>
        <div
          className={`${style.headingWrapper} ${lightTheme ? style.lightTextBlog : style.darkTextBlog}`}
        >
          <h2>{title}</h2>
          <div className={style.postInfo}>
            <p>{postInfo.author}</p>
            <p>| {postInfo.category}</p>
            <p>| {postInfo.postedOn}</p>
          </div>
          <div
            className={`${style.paragraphWrapper} ${lightTheme ? style.lightParagraph : style.darkParagraph}`}
          >
            {paragraph}
          </div>
          <div className={style.socialMediaContainer}>
            <SocialMediaLinks height={32} width={32} className={style.customSocialMediaIcons} />
          </div>
        </div>
        <div className={style.sideBar}>
          <h3>Discover more of what matters to you</h3>
          <div className={style.tags}>
            {tags.map((tag) => (
              <div
                className={`${style.tag} ${lightTheme ? style.lightTag : style.darkTag}`}
                key={tag}
              >
                {tag}
              </div>
            ))}
          </div>
          <h3>Најпопуларни статии</h3>
          <hr />
          <div className={style.popularPostContainer}>
            {suggestedPosts.map((post) => (
              <PopularPosts
                key={post.id}
                author={post.author}
                date={post.date}
                description={post.description}
              />
            ))}
          </div>
          <div
            className={`${style.buttonWrapper} ${lightTheme ? style.lightButtonWrapper : style.darkButtonWrapper}`}
          >
            <Button
              type="link"
              href="#"
              buttonText="Прочитај повеќе"
              buttonClass={['customFontSize']}
            />
          </div>
        </div>
      </div>
      <div className={style.cardSection}>
        <h3>Релевантни статии</h3>
        <div>
          <div className={style.cardsContainer}>
            {suggestedPosts.map((post) => (
              <SuggestedPost
                key={post.id}
                imageURL={post.imageURL}
                title={shortenString(post.title, MAX_TITLE_LENGTH)}
                description={post.description}
                date={post.date}
                readTime={calculateReadingTime(post.description)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={style.buttonWrapper}>
        <Button
          type="link"
          href="www.google.com"
          buttonTarget="_blank"
          buttonText="Види повеќе!"
          buttonClass={['motionButton']}
          icon={<i className="bi bi-arrow-up-right-circle-fill" />}
          rotateIcon
        />
      </div>
    </div>
  );
};

export default IndividualBlogPost;
