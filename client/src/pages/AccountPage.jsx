import { useContext, useState } from "react";
import {UserContext} from "../UserContext.jsx";
import {Navigate, useParams} from "react-router-dom";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) {
      subpage = 'profile';
    }

    async function logout() {
      await axios.post('/logout');
      setRedirect('/');
      setUser(null);
    }

    if (!ready) {
        return'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />
    }

    function linkClasses (type=null) {
      let classes = 'py-2 px-6';
      if (type === subpage) {
        classes += ' bg-primary text-white rounded-full';
      }
      return  classes;
    }

    if(redirect) {
      return<Navigate to={redirect} />
    }

    return (
        <div>
          <nav className="w-full flex justify-center mt-8 gap-2">
            <Link className={Linkclasses('profile')} to={"/account"}>My Profile</Link>
            <Link className={Linkclasses('bookings')} to={"/account/booking"}>My bookings</Link>
            <Link className={Linkclasses('places')} to={"/account/places"}>My accomodation</Link>
          </nav>
          {subpage === 'profile' && (
            <div className="text-centre max-w-lg mx-auto">
              Logged in as {user.name} ({user.email})<br />
              <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
          )}
          {subpage === 'places' && (
            <PlacesPage />
          )}
        </div>
    );
}