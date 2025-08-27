import Button from '../button/button.component';
import './schema-query.styles.scss';

const SchemaQuery = () => {
  return (
    <div className="query-wrapper" aria-label="Schema query">
      <form>
        <textarea placeholder="CREATE TABLE, INSERT, ..."></textarea>
        <Button
          inType="submit"
          text="Generate Schema"
          ctaType="primary"
          inClasses={['btn-schema-query']}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
            </svg>
          }
        />
      </form>
    </div>
  );
};

export default SchemaQuery;
