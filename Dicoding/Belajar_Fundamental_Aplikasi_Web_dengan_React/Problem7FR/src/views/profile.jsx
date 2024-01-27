import { useEffect, useState } from "react";
import DetailProfile from "../components/details/detailprofile"
import { getMyServices, getUserLogged } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserLogged();
        setServices(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
    const token = localStorage.getItem('accessToken');
    if (token === null) {
      navigate('/login');
    }
  }, []);

  return (
    <><DetailProfile profile={services} /></>
  )
}

export default Profile