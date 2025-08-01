import './button.styles.scss';

const Button = (props) => {
  const { inType, text, ctaType } = props;
  const ctaClass = ctaType === 'secondary' ? 'cta-secondary' : 'cta-primary';

  return (
    <button className={`button ${ctaClass}`} type={inType}>
      {text}
    </button>
  );
};

export default Button;
