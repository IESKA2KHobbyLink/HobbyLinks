import React from 'react';
//import UserProfile from '';

function UserAbout({userDetails}) {
  return (
    <div>
      <div className="w-full justify-center bg-white p-3 m-8 px-44">
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Name :</div>
                <div className="px-4 py-2">{userDetails.user_name}</div>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender :</div>
                <div className="px-4 py-2">{userDetails.gender}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday :</div>
              <div className="px-4 py-2">{userDetails.birthday}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email :</div>
              <div className="px-4 py-2">
                  <a className="text-blue-800" href={`mailto:${userDetails.email}`}>{userDetails.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAbout;