import React from 'react';
import Image from 'next/image';
import style from './individualBlogPost.module.scss';
import BlogImg from '../../../public/blog-img.jpg';
import SocialMediaLinks from '../footer/SocialMediaIcons';
import Button from '../button/Button';
import PopularPosts from './PopularPosts';
import SuggestedPost from './SuggestedPost';
import { suggestedPosts, popularPosts } from '../../../data/BlogData';

interface PostInfo {
  author: string;
  category: string;
  postedOn: string;
}

interface IndividualBlogPostProps {
  title: string;
  postInfo: PostInfo;
  paragraphs: string[];
  tags: string[];
}

const IndividualBlogPost = ({ title, postInfo, paragraphs, tags }: IndividualBlogPostProps) => {
  return (
    <>
      <Image src={BlogImg} className={`${style.blogImg}`} alt="hero picture desktop" />
      <div className={style.layoutContainer}>
        <div className={style.headingWrapper}>
          <h2>{title}</h2>
          <div className={style.postInfo}>
            <p>{postInfo.author}</p>
            <p>| {postInfo.category}</p>
            <p>| {postInfo.postedOn}</p>
          </div>
          <div className={style.paragraphWrapper}>
            {paragraphs.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </div>
          <div className={style.socialMediaContainer}>
            <SocialMediaLinks height={32} width={32} className={style.customSocialMediaIcons} />
          </div>
        </div>
        <div className={style.sideBar}>
          <h3>Discover more of what matters to you</h3>
          <div className={style.tags}>
            {tags.map((tag) => (
              <div className={style.tag}>{tag}</div>
            ))}
          </div>
          <h3>Најпопуларни статии</h3>
          <hr />
          <div className={style.popularPostContainer}>
            {popularPosts.map((post) => (
              <PopularPosts
                key={post.id}
                author={post.author}
                date={post.date}
                description={post.description}
              />
            ))}
          </div>
          <div className={style.buttonWrapper}>
            <Button
              type="link"
              href="#"
              buttonText="Прочитај повеќе"
              buttonClass={['orangeLink', 'customFontSize']}
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
                title={post.title}
                description={post.description}
                date={post.date}
                readTime={post.readTime}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualBlogPost;
