import { useRoutes } from 'react-router-dom';

import home from 'routes/sections/home';
import about from 'routes/sections/about';
import contact from 'routes/sections/contact';

const Router = () => {
  const routes  = useRoutes([
    home,
    about,
    contact
  ])

  return routes;
}

export default Router;