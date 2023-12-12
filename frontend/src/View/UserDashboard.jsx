import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
const UserDashboard = () => {

  const userId = localStorage.getItem('userID');
  console.log("profile viewwww user ID: ", userId)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  // const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    fetch(`https://used-stuff-platform.onrender.com/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        // setUserData(data.data)
        setUsername(data.data.userName)
        setEmail(data.data.email)
        setContactInfo(data.data.contact)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // console.log(userData);
  // console.log(username);
  // console.log(email);
  // console.log(contactInfo);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 items-center w-auto py-20 justify-center">
        <div className="bg-white max-w-2xl mx-auto text-center shadow overflow-hidden sm:rounded-lg ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              User Profile
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Username
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {username}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  User ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {userId}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Contact Info
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {contactInfo}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserDashboard