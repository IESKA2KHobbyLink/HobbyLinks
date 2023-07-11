import React from 'react';
import { Link } from 'react-router-dom';

function JoinedGroup({groupDetails}) {
  console.log(groupDetails);

  return (
    <div className='px-44 grid md:grid-cols-2'>
    {groupDetails.map((groupDetail) => (
      <GroupDetails
        key={groupDetail.group_id}
        groupId={groupDetail.group_id}
        name={groupDetail.group_name}
        people={groupDetail.people_limit}
        desc={groupDetail.prefecture}
        pref={groupDetail.desc}
        imgPath={`http://localhost:8000${groupDetail.header_path}`}
      />
    ))}
    </div>
  );
};

function GroupDetails ({groupId,name, people, desc, pref, imgPath}) {
  return (
    //<div className='px-44 grid md:grid-cols-2'>
        <Link to={`/group/${groupId}`} className="flex w-11/12 bg-white md:flex-row mb-1 h-24 mt-8 border-2">
          <img src={imgPath} alt="" className="w-24 rounded-md" />
          <div className="flex flex-col justify-start px-4">
            <h5 className="text-md font-medium text-neutral-800 ">{name}</h5>
            <h2 className="text-sm font-semibold text-amber-500">{pref}</h2>
            <p className="text-sm text-neutral-600">{desc}</p>
            <p className="mb-2 text-sm text-neutral-400 text-right">{people} Members</p>
          </div>
        </Link>
    //</div>
  );
};

export default JoinedGroup;