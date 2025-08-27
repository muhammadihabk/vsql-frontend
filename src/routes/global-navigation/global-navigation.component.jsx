import { Link, Outlet } from 'react-router-dom';
import './global-navigation.styles.scss';
import { Fragment, useContext } from 'react';
import { useAuth } from '../../context/auth.context';
import { useLocation } from 'react-router-dom';
import Button from '../../components/button/button.component';
import { CanvasQueryContext } from '../../context/canvas-query.context';

function GlobalNavigation() {
  const { user } = useAuth();
  const { runQuery } = useContext(CanvasQueryContext);
  const location = useLocation();

  function handleRunQuery() {
    runQuery();
  }

  return (
    <Fragment>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="3rem"
                  viewBox="0 -960 960 960"
                  width="3rem"
                  fill="#636363"
                >
                  <path d="M220-160q-25 0-42.5-17.5T160-220q0-25 17.5-42.5T220-280q25 0 42.5 17.5T280-220q0 25-17.5 42.5T220-160Zm173 0q-25 0-42.5-17.5T333-220q0-25 17.5-42.5T393-280q25 0 42.5 17.5T453-220q0 25-17.5 42.5T393-160Zm174 0q-25 0-42.5-17.5T507-220q0-25 17.5-42.5T567-280q25 0 42.5 17.5T627-220q0 25-17.5 42.5T567-160Zm173 0q-25 0-42.5-17.5T680-220q0-25 17.5-42.5T740-280q25 0 42.5 17.5T800-220q0 25-17.5 42.5T740-160ZM220-333q-25 0-42.5-17.5T160-393q0-25 17.5-42.5T220-453q25 0 42.5 17.5T280-393q0 25-17.5 42.5T220-333Zm173 0q-25 0-42.5-17.5T333-393q0-25 17.5-42.5T393-453q25 0 42.5 17.5T453-393q0 25-17.5 42.5T393-333Zm174 0q-25 0-42.5-17.5T507-393q0-25 17.5-42.5T567-453q25 0 42.5 17.5T627-393q0 25-17.5 42.5T567-333Zm173 0q-25 0-42.5-17.5T680-393q0-25 17.5-42.5T740-453q25 0 42.5 17.5T800-393q0 25-17.5 42.5T740-333ZM220-507q-25 0-42.5-17.5T160-567q0-25 17.5-42.5T220-627q25 0 42.5 17.5T280-567q0 25-17.5 42.5T220-507Zm173 0q-25 0-42.5-17.5T333-567q0-25 17.5-42.5T393-627q25 0 42.5 17.5T453-567q0 25-17.5 42.5T393-507Zm174 0q-25 0-42.5-17.5T507-567q0-25 17.5-42.5T567-627q25 0 42.5 17.5T627-567q0 25-17.5 42.5T567-507Zm173 0q-25 0-42.5-17.5T680-567q0-25 17.5-42.5T740-627q25 0 42.5 17.5T800-567q0 25-17.5 42.5T740-507ZM220-680q-25 0-42.5-17.5T160-740q0-25 17.5-42.5T220-800q25 0 42.5 17.5T280-740q0 25-17.5 42.5T220-680Zm173 0q-25 0-42.5-17.5T333-740q0-25 17.5-42.5T393-800q25 0 42.5 17.5T453-740q0 25-17.5 42.5T393-680Zm174 0q-25 0-42.5-17.5T507-740q0-25 17.5-42.5T567-800q25 0 42.5 17.5T627-740q0 25-17.5 42.5T567-680Zm173 0q-25 0-42.5-17.5T680-740q0-25 17.5-42.5T740-800q25 0 42.5 17.5T800-740q0 25-17.5 42.5T740-680Z" />
                </svg>
              </Link>
            </li>
            <div>
              {(() => {
                if (user) {
                  return (
                    <Fragment>
                      {location.pathname === '/build' && (
                        <Button
                          text="Run Query"
                          ctaType="primary"
                          onClick={handleRunQuery}
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
                      )}
                      <li>
                        <Link to="/me">
                          <img
                            className="profile-pic"
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
                        <Link to="/auth/login">
                          <span>Login</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/signup">
                          <span className="cta-primary">Get started</span>
                        </Link>
                      </li>
                    </Fragment>
                  );
                }
              })()}
            </div>
          </ul>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default GlobalNavigation;
