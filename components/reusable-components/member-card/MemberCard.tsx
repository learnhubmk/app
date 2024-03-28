import Image from 'next/image';
import style from './memberCard.module.scss';

interface MemberProps {
  memberName: string;
  memberInfo: string;
  memberSkills: string[];
  memberProjects: string[];
}

const MemberCard = ({ memberName, memberInfo, memberSkills, memberProjects }: MemberProps) => {
  return (
    <div className={style.memberCardContainer}>
      <div className={style.memberCardHeaderContainer}>
        <p className={`display-m ${style.firstLater}`}>{memberName.charAt(0)}</p>
        <Image src="/member-photo.png" alt="Member Photo" width={100} height={100} />
      </div>
      <div>
        <h2 className={`headline-s ${style.memberName}`}>{memberName}</h2>
        <p>{memberInfo}</p>
      </div>
      <div className={style.skillContainer}>
        <h3 className="headline-s">Вештина</h3>
        <div className={`grid grid__1x3 ${style.tableContainer}`}>
          {memberSkills.map((skill) => {
            return <div key={skill}>{skill}</div>;
          })}
        </div>
      </div>
      <div className={style.projectsContainer}>
        <h3 className="headline-s">Проекти</h3>
        <div className={`grid grid__1x3 ${style.tableContainer}`}>
          {memberProjects.map((project) => {
            return <div key={project}>{project}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
