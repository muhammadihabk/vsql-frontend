import Button from '../button/button.component';
import './schema-query.styles.scss';

const SchemaQuery = () => {
  return (
    <div className="query-wrapper" aria-label="Schema query">
      <form>
        <textarea placeholder="CREATE TABLE, INSERT, ..."></textarea>
        <Button
          inType="submit"
          text="Execute"
          ctaType="primary"
          inClasses={['btn-schema-query']}
        />
      </form>
    </div>
  );
};

export default SchemaQuery;
