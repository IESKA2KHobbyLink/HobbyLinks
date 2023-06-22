import React from 'react';

function CreateEventPage() {
    return (
        <div className="py-6 px-6 lg:px-8 text-left md:w-[600px] w-[90%] mx-auto flex flex-col">
            <h3 className="text-gray-800 font-bold text-2xl mb-1">Create Event</h3>
            <br></br>
            <form className="spacy-y-6" action="#">
              <div>
                <label for="event_name" className="block mb-2 text-sm font-medium text-grey-900">
                  Event Name
                </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="12" cy="12" r="9" />
                        <line x1="3.6" y1="9" x2="20.4" y2="9" />
                        <line x1="3.6" y1="15" x2="20.4" y2="15" />
                        <path d="M11.5 3a17 17 0 0 0 0 18" />
                        <path d="M12.5 3a17 17 0 0 1 0 18" />
                    </svg>
                  <input  type="text" name="event_name" id="event_name" className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" placeholder="HobbyLinks" required />
                </div>
              </div>
              <div>
                <label for="start_date" className="block mb-2 text-sm font-medium text-grey-900">
                Start Date
                </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <rect x="4" y="5" width="16" height="16" rx="2" />
                        <line x1="16" y1="3" x2="16" y2="7" />
                        <line x1="8" y1="3" x2="8" y2="7" />
                        <line x1="4" y1="11" x2="20" y2="11" />
                        <line x1="11" y1="15" x2="12" y2="15" />
                        <line x1="12" y1="15" x2="12" y2="18" />
                    </svg>
                    <input  type="date" name="start_date" id="start_date" className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" required />
                </div>
              </div>
              <div>
                <label for="prefecture" className="block mb-2 text-sm font-medium text-grey-900">
                  Prefecture
                </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <circle cx="12" cy="11" r="3" />
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                  <input  type="text" name="prefecture" id="prefecture" className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" placeholder="Osaka" required />
                </div>
              </div>
              <div>
                <label for="address" className="block mb-2 text-sm font-medium text-grey-900">
                  Address
                </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="18" y2="6.01" />
                        <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                        <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                        <line x1="9" y1="4" x2="9" y2="17" />
                        <line x1="15" y1="15" x2="15" y2="20" />
                    </svg>
                  <input type="text" name="address" id="address" className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" placeholder="2-3-35 Nakazaki Nishi, Kita Ward, Osaka City" required />
                </div>
              </div>
              <div>
                <label for="type" className="block mb-2 text-sm font-medium text-grey-900">
                  Type
                </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg class="h-5 w-5 text-gray-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="12" cy="12" r="9" />
                    <line x1="8" y1="12" x2="8" y2="12.01" />
                    <line x1="12" y1="12" x2="12" y2="12.01" />
                    <line x1="16" y1="12" x2="16" y2="12.01" />
                  </svg>
                  <select id="type" name="type" className="boder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5">
                    <option value="0">-- Select --</option>
                    <option value="1">Offline</option>
                    <option value="2">Online</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="desc" className="block mb-2 text-sm font-medium text-grey-900">
                  Description
                </label>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg class="h-5 w-5 text-gray-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
                    <line x1="17" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="17" y1="18" x2="3" y2="18" />
                  </svg>
                  <textarea type="text" name="desc" id="desc" placeholder='Welcome to our event' className="h-10 boder border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5" required></textarea>
                </div>
              </div>
              <br></br>
              <button type="submit" className="w-full text-white bg-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Create Event
              </button>
            </form>
          </div>
      )
};

export default CreateEventPage;