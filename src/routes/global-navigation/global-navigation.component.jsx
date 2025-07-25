import { Link, Outlet } from 'react-router-dom';
import './global-navigation.styles.scss';
import { Fragment } from 'react';
import { useAuth } from '../../context/auth.context';

function GlobalNavigation() {
  const { user } = useAuth();

  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img src={'/images/logo.svg'} alt="VSQL Logo" />
            </Link>
          </li>
          <div>
            {(() => {
              if (user) {
                return (
                  <Fragment>
                    <li>
                      <Link to="/me">
                        <img
                          src={
                            user.picture || '/images/default-profile-pic.png'
                          }
                          alt="Profile Picture"
                        />
                      </Link>
                    </li>
                  </Fragment>
                );
              } else {
                return (
                  <Fragment>
                    <li>
                      <Link to="/auth/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/auth/signup">Join</Link>
                    </li>
                  </Fragment>
                );
              }
            })()}
          </div>
        </ul>
      </nav>
      <Outlet />
    </Fragment>
  );
}

export default GlobalNavigation;
