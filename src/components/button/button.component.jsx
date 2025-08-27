import './button.styles.scss';

const Button = (props) => {
  const { inType, text, ctaType, inClasses, icon, onClick } = props;
  const ctaClass = ctaType === 'secondary' ? 'cta-secondary' : 'cta-primary';
  const classes = `${inClasses?.join(' ') || ''} ${ctaClass}`;

  return (
    <button
      className={`button ${classes} ${icon ? 'icon' : ''}`}
      type={inType}
      onClick={onClick}
    >
      {icon ? icon : null}
      {text}
    </button>
  );
};

export default Button;
