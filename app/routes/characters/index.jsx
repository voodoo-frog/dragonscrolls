import { Link } from "@remix-run/react";

export default function Characters() {
  return (
    <>
      <div className="w-full p-5 block text-center sm:flex sm:justify-between">
        <h3 className="text-4xl mb-5">My Characters</h3>
        <Link
          to="/characters/new"
          className="self-center rounded bg-gray-700 p-3 uppercase text-white hover:bg-gray-800"
        >
          Create New Character
        </Link>
      </div>

      <div className="w-full p-5">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg rounded">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/images/fighter-emblem-color.jpeg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Brutus of Gotham
                            </div>
                            <div className="text-sm text-gray-500">

                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="jane" className="text-indigo-600 hover:text-indigo-900">
                          View
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="/images/warlock-emblem-color.jpeg"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Joker, The Clown Prince of Crime
                            </div>
                            <div className="text-sm text-gray-500">

                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View
                        </a>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
