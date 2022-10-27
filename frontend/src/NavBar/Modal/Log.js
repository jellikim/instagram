import { Link } from 'react-router-dom';

const Log = (props) => {
  return props.to ? (
    <Link {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <Log {...props} />
  );
};

export default Log;
