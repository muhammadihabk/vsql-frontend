import './button.styles.scss';

const Button = (props) => {
  const { inType, text, ctaType, inClasses } = props;
  const ctaClass = ctaType === 'secondary' ? 'cta-secondary' : 'cta-primary';
  const classes = `${inClasses?.join(' ') || ''} ${ctaClass}`;

  return (
    <button className={`button ${classes}`} type={inType}>
      {text}
    </button>
  );
};

export default Button;
