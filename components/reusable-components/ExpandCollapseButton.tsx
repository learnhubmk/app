import classes from './ExpandCollapseButton.module.scss';

interface ExpandCollapseButtonProps {
  trigger: boolean;
}

const ExpandCollapseButton = ({ trigger }: ExpandCollapseButtonProps) => {
  return (
    <div className={classes.buttonMorph}>
      <span className={`${classes.default} ${trigger && classes.active}`}></span>
      <span className={`${classes.default} ${trigger && classes.active}`}></span>
    </div>
  );
};

export default ExpandCollapseButton;
